---
title: "Find public omics data and build a file inventory"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Find public omics data and build a file inventory

Start with a known accession or a research topic, inspect public run metadata, and save a file inventory with source locations and available checksums. The examples below produce inventories; downloading and analyzing the data are separate tasks.

Before starting, follow [Scientific databases](../tools/databases.md#connect-database) to enable the required Connectors. Use a connected model and an available [Notebook runtime](../guides/runtimes.md).

## 1. Resolve a known run and inspect its files {/* #ena-runs */}

1. Enable **Omics Archives** under **Settings → Connectors**. Supply a public ENA/INSDC accession to `ena_search_runs`, such as a PRJ study or SRR run. A GEO `GSE` identifier must first be linked to its INSDC study; keywords are not accepted.
2. Inspect `run_accession`, organism, library strategy/layout and `truncated`. The maximum is 1,000 runs. There is no offset or continuation token; narrow the accession if the response is truncated.
3. Pass one returned run to `ena_get_run_files`. Check `found`, `fastq_available` and every entry in `fastq_files`. The inventory supplies URL, compressed-file size and upstream MD5; it does not download files or verify their contents.
4. Before a separate download, check storage and retain the manifest. Verify the downloaded bytes against the listed checksum. A paired library need not have exactly two files; do not infer read-mate identity from `file_index`.

<p className="example-label"><strong>Worked example</strong> Build a file manifest for SRR037073</p>

This v0.31.1 example uses **Codex subscription** and the enabled **Omics Archives** Connector. Open a session with an available Notebook runtime, then send:

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

Open the generated notes. The actual search returned **1 run**, **Caenorhabditis elegans**, study **PRJNA123835**, **RNA-Seq**, **SINGLE**, with `truncated: false`. Confirm the organism and layout before using its files.

![ENA query inputs, run identity and completeness flags in the generated notes](/img/open-science/v0311/ena-notes.webp)

Open the CSV and compare it with `ena-files.json`. This run has `found: true`, `fastq_available: true` and **1 file**, sized **25,154,397 bytes**. The manifest retains its FTP URL and upstream MD5. Copy the complete value from the downloadable file if a preview column is clipped.

![Actual one-file ENA manifest with URL, size and upstream checksum](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Query notes</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ manifest</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">Run response</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">File response</ExampleDownload>

Both queries and manifest generation completed. **No FASTQ file was downloaded or checksum-verified** in this example. A later download is a separate step. [Exact parameters](../reference/connector-operations.md#ena_search_runs)

## 2. Discover runs by topic and inspect project files {/* #omics-discovery */}

Use `ena_query_runs` when you have a research topic but no accession. It combines organism, library strategy and keyword filters with AND. At least one filter is required; `tax_id` includes descendant taxa. The default limit is 100 and the maximum is 1,000. A truncated response has no continuation cursor: narrow the query instead of treating the returned count as the dataset total.

<p className="example-label"><strong>Worked example</strong> Discover five human RNA-Seq runs and inspect an ENA and a PRIDE file inventory</p>

1. Enable **Omics Archives** in **Settings → Connectors**, then open a session with a connected model and an available Notebook runtime. This example uses **Codex subscription**.
2. Use the prompt below to request metadata only. The ENA query and PRIDE project are separate examples; they are not matched samples from one study.
3. Open `ena-discovery.json` and inspect the query, organism, run accessions and `truncated` before selecting files.

```text
Use Omics Archives through Session Notebook. Query ena_query_runs with
tax_id 9606, library_strategy "RNA-Seq", keyword "breast" and limit 5.
For the first returned run, call both ena_get_run_files and
ena_get_submitted_files. Separately call pride_get_project_files for
PXD000001, page 0, page_size 5; fetch its next_page once if present.
Save the exact requests and responses as ena-discovery.json,
ena-file-inventory.json and pride-file-pages.json. Save a combined
omics-file-inventory.csv and omics-discovery-notes.md. Keep generated
FASTQ, original submitted files and PRIDE records distinct. Preserve
every supplied location, size and checksum; do not infer missing values
or checksum algorithms. State query limits and pagination. Do not download
data files. Keep everything in English and report actual empty results.
```

![Query conditions and observed ENA and PRIDE inventory results](/img/open-science/v0320/omics-discovery-notes.webp)

4. Compare both inventories for the selected ENA run. In this example, the query returns **5 runs** with `truncated: true`. The first run, **SRR077868**, has **1 archive FASTQ**, sized **462,508,712 bytes**, and an upstream MD5. Its original-submission inventory has `found: true` but `submitted_available: false` and **0 files**. An existing run therefore need not provide both inventories.
5. Inspect the PRIDE pages. **PXD000001** returns **5 records on page 0** and **4 on page 1**, with `api_total: 9` and the final `next_page: null`. The combined CSV has **19 rows** because each of the nine PRIDE files supplies two locations, alongside the one ENA FASTQ row. Count file accessions separately from download locations.

![ENA and PRIDE entries in the generated inventory table](/img/open-science/v0320/omics-file-inventory.webp)

<ExampleDownload path="/examples/v0320/omics-discovery-notes.md">Query notes</ExampleDownload> · <ExampleDownload path="/examples/v0320/omics-file-inventory.csv">Combined inventory</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-discovery.json">ENA discovery</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-file-inventory.json">ENA file inventories</ExampleDownload> · <ExampleDownload path="/examples/v0320/pride-file-pages.json">PRIDE pages</ExampleDownload>

The output is a file inventory, not downloaded sequencing or proteomics data. Archive FASTQ and original submissions such as BAM/CRAM are different products. Keep ENA's original FTP path literally, including any `#` character. For PRIDE, use `next_page` and the returned metadata; `api_total` may be absent for other projects, and checksum text does not always identify its algorithm. Before a separate download, select the needed format, check storage and verify bytes when an upstream checksum is available. See the [operation reference](../reference/connector-operations.md#ena_query_runs) for exact inputs.
