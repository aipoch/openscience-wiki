---
title: Extract a literature evidence table
last_update:
  date: '2026-09-17'
---

# Extract a literature evidence table

<p className="example-label"><strong>Worked example</strong> Ten trials on masks and respiratory infections</p>

This workflow starts with a defined set of ten papers and ends with a source-linked evidence table and an uncertainty note. It demonstrates extraction for a public-health literature review. The supplied set is a teaching selection, not a comprehensive search or a completed systematic review.

## Prepare a bounded source set

Download the <a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>ten-paper source list</a>. It includes DOI, PMCID and original full-text links for community, household and healthcare trials. Obtain and read the sources under their stated access terms.

For the same text input used in this example, download the <a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>source preparation script</a> and run it with Python 3 in a local working folder:

```bash
python3 prepare-mask-sources.py
```

The script downloads those ten Europe PMC XML records, retains source identity, section headings and tables, and creates **mask-trials-fulltext.md**. It reports a failure instead of silently omitting a study. The original full texts are not redistributed with the Wiki. If a download fails, obtain that paper through its source link before treating the set as complete.

In an Open-Science project, select a working model and attach the resulting Markdown file with **+ → Attach files**. Check that the source list contains ten distinct studies. The text version helps extraction; return to the original article for layout, figures or ambiguous table structure.

Click the attachment to open its preview. Each study starts with a title, DOI and original source link, followed by section text and tables. Match those ten identities with the source list; do not count repeated section headings as additional studies.

![The actual attached full-text pack retains source identity and article sections](/img/open-science/research-workflows/mask-trials-input.webp)

Before using a paper as evidence, check for corrections or retractions at its source. From v0.30.2, the `literature-review` Skill's `verify_dois` helper checks Crossref update relationships in both directions. `retracted: true` can identify a retracted paper or a retraction notice; inspect the linked relationship. `false` means no checked marker was found, not proof that the paper has never been retracted.

## Ask for one row per trial

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

Allow the intended source-reading requests. Check that the agent reaches all ten study sections, rather than using only the first abstract or assuming similarly titled papers are duplicates.

## Review the extracted evidence

Open the CSV after the response completes. Compare its ten DOI values with the source list, then check the reported estimate and analysis population against each paper's results section or table.

![The ten-trial evidence table in Open-Science](/img/open-science/research-workflows/mask-trials-evidence.webp)

Pay particular attention to these distinctions:

- **Unit of randomization:** a village, household, tent or hospital ward is not an individually randomized participant.
- **Outcome:** symptomatic seroprevalence, laboratory-confirmed infection and influenza-like illness are different endpoints.
- **Analysis:** an adherence-based or early-intervention subgroup result must remain separate from the main randomized comparison.
- **Uncertainty:** retain confidence intervals and inconclusive results. Do not turn a non-significant estimate into proof of no effect.

Use the <a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>example evidence table</a> and <a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>synthesis note</a> to inspect the format. These are starting materials for review; the scientific interpretation still depends on the original sources, study quality and the question you intend to answer.

Open **mask-trials-reading-notes.md** as well as the CSV. This run’s final table has **10 rows · 12 columns**. Expand a preview or download the file to read long cells; truncated cells are not missing source text. The notes retain the ten study identities and explain why their outcomes and populations should not be pooled automatically.

![The saved reading notes and the completed ten-row output](/img/open-science/research-workflows/mask-trials-notes.webp)

When a row is wrong or incomplete, name the study and exact source section/table, request a revision to **both** files, then reopen them. For example, keep Cowling 2008’s randomized household flow separate from its analyzed subset. Updating a prose answer does not by itself update the saved table.

## Continue toward a review

Save the reviewed table with its sources and extraction decisions. A formal review also needs a documented search, eligibility criteria, screening, duplicate extraction and an appropriate assessment of bias. See [the core reading-list workflow](core-reading-list.md) for source verification and [claim checking](pdf-evidence.md) when a conclusion needs closer inspection.
