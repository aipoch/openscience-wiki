---
title: "Übersetzen eines vollständigen PDF"
last_update:
  date: '2026-10-09'
---

# Übersetzen eines vollständigen PDF {/* #translate-a-full-pdf */}

Lesen Sie ein Papier in einer anderen Sprache, während Sie das Original zum Vergleich beibehalten. **Full-text translation** bereitet den Dokumenttext vor, speichert übersetzte Absätze im Laufe der Arbeit und speichert gespeicherte Übersetzungen mit dem verwalteten PDF. Es ersetzt nicht das ursprüngliche PDF oder überprüft die Ergebnisse des Papiers.

## Bereiten Sie das Papier und das Modell vor {/* #prepare-translation */}

1. Erhalten Sie den vollständigen PDF und öffnen Sie ihn aus [Bibliothek](library.md), Lesen, Posteingang, einem hochgeladenen Anhang oder einer gespeicherten Datei. Eine Referenz mit nur Metadaten oder einem Abstract ist kein Volltext-PDF.
2. Vergrößern Sie bei Bedarf die Vorschau und wählen Sie dann **Full-text translation** in der PDF-Symbolleiste.
3. Wählen Sie **Prepare full text**. Warten Sie auf **Full text prepared**, bevor Sie mit der Übersetzung beginnen. Überprüfen Sie die Originalseiten, wenn Text fehlt oder der PDF gescannt wird; Die Zubereitung garantiert nicht, dass jedes Figurenetikett oder jede Tabelle extrahiert wurde.
4. Wählen Sie **Target language**, dann **Translation method** und **Model**. Verwenden Sie ein Modell, das vom Picker angeboten wird.

| Methode | Was zu konfigurieren |
| --- | --- |
| **Agent** | ein verfügbares Agentenmodell oder **Main model** Wenn unterstützt. In v0.36.0 können Codex-Abonnementmodelle diesen PDF-Übersetzungsvorgang nicht ausführen. Wählen Sie ein kompatibles Übersetzungsmodell aus, ohne das Main-Modell der Konversation zu ersetzen. |
| **Direct API** | Ein konfiguriertes, verfügbares API-Modell. Die Abonnementanmeldung kann nicht als Direct API-Anmeldeinformationen verwendet werden. Siehe [Provider Setup](providers.md). |
| **Local model**, wenn angeboten | Installieren Sie das Modell über die angezeigten Bedienelemente und warten Sie, bis es fertig ist. Lokale Übersetzung läuft einen Absatz nach dem anderen. |

Für Agent und Direct API werden der Dokumenttext und das Glossar an das ausgewählte Modell gesendet. Überprüfen Sie den gewählten Dienst, bevor Sie eingeschränktes Material übersetzen. Der Screenshot zeigt die Vorbereitungs- und Modellkontrollen; Das ausgewählte Codex-Abonnement macht **Translate document** nicht verfügbar.

![Volltext vorbereitet, mit Übersetzungssprache, Methoden- und Modellsteuerung](/img/open-science/v0360/translation-settings.webp)

Das abgebildete Papier ist Lang et al., [Nicht defektstabilisierter thermisch stabilisierter Einatomkatalysator](https://doi.org/10.1038/s41467-018-08136-3), lizenziert unter [CC VON 4.0](https://creativecommons.org/licenses/by/4.0/).

## Übersetzen und Resume {/* #translate-resume */}

1. Öffnen Sie **Translation glossary**, wenn ein technischer Begriff eine konsistente Formulierung benötigt. Fügen Sie ein **Source term** und sein **Preferred translation** mit **Add term** hinzu. Überprüfen Sie diese Bedingungen, bevor Sie beginnen.
2. Lassen Sie **Advanced → Concurrent translations** für einen ersten Durchlauf standardmäßig. Mehr gleichzeitige Anfragen können auf Anbietergrenzen stoßen.
3. Wählen Sie **Translate document**. Sehen Sie sich die Anzahl der übersetzten Paragraphen an; Eine teilweise Zählung ist kein abgeschlossenes Dokument.
4. Um zu unterbrechen, wählen Sie **Cancel**. Abgeschlossene Absätze werden beibehalten. Verwenden Sie **Continue translation**, um die gespeicherte Arbeit wieder aufzunehmen, oder **Retry**, wenn ein Fehler diese Aktion anbietet. Lesen Sie den Fehler eines Absatzes, bevor Sie **Skip and continue** verwenden, was eine Lücke zur Überprüfung lässt.
5. Öffnen Sie das gleiche verwaltete PDF und wählen Sie seine Edition in **Saved translations** aus. Überprüfen Sie **Saved translation parameters**, um die Sprache und das Modell zu bestätigen. Um sie zu ändern, wählen Sie **New translation**, anstatt verschiedene Einstellungen in einem Wiederholungsversuch zu mischen.

Verifizierte Kopien derselben PDF teilen gespeicherte Editionen in Literatur, Lesen, Posteingang und Arbeitsbereich. Das Abgleichen eines Dateinamens oder DOI allein stellt keinen identischen Inhalt her. Diese lokale Freigabe synchronisiert keine Übersetzungen mit einem anderen Computer.

## Vergleichen und Exportieren {/* #compare-export */}

Verwenden Sie **Original**, **Translation** und **Compare**, um die Quelle und die übersetzten Seiten zu überprüfen, wenn verfügbar. Prüfen Sie technische Begriffe, Negationen, Mengen, Einheiten und Zahlenreferenzen mit dem Original. Überprüfen Sie **Translation issues** und alle Passagen, die den Originaltext beibehalten; Eine übersetzte Absatzzahl garantiert nicht, dass jede Passage auf die gerenderte Seite passt.

Wählen Sie **Export translated PDF**, speichern Sie eine separate Kopie und öffnen Sie sie dann in einem PDF-Reader erneut. Überprüfen Sie die Seitenzahl und mehrere textlastige und figurlastige Seiten. Unübersetzte Inhalte bleiben in ihrer Originalsprache; Einige Passagen behalten den Originaltext im PDF, während ihre Übersetzungen in der Seitenleiste lesbar bleiben. Halten Sie das Original für Zitate und wissenschaftliche Interpretation zur Verfügung.

| Wenn Sie sehen | Nächster Schritt |
| --- | --- |
| **Bereiten Sie vor dem Übersetzen den Volltext vor.** | Abschluss der Vorbereitung und Prüfung, ob geeignete Absätze gefunden wurden. |
| **Dieses Abonnementmodell unterstützt keine PDF-Übersetzung. Wählen Sie ein anderes Modell.** | Wählen Sie ein unterstütztes Übersetzungsmodell; Eine Änderung der Zielsprache wird die Modellkompatibilität nicht beeinträchtigen. |
| Anbieter-Ratenlimit oder vorübergehende Nichtverfügbarkeit | Warten Sie, dann versuchen Sie es mit den gleichen gespeicherten Einstellungen. Vermeiden Sie es, doppelte Editionen für die gleiche Unterbrechung zu starten. |
| Fortschritt konnte nicht gerettet werden | Öffnen Sie den PDF erneut, um das zuletzt gespeicherte Ergebnis zu laden, bevor Sie fortfahren. |

Verwenden Sie [PDF Anmerkungen und Dokumentnotizen](pdf-notes.md), um Lesefragen aufzuzeichnen. Übersetzung und Annotation sind getrennte Werkzeuge.
