#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CLG site — one-shot Spanish diacritics + Brújula naming pass.

Run from the site root:   python3 scripts/fix-accents.py

What it does, in order:
  1. Mechanical renames (nav CTA -> "Brújula CLG", door labels, Blog link).
  2. Restores accents/ñ on the site's known vocabulary (word-boundary regex,
     filenames like evaluacion.html / casos-de-exito.html are protected).

Idempotent: running it twice changes nothing the second time.
index.html, evaluacion.html, fase1-evaluacion-clg.html and global-mobility.html
were already written with correct accents — the script skips nothing but
won't alter correctly-accented text.
"""
import re, glob, sys, os

RENAMES = [
    ('>Hacer mi Evaluacion</a>', '>Brújula CLG</a>'),
    ('>Empresarios e Inversionistas<', '>Empresarios, Inversionistas y Corporaciones<'),
    ('>Profesionales y Talento<', '>Profesionales, Artistas y Deportistas<'),
    ('>Evaluacion gratuita</a>', '>Brújula CLG (gratis)</a>'),
    ('<a href="preguntas-frecuentes.html">Preguntas</a>',
     '<a href="https://www.visamiami.com/category/blog-clg">Blog</a>\n      <a href="preguntas-frecuentes.html">Preguntas</a>'),
]

PHRASES = [
    (r'Tu tambien', 'Tú tambien'),
    (r'aun asi', 'aun__ASI__'),
    (r'¿A donde', '¿A dónde'),
    (r'por donde empiezo', 'por dónde empiezo'),
    (r'donde estas parado', 'dónde estas parado'),
    (r'no estas listo', 'no estás listo'),
    (r'estas parado', 'estás parado'),
    (r'estas buscando', 'estás buscando'),
    (r'esta bien\b', 'está bien'),
    (r'esta tu mapa', 'está tu mapa'),
    (r'no lo se con certeza', 'no lo sé con certeza'),
    (r'Aun no lo se\b', 'Aún no lo sé'),
    (r'¿Que ', '¿Qué '), (r'¿En que', '¿En qué'), (r'¿Cual', '¿Cuál'),
    (r'¿Cuanto', '¿Cuánto'), (r'¿Cuantos', '¿Cuántos'), (r'¿Como', '¿Cómo'),
    (r'¿Por que', '¿Por qué'), (r'¿Quien', '¿Quién'),
    (r'Por que trabajar', 'Por qué trabajar'),
    (r'quien puede aplicar', 'quién puede aplicar'),
    (r'cual via aplicaba', 'cuál via aplicaba'),
    (r'es cual es la correcta', 'es cuál es la correcta'),
    (r'que via se ajusta', 'qué via se ajusta'),
    (r'que visa pido', 'qué visa pido'),
    (r'como me aseguro', 'cómo me aseguro'),
]

WORDS = [
    (r'\bEvaluacion\b', 'Evaluación'), (r'\bevaluacion\b(?!\.html)', 'evaluación'),
    (r'(?<!-)\bExito\b', 'Éxito'), (r'(?<!-)(?<!de-)\bexito\b(?!\.html)', 'éxito'),
    (r'\bDiagnostico\b', 'Diagnóstico'), (r'\bdiagnostico\b', 'diagnóstico'),
    (r'\bDiseno\b', 'Diseño'), (r'\bdiseno\b', 'diseño'), (r'\bDisenamos\b', 'Diseñamos'),
    (r'\bdisenamos\b', 'diseñamos'), (r'\bdisena\b', 'diseña'), (r'\bdisenada\b', 'diseñada'), (r'\bdisenan\b', 'diseñan'),
    (r'\bDocumentacion\b', 'Documentación'), (r'\bdocumentacion\b', 'documentación'),
    (r'\bInmigracion\b', 'Inmigración'), (r'\binmigracion\b', 'inmigración'),
    (r'\banos\b', 'años'), (r'\bdecadas\b', 'décadas'), (r'\bdecada\b', 'década'),
    (r'\bIntracompania\b', 'Intracompañía'), (r'\bintracompania\b', 'intracompañía'),
    (r'\bacompanamiento\b', 'acompañamiento'), (r'\bacompana\b', 'acompaña'), (r'\bacompanarte\b', 'acompañarte'),
    (r'\bincluyendote\b', 'incluyéndote'), (r'\bmanana\b', 'mañana'),
    (r'\bEspana\b', 'España'), (r'\bespanol\b', 'español'), (r'\bEspanol\b', 'Español'),
    (r'\bmas\b', 'más'), (r'\basi\b', 'así'), (r'\baqui\b', 'aquí'), (r'\bAqui\b', 'Aquí'),
    (r'\bsegun\b', 'según'), (r'\bSegun\b', 'Según'),
    (r'\btambien\b', 'también'), (r'\bTambien\b', 'También'), (r'\bademas\b', 'además'),
    (r'\btodavia\b', 'todavía'), (r'\bTodavia\b', 'Todavía'),
    (r'\bdia\b', 'día'), (r'\bdias\b', 'días'), (r'\bDia\b', 'Día'),
    (r'\bvia\b', 'vía'), (r'\bvias\b', 'vías'),
    (r'\bpais\b', 'país'), (r'\bpaises\b', 'países'),
    (r'\bJapon\b', 'Japón'), (r'\bPeru\b', 'Perú'), (r'\bMexico\b', 'México'), (r'\bCanada\b', 'Canadá'),
    (r'\bLatinoamerica\b', 'Latinoamérica'),
    (r'\bnumero\b', 'número'), (r'\bnumeros\b', 'números'), (r'\bNumeros\b', 'Números'),
    (r'\bpagina\b', 'página'), (r'\bpaginas\b', 'páginas'),
    (r'\btelefono\b', 'teléfono'), (r'\bcodigo\b', 'código'), (r'\belectronico\b', 'electrónico'),
    (r'\bsesion\b', 'sesión'), (r'\bSesion\b', 'Sesión'), (r'\breunion\b', 'reunión'),
    (r'\bpeticion\b', 'petición'), (r'\bPeticion\b', 'Petición'),
    (r'\binversion\b', 'inversión'), (r'\bInversion\b', 'Inversión'),
    (r'\bexpansion\b', 'expansión'), (r'\bExpansion\b', 'Expansión'),
    (r'\breunificacion\b', 'reunificación'), (r'\bReunificacion\b', 'Reunificación'),
    (r'\bplanificacion\b', 'planificación'), (r'\bPlanificacion\b', 'Planificación'),
    (r'\binformacion\b', 'información'), (r'\bInformacion\b', 'Información'),
    (r'\bconstitucion\b', 'constitución'), (r'\bConstitucion\b', 'Constitución'),
    (r'\bresolucion\b', 'resolución'), (r'\batencion\b', 'atención'), (r'\bAtencion\b', 'Atención'),
    (r'\brelacion\b', 'relación'), (r'\boperacion\b', 'operación'), (r'\bnegacion\b', 'negación'),
    (r'\baccion\b', 'acción'), (r'\bopcion\b', 'opción'), (r'\bsolucion\b', 'solución'),
    (r'\brecomendacion\b', 'recomendación'), (r'\bcertificacion\b', 'certificación'),
    (r'\bcreacion\b', 'creación'), (r'\bpresentacion\b', 'presentación'),
    (r'\bsituacion\b', 'situación'), (r'\bSituacion\b', 'Situación'),
    (r'\bintencion\b', 'intención'), (r'\bdecision\b', 'decisión'),
    (r'\baprobacion\b', 'aprobación'), (r'\btramite\b', 'trámite'), (r'\bdebil\b', 'débil'),
    (r'\bcomun\b', 'común'), (r'\brevision\b', 'revisión'), (r'\bRevision\b', 'Revisión'),
    (r'\bEstructuracion\b', 'Estructuración'), (r'\bestructuracion\b', 'estructuración'),
    (r'\bpreparacion\b', 'preparación'), (r'\bPreparacion\b', 'Preparación'),
    (r'\bconexion\b', 'conexión'), (r'\bConexion\b', 'Conexión'),
    (r'\bloteria\b', 'lotería'), (r'\bLoteria\b', 'Lotería'),
    (r'\bcategoria\b', 'categoría'), (r'\bcategorias\b', 'categorías'),
    (r'\basesoria\b', 'asesoría'), (r'\bAsesoria\b', 'Asesoría'),
    (r'\bgarantia\b', 'garantía'), (r'\bGarantia\b', 'Garantía'),
    (r'\bmetodologia\b', 'metodología'), (r'\bMetodologia\b', 'Metodología'),
    (r'\bMetodo\b', 'Método'), (r'\bmetodo\b', 'método'),
    (r'\bMision\b', 'Misión'), (r'\bVision\b', 'Visión'),
    (r'\banalisis\b', 'análisis'), (r'\bAnalisis\b', 'Análisis'),
    (r'\bpractica\b', 'práctica'), (r'\bcredito\b', 'crédito'), (r'\bCredito\b', 'Crédito'),
    (r'\bminimo\b', 'mínimo'), (r'\bminimos\b', 'mínimos'),
    (r'\bmaximo\b', 'máximo'), (r'\bMaximo\b', 'Máximo'), (r'\bmaxima\b', 'máxima'),
    (r'\bunica\b', 'única'), (r'\bunico\b', 'único'),
    (r'\bgenerica\b', 'genérica'), (r'\bgenerico\b', 'genérico'), (r'\bgenericas\b', 'genéricas'),
    (r'\brapida\b', 'rápida'), (r'\brapidas\b', 'rápidas'), (r'\brapido\b', 'rápido'), (r'\bRapidas\b', 'Rápidas'),
    (r'\bagil\b', 'ágil'), (r'\bultimo\b', 'último'), (r'\bUltimo\b', 'Último'),
    (r'\bultima\b', 'última'), (r'\bultimas\b', 'últimas'), (r'\bUltimas\b', 'Últimas'),
    (r'\bproximas\b', 'próximas'), (r'\bproximos\b', 'próximos'), (r'\bproxima\b', 'próxima'),
    (r'\binteres\b', 'interés'), (r'\bInteres\b', 'Interés'), (r'\bingles\b', 'inglés'),
    (r'\bdespues\b', 'después'), (r'\bDespues\b', 'Después'),
    (r'\batras\b', 'atrás'), (r'\bAtras\b', 'Atrás'), (r'\btraves\b', 'través'),
    (r'\bestan\b', 'están'), (r'\blinea\b', 'línea'),
    (r'\bguia\b', 'guía'), (r'\bGuia\b', 'Guía'), (r'\bguiandolos\b', 'guiándolos'),
    (r'\bvaria\b', 'varía'), (r'\bVaria\b', 'Varía'), (r'\bvarian\b', 'varían'),
    (r'\bevalua\b', 'evalúa'), (r'\bevaluan\b', 'evalúan'),
    (r'\bpodria\b', 'podría'), (r'\bpodrias\b', 'podrías'), (r'\bseria\b', 'sería'),
    (r'\bescribira\b', 'escribirá'), (r'\bcomunicara\b', 'comunicará'),
    (r'\bpreguntale\b', 'pregúntale'), (r'\bescribenos\b', 'escríbenos'),
    (r'\bAverigualo\b', 'Averígualo'), (r'\bSuscribete\b', 'Suscríbete'),
    (r'\bboletin\b', 'boletín'), (r'\bhabiles\b', 'hábiles'), (r'\bpequenos\b', 'pequeños'),
    (r'\bAun\b', 'Aún'), (r'\baun\b', 'aún'),
]

RESTORE = [(r'aun__ASI__', 'aun así'), (r'aún__ASI__', 'aun así')]

# --- Humanize: kill the dash-as-dramatic-pause habit -------------------------
# Research on AI-sounding prose points at two tells: dash-heavy sentences used
# as a rhetorical pause, and the "no es X, es Y" construction. These rewrites
# handle the mechanical cases on pages not yet rewritten by hand. Anything the
# script can't resolve safely gets REPORTED, not guessed at, so a human can
# rewrite the sentence properly.
DEDASH = [
    # " — y " / " — o " / " — pero "  ->  ", y " etc.
    (r'\s+—\s+(y|o|pero|aunque|sino)\s+', r', \1 '),
    # " — como ... — "  (parenthetical) -> ", como ..., "
    (r'\s+—\s+(como [^—<.]{3,60})\s+—\s+', r', \1, '),
    # trailing " — <lowercase clause>."  -> ". <Capitalized clause>."
    (r'\s+—\s+([a-záéíóúñ])([^—<]{3,90}?)(\.)', lambda m: '. ' + m.group(1).upper() + m.group(2) + m.group(3)),
    # " —, " artifacts
    (r'\s+—\s*,', ','),
]

def report_remaining_dashes(fn, txt):
    """Dashes that survived need a human sentence rewrite, not a regex."""
    hits = re.findall(r'[^<>\n]{0,50}—[^<>\n]{0,50}', txt)
    if hits:
        print(f"  ⚠ {fn}: {len(hits)} guion(es) largo(s) para revisar a mano:")
        for h in hits[:8]:
            print(f"      …{h.strip()}…")

SKIP = {
    'clg-homepage-prototype.html',   # archived first draft
    'global-mobility.html',          # English
    'index.html',                    # rewritten by hand, already correct
    'evaluacion.html',
    'fase1-evaluacion-clg.html',
    'metas-clg.html',
    'continuidad-clg.html',
}

ASSET_VERSION = "3"   # bump this whenever styles.css or the JS changes

def bust_cache(txt):
    """Append ?v=N to local css/js so browsers stop serving a stale stylesheet.

    This was a real failure: the client reviewed the site while Chrome was
    still serving the previous stylesheet, so every component added in the
    redesign had no rules and collapsed into unstyled text. Versioned asset
    URLs make that impossible.
    """
    txt = re.sub(r'(href="assets/css/[\w.-]+\.css)(\?v=\d+)?"',
                 r'\1?v=' + ASSET_VERSION + '"', txt)
    txt = re.sub(r'(src="assets/js/[\w.-]+\.js)(\?v=\d+)?"',
                 r'\1?v=' + ASSET_VERSION + '"', txt)
    return txt


def main():
    # Cache-busting applies to EVERY page, including the hand-written ones.
    for fn in glob.glob('*.html'):
        with open(fn, encoding='utf-8') as fh:
            t = fh.read()
        t2 = bust_cache(t)
        if t2 != t:
            with open(fn, 'w', encoding='utf-8') as fh:
                fh.write(t2)
            print(f"{fn}: assets versioned to v{ASSET_VERSION}")

    files = [f for f in glob.glob('*.html') if f not in SKIP]
    if not files:
        sys.exit("No HTML files found — run from the site root.")
    for fn in files:
        with open(fn, encoding='utf-8') as fh:
            txt = fh.read()
        n = 0
        for old, new in RENAMES:
            if old in txt:
                txt = txt.replace(old, new); n += 1
        for pat, rep in PHRASES + WORDS + RESTORE + DEDASH:
            txt, k = re.subn(pat, rep, txt)
            n += k
        with open(fn, 'w', encoding='utf-8') as fh:
            fh.write(txt)
        print(f"{fn}: {n} replacements")
        report_remaining_dashes(fn, txt)

if __name__ == '__main__':
    main()
