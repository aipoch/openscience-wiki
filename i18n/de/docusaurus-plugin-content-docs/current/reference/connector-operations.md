---
title: "Connector Betriebsnummer"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connector Betriebsnummer {/* #connector-operation-reference */}

Suchen Sie nach genauen Operationsnamen, erforderlichen Feldern, Standardwerten und Beispielaufrufen. Um eine Datenquelle auszuwählen, beginnen Sie mit dem [Datenbankkatalog](../tools/databases.md). Erweitern Sie die Connector-Familie, die Sie anrufen möchten; Verfügbarkeit und Anmeldeinformationen müssen separat konfiguriert werden.

## Wobei die Beispielaufrufe ausgeführt werden {/* #where-the-example-calls-run */}

Das `host`-Objekt wird von der Agentenausführungsumgebung von Open-Science bereitgestellt. Das unten stehende JavaScript ist ein **agentenseitiges Callfragment**, kein eigenständiges Node.js-Programm und keine Methode für den öffentlichen Task SDK-Client. Bitten Sie den Agenten, die entsprechenden Connector-Anweisungen zu laden und den Matching-Vorgang zu verwenden. Ein Framework kann eine Python-Bridge anstelle dieses JavaScript-Formulars freilegen.

Aktivieren Sie zunächst den Connector in [Einstellungen → Connectors](../guides/connectors.md), konfigurieren Sie einen beliebigen [Erforderliche Nachweise](../tools/credentials.md) und gewähren Sie gegebenenfalls Zugriff auf den ausgewählten Specialist. Der anruf folgt immer noch der erlaubnisrichtlinie des gesprächs. Public Node.js-Integrationen können Connector-Einstellungen mit dem [Aufgabe SDK](api.md) verwalten, können diese `host` jedoch nicht erhalten, indem sie diesen Client importieren.

### Lesen Sie ein Ergebnis, bevor Sie Anrufe verketten {/* #read-a-result-before-chaining-calls */}

<p className="example-label"><strong>Beispiel</strong> Zurückgegebene PubMed-IDs an eine Metadaten-Suche weitergeben</p>

Fragen Sie beispielsweise: **Verwenden Sie PubMed, um nach PRISMA-Berichtsrichtlinien zu suchen; Geben Sie die Gesamtzahl der Übereinstimmungen und fünf PMIDs zurück.** Die Operation `search_articles` gibt eine Gesamtsumme und eine Seite mit Bezeichnern zurück. Füttern Sie die zurückgegebenen PMIDs mit `get_article_metadata`, um Titel, Autoren und DOI-Links zu erhalten. Eine leere Seite, ein verkürztes Ergebnis und ein Authentifizierungsfehler erfordern eine andere Handhabung.

| Rücksendeinformationen | Verwenden Sie es für |
| --- | --- |
| Gesamtzahl der Übereinstimmungen und zurückgegebene Reihen | Unterscheiden Sie eine kleine Seite vom kompletten Ergebnisset |
| `truncated`, `records_truncated` oder familienspezifische Vollständigkeitsflaggen | Entscheiden Sie, ob Sie die Abfrage eingrenzen oder den Rest abrufen möchten |
| `not_found`, `missing`, `not_processed` | Identifizieren Sie ungelöste Eingaben und wiederholen Sie nur geeignete Elemente |
| DOI, Accession, Source URL und Release/Build | Behalten Sie die Identität und Quelle, die für nachfolgende Abfragen benötigt werden |
| Volltext-Status oder Lizenz-Note | Entscheiden Sie, ob Text abgerufen wurde und wiederverwendet werden kann |

Die Namen der Rückgabefelder unterscheiden sich je nach Operation. Die folgenden Beschreibungen und herunterladbaren Schemata geben jeden Vertrag an; Die Tabelle ist keine universelle JSON-Antwort. Verwenden Sie die rechte Familienliste, um zu springen, und erweitern Sie dann die Parameter dieser Familie. Die Suche nach einem Operationsnamen öffnet auch die enthaltende Gruppe.

**Lesen Sie Fehler getrennt von leeren Ergebnissen.** In v0.30.2 fordert CellGuide-Marker/Quelle/Gewebe Oberflächenabruffehler an, anstatt sie als leere Beweise zu behandeln; eine fehlende optionale Datendatei kann noch leer sein. OLS-Beziehungsabfragen lehnen unvollständige Paginierung und ungültige Antworten ab. Ein Dienstfehler ist kein Beweis dafür, dass ein Zellentyp keine Marker oder ein Ontologie-Begriff keine verwandten Begriffe hat.

## Betriebsinputs {/* #operation-inputs */}

Erweitern Sie einen Connector auf einmal. Erforderliche Felder sind mit **erforderlich** gekennzeichnet; Diese Referenz und Download verwenden Sie das Open-Science **v0.31.1** Schema. Eine verschachtelte `input.required`-Liste ist maßgebend; eine ältere `required`-Liste der obersten Ebene möglicherweise fehlt. Konsultieren Sie den <ExampleDownload path="/examples/capabilities/connector-catalog-v0.31.1.json">vollständiges herunterladbares Register</ExampleDownload> für verschachtelte JSON-Schemata, vollständige Rückgabebeschreibungen und agentenseitige Anrufbeispiele. Übergeben Sie kein generisches `id`, wenn ein Tool `accessions`, `cids`, `rs_id` oder ein anderes Namespace-spezifisches Feld erwartet.


## Chemie {/* #family-1 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `pubchem_search_compounds` {/* #pubchem_search_compounds */}

Lösen Sie einen chemischen Identifikator (Name, SMILES, InChIKey oder CID) in PubChem CIDs, optional mit den berechneten Kerneigenschaften für die Top-Treffer.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `namespace` | Zeichenfolge | fakultativ; Standard: "name"; enum: &#91;"name", "smiles", "inchikey", "cid"&#93; |
| `max_cids` | Ganzzahl | fakultativ; Standard: 25; mindestens: 1; höchstens: 100 |
| `with_properties` | boolescher Wert | fakultativ; Standard: true |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds` {/* #pubchem_get_compounds */}

Vollständige Computed-Property-Records für eine Charge von PubChem CIDs, mit optionalen gedeckelten Synonymlisten.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `cids` | Array aus Ganzzahlen | **erforderlich**; minItems: 1; maxItems: 50 |
| `include_synonyms` | boolescher Wert | fakultativ; Standard: falsch |
| `max_synonyms` | Ganzzahl | fakultativ; Standard: 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search` {/* #pubchem_similarity_search */}

2D Tanimoto Ähnlichkeitssuche über alle PubChem für eine Abfrage SMILES (synchrone fastsimilarity_2d Route, keine Job Polling).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `smiles` | Zeichenfolge | **erforderlich** |
| `threshold` | Ganzzahl | fakultativ; Standard: 90; mindestens: 1; höchstens: 100 |
| `max_records` | Ganzzahl | fakultativ; Standard: 50; mindestens: 1; höchstens: 200 |
| `with_properties` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary` {/* #pubchem_get_bioassay_summary */}

Zusammenfassung der Bioassay-Aktivität für eine PubChem-Verbindung - welche Assays testeten sie, gegen welche Ziele, mit welchem Ergebnis und welcher Potenz.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `cid` | Ganzzahl | **erforderlich** |
| `active_only` | boolescher Wert | fakultativ; Standard: falsch |
| `max_rows` | Ganzzahl | fakultativ; Standard: 100; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety` {/* #pubchem_get_safety */}

GHS-Sicherheitseinstufung für eine PubChem-Verbindung (PUG-View 'GHS Classification') Überschrift), aggregiert über alle Berichtsquellen hinweg.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `cid` | Ganzzahl | **erforderlich** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search` {/* #chebi_search */}

Volltextsuche über ChEBI-Entitäten (Namen, Synonyme, Formeln, InChIKeys).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `term` | Zeichenfolge | **erforderlich** |
| `max_results` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 100 |
| `page` | Ganzzahl | fakultativ; Standard: 1; mindestens: 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity` {/* #chebi_get_entity */}

Vollständiger ChEBI-Entitätsdatensatz: Namen, Struktur, chemische Daten, Rollen und Querverweise.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `chebi_id` | Zeichenfolge | **erforderlich** |
| `max_synonyms` | Ganzzahl | fakultativ; Standard: 30 |
| `max_xrefs` | Ganzzahl | fakultativ; Standard: 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology` {/* #chebi_get_ontology */}

Ontologie-Beziehungen einer ChEBI-Entität - was sie IST (ausgehend: ist eine / hat eine Rolle / konjugierte Säure ...) und was darauf hindeutet (einkommend: Kinder / Derivate).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `chebi_id` | Zeichenfolge | **erforderlich** |
| `relation_type` | Zeichenfolge | fakultativ |
| `max_relations` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions` {/* #rhea_search_reactions */}

Rhea-Masterreaktionen nach Gleichungstext, Teilnehmer-ChEBI-ID oder EC-Nummer (Abfragetyp automatisch erkannt) durchsuchen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `limit` | Ganzzahl | fakultativ; Standard: 50; mindestens: 1; höchstens: 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction` {/* #rhea_get_reaction */}

Vollständige Aufzeichnung für eine Rhea-Reaktion: Gleichung, Teilnehmer mit ChEBI-IDs und Stöchiometrie, EC-Verbindungen, Richtungsfamilie und Literatur.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `rhea_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target` {/* #bindingdb_ligands_by_target */}

Gemessene Bindungsaffinitäten (Ki/Kd/IC50/EC50) aller BindingDB-Liganden gegen ein Proteintarget, durch UniProt-Anpassung.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `uniprot` | Zeichenfolge | **erforderlich** |
| `affinity_cutoff_nm` | Zahl | fakultativ; Standard: 10000 |
| `max_rows` | Ganzzahl | fakultativ; Standard: 100; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound` {/* #bindingdb_targets_by_compound */}

Protein-Targets mit gemessenen Affinitäten für Verbindungen 2D-ähnlich einer Abfrage SMILES — "Was bindet dieses Molekül (oder seine nahen Analoga)?".

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `smiles` | Zeichenfolge | **erforderlich** |
| `similarity` | Zahl | fakultativ; Standard: 0.85; mindestens: 0.5; höchstens: 1 |
| `max_rows` | Ganzzahl | fakultativ; Standard: 100; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## Literaturgraphik {/* #family-2 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `openalex_search_works` {/* #openalex_search_works */}

Suche OpenAlex wissenschaftliche Arbeiten (alle Disziplinen, ~250M Datensätze) mit Jahr / Typ / OA / Ort Filter. Args: Abfrage (freier Text über title+abstract+fulltext); fakultativ, wenn ein Filter gesetzt ist), year_from, year_to (einschließlich Jahre), work_type (Artikel/Review/Preprint/Buchkapitel/Dataset/Dissertation), open_access_only, Ort (S-id, openalex.org URL, ISSN oder ein einfacher Name, der auf den Top-Quellen-Hit aufgelöst wurde — in venue_resolved aufgetaucht; eine genaue ID übergeben, um die Auflösung zu überspringen), sortieren (Relevanzstandard / cited_by_count / publication_date), max_records (Standard 50, Hard-Charge 500); Seiten von 200), include_abstracts (rekonstruiert aus dem invertierten Index, aber NUR für verifizierte offene Lizenzen — cc-by/cc-by-sa/cc0/public-domain; andere erhalten abstract=null + abstract_policy Note + abstract_license; Bulk hinzufügt. Gibt &#123;query, Filters, sort, api_total, n_records_returned, records_truncated, records&#125; zurück; Jeder Datensatz ist die Lean-Arbeitsform (openalex_id, doi, pmid, title, publication_year/date, type, language, is_retracted, authors&#91;...&#93;, source&#123;...&#125;, biblio, cited_by_count, fwci, referenced_works_count, open_access&#123;...&#125;, best_oa_pdf_url, primary_topic, keywords).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | fakultativ |
| `year_from` | Ganzzahl | fakultativ |
| `year_to` | Ganzzahl | fakultativ |
| `work_type` | Zeichenfolge | fakultativ |
| `open_access_only` | boolescher Wert | fakultativ |
| `venue` | Zeichenfolge | fakultativ |
| `sort` | Zeichenfolge | fakultativ; Standard: "relevance"; enum: &#91;"relevanz", "cited_by_count", "publication_date"&#93; |
| `max_records` | Ganzzahl | fakultativ; Standard: 50 |
| `include_abstracts` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work` {/* #openalex_get_work */}

Holen Sie eine OpenAlex-Arbeit vollständig ab - Metadaten, abstrakt (rekonstruiert aus dem invertierten Index, lizenziert wie in openalex_search_works), OA-Standorte, referenced_works (ausgehende W-ids - Hydrat mit openalex_references) und counts_by_year. Args: work_id (W-id, openalex.org URL, bare DOI oder doi.org URL). DOI-Lookups werden über den Claimant-Filter aufgelöst; Wenn sich mehrere Werke ein DOI teilen, wird das am häufigsten zitierte ausgewählt und doi_claimants + doi_resolution_note sind enthalten. Erhebt nicht gefunden für unbekannte IDs / DOIs.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `work_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations` {/* #openalex_citations */}

Listen Sie Werke auf, die ein bestimmtes Werk CITE (eingehende Zitate) über den OpenAlex's-Zitatgraphen. Args: work_id (W-id/URL/DOI — DOIs kosten eine zusätzliche Auflösungsanforderung), Sortieren (cited_by_count Standard / publication_date / Relevanz), max_records (Standard 50, Decke 500), include_abstracts. Gibt &#123;work_id, api_total (die wahre Zitierwerkzahl), n_records_returned, records_truncated, records&#125; zurück (Lean Work Records).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `work_id` | Zeichenfolge | **erforderlich** |
| `sort` | Zeichenfolge | fakultativ; Standard: "cited_by_count"; enum: &#91;"cited_by_count", "publication_date", "relevanz"&#93; |
| `max_records` | Ganzzahl | fakultativ; Standard: 50 |
| `include_abstracts` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references` {/* #openalex_references */}

Listen Sie die Werke eines bestimmten Werkes CITES (ausgehende Referenzen) auf, die in der Reihenfolge der Referenzlisten zu vollständigen Metadaten hydratisiert sind. Args: work_id (W-id/URL/DOI), max_records (Standard 100, Decke 500); Hydratation batched 50/request. Gibt &#123;work_id, n_references, n_records_returned, records_truncated, references_not_hydrated (IDs OpenAlex hat keinen Rekord für - niemals stillschweigend fallen gelassen), reference_ids (ALLe ausgehende W-ids), records&#125; zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `work_id` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors` {/* #openalex_search_authors */}

Durchsuchen Sie OpenAlex Autorenprofile nach Namen. Args: Query (Matches anzeigen Name + Alternativen); erwarten Homonyme — check affiliations/topics/ORCID), max_records (Standard 25, Decke 500). Returns &#123;query, api_total, n_records_returned, records_truncated, records&#125;; jeder Datensatz &#123;author_id, Name, Orcid, works_count, cited_by_count, h_index, i10_index, Zugehörigkeiten&#91;&#123;institution, Jahre&#125;&#93;, last_known_institutions, top_topics&#125;. Verwenden Sie author_id mit openalex_get_author.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author` {/* #openalex_get_author */}

Holen Sie sich ein OpenAlex-Autorenprofil und ihre top-zitierten Werke. Args: author_id (A-id, openalex.org URL oder ORCID); CAVEAT: Der ORCID-Pointer von OpenAlex' kann in ein spärliches Duplikat aufgelöst werden - bevorzugen Sie die A-ID von openalex_search_authors, works_sample (Standard 10, max 200); 0 überspringt die zusätzliche Anfrage. Gibt den Autorendatensatz plus counts_by_year, top_works_total (echte Gesamtwerkszahl) und top_works (lean work records by citations) zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `author_id` | Zeichenfolge | **erforderlich** |
| `works_sample` | Ganzzahl | fakultativ; Standard: 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info` {/* #openalex_venue_info */}

Schauen Sie sich Zeitschriften / Repositories ('sources') in OpenAlex an - OA-Status, DOAJ-Auflistung, APC, Zitiermetriken. Args: Veranstaltungsort (genaue S-ID, openalex.org URL oder ISSN für einen einzelnen Datensatz); alles andere ist eine Namenssuche), max_records (Standard 10, Decke 500; Nur Namenssuche. Retouren: genau -> ein Quelldatensatz + counts_by_year; Namenssuche -> &#123;query, api_total, n_records_returned, records_truncated, records&#125;. Quelldatensatz: &#123;source_id, display_name, Typ, issn_l, issn, host_organization, country_code, homepage_url, is_oa, is_in_doaj, is_core, apc_usd, works_count, cited_by_count, h_index, two_year_mean_citedness, first/last_publication_year, top_topics&#125;.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `venue` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search` {/* #arxiv_search */}

Suchen Sie arXiv Preprints (Physik, Mathematik, CS, Statistiken, q-bio, ...) über das offizielle Atom API. Args: Query (arXiv Query String); Einfachbegriffe suchen alle Felder, Feldpräfixe ti:/au:/abs: und booleans AND/OR/ANDNOT Arbeit; optional, wenn Kategorie oder ein Datumsbereich festgelegt ist), Kategorie (arXiv-Code AND-ed in, z.B. q-bio.GN, cs.LG, stat.ML), date_from / date_to (Einreichungsdatum YYYY-MM-DD, einschließlich), Start (0-basierter Paging-Offset); die API-Paces ~3s zwischen Anfragen — Seite höflich), max_results (Standard 25, max 100 pro Anruf), sort_by (Relevanzstandard / submittedDate / lastUpdatedDate), sort_order (absteigender Standard / aufsteigend). Gibt &#123;search_query zurück (die genaue gesendete Abfrage), api_total (arXiv's Gesamtübereinstimmungszahl), start_index, n_records_returned, records_truncated, sort_by, sort_order, records&#125;; jeder Datensatz &#123;arxiv_id, Version, id_versioned, Titel, Abstract, Autoren, veröffentlicht, aktualisiert, primary_category, Kategorien, doi, journal_ref, Kommentar, abs_url, pdf_url&#125;. doi/journal_ref erst nach Veröffentlichung der Zeitschrift erscheinen. Fehlgeformte Abfragen verursachen einen Fehler (arXiv's HTTP-200 Fehlerfeed wird erkannt und niemals als Daten zurückgegeben).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | fakultativ |
| `category` | Zeichenfolge | fakultativ |
| `date_from` | Zeichenfolge | fakultativ |
| `date_to` | Zeichenfolge | fakultativ |
| `start` | Ganzzahl | fakultativ; Standard: 0 |
| `max_results` | Ganzzahl | fakultativ; Standard: 25 |
| `sort_by` | Zeichenfolge | fakultativ; Standard: "relevance"; enum: &#91;"relevance", "submittedDate", "lastUpdatedDate"&#93; |
| `sort_order` | Zeichenfolge | fakultativ; Standard: "descending"; &#91;"descending", "ascending"&#93; |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers` {/* #arxiv_get_papers */}

Batch-fetch arXiv Papiermetadaten (incl.) Abstracts) nach ID - eine temporierte Anfrage für bis zu 100-Papiere. Args: arxiv_ids (bis zu 100-IDs in jeder gängigen Form — 2103.14030, versioniert 2103.14030v2, altmodische q-bio/0601001, arXiv:-prefixed oder abs/pdf URLs); unversionierte IDs auf die neueste Version auflösen. Gibt &#123;n_requested, n_found, Duplikate (Eingaben, die auf ein bereits zurückgegebenes Papier aufgelöst wurden), not_found (unbekannte UND fehlerhafte IDs — arXiv überspringt stillschweigend Unbekannte und weist ganze Chargen gegenüber fehlerhaften zurück); dieses Tool tut auch nicht), records&#125; - Datensätze in der gewünschten Reihenfolge, die gleiche Form wie arxiv_search-Datensätze. Zurückgezogene Papiere geben immer noch Metadaten zurück (siehe Kommentar für Rückzugsnotizen).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `arxiv_ids` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work` {/* #crossref_get_work */}

Abrufen von von Publishern hinterlegten Metadaten für ein Crossref DOI. Ein bloßes DOI, doi: Präfix oder doi.org URL wird akzeptiert. Es ist kein API-Schlüssel erforderlich. Wenn das DOI zu einer anderen Registrierungsagentur gehört, nutzen Sie den Matching-Service; Ein Crossref 404 beweist nicht, dass der DOI ungültig ist. Überprüfen Sie die zurückgegebene DOI, Titel und source_url.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `doi` | Zeichenfolge | **erforderlich**; minLänge: 1; maxLänge: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates` {/* #crossref_get_updates */}

Lesen Sie hinterlegte Korrektur-, Retraktions- und andere Aktualisierungsbeziehungen. updated_by weist auf Mitteilungen hin, die diese Arbeit aktualisieren; update_to zeigt auf Werke, die von diesem DOI aktualisiert wurden. Bewahren Sie die Beziehungsrichtung und die Quelletiketten auf. Leere Arrays stellen keine Zuverlässigkeit her oder beweisen, dass keine Rücknahme vorhanden ist.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `doi` | Zeichenfolge | **erforderlich**; minLänge: 1; maxLänge: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records` {/* #datacite_search_records */}

Durchsuchen Sie öffentliche DataCite Datensatz / Software DOI Metadaten. Lieferanfrage, related_doi oder beides; Die Abfrage verwendet DataCite Abfragesyntax. Behalten Sie die gleichen Filter und page_size bei, wenn Sie next_page folgen. Page-number retrieval ist auf die ersten 10,000-Records beschränkt: Verengen Sie die Abfrage, falls erforderlich. Überprüfen Sie related_identifiers, Rechte und Landungs-URLs; Metadaten garantieren keine herunterladbaren Daten oder Wiederverwendungsberechtigungen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | fakultativ; minLänge: 1; maxLänge: 2000 |
| `related_doi` | Zeichenfolge | fakultativ; minLänge: 1; maxLänge: 2048 |
| `resource_type` | Zeichenfolge | fakultativ; Standard: "dataset"; enum: &#91;"dataset", "software"&#93; |
| `page_size` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 100 |
| `page` | Ganzzahl | fakultativ; Standard: 1; mindestens: 1; höchstens: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record` {/* #datacite_get_record */}

Abrufen eines öffentlichen DataCite DOI-Datensatzes, einschließlich Titel, Ersteller, Ressourcentyp, Rechte, verwandte Identifikatoren und verfügbare Version. Akzeptiert eine bloße DOI, doi: prefix oder doi.org URL. Überprüfen Sie die Kennung und die Beziehungsrichtung, bevor Sie einen verknüpften Datensatz oder ein Softwarepaket verwenden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `doi` | Zeichenfolge | **erforderlich**; minLänge: 1; maxLänge: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## PubMed {/* #family-3 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `search_articles` {/* #search_articles */}

Suche PubMed (biomedizinische &) Biowissenschaften Literatur über NCBI esearch für Artikel, die einer Abfrage entsprechen. Gibt die Gesamtzahl der Übereinstimmungen plus eine Seite von PMIDs zurück. Unterstützt PubMed-Feld-Tags (&#91;Titel&#93;, &#91;Autor&#93;, &#91;Journal&#93;, &#91;MeSH-Begriffe&#93;, ...), Boolesche Operatoren, Datumsfilterung und Sortierung. PubMed indiziert keine Physik / CS / Mathematik / reine Chemiepapiere.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `max_results` | Ganzzahl | fakultativ; Standard: 20 |
| `retstart` | Ganzzahl | fakultativ; Standard: 0 |
| `sort` | Zeichenfolge | fakultativ; enum: &#91;"relevanz", "pub_date", "author", "journal_name", "title"&#93; |
| `date_from` | Zeichenfolge | fakultativ |
| `date_to` | Zeichenfolge | fakultativ |
| `datetype` | Zeichenfolge | fakultativ; Standard: "pdat"; enum: &#91;"pdat", "edat", "mdat"&#93; |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata` {/* #get_article_metadata */}

Holen Sie sich detaillierte Artikel-Metadaten aus PubMed von PMID (bulk, via efetch): Identifikatoren (pmid/pmc/doi), Titel, Abstract, Journal, Autoren mit Zugehörigkeit, Veröffentlichungsdatum, MeSH-Begriffe, Artikeltypen, Sprache und Zitation. Zitieren Sie bei jeder Verwendung PubMed und fügen Sie den zurückgegebenen Artikel DOIs (identifiers.doi) als Links hinzu.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **erforderlich** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles` {/* #find_related_articles */}

Finden Sie verwandte PubMed-Inhalte für eine oder mehrere Quellen PMIDs über NCBI elink. `pubmed_pubmed` (Standard) gibt ähnliche Artikel zurück, die nach wortgewichteten Ähnlichkeiten von Titeln / Abstracts / MeSH (NICHT Zitate) eingestuft werden; `pubmed_pmc` gibt Volltext-PMC-Links zurück; `pubmed_gene`/`pubmed_protein`/`pubmed_nucleotide` geben verknüpfte Sequenz-/Gendatensätze zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **erforderlich** |
| `link_type` | Zeichenfolge | fakultativ; Standard: "pubmed_pubmed"; enum: &#91;"pubmed_pubmed", "pubmed_pmc", "pubmed_nucleotide", "pubmed_protein", "pubmed_gene"&#93; |
| `max_results` | Ganzzahl | fakultativ |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation` {/* #lookup_article_by_citation */}

Beheben Sie bibliographische Zitate zu PMIDs über NCBI ecitmatch. Jedes Zitat liefert einen Teil von &#123;journal, year, volume, first_page, author, key&#125;; 2-3+ Felder für zuverlässiges Matching bereitstellen. Verwenden Sie, wenn Sie eine Referenzliste haben und PMIDs benötigen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `citations` | Array aus Objekten | **erforderlich** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids` {/* #convert_article_ids */}

Konvertieren zwischen PMID, PMCID und DOI über den NCBI/PMC ID-Konverter. Homogene Eingabe-IDs pro Aufruf (`id_type` auf Übereinstimmung setzen). Häufig verwendet, um zu überprüfen, ob ein PMID eine PMCID hat (d.h. Volltext in PMC) vor dem Aufruf von get_full_text_article.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `ids` | ['string', 'array'] | **erforderlich** |
| `id_type` | Zeichenfolge | fakultativ; Standard: "pmid"; enum: &#91;"pmid", "pmcid", "doi"&#93; |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article` {/* #get_full_text_article */}

Abrufen von Open-Access-Volltext von PubMed Central über Europa PMC von PMC ID ("PMC12345") oder " 12345". Gibt strukturierten Abschnittstext plus Lizenz zurück; Wenn Volltext nicht verfügbar ist, wird der Grund explizit gemeldet (fulltext_status). Nur OA-Untergruppenartikel haben abrufbaren Volltext. Zitieren Sie bei jeder Verwendung PubMed und fügen Sie den zurückgegebenen Artikel DOIs als Links hinzu.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pmc_ids` | ['string', 'array'] | **erforderlich** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status` {/* #get_copyright_status */}

Melden Sie Copyright und Lizenzstatus nach PMID durch die Kombination von PubMed CopyrightInformation, dem PMC ID Converter (PMID ->) PMCID/DOI) und die PMC &lt;permissions> Block (Lizenztyp, ALI-Lizenz-URL, Copyright-Erklärung/Jahr). Überprüfen Sie die Open-Access-Wiederverwendungsrechte, bevor Sie Inhalte reproduzieren.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **erforderlich** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## Gene & Ontologien {/* #family-4 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `query_genes` {/* #query_genes */}

Lösen Sie Gen-Identifikatoren / Symbole über mygene.info (batchiert, bis zu 1000-Begriffen / Anfrage). Verwenden Sie dies, um Gensymbole Ensembl-Gen-IDs, Entrez-IDs, Namen und anderen mygene.info-Feldern zuzuordnen - oder umgekehrt (`scopes` auf den Namensraum Ihrer Eingabebegriffe setzen, z.B.) "entrezgene", "ensembl.gene", "symbol,alias". Args: Terme (Query Terme, z.B. &#91;"TP53","BRCA1"&#93;; Begriffe, die Kommas enthalten, werden nicht unterstützt; Scopes (kommagetrennte Identifikator-Namespaces, um Begriffe mit einander abzugleichen); Felder (kommagetrennte Mygenfelder, um zurückzukehren, oder "all"); Art (gebräuchliche Bezeichnung "human"/"mouse") oder NCBI taxid. Gibt &#123;n_input, n_records, not_found, records&#125; zurück. Ein Begriff, der mit mehreren Genen übereinstimmt, liefert mehrere Datensätze (jeder trägt seinen `query`). Datensätze sind deterministisch geordnet (Eingabereihenfolge, dann _id).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `terms` | Array aus Zeichenfolgen | **erforderlich** |
| `scopes` | Zeichenfolge | fakultativ |
| `fields` | Zeichenfolge | fakultativ; Standard: "symbol,name,taxid,entrezgene,ensembl.gene" |
| `species` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies` {/* #list_ontologies */}

Liste Ontologien im EBI Ontology Lookup Service (OLS4). Mit `ontology_ids` (z.B.) &#91;"efo","cl","chebi","go","mondo"&#93;: strukturierte Metadatensätze für genau diese Ontologien abrufen; unbekannte IDs werden in `not_found` gemeldet. Ohne: den kompletten OLS4-Katalog (~250-Ontologien, vollständig paginiert und gezählt). &#123;records:&#91;&#123;ontology_id, Titel, Version, Status, num_terms, ...&#125;&#93;, not_found:&#91;...&#93;&#125; für eine ID-Liste oder &#123;-Records:&#91;...&#93;, total_elements, complete&#125; für den vollständigen Katalog.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `ontology_ids` | Array aus Zeichenfolgen | fakultativ |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms` {/* #search_ontology_terms */}

Suchen Sie Ontologiebegriffe nach Label/Synonym für eine oder mehrere OLS4-Ontologien. Typische Verwendungen: Finden Sie eine EFO-ID für einen Krankheitsnamen (Ontologien = &#91;"efo"&#93;), Cell Ontology-Begriffe für einen Zelltyp (&#91;"cl"&#93;), ChEBI-Begriffe für eine Chemikalie (&#91;"chebi"&#93;), GO-Begriffe nach Namen (&#91;"go"&#93;) - oder suchen Sie alle Ontologien auf einmal. Args: Abfrage (Begriff Label, Synonym oder Identifikator); Ontologien (Kleinbuchstaben-IDs, auf die beschränkt werden soll); Niemand sucht jede Ontologie; exakt (Vollsaitenübereinstimmung); include_obsolete (standardmäßig falsch); max_results (Ranking nach OLS-Relevanz). Gibt &#123;query, total_found, n_returned, abgeschnitten, terms:&#91;&#123;curie, iri, label, short_form, ontology, description, type, is_defining_ontology&#125;&#93;&#125; zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `ontologies` | Array aus Zeichenfolgen | fakultativ |
| `exact` | boolescher Wert | fakultativ; Standard: falsch |
| `include_obsolete` | boolescher Wert | fakultativ; Standard: falsch |
| `max_results` | Ganzzahl | fakultativ; Standard: 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term` {/* #get_ontology_term */}

Holen Sie sich eine Ontologie term's Details, oder seine vollständige verwandte Begriff Satz. Mit `relation=None`: Full Term Record (Label, Synonyme, Beschreibung, veraltetes Flag, direkte Eltern). Mit einer Relation: der VOLLSTÄNDIGE, vollständig in fortlaufender Reihenfolge fortlaufende Satz verwandter Begriffe — z.B. relation="hierarchicalChildren" für direkte Kinder inkl. part_of usw., "descendants"/"hierarchicalDescendants" für den gesamten Unterbaum "ancestors"/"hierarchicalAncestors", "parents", "children". Der Abruf wird mit der eigenen Gesamtsumme von API' gezählt. Args: Ontologie (Kleinbuchstaben, z.B. "efo","gehen","cl","Chebi"; term_id (CURIE "EFO:0000305"/"GO:0006281") oder vollständige IRI; Beziehung (keine oder eine der aufgeführten); include_parents (enthalten direkte Eltern-Refs, wenn die Beziehung keine ist). Returns: relation=None &#123;curie, iri, label, ontology, short_form, synonyms, description, is_obsolete, has_children, parents&#125;; ansonsten &#123;root, relation, total_elements, term_count, Terms:&#91;...&#93;&#125;.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `ontology` | Zeichenfolge | **erforderlich** |
| `term_id` | Zeichenfolge | **erforderlich** |
| `relation` | Zeichenfolge | fakultativ; enum: &#91;"parents", "children", "ancestors", "descendants", "hierarchicalParents", "hierarchicalChildren", "hierarchicalAncestors", "hierarchicalDescendants"&#93; |
| `include_parents` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations` {/* #get_go_annotations */}

Abrufen von GO-Annotationen für ein UniProt-Genprodukt von QuickGO (vollständig, gezählt). Args: uniprot_accession (z. "P04637", Präfix optional; Aspekt (für alle Aspekte weglassen oder einen von biological_process/molecular_function/cellular_component); Nachweis (None/all, ein voreingestellter "experimental_manual" = manuell zugewiesener experimenteller Nachweis, "automatic_iea" = electronic/IEA, oder ein expliziter ECO-Code wie "ECO:0000314"; Drei-Buchstaben-GO-Beweiscodes wie IDA / IEA werden NICHT akzeptiert - QuickGO ignoriert stillschweigend goEvidence, Filter müssen ECO-Codes verwenden; taxon_id (optionales NCBI-Taxon, z.B.) 9606); include_term_names (hydratisieren Sie jeden Datensatz mit GO Begriffsname / Aspekt / veraltet über eine Batch-Ontologie-Lookup); max_records (Kappe auf Aufzeichnungen); vollständiges noch abgerufenes und zusammengefasstes Set; `truncated` markiert die Kappe. Gibt &#123;gene_product, total_annotations, n_records, complete, abgeschnitten, distinct_go_ids (über ALLE Anmerkungen), records:&#91;&#123;go_id, go_aspect, qualifier, go_evidence, eco_id, reference, assigned_by, date, ...&#125;&#93;&#125; zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `uniprot_accession` | Zeichenfolge | **erforderlich** |
| `aspect` | Zeichenfolge | fakultativ; enum: &#91;"biological_process", "molecular_function", "cellular_component"&#93; |
| `evidence` | Zeichenfolge | fakultativ |
| `taxon_id` | Ganzzahl | fakultativ |
| `include_term_names` | boolescher Wert | fakultativ; Standard: falsch |
| `max_records` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `get_uniprot_entries` {/* #get_uniprot_entries */}

Fetch UniProtKB speichert eine Liste von primären oder sekundären Beitritten (Batch-ODER-Abfragen zuerst); Ungelöste Aliase verwenden ein direktes Per-Accession-Fallback. Drei Modi: `fields` gegeben → token-lean tabellarisches Abrufen gerade jener UniProt-Felder (z.B. &#91;"Zugang","id","protein_name","gene_names","organism_name","Länge","Sequenz"&#93;; `format` wird ignoriert. format="fasta" → per-accession FASTA Sequenzen. format="txt" → per-accession full UniProt flat-file text (komplette Annotation); kann sehr groß sein - bevorzugen Sie `fields`). Args: Accession (z.B. &#91;"P04637","P38398"&#93;; Format ("fasta"/"txt", ignoriert, wenn `fields` gegeben); Felder (optional UniProt REST-Feldnamen für den Tabellenmodus). Returns: Felder Modus &#123;accessions, Felder, n_records, records:&#91;&#123;&lt;column>:value&#125;&#93;&#125;; fasta/txt-Modus &#123;accessions, Format, n_found, missing, records:&#123;accession:text&#125;&#125; — `missing` listet die Beitritte auf, für die UniProt keinen Datensatz zurückgegeben hat.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accessions` | Array aus Zeichenfolgen | **erforderlich** |
| `format` | Zeichenfolge | fakultativ; enum: &#91;"fasta", "txt"&#93; |
| `fields` | Array aus Zeichenfolgen | fakultativ |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `map_reactome_pathways` {/* #map_reactome_pathways */}

Kartengensymbole oder UniProt-Zugänge zu Reactome-Signalwegen (AnalysisService-Token-Workflow). Args: Identifikatoren (Gensymbole, wenn id_type = "symbol", UniProt-Zugänge, wenn "uniprot"; keine Duplikate; id_type ("symbol"/"uniprot"); Art (Standard "Homo sapiens"); Ressource (AnalysisService-Molekülressourcenansicht "TOTAL") Ausfall; "UNIPROT" beschränkt sich auf Protein-Level-Mappings; include_disease (Service Default True); Kompakt (True → per-Identifier low-level pathways only &#123;stId,name,species&#125;) + Reaktome Release Version; Falsch → vollständiges deterministisches Ergebnis: Per-Identifier vollständige Pfadsätze mit Entitäts-/Reaktionsstatistik (p-Werte, FDR, gefunden/insgesamt) und Batch-Summe inkl. identifiers_not_found). Returns: Compact &#123;tool, reactome_version, id_type, species, n_input, genes:&#123;identifier:&#123;found, n_lowlevel_pathways, pathways&#125;&#125;&#125;; Voll fügt pro-Weg-Statistik und batch_summary hinzu. Karten Identifikatoren zu Signalwegen in den angeforderten Arten, ohne sie auf den Menschen zu projizieren. Verwenden Sie einen unterstützten wissenschaftlichen Namen wie `Homo sapiens` oder `Mus musculus`; Das herunterladbare Schema listet alle unterstützten Namen auf. Leere, nicht unterstützte oder nicht übereinstimmende Arten sind Fehler. `found` und `n_found` zeigen Identifikatorerkennung an, nicht Pathway-Mitgliedschaft: Ein erkannter Identifikator kann null Pathways haben. Der Compact-Modus enthält nur Pfade auf niedriger Ebene.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `identifiers` | Array aus Zeichenfolgen | **erforderlich** |
| `id_type` | Zeichenfolge | **erforderlich**; enum: &#91;"symbol", "uniprot"&#93; |
| `species` | Zeichenfolge | fakultativ; Standard: "Homo sapiens" |
| `resource` | Zeichenfolge | fakultativ; Standard: "TOTAL" |
| `include_disease` | boolescher Wert | fakultativ; Standard: true |
| `compact` | boolescher Wert | fakultativ; Standard: true |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources` {/* #list_enrichment_sources */}

Listen Sie die g:Profiler-Anreicherungsquellen und ihre aktuellen Datenversionen für einen Organismus auf. Quellen sind organismenabhängig und umfassen Namespaces wie GO:BP, GO:MF, GO:CC, KEGG, Reactome und WikiPathways, wenn verfügbar. g:Profiler speichert begrenzte Abfrage-Metadaten für den Dienstbetrieb; Dieser Read-Only-Lookup reicht keine Genliste ein.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `organism` | Zeichenfolge | **erforderlich**; minLänge: 1; max.Länge: 64; Muster: "^&#91;a-z&#93;&#91;a-z0-9_&#93;&#42;$" |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set` {/* #enrich_gene_set */}

Führen Sie g:Profiler g:GOSt-Anreicherung für ein Gen, das in GO, Reactome, KEGG, WikiPathways und anderen vom Organismus unterstützten Quellen festgelegt ist. Unterstützt einen expliziten Organismus, benutzerdefinierten statistischen Hintergrund, Unterrepräsentationstests und g:Profiler Mehrfachtestkorrektur. Nicht zugeordnete, mehrdeutige und doppelte Identifikatoren werden in Metadaten zurückgegeben, anstatt stillschweigend verworfen zu werden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `genes` | Array aus Zeichenfolgen | **erforderlich**; minItems: 1; maxItems: 5000 |
| `organism` | Zeichenfolge | **erforderlich**; minLänge: 1; max.Länge: 64; Muster: "^&#91;a-z&#93;&#91;a-z0-9_&#93;&#42;$" |
| `sources` | Array aus Zeichenfolgen | fakultativ; maxItems: 100 |
| `background_genes` | Array aus Zeichenfolgen | fakultativ; minItems: 1; maxItems: 20000 |
| `domain_scope` | Zeichenfolge | fakultativ; enum: &#91;"annotated", "known", "custom", "custom_annotated"&#93; |
| `correction_method` | Zeichenfolge | fakultativ; Standard: "g_SCS"; enum: &#91;"g_SCS", "bonferroni", "fdr"&#93; |
| `user_threshold` | Zahl | fakultativ; höchstens: 1; exklusivMinimum: 0 |
| `all_results` | boolescher Wert | fakultativ; Standard: falsch |
| `ordered` | boolescher Wert | fakultativ; Standard: falsch |
| `measure_underrepresentation` | boolescher Wert | fakultativ; Standard: falsch |
| `no_iea` | boolescher Wert | fakultativ; Standard: falsch |
| `no_evidences` | boolescher Wert | fakultativ; Standard: falsch |
| `numeric_ns` | Zeichenfolge | fakultativ; minLänge: 1; maxLänge: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## Genome {/* #family-5 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `ensembl_lookup` {/* #ensembl_lookup */}

Suchen Sie Gene, Transkripte oder Proteine nach stabiler ID oder Gene nach Symbol. Eine Abfrage akzeptiert ENS IDs (versioniert erlaubt), FlyBase/WormBase/yeast IDs oder Symbole wie BRAF. query_type: auto (standardmäßig) versucht ID zuerst, dann Symbol nur bei expliziter Abwesenheit, es sei denn, die Eingabe ist eine kanonische ENS/LRG ID; id verwendet nur ID-Lookup; Symbol verwendet nur Symbol-Lookup ohne Versionsnormalisierung. species gilt nur für Symbol-Lookup (Standard homo_sapiens) und wird nicht abgeleitet. expand umfasst Transkripte, Exons und Übersetzungen (standardmäßig falsch). Ungültige Anfragen und Dienstfehler verursachen Fehler.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `query_type` | Zeichenfolge | fakultativ; Standard: "auto"; enum: &#91;"auto", "id", "symbol"&#93; |
| `species` | Zeichenfolge | fakultativ; Standard: "homo_sapiens" |
| `expand` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs` {/* #ensembl_xrefs */}

Externe Querverweise einer Ensembl-Stable-ID — die Brücke von Ensembl-Gen-/Transkript-IDs zu HGNC, NCBI (EntrezGene), UniProt, OMIM, RefSeq, Expression Atlas und anderen. Args: stable_id (ENSG.../ENST..., versioniert akzeptiert); external_db (optionaler exakter Upstream-Datenbank-Namen-Filter, z.B. HGNC, EntrezGene, Uniprot_gn, MIM_GENE, RefSeq_mRNA; Weglassen für alle. Gibt &#123;stable_id, external_db, n_xrefs, xrefs&#125; zurück — die COMPLETE-Liste (nie abgeschnitten), sortiert nach (dbname, primary_id); jede Zeile &#123;dbname, db_display_name, primary_id, display_id, Beschreibung, Synonyme, info_type&#125;. Unbekannte IDs geben n_xrefs:0 zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `stable_id` | Zeichenfolge | **erforderlich** |
| `external_db` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant` {/* #ensembl_vep_variant */}

Wenn `variant_id` angegeben ist, hat die ID-Abfrage Vorrang und ignoriert `region`, `allele` und `allele_orientation`. `allele` filtert die ID-Ergebnisse nicht. Regionsabfragen verwenden das aktuelle Referenz-Assembly der Spezies (GRCh38 beim Menschen). Die Koordinaten beginnen bei 1 und schließen beide Grenzen ein; für eine Insertion gilt `start = end + 1`. Standardmäßig ist `allele_orientation` auf `forward` gesetzt: Das Allel bezieht sich auch bei einem Suffix `:-1` auf den Vorwärtsstrang der Referenz. Mit `region` wird ein Sequenzallel einer Negativstrang-Region vor der Abfrage revers komplementiert. Symbolische Allele in einer solchen Region erfordern `forward`. Regionsabfragen werden immer auf dem Vorwärtsstrang gesendet; `normalization` enthält ursprüngliche und normalisierte Eingaben. Koordinaten werden weder auf ein anderes Assembly übertragen noch umgekehrt. Ein Gen auf dem Negativstrang erfordert keine Eingabe auf dem Negativstrang.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `variant_id` | Zeichenfolge | fakultativ |
| `region` | Zeichenfolge | fakultativ |
| `allele` | Zeichenfolge | fakultativ |
| `allele_orientation` | Zeichenfolge | fakultativ; Standard: `forward`; enum: `forward`, `region` |
| `species` | Zeichenfolge | fakultativ; Standard: "homo_sapiens" |
| `max_consequences` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology` {/* #ensembl_homology */}

Orthologe oder Paraloge eines Gens aus Ensembl Compara (kondensierte Reihen — keine Alignments/Sequenzen). Args: gene_symbol (zuerst in `species` aufgelöst zu einer stabilen ID); Pass genau eine von gene_symbol/gene_id; gene_id (ENSG...); homology_type (Orthologe Standard/Paraloge/Projektionen); target_species (Beschränkung auf eine Art); target_taxon (NCBI Taxon Subtree, z.B. 9443 Primaten; kombinierbar mit target_species, ODER Semantik; Art (Quellart, Standard homo_sapiens); max_homologies (Zeile-Cap-Standard 200); n_total trägt den kompletten Zählerstand, homologies_truncated kennzeichnet den Cap. Gibt &#123;gene_id, gene_symbol, species, homology_type, target_species, target_taxon, n_total, homologies_truncated, homologies&#125; zurück; Zeilen sortiert nach (Art, ID) &#123;type, species, id, protein_id, taxonomy_level, method_link_type&#125;. Quirk: die /homology/symbol route stalls — dieses tool löst immer symbole selbst und abfragen durch stabile id.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | fakultativ |
| `gene_id` | Zeichenfolge | fakultativ |
| `homology_type` | Zeichenfolge | fakultativ; Standard: "orthologues"; enum: &#91;"orthologues", "paralogues", "projections"&#93; |
| `target_species` | Zeichenfolge | fakultativ |
| `target_taxon` | Ganzzahl | fakultativ |
| `species` | Zeichenfolge | fakultativ; Standard: "homo_sapiens" |
| `max_homologies` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence` {/* #ensembl_sequence */}

Abrufsequenz aus Ensembl — nach stabiler ID (Gen/Transkript/Protein) oder nach genomischer Region. Pass EITHER stable_id ODER Region. Args: stable_id (ENSG.../ENST.../ENSP..., versioniert akzeptiert); Region (1-basiertes inklusives chrom:start..end oder chrom:start-end, GRCh38 für Menschen, max. 10Mb); Arten (für die Route der Region, Standard homo_sapiens); ignoriert für stabile IDs; seq_type (ID-Route: genomischer Standard/cdna/cds/Protein); ignoriert für Regionen, die immer genomisch zurückkehren. Dieses Tool gibt eine Sequenz zurück: Für cdna/cds/protein-Anforderungen auf Genebene, die sich auf mehrere Sequenzen auflösen, geben Sie stattdessen eine Transkript/proteinstabile ID an; max_bytes (Nutzlastschutzstandard 400000 — größere Sequenzen haben `seq` ausgelassen); Länge/Sha256/Metadaten immer zurückgegeben; Wiederanruf mit größerem max_bytes für Volltext. Gibt &#123;found, Abfrage, seq_type, ID, Beschreibung, Molekül, Länge, sha256, seq&#125; zurück Länge in der Einheit, die durch das Molekül impliziert wird (Basen für dna, Rückstände für Protein); bei Deckelung durch seq_omitted ersetzt; found:false nur dann mit Nullfeldern, wenn Ensembl die angeforderte stabile ID explizit als nicht gefunden meldet; Multiple-Sequence-Requests, inkompatible Sequenztypen und andere Upstream-Fehler verursachen Fehler.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `stable_id` | Zeichenfolge | fakultativ |
| `region` | Zeichenfolge | fakultativ |
| `species` | Zeichenfolge | fakultativ; Standard: "homo_sapiens" |
| `seq_type` | Zeichenfolge | fakultativ; Standard: "genomic"; enum: &#91;"genomic", "cdna", "cds", "protein"&#93; |
| `max_bytes` | Ganzzahl | fakultativ; Standard: 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region` {/* #ensembl_overlap_region */}

List Ensembl-Funktionen, die sich über eine genomische Region überschneiden: Gene, Transkripte, regulatorische Merkmale (Enhancer/Promotoren), Wiederholungen, Varianten, Karyotypbanden. Args: region (1-basiert inklusive chrom:start-end GRCh38, z.B. 7:140719327-140925199; vorgelagerte Ausschussbereiche > 5Mb — Split größer; Merkmal (Genstandard/Transcript/Exon/cds/Regulator/Motiv/Wiederholung/Variante/structural_variation/Band/einfach/misc); Art (Standard homo_sapiens); max_features (Zeile-Cap-Standard 500); n_total trägt die komplette Überlappungszahl, features_truncated markiert die Kappe. Gibt &#123;region, species, feature, n_total, features_truncated, features&#125; zurück sortiert nach (start,id). Reihenform variiert — Gene &#123;id, external_name, Biotyp, Beschreibung, Anfang, Ende, Strang, canonical_transcript, ...&#125;; regulatorische &#123;id, Beschreibung, Anfang, Ende, extended_start/Ende, ...&#125;. Leere Regionen geben n_total:0 zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `region` | Zeichenfolge | **erforderlich** |
| `feature` | Zeichenfolge | fakultativ; Standard: "gene"; enum: &#91;"Gengen", "Transkript", "Exon", "CDs", "Regulierung", "Motiv", "Wiederholung", "Varianz", "structural_variation", "Band", "einfach", "Misc"&#93; |
| `species` | Zeichenfolge | fakultativ; Standard: "homo_sapiens" |
| `max_features` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon` {/* #ncbi_resolve_taxon */}

Lösen Sie eine Art oder einen Taxonnamen in NCBI Taxonomy-Identifikatoren auf. Akzeptiert einen wissenschaftlichen / gemeinsamen Namen oder eine numerische TaxID; Gibt jedes Upstream-Match zurück, so dass mehrdeutige Namen nicht stillschweigend dem ersten Ergebnis zugewiesen werden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich**; minLänge: 1; maxLänge: 200 |
| `max_matches` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info` {/* #ncbi_get_assembly_info */}

Geben Sie die genaue NCBI-Genom-Assembler-Identität für einen versionierten GCF/GCA-Beitritt zurück, einschließlich Taxon, Assemblername, UCSC-Synonym, Status und gepaarter RefSeq/GenBank-Beitritt. Versionslose Beitritte werden abgelehnt, um Reproduzierbarkeits- und Artenkompatibilitätsfehler zu verhindern.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `assembly_accession` | Zeichenfolge | **erforderlich**; Muster: "^GC&#91;AF&#93;_&#91;0-9&#93;&#123; 9&#125;\\.&#91;0-9&#93;+$" |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases` {/* #ncbi_get_sequence_aliases */}

Listenfolgenamen und genaue UCSC/RefSeq/GenBank-Aliasnamen für eine versionierte NCBI-Baugruppe. Optional einen Sequenznamen auflösen; Mehrdeutige gemeinsame Chromosomenmarkierungen werden als mehrere Übereinstimmungen beibehalten, anstatt ein alt oder ein nicht lokalisiertes Gerüst zu wählen. Ergebnisse sind ein begrenztes Präfix, das von max_sequences (Standard 200) gesteuert wird; Verwenden Sie eine größere Kappe, wenn der vollständige Montagebericht benötigt wird.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `assembly_accession` | Zeichenfolge | **erforderlich**; Muster: "^GC&#91;AF&#93;_&#91;0-9&#93;&#123; 9&#125;\\.&#91;0-9&#93;+$" |
| `sequence` | Zeichenfolge | fakultativ; minLänge: 1; maxLänge: 200 |
| `max_sequences` | Ganzzahl | fakultativ; Standard: 200; mindestens: 1; höchstens: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks` {/* #ucsc_list_tracks */}

Listen Sie Datenspuren auf, die in einer UCSC Genome Browser Assembly verfügbar sind (nur Blattspuren — die abfragbaren), optional gefiltert. Args: Genom (hg38 default/hg19/mm39/danRer11/...) ~220-Baugruppen; filter_text (case-insensitive Substring over name/short/long label, z.B.) phyloP, TFBS, ClinVar; weglassen, alles aufzulisten - hg38 hat ~ 24k Blattspuren, Sie wollen fast immer einen Filter; max_tracks (Zeile-Cap-Standard 200); n_total trägt die volle Übereinstimmungszahl, tracks_truncated markiert die Obergrenze. Gibt &#123;genome, filter_text, n_total, tracks_truncated, tracks&#125; zurück nach Gleisnamen sortiert; jede Zeile &#123;track, short_label, long_label, type, group, parent&#125;. Verwenden Sie `track` mit ucsc_track_data. Quirk: Der erste Aufruf pro Genom lädt die vollständige ~17MB-Liste herunter und speichert sie für den Prozess.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `genome` | Zeichenfolge | fakultativ; Standard: "hg38" |
| `filter_text` | Zeichenfolge | fakultativ |
| `max_tracks` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data` {/* #ucsc_track_data */}

Holen Sie rohe Zeilen eines UCSC Genome Browser-Tracks in einer Region ab - die generische Escape-Schlüpfe hinter ucsc_conservation / ucsc_tfbs_clusters (Genspuren, ClinVar, GWAS-Katalog, CpG-Inseln, Wiederholungen, ...). Args: Track (Name aus ucsc_list_tracks, z.B. bekanntGene, cpgIslandExt, clinvarMain; Chrom (Chr-präfixiert, chr7/chrX — UCSC erfordert das Präfix); Start (0-basiert halboffen); ein Ensembl 1-basierter Start ist hier Start-1; Ende (ausschließlich); Genom (Standard hg38); max_rows (API maxItemsOutput, Standard 1000); abgeschnitten spiegelt das API's eigenen maxItemsLimit Flag. Gibt &#123;genom, Track, Chrom, Start, Ende, track_type, items_returned, abgeschnitten, Zeilen&#125; zurück — Zeilen in vorgelagerter Form (BED-ähnliche &#123;chrom, chromStart, chromEnd, Name, Score, ...&#125;); wiggle &#123;start, end, value&#125;). Unbekannte Tracks steigen. Quirk: Für einige riesige Tracks geben die API-Caps sich selbst aus und zeigen auf dataDownloadUrl - wenn vorhanden. Koordinaten müssen nicht negative sichere ganze Zahlen sein, mit `end > start`. Ungültige Werte werden abgelehnt, nicht gerundet oder auf einen anderen Ort geklemmt.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `track` | Zeichenfolge | **erforderlich** |
| `chrom` | Zeichenfolge | **erforderlich** |
| `start` | Ganzzahl | **erforderlich**; mindestens: 0; höchstens: 9007199254740991 |
| `end` | Ganzzahl | **erforderlich**; mindestens: 0; höchstens: 9007199254740991 |
| `genome` | Zeichenfolge | fakultativ; Standard: "hg38" |
| `max_rows` | Ganzzahl | fakultativ; Standard: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation` {/* #ucsc_conservation */}

Evolutionäre Konservierungszusammenfassung für eine Region aus UCSC phyloP / phastCons Tracks (basenweise Bewertungen über Multi-Spezies-Alignments). Args: Chrom (Chr-präfixiert); Start (0-basiert halboffen); Ende (ausschließlich); mit 100000 bp begrenzte Spannweite — Split größer; Genom (Standard hg38); Gleis (fakultativ); Standardwerte für phyloP100wayAll für hg19 und phyloP100way für andere Genome; positiv = konserviert, negativ = sich schnell entwickelnd; Alternativen hg38 phastCons100way, phyloP30way, phastCons30way, phyloP447way, phyloP470way; hg19 phastCons100way; include_values (auch Rückkehr pro Basis &#123;start, end, value&#125;) Zeilen, die mit max_values gedeckelt sind, values_truncated kennzeichnet die Obergrenze; standard false = nur Zusammenfassung; max_values (pro Base Cap Default 2000). Gibt &#123;genom, Track, Chrom, Start, Ende, span_bp, n_bases_covered, coverage_fraction, Mittelwert, min, max&#125; zurück (+Werte, values_truncated, wenn angefordert). Stats, gewichtet nach der Basisspanne jeder Zeile, auf das Fenster abgeschnitten; unbedeckte Basen niedriger coverage_fraction, nicht Null-scored. Nicht-Score-Tracks anheben; eine vorgelagerte Zeilenliste ebenfalls anhebt.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `chrom` | Zeichenfolge | **erforderlich** |
| `start` | Ganzzahl | **erforderlich**; mindestens: 0; höchstens: 9007199254740991 |
| `end` | Ganzzahl | **erforderlich**; mindestens: 0; höchstens: 9007199254740991 |
| `genome` | Zeichenfolge | fakultativ; Standard: "hg38" |
| `track` | Zeichenfolge | fakultativ |
| `include_values` | boolescher Wert | fakultativ; Standard: falsch |
| `max_values` | Ganzzahl | fakultativ; Standard: 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters` {/* #ucsc_tfbs_clusters */}

ENCODE-Transkriptionsfaktor-Bindungsstellencluster überlappen eine Region (ChIP-Seq-Peak-Cluster über Hunderte von Zelltypen) - an die TFs binden. Args: Chrom (Chr-präfixiert); Start (0-basiert halboffen); Ende (ausschließlich); Genom (hg38 standard track encRegTfbsClustered ENCODE 3 oder hg19 wgEncodeRegTfbsClusteredV3); andere Baugruppen erhöhen; max_rows (API maxItemsOutput default 1000); abgeschnitten spiegelt maxItemsLimit. Gibt &#123;genome, track, chrom, start, ende, items_returned, abgeschnitten, n_factors, factors, cluster&#125; zurück Cluster sortiert nach (chromStart,name) &#123;name (TF-Symbol z.B.) CTCF), Chrom, ChromStart, ChromEnd, Score (0-1000), sourceCount (unterstützende Experimente)&#125;; Faktoren ist die eindeutige TF-Liste. Score>=~600 und high sourceCount ~ robuste Bindung. Koordinaten müssen nicht negative sichere ganze Zahlen sein, mit `end > start`. Ungültige Werte werden abgelehnt, nicht gerundet oder auf einen anderen Ort geklemmt.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `chrom` | Zeichenfolge | **erforderlich** |
| `start` | Ganzzahl | **erforderlich**; mindestens: 0; höchstens: 9007199254740991 |
| `end` | Ganzzahl | **erforderlich**; mindestens: 0; höchstens: 9007199254740991 |
| `genome` | Zeichenfolge | fakultativ; Standard: "hg38" |
| `max_rows` | Ganzzahl | fakultativ; Standard: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes` {/* #ucsc_chrom_sizes */}

Chromosomen-/Kontignamen und -größen einer UCSC-Baugruppe — zur Validierung von Koordinaten und iterierenden Regionen. Args: Genom (Standard hg38); filter_text (case-insensitiver Substring auf dem Namen, z.B. chr1; hg38 hat 711-Sequenzen, meist alt/zufällig/unplatziert; Primärchromosomen zuerst sortieren; max_chroms (Zeile-Cap-Standard 100); n_total trägt die volle Postfilterzahl, chroms_truncated markiert die Kappe. Gibt &#123;genom, filter_text, chrom_count (assembly-wide vom API), n_total, chroms_truncated, Chromosomen zurück:&#91;&#123;name, size_bp&#125;&#93;&#125; sortiert nach absteigender Größe.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `genome` | Zeichenfolge | fakultativ; Standard: "hg38" |
| `filter_text` | Zeichenfolge | fakultativ |
| `max_chroms` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

</ToolOperationGroup>

## Varianten {/* #family-6 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

**Koordinatenregeln von gnomAD:** zeichnet den Datensatz-Pin mit der Referenzbaugruppe auf. Kurzvariante Gen/Region Abfragen verwenden GRCh37 für r2.1/ExAC und GRCh38 für r3/r4; strukturvariante Genabfragen verwenden `gnomad_sv_r2_1` (GRCh37) oder `gnomad_sv_r4` (GRCh38); Das Ändern des Pins konvertiert keine Eingangskoordinaten. `gene_constraint` und der gnomAD ClinVar-Spiegel verwenden einen festen GRCh38-Gen-Lookup und akzeptieren kein Dataset-Argument. Mitochondriale Abfragen verwenden auch einen festen GRCh38-Eltern-Lookup; Liefern Sie entweder ein Gen oder beide geordnete Regionsgrenzen, niemals beide Modi. Regionsgrenzen müssen ganze Zahlen von 1 bis 999,999,999 sein. Die 1-Millionen-Basis-Differenzgrenze gilt für `region_variants`; Es handelt sich nicht um eine separate mitochondriale Grenze. Bewahren Sie Release-spezifische Strukturvarianten-IDs mit ihrem ursprünglichen SV-Datensatz auf.

### `get_variant` {/* #get_variant */}

Suchen Sie nach einer gnomAD-Kurzvariante nach ID und geben Sie die Gesamtexom-/Genomfrequenzen zurück. `variant_id` ist `chrom-pos-ref-alt` auf dem Referenz-Build des Datensatzes (GRCh38 für r3/r4, GRCh37 für r2.1/ExAC), z.B. `19-44908822-C-T` (APOE rs7412); Verwenden Sie `search_variants`, um eine rsID zuerst aufzulösen. Setzen Sie `include_populations: true`, wenn ancestry-spezifische Zählungen/Frequenzen für eine einzelne Variante benötigt werden. Bewahren Sie den Datensatz, die Allelzahl und die Qualitätsfilter bei der Interpretation der Frequenzen auf; Seltenheit allein stellt keine Pathogenität oder ein ACMG-Kriterium dar.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `variant_id` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | fakultativ; Standard: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "Exac"&#93; |
| `include_populations` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants` {/* #search_variants */}

Suchen Sie gnomAD nach Varianten-IDs, die mit einer Abfragezeichenfolge übereinstimmen (eine rsID wie `rs7412`, eine Varianten-ID oder ein Präfix). Verwenden Sie dies, um rsIDs zu `chrom-pos-ref-alt` IDs für `get_variant` aufzulösen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | fakultativ; Standard: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "Exac"&#93; |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants` {/* #gene_variants */}

Listen Sie alle gnomAD-Kurzvarianten in einem Gen auf. Gengrenzen und Variantenkoordinaten verwenden den Datensatz-Referenzaufbau (GRCh37 für r2.1/ExAC, GRCh38 für r3/r4). Die vollständige Auflistung kann Tausende von Zeilen für große Gene enthalten. Pass genau eines von `gene_symbol` (HGNC Symbol, z.B. `APOE`) oder `gene_id` (Ensembl-Gen-ID, z.B. `ENSG00000130203`).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | fakultativ |
| `gene_id` | Zeichenfolge | fakultativ |
| `dataset` | Zeichenfolge | fakultativ; Standard: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "Exac"&#93; |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint` {/* #gene_constraint */}

gnomAD-Gen-Konstraint-Metriken: pLI, beobachtete/erwartete LoF-missense-synonyme Zählungen mit oe-Verhältnissen + 90% CI-Grenzen und pro Klasse z-Scores. Beurteilen Sie eine gene's-Intoleranz gegenüber Funktionsverlust (pLI > = 0.9 oder oe_lof_upper (LOEUF) &lt;) 0.6 ~ LoF-intolerant. Pass genau eine von `gene_symbol` (z.B.) `TP53` oder `gene_id`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | fakultativ |
| `gene_id` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants` {/* #region_variants */}

Liste ALLE kurzen gnomAD-Varianten in einer genomischen Region (max. 1 Mb — größere Regionen in aufeinanderfolgende Fenster aufteilen). `chrom` akzeptiert `1`-`22`, `X`, `Y`, ein optionales `chr`-Präfix und Kleinbuchstaben `x`/`y`; `start`/`stop` sind 1-basiert und `stop - start` muss &lt;=1,000,000 sein. Der Datensatz bestimmt den Referenzaufbau der Koordinaten (GRCh37 für r2.1/ExAC, GRCh38 für r3/r4); Eingabekoordinaten müssen diesen Build bereits verwenden, ohne automatischen Liftover.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `chrom` | Zeichenfolge | **erforderlich** |
| `start` | Ganzzahl | **erforderlich**; mindestens: 1; höchstens: 999999999 |
| `stop` | Ganzzahl | **erforderlich**; mindestens: 1; höchstens: 999999999 |
| `dataset` | Zeichenfolge | fakultativ; Standard: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "Exac"&#93; |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant` {/* #liftover_variant */}

Zuordnung einer Varianten-ID zwischen Referenz-Builds (GRCh37 &lt;->) GRCh38) mit gnomAD's Liftover Tabelle. `variant_id` ist `chrom-pos-ref-alt` auf `source_build`. Die Route ist richtungsweisend: Eine GRCh38 ID, die mit `source_build=GRCh37` übergeben wurde, gibt null Ergebnisse zurück, keinen Fehler.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `variant_id` | Zeichenfolge | **erforderlich** |
| `source_build` | Zeichenfolge | fakultativ; Standard: "GRCh37"; &#91;"GRCh37", "GRCh38"&#93; |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants` {/* #clinvar_variants */}

Liste ClinVar-Varianten in einem Gen, wie es von gnomAD gespiegelt wird, mit klinischer Bedeutung, Review-Status und Goldsternen. Die Ausgangspins gnomAD's ClinVar Snapshot über `clinvar_release_date`. Pass genau eine von `gene_symbol` (z.B.) `BRCA1` oder `gene_id`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | fakultativ |
| `gene_id` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants` {/* #structural_variants */}

Liste gnomAD-Strukturvarianten (Deletionen, Duplikationen, Insertionen, Inversionen, CNVs ...) überlappend ein Gen. Pass genau eine von `gene_symbol` (z.B.) `TP53` oder `gene_id`. `dataset` ist ein SV-Pin — `gnomad_sv_r4` (Standard, GRCh38) oder `gnomad_sv_r2_1` (GRCh37); SV IDs sind release-spezifisch.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | fakultativ |
| `gene_id` | Zeichenfolge | fakultativ |
| `dataset` | Zeichenfolge | fakultativ; Standard: "gnomad_sv_r4"; &#91;"gnomad_sv_r4", "gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant` {/* #get_structural_variant */}

Eine gnomAD-Strukturvariante kann anhand ihrer releasespezifischen SV ID nachgeschlagen werden (z.B. `DEL_CHR17_599B1512` in gnomad_sv_r4. IDs tragen keine Veröffentlichungen - `dataset` (`gnomad_sv_r4` Standard oder `gnomad_sv_r2_1`) muss mit der Veröffentlichung übereinstimmen, von der die ID stammt.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `sv_id` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | fakultativ; Standard: "gnomad_sv_r4"; &#91;"gnomad_sv_r4", "gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants` {/* #mitochondrial_variants */}

Liste gnomAD mitochondriale Varianten mit heteroplasmy-aware counts (`ac_het`, `ac_hom`, `max_heteroplasmy`) für ein mitochondriales Gen ODER ein chrM-Koordinatenfenster. Übergeben Sie ein Gen (`gene_symbol` wie `MT-TL1` oder `gene_id`) ODER eine Region (`region_start` + `region_stop`), nicht beides.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | fakultativ |
| `gene_id` | Zeichenfolge | fakultativ |
| `region_start` | Ganzzahl | fakultativ; mindestens: 1; höchstens: 999999999 |
| `region_stop` | Ganzzahl | fakultativ; mindestens: 1; höchstens: 999999999 |
| `dataset` | Zeichenfolge | fakultativ; Standard: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "Exac"&#93; |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

### `clinvar_search` {/* #clinvar_search */}

Suchen Sie ClinVar direkt (live NCBI, nicht gnomAD's Snapshot) und geben Sie übereinstimmende Variationsaufzeichnungen mit klinischer Signifikanz, Überprüfungsstatus und Goldsternen zurück. Benötigt eine Kontakt-E-Mail ([Einstellungen → Anmeldeinformationen → Literaturzugang → Kontakt-E-Mail](../tools/credentials.md)) pro NCBI E-utilities Nutzungsrichtlinie. Args: Abfrage (eine ClinVar Entrez-Abfrage — freier Text wie "TP53 R175H") oder ein HGVS-String funktioniert, und feldgestützte Terme komponieren mit AND/OR/NOT, z.B. BRCA1&#91;Gen&#93;, pathogen&#91;CLIN_SIG&#93;, "Lynch-Syndrom"&#91;dis&#93;, single_nucleotide_variant&#91;Variation&#93;; eine rsID funktioniert auch, aber clinvar_variant_by_rsid gibt vollere Datensätze zurück, max_records (Seitenkappe 1-200, Standard 50). Die Übereinstimmung TOTAL wird immer gemeldet; wenn insgesamt > max_records die Liste ist ein gedeckeltes Präfix (ClinVar Relevanz / Häufigkeit Reihenfolge) und verkürzt ist wahr. NCBI E-utilities geben HTTP 500 unter Last intermittierend zurück — wiederholen Sie es einige Sekunden später, wenn diese auftaucht.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records` {/* #clinvar_get_records */}

Holen Sie vollständige ClinVar-Datensätze für eine Charge von VCV/RCV-Zugängen oder bloßen Variations-IDs ab. Benötigt eine Kontakt-E-Mail ([Einstellungen → Anmeldeinformationen → Literaturzugang → Kontakt-E-Mail](../tools/credentials.md)) pro NCBI E-utilities Nutzungsrichtlinie. Args: accessions (bis 50 identifiers, mixed forms accepted — VCV000045122 (versioniert VCV000045122.3 ok); lokal aufgelöst, kostenlos), RCV000019428 (jeder RCV kostet eine zusätzliche Suche) oder eine bloße ClinVar Variation ID (45122). rsIDs werden abgelehnt - verwenden Sie clinvar_variant_by_rsid. Ein RCV (ein Paar von Varianten-Bedingungen) löst sich in seinen übergeordneten VCV-Variationsdatensatz auf. Niemals einen Input stillschweigend fallen lassen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accessions` | ['string', 'array'] | **erforderlich** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid` {/* #clinvar_variant_by_rsid */}

Alle ClinVar-Variationsdatensätze, die sich auf eine dbSNP rsID beziehen, mit vollständigen Klassifikationen (eine rsID kann auf mehrere VCVs abgebildet werden – eine pro alternativem Allel, z.B. rs121913529 umfasst KRAS G12D/G12V/G12A. Benötigt eine Kontakt-E-Mail ([Einstellungen → Anmeldeinformationen → Literaturzugang → Kontakt-E-Mail](../tools/credentials.md)) pro NCBI E-utilities Nutzungsrichtlinie. Args: rsid (dbSNP Referenz SNP ID, z.B. rs7412; case-insensitive, muss mit rs&lt;digits>, max_records übereinstimmen (cap 1-200, default 50). total trägt immer die wahre Übereinstimmungszahl und verkürzte Flaggen eine gedeckelte Auflistung; total == 0 bedeutet, dass ClinVar keinen Eintrag für die rsID hat.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `rsid` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids` {/* #dbsnp_get_rsids */}

Canonical dbSNP RefSNP Aufzeichnungen für eine Charge von rsIDs: GRCh38 + GRCh37 Platzierungen, Allele, Genkontext, pro-Studie Allel-Frequenzen und ClinVar Querverweise. Benötigt eine Kontakt-E-Mail ([Einstellungen → Anmeldeinformationen → Literaturzugang → Kontakt-E-Mail](../tools/credentials.md)) pro NCBI Nutzungsrichtlinie für E-Dienstprogramme; Ohne eine gibt das Tool &#123;error zurück: 'contact_email_required', message&#125;. Args: rsids (bis zu 20 rs&lt;digits>, case-insensitive) — kostet jeweils eine temporäre NCBI Variation Services-Anfrage, so dass große Batches ~1 s pro rsID benötigen. Gibt &#123;n_requested, records, not_found (rs-Nummern dbSNP doesn't know), not_processed (rsIDs übersprungen, wenn das Wall-Clock-Budget abgelaufen ist – nur diese erneut anfordern)&#125; zurück. Jeder Datensatz: &#123;rsid, Status, create_date, last_update_date, last_update_build_id, n_citations, citations_pmids (begrenzt auf 20); citations_truncated kennzeichnet die Kappe), variant_type, mane_select_ids, Platzierungen, Allele&#125;. Status ist 'live', 'merged' (Record trägt stattdessen merged_into – diese rsIDs erneut abfragen) oder 'no_data' (zurückgenommen/nicht unterstützt). Platzierungen geben 1-basierte Chromosomenkoordinaten mit ref/alts pro Assembly (GRCh38 zuerst, is_primary true). Jeder Alt-Allel-Eintrag: &#123;allele, ref, spdi (0-basierte Interbase), hgvs, Frequenzen: &#91;&#123;study, study_version, allele_count, total_count, af&#125;&#93; (ALFA, 1000Genomes, TOPMED, gnomAD...), clinvar: &#91;&#123;rcv_accession, clinical_significances, review_status, last_evaluated_date, disease_names&#125;&#93;, Gene: &#91;&#123;symbol, gene_id, Name, Orientierung, Folgen (SO-Begriffe), mane_select: &#91;&#123;transcript_hgvs, protein_spdi&#125;&#93;&#125;&#93;&#125;.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `rsids` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region` {/* #dbsnp_search_by_region */}

Liste dbSNP rsIDs in einem genomischen Fenster (esearch db=snp positional index — NCBI Variation Services hat keinen Regionsendpunkt). Benötigt eine Kontakt-E-Mail ([Einstellungen → Anmeldeinformationen → Literaturzugang → Kontakt-E-Mail](../tools/credentials.md)) pro NCBI Nutzungsrichtlinie für E-Dienstprogramme; Ohne eine gibt das Tool &#123;error zurück: 'contact_email_required', message&#125;. Args: Chrom (1-22, X, Y oder MT); 'chr' Präfix toleriert), Start (1-basiert inklusive), Stopp (inklusive); Spannweite mit 1 Mb begrenzt — größere Regionen in aufeinanderfolgende Fenster aufteilen; dichte Regionen halten viele Tausende von rsIDs pro kb, also halten Sie Fenster klein oder erhöhen Sie max_rsids), Montage (welcher Positionsindex - 'GRCh38') Standard -> &#91;CPOS&#93; oder 'GRCh37' -> &#91;CPOS_GRCH37&#93;; Koordinaten müssen auf der gewählten Assembly liegen), max_rsids (Listing Cap 1-1000, Standard 200). Gibt &#123;chrom, Start, Stop, Assembly, Term (die genaue verwendete Entrez-Abfrage), total (die eigene Zählung von API'), n_returned, abgeschnitten, rsids&#125; zurück. abgeschnitten ist wahr, wenn insgesamt > n_returned — die Liste ist dann ein Präfix in der Entrez-Standardreihenfolge (absteigende rs-Nummer), niemals eine stille Verkürzung. Feed rsIDs (&lt; = 20 zu einem Zeitpunkt) zu dbsnp_get_rsids für vollständige Aufzeichnungen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `chrom` | Zeichenfolge | **erforderlich** |
| `start` | Ganzzahl | **erforderlich** |
| `stop` | Ganzzahl | **erforderlich** |
| `assembly` | Zeichenfolge | fakultativ; Standard: "GRCh38"; enum: &#91;"GRCh38", "GRCh37"&#93; |
| `max_rsids` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## Klinische Studien {/* #family-7 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `search_trials` {/* #search_trials */}

PRIMARY Suche über ClinicalTrials.gov. Filtern nach Bedingung, Intervention, Sponsor, Standort, Status (z.B.) &#91;"RECRUITING"&#93;), Phase (&#91;"PHASE1".."PHASE4"&#93;) und study_type Bedingung/Intervention/Sponsor/Standort akzeptieren Essie-Abfrage-Syntax (boolesche AND/OR/NOT, "zitierte Phrasen", Gruppierung, automatische Synonyme). Seite mit page_token; Setzen Sie count_total für die Gesamtübereinstimmungszahl. advanced_query fügt einen rohen Essie-Ausdruck in filter.advanced zusammen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `condition` | Zeichenfolge | fakultativ |
| `intervention` | Zeichenfolge | fakultativ |
| `sponsor` | Zeichenfolge | fakultativ |
| `location` | Zeichenfolge | fakultativ |
| `status` | Array aus Zeichenfolgen | fakultativ |
| `phase` | Array aus Zeichenfolgen | fakultativ |
| `study_type` | Zeichenfolge | fakultativ; enum: &#91;"INTERVENTIONAL", "OBSERVATIONAL", "EXPANDED_ACCESS"&#93; |
| `advanced_query` | Zeichenfolge | fakultativ |
| `page_size` | Ganzzahl | fakultativ; Standard: 10; mindestens: 1; höchstens: 1000 |
| `page_token` | Zeichenfolge | fakultativ |
| `count_total` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details` {/* #get_trial_details */}

Holen Sie sich umfassende Details für eine Studie von NCT id (Format "NCT") + 8-Ziffern; einer nackten Zahl vorangestellt, fallunempfindlich. Gibt vollständige Förderkriterien, Studiendesign, primäre / sekundäre / andere Endpunkte, alle Standorte, Sponsoren und Mitarbeiter, Termine, Einschreibung und einen Ergebnislink zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `nct_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor` {/* #search_by_sponsor */}

Finden Sie Studien, die von einem Unternehmen oder einer Organisation gesponsert werden (partielle Namensübereinstimmung, z.B. "Pfizer" entspricht "Pfizer Inc". Optional nach Bedingung, Phase und Status eingegrenzt. Setzen Sie count_total für die Gesamtzahl der Versuche durch den Sponsor. Seite mit page_token.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `sponsor_name` | Zeichenfolge | **erforderlich** |
| `condition` | Zeichenfolge | fakultativ |
| `phase` | Array aus Zeichenfolgen | fakultativ |
| `status` | Array aus Zeichenfolgen | fakultativ |
| `page_size` | Ganzzahl | fakultativ; Standard: 10; mindestens: 1; höchstens: 1000 |
| `page_token` | Zeichenfolge | fakultativ |
| `count_total` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators` {/* #search_investigators */}

Finden Sie die Hauptforscher und Forschungsstandorte nach Zustand, Institution, Standort oder investigator_name. Institution filtert die Anlage des Standorts und hat Vorrang vor dem Standort; investigator_name sucht OverallOfficialName und ResponsiblePartyInvestigatorFullName. Gibt Site-Kontakte (Namen, Rollen, Zugehörigkeiten, Einrichtungen, Städte) mit ihren Test-NCT-IDs zurück. page_size zeigt, wie viele Versuche gescannt werden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `condition` | Zeichenfolge | fakultativ |
| `institution` | Zeichenfolge | fakultativ |
| `location` | Zeichenfolge | fakultativ |
| `investigator_name` | Zeichenfolge | fakultativ |
| `status` | Array aus Zeichenfolgen | fakultativ |
| `page_size` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints` {/* #analyze_endpoints */}

Analysieren Sie primäre / sekundäre / andere Ergebnismessungen (Endpunkte). Geben Sie NUR nct_id (Single-Trial-Modus) ODER Bedingung (Aggregationsmodus über Versuche hinweg) an. Wenn beide gegeben sind, hat nct_id Vorrang. Der Aggregationsmodus kann durch Phase und start_date_after (JJJJ-MM-TT) verengt werden und bis zu page_size-Versuchen gescannt werden. Gibt die Endpunktlisten plus die häufigsten Kennzahlen in den analysierten Studien zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `nct_id` | Zeichenfolge | fakultativ |
| `condition` | Zeichenfolge | fakultativ |
| `phase` | Array aus Zeichenfolgen | fakultativ |
| `start_date_after` | Zeichenfolge | fakultativ |
| `page_size` | Ganzzahl | fakultativ; Standard: 50; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility` {/* #search_by_eligibility */}

Patient-Trial-Matching. FEHLER zu RECRUITING-Versuchen, es sei denn, der Status ist festgelegt. Liefern Sie entweder min_age oder max_age für ein Patientenalter ("65 Jahre", "6 Monate"); Beide testaltersgrenzen werden überprüft. Wenn beide geliefert werden, muss die Studie das gesamte Altersintervall des Patienten zugeben. Fehlende Probealtersgrenzen sind uneingeschränkt. Sex männlich/weiblich umfasst all-comer-studien. ALLES oder ausgelassenes geschlecht gilt kein sex-filter. eligibility_keywords sucht den Ein-/Ausschlusskriterientext (z.B.) "HbA1c > 8", "BRCA-Mutation", "ECOG 0-1". Mindestens eine der Bedingungen, eligibility_keywords, min_age, max_age oder Sex ist erforderlich. Seite mit page_token.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `condition` | Zeichenfolge | fakultativ |
| `eligibility_keywords` | Zeichenfolge | fakultativ |
| `min_age` | Zeichenfolge | fakultativ |
| `max_age` | Zeichenfolge | fakultativ |
| `sex` | Zeichenfolge | fakultativ; enum: &#91;"ALL", "MALE", "FEMALE"&#93; |
| `status` | Array aus Zeichenfolgen | fakultativ |
| `page_size` | Ganzzahl | fakultativ; Standard: 10; mindestens: 1; höchstens: 1000 |
| `page_token` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## Klinische Genomik {/* #family-8 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `clingen_gene_validity` {/* #clingen_gene_validity */}

ClinGen-Gen-Validitätskurationen (wie stark ist die Evidenz, dass Variation in einem Gen eine Krankheit verursacht: Definitiv / Stark / Moderat / Begrenzt / Disputiert / Widerlegt / Keine bekannte Krankheitsbeziehung). Lassen Sie das Gen aus, um alle 3,600 + -Kurationen aufzulisten.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity` {/* #clingen_dosage_sensitivity */}

ClinGen Dosierungssensitivität Kurationen: Haploinsuffizienz und Triplossibilität Aussagen für Gene (und optional ISCA genomische / CNV-Regionen). Ein Gensymbol oder eine ISCA-Region-ID filtert genau; Weglassen für die vollständige Tabelle.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene` | Zeichenfolge | fakultativ |
| `include_regions` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability` {/* #clingen_actionability */}

ClinGen klinische Aktionsfähigkeit Kurationen: für Störungen im Zusammenhang mit einem Gen, ob frühe Intervention in präsymptomatischen Trägern ist aktionsfähig (Intervention / Ergebnis-Paare mit Schwere, Wahrscheinlichkeit, Wirksamkeit, Art-of-Intervention Komponente Scores und die Gesamt-Score). Der Genfilter passt zu jedem Mitglied von Multi-Gen-Themen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene` | Zeichenfolge | fakultativ |
| `context` | Zeichenfolge | fakultativ; Standard: "both"; enum: &#91;"adult", "pediatric", "both"&#93; |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications` {/* #clingen_variant_classifications */}

ClinGen Evidence Repository (ERepo) Expert-Panel-Varianten-Pathogenitätsklassifikationen (VCEP-Interpretationen nach ACMG-Kriterien). Geben Sie GENAU EINS des Gens (HGNC-Symbol), caid (ClinGen canonical allle id, z.B. CA114360) oder hgvs (z.B. NM_000277.2:c.1222C>T. Komplettes Abrufen (matchLimit=none).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene` | Zeichenfolge | fakultativ |
| `caid` | Zeichenfolge | fakultativ |
| `hgvs` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes` {/* #civic_search_genes */}

Finden Sie CIViC-Gendatensätze nach dem genauen Entrez-Symbol (z.B.) "BRAF". Vollständig paginiert, gezählt. Verwenden Sie die zurückgegebene CIViC-Gen-ID mit civic_gene_variants.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `entrez_symbol` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants` {/* #civic_gene_variants */}

Alle Varianten eines CIViC-Gens (durch CIViC-Gen-ID), vollständig paginiert - sogar für Gene mit Hunderten von Varianten. Sortiert nach Variante id.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_id` | Ganzzahl | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant` {/* #civic_get_variant */}

Eine CIViC-Variante durch ihre CIViC-Varianten-ID (Aliasen, Variantentypen, Merkmal/Gen-Verknüpfung, Koordinaten für Genvarianten). Returns found=false falls nicht vorhanden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `variant_id` | Ganzzahl | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants` {/* #civic_search_variants */}

CIViC-Varianten nach Name Substring (z.B.) "V600"), gegebenenfalls zu einer CIViC-Gen-ID. vollständig paginiert; sortiert nach Variante id.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `name` | Zeichenfolge | **erforderlich** |
| `gene_id` | Ganzzahl | fakultativ |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item` {/* #civic_get_evidence_item */}

Ein CIViC-Evidenzelement nach ID: klinische Signifikanz eines molekularen Profils in einem Krankheits- / Therapiekontext (Evidenzstufe A-E, Typ, Richtung, Signifikanz, Bewertung, Krankheit, Therapien, Quelle). Returns found=false falls nicht vorhanden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `evidence_id` | Ganzzahl | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence` {/* #civic_search_evidence */}

Durchsuchen von CIViC-Beweiselementen durch eine beliebige Kombination von Filtern; vollständig paginiert, zählverifiziert, sortiert nach aufsteigender Evidenz-ID. Enum-Filter nehmen CIViC GraphQL enum-Werte wörtlich (evidence_level "A".."E"; evidence_type PREDICTIVE&#124;PROGNOSTIC&#124;DIAGNOSTIC&#124;PREDISPOSING&#124;ONCOGENIC&#124;FUNCTIONAL; evidence_direction UNTERSTÜTZUNGEN&#124;DOES_NOT_SUPPORT; Status AKZEPTIERT &#124; VORGELEGT &#124; AUSGEHÖRIG &#124; ALL. Stellen Sie mindestens einen Filter zur Verfügung - keine Filter laufen den gesamten 10k + Korpus.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `disease_name` | Zeichenfolge | fakultativ |
| `therapy_name` | Zeichenfolge | fakultativ |
| `evidence_level` | Zeichenfolge | fakultativ |
| `evidence_type` | Zeichenfolge | fakultativ |
| `evidence_direction` | Zeichenfolge | fakultativ |
| `significance` | Zeichenfolge | fakultativ |
| `variant_origin` | Zeichenfolge | fakultativ |
| `evidence_rating` | Ganzzahl | fakultativ |
| `status` | Zeichenfolge | fakultativ |
| `molecular_profile_name` | Zeichenfolge | fakultativ |
| `molecular_profile_id` | Ganzzahl | fakultativ |
| `variant_id` | Ganzzahl | fakultativ |
| `disease_id` | Ganzzahl | fakultativ |
| `therapy_id` | Ganzzahl | fakultativ |
| `phenotype_id` | Ganzzahl | fakultativ |
| `source_id` | Ganzzahl | fakultativ |
| `assertion_id` | Ganzzahl | fakultativ |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion` {/* #civic_get_assertion */}

Eine CIViC-Behauptung von id: eine von Experten kuratierte Zusammenfassungsaussage (AMP / ASCO / CAP-Tier, ACMG / ClinGen-Codes, FDA-Begleitertestflaggen), die Beweise für ein molekulares Profil in einem Krankheits- / Therapiekontext aggregiert. Returns found=false falls nicht vorhanden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `assertion_id` | Ganzzahl | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions` {/* #civic_search_assertions */}

Durchsuchen von CIViC-Behauptungen durch eine beliebige Kombination von Filtern; vollständig paginiert, zählverifiziert, sortiert nach aufsteigender Assertion id. assertion_type PREDICTIVE&#124;PROGNOSTIC&#124;DIAGNOSTIC&#124;PREDISPOSING&#124;ONCOGENIC; assertion_direction UNTERSTÜTZUNGEN&#124;DOES_NOT_SUPPORT; amp_level z.B. TIER_I_LEVEL_A; Status ACCEPTED&#124;SUBMITTED&#124;REJECTED&#124;ALL. Keine Filter laufen den vollen Korpus.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `disease_name` | Zeichenfolge | fakultativ |
| `therapy_name` | Zeichenfolge | fakultativ |
| `assertion_type` | Zeichenfolge | fakultativ |
| `assertion_direction` | Zeichenfolge | fakultativ |
| `significance` | Zeichenfolge | fakultativ |
| `amp_level` | Zeichenfolge | fakultativ |
| `status` | Zeichenfolge | fakultativ |
| `molecular_profile_name` | Zeichenfolge | fakultativ |
| `molecular_profile_id` | Ganzzahl | fakultativ |
| `variant_id` | Ganzzahl | fakultativ |
| `variant_name` | Zeichenfolge | fakultativ |
| `disease_id` | Ganzzahl | fakultativ |
| `therapy_id` | Ganzzahl | fakultativ |
| `phenotype_id` | Ganzzahl | fakultativ |
| `evidence_id` | Ganzzahl | fakultativ |
| `summary` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile` {/* #civic_get_molecular_profile */}

Ein CIViC-Molekülprofil nach ID (Variantenkombination, an die sich Evidenz/Behauptungen anhängen), incl. Parsed Name, Score und Komponentenvarianten. Returns found=false falls nicht vorhanden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mp_id` | Ganzzahl | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles` {/* #civic_search_molecular_profiles */}

CIViC-Molekülprofile nach Name Substring (z.B.) "BRAF V600E". vollständig paginiert; sortiert nach ID.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `name` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases` {/* #civic_search_diseases */}

Durchsuchen von CIViC Disease Records nach Name Substring (z.B.) "melanom". Gibt DOIDs + Anzeigenamen zurück; vollständig paginiert; sortiert nach ID.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `name` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies` {/* #civic_search_therapies */}

Durchsuchen von CIViC-Therapieaufzeichnungen nach Namenssubstring (z.B.) "vemurafenib". Gibt NCIt-IDs + Namen zurück; vollständig paginiert; sortiert nach ID.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `name` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql` {/* #open_targets_graphql */}

Führen Sie eine willkürliche GraphQL-Abfrage gegen die Open Targets Platform API aus (Ziele, Krankheiten, Medikamente, Ziel-Krankheits-Assoziationen, Evidenz, Tragbarkeit, Sicherheit, bekannte Medikamente). Introspektionsabfragen funktionieren für die Schemaerkennung. Hinweis bekanntDrugs wurde in drugAndClinicalCandidates upstream umbenannt.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `variables` | Objekt | fakultativ |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs` {/* #open_targets_disease_drugs */}

Bekannte / investigative Medikamente für eine Krankheit (Open Targets Platform) - Wraps Disease.drugAndClinicalCandidates. efo_id ist eine Krankheitsontologie-ID (EFO/MONDO/etc., z.B. "MONDO_0004992".

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `efo_id` | Zeichenfolge | **erforderlich** |
| `size` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets` {/* #open_targets_disease_targets */}

Top assoziierte Ziele für eine Krankheit, geordnet nach Open Targets Gesamtassoziations-Score - Wraps Disease.associatedTargets. efo_id ist eine Krankheit Ontologie ID (EFO / MONDO / etc.).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `efo_id` | Zeichenfolge | **erforderlich** |
| `size` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug` {/* #open_targets_drug */}

Arzneimitteldetails nach ChEMBL-ID (Open Targets Platform) - Name, Typ, maximales klinisches Stadium und Wirkungsmechanismen (Ziel + Aktionstyp). chembl_id z.B. "CHEMBL1201583".

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `chembl_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## Strukturen & Wechselwirkungen {/* #family-9 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `emdb_get_entries` {/* #emdb_get_entries */}

Holen Sie strukturierte Metadatensätze für EMDB-Kryo-EM-3D-Karteneinträge ab. Akzeptiert Zugänge als 'EMD-1234', 'emd-1234' oder ' 1234'. Jeder Datensatz trägt Titel, Strukturbestimmungsmethode (SingleParticle / Helix / Tomography / SubtomogramAveraging / ElectronCrystallography), Auflösung in Angström (Null für Einträge ohne gemeldete Auflösung, z.B. Rohtomogramme) und die Auflösungsmethode, Ablagerungs-/Freigabedaten, Proben- und Makromolekül-/Supramolekül-Namen, angepasste PDB-Modell-IDs (Leerliste, wenn kein Modell angebracht ist), primäre Zitation (Journal, Jahr, Erstautor, DOI, PMID), Kartenabmessungen und Voxelgröße und Status. Veraltete Einträge melden is_obsolete=true plus superseded_by-Zugänge. Unbekannte Zugänge kommen zurück als &#123;"emdb_id", "error": "not_found"&#125; Niemals still fallen gelassen. Nur Metadaten; Kartenvolumen werden nie heruntergeladen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `emdb_ids` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries` {/* #emdb_search_entries */}

Suche nach EMDB mit einer Solr-Stil-Abfrage; vollständiges Seitenabrufen von kompakten Zeilen. Abfragebeispiele: 'title:"apoferritin" UND Auflösung:&#91;0 BIS 1.5&#93;', 'structure_determination_method:"singleParticle"', 'current_status:"REL" UND release_date:&#91;2024-01-01T00:00:00Z TO &#42;&#93;'. Args: Query (Solr Query String); max_rows (Zeilenobergrenze, Standard 1000). Gibt num_found_released zurück (die API's eigene freigegebene Eintrittszahl von der Facettenroute - Ground Truth), rows_retrieved, rows_by_status (REL vs OBS - die Suchroute gibt auch veraltete Einträge zurück, aber sie werden NICHT als freigegeben gezählt), released_complete (true iff every released match was retrieved); false bedeutet, dass max_rows den Sweep abgeschnitten hat oder die Zählungen nicht übereinstimmen) und Datensätze: kompakte pro-Eingangszeilen (emdb_id, Titel, Auflösung, structure_determination_method, current_status, release_date, fitted_pdbs), sortiert nach EMD-Anschluss.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `max_rows` | Ganzzahl | fakultativ; Standard: 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section` {/* #emdb_get_entry_section */}

Holen Sie sich einen detaillierten Metadaten-Abschnitt für EMDB-Einträge. Abschnitte: 'publications' - primäre Zitierung mit vollständiger geordneter Autorenliste, Hilfszitierungen, externe Referenzen (PMID/DOI/ISSN/CSD); 'map' — Datei, Format, Datentyp, Abmessungen, Voxelabstand, Ursprung, Achsenordnung, Zelle, Voxelstatistik, Konturebenen, Symmetrie; 'sample' — Aufzeichnungen über Makromoleküle (Typ, Molekulargewicht, Kopien, EG-Nummer, Quellorganismus + NCBI-Rolld, Sequenz-Cross-Refs) und Aufzeichnungen über Supramoleküle; 'imaging' — Mikroskop, Spannung, Elektronenquelle, Detektor, Dosis, Bildgebungsmodi, Defokusbereich, Vergrößerung, Cs, Kryogen, Gitter-/Puffer-/Verglasungsbedingungen (ein Datensatz pro Mikroskopiesitzung — Einträge können mehrere enthalten). Args: emdb_ids (Beitrittsliste, beliebige EMD-1234/emd-1234/1234); Abschnitt (eine der Veröffentlichungen/Karte/Probe/Bildgebung). Unbekannte Zugriffe werden mit "error" gemeldet: "not_found". Verwenden Sie emdb_get_entries zuerst, wenn Sie nur den Headline Record benötigen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `emdb_ids` | Array aus Zeichenfolgen | **erforderlich** |
| `section` | Zeichenfolge | **erforderlich**; enum: &#91;"publications", "map", "sample", "imaging"&#93; |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation` {/* #emdb_get_validation */}

Holen Sie numerische Validierungs-Analyse-Metriken für EMDB-Einträge ab. Pro Eintrag (aus der EMDB / Analyseroute): Q-Score, Atomeinschluss, empfohlene / vorhergesagte / Rohkarte Konturebenen, Modell / Maskenvolumen, Modell-Karten-Verhältnis, Oberflächenmetriken - wo die Validierungspipeline sie berechnet hat. available_blocks listet jeden Block auf, den der Validierungsdienst zurückgegeben hat; spärliche Nutzlasten (Tomogramme, modellfreie oder historische Einträge) ergeben explizite Nullen. Einträge ohne Validierungsanalysebericht has_validation_analysis=false — nie stillschweigend fallen gelassen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `emdb_ids` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes` {/* #complexportal_get_complexes */}

Fetch kuratierte Complex Portal Records durch CPX-Beitritt. Jeder Datensatz: Komplexe AC, empfohlene / systematische Namen + Synonyme, Arten und Rollen, Teilnehmerliste mit Stöchiometrie (Min/Max-Kopien), biologische Rolle und Interaktionstyp, Evidenz ECO-Code, GO-Annotationen und Querverweise - die manuell kuratierte Beschreibung eines stabilen makromolekularen Komplexes. Datensätze kommen in der Reihenfolge der Eingaben zurück; Unbekannte Accessions werden in `not_found` aufgeführt und nicht stillschweigend fallen gelassen. Für binäre Interaktion *Nachweise* (wer bindet wen in welchem Experiment) verwenden Sie stattdessen die intakten_&#42;-Tools.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `complex_acs` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant` {/* #complexportal_search_by_participant */}

Suchen Sie Komplex Portal nach Komplexen, die ein Molekül enthalten. `accession` ist ein Teilnehmerbeitritt — UniProt (z.B. 'P04637', ChEBI oder RNAcentral. Mit participants_only = true (Standard) ist die Suche feldqualifiziert (pxref:&lt;accession>), so dass nur Komplexe zurückgegeben werden, die tatsächlich das Molekül als kuratierten Teilnehmer enthalten; Mit false wird der nackte Beitritt auch als freier Text (Beschreibungen, Namen) abgeglichen, der zwar überberichtet, aber Erwähnungen abfangen kann. Alle Ergebnisseiten werden abgerufen und die Zeilenzahl wird mit der vom Dienst gemeldeten Gesamtsumme (total_reported == total_retrieved) verglichen, oder der Aufruf schlägt laut aus. Hits sind kompakte Datensätze (complex_ac, Name, Spezies, Interaktoren), sortiert nach komplexen Accession; Holen Sie sich alle Details mit complexportal_get_complexes.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |
| `participants_only` | boolescher Wert | fakultativ; Standard: true |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions` {/* #intact_fetch_interactions */}

Abrufen ALLER binären IntAct-Interaktionen, die mit einer Abfrage übereinstimmen, MI-Score gefiltert. `query` ist ein UniProt-Beitritt (z.B. 'P04637', Gensymbol, freier Text oder jede IntAct Solr-Abfrage. Retrieval ist ein vollständiger Paginen-Sweep, der gegen die vom Server gemeldete Gesamtmenge verifiziert wird (n_records == total_elements oder der Aufruf FAILS LOUDLY – silent truncation ist unmöglich). min_mi_score/max_mi_score filter-server-Seite auf dem IntAct MI-Vertrauenswert (0.45 ist eine gemeinsame Medium-Confidence-Ebene); interactor_species Filter nach Speziesname oder Rollen (z.B. &#91;"Homo sapiens"&#93; oder &#91;" 9606"&#93;. Die Datensätze sind schlank und strukturiert: Interaktionspaar (IntAct ACs, Datenbankidentifikatoren, Molekülnamen, Spezies/Taxide), Interaktionstyp, Nachweismethode (+MI ID), experimentelle Rollen, Wirtsorganismus, MI Score, PubMed ID, Erstautor, Quelldatenbank — sortiert nach DESCENDING MI Score. Ausgabelisten höchstens max_records_returned-Einträge (records_truncated = true, wenn der volle verifizierte Sweep größer war); n_records meldet immer die wahre Summe. Große Abfragen (z.B. CFTR ~10k Interaktionen) dauern eine Weile - eng mit min_mi_score oder Arten, wenn möglich.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `min_mi_score` | Zahl | fakultativ; Standard: 0 |
| `max_mi_score` | Zahl | fakultativ; Standard: 1 |
| `interactor_species` | Array aus Zeichenfolgen | fakultativ |
| `max_records_returned` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor` {/* #intact_get_interactor */}

Lösen Sie ein Molekül in seinen IntAct-Interaktor-Record(s). `query` ist ein UniProt-Zugang, ein Gensymbol oder ein IntAct-Interaktor AC (z.B. 'EBI-7090529'. Gibt ALLE übereinstimmenden Interaktordatensätze mit einem expliziten n_matches zurück - ein UniProt-Zugang kann sich auf das kanonische Protein plus Ketten-/Isoform-Interaktoren auflösen, und dieses Tool wählt niemals stillschweigend einen aus. Jeder Datensatz: interactor_ac, preferred_identifier, Name, Spezies, Taxid, interactor_type und der von IntAct gesehene interaction_count (nützlich für die Größenbestimmung eines intact_fetch_interactions-Sweeps).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details` {/* #intact_get_interaction_details */}

Vollständige kuratierte Details für ONE IntAct Interaktion AC (z.B.) 'EBI-15635490'. Gibt Interaktionstyp, Wirtsorganismus, Nachweismethode, Veröffentlichung, Querverweise, Anmerkungen, kinetische/affine Parameter und Konfidenzen sowie Datensätze pro Teilnehmer (Identifikator, Art, biologische und experimentelle Rolle, Nachweismethoden der Teilnehmer) zurück, es sei denn, include_participants = falsch. Erhalten Sie Interaktions-ACs aus intact_fetch_interactions-Einträgen (das interaction_ac-Feld). Unbekannte ACs geben &#123; zurück interaction_ac, Fehler: 'not_found' &#125;.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `interaction_ac` | Zeichenfolge | **erforderlich** |
| `include_participants` | boolescher Wert | fakultativ; Standard: true |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network` {/* #intact_build_network */}

Bauen Sie ein Tiefen-1-IntAct-Interaktionsnetzwerk um Saatgutproteine auf. `seed_accessions` sind UniProt-Zugänge. Schritt 1: ein vollständiger, zählverifizierter MI-Score-gefilterter Interaktionssweep pro Seed. Schritt 2: Die Partner jedes Seed Edges plus die Seeds bilden den Node Set. Schritt 3: Partner-Partner-Kanten sind nur durch Abfrage der Partner selbst erkennbar, so dass bis zu max_interactors_expanded-Partner abgefragt werden (meist verbunden zuerst, Bindungen nach Bezeichner) und Kanten mit beiden Endpunkten innerhalb des Knotensatzes beibehalten werden. Im Erweiterungsblock wird genau angegeben, welche Partner erweitert wurden/wurden (expansion.complete=false bedeutet, dass möglicherweise weitere Partner-Partner-Ränder vorhanden sind). Ausgabe: Knoten, Kanten (mit MI-Score, Nachweismethode, PubMed-ID), per-seed Sweep-Statistiken. Halten Sie Samen wenige und min_mi_score > = 0.45 - jede Erweiterung ist ein voller Paginen-Sweep.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `seed_accessions` | Array aus Zeichenfolgen | **erforderlich** |
| `min_mi_score` | Zahl | fakultativ; Standard: 0.45 |
| `max_interactors_expanded` | Ganzzahl | fakultativ; Standard: 25 |
| `interactor_species` | Array aus Zeichenfolgen | fakultativ |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures` {/* #pdb_search_structures */}

RCSB-PDB-Einträge nach Attributfiltern durchsuchen; paged, capped + flagged. alle Filter UND zusammen; Mindestens einer ist erforderlich. `text` ist eine Volltextrelevanzabfrage ('p53 DNA-Bindungsdomäne'); `organism` ist ein exakter Herkunftsname des Ursprungsorganismus ('Homo sapiens') — Übereinstimmungen auf jeder Linie Ebene, so 'Eukaryota' auch Arbeiten; `taxonomy_id` ein NCBI taxid (9606); `uniprot_accession` findet Einträge, deren Polymereinheiten diesem UniProt zugeordnet sind ('P04637') -> jede p53-Struktur; `experimental_method` ist das PDB-Vokabular ('X-RAY DIFFRACTION', 'ELECTRON MICROSCOPY', 'SOLUTION NMR', ...) - Fall-unempfindlich, unbekannte Werte Fehler mit der vollständigen Liste; `max_resolution_angstrom` hält Einträge auf oder unter dieser Auflösung; `ligand_comp_id` erfordert eine gebundene Nichtpolymerkomponente durch chem-comp id ('ZN', 'ATP', 'HEM'). include_computed_models = true addiert berechnete Strukturmodelle (z.B. AlphaFold) auf die Standardergebnisse nur für Experimente. Gibt total_count zurück (die API's eigene Übereinstimmung insgesamt — Ground Truth), n_retrieved, abgeschnitten (true iff total_count >) n_abgerufen; max_rows, 1..1000, Caps Retrieval und Records &#91;&#123;pdb_id, score&#125;&#93; in der Relevanzreihenfolge. Nur Identifikatoren — Kette zu pdb_get_structures für Metadaten.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `text` | Zeichenfolge | fakultativ |
| `organism` | Zeichenfolge | fakultativ |
| `taxonomy_id` | Ganzzahl | fakultativ |
| `uniprot_accession` | Zeichenfolge | fakultativ |
| `experimental_method` | Zeichenfolge | fakultativ |
| `max_resolution_angstrom` | Zahl | fakultativ |
| `ligand_comp_id` | Zeichenfolge | fakultativ |
| `include_computed_models` | boolescher Wert | fakultativ; Standard: falsch |
| `max_rows` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures` {/* #pdb_get_structures */}

Holen Sie Zusammenfassungen der Einstiegsstufe für PDB-Einträge ab (Charge, max. 25-IDs). Akzeptiert 4-Zeichen-PDB-IDs in jedem Fall (' 1tup') == ' 1TUP'; Duplikate werden de-dupliziert. Jeder Datensatz: Titel, experimentelle Methoden, Auflösung in Angström (Null für Methoden ohne eine, z.B. NMR), Bestimmungsmethodik (experimentell vs Computer), Depot / Freisetzung / Revision Daten und Status, Molekulargewicht (kDa), Assembler und Entitätszählungen (Protein / DNA / RNA Polymer + Nichtpolymer), gebundene Liganden chem-comp ids, Polymer / Nichtpolymer Entitäts-ID-Listen (Inputs für pdb_get_entities / pdb_get_ligands), und die primäre Zitierung (Titel, Zeitschrift, Jahr, Autoren, PubMed id, DOI). Unbekannte ids kommen zurück als &#123;"pdb_id", "error": "not_found"&#125; Niemals still fallen gelassen. Nur Metadaten; Koordinatendateien werden niemals heruntergeladen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pdb_ids` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities` {/* #pdb_get_entities */}

Angaben zur Polymereinheit für einen PDB-Eintrag, incl. UniProt Mappings. mit entity_ids= Null jede Polymereinheit des Eintrags wird abgeholt, gedeckelt auf 25 wobei truncated=true und n_polymer_entities den Eintrag melden's true count (große Baugruppen wie Ribosomen tragen) 50+ — Holen Sie sich die vollständige ID-Liste von pdb_get_structures' polymer_entity_ids und Seite mit expliziten Untergruppen wie &#91;" 26", " 27"&#93;; mit einer expliziten entity_ids-Untermenge wird die Eintragssumme nicht abgerufen, so dass n_polymer_entities null ist; eine explizite entity_ids-Liste größer als 25-Fehler. Jeder Datensatz: Beschreibung, Polymertyp (Protein / DNA / RNA), Sequenzlänge, Mutationszahl, hinterlegte Kopien, Ketten-IDs (asym + Autor), Quellorganismen mit Taxids, UniProt-Zugänge mit Per-Entity-Sequenzabdeckung (SIFTS) und UniProt-ausgerichtete Regionen (Entity-seq vs Referenz-seq-Koordinaten). Unbekannte Entity-IDs sind in not_found aufgeführt; Unbekannte Entry-ID-Fehler include_sequences = true fügt die kanonische Ein-Buchstaben-Sequenz pro Entität hinzu; Wenn die kombinierten Sequenzen max_bytes (Standard 400000) überschreiten, werden sie weggelassen und sequences_omitted erklärt, warum — Metadaten immer überleben.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pdb_id` | Zeichenfolge | **erforderlich** |
| `entity_ids` | Array aus Zeichenfolgen | fakultativ |
| `include_sequences` | boolescher Wert | fakultativ; Standard: falsch |
| `max_bytes` | Ganzzahl | fakultativ; Standard: 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands` {/* #pdb_get_ligands */}

Gebundene Liganden (nichtpolymere Komponenten) eines PDB-Eintrags, mit Chemie. Geht die Entitäten Entry's Nichtpolymer und löst jede chemische Komponente: pro Ligand - Entity-ID, chem-comp-ID ('ZN', 'ATP'), Beschreibung, hinterlegte Kopienzahl, Autorenkette-IDs und ein chem_comp-Block (Name, Formel, Formelgewicht, formale Ladung, Komponententyp, InChIKey, Stereo SMILES). Wasser sind keine nichtpolymeren Einheiten im PDB-Datenmodell und erscheinen nie. Einträge ohne Liganden geben Liganden zurück: &#91;&#93;. n_nonpolymer_entities ist die wahre Anzahl von entry's; truncated=true, wenn es max_ligands überschreitet (geklemmt an 1..25, was das Anforderungsbudget begrenzt) - niemals stillschweigend fallen gelassen. Entitäten/Komponenten, die die Daten API nicht mehr bedienen, werden inline mit "error" gemeldet: "not_found" (Teilergebnisse, kein abgebrochener Anruf). Eine unbekannte Entry ID Fehler.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pdb_id` | Zeichenfolge | **erforderlich** |
| `max_ligands` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction` {/* #alphafold_get_prediction */}

AlphaFold DB Predicted-Structure-Metadaten für einen UniProt-Beitritt. Gibt has_model, n_models und pro-model records zurück. Ein einzelner Zugriff kann mehrere Modelle tragen (kanonische + Isoformen wie 'P04637-9' und Community-Anbieter jenseits der Google DeepMind-Monomer-Pipeline - provider_id / tool_used identifizieren sie). Jedes Modell: Eintrags-ID, UniProt-Annotation (ID, Beschreibung, Gen, Organismus, Taxid, überprüfte Flaggen), Sequenzkoordinaten und -länge, globales pLDDT (global_plddt, 0-100) zuzüglich des Rückstandsanteils pro pLDDT-Konfidenzton (very_low &lt; 50, niedriges 50-70, zuversichtliches 70-90, very_high > 90), Informationen zur Modellversion und Erstellungsdatum sowie Download-URLs (cif/bcif/pdb-Koordinaten, PAE JSON + Bild, pro Rest pLDDT JSON, MSA, AlphaMissense CSV, sofern verfügbar) — nur URLs, Nutzlasten werden nie heruntergeladen; Holen Sie sie selbst, wenn nötig. Accessions ohne Prediction Return has_model=false (kein Fehler); Fehlformierte Identifikatoren geben ein explizites `error`-Feld zurück. include_sequence = true fügt die Modellsequenz hinzu (Protein-One-Buchstabe).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `uniprot_accession` | Zeichenfolge | **erforderlich** |
| `include_sequence` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage` {/* #alphafold_check_coverage */}

Batch AlphaFold DB-Abdeckungsprüfung (max. 40 eindeutige UniProt-Zugänge). Leereinträge und Duplikate werden abgestreift, bevor der Batch-Cap angewendet wird, und offenbart: n_requested == n_unique + n_blank_skipped + n_duplicate_skipped versöhnt sich immer. Ein kompakter Datensatz pro eindeutigem Beitritt, in der Eingabereihenfolge: has_model, n_models und das primäre (erste gelistete) Modell's model_entity_id, latest_version, global_plddt und sequence_length. Zugänge ohne Prädiktionsmeldung has_model = falsch; Fehlgebildete tragen ein explizites `error`-Feld - niemals stillschweigend fallen gelassen. Verwenden Sie die Triage, welche Proteine eines Sets über brauchbare vorhergesagte Strukturen verfügen, bevor Sie vollständige Datensätze mit alphafold_get_prediction erstellen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `uniprot_accessions` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## ChEMBL {/* #family-10 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `compound_search` {/* #compound_search */}

Suche ChEMBL chemische Verbindungen nach Namen (Standard), ChEMBL id oder molekulare Struktur. Nach Name: case-insensitives Synonym Substring Match (fällt auf eine Preferred-Name-Match zurück). Von chembl_id: Direct Record Lookup. Mit Lächeln: Tanimoto Ähnlichkeitssuche, wenn similarity_threshold gesetzt ist, sonst eine Unterstruktursuche (Strukturspaziergänge sind gedeckelt und zeigen walk_truncated/upstream_total). Optionale max_phase-Filter nach klinischem Stadium. Geben Sie mindestens einen Namen, chembl_id, oder Lächeln. Verwenden Sie stattdessen drug_search, wenn Sie nach therapeutischer Indikation suchen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `name` | Zeichenfolge | fakultativ |
| `chembl_id` | Zeichenfolge | fakultativ |
| `smiles` | Zeichenfolge | fakultativ |
| `similarity_threshold` | Ganzzahl | fakultativ; mindestens: 70; höchstens: 100 |
| `max_phase` | Ganzzahl | fakultativ; enum: &#91;0, 1, 2, 3, 4&#93; |
| `limit` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search` {/* #drug_search */}

Suchen Sie zugelassene Medikamente und klinische Kandidaten nach therapeutischer Indikation (EFO-Begriff, Teilübereinstimmung). Verbindet drug_indication-Zeilen zu unterschiedlichen Muttermolekülen, dann zu Moleküldatensätzen und Entnahme-/Black-Box-Warnungen. only_approved beschränkt sich auf die Phase 4. Optionale Postfilter molecule_chembl_id, drug_name (Preferred-Name-Substring) und max_phase (>=) verengen den verbundenen Satz. Verwenden Sie compound_search für Name/ID/Struktur-Lookups.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `indication` | Zeichenfolge | **erforderlich** |
| `drug_name` | Zeichenfolge | fakultativ |
| `molecule_chembl_id` | Zeichenfolge | fakultativ |
| `max_phase` | Ganzzahl | fakultativ; enum: &#91;0, 1, 2, 3, 4&#93; |
| `only_approved` | boolescher Wert | fakultativ; Standard: falsch |
| `limit` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet` {/* #get_admet */}

Retrieve ChEMBL berechnete molekulare Eigenschaften für die Arzneimittelähnlichkeit / ADMET-Bewertung eines Moleküls (ALogP, Molekulargewicht, PSA, HBA / HBD, drehbare Bindungen, aromatische Ringe, schwere Atome, Regel-of-5-Verstöße, Regel-of-3-Pass, QED, Molekularformel). Diese werden aus der Struktur berechnet, nicht aus experimentellen Messungen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `molecule_chembl_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity` {/* #get_bioactivity */}

ChEMBL-Bioaktivitätsmessungen (IC50, Ki, Kd, EC50, ...) für Verbindungen-Ziel-Wechselwirkungen abrufen. Filtern nach molecule_chembl_id und/oder target_chembl_id, activity_type (standard_type), einem pChEMBL-Boden (min_pchembl), einem standard_value-Bereich (min_value/max_value) und Einheit (standard_units). Gibt eine von activity_id bestellte Seite mit einer höchstpotenten Zusammenfassung zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `molecule_chembl_id` | Zeichenfolge | fakultativ |
| `target_chembl_id` | Zeichenfolge | fakultativ |
| `activity_type` | Zeichenfolge | fakultativ; enum: &#91;"IC50", "EC50", "Ki", "Kd", "AC50", "GI50", "ED50", "Potency"&#93; |
| `min_pchembl` | Zahl | fakultativ; mindestens: 0; höchstens: 14 |
| `min_value` | Zahl | fakultativ |
| `max_value` | Zahl | fakultativ |
| `unit` | Zeichenfolge | fakultativ; enum: &#91;"nM", "uM", "mM", "pM", "M"&#93; |
| `limit` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism` {/* #get_mechanism */}

Retrieve ChEMBL-Mechanismus-of-Action-Datensätze für zugelassene Medikamente und klinische Kandidaten. Filtern nach molecule_chembl_id, target_chembl_id und/oder action_type. Wenn eine Molekül-ID nichts liefert, versucht gegen das Muttermolekül so Salz-Form-IDs zu lösen. Gibt eine von mec_id bestellte Seite mit einer Zusammenfassung des Aktionstyps zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `molecule_chembl_id` | Zeichenfolge | fakultativ |
| `target_chembl_id` | Zeichenfolge | fakultativ |
| `action_type` | Zeichenfolge | fakultativ; enum: &#91;"INHIBITOR", "AGONIST", "ANTAGONIST", "BLOCKER", "MODULATOR", "OPENER", "ACTIVATOR", "POSITIVE ALLOSTERIC MODULATOR", "NEGATIVE ALLOSTERIC MODULATOR", "PARTIAL AGONIST", "INVERSE AGONIST"&#93; |
| `limit` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search` {/* #target_search */}

Suche nach biologischen ChEMBL-Zielen (Proteine, Komplexe, Familien, Organismen). Filtern nach target_chembl_id, gene_symbol (genaue Komponenten-Synonym-Match), target_name (Preferred-Name-Substring), Organismus (Substring) und/oder target_type. Jedes Ergebnis trägt seine Komponenten mit UniProt-Zugängen, einem gene_symbol und begrenzten Querverweislisten.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `target_name` | Zeichenfolge | fakultativ |
| `gene_symbol` | Zeichenfolge | fakultativ |
| `target_chembl_id` | Zeichenfolge | fakultativ |
| `organism` | Zeichenfolge | fakultativ |
| `target_type` | Zeichenfolge | fakultativ; enum: &#91;"SINGLE PROTEIN", "PROTEIN COMPLEX", "PROTEIN FAMILY", "ORGANISM", "TISSUE", "CELL-LINE", "NUCLEIC-ACID", "SUBCELLULAR"&#93; |
| `limit` | Ganzzahl | fakultativ; Standard: 20; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## bioRxiv {/* #family-11 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `get_categories` {/* #get_categories */}

Liste alle 27 bioRxiv Themenkategorien und ihre API-kompatiblen Slugs (z.B.) "Krebsbiologie" -> "cancer_biology"). Verwenden Sie vor search_preprints, um gültige Kategoriewerte zu ermitteln.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints` {/* #search_preprints */}

Suche bioRxiv/medRxiv Preprints nach Datum und (optional) Kategorie. Verwenden Sie genau EINE Suchmethode: date_from + date_to, recent_days (letzte N Tage) oder recent_count (letzte N innerhalb eines 90-Tagesfensters); ohne, die letzten 60 Tage. Es gibt keine Keyword/Textsuche. Cursor Paginate. Gibt DOI, Titel, Autoren, Datum, Kategorie, Version und eine 200-Char-Abstract-Vorschau zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `server` | Zeichenfolge | fakultativ; Standard: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `category` | Zeichenfolge | fakultativ; enum: &#91;"Verhalten und Kognition von Tieren", "Biochemie", "Bioengineering", "Bioinformatik", "Biophysik", "Krebsbiologie", "Zellbiologie", "Klinische Prüfungen", "Entwicklungsbiologie", "Ökologie", "Epidemiologie", "Evolutionsbiologie", "Genetik", "Genomik", "Immunologie", "Mikrobiologie", "Molekularbiologie", "Neurowissenschaften", "Paläontologie", "Pathologie", "Pharmakologie und Toxikologie", "Physiologie", "Pflanzenbiologie", "Wissenschaftliche Kommunikation und Bildung", "Synthetische Biologie", "Systembiologie", "Zoologie"&#93; |
| `date_from` | Zeichenfolge | fakultativ |
| `date_to` | Zeichenfolge | fakultativ |
| `recent_days` | Ganzzahl | fakultativ; mindestens: 1 |
| `recent_count` | Ganzzahl | fakultativ; mindestens: 1 |
| `limit` | Ganzzahl | fakultativ; Standard: 10; mindestens: 1; höchstens: 100 |
| `cursor` | Ganzzahl | fakultativ; Standard: 0; mindestens: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint` {/* #get_preprint */}

Erhalten Sie vollständige Metadaten für einen Vordruck von DOI (Blatt " 10.1101/...") oder eine vollständige [https://doi.org/](https://doi.org/) URL. Verwendet die neueste Version. Gibt Titel, Autoren, entsprechenden Autor + Institution, vollständige Abstract, Kategorie, Lizenz, Version, JATS XML, Finanzierung, veröffentlichte Zeitschrift DOI (falls verknüpft), PDF und Web-URLs und Versionszahl zurück. Preprints werden nicht peer-reviewed.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `doi` | Zeichenfolge | **erforderlich** |
| `server` | Zeichenfolge | fakultativ; Standard: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints` {/* #search_published_preprints */}

Finden Sie Preprints, die später in Peer-Review-Zeitschriften veröffentlicht wurden (Preprint ->) Journal-Artikel-Links. Gleiche ONE-OF Suchmethoden wie search_preprints (date_from + date_to / recent_days / recent_count). include_details=false gibt eine kompakte Zusammenfassung zurück. Herausgeberfilter nach Zeitschrift DOI Präfix (z.B. "10.1038" für Nature) über die bioRxiv-only /publisher Route.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `server` | Zeichenfolge | fakultativ; Standard: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `publisher` | Zeichenfolge | fakultativ |
| `include_details` | boolescher Wert | fakultativ; Standard: true |
| `date_from` | Zeichenfolge | fakultativ |
| `date_to` | Zeichenfolge | fakultativ |
| `recent_days` | Ganzzahl | fakultativ; mindestens: 1 |
| `recent_count` | Ganzzahl | fakultativ; mindestens: 1 |
| `limit` | Ganzzahl | fakultativ; Standard: 10; mindestens: 1; höchstens: 100 |
| `cursor` | Ganzzahl | fakultativ; Standard: 0; mindestens: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder` {/* #search_by_funder */}

Finden Sie Preprints, die einen Funder bestätigen, identifiziert durch ROR-ID (9-char, z.B. " 021nxhr62" für NIH; Eine vollständige [https://ror.org/](https://ror.org/) URL wird ebenfalls akzeptiert. Erfordert eine explizite date_from + date_to; Funder-Metadaten beginnen mit 2025-04-10. Filter für die fakultative Kategorie. Cursor Paginate. Gleiche kompakte Ergebnisform wie search_preprints.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `funder_ror_id` | Zeichenfolge | **erforderlich** |
| `date_from` | Zeichenfolge | **erforderlich** |
| `date_to` | Zeichenfolge | **erforderlich** |
| `server` | Zeichenfolge | fakultativ; Standard: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `category` | Zeichenfolge | fakultativ; enum: &#91;"Verhalten und Kognition von Tieren", "Biochemie", "Bioengineering", "Bioinformatik", "Biophysik", "Krebsbiologie", "Zellbiologie", "Klinische Prüfungen", "Entwicklungsbiologie", "Ökologie", "Epidemiologie", "Evolutionsbiologie", "Genetik", "Genomik", "Immunologie", "Mikrobiologie", "Molekularbiologie", "Neurowissenschaften", "Paläontologie", "Pathologie", "Pharmakologie und Toxikologie", "Physiologie", "Pflanzenbiologie", "Wissenschaftliche Kommunikation und Bildung", "Synthetische Biologie", "Systembiologie", "Zoologie"&#93; |
| `limit` | Ganzzahl | fakultativ; Standard: 10; mindestens: 1; höchstens: 100 |
| `cursor` | Ganzzahl | fakultativ; Standard: 0; mindestens: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics` {/* #get_content_statistics */}

BioRxiv-Einreichungsstatistiken über die gesamte Historie — neue vs. revidierte Papierzählungen pro Periode, mit laufenden kumulativen Gesamtsummen. Intervall ist "monthly" (Standard) oder "yearly".

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `interval` | Zeichenfolge | fakultativ; Standard: "monthly"; enum: &#91;"monthly", "yearly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics` {/* #get_usage_statistics */}

bioRxiv Nutzungs-/Engagement-Statistiken über den gesamten Verlauf — abstrakte Ansichten, Volltextansichten und PDF Downloads pro Periode, mit kumulativen Gesamtsummen. Intervall ist "monthly" (Standard) oder "yearly".

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `interval` | Zeichenfolge | fakultativ; Standard: "monthly"; enum: &#91;"monthly", "yearly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## Arzneimittelregulierung {/* #family-12 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `search_drug_applications` {/* #search_drug_applications */}

Search Drugs@FDA-Anwendungen (NDA/ANDA/BLA) durch eine beliebige Kombination von exakten Phrasenfiltern (Marke, Generika, active_ingredient, Sponsor, marketing_status, dosage_form, Route, pharm_class). Generische und pharm_class Abfrage der harmonisierten openfda-Block (abwesend auf ältere Anwendungen, so leise übersprungen dort). Eine breite Suche gibt das erste max_records mit dem true total und truncated=true zurück; Seite über ~ 26,000-Datensätze hinaus, eng mit submission_date_from/to.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `brand` | Zeichenfolge | fakultativ |
| `generic` | Zeichenfolge | fakultativ |
| `active_ingredient` | Zeichenfolge | fakultativ |
| `sponsor` | Zeichenfolge | fakultativ |
| `marketing_status` | Zeichenfolge | fakultativ; enum: &#91;"Prescription", "Over-the-counter", "Discontinued", "None (Vorläufige Genehmigung)"&#93; |
| `dosage_form` | Zeichenfolge | fakultativ |
| `route` | Zeichenfolge | fakultativ |
| `pharm_class` | Zeichenfolge | fakultativ |
| `pharm_class_type` | Zeichenfolge | fakultativ; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `search_type` | Zeichenfolge | fakultativ; Standard: "and"; enum: &#91;"and", "or"&#93; |
| `submission_date_from` | Zeichenfolge | fakultativ |
| `submission_date_to` | Zeichenfolge | fakultativ |
| `raw_search` | Zeichenfolge | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application` {/* #get_drug_application */}

Holen Sie sich einen Drugs@FDA-Antrag nach seiner Nummer (z.B.) "NDA020702", "ANDA076543", "BLA125514". Gibt den vollständigen Datensatz zurück - Sponsor, Produkte (Marke, Wirkstoffe + Stärken, Darreichungsform, Route, Marketingstatus, TE-Code), vollständige Einreichungshistorie und harmonisierte OpenFDA-Felder, wenn vorhanden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `application_number` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications` {/* #count_drug_applications */}

Aggregate Drugs@FDA Bucket zählt über ein Feld, optional eingeengt durch die gleichen Filter wie search_drug_applications. count_field akzeptiert freundliche Namen (sponsor_name, application_number, dosage_form, Route, marketing_status, te_code, pharm_class_epc/moa/cs/pe) oder einen rohen openFDA-Feldpfad (fügen Sie .exact yourself für analysierte Felder an).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `count_field` | Zeichenfolge | **erforderlich** |
| `brand` | Zeichenfolge | fakultativ |
| `generic` | Zeichenfolge | fakultativ |
| `active_ingredient` | Zeichenfolge | fakultativ |
| `sponsor` | Zeichenfolge | fakultativ |
| `marketing_status` | Zeichenfolge | fakultativ |
| `dosage_form` | Zeichenfolge | fakultativ |
| `route` | Zeichenfolge | fakultativ |
| `pharm_class` | Zeichenfolge | fakultativ |
| `pharm_class_type` | Zeichenfolge | fakultativ; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `search_type` | Zeichenfolge | fakultativ; Standard: "and"; enum: &#91;"and", "or"&#93; |
| `submission_date_from` | Zeichenfolge | fakultativ |
| `submission_date_to` | Zeichenfolge | fakultativ |
| `raw_search` | Zeichenfolge | fakultativ |
| `max_buckets` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics` {/* #get_drug_statistics */}

Drugs@FDA-Statistiken auf Corpus-Ebene in einem Aufruf - Gesamtanträge, Marketing-Status-Split, Top-Dosierungsformen und -routen (mit unterschiedlichen Zählungen) und Top-Sponsoren nach Anwendungszahl.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes` {/* #list_pharmacologic_classes */}

Aufzählen der pharmakologischen Klassen mit ihren Anwendungszählungen, gezählt über die harmonisierte openfda.pharm_class_&lt;type> Block. Counts reflektieren nur Anwendungen, die diesen Block tragen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `class_type` | Zeichenfolge | fakultativ; Standard: "epc"; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `max_buckets` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents` {/* #get_generic_equivalents */}

Finden Sie generische Äquivalente eines Markenarzneimittels: Lösen Sie die Marke in ihre Referenzanwendung(en), extrahieren Sie den genauen Namenssatz/die Namen für aktive Inhaltsstoffe und geben Sie dann jede Drugs@FDA-Anwendung mit einem Produkt zurück, dessen Satz für aktive Inhaltsstoffe übereinstimmt (einschließlich TE-Codes und Marketingstatus).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `brand` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels` {/* #search_drug_labels */}

Retrieve FDA Drug Product Labels (SPL) nach Inhaltsstoff / Name / Route mit gezielten Abschnitt Extraktion. Filter (active_ingredient, generic_name, brand_name, Route, product_type) treffen auf den openfda-Labelblock; Setzen Sie genau, um die nicht analysierten .exact Varianten abzufragen. Übergeben Sie Abschnitte, um rohe openFDA-Labelabschnitte anstelle des standardmäßig strukturierten Datensatzes zu extrahieren. raw_search schließt sich gegenseitig mit den abgebildeten Filtern aus.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `active_ingredient` | Zeichenfolge | fakultativ |
| `generic_name` | Zeichenfolge | fakultativ |
| `brand_name` | Zeichenfolge | fakultativ |
| `route` | Zeichenfolge | fakultativ |
| `product_type` | Zeichenfolge | fakultativ; enum: &#91;"HUMAN PRESCRIPTION DRUG", "HUMAN OTC DRUG"&#93; |
| `exact` | boolescher Wert | fakultativ; Standard: falsch |
| `raw_search` | Zeichenfolge | fakultativ |
| `sections` | Array aus Zeichenfolgen | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## Humangenetik {/* #family-13 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `gwas_associations_for_variant` {/* #gwas_associations_for_variant */}

GWAS-Katalogverbände berichteten für eine Variante (rsID), die wichtigste zuerst. Args: rs_id (dbSNP rsID z.B. rs7412 APOE oder rs699 AGT; muss die aktuelle rsID von catalog' sein — Merged/Rentner-IDs können anstelle eines Fehlers Nullzeilen zurückgeben; max_records (Ausgangsobergrenze Standard 500); Trait-Hub-Varianten können 1000+-Assoziationen tragen; Zeilen werden vom Server nach aufsteigendem p-Wert sortiert, so dass ein gedeckeltes Ergebnis das obere Signalpräfix ist. Rückgabe &#123;rs_id, api_total, zurückgegeben, abgeschnitten, Assoziationen&#125;. api_total ist der Katalog's eigene Summe; gekürzte Flaggen ein gedeckelter Fetch. Jede Assoziationszeile: &#123;association_id, p_value, pvalue_mantissa, pvalue_exponent, pvalue_description, or_value, beta, ci_lower, ci_upper, range, risk_frequency, snp_effect_alleles, rs_ids, locations, mapped_genes, efo_traits:&#91;&#123;efo_id, efo_trait&#125;&#93;, bg_efo_traits, reported_trait, multi_snp_haplotype, snp_interaction, study_accession_id, pubmed_id, first_author&#125;. or_value und Beta schließen sich pro Zeile gegenseitig aus (binär vs. quantitativ); p_Wert von 0.0 bedeutet p &lt; ~1e-308 (verwenden Sie Mantissa / Exponent).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `rs_id` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene` {/* #gwas_associations_for_gene */}

GWAS-Katalog-Assoziationen, deren Varianten zu einem Gen MAPPED sind (catalog's Ensembl Pipeline-Mapping, nicht von Autoren berichtet), am wichtigsten zuerst. Args: gene_symbol (HGNC-Symbol, exakte Übereinstimmung, z.B. PCSK9, APOE; case-sensitive upstream — kanonische Großbuchstaben passieren; intergene Varianten zu flankierenden Genen abbilden, so dass sich Reihen außerhalb des Genkörpers befinden können; max_records (Cap Default 500) Server-sortiert nach p-Wert aufsteigend. Returns &#123;gene_symbol, api_total, zurückgegeben, abgeschnitten, Assoziationen&#125; mit der gleichen Zeilenform wie gwas_associations_for_variant. Ein nicht vorhandenes Symbol gibt api_total=0 zurück, keinen Fehler.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait` {/* #gwas_associations_for_trait */}

GWAS-Katalogverbände kommentierten ein EFO-Merkmal, das wichtigste zuerst. Args: efo_id (Ontologie-Begriff Kurzform, wie er vom Katalog verwendet wird, z.B. MONDO_0005010, EFO_0004340, HP_0003124; Der Katalog migrierte viele historische EFO-IDs zu MONDO/HP — lösen Sie zuerst aktuelle IDs mit gwas_search_traits auf; Pass genau eine von efo_id/efo_trait; efo_trait (genaue Eigenschaft LABEL Alternative); max_records (Cap Default 500) Zeilen p-Wert aufsteigend. Returns &#123;efo_id&#124;efo_trait, api_total, zurückgegeben, abgeschnitten, Assoziationen&#125; mit der gleichen Zeilenform wie gwas_associations_for_variant. Eine unbekannte ID/Label gibt api_total=0 zurück, keinen Fehler.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `efo_id` | Zeichenfolge | fakultativ |
| `efo_trait` | Zeichenfolge | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits` {/* #gwas_search_traits */}

Suchen Sie nach GWAS Catalog EFO-Eigenschaftsanmerkungen nach Label-Substring - dem Einstiegspunkt für die Auflösung eines Krankheits- / Phänotypnamens in die Ontologie-IDs, die gwas_associations_for_trait / gwas_search_studies einnehmen. Args: Abfrage (case-insensitive Substring des Trait Labels, z.B. "coronary" Übereinstimmungen koronare Herzkrankheit MONDO_0005010 usw.; die Katalogmischungen EFO, MONDO, HP und OBA-IDs — don't nehmen ein Präfix EFO_ an; max_records (Cap Default 500). Returns &#123;query, api_total, returned, abgeschnitten, efo_traits&#125;; jede Zeile &#123;efo_id, efo_trait, uri&#125; nach Etikett sortiert. Count-verifiziert gegen den Katalog's eigenen Gesamt wenn nicht gedeckelt.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies` {/* #gwas_search_studies */}

Durchsuchen Sie GWAS-Katalogstudien nach Merkmalsannotation oder Veröffentlichung. Args: efo_id (ontologische Kurzform, z.B. MONDO_0005010, über gwas_search_traits auflösen; Filter kombinieren UND — in der Regel passieren eins; efo_trait (exakte Merkmalskennzeichnung Alternative); pubmed_id (PubMed ID der Studie's Publikation, z.B. 38714703); max_records (Cap Default 500). Returns &#123;filters, api_total, returned, abgeschnitten, studies&#125;; jede Studienzeile &#123;accession_id, disease_trait, efo_traits, bg_efo_traits, pubmed_id, initial_sample_size, replication_sample_size, discovery_ancestry, replication_ancestry, genotyping_technologies, Plattformen, Kohorte, full_summary_stats_available, unterstellt, gxe, gxg&#125;. Count-verifiziert gegen den Katalog insgesamt, wenn nicht gedeckelt. Mindestens ein Filter ist erforderlich (der ungefilterte Katalog ist ~ 90k Studien).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `efo_id` | Zeichenfolge | fakultativ |
| `efo_trait` | Zeichenfolge | fakultativ |
| `pubmed_id` | Zeichenfolge | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study` {/* #gwas_get_study */}

Holen Sie sich eine GWAS-Katalogstudie durch ihren GCST-Beitritt. Args: accession_id (Studienanschluß, z.B. GCST90841394; in jeder Assoziationszeile als study_accession_id und in den Studiensuchergebnissen aufgeführt. Returns &#123;found, accession_id, study&#125; wobei die Studie dieselbe Zeilenform wie gwas_search_studies hat (Null, wenn der Beitritt unbekannt ist).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant` {/* #gwas_get_variant */}

Holen Sie sich einen GWAS-Katalog-Variantendatensatz (Position, kartierte Gene, Folge) durch rsID - leichter als das Ziehen seiner Assoziationen. Args: rs_id (dbSNP rsID z.B. rs7412. Gibt &#123;found, rs_id, Variante&#125; zurück; Eine Variante ist &#123;rs_id, fusioniert, functional_class, most_severe_consequence, Allele (z.B. "C/T (vorwärts)", mapped_genes, Standorte:&#91;&#123;Chromosom, Position, Region&#125;&#93;, last_update_date&#125; - Positionen GRCh38 - oder null, wenn die rsID nicht im Katalog enthalten ist. merged=1 bedeutet, dass die rsID stromaufwärts zu einem anderen Datensatz zusammengeführt wurde.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `rs_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets` {/* #eqtl_list_datasets */}

Liste der eQTL-Katalogdatensätze (ein Datensatz = eine Studie x Gewebe-/Zelltyp x Quantifizierungsmethode). Args: study_label (genauer Studienname, z.B. GTEx, Alasoo_2018, BLUEPRINT tissue_label (genaue Gewebe/Zell-Typ-Etikette, z.B. Leber, Makrophagen, LCL — Kleinbuchstaben im Katalog; quant_method (ge = Genexpression, Exon, tx, txrev, Microarray, Blattschneider, Aptamer = Plasmaprotein); für konventionelle Gen-Level-eQTLs ge verwenden; max_records (Cap Default 1000) Der vollständige ungefilterte Katalog ist ~ 760 Datensätze. Gibt &#123;filters zurück, zurückgegeben, abgeschnitten, datasets&#125; sortiert nach dataset_id; &#123;dataset_id (QTD...), study_id (QTS...), study_label, sample_group, tissue_id, tissue_label, condition_label, quant_method, sample_size&#125;. Der API veröffentlicht keine Gesamtzählung; truncated=false beweist, dass die Auflistung vollständig ist.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `study_label` | Zeichenfolge | fakultativ |
| `tissue_label` | Zeichenfolge | fakultativ |
| `quant_method` | Zeichenfolge | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations` {/* #eqtl_associations */}

Molekular-QTL-Assoziationszeilen aus einem eQTL-Katalogdatensatz, gefiltert nach Gen, Variante oder Region. Args: dataset_id (QTD-Zugang aus eqtl_list_datasets, z.B. QTD000266; gene_id (unversionierte Ensembl-Gen-ID z.B.) ENSG00000130203 APOE; mindestens eines von gene_id/Rsid/Variante/pos erforderlich ist; rsid (dbSNP rsID); Variante (eQTL Catalogue variant string chr19_44908822_C_T, chr-präfixiertes Unterstrich GRCh38); Pos (genomisches Fensterchromosom:Start-Ende GRCh38 no chr Präfix, z.B. 19:44900000-44920000); nlog10p_min (significance floor: only rows with -log10(p) >= this, applied upstream); max_records (Cap Default 1000 = eine Seite). Rückgabe &#123;dataset_id, Filter, zurückgeführt, abgeschnitten, Assoziationen&#125;; jede Zeile &#123;molecular_trait_id, gene_id, Variante, rsid, Chromosom, Position, ref, alt, Typ, beta, se, pvalue, nlog10p, maf, ac, an, r2, median_tpm&#125;. Zeilen umfassen NUR das cis-Fenster des getesteten Datensatzes (±1 Mb jedes Gens); leer bedeutet "nicht getestet / nicht vorhanden". Es wird keine Gesamtzählung veröffentlicht: truncated=false beweist Erschöpfung, truncated=true bedeutet, dass die Kappe getroffen wurde.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `dataset_id` | Zeichenfolge | **erforderlich** |
| `gene_id` | Zeichenfolge | fakultativ |
| `rsid` | Zeichenfolge | fakultativ |
| `variant` | Zeichenfolge | fakultativ |
| `pos` | Zeichenfolge | fakultativ |
| `nlog10p_min` | Zahl | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances` {/* #phewas_instances */}

Listen Sie die öffentlichen PheWeb PheWAS-Portale auf, die dieser Server abfragen kann, mit Genomaufbau und Fähigkeitsregistrierung. Gibt &#123;instances:&#123;key:&#123;label, base_url, genome_build, capabilities, notes&#125;&#125;&#125; zurück. Fähigkeiten benennen die Endpunkte, die jede Instanz exponiert: Variante (phewas_variant), Gen (phewas_finngen_gene), Phänotypen (phewas_list_phenotypes), Autovervollständigung (phewas_search_phenotypes). HINWEIS auf die Build-Split: FinnGen R12-Varianten-IDs sind GRCh38; BioBank Japan (pheweb.jp) ist GRCh37/hg19 — Liftover-Koordinaten vor dem Querabfragen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant` {/* #phewas_variant */}

PheWAS für eine Variante: seine Assoziation Statistiken gegen jeden Phänotyp in einer Biobank PheWeb-Portal, am wichtigsten zuerst. Args: Instanz (finngen FinnGen R12 GRCh38 oder bbj BioBank Japan GRCh37); Variantenkoords MÜSSEN auf dem instanz's-Build sein; Variante (chrom-pos-ref-alt, :/_ Separatoren und chr-Präfix toleriert, z.B. 19-44908822-C-T APOE rs7412 GRCh38/finngen oder 1-55505647-G-T PCSK9 rs11591147 GRCh37/bbj; max_phenos (Cap Default 200) FinnGen gibt ~2470 Zeilen zurück; sortiert nach p-Wert aufsteigend vor dem Capping. Returns &#123;instance, genome_build, Variante, variant_meta, total, returned, truncated, phenotypes&#125;; variant_meta &#123;chrom, pos, ref, alt, rsids, nearest_genes, gnomad (nur FinnGen)&#125;. Jede Phänotypzeile &#123;phenocode, Phenostring, Kategorie, pval, mlogp, beta, sebeta, af&#124;maf, maf_case, maf_control, n_cases, n_controls, n_samples&#125; (unveröffentlichte Felder null); BBJ-Zeilen haben af, FinnGen-Zeilen haben maf-Triplets + mlogp. Unbekannte Varianten werfen einen nicht gefundenen Fehler auf.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `instance` | Zeichenfolge | **erforderlich**; enum: &#91;"finngen", "bbj"&#93; |
| `variant` | Zeichenfolge | **erforderlich** |
| `max_phenos` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene` {/* #phewas_finngen_gene */}

Gen-Level PheWAS aus FinnGen R12: für jeden Krankheitsendpunkt die am besten assoziierte Variante in der Genregion, am wichtigsten zuerst. Args: gene_symbol (HGNC Symbol z.B.) PCSK9, APOE; unbekannte Symbole einen nicht gefundenen Fehler verursachen; max_phenos (Cap Default 200) FinnGen hat ~2470-Endpunkte, je eine Zeile; sortiert nach p-Wert aufsteigend vor dem Capping. &#123;instance:"finngen", genome_build:"GRCh38", gene_symbol, total, returned, truncated, phenotypes&#125;; jede Zeile ist die phewas_variant Zeilenform plus Variante:&#123;chrom, pos, ref, alt, varid, rsids&#125; — die Top-Variante für diesen Endpunkt in dieser Gen's-Region (Region != Genkörper); PheWeb Pads Gengrenzen. Die meisten Zeilen sind Null-Ergebnisse (pval)~1) — die pro-Endpunkt-BEST-Variante wird immer noch gemeldet; Filtern Sie nach Pval selbst für signifikante Hits.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | **erforderlich** |
| `max_phenos` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes` {/* #phewas_list_phenotypes */}

Vollständiger Phänotyp-Katalog (Krankheitsendpunkt) einer PheWeb-Instanz mit Fall- / Kontrollzählungen. Args: Instanz (derzeit setzt nur Finngen diesen Endpunkt frei); BBJ nicht — verwenden Sie phewas_search_phenotypes dort; max_records (Cap Default 3000 >) FinnGen's ~2470 Endpunkte, so dass der Standard den kompletten Katalog zurückgibt. Returns &#123;instance, total, returned, abgeschnitten, Phänotypen&#125; nach Phenocode sortiert; jede Zeile &#123;phenocode (z.B. "T2D"), Phenostring, Kategorie, num_cases, num_controls, num_gw_significant (Anzahl der genomweit signifikanten Loci für diesen Endpunkt)&#125;.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `instance` | Zeichenfolge | fakultativ; Standard: "finngen"; enum: &#91;"finngen"&#93; |
| `max_records` | Ganzzahl | fakultativ; Standard: 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes` {/* #phewas_search_phenotypes */}

Durchsuchen Sie einen PheWeb-Instanz's-Phänotypen (und Entitäten) nach Namen - der Einstiegspunkt für die Auflösung eines Krankheitsnamens in einen Phenocode. Args: Abfrage (Freitext-Phänotypabfrage z.B. "diabetes", "asthma"; übereinstimmende Phänotypnamen/-codes; Einige Instanzen stimmen auch mit Gennamen und rsIDs überein; Instanz (finngen default oder bbj — beide exponieren autocomplete); max_records (Cap Default 500) Autocomplete-Antworten sind kurze Listen, selten gedeckelt. Returns &#123;instance, Query, total, returned, truncated, matches&#125;; jede Übereinstimmung &#123;display, phenocode, url&#125;. Verwenden Sie den Phenocode mit phewas_list_phenotypes-Zeilen oder die Instanz-Website; BBJ Display Strings betten den Code in Klammern ein.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `instance` | Zeichenfolge | fakultativ; Standard: "finngen"; enum: &#91;"finngen", "bbj"&#93; |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## Ausdruck {/* #family-14 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `gtex_tissue_sites` {/* #gtex_tissue_sites */}

Listen Sie alle Gewebestellen mit Metadaten für eine angeheftete GTEx-Veröffentlichung auf (54 in gtex_v8): Probenzahl, eGene/sGene-Zahl, Farbcodes und UBERON-Ontologie-IDs.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info` {/* #gtex_dataset_info */}

Listen Sie alle GTEx-Dataset-Releases mit Metadaten auf: datasetId, GENCODE-Version, Genomaufbau, dbSNP-Bau und Proben-/Subjekt-/Gewebezahl.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `dataset_id` | Zeichenfolge | fakultativ |
| `organization_name` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info` {/* #gtex_sample_info */}

Sample- und Donor-Metadaten für eine angeheftete GTEx-Freigabe, optional gefiltert nach tissue_site_detail_id, data_type (z.B. RNASEQ, WGS oder subject_id. Seiten- und zählverifiziert; ein ungefilterter Anruf entspricht Zehntausenden von Samples, also filtern oder setzen Sie max_samples.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `tissue_site_detail_id` | Zeichenfolge | fakultativ |
| `data_type` | Zeichenfolge | fakultativ |
| `subject_id` | Zeichenfolge | fakultativ |
| `max_samples` | Ganzzahl | fakultativ |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes` {/* #gtex_resolve_genes */}

Lösen Sie Gensymbole oder unversionierte Ensembl-IDs auf versionierte GENCODE-IDs für eine angeheftete Freisetzung, z.B. GAPDH -> ENSG00000111640.14. Füttern Sie die IDs an die Ausdruck / eQTL-Tools.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `genes` | Array aus Zeichenfolgen | **erforderlich** | 7 / 0 / 0 |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression` {/* #gtex_median_expression */}

Mediane Genexpression (TPM) für eine oder mehrere VERSIONIERTE GENCODE-IDs über Gewebe hinweg (Gewebe für alle weglassen). Seiten- und zählverifizierte Zeilen (Gen, Gewebe).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gencode_ids` | Array aus Zeichenfolgen | **erforderlich** |
| `tissue_site_detail_ids` | Array aus Zeichenfolgen | fakultativ |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary` {/* #gtex_expression_summary */}

Fassen Sie die Expression eines Gens in ALLEN Geweben zusammen, die nach dem absteigenden Median TPM geordnet sind. Akzeptiert ein Symbol oder eine Ensembl-ID und löst es automatisch zuerst in eine versionierte GENCODE-ID auf.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene` | Zeichenfolge | **erforderlich** |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression` {/* #gtex_gene_expression */}

TPM-Arrays auf Probenebene (nicht aggregiert) für eine VERSIONED GENCODE-ID pro Gewebe (Gewebe für alle auslassen). Gibt das vollständige TPM-Array pro Stichprobe und n_samples für jedes Gewebe zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gencode_id` | Zeichenfolge | **erforderlich** |
| `tissue_site_detail_ids` | Array aus Zeichenfolgen | fakultativ |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes` {/* #gtex_top_expressed_genes */}

Top-n-Gene nach Median TPM in einem Gewebe unter Verwendung des API-Seitenrankings. filter_mt_gene (Standard true) löscht mitochondriale Gene aus dem Ranking.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `tissue_site_detail_id` | Zeichenfolge | **erforderlich** |
| `n` | Ganzzahl | fakultativ; Standard: 100 |
| `filter_mt_gene` | boolescher Wert | fakultativ; Standard: true |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes` {/* #gtex_eqtl_genes */}

Alle eGene (Gene mit ≥ 1 signifikanten cis-eQTL) für ein Gewebe. Seite für Seite laufen und zählverifiziert (z.B.) Bauchspeicheldrüse gtex_v8 = 9,660. max_genes Caps, wie viele Zeilen zurückgegeben werden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `tissue_site_detail_id` | Zeichenfolge | **erforderlich** |
| `max_genes` | Ganzzahl | fakultativ |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls` {/* #gtex_single_tissue_eqtls */}

Signifikante Einzelgewebe-cis-eQTL-Assoziationen für ein Gen und/oder eine Variante (vorberechnet). Geben Sie gencode_id und/oder variant_id an. tissue_site_detail_id verengt sich optional. Paged und count-verified.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gencode_id` | Zeichenfolge | fakultativ |
| `variant_id` | Zeichenfolge | fakultativ |
| `tissue_site_detail_id` | Zeichenfolge | fakultativ |
| `max_results` | Ganzzahl | fakultativ |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls` {/* #gtex_multi_tissue_eqtls */}

Multi-Tissue cis-eQTL Meta-Analyse (METASOFT) für eine VERSIONED GENCODE ID. variant_id verengt sich optional auf eine Variante. Gibt pro Variante Zeilen mit pro Gewebe m-Werte, NES, p-Werte und SEs.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gencode_id` | Zeichenfolge | **erforderlich** |
| `variant_id` | Zeichenfolge | fakultativ |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl` {/* #gtex_calculate_eqtl */}

Berechnen Sie eine eQTL im laufenden Betrieb für jedes Gen-Varianten-Paar in einem Gewebe, einschließlich nicht signifikanter Paare. Gibt p-Wert, NES, t-Statistik, MAF und die Genotyp-/Expressionsarrays pro Stichprobe zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gencode_id` | Zeichenfolge | **erforderlich** |
| `variant_id` | Zeichenfolge | **erforderlich** |
| `tissue_site_detail_id` | Zeichenfolge | **erforderlich** |
| `dataset_id` | Zeichenfolge | fakultativ; Standard: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## Protein-Annotation {/* #family-15 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `get_domain_architecture` {/* #get_domain_architecture */}

Komplette InterPro-Domänenarchitektur für ein oder mehrere UniProt-Proteine (alle übereinstimmenden Einträge, Member-DB-Signaturen, Fragmentkoordinaten), wobei die Paginierung anhand der API-Zahl verifiziert wird.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accessions` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries` {/* #search_interpro_entries */}

Keyword-Suche über InterPro oder Mitglieder-Datenbankeinträge (Pfam, SMART, PROSITE, PANTHER, CDD), kompletter Cursorlauf, der mit der API-Anzahl verifiziert wurde.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | fakultativ |
| `entry_type` | Zeichenfolge | fakultativ |
| `source_db` | Zeichenfolge | fakultativ; Standard: "interpro" |
| `go_term` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry` {/* #get_interpro_entry */}

Detaildatensatz für einen InterPro-Eintrag (IPRxxxxxxxx) oder eine Pfam-Familie (PFxxxxxxx) — Route, die durch das Beitrittspräfix gewählt wird.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans` {/* #search_pfam_clans */}

Keyword-Suche über Pfam-Clans (InterPro-Sets, Accessions CLxxxx).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan` {/* #get_pfam_clan */}

Pfam Clan Details einschließlich der komplett sortierten Mitgliederfamilienliste.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `clan_accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins` {/* #get_pfam_family_proteins */}

Mitgliedsproteine einer Pfam-Familie (komplette Zählung verifizierter Spaziergang oder nur zählen). Verwenden Sie count_only für sehr große Familien.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pfam_accession` | Zeichenfolge | **erforderlich** |
| `reviewed_only` | boolescher Wert | fakultativ; Standard: falsch |
| `tax_id` | Ganzzahl | fakultativ |
| `count_only` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes` {/* #get_pfam_family_proteomes */}

Proteome mit Mitgliedern einer Pfam-Familie. count_only ist standardmäßig wahr - die Upstream-Proteom-Cursor-Paginierung ist für tiefe Spaziergänge defekt.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `pfam_accession` | Zeichenfolge | **erforderlich** |
| `count_only` | boolescher Wert | fakultativ; Standard: true |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene` {/* #get_protein_atlas_gene */}

Human Protein Atlas per-Gen-Datensatz (Freigabe 25.x): Gewebe/Subzellular/Pathologie/Blut/Gehirn-Expression und Antikörper-Info. Akzeptiert eine Ensembl-Gen-ID oder ein Gensymbol.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene` | Zeichenfolge | **erforderlich** |
| `full` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas` {/* #search_protein_atlas */}

Spaltenselektierte Massensuche über den Human Protein Atlas (search_download).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `columns` | Zeichenfolge | fakultativ; Standard: "g,gs,eg,gd,up,chr,chrp,scl" |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids` {/* #map_string_ids */}

Zuordnung der Gensymbole/Aliasen zu STRING-Protein-Identifikatoren (v12.0). Jedes Eingabesymbol wird entweder abgebildet oder in unmapped aufgeführt - die beiden Partitionen der Eingabe.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `symbols` | Array aus Zeichenfolgen | **erforderlich** |
| `species` | Ganzzahl | fakultativ; Standard: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network` {/* #get_string_network */}

STRING Protein-Protein-Interaktionsnetzwerk für eine Genliste (v12.0) bei einer Konfidenzschwelle. Kartensymbole zuerst (nicht zugeordnet gemeldet), dann ruft Knoten, Kanten, Zusammenfassung und Herkunft. Eine einzelne abgebildete Eingabe fordert 10-Interaktionsnachbarn an, die mit STRING übereinstimmen; Mehrere abgebildete Eingänge werden nicht erweitert.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `symbols` | Array aus Zeichenfolgen | **erforderlich** |
| `species` | Ganzzahl | fakultativ; Standard: 9606 |
| `required_score` | Ganzzahl | fakultativ; Standard: 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores` {/* #get_string_similarity_scores */}

Smith-Waterman Protein Ähnlichkeit Bitscores unter einem Gen-Set (STRING / Homologie). Sparse: Paare, die in den Daten von STRING' fehlen, werden nicht aufgeführt (Abwesenheit bedeutet keine aufgezeichnete Ähnlichkeit, nicht Null).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `symbols` | Array aus Zeichenfolgen | **erforderlich** |
| `species` | Ganzzahl | fakultativ; Standard: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits` {/* #get_string_best_similarity_hits */}

Bester Homologietreffer pro Inputprotein in einer Zielspezies (STRING /homology_best). target_species=null fragt nach dem besten Treffer für alle Arten.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `symbols` | Array aus Zeichenfolgen | **erforderlich** |
| `species` | Ganzzahl | fakultativ; Standard: 9606 |
| `target_species` | Ganzzahl | fakultativ |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## Krebsmodelle {/* #family-16 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `cbioportal_list_studies` {/* #cbioportal_list_studies */}

cBioPortal-Krebsstudien, optional gefiltert nach einem Freitext-Schlüsselwort (Name/Beschreibung/Krebstyp) und/oder einer genauen Krebstyp-ID; Studienid, Name, Krebstyp, Referenzgenom, Zitat und Stichprobenzahl pro Datentyp.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `keyword` | Zeichenfolge | fakultativ |
| `cancer_type_id` | Zeichenfolge | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study` {/* #cbioportal_get_study */}

Erhalten Sie eine cBioPortal-Krebsstudie nach ID: Metadaten, Stichprobenzahlen pro Datentyp, wahre Proben- / Patientenzählungen (aus den Studiensammlungen, nicht aus dem Anzeigefeld) und ihre molekularen Profile.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `study_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene` {/* #cbioportal_mutations_in_gene */}

Alle Mutationen eines Gens (HUGO-Symbol) in einer cBioPortal-Studie mit Rezidivaggregaten: Gesamtmutationen, mutierte Probenzahl, Mutationstyp- und Proteinveränderungsverteilungen sowie die häufigsten Proteinveränderungen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | **erforderlich** |
| `study_id` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency` {/* #cbioportal_mutation_frequency */}

Mutationshäufigkeit eines Gens in mehreren cBioPortal-Studien (1-12): einzigartige mutierte Proben, geteilt durch Proben, die für dieses Gen in dem ausgewählten Mutationsprofil und der Probenliste profiliert wurden, wobei die Zielgentafeln berücksichtigt werden; Rangliste der häufigsten Ersten.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | **erforderlich** |
| `study_ids` | Array aus Zeichenfolgen | **erforderlich**; minItems: 1; maxItems: 12 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene` {/* #cbioportal_cna_in_gene */}

Diskrete Kopienzahl-Veränderungen eines Gens in einer cBioPortal-Studie, gefiltert nach Ereignistyp (tiefe Deletion / Amplifikation standardmäßig), mit der vollständigen Veränderungsverteilung pro Stichprobe.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `gene_symbol` | Zeichenfolge | **erforderlich** |
| `study_id` | Zeichenfolge | **erforderlich** |
| `event_type` | Zeichenfolge | fakultativ; Standard: "HOMDEL_AND_AMP"; enum: &#91;"HOMDEL_AND_AMP", "HOMDEL", "AMP", "GAIN", "HETLOSS", "DIPLOID", "ALL"&#93; |
| `max_records` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes` {/* #cbioportal_clinical_attributes */}

Klinische Attribute, die in einer cBioPortal-Studie (Felder auf Patienten- und Probenebene) definiert wurden, wobei die Überlebensendpunkte hervorgehoben werden und ob Daten zum Gesamtüberleben vorliegen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `study_id` | Zeichenfolge | **erforderlich** |
| `max_records` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## RH {/* #family-17 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `get_family` {/* #get_family */}

Rfam-Familienmetadaten für einen Beitritt (RF00005) oder Familien-ID (tRNA) — beide auflösen. Abgeflachter Rekord plus der vollen Upstream-JSON in "raw".

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `family` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment` {/* #get_seed_alignment */}

Seed Alignment einer Rfam-Familie in Stockholm (Standard, mit Konsensus-Sekundärstrukturlinie) oder Aligned Gaped FASTA.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `family` | Zeichenfolge | **erforderlich** |
| `fmt` | Zeichenfolge | fakultativ; Standard: "stockholm"; enum: &#91;"stockholm", "fasta"&#93; |
| `max_bytes` | Ganzzahl | fakultativ; Standard: 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model` {/* #get_covariance_model */}

Höllisches Kovarianzmodell (CM-Datei) einer Rfam-Familie, direkt verwendbar mit cmsearch/cmscan, plus parsed Header-Felder.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `family` | Zeichenfolge | **erforderlich** |
| `max_bytes` | Ganzzahl | fakultativ; Standard: 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree` {/* #get_tree */}

Samen phylogenetischer Baum einer Rfam-Familie (NHX / Newick-Text).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `family` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions` {/* #get_sequence_regions */}

Alle Vollregionstreffer einer Rfam-Familie über Sequenzdatenbanken hinweg (parsed TSV). Überprüfen Sie num_full über get_family zuerst — rfam.org 403s diese Route für sehr große Familien (z.B.) RF00005).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `family` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping` {/* #get_structure_mapping */}

Strukturkartierungen der PDB-Rückstandsebene einer Rfam-Familie, deterministisch sortiert.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `family` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id` {/* #accession_to_id */}

Konvertieren eines Rfam-Beitritts in seine Familien-ID (z.B.) RF00005 -> "tRNA".

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession` {/* #id_to_accession */}

Konvertieren Sie eine Rfam-Familien-ID in ihren Beitritt (z.B.) "tRNA" -> RF00005).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `family_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence` {/* #search_sequence */}

Suchen Sie eine RNA-Sequenz über den offiziellen Rfam-Batch-Endpunkt. Behalten Sie die zurückgegebene Jobidentität während des Wartens; Eine unvollendete Antwort ist kein Null-Hit-Ergebnis. Überprüfen Sie die abgeschlossenen Übereinstimmungen und die Quellinformationen. Nach einer fehlgeschlagenen Antwort diagnostizieren oder nehmen Sie den bestehenden Job wieder auf, anstatt ihn wiederholt einzureichen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `sequence` | Zeichenfolge | **erforderlich** |
| `max_wait_s` | Zahl | fakultativ; Standard: 300 |
| `poll_interval_s` | Zahl | fakultativ; Standard: 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## Omics-Archive {/* #family-18 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `ena_search_runs` {/* #ena_search_runs */}

Finden Sie öffentliche Sequenzierungsläufe, die mit einer ENA / INSDC-Studie, einem Experiment, einer Probe oder einem Lauf verbunden sind. Akzeptiert PRJ/ERP/SRP/DRP, ERX/SRX/DRX, SAM/ERS/SRS/DRS und ERR/SRR/DRR-Kennungen; GEO GSE/GSM, ArrayExpress E-MTAB und MGnify MGYS-Identifikatoren benötigen zuerst ihren verknüpften INSDC-Zugang. Accession Lookup nur, nicht Keyword Search. Gibt Metadaten von Organismen und Bibliotheken zurück, ohne Dateien abzurufen. Das Ergebnis wird bei 1000-Läufen begrenzt; Ein verkürztes Ergebnis ist keine vollständige Kohorte, und wiederholte Aufrufe sind keine Paginierung, da ENA kein Offset- oder Fortsetzungstoken bietet. Verwenden Sie einen engeren Proben- oder Experiment-Beitritt, wenn eine vollständige Abdeckung erforderlich ist.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich**; minLänge: 1; maxLänge: 64 |
| `limit` | Ganzzahl | fakultativ; Standard: 100; mindestens: 1; höchstens: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files` {/* #ena_get_run_files */}

Erhalten Sie archivgenerierte FASTQ-Download-URLs, Bytegrößen und vorgelagerte MD5-Prüfsummen für einen ERR / SRR / DRR-Lauf. Gibt nur ein Dateiinventar zurück; keine Überprüfung des Downloads oder der Prüfsumme. Bewahrt jede Datei in der Reihenfolge des Berichts auf, einschließlich ungepaarter oder lang gelesener Dateien; library_layout=PAIRED impliziert nicht genau zwei Dateien. file_index ist nur positionell und ist kein R1/R2 oder Mate Identifier. Einige Läufe (einschließlich einiger Einsendungen im Einzelzellen-/Mutterformat) haben kein archivgeneriertes FASTQ. Eingereichte BAM/CRAM/SRA-Dateien befinden sich außerhalb dieses Tools.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `run_accession` | Zeichenfolge | **erforderlich**; minLänge: 1; maxLänge: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments` {/* #arrayexpress_search_experiments */}

Search ArrayExpress funktionelle Genomik-Experimente (BioStudies) mit vollständigem, totalHits-verifiziertem Abruf; Filter (Abfrage, Organismus, study_type, Technologie, Release-Datumsbereich, zusätzliche Facetten) kombinieren sich mit AND.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | fakultativ |
| `organism` | Zeichenfolge | fakultativ |
| `study_type` | Zeichenfolge | fakultativ |
| `technology` | Zeichenfolge | fakultativ |
| `released_after` | Zeichenfolge | fakultativ |
| `released_before` | Zeichenfolge | fakultativ |
| `extra_facets` | Objekt | fakultativ |
| `max_records` | Ganzzahl | fakultativ; Standard: 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment` {/* #arrayexpress_get_experiment */}

Holen Sie sich ein ArrayExpress-Experiment (BioStudies) als abgeflachte Analystenaufzeichnung - Studientyp, Organismen, Assay / Probenzahl, Designs / Faktoren, Autoren, Publikationen, Protokolle, Array-Designs und Dateizusammenfassung.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files` {/* #arrayexpress_get_experiment_files */}

Listen Sie jede Datei eines ArrayExpress-Experiments (Name, Größe, Typ, Format, Beschreibung) mit Download-URLs sowie die Anzahl der /info-Endpunktdateien auf, die zum Vergleich nebenbeigetragen werden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples` {/* #arrayexpress_get_experiment_samples */}

Suchen Sie nach SDRF-Annotationszeilen pro Stichprobe für ein ArrayExpress-Experiment (MAGE-TAB-Header verbatim, wiederholt mit #2/#3). Experimente ohne SDRF geben &#123;"error" zurück:"no_sdrf"&#125;.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |
| `max_rows_returned` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series` {/* #geo_search_series */}

Durchsuchen von NCBI GEO DataSets (db=gds) und Rückgabe von Datensätzen auf Serienebene (beschnittene Datensätze). `term` ist die vollständige Syntax von E-Utilities; fügen Sie gse&#91;ETYP&#93; hinzu, um auf Serien zu beschränken.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `term` | Zeichenfolge | **erforderlich** |
| `retmax` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series` {/* #geo_get_series */}

Holen Sie strukturierte Metadaten für GEO-Serien (GSE-Zugänge) mit einbezogenen Samples ab - Serientitel / Zusammenfassung / Design, Plattformen, Samples mit Merkmalen und Bibliotheksinformationen sowie URLs mit ergänzenden Dateien. Datentabellen werden niemals heruntergeladen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accessions` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies` {/* #metabolights_list_studies */}

Listen Sie jeden öffentlichen MetaboLights-Studienzugang (numerisch sortiert) mit der gemeldeten Anzahl der API' auf. Es gibt keine serverseitige Studiensuche - filtert stattdessen abgeholte Kandidaten nach Titel / Deskriptor.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies` {/* #metabolights_get_studies */}

Strukturierte Metadaten für MetaboLights-Studien (MTBLSxxx) aus der analysierten ISA-Nutzlast abrufen — Titel, Status, Jahre, Organismen, Assays, Faktoren, Deskriptoren, Probenzahl, Protokolle; fakultative Tabelle je Stichprobe. Unbekannte / private Accessions gehen in not_found.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accessions` | Array aus Zeichenfolgen | **erforderlich** |
| `include_samples` | boolescher Wert | fakultativ; Standard: falsch |
| `max_sample_rows_returned` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files` {/* #metabolights_get_study_files */}

Komplettes Dateiinventar für eine öffentliche MetaboLights-Studie — der Top-Level-Studienordner (ISA-Tab, MAF, Ordnereinträge) und standardmäßig der rekursive Datei-Datenordner.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |
| `include_data_files` | boolescher Wert | fakultativ; Standard: true |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files` {/* #metabolights_search_data_files */}

Glob-Suche über einen MetaboLights study's-Rohdatenordner (FILES-Baum). `pattern` ist ein Dateiname glob (z.B. '*.mzML', '*.raw'; keine Liste aller Datendateien aufführen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |
| `pattern` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies` {/* #mgnify_search_studies */}

Finden Sie MGnify Metagenomik-Studien nach Freitext ODER Biom-Linie (geben Sie genau eine an). Die vollständige Auflistung wird bis zum Abschluss fortlaufend nummeriert und mit dem API verglichen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | fakultativ |
| `biome_lineage` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies` {/* #mgnify_get_studies */}

Strukturierte Datensätze für MGnify-Studien abrufen (MGYS-Zugänge). Mit include_analyses führt jede Studie auch ihre vollständige Analyseliste sowie By-Pipeline / By-Experiment-Aufgliederungen. Unbekannte Beitritte fehlen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accessions` | Array aus Zeichenfolgen | **erforderlich** |
| `include_analyses` | boolescher Wert | fakultativ; Standard: falsch |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses` {/* #mgnify_get_study_analyses */}

Liste ALLE Analysen einer MGnify-Studie (vollständige, zählverifizierte Paginierung) — ein Datensatz pro MGYA-Analyse mit Pipeline-Version, Experimenttyp, Status und Run/Assembly/Probe-Zuordnungen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_search_projects` {/* #pride_search_projects */}

PRIDE Archive Proteomics-Projekte durchsuchen (vollständig, api_total-verifizierter Abruf); Filter (Schlüsselwort, Organismus, Instrument, Krankheit, extra_filters) verbinden sich mit AND. Sortiert durch den Beitritt ASC - ein begrenzter Spaziergang ist ein stabiles Präfix.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `keyword` | Zeichenfolge | fakultativ |
| `organism` | Zeichenfolge | fakultativ |
| `instrument` | Zeichenfolge | fakultativ |
| `disease` | Zeichenfolge | fakultativ |
| `extra_filters` | Objekt | fakultativ |
| `max_records_returned` | Ganzzahl | fakultativ; Standard: 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects` {/* #pride_get_projects */}

Vollständige Metadaten für PRIDE-Projekte per Beitritt abrufen (z.B.) PXD010154) - die gleiche normalisierte Datensatzform wie pride_search_projects, so dass die beiden direkt vergleichbar sind. Unbekannte Accessions gehen in not_found.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accessions` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins` {/* #pride_search_project_proteins */}

Liste der Proteinnachweisreihen für ein PRIDE-Affinitäts-Proteomik-Projekt (Seiten bis zur Erschöpfung). HINWEIS: Hier werden nur Affinitäts-Proteomik-Projekte bedient; Für klassische MS (PXD) Projekte verwenden Sie stattdessen pride_find_projects_for_protein.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `project_accession` | Zeichenfolge | **erforderlich** |
| `keyword` | Zeichenfolge | fakultativ |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein` {/* #pride_find_projects_for_protein */}

Finden Sie PRIDE-Projekte, die ein Protein enthalten (MS-Archiv-Richtung). `protein_accession` ist ein UniProt-Beitritt (z.B. P04637). Füttern Sie die zurückgegebenen Projektzugänge zu pride_get_projects für vollständige Metadaten.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `protein_accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## CellGuide {/* #family-19 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `get_cell_type_info` {/* #get_cell_type_info */}

CellGuide (CELLxGENE) cell-type info by Cell Ontology id or name: name, synonyms, ontology description, and curated/GPT description.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `cell_type` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types` {/* #search_cell_types */}

CellGuide-Zellentypen nach freiem Text über Name und Synonyme suchen (das CDN hat keinen Suchendpunkt, so dass celltype_metadata.json clientseitig gefiltert wird).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `limit` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes` {/* #get_marker_genes */}

CellGuide-Markergene für einen Zelltyp (ID oder Name): rechnerisch (Daten abgeleitet, bewertet) oder kanonisch (literaturkuratiert).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `cell_type` | Zeichenfolge | **erforderlich** |
| `marker_type` | Zeichenfolge | fakultativ; Standard: "computational"; enum: &#91;"computational", "canonical"&#93; |
| `limit` | Ganzzahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data` {/* #get_source_data */}

CellGuide-Quellendatensätze und Veröffentlichungen, die zu einem Zelltyp (ID oder Name) beitragen: Sammlungsname/URL, Veröffentlichung und die jeweils abgedeckten Gewebe/Krankheiten/Organismen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `cell_type` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues` {/* #get_cell_tissues */}

Anatomische Gewebe, in denen ein Zelltyp (ID oder Name) beobachtet wird, aggregiert (dedupliziert) über CellGuide-Quellensammlungen hinweg.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `cell_type` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## Verordnung {/* #family-20 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `encode_search_experiments` {/* #encode_search_experiments */}

Suche nach ENCODE-Funktionalgenomik-Experimenten (ChIP-seq, ATAC-seq, ...). Filter: assay_title (z.B. "TF ChIP-seq"), Target (Proteinmarkierung, z.B. "CTCF"), Organismus (wissenschaftlicher Name), Status (Standard "released"), date_released_before (ISO-Datum — ein geschlossenes Fenster) sowie beliebige Portalfeldfilter über extra_filters. Der vollständige Ergebnissatz ist seitenweise und zählverifiziert; `accessions` listet jedes Spiel auf, höchstens werden max_rows-Zeilenzusammenfassungen zurückgegeben.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `assay_title` | Zeichenfolge | fakultativ |
| `target` | Zeichenfolge | fakultativ |
| `organism` | Zeichenfolge | fakultativ |
| `status` | Zeichenfolge | fakultativ; Standard: "released" |
| `date_released_before` | Zeichenfolge | fakultativ |
| `extra_filters` | Objekt | fakultativ |
| `max_rows` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples` {/* #encode_search_biosamples */}

ENCODE-Bioproben (Zelllinien, Gewebe, Primärzellen) durchsuchen. Filter: term_name (ontologischer Term, z.B. "K562"), Klassifikation ("cell line", "tissue", ...), Organismus (wissenschaftlicher Name), Status (Standard "released"), date_created_before (ISO-Datum) sowie beliebige Portalfeldfilter über extra_filters. Vollständig, zählverifiziert: `accessions` ist die vollständige Übereinstimmungsliste, höchstens werden max_rows-Zeilenzusammenfassungen zurückgegeben.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `term_name` | Zeichenfolge | fakultativ |
| `classification` | Zeichenfolge | fakultativ |
| `organism` | Zeichenfolge | fakultativ |
| `status` | Zeichenfolge | fakultativ; Standard: "released" |
| `date_created_before` | Zeichenfolge | fakultativ |
| `extra_filters` | Objekt | fakultativ |
| `max_rows` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files` {/* #encode_list_files */}

Liste ENCODE-Dateien nach Format / Assay / Bioprobe. Filter: file_format ("fastq", "bam", "bigWig", "bed", ...), assay_term_name (der Ontologiebegriff z.B. "ChIP-seq" - NICHT das Display assay_title wie "TF ChIP-seq", das nichts zutrifft; Titel über extra_filters=&#123;"assay_title": ...&#125;), biosample_term_name (z.B. "K562"), Status (Standard "released"), date_created_before, plus beliebige Portalfeldfilter über extra_filters. Dateiabfragen stimmen mit Millionen von Zeilen ungefiltert überein - kombinieren Sie immer mehrere Filter. Vollständig + gezählt verifiziert; höchstens max_rows Zeilenzusammenfassungen zurückgegeben.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `file_format` | Zeichenfolge | fakultativ |
| `assay_term_name` | Zeichenfolge | fakultativ |
| `biosample_term_name` | Zeichenfolge | fakultativ |
| `status` | Zeichenfolge | fakultativ; Standard: "released" |
| `date_created_before` | Zeichenfolge | fakultativ |
| `extra_filters` | Objekt | fakultativ |
| `max_rows` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment` {/* #encode_get_experiment */}

Erhalten Sie ein ENCODE-Experiment durch Beitritt (z.B.) "ENCSR000AKP". Gibt einen Stable-Field-Record zurück: Assay, Target, Biosample Ontology + Zusammenfassung, Beschreibung, Labor, Award-Projekt, Release / Submission-Daten, Assemblys, Replikatzählungen, Replikationstyp, dbxrefs, DOI und uuid. Volatile Portalfelder (Audits, Analysen, interner Status) sind ausgeschlossen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file` {/* #encode_get_file */}

Erhalten Sie eine ENCODE-Datei durch Beitritt (z.B.) "ENCFF002JUR". Gibt einen Datensatz mit stabilen Feldern zurück: Format, Ausgabetyp/-kategorie, Assay, Assembler, übergeordneter Datensatz, biologische Replikate, Dateigröße, md5sums, Ausführungstyp, Leselänge, Labor, Erstellungsdatum, Download href und uuid.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample` {/* #encode_get_biosample */}

Erhalten Sie eine ENCODE-Bioprobe durch Beitritt (z.B.) "ENCBS013JZP". Gibt einen Stable-Field-Record zurück: Ontologie-Begriff + Klassifikation, Organismus, Zusammenfassung / Beschreibung, Quelle, Spender, Behandlungen, genetische Veränderungen, Lebensphase, Alter, Geschlecht, Labor, Schöpfungsdatum, Status und Uuid.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `accession` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix` {/* #jaspar_get_matrix */}

Erhalten Sie ein JASPAR TF Bindungsprofil durch VERSIONED matrix id (z.B.) "MA0002.2". Gibt den vollständigen Datensatz zurück: Positionsfrequenzmatrix (pfm), TF-Name/Klasse/Familie, Spezies, Datentyp, Literaturreferenzen (pubmed/medline), Sequenzlogo-URL. Erfordert eine versionierte ID ("MA0002.2", nicht "MA0002") - verwenden Sie jaspar_matrix_versions, um Versionen aufzuzählen. Versionierte Matrizen sind unveränderlich, so dass die Ergebnisse reproduzierbar sind.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `matrix_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions` {/* #jaspar_matrix_versions */}

Listen Sie alle Versionen einer JASPAR-Basismatrix-ID auf (z.B.) "MA0002". Gibt jede freigegebene Version mit ihrem matrix_id, Name, Sammlung und URL zurück - gezählt verifiziert. Verwenden Sie, um eine genaue Version vor jaspar_get_matrix zu pinnen, oder um zu verfolgen, wie sich ein Profil über Releases hinweg verändert hat. Eine versionierte ID ("MA0002.2") wird akzeptiert und auf ihre Basis reduziert.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `base_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices` {/* #jaspar_list_matrices */}

Suchen/listen Sie JASPAR TF Binding Profile (der Vollprofilkatalog). Filter (alle fakultativ): Sammlung ("CORE", "UNVALIDATED"), tax_group ("vertebrates", "plants", ...), tax_id (NCBI-Taxonomie-ID, z. B. 9606 für den Menschen - so filtern Sie nach Arten; Aufzählen von IDs mit jaspar_list_species), Name (genauer TF-Name, z.B. "FOXA1"), Suche (freier Text), version="latest" (Beschränken Sie sich nur auf die neuesten Versionen). Der vollständig gefilterte Katalog wird fortlaufend paginiert und gezählt. höchstens max_rows summarische Zeilen zurückgegeben werden.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `collection` | Zeichenfolge | fakultativ |
| `tax_group` | Zeichenfolge | fakultativ |
| `tax_id` | Ganzzahl | fakultativ |
| `name` | Zeichenfolge | fakultativ |
| `search` | Zeichenfolge | fakultativ |
| `version` | Zeichenfolge | fakultativ |
| `max_rows` | Ganzzahl | fakultativ; Standard: 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species` {/* #jaspar_list_species */}

Liste aller Arten mit JASPAR-Profilen (NCBI tax_id + Name); zählverifizierte vollständige Auflistung. Verwenden Sie die tax_id-Werte, um jaspar_list_matrices zu filtern (z.B. 9606 = Homo sapiens, 10090 = Mus musculus.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa` {/* #jaspar_list_taxa */}

Liste aller JASPAR taxonomischen Gruppen (Wirbeltiere, Pflanzen, Pilze, Insekten, ...); zählverifizierte vollständige Auflistung. Verwenden Sie die Gruppennamen als tax_group-Filter von jaspar_list_matrices.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections` {/* #jaspar_list_collections */}

Liste aller JASPAR-Sammlungen (CORE, UNVALIDATED, ...); zählverifizierte vollständige Auflistung. Verwenden Sie die Sammelnamen als Sammelfilter von jaspar_list_matrices (CORE = kuratierte, nicht-redundante Profile).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases` {/* #jaspar_list_releases */}

Liste aller JASPAR-Datenbank-Releases (Jahr, Release-Nummer, aktives Flag); zählverifizierte vollständige Auflistung. Notieren Sie die aktive Veröffentlichung bei der Auswahl von Motiven für die Reproduzierbarkeit, oder überprüfen Sie die Veröffentlichungshistorie, bevor Sie die Ergebnisse in JASPAR-Versionen vergleichen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs` {/* #unibind_search_tfbs */}

UniBind ChIP-seq-Datensätze mit TFBS-Vorhersagen mit hohem Vertrauen durchsuchen (unibind.uio.no, 2021 release; direkte TF-DNA-Wechselwirkungen von ~10k-Datensätzen über 9-Spezies hinweg. Jeder Datensatz ist eins (Experiment, Zelltyp, TF) dreifach. Filter (alle optional, AND-kombiniert, exakt übereinstimmend, sofern nicht angegeben): tf_name (Gensymbol, z.B. "CTCF"), cell_line (Verbose UniBind Titel — bevorzugen `search` für Fuzzy Matching), Arten (wissenschaftlicher Name), Sammlung ("Robust") = best-model / high confidence, oder "Permissive"), jaspar_id (versioniert, z.B. "MA0139.1"), Suche (freier Text). `total` ist die genaue Anzahl von API's; höchstens max_rows Zeilen zurückgegeben werden (ein stabiles Präfix).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `tf_name` | Zeichenfolge | fakultativ |
| `cell_line` | Zeichenfolge | fakultativ |
| `species` | Zeichenfolge | fakultativ |
| `collection` | Zeichenfolge | fakultativ; enum: &#91;"Robust", "Permissive"&#93; |
| `jaspar_id` | Zeichenfolge | fakultativ |
| `search` | Zeichenfolge | fakultativ |
| `max_rows` | Ganzzahl | fakultativ; Standard: 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset` {/* #unibind_get_dataset */}

Holen Sie sich ein UniBind-Dataset's-Detail: pro Modell TFBS zählt + Datei-URLs. tf_id ist der Datensatzschlüssel "&lt;identifier>.&lt;cell_line>.&lt;TF>" wie von unibind_search_tfbs zurückgegeben (z.B. "ENCSR000AUE.A549_lung_carcinoma.CTCF". Gibt den TF-Namen, die Quellkennungen (ENCODE/GEO/GTRD), die Zelllinien, die biologischen Bedingungen, die JASPAR-Matrix-IDs, die ChIP-Seq-Peakzahl und eine Zeile pro TFBS-Vorhersagemodell (DAMO/PWM/...) mit total_tfbs, die Score/Distanz-Schwellenwerte, den angepassten CentriMo-p-Wert und die direkten BED/FASTA-Download-URLs zurück - verwenden Sie diese URLs (kein MCP-Aufruf), um die vollständige Site-Liste abzurufen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `tf_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region` {/* #unibind_tfbs_in_region */}

TF-Bindungsstellen überlappen eine genomische Region (UniBind 2021-Karten), die über das UCSC hubApi gegen UniBind's registrierte öffentliche Track-Hubs bedient werden (UniBind's eigenes REST API hat keinen Regions-Endpunkt). Die Koordinaten sind 0-basiert halboffen. Genom: UCSC-Baugruppe — Robuster Hub: hg38, mm10, ce11, dm6, danRer11, sacCer3, rn6, araTha1; Permissive fügt spo2 hinzu (keine hg19 - lift first). Chrom: mit "chr" Präfix. Start/Ende: Intervall, Endstart &lt;= 1,000,000 bp. HONEST-CAP: höchstens 20,000-Artikel werden pro Anruf gescannt; region_scan_complete=false bedeutet, dass die Region mehr Seiten hat, als gescannt wurden (das Fenster verengen), und wenn tf_name eingestellt ist, können Übereinstimmungen fehlen. n_matching zählt gescannte Seiten, die den Filter passieren; Returned/Truncated beschreiben die max_sites-Kappe.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `genome` | Zeichenfolge | **erforderlich** |
| `chrom` | Zeichenfolge | **erforderlich** |
| `start` | Ganzzahl | **erforderlich** |
| `end` | Ganzzahl | **erforderlich** |
| `tf_name` | Zeichenfolge | fakultativ |
| `collection` | Zeichenfolge | fakultativ; Standard: "Robust"; enum: &#91;"Robust", "Permissive"&#93; |
| `max_sites` | Ganzzahl | fakultativ; Standard: 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## Forschungsressourcen {/* #family-21 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `search_grants` {/* #search_grants */}

Search Grants.gov Finanzierungsmöglichkeiten über die Suche2 API (vollständige, zählverifizierte Abruf). Mindestens ein Kriterium ist erforderlich (Stichwort, opportunity_number, aln/CFDA, Agenturen, Eignungen, funding_categories oder funding_instruments). opportunity_statuses-Standards zu &#91;"forecasted","posted"&#93; (aktuelle Chancen); "closed"/"archived" hinzufügen für historische. Agenturen nehmen Codes wie &#91;"HHS-NIH11"&#93; (NIH), &#91;"HHS-FDA"&#93;, &#91;"NSF"&#93;. Setzen Sie count_only nur für die Trefferzahl + Facetten; max_records-Caps gaben Datensätze zurück (der Spaziergang ruft immer noch das komplette Set ab und die Flaggen wurden abgeschnitten).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `keyword` | Zeichenfolge | fakultativ |
| `opportunity_number` | Zeichenfolge | fakultativ |
| `aln` | Zeichenfolge | fakultativ |
| `agencies` | Array aus Zeichenfolgen | fakultativ |
| `opportunity_statuses` | Array aus Zeichenfolgen | fakultativ |
| `eligibilities` | Array aus Zeichenfolgen | fakultativ |
| `funding_categories` | Array aus Zeichenfolgen | fakultativ |
| `funding_instruments` | Array aus Zeichenfolgen | fakultativ |
| `count_only` | boolescher Wert | fakultativ; Standard: falsch |
| `max_records` | Ganzzahl | fakultativ; Standard: 100 |
| `include_facets` | boolescher Wert | fakultativ; Standard: true |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies` {/* #search_antibodies */}

Volltextsuche nach Antibody Registry (antibodyregistry.org, ~3.2M records). Tokenbasiertes Matching gegen Antikörpername/Ziel/Katalogtext ("TP53") und "p53" Es gibt verschiedene Abfragen. Wenn die Seite weggelassen wird, werden alle Seiten bis zu max_records oder dem anonymen Tiefen-Cap geführt (Zeilen jenseits des Offsets 500 müssen stromaufwärts authentifiziert werden, gekennzeichnet als anonymous_limit_hit - niemals stillschweigend fallen gelassen). Geben Sie eine 1-basierte Seite für den Einseitenabruf weiter (page&#42;page_size muss &lt;=500 bleiben).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `query` | Zeichenfolge | **erforderlich** |
| `page` | Ganzzahl | fakultativ |
| `page_size` | Ganzzahl | fakultativ; Standard: 100 |
| `max_records` | Ganzzahl | fakultativ; Standard: 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody` {/* #get_antibody */}

Fetch Antibody Registry Detaildatensatz (s) für einen Antikörper-Zugang / RRID. Akzeptiert eine einfache Nummer (" 3643095"), "AB_3643095" oder "RRID:AB_3643095". Die Upstream-Route ist listenwertig (ein Beitritt kann auf mehrere kuratierte Datensätze, z.B. Duplikate mit mehreren Anbietern. Eine nicht vorhandene ID liefert record_count 0, keinen Fehler.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `antibody_id` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog` {/* #find_antibodies_by_catalog */}

Finden Sie Antikörper nach Anbieterkatalognummer (genau, fallunempfindlich). Implementiert als Volltextsuche plus clientseitige exakte Übereinstimmung der Katalognummer (oder der aufgeführten Alternativen), da die vorgelagerte Spaltenfilterroute HTTP 500 für jeden Schlüssel zurückgibt. Übergeben Sie einen optionalen Anbieternamen (genau, fallunempfindlich), um die Übereinstimmungen weiter einzugrenzen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `catalog_number` | Zeichenfolge | **erforderlich** |
| `vendor` | Zeichenfolge | fakultativ |
| `page_size` | Ganzzahl | fakultativ; Standard: 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats` {/* #get_antibody_registry_stats */}

Antibody Registry-Statistik: Gesamtzahl der Antikörper und Datum der letzten Aktualisierung. Gibt die Upstream /api / datainfo Payload zurück.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## BioMart {/* #family-22 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `list_marts` {/* #list_marts */}

Liste verfügbar Ensembl BioMart Marts (Datenbanken). BioMart organisiert Daten als MART -> DATENSET -> ATTRIBUTE/FILTERS; ein Martname Feeds list_datasets.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| — | Objekt | Keine Felder; Ein leeres Objekt passieren. |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets` {/* #list_datasets */}

Listen Sie die in einem bestimmten Mart verfügbaren Datensätze auf (z.B.) hsapiens_gene_ensembl für menschliche Gene. Ein Dataset-Name füttert die Attribut/Filter/Abfrage-Tools.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mart` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes` {/* #list_common_attributes */}

Listen Sie die am häufigsten verwendeten Attribute für einen Datensatz (eine kuratierte Hochsignal-Submenge) auf. Verwenden Sie dies vor list_all_attributes, um Attribute für get_data auszuwählen. `mart` wird für die Signaturparität akzeptiert, aber ignoriert; die Abfragetasten von `dataset`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mart` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes` {/* #list_all_attributes */}

Listen Sie alle für einen Datensatz verfügbaren Attribute auf, abzüglich Homologen und Mikroarray-Sonden (die sperrig sind und selten benötigt werden). kann groß sein; list_common_attributes zuerst bevorzugen. `mart` wird für die Signaturparität akzeptiert, aber ignoriert; die Abfragetasten von `dataset`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mart` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters` {/* #list_filters */}

Listen Sie die Filter auf, die für einen Datensatz verfügbar sind. Filter verengen eine get_data-Abfrage (z.B. chromosome_name, Biotyp) und werden als Filter an get_data übergeben. `mart` wird für die Signaturparität akzeptiert, aber ignoriert; die Abfragetasten von `dataset`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mart` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data` {/* #get_data */}

Führen Sie eine BioMart-Abfrage aus: Holen Sie die angeforderten Attribute für einen Datensatz ab, der optional durch Filter verengt wird. Dies ist das wichtigste Data-Retrieval-Tool. `mart` wird für die Signaturparität akzeptiert, aber ignoriert; die Abfragetasten von `dataset`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mart` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | **erforderlich** |
| `attributes` | Array aus Zeichenfolgen | **erforderlich** |
| `filters` | Objekt | fakultativ |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation` {/* #get_translation */}

Übersetzen eines einzelnen Bezeichners von einem Attributtyp in einen anderen (z.B.) ein HGNC-Symbol für eine Ensembl-Gen-ID) innerhalb eines Datensatzes. `mart` wird für die Signaturparität akzeptiert, aber ignoriert; die Abfragetasten von `dataset`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mart` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | **erforderlich** |
| `from_attr` | Zeichenfolge | **erforderlich** |
| `to_attr` | Zeichenfolge | **erforderlich** |
| `target` | Zeichenfolge | **erforderlich** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate` {/* #batch_translate */}

Übersetzen Sie viele Identifikatoren von einem Attributtyp in einen anderen in einer einzigen Abfrage - effizienter als wiederholte get_translation-Aufrufe. `mart` wird für die Signaturparität akzeptiert, aber ignoriert; die Abfragetasten von `dataset`.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `mart` | Zeichenfolge | **erforderlich** |
| `dataset` | Zeichenfolge | **erforderlich** |
| `from_attr` | Zeichenfolge | **erforderlich** |
| `to_attr` | Zeichenfolge | **erforderlich** |
| `targets` | Array aus Zeichenfolgen | **erforderlich** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## ZINK {/* #family-23 */}

<ToolOperationGroup>
<summary>Operationen und Parameter anzeigen</summary>

### `zinc_search_by_id` {/* #zinc_search_by_id */}

Suchen Sie nach kaufbaren Verbindungen in ZINC22 / ZINC20 nach ZINC-Kennung - Antworten "Was ist diese Verbindung und wer verkauft es". Batched: Übergeben Sie 100-IDs in einem Anruf und nicht in vielen Einzel-ID-Anrufen. Async Upstream (Sendung + Umfrage); Es kann bis zu timeout_s Sekunden dauern.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **erforderlich** |
| `max_results` | Ganzzahl | fakultativ; Standard: 50 |
| `timeout_s` | Zahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles` {/* #zinc_search_by_smiles */}

Suche ZINC22's erschaffbaren chemischen Raum nach Struktur - Antworten "was erschaffbare Verbindungen aussehen wie diese SMILES". Dies ist sowohl das Werkzeug zur exakten Übereinstimmung als auch das Werkzeug zur analogen Entdeckung (Ähnlichkeit): CartBlanche22 zeigt einen Struktur-Such-Endpunkt, dessen `dist`-Parameter sich genau über diverse Bereiche erstreckt, so dass es absichtlich kein separates Ähnlichkeits-Such-Tool gibt. Die langsamste ZINC-Abfrage - erhöhen Sie `dist` allmählich, anstatt lose zu beginnen.

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `smiles` | Zeichenfolge | **erforderlich** |
| `dist` | Ganzzahl | fakultativ; Standard: 0 |
| `adist` | Ganzzahl | fakultativ |
| `max_results` | Ganzzahl | fakultativ; Standard: 50 |
| `timeout_s` | Zahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier` {/* #zinc_search_by_supplier */}

Lösen Sie die Lieferantenkatalognummern für ZINC-Verbindungen auf - Antworten "welche ZINC-Substanz ist dieser Lieferantencode und was's Struktur". Batch: bis zu 100 Lieferantencodes pro Anruf. Async Upstream (Senden + Umfrage).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `supplier_codes` | ['string', 'array'] | **erforderlich** |
| `max_results` | Ganzzahl | fakultativ; Standard: 50 |
| `timeout_s` | Zahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample` {/* #zinc_random_sample */}

Zeichnen Sie eine Zufallsstichprobe von käuflichen Verbindungen aus ZINC22 - für den Bau von Siebdecks, Eigenschaftsgrundlinien oder Lockvogelsätzen. `count` verdoppelt sich als dieses Tool's `max_results`; Bei der erneuten Abrufung wird eine neue Probe gezogen. Async Upstream (Senden + Umfrage).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `count` | Ganzzahl | fakultativ; Standard: 50 |
| `subset` | Zeichenfolge | fakultativ |
| `timeout_s` | Zahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d` {/* #zinc_get_3d */}

Suchen Sie andockfähige 3D-Strukturen für ZINC-Verbindungen. ZINC22 liefert vorgenerierte 3D-Konformer (DOCK .db2.gz, .mol2.gz, .sdf.gz) in seinem Datei-Repository, geordnet nach Tranche - dieses Tool löst jede ID für seine Tranche auf und gibt die Repository-Standorte zum Herunterladen zum Andocken zurück (DOCK6, AutoDock Vina, etc.). Max 50-IDs pro Anruf (3D-Abruf ist pro Verbindung Arbeit). Async Upstream (Senden + Umfrage).

| Feld | Typ | Anforderungen und Beschränkungen |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **erforderlich** |
| `timeout_s` | Zahl | fakultativ; Standard: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## Beispiel-Antwortdaten {/* #example-response-records */}

Die <ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">Beispiel-Antwort-Daten</ExampleDownload> enthalten genaue Eingaben, gedeckelte Antwortauszüge und Ergebnisse pro Operation. Unterscheiden Sie einen zurückgegebenen Datensatz, ein leeres Match und eine fehlgeschlagene Anforderung. Ergebnisse können Metadaten, Schemata oder Identifikatoren sein; Überprüfen Sie die Quellfelder und Vollständigkeitsflags, bevor Sie sie in Ihrer Forschung verwenden.
