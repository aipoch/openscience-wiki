---
sidebar_position: 1
title: "Einstellungsübersicht"
last_update:
  date: '2026-11-23'
---

# Einstellungsübersicht {/* #settings-overview */}

Öffnen Sie **Settings** in der unteren linken Ecke des Arbeitsbereichs. Seine **17-Panels** sind in **System**, **Intelligence**, **Connections** und **Workspace** organisiert. Skills, Konnektoren und Spezialisten werden im separaten [Ressourcenzentrum](../guides/navigation.md#resource-center) verwaltet. Wählen Sie ein Einstellungsfeld nach Zweck oder verwenden Sie die Header-Suche.

| Globale Kontrolle | Verhalten |
| --- | --- |
| `Back` / `Forward` | Wechseln Sie zwischen einem Haupteinstellungsfeld und seinen Detail-, Hinzufügen- oder Import-Unteransichten |
| Back-Button für Brotkrumen | Rückkehr von einer Unteransicht zum Hauptpanel |
| `Maximize` / `Restore` | Wechsel zwischen einem großen Dialog und Vollbildeinstellungen |
| `Close settings` | Kehren Sie zu dem ursprünglichen Projekt und der ursprünglichen Sitzung zurück, ohne die Einstellungen zu verlieren, die erfolgreich gespeichert wurden |
| `Dismiss settings error` | Schließen Sie das Fehlerbanner; die fehlgeschlagene Operation wird nicht automatisch wiederholt |
| Mobiler Navigations-Button | Öffnen oder Schließen der Einstellungen Navigationsschublade |

## Finde eine Einstellung {/* #find-a-setting */}

1. Öffnen Sie Einstellungen und fokussieren Sie **Search settings** im Header. **&lt;0xE2>&lt;0x8C>&lt;0x98>K** auf macOS oder **Strg + K** auf Windows/Linux fokussiert diese Suche, während Einstellungen aktiv sind.
2. Geben Sie einen Panel-Namen oder eine Task ein, z. B. `Package mirror`, `Main model` oder `Diagnostics`.
3. Verwenden Sie **Auf/Abwärts**, um ein Ergebnis auszuwählen, und **Enter**, um das Panel zu öffnen, oder klicken Sie auf das Ergebnis. Das Zielfeld wird kurz hervorgehoben; Suchen Sie dort die benannte Einstellung.
4. Verwenden Sie **Back**, um zurückzukehren. Löschen Sie die Abfrage, um nach einer anderen Einstellung zu suchen. Die eigene Suche eines Panels filtert seine Liste, anstatt alle Einstellungen zu durchsuchen.

Diese Suche umfasst repräsentative Einstellungen in jedem Panel, nicht in jedem Feld oder Forschungsdokument. Wenn ein Begriff nicht übereinstimmt, verwenden Sie den Panelnamen oder die Navigationsgruppen unten. Um Gespräche oder Dateien zu durchsuchen, schließen Sie Einstellungen und verwenden Sie [Globale Suche](../guides/navigation.md).

## Die 17 Hauptpanels {/* #the-17-main-panels */}

| Gruppe | Panel | Was sie verwaltet |
| --- | --- | --- |
| System | [Allgemein](../guides/appearance.md#help-center) | App-Version, Updates, Diagnose, CLI-Installation, Fensterverhalten und Hilfe |
|  | [Darstellung](../guides/appearance.md) | Thema, Sprache, Desktop-Oberfläche und unterstützte App-Icon-Auswahl |
|  | [Benachrichtigungen](../guides/appearance.md) | Aufgabenwarnungen, Benachrichtigungsinhalt, Systemstatus und Testbenachrichtigung |
| Intelligenz | [Modell](../guides/models.md) | Anbieter- und Szenariomodelle, einschließlich [Bilddienste](../guides/image-generation.md) |
|  | [Agent](../guides/frameworks.md) | Installation, Umschaltung und Reparatur von Agenten-Frameworks |
|  | [Erinnerungen](../guides/memory.md) | Opt-in Global- und Projektnotizen |
| Verbindungen | [Netzwerk](../guides/network.md) | Proxy, Paketspiegel und Notebook Entspannte / strenge Zugangsregeln |
|  | [Remote](../guides/remote-access.md) | Browserzugriff, Kopplung und vertrauenswürdige Geräte |
|  | [Lab](../guides/providers.md#lab-account) | Desktop-Organisationsanmeldung, zugewiesene Modelle und Nutzung |
|  | [Anmeldeinformationen](../tools/credentials.md) | Schlüssel, Token, OAuth und Credential Recovery |
|  | [Rechenressourcen](../guides/remote-compute.md) | SSH · Slurm · Kubernetes · Hugging Face Jobs · Modal · Ray |
| Arbeitsbereich | [Tags](../guides/tags.md) | Tags und Favoriten bestellen |
|  | [Berechtigungen](../guides/approval-modes.md) | Default-Modus und eingesparte Zuschüsse |
|  | [Laufzeiten](../guides/runtimes.md) | Python/R Umgebungen und Pakete |
|  | [Speicher](../guides/storage.md) | Datenortung, Schreibzugriff und Festplattennutzung |
|  | [Verwendung](../guides/usage.md) | Token-, Call- und Research-Statistiken |
|  | [Archiviert](../guides/storage.md) | Archivierte Arbeit wiederherstellen oder dauerhaft löschen |

**Feedback** bleibt ein separater Eintrag am Ende der Einstellungen.

:::info&#91;Wie Einstellungen gespeichert werden&#93; Einige Schalter werden sofort gespeichert. Längere Formulare verwenden `Save`, `Add` oder `Import`. Schließen Sie die Anwendung nicht, während `Saving…`, `Testing…` oder `Installing…` angezeigt werden. Migrations-, Deinstallations-, Lösch- und Wide-Permission-Aktionen erfordern eine Bestätigung. :::

## Tabs für Modelleinstellungen {/* #model-tabs */}

innerhalb **Model**, Verwendung **Conversation models** für Anbieter und Aufgabenmodelle, **Classification models** für optionale Fähigkeitsauswahl und intelligente Sammlungen und **Local capabilities** für PDF-Extraktion, OCR und Research Narration. Dies sind Registerkarten in Modell, nicht zusätzliche Einstellungen Panels. Siehe [Lokale Ressourcen](../guides/models.md#local-capabilities).

Die Header-Suche verwendet **&lt;0xE2>&lt;0x8C>&lt;0x98>K / Strg + K**. Um die Suche des aktuellen Panels oder Dialogs zu fokussieren, verwenden Sie **&lt;0xE2>&lt;0x8C>&lt;0x98>&lt;0xE2>&lt;0x8C>&lt;0xA5>K / Strg + Alt + K**, wenn dieses Feld verfügbar ist. Siehe [Suchabkürzungen](../guides/shortcuts.md#local-settings-search).

## Installierte Ressourcen aus Einstellungen öffnen {/* #resource-shortcuts */}

Verwenden Sie die Verknüpfung **Skills**, **Spezialisten** oder **Connectors** in den Einstellungen, um diese installierte Kategorie im Ressourcencenter zu öffnen. Kehren Sie zurück, um Ihre vorherige Einstellungsposition wieder aufzunehmen. Dies sind Abkürzungen zum Ressourcenmanagement, nicht drei zusätzliche Einstellungsfelder. Marketplace Discovery und Installed-Ressource-Konfiguration bleiben getrennte Ansichten.
