---
title: "Headless Service und Browserzugriff"
last_update:
  date: '2026-10-27'
---

# Headless Service und Browserzugriff {/* #headless-service-and-browser-access */}

Der lokale Dienst bietet ein Headless-Backend und eine Localhost-Browser-Schnittstelle. Es unterscheidet sich von einem SSH Compute-Host und von der Remote.It-Browserpaarung. Wählen Sie die Authentifizierungs- und Credential-Storage-Einstellungen für den Host aus, bevor Sie einen Client verbinden.

## Zielauswahl und -entdeckung {/* #target-selection-and-discovery */}

Von v0.37.0 aus laufen Shared Services in einem gewöhnlichen Node-Prozess und der Desktop verbindet sich als nativer Client. CLI-Startup benötigt keinen versteckten Elektronen-Host mehr.

| Auswahlgerät | Bereich |
| --- | --- |
| `--port PORT` | Localhost-Port, ganzzahlig 1–65535; Ein besetzter expliziter Port verursacht einen Fehler |
| `--config-root PATH` / `--profile PATH` | Portables CLI Konfigurationsverzeichnis; Halten Sie den gleichen absoluten Pfad durch |
| `OPEN_SCIENCE_CONFIG_ROOT` | Explizites Konfigurationsverzeichnis durch die Umgebung; Befehlsoptionen haben Vorrang |
| Automatische Entdeckung | Lokalen Service-Status finden und sein Profil, Port und Version bestätigen |

Desktop-Backends wählen einen freien Port aus, wenn keiner angegeben ist; CLI-Startup ist standardmäßig 44100. Verwenden Sie `status --json`, anstatt den Port aus einem offenen Fenster zu schließen. Ein kompatibler vorhandener Dienst für dieselbe Konfiguration kann wiederverwendet werden; Beenden Sie die aktive Arbeit und befolgen Sie die Aktualisierungsanweisungen, wenn die Versionen nicht übereinstimmen. Die alte `--app-path`-Option verwandelt eine Electron-Ausführungsdatei nicht in ein neues Node-Backend.

Die Zustandsdatei ist `web-service.json`. Der Authentifizierungsfehler ist keine Berechtigung, diesen Datensatz zu löschen oder seine PID zu töten. Überprüfen Sie zuerst den eigentlichen Service und die Diagnose, um einen anderen Prozess nicht zu beeinträchtigen.

## Initialisierung und Prüfung der Bereitschaft {/* #readiness */}

Verwenden Sie `open-science init`, um das Standard-Konfigurationsverzeichnis vorzubereiten, ohne die App zu starten. Für eine isolierte Konfiguration übergeben Sie den gleichen absoluten `--profile`-Pfad an Init, Start und nachfolgende Befehle. Debian-Pakete installieren das CLI neben der Anwendung. Siehe [Terminaleinrichtung](cli.md#terminal-setup) für Codex-Vorbereitung und -Login.

Führen Sie nach einem beabsichtigten `start --no-open` `open-science doctor --json` aus. Überprüfen Sie insgesamt `ready`, individuelle Prüfungen und Vorschläge für die nächsten Aktionen; Der Prozess-Exit-Code allein ist kein Bereitschaftsurteil. Behalten Sie den Dienst auf seiner vorhandenen authentifizierten lokalen Schnittstelle. Das Starten dieses Headless-Dienstes konfiguriert Remote.It nicht oder veröffentlicht keinen öffentlichen Endpunkt.

## Lifecycle-Befehle {/* #lifecycle-commands */}

| Befehl | Ergebnis | Optionen und Grenzen |
| --- | --- | --- |
| `open-science start` | Starten Sie das Backend und öffnen Sie den Browser | Standard-Port 44100 |
| `open-science start --no-open` | Starten Sie, ohne einen Browser zu öffnen | Verwendung für eine absichtliche lokale Servicesitzung |
| `open-science status --json` | Druckmaschinenlesbarer Servicezustand | Ein fehlender Service kehrt zurück `{"running":false}` und Ausstiegscode 1 |
| `open-science url` | Drucken Sie die authentifizierte Browser-URL | Enthält die lokale Zugangsbehörde; Nicht in veröffentlichte Beispiele einfügen |
| `open-science stop` | Anfordern authentifizierter Graceful Shutdown | Signalisiert nicht blind eine PID aus einer veralteten Zustandsdatei |
| `open-science stop --json` | Melden Sie das Abschaltungsergebnis | Siehe die Ergebnistabelle unten |

Unter diesen Befehlen ist **Status und Stop Support `--json`; Start und URL nicht**. Der lokale `start --json`-Check hat `invalid_cli_usage` mit dem Ausstiegscode 2 zurückgegeben, bevor er etwas gestartet hat. Führen Sie für einen Skriptstart `start --no-open` und dann `status --json` aus.

### Shutdown Ergebnisse {/* #shutdown-outcomes */}

| JSON `result` | Bedeutung |
| --- | --- |
| `already-stopped` | Kein Live-Service-Rekord gefunden |
| `daemon-stopped` | Authentifiziertes Node-Backend beendet; Angehängte Clients verlieren ihre Backend-Verbindung |
| `web-service-stopped` | Legacy Electron Web-Service Ergebnis, nicht das neue Standalone Node Backend |

Eine abgelehnte Anfrage oder verpasste Abschaltungsfrist gibt einen Fehler zurück. Lesen Sie den Fehler und prüfen Sie den tatsächlichen Zielzustand. Melden Sie einen Dienst nicht als angehalten, nur weil der Befehl zurückgegeben wurde.

## Authentifizierung und Browserzugriff {/* #authentication-and-browser-access */}

Der SDK entdeckt den lokalen Dienst und liest sein lokales Authentifizierungstoken und sendet es in Anfrage-Headern. Gewöhnliche menschliche / JSON/JSONL-Task-Ausgabe druckt dieses Token nicht aus. `url` ist die absichtliche Ausnahme, die einen authentifizierten Browsereintrag erzeugt.

Ein localhost-dienst ist nicht automatisch von einem anderen computer aus zugänglich. Der Remote-Browserzugriff verwendet einen eigenen konfigurierten Zugriffsmodus, eine Pairing- und vertrauenswürdige Browser-Lebenszyklus. SSH Compute sendet stattdessen Jobs an konfigurierte Remoteausführungs-Hosts.

Verwenden Sie [Remote-Browserzugriff](../guides/remote-access.md) für Remote.It-Paarung und [Remote Compute](../guides/remote-compute.md) für SSH-Jobs. Kein Flow wird konfiguriert, indem die Dokumentations-URL des lokalen Dienstes geändert wird.

### Credential Storage auf Headless Linux {/* #credential-storage-on-headless-linux */}

Der Standard ist OS-geschützter Speicher. Auf einem Linux Headless Backend ohne verwendbaren Keyring wählen Sie eine explizite Alternative:

<p className="example-label"><strong>Beispiel</strong> Starten Sie einen Linux Headless-Dienst mit Dateinachweisspeicher</p>

~~~bash
open-science start --credential-store=file --no-open
~~~

| Wahlmöglichkeit | Verhalten |
| --- | --- |
| Ausgelassene Option / --credential-store=os | Erfordern Sie den OS-geschützten Speicher |
| --credential-store=file | Erlauben Sie unverschlüsselte Einstellungen verwaltete Geheimnisse nur auf Linux headless |
| Desktop, macOS oder Windows Launch | Dateimodus wird nicht unterstützt |
| Bereits laufendes Backend | Ausdrückliche Moduswahl wird abgelehnt; Es ändert nicht den Modus dieses Prozesses |
| Nächstes Startup | Geben Sie den Modus erneut an; Es ist keine gespeicherte Präferenz |

Der Dateimodus verwendet settings.json und credentials.json unter der Konfigurationswurzel, mit atomaren Schreibvorgängen und POSIX-Modus 0600. Der Wert file:v1: ist base64-codiert, **nicht verschlüsselt**. Jeder, der es lesen kann, kann das Geheimnis wiederherstellen; schließen diese Dateien aus Repositories, Bildern und Support-Berichten aus.

Die Auswahl gilt für neue/aktualisierte, von Einstellungen verwaltete Provider-Schlüssel, App-verwaltete Abonnement-Token, GitHub/Literatur-Schlüssel und freigegebene MCP/OAuth-Geheimnisse. Compute-Passwörter/geschützte Compute-Daten behalten ihre separaten OS-Speicheranforderungen bei; externe Agent-Framework-Login-Stores folgen ihren eigenen Regeln. Keine Sandbox wird durch diese Option deaktiviert.

Vorhandene verschlüsselte Werte werden nicht automatisch migriert und erfordern immer noch ihren ursprünglichen OS-Tresor. Wenn nicht verfügbar, geben Sie das Anmeldeformular durch das normal unterstützte Formular erneut ein. Datei-Refs erfordern einen expliziten Dateimodus zum Lesen und sind mit älteren Releases nicht kompatibel. Um einen Berechtigungsnachweis an den OS-Speicher zurückzugeben, starten Sie im OS-Modus neu und ersetzen Sie ihn explizit, während der Tresor verfügbar ist.

Verwenden Sie persistenten Speicher, wenn die Konfiguration den Containerwechsel überleben muss. Shutdown behält die Konfiguration bei; Ersetzen eines Einweg-Container-Dateisystems kann es entfernen. Siehe [Credential-Lagervertrag](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## Backend-Besitz und Shutdown {/* #backend-ownership */}

| Aktion | Auswirkungen auf das Backend |
| --- | --- |
| Schließen Sie einen Browser-Tab | Backend läuft weiter |
| Beenden Sie den Desktop, der das Backend gestartet hat | Sein eigenes Backend stoppt mit ihm |
| Beenden eines Desktops, der an ein bestehendes CLI-Backend angehängt ist | Nur dieser Kunde löst sich; Das CLI Backend läuft weiter |
| `open-science stop` | Stoppen Sie das ausgewählte Backend, was sich auf alle daran angeschlossenen Clients auswirkt |

Das Schließen eines Fensters kann sich vom Beenden der App unterscheiden, insbesondere wenn es im Tablar verbleibt. Beenden Sie die aktive Recherche, bevor Sie ein gemeinsames Backend stoppen, und überprüfen Sie dann den tatsächlichen Zustand mit `status --json`.

Ein getrennter Desktop bietet **Erneut verbinden** und **App beenden**. Reconnect aktualisiert das ursprüngliche Live-Backend und sendet keine Arbeit erneut; Wenn das Backend weg ist, beenden und wieder öffnen. Ein getrenntes beenden kann nur den client schließen, also überprüfen sie den status des ausgewählten profils, bevor sie annehmen, dass der dienst gestoppt wurde. Folgen Sie [Anschlusswiederherstellung](../guides/troubleshooting.md#connection-recovery), einschließlich der Überprüfung von Operationen, deren Antworten verloren gegangen sind.
### Reconnect nach unterbrochenem Desktop-Shutdown {/* #desktop-service-recovery */}

Wenn der Desktop unerwartet beendet wird, während sein Backend überlebt, kann das Wiedereröffnen eines Desktops mit gleicher Version diesen Desktop-gestarteten Dienst übernehmen, nachdem sich der alte Controller und das Teardown erledigt haben. Ein CLI-gestarteter Dienst bleibt ausgeliehen; Ein normaler Desktop Quit stoppt es nicht nur, weil der Desktop wieder verbunden ist.

Wenn die Vorbereitung fehlschlägt, bleibt das Fenster offen. Lesen Sie die Notiz, bewahren Sie die nicht gespeicherte Arbeit auf und warten Sie, bis sich die Konversation erholt hat, bevor Sie den ursprünglichen Ablauf und die Dateien überprüfen. Ein offenes Fenster bedeutet nicht, dass die Aufgabe abgebrochen wurde. Wenn ein Startup meldet, dass ein älterer eigenständiger Dienst ihn blockiert, überprüfen Sie das Profil und die Version, bevor Sie die explizite Stoppaktion auswählen. Abbrechen lässt diesen Dienst laufen; ein fehlgeschlagenes Stoppen kann wiederholt oder erneut überprüft werden, ohne Sperrdateien zu löschen.

## Anwendungs-Updateverhalten {/* #application-update-behavior */}

v1.0.0 entfernt den CLI-Anwendungs-Updater; Verwenden Sie `open-science update --json` nicht. Verwenden Sie die Desktop-Update-Steuerelemente oder den Original-Installationsprogramm- / Paketmanager und beobachten Sie [Aktuelle Release-Verfügbarkeit](../guides/installation.md#standalone-cli).

- **Desktop-App:** beendet aktive Recherchen, bevor Updates überprüft werden. Wenn die Aktualisierung, während sie an einen CLI-Dienst angeschlossen ist, darum bittet, sie zu stoppen und zur Desktop-Verwaltung zu wechseln, überprüfen Sie das Profil und die betroffenen Aufgaben, bevor Sie zustimmen. Cancel lässt den ursprünglichen Dienst laufen. Dieser Switch aktualisiert die ursprünglichen eigenständigen CLI-Programmdateien nicht.
- **Standalone CLI Installation:** stoppt jedes Profil, das es verwendet, und installiert dann ein tatsächlich veröffentlichtes Paket über den ursprünglichen Kanal. Überschreiben Sie keine laufenden Dateien oder öffnen Sie ein Profil mit einem alten Backend erneut, nachdem ein neuerer Desktop darauf geschrieben hat.
- **Belegungs- oder Wiedereinziehungsanzeige:** folgt den angezeigten Überprüfungen auf aktive Instanzen und Installationszustand. Löschen Sie keine Sperren, Konfigurations- oder Wiederherstellungsaufzeichnungen, um ein Update zu erzwingen, wenn das Herunterfahren unsicher ist.

Nach dem Upgrade bestätigen Sie die Version und die Originaldaten und verwenden dann `status --json` und `doctor --json`, um den Servicezustand und die Bereitschaft zu überprüfen. Bewahren Sie den Credential-Store-Modus. [1.x Kompatibilität](../guides/installation.md#version-compatibility) verspricht keine gemischten Desktop- / Backend-Versionen.

Siehe [Offizieller Runtime Guide](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md), [CLI](cli.md) und [Aufgabe SDK](api.md).

## Compute im Web Workspace {/* #web-compute */}

Der Standalone Web Workspace zeigt **Compute** wenn sein Backend die erforderlichen Notebook- und Compute-APIs bereitstellt. Öffnen Sie den verbundenen Arbeitsbereich, überprüfen Sie, ob das Panel verfügbar ist, und verwenden Sie dann die vorhandenen SSH/Slurm-Konfigurationsschritte. Ein verfügbares Panel liefert keine Remote-Anmeldeinformationen oder bestätigt, dass ein Job ausgeführt werden kann.

## Pakete und externe Tool-Clients {/* #local-research-tools */}

Authentifizierte lokale Web-Sitzungen können [Forschungspakete importieren und exportieren](../guides/research-packages.md#local-package-transfer); Remote-Web-Sitzungen können diese willkürlichen Pfadübertragungen nicht durchführen. Um Forschungswerkzeuge einem externen Client auf derselben Maschine auszusetzen, konfigurieren Sie die [Stdio MCP Adapter](cli.md#external-mcp). Es stellt eine Verbindung zu einem bereits laufenden lokalen Dienst her und verwendet die Berechtigungen dieses Profils; es erstellt keine entfernte MCP-URL.
