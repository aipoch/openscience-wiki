# Research note: human p53 signaling in Pathway Commons

## Selected pathway and provenance

Pathway Commons was searched for human p53 signaling pathways with organism restricted to Homo sapiens (NCBI Taxonomy 9606) and datasource restricted to Reactome. The inspected pathway was:

- Name: Transcriptional Regulation by TP53
- Exact returned URI: http://bioregistry.io/reactome:R-HSA-3700989
- Source attribution returned by Pathway Commons: pc14:reactome (Reactome via Pathway Commons)
- Retrieval date: 2026-09-29

The pathway was exported with subpathways included. The flattened SIF network contains 3,318 interaction records and the TXT export reports 387 nodes.

## What the network says

The export directly contains TP53 controls-expression-of MDM2, together with MDM2 controls-state-change-of TP53 and MDM2 in-complex-with TP53. These edges capture the architecture of the TP53–MDM2 feedback motif: TP53 is linked to MDM2 expression, while MDM2 is linked back to TP53 state and physical-complex context.

CDKN1A is present in six exported interactions. It is linked by in-complex-with edges to CDK2, CCNE1, CCNE2, CCNA1 and CCNA2, and by a controls-expression-of edge from PCBP4. This places CDKN1A in a cell-cycle regulatory context in this SIF projection.

## What the network cannot establish

The network is a pathway-derived, flattened representation, not a quantitative or condition-specific causal model. It does not by itself provide interaction strength, rates, stoichiometry, dose response, timing, tissue specificity, cell state, mutation status, or experimental confidence for each edge. A controls-state-change-of edge does not encode a simple activation-versus-inhibition sign, and in-complex-with does not prove direct binary binding.

Most importantly, the exported SIF records do not contain a direct TP53 controls-expression-of CDKN1A edge, even though that regulatory relationship is established biology. This absence should be interpreted as a limitation of pathway selection, subpathway composition, entity mapping, and SIF flattening—not evidence against TP53 regulation of CDKN1A. The richer BioPAX/JSON-LD material in the original response bundle should be consulted when reaction context and intermediate entities matter.

The network is useful for identifying curated relationships and generating hypotheses about connectivity. It cannot establish that any interaction occurs in a particular sample, infer net pathway activity, prove causality, or replace primary experimental evidence.
