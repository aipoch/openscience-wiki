# DNA-damage gene-set enrichment notes

## Interpretation

This is a deliberately selected DNA-damage gene list used as an English g:Profiler tutorial example. It is not differential-expression evidence, and enrichment p-values should not be interpreted as evidence of up- or down-regulation.

## Query

- Organism: hsapiens
- Input genes (11): TP53, ATM, ATR, CHEK1, CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2
- Sources: GO:BP and REAC
- Domain scope: annotated
- Statistical background: all genes annotated in the selected data sources (g:Profiler `annotated` domain scope); no custom background gene list was submitted.
- Submitted custom-background size: none (response `background_size` is null).
- Multiple-testing correction: FDR
- User threshold: 0.05

## Source versions

- Genome assembly/data version: GRCh38.p14
- g:Profiler service version: e114_eg62_p19_27110d83
- GO:BP (biological process): annotations: BioMart; classes: releases/2026-01-23
- REAC (Reactome): annotations: BioMart; classes: 2026-3-20

## Identifier mapping

- Input identifiers: 11
- Mapped identifiers: 11
- Unmapped identifiers: 0
- Ambiguous identifiers: 0
- Duplicate identifiers: 0
- Mappings: TP53 → ENSG00000141510, ATM → ENSG00000149311, ATR → ENSG00000175054, CHEK1 → ENSG00000149554, CHEK2 → ENSG00000183765, BRCA1 → ENSG00000012048, BRCA2 → ENSG00000139618, RAD51 → ENSG00000051180, CDKN1A → ENSG00000124762, GADD45A → ENSG00000116717, MDM2 → ENSG00000135679
- Unmapped genes: none

## Results

- Returned terms: 891
- Requested sources reported in response: GO:BP, REAC
- Actual sources in query metadata: GO:BP, REAC
- Effective domain size is term/source-specific and is retained for every row in the CSV.

## Limitations

The genes were selected because of their known DNA-damage roles, so enrichment is expected and is not an unbiased discovery. Results depend on the recorded g:Profiler source versions, identifier mapping, annotations, and the all-annotated-genes universe. The analysis does not establish causality, direction of effect, or differential expression.
