---
title: "Controls and keyboard reference"
last_update:
  date: '2026-09-24'
---

# Controls and keyboard reference

Use this index to find a control's canonical explanation. It keeps field limits and shortcuts together without repeating the full task walkthroughs. Labels refer to the English interface.

## Controls by task

| You need to | Entry or control | Detailed behavior |
| --- | --- | --- |
| Create or describe a project | **New project**, project menu → **Project settings** | [Project fields](../guides/projects.md) |
| Keep a private reading note | Selection → **For me → Bookmark**, Composer **Bookmarks** | [Reading bookmarks](../guides/bookmarks.md) |
| Configure a model connection | **Settings → Model** | [Provider setup](../guides/providers.md) |
| Attach a source, send or queue a request | Composer **+**, attachment chip, **Send**, queue controls | [Conversations and queued requests](../guides/composer.md) |
| Inspect a runtime or installed packages | **Settings → Runtimes**, interpreter and Packages controls | [Python and R runtimes](../guides/runtimes.md) |
| Inspect calculations and variables | **View notebook**, **Variables**, artifact **Provenance** | [Notebook and execution evidence](../guides/notebook.md) |
| Grant or revoke access | Approval card, **Settings → Permissions** | [Permissions and approvals](../guides/approval-modes.md) |
| Diagnose a package connection | **Settings → Network** | [Domains, proxy and mirrors](../guides/network.md) |
| Configure remote compute | **Settings → Compute → Add SSH host** | [SSH and Slurm setup](../guides/remote-compute.md) |
| Verify a research output | Generated file card, preview, **Provenance** | [Public-data analysis](../workflows/data-quality.md) |
| Look up limits | Format or configuration field | [File limits](formats.md), [Configuration](configuration.md), [Package formats](packages.md) |

The [complete control index](control-index.md) lists controls by application page; this page groups common tasks and keyboard shortcuts. Both link to the same detailed tutorials.

## Keyboard reference

| Action | macOS | Windows/Linux | Conditions and scope |
| --- | --- | --- | --- |
| Application search | `⌘K` | `Ctrl+K` | Home/workspace search; in Settings, focus its header search |
| Settings | `⌘,` | `Ctrl+,` | Opens Settings when the current overlay allows the shortcut |
| New conversation | `⌘N` | `Ctrl+N` | Workspace; requires an existing conversation with messages; ignored while a blocking dialog is open |
| Toggle sidebar | `⌘B` | `Ctrl+B` | Workspace; toggles the narrow-screen drawer or desktop sidebar |
| Send composer text | `Enter` | `Enter` | When sending is available; an open mention picker owns Enter; IME composition does not submit |
| New line | `Shift+Enter` | `Shift+Enter` | Composer text |
| Previous/next prompt draft | `↑` / `↓` | `↑` / `↓` | Start history browsing with the caret at the beginning and no selection; an open mention picker takes precedence |
| Undo draft | `⌘Z` | `Ctrl+Z` | Composer draft history |
| Redo draft | `⌘Shift+Z` | `Ctrl+Shift+Z` | Composer draft history |
| Close active surface | `⌘W` | `Ctrl+W` | Desktop app: transient preview first where applicable, then preview tab/pane, then window; browser access can use browser shortcuts |
| Dismiss overlay | `Esc` | `Esc` | Where supported; saving or a blocking confirmation can change dismissal behavior |

Do not repeatedly press the close shortcut expecting it only to hide a file. After previews have closed, the next invocation can close the application window. Window closure and process shutdown are separate platform-dependent behaviors.

Closing a Side Chat tab requires confirmation and stops/deletes that side discussion; file-preview closure does not delete the file. See [Side Chat](../guides/delegation.md).

## Composer reference triggers

| Trigger | Selection | Check before sending |
| --- | --- | --- |
| `/` | Enabled Skill | Confirm the intended method and supporting dependencies |
| `@` | Available file/artifact or literature reference/scope | Confirm the selected source and version where shown |
| `#` | Session reference | Confirm the intended conversation |

Selecting a suggestion inserts a structured reference. Merely typing a familiar filename or Skill name is not evidence that the corresponding reference was attached. Inspect the inserted chip and request.

## Search scope

App global search covers projects, sessions, message text, uploaded/generated files, Library records and collections, and indexed contents of supported uploads. Generated files are searched by name; unindexed content is not searched. Select a category to narrow the results, then inspect a result's context before opening it. This does not mean every PDF, image or other binary file has a searchable full-text index. See [Navigation and search](../guides/navigation.md) for the complete workflow.

The wiki's Search is separate: it indexes documentation titles, headings and body passages in the current language. A term such as “Inbox” can match a paragraph here even if it is absent from an application's session title.

Technical reference: [application bindings](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [composer keyboard handling](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [close behavior](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [global search](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx).

Settings panel/dialog search uses **⌘⌥K** on macOS and **Ctrl+Alt+K** on Windows/Linux. **⌘K / Ctrl+K** continues to focus the Settings header search. See [shortcut scope](../guides/shortcuts.md#local-settings-search).
