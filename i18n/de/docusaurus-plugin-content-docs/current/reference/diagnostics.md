---
title: "Architektur und Diagnostik"
last_update:
  date: '2026-11-25'
---

# Architektur und Diagnostik {/* #architecture-and-diagnostics */}

Suchen Sie einen Fehler durch die Komponente, die die Operation besitzt. Eine erfolgreiche Modellantwort, eine erfolgreiche Berechnung und ein verifiziertes gespeichertes Artefakt sind unterschiedliche Beobachtungen; Sammeln Sie die Beweise für die Phase, die fehlgeschlagen ist.

## Architektur und Eigentum {/* #architecture-and-ownership */}

```mermaid
flowchart LR
  UI[Desktop or browser interface] --> MAIN[Shared Node backend]
  MAIN --> STORE[Settings, database and managed files]
  MAIN --> AGENT[Agent framework and model provider]
  MAIN --> NB[Notebook runtime]
  MAIN --> SERVICES[Connectors and Compute Hosts]
  AGENT --> EVENTS[Messages and tool events]
  NB --> EVENTS
  SERVICES --> EVENTS
  EVENTS --> UI
  MAIN --> ART[Artifact versions and provenance]
  ART --> UI
```

| Komponente | Besitz | Untersuchungsnachweise |
| --- | --- | --- |
| Renderer und Preview | Anzeigezustand, Steuerelemente, gerenderter Dateiinhalt | Seite, ausgewähltes Projekt/Session, Dateiname, Vorschaufehler |
| Node Backend | Persistente Operationen, Anwendungsdienste und Zugriffsgrenzen | Betriebsfehler und zugehörige Diagnose |
| Agent Framework/Provider | Modellverbindung, Aufgabenausführungsprotokoll und Antwortstrom | Framework/Provider/Modell, Verbindungstest, ausfallendes Werkzeug oder Wende |
| Notebook | Interpreter, Codeausführung, Outputs und Live-Variablen | Laufzeit-ID/-Version, ausfallende Zelle, Stdout/Stderr und Ausführungsprotokoll |
| Konnektor | Externes Dienstleistungsersuchen | Connector/Toolname, bereinigte Eingaben, Status/Fehler aus dem Dienst |
| Remote Compute Host | SSH-Zugang und direkte/geplante Arbeitsplätze | Host/Modus, Sondenergebnis, Job-ID und Fernprotokolle |
| Artefakt-Repository | Verwaltete Versionen, Prüfsummen und erfasste Beweise | Datei-/Versions-ID, Inhaltsstatus, Registerkarten Code/Umgebung/Überprüfung |

Der Desktop-Pfad kreuzt die Preload-API-Grenze. Der Browserzugriff nutzt den geschützten lokalen Service-Transport der Anwendung; siehe [Headless Service und Browserzugriff](server.md). Der Browser ist keine zweite unabhängige Forschungsdatenbank.

## Unterscheiden Sie den Inhalt von Beweisen {/* #distinguish-content-from-evidence */}

| Zustand oder Nachricht | Auslegung | Nächste Prüfung |
| --- | --- | --- |
| Artefaktinhalte verfügbar | Die Bytes der ausgewählten Version sind lesbar und bestehen die entsprechende Integritätsprüfung | Prüfen Sie, ob das wissenschaftliche Ergebnis korrekt ist |
| Inhalt nicht verfügbar: fehlt | Der erwartete Inhalt kann nicht gefunden werden | Bewahren Sie die Versionsidentität und untersuchen Sie die Speicherverfügbarkeit |
| Inhalt nicht verfügbar: Checksum Mismatch | Der Inhalt entspricht nicht seinem aufgezeichneten Integritätswert | die Diagnose aufbewahren; Ersetzen Sie Bytes nicht stillschweigend und nennen Sie es dieselbe Version |
| Teilweise Erfassung der Umgebung | Die Umweltbilanz ist unvollständig | Lesen Sie Capture Warnhinweise und behalten Sie die Interpreter-/Paketdetails unabhängig |
| Bounded Execution Log | Nur begrenzte unveränderliche Vollstreckungsbeweise wurden aufbewahrt | Überprüfen Sie Lückenwarnungen und das Live-Notebook, wenn verfügbar |
| Kein Review für diese Version | Kein gültiges Reviewer-Ergebnis ist beigefügt | Melden Sie diese Version nicht als überprüft |

Diese Staaten können nebeneinander existieren. Überprüfen Sie die Integrität der Inhalte, den Ausführungsnachweis und den Überprüfungsstatus separat.

## Fehlersuche {/* #error-lookup */}

| Bruchfläche | Canonischer Lookup |
| --- | --- |
| Modell/API, Connector oder Proxy HTTP Antworten | [HTTP Statuscodes](../guides/troubleshooting.md#http-errors-400-403-429-and-5xx) |
| App kann ihre Datenbank nicht öffnen | [Datenbank-Startcodes](../guides/troubleshooting.md#database-startup-errors) |
| Notebook-Importe, Dateipfade und Berechtigungen | [Fehlermeldungen](../guides/troubleshooting.md#match-the-error-message) |
| SSH-Transport, Fernwege und Stellenstatus | [Fernfehler](../guides/remote-compute.md#resolve-ssh-and-job-errors) |
| Einreichung von Themen und Community-Hilfe | [Melden Sie einen Bug oder fragen Sie die Community](../guides/troubleshooting.md#report-a-bug-or-ask-the-community) |

Behalten Sie die Quelle des Fehlers mit seinem Identifikator. Ein OS errno, eine Python-Ausnahme, ein Remote-Job-Fehlercode und der HTTP-Status eines Anbieters sind nicht austauschbar. Kopieren Sie die begleitende Nachricht und verschachtelte Ursache, wenn verfügbar; ein Identifikator mehrere Fehlerpfade abdecken kann.

## Bewahren Sie eine nützliche Diagnoseaufzeichnung auf {/* #preserve-a-useful-diagnostic-record */}

Notieren Sie die App-Version, das Betriebssystem, das betroffene Projekt / die betroffene Sitzung, den Betrieb, das erwartete Ergebnis, den genauen Fehler und das, was unmittelbar davor passiert ist. Integrieren Sie die Laufzeit- und Eingabeprüfsumme, wenn eine Berechnung erforderlich ist; Fügen Sie die Artefaktversion oder die Remote-Job-ID hinzu, wenn eine vorhanden ist.

Verwenden Sie eine verfügbare **Details**-, **Diagnosedetails**- oder Protokollansicht, um die Ursache des Fehlers beizubehalten und nicht nur seine kurze Überschrift. Reproduzieren Sie mit öffentlichem oder minimalem Input, wenn möglich. Überprüfen Sie alles, was Sie teilen, auf Konto-Token, Header, private Pfade und Forschungsinhalte.

Der Hauptprozesslogger schreibt strukturierte JSON-Zeilen. Seine Standardeinstellungen drehen Dateien bei 5 MiB und behalten insgesamt drei Dateien; Ein spezielles fatales Schreibverhalten kann die gewöhnliche Grenze eines Datensatzes überschreiten. Logs haben daher ein Aufbewahrungsfenster und sind kein permanenter Audit-Trail. Ein Diagnosefeld kann auch abgeschnitten werden. Bewahren Sie kurz nach dem Ausfall einen relevanten Datensatz auf und unterscheiden Sie die Abwesenheit vom Nachweis, dass ein Ereignis nie stattgefunden hat.

Quelle: [Logger und Retention](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/logger.ts), [Diagnoseredaktion](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/diagnostic-redaction.ts), [Begrenztes Notebook Fehlerdetail](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/failure-diagnostic.ts) und [Status des Artefaktinhalts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/artifacts/provenance-content-status.ts).

Unterscheiden Sie zunächst eine fehlgeschlagene Operation von einer fehlgeschlagenen Aktualisierung/Bereinigung nach einer festgelegten Änderung und unterscheiden Sie den Abschluss des Hintergrundauftrags von der Ergebnislieferung. Überprüfen Sie den gespeicherten Zustand, bevor Sie eine Mutation erneut versuchen. Die benutzerseitige [Wiederfindungstabelle](../guides/troubleshooting.md#recovery-messages) deckt blockierte Warteschlangenwiederherstellung, beibehaltene PDF-Referenzen, veraltete Sammlungsbearbeitungen und Windows-Installationsnachrichten ab. [Hintergrundaufgaben](../guides/notebook.md#background-tasks-and-result-delivery) erklärt den Ausführungsstatus; Fernüberwachungsfehler bleiben von den endgültigen Arbeitsergebnissen getrennt.


## Sitzungsdiagnostikarchive {/* #session-diagnostic-archive */}

**Export diagnostics…** sammelt ausgewählte Sitzungsmetadaten, Datenbankdatensätze und verfügbare Anwendungsprotokoll-Metadaten in einem lokalen Archiv mit einem Manifest und Exportprotokoll. Fehlende Quellen stoppen nicht den gesamten Export; große oder beschädigte Quellen können Zusammenfassungen erzeugen. Die aktuellen und historischen Anwendungsprotokolle können Aktivitäten außerhalb der ausgewählten Sitzung abdecken, also überprüfen Sie die ausgewählten Quellen und erfassen Sie die Ergebnisse.

Gewöhnliche Metadatenquellen schließen private Inhaltsfelder aus. Nach einem fehlgeschlagenen Paketexport von sensiblen Inhalten kann der Dialog auch redigierte Scannernachweise und markierte Originaldateien anbieten. Originaldateien werden standardmäßig nicht überprüft; Sie explizit auszuwählen, beinhaltet ihre ursprünglichen Bytes. Export macht keine Upload- oder Modellanforderung. Überprüfen Sie das resultierende Archiv vor dem Teilen. Es ersetzt kein Research-Paket-Backup oder eine minimale Reproduktion. Siehe [das dargestellte Ausfuhrverfahren](../guides/troubleshooting.md#session-diagnostics).

## Desktop und Backend sind getrennte Prozesse {/* #node-backend */}

Von v0.37.0 aus besitzt Electron die native Desktop-Shell, während ein gewöhnliches Node-Backend Shared Services besitzt. Der Desktop, die Web-Benutzeroberfläche, CLI und SDK können sich mit demselben Backend verbinden. Identifizieren Sie das Konfigurationsverzeichnis, die Version und den tatsächlichen Port mit `status --json`, wenn ein Client keine Verbindung herstellen kann. Ein sichtbares Desktop-Fenster allein beweist nicht, dass das Backend gesund ist. Folgen Sie [Backend-Besitz](server.md#backend-ownership), bevor Sie es stoppen.
## Konfigurieren von Agent Tracing {/* #agent-tracing */}

Verwenden Sie dies, wenn Sie eine integrierte Agent-Umdrehung über Modellanforderungen und MCP-Tools überprüfen müssen. Liefern Sie einen OTLP/HTTP JSON-Empfänger, z. B. einen OpenTelemetry Collector oder Langfuse. Open-Science bietet keinen App-gesteuerten Sammeldienst an. Der Endpunkt muss die URL der vollständigen Aufnahme sein; Ein generischer Kollektor verwendet üblicherweise `/v1/traces`, während Langfuse `/api/public/otel/v1/traces` verwendet.

Die Person, die das Backend bedient, konfiguriert die Endpunkt-, Authentifizierungs- und Capture-Schalter in ihrer Startkonfiguration. Bei einer installierten App wird der `.env` des aktiven Konfigurationsverzeichnisses unterstützt (normalerweise `~/.open-science/.env`). Beenden Sie die aktive Arbeit und starten Sie dieses Backend neu, nachdem Sie die Startkonfiguration geändert haben. Dies ist getrennt vom Speichern einer Projekteinstellung.

<p className="example-label"><strong>Beispiel</strong> Ein lokaler Empfänger mit deaktivierter Inhaltserfassung</p>

```dotenv
OPEN_SCIENCE_AGENT_OTLP_TRACES_ENDPOINT=http://127.0.0.1:4318/v1/traces
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_CONTENT=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_API_REQUEST=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_ARGUMENTS=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_RESULTS=0
OPEN_SCIENCE_AGENT_OTLP_DIAGNOSTICS=1
```

In diesem Beispiel wird von einem Empfänger ausgegangen, der bereits auf die eigene Loopback-Adresse des Backends hört. Es installiert keine. Verwenden Sie für einen anderen Host die URL der tatsächlichen Aufnahme und die erforderliche Authentifizierung; Siehe [Offizielle Empfängerkonfiguration](https://github.com/aipoch/open-science/blob/v1.3.4/docs/development-quick-reference.md#open-science-agent-traces) und [Umweltbeispiele](https://github.com/aipoch/open-science/blob/v1.3.4/.env.example). Halten Sie Empfängergeheimnisse aus Eingabeaufforderungen und geteilten Screenshots heraus.

### Wählen Sie Capture Details {/* #choose-capture-detail */}

Das Tracing eines Projekts ist **standardmäßig ausgeschaltet**. Die vier folgenden Einstellungen zur Inhaltserfassung haben jedoch jeweils den Standardwert **`1` (aktiviert)**, wenn sie fehlen. Setzen Sie alle vier ausdrücklich auf `0`, um nur Metadaten zu erfassen. Dies sind Starteinstellungen, keine zusätzlichen Schalter im Projektdialog.

| Setzen des Suffix nach `OPEN_SCIENCE_AGENT_OTLP_` | Inhalt enthalten, wenn auf `1` |
| --- | --- |
| `CAPTURE_CONTENT` | Auszüge aus der Eingabe und der abschließenden Antwort |
| `CAPTURE_API_REQUEST` | Modellanforderung JSON, möglicherweise einschließlich Anweisungen, Historie, Werkzeugdaten und Anlagen |
| `CAPTURE_TOOL_ARGUMENTS` | MCP Tool Input Previews |
| `CAPTURE_TOOL_RESULTS` | MCP Tool Output Previews |

Nur Metadaten-Traces beschreiben immer noch Operationen. Überprüfen Sie den Empfänger und seine Zugangsregeln, bevor Sie ein Projekt mit privaten Forschungsdaten aktivieren.

### Ermöglichen und Überprüfen der Lieferung {/* #enable-and-check-delivery */}

Öffnen Sie [Projekteinstellungen](../guides/projects.md#agent-tracing), aktivieren Sie **Agent tracing** und speichern Sie. Verwenden Sie das eingebaute **Open-Science Agent** für eine kleine Anfrage. Suchen Sie nach Service `open-science-agent` im Empfänger und prüfen Sie die korrelierte Wende, Anforderung und Werkzeugspannweite, die die Aufgabe tatsächlich erzeugt hat.

Wenn die Diagnose für die `.env`-Konfiguration aktiviert ist, überprüfen Sie den benachbarten `.env.otel-status.json` auf den Upload-Status. Wenn keine Spuren ankommen, überprüfen Sie das aktive Profil, den Projektwechsel, die Laufzeit, den vollständigen Endpunkt, die Empfängerverfügbarkeit und die Anmeldeinformationen. Die Lieferung erfolgt asynchron: Eine abgeschlossene Agent-Antwort beweist keinen erfolgreichen Upload. Das Abschalten der Rückverfolgung stoppt die zukünftige Erfassung; Es löscht keine Datensätze bereits am Empfänger.
