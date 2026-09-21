---
title: "Netzwerk, Proxies und Paketspiegel"
last_update:
  date: '2026-09-20'
---

# Netzwerk, Proxies und Paketspiegel {/* #network-proxies-and-package-mirrors */}

Öffnen Sie **Settings → Network**, wenn ein Modell, eine Notebook-Anfrage oder ein Paketdownload sein Ziel nicht erreichen können. Diese Seite trennt den Verbindungsstatus, Notebook erlaubte Domains, einen Prozess-Proxy und Paketspiegel. Eine grüne Verbindungsüberprüfung beweist nicht, dass jede geschützte Notebook-Anfrage erfolgreich ist.

Beginnen Sie mit der fehlgeschlagenen Operation: Eine Provider-Anfrage, ein Notebook-Netzwerkzugang und ein Paketinstallateur können verschiedene Routen verwenden. Behalten Sie den Hostnamen und den genauen Fehler zur Verfügung, während Sie diese Einstellungen ändern.

## Lesen Sie zuerst den Netzwerkstatus {/* #read-network-status-first */}

Der Status kombiniert Netzwerk-Link-Informationen und eine Paket-Registry-Sonde. **READY · Paketregister sind erreichbar** zeigt an, dass die Sonde erfolgreich war. **Überprüfung**, unerreichbare oder Offline-Zustände zeigen an, dass eine weitere Überprüfung oder Verbindungsreparatur erforderlich ist. Verwenden Sie **Check again**, wenn verfügbar, nachdem Sie die Verbindung geändert haben.

Wenn Network **Ready** meldet, aber ein Tool ausfällt, erweitern Sie den Fehler dieses Tools. Die Statussonde überprüft ihren eigenen Zielort; Verwenden Sie den Hostnamen und die Nachricht der fehlgeschlagenen Anfrage, um die betroffene Route zu diagnostizieren.

| Fehlschlag | Inspizieren als nächstes | Vermeiden Sie diese falsche Schlussfolgerung |
| --- | --- | --- |
| Provider Login ist fehlgeschlagen | Provider-Authentifizierung und Modellverbindungsprüfung | Notebook-Domäneneinstellungen liefern Modellanmeldeinformationen |
| Ein Forschungshostname wird abgelehnt | **Configure domains** und den genauen Hostnamen in der Anfrage | Hinzufügen einer breiten nicht verwandten Domain wird es beheben |
| Ein Paket-Host ist bereits erlaubt, aber CONNECT schlägt fehl | Installer Log, Proxy und DNS-Auflösung | Ein anderer identischer Klick erlauben wird alle Netzwerkfehler beheben |
| Prüfung der Bescheinigung fehlschlägt | Das konfigurierte CA-Bundle und die Vertrauensanforderungen der Organisation | Deaktivierung der Zertifikatsüberprüfung ist erforderlich |
| Paketindex gibt keine übereinstimmende Verteilung nach Verbindungsfehlern zurück | Frühere Netzwerknachrichten und ausgewählte Python/Plattform | Das Paket darf nicht vorhanden sein |

## Notebook-Domänen konfigurieren {/* #configure-notebook-domains */}

1. Wählen Sie **Configure domains**.
2. Lesen Sie, ob der Notebook-Netzwerkschutz auf diesem Gerät aktiv ist.
3. Erweitern Sie die wissenschaftlichen Servicegruppen, um ihre Hostnamen zu überprüfen. Die Steuerung für Gruppenwechsel beinhaltete Ziele. Die Paket-Registrierungs-/Quellcode-Gruppe ist in diesem Build aktiviert und gesperrt.
4. Geben Sie für eine zusätzliche Quelle den genauen Hostnamen in **Domain hostname** ein und wählen Sie dann **Add** aus.
5. Überprüfen Sie den neuen Entwurf der Zeile. Verwenden Sie **&#91;Hostname&#93; entfernen**, um es rückgängig zu machen.
6. Wählen Sie **Save changes**, um die beabsichtigte Liste fortzusetzen.

![Exact-Hostname-Validierung lehnt eine Wildcard ab](/img/open-science/walkthrough-2026-09-08/54-network-domain-validation.webp)

Geben Sie einen Hostnamen wie `data.example.org` ein, ohne Schema, Pfad, Port, Platzhalter oder IP-Adresse. Entfernen Sie für **Enter a hostname only, without a scheme, path, port, or wildcard.** diese Teile und speichern Sie den Hostnamen.

Eine Domain, die mit Namen erlaubt ist, kann immer noch eine weitere Verbindungsüberprüfung fehlschlagen. `pypi.org` kann z. B. erlaubt, aber als nicht-öffentliches Ziel abgelehnt werden, wenn es in `198.18.*` aufgelöst wird. Dies unterscheidet sich von einer nicht genehmigten Domain.

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

### Wenn eine Domain in eine nicht öffentliche Adresse aufgelöst wird {/* #observed-fake-ip-failure */}

Wenn die Installation `destination resolves to a non-public network address` meldet, überprüfen Sie das detaillierte Installationsprotokoll, auch wenn der kurze Fehler nur `conda install failed` oder `pip install failed` sagt.

```text
deny network-outbound pypi.org:443
(destination resolves to a non-public network address)
```

1. Überprüfen Sie den betroffenen Hostnamen und seine aufgelöste Adresse. Adressen wie `198.18.*` sind keine öffentlichen Ziele.
2. Unterscheiden Sie eine Domainlistenentscheidung von der Zielüberprüfung. `alreadyAllowed` stellt nicht fest, dass die aufgelöste Adresse akzeptabel ist.
3. Überprüfen Sie die öffentliche DNS-Auflösung und die beabsichtigte Proxy-Route mit dem Netzwerkbesitzer und wiederholen Sie dann die ursprüngliche kleine Anforderung. Halten Sie den Domain-Schutz aktiviert.
4. Überprüfen Sie die Installation und den Import separat. Ein gespeicherter Proxy, Ready Interpreter oder eine erfolgreiche Nutzung vorhandener Pakete ist unzureichend.

Wenn der gleiche Fehler weiterhin besteht, behalten Sie den Hostnamen, die aufgelöste Adresse und den Proxy-Modus mit dem Installationsprotokoll bei und folgen Sie [Fehlerbehebung](troubleshooting.md). Ein erfolgreiches Settings Save ist kein erfolgreicher Download.


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

Konfigurierte Conda-, PyPI- und CRAN-Spiegel-Hostnamen erhalten temporären Zugriff für den Paketverwaltungsvorgang. Dies fügt sie nicht zur permanenten Notebook-Domainliste hinzu oder gewährt dem gewöhnlichen Notebook-Code den gleichen Zugriff. Weiterleitungen zu anderen Hosts folgen immer noch dem Netzwerkgenehmigungsfluss.

Verwenden Sie eine unterstützte HTTP(S)-Spiegel-URL ohne eingebettete Anmeldeinformationen, Whitespace, Localhost oder eine rohe IP-Adresse. Eine akzeptierte Spiegeleinstellung behebt keinen nicht verfügbaren Server oder einen Hostnamen, der auf eine reservierte Adresse aufgelöst wird. Wenn die Installation fehlschlägt, überprüfen Sie den tatsächlichen Zielort und den Fehler dieser Operation, bevor Sie erneut versuchen. Remote **model**-Endpunkte haben einen separaten [HTTPS Anforderung](providers.md#custom-gateway-every-visible-field).

## Informationen, die zu speichern sind, wenn eine Anfrage fehlschlägt {/* #information-to-keep-when-a-request-fails */}

Notieren Sie die App-Version, den Betrieb, die Laufzeit/Umgebung, den Paket- oder Hostnamen, den Proxy-Modus und den ersten nützlichen Fehler. Bewahren Sie die ursprüngliche Installationsausgabe auf: Die letzte "Keine passende Verteilung" -Zeile kann frühere Verbindungsfehler verbergen. Schließen Sie Token und Proxy-Anmeldeinformationen aus der gemeinsamen Diagnose aus.

Für ein fehlendes Python-Modul nach einer erfolgreichen Verbindung fahren Sie mit [Laufzeit- und Paketprüfungen](./runtimes.md) fort. Remote-Host-Setup wird separat in [Rechenressourcen](remote-compute.md) abgedeckt.

[Quelle für Netzwerkeinstellungen](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Notebook-Netzwerkgrenze](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/network-sandbox-owner.ts).

## HTTP Fehlersuche {/* #http-error-lookup */}

Verwenden Sie für 400, 401, 403, 404, 429 oder 5xx Antworten den [HTTP Fehlerbehebungstabelle](troubleshooting.md#http-errors-400-403-429-and-5xx). Behalten Sie den antwortenden Dienst und seine detaillierte Nachricht mit dem Statuscode.

Nachdem Sie die Proxy-, Mirror- oder Notebook-Domäneneinstellungen geändert haben, bestätigen Sie, dass die Werte beibehalten wurden, und wiederholen Sie dann die ursprüngliche Operation in derselben Laufzeit. Überprüfen Sie sowohl den Download als auch den Paketimport; a erfolgreiche Einstellungen speichern allein löst keinen Installationsfehler.

## Eine R-Zelle wurde vor der Ausführung blockiert {/* #r-network-warning */}

In v0.31.1 zeigt Notebook eine Inline-Warnung an, wenn der Netzwerkschutz einen R-Lauf blockiert. Folgen Sie dem Einstellungslink und prüfen Sie den angeforderten Zugriff. Die Warnung bedeutet, dass die Zelle nicht ausgeführt wurde; Es handelt sich nicht um ein wissenschaftliches Ergebnis oder einen abgeschlossenen Lauf. Nachdem Sie die spezifische Anforderung gelöst haben, führen Sie die Zelle erneut aus und überprüfen Sie ihre Ausgabe. Windows Standardmodus R Unterstützung ermöglicht nicht selbst Netzwerkschutz.
