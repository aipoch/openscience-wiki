---
title: ".science-Forschungspakete"
description: "Exportieren Sie eine Sitzung mit ihren Dateien und Beweisen, importieren und inspizieren Sie dann die Forschungsaufzeichnungen in einem anderen Projekt."
last_update:
  date: '2026-09-20'
---

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

Die folgenden Bildschirme verwenden eine Sitzung, die den [GSE60450 Proben-QC-Tabelle](../reference/example-data.md) zusammenfasst. Vergleichen Sie in der Exportvorschau **Essential export** und **Full export**, prüfen Sie die geschätzte Größe und wählen Sie dann **Export**. Inhalt und Größe hängen von Ihrer Sitzung ab.

![Recherchierte Paket-Exportvorschau mit Essential Export, Full Export und Customize Inhalten](/img/open-science/feature-guides-2026-09/research-package-export.webp)

## Import in ein Projekt {/* #import-and-inspect-a-package */}

1. Öffnen Sie das Ziel-Projektmenü und wählen Sie **Import Session package…** oder lassen Sie eine `.science`-Datei in dieses Projekt fallen. Durch Öffnen einer zugehörigen Datei werden Sie direkt aufgefordert, das Zielprojekt auszuwählen.
2. Überprüfen Sie die Paketvorschau, den Zielort und den enthaltenen oder weggelassenen Inhalt und bestätigen Sie dann den Import.
3. Warten Sie auf die Fertigstellung und wählen Sie **Open imported Session**.
4. Überprüfen Sie die Konversationszweige und öffnen Sie die Dateien, die für die Übergabe benötigt werden. Überprüfen Sie, ob Sie die Eingaben und Ergebnisse finden können, die für Ihre nächste Aufgabe relevant sind.

## Verwenden Sie die erhaltene Forschungsaufzeichnung {/* #use-the-received-research-record */}

Die importierte Sitzung selbst bleibt schreibgeschützt. Öffnen Sie auf dem Desktop das Sitzungsmenü und wählen Sie **Fork**. Warten Sie auf **Fork completed**, öffnen Sie die neue Sitzung und prüfen Sie die geerbten Dateien, bevor Sie ein Follow-up senden. Die Quelle bleibt unverändert; Der Code läuft nicht automatisch. Siehe [Fork eine bestehende Sitzung](sessions.md#fork-session) für die Schritte und Prüfungen. Die importierte Nutzung ist von den Gesamtmengen der lokalen Aktivitäten ausgenommen.

Ein empfangenes Verifizierungsprotokoll beschreibt die vom Absender gelieferten Schecks. Das bedeutet nicht, dass dieser Computer die Prüfungen erneut ausgeführt hat. Lesen Sie die Dateiversion, die Vergleichskriterien und das Ergebnis; Siehe [Reproduzierbarkeit](reproducibility.md), wie diese Prüfungen funktionieren.

## Abbrechen oder Wiederholen einer Überweisung {/* #cancel-or-retry-a-transfer */}

**Run in background** verbirgt das Fortschrittsfenster, während die Übertragung fortgesetzt wird. Verwenden Sie **Cancel**, um zu stoppen; Das Ausblenden des Fensters storniert die Operation nicht.

Wenn die Bereinigung unvollständig ist, verwenden Sie **Retry cleanup**, bevor Sie es erneut versuchen. Nach einem Fehler ruft **Try again** die gleiche Datei und das gleiche Ziel erneut ab. Wählen Sie ein anderes Paket separat, wenn dies Ihre Absicht ist. Überprüfen Sie den vorhandenen Vorgang, bevor Sie einen zweiten Import starten, und prüfen Sie dann die importierte Sitzung und die Dateien, wenn sie abgeschlossen ist.
