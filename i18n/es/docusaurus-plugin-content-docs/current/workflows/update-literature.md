---
title: "Actualizar una colección de literatura existente"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Actualizar una colección de literatura existente {/* #update-an-existing-literature-collection */}

<p className="example-label"><strong>Ejemplo práctico</strong> Transporte microplástico de agua dulce a través de dos ventanas de publicación</p>

Una actualización debe conservar la regla de búsqueda original y mostrar exactamente lo que se agregó. Esta repetición histórica primero construye una colección **2020–2022**, luego busca **2023–2025** con la misma consulta y filtros. La biblioteca real crece desde **Referencias 7 a 14**. Esta es una búsqueda manual, encuadernada; no está programada de vigilancia ni de revisión exhaustiva.

## 1. Definir y guardar la base de referencia {/* #1-define-and-save-the-baseline */}

Abrir un proyecto con un modelo conectado. Activar **Gráfico de literatura** en **Resource center → Connectors** y configurar OpenAlex si es necesario. Enviar:

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

Esta carrera devolvió **12 de los partidos de 3,643**, retenió **7** y excluyó **5**. Abrir **freshwater-search-plan.md** para comprobar los criterios y fechas antes de continuar. El plan guardado describe el estado antes de la actualización.

![Determinación de la búsqueda de referencia y registros retenidos](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

Revisar el nivel de evidencia: algunos candidatos sólo suministró título/metadatos, mientras que otros incluyeron un resumen que permitía la licencia. Las revisiones de la vía de transporte amplia se incluyen como contexto; su inclusión no prueba un resultado experimental específico del agua dulce.

## 2. Crear y poblar la colección {/* #2-create-and-populate-the-collection */}

Descargar <ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">de referencia RIS</ExampleDownload>. En **Library → New collection**, crear **Transporte microplásico de agua dulce**, seleccionarlo, luego elegir **Import references**. Seleccione el RIS y verifique el destino y el comportamiento coincidente antes de importar.

![Previsualización de importación de línea base para la colección llamada](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

La importación registrada terminada con **7 Creado, 0 Reutilizado, 0 Omitido, 0 Failed**. Haga clic en **Done** y confirme que la colección tiene siete referencias. Los partidos existentes en otra biblioteca pueden cambiar la división creada/reutilizada.

![La colección de referencia de siete referencias](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. Buscar en la siguiente ventana de fecha en la misma conversación {/* #3-search-the-next-date-window-in-the-same-conversation */}

Volver a la conversación del proyecto. Mantenga los archivos de referencia sin cambios y solicite una comparación explícita:

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

Esta actualización devolvió **12 de los partidos de 7,600**, con **Adiciones 7, superposiciones de referencia 0 y exclusiones 5**. Ambas búsquedas están truncadas a los candidatos 12. La clasificación de bases de datos y la cobertura pueden cambiar; los recuentos describen la carrera de septiembre 16, 2026.

![Auditoría de actualización guardada con adiciones y exclusiones](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

Compruebe los conjuntos DOI reales en lugar de subtraer totales. Ahorre el <ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">auditoría de la actualización</ExampleDownload> y <ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">Notas de actualización</ExampleDownload> fechados junto con la base de referencia.

## 4. Importación de adiciones en la colección existente {/* #4-import-additions-into-the-existing-collection */}

Descargar <ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">las adiciones RIS</ExampleDownload>. Seleccione **Transporte microplásico de agua dulce** en la Biblioteca y seleccione **Import references**. Mantenga **Reuse existing reference** para que un elemento ya presente pueda ser reutilizado de forma segura.

![La vista previa de importación de actualización que muestra siete adiciones](/img/open-science/workflow-extensions/freshwater-import-update.webp)

La importación real de actualización completada con **7 Creado, 0 Reutilizado, 0 Omitido, 0 Failed**. La colección ahora contiene **Referencias 14**. Esto está de acuerdo con la unión DOI normalizada de los dos conjuntos retenidos.

![La colección actualizada con catorce referencias](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

La base de referencia en sí no fue reescrita. Preserve su rango de fechas y registro de búsqueda para que los lectores posteriores puedan distinguir la base de evidencia original de la actualización. Apoyar una propuesta o una reclamación científica, recuperar y leer los textos completos pertinentes a continuación; La inclusión de metadatos por sí sola no es una evaluación de las pruebas. Para los lotes de la consulta superpuesta, vea [combinar los lotes de búsqueda](merge-literature-searches.md).

La copia de auditoría descargable omite resúmenes completos y sus campos de licencia; Se conservan identificadores, decisiones y razones. Inspeccione los resúmenes en las fuentes vinculadas.
