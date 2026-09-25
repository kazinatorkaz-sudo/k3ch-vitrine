import "./styles.css";
import { copy } from "./config.js";
import { loadTarifs } from "./tarifs.js";

document.documentElement.classList.add("js");

const setText = (root, name, value) => {
  const el = root.querySelector(`[data-bind="${name}"]`);
  if (el && value != null) el.textContent = value;
};

const setImage = (el, item) => {
  if (!el || !item) return;
  el.src = item.image || item.src;
  if (item.imageAlt || item.alt) el.alt = item.imageAlt || item.alt;
  if (item.width) el.width = item.width;
  if (item.height) el.height = item.height;
};

function applyVisuals() {
  for (const work of copy.works) {
    const root = document.querySelector(`[data-work-piece="${work.id}"]`);
    if (!root) continue;
    setText(root, "work-kicker", work.kicker);
    setText(root, "work-title", work.title);
    setText(root, "work-caption", work.caption);
    setImage(root.querySelector("[data-work-image]"), work);
  }

  const atmosphere = document.querySelector("[data-atelier-atmosphere]");
  if (atmosphere) {
    setText(atmosphere, "atmosphere-kicker", copy.atelierAtmosphere.kicker);
    setText(atmosphere, "atmosphere-caption", copy.atelierAtmosphere.caption);
    setImage(atmosphere.querySelector("[data-atmosphere-image]"), copy.atelierAtmosphere);
  }
}

function setupNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  if (!toggle || !panel) return;
  toggle.addEventListener("click", () => {
    const open = panel.dataset.open === "true";
    panel.dataset.open = String(!open);
    toggle.setAttribute("aria-expanded", String(!open));
    document.body.classList.toggle("nav-open", !open);
  });
  panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    panel.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }));
}

function setupReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        current.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach((item) => observer.observe(item));
}

applyVisuals();
setupNavigation();
setupReveal();
loadTarifs(document.querySelector("[data-tarifs]"));
