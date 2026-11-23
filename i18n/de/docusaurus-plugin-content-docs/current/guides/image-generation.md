---
title: "Bilder erzeugen und bearbeiten"
last_update:
  date: '2026-11-23'
---

# Bilder erzeugen und bearbeiten {/* #generate-and-edit-images */}

Erstellen Sie eine Illustration aus einer Eingabeaufforderung und verfeinern Sie dann ein ausgewähltes Bild, während Sie frühere Versionen beibehalten. Verwenden Sie dies für erklärende Diagramme oder Präsentationskunstwerke. Ein erzeugtes Bild ist kein experimenteller Beweis; verifizieren Sie wissenschaftliche Etiketten, Strukturen und visuelle Ansprüche, bevor Sie es teilen.

## Konfigurieren eines Bilddienstes {/* #configure */}

1. Öffnen Sie **Settings → Model** und finden Sie **Image generation**. **Image services → Add image service** öffnen.
2. Wählen Sie **Provider type**. Geben Sie für **Custom HTTP service** **Name**, **Base URL** und **API key** ein und fügen dann genau **Model ID** und **Schnittstellenvorgabe** hinzu, die vom Dienst unterstützt werden. Für einen benutzerdefinierten Endpunkt passen Sie dessen **API format** an die Image-API des Dienstes an.
3. Speichern Sie den Service und wählen Sie ihn dann unter **Image generation model**. **Not configured** bedeutet, dass die Bilderzeugung nicht bereit ist.
4. Beginnen Sie mit einer kleinen Bildanforderung und prüfen Sie das zurückgegebene Bild. Neue Bildeinstellungen gelten ab der nächsten Runde.

![Einrichtung von Image-Services mit Endpoint, API-Format, Credential und Modellfeldern](/img/open-science/v130/image-service.webp)

Main, Vision und Image Generation haben unterschiedliche Jobs. Main leitet die konversation; vision liest bilder; image generation erstellt oder bearbeitet sie. Ein Codex-Abonnement für Main bietet nicht automatisch eine Bilderzeugungs-API oder deren Abrechnungszulage. Halten Sie Ihr funktionierendes Hauptmodell ausgewählt, während Sie den Bilddienst separat konfigurieren.

## Generieren Sie das erste Bild {/* #generate */}

Beschreiben Sie in einer Projektkonversation den Zweck, den Inhalt, das Layout und alle Labels des Bildes. Bitten Sie um ein gespeichertes Bild. Die Bilderzeugungs-Toolkarte zeigt die Anforderung und ihren Fortschritt an; warten Sie auf eine abgeschlossene Ausgabe, bevor Sie sie in der Vorschau öffnen.

<p className="example-label"><strong>Beispiel</strong> Anfordern einer konzeptionellen Workflow-Illustration</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

Überprüfen Sie die tatsächlichen Etiketten, die Reihenfolge und die Pfeilrichtung. Wenn eine Anfrage fehlschlägt, überprüfen Sie den Bilddienst, das Modell und den Fehler, anstatt Main in einen nicht verwandten Anbieter zu ändern. Eingabeaufforderungen und Quellbilder, die für die Erzeugung oder Bearbeitung verwendet werden, werden an den ausgewählten Bilddienst gesendet. Die Stornierung kann bereits gesendete Daten nicht zurückziehen.

## Edit, Vergleich und Wiederverwendung {/* #edit */}

1. Öffnen Sie das beabsichtigte Bild in der Vorschau. Bewegen Sie darüber oder verschieben Sie den Tastaturfokus auf die Steuerung und wählen Sie dann **Edit image**. Bestätigen Sie das Quellbild und die Version, bevor Sie Anweisungen eingeben.
2. Beschreiben Sie im Gespräch Komponisten eine fokussierte Veränderung. Halten Sie die Anforderung an die angezeigte Quelle gebunden; Die Eingabe Editing sendet sie nicht. Wenn Sie eine Region auswählen, überprüfen Sie den hervorgehobenen Bereich und seine Anweisung. Verfügbare Tools und Parameter hängen vom Bild und Service ab.
3. Wählen Sie **Send image edit** und warten Sie auf den neuen Ausgang. Wenn das Steuerelement nicht verfügbar ist, überprüfen Sie den angezeigten Grund und [Bilddienstkonfiguration](#configure). Eine fehlgeschlagene Anforderung ist keine neue abgeschlossene Version.
4. Verwenden Sie **Compare with input image** oder **Compare**, wenn Sie angeboten werden, und prüfen Sie sowohl den geänderten Bereich als auch den Inhalt, der unverändert bleiben soll. Verwenden Sie **Image history**, um frühere Versionen erneut zu besuchen, oder **Continue editing** für eine andere Überarbeitung.
5. Laden Sie die gewählte Version herunter, öffnen Sie sie erneut und überprüfen Sie Etiketten und wissenschaftliche Behauptungen, bevor Sie sie teilen. Bilddetails können den Notebook-Kernel identifizieren, der eine Bearbeitung erzeugt hat; diese Aufzeichnungen keine wissenschaftliche Genauigkeit belegen.

Das Gespräch bleibt an Ort und Stelle, während die Editing-Steuerelemente seinen Komponisten verwenden. Behalten Sie eine genaue Beschriftung, die illustrative Inhalte identifiziert. Für numerische Kontrollen auf Flächen sind [Notebook](notebook.md) und [Provenienz](reproducibility.md) zu verwenden. für Diatext siehe [Präsentationsbearbeitung](presentation-editing.md).

## Testen Sie einen Image-Service vor dem Speichern {/* #test-service */}

In v1.3.1 bietet das Bilddienstformular **Test generation** an, nachdem die erforderlichen Felder und ein Modell ausgefüllt wurden. Überprüfen Sie die Bestätigung: Sie erzeugt ein Bild und der Anbieter kann die Anfrage in Rechnung stellen. Ein bestandener Test gilt für genau diese Konfiguration; Um das Modell, den Endpunkt oder die Anmeldeinformationen zu ändern, ist ein neuer Test erforderlich. Sie können die Konfiguration auch ohne diesen Test speichern.

Nach dem Speichern eines neuen Dienstes wird dessen erstes Modell erst dann zum Standard, wenn bereits kein Modell zur Bilderzeugung ausgewählt ist. Überprüfen Sie diese Auswahl vor Ihrer ersten Anfrage. Main bleibt separat konfiguriert.

![Testen Sie einen Image-Service vor dem Speichern](/img/open-science/v1.3.1/image-service-test.webp)

## Aktualisieren Sie einen Image-Modell-Katalog {/* #image-model-catalog */}

Fügen Sie in **Settings → Model → Image services** einen offiziellen **OpenAI**-, **Minimax**-, **Bailian**- oder **Volcengine Ark**-Dienst hinzu oder bearbeiten Sie ihn. Füllen Sie die Verbindungsfelder aus und wählen Sie dann **Refresh model list** aus, bevor Sie speichern. Eine Aktualisierung sendet die konfigurierten Anmeldeinformationen an diesen Anbieter; Es erzeugt kein Bild.

Die aktualisierte Liste stimmt mit den Anbieterergebnissen mit den von Open-Science unterstützten Bildmodellen überein, so dass es nicht jedes Modell ist, das der Anbieter anbietet. Der aktuelle Standard wird beibehalten, mit einem Marker, wenn er im zurückgegebenen Katalog fehlt. Überprüfen Sie diesen Marker, bevor Sie sich auf das Modell verlassen. Ein fehlgeschlagener Refresh behält die vorherige Liste; Überprüfen Sie die angezeigte Ursache und versuchen Sie es erneut. **Save** verpflichtet das Formular, während [Bilderzeugung testen](#test-service) eine separate, potenziell abrechenbare Bildanforderung ist.

Verwenden Sie für Bailian die Workspace-URL und die Region, die dem Anmelder entsprechen. China-verbundene Anmeldeinformationen verwenden den China-Katalog. Das Ändern einer Verbindung oder eines Arbeitsbereichs erfordert eine erneute Überprüfung des Katalogs; ein in einer anderen Region sichtbares Modell ist hier kein Zugangsnachweis.

![OpenAI image service: supported models and Refresh model list](/img/open-science/v1.3.3/image-catalog.webp)
