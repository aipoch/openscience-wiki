---
title: "Tastenkürzel"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import Screenshot from '@site/src/components/Screenshot';

# Tastenkürzel {/* #keyboard-shortcuts */}

Tastatur-Aktionen hängen vom Fokus ab. Ein Schlüssel, der Text im Composer bearbeitet, kann durch eine Ergebnisliste navigieren oder eine Vorschau schließen, wenn ein anderes Steuerelement fokussiert ist. Lesen Sie die sichtbare Verknüpfung und die ausgewählte Oberfläche, bevor Sie sie während einer laufenden Aufgabe verwenden.

<PlatformGuide />

## Suche und Navigation {/* #search-and-navigate */}

| Aktion | macOS | Windows/Linux | Fokus und Ergebnis |
| --- | --- | --- | --- |
| Open App Suche | &lt;0xE2>&lt;0x8C>&lt;0x98>K | Strg + K | Suchprojekte, Sitzungen, Nachrichten, Dateien und Literatur; siehe [Suchumfang](navigation.md) |
| Suche innerhalb von Settings | &lt;0xE2>&lt;0x8C>&lt;0x98>K | Strg + K | Während die Einstellungen geöffnet sind, fokussieren Sie die Header-Suche; siehe [Einstellungen Übersicht](../settings/overview.md) |
| Bewegen Sie sich durch Suchergebnisse | Aufwärts/Abwärts | Aufwärts/Abwärts | Befehlspalette: Verschieben Sie das Highlight |
| Erstes / letztes Ergebnis | Home / Ende | Home / Ende | Suchergebnis-Navigation, wenn sie von der Palette gehandhabt wird |
| Offenes ausgewähltes Ergebnis | Enter | Enter | Überprüfen Sie die Ergebnisdetails und öffnen Sie dann die übereinstimmende Nachricht, Datei oder Aufzeichnung |
| Nähere Suche/Menü | Esc | Esc | die aktive Überlagerung zu entfernen; nicht gespeicherte Formulare können ihre eigene Bestätigung haben |
| Fokus verschieben | Tab / Shift + Tab | Tab / Shift + Tab | Vorwärts/Rückwärts durch aktivierte Steuerungen |

Öffnen Sie die App-Suche mit der Verknüpfung für Ihre Plattform und geben Sie eine Phrase, einen Titel oder einen Dateinamen ein. Wählen Sie ein Ergebnis aus, überprüfen Sie dessen Kontext im Detailbereich und öffnen Sie dann den passenden Inhalt. Verwenden Sie den Quellnachrichteneintrag, um den Kontext einer Datei zu finden. Siehe [Navigation](navigation.md) für Filter und Suchumfang; Die separate suche des wikis enthält den text des dokumentationskörpers.

## Zusammenstellung und Referenzeingaben {/* #compose-and-reference-inputs */}

| Eingabe | Wo man es verwenden kann | Prüfung vor Fortführung |
| --- | --- | --- |
| `@` | Komponist | Wählen Sie eine aktuelle Datei / Artefakt / Referenzvorschlag; Klartext allein bindet keine Datei |
| `/` | Komponist | Wählen Sie eine verfügbare Skill; sein Aussehen stellt nicht alle Laufzeitvoraussetzungen fest |
| `#` | Komponist | Wählen Sie die beabsichtigte Session-Transkript-Referenz aus |
| Aufwärts/Abwärts | Leerer Komponist am Start | Überprüfen Sie die Wiederherstellung der prompten Geschichte und Anhänge vor dem erneuten Senden |
| &lt;0xE2>&lt;0x8C>&lt;0x98>Z / STRG + Z | Fokussierter Texteditor | Undo den Entwurf Edit von diesem Editor behandelt |
| &lt;0xE2>&lt;0x8C>&lt;0x98>Shift+Z / Strg+Shift+Z | Konzentrierter Komponist | Redo ein Draft Edit, wo unterstützt |
| Angezeigtes Send Shortcut | Komponist | Sie stellt den Antrag; Verwenden Sie die Schaltfläche Senden, wenn Sie sich über einen Mehrzeilenentwurf unsicher sind |

<PlatformContent platform="windows">

Klicken Sie in der Windows-Desktop-App auf den Composer-Entwurf, bevor Sie **Strg+Z** zum Rückgängigmachen oder **Strg+Umschalt+Z** zum Wiederholen verwenden. Überprüfen Sie den resultierenden Text, bevor Sie fortfahren oder senden. Wenn Sie **Tab / Shift + Tab** verwenden, suchen Sie nach dem Umriss des fokussierten Steuerelements, z. B. nach der unten stehenden Anlagetaste. Bestätigen Sie den Fokus erneut nach dem Öffnen eines Panels oder Ändern des Status eines Steuerelements; Verlassen Sie sich nicht auf eine feste Anzahl von Tastendrücken.

<Screenshot
  src="/img/open-science/windows/keyboard-attachment-focus.webp"
  alt="Der Attachment-Button hat eine sichtbare Tastatur-Fokussierung im Windows Composer"
  width={1916}
  height={1014}
  windowBounds={[215, 850, 920, 150]}
  href="/docs/img/open-science/windows/keyboard-attachment-focus.webp"
  linkLabel="Öffnen Sie den kompletten Windows-Screenshot mit Attachment-Button-Fokus"
/>

Das Detail zeigt die Fokusumrisse und den Tooltip der Attachment-Taste. Wählen Sie das Bild aus, um den kompletten Screenshot zu öffnen.

</PlatformContent>

Verwenden Sie keine generische Undo-Verknüpfung als Ersatz für die Wiederherstellung eines gelöschten Artefakts oder die Rückgängigmachung des ausgeführten Codes. Ein Archiv-Undo-Hinweis, wenn angeboten, ist eine separate Aktion von Text-Editor undo. Verwenden Sie [Archiviert](storage.md), um die zurückgehaltene Arbeit wiederherzustellen, nachdem die Benachrichtigung verschwunden ist.

## Arbeiten mit Previews und Warteschlangen {/* #work-with-previews-and-queues */}

Fokussieren Sie eine Vorschau-Registerkarte, bevor Sie **Links/Rechts** verwenden, um zwischen Tabs zu wechseln, oder **Home/Ende**, um die erste / letzte Registerkarte auszuwählen. **Löschen/Backspace** auf einer fokussierten Vorschau-Registerkarte schließt diese Registerkarte; Es löscht die Quelldatei nicht. In einem editierbaren Bericht bearbeiten diese Schlüssel stattdessen Text. Verwenden Sie die sichtbare Nahsteuerung, wenn der Fokus unsicher ist.

Ein fokussierter **Side Chat**-Tab hat eine destruktive Bestätigung: Die Bestätigung stoppt den Chat und löscht die gespeicherte Konversation. Verwenden Sie **Cancel** oder brechen Sie den Vorschaubereich zusammen, um ihn beizubehalten. Siehe [Side Chat](delegation.md).

Konzentrieren Sie in einer Warteschlange den Reorder-Handle, drücken Sie **Raum**, um ihn abzuholen, verwenden Sie **Auf/Abwärts**, um ihn zu verschieben, und drücken Sie **Raum** erneut, um ihn fallen zu lassen. Lesen Sie die resultierende Bestellung vor dem Senden. Dies ist nicht dasselbe wie das Bewegen zwischen Suchergebnissen oder das Durchsuchen des Composerverlaufs. Warteschlangenbearbeitung / -entfernung und verzögerte Lieferung werden in [Gespräche](composer.md) beschrieben.

### Größe ändern, ohne offene Dateien zu verlieren {/* #resize-without-losing-open-files */}

Ziehen Sie den Trenner neben die Vorschau, um seine Breite zu ändern. **Collapse preview panel** verbirgt es; **Expand preview panel** stellt die offenen Tabs wieder her. Die geöffneten Tabs bleiben nach dem Einsturz/Erweitern verfügbar. Verwenden Sie eine fokussierte Registerkarte für Navigationsschlüssel; Das Eingeben in einen Dateieditor hat unterschiedliche Auswirkungen.

## Wenn eine Abkürzung nicht reagiert {/* #if-a-shortcut-seems-unresponsive */}

Überprüfen Sie, welches Feld oder Dialogfeld den Fokus besitzt, schließen Sie nicht verwandte Overlays und versuchen Sie den sichtbaren Button. Unter macOS erfordern einige Home/End-Tasten die Fn-Kombination der Tastatur. OS/Browser-Verknüpfungen können Tasten abfangen, bevor die App sie sieht. Das Desktop-Fenster und der Browser-Eingangspunkt müssen daher nicht jeden Schlüssel identisch behandeln.

Quellen: [Global Search Keyboard Handling](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx), [Vorschau-Tabs](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/PreviewPanel.tsx), [Warteschlange](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx).

## Suchen Sie innerhalb des aktuellen Einstellungsfensters {/* #local-settings-search */}

In den Einstellungen konzentriert **&lt;0xE2>&lt;0x8C>&lt;0x98>K** (macOS) oder **Strg + K** (Windows/Linux) die Headersuche auf die Einstellungen. **&lt;0xE2>&lt;0x8C>&lt;0x98>&lt;0xE2>&lt;0x8C>&lt;0xA5>K** oder **Strg+Alt+K** fokussiert das berechtigte Suchfeld im aktuellen Panel oder Dialog. Die lokale Verknüpfung benötigt ein verfügbares lokales Suchfeld; Es öffnet keine anwendungsweite Suche oder PDF-Textsuche.
