"""
Maillon 5 — Transmettre : envoyer un e-mail au professionnel.
Utilise l'API Brevo (anciennement Sendinblue). SMS prévu mais non obligatoire en V0.
"""

import os
import json
import logging
from datetime import datetime

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
EMAIL_FROM = os.getenv("EMAIL_FROM", "assistant@lespetitspapiersfaciles.fr")
EMAIL_FROM_NAME = os.getenv("EMAIL_FROM_NAME", "Assistant LPPF")


def _client_brevo():
    config = sib_api_v3_sdk.Configuration()
    config.api_key["api-key"] = BREVO_API_KEY
    return sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(config))


def _construire_corps(metier: str, champs: dict, statut: str, resume: str) -> str:
    """Construit le corps HTML de l'e-mail — lisible en 10 secondes."""
    now = datetime.now().strftime("%d/%m/%Y à %H:%M")
    nom = champs.get("nom_client", "Client")
    tel = champs.get("telephone_client", "Non renseigné")

    emoji_statut = {"nouvelle": "🆕", "à rappeler": "📞", "en attente pro": "⏳"}.get(statut, "📋")

    # Tableau des champs collectés
    lignes_champs = ""
    for cle, valeur in champs.items():
        if cle not in ("nom_client", "telephone_client") and valeur:
            lignes_champs += f"<tr><td style='padding:4px 12px;color:#666;'>{cle.replace('_',' ').capitalize()}</td><td style='padding:4px 12px;'><b>{valeur}</b></td></tr>"

    return f"""
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#1a6e3c;color:white;padding:16px 24px;border-radius:8px 8px 0 0;">
    <h2 style="margin:0;">{emoji_statut} Nouvelle demande — {metier.title()}</h2>
    <p style="margin:4px 0 0;opacity:0.85;">{now}</p>
  </div>
  <div style="background:#f9f9f9;padding:20px 24px;border:1px solid #e0e0e0;">
    <p style="font-size:1.1em;"><b>{nom}</b> — 📞 {tel}</p>
    {"<p style='background:#fff3cd;padding:10px;border-left:4px solid #ffc107;'>" + resume + "</p>" if resume else ""}
    <table style="width:100%;border-collapse:collapse;margin-top:12px;">
      {lignes_champs}
    </table>
  </div>
  <div style="background:#f0f0f0;padding:12px 24px;border-radius:0 0 8px 8px;font-size:0.85em;color:#888;">
    Répondez à ce mail ou appelez directement le client. · Statut : <b>{statut}</b>
  </div>
</div>
"""


def envoyer_email_pro(
    email_pro: str,
    prenom_pro: str,
    objet: str,
    metier: str,
    champs: dict,
    statut: str = "nouvelle",
    resume: str = "",
) -> bool:
    """
    Envoie l'e-mail de notification au professionnel.
    Retourne True si envoi réussi, False sinon.
    """
    if not BREVO_API_KEY:
        logger.warning("BREVO_API_KEY manquant — e-mail non envoyé (mode test)")
        print(f"[TEST] E-mail simulé vers {email_pro} : {objet}")
        return False

    api = _client_brevo()
    corps = _construire_corps(metier, champs, statut, resume)

    email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": email_pro, "name": prenom_pro}],
        sender={"email": EMAIL_FROM, "name": EMAIL_FROM_NAME},
        subject=objet.format(
            nom_client=champs.get("nom_client", ""),
            date=datetime.now().strftime("%d/%m/%Y"),
        ),
        html_content=corps,
    )

    try:
        api.send_transac_email(email)
        logger.info("E-mail envoyé à %s — %s", email_pro, objet)
        return True
    except ApiException as e:
        logger.error("Erreur Brevo : %s", e)
        return False


# --- SMS (point d'entrée prévu, non obligatoire en V0) ---
def envoyer_sms_pro(telephone_pro: str, message: str) -> bool:
    """
    Point d'entrée SMS — non activé en V0.
    Brancher Brevo SMS ou Twilio ici quand nécessaire.
    """
    logger.info("SMS non activé en V0 — message prévu : %s", message)
    return False
