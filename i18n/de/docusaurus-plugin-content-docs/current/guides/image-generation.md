---
title: "Bilder erzeugen und bearbeiten"
last_update:
  date: '2026-11-20'
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

## Bearbeiten, Vergleichen und Wiederverwenden {/* #edit */}

Öffnen Sie die Bearbeitungsaktion des Bildes, wählen Sie die Quellversion aus und beschreiben Sie eine fokussierte Änderung. Verwenden Sie die verfügbaren Regions- und Parametersteuerelemente nur, wenn der ausgewählte Dienst sie unterstützt. Reichen Sie die Bearbeitung ein und warten Sie auf die neue Ausgabe. Das Bearbeiten erstellt eine neue Version, sodass frühere Varianten verfügbar bleiben.

Vergleichen Sie den Kandidaten mit der Quelle: Überprüfen Sie die angeforderte Region und die Teile, die unverändert bleiben sollen. Verwenden Sie den Bildverlauf, um eine Version erneut zu besuchen oder die Bearbeitung fortzusetzen. Laden Sie die beabsichtigte endgültige Version herunter und öffnen Sie die Datei erneut, bevor Sie sie in einer Präsentation ablegen. Behalten Sie eine genaue Beschriftung, die illustrative Inhalte identifiziert.

Für vorhandene Flächen, die einer numerischen Überprüfung bedürfen, verwenden Sie [Notizbuch](notebook.md) und [Herkunft](reproducibility.md). Für Folientext und Formatierung siehe [Präsentationsbearbeitung](presentation-editing.md).
## Testen Sie einen Image-Service vor dem Speichern {/* #test-service */}

In v1.3.1 bietet das Bilddienstformular **Test generation** an, nachdem die erforderlichen Felder und ein Modell ausgefüllt wurden. Überprüfen Sie die Bestätigung: Sie erzeugt ein Bild und der Anbieter kann die Anfrage in Rechnung stellen. Ein bestandener Test gilt für genau diese Konfiguration; Um das Modell, den Endpunkt oder die Anmeldeinformationen zu ändern, ist ein neuer Test erforderlich. Sie können die Konfiguration auch ohne diesen Test speichern.

Nach dem Speichern eines neuen Dienstes wird dessen erstes Modell erst dann zum Standard, wenn bereits kein Modell zur Bilderzeugung ausgewählt ist. Überprüfen Sie diese Auswahl vor Ihrer ersten Anfrage. Main bleibt separat konfiguriert.

![Testen Sie einen Image-Service vor dem Speichern](/img/open-science/v1.3.1/image-service-test.webp)
