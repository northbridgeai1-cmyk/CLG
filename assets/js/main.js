/* ==========================================================================
   Calderaro Law Group — shared site behavior
   Mobile nav, WhatsApp FAB, AI assistant widget, contact-form autosave
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- Mobile nav ---------------- */
  var toggle = document.querySelector(".mobile-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---------------- WhatsApp FAB ---------------- */
  var WHATSAPP_NUMBER = "17863016264";
  document.querySelectorAll("[data-wa-link]").forEach(function (el) {
    var msg = el.getAttribute("data-wa-link") || "Hola, me gustaria conocer mas sobre las estrategias migratorias de CLG.";
    el.href = "https://api.whatsapp.com/send?phone=" + WHATSAPP_NUMBER + "&text=" + encodeURIComponent(msg);
    el.target = "_blank";
    el.rel = "noopener";
  });

  /* ---------------- Contact form autosave + "welcome back" ---------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var STORAGE_KEY = "clg_contact_draft";
    var fields = form.querySelectorAll("input, select, textarea");

    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (e) {}

    if (saved && saved.values && Object.keys(saved.values).length) {
      var banner = document.getElementById("resume-banner");
      if (banner) {
        banner.style.display = "block";
        banner.querySelector("[data-resume]").addEventListener("click", function () {
          fields.forEach(function (f) {
            if (saved.values[f.name] !== undefined) f.value = saved.values[f.name];
          });
          banner.style.display = "none";
        });
        banner.querySelector("[data-dismiss]").addEventListener("click", function () {
          banner.style.display = "none";
        });
      }
    }

    var saveDraft = function () {
      var values = {};
      fields.forEach(function (f) { if (f.name) values[f.name] = f.value; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values: values, ts: Date.now() }));
    };
    fields.forEach(function (f) { f.addEventListener("input", saveDraft); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.removeItem(STORAGE_KEY);
      var status = document.getElementById("form-status");
      var name = form.querySelector("[name=nombre]");
      var email = form.querySelector("[name=email]");
      if (status) {
        status.textContent = "Gracias" + (name && name.value ? ", " + name.value.split(" ")[0] : "") + ". Recibimos tu informacion — un asesor te escribira por WhatsApp o correo dentro de las proximas horas. Si prefieres, escribenos ahora mismo por WhatsApp.";
        status.classList.add("ok");
      }
      form.reset();
      form.style.display = "none";
      var cta = document.getElementById("form-followup-cta");
      if (cta) cta.style.display = "flex";
    });
  }

  /* ---------------- Newsletter / subscribe forms (footer) ---------------- */
  document.querySelectorAll("[data-subscribe-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = f.querySelector("[data-subscribe-status]");
      if (msg) msg.textContent = "Listo — revisa tu correo para confirmar tu suscripcion.";
    });
  });

  /* ---------------- AI assistant widget ---------------- */
  initAssistant();
});

/* ==========================================================================
   Lightweight on-site assistant.
   Rule-based against CLG's real FAQ / positioning content — runs entirely
   client-side, no data leaves the browser. Escalates anything it can't
   answer confidently straight to a human on WhatsApp.
   ========================================================================== */
function initAssistant() {
  var launcher = document.getElementById("ai-fab");
  var panel = document.getElementById("ai-panel");
  var closeBtn = document.getElementById("ai-close");
  var messages = document.getElementById("ai-messages");
  var inputForm = document.getElementById("ai-input-form");
  var input = document.getElementById("ai-input");
  var suggestions = document.getElementById("ai-suggestions");

  if (!launcher || !panel) return;

  var KB = [
    {
      k: ["visa", "que ofrecen", "que hacen", "servicio"],
      a: "CLG no vende visas ni residencias: disenamos la estrategia migratoria completa para tu caso — profesional, inversionista o familiar — y te acompanamos en cada paso legal para llegar a ella. ¿Cual describe mejor tu situacion: negocio/inversion, carrera profesional, o familia?"
    },
    {
      k: ["negocio", "invertir", "inversion", "empresa", "e2", "e-2", "eb5", "eb-5", "l1", "l-1"],
      a: "Para empresarios e inversionistas trabajamos rutas como E-2, L-1 y EB-5, estructurando el negocio, el capital y la evidencia desde el inicio. Puedes ver el detalle en la pagina de Empresarios e Inversionistas, o hacer la evaluacion gratuita de 3 minutos."
    },
    {
      k: ["profesional", "trabajo", "empleo", "eb2", "eb-2", "niw", "eb1", "eb-1", "o1", "o-1", "artista", "deportista"],
      a: "Para profesionales, artistas y talento destacado evaluamos rutas como EB-2 NIW, EB-1 y O-1. La mejor forma de saber cual aplica a tu perfil es la evaluacion gratuita — toma 3 minutos."
    },
    {
      k: ["familia", "hijos", "esposa", "esposo", "conyuge", "reunificacion", "loteria", "residencia"],
      a: "Para familias trabajamos peticiones familiares, planificacion de residencia a largo plazo y la loteria de visas cuando aplica. Puedes ver mas en la pagina de Familias y Planificacion."
    },
    {
      k: ["precio", "costo", "cuanto cuesta", "honorario", "fee", "pagar"],
      a: "Publicamos rangos reales por tipo de visa en la pagina de Estrategia y Honorarios — sin sorpresas. El primer paso siempre es la Evaluacion CLG, que se descuenta por completo si avanzas con nosotros."
    },
    {
      k: ["cuanto tiempo", "tiempo", "demora", "cuanto tarda", "meses"],
      a: "El tiempo varia segun la via migratoria y tu caso especifico — lo mas honesto es revisarlo en tu evaluacion gratuita, donde te damos un rango realista por escrito."
    },
    {
      k: ["whatsapp", "llamar", "hablar", "contacto", "telefono", "asesor", "humano", "persona"],
      a: "Con gusto — puedes escribirnos directo por WhatsApp y un asesor te responde. Toca el boton verde abajo a la derecha."
    },
    {
      k: ["evaluacion", "calificar", "aplico", "elegible", "cumplo", "test", "cuestionario"],
      a: "Esa es justo la Evaluacion CLG: 7 preguntas, 3 minutos, y te decimos honestamente donde estas parado. ¿Quieres que te lleve a empezarla?"
    },
    {
      k: ["mexico", "argentina", "colombia", "ecuador", "chile", "bolivia", "peru", "latinoamerica"],
      a: "Trabajamos activamente con clientes de Mexico, Argentina, Colombia, Ecuador, Bolivia, Chile y Peru, incluyendo charlas presenciales en varios de estos paises. Tu proceso puede iniciar por WhatsApp o video llamada, sin necesidad de viajar primero."
    },
    {
      k: ["renata", "abogada", "quien", "equipo"],
      a: "Renata Calderaro es la CEO de Calderaro Law Group, con casi dos decadas de experiencia en estrategia migratoria. Puedes conocer a todo el equipo en la pagina Nosotros."
    }
  ];

  var GREETING = "Hola, soy el asistente de CLG. Puedo orientarte sobre visas de negocio, profesionales o familiares, honorarios y tiempos — y si tu caso necesita a un humano, te conecto directo por WhatsApp. ¿En que te ayudo?";
  var FALLBACK = "Buena pregunta — para darte una respuesta exacta y responsable, lo mejor es que la revise el equipo directamente. Puedo conectarte ahora por WhatsApp, o si prefieres, empieza la evaluacion gratuita y un asesor te escribe con tu resultado.";

  function addMsg(text, who) {
    var div = document.createElement("div");
    div.className = "ai-msg " + who;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function respond(text) {
    var norm = text.toLowerCase();
    var best = null;
    var bestScore = 0;
    KB.forEach(function (entry) {
      var score = 0;
      entry.k.forEach(function (kw) { if (norm.indexOf(kw) !== -1) score++; });
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    setTimeout(function () {
      addMsg(best ? best.a : FALLBACK, "bot");
    }, 380);
  }

  var opened = false;
  launcher.addEventListener("click", function () {
    panel.classList.toggle("open");
    if (!opened && panel.classList.contains("open")) {
      addMsg(GREETING, "bot");
      opened = true;
    }
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { panel.classList.remove("open"); });

  if (suggestions) {
    suggestions.querySelectorAll(".ai-suggestion").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var q = btn.textContent;
        addMsg(q, "user");
        respond(q);
      });
    });
  }

  if (inputForm) {
    inputForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = input.value.trim();
      if (!val) return;
      addMsg(val, "user");
      respond(val);
      input.value = "";
    });
  }
}
