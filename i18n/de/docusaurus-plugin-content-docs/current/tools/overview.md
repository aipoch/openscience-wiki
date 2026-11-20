---
title: "Werkzeuge entdecken"
last_update:
  date: '2026-11-20'
---

# Werkzeuge entdecken {/* #explore-tools */}

Wählen Sie ein Tool nach dem Ergebnis, das Sie benötigen: einen Datensatz abrufen, eine Datei inspizieren, eine Berechnung ausführen oder einen externen Dienst verbinden. Die Anwendung kombiniert diese Fähigkeiten, aber sie haben unterschiedliche Einrichtungs- und Nachweisanforderungen.

## Wählen Sie eine Werkzeugfamilie {/* #choose-a-tool-family */}

| Bedarf | Beginnen Sie hier | Was muss bereit sein | Was danach zu inspizieren |
| --- | --- | --- | --- |
| Dateien lesen, Arbeit planen, Ergebnisse berechnen oder veröffentlichen | [Integrierte Forschungswerkzeuge](./built-in.md) | Zugängliche Projekteingabe- und Betriebsberechtigungen | Tool Response, Ausgabedatei und Ausführungsprotokoll |
| Öffentliche Webseiten finden und Quelltext lesen | [Web-Suche](./web-search.md) | Eingebauter Open-Science Agent, Main-Modell und Netzwerk | Source URLs, abgerufener Text und jede Abkürzung |
| Finden Sie heraus, welche wissenschaftliche Software eine Methode verwendet | [Wissenschaftlicher Werkzeugkatalog](./catalog.md) | Prüfen Sie Verpackungen/Gewichte separat von der Skill-Installation | Aktuale ausführbare Datei/Import und Version |
| Führen Sie Python, R oder einen wissenschaftlichen Workload aus | [Wissenschaftliche Instrumente](./scientific.md) | Ausgewählte Laufzeit, Pakete oder Compute Host | Code, Fehler, Output-Checks und Herkunft |
| Abfrage biomedizinischer/wissenschaftlicher Aufzeichnungen | [Wissenschaftliche Datenbanken](./databases.md) | Aktiviert Connector, Netzwerk und alle erforderlichen Anmeldeinformationen | Source IDs, zurückgegebene Felder und Abkürzung |
| CSV, TSV oder Tabellenkalkulationsdaten prüfen | [Tabellen und Datensätze](./tables.md) | Unterstützte Datei und aktuelle Eingabe | Sichtbare Zeilen/Spalten, Trennzeichen und Volldatendimensionen |
| Lesen Sie Papiere, Sequenzen, Strukturen und andere Ausgaben | [Wissenschaftliche Zuschauer](./viewers.md) | Unterstütztes Format | Rendered Content und jegliche Vorschau-Einschränkung |
| Verbinden Sie einen MCP-Server | [Konnektoren und MCP](./mcp.md) | Server-Konfiguration und Vertrauen | Verbundener Zustand und eine echte Tool-Antwort |
| Konfigurieren einer Service-Identität/eines Dienstschlüssels | [Dienstanmeldeinformationen](./credentials.md) | Korrekter Service und nutzbares Konto | Validierungsergebnis oder eine begrenzte Live-Abfrage |
| Enthüllen Sie Ihre eigenen lokalen Daten durch ein Tool | [Benutzerdefiniertes MCP-Tool](./custom.md) | Ein Arbeitsserver mit einem Eingabeschema | Discovery, erfolgreicher Call und tatsächliches Ausfallverhalten |

## Verfügbarkeit hat mehrere Bedeutungen {/* #availability-has-several-meanings */}

**Aufgeführt** bedeutet, dass die Anwendung eine Ressource kennt. **Enabled** bedeutet, dass der ausgewählte Agent es verwenden kann. **Connected** bestätigt eine Connector-Sitzung, beweist jedoch nicht, dass eine bestimmte Abfrage gültig ist. **Hingerichtet** bedeutet, dass ein Tool tatsächlich ein Ergebnis oder einen Fehler zurückgegeben hat. **Geprüft** bedeutet, dass das Ergebnis gegen die Aufgabe inspiziert wurde.

Die lokalen Beispiele umfassen echte GSE60450 RNA-seq Zählungen, einen benutzerdefinierten schreibgeschützten QC-Server, ein Aspirin-Molekül-Artefakt und öffentliche Sequenz / Struktur-Eingänge. Sie verwenden englische Anwendungs-Screenshots in beiden Sprachausgaben. Die Remote-GPU/SSH-Ausführung und die auf diesem Gerät nicht verfügbaren Anmeldeinformationen bleiben explizit von den abgeschlossenen lokalen Operationen unterschieden.

![Custom QC Connector in der Anwendung verbunden](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

## Geben Sie dem Agenten eine begrenzte Anfrage {/* #give-the-agent-a-bounded-request */}

Angabe der Quelle, des Betriebs und der erwarteten Ausgabe. Für eine Datenbankabfrage fügen Sie den Bezeichner-Namespace und ein kleines Ergebnislimit hinzu. Benennen Sie für eine Berechnung die Eingabe, die ausgewählte Sprache und die Prüfungen. Fragen Sie nach dem tatsächlichen Fehler, wenn das Tool nicht ausgeführt werden kann; Eine aus dem Modellspeicher rekonstruierte Antwort ist kein erfolgreicher Werkzeugaufruf.

Ein [Fähigkeit](../skills/overview.md) liefert das Verfahren; a [Spezialist](../specialists/overview.md) liefert eine wiederverwendbare Rolle. Weder installiert automatisch Software, stellt Anmeldeinformationen bereit noch stellt eine unzugängliche Datei zur Verfügung.

Bezugsnummer der Durchführung: [SteckverbinderPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx), [preview-support.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts).
