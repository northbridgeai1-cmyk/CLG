/* ==========================================================================
   Brújula CLG — the ONE unified free assessment (5 questions).
   Same question set as the Fase 1 embedded quiz. Ends pointing at Fase 1.
   Optional email capture, tagged quiz-inversion / quiz-talento / quiz-familia.
   Country selector on result → real client testimonial (video where we have it).
   ========================================================================== */

(function () {
  var root = document.getElementById("quiz-root");
  if (!root) return;

  var WHATSAPP = "17863016264";

  /* One quiz, two languages. A page inside /en/ gets the English copy and
     the English destinations. Keeps the logic in a single file instead of
     forking it, which is how the nav drifted out of sync earlier. */
  var EN = /\/en\//.test(window.location.pathname);
  var FASE1_URL = EN ? "strategy-assessment.html" : "fase1-evaluacion-clg.html";

  var T = EN ? {
    qOf: function (a, b) { return "Question " + a + " of " + b; },
    back: "Back",
    lastStep: "Last step",
    whereSend: "Where should we send your personalized report?",
    whySend: "With this, a CLG advisor can follow up with your result and answer your specific questions.",
    fullName: "Full name",
    email: "Email address",
    whatsapp: "WhatsApp (with country code)",
    seeResult: "See my result",
    badge: "Your Brújula CLG points here",
    routesLabel: "Routes usually considered for this profile: ",
    fromWhere: "Where are you from? We'll show you someone who started where you are:",
    selectCountry: "Select your country",
    otherCountry: "Another country",
    optional: "Optional:",
    optionalCopy: " we'll email you your result plus the CLG 2026 Guide.",
    sendMe: "Send it to me",
    continueCta: "Continue to my CLG Assessment →",
    seeRoute: "See this route in detail",
    disclaimer: "This result is a pointer, not a legal opinion. Your actual strategy gets designed person by person in your CLG Assessment.",
    emailDone: function (link) {
      return 'Got it. To make sure it reaches you while we finish switching on automatic delivery, confirm in one click: ' + link + '.';
    },
    emailLinkText: "send my result via WhatsApp",
    restart: "Start over"
  } : {
    qOf: function (a, b) { return "Pregunta " + a + " de " + b; },
    back: "Atrás",
    lastStep: "Último paso",
    whereSend: "¿A dónde enviamos tu reporte personalizado?",
    whySend: "Con esto, un asesor de CLG puede darte seguimiento con tu resultado y responder tus preguntas específicas.",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    whatsapp: "WhatsApp (con código de país)",
    seeResult: "Ver mi resultado",
    badge: "Tu Brújula CLG apunta",
    routesLabel: "Rutas que normalmente se evalúan para este perfil: ",
    fromWhere: "¿De dónde eres? Te mostramos a alguien que empezó donde tú estás:",
    selectCountry: "Selecciona tu país",
    otherCountry: "Otro país",
    optional: "Opcional:",
    optionalCopy: " te enviamos tu resultado y la Guía CLG 2026 a tu correo.",
    sendMe: "Enviármelo",
    continueCta: "Continuar a mi Evaluación CLG →",
    seeRoute: "Ver esta vía en detalle",
    disclaimer: "Este resultado es orientativo. Tu estrategia real se diseña persona a persona en tu Evaluación CLG.",
    emailDone: function (link) {
      return 'Listo. Para asegurar la entrega mientras activamos el envío automático, confírmalo en un clic: ' + link + '.';
    },
    emailLinkText: "enviar mi resultado por WhatsApp",
    restart: "Volver a empezar"
  };

  /* TODO(CLG): confirm which YouTube ID corresponds to which client before
     launch. Colombia is currently mapped to the video used on the old
     services page (assumed Gustavo). Add more IDs as testimonial videos are
     published on the channel. */
  var COUNTRY_PROOF = {
    colombia:  { video: "xRnHOhXaG4w", quote: "Gracias a la asesoría de CLG compramos nuestro negocio y nos tiene viviendo de una manera cómoda en Estados Unidos.", who: "Javier O. · Colombia · Visa E-2" },
    argentina: { video: null, quote: "Tuve la suerte de contar con Renata y su equipo. Me sacaron del 75% de mis dudas en la primera reunión.", who: "Leandro C. · Argentina · Visa E-2" },
    peru:      { video: null, quote: "Se pusieron la camiseta de mi familia para lograr el objetivo, de forma legal y planificada.", who: "Giancarlos C. · Perú · Visa L-1" },
    ecuador:   { video: null, quote: "No solo se basan en una reunión: ven todo el espectro, y cuando llegamos a Estados Unidos nos guiaron al siguiente paso.", who: "Claudia y Diego · Ecuador · Residencia Permanente" },
    otro:      { video: "c7Ax1yagoyY", quote: "I am very grateful with CLG. Thanks to them I am now living as a U.S. citizen based on my art.", who: "Shiro · Japón · Visa O y Residencia Permanente" }
  };

  var QUESTIONS = EN ? [
    { q: "Which best describes your situation today?", opts: [
      ["I have capital to invest, or my own business", "inv"],
      ["I'm a professional, artist or athlete with a track record", "pro"],
      ["I have family who are US citizens or residents", "fam"],
      ["My children want to study in the United States", "fam"]]},
    { q: "If your route were investment, what kind of capital are we talking about?", opts: [
      ["More than USD 150,000", "inv"],
      ["Between USD 50,000 and 150,000", "inv"],
      ["I'd rather not invest capital", "pro"],
      ["I don't know yet", "neutro"]]},
    { q: "How many years of experience do you have in your field?", opts: [
      ["More than 10 years", "pro"],
      ["Between 5 and 10 years", "pro"],
      ["Less than 5 years", "neutro"],
      ["My strength is capital, not track record", "inv"]]},
    { q: "Who would be coming with you?", opts: [
      ["Just me", "neutro"],
      ["My partner", "neutro"],
      ["My family, with children under 21", "fam"],
      ["The whole family, including adult children", "fam"]]},
    { q: "Have you already spoken to an immigration attorney about your case?", opts: [
      ["No, this would be the first", "primera"],
      ["Yes, one. I want a full second look", "segunda"],
      ["Yes, more than one, and I got different answers", "distintas"],
      ["I'd rather prepare before speaking to anyone", "prepararme"]]}
  ] : [
    { q: "¿Cuál describe mejor tu situación hoy?", opts: [
      ["Tengo capital para invertir o un negocio propio", "inv"],
      ["Soy profesional, artista o deportista con trayectoria", "pro"],
      ["Tengo familiares ciudadanos o residentes en EE. UU.", "fam"],
      ["Mis hijos quieren estudiar en Estados Unidos", "fam"]]},
    { q: "Si tu vía fuera la inversión, ¿de qué capital hablamos?", opts: [
      ["Más de USD 150,000", "inv"],
      ["Entre USD 50,000 y 150,000", "inv"],
      ["Prefiero no invertir capital", "pro"],
      ["Aún no lo sé", "neutro"]]},
    { q: "¿Cuántos años de experiencia tienes en tu profesión o industria?", opts: [
      ["Más de 10 años", "pro"],
      ["Entre 5 y 10 años", "pro"],
      ["Menos de 5 años", "neutro"],
      ["Mi fortaleza es el capital, no la trayectoria", "inv"]]},
    { q: "¿Quiénes viajarían contigo?", opts: [
      ["Solo yo", "neutro"],
      ["Mi pareja", "neutro"],
      ["Mi familia con hijos menores de 21", "fam"],
      ["Toda la familia, incluidos hijos mayores", "fam"]]},
    { q: "¿Ya hablaste con algún abogado de inmigración sobre tu caso?", opts: [
      ["No, este sería el primero", "primera"],
      ["Sí, con uno — quiero una segunda mirada completa", "segunda"],
      ["Sí, con más de uno, y me dieron respuestas distintas", "distintas"],
      ["Prefiero prepararme antes de hablar con alguien", "prepararme"]]}
  ];

  var RESULTADOS = EN ? {
    inv: { titulo: "Your profile points to the investment door", tag: "quiz-inversion",
      visas: ["E-2 visa", "L-1 visa", "EB-5"],
      texto: "With capital available or a business of your own, investment routes are usually the most direct path, and your family can come with you.",
      link: "business-owners.html" },
    pro: { titulo: "Your profile points to the talent door", tag: "quiz-talento",
      visas: ["O-1 visa", "EB-2 NIW", "EB-1"],
      texto: "Your professional, artistic or athletic track record may be worth more to immigration than you think. What decides it is how it gets documented.",
      link: "professionals.html" },
    fam: { titulo: "Your profile points to the family door", tag: "quiz-familia",
      visas: ["Family petition", "Full family strategy"],
      texto: "Family ties, or your children's education plans, can be the foundation of a strategy for the whole household.",
      link: "families.html" }
  } : {
    inv: { titulo: "Tu perfil apunta a la puerta de la inversión", tag: "quiz-inversion",
      visas: ["Visa E-2", "Visa L-1", "EB-5"],
      texto: "Con capital disponible o un negocio propio, las vías de inversión suelen ser el camino más directo, y tu familia puede acompañarte.",
      link: "estrategias-empresarios.html" },
    pro: { titulo: "Tu perfil apunta a la puerta del talento", tag: "quiz-talento",
      visas: ["Visa O-1", "EB-2 NIW", "EB-1"],
      texto: "Tu trayectoria profesional, artística o deportiva puede valer más de lo que crees frente a inmigración. La clave está en cómo se documenta.",
      link: "estrategias-profesionales.html" },
    fam: { titulo: "Tu perfil apunta a la puerta familiar", tag: "quiz-familia",
      visas: ["Reunificación familiar", "Estrategia familiar completa"],
      texto: "Los vínculos familiares, o el proyecto de estudios de tus hijos, pueden ser la base de una estrategia para toda la familia.",
      link: "estrategias-familias.html" }
  };

  var NOTA_PREVIA = EN ? {
    primera: "Since this would be your first conversation with an immigration attorney, your CLG Assessment starts from scratch, with nothing to undo first.",
    segunda: "Since you've already spoken to an attorney, the CLG Assessment is built for exactly this: a full second look, in writing.",
    distintas: "Since you've already been given different answers, we start with a complete review of the file rather than one more opinion.",
    prepararme: "The CLG Assessment is that preparation. You leave with a written report, not more questions."
  } : {
    primera: "Como sería tu primera conversación con un abogado de inmigración, tu Evaluación CLG arranca desde cero, sin nada que corregir primero.",
    segunda: "Como ya hablaste con un abogado, tu Evaluación CLG está pensada exactamente para esto: una segunda mirada completa, por escrito.",
    distintas: "Como ya te dieron respuestas distintas, empezamos con un análisis completo del expediente, no con una opinión más.",
    prepararme: "Tu Evaluación CLG es justo esa preparación: sales con un reporte por escrito, no con más preguntas."
  };

  var paso = 0, votos = { inv: 0, pro: 0, fam: 0 }, contextoPrevio = "primera";

  function render() {
    root.innerHTML = "";
    var progress = document.createElement("div");
    progress.className = "quiz-progress";
    var fill = document.createElement("span");
    fill.style.width = Math.round((paso / QUESTIONS.length) * 100) + "%";
    progress.appendChild(fill);
    root.appendChild(progress);
    if (paso < QUESTIONS.length) renderQuestion(); else renderResult();
  }

  function renderQuestion() {
    var p = QUESTIONS[paso];
    var wrap = document.createElement("div");
    wrap.className = "quiz-step active";
    var num = document.createElement("div");
    num.className = "q-num";
    num.textContent = T.qOf(paso + 1, QUESTIONS.length);
    wrap.appendChild(num);
    var h = document.createElement("h3");
    h.textContent = p.q;
    wrap.appendChild(h);
    var opts = document.createElement("div");
    opts.className = "quiz-options";
    p.opts.forEach(function (o) {
      var btn = document.createElement("div");
      btn.className = "quiz-option";
      btn.textContent = o[0];
      btn.addEventListener("click", function () {
        if (paso < 4) { if (o[1] !== "neutro") votos[o[1]]++; }
        else contextoPrevio = o[1];
        paso++; render();
      });
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);
    if (paso > 0) {
      var back = document.createElement("button");
      back.className = "btn btn-ghost"; back.type = "button"; back.textContent = T.back;
      back.addEventListener("click", function () { paso--; render(); });
      wrap.appendChild(back);
    }
    root.appendChild(wrap);
  }

  function renderResult() {
    var ganador = Object.keys(votos).sort(function (a, b) { return votos[b] - votos[a]; })[0];
    if (votos[ganador] === 0) ganador = "fam";
    var r = RESULTADOS[ganador];
    var nota = NOTA_PREVIA[contextoPrevio] || "";

    var wrap = document.createElement("div");
    wrap.className = "quiz-result active";
    wrap.innerHTML =
      '<span class="result-badge strong">' + T.badge + '</span>' +
      '<h3>' + r.titulo + '</h3>' +
      r.visas.map(function (v) { return '<span class="badge-list-pill">' + v + '</span>'; }).join(" ") +
      '<p style="color:var(--ink-soft);margin-top:14px;">' + r.texto + ' ' + nota + '</p>' +

      /* Country → real proof */
      '<div class="form-field" style="margin-top:22px;"><label for="brujula-pais">' + T.fromWhere + '</label>' +
      '<select id="brujula-pais"><option value="">' + T.selectCountry + '</option>' +
      '<option value="colombia">Colombia</option><option value="argentina">Argentina</option>' +
      '<option value="peru">Perú</option><option value="ecuador">Ecuador</option>' +
      '<option value="otro">' + T.otherCountry + '</option></select></div>' +
      '<div id="proof-slot"></div>' +

      /* Captura de correo — OPCIONAL, nunca bloquea el CTA a Fase 1.
         TODO(CLG): conectar este campo al formulario/automatización de
         systeme.io para el tagging real en CRM (quiz-inversion / quiz-talento
         / quiz-familia) y el envío de la Guía CLG 2026. */
      '<div class="callout" style="margin-top:22px;">' +
      '<strong>' + T.optional + '</strong>' + T.optionalCopy +
      '<form id="brujula-email-form" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;">' +
      '<input type="email" id="brujula-email" placeholder="you@email.com" style="flex:1;min-width:200px;padding:11px 12px;border:1px solid var(--line);border-radius:2px;font-family:var(--sans);">' +
      '<button type="submit" class="btn btn-ghost" style="padding:10px 18px;">' + T.sendMe + '</button></form>' +
      '<p id="brujula-email-status" style="font-size:0.8rem;color:var(--ink-soft);margin:8px 0 0;"></p></div>' +

      /* Primary CTA: Phase 1 */
      '<div class="hero-actions" style="margin-top:26px;">' +
      '<a class="btn btn-primary btn-lg" href="' + FASE1_URL + '">' + T.continueCta + '</a>' +
      '<a class="btn btn-ghost" href="' + r.link + '">' + T.seeRoute + '</a></div>' +
      '<p style="font-size:0.8rem;color:var(--ink-soft);margin-top:14px;">' + T.disclaimer + '</p>';

    root.appendChild(wrap);

    /* país → video/testimonio */
    var paisSel = document.getElementById("brujula-pais");
    var slot = document.getElementById("proof-slot");
    paisSel.addEventListener("change", function () {
      var proof = COUNTRY_PROOF[paisSel.value];
      if (!proof) { slot.innerHTML = ""; return; }
      var html = "";
      if (proof.video) {
        html += '<div class="video-wrap" style="margin-top:14px;"><iframe src="https://www.youtube.com/embed/' + proof.video + '" title="Historia real de un cliente CLG" loading="lazy" allowfullscreen></iframe></div>';
      }
      html += '<p class="testi-quote" style="margin-top:12px;">"' + proof.quote + '"</p><p style="font-size:0.82rem;color:var(--ink-soft);">— ' + proof.who + '</p>';
      slot.innerHTML = html;
    });

    /* captura de correo con tag de segmento */
    var emailForm = document.getElementById("brujula-email-form");
    emailForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("brujula-email").value.trim();
      var status = document.getElementById("brujula-email-status");
      if (!email) return;
      try {
        localStorage.setItem("brujula_capture", JSON.stringify({ email: email, tag: r.tag, ts: Date.now() }));
      } catch (err) {}
      /* Static-site handoff: pre-filled WhatsApp message carries the tag so
         the team can register it in CRM until the systeme.io form is wired. */
      status.innerHTML = 'Listo. Para asegurar la entrega mientras activamos el envío automático, confírmalo en un clic: <a target="_blank" rel="noopener" style="font-weight:700;color:var(--gold-deep);" href="https://api.whatsapp.com/send?phone=' + WHATSAPP + '&text=' + encodeURIComponent("Hola, complete la Brújula CLG. Mi correo: " + email + " · Resultado: " + r.titulo + " · Tag: " + r.tag + " · Quiero recibir la Guía CLG 2026.") + '">enviar mi resultado por WhatsApp</a>.';
    });
  }

  render();
})();
