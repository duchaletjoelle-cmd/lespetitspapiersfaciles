"""
Maillon 7 — Relancer.
Script one-shot : s'exécute, envoie les rappels, se termine.
Le déclenchement quotidien est délégué au planificateur cloud (Render cron job)
ou à GitHub Actions — aucun process permanent requis.

Usage :
  python relance.py          # exécution immédiate (appelé par le cron cloud)
  python relance.py --dry    # simulation sans envoi d'e-mail (test)
"""

import os
import sys
import logging
from datetime import datetime, timedelta

from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

SEUIL_HEURES = int(os.getenv("RELANCE_SEUIL_HEURES", "24"))
DRY_RUN = "--dry" in sys.argv


def _en_attente_depuis_trop_longtemps(fiche: dict) -> bool:
    try:
        date_fiche = datetime.strptime(fiche.get("Date création", ""), "%d/%m/%Y %H:%M")
        return datetime.now() - date_fiche > timedelta(hours=SEUIL_HEURES)
    except ValueError:
        return False


def verifier_et_relancer() -> int:
    """Lit les fiches en attente et envoie un rappel par e-mail au pro. Retourne le nombre de relances."""
    from classement import lire_fiches_en_attente
    from transmission import envoyer_email_pro

    logger.info("Vérification des fiches en attente (seuil : %dh)…", SEUIL_HEURES)
    fiches = lire_fiches_en_attente()
    relancees = 0

    for fiche in fiches:
        if not _en_attente_depuis_trop_longtemps(fiche):
            continue

        metier = fiche.get("Métier", "")
        nom = fiche.get("Nom client", "")
        # EMAIL_PRO_CAVISTE, EMAIL_PRO_BOULANGERIE… ou EMAIL_PRO par défaut
        email_pro = os.getenv(
            f"EMAIL_PRO_{metier.upper().replace('-', '_').replace(' ', '_')}",
            os.getenv("EMAIL_PRO", ""),
        )

        if not email_pro:
            logger.warning("EMAIL_PRO manquant pour le métier '%s' — relance ignorée", metier)
            continue

        if DRY_RUN:
            logger.info("[DRY] Relance simulée → %s pour %s (%s)", email_pro, nom, metier)
        else:
            envoyer_email_pro(
                email_pro=email_pro,
                prenom_pro="",
                objet=f"[RAPPEL] Demande client en attente — {nom}",
                metier=metier,
                champs={"nom_client": nom, "telephone_client": fiche.get("Téléphone", "")},
                statut="en attente pro",
                resume=f"⚠️ Fiche en attente depuis plus de {SEUIL_HEURES}h",
            )
        relancees += 1

    logger.info("%d relance(s) %s", relancees, "simulée(s)" if DRY_RUN else "envoyée(s)")
    return relancees


if __name__ == "__main__":
    verifier_et_relancer()
