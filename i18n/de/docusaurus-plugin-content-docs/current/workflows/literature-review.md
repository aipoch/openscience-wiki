---
title: "Extrahieren Sie eine Literaturnachweistabelle"
last_update:
  date: '2026-09-17'
---

# Extrahieren Sie eine Literaturnachweistabelle {/* #extract-a-literature-evidence-table */}

<p className="example-label"><strong>Praxisbeispiel</strong> Zehn Studien zu Masken und Atemwegsinfektionen</p>

Dieser Workflow beginnt mit einem definierten Satz von zehn Papieren und endet mit einer quellenverknüpften Evidenztabelle und einem Unsicherheitshinweis. Es zeigt Extraktion für eine öffentliche Gesundheit Literatur Überprüfung. Das gelieferte Set ist eine Lehrauswahl, keine umfassende Suche oder eine abgeschlossene systematische Überprüfung.

## Bereiten Sie ein Bounded Source Set vor {/* #prepare-a-bounded-source-set */}

Laden Sie das <a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>Zehn-Papier-Quellenliste</a> herunter. Es enthält DOI, PMCID und Original-Volltext-Links für Gemeinschafts-, Haushalts- und Gesundheitsstudien. Erhalten und lesen Sie die Quellen unter den angegebenen Zugangsbedingungen.

Für die gleiche Texteingabe, die in diesem Beispiel verwendet wird, laden Sie den <a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>Quellvorbereitungsskript</a> herunter und führen Sie ihn mit Python 3 in einem lokalen Arbeitsordner aus:

```bash
python3 prepare-mask-sources.py
```

Das Skript lädt diese zehn Europe PMC XML-Einträge herunter, behält die Quellidentität, Abschnittsüberschriften und Tabellen bei und erstellt **mask-trials-fulltext.md**. Es berichtet von einem Misserfolg, anstatt stillschweigend eine Studie wegzulassen. Die Original-Volltexte werden nicht mit dem Wiki neu verteilt. Wenn ein Download fehlschlägt, erhalten Sie dieses Papier über den Quelllink, bevor Sie das Set als vollständig behandeln.

Wählen Sie in einem Open-Science-Projekt ein Arbeitsmodell aus und fügen Sie die resultierende Markdown-Datei mit **+ → Attach files** an. Überprüfen Sie, ob die Quellliste zehn verschiedene Studien enthält. Die Textversion hilft beim Extrahieren; Zurück zum ursprünglichen Artikel für Layout, Figuren oder mehrdeutige Tabellenstruktur.

Klicken Sie auf den Anhang, um seine Vorschau zu öffnen. Jede Studie beginnt mit einem Titel, DOI und dem ursprünglichen Quelllink, gefolgt von Abschnittstext und Tabellen. Passen Sie diese zehn Identitäten mit der Quellliste ab; Zählen Sie nicht wiederholte Abschnittsüberschriften als zusätzliche Studien.

![Das tatsächlich angehängte Volltextpaket behält die Quellidentität und Artikelabschnitte bei](/img/open-science/research-workflows/mask-trials-input.webp)

Bevor Sie ein Papier als Beweismittel verwenden, überprüfen Sie an der Quelle nach Korrekturen oder Rückzügen. Von v0.30.2 aus überprüft der `verify_dois`-Helfer des `literature-review` Skill die Crossref-Aktualisierungsbeziehungen in beide Richtungen. `retracted: true` kann ein zurückgezogenes Papier oder einen Widerrufsbescheid identifizieren; die verknüpfte Beziehung zu prüfen. `false` bedeutet, dass kein geprüfter Marker gefunden wurde, kein Beweis dafür, dass das Papier nie zurückgezogen wurde.

## Bitten Sie um eine Zeile pro Versuch {/* #ask-for-one-row-per-trial */}

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

Erlauben Sie die beabsichtigten Quellausleseanforderungen. Stellen Sie sicher, dass der Agent alle zehn Studienabschnitte erreicht, anstatt nur das erste Abstract zu verwenden oder anzunehmen, dass ähnlich betitelte Arbeiten Duplikate sind.

## Überprüfen Sie die extrahierten Beweise {/* #review-the-extracted-evidence */}

Öffnen Sie den CSV, nachdem die Antwort abgeschlossen ist. Vergleichen Sie die zehn DOI-Werte mit der Quellliste und überprüfen Sie dann die gemeldete Schätzungs- und Analysepopulation mit dem Ergebnisabschnitt oder der Tabelle jedes Papiers.

![Die Zehn-Prozess-Beweistabelle in Open-Science](/img/open-science/research-workflows/mask-trials-evidence.webp)

Achten Sie besonders auf diese Unterscheidungen:

- **Einheit der Randomisierung:** ein Dorf, ein Haushalt, ein Zelt oder eine Krankenhausstation ist kein individuell randomisierter Teilnehmer.
- **Ergebnis:** symptomatische Seroprävalenz, laborbestätigte Infektion und influenzaähnliche Erkrankungen sind unterschiedliche Endpunkte.
- **Analyse:** ein Adhärenz-basiertes oder Frühinterventions-Untergruppenergebnis muss vom randomisierten Hauptvergleich getrennt bleiben.
- **Unsicherheit:** behalten Sie Konfidenzintervalle und nicht eindeutige Ergebnisse bei. Eine statistisch nicht signifikante Schätzung beweist nicht, dass keine Wirkung besteht.

Verwenden Sie <a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>Beispiel Evidenztabelle</a> und <a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>Synthesenoten</a>, um das Format zu überprüfen. Dies sind Ausgangsmaterialien für die Überprüfung; Die wissenschaftliche Interpretation hängt immer noch von den ursprünglichen Quellen, der Studienqualität und der Frage ab, die Sie beantworten möchten.

Öffnen Sie **mask-trials-reading-notes.md** sowie das CSV. Der Finaltisch dieses Laufs hat **Zeilen 10 · Spalten 12**. Erweitern Sie eine Vorschau oder laden Sie die Datei herunter, um lange Zellen zu lesen; Es fehlt nicht der Quelltext an verkürzten Zellen. Die Notizen behalten die zehn Studienidentitäten bei und erklären, warum ihre Ergebnisse und Populationen nicht automatisch gepoolt werden sollten.

![Die gespeicherten Lesenotizen und die abgeschlossene zehnreihige Ausgabe](/img/open-science/research-workflows/mask-trials-notes.webp)

Wenn eine Zeile falsch oder unvollständig ist, benennen Sie die Studie und den exakten Quellabschnitt / die Tabelle, fordern Sie eine Überarbeitung der **beide**-Dateien an und öffnen Sie sie dann erneut. Halten Sie beispielsweise den randomisierten Haushaltsfluss von Cowling 2008 von seiner analysierten Teilmenge getrennt. Das Aktualisieren einer Prosa-Antwort aktualisiert die gespeicherte Tabelle nicht von selbst.

## Fortsetzung einer Überprüfung {/* #continue-toward-a-review */}

Speichern Sie die überprüfte Tabelle mit ihren Quellen und Extraktionsentscheidungen. Eine formale Überprüfung erfordert auch eine dokumentierte Suche, Förderkriterien, Screening, doppelte Extraktion und eine angemessene Bewertung der Verzerrung. Siehe [Der zentrale Leselisten-Workflow](core-reading-list.md) für die Quellenverifizierung und [Antragsprüfung](pdf-evidence.md), wenn eine Schlussfolgerung genauer untersucht werden muss.
