---
title: "Untersuchen Sie einen Pfad und sein Interaktionsnetzwerk"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Untersuchen Sie einen Pfad und sein Interaktionsnetzwerk {/* #inspect-a-pathway-and-its-interaction-network */}

<p className="example-label"><strong>Praxisbeispiel</strong> Menschliche p53-Signalisierung in Reactome über Pathway Commons</p>

Verwenden Sie einen kuratierten Pfad, um zu untersuchen, wie **TP53**, **MDM2** und **CDKN1A** in einem Netzwerk erscheinen. Das Ergebnis ist ein gespeicherter Quelldatensatz, Interaktionstabelle und Forschungsnotiz. Dies ruft kuratierte Konnektivität ab; es wird die Anreicherung nicht getestet oder die Signalwegaktivität in einer Probe nicht gemessen. Für eine statistische Genlistenfrage verwenden Sie [Gen-Set-Anreicherung](gene-set-enrichment.md).

## 1. Vorbereitung des Projekts {/* #prepare */}

1. Erstellen Sie ein Projekt mit dem Namen **Pathway Commons Forschung** und starten Sie eine Konversation.
2. Machen Sie in **Settings → Connectors** **Pathway Commons** für den Wirkstoff verfügbar. Es nutzt einen öffentlichen Dienst; Dieses Beispiel benötigt keine privaten Forschungsdateien.
3. Wählen Sie ein konfiguriertes Main-Modell aus. In diesem Beispiel wurde **Codex subscription** verwendet. Wenn Codex mit **Update required**, [Update der Runtime](../guides/frameworks.md#update-codex) markiert ist, bevor Sie die Aufgabe senden.

## 2. Suchen und behalten Sie die zurückgegebene Identität {/* #search */}

Senden:

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

Öffnen Sie **Notebook** neben dem Gespräch und prüfen Sie die Abfrage und zurückgegebenen Datensätze. Dieser Lauf durchsuchte `p53 signaling` mit Typ `Pathway`, Organismus `9606` und Datenquelle `reactome`. Es wurde auch `top_pathways` mit `p53` verwendet. Die Suche berichtete **1,309 Treffer insgesamt**; Die erste Seite ist nicht das ganze Ergebnis.

![Englische Rechercheanfrage und aktuelle Pathway Commons-Abfrage im Notebook](/img/open-science/v0340/pathway-query.webp)

Der ausgewählte Datensatz war **Transkriptionelle Regulierung durch TP53**, mit exaktem URI `http://bioregistry.io/reactome:R-HSA-3700989` und Quelle `pc14:reactome`. Halten Sie den URI von der Abfrage zurück, anstatt ihn von einem Label zu rekonstruieren. Suchergebnisse und -zählungen können sich ändern, wenn die Quellupdates aktualisiert werden.

## 3. Exportieren Sie den ausgewählten Pfad {/* #export */}

Bitten Sie darum, dass der ausgewählte URI mit **Subpfade eingeschlossen** exportiert wird. In diesem Durchlauf speicherte der Agent SIF-, TXT- und JSON-LD-Antworten. SIF liefert abgeflachte Interaktionsaufzeichnungen; TXT fügt Node Records hinzu; JSON-LD behält eine reichere Modellstruktur bei. Sehen Sie sich den [Betriebsnummer](../reference/connector-operations.md#pathway_commons_export) an, wenn Sie einen Format- oder Subpfadbereich auswählen.

Überprüfen Sie die erhaltene Antwort, bevor Sie die Zusammenfassung lesen. Der SIF-Export des Beispiels enthielt **3,318-Interaktionsdaten** und der TXT-Export enthielt **387 Knoten**. Diese Zählungen beschreiben diesen ausgewählten Pfad und Exportumfang, nicht jede menschliche p53-Interaktion.

## 4. Öffnen und inspizieren Sie die Ergebnisse {/* #inspect */}

1. Wählen Sie **tp53_mdm2_cdkn1a_readable_interactions.tsv** in der Antwort- oder Generated-Dateikarten. Öffnen Sie die Vollbildvorschau, wenn die Spalten schmal sind.
2. Überprüfen Sie `source`, `interaction` und `target` gegen die Rohantwort. Die neunreihige Lesetabelle ist eine Auswahl, nicht das komplette Netzwerk.
3. Öffnen Sie **tp53_pathway_research_note.md**. Bestätigen Sie, dass der Pfad URI, Quelle, Datum und Einschränkungen beibehalten wird.
4. Laden Sie die Dateien herunter, die Sie benötigen. Bewahren Sie das komplette Netzwerk und die ursprünglichen Antworten neben jedem in einer Präsentation verwendeten Auszug auf.

![Neun ausgewählte Interaktionsaufzeichnungen in der App geöffnet](/img/open-science/v0340/pathway-interactions.webp)

Die zurückgegebenen Datensätze umfassen `TP53 controls-expression-of MDM2`, `MDM2 controls-state-change-of TP53` und `MDM2 in-complex-with TP53`. CDKN1A erscheint in sechs Datensätzen, aber dieser SIF-Export hat keinen direkten TP53-zu-CDKN1A-Rand. Eine fehlende Kante in einem ausgewählten, abgeflachten Weg ist kein Beweis dafür, dass eine biologische Beziehung fehlt.

![Gespeicherte englische Notiz mit Pfadidentität und Interpretationsgrenzen](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` selbst spezifiziert nicht Aktivierung versus Hemmung; `in-complex-with` stellt keine direkte binäre Bindung her. Das Netzwerk allein kann keine Gewebespezifität, Mutationseffekte, Interaktionsstärke, Aktivität auf Probenebene oder Kausalität feststellen. Verwenden Sie ursprüngliche Signalwegreaktionen und Primärexperimente, um diese Fragen zu untersuchen.

## Gespeicherte Beispieldateien {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">Ursprüngliche Connector-Antworten, komprimierte ZIP</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">Komplette exportierte Interaktionstabelle</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">Neunreihiger Lesetisch</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">Englisch Research Note</ExampleDownload>

Um eine Gen-Nachbarschaft oder Pfade zwischen Gensätzen anstelle eines genau ausgewählten Pfades zu erkunden, verwenden Sie **pathway_commons_graph** und wählen Sie dessen Richtung, Pfadmodus und Grenzen bewusst. Das ist eine andere Abfrage als dieser URI-basierte Export. Quellen und Setup sind in [Wissenschaftliche Datenbanken](../tools/databases.md#pathway-expression-clinical) beschrieben.
