"""
Maillon 7 — Relancer.
Tâche planifiée (une fois par jour) : lit le Sheet et envoie un rappel
au pro pour les fiches « en attente pro » depuis plus de 24 heures.
Rien n'est envoyé au client en V0.

Lancement manuel : python relance.py
Lancement automatique : configurer un cron ou un scheduler (ex. systemd timer).
"""

import os
import logging
from datetime import datetime, timedelta
from dotenv import load_dotenv

import schedule
import time

from classement import lire_fiches_en_attente
from transmission import envoyer_email_pro

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

SEUIL_HEURES = int(os.getenv("RELANCE_SEUIL_HEURES", "24"))


def _est_en_attente_trop_longtemps(fiche: dict) -> bool:
    try:
        date_str = fiche.get("Date création", "")
        date_fiche = datetime.strptime(date_str, "%d/%m/%Y %H:%M")
        return datetime.now() - date_fiche > timedelta(hours=SEUIL_HEURES)
    except ValueError:
        return False


def verifier_et_relancer():
    """Lit les fiches en attente et envoie un rappel pour celles > 24h."""
    logger.info("Vérification des fiches en attente…")
    fiches = lire_fiches_en_attente()
    relancees = 0

    for fiche in fiches:
        if not _est_en_attente_trop_longtemps(fiche):
            continue

        metier = fiche.get("Métier", "")
        nom = fiche.get("Nom client", "")
        email_pro = os.getenv(f"EMAIL_PRO_{metier.upper().replace('-', '_')}", os.getenv("EMAIL_PRO", ""))

        if not email_pro:
            logger.warning("EMAIL_PRO manquant pour métier %s — relance ignorée", metier)
            continue

        resume = f"⚠️ Fiche en attente depuis plus de {SEUIL_HEURES}h : {nom}"
        envoyer_email_pro(
            email_pro=email_pro,
            prenom_pro="",
            objet=f"[RAPPEL] Demande client en attente — {nom}",
            metier=metier,
            champs={"nom_client": nom, "telephone_client": fiche.get("Téléphone", "")},
            statut="en attente pro",
            resume=resume,
        )
        relancees += 1

    logger.info("%d relance(s) envoyée(s)", relancees)


def lancer_planificateur():
    """Lance le planificateur — s'exécute indéfiniment (pour un serveur)."""
    heure = os.getenv("RELANCE_HEURE", "08:00")
    schedule.every().day.at(heure).do(verifier_et_relancer)
    logger.info("Planificateur démarré — relance quotidienne à %s", heure)
    while True:
        schedule.run_pending()
        time.sleep(60)


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--now":
        verifier_et_relancer()
    else:
        lancer_planificateur()
