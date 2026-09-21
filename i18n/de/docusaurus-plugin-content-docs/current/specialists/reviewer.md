---
title: "Reviewer und Auto-Review"
last_update:
  date: '2026-09-17'
---

# Reviewer und Auto-Review {/* #reviewer-and-auto-review */}

Der eingebaute Reviewer prüft eine abgeschlossene Antwort auf die Anfrage und die ihr zur Verfügung stehenden Beweise. Es ist getrennt von einem benutzerdefinierten Specialist, dessen Name "Reviewer" enthält, und getrennt von der Genehmigung.

Verwenden Sie für einen exekutiven Outputvergleich [Reproduzierbarkeit](../guides/reproducibility.md). Eine Reviewer-Bewertung und eine reproduzierte Ausgabe sind separate Datensätze.

## Session Review versus Artefakt Review {/* #session-review-versus-artifact-review */}

Eine Gesprächsüberprüfung und die Registerkarte **Review** des Provenienzfelds eines Artefakts sind unterschiedliche Datensätze. Überprüfen Sie die genaue Artefaktversion, die Sie teilen möchten. Wenn es **No review for this version** sagt, bewahren Sie dieses Etikett auf, auch wenn eine andere Antwort überprüft wurde. Ebenso bleiben **partial**-Umgebungserfassung und **eingegrenzt**-Beweise teilweise und begrenzt, nachdem ein Modell Vertrauen ausdrückt.

Bei Eingabefehlern fügen Sie einen zugänglichen aktuellen Eingang an oder lösen Sie seine tatsächliche Version über die Anwendung auf. Die Existenz einer lokalen Datei garantiert nicht, dass jeder Kinder-/Reviewer-Kernel sie lesen kann. Siehe [Notebook](../guides/notebook.md), [Delegation](./delegate.md) und [Fehlerbehebung](../guides/troubleshooting.md).

Überprüfen Sie die ausgewählte Artefaktversion beim Wiedereröffnen einer historischen Überprüfung. Lesen Sie nach Abbrechen einer Überprüfung oder Korrektur den endgültigen Zustand und die beibehaltenen Ergebnisse, bevor Sie entscheiden, ob Sie eine Wiederholung durchführen möchten. Die Stornierung führt nicht zu einer erfolgreichen Überprüfung.

## Wählen Sie ein Ergebnis, das Sie überprüfen können {/* #choose-a-result-you-can-check */}

Für eine erste Überprüfung füllen Sie den [Inline-Tabellenprüfung](delegate.md#verified-example-twelve-sample-invariants) aus: Geben Sie die vollständige Sample-QC-Tabelle an und fragen Sie nach einem arithmetischen Ergebnis pro Probe. Dies liefert ein präzises Kriterium: zwölf eindeutige Probenidentifikatoren, zwölf Zeilen und Nullzählung plus erkannte Gene, die der Gesamtgenzahl für jede Zeile entsprechen.

Öffnen Sie vor der Überprüfung das Child-Ergebnis und seine Notebook-Ausgabe selbst. Dann fordern Sie eine Überprüfung dieser Antwort. Vergleichen Sie die Überprüfungen mit diesen Kriterien; Wenn eine Zeile oder ein ausgeführtes Ergebnis fehlt, lösen Sie diesen Befund, bevor Sie das Ergebnis verwenden. Die Ergebnisse der Überprüfung hängen von der Reaktion und den verfügbaren Beweisen ab. Diese Übung verspricht kein Null-Finding-Abzeichen.

## Beantragung einer Überprüfung {/* #request-a-review */}

1. Schließen sie eine konversationsrunde mit einem arbeitsmodell ab.
2. Öffnen Sie den Komponisten **+ menu → Request review**. Das Menü wechselt zu **Reviewing…**, während die Überprüfung läuft.
3. Öffnen Sie die resultierende **Reviewer**-Karte. Lesen Sie die Anzahl der Befunde und Schecks und erweitern Sie dann die Erklärung jedes Schecks.
4. Wählen Sie **Go to transcript**, um **Session Reviewer** zu öffnen. Überprüfen Sie das Modell, den Zeitstempel, die PASS/FAIL-Anweisungen, die Beweisreferenzen und **Reviewer log**.
5. Wenn Korrekturen angefordert werden, überprüfen Sie die Nachverfolgung des Main-Agenten und alle Anfragen zur Kindererlaubnis. Review gewährt diese Operationen nicht automatisch.
6. Verwenden Sie **Re-run review**, nachdem Sie das identifizierte Problem behoben haben. Bewahren Sie ungelöste Ergebnisse auf, wenn eine erforderliche Eingabe oder Operation noch nicht verfügbar ist.

<p className="example-label"><strong>Praxisbeispiel</strong> Lesen Sie eine Rezension mit ungelösten Ergebnissen</p>

<details>
<summary>Sehen Sie sich die Kontrollen und ungelösten Ergebnisse an</summary>

Mit der Codex-Authentifizierung mit gpt-5.6-sol hat die manuelle Überprüfung **vier Kontrollen und eine Feststellung** zurückgegeben:

| Überprüfung | Tatsächliches Ergebnis |
| --- | --- |
| Der Specialist hat die Inline-CSV-Überprüfung durchgeführt | PASS; In der Überprüfung wurden die Kinderübergabe und die arithmetischen Ergebnisse genannt. |
| Benutzerdefinierte MCP-Ergebnisse und Fehler wurden korrekt gemeldet | PASS; gültige Metriken und die Ausführungsausgabe des Verbindungsfehlers. |
| Der Molekülaufruf erzeugte das angegebene Artefakt / die angegebenen Deskriptoren | PASS; die zurückgegebene Artefaktversion und die Werte wurden identifiziert. |
| Das Modell inspizierte die gespeicherte Molekülvorschau wie gewünscht | FAIL; Der Katalog-Lookup hat den Strukturinhalt nicht gelesen. |

Das Beispiel endet mit **Fix Limit erreicht / Probleme gefunden**, da das Modell nicht auf die für die Strukturprüfung benötigte verwaltete Eingabe zugreifen konnte. Öffnen Sie den Befund, um die fehlende Eingabe zu identifizieren, und geben Sie sie an, bevor Sie eine weitere Überprüfung anfordern. Durch das manuelle Öffnen der Struktur im Viewer wird der Inspektionsrekord des Modells nicht aktualisiert.

</details>

## Auto-Review-Kontrollen {/* #auto-review-controls */}

Öffnen Sie **Agent controls → Auto-review**, um die Überprüfung nach zukünftigen Antworten zu konfigurieren. Dies ist eine Gesprächspräferenz; Es unterscheidet sich von **Ask for approval** und **Delegation**. Die eingebaute Reviewer-Zeile in Einstellungen hat keine gewöhnlichen Bearbeiten/Löschen/Aktivieren-Steuerelemente und ist vom normalen Specialist-Picker ausgeschlossen.

| UI-Zustand oder Kontrolle | Bedeutung |
| --- | --- |
| Request Review nicht verfügbar | Überprüfen Sie eine aktive Antwort / Überprüfung, eine fehlende berechtigte Antwort oder eine nicht verfügbare Modelleinrichtung. |
| Review läuft… | Die Überprüfung läuft noch; Behandle es nicht als vollständig. |
| Prüfer · n Befunde · n Prüfungen | Öffnet die Schecks und ihre Beweise. Ein Null-Ergebnis ist immer noch durch das, was überprüft wurde, begrenzt. |
| Korrekturen erbeten | Main Agent kann einen Folgekorrekturzyklus ausführen. Überprüfen Sie neue Operationen und ihre Ergebnisse. |
| Probleme gefunden / Fix Limit erreicht | Die Überprüfung löste nicht jeden Befund. Lesen Sie die neueste Erklärung, bevor Sie einen neuen Versuch beginnen. |
| Zum Transkript | Öffnet die dedizierte Session Reviewer-Seite. |
| Erweitern / Collapse Reviewer Log | Enthüllt oder verbirgt sein Betriebsprotokoll; ein verkürztes Protokoll ist kein vollständiger Nachweis. |
| Review erneut ausführen | fordert eine weitere Überprüfung an; Es ist kein "Akzeptiere alle Ergebnisse" -Button. |

<span id="what-the-local-review-checked" />

### Führen Sie Auto-Review mit einem separaten Modell aus {/* #run-auto-review-with-a-separate-model */}

1. Wählen Sie unter **Settings → Model → Reviewer** ein verfügbares festes Modell aus. Das ausgeübte Setup verwendete `gpt-5.6-sol` für Main und `gpt-5.6-luna` für Reviewer.
2. Öffnen Sie **Agent controls → Auto-review** in der Zielkonversation, bestätigen Sie **On** und senden Sie dann die nächste Anfrage.
3. Nach der Antwort erweitern Sie die automatisch erstellte **Reviewer**-Karte. Überprüfen Sie das Modell, das Kriterium, den Nachweis und das Ergebnis.
4. Wenn **Corrections requested** erscheint, überprüfen Sie die Korrektur von Main und die anschließende Überprüfung, bevor Sie entscheiden, ob der Befund behoben ist.

Von v0.30.2 aus behält Auto-review seine Einstellung bei, wenn eine Konversation beginnt, und verknüpfte Korrekturkurven behalten die für den Korrekturzyklus erforderliche Überprüfungsrückmeldung bei. Schalten Sie es vor dem Senden ein und überprüfen Sie dann die tatsächliche Reviewer-Karte und die überarbeitete Ausgabe von Main. Kontexterhaltung bedeutet nicht, dass ein Befund korrigiert wurde; Lesen Sie die anschließende Überprüfung und die verbleibenden Ergebnisse.

### Was "aufgelöst" ist, bestimmt {/* #what-resolved-establishes */}

Eine Überprüfung kann behoben werden, weil ein angeforderter Versuch durchgeführt wurde und der Fehler bei der Berechtigung genau gemeldet wurde. Dies stellt nicht fest, dass die Datei lesbar war oder ihre Berechnungen bestanden haben. Lesen Sie das Kriterium, das Werkzeugergebnis und die verbleibenden Ergebnisse zusammen. Wenn der Zugriff blockiert bleibt, folgen Sie dem [File-Handoff bekanntes Problem](delegate.md), bevor Sie eine weitere Überprüfung starten.


Bezugsnummer der Durchführung: [SessionReviewerPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/SessionReviewerPanel.tsx), [ComposerAgentControlsMenu.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerAgentControlsMenu.tsx).
