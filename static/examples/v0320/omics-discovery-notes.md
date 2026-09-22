# Omics discovery and file-inventory notes

## Scope

- ENA discovery used the exact filters: tax_id 9606, library_strategy RNA-Seq, keyword breast, limit 5.
- This is a bounded discovery example, not a complete dataset. The exact generated query, returned metadata, and truncated flag are preserved in `ena-discovery.json`.
- One returned run was selected deterministically as the first run in the connector response: `SRR077868`.
- PRIDE project `PXD000001` was requested at page 0 with page_size 5. Only the single indicated next page was retrieved when `next_page` was present. This is a bounded preview, not a complete project inventory.
- No sequencing or proteomics data files were downloaded.

## Inventory separation

- **ENA generated FASTQ** records come only from `ena_get_run_files`; locations, sizes, and upstream MD5 values are preserved.
- **ENA original submissions** come only from `ena_get_submitted_files`; submitted formats, upstream paths, sizes, and upstream MD5 values are preserved.
- **PRIDE file records** come only from `pride_get_project_files`; file accessions, categories, sizes, checksum text, and every supplied public location are preserved. No checksum algorithm or alternate URL was inferred.
- Missing upstream values remain JSON `null` in JSON artifacts and empty fields in CSV.

## Actual outcome summary

- ENA runs returned: 5; truncated: true.
- Selected ENA run: SRR077868.
- Generated FASTQ files reported: 1; available: true.
- Original submitted files reported: 0; available: false.
- PRIDE pages retrieved: 0, 1; records per page: 5, 4.
