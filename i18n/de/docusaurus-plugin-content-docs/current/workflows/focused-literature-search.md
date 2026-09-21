---
title: "Suchen Sie innerhalb bestimmter Zeitschriften und Termine"
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Suchen Sie innerhalb bestimmter Zeitschriften und Termine {/* #search-within-specified-journals-and-dates */}

<p className="example-label"><strong>Praxisbeispiel</strong> Achtsamkeit Intervention Studien in zwei Zeitschriften, 2019-2025</p>

Eine fokussierte Suche erfordert explizite Grenzen und eine Aufzeichnung dessen, was gescreent wurde. Dieses Beispiel verwendet PubMed, um achtsamkeitsbezogene Publikationen in **JAMA Psychiatrie** und **Verhaltensforschung und Therapie** abzurufen, und trennt dann randomisierte Studienberichte von anderen Publikationen. Es produziert eine vollständige Screening-Tabelle und eine Suchnote, keine Behandlungsempfehlungen oder eine systematische Überprüfung.

## 1. Legen Sie die Frage- und Förderregel fest {/* #1-set-the-question-and-eligibility-rule */}

Öffnen Sie ein Projekt und wählen Sie ein verbundenes Modell aus. Bestätigen Sie, dass **PubMed** Connector in **Settings → Connectors** verfügbar ist; Kontaktinformationen dort konfigurieren, falls gewünscht. Es sind keine heruntergeladenen Papiere erforderlich, um dieses Beispiel zu starten.

Verwenden Sie die Veröffentlichungsdaten **2019-01-01 bis 2025-12-31**, nicht das Datum, an dem ein Datenbankdatensatz hinzugefügt wurde. Fügen Sie primäre randomisierte Berichte mit einem definierten Achtsamkeitsinterventionsarm und berichteten Teilnehmerergebnissen hinzu. Halten Sie eine separate **unsicher**-Kategorie für gemischte Interventionen, unklaren Veröffentlichungsstatus oder widersprüchliche Daten bereit. Mechanistische Ergebnisse allein machen einen Bericht nicht zu einer sekundären Analyse.

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![Die eigentliche fokussierte Suchanfrage in Open-Science](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. Überprüfen Sie die Abfrage und Abdeckung {/* #2-check-the-query-and-coverage */}

Der Lauf hat diese Konzept- und Journalabfrage eingereicht, wobei der Filter für das Veröffentlichungsdatum separat bereitgestellt wurde:

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

Öffnen Sie **Notebook** oder erweitern Sie die PubMed-Aktivität. Bestätigen Sie das Journalfeld, beide Daten und die zurückgegebene Zählung. Am September 16, 2026, die Suche zurückgegeben **62-Datensätze**; Alle 62 wurden mit `has_more = false` abgerufen. Die Zählungen können sich ändern, wenn PubMed seinen Index aktualisiert. Wenn Ihr Ergebnis gekürzt ist, rufen Sie die verbleibenden Seiten ab, bevor Sie behaupten, dass alle Suchtreffer gescreent wurden.

Die breite Konzeptabfrage behält bewusst Nicht-Versuche bei. Die Prüfungsberechtigung ist eine separate Screening-Entscheidung. Die Indexierung vom Publikationstyp kann unvollständig sein, und ein Papier, in dem eine frühere randomisierte Studie erwähnt wird, berichtet nicht unbedingt über eine neue.

## 3. Überprüfen und korrigieren Sie die Screening-Tabelle {/* #3-review-and-correct-the-screening-table */}

Wenn die Antwort abgeschlossen ist, öffnen Sie **mindfulness-search-audit.csv** unter **Generated**. Es sollte jeden abgerufenen PMID behalten, einschließlich ausgeschlossener und unsicherer Datensätze. Überprüfen Sie den Titel, das Journal, DOI und das Datum mit dem verknüpften PubMed-Datensatz und vergleichen Sie dann die Entscheidung mit dem Abstract.

![Die gespeicherte Kandidatentabelle, einschließlich unsicherer und ausgeschlossener Datensätze](/img/open-science/workflow-extensions/focused-search-table.webp)

Überprüfen Sie jeden Ausschlussgrund gegen das Abstract. PMID **38837133** ist eine primäre randomisierte Studie einer breiteren Psychotherapie; Das Beispiel kennzeichnet seine Achtsamkeitsberechtigung **unsicher**. PMID **34009273** ist eine Meta-Analyse und wird ausgeschlossen. Wenn eine Entscheidung korrigiert werden muss, benennen Sie den Datensatz und das spezifische Problem, bitten Sie den Agenten, die CSV zu aktualisieren, und öffnen Sie dann die gespeicherte Datei erneut.

![Die eigentliche Überprüfung des Screenings und der gespeicherten Dateien in Notebook](/img/open-science/workflow-extensions/focused-search-notebook.webp)

Die überprüfte Beispieltabelle enthält **20 enthalten, 37 ausgeschlossen und 5 unsichere Datensätze**, die alle **62**-Hits berücksichtigt. Dies sind Screening-Entscheidungen auf abstrakter Ebene, keine Erklärung, dass 20 verschiedene Studien vollständig bewertet wurden. Mehrere Veröffentlichungen können die gleiche zugrunde liegende Studie betreffen.

## 4. Unsicherheit sichtbar halten {/* #4-keep-uncertainty-visible */}

PMID **41418645** wurde vom 2019-2025 PubMed-Publikationsdatum-Filter zurückgegeben, während seine Metadaten ein **2026-01**-Druckdatum melden. Behalten Sie die Diskrepanz und überprüfen Sie die Publikationshistorie, bevor Sie eine endgültige Entscheidung treffen. Ersetzen Sie nicht stillschweigend das Jahr, um in das Suchfenster zu passen.

Öffnen Sie **mindfulness-search-notes.md** und überprüfen Sie, ob seine Zählungen, Förderfähigkeitsregeln und Einschränkungen mit dem CSV übereinstimmen. Bewahren Sie den ursprünglichen Metadaten-Snapshot neben diesen Dateien auf, damit jede Entscheidung bis zur Quelle zurückverfolgt werden kann.

![Die überarbeitete Suchnote mit dem 20/37/5 Screening zählt](/img/open-science/workflow-extensions/focused-search-notes.webp)

Laden Sie <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">geprüfte Kandidatentabelle</ExampleDownload> und <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">Suchanfrage</ExampleDownload> herunter. Vollständige Abstracts werden hier nicht umverteilt; Folgen Sie den Quelllinks, um sie zu überprüfen.

Für eine formale Evidenzüberprüfung lösen Sie die unsicheren Aufzeichnungen, erhalten Sie Volltexte, verknüpfen Sie Begleitberichte mit ihren Studien und arrangieren Sie ein angemessenes unabhängiges Screening. Verwenden Sie [Workflow der Leseliste](core-reading-list.md), um eine Sammlung zu erstellen, oder [Evidenzextraktion](literature-review.md), nachdem der Quellsatz und der Zugriff festgelegt wurden.
