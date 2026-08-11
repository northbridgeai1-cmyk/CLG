# Calderaro Law Group — new website (v1)

Plain HTML/CSS/JS. No build step, no framework — any host can serve it as-is,
and any developer can pick it up without special tooling.

## What's in here

```
index.html                     Homepage
estrategias-empresarios.html   Door 1 — Business Owners & Investors (E-2, L-1, EB-5)
estrategias-profesionales.html Door 2 — Professionals & Talent (O-1, EB-1, EB-2 NIW)
estrategias-familias.html      Door 3 — Families & Planning
evaluacion.html                The eligibility/strategy scorecard quiz
estrategia-honorarios.html     Fees page
casos-de-exito.html            Full testimonials + video page
nosotros.html                  About / team / Renata
socios.html                    Referral partners page (CPAs, wealth managers)
preguntas-frecuentes.html      Full FAQ (also feeds AI search engines — see below)
contacto.html                  Contact form + WhatsApp + map
assets/css/styles.css          Shared design system
assets/js/main.js              Nav, WhatsApp links, AI assistant widget, form autosave
assets/js/quiz.js              Assessment/scorecard logic
robots.txt, sitemap.xml        SEO
```

## Getting this onto GitHub

```bash
cd <this folder>
git init
git add .
git commit -m "CLG website v1"
git branch -M main
git remote add origin <your empty GitHub repo URL>
git push -u origin main
```

To preview it live immediately (no server needed): enable **GitHub Pages** in
the repo's Settings → Pages → set source to the `main` branch, root folder.
You'll get a live URL in about a minute.

## Real content already in the site (pulled from your current site + YouTube)

- Brand: Calderaro Law Group, logo, real team photos (Renata Calderaro–CEO,
  Gianfranco Frazzetta, Luisa Anzola, Lucila Sabato)
- 6 real client testimonials with country + visa type, used across the site
- 2 real embedded YouTube videos from your channel
- Real WhatsApp number, Doral FL address + map embed
- Your own existing tagline — "no vendemos visas, disenamos tu estrategia" —
  is now the primary headline/CTA site-wide instead of buried on the Services
  page, per the "make the CTA more marcado" request

## Things that need your confirmation before this goes live

1. **Fee figures** on `estrategia-honorarios.html` ($2,500 Evaluacion, $15,800
   E-2, $18,500 EB-2 NIW) — these come from the strategy blueprint you shared.
   I flagged them on-page with a dashed note. Confirm they're current before
   removing the flag.
2. **No approval-rate stat is published.** The blueprint you shared explicitly
   says the "95%" figure needs a Cerenade data pull with a defined
   denominator/date range before it's defensible for attorney advertising. I
   did not invent a number — add it once that data is pulled, with the
   footnote structure your blueprint already specifies.
3. **Domain**: canonical URLs and schema.org data are set to
   `https://www.visamiami.com` — update sitewide (a find/replace across all
   HTML files) if the new site launches on a different domain.
4. **`og-cover.jpg`**: the homepage references `assets/img/og-cover.jpg` for
   social sharing — add a real 1200x630 image there before launch.

## What's intentionally NOT built yet (needs a backend)

This is a static site, so three things from the brief need a small backend to
be fully real — I didn't fake them:

- **AI chat that uses a real LLM.** The assistant widget on every page is
  real and answers from your actual FAQ content, but it's rule-based —
  running a live Claude/GPT model from the browser would expose your API key
  to anyone who opens dev tools. Wiring up real LLM answers needs a small
  server endpoint (a few hours of work) to hold the key.
- **The 2-hour "you didn't finish the form" email.** The contact form
  auto-saves progress and greets returning visitors ("continue where you left
  off"), but sending an actual email 2 hours later needs a backend job.
  Fastest path: since you're already on Systeme.io, its automation can
  already do this today — keep that piece there, or point it at whatever CRM
  you land on.
- **Booking/payment for the paid Strategy Session** — currently routes to
  WhatsApp/contact form. A real calendar + payment flow (Calendly + Stripe,
  or similar) is a follow-up integration once you're ready to charge for it.

## SEO / "AI can find us"

Every page has real meta descriptions, Open Graph tags, and JSON-LD
structured data (Organization, LegalService, FAQPage). The FAQ content is
written in direct-answer format so AI search engines (ChatGPT, Perplexity,
Gemini) can quote it directly — e.g. "necesito visa para EE.UU." or "mis
hijos quieren estudiar en EE.UU." both have direct, extractable answers on
this site now.
