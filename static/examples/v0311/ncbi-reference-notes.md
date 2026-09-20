# Reference-genome identity tutorial: human GRCh38 chromosome 1

## What was queried

Three live Genomes connector calls were made:

1. `ncbi_resolve_taxon({query: "human", max_matches: 10})`
2. `ncbi_get_assembly_info({assembly_accession: "GCF_000001405.40"})`
3. `ncbi_get_sequence_aliases({assembly_accession: "GCF_000001405.40", sequence: "chr1", max_sequences: 200})`

No call failed, so bounded recovery was not required.

## Actual result

The taxon query returned **1 match**: **Homo sapiens** (common name human, TaxID 9606, rank SPECIES). The result was reported as ambiguous=false and matches_truncated=false.

The requested assembly accession was **GCF_000001405.40**. NCBI reported the current accession as **GCF_000001405.40**, assembly name **GRCh38.p14**, UCSC synonym **hg38**, status **current**, level **Chromosome**, and RefSeq category **reference genome**. The paired GenBank assembly is **GCA_000001405.29**. The requested version was preserved exactly and was not silently changed.

The exact `chr1` alias query returned 1 match and 1 row. Its identifiers are:

- chromosome label: **1**
- UCSC-style name: **chr1**
- sequence name: **1**
- RefSeq sequence accession: **NC_000001.11**
- GenBank sequence accession: **CM000663.2**
- length: **248956422 bp**
- assembly unit: **Primary Assembly**
- role: **assembled-molecule**

## Ambiguity, truncation, and completeness

- Taxon ambiguity: **false**; returned matches: 1; taxon matches truncated: **false**.
- Sequence-name ambiguity: **false for this query** (one exact match).
- Alias matches truncated: **false**; returned rows: 1; matching rows: 1.
- The connector reports 705 assembly sequences and an upstream total count of 191. Because the call was filtered to `chr1`, the JSON is complete for the returned exact-match set, not a complete export of every sequence in the assembly.
- RefSeq and GenBank assemblies are not byte-for-byte identical: **true**. NCBI reports: Removed 4 unlocalized and unplaced scaffolds; RefSeq dropped two scaffolds that are predominantly rodent or bacterial in origin (KI270752.1/NT_187507.1 and KI270825.1/NT_187580.1), and dropped two unlocalized scaffolds that are now thought to be redundant with assembled chromosome sequence (KI270721.1/NT_187376.1 and KI270734.1/NT_187389.1)
- Completeness here means the connector returned all matches for the requested `chr1` lookup without truncation. It does not imply that all assembly-report rows were requested.
- Chromosome naming equivalence within this assembly is **not coordinate liftover**. Names such as `chr1`, `1`, `NC_000001.11`, and `CM000663.2` identify the returned chromosome-1 sequence relationship for this assembly; translating coordinates between different assemblies requires an explicit liftover method and validation.

## How to use the files

Use the versioned assembly accession first, then select the exact sequence alias appropriate for the downstream tool. Keep RefSeq and GenBank accessions distinct, and record the assembly accession beside every coordinate.

The three JSON files preserve the complete connector responses. The CSV is a compact derived identity table; it should not replace the raw responses when auditing provenance.

## Source URLs

- NCBI Taxonomy, Homo sapiens (TaxID 9606): https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=9606
- NCBI Datasets genome record, GCF_000001405.40: https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000001405.40/
- NCBI Nucleotide, chromosome 1 RefSeq NC_000001.11: https://www.ncbi.nlm.nih.gov/nuccore/NC_000001.11
- NCBI Nucleotide, chromosome 1 GenBank CM000663.2: https://www.ncbi.nlm.nih.gov/nuccore/CM000663.2
- UCSC Genome Browser gateway for hg38: https://genome.ucsc.edu/cgi-bin/hgGateway?db=hg38
