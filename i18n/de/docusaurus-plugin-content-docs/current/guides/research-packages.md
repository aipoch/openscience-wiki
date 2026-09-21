---
title: ".science-Forschungspakete"
description: "Exportieren Sie eine Sitzung mit ihren Dateien und Beweisen, importieren und inspizieren Sie dann die Forschungsaufzeichnungen in einem anderen Projekt."
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# .science-Forschungspakete {/* #science-research-packages */}

Ein **.science** Forschungspaket bringt Konversationszweige, Dateien und aufgezeichnete Beweise für eine Übergabe zusammen. Ein Kollege kann es in ein Projekt importieren und die Forschungsaufzeichnung inspizieren. Importierte Sessions sind Read-only. Verwenden Sie von v0.31.0 aus **Fork** in der Desktop-App, um eine beschreibbare Kopie zu erstellen und die Recherche fortzusetzen.

## Wählen Sie, was zu teilen {/* #choose-what-to-share */}

| Was der Empfänger braucht | Ausfuhr in die Verwendung |
| --- | --- |
| Lesen oder Bearbeiten des Konversationstextes | [Konversation PDF oder Markdown](sessions.md). |
| Verwenden Sie ausgewählte Originaldateien | [Datei-Downloads oder ein Artefakt ZIP](files.md). |
| Überprüfen Sie die Konversation Zweige, Dateien und Beweise zusammen | A `.science` Forschungspaket. |

Ein Paket kann hochgeladenes Forschungsmaterial, Konversationstext und generierte Ergebnisse enthalten. Überprüfen Sie den Inhalt vor dem Teilen. Es handelt sich um eine unabhängige Kopie: Durch das Löschen lokaler Arbeiten werden keine Pakete entfernt, die bereits an andere gesendet wurden.

Side Chat-Konversationen, private [Lesebuchzeichen](bookmarks.md) und deren Notizen sind vom Paket ausgeschlossen. Setzen Sie die Informationen, die der Empfänger benötigt, in einen gespeicherten Bericht oder die Konversation ein, bevor Sie exportieren.

## Exportieren eines Forschungspakets {/* #export-the-session */}

1. Beenden oder beenden Sie die Arbeit in der Sitzung. Öffnen Sie das Menü und wählen Sie **Export → Export Session package**.
2. Überprüfen Sie den Ausfuhrumfang und alle ausgelassenen Inhalte oder Größenbeschränkungen.
3. Bestätigen Sie den Export und speichern Sie die `.science`-Datei im vorgesehenen Ordner.
4. Folgen Sie dem Fortschritt, bis er abgeschlossen ist, und verwenden Sie dann **Show in folder**, um die Datei zu finden.

| Ausfuhroption | Wie man wählt |
| --- | --- |
| Export wesentlicher Inhalte | Bewahren Sie die wesentlichen Datensätze und Literaturmetadaten auf; optionale Literatur PDFs weglassen. |
| Vollständiger Export | Fügen Sie verfügbare Literatur PDFs und die zusätzlichen Inhalte in der Vorschau angezeigt. |
| Inhalte anpassen | Wählen Sie einzelne Literatur PDFs, optionale Dateien und Versionen; erforderliche Nachweise bleiben enthalten. |

Literatur-Metadaten sind immer enthalten. Wenn eine Literatur PDF erforderlich ist, ist **Essential export** nicht verfügbar; Verwenden Sie **Full export** oder **Customize contents** und behalten Sie die erforderliche Datei. Der Exporteur holt die fehlenden Volltexte nicht ab. Überprüfen Sie die aufgeführten PDFs und die Größe, bevor Sie bestätigen; **Full export** entfernt nicht jede Größe oder Inhaltsgrenze.

<p className="example-label"><strong>Praxisbeispiel</strong> Übergeben Sie eine Beispiel-QC-Sitzung</p>

Dieses Beispiel in Open-Science v0.31.1 exportiert eine Sitzung, die das [GSE60450 Proben-QC-Tabelle](../reference/example-data.md) zusammenfasst, es in ein anderes Projekt auf demselben Mac importiert und von einer Fork aus mit **Codex subscription** fortfährt. Beginnen Sie mit der abgeschlossenen Sitzung, die `gse60450-qc-summary.csv` enthält; Die Eingabetabelle allein ist nicht das Forschungspaket.

Wählen Sie **Essential export**, überprüfen Sie den Inhalt und die geschätzte Größe, dann **Export**. Die Vorschau dieser Sitzung schätzte **805.6 KiB**. Warten Sie auf **Package operation completed**, bevor Sie die gespeicherte Datei importieren; Die Größe Ihrer Sitzung wird sich unterscheiden.

![Aktuelle Exportoptionen für QC-Sitzungen und geschätzte Größe](/img/open-science/v0311/package-export.webp)

## Import in ein Projekt {/* #import-and-inspect-a-package */}

1. Öffnen Sie das Ziel-Projektmenü und wählen Sie **Import Session package…** oder lassen Sie eine `.science`-Datei in dieses Projekt fallen. Durch Öffnen einer zugehörigen Datei werden Sie direkt aufgefordert, das Zielprojekt auszuwählen.
2. Überprüfen Sie die Paketvorschau, den Zielort und den enthaltenen oder weggelassenen Inhalt und bestätigen Sie dann den Import.
3. Warten Sie auf die Fertigstellung und wählen Sie **Open imported Session**.
4. Überprüfen Sie die Konversationszweige und öffnen Sie die Dateien, die für die Übergabe benötigt werden. Überprüfen Sie, ob Sie die Eingaben und Ergebnisse finden können, die für Ihre nächste Aufgabe relevant sind.

Wählen Sie in diesem Beispiel das Zielprojekt **Public Genomics Examples** aus. Die Importvorschau listet **1 Branch, 3 Nachrichten und 13 Dateien** auf. Es heißt auch, dass Kontoanmeldeinformationen, Berechtigungszuschüsse und Anbieterfortsetzungsidentitäten ausgeschlossen sind. Überprüfen Sie diese Details, bevor Sie **Import** auswählen.

![QC-Paketvorschau vor dem Import in das Zielprojekt](/img/open-science/v0311/package-import-preview.webp)

Öffnen Sie die importierte Sitzung und die Zusammenfassung CSV. Der **Imported research history**-Hinweis bestätigt, dass diese Kopie schreibgeschützt ist und keinen Code ausführen oder eine Konversation direkt fortsetzen kann.

![Importierter QC-Record mit geerbter Zusammenfassung und Fork to Continue-Button](/img/open-science/v0311/package-import-readonly.webp)

## Verwenden Sie die erhaltene Forschungsaufzeichnung {/* #use-the-received-research-record */}

1. Wählen Sie **Fork to continue** in der importierten Sitzung oder **Fork** aus dem Sitzungsmenü. Warten Sie auf **Fork completed** und öffnen Sie die neue Sitzung. Code läuft nicht automatisch.
2. Überprüfen Sie die geerbte Zusammenfassung, wählen Sie ein verfügbares Modell aus und bestätigen Sie, dass eine Python-Laufzeit bereit ist. In diesem Beispiel wurde **Codex subscription / gpt-5.6-sol** verwendet. Importierte Anmeldeinformationen und Berechtigungen bieten keine Autorisierung für die empfangende Installation.
3. Senden Sie die folgende Aufforderung. Wenn eine Python-Genehmigung angezeigt wird, prüfen Sie die angeforderte Berechnung und genehmigen Sie, dass sie fortgesetzt wird.

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. Öffnen Sie beide neuen Dateien. Dieser Lauf lieferte **12**-Proben, eine Gesamtrohzahl von **269027617** und einen Mittelwert von **22418968.08333333333333333333**. Der Mittelwert fasst die gelieferte QC-Tabelle zusammen; Es ist kein normalisierter Ausdruck oder ein Differenzausdruckergebnis.

![Fork abgeschlossen und die neuen Berechnungsdateien mit Codex erstellt](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">Vererbte Zusammenfassung</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">Neue Berechnung</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">Berechnungshinweise</ExampleDownload>

Die beiden neuen Dateien werden im Fork gespeichert. Die Zusammenfassungsdateien der ursprünglichen und der importierten Sitzung bleiben unverändert. Siehe [Fork einer bestehenden Sitzung](sessions.md#fork-session). Importierte Nutzung wird nicht zu den lokalen Aktivitätssummen gezählt.

Ein empfangenes Verifizierungsprotokoll beschreibt die vom Absender gelieferten Schecks. Das bedeutet nicht, dass dieser Computer die Prüfungen erneut ausgeführt hat. Lesen Sie die Dateiversion, die Vergleichskriterien und das Ergebnis; Siehe [Reproduzierbarkeit](reproducibility.md), wie diese Prüfungen funktionieren.

## Abbrechen oder Wiederholen einer Überweisung {/* #cancel-or-retry-a-transfer */}

**Run in background** verbirgt das Fortschrittsfenster, während die Übertragung fortgesetzt wird. Verwenden Sie **Cancel**, um zu stoppen; Das Ausblenden des Fensters storniert die Operation nicht.

Wenn die Bereinigung unvollständig ist, verwenden Sie **Retry cleanup**, bevor Sie es erneut versuchen. Nach einem Fehler ruft **Try again** die gleiche Datei und das gleiche Ziel erneut ab. Wählen Sie ein anderes Paket separat, wenn dies Ihre Absicht ist. Überprüfen Sie den vorhandenen Vorgang, bevor Sie einen zweiten Import starten, und prüfen Sie dann die importierte Sitzung und die Dateien, wenn sie abgeschlossen ist.
