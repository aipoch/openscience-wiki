---
sidebar_position: 2
title: Files, formats, and naming
last_update:
  date: '2026-08-13'
---

# Files, formats, and naming

## Input and Preview

Open Science can manage any file within its size limits as a project resource, but upload support does not guarantee an inline Preview or model understanding. Dedicated renderers are available for Code, Text, CSV, JSON, Markdown, HTML, Image, TIFF, PDF, Office, FASTA, Molecule, and PDB. Other types use a fallback view with a download option.

| Type | Suggested extensions | Notes |
| --- | --- | --- |
| Python, R, and scripts | `.py`, `.r`, `.sh`, `.js`, `.ts` | Preview never executes a script automatically |
| Tables | `.csv`, Office spreadsheet | CSV is easiest to track as text; large-table Preview is limited |
| Documents | `.md`, `.txt`, `.pdf`, DOCX | PDF and Office use managed resource lifecycles |
| Images | `.png`, `.jpg`, `.webp`, `.gif`, `.tif/.tiff` | Composer requires a model that declares Images support; TIFF uses a separate worker |
| Structures | `.pdb` and supported molecule formats | The 3D view is for inspection, not a replacement for validation software |
| Sequences | Common FASTA extensions | Keep the standard header and sequence format |
| Data and metadata | `.json`, `.html` | Untrusted HTML must not receive application privileges |
| Notebook | `.ipynb` | The Session Notebook can export when it has convertible cells |

## File names and versions

- Use stable, descriptive ASCII or Unicode file names and keep the extension.
- Put the sample or processing stage in the file name instead of encoding the entire history there.
- A generated artifact's `vN` and immutable ID define its provenance version. An upload with the same name is not automatically equivalent.
- If the operating system renames a duplicate during download, verify the saved name against its hash or contents.

## Large and binary files

Download files that exceed immediate Preview capacity or inspect them with an external tool. A Preview thumbnail is not the full dataset. Large results from remote computation should return through managed harvesting so the project keeps the related execution log.

## Image-model limits

A Provider's `Supports images` setting must match the real API. Composer blocks image attachments when the active model cannot accept them; attach the image again after switching models. A file may already exist in Project Files, but model access still depends on request preparation and model capabilities.
