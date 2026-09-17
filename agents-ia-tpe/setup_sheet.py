"""
Tâche 0 — Structure le Google Sheet « Suivi rencontres — Agents IA TPE ».
À lancer UNE seule fois après avoir rempli .env et placé credentials.json.
"""

import os
import sys
import gspread
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv

load_dotenv()

SHEET_ID = os.getenv("GOOGLE_SHEET_ID")
CREDENTIALS_FILE = os.getenv("GOOGLE_CREDENTIALS_FILE", "credentials.json")
CREDENTIALS_JSON = os.getenv("GOOGLE_CREDENTIALS_JSON")

METIERS = ["caviste", "boulangerie", "coiffure", "restaurant-traiteur", "artisan bâtiment", "garage"]

COLONNES_RENCONTRES = [
    "Date",
    "Métier",
    "Nom / enseigne",
    "Commune",
    "Tâche repoussée (ses mots)",
    "Diapositive qui a fait réagir",
    "Intérêt 0-3",
    "OK test gratuit 2 sem.",
    "À rappeler le",
    "Notes",
]

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]


def connect():
    if CREDENTIALS_JSON:
        import json
        creds = Credentials.from_service_account_info(json.loads(CREDENTIALS_JSON), scopes=SCOPES)
    elif os.path.exists(CREDENTIALS_FILE):
        creds = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    else:
        raise EnvironmentError(
            "Credentials Google manquants. "
            "Définir GOOGLE_CREDENTIALS_JSON (cloud) ou GOOGLE_CREDENTIALS_FILE (local)."
        )
    return gspread.authorize(creds)


def setup_rencontres(sheet):
    """Renomme l'onglet par défaut en Rencontres et ajoute les en-têtes."""
    try:
        ws = sheet.worksheet("Feuille 1")
        ws.update_title("Rencontres")
    except gspread.exceptions.WorksheetNotFound:
        try:
            ws = sheet.worksheet("Sheet1")
            ws.update_title("Rencontres")
        except gspread.exceptions.WorksheetNotFound:
            # L'onglet existe peut-être déjà
            ws = sheet.worksheet("Rencontres")

    # En-têtes ligne 1
    ws.update("A1:J1", [COLONNES_RENCONTRES])

    # Mise en gras de la ligne d'en-têtes
    ws.format("A1:J1", {
        "textFormat": {"bold": True},
        "backgroundColor": {"red": 0.26, "green": 0.52, "blue": 0.96},
        "horizontalAlignment": "CENTER",
    })

    # Largeur des colonnes (approximative via pixelSize)
    requests = [
        {"updateDimensionProperties": {
            "range": {"sheetId": ws.id, "dimension": "COLUMNS", "startIndex": i, "endIndex": i + 1},
            "properties": {"pixelSize": width},
            "fields": "pixelSize",
        }}
        for i, width in enumerate([100, 130, 160, 120, 220, 180, 90, 110, 110, 200])
    ]

    # Figer la ligne d'en-têtes (scroll sans perdre les noms)
    requests.append({"updateSheetProperties": {
        "properties": {"sheetId": ws.id, "gridProperties": {"frozenRowCount": 1}},
        "fields": "gridProperties.frozenRowCount",
    }})

    # Liste déroulante pour la colonne Métier (B)
    requests.append({"setDataValidation": {
        "range": {
            "sheetId": ws.id,
            "startRowIndex": 1,
            "endRowIndex": 500,
            "startColumnIndex": 1,
            "endColumnIndex": 2,
        },
        "rule": {
            "condition": {
                "type": "ONE_OF_LIST",
                "values": [{"userEnteredValue": m} for m in METIERS],
            },
            "showCustomUi": True,
            "strict": False,
        },
    }})

    # Liste déroulante pour Intérêt 0-3 (G)
    requests.append({"setDataValidation": {
        "range": {
            "sheetId": ws.id,
            "startRowIndex": 1,
            "endRowIndex": 500,
            "startColumnIndex": 6,
            "endColumnIndex": 7,
        },
        "rule": {
            "condition": {
                "type": "ONE_OF_LIST",
                "values": [
                    {"userEnteredValue": "0 — poli"},
                    {"userEnteredValue": "1 — curieux"},
                    {"userEnteredValue": "2 — ça m'intéresse"},
                    {"userEnteredValue": "3 — quand est-ce qu'on commence ?"},
                ],
            },
            "showCustomUi": True,
            "strict": False,
        },
    }})

    # Liste déroulante oui/non pour OK test (H)
    requests.append({"setDataValidation": {
        "range": {
            "sheetId": ws.id,
            "startRowIndex": 1,
            "endRowIndex": 500,
            "startColumnIndex": 7,
            "endColumnIndex": 8,
        },
        "rule": {
            "condition": {
                "type": "ONE_OF_LIST",
                "values": [{"userEnteredValue": "oui"}, {"userEnteredValue": "non"}],
            },
            "showCustomUi": True,
            "strict": False,
        },
    }})

    sheet.batch_update({"requests": requests})
    print("✓ Onglet Rencontres structuré")
    return ws.id


def setup_bilan(sheet, rencontres_sheet_id):
    """Crée l'onglet Bilan avec formules automatiques par métier."""
    try:
        bilan = sheet.worksheet("Bilan")
        bilan.clear()
    except gspread.exceptions.WorksheetNotFound:
        bilan = sheet.add_worksheet(title="Bilan", rows=20, cols=6)

    # En-têtes du bilan
    headers = [["Métier", "Rencontres", "Intérêt moyen", "Oui au test", "Tâches citées"]]
    bilan.update("A1:E1", headers)

    # Une ligne par métier avec formules
    rows = []
    for m in METIERS:
        rows.append([
            m,
            f'=COUNTIF(Rencontres!B:B,"{m}")',
            f'=IFERROR(AVERAGEIF(Rencontres!B:B,"{m}",Rencontres!G:G),"-")',
            f'=COUNTIFS(Rencontres!B:B,"{m}",Rencontres!H:H,"oui")',
            f'=IFERROR(TEXTJOIN(", ",TRUE,IF(Rencontres!B$2:B$500="{m}",Rencontres!E$2:E$500,"")),"-")',
        ])
    bilan.update("A2:E7", rows, value_input_option="USER_ENTERED")

    # Formule de classement (métier en tête = pilote)
    bilan.update("A9", [["→ Métier pilote (intérêt le plus élevé) :"]])
    bilan.update("B9", ['=INDEX(A2:A7,MATCH(MAX(C2:C7),C2:C7,0))'], value_input_option="USER_ENTERED")

    # Mise en forme
    requests = [
        {"updateSheetProperties": {
            "properties": {"sheetId": bilan.id, "gridProperties": {"frozenRowCount": 1}},
            "fields": "gridProperties.frozenRowCount",
        }},
    ]
    bilan.spreadsheet.batch_update({"requests": requests})

    bilan.format("A1:E1", {"textFormat": {"bold": True}})
    bilan.format("A9:B9", {"textFormat": {"bold": True, "italic": True}})

    print("✓ Onglet Bilan structuré")


def main():
    if not SHEET_ID:
        print("ERREUR : GOOGLE_SHEET_ID manquant dans .env")
        sys.exit(1)
    if not os.path.exists(CREDENTIALS_FILE):
        print(f"ERREUR : fichier credentials introuvable : {CREDENTIALS_FILE}")
        print("Crée un compte de service sur console.cloud.google.com et télécharge le JSON.")
        sys.exit(1)

    print("Connexion à Google Sheets…")
    gc = connect()
    sheet = gc.open_by_key(SHEET_ID)

    print("Structure de l'onglet Rencontres…")
    rencontres_id = setup_rencontres(sheet)

    print("Structure de l'onglet Bilan…")
    setup_bilan(sheet, rencontres_id)

    print(f"\n✓ Google Sheet prêt : https://docs.google.com/spreadsheets/d/{SHEET_ID}")
    print("Sandra peut l'ouvrir, le remplir sur téléphone, et le Bilan se calcule tout seul.")


if __name__ == "__main__":
    main()
