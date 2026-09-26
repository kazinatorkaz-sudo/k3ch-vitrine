import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { loadContent, renderIndex } from "./scripts/content-html.mjs";

const contentDir = fileURLToPath(new URL("./src/content", import.meta.url));

/** Injecte src/content/*.json (modifiables depuis /admin/) dans index.html. */
function k3chContent() {
  return {
    name: "k3ch-content",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => renderIndex(html, loadContent(contentDir)),
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(contentDir)) server.ws.send({ type: "full-reload" });
    },
  };
}

export default defineConfig({
  root: ".",
  publicDir: "public",
  // GitHub Pages (projet) : BASE_PATH=/k3ch-vitrine/ est fourni par le workflow.
  // Domaine perso ou Cloudflare Pages à la racine : laisser "/".
  base: process.env.BASE_PATH || "/",
  plugins: [k3chContent()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
