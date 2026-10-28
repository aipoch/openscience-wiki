---
title: "CLI and structured output"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLI and structured output

Use `open-science` to inspect application status, run tasks, manage Connectors and credentials, and operate the local service. Start with the installed launcher and confirm which local instance it connects to.

<PlatformGuide />

**Application updater removed:** v1.0.0 no longer accepts `open-science update`, including its `--json` form. Use the desktop update controls or the original installer/package manager. The former updater-only exit codes 5 and 6 are not part of the current CLI table. See [upgrade guidance](../guides/installation.md#version-compatibility).

## Set up from a terminal {/* #terminal-setup */}

Install the desktop launcher, use a v1.0.2 standalone archive, or follow the [npm installation steps](../guides/installation.md#npm-cli). Standalone archives bundle Node, the backend and Web UI; the extraction steps below apply to those archives.

1. Choose macOS or Linux arm64/x64, or Windows x64, matching the host.
2. Extract the complete archive into a writable location. Keep the launcher, `backend` and `node-runtime` together; copying only the launcher will break startup.
3. From that directory, run `./open-science --help` on macOS/Linux, or `./open-science.cmd --help` in PowerShell. After adding that directory to PATH, open a new terminal and use `open-science` as below.
4. Start the local backend and check readiness. Starting it alone does not configure a model.

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init` creates the configuration directory without starting the application. `--profile` aliases `--config-root` for a portable CLI profile. Use the same absolute configuration directory for init, start and subsequent commands; a separate profile has its own setup. `runtime list` shows detected framework readiness, version and managed/external source without exposing executable paths.

For an unconfigured Codex setup:

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

Follow the login flow. This prepares or repairs the managed Codex runtime and registers the subscription through the application; it does not import external Codex login files. First-run bootstrap currently targets Codex, even though runtime listing includes other frameworks. Existing conflicting configuration is reported rather than silently replaced.

If using an OpenAI API key instead, use `provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`, with a supported model ID and the key already supplied through your secret-management environment. For OpenAlex, use `connector configure literature --openalex-key-env OPENALEX_API_KEY --json`. Prefix both commands with `open-science`. Never put the key itself in command arguments. A successful credential check does not establish that a research query completed or that quota remains.

Read **ready**, the individual **checks** and suggested **next** actions from `doctor`. A report can exit successfully while `ready` is false; if the backend is absent, Doctor reports it and exits 3. Complete the reported prerequisite, check again, then [run a task](#run-input-and-control-flags) in the intended project.

For Homebrew or Linux `.deb`/`.rpm` installation, follow the [package instructions](../guides/installation.md#standalone-cli). Linux distribution packages provide `open-science-cli`; substitute that command in the examples on this page to avoid selecting a different desktop launcher.

## Entry points

| Entry | Requirement | Command |
| --- | --- | --- |
| Installed application launcher | **Settings → General → Command line tool → Install command** | `open-science --help` |
| Source checkout | Built application and repository dependencies | `node packages/open-science/cli.mjs --help` |
| Standalone CLI archive | Matching OS/architecture; preserve the complete extracted directory | `./open-science --help` or `./open-science.cmd --help` |
| npm client / SDK | Node.js 22.13+ and a running compatible backend; check package requirements before installation | Package identifier `@aipoch/open-science` |

The installed launcher uses the application's bundled runtime. If its directory is absent from PATH, follow the General panel's displayed instruction and open a new terminal. Do not rename the executable to match display branding.

<PlatformContent platform="windows">

After **Install command**, open a new PowerShell window and run:

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

Check that **Source** points to the launcher displayed in General, usually an `open-science.cmd` under your user profile. Successful help output confirms the launcher runs. If status returns `{"running":false}`, the CLI has not reported a running backend; this does not mean the desktop window is closed. Check the intended instance using [Server mode](server.md) before submitting tasks or downloading files.

</PlatformContent>

## Complete a small command-line task

<p className="example-label"><strong>Example</strong> Save a note from the command line</p>

1. Install the command using the entry above. Keep a backend running with a working model, either through the desktop or `start --no-open`.
2. Run `open-science status --json`, then `open-science project list --json`. Check the intended instance and copy a returned project ID.
3. Save `task.md` with: **Save project-note.md containing a brief connection-check note. Do not read other files or use the network.**
4. Run the commands under [Run input and control flags](#run-input-and-control-flags). Replace each placeholder only after obtaining its ID from the preceding result.
5. If the run pauses for permission, respond in the corresponding desktop or authenticated browser conversation. `--wait` can time out while the task continues; inspect `run status RUN_ID --json` before submitting again.
6. Select the returned Markdown artifact ID, download it to a new local filename, and open it. A completed run without the requested artifact requires a follow-up in that session. If the artifact exists but download fails, follow [artifact download recovery](./api.md#a-completed-task-whose-file-will-not-download).

For plan-first tasks, use `--return-on-attention`, inspect the returned plan and respond through the application or the plan commands below. For JSON integrations, distinguish running, completed, failed and cancelled instead of treating every successful HTTP response as a finished task.

## Command families

| Command | Arguments / flags | Effect |
| --- | --- | --- |
| `project list` | `--json` | Read available projects |
| `project create` | Name, optional `--description`, one of `--agent-context` / `--agent-context-file` | Create a project |
| `project update` | ID or exact name, supplied metadata/context fields | Modify only supplied fields; `--clear-agent-context` explicitly clears context |
| `project session-defaults show` | Project ID or exact name | Read defaults for new sessions |
| `project session-defaults update` | Project plus session options | Update defaults with concurrent-edit protection |
| `run` | `--project`, prompt input, optional `--session`, `--wait` | Start or continue work |
| `run status` / `run cancel` | Run ID | Inspect or explicitly cancel a run |
| `session status` | Session ID | Read session state |
| `session config show` | Session ID | Read persisted/effective configuration and revision |
| `session config update` | Session ID, `--revision`, supplied options | Change future turns when the session can accept the update |
| `settings agent-routing show/update` | Framework and Reviewer/Subagent routing options | Read or atomically update global routing |
| `plan show/approve/reject/revise` | Session ID; decision requires exact artifact version and revision | Read or respond to the active plan |
| `artifacts list` | Session ID | Read saved artifacts |
| `artifacts download` | Artifact ID, `--output` | Save an external copy |

Use project IDs in scripts. The CLI can resolve a unique exact project name; duplicate names are ambiguous. SDK/HTTP routing requires IDs directly. Project context accepts up to 16,000 characters, and list/create/update results expose `hasAgentContext` rather than the private context body.

If `artifacts download` fails with HTTP 500, update an older application and retry the same returned artifact ID. The [download recovery steps](api.md#a-completed-task-whose-file-will-not-download) distinguish a completed task from a failed file transfer; do not rerun the research task just to obtain its existing output.

## Manage Connectors and credentials

These commands use the running backend and saved Settings. Confirm the intended instance before editing. Custom Connector and credential writes require a local authenticated connection; for a server, run the CLI on that server, including through SSH.

| Command | Input / result |
| --- | --- |
| open-science connector list --json | Safe settings views of the available Connectors |
| open-science connector show CONNECTOR_ID --json | Configuration/status for a returned ID |
| open-science connector enable CONNECTOR_ID | Set its enabled preference |
| open-science connector disable CONNECTOR_ID | Clear its enabled preference |
| open-science connector add --json | Read a new custom MCP definition from JSON stdin |
| open-science connector update CONNECTOR_ID --json | Read the configuration update from JSON stdin |
| open-science connector remove CONNECTOR_ID | Remove a custom MCP definition |
| open-science connector test CONNECTOR_ID --json | Discover tools through a separate connection, then close it |
| open-science credential list --json | Read credential metadata without raw secrets |
| open-science credential add --json | Read a new credential from JSON stdin |
| open-science credential update CREDENTIAL_ID --json | Update displayName and/or secret from JSON stdin |

<p className="example-label"><strong>Example</strong> Submit a local Connector configuration</p>

Submit your prepared local configuration file with:

~~~bash
open-science connector add --json < connector.json
~~~

| Configuration field | Requirement |
| --- | --- |
| name / displayName | Required for a new custom Connector; name/ID remain stable during updates |
| transport | stdio, streamable_http or sse; also required for update |
| command / args | Local executable and optional arguments for stdio |
| url | Endpoint for HTTP/SSE |
| envCredentialIds / headerCredentialIds | Bind environment/header names to saved credential IDs |
| oauthCredentialId | Bind an existing shared OAuth credential |
| Omitted credential bindings | Preserve saved values on update; an empty environment/header binding object clears that map |

Only custom MCP definitions can be added, edited or removed. **Enabled** is a selection preference, not proof of connectivity or global revocation of Specialist access.

**test** does not enable the Connector or execute its business tools. It returns success, optional toolCount and a message; discovery is bounded to ten seconds and failure exits nonzero. Bundled Connector live diagnostics are unsupported. Testing may refresh existing OAuth tokens but does not perform first-time browser sign-in.

Credential writes accept secrets through JSON stdin. Keep them out of command arguments and shell history. A token input uses displayName, kind: token and secret; api_key is also supported. Bind the returned createdCredential.id to the Connector. Older backends without these endpoints return an error rather than falling back to direct Settings-file edits.

## Run input and control flags

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

Replace the capitalized placeholders with returned IDs. The example does not name an invented Skill or provider that must exist on your installation.

| Flag | Contract |
| --- | --- |
| `--prompt` / `--prompt-file` | Inline text or UTF-8 file; stdin can provide a prompt when omitted |
| `--session` | Continue the specified session |
| `--cwd` | External working directory; CLI resolves a relative path, server canonicalizes and validates it |
| `--approval-profile` | `ask`, `auto`, `full`; default `ask` |
| `--provider` + `--model` / `--provider-default-model` | Select a configured provider and an explicit or provider-owned default model |
| `--reasoning-effort` | CLI help lists `default`, `low`, `medium`, `high`, `xhigh`, `max`; UI model choices can differ |
| `--skill` | Repeatable installed Skill ID; does not install a missing Skill |
| `--plan-first` | Require a plan response before execution |
| `--auto-review` / `--no-auto-review` | Set session automatic review |
| `--memory` / `--no-memory` | Set session memory; mutually exclusive |
| `--specialist` | Bind a new session by UUID or stable profile name; presentation display name is not a routing ID |
| `--delegation allow/deny` | Control admission of new delegated work; deny does not cancel existing children |
| `--compute-host` | Repeatable configured host IDs; selects execution targets, does not configure SSH |
| `--enable-compute-host` / `--clear-compute-hosts` | New-session access/default controls; existing-session access changes use configuration update |

An external `cwd` remains caller-owned. Reusing `--session` with `--cwd` requires the same canonical directory; the run request does not relocate the session. Omitting a host option preserves existing selection; use the explicit clearing operation when that is intended.

## Waiting, attention and cancellation

| Option/state | Result |
| --- | --- |
| Without `--wait` | Return after run admission; retain `id` and `sessionId` to poll later |
| `--wait` | Wait for terminal run state |
| `--wait --return-on-attention` | Also return when structured plan approval is required; permission prompts are not the same attention condition |
| `--timeout-ms` | Stop client waiting after the deadline; the server run continues |
| `--cancel-on-timeout` | Explicitly cancel after a timeout; the command still reports the timeout |
| `run cancel RUN_ID` | Wait for cancellation/finalization; preserve already finalized artifacts |

For plan approval, first read `plan show`, then supply both `--artifact-version` and `--revision`. A stale plan decision must not apply to a newer plan. Session configuration updates similarly require the revision returned by `session config show`; stale updates return `session_revision_conflict`. Active root-agent, subagent or Notebook work can block an update with `session_busy`.

## Structured output and exit codes

`--json` emits one result. `--jsonl` is available with `run --wait`, streams events and ends with a run result. Do not combine the two. Errors are structured on stderr when requested; parse the `error.code`, not only the process exit code.

The following invalid-option response was reproduced locally:

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| Exit code | Meaning |
| ---: | --- |
| 0 | Command succeeded; inspect the returned run/attention state where applicable |
| 1 | General/run failure, timeout, conflict, or status reporting no running service |
| 2 | Invalid CLI usage |
| 3 | Local daemon unavailable |
| 4 | Requested project/run/session/artifact/Specialist not found |

JSONL can include `run.progress` and `stream.resync-required`. If replay is unavailable after reconnection, reread authoritative run state; do not assume the event stream is a permanent history. Lifecycle commands have separate flag restrictions described in [Headless service](./server.md).

[CLI implementation](https://github.com/aipoch/open-science/blob/v1.0.2/packages/open-science/cli.mjs), [upstream command guide](https://github.com/aipoch/open-science/blob/v1.0.2/packages/open-science/CLI.md).

Technical reference: [CLI contract](https://github.com/aipoch/open-science/blob/v1.0.2/packages/open-science/CLI.md).

## Unattended runs {/* #unattended-runs */}

Add `--permission-prompts none` to `run` to decline unresolved human interactions instead of waiting indefinitely. The selected approval profile and remembered grants still apply; remaining permission requests are denied, user questions are declined, and Plans requiring human review are rejected. This does not approve every action.

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

The option applies only to this invocation and is not saved as a session preference. It cannot be combined with `--plan-first`. Inspect the final status and error: avoiding a human wait does not guarantee task completion. The client checks for host capability `permission-prompts-none`; update the matching client and app if an older host returns `unsupported_capability`.

## Windows launcher paths {/* #windows-launcher-paths */}

v0.37.1 fixes desktop launcher paths containing non-ASCII characters. After updating, open a new terminal and check `Get-Command open-science` and `open-science --help`. If the command still resolves to an older installation, use the path shown in **Settings → General**. Keep the whole standalone archive directory intact. A successful help command does not establish model readiness; check `doctor --json` next.

## Inspect the installed CLI without starting a service {/* #local-information */}

```bash
open-science version --json
open-science help run
open-science paths --json
open-science paths --profile /ABSOLUTE/PATH/TO/PROFILE --json
```

These commands work without a running backend. `version` reports the invoked installation, not the version of a connected service. `paths` reports `cliPath`, `nodePath`, `startupConfigRoot` and `discoveryConfigRoots`; it does not identify an active service or the research-data directory. An explicit profile selects the startup/discovery location without creating it. Paths can reveal local usernames, so review output before sharing it.

## Connect an external MCP client {/* #external-mcp */}

The standalone CLI in v1.0.4 exposes research tools over **stdio**. Start the intended profile's service first; the adapter does not start it automatically. Replace both absolute paths in this client configuration:

```bash
open-science start --no-open --config-root /absolute/path/to/profile
open-science mcp --help
```

```json
{
  "mcpServers": {
    "open-science": {
      "command": "/absolute/path/to/open-science",
      "args": ["mcp", "--config-root", "/absolute/path/to/profile"]
    }
  }
}
```

Let the client launch the adapter. Discover projects with **list_projects**, submit **start_run** with the returned project ID, follow **get_run**, and inspect **list_artifacts**. Tool discovery alone does not prove that the service is available. Calls require the running authenticated local service; this is not a remote HTTP MCP endpoint.

The client acts under the profile's existing permissions. It can create persistent projects, change configuration and start work that writes files or incurs model costs. Approvals may still require action in Open-Science. Inspect current state after a timeout before repeating a write. Closing the client or cancelling its request does not cancel accepted research: use **cancel_run** explicitly. See the [official MCP tool and permission reference](https://github.com/aipoch/open-science/blob/v1.0.4/packages/open-science/CLI.md#external-agents-through-mcp).

For package commands, follow [CLI import and export](../guides/research-packages.md#local-package-transfer).
