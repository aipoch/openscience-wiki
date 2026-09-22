---
title: "CLI und strukturierter Output"
last_update:
  date: '2026-09-22'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLI und strukturierter Output {/* #cli-and-structured-output */}

Verwenden Sie `open-science`, um den Anwendungsstatus zu überprüfen, Aufgaben auszuführen, Konnektoren und Anmeldeinformationen zu verwalten und den lokalen Dienst zu betreiben. Beginnen Sie mit dem installierten Launcher und bestätigen Sie, mit welcher lokalen Instanz er sich verbindet.

<PlatformGuide />

## Aufgesetzt von einem Terminal {/* #terminal-setup */}

Installieren Sie zuerst die Desktop-Anwendung und stellen Sie den Befehl `open-science` zur Verfügung. Das CLI verwendet das Backend der Anwendung; Es handelt sich nicht um einen separaten npm-Daemon. Debian-Pakete enthalten den Befehl. Wenn der Launcher fehlt, folgen Sie dem Setup des Platform Launchers oder verwenden Sie den installierten CLI-Eintrag, dann `open-science cli install`.

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init` erstellt das Konfigurationsverzeichnis, ohne die Anwendung zu starten. `--profile` ist ein Alias für `--config-root` für unterstützte Entwicklungsprofile; Ein verpacktes Startup lehnt diese Overrides ab. Verwenden Sie ein beabsichtigtes Profil konsistent. `runtime list` zeigt die erkannten Framework-Bereitschaft, Version und verwaltete / externe Quelle, ohne ausführbare Pfade freizulegen.

Für ein unkonfiguriertes Codex-Setup:

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

Folgen Sie dem Login-Flow. Dies bereitet oder repariert die verwaltete Codex-Laufzeit und registriert das Abonnement über die Anwendung; Es importiert keine externen Codex-Login-Dateien. First-Run-Bootstrap zielt derzeit auf Codex ab, obwohl die Laufzeitliste andere Frameworks enthält. Bestehende widersprüchliche Konfigurationen werden gemeldet und nicht stillschweigend ersetzt.

Wenn Sie stattdessen einen OpenAI API-Schlüssel verwenden, verwenden Sie `provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`, mit einer unterstützten Modell-ID und dem bereits über Ihre Geheimverwaltungsumgebung gelieferten Schlüssel. Verwenden Sie für OpenAlex `connector configure literature --openalex-key-env OPENALEX_API_KEY --json`. Präfixieren Sie beide Befehle mit `open-science`. Setzen Sie den Schlüssel niemals selbst in Befehlsargumente. Eine erfolgreiche Nachweisprüfung stellt nicht fest, dass eine Forschungsanfrage abgeschlossen ist oder dass die Quote verbleibt.

Lesen Sie **bereit**, das individuelle **Kontrollen** und die vorgeschlagenen **nächstens**-Aktionen aus `doctor`. Ein Bericht kann erfolgreich beendet werden, während `ready` falsch ist; Wenn das Backend abwesend ist, meldet Doctor es und verlässt 3. Füllen Sie die gemeldete Voraussetzung aus, überprüfen Sie erneut, dann [Führen Sie eine Aufgabe](#run-input-and-control-flags) im beabsichtigten Projekt.

## Eingangsorte {/* #entry-points */}

| Eingang | Anforderungen | Befehl |
| --- | --- | --- |
| Installierter Application Launcher | **Settings → General → Command line tool → Install command** | `open-science --help` |
| Quelle Checkout | Builded Application und Repository Abhängigkeiten | `node packages/open-science/cli.mjs --help` |
| npm-Client | Node.js 22.5+ und eine installierte Anwendung; Paketverfügbarkeit vor der Installation bestätigen | Packungskennung `@aipoch/open-science` |

Der installierte Launcher verwendet die gebündelte Laufzeit der Anwendung. Wenn das Verzeichnis im PATH fehlt, folgen Sie der angezeigten Anweisung des General-Panels und öffnen Sie ein neues Terminal. Benennen Sie die ausführbare Datei nicht in das Display-Branding um.

<PlatformContent platform="windows">

Öffnen Sie nach **Install command** ein neues PowerShell-Fenster und führen Sie aus:

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

Überprüfen Sie, ob **Source** auf den im Allgemeinen angezeigten Launcher zeigt, normalerweise ein `open-science.cmd` unter Ihrem Benutzerprofil. Erfolgreiche Hilfeleistung bestätigt die Launcher-Läufe. Wenn der Status `{"running":false}` zurückgibt, hat der CLI kein laufendes Backend gemeldet; Dies bedeutet nicht, dass das Desktop-Fenster geschlossen ist. Überprüfen Sie die beabsichtigte Instanz mit [Servermodus](server.md), bevor Sie Aufgaben senden oder Dateien herunterladen.

</PlatformContent>

## Vervollständigen Sie eine kleine Kommandozeilenaufgabe {/* #complete-a-small-command-line-task */}

<p className="example-label"><strong>Beispiel</strong> Speichern Sie eine Notiz aus der Befehlszeile</p>

1. Installieren Sie den Befehl mit dem oben genannten Eintrag. Lassen Sie die Desktop-App mit einem funktionierenden Modell laufen.
2. Führen Sie `open-science status --json`, dann `open-science project list --json`. Überprüfen Sie die beabsichtigte Instanz und kopieren Sie eine zurückgegebene Projekt-ID.
3. Speichern Sie `task.md` mit: **Speichern Sie project-note.md mit einer kurzen Verbindungsüberprüfung. Lesen Sie keine anderen Dateien oder verwenden Sie das Netzwerk.**
4. Führen Sie die Befehle unter [Eingabe- und Kontrollflaggen ausführen](#run-input-and-control-flags) aus. Ersetzen Sie jeden Platzhalter erst nach Erhalt seiner ID aus dem vorherigen Ergebnis.
5. Wenn der lauf um erlaubnis pausiert, antworten sie in seiner desktop-konversation. `--wait` kann Timeout, während die Aufgabe fortgesetzt wird; Überprüfen Sie `run status RUN_ID --json`, bevor Sie erneut einreichen.
6. Wählen Sie die zurückgegebene Markdown-Artefakt-ID aus, laden Sie sie auf einen neuen lokalen Dateinamen herunter und öffnen Sie sie. Ein abgeschlossener Lauf ohne das angeforderte Artefakt erfordert ein Follow-up in dieser Sitzung. Wenn das Artefakt existiert, der Download jedoch fehlschlägt, folgen Sie [Artefakt Download-Wiederherstellung](./api.md#a-completed-task-whose-file-will-not-download).

Verwenden Sie für Plan-First-Aufgaben `--return-on-attention`, prüfen Sie den zurückgegebenen Plan und antworten Sie über die Anwendung oder die Planbefehle unten. Bei JSON-Integrationen unterscheiden Sie zwischen Laufen, abgeschlossen, fehlgeschlagen und abgebrochen, anstatt jede erfolgreiche HTTP-Antwort als abgeschlossene Aufgabe zu behandeln.

## Kommandofamilien {/* #command-families */}

| Befehl | Argumente/Flaggen | Wirkung |
| --- | --- | --- |
| `project list` | `--json` | Verfügbare Projekte lesen |
| `project create` | Name, fakultativ `--description`, einer von `--agent-context` / `--agent-context-file` | Erstellen Sie ein Projekt |
| `project update` | ID oder genauer Name, gelieferte Metadaten/Kontextfelder | Ändern Sie nur bereitgestellte Felder; `--clear-agent-context` Klarstellung des Kontextes |
| `project session-defaults show` | Projekt-ID oder genauer Name | Read defaults für neue Sessions |
| `project session-defaults update` | Projekt plus Session-Optionen | Update-Standards mit Concurrent-Editing-Schutz |
| `run` | `--project`, prompte Eingabe, optional `--session`, `--wait` | Beginn oder Fortsetzung der Arbeiten |
| `run status` / `run cancel` | Laufende ID | Überprüfen oder explizit abbrechen eines Laufs |
| `session status` | Sitzungs-ID | Sitzungszustand lesen |
| `session config show` | Sitzungs-ID | Lesen Sie persistente / effektive Konfiguration und Überarbeitung |
| `session config update` | Sitzungs-ID, `--revision`, gelieferte Optionen | Ändern Sie zukünftige Wendungen, wenn die Sitzung das Update akzeptieren kann |
| `settings agent-routing show/update` | Framework und Reviewer/Subagent Routing-Optionen | Lesen oder atomar aktualisieren globale Routing |
| `plan show/approve/reject/revise` | Sitzungs-ID; Entscheidung erfordert genaue Artefaktversion und Revision | Lesen oder antworten Sie auf den aktiven Plan |
| `artifacts list` | Sitzungs-ID | Gespeicherte Artefakte lesen |
| `artifacts download` | Artefakt-ID, `--output` | Speichern Sie eine externe Kopie |

Verwenden Sie Projekt-IDs in Skripten. Der CLI kann einen eindeutigen genauen Projektnamen auflösen; Duplikatnamen sind mehrdeutig. SDK/HTTP Routing erfordert IDs direkt. Der Projektkontext akzeptiert bis zu 16,000-Zeichen, und Listen-/Erstellungs-/Aktualisierungsergebnisse zeigen `hasAgentContext` anstelle des privaten Kontextkörpers.

Wenn `artifacts download` mit HTTP 500 fehlschlägt, aktualisieren Sie eine ältere Anwendung und wiederholen Sie die gleiche zurückgegebene Artefakt-ID. Der [Download Wiederherstellungsschritte](api.md#a-completed-task-whose-file-will-not-download) unterscheidet eine abgeschlossene Aufgabe von einer fehlgeschlagenen Dateiübertragung; Führen Sie die Forschungsaufgabe nicht erneut aus, nur um ihren vorhandenen Output zu erhalten.

## Verwalten von Connectors und Anmeldeinformationen {/* #manage-connectors-and-credentials */}

Diese Befehle verwenden das laufende Backend und die gespeicherten Einstellungen. Bestätigen Sie die beabsichtigte Instanz vor dem Bearbeiten. Custom Connector und Credential Writes erfordern eine lokale authentifizierte Verbindung; Führen Sie für einen Server das CLI auf diesem Server aus, einschließlich über SSH.

| Befehl | Input/Ergebnis |
| --- | --- |
| Open-Science-Connector-Liste --Json | Sichere Einstellungen Ansichten der verfügbaren Connectors |
| Open-Science-Connector-Show CONNECTOR_ID --json | Konfiguration/Status für eine zurückgegebene ID |
| Open-Science-Connector ermöglichen CONNECTOR_ID | Setzen Sie Ihre aktivierte Präferenz |
| Open-Science-Connector deaktiviert CONNECTOR_ID | Klarstellung der aktivierten Präferenz |
| Open-Science-Connector hinzufügen --json | Lesen Sie eine neue benutzerdefinierte MCP-Definition aus JSON stdin |
| Open-Science-Connector-Update CONNECTOR_ID --json | Lesen Sie das Konfigurationsupdate von JSON stdin |
| Open-Science-Connector entfernen CONNECTOR_ID | Entfernen einer benutzerdefinierten MCP-Definition |
| Open-Science-Steckverbindertest CONNECTOR_ID --json | Entdecken Sie Tools durch eine separate Verbindung und schließen Sie sie dann |
| Open-Science-Berechtigungsliste --son | Lesen Sie Credential Metadaten ohne rohe Geheimnisse |
| Open-Science-Beglaubigungen hinzufügen --json | Lesen Sie einen neuen Nachweis von JSON stdin |
| Open Science Credential Update CREDENTIAL_ID --json | Update displayName und/oder Secret von JSON stdin |

<p className="example-label"><strong>Beispiel</strong> Senden Sie eine lokale Connector-Konfiguration</p>

Senden Sie Ihre vorbereitete lokale Konfigurationsdatei mit:

~~~bash
open-science connector add --json < connector.json
~~~

| Konfigurationsfeld | Anforderungen |
| --- | --- |
| Name/AnzeigeName | Erforderlich für ein neues benutzerdefiniertes Connector; Name/ID bleibt bei Updates stabil |
| Transport | stdio, streamable_http oder sse; Auch für Updates erforderlich |
| Kommando/Args | Lokal ausführbare und optionale Argumente für stdio |
| url | Endpunkt für HTTP/SSE |
| envCredentialIds / headerCredentialIds | Umgebungs-/Headernamen an gespeicherte Anmeldeinformationen binden |
| oauthCredentialId | Binden Sie einen bestehenden gemeinsamen OAuth-Anmelder |
| Ausgelassene Credentialbindungen | Speichern Sie gespeicherte Werte beim Update; ein leeres Umgebungs-/Header-Bindungsobjekt löscht diese Karte |

Nur benutzerdefinierte MCP-Definitionen können hinzugefügt, bearbeitet oder entfernt werden. **Enabled** ist eine Auswahlpräferenz, kein Nachweis der Konnektivität oder des globalen Widerrufs des Specialist-Zugangs.

**Test** aktiviert das Connector nicht oder führt seine Business-Tools nicht aus. Es gibt Erfolg, optionalen toolCount und eine Nachricht zurück; Die Entdeckung ist auf zehn Sekunden begrenzt und der Fehler verlässt ungleich Null. Die gebündelte Connector-Live-Diagnose wird nicht unterstützt. Das Testen kann bestehende OAuth-Token aktualisieren, führt jedoch keine erstmalige Browser-Anmeldung durch.

Credential schreibt akzeptiere geheimnisse durch JSON stdin. Halten Sie sie aus Befehlsargumenten und Shell-Geschichte heraus. Ein Token-Eingang verwendet displayName, type: token und secret; api_key wird ebenfalls unterstützt. Binden Sie die zurückgegebene createdCredential.id an den Connector. Ältere Backends ohne diese Endpunkte geben einen Fehler zurück, anstatt auf direkte Einstellungen-Datei-Bearbeitungen zurückzugreifen.

## Eingabe- und Kontrollflaggen ausführen {/* #run-input-and-control-flags */}

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

Ersetzen Sie die kapitalisierten Platzhalter durch zurückgegebene IDs. Das Beispiel benennt keinen erfundenen Skill oder Provider, der auf Ihrer Installation vorhanden sein muss.

| Flagge | Vertrag |
| --- | --- |
| `--prompt` / `--prompt-file` | Inline-Text oder UTF-8-Datei; Stdin kann eine Aufforderung geben, wenn sie weggelassen wird |
| `--session` | Setzen Sie die angegebene Sitzung fort |
| `--cwd` | Externes Arbeitsverzeichnis; CLI löst einen relativen Pfad auf, Server kanonisiert und validiert ihn |
| `--approval-profile` | `ask`, `auto`, `full`; Ausfall `ask` |
| `--provider` + `--model` / `--provider-default-model` | Wählen Sie einen konfigurierten Anbieter und ein explizites oder anbietereigenes Standardmodell aus |
| `--reasoning-effort` | CLI Hilfelisten `default`, `low`, `medium`, `high`, `xhigh`, `max`; UI-Modellauswahl kann unterschiedlich sein |
| `--skill` | Wiederholbar installierte Skill ID; Installiert kein fehlendes Skill |
| `--plan-first` | Erfordern Sie eine Planantwort vor der Ausführung |
| `--auto-review` / `--no-auto-review` | Automatische Sitzung einstellen |
| `--memory` / `--no-memory` | Sitzungsspeicher einstellen; sich gegenseitig ausschließend |
| `--specialist` | Binden Sie eine neue Sitzung nach UUID oder stabilem Profilnamen; Presentation Display Name ist keine Routing ID |
| `--delegation allow/deny` | Kontrolle der Zulassung neuer delegierter Arbeiten; Leugnen Sie nicht stornieren bestehende Kinder |
| `--compute-host` | Wiederholbar konfigurierte Host-IDs; wählt Ausführungsziele aus, konfiguriert nicht SSH |
| `--enable-compute-host` / `--clear-compute-hosts` | Zugangs-/Standardkontrollen für neue Sitzungen; Änderungen des vorhandenen Sitzungszugriffs verwenden Konfigurationsupdate |

Ein externes `cwd` bleibt im Besitz des Anrufers. Die Wiederverwendung von `--session` mit `--cwd` erfordert das gleiche kanonische Verzeichnis; Die Run Request verschiebt die Session nicht. Das Auslassen einer Host-Option bewahrt die bestehende Auswahl; den expliziten Clearingvorgang zu nutzen, wenn dies beabsichtigt ist.

## Warten, Aufmerksamkeit und Annullierung {/* #waiting-attention-and-cancellation */}

| Option/Staat | Ergebnis |
| --- | --- |
| ohne `--wait` | Rückkehr nach der Zulassung; Behalten `id` und `sessionId` Um später abzustimmen |
| `--wait` | Warten auf Terminal Run State |
| `--wait --return-on-attention` | Auch zurückgeben, wenn die Genehmigung eines strukturierten Plans erforderlich ist; Berechtigungsaufforderungen sind nicht die gleiche Aufmerksamkeitsbedingung |
| `--timeout-ms` | Stoppen Sie das Warten des Kunden nach Ablauf der Frist; Der Server-Run geht weiter |
| `--cancel-on-timeout` | Ausdrücklich nach einem Timeout abbrechen; Der Befehl meldet immer noch das Timeout |
| `run cancel RUN_ID` | Warten auf Stornierung / Finalisierung; bereits finalisierte Artefakte erhalten |

Für die Plangenehmigung lesen Sie zuerst `plan show`, dann geben Sie sowohl `--artifact-version` als auch `--revision` an. Eine veraltete Planentscheidung darf nicht für einen neueren Plan gelten. Sitzungskonfigurationsupdates erfordern in ähnlicher Weise die von `session config show` zurückgegebene Revision; Alte Updates geben `session_revision_conflict` zurück. Aktiver Root-Agent, Subagent oder Notebook können ein Update mit `session_busy` blockieren.

## Strukturierte Output- und Exit-Codes {/* #structured-output-and-exit-codes */}

`--json` gibt ein Ergebnis ab. `--jsonl` ist mit `run --wait` verfügbar, streamt Ereignisse und endet mit einem Laufergebnis. Kombinieren Sie die beiden nicht. Fehler werden auf Stderr strukturiert, wenn sie angefordert werden; Analysieren Sie den `error.code`, nicht nur den Prozessausgangscode.

Die folgende Ungültig-Optionsantwort wurde lokal reproduziert:

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| Exit-Code | Bedeutung |
| ---: | --- |
| 0 | Befehlserfüllung; Inspizieren Sie den zurückgegebenen Lauf-/Aufmerksamkeitszustand, falls zutreffend |
| 1 | Allgemeiner/laufender Ausfall, Timeout, Konflikt oder Status, der keinen laufenden Dienst meldet |
| 2 | Ungültige Nutzung von CLI |
| 3 | Lokaler Daemon nicht verfügbar |
| 4 | Angefordertes Projekt/Run/Session/Artefakt/Specialist nicht gefunden |
| 5 | Aktives Arbeiten blockierte ein Anwendungsupdate |
| 6 | Anwendungsaktualisierung erfordert einen manuellen Installationsschritt |

JSONL kann `run.progress` und `stream.resync-required` enthalten. Wenn die Wiedergabe nach der Wiederverbindung nicht verfügbar ist, lesen Sie den autoritativen Laufzustand erneut; Gehen Sie nicht davon aus, dass der Ereignisstrom eine permanente Geschichte ist. Lifecycle-Befehle haben separate Flaggenbeschränkungen, die in [Kopfloser Dienst](./server.md) beschrieben sind.

[CLI Implementierung](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/cli.mjs), [stromaufwärts gelegene Kommandoführung](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/CLI.md).

Technische Referenz: [CLI Vertrag](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## Unbeaufsichtigte Strecken {/* #unattended-runs */}

Füge `--permission-prompts none` zu `run` hinzu, um ungelöste menschliche Interaktionen abzulehnen, anstatt auf unbestimmte Zeit zu warten. Das ausgewählte Genehmigungsprofil und die erinnerten Zuschüsse gelten weiterhin; verbleibende Berechtigungsanfragen werden abgelehnt, Benutzerfragen werden abgelehnt und Pläne, die eine menschliche Überprüfung erfordern, werden abgelehnt. Dies billigt nicht jede Aktion.

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

Die Option gilt nur für diesen Aufruf und wird nicht als Session-Präferenz gespeichert. Es kann nicht mit `--plan-first` kombiniert werden. Überprüfen Sie den endgültigen Status und Fehler: Das Vermeiden eines menschlichen Wartens garantiert nicht den Abschluss der Aufgabe. Der Client prüft die Hostfähigkeit `permission-prompts-none`; Aktualisieren Sie den passenden Client und die passende App, wenn ein älterer Host `unsupported_capability` zurückgibt.
