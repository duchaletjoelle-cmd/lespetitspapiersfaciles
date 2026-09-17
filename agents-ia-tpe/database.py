"""
Couche de persistance — PostgreSQL via psycopg2.

Deux tables :
  sessions          : conversations actives (état courant, durée de vie courte)
  conversation_logs : conversations terminées (pour mesure et audit)

DATABASE_URL est fourni automatiquement par Render quand une base PostgreSQL
est liée au service. En local : postgresql://user:mdp@localhost:5432/agents_ia_tpe

Si DATABASE_URL est absent, on lève une EnvironmentError explicite dès l'import
plutôt que de masquer l'erreur (c'est reception.py qui gère le fallback mémoire).
"""

import os
import json
import logging
from contextlib import contextmanager

import psycopg2
from psycopg2.extras import RealDictCursor

logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")


@contextmanager
def _conn():
    """Context manager : connexion + commit automatique, rollback sur erreur."""
    conn = psycopg2.connect(DATABASE_URL, connect_timeout=5)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db() -> None:
    """Crée les tables si elles n'existent pas. À appeler au démarrage."""
    with _conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS sessions (
                    id            VARCHAR(8)   PRIMARY KEY,
                    metier        VARCHAR(64)  NOT NULL,
                    historique    JSONB        NOT NULL DEFAULT '[]',
                    champs        JSONB        NOT NULL DEFAULT '{}',
                    incompris     INTEGER      NOT NULL DEFAULT 0,
                    action_finale VARCHAR(32),
                    created_at    TIMESTAMPTZ  DEFAULT NOW(),
                    updated_at    TIMESTAMPTZ  DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS conversation_logs (
                    conversation_id VARCHAR(8)   PRIMARY KEY,
                    metier          VARCHAR(64),
                    action_finale   VARCHAR(32),
                    champs          JSONB,
                    log             JSONB,
                    created_at      TIMESTAMPTZ  DEFAULT NOW()
                );
            """)
    logger.info("Base de données initialisée")


# ── Sessions actives ──────────────────────────────────────────────────────────

def sauvegarder_session(session) -> None:
    """Upsert de l'état courant de la session."""
    etat = session.vers_etat()
    with _conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO sessions (id, metier, historique, champs, incompris, action_finale, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, NOW())
                ON CONFLICT (id) DO UPDATE SET
                    historique    = EXCLUDED.historique,
                    champs        = EXCLUDED.champs,
                    incompris     = EXCLUDED.incompris,
                    action_finale = EXCLUDED.action_finale,
                    updated_at    = NOW()
            """, (
                etat["id"],
                etat["metier"],
                json.dumps(etat["historique"], ensure_ascii=False),
                json.dumps(etat["champs"], ensure_ascii=False),
                etat["incompris_consecutifs"],
                etat["action_finale"] or None,
            ))


def charger_session(session_id: str) -> dict | None:
    """Retourne le dict d'état d'une session ou None si inexistante."""
    with _conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM sessions WHERE id = %s", (session_id,))
            row = cur.fetchone()
    if row is None:
        return None
    return {
        "id": row["id"],
        "metier": row["metier"],
        "historique": row["historique"],
        "champs": row["champs"],
        "incompris_consecutifs": row["incompris"],
        "action_finale": row["action_finale"],
    }


def supprimer_session(session_id: str) -> None:
    with _conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM sessions WHERE id = %s", (session_id,))


def purger_sessions_abandonnees(heures: int = 2) -> int:
    """Supprime les sessions sans activité depuis N heures (nettoyage quotidien)."""
    with _conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM sessions WHERE action_finale IS NULL "
                "AND updated_at < NOW() - INTERVAL '%s hours'",
                (heures,),
            )
            return cur.rowcount


# ── Logs de conversations terminées ──────────────────────────────────────────

def archiver_conversation(session) -> None:
    """Sauvegarde le journal d'une conversation terminée pour mesure."""
    with _conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO conversation_logs
                    (conversation_id, metier, action_finale, champs, log)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (conversation_id) DO NOTHING
            """, (
                session.id,
                session.metier,
                session.action_finale,
                json.dumps(session.champs, ensure_ascii=False),
                json.dumps(session.log, ensure_ascii=False),
            ))
