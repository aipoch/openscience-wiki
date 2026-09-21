---
title: "Scientific databases"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';


# Scientific databases

The app bundles **23 data-source Connectors**, plus a separate offline Molecule Connector. The full registry has **246 tool operations** including Molecule's two operations; the data-source catalog below covers 244. Enable the relevant Connector in Settings, then ask a bounded question with the correct identifier type.

<span id="actual-local-queries" />

## Data-source catalog

Choose by identifier and research question. Source coverage differs; consult the operation reference for exact fields.

| Connector | Sources | Operations | Use it for  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Small-molecule chemistry via PubChem, ChEBI, Rhea and BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papers, authors, citations, DOI updates and dataset/software records. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Biomedical literature via NCBI E-utilities, the PMC ID Converter and Europe PMC — search, metadata, related articles, citation lookup, ID conversion, full text and copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 9 | Gene/protein identity and ontology terms — mygene.info, UniProt, OLS4 ontologies, GO annotations, Reactome pathways.  |
| Genomes · `genomes` | Ensembl, UCSC, NCBI | 14 | Genome annotation, variants, homology, sequence and browser tracks — Ensembl REST and the UCSC Genome Browser.  |
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
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 19 | Omics data archives — expression (ArrayExpress, GEO), metabolomics (MetaboLights), metagenomics (MGnify) and proteomics (PRIDE).  |
| CellGuide · `cellguide` | CELLxGENE | 5 | Cell-type identity, marker genes, source datasets, and tissues via CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Gene-regulation functional genomics — ENCODE experiments/biosamples/files, JASPAR TF binding profiles, and UniBind ChIP-seq TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Funding-opportunity search (Grants.gov) and antibody catalog lookups (Antibody Registry).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart attribute queries and identifier translation.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 purchasable chemical space (CartBlanche22) — compound lookup by ZINC id, SMILES exact/similarity search, supplier-code resolution, random sampling, 3D structure locations for docking.  |

## Retrieve a record and verify its identity

1. Open **Settings → Connectors**, search the required source and confirm availability to the intended agent.
2. Open its detail. Read **Tools**, inputs, example and third-party requirements.
3. Supply an explicit query/accession and result limit. Retain the exact query when creating a literature collection or evidence table.
4. Inspect returned IDs and source fields. An empty result, a truncated batch and an error are different outcomes.
5. Save needed records into the project/library deliberately. A search response does not automatically mean all papers were added to the literature library or full texts downloaded.

### Start with one known identifier

<p className="example-label"><strong>Worked example</strong> Resolve the human TP53 gene identifier</p>

Enable **Genes & Ontologies** and ask: **Use query_genes to resolve TP53 with scopes="symbol", species="human" and fields="symbol,name,entrezgene". Return the input query and any unmatched records.** In this example, the human TP53 record identifies Entrez Gene **7157** and the name **tumor protein p53**. Check the record's `query` and `symbol` before using the mapped ID. A symbol may return several matches, so retain all results until you have confirmed the intended organism and record. [Exact fields](../reference/connector-operations.md#query_genes).

## Choose a query and inspect the result

<p className="example-label"><strong>Example</strong> Bounded database queries and responses</p>

The table records these example responses; live query results may differ.

| Connector / tool | Input | Observed result |
| --- | --- | --- |
| Omics Archives / geo_get_series | `accessions: ["GSE60450"]` | Series/sample metadata with 12 samples; metadata retrieval did not recompute the uploaded counts. |
| Genes / query_genes | TP53; symbol scope; human | Entrez Gene ID 7157, symbol TP53, name tumor protein p53. |
| PubMed / search_articles | GSE60450, maximum 2 | PMIDs 38059347 and 37306301. These are query matches, not automatically the dataset's original publication. |
| Chemistry / pubchem_search_compounds | aspirin, maximum 1 CID | CID 2244, formula C9H8O4 and molecular weight 180.16. |
| Literature / openalex_search_works | `CRISPR base editing`; from 2020; open access; maximum 2 | Two work records with OpenAlex IDs, source fields and completeness flags. |

### Connect OpenAlex and follow citation links

1. Open **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**.
2. Enter your API key, select **Validate**, then **Save** after validation succeeds.
3. Search for a topic with a small `max_records` limit. Check `n_records_returned` and `records_truncated` before describing the result as complete.
4. Use a returned work ID with `openalex_get_work`. Use `openalex_citations` for papers citing that work and `openalex_references` for works it cites. These are opposite directions.
5. For author searches, confirm the institution and ORCID before retrieving an author profile. Use a source ID or ISSN to disambiguate a journal name.

See the [OpenAlex operation parameters](../reference/connector-operations.md#openalex_search_works) for filters and returned fields.

### Look up a DOI and its related research records

Enable **Literature Graph**. Use `crossref_get_work` for publisher metadata and `crossref_get_updates` for deposited correction/retraction relationships. Use `datacite_search_records` to find dataset/software DOIs, then `datacite_get_record` to inspect a selected record. These four public methods do not require the OpenAlex key. Verify DOI identity, relationship direction and reuse terms before downloading or citing a resource. Exact fields are in the [operation reference](../reference/connector-operations.md#family-2).

Rfam sequence search now uses the official batch endpoint. If an older installation returns the retired-endpoint error, update the app and retry the intended operation. A pending job is not a completed search with no hits.

## Handle a returned record, empty match or error

Inspect the returned status before using a result. Use the [operation reference](../reference/connector-operations.md) to interpret fields and completeness flags.

| Observed outcome | What to do next |
| --- | --- |
| `found: false`, zero records, empty investigators or supplier matches | Check identifier, organism, query scope and filters. Preserve the empty result; do not present it as a retrieved record. |
| `credential_required` for OpenAlex | Open the requested credential form and bind your own key before retrying. |
| `contact_email_required` for direct NCBI variant queries | Open **Settings → Connectors → Manage credentials → Literature access**, enter **Contact email** and select **Save**. Retry the failed query. An NCBI API key is optional. Check returned identifiers, match counts and truncation flags; an empty result is distinct from a connection error. |
| HTTP `410` from eQTL | Retain the source URL, operation and response, and check service availability before changing scientific inputs. |
| Connector request timed out after `30000ms` | Retry a smaller request. Increasing only the outer Notebook timeout does not change the Connector's own deadline. |
| Notebook execution timed out after `60000ms` | The execution ended without a result. Retry operations individually; do not infer that every upstream service failed. |
| BioMart HTML maintenance page; PRIDE `Unexpected end of JSON input` | The expected structured response was unavailable. Retry later and keep the response type/error for an issue. |
| ZINC task did not complete in time | Preserve the returned task/result URL and check that job; repeatedly starting new jobs does not recover its result. |

For a report, attach the operation, bounded input, error text and timestamp through [Troubleshooting](../guides/troubleshooting.md). Remove credentials and private data before sharing.

## Resolve ENA runs and FASTQ files {/* #ena-runs */}

1. Enable **Omics Archives** under **Settings → Connectors**. Supply a public ENA/INSDC accession to `ena_search_runs`, such as a PRJ study or SRR run. A GEO `GSE` identifier must first be linked to its INSDC study; keywords are not accepted.
2. Inspect `run_accession`, organism, library strategy/layout and `truncated`. The maximum is 1,000 runs. There is no offset or continuation token; narrow the accession if the response is truncated.
3. Pass one returned run to `ena_get_run_files`. Check `found`, `fastq_available` and every entry in `fastq_files`. The inventory supplies URL, compressed-file size and upstream MD5; it does not download files or verify their contents.
4. Before a separate download, check storage and retain the manifest. Verify the downloaded bytes against the listed checksum. A paired library need not have exactly two files; do not infer read-mate identity from `file_index`.

<p className="example-label"><strong>Worked example</strong> Build a file manifest for SRR037073</p>

This v0.31.1 example uses **Codex subscription** and the enabled **Omics Archives** Connector. Open a session with an available Notebook runtime, then send:

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

Open the generated notes. The actual search returned **1 run**, **Caenorhabditis elegans**, study **PRJNA123835**, **RNA-Seq**, **SINGLE**, with `truncated: false`. Confirm the organism and layout before using its files.

![ENA query inputs, run identity and completeness flags in the generated notes](/img/open-science/v0311/ena-notes.webp)

Open the CSV and compare it with `ena-files.json`. This run has `found: true`, `fastq_available: true` and **1 file**, sized **25,154,397 bytes**. The manifest retains its FTP URL and upstream MD5. Copy the complete value from the downloadable file if a preview column is clipped.

![Actual one-file ENA manifest with URL, size and upstream checksum](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Query notes</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ manifest</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">Run response</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">File response</ExampleDownload>

Both queries and manifest generation completed. **No FASTQ file was downloaded or checksum-verified** in this example. A later download is a separate step. [Exact parameters](../reference/connector-operations.md#ena_search_runs)

## Run and inspect gene-set enrichment {/* #gene-set-enrichment */}

<p className="example-label"><strong>Worked example</strong> An intentionally selected human DNA-damage gene list</p>

This v0.31.1 example uses 11 public gene symbols to demonstrate g:Profiler. They were chosen for their known biological roles, so enrichment is expected. They are not differential-expression results from the GSE60450 project or evidence of an unbiased discovery.

1. In **Settings → Connectors**, make **Genes & Ontologies** available to the agent. Open a session with a connected model and an available Notebook runtime.
2. Specify the organism, gene identifiers, data sources and statistical background. For real experimental data, justify the background using genes that could have been selected by the experiment. This tutorial explicitly uses all annotated genes, not a custom measured-gene universe.
3. Send the following prompt. Keep the source-version query and enrichment call in the same session and save their actual results.

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

4. Open the generated notes and check the query and mapping counts. This run mapped **11/11** identifiers, with **0** unmapped, ambiguous or duplicate identifiers. It recorded **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO classes **2026-01-23** and Reactome classes **2026-03-20**. A later service version may return different terms.

![Saved English query, background, source versions and identifier checks](/img/open-science/v0311/enrichment-notes.webp)

5. Open the CSV and compare it with the full JSON. This run returned **891 terms** at FDR 0.05. The preview shows only its first 100 rows; that display limit is not the total result count. Retain `source`, `native`, corrected `p_value`, `intersection_size`, `query_size` and `effective_domain_size` when interpreting a term.

![Actual enrichment table with corrected probabilities and domain sizes](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Analysis notes</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">All 891 result rows</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Full response</ExampleDownload>

`background_size: null` means no custom background list was submitted; it does not mean a statistical universe of zero genes. Use the per-term effective domain size. Enrichment does not establish causal involvement, differential expression, or up/down regulation. See [operation parameters](../reference/connector-operations.md#enrich_gene_set).

## Confirm reference-genome identity {/* #reference-genome */}

<p className="example-label"><strong>Worked example</strong> Identify human GRCh38.p14 chromosome 1</p>

1. Enable **Genomes** in **Settings → Connectors**. Open a session with a connected model and available Notebook runtime. This v0.31.1 example used **Codex subscription**.
2. Query the organism, **versioned** assembly and sequence in that order. Send:

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

3. Open the notes and compare the returned IDs across the three JSON files. All three calls succeeded in this example.

![Three actual NCBI calls and the returned taxon and assembly identity](/img/open-science/v0311/ncbi-notes.webp)

| Check | This example's result |
| --- | --- |
| Organism | Homo sapiens, TaxID **9606**; one match, `ambiguous: false` |
| Requested/current assembly | **GCF_000001405.40**, **GRCh38.p14**, UCSC name **hg38** |
| Paired GenBank assembly | **GCA_000001405.29**; the returned record reports differences from RefSeq |
| Chromosome 1 aliases | **1**, **chr1**, RefSeq **NC_000001.11**, GenBank **CM000663.2** |
| Selected sequence | **248956422 bp**, Primary Assembly; one match, `matches_truncated: false` |

![Original chromosome-1 response with versioned aliases and match count](/img/open-science/v0311/ncbi-aliases.webp)

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Query notes</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Identity table</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Taxon response</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Assembly response</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Sequence response</ExampleDownload>

This is a completed lookup for **one selected chromosome**, not an export of every assembly sequence. Keep ambiguous matches and truncation flags when changing the query. An assembly name alone cannot replace its versioned accession, and a returned current accession does not authorize silently replacing a historical version. Sequence aliases describe names within an assembly; they do not perform coordinate liftover between builds. [Exact inputs](../reference/connector-operations.md#ncbi_get_assembly_info)

## Read gnomAD populations and STRING networks {/* #string-network */}

For `get_variant`, set `include_populations: true` only when population details are needed. Retain the dataset and reference build. Exome and genome observations remain separate. An unavailable value is `null`, not zero; overlapping population or sex strata must not be summed. These are observed frequencies, not filtering allele frequencies. [gnomAD parameters](../reference/connector-operations.md#get_variant)

From v0.31.0, `get_string_network.nodes` includes returned neighbors and isolated mapped inputs. A single mapped input requests neighbors; multiple mapped inputs are not expanded. Filter `is_query` to recover input nodes, and use `queries` for all mapped aliases. `n_nodes` counts the graph; `n_mapped` counts input mappings. Update scripts that equated the two before reusing them. [STRING parameters](../reference/connector-operations.md#get_string_network)

<span id="empty-partial-and-failed-responses" />

## Find operation parameters

Use the [Connector operation reference](../reference/connector-operations.md) for required fields, accepted values and exact calls. Choose a source here first; use the reference when preparing a specific operation.

Keep genome build, organism, tissue, units and accession versions with returned data. For general HTTP meanings and recovery, use [Troubleshooting](../guides/troubleshooting.md). Database records, predictions and generated summaries are different evidence types; check the cited source before using a research claim.


Implementation reference: [ConnectorsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx).

Catalog source: [catalog.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/catalog.ts), [registry.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/registry.ts).
