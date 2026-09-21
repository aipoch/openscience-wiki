---
title: "Skill, Specialist, and MCP formats"
last_update:
  date: '2026-09-08'
---

# Skill, Specialist, and MCP formats

Skills, Specialists and Connector templates have different package boundaries. This reference lists their fields and import budgets. Inspect the archive preview before importing, then check the installation result.

## Skill document and resources

A Skill root contains `SKILL.md`; references and scripts live below the same package root. Its metadata block is YAML followed by Markdown instructions.

<p className="example-label"><strong>Example</strong> A minimal SKILL.md document</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

The parser separates `name` and `description` from other metadata, normalizes line endings and keeps scalar metadata values as strings. Check the import/editor validation result before publishing the package.

| Package element | Use | Boundary |
| --- | --- | --- |
| `name` | Stable invocation identity | Keep it consistent with references to the package |
| `description` | When the agent should select the Skill | Does not execute anything by itself |
| Markdown body | Instructions loaded on invocation | A supported instruction is not evidence that its external dependency exists |
| Relative resources | Scripts, templates, references and data | Keep referenced paths inside the package structure |
| `.source.json`, `.specialist-package.json` at root | App-owned metadata | Excluded from the user-authored package budget; do not invent or repurpose these files |

### Skill import budgets

| Limit | Value |
| --- | ---: |
| Files in one Skill | 16,384 |
| Individual decompressed file | 50 MiB |
| Total decompressed Skill | 128 MiB |
| Aggregate raw SKILL.md content in one preview response | 4 MiB |
| Directory nesting | 8 levels |
| GitHub requests per import | 512 |
| Nested compressed Skill archive | 64 MiB |
| Outer uploaded bundle | 256 MiB |
| Skills per bundle | 256 |
| Outer bundle entries | 32,768 |

Budgets apply at different levels. A bundle below its outer limit can still contain a Skill that exceeds an inner limit. Review each candidate's diagnostics; do not interpret partial import as every candidate succeeding. Personal-editor reference-file counts reserve one package entry for SKILL.md.

[Skill parser](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts), [shared import limits](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts).

## Specialist package

A portable Specialist package contains `manifest.json` and `specialist.json`. Bundled Skill resources use `skills/<skill-name>/<file>`, with `SKILL.md` in each Skill root. Its frontmatter name must match that directory name.

| File / field | Contract |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | Package identity; contribution IDs use lowercase letters/digits/hyphens and avoid reserved `os-` / `mcp-` prefixes |
| `version` | Semantic version |
| `exported_with_app_version` | Exporting application version |
| `specialist.json → name` | Stable Specialist profile name |
| `display_name` | Optional presentation name |
| `description` | Role description |
| `system_prompt` | Specialist instructions; snake_case at the package boundary |
| `skill_ids` | Array of nonempty Skill names without duplicates |
| `connector_ids` | Array of nonempty Connector names without duplicates |

Unknown or forbidden fields are rejected. In-memory payloads use camelCase (`systemPrompt`, `skillIds`, `connectorIds`), which must not be confused with the portable JSON field spelling. Portable Connector names can resolve to machine-local IDs on import; package references do not carry machine credentials.

| Specialist archive limit | Value |
| --- | ---: |
| Compressed size | 50 MiB |
| Uncompressed size | 200 MiB |
| File count | 2,000 |
| Individual file | 25 MiB |
| Compression ratio | 1,000 |
| Path depth | 32 |

The import preview reports diagnostics, whether it is installable and each Skill disposition: install, reuse, conflict or replace. An overwrite requires explicit confirmation. A stale or expired candidate must be previewed again; do not blindly replay its token. Skill conflicts require an explicit installed/incoming choice.

Export uses an expected revision and selected included Skills. Deletion also uses a preview/revision and protects built-in, main-enabled, shared or referenced Skills. Removing one Specialist is not equivalent to deleting every Skill it can access.

[Package types and archive budgets](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts), [package validation](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts).

## Connector template and MCP client export

An Open-Science Connector template is not the same JSON document as an MCP client's `mcpServers` configuration.

| Template field | Contract |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | Stable custom name, up to 64 characters, lowercase letters/digits/hyphens; unique and not a built-in reserved name |
| `display_name` | Human-readable label |
| `description` | Optional explanation |
| `transport` | `stdio`, `streamable_http`, or `sse` |
| `command`, `args` | Local stdio executable and argument list |
| `url` | Remote HTTP/SSE endpoint |
| `required_secrets.environment` | Names of environment secrets for stdio; not their values |
| `required_secrets.headers` | Names of HTTP header secrets; not their values |
| `required_secrets.oauth_client_secret` | Whether an OAuth client secret must be supplied locally |
| `oauth` | Supported registration/issuer/scopes/client/redirect metadata |

Transport-specific validation applies: remote transports do not include required environment secrets; OAuth and required header secrets cannot be combined. A pre-registered OAuth client requires its authorization server; client metadata registration and explicit client ID are separate modes. Redirect/client-secret metadata requires the corresponding client ID.

Portable exports reject embedded credentials in URLs and command arguments. MCP client export uses `mcpServers`, `command`/`args`/`env` for stdio or `type`/`url`/`headers` for remote transport, with secret placeholders. OAuth registration and tokens are excluded from that client format, and the export reports the limitation.

Importing configuration does not install the external server, sign in to its service or establish successful tool execution. Confirm connection state and inspect advertised tools after supplying credentials through the application.

[Template parser and both export formats](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts), [custom Connector identity](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts).
