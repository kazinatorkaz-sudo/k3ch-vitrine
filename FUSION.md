# Fusion des vitrines K3CH — 25/09/2026

## Règle appliquée
La version **la plus récente** donne la direction (structure, design, contenu) ; on ne reprend des versions plus anciennes que les modules qui apportent quelque chose d'absent.

## Récence constatée
| Source | Dernier commit | Dernières modifs de contenu | Remarque |
|---|---|---|---|
| **k3ch-site** (PC, Vite) | **25/09/2026 02:45** (« vitrine en ligne sur k3ch-site.pages.dev ») | fichiers du site : 21/09 17:56 (`.gitignore` : 25/09 02:45) | Build local **identique octet pour octet** à ce qui est en ligne sur k3ch-site.pages.dev (vérifié le 25/09 04:12). Seule vraie vitrine studio. |
| k3ch-productions (GitHub Pages) | 24/09/2026 19:31 | 24/09 19:31 | Page unique de 2 Ko « K3CH Productions » (outils internes). |
| k3ch-host (Render) | 24/09/2026 18:49 | 24/09 18:49 | Même page que k3ch-productions (titre « K3CH SOLUTIONS ») + monitor interne. |

→ **Base = k3ch-site** : dernière version publiée/validée (commit et mise en ligne du 25/09 02:45). Nuance : ses fichiers de contenu datent du 21/09, alors que les pages de productions/host ont été écrites le 24/09 ; mais celles-ci sont une page provisoire identique, orientée « outils internes », pas une vitrine studio.

## Repris
| Module | Origine | Pourquoi |
|---|---|---|
| Toutes les sections (Accueil, Maison, Réalisations, Équipe, Atelier, Offre, Parcours, Dondolie, Contact), textes, photos, logo, bouton Réserver WhatsApp | k3ch-site | Version la plus récente et la plus complète (base). |
| Workflow Pages via Actions + build Vite | k3ch-site (`deploy-pages.yml`) | Déjà prêt pour Vite. |
| `configure-pages` avec `enablement: true` | k3ch-productions (`pages.yml`) | C'est le correctif qui a rendu Pages opérationnel sur k3ch-productions : active Pages tout seul. |
| Nom de workflow `pages`, hébergement GitHub Pages gratuit | k3ch-productions | Hébergement public qui fonctionne déjà sur ce compte. |

## Écarté
| Élément | Origine | Pourquoi |
|---|---|---|
| Page « On fabrique les outils (maison, club, vitrine)… », cartes HOUSE / ClubPulse / CREA, phrase « Un bot, une tâche, une marge de 15 % » | productions + host | Contenu interne (noms de comptes, marge, bots) : ne doit pas être public ; aucun rapport avec l'offre studio. |
| Contact kazinatorkaz@gmail.com / « pont K3CH-PONT » | productions + host | Adresse de l'équipe CREA, pas le contact studio (le site garde le WhatsApp studio). |
| Palette navy/or, police Segoe UI | productions + host | Remplacées par la charte (Montserrat, #0B0B0B / #1B1B1B / #A6A6A2 / #F2F0EB, accent #BBC7A1). |
| `monitor/` (sw.js, manifest « K3CH Conso », lancer.bat/.sh) | host | Tableau de bord interne de consommation (PIN, API `/api/`), `server.py` absent du dépôt : n'a pas sa place dans une vitrine publique. À garder dans k3ch-host / k3ch-board. |
| `render.yaml` (Render) | host | Hébergement remplacé par GitHub Pages (gratuit, déjà fonctionnel). |
| `wrangler` (Cloudflare) | k3ch-site | Non utilisé par GitHub Pages ; Cloudflare non modifié. |

## Nouveau
- Tarifs chargés à l'exécution depuis le Google Sheet « K3CH — Tarifs (source unique) », copie de secours `src/tarifs.json`, colonne `actif` pour masquer une ligne.
- Grille = proposition Maison du 25/09 (plancher 5 000 DA ; Freestyle et VO Express 3 500 retirés).
- Charte graphique appliquée (couleurs, Montserrat, favicon).
