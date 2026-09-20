---
sidebar_position: 1
title: "Einstellungen Übersicht"
last_update:
  date: '2026-09-20'
---

# Einstellungen Übersicht {/* #settings-overview */}

Öffnen Sie **Settings** in der unteren linken Ecke des Arbeitsbereichs. Die 17-Panels sind in vier Gruppen unterteilt: **Intelligence**, **Connections**, **Workspace** und **System**. Wählen Sie ein Panel nach Zweck oder suchen Sie aus dem Header. In diesen Handbüchern bezieht sich **Settings → Model** zum Beispiel auf das Modellpanel innerhalb von Intelligence.

| Globale Kontrolle | Verhalten |
| --- | --- |
| `Back` / `Forward` | Wechseln Sie zwischen einem Haupteinstellungsfeld und seinen Detail-, Hinzufügen- oder Import-Unteransichten |
| Back-Button für Brotkrumen | Rückkehr von einer Unteransicht zum Hauptpanel |
| `Maximize` / `Restore` | Wechsel zwischen einem großen Dialog und Vollbildeinstellungen |
| `Close settings` | Kehren Sie zu dem ursprünglichen Projekt und der ursprünglichen Sitzung zurück, ohne die Einstellungen zu verlieren, die erfolgreich gespeichert wurden |
| `Dismiss settings error` | Schließen Sie das Fehlerbanner; die fehlgeschlagene Operation wird nicht automatisch wiederholt |
| Mobiler Navigationsbutton | Öffnen oder Schließen der Einstellungen Navigationsschublade |

## Finde eine Einstellung {/* #find-a-setting */}

1. Öffnen Sie Einstellungen und fokussieren Sie **Search settings** im Header. **&lt;0xE2>&lt;0x8C>&lt;0x98>K** auf macOS oder **Strg + K** auf Windows/Linux fokussiert diese Suche, während Einstellungen aktiv sind.
2. Geben Sie einen Panel-Namen oder eine Task ein, z. B. `Package mirror`, `Main model` oder `Diagnostics`.
3. Verwenden Sie **Auf/Abwärts**, um ein Ergebnis auszuwählen, und **Enter**, um das Panel zu öffnen, oder klicken Sie auf das Ergebnis. Das Zielfeld wird kurz hervorgehoben; Suchen Sie dort die benannte Einstellung.
4. Verwenden Sie **Back**, um zurückzukehren. Löschen Sie die Abfrage, um nach einer anderen Einstellung zu suchen. Die eigene Suche eines Panels filtert seine Liste, anstatt alle Einstellungen zu durchsuchen.

Diese Suche umfasst repräsentative Einstellungen in jedem Panel, nicht in jedem Feld oder Forschungsdokument. Wenn ein Begriff nicht übereinstimmt, verwenden Sie den Panelnamen oder die Navigationsgruppen unten. Um Gespräche oder Dateien zu durchsuchen, schließen Sie Einstellungen und verwenden Sie [Globale Suche](../guides/navigation.md).

## Die 17 Hauptpanels {/* #the-17-main-panels */}

| Gruppe | Panel | Was sie verwaltet |
| --- | --- | --- |
| Intelligenz | [Modell](../guides/models.md) | Anbieter und Szenariomodelle |
|  | [Agent](../guides/frameworks.md) | Installation, Umschaltung und Reparatur von Agenten-Frameworks |
|  | [Skills](../skills/overview.md) | Wiederverwendbare Forschungsmethoden und deren Verfügbarkeit |
|  | [Spezialisten](../specialists/overview.md) | Specialist Rollen und Zugang zu Fähigkeiten |
|  | [Erinnerungen](../guides/memory.md) | Opt-in Global- und Projektnotizen |
| Verbindungen | [Konnektoren](../guides/connectors.md) | Datendienste, benutzerdefinierte MCP-Verbindungen und Importe |
|  | [Netzwerk](../guides/network.md) | Proxy, Paketspiegel und Notebook-Domänenzugriff |
|  | [Remote](../guides/remote-access.md) | Browserzugriff, Kopplung und vertrauenswürdige Geräte |
|  | [Anmeldeinformationen](../tools/credentials.md) | Schlüssel, Token, OAuth und Credential Recovery |
| Arbeitsbereich | [Tags](../guides/tags.md) | Tags und Favoriten bestellen |
|  | [Berechtigungen](../guides/approval-modes.md) | Default-Modus und eingesparte Zuschüsse |
|  | [Laufzeiten](../guides/runtimes.md) | Python/R Umgebungen und Pakete |
|  | [Speicher](../guides/storage.md) | Datenortung, Schreibzugriff und Festplattennutzung |
|  | [Rechenressourcen](../guides/remote-compute.md) | Lokale und SSH-Rechenressourcen |
|  | [Verwendung](../guides/usage.md) | Token-, Call- und Research-Statistiken |
|  | [Archiviert](../guides/storage.md) | Archivierte Arbeit wiederherstellen oder dauerhaft löschen |
| System | [Allgemein](../guides/appearance.md) | Aussehen, Benachrichtigungen, Diagnose und Version |

**Feedback** bleibt ein separater Eintrag am Ende der Einstellungen.

:::info&#91;Wie Einstellungen gespeichert werden&#93; Einige Schalter werden sofort gespeichert. Längere Formulare verwenden `Save`, `Add` oder `Import`. Schließen Sie die Anwendung nicht, während `Saving…`, `Testing…` oder `Installing…` angezeigt werden. Migrations-, Deinstallations-, Lösch- und Wide-Permission-Aktionen erfordern eine Bestätigung. :::

## Tabs für Modelleinstellungen {/* #model-tabs */}

Verwenden Sie in **Model** **Conversation models** für Anbieter und Aufgabenmodelle, **Classification models** für die optionale Skill/Connector-Auswahl und **Local parsing models** für lokale Parsing-Ressourcen. Die Klassifizierung ist eine Registerkarte in den Modelleinstellungen, nicht ein zusätzliches Top-Level-Einstellungen-Panel. Siehe [Einstufungsaufbau](../guides/models.md#classification-models).
