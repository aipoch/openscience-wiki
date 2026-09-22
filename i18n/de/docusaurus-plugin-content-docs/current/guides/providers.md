---
title: "Anbieter und lokales Modell-Setup"
last_update:
  date: '2026-09-22'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Anbieter und lokales Modell-Setup {/* #provider-and-local-model-setup */}

## Wählen Sie eine Zugangsmethode {/* #choose-an-access-method */}

![Codex-Abonnementverbindung im englischen Erstaufbau](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

`Provider type` wählt den Abonnementzugriff, einen offiziellen API oder `Custom Gateway` aus. Verfügbare Abonnement-Optionen hängen vom Active Agent Framework ab. Das erfasste Codex-Setup zeigt `Codex subscription`, xAI OAuth, offizielle APIs und Custom Gateway; Gehen Sie nicht davon aus, dass ein anderer Rahmen die gleichen Optionen bietet.

| Wahlmöglichkeit | Was Sie brauchen | Prüfung vor Fortführung |
| --- | --- | --- |
| Codex-Abonnement | Eine kompatible Codex-Anmeldung | Inspektion der `Codex authentication` Auswahl; Importieren bestehender Zugriffskopien Authentifizierung in Open-Science |
| Offizielle API | Zugang zu diesem Anbieter und dem angeforderten Modell | Bestätigen Sie den Anbieter, die Region, falls zutreffend, und die API-Anmeldeinformationen |
| Benutzerdefiniertes Gateway | Ein kompatibler Endpunkt, genaue Modell-ID und bei Bedarf ein API-Schlüssel | Bestätigen Sie das API-Format und die unterstützten Modellfunktionen mit dem Gateway-Operator |

Wählen Sie **Import existing Codex sign-in**, um eine funktionierende lokale Anmeldung in Open-Science zu kopieren. Der Import kann eine kompatible nicht geheime Loopback-Route umfassen; andere globale Konfiguration, Skills und Sitzungen bleiben getrennt. Behalten Sie unter **Advanced settings → Transport** **Auto (recommended)** bei, es sei denn, Ihre Verbindung erfordert einen anderen Transport.

## Wählen Sie eine Provider-Region oder ein kostenloses Katalogmodell {/* #provider-regions */}

Wählen Sie für **SenseNova** **China** oder **Global** im Anbieterformular, bevor Sie ein Modell auswählen. Verwenden Sie den API-Schlüssel für diese Region, überprüfen Sie die resultierende Modellliste, wählen Sie **Save** aus und warten Sie auf die Verbindungsvalidierung, bevor die Änderung festgelegt wird. Das Wechseln von Regionen kann sowohl das Endpunkt- als auch das verfügbare Modell ändern; ein Schlüssel- oder Modellname aus der anderen Region funktioniert möglicherweise nicht.

Für Gateways wie **OpenRouter** oder **OpenCode Zen** wählen Sie ein kostenloses Modell nur dann aus, wenn genau dieser Eintrag für das aktive Framework angeboten wird. Verwenden sie das konto und die für den dienst erforderlichen anmeldeinformationen. Ein kostenloser Katalogeintrag beseitigt keine Nutzungsbeschränkungen oder stellt Unterstützung für jedes Tool oder jede Bildeingabe her. Füge `:free` nicht an eine beliebige Modell-ID an. Senden sie eine kleine anfrage und überprüfen sie das zurückgegebene modell und ergebnis, bevor sie die verbindung für die forschung verwenden.

## Verbinden Sie ein bestehendes Codex-Abonnement {/* #connect-an-existing-codex-subscription-verified-procedure */}

1. Öffnen Sie **Settings → Model → Add provider**.
2. Setzen Sie **Provider type** auf **Codex subscription**.
3. Wählen Sie in **Codex authentication** **Import existing Codex sign-in**. Dies erfordert eine verwendbare Anmeldung auf diesem Computer. Es kopiert die Authentifizierung in das Anwendungsprofil; Es importiert nicht Ihre anderen Codex-Sitzungen oder Skills.
4. Wählen Sie **Save**. Warten Sie, während die Anbieterzeile **Testing…** anzeigt; Eine gespeicherte Zeile allein ist nicht der Erfolgscheck.
5. Bestätigen Sie **Connection verified** und **Authentifizierung importiert in Open-Science** in der Anbieterzeile. Die freigegebene Schnittstelle kann den Produktnamen ohne Bindestrich anzeigen.
6. Wählen Sie in **Main model** ein verfügbares Abonnementmodell aus. Wählen Sie beispielsweise einen verfügbaren **gpt-5.6-sol**-Eintrag aus, wenn Ihr Konto ihn anbietet. Überprüfen Sie den Modellnamen und den Anbieter zusammen, insbesondere wenn mehrere Anbieter ähnlich benannte Modelle anbieten.
7. Öffnen Sie ein Projekt und senden Sie eine begrenzte Anfrage. Ein Verbindungstest überprüft die Authentifizierung, während eine tatsächliche Antwort den Anforderungspfad überprüft. Bestätigen Sie die Antwort und jede Tool-Permission-Anfrage erscheint in dieser Sitzung.

![Codex-Abonnement verifiziert und Hauptmodell ausgewählt](/img/open-science/walkthrough-2026-09-08/70-codex-subscription-connected.webp)

| Anbieterleitungskontrolle | Verwenden Sie es, wenn | Erfolgskontrolle |
| --- | --- | --- |
| **Check Codex login** | Möglicherweise ist die gespeicherte Verbindung abgelaufen. | Die ausstehende Überprüfung wird in den angezeigten verifizierten oder fehlgeschlagenen Zustand überführt. |
| **Re-import Codex login** | Sie haben die externe Anmeldung aktualisiert und möchten die Anwendungskopie aktualisieren. | Die Authentifizierung wird importiert und erneut überprüft. |
| **Edit** | Sie müssen die Authentifizierungs- oder Transporteinstellungen überprüfen. | Wählen Sie Speichern und warten Sie auf eine erfolgreiche Validierung, bevor die Bearbeitung vorgenommen wird. |
| **Delete** | Ein ungenutzter Anbieter sollte entfernt werden. | Die Verfügbarkeit hängt davon ab, ob der Anbieter noch benötigt wird; Eine aktive Abhängigkeit kann eine Löschung verhindern. |

Wenn Import meldet, dass ein dateigestütztes Codex-Login fehlt, melden Sie sich über den unterstützten Codex-Flow an und wiederholen Sie **Re-import Codex login**. Ein Login, das nur in einem externen Anmeldedatenspeicher gespeichert wird, ist nicht unbedingt eine importierbare Datei.

Interpretieren Sie **Testing…** nicht als Fehler oder **Connection verified** als Beweis dafür, dass jedes aufgelistete Modell und Tool ausgeführt werden kann. Wenn der Import fehlschlägt, füllen Sie den unterstützten Codex-Anmeldefluss aus und wiederholen Sie ihn erneut; Fügen Sie die Authentifizierung JSON nicht in eine Aufforderung oder Dokumentation ein.


Die Agent Runtime führt die Arbeit aus; Der Modellanbieter liefert das Modell. Die Installation von Codex verbindet nicht automatisch einen Anbieter. Beim erstmaligen Setup folgt diese Seite der Agent Runtime. Öffnen Sie nach der Einrichtung **Settings → Model**, um den Providerzugriff zu verwalten.

## Aktualisieren oder Entfernen eines API-Anmelders {/* #update-or-remove-an-api-credential */}

Nachdem Sie einen Schlüssel am Dienst geändert haben, suchen Sie den Anbieter in **Settings → Model**, wählen Sie **Edit**, geben Sie den Ersatz in **API key** ein und wählen Sie **Save** aus. Wenn Sie dieses Feld leer lassen, bleibt der vorhandene Schlüssel erhalten; Sie klärt es nicht. Die Verbindung wird getestet, bevor der Edit festgelegt wird. Wenn die Authentifizierung fehlschlägt, überprüfen Sie den Endpunkt, das Konto, zu dem der Schlüssel gehört, und seine Gültigkeit, bevor Sie es erneut versuchen.

Nach **Connection verified**, füllen Sie eine kleine Anfrage mit diesem Anbieter. Entfernen Sie einen nicht verwendeten Anbieter mit **Delete** und überprüfen Sie seinen Namen in der Bestätigung. Durch das Entfernen der Anwendungskonfiguration wird der Schlüssel im Dienst nicht widerrufen.

## Custom Gateway: jedes sichtbare Feld {/* #custom-gateway-every-visible-field */}

![Erforderliche Feldfehler im benutzerdefinierten Gateway-Formular](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

Beginnen Sie mit der Auswahl von `Custom Gateway`. Durch Ändern des Anbietertyps kann der Anzeigename aus der vorherigen Auswahl beibehalten werden, also überprüfen Sie den Namen, anstatt anzunehmen, dass er zurückgesetzt wurde.

| Feld oder Steuerung | Input und Verhalten |
| --- | --- |
| `Provider type` | Wählen Sie die Anbieterfamilie aus und ändern Sie die sichtbare Form |
| `Name` / `Provider name` | Optionaler Anzeigename wie z.B. `Lab gateway`; keine Modellkennung |
| `Base URL` | Erforderliche Gateway-Basisadresse. Remote-Modell-Endpunkte erfordern HTTPS; HTTP ist für Localhost- und Loopback-Adressen erlaubt. Verwenden sie die tatsächliche adresse ihres betreibers, nicht die nicht funktionierende. `https://gateway.example` Platzhalter. |
| `API format` | Wählen Sie Chat-Komplettionen, Nachrichten oder Antworten aus; die angezeigte Route hilft, das entsprechende Protokoll zu identifizieren |
| `API key` | Erforderlich für Remote-Gateways; optional für ein lokales Loopback-Gateway, das keine Authentifizierung benötigt. Geben Sie einen echten Anmeldenachweis ein, wenn Ihr lokaler Server einen benötigt |
| Auge/ `Show API key` | die Sichtbarkeit der aktuellen Schlüsseleingabe umschaltet; Halten Sie es verborgen, bevor Sie den Bildschirm erfassen oder teilen |
| `Model` | Erforderliche genaue Modellkennung, die vom Endpunkt akzeptiert wird; Screenshots `demo-model` ist nur ein Platzhalter |
| `Context window` | optionale Kontextgrenze des Modells; Blank fordert den Provider Default |
| Kontextvorgaben | `32K`, `64K`, `128K`, `200K`, `256K`, `1M`; Auswahl `128K` Füllungen `128000` |
| `Advanced settings` | Erweitert oder zusammenbricht Fähigkeit und Token-Limit-Felder |
| `More information` (`i`) | Öffnet kontextuelle Hilfe neben dem zugehörigen Label |
| `Back` | Rückkehr zur Agent Runtime; Der Assistent besitzt den Formularentwurf, damit er überleben kann, zurück zu navigieren |
| `Test & continue` | Validiert erforderliche Felder und testet dann den Anbieter, bevor er gültige Einstellungen festlegt; Vorauszahlungen nach erfolgreicher anwendbarer Validierung |

Die drei API-Formate, die im Menü angezeigt werden, sind:

- **Chat-Ergänzungen** — `/v1/chat/completions`.
- **Messages** — `/v1/messages`.
- **Antworten** — `/v1/responses`.

Dies sind Protokollauswahlen, keine Anweisungen zum Anfügen jeder aufgelisteten Route an die Basis-URL. Ein Gateway kann ein Format unterstützen, ohne die anderen zu unterstützen.

<ToolOperationGroup>
<summary>Fortgeschrittene Felder und bedingte Kontrollen</summary>

Eine ältere Remote-HTTP-Konfiguration bleibt editierbar, kann aber keine Anfragen senden. Erhalten Sie einen HTTPS-Endpunkt vom Dienstbetreiber, speichern Sie ihn und testen Sie ihn erneut. Ein lokaler Loopback-Modellserver kann seine HTTP-Adresse behalten; Ein Remote-LAN-Server benötigt immer noch HTTPS.

### Fortgeschrittene Felder und bedingte Kontrollen {/* #advanced-fields-and-conditional-controls */}

| Feld oder Steuerung | Wie man es einstellt |
| --- | --- |
| `Image input` | Nur aktivieren, wenn sowohl Gateway als auch ausgewähltes Modell Bildinhalte akzeptieren |
| `Thinking mode` | Aktivieren Sie nur, wenn das Gateway / Modell Denk- oder Aufwandskontrollen akzeptiert |
| `Supported effort levels` | Erscheint mit dem Denken aktiviert; Wählen Sie die tatsächlich unterstützten Ebenen aus, anstatt sie aus einem Modellnamen abzuleiten |
| `Reasoning request format` | Erscheint für Chat-Ergänzungen mit aktiviertem Denken; Wählen Sie aus, wie das Gateway Aufwandsparameter erwartet |
| `Maximum input tokens` | Fakultativer separater Input-Grenzwert; blank verwendet den Provider Default. Voreinstellungen: 32K, 64K, 128K, 200K, 256K, 1M |
| `Maximum output tokens` | Fakultative getrennte Output-Grenze. Voreinstellungen: 4K, 8K, 16K, 32K, 64K, 128K |

Aktivieren Sie **Thinking mode**, um unterstützte Aufwandsstufen zu konfigurieren. Wählen Sie für **Chat-Ergänzungen** auch das von Ihrem Endpunkt unterstützte Format für die Begründungsanforderung aus. Diese Deklarationen müssen den API-Fähigkeiten des Anbieters entsprechen.


</ToolOperationGroup>

### Testen Sie die Gateway-Konfiguration {/* #reproduce-the-form-walkthrough */}

1. Wählen Sie Custom Gateway und erweitern Sie die erweiterten Einstellungen.
2. Geben Sie die Basis-URL und die genaue Modell-ID ein, die vom Gateway-Betreiber bereitgestellt wird, sowie bei Bedarf einen API-Schlüssel. Fehlende erforderliche Felder erzeugen Inline-Fehler und halten Sie auf dieser Seite.
3. Geben Sie einen erkennbaren Anzeigenamen ein. Geben Sie für eine echte Verbindung den tatsächlichen Endpunkt und das von Ihrem Provider bereitgestellte Modell ein; Demonstrationsplatzhalter können einen Anschlusstest nicht bestehen.
4. Wählen Sie eine Kontextvoreinstellung und bestätigen Sie den numerischen Wert.
5. Aktivieren Sie den Denkmodus nur, wenn er unterstützt wird, und prüfen Sie dann die neu sichtbaren Aufwandsfelder. Das Ändern des API-Formats kann die verfügbaren Felder ändern.
6. Wenn ein Schlüssel erforderlich ist, geben Sie ihn privat ein und halten Sie ihn verborgen. Wählen Sie `Test & continue` aus, wenn Sie für eine Provider-Anfrage bereit sind.
7. Warten Sie auf das Ergebnis. `Testing connection…` zeigt anstehende Validierung an; Wiederholte Klicks sind deaktiviert. Subskriptionsflüsse verwenden stattdessen `Sign in & continue`, `Waiting for sign-in…` und `Cancel sign-in`, wo zutreffend.

## Verbinden eines lokalen Modell-Endpunkts {/* #connect-a-local-model-endpoint */}

<p className="example-label"><strong>Beispiel</strong> Verbinden Sie ein lokales Qwen-Modell über Ollama</p>

Ein lokaler Modellserver läuft separat von Open-Science. Wählen Sie **Custom Gateway** für einen kompatiblen Endpunkt und verwenden Sie einen Agent, der das API-Format unterstützt. Das folgende Beispiel verwendet Ollama mit OpenCode. Durch die Installation eines Python Notebook-Interpreters wird kein Modellserver installiert.

### Starten Sie den Server und laden Sie das Modell {/* #start-the-server-and-download-the-model */}

Installieren Sie [Ollama](https://ollama.com/download) und starten Sie dann einen lokalen Testserver in einem Terminal:

```sh
OLLAMA_HOST=127.0.0.1:11435 OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

Halten Sie das Terminal offen. Laden Sie das Modell in einem anderen Terminal auf diesen Server herunter:

```sh
OLLAMA_HOST=127.0.0.1:11435 ollama pull qwen3:0.6b
```

Warten Sie, bis der Download abgeschlossen ist. Wenn der Server läuft, aber das angeforderte Modell nicht vorhanden ist, kann Open-Science **Test failed: the configured model was not found.** melden Abschluss des Downloads, bestätigen Sie die genaue Modell-ID und wählen Sie erneut **Test connection** aus.

### Geben Sie die Anbietereinstellungen ein {/* #enter-the-provider-settings */}

Öffnen Sie **Settings → Model → Add provider** und geben Sie ein:

| Feld | Dieses lokale Verbindungsbeispiel |
| --- | --- |
| Anbietertyp | Benutzerdefiniertes Gateway |
| Name | Lokale Qwen Demo |
| Basis-URL | `http://127.0.0.1:11435` |
| API-Format | Chat-Erledigungen ()`/v1/chat/completions`) |
| API-Schlüssel | Lassen Sie diesen nicht authentifizierten Loopback-Endpunkt leer; Verwenden Sie den eigentlichen Berechtigungsnachweis für ein authentifiziertes Gateway |
| Modell | `qwen3:0.6b` |
| Kontextfenster | `32768`, passend zum laufenden Server |
| Erweiterte Einstellungen → Maximale Output-Token | `4096` |
| Bildeingabe / Denkmodus | Aus für diese Verbindung Check |

![Lokale Modelladresse, API-Format und genaue Modell-ID](/img/open-science/non-workflow-completion/08-local-provider-form.webp)

Das Formular fügt `/v1` an die Gateway-Root an. Open-Science akzeptiert einen leeren API-Schlüssel für Loopback-Adressen wie `localhost`, `127.0.0.1` und `[::1]`; Der ältere Screenshot kann einen Platzhalter zeigen. Ein Remote- oder LAN-Gateway benötigt weiterhin HTTPS und einen API-Schlüssel. Verwenden Sie das API-Format, das Ihr lokaler Server unterstützt.

Legen Sie ein Output-Budget fest, das Raum für Input- und Konversationshistorie lässt. OpenCode reserviert ein Ausgabebudget, wenn dieses Feld leer ist; Eine große Reserve kann eine wiederholte Verdichtung in einem kleinen Kontextfenster verursachen. Das deklarierte Kontextfenster muss auch mit der Zuweisung des Modellservers übereinstimmen. Das Ändern des Formulars allein ändert nicht die Laufzeitkonfiguration von Ollama.

### Wählen Sie einen kompatiblen Agenten aus und überprüfen Sie eine Antwort {/* #select-a-compatible-agent-and-check-a-reply */}

Installieren Sie in **Settings → Agent** **OpenCode → App-managed download**, wenn es fehlt, wählen Sie dann seine Karte aus und bestätigen Sie **Switch**. Kehren Sie zu **Model** zurück und wählen Sie das lokale Modell aus. Starten Sie eine neue Konversation mit einer kurzen Verbindungsanforderung, bevor Sie sie für die Forschung verwenden. Überprüfen Sie, ob die Anfrage tatsächlich abgeschlossen ist; Ein gesicherter Anbieter oder ein erfolgreicher Verbindungstest allein führt nicht zu zuverlässigen wissenschaftlichen Überlegungen, Werkzeugnutzung oder Bildunterstützung.

Die Verbindungsüberprüfung wurde mit **Lokales Modell verbunden.** mit dem konfigurierten lokalen Endpunkt und OpenCode abgeschlossen. Es überprüft eine Textanfrage, keine biomedizinische Analyse.

![Prüfung der lokalen Modellverbindung abgeschlossen](/img/open-science/non-workflow-completion/09-local-model-reply.webp)

Halten Sie den Server am Laufen, während Sie das Modell verwenden. Für einen Agenten auf einem anderen Host bezieht sich `localhost` auf diesen Host. Ein Browser, der einen Endpunkt erreicht, beweist nicht, dass der Agent ihn erreichen kann.

### Überprüfen Sie einen tatsächlichen Tool Call {/* #check-an-actual-tool-call */}

<p className="example-label"><strong>Beispiel</strong> Überprüfen Sie den Notebook-Toolaufruf eines lokalen Modells</p>

Verwenden Sie nach der Bestätigung einer Verbindung eine kleine Aufgabe mit einem bekannten Ergebnis, um den Werkzeugpfad zu testen. Bitten Sie den Agenten, dies durch Python Notebook auszuführen, anstatt mentale Arithmetik zurückzugeben:

```python
print(8664 + 18515)
print((8664 + 18515) == 27179)
```

Dies sind die Null-Zählung der ersten GSE60450-Probe und die erkannten Genzahlen. Überprüfen Sie den vorgeschlagenen Code im Berechtigungsfeld, genehmigen Sie ihn, öffnen Sie dann **Notebook** und überprüfen Sie **27179 / True**.

![Notebook-Code und tatsächliche Ausgabe von einem lokalen Modell-Toolaufruf](/img/open-science/priority-completion/21-local-model-python-result.webp)

Lokales `qwen2.5:7b` hat diesen Aufruf über das Codex-Framework und einen lokalen Chat Completions-Endpunkt abgeschlossen. Sein ursprünglicher Vorschlag verwies auf ein nicht verfügbares Hilfsmodul; die Überprüfung erfolgreich war, nachdem dieser Vorschlag abgelehnt und der oben genannte abhängigkeitsfreie Code angegeben wurde. Dies verifiziert eine begrenzte Werkzeugoperation, keine zuverlässige Planung einer vollständigen RNA-seq-Analyse oder eines gleichwertigen Verhaltens unter einem anderen Agent-Framework.

## Wenn das Setup nicht vorankommt {/* #if-setup-does-not-advance */}

| Symptom | Nächste Prüfung |
| --- | --- |
| Erforderliche Feldmeldungen | Füllen Sie die benannten Felder aus; Ein Anzeigename allein ist nicht ausreichend |
| Sicherer Schlüsselspeicher nicht verfügbar | Entsperren oder autorisieren Sie das Betriebssystem-Zeichen-Tresor; Schlüssel können nicht gespeichert werden, bis sie verfügbar sind |
| Verbindungs-/Authentifizierungsfehler | Überprüfen Sie die Berechtigungsnachweise, Endpunkt, Format und Zugriff auf das spezifische Modell |
| Anbieter änderte sich während des Tests | Überprüfen Sie den aktuellen Anbieter und testen Sie erneut; ein verdrängtes Ergebnis darf die Einrichtung nicht abschließen |
| Sign-in abgesagt | Starten Sie erneut, wenn Sie bereit sind; Abbruch ist keine erfolgreiche Verbindung |
| Installierte Laufzeit, aber kein nutzbarer Anbieter | Modellanbindung fertigstellen; Runtime-Installation und Provider-Autorisierung sind getrennt |

### HTTP Fehlersuche {/* #http-error-lookup */}

Verwenden Sie für 400, 401, 403, 404, 429 oder 5xx Antworten den [HTTP Fehlerbehebungstabelle](troubleshooting.md#http-errors-400-403-429-and-5xx). Behalten Sie den antwortenden Dienst und seine detaillierte Nachricht mit dem Statuscode.

Quelle: [AnbieterForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ProviderForm.tsx), [ProviderStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/ProviderStep.tsx).

## Speichern Sie einen Providerwechsel in v0.31.0 und höher {/* #validated-provider-save */}

Anbieter-Edits werden getestet, bevor sie festgelegt werden. Wählen Sie **Save**, warten Sie auf das Verbindungsergebnis und bestätigen Sie den Erfolg, bevor Sie das Formular schließen. Ein fehlgeschlagener Test ersetzt keine funktionierende gespeicherte Konfiguration. Wenn eine zuvor gespeicherte Verbindung während einer Anforderung abgelehnt wird, wird ihre Verfügbarkeit aktualisiert; Prüfen Sie den Nachweis und den Endpunkt und testen Sie dann erneut. **Conversation models**, **Classification models** und **Local parsing models** haben unterschiedliche Zwecke; siehe [Modelleinstellungen](models.md#classification-models).

## StepFun und Regionsauswahl {/* #stepfun-regions */}

Wählen Sie **StepFun** im Anbieterkatalog, bestätigen Sie **China** oder **Global**, wählen Sie dann ein Modell aus und geben Sie Anmeldeinformationen für diese Region an. v0.32.0 fügt **Step-5 Preview** hinzu, mit multimodalen und 1M-Kontext-Katalog-Metadaten. Der tatsächliche Modellzugriff, die Kontingent- und Eingabeunterstützung hängen weiterhin vom Anbieterkonto und der Kompatibilität des ausgewählten Agenten ab.

Speichern und überprüfen sie die verbindung, bevor sie sie in einer konversation auswählen. Bestehende Provider-Konfigurationen behalten ihren vorherigen Endpunkt bei; Die Aktualisierung der App ändert nicht ihre Region oder das Main-Modell.
