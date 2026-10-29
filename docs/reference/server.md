---
title: "Headless service and browser access"
last_update:
  date: '2026-10-29'
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

## Lifecycle commands {/* #lifecycle-commands */}

From v1.0.5, an App connection or an explicit CLI start keeps the service alive. Use the same absolute profile path for all commands.

| Command | Result |
| --- | --- |
| `open-science start` | Start or reuse the service, keep it running explicitly, and open the browser |
| `open-science start --no-open --json` | Set the same persistent hold without opening a browser; return `started` or `already-running`, service information and `lifetime` |
| `open-science status --json` | Inspect the selected service; a missing service returns `{"running":false}` and exit code 1 |
| `open-science url` | Print its authenticated browser URL; keep this private |
| `open-science stop --json` | Release the explicit hold; stop only when no App remains connected |
| `open-science stop --force --json` | Request a whole-service stop, including connected Apps; may interrupt active tasks |

Repeated `start` calls do not accumulate holds. **start**, **status** and **stop** support `--json`; **url** does not. JSON launch output does not expose the authenticated browser URL. Older services may report an unknown lifetime; use matching versions before relying on the new contract.

### Shutdown outcomes

| JSON `result` | Meaning |
| --- | --- |
| `already-stopped` | No live service record found |
| `keep-alive-revoked` | Explicit running was revoked, but connected Apps still keep the service alive |
| `stopped` | The requested service generation exited and released ownership |
| `shutdown-requested` | A legacy service accepted the request but exit is unconfirmed; the command returns a nonzero exit code |

Read `result` and `lifetime`; a successful exit code alone does not mean the service stopped. The older `daemon-stopped` and `web-service-stopped` result names are no longer emitted. `--force` requires the modern lifetime protocol and fails explicitly against an older service. Inspect errors and current status instead of deleting state files or killing a recorded PID.

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
| Quit the last connected App without an explicit CLI start | Service stops |
| Run CLI `start`, then quit all Apps | Service keeps running under the explicit hold |
| Close a browser tab or SDK client | Does not release the explicit hold |
| Run an ordinary CLI, Web or SDK task | Does not independently keep the service alive after all Apps quit |
| Run `open-science stop` with an App connected | Release the explicit hold; service continues for the connected App |
| Run `open-science stop --force` | Request service-wide shutdown, potentially interrupting work |

If browser or automated work must continue after quitting the desktop, explicitly start the same profile first. Closing a window to the tray is not quitting. Finish active research before a whole-service stop, then check `status --json`.

A disconnected desktop offers **Reconnect** and **Quit app**. Reconnect does not resubmit work. Follow [connection recovery](../guides/troubleshooting.md#connection-recovery), and inspect operations whose responses were lost before retrying.

### Reconnect after an interrupted desktop shutdown {/* #desktop-service-recovery */}

Reopen the same-version desktop and reconnect to the original profile. App connections and any explicit CLI hold determine whether that service stays alive; a browser tab alone does not replace either.

If quit preparation fails, the window stays open. Preserve unsaved work and inspect the original task after recovery. If startup reports an older service blocking it, check the profile, version and active clients before choosing its explicit stop action. Cancel leaves the service running. A failed stop can be retried or rechecked without deleting lock files.

## Application update behavior {/* #application-update-behavior */}

The CLI application updater remains removed; do not use `open-science update --json`. Use [desktop update controls or the original installation channel](../guides/installation.md#manual-update).

Before replacing standalone CLI files, finish work in every profile using that installation. Quit its connected Apps and release each profile's explicit hold with `stop --json`. Confirm `stopped` or `already-stopped`; `keep-alive-revoked` means an App still keeps the service running. Use `stop --force` only when you intend to stop all clients' work. Do not overwrite running program files.

A desktop update may ask to stop an attached CLI service and switch to desktop management. Check the profile and affected tasks before consenting; cancelling leaves it running. This does not update the original standalone CLI program files. Follow occupancy and recovery notices without deleting locks or configuration.

After upgrading, confirm the version and original data, then inspect `status --json` and `doctor --json`. Preserve the credential-store mode. [1.x compatibility](../guides/installation.md#version-compatibility) does not promise mixed desktop/backend versions. See the [official runtime guide](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md), [CLI](cli.md) and [Task SDK](api.md).

## Compute in the web workspace {/* #web-compute */}

The standalone web workspace exposes **Compute** when its backend provides the required Notebook and Compute APIs. Open the connected workspace, check that the panel is available, then use the existing SSH/Slurm configuration steps. An available panel does not supply remote credentials or confirm that a job can run.

## Packages and external tool clients {/* #local-research-tools */}

Authenticated local Web sessions can [upload and download research packages](../guides/research-packages.md#local-package-transfer); remote Web sessions do not gain this transfer capability. To connect an external tool client on the same machine, configure the [stdio MCP adapter](cli.md#external-mcp). It uses an already-running local service and that profile's permissions; it does not create a remote MCP URL.
