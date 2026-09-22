---
title: "Especies de verificación, genoma de referencia e identificadores cromosomas"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Especies de verificación, genoma de referencia e identificadores cromosomas {/* #check-species-reference-genome-and-chromosome-identifiers */}

<p className="example-label"><strong>Ejemplo práctico</strong> Identificar GRCh38.p14 cromosoma 1</p>

Confirme el organismo, el montaje versionado y alias cromosomas antes de combinar registros de diferentes bases de datos. La salida es una tabla de identidad para un cromosoma, con las respuestas de origen originales.

Antes de comenzar, siga [Bases de datos científicos](../tools/databases.md#connect-database) para habilitar los conectores necesarios. Utilice un modelo conectado y un [Entorno de ejecución de Notebook](../guides/runtimes.md) disponible.

## 1. Consultar el organismo, el ensamblaje y el cromosoma {/* #reference-genome */}

1. Activar **Genomes** en **Settings → Connectors**. Abra una sesión con un modelo conectado y tiempo de ejecución Notebook disponible. Este ejemplo v0.31.1 utilizó **Codex subscription**.
2. Consultar el organismo, montaje y secuencia **versionado** en ese orden. Enviar:

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

## 2. Compare los identificadores devueltos {/* #compare-identifiers */}

Abra las notas y compare los IDs devueltos a través de los tres archivos JSON. Las tres llamadas tuvieron éxito en este ejemplo.

![Tres llamadas NCBI reales y el taxón devuelto e identidad de reunión](/img/open-science/v0311/ncbi-notes.webp)

| Chequee | Resultado de este ejemplo |
| --- | --- |
| Organismo | Homo sapiens, TaxID **9606**; un partido, `ambiguous: false` |
| Reunión solicitada/actual | **GCF_000001405.40**, **GRCh38.p14**, nombre UCSC **hg38** |
| Junta de GenBank Pareada | **GCA_000001405.29**; los registros devueltos reportan diferencias de RefSeq |
| Chromosome 1 alias | **1**, **chr1**, RefSeq **NC_000001.11**, GenBank **CM000663.2** |
| Secuencia seleccionada | **248956422 bp**, Asamblea Primaria; un partido, `matches_truncated: false` |

![Respuesta original del cromosoma-1 con alias versionados y cuenta del partido](/img/open-science/v0311/ncbi-aliases.webp)

## 3. Retener el cuadro de identidad y los registros de fuentes {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Notas de consulta</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Tabla de identidad</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Respuesta del taxón</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Respuesta de la Asamblea General</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Respuesta a la secuencia</ExampleDownload>

Se completó la consulta de **un cromosoma seleccionado**, no la exportación de todas las secuencias del ensamblaje. Al cambiar la consulta, conserve las coincidencias ambiguas y los indicadores de truncamiento. El nombre de un ensamblaje no sustituye su número de acceso con versión. Que se devuelva el número actual no autoriza a reemplazar silenciosamente una versión histórica solicitada. Los alias describen nombres dentro de un ensamblaje; no convierten coordenadas entre ensamblajes. [Entradas exactas](../reference/connector-operations.md#ncbi_get_assembly_info)
