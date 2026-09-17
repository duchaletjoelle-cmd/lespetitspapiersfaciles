"""
Maillons 2 + 3 — Questionner et Compléter.
Le modèle reçoit le message du client avec la liste des champs obligatoires.
Il pose UNE seule question à la fois via OpenRouter (couche modèle interchangeable).
"""

import os
import json
import uuid
import logging
from datetime import datetime

import openai
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "anthropic/claude-haiku-4-5")


def _make_client():
    return openai.OpenAI(
        api_key=OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1",
        default_headers={
            "HTTP-Referer": "https://lespetitspapiersfaciles.fr",
            "X-Title": "Assistant LPPF",
        },
    )


def charger_metier(nom_metier: str) -> dict:
    """Charge la config JSON d'un métier depuis metiers/<nom>.json."""
    chemin = os.path.join(os.path.dirname(__file__), "metiers", f"{nom_metier}.json")
    with open(chemin, encoding="utf-8") as f:
        return json.load(f)


def _prompt_systeme(config: dict, champs_remplis: dict) -> str:
    """Construit la consigne système envoyée au modèle à chaque tour."""
    prenom = config.get("prenom_pro", "le professionnel")

    champs_str = "\n".join(
        f"- {c['cle']} ({c['label']}) : {champs_remplis.get(c['cle'], 'MANQUANT')}"
        for c in config["informations_obligatoires"]
    )

    sujets_hp = ", ".join(config.get("sujets_passage_humain", []))

    return f"""Tu es un assistant qui prend des messages pour {prenom}.

RÈGLES STRICTES :
1. Tu poses UNE SEULE question à la fois, la plus importante parmi les champs manquants.
2. Tu ne poses pas de question sur un champ déjà rempli.
3. Si le client refuse de répondre ou dit qu'il ne sait pas, tu marques le champ "non renseigné" et tu passes au suivant.
4. Si le client mentionne : {sujets_hp} → tu réponds que tu transmets à {prenom} et tu t'arrêtes (PASSAGE_HUMAIN).
5. Si tu n'as pas compris le message deux fois de suite → PASSAGE_HUMAIN.
6. Quand tous les champs obligatoires sont remplis → tu réponds en JSON avec ACTION=COMPLET.
7. Tu es concis, chaleureux, sans jargon technique.

CHAMPS À COLLECTER :
{champs_str}

RÉPONSE FORMAT :
- Si tu poses une question : réponds en texte simple.
- Si PASSAGE_HUMAIN : réponds exactement : ACTION=PASSAGE_HUMAIN RAISON=<raison courte>
- Si tout est collecté : réponds exactement : ACTION=COMPLET CHAMPS=<JSON des champs remplis>
"""


def _extraire_action(reponse: str, champs_actuels: dict) -> tuple[str, dict, str]:
    """
    Parse la réponse du modèle.
    Retourne (action, champs_mis_a_jour, texte_a_afficher).
    """
    if "ACTION=PASSAGE_HUMAIN" in reponse:
        return "passage_humain", champs_actuels, reponse.split("ACTION=PASSAGE_HUMAIN")[0].strip()

    if "ACTION=COMPLET" in reponse:
        try:
            debut_json = reponse.index("CHAMPS=") + len("CHAMPS=")
            champs_nouveaux = json.loads(reponse[debut_json:].strip())
            return "complet", champs_nouveaux, "Merci, j'ai bien noté tout ça !"
        except (ValueError, json.JSONDecodeError):
            logger.warning("Impossible de parser CHAMPS= dans : %s", reponse[:200])
            return "complet", champs_actuels, "Merci, j'ai bien noté."

    return "question", champs_actuels, reponse.strip()


class Session:
    """Une conversation avec un client."""

    def __init__(self, metier: str, session_id: str = None):
        self.id = session_id or str(uuid.uuid4())[:8]
        self.metier = metier
        self.config = charger_metier(metier)
        self.historique: list[dict] = []
        self.champs: dict = {}
        self.incompris_consecutifs = 0
        self.action_finale: str = ""
        self.log: list[dict] = []
        self._client = _make_client()
        logger.info("Session %s démarrée — métier : %s", self.id, metier)

    @classmethod
    def depuis_etat(cls, etat: dict) -> "Session":
        """Reconstruit une Session depuis un dict (chargé depuis la base)."""
        session = cls.__new__(cls)
        session.id = etat["id"]
        session.metier = etat["metier"]
        session.config = charger_metier(etat["metier"])
        session.historique = etat.get("historique", [])
        session.champs = etat.get("champs", {})
        session.incompris_consecutifs = etat.get("incompris_consecutifs", 0)
        session.action_finale = etat.get("action_finale") or ""
        session.log = []
        session._client = _make_client()
        return session

    def vers_etat(self) -> dict:
        """Sérialise l'état de la session (pour la base de données)."""
        return {
            "id": self.id,
            "metier": self.metier,
            "historique": self.historique,
            "champs": self.champs,
            "incompris_consecutifs": self.incompris_consecutifs,
            "action_finale": self.action_finale,
        }

    def _champs_manquants(self) -> list[dict]:
        return [
            c for c in self.config["informations_obligatoires"]
            if c["cle"] not in self.champs
        ]

    def message(self, texte_client: str) -> str:
        """
        Traite un message client et retourne la réponse de l'assistant.
        Met à jour self.action_finale quand la conversation est terminée.
        """
        self.historique.append({"role": "user", "content": texte_client})
        self.log.append({"role": "client", "texte": texte_client, "ts": datetime.now().isoformat()})

        champs_manquants = self._champs_manquants()

        if not champs_manquants:
            self.action_finale = "complet"
            return "Merci, j'ai bien noté toutes vos informations ! {prenom_pro} vous contacte bientôt.".format(
                prenom_pro=self.config.get("prenom_pro", "le professionnel")
            )

        systeme = _prompt_systeme(self.config, self.champs)

        try:
            reponse_brute = self._client.chat.completions.create(
                model=OPENROUTER_MODEL,
                max_tokens=512,
                messages=[{"role": "system", "content": systeme}] + self.historique,
            )
            texte_reponse = reponse_brute.choices[0].message.content
            self.incompris_consecutifs = 0
        except Exception as e:
            logger.error("Erreur API OpenRouter : %s", e)
            self.incompris_consecutifs += 1
            texte_reponse = "Je n'ai pas bien compris. Pouvez-vous reformuler ?"

        action, champs_mis_a_jour, texte_affiche = _extraire_action(texte_reponse, self.champs)
        self.champs = champs_mis_a_jour

        if self.incompris_consecutifs >= 2:
            action = "passage_humain"
            texte_affiche = self.config.get(
                "message_passage_humain",
                "Je transmets votre demande au professionnel.",
            ).format(prenom_pro=self.config.get("prenom_pro", "le professionnel"))

        if action in ("passage_humain", "complet"):
            self.action_finale = action

        self.historique.append({"role": "assistant", "content": texte_affiche})
        self.log.append({
            "role": "assistant",
            "texte": texte_affiche,
            "action": action,
            "champs": dict(self.champs),
            "ts": datetime.now().isoformat(),
        })

        return texte_affiche

    def est_terminee(self) -> bool:
        return self.action_finale in ("passage_humain", "complet")

    def generer_resume(self) -> str:
        champs = self.champs
        nom = champs.get("nom_client", "")
        produit = champs.get("produits", champs.get("prestation", champs.get("description_travaux", champs.get("probleme", ""))))
        date = champs.get("date_retrait", champs.get("date_heure", champs.get("disponibilites", "")))
        return f"{nom} — {produit}" + (f" — pour le {date}" if date else "")
