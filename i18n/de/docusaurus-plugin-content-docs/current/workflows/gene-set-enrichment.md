---
title: "Laufen funktionelle Anreicherung für einen Kandidaten-Gen-Set"
toc_max_heading_level: 2
last_update:
  date: '2026-09-28'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Laufen funktionelle Anreicherung für einen Kandidaten-Gen-Set {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>Praxisbeispiel</strong> Eine absichtlich ausgewählte menschliche DNA-Schäden-Genliste</p>

Verwandeln Sie eine definierte Genliste in eine Tabelle mit angereicherten biologischen Prozessen und Signalwegen, wobei Sie Identifikator-Mappings, statistischen Hintergrund und Quellversionen beibehalten.

Folgen Sie vor dem Start [Wissenschaftliche Datenbanken](../tools/databases.md#connect-database), um die erforderlichen Connectors zu aktivieren. Verwenden Sie ein verbundenes Modell und ein verfügbares [Notebook-Laufzeit](../guides/runtimes.md).

Das erste Beispiel verwendet g:Profiler; [Enrichr und STRING Vergleich](#enrichr-string) verwendet die gleichen öffentlichen 11-Gensymbole in v0.33.3. Sie wurden aufgrund ihrer bekannten biologischen Rollen ausgewählt, so dass eine Anreicherung erwartet wird. Sie sind keine Differenzausdrucksergebnisse aus dem GSE60450-Projekt oder Beweise für eine unvoreingenommene Entdeckung.

## 1. Definieren Sie die Genliste und Analyseeinstellungen {/* #gene-set-enrichment */}

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

## 2. Prüfkennungen und Quellversionen {/* #identifier-check */}

Öffnen Sie die generierten Notizen und überprüfen Sie die Abfrage- und Zuordnungszählung. Dieser Lauf kartierte **11/11**-Identifikatoren mit **0** nicht zugeordneten, mehrdeutigen oder doppelten Identifikatoren. Es aufgezeichnet **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO Klassen **2026-01-23** und Reactome Klassen **2026-03-20**. Eine spätere Serviceversion kann andere Bedingungen zurückgeben.

![Gespeicherte englische Abfrage, Hintergrund, Quellversionen und Identifikatorprüfungen](/img/open-science/v0311/enrichment-notes.webp)

## 3. Die Anreicherungstabelle prüfen {/* #enrichment-results */}

Öffnen Sie den CSV und vergleichen Sie ihn mit dem vollständigen JSON. Dieser Lauf gab **891 Begriffe** am FDR 0.05 zurück. Die Vorschau zeigt nur die ersten 100-Zeilen; Das Anzeigelimit ist nicht die Gesamtergebniszählung. Behalten Sie `source`, `native`, korrigiert `p_value`, `intersection_size`, `query_size` und `effective_domain_size` bei der Interpretation eines Begriffs.

![Tatsächliche Anreicherungstabelle mit korrigierten Wahrscheinlichkeiten und Domänengrößen](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Analysenotizen</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">Alle 891 Ergebniszeilen</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Vollständige Antwort</ExampleDownload>

`background_size: null` bedeutet, dass keine benutzerdefinierte Hintergrundliste eingereicht wurde; Es bedeutet nicht ein statistisches Universum von null Genen. Verwenden Sie die pro-term effektive Domaingröße. Bei der Bereicherung wird keine kausale Beteiligung, kein differentieller Ausdruck oder eine Auf/Ab-Regulierung festgestellt. Siehe [Betriebsparameter](../reference/connector-operations.md#enrich_gene_set).

## 4. Vergleichen Sie Enrichr mit STRING-Netzwerkanreicherung {/* #enrichr-string */}

Enrichr fragt, welche Annotationssätze in den eingereichten Genen überrepräsentiert sind. Die Anreicherung von STRING PPI fragt, ob die Proteine mehr Netzwerkinteraktionen haben als erwartet. Dies sind unterschiedliche Tests; Eine Vereinbarung ist keine unabhängige Replikation eines biologischen Ergebnisses.

1. Aktivieren Sie in **Settings → Connectors** **Gene & Ontologien** und **Protein-Annotation** für den Agenten.
2. Erstellen Sie ein Projekt namens **DNA Damage Gene Set** und öffnen Sie eine neue Sitzung. Dieses Beispiel verwendet Codex und Session Notebook.
3. Listen Sie die verfügbaren Enrichr-Bibliotheken auf, bevor Sie eine auswählen. Verwenden Sie für diesen Vergleich die feste **GO_Biological_Process_2025**-Bibliothek, damit die gespeicherten Ergebnisse eine identifizierbare Annotationsversion haben. Eine neuere Bibliothek kann unterschiedliche Ergebnisse liefern.
4. Senden Sie diese Eingabeaufforderung und öffnen Sie die generierten Notizen nach dem Laufende:

```text
Compare Enrichr functional enrichment with STRING PPI enrichment for
TP53, ATM, ATR, CHEK1, CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
Use the built-in Genes & Ontologies and Protein Annotation connectors
through Session Notebook. List the current human Enrichr libraries;
use GO_Biological_Process_2025 with max_results 500 if available.
Run STRING PPI enrichment with species 9606 and required_score 700.
Save raw_connector_responses.json, enrichment_comparison_results.csv
and analysis_notes.md in English. Retain the query, source versions,
identifier mappings, reported background, n_total_results, n_results
and truncated flag, plus raw and adjusted P values where provided.
These genes were deliberately selected for known DNA-damage roles.
Do not infer unbiased discovery, causal regulation or expression direction.
Distinguish annotation enrichment from excess network interactions.
If STRING returns a P value of 0, preserve it as returned without claiming
an exact zero probability or inventing a numerical precision threshold.
```

### Überprüfen Sie die Eingaben und vollständige Antwort {/* #enrichr-inputs */}

Öffnen Sie **analysis_notes.md** und vergleichen Sie es mit **raw_connector_responses.json**. Der September 28-Lauf listete **228**-Bibliotheken auf und gab **305/305**-Begriffe für die ausgewählte Bibliothek mit `truncated: false` zurück. Der Standard `max_results` ist 100; Eine 100-Zeilenantwort kann unvollständig sein. Überprüfen Sie die Antwort-Flags und fordern Sie bei Bedarf ein größeres Limit an, bis 500.

STRING kartierte alle **11**-Gene ohne nicht zugeordnete Identifikatoren und zeichnete die Version **12.0**, den Organismus **9606** und den Score-Schwellenwert **700** auf. Enrichr meldet `mapping_status: not_reported_by_enrichr`; Kopieren Sie das Zuordnungsergebnis von STRING nicht in den Enrichr-Datensatz. Es wurde kein benutzerdefinierter Hintergrund geliefert. Enrichr's Bibliothek Gen Abdeckung von 14,674 ist Metadaten, nicht eine berichtete genaue statistische Hintergrundgröße.

![Tatsächliche Eingaben, Bibliotheksversion, vollständige Ergebniszählung und Identifikatorprüfungen](/img/open-science/v0333/enrichment-inputs.webp)

### Lesen Sie die beiden Ergebnisse separat {/* #enrichr-comparison */}

Öffnen Sie den Abschnitt mit den Ergebnissen der Notizen und verwenden Sie den CSV oder den rohen JSON für die vollständige Liste. Der erste Enrichr Term war **Zelluläre Reaktion auf ionisierende Strahlung (GO: 0071479)**, mit angepasstem P ungefähr **3.60 × 10⁻¹¹**. STRING gab **44 beobachtete Kanten** zwischen **11 Knoten** und **6 erwartete Kanten** zurück. Sein angegebener P-Wert war `0`; Dies ist die numerische Ausgabe des Dienstes, nicht der Nachweis der Nullwahrscheinlichkeit.

![Enrichr-Begriffe und das separate STRING-Netzwerkanreicherungsergebnis](/img/open-science/v0333/enrichment-results.webp)

Der CSV hat **305 Enrichr Zeilen plus 6 STRING summarische Zeilen**. Letztere sind Netzwerkstatistiken, keine zusätzlichen angereicherten Begriffe. Enrichr GO-Begriffe überlappen sich und STRING kombiniert mehrere Beweiskanäle; Eine STRING-Kante bedeutet nicht notwendigerweise eine direkte physikalische Bindung. Die absichtlich ausgewählte Eingabe zeigt vor allem die Werkzeuge und ihre Aufzeichnungen.

<ExampleDownload path="/examples/v0333/analysis_notes.md">Vergleichsangaben</ExampleDownload> · <ExampleDownload path="/examples/v0333/enrichment_comparison_results.csv">Vollständige Vergleichstabelle</ExampleDownload> · <ExampleDownload path="/examples/v0333/raw_connector_responses.json">Ursprüngliche Anschlussantworten</ExampleDownload>

Parameterreferenzen: [Enrichr Bibliotheken](../reference/connector-operations.md#list_enrichr_libraries), [Anreicherung Enrichr](../reference/connector-operations.md#enrich_gene_set_enrichr), [STRING PPI-Anreicherung](../reference/connector-operations.md#get_string_ppi_enrichment). Um die Sitzung und den Beweis zusammenzuhalten, [Exportieren eines .science-Pakets](../guides/research-packages.md#export-the-session).
