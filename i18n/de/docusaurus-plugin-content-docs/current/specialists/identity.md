---
title: "Erstellen und Anweisen eines Specialist"
last_update:
  date: '2026-11-11'
---

# Erstellen und Anweisen eines Specialist {/* #create-and-instruct-a-specialist */}

<p className="example-label"><strong>Beispiel</strong> Erstellen einer RNA-seq QC Reviewer Rolle</p>

Erstellen Sie **RNA-seq QC Reviewer**, um ein Rohzählergebnis unabhängig zu überprüfen. Das Beispiel konzentriert sich auf Identifikatoren, numerische Vollständigkeit und arithmetische Invarianten, wobei die biologische Interpretation außerhalb dieser begrenzten Kontrolle bleibt.

## Machen Sie die Verantwortung testbar {/* #make-the-responsibility-testable */}

Geben Sie den Input und den erwarteten Output an, nicht nur „Sie sind ein Experte. Ein QC-Reviewer sollte genau berichten, welche Tabelle er gelesen hat und welche Prüfungen bestanden haben. Eine reine Metadatenprüfung darf nicht behaupten, die ursprünglichen Zählungen neu berechnet zu haben. Verwenden Sie für die Dateiübergabe eine aktuelle unveränderliche Version, die von der App zurückgegeben wird; Ein Dateiname ist keine Versionsidentität.

Die gespeicherte Rolle wurde erstellt, wiedereröffnet, exportiert, dupliziert und in einer echten delegierten Inline-CSV-Überprüfung verwendet. Seine unabhängige Arithmetik bestanden alle zwölf Probeninvarianten. Siehe [Delegieren und Prüfen](./delegate.md) für die Evidenzgrenze und Datei-Handoff-Beschränkung.

## Erstellen Sie die Rolle {/* #create-the-role */}

1. Öffnen Sie **Resource center → Specialists → Add specialist → Write from scratch**.
2. Geben Sie **RNA-seq QC Reviewer** als Name und **Überprüfen Sie die Integrität der Rohzählung und die Stichprobenmetriken mit rückverfolgbaren öffentlichen biomedizinischen Inputs.** als Beschreibung ein.
3. Wählen Sie ein Icon und eine Farbe. Das Beispiel verwendet **Gehirn / Purpur**. Die Live-Vorschau zeigt die Liste / Picker Aussehen.
4. Erweitern Sie **Advanced settings** und prüfen Sie die generierte ID `rna-seq-qc-reviewer` vor der Erstellung.
5. Geben Sie die nachstehenden Hinweise ein.
6. Schalten Sie **Full access** aus, weisen Sie die RNA-seq Skill und Omics Archive wie in [Funktionen](./capabilities.md) gezeigt zu und wählen Sie dann **Create specialist** aus.
7. Durchsuchen Sie die gespeicherte Zeile und öffnen Sie sie erneut. Bestätigen Sie die genaue ID, Anweisungen und zwei Fähigkeitsbindungen.

![Identitätsfelder im englischen Specialist Editor](/img/open-science/capabilities-walkthrough/04-specialist-identity.webp)

```text
You review bulk RNA-seq raw-count quality. Use the rnaseq-count-qc Skill when validating a count matrix. For a precomputed QC table, inspect the full sample identifiers, numeric completeness, nonnegative values, and whether zero-count plus detected genes equals the stated gene count. Use available Notebook tools for arithmetic; do not install new packages for this bounded review. Cite source filenames and actual outputs. Separate verified findings from unresolved checks. Never infer differential expression, clinical significance, or quality cutoffs from library totals alone. For metadata queries, use only the assigned Omics Archives connector. Return a concise PASS/FAIL table and the limitations of the available input.
```

### Redaktionskontrollen {/* #editor-controls */}

| Feld | Bedeutung und Limit |
| --- | --- |
| Icon / Farbe | nur Aussehen; Das Ändern dieser ändert weder das Modell noch den Zugriff. |
| Name | erforderlich; bis zu 80 Zeichen. |
| Beschreibung | Fakultativ; bis zu 1,000 Zeichen. Beschreibt, wann die Rolle ausgewählt werden soll. |
| Erweiterte Einstellungen Specialist ID | Vor der Schöpfung erzeugt; kann sich danach nicht ändern. Verwenden Sie die gespeicherte ID in einer expliziten Delegation. |
| Anweisungen | Bis zu 32,768-Zeichen. An die Basisaufforderung angehängt; ersetzt keine Werkzeug- oder Zugriffsregeln. |
| Voller Zugriff | Main Agent's Skills/Connectors; unabhängig vom Genehmigungsmodus. |
| Skills / Steckverbinder | Explizite Bindungen, wenn der Vollzugriff deaktiviert ist. |
| Abbrechen | Verwirft den Entwurf. |
| Spezialisten erstellen | Speichert eine neue Rolle. |
| Anzeigename / Paketversion / Änderungen speichern | Erscheint beim Bearbeiten eines vorhandenen / importierten Pakets. Die gespeicherte Identität bleibt fest. |

Bezugsnummer der Durchführung: [SpezialistEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx).
