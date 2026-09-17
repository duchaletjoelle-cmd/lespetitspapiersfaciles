"""
Tests automatiques — Métier boulangerie.
Mêmes trois scénarios qu'en caviste, seul le paramètre métier change.
"""

import os
import sys
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from unittest.mock import patch, MagicMock
from dialogue import Session


def _mock(texte: str):
    m = MagicMock()
    m.content = [MagicMock(text=texte)]
    return m


class TestBoulangerieScenarioA:
    def test_client_cooperatif(self):
        with patch("dialogue.anthropic.Anthropic") as MockAnthropic:
            client_mock = MagicMock()
            MockAnthropic.return_value = client_mock

            client_mock.messages.create.side_effect = [
                _mock("C'est pour quel nom ?"),
                _mock("Votre numéro de téléphone ?"),
                _mock("Qu'est-ce que vous souhaitez commander ?"),
                _mock("C'est pour quel jour et à quelle heure ?"),
                _mock(
                    'ACTION=COMPLET CHAMPS={"nom_client":"Leblanc","telephone_client":"0611111111","produits":"Tarte aux fraises pour 8 personnes","date_retrait":"dimanche 10h"}'
                ),
            ]

            session = Session("boulangerie")
            session.message("Bonjour, je voudrais commander un gâteau")
            session.message("Leblanc")
            session.message("0611111111")
            session.message("Une tarte aux fraises pour 8 personnes")
            session.message("Dimanche à 10h")

            assert session.est_terminee()
            assert session.action_finale == "complet"
            assert session.champs.get("nom_client") == "Leblanc"


class TestBoulangerieScenarioB:
    def test_tout_en_une_phrase(self):
        with patch("dialogue.anthropic.Anthropic") as MockAnthropic:
            client_mock = MagicMock()
            MockAnthropic.return_value = client_mock

            client_mock.messages.create.side_effect = [
                _mock(
                    'ACTION=COMPLET CHAMPS={"nom_client":"Petit","telephone_client":"0622222222","produits":"Baguette x4 et croissants x6","date_retrait":"demain 8h"}'
                ),
            ]

            session = Session("boulangerie")
            session.message(
                "Petit, 0622222222, je prends 4 baguettes et 6 croissants pour demain à 8h"
            )

            assert client_mock.messages.create.call_count == 1
            assert session.est_terminee()
            assert session.action_finale == "complet"


class TestBoulangerieScenarioC:
    def test_question_prix_passage_humain(self):
        with patch("dialogue.anthropic.Anthropic") as MockAnthropic:
            client_mock = MagicMock()
            MockAnthropic.return_value = client_mock

            client_mock.messages.create.side_effect = [
                _mock("ACTION=PASSAGE_HUMAIN RAISON=demande de tarif"),
            ]

            session = Session("boulangerie")
            session.message("C'est combien une tarte aux pommes pour 10 personnes ?")

            assert session.est_terminee()
            assert session.action_finale == "passage_humain"


def test_charger_config_boulangerie():
    from dialogue import charger_metier
    config = charger_metier("boulangerie")
    assert config["metier"] == "boulangerie"
    assert len(config["informations_obligatoires"]) >= 4
