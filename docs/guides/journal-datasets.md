---
title: "Journal datasets and reference attributes"
last_update:
  date: '2026-10-08'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Journal datasets and reference attributes

Use **Library → Journals** to import a journal directory, metrics or classifications and display them beside matching references. A dataset keeps its **Source** and **Metric year**. Open-Science does not supply a subscription to a commercial ranking database; import data you are entitled to use and retain its provenance. Journal attributes describe the journal, not the quality or findings of an individual paper.

## Prepare a small dataset {/* #prepare-dataset */}

<p className="example-label"><strong>Worked example</strong> Add publisher information to existing papers</p>

Download the <ExampleDownload path="/examples/journals/journal-publisher-directory.csv">three-journal CSV</ExampleDownload>. It contains Nature Communications, PLOS Medicine and The BMJ, with their electronic ISSNs, publishers and website addresses. The sources are [Nature Communications](https://www.nature.com/ncomms/), [PLOS Medicine](https://journals.plos.org/plosmedicine/) and [The BMJ's subscriber information](https://www.bmj.com/about-bmj/resources-subscribers). This is a publisher-directory snapshot for **2026**, with text attributes rather than invented impact factors or quartiles.

For a matching reference, use Ju et al.'s paper **Understanding activity and selectivity of metal-nitrogen-doped carbon catalysts for electrochemical reduction of CO₂**, DOI **10.1038/s41467-017-01035-z**. If it is not already in your Library, [add its bibliographic record](library.md) and check the journal and ISSN against the source. You do not need its full text to display journal attributes.

CSV, TSV, XLSX and journal bundles are supported, up to **32 MB**. **Download template** provides a starting layout. Keep identity columns separate from attributes; preserve ISSNs as text, including hyphens and any final X.

## Import and map the columns {/* #import-columns */}

1. Open **Library → Journals → Import attributes**, or click the upload area. If datasets already exist, open the **Journal dataset** selector and choose **New dataset**. Select the CSV.
2. Check **Header row** and **Preview**. This file uses row **1** as column names. Use **Transpose** only when your source has journals arranged across columns.
3. Set **Source** to `Publisher websites` and **Metric year** to `2026`. Review suggested values: a year-like number elsewhere in the file can be mistaken for a year. For a real metric dataset, use the year its values describe, which may differ from the file's publication year.
4. Map the four columns as below. Give each saved attribute a distinct name; **Skip** leaves a column out.
5. Select **Review import**, check each row, then **Import attributes**. This example shows **3 ready; 0 need attention**, followed by **Journal attributes imported**.

| Original column | Import as | Value type |
| --- | --- | --- |
| Journal name | Journal name | Identity field |
| ISSN | ISSN | Identity field |
| Publisher | Journal attribute | Text |
| Journal website | Journal attribute | Text |

![Mapping journal identity and publisher attributes with an explicit source and year](/img/open-science/v0340/journal-column-mapping.webp)

Choose each column's role first: an identity field used to match journals (name, ISSN, abbreviation or external ID), a **Journal attribute** to display, or **Skip**. Read the mapping hints before confirming; an automatic suggestion does not establish the field's meaning.

**Abbreviation** and **External journal ID** are additional identity options. An external ID needs its namespace; identifiers from different catalogs are not interchangeable. Attribute types include **Text**, **Number**, **Single choice** and **Multiple choices**. Use Number for numeric metrics, not for ISSNs or categorical quartiles.

Rows can be **Matched**, **New**, **Ambiguous match**, **Invalid** or **Duplicate**. Check conflicting identifiers and repeated rows before import. Return to **Edit mapping** to fix column roles; export problem rows or explicitly skip rows needing attention when offered. A row marked New creates a journal entry, not a new paper in your bibliography.

## Display attributes on a reference {/* #show-attributes */}

1. Confirm the selected dataset is **Publisher websites 2026** and **Show in literature** is on.
2. Return to **All references** and search for `Understanding activity`.
3. Open the paper. Under **Journal attributes**, check **Publisher → Springer Nature** and the journal website. Select an attribute's information control to inspect its source/year.
4. Compare the reference's **ISSN 2041-1723** with the imported journal. The paper's publication year **2017** remains separate from the dataset's **2026** snapshot.

![Imported journal dataset with Show in literature enabled](/img/open-science/v0340/journal-dataset.webp)

![Publisher attributes on the existing Nature Communications reference](/img/open-science/v0340/journal-reference-attributes.webp)

**Show in literature** applies across the shared Library, project views, collections and reference details. Only **one year per source** is displayed at a time; enabling another year from the same source replaces the previously displayed year. Missing attributes are not filled with values from a different year. In a reference table, use **Customize** to choose which available journal columns to display.

## Resolve a journal match and maintain the dataset {/* #journal-matches */}

Use the Journals **More actions → Journal alignment** entry and **Check library / Recheck library** to inspect matched, unmatched and ambiguous records. This check reads the Library; it does not silently rewrite reference metadata. Confirm journal names and ISSNs against the original publication before resolving a mismatch.

When offered, **Find journal candidates → Choose journal → Confirm journal association** links the selected reference to the intended journal. It applies to that reference, not every paper with a similar title. Removing the confirmation returns it to automatic matching; changing the reference's journal identity can invalidate the association.

Select the intended dataset before using **Update dataset**. Review its source, year and mapping again, then check affected references after import. Keep another year's data as a separate dataset rather than overwriting its meaning. Use dataset actions to edit its name/source/year or export a journal bundle, which retains data and column settings. Keep a copy of the original source file and its access terms.
