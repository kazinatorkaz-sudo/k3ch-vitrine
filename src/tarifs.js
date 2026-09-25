/**
 * Tarifs — chargés à l'exécution depuis le Google Sheet « K3CH — Tarifs (source unique) ».
 * Ordre des sources : 1) Sheet (CSV gviz, si partagé « lecteur » par lien)
 *                     2) copie intégrée src/tarifs.json (reconstruite à chaque déploiement).
 * Colonnes : categorie, code, prestation, prix_DA, unite/note, actif (OUI/NON), ordre.
 */
import embedded from "./tarifs.json";
import { tarifs as cfg } from "./config.js";

const NBSP = "\u00a0";

export function sheetCsvUrl() {
  if (!cfg.sheetId) return "";
  return `https://docs.google.com/spreadsheets/d/${cfg.sheetId}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(cfg.sheetName)}`;
}

/** CSV RFC 4180 minimal (guillemets, "" échappés, CRLF). */
export function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const head = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).filter((r) => r.some((v) => v.trim() !== "")).map((r) => {
    const o = {};
    head.forEach((h, i) => { if (h) o[h] = (r[i] ?? "").trim(); });
    return o;
  });
}

const toInt = (v) => {
  if (typeof v === "number") return Math.round(v);
  const digits = String(v ?? "").replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : NaN;
};

const isActive = (v) => ["OUI", "O", "YES", "TRUE", "1", "X"].includes(String(v ?? "").trim().toUpperCase());

export function formatDA(n) {
  return `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)}${NBSP}DA`;
}

/** Normalise, filtre actif=OUI, groupe par catégorie, trie par ordre. */
export function normalize(rows) {
  const items = [];
  rows.forEach((r, idx) => {
    const prestation = String(r.prestation ?? "").trim();
    const prix = toInt(r.prix_da ?? r.prix_DA);
    if (!prestation || Number.isNaN(prix) || !isActive(r.actif)) return;
    const rawNote = String(r["unite/note"] ?? r.note ?? "").trim();
    const m = rawNote.match(/^(phare|option|d[èe]s)\s*[·:\-–—]\s*/i);
    const flag = m ? m[1].toLowerCase().replace("des", "dès") : "";
    const ordre = toInt(r.ordre);
    items.push({
      categorie: String(r.categorie ?? "").trim() || "Prestations",
      code: String(r.code ?? "").trim(),
      prestation,
      prix,
      note: m ? rawNote.slice(m[0].length) : rawNote,
      flag,
      ordre: Number.isNaN(ordre) ? 100000 + idx : ordre,
    });
  });
  const groups = new Map();
  for (const it of items) {
    if (!groups.has(it.categorie)) groups.set(it.categorie, []);
    groups.get(it.categorie).push(it);
  }
  return [...groups.entries()]
    .map(([title, list]) => ({ title, items: list.sort((a, b) => a.ordre - b.ordre) }))
    .sort((a, b) => a.items[0].ordre - b.items[0].ordre);
}

export function priceLabel(it) {
  if (it.flag === "option") return `+${NBSP}${formatDA(it.prix)}`;
  if (it.flag === "dès") return `dès ${formatDA(it.prix)}`;
  return formatDA(it.prix);
}

const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};

export function render(root, groups, source) {
  const packsHost = root.querySelector("[data-tarifs-packs]");
  const listHost = root.querySelector("[data-tarifs-groups]");
  if (!packsHost || !listHost) return;
  packsHost.replaceChildren();
  listHost.replaceChildren();
  for (const g of groups) {
    if (/pack/i.test(g.title)) {
      for (const it of g.items) {
        const li = el("li", `pack-card${it.flag === "phare" ? " is-phare" : ""}`);
        li.dataset.pack = it.code;
        li.append(el("p", "pack-kicker", it.flag === "phare" ? "Phare" : g.title));
        li.append(el("h3", null, it.prestation));
        li.append(el("p", "pack-price", priceLabel(it)));
        if (it.note) li.append(el("p", "pack-text", it.note));
        packsHost.append(li);
      }
    } else {
      const sec = el("section", "tarif-group");
      sec.append(el("h3", null, g.title));
      const ul = el("ul", "tarif-list");
      for (const it of g.items) {
        const li = el("li");
        li.dataset.code = it.code;
        li.append(el("span", "tarif-name", it.prestation));
        li.append(el("span", "tarif-price", priceLabel(it)));
        if (it.note) li.append(el("span", "tarif-note", it.note));
        ul.append(li);
      }
      sec.append(ul);
      listHost.append(sec);
    }
  }
  packsHost.hidden = !packsHost.children.length;
  root.dataset.tarifsSource = source;
  const status = root.querySelector("[data-tarifs-status]");
  if (status) {
    status.textContent = source === "sheet" ? "Tarifs : grille en ligne (Google Sheet)." : "Tarifs : copie intégrée au site.";
    status.hidden = !new URLSearchParams(location.search).has("tarifs");
  }
}

export async function loadTarifs(root) {
  if (!root) return;
  render(root, normalize(embedded), "embedded");
  const url = sheetCsvUrl();
  if (!url) return;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), cfg.timeoutMs || 6000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
    const type = res.headers.get("content-type") || "";
    if (!res.ok || !type.includes("csv")) throw new Error(`HTTP ${res.status} ${type}`);
    const groups = normalize(parseCsv(await res.text()));
    if (!groups.length) throw new Error("Sheet vide ou colonnes introuvables");
    render(root, groups, "sheet");
    console.info("[tarifs] chargés depuis le Google Sheet", groups);
  } catch (err) {
    console.warn("[tarifs] Sheet illisible — copie intégrée utilisée :", err.message || err);
  } finally {
    clearTimeout(timer);
  }
}
