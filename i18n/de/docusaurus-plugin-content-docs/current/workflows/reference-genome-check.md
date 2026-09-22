---
title: "Kontrollarten, Referenzgenom und Chromosomenkennzeichen"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Kontrollarten, Referenzgenom und Chromosomenkennzeichen {/* #check-species-reference-genome-and-chromosome-identifiers */}

<p className="example-label"><strong>Praxisbeispiel</strong> Humanes GRCh38.p14-Chromosom 1 identifizieren</p>

Bestätigen Sie den Organismus, die versionierte Assemblierung und die Chromosomenaliase, bevor Sie Datensätze aus verschiedenen Datenbanken kombinieren. Die Ausgabe ist eine Identitätstabelle für ein Chromosom mit den ursprünglichen Quellenantworten.

Folgen Sie vor dem Start [Wissenschaftliche Datenbanken](../tools/databases.md#connect-database), um die erforderlichen Connectors zu aktivieren. Verwenden Sie ein verbundenes Modell und ein verfügbares [Notebook-Laufzeit](../guides/runtimes.md).

## 1. Abfrage des Organismus, Assemblierung und Chromosom {/* #reference-genome */}

1. **Genome** in **Settings → Connectors** aktivieren. Öffnen Sie eine Sitzung mit einem verbundenen Modell und verfügbarer Notebook Laufzeit. Dieses v0.31.1-Beispiel verwendete **Codex subscription**.
2. Abfrage des Organismus, **versioniert** Assemblierung und Sequenz in dieser Reihenfolge. Senden:

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

## 2. Vergleichen Sie die zurückgegebenen Identifier {/* #compare-identifiers */}

Öffnen Sie die Notizen und vergleichen Sie die zurückgegebenen IDs in den drei JSON-Dateien. Alle drei Aufrufe waren in diesem Beispiel erfolgreich.

![Drei tatsächliche NCBI-Aufrufe und zurückgegebene Taxon- und Assembly-Identität](/img/open-science/v0311/ncbi-notes.webp)

| Überprüfung | Ergebnis dieses Beispiels |
| --- | --- |
| Organismus | Homo sapiens, TaxID **9606**; ein Spiel, `ambiguous: false` |
| Beantragte/laufende Montage | **GCF_000001405.40**, **GRCh38.p14**, UCSC Name **hg38** |
| Gepaarte GenBank Versammlung | **GCA_000001405.29**; Der zurückgegebene Datensatz meldet Unterschiede von RefSeq |
| Chromosom 1 Aliase | **1**, **chr1**, RefSeq **NC_000001.11**, GenBank **CM000663.2** |
| Ausgewählte Sequenz | **248956422 bp**, Primärversammlung; ein Spiel, `matches_truncated: false` |

![Ursprüngliche Chromosom-1-Antwort mit versionierten Aliase und Übereinstimmungszahl](/img/open-science/v0311/ncbi-aliases.webp)

## 3. Bewahren Sie die Identitätstabelle und die Quelldatensätze auf {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Abfragenotizen</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Identitätstabelle</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Taxonantwort</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Ansprechverhalten der Montage</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Sequenzantwort</ExampleDownload>

Die Abfrage wurde für **ein ausgewähltes Chromosom** abgeschlossen. Sie ist kein Export aller Sequenzen der Assembly. Bewahren Sie bei geänderten Abfragen mehrdeutige Treffer und Kürzungskennzeichen auf. Ein Assembly-Name ersetzt keine Zugangsnummer mit Versionsangabe. Eine zurückgegebene aktuelle Nummer rechtfertigt es nicht, eine angeforderte historische Version stillschweigend zu ersetzen. Sequenzaliase beschreiben Namen innerhalb einer Assembly; sie führen keine Koordinatenumrechnung zwischen Assemblies durch. [Genaue Inputs](../reference/connector-operations.md#ncbi_get_assembly_info)
