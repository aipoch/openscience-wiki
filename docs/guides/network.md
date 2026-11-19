---
title: "Network, proxies, and package mirrors"
last_update:
  date: '2026-11-19'
---

# Network, proxies, and package mirrors

Open **Settings → Network** when a model, Notebook request or package download cannot reach its destination. This page separates connection status, Notebook allowed domains, a process proxy and package mirrors. A green connection check does not prove that every protected Notebook request will succeed.

Start with the failing operation: a provider request, Notebook network access and a package installer can use different routes. Keep its hostname and exact error available while changing these settings.

## Read Network status first

The status combines network-link information and a package-registry probe. **READY · Package registries are reachable** indicates that probe succeeded. **Checking**, unreachable or offline states indicate that another check or connection repair is needed. Use **Check again** when available after changing the connection.

If Network reports **Ready** but a tool fails, expand that tool's error. The status probe checks its own destination; use the failed request's hostname and message to diagnose the affected route.

| Failure | Inspect next | Avoid this mistaken conclusion |
| --- | --- | --- |
| Provider login fails | Provider authentication and the model connection check | Notebook domain settings will supply model credentials |
| One research hostname is denied | **Manage access** and the exact hostname in the request | Adding a broad unrelated domain will fix it |
| A package host is already allowed but CONNECT fails | Installer log, proxy and DNS resolution | Another identical Allow click will resolve all network failures |
| Certificate verification fails | The configured CA bundle and the organization's trust requirements | Disabling certificate verification is necessary |
| Package index returns no matching distribution after connection errors | Earlier network messages and selected Python/platform | The package must not exist |

<span id="configure-notebook-domains" />

## Choose Relaxed or Strict networking {/* #public-network-rules */}

Open **Settings → Network → Manage access**. The mode applies to protected Notebook connections across projects. Read **Current: Relaxed** or **Current: Strict** before editing rules.

| Mode | Allowed connections | When a destination is not allowed |
| --- | --- | --- |
| **Relaxed** (default) | HTTPS hostnames, including hostnames for private or loopback services; saved exceptions match their protocol, host/IP and port | HTTP and direct IP connections require authorization |
| **Strict** | Only destinations matching the manual whitelist by protocol, hostname or IP, and port | Blocked without an authorization request; add a needed rule manually |

To change modes, select **Strict** or **Relaxed**, read the explanation, then use **Switch to Strict mode** or **Switch to Relaxed mode**. Selecting an option marked **Not yet applied** does not change the active mode.

![Strict mode explanation and whitelist groups](/img/open-science/v130/network-strict.webp)

### Add a Strict whitelist rule {/* #strict-whitelist */}

1. In **Strict whitelist**, select **Add rule**.
2. Set **Network protocol**, **Hostname, IP or pattern**, and **Port** for the actual service. Use a hostname or IP, not a URL path.
3. Choose a **Group**, or **New group…** and a **Group name**, then choose **Confirm**.
4. Inspect the saved rule and the active mode. Retry the intended small request and inspect the response.

![Example of the protocol, host and port fields for a Strict rule](/img/open-science/v130/network-rule.webp)

An exact hostname does not include subdomains. `*.example.org` matches subdomains but not `example.org`. Protocol and port are part of the rule: an HTTPS rule for port 443 does not grant HTTP or another port. Strict matches the requested hostname; it does not check whether its DNS result is public, private or loopback. Add a rule only for a destination you intend the code to contact.

**Built-in** and **Manual** identify rule provenance. Built-in groups are seeded once, so later edits are retained. Neither remembered approvals nor Full access bypass Strict mode. Saving network rules resets protected connections and can interrupt transfers; apply changes after active transfers finish.

## Save a Relaxed-mode exception {/* #trusted-private-services */}

Under **Trusted unsafe networks**, choose **Add address**, then specify **Network protocol**, **Hostname** or IP, **Port** and the appropriate group. Confirm and check the saved scope before retrying. These exceptions avoid repeated authorization for the matching destination in Relaxed mode; they do not grant access in Strict mode. The Strict whitelist is inactive while Relaxed is selected.

The rule permits a connection, not a successful login or a valid response. Check service credentials and the actual result separately. These settings replace the older public-domain/private-service forms; use the current mode and rule fields when following an older screenshot.

## Choose a proxy mode

Select **Configure proxy**. Use a proxy address supplied by your own network configuration; the port in a screenshot is specific to that computer.

| Mode | Behavior | Required input |
| --- | --- | --- |
| **System** | App requests follow the device proxy; agent processes inherit proxy environment from app startup | No explicit server field |
| **Manual** | Give new app requests and processes a fixed proxy | **Proxy server** URL |
| **Direct** | Connect without the configured/inherited proxy for new processes | No server field |

Manual mode accepts HTTP, HTTPS, SOCKS, SOCKS4 and SOCKS5 URLs. Embedded credentials in the URL are not supported. **Bypass rules** is an optional comma-separated list of hosts that should connect directly; localhost is always bypassed.

1. Choose **Manual**.
2. Fill **Proxy server** with the working proxy address used by your network.
3. Add bypass rules only if the relevant destinations should connect directly.
4. Select **Save** and wait for **Proxy settings saved.**
5. Start a new request/process and test the original failing operation. Existing agent sessions, kernels and installers can keep their existing connections.

If Manual mode reports **Enter a proxy server URL**, enter a working proxy address or discard the draft with **Done**. Saving a valid address does not itself confirm that the proxy can carry the failing request.

### Check a DNS or proxy failure {/* #observed-fake-ip-failure */}

Keep the exact error from the failing request. A timeout, certificate error or proxy refusal can still occur after a rule permits the destination. Check the hostname, protocol, port and proxy route against the service you intend to use. Do not treat an older version's non-public-address error as the current Strict-mode matching rule: Strict checks the requested name/IP and port, not its DNS address class.

Retry a small request after correcting the cause. For package work, confirm both installation and import; a saved setting or Ready interpreter alone does not prove a download succeeded. Keep credentials out of shared logs and use [Troubleshooting](troubleshooting.md) for persistent failures.

## Configure package mirrors and certificate trust

Select **Configure** or **Edit** under Package mirror.

| Field | Input and effect |
| --- | --- |
| **Conda channel mirror** | Mirror root used for Conda channel downloads |
| **Python package index (pip)** | A Python package index URL, typically ending in `/simple` |
| **CA bundle path** | Path to a complete PEM trust bundle including required public and corporate roots; blank uses public certificate authorities |
| **View available mirrors** | Open external mirror documentation |
| **Save** | Store the configuration for subsequent package operations |
| **Cancel** | Discard the draft |

![Package mirror and CA-bundle inputs](/img/open-science/walkthrough-2026-09-08/56-package-mirror.webp)

A package mirror changes the package source. Confirm the mirror's required root/index format, save, and retry a small package operation in the selected runtime. Model-provider proxy settings are separate.

Configured Conda, PyPI and CRAN mirror hostnames receive temporary access for the package-management operation. This does not add them to the permanent Notebook domain list or grant ordinary Notebook code the same access. Redirects need access to their actual destinations. In Strict mode, add every required protocol/host/port to the whitelist; a temporary package-operation grant does not bypass it.

Use a supported HTTP(S) mirror URL without embedded credentials, whitespace, localhost or a raw IP address. An accepted mirror setting does not fix an unavailable server or a hostname resolving to a reserved address. If installation fails, inspect that operation’s actual destination and error before retrying. Remote **model** endpoints have a separate [HTTPS requirement](providers.md#custom-gateway-every-visible-field).

## Information to keep when a request fails

Record the app version, operation, runtime/environment, package or hostname, proxy mode and first useful error. Preserve the original installer output: the final “No matching distribution” line can conceal earlier connectivity failures. Exclude tokens and proxy credentials from shared diagnostics.

For a missing Python module after a successful connection, continue with [runtime and package checks](./runtimes.md). Remote host setup is covered separately in [Compute](remote-compute.md).

[Network settings source](https://github.com/aipoch/open-science/blob/v1.3.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Notebook network boundary](https://github.com/aipoch/open-science/blob/v1.3.0/src/main/notebook/network-sandbox-owner.ts).

## HTTP error lookup

For 400, 401, 403, 404, 429 or 5xx responses, use the [HTTP troubleshooting table](troubleshooting.md#http-errors-400-403-429-and-5xx). Keep the responding service and its detailed message with the status code.

After changing proxy, mirror or Notebook domain settings, confirm the values persisted, then retry the original operation in the same runtime. Check both the download and package import; a successful settings save alone does not resolve an installation error.

## An R cell was blocked before execution {/* #r-network-warning */}

In v0.31.1, Notebook shows an inline warning when network protection blocks an R run. Follow its setting link and inspect the requested access. The warning means the cell did not execute; it is not a scientific result or a completed run. After resolving the specific requirement, run the cell again and inspect its output. Windows standard-mode R support does not itself enable network protection.

## Network access when the approval mode changes {/* #network-mode-changes */}

**Full access** removes applicable manual Agent permission cards, but does not bypass the Strict Notebook whitelist. Check **Settings → Network → Manage access** when a request is denied. In Relaxed mode, the protocol and destination determine whether authorization or a saved exception is needed. Provider credentials and service restrictions still apply.

Changing network rules can close existing protected connections. Retry under the resulting mode, then inspect the actual response. See [approval modes](approval-modes.md) for conversation permissions.
