---
title: "Literature library and citations"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Literature library and citations

To find new papers online, describe your topic, date range and selection criteria in a conversation, then review the proposed records in **Library → Inbox**. See the [topic-search journal-club workflow](../workflows/journal-club.md). **Search references** filters records already in the Library; it does not run an online literature search.

The Library is a shared local bibliography. Projects and collections link to its records; adding the same paper to another collection does not require another copy. This guide uses the three real PRISMA papers from the [core-reading workflow](../workflows/core-reading-list.md). That workflow owns the research goal and acceptance checklist; this page explains the Library's controls and record lifecycle.

To reuse a figure or table from an attached PDF, follow [PDF extraction](previews.md#pdf-extraction). Metadata import and automatic full-text retrieval do not themselves extract figures or tables.

## Choose the correct view

Open **Library** from Home or the workspace. **Back to Home** returns to project navigation. The Library's **Settings** opens citation styles, not global Model settings.

| View | Contains | Use it for |
| --- | --- | --- |
| Inbox | Agent-discovered candidates awaiting your review | Check identities and sources before acceptance |
| All references | Accepted active records | Search, edit and organize your bibliography |
| Duplicates | Suspected identifier/metadata match groups | Compare before merging |
| Trash | Removed reference records | Restore or deliberately delete permanently |
| Project | References linked to that project | Keep the bibliography relevant to a research question |
| Collection | A thematic group, including nested collections | Reuse a reading set across projects |

![Three accepted papers in the real PRISMA collection](/img/open-science/guides-walkthrough/51-library-collection.webp)

## Add or import a record

Select **Add** and choose the source. Selecting one PDF opens its metadata editor; selecting several opens **Import PDFs**.

| Entry | Input | Check before saving |
| --- | --- | --- |
| Add reference | Manually entered bibliography | Required title, reference type and identifiers |
| Import PDF | One or several local PDFs | Extracted metadata against each paper; multi-file selection uses the batch flow below |
| Import references | BibTeX, RIS or NBIB | Valid/invalid entries, destination and identifier matches |

<ToolOperationGroup>
<summary>Import a folder's selected PDFs</summary>

### Import a folder's selected PDFs

1. Select the PDFs for the reading set. Wait for metadata extraction; a detected DOI can be used to complete bibliographic fields. Check the result against the paper.
2. Check the destination displayed beside **Import to**; it comes from the Library view where you started the import. Under **When identifiers match**, choose a policy from the table below.
3. Use each checkbox or **Select all** to choose this batch. **Show more** reveals additional listed files.
4. Select **Import selected**. Read the overall progress and each file's status; a failed file is not a completed import.
5. To stop, select **Stop** and wait for **Stopping…** to settle. Already committed references remain; an in-flight operation may finish.
6. After stopping, select the remaining Ready files and use **Import selected**. If the dialog offers **Retry unfinished** after a failure, use it for the unfinished selection. Inspect any retained reference before starting a fresh import, particularly if its PDF upload was interrupted.
7. Use **Done** or **Close** when the dialog offers it, then open the destination and verify its records and PDFs. **Cancel** abandons preparation before import.

| Identifier-match policy | Result |
| --- | --- |
| Reuse existing reference | Reuse the matching record instead of creating another bibliography entry |
| Keep as separate reference | Keep a distinct record for later comparison and duplicate review |
| Fill empty fields | Fill missing fields while retaining existing/conflicting values |

The batch can show **Pending**, **Reading…**, **Ready**, **Importing…**, **Completed**, **Failed** or **Skipped**. Selection, metadata readiness and import completion are separate states. If the app reports **PDF upload cancelled. The reference was kept.**, check that retained record's attachments; cancelling the upload did not remove the bibliography entry.

![Two real PRISMA PDFs ready for import](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

With **Reuse existing reference**, a PDF whose extracted title or DOI does not match can still create a separate record. After import, open each paper and confirm its title and DOI. Correct mismatches before [merging duplicates](#resolve-duplicates-and-recover-references). **Completed** confirms import, not accurate identification.

![Completed batch and per-file results](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Stop a batch without losing completed work</summary>

### Stop a batch without losing completed work

A **Stop** request allows the current item to finish. Inspect every row: **Completed** items are retained and cannot be selected again; select remaining **Ready** rows and use **Import selected** to continue. If failures expose **Retry unfinished**, correct the reported cause before retrying and check that completed records were not duplicated.

![Stopped PDF import retains its completed row](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

**The reference was kept. Retry to finish adding its PDF.** means the bibliography entry was saved but its attachment is unfinished. Check that the original PDF is still available at the selected location and opens normally, then select **Retry unfinished**. After retrying, return to the destination collection and open the PDF to check its content. If the result could not be confirmed, inspect your library before starting another import.


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Bring a bibliography from another reference manager</summary>

### Bring a bibliography from another reference manager

<p className="example-label"><strong>Worked example</strong> Import PRISMA records with three matching policies</p>

Open the destination collection first, then choose **Import references** and a `.bib`, `.ris` or `.nbib` file. The preview reports the detected format, destination, new/existing/skipped counts and matching records. Expand **View details** to inspect titles and authors before importing. Bibliographic imports do not download PDFs.

| Choice | Checked result with the PRISMA statement |
| --- | --- |
| Keep as separate reference | BibTeX created one record; Duplicates then contained one matching-DOI group |
| Reuse existing reference | RIS reused one record, with zero created, skipped or failed |
| Fill empty fields | The [PubMed NBIB record](https://pubmed.ncbi.nlm.nih.gov/19621072/) added PMID `19621072` and PMCID `PMC2707599`; existing title and five creators remained |

Click **Import references**, wait for **Import complete**, inspect Created/Reused/Skipped/Failed, then select **Done**. Reopen the record: an import count alone does not establish correct metadata. Filling empty fields can add identifiers and an abbreviated journal name without replacing the full journal title.

![BibTeX import with an explicit duplicate policy](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![NBIB import fills missing bibliographic fields](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## Review Inbox evidence

<p className="example-label"><strong>Worked example</strong> Review three PRISMA candidates</p>

Open the candidate title or **View details**. Inspect its provider, source link and DOI/other identifiers, then compare year, author order and publication with the publisher. **Accept** promotes it into the Library; **Dismiss** removes it from the review queue. Check the row selection before batch actions.

![Three genuine PRISMA candidates awaiting review](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

In this example, the three candidates were accepted individually, and Inbox became clear. A provider match is a starting record, not complete bibliographic validation. The 2020 statement's publication year is **2021**. The two 2009 papers have distinct DOIs and author lists.

## Inspect and correct metadata

Open a reference, then **More actions → Edit metadata**. Review the current values before using **Complete metadata**, which performs a lookup rather than a purely local edit.

![Saved organization-author field reopened](/img/open-science/v0.27.0/04-organization-author.webp)

| Field/control | Input and effect |
| --- | --- |
| Reference type | Select the bibliographic kind: article, review, preprint, book, dataset and other supported kinds |
| Title | Required; preserve the published title |
| Year / Publication | Publication year and journal/container; a year embedded in the title may differ |
| Advanced settings | Volume, Issue, Pages, Publisher, Place and Edition |
| Add creator / Remove creator | Add or remove a creator row in the draft |
| Creator role | Choose Author, Editor or Translator to match the source |
| Name type → Person | Enter Given name and Family name |
| Name type → Organization | Enter the complete organization name; do not split it into invented person names |
| Add identifier | Type and value: DOI, PMID, PMCID, ARXIV, ISBN, ISSN or OTHER |
| Preferred for DOI / ISSN, etc. | Choose the preferred identifier within that type; the choice is not one global flag across all types |
| Remove identifier | Remove the draft identifier row |
| URL / Abstract | Source address and bibliographic summary |
| Save | Persist valid edits |
| Cancel / Close | Discard the draft |

<p className="example-label"><strong>Worked example</strong> Preserve The PRISMA Group as an organization author</p>

To add **The PRISMA Group**, select **Add creator → Creator role: Author → Name type: Organization**, enter the full name and **Save**. Reopen the record and check that the organization follows its four personal authors. Compare the generated citation with the [publisher's author list](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097).

![APA reference preserves the organization author](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2 corrects PubMed author-name parsing, including surnames, initials and suffixes. When importing or completing metadata, inspect the creator fields and generated citation against the linked source. Do not assume that installing the update rewrites metadata already stored in your Library.

## Smart collections {/* #smart-collections */}

Turn **Smart collection** on in **New collection** to screen Library records against explicit rules. Select **Scope** (all references, a project or a collection), add required **Inclusion criteria** and optional **Exclusion criteria**, then choose the evidence and update options. Unlike an ordinary collection description, smart-collection descriptions provide context for model evaluation.

Configure **Settings → Model → Classification models → Smart collections** first; this feature has no default model. **Included**, **Needs review**, **Excluded** and **Not evaluated** distinguish matched, uncertain, rejected and unevaluated records. Open **Evaluation details** and review the actual source before choosing **Include** or **Exclude**. Manual decisions survive updates until you restore the model decision.

**Trial run (up to 20 references)** saves results. **Live rule preview** evaluates a draft without saving them. **Update automatically** applies to new or changed records in the selected scope; it is opt-in and can incur classification costs. It does not discover new papers outside the Library. Follow [the illustrated screening workflow](../workflows/screen-literature.md) from search to reviewed export.

During a run, open **Screening process** to inspect progress and use **Pause / Resume analysis** to pause or continue. Changes to rules, papers or saved progress can make a previous run non-resumable. **Back to results** returns to the decision list. **Project** and **Collection** scope markers distinguish source types and link to the source; they are not multi-user sharing permissions.

## Organize the accepted records

Create an ordinary collection with **New collection** and **Smart collection** off, fill **Name** and optional **Description**, then **Create collection**. The description is organizational text, not Agent Context. Cancel/Close discards the draft. Select records in All references and use **Add to collection** or **Add to project**. Selection clears after the operation; reselect if adding another destination.

In a detail view, project and collection checkboxes show the links. **Manage Tags** adds organizational tags. The table's one-to-five-star rating is your annotation, not an automatic evidence-quality score. **Clear selection** leaves the records unchanged.

| Table control | Scope |
| --- | --- |
| Search references | Bibliographic fields including title, creators, publication, identifiers, abstract and notes |
| Sort references | Choose the displayed order |
| Filters | Narrow by the available type, year, tag and full-text conditions |
| Customize | Choose/reorder displayed columns |
| References per page | 25, 50 or 100 rows |
| Row checkbox / Select all | Set the targets for the available bulk actions |
| Export | Export selected bibliographic records; it does not automatically package all PDFs |

The total library count is independent of the current search/filter result. Read the displayed view and selection counts before a batch action; a smaller filtered result does not mean records were removed.

Clear search and filters before concluding a record has disappeared. Project/collection links do not create independent metadata versions for each destination.

## Add and read full text

**Find full-text PDF** checks applicable public providers: Europe PMC/PMC, OpenAlex, Unpaywall and arXiv. Available identifiers and configured contact/credentials determine applicability. Inspect the source, version label and URL before **Add attachment**.

<p className="example-label"><strong>Worked example</strong> Attach the publisher PDF to the PRISMA 2020 record</p>

If **Add attachment** fails after a source is found, download the publicly available PDF from the publisher and use **Add PDF** on the same record. Open the attached PDF and compare its title and DOI with the publisher record. In this example, **Preview prisma-2020-statement.pdf** shows the matching PRISMA 2020 paper: **806.1 KB and 15 pages**.

![Successfully attached publisher PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

A source result is not a saved attachment. An attached PDF is not proof of agent reading. **Read with agent** supplies context for a subsequent request. A Composer `@` reference can select an exact record, a project Library or a Collection: a collection grants retrieval scope, not automatic inclusion of every paper's full text. PDF reading controls are in [Previews](previews.md).

If no public copy is found, retain the checked metadata and use a legitimately available local PDF when appropriate. Background lookup/download tasks can expose pause-after-current, resume, review and cancel controls; cancellation does not imply that completed earlier items are undone.

<ToolOperationGroup>
<summary>Retrieve full text in batches and resume later</summary>

### Retrieve full text in batches and resume later

1. Select the intended records in the Library and open the selection's **More actions → Find full-text PDF**.
2. After searching starts, choose **Pause** when needed. The current item finishes before the task pauses.
3. Check **Checked** and **Pending**, then select **Continue search**. After closing the panel, return to the same task through **Background tasks → Open**.
4. Review each candidate source and warning before selecting items and clicking **Add selected**.
5. Downloading also supports pause and **Continue download**. Inspect the final **Added / Failed / Skipped** states and reopen any successfully added attachment.
6. To discard an unwanted review-ready task, use **Remove task** in **Background tasks**. After removal, confirm that the task is gone and that its references and attachments still open. Removing the task does not delete them.

![Search paused after the current item, retaining the pending records](/img/open-science/priority-completion/14-literature-batch-paused.webp)

A paused search retains its checked and pending records. After continuing or reopening the task, inspect the final counts and each item’s outcome. Candidate discovery and successful PDF attachment are separate results.

![Reopening the completed five-record search from background tasks](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>A source exists but the PDF cannot be added</summary>

### A source exists but the PDF cannot be added

For **PDF could not be added**, check source sign-in requirements, link validity, the displayed size limit and the current proxy/DNS configuration. Avoid creating duplicate references as a retry mechanism.

If a PDF source resolves to a reserved address such as `198.18.x.x`, the downloader rejects it. Follow [Network](network.md) to restore verifiable public resolution, then retry; do not disable the address check. If you already have a legitimately downloaded PDF, use **Add PDF** and verify its title, DOI and page count.


</ToolOperationGroup>

## Format and copy citations

Open **More actions → Citation**. Select **Citation style**, inspect the reference and in-text form, then choose **Copy reference**, **Copy in-text citation**, **Copy BibTeX** or **Copy RIS** as needed. Check names, year, punctuation and DOI against the source before reuse. The corresponding representation does not repair an incomplete record.

**Manage citation styles…** opens style management. The bundled set includes APA, MLA, Chicago author-date, Vancouver, IEEE, Nature, AMA and Harvard. **Preview** shows a style sample, **Browse styles** opens the external style catalog, and **Import CSL** imports a local style file. The PLOS CSL import and its application are verified below. Copy and export are separate operations; check both when moving a bibliography.

<ToolOperationGroup>
<summary>Check a real citation after importing a journal style</summary>

### Check a real citation after importing a journal style

<p className="example-label"><strong>Worked example</strong> Apply the PLOS citation style to a PRISMA record</p>

In **Library → Settings → Import CSL**, choose the independent `plos.csl` file from the [CSL styles repository](https://github.com/citation-style-language/styles/blob/master/plos.csl). In this example, **Imported styles** increased from zero to one and showed **Public Library of Science**. Return to the real PRISMA record's **Citation** panel and select that style under **Citation style**. Check the numbered reference and `[1]` in-text citation. The style-management preview uses a sample article; inspect your actual record before copying a citation.

![Imported PLOS style applied to the real PRISMA record](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Copy a citation or export reusable records</summary>

### Copy a citation or export reusable records

<p className="example-label"><strong>Worked example</strong> Copy and round-trip PRISMA citation records</p>

The four Citation copy buttons write different representations to the clipboard. Paste into your intended editor and inspect the result before leaving the panel.

| Button | Result checked for PRISMA 2009 |
| --- | --- |
| Copy reference | APA reference retained the four personal authors, The PRISMA Group, year and DOI |
| Copy in-text citation | `(Moher et al., 2009)` |
| Copy BibTeX | An `@article` entry with the organization author enclosed in braces |
| Copy RIS | A `TY  - JOUR` record with author, title, year and DOI fields |

![Citation copy controls for the real PRISMA record](/img/open-science/local-todo-batch/01-citation-copy.webp)

For a file, close Citation, select the required table rows and choose **Export → BibTeX** or **RIS**. Choose the location in the system save dialog and wait for **Saved**. These files contain bibliographic records, not a PDF attachment bundle. Reimport the saved file into a test collection with **Reuse existing reference** and check its match count. Both exported PRISMA files were reimported and reused the existing DOI without creating another record.

BibTeX stores year and month here, so its round trip returned `2009-7`; RIS retained `2009-07-21`. Check date precision when merging. Plain RIS author fields may not preserve a separate organization-name type in another manager; inspect the imported creator editor when that distinction matters.


</ToolOperationGroup>

## Resolve duplicates and recover references

<p className="example-label"><strong>Worked example</strong> Merge and restore a PRISMA record with its attachments</p>

<ToolOperationGroup>
<summary>Keep one record and its attachments</summary>

### Keep one record and its attachments

1. Open **Duplicates → Review duplicates**. The view scans active Library records, not just the current collection.
2. Under **Keep reference**, choose the record with the verified identity. Compare DOI, creators, attachment counts and date added. **Show all fields** reveals fields hidden by the conflict-focused view.
3. For each conflicting field, select its source. In the PRISMA BibTeX comparison, choose the full `2009-07-21` publication date over `2009-7`. Empty fields can be filled from the other record.
4. Read **After merging** and its attachment, collection and project counts. Only then select **Merge references**; **Cancel** leaves the records separate.
5. Reopen the survivor and verify metadata, links and PDF contents. The merged-away record appears in Trash as **Merged duplicate**.

![Compare the survivor and conflicting publication dates](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

A PDF with an extracted filename in place of its title may not enter a duplicate group. Correct its title and DOI using the publisher record, then review the matching group. After merging, confirm the retained PDF opens and collection/project associations are still present.

![The merged record retains its PDF and organizational links](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Restore an accidentally removed reference</summary>

### Restore an accidentally removed reference

Use the row's **More actions → Move to Trash**. It disappears from active Library, project and collection views. In **Trash**, search by title or identifier, open its row menu and choose **Restore**. Restore before editing, previewing or exporting: these controls are disabled in Trash. Reopen the original project and collections to verify the restored links. In this example, restoring the PRISMA record retained its PDF and all three links.

![Restore a reference from its Trash row menu](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Permanently remove an unwanted duplicate</summary>

### Permanently remove an unwanted duplicate

In Trash, choose **More actions → Delete permanently** and read the confirmation. **Cancel** preserves the row. Confirmation removes the selected references and metadata; unshared attached files are cleaned up afterward. Historical outputs are retained and search indexes expire separately, so this is not secure erasure. Export anything required before deleting.

After deletion, check that the selected record has left Trash and that the retained reference still opens with its attachments. Removing a collection link, moving a record to Trash and permanently deleting it have different scopes.

![Read the precise permanent-deletion scope](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## Attachment changes and concurrent edits

Before removing an attachment, read its deletion confirmation and verify the file/version being targeted. Use the available version history to inspect earlier attachment versions. Removing a PDF, moving its reference to Trash and permanently deleting a reference have different scopes; retained conversation evidence can restrict cleanup.

If another client changes a collection while your editor is open, a stale save can be rejected. Reopen the latest collection, compare its saved values with your intended change and retry against that state. A refresh or cleanup error after saving does not automatically mean the save failed: inspect the current record before repeating the action.


Sources: [batch import](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [metadata editor](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx), [attachment history/deletion](https://github.com/aipoch/open-science/commit/f4a82d4a), [concurrent edits](https://github.com/aipoch/open-science/commit/dbb9560a).

## Keep PDF reading notes

Open a reference's PDF attachment and use **Notes & Annotations** for annotations, page questions and document notes. The same library file version shares these notes across projects and sessions. Find a note under **Library** in global search, then choose **Show annotation source** to return to the PDF. See [PDF annotations and document notes](pdf-notes.md) for steps and exports.
