---
title: "Inspeccione una vía y su red de interacción"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Inspeccione una vía y su red de interacción {/* #inspect-a-pathway-and-its-interaction-network */}

<p className="example-label"><strong>Ejemplo práctico</strong> P53 humano señalización en Reactome vía Pathway Commons</p>

Utilice una vía curada para inspeccionar cómo **TP53**, **MDM2** y **CDKN1A** aparecen en una red. El resultado es un registro de fuentes, tabla de interacción y nota de investigación. Esto recupera la conectividad curada; no prueba el enriquecimiento ni mide la actividad de la vía en una muestra. Para una pregunta estadística de la lista de genes, utilice [enriquecimiento de genes](gene-set-enrichment.md).

## 1. Preparar el proyecto {/* #prepare */}

1. Crear un proyecto llamado **Pathway Commons Research** y comenzar una conversación.
2. En **Settings → Connectors**, haga que **Pathway Commons** esté disponible para el agente activo. Utiliza un servicio público; este ejemplo no necesita archivos de investigación privados.
3. Seleccione un modelo Main configurado. Este ejemplo usó **Codex subscription**. Si Codex está marcado **Update required**, [actualizar su tiempo de ejecución](../guides/frameworks.md#update-codex) antes de enviar la tarea.

## 2. Buscar y conservar la identidad devuelta {/* #search */}

Enviar:

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

Abrir **Notebook** junto a la conversación e inspeccionar la consulta y los registros devueltos. Esta ejecución buscó `p53 signaling`, con tipo `Pathway`, organismo `9606` y fuente de datos `reactome`. También usó `top_pathways` con `p53`. The search reported **1,309 total de visitas**; su primera página no es todo el conjunto de resultados.

![Solicitud de investigación en inglés y consulta Pathway Commons real en el Notebook](/img/open-science/v0340/pathway-query.webp)

El registro seleccionado fue **Reglamento de transcripción por TP53**, con URI `http://bioregistry.io/reactome:R-HSA-3700989` exacto y fuente `pc14:reactome`. Mantenga la URI regresada por la consulta en lugar de reconstruirla de una etiqueta. Los resultados de búsqueda y los conteos pueden cambiar a medida que las actualizaciones de la fuente.

## 3. Exportar la ruta seleccionada {/* #export */}

Pida a la URI seleccionada para ser exportada con **subtepatrías incluidas**. En este sentido, el agente salvó las respuestas SIF, TXT y JSON-LD. SIF suministra registros de interacción aplanados; TXT añade registros de nodos; JSON-LD conserva una estructura modelo más rica. Vea el [referencia a la operación](../reference/connector-operations.md#pathway_commons_export) cuando elija un formato o alcance de subpatron.

Inspeccione la respuesta retenida antes de leer el resumen. La exportación SIF del ejemplo contenía **Registros de interacción 3,318**, y su exportación TXT contenía **Nodos 387**. Estos recuentos describen este camino seleccionado y alcance de exportación, no todas las interacciones humanas p53.

## 4. Abrir e inspeccionar los resultados {/* #inspect */}

1. Seleccione **tp53_mdm2_cdkn1a_readable_interactions.tsv** en la respuesta o tarjetas de archivo generados. Abra su vista previa de pantalla completa si las columnas son estrechas.
2. Comprueba `source`, `interaction` y `target` contra la respuesta cruda. La tabla de lectura de nueve hojas es una selección, no la red completa.
3. Abre **tp53_pathway_research_note.md**. Confirma que conserva la vía URI, fuente, fecha y limitaciones.
4. Descargue los archivos que necesita. Preserve la red completa y las respuestas originales junto con cualquier extracto utilizado en una presentación.

![Nueve registros de interacción seleccionados se inauguró en la aplicación](/img/open-science/v0340/pathway-interactions.webp)

Los registros devueltos incluyen `TP53 controls-expression-of MDM2`, `MDM2 controls-state-change-of TP53` y `MDM2 in-complex-with TP53`. CDKN1A aparece en seis registros, pero esta exportación SIF no tiene borde directo TP53-to-CDKN1A. Un borde ausente en una vía seleccionada y plana no es evidencia de que una relación biológica está ausente.

![Nota de inglés guardada con límites de identidad e interpretación de las vías](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` no especifica la activación frente a la inhibición; `in-complex-with` no establece la unión binaria directa. La red por sí sola no puede establecer la especificidad del tejido, los efectos de mutación, la fuerza de interacción, la actividad a nivel de muestra o la causalidad. Use reacciones originales de la vía y experimentos primarios para investigar esas preguntas.

## Archivos de ejemplo guardados {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">Respuestas originales Connector, ZIP comprimido</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">Tabla completa de interacción exportada</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">Tabla de lectura de nueve hectáreas</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">Nota de investigación en inglés</ExampleDownload>

Para explorar un barrio de genes o caminos entre conjuntos de genes en lugar de una ruta seleccionada, utilice **pathway_commons_graph** y elija su dirección, modo de ruta y límites deliberadamente. Esa es una consulta diferente de esta exportación basada en URI. Las fuentes y la configuración se describen en [Bases de datos científicos](../tools/databases.md#pathway-expression-clinical).
