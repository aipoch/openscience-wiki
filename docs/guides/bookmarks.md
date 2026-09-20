---
title: Private reading bookmarks
description: Save passages and PDF regions for yourself, add notes and return to their source within a session.
last_update:
  date: '2026-09-20'
---

# Private reading bookmarks

Use bookmarks to keep a passage you want to revisit, a table you need to check, or a note for later reading. **For me** saves a private reading record in the current session. **To Agent** prepares an annotation for a request; saving a bookmark does not send a message or add it to agent context.

## Save a passage or PDF region

1. Open an existing saved session. Select text in a conversation or a supported text preview. In a PDF, select text or use its region-selection control to mark the area you need.
2. Open the selection's annotation control and choose **For me**.
3. Add a **Note (optional)**, such as “Check the denominator before comparing these percentages.” Select **Bookmark**.
4. Open **Bookmarks** in the Composer and confirm the saved entry. Select it to check that it returns to the intended passage or PDF region.

Bookmarks become available after the conversation has been saved. If the control is unavailable, return to an existing session before trying again. Not every embedded or externally opened viewer supports text selection for bookmarks.

## Return, edit or remove

Open the session's **Bookmarks** list and select an entry, or use **Show bookmark source**. For a managed file, the bookmark reopens the saved file version it references. Check the page, passage and version when comparing it with a newer result.

Choose **Edit bookmark note** from the list or the persistent marker beside the passage, edit the note, and select **Save**. **Cancel** leaves the saved note unchanged. **Delete bookmark** removes the reading bookmark; it does not delete the source message or file.

If the source is unavailable or its exact location cannot be found, use the displayed message to distinguish those cases. Locate the source manually before replacing the bookmark; do not assume the nearest visible text is the original selection.

## What stays private and what is shared

- Bookmarks and notes persist when you reopen the session after restarting the app.
- They belong to that session. They do not transfer to another branch or synchronize across machines, and deleting the session removes its bookmarks.
- [.science research packages](research-packages.md) exclude these private bookmarks. Put information a colleague needs into a saved report or the conversation before preparing a handover.
- To ask the agent about a passage, use **To Agent** and review the annotation in the intended draft before sending. Moving annotations between Main and a side discussion is covered in [Side Chat](delegation.md).

## Bookmarks in a fork {/* #bookmarks-in-fork */}

From v0.31.0, [Fork](sessions.md#fork-session) copies private bookmarks and notes into the new session with fresh identities. Later edits in the copy do not edit the source bookmarks. This is different from switching branches or exporting a `.science` file: private bookmarks still do not join package exports or synchronize across machines.
