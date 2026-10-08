---
title: "Wissenschaftliche Datenbanken"
toc_max_heading_level: 2
last_update:
  date: '2026-10-08'
---

# Wissenschaftliche Datenbanken {/* #scientific-databases */}

Verwenden Sie diese Seite, um eine Datenquelle auszuwählen, zu verstehen, was sie zurückgeben kann, und ihre Tools in Open-Science verfügbar zu machen. Schritt-für-Schritt-Forschungsbeispiele mit Screenshots und Ausgabedateien finden Sie unter [Forschungsabläufe](#database-workflows).

<span id="data-source-catalog" />

## Unterstützte Datenbanken {/* #supported-databases */}

Open-Science v0.34.1 beinhaltet **30-Datenquellenstecker mit 324-Operationen**. Das separate Offline-Molekül Connector fügt zwei Operationen hinzu, wodurch die vollständige Registrierung auf 326 gebracht wird. Connector-Namen unter **Settings → Connectors** übereinstimmen; Jede Familie kann mehrere Datenbanken freilegen. Das Auflisten einer Quelle bedeutet nicht, dass jedes Feature seiner Website verfügbar ist.

| Konnektor | Quellen | Vorgänge | Verwenden Sie es für  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Kleinmolekülchemie über PubChem, ChEBI, Rhea und BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papiere, Autoren, Zitate, DOI-Updates und Datensatz / Software-Datensätze. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Biomedizinische Literatur über NCBI E-utilities, den PMC ID Converter und Europe PMC — Suche, Metadaten, verwandte Artikel, Zitat-Lookup, ID-Konvertierung, Volltext und Copyright.  |
| Gene & Ontologien · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler, Enrichr | 15 | Gen/Protein-Identifikatoren, UniProt-Sequenzentdeckung, GO- und Reactome-Anmerkungen sowie g:Profiler und Enrichr-Gen-Set-Anreicherung. |
| Genome · `genomes` | Ensembl, UCSC, NCBI, BLAST, Clustal Omega | 20 | Genomannotation, Homologie und Sequenz; NCBI-Taxon/-assembly/-sequence-Identität; BLAST-Suche und Clustal Omega Multiple Sequence Alignment |
| Varianten · `variants` | gnomAD, ClinVar, dbSNP, MaveDB | 21 | Populationshäufigkeit, klinische Aufzeichnungen und assayspezifische Funktionswerte, Zuordnungen und Experimente. |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | Klinische Studien von ClinicalTrials.gov - Suche, Details, Sponsoren, Ermittler, Endpunkte und Förderfähigkeit.  |
| Klinische Genomik `clinical-genomics` | ClinGen, CIViC, Offene Ziele, ClinPGx | 30 | Klinische Genomik-Wissensdatenbanken: ClinGen-Kurationen, klinische CIViC-Evidenz und die Open-Targets-Plattform sowie ClinPGx-Pharmakogenomik-Aufzeichnungen. |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | Strukturen und molekulare Wechselwirkungen — PDB-Strukturen, AlphaFold-Vorhersagen, EMDB-Kryo-EM-Einträge, komplexe Portalkomplexe, IntAct-Interaktionsnetzwerke.  |
| ChEMBL · `chembl` | ChEMBL | 6 | Bioaktive Verbindungen, Medikamente, Targets, Bioaktivität und Mechanismen über das ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | bioRxiv/medRxiv Preprints — Suche nach Datum/Kategorie, Metadaten nach DOI, Links zu Zeitschriftenveröffentlichungen, Funder-Listen und Plattformstatistiken.  |
| Drug Regulatory · `drug-regulatory` | openFDA | 10 | Drugs@FDA, Etiketten, FAERS-Nebenwirkungsberichte und Drogenrückrufe. |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | Humangenetische Assoziationsnachweise — GWAS-Katalog, eQTL-Katalog und PheWeb-PheWAS-Portale (FinnGen, BioBank Japan).  |
| Ausdruck · `expression` | GTEx, Bgee | 16 | GTEx-Gewebeexpression und eQTL für den Menschen; Bgee-speziesübergreifender Basisausdruck. |
| Proteinannotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 14 | Proteindomänenarchitektur, Familien-/Clan-Mitgliedschaft, Expressionsatlas und Interaktionsnetzwerke über InterPro/Pfam, Human Protein Atlas und STRING, einschließlich Netzwerkinteraktionsanreicherung. |
| Krebsmodelle · `cancer-models` | cBioPortal | 10 | Studien, Mutationen, Kopienzahl, Proben, Patienten, klinische Eigenschaften und Expression des molekularen Profils. |
| RNA · `rna` | Rfam | 9 | Nicht-kodierende RNA-Familiendaten (Metadaten, Ausrichtungen, Modelle, Strukturen) über Rfam.  |
| Omics-Archive `omics-archives` | ArrayExpress, GEO, MetaboLights, Metabolomics Workbench, MGnify, PRIDE, ENA | 26 | Omics-Studie/-Ausführung von Metadaten und Dateiinventaren; Metabolomische Proben, Faktoren, Analysen und Aufzeichnungen über Verbindungen. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Zelltypidentität, Markergene, Quelldatensätze und Gewebe über CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Funktionale Genomik der Genregulation — ENCODE-Experimente/Bioproben/Dateien, JASPAR-TF-Bindungsprofile und UniBind-ChIP-seq-TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Funding-Opportunity-Suche (Grants.gov) und Antikörperkatalog-Lookups (Antibody Registry).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart Attributabfragen und Identifier-Übersetzung.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22-Käuflicher chemischer Raum (CartBlanche22) — Stoffsuche nach ZINC-ID, SMILES-Suche mit exakter Ähnlichkeit, Lieferantencode-Auflösung, Zufallsstichprobenahme, 3D-Strukturstellen für das Andocken.  |
| GDC · `gdc` | NCI GDC | 5 | Krebsprojekte, Fälle, Dateimetadaten, offene/kontrollierte Etiketten und Transfermanifeste; kein Download oder Zugangszuschuss. |
| Zenodo · `zenodo` | Zenodo | 2 | Öffentlicher Datensatz, Software- und Publikationserkennung, versionenspezifische Metadaten und Dateiinventare; Kein Upload oder Download. |
| HMMER `hmmer` | EMBL-EBI HMMER3 | 3 | Programmspezifische Protein / Profil / Ausrichtung Suche, Job-Status und Ergebnisse. |
| InterProScan · `interproscan` | EMBL-EBI InterProScan | 2 | Status- und TSV-Berichte für bestehende Annotationsjobs; keine Einreichung. |
| Pathway Commons · `pathway-commons` | Pathway Commons / Reactome | 4 | Pathway-Suche, Top-Pfade, Graph-Abfragen und BioPAX-Submodellexporte. |
| Alliance Genome Resources · `alliance` | Allianz der Genomressourcen | 8 | Gene, Orthologe, Krankheitsmodelle, Phänotypen, Allele und Expression von Menschen und Modellorganismen. |
| CELLxGENE Discover · `cellxgene-discover` | CELLxGENE Discover | 9 | Einzelzellensammlungen und Datensätze, veröffentlichte Versionen, Dateiformate, Größen und Download-URLs. |

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

Für die Batch-Identifier-Konvertierung fügt **Gene & Ontologien** `submit_uniprot_id_mapping`, `get_uniprot_id_mapping_status` und `get_uniprot_id_mapping_results` hinzu. Speichern Sie die Job-ID, wählen Sie mindestens drei Sekunden auseinander und rufen Sie dann jede Ergebnisseite ab. Eins-zu-viele-Mappings und explizites `failed_ids` beibehalten; Fehlen auf einer Seite bedeutet nicht unübertroffen. Der Dienst akzeptiert bis zu 100,000-Identifikatoren und läuft die Ergebnisse nach bis zu sieben Tagen ab. Siehe [genaue Abbildungsfelder](../reference/connector-operations.md#submit_uniprot_id_mapping).

**Zenodon** stellt öffentliche Datensatz-Metadaten ohne Authentifizierung frei. Bewahren Sie die versionenspezifische Datensatz-ID und die Zugriffs- / Lizenzfelder mit dem Dateiinventar auf. **GD** stellt öffentliche Metadaten frei; Ein Manifest ist keine Download-Autorisierung, und kontrollierte Dateien erfordern eine GDC-Berechtigung. [GDC-Operationen](../reference/connector-operations.md#family-24) · [Zenodo-Operationen](../reference/connector-operations.md#family-25).

Eine Datenbankantwort kann einen Forschungsschritt unterstützen; Es werden nicht automatisch Daten heruntergeladen, jedes Papier in die Literaturbibliothek aufgenommen oder eine vollständige Analyse durchgeführt. Geben Sie an, welche Datensätze und Dateien Sie speichern möchten.

## Einzelzell-, Modell-Organismus- und Varianten-Effekt-Daten {/* #single-cell-model-organisms */}

Suchen Sie nach den Einträgen unten in **Settings → Connectors**, aktivieren Sie die Verfügbarkeit für **Hauptagent**, beschreiben Sie dann den Organismus, die Forschungsfrage und die Aufzeichnungen, die Sie in Ihrem Gespräch behalten müssen. Diese neuen Operationen lesen öffentliche Daten ohne einen benutzerdefinierten MCP-Server, API Schlüssel oder NCBI Kontakt-E-Mail. Andere Dienste im selben Connector können unterschiedliche Anforderungen haben.

| Eingang | Was sie tun kann | Wie man die Ergebnisse verwendet |
| --- | --- | --- |
| CELLxGENE Discover | Suche nach Einzelzelldatensätzen nach Organismus, Gewebe, Krankheit, Assay oder Zelltyp; Inspizieren von Versionen und Dateibeständen | Ontologiefilter verwenden exakte Beschriftungen oder IDs und werden mit AND kombiniert. dataset_version_id für eine feste Veröffentlichung behalten; dataset_id wird auf die aktuelle Version aufgelöst. Gibt verfügbare Download-URLs zurück, ohne Dateien herunterzuladen oder Zensusausdruckmatrizen abzufragen. Verwenden Sie das separate CellGuide für Zelltypbeschreibungen und Marker. |
| Alliance Genome Resources | Abfrage von Human-, Maus-, Ratten-, Fliegen-, Wurm-, Zebrafisch-, Hefe- und Froschgenen, Orthologen, Krankheitsmodellen, Phänotypen und Expression | Suchen und bestätigen Sie den Organismus, bevor Sie die zurückgegebenen Gen-IDs befolgen. Bewahren Sie Evidenz und Orthologie Stringenz; ein Modell-Organismus-Phänotyp ist keine Schlussfolgerung aus einer menschlichen Krankheit. |
| Varianten → MaveDB | Varianteneffekt-Score-Sets, Assay-Methoden, CSV-Scoreseiten und bestehende VRS-Mappings finden | Halten Sie die URN, Lizenz, Assay-Methoden und Score-Kalibrierung. Funktionelle Werte sind keine Klassifikationen der klinischen Pathogenität. CSV verwendet Start/Limit-Paginierung und zurückgegebener Text muss noch in einer Datei gespeichert werden. Mapping Retrieval führt kein Liftover durch. |
| Omics Archives → Metabolomics Workbench | Suchstudien; Proben, Faktoren, Analysen und Metaboliten nach ST-Beitritt zu untersuchen; Verbindungsstrukturen und Querverweise nachschlagen | Wählen Sie Zusammenfassung, Faktoren, Analyse oder Metaboliten mit Abschnitt. Lösen Sie zusammengesetzte Namen zuerst über PubChem in unterstützte Identifikatoren auf. Diese Operationen laden keine Rohmessmatrizen herunter. |

CELLxGENE-Filterung und Paginierung laufen lokal über den vorgelagerten Katalog, der für jede Anforderung abgerufen wurde; Der Katalog kann zwischen den Anfragen wechseln. Verwenden Sie Versions-IDs, um eine Publikation beizubehalten. Eine nicht gemeldete Dateigröße ist -1, nicht Null Bytes. Fehlende Werte und Assay-Definitionen in den Ergebnissen von MaveDB und Workbench ebenfalls beibehalten.

Siehe genaue Eingaben für [CELLxGENE Discover](../reference/connector-operations.md#family-30), [Allianz](../reference/connector-operations.md#family-29), [MaveDB](../reference/connector-operations.md#mavedb_search_score_sets) und [Metabolomics Workbench](../reference/connector-operations.md#workbench_search_studies).

## Verbinden und Starten der Verwendung einer Datenbank {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. Aktivieren Sie das eingebaute Connector {/* #1-enable-the-built-in-connector */}

1. Öffnen Sie **Settings → Connectors** und suchen Sie nach der oben aufgeführten Familie, z. B. **aus.**.
2. Öffnen Sie seine Details und erweitern Sie **Tools**. Lesen Sie die Eingaben der ausgewählten Operation, Ergebnisgrenzen und Anforderungen von Drittanbietern.
3. Aktivieren Sie die Verfügbarkeit für **Hauptagent** und überprüfen Sie **Used by**. Verwenden Sie **Manage access** in der Ressource, um Main-Agenten- und Specialist-Zuordnungen anzupassen. Verfügbarkeits- und Genehmigungsrichtlinien pro Werkzeug sind separate Kontrollen.

![Omics Archives-Tooldetails mit den GEO-Eingaben und dem Metadaten-only-Scope](/img/open-science/guides-walkthrough/36-omics-tools.webp)

Diese Steckverbinder sind eingebaut; Sie müssen keinen benutzerdefinierten server für sie hinzufügen. Für einen externen Dienst, den Sie selbst betreiben, siehe [Benutzerdefiniertes Connector Setup](../guides/connectors.md). Ein aufgelistetes oder aktiviertes Connector ist kein Beweis dafür, dass die Authentifizierung oder eine Abfrage erfolgreich war.

<span id="connect-openalex-and-follow-citation-links" />

### 2. Hinzufügen von Anmeldeinformationen, wenn die Operation diese erfordert {/* #2-add-credentials-when-the-operation-requires-them */}

| Service oder Bedingung | Wo Sie es konfigurieren |
| --- | --- |
| OpenAlex | Optionaler Schlüssel. Um einen zu konfigurieren, offen **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**und es zu validieren, dann zu retten. |
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

### Inspizieren eines Pathway-Netzwerks {/* #inspect-a-pathway-network */}

[Untersuchen Sie einen Pfad und sein Interaktionsnetzwerk](../workflows/inspect-pathway.md): Finde einen menschlichen Reactome-Pfad durch Pathway Commons, bewahre seinen zurückgegebenen URI, exportiere die Interaktionen und unterscheide ein ausgewähltes Netzwerk vom Nachweis der Signalwegaktivität.

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

Katalogquelle: [catalog.ts](https://github.com/aipoch/open-science/blob/v0.34.1/src/main/connectors/catalog.ts), [registry.ts](https://github.com/aipoch/open-science/blob/v0.34.1/src/main/connectors/registry.ts).

## Sequenzsuche und Ausrichtung {/* #sequence-tools */}

**HMMER** bietet programmspezifische Proteinsequenz-, Profil-HMM- und Alignment-Suchen. Wählen Sie das Programm und die Datenbank zusammen, behalten Sie die Job-ID bei und rufen Sie die Ergebnisse erst nach **ERFOLG** ab. [HMMER-Betrieb](../reference/connector-operations.md#family-26).

**InterProScan** ruft Anmerkungen zu einem bestehenden Job ab, der über den EMBL-EBI-Service eingereicht wurde. Behalten Sie die Job-ID, überprüfen Sie den Status mindestens zehn Sekunden auseinander und holen Sie den TSV nach **AUSGESCHLOSSEN** ab. Dieser Connector kann keinen neuen Job einreichen. [InterProScan Operationen](../reference/connector-operations.md#family-27).

**Genomes → Clustal Omega** ordnet mindestens drei eindeutig benannte Protein-, DNA- oder RNA-FASTA-Datensätze an. Konfigurieren Sie die vom Dienst angeforderte Kontakt-E-Mail, senden Sie sie einmal, behalten Sie die Job-ID bei, überprüfen Sie dann den Status und speichern Sie die zurückgegebene Ausrichtung. [Mehrfachsequenz-Ausrichtungs-Workflow](../workflows/multiple-sequence-alignment.md).

## Enrichr, STRING und ClinPGx {/* #enrichment-pharmacogenomics */}

- **Genes & Ontologies → Enrichr**: Liste der aktuellen Bibliotheken, dann Abfrage Gen-Set-Anreicherung für Funktionen, Transkriptionsfaktoren, Störungen, Medikamente, Krankheiten, Gewebe oder Zelltypen. Wählen Sie eine Bibliothek, die dem Organismus und der Frage angemessen ist, und behalten Sie ihren Namen, Hintergrund und angepasste P-Werte bei.
- **Protein Annotation → STRING**: Testen Sie, ob ein Proteinnetzwerk mehr Interaktionen hat als von seinem Hintergrund erwartet. Dies stellt eine andere Frage als die Pathway-Überrepräsentation; Der P-Wert des Netzwerks ist kein Pfadtest. Folgen Sie dem [Workflow für Gen-Set-Anreicherung](../workflows/gene-set-enrichment.md#enrichr-string).
- **Clinical Genomics → ClinPGx**: Arzneimittel, Gen- oder Variantenanmerkungen, Richtlinien, regulatorische Etiketten und Populationsfrequenzen abrufen. Lösen Sie zuerst die Identifikatoren, liefern Sie die für die Operation erforderlichen Felder und behalten Sie die ursprünglichen Quellen und Evidenzniveaus bei. Dies ruft Forschungsaufzeichnungen ab; Es wird nicht automatisch ein individueller Behandlungsplan erstellt.

Aktivieren Sie die entsprechende Connector für den Wirkstoff in **Settings → Connectors**. Diese eingebauten Einträge erfordern keinen benutzerdefinierten MCP-Server. Siehe [Betriebsnummer](../reference/connector-operations.md) für genaue Felder und bedingte Anforderungen.

## Pathways, Expression und klinische Daten {/* #pathway-expression-clinical */}

Aktivieren Sie die entsprechende Familie in **Settings → Connectors** und teilen Sie dem Agenten dann den Organismus, die Quelle, die Identifikatoren und den beabsichtigten Umfang mit. Diese Ergänzungen verwenden eingebaute Konnektoren; Es ist kein benutzerdefinierter MCP Server erforderlich.

| Eingang | Was sie tun kann | Verbindung und Interpretation |
| --- | --- | --- |
| Pathway Commons | Suchpfade, Liste Top-Pfade, Abfragepfade zwischen Genen oder Export eines Submodells | Öffentlicher Dienst; die zurückgegebene URI, den Organismus und die Quelle behalten. Graphabfragen unterscheiden sich von Anreicherungstests. Folgen Sie [Workflow für die Interaktion zwischen den Signalen](../workflows/inspect-pathway.md). |
| Ausdruck → Bgee | Speziesübergreifend vorhandene/abwesende Anrufe, normalisierte Werte, begrenzte SPARQL-Abfragen und Download-Links | Entdecken Sie zuerst Arten und behalten Sie die NCBI-Taxonomie-ID. SPARQL erfordert Gene, Spezies und Gewebe. Gesunde Wildtyp-Baseline-Aufrufe sind kein differentieller Ausdruck; Download Links sind keine heruntergeladenen Dateien. |
| Krebsmodelle → cBioPortal | Auflisten von Proben/Patienten und Abfrage klinischer Attribute oder mRNA/Proteinexpression | Wählen Sie eine Studie, entdecken Sie ihre Profile und wählen Sie Messung / Normalisierung. Lieferkennungen, die der klinischen Probe/dem Patienten entsprechen; Molekulare Daten benötigen explizite Gene und genau eines von sample_ids oder sample_list_id. Fehlende Zeilen sind keine Nullen. |
| Drug Regulatory → openFDA | Suchen / Zählen FAERS Berichte und Suchen Drogenrückrufe | Daten und Produkte gebunden und Verkürzungsinformationen aufbewahrt werden. Die Anzahl der Berichte ist keine Inzidenz oder kausale Beweise. Mehrwertige Eimer können sich überschneiden; Ihre summe ist kein einzigartiger bericht insgesamt. |
| Omics Archives → MGnify | Ergebnisdateien nach MGYA-Analyse-Zugang auflisten | Gibt Art, Kategorie, Upstream-URL und Größe zurück, wenn gemeldet. Es werden keine Dateibytes heruntergeladen; Fehlende Größen oder URLs bleiben null. |

Siehe [Connector Betriebsnummer](../reference/connector-operations.md) für genaue erforderliche Felder, Bedingungen und Beispiele.
