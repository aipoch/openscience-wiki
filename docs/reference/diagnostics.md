---
title: "Architecture and diagnostics"
last_update:
  date: '2026-11-25'
---

# Architecture and diagnostics

Locate a failure by the component that owns the operation. A successful model response, a successful calculation and a verified saved artifact are different observations; collect the evidence for the stage that failed.

## Architecture and ownership

```mermaid
flowchart LR
  UI[Desktop or browser interface] --> MAIN[Shared Node backend]
  MAIN --> STORE[Settings, database and managed files]
  MAIN --> AGENT[Agent framework and model provider]
  MAIN --> NB[Notebook runtime]
  MAIN --> SERVICES[Connectors and Compute Hosts]
  AGENT --> EVENTS[Messages and tool events]
  NB --> EVENTS
  SERVICES --> EVENTS
  EVENTS --> UI
  MAIN --> ART[Artifact versions and provenance]
  ART --> UI
```

| Component | Owns | Evidence to inspect |
| --- | --- | --- |
| Renderer and preview | Display state, controls, rendered file content | Page, selected project/session, filename, preview error |
| Node backend | Persistent operations, application services and access boundaries | Operation error and associated diagnostics |
| Agent framework/provider | Model connection, task execution protocol and response stream | Framework/provider/model, connection test, failing tool or turn |
| Notebook | Interpreter, code execution, outputs and live variables | Runtime ID/version, failing cell, stdout/stderr and execution record |
| Connector | External service request | Connector/tool name, sanitized inputs, status/error from the service |
| Remote Compute Host | SSH access and direct/scheduled jobs | Host/mode, probe result, job ID and remote logs |
| Artifact repository | Managed versions, checksums and captured evidence | File/version ID, content status, Code/Environment/Review tabs |

The desktop path crosses the preload API boundary. Browser access uses the application's protected local service transport; see [Headless service and browser access](server.md). The browser is not a second independent research database.

## Distinguish content from evidence

| State or message | Interpretation | Next check |
| --- | --- | --- |
| Artifact content available | The selected version's bytes are readable and pass the applicable integrity check | Inspect whether the scientific result is correct |
| Content unavailable: missing | The expected content cannot be found | Preserve the version identity and investigate storage availability |
| Content unavailable: checksum mismatch | The content does not match its recorded integrity value | Retain the diagnostic; do not silently replace bytes and call it the same version |
| Partial environment capture | The environment record is incomplete | Read capture warnings and retain interpreter/package details independently |
| Bounded execution log | Only bounded immutable execution evidence was retained | Inspect gap warnings and the live Notebook where available |
| No review for this version | No applicable Reviewer result is attached | Do not report that version as reviewed |

These states can coexist. Inspect content integrity, execution evidence and review status separately.

## Error lookup

| Failure surface | Canonical lookup |
| --- | --- |
| Model/API, Connector or proxy HTTP responses | [HTTP status codes](../guides/troubleshooting.md#http-errors-400-403-429-and-5xx) |
| App cannot open its database | [Database startup codes](../guides/troubleshooting.md#database-startup-errors) |
| Notebook imports, file paths and permissions | [Error messages](../guides/troubleshooting.md#match-the-error-message) |
| SSH transport, remote paths and job status | [Remote errors](../guides/remote-compute.md#resolve-ssh-and-job-errors) |
| Issue submission and community help | [Report a bug or ask the community](../guides/troubleshooting.md#report-a-bug-or-ask-the-community) |

Keep the error's source with its identifier. An OS errno, a Python exception, a remote job error code and a provider's HTTP status are not interchangeable. Copy the accompanying message and nested cause when available; one identifier can cover several failure paths.

## Preserve a useful diagnostic record

Record the app version, operating system, affected project/session, operation, expected result, exact error and what happened immediately before it. Include the runtime and input checksum when a calculation is involved; include the artifact version or remote job ID when one exists.

Use an available **Details**, **Diagnostic details** or log view to retain the error's cause, rather than only its short heading. Reproduce with public or minimal input when possible. Inspect anything you share for account tokens, headers, private paths and research content.

The main-process logger writes structured JSON lines. Its defaults rotate files at 5 MiB and keep three files in total; special fatal-write behavior can exceed the ordinary bound by one record. Logs therefore have a retention window and are not a permanent audit trail. A diagnostic field can also be truncated. Preserve a relevant record soon after the failure and distinguish absence from proof that an event never occurred.

Source: [logger and retention](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/logger.ts), [diagnostic redaction](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/diagnostic-redaction.ts), [bounded Notebook failure detail](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/failure-diagnostic.ts) and [artifact content status](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/artifacts/provenance-content-status.ts).

First distinguish a failed operation from failed refresh/cleanup after a committed change, and distinguish background job completion from result delivery. Inspect saved state before retrying a mutation. The user-facing [recovery table](../guides/troubleshooting.md#recovery-messages) covers blocked queue restoration, retained PDF references, stale collection edits and Windows installer messages. [Background tasks](../guides/notebook.md#background-tasks-and-result-delivery) explains execution status; remote monitoring errors remain separate from final job outcomes.


## Session diagnostic archives {/* #session-diagnostic-archive */}

**Export diagnostics…** collects chosen session metadata, database records and available application log metadata into a local archive with a manifest and export log. Missing sources do not stop the whole export; large or damaged sources can produce summaries. The current and historical application logs can cover activity outside the selected session, so review the selected sources and capture outcomes.

Ordinary metadata sources exclude private content fields. After a sensitive-content package-export failure, the dialog can also offer redacted scanner evidence and original flagged files. Original files are unchecked by default; explicitly selecting them includes their original bytes. Export makes no upload or model request. Inspect the resulting archive before sharing. It does not replace a research-package backup or a minimal reproduction. See [the illustrated export procedure](../guides/troubleshooting.md#session-diagnostics).

## Desktop and backend are separate processes {/* #node-backend */}

From v0.37.0, Electron owns the native desktop shell while an ordinary Node backend owns shared services. The desktop, Web UI, CLI and SDK can connect to that same backend. Identify the configuration directory, version and actual port with `status --json` when a client cannot connect. A visible desktop window alone does not prove the backend is healthy. Follow [backend ownership](server.md#backend-ownership) before stopping it.

## Configure Agent tracing {/* #agent-tracing */}

Use this when you need to inspect a built-in Agent turn across model requests and MCP tools. Supply an OTLP/HTTP JSON receiver, such as an OpenTelemetry Collector or Langfuse. Open-Science does not supply an app-operated collection service. The endpoint must be the full ingestion URL; a generic collector commonly uses `/v1/traces`, while Langfuse uses `/api/public/otel/v1/traces`.

The person operating the backend configures the endpoint, authentication and capture switches in its launch configuration. For an installed app, the active configuration directory's `.env` is supported (usually `~/.open-science/.env`). Finish active work and restart that backend after changing its launch configuration. This is separate from saving a project setting.

<p className="example-label"><strong>Example</strong> A local receiver with content capture disabled</p>

```dotenv
OPEN_SCIENCE_AGENT_OTLP_TRACES_ENDPOINT=http://127.0.0.1:4318/v1/traces
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_CONTENT=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_API_REQUEST=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_ARGUMENTS=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_RESULTS=0
OPEN_SCIENCE_AGENT_OTLP_DIAGNOSTICS=1
```

This example assumes a receiver already listening on the backend's own loopback address. It does not install one. For another host, use its actual ingestion URL and required authentication; see the [official receiver configuration](https://github.com/aipoch/open-science/blob/v1.3.4/docs/development-quick-reference.md#open-science-agent-traces) and [environment examples](https://github.com/aipoch/open-science/blob/v1.3.4/.env.example). Keep receiver secrets out of prompts and shared screenshots.

### Choose capture detail

Project tracing is **off by default**, but each of these content switches defaults to **`1`** when omitted. Set them to `0` explicitly for metadata-only tracing. These are launch settings, not additional project-dialog switches.

| Setting suffix after `OPEN_SCIENCE_AGENT_OTLP_` | Content included when set to `1` |
| --- | --- |
| `CAPTURE_CONTENT` | Prompt and final-reply excerpts |
| `CAPTURE_API_REQUEST` | Model request JSON, potentially including instructions, history, tool data and attachments |
| `CAPTURE_TOOL_ARGUMENTS` | MCP tool input previews |
| `CAPTURE_TOOL_RESULTS` | MCP tool output previews |

Metadata-only traces still describe operations. Review the receiver and its access rules before enabling a project with private research data.

### Enable and check delivery

Open [Project settings](../guides/projects.md#agent-tracing), enable **Agent tracing** and save. Use the built-in **Open-Science Agent** for a small request. Look for service `open-science-agent` in the receiver and inspect the correlated turn, request and tool spans that the task actually produced.

With diagnostics enabled for the `.env` configuration, inspect the adjacent `.env.otel-status.json` for upload status. If no traces arrive, check the active profile, project switch, runtime, full endpoint, receiver availability and credentials. Delivery is asynchronous: a completed Agent answer does not prove successful upload. Turning tracing off stops future capture; it does not delete records already at the receiver.
