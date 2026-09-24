---
title: "Modelle und Aufgabenrichtlinien"
last_update:
  date: '2026-09-24'
---

# Modelle und Aufgabenrichtlinien {/* #models-and-task-policies */}

Wählen Sie ein Modell für die Arbeit, die es ausführen muss, und prüfen Sie dann, welche Einstellungen geerbt werden. Ein **Provider** bietet Modellzugriff; ein **Agent** führt die Konversation und die Werkzeuge aus; a **Specialist** bietet eine wiederverwendbare Rolle und ausgewählte Fähigkeiten. Das Ändern eines installiert oder konfiguriert die anderen nicht.

Verwenden Sie die folgenden Aufgabenrichtlinien, wenn Main, Subagent, Reviewer, Vision oder Session-Details unterschiedliche Modelle benötigen. Überprüfen Sie den Anbieter und das Modell in der resultierenden Aufgabe, insbesondere wenn mehrere Anbieter den gleichen Modellnamen anbieten.

## Wählen Sie das Hauptmodell aus {/* #select-the-main-model */}

1. Öffnen Sie **Settings → Model**. In einem Arbeitsbereich zeigt der **Select model**-Eintrag des Composers auch Modellauswahlen an.
2. Öffnen Sie **Main model** und wählen Sie ein verfügbares Modell unter dem konfigurierten Provider aus. Ein Katalogeintrag ist kein Beweis dafür, dass das Konto ihn verwenden kann.
3. Wählen Sie **Reasoning effort**. Verwenden Sie die Auswahlmöglichkeiten, die tatsächlich für dieses Modell angezeigt werden. Dieses inspizierte Modell bot Default, Low, Medium, High, XHigh und Ultra; Andere Modelle haben unterschiedliche Leitern.
4. Schließen und erneutes Öffnen des Modells, um die gespeicherte Auswahl zu überprüfen. Starten Sie eine kleine Anfrage und prüfen Sie ihr Ergebnis vor einer langen Analyse.

![Main Modell und Connected Provider](/img/open-science/guides-walkthrough/10-model-main.webp)

Änderungen gelten für nachfolgende Anfragen. Sie ändern nicht rückwirkend das Modell hinter einer bestehenden Antwort. Wenn sich die Modelle ändern, versucht die App, die relative Argumentationsstärke zu erhalten; Ein Backend kann sich einem nicht unterstützten Aufwand annähern. Ein höherer Aufwand kann die Zeit- und Token-Nutzung erhöhen und ist keine Korrektheitsgarantie.

## Zuweisung von Modellen an bestimmte Aufgaben {/* #assign-models-to-specific-tasks */}

Wählen Sie eine Szenariozeile, um sie zu erweitern. Das Öffnen einer anderen Reihe bricht die vorherige zusammen. Lesen Sie die zusammengebrochene Zusammenfassung, nachdem Sie eine Änderung vorgenommen haben: Sie unterscheidet Vererbung, ein festes Modell und eine nicht verfügbare Auswahl.

| Szenario | Auswahl des Modells | Was zu überprüfen ist |
| --- | --- | --- |
| **Subagent** | Gleiches wie Hauptmodell oder ein kompatibles separates Modell | Die Steuerung des Abgleichsaufwands ist deaktiviert, während sie Main folgt. Auch die Delegation muss ermöglicht werden. |
| **Reviewer** | Folgen Sie dem Hauptmodell oder einem konfigurierten Reviewer-Modell | Eine Modellrichtlinie allein ermöglicht keine automatische Überprüfung oder Erstellung eines Überprüfungsprotokolls. |
| **Vision** | Ein konfiguriertes bildfähiges Modell | Nicht konfiguriert bedeutet, dass es keine dedizierte Vision-Auswahl gibt. Ob ein Relais benötigt wird, hängt von der Bildunterstützung des aktiven Backends ab. |
| **Session details** | Folgen Sie Main oder wählen Sie ein kompatibles Modell; ihre Bemühungen und ihre Befähigung zu prüfen | Dies generiert den Sitzungstitel / die Beschreibung mit einem eingeschränkten Aufruf. Es ist getrennt von der wissenschaftlichen Aufgabe und ihren Artefakten. |

![Subagentenvererbung und Kontrolle des Aufwands für Behinderte](/img/open-science/guides-walkthrough/11-model-scenarios.webp)

Die Session-Details-Selektor filtert Codex Abonnementmodelle heraus. Ein in Main oder Vision sichtbares Modell kann daher hier fehlen. Mit einem kompatiblen lokalen Anbieter und OpenCode wurde das lokale Modell als feste Wahl verfügbar. **Not supported** bedeutet neben seinem Argumentationsaufwand, dass die Aufwandskontrolle nicht verfügbar ist; Es ist getrennt davon, ob das Modell eine Textanforderung erhalten kann.

Wählen Sie für ein angeheftetes Szenario den Anbieter / das Modell und dann den unterstützten Aufwand aus. Kehren Sie zur Vererbungsoption zurück, wenn Sie möchten, dass sich zukünftige Main-Änderungen ausbreiten. Eine **Unavailable**-Zusammenfassung kann den vorherigen Modellnamen beibehalten, auch nachdem der Anbieter entfernt wurde oder nicht mehr berechtigt ist; Wählen Sie einen gültigen Ersatz aus.

### Lesen Sie ein Diagramm mit einem separaten Vision-Modell {/* #read-a-chart-with-a-separate-vision-model */}

Verwenden Sie Vision, wenn das Main-Modell der Konversation keine Bilder akzeptieren kann. Ein Main-Modell, das bereits Bilder akzeptiert, kann diese direkt lesen.

<p className="example-label"><strong>Praxisbeispiel</strong> Prüfen Sie Etiketten in einem Sample-Count-Diagramm</p>

1. Erweitern Sie **Settings → Model → Vision** und wählen Sie ein verfügbares bildfähiges Modell. Wählen Sie einen unterstützten Argumentationsaufwand aus, wenn das Steuerelement aktiviert ist.
2. Halten Sie das beabsichtigte Textmodell in der Konversation ausgewählt. Changing Vision ersetzt nicht Main.
3. Verwenden Sie **+ → Attach files**, um das Diagramm anzuhängen. Bestätigen Sie, dass der Dateiname im Composer vor dem Senden erscheint.
4. Fordern Sie spezifische sichtbare Informationen an, z. B. Titel, Achsenbeschriftungen, Einheiten und Anzahl der aufgetragenen Proben. Fordern Sie eine explizite Angabe an, wenn ein Etikett nicht lesbar ist.
5. Vergleichen Sie die Antwort mit dem Originalbild. Verwenden Sie die Quelltabelle für genaue numerische Vergleiche: In diesem Beispiel beweisen zwei auf **24.7M** gerundete Labels nicht, dass ihre zugrunde liegenden Zählungen gleich sind.
6. Bringen Sie Vision zu **Not configured** zurück, wenn Sie kein separates Bildmodell mehr wünschen. Dadurch wird der Modellanbieter nicht entfernt.

![Separate Vision Auswahl neben dem Text Main Modell](/img/open-science/sept11-completion/vision-configuration.webp)

![Überprüfen von Chart-Etiketten und die Grenzen der gerundeten Werte](/img/open-science/sept11-completion/vision-result.webp)

Das aktuelle Image-Relay schließt Codex-Abonnementanbieter aus, obwohl sie im Vision-Selektor erscheinen können. Wenn ein Main-Modell, das nur Text enthält, ein Bild nach dieser Auswahl immer noch ablehnt, wählen Sie einen anderen geeigneten Vision-Anbieter oder ein bildfähiges Main-Modell. Behandeln Sie einen gespeicherten Selektorwert nicht als erfolgreiche Bildanforderung.

### Bestätigen Sie, dass Sitzungsdetails generiert wurden {/* #confirm-that-session-details-were-generated */}

Nachdem Sie **Same as main model** oder ein kompatibles festes Modell unter **Session details** ausgewählt haben, erstellen Sie eine Konversation. Warten Sie, bis der Fallback mit der ersten Aufforderung zu einem prägnanten Titel wird, und prüfen Sie dann die gespeicherte Beschreibung. Eine verkürzte Kopie der Eingabeaufforderung stellt keine erfolgreiche Generation dar.

Überprüfen Sie den gespeicherten Titel und die Beschreibung, nachdem die Hilfsanforderung abgeschlossen ist. Wenn der Titel eine verkürzte Aufforderung bleibt, prüfen Sie die Modellkompatibilität, die lokale Serverlast und den endgültigen Status des Anrufs. Ein zusätzliches Timeout kann diesen Fallback beibehalten. Session-Titel-Generierung verwendet eine eigene Modellrichtlinie und führt nicht die wissenschaftliche Berechnung des Gesprächs durch.

## Anbieterkontrollen und Fehlerprüfungen {/* #provider-controls-and-failure-checks */}

| Kontrolle/Zustand | Nächste Maßnahme |
| --- | --- |
| **Add provider** | Folgen [Provider-Setup](./providers.md), einschließlich der Authentifizierungs- und Endpunktanforderungen. |
| **Check Codex login** | Überprüfen Sie den Abonnement-Login-Status erneut; Dies führt nicht zu einer Forschungsaufgabe. |
| **Re-import Codex login** | Importieren Sie ein aktualisiertes vorhandenes Login über den Flow der App. |
| **Edit** | Überprüfen Sie die Provider-Konfiguration. Bewahren Sie die Arbeitskonfiguration auf, bis ein Ersatz verifiziert ist. |
| Deaktiviert **Delete** | Der aktuelle Anbieter kann in diesem Zustand nicht entfernt werden; Wählen Sie zuerst ein anderes gültiges Setup aus. |
| Kompatibilitätswarnung | Überprüfen Sie das aktive Agent- und Provider-API-Format, bevor Sie es wiederholt wiederholen. |
| Keine Szenariowahl | Konfigurieren Sie zuerst einen berechtigten Anbieter/Modell; Ein Leerwahl ist keine Anforderung, einen beliebigen Modellnamen einzugeben. |

Verwenden Sie [Agentsetup](./frameworks.md) für das Ausführungs-Backend und [Verwendung](./usage.md) für gemeldete Aktivität. Genaue Konfigurationspriorität ist in [Referenz](../reference/configuration.md).

Quellen: [Modellauswahl](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ActiveModelSelect.tsx), [Szenariorichtlinien](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ScenarioModelList.tsx).

## Klassifikationsmodelle {/* #classification-models */}

Öffnen Sie **Settings → Model → Classification models**. Klassifikationsdienste haben zwei unabhängige Bindungen: **Automatic capability selection** und **Smart collections**. Die erste hilft bei der Auswahl relevanter Skills und Connectors, bevor eine Anforderung gestartet wird. Es ersetzt nicht Main oder fügt ein Chat-Modell hinzu. Sie können **Automatic capability selection** bei **Use default method** verlassen; Skills und Connectors funktionieren immer noch ohne es.

Die automatische Auswahl von Fähigkeiten über diesen Dienst wird in Hauptgesprächen mit **Codex Chat Completions** oder **CodeBuddy** unterstützt. Sitzungen mit Codex-Abonnement behalten ihren bisherigen Ladeweg. Diese Funktion übermittelt nur die aktuelle Anfrage sowie Namen und Beschreibungen der Fähigkeiten. Ist der Dienst nicht verfügbar oder die Klassifikation unklar, wird die Standardmethode verwendet.

![Auswahl der Standardfähigkeit und fakultativer Eintrag des Klassifikationsdienstes](/img/open-science/v0311/classification-models.webp)

1. Wählen Sie **Add service**, dann **TypeSafe AI**, **OpenRouter** oder **Custom HTTP service**.
2. Benennen Sie den Dienst und geben Sie bei Bedarf seinen API-Anmelder an. OpenRouter kann ein bestehendes kompatibles Konto oder einen neuen Schlüssel verwenden; Halten Sie Schlüssel in Screenshots versteckt.
3. Wählen Sie **Save** und warten Sie auf die Validierung. Die fehlgeschlagene Validierung lässt die vorherigen Einstellungen unverändert.
4. Wählen Sie unter **Automatic capability selection** den gespeicherten Dienst und ein in seinem Katalog angebotenes Modell aus. Verwenden Sie **Check model**, um die Verbindung zu überprüfen.
5. Probieren Sie eine begrenzte Anfrage in einer unterstützten Hauptkonversation aus und prüfen Sie dann die tatsächlich ausgewählten Tools. Eine erfolgreiche Modellprüfung allein verifiziert kein Forschungsergebnis.

Durch Entfernen eines Dienstes wird die automatische Auswahl der Funktionen auf die Standardmethode zurückgeführt und alle Smart-Sammlungen, die an diesen Dienst gebunden sind, sind unkonfiguriert. Ein separat gespeicherter Dienstschlüssel wird mit ihm entfernt; Das Entfernen eines Dienstes, der ein Konto teilt, löscht dieses Konto oder seinen Schlüssel nicht.

Siehe [Provider-Setup](providers.md) für konversationsmodelle. Lokale PDF-Parsing-Ressourcen werden unter **Local parsing models**, einem separaten Tab, verwaltet.

![Klassifikationsdienstformular mit dem API-Schlüssel noch leer](/img/open-science/v0311/classification-add-service.webp)

Wählen Sie für Jev unter **Automatic capability selection** den Eintrag **TypeSafe AI / Jev Latest** und klicken Sie auf **Check model**. **Check passed** bestätigt, dass der Dienst antwortet. Öffnen Sie Settings erneut und prüfen Sie, ob die Auswahl erhalten bleibt.

![TypeSafe AI / Jev Latest ausgewählt, mit Check passed und verborgenem API-Schlüssel](/img/open-science/v0311/classification-connected.webp)

Beispielsweise kann ein öffentliches TP53-Lookup in einer Codex Chat Completions-Sitzung Jev verwenden, um `mcp-genes` auszuwählen. Überprüfen Sie die ausgewählte Fähigkeit in der Aktivität und prüfen Sie dann die Datenbankantwort auf das Forschungsergebnis. Codex-Abonnementsitzungen verwenden ihren bestehenden Fähigkeitsladepfad; Eine gespeicherte Jev-Bindung lässt diese Sitzungen nicht Jev verwenden.

### Binden Sie ein Modell für Smart Collections {/* #smart-collection-model */}

1. Öffnen Sie **Settings → Model → Classification models** und speichern Sie einen kompatiblen Dienst, wenn Sie noch keinen hinzugefügt haben.
2. Wählen Sie unter **Smart collections** den Dienst und eines der angebotenen Modelle aus und wählen Sie dann **Check model**. Diese Bindung wird von allen intelligenten Sammlungen geteilt; Es ist unabhängig von **Automatic capability selection**.
3. Bestätigen Sie **Check passed**, kehren Sie dann in die Bibliothek zurück und erstellen Sie eine kleine, übersichtliche Sammlung. Smart Collections haben **kein Standardmodell**: Konfigurieren Sie diese Bindung, bevor Sie Referenzen auswerten.

Main kann weiterhin **Codex subscription** verwenden. Seine Fähigkeitsladeroute hindert die Bibliothek nicht daran, eine eigene Klassifizierungsbindung zu verwenden. Im folgenden Beispiel wird **den Eintrag** für das Screening ausgewählt.

![Intelligente Sammlungen und die Auswahl der Fähigkeiten haben separate Bindungen, wobei der Serviceschlüssel maskiert ist](/img/open-science/v0330/classification-smart.webp)

Das Screening sendet die Sammelregeln und Referenznachweise an diesen Service. Wenn **Use available full text** ausgeschaltet ist, verwendet es Titel und Abstract. Einschalten sendet verfügbaren PDF-Text; Lange Dokumente verwenden relevante Passagen, und ein nicht verfügbares oder unlesbares PDF fällt auf Titel und Abstract zurück. Überprüfen Sie die für jede Entscheidung gezeigten Beweise. Folgen Sie dem [Smart Screening Workflow](../workflows/screen-literature.md), um eine echte Reihe von Papieren zu bewerten und zu überprüfen.

### Dienstleistungen der Zollklassifizierung {/* #custom-classification */}

Geben Sie in **Add service → Custom HTTP service** einen Dienstnamen, eine Endpunkt-URL und eine Modell-ID ein. Der Endpunkt muss den **TypeSafe-Klassifizierungsprotokoll** implementieren; ein gewöhnlicher Chat-Endpunkt ist nicht austauschbar. Geben Sie bei Bedarf den API-Schlüssel des Dienstes an: Ein Loopback-Endpunkt kann HTTP ohne Schlüssel verwenden, während entfernte Endpunkte HTTPS und Anmeldeinformationen erfordern.

Wählen Sie nach dem Speichern den Dienst unter **Automatic capability selection** aus und führen Sie **Check model** aus. Überprüfen sie dann die fähigkeitsauswahl in einer unterstützten konversationsroute. Diese Einstellung schaltet Main nicht um oder lässt Codex-Abonnementsitzungen den Klassifikator verwenden.

Das Formular unten veranschaulicht die Felder. Ersetzen Sie den Beispiel-Endpunkt und `your-model-id` durch Ihre tatsächlichen Servicedetails, bevor Sie die Verbindung überprüfen.

![Benutzerdefinierte Klassifikations-Endpunkt-, Modell- und leere Schlüsselfelder](/img/open-science/v0320/classification-custom.webp)
