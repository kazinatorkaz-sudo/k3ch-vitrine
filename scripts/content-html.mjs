/**
 * Contenu éditable (admin /admin/) → index.html, au moment du build (et en dev).
 * Les textes et listes sont lus dans src/content/*.json puis injectés dans index.html :
 *   {{ fichier.cle }}          texte échappé  (ex. {{ accueil.title }})
 *   {{{ bloc:nom }}}            fragment HTML généré ci-dessous (listes, cartes…)
 * Le rendu reste 100 % statique : pas de clignotement, lisible sans JavaScript.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { FONTS, SIZES } from "./fonts.mjs";
import { imageSize } from "./image-size.mjs";

const publicDir = new URL("../public/", import.meta.url);

const esc = (v) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Chemin d'image saisi dans l'admin ("/works/x.jpg", "works/x.jpg" ou URL) → src relatif à la page. */
export const src = (p) => {
  const s = String(p ?? "").trim();
  if (!s || /^(https?:)?\/\//.test(s) || s.startsWith("data:")) return s;
  return `./${s.replace(/^\.?\/+/, "")}`;
};

/** width/height lus dans le fichier image de public/ (évite les décalages au chargement). */
const dims = (it) => {
  const p = String(it?.image ?? "").trim();
  if (!p || /^(https?:)?\/\//.test(p)) return "";
  const size = imageSize(new URL(p.replace(/^\.?\/+/, ""), publicDir));
  return size ? ` width="${size.width}" height="${size.height}"` : "";
};

export function loadContent(dir) {
  const c = {};
  for (const f of readdirSync(dir)) if (f.endsWith(".json")) c[f.slice(0, -5)] = JSON.parse(readFileSync(join(dir, f), "utf8"));
  return c;
}

const PHONE_SVG = '<svg class="contact-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M6.6 3.5h2.6l1.4 4-1.9 1.3a11 11 0 0 0 6.5 6.5l1.3-1.9 4 1.4v2.6a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const IG_SVG = '<svg class="contact-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>';
const MOTIFS = ["studio", "music", "media"];
const list = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);

function piece(it, i, eager) {
  const cls = it.format === "portrait" ? "piece-portrait" : "piece-featured";
  return `
            <li class="piece ${cls}" data-accent="media" data-reveal>
              <figure>
                <div class="piece-frame">
                  <img data-work-image src="${esc(src(it.image))}"${dims(it)} alt="${esc(it.alt)}" decoding="async"${eager ? "" : ' loading="lazy"'} />
                </div>
                <figcaption>
                  <p class="piece-kicker">${esc(it.kicker)}</p>
                  <h3>${esc(it.title)}</h3>
                  <p class="piece-caption">${esc(it.caption)}</p>
                </figcaption>
              </figure>
            </li>`;
}

export function typoCss(t = {}) {
  const roles = { titres: "titres", soustitres: "soustitres", texte: "texte", boutons: "boutons" };
  const vars = [];
  const families = new Set();
  for (const [key, name] of Object.entries(roles)) {
    const r = t[key] || {};
    const font = FONTS[r.police] ? r.police : "Montserrat";
    families.add(font);
    vars.push(`--font-${name}: "${font}", ${FONTS[font].fallback};`);
    const size = SIZES.some(([v]) => v === String(r.taille)) ? String(r.taille) : "1";
    vars.push(`--ts-${name}: ${size};`);
  }
  // Montserrat (charte) est déjà chargée dans index.html ; on n'ajoute que les autres polices choisies.
  const extra = [...families].filter((f) => f !== "Montserrat");
  const link = extra.length
    ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${extra
        .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}${FONTS[f].axes ? `:${FONTS[f].axes}` : ""}`)
        .join("&amp;")}&amp;display=swap" />`
    : "";
  return `<style id="typo">html:root { ${vars.join(" ")} }</style>${link ? `\n    ${link}` : ""}`;
}

export function blocks(c) {
  const wa = `https://wa.me/${String(c.offre.whatsapp ?? "").replace(/\D/g, "")}?text=${encodeURIComponent(c.offre.bookingMessage ?? "")}`;
  return {
    typo: typoCss(c.typo),
    "maison-body": list(c.maison.body).map((p) => `\n            <p>${esc(p)}</p>`).join(""),
    "maison-cards": list(c.maison.cards)
      .map((it) => `
            <li class="work-card" data-reveal>
              <img class="work-photo" src="${esc(src(it.image))}"${dims(it)} alt="${esc(it.alt)}" loading="lazy" decoding="async" />
              <p class="work-label">${esc(it.title)}</p>
              <p class="work-line">${esc(it.headline)}</p>
            </li>`).join(""),
    "collab-pieces": list(c.collaborations.pieces).map((it, i) => piece(it, i, i === 0)).join(""),
    "collab-studio": list(c.collaborations.studio).map((it, i) => piece(it, i, false)).join(""),
    "equipe-image": `<img data-equipe-image src="${esc(src(c.equipe.image))}"${dims(c.equipe)} alt="${esc(c.equipe.alt)}" decoding="async" loading="lazy" />`,
    "atelier-atmosphere": `<img data-atmosphere-image src="${esc(src(c.atelier.atmosphere?.image))}"${dims(c.atelier.atmosphere || {})} alt="${esc(c.atelier.atmosphere?.alt)}" decoding="async" loading="lazy" />`,
    "atelier-pillars": list(c.atelier.pillars)
      .map((it, i) => {
        const motif = MOTIFS[i % MOTIFS.length];
        const visual = it.image
          ? `<div class="step-visual has-photo" data-motif="${motif}">
                <img class="step-photo" src="${esc(src(it.image))}"${dims(it)} alt="${esc(it.alt)}" loading="lazy" decoding="async" />`
          : `<div class="step-visual has-lockup" data-motif="${motif}">
                <img class="step-lockup" data-media-lockup src="./brand/k3ch-logo-principal.svg" width="791" height="726" alt="${esc(it.alt)}" decoding="async" loading="lazy" />`;
        return `
            <li class="step" data-pillar="${motif}" data-reveal>
              <div class="step-top">
                <div class="step-copy">
                  <h3>${esc(it.title)}</h3>
                  <p class="step-body">${esc(it.text)}</p>
                </div>
                <p class="step-badge" aria-hidden="true">${i + 1}</p>
              </div>
              ${visual}
                <p class="step-aside">${esc(it.aside)}</p>
              </div>
            </li>`;
      }).join(""),
    "offre-prestations": list(c.offre.prestations).map((p) => `\n            <li>${esc(p)}</li>`).join(""),
    "offre-link": esc(wa),
    "parcours-steps": list(c.parcours.steps)
      .map((it, i) => `
            <li data-reveal>
              <p class="parcours-number">${i + 1}</p>
              <h3>${esc(it.title)}</h3>
              <p>${esc(it.text)}</p>
            </li>`).join(""),
    "contact-phone": c.contact.phoneDisplay
      ? `
              <li>
                <a class="contact-link contact-phone" href="tel:${esc(String(c.contact.phoneTel ?? "").replace(/[^\d+]/g, ""))}" aria-label="Appeler le studio au ${esc(c.contact.phoneDisplay)}">
                  <span class="contact-label">${esc(c.contact.phoneLabel)}</span>
                  <span class="contact-value">
                    ${PHONE_SVG}
                    <span>${esc(c.contact.phoneDisplay)}</span>
                  </span>
                </a>
              </li>`
      : "",
    "contact-instagram": list(c.contact.instagram)
      .map((it) => {
        const handle = String(it.handle ?? "").replace(/^@/, "");
        const url = it.url || `https://www.instagram.com/${handle}/`;
        return `
              <li>
                <a class="contact-social" href="${esc(url)}" target="_blank" rel="noopener" aria-label="Instagram @${esc(handle)} (nouvel onglet)">
                  ${IG_SVG}
                  <span>@${esc(handle)}</span>
                </a>
              </li>`;
      }).join(""),
  };
}

export function renderIndex(html, c) {
  const b = blocks(c);
  return html
    .replace(/\{\{\{\s*bloc:([\w-]+)\s*\}\}\}/g, (m, name) => {
      if (!(name in b)) throw new Error(`[contenu] bloc inconnu : ${name}`);
      return b[name];
    })
    .replace(/\{\{\s*([\w-]+)\.([\w.-]+)\s*\}\}/g, (m, file, path) => {
      const v = path.split(".").reduce((o, k) => (o == null ? o : o[k]), c[file]);
      if (v == null) throw new Error(`[contenu] valeur manquante : ${file}.${path}`);
      return esc(v);
    });
}
