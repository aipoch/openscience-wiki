---
title: Install and Run
---

Most users should install the desktop package from GitHub Releases. Contributors, or anyone testing the newest code, can run the app from source. Open Science is an Electron application; its renderer also supports token-protected local browser access.

## Install the desktop app

1. Open [Open Science Releases](https://github.com/aipoch/open-science/releases).
2. Download the package that matches your operating system and CPU architecture.
3. Start the app. A five-step setup wizard opens on the first run.
4. If the operating system blocks an unsigned app, download it again from the official AIPOCH GitHub repository and follow the platform's security prompt only after checking the source.

## Run from source

You need Git, Node.js 22, npm, and at least one supported agent framework. During installation, the repository generates the Prisma Client, applies app patches, and prepares Electron native dependencies.

```bash
git clone https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

Before packaging a production build, run:

```bash
npm run build
```

`npm run build` checks TypeScript, then builds the Electron renderer, preload, and main targets. If you only need to test the web or headless entry point, use the repository's existing headless arguments with a separate data directory. That keeps test data out of the default store.

## External services and runtimes

| Capability | Required? | Purpose |
| --- | --- | --- |
| OpenCode, Claude Agent, or Codex | At least one | Runs conversational agent sessions |
| Model provider and API key | Yes | Produces plans, answers, and tool calls |
| Python or R | Optional | Runs notebook code; use a detected system environment or an app-managed environment |
| Network access | Recommended | Installs runtimes and connects providers, GitHub, remote services, and MCP Connectors |
| SSH host | Optional | Runs remote jobs and retrieves results through the Compute panel |

## Local data

The setup wizard shows the default data location and lets you change it. This location stores projects, artifacts, and other app data. Private configuration, encrypted secrets, and runtime state live in the application configuration directory. Don't mix the data location with the source repository, and don't move the database manually while the app is running. Use the [Storage panel](../settings/storage-general.md#storage) for migrations.

## First checks when startup fails

- Confirm that `node --version` and `npm --version` work.
- Make sure `npm install` finished. If the network interrupted it, run the command again.
- Check that every required item on the setup Environment page says Ready.
- Confirm that at least one runtime on the Agent page says Active or Ready.
- Run `Test connection` on the Model page.
- Check whether a proxy, certificate tool, or occupied port blocks the provider or local Remote control service.
