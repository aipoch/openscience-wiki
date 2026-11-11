---
title: Update an existing literature collection
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Update an existing literature collection

<p className="example-label"><strong>Worked example</strong> Freshwater microplastic transport across two publication windows</p>

An update should retain the original search rule and show exactly what was added. This historical replay first builds a **2020–2022** collection, then searches **2023–2025** with the same query and filters. The actual library grows from **7 to 14 references**. This is a manual, bounded search; it is not scheduled monitoring or an exhaustive review.

## 1. Define and save the baseline

Open a project with a connected model. Enable **Literature Graph** in **Resource center → Connectors** and configure OpenAlex if needed. Send:

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

This run returned **12 of 3,643 matches**, retained **7** and excluded **5**. Open **freshwater-search-plan.md** to check the criteria and dates before continuing. The saved plan describes the state before the update.

![Saved baseline search specification and retained records](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

Review the evidence level: some candidates supplied only title/metadata, while others included a license-permitted abstract. Broad transport-pathway reviews are included as context; their inclusion does not prove a freshwater-specific experimental result.

## 2. Create and populate the collection

Download <ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">the baseline RIS</ExampleDownload>. In **Library → New collection**, create **Freshwater Microplastic Transport**, select it, then choose **Import references**. Select the RIS and check the destination and matching behavior before importing.

![Baseline import preview for the named collection](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

The recorded import completed with **7 Created, 0 Reused, 0 Skipped, 0 Failed**. Click **Done** and confirm the collection has seven references. Existing matches in another library can change the created/reused split.

![The seven-reference baseline collection](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. Search the next date window in the same conversation

Return to the project conversation. Keep the baseline files unchanged and request an explicit comparison:

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

This update returned **12 of 7,600 matches**, with **7 additions, 0 baseline overlaps and 5 exclusions**. Both searches are truncated to 12 candidates. Database ranking and coverage can change; the counts describe the September 16, 2026 run.

![Saved update audit with additions and exclusions](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

Check the actual DOI sets rather than subtracting totals. Save the dated <ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">update audit</ExampleDownload> and <ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">update notes</ExampleDownload> alongside the baseline.

## 4. Import additions into the existing collection

Download <ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">the additions RIS</ExampleDownload>. Select **Freshwater Microplastic Transport** in Library and choose **Import references**. Keep **Reuse existing reference** so an already-present item can be reused safely.

![The update import preview showing seven additions](/img/open-science/workflow-extensions/freshwater-import-update.webp)

The actual update import completed with **7 Created, 0 Reused, 0 Skipped, 0 Failed**. The collection now contains **14 references**. This agrees with the normalized DOI union of the two retained sets.

![The updated collection with fourteen references](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

The baseline itself was not rewritten. Preserve its date range and search record so later readers can distinguish the original evidence base from the update. To support a proposal or a scientific claim, retrieve and read the relevant full texts next; metadata inclusion alone is not evidence appraisal. For overlapping query batches, see [combine search batches](merge-literature-searches.md).

The downloadable audit copy omits full abstracts and their license fields; identifiers, decisions and reasons are preserved. Inspect abstracts at the linked sources.
