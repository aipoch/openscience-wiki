---
title: "Headless service and browser access"
last_update:
  date: '2026-10-27'
---

# Headless service and browser access

The local service provides a headless backend and a localhost browser interface. It is distinct from an SSH Compute host and from Remote.It browser pairing. Choose the authentication and credential-storage settings for the host before connecting a client.

## Target selection and discovery

From v0.37.0, shared services run in an ordinary Node process and the desktop connects as a native client. CLI startup no longer needs a hidden Electron host.

| Selector | Scope |
| --- | --- |
| `--port PORT` | Localhost port, integer 1–65535; an occupied explicit port causes an error |
| `--config-root PATH` / `--profile PATH` | Portable CLI configuration directory; keep the same absolute path throughout |
| `OPEN_SCIENCE_CONFIG_ROOT` | Explicit configuration directory through the environment; command options take precedence |
| Automatic discovery | Find local service state and confirm its profile, port and version |

Desktop backends select a free port when none is specified; CLI startup defaults to 44100. Use `status --json` rather than inferring the port from an open window. A compatible existing service for the same configuration can be reused; finish active work and follow the update instructions when versions do not match. The legacy `--app-path` option does not turn an Electron executable into a new Node backend.

The state file is `web-service.json`. Authentication failure is not permission to delete that record or kill its PID. Inspect the actual service and diagnostics first to avoid affecting another process.

## Initialize and check readiness {/* #readiness */}

Use `open-science init` to prepare the default configuration directory without starting the app. For an isolated configuration, pass the same absolute `--profile` path to init, start and subsequent commands. Debian packages install the CLI alongside the application. See [terminal setup](cli.md#terminal-setup) for Codex preparation and login.

After an intentional `start --no-open`, run `open-science doctor --json`. Inspect overall `ready`, individual checks and suggested next actions; the process exit code alone is not a readiness verdict. Keep the service on its existing authenticated local interface. Starting this headless service does not configure Remote.It or publish a public endpoint.

## Lifecycle commands

| Command | Result | Options and boundary |
| --- | --- | --- |
| `open-science start` | Start the backend and open the browser | Default port 44100 |
| `open-science start --no-open` | Start without opening a browser | Use for an intentional local service session |
| `open-science status --json` | Print machine-readable service state | A missing service returns `{"running":false}` and exit code 1 |
| `open-science url` | Print the authenticated browser URL | Contains local access authority; do not paste into published examples |
| `open-science stop` | Request authenticated graceful shutdown | Does not blindly signal a PID from a stale state file |
| `open-science stop --json` | Report the shutdown outcome | See the result table below |

Among these commands, **status and stop support `--json`; start and url do not**. The local `start --json` check returned `invalid_cli_usage` with exit code 2 before starting anything. For a scripted launch, run `start --no-open`, then `status --json`.

### Shutdown outcomes

| JSON `result` | Meaning |
| --- | --- |
| `already-stopped` | No live service record found |
| `daemon-stopped` | Authenticated Node backend exited; attached clients lose their backend connection |
| `web-service-stopped` | Legacy Electron web-service outcome, not the new standalone Node backend |

A rejected request or missed shutdown deadline returns a failure. Read the error and inspect the actual target state. Do not report a service as stopped merely because the command returned.

## Authentication and browser access

The SDK discovers the local service and reads its local authentication token, sending it in request headers. Ordinary human/JSON/JSONL task output does not print that token. `url` is the intentional exception that produces an authenticated browser entry.

A localhost service is not automatically accessible from another computer. Remote browser access uses its own configured access mode, pairing and trusted-browser lifecycle. SSH Compute instead sends jobs to configured remote execution hosts.

Use [Remote browser access](../guides/remote-access.md) for Remote.It pairing, and [Remote compute](../guides/remote-compute.md) for SSH jobs. Neither flow is configured by changing the local service's documentation URL.

### Credential storage on headless Linux

The default is OS-protected storage. On a Linux headless backend without a usable keyring, choose an explicit alternative:

<p className="example-label"><strong>Example</strong> Start a Linux headless service with file credential storage</p>

~~~bash
open-science start --credential-store=file --no-open
~~~

| Choice | Behavior |
| --- | --- |
| Omitted option / --credential-store=os | Require the OS-protected store |
| --credential-store=file | Allow unencrypted Settings-managed secrets on Linux headless only |
| Desktop, macOS or Windows launch | File mode is not supported |
| Already-running backend | Explicit mode selection is rejected; it does not change that process's mode |
| Next startup | Specify the mode again; it is not a saved preference |

File mode uses settings.json and credentials.json under the configuration root, with atomic writes and POSIX mode 0600. The file:v1: value is base64-encoded, **not encrypted**. Anyone who can read it can recover the secret; exclude these files from repositories, images and support reports.

The choice applies to new/updated Settings-managed provider keys, app-managed subscription tokens, GitHub/literature keys and shared MCP/OAuth secrets. Compute passwords/protected Compute data keep their separate OS-storage requirement; external agent-framework login stores follow their own rules. No sandbox is disabled by this option.

Existing encrypted values are not automatically migrated and still require their original OS vault. If unavailable, re-enter the credential through the normal supported form. File refs require explicit file mode to read and are incompatible with older releases. To return a credential to OS storage, restart in OS mode and explicitly replace it while the vault is available.

Use persistent storage when the configuration must survive container replacement. Shutdown retains configuration; replacing a disposable container filesystem can remove it. See the [credential-storage contract](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## Backend ownership and shutdown {/* #backend-ownership */}

| Action | Effect on the backend |
| --- | --- |
| Close a browser tab | Backend keeps running |
| Quit the desktop that started the backend | Its owned backend stops with it |
| Quit a desktop attached to an existing CLI backend | Only that client detaches; the CLI backend keeps running |
| `open-science stop` | Stop the selected backend, affecting all clients attached to it |

Closing a window can differ from quitting the app, especially when it remains in the tray. Finish active research before stopping a shared backend, then inspect the actual state with `status --json`.

A disconnected desktop offers **Reconnect** and **Quit app**. Reconnect refreshes the original live backend and does not resubmit work; if that backend is gone, quit and reopen. A disconnected Quit may close only the client, so inspect the selected profile's status before assuming the service stopped. Follow [connection recovery](../guides/troubleshooting.md#connection-recovery), including checking operations whose responses were lost.

### Reconnect after an interrupted desktop shutdown {/* #desktop-service-recovery */}

If the desktop exits unexpectedly while its backend survives, reopening a same-version desktop can adopt that desktop-launched service after the old controller and teardown settle. A CLI-launched service remains borrowed; ordinary desktop Quit does not stop it merely because the desktop reconnected.

If quit preparation fails, the window stays open. Read the notice, preserve unsaved work and wait for the conversation to recover before checking the original run and files. An open window does not mean the task was cancelled. If startup reports an older standalone service blocking it, check the profile and version before choosing the explicit stop action. Cancel leaves that service running; a failed stop can be retried or rechecked without deleting lock files.

## Application update behavior

v1.0.0 removes the CLI application updater; do not use `open-science update --json`. Use the desktop update controls or the original installer/package manager, observing [current release availability](../guides/installation.md#standalone-cli).

- **Desktop app:** finish active research before checking updates. If updating while attached to a CLI service asks to stop it and switch to desktop management, check the profile and affected tasks before consenting. Cancel leaves the original service running. This switch does not upgrade the original standalone CLI program files.
- **Standalone CLI installation:** stop every profile using it, then install an actually published package through its original channel. Do not overwrite running files or reopen a profile with an old backend after a newer desktop has written to it.
- **Occupancy or recovery notice:** follow the displayed checks for active instances and installation state. Do not delete locks, configuration or recovery records to force an update when shutdown is uncertain.

After upgrading, confirm the version and original data, then use `status --json` and `doctor --json` to inspect service state and readiness. Preserve the credential-store mode. [1.x compatibility](../guides/installation.md#version-compatibility) does not promise mixed desktop/backend versions.

See the [official runtime guide](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md), [CLI](cli.md) and [Task SDK](api.md).

## Compute in the web workspace {/* #web-compute */}

The standalone web workspace exposes **Compute** when its backend provides the required Notebook and Compute APIs. Open the connected workspace, check that the panel is available, then use the existing SSH/Slurm configuration steps. An available panel does not supply remote credentials or confirm that a job can run.

## Packages and external tool clients {/* #local-research-tools */}

Authenticated local web sessions can [import and export research packages](../guides/research-packages.md#local-package-transfer); remote web sessions cannot perform these arbitrary-path transfers. To expose research tools to an external client on the same machine, configure the [stdio MCP adapter](cli.md#external-mcp). It connects to an already-running local service and uses that profile's permissions; it does not create a remote MCP URL.
