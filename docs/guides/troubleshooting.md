---
title: "Troubleshooting and common questions"
last_update:
  date: '2026-09-24'
---

# Troubleshooting and common questions

Find the error text below, follow the checks for the affected operation, then retry that operation. If the problem persists, [report a bug or ask the community](#report-a-bug-or-ask-the-community) with the error and the steps that triggered it.

<span id="provider-test-fails" />

<span id="pythonr-or-package-installation-fails" />

<span id="file-does-not-open-in-preview" />

<span id="remote-control-is-unreachable" />

## Diagnose by the point of failure

| Symptom | Check first | Action and success condition |
| --- | --- | --- |
| App opens an empty workspace | Data location, profile and Archived | Return to the intended root/project; do not immediately create a replacement |
| No usable model | Provider login, active Agent, model compatibility | [Provider setup](providers.md): a small actual response succeeds |
| Login appears connected but task fails | Expanded provider error and selected model | Recheck authentication/entitlement and model identifier; UI presence is not access proof |
| Task appears stopped | Pending plan, approval or interaction card | Respond to the visible request; read its scope before allowing |
| Queued correction does not run | Not saved / Sending / deferred-delivery state | [Composer](composer.md): verify it became a user message |
| Module not found | Exact interpreter and package inventory | [Runtimes](runtimes.md): validate the import in the selected environment |
| Approved package install still fails | First network/proxy/certificate error | [Network](network.md): retry the actual operation after fixing its cause |
| Notebook cannot read a file | Managed path, attachment, folder grant and version reference | Use the intended permitted input; do not expand unrelated filesystem access |
| Saved-file service rejects a working path | Whether it is registered for managed publication | Save through the supported artifact operation; reopen the resulting file |
| Table differs from an expected number | Source hash, delimiter, metadata columns and calculation denominator | Recalculate from the same input before changing the expected value |
| File visible but preview fails | File format/size, version and renderer error | [Previews](previews.md): download to distinguish rendering from file absence |
| Reference seems missing | Library view, filters, Inbox or Trash | Clear filters, inspect status and restore in the correct lifecycle |
| Full-text source found but attachment fails | Actual download result and PDF validation | Use another legitimate source/local PDF, then open the attachment |
| Side Chat disabled | Agent/provider compatibility message | [Delegation](delegation.md): check the compatibility restriction shown by your selected framework |
| Remote job cannot run | Real host, authentication, scheduler and runtime prerequisites | [Remote compute](remote-compute.md) |

<span id="storage-migration-reports-an-error" />

## HTTP errors: 400, 403, 429 and 5xx

An HTTP status describes a response from a model provider, Connector service, local browser service or proxy. **Identify the responding service before changing settings.** Copy the status together with its error body: `403` alone does not tell you whether an API permission, proxy policy or resource restriction caused the rejection.

<span id="permission-request-keeps-waiting" />

### Request, authentication and access

| Status | Meaning | What to check in Open-Science |
| --- | --- | --- |
| **400 Bad Request** | The service rejects the request. | Read the named field or parameter. Check the provider endpoint, model identifier and supported request features. For a tool call, check its input schema. Try a small text-only request if attachments or an optional feature triggered the error. |
| **401 Unauthorized** | Valid authentication is missing. | Check which account or credential the failing service uses. Reconnect the relevant subscription/OAuth account, or correct the API key in [provider settings](providers.md) or [Connector credentials](connectors.md). |
| **403 Forbidden** | The service refuses access. | Check model/resource entitlement, organization/project permissions and the service's stated access restrictions. If the error says **HTTP CONNECT 403**, inspect the [proxy or network policy](network.md), rather than assuming the model key is wrong. |
| **404 Not Found** | The endpoint or resource is unavailable at that address. | Check Base URL, API path and model/resource ID. A browser website URL is not necessarily an API endpoint. A service may also use 404 to hide an inaccessible resource. |
| **405 Method Not Allowed** | The endpoint does not support this request method. | Check the selected API protocol and Connector transport against the service documentation. Report a reproducible integration mismatch rather than guessing a different method. |
| **407 Proxy Authentication Required** | The proxy requires authentication. | Check the proxy configuration with your network administrator. Model API credentials do not authenticate the proxy. |
| **413 Content Too Large** | The request body exceeds a limit. | Reduce the attachment/batch size or use a supported smaller input. Confirm which service imposes the limit. |
| **422 Unprocessable Content** | The request content cannot be processed as supplied. | Read the field-level validation message. Correct types, required fields or unsupported values in the tool/provider request. |

**400 and 403 need different checks:** for a 400 that names an unsupported parameter, correct that request feature. For a 403 that names a restricted model, check access to that model. If no precise cause appears, preserve the response and request ID for support; do not infer the cause from the number alone.

### Quotas and temporary service failures

| Status | Meaning | Next action |
| --- | --- | --- |
| **402 Payment Required** | Provider-specific payment/access handling; HTTP reserves this status without a universal billing meaning. | Read that provider's error body and account page. Do not assume a top-up is required from the number alone. |
| **429 Too Many Requests** | Rate limiting; some model APIs also use it for exhausted quota. | For a rate limit, reduce concurrent requests and wait for **Retry-After** or the documented reset. For a quota error, check that service's allowance/billing. A subscription limit and API credit balance are separate. |
| **500 Internal Server Error** | The responding server failed. | Check its service status. Retry a small request after a pause if safe; report repeated failures with the request ID. |
| **502 Bad Gateway** | A gateway received an invalid upstream response. | Identify the gateway/provider and check its status and configured upstream. A persistent custom-gateway failure may require its administrator. |
| **503 Service Unavailable** | The service is temporarily unavailable. | Follow Retry-After if supplied and wait for recovery. For a local endpoint, check that the intended model server is running and ready. |
| **504 Gateway Timeout** | A gateway timed out waiting upstream. | Check whether the operation already started or completed before retrying. For an analysis, job submission or artifact write, inspect the existing result first to avoid duplication. |

Some built-in Connector requests have bounded automatic retries for 429, 500, 502, 503 and 504. This does not apply to every model/framework or make repeated manual submissions safe. Follow the specific service's response.

### No HTTP response, or still failing

`ECONNREFUSED`, `ENOTFOUND`, `ETIMEDOUT` and certificate errors are connection/TLS failures, not HTTP status codes. A request timeout is not automatically HTTP 408 or 504. Start with [Network](network.md).

After changing a setting, test the same provider/Connector with a small request, then retry the affected operation. If it still fails, use the [feedback instructions](#report-a-bug-or-ask-the-community). Include the service name, endpoint host/path without secrets, status, error body, request ID if present, and time/time zone. Never paste an Authorization header or token-bearing URL into a public report.

## Match the error message

Copy the exact code and accompanying message from the failed tool, dialog or log. **Codes**, Python exception names and OS messages are different kinds of identifiers; Open-Science does not assign one universal numeric code to every failure. A message can have several causes. For remote jobs, use the [SSH and compute error table](remote-compute.md#resolve-ssh-and-job-errors).

| Code or message | Meaning and next action | Confirm recovery |
| --- | --- | --- |
| `ModuleNotFoundError: No module named '…'` | The selected Python interpreter cannot import that module. Inspect [Runtimes](runtimes.md), install the required package in that environment through its supported package-management route, and follow any restart instruction. | Import the module in the same Notebook environment, then rerun the failed cell. |
| `ENOENT` / `No such file or directory` | The requested path cannot be found. Check the filename and source location; attach the existing file again if its reference is stale. | Preview or read the intended input from the same task. |
| `EACCES` / `EPERM` / `Permission denied` | The operation lacks filesystem access. Inspect both the OS permission and the project's folder grant; use [Projects](projects.md) to grant only the directory the task needs. For SSH `Permission denied (publickey)`, check authentication instead. | Repeat the original read/write within the intended permission scope. |
| `ENOTDIR` / `Not a directory` | A directory operation received a file or an invalid parent path. Select the actual containing folder. | The directory listing opens. |
| `EISDIR` / `Is a directory` | A file operation received a directory. Select the intended file. | The file opens or downloads. |
| Package request rejected for a non-public destination | Inspect the rejected host and resolved IP. A proxy or DNS configuration can supply an address the network policy blocks. See [Network](network.md); fix the address resolution instead of widening access blindly. | The original package request and subsequent import both succeed. |

<span id="agent-does-not-start-or-the-session-stops-progressing" />

### Database startup errors

These codes appear when the app cannot safely finish opening its data. Keep the existing data folder. Read the error detail before retrying; deleting the database is not a repair step.

| Error code | Meaning | Next action |
| --- | --- | --- |
| `database_runtime_unavailable` | The bundled database engine failed to load. | Reinstall the appropriate official app package, retaining the separate data folder. |
| `database_open_failed` | The database could not be opened. Another app instance, insufficient disk space or a read-only location can cause this. | Quit other instances, check free space and folder permissions, then retry. |
| `database_newer_than_app` | A newer app version wrote this data format. | Install a compatible newer release and reopen the same data folder. Do not attempt to downgrade its schema. |
| `database_history_invalid` | The migration history does not match the app's expected history. | Preserve the folder and report the code. If you have a known-good backup, seek a recovery procedure before replacing data. |
| `database_migration_failed` | A database update did not finish. | Check free space, other instances and permissions; use Retry when available. Include the migration ID if it fails again. |
| `database_validation_failed` | Stored data does not meet the required structure. | Update the app and relaunch. If it persists, report the code rather than editing database rows. |
| `database_startup_unavailable` | The database startup service did not respond or finish checking. | Retry; if it persists, fully quit and reopen the app, then report it. |

Recovery means the startup screen clears and the expected projects open. If a **Still stuck? Create an issue for help** action is available, use the review flow described [below](#report-a-bug-or-ask-the-community). These meanings follow the [startup guidance](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/database-startup-gate.tsx).

If the startup screen only offers **Quit**, exit the app, resolve the reported cause, and launch it again. Use **Retry** only when the page provides it. After recovery, reopen your expected projects and files.

![Startup guidance when the database cannot open](/img/open-science/local-acceptance/startup-database-error.webp)

### Recovery messages

| Symptom | Next action |
| --- | --- |
| Compute jobs remain queued after storage recovery | Read the affected-conversation notice, preserve the identified files, recover a valid copy and select **Recheck saved conversations**. Inspect the same job before submitting another. |
| PDF upload cancelled but the reference remains | Open the saved reference and check its attachment status; use the batch's **Retry unfinished** path where offered. |
| Collection save rejected after another client edited it | Reopen the latest collection and reconcile changes before saving again. |
| Windows update reports denied access | Read the exact file path and Windows error. Follow the notice's instruction to use the official installer as administrator. |
| Windows update reports a file in use | Close the process identified as using that installation file, then choose **Retry**, or **Cancel** to stop the update. |

Windows errors are operating-system codes, distinct from HTTP status codes. If recovery fails, include the installed version, exact message and sanitized file/job identity when you [report the problem](#report-a-bug-or-ask-the-community).

## Reset local Windows data {/* #windows-data-reset */}

Use the standalone reset utility only when you intend to discard the local installation's data and start over. **It permanently deletes the listed data and saved credentials; it neither repairs nor backs them up.** Copy needed research files and backups outside all listed directories first. Reinstalling the app alone retains this data.

1. From the [official reset guide](https://github.com/aipoch/open-science/blob/v0.33.0/scripts/windows-reset/README.md), download both `reset-open-science.cmd` and `reset-open-science.ps1` using **Download raw file**. Keep them together outside the app's data directories.
2. Quit Open-Science, including its tray process, and finish and close its agent, Notebook, headless and WSL processes. Use your normal Windows account; administrator mode is not required.
3. In Command Prompt opened in the download folder, run `reset-open-science.cmd -Preview`. Review every proposed data, configuration, profile and runtime-cache path. Preview does not delete data.
4. Only after reviewing and backing up those locations, double-click `reset-open-science.cmd`. It asks you to type `RESET OPEN SCIENCE` exactly before deletion; any other response cancels.
5. Read the final result before reopening the app. After a completed reset, choose the data location and configure providers and managed runtimes again.

If a process is running or cannot be inspected, or a path is unsafe, resolve the reported condition first. Do not bypass a refusal. If settings are corrupt or a custom data location is involved, use the official guide's explicit `-DataRoot` procedure. A deletion error can leave a partial reset, so read the error rather than assuming nothing changed. The utility does not revoke external provider accounts or remove separately installed Python/R environments.

<span id="collect-evidence-for-a-report" />

## Collect useful diagnostics

1. Record app version, OS, active Agent/model, project/session and the time of failure.
2. Copy the first relevant tool error and the operation that caused it. Include expected versus observed behavior.
3. For input problems, include a public source link, filename, size and checksum; a minimal reproducible input is more useful than an unrelated screenshot.
4. Open **Settings → General → Diagnostics** and use **Open / Reveal** for the runtime log when needed.
5. Inspect logs before sharing; omit account tokens, private source content and unrelated paths. Opening a log does not send it automatically.
6. State whether the same operation succeeds after the change. An enabled button is not the success condition.

Technical message meanings are collected in [Diagnostics reference](../reference/diagnostics.md).

### Export diagnostics for one session {/* #session-diagnostics */}

1. Open the affected session and choose **Export diagnostics…** in its header, or **Export → Export diagnostics…** in the session menu.
2. Review the available sources. **session.json** and **Session database records** concern the selected session. **main.log** and historical application logs can also contain metadata from other sessions; select them only when relevant.
3. Choose **Export**, select a local destination, and wait for **Diagnostics exported.** Use **Show in folder** to locate the archive.
4. Inspect its manifest and export log before sharing. A missing or damaged source may be summarized or omitted; the archive's existence alone does not prove every source was captured.

![Selecting session-specific diagnostic sources before a local export](/img/open-science/v0330/session-diagnostics.webp)

Ordinary metadata export excludes private content fields. If a .science export triggers the sensitive-content check, the source list can also contain redacted scanner evidence and the original flagged files. **Original sensitive files are unchecked by default; selecting one includes its original bytes in the archive.** Select only the sources needed and inspect the archive and screenshots before sharing. Export stays local and makes no upload or model request. This is diagnostic evidence, not a research backup; use a [.science package](research-packages.md) for a research handover.

## Report a bug or ask the community

| You need | Channel |
| --- | --- |
| Help choosing settings or understanding an error | [Join AIPOCH Official on Discord](https://discord.gg/zxQAYjReRv). Describe the operation, version and error so others can help. |
| A reproducible app failure tracked to resolution | Search [existing issues](https://github.com/aipoch/open-science/issues), then open a [Bug report](https://github.com/aipoch/open-science/issues/new?template=bug_report.yml). |
| A new capability or an improvement | Open a [feature request](https://github.com/aipoch/open-science/issues/new?template=feature_request.yml) and explain the research task it would support. |

### Submit a useful GitHub issue

1. Search existing issues using the error code or a distinctive phrase. If the same problem exists, add relevant reproduction details there.
2. Sign in to GitHub and open **Bug report**. Use a title such as `[Bug]: database_open_failed when reopening a project` with your actual error.
3. Fill in **What happened?**, **Steps to reproduce**, **Operating system** and **App version**. Add **Provider / model** when relevant, plus the active Agent framework.
4. Under **Relevant logs or screenshots**, include the first error and a small amount of surrounding context. Add a public or minimal sample when the problem depends on input data.
5. Review the report, then submit it. Keep the issue URL and post the result of any suggested check in the same issue. If GitHub does not offer issue creation for your account, use Discord for help finding the appropriate reporting route.

Use this checklist when preparing either an issue or a Discord question:

```text
Open-Science version and installation method:
Operating system and architecture:
Agent framework / provider / model (if relevant):
Page and action:
Steps to reproduce:
Expected result:
Actual result:
Exact error code and full message:
Time of failure and time zone:
Public/minimal input (if needed):
Checks already tried and their results:
Relevant log excerpt or screenshot:
```

For a remote failure, also include execution mode, the app job ID, scheduler job ID when present, exit code and the relevant stdout/stderr. Use a neutral alias for a private host. Do not attach passwords, tokens, SSH private keys, patient data or an entire private research folder; replace sensitive details in a minimal example.

<span id="report-directly-from-a-startup-error" />

### Prepare a report from an error

Select **Report this error** beside a conversation error. A startup screen can also offer **Still stuck? Create an issue for help**.

1. Read **Error details** and remove private paths, identifiers or sensitive input before sharing.
2. Check **Also included** for the application version, operating system, Agent framework, provider/model and runtime versions.
3. Use **Copy details** to copy the edited text and environment information. **Reveal log file** locates the local runtime log; it is not attached automatically and needs a separate review before sharing.
4. Check the public-sharing acknowledgment to enable **Open GitHub issue**. Editing the error text requires reviewing and acknowledging the revised content again.
5. Open the GitHub form, inspect the prefilled fields, add useful reproduction steps, then submit when ready. Opening the report preview alone does not submit an issue.

![Editable error details and the public-sharing confirmation](/img/open-science/sept11-completion/report-preview.webp)

## Common questions

**Do I need a model account for every operation?** No. Local browsing, organization and many settings can work without a model. Agent responses, analysis planning and model-generated reviews need compatible model access.

**Does local storage mean all processing stays on the device?** No. Selected prompts, files or retrieved content may be sent to the configured model/service when used. Local files and model execution location are separate questions.

**Can I work offline?** Existing local files and available local views can remain usable. Hosted models, online databases and missing-package downloads need their respective connections. A remote/local endpoint also needs its own running service.

**Is Usage a bill or subscription balance?** No. It reports available telemetry. Missing usage is not zero; the service's billing/limits remain separate.

**Does restoring an archive rerun the work?** No. It restores navigation to retained work. A live kernel or failed operation may still require explicit restart/rerun.

**Does a successful SSH test mean my analysis can run?** No. Check the selected execution mode, scheduler permissions, runtime and resource request, then run a small job and inspect its output. See [Remote compute](remote-compute.md).

Sources: [HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html#section-15), [429 and Retry-After](https://www.rfc-editor.org/rfc/rfc6585.html#section-4), [OpenAI rate-limit versus quota errors](https://developers.openai.com/api/docs/guides/error-codes), [Connector retry policy](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/request-policy.ts).

Sources: [queue recovery notice](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/components/SessionCatalogRecoveryAlert.tsx), [PDF batch handling](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [collection conflict](https://github.com/aipoch/open-science/commit/dbb9560a), [Windows installer](https://github.com/aipoch/open-science/blob/v0.27.0/build/installer.nsh).

Source: [bug report fields](https://github.com/aipoch/open-science/blob/v0.26.0/.github/ISSUE_TEMPLATE/bug_report.yml), [startup report dialog](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/startup-issue-dialog.tsx).
