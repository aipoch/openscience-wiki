---
title: "Combinar los murciélagos de búsqueda de literatura"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Combinar los murciélagos de búsqueda de literatura {/* #combine-literature-search-batches */}

<p className="example-label"><strong>Ejemplo práctico</strong> Interfaz de electrolitos de estado sólido e interfase</p>

Dos búsquedas a menudo regresan documentos superpuestos. Mantenga la procedencia de cada búsqueda, revise a los candidatos, luego importa ambos lotes en una colección con la reutilización basada en identificadores. Este ejemplo recupera dos auténticos lotes OpenAlex, retiene ocho discos de cada uno y termina con **15 referencias únicas** en la Biblioteca. Muestra la organización de metadatos; no se recuperaron ni evaluaron textos completos.

## 1. Ejecutar y grabar ambas búsquedas {/* #1-run-and-record-both-searches */}

En **Resource center → Connectors**, active **Gráfico de literatura** y configure su credencial OpenAlex si se solicita. Abrir un proyecto, iniciar una conversación y seleccionar un modelo conectado. La ejecución registrada usó Open-Science **0.30.1**, **Suscripción Codex / gpt-5.6-sol**. No se necesitan archivos PDF de origen.

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

Inspeccione la actividad Connector real para las consultas, fechas y recuentos devueltos. Las búsquedas registradas devolvieron **12 candidatos cada uno**, de los totales de los partidos de **94,620** y **15,355**. La tapa hace estos ejemplos consolidados, no exámenes exhaustivos. Ambos lotes provienen de OpenAlex; dos formulaciones de consulta no los hacen bases de datos independientes.

## 2. Inspeccionar las exportaciones antes de importar {/* #2-inspect-the-exports-before-importing */}

Open **electrolyte-merged.csv** bajo **Generated**. Revise los títulos retenidos, los DOIs y la membresía de origen contra las dos exportaciones de RIS y la auditoría de candidatos. La unión real tiene filas 15; DOI **10.1007/s41918-024-00212-1** ocurre en ambos lotes y se etiqueta **AtenciónB**.

![La unión salvada de ambos lotes de búsqueda, conservando la membresía de fuente](/img/open-science/workflow-extensions/batches-merged.webp)

Para la comparación, trim DOI whitespace, retire un prefijo opcional de URL DOI y compare caso-insensiblemente. Preserve los identificadores originales en el registro de origen. Los títulos similares por sí solos son pruebas insuficientes de que dos registros son idénticos; Los conflictos de identificadores no resueltos necesitan revisión.

Descargar <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">lote A</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">lote B</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">todas las decisiones de los candidatos 24</ExampleDownload> y <ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">el sindicato 15-row</ExampleDownload>. Estas son las exportaciones de la corriente registrada.

## 3. Importar el primer lote en una colección llamada {/* #3-import-the-first-batch-into-a-named-collection */}

1. Abrir **Library → New collection** y crear **Interfaces electrolíticas de estado sólido**.
2. Seleccione esa colección en la barra lateral antes de elegir **Import references**.
3. Elige `electrolyte-batch-a.ris`. Comprueba que **Import to** nombra la colección prevista.
4. Deje **When identifiers match → Reuse existing reference** seleccionado. Inspeccione **View details**, luego elija **Import references**.

![Previsualización de importación de primer nivel: ocho nuevas referencias en la colección seleccionada](/img/open-science/workflow-extensions/batches-import-a.webp)

En la biblioteca registrada, la primera importación completada con **8 Creado, 0 Reutilizado, 0 Omitido, 0 Failed**. Haga clic en **Done** y compruebe la colección. Si su biblioteca ya contiene registros coincidentes, su división creada/reutilizada puede diferir.

## 4. Importar el segundo lote y reutilizar el solapamiento {/* #4-import-the-second-batch-and-reuse-the-overlap */}

Con la misma colección seleccionada, importa `electrolyte-batch-b.ris`. La vista previa debe identificar los registros existentes antes de comprometer la importación. En esta carrera mostró **7 Nuevas referencias, 1 Existing, 0 Saltar**.

![Previsualización de la segunda parte identifica el papel compartido como Existing](/img/open-science/workflow-extensions/batches-import-b.webp)

Mantener **Reuse existing reference**, inspeccionar el título compartido, luego importar. Lea el resumen de la terminación real: **7 Creado, 1 Reutilizado, 0 Omitido, 0 Failed**. Reuse mantiene los metadatos existentes y añade la referencia coincidente al destino; no crea una segunda copia o descarga un PDF.

![Segunda importación completa con siete creado y uno reutilizado](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. Compruebe la colección resultante {/* #5-check-the-resulting-collection */}

Haga clic en **Done**. La colección contiene **Referencias 15**, coincidiendo con el sindicato DOI. Mantenga las dos exportaciones originales y la procedencia CSV para que un colega pueda reconstruir de donde vino cada candidato.

![La colección final con quince referencias](/img/open-science/workflow-extensions/batches-collection.webp)

Un partido de cuenta es un cheque útil, no un reemplazo para inspeccionar el DOI superpuesto y títulos representativos. Para añadir una ventana de publicación posterior, preservando la base de referencia, continúe con [actualizar una colección de literatura existente](update-literature.md).
