---
title: "Headless Service und Browserzugriff"
last_update:
  date: '2026-10-29'
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

Ab v1.0.5 hält eine App-Verbindung oder ein expliziter CLI-Start den Dienst am Leben. Verwenden Sie den gleichen absoluten Profilpfad für alle Befehle.

| Kommando | Ergebnis |
| --- | --- |
| `open-science start` | Starten oder Wiederverwenden des Dienstes, lassen Sie ihn explizit laufen und öffnen Sie den Browser |
| `open-science start --no-open --json` | Denselben dauerhaften Weiterbetrieb ohne Browser aktivieren; Rückgabe: `started` oder `already-running`, Serviceinformationen und `lifetime` |
| `open-science status --json` | Überprüfen Sie den ausgewählten Dienst; ein fehlender Dienst kehrt zurück `{"running":false}` und Ausstiegscode 1 |
| `open-science url` | Drucken Sie seine authentifizierte Browser-URL; halten Sie diese privat |
| `open-science stop --json` | Dauerhaften Weiterbetrieb deaktivieren; nur ohne verbundene App stoppen |
| `open-science stop --force --json` | Anfordern eines vollständigen Servicestopps, einschließlich verbundener Apps; kann aktive Aufgaben unterbrechen |

Wiederholt `start` erhöhen die Anzahl der Laufanforderungen nicht. **start**, **status** und **stop** Unterstützung `--json`; **url** nicht. Die JSON-Startausgabe stellt die authentifizierte Browser-URL nicht frei. Ältere Dienste können eine unbekannte Lebensdauer melden; Verwenden Sie passende Versionen, bevor Sie sich auf den neuen Vertrag verlassen.

### Shutdown Ergebnisse

| JSON `result` | Bedeutung |
| --- | --- |
| `already-stopped` | Kein Live-Service-Record gefunden |
| `keep-alive-revoked` | Dauerhafter Weiterbetrieb deaktiviert; verbundene Apps halten den Dienst aktiv |
| `stopped` | Die angeforderte Servicegenerierung verließ und gab das Eigentum frei |
| `shutdown-requested` | Ein Legacy-Dienst akzeptierte die Anforderung, aber Exit ist nicht bestätigt; der Befehl gibt einen Nicht-Null-Exit-Code zurück. |

Lesen `result` und `lifetime`; Ein erfolgreicher Exit-Code allein bedeutet nicht, dass der Dienst gestoppt wurde. Ältere `daemon-stopped` und `web-service-stopped` Ergebnisnamen werden nicht mehr ausgegeben. `--force` erfordert das moderne Lifetime-Protokoll und schlägt explizit gegen einen älteren Dienst fehl. Überprüfen Sie Fehler und aktuellen Status, anstatt Statusdateien zu löschen oder eine aufgezeichnete PID zu töten.

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
| Beenden Sie die letzte angeschlossene App ohne expliziten CLI-Start | Betriebsstopps |
| Run CLI `start`, dann alle Apps beenden | Der Dienst läuft durch die ausdrückliche Einstellung weiter |
| Schließen Sie einen Browser-Tab oder einen SDK-Client | Deaktiviert den dauerhaften Weiterbetrieb nicht |
| Führen Sie eine gewöhnliche CLI-, Web- oder SDK-Aufgabe aus | Hält den Dienst nicht unabhängig am Leben, nachdem alle Apps beendet wurden |
| Lauf `open-science stop` Mit einer App verbunden | Dauerhaften Weiterbetrieb deaktivieren; für die verbundene App weiterlaufen |
| Lauf `open-science stop --force` | Serviceweites Herunterfahren anfordern, möglicherweise Unterbrechung der Arbeit |

Wenn der Browser oder die automatisierte Arbeit nach dem Beenden des Desktops fortgesetzt werden muss, starten Sie zuerst explizit dasselbe Profil. Das Schließen eines Fensters zum Tablett wird nicht beendet. Beenden Sie aktive Forschung vor einem Whole-Service-Stop, dann überprüfen `status --json`.

Ein getrenntes Desktop-Angebot **Reconnect** und **Quit app**. Reconnect sendet keine Arbeit erneut ein. Folgen [Anschlusswiederherstellung](../guides/troubleshooting.md#connection-recovery), und inspizieren Sie Operationen, deren Antworten vor dem erneuten Versuch verloren gegangen sind.

### Reconnect nach unterbrochenem Desktop-Shutdown {/* #desktop-service-recovery */}

Öffnen Sie den Desktop der gleichen Version erneut und verbinden Sie sich erneut mit dem ursprünglichen Profil. App-Verbindungen und ein expliziter CLI-Hold bestimmen, ob dieser Dienst am Leben bleibt; ein Browser-Tab allein ersetzt auch nicht.

Wenn die Vorbereitung fehlschlägt, bleibt das Fenster offen. Bewahren Sie ungespeicherte Arbeit und überprüfen Sie die ursprüngliche Aufgabe nach der Wiederherstellung. Wenn ein Startup meldet, dass ein älterer Dienst ihn blockiert, überprüfen Sie das Profil, die Version und die aktiven Clients, bevor Sie die explizite Stoppaktion auswählen. Cancel lässt den Dienst laufen. Ein fehlgeschlagener Stop kann wiederholt oder erneut überprüft werden, ohne Sperrdateien zu löschen.

## Anwendungsaktualisierungsverhalten {/* #application-update-behavior */}

Der CLI Application Updater bleibt entfernt; nicht verwenden `open-science update --json`. Verwendung [Desktop-Update-Steuerelemente oder der ursprüngliche Installationskanal](../guides/installation.md#manual-update).

Vor dem Austausch der CLI-Dateien die Arbeit aller betroffenen Profile beenden. Verbundene Apps schließen und den dauerhaften Weiterbetrieb jedes Profils deaktivieren mit `stop --json`. Bestätigung `stopped` oder `already-stopped`; `keep-alive-revoked` bedeutet, dass eine App den Dienst weiterhin am Laufen hält. Verwendung `stop --force` nur wenn Sie beabsichtigen, die Arbeit aller Kunden einzustellen. Überschreiben Sie keine laufenden Programmdateien.

Bei einem Desktop-Update wird möglicherweise aufgefordert, einen angehängten CLI-Dienst zu stoppen und zur Desktop-Verwaltung zu wechseln. Überprüfen Sie das Profil und die betroffenen Aufgaben, bevor Sie zustimmen; Abbrechen lässt es laufen. Dadurch werden die ursprünglichen eigenständigen CLI-Programmdateien nicht aktualisiert. Folgen Sie Belegungs- und Wiederherstellungshinweisen, ohne Sperren oder Konfiguration zu löschen.

Nach dem Upgrade bestätigen Sie die Version und die Originaldaten und überprüfen Sie dann `status --json` und `doctor --json`. Bewahren Sie den Credential-Store-Modus auf. [1.x Kompatibilität](../guides/installation.md#version-compatibility) verspricht keine gemischten Desktop / Backend-Versionen. Siehe: [Offizieller Runtime Guide](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md), [CLI](cli.md) und [Task SDK](api.md).

## Compute im Web Workspace {/* #web-compute */}

Der Standalone Web Workspace zeigt **Compute** wenn sein Backend die erforderlichen Notebook- und Compute-APIs bereitstellt. Öffnen Sie den verbundenen Arbeitsbereich, überprüfen Sie, ob das Panel verfügbar ist, und verwenden Sie dann die vorhandenen SSH/Slurm-Konfigurationsschritte. Ein verfügbares Panel liefert keine Remote-Anmeldeinformationen oder bestätigt, dass ein Job ausgeführt werden kann.

## Pakete und externe Tool-Clients {/* #local-research-tools */}

Authentifizierte lokale Web-Sitzungen können [Forschungspakete hoch- und herunterladen](../guides/research-packages.md#local-package-transfer)Remote-Web-Sitzungen erhalten diese Übertragungsfähigkeit nicht. Um einen externen Werkzeugclient an derselben Maschine anzuschließen, konfigurieren Sie die [Stdio MCP Adapter](cli.md#external-mcp). Es verwendet einen bereits laufenden lokalen Dienst und die Berechtigungen dieses Profils; es erstellt keine entfernte MCP-URL.
