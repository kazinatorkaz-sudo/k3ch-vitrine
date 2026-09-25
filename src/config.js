/**
 * Source unique de la marque et des contacts publics.
 * Remplir uniquement des informations destinées à être publiées.
 * Ne jamais y placer de finances, d’accès internes ou de détails opérationnels.
 */

export const brand = {
  lockup: "K3CH",
  name: "Maison K3CH Production",
  city: "Alger",
  tagline: "Studio · Music · Media",
  /** Chemin public. Laisser vide pour le lockup typographique K3CH. */
  logoSrc: `${import.meta.env.BASE_URL}brand/k3ch-logo-horizontal.svg`,
  logoAlt: "Maison K3CH Production",
};

export const copy = {
  documentTitle: "Maison K3CH Production — Alger",
  documentDescription:
    "Maison de création à Alger. Studio, Music, Media — cabine, mix, master. On livre le titre, pas juste l’heure.",
  heroTitle: "Une maison de création à Alger.",
  heroLine: "Studio, musique, médias — des récits qui restent.",
  heroCta: "Entrer",
  heroBook: "Réserver",
  maisonTitle: "Maison",
  maisonLede: "Un même regard, de l’intention à la réalisation.",
  maisonBody: [
    "K3CH réunit le studio, la musique et les médias à Alger. Image nette, son juste, récit qui reste.",
  ],
  worksNote: "",
  worksTitle: "Collaborations",
  worksIntro: "Studio & media — la maison en images.",
  works: [
    {
      id: "lost-era",
      kicker: "Media",
      title: "LOST ERA",
      caption: "Visuel.",
      image: `${import.meta.env.BASE_URL}works/lost-era-duo.jpg`,
      imageAlt:
        "LOST ERA — deux silhouettes dos à dos, les yeux bandés, titre bleu électrique.",
      width: 2048,
      height: 1152,
    },
    {
      id: "lost-era-psyconce",
      kicker: "PSYCONCE",
      title: "LOST ERA",
      caption: "Affiche.",
      image: `${import.meta.env.BASE_URL}works/lost-era-psyconce.jpg`,
      imageAlt: "Affiche LOST ERA, PSYCONCE — un visage levé vers le noir.",
      width: 1006,
      height: 1440,
    },
    {
      id: "studio-booth",
      kicker: "Studio",
      title: "Cabine",
      caption: "Prise de voix",
      image: `${import.meta.env.BASE_URL}works/studio-booth.jpg`,
      imageAlt: "Cabine vocal — prise de voix, Maison K3CH Studio.",
      width: 1086,
      height: 1448,
    },
    {
      id: "studio-session",
      kicker: "Studio",
      title: "Session",
      caption: "Mix & direction",
      image: `${import.meta.env.BASE_URL}works/studio-session.jpg`,
      imageAlt: "Session mix — tee-shirts logo, Maison K3CH Studio.",
      width: 1448,
      height: 1086,
    },
    {
      id: "studio-wall",
      kicker: "Studio",
      title: "Mur",
      caption: "Mur K3CH Studio",
      image: `${import.meta.env.BASE_URL}works/studio-wall.jpg`,
      imageAlt: "Mur K3CH STUDIO et vinyles — Maison K3CH Studio.",
      width: 1448,
      height: 1086,
    },
    {
      id: "studio-desk",
      kicker: "Studio",
      title: "Desk",
      caption: "Contrôle",
      image: `${import.meta.env.BASE_URL}works/studio-desk.jpg`,
      imageAlt: "Desk vue plongée — contrôle, Maison K3CH Studio.",
      width: 1086,
      height: 1448,
    },
  ],
  equipeTitle: "Équipe",
  equipeLede: "La maison, réunie.",
  equipeCaption: "Maison K3CH Production — Alger.",
  equipeImage: `${import.meta.env.BASE_URL}equipe-k3ch.jpg`,
  equipeImageAlt: "L’équipe Maison K3CH Production, réunie, vue en plongée.",
  equipeWidth: 1800,
  equipeHeight: 1350,
  atelierAtmosphere: {
    kicker: "Studio",
    caption: "Cabine & contrôle",
    image: `${import.meta.env.BASE_URL}works/studio-workstation.jpg`,
    imageAlt:
      "Workstation double moniteur — cabine et contrôle, Maison K3CH Studio.",
    width: 1448,
    height: 1086,
  },
  mediaLockup: {
    src: `${import.meta.env.BASE_URL}brand/k3ch-logo-principal.svg`,
    alt: "K3CH Music & Media — Maison K3CH Production, Alger.",
    width: 791,
    height: 726,
  },
  atelierTitle: "Atelier",
  atelierIntro:
    "Le plateau, la salle, l’écran. Votre regard prime, de l’intention à la diffusion.",
  pillars: [
    {
      id: "studio",
      number: "1",
      title: "Studio",
      headline: "L’image, nette.",
      text: "Captation, plateau, lumière. On cadre ce qui doit rester.",
      aside: "Le silence, juste avant le clap.",
    },
    {
      id: "music",
      number: "2",
      title: "Music",
      headline: "Le son, juste.",
      text: "Direction, enregistrement, mix. La musique porte le récit — elle n’est pas un décor.",
      aside: "Quand ça sonne, on le sent.",
    },
    {
      id: "media",
      number: "3",
      title: "Media",
      headline: "Le récit, clair.",
      text: "Formats, plateformes, contenus. Être vu, pas seulement publié.",
      aside: "Moins de bruit. Plus de présence.",
    },
  ],
  parcoursTitle: "Parcours",
  parcoursIntro: "De l’intention à la réalisation.",
  parcours: [
    {
      id: "intention",
      number: "1",
      title: "Intention",
      text: "On écoute. On clarifie le geste.",
    },
    {
      id: "creation",
      number: "2",
      title: "Création",
      text: "L’idée prend forme — cadre, rythme, matière.",
    },
    {
      id: "realisation",
      number: "3",
      title: "Réalisation",
      text: "On tourne, on assemble, on livre.",
    },
  ],
  /**
   * Grille publique Maison (DA, Alger).
   * Ne pas y placer de tarifs €, de grille « accessible »,
   * de marges internes, ni d’objectifs financiers.
   */
  offre: {
    kicker: "Studio",
    title: "Offre",
    lede: "On livre le titre, pas juste l’heure.",
    intro: "Cabine, mix, master — forfaits en dinars, Alger.",
    prestationsTitle: "Prestations",
    prestations: [
      { id: "recording", title: "Recording" },
      { id: "mix", title: "Mix" },
      { id: "mastering", title: "Mastering" },
      { id: "location", title: "Location" },
      { id: "podcast", title: "Podcast / VO" },
    ],
    note: "Réservation via WhatsApp. Acompte 50 % pour confirmer le créneau.",
    cta: "Réserver",
    bookingMessage: "Bonjour, je souhaite réserver une session studio.",
  },
  dondolieKicker: "Merch",
  dondolieTitle: "dondolie",
  dondolieStory: "Fourmi + peace & love + cœur.",
  dondolieText: "L’or sur le noir. Une ligne à venir.",
  dondolieEmblem: {
    src: `${import.meta.env.BASE_URL}dondolie-emblem.png`,
    alt: "Emblème Dondolie en or — fourmi, symbole peace & love et cœur.",
    width: 1200,
    height: 1200,
  },
  contactTitle: "Contactez-nous",
  contactFallback: "Les coordonnées seront publiées ici.",
  footerRights: "Tous droits réservés.",
};

/**
 * Contacts publics uniquement. Chaînes vides = non affichées.
 * WhatsApp : afficher le numéro national tel que fourni.
 * Le lien wa.me utilise la forme internationale (DZ : 05… → 213…).
 */
export const contact = {
  email: "",
  phone: "",
  whatsapp: "05 59 77 10 74",
  instagram: "",
  youtube: "",
  site: "",
};

export const features = {
  /** Teaser merch optionnel. Passer à false pour le retirer. */
  dondolieTeaser: true,
};

/**
 * Tarifs : le Google Sheet « K3CH — Tarifs (source unique) » fait foi.
 * Il doit être partagé « Tous les utilisateurs disposant du lien : Lecteur ».
 * Sinon (ou hors ligne), le site affiche la copie intégrée src/tarifs.json.
 */
export const tarifs = {
  sheetId: "19cBflhTpPGH1C6e2ZNZ5e4VIByuqNV8YbUCaWu1YbX0",
  sheetName: "Tarifs",
  timeoutMs: 6000,
};
