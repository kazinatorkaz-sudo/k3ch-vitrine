# Modifier le site depuis l'admin

**Adresse de l'admin :** https://kazinatorkaz-sudo.github.io/k3ch-vitrine/admin/

L'admin permet de changer les textes, les photos, les listes (Label, collection Dondolie) et la typographie du site, sans toucher au code. Chaque enregistrement met le site à jour tout seul.

## 1. Créer votre clé d'accès GitHub (une seule fois)

Cette clé (un « jeton ») permet à l'admin d'enregistrer vos changements dans le site.

1. Connectez-vous à GitHub avec le compte **kazinatorkaz-sudo**, puis ouvrez :
   https://github.com/settings/personal-access-tokens/new
2. **Token name** : `Admin site K3CH`.
3. **Expiration** : choisissez une durée (par exemple 90 jours, ou « Custom » jusqu'à un an). Quand la clé expire, il suffit d'en créer une nouvelle.
4. **Resource owner** : `kazinatorkaz-sudo`.
5. **Repository access** : cochez **Only select repositories**, puis choisissez **k3ch-vitrine** (et rien d'autre).
6. **Permissions** → **Repository permissions** → **Contents** : choisissez **Read and write**. (« Metadata : Read-only » s'ajoute tout seul. Ne cochez rien d'autre.)
7. Cliquez sur **Generate token**, puis copiez la clé affichée (elle commence par `github_pat_`). GitHub ne la montre qu'une seule fois.

⚠️ **Cette clé est un mot de passe.** Elle reste enregistrée dans votre navigateur, sur votre appareil, et nulle part ailleurs. Ne la collez jamais dans une conversation, un e-mail ou un message, et ne l'envoyez à personne. Si vous pensez qu'elle a fuité, supprimez-la sur https://github.com/settings/personal-access-tokens, puis créez-en une nouvelle.

## 2. Se connecter

1. Ouvrez https://kazinatorkaz-sudo.github.io/k3ch-vitrine/admin/
2. Cliquez sur **Se connecter avec un jeton d'accès**, collez votre clé, puis cliquez sur **Se connecter**.
3. L'interface s'affiche en français si votre navigateur est en français. Sinon, changez la langue dans le menu de votre compte (en haut à droite) → **Paramètres** → **Langue**.

Vous restez connecté sur ce navigateur. Sur un ordinateur partagé, déconnectez-vous après usage (menu du compte → **Se déconnecter**).

## 3. Modifier et enregistrer

- **Sections du site** : les textes et photos de chaque section, dans l'ordre de la page (Général, Accueil, Maison, Collaborations, Label, Équipe, Atelier, Offre, Parcours, Dondolie, Contact).
- **Listes** : les titres YouTube du Label et les produits de la collection Dondolie.
- **Réglages → Typographie** : la police et la taille des titres, des sous-titres, du texte courant, des boutons et du menu, ainsi que celles de l'**accroche** et de la **sous-accroche** du haut de page, réglables séparément. L'accroche a une taille de plus, **Énorme**. **Montserrat** avec la taille **Normal** correspond à la charte K3CH, c'est le réglage d'origine. La section Dondolie garde sa propre charte et n'est pas concernée.

Ouvrez un élément, faites vos changements, puis cliquez sur **Enregistrer**.

- **Photos** : cliquez sur le champ photo, puis envoyez une image depuis votre appareil. Elle est automatiquement convertie en WebP et réduite à 2000 px maximum. Les photos du site K3CH s'affichent en noir et blanc, conformément à la charte ; celles de Dondolie restent en couleur.
- **Listes** (cartes, visuels, titres, produits) : utilisez « Ajouter » pour créer un élément et la corbeille pour en retirer un. Faites glisser un élément pour changer l'ordre.
- **Label** : collez seulement l'identifiant de la vidéo, par exemple `XP8n9puuTYo` pour `youtube.com/watch?v=XP8n9puuTYo`. La miniature YouTube s'affiche automatiquement.
- **Contact et bouton Réserver** : le numéro WhatsApp du bouton se saisit au format international, sans « + » ni espaces (`213559771074`). Pensez aussi à mettre à jour la phrase « Réservation via WhatsApp… » dans **Offre**.

## 4. Quand est-ce visible ?

Chaque enregistrement relance la publication du site. Les changements sont en ligne **en 1 à 3 minutes** environ. Rechargez ensuite la page du site (Ctrl + F5, ou tirer vers le bas sur mobile).

Vous pouvez suivre la publication sur https://github.com/kazinatorkaz-sudo/k3ch-vitrine/actions (pastille verte = en ligne).

## Bon à savoir

- **Tarifs** : la grille tarifaire a été retirée du site, elle n'est donc pas dans l'admin. Les données restent dans le code et pourront être remises en ligne par un développeur.
- **Ce qui ne se modifie pas depuis l'admin** : le logotype « dondolie », l'ordre et la mise en page des sections, les liens du menu, les logos K3CH et les couleurs des chartes.
- Chaque changement est enregistré dans l'historique GitHub : une erreur peut toujours être annulée par un développeur.
