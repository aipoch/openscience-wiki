---
title: "Network, proxies, and package mirrors"
last_update:
  date: '2026-09-20'
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
| One research hostname is denied | **Configure domains** and the exact hostname in the request | Adding a broad unrelated domain will fix it |
| A package host is already allowed but CONNECT fails | Installer log, proxy and DNS resolution | Another identical Allow click will resolve all network failures |
| Certificate verification fails | The configured CA bundle and the organization's trust requirements | Disabling certificate verification is necessary |
| Package index returns no matching distribution after connection errors | Earlier network messages and selected Python/platform | The package must not exist |

## Configure Notebook domains

1. Select **Configure domains**.
2. Read whether Notebook network protection is active on this device.
3. Expand the scientific-service groups to inspect their hostnames. Group switches control included destinations. The package-registry/source-code group is enabled and locked in this build.
4. For an additional source, enter its exact hostname in **Domain hostname**, then select **Add**.
5. Review the new draft row. Use **Remove [hostname]** to undo it.
6. Select **Save changes** to persist the intended list.

![Exact-hostname validation rejects a wildcard](/img/open-science/walkthrough-2026-09-08/54-network-domain-validation.webp)

Enter a hostname such as `data.example.org`, with no scheme, path, port, wildcard or IP address. For **Enter a hostname only, without a scheme, path, port, or wildcard.**, remove those parts and save the hostname.

A domain allowed by name can still fail another connection check. For example, `pypi.org` can be allowed but rejected as a non-public destination if it resolves to `198.18.*`. This is distinct from an unapproved domain.

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

### When a domain resolves to a non-public address {/* #observed-fake-ip-failure */}

If installation reports `destination resolves to a non-public network address`, inspect the detailed installer log even when the short error only says `conda install failed` or `pip install failed`.

```text
deny network-outbound pypi.org:443
(destination resolves to a non-public network address)
```

1. Check the affected hostname and its resolved address. Addresses such as `198.18.*` are not public destinations.
2. Distinguish a domain-list decision from the destination check. `alreadyAllowed` does not establish that the resolved address is acceptable.
3. Check public DNS resolution and the intended proxy route with the network owner, then retry the original small request. Keep domain protection enabled.
4. Verify installation and import separately. A saved proxy, Ready interpreter or successful use of existing packages is insufficient.

If the same error persists, keep the hostname, resolved address and proxy mode with the installer log and follow [Troubleshooting](troubleshooting.md). A successful settings save is not a successful download.


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

Configured Conda, PyPI and CRAN mirror hostnames receive temporary access for the package-management operation. This does not add them to the permanent Notebook domain list or grant ordinary Notebook code the same access. Redirects to other hosts still follow the network approval flow.

Use a supported HTTP(S) mirror URL without embedded credentials, whitespace, localhost or a raw IP address. An accepted mirror setting does not fix an unavailable server or a hostname resolving to a reserved address. If installation fails, inspect that operation’s actual destination and error before retrying. Remote **model** endpoints have a separate [HTTPS requirement](providers.md#custom-gateway-every-visible-field).

## Information to keep when a request fails

Record the app version, operation, runtime/environment, package or hostname, proxy mode and first useful error. Preserve the original installer output: the final “No matching distribution” line can conceal earlier connectivity failures. Exclude tokens and proxy credentials from shared diagnostics.

For a missing Python module after a successful connection, continue with [runtime and package checks](./runtimes.md). Remote host setup is covered separately in [Compute](remote-compute.md).

[Network settings source](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Notebook network boundary](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/network-sandbox-owner.ts).

## HTTP error lookup

For 400, 401, 403, 404, 429 or 5xx responses, use the [HTTP troubleshooting table](troubleshooting.md#http-errors-400-403-429-and-5xx). Keep the responding service and its detailed message with the status code.

After changing proxy, mirror or Notebook domain settings, confirm the values persisted, then retry the original operation in the same runtime. Check both the download and package import; a successful settings save alone does not resolve an installation error.

## An R cell was blocked before execution {/* #r-network-warning */}

In v0.31.1, Notebook shows an inline warning when network protection blocks an R run. Follow its setting link and inspect the requested access. The warning means the cell did not execute; it is not a scientific result or a completed run. After resolving the specific requirement, run the cell again and inspect its output. Windows standard-mode R support does not itself enable network protection.
