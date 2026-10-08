---
title: "Token Nutzung und Aktivität"
last_update:
  date: '2026-10-08'
---

# Token Nutzung und Aktivität {/* #token-usage-and-activity */}

Verwenden Sie **Settings → Usage**, um das gemeldete Token-Volumen und die lokale Aktivität zu überprüfen. Verwenden Sie das **Token usage**-Menü einer Antwort oder die Sitzung **Context window** für eine schmalere Ansicht. Diese beantworten verschiedene Fragen: Gesamtaufrufe können viele Token verbrauchen, während der aktuelle Kontext ein viel kleineres Fenster einnimmt.

Verwenden Sie den angezeigten Zeitraum und die Metrik, um jedes Diagramm zu interpretieren. Die Anzahl der gemeldeten Token beschreibt die Aktivität; Überprüfen Sie die Abonnementlimits oder die Abrechnung mit dem Anbieter.

## Filtern Sie die Zusammenfassung {/* #filter-the-summary */}

1. Öffnen Sie die Nutzung und wählen Sie **Today**, **This week**, **Last 30 days** oder **All time**.
2. Lesen Sie das Frischeetikett. Verwenden Sie **Refresh** nach einem abgeschlossenen Lauf, wenn die Seite veraltet ist.
3. Vergleichen Sie die vier Token-Felder und die New / Total Aktivitätszähler.
4. Überprüfen Sie das eigene Periodenlabel des Diagramms, bevor Sie es mit der Zusammenfassung vergleichen.

![Heute Zusammenfassung mit den separaten Tages-Charts](/img/open-science/guides-walkthrough/13-usage-today.webp)

| Feld | Auslegung |
| --- | --- |
| Gesamtzahl der Token | Gemeldete Aggregation für den ausgewählten Zeitraum. |
| Eingabe-Tokens | Gemeldete Inputkomponente; keine lokale Textlängenschätzung ersetzen. |
| Cache-Token | Nutzung, die dem Cache durch das Reporting Backend zugeschrieben wird. |
| Cache-Anteil | Ein Anteil des relevanten Input-/Cache-Volumens; Ein Dash bedeutet nicht verfügbar, kein Nullpreislauf. |
| Ausgabetoken | Gemeldete generierte Outputkomponente. |
| Neue Sessions/Projekte/Läufe/Artefakte | Elemente, die in dem ausgewählten Zeitraum erstellt wurden. |
| Gesamtsitzungen/Projekte/Laufe/Artefakte | Gesamtzählungen; Sie müssen nicht gleich den Neuen Zählungen des Zeitraums sein. |

In der betriebenen Heute-Ansicht waren die Token-Gesamtwerte Null, bevor der aktuelle Lauf seine Verwendung aufgezeichnet hatte, während das feste 30-Tages-Chart noch die gestrige Aktivität enthielt. Das ist erwartetes Periodenverhalten, nicht inkonsistentes Zählen. Uploads und generierte Artefakte sind unterschiedliche Ressourcen; Das Hochladen einer Quelldatei erzeugt an sich kein generiertes Artefakt.

## Lesen Sie die tägliche Aktivität und Zusammensetzung {/* #read-daily-activity-and-composition */}

**Daily activity metric** bietet Total-Token, Input-Token, Output-Token, Cache-Token, Neue Sitzungen, Neue Projekte, Neue Artefakte und Runs. Wählen Sie eine Metrik aus und untersuchen Sie dann eine Datumszelle. Dunklere Zellen stellen größere Werte innerhalb der angezeigten Skala dar.

**Daily token usage** zeigt gestapelte Eingabe-, Cache- und Ausgabekomponenten. Beide Charts sind mit **Letzte 30 Tage** gekennzeichnet; Das Ändern des oberen Zusammenfassungszeitraums ändert diesen festen Bereich nicht. Vergleichen Sie wie Perioden, bevor Sie Schlussfolgerungen über Erhöhungen ziehen.

## Fehlende oder unerwartete Werte erklären {/* #explain-missing-or-unexpected-values */}

| Symptom | Überprüfung |
| --- | --- |
| Ein abgeschlossenes Gespräch hat keine Verwendung | Einige Anbieter und ältere Datensätze lassen Telemetrie aus. Erfrischen Sie sich einmal und überprüfen Sie dann die eigene Verwendung der Antwort. |
| Hohe Gesamtsumme, aber ein kleiner verwendeter Kontext Prozentsatz | Gesamtnutzung akkumuliert Anrufe; context misst die Belegung zu einem Zeitpunkt. |
| Neue Zähler ändern sich ohne Token-Nutzung | Projekterstellung und Sitzungsverwaltung können ohne Modellanforderung erfolgen. |
| Summen ähneln keiner Rechnung | Diese Seite ist nicht das Abrechnungs-Ledger oder das Abonnement-Limit-Dashboard des Anbieters. |
| Eine große Cache-Komponente | Lesen Sie die gemeldete Aufschlüsselung; keine Barersparnisse ohne die tatsächlichen Abrechnungsregeln des Anbieters ableiten. |

Die Seite enthält nur die gemeldete Nutzung. Es rekonstruiert keine fehlende Geschichte. Zur Kontextzusammensetzung und -verdichtung siehe [Gedächtnis und Konversationskontext](./memory.md).

Quelle: [Bedienelemente des Nutzungspanels und der Karten](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/TokenUsagePanel.tsx).

## Angrenzende Tage inspizieren {/* #inspect-daily-usage */}

Bewegen Sie sich durch das **Daily token usage**-Diagramm, um aufeinanderfolgende Daten und deren Input-, Cache- und Output-Aufgliederung zu überprüfen. Für den Tastaturzugriff verwenden Sie **Tab / Shift + Tab**, um einen Tag zu fokussieren, und **Flucht**, um das Detail zu schließen. Vergleichen Sie das angezeigte Datum und die angezeigten Komponenten; Dieses Diagramm deckt noch die letzten 30-Tage ab und rekonstruiert die fehlende Anbieter-Telemetrie nicht.
