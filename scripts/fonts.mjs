// Polices proposées dans l'admin (Typographie). La police de la charte K3CH d'abord.
// Toute police ajoutée ici doit aussi être ajoutée à la liste « Police » de public/admin/config.yml.
// family : nom Google Fonts ; axes : graisses demandées (doivent exister pour la police) ;
// fallback : famille générique de repli.
export const FONTS = {
  Montserrat: { axes: "wght@300;400;500;600;700", fallback: "sans-serif", charte: true },
  Inter: { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  Poppins: { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  Raleway: { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  "Work Sans": { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  "DM Sans": { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  Manrope: { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  Outfit: { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  "Space Grotesk": { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  Archivo: { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  Oswald: { axes: "wght@300;400;500;600;700", fallback: "sans-serif" },
  "Bebas Neue": { axes: "", fallback: "sans-serif" },
  "Playfair Display": { axes: "wght@400;500;600;700", fallback: "serif" },
  "Cormorant Garamond": { axes: "wght@300;400;500;600;700", fallback: "serif" },
};

// Échelle de taille (multiplicateur des tailles actuelles). "1" = taille d'origine.
export const SIZES = [
  ["0.9", "Petit"],
  ["1", "Normal"],
  ["1.12", "Grand"],
  ["1.25", "Très grand"],
];
