---
title: "Genehmigungen und Kontrolle"
last_update:
  date: '2026-09-28'
---

# Genehmigungen und Kontrolle {/* #permissions-and-control */}

Verwenden Sie diese Seite, um die für eine Berechtigungsentscheidung verantwortliche Regel zu identifizieren. Die Schritte zum Überprüfen einer Karte oder zum Widerruf eines Zuschusses finden Sie unter [Genehmigungen und Genehmigungen](../guides/approval-modes.md).

## Genehmigungsschichten {/* #permission-layers */}

| Schicht | Werte oder Anwendungsbereich | Was sie regiert |
| --- | --- | --- |
| Gesprächsprofil | `ask`, `auto`, `full` | Das Zustimmungsverhalten des Agenten für das aktuelle Gespräch |
| Ausgewähltes versus effektives Profil | Laufzeitabhängig | Das Framework kann weniger Fähigkeiten freisetzen, als das ausgewählte Profil erfordert; Informieren Sie sich über die Erklärung |
| Berücksichtigte Befähigungsbeihilfe | Gespräch, Projekt, global | Abgleich zukünftiger Anforderungen für die aufgezeichnete Fähigkeit und Qualifikation |
| Connector Tool Policy | Immer zulassen, jedes Mal fragen, blockieren | Das ausgewählte Connector-Tool; Ein blockiertes Tool schlägt fehl, bevor es nachschlägt |
| Zugriff auf Dateisysteme | Ausgewählte Pfade und Zugangsmodi | Auf welche externen Standorte eine Operation zugreifen kann |
| Notebook Netzwerkpolitik | Zulässige Zielorte und Anschlusskontrollen | Ob die Laufzeit ein gewünschtes Ziel erreichen kann |
| Specialist Fähigkeiten | Zuweisende Skills und Konnektoren | Was für diese Rolle zur Verfügung steht |

Diese Schichten sind nicht austauschbar. Vollzugriff ändert Agent prompt Verhalten; Es installiert kein Tool, stellt keine Anmeldeinformationen bereit, macht einen Server erreichbar oder beweist, dass der Netzwerkschutz einer Laufzeit die Verbindung ermöglicht.

## Profile und Geltungsbereiche {/* #profiles-and-scopes */}

| UI-Wert | Vertrag | Bedeutung |
| --- | --- | --- |
| **Ask for approval** / **Ask** | `ask` | Bitten Sie um genehmigungspflichtige Operationen, vorbehaltlich bestehender Zuschüsse und anwendungseigener Ausnahmen |
| **Auto-approve edits** / **Auto** | `auto` | Unterstützte Workspace-Bearbeitungen und anerkannte app-eigene Bibliotheksvorgänge können automatisch durchlaufen werden; willkürliche Shell- oder MCP-Aufrufe sind im Allgemeinen nicht erlaubt. Siehe [Bibliotheksregeln](../guides/approval-modes.md#library-auto). |
| **Full access** | `full` | Erlauben Sie Agent-Berechtigungsanforderungen ohne manuelle Eingabeaufforderungen, wenn die Laufzeit sie unterstützt |
| **Once** | `once` | Nur der aktuelle Aufruf; Keine dauerhafte Zuwendung |
| **Dieses Gespräch** | `session` | Matching Anrufe in dieser Konversation, auch über Neustarts hinweg |
| **This project** | `project` | Matching Calls in diesem Projekt; breit angelegte Bestätigung |
| **Global** | `global` | Abstimmung von Aufrufen über Projekte hinweg; breit angelegte Bestätigung |

Die Karte bietet nur Bereiche, die von dieser Anfrage unterstützt werden. Es wählt normalerweise den konversationsumfang, wenn verfügbar, dann einmal. Schließen Sie nicht "einmal" aus der Position des Buttons; Lesen Sie das vollständige Etikett. Befehlspräfix- und Kategoriequalifikatoren können mehr als eine identische Wiederholung eines Aufrufs abdecken.

**Default permission mode** beeinflusst neue Gespräche. Bestehende Gespräche behalten ihre eigene Umgebung. **Auto-review** ist eine separate Ergebnis-Review-Option; Es ist nicht das `auto` Berechtigungsprofil.

## Connector Entscheidungsauftrag {/* #connector-decision-order */}

Der Connector-Broker bewertet diese Bedingungen:

1. Wenn das Tool mit **Block** übereinstimmt, lehnen Sie es ab.
2. Andernfalls wenden Sie die Connector-Zulassungs-/Fragekonfiguration an. Ein automatischer Connector-Allow-Eintrag kann den Anruf ermöglichen; ein zulassungspflichtiges Werkzeug wird bis zur nächsten Prüfung fortgesetzt.
3. Lösen Sie einen gültigen erinnerten Zuschuss für die Fähigkeit und das aktuelle Projekt / Gespräch.
4. Falls keine Anwendung findet, sind die unterstützten Genehmigungsbereiche anzugeben. Wenn die Genehmigung nicht verfügbar ist oder verweigert wird, versagen Sie den Anruf.
5. Beharren Sie auf einer erinnerten Genehmigung, bevor Sie die Operation freigeben, es sei denn, der Anrufer verschiebt die Beharrlichkeit ausdrücklich bis zu seinem eigenen Autorisierungsschritt.

Ein gespeicherter Zuschuss kann **Block** nicht außer Kraft setzen. Umgekehrt kann das Widerrufen eines erinnerten Zuschusses keine Aufforderung einleiten, wenn eine Genehmigungsrichtlinie oder eine breitere Zuwendung den Aufruf noch abdeckt. Lesen Sie die angezeigten Richtlinien- und Abdeckungshinweise.

## Globale Standardzuschüsse {/* #default-global-grants */}

Die Quelle definiert 20 Baseline Grants. Diese Zahl beschreibt die eingebauten Standardwerte, nicht die Anzahl, die jedes installierte Profil anzeigen muss.

| Familie | Basisfähigkeiten | Zähler |
| --- | --- | ---: |
| Customization | Erstellen/Aktualisieren eines Specialist; ein Skill veröffentlichen/editieren; Skills und Steckverbinder an/von einem Specialist anbringen/entfernen | 8 |
| Skills | Aufrufen eines Skill | 1 |
| Literaturleser | `read_document` | 1 |
| Notebook-Prüfung | Laufzeiten auflisten, Notebook-Zustand lesen, Speicherkategorien auflisten, Speicher suchen, Pakete prüfen | 5 |
| Planfortschritte | `update_step_status` | 1 |
| Literaturbibliothek | Suchen, Abstract lesen, PDF lesen, Referenzen formatieren | 4 |

Einige Standardeinstellungen erlauben Customization Writes. Beschreiben Sie die Baseline nicht als "nur lesende Berechtigungen". **Restore defaults** fügt fehlende globale Baseline-Zuschüsse hinzu, ohne andere Zuschüsse zu löschen. Es wird nicht jede Berechtigungseinstellung zurückgesetzt oder abgeschlossene Arbeit rückgängig gemacht.

Anwendungseigene Ausnahmen gibt es auch außerhalb dieser Liste: Das Speichern eines bereits bestehenden oder Inline-Ergebnisses durch die genaue Artefaktfähigkeit, das Anzeigen einer Interaktionsfrage und das Deklarieren einer Aktivitätsgruppe kann ohne zusätzliche Berechtigungskarte passieren. Solche Ausnahmen hängen von der verifizierten Werkzeugidentität ab, nicht vom beruhigenden Anzeigetitel eines Werkzeugs.

## Widerruf und unvollständiger Zustand {/* #revocation-and-incomplete-state */}

| Beobachtung | Bedeutung |
| --- | --- |
| Eine Zeile bleibt global oder durch ein Projekt abgedeckt | Entfernen dieser engeren Zuschuss lässt breitere Autorität in der Tat |
| Politik-Hinweis sagt blockiert | Die Richtlinie verhindert den Aufruf, auch wenn eine erinnerte Zeile existiert |
| Warnung vor unvollständigen Lagerbeständen | Bei der sichtbaren Bestandsaufnahme kann auf Finanzhilfen verzichtet werden; Bulk Revocation wird deaktiviert, bis der vollständige Satz bekannt ist |
| Stale Revision oder fehlender Zuschuss | Eine weitere Änderung hat die angeforderte Zeile ungültig gemacht; Aktualisieren und Überprüfen des aktuellen Zustands |
| Rückfälligkeit | Rücknahme des Widerrufs der förderfähigen Finanzhilfe innerhalb der angezeigten Verfügbarkeit; Es kehrt nicht die Effekte eines Werkzeugs um |

Technische Referenz: [Profile](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/permission-profiles.ts) · [Connector Broker](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/connector-broker.ts) · [Basiszuschüsse](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/defaults.ts) · [Agentenpolitik](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/acp/permission-policy.ts).
