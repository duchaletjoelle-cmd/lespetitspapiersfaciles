"""
Tests automatiques — Métier caviste.
Trois scénarios scriptés comme demandé dans le prompt.
Ces tests vérifient la logique de la Session sans appeler l'API Anthropic.
"""

import json
import os
import sys
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from unittest.mock import patch, MagicMock
from dialogue import Session


def _mock_api_response(texte: str):
    """Simule une réponse de l'API Anthropic."""
    mock = MagicMock()
    mock.content = [MagicMock(text=texte)]
    return mock


# ─────────────────────────────────────────────────────────────────────────────
# Scénario A : client coopératif, donne toutes les infos une par une
# Résultat attendu : action_finale = "complet", tous les champs remplis
# ─────────────────────────────────────────────────────────────────────────────
class TestScenarioA:
    """Client complet et coopératif — pose une question à la fois."""

    def test_client_cooperatif(self):
        with patch("dialogue.anthropic.Anthropic") as MockAnthropic:
            client_mock = MagicMock()
            MockAnthropic.return_value = client_mock

            # Séquence de réponses simulées du modèle
            client_mock.messages.create.side_effect = [
                _mock_api_response("C'est pour quel nom ?"),
                _mock_api_response("Quel est votre numéro de téléphone ?"),
                _mock_api_response("Qu'est-ce que vous souhaitez commander ?"),
                _mock_api_response("Pour quand en avez-vous besoin ?"),
                _mock_api_response(
                    'ACTION=COMPLET CHAMPS={"nom_client":"Dupont","telephone_client":"0612345678","produits":"Bordeaux rouge x6","date_retrait":"vendredi"}'
                ),
            ]

            session = Session("caviste")

            reponse1 = session.message("Bonjour je voudrais commander du vin")
            assert not session.est_terminee()

            reponse2 = session.message("Je m'appelle Dupont")
            assert not session.est_terminee()

            reponse3 = session.message("0612345678")
            assert not session.est_terminee()

            reponse4 = session.message("Du Bordeaux rouge, 6 bouteilles")
            assert not session.est_terminee()

            reponse5 = session.message("Pour vendredi")
            assert session.est_terminee()
            assert session.action_finale == "complet"
            assert session.champs.get("nom_client") == "Dupont"
            assert session.champs.get("telephone_client") == "0612345678"
            assert session.champs.get("produits") == "Bordeaux rouge x6"

    def test_aucune_question_inutile(self):
        """Scénario B : le client donne tout en une seule phrase."""
        with patch("dialogue.anthropic.Anthropic") as MockAnthropic:
            client_mock = MagicMock()
            MockAnthropic.return_value = client_mock

            # Le modèle reconnaît tout et complète directement
            client_mock.messages.create.side_effect = [
                _mock_api_response(
                    'ACTION=COMPLET CHAMPS={"nom_client":"Martin","telephone_client":"0698765432","produits":"Champagne x3","date_retrait":"samedi matin"}'
                ),
            ]

            session = Session("caviste")
            session.message(
                "Bonjour, je m'appelle Martin, mon téléphone c'est le 0698765432, "
                "je veux 3 bouteilles de champagne pour samedi matin."
            )

            # UNE seule question posée au modèle
            assert client_mock.messages.create.call_count == 1
            assert session.est_terminee()
            assert session.action_finale == "complet"


# ─────────────────────────────────────────────────────────────────────────────
# Scénario C : client demande une remise → passage à l'humain
# ─────────────────────────────────────────────────────────────────────────────
class TestScenarioC:
    """Client qui demande une remise — statut doit être 'à rappeler'."""

    def test_demande_remise_passage_humain(self):
        with patch("dialogue.anthropic.Anthropic") as MockAnthropic:
            client_mock = MagicMock()
            MockAnthropic.return_value = client_mock

            client_mock.messages.create.side_effect = [
                _mock_api_response(
                    "ACTION=PASSAGE_HUMAIN RAISON=demande de remise"
                    " Je transmets votre demande au professionnel."
                ),
            ]

            session = Session("caviste")
            reponse = session.message("Vous faites des remises pour les commandes importantes ?")

            assert session.est_terminee()
            assert session.action_finale == "passage_humain"

    def test_incomprehension_passage_humain(self):
        """Deux incompréhensions consécutives → passage automatique."""
        with patch("dialogue.anthropic.Anthropic") as MockAnthropic:
            client_mock = MagicMock()
            MockAnthropic.return_value = client_mock

            # Simule une erreur API deux fois de suite
            client_mock.messages.create.side_effect = [
                Exception("Timeout"),
                Exception("Timeout"),
            ]

            session = Session("caviste")
            session.message("fjqsdfkjhskdf")
            session.message("lkjhgfdsazxcv")

            assert session.est_terminee()
            assert session.action_finale == "passage_humain"


# ─────────────────────────────────────────────────────────────────────────────
# Tests unitaires des composants
# ─────────────────────────────────────────────────────────────────────────────
def test_charger_config_caviste():
    from dialogue import charger_metier
    config = charger_metier("caviste")
    assert config["metier"] == "caviste"
    assert len(config["informations_obligatoires"]) >= 4
    assert "sujets_passage_humain" in config


def test_champs_manquants_initialement():
    with patch("dialogue.anthropic.Anthropic"):
        session = Session("caviste")
        manquants = session._champs_manquants()
        assert len(manquants) == len(session.config["informations_obligatoires"])
