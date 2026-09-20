---
title: .science research packages
description: Export a session with its files and evidence, then import and inspect the research record in another project.
last_update:
  date: '2026-09-20'
---

# .science research packages

A **.science** research package brings conversation branches, files and recorded evidence together for a handover. A colleague can import it into a project and inspect the research record. Imported sessions are read-only. From v0.31.0, use **Fork** in the desktop app to create a writable copy and continue the research.

## Choose what to share

| What the recipient needs | Export to use |
| --- | --- |
| Read or edit the conversation text | [Conversation PDF or Markdown](sessions.md). |
| Use selected original files | [File downloads or an artifact ZIP](files.md). |
| Inspect the conversation branches, files and evidence together | A `.science` research package. |

A package can contain uploaded research materials, conversation text and generated results. Review its contents before sharing. It is an independent copy: deleting local work does not remove packages already sent to others.

Side Chat conversations, private [reading bookmarks](bookmarks.md) and their notes are excluded from the package. Put information the recipient needs into a saved report or the conversation before exporting.

## Export a research package {/* #export-the-session */}

1. Finish or stop work in the session. Open its menu and choose **Export → Export Session package**.
2. Review the export scope and any omitted contents or size limits.
3. Confirm the export and save the `.science` file to the intended folder.
4. Follow progress until it completes, then use **Show in folder** to locate the file.

| Export option | How to choose |
| --- | --- |
| Essential export | Keep the essential record and literature metadata; omit optional literature PDFs. |
| Full export | Include available literature PDFs and the additional contents shown in the preview. |
| Customize contents | Select individual literature PDFs, optional files and versions; required evidence remains included. |

Literature metadata is always included. If a literature PDF is required evidence, **Essential export** is unavailable; use **Full export** or **Customize contents** and retain the required file. The exporter does not retrieve missing full texts. Check the listed PDFs and size before confirming; **Full export** does not remove every size or content limit.

<p className="example-label"><strong>Worked example</strong> Hand over a sample QC session</p>

The following screens use a session that summarizes the [GSE60450 sample QC table](../reference/example-data.md). In the export preview, compare **Essential export** and **Full export**, inspect the estimated size, then choose **Export**. The contents and size depend on your session.

![Research package export preview with Essential export, Full export and Customize contents](/img/open-science/feature-guides-2026-09/research-package-export.webp)

## Import into a project {/* #import-and-inspect-a-package */}

1. Open the destination Project menu and choose **Import Session package…**, or drop one `.science` file into that project. Opening an associated file directly asks you to choose the destination project.
2. Review the package preview, destination and included or omitted contents, then confirm import.
3. Wait for completion and choose **Open imported Session**.
4. Inspect the conversation branches and open the files needed for the handover. Check that you can find the inputs and results relevant to your next task.

## Use the received research record

The imported session itself stays read-only. On the desktop, open its session menu and choose **Fork**. Wait for **Fork completed**, open the new session, and inspect its inherited files before sending a follow-up. The source remains unchanged; code does not run automatically. See [Fork an existing session](sessions.md#fork-session) for the steps and checks. Imported usage is excluded from local activity totals.

A received verification record describes checks supplied by the sender. It does not mean this computer has rerun them. Read the file version, comparison criteria and outcome; see [Reproducibility](reproducibility.md) for how those checks work.

## Cancel or retry a transfer

**Run in background** hides the progress window while the transfer continues. Use **Cancel** to stop; hiding the window does not cancel the operation.

If cleanup is incomplete, use **Retry cleanup** before trying again. After a failure, **Try again** retries the same file and destination. Choose another package separately if that is your intent. Check the existing operation before starting a second import, then inspect the imported session and files when it completes.
