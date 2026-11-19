---
title: "File formats and limits"
last_update:
  date: '2026-11-19'
---

# File formats and limits

Look up file routing and limits here. Uploading a file, previewing it, parsing it in a tool and sending it to a model are separate capabilities. An accepted upload is not a promise of an inline viewer or model understanding.

<span id="input-and-preview" />

<span id="file-names-and-versions" />

<span id="large-and-binary-files" />

## Preview routing

| Content | Recognized extensions | Behavior and boundary |
| --- | --- | --- |
| Raster/vector image | `avif`, `gif`, `jpeg`, `jpg`, `png`, `svg`, `webp` | Image preview; model input still depends on image support |
| TIFF | `tif`, `tiff` | Dedicated decoder with file, pixel and memory limits |
| Delimited table | `csv`, `tsv` | First row is treated as headers; bounded rows/columns |
| Sequence | `fa`, `faa`, `fasta`, `ffn`, `fna`, `frn` | FASTA inspection; viewing does not validate an analysis method |
| Structure | `pdb` | Structure viewer; not a quality assessment of a prediction |
| Molecule/reaction | `mol`, `sdf`, `smi`, `smiles`, `rxn` | Dedicated molecular preview; do not assume `mol2` has the same routing |
| PDF | `pdf` | Dedicated document reader with page controls |
| Word | `docx` | Office renderer; legacy `doc` is not routed to DOCX parsing |
| Spreadsheet | `xls`, `xlsx` | Office spreadsheet preview; model execution is a separate operation |
| Presentation | `pptx` | Presentation preview and [slide editing](../guides/presentation-editing.md); legacy `ppt` is not routed to PPTX parsing |
| Markdown | `md`, `markdown` | Rendered document, with supported text-version actions |
| HTML | `htm`, `html` | Isolated HTML preview; does not receive application privileges |
| JSON | `json` | Structured preview, including recognized plan JSON |
| Code | `bash`, `bib`, `bibtex`, `css`, `js`, `jsx`, `py`, `r`, `sh`, `tex`, `ts`, `tsx` | Highlighted source; opening a script does not execute it |
| Plain text | `conf`, `config`, `ini`, `iqtree`, `log`, `nwk`, `state`, `toml`, `tree`, `treefile`, `txt`, `xml`, `yaml`, `yml` | Bounded text preview |
| Other files | Unrecognized extension/content | Fallback/download where available; `.ipynb` export does not imply a dedicated file-preview editor |

The router also has narrow MIME fallback for suitable extensionless files. Misleading Office MIME metadata does not make a legacy format compatible with an OOXML renderer.

[Exact routing table](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts), [renderer registry](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx).

<span id="image-model-limits" />

## Size and display limits

The units below are binary units: 1 MiB = 1,048,576 bytes; 1 GiB = 1,073,741,824 bytes. The interface may label these values MB or GB.

| Boundary | Source limit | What the limit applies to |
| --- | ---: | --- |
| One project upload | 10 GiB | Upload admission, not a preview or model context budget |
| One upload chunk | 8 MiB | Transfer chunk size; not a user-facing per-file limit |
| Composer attachments | 10 | Attachment count per message |
| Composer artifact mentions | 10 | Explicit artifact references per message |
| Default text-preview read | 1 MiB | Initial bounded content read |
| Maximum requested generic preview read | 10 MiB | Generic reader ceiling; specialized readers have their own limits |
| CSV/TSV visible data | 100 rows × 24 columns | Displayed data after the first/header row; not the source dataset size |
| Office file preview | 40 MiB | Office preview admission |
| TIFF file preview | 40 MiB | Dedicated TIFF file limit |
| TIFF decoded pixels | 25,000,000 | Preview decode pixel budget |
| TIFF decoded allocation | 256 MiB | Preview decoder memory budget |
| TIFF page count | 512 | Preflight page cap; other structural caps also apply |
| Automatic PDF extraction/acquisition | 50 MiB | Automatic PDF text/acquisition path; do not treat it as the general project-upload limit |

Apply the listed limits to the relevant operation: preview limits, upload limits and package budgets are separate. For an oversized file, use the original file with a compatible external reader or split the input according to the method.

A table saying **Showing 100 rows** may contain more source rows. Use actual file parsing in the Notebook to establish its size. In the GSE60450 case, the source has 27,179 gene rows while the sample QC CSV has twelve rows: the two files summarize different units.

[Upload limits](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts), [CSV bounds](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx), [text-reader bounds](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts), [Office limits](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts), [TIFF limits](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts), [PDF extraction limit](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts).

## Literature import and citation output

| Item | Contract | Distinction |
| --- | --- | --- |
| Reference-record import | BibTeX, RIS, NBIB | Imports bibliographic records; does not guarantee attached full text |
| Import content | Up to 32 MiB, with a 1,000-record bound | Split larger collections into reviewed batches |
| Citation-style import | CSL, up to 1 MiB | A style definition, not a literature collection |
| Bibliographic record export | BibTeX or RIS | Do not assume NBIB import implies NBIB export |
| Citation formatting locale | `en-US`, `zh-CN` | Citation locale is separate from application UI language |
| Collection name | 200 characters | A collection label |
| Collection description | 1,000 characters | Describes the collection; does not replace Project Agent Context |

A DOI metadata result is not a downloaded PDF. An attached PDF is not evidence that the agent read its full text. Check both the attachment and the actual execution/evidence record.

[Literature schemas and limits](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts), [import/export formatter](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts).

## Version and download identity

| Identifier | Use | Do not substitute |
| --- | --- | --- |
| Display name | Find a file in the interface | A name alone does not identify immutable content |
| File/artifact ID | Identify the managed object | A downloaded path is not that object's identity |
| Version ID / `vN` | Inspect the exact saved revision and its provenance | Latest content can differ from the version used for a result |
| Checksum | Compare bytes between source and saved copies | Matching names do not establish matching checksums |
| Download destination | Locate an external copy | Editing that copy does not automatically update the managed version |

For operation steps, use [Notebook and evidence](../guides/notebook.md) and the [public-data workflow](../workflows/data-quality.md). This reference centralizes the bounds so those guides can focus on the task.

For format-specific controls, see [preview controls](../guides/previews.md#diagram-source-and-format-specific-controls): Mermaid source/rendered switching, the single-page PDF Reading condition, bounded tables, worksheet selection and TIFF page handling. Preview support does not establish successful model input or export.
