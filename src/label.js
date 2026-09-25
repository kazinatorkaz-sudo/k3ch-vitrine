/**
 * Section Label : titres des artistes du label K3CH.
 * Données : src/label.json (id YouTube, artiste, titre).
 * Miniature locale public/label/<id>.jpg ; l'iframe youtube-nocookie
 * n'est créée qu'au clic (lite-embed, rien de lourd au chargement).
 */
import tracks from "./label.json";

const base = import.meta.env.BASE_URL;

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  children.forEach((child) => node.append(child));
  return node;
}

function play(frame, track) {
  const iframe = el("iframe", {
    src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(track.id)}?autoplay=1`,
    title: [track.artist, track.title].filter(Boolean).join(" — "),
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
    allowfullscreen: "",
    referrerpolicy: "strict-origin-when-cross-origin",
  });
  frame.replaceChildren(iframe);
  frame.classList.add("is-playing");
  iframe.focus();
}

function renderTrack(track) {
  const label = [track.artist, track.title].filter(Boolean).join(" — ");
  const img = el("img", {
    src: `${base}label/${track.id}.jpg`,
    width: "1280",
    height: "720",
    alt: "",
    loading: "lazy",
    decoding: "async",
  });
  const button = el(
    "button",
    { type: "button", class: "label-play", "aria-label": `Lire ${label}` },
    [img, el("span", { class: "label-play-icon", "aria-hidden": "true" })],
  );
  const frame = el("div", { class: "piece-frame", "data-label-player": track.id }, [button]);
  button.addEventListener("click", () => play(frame, track), { once: true });

  const caption = el("figcaption");
  if (track.artist) caption.append(el("p", { class: "piece-kicker", text: track.artist }));
  if (track.title) caption.append(el("h3", { text: track.title }));
  caption.append(
    el(
      "a",
      {
        class: "hero-link label-link",
        href: `https://www.youtube.com/watch?v=${encodeURIComponent(track.id)}`,
        target: "_blank",
        rel: "noopener",
      },
      [el("span", { text: "Voir sur YouTube" }), el("span", { "aria-hidden": "true", text: "↗" })],
    ),
  );

  return el("li", { class: "piece piece-featured", "data-label-track": track.id, "data-reveal": "" }, [
    el("figure", {}, [frame, caption]),
  ]);
}

export function renderLabel(list) {
  if (!list) return;
  list.replaceChildren(...tracks.filter((t) => t && t.id).map(renderTrack));
}
