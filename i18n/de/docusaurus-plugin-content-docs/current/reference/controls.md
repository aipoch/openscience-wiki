---
title: "Bedienelemente und Tastaturreferenz"
last_update:
  date: '2026-09-24'
---

# Bedienelemente und Tastaturreferenz {/* #controls-and-keyboard-reference */}

Verwenden Sie diesen Index, um die kanonische Erklärung eines Steuerelements zu finden. Es hält Feldgrenzen und Verknüpfungen zusammen, ohne die vollständigen Aufgabendurchläufe zu wiederholen. Labels beziehen sich auf das englische Interface.

## Kontrollen nach Aufgaben {/* #controls-by-task */}

| Sie müssen | Einreise oder Kontrolle | Detailliertes Verhalten |
| --- | --- | --- |
| Erstellen oder Beschreiben eines Projekts | **New project**, Projektmenü → **Project settings** | [Projektfelder](../guides/projects.md) |
| Halten Sie eine private Lesenotiz | Auswahl → **For me → Bookmark**, Komponist **Bookmarks** | [Lesebuchzeichen](../guides/bookmarks.md) |
| Konfigurieren einer Modellverbindung | **Settings → Model** | [Provider-Einrichtung](../guides/providers.md) |
| Anbringen einer Quelle, Senden oder Warten einer Anfrage | Komponist **+**Vorsatzchip, **Send**, Warteschlangenkontrollen | [Unterhaltungen und wartende Anfragen](../guides/composer.md) |
| Überprüfen Sie eine Laufzeit oder installierte Pakete | **Settings → Runtimes**, Dolmetscher und Pakete Kontrollen | [Python und R Laufzeiten](../guides/runtimes.md) |
| Berechnungen und Variablen prüfen | **View notebook**, **Variables**, Artefakt **Provenance** | [Notebook und Ausführungsnachweise](../guides/notebook.md) |
| Gewährung oder Widerruf des Zugangs | Genehmigungskarte, **Settings → Permissions** | [Genehmigungen und Genehmigungen](../guides/approval-modes.md) |
| Diagnose einer Paketverbindung | **Settings → Network** | [Domains, Proxy und Mirrors](../guides/network.md) |
| Konfigurieren von Remote Compute | **Settings → Compute → Add SSH host** | [SSH und Slurm Setup](../guides/remote-compute.md) |
| Überprüfen Sie einen Forschungsoutput | Generierte Dateikarte, Vorschau, **Provenance** | [Analyse öffentlicher Daten](../workflows/data-quality.md) |
| Look Up Limits | Format- oder Konfigurationsfeld | [Dateilimits](formats.md), [Konfiguration](configuration.md), [Paketformate](packages.md) |

Das [vollständiger Kontrollindex](control-index.md) listet Kontrollen nach Anwendungsseite auf; Auf dieser Seite werden gemeinsame Aufgaben und Tastenkombinationen zusammengefasst. Beide verlinken auf die gleichen detaillierten Tutorials.

## Kennung der Tastatur {/* #keyboard-reference */}

| Aktion | macOS | Windows/Linux | Bedingungen und Anwendungsbereich |
| --- | --- | --- | --- |
| Anwendungssuche | `⌘K` | `Ctrl+K` | Home/Workspace Suche; in Einstellungen, fokussieren seine Header-Suche |
| Einstellungen | `⌘,` | `Ctrl+,` | Öffnet Einstellungen, wenn das aktuelle Overlay die Verknüpfung zulässt |
| Neue Konversation | `⌘N` | `Ctrl+N` | Arbeitsbereich; erfordert eine bestehende Konversation mit Nachrichten; Ignoriert, während ein Blockierdialog geöffnet ist |
| Sidebar umschalten | `⌘B` | `Ctrl+B` | Arbeitsbereich; Umschalten der Schmalbildschublade oder der Desktop-Seitenleiste |
| Senden Sie Komponistentext | `Enter` | `Enter` | Wenn das Senden verfügbar ist; Ein offener Erwähnen-Picker besitzt Enter; IME-Zusammensetzung übermittelt keine |
| Neue Linie | `Shift+Enter` | `Shift+Enter` | Text des Komponisten |
| Vorheriger/nächster prompter Entwurf | `↑` / `↓` | `↑` / `↓` | Starten Sie die Historie mit dem Caret am Anfang und keine Auswahl; Ein offener Erwähnenspicker hat Vorrang |
| Undo Entwurf | `⌘Z` | `Ctrl+Z` | Composer Draft Geschichte |
| Redo-Entwurf | `⌘Shift+Z` | `Ctrl+Shift+Z` | Composer Draft Geschichte |
| Nahe aktive Oberfläche | `⌘W` | `Ctrl+W` | Desktop-App: Transiente Vorschau zuerst, falls zutreffend, dann Vorschau-Tab / Fenster, dann Fenster; Browser-Zugriff kann Browser-Verknüpfungen verwenden |
| Dismiss Overlay | `Esc` | `Esc` | soweit unterstützt; Speichern oder Sperrbestätigung kann Kündigungsverhalten verändern |

Drücken Sie nicht wiederholt die enge Verknüpfung und erwarten Sie, dass sie nur eine Datei versteckt. Nachdem die Vorschau geschlossen wurde, kann der nächste Aufruf das Anwendungsfenster schließen. Fensterschließung und Prozessabschaltung sind separate plattformabhängige Verhaltensweisen.

Das Schließen eines Side Chat-Tabs erfordert eine Bestätigung und stoppt / löscht diese Seitendiskussion; File-Preview-Schließung löscht die Datei nicht. Siehe [Side Chat](../guides/delegation.md).

## Referenzauslöser für Komponisten {/* #composer-reference-triggers */}

| Trigger | Auswahl | Prüfung vor dem Versenden |
| --- | --- | --- |
| `/` | Aktiviert Skill | Bestätigen Sie die beabsichtigte Methode und unterstützen Sie Abhängigkeiten |
| `@` | Verfügbare Datei/Artefakt oder Literaturreferenz/Anwendungsbereich | Bestätigen Sie die ausgewählte Quelle und Version, wo gezeigt |
| `#` | Sitzungshinweis | Bestätigen Sie das beabsichtigte Gespräch |

Durch Auswählen eines Vorschlags wird eine strukturierte Referenz eingefügt. Das bloße Eingeben eines vertrauten Dateinamens oder Skill-Namens ist kein Beweis dafür, dass die entsprechende Referenz beigefügt wurde. Überprüfen Sie den eingesetzten Chip und die Anforderung.

## Suchbereich {/* #search-scope */}

Die globale App-Suche umfasst Projekte, Sitzungen, Nachrichtentexte, hochgeladene / generierte Dateien, Bibliotheksaufzeichnungen und -sammlungen sowie indexierte Inhalte unterstützter Uploads. Generierte Dateien werden nach Namen durchsucht; nicht indexierte Inhalte nicht durchsucht werden. Wählen Sie eine Kategorie aus, um die Ergebnisse einzugrenzen, und prüfen Sie dann den Kontext eines Ergebnisses, bevor Sie es öffnen. Dies bedeutet nicht, dass jede PDF-, Bild- oder andere Binärdatei einen durchsuchbaren Volltextindex hat. Siehe [Navigation und Suche](../guides/navigation.md) für den kompletten Workflow.

Die Wiki-Suche ist separat: Sie indiziert Dokumentationstitel, Überschriften und Körperstellen in der aktuellen Sprache. Ein Begriff wie "Posteingang" kann hier mit einem Absatz übereinstimmen, auch wenn er im Sitzungstitel einer Anwendung fehlt.

Technische Referenz: [Anwendungsbindungen](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [Composer Keyboard Handling](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [enges Verhalten](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [Globale Suche](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx).

Einstellungsfeld / Dialogsuche verwendet **&lt;0xE2>&lt;0x8C>&lt;0x98>&lt;0xE2>&lt;0x8C>&lt;0xA5>K** auf macOS und **Strg+Alt+K** auf Windows/Linux. **&lt;0xE2>&lt;0x8C>&lt;0x98>K / Strg + K** konzentriert sich weiterhin auf die Einstellungs-Headersuche. Siehe [Abkürzungsumfang](../guides/shortcuts.md#local-settings-search).
