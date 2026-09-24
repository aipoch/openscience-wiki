---
sidebar_position: 1
title: "Seite und Kontrollindex"
description: "Finden Sie jede dokumentierte Open-Science-Taste, Eingabe, Switch und Ergebnis nach Seite."
last_update:
  date: '2026-09-24'
---

# Seite und Kontrollindex {/* #page-and-control-index */}

Diese Seite kondensiert die Einstiegspunkte der Anwendung in eine durchsuchbare, seitenweise Liste. Staatlich abhängige Kontrollen treten nur dann auf, wenn ihre Bedingungen erfüllt sind. Wenn ein Steuerelement deaktiviert ist, lesen Sie den Tooltip und die relevanten bekannten Probleme; mögliche Ursachen sind Sitzungszustand, fehlende Voraussetzungen und ein Produktfehler.


<span id="current-verification-coverage" />

## Finden Sie die detaillierten Anweisungen {/* #find-the-detailed-instructions */}

Verwenden Sie diesen Index, um ein Steuerelement zu finden. Folgen Sie dem verlinkten Tutorial für Voraussetzungen, Schritte, erwartete Ergebnisse und bekannte Probleme. Siehe [Einstellungen Übersicht](../settings/overview.md) für die Einstellungsfelder, [Task Shortcuts](controls.md) für allgemeine Aktionen und [Fehlerbehebung](../guides/troubleshooting.md) für Fehler.

## Onboarding {/* #onboarding */}

| Seite, in Zauberer-Reihenfolge | Kontrollen | Ergebnis oder Voraussetzung |
| --- | --- | --- |
| Umgebung | Nochmals prüfen, Weiterfahren, Zeilen prüfen | die Host-Anforderungen erneut überprüfen; Weiterfahren nach dem Passieren |
| Datenspeicherort | Browse..., Use default location instead, Back, Continue | Wählen Sie den Datenstandort; Eine benutzerdefinierte Auswahl erfordert Keep default oder Restart Bestätigung |
| Agentenlaufzeit | Framework-Karte, Installieren, Wiedererkennen, Zurück, Weiter | Installieren oder Auswählen einer bereiten aktiven Laufzeit |
| Modellanbieter | Anbietertyp, Authentifizierungswahl, Bedingungsfelder, Test & Continue | Validieren Sie die erforderlichen Eingaben und testen Sie den Anbieter, bevor Sie fortfahren |
| Notebook-Laufzeit | Dolmetschersteuerung, Umgebungseinstellung, Pakete, Zurück, Fertigstellen | Optionale Einrichtung; Beenden oder Abbrechen eines bereits laufenden Umgebungsvorgangs vor dem Verlassen |

Siehe [Ersteinrichtung](../guides/onboarding.md) und [Anbieterkonfiguration](../guides/providers.md) für die detaillierten Walkthroughs.

## Home und Projekte {/* #home-and-projects */}

| Seite | Kontrollen | Ergebnis |
| --- | --- | --- |
| Home Header | GitHub, Suche, Bibliothek, Thema, Nachrichten, Modelleinstellungen | Öffnen Sie das Repository, die globale Suche, die Literaturbibliothek, das Erscheinungsmenü, die Benachrichtigungen oder die Modelleinstellungen |
| Heimischer Körper | Neues Projekt, Projektkarte, Aktuelle Sitzung | Erstellen oder Öffnen eines Projekts oder einer Sitzung |
| Themenmenü | System, Licht, Dunkelheit | Setzen Sie das Erscheinungsbild und halten Sie es synchron mit General |
| Suchen | Sucheingabe, Kategorie, Erweiterte Filter, Ergebnisdetail, Esc | [Suchen Sie Nachrichten, Dateien und Referenzen](../guides/navigation.md) mit dem beabsichtigten Anwendungsbereich |
| Nachrichten | Benachrichtigungselement, lesen Sie Aktion, Schließen | Öffnen Sie die Quelle und verwalten Sie ungelesene Elemente |
| Projekt erstellen | Name, Beschreibung, Agent Context, Abbrechen, Projekt erstellen | Erstellen eines Projekts; Name ist erforderlich |
| Projektaktionen | Staatlich abhängige Edit, Archive, Delete und verwandte Aktionen | Projektmetadaten ändern, Projekt archivieren oder Löschung bestätigen |

## Arbeitsbereich Sidebar und Layout {/* #workspace-sidebar-and-layout */}

| Kontrolle | Ergebnis |
| --- | --- |
| Alle Projekte | Rückkehr nach Hause |
| Projektname | Öffnen Sie den Projekteinstiegspunkt oder das Menü |
| Absturz-Seitenleiste | Collapse oder erweitern Sie die linke Sidebar |
| Neu | Erstellen einer Sitzung |
| Anpassen | Starten Sie eine Skill/Specialist-Anpassungskonversation |
| Dateien | Zeigen Sie das Projektdateienfeld rechts |
| Bibliothek | Offene projektverknüpfte Referenzen in der Literaturbibliothek |
| Sitzungsreihe | Switch-Sitzungen; Statusmeldungen Idle, Running, Permission oder ein anderer Status |
| Sitzungsaktionen | Pin/Unpin, Edit..., Download aller Artefakte, View notebook, Export conversation..., Archive, Delete |
| Nachrichten, Einstellungen, GitHub | Offene Benachrichtigungen, Einstellungen oder das offizielle Repository |
| Größe nach links/rechts, Collapse Preview | Größe eines Panels ändern oder Preview zusammenklappen |

## Gespräch und Komponist {/* #conversation-and-composer */}

| Bereich | Steuerung oder Input | Ergebnis |
| --- | --- | --- |
| Nachricht | Kopie, Edit | Kopieren Sie die Nachricht oder erstellen Sie eine Überarbeitung, indem Sie sie bearbeiten |
| Revision | Vorherige, `n/N`, Nächster | Browse Message Revisionen |
| Assistenzergebnis | Nutzung, abgelaufene, generierte Datei | Inspizieren Sie Nutzung und Zeit oder öffnen Sie eine Ausgabe |
| Aktivität | Sammelbarer Titel, Details, Kopie, Bericht Fehler | Offenes Tool, Code, Diff, Suche oder Fehlerdetails |
| Eingabe | Fragen Sie etwas, `↑↓`, `/`, `@`, `#`, `⌘K/Ctrl+K` | Geben Sie Text ein, durchsuchen Sie den Verlauf, wählen Sie ein Skill aus, verweisen Sie auf eine Datei / Sitzung oder suchen Sie |
| `+` | Dateien anhängen, Ihre Dateien, Review, Kontext | Einrichten einer neuen oder vorhandenen Datei, Anfordern einer Überprüfung oder Überprüfen des Kontexts |
| Anlagechip | Vorschau, entfernen | Überprüfen oder entfernen Sie eine Referenz vor dem Senden |
| Agentenkontrollen | Specialist, Delegation, Auto-Review, Berechtigungsmodus | Ändern Sie die Richtlinie für spätere Anfragen |
| Modell | Aktives Modell, Reasoning effort | Ändern des Modells oder des Aufwands für spätere Anforderungen |
| Warteschlange/Send | Warteschlangen bearbeiten/löschen/neu bestellen, Jetzt senden, Zuerst planen, Nebenchat, Zweigstellen, Stoppen | Folgemaßnahmen durchführen oder einreichen, einen Modus auswählen oder den aktuellen Lauf stoppen |
| Zum Ende scrollen | Springen Sie zur neuesten Nachricht |

## Permission, Plan und strukturierte Fragen {/* #permission-plan-and-structured-questions */}

| Oberfläche | Kontrollen | Ergebnis |
| --- | --- | --- |
| Genehmigung | Impact-Info, Permission-Info, erweiterbares Skill-Dokument, Allow once, Deny | Prüfung und Genehmigung oder Ablehnung einer einzelnen Anfrage |
| Bestätigung des Geltungsbereichs | Abbrechen, Projekt/global bestätigen | Sparen Sie sich einen breiteren Zuschuss; Breite Reichweiten erfordern eine zweite Bestätigung |
| Plan | Genehmigen/Run, Feedback-Eingabe, Abbrechen | Akzeptieren Sie einen Plan, fordern Sie Änderungen an oder stornieren Sie |
| Anstiftung | Strukturierte Eingabe oder Optionen, Einreichen, Abbrechen | Beantworten Sie eine Agentenfrage |
| Erlaubnis des Subagenten | Identität/ausstehende Zählung, Erlauben/Verweigern | Entscheiden Sie eine Subagentenanfrage separat |

## Dateien und Preview {/* #files-and-preview */}

| Kontrolle | Ergebnis |
| --- | --- |
| Filter, Suche | Filtern nach Alle oder Artefakte und nach Dateiname |
| Gitter/Liste | Ändern des Dateilayouts |
| Erweitern/Exit Vollbild | Öffnen Sie die Dateibibliothek Vollbild oder kehren Sie zur Split-Ansicht zurück |
| Akkordeon der Kategorie | Erweitern Sie Uploads oder generierte Dateien aus einer Sitzung |
| Aktenkarte/Körper | Öffnen Sie eine Modal Preview |
| Herunterladen | Speichern der Originaldatei oder der ausgewählten Version |
| Offen in geteilter Ansicht | Fügen Sie einen Vorschau-Tab rechts hinzu |
| Vorschau-Tab, Tab schließen | Schalten oder Schließen von Preview-Tabs |
| Vollbildvorschau | Erweitern Sie die aktuelle Datei |
| Dateiaktionen → Provenance | Offener Artefaktnachweis; Normale Uploads haben diese Aktion nicht |
| File Actions → Bearbeiten/Vergleichen | Veröffentlichen Sie eine neue Textversion oder vergleichen Sie sie mit ihrem Vorgänger |
| Vorherige/vN/Next | Artefaktversion ändern |
| PDB Cartoon/Stick/Sphere/Surface/Line | Ändern der dreidimensionalen Darstellung |
| PDF/Office/Bild-Kontrollen | Navigieren / Suchseiten, Zoom, wählen Sie PDF Beweise, zeigen Thumbnails, oder downloaden wie unterstützt |
| Inhaltskontextmenü Vorschau | Kopieren Sie Pfad, Download, Speichern als Artefakt, Provenance oder kehren Sie gegebenenfalls zum Kontext zurück |

## Literaturbibliothek {/* #literature-library */}

| Bereich | Kontrollen | Ergebnis |
| --- | --- | --- |
| Seitenleiste | Posteingang, Alle Referenzen, Duplikate, Papierkorb, Projekte, Sammlungen, Zitateinstellungen | Wählen Sie den Katalogumfang oder den Citation-Style-Manager |
| Hinzufügen | Referenz hinzufügen, Import PDF, Importreferenzen | Metadaten erstellen oder eine Vorschau PDF/BibTeX/RIS/NBIB importieren |
| Katalog | Suchen, Sortieren, Filtern, Anpassen von Spalten, Seitengröße | Enge und ordnen Sie Referenzen an |
| Auswahlschiene | Sammlungs-/Projektziel, Volltext-Lookup, Umstieg auf Papierkorb, Export | Anwendung einer begrenzten Massenaktion auf ausgewählte Referenzen |
| Referenzdetails | Metadaten edit/complete, Identifiers, Collections, Projects, Attachments, Citation, Volltext | Überprüfen oder aktualisieren Sie eine Referenz |
| Posteingang | Akzeptieren, Abweisen, Batchauswahl, Undo | Review Agent-entdeckte Kandidaten vor der Zulassung zur Bibliothek |
| Duplikate | Gruppen auswählen, vergleichen, Feldauswahl, Merge | Überprüfen und Zusammenführen von Datensätzen unter Beibehaltung von Assoziationen |
| Hintergrundaufgaben | Pause, Resume, Review, Abbrechen | Kontroll-Massen-Metadaten/Volltext-Operationen |

## Notebook und Provenance {/* #notebook-and-provenance */}

| Seite | Kontrollen | Ergebnis |
| --- | --- | --- |
| Notebook | Agentenfilter, Python/R/Bash-Registerkarten, Variablen | Filtern oder Inspizieren des Live-Kernel-Namespaces |
| Notebook Zelle | Copy, Show/Hide Ausgabe | Copy Input oder Expand Output |
| Notebook Fußzeile | Herunterladen `.ipynb`, Schließen | Download, wenn Zellen konvertiert werden können, oder Schließen Sie den Dialog |
| Provenienz | Versionspfeile, Close Provenance | Version ändern oder zurück zu Preview |
| Provenance Tabs | Code, Ausführungsprotokoll, Nachrichten, Umgebung, Überprüfung | Ändern Sie den Evidenztyp |
| Code | Generieren Sie Skript, Download, Kopieren | Erstellen eines abgeleiteten Skripts oder Speichern des Produzentenblocks |

## Bookmarks und Side Discussions {/* #bookmarks-and-side-discussions */}

| Eingang | Kontrollen und Verhalten |
| --- | --- |
| Privatlese-Bookmark | Auswahl → Für mich → Bookmark; Composer Bookmarks öffnet die Liste. Bearbeiten Sie Notizen, kehren Sie zur Quelle zurück oder entfernen Sie das Lesezeichen. [Details](../guides/bookmarks.md) |
| Side Chat Tab | Unabhängiger Tab und Follow-up-Entwurf; Annotationsübertragung; Stornierung und destruktive Bestätigung. [Details](../guides/delegation.md) |

## Globale Einstellungen Kontrollen {/* #global-settings-controls */}

**Search settings** navigiert durch die vier Panelgruppen. `Back`, `Forward`, Brotkrumen, `Maximize/Restore`, `Close settings`, mobile Navigation und Fehler `Dismiss` gelten für alle Einstellungen. Siehe [Einstellungen Übersicht](../settings/overview.md) für Gruppen und Suchkombinationen.

### Skills {/* #skills */}

Konversation Skill importiert, Quellfilter, Suchen, Hinzufügen von Fähigkeiten, Kategoriezusammenbruch, Skill-Detail, aktivieren Sie den Wechsel, Erstellen / Hochladen / Importieren, Vorschau, Bearbeiten, Exportieren, Löschen, Abbrechen und Speichern.

### Memory, Tags, Credentials und Nutzung {/* #memory-tags-credentials-and-usage */}

Speicherkategorie/Eingabe Erstellen, Bearbeiten, Löschen und Löschen; Tags Create/Editing/Löschen, Zuweisung, Favoriten, Filter und Reorder; Credentials erstellen / wiederherstellen / entfernen, Gesundheit, Nutzung und Connector Bindung; Nutzungszeitraum, Metrik, Heatmap, Tageschart, Turns/Calls und Gruppierungssteuerungen.

### Konnektoren {/* #connectors */}

Filter/Search, Add/Import, Enable, Detail, Test/Reconnect, Edit, Export und Remove. Das Formular Hinzufügen enthält Typ, Anzeigename, ID, Beschreibung, Befehl, Argumente, Umgebungsvariablen, URL, Transport, Authentifizierung, OAuth-Bereiche, Autorisierungsserver-URL, Client-Metadaten-URL, Header, Vertrauen, Abbrechen und Hinzufügen / Speichern.

### Spezialisten {/* #specialists */}

Kategoriefilter, Suchen, Aktivieren, Detail, Aktionen, Erstellen und Importieren. Der Editor enthält Icon, Color, Name, Description, Instructions, Full access, Capability type, Skill/Connector searches, selected capabilities, Cancel, and Save. Import enthält Select ZIP, Preview, Diagnostics, Cancel und Import.

### Rechenressourcen {/* #compute */}

Hinzufügen von Host, Hostkarte/-enable, Probe/Retry, Detail/Edit/Remove, Resources, Direct SSH/Slurm execution mode, Details document, Scratch root Edit/Input/Save/Cancel und Concurrent job limit Edit/Input/Save/Cancel. Ausführungsgenehmigungen bieten Deny, einmal, Sitzung, Projekt und global.

### Netzwerk {/* #network */}

erneut prüfen; Proxy System/Manual/Direct; Notebook-Domänenzulassungsliste; Gehäusespiegel Konfigurieren/Bearbeiten Conda-Kanal, Pip-Index und CA-Bundle Spiegel anzeigen, abbrechen und speichern.

### Modell {/* #model */}

Aktives Modell, Reasoning Radios und Subagent/Reviewer/Vision/Session-Details Modellrichtlinien; Provider Test/Edit/Delete/Add. Das Provider-Formular enthält alle Felder der Onboarding-Modellseite sowie Cancel und Save.

### Agent {/* #agent */}

OpenCode/Claude/Codex/CodeBuddy-Rahmenkarte, Switch, Install source, Install/Cancel/Retry, Install log, Repair, Sign in/auth, Import config/home, and Deinstall confirmation.

### Berechtigungen {/* #permissions */}

Standardprofil, Umfangsfilter, Grant Scope Link, Connector-Hinweis, Widerruf und Bestätigung sowie Warnhinweise oder Aktualisieren im unvollständigen Speicher.

### Laufzeiten {/* #runtimes */}

Python/R; Umgebung Aktivieren, Interpreter hinzufügen, Herunterladen/Einrichten, Reparieren, Paketinstallation zulassen, Pakete, Filtern, Paket hinzufügen/Installieren/Entfernen, Deaktivieren/Deinstallieren und Bestätigung.

### Speicher {/* #storage */}

Appliance Storage Reveal/Repair; Datenstandortänderung, Pfad, Browse, Checks, Migration/Adopt/Cancel; Migrationsfortschritt Cancel/Retry/Restart/Discard; erweiterbare Festplattennutzungskategorien.

### Allgemein {/* #general */}

Aufgabenbenachrichtigungen, Themenradios, App-Symbolradios, enges Verhalten, GitHub-Token Open/Input/Save/Clear und About/Check Updates/Installationsupdates.

### Fernbedienung {/* #remote-control */}

Start/Stop/Refresh, Copy/Open URL und QR; Remote.It Einrichten/Wiederholen/Abtrennen; Vertrauenswürdiger Browser Widerruf; Pairing Request Ablehnen/Einmal zulassen/Immer vertrauen.

### Archiviert {/* #archived */}

Projekt verwalten, Projekt wiederherstellen, Projekt löschen; Session Restore/Delete; Löschbestätigung Abbrechen/Bestätigen.


## Literatur-Screening und Ressourcenzugang {/* #screening-and-access */}

| Bereich | Kontrollen | Begleiter |
| --- | --- | --- |
| Bibliothek | Smart Collection, Scope, Inclusion criteria, Exclusion criteria, Use available full text, Live rule preview, Automatische Aktualisierung | [Intelligente Sammlungen](../guides/library.md#smart-collections) |
| Intelligente Sammlung | Testlauf, Entscheidungsansichten, Evaluationsdetails, Include, Excluse, Use model decision, Export included references | [Screen und Review Papers](../workflows/screen-literature.md) |
| Klassifikationsmodelle | Unabhängige intelligente Sammlungen und automatische Bindungen zur Auswahl der Fähigkeiten; Modell testen | [Modellbindung](../guides/models.md#smart-collection-model) |
| Skills / Steckverbinder | Zugriff verwalten, Main Agent, Specialist Assoziationen, schreibgeschützte Rollenbindungen | [Zugang zu Ressourcen](../guides/connectors.md#resource-access) |
| Sitzung | Exportdiagnose, ausgewählte Quellen, Export, Im Ordner anzeigen | [Lokale Diagnoseausfuhren](../guides/troubleshooting.md#session-diagnostics) |
