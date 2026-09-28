---
title: "Permissions and control"
last_update:
  date: '2026-09-28'
---

# Permissions and control

Use this page to identify the rule responsible for a permission decision. For the steps to review a card or revoke a grant, see [Permissions and approvals](../guides/approval-modes.md).

## Permission layers

| Layer | Values or scope | What it governs |
| --- | --- | --- |
| Conversation profile | `ask`, `auto`, `full` | The agent's approval behavior for the current conversation |
| Selected versus effective profile | Runtime-dependent | The framework may expose fewer capabilities than the selected profile requires; inspect its explanation |
| Remembered capability grant | Conversation, project, global | Matching future calls for the recorded capability and qualifier |
| Connector tool policy | Always allow, Ask each time, Block | The selected Connector tool; a blocked tool fails before grant lookup |
| Filesystem access | Selected paths and access modes | Which external locations an operation can access |
| Notebook network policy | Allowed destinations and connection checks | Whether the runtime can reach a requested destination |
| Specialist capabilities | Assigned Skills and Connectors | What is available to that role |

These layers are not interchangeable. Full access changes agent prompt behavior; it does not install a tool, provide a credential, make a server reachable or prove that a runtime's network protection permits the connection.

## Profiles and scopes

| UI value | Contract | Meaning |
| --- | --- | --- |
| **Ask for approval** / **Ask** | `ask` | Ask for operations that require approval, subject to existing grants and application-owned exceptions |
| **Auto-approve edits** / **Auto** | `auto` | Supported workspace edits and recognized app-owned Library operations can pass automatically; arbitrary shell or MCP calls are not generally allowed. See [Library rules](../guides/approval-modes.md#library-auto). |
| **Full access** | `full` | Allow agent permission requests without manual prompts where the runtime supports it |
| **Once** | `once` | Only the current call; no durable grant |
| **This conversation** | `session` | Matching calls in this conversation, including across restarts |
| **This project** | `project` | Matching calls in this project; broad-scope confirmation |
| **Global** | `global` | Matching calls across projects; broad-scope confirmation |

The card only offers scopes supported by that request. It normally chooses conversation scope when available, then once. Do not infer “once” from the button's position; read its complete label. Command-prefix and category qualifiers can cover more than an identical repetition of one call.

**Default permission mode** affects new conversations. Existing conversations retain their own setting. **Auto-review** is a separate result-review option; it is not the `auto` permission profile.

## Connector decision order

The Connector broker evaluates these conditions:

1. If the tool matches **Block**, reject it.
2. Otherwise, apply the Connector's allow/ask configuration. A Connector-level automatic-allow entry can allow the call; a tool requiring approval continues to the next check.
3. Resolve an applicable remembered grant for the capability and current project/conversation.
4. If none applies, show the supported approval scopes. If approval is unavailable or denied, fail the call.
5. Persist a remembered approval before releasing the operation, unless the caller explicitly defers persistence until its own authorization step.

A saved grant cannot override **Block**. Conversely, revoking a remembered grant may not introduce a prompt if an allow policy or broader grant still covers the call. Read the displayed policy and coverage hints.

## Default global grants

The source defines 20 baseline grants. This number describes the built-in defaults, not the count every installed profile must display.

| Family | Baseline capabilities | Count |
| --- | --- | ---: |
| Customization | Create/update a Specialist; publish/edit a Skill; attach/detach Skills and Connectors to/from a Specialist | 8 |
| Skills | Invoke a Skill | 1 |
| Literature reader | `read_document` | 1 |
| Notebook inspection | List runtimes, read Notebook state, list Memory categories, search memories, inspect packages | 5 |
| Plan progress | `update_step_status` | 1 |
| Literature library | Search, read abstract, read PDF, format references | 4 |

Some defaults permit customization writes. Do not describe the baseline as “read-only permissions.” **Restore defaults** adds missing baseline global grants without clearing other grants. It does not reset every permission setting or undo completed work.

Application-owned exceptions also exist outside this list: saving an already-existing or inline result through the exact artifact capability, displaying an interaction question and declaring an activity group can pass without an extra permission card. Such exceptions depend on verified tool identity, not a tool's reassuring display title.

## Revocation and incomplete state

| Observation | Meaning |
| --- | --- |
| A row remains covered globally or by a project | Removing this narrower grant leaves broader authority in effect |
| Policy hint says blocked | The policy prevents the call even if a remembered row exists |
| Incomplete stores warning | The visible inventory may omit grants; bulk revocation is disabled until the complete set is known |
| Stale revision or missing grant | Another change invalidated the requested row; refresh and inspect current state |
| Undo notice | Reverses the eligible grant revocation within its displayed availability; it does not reverse a tool's effects |

Technical reference: [profiles](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/permission-profiles.ts) · [Connector broker](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/connector-broker.ts) · [baseline grants](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/defaults.ts) · [agent policy](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/acp/permission-policy.ts).
