---
title: "Verbinden Sie ein benutzerdefiniertes MCP Tool"
last_update:
  date: '2026-09-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


import ExampleDownload from '@site/src/components/ExampleDownload';

# Verbinden Sie ein benutzerdefiniertes MCP Tool {/* #connect-a-custom-mcp-tool */}

<p className="example-label"><strong>Praxisbeispiel</strong> Abfrage einer öffentlichen QC-Tabelle über einen lokalen MCP-Server</p>

Dieses Beispiel zeigt eine bestehende öffentliche RNA-seq QC-Tabelle über einen kleinen lokalen MCP-Server. Es liest eine feste CSV und bietet zwei Operationen; Es wird das Netzwerk nicht abgefragt, Pakete installiert oder der Datensatz nicht geändert.

<PlatformGuide />

## Laden Sie das eigentliche Beispiel herunter {/* #download-the-actual-example */}

- <ExampleDownload path="/examples/capabilities/qc-mcp-server.py">qc-mcp-server.py</ExampleDownload>
- <ExampleDownload path="/examples/gse60450/rnaseq-sample-qc.csv">rnaseq-sample-qc.csv</ExampleDownload>

Speichern Sie beide Dateien lokal und notieren Sie sich ihre vollständigen Pfade. Der Server verwendet die Standardbibliothek von Python. Es liest das ausgewählte CSV beim Start, also starten Sie es absichtlich neu / verbinden Sie es wieder, wenn Sie diesen Eingang ersetzen.

## Füge es in Open-Science hinzu {/* #add-it-in-open-science */}

1. Öffnen Sie **Settings → Connectors → Add connector → Local command**.
2. Setzen Sie **Display name** auf `GSE60450 QC`.
3. Wählen Sie **python3 — script file** als **Command** oder **Other…** mit dem tatsächlichen Python ausführbaren Pfad auf Windows.
4. Öffnen Sie **Advanced settings**. Setzen Sie den Connectorname/ID auf `gse60450-qc` und beschreiben Sie ihn als schreibgeschützten Zugriff auf die gespeicherte QC-Tabelle.
5. Setzen Sie in **Arguments** den absoluten Pfad des Skripts auf die erste Zeile und den absoluten Pfad des CSV auf die zweite. Jede Zeile ist ein einzelnes Argument. Fügen Sie keine Shell-Zitate um einen Pfad herum hinzu, nur weil er Leerzeichen enthält.
6. Lassen Sie die Umgebung für dieses Beispiel leer. Überprüfen Sie das Serverskript, überprüfen Sie **I trust this connector**, dann **Add**.
7. Durchsuchen Sie `GSE60450` und bestätigen Sie **Connected** und die Verfügbarkeit für Main Agent.

<PlatformContent platform="macos">

![Aktuelle lokale MCP-Konfiguration](/img/open-science/capabilities-walkthrough/08-mcp-local-config.webp)

</PlatformContent>

<PlatformContent platform="macos">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="linux">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="windows">

```text
C:\Research data\mcp test\qc-mcp-server.py
C:\Research data\mcp test\rnaseq-sample-qc.csv
```

</PlatformContent>

Diese beiden Zeilen sind eine Pfadvorlage, keine buchstäblichen Pfade, um unverändert einzufügen. Wenn `python3` für die App nicht verfügbar ist, wählen Sie Andere und den tatsächlichen ausführbaren Pfad. Der ausgewählte Launcher muss auf diesem Computer vorhanden sein.

<PlatformContent platform="windows">

Verwenden Sie auf Windows **Other…**, um den vollständigen Pfad zu einem installierten `python.exe` einzugeben; die `python3`-Voreinstellung stellt nicht fest, dass der Befehl existiert. Bestätigen Sie den Interpreterpfad in [Laufzeiten](../guides/runtimes.md). Behalten Sie das Skript und die CSV-Pfade auf zwei separaten **Arguments**-Zeilen, auch wenn deren Ordnernamen Leerzeichen enthalten. Kombinieren Sie die ausführbaren Dateien und Argumente nicht in einem Shell-Befehl.

</PlatformContent>

## Tool-Inputs und verifizierte Outputs {/* #tool-inputs-and-verified-outputs */}

| Tool | Eingabe | Tatsächlich erwarteter Inhalt |
| --- | --- | --- |
| get_dataset_summary | Leeres Objekt | GSE60450, Quell-URL, Eingabe-Dateiname, 12-Zeilen und vollständige Beispiel-Identifikatoren |
| get_sample_qc | `sample_id` Schnurschnur | Die vier numerischen QC-Metriken der ausgewählten Stichprobe |

Fragen Sie den Agenten:

> Verwenden Sie das angeschlossene gse60450-qc Connector. Rufen Sie get_dataset_summary an, dann get_sample_qc für MCL1-DG_BC2CTUACXX_ACTTGA_L002_R1. Melden Sie nur die tatsächlichen Antworten und bewahren Sie den CSV auf.

In diesem Beispiel hat die native Anwendung **23,227,641 Gesamtzählungen, 8,664 Nullzählgene, 18,515 nachgewiesene Gene und Median 237** für dieses Sample zurückgegeben. Der Datensatz-Zusammenfassungsaufruf gab 12-Zeilen zurück. Diese entsprechen der ursprünglichen gespeicherten QC-Tabelle.

<PlatformContent platform="macos">

![Der benutzerdefinierte Connector erfolgreich verbunden](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

</PlatformContent>

<PlatformContent platform="windows">

Öffnen Sie die Notebook-Aktivität für beide Werkzeugaufrufe, öffnen Sie dann das gespeicherte JSON erneut und vergleichen Sie seine Beispiel-IDs und Metriken mit dem CSV. Der folgende Windows-Lauf verwendet die Connector-ID `gse60450-qc-win`; Verwenden Sie Ihre eigene konfigurierte ID in der Anforderung.

![Windows lokale MCP Anrufe mit gespeichertem JSON und Notebook Ausgang](/img/open-science/windows/mcp-tool-results.webp)

</PlatformContent>

## Überprüfen Sie den Server und das Fehlerverhalten {/* #inspect-the-server-and-error-behavior */}

Der Server implementiert MCP Initialisieren, Ping, Tool Discovery und Aufrufe über stdio. Seine beiden Werkzeugschemata sind im herunterladbaren Skript definiert. Standard-Ausgang ist der Protokollkanal; Das Hinzufügen gewöhnlicher Debug-Drucke kann die Verbindung unterbrechen. Lokale Diagnosen gehören zum Standardfehler.

**Bekanntes Fehler-Mapping:** kann ein ungültiger Beispielname als **connector_unavailable** in der App erscheinen, auch wenn der benutzerdefinierte Server einen domänenspezifischen Fehler zurückgibt. Überprüfen Sie das Serverprotokoll und validieren Sie die Beispielkennung, bevor Sie die Verbindung wieder herstellen. Anhaltende Inkongruenzen unter Verwendung von [Fehlerbehebung](../guides/troubleshooting.md) melden.

Die Anwendung entdeckt Server-Tools während der Verbindung. Verwenden Sie die gefundenen Operationsnamen beim Aufruf von `host.mcp`; `tools/list` ist kein Business-Tool. Überprüfen Sie das herunterladbare Skript für das Eingabeschema.

## Exportieren und Wechseln zu einem anderen Computer {/* #export-and-move-to-another-computer */}

Wählen Sie das **Actions → Export** der Zeile, wählen Sie das gewünschte Format aus und prüfen Sie die Konfigurationsvorschau. Der reale Export warnte, dass beide Argumentationspfade lokal seien. **Save configuration** exportiert die Einstellungen, nicht den Python-Interpreter, das Skript oder CSV. Kopieren Sie diese Dateien separat, aktualisieren Sie Pfade, bestätigen Sie das lokale Vertrauen und wiederholen Sie beide erfolgreichen Anrufe.

<PlatformContent platform="windows">

für **MCP client config**, inspizieren `mcpServers`Dieses Beispiel exportiert einen Server mit einem `command` und zwei `args`. JSON zeigt entkommene Backslashes in Windows-Pfaden an. Aktualisieren Sie auf einem anderen Computer alle drei Pfade zu echten Dateien und wiederholen Sie beide Anrufe. Eine exportierte Konfiguration stellt nicht fest, dass der Zielcomputer angeschlossen ist.

</PlatformContent>

| Fehlschlag | Überprüfung |
| --- | --- |
| Kommando kann nicht starten | Ausführbarer Pfad, Skriptpfad und Dateiberechtigungen |
| CSV kann nicht gelesen werden | Zweites Argument und tatsächlicher Dateiort |
| Connected, aber kein Tool verfügbar | Agentenzuordnung, aktueller Katalog und exakter Werkzeugname |
| Schlechter Input | Erforderlich `sample_id` und die ursprüngliche vollständige Kennung, nicht das Compact Plot Label |
| Connector Fehler nach einem fehlgeschlagenen Anruf | Inspizieren Sie die Details zu Server-/Anwendungsfehlern und verbinden Sie sie gegebenenfalls erneut |
| Funktioniert in einem Terminal, aber nicht in der App | App-visible Executable/Environment und Protocol-only stdout |

Um das Beispiel zu erweitern, definieren Sie ein kleines Eingabeschema, geben Sie Quellenkennungen zurück und testen Sie normale, leere und ungültige Eingaben, bevor Sie das Werkzeug freigeben. Halten sie diese operationen so eng, dass ein benutzer überprüfen kann, was der anruf lesen oder ändern wird.

Bezugsnummer der Durchführung: [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx), [service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/service.ts).

Für die Verwaltung der gleichen benutzerdefinierten MCP-Konfiguration aus Skripten verwenden Sie [Connector CLI Befehle](../reference/cli.md#manage-connectors-and-credentials) oder [SDK-Verfahren](../reference/api.md#connector-management-methods). Ein erfolgreicher Verbindungstest entdeckt Werkzeuge; Überprüfen Sie einen separaten begrenzten Geschäftsaufruf, bevor Sie die Integration betriebsbereit aufrufen.
