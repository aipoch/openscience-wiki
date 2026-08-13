---
title: Your First Project
---

## Home page

![Home page with no projects](/img/open-science/home-empty.png)

The top bar contains GitHub, global Search, Theme, Messages, and Model settings. `New project` creates a project. Existing projects and recent sessions appear as selectable cards.

- `Search`: search across projects, sessions, and files. In the workspace, `⌘K` or `Ctrl+K` opens it.
- `Theme`: choose System, Light, or Dark.
- `Messages`: read completion, permission, error, and background-task notices, then manage their read state.
- `Model settings`: open Settings → Model directly.
- GitHub: open `aipoch/open-science`.

![Theme menu](/img/open-science/home-theme-menu.png)
![Message center](/img/open-science/home-message-center.png)
![Global search](/img/open-science/global-search.png)

## Create the project

Select `New project` to open the form.

![Create project dialog](/img/open-science/project-create-dialog.png)

| Field | Required? | Guidance |
| --- | --- | --- |
| `Name` | Yes | Use a recognizable research question or experiment name; it appears in the sidebar and search |
| `Description` | No | State the objective, sample, or expected deliverable rather than pasting the full prompt |
| `Agent Context` | No | Record durable constraints such as statistical rules, citation policy, output structure, and protected paths |

![Completed project form](/img/open-science/project-create-form.png)

`Cancel` closes the form without creating anything. `Create project` saves the project and opens an empty workspace. The project menu can later edit the same metadata. Project deletion runs through a confirmation flow and removes managed project records, so download any needed artifacts first.

## Send the first request

1. Enter a specific goal in `Ask anything`.
2. Select the model button and check the Active model and Reasoning effort.
3. Open Agent controls and choose Ask, Auto-approve edits, or Full access.
4. If the request needs source material, select `+`, then Attach files or Your files.
5. Select the send arrow. Its adjacent menu offers `Plan first` and other send modes.

After the first message, Open Science creates a session and names it from the opening text. See [Conversation and composer](../workspace/conversation.md) for the rest of the controls.
