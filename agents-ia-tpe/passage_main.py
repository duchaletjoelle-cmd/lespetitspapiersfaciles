"""
Maillon 6 — Passer la main.
Règle codée en dur : si le client demande un prix, une remise, un diagnostic
ou si l'assistant n'a pas compris 2 fois de suite → passage à l'humain.
La demande est enregistrée avec le statut « à rappeler ».
Ce module est appelé par main.py après que dialogue.py a signalé PASSAGE_HUMAIN.
"""

import logging
from classement import ecrire_fiche, mettre_a_jour_statut
from transmission import envoyer_email_pro

logger = logging.getLogger(__name__)


def gerer_passage(session, config: dict) -> int:
    """
    Enregistre la demande avec statut 'à rappeler' et notifie le pro.
    Retourne le numéro de ligne dans le Sheet.
    """
    prenom_pro = config.get("prenom_pro", "le professionnel")
    email_pro = config.get("email_pro", "")

    # Champs avec ce qu'on a réussi à collecter
    champs = dict(session.champs)

    numero_ligne = ecrire_fiche(
        metier=session.metier,
        champs=champs,
        statut="à rappeler",
        urgence="normale",
        resume=session.generer_resume(),
        conversation_id=session.id,
    )

    if email_pro and "@" in email_pro:
        objet = config.get("objet_mail", "Demande client — {nom_client} — {date}")
        envoyer_email_pro(
            email_pro=email_pro,
            prenom_pro=prenom_pro,
            objet=objet,
            metier=session.metier,
            champs=champs,
            statut="à rappeler",
            resume=session.generer_resume(),
        )

    logger.info("Passage à l'humain — session %s — ligne Sheet %d", session.id, numero_ligne)
    return numero_ligne
