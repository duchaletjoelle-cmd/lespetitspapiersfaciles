# Assistant IA pour TPE — Les Petits Papiers Faciles

Projet « Agents IA pour TPE » de Sandra Duchalet (Hyères).  
Un seul moteur, six métiers en configuration : caviste, boulangerie, coiffure, restaurant-traiteur, artisan bâtiment, garage.

---

## Qui reçoit le message ?

Le client envoie son message dans une page web de conversation (accessible par un lien simple, sur téléphone ou ordinateur). Il n'y a pas d'application à installer.  
**Fichier concerné :** `static/index.html` + `reception.py`

---

## Comment le programme récupère-t-il le message ?

La page web envoie le texte à un petit serveur (Flask) qui tourne en arrière-plan. Ce serveur reçoit chaque message et l'envoie au modèle de langage.  
**Fichier concerné :** `reception.py` — route `/message`

---

## Comment sait-il quelles questions poser ?

Chaque métier a un fichier de configuration (`metiers/caviste.json`, etc.) qui liste les informations obligatoires et les questions correspondantes, dans le vocabulaire du métier. Le modèle reçoit cette liste à chaque message et pose **une seule question à la fois** pour ce qui manque encore.  
**Fichiers concernés :** `dialogue.py` + `metiers/*.json`

---

## Où sont stockées les réponses, et qu'est-ce que la « fiche » ?

Une fiche = une ligne dans un Google Sheet (onglet « Fiches »). Elle contient : date de création, métier, nom du client, téléphone, statut, niveau d'urgence, toutes les réponses collectées, et un résumé lisible. Ce n'est pas un document Word ni un PDF — c'est une ligne dans un tableau, que le professionnel peut filtrer, trier et annoter depuis son téléphone.  
**Fichier concerné :** `classement.py`

---

## Qu'est-ce qui déclenche la création de la ligne ?

Deux cas : (1) quand tous les champs obligatoires sont remplis (action = « complet ») ; (2) quand le client demande quelque chose que l'assistant ne gère pas — prix, remise, diagnostic (action = « passage à l'humain »). Dans les deux cas, la ligne est créée immédiatement.  
**Fichier concerné :** `dialogue.py` + `classement.py`

---

## Quelles connexions sont nécessaires et comment le pro les autorise-t-il ?

Trois connexions :
1. **Google Sheets** : un compte de service Google (fichier JSON téléchargé depuis Google Cloud Console). Le pro partage son Google Sheet avec l'adresse e-mail du compte de service. À faire une seule fois — pas de reconnexion ensuite.
2. **Anthropic (modèle de langage)** : une clé API saisie dans le fichier `.env`.
3. **Brevo (e-mail)** : une clé API Brevo et une adresse d'expédition vérifiée, dans `.env`.

**Fichier concerné :** `.env.example` → copier en `.env` et remplir.

---

## Que se passe-t-il si une donnée manque ?

Si le client dit « je ne sais pas » ou refuse de répondre, le champ est marqué « non renseigné » et la conversation continue avec le champ suivant. On ne bloque jamais sur une information manquante.  
**Code concerné :** `dialogue.py`, instructions du modèle

---

## Que se passe-t-il si l'assistant ne comprend pas ?

Au bout de deux messages incompris d'affilée, l'assistant répond qu'il transmets la demande au professionnel et s'arrête. La fiche est créée avec le statut « à rappeler ».  
**Code concerné :** `dialogue.py` — attribut `incompris_consecutifs`

---

## Quand passe-t-il la main ?

Règle codée en dur (pas « intelligente ») : si le client mentionne un prix, une remise, un diagnostic, une disponibilité d'une pièce ou tout autre sujet de la liste `sujets_passage_humain` du fichier métier → passage immédiat. Même chose si deux messages consécutifs ne sont pas compris.  
**Code concerné :** `dialogue.py` + `passage_main.py`

---

## Combien ça coûte par conversation ?

- **Modèle Anthropic (Claude Haiku)** : environ 0,002 € par conversation de 10 messages (coût estimé en septembre 2026, à vérifier sur la page de tarifs Anthropic).
- **E-mail Brevo** : gratuit jusqu'à 300 e-mails par jour.
- **Hébergement du serveur** : gratuit sur Render (tier gratuit) ou ~5 €/mois sur un VPS.

**Coût total estimé par conversation : < 0,01 €.**

---

## Ce qui n'est pas encore réel en V0

| Maillon | État | Note |
|---------|------|------|
| Setup Google Sheet | ✅ Script prêt (`setup_sheet.py`) | Nécessite les credentials Google |
| Dialogue (questions) | ✅ Logique complète | Clé Anthropic requise |
| Classement (Google Sheet) | ✅ Code prêt | Idem credentials Google |
| E-mail pro | ✅ Code prêt | Clé Brevo requise |
| Passage à l'humain | ✅ Logique codée | — |
| Page web de chat | ✅ Interface prête | Hébergement à configurer |
| Relance quotidienne | ✅ Script prêt | À lancer en tâche planifiée |
| WhatsApp | 🔜 Point d'entrée prévu | Paperasse Meta à faire après V0 |
| SMS | 🔜 Fonction vide | À brancher si nécessaire |

---

## Lancer le projet (une fois les clés configurées)

```bash
# 1. Copier et remplir les variables d'environnement
cp .env.example .env
# → Éditer .env avec les vraies clés

# 2. Installer les dépendances Python
pip install -r requirements.txt

# 3. Structurer le Google Sheet (Tâche 0 — une seule fois)
python main.py --setup-sheet

# 4. Lancer les tests
python main.py --test

# 5. Démarrer le serveur
python main.py
# → Ouvrir http://localhost:8080 dans un navigateur
```

---

## Changer de métier

Un seul endroit à modifier : dans `.env`, changer la ligne `METIER=caviste` en `METIER=boulangerie` (ou tout autre métier disponible dans `metiers/`). Redémarrer le serveur. C'est tout.

---

## Ajouter ou modifier les questions d'un métier

Ouvrir `metiers/<nom-metier>.json`. Modifier la liste `informations_obligatoires` ou `sujets_passage_humain`. Redémarrer le serveur. Le code ne change pas.
