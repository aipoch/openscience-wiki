# Enrichr versus STRING enrichment: selected human DNA-damage genes

## Inputs and provenance

- Input (11 unique human gene symbols): TP53, ATM, ATR, CHEK1, CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
- Enrichr human library listing: 228 current libraries.
- Selected library: **GO_Biological_Process_2025**; listing metadata: 5343 terms, gene coverage 14674, mean genes/term 32. The live listing also contained GO_Biological_Process_2021, _2023, _2025, and _2026.
- Enrichr request used `max_results=500`. The response contains **305 of 305 terms and explicitly reports `truncated=false`**.
- Enrichr background: no custom background was submitted. The statistical reference is Enrichr's implicit, library-specific gene universe; the response returned `background_size=null` and `background_id=null`, so its exact gene count/list was not exposed.
- STRING response: the original response was preserved unchanged. It reports STRING **12.0**, species 9606, required combined score 700, retrieved at 2026-09-28T06:11:40.836Z.
- STRING background: no custom STRING identifiers were supplied; STRING used its default proteome-wide background distribution.

## Identifier mapping

STRING mapped all 11 symbols one-to-one and reported no unmapped symbols:

| Input | STRING ID | Preferred name |
|---|---|---|
| TP53 | 9606.ENSP00000269305 | TP53 |
| ATM | 9606.ENSP00000278616 | ATM |
| ATR | 9606.ENSP00000343741 | ATR |
| CHEK1 | 9606.ENSP00000391090 | CHEK1 |
| CHEK2 | 9606.ENSP00000372023 | CHEK2 |
| BRCA1 | 9606.ENSP00000418960 | BRCA1 |
| BRCA2 | 9606.ENSP00000369497 | BRCA2 |
| RAD51 | 9606.ENSP00000493712 | RAD51 |
| CDKN1A | 9606.ENSP00000384849 | CDKN1A |
| GADD45A | 9606.ENSP00000360025 | GADD45A |
| MDM2 | 9606.ENSP00000258149 | MDM2 |

Enrichr explicitly reports `mapping_status=not_reported_by_enrichr`; it does not provide per-identifier mapping.

## Leading Enrichr results

The CSV and raw JSON contain the complete returned set of 305 terms.

| Rank | GO biological process | Overlap | Raw P | Adjusted P |
|---:|---|---|---:|---:|
| 1 | Cellular Response to Ionizing Radiation (GO:0071479) | RAD51, GADD45A, MDM2, BRCA1, BRCA2, TP53 | 1.182e-13 | 3.604e-11 |
| 2 | DNA Repair (GO:0006281) | RAD51, GADD45A, CHEK2, CHEK1, ATM, BRCA1, BRCA2, TP53 | 3.908e-13 | 5.960e-11 |
| 3 | Response to Ionizing Radiation (GO:0010212) | RAD51, GADD45A, ATM, BRCA1, BRCA2, TP53 | 7.343e-13 | 7.466e-11 |
| 4 | Signal Transduction in Response to DNA Damage (GO:0042770) | GADD45A, CHEK2, CHEK1, MDM2, ATM, TP53 | 1.538e-12 | 1.173e-10 |
| 5 | Cellular Response to Radiation (GO:0071478) | RAD51, GADD45A, BRCA1, BRCA2, TP53 | 2.630e-11 | 1.605e-9 |
| 6 | Mitotic DNA Damage Checkpoint Signaling (GO:0044773) | CHEK2, CHEK1, ATM, BRCA1, TP53 | 8.559e-11 | 4.351e-9 |
| 7 | DNA Damage Response (GO:0006974) | RAD51, GADD45A, CHEK2, CHEK1, ATM, BRCA1, TP53 | 5.347e-10 | 2.330e-8 |
| 8 | Regulation of Cell Cycle (GO:0051726) | GADD45A, CHEK1, MDM2, ATM, BRCA1, TP53 | 6.660e-9 | 2.539e-7 |
| 9 | Intrinsic Apoptotic Signaling Pathway in Response to DNA Damage (GO:0008630) | CHEK2, ATM, BRCA1, TP53 | 1.322e-8 | 4.481e-7 |
| 10 | Regulation of Signal Transduction by P53 Class Mediator (GO:1901796) | CHEK2, CHEK1, MDM2, ATM | 1.544e-8 | 4.709e-7 |

## STRING PPI enrichment

STRING reported **44 observed edges** among **11 nodes**, versus **6 expected edges** (average degree 8; local clustering coefficient 0.873). Its P value field was returned by the service as **0**. This is reported exactly as received; it must not be interpreted as proof of an exact zero probability. STRING supplied no multiple-testing-adjusted P value because this response contains one network-level excess-interaction test.

## Interpretation and limitations

Enrichr tests over-representation of GO biological-process annotations; STRING tests whether the proteins have more network interactions than expected. Pathway enrichment and excess network connectivity answer distinct questions.

The genes were deliberately chosen for known DNA-damage roles, so the strong results primarily confirm the selection and database coherence rather than represent unbiased discovery. Neither analysis establishes causal regulation, temporal order, activation versus repression, or expression direction. GO terms are overlapping and statistically dependent, while STRING integrates multiple evidence channels and does not imply direct physical binding for every edge.
