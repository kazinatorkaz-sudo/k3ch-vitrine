// Recopie le Google Sheet « Tarifs » dans src/tarifs.json (copie de secours intégrée au site).
// Usage : npm run tarifs:sync   — sans effet (et sans erreur) si le Sheet n'est pas partagé par lien.
import { writeFileSync } from "node:fs";
import { parseCsvRows } from "./csv.mjs";

const SHEET_ID = process.env.TARIFS_SHEET_ID || "1ZXS_fkVi8h8vj8SAdhJUB0GM2IFFVdhBLpHDFhgNQ8k";
const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&headers=1&sheet=Tarifs`;
try {
  const res = await fetch(url);
  const type = res.headers.get("content-type") || "";
  if (!res.ok || !type.includes("csv")) throw new Error(`HTTP ${res.status} (${type}) — Sheet non partagé par lien ?`);
  const rows = parseCsvRows(await res.text());
  const keep = ["categorie", "code", "prestation", "prix_DA", "unite/note", "actif", "ordre"];
  const out = rows
    .filter((r) => r.prestation)
    .map((r) => {
      const o = {};
      for (const k of keep) o[k] = r[k.toLowerCase()] ?? "";
      o.prix_DA = parseInt(String(o.prix_DA).replace(/[^\d]/g, ""), 10) || 0;
      o.ordre = parseInt(String(o.ordre).replace(/[^\d]/g, ""), 10) || 0;
      return o;
    });
  if (!out.length) throw new Error("aucune ligne lue");
  writeFileSync(new URL("../src/tarifs.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
  console.log(`tarifs.json mis à jour depuis le Sheet (${out.length} lignes).`);
} catch (e) {
  console.warn(`[tarifs:sync] ignoré : ${e.message}. La copie src/tarifs.json existante est conservée.`);
}
