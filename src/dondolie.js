/**
 * Collection Dondolie (section #dondolie).
 * Données : src/dondolie.json (id, libellé, image dans public/dondolie/, texte alternatif).
 * Visuels 800 × 1000 (4:5), en couleur. Agrandissement dans un <dialog> natif :
 * Échap ferme, clic hors de l'image ferme, le focus revient sur la vignette.
 */
import products from "./dondolie.json";

const base = import.meta.env.BASE_URL;
/** "/dondolie/x.webp", "dondolie/x.webp" ou URL complète → URL publique (base GitHub Pages incluse). */
const asset = (p) => (/^(https?:)?\/\//.test(p) ? p : `${base}${String(p).replace(/^\.?\/+/, "")}`);

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  children.forEach((child) => node.append(child));
  return node;
}

function setupLightbox(dialog) {
  if (!dialog || typeof dialog.showModal !== "function") return null;
  const img = dialog.querySelector("[data-lightbox-image]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  const close = dialog.querySelector("[data-lightbox-close]");
  let opener = null;
  close?.addEventListener("click", () => dialog.close());
  // Clic sur le fond (hors de la figure) : fermeture.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    opener?.focus();
  });
  return (product, trigger) => {
    opener = trigger;
    img.src = asset(product.image);
    img.alt = product.alt || product.label;
    caption.textContent = product.label;
    document.body.classList.add("lightbox-open");
    dialog.showModal();
    close?.focus();
  };
}

export function renderDondolie(list, dialog) {
  if (!list) return;
  const open = setupLightbox(dialog);
  const items = products.filter((p) => p && p.image).map((product) => {
    const img = el("img", {
      src: asset(product.image),
      width: "800",
      height: "1000",
      alt: product.alt || product.label,
      loading: "lazy",
      decoding: "async",
    });
    const frame = open
      ? el("button", { type: "button", class: "dondolie-frame", "aria-label": `Agrandir : ${product.label}` }, [img])
      : el("div", { class: "dondolie-frame" }, [img]);
    if (open) frame.addEventListener("click", () => open(product, frame));
    return el("li", { class: "dondolie-item", "data-product": product.id, "data-reveal": "" }, [
      el("figure", {}, [frame, el("figcaption", { class: "dondolie-label", text: product.label })]),
    ]);
  });
  list.replaceChildren(...items);
}
