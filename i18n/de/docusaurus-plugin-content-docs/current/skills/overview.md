---
title: "Skills"
last_update:
  date: '2026-09-24'
---

# Skills {/* #skills */}

Ein Skill gibt dem Agenten eine wiederholbare Methode: wann er es verwenden soll, welche Eingänge er benötigt, was zu tun ist und wie er seine Ausgänge überprüfen kann. Open-Science lädt seine Anweisungen bei Bedarf. Die Installation eines Skill installiert nicht die darin beschriebene wissenschaftliche Software.

Finden Sie zusätzliche Methoden über den [Skill-Marktplatz](marketplace.md), dann überprüfen Sie ihre Eingaben und Abhängigkeiten vor der Verwendung.

## Wählen Sie die richtige Art von Fähigkeit {/* #choose-the-right-kind-of-capability */}

| Sie brauchen | Verwendung | Beispiel |
| --- | --- | --- |
| Eine Operation, die Daten zurückgibt oder Code ausführt | A [Werkzeug](../tools/overview.md) | GEO-Metadaten lesen; Lauf Python |
| Eine Methode, die diese Operationen koordiniert | A Skill | Validierung einer rohen Gen-Count-Matrix |
| Eine wiederverwendbare Rolle mit eigenen Anweisungen und Fähigkeiten | A [Spezialist](../specialists/overview.md) | Unabhängige Überprüfung einer Sample-QC-Tabelle |

Beginnen Sie mit [Skill Verzeichnis](./directory.md), um eine Methode zu finden, oder [Rezepturen](./recipes.md), um aus einer Forschungssituation auszuwählen.

## Finde und inspiziere ein Skill {/* #find-and-inspect-a-skill */}

1. Öffnen Sie **Settings → Skills**.
2. Verwenden Sie **Search skills**, um seinen Namen oder seine Beschreibung zu suchen. Geben Sie `rnaseq-count-qc` nach [Erstellen des Beispiels](./create.md) ein.
3. Schmale **Filter skills by source**, **Filter Skills by agent** oder **Filter by Tag**, wenn die Liste lang bleibt.
4. Öffnen Sie das Ergebnis. Lesen Sie die Beschreibung, Anweisungen, **Files**, Lizenz und **Availability**. Ein Anzeigename kann von der Paket-ID abweichen.
5. Kehren Sie zur Liste zurück und inspizieren Sie **Used by**. Es identifiziert, welche Agenten das Paket verwenden können; Er führt keine abgeschlossenen Läufe auf.

![Durchsuchen des gespeicherten RNA-seq Skill](/img/open-science/capabilities-walkthrough/02-skill-search.webp)

| Kontrolle | Was sich ändert |
| --- | --- |
| Featured / Imported / Persönliche Überschrift | Erweitert die Quellgruppe. Ausgewählte Schiffe mit der App; Importiert stammt aus einem Paket oder Repository; Personal wird lokal erstellt. |
| Main Agent Switch / row toggle | Ändert die Verfügbarkeit für benutzergesteuertes Skills; Anwendungserforderliche Skills bleiben aktiviert. Dateien bleiben installiert. |
| Verwendet von | Zeigt die Verfügbarkeit für Main Agent und Spezialisten an. Verwendung **Manage access** auf der Ressource, um Main Agent und Specialist-Zuordnungen anzupassen. |
| Tags verwalten / einen Tag-Chip entfernen | Hinzufügen oder Entfernen eines Organisationslabels; Es ändert sich nicht die Ausführungsberechtigung. |
| Fähigkeit hinzufügen | Bietet agentengestützte Erstellung, direktes Authoring, lokalen Upload, GitHub-Import oder installierte Ordnererkennung. |
| Konversation **+ → Save as skill** | Extrahiert eine wiederverwendbare Methode aus einem abgeschlossenen aktiven Zweig; siehe [Gründungsschritte und Behindertenstaatsgründe](./create.md). |
| Verwalten | Öffnet Massenmanagement für persönliche und importierte Pakete. |
| Gesprächsimporte → Skill Pakete | Lassen Sie den Agenten angehängte ZIP/`.skill` Verpackungen und Beantragung einer Einfuhrgenehmigung. Das Anfügen eines Pakets allein installiert es nicht. |

### Warum manche Switches nicht ausgeschaltet werden können {/* #why-some-switches-cannot-be-turned-off */}

**Umwelt & Pakete**, **Einrichtung einer Comput-Umgebung**, **Remote Compute (SSH)** und **Customize** unterstützen Kernfunktionen und bleiben aktiviert. Ihre Schalter werden überprüft und deaktiviert. Bewegen oder fokussieren Sie die Erklärung, um **This built-in Skill supports core application features and is always enabled.** zu lesen

Diese Aktivierungsregel installiert keine Abhängigkeiten, stellt keine Anmeldeinformationen bereit oder gewährt Betriebsberechtigungen. Die Specialist-Zuweisung ist ein separater Bereich: Überprüfen Sie **Used by** und die Fähigkeitsliste der Rolle.

Das Verzeichnis enthält immer noch 23 public bundled Skills. Interne Unterstützung Skills sind keine zusätzlichen Methoden zur Auswahl. [Erforderliche Switch-Implementierung](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/settings/RequiredSkillToggle.tsx).

Der Screenshot zeigt die Erklärung für **Customize**. Diese erforderlichen Skills bleiben aktiviert, auch wenn Sie andere optionale Methoden deaktivieren.

![Customize bleibt aktiviert und erklärt, warum](/img/open-science/v0.27.0/08-always-enabled-skill.webp)

Für das Per-Agent-Popup und seine schreibgeschützten Bindungen siehe [Ressourcenzugang](../guides/connectors.md#resource-access).

## Verwenden Sie es in einem Gespräch {/* #use-it-in-a-conversation */}

<p className="example-label"><strong>Beispiel</strong> Fordern Sie einen Scheck mit rnaseq-count-qc an</p>

Geben Sie dem Agenten die Eingabe, die erforderliche Skill, die Lieferfähigkeit und die Einschränkungen. Zum Beispiel:

> Verwenden Sie die rnaseq-count-qc Skill auf der angehängten GSE60450-Rohzählermatrix. Behalten Sie EntrezGeneID und Länge als Metadaten. Validieren Sie die Abmessungen und die nicht-negativen Ganzzahlzahlen, bewahren Sie die ursprünglichen Stichproben-IDs auf und speichern Sie einen separaten Methodenbericht mit Vorher/Nachher-Eingabe SHA-256. Verwenden Sie die vorhandene Python Notebook.

Wenn die Genehmigung beantragt wird, prüfen Sie die vollständige Betriebsanleitung und den Betrieb. Nach der Ausführung öffnen Sie den Bericht und den Notebook-Datensatz erneut und vergleichen Sie ihn mit [Beispieldaten](../reference/example-data.md). Eine spätere Specialist-Prüfung ist eine separate Operation; Die Benennung eines Specialist stellt nicht fest, dass die Delegation stattgefunden hat.

### Anweisungen versus Notebook-Funktionen {/* #instructions-versus-notebook-functions */}

Unser `rnaseq-count-qc`-Paket enthält Anweisungen und eine Referenzdatei. Es tut **nicht** Register abrufbar Notebook Funktionen. Der Agent liest die Anweisungen und schreibt dann gewöhnliches Python oder R.

Einige gebündelte Skills bieten auch Kernelfunktionen. Ihre eigenen Anweisungen benennen die Funktionen und die erforderliche `kernelSkillIds`. Fügen Sie nicht jede installierte Skill-ID zu diesem Feld hinzu: Ein reines Instruktionspaket ist kein Kernel-Helfer. Ein geladenes Skill kann auch keine Dateisystem-, Netzwerk- oder Werkzeugberechtigungen gewähren.

Wenn ein Skill in einem Picker fehlt, überprüfen Sie den Quellfilter, den aktivierten Status und die Agentenzuweisung. Wenn seine Anweisungen geladen werden, aber die Berechnung fehlschlägt, fahren Sie mit [Wissenschaftliche Instrumente](../tools/scientific.md) fort; Dies ist ein Laufzeit- oder Eingabeproblem, kein Hinweis darauf, dass das Paket nicht installiert wurde.

Bezugsnummer der Durchführung: [SkillsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillsPanel.tsx), [SkillDetailView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillDetailView.tsx).
