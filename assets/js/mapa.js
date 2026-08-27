/* ==========================================================================
   Mapa interactivo de oportunidades en EE.UU.
   Simplificado a propósito: regiones clicables, no cartografía exacta.
   TODO(CLG): validar cada dato de industria con el equipo antes de publicar.
   Son afirmaciones sobre mercados, no asesoría legal, pero deben ser ciertas.
   ========================================================================== */
(function () {
  var list = document.querySelector(".region-list");
  var panel = document.getElementById("map-panel");
  if (!list || !panel) return;

  /* Same file serves both languages, keyed off the /en/ path. */
  var EN = /\/en\//.test(window.location.pathname);
  var T = EN
    ? { eyebrow: "Opportunities", cta: "Explore my strategy here", href: "strategy-assessment.html" }
    : { eyebrow: "Oportunidades", cta: "Explorar mi estrategia aquí", href: "fase1-evaluacion-clg.html" };

  var DATA = EN ? {
    fl: { name: "Florida (Miami and Orlando)",
      blurb: "The natural entry point for Latin American business owners, and where our office is.",
      items: ["An established Latino ecosystem", "International business hub", "Real estate", "Tourism and hospitality", "Franchising", "Direct access to Latin America"] },
    tx: { name: "Texas",
      blurb: "Business-friendly environment and lower operating costs than the coasts.",
      items: ["Technology", "Energy", "Manufacturing", "Logistics", "Favourable regulatory environment"] },
    ny: { name: "New York",
      blurb: "The financial and cultural capital, and the most competitive market in the country.",
      items: ["Finance", "Fashion", "Media and advertising", "Technology", "Art and galleries"] },
    ca: { name: "California",
      blurb: "Innovation and entertainment, with the largest consumer market in the country.",
      items: ["Technology", "Entertainment", "Agriculture", "International trade", "Innovation and venture capital"] },
    il: { name: "The Midwest (Illinois)",
      blurb: "The country's logistics hub and a base for manufacturing and industry.",
      items: ["Logistics and distribution", "Manufacturing", "Professional services", "Food"] },
    ga: { name: "Georgia and the Southeast",
      blurb: "Fast growth with costs still reachable for a new operation.",
      items: ["Logistics", "Film and TV production", "Corporate services", "Light manufacturing"] }
  } : {
    fl: { name: "Florida (Miami y Orlando)",
      blurb: "Puerta de entrada natural para el empresario latinoamericano y donde está nuestra oficina.",
      items: ["Ecosistema latino consolidado", "Centro de negocios internacional", "Bienes raíces", "Turismo y hospitalidad", "Franquicias", "Acceso directo a Latinoamérica"] },
    tx: { name: "Texas",
      blurb: "Entorno favorable a los negocios y costos operativos más bajos que las costas.",
      items: ["Tecnología", "Energía", "Manufactura", "Logística", "Entorno regulatorio favorable"] },
    ny: { name: "Nueva York",
      blurb: "Capital financiera y cultural, con el mercado más competitivo del país.",
      items: ["Finanzas", "Moda", "Medios y publicidad", "Tecnología", "Arte y galerías"] },
    ca: { name: "California",
      blurb: "Innovación y entretenimiento, con el mayor mercado de consumo del país.",
      items: ["Tecnología", "Entretenimiento", "Agricultura", "Comercio internacional", "Innovación y capital de riesgo"] },
    il: { name: "Medio Oeste (Illinois)",
      blurb: "Centro logístico del país y base de manufactura e industria.",
      items: ["Logística y distribución", "Manufactura", "Servicios profesionales", "Alimentos"] },
    ga: { name: "Georgia y el Sureste",
      blurb: "Crecimiento acelerado con costos aún accesibles para nuevas operaciones.",
      items: ["Logística", "Producción audiovisual", "Servicios corporativos", "Manufactura ligera"] }
  };

  function show(key) {
    var d = DATA[key];
    if (!d) return;
    list.querySelectorAll(".region-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-state") === key);
    });
    panel.innerHTML =
      '<div class="eyebrow">' + T.eyebrow + '</div>' +
      "<h3>" + d.name + "</h3>" +
      '<p style="color:var(--ink-soft);font-size:.95rem;">' + d.blurb + "</p>" +
      "<ul>" + d.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>" +
      '<a class="btn btn-purple btn-block" href="' + T.href + '">' + T.cta + '</a>';
  }

  list.querySelectorAll(".region-btn").forEach(function (b) {
    b.addEventListener("click", function () { show(b.getAttribute("data-state")); });
  });

  show("fl");
})();
