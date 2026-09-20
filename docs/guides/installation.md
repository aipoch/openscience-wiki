---
title: "Installation and updates"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Installation and updates

Most users should install the desktop package from GitHub Releases. Contributors, or anyone testing the newest code, can run the app from source. Open-Science is an Electron application; its renderer also supports token-protected local browser access.

<PlatformGuide />

## Choose an installation method

### Download a desktop installer {/* #install-the-desktop-app */}

1. Open [Open-Science Releases](https://github.com/aipoch/open-science/releases).
2. Download the package that matches your operating system and CPU architecture.
3. Read the license shown by the installer and complete installation, then start the app. A five-step setup wizard opens on the first run.
4. If the operating system blocks an unsigned app, download it again from the official AIPOCH GitHub repository and follow the platform's security prompt only after checking the source.

Choose from the **Assets** attached to the release, not the automatically generated source-code ZIP. Availability depends on that release's published assets.

<PlatformContent platform="macos">

| Computer | Identify the architecture | Package and installation |
| --- | --- | --- |
| macOS, Apple Silicon | About This Mac shows an Apple M-series chip | Choose `mac-arm64.dmg`; open it, drag the app to Applications, then launch it there |
| macOS, Intel | About This Mac shows an Intel processor | Choose `mac-x64.dmg`; install into Applications. The app requires macOS 12 or later |

**Install with Homebrew**

You can also install with Homebrew:

~~~bash
brew install --cask open-science
~~~

Homebrew selects Apple Silicon or Intel automatically. After installation, open **Settings → General → About** and confirm the installed version; a package manager can resolve a newer release than the documentation baseline. [Tagged installation instructions](https://github.com/aipoch/open-science/blob/v0.27.0/README.md).

</PlatformContent>

<PlatformContent platform="windows">

| Computer | Identify the architecture | Package and installation |
| --- | --- | --- |
| Windows | Settings → System → About → System type | Choose the matching `win-…-setup.exe`; run the current-user installer and follow its location prompts |

1. Open the downloaded Windows installer and proceed to the installation-location page.
2. Keep the default location or select **Browse…** to choose a folder for the application, then select **Install**.
3. Wait for the completion page. Leave the launch option selected and choose **Finish** to open Open-Science.
4. Follow [First-time setup](onboarding.md) to check the environment and configure the data location, agent and model.

</PlatformContent>

<PlatformContent platform="linux">

| Computer | Identify the architecture | Package and installation |
| --- | --- | --- |
| Ubuntu / Debian | `uname -m`: `x86_64` means x64, `aarch64` means ARM64 | Choose the matching `.deb`, open it with the system package installer, then launch from the application menu |
| Other supported Linux distributions | Check `uname -m` | Choose the matching `.AppImage`, allow execution in the file's permissions, then open it; resolve any dependency error reported by the distribution |

</PlatformContent>

The installation location stores the application; **Data location** in the setup wizard stores research files and runtimes. Set them separately. After installation, continue with [First-time setup](onboarding.md).

### Run from source

You need Git, Node.js 22, npm, and the platform build prerequisites for Electron. Install or select an agent framework in the application. During installation, the repository generates the Prisma Client, applies app patches, and prepares Electron native dependencies.

For a reproducible source installation, choose the intended release tag from [Changelog](../changelog/v0.31.1.md) before installing dependencies. A default clone follows the branch rather than a fixed release. Record the selected tag, source commit and runtime versions so another person can reproduce the environment.

Replace `RELEASE_TAG` below with the exact tag shown on the selected release (including its leading `v`). To follow ongoing development instead, omit `--branch RELEASE_TAG --depth 1`; that checkout will follow the default branch.

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

Before packaging a production build, run:

```bash
npm run build
```

`npm run build` checks TypeScript, then builds the Electron renderer, preload, and main targets. If you only need to test the web or headless entry point, use the repository's existing headless arguments with a separate data directory. That keeps test data out of the default store.

## Complete first-time setup

### External services and runtimes

| Capability | Required? | Purpose |
| --- | --- | --- |
| OpenCode, Claude Agent, Codex, or CodeBuddy | At least one | Runs conversational agent sessions |
| Model access | Required for agent requests | A supported subscription or API provider; subscription access does not require a separate API key |
| Python or R | Optional | Runs notebook code; use a detected system environment or an app-managed environment |
| Network access | Recommended | Installs runtimes and connects providers, GitHub, remote services, and MCP Connectors |
| SSH host | Optional | Runs remote jobs and retrieves results through the Compute panel |

### Local data

The setup wizard shows the managed data location for large research files such as artifacts, Notebook files and environments. Application settings and conversation history remain in the configuration location. Moving the research data location is not a complete application backup. Keep it separate from the source repository; use [Storage](storage.md) to relocate it instead of manually moving internal files while the app is running.

## Confirm that the app is ready {/* #installation-is-complete-when */}

The application opens, the required Environment checks pass, an agent is installed, and model access is verified. Python/R setup is additionally required only for work that executes those languages. Opening a CSV or PDF preview does not validate a Notebook runtime. Follow [First-time setup](./onboarding.md), then [Provider and local model setup](./providers.md).

## Check for application updates {/* #choose-a-reproducible-version-and-update-deliberately */}

In **Settings → General → About**, read the installed version and use **Check now** to check update availability. Inspect the listed version before installing it, and finish active work first. A development source build may report updates differently from a packaged installation. Keep a copy of important exported results before an update; do not rename the application's internal data directories.

<PlatformContent platform="macos">

If **Install Open-Science before updating** appears, the app is running from a read-only location. Choose **Install in Applications**, or move the app there in Finder. After installation, use **Restart** or quit this copy and reopen the one in Applications, then check for updates again. **Continue using** keeps the current copy open; it does not make that location updateable. If installation fails, follow the displayed error before retrying.

</PlatformContent>

<PlatformContent platform="windows">

Reinstalling retains existing data. If you deliberately need a fresh start after a data problem, see [Reset local Windows data](troubleshooting.md#windows-data-reset). This separate tool deletes data; it is not part of an ordinary update.

</PlatformContent>

## Troubleshoot installation and startup {/* #first-checks-when-startup-fails */}

| Where it fails | First checks |
| --- | --- |
| Desktop installer or app launch | Check the package source, OS and CPU architecture, then read the operating-system prompt. |
| Source installation | Confirm `node --version` and `npm --version`, and that `npm install` completed. Retry an interrupted dependency installation. |
| First-time setup | Read the failed Environment check and resolve its stated requirement before continuing. |
| First agent request | Confirm an Active/Ready Agent and run **Test connection** on the Model page. |
| Provider or local browser connection | Inspect the reported port, proxy or certificate error; see [Troubleshooting](troubleshooting.md). |

## Product naming after v0.31.0 {/* #product-name */}

The current interface and new packages use **Open-Science** consistently. Upgrading preserves existing installation names and locations, research data, credentials and settings. An older installation path containing `Open Science` is not by itself an upgrade failure; do not rename or move its data folders to match the new display name.
