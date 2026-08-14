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

ASSET_VERSION = "6"

LOGO = ("https://d1yei2z3i6k35z.cloudfront.net/11877462/6810bc61b7b83_3adb0d-3066"
        "-a746-5c6-e5a55d3118de_6521b685-8df6-4fb0-a423-a0a4aa41272f.webp")

# key, href, label, i18n key
NAV = [
    ("inicio",   "index.html",              "Inicio",    "nav_inicio"),
    ("metas",    "metas-clg.html",          "Metas",     "nav_metas"),
    ("vias",     "index.html#vias",         "Vías",      "nav_estrategias"),
    ("casos",    "casos-de-exito.html",     "Casos",     "nav_casos"),
    ("nosotros", "nosotros.html",           "Nosotros",  "nav_nosotros"),
    ("recursos", "recursos.html",           "Recursos",  "nav_recursos"),
    ("contacto", "contacto.html",           "Contacto",  "nav_contacto"),
]

# Which nav key is "active" on each page. Pages not listed get no active item.
ACTIVE = {
    "index.html": "inicio",
    "metas-clg.html": "metas",
    "estrategias-empresarios.html": "vias",
    "estrategias-profesionales.html": "vias",
    "estrategias-familias.html": "vias",
    "estrategia-honorarios.html": "vias",
    "oportunidades.html": "vias",
    "casos-de-exito.html": "casos",
    "nosotros.html": "nosotros",
    "continuidad-clg.html": "nosotros",
    "socios.html": "nosotros",
    "global-mobility.html": "nosotros",
    "recursos.html": "recursos",
    "preguntas-frecuentes.html": "recursos",
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
    for key, href, label, i18n in NAV:
        cls = ' class="active"' if key == active_key else ""
        items.append(f'      <a href="{href}"{cls} data-i18n="{i18n}">{label}</a>')
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
