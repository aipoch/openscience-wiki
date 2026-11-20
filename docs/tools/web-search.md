---
title: "Search the web and read sources"
last_update:
  date: '2026-11-20'
---

# Search the web and read sources

Use the built-in **Open-Science Agent** to find public webpages and read their text in a conversation. This is useful for locating reporting guidelines, software documentation and research announcements. For bibliographic records and full-text papers, also use [scientific databases](databases.md) and the [Library](../guides/library.md).

## Start with a question {/* #start */}

1. In **Settings → Agent**, select **Open-Science Agent**. Connect a supported Main model in **Settings → Model**; a Codex subscription can supply the model.
2. Open a project conversation. State what you want to find, which sources to prioritize and any date restriction. Ask the Agent to read the relevant page before answering.
3. If an approval appears, inspect the search query, time range, result limit and domain filters. Approve only the intended request. A page-reading approval concerns the destination URL.
4. Expand the tool activity and inspect the returned sources. Follow the answer's citations back to the evidence before using its claims.

Example request:

```text
Find the official PRISMA 2020 checklist page on the public web.
Read the relevant official page and explain what the checklist is for.
Give the source URL and distinguish the webpage text you read from any
linked PDF you did not open. Keep the answer in English.
```

The built-in search sends queries to **Exa** without requiring an Exa account. Reading a page contacts its website. Your permission mode still applies, and cancelling cannot retract a request already sent. Do not include confidential research data in a public search query.

## Read the evidence, not just the snippet {/* #read-sources */}

A search result is an excerpt. Ask the Agent to read a selected page and cite the material that supports its answer. Page reading handles public HTML, Markdown and plain text; it does not log in, use your browser's cookies or execute a site's JavaScript. Use the PDF and Library workflows for papers or attachments instead of treating an HTML landing page as the paper's full text.

When the returned text is truncated, ask the Agent to continue reading the saved page excerpt before drawing conclusions. A saved source reflects what was retrieved at that time. Ask for a fresh fetch when current wording matters. Retained sources can follow session branches and eligible research-package exports; this does not archive the entire website.

## If a source cannot be read {/* #recover */}

- For a rate limit, wait for the indicated interval before retrying. Do not repeatedly send the same failed query.
- If a required filter is unsupported, keep that requirement and choose another source or search route; do not silently broaden the search.
- For a login wall, blocked page or unsupported file type, open the official source yourself and supply an accessible permitted file when appropriate. Do not describe an unread page as verified evidence.

For finding and screening research papers, continue with [focused literature search](../workflows/focused-literature-search.md).
