---
title: "Öffnen und Vorschauen von Dateien"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Öffnen und Vorschauen von Dateien {/* #opening-and-previewing-files */}

Öffnen Sie ein gespeichertes Ergebnis, um die ausgewählte Version zu überprüfen. Diese Seite behandelt freigegebene Anzeigesteuerungen und gewöhnliche Dokumentformate. Verwenden Sie [Tabellen](../tools/tables.md) für die Dateninterpretation und [Wissenschaftliche Zuschauer](../tools/viewers.md) für Sequenz- und Struktursteuerungen.

## Offen, vergrößern und zurückkehren {/* #open-enlarge-and-return */}

Eine generierte Dateikarte öffnet ihre Vorschau. **Offen ... in geteilter Ansicht neben der Sitzung** hält das Gespräch sichtbar. Wählen Sie eine weitere Registerkarte, um Dateien zu wechseln, **Vollbild-Vorschau von ...**, um eine zu vergrößern, und **Close Preview von ...**, um diese Oberfläche zu schließen. **Collapse preview panel** verbirgt das Panel, ohne seine offenen Dateien zu löschen. Eine Vollbild-Vorschau und eine Vollbild-Dateibibliothek sind unterschiedliche Ansichten.

| Kopfsteuerung | Bedeutung |
| --- | --- |
| Dateiname und Version | Bestätigen Sie das ausgewählte Ergebnis, bevor Sie es herunterladen oder zitieren |
| Herunterladen | Speichern Sie eine Kopie dieses Ergebnisses |
| Dateiaktionen → Provenance | Überprüfen Sie die Beweise, die einer verwalteten Artefaktversion beigefügt sind |
| Im Kontext anzeigen | Zurück zur Sitzung, die das Artefakt produziert hat |
| Vorherige / Nächste Dateiversion | Navigieren Sie durch unveränderliche gespeicherte Revisionen, wenn verfügbar |
| Edit / Vergleichen | Verfügbar nur für unterstützte verwaltete Inhalte; siehe [Dateien](files.md) |
| Schließen | die Ansicht zu verwerfen; Dies ist nicht Löschen |

Das oben genannte Schließverhalten gilt für Dateivorschaus. Ein [Side Chat Tab](delegation.md) hat eine separate Bestätigung: Das Schließen stoppt diese Nebendiskussion und entfernt seine Konversation. Ein vollständiger neustart der anwendung löscht auch die verbleibenden side chats. Nachrichten, die bereits an Main geliefert wurden, bleiben gespeichert.

Um einen Leseort für sich zu speichern, wählen Sie Text oder eine PDF-Region und wählen Sie **For me**; siehe [Lesebuchzeichen](bookmarks.md).

## Dateien nach Format lesen {/* #read-files-by-format */}

### Lesen Sie eine Ergebnistabelle {/* #read-a-result-table */}

<p className="example-label"><strong>Praxisbeispiel</strong> Lesen Sie die RNA-seq QC Tabelle, Abbildung und Bericht</p>

Öffnen Sie `rnaseq-sample-qc.csv`. In diesem Beispiel zeigt es **Zeilen 12 · Spalten 6** und verwendet die erste Zeile als Header. Horizontales Scrollen zeigt lange Quellspaltennamen und die Metriken rechts. Die Zeilennummern der Tabelle sind Anzeigepositionen, keine Gen- oder Beispiel-IDs.

![Die Zwölf-Stichproben-QC-Tabelle](/img/open-science/guides-walkthrough/42-rnaseq-table.webp)

Überprüfen Sie, ob Spaltenbeschriftungen und vollständige Bezeichner lesbar sind. Felddefinitionen und Überprüfungen gegen die freigegebene Baseline sind in [Tabellen und Datensätze](../tools/tables.md).

Die Quelle `.txt` ist eine tab-getrennte Matrix; Ein Text-Viewer kann es als Text anstelle des CSV-Rasters anzeigen. Benennen Sie die Erweiterung einer Datei nicht um und nehmen Sie an, dass sich ihr Abgrenzungszeichen oder ihre wissenschaftliche Bedeutung geändert haben. Sehr große Vorschauen können begrenzt werden; Lesen Sie ein angezeigtes Zeilen-/Spaltenlimit, bevor Sie die sichtbare Teilmenge als vollständigen Datensatz behandeln. Formatgrenzen sind in [Referenz](../reference/formats.md).

### Prüfen Sie die Abbildung {/* #inspect-the-figure */}

Öffnen Sie `rnaseq-library-sizes.png`. Verwenden Sie **Zoom in**, **Zoom out** und **Reset zoom**; Öffnen Sie den Vollbildbildschirm, wenn Achsenetiketten zu klein sind. Zoom ändert nur die Ansicht. Es wird die Quellmatrix nicht neu sortiert oder ein statistisches Ergebnis aktualisiert.

![Die tatsächliche Rohzählsumme in der Vollbildvorschau](/img/open-science/guides-walkthrough/54-rnaseq-figure.webp)

Lesen Sie die Rohzählachse, alle zwölf Sample Labels und deren Zuordnung im CSV/Report. Unterschiedliche Balkenhöhen allein schaffen keinen differentiellen Ausdruck. Das Beispiel ist eine deskriptive Voranalyseprüfung ohne Normalisierungs- oder Hypothesenprüfung.

### Methoden und Provenienz gemeinsam lesen {/* #read-methods-and-provenance-together */}

Markdown rendert Überschriften, Listen, Code und Links. Lesen Sie die Prüfsumme und Methode des Berichts, bevor Sie das gezeichnete Ergebnis akzeptieren. Ein autorisierter Link öffnet sein Ziel durch die entsprechende Quellvorschau oder externe Browseraktion; Überprüfen Sie den vollständigen Hostnamen, bevor Sie ihn als Beweismittel behandeln. Eine fehlgeschlagene oder blockierte Quellvorschau ist keine Bestätigung, dass der Inhalt gelesen wurde.

Verwenden Sie **Provenance**, um den Code, das Ausführungsprotokoll, die Nachrichten, die Umgebung und die Überprüfung des ausgewählten Artefakts zu überprüfen. Lesen Sie ein beliebiges **partial**-, **eingegrenzt**- oder **No review for this version**-Label mit [Notebook und Ausführungsnachweise](notebook.md).

### Lesen Sie Office-Dateien und mehrseitige Figuren {/* #read-office-files-and-multi-page-figures */}

<p className="example-label"><strong>Praxisbeispiel</strong> Inspect Office und TIFF lesen Kopien der QC Ergebnisse</p>

Die <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-reading.docx">Word-Bericht</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-sample-qc.xlsx">Excel Arbeitsmappe</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-overview.pptx">PowerPoint Slides</ExampleDownload> und <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-figures.tiff">zweiseitige TIFF</ExampleDownload> zeigen die gleichen gespeicherten GSE60450 QC-Ergebnisse. Es geht um das Lesen von Kopien, nicht um neue Analysen.

| Format | Schritte und was zu überprüfen ist |
| --- | --- |
| DOCX | Befestigen und öffnen Sie den Bericht. Scrollen Sie durch beide Seiten; Prüfen Sie die erste Musterzeile und den Methoden-/Interpretationstext. Vollbild-Vorschau gibt langen Linien mehr Platz. Es gibt kein Word Editing Ribbon. |
| XLSX | Öffnen Sie die Arbeitsmappe und wählen Sie **Zusammenfassung** oder **Proben** unten. Scrollen Sie horizontal für die letzte Spalte. Samples enthält 12-Datenzeilen plus Kopfzeile, Abstand und Quellnotizen; Der Viewer meldet 17 verwendete Zeilen, nicht 17 biologische Proben. Werte sind eine Vorschau der gespeicherten Arbeitsmappe, kein Beweis für eine neue Berechnung. |
| PPTX | Öffnen Sie die Folien und scrollen Sie vertikal von der QC-Zusammenfassung zu Methoden und Interpretation. Beide Folien sind im lokalen Beispiel dargestellt. Diese Lesefläche ist kein Präsentationseditor oder Diashow-Controller. |
| TIFF | Öffnen Sie die Figur und verwenden Sie **Nächste Seite / Vorherige Seite**. Die beiden Seiten zeigen rohe Bibliotheksgrößen und detektierte Genmediane. **Zoom in / Zoom out / Zoom zurücksetzen** die Ansicht ändert; Überprüfung **Seite 1 von 2** oder **Seite 2 von 2** bevor die Figur interpretiert wird. |
| JSON | Öffnen <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.json">Zusammenfassung</ExampleDownload> um Quelltext, Identifikatoren und Werte zu überprüfen. Es wird als Code und nicht als erweiterbarer Objektbaum angezeigt. |
| HTML | Öffnen <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.html">der Lesetisch</ExampleDownload>. **Source** zeigt die HTML; **Render** stellt das formatierte Dokument wieder her. Kein Modus wiederholt den QC. |

![Auswählen von Samples in der Vorschau der eigentlichen Arbeitsmappe](/img/open-science/local-todo-batch/47-workbook-samples.webp)

![Die zweite Seite des eigentlichen TIFF](/img/open-science/local-todo-batch/50-tiff-second-page.webp)

Wenn **Preview unavailable → Open this Office file in your default app to view it.** angezeigt wird, verwenden Sie **Open** für eine lokale Datei oder **Download** für einen verwalteten Upload und öffnen Sie sie dann in einer kompatiblen Anwendung. Dieses Fallback hält die Originaldatei verfügbar, wenn die eingebaute Vorschau sie nicht anzeigen kann.

### Andere unterstützte Zuschauer {/* #other-supported-viewers */}

In der folgenden Tabelle sind Vorschaumodi und Steuerelemente für unterstützte Dateitypen aufgeführt.

| Familie | Was zu inspizieren | Kontrollen und Grenzen |
| --- | --- | --- |
| PDF | Seitenzahl, lesbarer Text, Quelle PDF | Thumbnails, Skizzen, Dokumentensuche, Seitennavigation, Zoom und wählbare Regionen; Gescannte Seiten haben möglicherweise keinen durchsuchbaren Text |
| Code/Klartext | Betreffender Block und Sprache vollständig | Zeilennummern, Syntaxanzeige, Kopie/Download; Übergroße Inhalte können begrenzt werden |
| JSON / HTML | Struktur oder gerendertes Dokument | Rendering ist keine Berechtigung, Code mit Anwendungsprivilegien auszuführen. |
| Bilder / TIFF | Auflösung und ausgewähltes Bild | Bildzoom/-blende; TIFF hat einen dedizierten Rendering-Pfad |
| Bürodateien | Ob der Managed Renderer erfolgreich ist | Herunterladen/Öffnen von außen, wenn die Vorschau von DOCX/XLSX/PPTX nicht verfügbar ist; Preview ist keine vollständige Office-Bearbeitung |
| Biologische Sequenzen | Sequenzidentität und Umfang | Sequenzorientierte Ansicht für unterstützte FASTA-Eingaben |
| Molekularstrukturen | Parsed Modell und gewählte Darstellung | Drehen, Zoomen, Schwenken und unterstützte Darstellungen von Cartoon/Stick/Sphere/Surface/Line Fehlende Strukturdaten können eine Darstellung deaktivieren |
| Unbekannte oder nicht unterstützte Datei | Name, Größe und Fallback-Nachricht | Download für einen geeigneten externen Viewer; keinen gültigen Inhalt aus der Erweiterung ableiten |

Verknüpfen Sie für den PDF-Kontext nur die für die aktuelle Aufgabe relevanten Papiere und trennen Sie sie, wenn die nächste Aufgabe sie nicht verwenden soll. Die App unterstützt bis zu drei verknüpfte PDFs pro Sitzung. Eine Literaturaufzeichnung ohne angehängtes PDF liefert Metadaten, nicht den Nachweis, dass Volltext gelesen wurde; siehe [Bibliothek](library.md).

### Diagrammquelle und formatspezifische Steuerungen {/* #diagram-source-and-format-specific-controls */}

Wählen Sie für ein gerendertes Mermaid-Diagramm in einer Konversation **View source** in der Aktionsleiste aus, um den zugrunde liegenden Diagrammtext zu lesen; **View diagram** kehrt zum Rendering zurück. Der Umschalter wird nach dem Rendern verfügbar und deaktiviert, während ein Fehler das Diagramm ersetzt. Es ändert die Ansicht, nicht die Analyse- oder Quelldatei.

<p className="example-label"><strong>Beispiel</strong> Wechsel zwischen einem Mermaid-Diagramm und seiner Quelle</p>

In einer neuen Konversation fragen Sie: **Show a Mermaid flowchart with three steps: Attach a file → Inspect the preview → Save a report. Do not include file links.** Einmal gerendert, bewegen Sie den Mauszeiger über das Diagramm, wählen Sie **View source** aus und bestätigen Sie die drei Knoten. Wählen Sie **View diagram** zurück; Verwenden Sie **Vollbild anzeigen**, wenn Labels zu klein sind.

Das Diagramm zeigt die angeforderten Schritte an. Um eine gespeicherte Datei zu prüfen, öffnen Sie ihre eigentliche Dateikarte; Ein Diagrammknoten allein ist keine Artefaktreferenz.

| Format | Was zu überprüfen ist |
| --- | --- |
| Einseitiges PDF | Kein mehrseitiger Leseeintrag; Verwenden Sie die normalen Vorschau-Steuerelemente des PDF |
| CSV | Überprüfen Sie den angezeigten Bereich; Eine begrenzte Vorschau darf nicht als vollständiger Input/Export behandelt werden. |
| Büroarbeitsmappe | Überprüfen Sie das ausgewählte sichtbare Arbeitsblatt und den Rendererfehler; Verwenden Sie die Originaldatei für nicht unterstützte Bearbeitung |
| TIFF | Überprüfen Sie die ausgewählte Seite und das Rendering-Ergebnis, bevor Sie die Pixel- / Probenwerte interpretieren |
| JSON | Konsultieren Sie den erhaltenen Quelltext bei der Formatierung |
| Markdown-Tabellen | Konzentrieren Sie die Tabellenaktionen, um Kopier- / Download- / Vollbildsteuerungen mit der Tastatur zu verwenden |

Referenzen für die Implementierung: [Meerjungfrauenkontrollen](https://github.com/aipoch/open-science/commit/5f6e7995), [PDF-Zustand](https://github.com/aipoch/open-science/commit/2722da2a), [CSV](https://github.com/aipoch/open-science/commit/9275c2c0), [Büro](https://github.com/aipoch/open-science/commit/0291871f), [TIFF](https://github.com/aipoch/open-science/commit/52152ed4).

## Extrahieren PDF Zahlen und Tabellen {/* #pdf-extraction */}

Verwenden Sie dies, wenn Sie eine Figur oder eine wiederverwendbare Tabelle aus einer Literatur PDF benötigen. Fügen Sie hinzu und prüfen Sie zuerst das PDF in [Bibliothek](library.md); Bibliografische Metadaten allein sind kein Extraktionseingang.

1. Öffnen Sie die PDF-Vorschau und wählen Sie **Figures and tables** neben **Original PDF**.
2. Wählen Sie bei der ersten Verwendung **Download and continue**, um die erforderlichen Modellressourcen zu installieren. Warten Sie auf Installations- und Integritätsprüfungen. Wenn Ressourcen bereit sind, verwenden Sie **Analyze PDF**.
3. Folgen Sie dem Seitenfortschritt. Wählen Sie nach Abschluss einen Kandidaten aus und verwenden Sie **Show in PDF**, um ihn mit der Quellseite, der Beschriftung und dem umgebenden Text zu vergleichen.
4. Öffnen Sie für eine Figur die Bildvorschau und verwenden Sie **Copy image** oder **Download image**. Wählen Sie für eine Tabelle **Table**, wählen Sie **TSV**, **HTML** oder **Markdown** und verwenden Sie dann die Aktion Kopieren/Download. Wählen Sie **Image**, wenn Sie die Ausgangspflanze inspizieren müssen.
5. Öffnen Sie die exportierte Datei erneut. Überprüfen Sie die Zeilen-/Spaltenausrichtung, zusammengeführte Header, Einheiten, Fußnoten und übergreifenden Inhalt, bevor Sie sie in einer Analyse oder einem Bericht verwenden.

Die Extraktion läuft lokal, nachdem die Modellressourcen heruntergeladen wurden. Das erneute Öffnen des gleichen PDF kann zwischengespeicherte Ergebnisse wiederverwenden; **Analyze again** wiederholt die Extraktion bei Bedarf. Stornieren Sie die Fortschrittskontrolle, wenn Sie aufhören müssen. Wenn die Analyse unvollständig ist, überprüfen Sie den Hinweis auf der gescheiterten Seite, anstatt die sichtbaren Kandidaten als vollständiges Dokument zu behandeln.

**Unplaced table text** und **Table notes** bewahren Inhalte, die überprüft werden müssen. Wenn strukturierte Zellen nicht verfügbar sind, ist die Ausgangskultur und das ursprüngliche PDF zu verwenden; keine fehlenden Zellen ableiten. Gescannte und gedrehte Seiten werden von diesem Extraktions-Workflow nicht unterstützt. Ein PDF kann auch dann lesbar bleiben, wenn die Extraktion nicht verfügbar ist.

### Fragen Sie den Agenten nach einer extrahierten Figur oder Tabelle {/* #pdf-agent-evidence */}

1. Öffnen Sie das beabsichtigte PDF, verwenden Sie **Read with agent**, um es mit der aktuellen Sitzung zu verknüpfen, und führen Sie die **Figures and tables**-Analyse für die entsprechenden Seiten aus. Bevor Sie Ihre Frage senden, bestätigen Sie, dass das PDF im Lesekontext des Komponisten verbleibt. Ein Bibliotheksdatensatz an sich ist kein verknüpftes PDF, und die Verknüpfung allein führt diese Analyse nicht aus.
2. Fragen Sie nach einer bestimmten Zahl, Tabelle oder einem Algorithmus. Fügen Sie das Etikett oder die Seite und die Frage hinzu, die Sie beantworten müssen.
3. Überprüfen Sie die Werkzeugaktivität: **list_pdf_elements** findet die verfügbaren extrahierten Elemente; **read_pdf_element** liest die ausgewählten Beweise. Fragen Sie nach der Quellseite und fehlenden oder unsicheren Inhalten in der Antwort.
4. Vergleichen Sie die Antwort mit der ursprünglichen Abbildung oder Tabelle, einschließlich Kopfzeilen, Einheiten und Notizen. Wenn die Extraktion fehlt oder unvollständig ist, analysieren Sie die fehlenden Seiten und versuchen Sie es erneut; Eine Beschriftung allein kann keinen Trend oder einen genauen Tabellenwert festlegen.

<p className="example-label"><strong>Beispiel</strong> Fordern Sie Tabellennachweise von einem verlinkten Papier an</p>

> Lesen Sie Tabelle 1 aus den verknüpften PDF extrahierten Elementen. Melden Sie die physische PDF-Seite, Spaltenüberschriften und Werte, die für meine Frage relevant sind. Einheiten und Fußnoten aufbewahren und fehlende Zellen oder unvollständige Extraktion identifizieren.

Diese Werkzeuge lesen vorhandene Extraktionsergebnisse; Sie starten die PDF-Analyse nicht. Die Tabellenausgabe kann in mehreren Chargen ankommen, und Abbildungs- / Algorithmusbeweise können als Bild geliefert werden. Überprüfen Sie, ob das ausgewählte Modell die erforderliche Bildeingabe unterstützt; Ein geliefertes Bild allein beweist nicht, dass es richtig interpretiert wurde.

## Remote-Medien absichtlich laden {/* #remote-media */}

Bilder, audio und video, die von einer modellantwort verknüpft sind, warten darauf, dass sie das laden aktivieren. Lesen Sie die Ziel-Hostnamen, die vom Steuerelement angezeigt werden, bevor Sie fortfahren. Die Genehmigung gilt für das angezeigte Element und seine URLs, nicht für jede zukünftige Antwort oder die gesamte Domain. Durch das Schließen der Vorschau wird eine bereits gesendete Anforderung nicht rückgängig gemacht.

Meerjungfrau-Diagramme, die Remote-Bilder enthalten, können vor dem Laden blockiert werden; Fordern Sie bei Bedarf ein gewöhnliches Diagramm ohne eingebettete Bilder an. Bei Bildern, die an ein Modell gesendet werden, entfernt Open-Science zusätzliche Metadaten aus der Modelleingangskopie, während die ursprüngliche Datei erhalten bleibt. Dadurch werden keine sensiblen Inhalte entfernt, die sichtbar im Bild vorhanden sind.

## Überprüfen Sie die heruntergeladene Datei {/* #verify-the-downloaded-file */}

Öffnen Sie die vorgesehene Vorschau, wählen Sie **Download**, bestätigen Sie den Dateinamen und den Speicherort im Systemspeicherdialog und speichern Sie dann. Öffnen Sie die heruntergeladene Kopie und überprüfen Sie deren Inhalt. Download speichert die Originaldatei; Das Umschalten der TIFF-Seite oder des Excel-Blatts beschränkt den Download nicht auf diese Seite oder dieses Blatt.

## Wenn eine Vorschau fehlschlägt {/* #when-a-preview-fails */}

Bestätigen Sie die erfolgreich gespeicherte Datei und überprüfen Sie dann die genaue Version und das Format. Versuchen Sie Herunterladen, um eine Viewer-Beschränkung von einer nicht verfügbaren Datei zu unterscheiden. Für eine lokale Datei, die außerhalb der App geändert wird, verwenden Sie Reload, wo angeboten. Überschreiben Sie die Eingabe nicht, um ein Rendering-Problem zu beheben. Melden Sie den Dateinamen, den Typ, die Größe, die App-Version und den angezeigten Fehler; private Dateiinhalte ausschließen, es sei denn, sie werden für die Diagnose benötigt.

## Annotieren eines PDF {/* #annotate-a-pdf */}

Öffnen Sie **Notes & Annotations**, um Highlights, Bereichsmarkierungen, Seitennotizen und Dokumentnotizen zu verwalten. **Show notes sidebar** hält Notizen neben der Originalseite. Das Downloadmenü trennt **Download original PDF** von **Download PDF with annotations**. Folgen Sie [PDF Anmerkungen und Dokumentnotizen](pdf-notes.md) für ein vollständiges Lesen, Suchen und Exportieren.

Für **Abbildungen und Tabellen** kann die erstmalige lokale Modellinstallation genehmigte Download-Spiegel ausprobieren, wenn die Primärquelle nicht erreichbar ist. Warten Sie auf Download- und Integritätsprüfungen, bevor Sie **Analyze PDF** auswählen. Spiegel entfernen nicht die Notwendigkeit, diese Ressourcen zu installieren; ein zwischengespeichertes Ergebnis kann ohne eine neue Analyse wieder geöffnet werden.

## Lesen Sie ein PDF in der ersten Nachricht {/* #first-message-pdf */}

1. Öffnen Sie ein Papier mit einem lesbaren PDF in **Library** und wählen Sie **Read with agent**.
2. Wählen Sie das Zielprojekt und **New conversation**. Prüfen Sie, ob der Komponist das PDF unter **Lesen** und die Vorschau **In session context** zeigt.
3. Stellen Sie sofort eine Frage. Sie müssen keine separate Einführungsnachricht senden, bevor Sie das Papier verlinken.

<p className="example-label"><strong>Praxisbeispiel</strong> Fragen Sie nach dem Mechanismus in Lang et al., 2019</p>

Das Beispiel verwendet [Nicht defektstabilisierter thermisch stabilisierter Einatomkatalysator](https://doi.org/10.1038/s41467-018-08136-3), ein Open-Access-Papier unter CC BY 4.0, mit **Codex subscription**.

![Ein neues Gespräch mit dem PDF verlinkt unter Lesen vor seiner ersten Nachricht](/img/open-science/v0331/pdf-first-message.webp)

```text
Using the linked PDF, explain how Lang et al. distinguish non-defect
stabilization from defect trapping. Give the paper title and DOI,
two specific findings with PDF page or figure locations, and one
limitation. Keep the answer in English and cite only evidence you
can actually read.
```

Die Antwort ruft Passagen aus dem verknüpften PDF ab und identifiziert das Papier, den Mechanismus und die zu überprüfenden Standorte. Öffnen Sie die zitierten Seiten neben der Antwort und überprüfen Sie jeden Anspruch gegen das Original. Ein Verweis auf eine Figur im Text bedeutet nicht, dass das Figurenbild extrahiert oder visuell interpretiert wurde; Verwenden Sie [Abbildungen und Tabellen](#pdf-extraction), wenn ein Bildnachweis erforderlich ist.

![Eine englische Antwort neben dem ursprünglichen PDF, wobei der Lesekontext beibehalten wurde](/img/open-science/v0331/pdf-first-response.webp)

Für Highlights und Notizen auf Dokumentebene fahren Sie mit [PDF-Anmerkungen](pdf-notes.md) fort.
