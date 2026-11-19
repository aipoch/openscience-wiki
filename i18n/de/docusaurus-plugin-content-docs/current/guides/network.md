---
title: "Netzwerk, Proxies und Paketspiegel"
last_update:
  date: '2026-11-19'
---

# Netzwerk, Proxies und Paketspiegel {/* #network-proxies-and-package-mirrors */}

Öffnen Sie **Settings → Network**, wenn ein Modell, eine Notebook-Anfrage oder ein Paketdownload sein Ziel nicht erreichen können. Diese Seite trennt den Verbindungsstatus, Notebook erlaubte Domains, einen Prozess-Proxy und Paketspiegel. Eine grüne Verbindungsüberprüfung beweist nicht, dass jede geschützte Notebook-Anfrage erfolgreich ist.

Beginnen Sie mit der fehlgeschlagenen Operation: Eine Provider-Anfrage, ein Notebook-Netzwerkzugang und ein Paketinstallateur können verschiedene Routen verwenden. Behalten Sie den Hostnamen und den genauen Fehler zur Verfügung, während Sie diese Einstellungen ändern.

## Lesen Sie zuerst den Netzwerkstatus {/* #read-network-status-first */}

Der Status kombiniert Netzwerk-Link-Informationen und eine Paket-Registry-Sonde. **READY · Paketregister sind erreichbar** zeigt an, dass die Sonde erfolgreich war. **Überprüfung**, unerreichbare oder Offline-Zustände zeigen an, dass eine weitere Überprüfung oder Verbindungsreparatur erforderlich ist. Verwenden Sie **Check again**, wenn verfügbar, nachdem Sie die Verbindung geändert haben.

Wenn Network **Ready** meldet, aber ein Tool ausfällt, erweitern Sie den Fehler dieses Tools. Die Statussonde überprüft ihren eigenen Zielort; Verwenden Sie den Hostnamen und die Nachricht der fehlgeschlagenen Anfrage, um die betroffene Route zu diagnostizieren.

| Fehlschlag | Nächster Blick ins Auge | Vermeiden Sie diese falsche Schlussfolgerung |
| --- | --- | --- |
| Provider-Login fehlschlägt | Provider-Authentifizierung und Modellverbindungsprüfung | Notebook-Domäneneinstellungen liefern Modellanmeldeinformationen |
| Ein Forschungshostname wird abgelehnt | **Manage access** und den genauen Hostnamen in der Anfrage | Hinzufügen einer breiten nicht verwandten Domain wird es beheben |
| Ein Paket-Host ist bereits erlaubt, aber CONNECT schlägt fehl | Installer Log, Proxy und DNS-Auflösung | Ein anderer identischer Klick erlauben wird alle Netzwerkfehler beheben |
| Prüfung der Bescheinigung fehlschlägt | Das konfigurierte CA-Bundle und die Vertrauensanforderungen der Organisation | Deaktivierung der Zertifikatsüberprüfung ist erforderlich |
| Paketindex gibt keine übereinstimmende Verteilung nach Verbindungsfehlern zurück | Frühere Netzwerknachrichten und ausgewählte Python/Plattform | Das Paket darf nicht vorhanden sein |

<span id="configure-notebook-domains" />

## Wählen Sie entspanntes oder striktes Netzwerk {/* #public-network-rules */}

Öffnen Sie **Settings → Network → Manage access**. Der Modus gilt für geschützte Notebook-Verbindungen über Projekte hinweg. Lesen Sie **Current: Relaxed** oder **Current: Strict**, bevor Sie Regeln bearbeiten.

| Modus | Erlaubte Verbindungen | Wenn ein Ziel nicht erlaubt ist |
| --- | --- | --- |
| **Relaxed** (Standard) | HTTPS-Hostnamen, einschließlich Hostnamen für private oder Loopback-Dienste; gespeicherte Ausnahmen passen zu Protokoll, Host/IP und Port | HTTP und direkte IP-Verbindungen erfordern eine Autorisierung |
| **Strict** | Nur Destinationen, die mit der manuellen Whitelist nach Protokoll, Hostname oder IP und Port übereinstimmen | Blockiert ohne Autorisierungsanfrage; manuelles Hinzufügen einer benötigten Regel |

Um die Modi zu ändern, wählen Sie **Strict** oder **Relaxed**, lesen Sie die Erklärung und verwenden Sie dann **Switch to Strict mode** oder **Switch to Relaxed mode**. Durch die Auswahl einer Option mit der Kennzeichnung **Not yet applied** wird der aktive Modus nicht geändert.

![Strenge Modus Erklärung und Whitelist-Gruppen](/img/open-science/v130/network-strict.webp)

### Hinzufügen einer strikten Whitelist-Regel {/* #strict-whitelist */}

1. Wählen Sie in **Strict whitelist** **Add rule**.
2. Setzen Sie **Network protocol**, **Hostname, IP or pattern** und **Port** für den eigentlichen Dienst. Verwenden Sie einen Hostnamen oder eine IP, keinen URL-Pfad.
3. Wählen Sie einen **Group** oder **New group…** und einen **Group name** und dann **Confirm**.
4. Überprüfen Sie die gespeicherte Regel und den aktiven Modus. Wiederholen Sie die beabsichtigte kleine Anfrage und prüfen Sie die Antwort.

![Beispiel für Protokoll-, Host- und Portfelder für eine strenge Regel](/img/open-science/v130/network-rule.webp)

Ein genauer Hostname enthält keine Subdomains. `*.example.org` passt zu Subdomains, aber nicht zu `example.org`. Protokoll und Port sind Teil der Regel: Eine HTTPS-Regel für Port 443 gewährt weder HTTP noch einen anderen Port. Strict stimmt mit dem angeforderten hostnamen überein; es überprüft nicht, ob sein dns-ergebnis öffentlich, privat oder loopback ist. Fügen Sie eine Regel nur für ein Ziel hinzu, an das Sie den Code kontaktieren möchten.

**Built-in** und **Manual** identifizieren die Regelprovenienz. Eingebaute Gruppen werden einmal ausgesät, so dass spätere Änderungen beibehalten werden. Weder erinnerte sich an Genehmigungen noch Full Access Bypass Strict Modus. Das Speichern von Netzwerkregeln setzt geschützte Verbindungen zurück und kann Übertragungen unterbrechen; Änderungen nach Abschluss aktiver Übertragungen anwenden.

## Speichern Sie eine Relaxed-Mode-Ausnahme {/* #trusted-private-services */}

Wählen Sie unter **Trusted unsafe networks** **Add address**, geben Sie dann **Network protocol**, **Hostname** oder IP, **Port** und die entsprechende Gruppe an. Bestätigen und überprüfen Sie den gespeicherten Bereich, bevor Sie erneut versuchen. Diese Ausnahmen vermeiden eine wiederholte Autorisierung für das übereinstimmende Ziel im entspannten Modus; sie gewähren keinen Zugriff im strikten Modus. Die strikte Whitelist ist inaktiv, während Relaxed ausgewählt ist.

Die Regel erlaubt eine Verbindung, nicht eine erfolgreiche Anmeldung oder eine gültige Antwort. Überprüfen Sie die Service-Anmeldeinformationen und das tatsächliche Ergebnis separat. Diese Einstellungen ersetzen die älteren Public-Domain / Private-Service-Formulare; Verwenden Sie die aktuellen Modus- und Regelfelder, wenn Sie einem älteren Screenshot folgen.

## Wählen Sie einen Proxy-Modus {/* #choose-a-proxy-mode */}

Wählen Sie **Configure proxy**. Verwenden Sie eine Proxy-Adresse, die von Ihrer eigenen Netzwerkkonfiguration bereitgestellt wird; Der Port in einem Screenshot ist spezifisch für diesen Computer.

| Modus | Verhalten | Erforderlicher Input |
| --- | --- | --- |
| **System** | App-Anfragen folgen dem Geräte-Proxy; Agentenprozesse erben Proxy-Umgebung vom App-Startup | Kein explizites Serverfeld |
| **Manual** | Geben Sie neue App-Anfragen und verarbeitet einen festen Proxy | **Proxy server** URL |
| **Direct** | Verbinden Sie sich ohne den konfigurierten / geerbten Proxy für neue Prozesse | Kein Serverfeld |

Der manuelle Modus akzeptiert die URLs HTTP, HTTPS, SOCKS, SOCKS4 und SOCKS5. Eingebettete Anmeldeinformationen in der URL werden nicht unterstützt. **Bypass rules** ist eine optionale komma-getrennte Liste von Hosts, die direkt verbunden werden sollen; localhost wird immer umgangen.

1. Wählen Sie **Manual**.
2. Füllen Sie **Proxy server** mit der Arbeits-Proxy-Adresse aus, die von Ihrem Netzwerk verwendet wird.
3. Fügen Sie Bypass-Regeln nur hinzu, wenn die relevanten Ziele direkt verbunden werden sollen.
4. Wählen Sie **Save** und warten Sie auf **Proxy settings saved.**
5. Starten Sie eine neue Anforderung / einen neuen Prozess und testen Sie die ursprüngliche fehlgeschlagene Operation. Bestehende Agentensitzungen, Kernel und Installateure können ihre bestehenden Verbindungen beibehalten.

Wenn der manuelle Modus **Geben Sie eine Proxy Server URL ein** meldet, geben Sie eine Arbeits-Proxy-Adresse ein oder verwerfen Sie den Entwurf mit **Done**. Das Speichern einer gültigen Adresse bestätigt nicht selbst, dass der Proxy die fehlgeschlagene Anforderung tragen kann.

### Überprüfen Sie einen DNS- oder Proxyfehler {/* #observed-fake-ip-failure */}

Behalten Sie den genauen Fehler von der fehlgeschlagenen Anforderung. Ein Timeout, ein Zertifikatsfehler oder eine Proxy-Verweigerung kann immer noch auftreten, nachdem eine Regel das Ziel zulässt. Überprüfen Sie den Hostnamen, das Protokoll, den Port und die Proxy-Route mit dem Dienst, den Sie verwenden möchten. Behandeln Sie den Nicht-Public-Address-Fehler einer älteren Version nicht als die aktuelle Strict-Mode-Matching-Regel: Strict überprüft den gewünschten Namen/IP und Port, nicht die DNS-Adressklasse.

Wiederholen Sie eine kleine Anfrage, nachdem Sie die Ursache behoben haben. Bestätigen Sie bei Paketarbeiten sowohl die Installation als auch den Import; eine gespeicherte Einstellung oder ein Ready-Interpreter allein beweist nicht, dass ein Download erfolgreich war. Halten Sie Anmeldeinformationen aus freigegebenen Protokollen fern und verwenden Sie [Fehlerbehebung](troubleshooting.md) für anhaltende Fehler.


## Konfigurieren von Paketspiegeln und Zertifikatsvertrauen {/* #configure-package-mirrors-and-certificate-trust */}

Wählen Sie **Configure** oder **Edit** unter Paketspiegel.

| Feld | Input und Wirkung |
| --- | --- |
| **Conda channel mirror** | Mirror Root für Conda Channel Downloads verwendet |
| **Python package index (pip)** | Eine Python-Paketindex-URL, die typischerweise in `/simple` |
| **CA bundle path** | Pfad zu einem vollständigen PEM-Trust-Bundle mit den erforderlichen öffentlichen und Unternehmenswurzeln; Blanko nutzt öffentliche Zertifizierungsstellen |
| **View available mirrors** | Offene Außenspiegeldokumentation |
| **Save** | Speichern der Konfiguration für nachfolgende Paketoperationen |
| **Cancel** | Verwerfen Sie den Entwurf |

![Eingänge für Paketspiegel und CA-Bundle](/img/open-science/walkthrough-2026-09-08/56-package-mirror.webp)

Ein Paketspiegel ändert die Paketquelle. Bestätigen Sie das erforderliche Root/Index-Format des Spiegels, speichern und wiederholen Sie eine kleine Paketoperation in der ausgewählten Laufzeit. Die Proxy-Einstellungen von Model-Provider sind getrennt.

Konfigurierte Conda-, PyPI- und CRAN-Spiegel-Hostnamen erhalten temporären Zugriff für die Paketverwaltung. Dies fügt sie nicht zur permanenten Notebook-Domänenliste hinzu oder gewährt dem gewöhnlichen Notebook-Code denselben Zugriff. Umleitungen benötigen Zugang zu ihren tatsächlichen Zielen. Fügen Sie im strikten Modus jedes erforderliche Protokoll / Host / Port zur Whitelist hinzu; ein temporäres Paketoperations-Grant umgeht es nicht.

Verwenden Sie eine unterstützte HTTP(S)-Spiegel-URL ohne eingebettete Anmeldeinformationen, Whitespace, Localhost oder eine rohe IP-Adresse. Eine akzeptierte Spiegeleinstellung behebt keinen nicht verfügbaren Server oder einen Hostnamen, der auf eine reservierte Adresse aufgelöst wird. Wenn die Installation fehlschlägt, überprüfen Sie den tatsächlichen Zielort und den Fehler dieser Operation, bevor Sie erneut versuchen. Remote **model**-Endpunkte haben einen separaten [HTTPS Anforderung](providers.md#custom-gateway-every-visible-field).

## Informationen, die zu speichern sind, wenn eine Anfrage fehlschlägt {/* #information-to-keep-when-a-request-fails */}

Notieren Sie die App-Version, den Betrieb, die Laufzeit/Umgebung, den Paket- oder Hostnamen, den Proxy-Modus und den ersten nützlichen Fehler. Bewahren Sie die ursprüngliche Installationsausgabe auf: Die letzte "Keine passende Verteilung" -Zeile kann frühere Verbindungsfehler verbergen. Schließen Sie Token und Proxy-Anmeldeinformationen aus der gemeinsamen Diagnose aus.

Für ein fehlendes Python-Modul nach einer erfolgreichen Verbindung fahren Sie mit [Laufzeit- und Paketprüfungen](./runtimes.md) fort. Remote-Host-Setup wird separat in [Rechenressourcen](remote-compute.md) abgedeckt.

[Quelle für Netzwerkeinstellungen](https://github.com/aipoch/open-science/blob/v1.3.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Notebook-Netzwerkgrenze](https://github.com/aipoch/open-science/blob/v1.3.0/src/main/notebook/network-sandbox-owner.ts).

## HTTP Fehlersuche {/* #http-error-lookup */}

Verwenden Sie für 400, 401, 403, 404, 429 oder 5xx Antworten den [HTTP Fehlerbehebungstabelle](troubleshooting.md#http-errors-400-403-429-and-5xx). Behalten Sie den antwortenden Dienst und seine detaillierte Nachricht mit dem Statuscode.

Nachdem Sie die Proxy-, Mirror- oder Notebook-Domäneneinstellungen geändert haben, bestätigen Sie, dass die Werte beibehalten wurden, und wiederholen Sie dann die ursprüngliche Operation in derselben Laufzeit. Überprüfen Sie sowohl den Download als auch den Paketimport; a erfolgreiche Einstellungen speichern allein löst keinen Installationsfehler.

## Eine R-Zelle wurde vor der Ausführung blockiert {/* #r-network-warning */}

In v0.31.1 zeigt Notebook eine Inline-Warnung an, wenn der Netzwerkschutz einen R-Lauf blockiert. Folgen Sie dem Einstellungslink und prüfen Sie den angeforderten Zugriff. Die Warnung bedeutet, dass die Zelle nicht ausgeführt wurde; Es handelt sich nicht um ein wissenschaftliches Ergebnis oder einen abgeschlossenen Lauf. Nachdem Sie die spezifische Anforderung gelöst haben, führen Sie die Zelle erneut aus und überprüfen Sie ihre Ausgabe. Windows Standardmodus R Unterstützung ermöglicht nicht selbst Netzwerkschutz.

## Netzwerkzugriff, wenn sich der Genehmigungsmodus ändert {/* #network-mode-changes */}

**Full access** entfernt anwendbare manuelle Agentenberechtigungskarten, umgeht jedoch nicht die Strict Notebook Whitelist. Überprüfen Sie **Settings → Network → Manage access**, wenn eine Anfrage abgelehnt wird. Im entspannten Modus bestimmen Protokoll und Ziel, ob eine Autorisierung oder eine gespeicherte Ausnahme erforderlich ist. Anmeldeinformationen und Servicebeschränkungen des Anbieters gelten weiterhin.

Ändern von Netzwerkregeln können bestehende geschützte Verbindungen schließen. Versuchen Sie es erneut unter dem resultierenden Modus und überprüfen Sie dann die tatsächliche Antwort. Siehe [Genehmigungsarten](approval-modes.md) für Konversationsberechtigungen.
