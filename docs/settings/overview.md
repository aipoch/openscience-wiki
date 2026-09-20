---
sidebar_position: 1
title: Settings overview
last_update:
  date: '2026-09-20'
---

# Settings overview

Open **Settings** from the lower-left corner of the workspace. Its 17 panels are organized into four groups: **Intelligence**, **Connections**, **Workspace** and **System**. Choose a panel by purpose, or search from the header. In these guides, **Settings → Model**, for example, refers to the Model panel inside Intelligence.

| Global control | Behavior |
| --- | --- |
| `Back` / `Forward` | Move between a main Settings panel and its Detail, Add, or Import subviews |
| Breadcrumb back button | Return from a subview to its main panel |
| `Maximize` / `Restore` | Switch between a large dialog and full-screen Settings |
| `Close settings` | Return to the original project and session without losing settings that were saved successfully |
| `Dismiss settings error` | Close the error banner; the failed operation is not retried automatically |
| Mobile navigation button | Open or close the Settings navigation drawer |

## Find a setting

1. Open Settings and focus **Search settings** in the header. **⌘K** on macOS or **Ctrl+K** on Windows/Linux focuses this search while Settings is active.
2. Enter a panel name or task, such as `Package mirror`, `Main model` or `Diagnostics`.
3. Use **Up/Down** to choose a result and **Enter** to open its panel, or click the result. The destination panel is highlighted briefly; locate the named setting there.
4. Use **Back** to return. Clear the query to search for another setting. A panel's own search filters its list rather than searching all settings.

This search covers representative settings across every panel, not every field or research document. If a term does not match, use the panel name or the navigation groups below. To search conversations or files, close Settings and use [global search](../guides/navigation.md).

## The 17 main panels

| Group | Panel | What it manages |
| --- | --- | --- |
| Intelligence | [Model](../guides/models.md) | Provider and scenario models |
|  | [Agent](../guides/frameworks.md) | Agent framework installation, switching and repair |
|  | [Skills](../skills/overview.md) | Reusable research methods and their availability |
|  | [Specialists](../specialists/overview.md) | Specialist roles and capability access |
|  | [Memory](../guides/memory.md) | Opt-in global and project notes |
| Connections | [Connectors](../guides/connectors.md) | Data services, custom MCP connections and imports |
|  | [Network](../guides/network.md) | Proxy, package mirrors and Notebook domain access |
|  | [Remote](../guides/remote-access.md) | Browser access, pairing and trusted devices |
|  | [Credentials](../tools/credentials.md) | Keys, tokens, OAuth and credential recovery |
| Workspace | [Tags](../guides/tags.md) | Tags and Favorites ordering |
|  | [Permissions](../guides/approval-modes.md) | Default mode and saved grants |
|  | [Runtimes](../guides/runtimes.md) | Python/R environments and packages |
|  | [Storage](../guides/storage.md) | Data location, write access and disk usage |
|  | [Compute](../guides/remote-compute.md) | Local and SSH compute resources |
|  | [Usage](../guides/usage.md) | Token, call and research activity statistics |
|  | [Archived](../guides/storage.md) | Restore or permanently delete archived work |
| System | [General](../guides/appearance.md) | Appearance, notifications, diagnostics and version |

**Feedback** remains a separate entry at the bottom of Settings.

:::info[How settings are saved]
Some switches are saved immediately. Longer forms use `Save`, `Add`, or `Import`. Do not close the application while `Saving…`, `Testing…`, or `Installing…` is shown. Migration, uninstall, deletion, and broad-permission actions require confirmation.
:::

## Model settings tabs {/* #model-tabs */}

Within **Model**, use **Conversation models** for providers and task models, **Classification models** for optional Skill/Connector selection, and **Local parsing models** for local parsing resources. Classification is a tab within model settings, not an additional top-level Settings panel. See [classification setup](../guides/models.md#classification-models).
