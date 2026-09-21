---
title: "Búsqueda dentro de revistas y fechas especificadas"
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Búsqueda dentro de revistas y fechas especificadas {/* #search-within-specified-journals-and-dates */}

<p className="example-label"><strong>Ejemplo práctico</strong> Pruebas de intervención de atención en dos revistas, 2019–2025</p>

Una búsqueda enfocada necesita límites explícitos y un registro de lo que fue analizado. Este ejemplo utiliza PubMed para recuperar publicaciones relacionadas con la atención en **JAMA Psychiatry** y **Investigación y Terapia del Comportamiento**, y luego separa los informes de prueba aleatorizados de otras publicaciones. Produce una tabla completa de selección y una nota de búsqueda, no recomendaciones de tratamiento o un examen sistemático.

## 1. Establecer la norma de preguntas y elegibilidad {/* #1-set-the-question-and-eligibility-rule */}

Abra un proyecto y seleccione un modelo conectado. Confirme que **PubMed** Connector está disponible en **Settings → Connectors**; configurar la información de contacto allí si se solicita. No se requieren documentos descargados para iniciar este ejemplo.

Use fechas de publicación **2019-01-01 a través de 2025-12-31**, no la fecha en la que se agregó un registro de bases de datos. Incluir los informes aleatorizados primarios con un brazo de intervención mental definido y los resultados de los participantes notificados. Mantenga una categoría **incierto** separada para intervenciones mixtas, estado de publicación poco claro o fechas conflictivas. Los resultados mecanicistas por sí solos no hacen un informe un análisis secundario.

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![La solicitud de búsqueda enfocada en Open-Science](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. Compruebe la consulta y la cobertura {/* #2-check-the-query-and-coverage */}

La carrera presentó esta consulta concepto-y-periodario, con el filtro de fecha de publicación suministrado por separado:

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

Abrir **Notebook** o ampliar la actividad PubMed. Confirme el campo de la revista, ambas fechas y el recuento devuelto. En septiembre 16, 2026, la búsqueda devolvió **Registros 62**; todos los 62 fueron recuperados, con `has_more = false`. Los conteos pueden cambiar a medida que PubMed actualiza su índice. Si su resultado es truncado, recuperar las páginas restantes antes de afirmar que todos los éxitos de búsqueda fueron analizados.

La amplia consulta de concepto mantiene deliberadamente a los no juicios. La elegibilidad de los juicios es una decisión de selección separada. La indexación de tipo publicacional por sí sola puede ser incompleta, y un papel que menciona un ensayo aleatorizado previo no está necesariamente reportando uno nuevo.

## 3. Revisar y corregir la tabla de selección {/* #3-review-and-correct-the-screening-table */}

Cuando la respuesta se complete, abra **mindfulness-search-audit.csv** bajo **Generated**. Debe retener cada PMID recuperado, incluyendo registros excluidos e inciertos. Compruebe el título, revista, DOI y fecha contra el registro vinculado PubMed, a continuación, compare la decisión con el resumen.

![La tabla de candidatos salvada, incluidos los registros inciertos y excluidos](/img/open-science/workflow-extensions/focused-search-table.webp)

Revise cada razón de exclusión contra el resumen. PMID **38837133** es un ensayo aleatorizado primario de una psicoterapia más amplia; el ejemplo marca su elegibilidad mental **incierto**. PMID **34009273** es un metaanálisis y está excluido. Cuando una decisión necesita corrección, nombre el registro y número específico, pida al agente que actualice el CSV, y luego vuelva a abrir el archivo guardado.

![La revisión real de detección y cheques de archivo guardado en Notebook](/img/open-science/workflow-extensions/focused-search-notebook.webp)

El cuadro de ejemplo revisado contiene **20 incluye, excluidos 37 y registros inciertos 5**, contando todos los golpes **62**. Se trata de decisiones de examen a nivel abstracto, no de una declaración de que los juicios distintos de 20 han sido plenamente evaluados. Múltiples publicaciones pueden referirse al mismo juicio subyacente.

## 4. Mantenga la incertidumbre visible {/* #4-keep-uncertainty-visible */}

PMID **41418645** fue devuelto por el filtro 2019-2025 PubMed fecha de publicación, mientras que sus metadatos reportan una fecha de impresión **2026-01**. Mantenga la discrepancia y verifique el historial de la publicación antes de tomar una decisión final de fecha. No reemplace silenciosamente el año para adaptarse a la ventana de búsqueda.

Abra **mindfulness-search-notes.md** y compruebe que sus cuentas, regla de elegibilidad y limitaciones coinciden con el CSV. Mantenga la instantánea de metadatos originales junto con estos archivos para que cada decisión pueda ser rastreada a su fuente.

![La nota de búsqueda revisada con los recuentos de detección 20/37/5](/img/open-science/workflow-extensions/focused-search-notes.webp)

Descargue el <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">Cuadro de candidatos examinados</ExampleDownload> y <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">nota de búsqueda</ExampleDownload>. Los resúmenes completos no se redistribuyen aquí; seguir los enlaces fuente para inspeccionarlos.

Para una revisión formal de pruebas, resuelva los registros inciertos, obtenga textos completos, vincule los informes de los compañeros a sus juicios y organice un examen independiente adecuado. Utilice [el flujo de trabajo de lectura](core-reading-list.md) para construir una colección, o [extracción de pruebas](literature-review.md) después de que se establezca el conjunto de fuente y el acceso.
