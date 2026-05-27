# Parallelo Landing Page — Detailed Implementation Plan

> **Document scope:** Full production build from the approved HTML proposal. Covers architecture, asset production, component specs, copy finalization, form backend, and launch checklist.

---

## 1. Project Summary

| Item | Detail |
|---|---|
| Client | Parallelo Consultoría |
| Services | Cumplimiento Laboral STPS · Auditorías VDA · Reclutamiento |
| Primary market | Industrial / Automotriz — Puebla + cobertura nacional MX |
| Design source | Proposal `parallelo_landing_page_proposal.html` (approved) |
| Primary accent | `#3CAB3F` Parallelo Green |
| Base | `#1a1a1a` near-black |
| Typography | Barlow Condensed (display) + Barlow (body) via Google Fonts |
| Annotation labels (BLOQUE 1–13) | Design-only — strip before production |

---

## 2. Recommended Tech Stack

### Option A — Static Site (Recommended for simplicity)
- **HTML5 + CSS Custom Properties** — mirrors the proposal structure directly
- **Vanilla JS** — tab switcher already written; minimal scripting needed
- **Netlify / Vercel** — free tier, instant deploys, built-in form handling
- **Netlify Forms or Formspree** — zero-backend contact form

### Option B — Framework (If CMS or future blog is planned)
- **Astro** — zero-JS by default, component-based, easy Netlify CMS integration
- **TailwindCSS** — replaces custom CSS; map proposal CSS vars to Tailwind config
- **Decap CMS (formerly Netlify CMS)** — lets non-developers update copy

> Unless Parallelo requires a blog or multi-page CMS in the near future, **Option A is recommended** — fastest time to launch, lowest complexity.

---

## 3. File & Folder Structure

```
parallelo/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css            ← extracted from proposal <style> block
│   ├── js/
│   │   └── main.js               ← tab switcher + form validation
│   ├── img/
│   │   ├── hero-bg.jpg           ← industrial facility (dark-tinted)
│   │   ├── about-exec.jpg        ← labor review photo
│   │   ├── vda-meeting.jpg       ← automotive management meeting
│   │   ├── recruitment.jpg       ← structured interview
│   │   ├── coverage-map.svg      ← Mexico corridor map (custom)
│   │   └── og-image.jpg          ← 1200×630 Open Graph card
│   ├── svg/
│   │   ├── logo.svg              ← extracted from inline SVG
│   │   ├── fine-escalation.svg   ← $5,657 → $565,700 → $5.4M bar chart
│   │   ├── vda-pathway.svg       ← 5-step certification flow diagram
│   │   └── rotation-stat.svg     ← 50% infographic
│   └── fonts/                    ← optional local hosting of Barlow
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 4. Design Token Migration

Extract all CSS custom properties from the proposal `<style>` block into `styles.css` at the `:root` level. No values change — this is a structural move only.

```css
/* styles.css — token block (no changes to values) */
:root {
  --p-green:        #3CAB3F;
  --p-green-dark:   #2a8a2d;
  --p-black:        #1a1a1a;
  --p-charcoal:     #2c2c2c;
  --p-slate:        #4a4a4a;
  --p-muted:        #6b6b6b;
  --p-light:        #f4f4f2;
  --p-lighter:      #f9f9f7;
  --p-white:        #ffffff;
  --p-border:       rgba(0,0,0,0.08);
  --p-green-light:  rgba(60,171,63,0.08);
  --p-green-mid:    rgba(60,171,63,0.15);
  --font-display:   'Barlow Condensed', sans-serif;
  --font-body:      'Barlow', sans-serif;
}
```

---

## 5. Block-by-Block Production Checklist

### BLOQUE 0 — `<head>` / Meta

- [ ] `<title>` → `Parallelo | Cumplimiento Laboral, Auditorías VDA y Reclutamiento`
- [ ] `<meta name="description">` → 155-char summary of services + Puebla/nacional
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image` (1200×630 asset), `og:url`
- [ ] Twitter Card meta
- [ ] Canonical URL
- [ ] Google Fonts preconnect + stylesheet link
- [ ] Tabler Icons CDN link (`https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css`)
- [ ] Structured data: `LocalBusiness` JSON-LD (name, address Puebla, phone numbers, services)
- [ ] Favicon set (16px, 32px, 180px apple-touch)
- [ ] Google Analytics / Clarity snippet (if applicable)

---

### BLOQUE 1 — Hero

**Copy status:** Approved as-is in proposal.

**Production tasks:**
- [ ] Replace CSS grid background with actual photographic hero: `hero-bg.jpg` as `background-image` on `.lp-hero`, dark overlay `rgba(0,0,0,0.65)`
- [ ] Keep green grid texture as a layered pseudo-element at `opacity: 0.04` over the photo
- [ ] CTA buttons: wire `href` values
  - Primary → `#contacto` (anchored scroll to form)
  - Secondary → `#servicios`
- [ ] Add `loading="eager"` and `fetchpriority="high"` to the hero background (LCP element)
- [ ] Animate hero stats on viewport entry (CSS `@keyframes` counter-up or IntersectionObserver)

**Photo spec — Hero background:**
- Subject: modern automotive/industrial production floor, wide shot
- Framing: horizontal, interior, well-lit machinery
- Treatment: export dark-tinted at 65% overlay, 1600px wide, compressed to < 200KB WebP
- Alt text: `Interior de planta automotriz — producción industrial en México`

---

### BLOQUE 1.5 — Navigation (Sticky)

**Production tasks:**
- [ ] Replace inline SVG logo with `<img src="assets/svg/logo.svg">` for cacheability
- [ ] Add `id` anchors to each section: `#servicios`, `#cobertura`, `#nosotros`, `#contacto`
- [ ] Wire nav links to anchors with smooth scroll (`scroll-behavior: smooth` on `html`)
- [ ] Add mobile hamburger menu (below 640px the nav links stack → off-canvas drawer or dropdown)
- [ ] Sticky behavior: add `box-shadow: 0 1px 8px rgba(0,0,0,0.08)` on scroll via JS classList toggle

---

### BLOQUE 1.6 — Trust Bar

**Production tasks:**
- [ ] Confirm exact credential names with client: `STPS`, `VDA 6.1 / 6.3 / 6.5`, `Reclutamiento Masivo`, `República Mexicana`
- [ ] No changes needed to markup; icons map correctly to Tabler set
- [ ] On mobile (< 480px): allow horizontal scroll with `overflow-x: auto`, no wrapping

---

### BLOQUE 2 — About / Sobre Parallelo

**Copy status:** Approved.

**Production tasks:**
- [ ] Replace `.about-visual` dark card (metrics) with photo: `about-exec.jpg` (executive reviewing binders), positioned `object-fit: cover`, with metric overlays as absolute-positioned elements on top
- [ ] Confirm four key metrics with client before launch: `30+`, `3`, `Nacional`, `Puebla`
- [ ] `about-quote` copy: confirm with Dinorah or Ezequiel as a real attributed quote or keep as generic brand statement
- [ ] Add `id="nosotros"` to this section

---

### BLOQUE 3 — Impact / El Costo del Incumplimiento

**Copy status:** Requires one data verification (see below).

**Production tasks:**
- [ ] **Verify stat:** `+43,000 inspecciones ene–nov 2025` — pull current figure from [STPS Transparencia](https://www.gob.mx/stps) before launch; update source citation in fine print
- [ ] **Fine escalation SVG** (`fine-escalation.svg`): visual bar/steps showing:
  - Step 1: `$5,657 MXN` — multa mínima
  - Step 2: `$565,700 MXN` — multa media (100× employees example)
  - Step 3: `$5,400,000 MXN` — multa máxima grave
  - Style: vertical bar chart, Parallelo green fill, white labels on dark background, Barlow Condensed type
- [ ] Keep `impact-card-wide` multiplier card — very strong conversion anchor
- [ ] Section anchor: `id="impacto"`

---

### BLOQUES 4–7 — Services / Servicios

**Copy status:** Approved.

**Production tasks:**
- [ ] Add `id="servicios"` to section
- [ ] Tab switcher JS already functional in proposal — move to `main.js`, no changes needed
- [ ] For each service panel, wire CTA buttons to `#contacto` with a pre-selected service param:
  ```html
  <a href="#contacto?servicio=stps" class="btn-primary">Solicitar diagnóstico STPS</a>
  ```
  Use JS on page load to read the URL param and pre-select the `<select>` in the form
- [ ] **VDA panel photo:** Add `vda-meeting.jpg` as a decorative aside within the VDA panel (suits-and-documents framing, 16:9, serves credibility)
- [ ] **Recruitment panel:** Consider adding the `50% de contrataciones no supera los primeros 4 meses` stat as a highlighted callout within the panel for additional urgency

**VDA Certification Pathway Diagram (`vda-pathway.svg`):**
- Linear horizontal flow (desktop) / vertical (mobile)
- 5 nodes: `Diagnóstico` → `Entrenamiento` → `Auditoría` → `Certificación` → `Mantenimiento`
- Style: filled circles with Parallelo green, connecting lines, Barlow Condensed labels
- Embed inside the VDA `svc-panel` below the checklist

---

### BLOQUE (Between services and coverage) — Mid-page CTA Banner

**Production tasks:**
- [ ] Button copy: `"Quiero evaluar mi nivel de cumplimiento"` → link to `#contacto`
- [ ] Consider A/B testing: variant B uses `"Agendar diagnóstico gratuito"` (if Parallelo offers a free intro session)

---

### BLOQUE 8 — Coverage / Cobertura + Sectors

**Production tasks:**
- [ ] Add `id="cobertura"` to section
- [ ] **Mexico Coverage Map SVG** (`coverage-map.svg`):
  - Simplified Mexico outline with highlighted dots/regions for key industrial corridors:
    - Puebla · CDMX · Monterrey · Guadalajara · Querétaro · Silao · Toluca · Tijuana
  - Color: Parallelo green dots, dark fill for map, light stroke for state borders
  - Label "Sede principal" with a star icon on Puebla
  - Place below the sector cards, replacing or augmenting the current `<div>` location summary
- [ ] Confirm sector list with client — currently: Industrial, Comercial, Servicios. Add more if needed.

---

### BLOQUE 9 — Differentiators + Team

**Production tasks:**
- [ ] Add `id="equipo"` or keep under the `#nosotros` anchor
- [ ] Team photos: if headshots are available, replace `.team-initial` initials badges with circular `<img>` — `object-fit: cover`, 40×40px with `border-radius: 6px`
- [ ] If no photos available: keep initials design as-is (it works well)
- [ ] Confirm team tags with Dinorah and Ezequiel for accuracy
- [ ] Consider adding a third team member card if applicable (the `team-grid` is 2-col; a third card would span full width cleanly)

---

### BLOQUE 10 — Marca Empleadora

**Production tasks:**
- [ ] Confirm the closing quote with client attribution or remove attribution for brand copy
- [ ] Optional: add a small visual here — the `rotation-stat.svg` infographic (`50% de contrataciones no supera 4 meses`) would fit as a visual aside, reinforcing both recruitment and employer brand sections
- [ ] This section currently lives inside the same dark container as BLOQUE 9 — ensure the `border-top` divider renders correctly and there is sufficient visual breathing room

---

### BLOQUE 11 — Final CTA (Green section)

**Production tasks:**
- [ ] Button → `#contacto` anchor link
- [ ] Confirm button copy: `"Solicitar contacto"` → consider `"Hablar con un consultor"` for warmth
- [ ] Add subtle animated background (optional): very light diagonal lines using the same CSS grid trick from the hero, at ~3% opacity on the green background

---

### BLOQUE 12 — Contact Form

**Copy status:** Approved.

**Production tasks:**
- [ ] Add `id="contacto"` to section
- [ ] **Form backend options:**
  - **Netlify Forms** (if hosted on Netlify): add `netlify` attribute to `<form>`, add `data-netlify="true"`. Zero configuration, emails sent to account.
  - **Formspree** (platform-agnostic): add `action="https://formspree.io/f/{formID}"` and `method="POST"`. Free tier handles up to 50 submissions/month.
  - **Custom backend** (if higher volume or CRM integration): use PHP `mail()` or a Node.js/Express endpoint; recommended only if Parallelo needs Salesforce, HubSpot, or similar CRM sync
- [ ] Fields required in `<form>`:
  - `name="nombre"` — Nombre completo *
  - `name="empresa"` — Empresa *
  - `name="cargo"` — Cargo
  - `name="telefono"` — Teléfono *
  - `name="email"` — Correo electrónico *
  - `name="empleados"` — No. empleados (select)
  - `name="servicio"` — Servicio de interés (pre-selectable via URL param)
  - `name="mensaje"` — Mensaje / situación
- [ ] Add client-side validation in `main.js`: required fields highlight in red if empty on submit
- [ ] Add success state: hide form, show a green confirmation message: `"¡Gracias! Un consultor se pondrá en contacto contigo pronto."`
- [ ] Add honeypot field for spam protection: `<input type="text" name="_gotcha" style="display:none">`
- [ ] Privacy notice below submit: link to `aviso-privacidad.html` (a separate simple page)

**NOM Compliance Checklist Visual (Optional Enhancement):**
- A styled document-preview graphic (`nom-checklist.svg`) could be placed as an aside in the contact section or downloadable lead magnet
- Format: clipboard icon, checkboxes partially filled, Parallelo branding, "NOM Compliance Preview"
- If used as a lead magnet: replace form submit text with `"Solicitar diagnóstico + recibir checklist NOM"`

---

### BLOQUE 13 — Footer

**Production tasks:**
- [ ] Replace `contacto@parallelo.com` with actual email (confirm with client)
- [ ] Confirm phone numbers: `222 534 05 48` (Dinorah) · `222 258 07 86` (Ezequiel)
- [ ] Wire social links:
  - Facebook: confirm page URL
  - LinkedIn: confirm company page URL
  - Instagram: confirm handle
- [ ] Add `aviso-privacidad.html` link in footer legal line
- [ ] Footer copyright year: use JS to auto-update `new Date().getFullYear()`

---

## 6. Graphic Assets — Production Specs

### 6.1 Photography Needed (5 images)

| Asset | Subject | Usage | Output |
|---|---|---|---|
| `hero-bg.jpg` | Modern automotive production floor, wide interior shot | Hero background | 1600px wide, WebP, < 200KB |
| `about-exec.jpg` | Executive reviewing labor binders at a desk, warm light | About section visual | 800×600, WebP, < 120KB |
| `vda-meeting.jpg` | Suited professionals at a table with documents | VDA service panel | 800×500, WebP, < 100KB |
| `recruitment.jpg` | Structured professional interview | Recruitment service panel | 800×500, WebP, < 100KB |
| `coverage-aerial.jpg` | Puebla / Bajío industrial park aerial or corridor | Coverage section | 1200×600, WebP, < 150KB |

**Photo sourcing options:**
- Licensed stock: [Unsplash](https://unsplash.com) (free), [Envato Elements](https://elements.envato.com), [Shutterstock](https://shutterstock.com)
- Client's own photography (preferred for authenticity — ask Parallelo)
- Search terms: `"planta automotriz interior Mexico"`, `"automotive factory floor Mexico"`, `"HR compliance document review"`, `"professional job interview structured"`, `"Puebla Mexico industrial park aerial"`

---

### 6.2 Custom SVG Graphics (4 required)

#### `logo.svg`
- Extract existing inline SVG from `<nav>` in the proposal
- Produce in two color variants: dark (for light backgrounds) and light/white (for dark sections and footer)
- Also export as favicon source (512×512 for PWA manifest if needed)

#### `fine-escalation.svg` — Fine Escalation Chart
- **Type:** Horizontal stepped bar / staircase chart
- **Data points:**
  - Mínima: `$5,657 MXN`
  - Media (100 trabajadores): `$565,700 MXN`
  - Máxima: `$5,400,000 MXN`
- **Colors:** Parallelo green fill, near-black background, white labels
- **Type:** Barlow Condensed for numbers, Barlow for labels
- **Dimensions:** 560×200px SVG viewbox
- **Placement:** BLOQUE 3 Impact section, replacing or supplementing the current card grid

#### `vda-pathway.svg` — VDA Certification Pathway
- **Type:** Linear flowchart / process diagram
- **Nodes (5):** `Diagnóstico` → `Entrenamiento` → `Auditoría` → `Certificación` → `Mantenimiento`
- **Style:** Filled rounded rectangles, green fill for active/completed, dark background
- **Arrows:** Thin white arrows between nodes
- **Dimensions:** 600×120px viewbox (horizontal) / 120×400px (mobile vertical, via CSS)
- **Placement:** Below VDA service checklist in the service tabs panel

#### `coverage-map.svg` — Mexico Coverage Map
- **Type:** Simplified Mexico choropleth / dot map
- **Content:** Mexico silhouette, key industrial corridor dots
- **Cities highlighted:** Puebla (star), CDMX, Monterrey, Guadalajara, Querétaro, Silao, Toluca, Tijuana, Chihuahua, Saltillo
- **Style:** Dark background (`#1a1a1a`), white/light gray state borders at low opacity, green dots for cities, subtle green glow on Puebla star
- **Dimensions:** 560×360px viewbox
- **Placement:** BLOQUE 8 Coverage section, below sector cards

---

### 6.3 Optional Infographic

#### `rotation-stat.svg` — Recruitment Rotation Statistic
- **Visual metaphor:** 10 human icons in a row; 5 greyed out (didn't last 4 months), 5 green (retained)
- **Headline:** `"El 50% de nuevas contrataciones no supera los primeros 4 meses"`
- **Sub:** `"Nosotros cambiamos esa estadística."`
- **Dimensions:** 480×160px
- **Placement:** Inside recruitment service panel or Marca Empleadora section

---

## 7. JavaScript — `main.js`

```javascript
// 1. Service tab switcher (already in proposal, move here)
function showTab(id, btn) {
  document.querySelectorAll('.svc-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.svc-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('svc-' + id).classList.add('active');
}

// 2. Pre-select form service from URL param
// Usage: index.html#contacto?servicio=vda
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const servicio = params.get('servicio');
  if (servicio) {
    const select = document.querySelector('[name="servicio"]');
    if (select) {
      const map = { stps: 'Cumplimiento Laboral STPS', vda: 'Auditorías VDA', rec: 'Reclutamiento' };
      select.value = map[servicio] || select.value;
    }
  }
});

// 3. Sticky nav shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.lp-nav');
  nav.classList.toggle('scrolled', window.scrollY > 10);
});
// Add to CSS: .lp-nav.scrolled { box-shadow: 0 1px 8px rgba(0,0,0,0.10); }

// 4. Stat counter animation (hero + about)
// Trigger when section enters viewport
const counters = document.querySelectorAll('[data-count]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => io.observe(c));

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

// 5. Form validation + submission
const form = document.getElementById('contacto-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.classList.toggle('error', !field.value.trim());
      if (!field.value.trim()) valid = false;
    });
    if (!valid) return;
    // Submit via fetch (Formspree / Netlify)
    const data = new FormData(form);
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (res.ok) {
      form.innerHTML = '<p class="form-success">¡Gracias! Un consultor se pondrá en contacto contigo pronto.</p>';
    }
  });
}
```

---

## 8. Responsive / Mobile Breakpoints

The proposal is designed at 680px max-width (desktop preview). The following breakpoints handle the mobile experience:

| Breakpoint | Key Adjustments |
|---|---|
| `< 640px` | Nav collapses to hamburger + drawer. Hero H1 font-size: 26px. Hero stats: 1-column. |
| `< 480px` | Trust bar: horizontal scroll overflow. About layout: 1-column (visual below text). Impact cards: 1-column. |
| `< 400px` | Service checks: 1-column. Sector grid: 1-column. Diff grid: 1-column. Team grid: 1-column. Form grid: 1-column. |

Add this `<meta>` tag in `<head>`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 9. Performance Checklist

- [ ] All photos in **WebP** format with JPEG fallback via `<picture>` element
- [ ] Hero background image: `fetchpriority="high"` + preloaded in `<head>`
- [ ] Google Fonts: use `display=swap` (already in proposal) + `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`
- [ ] Tabler Icons: load from CDN with `crossorigin="anonymous"`
- [ ] No render-blocking scripts — place `<script src="main.js" defer>` before `</body>`
- [ ] Target Lighthouse score: Performance > 90, Accessibility > 95, SEO > 95
- [ ] Compress all SVGs with SVGO before embedding
- [ ] Use `loading="lazy"` on all images below the fold

---

## 10. SEO & Structured Data

### Page-level SEO
- Title: `Parallelo | Cumplimiento Laboral STPS, Auditorías VDA y Reclutamiento — Puebla, México`
- Meta description: `Consultoría especializada en diagnóstico de cumplimiento laboral STPS, preparación para auditorías VDA 6.1/6.3/6.5 y reclutamiento masivo. Sede en Puebla, cobertura nacional.`
- Heading hierarchy: `H1` (hero) → `H2` (each major section) → `H3` (service names, team names) — maintain this exactly as in proposal

### JSON-LD Structured Data
Add in `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Parallelo Consultoría",
  "description": "Consultoría en cumplimiento laboral STPS, auditorías VDA y reclutamiento estratégico.",
  "url": "https://www.parallelo.com.mx",
  "telephone": ["+522225340548", "+522222580786"],
  "email": "contacto@parallelo.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Puebla",
    "addressRegion": "Puebla",
    "addressCountry": "MX"
  },
  "areaServed": "MX",
  "serviceType": ["Cumplimiento Laboral STPS", "Auditorías VDA", "Reclutamiento"]
}
```

---

## 11. Accessibility

- [ ] All icons (Tabler) include `aria-hidden="true"` (already in proposal)
- [ ] `<h1>` visible only to screen readers exists in proposal (`.sr-only`) — keep it
- [ ] Form `<label>` elements explicitly associated to inputs via `for` + matching `id`
- [ ] Focus styles: add `:focus-visible` outline in green for keyboard navigation
- [ ] Color contrast: `#3CAB3F` on `#1a1a1a` passes WCAG AA for large text; verify body text `#6b6b6b` on white (borderline — consider darkening muted text to `#555`)
- [ ] Service tab buttons: add `role="tab"` and `aria-selected` for screen reader tab announcement
- [ ] Images: all `<img>` tags require descriptive `alt` attributes in Spanish

---

## 12. Privacy & Legal

- [ ] Create `aviso-privacidad.html` — required by LFPDPPP (Mexican data protection law) since the contact form collects personal data
- [ ] Add checkbox above submit: `"He leído y acepto el Aviso de Privacidad"` — linked, required field
- [ ] Footer legal line: `© 2025 Parallelo Consultoría · Todos los derechos reservados ·` [Aviso de privacidad]
- [ ] If using Google Analytics: add cookie consent banner (GDPR is not strictly required in MX, but best practice for international visitors)

---

## 13. Launch Checklist

### Pre-launch
- [ ] Final copy review with Dinorah and Ezequiel (phone numbers, email, service descriptions)
- [ ] All `href="#"` placeholders replaced with real anchors or external URLs
- [ ] All annotation labels (BLOQUE 1–13) removed from HTML
- [ ] All photo assets placed and optimized
- [ ] All SVG graphics produced and embedded
- [ ] Contact form tested end-to-end (submission → email delivery)
- [ ] Aviso de privacidad page live
- [ ] Cross-browser test: Chrome, Firefox, Safari, Edge
- [ ] Mobile test: iOS Safari (iPhone 13+), Android Chrome
- [ ] Lighthouse audit: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95

### Launch
- [ ] DNS configured to hosting provider
- [ ] SSL certificate active (HTTPS) — Netlify/Vercel provide automatically
- [ ] Redirect `www` to non-www (or vice versa)
- [ ] Google Search Console: submit sitemap.xml
- [ ] Google Analytics / Clarity: verify events firing (form submit, tab click, CTA click)

### Post-launch
- [ ] Monitor form submissions weekly
- [ ] Set up a `contacto@parallelo.com` auto-reply (confirms receipt within 24h)
- [ ] Track scroll depth and tab usage in Analytics to optimize service content priority
- [ ] 30-day review: A/B test CTA copy if conversion rate below target

---

## 14. Estimated Effort (Reference)

| Phase | Tasks | Estimated Time |
|---|---|---|
| Setup & structure | File org, CSS extraction, meta tags | 2–3 hrs |
| Photo production | Sourcing, cropping, optimization | 3–5 hrs |
| SVG / infographic creation | 4 custom graphics | 6–10 hrs |
| HTML finalization | Anchors, cleanup, annotations removal | 2–3 hrs |
| JavaScript | Tab switcher cleanup, form, counters, scroll | 3–4 hrs |
| Responsive CSS | Mobile breakpoints | 3–5 hrs |
| Form backend | Formspree/Netlify setup + validation | 2–3 hrs |
| Aviso de privacidad | Legal page | 1–2 hrs |
| QA & accessibility | Cross-browser, Lighthouse, a11y audit | 3–4 hrs |
| Launch | DNS, SSL, Search Console | 1–2 hrs |
| **Total** | | **26–41 hrs** |

---

*Plan prepared from proposal `parallelo_landing_page_proposal.html` and accompanying art direction notes. All section numbers (BLOQUE 1–13) reference the annotation labels in the proposal document.*
