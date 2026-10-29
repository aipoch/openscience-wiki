---
title: "Installation and updates"
last_update:
  date: '2026-10-29'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Installation and updates

Most users should install the desktop package from GitHub Releases. Contributors, or anyone testing the newest code, can run the app from source. The Electron desktop client connects to a shared Node backend, which also serves the authenticated local browser interface.

<PlatformGuide />

**Current packages:** [v1.0.5 Assets](https://github.com/aipoch/open-science/releases/tag/v1.0.5) include desktop installers, standalone CLI archives and Linux CLI `.deb`/`.rpm` packages. Choose the intended installation type and architecture, then verify the checksum from the same release. The desktop launcher remains available through **Settings → General → Command line tool → Install command**.

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

Official Windows installers are code-signed from v0.33.2; v0.33.3 extends signing to bundled executables. Download from the [official download page](https://aipoch.com/open-science/download) or [GitHub Releases](https://github.com/aipoch/open-science/releases), and follow the official verification notes to check the package source.


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

v1.0.5 provides Linux **x64 and ARM64** packages. For ARM64, select `aipoch-open-science-1.0.5-linux-arm64.AppImage` or `aipoch-open-science_1.0.5_arm64.deb`. The x64 counterparts are `aipoch-open-science-1.0.5-linux-x86_64.AppImage` and `aipoch-open-science_1.0.5_amd64.deb`. Download from the selected release's official Assets and match the result of `uname -m`.

</PlatformContent>

The installation location stores the application; **Data location** in the setup wizard stores research files and runtimes. Set them separately. After installation, continue with [First-time setup](onboarding.md).

### Use the standalone CLI {/* #standalone-cli */}

For a terminal/browser installation, download a matching standalone CLI archive from [v1.0.5](https://github.com/aipoch/open-science/releases/tag/v1.0.5). It bundles Node, the backend and Web UI. Extract the complete directory, then follow [CLI setup](../reference/cli.md#terminal-setup). Keep the CLI and backend from the same installation together.

#### Homebrew CLI {/* #homebrew-cli */}

Install or manage the Homebrew CLI with `brew install aipoch/tap/open-science`, separately from the desktop cask. Check the version actually offered by Homebrew; the formula may lag behind a GitHub release. Installation does not start a system service. If launchers conflict, inspect `type -a open-science` and use `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"` for that installation.

#### Linux CLI packages {/* #linux-cli-packages */}

For Linux terminal/browser use, choose **open-science-cli**, separately from the **aipoch-open-science** desktop package. Download the matching package and `CLI-PACKAGE-SHA256SUMS.txt` from [v1.0.5 Assets](https://github.com/aipoch/open-science/releases/tag/v1.0.5), then verify before installing.

| Distribution / architecture | v1.0.5 CLI asset |
| --- | --- |
| Debian / Ubuntu, x64 | `open-science-cli_1.0.5_amd64.deb` |
| Debian / Ubuntu, ARM64 | `open-science-cli_1.0.5_arm64.deb` |
| Fedora, x64 | `open-science-cli-1.0.5-1.x86_64.rpm` |
| Fedora, ARM64 | `open-science-cli-1.0.5-1.aarch64.rpm` |

Install the downloaded file with the appropriate package manager. These examples use x64; use the ARM64 filename when appropriate.

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_1.0.5_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-1.0.5-1.x86_64.rpm
```

Run `open-science-cli start --no-open`, then `open-science-cli status --json`. Once running, use `open-science-cli url` to open the authenticated local Web interface; keep that URL private. Continue with [CLI setup](../reference/cli.md#terminal-setup) for model configuration and `doctor` checks, replacing `open-science` with `open-science-cli` in those commands.

The package bundles Node, the backend and Web UI. It does not install Python/R or create an automatically started system service. The OS credential store and sandbox prerequisites still apply; see [headless Linux credentials](../reference/server.md). Use `open-science-cli` explicitly when a desktop launcher is also installed.

Before upgrading or removing the package, finish work and stop **every profile started by that package**. Install the next downloaded package through apt/dnf; there is no AIPOCH apt/dnf repository configured by this installation. Package removal preserves research data and credentials. The [official package guide](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md#linux-cli-distribution-packages) describes command conflicts and platform requirements.

### Run from source

You need Git, Node.js 24, npm, and the platform build prerequisites for Electron. Install or select an agent framework in the application. During installation, the repository generates the Prisma Client, applies app patches, and prepares Electron native dependencies.

For a reproducible source installation, choose the intended release tag from [Changelog](../changelog/v1.0.5.md) before installing dependencies. A default clone follows the branch rather than a fixed release. Record the selected tag, source commit and runtime versions so another person can reproduce the environment.

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

Use the selected tag's package.json and [standalone runtime guide](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md) for its build targets and dependencies. `npm run dev:web` develops the Node/Web entry point; `npm run dev` also prepares the desktop client. Use an isolated configuration directory to keep test data separate.

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

From 1.0, `open-science update` is removed. Update the app through its desktop controls or official installer, and update a CLI installation through the installer/package manager that owns it. If **Check now** does not yet offer a published release, check the official release page; deleting configuration or resetting the app will not promote an update channel.

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

## Upgrade to 1.0 and understand compatibility {/* #version-compatibility */}

1. Finish active research and back up the configuration directory plus any separately configured data location. One `.science` export is not a backup of the entire profile.
2. Close desktop/backend instances using the installation, then upgrade through the official installer. Preserve the original profile, data and OS credential store.
3. Reopen and check the version, projects, sessions, files, model and runtimes before continuing. A binary downgrade does not roll back data; older binaries may not read newer saved data.

1.0 retains existing historical upgrade and import paths; the version number does not require a profile reset. The [1.x compatibility policy](https://github.com/aipoch/open-science/blob/v1.0.5/docs/compatibility.md) covers documented CLI/SDK and Task automation interfaces, forward imports of valid `.science` packages, and supported profile upgrades. It does not guarantee identical model answers, third-party availability or deterministic reproduction of a whole research session, or cross-platform transfer of OS-protected credentials. Security fixes target the latest stable release.

## Install the CLI with npm {/* #npm-cli */}

Use Node.js **22.13 or later** for the published CLI/backend package. In a terminal, install and inspect the invoked version:

```bash
npm install --global @aipoch/open-science@1.0.5
open-science version --json
open-science help
```

Then follow [terminal setup](../reference/cli.md#terminal-setup) to initialize a profile, start its backend and configure a model. Installation alone does not log you in or install Python/R. If a desktop or Homebrew launcher already uses the same command name, inspect which executable your shell selects before continuing. Stop every backend owned by an installation before upgrading that installation; retain its profile and update through its original package manager.

## Follow an update through to installation {/* #update-progress */}

In **Settings → General → About**, choose **Check now** and review the offered release. The update dialog keeps download progress, release notes and installation preparation together. Download completion is not installation completion: check the installed version after relaunch.

If the app says automatic installation is unavailable for this channel, keep the downloaded package and use the official installer after finishing active work. The v1.0.5 installation channels still restrict automatic replacement; an improved Windows progress dialog does not remove that restriction. Do not force the app closed while notebook cleanup is in progress.

## Install an update manually {/* #manual-update */}

In the update dialog, open **Installation instructions**. Use **Download from website** if you do not have a package. For a confirmed downloaded installer, choose **Show in Finder**, **Show in File Explorer** or **Show in file manager**, depending on the platform. Keep that folder open while quitting the app.

Save work and wait for active installation or cleanup to finish before starting another installer. On macOS, open the DMG or unzip the package and replace Open-Science in Applications. On Windows, run the installer using the existing installation folder. On Linux, install the matching DEB or replace the AppImage and retain executable permission. Follow the instructions for your actual package format.

If the installer is missing or has changed, download it again; revealing a package does not run it. Reopen Open-Science and check **Settings → General → About**, then confirm your original projects and data. When upgrading standalone CLI files, first [verify that all affected services have stopped](../reference/server.md#application-update-behavior).
