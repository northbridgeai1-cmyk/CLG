# CLG · Handoff de la ronda 3

Qué se hizo, qué queda, y las tres cosas que necesito de ustedes antes de que
esto pueda publicarse.

---

## 1. Lo que se implementó en esta ronda

**Diseño y marca**
- Paleta cambiada a morado y amarillo, alineada con el logo. Las cuatro
  variables de marca están al inicio de `assets/css/styles.css`; si tienen los
  hex oficiales del manual, se cambian ahí y todo el sitio los hereda.
- Más aire: secciones a 110px, tipografía más grande, menos texto corrido,
  más tarjetas.
- Animaciones sutiles al hacer scroll, con respeto a `prefers-reduced-motion`.
- Responsive revisado, con foco en móvil (botones a ancho completo, menú
  lateral, panel de chat adaptado).

**Homepage reestructurada** siguiendo su esquema de 12 bloques:
hero con quién/qué/resultado/siguiente paso → barra de confianza → el problema
real (las seis preguntas de las 11 de la noche) → ¿dónde estás hoy? con la
cuarta opción "no sé" destacada → por qué Estados Unidos → vías migratorias en
tarjetas → Método CLG con el resultado para el cliente debajo de cada fase →
casos con País/Perfil/Meta/Estrategia/Resultado → por qué CLG → Latinoamérica →
honorarios y qué pasa después → FAQ → CTA final.

**CTA unificado.** "Quiero conocer mi estrategia" en toda la página, con la
línea de apoyo "¿No sabes cuál vía te corresponde? La Brújula CLG te orienta en
2 minutos, gratis." La Brújula pasó a secundaria, como pidieron.

**Pop-up** con la lógica que pidieron: nunca al cargar, sino a los 45 segundos
o al detectar intención de salida. Dos pasos, intención primero y formulario
corto después, no un cuestionario largo. Se muestra una sola vez por visitante.

**Chatbot convertido en herramienta de captación.** Ahora abre con menú de
intención (explorar opciones, negocios, talento, familia, cuál vía me toca,
hablar con un abogado), responde según la rama y luego captura nombre, país,
objetivo, correo y WhatsApp. Regla dura mantenida: si no sabe, no inventa, y
deriva a una persona.

**Páginas nuevas:** `oportunidades.html` (mapa interactivo por región más
industrias) y `recursos.html` (Guía CLG, biblioteca, actualizaciones
normativas, eventos próximos y pasados).

---

## 2. Los idiomas: lo que puedo y lo que no

Pidieron siete idiomas con todo el contenido traducido y URLs por idioma.
La arquitectura está construida: `assets/js/i18n.js` tiene el motor, el
selector visible arriba a la derecha, soporte de `/es/`, `/en/`, `/it/`, `/pt/`,
`/de/`, `/fr/`, `/ko/`, y etiquetas `hreflang`.

**Español está completo. Inglés está completo.** Los otros cinco están como
estructura con las claves creadas y los valores marcados TRANSLATE.

No los llené con traducción automática, y quiero ser claro sobre por qué. Esto
es contenido legal migratorio. Una traducción automática de "inversión
sustancial" o "dispensa de interés nacional" al alemán o al coreano puede
cambiar el sentido legal de la frase, y ustedes son quienes responden por eso
ante el colegio de abogados. El costo de traducir cinco idiomas con un
traductor profesional es mucho menor que el costo de una sola frase mal
traducida en el sitio de una firma legal.

Mientras un idioma no esté listo, el selector lo muestra pero avisa al
visitante que la traducción está en preparación y le sirve el español, en vez
de mostrarle una página a medias sin decírselo.

**Lo que necesito de ustedes:** decidir si contratan traductores (recomendado)
o si publicamos solo español e inglés por ahora y añadimos idiomas conforme se
traduzcan. La segunda opción es perfectamente respetable y es lo que yo haría.

---

## 3. Revisión legal: lo que Renata tiene que aprobar

Marqué en el sitio todo lo que no puedo verificar. Esto es lo que necesita
firma antes de publicar:

| Dónde | Qué revisar |
|---|---|
| Homepage, barra de confianza | "20+ años". Confirmar fecha de inicio de ejercicio. |
| Homepage, casos | Los campos Meta, Estrategia y Resultado los redacté a partir de los testimonios publicados. Hay que contrastarlos con el expediente y tener autorización firmada por cliente. |
| Honorarios | $2,500 / $15,800 / $18,500 y el calendario de pagos 40/30/30. |
| Fase 1 | Política de reembolso y plazo de entrega del informe. |
| Fase 1 | El número de capacidad mensual, hoy en `[12]`. |
| Continuidad CLG | $950 al año, $95 al mes, y que la llamada mensual de comunidad se pueda sostener de verdad. |
| Recursos | Cada actualización normativa necesita fuente oficial y fecha. |
| Oportunidades | Las industrias listadas por región son afirmaciones de mercado. Confirmar en cuáles CLG tiene experiencia documentable. |
| Todo el sitio | Ninguna frase promete resultado. El descargo de resultados previos está en todos los pies de página. Vale una lectura final con ese criterio. |

**No publiqué ninguna tasa de aprobación.** Su propio blueprint dice que ese
número necesita la extracción de Cerenade con denominador y rango de fechas
definidos. Sigue pendiente y sigue siendo la afirmación de mayor riesgo del
proyecto.

---

## 4. Lo que sigue, en orden

**Fase 4 (contenido, no código):**
1. Los videos. Todo está construido para ellos y hoy corre con dos embeds
   viejos de relleno. El brief está en `clg-video-brief.md`. El video que
   estaba puesto como "Gustavo" no era el suyo; ya está marcado para
   reemplazo.
2. Fotos reales del equipo con nombre, cargo, experiencia, colegiatura,
   idiomas y especialización, para la página Nosotros. Una firma de
   inmigración vende confianza, y la confianza se construye mostrando
   personas.
3. Testimonio mexicano. México es mercado primario y no hay ni uno.

**Fase 5 (páginas SEO, unas 15):**
Una por vía (E-2, EB-5, L-1, EB-1, EB-2 NIW, O-1, familiar) y una por país de
origen (Colombia, México, Argentina, Ecuador, Chile, Perú, Bolivia). Cada una
respondiendo lo mismo: para quién es, cuándo tiene sentido, **cuándo no**, qué
estrategia exige, qué inversión implica, qué riesgos tiene y cómo trabaja CLG.
Nada de "qué es la visa E-2" genérico, que es exactamente lo que ya hacen los
competidores.

**Fase 6 (integraciones):**
Stripe en la página de Fase 1, formularios de systeme.io conectados al CRM,
automatización de las 2 horas, y el agente de IA de WhatsApp cuando Meta lo
habilite (la base de conocimiento ya está lista en
`whatsapp-ai-knowledge.md`).

---

## 5. Una opinión que no me pidieron

El comentario más valioso de toda su lista es el último: *"no intentaría meter
absolutamente todo en la homepage"*. Estoy de acuerdo, y lo aplico así: la
portada vende la experiencia y reparte tráfico. El detalle profundo vive en su
propia página.

Y sobre el punto 14, que la web todavía parece una firma que tramita visas: la
corrección real no es de copy, es de estructura. Por eso la portada ahora abre
con el problema y con "¿dónde estás hoy?" antes de nombrar una sola categoría
migratoria, y por eso existe Metas CLG. Las siglas E-2 y EB-5 aparecen recién
en el sexto bloque, cuando ya se entendió que lo que se compra es la
estrategia.

Dicho eso, hay una tensión que conviene aceptar en vez de resolver: la gente
busca "visa E-2" en Google. Las páginas por vía de la Fase 5 son las que
capturan esa búsqueda, y su trabajo es recibir a alguien que llegó preguntando
por una visa y hacerle entender, en esa misma página, que lo que necesita es
una estrategia. Ese es el puente entre lo que buscan y lo que ustedes venden.
