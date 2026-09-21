---
title: "Capabilities and supported inputs"
last_update:
  date: '2026-09-14'
---

# Capabilities and supported inputs

Open-Science brings a research project's conversations, source files, literature records and generated results into a local workspace. A configured model directs the work; Notebook runtimes, tools and connected services perform the operations that need them. Choose a starting point from the material you already have.

## Start with your input

| You have | First action | Result to ask for | Check before using it |
| --- | --- | --- | --- |
| A research question and several DOIs | Create a project; look up the identifiers and review Library Inbox candidates | A source-checked reading collection | Titles, author lists, years and identifiers against the publisher |
| A folder of papers or exported references | Use the Literature library's import and collection controls | An organized collection with attached available PDFs | Import warnings, duplicates and attachment matches |
| A CSV or TSV | Attach it to a session and request a Notebook analysis | A data audit, result table and figure | Missing values, units, denominators and the saved files |
| A PDF or manuscript | Attach the document or open it in Files | A passage-specific explanation or revision plan | Whether the agent read the full text and whether cited pages support its claims |
| A sequence or molecular structure | Open a supported FASTA, PDB or molecule file | A preview, validation report or analysis using a suitable tool | Input conventions, method requirements and tool availability |
| A procedure you reuse | Create or import a Skill | Reusable instructions and supporting files | Enabled status, required dependencies and a trial on a known input |
| A defined research role | Create a Specialist and assign its capabilities | A role with explicit instructions and access | Selected Skills, Connectors and the result of delegated work |

For figures and tables in a paper, use [local PDF extraction](previews.md#pdf-extraction). Find reusable methods through the [Skill marketplace](../skills/marketplace.md). Check a captured result with [Reproducibility](reproducibility.md), or share its conversation and evidence through a [.science package](research-packages.md).

A viewer opening a file does not show that the model has read it. Attaching a file gives the session a source to work with; inspect the recorded reads, tool calls and output evidence to establish how the agent used it. Exact extensions and size limits are in [File formats and limits](../reference/formats.md).

## Understand the workspace objects

| Object | What you keep there | Relationship to other objects |
| --- | --- | --- |
| **Project** | Research purpose, durable Agent Context, sessions and project files | Use it to keep one investigation together |
| **Session** | Requests, responses, tool activity and conversation branches | Each session belongs to a project |
| **Upload** | A managed copy of source material | Keep it separate from derived results |
| **Artifact** | A generated report, figure, table or other file | Versions retain evidence associated with their production |
| **Literature reference** | Bibliographic metadata, identifiers and attachments | Organize it in collections and associate it with projects |
| **Notebook** | Python or R execution and its outputs | Inspect the session's calculations and live variables |
| **Skill** | Instructions and supporting files for a method | Enable it and select it from the composer when appropriate |
| **Specialist** | A role, instructions and selected capabilities | Configure and invoke it for work that fits that role |
| **Connector** | Access to external tools or data services | Availability depends on configuration, credentials and policy |

Project **Description** helps you identify the project. Put instructions the agent must follow in **Agent Context**. The latter is included in model context; it is not a place to store credentials.

## Prepare only the dependencies your task needs

A conversation needs a working agent framework and model connection. A Python calculation also needs an enabled Python Notebook runtime. A service lookup needs the relevant Connector, network access and any required credential. A GPU method can require a separate machine, software environment and model weights even when its Skill is already listed.

Configure the model, runtime and data services separately. After connecting the model, check the packages required for the calculation. If a package is missing, install it or explicitly choose a method that uses the available environment.

See [Provider setup](providers.md), [Python and R runtimes](runtimes.md) and [Network](network.md) for these independent setup paths. A successful model connection test does not validate every downstream service.

## Decide whether a result is ready

Open the saved output and compare it with the request. For a table, check the row count, units and missing-data treatment. For a bibliography, verify identifiers and complete authors. For code-generated results, inspect **Provenance** and the Notebook. Review labels such as partial environment capture or unavailable evidence before calling a result reproducible.

The formal examples use public research inputs:

- [PRISMA reading collection](../workflows/core-reading-list.md): three real papers, reviewed Library records and an attached publisher PDF.
- [GSE60450 RNA-seq analysis](../workflows/data-quality.md): 27,179 gene rows, 12 samples, independently checked QC metrics, a raw-count figure and captured producer code.

[Remote compute](remote-compute.md) covers RNA-seq QC through Direct SSH, collecting results, recovery and cancellation. It also explains Slurm accounting requirements and a small ProteinMPNN sequence-design workflow on an A100 GPU in an isolated CUDA environment.

## Local storage and external processing

The application stores its workspace locally. When you send a request to a hosted model, relevant instructions and content go to that provider. Connectors and remote jobs can send data to their configured services. Use the actual selected provider and tool activity to identify where a task runs; local storage alone does not mean offline processing.

**Source review:** [product documentation](https://github.com/aipoch/open-science/blob/v0.26.0/README.md), [project fields](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/projects.ts) and [preview routing](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts). The two linked case studies carry their operation records and English screenshots.
