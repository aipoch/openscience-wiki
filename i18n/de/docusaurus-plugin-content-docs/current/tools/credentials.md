---
title: "Dienstanmeldeinformationen"
last_update:
  date: '2026-09-20'
---

# Dienstanmeldeinformationen {/* #service-credentials */}

Konfigurieren Sie die Anmeldeinformationen in **Settings → Credentials** für den Dienst, der die Anforderung tatsächlich ausführt. Ein funktionierendes Codex-Abonnement bietet Modellzugriff; Es liefert kein OpenAlex, GitHub oder ein benutzerdefiniertes MCP-Konto.

## Eingebaute Service-Einträge {/* #built-in-service-entries */}

| Dienstleistungen | Felder und Zweck | Wie zu überprüfen |
| --- | --- | --- |
| GitHub | Persönliches Zugriffs-Token für Skill Discovery/Importe | Verwenden Sie Connect/Manage und die Token-Steuerelemente; Testen Sie dann die beabsichtigte Repository-Operation. |
| Literaturzugriff | Kontakt-E-Mail und optionaler NCBI API Schlüssel | Speichern von Kontaktinformationen; NCBI-Schlüssel ist optional für unterstützte Anfragen. |
| OpenAlex | API-Schlüssel für OpenAlex-Operationen in Literatur | Validieren Sie den eingegebenen Schlüssel, speichern Sie ihn und erstellen Sie eine begrenzte Abfrage. |
| Unpaywall | Kontakt-E-Mail für Volltext-Standortsuche | Verwendet die konfigurierte Literatur-Kontakt-E-Mail; Keine erfundene Adresse. |

**Connect** öffnet einen unkonfigurierten Dienst; **Manage** öffnet eine bestehende. **Desktop only** bedeutet, dass die Anmeldeinformationen den Desktop-Kontext benötigen. Ein gespeicherter Schlüsselindikator ist nicht der geheime Wert selbst.

## Hinzufügen eines fehlenden OpenAlex-Schlüssels {/* #openalexs-actual-missing-key-flow */}

1. Fordern Sie eine OpenAlex-Suche an, während kein Schlüssel konfiguriert ist.
2. Die Konversation zeigt **Add your OpenAlex API key** mit einem **API key**-Feld an.
3. **Save key** speichert den eingegebenen Schlüssel und nimmt den Warteruf bei Erfolg wieder auf. **Not now** lässt das Credential unkonfiguriert.
4. Lesen Sie den endgültigen Werkzeugstatus. Die Wahl von **Not now** kann **credential_required** zurückgeben; Konfigurieren Sie den Schlüssel vor dem erneuten Versuch.

![OpenAlex Credential Request in der englischen App](/img/open-science/capabilities-walkthrough/25-openalex-credential-request.webp)

Die Eingabeaufforderung besagt, dass der Schlüssel auf diesem Computer verschlüsselt ist und nur an `api.openalex.org` gesendet wird. In den Einstellungen bietet das OpenAlex-Formular auch **Validate**, **Save**, **Remove key**, wenn eines vorhanden ist, und **Cancel**. Ein Ersatzfeld zeigt den gespeicherten Schlüssel nicht an. Secure-Storage-Fehler erfordern das Auflösen des Schlüsselbundzustands des Systems, bevor Geheimnisse gespeichert werden.

## Credentials für Custom Connectors {/* #credentials-for-custom-connectors */}

Erstellen Sie hier den Berechtigungsnachweis und wählen Sie dann seinen Namen im [Konnektor-Konfiguration](../guides/connectors.md) aus. Inspizieren Sie die Verbraucher, bevor Sie einen gemeinsamen Nachweis ändern oder entfernen.

### Neue Anmeldeinformation {/* #new-credential */}

| Feld oder Button | Vorgang |
| --- | --- |
| Name | Geben Sie dem Credential ein erkennbares lokales Label. |
| Typ | Wählen Sie **API key**, **Access token**, oder **OAuth**. |
| Wert | Geben Sie ein Geheimnis in das maskierte Feld für einen Schlüssel/Token ein. Leere erforderliche Felder halten Save deaktiviert. |
| OAuth Ressourcen URL | Geben Sie den genauen Ressourcenendpunkt an. Connector Matching hängt von Ressourcen-URL, Transport und Registrierung ab. |
| Fortgeschrittener Verkehr | Wählen Sie den vom OAuth-Service benötigten Transport aus; Streamable HTTP war der inspizierte Standard. |
| Scopes | Geben Sie Bereiche ein, die durch Leerzeichen oder Kommas getrennt sind. |
| Verwenden Sie einen vorregistrierten Client | Anzeigen **Authorization server URL**, **Client ID**, **Callback URL**, und **Client secret**. |
| Callback URL / Copy | Der inspizierte Ausfall war `http://127.0.0.1/oauth/callback`; Kopieren Sie es für die Serviceregistrierung oder erweitern Sie die Option "Custom-Callback". |
| Entdeckung | Falls zutreffend, Server-Metadaten entdecken; Dies ist keine erfolgreiche Anmeldung an sich. |
| Stornieren / Speichern | Verwerfen Sie den Entwurf oder speichern Sie eine gültige Anmeldekonfiguration. |

![OAuth erweiterte Registrierungsfelder](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

Binden Sie in einem benutzerdefinierten Connector den Berechtigungsnachweis an einen Header, eine Umgebungsvariable oder einen OAuth-Selektor. Der Name ist die Referenz; Platzieren Sie keine geheimen Werte in Beschreibungen oder Projektanweisungen. Exportierte tragbare Konfigurationen ersetzen Geheimnisse durch Platzhalter. Ein gespeicherter Nachweis benötigt noch einen tatsächlichen Service / Connector-Test, um festzustellen, dass er funktioniert.

## Verifizieren und Troubleshoot {/* #verify-and-troubleshoot */}

Wiederholen Sie nach dem Speichern eine kleine Operation und überprüfen Sie ihre Antwort. Verwenden Sie `credential_required` für ein fehlendes konfiguriertes Geheimnis, 401 für einen Authentifizierungsfehler und 403 für den verweigerten Zugriff / die zu untersuchende Richtlinie; Ein 403 ist nicht universell durch Austausch des Schlüssels festgelegt. 429 betrifft Tarif-/Nutzungsgrenzen. Lesen Sie den tatsächlichen Körper des Dienstes und sehen Sie [Fehlerbehebung](../guides/troubleshooting.md).

Das Entfernen eines Berechtigungsnachweises kann sich auf jeden Connector auswirken, der daran gebunden ist. Connector und Specialist-Exporte schließen bewusst gebrauchsfertige Geheimnisse/Vertrauen aus; diese wieder an der Aufnahmevorrichtung zu konfigurieren. Fügen Sie niemals ein Geheimnis in einen Skill-, Eingabeaufforderungs-, Screenshot- oder Ausgabebericht ein.

OpenAlex Abfragen erfordern einen gültigen OpenAlex Schlüssel. OAuth Connectors erfordern das Ausfüllen der Anmeldung des benannten Dienstes. Beheben Sie den angezeigten Authentifizierungsfehler, bevor Sie dieselbe kleine Abfrage erneut versuchen.

Bezugsnummer der Durchführung: [CredentialsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx).

[CLI/SDK Berechtigungsnachweismanagement](../reference/cli.md#manage-connectors-and-credentials) kann freigegebene Anmeldeinformationen durch authentifizierten lokalen Zugriff erstellen / aktualisieren. Linux Headless-Installationen können explizit [unverschlüsselte Dateispeicherung](../reference/server.md#credential-storage-on-headless-linux) wählen; Desktop-Anmeldeinformationen behalten ihr normales OS-Speicherverhalten bei. Diese Option löst keine Compute-Passwortspeicherung oder initiiert die erstmalige OAuth-Anmeldung.

## Öffnen Sie die offizielle API Key Page {/* #official-api-key-page */}

Von v0.31.0 aus enthalten OpenAlex und NCBI-Anmeldeinformationen einen Link zur offiziellen API-Schlüsselseite. Das Öffnen behält den Formularentwurf und wartet auf den Connector-Aufruf. Schließen Sie die Kontoschritte mit dem Dienst ab, kehren Sie zum Anmeldeformular zurück, validieren und speichern Sie dann den beabsichtigten Schlüssel, bevor Sie die Abfrage erneut versuchen. Das Öffnen der Schlüsselseite allein speichert weder einen Schlüssel noch vervollständigt die wartende Abfrage.
