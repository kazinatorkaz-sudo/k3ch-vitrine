import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",
  // GitHub Pages (projet) : BASE_PATH=/k3ch-vitrine/ est fourni par le workflow.
  // Domaine perso ou Cloudflare Pages à la racine : laisser "/".
  base: process.env.BASE_PATH || "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
