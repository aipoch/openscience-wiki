---
title: "Ersteinrichtung"
last_update:
  date: '2026-11-11'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Ersteinrichtung {/* #first-time-setup */}

Der First-Run-Assistent hat fünf Seiten in dieser Reihenfolge: Umgebung, Datenstandort, Agentenlaufzeit, Modellanbieter und Notebook Laufzeit. `Back` und die primäre Aktion unten bewegen sich zwischen den Seiten. Die primäre Aktion bleibt solange nicht verfügbar, bis die aktuelle Seite ihre Anforderungen erfüllt.

<PlatformGuide />

Externe Agents können später in den [Agent-Einstellungen](frameworks.md) verwaltet und aktualisiert werden. Der integrierte **Open-Science Agent** ist in der App enthalten.

## 1. Umgebung {/* #1-environment */}

Beginnen Sie mit **Prepare environment**. Die App prüft Ihren Computer vor der Agent-Auswahl und der Modellverbindung. Lesen Sie Status und Erläuterung jeder Prüfung.

| Kontrolle oder Kontrolle | Was es bedeutet | Was zu tun ist |
| --- | --- | --- |
| Systemkompatibilität | Prüft das Betriebssystem und die Architektur | Bestätigen Sie, dass die erkannte Plattform mit Ihrem Computer übereinstimmt |
| App-Speicherberechtigung | Prüft den Schreibzugriff auf den Konfigurationsordner der App | Wenn es fehlschlägt, lösen Sie den Zugriff auf den angezeigten Pfad und überprüfen Sie erneut |
| Sichere Speicherung von Anmeldeinformationen | Prüft, ob das Betriebssystem-Zeugnis verfügbar ist | Beheben Sie das Problem mit dem Tresor, bevor Sie Anmeldeinformationen eingeben |
| Installationsnetzwerk | Prüft, ob der ausgewählte Agent einen Download benötigt und prüft bei Bedarf Paketquellen | Mit dem eingebauten Agent kann dieser melden, dass kein Download erforderlich ist; es testet Ihre Modellverbindung nicht |
| `Check again` | Wiederholt die Umweltprüfungen | Verwendung nach Festlegung einer Vorschrift; Das Etikett wird `Checking…` und der Button ist während der Überprüfung deaktiviert |
| `Continue` | Öffnet Datenstandort | Verfügbar nach dem erforderlichen Host-Checks bestanden; Es ist deaktiviert, während die Überprüfungen ausgeführt werden |

Offen **Environment** step, read all four rows, select **Check again**, und warten auf **All required environment checks passed.** Dann wählen **Continue**. Diese Umgebungsprüfung erfordert keinen API-Schlüssel oder einen kostenpflichtigen Modellaufruf; Modell-Authentifizierung wird später konfiguriert.

Wählen Sie einen stabilen Datenstandort mit genügend freiem Speicherplatz. Das Betriebssystem kann native Ordnerdialoge in seiner eigenen Sprache anzeigen, auch wenn die Anwendung Englisch verwendet.

Lesen Sie die Erklärung jedes Schecks neben seinem Status. Wenn ein Agent bereits installiert ist, erfordert die Überprüfung des Installationsnetzwerks möglicherweise keinen Download; Es bestätigt nicht den Zugang zu jedem externen Dienst.

<PlatformContent platform="macos">

![Umweltprüfungen, die während der erstmaligen Einrichtung von macOS abgeschlossen wurden](/img/open-science/v121/onboarding-environment.webp)

</PlatformContent>

<PlatformContent platform="windows">

![Umgebungsprüfungen während der erstmaligen Einrichtung von Windows](/img/open-science/windows/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="linux">

![Alle vier Umgebungsprüfungen wurden während der erstmaligen Einrichtung von Linux bestanden](/img/open-science/linux/setup-environment.webp)

</PlatformContent>

## 2. Datenspeicherort {/* #2-data-location */}

<PlatformContent platform="macos">

![Datenspeicherort vor der Auswahl eines Ordners](/img/open-science/walkthrough-2026-09-08/02-data-location.webp)

</PlatformContent>
Wählen Sie den Speicherort für große Dateien, bevor Sie Laufzeiten installieren. Artefakte, Notizbücher und Umgebungen verwenden den Datenstandort; Einstellungen und Historie verbleiben am Konfigurationsstandort. Der angezeigte Pfad ist eine schreibgeschützte Zusammenfassung, kein Textfeld.

| Kontrolle | Aktion und Ergebnis |
| --- | --- |
| `Location` / Datenortungspfad | Zeigt den effektiven Standard oder den vorgeschlagenen Datenordner an |
| `Browse…` | Öffnet den System Directory Picker. Wählen Sie einen übergeordneten Ordner; Überprüfen Sie den endgültigen App-verwalteten Pfad nach der Rückkehr |
| Systemwähler `Cancel` | Schließt den Picker, ohne die aktuelle Option zu ersetzen |
| `Use default location instead` | Erscheint nach einer benutzerdefinierten Wahl; löscht diese Wahl und die damit verbundenen Fehler |
| `Back` | Zurück zur Umwelt |
| `Continue` mit dem Standardstandort | Advances zur Agent Runtime |
| `Continue` nach Auswahl eines benutzerdefinierten Standorts | Öffnet `Restart to set up your data?`; Aktiviert den neuen Ordner nicht stillschweigend |
| `Retry` | Erscheint, wenn die Standardstandortinformationen nicht geladen werden konnten; Versuche, die noch einmal lesen |

<PlatformContent platform="macos">

![Benutzerdefinierte Eltern ausgewählt und endgültiger app-verwalteter Pfad angezeigt](/img/open-science/local-acceptance/data-location-selected.webp)

</PlatformContent>
Wählen Sie **Browse…** aus, wählen Sie einen leeren übergeordneten Ordner auf einer Festplatte mit genügend Speicherplatz aus und prüfen Sie den gesamten vom Assistenten angezeigten verwalteten Pfad. Wählen Sie **Continue** und lesen Sie die Neustartbestätigung. Verwenden Sie einen stabilen Standort für Forschungsdaten anstelle eines temporären Ordners.

<PlatformContent platform="macos">

![Neustartbestätigung für den ausgewählten Datenstandort](/img/open-science/local-acceptance/data-location-confirm.webp)

</PlatformContent>
| Bestätigungskontrolle | Ergebnis |
| --- | --- |
| Schließen ()`×`) | Kehrt zum Datenstandort zurück und behält den vorgeschlagenen Pfad bei |
| `Keep default` | Löscht den vorgeschlagenen Standort und Vorschüsse mit dem Standard |
| `Restart` | Aktiviert den ausgewählten Datenstandort und startet die App neu; Der Wizard wird zur Agent Runtime fortgesetzt |

Die App überprüft den Ordner, bevor sie ihn akzeptiert. Ein vorhandener erkannter Datenordner kann an Ort und Stelle übernommen werden; Die Seite erklärt, dass nichts bewegt wird. Eine unbrauchbare Auswahl zeigt einen Fehler an. Wenn die Aktivierung oder der Neustart fehlschlägt, kann die Seite einen Fehler anzeigen und einen Wiederholungsversuch oder den Standardspeicherort anbieten. Verschieben oder benennen Sie den von der App verwalteten Ordner nicht manuell um.

### Annehmen eines vorhandenen Datenordners {/* #adopt-an-existing-data-folder */}

1. Wählen Sie **Browse…** aus und wählen Sie das übergeordnete Element aus, das einen erkannten, von der App verwalteten Datenordner enthält.
2. Bestätigen Sie **This folder already contains Open Science data — it will be used as-is (nothing is moved).** Überprüfen Sie das vollständige Ziel und wählen Sie dann **Continue → Restart**.
3. Nach dem Relaunch wird der Wizard bei **Agent runtime** fortgesetzt. Der ausgewählte Datenort wird beibehalten; die verbleibenden Setup-Schritte fortsetzen.

Nach der Annahme öffnen Sie erneut repräsentative Dateien, um die erwarteten Daten zu bestätigen. Adoption ändert Large-File-Speicher; Es importiert nicht die Einstellungen, die Konversationsdatenbank oder die Anmeldeinformationen einer anderen Installation. **Keep default** löscht den vorgeschlagenen Standort und setzt mit dem vorherigen effektiven Standort fort.

### Wiederherstellen, wenn der Standort nicht gespeichert werden kann {/* #recover-when-the-location-cannot-be-saved */}

Wenn die Seite **Konnte den Speicher nicht beenden: EACCES: Erlaubnis verweigert** meldet, prüfen Sie den Pfad im Fehler. Das Konfigurationsverzeichnis muss auch beschreibbar sein; Die Auswahl eines beschreibbaren Datenziels allein kann es nicht lösen. Stellen Sie den Zugriff auf den betroffenen App-eigenen Konfigurationsstandort wieder her, wiederholen Sie dann den Vorgang oder wählen Sie **Use default location instead → Continue** aus.

<PlatformContent platform="macos">

![Tatsächliche Konfigurations-Schreibfehler- und Wiederherstellungskontrollen](/img/open-science/local-todo-batch/56-onboarding-config-write-error.webp)

</PlatformContent>
Wenn der Neustart fehlschlägt, bevor sich der Standort ändert, stellen Sie den Konfigurationsschreibzugriff wieder her und öffnen Sie den Assistenten erneut. Überprüfen Sie den aktiven Pfad und die vorhandenen Dateien, bevor Sie eine Bewegung erneut versuchen; siehe [Speicher](storage.md).

## 3. Agentenlaufzeit {/* #3-agent-runtime */}

Neue Einrichtungen verwenden standardmäßig den integrierten **Open-Science Agent**. Er ist in der App enthalten und unterstützt kompatible API-Anbieter sowie **Codex subscription**. Ein weiterer Agent muss für diesen Schritt nicht installiert werden.

1. Suchen Sie unter **Installed** nach **Open-Science Agent** und prüfen Sie, ob die Karte **Active** anzeigt.
2. Warten Sie auf **All required environment checks passed.** Beheben Sie bei einem Fehler die angezeigte Ursache und wählen Sie anschließend **Re-detect**.
3. Wählen Sie **Continue**, um **Model provider** zu öffnen. Verbinden und testen Sie dort das Modell, bevor Sie Anfragen senden.

<PlatformContent platform="macos">

![Integrierter Open-Science Agent mit Active; Continue ist verfügbar, die fünf externen Laufzeiten sind nicht installiert](/img/open-science/v121/onboarding-builtin-agent.webp)

</PlatformContent>

Die Versionsnummer gehört zur Laufzeit oder zum Adapter, nicht zum Modell. **Active** kennzeichnet die ausgewählte Laufzeit und bestätigt keine Modellverbindung. Für **Codex subscription** auf der nächsten Seite ist die separate **Codex**-Laufzeit nicht erforderlich.

<details>
<summary>Externen Agent wählen (optional)</summary>

Wenn Sie die Anbieterunterstützung oder das Verhalten von **Codex**, **Claude Agent**, **OpenCode**, **CodeBuddy** oder **Pi** benötigen, wählen Sie die entsprechende Laufzeit. Bei einer vorhandenen Installation wählen Sie **Re-detect** und dann deren Karte. Andernfalls öffnen Sie **Install**, wählen eine unterstützte Quelle und warten auf den Abschluss. Fahren Sie fort, sobald die Laufzeit **Active** ist und die erforderlichen Prüfungen bestanden sind.

Installationsquellen, Wechsel und Reparatur sind unter [Agent-Frameworks](frameworks.md) beschrieben. Die Laufzeit lässt sich auch nach der Einrichtung unter **Settings → Agent** ändern.

</details>

## 4. Modellanbieter {/* #4-model-provider */}

Das Formular hängt von **Provider type**, dem gewählten Agent und der Authentifizierungsmethode ab. Für ein Codex-Abonnement mit dem integrierten Agent wählen Sie **Codex subscription**. Ist auf diesem Computer bereits eine Codex-Anmeldung vorhanden, wählen Sie unter **Codex authentication** die Option **Import existing Codex sign-in** und anschließend **Test & continue**. Andernfalls wählen Sie eine unterstützte Anmeldemethode und folgen den Anweisungen; siehe [Anbietereinrichtung](providers.md#builtin-codex-subscription). Fahren Sie nach erfolgreicher Verbindungsprüfung fort.

<PlatformContent platform="macos">

![Englisches Codex-Abonnementformular vor Authentifizierung](/img/open-science/v121/onboarding-codex-provider.webp)

</PlatformContent>
Wählen Sie für einen API-Provider dessen Typ aus, geben Sie die von diesem Provider benötigten Endpunkt- und Modelldetails ein und verwenden Sie **Test & continue**. Der Wizard validiert die erforderlichen Felder, bevor er einen Test sendet. Ein erfolgreicher Test bringt den Assistenten voran; ein Validierungs- oder Verbindungsfehler zur Korrektur sichtbar bleibt.

<PlatformContent platform="macos">

![Benutzerdefiniertes Gateway mit erforderlichen Feldfehlern](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

</PlatformContent>
Siehe [Provider-Einrichtung](providers.md) für Authentifizierungsoptionen, erweiterte Felder und Wiederherstellung von Verbindungsfehlern.

Behalten Sie API-Schlüssel im dedizierten Anmeldefeld. Fügen Sie sie nicht in Screenshots, Projektanweisungen oder Konversationsnachrichten ein.

## 5. Notebook-Laufzeit {/* #5-notebook-runtime */}

Diese optionale letzte Seite verwendet die komplette **Settings → Runtimes**-Schnittstelle wieder. Standardmäßig verwenden Notebooks das app-verwaltete Python. Sie können einen erkannten Interpreter auswählen oder später eine andere Umgebung vorbereiten.

| Wizard Control oder State | Verhalten |
| --- | --- |
| **Back** | Zurück zum Model Provider. Deaktiviert während der Laufzeitbereitstellung oder während der Fertigstellung der Einrichtung. |
| **Finish** | Speichern Sie den Onboarding-Abschluss. Notebook-Setup ist optional, daher ist kein fertiger benutzerdefinierter Interpreter erforderlich. |
| Setup bereits im Gange | Warten Sie, bis es fertig ist oder stornieren Sie das Setup, bevor Sie gehen; **Back** und **Finish** Sie werden deaktiviert, um zu vermeiden, eine Teilumgebung zu verlassen. |
| Vollständigkeitsfehler | Zeigt den Fehler an und erlaubt einen weiteren Versuch. |

Nach **Finish**, bestätigen Home öffnet, dann verwenden Sie [Erstes Projekt](first-project.md) ein kleines Ergebnis zu speichern. Öffnen Sie die Anwendung erneut und überprüfen Sie, ob das Projekt verfügbar bleibt. Wenn das Setup erneut angezeigt wird, überprüfen Sie den Datenspeicherort und den Fehler beim Konfigurieren, bevor Sie ein anderes Profil erstellen.

<PlatformContent platform="windows">

Die Windows **Notebook runtime** Seite kann auch **Local Shell · WSL2 Bash Preview** anzeigen. Lesen Sie **Optional — nothing here is required to finish setup.** Sie können **Finish** wählen, während Python / R Setup verschoben wird und WSL2 nicht verfügbar ist. Bereiten Sie die erforderliche Laufzeit vor, bevor Sie die Codeausführung anfordern; Durch das Ausführen des Assistenten werden diese optionalen Umgebungen nicht installiert.

![Windows optionale Notebook und WSL2 Einstellungen mit Finish verfügbar](/img/open-science/windows/setup-optional-runtimes.webp)

</PlatformContent>

## Checkliste für die endgültige Einrichtung {/* #final-setup-checklist */}

| Überprüfung | Erwartete Beweise | Wenn es scheitert |
| --- | --- | --- |
| Umgebung | Erforderliche Kontrollen bestanden. | Überprüfen Sie erneut, nachdem Sie die angezeigte Anforderung behoben haben. |
| Datenspeicherort | Der endgültige verwaltete Pfad ist der beabsichtigte Standort. | Zurück zur Standortseite; Den endgültigen Pfad schlussfolgern Sie nicht allein vom Picker. |
| Agent | Die gewählte Laufzeit ist bereit und **Active**; der integrierte Agent benötigt keine separate Installation. | Beheben Sie die angezeigte Ursache und wählen Sie **Re-detect**. |
| Anbieter | Verifizierte Verbindung und ein ausgewähltes Hauptmodell. | Überprüfen Sie erneut die Anmelde- oder anbieterspezifischen Felder. |
| Notebook | Bereit und aktiviert, wenn Codeausführung erforderlich ist. | Konfigurieren **Settings → Runtimes** bevor eine Analyse angefordert wird. |
| Erste Aufgabe | Agent Response und inspizierbare gespeicherte Ausgabe. | Überprüfen Sie Berechtigungen und Toolfehler getrennt von der Modellverbindung. |





## Ändern Sie das Setup später {/* #change-the-setup-later */}

Du musst den Zauberer nicht wiederholen. Model, Agent, Runtimes und Storage-Map zu den gleichen Optionen. Wenn der Datenstamm beschädigt ist oder das Verzeichnis für die Anwendungskonfiguration nicht beschreibbar ist, zeigt Einstellungen → Speicher Reparaturaktionen an.

## Quelle: {/* #source-reference */}

[OnboardingWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [EnvironmentStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [LocationStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
