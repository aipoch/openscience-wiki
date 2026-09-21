---
title: "Persönliche Lesezeichen"
description: "Speichern Sie Passagen und PDF-Regionen für sich, fügen Sie Notizen hinzu und kehren Sie innerhalb einer Sitzung zu ihrer Quelle zurück."
last_update:
  date: '2026-09-20'
---

# Persönliche Lesezeichen {/* #private-reading-bookmarks */}

Verwenden Sie Lesezeichen, um eine Passage, die Sie erneut besuchen möchten, eine Tabelle, die Sie überprüfen müssen, oder eine Notiz zum späteren Lesen aufzubewahren. **For me** speichert eine private Leseaufzeichnung in der aktuellen Sitzung. **To Agent** bereitet eine Anmerkung für eine Anfrage vor; Das Speichern eines Lesezeichens sendet keine Nachricht oder fügt sie dem Agentenkontext hinzu.

## Speichern Sie eine Passage oder PDF Region {/* #save-a-passage-or-pdf-region */}

1. Öffnen Sie eine vorhandene gespeicherte Sitzung. Wählen Sie Text in einer Konversation oder eine unterstützte Textvorschau aus. Wählen Sie in einem PDF Text aus oder verwenden Sie die Regionsauswahlsteuerung, um den gewünschten Bereich zu markieren.
2. Öffnen Sie die Annotationssteuerung der Auswahl und wählen Sie **For me**.
3. Fügen Sie ein **Note (optional)** hinzu, z. B. "Überprüfen Sie den Nenner, bevor Sie diese Prozentsätze vergleichen." Wählen Sie **Bookmark**.
4. Öffnen Sie **Bookmarks** im Composer und bestätigen Sie den gespeicherten Eintrag. Wählen Sie es aus, um zu überprüfen, ob es zur beabsichtigten Passage oder PDF-Region zurückkehrt.

Lesezeichen werden verfügbar, nachdem die konversation gespeichert wurde. Wenn das Steuerelement nicht verfügbar ist, kehren Sie zu einer vorhandenen Sitzung zurück, bevor Sie es erneut versuchen. Nicht jeder eingebettete oder extern geöffnete Viewer unterstützt die Textauswahl für Lesezeichen.

## Zurückgeben, Bearbeiten oder Entfernen {/* #return-edit-or-remove */}

Öffnen Sie die **Bookmarks**-Liste der Sitzung und wählen Sie einen Eintrag aus, oder verwenden Sie **Show bookmark source**. Bei einer verwalteten Datei öffnet das Lesezeichen die gespeicherte Dateiversion, auf die es verweist. Überprüfen Sie die Seite, Passage und Version, wenn Sie sie mit einem neueren Ergebnis vergleichen.

Wählen Sie **Edit bookmark note** aus der Liste oder den persistenten Marker neben der Passage, bearbeiten Sie die Notiz und wählen Sie **Save**. **Cancel** lässt die gespeicherte Note unverändert. **Delete bookmark** entfernt das Lesebuchzeichen; Es löscht nicht die Quellnachricht oder Datei.

Wenn die Quelle nicht verfügbar ist oder der genaue Standort nicht gefunden werden kann, verwenden Sie die angezeigte Nachricht, um diese Fälle zu unterscheiden. Suchen Sie die Quelle manuell, bevor Sie das Lesezeichen ersetzen; Gehen Sie nicht davon aus, dass der nächste sichtbare Text die ursprüngliche Auswahl ist.

## Was privat bleibt und was geteilt wird {/* #what-stays-private-and-what-is-shared */}

- Lesezeichen und Notizen bleiben bestehen, wenn Sie die Sitzung nach dem Neustart der App erneut öffnen.
- Sie gehören zu dieser Sitzung. Sie übertragen sich nicht in einen anderen Zweig oder synchronisieren zwischen den Maschinen, und das Löschen der Sitzung entfernt seine Lesezeichen.
- [.science-Forschungspakete](research-packages.md) schließt diese privaten Lesezeichen aus. Setzen Sie die Informationen, die ein Kollege benötigt, in einen gespeicherten Bericht oder das Gespräch ein, bevor Sie eine Übergabe vorbereiten.
- Um den Agenten nach einer Passage zu fragen, verwenden Sie **To Agent** und überprüfen Sie die Anmerkung im beabsichtigten Entwurf, bevor Sie sie senden. Bewegliche Anmerkungen zwischen Main und einer Nebendiskussion werden in [Side Chat](delegation.md) behandelt.

## Lesezeichen in einer Gabel {/* #bookmarks-in-fork */}

Von v0.31.0 kopiert [Gabel](sessions.md#fork-session) private Lesezeichen und Notizen mit neuen Identitäten in die neue Sitzung. Spätere Bearbeitungen in der Kopie bearbeiten die Quell-Lesezeichen nicht. Dies unterscheidet sich vom Wechseln von Zweigen oder dem Exportieren einer `.science`-Datei: Private Bookmarks schließen sich immer noch nicht dem Paketexport an oder synchronisieren sich maschinenübergreifend.
