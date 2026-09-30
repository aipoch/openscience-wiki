---
title: "Navigation und Suche"
last_update:
  date: '2026-09-29'
---

# Navigation und Suche {/* #navigation-and-search */}

Verwenden Sie Home, um die Untersuchung auszuwählen, die Sitzungsliste, um die Konversation auszuwählen, und Vorschauen, um die Quellen und Ergebnisse zu inspizieren. Dieses Kapitel folgt dem echten **GSE60450 - RNA-seq count quality**-Projekt.

## Start von zu Hause aus {/* #start-from-home */}

Verwenden Sie **Settings → General → Appearance**, um die Sprache oder das Thema der App zu ändern. Das [Einstellungen Center](../settings/overview.md) gruppiert Panels nach Zweck und bietet eine eigene Suche.

![Home mit den Genexpressions- und Literaturprojekten](/img/open-science/v0.27.0/01-home.webp)

| Eingang | Aktion | Kontrolle nach dem Öffnen |
| --- | --- | --- |
| Projektkarte | Öffnen Sie den Workspace dieses Projekts | Projektname über der Sitzungsliste |
| Jüngste Sitzung | Setzen Sie dieses Gespräch direkt fort | Sitzungstitel und Besitzprojekt; Ähnliche Titel können zu verschiedenen Projekten gehören |
| Neues Projekt | Geben Sie Name, Beschreibung und Agent Context ein | Siehe [Projekte](projects.md) für Feldumfang und Ordnerzugriff |
| Suchen | Offene globale Suche | Finden Sie Projekte, Nachrichten, Dateien und Literatur; Wiki-Suche ist getrennt |
| Bibliothek | Offene gemeinsame Referenzen | Projekt- und Sammlungsansichten sind Links zu derselben Bibliothek |
| Modelleinstellungen | Modellzugriff konfigurieren | Ein verbundenes Konto und ein erfolgreicher Forschungslauf sind getrennte Staaten |
| Einstellungen → Allgemein → Aussehen | Sprache ändern / Thema | Schnittstellensprache übersetzt keine Aufgabeninhalte |
| Nachrichten | Antragsmeldungen prüfen | Lesen Sie das tatsächliche Ereignis; Ein ungelesener Zähler ist kein Task-Failure-Count |

In einem Arbeitsbereich kehrt **All projects** zu Home zurück. Das Projektnamen-Menü enthält Projektaktionen; Das Menü neben einer Sitzung beeinflusst diese Sitzung. **New** unter Sessions startet ein weiteres Gespräch im aktuellen Projekt. Es erstellt kein anderes Projekt oder kopiert seine Quellordner.

## Halten Sie das Gespräch und die Beweise sichtbar {/* #keep-the-conversation-and-evidence-visible */}

Der Arbeitsbereich verfügt über eine Session Sidebar, eine Konversation und einen optionalen Vorschaubereich. **Files** öffnet die Dateibibliothek; **Library** öffnet Referenzen; **Open notebook** öffnet aufgezeichnete Ausführung. Wählen Sie eine Vorschau-Registerkarte, um die sichtbare Datei zu ändern. Das Öffnen eines anderen Ergebnisses kann einen Tab hinzufügen, während zuvor geöffnete Tabs verfügbar bleiben.

Ziehen Sie den **Resize left panel**- oder **Resize right panel**-Teiler, um Platz zuzuweisen. Kollabieren der Seitenleiste oder des Vorschaufelds beim Lesen von breiten Inhalten; Öffnen Sie es mit der entsprechenden Kantensteuerung wieder. Das sind Layout-Änderungen. Sie stornieren keine laufende Aufgabe, löschen eine Datei oder entfernen den Versionsverlauf. Vollbild-Datei-Browsing und Vollbild-Vorschau sind separate Kontrollen; Schließen Sie die korrekte Oberfläche, um zum vorherigen Layout zurückzukehren.

## Wählen Sie den richtigen Suchumfang {/* #choose-the-right-search-scope */}

| Suchfläche | Durchsuchungen | Nützliches Beispiel |
| --- | --- | --- |
| App Global Search | Projekte, Sitzungen, Nachrichtentext, hochgeladene / generierte Dateinamen und Bibliotheksaufzeichnungen / -sammlungen; indexierte Inhalte von unterstützten Uploads | Eine Phrase aus einer Antwort, einem Dateinamen oder einem Papiertitel |
| Dateien → Projektdateien suchen | Namen innerhalb des ausgewählten Projekt-/Datei-Quellenfilters | `rnaseq` nach Auswahl Alle Artefakte |
| Bibliothek → Suchreferenzen | Bibliographische Felder, einschließlich Titel, Schöpfer und Identifikatoren | A PRISMA DOI |
| PDF Dokumentensuche | Durchsuchbarer Text im offenen PDF | Ein Satz auf den Seiten eines Papiers |
| Die Suche dieser Dokumentation | Wiki-Titel, Überschriften und Körpertext | `Inbox`, `SHA-256` oder `remote access` |

Globale Suche findet Nachrichtentext, hochgeladene Dateinamen und indizierte Upload-Inhalte. Generierte Dateien werden nach Namen durchsucht; nicht indexierte Inhalte nicht durchsucht werden. Es bedeutet nicht die Volltext-Indizierung jedes PDF, Bildes oder eines anderen Binärformats. Verwenden Sie die eigene Suche des Dokuments, wenn Sie in ein PDF schauen.

## Finden Sie eine Nachricht, Datei oder Papier {/* #find-a-result-by-name */}

1. Drücken Sie **&lt;0xE2>&lt;0x8C>&lt;0x98>K** auf macOS oder **Strg + K** auf Windows/Linux oder wählen Sie **Search**.
2. Geben Sie eine erkennbare Phrase, einen Titel oder einen Dateinamen ein. **All** Gruppen Ergebnisse nach Kategorie; Wählen Sie eine Kategorie, um die Liste einzugrenzen.
3. Öffnen Sie **Advanced filters** neben den Kategorien. Verwenden Sie **Search scope**, **Result order**, **Time range** und den ergebnisspezifischen Absender-, Dateiformat- oder Bibliothekstypfilter. Ein Filter gilt nur für den entsprechenden Ergebnistyp.
4. Wählen Sie ein Ergebnis aus, um den Detailbereich zu öffnen. Überprüfen Sie das Projekt / die Sitzung, die Text- oder Dateiversion, bevor Sie navigieren.
5. Öffnen Sie die passende Nachricht oder Datei aus dem Detailbereich. Verwenden sie für eine datei die quellnachrichtenaktion, wenn sie die konversation benötigen, die sie erzeugt oder angehängt hat. Die Ergebnisse der Bibliothek öffnen die entsprechende Referenz oder Sammlung.
6. Laden Sie bei Bedarf mehr innerhalb einer Ergebniskategorie. Schließen Sie den Detailbereich, um die Suche fortzusetzen, oder drücken Sie **Esc**, um die Suche zu verlassen.

Der Detailbereich wird aktualisiert, wenn Sie ein anderes Ergebnis auswählen. Eine kurze Anfangsliste ist nicht die vollständige Übereinstimmungszählung; Verwenden Sie die Load-more-Steuerung der Gruppe oder scrollen Sie innerhalb einer ausgewählten Kategorie weiter. Ohne Abfrage helfen Ihnen die letzten Sitzungen, Dateien und Literatur, zu den letzten Arbeiten zurückzukehren.

Die Zahl neben **Advanced filters** zeigt aktive Bedingungen an. Durch Zusammenfügen der Filterspalte werden diese Bedingungen weiterhin angewendet, während Sie die Ergebnisse inspizieren. Das Wiedereröffnen der Suche gibt die Kategorie in **All** zurück und bricht die Spalte zusammen; Überprüfen Sie die Filteranzahl und die Kontrollen, bevor Sie annehmen, dass Sie alles suchen.

## Wenn ein Ergebnis fehlt {/* #when-a-result-seems-missing */}

Deaktivieren Sie Kategorie und andere Filter, überprüfen Sie das Besitzprojekt und suchen Sie nach einer unverwechselbaren Phrase oder dem gespeicherten Dateinamen. Verwenden Sie Archiviert, wenn Sie nach archivierten Arbeiten suchen. Ein Pfad, der in einer fehlgeschlagenen Werkzeugantwort gedruckt wird, ist kein gespeichertes Artefakt. Neu geänderte oder neu geordnete Inhalte erfordern möglicherweise eine Aktualisierung der Suche. Wenn eine Datei geöffnet wird, aber nicht in der Vorschau angezeigt werden kann, folgen Sie [Dateien](files.md) und [Fehlerbehebung](troubleshooting.md).

## Wechselsitzungen aus dem Tray {/* #tray-navigation */}

Öffnen Sie das Menü des **Open-Science**-Symbols in der macOS-Menüleiste, dem Windows-Tray oder einem Linux-Desktop mit Tablett-Unterstützung. Verwenden Sie **Running sessions**, um aktive Arbeit zu finden, **Pinned sessions** für angeheftete Gespräche oder **Recent items** für aktuelle Inhalte. Längere Listen werden unter **Weitere Posten** fortgesetzt. Nachdem Sie einen Eintrag ausgewählt haben, überprüfen Sie den Projekt- und Konversationstitel, der geöffnet wird.

Verwenden Sie **Pin** neben einem Gesprächstitel, um es handlich zu halten. **Show / Hide** verändert die Sichtbarkeit des Fensters; **Quit** verlässt die App. Das Wechseln von Gesprächen stoppt eine Aufgabe nicht. Die Verfügbarkeit des Linux-Symbols hängt von der Unterstützung des Tabletts ab. Siehe [Aussehen und Mitteilungen](appearance.md) für das Verhalten und die Warnungen bei Fensterschließungen.
