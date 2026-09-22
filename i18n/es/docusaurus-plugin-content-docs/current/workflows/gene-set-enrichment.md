---
title: "Ejecutar el enriquecimiento funcional para un conjunto de genes candidato"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Ejecutar el enriquecimiento funcional para un conjunto de genes candidato {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>Ejemplo práctico</strong> Una lista de genes de ADN-daño humano seleccionada intencionalmente</p>

Convierta una lista de genes definida en una tabla de procesos biológicos enriquecidos y caminos, conservando mapas de identificadores, antecedentes estadísticos y versiones de origen.

Antes de comenzar, siga [Bases de datos científicos](../tools/databases.md#connect-database) para habilitar los conectores necesarios. Utilice un modelo conectado y un [Entorno de ejecución de Notebook](../guides/runtimes.md) disponible.

Este ejemplo v0.31.1 utiliza símbolos de genes públicos 11 para demostrar g:Profiler. Fueron elegidos por sus funciones biológicas conocidas, por lo que se espera el enriquecimiento. No son resultados diferenciales-expresión del proyecto GSE60450 o evidencia de un descubrimiento imparcial.

## 1. Define la lista de genes y los ajustes de análisis {/* #gene-set-enrichment */}

1. En **Settings → Connectors**, haga que **Genes & Ontologies** esté disponible para el agente. Abra una sesión con un modelo conectado y un tiempo de ejecución Notebook disponible.
2. Especifique el organismo, identificadores de genes, fuentes de datos y antecedentes estadísticos. Para datos experimentales reales, justifique el fondo usando genes que podrían haber sido seleccionados por el experimento. Este tutorial utiliza explícitamente todos los genes anotados, no un universo personalizado de genes medidos.
3. Envíe el siguiente aviso. Mantenga la llamada de búsqueda y enriquecimiento de la fuente en el mismo período de sesiones y ahorre sus resultados reales.

```text
Use Genes & Ontologies through Session Notebook for an English g:Profiler
tutorial. The deliberately selected gene list is TP53, ATM, ATR, CHEK1,
CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
First call list_enrichment_sources with organism hsapiens.
Then call enrich_gene_set with these genes, organism hsapiens,
sources GO:BP and REAC, domain_scope annotated,
correction_method fdr, and user_threshold 0.05.
Save the full response as dna-damage-enrichment.json, all returned terms
as dna-damage-enrichment.csv, and query, source versions, mappings,
background and limitations as dna-damage-enrichment-notes.md.
Retain unmapped, ambiguous and duplicate identifiers. Treat mapped_genes
as the returned mapping object. Report errors instead of inventing results.
This is not differential-expression evidence or evidence of regulation direction.
```

## 2. Verificar identificadores y versiones de origen {/* #identifier-check */}

Abra las notas generadas y compruebe los recuentos de consulta y cartografía. Esta ejecución mapeó identificadores **11/11**, con identificadores **0** no marcados, ambiguos o duplicados. Grabó **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO clases **2026-01-23** y Reactome clases **2026-03-20**. Una versión posterior del servicio puede devolver diferentes términos.

![Consultas en inglés guardadas, antecedentes, versiones de fuentes y cheques de identificación](/img/open-science/v0311/enrichment-notes.webp)

## 3. Inspeccionar la tabla de enriquecimiento {/* #enrichment-results */}

Abra el CSV y compare con el JSON. Esta carrera devolvió **891 términos** en FDR 0.05. La vista previa muestra sólo sus primeras filas 100; ese límite de visualización no es el recuento total de resultados. Retain `source`, `native`, corregió `p_value`, `intersection_size`, `query_size` y `effective_domain_size` al interpretar un término.

![Tabla de enriquecimiento real con probabilidades corregidas y tamaños de dominio](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Notas de análisis</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">Todas las filas de resultado 891</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Respuesta completa</ExampleDownload>

`background_size: null` significa que no se presentó una lista de antecedentes personalizada; no significa un universo estadístico de genes cero. Utilice el tamaño de dominio efectivo por término. El enriquecimiento no establece la implicación causal, la expresión diferencial o la regulación de arriba/abajo. Ver [parámetros de operación](../reference/connector-operations.md#enrich_gene_set).
