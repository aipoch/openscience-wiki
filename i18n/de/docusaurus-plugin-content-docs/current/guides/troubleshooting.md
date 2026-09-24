---
title: "Fehlerbehebung und häufige Fragen"
last_update:
  date: '2026-09-24'
---

# Fehlerbehebung und häufige Fragen {/* #troubleshooting-and-common-questions */}

Suchen Sie den Fehlertext unten, folgen Sie den Überprüfungen für die betroffene Operation und wiederholen Sie diese Operation. Wenn das Problem weiterhin besteht, [einen Bug melden oder die Community fragen](#report-a-bug-or-ask-the-community) mit dem Fehler und die Schritte, die es ausgelöst.

<span id="provider-test-fails" />

<span id="pythonr-or-package-installation-fails" />

<span id="file-does-not-open-in-preview" />

<span id="remote-control-is-unreachable" />

## Diagnose durch den Point of Failure {/* #diagnose-by-the-point-of-failure */}

| Symptom | Erste Kontrolle | Aktion und Erfolgsbedingung |
| --- | --- | --- |
| App öffnet einen leeren Arbeitsbereich | Datenstandort, Profil und Archivierung | Zurück zum beabsichtigten Root/Projekt; Erstellen Sie nicht sofort einen Ersatz |
| Kein brauchbares Modell | Provider Login, Active Agent, Modellkompatibilität | [Provider-Einrichtung](providers.md): Eine kleine tatsächliche Antwort gelingt |
| Login erscheint verbunden, Aufgabe fehlschlägt | Erweiterter Providerfehler und ausgewähltes Modell | Überprüfung der Authentifizierung/Berechtigung und Modellkennung; UI-Präsenz ist kein Zugriffsnachweis |
| Aufgabe erscheint gestoppt | Ausstehende Plan-, Genehmigungs- oder Interaktionskarte | Beantworten Sie die sichtbare Anfrage; Lesen Sie den Anwendungsbereich, bevor Sie |
| Queued Correction läuft nicht | Nicht gespeichert / Versenden / Aufgeschoben-Lieferung Zustand | [Komponist](composer.md): Überprüfen Sie, ob es zu einer Benutzernachricht wurde |
| Modul nicht gefunden | Exact Dolmetscher und Paketinventar | [Laufzeiten](runtimes.md): Validieren Sie den Import in der ausgewählten Umgebung |
| Genehmigte Paketinstallation ist immer noch fehlgeschlagen | Erster Netzwerk-/Proxy-/Zertifizierungsfehler | [Netzwerk](network.md): Wiederholen Sie die eigentliche Operation, nachdem Sie ihre Ursache behoben haben |
| Notebook kann keine Datei lesen | Verwalteter Pfad, Anlage, Ordnerzuteilung und Versionsreferenz | Verwenden Sie die vorgesehene zulässige Eingabe; Erweitern Sie nicht den Zugriff auf nicht verwandte Dateisysteme |
| Speicher-Datei-Dienst lehnt einen Arbeitspfad ab | Ob es für die verwaltete Veröffentlichung registriert ist | Speichern durch die unterstützte Artefaktoperation; Öffnen Sie die resultierende Datei erneut |
| Tabelle unterscheidet sich von einer erwarteten Zahl | Quellen-Hash, Trennzeichen, Metadaten-Spalten und Berechnungsnenner | Berechnen Sie aus dem gleichen Input, bevor Sie den Erwartungswert ändern |
| Sichtbare Datei, Preview schlägt fehl | Dateiformat/-größe, Version und Rendererfehler | [Vorschau](previews.md)Download zum Unterscheiden von Rendering von Dateiausfall |
| Referenz scheint zu fehlen | Bibliotheksansicht, Filter, Posteingang oder Papierkorb | Filter löschen, Status prüfen und im richtigen Lebenszyklus wiederherstellen |
| Volltextquelle gefunden, aber Attachment fehlschlägt | Aktuelles Downloadergebnis und PDF Validierung | Verwenden Sie eine andere legitime Quelle / lokale PDF, dann öffnen Sie die Anlage |
| Side Chat deaktiviert | Kompatibilitätsmeldung Agent/Provider | [Delegation](delegation.md): Überprüfen Sie die Kompatibilitätsbeschränkung, die von Ihrem ausgewählten Framework angezeigt wird |
| Remote Job kann nicht ausgeführt werden | Echte Host-, Authentifizierungs-, Zeitplan- und Laufzeitvoraussetzungen | [Remote Compute](remote-compute.md) |

<span id="storage-migration-reports-an-error" />

## HTTP Fehler: 400, 403, 429 und 5xx {/* #http-errors-400-403-429-and-5xx */}

Ein HTTP-Status beschreibt eine Antwort eines Modellanbieters, eines Connector-Dienstes, eines lokalen Browserdienstes oder eines Proxys. **Identifizieren Sie den antwortenden Dienst, bevor Sie die Einstellungen ändern.** Kopieren Sie den Status zusammen mit seinem Fehlerkörper: `403` allein sagt Ihnen nicht, ob eine API-Berechtigung, Proxy-Richtlinie oder Ressourcenbeschränkung die Ablehnung verursacht hat.

<span id="permission-request-keeps-waiting" />

### Anfrage, Authentifizierung und Zugang {/* #request-authentication-and-access */}

| Status | Bedeutung | Was Sie in Open-Science überprüfen sollten |
| --- | --- | --- |
| **400 Bad Request** | Der Dienst lehnt die Anfrage ab. | Lesen Sie das benannte Feld oder den Parameter. Überprüfen Sie den Provider-Endpunkt, die Modellkennung und die unterstützten Anforderungsfunktionen. Überprüfen Sie für einen Werkzeugaufruf das Eingabeschema. Probieren Sie eine kleine textbasierte Anforderung aus, wenn Anhänge oder eine optionale Funktion den Fehler ausgelöst haben. |
| **401 nicht autorisiert** | Eine gültige Authentifizierung fehlt. | Überprüfen Sie, welches Konto oder Anmeldeinformationen der ausfallende Dienst verwendet. Verbinden Sie das entsprechende Abonnement / OAuth-Konto erneut oder korrigieren Sie den API-Schlüssel in [Anbietereinstellungen](providers.md) oder [Konnektor-Anmeldeinformationen](connectors.md). |
| **403 Verboten** | Der Dienst verweigert den Zugang. | Überprüfen Sie die Berechtigung für Modelle/Ressourcen, Organisations-/Projektberechtigungen und die angegebenen Zugriffsbeschränkungen des Dienstes. Wenn der Fehler sagt **HTTP VERBINDUNG 403**Inspizieren Sie die [Proxy- oder Netzwerkrichtlinie](network.md)Anstatt anzunehmen, dass der Modellschlüssel falsch ist. |
| **404 nicht gefunden** | Der Endpunkt oder die Ressource ist an dieser Adresse nicht verfügbar. | Überprüfen Sie die Basis-URL, den API-Pfad und die Modell- / Ressourcen-ID. Eine Browser-Website-URL ist nicht unbedingt ein API-Endpunkt. Ein Dienst kann auch 404 verwenden, um eine nicht zugängliche Ressource zu verbergen. |
| **405-Methode nicht erlaubt** | Der Endpunkt unterstützt diese Anforderungsmethode nicht. | Überprüfen Sie das ausgewählte API-Protokoll und den Connector-Transport mit der Servicedokumentation. Melden Sie eine reproduzierbare Integrationsfehlanpassung, anstatt eine andere Methode zu erraten. |
| **407 Proxy-Authentifizierung erforderlich** | Der Proxy erfordert eine Authentifizierung. | Überprüfen Sie die Proxy-Konfiguration mit Ihrem Netzwerkadministrator. Die Anmeldeinformationen des Modells API authentifizieren den Proxy nicht. |
| **413 Inhalt zu groß** | Die Anfragestelle überschreitet eine Grenze. | Reduzieren Sie die Attachment-/Charge-Größe oder verwenden Sie eine unterstützte kleinere Eingabe. Bestätigen Sie, welcher Dienst das Limit auferlegt. |
| **422 Unverarbeitbarer Inhalt** | Der Anforderungsinhalt kann nicht wie geliefert verarbeitet werden. | Lesen Sie die Validierungsnachricht auf Feldebene. Korrekte Typen, erforderliche Felder oder nicht unterstützte Werte in der Tool/Provider-Anforderung. |

**400 und 403 benötigen unterschiedliche Prüfungen:** für einen 400, der einen nicht unterstützten Parameter benennt, korrigieren Sie diese Anforderungsfunktion. Für ein 403, das ein eingeschränktes Modell benennt, überprüfen Sie den Zugriff auf dieses Modell. Wenn keine genaue Ursache auftritt, bewahren Sie die Antwort auf und fordern Sie die ID für die Unterstützung an; Schlussfolgerungen über die Ursache nicht allein aus der Zahl.

### Quoten und zeitweilige Dienstausfälle {/* #quotas-and-temporary-service-failures */}

| Status | Bedeutung | Nächste Maßnahme |
| --- | --- | --- |
| **402 Zahlung erforderlich** | Anbieterspezifische Zahlungs-/Zugangsabwicklung; HTTP behält diesen Status ohne eine universelle Abrechnungsbedeutung. | Lesen Sie die Fehlerkörper- und Kontoseite dieses Anbieters. Gehen Sie nicht davon aus, dass ein Top-up allein von der Nummer benötigt wird. |
| **429 Zu viele Anfragen** | Zinsbeschränkung; Einige Modell-APIs verwenden es auch für erschöpfte Quoten. | Für ein Tariflimit reduzieren Sie gleichzeitige Anfragen und warten Sie auf **Retry-After** oder den dokumentierten Reset. Für einen Quotierungsfehler überprüfen Sie die Zulage/Abrechnung dieses Dienstes. Ein Abonnementlimit und API Kreditsaldo sind getrennt. |
| **500 Interner Serverfehler** | Der antwortende Server ist fehlgeschlagen. | Überprüfen Sie den Servicestatus. Wiederholen Sie eine kleine Anfrage nach einer Pause, wenn sicher; wiederholte Fehler mit der Anforderungs-ID melden. |
| **502 Bad Gateway** | Ein Gateway erhielt eine ungültige Upstream-Antwort. | Identifizieren Sie das Gateway/Provider und überprüfen Sie dessen Status und Konfiguration vorgelagert. Ein anhaltender Custom-Gateway-Fehler kann seinen Administrator erfordern. |
| **503 Service nicht verfügbar** | Der Dienst ist vorübergehend nicht verfügbar. | Folgen Sie Retry-After, wenn geliefert und warten Sie auf die Wiederherstellung. Überprüfen Sie bei einem lokalen Endpunkt, ob der vorgesehene Modellserver ausgeführt und bereit ist. |
| **504 Gateway Timeout** | Ein Gateway, das stromaufwärts wartet. | Überprüfen Sie, ob die Operation bereits begonnen oder abgeschlossen wurde, bevor Sie erneut versuchen. Für eine Analyse, eine Stellenausschreibung oder ein Artefakt schreiben Sie zuerst das vorhandene Ergebnis, um Doppelarbeit zu vermeiden. |

Einige integrierte Connector-Anforderungen haben automatische Wiederholungen für 429, 500, 502, 503 und 504 begrenzt. Dies gilt nicht für jedes Modell/Framework oder macht wiederholte manuelle Einreichungen sicher. Folgen Sie der Antwort des jeweiligen Dienstes.

### Keine HTTP-Antwort oder immer noch fehlgeschlagen {/* #no-http-response-or-still-failing */}

`ECONNREFUSED`, `ENOTFOUND`, `ETIMEDOUT` und Zertifikatsfehler sind Verbindungs-/TLS-Ausfälle, nicht HTTP-Statuscodes. Ein Request-Timeout ist nicht automatisch HTTP 408 oder 504. Beginnen Sie mit [Netzwerk](network.md).

Testen Sie nach dem Ändern einer Einstellung denselben Provider/Connector mit einer kleinen Anforderung und wiederholen Sie dann die betroffene Operation. Wenn es immer noch fehlschlägt, verwenden Sie den [Rückmeldungsanweisungen](#report-a-bug-or-ask-the-community). Geben Sie den Dienstnamen, den Endpunkt-Host/Pfad ohne Geheimnisse, den Status, den Fehlerkörper, die Anfrage-ID, falls vorhanden, und die Zeit-/Zeitzone an. Fügen Sie niemals einen Autorisierungs-Header oder eine tokenhaltige URL in einen öffentlichen Bericht ein.

## Übereinstimmung mit der Fehlermeldung {/* #match-the-error-message */}

Kopieren Sie den genauen Code und die begleitende Nachricht aus dem fehlgeschlagenen Tool, Dialog oder Protokoll. **Codes**, Python Ausnahmenamen und OS-Nachrichten sind verschiedene Arten von Identifikatoren; Open-Science weist nicht jedem Fehler einen universellen numerischen Code zu. Eine Nachricht kann mehrere Ursachen haben. Für Remote-Jobs verwenden Sie das [SSH und Compute Error Table](remote-compute.md#resolve-ssh-and-job-errors).

| Code oder Nachricht | Bedeutung und nächste Handlung | Wiedereinziehung bestätigen |
| --- | --- | --- |
| `ModuleNotFoundError: No module named '…'` | Der ausgewählte Python-Interpreter kann dieses Modul nicht importieren. Inspektion [Laufzeiten](runtimes.md)Installieren Sie das erforderliche Paket in dieser Umgebung über die unterstützte Paketverwaltungsroute und befolgen Sie alle Neustartanweisungen. | Importieren Sie das Modul in derselben Notebook-Umgebung und führen Sie dann die ausgefallene Zelle erneut aus. |
| `ENOENT` / `No such file or directory` | Der angeforderte Pfad kann nicht gefunden werden. Überprüfen Sie den Dateinamen und den Quellort; Fügen Sie die vorhandene Datei erneut bei, wenn ihre Referenz veraltet ist. | Vorschau oder Lesen der beabsichtigten Eingabe aus der gleichen Aufgabe. |
| `EACCES` / `EPERM` / `Permission denied` | Der Operation fehlt der Zugriff auf das Dateisystem. Prüfen Sie sowohl die OS-Berechtigung als auch die Projektordnerzuteilung; Verwendung [Projekte](projects.md) nur das Verzeichnis zu vergeben, das die Aufgabe benötigt. für SSH `Permission denied (publickey)`Überprüfen Sie stattdessen die Authentifizierung. | Wiederholen Sie das ursprüngliche Lesen/Schreiben innerhalb des vorgesehenen Berechtigungsbereichs. |
| `ENOTDIR` / `Not a directory` | Eine Verzeichnisoperation hat eine Datei oder einen ungültigen Parent-Pfad erhalten. Wählen Sie den Ordner mit den tatsächlichen Inhalten aus. | Die Verzeichnisauflistung wird geöffnet. |
| `EISDIR` / `Is a directory` | Eine Dateioperation erhielt ein Verzeichnis. Wählen Sie die beabsichtigte Datei aus. | Die Datei wird geöffnet oder heruntergeladen. |
| Paketantrag abgelehnt für ein nicht öffentliches Ziel | Überprüfen Sie den abgelehnten Host und die gelöste IP. Eine Proxy- oder DNS-Konfiguration kann eine Adresse für die Netzwerkrichtlinienblöcke bereitstellen. Siehe [Netzwerk](network.md); Beheben Sie die Adressauflösung, anstatt den Zugriff blind zu erweitern. | Die ursprüngliche Paketanfrage und der nachfolgende Import sind beide erfolgreich. |

<span id="agent-does-not-start-or-the-session-stops-progressing" />

### Fehler beim Starten der Datenbank {/* #database-startup-errors */}

Diese Codes werden angezeigt, wenn die App das Öffnen ihrer Daten nicht sicher abschließen kann. Bewahren Sie den vorhandenen Datenordner auf. Lesen Sie die Fehlerdetails vor dem erneuten Versuch; Das Löschen der Datenbank ist kein Reparaturschritt.

| Fehlercode | Bedeutung | Nächste Maßnahme |
| --- | --- | --- |
| `database_runtime_unavailable` | Die gebündelte Datenbank-Engine konnte nicht geladen werden. | Installieren Sie das entsprechende offizielle App-Paket neu und behalten Sie den separaten Datenordner bei. |
| `database_open_failed` | Die Datenbank konnte nicht geöffnet werden. Eine andere App-Instanz, unzureichender Speicherplatz oder ein schreibgeschützter Speicherort können dies verursachen. | Beenden Sie andere Instanzen, überprüfen Sie den freien Speicherplatz und die Ordnerberechtigungen und versuchen Sie es dann erneut. |
| `database_newer_than_app` | Eine neuere App-Version schrieb dieses Datenformat. | Installieren Sie eine kompatible neuere Version und öffnen Sie denselben Datenordner erneut. Versuchen Sie nicht, sein Schema herunterzustufen. |
| `database_history_invalid` | Der Migrationsverlauf stimmt nicht mit dem erwarteten Verlauf der App überein. | Bewahren Sie den Ordner auf und melden Sie den Code. Wenn Sie ein bekanntes Backup haben, suchen Sie nach einem Wiederherstellungsverfahren, bevor Sie Daten ersetzen. |
| `database_migration_failed` | Ein Datenbank-Update wurde nicht abgeschlossen. | Überprüfen Sie freien Speicherplatz, andere Instanzen und Berechtigungen; Verwenden Sie Retry, wenn verfügbar. Fügen Sie die Migrations-ID ein, wenn sie erneut fehlschlägt. |
| `database_validation_failed` | Die gespeicherten Daten entsprechen nicht der erforderlichen Struktur. | Aktualisieren Sie die App und Relaunch. Wenn es fortbesteht, melden Sie den Code, anstatt Datenbankzeilen zu bearbeiten. |
| `database_startup_unavailable` | Der Datenbank-Startservice hat nicht geantwortet oder die Überprüfung beendet. | Wiederholen; Wenn es weiterhin besteht, beenden Sie die App vollständig und öffnen Sie sie erneut, und melden Sie sie dann. |

Recovery bedeutet, dass der Startbildschirm gelöscht und die erwarteten Projekte geöffnet werden. Wenn eine **Still stuck? Create an issue for help**-Aktion verfügbar ist, verwenden Sie den beschriebenen Überprüfungsfluss [unten](#report-a-bug-or-ask-the-community). Diese Bedeutungen folgen dem [Starthilfe](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/database-startup-gate.tsx).

Wenn der Startbildschirm nur **Quit** bietet, beenden Sie die App, beheben Sie die gemeldete Ursache und starten Sie sie erneut. Verwenden Sie **Retry** nur, wenn die Seite es bereitstellt. Öffnen Sie nach der Wiederherstellung Ihre erwarteten Projekte und Dateien erneut.

![Startanleitung, wenn die Datenbank nicht geöffnet werden kann](/img/open-science/local-acceptance/startup-database-error.webp)

### Wiederherstellungsmeldungen {/* #recovery-messages */}

| Symptom | Nächste Maßnahme |
| --- | --- |
| Compute Jobs bleiben nach der Speicherwiederherstellung in der Warteschlange | Lesen Sie die Mitteilung des betroffenen Gesprächs, bewahren Sie die identifizierten Dateien auf, stellen Sie eine gültige Kopie wieder her und wählen Sie **Recheck saved conversations**. Überprüfen Sie den gleichen Job, bevor Sie einen anderen einreichen. |
| PDF-Upload abgesagt, aber die Referenz bleibt | Öffnen Sie die gespeicherte Referenz und überprüfen Sie den Status der Befestigung; Verwendung der Charge **Retry unfinished** Weg, wo er angeboten wird. |
| Collection save abgelehnt, nachdem ein anderer Client es bearbeitet hat | Öffnen Sie die neueste Sammlung und versöhnen Sie die Änderungen, bevor Sie erneut speichern. |
| Windows Update-Berichte verweigert Zugriff | Lesen Sie den genauen Dateipfad und den Windows-Fehler. Befolgen Sie die Anweisungen der Mitteilung, um den offiziellen Installer als Administrator zu verwenden. |
| Windows Update meldet eine verwendete Datei | Schließen Sie den Prozess, der als Verwendung dieser Installationsdatei identifiziert wurde, und wählen Sie **Retry**, oder **Cancel** um das Update zu stoppen. |

Windows-Fehler sind Betriebssystemcodes, die sich von HTTP-Statuscodes unterscheiden. Wenn die Wiederherstellung fehlschlägt, geben Sie die installierte Version, die genaue Nachricht und die entsorgte Datei / Job-Identität an, wenn Sie [Melden Sie das Problem](#report-a-bug-or-ask-the-community) verwenden.

## Lokale Windows-Daten zurücksetzen {/* #windows-data-reset */}

Verwenden Sie das Standalone-Reset-Dienstprogramm nur, wenn Sie die Daten der lokalen Installation verwerfen und neu starten möchten. **Es löscht dauerhaft die aufgeführten Daten und gespeicherten Anmeldeinformationen; Es repariert sie nicht und unterstützt sie nicht.** Copy benötigte zuerst Forschungsdateien und Backups außerhalb aller aufgelisteten Verzeichnisse. Die Neuinstallation der App allein behält diese Daten.

1. Laden Sie vom [Offizieller Reset-Leitfaden](https://github.com/aipoch/open-science/blob/v0.33.0/scripts/windows-reset/README.md) sowohl `reset-open-science.cmd` als auch `reset-open-science.ps1` mit **Rohdatei herunterladen** herunter. Bewahren Sie sie außerhalb der Datenverzeichnisse der App zusammen.
2. Beenden Sie Open-Science, einschließlich des Tray-Prozesses, und beenden und schließen Sie seinen Agent, Notebook, Headless- und WSL-Prozesse. Verwenden Sie Ihr normales Windows-Konto; Der Administratormodus ist nicht erforderlich.
3. Führen Sie in der Eingabeaufforderung, die im Download-Ordner geöffnet wurde, `reset-open-science.cmd -Preview` aus. Überprüfen Sie alle vorgeschlagenen Daten, Konfigurationen, Profile und Laufzeit-Cache-Pfade. Preview löscht keine Daten.
4. Erst nachdem Sie diese Standorte überprüft und gesichert haben, doppelklicken Sie auf `reset-open-science.cmd`. Es fordert Sie auf, `RESET OPEN SCIENCE` genau vor dem Löschen einzugeben; jede andere Antwort storniert.
5. Lesen Sie das Endergebnis, bevor Sie die App wieder öffnen. Wählen Sie nach einem abgeschlossenen Reset den Datenstandort aus und konfigurieren Sie erneut die Anbieter und verwalteten Laufzeiten.

Wenn ein Prozess ausgeführt wird oder nicht inspiziert werden kann oder ein Pfad unsicher ist, lösen Sie zuerst die gemeldete Bedingung. Umgehen Sie nicht eine Ablehnung. Wenn Einstellungen fehlerhaft sind oder ein benutzerdefinierter Datenspeicherort beteiligt ist, verwenden Sie die explizite `-DataRoot`-Prozedur des offiziellen Leitfadens. Ein Löschfehler kann einen teilweisen Reset hinterlassen, also lesen Sie den Fehler, anstatt anzunehmen, dass sich nichts geändert hat. Das Dienstprogramm widerruft keine externen Anbieterkonten oder entfernt separat installierte Python/R-Umgebungen.

<span id="collect-evidence-for-a-report" />

## Sammeln Sie nützliche Diagnosen {/* #collect-useful-diagnostics */}

1. App-Version, Betriebssystem, aktiver Agent/Modell, Projekt/Sitzung und den Zeitpunkt des Fehlers aufzeichnen.
2. Kopieren Sie den ersten relevanten Werkzeugfehler und die Operation, die ihn verursacht hat. Erwartetes versus beobachtetes Verhalten einschließen.
3. Bei Eingabeproblemen einen öffentlichen Quelllink, Dateinamen, Größe und Prüfsumme einschließen; Eine minimale reproduzierbare Eingabe ist nützlicher als ein nicht verwandter Screenshot.
4. Öffnen Sie **Settings → General → Diagnostics** und verwenden Sie bei Bedarf **Offen/Offenbarung** für das Laufzeitprotokoll.
5. Logs vor dem Teilen prüfen; Konto-Token, private Quellinhalte und nicht verwandte Pfade weglassen. Das Öffnen eines Logs sendet es nicht automatisch.
6. Geben Sie an, ob die gleiche Operation nach der Änderung erfolgreich ist. Ein aktivierter Button ist nicht die Erfolgsbedingung.

Technische Nachrichtenbedeutungen werden in [Diagnosereferenz](../reference/diagnostics.md) gesammelt.

### Export-Diagnose für eine Sitzung {/* #session-diagnostics */}

1. Öffnen Sie die betroffene Sitzung und wählen Sie **Export diagnostics…** im Header oder **Export → Export diagnostics…** im Sitzungsmenü.
2. Überprüfen Sie die verfügbaren Quellen. **session.json** und **Session database records** betreffen die ausgewählte Sitzung. **main.log** und historische Anwendungsprotokolle können auch Metadaten aus anderen Sitzungen enthalten; Wählen Sie sie nur aus, wenn sie relevant sind.
3. Wählen Sie **Export**, wählen Sie ein lokales Ziel aus und warten Sie auf **Diagnostics exported.** Verwenden Sie **Show in folder**, um das Archiv zu finden.
4. Überprüfen Sie das Manifest und Exportprotokoll, bevor Sie es teilen. Eine fehlende oder beschädigte Quelle kann zusammengefasst oder weggelassen werden; Die Existenz des Archivs allein beweist nicht, dass jede Quelle gefangen genommen wurde.

![Auswahl von sitzungsspezifischen Diagnosequellen vor einem lokalen Export](/img/open-science/v0330/session-diagnostics.webp)

Der gewöhnliche Metadatenexport schließt private Inhaltsfelder aus. Wenn ein .science-Export die Prüfung des sensiblen Inhalts auslöst, kann die Quellliste auch redigierte Scannernachweise und die markierten Originaldateien enthalten. **Sensible Originaldateien werden standardmäßig nicht überprüft; Auswählen eines enthält seine ursprünglichen Bytes im Archiv.** Wählen Sie nur die benötigten Quellen aus und prüfen Sie das Archiv und die Screenshots, bevor Sie es teilen. Export bleibt lokal und macht keinen Upload oder Model Request. Dies ist ein diagnostischer Beweis, kein Forschungs-Backup; Verwenden Sie ein [.science Paket](research-packages.md) für eine Forschungsübergabe.

## Melden Sie einen Bug oder fragen Sie die Community {/* #report-a-bug-or-ask-the-community */}

| Sie brauchen | Kanal |
| --- | --- |
| Helfen Sie bei der Auswahl von Einstellungen oder beim Verstehen eines Fehlers | [Treten Sie AIPOCH Official bei Discord bei](https://discord.gg/zxQAYjReRv). Beschreiben Sie die Operation, Version und Fehler, damit andere helfen können. |
| Ein reproduzierbarer App-Fehler, der bis zur Auflösung verfolgt wird | Suchen [Bestehende Probleme](https://github.com/aipoch/open-science/issues), dann öffnen Sie eine [Bug-Bericht](https://github.com/aipoch/open-science/issues/new?template=bug_report.yml). |
| Eine neue Fähigkeit oder eine Verbesserung | Öffnen a [Feature Request](https://github.com/aipoch/open-science/issues/new?template=feature_request.yml) und erläutern Sie die Forschungsaufgabe, die es unterstützen würde. |

### Senden Sie ein nützliches GitHub-Problem {/* #submit-a-useful-github-issue */}

1. Suchen Sie bestehende Probleme mit dem Fehlercode oder einer unverwechselbaren Phrase. Wenn das gleiche Problem besteht, fügen Sie dort relevante Reproduktionsdetails hinzu.
2. Melden Sie sich bei GitHub an und öffnen Sie **Bug-Bericht**. Verwenden Sie einen Titel wie `[Bug]: database_open_failed when reopening a project` mit Ihrem tatsächlichen Fehler.
3. Füllen Sie **Was ist passiert?**, **Schritte zur Reproduktion**, **Betriebssystem** und **App version** aus. Fügen Sie **Provider / model** hinzu, wenn relevant, sowie das aktive Agent-Framework.
4. Fügen Sie unter **Relevante Protokolle oder Screenshots** den ersten Fehler und eine kleine Menge Umgebungskontext hinzu. Fügen Sie eine öffentliche oder minimale Stichprobe hinzu, wenn das Problem von Eingabedaten abhängt.
5. Überprüfen Sie den Bericht und reichen Sie ihn dann ein. Behalten Sie die Problem-URL und posten Sie das Ergebnis eines vorgeschlagenen Checks im selben Problem. Wenn GitHub keine Ausgabeerstellung für Ihr Konto anbietet, verwenden Sie Discord, um die entsprechende Berichtsroute zu finden.

Verwenden Sie diese Checkliste, wenn Sie entweder ein Problem oder eine Discord-Frage vorbereiten:

```text
Open-Science version and installation method:
Operating system and architecture:
Agent framework / provider / model (if relevant):
Page and action:
Steps to reproduce:
Expected result:
Actual result:
Exact error code and full message:
Time of failure and time zone:
Public/minimal input (if needed):
Checks already tried and their results:
Relevant log excerpt or screenshot:
```

Bei einem Fernausfall sind auch der Ausführungsmodus, die App-Job-ID, die Planer-Job-ID, falls vorhanden, der Exit-Code und der entsprechende Stdout/Stderr anzugeben. Verwenden Sie einen neutralen Alias für einen privaten Host. Fügen Sie keine Passwörter, Token, SSH-privaten Schlüssel, Patientendaten oder einen ganzen privaten Forschungsordner an; Ersetzen Sie sensible Details in einem minimalen Beispiel.

<span id="report-directly-from-a-startup-error" />

### Erstellen eines Berichts aus einem Fehler {/* #prepare-a-report-from-an-error */}

Wählen Sie **Report this error** neben einem Gesprächsfehler. Ein Startbildschirm kann auch **Still stuck? Create an issue for help** anbieten.

1. Lesen Sie **Error details** und entfernen Sie private Pfade, Identifikatoren oder sensible Eingaben, bevor Sie sie teilen.
2. Überprüfen Sie **Also included** für die Anwendungsversion, das Betriebssystem, das Agent-Framework, die Anbieter- / Modell- und Laufzeitversionen.
3. Verwenden Sie **Copy details**, um den bearbeiteten Text und die Umgebungsinformationen zu kopieren. **Reveal log file** lokalisiert das lokale Laufzeitprotokoll; Es wird nicht automatisch angehängt und benötigt eine separate Überprüfung vor dem Teilen.
4. Überprüfen Sie die Public-Sharing-Bestätigung, um **Open GitHub issue** zu aktivieren. Das Bearbeiten des Fehlertextes erfordert eine erneute Überprüfung und Bestätigung des überarbeiteten Inhalts.
5. Öffnen Sie das GitHub-Formular, prüfen Sie die vorab ausgefüllten Felder, fügen Sie nützliche Reproduktionsschritte hinzu und senden Sie sie dann, wenn sie fertig sind. Das Öffnen der Berichtsvorschau allein stellt kein Problem dar.

![Angaben zu belegbaren Fehlern und Bestätigung der gemeinsamen Nutzung](/img/open-science/sept11-completion/report-preview.webp)

## Gemeinsame Fragen {/* #common-questions */}

**Benötige ich für jede Operation ein Modellkonto?** Nr. Lokales Browsen, Organisation und viele Einstellungen können ohne Modell funktionieren. Antworten von Agenten, Analyseplanung und modellgenerierte Reviews erfordern einen kompatiblen Modellzugriff.

**Bedeutet lokaler Speicher, dass die gesamte Verarbeitung auf dem Gerät bleibt?** Nr. Ausgewählte Eingabeaufforderungen, Dateien oder abgerufene Inhalte können bei Verwendung an das konfigurierte Modell/den konfigurierten Dienst gesendet werden. Lokale Dateien und Modellausführungsort sind separate Fragen.

**Kann ich offline arbeiten?** Vorhandene lokale Dateien und verfügbare lokale Ansichten können weiterhin nutzbar bleiben. Hosted Modelle, Online-Datenbanken und fehlende Paket-Downloads benötigen ihre jeweiligen Verbindungen. Ein Remote-/Lokal-Endpunkt benötigt auch einen eigenen laufenden Service.

**Ist Nutzung eine Rechnung oder Abonnement-Saldo?** Nr. Es meldet verfügbare Telemetrie. Fehlende Nutzung ist nicht Null; Die Abrechnung/Limits des Dienstes bleiben getrennt.

**Führt die Wiederherstellung eines Archivs die Arbeit erneut aus?** Nr. Es stellt die Navigation für die behaltene Arbeit wieder her. Ein Live-Kernel oder eine fehlgeschlagene Operation erfordert möglicherweise immer noch einen expliziten Neustart/Wiederholen.

**Bedeutet ein erfolgreicher SSH-Test, dass meine Analyse laufen kann?** Nr. Überprüfen Sie den ausgewählten Ausführungsmodus, die Schedulerberechtigungen, die Laufzeit- und Ressourcenanforderung, führen Sie dann einen kleinen Auftrag aus und überprüfen Sie die Ausgabe. Siehe [Remote Compute](remote-compute.md).

Quellen: [HTTP Semantik](https://www.rfc-editor.org/rfc/rfc9110.html#section-15), [429 und Retry-After](https://www.rfc-editor.org/rfc/rfc6585.html#section-4), [OpenAI Rate-Limit versus Quotenfehler](https://developers.openai.com/api/docs/guides/error-codes), [Connector Retry Policy](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/request-policy.ts).

Quellen: [Rückforderungsbescheid in der Warteschlange](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/components/SessionCatalogRecoveryAlert.tsx), [PDF Batch-Handling](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [Sammelkonflikt](https://github.com/aipoch/open-science/commit/dbb9560a), [Windows Installateur](https://github.com/aipoch/open-science/blob/v0.27.0/build/installer.nsh).

Quelle: [Fehlerberichtsfelder](https://github.com/aipoch/open-science/blob/v0.26.0/.github/ISSUE_TEMPLATE/bug_report.yml), [Startberichtsdialog](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/startup-issue-dialog.tsx).
