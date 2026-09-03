---
sidebar_position: 1
title: Complete page and control index
description: Find every documented Open Science button, input, switch, and result by page.
---

# Complete page and control index

This page condenses the application's entry points into a searchable, page-by-page list. State-dependent controls appear only when their conditions are met. Disabled means a prerequisite is missing, not that the control is unimplemented.

## Onboarding

| Page | Controls | Result or prerequisite |
| --- | --- | --- |
| Environment | Check rows, Retry/Continue | Shows System, Storage, Secure vault, and Install network; a blocking failure prevents Continue |
| Agent | Framework card, Install, Active, Back/Continue | Install or select an agent runtime |
| Model | Provider type/name, Endpoint/Base URL, API format, key, model, context, Images, Reasoning, Test, Add | Continue after Test succeeds and a working model is available |
| Notebook | Python/R switch, Add interpreter, Download and set up, Packages | Select an execution environment for the agent; this step can be completed later |
| Location | Location, Browse, Back, Finish | Write the data root and complete onboarding |

## Home and projects

| Page | Controls | Result |
| --- | --- | --- |
| Home header | GitHub, Search, Theme, Messages, Model settings | Open the repository, global search, appearance menu, notifications, or Model settings |
| Home body | New project, project card, Recent session | Create or open a project or session |
| Theme menu | System, Light, Dark | Set appearance and keep it in sync with General |
| Search | Search input, result item, Esc | Find and open a project, session, or file |
| Messages | Notification item, read action, Close | Open the source and manage unread items |
| Create project | Name, Description, Agent Context, Cancel, Create project | Create a project; Name is required |
| Project actions | State-dependent Edit, Archive, Delete, and related actions | Change project metadata, archive the project, or confirm deletion |

## Workspace sidebar and layout

| Control | Result |
| --- | --- |
| All projects | Return to Home |
| Project name | Open the project entry point or menu |
| Collapse sidebar | Collapse or expand the left sidebar |
| New | Create a session |
| Customize | Start a Skill/Specialist customization conversation |
| Files | Show the project files panel on the right |
| Session row | Switch sessions; status reports Idle, Running, Permission, or another state |
| Session actions | Pin/Unpin, Rename, View notebook, Archive, Delete |
| Messages, Settings, GitHub | Open notifications, settings, or the official repository |
| Resize left/right, Collapse preview | Resize a panel or collapse Preview |

## Conversation and Composer

| Area | Control or input | Result |
| --- | --- | --- |
| Message | Copy, Edit | Copy the message or create a revision by editing it |
| Revision | Previous, `n/N`, Next | Browse message revisions |
| Assistant result | Usage, Elapsed, generated file | Inspect usage and time, or open an output |
| Activity | Collapsible title, Details, Copy, Report error | Open tool, code, diff, search, or error details |
| Input | Ask anything, `↑↓`, `/`, `@`, `⌘K/Ctrl+K` | Enter text, browse history, select a Skill, reference a file, or search |
| `+` | Attach files, Your files, Review, Context | Stage a new or existing file, request review, or inspect context |
| Attachment chip | Preview, Remove | Inspect or remove a reference before sending |
| Agent controls | Specialist, Delegation, Auto-review, Permission mode | Change the policy for later requests |
| Model | Active model, Reasoning effort | Change the model or effort for later requests |
| Send | Send, Plan first, Side chat, Branch, Stop | Submit in the selected mode or stop the current run |
| Scroll to end | Jump to the latest message |

## Permission, plan, and structured questions

| Surface | Controls | Result |
| --- | --- | --- |
| Permission | Impact info, Permission info, Allow once, Deny | Inspect and approve or reject a single request |
| Scope confirmation | Cancel, Confirm session/project/global | Save a broader grant; broad scopes require a second confirmation |
| Plan | Approve/Run, Feedback input, Cancel | Accept a plan, ask for changes, or cancel |
| Elicitation | Structured input or options, Submit, Cancel | Answer an agent question |
| Subagent permission | Identity/pending count, Allow/Deny | Decide a subagent request separately |

## Files and Preview

| Control | Result |
| --- | --- |
| Filter, Search | Filter by All or Artifacts and by file name |
| Grid/List | Change the file layout |
| Expand/Exit full screen | Open the file library full-screen or return to split view |
| Category accordion | Expand uploads or generated files from a session |
| File card/body | Open a modal Preview |
| Download | Save the original file or selected version |
| Open in split view | Add a Preview tab on the right |
| Preview tab, Close tab | Switch or close Preview tabs |
| Full screen preview | Enlarge the current file |
| File actions → Provenance | Open artifact evidence; ordinary uploads do not have this action |
| Previous/vN/Next | Change artifact version |
| PDB Cartoon/Stick/Sphere/Surface/Line | Change the three-dimensional representation |
| PDF/Office/Image controls | Navigate pages, zoom, show thumbnails, or download as supported by the renderer |

## Notebook and Provenance

| Page | Controls | Result |
| --- | --- | --- |
| Notebook | Agent filter, Python/R/Bash tabs | Filter runs by agent or language |
| Notebook cell | Copy, Show/Hide output | Copy input or expand output |
| Notebook footer | Download `.ipynb`, Close | Download when cells can be converted, or close the dialog |
| Provenance | Version arrows, Close Provenance | Change version or return to Preview |
| Provenance tabs | Code, Execution Log, Messages, Environment, Review | Change the evidence type |
| Code | Generate script, Download, Copy | Create a derived script or save the producer block |

## Global Settings controls

`Back`, `Forward`, breadcrumbs, `Maximize/Restore`, `Close settings`, mobile navigation, and error `Dismiss` apply throughout Settings.

### Skills

Conversation Skill imports, source filter, Search, Add skill, category collapse, Skill detail, enable switch, Create/Upload/Import, Preview, Edit, Export, Delete, Cancel, and Save.

### Connectors

Filter/Search, Add/Import, Enable, Detail, Test/Reconnect, Edit, Export, and Remove. The Add form contains Type, Display name, ID, Description, Command, Arguments, Environment variables, URL, Transport, Authentication, OAuth scopes, Authorization server URL, Client metadata URL, Headers, Trust, Cancel, and Add/Save.

### Specialists

Category filter, Search, Enable, Detail, Actions, Create, and Import. The Editor contains Icon, Color, Name, Description, Instructions, Full access, Capability type, Skill/Connector searches, selected capabilities, Cancel, and Save. Import contains Select ZIP, Preview, Diagnostics, Cancel, and Import.

### Compute

Add host, Host card/enable, Probe/Retry, Detail/Edit/Remove, Resources, Details document, Scratch root Edit/Input/Save/Cancel, and Concurrent job limit Edit/Input/Save/Cancel. Execution approvals offer Deny, once, session, project, and global.

### Network

Check again; Package mirror Configure/Edit; Conda channel, pip index, and CA bundle; View mirrors, Cancel, and Save.

### Model

Active model, Reasoning radios, and Subagent model/effort; Provider Test/Edit/Delete/Add. The Provider form contains all fields from the Onboarding Model page plus Cancel and Save.

### Agent

Framework card, Switch, Install source, Install/Cancel/Retry, Install log, Repair, Sign in/auth, Import config/home, and Uninstall confirmation.

### Permissions

Default profile, scope filter, grant scope link, connector hint, Revoke and confirmation, and incomplete-store warning or refresh.

### Runtimes

Python/R; environment Enable, Add interpreter, Download/setup, Repair, Allow package install, Packages, Filter, Add/Install/Remove package, Disable/Uninstall, and confirmation.

### Storage

Application storage Reveal/Repair; Data location Change, Path, Browse, checks, Migrate/Adopt/Cancel; migration progress Cancel/Retry/Restart/Discard; expandable Disk usage categories.

### General

Task notifications, Theme radios, App icon radios, close behavior, GitHub token Open/Input/Save/Clear, and About/Check updates/install update.

### Remote control

Start/Stop/Refresh, Copy/Open URL, and QR; Remote.It setup/retry/disconnect; Trusted browser Revoke; pairing request Reject/Allow once/Always trust.

### Archived

Project Manage, Restore project, Delete project; Session Restore/Delete; deletion confirmation Cancel/Confirm.
