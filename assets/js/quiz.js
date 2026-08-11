/* ==========================================================================
   Evaluacion CLG — client-side eligibility & strategy scorecard.
   7 questions -> personalized pathway read + strength tier.
   No data leaves the browser except what the visitor explicitly sends
   via the WhatsApp / email hand-off buttons on the result screen.
   ========================================================================== */

(function () {
  var root = document.getElementById("quiz-root");
  if (!root) return;

  var state = {
    step: 0,
    answers: {},
    path: { negocio: 0, profesional: 0, familia: 0 },
    strength: 0
  };

  var QUESTIONS = [
    {
      id: "objetivo",
      q: "¿Cual describe mejor lo que buscas en Estados Unidos?",
      options: [
        { t: "Expandir o abrir un negocio, o invertir", v: "negocio", path: { negocio: 3 } },
        { t: "Continuar mi carrera profesional o mi talento", v: "profesional", path: { profesional: 3 } },
        { t: "Asegurar el futuro de mi familia a largo plazo", v: "familia", path: { familia: 3 } },
        { t: "Todavia estoy explorando mis opciones", v: "explorando", path: {} }
      ]
    },
    {
      id: "perfil",
      q: "¿Cual de estas opciones te describe mejor hoy?",
      options: [
        { t: "Tengo un negocio activo o capital para invertir", v: "empresario", path: { negocio: 2 } },
        { t: "Tengo estudios, experiencia o logros destacados en mi profesion", v: "profesional_perfil", path: { profesional: 2 } },
        { t: "Soy artista, deportista o tengo un talento reconocido", v: "talento", path: { profesional: 2 } },
        { t: "Tengo un familiar directo con estatus legal en EE.UU.", v: "familiar", path: { familia: 2 } }
      ]
    },
    {
      id: "pais",
      q: "¿Desde que pais nos escribes?",
      options: [
        { t: "Mexico", v: "mx" },
        { t: "Argentina", v: "ar" },
        { t: "Colombia", v: "co" },
        { t: "Otro pais de Latinoamerica", v: "latam" },
        { t: "Otro", v: "otro" }
      ]
    },
    {
      id: "conexion",
      q: "¿Cual es tu conexion actual con Estados Unidos?",
      options: [
        { t: "Ya tengo negocio, inversion o empresa relacionada", v: "negocio_activo", strength: 3, path: { negocio: 1 } },
        { t: "Tengo oferta, cliente o proyecto profesional en EE.UU.", v: "oferta", strength: 2, path: { profesional: 1 } },
        { t: "Tengo un familiar directo con estatus legal", v: "familiar_directo", strength: 2, path: { familia: 1 } },
        { t: "Todavia no tengo una conexion directa", v: "sin_conexion", strength: 0 }
      ]
    },
    {
      id: "tiempo",
      q: "¿En que plazo te gustaria empezar tu estrategia?",
      options: [
        { t: "Quiero empezar ahora", v: "ya", strength: 2 },
        { t: "En los proximos 6 a 12 meses", v: "6-12", strength: 1 },
        { t: "Estoy planificando a 2 o 3 anos", v: "2-3", strength: 0 }
      ]
    },
    {
      id: "capacidad",
      q: "¿Cuentas con capital o respaldo financiero disponible para tu estrategia?",
      options: [
        { t: "Si, mas de $100,000 USD disponibles", v: "alto", strength: 3 },
        { t: "Si, un monto menor a eso", v: "medio", strength: 1 },
        { t: "No aplica a mi caso (via profesional o familiar)", v: "no_aplica", strength: 1 },
        { t: "Aun no lo se con certeza", v: "no_se", strength: 0 }
      ]
    }
  ];

  var TOTAL_STEPS = QUESTIONS.length + 1; // +1 for contact step

  function render() {
    root.innerHTML = "";

    var progress = document.createElement("div");
    progress.className = "quiz-progress";
    var progressFill = document.createElement("span");
    progressFill.style.width = Math.round((state.step / TOTAL_STEPS) * 100) + "%";
    progress.appendChild(progressFill);
    root.appendChild(progress);

    if (state.step < QUESTIONS.length) {
      renderQuestion(QUESTIONS[state.step]);
    } else if (state.step === QUESTIONS.length) {
      renderContactStep();
    } else {
      renderResult();
    }
  }

  function renderQuestion(question) {
    var wrap = document.createElement("div");
    wrap.className = "quiz-step active";

    var num = document.createElement("div");
    num.className = "q-num";
    num.textContent = "Pregunta " + (state.step + 1) + " de " + QUESTIONS.length;
    wrap.appendChild(num);

    var h = document.createElement("h3");
    h.textContent = question.q;
    wrap.appendChild(h);

    var opts = document.createElement("div");
    opts.className = "quiz-options";
    question.options.forEach(function (opt) {
      var btn = document.createElement("div");
      btn.className = "quiz-option";
      btn.textContent = opt.t;
      if (state.answers[question.id] === opt.v) btn.classList.add("selected");
      btn.addEventListener("click", function () {
        state.answers[question.id] = opt.v;
        if (opt.path) {
          Object.keys(opt.path).forEach(function (k) { state.path[k] += opt.path[k]; });
        }
        if (typeof opt.strength === "number") state.strength += opt.strength;
        state.step++;
        render();
      });
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);

    var nav = document.createElement("div");
    nav.className = "quiz-nav";
    if (state.step > 0) {
      var back = document.createElement("button");
      back.className = "btn btn-ghost";
      back.type = "button";
      back.textContent = "Atras";
      back.addEventListener("click", function () { state.step--; render(); });
      nav.appendChild(back);
    } else {
      nav.appendChild(document.createElement("span"));
    }
    wrap.appendChild(nav);

    root.appendChild(wrap);
  }

  function renderContactStep() {
    var wrap = document.createElement("div");
    wrap.className = "quiz-step active";

    var num = document.createElement("div");
    num.className = "q-num";
    num.textContent = "Ultimo paso";
    wrap.appendChild(num);

    var h = document.createElement("h3");
    h.textContent = "¿A donde enviamos tu reporte personalizado?";
    wrap.appendChild(h);
    var p = document.createElement("p");
    p.style.color = "var(--ink-soft)";
    p.style.marginBottom = "20px";
    p.textContent = "Con esto, un asesor de CLG puede darte seguimiento con tu resultado y responder tus preguntas especificas.";
    wrap.appendChild(p);

    var field1 = fieldHTML("Nombre completo", "text", "quiz-nombre", true);
    var field2 = fieldHTML("Correo electronico", "email", "quiz-email", true);
    var field3 = fieldHTML("WhatsApp (con codigo de pais)", "tel", "quiz-whatsapp", false);
    wrap.appendChild(field1);
    wrap.appendChild(field2);
    wrap.appendChild(field3);

    var nav = document.createElement("div");
    nav.className = "quiz-nav";
    var back = document.createElement("button");
    back.className = "btn btn-ghost";
    back.type = "button";
    back.textContent = "Atras";
    back.addEventListener("click", function () { state.step--; render(); });
    nav.appendChild(back);

    var next = document.createElement("button");
    next.className = "btn btn-primary";
    next.type = "button";
    next.textContent = "Ver mi resultado";
    next.addEventListener("click", function () {
      state.contact = {
        nombre: document.getElementById("quiz-nombre").value,
        email: document.getElementById("quiz-email").value,
        whatsapp: document.getElementById("quiz-whatsapp").value
      };
      state.step++;
      render();
    });
    nav.appendChild(next);

    wrap.appendChild(nav);
    root.appendChild(wrap);
  }

  function fieldHTML(label, type, id, required) {
    var f = document.createElement("div");
    f.className = "form-field";
    var l = document.createElement("label");
    l.setAttribute("for", id);
    l.textContent = label;
    var i = document.createElement("input");
    i.type = type; i.id = id; i.required = !!required;
    f.appendChild(l); f.appendChild(i);
    return f;
  }

  function topPath() {
    var keys = Object.keys(state.path);
    keys.sort(function (a, b) { return state.path[b] - state.path[a]; });
    if (state.path[keys[0]] === 0) return "explorando";
    return keys[0];
  }

  var PATH_COPY = {
    negocio: {
      label: "Empresarios e Inversionistas",
      routes: "E-2 (Tratado de Inversion), L-1 (Traslado intracompania) o EB-5, segun tu capital y estructura.",
      link: "estrategias-empresarios.html"
    },
    profesional: {
      label: "Profesionales y Talento",
      routes: "EB-2 NIW, EB-1 o O-1, segun tus credenciales, trayectoria y logros.",
      link: "estrategias-profesionales.html"
    },
    familia: {
      label: "Familias y Planificacion",
      routes: "Peticion familiar, planificacion de residencia a largo plazo, o loteria de visas segun tu caso.",
      link: "estrategias-familias.html"
    },
    explorando: {
      label: "Explorando tus opciones",
      routes: "Con lo que nos compartiste aun no es clara una unica ruta — y esta bien. La Evaluacion CLG con un asesor humano es el siguiente paso logico.",
      link: "nosotros.html"
    }
  };

  function renderResult() {
    var path = topPath();
    var copy = PATH_COPY[path];
    var tier, badgeClass, tierText;
    if (state.strength >= 5) {
      tier = "strong"; badgeClass = "strong"; tierText = "Candidato fuerte";
    } else if (state.strength >= 2) {
      tier = "medium"; badgeClass = "medium"; tierText = "Posible, con mas informacion";
    } else {
      tier = "early"; badgeClass = "early"; tierText = "Es pronto — aqui esta tu mapa";
    }

    var wrap = document.createElement("div");
    wrap.className = "quiz-result active";

    var badge = document.createElement("span");
    badge.className = "result-badge " + badgeClass;
    badge.textContent = tierText;
    wrap.appendChild(badge);

    var h = document.createElement("h3");
    h.textContent = (state.contact && state.contact.nombre ? state.contact.nombre.split(" ")[0] + ", tu" : "Tu") + " perfil apunta a: " + copy.label;
    wrap.appendChild(h);

    var p = document.createElement("p");
    p.style.color = "var(--ink-soft)";
    p.textContent = "Rutas que normalmente se evaluan para este perfil: " + copy.routes;
    wrap.appendChild(p);

    var callout = document.createElement("div");
    callout.className = "callout";
    if (tier === "strong") {
      callout.textContent = "Con tu conexion actual y tu horizonte de tiempo, tiene sentido pasar directamente a una Evaluacion CLG con un abogado — asi validamos el detalle y te damos un plan por escrito.";
    } else if (tier === "medium") {
      callout.textContent = "Vas en buen camino. Con algunos datos adicionales de tu caso podemos precisar la ruta exacta y el momento correcto para iniciar.";
    } else {
      callout.textContent = "Aun no tienes todos los elementos, y eso es normal en esta etapa. Te compartimos el mapa de tu via para que sepas exactamente que construir primero.";
    }
    wrap.appendChild(callout);

    var actions = document.createElement("div");
    actions.className = "hero-actions";
    actions.style.marginTop = "26px";

    var waMsg = "Hola, complete la Evaluacion CLG. Mi resultado: " + copy.label + " (" + tierText + "). Me gustaria agendar una conversacion.";
    var waLink = document.createElement("a");
    waLink.className = "btn btn-whatsapp";
    waLink.textContent = tier === "strong" ? "Agendar mi sesion de estrategia" : "Hablar con un asesor por WhatsApp";
    waLink.href = "https://api.whatsapp.com/send?phone=17863016264&text=" + encodeURIComponent(waMsg);
    waLink.target = "_blank"; waLink.rel = "noopener";
    actions.appendChild(waLink);

    var moreLink = document.createElement("a");
    moreLink.className = "btn btn-ghost";
    moreLink.textContent = "Ver esta via en detalle";
    moreLink.href = copy.link;
    actions.appendChild(moreLink);

    wrap.appendChild(actions);

    var restart = document.createElement("button");
    restart.className = "btn btn-ghost";
    restart.type = "button";
    restart.style.marginTop = "18px";
    restart.textContent = "Volver a empezar";
    restart.addEventListener("click", function () {
      state = { step: 0, answers: {}, path: { negocio: 0, profesional: 0, familia: 0 }, strength: 0 };
      render();
    });
    wrap.appendChild(restart);

    root.appendChild(wrap);
  }

  render();
})();
