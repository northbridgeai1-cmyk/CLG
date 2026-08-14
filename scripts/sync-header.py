#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CLG — one header, every page.

Run from the site root:   python3 scripts/sync-header.py

WHY THIS EXISTS
The nav was hand-written into each page, so it drifted: different pages had
different menu items, some had the language switcher and some didn't, and a
couple had it twice. Visitors saw the menu change as they clicked around.

This script is the single source of truth. It rewrites the <header> block,
the language-notice bar, and the asset <script> tags on every page, marks
the correct nav item active per page, and versions the CSS/JS URLs so the
browser can't serve a stale stylesheet.

Edit NAV below to change the menu once, for the whole site.
"""
import re, glob, sys, os

ASSET_VERSION = "7"

LOGO = ("https://d1yei2z3i6k35z.cloudfront.net/11877462/6810bc61b7b83_3adb0d-3066"
        "-a746-5c6-e5a55d3118de_6521b685-8df6-4fb0-a423-a0a4aa41272f.webp")

# The menu. Plain words a first-time visitor understands, and every page
# reachable from here instead of hidden behind an anchor on the homepage.
#
# Two shapes:
#   ("key", "href", "Label", "i18n_key")                      -> plain link
#   ("key", None,   "Label", "i18n_key", [ ...children... ])  -> dropdown
# A child is ("href", "Label", "one-line description") or ("--", "", "")
# for a divider, or ("##", "Heading", "") for a small section heading.
NAV = [
    ("inicio", "index.html", "Inicio", "nav_inicio"),

    ("servicios", None, "Servicios", "nav_servicios", [
        ("##", "¿Cuál es tu caso?", ""),
        ("estrategias-empresarios.html", "Empresarios e inversionistas",
         "Abrir, comprar o expandir un negocio"),
        ("estrategias-profesionales.html", "Profesionales, artistas y deportistas",
         "Trabajar desde tu propia trayectoria"),
        ("estrategias-familias.html", "Familias",
         "Estudios de tus hijos y residencia"),
        ("--", "", ""),
        ("metas-clg.html", "¿Qué quiero lograr?",
         "Buscar por objetivo, no por tipo de visa"),
        ("estrategia-honorarios.html", "Honorarios", "Qué cuesta y qué incluye"),
    ]),

    ("casos", "casos-de-exito.html", "Casos de Éxito", "nav_casos"),

    ("nosotros", None, "Nosotros", "nav_nosotros", [
        ("nosotros.html", "La firma y el equipo", "Quiénes somos y cómo trabajamos"),
        ("continuidad-clg.html", "Continuidad CLG", "Qué pasa después de la aprobación"),
        ("global-mobility.html", "Global Mobility", "Opciones fuera de Estados Unidos"),
        ("socios.html", "Socios y referidos", "Para contadores y asesores patrimoniales"),
    ]),

    ("recursos", None, "Recursos", "nav_recursos", [
        ("recursos.html", "Guías y eventos", "Guía CLG 2026, webinars y charlas"),
        ("preguntas-frecuentes.html", "Preguntas frecuentes", "Lo que más nos preguntan"),
        ("oportunidades.html", "Dónde instalarte", "Ciudades e industrias en EE.UU."),
        ("https://www.visamiami.com/category/blog-clg", "Blog", "Inmigración estratégica"),
    ]),

    ("contacto", "contacto.html", "Contacto", "nav_contacto"),
]

CHEV = ('<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        'stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>')

# Which top-level nav item is highlighted on each page.
ACTIVE = {
    "index.html": "inicio",
    "metas-clg.html": "servicios",
    "estrategias-empresarios.html": "servicios",
    "estrategias-profesionales.html": "servicios",
    "estrategias-familias.html": "servicios",
    "estrategia-honorarios.html": "servicios",
    "casos-de-exito.html": "casos",
    "nosotros.html": "nosotros",
    "continuidad-clg.html": "nosotros",
    "socios.html": "nosotros",
    "global-mobility.html": "nosotros",
    "recursos.html": "recursos",
    "preguntas-frecuentes.html": "recursos",
    "oportunidades.html": "recursos",
    "contacto.html": "contacto",
    "evaluacion.html": None,
}

# Standalone conversion pages with a deliberately stripped nav, left alone.
# global-mobility.html was moved OUT of this list once it was rebuilt on the
# shared design system, so it now inherits the site header like every other
# page. Its nav highlights "Nosotros" since it sits under the firm.
SKIP = {"fase1-evaluacion-clg.html", "clg-homepage-prototype.html"}


def header_html(active_key):
    items = []
    for entry in NAV:
        key, href, label, i18n = entry[0], entry[1], entry[2], entry[3]
        children = entry[4] if len(entry) > 4 else None
        is_active = (key == active_key)

        if not children:
            cls = ' class="active"' if is_active else ""
            items.append(f'      <a href="{href}"{cls} data-i18n="{i18n}">{label}</a>')
            continue

        sub = []
        for c_href, c_label, c_desc in children:
            if c_href == "--":
                sub.append("          <hr>")
            elif c_href == "##":
                sub.append(f'          <div class="sub-head">{c_label}</div>')
            else:
                desc = f"<small>{c_desc}</small>" if c_desc else ""
                sub.append(f'          <a href="{c_href}">{c_label}{desc}</a>')
        item_cls = ' nav-item active' if is_active else ' nav-item'
        items.append(
            f'      <div class="{item_cls.strip()}">\n'
            f'        <button class="nav-trigger" aria-expanded="false" data-i18n="{i18n}">{label}\n'
            f'          {CHEV}\n'
            f'        </button>\n'
            f'        <div class="nav-sub">\n' + "\n".join(sub) + "\n"
            f'        </div>\n'
            f'      </div>')
    nav = "\n".join(items)
    return f'''<header class="site-header">
  <div class="container">
    <a href="index.html" class="brand" aria-label="Calderaro Law Group, inicio">
      <img src="{LOGO}" alt="Calderaro Law Group">
    </a>
    <nav class="main-nav">
{nav}
    </nav>
    <div class="nav-cta">
      <span class="lang-switch" data-lang-switch></span>
      <a href="fase1-evaluacion-clg.html" class="btn btn-primary" data-i18n="cta_main">Quiero conocer mi estrategia</a>
    </div>
    <button class="mobile-toggle" aria-label="Menú"><span></span><span></span><span></span></button>
  </div>
</header>
<p id="i18n-notice" style="display:none;background:#fdf6e8;border-bottom:1px solid var(--gold-deep);margin:0;padding:10px 20px;font-size:.85rem;text-align:center;"></p>'''


def process(fn):
    with open(fn, encoding="utf-8") as fh:
        txt = fh.read()
    original = txt

    # 1. Replace the header block (and any notice bar right after it).
    new_header = header_html(ACTIVE.get(fn, None))
    pattern = re.compile(
        r'<header class="site-header">.*?</header>'
        r'(\s*<p id="i18n-notice".*?</p>)?',
        re.DOTALL)
    if pattern.search(txt):
        txt = pattern.sub(lambda m: new_header, txt, count=1)
    else:
        print(f"  ! {fn}: no <header class=\"site-header\"> found, skipped header")

    # 2. Version the assets so no stale stylesheet can be served.
    txt = re.sub(r'(href="assets/css/[\w.-]+\.css)(\?v=\d+)?"',
                 r'\1?v=' + ASSET_VERSION + '"', txt)
    txt = re.sub(r'(src="assets/js/[\w.-]+\.js)(\?v=\d+)?"',
                 r'\1?v=' + ASSET_VERSION + '"', txt)

    # 3. Guarantee i18n.js is loaded before main.js on every page.
    if "assets/js/i18n.js" not in txt and "assets/js/main.js" in txt:
        txt = txt.replace(
            '<script src="assets/js/main.js',
            f'<script src="assets/js/i18n.js?v={ASSET_VERSION}"></script>\n'
            '<script src="assets/js/main.js', 1)

    if txt != original:
        with open(fn, "w", encoding="utf-8") as fh:
            fh.write(txt)
        return True
    return False


def main():
    files = sorted(f for f in glob.glob("*.html") if f not in SKIP)
    if not files:
        sys.exit("No HTML files here — run this from the site root.")
    changed = 0
    for fn in files:
        if process(fn):
            print(f"{fn}: header synced, assets at v{ASSET_VERSION}")
            changed += 1
        else:
            print(f"{fn}: already current")
    print(f"\n{changed} file(s) updated. Skipped (own design): {', '.join(sorted(SKIP))}")


if __name__ == "__main__":
    main()
