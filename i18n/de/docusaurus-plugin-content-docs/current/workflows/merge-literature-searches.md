---
title: "Kombinieren Sie Literatursuche Batches"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Kombinieren Sie Literatursuche Batches {/* #combine-literature-search-batches */}

<p className="example-label"><strong>Praxisbeispiel</strong> Halbleiterelektrolyt-Schnittstellen und Interphasen</p>

Zwei Suchanfragen geben oft überlappende Papiere zurück. Behalten Sie die Herkunft jeder Suche, screenen Sie die Kandidaten und importieren Sie dann beide Chargen mit identifikatorbasierter Wiederverwendung in eine Sammlung. Dieses Beispiel ruft zwei echte OpenAlex-Batches ab, behält acht Datensätze von jedem und endet mit **15 einzigartige Referenzen** in der Bibliothek. Es zeigt Metadaten-Organisation; Es wurden keine Volltexte abgerufen oder bewertet.

## 1. Führen und Aufzeichnen beider Suchanfragen {/* #1-run-and-record-both-searches */}

Aktivieren Sie in **Resource center → Connectors** **Literaturgraphik** und konfigurieren Sie die OpenAlex-Anmeldeinformationen, falls gewünscht. Öffnen Sie ein Projekt, starten Sie ein Gespräch und wählen Sie ein verbundenes Modell aus. Der aufgezeichnete Durchlauf verwendete Open-Science **0.30.1**, **Codex Abonnement / gpt-5.6-sol**. Es werden keine Quell-PDFs benötigt.

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

Überprüfen Sie die tatsächliche Connector-Aktivität für die Abfragen, Daten und zurückgegebenen Zählungen. Die aufgezeichneten Suchanfragen lieferten **12-Kandidaten** aus der Gesamtzahl der **94,620**- und **15,355**-Übereinstimmungen. Die Kappe macht diese begrenzten Beispiele, nicht erschöpfende Bewertungen. Beide Chargen stammen von OpenAlex; Zwei Abfrageformulierungen machen sie nicht zu unabhängigen Datenbanken.

## 2. Die Ausfuhren vor dem Import prüfen {/* #2-inspect-the-exports-before-importing */}

Öffnen Sie **electrolyte-merged.csv** unter **Generated**. Überprüfen Sie die behaltenen Titel, DOIs und Source-Mitgliedschaft mit den beiden RIS-Exporten und dem Kandidaten-Audit. Die eigentliche Vereinigung hat 15 Zeilen; DOI **10.1007/s41918-024-00212-1** kommt in beiden Chargen vor und ist mit **A&#124;B** gekennzeichnet.

![Die gespeicherte Vereinigung beider Suchbatches, Beibehaltung der Quellmitgliedschaft](/img/open-science/workflow-extensions/batches-merged.webp)

Zum Vergleich trimmen Sie den DOI-Whitespace, entfernen Sie ein optionales DOI-URL-Präfix und vergleichen Sie den Fall unempfindlich. Bewahren Sie die ursprünglichen Bezeichner im Quelldatensatz auf. Ähnliche Titel allein sind unzureichende Beweise dafür, dass zwei Aufzeichnungen identisch sind; ungelöste Identifier-Konflikte müssen überprüft werden.

Laden Sie <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">Charge A</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">Charge B</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">Alle 24 Kandidatenentscheidungen</ExampleDownload> und <ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">die 15-Zeilen-Union</ExampleDownload> herunter. Dies sind die Exporte aus dem aufgezeichneten Lauf.

## 3. Importieren Sie die erste Charge in eine benannte Sammlung {/* #3-import-the-first-batch-into-a-named-collection */}

1. Öffnen Sie **Library → New collection** und erstellen Sie **Grenzflächen für Festkörperelektrolyt**.
2. Wählen Sie diese Sammlung in der Seitenleiste aus, bevor Sie **Import references** auswählen.
3. Wählen Sie `electrolyte-batch-a.ris`. Prüfen Sie, ob **Import to** die beabsichtigte Sammlung benennt.
4. Lassen Sie **When identifiers match → Reuse existing reference** ausgewählt. Überprüfen Sie **View details** und wählen Sie dann **Import references**.

![First-Batch-Importvorschau: acht neue Referenzen in der ausgewählten Kollektion](/img/open-science/workflow-extensions/batches-import-a.webp)

In der aufgezeichneten Bibliothek wurde der erste Import mit **8 Erstellt, 0 Wiederverwendet, 0 Übersprungen, 0 Gescheitert** abgeschlossen. Klicken Sie auf **Done** und überprüfen Sie die Sammlung. Wenn Ihre Bibliothek bereits übereinstimmende Datensätze enthält, kann die erstellte/wiedergegebene Aufteilung abweichen.

## 4. Importieren der zweiten Charge und Wiederverwendung der Überlappung {/* #4-import-the-second-batch-and-reuse-the-overlap */}

Wenn die gleiche Sammlung ausgewählt ist, importieren Sie `electrolyte-batch-b.ris`. Die Vorschau sollte vorhandene Datensätze identifizieren, bevor der Import begangen wird. In diesem Lauf zeigte es **7 Neue Referenzen, 1 Existing, 0 Skipped**.

![Second-Batch Preview identifiziert das freigegebene Papier als Existing](/img/open-science/workflow-extensions/batches-import-b.webp)

Halten Sie **Reuse existing reference**, prüfen Sie den freigegebenen Titel und importieren Sie dann. Lesen Sie die aktuelle Abschlusszusammenfassung: **7 Erstellt, 1 Wiederverwendet, 0 Übersprungen, 0 Gescheitert**. Reuse behält vorhandene Metadaten und fügt den übereinstimmenden Verweis auf das Ziel hinzu; Es erstellt keine zweite Kopie oder lädt ein PDF herunter.

![Abgeschlossener zweiter Import mit sieben erstellten und einem wiederverwendeten](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. Überprüfen Sie die resultierende Sammlung {/* #5-check-the-resulting-collection */}

Klicken Sie auf **Done**. Die Sammlung enthält **15 Referenzen** und stimmt mit der DOI-Union überein. Behalten Sie die beiden Originalexporte und die Provenienz CSV, damit ein Kollege rekonstruieren kann, woher jeder Kandidat kommt.

![Die finale Kollektion mit fünfzehn Referenzen](/img/open-science/workflow-extensions/batches-collection.webp)

Eine Zählübereinstimmung ist eine nützliche Überprüfung, kein Ersatz für die Überprüfung der überlappenden DOI und repräsentativen Titel. Um ein Fenster für eine spätere Veröffentlichung hinzuzufügen und gleichzeitig die Baseline beizubehalten, fahren Sie mit [Aktualisierung einer vorhandenen Literatursammlung](update-literature.md) fort.
