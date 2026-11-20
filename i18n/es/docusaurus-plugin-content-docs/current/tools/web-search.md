---
title: "Buscar en la web y leer fuentes"
last_update:
  date: '2026-11-20'
---

# Buscar en la web y leer fuentes {/* #search-the-web-and-read-sources */}

Utilice el **Open-Science Agent** incorporado para encontrar páginas web públicas y leer su texto en una conversación. Esto es útil para localizar directrices de presentación de informes, documentación de software y anuncios de investigación. Para los registros bibliográficos y los documentos de texto completo, también use [bases de datos científicas](databases.md) y [Biblioteca](../guides/library.md).

## Empieza con una pregunta {/* #start */}

1. En **Settings → Agent**, seleccione **Open-Science Agent**. Conectar un modelo Main compatible en **Settings → Model**; una suscripción Codex puede suministrar el modelo.
2. Abre una conversación de proyecto. Establezca lo que quiere encontrar, qué fuentes priorizar y cualquier restricción de fecha. Pídale al agente que lea la página pertinente antes de responder.
3. Si aparece una aprobación, inspeccione la consulta de búsqueda, rango de tiempo, límite de resultados y filtros de dominio. Aprobar sólo la solicitud prevista. Una aprobación de lectura de página se refiere a la URL de destino.
4. Ampliar la actividad de la herramienta e inspeccionar las fuentes devueltas. Siga las citas de la respuesta de nuevo a la evidencia antes de usar sus afirmaciones.

Ejemplo de solicitud:

```text
Find the official PRISMA 2020 checklist page on the public web.
Read the relevant official page and explain what the checklist is for.
Give the source URL and distinguish the webpage text you read from any
linked PDF you did not open. Keep the answer in English.
```

La búsqueda incorporada envía consultas a **Exa** sin necesidad de una cuenta Exa. Leer una página contacta con su sitio web. Su modo de permiso todavía se aplica, y la cancelación no puede retractar una solicitud ya enviada. No incluya datos confidenciales de investigación en una consulta de búsqueda pública.

## Lea la evidencia, no sólo el snippet {/* #read-sources */}

Un resultado de búsqueda es un extracto. Pida al Agent que lea la página elegida y cite los pasajes que respaldan su respuesta. La lectura admite HTML público, Markdown y texto sin formato. No inicia sesión, no utiliza las cookies del navegador ni ejecuta JavaScript del sitio. Para artículos y archivos adjuntos, utilice los procedimientos de PDF y Library; no trate una página de presentación HTML como el texto completo del artículo.

Cuando el texto devuelto sea truncado, pídale al agente que siga leyendo el fragmento de la página guardada antes de sacar conclusiones. Una fuente salva refleja lo que se recuperó en ese momento. Pida una embrague fresca cuando el texto actual importa. Las fuentes retenidas pueden seguir las ramas de la sesión y las exportaciones de paquetes de investigación que reúnan las condiciones necesarias; esto no archiva todo el sitio web.

## Si una fuente no puede leerse {/* #recover */}

- Para un límite de tarifas, espere el intervalo indicado antes de reintentar. No envíes repetidamente la misma consulta fallida.
- Si un filtro requerido no es compatible, mantenga ese requisito y elija otra fuente o ruta de búsqueda; no amplíe silenciosamente la búsqueda.
- Para una pared de inicio de sesión, página bloqueada o tipo de archivo sin soporte, abra la fuente oficial usted mismo y proporcione un archivo permitido accesible cuando sea apropiado. No describa una página no leído como evidencia verificada.

Para encontrar y revisar documentos de investigación, continúe con [búsqueda de literatura enfocada](../workflows/focused-literature-search.md).
