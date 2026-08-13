# Brief de video CLG: qué grabar y por qué

El sitio ya está construido para video en vez de fotos. Faltan los videos.
Esto es la lista de rodaje.

## La idea que gobierna todo

La gente no compra una visa. Compra lo que la visa le permite hacer. Nadie se
despierta queriendo una E-2. Se despierta queriendo que su negocio funcione en
otro país, o que su hija estudie donde ella quiera.

Entonces el video nunca empieza por la visa. Empieza por la vida. La categoría
migratoria aparece al final, y de pasada, como el mecanismo que lo hizo posible.

Regla corta para el editor: **si el video se puede resumir como "te explicamos
la visa X", está mal grabado.** Si se resume como "mira lo que esta persona
está haciendo ahora", está bien.

## Video 1: el del inicio (60 a 90 segundos)

Va en el hero de la portada. Ahora mismo hay un video viejo de relleno ahí.

Estructura:

1. Alguien diciendo qué quería (no qué visa pidió). "Quería que mis hijos
   tuvieran opciones que yo no tuve."
2. Qué estaba en el camino. Dos abogados, dos respuestas, ningún plan.
3. Qué hacen hoy. Imagen del negocio abierto, del campus, de la familia.
4. Renata, quince segundos máximo, cerrando con la idea de la opción que se
   construye con tiempo.

Sin música épica. Sin drone sobre Miami. Sin gente firmando papeles en cámara
lenta. Eso es exactamente lo que hace todo el resto del sector.

## Videos 2 a 7: uno por meta

Estos van en `metas-clg.html`, uno debajo de cada meta. 45 a 60 segundos cada
uno. Formato vertical también, sirven para Reels y TikTok sin volver a grabar.

| Meta | A quién grabar | La frase que hay que sacarle |
|---|---|---|
| Mi hijo estudia en EE.UU. | Un padre o madre cuyo hijo ya entró | "Está en su segundo año y yo lo veo por video llamada desde su cuarto allá." |
| Abrí o compré un negocio | Javier O. (Colombia) o Gustavo | "El local es mío, los empleados son míos, y vivo a diez minutos." |
| Traje a mi familia | Cualquier cliente con pareja e hijos | "Mi esposa trabaja, mis hijos van al colegio, estamos los cuatro." |
| Mi empresa contrata del exterior | Una de las empresas pequeñas que ya representan | "Necesitaba a mi gente de confianza acá, no empezar de cero." |
| Soy artista o deportista | Shiro (Japón) | "Vivo de mi arte, legalmente, en Nueva York y Los Ángeles." |
| Voy hacia la residencia | Claudia y Diego (Ecuador) | "Ya no es un permiso que se vence. Es nuestra casa." |

## Videos por país (para la Brújula CLG)

Cuando alguien pone su país en el resultado del test, aparece el video de
alguien de ahí. Hoy solo Colombia tiene video y **hay que confirmar cuál es**
(el que está puesto se asumió que es el de Gustavo). Faltan Argentina, Perú,
Ecuador y México. México es el que más urge: es mercado primario y no hay ni
un testimonio suyo en todo el sitio.

Un video por país, 30 a 45 segundos, con la bandera y el nombre en pantalla.
La persona dice de dónde es, qué quería, y qué hace hoy. Nada más.

## Cómo grabar para que no parezca corporativo

- Que hablen en su idioma. Un argentino explicando su caso en inglés forzado
  pierde toda la credibilidad que ganó al abrir la boca.
- Preguntas abiertas y silencio del entrevistador. Las mejores frases salen
  tres segundos después de que la persona creía que ya había terminado.
- Nada de guion memorizado. Se nota, y se nota rápido.
- Locación real: su negocio, su casa, su estudio. No una sala de juntas.
- Subtítulos siempre, en los dos idiomas. La mitad lo va a ver sin sonido.
- Autoplay apagado. Que el visitante decida darle play.

## Permisos

Cada cliente firma una autorización de uso de imagen específica para su caso,
y cada página donde salga lleva el aviso de resultados previos. Esto no es
opcional en publicidad legal.

## Dónde va cada archivo cuando estén listos

- Portada: reemplazar el iframe del hero en `index.html`.
- Metas: los seis videos en `metas-clg.html`, debajo de cada tarjeta.
- Brújula: los IDs de YouTube en `COUNTRY_PROOF`, dentro de
  `assets/js/quiz.js`.
- Casos de éxito: el video largo de cada historia en `casos-de-exito.html`.
