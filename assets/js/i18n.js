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

  function buildSwitcher() {
    document.querySelectorAll("[data-lang-switch]").forEach(function (host) {
      var cur = currentLang();
      host.innerHTML = I.langs.map(function (l) {
        var cls = l.code === cur ? ' class="active"' : "";
        var title = l.ready ? l.name : l.name + " (traducción en preparación)";
        return '<a href="#" data-set-lang="' + l.code + '" title="' + title + '"' + cls + '>' + l.label + "</a>";
      }).join("");
      host.querySelectorAll("[data-set-lang]").forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          var code = a.getAttribute("data-set-lang");
          apply(code);
          buildSwitcher();
          var meta = I.langs.filter(function (l) { return l.code === code; })[0];
          if (meta && !meta.ready) {
            /* Honest, not silent: tell the visitor rather than showing them
               half-translated legal copy and pretending it's finished. */
            var n = document.getElementById("i18n-notice");
            if (n) {
              n.textContent = meta.name + ": full translation in progress. Content is shown in Spanish for now.";
              n.style.display = "block";
            }
          } else {
            var n2 = document.getElementById("i18n-notice");
            if (n2) n2.style.display = "none";
          }
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(currentLang());
    buildSwitcher();
  });
})();
