---
title: "Integrierte Forschungswerkzeuge"
last_update:
  date: '2026-11-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Integrierte Forschungswerkzeuge {/* #built-in-research-tools */}

Eingebaute Operationen verbinden die Konversation mit Projektdateien, Notebook-Ausführung, Literaturaufzeichnungen und gespeicherten Ergebnissen. Sie werden durch das Wirkstoff-Framework exponiert; die Schnittstelle kann mehrere Operationen unter einer **Agent SDK**- oder **Notebook**-Aktivitätskarte gruppieren.

## Vorhaben nach Forschungsaufgabe {/* #operations-by-research-task */}

| Familie | Versorgung | Betrieb und sichtbares Ergebnis | Überprüfen Sie, bevor Sie sich darauf verlassen |
| --- | --- | --- | --- |
| File Discovery und Lesen | Projekt/Sitzung und exakter Input | Listet zugängliche Dateien auf oder liest unterstützte Inhalte | Vollständiger Name, Quelle und aktuelle Version; Eine Katalogzeile ist keine Dateiinhaltsinspektion |
| Notebook Ausführung | Python/R-Code, Laufzeit und gültige Eingabereferenzen | Codezelle, Ausgabe, Timing und Ausführungsstatus | Tatsächliche Sprache/Laufzeit, Fehler und vollständige Datenprüfungen |
| Veröffentlichung des Artefakts | Unterstützter Ausgabepfad oder Inline-Inhalte | Versionierte Ergebniskarte in der Konversation / Dateien | Öffnen Sie die Ausgabe, vergleichen Sie Dimensionen / Inhalte und behalten Sie ihre Version bei |
| Literatursuche/Import | Abfrage, DOI/PMID oder Referenzdateien | Abgerufene Datensätze, Posteingangskandidaten und Bibliothekseinträge | Source Identifiers, Duplikate, Review Decision und Volltextzugriff |
| Planarbeiten | Forschungsstufen und Abschlusskriterien | Session Plan mit Step States | Status entspricht den tatsächlich produzierten Outputs |
| Erinnerungen | Eine Tatsache oder Anweisung, die zur Wiederverwendung bestimmt ist | Speicher im konfigurierten Bereich | Inhalt und Umfang, getrennt von der Speicherung von Projektdateien |
| Skill Beladung | Eine verfügbare Paket-ID | Methodenanweisungen und unterstützende Ressourcen | Die beabsichtigte Packung wurde gelesen; Laden ist keine Berechnung |
| Specialist Delegation | Rolle, Aufgabe und erlaubte Eingaben | Kinderaktivität und Subagents Transkript | Kind tatsächlich begonnen, lief die angeforderten Schecks und gemeldeten Einschränkungen |
| Review | Angemessene Antwort- und Überprüfungskonfiguration | Überprüfungen, Befunde und Korrekturzustand | Welche Antwort / Version wurde überprüft und welche Beweise verfügbar waren |

<span id="follow-one-calculation-from-request-to-file" />

## Folgen Sie einer Operation bis zu ihrem Ergebnis {/* #follow-an-operation-through-to-its-result */}

1. Senden Sie eine Anfrage mit der Eingabe und der gewünschten Ausgabe. Folgen Sie [Erstes Projekt](../guides/first-project.md) für eine kleine Table-to-Report-Aufgabe.
2. Erweitern Sie die Aktivitätskarte und überprüfen Sie den angeforderten Vorgang, die Eingabe und den Berechtigungsumfang.
3. Nach der Ausführung lesen Sie das Tool-Ergebnis. Beheben Sie einen Fehler, bevor Sie sich auf eine Zusammenfassung verlassen.
4. Öffnen Sie die generierte Dateikarte und überprüfen Sie deren Inhalt. Öffnen Sie für eine Berechnung Notebook, um den produzierenden Code und die Laufzeit zu überprüfen.

Der [Workflow in Datenqualität](../workflows/data-quality.md) liefert ein vollständiges wissenschaftliches Beispiel. Umgebungskontrollen werden in [Notebook](../guides/notebook.md) und [Laufzeiten](../guides/runtimes.md) erklärt.

## Lesewerkzeug-Aktivität {/* #read-tool-activity */}

| UI-Element | Bedienung |
| --- | --- |
| Tätigkeitsgruppe | Erweitert die in diesem Lauf gruppierten Operationen. |
| Werkzeug / Agent SDK / Notebook Lauf | Öffnet Betriebsdetails, soweit verfügbar. Lesen Sie Eingaben, Antwort und Fehler statt nur das Gruppenlabel. |
| Kopiercode/Code-Offenlegung | Kopiert oder enthüllt den eingereichten Code; Es wird kein zweiter Durchlauf ausgeführt. |
| Erlauben / Autorisierungsumfang / Verweigern | Steuert den angezeigten Vorgang und den gewählten Umfang. Überprüfen Sie, welcher Agent dies beantragt. |
| Generierte Dateikarte | Öffnet das tatsächlich gespeicherte Ergebnis. |
| Notebook öffnen | Öffnet Session Execution Records und Variablen. |
| Kinderaufgaben-Chip | Öffnet eine echte delegierte Aufgabe; Inspizieren Sie Ihr eigenes Transkript. |

## Vermeiden Sie gemeinsame Input-/Output-Verwirrung {/* #avoid-common-inputoutput-confusion */}

Eine hochgeladene Datei, eine Notebook-Arbeitsdatei und eine Artefaktversion sind verwandt, aber unterschiedlich. Eine in einer Liste sichtbare Datei kann möglicherweise noch nicht in einem Child-Kernel gespeichert werden. Verwenden Sie die aktuelle von der Anwendung bereitgestellte Referenz; Reparieren Sie keine nicht verfügbaren Eingaben, indem Sie einen Pfad erraten oder eine Artefaktversions-ID durch den Dateinamen ersetzen.

Eine Connector-erstellte Datei hat möglicherweise keinen erfassten Python-Produzentenblock. **Kein Erzeugerblock**, **No review for this version**, **partial**-Umgebung und **eingegrenzt**-Beweise sind sinnvolle Zustände, keine Lücken, die mit erzeugter Prosa gefüllt werden müssen. Verwenden Sie [Fehlerbehebung](../guides/troubleshooting.md) für genaue Fehler und Wiederherstellungsschritte.

Bezugsnummer der Durchführung: [notebook.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook.ts), [artefakte.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/artifacts.ts), [WorkspaceMessageItem.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/WorkspaceMessageItem.tsx).

Für unterstützte Langzeitarbeit folgen Sie [Hintergrundaufgaben und Ergebnislieferung](../guides/notebook.md#background-tasks-and-result-delivery). Überprüfen Sie den tatsächlichen Lauf und die gespeicherten Ausgaben nach der Lieferung. Environment & Packages, Compute Environment Setup und Remote Compute (SSH) bleiben aktiviert, aber ihre Laufzeit-, Netzwerk- und Hostanforderungen gelten weiterhin.

Verwenden Sie für öffentliche Webseiten [Web-Suche und Source Reading](web-search.md) mit dem eingebauten Open-Science-Agenten.
