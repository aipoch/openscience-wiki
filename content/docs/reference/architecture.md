---
title: Architecture and data flow
---

Open Science uses Electron, React, TypeScript, Prisma, and SQLite. The main process owns files, settings, databases, runtimes, and agent-backend integration. Preload exposes approved APIs to the renderer, which displays projects, conversations, settings, and previews. The web/headless entry point shares the interface and reaches desktop-process capabilities through a protected local channel.

```mermaid
flowchart LR
  U["User / Browser"] --> R["React renderer"]
  R --> P["Preload API boundary"]
  P --> M["Electron main process"]
  M --> DB["Prisma + SQLite"]
  M --> FS["Managed project files"]
  M --> A["OpenCode / Claude / Codex"]
  M --> N["Python / R / Shell Notebook"]
  M --> C["MCP Connectors / SSH Compute"]
  A --> E["Conversation events"]
  N --> E
  C --> E
  E --> R
  E --> V["Artifact versions + provenance"]
```

## Ownership boundaries

- The Settings store and main-process repositories coordinate configuration writes. Secrets pass through secure storage and encryption boundaries.
- The project and session stores hold interface state, while main-process repositories and the database keep persistent records.
- The ACP runtime projects agent sessions, permission requests, plans, and tool events into Conversation.
- Notebook runs record language, agent, input, and output. The artifact repository links immutable versions with provenance.
- The Preview registry selects a renderer by file type. Managed PDF, Office, and large resources have separate leases and lifecycles.
- Permission grants are combined by Global, Project, and Session scope. Connectors and Compute also apply their own policies.

## Wiki structure

This Wiki uses Fumadocs with the Next.js App Router. Markdown and MDX files live in `content/docs`, while each directory's `meta.json` file sets navigation order and section labels. Screenshots live in `public/img/open-science` and are served from `/img/open-science/...`. Fumadocs MDX supplies the document index, table of contents, search data, and page metadata used by the application routes.
