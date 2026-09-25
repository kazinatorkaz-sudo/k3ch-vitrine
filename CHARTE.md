# Charte graphique K3CH appliquée au site — 25/09/2026

Source : `Charte Grafique.pdf` (Illustrator, 9 planches 16:9). Contenu réel : 01 Brand DNA, 02 Logo, 03 Color palette, 04 Typography ; la planche 9 est un doublon de la 04 et les planches 5 à 8 sont vides (plan de travail de 3 × 3 pt).
Les logos et le pictogramme ont été extraits **en vectoriel** depuis le PDF (planches 02 et 03) → `public/brand/*.svg`, couleur Off White #F2F0EB.

## Règles de la charte et application

| Règle (charte) | Application sur le site |
|---|---|
| **Palette** : Obsidian Black #0B0B0B, Deep Black #000000, Graphite #1B1B1B, Soft Grey #A6A6A2, Off White #F2F0EB, Accent #BBC7A1 | Variables CSS `--obsidian`, `--black`, `--graphite`, `--soft-grey`, `--off-white`, `--accent` ; plus aucune autre couleur dans `styles.css` (seules des transparences de Soft Grey pour les filets). Fond #0B0B0B, surfaces #1B1B1B, titres #F2F0EB, texte courant #A6A6A2, accent sauge = survol, focus, repères (pack phare, numéros, statut tarifs). |
| **Fonds** des planches : dégradé Graphite → Obsidian | Cartes (Maison, packs de l'offre) et visuels de l'atelier : `linear-gradient(160deg, #1B1B1B, #0B0B0B)` (plus de halos sauge/bleu). |
| **Typographie unique : Montserrat** (ExtraLight → Black) | Montserrat seule (repli générique `sans-serif`, plus de Segoe UI) ; graisses chargées 300, 400, 500, 600, 700. |
| **Titres** : capitales, Bold (« 01 — BRAND DNA »), précédés du pictogramme | `h2` de section en capitales Montserrat Bold, tracking légèrement positif, avec le pictogramme de la charte au-dessus (masque CSS `brand/k3ch-picto.svg`). |
| **Énoncés** : phrases en Bold/SemiBold, Off White (planche 01) | Accroche du hero, ledes et manifestes en SemiBold 600, Off White ; sous-titres h3 en SemiBold. |
| **Libellés** : capitales fines espacées avec puce carrée « ▪ » (planche 02) | Surtitres, navigation, catégories, bouton en capitales espacées (500) ; liste des prestations avec puce carrée Off White. |
| **Chiffres** : Light (planche 04 : « 2026 / 4K / 24 FPS ») | Prix des packs, numéros d'étapes et de parcours en Light 300. |
| **Logotype K3CH** : capitales très espacées | Lockup typographique de secours `K3CH` en tracking 0.6em. Aucun tracking négatif n'est conservé. |
| **Logo** : principal (arbre + K3CH + MUSIC & MEDIA), horizontal, emblème seul, emblème + K3CH ; blanc sur fond noir | En-tête et pied de page : logo horizontal ; hero et bloc Media de l'atelier : logo principal ; favicon : emblème Off White sur #0B0B0B. Logos non recolorés, non déformés, sur fond noir. |
| **Style photo** (planche 01) : noir et blanc, contrasté | Photos de la maison (studio, équipe, atelier) en noir et blanc via CSS (`grayscale(1) contrast(1.06)`) ; fichiers d'origine inchangés. |

## Exception : Dondolie
Dondolie est une sous-marque (merch) avec son propre emblème or validé (`public/dondolie-emblem.png`, non modifié). L'or `#d4af4a` reste **cantonné à la section Dondolie** (emblème + surtitre « Merch »). Le cadre suit la charte K3CH : fond Deep Black, filet Graphite, titre Montserrat Bold capitales ; le halo doré de fond a été retiré, et le pictogramme K3CH n'y est pas apposé.

## Points où la charte est muette ou ambiguë (choix faits)
- **Zone de protection, taille minimale, interdits du logo** : absents. Choix : marges généreuses, pas de recoloration ni de déformation, logo horizontal ≥ 2 rem de haut.
- **Échelle typographique web, interlignage, tracking** : non spécifiés. Choix : titres 1.02, énoncés 1.25, texte 1.6 ; tracking 0 sur le texte, positif sur les capitales.
- **Pictos/icônes** : seul le pictogramme des en-têtes de planche existe ; il est utilisé comme repère de titre.
- **Libellés contradictoires** planche 02 : la version « emblème + K3CH » empilée est légendée « logo horizontale ». Le logo horizontal utilisé est celui de gauche (emblème à gauche du texte).
- **Visuels clients** (LOST ERA, bleu électrique) : laissés tels quels, ce sont des œuvres livrées, pas des photos de marque.
- **Ancien lockup « K3CH Media »** (`public/k3ch-media-lockup.jpg`) : variante absente de la charte, remplacée par le logo principal officiel (fichier conservé dans `public/`).
- La charte appli (`CHARTE_APPLI_PREMIUM_K3CH_MIX_2026.pdf`) n'a pas été utilisée.
