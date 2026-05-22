# VecinoAI — Contexto del proyecto

## Repositorio y deploy
- **Repo:** github.com/claudiokerekes/vecinoAI
- **Dominio:** https://vecinoai.co
- **Local:** /Users/claudiokerekes/proyectos/vecinoai-web
- **Deploy:** GitHub Pages automático via GitHub Actions al hacer push a `main`

## Arquitectura de marca
- **CK Soluciones** → empresa tecnológica matriz
- **VecinoAI** → asistente de IA para administración de propiedades (HOA, PH, condominios)
- **NO mencionar PQRSuite** en el sitio — VecinoAI se posiciona de forma independiente

## Stack técnico
- HTML estático puro (sin framework JS)
- Tailwind CSS compilado con CLI → `assets/css/tailwind.css` (~20 KB)
- `tailwind.config.js` incluye colores `brand-*` personalizados (brand-500: `#6366f1`)
- Google Fonts: Inter (400–900)
- `assets/js/shared.js` → nav + footer + GA4 + Facebook Pixel + eventos de tracking

## Comandos clave
```bash
npm run build:css      # compilar Tailwind (requerido tras cambiar clases HTML)
./dev.sh               # servidor local con .env inyectado (http://localhost:8000)
git push origin main   # dispara deploy automático en GitHub Actions
```

## Secrets en GitHub (Settings → Secrets → Actions)
| Secret | Uso |
|--------|-----|
| `WEB3FORMS_KEY` | Formulario demo → inyectado en demo/index.html |
| `GA4_ID` | Creado pero ya no se usa (GA4 hardcodeado en shared.js) |
| `FACEBOOK_PIXEL_ID` | Creado pero ya no se usa (Pixel hardcodeado en shared.js) |

## Analytics hardcodeados en shared.js
- **GA4:** `G-SWFT48PG3Z`
- **Facebook Pixel:** `1646636346569890`
- Eventos: scroll 25/50/75/100%, whatsapp_click, form_submit_demo

## Variables en .env (local, gitignoreado)
```
WEB3FORMS_KEY=4f7cac1a-515e-4203-aa5e-a7a12d7d28ba
GA4_ID=G-SWFT48PG3Z
FACEBOOK_PIXEL_ID=
```

## Estructura de páginas (20 total)
```
index.html                                    # Home (depth 0)
about/ contact/ demo/                         # Empresa (depth 1)
privacy-policy/ terms-and-conditions/         # Legal (depth 1)
how-it-works/ ai-knowledge-base/ security/    # Técnicas (depth 1)
property-management-software/                 # SEO core (depth 1)
ai-property-management/
whatsapp-property-management/
resident-request-automation/
amenity-reservations/
property-management-automation/
blog/                                         # Blog index (depth 1)
blog/ai-for-property-management/              # Posts (depth 2)
blog/automating-resident-requests/
blog/whatsapp-for-residential-communities/
blog/digital-amenity-reservations/
```

## Sistema de rutas (IMPORTANTE)
- Todas las rutas son **relativas** (no root-relative `/`) para funcionar con `file://`
- `shared.js` detecta protocolo y calcula `../` según profundidad automáticamente
- Depth 0 = `index.html`, Depth 1 = `about/index.html`, Depth 2 = `blog/post/index.html`
- Al agregar páginas nuevas, actualizar `DEPTHS` en `dev.sh` y `sitemap.xml`

## Nav y footer
- El nav y footer de TODAS las páginas (incluido index.html) viene de `shared.js`
- `index.html` tiene `<div id="nav-ph"></div>` — shared.js lo reemplaza
- Mobile: logo + hamburger (sin botones en la barra)
- Desktop: logo + links + CTA "Solicitar demo"

## WhatsApp
- Número: `+573145678786`
- Link: `https://wa.me/573145678786`

## Formulario demo
- Servicio: Web3Forms (https://web3forms.com)
- Placeholder en código: `__WEB3FORMS_KEY__`
- GitHub Actions inyecta el secret antes de desplegar
- Envío AJAX, muestra éxito inline sin redirect

## OG Image
- Template: `og-image.html` (abrir en Chrome, screenshot 1200×630, guardar como `og-image.png`)
- PNG debe estar en la raíz: `vecinoai.co/og-image.png`
- Meta tags ya configuradas en index.html y shared.js

## Pendiente / próximos pasos
- [ ] Subir `og-image.png` a la raíz del repo
- [ ] Estrategia de backlinks (G2, Capterra, Product Hunt, Google My Business)
- [ ] Crear páginas en LinkedIn y Twitter/X para VecinoAI
- [ ] Botones de compartir en artículos del blog
- [ ] Configurar Google Search Console y enviar sitemap
- [ ] Schema FAQPage en how-it-works
- [ ] Cuando tengas FB Pixel → actualizar ID en shared.js (actualmente: 1646636346569890)
