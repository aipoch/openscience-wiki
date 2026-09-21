---
title: "Aussehen und Meldungen"
last_update:
  date: '2026-09-16'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import PreferenceScreenshot from '@site/src/components/PreferenceScreenshot';
import Screenshot from '@site/src/components/Screenshot';

# Aussehen und Meldungen {/* #appearance-and-notifications */}

Wählen Sie ein komfortables Thema, legen Sie Ihre Benutzeroberflächensprache fest und erhalten Sie Aufgabenbenachrichtigungen, während Sie in einer anderen App arbeiten. Öffnen Sie **Settings → General**, um diese Einstellungen anzupassen. Open-Science erinnert sich an Ihre Aussehensauswahl auf diesem Gerät.

<PlatformGuide />

## Change Theme und Interface Language {/* #change-theme-and-interface-language */}

1. In **General → Appearance** finden Sie **Theme**.
2. Wählen Sie **System**, um Ihrem Gerät zu folgen, oder wählen Sie **Light** oder **Dark**, um ein festes Erscheinungsbild beizubehalten. Sie können jederzeit wieder umschalten.
3. Wählen Sie unter **Language** Ihre bevorzugte Schnittstellensprache oder **System**, um die Gerätesprache zu verwenden.

<PlatformContent platform="macos">

![Allgemeine Aussehenseinstellungen](/img/open-science/v0.27.0/07-general-appearance.webp)

</PlatformContent>

<PlatformContent platform="windows">

<Screenshot src="/img/open-science/windows/general-settings.webp" alt="Themen- und Sprachsteuerungen in Windows Allgemeine Einstellungen" width={1920} height={1017} windowBounds={[480, 165, 960, 690]} href="/docs/img/open-science/windows/general-settings.webp" linkLabel="Öffnen Sie den kompletten Screenshot der Windows-Einstellungen" />

</PlatformContent>

| Wahlmöglichkeit | Was sich ändert |
| --- | --- |
| Thema → System | Die App folgt der Hell-Dunkel-Einstellung des Geräts. |
| Thema → Licht / Dunkel | Das ausgewählte Theme bleibt festgelegt, wenn sich das Systemtheme ändert.  |
| Sprache: System | Die App liest die Gerätesprache beim Start. Nachdem Sie die Systemsprache geändert haben, öffnen Sie die App erneut, um sie anzuwenden. |
| Eine bestimmte Sprache | Die app verwendet diese schnittstellensprache. Gespeicherte Eingabeaufforderungen, Quelldateien und frühere Modellantworten behalten ihren Originaltext. |

Sprach- und Theme-Präferenzen sind in **Settings → General → Appearance**. Die Dokumentations-Website verfügt über einen eigenen Sprachselektor; Ändern es lässt die sprache der app unverändert. Systemdateidialoge folgen Ihren Betriebssystemeinstellungen.

Um einen Bericht in einer anderen Sprache anzufordern, geben Sie dies in Ihrem Gespräch an. Zum Beispiel: "Schreiben Sie den Bericht auf Englisch und bewahren Sie die ursprünglichen Gen-Identifikatoren auf."

<PlatformContent platform="windows">

**Anzeigenskalierung in Windows anpassen**

1. Öffnen Sie Windows **Settings → System → Display** und finden Sie **Maßstab und Layout**. Notieren Sie sich die aktuelle Skala, damit Sie sie wiederherstellen können.
2. Wählen Sie eine komfortable Text- und App-Größe, z. B. **125%**.
3. Kehren Sie zu Open-Science zurück und überprüfen Sie den Composer und die Vorschau. Eine breitere Tabelle kann ihre horizontale Scrollleiste erfordern; Verbreitern Sie die Vorschau oder maximieren Sie das Fenster bei Bedarf.
4. Um die Änderung rückgängig zu machen, kehren Sie zu den Anzeigeeinstellungen zurück und wählen Sie die ursprüngliche Skala aus. Wenn Windows einen App-Neustart anfordert, speichern Sie Ihre Arbeit, bevor Sie sie erneut öffnen.

Der gleiche Bericht bleibt im größeren Maßstab lesbar. Verwenden Sie die horizontale Scrollleiste, um Spalten außerhalb des aktuellen Tabellenansichtsports zu sehen; Die Anzeigeskala ändert die Ansicht, nicht die gespeicherten Daten.

![Open-Science bei 125 Prozent Skalierung mit einer horizontalen Scrollleiste in der Tabellenvorschau](/img/open-science/windows/app-scale-125.webp)

</PlatformContent>

## Aufgabenmeldungen einrichten {/* #set-up-task-notifications */}

Aktivieren Sie Benachrichtigungen, wenn Sie eine laufende Analyse verlassen und zurückkehren möchten, wenn sie Aufmerksamkeit benötigt.

1. Schalten Sie in **General → Notifications** **Task notifications** ein.
2. Wählen Sie, ob **Show task content in system notifications** aktiviert werden soll. Lassen Sie es aus, wenn Aufgabennamen oder Anforderungsdetails aus den Systembenachrichtigungen herausgehalten werden sollten.
3. Lesen Sie **System notification status** und wählen Sie dann **Send test notification**, wenn verfügbar. Lassen Sie Benachrichtigungen im Betriebssystem zu, wenn Sie aufgefordert werden.
4. Überprüfen Sie den zurückgegebenen Teststatus und die Benachrichtigungsoberfläche Ihres Systems. Wechseln Sie bei Aufgabenbenachrichtigungen zu einer anderen App, während die Aufgabe ausgeführt wird.

<PlatformContent platform="macos">

<PreferenceScreenshot notifications />

</PlatformContent>

| Kontrolle | Wirkung |
| --- | --- |
| Aufgabenbenachrichtigungen | Aktiviert Warnungen zum Abschluss von Aufgaben, zum Ausfall oder zu einer Genehmigungsanforderung, während Sie eine andere App verwenden. Schalten Sie es aus, um diese Task-Warnungen zu stoppen. |
| Aufgabeninhalte in Systembenachrichtigungen anzeigen | Enthält Aufgabennamen und Anforderungsdetails, wenn aktiviert. Fehler des Anbieters bleiben verborgen. Dieses Steuerelement ist deaktiviert, wenn die Aufgabenbenachrichtigungen deaktiviert sind. |
| Status der Systembenachrichtigungen | Gibt an, ob dieses Gerät Systembenachrichtigungen unterstützt. |
| Testbenachrichtigung senden | Sendet eine Testanfrage. Der Button zeigt **Sending test…** während der Anfrage und wird während des Sendens deaktiviert oder wenn Systembenachrichtigungen nicht verfügbar sind. |
| Eine übergebene Aufgabenmeldung | Wählen Sie es aus, um Open-Science nach vorne zu bringen, und öffnen Sie die zugehörige Aufgabe. |

Abgebrochene Aufgaben und Fehler, die die App automatisch wiederholt, bleiben still. **Messages** in Home oder Workspace ist ein In-App-Eintrag; Die OS-Benachrichtigungsberechtigung wird separat verwaltet.

### Zurück zu einer Aufgabe aus einem Systemalarm {/* #return-to-a-task-from-a-system-alert */}

<PlatformContent platform="macos">

Wählen Sie einen Abschluss- oder Genehmigungsalarm aus, um zu seiner Konversation zurückzukehren. Wenn Sie das Banner verpasst haben, finden Sie Open-Science im macOS Notification Center. Erweitern Sie zuerst einen gruppierten Stapel und wählen Sie dann die spezifische Warnung aus. Eine Genehmigungswarnung öffnet die Aufgabe; Lesen und Beheben der Anfrage innerhalb der App.

</PlatformContent>

<PlatformContent platform="windows">

1. Aktivieren Sie **Task notifications** und verwenden Sie eine Testbenachrichtigung, um die Systemberechtigung zu überprüfen.
2. Senden Sie eine Aufgabe und wechseln Sie dann zu einer anderen App. Wählen Sie seine **Task completed** oder **Approval needed** Warnung, wenn es ankommt.
3. Zurück in Open-Science, überprüfen Sie die Konversation und die ursprüngliche Anforderung. Eine Abschlussausschreibung sollte zu ihrem endgültigen Ergebnis führen; Eine Genehmigungsbenachrichtigung öffnet die ausstehende Anforderung, bei der Sie weiterhin **zulässig** oder **Deny** auswählen müssen. Durch die Auswahl der Benachrichtigung wird die Ausführung nicht genehmigt.

Wenn Sie das Banner verpasst haben, finden Sie die Warnung im Windows Notification Center. Wenn keine Warnung angezeigt wird, aktivieren Sie das Windows-Banner und Stören Sie die Einstellungen nicht. Wenn sie zu home zurückkehren, öffnen sie die ursprüngliche konversation über **Recent sessions**. Der Notifizierungstext ersetzt nicht die Überprüfung des tatsächlichen Ergebnisses.

</PlatformContent>

<PlatformContent platform="macos">

![Englischer Systemabschlussalarm mit versteckten Aufgabendetails](/img/open-science/priority-completion/07-system-completion-notification.webp)

</PlatformContent>
Schalten Sie **Show task content in system notifications** aus, um generische Alarme zu verwenden. Wählen Sie einen Abschluss- oder Genehmigungsalarm aus, um das Gespräch wieder zu öffnen; Reagieren Sie auf Genehmigungen innerhalb der App.

### Wenn eine Benachrichtigung nicht erscheint {/* #if-a-notification-does-not-appear */}

Beginnen Sie mit dem Testergebnis und überprüfen Sie dann die geltende Bedingung.

| Ergebnis oder Symptom | Was als nächstes zu überprüfen ist |
| --- | --- |
| **Test notification shown.** | Die App berichtet, dass der Test erschienen ist. Überprüfen Sie die OS-Benachrichtigungsoberfläche; ein Testalarm von einem realen Aufgabenereignis getrennt ist. |
| **Test notification sent, but display could not be confirmed.** | Überprüfen Sie die Systembenachrichtigungsberechtigung und ob das Betriebssystem Banner unterdrückt. Die Lieferung wurde nicht bestätigt. |
| **Test notification failed.** | Überprüfen Sie die Benachrichtigungsberechtigung der App in den Systemeinstellungen und wiederholen Sie dann den Test. Wenn es immer noch fehlschlägt, sammeln Sie den Fehler durch [Fehlerbehebung](troubleshooting.md). |
| **System notifications are unavailable on this device.** | Die Testkontrolle steht nicht zur Verfügung. Überwachen Sie die Aufgabe im Arbeitsbereich. |
| Test funktioniert, aber eine Aufgabe sendet keine Warnung | Bestätigen Sie, dass die Aufgabenbenachrichtigungen aktiviert sind, Sie eine andere App verwenden und das Ereignis der Abschluss, der Ausfall oder eine Genehmigungsanfrage ist. Stornierungen und automatische Wiederholungen alarmieren nicht. |
| Keine Warnung während der Aufzeichnung, des Teilens oder des Spiegelns | Überprüfen Sie, ob das System während der Aufzeichnung oder Freigabe Benachrichtigungen zulässt, und überprüfen Sie Fokus oder Stören Sie nicht. Aktivieren Sie dies nur, wenn Sie beabsichtigen, dass Warnungen sichtbar sind; Sie können in der Aufzeichnung erscheinen. |
| Alarm kommt ohne Aufgabendetails | Überprüfen Sie Aufgabeninhalte in Systembenachrichtigungen anzeigen. Halten Sie es aus, wenn Sie es vorziehen, diese Details zu verbergen. |

<PlatformContent platform="windows">

### Rückkehr aus dem Tablett nach dem Schließen des Fensters {/* #return-from-the-tray-after-closing-the-window */}

Mit **General → Close button behaviour → Ask every time** öffnet das Schließen des Fensters **Minimize or quit?** Wählen Sie **Minimize to tray**, um das Fenster auszublenden, und verwenden Sie dann das Open-Science-Symbol im Windows-Tray, um zurückzukehren. Wählen Sie **Frag nicht noch einmal** nur, wenn Sie diese Option beibehalten möchten; Ändern Sie es später im Allgemeinen. Die Minimierung beendet die App nicht.

</PlatformContent>

## Finden Sie verwandte Einstellungen {/* #find-related-settings */}

| Sie wollen... | Wohin zu gehen |
| --- | --- |
| Suchen Sie nach einem App Update | **General → About → Check now**; Folge [Installation und Aktualisierungen](installation.md#choose-a-reproducible-version-and-update-deliberately). |
| Versionsänderungen lesen oder Hilfe erhalten | **About → Release notes / Help Center** öffnet die entsprechende externe Seite. Dieses Wiki hat auch eine [Changelog](../changelog/v0.31.1.md). |
| Suchen oder öffnen Sie das Diagnoseprotokoll | **General → Diagnostics → Reveal / Open**; siehe [Fehlerbehebung](troubleshooting.md). Logs bleiben lokal, bis Sie sie teilen. |
| Installieren Sie den Befehlszeileneintrag | **General → Install command**; siehe [CLI Referenz](../reference/cli.md). Die Desktop-Nutzung erfordert diesen Befehl nicht. |
| Verwalten des Datenstandorts oder der archivierten Arbeit | [Lagerung und archivierte Arbeiten](storage.md). |

<span id="verification-scope" />

## Benachrichtigungseinstellungen im Betriebssystem {/* #notification-settings-in-the-operating-system */}

Die Benachrichtigungszustellung hängt auch von den Berechtigungen des Betriebssystems, dem Fokusmodus und den Einstellungen für die Bildschirmfreigabe ab. Verwenden Sie die oben genannten Prüfungen auf dem Gerät, auf dem Sie arbeiten.


Quelle: [Allgemeine Einstellungen](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/GeneralPanel.tsx).
