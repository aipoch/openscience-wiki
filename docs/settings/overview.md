---
sidebar_position: 1
title: Settings overview
---

# Settings overview

Open Settings from the lower-left corner of the workspace. The navigation is divided into Capabilities and Workspace, followed by Archived. The top bar contains browsing history, maximize, and close controls.

| Global control | Behavior |
| --- | --- |
| `Back` / `Forward` | Move between a main Settings panel and its Detail, Add, or Import subviews |
| Breadcrumb back button | Return from a subview to its main panel |
| `Maximize` / `Restore` | Switch between a large dialog and full-screen Settings |
| `Close settings` | Return to the original project and session without losing settings that were saved successfully |
| `Dismiss settings error` | Close the error banner; the failed operation is not retried automatically |
| Mobile navigation button | Open or close the Settings navigation drawer |

![Maximized Model settings](/img/open-science/settings-model-maximized.png)

## The 17 main panels

| Group | Panel | What it manages |
| --- | --- | --- |
| Capabilities | Skills | Skill packages, enable switches, search, import, and creation |
|  | Connectors | Built-in and custom MCP connectors, OAuth, import, and export |
|  | Specialists | Specialist identities, instructions, and Skill/Connector access |
|  | Memory | Opt-in project-scoped facts recalled across sessions |
|  | Compute | Local and SSH hosts, resources, scratch space, and concurrency limits |
|  | Network | Network status, global proxy, package mirrors, and Notebook domain allowlist |
| Workspace | Model | Provider and scenario models for main, subagent, reviewer, vision, and session details |
|  | Agent | OpenCode, Claude, Codex, and CodeBuddy runtimes, including switch, install, and repair operations |
|  | Tags | Cross-resource tags and Favorites ordering |
|  | Permissions | Default mode and saved scope grants |
|  | Credentials | Device-wide keys, tokens, OAuth sign-ins, health, and recovery |
|  | Runtimes | Python and R environments, package installation, and environment management |
|  | Storage | Configuration write access, data-root migration, and disk usage |
|  | Remote | Browser access, pairing, Remote.It, and trusted devices |
|  | Usage | Token, call, run, project, and artifact analytics |
|  | General | Notifications, theme, language, app icon, close behavior, diagnostics, and version |
| — | Archived | Restore or permanently delete archived projects and sessions |

:::info[How settings are saved]
Some switches are saved immediately. Longer forms use `Save`, `Add`, or `Import`. Do not close the application while `Saving…`, `Testing…`, or `Installing…` is shown. Migration, uninstall, deletion, and broad-permission actions require confirmation.
:::
