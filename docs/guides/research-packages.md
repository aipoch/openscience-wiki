---
title: .science research packages
description: Export a session with its files and evidence, then import and inspect the research record in another project.
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

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

## Check the recipient’s version {/* #package-compatibility */}

Packages exported by **v0.33.0** include **RO-Crate 1.1** metadata in `ro-crate-metadata.json`. It describes the final exported snapshot and selected immutable files, including filenames, media types and their relationships. Re-export rebuilds those references for the new snapshot.

Use **v0.33.0 or a later compatible reader** to open these new exports: they declare the required `ro-crate` capability. Update an older receiving app before importing; renaming or removing the metadata is not a compatibility fix. Existing older packages remain readable without migration.

This metadata travels inside the `.science` package. It does not rerun calculations, grant credentials or replace the [reproducibility checks on an artifact version](reproducibility.md).

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

This example in Open-Science v0.31.1 exports a session that summarizes the [GSE60450 sample QC table](../reference/example-data.md), imports it into another project on the same Mac, and continues from a Fork using **Codex subscription**. Start with the completed session containing `gse60450-qc-summary.csv`; the input table alone is not the research package.

Choose **Essential export**, check the contents and estimated size, then **Export**. This session's preview estimated **805.6 KiB**. Wait for **Package operation completed** before importing the saved file; your session's size will differ.

![Actual QC session export options and estimated size](/img/open-science/v0311/package-export.webp)

## Import into a project {/* #import-and-inspect-a-package */}

1. Open the destination Project menu and choose **Import Session package…**, or drop one `.science` file into that project. Opening an associated file directly asks you to choose the destination project.
2. Review the package preview, destination and included or omitted contents, then confirm import.
3. Wait for completion and choose **Open imported Session**.
4. Inspect the conversation branches and open the files needed for the handover. Check that you can find the inputs and results relevant to your next task.

For this example, select the destination project **Public Genomics Examples**. The import preview lists **1 branch, 3 messages and 13 files**. It also says account credentials, permission grants and provider continuation identities are excluded. Check those details before selecting **Import**.

![QC package preview before import into the destination project](/img/open-science/v0311/package-import-preview.webp)

Open the imported session and its summary CSV. The **Imported research history** notice confirms that this copy is read-only and cannot execute code or continue a conversation directly.

![Imported QC record with its inherited summary and Fork to continue button](/img/open-science/v0311/package-import-readonly.webp)

## Use the received research record

1. Select **Fork to continue** in the imported session, or **Fork** from its session menu. Wait for **Fork completed** and open the new session. Code does not run automatically.
2. Inspect the inherited summary, choose an available model and confirm a Python runtime is ready. This example used **Codex subscription / gpt-5.6-sol**. Imported credentials and permissions do not provide authorization on the receiving installation.
3. Send the following prompt. If a Python approval appears, inspect the requested calculation and approve it to continue.

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. Open both new files. This run returned **12** samples, a total raw count of **269027617**, and a mean of **22418968.08333333333333333333**. The mean summarizes the supplied QC table; it is not normalized expression or a differential-expression result.

![Fork completed and the new calculation files created using Codex](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">Inherited summary</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">New calculation</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">Calculation notes</ExampleDownload>

The two new files are saved in the Fork; the source and imported summary remain unchanged. See [Fork an existing session](sessions.md#fork-session) for general usage. Imported usage is excluded from local activity totals.

A received verification record describes checks supplied by the sender. It does not mean this computer has rerun them. Read the file version, comparison criteria and outcome; see [Reproducibility](reproducibility.md) for how those checks work.

## Cancel or retry a transfer

**Run in background** hides the progress window while the transfer continues. Use **Cancel** to stop; hiding the window does not cancel the operation.

If cleanup is incomplete, use **Retry cleanup** before trying again. After a failure, **Try again** retries the same file and destination. Choose another package separately if that is your intent. Check the existing operation before starting a second import, then inspect the imported session and files when it completes.
