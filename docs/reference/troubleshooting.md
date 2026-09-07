---
sidebar_position: 5
title: Troubleshooting
last_update:
  date: '2026-08-13'
---

# Troubleshooting

## Agent does not start or the session stops progressing

1. In Settings → Agent, confirm that the Active runtime is Ready and inspect its version and Install log.
2. Use `Repair` if needed. Switch to another runtime before uninstalling the current one.
3. In Settings → Model, run `Test connection` for the active Provider.
4. Check whether the session is `Waiting for permission`, waiting for Plan approval, or waiting for elicitation.
5. If the network works but the Provider does not, inspect the proxy, VPN, firewall, Base URL, and API format.

## Provider test fails

- Confirm that the API key belongs to the configured endpoint and region.
- Match a custom Base URL to the correct API format; Chat Completions and Responses are not interchangeable.
- Confirm that the Model ID exists and that the account may access it.
- A local mock or self-signed service needs the correct CA. Do not make disabled TLS verification a permanent workaround.
- Context window, Images, and Reasoning declarations do not fix authentication errors.

## Python/R or package installation fails

- In Runtimes, check that the environment is Enabled and its executable still exists.
- If app-managed setup is incomplete, use Retry or Repair.
- Enable `Allow package install` before writing to a user environment.
- Check Network → Package mirror and the CA bundle.
- Restart the kernel after installation. Do not mix the interface package manager with pip or `install.packages()` inside the Notebook.
- If disk space is low, inspect Storage → Disk usage first.

## File does not open in Preview

- Confirm that the upload finished and that its extension or MIME type is correct.
- Try both modal Preview and split view. Download remains available if rendering fails.
- A large or unknown binary file may offer only the fallback view.
- If the Office or PDF renderer fails, close and reopen Preview. If it still fails, download the file and use its native application.
- If Composer rejects an image, switch to a model that supports Images and attach it again.

## Permission request keeps waiting

- Check whether the Permission panel at the bottom is hidden by the window height; drag Resize if necessary.
- Respond to all pending requests from the main agent and subagents.
- Choose Allow once or Deny. Closing the surface does not answer the agent.
- If a grant should exist, use Settings → Permissions to check whether its scope covers a different project or session only.

## Remote control is unreachable

- Keep the desktop application running.
- Copy the current URL from the panel again; an old token or address may have expired.
- If the URL works locally but not on another device, check the local network, firewall, and Remote.It state.
- For a new browser, compare the six-digit code under Pairing requests and approve it.
- A revoked browser must pair again.

## Storage migration reports an error

- Do not continue moving a partial directory manually.
- Keep the source and target disks connected, then choose Retry, Restart, or Discard as offered by the dialog.
- Before Adopt, confirm that the target is a complete Open Science data root.
- An unwritable Application storage directory and a Data location failure are separate problems; fix each in its own panel.

## Collect evidence for a report

Record the application version, operating system, active model and framework, failed session, exact time, error text, and related screenshots. Before filing a public issue, remove API keys, access tokens, absolute paths containing user names, and sensitive research data. Repository: [aipoch/open-science](https://github.com/aipoch/open-science/issues).
