# Brainstorming Design — Les Petits Papiers Faciles

<response>
<text>
## Approche 1 : « Papeterie Artisanale » — Arts & Crafts Français

**Design Movement :** Arts & Crafts rencontrant l'esthétique des papeteries françaises des années 1950–1970.

**Core Principles :**
- Authenticité artisanale : textures papier, légères imperfections visuelles, traits à la main
- Lisibilité absolue : typographie généreuse, hiérarchie claire pour un public senior
- Chaleur humaine : tons chauds, photos rondes, éléments manuscrits

**Color Philosophy :** Vert sauge profond (#3D5A3E) pour l'autorité et la confiance, beige parchemin (#F0EAD6) pour la douceur et le papier, ocre doré (#C8A96E) pour les accents chaleureux. L'ensemble évoque un bureau bien rangé, des papiers soignés.

**Layout Paradigm :** Sections asymétriques avec marges généreuses à gauche, blocs de contenu décalés, séparateurs ornementaux fins. Navigation fixe discrète en haut.

**Signature Elements :**
- Filets décoratifs fins en vert sauge encadrant les sections
- Icônes dessinées à la main (style esquisse légère)
- Fond texturé papier sur les sections de contenu

**Interaction Philosophy :** Transitions douces et lentes (400ms), hover sur les cartes avec légère élévation et ombre portée chaude.

**Animation :** Entrée en fondu des sections au scroll (fade-in-up), pas d'animations agressives.

**Typography System :** Playfair Display (serif élégant) pour les titres, Lato (sans-serif lisible) pour le corps. Taille minimale 16px pour l'accessibilité senior.
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Approche 2 : « Clarté Provençale » — Modernisme Méditerranéen Chaleureux

**Design Movement :** Modernisme méditerranéen — la clarté du design scandinave tempérée par la chaleur provençale.

**Core Principles :**
- Clarté radicale : chaque section a un seul message principal, espace blanc généreux
- Chaleur méditerranéenne : couleurs inspirées de la Provence, lumière naturelle
- Accessibilité senior : typographie grande, contrastes forts, boutons larges
- Confiance immédiate : structure prévisible, navigation évidente

**Color Philosophy :** Vert sauge (#4A6741) comme couleur primaire évoquant les herbes de Provence, beige lin (#F5F0E4) pour le fond principal, blanc cassé (#FAFAF8) pour les cartes, terracotta doux (#C4856A) pour les accents d'appel à l'action. Cette palette est à la fois élégante et chaleureuse, jamais froide.

**Layout Paradigm :** Sections pleine largeur alternant fond beige et fond blanc, contenu centré avec max-width généreux. Cartes de services en grille 2 colonnes sur desktop, 1 sur mobile. Navigation sticky avec logo à gauche, menu à droite.

**Signature Elements :**
- Séparateurs en vague douce entre les sections (SVG)
- Encadrés verts sauge pour les citations et points forts
- Photos en cercle avec bordure vert sauge pour Sandra

**Interaction Philosophy :** Hover fluide sur les boutons (fond vert → plus foncé), cartes de services avec légère ombre au hover.

**Animation :** Scroll reveal discret (translateY 20px → 0, opacity 0 → 1, 500ms ease-out), aucune animation au chargement initial.

**Typography System :** Cormorant Garamond (serif élégant, rappelle les documents officiels) pour les titres H1/H2, Source Sans 3 (très lisible) pour le corps. H1 : 3rem, H2 : 2rem, corps : 1.125rem minimum.
</text>
<probability>0.09</probability>
</response>

<response>
<text>
## Approche 3 : « Bureau Bienveillant » — Néo-Classicisme Doux

**Design Movement :** Néo-classicisme administratif revisité — l'élégance des documents officiels français rendue chaleureuse et accessible.

**Core Principles :**
- Sérieux institutionnel adouci : structure rigoureuse mais couleurs douces
- Pédagogie visuelle : étapes numérotées, icônes claires, progression logique
- Humanité au premier plan : photo de Sandra proéminente, ton personnel
- Accessibilité maximale : police grande, boutons larges, contrastes WCAG AA

**Color Philosophy :** Vert forêt (#3A5C3A) pour les éléments structurants (header, footer, titres de section), crème (#F7F3EC) pour le fond général, vert sauge clair (#E8F0E8) pour les encadrés, or pâle (#E8D5A3) pour les badges et accents. Palette évoquant un document officiel bienveillant.

**Layout Paradigm :** Header avec bandeau pleine largeur vert foncé, sections alternant fond crème et fond vert sauge très clair, timeline horizontale pour "Comment ça fonctionne", grille 3 colonnes pour les services sur desktop.

**Signature Elements :**
- Bandeau décoratif en haut et bas du header (motif géométrique discret)
- Numéros d'étapes en cercles verts pour le processus
- Cartes de services avec bordure gauche colorée (accent vert)

**Interaction Philosophy :** Boutons avec transition de couleur douce, accordéons pour les FAQ, ancres de navigation fluides.

**Animation :** Compteurs animés pour les chiffres clés (42€, 21€, 20 ans), fade-in au scroll pour les sections.

**Typography System :** Libre Baskerville (serif classique, lisible) pour les titres, Open Sans pour le corps. Contraste élevé, jamais de texte gris clair sur fond clair.
</text>
<probability>0.07</probability>
</response>

---

**Approche retenue : Approche 2 — « Clarté Provençale »**

Cette approche équilibre parfaitement la chaleur du flyer original, la lisibilité nécessaire pour un public senior, et le professionnalisme attendu d'un service d'accompagnement administratif. Les tons vert sauge et beige du flyer sont directement intégrés, et la structure claire avec sections alternées facilite la lecture sur mobile comme sur desktop.
