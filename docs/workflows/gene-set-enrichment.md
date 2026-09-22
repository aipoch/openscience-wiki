---
title: "Run functional enrichment for a candidate gene set"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Run functional enrichment for a candidate gene set

<p className="example-label"><strong>Worked example</strong> An intentionally selected human DNA-damage gene list</p>

Turn a defined gene list into a table of enriched biological processes and pathways, retaining identifier mappings, statistical background and source versions.

Before starting, follow [Scientific databases](../tools/databases.md#connect-database) to enable the required Connectors. Use a connected model and an available [Notebook runtime](../guides/runtimes.md).

This v0.31.1 example uses 11 public gene symbols to demonstrate g:Profiler. They were chosen for their known biological roles, so enrichment is expected. They are not differential-expression results from the GSE60450 project or evidence of an unbiased discovery.

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
