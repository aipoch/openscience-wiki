---
title: "Bases de datos científicos"
toc_max_heading_level: 2
last_update:
  date: '2026-10-08'
---

# Bases de datos científicos {/* #scientific-databases */}

Utilice esta página para elegir una fuente de datos, entender lo que puede devolver, y hacer sus herramientas disponibles en Open-Science. Para ejemplos de investigación paso a paso con capturas de pantalla y archivos de salida, vea [Flujos de investigación](#database-workflows).

<span id="data-source-catalog" />

## Bases de datos respaldadas {/* #supported-databases */}

Open-Science v0.35.1 incluye **33 data-source Connectors with 341 operations**. El Molecule Connector independiente añade dos operaciones, trayendo el registro completo a 343. Connector nombres a continuación coinciden con **Settings → Connectors**; cada familia puede exponer varias bases de datos. La inclusión de una fuente no significa que cada característica de su sitio web esté disponible.

| Conector | Fuentes | Operaciones | Úsalo para  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Química de moléculas pequeñas a través de PubChem, ChEBI, Rhea y BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Documentos, autores, citas, actualizaciones de DOI y registros de dataset/software. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Bibliografía biomédica a través de NCBI E-utilities, el convertidor de identificación PMC y Europa PMC — búsqueda, metadatos, artículos relacionados, búsqueda de citas, conversión de ID, texto completo y copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler, Enrichr | 15 | Identificadores genéticos/proteínas, descubrimiento de secuencia UniProt, Anotaciones GO y Reactome, y g:Enriquecimiento de conjunto de genes y Enrichr. |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST, Clustal Omega | 20 | Anotación genoma, homología y secuencia; NCBI taxon/assembly/sequence identity; BLAST búsqueda y Clustal Omega alineación de secuencia múltiple. |
| Variantes · `variants` | gnomAD, ClinVar, dbSNP, MaveDB | 21 | Frecuencias demográficas, registros clínicos y puntajes funcionales específicos para ensayos, cartografías y experimentos. |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | Ensayos clínicos de ClinicalTrials.gov — búsqueda, detalles, patrocinadores, investigadores, puntos finales y elegibilidad.  |
| Genómica clínica · `clinical-genomics` | ClinGen, CIViC, Open Targets, ClinPGx | 30 | Bases clínicas de conocimiento de la genómica: curaciones ClinGen, evidencia clínica CIViC y Plataforma de objetivos abiertos, además de registros farmacógenos ClinPGx. |
| Estructuras & Interacciones · `structures` | PDB, AlphaFold, EMDB, Portal Complejo, IntAct | 17 | Estructuras e interacciones moleculares — estructuras PDB, predicciones AlphaFold, entradas EMDB cryo-EM, complejos complejos Portales Complejos, redes de interacción IntAct.  |
| ChEMBL · `chembl` | ChEMBL | 6 | Compuestos bioactivos, fármacos, objetivos, bioactividad y mecanismos a través del ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | preimpresión bioRxiv/medRxiv — búsqueda por fecha/categoría, metadatos por DOI, enlaces de publicación de revistas, listados de fondos y estadísticas de plataforma.  |
| Regulación de drogas · `drug-regulatory` | openFDA | 10 | Drug@FDA, etiquetas, informes de eventos adversos de FAERS y memorias de drogas. |
| Genética humana · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 15 | Pruebas de asociación genética humana — GWAS Catalog, eQTL Catalogue, y portales PheWeb PheWAS (FinnGen, BioBank Japan).  |
| Expresión · `expression` | GTEx, Bgee | 16 | Expresión de tejido GTEx humano y eQTLs; Bgee expresión de referencia de especies cruzadas. |
| Anotación de proteínas · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 14 | Arquitectura de dominio Protein, membresía familiar/clan, atlas de expresión y redes de interacción a través de InterPro/Pfam, el Atlas de Proteína Humana y STRING, incluyendo enriquecimiento de interacción de red. |
| Modelos de cáncer · `cancer-models` | cBioPortal | 10 | Estudios, mutaciones, número de copia, muestras, pacientes, atributos clínicos y expresión de perfil molecular. |
| RNA · `rna` | Rfam | 9 | Datos familiares de ARN no codificación (metadatos, alineamientos, modelos, estructuras) a través de Rfam.  |
| Archivos de Omics · `omics-archives` | ArrayExpress, GEO, MetaboLights, Metabolomics Workbench, MGnify, PRIDE, ENA | 28 | Omics study/run metadata and file inventories; muestras metabolomicas, factores, análisis y registros compuestos. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Identidad de tipo celular, genes marcadores, conjuntos de datos fuente y tejidos a través de CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Genética-regulación de la genómica funcional — experimentos ENCODE/biosamples/files, perfiles de unión JASPAR TF y TFBS UniBind ChIP-seq.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Búsqueda de financiación-oportunidad (Grants.gov) y búsquedas de catálogo de anticuerpos (Registro Anticuerpo).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart atributo consultas y traducción de identificador.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 espacio químico depurable (CartBlanche22) — búsqueda compuesta por ZINC id, búsqueda exacta/similaridad de SMILES, resolución de código de proveedor, muestreo aleatorio, ubicaciones de estructura 3D para acoplamiento.  |
| GDC · `gdc` | NCI GDC | 5 | Proyectos de cáncer, casos, metadatos de archivos, etiquetas abiertas/controladas y manifiestos de transferencia; no descarga ni acceso. |
| Zenodo · `zenodo` | Zenodo | 2 | Conjunto de datos públicos, software y descubrimiento de publicaciones, metadatos e inventarios de archivos específicos de la versión; no subir ni descargar. |
| HMMER · `hmmer` | EMBL-EBI HMMER3 | 3 | Búsqueda de proteínas/profile/alineación específica del programa, estado de trabajo y resultados. |
| InterProScan · `interproscan` | EMBL-EBI InterProScan | 3 | Presentar secuencias de proteínas, comprobar el estado de anotación-job y recuperar los informes TSV. |
| Pathway Commons · `pathway-commons` | Pathway Commons / Reactome | 4 | Caminos de búsqueda, rutas de arriba, consultas gráficas y exportaciones de submodelo BioPAX. |
| Alliance Genome Resources · `alliance` | Alliance of Genome Resources | 8 | genes humanos y modelo-organismo, ortologs, modelos de enfermedades, fenotipos, alelos y expresión. |
| CELLxGENE Discover · `cellxgene-discover` | CELLxGENE Discover | 9 | Colecciones de células individuales y conjuntos de datos, versiones publicadas, formatos de archivo, tamaños y URLs de descarga. |
| Cellosaurus · `cellosaurus` | Cellosaurus | 2 | Encontrar nombres de línea celular y sinónimos, luego inspeccionar identidad de adhesión y anotaciones de calidad. |
| Monarch Initiative · `monarch` | Monarch Initiative | 2 | Asociaciones de enfermedad/gene a fenotipo con organismo y evidencia de apoyo. |
| IEDB · `iedb` | Immune Epitope Database | 8 | Epitopes, antígenos, T-cell, B-cell y MHC, evidencia TCR/BCR y publicaciones de origen. |

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

## Datos monocelulares, modelo-organismo y efectos de variante {/* #single-cell-model-organisms */}

Busque las entradas de abajo en **Settings → Connectors**, active la disponibilidad para **Agente principal**, luego describa el organismo, la pregunta de investigación y los registros para retener en su conversación. Estas nuevas operaciones leen datos públicos sin un servidor MCP personalizado, tecla API o correo electrónico de contacto NCBI. Otros servicios en el mismo Connector pueden tener diferentes requisitos.

| Entrada | ¿Qué puede hacer? | Cómo utilizar los resultados |
| --- | --- | --- |
| CELLxGENE Discover | Encontrar conjuntos de datos de células individuales por organismo, tejido, enfermedad, ensayo o tipo celular; inspeccionar versiones e inventarios de archivos | Los filtros de ontología usan etiquetas exactas o IDs y se combinan con AND. Retener dataset_version_id para una publicación fija; dataset_id se resuelve a la versión actual. Devoluciones disponibles descarga URLs, sin descargar archivos o consultar matrices de expresión Census. Utilice el CellGuide separado para descripciones y marcadores de tipo celular. |
| Alliance Genome Resources | Query human, mouse, rat, fly, gusano, cebrafish, levadura y genes de rana, ortologs, modelos de enfermedades, fenotipos y expresión | Busque y confirme el organismo antes de seguir los identificadores de genes devueltos. Retener evidencia y rigor ortológico; un fenotipo de organización modelo no es una conclusión de la enfermedad humana. |
| Variantes → MaveDB | Encontrar conjuntos de puntuación de efectos de la variante, métodos de ensayo, páginas de puntuación CSV y mapas VRS existentes | Mantenga el URN, licencia, métodos de ensayo y calibración de puntuación. Las puntuaciones funcionales no son clasificaciones de patogenicidad clínica. CSV utiliza la paginación de inicio/limit y el texto devuelto todavía necesita guardar a un archivo. Mapping retrieval no realiza el levantamiento. |
| Archivos de Omics → Metabolomics Workbench | Estudios de búsqueda; inspeccionar muestras, factores, análisis y metabolitos mediante la adhesión al ST; buscar estructuras compuestas y referencias cruzadas | Seleccione resumen, factores, análisis o metabolitos con sección. Resolver nombres compuestos a través de PubChem en identificadores compatibles primero. Estas operaciones no descargan matrices de medición crudas. |

Filtro CELLxGENE y paginación se ejecutan localmente sobre el catálogo aguas arriba trazado para cada solicitud; el catálogo puede cambiar entre solicitudes. Use IDs de la versión para retener una publicación. Un tamaño de archivo no reportado es -1, no cero bytes. Preserve valores perdidos y definiciones de ensayo en MaveDB y resultados Workbench también.

Vea las entradas exactas para [CELLxGENE Discover](../reference/connector-operations.md#family-30), [Alliance](../reference/connector-operations.md#family-29), [MaveDB](../reference/connector-operations.md#mavedb_search_score_sets) y [Metabolomics Workbench](../reference/connector-operations.md#workbench_search_studies).

## Líneas celulares, fenotipos y evidencia inmune {/* #cell-lines-phenotypes-immunity */}

Habilitar **Cellosaurus**, **Monarch Initiative** o **IEDB** en **Settings → Connectors** y hacerlo disponible a **Agente principal**. Estas operaciones consultan registros públicos sin un servidor personalizado o una tecla API.

| Entrada | Qué pedir | Qué preservar |
| --- | --- | --- |
| Cellosaurus | Buscar un nombre de línea celular/sinónimo, luego recuperar la adhesión CVCL devuelto o RRID | Especies, identidad, sinónimos y anotaciones de contaminación/identificación. La búsqueda toma una frase literal, no una consulta de Solr cruda. Las anotaciones de calidad perdidas no certifican la línea celular. |
| Monarch Initiative | Asociaciones de fenotipo de enfermedad o gen que utilizan RIEs canónico, como MONDO:0007254 o HGNC:11998 | Organismo, fenotipo, fuente y evidencia. Las alisas no se convierten automáticamente; resolver los identificadores primero. Un partido directo se refiere a identificador que coincide, no confirmación experimental. |
| IEDB | Epitopes o antígenos, o un ensayo específico de células T, células B o MHC | Se requiere al menos un filtro biológico/evidencia; La paginación por sí sola es insuficiente. Usar antigen_iri o uniprot_accession, no ambos. Método de ensayo, resultado, unidades y publicación; una observación de elución MHC no es una medición de afinidad. |

Un registro de epitope/antigeno agregado puede combinar las observaciones de diferentes experimentos. Cuando los filtros deben estar satisfechos por el mismo experimento, consulta la operación correspondiente de ensayo. Cero coincidencias no establecen un hallazgo biológico negativo. [Parámetros Cellosaurus](../reference/connector-operations.md#family-31) · [Parámetros de monarca](../reference/connector-operations.md#family-32) · [Parámetros IEDB](../reference/connector-operations.md#family-33).

## Encuentra matrices GEO y estructuras de secuencia {/* #geo-matrices-pdb-sequences */}

**Omics Archives → geo_get_matrix_files** descubre los archivos oficiales de la serie GEO Matrix y cuenta generados por NCBI/FPKM/TPM/annotation. Devuelve las ubicaciones de archivos; no descarga sus bytes. **geo_get_series** sigue siendo una búsqueda de metadatos.

Después de obtener una matriz, **geo_preflight_matrix** comprueba el texto ya leído, descomprimido hasta 8 MiB. No tiene acceso a la red ni al sistema de archivos. Mantenga los identificadores GSM y metadatos de plataforma para que las muestras puedan ser mapeados por ID en lugar de posición de columna. Establecer **completo: falso** para una vista previa; sólo pasar **completo: verdadero** para todo el archivo. Una vista previa no puede establecer dimensiones enteras. No alimentar un archivo comprimido, matriz escasa o archivo HDF5 en el comprobador de texto. Ver [matriz de descubrimiento](../reference/connector-operations.md#geo_get_matrix_files) y [texto anterior](../reference/connector-operations.md#geo_preflight_matrix).

**Structures & Interactions → pdb_search_sequence** acepta una secuencia de proteínas de residuos 25–10,000, como secuencia cruda o un registro FASTA. Los umbrales de identidad y cobertura de consultas son fracciones de 0 a 1. La cobertura de consulta devuelta describe la alineación a la consulta; no es cobertura de estructura experimental. El total aguas arriba precede al filtrado de cobertura local, y un escaneo atado puede omitir los partidos posteriores. La operación encuentra registros de la estructura sin descargar coordenadas. Ver [entradas exactas y límites de escaneo](../reference/connector-operations.md#pdb_search_sequence).

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

### Inspeccione una red de vías {/* #inspect-a-pathway-network */}

[Inspeccione una vía y su red de interacción](../workflows/inspect-pathway.md): encontrar una vía Reactome humana a través de Pathway Commons, preservar su URI devuelto, exportar las interacciones y distinguir una red seleccionada de evidencia de actividad de la vía.

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

Fuente de catálogo: [catálogo.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/catalog.ts), [registro.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/registry.ts).

## Búsquedas de secuencia y alineación {/* #sequence-tools */}

**HMMER** proporciona la secuencia de proteínas específicas para el programa, perfil-HMM y búsquedas de alineación. Elija el programa y la base de datos juntos, retenga el ID de trabajo y recupere los resultados sólo después de **SUCCESS**. [Operaciones de HMMER](../reference/connector-operations.md#family-26).

**InterProScan** es compatible con la presentación de proteínas, el estado de trabajo y la recuperación de anotación TSV de v0.35.1. Siga [Sumisión InterProScan](#interproscan-submit) para la configuración y los pasos.

**Genomes → Clustal Omega** alinea al menos tres registros de proteínas, ADN o RNA FASTA. Configure el correo electrónico de contacto solicitado por el servicio, envíe una vez, retenga el ID de trabajo, luego revise el estado y ahorre la alineación devuelta. [Flujo de trabajo de alineación de secuencia múltiple](../workflows/multiple-sequence-alignment.md).

## Enrichr, STRING y ClinPGx {/* #enrichment-pharmacogenomics */}

- **Genes & Ontologies → Enrichr**: lista las bibliotecas actuales, luego consulta el enriquecimiento de conjunto de genes para funciones, factores de transcripción, perturbaciones, drogas, enfermedades, tejidos o tipos de células. Seleccione una biblioteca apropiada para el organismo y la pregunta, y retenga su nombre, fondo y valores P ajustados.
- **Protein Annotation → STRING**: prueba si una red de proteínas tiene más interacciones de lo esperado desde su fondo. Esto hace una pregunta diferente del camino de la sobrerepresentación; su valor de red P no es una prueba de ruta. Siga el [flujo de trabajo de enriquecimiento](../workflows/gene-set-enrichment.md#enrichr-string).
- **Clinical Genomics → ClinPGx**: recuperar anotaciones de drogas, genes o variantes, pautas, etiquetas regulatorias y frecuencias poblacionales. Resuelva primero los identificadores, provea los campos requeridos por la operación, y conserva fuentes originales y niveles de evidencia. Esto recupera registros de investigación; no produce automáticamente un plan de tratamiento individual.

Habilitar el Connector relevante para el agente activo en **Settings → Connectors**. Estas entradas incorporadas no requieren un servidor MCP personalizado. Vea el [referencia a la operación](../reference/connector-operations.md) para campos exactos y requisitos condicionales.

## Caminos, expresión y datos clínicos {/* #pathway-expression-clinical */}

Permite a la familia correspondiente en **Settings → Connectors**, luego dígale al agente el organismo, fuente, identificadores y alcance previsto. Estas adiciones utilizan conectores incorporados; no se requiere un servidor MCP personalizado.

| Entrada | ¿Qué puede hacer? | Conexión e interpretación |
| --- | --- | --- |
| Pathway Commons | Caminos de búsqueda, lista de caminos superiores, rutas de consulta entre genes o exportar un submodel | - Servicio público; retener la URI devuelta, organismo y fuente. Las consultas de Gráficos difieren de las pruebas de enriquecimiento. Sigue a la [flujo de trabajo de interacción de caminos](../workflows/inspect-pathway.md). |
| Expresión → Bgee | Transspecies presentes/absente llamadas, puntajes normalizados, consultas SPARQL atada y enlaces de descarga | Descubre primero las especies y conserva el ID de taxonomía NCBI. SPARQL requiere gen, especies y tejido. Las llamadas de base saludables de tipo salvaje no son expresiones diferenciales; Los enlaces de descarga no se descargan archivos. |
| Modelos de cáncer → cBioPortal | Lista muestras/pacientes y atributos clínicos de consulta o expresión mRNA/proteína | Seleccione un estudio, descubra sus perfiles y elija la medición/normalización. Identificación de suministro que coincida con el nivel de muestra/paciente clínico; Los datos moleculares necesitan genes explícitos y exactamente uno de sample_ids o sample_list_id. Las filas perdidas no son ceros. |
| Regulador de drogas → openFDA | Informes de búsqueda/cuenta de los FAERS y memorias de los medicamentos de búsqueda | Fechas y productos de labranza y conservar la información de la truncación. Los recuentos de los informes no son incidencia o evidencia causal. Los cubos multivalorados pueden superponerse; su suma no es un informe único total. |
| Archivos de Omics → MGnify | Lista de resultados de la adhesión al análisis MGYA | Devoluciones tipo, categoría, URL y tamaño de arriba cuando se reporta. No se descargan bytes de archivos; tamaños o URLs perdidos permanecen nulos. |

Vea el [Referencia de operación Connector](../reference/connector-operations.md) para campos, condiciones y ejemplos requeridos.

## Encontrar archivos de la estadística de sumario GWAS {/* #gwas-summary-statistics */}

Activar **Genética Humana** para Main en **Settings → Connectors**. Pida el descubrimiento de la estadística sumaria con el **Adhesión de GCST** del estudio, y retenga las URL de archivo original/armonizado, metadatos y genoma de referencia declarado. La búsqueda pública no requiere una llave API.

`gwas_get_summary_statistics` lista archivos de estudio y lee metadatos YAML disponibles; no descarga grandes mesas de asociación. Sus definiciones de columna GWAS-SSF describen el estándar, no un encabezado de archivo inspeccionado. Descargue el archivo deseado por separado y compruebe sus columnas reales, genoma de construcción, efecto de alelos y unidades antes del análisis. Los éxitos significativos de las asociaciones no son un sustituto de las estadísticas completas de resumen. [Parámetros y salida](../reference/connector-operations.md#gwas_get_summary_statistics).

## Presentar una secuencia de proteínas a InterProScan {/* #interproscan-submit */}

1. Activar **InterProScan** para Main en **Settings → Connectors**. En **Settings → Credentials → Literature access**, guarde el correo electrónico de contacto válido utilizado para trabajos EMBL-EBI; no se requiere llave API.
2. Proporcione una secuencia de proteínas o registros de proteína FASTA únicos y solicite sumisión una vez. La secuencia y el correo electrónico de contacto se envían a EMBL-EBI. Una solicitud acepta hasta registros 1,000, residuos 10,000 por secuencia y un cuerpo de solicitud codificado 4 MiB.
3. Retenga el **job_id** devuelto. **SUBMITTED** con **ready: false** es un recibo, no un resultado de anotación. Revise **estado de la situación** al menos diez segundos de distancia; la encuesta no es automática.
4. Después de **FINISHED**, solicite **resultados** y guarde el TSV completo antes de que el resultado remoto expire. Una respuesta sobre el límite de recuperación de 2 MiB falla en lugar de devolver silenciosamente un informe truncado.
5. Revise los identificadores de proteínas, aplicaciones de origen y coordenadas inclusivas basadas en 1. No se intercambian los puntos de las diferentes aplicaciones de los miembros; ningún golpe no prueba que una proteína carece de una función.

Evite la presentación duplicada después de un tiempo: recuperar un ID de trabajo conocido primero. Cancelar una solicitud local no cancela un trabajo remoto enviado. Ver [parámetros de presentación, estado y resultados](../reference/connector-operations.md#family-27).

## Encontrar TCR y BCR evidencia en IEDB {/* #iedb-receptors */}

Habilitar **IEDB** para Main y solicitar **search_tcrs** o **search_bcrs** con al menos un filtro biológico o de evidencia. La pagación por sí sola es insuficiente. Use `sequence` para la secuencia **epitope**; Secuencias `chain1_cdr3` y `chain2_cdr3` del receptor del filtro CDR3. Estas búsquedas públicas no necesitan llave API.

Mantenga el ID del grupo receptor, cadenas, identificados de ensayo y publicaciones de origen. Los filtros de host y de resultado se aplican a grupos agregados y pueden ser satisfechos por diferentes experimentos. Para establecer que las condiciones ocurren en el mismo ensayo, siga los identificados de ensayo reportados en la operación de ensayo correspondiente y aplique los filtros necesarios allí. La paginación cubre los grupos de receptores, no la integridad de cada exportación incrustada. Estos registros son la recuperación de evidencias, no una predicción de la unión del receptor. [Parámetros IEDB](../reference/connector-operations.md#family-33).
