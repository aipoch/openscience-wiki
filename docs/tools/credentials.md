---
title: "Service credentials"
last_update:
  date: '2026-09-20'
---

# Service credentials

Configure credentials in **Settings → Credentials** for the service actually making the request. A working Codex subscription supplies model access; it does not supply OpenAlex, GitHub or a custom MCP account.

## Built-in service entries

| Service | Fields and purpose | How to check |
| --- | --- | --- |
| GitHub | Personal access token for Skill discovery/imports | Use Connect/Manage and the token controls; then test the intended repository operation. |
| Literature access | Contact email and optional NCBI API key | Save contact information; NCBI key is optional for supported requests. |
| OpenAlex | API key for OpenAlex operations in Literature | Validate the entered key, save it and make a bounded query. |
| Unpaywall | Contact email for full-text location searches | Uses the configured literature contact email; no invented address. |

**Connect** opens an unconfigured service; **Manage** opens an existing one. **Desktop only** means that credential operation needs the desktop context. A stored-key indicator is not the secret value itself.

## Add a missing OpenAlex key {/* #openalexs-actual-missing-key-flow */}

1. Request an OpenAlex search while no key is configured.
2. The conversation displays **Add your OpenAlex API key** with an **API key** field.
3. **Save key** stores the entered key and resumes the waiting call when successful. **Not now** leaves the credential unconfigured.
4. Read the final tool status. Choosing **Not now** can return **credential_required**; configure the key before retrying.

![OpenAlex credential request in the English app](/img/open-science/capabilities-walkthrough/25-openalex-credential-request.webp)

The prompt states that the key is encrypted on this computer and sent only to `api.openalex.org`. In Settings, the OpenAlex form also offers **Validate**, **Save**, **Remove key** when one exists, and **Cancel**. A replacement field does not reveal the stored key. Secure-storage errors require resolving the system keychain state before saving secrets.

## Credentials for custom Connectors

Create the credential here, then select its name in the [Connector configuration](../guides/connectors.md). Inspect the consumers before changing or removing a shared credential.

### New credential

| Field or button | Operation |
| --- | --- |
| Name | Give the credential a recognizable local label. |
| Type | Choose **API key**, **Access token**, or **OAuth**. |
| Value | Enter a secret in the masked field for a key/token. Empty required fields keep Save disabled. |
| OAuth → Resource URL | Supply the exact resource endpoint. Connector matching depends on resource URL, transport, and registration. |
| Advanced → Transport | Choose the transport required by the OAuth service; Streamable HTTP was the inspected default. |
| Scopes | Enter scopes separated by spaces or commas. |
| Use a pre-registered client | Reveal **Authorization server URL**, **Client ID**, **Callback URL**, and **Client secret**. |
| Callback URL / Copy | The inspected default was `http://127.0.0.1/oauth/callback`; copy it for service registration or expand the custom-callback option. |
| Discovery | When applicable, discover server metadata; this is not a successful sign-in by itself. |
| Cancel / Save | Discard the draft or store a valid credential configuration. |

![OAuth advanced registration fields](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

In a custom Connector, bind the credential to a header, environment variable, or OAuth selector. The name is the reference; do not place secret values in descriptions or project instructions. Exported portable configurations replace secrets with placeholders. A saved credential still needs an actual service/Connector test to establish that it works.

## Verify and troubleshoot

After saving, repeat one small operation and inspect its response. Use `credential_required` for a missing configured secret, 401 for an authentication failure to investigate, and 403 for denied access/policy to investigate; a 403 is not universally fixed by replacing the key. 429 concerns rate/usage limits. Read the service's actual body and see [Troubleshooting](../guides/troubleshooting.md).

Removing a credential can affect every Connector bound to it. Connector and Specialist exports deliberately exclude ready-to-use secrets/trust; configure them again on the receiving device. Never paste a secret into a Skill, prompt, screenshot or issue report.

OpenAlex queries require a valid OpenAlex key. OAuth Connectors require completing the named service's sign-in. Resolve the displayed authentication error before retrying the same small query.

Implementation reference: [CredentialsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx).

[CLI/SDK credential management](../reference/cli.md#manage-connectors-and-credentials) can create/update shared credentials through authenticated local access. Linux headless installations can explicitly choose [unencrypted file storage](../reference/server.md#credential-storage-on-headless-linux); desktop credentials retain their normal OS-storage behavior. This option does not solve Compute password storage or initiate first-time OAuth login.

## Open the official API key page {/* #official-api-key-page */}

From v0.31.0, OpenAlex and NCBI credential prompts include a link to the official API key page. Opening it keeps the form draft and waiting Connector call. Complete account steps with the service, return to the credential form, then validate and save the intended key before retrying the query. Opening the key page alone neither saves a key nor completes the waiting query.
