---
title: "Scientific databases"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

# Scientific databases

Use this page to choose a data source, understand what it can return, and make its tools available in Open-Science. For step-by-step research examples with screenshots and output files, see [Research workflows](#database-workflows).

<span id="data-source-catalog" />

## Supported databases {/* #supported-databases */}

Open-Science v0.32.0 includes **23 data-source Connectors with 251 operations**. The separate offline Molecule Connector adds two operations, bringing the full registry to 253. Connector names below match **Settings → Connectors**; each family can expose several databases. Listing a source does not mean every feature of its website is available.

| Connector | Sources | Operations | Use it for  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Small-molecule chemistry via PubChem, ChEBI, Rhea and BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papers, authors, citations, DOI updates and dataset/software records. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Biomedical literature via NCBI E-utilities, the PMC ID Converter and Europe PMC — search, metadata, related articles, citation lookup, ID conversion, full text and copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 10 | Gene/protein identifiers, UniProt sequence discovery, GO and Reactome annotations, and g:Profiler gene-set enrichment. |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST | 17 | Genome annotation, homology and sequence; NCBI taxon/assembly/sequence identity; BLAST submission and reports. |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | Human genetic variants — gnomAD population frequencies/constraint, ClinVar records/search (direct NCBI), dbSNP, structural and mitochondrial variants.  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | Clinical trials from ClinicalTrials.gov — search, details, sponsors, investigators, endpoints, and eligibility.  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | Clinical genomics knowledge bases: ClinGen curations, CIViC clinical evidence, and the Open Targets Platform.  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | Structures and molecular interactions — PDB structures, AlphaFold predictions, EMDB cryo-EM entries, Complex Portal complexes, IntAct interaction networks.  |
| ChEMBL · `chembl` | ChEMBL | 6 | Bioactive compounds, drugs, targets, bioactivity, and mechanisms via the ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | bioRxiv/medRxiv preprints — search by date/category, metadata by DOI, journal-publication links, funder listings, and platform statistics.  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | Drugs@FDA applications, labels, and corpus statistics via openFDA.  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | Human genetic association evidence — GWAS Catalog, eQTL Catalogue, and PheWeb PheWAS portals (FinnGen, BioBank Japan).  |
| Expression · `expression` | GTEx | 12 | Human tissue expression and eQTLs via the GTEx Portal.  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | Protein domain architecture, family/clan membership, expression atlas and interaction networks via InterPro/Pfam, the Human Protein Atlas and STRING.  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | Cancer genomics study records via the cBioPortal REST API.  |
| RNA · `rna` | Rfam | 9 | Non-coding RNA family data (metadata, alignments, models, structures) via Rfam.  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | Expression, metabolomics, metagenomics and proteomics archives; ENA run discovery and FASTQ/submission inventories; PRIDE file lists. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Cell-type identity, marker genes, source datasets, and tissues via CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Gene-regulation functional genomics — ENCODE experiments/biosamples/files, JASPAR TF binding profiles, and UniBind ChIP-seq TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Funding-opportunity search (Grants.gov) and antibody catalog lookups (Antibody Registry).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart attribute queries and identifier translation.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 purchasable chemical space (CartBlanche22) — compound lookup by ZINC id, SMILES exact/similarity search, supplier-code resolution, random sampling, 3D structure locations for docking.  |

The offline Molecule tools are covered in [Scientific viewers](viewers.md). For the exact operations exposed by each data source, use the [Connector operation reference](../reference/connector-operations.md).

<span id="choose-a-query-and-inspect-the-result" />

## What you can do {/* #database-capabilities */}

| Research task | Start with | Typical output |
| --- | --- | --- |
| Find papers, trace citations and check DOI relationships | Literature Graph, PubMed, bioRxiv | Literature records, identifiers, citation links and full-text availability |
| Find genes or proteins and compare sequences | Genes & Ontologies, Genomes | Identifier mappings, protein records, FASTA and BLAST reports |
| Discover public omics data and inspect available files | Omics Archives | Study/run metadata and file inventories with source locations, sizes and available checksums |
| Interpret a gene list or inspect an interaction network | Genes & Ontologies, Protein Annotation | Enrichment tables, ontology annotations and network records |
| Check variants, expression and regulatory evidence | Variants, Clinical Genomics, Human Genetics, Expression, Regulation | Source records with organism, tissue, reference build and relevant evidence fields |
| Retrieve compound, structure or clinical-study records | Chemistry, ChEMBL, Structures & Interactions, Clinical Trials | Chemical identifiers/properties, structure records and trial metadata |

A database response can support a research step; it does not automatically download data, add every paper to the literature library or run a complete analysis. Specify which records and files you want to save.

## Connect and start using a database {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. Enable the built-in Connector

1. Open **Settings → Connectors** and search for the family listed above, such as **Omics Archives**.
2. Open its detail and expand **Tools**. Read the chosen operation's inputs, result limits and third-party requirements.
3. Enable availability for **Main** and check **Used by**. Specialist access is configured on the individual Specialist. Availability and per-tool approval policies are separate controls.

![Omics Archives tool details showing the GEO inputs and metadata-only scope](/img/open-science/guides-walkthrough/36-omics-tools.webp)

These Connectors are built in; you do not need to add a custom server for them. For an external service you operate yourself, see [custom Connector setup](../guides/connectors.md). A listed or enabled Connector is not proof that authentication or a query succeeded.

<span id="connect-openalex-and-follow-citation-links" />

### 2. Add credentials when the operation requires them

| Service or condition | Where to configure it |
| --- | --- |
| OpenAlex | **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**. Enter your API key, select **Validate**, then **Save** after validation succeeds. |
| Direct NCBI variant queries requiring contact information | **Settings → Connectors → Manage credentials → Literature access**. Fill in **Contact email** and select **Save**. An NCBI API key is optional. |
| Another operation with a credential requirement | Follow that tool's requirements and the [credentials guide](../guides/connectors.md). Bind the credential to the intended service. |

Enter keys in the credential form, not in a research prompt or a shared output file. Configure requirements for the selected operation; the contact-email requirement above does not mean that every NCBI tool has the same requirement.

<span id="look-up-a-doi-and-its-related-research-records" />

Literature Graph also offers `crossref_get_work`, `crossref_get_updates`, `datacite_search_records` and `datacite_get_record`. These four public methods do not require the OpenAlex key. For OpenAlex citation directions, `openalex_citations` finds works citing a work, while `openalex_references` finds the works it cites. [Literature Graph parameters](../reference/connector-operations.md#family-2).

<span id="start-with-one-known-identifier" />
<span id="actual-local-queries" />

### 3. Confirm access with a small query

Enable **Genes & Ontologies**, open a conversation with a connected model, and send:

<p className="example-label"><strong>Example</strong> Check a known human gene identifier</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

Inspect the actual tool result. For human TP53, check `query`, `symbol`, Entrez Gene **7157** and the name **tumor protein p53**. Retain multiple matches until you have confirmed the organism and record. A successful query confirms this particular operation; it does not establish access to all sources. [Exact fields](../reference/connector-operations.md#query_genes).

## Follow a research workflow {/* #database-workflows */}

Each article below includes the inputs, steps, actual English-interface screenshots and downloadable example outputs.

<span id="ena-runs" />
<span id="omics-discovery" />

### Find public omics data

[Find public omics data and build a file inventory](../workflows/public-omics-data.md): start with a known run or a topic, inspect ENA and PRIDE records, and save source locations and checksums. Downloading the data remains a separate step.

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### Compare a protein sequence

[Find a protein sequence and complete a BLAST search](../workflows/protein-sequence-search.md): retrieve UniProt FASTA, retain the BLAST job ID, then inspect the completed alignments, identity and query coverage.

<span id="gene-set-enrichment" />

### Analyze a candidate gene set

[Run functional enrichment for a candidate gene set](../workflows/gene-set-enrichment.md): choose the organism, identifiers and background, run g:Profiler, and interpret corrected probabilities with source versions.

<span id="reference-genome" />

### Confirm a reference genome

[Check species, reference genome and chromosome identifiers](../workflows/reference-genome-check.md): resolve the taxon, versioned assembly and chromosome aliases before joining records.

For other tasks, follow [structured PubChem records](../workflows/database-records.md), [cross-checking scientific records](../workflows/cross-check-records.md) or [literature discovery for a group meeting](../workflows/journal-club.md).

<span id="handle-a-returned-record-empty-match-or-error" />
<span id="empty-partial-and-failed-responses" />

## Use the returned data correctly {/* #database-limits */}

- Retain the query, source, organism, tissue, units and accession versions. Database records, predictions and generated summaries are different kinds of evidence.
- Check returned counts, pagination and truncation flags before treating a response as complete. Zero matches, a partial response and a request error need different follow-up actions.
- A file inventory provides locations and metadata. Downloading bytes, checking checksums and analyzing the data are separate operations.
- If a request needs credentials, complete the relevant form before retrying. For rate limits, follow the service's delay; for timeouts, reduce the request size. See [Troubleshooting](../guides/troubleshooting.md).

### Population frequencies and interaction networks {/* #string-network */}

For `get_variant`, set `include_populations: true` only when population details are needed. Retain the dataset and reference build. Exome and genome observations remain separate. An unavailable value is `null`, not zero; overlapping population or sex strata must not be summed. These are observed frequencies, not filtering allele frequencies. [gnomAD parameters](../reference/connector-operations.md#get_variant)

From v0.31.0, `get_string_network.nodes` includes returned neighbors and isolated mapped inputs. A single mapped input requests neighbors; multiple mapped inputs are not expanded. Filter `is_query` to recover input nodes, and use `queries` for all mapped aliases. `n_nodes` counts the graph; `n_mapped` counts input mappings. Update scripts that equated the two before reusing them. [STRING parameters](../reference/connector-operations.md#get_string_network)

<span id="find-operation-parameters" />

## Find operation parameters {/* #operation-parameters */}

The [Connector operation reference](../reference/connector-operations.md) lists required inputs, allowed values and exact calls. Use this page to choose a source and connect it; use the reference for a particular tool's fields.

Catalog source: [catalog.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/catalog.ts), [registry.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/registry.ts).
