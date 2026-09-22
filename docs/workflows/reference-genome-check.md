---
title: "Check species, reference genome and chromosome identifiers"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Check species, reference genome and chromosome identifiers

<p className="example-label"><strong>Worked example</strong> Identify human GRCh38.p14 chromosome 1</p>

Confirm organism, versioned assembly and chromosome aliases before combining records from different databases. The output is an identity table for one chromosome, with the original source responses.

Before starting, follow [Scientific databases](../tools/databases.md#connect-database) to enable the required Connectors. Use a connected model and an available [Notebook runtime](../guides/runtimes.md).

## 1. Query the organism, assembly and chromosome {/* #reference-genome */}

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

## 2. Compare the returned identifiers {/* #compare-identifiers */}

Open the notes and compare the returned IDs across the three JSON files. All three calls succeeded in this example.

![Three actual NCBI calls and the returned taxon and assembly identity](/img/open-science/v0311/ncbi-notes.webp)

| Check | This example's result |
| --- | --- |
| Organism | Homo sapiens, TaxID **9606**; one match, `ambiguous: false` |
| Requested/current assembly | **GCF_000001405.40**, **GRCh38.p14**, UCSC name **hg38** |
| Paired GenBank assembly | **GCA_000001405.29**; the returned record reports differences from RefSeq |
| Chromosome 1 aliases | **1**, **chr1**, RefSeq **NC_000001.11**, GenBank **CM000663.2** |
| Selected sequence | **248956422 bp**, Primary Assembly; one match, `matches_truncated: false` |

![Original chromosome-1 response with versioned aliases and match count](/img/open-science/v0311/ncbi-aliases.webp)

## 3. Retain the identity table and source records {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Query notes</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Identity table</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Taxon response</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Assembly response</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Sequence response</ExampleDownload>

This is a completed lookup for **one selected chromosome**, not an export of every assembly sequence. Keep ambiguous matches and truncation flags when changing the query. An assembly name alone cannot replace its versioned accession, and a returned current accession does not authorize silently replacing a historical version. Sequence aliases describe names within an assembly; they do not perform coordinate liftover between builds. [Exact inputs](../reference/connector-operations.md#ncbi_get_assembly_info)
