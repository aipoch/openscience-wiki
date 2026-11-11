---
title: Combine literature search batches
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Combine literature search batches

<p className="example-label"><strong>Worked example</strong> Solid-state electrolyte interfaces and interphases</p>

Two searches often return overlapping papers. Keep each search's provenance, screen the candidates, then import both batches into one collection with identifier-based reuse. This example retrieves two genuine OpenAlex batches, retains eight records from each and ends with **15 unique references** in Library. It demonstrates metadata organization; no full texts were retrieved or appraised.

## 1. Run and record both searches

In **Resource center → Connectors**, enable **Literature Graph** and configure its OpenAlex credential if requested. Open a project, start a conversation and select a connected model. The recorded run used Open-Science **0.30.1**, **Codex subscription / gpt-5.6-sol**. No source PDFs are needed.

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

Inspect the actual Connector activity for the queries, dates and returned counts. The recorded searches returned **12 candidates each**, from totals of **94,620** and **15,355** matches. The cap makes these bounded examples, not exhaustive reviews. Both batches come from OpenAlex; two query formulations do not make them independent databases.

## 2. Inspect the exports before importing

Open **electrolyte-merged.csv** under **Generated**. Check the retained titles, DOIs and source membership against the two RIS exports and the candidate audit. The actual union has 15 rows; DOI **10.1007/s41918-024-00212-1** occurs in both batches and is labelled **A|B**.

![The saved union of both search batches, retaining source membership](/img/open-science/workflow-extensions/batches-merged.webp)

For comparison, trim DOI whitespace, remove an optional DOI URL prefix and compare case-insensitively. Preserve the original identifiers in the source record. Similar titles alone are insufficient evidence that two records are identical; unresolved identifier conflicts need review.

Download <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">batch A</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">batch B</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">all 24 candidate decisions</ExampleDownload> and <ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">the 15-row union</ExampleDownload>. These are the exports from the recorded run.

## 3. Import the first batch into a named collection

1. Open **Library → New collection** and create **Solid-State Electrolyte Interfaces**.
2. Select that collection in the sidebar before choosing **Import references**.
3. Choose `electrolyte-batch-a.ris`. Check that **Import to** names the intended collection.
4. Leave **When identifiers match → Reuse existing reference** selected. Inspect **View details**, then choose **Import references**.

![First-batch import preview: eight new references in the selected collection](/img/open-science/workflow-extensions/batches-import-a.webp)

In the recorded library, the first import completed with **8 Created, 0 Reused, 0 Skipped, 0 Failed**. Click **Done** and check the collection. If your library already contains matching records, its created/reused split can differ.

## 4. Import the second batch and reuse the overlap

With the same collection selected, import `electrolyte-batch-b.ris`. The preview should identify existing records before committing the import. In this run it showed **7 New references, 1 Existing, 0 Skipped**.

![Second-batch preview identifies the shared paper as Existing](/img/open-science/workflow-extensions/batches-import-b.webp)

Keep **Reuse existing reference**, inspect the shared title, then import. Read the actual completion summary: **7 Created, 1 Reused, 0 Skipped, 0 Failed**. Reuse keeps existing metadata and adds the matching reference to the destination; it does not create a second copy or download a PDF.

![Completed second import with seven created and one reused](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. Check the resulting collection

Click **Done**. The collection contains **15 references**, agreeing with the DOI union. Keep the two original exports and the provenance CSV so a colleague can reconstruct where each candidate came from.

![The final collection with fifteen references](/img/open-science/workflow-extensions/batches-collection.webp)

A count match is a useful check, not a replacement for inspecting the overlapping DOI and representative titles. To add a later publication window while preserving the baseline, continue with [update an existing literature collection](update-literature.md).
