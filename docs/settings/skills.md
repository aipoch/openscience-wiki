---
sidebar_position: 2
title: Skills
---

# Skills

![Skills panel](/img/open-science/settings-skills.png)

A Skill is an on-demand package of workflow instructions and resources. The list is divided into Featured (included with the application), Imported (from GitHub or a package), and Personal (created locally). Each row shows its name, description, and enable switch.

## List controls

| Control | Action |
| --- | --- |
| `Conversation imports` → `Skill packages` | Let the agent detect attached `.zip` or `.skill` files and ask before importing them |
| `Filter skills by source` | Filter by All, Featured, Imported, Personal, or another source |
| `Search skills` | Filter by name or description; keyboard search works while the field is focused |
| `Add skill` | Open the creation, upload, and import options |
| Category heading | Expand or collapse a category |
| Skill name or description | Open Detail to inspect metadata, `SKILL.md`, and files |
| `Toggle <Skill>` | Set whether the agent may select or explicitly invoke the Skill |

Disabling a Skill does not delete its package. Instructions already loaded for the current agent turn are not withdrawn immediately; the change applies to later requests.

## Add and edit

- Create a Personal Skill by entering its name, description, and full `SKILL.md`, then save after the editor passes validation.
- Upload a ZIP or Skill package, inspect Metadata, `SKILL.md`, and Files, then confirm the import.
- Import from GitHub by entering a supported repository or path. Review the candidate list, source, and diagnostics before importing.
- Detail may offer Edit, Export, and Delete. Featured Skills are usually view-only apart from the enable switch.
- If a revision conflict appears, refresh or compare the revisions before overwriting another edit.

The import candidate's `Preview`, `Close preview`, file list, and diagnostics help you inspect package contents. Conversation imports also pass through an `Allow` or `Deny` permission request.

## Research practice

Enable only the Skills needed for the current research task so the agent has fewer irrelevant choices. A Skill that calls an external model or service may still need network access, a Connector, a runtime, or a license. An enabled Skill does not mean its dependencies are installed.
