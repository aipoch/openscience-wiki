---
title: "Skill directory"
last_update:
  date: '2026-09-24'
---

# Skill directory

The application provides **23 bundled Skills**. This directory groups them by the work they support. Entries describe the shipped method; they do not claim that every external model, dependency or service is installed.

For methods distributed through the app, use the [marketplace installation guide](marketplace.md). The directory below helps you choose a research method; it is not a live inventory of marketplace versions.

## Check readiness before selecting a method

1. Open the Skill in Settings and read its complete requirements and third-party notices.
2. Compare the input type with your actual data. A bulk RNA-seq table is not a single-cell AnnData object; a molecular drawing is not a docking result.
3. Inspect the selected runtime and packages. For remote work, select a usable Compute Host and inspect its environment before submitting.
4. Request one bounded run, inspect the actual output, and retain the input/version references before scaling up.

Two additional manifest entries, self-awareness and skill-creator, are internal framework resources. They are not user-facing directory entries. Personal or imported Skills, including rnaseq-count-qc, are separate from the count of 23.

The three Environment application Skills and Customize stay enabled; see [activation rules](overview.md#why-some-switches-cannot-be-turned-off). Use the [bundled manifest](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json) to identify shipped methods and [Remote compute](../guides/remote-compute.md) for host setup and result delivery.

## Browse by research task

### Protein structure

| Skill | Input | Dependencies and execution | Output to inspect |
| --- | --- | --- | --- |
| [AlphaFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | Protein FASTA; monomer or complex | ColabFold, model weights, GPU; optional public MSA service | Predicted structures and confidence scores |
| [Boltz](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | Protein/DNA/RNA/ligand complex specification | Boltz package, weights, GPU; MSA access where requested | Complex structure and confidence; optional affinity output |
| [Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | Multi-entity FASTA | chai-lab, weights, GPU | All-atom complex and confidence |
| [ESMFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | Sequences or complex inputs | Biohub esm package, weights, CUDA; distinct from fair-esm | Structure predictions; ESMC representations where requested |
| [OpenFold3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | Protein/nucleic-acid/ligand specification | OpenFold3, weights/access, CUDA and configured kernels | Complex structures and scores |

### Protein design

| Skill | Input | Dependencies and execution | Output to inspect |
| --- | --- | --- | --- |
| [DiffDock](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | Target PDB plus ligand SMILES/SDF | DiffDock repository, weights and GPU | Ranked ligand poses; pose confidence is not affinity |
| [ProteinMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | Backbone PDB, designed/fixed chains and residues | Repository, checkpoints, torch/numpy; small jobs support CPU | Designed sequences and scores |
| [LigandMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | Backbone plus ligand/metal/nucleic-acid context | Repository and Python dependencies; small jobs support CPU | Sequences and threaded structures |
| [SolubleMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | Protein backbone | ProteinMPNN repository and soluble checkpoints; CPU possible | Sequences under the soluble-model prior |

### Sequence and cells

| Skill | Input | Dependencies and execution | Output to inspect |
| --- | --- | --- | --- |
| [ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | Protein sequences | fair-esm and weights; bundled procedure uses GPU | Embeddings, logits or contact predictions |
| [Borzoi](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | DNA windows with stated genome/coordinates | borzoi-pytorch, weights and CUDA | Predicted genomic tracks or reference/alternate deltas |
| [Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | DNA sequences or prefixes | Evo 2 weights, compatible CUDA and sufficient memory | Sequence likelihoods, embeddings or generated DNA |
| [scGPT](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | Single-cell AnnData with gene vocabulary mapping | scGPT package, checkpoint and GPU | Cell embeddings or annotation outputs |
| [scvi-tools](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | Single-cell counts and batch/label metadata | scvi-tools/scanpy/anndata; bundled training workflow expects GPU | Latent representation, label transfer or model-based comparisons |

### Evidence and writing

| Skill | Input | Dependencies and execution | Output to inspect |
| --- | --- | --- | --- |
| [Literature Review](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | Research question, identifiers or papers | Source retrieval; OpenAlex key for OpenAlex operations | Verified evidence synthesis and citations |
| [Indication Dossier](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | An indication framed as a patient population | Research tools and source access | Resumable research waypoints and a dossier |

### Environment

| Skill | Input | Dependencies and execution | Output to inspect |
| --- | --- | --- | --- |
| [Environment & Packages](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | Missing package or version question | Selected Python/R runtime and allowed package source | Package inspection, managed installation and import check |
| [Compute Environment Setup](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | Named environment on an SSH/Slurm host | Configured host and user/admin-managed activation | Setup instructions and validation record |
| [Remote Compute (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | A workload and eligible Compute Host | SSH credentials, host, scheduler when applicable | Submitted job, harvested results and published artifacts |

### Authoring

| Skill | Input | Dependencies and execution | Output to inspect |
| --- | --- | --- | --- |
| [Customize](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | A requested Skill or Specialist change | Working agent; native customization operations | Saved package or role with read-back verification |
| [Figure Style](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | Actual data and one final figure | Notebook function and plotting dependencies | Inspected plot with legible labels and faithful data |
| [Figure Composer](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | One claim and immutable data-version references | Main Agent, delegation, plotting and review | Multi-panel figure and review iterations |
| [Paper Narrative](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | Manuscript/abstract, captions and ordered figure deck | Grounded artifact versions and review tools | Paper brief and an ordered figure argument |



Implementation reference: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json).
