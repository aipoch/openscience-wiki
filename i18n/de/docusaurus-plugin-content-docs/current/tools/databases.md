---
title: "Wissenschaftliche Datenbanken"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

# Wissenschaftliche Datenbanken {/* #scientific-databases */}

Verwenden Sie diese Seite, um eine Datenquelle auszuwählen, zu verstehen, was sie zurückgeben kann, und ihre Tools in Open-Science verfügbar zu machen. Schritt-für-Schritt-Forschungsbeispiele mit Screenshots und Ausgabedateien finden Sie unter [Forschungsabläufe](#database-workflows).

<span id="data-source-catalog" />

## Unterstützte Datenbanken {/* #supported-databases */}

Open-Science v0.32.0 beinhaltet **23-Datenquellenstecker mit 251-Operationen**. Das separate Offline-Molekül Connector fügt zwei Operationen hinzu, wodurch die vollständige Registrierung auf 253 gebracht wird. Connector-Namen unter **Settings → Connectors** übereinstimmen; Jede Familie kann mehrere Datenbanken freilegen. Das Auflisten einer Quelle bedeutet nicht, dass jedes Feature seiner Website verfügbar ist.

| Konnektor | Quellen | Vorgänge | Verwenden Sie es für  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Kleinmolekülchemie über PubChem, ChEBI, Rhea und BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papiere, Autoren, Zitate, DOI-Updates und Datensatz / Software-Datensätze. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Biomedizinische Literatur über NCBI E-utilities, den PMC ID Converter und Europe PMC — Suche, Metadaten, verwandte Artikel, Zitat-Lookup, ID-Konvertierung, Volltext und Copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 10 | Gen-/Protein-Identifikatoren, UniProt-Sequenzentdeckung, GO- und Reactome-Anmerkungen und g:Profiler-Gen-Set-Anreicherung. |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST | 17 | Genomannotation, Homologie und Sequenz; NCBI-Taxon/-assembly/-sequence-Identität; BLAST Einreichung und Berichte. |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | Humangenetische Varianten — gnomAD-Populationshäufigkeit/-einschränkung, ClinVar-Datensätze/Suche (direkt NCBI), dbSNP, strukturelle und mitochondriale Varianten.  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | Klinische Studien von ClinicalTrials.gov - Suche, Details, Sponsoren, Ermittler, Endpunkte und Förderfähigkeit.  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | Klinische Genomik-Wissensdatenbanken: ClinGen-Kurationen, klinische CIViC-Evidenz und die Open Targets Platform.  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | Strukturen und molekulare Wechselwirkungen — PDB-Strukturen, AlphaFold-Vorhersagen, EMDB-Kryo-EM-Einträge, komplexe Portalkomplexe, IntAct-Interaktionsnetzwerke.  |
| ChEMBL · `chembl` | ChEMBL | 6 | Bioaktive Verbindungen, Medikamente, Targets, Bioaktivität und Mechanismen über das ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | bioRxiv/medRxiv Preprints — Suche nach Datum/Kategorie, Metadaten nach DOI, Links zu Zeitschriftenveröffentlichungen, Funder-Listen und Plattformstatistiken.  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | Drugs@FDA-Anwendungen, Etiketten und Corpus-Statistiken über openFDA.  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | Humangenetische Assoziationsnachweise — GWAS-Katalog, eQTL-Katalog und PheWeb-PheWAS-Portale (FinnGen, BioBank Japan).  |
| Expression · `expression` | GTEx | 12 | Menschliche Gewebeexpression und eQTLs über das GTEx Portal.  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | Proteindomänenarchitektur, Familien-/Clan-Mitgliedschaft, Expressionsatlas und Interaktionsnetzwerke über InterPro/Pfam, den Human Protein Atlas und STRING.  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | Krebsgenomik-Studie Aufzeichnungen über die cBioPortal REST API.  |
| RNA · `rna` | Rfam | 9 | Nicht-kodierende RNA-Familiendaten (Metadaten, Ausrichtungen, Modelle, Strukturen) über Rfam.  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | Expressions-, Metabolomik-, Metagenomik- und Proteomikarchive; ENA-Lernerkennung und FASTQ/Einreichungsinventare; PRIDE-Dateilisten. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Zelltypidentität, Markergene, Quelldatensätze und Gewebe über CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Funktionale Genomik der Genregulation — ENCODE-Experimente/Bioproben/Dateien, JASPAR-TF-Bindungsprofile und UniBind-ChIP-seq-TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Funding-Opportunity-Suche (Grants.gov) und Antikörperkatalog-Lookups (Antibody Registry).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart Attributabfragen und Identifier-Übersetzung.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22-Käuflicher chemischer Raum (CartBlanche22) — Stoffsuche nach ZINC-ID, SMILES-Suche mit exakter Ähnlichkeit, Lieferantencode-Auflösung, Zufallsstichprobenahme, 3D-Strukturstellen für das Andocken.  |

Die Offline-Molekül-Tools sind in [Wissenschaftliche Zuschauer](viewers.md) abgedeckt. Für die genauen Operationen, die von jeder Datenquelle ausgesetzt sind, verwenden Sie den [Connector Betriebsnummer](../reference/connector-operations.md).

<span id="choose-a-query-and-inspect-the-result" />

## Was du tun kannst {/* #database-capabilities */}

| Forschungsaufgaben | Beginnen Sie mit | Typischer Output |
| --- | --- | --- |
| Papiere finden, Zitate nachzeichnen und DOI-Beziehungen überprüfen | Literatur Graph, PubMed, bioRxiv | Literaturaufzeichnungen, Identifikatoren, Zitierlinks und Volltextverfügbarkeit |
| Gene oder Proteine finden und Sequenzen vergleichen | Gene & Ontologien, Genome | Identifikator-Mappings, Proteinaufzeichnungen, FASTA- und BLAST-Berichte |
| Entdecken Sie öffentliche Omik-Daten und inspizieren Sie verfügbare Dateien | aus. | Studieren/Ausführen von Metadaten und Dateiinventaren mit Quellorten, Größen und verfügbaren Prüfsummen |
| Interpretieren Sie eine Genliste oder inspizieren Sie ein Interaktionsnetzwerk | Gene & Ontologien, Protein-Annotation | Anreicherungstabellen, Ontologie-Anmerkungen und Netzaufzeichnungen |
| Prüfvarianten, Ausdruck und regulatorische Nachweise | Varianten, Klinische Genomik, Humangenetik, Expression, Regulation | Quellenaufzeichnungen mit Organismen, Gewebe, Referenzaufbau und relevanten Evidenzfeldern |
| Retrieve Verbindung, Struktur oder klinische Studie Aufzeichnungen | Chemie, ChEMBL, Strukturen & Interaktionen, Klinische Studien | Chemische Kennzeichen/Eigenschaften, Strukturaufzeichnungen und Versuchsmetadaten |

Eine Datenbankantwort kann einen Forschungsschritt unterstützen; Es werden nicht automatisch Daten heruntergeladen, jedes Papier in die Literaturbibliothek aufgenommen oder eine vollständige Analyse durchgeführt. Geben Sie an, welche Datensätze und Dateien Sie speichern möchten.

## Verbinden und Starten der Verwendung einer Datenbank {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. Aktivieren Sie das eingebaute Connector {/* #1-enable-the-built-in-connector */}

1. Öffnen Sie **Settings → Connectors** und suchen Sie nach der oben aufgeführten Familie, z. B. **aus.**.
2. Öffnen Sie seine Details und erweitern Sie **Tools**. Lesen Sie die Eingaben der ausgewählten Operation, Ergebnisgrenzen und Anforderungen von Drittanbietern.
3. Aktivieren Sie die Verfügbarkeit für **Hauptagent** und überprüfen Sie **Used by**. Der Specialist-Zugriff ist auf dem einzelnen Specialist konfiguriert. Verfügbarkeits- und Genehmigungsrichtlinien pro Werkzeug sind separate Kontrollen.

![Omics Archives-Tooldetails mit den GEO-Eingaben und dem Metadaten-only-Scope](/img/open-science/guides-walkthrough/36-omics-tools.webp)

Diese Steckverbinder sind eingebaut; Sie müssen keinen benutzerdefinierten server für sie hinzufügen. Für einen externen Dienst, den Sie selbst betreiben, siehe [Benutzerdefiniertes Connector Setup](../guides/connectors.md). Ein aufgelistetes oder aktiviertes Connector ist kein Beweis dafür, dass die Authentifizierung oder eine Abfrage erfolgreich war.

<span id="connect-openalex-and-follow-citation-links" />

### 2. Hinzufügen von Anmeldeinformationen, wenn die Operation diese erfordert {/* #2-add-credentials-when-the-operation-requires-them */}

| Service oder Bedingung | Wo Sie es konfigurieren |
| --- | --- |
| OpenAlex | **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**fort. Geben Sie Ihren API Schlüssel ein, wählen **Validate**, dann **Save** Nach der Validierung ist es gelungen. |
| Direkte NCBI-Variantenabfragen, die Kontaktdaten erfordern | **Settings → Connectors → Manage credentials → Literature access**fort. Füllen Sie ein **Contact email** und wählen **Save**fort. Ein NCBI API-Schlüssel ist optional. |
| Eine weitere Operation mit Anmeldepflicht | Befolgen Sie die Anforderungen dieses Tools und [Anmeldeinformationen](../guides/connectors.md)fort. Binden Sie den Nachweis an den beabsichtigten Dienst. |

Geben Sie Schlüssel in der Anmeldeformular, nicht in einer Forschungsaufforderung oder eine freigegebene Ausgabedatei. Anforderungen für den ausgewählten Vorgang konfigurieren; die oben genannte Anforderung an die Kontakt-E-Mail bedeutet nicht, dass jedes NCBI-Tool dieselbe Anforderung hat.

<span id="look-up-a-doi-and-its-related-research-records" />

Literatur Graph bietet auch `crossref_get_work`, `crossref_get_updates`, `datacite_search_records` und `datacite_get_record` an. Diese vier öffentlichen Methoden erfordern keinen OpenAlex-Schlüssel. Für OpenAlex-Zitatanweisungen findet `openalex_citations` Werke, die ein Werk zitieren, während `openalex_references` die Werke findet, die es zitiert. [Literatur Graph Parameter](../reference/connector-operations.md#family-2).

<span id="start-with-one-known-identifier" />
<span id="actual-local-queries" />

### 3. Bestätigen Sie den Zugriff mit einer kleinen Abfrage {/* #3-confirm-access-with-a-small-query */}

Aktivieren Sie **Gene & Ontologien**, öffnen Sie eine Konversation mit einem verbundenen Modell und senden Sie:

<p className="example-label"><strong>Beispiel</strong> Überprüfen Sie einen bekannten menschlichen Gen-Identifikator</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

Überprüfen Sie das tatsächliche Werkzeugergebnis. Für menschliche TP53, überprüfen Sie `query`, `symbol`, Entrez Gene **7157** und den Namen **Tumorprotein p53**. Behalten Sie mehrere Übereinstimmungen, bis Sie den Organismus bestätigt und aufgezeichnet haben. Eine erfolgreiche Abfrage bestätigt diese bestimmte Operation; Es stellt nicht den Zugang zu allen Quellen her. [Genaue Felder](../reference/connector-operations.md#query_genes).

## Folgen Sie einem Forschungs-Workflow {/* #database-workflows */}

Jeder artikel unten enthält die eingaben, schritte, aktuelle englischsprachige screenshots und herunterladbare beispielausgaben.

<span id="ena-runs" />
<span id="omics-discovery" />

### Finden Sie öffentliche Omik-Daten {/* #find-public-omics-data */}

[Finden Sie Public Omics-Daten und erstellen Sie ein Dateiinventar](../workflows/public-omics-data.md): Beginnen Sie mit einem bekannten Lauf oder einem Thema, prüfen Sie ENA- und PRIDE-Datensätze und speichern Sie Quellorte und Prüfsummen. Der Download der Daten bleibt ein separater Schritt.

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### Vergleichen Sie eine Proteinsequenz {/* #compare-a-protein-sequence */}

[Finden Sie eine Proteinsequenz und vervollständigen Sie eine BLAST-Suche](../workflows/protein-sequence-search.md): UniProt FASTA abrufen, die BLAST-Job-ID behalten und dann die abgeschlossenen Ausrichtungen, Identität und Abfrageabdeckung überprüfen.

<span id="gene-set-enrichment" />

### Analysieren Sie einen Kandidaten-Gen-Set {/* #analyze-a-candidate-gene-set */}

[Laufen funktionelle Anreicherung für einen Kandidaten-Gen-Set](../workflows/gene-set-enrichment.md): Wählen Sie den Organismus, die Identifikatoren und den Hintergrund, führen Sie g:Profiler aus und interpretieren Sie korrigierte Wahrscheinlichkeiten mit Quellversionen.

<span id="reference-genome" />

### Bestätigung eines Referenzgenoms {/* #confirm-a-reference-genome */}

[Kontrollarten, Referenzgenom und Chromosomenkennzeichen](../workflows/reference-genome-check.md): Lösen Sie das Taxon, die versionierte Assembler und die Chromosomenaliase, bevor Sie Datensätze verbinden.

Bei anderen Aufgaben folgen Sie [strukturierte PubChem-Aufzeichnungen](../workflows/database-records.md), [Abgleich wissenschaftlicher Aufzeichnungen](../workflows/cross-check-records.md) oder [Literaturentdeckung für ein Gruppentreffen](../workflows/journal-club.md).

<span id="handle-a-returned-record-empty-match-or-error" />
<span id="empty-partial-and-failed-responses" />

## Verwenden Sie die zurückgegebenen Daten korrekt {/* #database-limits */}

- Bewahren Sie die Abfrage, Quelle, Organismus, Gewebe, Einheiten und Beitrittsversionen auf. Datenbankeinträge, Vorhersagen und generierte Zusammenfassungen sind verschiedene Arten von Beweisen.
- Überprüfen Sie die zurückgegebenen Zählungen, Paginierungs- und Abkürzungsflags, bevor Sie eine Antwort als vollständig behandeln. Null Übereinstimmungen, eine Teilantwort und ein Anforderungsfehler erfordern unterschiedliche Folgeaktionen.
- Ein Dateiinventar bietet Standorte und Metadaten. Das Herunterladen von Bytes, das Überprüfen von Prüfsummen und das Analysieren der Daten sind separate Operationen.
- Wenn eine Anfrage Anmeldeinformationen benötigt, füllen Sie das entsprechende Formular aus, bevor Sie es erneut versuchen. Für Tariflimits, folgen Sie der Verzögerung des Dienstes; für Timeouts die Anforderungsgröße reduzieren. Siehe [Fehlerbehebung](../guides/troubleshooting.md).

### Populationsfrequenzen und Interaktionsnetze {/* #string-network */}

Setzen Sie für `get_variant` `include_populations: true` nur, wenn Populationsdetails benötigt werden. Bewahren Sie den Dataset und den Referenz-Build auf. Exom- und Genombeobachtungen bleiben getrennt. Ein nicht verfügbarer Wert ist `null`, nicht Null; Überlappende Bevölkerungs- oder Geschlechtsschichten dürfen nicht summiert werden. Dies sind beobachtete Frequenzen, nicht das Filtern von Allelfrequenzen. [gnomAD-Parameter](../reference/connector-operations.md#get_variant)

Von v0.31.0 enthält `get_string_network.nodes` zurückgegebene Nachbarn und isolierte kartierte Eingaben. Eine einzelne kartierte Eingabe fordert Nachbarn an; Mehrere abgebildete Eingänge werden nicht erweitert. Filtern Sie `is_query`, um Eingabeknoten wiederherzustellen, und verwenden Sie `queries` für alle abgebildeten Aliase. `n_nodes` zählt den Graphen `n_mapped` zählt Input-Mappings. Aktualisieren Sie Skripte, die die beiden gleichgesetzt haben, bevor Sie sie wiederverwenden. [STRING-Parameter](../reference/connector-operations.md#get_string_network)

<span id="find-operation-parameters" />

## Suche nach Betriebsparametern {/* #operation-parameters */}

Der [Connector Betriebsnummer](../reference/connector-operations.md) listet die erforderlichen Eingaben, erlaubten Werte und genauen Aufrufe auf. Verwenden Sie diese Seite, um eine Quelle auszuwählen und sie zu verbinden; Verwenden Sie die Referenz für die Felder eines bestimmten Werkzeugs.

Katalogquelle: [catalog.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/catalog.ts), [registry.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/registry.ts).
