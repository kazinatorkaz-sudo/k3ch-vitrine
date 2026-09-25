# K3CH — site vitrine unique (Maison K3CH Production)

> Fusion des trois vitrines (k3ch-site, k3ch-productions, k3ch-host) en **un seul site**, le 25/09/2026. Détail des choix : [`FUSION.md`](FUSION.md).
>
> En ligne : https://kazinatorkaz-sudo.github.io/k3ch-vitrine/

Site vitrine one-page de **Maison K3CH Production** (Alger — Studio · Music · Media).

Implémentation simple : **Vite + HTML / CSS / JS** vanilla. Les textes de marque, les contacts publics et l’affichage du teaser Dondolie sont centralisés dans `src/config.js`.

La page unique enchaîne un accueil manifesto (hero + maison + grille des trois matières), une grille de réalisations (LOST ERA), l’équipe, un atelier façon studio, l’offre studio (forfaits DA + CTA WhatsApp), le parcours intention → réalisation, le teaser merch Dondolie, puis le bloc contact. Pas de pages séparées : la navigation ancre ces sections.

## Prérequis

- Node.js 20 ou plus récent
- npm

## Commandes

```bash
npm install
npm run dev
npm run build
```

- `npm run dev` — serveur local de développement
- `npm run build` — génération du dossier `dist/`
- `npm run preview` — prévisualisation de la version construite

## Remplacer les contacts

Ouvrir `src/config.js` et renseigner **uniquement** les informations destinées à être publiées, dans l’objet `contact` :

- `email`
- `phone`
- `whatsapp` — numéro affiché tel quel ; le lien `wa.me` est dérivé (numéros algériens `0…` → `213…`)
- `instagram`
- `youtube`
- `site`

Laisser une chaîne vide (`""`) pour ne rien afficher. Le site n’invente aucun contact : s’il n’y a rien de renseigné, un message d’attente s’affiche.

Ne jamais y placer de finances internes, d’accès opérationnels ou d’informations non publiques.

## Tarifs — modifiables à tout moment, sans toucher au code

**Source unique : le Google Sheet « K3CH — Tarifs (source unique) »**
https://docs.google.com/spreadsheets/d/19cBflhTpPGH1C6e2ZNZ5e4VIByuqNV8YbUCaWu1YbX0/edit

Onglet `Tarifs`, colonnes : `categorie`, `code`, `prestation`, `prix_DA`, `unite/note`, `actif` (OUI/NON), `ordre`. L'onglet `Mode d'emploi` explique tout (changer un prix, masquer une ligne, ajouter une ligne).

Le site lit le Sheet **à chaque visite** (`src/tarifs.js`, point d'accès CSV `gviz/tq?tqx=out:csv&sheet=Tarifs`) : il masque les lignes `actif = NON`, regroupe par `categorie`, trie par `ordre` et affiche « 12 000 DA ». Les catégories dont le nom contient « Pack » s'affichent en cartes. Mots-clés en début de `unite/note` : `Phare ·` (carte mise en avant), `Option ·` (« + 2 500 DA »), `Dès ·` (« dès 8 000 DA »).

### ⚠️ À faire une fois : autoriser le site à lire le Sheet

Dans le Sheet : **Partager → Accès général → « Tous les utilisateurs disposant du lien » → rôle « Lecteur » → OK**. (Les prix sont publics ; ne rien mettre d'interne dans ce tableau.) Tant que ce n'est pas fait, le site affiche la copie de secours ci-dessous.

### Copie de secours intégrée : `src/tarifs.json`

Si le Sheet est illisible (pas partagé, Google indisponible, hors ligne), le site affiche `src/tarifs.json`, embarqué dans le build. Il est recopié automatiquement depuis le Sheet à chaque déploiement et chaque nuit (workflow `pages`, étape `npm run tarifs:sync`).

Plan B sans Sheet : modifier `src/tarifs.json` directement sur GitHub — ouvrir le fichier → icône crayon ✏️ → changer `"prix_DA": 10000` (nombre sans espace) ou `"actif": "NON"` → **Commit changes**. Le site se republie tout seul en 1 à 2 minutes (onglet Actions). Attention : si le Sheet est partagé, c'est lui qui fait foi et la prochaine synchro écrase `tarifs.json`.

Vérifier la source utilisée : ouvrir le site avec `?tarifs` à la fin de l'URL (ex. `…/k3ch-vitrine/?tarifs#offre`) — une ligne sous la grille indique « grille en ligne (Google Sheet) » ou « copie intégrée ».

Le bouton **Réserver** ouvre WhatsApp (`wa.me`) avec un message prérempli (inchangé). Acompte **50 %**.

## Logo officiel

Le monogramme (arbre géométrique) se trouve dans `public/logo.png`. Il est branché via `brand.logoSrc` dans `src/config.js` et s’affiche dans la navigation, **sans recadrage ni retouche**. Le hero reste un manifesto typographique ; le logo n’est pas redessiné.

Pour le remplacer : déposer le nouveau fichier au même chemin (ou un autre dans `public/`), puis mettre à jour `brand.logoSrc` et `brand.logoAlt`. Laisser `logoSrc` vide pour revenir au lockup typographique **K3CH**.

Ne pas redessiner la marque. Conserver le ratio (largeur automatique, hauteur contrainte en CSS).

Le lockup **K3CH Media** (`public/k3ch-media-lockup.jpg`) n’est pas le marqueur de navigation : il habite le bloc Media de l’atelier.

## Photos

Les visuels publics sont dans `public/` (et `public/works/`). Chemins et légendes sont centralisés dans `src/config.js` (`copy.works`, `copy.equipeImage`, `copy.atelierAtmosphere`, `copy.mediaLockup`, `copy.dondolieEmblem`).

| Fichier | Usage |
| --- | --- |
| `public/logo.png` | Marque de navigation |
| `public/works/lost-era-duo.jpg` | Réalisation mise en avant — LOST ERA |
| `public/works/lost-era-psyconce.jpg` | Affiche LOST ERA / PSYCONCE |
| `public/works/spotlight-papers.jpg` | Atmosphère Atelier / Création |
| `public/equipe-k3ch.jpg` | Section Équipe |
| `public/k3ch-media-lockup.jpg` | Bloc Media (atelier) |
| `public/dondolie-emblem.jpg` | Emblème Dondolie (teaser merch) |

Ne pas inventer de noms de clients au-delà de ce qui figure sur les visuels (LOST ERA, PSYCONCE).

## Teaser Dondolie

Le teaser est optionnel. Dans `src/config.js` :

```js
export const features = {
  dondolieTeaser: true,
};
```

Passer `dondolieTeaser` à `false` pour retirer la section et le lien de navigation.

Les textes du teaser se trouvent dans `copy.dondolieTitle` et `copy.dondolieText`. L’emblème (`public/dondolie-emblem.jpg`) est branché via `copy.dondolieEmblem` et s’affiche en visuel principal de la section.

## Publication (GitHub Pages)

Workflow `.github/workflows/pages.yml` : `npm ci` → `npm run tarifs:sync` → `npm run build` (avec `BASE_PATH=/k3ch-vitrine/`) → déploiement Pages (source « GitHub Actions », activée automatiquement par `configure-pages` `enablement: true`). Déclenché à chaque push sur `main`, à la main (Actions → pages → Run workflow) et chaque nuit.

En local : `npm run dev` sert à la racine (`http://localhost:5173/`). Pour tester comme en ligne : `BASE_PATH=/k3ch-vitrine/ npm run build && npx vite preview --base /k3ch-vitrine/`.

Domaine personnalisé plus tard : ajouter le domaine dans Settings → Pages et passer `BASE_PATH` à `/` dans le workflow.

## Accessibilité et mouvement

Le site est conçu mobile-first, avec navigation clavier, liens d’évitement et respect de `prefers-reduced-motion` (défilement instantané).

## Structure

One-page, ancres internes :

1. **Accueil** — manifesto centré + « Entrer » / « Réserver »
2. **Maison** — grand titre, pitch, grille Studio / Music / Media
3. **Réalisations** — grille visuelle LOST ERA (visuel + affiche PSYCONCE)
4. **Équipe** — photo de la maison
5. **Atelier** — atmosphère Création, puis étapes numérotées (Media avec lockup K3CH Media)
6. **Offre** — grille tarifaire chargée depuis le Google Sheet (packs en cartes + listes par catégorie), CTA WhatsApp
7. **Parcours** — Intention → Création → Réalisation
8. **Dondolie** — teaser merch optionnel (`features.dondolieTeaser`), emblème en visuel principal
9. **Contact** — titre sobre + coordonnées publiques si renseignées, sinon message d’attente (pastilles sociales seulement si renseignées)

```
index.html
src/config.js    # marque, copy, visuels, contacts, options, id du Sheet des tarifs
src/tarifs.js    # lecture du Sheet + rendu de la grille
src/tarifs.json  # copie de secours des tarifs
scripts/sync-tarifs.mjs # Sheet → src/tarifs.json
src/main.js      # hydratation, navigation, défilement
src/styles.css
public/favicon.svg
public/logo.png
public/equipe-k3ch.jpg
public/k3ch-media-lockup.jpg
public/dondolie-emblem.jpg
public/works/lost-era-duo.jpg
public/works/lost-era-psyconce.jpg
public/works/spotlight-papers.jpg
```
