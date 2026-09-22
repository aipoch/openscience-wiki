# HBA1 UniProt-to-BLAST worked example: completed results

## Query and provenance

This is a public known-sequence demonstration, not identification of a new biological sample.

- Query identity: reviewed UniProtKB/Swiss-Prot accession `P69905` (HBA_HUMAN; hemoglobin subunit alpha)
- Query length: `142` amino acids
- BLAST RID: `B3RSNFV3016`
- Program and version: `blastp`, `BLASTP 2.17.0+`
- Requested database: `swissprot`
- Actual database reported by NCBI: `swissprot`
- Status request UTC: `2026-09-22T06:23:27.797Z`
- Status response UTC: `2026-09-22T06:23:29.947Z`
- Exact status response: `{"rid":"B3RSNFV3016","status":"READY","ready":true}`
- JSON2 request UTC: `2026-09-22T06:24:47.219Z`
- JSON2 response UTC: `2026-09-22T06:24:48.926Z`

The existing RID was checked once. After it returned `READY`, more than 60 seconds elapsed before the JSON2 report was retrieved. The sequence was not resubmitted.

## Five reported hits

| Rank | Accession | Organism | Identity | Query coordinates | Query coverage | E-value | Bit score |
|---:|---|---|---:|---:|---:|---:|---:|
| 1 | P69905 | Homo sapiens | 142/142 (100%) | 1–142 | 100% | 1.99033e-100 | 286.96 |
| 2 | P01923 | Gorilla gorilla gorilla | 140/141 (99.29%) | 2–142 | 99.3% | 1.06845e-98 | 282.337 |
| 3 | Q9TS35 | Hylobates lar | 140/142 (98.59%) | 1–142 | 100% | 2.38346e-98 | 281.567 |
| 4 | P06635 | Pongo pygmaeus | 139/142 (97.89%) | 1–142 | 100% | 3.57742e-98 | 281.182 |
| 5 | P01924 | Semnopithecus entellus | 138/141 (97.87%) | 2–142 | 99.3% | 3.00466e-97 | 278.87 |

## Calculations

For each first HSP:

- Query span = `abs(query_to - query_from) + 1`.
- Query coverage (%) = `100 × query span / query length`.
- Identity (%) = `100 × identity count / alignment length`.

Percentages shown in the table are rounded to two decimal places. The CSV preserves query coordinates, query span, alignment length, identity count, E-value, and bit score.

## Interpretation limits

The exact human P69905 sequence is the top hit at 100% identity and 100% query coverage. The other four hits are closely related primate hemoglobin alpha proteins with 97.87–99.29% identity and 99.30–100% query coverage. These results demonstrate sequence similarity and recovery of the known source entry. Similarity alone does not prove function, especially for an unknown sample; functional inference also requires annotation quality, orthogonal evidence, biological context, and consideration of paralogy and isoforms.
