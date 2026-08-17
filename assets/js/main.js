/* ==========================================================================
   Calderaro Law Group — site behavior
   Nav · WhatsApp · scroll reveals · popup · lead-gen assistant · forms
   ========================================================================== */

var CLG = {
  whatsapp: "17863016264",
  /* TODO(CLG): point these at the systeme.io form endpoints so submissions
     land in the CRM with their tag. Until then, submissions are handed off
     via a pre-filled WhatsApp message and nothing is silently lost. */
  endpoints: { popup: "", chat: "", contact: "" }
};

/* Pull in the language engine if the page didn't load it explicitly.
   Older pages only reference main.js, and adding a second <script> tag to
   every one of them by hand is exactly the kind of drift that made the nav
   inconsistent in the first place. */
(function () {
  if (window.CLG_I18N) return;
  var s = document.createElement("script");
  s.src = "assets/js/i18n.js?v=9";
  document.head.appendChild(s);
})();

/* ---------------- Scroll reveal ---------------- */
(function () {
  var css = document.createElement("style");
  css.textContent =
    ".rvl{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.3,1),transform .7s cubic-bezier(.2,.7,.3,1)}" +
    ".rvl.in{opacity:1;transform:none}" +
    "@media (prefers-reduced-motion: reduce){.rvl{opacity:1;transform:none;transition:none}}";
  document.head.appendChild(css);
  function arm() {
    if (!("IntersectionObserver" in window)) return;
    var t = document.querySelectorAll(
      ".section .card, .section .path-card, .section .pathway-card, .section .why-item," +
      ".section .method-step, .section .case-card, .section .team-card, .section .next-item," +
      ".section .industry-tile, .section .resource-card, .section .event-item, .section h2, .section .lede"
    );
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .12 });
    t.forEach(function (el, i) {
      el.classList.add("rvl");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", arm) : arm();
})();

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- Mobile nav ---------------- */
  var toggle = document.querySelector(".mobile-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () { document.body.classList.toggle("menu-open"); });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
    });
  }

  /* Dropdown triggers. Hover handles desktop via CSS; this covers touch,
     keyboard, and the mobile accordion. */
  document.querySelectorAll(".nav-trigger").forEach(function (btn) {
    var item = btn.closest(".nav-item");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".nav-item.open").forEach(function (n) { n.classList.remove("open"); });
      if (!wasOpen) item.classList.add("open");
      btn.setAttribute("aria-expanded", String(!wasOpen));
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-item.open").forEach(function (n) { n.classList.remove("open"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll(".nav-item.open").forEach(function (n) { n.classList.remove("open"); });
  });

  /* ---------------- WhatsApp links ---------------- */
  document.querySelectorAll("[data-wa-link]").forEach(function (el) {
    var msg = el.getAttribute("data-wa-link") || "Hola, me gustaría conocer mi estrategia migratoria.";
    el.href = "https://api.whatsapp.com/send?phone=" + CLG.whatsapp + "&text=" + encodeURIComponent(msg);
    el.target = "_blank"; el.rel = "noopener";
  });

  initPopup();
  initAssistant();
  initContactForm();

  document.querySelectorAll("[data-subscribe-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = f.querySelector("[data-subscribe-status]");
      if (m) m.textContent = "Listo. Revisa tu correo para confirmar tu suscripción.";
    });
  });
});

/* ==========================================================================
   POPUP
   Fires on exit intent, or after 45s, whichever comes first. Never on load.
   Shown once per visitor (remembered), never again after they convert.
   ========================================================================== */
function initPopup() {
  var overlay = document.getElementById("clg-popup");
  if (!overlay) return;
  var KEY = "clg_popup_seen";
  var seen = false;
  try { seen = !!localStorage.getItem(KEY); } catch (e) {}
  if (seen) return;

  var opened = false;
  function open() {
    if (opened) return;
    opened = true;
    overlay.classList.add("open");
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
  }
  function close() { overlay.classList.remove("open"); }

  var timer = setTimeout(open, 45000);
  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && e.clientY < 10) { clearTimeout(timer); open(); }
  });
  overlay.querySelectorAll("[data-popup-close]").forEach(function (b) {
    b.addEventListener("click", close);
  });
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  /* Step 1 (intent) -> step 2 (short form). Deliberately not a long quiz. */
  var s1 = document.getElementById("popup-step-1");
  var s2 = document.getElementById("popup-step-2");
  var go = document.getElementById("popup-go");
  if (go) go.addEventListener("click", function () { s1.style.display = "none"; s2.style.display = "block"; });

  /* Chip choices */
  overlay.querySelectorAll(".choice-row").forEach(function (row) {
    row.addEventListener("click", function (e) {
      var c = e.target.closest(".choice");
      if (!c) return;
      row.querySelectorAll(".choice").forEach(function (x) { x.classList.remove("selected"); });
      c.classList.add("selected");
    });
  });

  var form = document.getElementById("popup-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var pick = function (id) {
        var s = document.querySelector("#" + id + " .choice.selected");
        return s ? s.textContent.trim() : "no especificado";
      };
      var data = {
        situacion: pick("popup-situacion"),
        objetivo: pick("popup-objetivo"),
        pais: form.querySelector("[name=pais]").value,
        nombre: form.querySelector("[name=nombre]").value,
        whatsapp: form.querySelector("[name=whatsapp]").value,
        email: form.querySelector("[name=email]").value
      };
      var msg = "Hola, quiero conocer mi estrategia migratoria.\n" +
        "Nombre: " + data.nombre + "\nPaís: " + data.pais +
        "\nSituación: " + data.situacion + "\nObjetivo: " + data.objetivo +
        "\nEmail: " + data.email + "\nWhatsApp: " + data.whatsapp;
      try { localStorage.setItem("clg_popup_lead", JSON.stringify(data)); } catch (err) {}
      document.getElementById("popup-step-2").innerHTML =
        '<h3>Gracias, ' + (data.nombre.split(" ")[0] || "") + '.</h3>' +
        '<p>Recibimos tu información. Un asesor revisa tu perfil y te contacta.</p>' +
        '<p style="font-size:.88rem;color:var(--ink-soft);">Si quieres adelantar la conversación, confírmalo por WhatsApp y tu información viaja con el mensaje.</p>' +
        '<a class="btn btn-whatsapp btn-block" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=' +
        CLG.whatsapp + '&text=' + encodeURIComponent(msg) + '">Confirmar por WhatsApp</a>';
    });
  }
}

/* ==========================================================================
   ASSISTANT
   Menu-driven, so it works as lead generation and not just Q&A.
   Path: intent menu -> sub-answer -> capture (name, country, email,
   WhatsApp, objective) -> handoff. Free text still answers from the FAQ.
   Runs entirely client side. Nothing here is legal advice, and anything
   case-specific is routed to a human on purpose.
   ========================================================================== */
function initAssistant() {
  var fab = document.getElementById("ai-fab");
  var panel = document.getElementById("ai-panel");
  var closeBtn = document.getElementById("ai-close");
  var box = document.getElementById("ai-messages");
  var choices = document.getElementById("ai-choices");
  var form = document.getElementById("ai-input-form");
  var input = document.getElementById("ai-input");
  if (!fab || !panel) return;

  var lead = {};
  var stage = "menu";

  var MENU = [
    ["Explorar mis opciones migratorias", "explorar"],
    ["Negocios e inversión", "negocio"],
    ["Inmigración profesional o de talento", "talento"],
    ["Inmigración familiar", "familia"],
    ["Saber cuál vía me corresponde", "via"],
    ["Hablar con un abogado", "abogado"]
  ];

  var ANSWERS = {
    explorar: "Con gusto. Trabajamos tres grandes puertas: inversión y negocios, talento profesional o artístico, y familia. Lo que define cuál te sirve no es la visa, es tu perfil completo.",
    negocio: "Para empresarios e inversionistas diseñamos rutas como E-2, L-1 y EB-5, incluyendo la estructura del negocio y la evidencia. También trabajamos con empresas ya establecidas en EE.UU. que necesitan traer talento del exterior.",
    talento: "Para profesionales, artistas y deportistas evaluamos O-1, EB-1 y EB-2 NIW. Tu trayectoria suele valer más de lo que crees; lo que decide el caso es cómo se documenta.",
    familia: "Para familias trabajamos peticiones familiares, estudios de tus hijos y planificación de residencia a largo plazo, normalmente dentro de una estrategia familiar completa.",
    via: "Para eso está la Brújula CLG: cinco preguntas, dos minutos, gratis. Puedo tomar tus datos ahora y el equipo te escribe con una orientación personalizada.",
    abogado: "Perfecto. Tomo tus datos y el equipo te contacta directamente."
  };

  var CAPTURE = [
    { key: "nombre",    q: "¿Cómo te llamas?" },
    { key: "pais",      q: "¿Desde qué país nos escribes?" },
    { key: "objetivo",  q: "En una frase, ¿qué quieres lograr en Estados Unidos?" },
    { key: "email",     q: "¿A qué correo te escribimos?" },
    { key: "whatsapp",  q: "¿Y tu WhatsApp con código de país?" }
  ];
  var capIdx = 0;

  var FAQ = [
    { k: ["precio","costo","cuanto cuesta","cuánto cuesta","honorario","pagar"],
      a: "La Brújula CLG es gratis. La Evaluación CLG cuesta $2,500 USD y se acredita por completo a tu honorario si avanzas. Los rangos por vía están publicados en la página de honorarios." },
    { k: ["tiempo","demora","tarda","meses"],
      a: "Depende de la vía y de tu caso. En la Evaluación CLG recibes un rango realista por escrito, no una cifra genérica." },
    { k: ["que puedo hacer","qué puedo hacer","sin visa","para que sirve","beneficio"],
      a: "Sin visa, Estados Unidos es un lugar que visitas. Con la visa correcta se vuelve un lugar donde tu vida funciona: tu empresa opera, tus hijos estudian, tu pareja trabaja. La página Metas CLG lo explica meta por meta." },
    { k: ["continuidad","renovacion","renovación","ya soy cliente"],
      a: "Eso es Continuidad CLG, la fase que sigue después de la aprobación: renovaciones con calendario, acceso prioritario y tarifas preferentes para tu familia y tu empresa." }
  ];

  function say(text, who) {
    var d = document.createElement("div");
    d.className = "ai-msg " + (who || "bot");
    d.textContent = text;
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
  }
  function setChoices(list) {
    choices.innerHTML = "";
    list.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "ai-choice"; b.type = "button"; b.textContent = c[0];
      b.addEventListener("click", function () { say(c[0], "user"); handle(c[1]); });
      choices.appendChild(b);
    });
  }
  function askNext() {
    if (capIdx < CAPTURE.length) {
      stage = "capture";
      choices.innerHTML = "";
      setTimeout(function () { say(CAPTURE[capIdx].q); }, 350);
    } else {
      stage = "done";
      var msg = "Hola, escribo desde el asistente de la web.\n" +
        "Nombre: " + (lead.nombre || "") + "\nPaís: " + (lead.pais || "") +
        "\nObjetivo: " + (lead.objetivo || "") + "\nEmail: " + (lead.email || "") +
        "\nWhatsApp: " + (lead.whatsapp || "");
      try { localStorage.setItem("clg_chat_lead", JSON.stringify(lead)); } catch (e) {}
      setTimeout(function () {
        say("Gracias, " + (lead.nombre || "").split(" ")[0] + ". Ya tengo lo necesario. Un asesor revisa tu perfil y te contacta.");
        choices.innerHTML =
          '<a class="ai-choice" style="text-align:center;font-weight:700;color:#1F7A4D" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=' +
          CLG.whatsapp + '&text=' + encodeURIComponent(msg) + '">Confirmar ahora por WhatsApp</a>' +
          '<a class="ai-choice" style="text-align:center" href="evaluacion.html">Mientras tanto, hacer la Brújula CLG</a>';
      }, 350);
    }
  }
  function handle(intent) {
    lead.interes = intent;
    setTimeout(function () {
      say(ANSWERS[intent] || ANSWERS.explorar);
      setTimeout(function () {
        say("Para darte una orientación real y no genérica, ¿te tomo unos datos? Son cinco preguntas cortas.");
        setChoices([["Sí, adelante", "__cap"], ["Prefiero solo mirar la web", "__no"]]);
      }, 500);
    }, 350);
  }

  function handleChoiceSpecial(v) {
    if (v === "__cap") { capIdx = 0; askNext(); return true; }
    if (v === "__no") {
      say("Sin problema. Si te sirve, la Brújula CLG te orienta en dos minutos, y estoy aquí si necesitas algo.");
      setChoices(MENU);
      stage = "menu";
      return true;
    }
    return false;
  }
  var origHandle = handle;
  handle = function (v) { if (!handleChoiceSpecial(v)) origHandle(v); };

  var opened = false;
  fab.addEventListener("click", function () {
    panel.classList.toggle("open");
    if (!opened && panel.classList.contains("open")) {
      opened = true;
      say("Hola, soy el asistente de CLG. Puedo orientarte y, si tu caso lo necesita, conectarte con una persona del equipo. ¿Qué buscas?");
      setChoices(MENU);
    }
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { panel.classList.remove("open"); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    say(v, "user");
    input.value = "";

    if (stage === "capture") {
      lead[CAPTURE[capIdx].key] = v;
      capIdx++;
      askNext();
      return;
    }
    var best = null, score = 0;
    var n = v.toLowerCase();
    FAQ.forEach(function (f) {
      var s = 0;
      f.k.forEach(function (kw) { if (n.indexOf(kw) !== -1) s++; });
      if (s > score) { score = s; best = f; }
    });
    setTimeout(function () {
      if (best) {
        say(best.a);
      } else {
        /* Deliberate: no invented legal answers. Route to a human. */
        say("Para responder eso con precisión necesito que lo vea el equipo, porque depende de tu caso. ¿Te tomo tus datos y te contactan?");
        setChoices([["Sí, adelante", "__cap"], ["Prefiero WhatsApp directo", "abogado"]]);
      }
    }, 380);
  });
}

/* ==========================================================================
   CONTACT FORM — autosave + resume
   ========================================================================== */
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var KEY = "clg_contact_draft";
  var fields = form.querySelectorAll("input, select, textarea");
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}

  if (saved && saved.values && Object.keys(saved.values).length) {
    var banner = document.getElementById("resume-banner");
    if (banner) {
      banner.style.display = "block";
      banner.querySelector("[data-resume]").addEventListener("click", function () {
        fields.forEach(function (f) { if (saved.values[f.name] !== undefined) f.value = saved.values[f.name]; });
        banner.style.display = "none";
      });
      banner.querySelector("[data-dismiss]").addEventListener("click", function () { banner.style.display = "none"; });
    }
  }
  fields.forEach(function (f) {
    f.addEventListener("input", function () {
      var v = {};
      fields.forEach(function (x) { if (x.name) v[x.name] = x.value; });
      localStorage.setItem(KEY, JSON.stringify({ values: v, ts: Date.now() }));
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.removeItem(KEY);
    var st = document.getElementById("form-status");
    var nm = form.querySelector("[name=nombre]");
    if (st) {
      st.textContent = "Gracias" + (nm && nm.value ? ", " + nm.value.split(" ")[0] : "") +
        ". Recibimos tu información y un asesor te escribe por WhatsApp o correo.";
      st.classList.add("ok");
    }
    form.reset();
    form.style.display = "none";
    var cta = document.getElementById("form-followup-cta");
    if (cta) cta.style.display = "flex";
  });
}
