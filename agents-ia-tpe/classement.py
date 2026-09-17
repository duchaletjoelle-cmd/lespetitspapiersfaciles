"""
Maillon 4 — Classer : écrire une ligne dans le Google Sheet du professionnel.
Chaque fiche = une ligne. Connexion via compte de service Google.
"""

import os
import json
import logging
from datetime import datetime

import gspread
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

SHEET_ID = os.getenv("GOOGLE_SHEET_ID")
CREDENTIALS_FILE = os.getenv("GOOGLE_CREDENTIALS_FILE", "credentials.json")

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.readonly",
]

# Colonnes de la fiche client (onglet Fiches)
COLONNES_FICHE = [
    "Date création",
    "Métier",
    "Nom client",
    "Téléphone",
    "Statut",
    "Urgence",
    "Données collectées (JSON)",
    "Résumé",
    "Conversation ID",
]


def _connect():
    creds = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    return gspread.authorize(creds)


def _get_or_create_fiche_sheet(spreadsheet):
    """Retourne l'onglet 'Fiches' et le crée s'il n'existe pas."""
    try:
        ws = spreadsheet.worksheet("Fiches")
    except gspread.exceptions.WorksheetNotFound:
        ws = spreadsheet.add_worksheet(title="Fiches", rows=1000, cols=len(COLONNES_FICHE))
        ws.append_row(COLONNES_FICHE)
        ws.format("A1:I1", {"textFormat": {"bold": True}})
        spreadsheet.batch_update({"requests": [{
            "updateSheetProperties": {
                "properties": {"sheetId": ws.id, "gridProperties": {"frozenRowCount": 1}},
                "fields": "gridProperties.frozenRowCount",
            }
        }]})
    return ws


def ecrire_fiche(
    metier: str,
    champs: dict,
    statut: str = "nouvelle",
    urgence: str = "normale",
    resume: str = "",
    conversation_id: str = "",
) -> int:
    """
    Écrit une ligne dans l'onglet 'Fiches' du Google Sheet.
    Retourne le numéro de ligne créée.
    """
    if not SHEET_ID:
        raise EnvironmentError("GOOGLE_SHEET_ID manquant dans .env")

    gc = _connect()
    sheet = gc.open_by_key(SHEET_ID)
    ws = _get_or_create_fiche_sheet(sheet)

    now = datetime.now().strftime("%d/%m/%Y %H:%M")
    nom_client = champs.get("nom_client", "Inconnu")
    telephone = champs.get("telephone_client", "Non renseigné")

    ligne = [
        now,
        metier,
        nom_client,
        telephone,
        statut,
        urgence,
        json.dumps(champs, ensure_ascii=False),
        resume,
        conversation_id,
    ]

    ws.append_row(ligne, value_input_option="USER_ENTERED")

    # Numéro de la ligne créée (header en ligne 1 + lignes existantes)
    toutes = ws.get_all_values()
    numero_ligne = len(toutes)

    logger.info("Fiche créée — ligne %d — %s — %s", numero_ligne, metier, nom_client)
    return numero_ligne


def mettre_a_jour_statut(numero_ligne: int, nouveau_statut: str) -> None:
    """Met à jour le statut d'une fiche existante (colonne E)."""
    gc = _connect()
    sheet = gc.open_by_key(SHEET_ID)
    ws = sheet.worksheet("Fiches")
    # Colonne E = index 5 (gspread 1-indexé)
    ws.update_cell(numero_ligne, 5, nouveau_statut)
    logger.info("Fiche ligne %d → statut : %s", numero_ligne, nouveau_statut)


def lire_fiches_en_attente(metier: str = None) -> list[dict]:
    """Retourne les fiches avec statut 'en attente pro' (pour la relance)."""
    gc = _connect()
    sheet = gc.open_by_key(SHEET_ID)
    ws = sheet.worksheet("Fiches")
    toutes = ws.get_all_records()

    fiches = [
        f for f in toutes
        if f.get("Statut") == "en attente pro"
        and (metier is None or f.get("Métier") == metier)
    ]
    return fiches
