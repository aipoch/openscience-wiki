---
sidebar_position: 5
title: Memory, Tags, Credentials, and Usage
---

# Memory, Tags, Credentials, and Usage

## Memory

Memory is opt-in and project-scoped. Open Settings → Memory to inspect the categories and entries available to the current project. Create or correct an entry only when it will remain useful across sessions, and delete or clear entries that are wrong or no longer needed. Recall happens before relevant turns; it does not mix entries from other projects.

Do not store passwords, API keys, access tokens, personal health information, or confidential source material in memory. A remembered statement is context, not verified evidence—check it against the project's files and provenance before relying on it.

## Tags

Tags group Skills, Connectors, and runnable Specialists. Assign more than one tag when useful, use a tag filter to narrow a catalog, and open Settings → Tags to create, rename, reorder, or delete custom tags. `Favorites` is a protected localized tag fixed at the first position. Deleting a custom tag removes its assignments but does not delete the tagged resources.

## Credentials

Settings → Credentials is the central place for GitHub tokens, Connector API keys, access tokens, and OAuth sign-ins. A row reports its health and which Connectors use it.

1. Create or recover the credential locally.
2. In a custom Connector, bind the named credential to an environment variable, HTTP header, or OAuth sign-in.
3. Test the Connector and review the tool-level permission policy.

Credential values resolve only inside the application and are excluded from portable exports. Exports replace them with placeholders such as `${API_KEY}`. Never paste a credential into a description, project file, screenshot, or public issue. If secure storage is unavailable or a value cannot be decrypted, treat it as unhealthy and re-enter it only after the operating-system credential service is working.

## Usage

Settings → Usage summarizes tokens, sessions, projects, runs, and artifacts for Today, This week, Last 30 days, or All time. The heatmap and daily chart separate input, cache, and output when the provider reports them. Open Context from the Composer to compare turn-level and call-level context use; group calls by turn, model, or framework where available.

Coverage can be incomplete after a provider or framework switch. Open Science discloses missing call details instead of inventing them. Auxiliary model calls—including delegation, side chat, compaction, reviewer work, and session-detail generation—are attributed separately when telemetry exists.
