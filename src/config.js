/**
 * Réglages techniques du site (les contenus éditables sont dans src/content/).
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

/*
 * Les textes, images et contacts du site sont dans src/content/*.json (modifiables depuis
 * l'admin /admin/) et injectés dans index.html au build (scripts/content-html.mjs).
 * Listes : src/label.json (Label), src/dondolie.json (collection), src/tarifs.json (tarifs).
 */

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
