---
title: "Erstellen eines Skill und seiner unterstützenden Dateien"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Erstellen eines Skill und seiner unterstützenden Dateien {/* #create-a-skill-and-its-supporting-files */}

Verwandeln Sie einen wiederholten RNA-seq-Check in eine wiederverwendbare Methode mit dem [öffentliche Beispieleingabe](../reference/example-data.md). Diese Methode überprüft die Rohzählungen; es führt keine Differenzexpressionstests durch.

Die Beispiele verwenden zwei unabhängige Paketnamen:

| Erstellungsroute | Gespeicherte Skill ID | Verwenden Sie es mit |
| --- | --- | --- |
| **Save as skill** Aus einem abgeschlossenen Gespräch | `rnaseq-descriptive-qc` | Wählen Sie das veröffentlichte Personal Skill in einem neuen Gespräch aus |
| Handbuch unten | `rnaseq-count-qc` | Wählen Sie das manuell erstellte Skill mit genau dieser ID aus |

Folgen Sie beiden Routen durch Veröffentlichen, Suchen und Wiederverwenden. Verwenden Sie den Namen, den Sie tatsächlich gespeichert haben; Die beiden IDs sind keine Aliase. Wenn Sie ein Paket umbenennen, verwenden Sie die neue gespeicherte Identität in der nächsten Anfrage.

## Wählen Sie eine Schöpfungsroute {/* #choose-a-creation-route */}

| Startpunkt | Verwenden Sie diesen Eintrag | Was passiert |
| --- | --- | --- |
| Ein abgeschlossenes Gespräch enthält ein Verfahren, das es wert ist, wiederholt zu werden | Konversation **+ → Save as skill** | Der Agent destilliert den aktiven Branch und verwendet Customize / Skill Creator, um ein wiederverwendbares Paket vorzubereiten. |
| Sie möchten eine neue Methode im Gespräch beschreiben | Einstellungen **Add skill → Chat with agent**, oder **Customize** | Arbeiten Sie mit dem Agenten zusammen, um die Methode zu entwerfen und sie vor der Veröffentlichung zu inspizieren. |
| Sie haben bereits Anweisungen und unterstützende Dateien | Einstellungen **Add skill → Write from scratch** | Geben Sie das Paket direkt mit dem Editor unten ein. |
| Sie haben bereits ein Paket oder Repository | **Upload Skills / Import aus GitHub / Installierte Skills importieren** | Überprüfung und Import vorhandener Ressourcen; siehe [Verwalten von Skills](./manage.md). |

## Save as skill: Verwandeln Sie ein abgeschlossenes Gespräch in eine Methode {/* #save-as-skill-turn-a-completed-conversation-into-a-method */}

Verwenden Sie dies, nachdem eine wiederholbare Prozedur tatsächlich funktioniert hat - zum Beispiel das Überprüfen einer rohen RNA-seq-Zählmatrix, das Bewahren ihrer Identifikatoren, das Berechnen von Beispielmetriken und das Wiederöffnen der Ausgaben. **Save as skill** verwendet das **Active Conversation Branch**, einschließlich Ziel, Werkzeuge, Schritte und Benutzerkorrekturen. Es fordert den Agenten auf, das wiederverwendbare Verfahren zu extrahieren, nicht das Transkript zu kopieren. Wenn der Branch keine abgerechnete Prozedur hat, die es wert ist, wiederverwendet zu werden, kann der Agent dies erklären und aufhören, ohne ein Skill zu erstellen.

1. Öffnen Sie die entsprechende Konversation und wählen Sie den Zweig aus, der die Prozedur enthält, die Sie beibehalten möchten.
2. Beenden Sie die aktuelle Antwort und jede Subagentenarbeit. Beheben Sie ausstehende Genehmigungen, unterbrochene Wendungen oder Sitzungsfehler. Der Branch muss mit einer abgeschlossenen Agent-Antwort enden.
3. Öffnen Sie das **+ menu → Save as skill** des Komponisten. Bewegen Sie über ein deaktiviertes Element, um den spezifischen Grund zu lesen.
4. Das Element ändert sich in **Saving as skill…**, während der Agent arbeitet. Dies startet eine modellgestützte operation in der konversation. Es öffnet nicht den manuellen Namens-/Beschreibungseditor oder speichert sofort einen ZIP.
5. Überprüfen Sie den vorgeschlagenen Skill-Namen, die auslösende Beschreibung, die Schritte, die unterstützenden Dateien und das Validierungsergebnis. Reagieren Sie auf Klarstellungen oder Betriebsgenehmigungen, falls vorhanden. **Customize** bleibt aktiviert; die aktive Rolle muss weiterhin über die entsprechenden Fähigkeiten verfügen.
6. Überprüfen Sie den Entwurf, bevor Sie die Veröffentlichung annehmen. Entfernen Sie studienspezifische Pfade, temporäre IDs, Anmeldeinformationen und nicht unterstützte Schlussfolgerungen; die Anforderungen und Kontrollen an wiederverwendbare Eingaben beizubehalten. Ein vorhandenes Personal Skill darf nicht ohne explizite Ersatzentscheidung überschrieben werden.
7. Öffnen Sie nach der Veröffentlichung **Resource center → Skills**, suchen Sie den gemeldeten Namen und prüfen Sie **Files**, die gespeicherte Verfügbarkeit von SKILL.md und Main Agent. Exportieren Sie es, wenn Sie das vollständige Paket überprüfen müssen.
8. Führen Sie eine separate Bounded Request mit dem gespeicherten Skill aus. Ein erfolgreich gespeichertes Paket ist kein Beweis dafür, dass ein zweiter Datensatz oder ein späterer Aufruf bestanden hat.

### Rette die Forschungsmethode {/* #save-the-research-method */}

<p className="example-label"><strong>Praxisbeispiel</strong> Speichern Sie eine RNA-seq-Methode als Skill</p>

Nachdem Sie GSE60450 QC in einer neuen Sitzung abgeschlossen haben, wählen Sie **+ → Save as skill** aus und fordern Sie ein separates **rnaseq-descriptive-qc**-Paket an, wobei vorhandene Pakete beibehalten werden. Der native Workflow erstellte einen Entwurf mit einem **SKILL.md**. Die Validierung hat keine Fehler oder Warnungen zurückgegeben.

![Nativer Skill-Entwurf und Validierungsergebnis](/img/open-science/v0.27.0/16-native-skill-draft-validated.webp)

Überprüfen Sie den Namen, die auslösende Beschreibung, Eingaben, metrischen Definitionen und Stoppbedingungen, bevor Sie die Veröffentlichung in Personal Skills bestätigen. Verwenden Sie dann **Resource center → Skills → Search skills**, öffnen Sie die gespeicherten Anweisungen und inspizieren Sie **Availability** und **Files**. Laden Sie das aktuelle veröffentlichte <ExampleDownload path="/examples/capabilities/rnaseq-descriptive-qc/SKILL.md">SKILL.md</ExampleDownload> herunter.

![Native Publikation gefunden in Personal](/img/open-science/v0.27.0/17-native-skill-published.webp)

![Wiedereröffnete Anweisungen und Verfügbarkeit](/img/open-science/v0.27.0/18-native-skill-instructions.webp)

### Warum der Button nicht verfügbar ist {/* #why-the-button-is-unavailable */}

Der Tooltip identifiziert die erste Blockierbedingung. Das Beheben kann eine zweite Bedingung offenbaren. **Warten Sie, bis die aktuelle Agent-Aktivität abgeschlossen ist.** kann erscheinen, wenn die Sitzung nicht im Leerlauf ist, einschließlich eines Fehlerzustands; Es ist kein zuverlässiges Versprechen, dass das Warten allein das Problem lösen wird. Überprüfen Sie alle Fehler-Banner und anstehende Interaktion in der Konversation. Bei einer unterbrochenen Antwort lösen oder setzen Sie diese Antwort mit der angebotenen Aktion der Anwendung fort und warten dann auf den Abschluss, bevor Sie die Methode speichern.

| Exakter Tooltip | Was zu überprüfen ist |
| --- | --- |
| Öffnen Sie ein Gespräch, bevor Sie es als Skill speichern. | Öffnen Sie ein bestehendes Gespräch mit dem Verfahren, das Sie benötigen. |
| Der Customize Skill ist für den aktiven Specialist nicht verfügbar. | Prüfen Sie die aktive Rolle und den Zugang zu ihren Fähigkeiten. Customize bleibt global aktiviert; Dieser Tooltip betrifft den aktuellen Specialist. |
| Warten Sie, bis der Konversationsverlauf das Laden beendet hat. | Lassen Sie den ausgewählten Zweig das Laden beenden. |
| Close side chat, bevor sie diese konversation als Skill speichern. | Bewahren Sie sich zuerst nützliche Ratschläge. Bestätigung [Side-Chat schließen](../guides/delegation.md) stoppt es und löscht seine gespeicherte Konversation; Zurück zu Main. |
| Warten Sie, bis alle Unteragenten fertig sind. | Überprüfen Sie die ausstehenden Kinderaufgaben und deren Genehmigungen. |
| Sparen, wie Geschick läuft. | Lesen Sie den bestehenden Creation Run; Beginnen Sie nicht mit einem anderen. |
| Lösen Sie zuerst den aktuellen Sitzungsvorgang auf. | Beenden Sie die Wiederherstellung, bis die Kontextwiedergabe / -rücksetzung, Korrekturschleife oder Kompaktierung ansteht. |
| Warten Sie, bis die aktuelle Agent-Aktivität abgeschlossen ist. | Lösen Sie aktive Arbeit, eine ausstehende Interaktion oder eine Nicht-Idle / Fehler-Sitzung; den tatsächlichen Status zu überprüfen. |
| Beheben Sie zuerst den Synchronisationsfehler des Konversationszweigs. | Beheben Sie den angezeigten Synchronisationsfehler vor dem erneuten Versuch. |
| Die geschichte des konversationszweigs ist nicht verfügbar. | Wiedereröffnung der vorgesehenen verfügbaren Zweigstelle; Bewahren Sie den Fehler, wenn seine Geschichte nicht geladen werden kann. |
| Warten Sie auf eine vollständige Antwort des Agenten. | Die Zweigstelle muss mit einer abgeschlossenen Antwort enden; ein leerer Branch oder eine finale Benutzernachricht nicht ausreicht. |

Wiederherstellungs- und ausstehende Sitzungsvorgänge können die Aktion weiterhin blockieren; Verwenden Sie den angezeigten Grund, anstatt wiederholt eine neue Erstellungsanforderung zu starten. Sie sind von der Dienstauthentifizierung getrennt: Wenn der Erstellungslauf startet, die Modellanforderung jedoch fehlschlägt, folgen Sie dem zurückgegebenen Modell- / Dienstfehler in [Fehlerbehebung](../guides/troubleshooting.md).

## Write from scratch: Create im Editor {/* #write-from-scratch-create-in-the-editor */}

Verwenden Sie **Write from scratch**, wenn Sie bereits Methodenanweisungen und unterstützende Dateien haben. Die folgenden Schritte verwenden `rnaseq-count-qc`.

### Bereiten Sie das Paket vor {/* #prepare-the-package */}

<p className="example-label"><strong>Beispiel</strong> Erstellen Sie das rnaseq-count-qc Paket</p>

Laden Sie die aktuelle <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/SKILL.md">SKILL.md</ExampleDownload> und <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/references/sample-metric-schema.md">sample-metric-schema.md</ExampleDownload> oder die <ExampleDownload path="/examples/capabilities/rnaseq-count-qc.zip">Ausgeführter ZIP</ExampleDownload> herunter.

```text
rnaseq-count-qc/
  SKILL.md
  references/
    sample-metric-schema.md
```

Die Referenz definiert die Stichprobenmetriken und deren Interpretation. Bewahren Sie die Studiendaten im Projekt auf; Verwenden Sie Skill für wiederverwendbare Regeln, anstatt einen privaten Datensatz in ein tragbares Paket einzubetten.

<span id="create-and-publish" />

### Füllen Sie die Felder aus und veröffentlichen Sie {/* #complete-the-fields-and-publish */}

1. Öffnen Sie **Resource center → Skills → Add skill → Write from scratch**.
2. Fügen Sie die komplett heruntergeladene SKILL.md in **Skill body** ein. Seine YAML-Frontmatter bevölkert **Name** und **Description**.
3. Bestätigen Sie, dass der Name `rnaseq-count-qc` ist. Lesen Sie den gerenderten / Body-Inhalt vor dem Speichern; Ein gültiger Name allein bestätigt die wissenschaftliche Methode nicht.
4. Öffnen Sie **Advanced settings → Add reference files** und wählen Sie `sample-metric-schema.md`. Der Editor platziert diese Ressource unter `references/`.
5. Überprüfen Sie die Referenzanzahl und Paketgröße und wählen Sie dann **Publish** aus.
6. Durchsuchen Sie die neue persönliche Zeile und öffnen Sie sie erneut. Bestätigen Sie die Anweisungen, Verfügbarkeit und Dateien; Exportieren Sie das Paket, um beide Einträge zu prüfen.

![RNA-seq Skill Body und unterstützende Datei](/img/open-science/capabilities-walkthrough/01-skill-create.webp)

| Feld oder Button | Was einzugeben oder zu überprüfen |
| --- | --- |
| Name | Eine erkennbare Methodenkennung. Blank-Input-Shows **Name is required.** |
| Beschreibung | Sagen Sie, wann die Methode ausgewählt werden soll, nicht nur zu welchem Feld sie gehört. |
| Schreiben / Upload | Geben Sie direkt Text ein oder wählen Sie eine Datei als Body-Quelle aus. |
| Inhalt der Fähigkeit | Vollständige Betriebsanweisungen: Eingaben, Prüfungen, Ausgabe und Haltebedingungen. |
| Erweiterte Einstellungen | Öffnet die Steuerung von unterstützenden Dateien und die Paketnutzung. |
| Referenzdateien hinzufügen | Fügt wiederverwendbare Schemata, Beispiele oder Skripte hinzu; sicherstellen, dass die im Körper verwendeten Pfade mit dem gespeicherten Paket übereinstimmen. |
| Referenzdateientfernung | Entfernt diese Entwurfsressource; Überprüfen Sie danach auf gebrochene Referenzen im Körper. |
| Cancel / Zurück zu Skills | Verlässt den Editor; Verwenden Sie Cancel, um einen Entwurf zu verwerfen. |
| Publish / Saving... | Erstellt das persönliche Paket; Warten Sie auf den Abschluss und überprüfen Sie die gespeicherte Zeile. |

Der Editor erlaubt bis zu **16,383 Referenzdateien** innerhalb des **128 MB**-Paketbudgets. Importe müssen auch die Archivvalidierung bestehen; siehe [Verwalten von Skills](./manage.md).

## Schreibe Anweisungen, die überprüft werden können {/* #write-instructions-that-can-be-checked */}

Das Beispiel erfordert, dass der Agent die vollständigen Gen- / Probenidentifikatoren bewahrt, `EntrezGeneID` und `Length` von Zählungen trennt, fehlerhafte Zeilen und fehlende Werte ablehnt und vor / nach Hashes vergleicht. Es gibt vier Beispielmetriken und separate Ausgabedateien an. Diese Anforderungen machen ein falsches oder unvollständiges Ergebnis sichtbar.

Fügen Sie eine klare Stoppbedingung hinzu: Wenn die Quelle nicht gelesen werden kann oder eine Zählung fehlt, melden Sie dieses Eingabeproblem. Eine wiederverwendbare Methode sollte den Datensatz nicht stillschweigend ändern oder die angeforderte Analyse ersetzen.

<span id="validate-the-saved-skill" />

## Verifizieren und Wiederverwenden des Skill {/* #verify-and-reuse-the-skill */}

Verwenden Sie für die manuelle `rnaseq-count-qc`-Route die Eingabeaufforderung in [Skills](./overview.md). Öffnen Sie den generierten Bericht und den Notebook-Datensatz und überprüfen Sie dann die Eingabe, die Dimensionen, die metrischen Definitionen und die Ausgabe mit [Beispieldaten](../reference/example-data.md).

Öffnen Sie für eine spätere Bearbeitung das **Actions → Edit** des Personal-Pakets, ändern Sie die Methode, speichern Sie und geben Sie dann eine neue Anforderung aus. Vergleichen Sie die überarbeitete Ausgabe mit dem vorherigen Ergebnis. Durch das Deaktivieren oder Bearbeiten eines Pakets werden die Anweisungen, die bereits in einem laufenden Zuge gelesen wurden, nicht zurückgedreht.

Verwenden Sie für einen agentengestützten Entwurf **Add skill → Chat with agent** oder den **Customize**-Eintrag. Überprüfen Sie die vorgeschlagenen Anweisungen und lesen Sie das veröffentlichte Paket mit den gleichen Prüfungen zurück; Eine Chat-Antwort, die ein Skill beschreibt, ist nicht das gespeicherte Paket selbst.

### Wiederverwendung des veröffentlichten Skill in einer neuen Sitzung {/* #reuse-the-published-skill-in-a-new-session */}

1. Starten Sie eine neue Sitzung und fügen Sie die ursprüngliche öffentliche GSE60450-Zählmatrix an.
2. Fordern Sie **rnaseq-descriptive-qc** mit Namen an. Fragen Sie nach seinen vier Metriken pro Stichprobe, einer unveränderten Eingabe, einem CSV und einem knappen Bericht.
3. Überprüfen Sie die Notebook-Ausführung und öffnen Sie beide generierten Dateien. Überprüfen Sie die gespeicherten Ergebnisse mit der ursprünglichen Eingabe, anstatt sich nur auf die Abschlussnachricht zu verlassen.

Öffnen Sie den neuen CSV erneut und melden und vergleichen Sie ihn nach vollständiger Beispielkennung mit dem [Gemeinsame Baseline](../reference/example-data.md). Überprüfen Sie den Input Hash. Wenn Sie den Skill auf eine andere Studie anwenden, wiederholen Sie diese Überprüfungen mit dem eigenen Input und dem experimentellen Design dieser Studie.

![Ein separater Aufruf und der wieder geöffnete QC CSV](/img/open-science/v0.27.0/19-native-skill-reuse.webp)

Bezugsnummer der Durchführung: [SkillEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillEditor.tsx), [host-skills-service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/skills/host-skills-service.ts).

Sparen Sie sich als Skill-Implementierung: [Verfügbarkeit](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/workspace/save-as-skill-availability.ts), [Gesprächsdestillation](https://github.com/aipoch/open-science/blob/v0.27.0/src/main/acp/interrupted-turn-continuation.ts), [Skill Schöpfer](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/skill-creator/SKILL.md).
