---
title: "Scientific tool catalog"
last_update:
  date: '2026-11-11'
---

# Scientific tool catalog

Use this catalog to find the Open-Science entry point and runtime requirements for a scientific method. It is a documentation index, not an application page that installs every listed program.

## Software families and where they run

| Software family | Open-Science entry | Setup to verify | Useful first check |
| --- | --- | --- | --- |
| Python standard library and plotting | Session Notebook | Selected Python interpreter; plotting dependencies | Read the real QC CSV and produce a small plot |
| R / base R | Session Notebook; Settings → Runtimes → R | Enabled app-managed or detected interpreter | Print R version and reproduce sample summaries |
| Structure-prediction frameworks | Relevant bundled Skill, usually Compute | Compatible GPU, packages, weights, input format and external MSA access if used | One small valid sequence/complex and its output confidence |
| MPNN sequence-design programs | ProteinMPNN / LigandMPNN / SolubleMPNN Skills | Repository/checkpoints and Python dependencies; small CPU jobs are supported by these instructions | One backbone with explicit fixed/design positions |
| Single-cell frameworks | scGPT / scvi-tools Skills | AnnData, cell/gene labels, packages and suitable compute | Validate input dimensions and required layers before training |
| Molecular structure rendering | Molecule Connector / molecule viewer | Built-in offline OpenChemLib route | Save and reopen aspirin.mol |
| File renderers | File preview | Supported extension and preview-size limits | Open the actual downloaded file |
| Remote batch software | Compute Host and remote-compute Skills | Host access, scheduler and named environment | Host probe followed by a bounded job |

See [Skill directory](../skills/directory.md) for the complete 24-Skill method table. This page explains software readiness; it does not duplicate every Skill's procedure.

## Inspect the selected environment

Use **Settings → Runtimes** to inspect available Python/R interpreters. Select the runtime actually bound to the session, then inspect packages there. An executable installed elsewhere on the computer is not automatically the active Notebook interpreter.

Use [Runtimes](../guides/runtimes.md) to prepare an interpreter and [Notebook](../guides/notebook.md) to verify a calculation. If additional packages are needed, check installation and import in that environment. For a download failure, follow [Network](../guides/network.md) using the affected hostname and error.

## Before following a model's install command

Read the installed Skill's exact requirements and the selected environment's supported setup route. Check package-name collisions: **fair-esm** and the Biohub **esm** implementation are distinct even though they share the `esm` namespace. A downloaded model's code and weights can also have different versions and access conditions.

For a local Notebook use the supported package-management flow in [Scientific tools](./scientific.md). For a remote host use [Remote compute](../guides/remote-compute.md). A renderer displaying a PDB proves that it can view a structure; it does not prove AlphaFold or another prediction program is installed.

Implementation reference: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json), [SKILL.md](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md), [notebook-runtime.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts).

Use [Background tasks](../guides/notebook.md#background-tasks-and-result-delivery) to track supported long-running work and inspect delivered results. Scientific packages still need to be available in the selected runtime.
