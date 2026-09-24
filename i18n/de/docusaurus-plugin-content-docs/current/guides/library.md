---
title: "Literaturbibliothek und Zitate"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Literaturbibliothek und Zitate {/* #literature-library-and-citations */}

Um neue Artikel online zu finden, nennen Sie im Gespräch Thema, Zeitraum und Auswahlkriterien. Prüfen Sie anschließend die vorgeschlagenen Einträge unter **Library → Inbox**. Siehe [Journal-Club-Ablauf für die thematische Suche](../workflows/journal-club.md). **Search references** filtert bereits vorhandene Einträge in Library und führt keine Online-Literatursuche aus.

Die Bibliothek ist eine gemeinsame lokale Bibliographie. Projekte und Sammlungen verlinken auf ihre Aufzeichnungen; Das Hinzufügen des gleichen Papiers zu einer anderen Sammlung erfordert keine weitere Kopie. Dieses Handbuch verwendet die drei echten PRISMA Papiere aus dem [Core-Lese-Workflow](../workflows/core-reading-list.md). Dieser Workflow besitzt das Forschungsziel und die Akzeptanz-Checkliste; Auf dieser Seite werden die Kontrollen der Bibliothek und der Lebenszyklus der Aufzeichnung erläutert.

Um eine Abbildung oder Tabelle aus einem angehängten PDF wiederzuverwenden, folgen Sie [PDF-Extraktion](previews.md#pdf-extraction). Metadatenimport und automatischer Volltextabruf extrahieren selbst keine Zahlen oder Tabellen.

## Wählen Sie die richtige Ansicht {/* #choose-the-correct-view */}

Öffnen Sie **Library** von zu Hause oder dem Arbeitsbereich. **Back to Home** kehrt zur Projektnavigation zurück. Das **Settings** der Bibliothek öffnet Zitierstile, nicht globale Modelleinstellungen.

| Anzeigen | Enthält | Verwenden Sie es für |
| --- | --- | --- |
| Posteingang | Von Agenten entdeckte Kandidaten, die auf Ihre Überprüfung warten | Identitäten und Quellen vor der Annahme prüfen |
| Alle Literaturangaben | Akzeptierte aktive Aufzeichnungen | Suchen, bearbeiten und organisieren Sie Ihre Bibliographie |
| Duplikate | Verdächtige Kennung/Metadatenübereinstimmungsgruppen | Vergleichen vor dem Merging |
| Papierkorb | Entfernte Referenzdatensätze | Wiederherstellen oder absichtlich dauerhaft löschen |
| Projekt | Referenzen im Zusammenhang mit diesem Projekt | Halten Sie die Bibliographie für eine Forschungsfrage relevant |
| Sammlung | Eine thematische Gruppe, einschließlich verschachtelter Sammlungen | Wiederverwenden eines Lesesatzes über Projekte hinweg |

![Drei akzeptierte Papiere in der echten PRISMA-Sammlung](/img/open-science/guides-walkthrough/51-library-collection.webp)

## Hinzufügen oder Importieren eines Datensatzes {/* #add-or-import-a-record */}

Wählen Sie **Add** und wählen Sie die Quelle. Auswählen eines PDF öffnet seinen Metadateneditor; Auswählen mehrerer Öffnungen **Import PDFs**.

| Eingang | Eingabe | Prüfung vor dem Einsparen |
| --- | --- | --- |
| Literaturangabe hinzufügen | Manuell eingegebene Bibliographie | Erforderlicher Titel, Referenztyp und Kennungen |
| PDF importieren | Eine oder mehrere lokale PDFs | Extrahierte Metadaten für jedes Papier; Multi-File-Auswahl verwendet den Batch-Flow unten |
| Literaturangaben importieren | BibTeX, RIS oder NBIB | Gültige/ungültige Einträge, Ziel- und Kennung Übereinstimmungen |

<ToolOperationGroup>
<summary>Importieren der ausgewählten PDFs eines Ordners</summary>

### Importieren der ausgewählten PDFs eines Ordners {/* #import-a-folders-selected-pdfs */}

1. Wählen Sie die PDFs für das Leseset aus. Warten auf Metadatenextraktion; a detektiertes DOI kann verwendet werden, um bibliographische Felder zu vervollständigen. Überprüfen Sie das Ergebnis mit dem Papier.
2. Überprüfen Sie das Ziel, das neben **Import to** angezeigt wird; Es kommt aus der Bibliotheksansicht, in der Sie den Import gestartet haben. Wählen Sie unter **When identifiers match** eine Richtlinie aus der folgenden Tabelle aus.
3. Verwenden Sie jedes Kontrollkästchen oder **Select all**, um diesen Batch auszuwählen. **Show more** zeigt zusätzliche aufgelistete Dateien.
4. Wählen Sie **Import selected**. Lesen Sie den Gesamtfortschritt und den Status jeder Datei; Eine fehlgeschlagene Datei ist kein abgeschlossener Import.
5. Um zu stoppen, wählen Sie **Stop** und warten Sie, bis **Stopping…** sich beruhigt hat. Bereits festgelegte Referenzen bleiben bestehen; ein Flugbetrieb während des Fluges kann beendet werden.
6. Wählen Sie nach dem Stoppen die verbleibenden Ready-Dateien aus und verwenden Sie **Import selected**. Wenn der Dialog **Retry unfinished** nach einem Fehler anbietet, verwenden Sie ihn für die unvollendete Auswahl. Überprüfen Sie alle gespeicherten Referenzen, bevor Sie einen neuen Import starten, insbesondere wenn der PDF-Upload unterbrochen wurde.
7. Verwenden Sie **Done** oder **Close**, wenn der Dialog ihn anbietet, öffnen Sie dann das Ziel und überprüfen Sie seine Datensätze und PDFs. **Cancel** verzichtet auf die Vorbereitung vor dem Import.

| Identifier-Match-Politik | Ergebnis |
| --- | --- |
| Vorhandenen Eintrag verwenden | Verwenden Sie den passenden Datensatz wieder, anstatt einen weiteren Bibliographieeintrag zu erstellen |
| Als separaten Eintrag behalten | Halten Sie einen eindeutigen Datensatz für einen späteren Vergleich und eine doppelte Überprüfung |
| Leere Felder ergänzen | Füllen Sie fehlende Felder aus, während Sie vorhandene / widersprüchliche Werte beibehalten |

Der Ansatz kann **Pending**, **Reading…**, **Ready**, **Importing…**, **Completed**, **Failed** oder **Skipped** zeigen. Auswahl, Metadatenbereitschaft und Importabschluss sind getrennte Zustände. Wenn die App **PDF upload cancelled. The reference was kept.** meldet, überprüfen Sie, ob die Anhänge des Datensatzes beibehalten wurden; Durch das Abbrechen des Uploads wurde der Bibliographie-Eintrag nicht entfernt.

![Zwei echte PRISMA PDFs bereit zum Import](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

Mit **Reuse existing reference** kann ein PDF, dessen extrahierter Titel oder DOI nicht übereinstimmt, immer noch einen separaten Datensatz erstellen. Öffnen Sie nach dem Import jedes Papier und bestätigen Sie seinen Titel und DOI. Korrektur von Fehlanpassungen vor [Zusammenführung von Duplikaten](#resolve-duplicates-and-recover-references). **Completed** bestätigt Import, nicht genaue Identifizierung.

![Abgeschlossene Chargen- und Datenergebnisse](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Stoppen Sie eine Charge, ohne abgeschlossene Arbeit zu verlieren</summary>

### Stoppen Sie eine Charge, ohne abgeschlossene Arbeit zu verlieren {/* #stop-a-batch-without-losing-completed-work */}

Eine **Stop**-Anforderung ermöglicht das Ausführen des aktuellen Elements. Überprüfen Sie jede Zeile: **Completed**-Elemente werden beibehalten und können nicht erneut ausgewählt werden; Wählen Sie die verbleibenden **Ready**-Zeilen aus und verwenden Sie **Import selected**, um fortzufahren. Wenn Fehler **Retry unfinished** aussetzen, korrigieren Sie die gemeldete Ursache, bevor Sie erneut versuchen, und überprüfen Sie, ob die abgeschlossenen Datensätze nicht dupliziert wurden.

![Gestoppter PDF-Import behält seine abgeschlossene Reihe](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

**The reference was kept. Retry to finish adding its PDF.** bedeutet, dass der Bibliographieeintrag gespeichert wurde, aber seine Anlage unvollendet ist. Prüfen Sie, ob das ursprüngliche PDF noch am ausgewählten Standort verfügbar ist und sich normal öffnet, und wählen Sie dann **Retry unfinished** aus. Kehren Sie nach dem erneuten Versuch zur Zielsammlung zurück und öffnen Sie den PDF, um den Inhalt zu überprüfen. Wenn das Ergebnis nicht bestätigt werden konnte, inspizieren Sie Ihre Bibliothek, bevor Sie einen weiteren Import starten.


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Bringen Sie eine Bibliographie von einem anderen Referenzmanager mit</summary>

### Bringen Sie eine Bibliographie von einem anderen Referenzmanager mit {/* #bring-a-bibliography-from-another-reference-manager */}

<p className="example-label"><strong>Praxisbeispiel</strong> Importieren Sie PRISMA-Datensätze mit drei übereinstimmenden Richtlinien</p>

Öffnen Sie zuerst die Zielsammlung und wählen Sie dann **Import references** und eine `.bib`-, `.ris`- oder `.nbib`-Datei aus. In der Vorschau werden das erkannte Format, das Ziel, die neu/existierenden/übersprungenen Zählungen und die übereinstimmenden Datensätze gemeldet. Erweitern Sie **View details**, um Titel und Autoren vor dem Import zu überprüfen. Bibliographische Importe laden keine PDFs herunter.

| Wahlmöglichkeit | Geprüftes Ergebnis mit der PRISMA-Anweisung |
| --- | --- |
| Als separaten Eintrag behalten | BibTeX hat einen Datensatz erstellt; Duplikate enthielten dann eine Matching-DOI-Gruppe |
| Vorhandenen Eintrag verwenden | RIS wiederverwendet einen Datensatz, wobei Null erstellt, übersprungen oder fehlgeschlagen ist |
| Leere Felder ergänzen | Die [PubMed NBIB Rekord](https://pubmed.ncbi.nlm.nih.gov/19621072/) Hinzugefügt PMID `19621072` und PMCID `PMC2707599`; bestehender Titel und fünf Schöpfer blieben |

Klicken Sie auf **Import references**, warten Sie auf **Import complete**, prüfen Sie Created/Reused/Skipped/Failed und wählen Sie dann **Done** aus. Öffnen Sie den Datensatz erneut: Eine Importzählung allein stellt keine korrekten Metadaten her. Durch das Ausfüllen leerer Felder können Bezeichner und ein abgekürzter Zeitschriftenname hinzugefügt werden, ohne den vollständigen Zeitschriftentitel zu ersetzen.

![BibTeX-Import mit expliziter Doppelrichtlinie](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![NBIB-Import füllt fehlende bibliographische Felder aus](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## Überprüfen Sie Inbox-Beweise {/* #review-inbox-evidence */}

<p className="example-label"><strong>Praxisbeispiel</strong> Überprüfen Sie drei PRISMA Kandidaten</p>

Öffnen Sie den Kandidatentitel oder **View details**. Überprüfen Sie den Anbieter, den Quelllink und die DOI/anderen Identifikatoren und vergleichen Sie dann Jahr, Autorauftrag und Veröffentlichung mit dem Herausgeber. **Accept** fördert es in die Bibliothek; **Dismiss** entfernt es aus der Überprüfungswarteschlange. Überprüfen Sie die Zeilenauswahl vor Batchaktionen.

![Drei echte PRISMA-Kandidaten warten auf eine Überprüfung](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

In diesem Beispiel wurden die drei Kandidaten einzeln akzeptiert und Inbox wurde klar. Ein Provider-Match ist ein Startrekord, keine vollständige bibliographische Validierung. Das Veröffentlichungsjahr der 2020-Erklärung ist **2021**. Die beiden 2009-Papiere haben unterschiedliche DOIs und Autorenlisten.

## Überprüfen und korrekte Metadaten {/* #inspect-and-correct-metadata */}

Öffnen Sie eine Referenz, dann **More actions → Edit metadata**. Überprüfen Sie die aktuellen Werte, bevor Sie **Complete metadata** verwenden, das einen Lookup anstelle einer rein lokalen Bearbeitung durchführt.

![Gespeichertes Organisations-Autor-Feld wieder geöffnet](/img/open-science/v0.27.0/04-organization-author.webp)

| Feld/Steuerung | Input und Wirkung |
| --- | --- |
| Literaturart | Wählen Sie die bibliographische Art: Artikel, Rezension, Preprint, Buch, Dataset und andere unterstützte Arten |
| Titel | erforderlich; Bewahren Sie den veröffentlichten Titel |
| Jahr / Veröffentlichung | Veröffentlichungsjahr und Zeitschrift/Container; Ein Jahr, das in den Titel eingebettet ist, kann sich unterscheiden |
| Erweiterte Einstellungen | Volume, Issue, Pages, Publisher, Place und Edition |
| Creator hinzufügen / Creator entfernen | Hinzufügen oder Entfernen einer Creator-Zeile im Entwurf |
| Rolle | Wählen Sie Autor, Editor oder Übersetzer, um der Quelle zu entsprechen |
| Name type → Person | Vorname und Familienname eintragen |
| Name type → Organisation | Geben Sie den vollständigen Namen der Organisation ein; Teilen Sie es nicht in erfundene Personennamen auf |
| Identifikator hinzufügen | Typ und Wert: DOI, PMID, PMCID, ARXIV, ISBN, ISSN oder ANDERE |
| Bevorzugt für DOI / ISSN, etc. | Wählen Sie den bevorzugten Identifikator innerhalb dieses Typs; Die Wahl ist nicht eine globale Flagge über alle Arten hinweg |
| Identifikator entfernen | Entfernt die Draft Identifier Zeile |
| URL / Abstract | Quelladresse und bibliographische Zusammenfassung |
| Speichern | Beharren Sie auf gültigen Edits |
| Stornieren / Schließen | Verwerfen Sie den Entwurf |

<p className="example-label"><strong>Praxisbeispiel</strong> Bewahren Sie die PRISMA Group als Organisationsautor</p>

Um **Die PRISMA Gruppe** hinzuzufügen, wählen Sie **Add creator → Creator role: Author → Name type: Organization**, geben Sie den vollständigen Namen und **Save** ein. Öffnen Sie die Aufzeichnung erneut und überprüfen Sie, ob die Organisation ihren vier persönlichen Autoren folgt. Vergleichen Sie das generierte Zitat mit dem [Autorenliste des Herausgebers](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097).

![APA-Referenz bewahrt den Autor der Organisation](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2 korrigiert PubMed Autor-Name-Parsing, einschließlich Nachnamen, Initialen und Suffixe. Überprüfen Sie beim Importieren oder Vervollständigen von Metadaten die Erstellerfelder und generierten Zitate mit der verknüpften Quelle. Gehen Sie nicht davon aus, dass durch die Installation des Updates bereits in Ihrer Bibliothek gespeicherte Metadaten neu geschrieben werden.

## Intelligente Sammlungen {/* #smart-collections */}

Schalten Sie **Smart collection** in **New collection** ein, um Bibliotheksdatensätze mit expliziten Regeln zu screenen. Wählen Sie **Scope** (alle Referenzen, ein Projekt oder eine Sammlung), fügen Sie erforderliche **Inclusion criteria** und optionale **Exclusion criteria** hinzu und wählen Sie dann die Evidenz- und Aktualisierungsoptionen aus. Im Gegensatz zu einer gewöhnlichen Sammlungsbeschreibung bieten Smart-Collection-Beschreibungen einen Kontext für die Modellbewertung.

**Settings → Model → Classification models → Smart collections** zuerst konfigurieren; Dieses Feature hat kein Standardmodell. **Included**, **Needs review**, **Excluded** und **Not evaluated** unterscheiden übereinstimmende, unsichere, abgelehnte und nicht bewertete Datensätze. Öffnen Sie **Evaluation details** und überprüfen Sie die tatsächliche Quelle, bevor Sie **Include** oder **Exclude** auswählen. Manuelle Entscheidungen überleben Updates, bis Sie die Modellentscheidung wiederherstellen.

**Trial run (up to 20 references)** speichert Ergebnisse. **Live rule preview** wertet einen Entwurf aus, ohne ihn zu speichern. **Update automatically** gilt für neue oder geänderte Datensätze im ausgewählten Bereich; es ist opt-in und kann Klassifizierungskosten verursachen. Es entdeckt keine neuen Papiere außerhalb der Bibliothek. Folgen Sie [Der illustrierte Screening-Workflow](../workflows/screen-literature.md) von der Suche bis zum überprüften Export.

Öffnen Sie während eines Laufs **Screening process**, um den Fortschritt zu überprüfen, und verwenden Sie **Pause/Resume Analyse**, um anzuhalten oder fortzufahren. Änderungen an Regeln, Papieren oder gespeicherten Fortschritten können dazu führen, dass ein vorheriger Lauf nicht wieder aufgenommen werden kann. **Zurück zu den Ergebnissen** kehrt zur Entscheidungsliste zurück. **Project** und **Sammlung** Scope Marker unterscheiden Quellentypen und verlinken mit der Quelle; Es handelt sich nicht um Mehrbenutzer-Sharing-Berechtigungen.

## Organisieren Sie die akzeptierten Aufzeichnungen {/* #organize-the-accepted-records */}

Erstellen Sie eine gewöhnliche Sammlung mit **New collection** und **Smart collection**, füllen Sie **Name** und optional **Description**, dann **Create collection**. Die Beschreibung ist Organisationstext, nicht Agent Context. Cancel/Close verwirft den Entwurf. Wählen Sie Datensätze in Alle Referenzen aus und verwenden Sie **Add to collection** oder **Add to project**. Auswahl nach der Operation löscht; Wieder auswählen, wenn ein anderes Ziel hinzugefügt wird.

In einer Detailansicht zeigen Projekt- und Sammlungs-Checkboxen die Links an. **Manage Tags** fügt organisatorische Tags hinzu. Die eins-zu-fünf-sterne-bewertung des tisches ist ihre annotation, keine automatische evidenzqualität. **Clear selection** lässt die Datensätze unverändert.

| Tabellensteuerung | Anwendungsbereich |
| --- | --- |
| Literaturangaben durchsuchen | Bibliographische Felder einschließlich Titel, Schöpfer, Veröffentlichung, Identifikatoren, Abstract und Notizen |
| Literaturangaben sortieren | Wählen Sie die angezeigte Reihenfolge |
| Filter | Eng nach verfügbarem Typ, Jahr, Tag und Volltext-Bedingungen |
| Anpassen | Ausgewählte / erneut angezeigte Spalten |
| Literaturangaben pro Seite | Zeilen 25, 50 oder 100 |
| Zeilen-Checkbox / Alle auswählen | Festlegung der Ziele für die verfügbaren Massenaktionen |
| Exportieren | Export ausgewählter bibliografischer Aufzeichnungen; nicht automatisch alle PDFs verpacken |

Die Gesamtzahl der Bibliotheken ist unabhängig vom aktuellen Such-/Filterergebnis. Lesen Sie die angezeigte Ansicht und Auswahl zählt vor einer Batch-Aktion; Ein kleineres gefiltertes Ergebnis bedeutet nicht, dass Datensätze entfernt wurden.

Klare Suche und Filter, bevor ein Datensatz abgeschlossen wird, ist verschwunden. Projekt-/Sammlungslinks erstellen keine unabhängigen Metadatenversionen für jedes Ziel.

## Hinzufügen und Lesen des Volltexts {/* #add-and-read-full-text */}

**Find full-text PDF** prüft die entsprechenden öffentlichen Anbieter: Europe PMC/PMC, OpenAlex, Unpaywall und arXiv. Verfügbare Identifikatoren und konfigurierte Kontakte/Berechtigungen bestimmen die Anwendbarkeit. Überprüfen Sie Quelle, Versionsetikett und URL vor **Add attachment**.

<p className="example-label"><strong>Praxisbeispiel</strong> Verbinden Sie den Publisher PDF mit dem PRISMA 2020 Datensatz</p>

Wenn **Add attachment** fehlschlägt, nachdem eine Quelle gefunden wurde, laden Sie das öffentlich verfügbare PDF vom Publisher herunter und verwenden Sie **Add PDF** auf demselben Datensatz. Öffnen Sie das angehängte PDF und vergleichen Sie dessen Titel und DOI mit dem Publisher-Record. In diesem Beispiel zeigt **Preview prisma-2020-statement.pdf** das passende PRISMA 2020-Papier: **806.1 KB und 15 Seiten**.

![Erfolgreich angeschlossener Publisher PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

Ein Quellergebnis ist kein gespeicherter Anhang. Ein angehängtes PDF ist kein Beweis für das Lesen des Agenten. **Read with agent** liefert Kontext für eine nachfolgende Anfrage. Eine Composer `@`-Referenz kann einen genauen Datensatz, eine Projektbibliothek oder eine Sammlung auswählen: Eine Sammlung gewährt Abrufumfang, nicht die automatische Einbeziehung des Volltexts jedes Papiers. PDF Lesesteuerungen sind in [Vorschau](previews.md).

Wenn keine öffentliche Kopie gefunden wird, behalten Sie die geprüften Metadaten bei und verwenden Sie gegebenenfalls ein rechtmäßig verfügbares lokales PDF. Hintergrund-Lookup- / Download-Aufgaben können Pause-nach-Strom, Wiederaufnahme, Überprüfung und Abbrechen von Steuerelementen aussetzen; Die Stornierung bedeutet nicht, dass abgeschlossene frühere Artikel rückgängig gemacht werden.

<ToolOperationGroup>
<summary>Volltext in Batches abrufen und später wieder aufnehmen</summary>

### Volltext in Batches abrufen und später wieder aufnehmen {/* #retrieve-full-text-in-batches-and-resume-later */}

1. Wählen Sie die gewünschten Datensätze in der Bibliothek aus und öffnen Sie die **More actions → Find full-text PDF** der Auswahl.
2. Nach dem Suchbeginn wählen Sie bei Bedarf **Pause**. Das aktuelle Element endet, bevor die Aufgabe anhält.
3. Überprüfen Sie **Geprüft** und **Pending**, dann wählen Sie **Continue search**. Nachdem Sie das Panel geschlossen haben, kehren Sie über **Background tasks → Open** zur gleichen Aufgabe zurück.
4. Überprüfen Sie jede Kandidatenquelle und Warnung, bevor Sie Elemente auswählen und auf **Add selected** klicken.
5. Das Herunterladen unterstützt auch Pause und **Continue download**. Überprüfen Sie die endgültigen **Added / Failed / Skipped**-Zustände und öffnen Sie alle erfolgreich hinzugefügten Anhänge erneut.
6. Um eine unerwünschte, überprüfungsbereite Aufgabe zu verwerfen, verwenden Sie **Remove task** in **Background tasks**. Bestätigen Sie nach dem Entfernen, dass die Aufgabe verschwunden ist und dass ihre Referenzen und Anhänge noch geöffnet sind. Das Entfernen der Aufgabe löscht sie nicht.

![Suche nach dem aktuellen Element angehalten, Beibehaltung der ausstehenden Datensätze](/img/open-science/priority-completion/14-literature-batch-paused.webp)

Eine pausierte Suche behält ihre überprüften und ausstehenden Datensätze. Nachdem Sie die Aufgabe fortgesetzt oder erneut geöffnet haben, überprüfen Sie die endgültigen Zählungen und das Ergebnis jedes Elements. Kandidatenentdeckung und erfolgreiche PDF-Anhängung sind separate Ergebnisse.

![Wiedereröffnen der abgeschlossenen Fünf-Datensätze-Suche aus Hintergrundaufgaben](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Eine Quelle existiert, aber der PDF kann nicht hinzugefügt werden</summary>

### Eine Quelle existiert, aber der PDF kann nicht hinzugefügt werden {/* #a-source-exists-but-the-pdf-cannot-be-added */}

Prüfen Sie für **PDF could not be added** die Anforderungen an die Quellanmeldung, die Linkvalidität, die angezeigte Größenbegrenzung und die aktuelle Proxy/DNS-Konfiguration. Vermeiden Sie es, doppelte Referenzen als Retry-Mechanismus zu erstellen.

Wenn eine PDF-Quelle zu einer reservierten Adresse wie `198.18.x.x` aufgelöst wird, lehnt der Downloader sie ab. Folgen Sie [Netzwerk](network.md), um die überprüfbare öffentliche Auflösung wiederherzustellen, und versuchen Sie es dann erneut. Deaktivieren Sie die Adressprüfung nicht. Wenn Sie bereits ein rechtmäßig heruntergeladenes PDF haben, verwenden Sie **Add PDF** und überprüfen Sie dessen Titel, DOI und Seitenanzahl.


</ToolOperationGroup>

## Format und Kopie der Zitate {/* #format-and-copy-citations */}

Öffnen Sie **More actions → Citation**. Wählen Sie **Citation style**, prüfen Sie die Referenz- und Textform und wählen Sie dann **Copy reference**, **Copy in-text citation**, **Copy BibTeX** oder **Copy RIS** nach Bedarf. Überprüfen Sie Namen, Jahr, Interpunktion und DOI vor der Wiederverwendung gegen die Quelle. Die entsprechende Darstellung repariert einen unvollständigen Datensatz nicht.

**Manage citation styles…** eröffnet Style Management. Das gebündelte Set umfasst APA, MLA, Chicago Author-Date, Vancouver, IEEE, Nature, AMA und Harvard. **Preview** zeigt ein Style-Sample, **Browse styles** öffnet den externen Style-Katalog und **Import CSL** importiert eine lokale Style-Datei. Der PLOS CSL-Import und seine Anwendung werden im Folgenden überprüft. Kopieren und Exportieren sind getrennte Operationen; Überprüfen Sie beides beim Bewegen einer Bibliographie.

<ToolOperationGroup>
<summary>Überprüfen Sie ein echtes Zitat nach dem Importieren eines Journalstils</summary>

### Überprüfen Sie ein echtes Zitat nach dem Importieren eines Journalstils {/* #check-a-real-citation-after-importing-a-journal-style */}

<p className="example-label"><strong>Praxisbeispiel</strong> Wenden Sie den PLOS-Zitierstil auf einen PRISMA-Datensatz an</p>

Wählen Sie in **Library → Settings → Import CSL** die unabhängige `plos.csl`-Datei aus dem [CSL-Styles-Repository](https://github.com/citation-style-language/styles/blob/master/plos.csl) aus. In diesem Beispiel stieg **Imported styles** von Null auf Eins und zeigte **Öffentliche Bibliothek der Wissenschaft**. Kehren Sie zum **Citation**-Panel des echten PRISMA-Datensatzes zurück und wählen Sie diesen Stil unter **Citation style** aus. Überprüfen Sie die nummerierte Referenz und `[1]` in-Text-Zitat. Die Style-Management-Vorschau verwendet einen Beispielartikel; Überprüfen Sie Ihre aktuelle Aufzeichnung, bevor Sie ein Zitat kopieren.

![Importierter PLOS-Stil, der auf den echten PRISMA-Datensatz angewendet wird](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Kopieren eines Zitats oder Exportieren von wiederverwendbaren Datensätzen</summary>

### Kopieren eines Zitats oder Exportieren von wiederverwendbaren Datensätzen {/* #copy-a-citation-or-export-reusable-records */}

<p className="example-label"><strong>Praxisbeispiel</strong> Kopieren und Round-Trip PRISMA Zitieraufzeichnungen</p>

Die vier Citation Copy Buttons schreiben unterschiedliche Darstellungen in die Zwischenablage. Fügen Sie in Ihren beabsichtigten Editor ein und prüfen Sie das Ergebnis, bevor Sie das Panel verlassen.

| Button | Ergebnis geprüft für PRISMA 2009 |
| --- | --- |
| Literaturangabe kopieren | APA Referenz behielt die vier persönlichen Autoren, The PRISMA Group, Jahr und DOI |
| Kurzbeleg kopieren | `(Moher et al., 2009)` |
| BibTeX kopieren | An `@article` Eintrag mit dem Autor der Organisation in Klammern eingeschlossen |
| RIS kopieren | A `TY  - JOUR` Datensatz mit Autor, Titel, Jahr und DOI-Feldern |

![Citation Copy Controls für den echten PRISMA-Record](/img/open-science/local-todo-batch/01-citation-copy.webp)

Schließen Sie für eine Datei Citation, wählen Sie die erforderlichen Tabellenzeilen aus und wählen Sie **Export → BibTeX** oder **RIS**. Wählen Sie den Speicherort im Systemspeicherdialog und warten Sie auf **Saved**. Diese Dateien enthalten bibliographische Datensätze, kein PDF-Anhangbündel. Reimportieren Sie die gespeicherte Datei in eine Testsammlung mit **Reuse existing reference** und überprüfen Sie die Übereinstimmungszahl. Beide exportierten PRISMA-Dateien wurden reimportiert und das bestehende DOI wiederverwendet, ohne einen weiteren Datensatz zu erstellen.

BibTeX speichert Jahr und Monat hier, so dass seine Rundreise `2009-7` zurückgegeben; RIS behielt `2009-07-21`. Überprüfen Sie die Datumsgenauigkeit beim Zusammenführen. Plain RIS-Autorenfelder dürfen keinen separaten Organisationsnamentyp in einem anderen Manager beibehalten; Überprüfen Sie den importierten Creator-Editor, wenn diese Unterscheidung wichtig ist.


</ToolOperationGroup>

## Duplikate auflösen und Referenzen wiederherstellen {/* #resolve-duplicates-and-recover-references */}

<p className="example-label"><strong>Praxisbeispiel</strong> Zusammenführen und Wiederherstellen eines PRISMA-Datensatzes mit seinen Anhängen</p>

<ToolOperationGroup>
<summary>Führen Sie einen Datensatz und seine Anhänge</summary>

### Führen Sie einen Datensatz und seine Anhänge {/* #keep-one-record-and-its-attachments */}

1. Öffnen Sie **Duplicates → Review duplicates**. Die Ansicht scannt aktive Bibliotheksaufzeichnungen, nicht nur die aktuelle Sammlung.
2. Wählen Sie unter **Keep reference** den Datensatz mit der verifizierten Identität aus. Vergleichen Sie DOI, Ersteller, Anzahl der Anhänge und Datum hinzugefügt. **Show all fields** zeigt Felder, die durch die konfliktorientierte Ansicht verborgen sind.
3. Wählen Sie für jedes widersprüchliche Feld die Quelle aus. Wählen Sie im PRISMA BibTeX-Vergleich das vollständige `2009-07-21`-Veröffentlichungsdatum über `2009-7`. Leere Felder können aus dem anderen Datensatz ausgefüllt werden.
4. Lesen Sie **After merging** und seine Anlage, Sammlung und Projekt zählt. Nur dann wählen Sie **Merge references**; **Cancel** lässt die Datensätze getrennt.
5. Öffnen Sie den Überlebenden erneut und überprüfen Sie Metadaten, Links und PDF-Inhalte. Der fusionierte Datensatz erscheint in Trash als **Merged duplicate**.

![Vergleichen Sie die Überlebenden und widersprüchliche Veröffentlichungsdaten](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

Ein PDF mit einem extrahierten Dateinamen anstelle seines Titels darf keine doppelte Gruppe eingeben. Korrigieren Sie den Titel und DOI mit dem Publisher-Record und überprüfen Sie dann die passende Gruppe. Bestätigen Sie nach dem Zusammenführen, dass die beibehaltenen PDF-Öffnungen geöffnet werden und Sammlungs- / Projektassoziationen weiterhin vorhanden sind.

![Der fusionierte Datensatz behält seine PDF und organisatorischen Verbindungen bei](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Wiederherstellen einer versehentlich entfernten Referenz</summary>

### Wiederherstellen einer versehentlich entfernten Referenz {/* #restore-an-accidentally-removed-reference */}

Verwenden Sie die **More actions → Move to Trash** der Zeile. Es verschwindet aus aktiven Bibliotheks-, Projekt- und Sammlungsansichten. Suchen Sie in **Trash** nach Titel oder Bezeichner, öffnen Sie das Zeilenmenü und wählen Sie **Restore**. Wiederherstellen vor dem Bearbeiten, Vorschauen oder Exportieren: Diese Steuerelemente sind in Trash deaktiviert. Öffnen Sie das ursprüngliche Projekt und die ursprünglichen Sammlungen, um die wiederhergestellten Links zu überprüfen. In diesem Beispiel behielt das Wiederherstellen des PRISMA-Datensatzes seinen PDF und alle drei Links bei.

![Wiederherstellen einer Referenz aus dem Trash-Zeilenmenü](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Ein unerwünschtes Duplikat dauerhaft entfernen</summary>

### Ein unerwünschtes Duplikat dauerhaft entfernen {/* #permanently-remove-an-unwanted-duplicate */}

Wählen Sie in Papierkorb **More actions → Delete permanently** und lesen Sie die Bestätigung. **Cancel** bewahrt die Zeile. Die Bestätigung entfernt die ausgewählten Referenzen und Metadaten; nicht geteilte angehängte Dateien werden danach bereinigt. Historische Ausgaben werden beibehalten und Suchindizes verfallen separat, so dass dies keine sichere Löschung ist. Exportieren Sie alles, was vor dem Löschen erforderlich ist.

Überprüfen Sie nach dem Löschen, ob der ausgewählte Datensatz den Papierkorb verlassen hat und ob die beibehaltene Referenz mit ihren Anhängen weiterhin geöffnet wird. Das Entfernen eines Sammellinks, das Verschieben eines Datensatzes in den Papierkorb und das dauerhafte Löschen haben unterschiedliche Bereiche.

![Lesen Sie den genauen Permanent-Löschungsumfang](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## Änderungen von Anhängen und gleichzeitige Bearbeitungen {/* #attachment-changes-and-concurrent-edits */}

Bevor Sie einen Anhang entfernen, lesen Sie die Löschbestätigung und überprüfen Sie die Datei / Version, auf die Sie abzielen. Verwenden Sie die verfügbare Versionshistorie, um frühere Anhängeversionen zu prüfen. Das Entfernen eines PDF, das Verschieben seines Verweises auf den Papierkorb und das dauerhafte Löschen eines Verweises haben unterschiedliche Bereiche; Einbehaltene Konversationsbeweise können die Bereinigung einschränken.

Wenn ein anderer Client eine Sammlung ändert, während Ihr Editor geöffnet ist, kann ein veraltetes Speichern abgelehnt werden. Öffne die neueste Sammlung, vergleiche die gespeicherten Werte mit deiner beabsichtigten Änderung und versuche es erneut mit diesem Zustand. Ein Aktualisierungs- oder Bereinigungsfehler nach dem Speichern bedeutet nicht automatisch, dass das Speichern fehlgeschlagen ist: Überprüfen Sie den aktuellen Datensatz, bevor Sie die Aktion wiederholen.


Quellen: [Chargeneinfuhr](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [Metadaten-Editor](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx), [Anhangverlauf/Löschung](https://github.com/aipoch/open-science/commit/f4a82d4a), [Concurrent Edits](https://github.com/aipoch/open-science/commit/dbb9560a).

## Halten Sie PDF Lesenotizen {/* #keep-pdf-reading-notes */}

Öffnen Sie den PDF-Anhang einer Referenz und verwenden Sie **Notes & Annotations** für Anmerkungen, Seitenfragen und Dokumentnotizen. Die gleiche Version der Bibliotheksdatei teilt diese Notizen über Projekte und Sitzungen hinweg. Suchen Sie in der globalen Suche eine Notiz unter **Library** und wählen Sie dann **Show annotation source**, um zum PDF zurückzukehren. Siehe [PDF Anmerkungen und Dokumentnotizen](pdf-notes.md) für Schritte und Exporte.
