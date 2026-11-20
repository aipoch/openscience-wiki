---
title: "Built-in research tools"
last_update:
  date: '2026-11-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Built-in research tools

Built-in operations connect the conversation to project files, Notebook execution, literature records and saved results. They are exposed through the active agent framework; the interface may group several operations under an **Agent SDK** or **Notebook** activity card.

## Operations by research task

| Family | Supply | Operation and visible result | Check before relying on it |
| --- | --- | --- | --- |
| File discovery and reading | Project/session and exact input | Lists accessible files or reads supported content | Full name, source and current version; a catalog row is not file-content inspection |
| Notebook execution | Python/R code, runtime and valid input references | Code cell, output, timing and execution status | Actual language/runtime, errors and complete-data checks |
| Artifact publication | A supported output path or inline content | Versioned result card in the conversation/Files | Open the output, compare dimensions/content and retain its version |
| Literature search/import | Query, DOI/PMID or reference files | Retrieved records, Inbox candidates and library entries | Source identifiers, duplicates, review decision and full-text access |
| Plan operations | Research stages and completion criteria | Session Plan with step states | Status matches the outputs actually produced |
| Memory | A fact or instruction intended for reuse | Saved memory in the configured scope | Content and scope, separate from project file storage |
| Skill loading | An available package ID | Method instructions and supporting resources | The intended package was read; loading is not computation |
| Specialist delegation | Role, task and allowed inputs | Child activity and Subagents transcript | Child actually started, ran the requested checks and reported limitations |
| Review | Eligible response and review configuration | Reviewer checks, findings and correction state | Which response/version was reviewed and what evidence was available |

<span id="follow-one-calculation-from-request-to-file" />

## Follow an operation through to its result

1. Send a request with the input and desired output. Follow [First project](../guides/first-project.md) for a small table-to-report task.
2. Expand the activity card and check the requested operation, input and permission scope.
3. After execution, read the tool result. Resolve an error before relying on a summary of it.
4. Open the generated file card and check its contents. For a calculation, open Notebook to inspect the producing code and runtime.

The [data-quality workflow](../workflows/data-quality.md) supplies a complete scientific example. Environment controls are explained in [Notebook](../guides/notebook.md) and [Runtimes](../guides/runtimes.md).

## Read tool activity

| UI element | How to use it |
| --- | --- |
| Activity group | Expands the operations grouped in that run. |
| Tool / Agent SDK / Notebook run | Opens operation details where available. Read inputs, response and error rather than only the group label. |
| Copy code / code disclosure | Copies or reveals the submitted code; it does not execute a second run. |
| Allow / authorization scope / Deny | Controls the displayed operation and chosen scope. Inspect which agent is requesting it. |
| Generated file card | Opens the actual saved result. |
| Open notebook | Opens session execution records and variables. |
| Child task chip | Opens a real delegated task; inspect its own transcript. |

## Avoid common input/output confusion

An uploaded file, a Notebook working file and an artifact version are related but distinct. A file visible in one list may not yet be mounted in a child kernel. Use the current application-provided reference; do not repair an unavailable input by guessing a path or replacing an artifact version ID with its filename.

A Connector-created file may have no captured Python producer block. **No producer block**, **No review for this version**, **partial** environment and **bounded** evidence are meaningful states, not blanks to fill with generated prose. Use [Troubleshooting](../guides/troubleshooting.md) for exact errors and recovery steps.

Implementation reference: [notebook.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook.ts), [artifacts.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/artifacts.ts), [WorkspaceMessageItem.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/WorkspaceMessageItem.tsx).

For supported long-running work, follow [Background tasks and result delivery](../guides/notebook.md#background-tasks-and-result-delivery). Inspect the actual run and saved outputs after delivery. Environment & Packages, Compute Environment Setup and Remote Compute (SSH) stay enabled, but their runtime, network and host requirements still apply.

For public webpages, use [web search and source reading](web-search.md) with the built-in Open-Science Agent.
