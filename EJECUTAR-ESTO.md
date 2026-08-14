# Antes de revisar el sitio: dos comandos

Desde la carpeta del sitio, en la Terminal:

```bash
python3 scripts/sync-header.py
python3 scripts/fix-accents.py
```

El primero pone el **mismo menú y el mismo selector de idioma en todas las
páginas**, y marca la pestaña correcta como activa según dónde estés. El
segundo arregla tildes y ñ en las páginas que aún no se reescribieron a mano.

Después, en el navegador: **Cmd + Shift + R** (recarga forzada). Si el sitio
se ve igual que antes, está sirviendo la hoja de estilos desde caché; ábrelo
en una ventana privada para confirmar.

---

## Qué se resolvió en esta ronda

**El menú cambiaba entre pestañas.** El nav estaba escrito a mano en cada
archivo, así que se fue desincronizando: distintas páginas tenían distintos
enlaces, unas tenían el selector de idioma y otras no. Ahora hay una sola
fuente de verdad, `scripts/sync-header.py`. Para cambiar el menú del sitio
completo se edita la lista `NAV` en ese archivo y se vuelve a correr.

**El selector de idioma ahora está en todas las páginas**, y sólo uno por
página. Antes había dos en algunas (uno para escritorio y otro para el menú
móvil), y cuando la hoja de estilos no cargaba se veían los dos.

**Banderas más pequeñas** en Casos de Éxito: pasaron a 19×13 px. La bandera
es una etiqueta, no un elemento gráfico.

**Casos de Éxito, mucho más detallado.** Cada persona ahora tiene Perfil,
qué quería, la estrategia que se diseñó y, lo más importante, un bloque
**Hoy** con lo que está haciendo ahora mismo. Seis casos: Javier (Colombia),
Shiro (Japón), Giancarlos (Perú), Claudia y Diego (Ecuador), Leandro
(Argentina) y Bryan (Canadá).

**Espacios de video reservados** en cada caso. Cuando envíen los videos, se
reemplaza cada bloque «pendiente de la firma» por el iframe de YouTube. No
puse videos de relleno de otras personas, porque eso ya pasó una vez con el
video que se atribuyó a Gustavo y no era suyo.

---

## Lo que necesito de ustedes para cerrar Casos de Éxito

El bloque **Hoy** de cada caso está redactado con lo que se puede deducir de
los testimonios públicos. Para que sea realmente fuerte hace falta el dato
concreto, y eso sólo lo tienen ustedes:

- ¿Cómo se llama el negocio de Javier y en qué ciudad opera? ¿Cuántos
  empleados tiene hoy?
- ¿Dónde vive Shiro y dónde ha expuesto últimamente?
- ¿Giancarlos trasladó a más personal después de su propia L-1?
- ¿Los hijos de Claudia y Diego están estudiando allá? ¿Alguno con beca?
- ¿Leandro ya está operando en Estados Unidos, o sigue en proceso?

Con una línea real por persona, esta página deja de ser testimonios y pasa a
ser prueba. Y hace falta la **autorización de uso de imagen firmada** de cada
uno antes de publicar nombre, foto o video.

---

## Ya estaba hecho de rondas anteriores

Por si se perdió en el hilo, estos puntos del documento de posicionamiento ya
están implementados:

- La corrección de **opcionalidad en vez de urgencia**: la portada abre con
  «No se trata de que tengas que irte mañana» y el cierre de Casos de Éxito
  usa el párrafo de Shiro que pedían, casi textual.
- **Dos puertas en vez de tres**: Inversión y negocios / Talento. Familias
  quedó como enlace de apoyo, no como puerta principal.
- **Artistas y deportistas nombrados explícitamente** en la puerta de talento.
- **Corporaciones**: la línea sobre traer talento del exterior está en la
  puerta de inversión, la L-1 ya no se describe como algo sólo para el
  fundador, y hay una entrada de FAQ redactada sin inflar el tamaño real de
  esa práctica.
- **Movilidad global**: la línea de EAU y España está en el pie de página y
  en las FAQ, y `global-mobility.html` está construida.
- **Fase 1**: se suavizó el placeholder de la anécdota de Renata para que
  hable de clientes que querían conocer sus opciones, no de clientes en
  crisis. «Cupo limitado» y «Por qué es pagada» se dejaron intactos, como
  pedía el documento.
