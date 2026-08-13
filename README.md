# Calderaro Law Group — website (v2, revision round 1)

Plain HTML/CSS/JS. No build step — works on GitHub Pages, any host, or pasted
into systeme.io code blocks.

## Naming system (settled this round)

- **Brújula CLG** = the FREE 5-question quiz. Lives at `evaluacion.html`
  (URL kept alive for SEO) and embedded on the Fase 1 page. Compass mark:
  `assets/img/brujula-clg-mark.svg`.
- **Evaluación CLG** = the PAID Fase 1 product ($2,500, credited). Lives at
  `fase1-evaluacion-clg.html`.
- Funnel: Brújula (free, tags segment) → Evaluación CLG (paid) → engagement.

## Pages

```
index.html                     Homepage. Optionality copy, video hero, 2 doors, Método CLG™
metas-clg.html                 NEW. Metas CLG: search by goal, not by visa type.
                               Answers "what can I do with a visa that I can't without one"
continuidad-clg.html           NEW. Continuidad CLG, the 5th phase. $950/yr membership
evaluacion.html                Brújula CLG (unified 5-question quiz, standalone)
fase1-evaluacion-clg.html      Fase 1 sales landing (Stripe-ready, WhatsApp fallback)
estrategias-empresarios.html   Door 1, incl. corporations bringing talent (L-1)
estrategias-profesionales.html Door 2, professionals, ARTISTS & ATHLETES
estrategias-familias.html      Secondary track (linked, not a homepage door)
estrategia-honorarios.html     Fees. CTAs point to Fase 1
casos-de-exito.html            Testimonials + problema/reto/estrategia/resultado story
global-mobility.html           New practice page (English, Renata-led)
nosotros.html / socios.html / preguntas-frecuentes.html / contacto.html
clg-video-brief.md             NEW. What to film and why. Give this to whoever shoots
whatsapp-ai-knowledge.md       Knowledge base for Meta's WhatsApp AI agent
scripts/fix-accents.py         ⚠ RUN THIS ONCE. See below
```

## The two new pages, and why they matter

**Metas CLG** is the answer to "what can I do with a visa that I can't do
without one." Every other immigration site organizes by visa category, which
assumes the visitor already knows what they need. Almost nobody does. This page
starts from what they want to be true in their life and treats the visa as the
mechanism. It's also strong for AI search: someone asking ChatGPT "how can my
son study in the US" now has a direct, quotable answer with CLG's name on it.

**Continuidad CLG** turns the one-time case into a relationship. Framed as the
fifth turn of the same wheel rather than a new product, which is the honest
framing and the one that converts. The Método diagram on the homepage now reads
Diagnóstico, Diseño, Documentación, **Presentación**, with Continuidad as the
loop that follows.

## ⚠ One command before publishing

```bash
python3 scripts/fix-accents.py
```

The first build shipped Spanish copy without accents and ñ on several pages.
The client caught it, and they were right. Pages written or rewritten by hand
(index, metas, continuidad, evaluacion, fase1, global-mobility) are already
correct and the script skips them. It fixes the rest (nosotros, socios,
contacto, familias, honorarios, casos, FAQ, empresarios, profesionales), applies
the mechanical renames (nav CTA to "Brújula CLG", the two door labels, Blog
link), and runs the de-dash pass described below. It's idempotent.

The script prints any long dash it could not safely rewrite, with surrounding
text, so you can fix those sentences by hand. It won't guess at a rewrite it
isn't sure about. After running, read each page once. Automated accent
restoration is about 99%, and Spanish has context-dependent cases.

## Sounding human, not AI

Per the client's note, I looked up what actually marks text as AI-written in
2026. The em dash is the famous one, but current research says the stronger
tells are: thin punctuation with long run-on sentences leaning on "and" (in
Spanish, "y"), the "no es X, es Y" construction on repeat, hedging every claim,
and reaching for a fancy word where a plain one works.

What I did about it in the copy:

- Cut the dash-as-dramatic-pause habit. Where a dash was doing a pause's job,
  it became a period and a new sentence. Real commas and periods, more of them,
  shorter sentences.
- Kept "no es X, es Y" to the places where the client's own positioning
  depends on it ("no vendemos visas, diseñamos estrategias") and removed it
  everywhere it was just a rhythm crutch.
- Plain words. "Nada de buzones genéricos" instead of "evitamos la
  despersonalización del servicio."
- Left some asymmetry in. Human writing has sentences of uneven length and
  the occasional fragment. Perfectly balanced paragraphs read like a machine.

One caveat worth saying out loud: no rewrite makes text undetectable, and
chasing that is the wrong goal. The goal is copy that sounds like a person at
this firm wrote it. The single biggest lever there isn't the prose at all, it's
the video, where a real client's voice does what no copy can fake.

Source: [Fast Company on the viral AI-writing report](https://www.fastcompany.com/91584243/how-to-identify-ai-generated-writing-viral-report-has-surprising-new-clues-economist) ·
[Dataconomy, how to spot AI writing 2026](https://dataconomy.com/2026/08/04/how-to-spot-ai-writing/)

## Video over photos

The homepage hero is now a video slot instead of the office photo, and
`metas-clg.html` has a video slot per goal. `clg-video-brief.md` is the shoot
list: what to film, who to film, the exact sentences worth pulling out of each
person, and the rule that governs all of it, which is that a video summarized
as "we explain the E-2 visa" was shot wrong. Mexico is the most urgent gap.
It's a primary market with zero client testimonials anywhere on the site.

## Features this round

- **Scroll animations**: injected globally by `main.js` (reveal-on-scroll,
  respects prefers-reduced-motion). No per-page work needed.
- **Language switcher** (homepage header): ES/EN/PT/FR/DE/IT/KO. Covers nav +
  hero + main CTAs. HONEST LIMIT: full legal-content translation in 7
  languages needs professional translators — machine-translating visa law is
  a liability. The switcher ships with correct short translations for the
  chrome; commission full page translations per market before advertising
  there.
- **Country → real client video** (Brújula result): Colombia currently maps
  to the YouTube embed from the old services page (assumed = Gustavo).
  **Confirm the video↔client mapping** in `assets/js/quiz.js` (`COUNTRY_PROOF`)
  and add IDs as more testimonial videos are published.
- **Método CLG™ diagram**: inline SVG on the homepage matching the approved
  circular design (Diagnóstico → Diseño → Documentación → Defensa around "Tu
  Estrategia", with Continuidad CLG loop). ™ applied — note: actually
  registering the trademark is a legal filing CLG must do; the site just
  displays the claim.
- **Social media logos**: real SVG icons in footers of rewritten pages.
- **Story-format case study** on casos-de-exito.html (problema → reto →
  estrategia → resultado) with a flagged placeholder for the real numbers —
  needs client consent + real figures before launch.
- **Email capture on Brújula result**: optional, tags quiz-inversion /
  quiz-talento / quiz-familia. Currently hands off via WhatsApp (static site);
  swap for a systeme.io form to get real CRM tagging — the integration point
  is marked TODO in `quiz.js`.

## Still open (flagged in-page, do not launch without resolving)

1. **Stripe Payment Link** — paste into `CONFIG.stripePaymentLink` in
   fase1-evaluacion-clg.html. Until then the button shows an honest notice +
   WhatsApp fallback.
2. **Refund policy + delivery timeline** — `[Confirmar...]` notes in the
   Fase 1 FAQ.
3. **Renata's founder anecdote** — placeholder block on Fase 1 page (framed
   around clients who wanted options and got partial answers — not crisis).
4. **Capacity number** `[12]` on Fase 1 — confirm the real monthly figure.
5. **Fee figures** ($2,500 / $15,800 / $18,500) — flagged on-page.
6. **Story case study numbers** — casos-de-exito.html placeholder.
7. **Guía CLG 2026** — content is with Gianfranco for review; per your own
   workflow, styling/design happens after his OK. The Brújula email capture
   already promises it, so prioritize. When approved, I can produce the
   styled PDF in one pass.
8. **Renata's photo**, global-mobility.html has a placeholder circle.
9. **og-cover.jpg**, still needed at assets/img/ for social shares.
10. **Continuidad CLG pricing and inclusions** ($950/yr, $95/mo, two free
    external sessions, monthly community call). Confirm these are final and
    that the firm can actually staff the monthly call before it goes live. A
    promised community call that doesn't happen costs more trust than it buys.
11. **Videos.** Everything in `clg-video-brief.md`. The site is built for them
    and currently runs on two old YouTube embeds as placeholders.

## Publishing to systeme.io (what "Sisteme" is)

The current visamiami.com runs on systeme.io. Two ways to ship this:

**Option A — recommended: host the site on GitHub Pages, keep systeme.io for
funnels/email.** Push this folder to GitHub → Settings → Pages → deploy from
main. Point the domain (or a subdomain like `new.visamiami.com`) at GitHub
Pages. Keep systeme.io for what it's actually good at: the email list, the
2-hour form-abandonment automation, and the Brújula email capture (embed a
systeme.io form where marked in quiz.js). This keeps the code fully yours.

**Option B — everything inside systeme.io.** For each page: create a new
systeme.io page → delete default blocks → add ONE "Custom HTML/Code" block
set to full width → paste the page's HTML. Two adjustments per page: (1) since
systeme.io serves one page per URL, paste the contents of
`assets/css/styles.css` inside a `<style>` tag and the JS inside `<script>`
tags in the same block (or host css/js on GitHub and link them absolutely);
(2) set each page's slug to match the filenames so internal links keep working
(`/evaluacion`, `/fase1-evaluacion-clg`, etc. — then update the `.html` links
accordingly). The fase1 and global-mobility pages are already fully
self-contained (styles + JS inline) and paste in with zero changes.

**Either way, in systeme.io set up:** the contact-form automation ("if form
started but not submitted → wait 2h → send reminder email" — this replaces
the client's abandonment-email request properly), and a form + tag per
Brújula segment (quiz-inversion / quiz-talento / quiz-familia).

## WhatsApp Business AI agent

`whatsapp-ai-knowledge.md` is the complete knowledge base ready to load when
Meta enables the AI agent on CLG's account — business description, catalog
with prices, official FAQ answers, tone rules, and (important for a law firm)
the hard escalation rules: the AI never gives case-specific legal advice and
hands off to a human before confidential details are shared. Until Meta
enables it, the same file works as the source for WhatsApp quick replies.

## SEO / AI findability

All pages: meta + OG tags, JSON-LD (Organization, LegalService, FAQPage),
sitemap.xml (updated with the 2 new pages), robots.txt, direct-answer FAQ
copy targeting queries like "necesito una visa para USA" and "mis hijos
quieren estudiar en Estados Unidos".
