---
title: "Task SDK and local API"
last_update:
  date: '2026-09-22'
---

# Task SDK and local API

The `@aipoch/open-science` Node.js client connects to an authenticated local application service to manage tasks, sessions, Connectors and shared credentials. Public SDK methods are separate from Electron preload calls and the agent's internal `host` APIs.

<span id="connect-and-select-real-ids" />

## Connect, run a task and download its output

<p className="example-label"><strong>Example</strong> Save and download a connection-check note</p>

Use Node.js 22.5 or later. Open the installed desktop application on the same machine, finish model setup and keep it running. The SDK uses local service discovery and its locally stored token. For a separate daemon, first follow [Headless service](server.md).

In an empty working folder, install the client:

```bash
npm init -y
npm install @aipoch/open-science
```

Save the following as `connection-check.mjs`. Run `node connection-check.mjs` to list project IDs, then `node connection-check.mjs PROJECT_ID` with one returned ID. The first invocation deliberately stops after listing projects; the second creates a small task.

```js
import {connectToOpenScience} from '@aipoch/open-science';
import {writeFile} from 'node:fs/promises';

const client = await connectToOpenScience();
const projects = await client.listProjects();
const projectId = process.argv[2];
if (!projects.some((project) => project.id === projectId)) {
  console.table(projects.map(({id, name}) => ({id, name})));
  console.log('Run again with a project ID from this list. Create a project in the app if the list is empty.');
  process.exit(projectId ? 1 : 0);
}
const run = await client.startRun({
  project: projectId,
  prompt: 'Save a short Markdown file named project-note.md explaining that this is a connection check. Do not read project inputs or use the network.',
  permissionProfile: 'ask',
});
console.log('Run:', run.id, 'Session:', run.sessionId);
const result = await client.waitForRun(run.id, {timeoutMs: 120000});
console.log(result.status, result.output ?? result.error ?? '');
if (result.status !== 'completed') {
  throw new Error('Inspect the run in the application before continuing.');
}
const artifacts = await client.listArtifacts(run.sessionId);
console.table(artifacts.map(({id, name, path}) => ({id, name, path})));
const artifact = artifacts.find((item) =>
  item.name === 'project-note.md' || item.path.endsWith('/project-note.md'));
if (!artifact) throw new Error('No matching saved artifact; inspect the response.');
const response = await client.downloadArtifact(artifact.id);
await writeFile('project-note.download.md', new Uint8Array(await response.arrayBuffer()));
console.log('Saved project-note.download.md; open and check its contents.');
```

Keep the desktop session open. Respond there if **Ask for approval** pauses the task. A wait timeout stops client polling; it does not cancel the run. Inspect the printed run ID with `getRun`, continue waiting after resolving the request, or call `cancelRun` when you intend to stop it. The download succeeds only when a matching saved artifact exists; open the downloaded Markdown to finish the check.

This program demonstrates the public API contract. It does not assume that a model will always save the requested file. If the npm package cannot be installed, use the SDK folder shipped with the matching source checkout as the local package; confirm its package metadata before installation.

### A completed task whose file will not download

A cause of this error—lost artifact version identity in completed Task records—was fixed in the [download update](../changelog/v0.29.0.md). On an older app, update before retrying the same saved file. Other HTTP 500 causes still require diagnosis.

Task completion and artifact download are separate checks. If `downloadArtifact` returns HTTP **500** / `internal_error`, call `getRun` and `listArtifacts` to confirm the task state and retain the exact returned artifact ID. Do not start the same research task again just to retry a download.

Open the artifact in the application and check whether its content is available. A working preview does not establish that the SDK download succeeded. Include the run ID, artifact ID and download error in a [diagnostic report](../guides/troubleshooting.md); omit authentication tokens. The same failure can affect the CLI's `artifacts download` command.

## Inspect readiness and prepare Codex {/* #runtime-api */}

| SDK method | HTTP resource | Purpose |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | Inspect readiness and next actions. |
| `listRuntimes()` | `GET /api/v1/runtimes` | List framework, status, optional version and managed/external source. |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | Inspect first-run setup state. |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | Prepare or repair the managed Codex runtime through the supported bootstrap flow. |
| `installCli()` | `POST /api/v1/cli/install` | Install the local PATH launcher. |

Setup mutations require the authenticated local service. Check the returned `ok` and error code; configuration conflicts must be resolved before retrying. A client timeout does not establish that an accepted installation was cancelled. Recheck readiness before starting another install. For subscription login or named-environment-variable credential input, use the [terminal setup flow](cli.md#terminal-setup).

## Methods and HTTP resources

| SDK method | HTTP resource | Purpose |
| --- | --- | --- |
| `listProjects`, `createProject` | GET/POST `/api/v1/projects` | Read/create projects |
| `updateProject` | PATCH `/api/v1/projects/:id` | Update project metadata/context |
| `getProjectSessionDefaults`, `updateProjectSessionDefaults` | GET/PATCH `/api/v1/projects/:id/session-defaults` | Defaults for newly created sessions |
| `listSessions` | GET `/api/v1/sessions?project=ID` | Read session summaries |
| `getSession` | GET `/api/v1/sessions/:id` | Read one session |
| `getSessionConfiguration`, `updateSessionConfiguration` | GET/PATCH `/api/v1/sessions/:id/config` | Read/update session configuration |
| `getAgentRouting`, `updateAgentRouting` | GET/PATCH `/api/v1/settings/agent-routing` | Global framework/Reviewer/Subagent routing |
| `getSessionPlan` | GET `/api/v1/sessions/:id/plan` | Read active plan state |
| `respondSessionPlan` | POST `/api/v1/sessions/:id/plan/respond` | Respond with the exact decision/version/revision |
| `startRun` | POST `/api/v1/runs` | Admit a run |
| `getRun`, `cancelRun` | GET `/api/v1/runs/:id`, POST `/api/v1/runs/:id/cancel` | Inspect/cancel execution |
| `listArtifacts` | GET `/api/v1/sessions/:id/artifacts` | Read managed output descriptors |
| `downloadArtifact` | Artifact download response | Stream a saved output; consume the returned Response body |
| `waitForRun` | SDK polling over run status | Wait with cancellation/deadline options |
| `events` | SDK event iterator | Observe ordered activity and reconnect/resync signals |

[Method definitions and exact routes](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs) are the authoritative lookup for request signatures. The table is not permission to call arbitrary Electron/internal endpoints.

### Connector management methods

| SDK method | HTTP resource |
| --- | --- |
| listConnectors() | GET /api/v1/connectors |
| getConnector(id) | GET /api/v1/connectors/:id |
| setConnectorEnabled(id, enabled) | PUT /api/v1/connectors/:id/enabled |
| addConnector(request) | POST /api/v1/connectors |
| updateConnector(id, request) | PATCH /api/v1/connectors/:id |
| removeConnector(id) | DELETE /api/v1/connectors/:id |
| testConnector(id) | POST /api/v1/connectors/:id/test |
| listCredentials() | GET /api/v1/credentials |
| createCredential(request) | POST /api/v1/credentials |
| updateCredential(id, request) | PATCH /api/v1/credentials/:id |

Methods accept request options as the final argument. Use returned stable IDs. Only custom MCP definitions support create/edit/remove; updates require transport and preserve omitted credential bindings. Read exact request types before constructing a mutation.

<p className="example-label"><strong>Example</strong> Test a configured Connector</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector` opens an isolated connection, discovers tools and closes it. It does not invoke a research tool, enable the Connector or initiate first-time OAuth sign-in. Custom MCP/credential changes require local authentication; credential metadata omits raw secrets.

## Run and configuration identity

<p className="example-label"><strong>Example</strong> Start a task that pauses for plan approval</p>

```js
const run = await client.startRun({
  project: projectId, // a returned ID
  prompt: 'Inspect the available project inputs and propose an analysis plan.',
  permissionProfile: 'ask',
  turnIntent: 'plan-first',
});
const state = await client.waitForRun(run.id, {
  timeoutMs: 120000,
  returnOnAttention: true,
});
console.log(state);
```

A waiting plan can return a still-running object with `attention.kind === 'plan-approval'`. Read the active plan and its version/revision before responding. To review visually, open the printed session in the application, approve or revise the plan there, then resume `waitForRun(run.id)`. For API-only decisions, use `getSessionPlan` and `respondSessionPlan` with that exact version/revision; see [plan commands](cli.md). An ordinary permission prompt does not become the same structured attention state.

| Input/state | Rule |
| --- | --- |
| `cwd` | If supplied through SDK/HTTP, must be absolute; server canonicalizes and checks an existing readable/writable directory |
| Existing `sessionId` + `cwd` | Must resolve to that session's recorded directory |
| Omitted `cwd` | Use an application-managed workspace |
| External workspace | Remains caller-owned and is not deleted by the application |
| Session configuration write | Uses `expectedRevision`; reject stale writes |
| Project-default write | Uses `expectedUpdatedAt` plus `patch`; reject concurrent edits |
| New-session precedence | Explicit run request → project defaults → application settings → provider default |
| Changed project defaults | Affect new sessions; do not rewrite existing sessions |

Read configuration before editing it. A provider/model/effort change is a compound configuration, and referenced resources must be available to the selected framework. Preserve omitted settings unless deliberately clearing them.

## Deadlines and retry identity

The client request deadline defaults to 30 seconds and remains active while consuming the response body. Set `requestTimeoutMs` at connection/client setup, or `{signal, timeoutMs}` in a supported method's final options argument. `downloadArtifact` retains its deadline while the returned body streams.

`waitForRun` has its own overall timeout and signal, applied to polling requests and delays. A wait timeout does not cancel the server run. Call `cancelRun(run.id)` explicitly when cancellation is intended and wait for finalization before treating artifacts as settled.

For retry-safe project creation and run admission, pass an `idempotencyKey` in the final options argument and reuse the same key with the same body. Replay is bounded and process-local, retained for up to 24 hours while the daemon stays running. Changed bodies return `idempotency_conflict`; an exhausted replay registry can return `idempotency_unavailable`. A daemon restart is not a durable cross-restart replay guarantee.

## Event stream boundaries

Subscribe and await `events.ready` before starting work if you need the earliest run events. The iterator carries sequence and run/session/project identifiers. `run.progress` includes provider-neutral phases and ten-second liveness updates before first visible provider output; session preparation before run registration is outside that stream.

| Signal | Interpretation | Response |
| --- | --- | --- |
| `events.ready` rejection | Connection failed before usable liveness | Reconnect after resolving the cause |
| Default 30-second idle timeout | No event/control heartbeat arrived | Check connection; this is not a model execution timeout |
| `event_stream_invalid_message` | Malformed event frame | Stop consuming that stream and reestablish state |
| `event_stream_overflow` | Consumer backlog exceeds 1,024 events | Handle backpressure and reread authoritative state |
| `stream.resync-required` | Replay suffix expired or stream changed | Fetch current Run/Session through HTTP |

Connection heartbeats are control frames and are not yielded as ordinary research events. Reconnect replay is bounded and belongs to the current process. Persist the artifact IDs and final run state needed by your own integration.

[SDK source](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs), [SDK contract notes](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md). See [CLI](./cli.md) for shell automation and [Headless service](./server.md) for discovery/lifecycle.

Sources: [signatures](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts), [routes](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs). See [CLI management fields](cli.md#manage-connectors-and-credentials) for configuration and diagnostic boundaries.

## Unattended tasks {/* #unattended-runs */}

Set `permissionPrompts: 'none'` in the `startRun` input, corresponding to CLI `--permission-prompts none`. Keep an appropriate `permissionProfile`: this option declines unresolved human interactions and does not expand permissions. Do not combine it with `planFirst: true`.

The host must declare capability `permission-prompts-none`; otherwise the client reports `unsupported_capability` before creating the run. This policy applies only to the current invocation. Handle the run's actual status and error as usual. See [unattended CLI runs](cli.md#unattended-runs).
