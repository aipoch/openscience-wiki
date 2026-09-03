---
sidebar_position: 7
title: Permissions and Runtimes
---

# Permissions and Runtimes

## Permissions

![Permissions panel](/img/open-science/settings-permissions.png)

`Default permission mode` offers Ask for approval, Auto-approve edits, and Full access, with the same meaning as in Composer. Saved grants appear below under Registry writes, Local compute, Connectors, File operations, Skills, and Built-in tools.

- `Filter permissions by scope`: All, Global, Project, or Session.
- Grant row: shows the capability, qualifier, and scope label. A session scope can link to `Open Session: …`.
- Connector policy hint: opens the related Connector.
- `Revoke <capability>`: revoke the grant after confirmation. A notice appears if a broader global or project grant still covers it.
- Refresh or load error: when a store is incomplete, a warning prevents you from mistaking the visible list for the full grant set.

Revocation applies only to later requests; it does not reverse finished operations. Full access also removes prompts for commands and network calls. It is not a suitable long-term default outside an isolated environment.

## Runtimes

![Runtimes panel](/img/open-science/settings-runtimes.png)

`Notebook runtimes` is divided into Python and R. Each language can use an app-managed environment or a user interpreter:

| Control | Behavior |
| --- | --- |
| `Enable <environment>` | Let the agent select this environment |
| `Add interpreter` | Browse for or enter an existing Python or R executable |
| `Download and set up` | Install an app-managed environment and show its progress |
| `Allow package install` | Let Open Science install packages into this user environment, which explicitly changes it |
| `Packages` | Open the package list and manager |
| `Filter packages…` | Filter installed packages by name |
| Add/Install package | Enter a package name and optional version, install it, then restart the kernel when prompted |
| Remove/Uninstall | Remove a package or inactive runtime after confirmation |
| Repair/Retry | Detect or repair a failed app-managed environment again |

Package installation for a user interpreter writes to your own environment, not app-managed storage. Do not bypass the interface by running `%pip`, `!pip`, `install.packages()`, or a system installer in a Notebook cell; doing so breaks tracked environment selection. An R runtime can initialize only when needed, so its first run may take longer.
