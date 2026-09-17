"""
Maillon 1 — Recevoir : page web de conversation (mobile d'abord).
Serveur Flask — conçu pour tourner dans le cloud (Render, Railway, VPS).
Le commerçant peut éteindre son PC : le service reste actif.
Sessions persistées en PostgreSQL ; fallback mémoire si DATABASE_URL absent (dev local).
"""

import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

from dialogue import Session, charger_metier
from classement import ecrire_fiche
from transmission import envoyer_email_pro
from passage_main import gerer_passage

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

METIER = os.getenv("METIER", "caviste")
PORT = int(os.getenv("PORT", 8080))

app = Flask(__name__, static_folder="static")

# ── Couche de persistance ─────────────────────────────────────────────────────
# PostgreSQL si DATABASE_URL est défini (production), sinon dict en mémoire (dev).
_db_disponible = False
_sessions_memoire: dict[str, Session] = {}

try:
    from database import init_db, sauvegarder_session, charger_session, supprimer_session, archiver_conversation
    init_db()
    _db_disponible = True
    logger.info("Persistance : PostgreSQL activée")
except Exception as e:
    logger.warning("Persistance : PostgreSQL indisponible (%s) — mode mémoire (dev uniquement)", e)


def _charger(session_id: str) -> Session | None:
    if _db_disponible:
        etat = charger_session(session_id)
        return Session.depuis_etat(etat) if etat else None
    return _sessions_memoire.get(session_id)


def _sauvegarder(session: Session) -> None:
    if _db_disponible:
        sauvegarder_session(session)
    else:
        _sessions_memoire[session.id] = session


def _supprimer(session_id: str) -> None:
    if _db_disponible:
        supprimer_session(session_id)
    else:
        _sessions_memoire.pop(session_id, None)


def _archiver(session: Session) -> None:
    if _db_disponible:
        archiver_conversation(session)


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/message", methods=["POST"])
def recevoir_message():
    data = request.get_json(force=True)
    session_id = data.get("session_id")
    texte = data.get("message", "").strip()

    if not texte:
        return jsonify({"erreur": "Message vide"}), 400

    session = _charger(session_id) if session_id else None

    if session is None:
        session = Session(METIER)
        config = charger_metier(METIER)
        _sauvegarder(session)
        reponse = config["presentation"].format(prenom_pro=config.get("prenom_pro", ""))
        return jsonify({"session_id": session.id, "reponse": reponse, "termine": False})

    config = charger_metier(METIER)
    reponse = session.message(texte)
    termine = session.est_terminee()

    if termine:
        _archiver(session)
        _supprimer(session.id)

        if session.action_finale == "complet":
            ecrire_fiche(
                metier=session.metier,
                champs=session.champs,
                statut="nouvelle",
                resume=session.generer_resume(),
                conversation_id=session.id,
            )
            envoyer_email_pro(
                email_pro=config.get("email_pro", ""),
                prenom_pro=config.get("prenom_pro", ""),
                objet=config.get("objet_mail", "Nouvelle demande — {nom_client} — {date}"),
                metier=session.metier,
                champs=session.champs,
                statut="nouvelle",
                resume=session.generer_resume(),
            )
        elif session.action_finale == "passage_humain":
            gerer_passage(session, config)
    else:
        _sauvegarder(session)

    return jsonify({
        "session_id": session.id,
        "reponse": reponse,
        "termine": termine,
        "action": session.action_finale if termine else None,
    })


# ── Webhook WhatsApp (point d'entrée prévu, non activé en V0) ─────────────────

@app.route("/webhook/whatsapp", methods=["POST", "GET"])
def webhook_whatsapp():
    if request.method == "GET":
        token = request.args.get("hub.verify_token", "")
        challenge = request.args.get("hub.challenge", "")
        if token == os.getenv("WHATSAPP_VERIFY_TOKEN", ""):
            return challenge
        return "Token invalide", 403
    return jsonify({"status": "WhatsApp non activé en V0"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=False)
