# Estado del sitio CLG

Qué está terminado, qué falta y de quién depende cada cosa.
Actualizado en la última ronda de cambios.

---

## 1. Un comando y ya

```bash
python3 scripts/sync-header.py
python3 scripts/fix-accents.py
```

Luego, en el navegador: **Cmd + Shift + R**.

No pude ejecutarlos yo porque el entorno Linux de esta sesión no arranca (el
disco de la máquina está lleno). Son diez segundos y hacen dos cosas que
todavía faltan en las ocho páginas más antiguas: poner el mismo menú y
selector de idioma en todas, y restaurar tildes y ñ.

Sobre las tildes: son cientos de palabras en ocho archivos. Un script hace
eso sin equivocarse; yo editándolas a mano introduzco errores. Por eso está
como script y no como edición manual.

---

## 2. Páginas terminadas

| Página | Estado |
|---|---|
| `index.html` | Portada completa, 13 bloques, paleta navy/latón |
| `metas-clg.html` | Metas CLG: buscar por objetivo, no por tipo de visa |
| `continuidad-clg.html` | Continuidad CLG, la quinta fase |
| `evaluacion.html` | Brújula CLG, test gratuito de 5 preguntas |
| `fase1-evaluacion-clg.html` | Landing de venta de Fase 1, diseño propio a propósito |
| `casos-de-exito.html` | Seis casos con Perfil / Quería / Estrategia / **Hoy** + espacio de video |
| `global-mobility.html` | Reconstruida sobre el sistema de diseño del sitio |
| `oportunidades.html` | Regiones e industrias |
| `recursos.html` | Guía, biblioteca, actualizaciones y eventos |
| `estrategias-empresarios.html` | Puerta 1, incluye corporaciones y L-1 ampliada |
| `estrategias-profesionales.html` | Puerta 2, artistas y deportistas nombrados |
| `estrategias-familias.html` | Vía secundaria, enlazada pero no destacada |
| `estrategia-honorarios.html` | Honorarios con lo que incluye cada uno |
| `nosotros.html` · `socios.html` · `preguntas-frecuentes.html` · `contacto.html` | Completas |

Infraestructura lista: `robots.txt`, `sitemap.xml`, datos estructurados
(Organization, LegalService, FAQPage), asistente de chat con captura de
datos, pop-up con salida por intención, formulario con autoguardado,
selector de idioma con arquitectura para siete idiomas.

---

## 3. Bloqueado por la firma, no por código

Nada de esto lo puedo inventar. Es lo único que separa al sitio de estar
listo para publicar.

**Videos.** Todo está construido para ellos. Hoy corre con dos embeds
antiguos como relleno y seis espacios reservados en Casos de Éxito. El brief
de rodaje está en `clg-video-brief.md`. El video que estaba puesto como «de
Gustavo» no era suyo, ya está marcado.

**Los datos de "Hoy" de cada cliente.** Nombre del negocio de Javier y su
ciudad, dónde expone Shiro ahora, si Giancarlos trasladó más personal, si los
hijos de Claudia y Diego estudian allá, si Leandro ya está operando. Una
línea real por persona convierte testimonios en prueba.

**Autorizaciones de imagen firmadas** de cada cliente antes de publicar
nombre, foto o video.

**Fotos del equipo** con nombre, cargo, colegiatura, idiomas y
especialización, para Nosotros. Una firma de inmigración vende confianza y la
confianza se construye mostrando personas.

**Cifras que necesitan firma de Renata:** honorarios ($2,500 / $15,800 /
$18,500), calendario de pagos 40/30/30, política de reembolso, plazo de
entrega del informe, cupo mensual (hoy `[12]`), precio y alcance de
Continuidad CLG, y las industrias listadas en Oportunidades.

**La tasa de aprobación sigue sin publicarse**, a propósito. Su propio
blueprint dice que necesita la extracción de Cerenade con denominador y
rango de fechas definidos. Es la afirmación de mayor riesgo del proyecto y no
voy a inventar un número.

**Guía CLG 2026**: el contenido está con Gianfranco. El diseño se hace
después de su OK, como acordaron. El formulario de Recursos ya la promete,
así que es prioridad.

**Un testimonio mexicano.** México es mercado primario y no hay ni uno en
todo el sitio. Es la brecha de contenido más urgente.

---

## 4. Integraciones pendientes

- **Stripe**: pegar el Payment Link en `CONFIG.stripePaymentLink` dentro de
  `fase1-evaluacion-clg.html`. Mientras esté vacío, el botón muestra un aviso
  honesto y ofrece WhatsApp, no falla en silencio.
- **systeme.io**: conectar los formularios (pop-up, chat, contacto, captura de
  la Brújula) al CRM con las etiquetas `quiz-inversion` / `quiz-talento` /
  `quiz-familia`, y montar la automatización de las 2 horas para formularios
  abandonados.
- **Agente de IA de WhatsApp**: la base de conocimiento está lista en
  `whatsapp-ai-knowledge.md` para cuando Meta lo habilite en la cuenta.

---

## 5. Fase siguiente: las páginas por vía y por país

Unas 15 páginas, y son las que capturan búsqueda real en Google:

Por vía: E-2, EB-5, L-1, EB-1, EB-2 NIW, O-1, familiar.
Por país: Colombia, México, Argentina, Ecuador, Chile, Perú, Bolivia.

Cada una responde lo mismo: para quién es, cuándo tiene sentido, **cuándo
no**, qué estrategia exige, qué inversión implica, qué riesgos tiene y cómo
trabaja CLG. Nada de «qué es la visa E-2» genérico, que es exactamente lo
que ya publican los competidores.

Hay una tensión que conviene aceptar en vez de resolver: la gente busca
«visa E-2» en Google, pero CLG vende estrategia. Estas páginas son el puente.
Reciben a alguien que llegó preguntando por una visa y le hacen entender, en
esa misma página, que lo que necesita es una estrategia.

---

## 6. Idiomas

Español e inglés están completos. Italiano, portugués, alemán, francés y
coreano tienen la arquitectura montada (selector, URLs por idioma, hreflang)
con los valores marcados TRANSLATE.

No los llené con traducción automática y no lo voy a hacer. Es contenido
legal migratorio: traducir mal «inversión sustancial» o «dispensa de interés
nacional» cambia el sentido legal de la frase, y Renata responde por eso ante
el Florida Bar. Traducir cinco idiomas con un traductor profesional cuesta
mucho menos que una sola frase mal traducida en el sitio de una firma legal.

Mientras un idioma no esté listo, el selector lo muestra pero avisa al
visitante y le sirve el español, en vez de mostrarle una página a medias sin
decírselo.

---

## 7. Publicar

**Recomendado:** subir esta carpeta a GitHub, activar GitHub Pages, y apuntar
el dominio ahí. systeme.io se queda con lo que hace bien: lista de correo,
etiquetas del CRM y la automatización de las 2 horas.

```bash
git init && git add . && git commit -m "CLG website"
git branch -M main
git remote add origin <URL del repo vacío>
git push -u origin main
```

**Alternativa systeme.io:** cada página se pega como bloque de código
personalizado a ancho completo. `fase1-evaluacion-clg.html` es autónoma y se
pega sin cambios; las demás necesitan que `styles.css` y los JS se suban a
un host y se enlacen con URL absoluta.
