---
title: "Artikel mit einer intelligenten Sammlung auswählen"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Artikel mit einer intelligenten Sammlung auswählen {/* #screen-papers-with-a-smart-collection */}

<p className="example-label"><strong>Praxisbeispiel</strong> Auswahl von Primärstudien zu Einatom-Katalysatoren für die CO2-Elektroreduktion</p>

Verwandeln Sie eine Kandidatenliste in ein überprüftes Leseset mit Ein- und Ausschlusskriterien. Dieses Beispiel holt acht Papiere ab, führt eine intelligente Sammlung über ihre Titel und Abstracts durch, überprüft die Entscheidungen und exportiert fünf Primärstudien. Es handelt sich um eine gezielte Gruppenbegegnungsauswahl, nicht um eine erschöpfende systematische Überprüfung oder eine Volltextqualitätsbewertung.

## 1. Finden und akzeptieren Sie die Kandidaten {/* #screening-inputs */}

Erstellen Sie das Projekt **Single-Atom Katalyse Screening** und eröffnen Sie ein Gespräch mit einem Arbeitsmodell. Dieser Lauf verwendete **Codex subscription**. Aktivieren Sie die entsprechenden Literatur-Steckverbinder und konfigurieren Sie bei Bedarf deren [Anmeldeinformationen](../guides/connectors.md). Senden:

```text
I am preparing a group meeting on single-atom catalysts for
electrochemical CO2 reduction. Find eight relevant papers published
from 2017 through 2022, including both primary studies and review
articles so I can screen them. Propose the references to the Library
Inbox, with verified titles, DOIs, abstracts and source links. Save a
short candidate list identifying each paper's study type.
Keep the output in English.
```

Öffnen Sie **Library → Inbox**, überprüfen Sie jeden Titel, DOI und Quelle, wählen Sie diese acht Datensätze aus und wählen Sie **Accept**. Bestätigen Sie, dass sie mit diesem Projekt verbunden sind. Andere ausstehende Posteingangsaufzeichnungen benötigen eine eigene Überprüfung; Akzeptieren Sie sie nicht, nur um den Posteingang zu löschen.

Das gespeicherte <ExampleDownload path="/examples/v0330/co2_single_atom_candidate_list.md">Kandidatenliste</ExampleDownload> zeichnet fünf Primärstudien und drei Rezensionen / Konten auf, einschließlich der Unterschiede zwischen Online-Erst- und Zeitschriftenjahren. Für eine genaue Wiederholung fügen Sie die acht DOIs in dieser Liste zum Projekt hinzu. Eine neue Themensuche kann verschiedene Kandidaten zurückgeben.

## 2. Binden Sie das Screening-Modell {/* #screening-model */}

Öffnen Sie **Settings → Model → Classification models**. Wählen Sie unter **Smart collections** einen konfigurierten Klassifizierungsdienst und dessen Modell aus. Verwenden Sie **Check model** auf der Servicekarte und bestätigen Sie **Check passed**. Dieses Beispiel verwendet **den Eintrag**; Main setzt sich mit Codex fort.

![Eine separate Modellbindung für Smart Collections](/img/open-science/v0330/classification-smart.webp)

Smart Collections haben kein Standardmodell. Die **Automatic capability selection**-Bindung ist eine andere Funktion und kann diese nicht ersetzen. Alle Smart Collections teilen sich die Screening-Bindung. Siehe [Einstufungsaufbau](../guides/models.md#smart-collection-model).

## 3. Definieren von Anwendungsbereich und Regeln {/* #screening-rules */}

Wählen Sie in der Bibliothek **New collection**, geben Sie **CO2-Reduktion - Primärstudien** ein und schalten Sie **Smart collection** ein. Setzen Sie **Scope** auf das **Project** mit dem Namen **Single-Atom Katalyse Screening**, so dass nur die acht Projektreferenzen ausgewertet werden.

| Feld | Text in diesem Beispiel verwendet |
| --- | --- |
| Description | Select primary experimental papers for a group meeting on single-atom catalysts for electrochemical CO2 reduction. |
| Inclusion criteria | Published from 2017 through 2022 inclusive. Reports original experimental research on atomically dispersed metal catalysts used for electrochemical CO2 reduction. |
| Exclusion criteria | Exclude reviews, Accounts, perspectives and purely computational studies. Exclude studies limited to thermal CO2 conversion or reactions other than CO2 electroreduction. |

Alle Aufnahmekriterien müssen erfüllt sein, und es kann kein Ausschlusskriterium gelten. Halten Sie **Use available full text** und **Update automatically** für diesen Titel-und-Abstract-Pass aus und wählen Sie dann **Create collection**. Der Screenshot zeigt die gespeicherten Regeln, die durch **Collection rule → Edit rule** wieder geöffnet wurden.

![Gespeicherte Kriterien, begrenzter Projektumfang und Evidenzoptionen](/img/open-science/v0330/smart-collection-rules.webp)

**Live rule preview** kann helfen, einen Entwurf anzupassen, aber seine Ergebnisse werden nicht gespeichert. **Use available full text** sendet verfügbaren PDF-Text an den Klassifikationsdienst; Lange PDFs verwenden relevante Passagen und nicht verfügbare PDFs fallen auf Titel und Abstract zurück. Überprüfen Sie die tatsächlichen Beweise für eine Entscheidung, bevor Sie sie als Volltextbewertung behandeln.

## 4. Führen Sie einen kleinen Screening-Pass durch {/* #screening-trial */}

Öffnen Sie **Collection actions → Trial run (up to 20 references)**, überprüfen Sie den Umfang und wählen Sie **Start trial run**. Die Studie speichert Entscheidungen und öffnet **Screening process**. Befolgen Sie die verarbeitete Zählung, ausstehende Kandidaten und eingehende Ergebnisse. **KI-Treffer** beschreibt die Modellentscheidungen dieses Laufs; manuelle Entscheidungen bestimmen immer noch die Mitgliedschaft in der Sammlung.

Um einen laufenden Durchlauf zu unterbrechen, wählen Sie **Pause** (beschriftet mit **Pause analysis**), warten auf **Pausiert**, und verwenden Sie dann **Resume analysis**. Ein Lauf darf nach seinen Regeln, Kandidatenpapieren oder gespeicherten Fortschrittsänderungen nicht mehr wieder aufgenommen werden können; Überprüfen Sie die aktuelle Regel, bevor Sie einen neuen Pass starten. **Zurück zu den Ergebnissen** kehrt zu Included, Needs review, Excluded and Not evaluation zurück. **Run details** zeigt Informationen über den Pass.

![Der abgeschlossene Screening-Prozess für die gleichen acht Kandidaten](/img/open-science/v0331/smart-completed.webp)

| Anzeigen | Bedienung |
| --- | --- |
| Aufgenommen | Lesen Sie die übereinstimmenden Papiere und bestätigen Sie die Förderfähigkeit. |
| Prüfung erforderlich | Beheben Sie Unsicherheit oder eine veraltete Bewertung mit der tatsächlichen Quelle. |
| Ausgeschlossen | Überprüfen Sie, ob der Ausschlussgrund mit Ihren Kriterien übereinstimmt. |
| Nicht ausgewertet | Überprüfen Sie fehlende Beweise oder einen gemeldeten Bewertungsfehler, bevor Sie erneut versuchen. Es ist keine Ausschlussentscheidung. |

Klicken Sie auf die **Evaluation details** einer Zeile, um die Entscheidung, die Übereinstimmungsergebnisse, die Beweise und die Modellhistorie zu überprüfen. Scores beschreiben Regel-Matching; Es handelt sich nicht um Messungen der Studienqualität oder der Effektgröße.

![Eine tatsächliche unsichere Entscheidung mit Titel-und-abstrakten Beweisen und Modellergebnissen](/img/open-science/v0330/screening-review.webp)

## 5. Überprüfen und bestätigen Sie das Leseset {/* #screening-review */}

Öffnen Sie den Papiertitel, lesen Sie den Abstract und folgen Sie dem DOI/Source-Link nach Bedarf. Vergleichen Sie das Veröffentlichungsdatum, die Art der Studie, den Katalysator und die Reaktion mit den Regeln. Wählen Sie **Include** oder **Exclude** erst nach dieser Überprüfung.

In dem Beispiel schloss der erste Durchgang zwei Überprüfungen aus, hinterließ fünf Primärstudien in **Needs review** und konnte keinen Datensatz mit unzureichenden lesbaren Beweisen auswerten. Die fünf Primärstudien wurden dann manuell einbezogen; die verbleibende Überprüfung wurde nach Überprüfung des Studientyps manuell ausgeschlossen. Dies ist der Überprüfungsschritt, nicht fünf automatische Aufnahmeentscheidungen.

![Eine Primärstudie, die manuell aufgenommen wurde, nachdem sie ihre Zusammenfassung und Kriterien überprüft hatte](/img/open-science/v0330/screening-manual-decision.webp)

| Überarbeitete Aufzeichnung | Endgültige Entscheidung | Basisbasis |
| --- | --- | --- |
| Ju, 2017 · [10.1038/s41467-017-01035-z](https://doi.org/10.1038/s41467-017-01035-z) | Aufnehmen | Experimenteller Vergleich von Metall-Stickstoff-Kohlenstoff-CO2-Elektrokatalysatoren. |
| Zhang, 2019 · [10.1002/anie.201906079](https://doi.org/10.1002/anie.201906079) | Aufnehmen | Vorbereitung und elektrochemische Prüfung von FeN5-Stellen. |
| Cai, 2021 · [10.1038/s41467-020-20769-x](https://doi.org/10.1038/s41467-020-20769-x) | Aufnehmen | Experimentelle Cu-Site-Katalysatorstudie zur CO2-zu-Methan-Umwandlung. |
| Li, 2022 · [10.1021/acs.nanolett.1c04382](https://doi.org/10.1021/acs.nanolett.1c04382) | Aufnehmen | Experimentelle Phosphorabstimmung von Fe-Einatom-Katalysatoren. |
| Zhang, 2021 · [10.1002/anie.202014718](https://doi.org/10.1002/anie.202014718) | Aufnehmen | Experimentelle Vorbereitung und CO2-Tests von unterstützten Ag-Standorten. |
| Su, 2019 · [10.1021/acs.accounts.8b00478](https://doi.org/10.1021/acs.accounts.8b00478) | Ausschließen | Konto; Außerhalb der Primarstudie Regel. |
| Li, 2020 · [10.1002/adma.202001848](https://doi.org/10.1002/adma.202001848) | Ausschließen | Überprüfung; als Hintergrundwert gesondert aufzubewahren. |
| Wang, 2022 · [10.1002/smm2.1101](https://doi.org/10.1002/smm2.1101) | Ausschließen | Überprüfung, manuell klassifiziert nach Überprüfung der Quelle. |

Manuelle Entscheidungen bleiben bestehen, wenn die Sammlung aktualisiert wird. **Use model decision** entfernt einen individuellen manuellen Override; **Reset manual decisions** im Sammelmenü hat einen breiteren Umfang. Überprüfen Sie diesen Bereich, bevor Sie ihn verwenden.

## 6. Exportieren und Verwenden der ausgewählten Papiere {/* #screening-export */}

Bestätigen Sie **Eingeschlossen 5**, **Ausgenommen 3** und null verbleibende **Needs review**- oder **Not evaluated**-Einträge. Die Einschlusszeilen sollten **Manually included** für dieses Beispiel sagen. Die First-Pass-Werte Ihres Modells können unterschiedlich sein.

![Fünf manuell enthaltene Papiere und der endgültige 5/3-Split](/img/open-science/v0330/screening-included.webp)

Wählen Sie **Collection actions → Export included references → BibTeX** oder **RIS**, speichern Sie die Datei und überprüfen Sie, ob sie fünf DOI-Einträge enthält. Das <ExampleDownload path="/examples/v0330/screened-primary-studies.bib">Beispiel BibTeX</ExampleDownload> bewahrt die exportierten Zitate mit Abstracts, die zur Weiterverteilung entfernt wurden. Es ist eine Bibliographie, kein Screening-Entscheidungsprotokoll oder PDF-Bundle. Halten Sie das <ExampleDownload path="/examples/v0330/screening-decisions.csv">Überprüfung der Entscheidungstabelle</ExampleDownload> bei der Übergabe der Auswahl neben sich.

Verwenden Sie das ausgewählte Set für ein [Lesepackung für Gruppentreffen](journal-club.md). Erhalten und prüfen Sie die Volltexte, bevor Sie detaillierte Ergebnisse extrahieren oder die Katalysatorleistung vergleichen. **Update automatically** kann neue oder geänderte Datensätze im gewählten Umfang auswerten und kann Servicekosten verursachen; Es durchsucht keine externen Datenbanken nach neuen Papieren.
