---
title: "Unterhaltungen und wartende Anfragen"
last_update:
  date: '2026-10-09'
---

# Unterhaltungen und wartende Anfragen {/* #conversations-and-queued-requests */}

Der Composer sendet Anweisungen und Eingabereferenzen zur aktuellen Sitzung und lässt Sie Follow-ups während der Ausführung vorbereiten. **Warteschlange · Nicht gespeichert** bedeutet, dass eine in der Warteschlange stehende Anforderung noch nicht zu einer gespeicherten Transkriptanweisung geworden ist.

## Beginnen Sie mit einer Forschungsidee {/* #research-starters */}

Die leere Gesprächsseite bietet **Analyze data**, **Compare papers**, **Find literature**, **Create charts** und andere Forschungsstarter neben dem Komponisten. Verwenden Sie die Pfeile, um mehr Auswahlmöglichkeiten zu sehen.

1. Öffnen Sie **New** im beabsichtigten Projekt.
2. Wählen Sie einen Starter wie **Explain a paper**. Es füllt den Composer mit einer editierbaren Anfrage; Auswählen sendet keine Nachricht.
3. Fügen Sie das aktuelle Papier oder die Daten an, warten Sie auf den Upload und ersetzen Sie die allgemeine Anfrage durch Ihre Frage und die erwartete Ausgabe.
4. Überprüfen Sie das Modell, die Anhänge und die Anforderung und senden Sie dann. Öffnen Sie die zurückgegebenen Quellen und Dateien, bevor Sie das Ergebnis akzeptieren.

![Forschungsstarter und das kompakte Forschungspaket importieren Eintrag in ein neues Gespräch](/img/open-science/v0351/new-conversation.webp)

**Import previous research** ist der separate Eintrag für ein `.science`-Paket. Durch die Auswahl eines Forschungsstarters wird kein Paket importiert oder Beispieldaten bereitgestellt.

## Bereiten Sie eine Anfrage mit einem überprüfbaren Ergebnis vor {/* #prepare-a-request-with-a-checkable-outcome */}

Wählen Sie **New** im geplanten Projekt und geben Sie eine Anforderung in **Ask anything** ein. Benennen Sie den Input, den gewünschten Output und etwaige Methodeneinschränkungen. Für ein vollständiges Startbeispiel folgen Sie [Dein erstes Projekt](first-project.md).

| Eingang | Aktion | Prüfung vor dem Versenden |
| --- | --- | --- |
| + → Dateien anhängen | Wählen Sie eine lokale Datei aus und warten Sie auf den Upload | Vorgesehener Chip vorhanden; Keine Übertragung bleibt aktiv |
| Anlagechip | Vorschau der gestaffelten Eingabe | Name und Inhalt entsprechen den beabsichtigten Daten |
| Anhang entfernen | Entfernen des Referenzentwurfs | Löscht die ursprüngliche lokale Datei nicht |
| + → Ihre Dateien | Wählen Sie eine vorhandene Projektdatei aus | Korrektes Artefakt / Version, nicht nur ein ähnlicher Name |
| `@` | Wählen Sie eine Datei / ein Artefakt oder eine verfügbare Literaturreferenz | Wählen Sie einen tatsächlichen Vorschlag, um die Referenz zu binden |
| `/` | Wählen Sie ein verfügbares Skill | Methode ist relevant und Voraussetzungen sind vorhanden |
| `#` | Verweisen Sie auf ein Session Transkript für diese Runde | Verspricht nicht, alle Dateien/Kernel dieser Sitzung einzuschließen |
| + → Sparen als Fertigkeit | [Verwandeln Sie einen abgeschlossenen Branch in ein wiederverwendbares Skill](../skills/create.md) | Abschluss der laufenden Tätigkeit; Überprüfen Sie den Tooltip, wenn er nicht verfügbar ist, und überprüfen Sie das gespeicherte Paket |
| + → Kontext | Überprüfen Sie die aktuelle Kontextnutzung | Neue nicht gesendete Sitzungen können einen deaktivierten Eintrag haben |
| + → Review | Beantragen Sie eine Überprüfung, wenn förderfähige Arbeiten vorhanden sind | Ein Ergebnis und ein kompatibler Überprüfungspfad sind erforderlich |

Lange Klartext-Pasten über 10,000-Zeichen oder 300-Zeilen werden zu verwalteten Anhängen. **Show in text field** stellt diesen Text beim Angebot für den Editor wieder her. Zu Beginn eines leeren Composers durchsucht Up/Down den Verlauf der Eingabeaufforderung; prüfen Sie die wiederhergestellten Anhänge vor dem erneuten Senden.

## Wählen Sie, wie die Arbeit beginnt {/* #select-how-work-begins */}

Der Modellwähler wählt zwischen konfigurierten Modellen. Seine Argumentationsmöglichkeiten hängen vom Modell / Rahmen ab. Änderungen gelten für nachfolgende Anfragen, nicht für einen bereits laufenden Turn. **Agent controls** zeigt Berechtigungsmodus, Auto-Review, Specialist-Auswahl und Delegation; jede eine separate Wirkung hat.

| Sendekontrolle | Verwendung | Ergebnis/Grenze |
| --- | --- | --- |
| Nachricht senden | Idle Session, Ready Request | Speichert eine Benutzernachricht und startet die Ausführung |
| Mehr Sendeoptionen → Planen Sie zuerst | Überprüfung der Schritte vor der Ausführung | Reagieren Sie auf den Plan vor genehmigten Arbeitserlösen |
| Side-Chat | Diskutieren Sie in einem unabhängigen Tab mit eingeschränkten Tools | Neue Entwürfe erben das Gesprächsmodell und den Argumentationsaufwand; Überprüfen Sie die Side Chat-Auswahl vor dem Senden. Siehe [Side Chat](delegation.md) |
| Zweigstelle | Unabhängige Fortsetzung, sofern vorhanden | Überprüfen Sie geerbte Geschichte / Dateien; siehe [Sitzungen](sessions.md) |
| Nachricht zur Warteschlange hinzufügen | Bereiten Sie ein Follow-up während des Laufens vor | Ausstehender Antrag bleibt Nicht gespeichert, bis geliefert |
| Ausführung abbrechen | Stop Current Execution | Warten auf Stornierung; bereits gespeicherte Ergebnisse werden nicht automatisch rückgängig gemacht |

## Senden Sie präzises Feedback {/* #send-precise-feedback */}

<p className="example-label"><strong>Beispiel</strong> Eingabe- und Ausgabeprüfungen in einem Plan anfordern</p>

Wenn der Plan eine Source-Integrity- oder Output-Prüfung auslässt, fordern Sie ihn an, bevor Sie ihn genehmigen. Passen Sie die Ausgabeanforderungen unten an Ihre Aufgabe an:

```text
Add an explicit before/after SHA-256 check and reopen all three saved
outputs. Use compact sample labels in the plot, and include their exact
original column-name mapping in the CSV/report.
```

Dies wurde über **Respond to Plan → Send Plan feedback** eingereicht, gefolgt von der Genehmigung des überarbeiteten Plans. Es war keine Demonstration der Schlangenlieferung. Siehe [Planung](planning.md) für die tatsächlichen Steuerelemente und Screenshots.

Verwenden Sie für eine laufende Aufgabe die Warteschlange, wenn Sie die nächste Anweisung ändern müssen. Geben Sie an, was sich ändert und was noch erforderlich ist. Eine Nachrichtenaktualisierung autorisiert nicht selbst eine neu angeforderte Paketinstallation oder einen breiteren Dateizugriff.

## Verwalten der Warteschlange einer laufenden Aufgabe {/* #manage-a-running-tasks-queue */}

1. Geben Sie das Follow-up in Ask anything ein, während der Lauf aktiv ist.
2. Wählen Sie **Add message to queue** und erweitern Sie dann die Anzahl, um den ausstehenden Text zu lesen.
3. Verwenden Sie **Edit queued message**, um es zurück in den Composer zu bringen. Bewahren Sie einen vorhandenen Entwurf zuerst auf, wenn die App fragt.
4. **Remove queued message** entfernt das ausstehende Element, keine bereits gelieferte Anweisung.
5. Ziehen Sie den Reorder Handle. Für die Tastatur-Neuordnung, konzentrieren Sie es, drücken Sie **Raum**, um das Element zu holen, **Auf/Abwärts**, um es zu verschieben, dann **Raum**, um es fallen zu lassen.
6. **Send now** fordert die Lieferung über den unterstützten Follow-up-Pfad des Frameworks.
7. Bestätigen Sie, dass der Text als Benutzernachricht erscheint und der Agent die Änderung bestätigt.

Lesen Sie **Sending…**, **Stopping…** oder **Queued Nachricht wird nach dem aktuellen Laufende gesendet**. Einige Rahmenstaaten verschieben die Lieferung. **Nicht gerettet** bedeutet, dass der Text noch keine dauerhafte Transkriptionsnachricht ist; Bewahren Sie wichtigen anhängigen Text vor dem Schließen / Neuladen auf. Eine Branch-Warnung bedeutet, dass die Warteschlange zu einem anderen Nachrichtenpfad gehört. Beheben Sie einen Sendefehler für das vorhandene Element, bevor Sie Duplikate hinzufügen.

### Bearbeiten und Neubestellen von Follow-ups, während ein Bericht geschrieben wird {/* #edit-and-reorder-follow-ups-while-a-report-is-being-written */}

Um mehrere in der Warteschlange stehende Nachrichten zu überarbeiten, bearbeiten Sie die beabsichtigte Anforderung, passen Sie ihre Reihenfolge an und entfernen Sie dann jede Anforderung, die Sie nicht mehr benötigen:

1. Wählen Sie **Edit queued message** neben dem beabsichtigten Element. Es bewegt sich in den Komponisten und verlässt vorübergehend die Warteschlange.
2. Überarbeiten Sie den Text und wählen Sie **Add message to queue**. Überprüfen Sie erneut seine Position; Eine bearbeitete Anfrage kann am Ende zurückkehren.
3. Um die Anforderung früher zu verschieben, fokussieren Sie den **Nachricht in der Warteschlange reordern**-Handle, drücken Sie **Raum**, verwenden Sie die Pfeiltasten und drücken Sie dann erneut **Raum**.
4. Verwenden Sie **Remove queued message** neben einer Erinnerung oder Anweisung, die Sie nicht mehr benötigen.
5. Überprüfen Sie nach der Lieferung das gespeicherte Transkript auf den endgültigen Text und die endgültige Bestellung. Entfernte Anfragen sollten nicht als gelieferte Anweisungen erscheinen.

![Die beiden verbleibenden Anfragen nach Bearbeitung und Neubestellung](/img/open-science/local-todo-batch/14-queue-reordered.webp)

Prüfen Sie, ob die gelieferten Antworten dem bearbeiteten Inhalt und der Bestellung folgen. Elemente mit der Bezeichnung **Nicht gerettet** haben das gespeicherte Transkript nicht eingegeben; Kopieren Sie wichtigen nicht gesendeten Text vor dem Schließen oder Neustarten.

**Exit queued editing** beendet den Queue-Editing-Modus und lässt den Text im Composer. Beim Bearbeiten wird das Originalelement aus der Warteschlange entfernt, so dass das Beenden es nicht zurücksetzt. Um es zu behalten, überprüfen Sie den Entwurf und fügen Sie ihn erneut in die Warteschlange hinzu; Um es zu verwerfen, löschen Sie den Entwurf.

### Anlagen beim Bearbeiten aufbewahren {/* #preserve-attachments-when-editing */}

Wenn eine in der Warteschlange stehende Anforderung eine Datei enthält, bestätigen Sie, dass der Anlagechip immer noch vorhanden ist, wenn Sie den Editor erneut öffnen. Ändern Sie die Anweisungen und wählen Sie dann **Add message to queue**. Vergleichen Sie nach der Lieferung die in der gespeicherten Benutzernachricht angezeigte Datei mit der beabsichtigten Eingabe. Fragen Sie nach einer Dateiprüfsumme, wenn die genaue Dateiidentität wichtig ist.

![Die bearbeitete Anlageanforderung, die mit ihrer Datei und Prüfsumme geliefert wird](/img/open-science/sept11-completion/queue-result.webp)

### Ein Warteschlangen-Anhang wird nicht verfügbar {/* #a-queued-attachment-becomes-unavailable */}

Wenn eine bearbeitete Nachricht in der Warteschlange mit **Die verwaltete Datei oder ihre Sitzung wird gelöscht.** endet, überprüfen Sie die Anhängechips und die Originaldatei in Dateien. Bewahren Sie den Anforderungstext auf, fügen Sie die aktuelle Datei in einer neuen gewöhnlichen Nachricht erneut an und versuchen Sie es erneut. Vermeiden Sie wiederholt das Senden der gleichen veralteten Anhangreferenz. Bewahren Sie den Fehler und die Dateiidentität für einen Diagnosebericht auf, wenn der neue Anhang ebenfalls fehlschlägt.

## Leseaktivität und Abschluss {/* #read-activity-and-completion */}

Erweitern Sie eine Werkzeugkarte, um ihre Argumente, ihren Code und ihre Ausgabe zu überprüfen. Öffnen Sie nach Abschluss jedes angeforderte Ergebnis. Wenn ein Schritt fehlgeschlagen ist, verwenden Sie den ersten Fehler, um die Wiederherstellungsaktion in [Fehlerbehebung](troubleshooting.md) auszuwählen.

**Show more** erweitert eine lange Benutzeranfrage. **Copy message** und Code Copy-Steuerelemente kopieren ihren jeweiligen Inhalt. **Scroll to end** kehrt zum letzten Ereignis zurück; Die desktop-runmarks-schiene springt in einem langen gespräch zwischen den anweisungen. Durch Bearbeiten einer früheren Benutzernachricht wird eine Überarbeitung erstellt; Verwenden Sie [Sitzungen](sessions.md), um den ausgewählten Pfad zu verstehen.

| Problem | Nächste Prüfung |
| --- | --- |
| Absenden von Behinderten | Leerer Text, unvollständiger Upload oder nicht verfügbarer Sitzungszustand |
| Queue Edit abgelehnt | Bestehender Composer-Entwurf muss erhalten/geräumt werden |
| Originalanalyse geht weiter | Update-Lieferung im Vergleich zum aufgeschobenen Zustand bestätigen |
| Aufgabe wartet nach der Plangenehmigung | Eine separate Tool-Berechtigung kann noch ausstehen |
| Modell sagt Fertig, aber ein Werkzeug ist fehlgeschlagen | Überprüfen Sie den ersten Fehler und die tatsächlich gespeicherten Artefakte vor der Annahme |

## Kopieren, Herunterladen oder Vergrößern einer Antworttabelle {/* #copy-download-or-enlarge-an-answer-table */}

Bewegen oder fokussieren Sie die Antworttabelle, um **Kopiertabelle** (Markdown, CSV oder TSV), **Downloadtabelle** (CSV oder Markdown) und **Vollbild anzeigen** anzuzeigen. Wählen Sie das erforderliche Format, bestätigen Sie das Ziel und öffnen Sie die Datei erneut, um Zeilen und Kopfzeilen zu überprüfen. Diese Aktionen exportieren eine bestehende Antwort; Sie führen kein Connector erneut aus oder erstellen eine verwaltete Artefaktversion.

![Die zurückgegebene Metadatentabelle in ihrer Vollbildansicht](/img/open-science/guides-walkthrough/60-response-table.webp)

Verwenden Sie [Hintergrundaufgaben](notebook.md#background-tasks-and-result-delivery) für lang laufende Arbeiten, um den spezifischen Lauf zu öffnen oder abzubrechen. Ein Warteschlangen-Follow-up ist eine ausstehende Anweisung; eine Hintergrundaufgabe ist bereits zugelassene Arbeit. Durch das Schließen der Aufgabenliste wird die Ausführung nicht gestoppt.

Quellen: [Warteschlangenkontrollen](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx), [Zustellungskontrolle](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/workspace-message-queue-controller.ts).

## Dateien in ein Gespräch ablegen {/* #conversation-drop */}

Sie können lokale Dateien in den Konversationsbereich ziehen, nicht nur den Composer. Warten Sie, bis die Anhängechips und der Upload abgeschlossen sind, prüfen Sie die Dateinamen und senden Sie dann die Anfrage. Dropping-Dateien senden die Nachricht nicht. Um ein `.science`-Forschungspaket zu importieren, verwenden Sie **Import previous research** auf der leeren Gesprächsseite; siehe [Forschungspakete](research-packages.md).

## Erwähnen Sie eine Datei, indem Sie sie ziehen {/* #drag-file-mention */}

Ziehen Sie eine Dateikarte aus **Files** oder den Dateikopf des offenen Artefakts in den Composer. Bestätigen Sie, dass der Entwurf eine Erwähnung für die beabsichtigte Datei enthält, fügen Sie Ihre Frage hinzu und senden Sie dann. Dropping fügt Kontext in den Entwurf ein; Es wird keine Anfrage gestartet. In einem neuen Gespräch kann das Dateifeld auch eine Erwähnung liefern. Überprüfen Sie das ausgewählte Projekt und die Datei vor dem Senden.
