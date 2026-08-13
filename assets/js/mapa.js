/* ==========================================================================
   Mapa interactivo de oportunidades en EE.UU.
   Simplificado a propósito: regiones clicables, no cartografía exacta.
   TODO(CLG): validar cada dato de industria con el equipo antes de publicar.
   Son afirmaciones sobre mercados, no asesoría legal, pero deben ser ciertas.
   ========================================================================== */
(function () {
  var svg = document.getElementById("us-map");
  var panel = document.getElementById("map-panel");
  if (!svg || !panel) return;

  var DATA = {
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
    svg.querySelectorAll(".state").forEach(function (s) { s.classList.remove("active"); });
    var el = svg.querySelector('[data-state="' + key + '"]');
    if (el) el.classList.add("active");
    panel.innerHTML =
      '<div class="eyebrow">Oportunidades</div>' +
      "<h3>" + d.name + "</h3>" +
      '<p style="color:var(--ink-soft);font-size:.95rem;">' + d.blurb + "</p>" +
      "<ul>" + d.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>" +
      '<a class="btn btn-purple btn-block" href="fase1-evaluacion-clg.html">Explorar mi estrategia aquí</a>';
  }

  svg.querySelectorAll(".state").forEach(function (s) {
    s.addEventListener("click", function () { show(s.getAttribute("data-state")); });
    s.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(s.getAttribute("data-state")); }
    });
  });

  show("fl");
})();
