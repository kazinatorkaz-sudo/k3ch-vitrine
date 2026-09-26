import "./styles.css";
import { renderLabel } from "./label.js";
import { renderDondolie } from "./dondolie.js";

document.documentElement.classList.add("js");

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

renderLabel(document.querySelector("[data-label-list]"));
renderDondolie(document.querySelector("[data-dondolie-list]"), document.querySelector("[data-dondolie-lightbox]"));
setupNavigation();
setupReveal();
