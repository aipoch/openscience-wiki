---
title: "Delegation und Side Chat"
last_update:
  date: '2026-09-22'
---

# Delegation und Side Chat {/* #delegation-and-side-chat */}

Verwenden Sie Side Chat, um eine Frage neben Ihrer aktuellen Aufgabe zu besprechen, oder delegieren Sie, um einem anderen Agenten eine separate Aufgabe zu geben. Um eine vollständige Konversation in eine andere Richtung fortzusetzen, verwenden Sie ein [Sitzungszweig](sessions.md).

## Side Chat {/* #side-chat-availability */}

### Einsatzmöglichkeiten {/* #when-to-use-it */}

Öffnen Sie Side Chat, um einen Begriff in einem Analyseergebnis zu erklären, zwei Ansätze zu vergleichen oder zu diskutieren, wie ein Bericht formuliert wird. Senden Sie nach der Diskussion den von Ihnen gewählten Rat an das Hauptgespräch, Main.

### Bedienung {/* #how-to-use-it */}

1. Öffnen Sie in einer vorhandenen Sitzung **More send options → Side chat** neben dem Send-Button. Sie können es mit einem leeren Composer öffnen: Ein neuer Side Chat-Entwurf erscheint sofort. Schreiben Sie die Frage dort, überprüfen Sie das Modell und den Argumentationsaufwand und senden Sie es dann.
2. Lesen Sie die Antwort in der unabhängigen **Side chat**-Vorschau. Verwenden Sie **Side chat follow up**, um weitere Fragen zu stellen. Sie können mehrere Nebendiskussionen unter derselben Sitzung führen und zwischen ihren Registerkarten wechseln, während Sie weiterhin Main verwenden.
3. Um Ratschläge mit Main zu teilen, bitten Sie Side Chat ausdrücklich, sie weiterzuleiten. Zum Beispiel: "Senden Sie diesen Rat an Main: Erklären Sie die Behandlung des fehlenden Wertes in einem separaten Teil des Berichts." Überprüfen Sie die Nachricht mit der Bezeichnung **Side chat** in Main. Wenn Main im Leerlauf ist, senden Sie Ihre nächste Anfrage, um die Arbeit fortzusetzen.
4. Mit **Cancel Side chat response** stoppen Sie die aktuelle Antwort. Wechseln Sie den Tab oder klappen Sie den Vorschaubereich ein, um zu Main zurückzukehren. Übertragen Sie Inhalte, die Sie nach einem App-Neustart noch benötigen, vorher an Main oder speichern Sie sie in einem Bericht.

Ein Entwurf, der Text oder Anmerkungen enthält, überlebt das Umschalten von Ansichten. Ein unberührter leerer Entwurf wird verworfen, wenn Sie ihn verlassen; Das Öffnen eines Entwurfs allein sendet keine Modellanforderung.

### Eine Anmerkung in den passenden Entwurf verschieben {/* #move-an-annotation-to-the-right-draft */}

Verwenden Sie für eine ausgewählte Passage oder Region die **Move to Side chat…**-Aktion der Annotation und wählen Sie eine vorhandene Nebendiskussion oder eine neue aus. Sie können auch Anmerkungen zwischen Main und einem Side Chat-Entwurf ziehen. Überprüfen Sie das Ziel und den übertragenen Inhalt vor dem Senden: Verschieben einer Anmerkung bereitet einen Entwurf vor; Sie stellt keinen Antrag.

Private **For me**-Lesezeichen sind ein anderes Lesewerkzeug; siehe [Lesebuchzeichen](bookmarks.md).

### Wichtige Hinweise {/* #things-to-know */}

- **Modelleinstellungen:** Ein neues Side Chat erbt das aktuelle Hauptgesprächsmodell und den Argumentationsaufwand. Sie können sie in Side Chat ändern; die Auswahl gilt für den nächsten Versand. Codex Abonnements werden unterstützt. Überprüfen Sie den Selektor vor dem Senden.
- **Übermittlung und Aktionen:** Gewöhnliche Antworten werden nicht automatisch an Main gesendet. Side Chat kann die Berechtigungen von Main nicht erteilen; Bestätigen Sie die Lieferung, bevor Sie Main auffordern, Maßnahmen zu ergreifen.
- **Einen Tab schließen:** Lesen Sie **Close Side chat?**, bevor Sie bestätigen. Das Schließen stoppt diesen Side Chat und entfernt seinen Gesprächsverlauf. Mit **Cancel** behalten Sie ihn. Um nur zu Main zurückzukehren, wechseln Sie den Tab oder klappen den Vorschaubereich ein. Schlägt die Bereinigung fehl, erscheint der Tab mit einer Fehlermeldung erneut.
- **Die App neu starten:** Side-Chat-Verläufe und noch nicht an Main übermittelte Hinweise bleiben nur während der aktuellen App-Ausführung erhalten. Nach einem Neuladen der Oberfläche oder einem Projektwechsel kann dieser Arbeitsspeicherzustand wieder verbunden werden. Ein vollständiger Neustart der App löscht ihn. Übermitteln Sie wichtige Hinweise vor dem Beenden an Main oder speichern Sie sie in einem Bericht. Bereits in Main gespeicherte Nachrichten bleiben erhalten.
- **Verfügbarkeit:** In v0.30.2 blockiert Main, das läuft oder auf die Genehmigung wartet, Side Chat nicht von selbst. Senden Sie zuerst mindestens eine Nachricht in Main. Nur schreibgeschützt importierte Sitzungen und nicht verfügbare Elternsitzungen können Side Chat nicht öffnen. Side Chat akzeptiert keine Dateianhänge. Folgen Sie der eigentlichen Button-Erklärung; Verbindungsprobleme werden in [Fehlerbehebung](troubleshooting.md) behandelt.

## Aufgaben delegieren {/* #task-delegation */}

### Einsatzmöglichkeiten {/* #when-to-use-it-1 */}

Delegieren Sie Arbeiten, die unabhängig bearbeitet werden können, z. B. das Überprüfen von Literaturquellen, das Überprüfen einer Datendatei oder das Überprüfen von Analyseergebnissen, und lassen Sie den Hauptagenten die Ergebnisse kombinieren. Für wiederverwendbare Assistenten mit definierten Rollen siehe [Specialist Delegation](../specialists/delegate.md).

### Bedienung {/* #how-to-use-it-1 */}

1. Überprüfen Sie **Delegation** im **Agent controls** des Komponisten.
2. Wählen Sie in **Settings → Model → Subagent** die Vererbung aus dem Hauptmodell oder konfigurieren Sie ein kompatibles separates Modell und den Argumentationsaufwand.
3. Beschreiben Sie die zu delegierende Aufgabe, ihre Eingabedateien, die erwartete Ausgabe und die Annahmekriterien in Ihrer Anfrage.
4. Folgen Sie dem Status der Teilaufgabe in den Aktivitätseinträgen und reagieren Sie auf alle Berechtigungsanforderungen.
5. Öffnen Sie die zurückgegebenen Dateien oder Quelllinks, um das Ergebnis zu überprüfen. Um die Ausführungsaufzeichnungen zu überprüfen, wählen Sie den entsprechenden Eigentümer in Notebook's **Agent** Filter.

### Wichtige Hinweise {/* #things-to-know-1 */}

- Die verfügbaren Funktionen hängen vom Agent-Framework und der Konfiguration ab. Überprüfen Sie nach dem Aktivieren der Delegation die Aktivitätseinträge, um zu bestätigen, dass eine Teilaufgabe tatsächlich gestartet wurde.
- Subagenten teilen möglicherweise nicht alle Main-Kontext- oder Python-Variablen. Geben Sie die für die Aufgabe erforderlichen Dateien und Anweisungen an.
- Die Genehmigung des Main-Plans genehmigt nicht automatisch jede Subagentenaktion. Überprüfen Sie die spezifische Aktion und den Umfang, wenn die Berechtigung angefordert wird.
- Wenn **Release** verfügbar ist, verwenden Sie es, um die Teilaufgaberessource zu beenden oder freizugeben. Die Beweise von Main bleiben erhalten.
