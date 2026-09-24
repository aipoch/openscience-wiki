# Conservation of human, mouse, and bovine hemoglobin alpha chains

## Sequences

Reviewed UniProtKB/Swiss-Prot canonical protein sequences were retrieved:

| Label | UniProt accession | Organism | NCBI taxon | Length |
|---|---|---|---:|---:|
| human_P69905 | P69905 (HBA_HUMAN) | Homo sapiens | 9606 | 142 aa |
| mouse_P01942 | P01942 (HBA_MOUSE) | Mus musculus | 10090 | 142 aa |
| bovine_P01966 | P01966 (HBA_BOVIN) | Bos taurus | 9913 | 142 aa |

## Alignment and conservation

The three uniquely named FASTA records were aligned with Clustal Omega through the Genomes Connector. Job `clustalo-R20260924-093358-0146-98412985-p1m` finished successfully and returned the requested `clustal_num` alignment.

The alignment has 142 columns and no gaps. A column was counted as fully conserved only when the same amino-acid residue occurred in all three sequences. There are **116 fully conserved columns (81.7%)** and **26 variable columns (18.3%)**.

Because the alignment is gap-free, alignment-column numbers equal residue numbers in human P69905, mouse P01942, and bovine P01966. The fully conserved positions are:

`1-4, 7-8, 10, 12-17, 19, 21, 24-34, 36-48, 50-60, 62-64, 66-67, 70, 73, 75-76, 78, 80-82, 84-104, 106-111, 113, 115, 118-131, 133-142`

Clearly mapped examples:

- Alignment column 7 = Asp (D): P69905 D7, P01942 D7, P01966 D7.
- Alignment column 16 = Gly (G): P69905 G16, P01942 G16, P01966 G16.
- Alignment column 59 = His (H): P69905 H59, P01942 H59, P01966 H59.
- Alignment column 88 = His (H): P69905 H88, P01942 H88, P01966 H88.
- Alignment column 142 = Arg (R): P69905 R142, P01942 R142, P01966 R142.

## Interpretation limitation

Sequence conservation is evidence of evolutionary constraint and can support a functional hypothesis, but it does not by itself prove a residue's function. Conservation may reflect structural stability, folding, interaction constraints, mutational biases, shared ancestry, or limits of the three-species sample. Functional assignment requires independent evidence such as mutagenesis, biochemical or binding assays, structural analysis, and appropriate in-vivo validation.
