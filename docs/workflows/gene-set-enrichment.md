---
title: "Run functional enrichment for a candidate gene set"
toc_max_heading_level: 2
last_update:
  date: '2026-09-28'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Run functional enrichment for a candidate gene set

<p className="example-label"><strong>Worked example</strong> An intentionally selected human DNA-damage gene list</p>

Turn a defined gene list into a table of enriched biological processes and pathways, retaining identifier mappings, statistical background and source versions.

Before starting, follow [Scientific databases](../tools/databases.md#connect-database) to enable the required Connectors. Use a connected model and an available [Notebook runtime](../guides/runtimes.md).

The first example uses g:Profiler; the [Enrichr and STRING comparison](#enrichr-string) uses the same 11 public gene symbols in v0.33.3. They were chosen for their known biological roles, so enrichment is expected. They are not differential-expression results from the GSE60450 project or evidence of an unbiased discovery.

## 1. Define the gene list and analysis settings {/* #gene-set-enrichment */}

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

## 2. Check identifiers and source versions {/* #identifier-check */}

Open the generated notes and check the query and mapping counts. This run mapped **11/11** identifiers, with **0** unmapped, ambiguous or duplicate identifiers. It recorded **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO classes **2026-01-23** and Reactome classes **2026-03-20**. A later service version may return different terms.

![Saved English query, background, source versions and identifier checks](/img/open-science/v0311/enrichment-notes.webp)

## 3. Inspect the enrichment table {/* #enrichment-results */}

Open the CSV and compare it with the full JSON. This run returned **891 terms** at FDR 0.05. The preview shows only its first 100 rows; that display limit is not the total result count. Retain `source`, `native`, corrected `p_value`, `intersection_size`, `query_size` and `effective_domain_size` when interpreting a term.

![Actual enrichment table with corrected probabilities and domain sizes](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Analysis notes</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">All 891 result rows</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Full response</ExampleDownload>

`background_size: null` means no custom background list was submitted; it does not mean a statistical universe of zero genes. Use the per-term effective domain size. Enrichment does not establish causal involvement, differential expression, or up/down regulation. See [operation parameters](../reference/connector-operations.md#enrich_gene_set).

## 4. Compare Enrichr with STRING network enrichment {/* #enrichr-string */}

Enrichr asks which annotation sets are overrepresented in the submitted genes. STRING PPI enrichment asks whether the proteins have more network interactions than expected. These are different tests; agreement is not independent replication of a biological result.

1. In **Settings → Connectors**, enable **Genes & Ontologies** and **Protein Annotation** for the agent.
2. Create a project called **DNA Damage Gene Set** and open a new session. This example uses Codex and Session Notebook.
3. List the available Enrichr libraries before choosing one. For this comparison, use the fixed **GO_Biological_Process_2025** library so the saved results have an identifiable annotation version. A newer library can produce different results.
4. Send this prompt and open the generated notes after the run finishes:

```text
Compare Enrichr functional enrichment with STRING PPI enrichment for
TP53, ATM, ATR, CHEK1, CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
Use the built-in Genes & Ontologies and Protein Annotation connectors
through Session Notebook. List the current human Enrichr libraries;
use GO_Biological_Process_2025 with max_results 500 if available.
Run STRING PPI enrichment with species 9606 and required_score 700.
Save raw_connector_responses.json, enrichment_comparison_results.csv
and analysis_notes.md in English. Retain the query, source versions,
identifier mappings, reported background, n_total_results, n_results
and truncated flag, plus raw and adjusted P values where provided.
These genes were deliberately selected for known DNA-damage roles.
Do not infer unbiased discovery, causal regulation or expression direction.
Distinguish annotation enrichment from excess network interactions.
If STRING returns a P value of 0, preserve it as returned without claiming
an exact zero probability or inventing a numerical precision threshold.
```

### Check the inputs and complete response {/* #enrichr-inputs */}

Open **analysis_notes.md** and compare it with **raw_connector_responses.json**. The September 28 run listed **228** libraries and returned **305/305** terms for the selected library, with `truncated: false`. The default `max_results` is 100; a 100-row response can be incomplete. Check the response flags and request a larger limit, up to 500, when necessary.

STRING mapped all **11** genes, with no unmapped identifiers, and recorded version **12.0**, organism **9606** and score threshold **700**. Enrichr reports `mapping_status: not_reported_by_enrichr`; do not copy STRING's mapping result into the Enrichr record. No custom background was supplied. Enrichr's library gene coverage of 14,674 is metadata, not a reported exact statistical background size.

![Actual inputs, library version, complete result count and identifier checks](/img/open-science/v0333/enrichment-inputs.webp)

### Read the two results separately {/* #enrichr-comparison */}

Open the notes' results section and use the CSV or raw JSON for the complete list. The first Enrichr term was **Cellular Response to Ionizing Radiation (GO:0071479)**, with adjusted P approximately **3.60 × 10⁻¹¹**. STRING returned **44 observed edges** among **11 nodes**, versus **6 expected edges**. Its reported P value was `0`; this is the service's numeric output, not proof of zero probability.

![Enrichr terms and the separate STRING network-enrichment result](/img/open-science/v0333/enrichment-results.webp)

The CSV has **305 Enrichr rows plus 6 STRING summary rows**. The latter are network statistics, not additional enriched terms. Enrichr GO terms overlap, and STRING combines several evidence channels; a STRING edge does not necessarily mean direct physical binding. The intentionally selected input mainly demonstrates the tools and their records.

<ExampleDownload path="/examples/v0333/analysis_notes.md">Comparison notes</ExampleDownload> · <ExampleDownload path="/examples/v0333/enrichment_comparison_results.csv">Complete comparison table</ExampleDownload> · <ExampleDownload path="/examples/v0333/raw_connector_responses.json">Original connector responses</ExampleDownload>

Parameter references: [Enrichr libraries](../reference/connector-operations.md#list_enrichr_libraries), [Enrichr enrichment](../reference/connector-operations.md#enrich_gene_set_enrichr), [STRING PPI enrichment](../reference/connector-operations.md#get_string_ppi_enrichment). To retain the session and evidence together, [export a .science package](../guides/research-packages.md#export-the-session).
