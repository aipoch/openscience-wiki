---
title: "Notebook und Ausführungsnachweise"
last_update:
  date: '2026-10-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';


# Notebook und Ausführungsnachweise {/* #notebook-and-execution-evidence */}

Verwenden Sie Notebook, um den ausgeführten Code zu inspizieren, einen Befehl im aktuellen Kernel auszuführen und die Hintergrundarbeit zu verfolgen. Öffnen Sie für eine gespeicherte Datei **Provenance**, um die Ausführung und die Beweise zu überprüfen, die mit dieser Dateiversion verbunden sind.

Vor dem Ausführen von Python oder R, [eine kompatible Laufzeit ermöglichen](runtimes.md). Verwenden Sie für ein vollständiges Beispiel zur Datenanalyse das [Workflow für öffentliche Daten](../workflows/data-quality.md).

<span id="open-the-session-notebook" />
<span id="open-the-producing-sessions-notebook" />
<span id="produce-an-artifact" />

<PlatformGuide />

## Öffnen Sie eine Sitzung Notebook {/* #open-a-session-notebook */}

1. Öffnen Sie das Projekt und die Konversation mit der Berechnung, die Sie inspizieren möchten. Wenn Sie neu beginnen, bitten Sie den Agenten, zuerst eine kleine Berechnung im **Sitzung Notebook** auszuführen.
2. Wählen Sie **Open notebook** oder verwenden Sie das Gesprächsmenü **View notebook**.
3. Wählen Sie die Registerkarte **Notebook**, wenn eine Dateivorschau aktiv ist.
4. Verwenden Sie **Agent**, um den Ausführungsbesitzer auszuwählen, dann **Python / R / Bash**, um die Sprache auszuwählen.
5. Öffnen Sie einen nummerierten Durchlauf und lesen Sie dessen Ausgabe- und Abschlusszustand. Eine kopierte Aktivität mit der Bezeichnung **code shown** enthält angezeigten Code; Inspizieren Sie die ursprüngliche Produktionssitzung auf ihre Ausführungsaufzeichnung.

<PlatformContent platform="macos">

![Python Ausführung und Ausgabe in Notebook](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>

| Kontrolle | Aktion | Ergebnis |
| --- | --- | --- |
| Agent | Wählen Sie Main oder einen Child Agent | Zeigt die Aufzeichnungen dieses Besitzers an; Agenten können separate Kernel haben |
| Sprache | Wählen Sie eine verfügbare Sprache aus | Ändert die Datensätze und die Konsole; fehlende Sprachen in Runtimes installieren |
| Nummerierter Lauf | Wählen Sie eine aufgezeichnete Ausführung aus | Öffnet seinen Code, Output und Status |
| In die Zwischenablage kopieren | Ausgewählter Code kopieren | Haltet externe Pfade und Abhängigkeiten wie geschrieben |
| Hide Output / Show Output | Kollaps- oder Erweiterungsleistung | Ändert die Ansicht, ohne den Code erneut auszuführen |
| Ausführen von Code in diesem Kernel... | Geben Sie den Code ein und übermitteln Sie ihn | Führt im ausgewählten Live-Kernel aus |
| Schließen / Zusammenbruch Preview | Zurück zum Gespräch | Hält aufgezeichnete Ausführung Geschichte |

Überprüfen Sie **Inputdaten/Inputs**, wenn vorhanden. Passen Sie die angezeigte Datei und Version Ihrer Anfrage an. Wenn eine Referenz nicht verfügbar ist, öffnen oder fügen Sie die beabsichtigte Eingabe über die Anwendung erneut an, bevor Sie erneut versuchen.

## Code überprüfen, bevor er ausgeführt wird {/* #execution-review */}

Von v0.36.0 wird der vom Agenten eingereichte Notebook-Code vor dem Versand überprüft. Unterstützte gewöhnliche Lesungen und Analysen gehen ohne zusätzliche Risikoaufforderung vor. Operationen, die irreversible Änderungen vornehmen könnten oder die nicht vollständig analysiert werden können, erfordern eine einmalige Entscheidung. Code, der direkt in die manuelle Konsole eingegeben wird, wird von diesem Schritt zur Genehmigung durch den Agenten nicht abgedeckt; Überprüfen Sie es selbst, bevor Sie es einreichen.

1. Wenn **Review risky code** angezeigt wird, überprüfen Sie die Umgebung und die angeforderte Operation. Die Berechnung wartet auf Ihre Entscheidung.
2. Wählen Sie **Line** neben einem Befund aus, um seinen Standort im vollständigen Code zu überprüfen. Prüfen Sie Pfade, betroffene Dateien und Befehle, einschließlich aller Operationen, die die Analyse nicht lösen konnte.
3. Wenn die Aktion unnötig ist oder ihr Ziel falsch ist, lehnen Sie sie ab und bitten Sie den Agenten um eine sicherere Überarbeitung. Nur einmal genehmigen, wenn Sie den angezeigten Vorgang beabsichtigen; die Anforderung gewährt keine dauerhafte Erlaubnis für zukünftigen Risikocode.
4. Überprüfen Sie nach der Entscheidung die aufgezeichnete Entscheidung und den Notebook-Laufstatus. Die Genehmigung allein ist kein Beweis für die Vollendung. Eine abgelehnte Anforderung führt diesen Code nicht aus.

<p className="example-label"><strong>Praxisbeispiel</strong> Überprüfen Sie eine externe Python-Prozessanforderung</p>

Die abgebildete Berechnung fügt nur Zahlen hinzu, aber sie startet einen anderen Interpreter durch `subprocess.run`. Diese verschachtelte Ausführung kann nicht vollständig überprüft werden, so dass die Anforderung für die Überprüfung anhält. Der Hinweis bedeutet nicht, dass der Code bösartig ist. Dieses Beispiel wählt **Deny**; der Lauf wird dann als unterbrochen aufgezeichnet, ohne den Child-Prozess auszuführen.

![Notebook Bewertungskarte mit Umgebung, Quellzeile, Einmal zulassen und Deny](/img/open-science/v0360/notebook-risk-review.webp)

Dieser Bildschirm überprüft das Ausführungsrisiko; sie validiert weder die statistische Methode noch das Ergebnis. **Auto-review** und [Reviewer](../specialists/reviewer.md) bewerten abgeschlossene Arbeiten separat. v0.36.0 verbessert auch Python/R Abhängigkeitserfassung; Verwenden Sie [Provenance und Rerun Verifikation](reproducibility.md), um die tatsächlichen Ein- und Ausgänge eines Ergebnisses zu überprüfen.

## Arbeiten im Live-Kernel {/* #work-in-the-live-kernel */}

### Führen Sie einen Check selbst im Live-Kernel aus {/* #run-a-check-yourself-in-the-live-kernel */}

Wählen Sie **Python**, klicken Sie auf **Ausführen von Code in diesem Kernel...** und geben Sie den folgenden in sich geschlossenen Befehl ein. Es erfordert keinen datensatz, drittanbieterpaket oder variablen aus einer früheren konversation.

```python
import sys
print("Python:", sys.version.split()[0])
print("Executable:", sys.executable)
```

Drücken Sie **Enter** zum Ausführen; Verwenden Sie **Umschaltung + Enter** für eine Newline. Verwerfen Sie ein offenes Autovervollständigungsmenü mit **Flucht**, bevor Sie es einreichen. Bestätigen Sie einen nummerierten **Python · Sie**-Eintrag und die Interpreterinformationen in seiner Ausgabe. Die ausführbare Datei sollte zu der von Ihnen ausgewählten Laufzeit gehören.

Wählen Sie für R **R** und senden Sie:

```r
cat(R.version.string, "\n")
cat("R home:", R.home(), "\n")
```

Überprüfen Sie den aufgezeichneten R-Eintrag und seine Ausgabe. Python und R haben separate Variablen. Ein `NameError` oder `object not found` bedeutet normalerweise, dass das benannte Objekt nicht in diesem Kernel erstellt wurde; Überprüfen Sie Ihren Code, bevor Sie einen Befehl aus einer anderen Sitzung wiederverwenden.

Um den Interpreter und die gespeicherten Ergebnisse zu überprüfen, öffnen Sie [Python und R Laufzeiten](runtimes.md) und wählen Sie **Windows** oben auf der Seite.

<span id="variables-dependency-state-and-network-boundaries" />

### Live-Variablen untersuchen {/* #inspect-live-variables */}

1. Wählen Sie **Inspect variables** nach einem Lauf aus, der Variablen erzeugt.
2. Lesen Sie **Name**, **Type**, **Size / Shape** und **Preview**.
3. Geben Sie einen Namen aus Ihrem eigenen Code in **Filter variables** ein. Für das Screenshot-Beispiel filtert `sha` die aufgelisteten Hash-Variablen; Wählen Sie einen Namen, der in Ihrem eigenen Kernel existiert.
4. Verwenden Sie **Refresh variables**, um den aktuellen Namespace zu lesen, und **Show private variables**, wenn der Name, den Sie benötigen, ausgeblendet ist.
5. Wählen Sie **Close**, um zum Notebook zurückzukehren.

<PlatformContent platform="macos">

![Filtern der Variablenliste nach Name](/img/open-science/guides-walkthrough/47-notebook-variable-filter.webp)

</PlatformContent>

Eine Vorschau kann einen Wert abkürzen; Drucken Sie das erforderliche Feld in der Konsole, um es vollständig zu inspizieren. **Variable tracking is limited** bedeutet, dass der Abhängigkeitsgraph unvollständig ist. Für ein verfolgtes Ergebnis zeigt **abgestanden** eine geänderte Abhängigkeit an; **unknown** bedeutet, dass die Beziehung nicht hergestellt werden konnte. Führen Sie den betroffenen Code erneut aus, bevor Sie ein veraltetes Ergebnis verwenden.

### Weiter nach einem Kernelwechsel {/* #continue-after-a-kernel-change */}

Das Ändern oder Umbauen einer Laufzeit kann den Kernel stoppen. Gespeicherte Dateien und Ausführungsaufzeichnungen bleiben von In-Memory-Variablen getrennt. Führen Sie nach der Änderung den obigen Interpreter-Check aus, erstellen Sie die erforderlichen Variablen neu, indem Sie den produzierenden Code erneut ausführen, und öffnen Sie die gespeicherten Dateien, die Sie benötigen.

Verwenden Sie [Laufzeiten](runtimes.md#maintain-and-repair-environments) für die Einstellung Stornierung und Neuinstallation. Ein Runtime-Wiederaufbau, ein normaler Kernel-Neustart und die Wiederherstellung eines Hintergrundauftrags sind unterschiedliche Vorgänge; den Status des betreffenden Vorgangs zu überprüfen, anstatt davon auszugehen, dass der Zustand wiederhergestellt wird.

## Führen Sie den gleichen Gen-Count-Check in R aus {/* #run-the-same-gene-count-check-in-r */}

<p className="example-label"><strong>Praxisbeispiel</strong> GSE60450-Genzahl in R überprüfen</p>

1. [Installieren und Aktivieren von R](runtimes.md#install-app-managed-r).
2. Befestigen Sie den [Originalmatrix](../reference/example-data.md). Wenn Sie ein Python-Ergebnis vergleichen, fügen Sie dieses CSV auch der gleichen Konversation hinzu.
3. Fragen Sie nach **Session Notebook → R**-Ausführung und den Eingabe-/Ausgabeanforderungen im [Workflow in Datenqualität](../workflows/data-quality.md). Geben Sie die Aufbewahrung vollständiger Kennungen und eine separate Ausgabedatei an.
4. Wenn **Change notebook runtime?** erscheint, bestätigen Sie **Sprache: R** und den beabsichtigten Interpreter. Überprüfen Sie die Umgebung auf der nachfolgenden **Run R code?**-Anforderung.
5. Öffnen Sie **Notebook → R**, lesen Sie den Ausführungsdatensatz und öffnen Sie dann die gespeicherte CSV-Figur und den Bericht.

<PlatformContent platform="macos">

![R Sample-QC-Ausgang in der Anwendung geöffnet](/img/open-science/guides-walkthrough/76-r-qc-table.webp)

</PlatformContent>

Vergleichen Sie Metriken mit dem vollständigen Sample-Identifier mit dem [Gemeinsame Baseline](../reference/example-data.md#sample-qc-baseline). Behalten Sie die ursprüngliche Quelle und notieren Sie, welche Metriken Nullzählungen enthalten oder ausschließen. Raw-count QC bereitet die Daten für eine separat gestaltete statistische Analyse vor.

### Halten Sie das R-Ergebnis und seine Beweise zusammen {/* #keep-the-r-result-and-its-evidence-together */}

Öffnen Sie das gespeicherte CSV **Provenance → Execution Log → Download notebook**. Behalten Sie den Export neben seinem Input und seinen Ergebnissen. Ein Export für eine Dateiversion kann spätere manuelle Konsolenbefehle weglassen.

<PlatformContent platform="macos">

![Erfasste Umgebung für ein R Ergebnis](/img/open-science/guides-walkthrough/77-r-environment-evidence.webp)

</PlatformContent>

Das Runtimes-Paketinventar beschreibt die installierte Umgebung; Provenance beschreibt die Umweltbeweise, die für eine bestimmte Datei erfasst wurden. Lesen Sie **partial** oder Cache-Inventar-Hinweise, anstatt ihre Paketzahlen zu vergleichen, als wären sie die gleiche Liste.

## Hintergrundaufgaben und Ergebnislieferung {/* #background-tasks-and-result-delivery */}

Bitten Sie um Hintergrundausführung, wenn eine unterstützte Python-, R-, persistente REPL- oder Shell-Aufgabe fortgesetzt werden soll, während Sie an anderer Stelle arbeiten. Fügen Sie die Eingabe, die Ausgänge und die Stoppbedingung in die Anforderung ein.

1. Öffnen Sie nach der Aufnahme den **Background tasks**-Eintrag der Konversation. Es gruppiert lokale Runs und Remote-Compute-Jobs; Ein gespräch ohne aufgaben kann es nicht zeigen.
2. Lesen Sie die Aufgabenidentität, die Umgebung, den Status und die verstrichene Zeit.
3. Wählen Sie **Open** aus, um den entsprechenden Notebook-Lauf oder Compute-Job zu überprüfen.
4. Um eine Aufgabe zu stoppen, wählen Sie das **Cancel**-Steuerelement aus und warten Sie, bis der Status abgeschlossen ist. Überprüfen Sie alle bereits gespeicherten Dateien, bevor Sie sie verwenden oder verwerfen.
5. Überprüfen Sie nach Abschluss die gelieferte Ergebnisnachricht und öffnen Sie die gespeicherten Ausgänge.
6. Überprüfen Sie nach einer Unterbrechung oder einem Neustart der App die bestehende Aufgabe und eine Wiederherstellungsnachricht, bevor Sie eine weitere Kopie einreichen.

<PlatformContent platform="macos">

![Hintergrund-Aufgabenzustand und seine offene Steuerung](/img/open-science/v0.27.0/13-background-task-completed.webp)

</PlatformContent>

| Zustand | Was zu überprüfen ist |
| --- | --- |
| Queued / Running | Ausgewählte Umgebung und Fortschritt; Shell-Jobs können auf einen Ausführungsschlitz warten |
| Annullierung/Annullierung | Ob die Stornierung noch verarbeitet oder abgeschlossen ist |
| Abgeschlossen | Exit-Ergebnis und gespeicherte Ausgabedateien |
| Fehlgeschlagen / Timed out / Unterbrochen | Erster Fehler, beibehaltene Ausgabe und angebotene Wiederherstellungsaktion |
| Ergebnis nicht verfügbar | Bestehende Jobaufzeichnungen und Wiederherstellungsdetails |

Das Schließen der Aufgabenliste lässt die Aufgabe laufen. Der Abschluss einer Berechnung und die Zustellung der Ergebnisnachricht sind getrennte Phasen. Remote-Jobs benötigen auch die Host- und Scheduler-Bedingungen in [Remote Compute](remote-compute.md).

<span id="open-provenance" />
<span id="execution-log" />
<span id="messages" />
<span id="environment" />
<span id="review" />

## Überprüfen Sie die Beweise einer gespeicherten Version {/* #inspect-one-saved-versions-evidence */}

Öffnen Sie eine gespeicherte Datei und wählen Sie **File actions → Provenance** oder **Offenes Provenance** in der vergrößerten Vorschau aus. Bestätigen Sie zuerst die ausgewählte Dateiversion.

<PlatformContent platform="macos">

![Erfasster Herstellercode für ein gespeichertes Ergebnis](/img/open-science/provenance-code.webp)

</PlatformContent>

| Tab oder Steuerung | Verwenden Sie es zu inspizieren |
| --- | --- |
| Code | Erfasster Produzentcode, Eingabereferenzen, Kopier-/Download- und Generierungsskript |
| Ausführungsprotokoll | Ausführungsaufzeichnungen für die ausgewählte Version eingefroren |
| Nachrichten | Gefangene Anfragen und Entscheidungen im Zusammenhang mit dem Ergebnis |
| Umgebung | Dolmetscher, Paketinformationen und Erfassungsstatus; siehe [Wiederherstellungsbedingungen](runtimes.md#conditional-restore). |
| Reproduzierbarkeit | Erfasste Inputs, Wiederholungsprüfungen, Outputvergleiche und Prüfprotokolle. |
| Review | Überprüfung im Zusammenhang mit dieser genauen Dateiversion |
| Vorherige / Nächste Artefaktversion | Nachweis für eine andere gespeicherte Version; nicht verfügbar, wenn keine vorhanden ist |
| Provenienz schließen | Zurück zur Preview |

| Etikettierung | Bedeutung und nächste Handlung |
| --- | --- |
| eingegrenzt | Die vorgehaltenen Beweise decken einen begrenzten Umfang ab. Behalten Sie diesen Umfang mit exportiertem Code und Ergebnissen. |
| teilweise | Einige Umgebungsinformationen fehlen oder sind nicht bestätigt. Erforderliche Abhängigkeiten vor externer Wiederverwendung aufzeichnen. |
| Kein Review für diese Version | Diese Dateiversion hat keine zugehörige Überprüfung. Verwendung [Reviewer](../specialists/reviewer.md) um Konversation und Artefakt-Review zu verstehen. |
| Cache-Umgebung | Das Inventar wurde wiederverwendet. Überprüfen Sie den tatsächlichen Dolmetscher / die tatsächlichen Pakete, wenn sich die Umgebung ändert. |

Durch Bearbeiten eines Berichts wird eine andere Dateiversion erstellt; es führt die Berechnung, die ein separates CSV erzeugt hat, nicht erneut aus. Siehe [Dateien und Versionen](files.md).

Um eine Überprüfung zu überprüfen, wählen Sie **Review** für die gewünschte Version, erweitern Sie die Überprüfungen und verwenden Sie **Go to transcript**, um die genannte Aktivität zu überprüfen. **No issues found** gilt für diese Prüfungen und diese Version; es füllt keine fehlende Ausführung oder Umweltbeweise aus. Wenn eine Überprüfung unterbrochen wurde, öffnen Sie den **Review error**-Eintrag und wählen Sie **Re-run review**. Kehren Sie nach Abschluss zur Registerkarte **Review** der Datei zurück und bestätigen Sie das neue Ergebnis. Der frühere fehlgeschlagene Versuch kann im Gespräch sichtbar bleiben.

## Reproduzierbarkeit {/* #reproducibility */}

Um ein erfasstes Ergebnis erneut auszuführen, vergleichen Sie die Ausgänge und speichern Sie den Verifizierungsaufzeichnung, folgen Sie dem [Reproduzierbarkeitsleitfaden](reproducibility.md). Dieses Kapitel behandelt die Ausführung von Notebook, die Provenienzinspektion und den Codeexport.

## Ausfuhr- und Wiederverwendungscode {/* #export-and-reuse-code */}

Wählen Sie den Export, der Ihrem Ziel entspricht:

| Ziel | Eingang | Inhalt |
| --- | --- | --- |
| Lesen Sie den registrierten Erzeugercode | **Code → Captured producer block → Download** | Gefangene Quelle mit ihren ursprünglichen Pfaden und Abhängigkeiten |
| Aufzeichnende Notebook-Zellen | **Execution Log → Download notebook** | Ein Notebook-Export für das ausgewählte Ergebnis/die ausgewählte Version |
| Bereiten Sie ein tragbares Skript vor | **Code → Generate script** | Eine modellgenerierte Rekonstruktion zur Inspektion und Prüfung |

<PlatformContent platform="windows">

### Download erfasst Python-Code auf Windows {/* #download-captured-python-code-on-windows */}

1. Öffnen Sie die beabsichtigte Version des gespeicherten Berichts, dann **Provenance → Code**.
2. Wählen Sie unter **Captured producer block** **Download**. Überprüfen Sie den `.py`-Dateinamen und das Ziel im Speicherdialog und wählen Sie dann **Save**.
3. Öffnen Sie die gespeicherte Datei und vergleichen Sie sie mit dem angezeigten Code. Führen Sie es in PowerShell mit dem gleichen Python-Interpreter aus; Verwenden Sie den `&`-Aufrufoperator vor einem zitierten ausführbaren Pfad.
4. Vergleichen Sie die Ausgabe mit dem Notebook und dem gespeicherten Bericht. Bewahren Sie alle erforderlichen Eingabedateien neben dem Code auf.

<Screenshot src="/img/open-science/windows/captured-code-download.webp" alt="Windows erfasste den Produzentencode und seine Download-Steuerung" width={1920} height={1017} windowBounds={[1157, 0, 763, 416]} href="/docs/img/open-science/windows/captured-code-download.webp" linkLabel="Öffnen Sie den kompletten Windows Screenshot" />

Dadurch wird der aufgezeichnete Code heruntergeladen. **Generate script** ist eine separate Rekonstruktionsoperation. Wenn die Generation fehlschlägt, behalten Sie ihren vollständigen Fehler; Das Herunterladen von erfasstem Code bedeutet nicht, dass die Rekonstruktion erfolgreich war.

</PlatformContent>

### Generieren Sie ein Standalone-Script {/* #generate-a-standalone-script */}

1. Öffnen Sie die **Provenance → Code** der beabsichtigten Version. Überprüfen Sie **Inputs** und **Execution Log**.
2. Wählen Sie ein kompatibles Standardmodell in **Settings → Model → Main model**. Diese zusätzliche funktion verwendet diese richtlinie, die sich von der modellauswahl der konversation unterscheiden kann.
3. Wählen Sie **Generate script** und warten Sie, bis **Generating…** fertig ist.
4. Lesen Sie das **LLM-generierte Rekonstruktion** Label. Überprüfen Sie Eingabepfade, Abhängigkeiten und Ausgabeorte, bevor Sie **Download script** auswählen.
5. Wählen Sie im Systemspeicherdialog ein separates Verzeichnis aus, überprüfen Sie den `.py`-Dateinamen und bestätigen Sie **Save**. Öffnen Sie die gespeicherte Datei, um zu bestätigen, dass sie den angezeigten Code enthält.
6. Geben Sie die Eingaben mit den genauen Dateinamen an, die das Skript erwartet, bereiten Sie seine Abhängigkeiten vor und führen Sie sie dann außerhalb der App aus. Vergleichen Sie die Ausgabefelder und die Eingabeprüfsumme mit dem gespeicherten Ergebnis. Ein abgeschlossener Download allein überprüft die Berechnung nicht.

<PlatformContent platform="macos">

![Generierte Skriptvorschau und Download-Steuerung](/img/open-science/priority-completion/19-generated-script.webp)

</PlatformContent>

<p className="example-label"><strong>Praxisbeispiel</strong> Führen Sie den exportierten RNA-seq-Check außerhalb der App aus</p>

Speichern Sie für ein herunterladbares Beispiel <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.py" download>Skript</a>, <a href="/docs/examples/gse60450/portable-script/remote-rnaseq-qc-f1e10edbdf01-f1e10edbdf01.csv" download>Eingang CSV</a> und <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.json" download>erwartete JSON</a> in einem Ordner. Führen Sie in diesem Ordner `python3 GSE60450-portable-check.py` aus. Das Skript verwendet die Standardbibliothek von Python. Benennen Sie das heruntergeladene erwartete JSON in `expected.json` um, bevor Sie es ausführen: Das Skript schreibt `GSE60450-portable-check.json`. Vergleichen Sie diese generierte Datei mit `expected.json`, bevor Sie das Skript an neue Daten anpassen.

### Download-Code, wenn die Skripterstellung nicht verfügbar ist {/* #download-code-when-script-generation-is-unavailable */}

Wenn die App **Artefakt-Code-Rekonstruktion ist nicht verfügbar mit Codex Abonnement-Authentifizierung.** zurückgibt, verwenden Sie einen kompatiblen Anbieter für diese Hilfsoperation oder laden Sie den erfassten Produzentencode herunter. Dieser Fehler betrifft die Skriptrekonstruktion, nicht die gewöhnliche Codex Notebook-Ausführung.

Überprüfen Sie für **KONSTRUKTION_UNVERFÜGBAR** fehlende Eingaben oder Ausführungsnachweise. Ein Capture-Code-Download bewahrt den verfügbaren Code; Es kann keine Schritte wiederherstellen, die nie erfasst wurden.

### Export und Wiederverwendung des aufgezeichneten Notebook {/* #export-and-reuse-the-recorded-notebook */}

Wählen Sie **Provenance → Execution Log → Download notebook**, wählen Sie einen Standort und speichern Sie. Öffnen Sie den Export und überprüfen Sie seine Sprache, Zellen und Ausgaben.

Bereiten Sie vor einer externen Wiederholung die Eingabedateien, die aufgezeichneten Abhängigkeiten und ein beschreibbares Ausgabeverzeichnis vor. Ersetzen Sie anwendungsverwaltete Pfade nur in einer Arbeitskopie, wobei der ursprüngliche Export intakt bleibt. Der Export bündelt keine Anmeldeinformationen oder die gesamte Anwendungsumgebung. Beispielexporte sind bei [Beispieldaten](../reference/example-data.md) erhältlich.

<PlatformContent platform="windows">

Wenn ein Windows Notebook-Export keine Erweiterung hat, öffnen Sie zuerst eine Kopie als Text und bestätigen Sie, dass sie Notebook JSON mit `nbformat`, `cells` und dem erwarteten Code / Ausgang enthält. Bewahren Sie das Original auf und geben Sie der Arbeitskopie eine `.ipynb`-Erweiterung. Umbenennung ändert, wie andere Programme die Datei öffnen; Es konvertiert nicht seinen Inhalt oder wiederholt seine Zellen.

</PlatformContent>

## Interpretieren von Fehlern und Warnungen {/* #interpret-errors-and-warnings */}

| Symptom | Nächste Maßnahme |
| --- | --- |
| Fehlende Variable | Führen Sie den Code, der ihn definiert, in der ausgewählten Sprache/Kernel aus |
| Fehlende Packung | Überprüfen Sie die Runtime-Pakete und folgen Sie [Laufzeiten](runtimes.md) |
| Input-Version nicht verfügbar | Öffnen oder Anbringen des vorgesehenen Stromeingangs; seine Identität durch die Anwendung aufzulösen |
| PermissionError / Zugang verweigert | Überprüfen Sie die angeforderte Datei und den Berechtigungsumfang; Melden Sie anhaltende Zugriffsfehler mithilfe von [Fehlerbehebung](troubleshooting.md) |
| Netzwerk-/Installationsfehler | Folgen [Netzwerk](network.md) Verwendung des betroffenen Hostnamens und des vollständigen Fehlers |
| Warnung mit einem abgeschlossenen Lauf | Lesen Sie, was die Warnung betrifft, und überprüfen Sie dann die gespeicherte Ausgabe, bevor Sie entscheiden, ob Sie erneut ausführen möchten |

Wenn Sie ein Problem melden, behalten Sie die erste fehlerhafte Zeile, die ausgewählte Laufzeit, die Dateiidentität und den Aufgabenzustand bei. Link speicherte die Ausgabe zu seinem tatsächlichen Produktionslauf.
