---
title: "Bases de datos científicos"
toc_max_heading_level: 2
last_update:
  date: '2026-09-24'
---

# Bases de datos científicos {/* #scientific-databases */}

Utilice esta página para elegir una fuente de datos, entender lo que puede devolver, y hacer sus herramientas disponibles en Open-Science. Para ejemplos de investigación paso a paso con capturas de pantalla y archivos de salida, vea [Flujos de investigación](#database-workflows).

<span id="data-source-catalog" />

## Bases de datos respaldadas {/* #supported-databases */}

Open-Science v0.33.1 incluye **27 data-source Connectors with 269 operations**. El Molecule Connector independiente añade dos operaciones, trayendo el registro completo a 271. Connector nombres a continuación coinciden con **Settings → Connectors**; cada familia puede exponer varias bases de datos. La inclusión de una fuente no significa que cada característica de su sitio web esté disponible.

| Conector | Fuentes | Operaciones | Úsalo para  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Química de moléculas pequeñas a través de PubChem, ChEBI, Rhea y BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Documentos, autores, citas, actualizaciones de DOI y registros de dataset/software. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Bibliografía biomédica a través de NCBI E-utilities, el convertidor de identificación PMC y Europa PMC — búsqueda, metadatos, artículos relacionados, búsqueda de citas, conversión de ID, texto completo y copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 13 | Identificadores genéticos/proteínas, descubrimiento de secuencias UniProt, Anotaciones GO y Reactome, y g:Enriquecimiento de generación genética. |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST, Clustal Omega | 20 | Anotación genoma, homología y secuencia; NCBI taxon/assembly/sequence identity; BLAST búsqueda y Clustal Omega alineación de secuencia múltiple. |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | Variaciones genéticas humanas — frecuencias de población de gnomAD/constricción, registros de ClinVar/búsqueda (NCBI directa), dbSNP, variantes estructurales y mitocondriales.  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | Ensayos clínicos de ClinicalTrials.gov — búsqueda, detalles, patrocinadores, investigadores, puntos finales y elegibilidad.  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | Bases de conocimiento de la genómica clínica: curaciones de ClinGen, evidencia clínica CIViC y Plataforma de objetivos abiertos.  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | Estructuras e interacciones moleculares — estructuras PDB, predicciones AlphaFold, entradas EMDB cryo-EM, complejos complejos Portales Complejos, redes de interacción IntAct.  |
| ChEMBL · `chembl` | ChEMBL | 6 | Compuestos bioactivos, fármacos, objetivos, bioactividad y mecanismos a través del ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | preimpresión bioRxiv/medRxiv — búsqueda por fecha/categoría, metadatos por DOI, enlaces de publicación de revistas, listados de fondos y estadísticas de plataforma.  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | Aplicaciones, etiquetas y estadísticas de corpus a través de openFDA.  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | Pruebas de asociación genética humana — GWAS Catalog, eQTL Catalogue, y portales PheWeb PheWAS (FinnGen, BioBank Japan).  |
| Expression · `expression` | GTEx | 12 | Expresión de tejido humano y eQTLs a través del Portal GTEx.  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | Arquitectura de dominio Protein, membresía familiar/clan, atlas de expresión y redes de interacción a través de InterPro/Pfam, el Atlas de Proteína Humana y STRING.  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | Registros de estudio de genómica del cáncer a través del cBioPortal REST API.  |
| RNA · `rna` | Rfam | 9 | Datos familiares de ARN no codificación (metadatos, alineamientos, modelos, estructuras) a través de Rfam.  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | Expresión, metabolomics, metagenomics and proteomics archives; ENA run discovery and FASTQ/submission inventories; Listas de archivos PRIDE. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Identidad de tipo celular, genes marcadores, conjuntos de datos fuente y tejidos a través de CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Genética-regulación de la genómica funcional — experimentos ENCODE/biosamples/files, perfiles de unión JASPAR TF y TFBS UniBind ChIP-seq.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Búsqueda de financiación-oportunidad (Grants.gov) y búsquedas de catálogo de anticuerpos (Registro Anticuerpo).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart atributo consultas y traducción de identificador.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 espacio químico depurable (CartBlanche22) — búsqueda compuesta por ZINC id, búsqueda exacta/similaridad de SMILES, resolución de código de proveedor, muestreo aleatorio, ubicaciones de estructura 3D para acoplamiento.  |
| GDC · `gdc` | NCI GDC | 5 | Proyectos de cáncer, casos, metadatos de archivos, etiquetas abiertas/controladas y manifiestos de transferencia; no descarga ni acceso. |
| Zenodo · `zenodo` | Zenodo | 2 | Conjunto de datos públicos, software y descubrimiento de publicaciones, metadatos e inventarios de archivos específicos de la versión; no subir ni descargar. |
| HMMER · `hmmer` | EMBL-EBI HMMER3 | 3 | Búsqueda de proteínas/profile/alineación específica del programa, estado de trabajo y resultados. |
| InterProScan · `interproscan` | EMBL-EBI InterProScan | 2 | Informes sobre el estado y el TSV para los puestos de anotación existentes; No hay presentación. |

Las herramientas Molecule offline están cubiertas en [Visores científicos](viewers.md). Para las operaciones exactas expuestas por cada fuente de datos, utilice el [Referencia de operación Connector](../reference/connector-operations.md).

<span id="choose-a-query-and-inspect-the-result" />

## ¿Qué puedes hacer? {/* #database-capabilities */}

| Tareas de investigación | Comience con | Producción típica |
| --- | --- | --- |
| Encontrar documentos, localizar citas y comprobar las relaciones DOI | Gráfico de literatura, PubMed, bioRxiv | Registros de literatura, identificadores, enlaces de citas y disponibilidad de texto completo |
| Encontrar genes o proteínas y comparar secuencias | Genes & Ontologies, Genomes | Cartografías identificativas, registros de proteínas, informes de FASTA y BLAST |
| Descubra los datos omics públicos e inspeccione los archivos disponibles | Omics Archives | Metadatos de estudio y funcionamiento e inventarios de archivos con ubicaciones de fuentes, tamaños y comprobaciones disponibles |
| Interpretar una lista de genes o inspeccionar una red de interacción | Genes & Ontologies, Anotación de Proteína | Tablas de enriquecimiento, anotaciones de ontología y registros de red |
| Verificar variantes, expresión y evidencia regulatoria | Variantes, Genómica Clínica, Genética Humana, Expresión, Regulación | Registros de fuentes con organismos, tejidos, construcción de referencia y campos de evidencia relevantes |
| Recuperar los registros de compuestos, estructuras o estudios clínicos | Química, ChEMBL, Estructuras " Interacciones, Ensayos Clínicos | Identificadores/propiedades químicas, registros de la estructura y metadatos de ensayo |

Para la conversión de identificador de lotes, **Genes & Ontologies** añade `submit_uniprot_id_mapping`, `get_uniprot_id_mapping_status` y `get_uniprot_id_mapping_results`. Guardar el ID de trabajo, encuestar por lo menos tres segundos aparte, y luego recuperar cada página de resultado. Preserve one-to-many mappings and explicit `failed_ids`; faltar de una página no significa inigualable. El servicio acepta identificadores de hasta 100,000 y expira los resultados después de hasta siete días. Ver [campos de mapeo exactos](../reference/connector-operations.md#submit_uniprot_id_mapping).

**Zenodo** expone metadatos de registro público sin autenticación. Mantenga el ID de registro específico de la versión y campos de acceso/license con el inventario de archivos. **GDC** expone metadatos públicos; a manifiesto no es autorización de descarga, y los archivos controlados requieren permiso GDC. [Operaciones de los PMA](../reference/connector-operations.md#family-24) · [Operaciones de Zenodo](../reference/connector-operations.md#family-25).

Una respuesta de una base de datos puede apoyar un paso de investigación; no descarga automáticamente los datos, agrega cada papel a la biblioteca de literatura o ejecuta un análisis completo. Especifique qué registros y archivos desea guardar.

## Conectar y comenzar a usar una base de datos {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. Habilitar el Connector incorporado {/* #1-enable-the-built-in-connector */}

1. Abrir **Settings → Connectors** y buscar la familia que se encuentra en la lista anterior, como **Omics Archives**.
2. Abre su detalle y expande **Tools**. Lea las entradas de la operación elegida, los límites de resultados y los requisitos de terceros.
3. Habilitar la disponibilidad para **Agente principal** y comprobar **Used by**. Utilice **Manage access** en el recurso para ajustar las asociaciones Main Agent y Specialist. Las políticas de aprobación de disponibilidad y de per-herramienta son controles separados.

![Datos de la herramienta Omics Archives que muestran las entradas de GEO y el alcance de metadatos solo](/img/open-science/guides-walkthrough/36-omics-tools.webp)

Estos conectores se construyen en; no necesita añadir un servidor personalizado para ellos. Para un servicio externo usted opera a sí mismo, vea [configuración personalizada Connector](../guides/connectors.md). Un Connector listado o habilitado no es prueba de que la autenticación o una consulta tuvo éxito.

<span id="connect-openalex-and-follow-citation-links" />

### 2. Agregar credenciales cuando la operación los requiera {/* #2-add-credentials-when-the-operation-requires-them */}

| Servicio o condición | Dónde configurarlo |
| --- | --- |
| OpenAlex | La clave opcional. Para configurar uno, abra **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**, validarlo, entonces guardar. |
| Consultas directas de la variante NCBI que requieren información de contacto | **Settings → Connectors → Manage credentials → Literature access**. Rellene **Contact email** y seleccionar **Save**. Una llave NCBI API es opcional. |
| Otra operación con un requisito credencial | Siga los requisitos de esa herramienta y los [Guía de credenciales](../guides/connectors.md). Ata la credencial al servicio previsto. |

Introduzca las teclas en la forma credencial, no en un aviso de investigación o un archivo de salida compartido. Configurar los requisitos para la operación seleccionada; el requisito de contacto-email arriba no significa que cada herramienta NCBI tiene el mismo requisito.

<span id="look-up-a-doi-and-its-related-research-records" />

El Gráfico de Literatura también ofrece `crossref_get_work`, `crossref_get_updates`, `datacite_search_records` y `datacite_get_record`. Estos cuatro métodos públicos no requieren la clave OpenAlex. Para las direcciones de citación OpenAlex, `openalex_citations` encuentra obras citando un trabajo, mientras que `openalex_references` encuentra las obras que cita. [Parámetros de Gráfico de Literatura](../reference/connector-operations.md#family-2).

<span id="start-with-one-known-identifier" />
<span id="actual-local-queries" />

### 3. Confirme el acceso con una pequeña consulta {/* #3-confirm-access-with-a-small-query */}

Habilitar **Genes & Ontologies**, abrir una conversación con un modelo conectado, y enviar:

<p className="example-label"><strong>Ejemplo</strong> Revisa un identificador de genes humanos conocido</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

Inspeccione el resultado real de la herramienta. Para el TP53 humano, consulte `query`, `symbol`, Entrez Gene **7157** y el nombre **proteína tumoral p53**. Retener múltiples coincidencias hasta que haya confirmado el organismo y grabar. Una consulta exitosa confirma esta operación en particular; no establece el acceso a todas las fuentes. [Campos de acción](../reference/connector-operations.md#query_genes).

## Seguir un flujo de trabajo de investigación {/* #database-workflows */}

Cada artículo a continuación incluye las entradas, pasos, capturas de pantalla de interfaz en inglés y salidas de ejemplo descargables.

<span id="ena-runs" />
<span id="omics-discovery" />

### Encontrar datos de omics públicos {/* #find-public-omics-data */}

[Encuentre datos de omics públicos y construya un inventario de archivos](../workflows/public-omics-data.md): empezar con una carrera conocida o un tema, inspeccionar los registros ENA y PRIDE, y guardar los lugares de origen y los cheques. La descarga de los datos sigue siendo un paso separado.

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### Compare una secuencia de proteínas {/* #compare-a-protein-sequence */}

[Encuentra una secuencia de proteínas y completa una búsqueda BLAST](../workflows/protein-sequence-search.md): recuperar UniProt FASTA, conservar el ID de trabajo BLAST, luego inspeccionar las alineaciones completadas, la cobertura de identidad y consulta.

<span id="gene-set-enrichment" />

### Analizar un gen candidato conjunto {/* #analyze-a-candidate-gene-set */}

[Ejecutar el enriquecimiento funcional para un conjunto de genes candidato](../workflows/gene-set-enrichment.md): elegir el organismo, identificadores y fondo, ejecutar g:Profiler, e interpretar probabilidades corregidas con versiones de origen.

<span id="reference-genome" />

### Confirme un genoma de referencia {/* #confirm-a-reference-genome */}

[Especies de verificación, genoma de referencia e identificadores cromosomas](../workflows/reference-genome-check.md): resolver el taxón, el montaje versionado y los alias cromosomas antes de unirse a los registros.

Para otras tareas, siga [registros de PubChem estructurados](../workflows/database-records.md), [comprobando los registros científicos](../workflows/cross-check-records.md) o [descubrimiento de literatura para una reunión de grupo](../workflows/journal-club.md).

<span id="handle-a-returned-record-empty-match-or-error" />
<span id="empty-partial-and-failed-responses" />

## Utilice correctamente los datos devueltos {/* #database-limits */}

- Retener las versiones de consulta, fuente, organismo, tejido, unidades y adhesión. Los registros de bases de datos, las predicciones y los resúmenes generados son diferentes tipos de pruebas.
- Cheque conteos devueltos, banderas de paginación y truncación antes de tratar una respuesta como completa. Cero coincidencias, una respuesta parcial y un error de solicitud necesitan diferentes acciones de seguimiento.
- Un inventario de archivos proporciona ubicaciones y metadatos. Descarga de bytes, cheques y análisis de los datos son operaciones separadas.
- Si una solicitud necesita credenciales, complete el formulario pertinente antes de volver a iniciar sesión. Para los límites de tarifas, siga el retraso del servicio; para los plazos, reducir el tamaño de la solicitud. Ver [Solución de problemas](../guides/troubleshooting.md).

### Frecuencias de población y redes de interacción {/* #string-network */}

Para `get_variant`, establece `include_populations: true` sólo cuando se necesitan detalles de la población. Retener el conjunto de datos y la compilación de referencia. Las observaciones de exoma y genoma siguen siendo separadas. Un valor no disponible es `null`, no cero; no se debe resumir la población o los estratos sexuales. Estas son frecuencias observadas, no filtrando frecuencias de alelo. [gnomAD parámetros](../reference/connector-operations.md#get_variant)

Desde v0.31.0, `get_string_network.nodes` incluye vecinos devueltos y entradas aisladas de mapeado. Una única entrada mapeada solicita a los vecinos; múltiples entradas mapeadas no se expanden. Filtrar `is_query` para recuperar nodos de entrada, y utilizar `queries` para todos los alias mapeados. `n_nodes` cuenta el gráfico; `n_mapped` cuenta las asignaciones de entrada. Actualizar scripts que equipararon a los dos antes de reutilizarlos. [Parámetros de STRING](../reference/connector-operations.md#get_string_network)

<span id="find-operation-parameters" />

## Encontrar parámetros de operación {/* #operation-parameters */}

Las listas [Referencia de operación Connector](../reference/connector-operations.md) requieren entradas, valores permitidos y llamadas exactas. Utilice esta página para elegir una fuente y conectarla; utilizar la referencia para los campos de una herramienta en particular.

Fuente de catálogo: [catálogo.ts](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/catalog.ts), [registro.ts](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/registry.ts).

## Búsquedas de secuencia y alineación {/* #sequence-tools */}

**HMMER** proporciona la secuencia de proteínas específicas para el programa, perfil-HMM y búsquedas de alineación. Elija el programa y la base de datos juntos, retenga el ID de trabajo y recupere los resultados sólo después de **SUCCESS**. [Operaciones de HMMER](../reference/connector-operations.md#family-26).

**InterProScan** recupera anotaciones para un trabajo existente presentado a través del servicio EMBL-EBI. Mantenga su ID de trabajo, verifique el estado al menos diez segundos de distancia, y busque el TSV después de **FINISHED**. Este Connector no puede presentar un nuevo trabajo. [Operaciones interproscan](../reference/connector-operations.md#family-27).

**Genomes → Clustal Omega** alinea al menos tres registros de proteínas, ADN o RNA FASTA. Configure el correo electrónico de contacto solicitado por el servicio, envíe una vez, retenga el ID de trabajo, luego revise el estado y ahorre la alineación devuelta. [Flujo de trabajo de alineación de secuencia múltiple](../workflows/multiple-sequence-alignment.md).
