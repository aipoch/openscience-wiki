---
title: "Connectors and credentials"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connectors and credentials

A Connector makes a service's tools available to an agent. A Credential supplies authentication when that service requires it. Installing a Skill or assigning a tag does not connect the service.

In batch management, review the selected count in the bottom action area before applying an operation. Read completion or failure feedback there, then check the resulting items. Selecting an entry alone does not enable, install or delete it.

## Use a built-in Connector

### Find tools for a gene-expression project

Open **Settings → Connectors**, search **Omics Archives**, and open its detail. This built-in family includes GEO, ArrayExpress, MetaboLights, MGnify and PRIDE tools. Expand a tool row before choosing it.

![GEO metadata tool and its explicit download boundary](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series` returns GEO series metadata, samples, platforms and supplementary-file URLs. Download the required data table from the returned source and attach it to your project before requesting a calculation.

Assign a tag such as **Transcriptomics** to a Connector, then find it under **Settings → Tags**. Tags organize resources without changing access or tool approval.

| State | What it establishes | Next check |
| --- | --- | --- |
| Listed in Directory | The app knows a Connector definition | Read its actual tool descriptions |
| Used by | Agent availability | Confirm the intended agent and capability binding |
| Credential selected | A named binding exists | Test authentication against the intended service |
| Tool policy | Whether calls are allowed, requested or blocked | Inspect remembered permission precedence |
| Successful tool result | That particular call completed | Validate its returned identifiers/data and source |

### Built-in Connector controls


Use **Search connectors** to find PubMed under **Directory**; the list also contains **Featured** and **Custom** groups. Filtering applies per group, so another group can say **No connectors match your search** while a matching result remains visible below.

Use **Filter connectors by group**, **Filter Connectors by agent**, and **Filter by Tag** together with search. **Manage credentials** opens the shared contact-email/credential settings. **Used by** shows availability; **Manage Tags** organizes a Connector. Use the resource’s **Manage access** control to review and adjust access for Main Agent and Specialists in one place.

#### Manage access for each agent {/* #resource-access */}

1. Find a Connector under **Settings → Connectors** and choose its **Manage access** control.
2. Review **Main Agent** and the listed Specialists. Search the role list when available. Change only the intended association; the role editor remains another way to manage its capability list.
3. Reopen the popup and check **Used by**. A binding can remain assigned to a disabled Specialist; assigning it does not enable that role.

![Connector access for Main Agent and individual Specialists](/img/open-science/v0330/resource-access.webp)

For a role with **Full access**, excluding this Connector creates a per-resource exception. A role with selected access uses its explicit list. Marketplace role bindings may be read-only here. Credentials, server readiness and operation approval are separate from these associations; assigning a Connector does not complete those steps.

#### Enable or disable several Connectors

Open **Settings → Connectors**, filter the list, choose **Select multiple** in the relevant group and select the intended Connectors. Review the selected count before enabling or disabling them, then check each returned state. Keep only the services needed for your work enabled. Bulk availability changes do not supply credentials, change per-tool approval policies or grant a Specialist access; configure those separately.

#### PubMed: availability, tools, and approval policy

1. Search **PubMed** and open its detail.
2. Expand **search_articles** to read its description. It returns a count and page of PMIDs and supports PubMed query tags, Boolean operators, dates, and sorting.
3. Choose **Require approval**, **Block** or **Always allow** for the access you intend to permit. Require approval displays **Ask when no Session, Project, or Global permission applies.**
4. Use **Manage access** to enable **Main Agent** for PubMed, then inspect **Used by**. Check each intended Specialist separately in the same popup.

![PubMed tool description and approval controls](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

The detail lists `search_articles`, `get_article_metadata`, `find_related_articles`, `lookup_article_by_citation`, `convert_article_ids`, `get_full_text_article` and `get_copyright_status`. Choose **Always allow**, **Require approval** or **Block** per tool. Review the separate Connector-wide **Skip approvals** switch before enabling it. Opening a description only displays the tool's instructions.

The directory placed PubMed under **Directory**, while its detail displayed a **Featured** badge. Directory placement and badges do not indicate account connection status.

<ToolOperationGroup>
<summary>Run a small GEO metadata lookup</summary>

### Run a small GEO metadata lookup

<p className="example-label"><strong>Worked example</strong> Look up GSE60450 sample metadata in GEO</p>

1. Return to the research session and confirm a working model and Omics Archives availability.
2. Ask: `Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. Inspect the requested Connector/method and arguments before permitting it. The tool expects an `accessions` array; a guessed singular field is incorrect.
4. Review the actual result. For this accession, check the returned **GSE60450**, **Mus musculus**, **12 samples**, and the title “Transcriptome analysis of luminal and basal cell subpopulations in the lactating versus pregnant mammary gland”.
5. Keep the returned GSM identifiers with their characteristics. Do not infer a mapping to the matrix's MCL1 column names from resemblance alone.

![Actual GEO sample characteristics returned through the Connector](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

The returned sample range was **GSM1480291–GSM1480302**, covering luminal/basal populations and virgin, 18.5-day pregnancy and 2-day lactation stages. These are returned metadata, not labels inferred from the count totals. The full twelve-row response table was downloaded as <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>geo-sample-metadata.csv</a>. This is a conversation-table export, separate from the managed QC artifacts.

If the Connector instruction file cannot be read, retain its EPERM error and check the enabled Connector and current session. Confirm operation fields in [Connector parameters](../reference/connector-operations.md) before retrying. A valid metadata query returns structured records; it does not download the underlying source table or perform an analysis.


</ToolOperationGroup>

## Add connector: shared identity fields

**Add connector** offers **Local command**, **Remote server**, and **Import configuration**. The first two open an editor with a type selector, and **Advanced settings** exposes additional fields. The screenshots use an illustrative endpoint; connect a server you actually intend to use.

| Field | Purpose |
| --- | --- |
| Connector type | Switch between a local process and a remote endpoint. |
| Display name | Name shown in the UI. |
| Advanced → Connector name | Callable name used by `host.mcp`, Specialist bindings, and the generated MCP Skill; generated from the display name where possible. |
| Connector ID | Optional stable ID, generated where possible. Editable before creation, immutable afterward. |
| Description | Optional explanation of the data/actions provided. |
| I trust this connector | Required trust acknowledgment before adding a custom Connector. It does not validate the service or make its code safe. |
| Cancel / Back to connectors | Leave the form. It does not save the draft. |
| Add connector / Add and sign in | Save the valid configuration and, for OAuth, start sign-in. The button remains disabled while required fields, bindings, or trust are missing. |

### Local command

**Command** offers `npx — Node package`, `uvx — Python (uv)`, `node — script file`, `python3 — script file`, `docker — container`, and **Other…**. Other exposes **Custom command** for an absolute executable path.

| Advanced input | Operation |
| --- | --- |
| Arguments | One argument per line; spaces and blank lines are preserved. Clear the field to remove all arguments. Do not assume a space-separated shell command is parsed into multiple arguments. |
| Variable name | Name an environment variable, then select/create its Credential. |
| Add variable / Remove variable | Add or remove a named binding. |
| Fields / Text | Enter names as structured rows or one `KEY=` per line; secret values live in Credentials. |
| Command preview | Inspect the launcher shown after the bindings. |

![Local command editor and credential-bound environment variables](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

A launcher entry alone does not prove that its executable or service is operational. Use the invocation below to check the imported local command.

### Remote server

Enter the real **Server URL** supplied by the server operator. `https://example.org/mcp` in these screenshots is an illustrative reserved-domain address, not a working MCP endpoint.

**Advanced → Transport** defaults to **Streamable HTTP**. **Authentication** offers **None**, **OAuth (browser sign-in)**, and **Static headers**.

#### Static headers

The current editor binds named credentials; it is not a plain secret-value text area.

1. Choose **Static headers**.
2. Enter a **Header name**, such as `Authorization`.
3. Select or create the corresponding **Credential**. The selector is disabled until the header has a name.
4. Use **Add header** for another row or **Remove header** to discard a row.
5. **Fields / Text** changes how names are entered. Text mode expects one header name per line as `Name:`; credential values are managed separately.

![Static header name and credential selector](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### OAuth binding

Choose an **OAuth credential** matching the resource URL, transport, and registration. **New credential** opens the [credential editor](../tools/credentials.md#new-credential). In this empty profile, the form reported **No OAuth credential matches this Connector's resource URL, transport, and registration.** The final action changes to **Add and sign in**.

![OAuth credential matching](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## Import, export, and connection tests

Choose **Add connector → Import configuration** and select one JSON file up to 256 KB. The importer accepts an Open-Science Connector configuration or an MCP client file containing `mcpServers`.

1. For a multi-server file, choose an entry in **MCP server**. You review and add one server at a time. Check its name, ID, transport and command arguments after switching entries.
2. Read the diagnostics. Absolute paths may need changing on another computer; credential values are excluded from import.
3. Choose **Use configuration** to open the prefilled editor. Review every field, bind the required local credentials and select **I trust this connector**.
4. Choose **Add connector**, inspect connection state in the list, then invoke a small read-only tool.

![Selecting a server and reviewing required credentials](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

When an imported server references an environment variable such as `QC_EXAMPLE_TOKEN`, bind that name to a credential stored on this device. **Add** remains unavailable until required bindings are complete. After adding, check **Connected** and execute the intended tool; a saved binding alone does not validate remote authentication.

Call `get_dataset_summary`, then pass one returned full sample ID to `get_sample_qc`. Compare the response with the [QC baseline](../reference/example-data.md). This server returns saved summary values; it does not recompute the original matrix. Server implementation is covered in [Create a custom tool](../tools/custom.md).

### Export and reimport

Choose the row's **Actions → Export**, select **Open Science Connector** or **MCP client config**, inspect the preview, and choose **Save configuration**.

![Export retaining credential names and reporting local paths](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

The actual exported file retained the variable name in `required_secrets.environment`. It contained no demonstration credential value, local trust or permissions. Reimport requires local credential selection and trust again.

When the same ID already exists, the preview reports **A custom Connector with ID … is already installed**, and **Use configuration** is unavailable. Use **Edit** to change an existing connection; import is not an overwrite operation.

![An existing ID blocks duplicate import](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

When restoring an exported connection, inspect the prefilled fields and bind the required named credentials again. Complete trust and test a bounded call before using it in research. Import does not overwrite an existing Connector with the same ID.

## Credentials: services and reusable secrets

Create and manage secrets in [Service credentials](../tools/credentials.md), then select their names in environment, header or OAuth bindings. On a new device, restore these bindings and complete that service's sign-in before testing the connection. Exports contain configuration references, not usable secrets or local trust.

## HTTP error lookup

For 400, 401, 403, 404, 429 or 5xx responses, use the [HTTP troubleshooting table](troubleshooting.md#http-errors-400-403-429-and-5xx). Keep the responding service and its detailed message with the status code.
