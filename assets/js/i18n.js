/* ==========================================================================
   CLG — i18n engine
   --------------------------------------------------------------------------
   HOW IT WORKS
   Every translatable string in the HTML carries data-i18n="key". This file
   holds one dictionary per language. Switching language rewrites those nodes
   and rewrites internal links to the /<lang>/ prefix so URLs stay per-language
   for SEO (/es/, /en/, /it/, /pt/, /de/, /fr/, /ko/).

   STATUS, STATED HONESTLY
   - es: source language, complete.
   - en: complete, written natively (not machine translated).
   - it, pt, de, fr, ko: SCAFFOLD ONLY. Keys exist and the switcher works, but
     the values below are placeholders marked TRANSLATE. They must be filled
     by professional translators before those languages are advertised.
     Machine-translating immigration law copy is a liability, not a shortcut.
     Any key missing from a dictionary falls back to Spanish, so nothing
     breaks while translation is pending.

   ADDING A TRANSLATION
   Fill the values in the matching object. Nothing else needs to change.
   ========================================================================== */

window.CLG_I18N = {
  langs: [
    { code: "es", label: "ES", name: "Español",   ready: true  },
    { code: "en", label: "EN", name: "English",   ready: true  },
    { code: "it", label: "IT", name: "Italiano",  ready: false },
    { code: "pt", label: "PT", name: "Português", ready: false },
    { code: "de", label: "DE", name: "Deutsch",   ready: false },
    { code: "fr", label: "FR", name: "Français",  ready: false },
    { code: "ko", label: "한국어", name: "한국어", ready: false }
  ],

  dict: {
    /* ---------------- SPANISH (source) ---------------- */
    es: null, /* null = use the text already in the HTML */

    /* ---------------- ENGLISH (complete) ---------------- */
    en: {
      nav_inicio: "Home",
      nav_inversionistas: "Investors",
      nav_profesionales: "Professionals",
      nav_familias: "Families",
      nav_servicios: "Services",
      nav_metas: "Goals",
      nav_estrategias: "Pathways",
      nav_oportunidades: "Opportunities",
      nav_casos: "Client Stories",
      nav_nosotros: "About",
      nav_recursos: "Resources",
      nav_socios: "Partners",
      nav_blog: "Blog",
      nav_preguntas: "FAQ",
      nav_contacto: "Contact",
      cta_main: "Start Your Immigration Strategy",
      cta_sub: "Not sure which path is right for you? Take our 2 minute assessment.",
      cta_secondary: "Explore Your Options",
      cta_whatsapp: "Chat on WhatsApp",

      hero_eyebrow: "Immigration strategy, not visa sales",
      hero_h1: "We don't sell visas. We design your complete immigration strategy.",
      hero_lede: "For business owners, professionals and families who need to make the right decision before investing time, money and years into an immigration process.",
      hero_step1: "We understand your profile",
      hero_step2: "We design the strategy",
      hero_step3: "We build the case",
      hero_step4: "We stay until it's resolved",

      trust_1: "20+ years", trust_1s: "of legal experience in immigration",
      trust_2: "International", trust_2s: "clients across Latin America and beyond",
      trust_3: "Multiple pathways", trust_3s: "investment, talent and family",
      trust_4: "U.S. based", trust_4s: "legal team in Doral, Florida",

      problem_eyebrow: "It isn't urgency. It's an option you build with time.",
      problem_h2: "This isn't about leaving tomorrow.",
      problem_lede: "It's about the door already being open the day you decide it's time, for you, your business or your children. That's optionality: deciding with time, not under pressure.",

      path_h2: "Where are you today?",
      path_lede: "Pick the one that sounds most like you.",
      path_1: "I have a business or want to invest",
      path_2: "I have a professional, artistic or athletic career",
      path_3: "My family is the priority",
      path_4: "I don't know which option is right for me",
      path_4_sub: "This is the most common answer, and it's exactly who we're built for.",

      why_h2: "Why build your future in the United States?",
      why_1: "Business opportunity", why_1p: "Access to one of the world's largest economies.",
      why_2: "Education", why_2p: "Access to leading schools and universities for your children.",
      why_3: "Global connectivity", why_3p: "Build relationships across international markets.",
      why_4: "Investment", why_4p: "Explore opportunities across many industries and regions.",
      why_5: "Family and lifestyle", why_5p: "Build a long term future for the people you're doing this for.",
      why_6: "Global mobility", why_6p: "Open new possibilities for your business and your family.",

      pathways_h2: "Immigration pathways we design",
      method_h2: "The CLG Method™",
      cases_h2: "Real people. Real journeys. Real strategies.",
      why_clg_h2: "Why families and business owners choose CLG",
      team_h2: "The people who will handle your case",
      fees_h2: "Clear fees, published before you pay anything",
      next_h2: "What happens after you click",
      faq_h2: "Questions we get most",
      final_h2: "Your first decision shouldn't be which visa to file.",
      final_lede: "It should be understanding which strategy is right for you.",

      popup_h3: "What will your immigration strategy be?",
      popup_p: "Every case is different. Tell us briefly about your situation and our team will guide you on the next steps.",
      popup_cta: "I want to know my strategy",
      popup_privacy: "Confidential. No obligation.",

      chat_title: "CLG Immigration Assistant",
      chat_sub: "Quick answers, or I'll connect you with a person",
      chat_greeting: "Hi. I can help you find your direction, or connect you with our team. What are you looking for?"
    },

    /* ---------------- SCAFFOLDS: professional translation required -------- */
    it: { __status: "TRANSLATE: Italian pending professional translation" },
    pt: { __status: "TRANSLATE: Portuguese pending professional translation" },
    de: { __status: "TRANSLATE: German pending professional translation" },
    fr: { __status: "TRANSLATE: French pending professional translation" },
    ko: { __status: "TRANSLATE: Korean pending professional translation" }
  }
};

(function () {
  var I = window.CLG_I18N;
  var STORE = "clg_lang";

  function currentLang() {
    var m = window.location.pathname.match(/^\/(es|en|it|pt|de|fr|ko)(\/|$)/);
    if (m) return m[1];
    try { return localStorage.getItem(STORE) || "es"; } catch (e) { return "es"; }
  }

  function apply(lang) {
    var d = I.dict[lang];
    document.documentElement.lang = lang === "ko" ? "ko" : lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!el.dataset.i18nOrig) el.dataset.i18nOrig = el.textContent;
      /* Missing key falls back to the Spanish source already in the HTML. */
      el.textContent = (d && d[key]) ? d[key] : el.dataset.i18nOrig;
    });
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  var GLOBE = '<svg class="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
              '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/>' +
              '<path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>';
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">' +
             '<path d="M6 9l6 6 6-6"/></svg>';

  function notice(meta) {
    var n = document.getElementById("i18n-notice");
    if (!n) return;
    if (meta && !meta.ready) {
      /* Honest, not silent: tell the visitor rather than showing them
         half-translated legal copy and pretending it's finished. */
      n.textContent = meta.name + ": la traducción completa está en preparación. Por ahora el contenido se muestra en español.";
      n.style.display = "block";
    } else {
      n.style.display = "none";
    }
  }

  /* The open/closed state is set with INLINE styles, not just a class.
     A class relies on the stylesheet being loaded; when it wasn't, every
     language option spilled onto the page as raw text. Inline styles can't
     fail that way. */
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
          'top:calc(100% + 8px);right:0;z-index:120;min-width:208px;background:#fff;' +
          'border:1px solid #e2d9c6;border-radius:2px;padding:5px;' +
          'box-shadow:0 20px 44px -18px rgba(15,30,51,.35);">' +
          I.langs.map(function (l) {
            return '<button type="button" role="option" data-set-lang="' + l.code + '"' +
                   (l.code === cur ? ' aria-current="true"' : "") + '>' +
                     '<span class="lang-name"><span class="lang-code">' + l.label + '</span>' + l.name + '</span>' +
                     (l.ready ? "" : '<span class="pending">en preparación</span>') +
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
          apply(code);
          closeAll();
          buildSwitcher();
          notice(I.langs.filter(function (l) { return l.code === code; })[0]);
        });
      });
    });

    notice(curMeta);
  }

  document.addEventListener("click", function () { closeAll(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });

  document.addEventListener("DOMContentLoaded", function () {
    apply(currentLang());
    buildSwitcher();
  });
})();
