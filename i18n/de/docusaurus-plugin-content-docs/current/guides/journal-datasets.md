---
title: "Journal-Datensätze und Referenzattribute"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Journal-Datensätze und Referenzattribute {/* #journal-datasets-and-reference-attributes */}

Verwenden Sie **Library → Journals**, um ein Zeitschriftenverzeichnis, Metriken oder Klassifikationen zu importieren und sie neben übereinstimmenden Referenzen anzuzeigen. Ein Datensatz behält seine **Source** und **Metric year**. Open-Science bietet kein Abonnement für eine kommerzielle Ranking-Datenbank an; Daten importieren, zu deren Nutzung Sie berechtigt sind, und deren Herkunft behalten. Journalattribute beschreiben das Journal, nicht die Qualität oder die Ergebnisse einer einzelnen Arbeit.

## Bereiten Sie einen kleinen Datensatz vor {/* #prepare-dataset */}

<p className="example-label"><strong>Praxisbeispiel</strong> Hinzufügen von Publisher-Informationen zu vorhandenen Papieren</p>

Laden Sie das <ExampleDownload path="/examples/journals/journal-publisher-directory.csv">dreijournale CSV</ExampleDownload> herunter. Es enthält Nature Communications, PLOS Medicine und The BMJ mit ihren elektronischen ISSNs, Herausgebern und Website-Adressen. Die Quellen sind [Naturkommunikation](https://www.nature.com/ncomms/), [PLOS-Medizin](https://journals.plos.org/plosmedicine/) und [Abonnenteninformationen des BMJ](https://www.bmj.com/about-bmj/resources-subscribers). Dies ist ein Publisher-Verzeichnis-Schnappschuss für **2026**, mit Textattributen anstelle von erfundenen Impact-Faktoren oder Quartilen.

Für eine übereinstimmende Referenz verwenden Sie Ju et al.'s Paper **Aktivität und Selektivität von Metall-Stickstoff-dotierten Kohlenstoff-Katalysatoren zur elektrochemischen CO2-Reduktion verstehen**, DOI **10.1038/s41467-017-01035-z**. Wenn es nicht bereits in Ihrer Bibliothek ist, [Hinzufügen des bibliographischen Datensatzes](library.md) und überprüfen Sie das Journal und ISSN mit der Quelle. Sie benötigen nicht den vollständigen Text, um Journalattribute anzuzeigen.

CSV, TSV, XLSX und Journal-Bundles werden bis **32 MB** unterstützt. **Download template** bietet ein Startlayout. Die Identitätsspalten von den Attributen trennen; Bewahren Sie ISSNs als Text auf, einschließlich Bindestrichen und jedem endgültigen X.

## Importieren und Zuordnen der Spalten {/* #import-columns */}

1. Öffnen Sie **Library → Journals → Import attributes** oder klicken Sie auf den Upload-Bereich. Wenn bereits Datensätze vorhanden sind, öffnen Sie den **Journal dataset**-Selektor und wählen Sie **New dataset**. Wählen Sie den CSV.
2. Überprüfen Sie **Header row** und **Preview**. Diese Datei verwendet Zeile **1** als Spaltennamen. Verwenden Sie **Transpose** nur, wenn Ihre Quelle über spaltenübergreifende Zeitschriften verfügt.
3. Setzen Sie **Source** auf `Publisher websites` und **Metric year** auf `2026`. Überprüfung vorgeschlagener Werte: Eine Jahreszahl an anderer Stelle in der Datei kann für ein Jahr verwechselt werden. Verwenden Sie für einen echten metrischen Datensatz das Jahr, das seine Werte beschreiben, das vom Veröffentlichungsjahr der Datei abweichen kann.
4. Karte die vier Spalten wie unten. Geben Sie jedem gespeicherten Attribut einen eindeutigen Namen; **Skip** lässt eine Spalte aus.
5. Wählen Sie **Review import**, überprüfen Sie jede Zeile, dann **Import attributes**. Dieses Beispiel zeigt **3 bereit; 0 braucht Aufmerksamkeit**, gefolgt von **Journal attributes imported**.

| Ursprüngliche Spalte | Einfuhr als | Wertart |
| --- | --- | --- |
| Journalbezeichnung | Journalbezeichnung | Identitätsfeld |
| ISSN | ISSN | Identitätsfeld |
| Verlag | Journalattribut | Text |
| Website des Journals | Journalattribut | Text |

![Mapping Journal Identität und Publisher Attribute mit einer expliziten Quelle und Jahr](/img/open-science/v0340/journal-column-mapping.webp)

**Abbreviation** und **External journal ID** sind zusätzliche Identitätsoptionen. Eine externe ID benötigt ihren Namensraum; Kennungen aus verschiedenen Katalogen sind nicht austauschbar. Zu den Attributtypen gehören **Text**, **Nummer**, **Single choice** und **Multiple choices**. Verwenden Sie die Nummer für numerische Metriken, nicht für ISSNs oder kategorische Quartile.

Zeilen können **Matched**, **New**, **Ambiguous match**, **Invalid** oder **Duplicate** sein. Überprüfen Sie vor dem Import widersprüchliche Identifikatoren und wiederholte Zeilen. Kehren Sie zu **Edit mapping** zurück, um Spaltenrollen zu beheben; Exportieren von Problemzeilen oder explizit Überspringen von Zeilen, die beim Angebot Aufmerksamkeit benötigen. Eine Zeile mit der Markierung Neu erstellt einen Tagebucheintrag, keine neue Arbeit in Ihrer Bibliographie.

## Attribute auf einer Referenz anzeigen {/* #show-attributes */}

1. Bestätigen Sie, dass der ausgewählte Datensatz **Veröffentlichen von Webseiten 2026** und **Show in literature** eingeschaltet ist.
2. Zurück zu **All references** und Suche nach `Understanding activity`.
3. Öffnen Sie das Papier. Überprüfen Sie unter **Journal attributes** **Publisher → Springer Nature** und die Website des Journals. Wählen Sie die Informationskontrolle eines Attributs aus, um dessen Quelle / Jahr zu untersuchen.
4. Vergleichen Sie das **ISSN 2041-1723** der Referenz mit dem importierten Journal. Das Publikationsjahr **2017** bleibt vom **2026**-Snapshot des Datensatzes getrennt.

![Importierter Journal-Dataset mit Literatur anzeigen aktiviert](/img/open-science/v0340/journal-dataset.webp)

![Veröffentlichen von Attributen auf der vorhandenen Nature Communications Referenz](/img/open-science/v0340/journal-reference-attributes.webp)

**Show in literature** gilt für die freigegebene Bibliothek, Projektansichten, Sammlungen und Referenzdetails. Nur **ein Jahr pro Quelle** wird zu einem Zeitpunkt angezeigt; Das Ermöglichen eines weiteren Jahres aus derselben Quelle ersetzt das zuvor angezeigte Jahr. Fehlende Attribute werden nicht mit Werten aus einem anderen Jahr gefüllt. Verwenden Sie in einer Referenztabelle **Customize**, um auszuwählen, welche verfügbaren Journalspalten angezeigt werden sollen.

## Beheben eines Journal-Matches und pflegen Sie den Datensatz {/* #journal-matches */}

Verwenden Sie den Journals **More actions → Journal alignment**-Eintrag und **Bibliothek überprüfen / Bibliothek überprüfen**, um übereinstimmende, nicht übereinstimmende und mehrdeutige Datensätze zu inspizieren. Dieser Check liest die Bibliothek; Es werden keine Referenzmetadaten stillschweigend neu geschrieben. Bestätigen Sie Zeitschriftennamen und ISSNs gegen die ursprüngliche Veröffentlichung, bevor Sie eine Diskrepanz beheben.

Bei Angebot verknüpft **Find journal candidates → Choose journal → Confirm journal association** den ausgewählten Verweis mit dem beabsichtigten Journal. Es gilt für diese Referenz, nicht jedes Papier mit einem ähnlichen Titel. Das Entfernen der Bestätigung führt zu einem automatischen Abgleich; Ändern der Journalidentität der Referenz kann die Assoziation ungültig machen.

Wählen Sie den gewünschten Datensatz aus, bevor Sie **Update dataset** verwenden. Überprüfen Sie die Quelle, das Jahr und die Zuordnung erneut und überprüfen Sie dann die betroffenen Referenzen nach dem Import. Behalten Sie die Daten eines anderen Jahres als separaten Datensatz, anstatt seine Bedeutung zu überschreiben. Verwenden Sie Dataset-Aktionen, um den Namen / die Quelle / das Jahr zu bearbeiten, oder exportieren Sie ein Journal-Bundle, das Daten und Spalteneinstellungen beibehält. Bewahren Sie eine Kopie der ursprünglichen Quelldatei und ihrer Zugriffsbedingungen auf.
