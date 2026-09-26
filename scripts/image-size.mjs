// Dimensions d'une image (JPEG, PNG, WebP, GIF, SVG) lues dans l'en-tête du fichier, sans dépendance.
// Sert à écrire width/height corrects dans index.html quand une image est changée depuis l'admin.
import { readFileSync, existsSync } from "node:fs";

export function imageSize(file) {
  if (!existsSync(file)) return null;
  const b = readFileSync(file);
  try {
    if (b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG") return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    if (b.toString("ascii", 0, 3) === "GIF") return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const chunk = b.toString("ascii", 12, 16);
      if (chunk === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
      if (chunk === "VP8L") {
        const n = b.readUInt32LE(21);
        return { width: 1 + (n & 0x3fff), height: 1 + ((n >> 14) & 0x3fff) };
      }
      if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    }
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1];
        if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
    const txt = b.toString("utf8", 0, Math.min(b.length, 4096));
    if (/<svg[\s>]/i.test(txt)) {
      const vb = txt.match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
      if (vb) return { width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
    }
  } catch {
    /* fichier illisible : pas de dimensions */
  }
  return null;
}
