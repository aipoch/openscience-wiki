---
title: "Delegation and Side Chat"
last_update:
  date: '2026-09-22'
---

# Delegation and Side Chat

Use Side Chat to discuss a question alongside your current task, or delegation to give another agent a separate task. To continue a full conversation in a different direction, use a [session branch](sessions.md).

## Side Chat {/* #side-chat-availability */}

### When to use it

Open Side Chat to explain a term in an analysis result, compare two approaches, or discuss how to word a report. After the discussion, send the advice you choose to the main conversation, Main.

### How to use it

1. In an existing session, open **More send options → Side chat** beside the send button. You can open it with an empty Composer: a new Side Chat draft appears immediately. Write the question there, check the model and reasoning effort, then send it.
2. Read the answer in its independent **Side chat** preview tab. Use **Side chat follow up** to ask more questions. You can keep several side discussions under the same session and switch between their tabs while continuing to use Main.
3. To share advice with Main, explicitly ask Side Chat to relay it. For example: “Send this advice to Main: Explain the missing-value handling in a separate part of the report.” Check for the message labeled **Side chat** in Main. If Main is idle, send your next request to continue the work.
4. Use **Cancel Side chat response** to stop the current answer. Switch tabs or collapse the preview area to return to Main. Transfer anything you need after an application restart to Main or a saved report.

A draft containing text or annotations survives switching views. An untouched empty draft is discarded when you leave it; opening a draft alone does not send a model request.

### Move an annotation to the right draft

For a selected passage or region, use the annotation's **Move to Side chat…** action and choose an existing side discussion or a new one. You can also drag annotations between Main and a Side Chat draft. Check the destination and the transferred content before sending: moving an annotation prepares a draft; it does not submit a request.

Private **For me** bookmarks are a different reading tool; see [Reading bookmarks](bookmarks.md).

### Things to know

- **Model settings:** A new Side Chat inherits the current main conversation's model and reasoning effort. You can change them in Side Chat; the selection applies to its next send. Codex subscriptions are supported. Check the selector before sending.
- **Delivery and actions:** Ordinary replies are not automatically sent to Main. Side Chat cannot grant Main's permissions; confirm delivery before asking Main to take action.
- **Closing a tab:** Read **Close Side chat?** before confirming. Closing stops that Side Chat and removes its conversation. Select **Cancel** to keep it; switch tabs or collapse the preview area when you only want to return to Main. If cleanup fails, the tab returns with an error.
- **Restarting the app:** Side Chat conversations and advice not yet delivered to Main exist only during the current application run. Reloading the interface or switching projects can reconnect to that in-memory state; fully restarting the app clears it. Transfer useful advice to Main or save it in a report before quitting. Messages already accepted into Main remain in its saved conversation.
- **Availability:** In v0.30.2, Main running or waiting for approval does not by itself block Side Chat. Send at least one message in Main first. Read-only imported sessions and unavailable parent sessions cannot open Side Chat. Side Chat does not accept file attachments. Follow the actual button explanation; connection problems are covered in [Troubleshooting](troubleshooting.md).

## Task delegation

### When to use it

Delegate work that can be handled independently, such as checking literature sources, inspecting a data file or reviewing analysis results, then let the main agent combine the findings. For reusable assistants with defined roles, see [Specialist delegation](../specialists/delegate.md).

### How to use it

1. Check **Delegation** in the Composer's **Agent controls**.
2. In **Settings → Model → Subagent**, choose inheritance from the main model or configure a compatible separate model and reasoning effort.
3. Describe the task to delegate, its input files, expected output and acceptance criteria in your request.
4. Follow the subtask's status in the activity entries and respond to any permission requests.
5. Open the returned files or source links to check the result. To inspect execution records, select the corresponding owner in Notebook's **Agent** filter.

### Things to know

- Available capabilities depend on the agent framework and configuration. After enabling Delegation, check the activity entries to confirm that a subtask actually started.
- Subagents may not share all of Main's context or Python variables. Supply the files and instructions needed for the task.
- Approving Main's plan does not automatically approve every subagent action. Check the specific action and scope when permission is requested.
- When **Release** is available, use it to end or release the subtask resource. Main's evidence is retained.
