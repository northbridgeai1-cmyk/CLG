# Calderaro Law Group (visamiami.com) — Blueprint de construcción en systeme.io

Preparado por NorthBridge · Agosto 2026

---

## 0. LO URGENTE: el sitio actual está invisible

El homepage actual tiene `meta-robots: noindex`. Eso le dice a Google, Bing, ChatGPT, Perplexity y todo crawler de IA: **"no me muestres a nadie."** Nadie que busque "necesito visa para USA" puede encontrarlos hoy.

**Fix en systeme.io:** Configuración del sitio → SEO → desactivar "Ocultar de los motores de búsqueda" (o quitar el noindex en la configuración de cada página). Hacer esto HOY, antes del rediseño. Es gratis y es el mayor impacto de todo este documento.

Verificación: buscar `site:visamiami.com` en Google una o dos semanas después. Debe aparecer.

---

## 1. Posicionamiento central

**Mensaje único en todo el sitio:** "No vendemos visas. Diseñamos estrategias."

Regla editorial: ninguna página habla de "tramitar su visa". Todas hablan de "diseñar su estrategia". La visa es el resultado; la estrategia es el producto. Este mensaje ya existe en su página de servicios ("NO OFRECEMOS VISAS... te damos ESTRATEGIAS MIGRATORIAS") — el rediseño lo lleva al hero, al CTA y al cierre de cada sección.

**Por qué el sitio propuesto (fmkt.agency) se siente "hecho por IA" — y cómo evitarlo:**

| Señal de "IA" | Qué hacer en su lugar |
|---|---|
| Gradientes morados/azules, glassmorphism | Paleta cálida y terrenal: crema `#F7F3EA`, verde bosque `#274435`, terracota `#B95E2E` |
| Tipografía genérica idéntica en todo | Serif editorial (Fraunces / Libre Caslon) para títulos + sans humanista (Karla) para texto |
| Todo centrado, tarjetas idénticas en grilla | Layouts asimétricos, sombras desplazadas, tachados a mano, ritmo variado entre secciones |
| Fotos de stock de "gente de negocios" | Fotos reales del equipo, de las charlas en LatAm, capturas de los videos de clientes |
| Copy inflado ("Your Future, Formally Defined") | Copy que suena a persona: "Queremos verte llegar. Y quedarte." |
| Single-page app en JavaScript pesado | HTML plano de systeme.io — más rápido y legible para buscadores e IA |

---

## 2. Arquitectura del sitio (páginas en systeme.io)

1. **Inicio** — la página del prototipo (hero, 3 vías, quiz, video, diferencia, contacto, FAQ)
2. **Servicios / Metodología** — la Metodología CLG en 3 fases, con el caso de Shiro
3. **Casos de éxito** — todos los videos del canal de YouTube embebidos + testimonios con bandera, nombre y visa
4. **Blog** (ya existe) — mantener, es clave para SEO/IA
5. **Contacto** — formulario de registro + WhatsApp + correo
6. **Test "¿Califico?"** — versión funnel del quiz (ver §4)
7. Versión EN de Inicio y Contacto (toggle EN ya existe)

Navegación: Inicio · Vías de entrada · ¿Califico? · Casos reales · Blog · **[Empieza tu estrategia]** (botón destacado) · EN

---

## 3. SEO + descubribilidad por IA (el "backround code")

Para que ChatGPT/Perplexity/Google respondan "Calderaro Law Group" cuando alguien pregunta "necesito una visa para USA" o "mis hijos quieren estudiar en Estados Unidos":

**a. Quitar el noindex** (ver §0). Sin esto, nada más funciona.

**b. JSON-LD (datos estructurados).** systeme.io permite código personalizado en el `<head>` (Configuración de página → Código de seguimiento / head). Pegar los dos bloques `<script type="application/ld+json">` que están en el prototipo:
- `LegalService` — quiénes son, dónde, qué idiomas, redes sociales
- `FAQPage` — las 5 preguntas frecuentes, escritas exactamente como la gente le pregunta a una IA

**c. FAQs redactadas como preguntas reales.** Las IA citan sitios que responden preguntas en lenguaje natural. Por eso las FAQ del prototipo son literalmente: "Necesito una visa para vivir y trabajar en Estados Unidos, ¿por dónde empiezo?", "Mis hijos quieren estudiar en Estados Unidos, ¿cómo puede migrar toda la familia?". Cada artículo nuevo del blog debe titularse igual: como una pregunta que alguien haría.

**d. Metadatos por página.** Título ≤ 60 caracteres con la palabra clave; descripción ≤ 155 con el mensaje de estrategia. Ejemplo Inicio:
- Título: `Estrategias Migratorias para EE. UU. | Calderaro Law Group Miami`
- Descripción: `No vendemos visas: diseñamos estrategias migratorias. E-2, O-1, EB-2 NIW, reunificación familiar. 20 años de experiencia. Test gratis: descubre tu vía.`

**e. Blog como motor de IA.** 2 artículos/mes respondiendo preguntas concretas ("¿Cuánto capital necesito para una visa E-2 en 2026?"). Los videos de YouTube embebidos en cada artículo relacionado — Google indexa ambos y se refuerzan.

**f. Google Business Profile + Search Console.** Crear/verificar ambos. Las IA usan estos datos para respuestas locales ("abogado de inmigración en Miami").

---

## 4. El quiz "¿Puedes obtener esta visa?" (fricción buena)

El prototipo trae la versión JavaScript embebible (funciona pegada en un bloque de "código personalizado" de systeme.io). La versión que captura contactos se construye como **funnel nativo de systeme.io**:

1. Paso 1 del funnel: pregunta 1 + campo de **correo** ("¿A dónde te enviamos tu resultado?") → esto registra el contacto ANTES de terminar — clave para la automatización del §6.
2. Pasos 2–5: una pregunta por página (perfil, capital, experiencia, familia, plazo).
3. Página de resultado por perfil (3 variantes: Inversión / Talento / Familia), cada una con:
   - Las visas probables (E-2, L-1, EB-5 / O-1, EB-2 NIW, EB-1 / Reunificación)
   - Etiqueta automática en systeme.io: `quiz-inversion`, `quiz-talento`, `quiz-familia`
   - CTA doble: WhatsApp con mensaje pre-llenado + agendar consulta
4. Disclaimer siempre visible: "resultado orientativo, tu estrategia se diseña persona a persona" (importante siendo abogados).

Las etiquetas permiten que los correos posteriores hablen del perfil correcto (a un inversor no le escribes sobre visas de artista).

---

## 5. Contacto: WhatsApp + correo + registro

- **WhatsApp** (`https://api.whatsapp.com/send?phone=17863016264`): botón flotante en todas las páginas + CTA secundario del hero. Usar mensajes pre-llenados (`&text=...`) según la sección, para saber de dónde viene cada lead.
- **Correo:** el prototipo usa `info@visamiami.com` como marcador — reemplazar por el Gmail real del cliente.
- **Registro:** único formulario del sitio (ellos "solo se registran en la web"). Campos: nombre, correo, país, perfil (dropdown), objetivo. El dropdown de perfil alimenta las mismas etiquetas del quiz.

---

## 6. Automatización: recordatorio a las 2 horas si no termina el formulario

systeme.io no detecta "abandonó un formulario a medias" en un formulario de una sola página. La solución es el patrón **multi-paso** (mismo del quiz):

1. **Paso A** pide solo nombre + correo → al enviarse, systeme.io ya creó el contacto y le pone la etiqueta `registro-iniciado`.
2. **Paso B** pide el resto (país, perfil, objetivo) → al completarse, regla de automatización: quitar `registro-iniciado`, poner `registro-completo`.
3. **Automatización** (Automatizaciones → Reglas + flujo de trabajo):
   - Disparador: etiqueta `registro-iniciado` añadida
   - Esperar **2 horas**
   - Condición: ¿tiene la etiqueta `registro-completo`? → Sí: fin. No: enviar correo recordatorio.
4. **Correo recordatorio** (asunto: "Tu estrategia quedó a medio camino, {nombre}"):

> Hola {nombre},
>
> Empezaste a contarnos tu caso pero quedó a mitad de camino. Lo entendemos — pensar en migrar es una decisión grande.
>
> Tu registro sigue guardado. Te toma 1 minuto terminarlo, y con esa información nuestro equipo llega a la primera conversación con ideas, no con preguntas: [Continuar mi registro →]
>
> Si prefieres hablar directo, escríbenos por WhatsApp: +1 (786) 301-6264.
>
> Queremos verte llegar.
> Equipo Calderaro Law Group

Añadir un segundo toque opcional a las 48 h y luego pasar el contacto a la secuencia general del boletín.

---

## 7. IA en el sitio (chat que responde)

systeme.io no tiene chat con IA nativo → widget de terceros embebido (el cliente ya aprobó):

- **Opción recomendada: Chatbase** (~USD 40/mes): se entrena subiendo las páginas del sitio, las FAQ y transcripciones de sus videos de YouTube. Widget = 1 línea de script en el head del sitio.
- Alternativa económica: **Tidio** con Lyro AI.
- Reglas del bot: responde en español e inglés; nunca da asesoría legal específica ("cada caso se analiza con un abogado"); todo camino de conversación termina en el quiz o en WhatsApp.
- Instalación: systeme.io → Configuración → Código de seguimiento → pegar el script del widget (aplica a todas las páginas).

---

## 8. Videos y prueba social

- Video principal del homepage: caso Gustavo (ya embebido: `youtube.com/embed/xRnHOhXaG4w`).
- Página "Casos de éxito": embeber cada video de testimonio del canal (@calderarolawgroup9174). Pedir al cliente la lista de sus 4–6 mejores videos de clientes.
- Cada testimonio escrito lleva: cita textual, nombre, país (bandera) y tipo de visa — así ya lo hacen y funciona; conservarlo.
- Sustituir las capturas de pantalla de "Nuestros Números" (hoy son imágenes .png de screenshots) por texto real HTML: mejor para SEO y se ve más profesional. Pedir las cifras reales al cliente.

## 9. Diferenciación frente a competidores

La tabla del prototipo ("CLG vs. un despacho de trámites") responde la pregunta directamente sin nombrar competidores (importante en un sector legal). Los 5 ejes salen de su propia metodología: punto de partida integral, estrategia con plan B, plan de negocios incluido, acompañamiento post-llegada, 20 años + charlas en 6 países de LatAm.

## 10. Checklist de implementación (orden sugerido)

1. ☐ Quitar `noindex` (§0) — hoy mismo
2. ☐ Crear Google Search Console + Business Profile (§3f)
3. ☐ Rebuild del homepage en systeme.io siguiendo el prototipo
4. ☐ Pegar JSON-LD en el head (§3b) y metadatos por página (§3d)
5. ☐ Construir el funnel del quiz con etiquetas (§4)
6. ☐ Formulario de registro en 2 pasos + automatización de 2 horas (§6)
7. ☐ Contratar y entrenar Chatbase, pegar el widget (§7)
8. ☐ Página de casos de éxito con videos del canal (§8)
9. ☐ Reemplazar screenshots de cifras por texto real (§8)
10. ☐ Versión EN del homepage
11. ☐ Calendario de blog: 2 preguntas respondidas al mes (§3e)

**Datos que faltan del cliente:** Gmail real de contacto, cifras reales de "Nuestros Números", logos de los medios ("como nos viste en"), lista de videos de testimonios, fotos reales del equipo y las charlas.
