---
title: "Aktualisieren einer vorhandenen Literatursammlung"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Aktualisieren einer vorhandenen Literatursammlung {/* #update-an-existing-literature-collection */}

<p className="example-label"><strong>Praxisbeispiel</strong> Frischwasser-Mikroplastiktransport durch zwei Publikationsfenster</p>

Ein Update sollte die ursprüngliche Suchregel beibehalten und genau anzeigen, was hinzugefügt wurde. Diese historische Wiederholung erstellt zuerst eine **2020–2022**-Sammlung und durchsucht dann **2023–2025** mit der gleichen Abfrage und den gleichen Filtern. Die eigentliche Bibliothek wächst von **7 bis 14 Referenzen**. Dies ist eine manuelle, begrenzte Suche; es handelt sich nicht um eine geplante Überwachung oder eine erschöpfende Überprüfung.

## 1. Definieren und Speichern der Baseline {/* #1-define-and-save-the-baseline */}

Öffnen Sie ein Projekt mit einem verbundenen Modell. Aktivieren Sie **Literaturgraphik** in **Resource center → Connectors** und konfigurieren Sie OpenAlex bei Bedarf. Senden:

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

Dieser Lauf gab **12 von 3,643 Matches** zurück, behielt **7** bei und schloss **5** aus. Öffnen Sie **freshwater-search-plan.md**, um die Kriterien und Daten zu überprüfen, bevor Sie fortfahren. Der gespeicherte Plan beschreibt den Zustand vor dem Update.

![Gespeicherte Baseline-Suchspezifikation und gespeicherte Datensätze](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

Überprüfen Sie das Evidenzniveau: Einige Kandidaten lieferten nur Titel / Metadaten, während andere ein lizenzerlaubtes Abstract enthielten. Die Überprüfung breiter Transportwege wird als Kontext einbezogen; Ihre Aufnahme beweist kein Süßwasser-spezifisches Versuchsergebnis.

## 2. Erstellen und Füllen der Sammlung {/* #2-create-and-populate-the-collection */}

Download <ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">das Basis-RIS</ExampleDownload>. Erstellen Sie in **Library → New collection** **Frischwasser-Mikroplastiktransport**, wählen Sie es aus und wählen Sie dann **Import references**. Wählen Sie das RIS aus und überprüfen Sie das Ziel und das Übereinstimmungsverhalten, bevor Sie importieren.

![Baseline-Importvorschau für die benannte Kollektion](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

Der aufgezeichnete Import wurde mit **7 Erstellt, 0 Wiederverwendet, 0 Übersprungen, 0 Gescheitert** abgeschlossen. Klicken Sie auf **Done** und bestätigen Sie, dass die Sammlung sieben Referenzen enthält. Bestehende Übereinstimmungen in einer anderen Bibliothek können die erstellte/wiedergegebene Aufteilung ändern.

![Die Sieben-Referenz-Baseline-Sammlung](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. Suchen Sie das nächste Datumsfenster in derselben Konversation {/* #3-search-the-next-date-window-in-the-same-conversation */}

Kehren Sie zum Projektgespräch zurück. Bewahren Sie die Baseline-Dateien unverändert auf und fordern Sie einen expliziten Vergleich an:

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

Dieses Update gab **12 von 7,600 Matches** mit **7-Additionen, 0-Baseline-Überschneidungen und 5-Ausschlüsse** zurück. Beide Suchanfragen werden auf 12-Kandidaten abgeschnitten. Datenbank-Ranking und -Abdeckung können sich ändern; Die Zählungen beschreiben den September 16, 2026 Lauf.

![Gespeichertes Update-Audit mit Ergänzungen und Ausschlüssen](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

Überprüfen Sie die tatsächlichen DOI-Sätze, anstatt die Gesamtwerte zu subtrahieren. Speichern Sie die datierten <ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">Aktualisierungsaudit</ExampleDownload> und <ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">Aktualisierungsangaben</ExampleDownload> neben der Baseline.

## 4. Einfuhrzusätze in die bestehende Sammlung {/* #4-import-additions-into-the-existing-collection */}

Download <ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">die Ergänzungen RIS</ExampleDownload>. Wählen Sie **Frischwasser-Mikroplastiktransport** in der Bibliothek und wählen Sie **Import references**. Bewahren Sie **Reuse existing reference** auf, damit ein bereits vorhandener Artikel sicher wiederverwendet werden kann.

![Die Update-Importvorschau zeigt sieben Additionen](/img/open-science/workflow-extensions/freshwater-import-update.webp)

Der eigentliche Update-Import wurde mit **7 Erstellt, 0 Wiederverwendet, 0 Übersprungen, 0 Gescheitert** abgeschlossen. Die Sammlung enthält jetzt **14 Referenzen**. Dies stimmt mit der normalisierten DOI Vereinigung der beiden zurückgehaltenen Mengen überein.

![Die aktualisierte Sammlung mit vierzehn Referenzen](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

Die Baseline selbst wurde nicht umgeschrieben. Bewahren Sie den Datumsbereich und den Suchdatensatz auf, damit spätere Leser die ursprüngliche Evidenzbasis vom Update unterscheiden können. Um einen Vorschlag oder eine wissenschaftliche Behauptung zu unterstützen, rufen Sie die relevanten Volltexte als nächstes ab und lesen Sie sie; Die Einbeziehung von Metadaten allein ist keine Evidenzbewertung. Für überlappende Abfragebatches siehe [Suchansätze kombinieren](merge-literature-searches.md).

Die herunterladbare Audit-Kopie lässt vollständige Abstracts und deren Lizenzfelder aus; Identifikatoren, Entscheidungen und Gründe bleiben erhalten. Inspizieren Sie Abstracts in den verlinkten Quellen.
