---
title: "Encuentra una secuencia de proteínas y completa una búsqueda BLAST"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Encuentra una secuencia de proteínas y completa una búsqueda BLAST {/* #find-a-protein-sequence-and-complete-a-blast-search */}

<p className="example-label"><strong>Ejemplo práctico</strong> Encuentra la hemoglobina humana revisada alpha entrada y recuperar su secuencia</p>

Comience con el nombre humano del gen HBA1, recupere una proteína UniProt revisada y su FASTA canónica, luego presente una búsqueda BLAST e inspeccione el informe completado. Este ejemplo enseña la búsqueda y comparación de secuencias usando una proteína conocida.

Antes de comenzar, siga [Bases de datos científicos](../tools/databases.md#connect-database) para habilitar los conectores necesarios. Utilice un modelo conectado y un [Entorno de ejecución de Notebook](../guides/runtimes.md) disponible.

## 1. Encuentra la proteína y recupera su FASTA {/* #sequence-search */}

**Genes & Ontologies** puede descubrir entradas de UniProt antes de conocer una adhesión. Use `search_uniprot_entries` con un nombre gen, frase o organismo de nombre de proteína. `organism_id` coincide con el taxón especificado, mientras que `reviewed: true` selecciona Swiss-Prot y `false` selecciona entradas TrEMBL no revisadas. Omit `reviewed` para incluir ambos. Siga `next_cursor` sin cambiar los filtros o el tamaño de la página al continuar una consulta.

Activar **Genes & Ontologies**, abrir una sesión con un modelo conectado y el tiempo de ejecución Notebook disponible, luego enviar:

```text
Use Genes & Ontologies through Session Notebook. Call search_uniprot_entries
with gene HBA1, organism_id 9606, reviewed true and page_size 5.
Save the query and complete response as hba1-uniprot.json. Check the
returned organism and protein identity, then retrieve the canonical FASTA
for the matching accession with get_uniprot_entries. Add that response to
the JSON and save hba1-query.fasta. Keep everything in English. Preserve
missing or empty results; do not invent sequences.
```

Abra el JSON antes de usar el FASTA. Esta consulta devolvió **P69905 / HBA_HUMAN**, **Homo sapiens**, **Aminoácidos 142**, con nombres de genes **HBA1 y HBA2**. La respuesta identificó la liberación UniProt **2026_03**, `total_results: 1` y `has_more: false`. El encabezado de la FASTA preserva la adhesión y el organismo; la secuencia contiene residuos 142. Una consulta de nombre gen puede devolver una entrada de proteína asociada con más de un gen, por lo que no inferir un mapeo de uno a uno.

![Filtros de consulta UniProt y la entrada de proteína humana revisada](/img/open-science/v0320/uniprot-discovery.webp)

<ExampleDownload path="/examples/v0320/hba1-uniprot.json">Consulta UniProt y respuesta de FASTA</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-query.fasta">FASTA canónica</ExampleDownload>

## 2. Presentar y seguir el trabajo de BLAST {/* #blast-jobs */}

Para una búsqueda de similitud, active **Genomes** y utilice sus tres operaciones BLAST. La secuencia se envía al servicio público de NCBI; utilizar entrada pública o autorizada de otra manera.

1. Llame a `blast_submit` una vez con la secuencia, su `molecule_type` y una base de datos compatible. Mantenga el `rid` devuelto y la guía de votación. Para la proteína anterior, `molecule_type: protein` y `database: swissprot` seleccionan una búsqueda de proteínas.
2. Llama a `blast_status` por ese RID. Las solicitudes de la misma RID deben ser por lo menos **60 segundos separados**, y todas las solicitudes BLAST al menos **10 segundos separados**. Siga cualquier demora más larga devuelta por el servicio. `WAITING` significa que el trabajo todavía está apagado o funcionando; retener su RID en lugar de presentar de nuevo.
3. Después de `READY`, respeta el mismo intervalo antes de `blast_results`. Los formatos disponibles son `json2`, `xml2`, `text` y `tabular`. Los informes están vinculados a la MiB 2; solicitar menos golpes si es necesario. La salida tabular puede incluir comentarios y no es automáticamente una tabla CSV.
4. Compruebe la longitud de la consulta, una base de datos efectiva, adhesiones iguales, el intervalo de alineación, identidad y valor de E en el informe real. La similitud secuencial por sí sola no establece función. Una secuencia conocida de hemoglobina es útil para aprender los controles, no demostrando el descubrimiento de una proteína desconocida.

Si la presentación devuelve `blast_submission_unknown`, su aceptación es incierta: no vuelva a presentar automáticamente. Preserve la respuesta y cualquier RID. Nunca trate un recibo de presentación o estado `WAITING` como alineación completa. Las entradas exactas y las condiciones de retorno están en el [Referencia BLAST](../reference/connector-operations.md#blast_submit).

## 3. Abrir e interpretar el informe completo {/* #blast-report */}

Continuar el mismo ejemplo de proteína en la sesión anterior. Mantenga el recibo de la comunicación para que una solicitud posterior pueda reanudar el mismo trabajo. Enviar:

```text
Continue with the public P69905 FASTA retrieved above. Use Genomes through
Session Notebook. If this session already has a BLAST RID, resume that RID;
otherwise call blast_submit once with molecule_type protein, database
swissprot and hitlist_size 5, then save the receipt. Space requests for the
same RID by at least 60 seconds and follow any longer server delay. Check
blast_status; if it is still WAITING, keep the RID for a later check rather
than submitting again. After READY, wait the required interval and retrieve
blast_results in json2 format. Save hba1-blast-raw.json, hba1-blast-hits.csv
and hba1-blast-results.md. Include the actual database, query length,
accessions, alignment coordinates, identity counts and E-values. Explain
the coverage and identity calculations. Keep everything in English and
preserve actual errors or empty results. Never invent alignments.
```

![BLAST recibo de la comunicación con el RID y el intervalo mínimo de votación](/img/open-science/v0320/blast-submitted.webp)

Después de que el informe esté listo, abra **hba1-blast-results.md** y compare su tabla con **hba1-blast-raw.json**. Este ejemplo utilizó **BLASTP 2.17.0+**, con **swissprot** confirmado por el informe, una consulta **142-amino-acid** y **5 hits**:

| Adhesión | Residuos idénticos / longitud de alineación | Cobertura de consultas | E-valor |
|---|---:|---:|---:|
| P69905 | 142/142 (100%) | 100% | 1.99033e-100 |
| P01923 | 140/141 (99.29%) | 99.30% | 1.06845e-98 |
| Q9TS35 | 140/142 (98.59%) | 100% | 2.38346e-98 |
| P06635 | 139/142 (97.89%) | 100% | 3.57742e-98 |
| P01924 | 138/141 (97.87%) | 99.30% | 3.00466e-97 |

![Informe BLAST completado con cinco éxitos reales, cobertura de consulta y cálculos de identidad](/img/open-science/v0320/blast-results.webp)

Para cada primer HSP, la identidad es el recuento idéntico dividido por longitud de alineación. La cobertura de las consultas es el lapso de consulta-coordinado dividido por 142. Para P01923, el lapso de consulta es 2-142: la cobertura es 141/142 = 99.30%, mientras que la identidad es 140/141 = 99.29%. Los dos porcentajes responden a diferentes preguntas; Tampoco es la probabilidad de que una asignación de funciones sea correcta.

<ExampleDownload path="/examples/v0320/hba1-blast-results.md">Informe completo</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-hits.csv">Mesa de cinco asientos</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-raw.json">Informe NCBI JSON2</ExampleDownload>

El golpe superior P69905 es la secuencia de entrada en sí, por lo que su identidad y cobertura 100% proporcionan un cheque de secuencia conocida. Los otros éxitos muestran secuencias similares, no un nuevo descubrimiento funcional. Retener el informe y la consulta con la tabla de resultados; una versión posterior de la base de datos puede cambiar la lista de éxitos.
