---
title: Search within specified journals and dates
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Search within specified journals and dates

<p className="example-label"><strong>Worked example</strong> Mindfulness intervention trials in two journals, 2019–2025</p>

A focused search needs explicit limits and a record of what was screened. This example uses PubMed to retrieve mindfulness-related publications in **JAMA Psychiatry** and **Behaviour Research and Therapy**, then separates candidate randomized trial reports from other publications. It produces a complete screening table and a search note, not treatment recommendations or a systematic review.

## 1. Set the question and eligibility rule

Open a project and select a connected model. Confirm the **PubMed** Connector is available in **Settings → Connectors**; configure contact information there if requested. No downloaded papers are required to start this example.

Use publication dates **2019-01-01 through 2025-12-31**, not the date on which a database record was added. Include primary randomized reports with a defined mindfulness intervention arm and reported participant outcomes. Keep a separate **uncertain** category for mixed interventions, unclear publication status or conflicting dates. Mechanistic outcomes alone do not make a report a secondary analysis.

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![The actual focused-search request in Open-Science](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. Check the query and coverage

The run submitted this concept-and-journal query, with the publication-date filter supplied separately:

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

Open **Notebook** or expand the PubMed activity. Confirm the journal field, both dates and the returned count. On September 16, 2026, the search returned **62 records**; all 62 were retrieved, with `has_more = false`. Counts may change as PubMed updates its index. If your result is truncated, retrieve the remaining pages before claiming that all search hits were screened.

The broad concept query deliberately retains non-trials. Trial eligibility is a separate screening decision. Publication-type indexing alone can be incomplete, and a paper mentioning a previous randomized trial is not necessarily reporting a new one.

## 3. Review and correct the screening table

When the response completes, open **mindfulness-search-audit.csv** under **Generated**. It should retain every retrieved PMID, including excluded and uncertain records. Check the title, journal, DOI and date against the linked PubMed record, then compare the decision with the abstract.

![The saved candidate table, including uncertain and excluded records](/img/open-science/workflow-extensions/focused-search-table.webp)

Check each exclusion reason against the abstract. PMID **38837133** is a primary randomized trial of a broader psychotherapy; the example marks its mindfulness eligibility **uncertain**. PMID **34009273** is a meta-analysis and is excluded. When a decision needs correction, name the record and specific issue, ask the Agent to update the CSV, then reopen the saved file.

![The actual screening revision and saved-file checks in Notebook](/img/open-science/workflow-extensions/focused-search-notebook.webp)

The reviewed example table contains **20 included, 37 excluded and 5 uncertain records**, accounting for all **62** hits. These are abstract-level screening decisions, not a declaration that 20 distinct trials have been fully appraised. Multiple publications can concern the same underlying trial.

## 4. Keep uncertainty visible

PMID **41418645** was returned by the 2019–2025 PubMed publication-date filter, while its metadata reports a **2026-01** print date. Keep the discrepancy and verify the publication history before making a final date decision. Do not silently replace the year to fit the search window.

Open **mindfulness-search-notes.md** and check that its counts, eligibility rule and limitations match the CSV. Keep the original metadata snapshot alongside these files so each decision can be traced to its source.

![The revised search note with the 20/37/5 screening counts](/img/open-science/workflow-extensions/focused-search-notes.webp)

Download the <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">reviewed candidate table</ExampleDownload> and <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">search note</ExampleDownload>. Full abstracts are not redistributed here; follow the source links to inspect them.

For a formal evidence review, resolve the uncertain records, obtain full texts, link companion reports to their trials and arrange appropriate independent screening. Use [the reading-list workflow](core-reading-list.md) to build a collection, or [evidence extraction](literature-review.md) after the source set and access are established.
