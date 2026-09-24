# Pfam hmmscan interpretation for human hemoglobin alpha

## Query and job

- Query: reviewed canonical human hemoglobin subunit alpha, UniProt P69905 (142 aa)
- Program/database: HMMER3 `hmmscan` against Pfam
- Job ID: `ce9c31ec-f59b-4672-935c-36a675d8ce38`
- Terminal status: `SUCCESS`
- Pfam models searched: 24,076
- Reported/included family hits: 1 / 1

## Domain annotation

The scan identifies the **Globin** family, **PF00042.28** (Pfam accession PF00042; clan CL0090).

- Whole-hit score: 115.572 bits
- Whole-hit E-value: 2.2781 × 10⁻³³
- Significant included domain: query residues **27–137** (1-based, inclusive)
- Pfam model coverage: model positions **1–117** of 117
- Domain bit score: 115.572
- Independent domain E-value (i-Evalue): 2.2781 × 10⁻³³
- Conditional domain E-value (c-Evalue): 9.4620 × 10⁻³⁸
- Connector/provider flags: reported = true, included = true, significant = true

This is extremely strong evidence that P69905 contains the expected globin-fold domain. The significant match covers most of the 142-residue protein; the short N- and C-terminal portions outside residues 27–137 are not evidence of additional domains.

The provider also reported a short alignment fragment at query residues **10–20** (Pfam model positions 101–111), but marked it **not included** and **not significant**. Its domain bit score is −1.003, i-Evalue is 3.2080 × 10³, and c-Evalue is 0.13324. It should not be interpreted as a second globin domain.

Coordinates are query-sequence coordinates reported in the HMMER alignment display and are 1-based inclusive. E-values are database-size-dependent statistical significance measures, not direct probabilities that a biological interpretation is correct.
