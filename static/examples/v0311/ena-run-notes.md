# ENA run tutorial: SRR037073

## Reproducible connector queries

1. Search ENA runs using the exact query:
   `ena_search_runs({"accession":"SRR037073","limit":10})`
2. Retrieve the archive-generated FASTQ inventory:
   `ena_get_run_files({"run_accession":"SRR037073"})`

The complete, unmodified connector responses are saved in `ena-run.json` and `ena-files.json`. The CSV manifest preserves every returned FASTQ entry in report order. Its `file_index` column is positional report order only; it is not a mate, R1, or R2 identifier. Missing size or MD5 values are preserved as empty CSV fields.

## Run summary

- Organism: Caenorhabditis elegans
- Study accession: PRJNA123835
- Secondary study accession: SRP002056
- Sample accession: SAMN00009557
- Experiment accession: SRX017289
- Run accession: SRR037073
- Platform: ILLUMINA
- Instrument model: Illumina Genome Analyzer II
- Library layout: SINGLE
- Library strategy: RNA-Seq
- Library source: TRANSCRIPTOMIC
- Search result count returned: 1
- Search truncated: false
- File report found: true
- FASTQ available: true
- FASTQ files returned: 1

## Interpretation and limits

No FASTQ file was downloaded. The reported MD5 values are upstream metadata and were not checksum-verified locally. ENA reports may come from a cache and may lag archive updates.
