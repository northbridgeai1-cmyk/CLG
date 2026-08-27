/* ==========================================================================
   CLG — pop-up and assistant, injected on every page, in both languages
   --------------------------------------------------------------------------
   WHY THIS FILE EXISTS
   Both of these were hand-written into index.html only. Result: the English
   pages had no chat assistant and no pop-up at all, so an English-speaking
   visitor got a worse experience and the firm lost the lead capture. Pasting
   the markup into thirty files would guarantee the same drift that broke the
   nav earlier, so they're built here once and injected.

   Nothing renders if a page already contains the markup, so the existing
   Spanish homepage keeps working unchanged.
   ========================================================================== */

(function () {
  "use strict";

  var EN = /\/en\//.test(window.location.pathname);
  var WA = "17863016264";
  var HOME = EN ? "" : "";
  var LINK = {
    compass:    EN ? "compass.html"            : "evaluacion.html",
    assessment: EN ? "strategy-assessment.html" : "fase1-evaluacion-clg.html",
    goals:      EN ? "goals.html"              : "metas-clg.html",
    fees:       EN ? "fees.html"               : "estrategia-honorarios.html",
    thanks:     EN ? "thank-you.html"          : "gracias.html"
  };

  /* ---------------------------------------------------------------- copy */
  var T = EN ? {
    popTitle: "What will your immigration strategy be?",
    popBody: "Every case is different. Tell us briefly about your situation and our team will point you at the next steps.",
    popCta: "I want to know my strategy",
    popPrivacy: "Confidential. No obligation.",
    popEyebrow: "Before you go",
    popStep2: "Tell us the basics",
    qSituation: "Which best describes your situation?",
    situations: ["Business owner or investor", "Professional", "Family", "Already in the US", "Not sure"],
    qGoal: "What's your main goal?",
    goals: ["Live in the US", "Permanent residency", "Invest or build a business", "Bring my family over", "Explore my options"],
    fWhere: "Where are you right now?",
    fCountry: "Country",
    fName: "Name",
    fWhatsapp: "WhatsApp",
    fEmail: "Email",
    fSend: "Send my details",
    fPrivacy: "Confidential. No obligation. We don't share your details with anyone.",
    chatTitle: "CLG Immigration Assistant",
    chatSub: "Quick answers, or I'll connect you with a person",
    chatPlaceholder: "Type your question...",
    chatSend: "Send",
    close: "Close",
    greeting: "Hi, I'm the CLG assistant. I can point you in a direction and, if your case needs it, connect you with someone on the team. What are you after?",
    menu: [
      ["Explore my options", "explore"],
      ["Business and investment", "business"],
      ["Professional or talent immigration", "talent"],
      ["Family immigration", "family"],
      ["Which route is mine?", "route"],
      ["Speak to an attorney", "attorney"]
    ],
    answers: {
      explore: "Happy to. There are three main doors: investment and business, professional or artistic talent, and family. What decides which one fits isn't the visa, it's your full profile.",
      business: "For owners and investors we design routes like the E-2, L-1 and EB-5, including the business structure and the evidence. We also work with companies already in the US that need to bring talent from abroad.",
      talent: "For professionals, artists and athletes we look at the O-1, EB-1 and EB-2 NIW. Your track record is usually worth more than you'd think; what decides the case is how it's documented.",
      family: "For families we handle family petitions, your children's schooling and long-term residency planning, normally inside one complete strategy.",
      route: "That's exactly what the Brújula CLG is for: five questions, two minutes, free. I can take your details now and the team will come back with a personalised steer.",
      attorney: "Of course. I'll take your details and the team will contact you directly."
    },
    askCapture: "To give you a real steer rather than a generic one, can I take a few details? Five short questions.",
    yes: "Yes, go ahead",
    no: "I'd rather just browse",
    noReply: "No problem. The Brújula CLG gives you a steer in two minutes if that helps, and I'm here if you need anything.",
    capture: [
      { key: "name",     q: "What's your name?" },
      { key: "country",  q: "Which country are you writing from?" },
      { key: "goal",     q: "In one line, what do you want to achieve in the United States?" },
      { key: "email",    q: "What email should we use?" },
      { key: "whatsapp", q: "And your WhatsApp, with country code?" }
    ],
    done: function (n) { return "Thanks" + (n ? ", " + n.split(" ")[0] : "") + ". That's everything I need. An advisor will review your profile and get in touch."; },
    confirmWa: "Confirm now on WhatsApp",
    meanwhile: "Meanwhile, try the Brújula CLG",
    fallback: "To answer that properly I'd need someone on the team to look at it, because it depends on your case. Shall I take your details so they can reach you?",
    preferWa: "I'd rather use WhatsApp",
    faq: [
      { k: ["price","cost","fee","how much","pay"],
        a: "The Brújula CLG is free. The CLG Assessment is $2,500 USD and is credited in full against your legal fee if you go ahead. Ranges by route are published on the fees page." },
      { k: ["how long","time","take","months"],
        a: "It depends on the route and your case. Your CLG Assessment gives you a realistic range in writing rather than a generic figure." },
      { k: ["what can i do","without a visa","why do i need"],
        a: "Without a visa the US is a place you visit. With the right one it becomes a place where your life works: your company operates, your children study, your spouse works. The Goals page covers it goal by goal." },
      { k: ["continuity","renewal","already a client"],
        a: "That's Continuidad CLG, the phase after approval: renewals on a calendar, priority access and preferential rates for your family and your company." }
    ]
  } : {
    popTitle: "¿Cuál será tu estrategia migratoria?",
    popBody: "Cada caso es diferente. Cuéntanos brevemente tu situación y nuestro equipo te orienta sobre los próximos pasos.",
    popCta: "Quiero conocer mi estrategia",
    popPrivacy: "Información confidencial. Sin compromiso.",
    popEyebrow: "Antes de que te vayas",
    popStep2: "Cuéntanos lo básico",
    qSituation: "¿Cuál describe mejor tu situación?",
    situations: ["Empresario o inversionista", "Profesional", "Familia", "Ya estoy en EE.UU.", "No estoy seguro"],
    qGoal: "¿Cuál es tu principal objetivo?",
    goals: ["Vivir en EE.UU.", "Residencia permanente", "Invertir o desarrollar un negocio", "Reunificar a mi familia", "Explorar mis opciones"],
    fWhere: "¿Dónde te encuentras actualmente?",
    fCountry: "País",
    fName: "Nombre",
    fWhatsapp: "WhatsApp",
    fEmail: "Correo electrónico",
    fSend: "Enviar mi información",
    fPrivacy: "Información confidencial. Sin compromiso. No compartimos tus datos con terceros.",
    chatTitle: "Asistente CLG",
    chatSub: "Respuestas rápidas, o te conecto con una persona",
    chatPlaceholder: "Escribe tu pregunta...",
    chatSend: "Enviar",
    close: "Cerrar",
    greeting: "Hola, soy el asistente de CLG. Puedo orientarte y, si tu caso lo necesita, conectarte con una persona del equipo. ¿Qué buscas?",
    menu: [
      ["Explorar mis opciones", "explore"],
      ["Negocios e inversión", "business"],
      ["Inmigración profesional o de talento", "talent"],
      ["Inmigración familiar", "family"],
      ["¿Cuál vía me corresponde?", "route"],
      ["Hablar con un abogado", "attorney"]
    ],
    answers: {
      explore: "Con gusto. Hay tres puertas principales: inversión y negocios, talento profesional o artístico, y familia. Lo que define cuál te sirve no es la visa, es tu perfil completo.",
      business: "Para empresarios e inversionistas diseñamos rutas como E-2, L-1 y EB-5, incluyendo la estructura del negocio y la evidencia. También trabajamos con empresas ya establecidas en EE.UU. que necesitan traer talento del exterior.",
      talent: "Para profesionales, artistas y deportistas evaluamos O-1, EB-1 y EB-2 NIW. Tu trayectoria suele valer más de lo que crees; lo que decide el caso es cómo se documenta.",
      family: "Para familias trabajamos peticiones familiares, estudios de tus hijos y planificación de residencia a largo plazo, normalmente dentro de una estrategia completa.",
      route: "Para eso está la Brújula CLG: cinco preguntas, dos minutos, gratis. Puedo tomar tus datos ahora y el equipo te escribe con una orientación personalizada.",
      attorney: "Perfecto. Tomo tus datos y el equipo te contacta directamente."
    },
    askCapture: "Para darte una orientación real y no genérica, ¿te tomo unos datos? Son cinco preguntas cortas.",
    yes: "Sí, adelante",
    no: "Prefiero solo mirar",
    noReply: "Sin problema. Si te sirve, la Brújula CLG te orienta en dos minutos, y estoy aquí si necesitas algo.",
    capture: [
      { key: "name",     q: "¿Cómo te llamas?" },
      { key: "country",  q: "¿Desde qué país nos escribes?" },
      { key: "goal",     q: "En una frase, ¿qué quieres lograr en Estados Unidos?" },
      { key: "email",    q: "¿A qué correo te escribimos?" },
      { key: "whatsapp", q: "¿Y tu WhatsApp con código de país?" }
    ],
    done: function (n) { return "Gracias" + (n ? ", " + n.split(" ")[0] : "") + ". Ya tengo lo necesario. Un asesor revisa tu perfil y te contacta."; },
    confirmWa: "Confirmar ahora por WhatsApp",
    meanwhile: "Mientras tanto, hacer la Brújula CLG",
    fallback: "Para responder eso con precisión necesito que lo vea el equipo, porque depende de tu caso. ¿Te tomo tus datos y te contactan?",
    preferWa: "Prefiero WhatsApp directo",
    faq: [
      { k: ["precio","costo","cuanto cuesta","cuánto cuesta","honorario","pagar"],
        a: "La Brújula CLG es gratis. La Evaluación CLG cuesta $2,500 USD y se acredita por completo a tu honorario si avanzas. Los rangos por vía están publicados en la página de honorarios." },
      { k: ["cuanto tiempo","cuánto tiempo","demora","tarda","meses"],
        a: "Depende de la vía y de tu caso. En tu Evaluación CLG recibes un rango realista por escrito, no una cifra genérica." },
      { k: ["que puedo hacer","qué puedo hacer","sin visa","para que sirve"],
        a: "Sin visa, Estados Unidos es un lugar que visitas. Con la visa correcta se vuelve un lugar donde tu vida funciona: tu empresa opera, tus hijos estudian, tu pareja trabaja. La página Metas CLG lo explica meta por meta." },
      { k: ["continuidad","renovacion","renovación","ya soy cliente"],
        a: "Eso es Continuidad CLG, la fase que sigue después de la aprobación: renovaciones con calendario, acceso prioritario y tarifas preferentes para tu familia y tu empresa." }
    ]
  };

  var WA_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.87.5 3.62 1.4 5.13L2 22l5.02-1.36A9.95 9.95 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm5.9 14.24c-.25.7-1.45 1.34-2 1.42-.53.08-1.2.11-1.94-.12-.45-.14-1.02-.33-1.76-.65-3.1-1.34-5.12-4.46-5.28-4.67-.15-.21-1.26-1.68-1.26-3.2s.79-2.28 1.07-2.59c.28-.31.6-.38.8-.38h.58c.19 0 .44-.07.68.53.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.09.2-.14.33-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.15.28.68 1.15 1.47 1.87 1.01.93 1.87 1.22 2.15 1.36.28.14.44.12.6-.07.17-.2.71-.85.9-1.14.19-.29.38-.24.63-.14.25.09 1.6.78 1.87.92.28.14.46.21.53.33.07.12.07.68-.18 1.38Z"/></svg>';
  var CHAT_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.9 3 3 6.5 3 10.8c0 2.4 1.2 4.5 3.2 5.9v3.6l3.4-1.9c.8.2 1.6.3 2.4.3 5.1 0 9-3.5 9-7.9S17.1 3 12 3Z"/><circle cx="8.4" cy="10.8" r="1.05" fill="#0f1e33"/><circle cx="12" cy="10.8" r="1.05" fill="#0f1e33"/><circle cx="15.6" cy="10.8" r="1.05" fill="#0f1e33"/></svg>';

  function chips(id, items) {
    return '<div class="choice-row" id="' + id + '">' +
      items.map(function (t) { return '<span class="choice">' + t + '</span>'; }).join("") + "</div>";
  }

  /* ------------------------------------------------------------- inject */
  function injectPopup() {
    if (document.getElementById("clg-popup")) return;
    var d = document.createElement("div");
    d.className = "popup-overlay";
    d.id = "clg-popup";
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-modal", "true");
    d.innerHTML =
      '<div class="popup">' +
        '<button class="popup-close" data-popup-close aria-label="' + T.close + '">&times;</button>' +
        '<div id="popup-step-1">' +
          '<div class="eyebrow">' + T.popEyebrow + '</div>' +
          '<h3>' + T.popTitle + '</h3>' +
          '<p style="color:var(--ink-soft);">' + T.popBody + '</p>' +
          '<button class="btn btn-primary btn-block" id="popup-go">' + T.popCta + '</button>' +
          '<p class="privacy">' + T.popPrivacy + '</p>' +
        '</div>' +
        '<div id="popup-step-2" style="display:none;">' +
          '<h3 style="font-size:1.4rem;">' + T.popStep2 + '</h3>' +
          '<form id="popup-form">' +
            '<div class="form-field"><label>' + T.qSituation + '</label>' + chips("popup-situacion", T.situations) + '</div>' +
            '<div class="form-field"><label>' + T.qGoal + '</label>' + chips("popup-objetivo", T.goals) + '</div>' +
            '<div class="form-field"><label for="pp-pais">' + T.fWhere + '</label><input id="pp-pais" name="pais" type="text" placeholder="' + T.fCountry + '" required></div>' +
            '<div class="form-row">' +
              '<div class="form-field"><label for="pp-nombre">' + T.fName + '</label><input id="pp-nombre" name="nombre" type="text" required></div>' +
              '<div class="form-field"><label for="pp-wa">' + T.fWhatsapp + '</label><input id="pp-wa" name="whatsapp" type="tel" required></div>' +
            '</div>' +
            '<div class="form-field"><label for="pp-email">' + T.fEmail + '</label><input id="pp-email" name="email" type="email" required></div>' +
            '<button type="submit" class="btn btn-primary btn-block">' + T.fSend + '</button>' +
            '<p class="privacy">' + T.fPrivacy + '</p>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d);
  }

  function injectAssistant() {
    if (document.getElementById("ai-fab")) return;
    var wrap = document.querySelector(".ai-widget-launcher");
    var existingWa = wrap && wrap.querySelector(".wa-fab");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "ai-widget-launcher";
      document.body.appendChild(wrap);
    }

    var panel = document.createElement("div");
    panel.className = "ai-panel";
    panel.id = "ai-panel";
    panel.innerHTML =
      '<div class="ai-panel-head">' +
        '<div><strong>' + T.chatTitle + '</strong><span>' + T.chatSub + '</span></div>' +
        '<button class="ai-close" id="ai-close" aria-label="' + T.close + '">&times;</button>' +
      '</div>' +
      '<div class="ai-messages" id="ai-messages"></div>' +
      '<div class="ai-choices" id="ai-choices"></div>' +
      '<form class="ai-input-row" id="ai-input-form">' +
        '<input type="text" id="ai-input" placeholder="' + T.chatPlaceholder + '" autocomplete="off">' +
        '<button type="submit">' + T.chatSend + '</button>' +
      '</form>';

    var fab = document.createElement("button");
    fab.className = "ai-fab";
    fab.id = "ai-fab";
    fab.setAttribute("aria-label", T.chatTitle);
    fab.innerHTML = CHAT_ICON;

    wrap.insertBefore(panel, wrap.firstChild);
    if (existingWa) wrap.insertBefore(fab, existingWa);
    else {
      wrap.appendChild(fab);
      var wa = document.createElement("a");
      wa.className = "wa-fab";
      wa.setAttribute("aria-label", "WhatsApp");
      wa.setAttribute("data-wa-link", EN ? "Hi, I'd like to talk about my immigration strategy." : "Hola, quiero conocer mi estrategia migratoria.");
      wa.innerHTML = WA_ICON;
      wrap.appendChild(wa);
    }
  }

  window.CLG_WIDGETS = { T: T, LINK: LINK, WA: WA, EN: EN };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { injectPopup(); injectAssistant(); });
  } else { injectPopup(); injectAssistant(); }
})();
