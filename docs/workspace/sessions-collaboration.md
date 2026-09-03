---
sidebar_position: 7
title: Branches, Side Chat, and Subagents
---

# Branches, Side Chat, and Subagents

## Message revisions and branches

Editing an earlier message creates a revision. `Previous/Next message revision` moves through the history. Continuing from an earlier node with Branch creates a separate path while leaving the original branch available. Branches work well for method or model comparisons; don't use them to conceal a failed run.

## Side chat

`More send options` → `Side chat` opens a parallel discussion. Use it to clarify a concept, draft supporting text, or discuss the next action without immediately changing the main session's execution order. Closing the panel doesn't merge its conclusions. Copy or reference anything that must enter the main path.

## Specialists

Agent controls can select a Specialist. A Specialist is a reusable agent configuration with an identity, instructions, base prompt, and capability boundaries. During a switch, Open Science resolves the active-run barrier. A request to delete or switch the active specialist can display a dedicated confirmation with the affected details.

## Delegation and subagents

With Delegation enabled, the main agent can create subagents. Each subagent has its own state, message row, and notebook runs, but remains attached to the current project and session. A delegation card reports the question, objective, and lifecycle. Returned results enter the main timeline.

- Configure `Subagent model` and its Reasoning effort under Settings → Model.
- Settings → Agent reports whether the current framework supports delegation.
- Subagent permission requests remain visible, and the permission panel shows the pending count.
- `Release` ends or frees the subtask resource. It doesn't delete the main session evidence.
- Use the Agent filter in Session Notebook to inspect one subagent's runs.

## Context window

Composer `+` → `Context` reports the model limit, current use, and trend. When usage reaches the configured threshold, the agent can compact the conversation and add an explicit activity row. Changing to a larger-context model doesn't restore content already compressed. Save important inputs as project files and reference them with `@`.

## Archive and delete

`Archive` is reversible organization; Settings → Archived can restore the item. `Delete` is permanent and requires confirmation. Before deletion, download required artifacts and notebooks, then check that no external conclusion depends on a file that exists only in this project.
