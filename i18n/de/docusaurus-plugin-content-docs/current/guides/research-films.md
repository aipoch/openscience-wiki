---
title: "Erstellen und Teilen eines Forschungsfilms"
last_update:
  date: '2026-11-25'
---

# Erstellen und Teilen eines Forschungsfilms

Verwandeln Sie ein abgeschlossenes Gespräch in eine kurze kommentierte Präsentation für ein Gruppentreffen oder eine Projektübergabe. Open-Science baut den Film aus einer eingefrorenen Aufzeichnung der Sitzung auf und generiert lokal englische Erzählungen. Film Authoring verwendet immer noch Ihr konfiguriertes Modell. Das Ergebnis erklärt bestehende Arbeiten; es führt die Analyse nicht erneut durch oder bescheinigt ihre Schlussfolgerungen.

## Bereiten Sie die Sitzung und Erzählung vor {/* #prepare-film */}

1. Verwendung der **Desktop App App** Öffnen Sie die Sitzung und den Branch, den Sie präsentieren möchten. Beenden Sie zuerst die aktuelle Antwort. Eine leere Sitzung oder eine, die noch auf eine Antwort wartet, kann keinen Film erzeugen.
2. Überprüfen Sie die aufgezeichneten Eingaben, Ergebnisse und Einschränkungen. Entfernen Sie empfindliches Material aus der Quelle, die Sie teilen möchten, bevor Sie beginnen; Überprüfen Sie den generierten Film separat, bevor Sie ihn verteilen.
3. In **Settings → Model**Bestätigen Sie ein kompatibles Hauptmodell und Arbeitsanmeldeinformationen. Ein bestehendes Codex-Abonnement kann mit der Codex-Laufzeit ausgewählt bleiben.
4. Offen **Local capabilities → Research narration → Install**. Warten auf **Installed**. Diese Ressourcen bieten englische Sprache und werden für spätere Filme wiederverwendet. Alternativ bietet der Filmdialog **Install and generate** Wenn Narration fehlt.

Die Sprachmaschine läuft lokal nach der Installation, aber das modellbasierte Film-Authoring verwendet den ausgewählten Anbieter. Halten Sie den Computer am Laufen und genügend freien Speicherplatz für generierte Medien zur Verfügung.

## Generieren und Watch {/* #generate-film */}

1. Öffnen Sie **Session actions → Generate research film**. In der Wiederholung ist die gleiche Aktion unter **Mehr Maßnahmen** verfügbar.
2. Wählen Sie **Film mode → Research explanation**, um die Frage, Methoden und Ergebnisse zu erklären, oder **Operation replay**, um Gesprächsaktionen und Ergebnisse in der Reihenfolge anzuzeigen. Lesen Sie die Erklärung zur Modellnutzung, beheben Sie fehlende Modell-, Anmelde- oder Narrationsressourcen und wählen Sie dann **Start generation** aus.
3. Folgen Sie den Phasen des Schreibens und der Mediengeneration. Sie können den Dialog schließen, während die Generation fortgesetzt wird, und dann **View generation progress** wieder öffnen. **Cancel** stoppt den Filmjob, nicht das Ausgangsgespräch.
4. Wenn **Research film ready** erscheint, prüfen Sie den Titel und die Dauer und wählen Sie dann **Play research film**.
5. Sehen Sie sich den ganzen Film an. Überprüfen Sie Zahlen, Einheiten, Erklärungen, Visuals, Narration und die angegebenen Grenzen gegenüber der Quellsitzung. Achten Sie besonders darauf, ob hypothetische Beispiele oder vorläufige Ergebnisse noch als solche beschrieben werden.

![Wählen Sie Forschungserklärung oder Operation Replay vor dem Starten der Generation](/img/open-science/v130/film-mode.webp)

Jeder konversationszweig behält seine eigene filmausgabe. Öffnen Sie den beabsichtigten Branch, bevor Sie einen Film erzeugen oder ansehen; ein Film auf einem Branch ist nicht automatisch der Film für einen anderen. Film-Authoring verbraucht Modell-Token, obwohl Narration lokal läuft.

<p className="example-label"><strong>Bearbeitetes Beispiel</strong> Erklären Sie ein fünfstelliges Unterrichtsbeispiel</p>

Beginnen Sie ein Gespräch mit Codex und senden Sie:

```text
In English, explain a small hypothetical teaching example: observations
are 2, 4, 6, 8, 10. Compute their mean and median, then explain in no more
than 200 words why this five-number example does not support a claim
about a real population. Do not use tools or create files.
Keep the numerical result explicit.
```

Die ausgefüllte Antwort gibt einen Mittelwert und Median von **6** und erklärt das Fehlen eines definierten Populations- oder Probenahmedesigns. Überprüfen Sie diese Punkte vor der Auswahl **Generate research film**. Dies ist ein Lehrbeispiel, keine empirische Studie.

![Forschungsfilmgenerierung aus einem abgeschlossenen Lehrgespräch](/img/open-science/v120/film-progress.webp)

![Bereiter Forschungsfilm mit englischer Erzählung und Wiedergabeaktion](/img/open-science/v120/film-ready.webp)

In v1.2.1 stoppt der Wechsel zu einer anderen Sitzung nicht die Filmgeneration. Halten Sie die App am Laufen und kehren Sie zur Quellsitzung zurück **View generation progress** oder **View research film** um das Ergebnis zu überprüfen. Die explizite Absage des Filmjobs stoppt immer noch die Generation.

## Exportieren Sie einen überprüften Film {/* #export-film */}

Öffnen Sie den erzeugten Player in der Vorschau. Wählen Sie **More actions → Download**, um den portablen HTML-Player für die Wiedergabe im Browser zu speichern. Für eine Videodatei wählen Sie **Export MP4** in der gerenderten Vorschau. Falls erforderlich, wählen Sie **Install and export** und anschließend einen Speicherort im Dialog der Desktop-App. Die Sprachressourcen und die MP4-Exportkomponente werden getrennt heruntergeladen.

Warten Sie, bis der Export abgeschlossen ist, und öffnen Sie die gespeicherte Datei außerhalb von Open-Science erneut. Überprüfen Sie die Wiedergabe, den Ton, die Bildunterschriften und das Ende. Das Abbrechen eines Speicherdialogs erzeugt keine exportierte Datei. Halten Sie die ursprüngliche Sitzung oder [`.science` Forschungspaket](research-packages.md) wenn Empfänger die zugrunde liegenden Beweise untersuchen müssen; eine MP4 allein ist eine Präsentation.

![Research-Film-Player und MP4-Exportkontrolle](/img/open-science/v120/film-player.webp)

## Regenerieren oder Rückgewinnung {/* #film-recovery */}

Während ein Forschungsfilm generiert, bleibt seine Konversation in **Active** mit dem sichtbaren Filmstatus. Wenn ein Filmdialog von der Generation einer anderen Konversation blockiert wird, wählen Sie **Go to conversation** aus, um diesen Besitzer zu öffnen und den Fortschritt zu überprüfen, bevor Sie einen anderen Job beginnen.

Wenn ein Film unterbrochen wird und der Dialog **Retry** anbietet, setzen Sie fort, um validierte Szenen, Erzählungen und Timings wiederzuverwenden. Checkpoints überleben einen Prozessneustart. **Generate again** startet stattdessen einen neuen Versuch; verwenden, wenn Sie den beabsichtigten Inhalt ändern oder den vorherigen Versuch absichtlich verwerfen. Überprüfen Sie den Fortschritt und den abgeschlossenen Film nach beiden Aktionen.

- Wenn Generation Sie auffordert, ein Modell auszuwählen oder Anmeldeinformationen zu überprüfen, beheben Sie diese Anforderung in **Settings → Model** und kehren Sie dann zur Sitzung zurück.
- Wenn der Download der Erzählung fehlschlägt, verwenden Sie **Retry** und warten Sie auf **Installed**, bevor Sie erneut generieren.
- Verwenden Sie **View research film → Generate again**, nachdem Sie die Sitzung geändert haben oder wenn das Ergebnis einen weiteren Versuch erfordert. Bestätige die neue Generation; Es kann mehrere Minuten dauern und die Modellkapazität wieder verwenden.
- Verwenden Sie das **More actions → Delete research film** des Filmdialogs nur, wenn Sie die lokalen Filmdateien dieses Zweigs entfernen möchten. Die Bestätigung erklärt, dass Konversationsinhalte und separat gespeicherte Kopien aufbewahrt werden.

Siehe [Session Replay](session-replay.md) zum Überprüfen der beibehaltenen Schritte und [Vergleichbarkeit](reproducibility.md) zum Ausführen einer separaten Überprüfung.
