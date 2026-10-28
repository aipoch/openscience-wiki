---
title: "Dateien, Artefakte und Versionen"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Dateien, Artefakte und Versionen {/* #files-artifacts-and-versions */}

Halten Sie die Originaldatei, die hochgeladene Kopie und das generierte Artefakt unterschiedlich. Diese Seite behandelt Besitz, das Finden von Dateien und gespeicherte Revisionen. Siehe [Vorschau](previews.md) zum Anzeigen von Steuerelementen und [Sitzungen](sessions.md) zum Exportieren von Bundles.

<PlatformGuide />

## Fügen Sie eine Eingabe an oder verweisen Sie auf einen Ordner {/* #attach-an-input-or-reference-a-folder */}

Verwenden Sie **Composer → + → Attach files**, wählen Sie `GSE60450_Lactation-GenewiseCounts.txt`, warten Sie auf den Anhängechip und sehen Sie ihn vor dem Senden an. Der Anzeigename bleibt erkennbar; der verwaltete Eingabepfad ein Prüfsummensuffix umfassen kann. Das Entfernen eines Chips storniert seine Aufnahme in den Entwurf, nicht die ursprüngliche Datei auf der Festplatte. **Your files** wählt eine vorhandene Projektdatei aus, anstatt sie erneut hochzuladen.

Eine Ordnerreferenz ist nützlich, wenn mehrere Eingaben auf der Festplatte bleiben sollten. Navigieren Sie in **Files → Filter project files → This computer → Add folder…** zu einem bestimmten Unterordner und wählen Sie **Read-only** oder **Read & write**. Überprüfen Sie die Kernel-Stopp-Bestätigung vor **Grant this folder**. Durch Ändern des Notebook-Dateizugriffs werden aktive Kernel gestoppt, sodass ihre Berechtigungen wiederhergestellt werden können. Stornieren lässt den vorgeschlagenen Zuschuss nicht angewandt. Ordnerauswahl und Berechtigungen sind in [Projekte](projects.md) detailliert beschrieben.

| Lokale Dateisteuerung | Aktion und daraus resultierender Zustand |
| --- | --- |
| Verzeichnispfad | Geben Sie ein erlaubtes Verzeichnis ein und navigieren Sie dann dazu |
| Zum übergeordneten Verzeichnis | Verschieben Sie ein Verzeichnis innerhalb der Zugriffsregeln des Browsers nach oben |
| Gehe zu | Wählen Sie einen gespeicherten Standort |
| Verzeichnis aktualisieren | Laden Sie die Verzeichnisauflistung neu |
| Diesen Ordner anheften | Hinzufügen/Entfernen einer Standortverknüpfung; Entfernen Sie es löscht nicht den Ordner |
| Dateizeile | Öffnen Sie die Datei in einer Vorschau |
| Datei neu laden | Lesen Sie die externe Datei nach der Änderung |
| Weitere Aktionen → Copy Path | Kopieren Sie den externen Dateipfad |
| Mehr Aktionen → Speichern als Artefakt | Speichern einer verwalteten Projektkopie; Warten Sie auf Saved |
| Herunterladen | Speichern Sie eine externe Kopie durch den Speicherfluss der Plattform |

Ein Read-Only Grant schützt das externe Verzeichnis und erlaubt gleichzeitig Ausgaben innerhalb des Projektarbeitsbereichs. Verwenden Sie die oben genannten lokalen Dateisteuerelemente, um Quellen zu aktualisieren und verwaltete Kopien zu speichern.

<PlatformContent platform="windows">

Für einen vorhandenen Ordner öffnen Sie **Files**, wählen Sie die **Artifacts**-Dropdown-Liste und dann **This computer → Add folder…**. Wählen Sie im **Grant folder access**-Dialog der App einen bestimmten Unterordner und **Read-only**, dann **Grant this folder**. Die Benutzerprofilwurzel ist möglicherweise nicht verfügbar; Wählen Sie stattdessen den Forschungs-Unterordner aus. Lesen Sie eine beliebige Notebook-Kernel-Aufprallbestätigung. Wenn Sie zu Dateien zurückkehren, überprüfen Sie den ausgewählten Ordner und seine Dateien.

<Screenshot src="/img/open-science/windows/granted-folder-files.webp" alt="Ein gewährter Windows-Ordner, der das öffentliche Skript und CSV zeigt" width={1920} height={1017} windowBounds={[1157, 0, 763, 237]} href="/docs/img/open-science/windows/granted-folder-files.webp" linkLabel="Öffnen Sie den kompletten Windows Screenshot" />

Wählen Sie im Windows **Attach files**-Dialog eine Datei aus einem Pfad aus, der chinesische Zeichen oder Leerzeichen enthält, oder geben Sie den vollständigen Pfad in das **File name**-Feld ein und öffnen Sie ihn. Überprüfen Sie zurück in der App den Anhangnamen und sehen Sie sich die Tabellenabmessungen und -inhalte an. Um eine Auswahl aufzugeben, wählen Sie **Cancel** und überprüfen Sie, ob dem Entwurf kein neuer Anhang hinzugefügt wurde.

</PlatformContent>

## Inputs und generierte Ergebnisse finden {/* #find-inputs-and-generated-results */}

1. Öffnen Sie **Files** und wählen Sie **Filter project files → All artifacts**.
2. Lesen Sie **Your uploads** separat von **Generated files** nach Sitzung gruppiert.
3. Wählen Sie **List view** für Namen und Größen oder **Grid view** für visuelle Karten.
4. Geben Sie ein Dateinamenfragment in **Search project files** ein, z. B. `rnaseq`. Überprüfen Sie die übereinstimmenden Namen und Besitzsitzungen.
5. Löschen Sie die Suche, um Dateien anzuzeigen, die von diesem Filter ausgeschlossen sind.
6. **Expand files** öffnet die größere Bibliothek; **Exit full screen files** kehrt zum Arbeitsbereich zurück.

<PlatformContent platform="macos">

![Gefilterte echte RNA-seq Ergebnisse in der Dateibibliothek](/img/open-science/guides-walkthrough/56-files-search.webp)

</PlatformContent>
Die Zählung beschreibt den aktuellen Filter. Eine Suche ohne Übereinstimmungen löscht keine Dateien. **No more** bedeutet, dass die Gruppe das Laden beendet hat. Zerfall einer Gruppe durch ihre Überschrift. Verwenden sie die vorschauaktion eines dateikörpers für ein modal oder **Offen ... in geteilter Ansicht neben der Sitzung**, um die konversation neben ihm zu behalten. Der Download wirkt auf die von dieser Oberfläche ausgewählte Datei / Version.

### Kehren Sie zu einem lokalen Ordner zurück und speichern Sie eine Lesekopie {/* #return-to-a-local-folder-and-save-a-reading-copy */}

1. Öffnen Sie **Files → Filter project files → This computer** und geben Sie das zulässige Quellverzeichnis in **Directory path** ein.
2. Wählen Sie **Pin this folder**. Navigieren Sie woanders, dann **Go to → Pinned**, um zurückzukehren. **Remove bookmark** oder **Unpin** der gepinnten Zeile entfernt nur die Verknüpfung.
3. Wählen Sie **Refresh directory**, um neu hinzugefügte Dateinamen anzuzeigen. Für eine bereits offene Datei, die außerhalb der App geändert wurde, verwenden Sie **Reload file**, um den Inhalt erneut zu lesen.
4. Wählen Sie in der lokalen Vorschau **More actions → Save as artifact** und warten Sie auf **Saved**.
5. Kehren Sie zu **All artifacts → Your uploads** zurück und öffnen Sie die gespeicherte Kopie erneut. Es hat Versionskontrollen verwaltet und keinen lokalen Quellpfad im Header.

Öffnen Sie die verwaltete Kopie erneut und vergleichen Sie ihren Inhalt mit der lokalen Quelle. Spätere Quelländerungen aktualisieren die gespeicherte Kopie nicht automatisch. Verwenden Sie die untenstehenden Schritte für Versionskonflikte, wenn Sie verwaltete Inhalte bearbeiten.

## Bearbeiten eines Berichts und vergleichen Sie Versionen {/* #edit-a-report-and-compare-versions */}

<p className="example-label"><strong>Praxisbeispiel</strong> Fügen Sie eine Lesenotiz hinzu und vergleichen Sie die Revisionen des Berichts</p>

Öffnen Sie einen unterstützten verwalteten Text oder eine Markdown-Datei. Das folgende Beispiel fügt einen Lesehinweis zu einem vorhandenen Bericht hinzu; Speichern erzeugt eine neue Revision, ohne die ursprüngliche Eingabe zu ändern oder ihre Analyse erneut durchzuführen.

1. Öffnen Sie die verwaltete Markdown-Datei und wählen Sie **Bearbeiten von rnaseq-qc-report.md** aus.
2. Bearbeiten Sie das Quellfeld. Behalten Sie die vorhandene Methode und den Herkunftstext bei.
3. Wählen Sie **Save changes**. Der Header wechselt von **v1** zu **v2**.
4. Wählen Sie **Vergleichen Sie ... mit seiner Quellversion**. Der hinzugefügte Text erscheint in der Differenzansicht.
5. Verwenden Sie **Vergleichsstopp**, um zum gerenderten Bericht zurückzukehren.
6. Wählen Sie **Previous file version**, um v1 zu inspizieren, und **Next file version**, um zu v2 zurückzukehren.

<PlatformContent platform="macos">

![Report v2 im Vergleich zu seiner Originalversion](/img/open-science/guides-walkthrough/55-report-version-diff.webp)

</PlatformContent>
| Editing Control/State | Was zu tun ist |
| --- | --- |
| Speichern von Änderungen deaktiviert | eine gültige Änderung vornehmen; unveränderter Text hat nichts zu retten |
| Abbrechen | Verwerfen Sie den aktuellen Edit Draft |
| Versionspfeile deaktiviert | Keine ältere / neuere Version existiert in dieser Richtung |
| Vergleichen Sie Behinderte | Kein unterstützter Source-Version-Vergleich ist verfügbar |
| Konflikt retten | Laden Sie die aktuelle Version neu und vereinbaren Sie Ihre Änderung; Gehen Sie nicht davon aus, dass Ihr Entwurf einen anderen Autor überschrieben hat |
| Edit fehlt | Dieser Dateityp oder diese Quelle ist in diesem Viewer nicht editierbar; Erwarten Sie nicht, dass binäre Dateien oder die CSV-Tabelle zu Tabellenkalkulationseditoren werden |

Unterstützte verwaltete Text- / Code- und Markdown-Dateien können die Bearbeitung aussetzen. Die demonstrierte CSV blieb eine schreibgeschützte Tabelle; Bilder und andere binäre Formate erhalten keine Textbearbeitung durch diese Funktion. Eine manuelle Bearbeitung erstellt eine Dateirevision; es führt das Notebook nicht erneut aus oder erstellt eine Modellüberprüfung. Siehe [Notebook-Beweis](notebook.md), bevor Sie die Produktionshistorie einer Version zitieren.

### Beheben Sie einen Speicherkonflikt, ohne dass Sie beide Änderungen verlieren {/* #resolve-a-save-conflict-without-losing-either-edit */}

Wenn ein anderer Autor den Bericht speichert, während Ihr Editor geöffnet bleibt, kann **Save changes** **Für diese Datei ist eine neuere Version verfügbar. Neueste Version anzeigen** zurückgeben. Ihr Entwurf hat diese neuere Version nicht ersetzt.

1. Bewahren Sie Ihren nicht gespeicherten Text auf, bevor Sie die Ansichten ändern.
2. Wählen Sie **View latest version**. Wenn **Discard unsaved changes?** erscheint, kündigen Sie, bis Sie die Änderungen beibehalten haben, die Sie benötigen.
3. Öffnen Sie den zuletzt gespeicherten Bericht und prüfen Sie die Ergänzungen des anderen Autors.
4. Wählen Sie **Edit** aus, wenden Sie Ihre Änderungen erneut auf den neuesten Text an und speichern Sie.
5. Öffnen Sie das Ergebnis erneut und verwenden Sie die Versionspfeile, um frühere Revisionen zu überprüfen.

<PlatformContent platform="macos">

![Speichern blockiert, weil eine andere Version existiert](/img/open-science/local-todo-batch/37-file-save-conflict.webp)

</PlatformContent>
Bestätigen Sie nach dem Speichern, dass die letzte Überarbeitung sowohl die Änderung des anderen Autors als auch Ihren beibehaltenen Entwurf enthält. Frühere Dateirevisionen bleiben über die Versionskontrollen verfügbar; Diese sind getrennt von Conversation-Message-Revisionen.

Um ein erfasstes Ergebnis erneut auszuführen und seine Ausgabe zu vergleichen, verwenden Sie [Reproduzierbarkeit](reproducibility.md). Verwenden Sie für eine tragbare Kopie der Konversationszweige, Dateien und Beweise ein [.science Forschungspaket](research-packages.md).

## Exportieren ohne den Forschungsrekord zu verlieren {/* #export-without-losing-the-research-record */}

Verwenden Sie das **Download** der Datei, um ein Ergebnis zu speichern. Session **Download all artifacts** speichert die ausgewählten Dateien in einem Ordner; project **Download artifacts…** erstellt ein ZIP mit separaten `generated` und `uploads` Pfaden. Beide stellen Auswahlkontrollen aus. Lesen Sie den Umfang, die Dateinamen und den Zielort, bevor Sie bestätigen. Conversation **Export** ist eine Transkriptionsoperation, die sich vom Herunterladen von Forschungsdateien unterscheidet. Siehe [Sitzungen](sessions.md) für die ausgeübten Auswahlen und wieder geöffneten Downloads. Eine heruntergeladene Kopie enthält nicht den vollständigen Status der Live-Anwendung, Anmeldeinformationen oder externe Eingaben.

Behalten Sie die ursprüngliche Zählmatrix, den CSV, den Zahlen- und Methodenbericht zur Wiederverwendung zusammen. Der [Datenworkflow](../workflows/data-quality.md) liefert die getesteten Dateien und exakte Akzeptanzwerte. Wenn ein Download fehlschlägt, überprüfen Sie die Zielberechtigung und den freien Festplattenspeicher und wiederholen Sie es. Eine teilweise externe Datei ändert die gespeicherte verwaltete Version nicht.

### Öffnen Sie einen heruntergeladenen Bericht {/* #open-a-downloaded-report */}

Wählen Sie die Berichtsversion und wählen Sie **Download**. Öffnen Sie die gespeicherte `.md`-Datei in einem Texteditor und überprüfen Sie die Überschriften, Absätze und Daten. Kehren Sie zur App-Vorschau für den formatierten Bericht zurück.

<PlatformContent platform="windows">

Öffnen Sie die heruntergeladene `.md`-Datei in Notepad. Notepad zeigt Markdown-Quelle an: Überschriftenmarker wie `##` und Backticks formatieren Zeichen. Überprüfen Sie die Überschriften, Absätze und Tabelleninhalte. Kehren Sie zur App-Vorschau zurück, um den formatierten Bericht zu lesen.

</PlatformContent>

### Bewahren Sie die ausgewählte Datei durch Kopien und Exporte {/* #preserve-the-selected-file-through-copies-and-exports */}

Wenn Sie eine Nachricht mit verwalteten Referenzen kopieren, fügen Sie sie in die beabsichtigte Konversation ein und prüfen Sie vor dem Senden jeden resultierenden Anhang / jede Referenz. Ein lesbarer Dateiname reicht nicht aus: Öffnen Sie die Referenz und bestätigen Sie den aktuellen Besitzer und die Version.

Bevor Sie ausgewählte Artefakte oder ein Bündel exportieren, bestätigen Sie die vollständige Auswahl, warten Sie auf das Ergebnis und öffnen Sie die heruntergeladenen Dateien erneut. Wenn ein Bearbeiten, Aktualisieren oder Exportieren fehlschlägt, bewahren Sie den Entwurf und die Quellversion bei, während Sie das tatsächlich gespeicherte Ergebnis überprüfen. Ein fehlgeschlagener Refresh stellt nicht fest, dass ein vorhergehendes Save fehlgeschlagen ist.

Referenzen für die Implementierung: [kopierte Referenzen](https://github.com/aipoch/open-science/commit/f0c0e081), [vollständige Ausfuhrauswahlen](https://github.com/aipoch/open-science/commit/f0468f35) und [Preview Edits](https://github.com/aipoch/open-science/commit/8763f9aa). Wenn ein Anhang **Verwaltete Datei oder deren Sitzung wird gelöscht** meldet, fügen Sie die beabsichtigte aktuelle Eingabe über die App wieder an und überprüfen Sie deren Eigentum; siehe [Fehlerbehebung](troubleshooting.md).

Quellen: [Projektdateibibliothek](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ProjectFilesView.tsx), [lokale Dateiaktionen](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/LocalFileHeaderActions.tsx).

## Halten Sie eine autorisierte lokale Datei als Artefakt {/* #import-local-artifact */}

Öffnen Sie eine Datei aus einem autorisierten Ordner unter **This computer**. In seiner Vorschau, verwenden **… → Save as artifact** und warten auf die Vollendung. Öffnen Sie das resultierende Gesprächsartefakt und überprüfen Sie dessen Inhalt. Open-Science behält eine unveränderliche verwaltete Kopie; spätere Änderungen der ursprünglichen lokalen Datei aktualisieren diese Kopie nicht. Die bloße Vorschau einer Ordnerdatei importiert sie nicht.
