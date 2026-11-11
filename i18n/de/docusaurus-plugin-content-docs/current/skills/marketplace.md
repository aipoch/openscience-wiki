---
title: "Skill-Marktplatz"
description: "Entdecken, installieren, aktualisieren und verwalten Sie Forschungsmethoden vom Skill-Marktplatz aus."
last_update:
  date: '2026-11-11'
---

# Skill-Marktplatz {/* #skill-marketplace */}

Offen **Resource center → Skills → Marketplace** von Home oder der Projektseitenleiste. Suchen Sie nach einer Forschungsmethode, überprüfen Sie die Paketdetails und installieren Sie sie gegebenenfalls. Der Web-Arbeitsbereich unterstützt auch die Marktplatzinstallation; Pakete werden auf dem angeschlossenen Open-Science-Host installiert.

Verwendung **Installed** Zurück zu lokalen Methoden. Um ein ZIP, einen installierten Ordner oder ein GitHub-Repository zu importieren, folgen Sie [Skill Import und Management](manage.md). Siehe [Fähigkeiten nutzen](overview.md) zum Auswählen einer Methode in einem Gespräch.

![Das Ressourcencenter mit installierten und Marketplace-Tabs](/img/open-science/v121/resource-center.webp)

## Finden Sie eine geeignete Methode

1. Offen **Marketplace**Geben Sie einen Namen oder ein Schlüsselwort in **Search skills**, und Verwendung **Filters** um den Katalog einzugrenzen. Filter zurücksetzen oder die Abfrage löschen, um sie wieder zu erweitern.
2. Wählen **View details**. Lesen Sie den Zweck, Herausgeber, Autor, Version, Lizenz und **Sources and verification**. Offen **Assessment report** soweit verfügbar.
3. Vergleichen Sie Eingaben, erforderliche Tools und Laufzeitabhängigkeiten mit Ihrem Projekt, bevor Sie **Install**. Warten auf **Installed** oder ein Label mit installierter Version, dann die Verfügbarkeit überprüfen.

Eine Verteilungssignatur identifiziert die Paketquelle; ein vorgelagerter Assessment-Score ist kein Beweis dafür, dass die Methode für Ihre Forschungsfrage korrekt ist. Die Installation einer Fertigkeit führt nicht ihren Workflow aus oder installiert jede wissenschaftliche Abhängigkeit.

![Eine Fertigkeit, die über den Web-Marktplatz mit seinen Versions- und Quelldetails installiert wurde](/img/open-science/v121/marketplace-installed.webp)

## Installieren und Verwenden eines Skill {/* #install-and-use-a-skill */}

1. Wählen Sie **Install** auf der ausgewählten Karte und warten Sie auf **Installed**.
2. Öffnen Sie das installierte Skill und bestätigen Sie dessen Verfügbarkeit für Main oder das beabsichtigte Specialist.
3. Bereiten Sie eine Eingabe vor, die die Anforderungen des Skill erfüllt, und verwenden Sie sie dann für eine begrenzte Aufgabe.
4. Öffnen Sie die generierten Dateien und überprüfen Sie das Ergebnis mit Ihrer Anfrage. Installation allein stellt nicht fest, dass ein Forschungslauf erfolgreich war.

Zum Auswählen eines Skill in einer Konversation siehe [Verwendung von Skills](overview.md). Konfigurieren Sie die Methoden eines Specialist über [Skills und Connectors](../specialists/capabilities.md).

## Installieren oder Aktualisieren mehrerer Skills {/* #install-or-update-several-skills */}

1. Wählen Sie **More actions → Batch manage**, dann **Not installed** oder **Updates**.
2. Filtern Sie den Katalog und wählen Sie die beabsichtigten Einträge aus. **Wählen Sie alle gefilterten Ergebnisse** wählt den vollständigen Ergebnissatz des Filters aus.
3. Öffnen Sie **Review selection** und überprüfen Sie die Liste, bevor Sie **Install selected** oder **Update selected** auswählen.
4. Warten Sie, bis die Operationen abgeschlossen sind, und prüfen Sie jedes Ergebnis. Die Installation läuft sequentiell; Stoppen ermöglicht das aktuelle Element zu beenden.
5. Überprüfen Sie fehlgeschlagene oder gestoppte Einträge und wiederholen Sie nur das, was benötigt wird.

## Aktualisieren oder Entfernen einer Methode {/* #update-or-remove-a-method */}

Wenn ein Update verfügbar ist, öffnen Sie **Aktualisierung der Fähigkeit prüfen** vor der Bestätigung. Überprüfen Sie die alten und neuen Versionen, betroffenen Spezialisten, und Dateien hinzugefügt, geändert oder entfernt werden. Das Diff zeigt Zeilennummern, rote Streichungen und grüne Zusätze. Für binäre, übergroße oder unlesbare Vergleiche verwenden Sie die aufgeführten Dateiänderungen; ein nicht verfügbares Diff bedeutet nicht, dass die Dateien unverändert sind.

Wenn der Dialog lokale Bearbeitungen meldet, ersetzt die Aktualisierung diese. [Ausfuhr einer Kopie](manage.md) zuerst, wenn Sie sie behalten müssen. Wählen Sie **Vorhandene Fähigkeit aktualisieren** erst nach der Überprüfung; Dies bewahrt die Skill-Identität und ihre Specialist-Beziehungen. Öffnen Sie für **Lokaler Konflikt** **Installierte Fähigkeit anzeigen** und folgen Sie der Überprüfungsaktion, wenn sie angeboten wird. Wenn es blockiert bleibt, bewahren Sie die Nachricht auf, anstatt die lokale Methode zu löschen, um die Installation zu erzwingen.

Verwenden Sie die Detailaktionen des installierten Skill, um die Verfügbarkeit zu ändern oder zu deinstallieren. Nach einer Änderung bestätigen Sie, dass die beabsichtigte Methode für Main oder das Specialist verfügbar ist, das sie verwenden wird; ein heruntergeladenes Paket und eine verfügbare Methode sind separate Zustände.

## Wenn die Installation oder Nutzung fehlschlägt {/* #if-installation-or-use-fails */}

Bei einem Katalog- oder Paketverifizierungsfehler behalten Sie die Nachricht bei und versuchen Sie es erneut mit dem normalen Marktplatzeintrag. Ersetzen Sie das Paket nicht durch einen nicht verifizierten Download. Marketplace-Browsing nutzt den offiziellen Distributionsdienst und erfordert kein GitHub-Login.

Wenn die Installation abgeschlossen ist, eine Aufgabe jedoch nicht ausgeführt werden kann, überprüfen Sie die fehlende Abhängigkeit oder das im Fehler genannte Tool. Folgen Sie [Laufzeit-Einstellung](../guides/runtimes.md) für Softwareabhängigkeiten oder [Connector Setup](../guides/connectors.md) für erforderliche Dienste, wiederholen Sie dann die Aufgabe mit der beabsichtigten Eingabe und überprüfen Sie das gespeicherte Ergebnis.

## Reichen Sie Ihren eigenen Skill auf den Markt ein {/* #submit-a-skill */}

Marketplace-Einreichungen verwenden ein GitHub-Source-Repository und eine Maintainer-Review. **Upload skills** importiert eine Methode in Ihre lokale Anwendung; **Publish** speichert im persönlichen Skill-Editor ein lokales Skill. Keine Aktion listet es auf dem öffentlichen Markt.

### Bereiten Sie den Skill vor {/* #prepare-the-skill */}

1. [Erstellen und Testen des Skill](create.md), einschließlich der Skripte, Referenzen und anderen Dateien, die es benötigt.
2. Laden Sie diese Dateien in ein Unterverzeichnis Ihres GitHub-Repositorys, z. B. `skills/your-skill-name/`, mit `SKILL.md` im Inneren hoch. Bewahren Sie die erforderlichen Lizenzhinweise mit der Quelle auf.
3. Verpflichten Sie den vollständigen Inhalt und die Kopie, die die vollständige SHA begehen. In der Einreichung muss eine feste Revision angegeben werden, nicht ein beweglicher Zweig.

`SKILL.md` benötigt `name`, `description` und eine Lizenzerklärung bei `license` oder `metadata.license`. Die Erklärung und die enthaltenen Hinweise müssen den tatsächlichen Inhalt beschreiben, den Sie einreichen.

### Erstellung der Einreichungsdatei {/* #prepare-the-submission-file */}

Beginnen Sie mit dem offiziellen [release.config.json Vorlage](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/example/release.config.json). Ersetzen Sie die Platzhalter durch die Informationen Ihres Skill:

| Feld | Was zu liefern |
| --- | --- |
| `id` | Der Kleinbuchstaben, Bindestrich Name in verwendet `SKILL.md`. |
| `version` | Eine Paketversion wie `1.0.0`. |
| `category` | einer von `Academic Writing`, `Data Analysis`, `Evidence Insight`, `Protocol Design` oder `Other`. |
| `source.repository`, `source.commit`, `source.path` | Ihre HTTPS GitHub URL, voller 40-Zeichen, überträgt das Verzeichnis SHA und Skill. |
| `license_files` | Repository-relative Pfade zu den entsprechenden Lizenzdateien bei diesem Commit. |

Der All-Null-Commit der Vorlage ist ein Platzhalter und kann nicht veröffentlicht werden. Überprüfen Sie die aktuelle [Übermittlungsformat](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/release.config.schema.json) vor dem Einreichen.

### Inklusion anfordern und das veröffentlichte Ergebnis überprüfen {/* #request-inclusion-and-check-the-published-result */}

Folgen Sie dem [Beitragsmeldungen](https://github.com/aipoch/openscience-skill-marketplace/blob/main/CONTRIBUTING.md) des Marktplatz-Repositorys, um eine Pull-Anfrage vorzubereiten. Wenn Sie keinen Schreibzugriff haben, verwenden Sie eine Gabel. Geben Sie die Einreichungsdatei, den Quellort, den Zweck und Ihr lokales Testergebnis an; Die Nutzlast verbleibt in Ihrem Quell-Repository. Maintainer können die überprüfte Konfiguration unter `authoring/submissions/<id>/release.config.json` verfolgen; Bestätigen Sie Ihre Platzierung während der Überprüfung.

Maintainers überprüfen und registrieren förderfähige Einreichungen vor der Veröffentlichung. Eine eingereichte Datei oder eine zusammengeführte Pull-Anfrage stellt das Skill nicht selbst in der App zur Verfügung. Das [Authoring Guide](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/README.md) beschreibt die Überprüfungs- und Veröffentlichungsphasen.

Kehren Sie nach der Veröffentlichung zu **Marketplace → Refresh** zurück, suchen Sie nach dem Skill, überprüfen Sie dessen Quelle und Version und installieren Sie es. Wenn Sie eine veröffentlichte Skill aktualisieren, senden Sie eine neue Paketversion mit dem neuen Source Commit; keine Änderungen an der vorgelagerten Repository-Aktualisierung übernehmen, die automatisch installierte Kopien installieren.
