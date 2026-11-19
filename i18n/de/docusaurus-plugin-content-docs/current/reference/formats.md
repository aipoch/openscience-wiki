---
title: "Dateiformate und Limits"
last_update:
  date: '2026-11-19'
---

# Dateiformate und Limits {/* #file-formats-and-limits */}

Schauen Sie sich das Datei-Routing und die Limits hier an. Das Hochladen einer Datei, die Vorschau, das Parsen in einem Tool und das Senden an ein Modell sind separate Funktionen. Ein akzeptierter Upload ist kein Versprechen eines Inline-Viewers oder Modellverständnisses.

<span id="input-and-preview" />

<span id="file-names-and-versions" />

<span id="large-and-binary-files" />

## Preview Routing {/* #preview-routing */}

| Inhalt | Anerkannte Erweiterungen | Verhalten und Grenze |
| --- | --- | --- |
| Raster/Vektorbild | `avif`, `gif`, `jpeg`, `jpg`, `png`, `svg`, `webp` | Bildvorschau; Modelleingabe hängt weiterhin von Bildunterstützung ab |
| TIFF | `tif`, `tiff` | Dedizierter Decoder mit Datei-, Pixel- und Speichergrenzen |
| Begrenzte Tabelle | `csv`, `tsv` | Erste Zeile wird wie Kopfzeilen behandelt; begrenzte Zeilen/Spalten |
| Sequenz | `fa`, `faa`, `fasta`, `ffn`, `fna`, `frn` | FASTA-Inspektion; Viewing validiert keine Analysemethode |
| Struktur | `pdb` | Structure Viewer; keine Qualitätsbewertung einer Vorhersage |
| Molekül/Reaktion | `mol`, `sdf`, `smi`, `smiles`, `rxn` | Dedizierte molekulare Vorschau; nicht annehmen `mol2` hat das gleiche Routing |
| PDF | `pdf` | Dedizierter Dokumentenleser mit Seitensteuerung |
| Wort | `docx` | Bürorender; Legacy `doc` ist nicht auf DOCX Parsing geroutet |
| Tabelle 1 | `xls`, `xlsx` | Office Spreadsheet Preview; Modellausführung ist eine separate Operation |
| Aufmachung | `pptx` | Präsentationsvorschau und [Schieberbearbeitung](../guides/presentation-editing.md); Vermächtnis `ppt` ist nicht auf PPTX Parsing geroutet |
| Markdown | `md`, `markdown` | Gerendertes Dokument mit unterstützten Textversionsaktionen |
| HTML | `htm`, `html` | Isolierte HTML-Vorschau; erhält keine Anwendungsprivilegien |
| JSON | `json` | Strukturierte Vorschau, inklusive anerkanntem Plan JSON |
| Code | `bash`, `bib`, `bibtex`, `css`, `js`, `jsx`, `py`, `r`, `sh`, `tex`, `ts`, `tsx` | Hervorgehobene Quelle; Öffnen eines Skripts führt es nicht aus |
| Klartext | `conf`, `config`, `ini`, `iqtree`, `log`, `nwk`, `state`, `toml`, `tree`, `treefile`, `txt`, `xml`, `yaml`, `yml` | Gebundene Textvorschau |
| Sonstige Dateien | Nicht anerkannte Erweiterung/Inhalt | Fallback/Download, soweit verfügbar; `.ipynb` Exportieren bedeutet keinen dedizierten File-Preview-Editor |

Der Router hat auch ein enges MIME-Fallback für geeignete erweiterungslose Dateien. Irreführende Office MIME-Metadaten machen ein Legacy-Format nicht kompatibel mit einem OOXML-Renderer.

[Genaue Routing-Tabelle](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts), [Tierkörperbeseitigungsregister](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx).

<span id="image-model-limits" />

## Größen- und Anzeigegrenzen {/* #size-and-display-limits */}

Die folgenden Einheiten sind binäre Einheiten: 1 MiB = 1,048,576 Bytes; 1 GiB = 1,073,741,824-Bytes. Die Schnittstelle kann diese Werte MB oder GB kennzeichnen.

| Grenze | Quellengrenzwert | Was gilt für das Limit |
| --- | ---: | --- |
| Ein Projekt Upload | 10 GiB | Upload-Eintritt, kein Preview- oder Modellkontextbudget |
| Ein Upload-Chunk | 8 MiB | Größe des Transferstücks; Keine benutzerseitige per-file-grenze. |
| Zusammenbaubefestigungen | 10 | Anzahl der Anlagen je Nachricht |
| Artefakt des Komponisten erwähnt | 10 | Explizite Artefaktreferenzen pro Nachricht |
| Standardtextvorschau lesen | 1 MiB | Initial Bounded Content gelesen |
| Maximal angeforderte generische Vorschau gelesen | 10 MiB | Decke des generischen Lesegeräts; spezialisierte Leser haben ihre eigenen Grenzen |
| CSV/TSV sichtbare Daten | Zeilen 100 × Spalten 24 | Anzeige von Daten nach der ersten/Kopfzeile; nicht die Größe des Quelldatensatzes |
| Office File Preview | 40 MiB | Office Preview Zulassung |
| TIFF-Dateivorschau | 40 MiB | Dediziertes TIFF-Dateilimit |
| TIFF-dekodierte Pixel | 25,000,000 | Vorschau Dekodierung Pixel Budget |
| TIFF-Dekodierung | 256 MiB | Vorschau-Decoder-Speicherbudget |
| Anzahl der TIFF-Seiten | 512 | Preflight Page Cap; andere Baukappen gelten ebenfalls |
| Automatische PDF-Extraktion/-Erfassung | 50 MiB | Automatischer PDF-Text-/Erfassungspfad; Behandeln Sie es nicht als allgemeines Projekt-Upload-Limit |

Wenden Sie die aufgeführten Limits auf die jeweilige Operation an: Vorschaulimits, Uploadlimits und Paketbudgets sind getrennt. Verwenden Sie für eine übergroße Datei die Originaldatei mit einem kompatiblen externen Lesegerät oder teilen Sie die Eingabe entsprechend der Methode auf.

Eine Tabelle, in der **100 Zeilen anzeigen** angegeben ist, kann mehr Quellzeilen enthalten. Verwenden Sie die tatsächliche Datei-Parsing in der Notebook, um seine Größe zu bestimmen. Im GSE60450-Fall hat die Quelle 27,179-Genzeilen, während die Probe QC CSV zwölf Zeilen hat: Die beiden Dateien fassen verschiedene Einheiten zusammen.

[Upload-Grenzen](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts), [CSV-Grenzen](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx), [Grenzen für Textleser](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts), [Bürogrenzen](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts), [TIFF-Grenzwerte](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts), [PDF Extraktionsgrenzwert](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts).

## Literaturimport und Zitierausgaben {/* #literature-import-and-citation-output */}

| Position | Vertrag | Unterscheidung |
| --- | --- | --- |
| Registrierte Einfuhr | BibTeX, RIS, NBIB | Import bibliographischer Aufzeichnungen; garantiert nicht den beigefügten Volltext |
| Einfuhrgehalt | Bis zu 32 MiB, mit einem 1,000-Record gebunden | Teilen Sie größere Sammlungen in überprüfte Chargen |
| Import im Citation-Stil | CSL, bis 1 MiB | Eine Stildefinition, keine Literatursammlung |
| Export von bibliographischen Daten | BibTeX oder RIS | Nicht davon ausgehen, dass NBIB-Import NBIB-Export impliziert |
| Citation Formating Locale (Deutsche Übersetzung) | `en-US`, `zh-CN` | Citation locale ist getrennt von der Anwendung UI Sprache |
| Sammlungsname | 200-Zeichen | Ein Sammeletikett |
| Beschreibung der Sammlung | 1,000-Zeichen | Beschreibt die Sammlung; Ersetzt nicht Project Agent Context |

Ein DOI-Metadatenergebnis ist kein heruntergeladenes PDF. Ein angehängtes PDF ist kein Beweis dafür, dass der Agent seinen Volltext gelesen hat. Überprüfen Sie sowohl die Anlage als auch den tatsächlichen Ausführungs- / Nachweisdatensatz.

[Literaturschemata und Grenzen](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts), [Formatierer für die Einfuhr/Ausfuhr](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts).

## Version und Download-Identität {/* #version-and-download-identity */}

| Identifikator | Verwendung | Nicht ersetzen |
| --- | --- | --- |
| Anzeigename | Finden Sie eine Datei in der Schnittstelle | Ein Name allein identifiziert keinen unveränderlichen Inhalt |
| Datei/Artefakt-ID | Identifizieren Sie das verwaltete Objekt | Ein heruntergeladener Pfad ist nicht die Identität dieses Objekts |
| Version ID / `vN` | Überprüfen Sie die genaue gespeicherte Revision und ihre Herkunft | Neueste Inhalte können von der für ein Ergebnis verwendeten Version abweichen |
| Prüfsumme | Vergleichen Sie Bytes zwischen Quell- und gespeicherten Kopien | Matching Names erstellen keine Matching Checksums |
| Downloadziel | Suchen Sie eine externe Kopie | Bearbeiten dieser Kopie aktualisiert nicht automatisch die verwaltete Version |

Verwenden Sie für Betriebsschritte [Notebook und Beweise](../guides/notebook.md) und [Workflow für öffentliche Daten](../workflows/data-quality.md). Diese Referenz zentralisiert die Grenzen, so dass sich diese Guides auf die Aufgabe konzentrieren können.

Für formatspezifische Steuerungen siehe [Vorschaukontrollen](../guides/previews.md#diagram-source-and-format-specific-controls): Mermaid Source/Rendered Switching, die einseitige PDF-Lesebedingung, begrenzte Tabellen, Arbeitsblattauswahl und TIFF-Seitenverarbeitung. Preview-Unterstützung führt nicht zu einem erfolgreichen Modelleingang oder Export.
