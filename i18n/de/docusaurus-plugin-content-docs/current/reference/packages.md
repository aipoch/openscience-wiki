---
title: "Skill, Specialist und MCP Formate"
last_update:
  date: '2026-09-08'
---

# Skill, Specialist und MCP Formate {/* #skill-specialist-and-mcp-formats */}

Skills, Spezialisten und Connector-Vorlagen haben unterschiedliche Paketgrenzen. Diese Referenz listet ihre Felder und Importbudgets auf. Überprüfen Sie die Archivvorschau vor dem Import und überprüfen Sie dann das Installationsergebnis.

## Skill Dokument und Ressourcen {/* #skill-document-and-resources */}

Eine Skill-Wurzel enthält `SKILL.md`; Referenzen und Skripte leben unterhalb der gleichen Paketwurzel. Sein Metadatenblock ist YAML gefolgt von Markdown-Anweisungen.

<p className="example-label"><strong>Beispiel</strong> Ein minimales SKILL.md Dokument</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

Der Parser trennt `name` und `description` von anderen Metadaten, normalisiert Zeilenenden und hält skalare Metadatenwerte als Zeichenfolgen. Überprüfen Sie das Ergebnis der Import-/Editorvalidierung, bevor Sie das Paket veröffentlichen.

| Packungselement | Verwendung | Grenze |
| --- | --- | --- |
| `name` | Stabile Invocation-Identität | Halten Sie es konsistent mit Verweisen auf das Paket |
| `description` | Wenn der Agent den Skill auswählen sollte | Nichts von selbst ausführen |
| Markdown-Körper | Anweisungen, die beim Aufruf geladen werden | Eine unterstützte Anweisung ist kein Beweis dafür, dass ihre externe Abhängigkeit existiert |
| Relative Ressourcen | Skripte, Vorlagen, Referenzen und Daten | Behalten Sie referenzierte Pfade innerhalb der Paketstruktur |
| `.source.json`, `.specialist-package.json` an der Wurzel | App-eigene Metadaten | Ausgenommen vom benutzerautorisierten Paketbudget; Erfinden oder Wiederverwenden dieser Dateien nicht |

### Skill Importbudgets {/* #skill-import-budgets */}

| Limit | Wert |
| --- | ---: |
| Dateien in einem Skill | 16,384 |
| Einzelne dekomprimierte Datei | 50 MiB |
| Insgesamt dekomprimiert Skill | 128 MiB |
| Aggregierte rohe SKILL.md-Inhalte in einer Vorschau-Antwort | 4 MiB |
| Verzeichnisverschachtelung | 8-Werte |
| GitHub-Anträge pro Import | 512 |
| Verschachteltes komprimiertes Skill-Archiv | 64 MiB |
| Outer Uploaded Bundle | 256 MiB |
| Skills pro Bündel | 256 |
| Äußere Bündeleinträge | 32,768 |

Budgets gelten auf unterschiedlichen Ebenen. Ein Bündel unterhalb seiner äußeren Grenze kann immer noch ein Skill enthalten, das eine innere Grenze überschreitet. Überprüfung der Diagnosen jedes Kandidaten; interpretieren Sie den Teilimport nicht als jeden erfolgreichen Kandidaten. Personal-Editor-Referenzdatei zählt reservieren Sie einen Paketeintrag für SKILL.md.

[Skill Parser](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts), [Geteilte Einfuhrbeschränkungen](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts).

## Specialist Paket {/* #specialist-package */}

Ein tragbares Specialist-Paket enthält `manifest.json` und `specialist.json`. Gebündelte Skill-Ressourcen verwenden `skills/<skill-name>/<file>`, wobei `SKILL.md` in jeder Skill-Root enthalten ist. Der Frontmattername muss mit diesem Verzeichnisnamen übereinstimmen.

| Datei/Feld | Vertrag |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | Identität des Pakets; Beitrags-IDs verwenden Kleinbuchstaben / Ziffern / Bindestriche und vermeiden Sie reservierte `os-` / `mcp-` Präfixe |
| `version` | Semantische Version |
| `exported_with_app_version` | Version des Exportantrags |
| `specialist.json → name` | Stabler Specialist Profilname |
| `display_name` | Fakultative Bezeichnung der Aufmachung |
| `description` | Rollenbeschreibung |
| `system_prompt` | Specialist-Anweisungen; snake_case an der Paketgrenze |
| `skill_ids` | Array von nicht leeren Skill-Namen ohne Duplikate |
| `connector_ids` | Array von nicht leeren Connector-Namen ohne Duplikate |

Unbekannte oder verbotene Felder werden abgelehnt. In-Memory-Nutzlasten verwenden camelCase (`systemPrompt`, `skillIds`, `connectorIds`), was nicht mit der tragbaren JSON-Feldschreibweise verwechselt werden darf. Portable Connector-Namen können beim Import in maschinenlokale IDs aufgelöst werden; Paketreferenzen tragen keine Maschinenanmeldeinformationen.

| Specialist Archivlimit | Wert |
| --- | ---: |
| Komprimierte Größe | 50 MiB |
| Unkomprimierte Größe | 200 MiB |
| Dateizähler | 2,000 |
| Individuelle Datei | 25 MiB |
| Verdichtungsverhältnis | 1,000 |
| Bahntiefe | 32 |

Die Importvorschau meldet Diagnosen, ob sie installierbar sind und jede Skill-Disposition: installieren, wiederverwenden, Konflikt oder ersetzen. Ein Overwrite erfordert eine explizite Bestätigung. Ein veralteter oder abgelaufener Kandidat muss erneut in der Vorschau angezeigt werden; Nicht blind wiederholen ihr Token. Skill-Konflikte erfordern eine explizite installierte / eingehende Auswahl.

Export verwendet eine erwartete Revision und ausgewählte enthaltene Skills. Löschen verwendet auch eine Vorschau / Überarbeitung und schützt integrierte, Main-fähige, geteilte oder referenzierte Skills. Das Entfernen eines Specialist entspricht nicht dem Löschen jedes Skill, auf das es zugreifen kann.

[Pakettypen und Archivbudgets](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts), [Paketvalidierung](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts).

## Connector Template und MCP Client Export {/* #connector-template-and-mcp-client-export */}

Eine Open-Science Connector Vorlage ist nicht dasselbe JSON Dokument wie die `mcpServers` Konfiguration eines MCP Clients.

| Meldefeld | Vertrag |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | Stabile benutzerdefinierte Bezeichnung, bis 64 Zeichen, Kleinbuchstaben/Ziffern/Bindestriche; eindeutig und kein eingebauter reservierter Name |
| `display_name` | Menschenlesbares Etikett |
| `description` | Fakultative Erläuterung |
| `transport` | `stdio`, `streamable_http`, oder `sse` |
| `command`, `args` | Lokale stdio ausführbare und Argumentenliste |
| `url` | Remote HTTP/SSE-Endpunkt |
| `required_secrets.environment` | Namen von Umgebungsgeheimnissen für Stdio; Nicht ihre Werte |
| `required_secrets.headers` | Namen von HTTP-Header-Geheimnissen; Nicht ihre Werte |
| `required_secrets.oauth_client_secret` | Ob ein OAuth-Client-Geheimnis lokal bereitgestellt werden muss |
| `oauth` | Unterstützte Registrierung/Emittent/Scopes/Client/Redirect Metadaten |

Transportspezifische Validierung gilt: Ferntransporte enthalten keine erforderlichen Umweltgeheimnisse; OAuth und erforderliche Header-Geheimnisse können nicht kombiniert werden. Ein vorregistrierter OAuth-Client benötigt seinen Autorisierungsserver; Client-Metadaten-Registrierung und explizite Client-ID sind separate Modi. Redirect/client-secret Metadaten erfordern die entsprechende Client-ID.

Portable Exporte lehnen eingebettete Anmeldeinformationen in URLs und Befehlsargumenten ab. Der MCP-Clientexport verwendet `mcpServers`, `command`/`args`/`env` für Stdio oder `type`/`url`/`headers` für den Ferntransport mit geheimen Platzhaltern. Die OAuth-Registrierung und die Tokens sind von diesem Client-Format ausgeschlossen, und der Export meldet die Einschränkung.

Durch das Importieren der Konfiguration wird der externe Server nicht installiert, der Dienst nicht angemeldet oder eine erfolgreiche Ausführung des Tools erstellt. Bestätigen Sie den Verbindungszustand und prüfen Sie die angekündigten Tools, nachdem Sie Anmeldeinformationen über die Anwendung bereitgestellt haben.

[Template Parser und beide Exportformate](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts), [Custom Connector Identität](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts).
