"""
Point d'entrée principal.
Lance le serveur web (maillon 1) qui enchaîne tous les maillons.
Pour la relance quotidienne (maillon 7), lancer relance.py séparément.

Usage :
  python main.py                  # Lance le serveur
  python main.py --test           # Lance les tests automatiques
  python main.py --setup-sheet    # Structure le Google Sheet (Tâche 0)
"""

import sys
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s — %(message)s",
)


def main():
    if "--setup-sheet" in sys.argv:
        import setup_sheet
        setup_sheet.main()
    elif "--test" in sys.argv:
        import subprocess
        result = subprocess.run([sys.executable, "-m", "pytest", "tests/", "-v"])
        sys.exit(result.returncode)
    else:
        from reception import app
        from dotenv import load_dotenv
        import os
        load_dotenv()
        port = int(os.getenv("PORT", 8080))
        print(f"Serveur démarré sur http://localhost:{port}")
        app.run(host="0.0.0.0", port=port, debug=False)


if __name__ == "__main__":
    main()
