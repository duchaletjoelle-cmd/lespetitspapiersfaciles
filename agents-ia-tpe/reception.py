"""
Maillon 1 — Recevoir : page web de conversation (mobile d'abord).
Serveur Flask minimal. Accessible par un lien, hébergeable gratuitement
(Render, Railway, Fly.io) ou pour quelques euros (VPS).
Point d'entrée WhatsApp prévu mais non branché en V0.
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

# Sessions actives en mémoire (une par onglet navigateur)
# En production : remplacer par Redis ou une base légère
_sessions: dict[str, Session] = {}


@app.route("/")
def index():
    """Page de chat — fichier statique."""
    return send_from_directory("static", "index.html")


@app.route("/message", methods=["POST"])
def recevoir_message():
    """Point d'entrée principal : reçoit un message client, retourne la réponse."""
    data = request.get_json(force=True)
    session_id = data.get("session_id")
    texte = data.get("message", "").strip()

    if not texte:
        return jsonify({"erreur": "Message vide"}), 400

    # Créer ou récupérer la session
    if session_id not in _sessions:
        session = Session(METIER)
        _sessions[session.id] = session
        session_id = session.id
        config = charger_metier(METIER)
        # Premier message = présentation de l'assistant
        reponse = config["presentation"].format(prenom_pro=config.get("prenom_pro", ""))
        return jsonify({"session_id": session_id, "reponse": reponse, "termine": False})

    session = _sessions[session_id]
    config = charger_metier(METIER)

    reponse = session.message(texte)
    termine = session.est_terminee()

    if termine:
        # Sauvegarder le log
        session.sauvegarder_log()

        if session.action_finale == "complet":
            # Maillon 4 : écrire dans le Sheet
            numero_ligne = ecrire_fiche(
                metier=session.metier,
                champs=session.champs,
                statut="nouvelle",
                resume=session.generer_resume(),
                conversation_id=session.id,
            )
            # Maillon 5 : e-mail au pro
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
            # Maillon 6 : passage à l'humain
            gerer_passage(session, config)

        # Nettoyer la session de la mémoire
        del _sessions[session_id]

    return jsonify({
        "session_id": session_id,
        "reponse": reponse,
        "termine": termine,
        "action": session.action_finale if termine else None,
    })


# --- Point d'entrée WhatsApp (V0 non branché) ---
@app.route("/webhook/whatsapp", methods=["POST", "GET"])
def webhook_whatsapp():
    """
    Prévu pour brancher l'API WhatsApp Business plus tard.
    En V0 : retourne 200 OK pour éviter les erreurs de configuration Meta.
    """
    if request.method == "GET":
        # Vérification du webhook Meta
        token = request.args.get("hub.verify_token", "")
        challenge = request.args.get("hub.challenge", "")
        if token == os.getenv("WHATSAPP_VERIFY_TOKEN", ""):
            return challenge
        return "Token invalide", 403
    return jsonify({"status": "WhatsApp non activé en V0"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=False)
