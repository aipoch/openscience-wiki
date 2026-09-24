---
title: "Opening and previewing files"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Opening and previewing files

Open a saved result to inspect its selected version. This page covers shared viewing controls and ordinary document formats. Use [Tables](../tools/tables.md) for data interpretation and [Scientific viewers](../tools/viewers.md) for sequence and structure controls.

## Open, enlarge and return

A generated-file card opens its preview. **Open … in split view beside the session** keeps the conversation visible. Select another tab to switch files, **Open full screen preview of …** to enlarge one, and **Close preview of …** to close that surface. **Collapse preview panel** hides the panel without deleting its open files. A full-screen preview and a full-screen Files library are different views.

| Header control | Meaning |
| --- | --- |
| Filename and version | Confirm the selected result before downloading or citing it |
| Download | Save a copy of that result |
| File actions → Provenance | Inspect evidence attached to a managed artifact version |
| View in context | Return to the session that produced the artifact |
| Previous / Next file version | Navigate immutable saved revisions when available |
| Edit / Compare | Available only for supported managed content; see [Files](files.md) |
| Close | Dismiss the view; this is not Delete |

The closing behavior above applies to file previews. A [Side Chat tab](delegation.md) has a separate confirmation: closing stops that side discussion and removes its conversation. A full application restart also clears remaining Side Chats. Messages already delivered to Main remain saved.

To save a reading location for yourself, select text or a PDF region and choose **For me**; see [Reading bookmarks](bookmarks.md).

## Read files by format

### Read a result table

<p className="example-label"><strong>Worked example</strong> Read the RNA-seq QC table, figure and report</p>

Open `rnaseq-sample-qc.csv`. In this example, it shows **12 rows · 6 columns** and uses the first row as headers. Horizontal scrolling exposes long source-column names and the metrics to their right. The table's row numbers are display positions, not gene or sample IDs.

![The twelve-sample QC table](/img/open-science/guides-walkthrough/42-rnaseq-table.webp)

Check that column labels and full identifiers are readable. Field definitions and checks against the shared baseline are in [Tables and datasets](../tools/tables.md).

The source `.txt` is a tab-separated matrix; a text viewer may display it as text rather than the CSV grid. Do not rename a file's extension and assume its delimiter or scientific meaning changed. Very large previews can be bounded; read any displayed row/column limit before treating the visible subset as the full dataset. Format limits are in [Reference](../reference/formats.md).

### Inspect the figure

Open `rnaseq-library-sizes.png`. Use **Zoom in**, **Zoom out** and **Reset zoom**; open full screen when axis labels are too small. Zoom changes only the view. It does not resample the source matrix or update a statistical result.

![The actual raw-count totals figure in full-screen preview](/img/open-science/guides-walkthrough/54-rnaseq-figure.webp)

Read the raw-count axis, all twelve sample labels and their mapping in the CSV/report. Different bar heights alone do not establish differential expression. The example is a descriptive pre-analysis check, with no normalization or hypothesis testing.

### Read methods and provenance together

Markdown renders headings, lists, code and links. Read the report's checksum and method before accepting the plotted result. An authored link opens its destination through the applicable source-preview or external-browser action; inspect the full hostname before treating it as evidence. A failed or blocked source preview is not confirmation that its contents were read.

Use **Provenance** to inspect the selected artifact's code, execution log, messages, environment and review. Read any **partial**, **bounded** or **No review for this version** label using [Notebook and execution evidence](notebook.md).

### Read Office files and multi-page figures

<p className="example-label"><strong>Worked example</strong> Inspect Office and TIFF reading copies of the QC results</p>

The <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-reading.docx">Word report</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-sample-qc.xlsx">Excel workbook</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-overview.pptx">PowerPoint slides</ExampleDownload> and <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-figures.tiff">two-page TIFF</ExampleDownload> present the same saved GSE60450 QC results. These are reading copies, not new analyses.

| Format | Steps and what to check |
| --- | --- |
| DOCX | Attach and open the report. Scroll through both pages; check the first sample row and the methods/interpretation text. Full-screen preview gives long lines more space. There is no Word editing ribbon. |
| XLSX | Open the workbook, then choose **Summary** or **Samples** at the bottom. Scroll horizontally for the last column. Samples contains 12 data rows plus its header, spacing and source notes; the viewer reports 17 used rows, not 17 biological samples. Values are a preview of the saved workbook, not evidence of a fresh calculation. |
| PPTX | Open the slides and scroll vertically from the QC summary to Methods and interpretation. Both slides rendered in the local example. This reading surface is not a presentation editor or slideshow controller. |
| TIFF | Open the figure and use **Next page / Previous page**. The two pages show raw library sizes and detected-gene medians. **Zoom in / Zoom out / Reset zoom** changes the view; check **Page 1 of 2** or **Page 2 of 2** before interpreting the figure. |
| JSON | Open <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.json">the summary</ExampleDownload> to inspect source text, identifiers and values. It displays as code rather than an expandable object tree. |
| HTML | Open <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.html">the reading table</ExampleDownload>. **Source** shows the HTML; **Render** restores the formatted document. Neither mode reruns the QC. |

![Selecting Samples in the actual workbook preview](/img/open-science/local-todo-batch/47-workbook-samples.webp)

![The second page of the actual TIFF](/img/open-science/local-todo-batch/50-tiff-second-page.webp)

If **Preview unavailable → Open this Office file in your default app to view it.** appears, use **Open** for a local file, or **Download** for a managed upload, then open it in a compatible application. This fallback keeps the original file available when the built-in preview cannot display it.

### Other supported viewers

The following table lists preview modes and controls for supported file types.

| Family | What to inspect | Controls and boundaries |
| --- | --- | --- |
| PDF | Page number, readable text, source PDF | Thumbnails, outline, document search, page navigation, zoom and selectable regions; scanned pages may lack searchable text |
| Code / plain text | Complete relevant block and language | Line numbers, syntax display, copy/download; oversized content can be limited |
| JSON / HTML | Structure or rendered document | Rendering is not permission to execute code with application privileges |
| Images / TIFF | Resolution and selected image | Image zoom/pan; TIFF has a dedicated rendering path |
| Office files | Whether the managed renderer succeeds | Download/open externally if DOCX/XLSX/PPTX preview is unavailable; preview is not full Office editing |
| Biological sequences | Sequence identity and extent | Sequence-oriented view for supported FASTA inputs |
| Molecular structures | Parsed model and chosen representation | Rotate, zoom, pan and supported Cartoon/Stick/Sphere/Surface/Line representations; missing structural data can disable a representation |
| Unknown or unsupported file | Name, size and fallback message | Download for a suitable external viewer; do not infer valid content from the extension |

For PDF context, link only the papers relevant to the current task and unlink them when the next task should not use them. The app supports up to three linked PDFs per session. A literature record without an attached PDF provides metadata, not proof that full text was read; see [Library](library.md).

### Diagram source and format-specific controls

For a rendered Mermaid diagram in a conversation, select **View source** in its action bar to read the underlying diagram text; **View diagram** returns to the rendering. The toggle becomes available after rendering and is disabled while an error replaces the diagram. It changes the view, not the analysis or source file.

<p className="example-label"><strong>Example</strong> Switch between a Mermaid diagram and its source</p>

In a new conversation, ask: **Show a Mermaid flowchart with three steps: Attach a file → Inspect the preview → Save a report. Do not include file links.** Once rendered, hover over the diagram, select **View source**, and confirm the three nodes. Select **View diagram** to return; use **View fullscreen** if labels are too small.

The diagram displays the requested steps. To inspect a saved file, open its actual file card; a diagram node alone is not an artifact reference.

| Format | What to check |
| --- | --- |
| Single-page PDF | No multi-page Reading entry; use the PDF's ordinary preview controls |
| CSV | Inspect the displayed range; a bounded preview must not be treated as the complete input/export |
| Office workbook | Check the selected visible worksheet and renderer error; use the original file for unsupported editing |
| TIFF | Check the selected page and rendering result before interpreting pixel/sample values |
| JSON | Consult the preserved source text when formatting matters |
| Markdown tables | Focus the table actions to use copy/download/full-screen controls with the keyboard |

Implementation references: [Mermaid controls](https://github.com/aipoch/open-science/commit/5f6e7995), [PDF condition](https://github.com/aipoch/open-science/commit/2722da2a), [CSV](https://github.com/aipoch/open-science/commit/9275c2c0), [Office](https://github.com/aipoch/open-science/commit/0291871f), [TIFF](https://github.com/aipoch/open-science/commit/52152ed4).

## Extract PDF figures and tables {/* #pdf-extraction */}

Use this when you need a figure or a reusable table from a literature PDF. Add and inspect the PDF in [Library](library.md) first; bibliographic metadata alone is not an extraction input.

1. Open the PDF preview and select **Figures and tables** beside **Original PDF**.
2. On first use, choose **Download and continue** to install the required model resources. Wait for installation and integrity checks. When resources are ready, use **Analyze PDF**.
3. Follow the page progress. After completion, select a candidate and use **Show in PDF** to compare it with the source page, caption and surrounding text.
4. For a figure, open its image preview and use **Copy image** or **Download image**. For a table, select **Table**, choose **TSV**, **HTML** or **Markdown**, then use the copy/download action. Choose **Image** when you need to inspect the source crop.
5. Reopen the exported file. Check row/column alignment, merged headers, units, footnotes and cross-page content before using it in an analysis or report.

Extraction runs locally after the model resources are downloaded. Reopening the same PDF can reuse cached results; **Analyze again** reruns extraction when needed. Cancel through the progress control if you need to stop. If analysis is incomplete, inspect the failed-page notice rather than treating the visible candidates as the complete document.

**Unplaced table text** and **Table notes** preserve content that needs review. If structured cells are unavailable, use the source crop and original PDF; do not infer missing cells. Scanned and rotated pages are not supported by this extraction workflow. A PDF can remain readable even when extraction is unavailable.

### Ask the agent about an extracted figure or table {/* #pdf-agent-evidence */}

1. Open the intended PDF, use **Read with agent** to link it to the current session, and complete **Figures and tables** analysis for the relevant pages. Before sending your question, confirm that the PDF remains in the Composer’s reading context. A Library record by itself is not a linked PDF, and linking alone does not run this analysis.
2. Ask about a specific figure, table or algorithm. Include its label or page and the question you need answered.
3. Inspect the tool activity: **list_pdf_elements** finds the available extracted elements; **read_pdf_element** reads the selected evidence. Ask for the source page and any missing or uncertain content in the answer.
4. Compare the answer with the original figure or table, including headers, units and notes. If extraction is absent or incomplete, analyze the missing pages and retry; a caption alone cannot establish a trend or an exact table value.

<p className="example-label"><strong>Example</strong> Request table evidence from a linked paper</p>

> Read Table 1 from the linked PDF's extracted elements. Report the physical PDF page, column headings and values relevant to my question. Preserve units and footnotes, and identify any missing cells or incomplete extraction.

These tools read existing extraction results; they do not start PDF analysis. Table output may arrive in several batches, and figure/algorithm evidence can be delivered as an image. Check that the selected model supports the required image input; a delivered image alone does not prove it was interpreted correctly.

## Load remote media deliberately {/* #remote-media */}

Images, audio and video linked from a model response wait for you to activate loading. Read the destination hostnames shown by the control before proceeding. Approval applies to that displayed element and its URLs, not every future response or the whole domain. Closing the preview does not undo a request already sent.

Mermaid diagrams containing remote images can be blocked before loading; request an ordinary diagram without embedded images when needed. For images sent to a model, Open-Science removes ancillary metadata from the model-input copy while preserving the original file. This does not remove sensitive content visibly present in the image.

## Verify the downloaded file

Open the intended preview, choose **Download**, confirm the filename and location in the system save dialog, then save. Open the downloaded copy and check its content. Download saves the original file; switching TIFF page or Excel sheet does not restrict the download to that page or sheet.

## When a preview fails

Confirm the file saved successfully, then check the exact version and format. Try Download to distinguish a viewer limitation from an unavailable file. For a local file changed outside the app, use Reload where offered. Do not overwrite the input to repair a rendering issue. Report the filename, type, size, app version and displayed error; exclude private file contents unless they are needed for diagnosis.

## Annotate a PDF

Open **Notes & Annotations** to manage highlights, area marks, page notes and document notes. **Show notes sidebar** keeps notes beside the original page. The download menu separates **Download original PDF** from **Download PDF with annotations**. Follow [PDF annotations and document notes](pdf-notes.md) for a complete reading, search and export walkthrough.

For **Figures & Tables**, first-time local model installation can try approved download mirrors when the primary source is unreachable. Wait for download and integrity checks before choosing **Analyze PDF**. Mirrors do not remove the need to install these resources; a cached result can reopen without a fresh analysis.

## Read a PDF in the first message {/* #first-message-pdf */}

1. Open a paper with a readable PDF in **Library** and choose **Read with agent**.
2. Select the target project and **New conversation**. Check that the composer shows the PDF under **Reading** and the preview shows **In session context**.
3. Ask a question immediately. You do not need to send a separate introductory message before linking the paper.

<p className="example-label"><strong>Worked example</strong> Ask about the mechanism in Lang et al., 2019</p>

The example uses [Non defect-stabilized thermally stable single-atom catalyst](https://doi.org/10.1038/s41467-018-08136-3), an open-access paper under CC BY 4.0, with **Codex subscription**.

![A new conversation with the PDF linked under Reading before its first message](/img/open-science/v0331/pdf-first-message.webp)

```text
Using the linked PDF, explain how Lang et al. distinguish non-defect
stabilization from defect trapping. Give the paper title and DOI,
two specific findings with PDF page or figure locations, and one
limitation. Keep the answer in English and cite only evidence you
can actually read.
```

The response retrieves passages from the linked PDF and identifies the paper, mechanism and locations to check. Open the cited pages alongside the response and verify each claim against the original. A reference to a figure in the text does not mean the figure image has been extracted or visually interpreted; use [Figures & Tables](#pdf-extraction) when image evidence is needed.

![An English response beside the original PDF, with Reading context retained](/img/open-science/v0331/pdf-first-response.webp)

For highlights and document-level notes, continue with [PDF annotations](pdf-notes.md).
