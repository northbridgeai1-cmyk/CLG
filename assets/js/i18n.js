/* ==========================================================================
   CLG — i18n engine
   --------------------------------------------------------------------------
   HOW IT WORKS
   Spanish and English are REAL PAGES, not text swaps. Spanish lives at the
   root, English lives in /en/. Picking a language navigates you to the twin
   of the page you're on, so every language keeps its own URL. That's what
   makes it work for search engines.

   The five other languages are wired into the switcher but not translated.
   Picking one keeps you where you are and says so, in the language of the
   page you're reading. It never dumps you onto a page in a language you
   didn't ask for.

   STATUS, STATED HONESTLY
   - es: source language, complete.
   - en: complete, written natively (not machine translated).
   - it, pt, de, fr, ko: NOT TRANSLATED. Listed in the switcher so the
     firm can see the shape of it, marked as pending, and deliberately
     inert. Machine-translating immigration law copy is a liability, not
     a shortcut. Flip `ready: true` once a human translator has done the
     work and the /it/, /pt/ ... folders exist.

   ADDING A LANGUAGE
   1. Create the folder (e.g. /it/) with the translated pages.
   2. Add its filename map next to EN_MAP.
   3. Flip `ready: true` below.
   ========================================================================== */

window.CLG_I18N = {
  langs: [
    { code: "es", label: "ES", name: "Español",   ready: true  },
    { code: "en", label: "EN", name: "English",   ready: true  },
    { code: "it", label: "IT", name: "Italiano",  ready: false },
    { code: "pt", label: "PT", name: "Português", ready: false },
    { code: "de", label: "DE", name: "Deutsch",   ready: false },
    { code: "fr", label: "FR", name: "Français",  ready: false },
    { code: "ko", label: "KO", name: "한국어",     ready: false }
  ],

  dict: {
    /* Spanish and English are full pages, so there is no dictionary to
       apply. These exist for the handful of nodes that carry data-i18n. */
    es: null,
    en: null,

    it: null, pt: null, de: null, fr: null, ko: null
  }
};

(function () {
  "use strict";

  var I = window.CLG_I18N;
  var STORE = "clg_lang";

  /* Is this page inside /en/ ? The path decides, not what the visitor
     picked last time. An English URL is English, full stop. */
  var IN_EN = /\/en\//.test(window.location.pathname);

  /* UI copy for the switcher itself, in the language of the page. */
  var UI = IN_EN ? {
    pending: "coming soon",
    notice: function (name) {
      return name + ": the full translation is still being prepared. For now this page is shown in English.";
    }
  } : {
    pending: "en preparación",
    notice: function (name) {
      return name + ": la traducción completa está en preparación. Por ahora esta página se muestra en español.";
    }
  };

  /* The URL is the single source of truth. A page in /en/ is English; a
     page at the root is Spanish. We deliberately do NOT let a stored
     preference override that — if it did, someone who once clicked "EN"
     would see the Spanish page labelled English forever. */
  function currentLang() {
    return IN_EN ? "en" : "es";
  }

  /* Spanish filename -> English filename. English URLs read in English,
     which matters for search. Add a line here when a page is translated
     and the switcher starts routing to it on its own. */
  var EN_MAP = {
    "index.html":                    "index.html",
    "casos-de-exito.html":           "client-stories.html",
    "estrategias-empresarios.html":  "business-owners.html",
    "estrategias-profesionales.html":"professionals.html",
    "estrategias-familias.html":     "families.html",
    "nosotros.html":                 "about.html",
    "contacto.html":                 "contact.html",
    "fase1-evaluacion-clg.html":     "strategy-assessment.html",
    "metas-clg.html":                "goals.html",
    "estrategia-honorarios.html":    "fees.html",
    "evaluacion.html":               "compass.html",
    "continuidad-clg.html":          "continuity.html",
    "recursos.html":                 "resources.html",
    "socios.html":                   "partners.html",
    "oportunidades.html":            "opportunities.html",
    "preguntas-frecuentes.html":     "faq.html",
    "gracias.html":                  "thank-you.html"
    /* global-mobility.html deliberately absent: it's already written in
       English and lives at the root, since its audience is US nationals
       looking outward rather than Spanish speakers looking in. */
  };
  var ES_MAP = {};
  for (var k in EN_MAP) { if (EN_MAP.hasOwnProperty(k)) ES_MAP[EN_MAP[k]] = k; }

  function fileName() {
    var p = window.location.pathname.split("/").pop();
    return p || "index.html";
  }

  /* Navigate to the twin of this page in the requested language.
     Returns true only if it actually moved.

     Only "es" and "en" navigate. The pending languages return false on
     purpose so the caller keeps you on the page and shows the notice.
     The old build sent anything-not-English back to Spanish, which meant
     clicking "Italiano" on an English page dumped you into Spanish. */
  function goToLang(code) {
    var file = fileName();

    if (code === "en" && !IN_EN) {
      var target = EN_MAP[file];
      if (!target) return false;                 // no English twin yet
      window.location.href = "en/" + (target === "index.html" ? "" : target);
      return true;
    }

    if (code === "es" && IN_EN) {
      var back = ES_MAP[file] || "index.html";
      window.location.href = "../" + (back === "index.html" ? "" : back);
      return true;
    }

    return false;
  }

  /* Applies any data-i18n nodes. With Spanish and English as real pages
     there is little to do here, but it keeps the hook available for the
     languages that get added later. */
  function apply(lang, ready) {
    var d = I.dict[lang];
    /* Only claim the document is in a language we actually serve.
       Setting lang="it" on Spanish text would be a lie to screen readers
       and to search engines. */
    if (ready) document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!el.dataset.i18nOrig) el.dataset.i18nOrig = el.textContent;
      el.textContent = (d && d[key]) ? d[key] : el.dataset.i18nOrig;
    });
  }

  var GLOBE = '<svg class="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
              '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/>' +
              '<path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>';
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">' +
             '<path d="M6 9l6 6 6-6"/></svg>';

  function showNotice(text) {
    var n = document.getElementById("i18n-notice");
    if (!n) return;
    if (text) { n.textContent = text; n.style.display = "block"; }
    else { n.style.display = "none"; }
  }

  /* Open/closed state is set with INLINE styles, not only a class.
     A class depends on the stylesheet having loaded; when it hadn't,
     every language option spilled onto the page as raw text. Inline
     styles can't fail that way. */
  function setOpen(host, open) {
    host.classList.toggle("open", open);
    var menu = host.querySelector(".lang-menu");
    if (menu) menu.style.display = open ? "block" : "none";
    var btn = host.querySelector(".lang-toggle-btn");
    if (btn) btn.setAttribute("aria-expanded", String(open));
  }

  function closeAll(except) {
    document.querySelectorAll("[data-lang-switch]").forEach(function (h) {
      if (h !== except) setOpen(h, false);
    });
  }

  function buildSwitcher() {
    var cur = currentLang();
    var curMeta = I.langs.filter(function (l) { return l.code === cur; })[0] || I.langs[0];

    document.querySelectorAll("[data-lang-switch]").forEach(function (host) {
      host.classList.add("lang-switch");

      /* Minimal inline styling so the control is usable even before the
         stylesheet arrives. The stylesheet then refines it. */
      host.setAttribute("style", "position:relative;display:inline-block;");

      host.innerHTML =
        '<button type="button" class="lang-toggle-btn" aria-haspopup="listbox" aria-expanded="false" ' +
          'style="display:inline-flex;align-items:center;gap:7px;background:#fff;' +
          'border:1px solid #e2d9c6;border-radius:2px;padding:8px 12px;font:700 .8rem ' +
          'system-ui,sans-serif;color:#3c4f66;cursor:pointer;white-space:nowrap;">' +
          GLOBE + '<span>' + curMeta.name + '</span>' + CHEV +
        '</button>' +
        '<div class="lang-menu" role="listbox" style="display:none;position:absolute;' +
          'top:calc(100% + 8px);right:0;z-index:120;min-width:214px;background:#fff;' +
          'border:1px solid #e2d9c6;border-radius:2px;padding:5px;' +
          'box-shadow:0 20px 44px -18px rgba(15,30,51,.35);">' +
          I.langs.map(function (l) {
            return '<button type="button" role="option" data-set-lang="' + l.code + '"' +
                   (l.code === cur ? ' aria-current="true"' : "") +
                   (l.ready ? "" : ' data-pending="1"') + '>' +
                     '<span class="lang-name"><span class="lang-code">' + l.label + '</span>' + l.name + '</span>' +
                     (l.ready ? "" : '<span class="pending">' + UI.pending + '</span>') +
                   '</button>';
          }).join("") +
        '</div>';

      var btn = host.querySelector(".lang-toggle-btn");
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = host.classList.contains("open");
        closeAll(host);
        setOpen(host, !isOpen);
      });

      host.querySelectorAll("[data-set-lang]").forEach(function (opt) {
        opt.addEventListener("click", function (e) {
          e.stopPropagation();
          var code = opt.getAttribute("data-set-lang");
          var meta = I.langs.filter(function (l) { return l.code === code; })[0];

          /* Real page swap for the two languages that exist. */
          if (meta && meta.ready) {
            try { localStorage.setItem(STORE, code); } catch (err) {}
            if (goToLang(code)) return;
            /* Already on that language, or no twin for this page. */
            closeAll();
            showNotice(null);
            return;
          }

          /* Pending language: stay put, say so, don't pretend. */
          closeAll();
          apply(code, false);
          showNotice(UI.notice(meta ? meta.name : code));
        });
      });
    });

    /* On load, an English or Spanish page never shows the notice. */
    showNotice(null);
  }

  document.addEventListener("click", function () { closeAll(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });

  function boot() {
    apply(currentLang(), true);
    buildSwitcher();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
