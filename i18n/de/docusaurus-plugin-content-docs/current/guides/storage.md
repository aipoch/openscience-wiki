---
title: "Lagerung und archivierte Arbeiten"
last_update:
  date: '2026-09-24'
---

# Lagerung und archivierte Arbeiten {/* #storage-and-archived-work */}

Verwenden Sie **Settings → Storage**, um den Speicherort und die Festplattennutzung der verwalteten Daten zu überprüfen. Verwenden Sie **Settings → Archived**, um inaktive Projekte und Sitzungen zu organisieren. Die Archivierung verschiebt die Datenwurzel nicht oder verspricht eine Wiederherstellung des Festplattenraums.

## Nutzung von Lese- und Refresh-Disks {/* #read-and-refresh-disk-usage */}

![Tatsächlicher verwalteter Speicher nach den Forschungsbeispielen](/img/open-science/local-acceptance/storage-installed-location.webp)

Lesen Sie **Data location**, bevor Sie eine fehlende Datei sichern oder diagnostizieren. Dies ist die verwaltete Wurzel der App, getrennt von einem externen Quellordner, der einem Projekt gewährt wird. **Refresh**-Rescans; vor dem Vergleich der Messungen die zuletzt abgetastete Zeit überprüfen.

| Kategorie | Wofür er verantwortlich ist | Auslegung |
| --- | --- | --- |
| Artefakte | Managed Research Outputs und ihre gespeicherten Daten | Ein kleiner aktueller Bericht kann noch frühere Versionen haben |
| Uploads | Verwaltete Eingabekopien | Das Entfernen einer externen Quelldatei entfernt diese Kopie nicht |
| Laufzeit | Managed Dolmetscher und Abhängigkeiten; Erweitern für Details | Normalerweise größer als ein kleiner Beispieldatensatz |
| Notebooks | Sitzungsausführungsspeicher | Exportieren Sie ein benötigtes Notebook, bevor Sie seine eigene Arbeit löschen |
| Ausführungsnachweise | Nachweis in der erfassten Version | Anders als der aktuelle Live-Kernel |
| Sitzungsarbeitsbereiche | Arbeitsdateien für Gespräche | Nicht jede Arbeitsdatei ist zu einem veröffentlichten Artefakt geworden |
| Compute Cache / Subagent Workspaces | Zwischengespeicherte oder delegierte Arbeitsdaten | Lesen Sie die tatsächliche Kategorie, bevor Sie davon ausgehen, dass es Einweg ist |
| Gesamt-/Verfügbare Fläche | Aktuell verwalteter Gesamt- und Gerätefreiraum | Messungen, nicht Einbauvorschriften |

Die Festplattennutzung ändert sich mit Ihren Dateien und Laufzeiten. jede Kategorie zu prüfen, bevor sie ihre Managementkontrollen durchführt; Eine Nutzungskategorie bedeutet nicht, dass ihr Inhalt in einer Aktion sicher gelöscht werden kann.

<span id="review-relocation-before-submitting" />

## Verschieben Sie den Datenstandort {/* #move-the-data-location */}

### Vor dem Umzug {/* #before-moving */}

Beenden Sie aktive Aufgaben und führen Sie Exporte wichtiger Inputs, Outputs und Ausführungsaufzeichnungen. Notieren Sie den aktuellen Standort und die erforderlichen Pakete. Durch das Verschieben von Forschungsdaten werden nicht alle Anwendungseinstellungen oder der Konversationsverlauf verschoben, die am Konfigurationsort verbleiben.

### Wählen und Einreichen des Bestimmungsorts {/* #choose-and-submit-the-destination */}

1. Wählen Sie **Change location** und lesen Sie die Migrationsbenachrichtigung.
2. Wählen Sie **Continue**, um das Zielformular zu öffnen.
3. Geben Sie **New location** ein, verwenden Sie **Browse…** oder wählen Sie **Zurück zum Standard-Standort**.
4. Überprüfen Sie die Quelle, das Ziel, den verfügbaren Speicherplatz und die Wiederherstellungsmitteilung.
5. **Change location** sendet einen gültigen Zug; **Cancel** lässt den aktuellen Standort unverändert.

![Relocation-Formular mit Runtime-Wiederaufbauanforderungen](/img/open-science/local-acceptance/storage-destination-form.webp)

Die App verschiebt bestehende Forschungsdaten. Python/R Umgebungen sind **nach Neustart neu aufgebaut, nicht kopiert**. Der freigegebene Laufzeitpaket-Cache wird kopiert, um Offline-Wiederaufbauten zu unterstützen, aber nur Pip- oder CRAN-Pakete werden nicht garantiert wiederhergestellt. Zusätzlicher Umbauraum kann nicht zuverlässig vorhergesagt werden. Erfassen Sie die Anforderungen an die Umgebung / das Paket vor einem echten Umzug und testen Sie die benötigte Laufzeit danach.

### Überprüfen Sie das Ziel nach dem Neustart {/* #check-the-destination-after-restart */}

1. Öffnen Sie **Settings → Storage** und bestätigen Sie, dass **Location** das gewählte Ziel ist.
2. Öffnen Sie ein bestehendes Projekt, seinen gespeicherten Bericht und frühere Überarbeitungen des Berichts. Überprüfen Sie auch die Bibliothek, Sammlungen, Projektlinks und PDF-Anhänge.
3. Öffnen Sie Notebook, prüfen Sie die verfügbare Laufzeit und führen Sie eine kleine schreibgeschützte Berechnung mit einem vorhandenen Input erneut aus. Eine erfolgreiche Kopie allein überprüft die neu erstellte Laufzeit nicht.
4. Bewahren Sie die Originaldaten und Exporte auf, bis diese Kontrollen bestanden sind. Vergleichen Sie gespeicherte Dateiinhalte oder Prüfsummen und bestätigen Sie Bibliotheksreferenzen, Sammlungen, Projektlinks, Anhänge und Zitiereinstellungen. Speichern und öffnen Sie ein neues Ergebnis, um zu überprüfen, ob der neue Standort beschreibbar ist.

Bestätigen Sie bei einem externen R-Interpreter, dass die ausgewählte ausführbare Datei weiterhin existiert und dass die Notebook an sie gebunden bleibt. Laden Sie die Pakete, die Ihre Analyse benötigt, führen Sie eine kleine Berechnung erneut aus und öffnen Sie das gespeicherte Ergebnis erneut. Ein externer Interpreter und seine vorhandenen Pakete sind von der von der App verwalteten Umgebung getrennt, die möglicherweise neu erstellt werden muss.

### Zurück zum Standard-Standort {/* #return-to-the-default-location */}

1. Beenden Sie aktive Aufgaben und wählen Sie dann **Change location → Continue → Or move it back to the default location** aus.
2. Überprüfen Sie die Quelle, das Standardziel, den freien Speicherplatz und die Runtime-Rebuild-Benachrichtigung. Absenden und warten Sie auf **Data copied**.
3. Wählen Sie **Restart now**. Nach dem Neustart **Settings → Storage → Location** überprüfen. Wenn das Kopieren erfolgreich war, der Wechsel jedoch nicht, verwenden Sie [Wiedereinziehung der Migration](#the-data-copied-but-switching-failed).
4. Öffnen Sie das ursprüngliche Projekt und die gespeicherten Dateien erneut. Überprüfen Sie verwaltetes Python/R in **Runtimes**, verwenden Sie **Download und Setup** bei Bedarf und führen Sie eine kleine schreibgeschützte Berechnung mit einer vorhandenen Eingabe aus.

Öffnen Sie nach der Rückkehr ein bestehendes Projekt erneut, geben Sie ein und speichern Sie den Bericht. Bestätigen Sie, dass die verwaltete Laufzeit bereit ist, führen Sie dann eine kleine Berechnung aus und speichern Sie ein neues Ergebnis. Öffnen Sie es erneut, um zu überprüfen, ob der Standarddatenspeicherort verwendet wird.

![Gespeichertes R-Ergebnis nach Rückkehr zum Standardspeicherort wieder geöffnet](/img/open-science/local-acceptance/r-default-chart.webp)

Wenn **Ein anderer Ordner namens OpenScience existiert bereits hier. Wählen Sie einen anderen Standort.** erscheint, blockiert die App das Überschreiben. Stornieren und bewahren Sie dieses Verzeichnis. Aufbau von Eigentum, Inhalt und Backup vor der Lösung des Konflikts; Löschen Sie nicht einfach einen gleichnamigen Ordner. Migration nur nach Zielvalidierungsdurchläufen wiederholen.

### Die Daten kopiert, aber Switching fehlgeschlagen {/* #the-data-copied-but-switching-failed */}

**Data copied** bestätigt die Kopie und prüft; **Restart now** muss noch den aktiven Datenstandort wechseln. Wenn es **Konnte die app nicht darauf vorbereiten, datenstandorte sicher zu wechseln. Bitte versuchen Sie es noch einmal.** meldet, ist der Umzug nicht abgeschlossen. Interne Pfade nicht manuell umleiten.

1. Behalten Sie den Fehler und beide Standorte. Überprüfen Sie, ob das ursprüngliche Projekt und die Dateien noch geöffnet sind.
2. **Change location** wieder öffnen. Wenn eine unfertige Kopie erkannt wird, wählen Sie **Resolve unfinished move**.
3. **Finish move** versucht, die vorhandene Kopie zu vervollständigen. **Discard copy** verlässt diese unfertige Kopie, während der ursprüngliche Speicherort beibehalten wird. Lesen Sie zuerst den Bestätigungsumfang.
4. Wenn **Conversation storage needs attention** angezeigt wird, lösen Sie den unvollendeten Zug, wählen Sie **Retry** und öffnen Sie das ursprüngliche Projekt und den Bericht erneut.

![Wiederherstellungsoptionen für die unfertige Speicherbewegung](/img/open-science/local-todo-batch/46-storage-recovery-choice.webp)

Wenn der letzte Schalter wiederholt fehlschlägt, beenden Sie die aktive Arbeit, beenden Sie die App und öffnen Sie sie erneut, und versuchen Sie dann den Umzug. Wenn der Fehler weiterhin besteht, behalten Sie den ursprünglichen Speicherort bei und sammeln Sie die Fehlerdetails, bevor Sie eine weitere Änderung vornehmen.


## Archivieren Sie eine Sitzung und bringen Sie sie zurück {/* #archive-a-session-and-bring-it-back */}

Wählen Sie die Sitzung, die Sie archivieren möchten, und beenden oder beenden Sie zuerst die aktive Arbeit. Führen Sie eine separate abgeschlossene Sitzung, wenn Sie den wiederhergestellten Zustand vergleichen müssen.

1. Öffnen Sie das Menü der Sitzungszeile und wählen Sie **Archive**.
2. Bestätigen Sie, dass es die aktive Sitzungsliste verlässt.
3. Öffnen Sie **Settings → Archived**.
4. Geben Sie unter **Sessions** den Titel, das Projekt und die Archivzeit an.
5. Wählen Sie die **Restore** dieser Zeile.
6. Kehren Sie zum Projekt zurück und bestätigen Sie, dass die Sitzung wieder verfügbar ist.

Wählen Sie den **row's Restore**, um eine archivierte Sitzung wiederherzustellen. Die Fensterebene Wiederherstellen ändert nur das Layout der Einstellungen. Öffnen Sie für ein archiviertes Projekt **Projects → Manage**, um seine Sitzungen zu inspizieren, bevor Sie es wiederherstellen oder löschen.

## Archivieren und Wiederherstellen eines Projekts {/* #archive-and-restore-a-project */}

1. Öffnen Sie zu Hause die Aktionen der Projektkarte und wählen Sie **Archive**.
2. Öffnen Sie **Settings → Archived → Projects**, dann die **Manage**-Zeile des Projekts.
3. Lesen Sie die Projekt- und Sitzungsliste. Sessions können **Versteckt, weil sein Projekt archiviert ist** anzeigen, ohne einzeln archiviert zu werden.
4. Wählen Sie **Restore project**.
5. Öffnen Sie das Projekt, seine Konversation und einen gespeicherten Bericht.

![Verwaltung des archivierten GSE60450-Projekts](/img/open-science/local-todo-batch/34-archived-project-manage.webp)

Öffnen Sie einen gespeicherten Bericht und seine Überarbeitungen nach der Wiederherstellung. Archivierung organisiert das Projekt; Es führt die Analyse nicht erneut aus oder entfernt den Versionsverlauf des Berichts.

<span id="delete-a-disposable-project" />

## Löschen Sie ein Projekt dauerhaft {/* #permanently-delete-a-project */}

**Delete project** öffnet eine permanente Löschungsbestätigung. Lesen Sie den Umfang, bevor Sie bestätigen: Verwaltete Artefakte und Uploads sind von externen Arbeitsordnerdateien getrennt, die nicht gelöscht werden. Überprüfen Sie, welche Aufgaben und Kernel gestoppt werden und welche verwalteten Sitzungsarbeitsbereiche im Speicher verbleiben. Archivierung und Löschung haben unterschiedliche Ergebnisse.

![Löschumfang für ein separat erstelltes leeres Projekt](/img/open-science/local-todo-batch/35-disposable-project-delete.webp)

Verwenden Sie ein leeres Einwegprojekt, wenn Sie den Löschfluss lernen. Überprüfen Sie die betroffenen Aufzeichnungen der Bestätigung, bevor Sie ein Projekt mit Forschungsarbeiten löschen.

## Unterscheidung zwischen Abholvorgängen {/* #distinguish-removal-operations */}

| Vorgang | Verwertbarkeit und Wirkung |
| --- | --- |
| Nicht mehr anheften | Nur Sitzungsplatzierung ändern |
| Archiv | Reversible Organisation; Retained Work erscheint in Archived |
| Wiederherstellen | Gibt das archivierte Element zur Verwendung zurück; Es wird keine Forschungsarbeit wiederholt |
| Entfernen eines Source-Ordner Grant | Ändert den Zugriff auf einen externen Ordner; Nicht Löschen dieses Ordners |
| Projekt/Sitzung löschen | Dauerhafte Entfernung nach Bestätigung des Antrags; Lesen Sie die betroffenen Aufzeichnungen / Dateien, bevor Sie fortfahren |
| Literatur → Umzug in den Papierkorb | Ein separater Referenzbibliothekslebenszyklus; Wiederherstellen dort, nicht in Archiviert |

Exportieren Sie vor dem dauerhaften Löschen die Eingaben, Ausgaben und Ausführungsaufzeichnungen, die Sie behalten müssen. Überprüfen Sie, ob andere Arbeiten noch auf sie verweisen, und stornieren Sie, wenn die Bestätigung Inhalte enthält, die Sie behalten möchten.

## Wenn die Speicherung oder Verwertung fehlschlägt {/* #if-storage-or-recovery-fails */}

Überprüfen Sie bei einem fehlgeschlagenen Download das gewählte Ziel und den freien Speicherplatz. Bestätigen Sie bei einer nicht verfügbaren verwalteten Datei den ausgewählten Datenspeicherort und das ausgewählte Datenprofil, bevor Sie ein Ersatzprojekt erstellen. Bei fehlenden Paketen nach dem Umzug überprüfen Sie die neu erstellte Laufzeit, anstatt anzunehmen, dass Forschungsdaten verloren gegangen sind. Verwenden Sie [Fehlerbehebung](troubleshooting.md), um die ersten nützlichen Fehler- und Versionsinformationen zu sammeln.

Quellen: [Speicherpaneel](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StoragePanel.tsx), [Migrationsformular](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StorageMigrationModal.tsx). [Umzugskontrollen in Bibliotheken](https://github.com/aipoch/open-science/commit/d00c722d).

## Daten nach einem Upgrade wieder öffnen {/* #historical-data-location */}

Eine vorhandene gespeicherte Datenposition hat Vorrang. Bei einer abgeschlossenen älteren Installation ohne explizit gespeicherten Speicherort behält Open-Science den historischen Speicherort bei und speichert diese Option. Wenn dieser gespeicherte Ordner nicht verfügbar ist, verbinden Sie ihn erneut, bevor Sie ihn neu starten. Wenn mehrere historische Standorte Forschungsdaten enthalten, werden Sie von der App aufgefordert, den ursprünglichen Ordner auszuwählen oder wiederherzustellen, anstatt ihn stillschweigend auszuwählen. Bewahren Sie beide Kopien auf, bis Sie ihre Projekte und Dateien überprüft haben; Erstellen Sie keinen neuen leeren Speicherort, um einen offensichtlichen Datenverlust zu beheben.
