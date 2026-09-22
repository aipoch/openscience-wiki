---
title: "PDF Anmerkungen und Dokumentnotizen"
description: "Markieren Sie Passagen, sammeln Sie Dokumentnotizen, finden Sie sie wieder und exportieren Sie eine Lesekopie."
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# PDF Anmerkungen und Dokumentnotizen {/* #pdf-annotations-and-document-notes */}

Verwenden Sie PDF-Notizen, um Fragen neben einer Passage aufzuzeichnen, eine Zahl für eine Gruppenbesprechung zu markieren oder Kommentare zu einem ganzen Papier zu sammeln. Anmerkungen gehören zum verwalteten **Dateiversion**, so dass das Wiedereröffnen dieser Version seine Notizen zurückbringt. Sie senden keine Nachricht an den Agenten oder ändern die ursprünglichen PDF-Bytes.

## Wählen Sie das richtige Lesewerkzeug {/* #choose-the-right-reading-tool */}

| Tool | Was es hält | Wo man es finden kann |
| --- | --- | --- |
| PDF **Notes & Annotations** | Highlights, Bereichsmarkierungen, Seitennotizen und Dokumentnotizen für eine verwaltete PDF-Version | Die Notizenansicht oder Seitenleiste des PDF; Notizen und zitierter Text sind auch unter **Library** |
| **For me** Lesezeichen | Ein privater Leseort und optionale Notiz, die zu einer Sitzung gehören | Diese Sitzung ist **Bookmarks** Liste; siehe [Persönliche Lesezeichen](bookmarks.md) |
| **To Agent** Anmerkung | Material, das für eine Frage oder eine Anweisung vorbereitet wurde | den beabsichtigten Meldungsentwurf; Überprüfen Sie es vor dem Senden |

## Markieren Sie eine Passage und halten Sie eine Frage {/* #annotate-passage */}

<p className="example-label"><strong>Praxisbeispiel</strong> Bereiten Sie Lesenotizen für ein Treffen einer Einzelatom-Katalysegruppe vor</p>

Dieses Beispiel verwendet Lang et al., [Nicht defektstabilisierter thermisch stabilisierter Einatomkatalysator](https://doi.org/10.1038/s41467-018-08136-3), ein Open-Access-Papier, das im [Gruppen-Meeting Workflow](../workflows/journal-club.md) verwendet wird. Besorgen Sie sich das PDF vom Publisher und importieren Sie es in [Bibliothek](library.md). Öffnen Sie den PDF-Anhang aus seiner Referenzzeile. Das Beispiel fragt, wie das Papier seinen Stabilisierungsmechanismus unterstützt; Das Hervorheben eines Abstracts ist keine unabhängige Überprüfung dieses Mechanismus.

1. Suchen Sie in **Original PDF** die Passage und überprüfen Sie die Seitenzahl. Verwenden Sie Zoom, wenn der Text zu klein ist.
2. Wählen Sie **Annotate selected text** und ziehen Sie dann den Text durch. **Mark style** wählt den Textmarkierungsstil. In diesem Beispiel wird der erste Teil des Page-One-Abstracts hervorgehoben.
3. Öffnen Sie **Annotation note**, schreiben Sie eine Frage oder eine Leseerinnerung und wählen Sie **Save**. In der Beispielnotiz wird der Leser aufgefordert, die Defektstabilisierung mit der vorgeschlagenen kovalenten Metall-Träger-Wechselwirkung zu vergleichen und die unterstützenden Experimente zu überprüfen.
4. Wählen Sie **Show notes sidebar**, um die gespeicherte Notiz neben dem PDF zu behalten. Hinzufügen eines vorhandenen Tags mit **Add tag**; In diesem Beispiel wird **Favorites** verwendet.
5. Kehren Sie zu **Select** zurück, wenn Sie den Text markiert haben. Verwenden Sie **Undo annotation change** und **Redo annotation change** für die letzten Annotationsbearbeitungen, anstatt die Quelle PDF zu ändern.

![Ein gespeichertes Highlight und Lesenotiz neben dem Original PDF](/img/open-science/v0320/pdf-highlight-sidebar.webp)

Verwenden Sie für eine Figur oder gescannte Seite **Select area to annotate** und markieren Sie die beabsichtigte Region. Eine Regionsmarke kennzeichnet ein Gebiet; Sie extrahiert weder ihren Text noch überprüft sie die Zahl. Wenn Text nicht ausgewählt werden kann, kann eine Bereichsmarke den Speicherort beibehalten, den Sie erneut besuchen müssen.

## Sammeln von Seiten- und Dokumentnotizen {/* #document-notebook */}

1. Öffnen Sie **Notes & Annotations** oder wählen Sie **Open full notes view** aus der Seitenleiste.
2. Verwenden Sie **Add note → Add document note** für eine Frage zum gesamten Papier. Verwenden Sie **Add page note** für eine bestimmte Seite und überprüfen Sie das Seitenfeld vor dem Speichern.
3. Geben Sie die Notiz ein und wählen Sie **Save**. Hier wird in der Dokumentnotiz gefragt, welche Mikroskopie, Spektroskopie und katalytischen Messungen isolierte Atome von Nanopartikeln nach dem Erhitzen unterscheiden.
4. Verwenden Sie **Search & filter**, um Notizen nach Text, Typ oder Tags zu finden. In der Seitenleiste ändern **All notes** und **Current page**, welche Annotationen angezeigt werden.
5. Wählen Sie **Show annotation source** in einer Passage oder Region Note, um an den gespeicherten Speicherort zurückzukehren. **Edit annotation note** ändert den Kommentar; **Delete annotation** entfernt diese Annotation, nicht die PDF.

![Die Dokumentnotiz und das markierte Highlight in der vollständigen Notes and Annotations-Ansicht](/img/open-science/v0320/pdf-notebook.webp)

## Finden Sie eine Notiz aus einer anderen Ansicht {/* #find-notes */}

Öffnen Sie die globale Suche mit **Cmd/Ctrl+K**, geben Sie eine Phrase aus Ihrer Notiz ein und wählen Sie **Library** aus. Dieses Beispiel sucht nach `covalent metal-support`. Wählen Sie das Ergebnis, um **Notes** getrennt von **Quoted text** zu lesen, und wählen Sie dann **Show annotation source**, um den PDF an seiner markierten Passage zu öffnen.

![Globale Suche trennt die gespeicherte Lesenotiz vom zitierten PDF-Text](/img/open-science/v0320/pdf-search-details.webp)

Überprüfen Sie den Dateinamen, die Dateiversion und die Seite beim erneuten Besuch einer Notiz. Eine PDF-Notiz ist nicht automatisch eine neue Nachricht oder Anweisung für Main. Verwenden Sie **To Agent** und prüfen Sie den Entwurf, wenn Sie den Agenten nach dem Material fragen möchten.

## Exportnotizen oder Lesekopie {/* #export-notes */}

| Ausgabe | Stufen | Was zu überprüfen ist |
| --- | --- | --- |
| Markdown- oder CSV-Notizen | Stellen Sie in **Notes & Annotations**, wählen **Markdown** oder **CSV**, dann **Export notes** | Öffnen Sie die gespeicherte Datei und überprüfen Sie das Zitat, den Kommentar, die Seite und die Tags. mit einem Teilmengenfilter, **Export filtered notes** Diese Untergruppe wird exportiert. Klare Filter, wenn Sie jede Notiz benötigen. |
| PDF mit Anmerkungen | Öffnen Sie das PDF Download-Menü und wählen Sie **Download PDF with annotations** | Speichern Sie eine separate Datei und öffnen Sie sie erneut in einem PDF-Reader. Überprüfen Sie den Highlight- und Notiz-Inhalt, nicht nur, dass eine Datei existiert. |
| Original-PDF | Wählen Sie **Download original PDF** | Dies speichert die Quellbytes, ohne die Markierungen des Dokumentheftbuchs hinzuzufügen. |

![Separate original-PDF und annotated-PDF Download-Aktionen](/img/open-science/v0320/pdf-export-options.webp)

Das Beispiel speichert zwei Notizen: ein Highlight mit einem Kommentar und eine Dokumentnotiz. Beide erscheinen im <ExampleDownload path="/examples/v0320/lang2019-notes.md">Markdown-Ausfuhren</ExampleDownload> und <ExampleDownload path="/examples/v0320/lang2019-notes.csv">CSV Export</ExampleDownload>. Das kommentierte PDF bewahrt die zehn Seiten des Papiers und fügt das Highlight und die Notiz hinzu; Der ursprüngliche Download bleibt getrennt. Papierauszüge stammen von Lang et al. unter dem [CC BY 4.0 Lizenz](https://creativecommons.org/licenses/by/4.0/) des Papiers; Die Kommentare lesen Fragen zu diesem Beispiel.

## Wo Notizen geteilt werden {/* #where-notes-are-shared */}

Ein **Bibliotheksbefestigung** teilt sein Notizbuch über Referenzen, Projekte und Sitzungen, die die gleiche verwaltete Dateiversion verwenden. **Projekt-Uploads und Artefakte** teilt sein Notebook über Sitzungen innerhalb des Besitzprojekts. Eine neuere Dateiversion ist ein anderes Annotationsziel: Überprüfen Sie die Version, bevor Sie annehmen, dass eine Markierung zu einem überarbeiteten Dokument gehört.

Diese Notizen werden lokal gespeichert und synchronisieren sich nicht über Maschinen hinweg. Exportieren Sie für eine Übergabe die Notizen oder ein kommentiertes PDF und prüfen Sie, was der Empfänger erhalten wird. Dies ändert keine privaten Session-Lesezeichen oder macht jede Lesenotiz Teil eines [.science Forschungspaket](research-packages.md).
