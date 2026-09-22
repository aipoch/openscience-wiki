---
title: PDF annotations and document notes
description: Mark passages, collect document notes, find them again and export a reading copy.
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# PDF annotations and document notes

Use PDF notes to record questions beside a passage, mark a figure for a group meeting, or collect comments on a whole paper. Annotations belong to the managed **file version**, so reopening that version brings its notes back. They do not send a message to the agent or change the original PDF bytes.

## Choose the right reading tool

| Tool | What it keeps | Where to find it |
| --- | --- | --- |
| PDF **Notes & Annotations** | Highlights, area marks, page notes and document notes for a managed PDF version | The PDF's notes view or sidebar; notes and quoted text are also searchable under **Library** |
| **For me** bookmark | A private reading location and optional note belonging to a session | That session's **Bookmarks** list; see [Private reading bookmarks](bookmarks.md) |
| **To Agent** annotation | Material prepared for a question or instruction | The intended message draft; review it before sending |

## Mark a passage and keep a question {/* #annotate-passage */}

<p className="example-label"><strong>Worked example</strong> Prepare reading notes for a single-atom catalysis group meeting</p>

This example uses Lang et al., [Non defect-stabilized thermally stable single-atom catalyst](https://doi.org/10.1038/s41467-018-08136-3), an open-access paper used in the [group-meeting workflow](../workflows/journal-club.md). Obtain its PDF from the publisher and import it into [Library](library.md). Open the PDF attachment from its reference row. The example asks how the paper supports its stabilization mechanism; highlighting an abstract is not an independent verification of that mechanism.

1. In **Original PDF**, locate the passage and check the page number. Use zoom if the text is too small.
2. Select **Annotate selected text**, then drag across the text. **Mark style** chooses the text-marking style. In this example, the first part of the page-one abstract is highlighted.
3. Open **Annotation note**, write a question or reading reminder, and choose **Save**. The example note asks the reader to compare defect stabilization with the proposed covalent metal-support interaction and check the supporting experiments.
4. Choose **Show notes sidebar** to keep the saved note beside the PDF. Add an existing tag with **Add tag**; this example uses **Favorites**.
5. Return to **Select** when finished marking text. Use **Undo annotation change** and **Redo annotation change** for recent annotation edits, rather than changing the source PDF.

![A saved highlight and reading note beside the original PDF](/img/open-science/v0320/pdf-highlight-sidebar.webp)

For a figure or scanned page, use **Select area to annotate** and mark the intended region. A region mark identifies an area; it does not extract its text or verify the figure. If text cannot be selected, an area mark can still preserve the location you need to revisit.

## Collect page and document notes {/* #document-notebook */}

1. Open **Notes & Annotations**, or choose **Open full notes view** from the sidebar.
2. Use **Add note → Add document note** for a question about the whole paper. Use **Add page note** for a specific page, and check its page field before saving.
3. Enter the note and choose **Save**. Here, the document note asks what microscopy, spectroscopy and catalytic measurements distinguish isolated atoms from nanoparticles after heating.
4. Use **Search & filter** to find notes by their text, type or tags. In the sidebar, **All notes** and **Current page** change which annotations are shown.
5. Select **Show annotation source** on a passage or region note to return to its saved location. **Edit annotation note** changes the comment; **Delete annotation** removes that annotation, not the PDF.

![The document note and tagged highlight in the full Notes and Annotations view](/img/open-science/v0320/pdf-notebook.webp)

## Find a note from another view {/* #find-notes */}

Open global search with **Cmd/Ctrl+K**, enter a phrase from your note and select **Library**. This example searches for `covalent metal-support`. Select the result to read **Notes** separately from **Quoted text**, then choose **Show annotation source** to open the PDF at its marked passage.

![Global search separates the saved reading note from the quoted PDF text](/img/open-science/v0320/pdf-search-details.webp)

Check the filename, file version and page when revisiting a note. A PDF note is not automatically a new message or instruction for Main. Use **To Agent** and inspect the draft when you want to ask the agent about the material.

## Export notes or a reading copy {/* #export-notes */}

| Output | Steps | What to check |
| --- | --- | --- |
| Markdown or CSV notes | In **Notes & Annotations**, choose **Markdown** or **CSV**, then **Export notes** | Open the saved file and check the quote, comment, page and tags. With a subset filter, **Export filtered notes** exports that subset. Clear filters when you need every note. |
| PDF with annotations | Open the PDF's download menu and choose **Download PDF with annotations** | Save a separate file and reopen it in a PDF reader. Check the highlight and note contents, not just that a file exists. |
| Original PDF | Choose **Download original PDF** | This saves the source bytes without adding the document notebook's marks. |

![Separate original-PDF and annotated-PDF download actions](/img/open-science/v0320/pdf-export-options.webp)

The example saves two notes: one highlight with a comment and one document note. Both appear in the <ExampleDownload path="/examples/v0320/lang2019-notes.md">Markdown export</ExampleDownload> and <ExampleDownload path="/examples/v0320/lang2019-notes.csv">CSV export</ExampleDownload>. The annotated PDF preserves the paper's ten pages and adds the highlight and note; the original download remains separate. Paper excerpts are from Lang et al. under the paper's [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/); the comments are reading questions for this example.

## Where notes are shared

A **Library attachment** shares its notebook across references, projects and sessions that use the same managed file version. **Project uploads and artifacts** share their notebook across sessions within the owning project. A newer file version is a different annotation target: check the version before assuming a mark belongs to a revised document.

These notes are stored locally and do not synchronize across machines. For a handover, export the notes or an annotated PDF and check what the recipient will receive. This does not change private session bookmarks or make every reading note part of a [.science research package](research-packages.md).
