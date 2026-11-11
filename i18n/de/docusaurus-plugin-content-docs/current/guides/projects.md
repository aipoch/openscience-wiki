---
title: "Projekte und Quellordner"
last_update:
  date: '2026-11-11'
---

# Projekte und Quellordner {/* #projects-and-source-folders */}

Ein Projekt ist der Arbeitscontainer für eine Forschungsfrage: Es gruppiert Sitzungen, Quelldateien und generierte Ergebnisse. Sein **Agent Context** liefert dauerhafte Anweisungen für jede Sitzung in diesem Projekt. Starten Sie ein separates Projekt, wenn sich die Forschungsfrage oder das zulässige Quellenmaterial ändert.

<span id="example-prepare-a-systematic-review-reading-pack" />

Um eine vorhandene Forschungsaufzeichnung in dieses Projekt einzubringen, verwenden Sie [Sitzungspaket importieren](research-packages.md). Importierte Sessions sind schreibgeschützt; Erstellen Sie eine normale Sitzung für neue Arbeiten.

## Erstellen Sie ein Projekt {/* #create-a-project */}

<p className="example-label"><strong>Praxisbeispiel</strong> Bereiten Sie ein systematisches Lesepaket vor</p>

Unser Beispielprojekt ist **PRISMA - Systematic review reading pack**. Es verwendet veröffentlichte Berichtsrichtlinien mit dem Ziel, überprüfbare bibliographische Aufzeichnungen und eine Lesereihenfolge beizubehalten. Dies ist eine Aufgabe zur Sammlung, keine abgeschlossene systematische Überprüfung.

1. Wählen Sie von zu Hause aus **New project**. In einem vorhandenen Arbeitsbereich bietet das Menü Projektname den gleichen Eintrag.
2. Geben Sie die Felder unten ein. Halten Sie bibliographische und Beweisregeln in **Agent Context** und nicht nur in der Beschreibung.
3. Wählen Sie **Create project**. Bestätigen Sie, dass in der linken Seitenleiste der Projektname angezeigt wird und das Hauptfeld **New conversation** öffnet.
4. Öffnen Sie das Menü Projektname und **Project settings**, um die gespeicherten Werte zu überprüfen. Ein erfolgreiches Projekt sparen ist getrennt von der Modellbereitschaft.

![PRISMA Projekt mit explizitem Forschungszweck und Agent Context](/img/open-science/local-acceptance/prisma-project-form.webp)

| Feld oder Button | Beispiel oder Maßnahme | Was sich ändert |
| --- | --- | --- |
| **Name** | `PRISMA - Systematic review reading pack` | Erforderlicher Anzeigename; bis zu 200 Zeichen. Leere oder reine Whitespace-Eingaben können nicht eingereicht werden. |
| **Description** | `Build a source-checked reading collection for researchers preparing a systematic review.` | Optional, bis zu 1,000 Zeichen. Erscheint in der Projektliste; Es wird nicht als Agentenanweisung gesendet. |
| **Agent Context** | Verwenden Sie die folgenden Anweisungen. | Optional, bis zu 16,000 Zeichen. In neuen und wieder aufgenommenen agentensitzungen enthalten und an den ausgewählten modellanbieter gesendet. |
| **Create project** | Speichern Sie das gültige Formular. | Erstellt das Projekt und öffnet seinen Arbeitsbereich. Ein Save-Fehler bleibt im Formular sichtbar. |
| **Cancel**, **Close** | Verwerfen Sie den Entwurf. | Es wird kein Projekt erstellt. Die Entlassung ist deaktiviert, während die Einreichung ansteht. |
| **Save** in Projekteinstellungen | Speichern Sie ein bearbeitetes Projekt. | Aktualisierung des bestehenden Projekts; Sie dupliziert ihre Sitzungen nicht. |

```text
Use public primary sources. Preserve DOI, title, authors and publication year.
Distinguish bibliographic metadata from claims verified in full text.
Never invent references. Report inaccessible sources explicitly.
Write outputs in English.
```

## Geben Sie einem Projekt Zugriff auf Quelldateien {/* #give-a-project-access-to-source-files */}

Das Erstellen eines Projekts zeigt nicht automatisch die Ordner Ihres Computers an. Öffnen Sie **Files** und wählen Sie den lokalen Ordnereintrag, wenn Sie mit einem vorhandenen Verzeichnis arbeiten möchten. Der Ordnerwähler wählt einen Standort aus; die nachfolgende Berechtigungsaufforderung den erlaubten Zugriff bestimmt. Lesen Sie den ausgewählten Pfad und den Zugriffsmodus, bevor Sie bestätigen.

Verwenden Sie Read-Only-Zugriff bei der Überprüfung von Quellmaterial. Speichern Sie eine verwaltete Projektkopie, wenn Sie die Quelle für das Projekt benötigen. Eine lokale Dateivorschau und ein verwalteter Upload haben unterschiedliche Lebenszyklen: Das Verschieben einer externen Datei kann den ursprünglichen Pfad unterbrechen, während eine verwaltete Kopie im Anwendungsspeicher verbleibt.

Eine Zugriffsänderung kann eine Notebook-Bestätigung veranlassen, da aktive Kernel möglicherweise den Zugriff aus ihrer früheren Konfiguration beibehalten. Beenden oder beenden Sie die entsprechende Arbeit, bevor Sie einen Kernel-Neustart akzeptieren. Das Auswählen eines Ordners ist kein Beweis dafür, dass jede Datei darin vom Modell gelesen wurde.

## Ändern oder Fortführen eines Projekts {/* #change-or-continue-a-project */}

Verwenden Sie das Menü Projektname, um Projekte zu wechseln. Beginnen Sie eine Sitzung mit **New**, wenn die nächste Untersuchung ein eigenes Transkript benötigt, während der gleiche Projektkontext beibehalten wird. Verwenden Sie **Project settings**, um dauerhafte Anweisungen zu überarbeiten; Überprüfen Sie die nächste Anforderung mit den überarbeiteten Regeln, da bereits produzierte Ergebnisse nicht automatisch aktualisiert werden.

**Download artifacts…** ist eine Ausgabeoperation. Es kann deaktiviert werden, wenn das Projekt keine generierten Artefakte hat; Das Hochladen einer Quelldatei allein erzeugt kein generiertes Ergebnis. Archivieren Sie die Arbeit, wenn Sie sie aus der aktiven Navigation entfernen möchten, während Sie die Wiederherstellung durch **Settings → Archived** beibehalten.

## Bestätigen Sie das Ergebnis und erholen Sie sich von Problemen {/* #confirm-the-result-and-recover-from-problems */}

| Beobachtung | Interpretation und nächster Schritt |
| --- | --- |
| Projektname erscheint, aber Senden ist nicht verfügbar | Die Projekterstellung war erfolgreich. Überprüfung **Settings → Agent** und **Settings → Model** getrennt. |
| Agent ignoriert Anweisungen, die in der Beschreibung geschrieben wurden | Bewege die Anweisungen in **Agent Context** und senden Sie eine neue, explizite Anfrage. Beschreibung ist organisatorische Metadaten. |
| Ordner öffnet sich, aber ein Schreiben wird abgelehnt | Read-Only-Berechtigung erlaubt Inspektion, nicht Änderung. Speichern Sie ein abgeleitetes Artefakt oder überprüfen Sie den angeforderten Schreibumfang. |
| Save bleibt deaktiviert | Nur leere Namen entfernen und Feldlängen prüfen; Warten Sie, wenn eine weitere Rettung ansteht. |
| Ein anderes Projekt wird ausgewählt | Überprüfen Sie den Projekttitel, bevor Sie ein Dokument anhängen oder eine Anfrage senden. |

## Legen Sie eine Frage-Optimierungsvorlage fest {/* #optimization-template */}

Öffnen Sie das Menü Projektname → **Project settings → Advanced agent options → Optimization prompt**. Geben Sie Anweisungen zum Umschreiben von Fragen in diesem Projekt ein und speichern Sie dann. Lassen Sie es leer, um den eingebauten Standard zu verwenden. Das gleiche Feld ist verfügbar unter **New project → Advanced agent options**.

Dieses Feld wird nur ausgeführt, wenn Sie **Optimize question**. Es ist getrennt von **Agent Context**, die Anweisungen für die Agentensitzungen des Projekts liefert, und von **Description**, die für Ihre Referenz ist.

<p className="example-label"><strong>Beispiel</strong> Bewahren Sie die Grenzen einer Lehrfrage</p>

```text
Rewrite the question in clear English. Preserve the supplied numbers
and the hypothetical scope. Ask for a concise answer with limitations;
do not invent participants, measurements or citations.
```

![Custom Optimization prompt unter den erweiterten Agentenoptionen des Projekts](/img/open-science/v121/optimization-template.webp)

Zurück zum Komponisten und [Optimieren eines Entwurfs](composer.md#optimize-question). Überprüfen Sie den neu geschriebenen Text vor dem Senden; eine Vorlage ist eine Schreibanweisung, keine wissenschaftliche Validierungsregel.
