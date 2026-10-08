---
title: "Reproduzierbarkeit"
description: "Führen Sie die erfassten Forschungsschritte erneut aus, vergleichen Sie ein gespeichertes Ergebnis und behalten Sie den Verifizierungsprotokoll."
last_update:
  date: '2026-10-08'
---

# Reproduzierbarkeit {/* #reproducibility */}

Verwenden Sie **Reproducibility**, um die für ein gespeichertes Ergebnis aufgezeichnete Prozedur erneut auszuführen und die neue Ausgabe mit dieser Dateiversion zu vergleichen. Der Check verbindet Eingaben, Ausführungsaufzeichnungen, Umgebungsinformationen und Output-Vergleiche, so dass Sie überprüfen können, wie ein Ergebnis erstellt wurde.

## Einsatzmöglichkeiten {/* #when-to-use-it */}

- Bevor Sie ein Ergebnis freigeben, prüfen Sie, ob die erfasste Prozedur eine übereinstimmende Ausgabe erzeugt.
- Überprüfen Sie beim Überprüfen eines Ergebnisses die Unterschiede zwischen der gespeicherten Datei und einem neuen Durchlauf.
- Wenn Sie Arbeit an einen Kollegen übergeben, behalten Sie neben den relevanten Dateien und Versionen einen Verifizierungsprotokoll.

Wählen Sie die Aktion, die Ihre Frage beantwortet:

| Aktion | Zweck |
| --- | --- |
| Reproduzierbarkeit | Führen Sie eine erfasste Prozedur erneut aus und vergleichen Sie ihre Ausgaben mit gespeicherten Versionen. |
| [Review](../specialists/reviewer.md) | Beurteilen Sie die ausgewählten Beweise und berichten Sie über die Ergebnisse der Überprüfung. |
| [Skript generieren](notebook.md) | Rekonstruieren Sie Code für die Verwendung außerhalb des ursprünglichen Notebook. |

## Vor Beginn {/* #before-starting */}

Öffnen Sie das gespeicherte Ergebnis und wählen Sie die Version aus, die Sie überprüfen möchten. Gehen Sie zu **File actions → Provenance → Reproducibility** und prüfen Sie die erfassten Eingabedateien, Notebook-Läufe und Umgebungssperren.

Lösen Sie zuerst ein beliebiges **Areas needing attention**. Eine Überprüfung hängt von den für diese Version aufgezeichneten Beweisen ab. Wenn eine frühere Ausführung fehlgeschlagen ist oder erforderliche Beweise fehlen, führen Sie den erforderlichen Code erfolgreich aus und erzeugen Sie eine neue Ergebnisversion; Der fehlende Datensatz einer alten Version wird nicht rückwirkend ausgefüllt.

Das Starten eines Checks erfordert die Desktop-Schnittstelle. Unterstützte Ausführungsaufzeichnungen sind erforderlich: Diese Funktion wiederholt nicht eine ganze Konversation oder überprüft nicht jede Art von Datei.

### Bereiten Sie die Umwelt {/* #prepare-environment */}

Für eine erste Überprüfung verwenden Sie eine App-verwaltete Python- oder R-Umgebung. Open-Science erfasst unterstützte Abhängigkeitssperren, wenn der Code ausgeführt wird. Eine Paketliste oder `pip freeze`-Ausgabe allein reicht nicht aus, um exakte Paketquellen wiederherzustellen.

1. Öffnen Sie **Settings → Runtimes**. Bereiten Sie unter der erforderlichen Sprache das **App-managed environment** vor und bestätigen Sie **Ready** und **Enable**. Siehe [Laufzeit-Einstellung](runtimes.md).
2. Bitten Sie den Agenten, diese Umgebung für die Sitzung auszuwählen und die Abhängigkeiten des ursprünglichen Codes zu überprüfen. Installieren Sie fehlende Pakete über den unterstützten Paketverwaltungsfluss, starten Sie den Kernel neu, wenn Sie dazu aufgefordert werden, und überprüfen Sie dann deren Importe im selben Notebook. Überprüfen Sie den [Aktiver Dolmetscher](runtimes.md#confirm-the-active-interpreter), bevor Sie fortfahren.
3. Führen Sie den erforderlichen Vorbereitungs- und Herstellercode mit den ursprünglichen Eingaben erneut aus und speichern Sie dann eine neue Ergebnisversion. Behalten Sie das ursprüngliche Ergebnis für den Vergleich; Ändern der Einstellungen allein aktualisiert nicht seine erfassten Beweise.
4. Öffnen Sie das **Provenance → Environment** der neuen Version, überprüfen Sie das Schloss und die fehlende Paketdiagnose und kehren Sie dann zu **Reproducibility** zurück. Fahren Sie fort, wenn **Check reproducibility** verfügbar ist und die erforderlichen Eingänge und Läufe vorhanden sind.

Wenn die vorhandene Umgebung noch keine exakten Sperren hat, aktivieren Sie **Settings → Runtimes → Let the Agent create environments** und fordern Sie eine separate App-verwaltete Umgebung mit den ursprünglichen Analyseabhängigkeiten an. Lassen Sie es vom Agenten auswählen und die erforderlichen Importe überprüfen, und wiederholen Sie dann die Schritte 3–4. Behalten Sie die bestehende Umgebung; Ändern Sie die Analysemethode nicht, nur um den Scheck zur Verfügung zu stellen.

Wenn die neue Version weiterhin **Unavailable** anzeigt, behalten Sie **View details**, die Paketnamen/Versionen und die ausgewählte Laufzeit bei. Lösen Sie alle gemeldeten [Paketquelle-Verbindungsfehler](network.md) vor dem erneuten Ausführen. Wenn die Sperre immer noch nicht erfasst werden kann, stoppen und verwenden Sie [Fehlerbehebung](troubleshooting.md); Lassen Sie das Ergebnis nicht verifiziert.

<p className="example-label"><strong>Praxisbeispiel</strong> Prüfen einer Proben-QC-Zusammenfassung</p>

Der Screenshot zeigt eine Zusammenfassung, die in Notebook aus dem [GSE60450 Proben-QC-Tabelle](../reference/example-data.md) generiert wurde. Öffnen Sie die Registerkarte **Provenance → Reproducibility** der Datei, um die erfassten Eingaben zu überprüfen und auszuführen. Hier zeigen **Not verified yet** und **Unavailable** an, dass eine genaue Umgebungssperre fehlt. Verwenden Sie **View details** und folgen Sie dann dem [Maßnahmen zur Vorbereitung der Umwelt](#prepare-environment), um eine neue Version zu erstellen. Dieser Bildschirm zeigt keine erfolgreiche Reproduktion der Ergebnisse.

![Die gespeicherte QC-Zusammenfassung und ihr Reproduzierbarkeits-Panel zeigen erfasste Beweise und eine nicht verfügbare Überprüfung](/img/open-science/feature-guides-2026-09/reproducibility-evidence.webp)

## Führen Sie eine Überprüfung durch {/* #run-a-check */}

1. Bestätigen Sie in **Reproducibility** die ausgewählte Ergebnisversion und ihre Eingaben.
2. Wählen Sie **Check reproducibility** oder **Check again** für einen anderen Versuch.
3. Wenn Sie einen gespeicherten Startpunkt mit **Check from here** auswählen, prüfen Sie **Files to restore** und **Runs to execute**, dann wählen Sie **Start check**. Eine frühere Vorbereitung ist möglicherweise noch erforderlich, wenn ein Schritt vom vorherigen Notebook-Zustand abhängt.
4. Folgen Sie dem Fortschritt und dem Protokoll. Die Überprüfung stellt die aufgezeichneten Eingaben und die Umgebung isoliert wieder her. Verwenden Sie **Cancel**, wenn Sie aufhören müssen.
5. Wenn der Check abgeschlossen ist, öffnen Sie die Vergleichsdetails jeder Ausgabe, bevor Sie entscheiden, ob das Ergebnis übereinstimmt.

Das Sitzungsmenü bietet auch **Check session artifacts** zum Überprüfen mehrerer erfasster Ergebnisversionen. Prüfen Sie die zulässigen Versionen und ihre individuellen Ergebnisse; Eine sitzungsbasierte Aktion stellt nicht fest, dass jedes Ergebnis überprüft wurde.

## Lesen Sie das Vergleichsergebnis {/* #read-the-comparison-result */}

| Ergebnis | Was als nächstes zu tun ist |
| --- | --- |
| Ergebnis reproduziert | Überprüfen Sie die aufgezeichneten Vergleichskriterien und bewahren Sie sie mit der Schlussfolgerung auf. |
| Ergebnis weicht ab | Überprüfen Sie die unterschiedlichen Dateien und Vergleichsdetails, bevor Sie entscheiden, ob sich der Unterschied auf Ihre Arbeit auswirkt. |
| Noch nicht verifiziert | Keine abgeschlossene Überprüfung stellt eine Übereinstimmung für diese Version fest. Überprüfen Sie die verfügbaren Beweise und starten Sie eine Prüfung, wenn Sie bereit sind. |
| Check gestoppt / Check abgebrochen | Lesen Sie das Protokoll, beheben Sie die gemeldete Ursache, wenn nötig, dann versuchen Sie es erneut. Stornierung ist kein Vergleichsergebnis. |

Ein abgeschlossener Lauf allein belegt nicht, dass die Ausgaben übereinstimmen. Byte-Gleichheit, begrenzte Bild-Tabellen-Vergleiche und wissenschaftliche Kriterien beantworten unterschiedliche Fragen. Übereinstimmende Ausgaben nach den erfassten Kriterien bestätigen nicht die Gültigkeit der wissenschaftlichen Methode.

## Speichern und Teilen des Verifizierungsprotokolls {/* #save-and-share-the-verification-record */}

1. Wählen Sie **Export verification record** und speichern Sie den Datensatz.
2. Öffnen Sie die heruntergeladene Datei erneut und prüfen Sie, welche Quelldatei, Version und welches Vergleichsergebnis sie beschreibt.
3. Bewahren Sie die relevanten Quelldateien und Versionen mit diesem Datensatz auf. Bevor Sie reproduzierte Ausgaben löschen, überprüfen Sie die Aufbewahrungskontrollen und speichern Sie die Dateien, die Sie benötigen.

Um konversationszweige, dateien und beweise zusammen zu übergeben, verwenden sie einen [.science Forschungspaket](research-packages.md). Ein vom Absender gelieferter Datensatz bedeutet nicht, dass der empfangende Computer die Überprüfung erneut durchgeführt hat.

## Wenn ein Check nicht abgeschlossen werden kann {/* #when-a-check-cannot-finish */}

Überprüfen Sie **Areas needing attention** und die erste relevante Protokollnachricht. Fehlende Eingaben, unvollständige Beweise oder nicht unterstützte Operationen können eine Überprüfung verhindern. Große RDS/H5AD-Dateien werden nicht für den Inhaltsvergleich geladen; Das Fehlen eines Vergleichs führt nicht zu einer Übereinstimmung.

v0.30.2 behebt die Wiedergabe von Eingaben, die zuvor in derselben Runde erstellt wurden, und unterstützt Python-Standardbibliotheksimporte sowie Windows-Verifizierungs-Umgebungs-Pip-Einstiegspunkte. Wenn eine ältere Version bei einem dieser Schritte gestoppt wurde, aktualisieren und wiederholen Sie das gleiche erfasste Ergebnis, und prüfen Sie das neue Protokoll und den Vergleich. Diese Fixes liefern keine fehlende Umgebungssperre oder machen jeden historischen Lauf wiederspielbar.

Wenn die Vorbereitung von einem früheren Notebook-Zustand abhängt, inspizieren Sie den [Ausführungsnachweis](notebook.md) und führen Sie die erforderliche Vorbereitung erneut aus, bevor Sie ein neues Ergebnis generieren. Halten Sie angehaltene oder unvollständige Prüfungen getrennt von abgeschlossenen Vergleichen.

Wenn Sie bereits ein unterstütztes Lock-Bundle haben und Pakete außerhalb der Anwendung wiederherstellen müssen, folgen Sie dem [Laufzeitwiederherstellungsbedingungen](runtimes.md#conditional-restore). Dieses Verfahren schafft keine fehlende Sperre oder ersetzt die obige Zubereitung. Das Wiederherstellen von Abhängigkeiten allein stellt nicht fest, dass sich Outputs reproduzieren.

## Überprüfen Sie die Geschichte vor dem Wiederholen {/* #replay-vs-verification */}

Verwenden Sie [Session Replay](session-replay.md), um die aufgezeichnete Reihenfolge der Nachrichten, die Tool-Aktivität und die Dateiversionen zu überprüfen. Replay zeigt gespeicherte Beweise mit rekonstruiertem Präsentations-Timing; es führt keinen Code erneut aus, fragt Datenbanken erneut ab oder stellt fest, dass ein Ergebnis reproduziert wird. Verwenden Sie **Reproducibility** oben, wenn Sie einen neuen Ausführungs- und Ausgabevergleich benötigen.
