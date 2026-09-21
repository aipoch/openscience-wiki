---
title: "Prüfen Sie die Probenqualität in einer Genzählmatrix"
last_update:
  date: '2026-09-16'
---

# Prüfen Sie die Probenqualität in einer Genzählmatrix {/* #check-sample-quality-in-a-gene-count-matrix */}

<p className="example-label"><strong>Praxisbeispiel</strong> Prüfen der Probenqualität in GSE60450</p>

Vor der Durchführung der Differentialexpressionsanalyse ist zu überprüfen, ob die Zählmatrix strukturell verwendbar ist und ob die Probenetiketten rückverfolgbar bleiben. Dieser Walkthrough verwendet die echte öffentliche **GEO GSE60450** Mausmaul-RNA-seq-Matrix. Es erzeugt eine zwölf-sample-QC-Tabelle, eine rohe Bibliothek-Größe-plot und einen Methoden-Bericht in Open-Science.

**Forschungsentscheidung:** ist die Datei intern konsistent genug, um mit der Annotation von Beispielen und einer separat entworfenen statistischen Analyse fortzufahren? Die unten aufgeführten Prüfungen Adressdatei-Integrität und Beschreibung zählt. Sie stellen keine biologische Vergleichbarkeit, Normalisierung, Chargenkorrektur oder differentielle Expression her.

Die folgenden Dimensionen und numerischen Ergebnisse gehören zu diesem Beispieleingang. Definieren Sie mit Ihrer eigenen Matrix die Beispielspalten und berechnen Sie die Prüfungen neu.

## Source-and-Input-Vertrag {/* #source-and-input-contract */}

Laden Sie die Originalmatrix von [Beispieldaten und erwartete Ergebnisse](../reference/example-data.md) herunter. Überprüfen Sie die Prüfsumme, Beispielspalten und Metadatenfelder, bevor Sie sie hochladen. Verwenden Sie diese Seite für die Basiswerte während dieses Workflows.

## 1. Definieren Sie die Arbeit, bevor Sie sie ausführen {/* #1-define-the-work-before-running-it */}

Erstellen Sie ein Projekt und fügen Sie die ursprüngliche Matrix von der Beispielseite an. Aktivieren Sie Python mit `csv`, `statistics` und `hashlib` (Standardbibliothek) und installieren Sie `matplotlib` bis [Laufzeiten](../guides/runtimes.md), wenn es abwesend ist. Verwenden Sie ein verbundenes Modell, das Notebook-Code ausführen kann.

Senden Sie diese Anforderung oder passen Sie die Ausgabenamen an, während Sie die Spaltendefinitionen beibehalten:

```text
Inspect the attached public GEO GSE60450 gene-count matrix in the Session
Notebook using Python csv/statistics/hashlib and matplotlib. Do not install
packages during the analysis. Preserve the input. Exclude EntrezGeneID and
Length from the 12 sample-count columns. Validate unique IDs, row widths,
nonnegative integer counts and missing entries. Save rnaseq-sample-qc.csv
with exactly six columns: compact_sample, original_column_name, total_raw_counts,
zero_count_genes, detected_genes_count_gt_0, median_count_among_detected_genes. Retain the complete original sample
identifier in original_column_name; compact_sample is only a compact display label.
For each sample compute the raw-count sum, count of zeros, count > 0,
and median of positive counts. Save rnaseq-library-sizes.png with all sample
labels and a raw-count axis, plus rnaseq-qc-report.md describing the source,
input SHA-256 before and after, method, label mapping and limitations.
Save all three outputs in English; I will reopen them to check the results.
Do not perform differential-expression testing or delegate.
```

Klicken Sie vor dem Senden auf den Anhang, um die Kopfzeile zu überprüfen: zwei Metadatenspalten gefolgt von zwölf Beispielspalten. Die Textvorschau lädt nur einen Teil einer großen Datei; Der Notebook muss die gesamte Matrix lesen. Dieser Lauf schickte die Berechnung direkt. Wenn Sie sich zuerst auf einen Plan einigen möchten, verwenden Sie den separaten [Planung](../guides/planning.md)-Flow.

![Die tatsächliche angehängte Matrix und ihre Spaltendefinitionen](/img/open-science/research-workflows/rnaseq-qc-input.webp)

## 2. Metadaten aus Stichprobenberechnungen heraushalten {/* #2-keep-metadata-out-of-sample-calculations */}

Die Berechnung bewahrt Entrez-IDs, überprüft konsistente Zeilenbreiten und zählt als nicht negative Ganzzahlen. `Length` ist Genmetadaten, keine dreizehnte Probe. Eine Nullzählung ist ein gemessener Eintrag, kein fehlender Wert; Leerzeichen nicht durch Null ersetzen oder Nullzählgene stillschweigend entfernen.

Berechnen Sie für jede Probe die Gesamtrohzahl, die Anzahl der Nullzählgene, die Anzahl mit einer Anzahl größer als Null und die Medianzahl **Nur unter den nachgewiesenen Genen**. Notieren Sie diesen Nenner. Verwenden Sie die genauen Eingabespalten; Kompakt-Etiketten wie `MCL1-DG` sind Display-Etiketten mit einer expliziten Abbildung, nicht neu abgeleitete biologische Gruppen.

<span id="3-inspect-the-actual-execution" />

## 3. Überprüfen Sie die Ausführung und behandeln Sie einen Fehler {/* #3-inspect-the-execution-and-handle-a-failure */}

Lesen Sie die Python-Berechtigungsanforderung, einschließlich der Eingabedatei und der Ausgabenamen, und lassen Sie dann die Operation "Scale" zu. Öffnen Sie **Notebook** im Gespräch und inspizieren Sie die fertige Zelle und ihre Ausgabe. Überprüfen Sie die Dimensionen, Original-Etiketten, metrischen Arrays und Vorher / Nachher Hash; die Vervollständigungsnachricht des Modells allein ist unzureichend.

Wenn die Eingabe-Versions-ID nicht aufgelöst werden kann, bitten Sie den Agenten, die angehängte Eingabe dieser Konversation zu lesen und erneut zu versuchen. Bestätigen Sie den Dateinamen und die Prüfsumme, bevor Sie fortfahren.

![Erfolgreiche Notebook-Ausgabe mit Dimensionen, Hashes und berechneten Beispielmetriken](/img/open-science/research-workflows/rnaseq-qc-rerun-notebook.webp)

Das Beispiel enthält **27,179-Genreihen und 12-Probenspalten**, ohne fehlerhafte Zeilen, doppelte IDs, fehlende Einträge oder ungültige Zählungen. Öffnen Sie alle drei Ausgabedateien unter **Generated**, um die gespeicherten Ergebnisse zu überprüfen.

## 4. Annahme des Mustertisches {/* #4-accept-the-sample-table */}

Öffnen Sie `rnaseq-sample-qc.csv` und überprüfen Sie **Zeilen 12 · Spalten 6**. Es behält jeden vollständigen ursprünglichen spaltennamen bei. In der nachstehenden Tabelle sind alle vier Metriken aufgeführt; die herunterladbare CSV enthält die Abbildungsspalte.

Vergleichen Sie alle Sample-Metriken mit dem [Basistabelle](../reference/example-data.md#sample-qc-baseline), wobei die Zeilen mit dem vollständigen Sample-Identifier übereinstimmen.

![Die gespeicherte zwölfreihige Beispiel-QC-Tabelle](/img/open-science/research-workflows/rnaseq-qc-rerun-table.webp)

Für diesen Input sollte die Nullzählung plus nachgewiesene Gene in jeder Zeile gleich **27,179** sein. Vergleichen Sie die **48**-Stichprobenmetriken mit der unabhängigen Baseline. Die Vereinbarung überprüft diese Berechnungen für die gelieferten Vorleistungen; Nachgelagerte Annahmen bedürfen noch einer eigenen Bewertung.

## 5. Lesen Sie den Plot, ohne ihn zu überinterpretieren {/* #5-read-the-plot-without-overinterpreting-it */}

Öffnen Sie `rnaseq-library-sizes.png` und vergrößern Sie es. Überprüfen Sie alle zwölf Beispieletiketten, die Rohzählachse und den Hinweis, dass die Werte nicht normalisiert sind. Die Gesamtzahlen reichen von **20,015,386** bis **24,723,827** in dieser Matrix.

![Das gespeicherte rohe Bibliotheks-Größe-Plot](/img/open-science/research-workflows/rnaseq-qc-rerun-plot.webp)

Eine größere Bibliothekssumme bedeutet an sich nicht, dass ein Gen differentiell exprimiert wird. Vor der nachgelagerten Analyse passen Sie die Stichprobenmerkmale und GSM-Kennungen mithilfe von GEO-Metadaten an die Matrixspalten an und geben dann die Regeln für Design, Kontraste, Normalisierung und Filterung an. Siehe [Anschlussstücke](../guides/connectors.md) zum Abrufen von Metadaten.

## 6. Bewahren Sie die Methoden und Beweise auf {/* #6-retain-the-methods-and-evidence */}

Führen Sie einen Bericht mit der Eingabeprüfsumme, den Abmessungen, den Gültigkeitsprüfungen, dem exakten Label-Mapping, den Laufzeit-/Bibliotheksversionen und den Interpretationsgrenzen. Fügen Sie erst nach dem Vergleich der Werte einen Abschnitt mit unabhängiger Überprüfung hinzu. Das Speichern einer Berichtsrevision berechnet die Tabelle oder Figur nicht neu.

Vergleichen Sie alle **48**-Stichprobenmetriken mit der Baseline und überprüfen Sie, ob die Eingabe SHA-256 `128d2411f3169de0cac9963c30152bb5c9a3083ac80fd25651b97cf4b7304691` bleibt. Der Beispielbericht zeichnet Python 3.12.14 und matplotlib 3.11.1 auf; Notieren Sie die Versionen, die in Ihrem eigenen Lauf verwendet werden.

Laden Sie das Beispiel <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-sample-qc.csv" download>QC-Tisch</a>, <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-library-sizes.png" download>Grundstück</a> und <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-qc-report.md" download>Bericht</a> herunter. Behalten Sie Ihre ursprüngliche Eingabe und Sitzung Notebook neben den Ausgängen. Verwenden Sie [Reproduzierbarkeitsprüfungen](../guides/reproducibility.md), um die Umgebung vorzubereiten und die Berechnung erneut auszuführen.
