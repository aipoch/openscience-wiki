---
title: "Erweitern einer Analyse mit einem installierten Specialist"
last_update:
  date: '2026-09-17'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Erweitern einer Analyse mit einem installierten Specialist {/* #extend-an-analysis-with-an-installed-specialist */}

<p className="example-label"><strong>Praxisbeispiel</strong> Erweitern Sie eine Theophyllin-Konzentrationskurve mit beobachteten Expositionsmetriken</p>

Verwenden Sie **Pharmakometrie PK/PD Design Specialist**, um die Konzentrations-Zeit-Daten zu überprüfen, die Profile zu zeichnen und dann die Expositionsmetriken zu berechnen. Die Ergebnisse sind eine Zwölf-Subjekt-Tabelle, ein Konzentrationsdiagramm, ein lauffähiges R-Skript und ein Methodenbericht. Dieses Beispiel beschreibt öffentliche Forschungsdaten; Es wird keine Behandlung oder Dosierung empfohlen.

Die Eingabe ist R öffentlichen [Theoph-Datensatz](https://www.stat.ethz.ch/R-manual/R-devel/library/datasets/html/Theoph.html): 132 Beobachtungen von zwölf Probanden. Die Zeit ist in Stunden, die Konzentration in mg/l, das Gewicht in kg und die Dosis in mg/kg. Die Berechnungen verwenden die Basis R, ohne zusätzliche Pakete oder Datenbankanmeldeinformationen.

## 1. Installieren und Auswählen des Specialist {/* #1-install-and-select-the-specialist */}

1. Öffnen Sie **Settings → Specialists → Browse Marketplace**. Finde **Pharmakometrie PK/PD Design Specialist**, inspiziere seine Fähigkeiten und installiere es. In diesem Beispiel wird das Paket **1.0.0** in Open-Science **0.30.1** verwendet.
2. In **Settings → Runtimes** bestätigen Sie, dass R **Ready** ist und aktiviert ist. Der aufgezeichnete Durchlauf verwendete R **4.4.3**.
3. Öffnen Sie ein neues Gespräch in Ihrem Forschungsprojekt. Wählen Sie ein verfügbares Modell, dann **Agent controls → Specialist → pharmacometrics-pkpd-designer**. Der aufgezeichnete Durchlauf verwendete **Codex Abonnement / gpt-5.6-sol**.
4. Zu Beginn von **jede Analysemeldung**, Typ `/pkpd`, wählen Sie dann **pkpd-Modellierung** aus den Vorschlägen aus. Bestätigen Sie, dass es ein Skill-Chip wird, bevor Sie die Eingabeaufforderung einfügen.

**Versionsvermerk:** Die Screenshots verwenden v0.30.1, wobei der Skill explizit für jede Analysenachricht ausgewählt wird. Aus v0.30.2 werden Bounded Skills für Specialist-Windungen und delegierte Aufgaben vorbereitet. Wählen Sie zuerst den Specialist; Wenn Skill nicht verfügbar ist, wählen Sie `/pkpd-modeling` explizit aus, bevor Sie die Anforderung senden.

![Installierte Pharmakometik Specialist und seine Fähigkeiten](/img/open-science/theoph-specialist/installed.webp)

![Auswählen der echten pkpd-Modellierung Skill für die aktuelle Nachricht](/img/open-science/theoph-specialist/skill-selection.webp)

## 2. Überprüfen Sie die Daten und zeichnen Sie die Konzentrationskurven {/* #2-check-the-data-and-draw-the-concentration-curves */}

Mit dem Skill ausgewählt, senden Sie:

```text
Use the public R dataset datasets::Theoph in the enabled R Notebook.
Use base R only. Check rows, subjects, observations per subject,
missing values, duplicate subject-time records and the documented units.
Keep all observed time-zero concentrations unchanged.
Save theoph-input.csv, theoph-concentration-time.png and theoph-data-check.md.
Plot all 12 subjects with labelled axes and a legend.
Execute the code, reopen the saved files and report the actual checks.
Stop after this descriptive baseline. Do not calculate NCA metrics yet.
Do not install packages or delegate. Keep everything in English.
```

Überprüfen Sie den Code, wenn **Run R code?** erscheint, und genehmigen Sie dann die Berechnung. Öffnen Sie **Notebook**, um die Ausführungsausgabe zu sehen. Die aufgezeichnete Eingabe hat **132 Zeilen, 12 Probanden und 11 Beobachtungen pro Proband**, ohne fehlende Werte oder doppelte Betreffzeitdatensätze.

Öffnen Sie das generierte CSV und plotten Sie. Themen 1, 7 und 10 haben zum Zeitpunkt Null ungleiche Konzentrationen; diese beibehalten werden. Der Betrefffaktor des Datensatzes wird nach der maximalen Konzentration geordnet, so dass die angezeigte Reihenfolge nicht numerisch sein muss.

Die CSV-Vorschau zeigt die ersten 100 Zeilen; die gespeicherte Eingabedatei enthält alle 132 Beobachtungen.

![Die gespeicherte Eingabetabelle in Open-Science](/img/open-science/theoph-specialist/input.webp)

![Die ausgeführte Baseline und zwölf Konzentrations-Zeit-Kurven](/img/open-science/theoph-specialist/baseline.webp)

Referenzdateien: <ExampleDownload path="/examples/theoph/theoph-input.csv">Eingang CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-concentration-time.png">Konzentrationskurve</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-data-check.md">Datenkontrolle</ExampleDownload>.

## 3. Addieren Sie die Expositionsmetriken {/* #3-add-the-exposure-metrics */}

Laden Sie das <ExampleDownload path="/examples/theoph/nca-conventions.md">NCA-Methoden</ExampleDownload> herunter und fügen Sie es über **+ → Attach files** hinzu, damit Notebook es lesen kann. Verwenden Sie diese Referenz für das Beispiel: es spezifiziert beobachtete Cmax / Tmax und ganz lineare trapezförmige AUC, ohne eine terminale Steigung zu schätzen.

Wählen Sie `/pkpd-modeling` erneut in der gleichen Konversation aus und senden Sie dann:

```text
Read the attached reviewed nca-conventions.md methods reference.
Extend the baseline using the same theoph-input.csv and base R Notebook.
For each subject calculate observed Cmax (mg/L), earliest observed Tmax (h),
linear-trapezoidal AUC from time zero to the last observation (mg*h/L),
and the actual last-observation time (h).
Retain all observed time-zero values. Preserve the input hash.
Save theoph-nca-summary.csv, theoph-nca.R and theoph-nca-report.md.
The standalone script must read the CSV. Execute it, reread all 12 rows,
and compare its results with a separate Notebook calculation.
Explain the method, units, differing observation windows and limitations.
Register the three saved outputs as project files.
Do not estimate AUC to infinity, half-life, clearance or dosing advice.
Do not install packages, change permissions or delegate. Use English.
```

Überprüfen und genehmigen Sie die Datei liest und R Berechnung. Wenn eine unterstützende Datei fehlt, fügen Sie sie an, bevor Sie fortfahren. Wenn Notebook einen Fehler meldet, öffnen Sie die ausgefallene Zelle und korrigieren Sie die benannte Eingabe oder Abhängigkeit, bevor Sie erneut versuchen.

## 4. Öffnen und überprüfen Sie die Ergebnisse {/* #4-open-and-check-the-results */}

Öffnen Sie **theoph-nca-summary.csv** aus den generierten Dateien. Es sollte eine Reihe für jedes der zwölf Themen geben. Überprüfen Sie die Einheiten und die letzte Beobachtungszeit sowie die metrischen Werte.

![Gespeicherte Maßzahlen für die Exposition auf der Ebene des Subjekts](/img/open-science/theoph-specialist/results.webp)

| Thema | Cmax (mg/l) | Tmax (h) | AUC0–last (mg·h/L) | Letzte Beobachtung (h) |
| --- | --- | --- | --- | --- |
| 1 | 10.5 | 1.12 | 148.92305 | 24.37 |
| 2 | 8.33 | 1.92 | 91.52680 | 24.30 |

Öffnen Sie **theoph-nca-report.md** und **theoph-nca.R** zusammen. Der Bericht sollte mit dem ausgeführten Skript übereinstimmen: Sortieren Sie die Beobachtungen jedes Subjekts nach der Zeit, nehmen Sie das beobachtete Maximum und seine früheste Zeit, dann addieren Sie `(C1 + C2) × (t2 - t1) / 2` über benachbarte Beobachtungen. Die ersten beiden Zeilen oben bieten einen schnellen Vergleich; Überprüfen Sie alle zwölf Zeilen, bevor Sie einen Wiederholungslauf annehmen.

Dies sind beobachtete Metriken. Die letzten Abtastzeiten unterscheiden sich zwischen den Probanden, und die lineare Trapezregel ist eine explizite Approximation. Die Ergebnisse stellen keine Exposition gegenüber Unendlichkeit, ein angepasstes pharmakokinetisches Modell oder eine Messunsicherheit dar.

Laden Sie die aufgezeichneten <ExampleDownload path="/examples/theoph/theoph-nca-summary.csv">Zusammenfassung CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-nca.R">R Skript</ExampleDownload> und <ExampleDownload path="/examples/theoph/theoph-nca-report.md">Methodenbericht</ExampleDownload> herunter. Behalten Sie die Eingabe und das Skript zusammen, wenn Sie außerhalb der App erneut ausführen.

<span id="choose-a-finish-you-can-inspect" />
<span id="choose-inputs-for-an-installed-role" />
<span id="turn-an-existing-result-into-a-checked-methods-draft" />
<span id="inspect-qc-variation-with-the-packaged-pca-skill" />
<span id="transform-a-count-matrix-for-exploratory-plots" />
<span id="build-a-bounded-evidence-table-and-reanalysis-plan" />
<span id="handle-a-partially-completed-analysis" />
<span id="metadata-retrieval-blocked-by-the-local-network" />
<span id="keep-metadata-retrieval-separate-from-completed-analysis" />
