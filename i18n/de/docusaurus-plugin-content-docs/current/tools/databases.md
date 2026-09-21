---
title: "Wissenschaftliche Datenbanken"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';


# Wissenschaftliche Datenbanken {/* #scientific-databases */}

Die App bündelt **23 Datenquelle Konnektoren** sowie ein separates Offline-Molekül Connector. Das vollständige Register verfügt über **246 Werkzeugoperationen**, einschließlich der beiden Operationen von Molecule; Der Datenquellenkatalog unten deckt 244 ab. Aktivieren Sie die entsprechende Connector in den Einstellungen und stellen Sie dann eine begrenzte Frage mit dem richtigen Bezeichnertyp.

<span id="actual-local-queries" />

## Datenquellenkatalog {/* #data-source-catalog */}

Wählen Sie nach Identifikator und Forschungsfrage. Die Quellenabdeckung unterscheidet sich; die Bezugsnummer des Vorhabens für genaue Felder konsultieren.

| Konnektor | Quellen | Vorgänge | Verwenden Sie es für  |
| --- | --- | --- | ---  |
| Chemie · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Kleinmolekülchemie über PubChem, ChEBI, Rhea und BindingDB.  |
| Literaturgraph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papiere, Autoren, Zitate, DOI-Updates und Datensatz / Software-Datensätze. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Biomedizinische Literatur über NCBI E-utilities, den PMC ID Converter und Europe PMC — Suche, Metadaten, verwandte Artikel, Zitat-Lookup, ID-Konvertierung, Volltext und Copyright.  |
| Gene & Ontologien · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 9 | Gen/Protein-Identität und Ontologie-Begriffe — mygene.info, UniProt, OLS4-Ontologien, GO-Annotationen, Reactome Pathways.  |
| Genome · `genomes` | Ensembl, UCSC, NCBI | 14 | Genom-Annotation, Varianten, Homologie, Sequenz und Browser-Tracks — Ensembl REST und der UCSC Genome Browser.  |
| Varianten · `variants` | gnomAD, ClinVar, dbSNP | 15 | Humangenetische Varianten — gnomAD-Populationshäufigkeit/-einschränkung, ClinVar-Datensätze/Suche (direkt NCBI), dbSNP, strukturelle und mitochondriale Varianten.  |
| Klinische Studien · `clinical-trials` | ClinicalTrials.gov | 6 | Klinische Studien von ClinicalTrials.gov - Suche, Details, Sponsoren, Ermittler, Endpunkte und Förderfähigkeit.  |
| Klinische Genomik `clinical-genomics` | ClinGen, CIViC, Offene Ziele | 20 | Klinische Genomik-Wissensdatenbanken: ClinGen-Kurationen, klinische CIViC-Evidenz und die Open Targets Platform.  |
| Strukturen und Interaktionen · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | Strukturen und molekulare Wechselwirkungen — PDB-Strukturen, AlphaFold-Vorhersagen, EMDB-Kryo-EM-Einträge, komplexe Portalkomplexe, IntAct-Interaktionsnetzwerke.  |
| ChEMBL `chembl` | ChEMBL | 6 | Bioaktive Verbindungen, Medikamente, Targets, Bioaktivität und Mechanismen über das ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | bioRxiv/medRxiv Preprints — Suche nach Datum/Kategorie, Metadaten nach DOI, Links zu Zeitschriftenveröffentlichungen, Funder-Listen und Plattformstatistiken.  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | Drugs@FDA-Anwendungen, Etiketten und Corpus-Statistiken über openFDA.  |
| Humangenetik · `human-genetics` | GWAS Katalog, eQTL Katalog, PheWeb | 14 | Humangenetische Assoziationsnachweise — GWAS-Katalog, eQTL-Katalog und PheWeb-PheWAS-Portale (FinnGen, BioBank Japan).  |
| Ausdruck · `expression` | GTEX | 12 | Menschliche Gewebeexpression und eQTLs über das GTEx Portal.  |
| Proteinannotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | Proteindomänenarchitektur, Familien-/Clan-Mitgliedschaft, Expressionsatlas und Interaktionsnetzwerke über InterPro/Pfam, den Human Protein Atlas und STRING.  |
| Krebsmodelle · `cancer-models` | cBioPortal | 6 | Krebsgenomik-Studie Aufzeichnungen über die cBioPortal REST API.  |
| RNA · `rna` | Rfam | 9 | Nicht-kodierende RNA-Familiendaten (Metadaten, Ausrichtungen, Modelle, Strukturen) über Rfam.  |
| Omics-Archive `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 19 | Omics-Datenarchive — Ausdruck (ArrayExpress, GEO), Metabolomik (MetaboLights), Metagenomik (MGnify) und Proteomik (PRIDE).  |
| CellGuide · `cellguide` | CELLxGEN | 5 | Zelltypidentität, Markergene, Quelldatensätze und Gewebe über CELLxGENE CellGuide.  |
| Verordnung · `regulation` | ENCODE, JASPAR, UniBind | 16 | Funktionale Genomik der Genregulation — ENCODE-Experimente/Bioproben/Dateien, JASPAR-TF-Bindungsprofile und UniBind-ChIP-seq-TFBS.  |
| Forschungsressourcen · `research-resources` | Grants.gov, Antikörper-Register | 5 | Funding-Opportunity-Suche (Grants.gov) und Antikörperkatalog-Lookups (Antibody Registry).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart Attributabfragen und Identifier-Übersetzung.  |
| ZINK · `zinc` | ZINK | 5 | ZINC22-Käuflicher chemischer Raum (CartBlanche22) — Stoffsuche nach ZINC-ID, SMILES-Suche mit exakter Ähnlichkeit, Lieferantencode-Auflösung, Stichprobennahme, 3D-Strukturstellen für das Andocken.  |

## Einen Datensatz abrufen und seine Identität überprüfen {/* #retrieve-a-record-and-verify-its-identity */}

1. Öffnen Sie **Settings → Connectors**, suchen Sie die gewünschte Quelle und bestätigen Sie die Verfügbarkeit für den beabsichtigten Agenten.
2. Öffne seine Details. Lesen Sie **Tools**, Eingaben, Beispiel und Anforderungen von Drittanbietern.
3. Geben Sie ein explizites Abfrage-/Zugriffs- und Ergebnislimit an. Behalten Sie die genaue Abfrage bei der Erstellung einer Literatursammlung oder einer Beweistabelle bei.
4. Überprüfen Sie zurückgegebene IDs und Quellfelder. Ein leeres Ergebnis, ein verkürzter Batch und ein Fehler sind unterschiedliche Ergebnisse.
5. Speichern Sie die benötigten Datensätze bewusst in der Projekt-/Bibliothek. Eine Suchantwort bedeutet nicht automatisch, dass alle Papiere in die Literaturbibliothek aufgenommen oder Volltexte heruntergeladen wurden.

### Beginnen Sie mit einem bekannten Identifier {/* #start-with-one-known-identifier */}

<p className="example-label"><strong>Praxisbeispiel</strong> Lösen Sie den menschlichen TP53-Gen-Identifikator</p>

**Gene & Ontologien** aktivieren und fragen: **Verwenden Sie query_genes, um TP53 mit scopes="symbol", species="human" und fields="symbol,name,entrezgene" aufzulösen. Geben Sie die Eingabeabfrage und alle nicht übereinstimmenden Datensätze zurück.** In diesem Beispiel identifiziert der menschliche TP53-Datensatz Entrez Gene **7157** und den Namen **Tumorprotein p53**. Überprüfen Sie die `query` und `symbol` des Datensatzes, bevor Sie die abgebildete ID verwenden. Ein Symbol kann mehrere Übereinstimmungen zurückgeben, also behalten Sie alle Ergebnisse, bis Sie den beabsichtigten Organismus bestätigt und aufgezeichnet haben. [Genaue Felder](../reference/connector-operations.md#query_genes).

## Wählen Sie eine Abfrage und prüfen Sie das Ergebnis {/* #choose-a-query-and-inspect-the-result */}

<p className="example-label"><strong>Beispiel</strong> Gebundene Datenbankanfragen und Antworten</p>

In der Tabelle sind diese Beispielantworten aufgeführt; Live-Abfrage-Ergebnisse können abweichen.

| Connector / Werkzeug | Eingabe | Beobachtetes Ergebnis |
| --- | --- | --- |
| Omics Archives / geo_get_series | `accessions: ["GSE60450"]` | Metadaten für Serien/Stichproben mit 12-Stichproben; Metadaten-Retrieval hat die hochgeladenen Zählungen nicht neu berechnet. |
| Gene / query_genes | TP53; Symbolumfang; Mensch | Entrez Gene ID 7157, Symbol TP53, Name Tumorprotein p53. |
| PubMed / search_articles | GSE60450, maximal 2 | PMIDs 38059347 und 37306301. Dies sind Abfrageübereinstimmungen, nicht automatisch die ursprüngliche Veröffentlichung des Datensatzes. |
| Chemie / pubchem_search_compounds | Aspirin, höchstens 1 CID | CID 2244, Formel C9H8O4 und Molekulargewicht 180.16. |
| Literatur / openalex_search_works | `CRISPR base editing`; aus 2020; Open Access; maximal 2 | Zwei Arbeitsaufzeichnungen mit OpenAlex IDs, Quellfeldern und Vollständigkeitsflags. |

### Verbinden Sie OpenAlex und folgen Sie den Zitierlinks {/* #connect-openalex-and-follow-citation-links */}

1. Öffnen Sie **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**.
2. Geben Sie Ihren API-Schlüssel ein, wählen Sie **Validate**, dann **Save**, nachdem die Validierung erfolgreich ist.
3. Suchen Sie nach einem Thema mit einem kleinen `max_records` Limit. Überprüfen Sie `n_records_returned` und `records_truncated`, bevor Sie das Ergebnis als vollständig beschreiben.
4. Verwenden Sie eine zurückgegebene Arbeits-ID mit `openalex_get_work`. Verwenden Sie `openalex_citations` für Papiere, die diese Arbeit zitieren, und `openalex_references` für Werke, die sie zitiert. Das sind entgegengesetzte Richtungen.
5. Für Autorensuchen bestätigen Sie die Institution und ORCID, bevor Sie ein Autorenprofil abrufen. Verwenden Sie eine Quell-ID oder ISSN, um einen Journalnamen zu disambiguieren.

Siehe [Betriebsparameter von OpenAlex](../reference/connector-operations.md#openalex_search_works) für Filter und zurückgegebene Felder.

### Schauen Sie sich ein DOI und die damit verbundenen Forschungsaufzeichnungen {/* #look-up-a-doi-and-its-related-research-records */}

**Literaturgraphik** aktivieren. Verwenden Sie `crossref_get_work` für Publisher-Metadaten und `crossref_get_updates` für hinterlegte Korrektur-/Retraktionsbeziehungen. Verwenden Sie `datacite_search_records`, um Datensatz- / Software-DOIs zu finden, und dann `datacite_get_record`, um einen ausgewählten Datensatz zu inspizieren. Diese vier öffentlichen Methoden erfordern keinen OpenAlex-Schlüssel. Überprüfen Sie die DOI-Identität, die Beziehungsrichtung und die Wiederverwendung von Begriffen, bevor Sie eine Ressource herunterladen oder zitieren. Genaue Felder befinden sich im [Betriebsnummer](../reference/connector-operations.md#family-2).

Die Rfam-Sequenzsuche verwendet nun den offiziellen Batch-Endpunkt. Wenn eine ältere Installation den ausgedienten Endpunktfehler zurückgibt, aktualisieren Sie die App und wiederholen Sie den beabsichtigten Vorgang. Ein ausstehender Job ist keine abgeschlossene Suche ohne Treffer.

## Behandeln Sie einen zurückgegebenen Datensatz, ein leeres Match oder einen Fehler {/* #handle-a-returned-record-empty-match-or-error */}

Überprüfen Sie den zurückgegebenen Status, bevor Sie ein Ergebnis verwenden. Verwenden Sie [Betriebsnummer](../reference/connector-operations.md), um Felder und Vollständigkeitsflags zu interpretieren.

| Beobachtetes Ergebnis | Was als nächstes zu tun ist |
| --- | --- |
| `found: false`, Nulldatensätze, leere Ermittler oder Lieferantenübereinstimmungen | Prüfen Sie Identifikator, Organismus, Abfrageumfang und Filter. Bewahren Sie das leere Ergebnis; Legen Sie ihn nicht als abgerufenen Datensatz vor. |
| `credential_required` für OpenAlex | Öffnen Sie das angeforderte Anmeldeformular und binden Sie Ihren eigenen Schlüssel, bevor Sie es erneut versuchen. |
| `contact_email_required` für direkte NCBI-Variantenabfragen | Öffnen **Settings → Connectors → Manage credentials → Literature access**, geben Sie **Contact email** und wählen **Save**. Wiederholen Sie die fehlgeschlagene Abfrage. Ein NCBI API-Schlüssel ist optional. Überprüfen Sie zurückgegebene Identifikatoren, Übereinstimmungszahlen und Verkürzungskennzeichen; ein leeres Ergebnis unterscheidet sich von einem Verbindungsfehler. |
| HTTP `410` von eQTL | Bewahren Sie die Quell-URL, den Betrieb und die Antwort auf und überprüfen Sie die Verfügbarkeit des Dienstes, bevor Sie wissenschaftliche Eingaben ändern. |
| Connector-Anfrage nach Ablauf der Zeit `30000ms` | Wiederholen Sie eine kleinere Anfrage. Eine Erhöhung nur des äußeren Notebook-Timeouts ändert nicht die eigene Frist des Connector. |
| Notebook-Ausführung nach Ablauf der Zeit `60000ms` | Die Ausführung endete ohne Ergebnis. Einzelne Wiederholvorgänge; folgern nicht, dass jeder vorgelagerte Dienst fehlgeschlagen ist. |
| BioMart HTML Wartungsseite; PRINZ `Unexpected end of JSON input` | Die erwartete strukturierte Antwort war nicht verfügbar. Versuchen Sie es später und behalten Sie den Antworttyp / Fehler für ein Problem bei. |
| ZINC-Aufgabe nicht rechtzeitig abgeschlossen | Bewahren Sie die zurückgegebene Task / Ergebnis-URL und überprüfen Sie diesen Job; Wiederholtes Starten neuer Jobs gewinnt sein Ergebnis nicht zurück. |

Fügen Sie für einen Bericht die Operation, die begrenzte Eingabe, den Fehlertext und den Zeitstempel über [Fehlerbehebung](../guides/troubleshooting.md) hinzu. Entfernen Sie Anmeldeinformationen und private Daten vor dem Teilen.

## Beheben von ENA Runs und FASTQ Dateien {/* #ena-runs */}

1. **Omics Archives** unter **Settings → Connectors** aktivieren. Geben Sie einen öffentlichen ENA/INSDC-Beitritt an `ena_search_runs`, z. B. eine PRJ-Studie oder einen SRR-Durchlauf. Eine GEO `GSE`-Kennung muss zuerst mit ihrer INSDC-Studie verknüpft werden; Keywords werden nicht akzeptiert.
2. Untersuchen Sie `run_accession`, Organismus, Bibliotheksstrategie/Layout und `truncated`. Das Maximum ist 1,000 läuft. Es gibt kein Offset- oder Continuation-Token; den Beitritt zu verengen, wenn die Antwort verkürzt wird.
3. Übergeben Sie einen zurückgegebenen Lauf an `ena_get_run_files`. Überprüfen Sie `found`, `fastq_available` und jeden Eintrag in `fastq_files`. Das Inventar liefert URL, komprimierte Dateigröße und vorgelagerte MD5; Es werden keine Dateien heruntergeladen oder deren Inhalt überprüft.
4. Vor einem separaten Download überprüfen Sie die Speicherung und behalten das Manifest auf. Überprüfen Sie die heruntergeladenen Bytes mit der aufgeführten Prüfsumme. Eine gepaarte Bibliothek muss nicht genau zwei Dateien haben; keine Read-Mate-Identität aus `file_index` ableiten.

<p className="example-label"><strong>Praxisbeispiel</strong> Erstellen Sie ein Dateimanifest für SRR037073</p>

Dieses v0.31.1-Beispiel verwendet **Codex subscription** und das aktivierte **Omics Archives** Connector. Öffnen Sie eine Sitzung mit einer verfügbaren Notebook-Laufzeit und senden Sie dann:

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

Öffnen Sie die generierten Notizen. Die eigentliche Suche lieferte **1-Lauf**, **Caenorhabditis elegans**, Studie **PRJNA123835**, **RNA-Seq**, **SINGLE**, mit `truncated: false`. Bestätigen Sie den Organismus und das Layout, bevor Sie seine Dateien verwenden.

![ENA-Abfrageeingaben, Ausführen von Identitäts- und Vollständigkeitskennzeichen in den generierten Notizen](/img/open-science/v0311/ena-notes.webp)

Öffnen Sie den CSV und vergleichen Sie ihn mit `ena-files.json`. Dieser Lauf hat `found: true`, `fastq_available: true` und **1-Datei**, Größe **25,154,397 Bytes**. Das Manifest behält seine FTP-URL und Upstream-MD5 bei. Kopieren Sie den vollständigen Wert aus der herunterladbaren Datei, wenn eine Vorschauspalte beschnitten ist.

![Tatsächliches ENA-Manifest mit einer Datei mit URL, Größe und vorgelagerter Prüfsumme](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Abfragenotizen</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ-Manifest</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">Laufendes Verhalten</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">Dateiantwort</ExampleDownload>

Beide Abfragen und die Erstellung der Dateiliste waren erfolgreich. **In diesem Beispiel wurden keine FASTQ-Dateien heruntergeladen oder anhand einer Prüfsumme geprüft**. Der Download ist ein eigener Schritt. [Genaue Parameter](../reference/connector-operations.md#ena_search_runs)

## Durchführung und Untersuchung der Gen-Set-Anreicherung {/* #gene-set-enrichment */}

<p className="example-label"><strong>Praxisbeispiel</strong> Eine absichtlich ausgewählte menschliche DNA-Schäden-Genliste</p>

Dieses v0.31.1-Beispiel verwendet 11 öffentliche Gensymbole, um g:Profiler zu demonstrieren. Sie wurden aufgrund ihrer bekannten biologischen Rollen ausgewählt, so dass eine Anreicherung erwartet wird. Sie sind keine Differenzausdrucksergebnisse aus dem GSE60450-Projekt oder Beweise für eine unvoreingenommene Entdeckung.

1. Machen Sie in **Settings → Connectors** **Gene & Ontologien** für den Agenten verfügbar. Öffnen Sie eine Sitzung mit einem verbundenen Modell und einer verfügbaren Notebook Laufzeit.
2. Geben Sie den Organismus, die Genidentifikatoren, die Datenquellen und den statistischen Hintergrund an. Für reale experimentelle Daten ist der Hintergrund anhand von Genen zu begründen, die durch das Experiment hätten ausgewählt werden können. Dieses Tutorial verwendet explizit alle annotierten Gene, nicht ein benutzerdefiniertes Messgen-Universum.
3. Senden Sie die folgende Aufforderung. Behalten Sie die Quellversionsabfrage und den Anreicherungsaufruf in derselben Sitzung und speichern Sie ihre tatsächlichen Ergebnisse.

```text
Use Genes & Ontologies through Session Notebook for an English g:Profiler
tutorial. The deliberately selected gene list is TP53, ATM, ATR, CHEK1,
CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
First call list_enrichment_sources with organism hsapiens.
Then call enrich_gene_set with these genes, organism hsapiens,
sources GO:BP and REAC, domain_scope annotated,
correction_method fdr, and user_threshold 0.05.
Save the full response as dna-damage-enrichment.json, all returned terms
as dna-damage-enrichment.csv, and query, source versions, mappings,
background and limitations as dna-damage-enrichment-notes.md.
Retain unmapped, ambiguous and duplicate identifiers. Treat mapped_genes
as the returned mapping object. Report errors instead of inventing results.
This is not differential-expression evidence or evidence of regulation direction.
```

4. Öffnen Sie die generierten Notizen und überprüfen Sie die Abfrage- und Zuordnungszählung. Dieser Lauf kartierte **11/11**-Identifikatoren mit **0** nicht zugeordneten, mehrdeutigen oder doppelten Identifikatoren. Es aufgezeichnet **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO Klassen **2026-01-23** und Reactome Klassen **2026-03-20**. Eine spätere Serviceversion kann andere Bedingungen zurückgeben.

![Gespeicherte englische Abfrage, Hintergrund, Quellversionen und Identifikatorprüfungen](/img/open-science/v0311/enrichment-notes.webp)

5. Öffnen Sie den CSV und vergleichen Sie ihn mit dem vollständigen JSON. Dieser Lauf gab **891 Begriffe** am FDR 0.05 zurück. Die Vorschau zeigt nur die ersten 100-Zeilen; Das Anzeigelimit ist nicht die Gesamtergebniszählung. Behalten Sie `source`, `native`, korrigiert `p_value`, `intersection_size`, `query_size` und `effective_domain_size` bei der Interpretation eines Begriffs.

![Tatsächliche Anreicherungstabelle mit korrigierten Wahrscheinlichkeiten und Domänengrößen](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Analysenotizen</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">Alle 891 Ergebniszeilen</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Vollständige Antwort</ExampleDownload>

`background_size: null` bedeutet, dass keine benutzerdefinierte Hintergrundliste eingereicht wurde; Es bedeutet nicht ein statistisches Universum von null Genen. Verwenden Sie die pro-term effektive Domaingröße. Bei der Bereicherung wird keine kausale Beteiligung, kein differentieller Ausdruck oder eine Auf/Ab-Regulierung festgestellt. Siehe [Betriebsparameter](../reference/connector-operations.md#enrich_gene_set).

## Identität des Referenzgenoms bestätigen {/* #reference-genome */}

<p className="example-label"><strong>Praxisbeispiel</strong> Humanes GRCh38.p14-Chromosom 1 identifizieren</p>

1. **Genomes** in **Settings → Connectors** aktivieren. Öffnen Sie eine Sitzung mit einem verbundenen Modell und verfügbarer Notebook Laufzeit. Dieses v0.31.1-Beispiel verwendete **Codex subscription**.
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

3. Öffnen Sie die Notizen und vergleichen Sie die zurückgegebenen IDs in den drei JSON-Dateien. Alle drei Aufrufe waren in diesem Beispiel erfolgreich.

![Drei tatsächliche NCBI-Aufrufe und zurückgegebene Taxon- und Assembly-Identität](/img/open-science/v0311/ncbi-notes.webp)

| Überprüfung | Ergebnis dieses Beispiels |
| --- | --- |
| Organismus | Homo sapiens, TaxID **9606**; ein Spiel, `ambiguous: false` |
| Beantragte/laufende Montage | **GCF_000001405.40**, **GRCh38.p14**, UCSC Name **hg38** |
| Gepaarte GenBank Versammlung | **GCA_000001405.29**; Der zurückgegebene Datensatz meldet Unterschiede von RefSeq |
| Chromosom 1 Aliase | **1**, **chr1**, RefSeq **NC_000001.11**, GenBank **CM000663.2** |
| Ausgewählte Sequenz | **248956422 bp**, Primärversammlung; ein Spiel, `matches_truncated: false` |

![Ursprüngliche Chromosom-1-Antwort mit versionierten Aliase und Übereinstimmungszahl](/img/open-science/v0311/ncbi-aliases.webp)

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Abfragenotizen</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Identitätstabelle</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Taxonantwort</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Ansprechverhalten der Montage</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Sequenzantwort</ExampleDownload>

Die Abfrage wurde für **ein ausgewähltes Chromosom** abgeschlossen. Sie ist kein Export aller Sequenzen der Assembly. Bewahren Sie bei geänderten Abfragen mehrdeutige Treffer und Kürzungskennzeichen auf. Ein Assembly-Name ersetzt keine Zugangsnummer mit Versionsangabe. Eine zurückgegebene aktuelle Nummer rechtfertigt es nicht, eine angeforderte historische Version stillschweigend zu ersetzen. Sequenzaliase beschreiben Namen innerhalb einer Assembly; sie führen keine Koordinatenumrechnung zwischen Assemblies durch. [Genaue Eingaben](../reference/connector-operations.md#ncbi_get_assembly_info)

## Lesen Sie gnomAD Populationen und STRING Netzwerke {/* #string-network */}

Setzen Sie für `get_variant` `include_populations: true` nur, wenn Populationsdetails benötigt werden. Bewahren Sie den Dataset und den Referenz-Build auf. Exom- und Genombeobachtungen bleiben getrennt. Ein nicht verfügbarer Wert ist `null`, nicht Null; Überlappende Bevölkerungs- oder Geschlechtsschichten dürfen nicht summiert werden. Dies sind beobachtete Frequenzen, nicht das Filtern von Allelfrequenzen. [gnomAD-Parameter](../reference/connector-operations.md#get_variant)

Von v0.31.0 enthält `get_string_network.nodes` zurückgegebene Nachbarn und isolierte kartierte Eingaben. Eine einzelne kartierte Eingabe fordert Nachbarn an; Mehrere abgebildete Eingänge werden nicht erweitert. Filtern Sie `is_query`, um Eingabeknoten wiederherzustellen, und verwenden Sie `queries` für alle abgebildeten Aliase. `n_nodes` zählt den Graphen `n_mapped` zählt Input-Mappings. Aktualisieren Sie Skripte, die die beiden gleichgesetzt haben, bevor Sie sie wiederverwenden. [STRING-Parameter](../reference/connector-operations.md#get_string_network)

<span id="empty-partial-and-failed-responses" />

## Suche nach Betriebsparametern {/* #find-operation-parameters */}

Verwenden Sie den [Connector Betriebsnummer](../reference/connector-operations.md) für erforderliche Felder, akzeptierte Werte und genaue Aufrufe. Wählen Sie hier zuerst eine Quelle; die Referenz bei der Vorbereitung eines bestimmten Vorgangs verwenden.

Halten Sie Genomaufbau, Organismus, Gewebe, Einheiten und Beitrittsversionen mit zurückgegebenen Daten. Für allgemeine HTTP-Bedeutungen und Wiederherstellung verwenden Sie [Fehlerbehebung](../guides/troubleshooting.md). Datenbankeinträge, Vorhersagen und generierte Zusammenfassungen sind unterschiedliche Arten von Beweisen; Überprüfen Sie die zitierte Quelle, bevor Sie einen Forschungsanspruch verwenden.


Bezugsnummer der Durchführung: [SteckverbinderPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx).

Katalogquelle: [catalog.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/catalog.ts), [registry.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/registry.ts).
