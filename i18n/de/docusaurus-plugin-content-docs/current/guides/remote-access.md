---
title: "Remote-Browserzugriff"
last_update:
  date: '2026-09-20'
---

# Remote-Browserzugriff {/* #remote-browser-access */}

Der Remote-Browserzugriff ermöglicht es einem anderen Gerät, den laufenden Arbeitsbereich dieses Computers zu betreiben. Projekte, Agenten, Dateien und Notebook Laufzeiten laufen weiterhin auf diesem Computer. Es ist getrennt von [SSH/Slurm berechnen](./remote-compute.md), das Berechnungen an einen Host sendet.

:::caution&#91;Verbindungsstatus&#93; Remote.It kann Dienständerungen akzeptieren, bevor der Hintergrundagent sie als bereit meldet. Eine vollständige Browser-Paarung und der Zugriff auf den Arbeitsbereich müssen auf Ihren Geräten weiterhin erfolgreich sein. Der Off-State-Screenshot unten zeigt die Steuerelemente, nicht eine angeschlossene Remote-Sitzung. :::

## Voraussetzungen und Modalitäten {/* #prerequisites-and-modes */}

Öffnen Sie **Settings → Remote** auf dem Heimcomputer. Installieren und melden Sie sich bei der separaten Remote.It-Desktopanwendung an, bevor Sie die Modi aktivieren, die sie verwenden. Open-Science ruft seine installierte CLI auf; Es erstellt kein Remote.It-Konto oder bündelt diesen Dienst.

| Modus | Wofür es ist |
| --- | --- |
| Aus | Unterbrechen Sie den Fernzugriff, während Sie die Einrichtung des Anbieters und die vertrauenswürdigen Browserdatensätze zur Wiederverwendung beibehalten. |
| App-Zugriff | Verbinden Sie sich über die angemeldete mobile App und führen Sie eine zweistufige Verifizierung durch. |
| Browserzugriff | Verwenden Sie einen persistenten HTTPS-Browserlink und führen Sie eine zweistufige Verifizierung durch. |

![Fernzugriff im Aus-Zustand überprüft](/img/open-science/walkthrough-2026-09-08/63-remote-off.webp)

Access-Mode-Einstellungen können vom Desktop-Fenster auf dem Heimcomputer geändert werden. Ein angeschlossener Browser kann die Paarung / das Vertrauen verwalten, wenn er autorisiert ist, aber er ist kein Ersatz für diese reine Desktop-Modussteuerung.

## Verbinden Sie einen Browser, wenn die Umgebung verfügbar ist {/* #pair-a-browser-when-the-environment-is-available */}

1. Wählen Sie den beabsichtigten Zugriffsmodus und warten Sie auf den Bereitschafts-/Auslaufstatus. Ein Fehler oder Ändern des Zugriffsmodus ist keine nutzbare Verbindung.
2. Verwenden Sie im Browserzugriff **Copy**, **Open** oder den QR-Code für den angezeigten Link. Verwenden Sie im App-Zugriff die Anweisungen für die mobile Verbindung und das gleiche Remote.It-Konto.
3. Vergleichen Sie auf dem anfordernden Gerät den sechsstelligen Code mit **Pairing requests** auf einem autorisierten Genehmigungsgerät. Überprüfen Sie Browser, Plattform, Zeit und Adresse.
4. Wählen Sie **Reject**, **Allow for up to 12 hours** oder **Trust this browser for 180 days**. Temporärer Zugang ist kein permanentes Vertrauen.
5. Stellen Sie sicher, dass sich der vorgesehene Arbeitsbereich öffnet und eine kleine schreibgeschützte Interaktion erfolgreich ist. Schließen Sie Konnektivität nicht aus dem Kopieren eines Links.

Halten Sie den Access Link privat. Teilen Sie eine Verbindung nur mit dem vorgesehenen Gerät und bestätigen Sie die Pairing-Anfrage, bevor Sie ihr vertrauen.

## Widerrufen und Stoppen {/* #revoke-and-stop */}

**Trusted browsers** listet Gerätedetails und letzte Verwendung auf. **Revoke &#91;Browser&#93;** ungültig macht, dass Browser-Autorisierung für spätere geschützte Zugriff / Reconnection. Drehen **Off** pausiert den Zugriff, aber hält Vertrauensaufzeichnungen; Ein verlorenes Gerät separat zurückziehen.

Wenn die App meldet, dass das Ausschalten nicht beendet wurde, verwenden Sie **Retry turning off** und bestätigen Sie den gespeicherten Zustand. Die Warnung besagt ausdrücklich, dass der Zugriff nach dem Neustart zurückkehren kann, wenn Off nicht gespeichert wurde. Behandeln Sie einen ausgewählten Radio-Button nicht allein als Erfolg.

### Service-Änderungen akzeptiert, Agent noch neu gestartet {/* #service-changes-accepted-agent-still-restarting */}

Wenn die Nachricht **Remote.It akzeptierte die Serviceänderungen, aber sein Hintergrundagent wird immer noch neu gestartet** sagt, wurden die neuen Service-IDs gespeichert. Warten Sie ein paar Sekunden und wählen Sie dann **Detekte** oder **Detect again**. Fügen Sie das Gerät nicht erneut hinzu oder wechseln Sie die Modi wiederholt; Wiederverwendung der akzeptierten Dienstkonfiguration.

Fahren Sie erst fort, nachdem die Seite die Browser-Link- und Pairing-Steuerelemente bereitgestellt hat. Wenn die Erkennung weiterhin fehlschlägt, bestätigen Sie, dass die Remote.It-Desktop-App angemeldet ist und ihr Agent ausgeführt wird, behalten Sie die genaue Nachricht bei und verwenden Sie [Fehlerbehebung](troubleshooting.md), um sie zu melden. Ein **Ready**-Subpanel neben einem Fehler auf Seitenebene reicht nicht aus, um einen End-to-End-Zugriff einzurichten.

## Diagnose nach Stadium {/* #diagnose-by-stage */}

| Phase | Überprüfung |
| --- | --- |
| Anbieter nicht erkannt | Remote.It-Installation, Anmelde- und Erkennungsergebnis der Seite. |
| Moduswechsel ist fehlgeschlagen | Der aktuelle Fehler und ob die lokale App / der lokale Anbieter weiterhin ausgeführt wird. |
| Link wird geöffnet, Workspace jedoch nicht | Pairing Code, Ablauf, Vertrauen und autorisiertes Gerät. |
| Zuvor funktionierender Browser wird abgelehnt | Widerruf / Ablauf und ob der Zugriff ausgeschaltet ist. |
| Workspace öffnet sich, aber eine Aufgabe schlägt fehl | Modell-, Laufzeit- und Werkzeugberechtigungen auf dem Heimcomputer; Der Fernzugriff konfiguriert diese nicht. |

Für lokale Headless/Browser-Befehle siehe [Betriebsnummer](../reference/server.md). Das ist ein separater Einstiegspfad von den hier gezeigten Remote.It-Modi.

Quelle: [Fernzugriffsfenster](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/RemoteControlPanel.tsx).

Für Linux-Headless-Bereitstellungen ohne verwendbaren OS-Keyring lesen Sie den [Credential-Speicheroption](../reference/server.md#credential-storage-on-headless-linux). Es ändert die lokale Speicherung von berechtigten Geheimnissen; Es konfiguriert Remote.It nicht, koppelt einen Browser oder gewährt Fernzugriff.

## Pairing und Widerruf in v0.31.1 {/* #pairing-v0311 */}

Ausstehende Pairing-Anfragen erscheinen vor **Trusted browsers**, mit verbleibender Zeit und dringenden Abzeichen. den auf dem anfordernden Gerät angezeigten Code vor der Gewährung des Zugriffs zuordnen; Eine abgelaufene Anfrage muss erneut gestartet werden. Ein vertrauenswürdiger Browser kann sich selbst widerrufen: Erwarten Sie, dass sein geschützter Zugriff beendet und wieder gekoppelt wird, wenn der Zugriff später benötigt wird. **Off**, temporärer Zugang und Vertrauensentzug bleiben unterschiedliche Aktionen.
