---
title: "Wiedergabe und Besprechen einer aufgezeichneten Sitzung"
last_update:
  date: '2026-10-08'
---

# Wiedergabe und Besprechen einer aufgezeichneten Sitzung {/* #replay-and-discuss-a-recorded-session */}

Session Replay präsentiert die Nachrichten, Tool-Schritte und Dateiversionen, die in einer Sitzung gespeichert sind. Verwenden Sie es, um einer Analyse zu folgen, ihre Beweise zu finden und eine fokussierte Frage zu stellen. Die Wiedergabe führt keinen Code erneut aus oder stellt fest, dass eine Analyse reproduzierbar ist; Verwenden Sie [Überprüfung der Reproduzierbarkeit](reproducibility.md) für diese separate Aufgabe.

## Öffnen Sie ein Replay {/* #open-replay */}

1. Öffnen Sie das Aktionsmenü der Sitzung in der Seitenleiste und wählen Sie **View replay**. Für eine importierte `.science`-Sitzung bietet das **Imported research history**-Panel auch **View replay** an.
2. Überprüfen Sie den Sitzungstitel und den Branch. Wenn **Replay branch** angeboten wird, wählen Sie den Zweig aus, den Sie inspizieren möchten.
3. Verwenden Sie **Enter full screen** für mehr Platz. **Exit full screen** kehrt zum Arbeitsbereich zurück; Das Schließen der Vorschau löscht die Sitzung nicht.

Importierte Forschung bleibt Read-only. Sie können es prüfen und diskutieren; Wählen Sie **Fork to continue**, wenn Sie eine beschreibbare Fortsetzung benötigen. Folgen Sie [Forschungspaket Import](research-packages.md#import-and-inspect-a-package), bevor Sie seine Wiederholung öffnen.

## Folgen Sie den aufgezeichneten Schritten {/* #playback-controls */}

| Kontrolle | Aktion |
| --- | --- |
| Play replay / Pause replay | Start- oder Pausendarstellung der gespeicherten Sequenz |
| Previous step / Next step | Wechseln Sie zu einem benachbarten aufgezeichneten Schritt |
| Replay progress | Suchen Sie nach einem anderen Punkt in der Aufzeichnung |
| Playback speed | Geschwindigkeit der Präsentation ändern; Dies beschleunigt eine Berechnung nicht |
| Browse steps | Wählen Sie eine Nachricht, einen Werkzeugschritt oder ein Dateiversionsereignis nach seinem Label aus |
| Notebook / View files | Überprüfen Sie das aufgezeichnete Notebook-Material oder die Dateiliste, die zu diesem Zeitpunkt verfügbar ist |
| Watch again | Neustart nach Erreichen der Wiedergabe abgeschlossen |

Erweitern Sie eine Werkzeugkarte, um ihre beibehaltenen Ein- und Ausgänge zu lesen. Überprüfen Sie Dateinamen und Versionsnummern, bevor Sie ein Ergebnis verwenden. Die Wiedergabeposition wird beibehalten, um zur gleichen Aufzeichnung zurückzukehren. Ältere Sitzungen können eine Zeitleiste zeigen, die aus archivierten Datensätzen rekonstruiert wurde; seine Präsentationsdauer ist kein Benchmark der ursprünglichen Berechnung.

<p className="example-label"><strong>Praxisbeispiel</strong> Besprechen Sie die Beweise in einer TP53-Weganalyse</p>

Dieses Beispiel öffnet den aufgezeichneten [Pathway Commons-Analyse](../workflows/inspect-pathway.md), der Reactome **Transkriptionelle Regulierung durch TP53** ausgewählt hat. Der Export enthält 3,318-Interaktionsdatensätze und 387-Knoten. Das sind Ergebnisse dieser gespeicherten Analyse, die nicht von jeder zukünftigen Abfrage zu erwarten sind.

Suchen Sie in **Browse steps** das exportierte Netzwerk, die ursprünglichen Antworten, die Forschungsnotiz und die kleine Interaktionstabelle TP53–MDM2–CDKN1A. Das Beispiel hat 12 aufgezeichnete Schritte. Wählen Sie den Dateiversionsschritt der Tabelle aus und lesen Sie dann die vorhergehende Erklärung des Netzwerkumfangs.

![Die echte TP53-Wiedergabe mit ihren aufgezeichneten Schritten, Dateiversionen und Wiedergabekontrollen](/img/open-science/v0350/replay-step-list.webp)

## Fragen Sie nach einem Schritt {/* #discuss-replay */}

1. Halten Sie bei dem entsprechenden Schritt an und wählen Sie **Ask about this step**. Für eine breitere Diskussion verwenden Sie **Ask about this research** im Header.
2. Wählen Sie in **Ask in a conversation** eine beschreibbare Konversation oder **New conversation** aus. Die Aktion fügt einem Entwurf einen Kontext hinzu; Sie stellt keine Frage von sich aus.
3. Überprüfen Sie den **Discuss**-Anhang und sein Sitzungs- / Schritt-Etikett. Geben Sie Ihre Frage ein, wählen Sie ein verbundenes Modell und wählen Sie **Send**. Das Beispiel verwendet **Codex subscription**.
4. Wenn eine Werkzeuggenehmigung beantragt wird, prüfen Sie den vorgeschlagenen Zugriff, bevor Sie den erforderlichen Vorgang zulassen. Dann vergleichen Sie die Antwort mit dem gespeicherten Beweis und seinem Quellkontext.

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

Die Antwort identifiziert `tp53_mdm2_cdkn1a_readable_interactions.tsv` und unterscheidet, was der abgeflachte Export von einer biologischen Schlussfolgerung enthält. Es zeigt auf die ausgewählte Quellsitzung, Branch und Step. Lesen Sie diese Quelle noch einmal, bevor Sie die Interpretation übernehmen; Ein verknüpfter Datensatz macht nicht jeden Modellanspruch korrekt.

![Die abgeschlossene Codex Diskussion neben der aufgezeichneten TP53 Analyse](/img/open-science/v0350/replay-answer.webp)

## Wenn Beweise nicht verfügbar sind {/* #replay-evidence */}

Ein aufgezeichneter Werkzeugaufruf kann auch dann sichtbar bleiben, wenn die ursprüngliche Ausführungsumgebung nicht verfügbar ist. Lesen Sie den gespeicherten Code und die Ausgabe; die Umgebungswarnung nicht als neues Ausführungsergebnis zu behandeln.

Wenn eine Datei **Vorschau nicht verfügbar** oder **The recorded evidence is unavailable** meldet, überprüfen Sie die Dateikarte der ursprünglichen Sitzung und die ausgewählte Version. Wenn diese Ansicht sie auch nicht öffnen kann, verwenden Sie eine separat aufbewahrte Originaldatei oder erhalten Sie ein vollständiges Forschungspaket von ihrem Autor. Ein Dateiname und eine vollständige Wiedergabezeitleiste beweisen nicht, dass der Inhalt der Datei verfügbar ist. Besprechen Sie nur die Beweise, die Sie tatsächlich inspizieren können.

Für eine neue Berechnung, [Abzweigen der Sitzung](sessions.md#fork-session), liefern Sie die erforderlichen Dateien / Umgebung und führen Sie die Analyse aus. Um einen neuen Lauf mit einem gespeicherten Artefakt zu vergleichen, verwenden Sie [Überprüfung der Reproduzierbarkeit](reproducibility.md), nicht den **Completed**-Indikator der Wiederholung.
