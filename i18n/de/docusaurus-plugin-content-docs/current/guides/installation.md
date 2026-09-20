---
title: "Installation und Aktualisierungen"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Installation und Aktualisierungen {/* #installation-and-updates */}

Die meisten Benutzer sollten das Desktop-Paket von GitHub Releases installieren. Mitwirkende oder alle, die den neuesten code testen, können die app von der quelle aus ausführen. Open-Science ist eine Elektronenanwendung; Der Renderer unterstützt auch den tokengeschützten lokalen Browserzugriff.

<PlatformGuide />

## Wählen Sie eine Installationsmethode {/* #choose-an-installation-method */}

### Download eines Desktop-Installationsprogramms {/* #install-the-desktop-app */}

1. Öffnen Sie [Open-Science Releases](https://github.com/aipoch/open-science/releases).
2. Laden Sie das Paket herunter, das zu Ihrem Betriebssystem und Ihrer CPU-Architektur passt.
3. Lesen Sie die vom Installateur angezeigte Lizenz und schließen Sie die Installation ab, starten Sie dann die App. Ein fünfstufiger Setup-Assistent öffnet sich beim ersten Durchlauf.
4. Wenn das Betriebssystem eine nicht signierte App blockiert, laden Sie sie erneut aus dem offiziellen AIPOCH GitHub-Repository herunter und folgen Sie der Sicherheitsaufforderung der Plattform erst nach Überprüfung der Quelle.

Wählen Sie aus dem **Vermögenswerte**, das an das Release angehängt ist, und nicht aus dem automatisch generierten Quellcode ZIP. Die Verfügbarkeit hängt von den veröffentlichten Assets dieser Veröffentlichung ab.

<PlatformContent platform="macos">

| Computer | Identifizieren Sie die Architektur | Paket und Installation |
| --- | --- | --- |
| macOS, Apple Silicon | Über diesen Mac zeigt einen Apple M-Serie Chip | Wählen Sie `mac-arm64.dmg`; Öffnen Sie es, ziehen Sie die App zu Anwendungen, dann starten Sie es dort |
| macOS, Intel | Über diesen Mac zeigt einen Intel-Prozessor | Wählen Sie `mac-x64.dmg`; Installieren in Anwendungen. Die App benötigt macOS 12 oder höher |

**Installieren Sie mit Homebrew**

Sie können auch mit Homebrew installieren:

~~~bash
brew install --cask open-science
~~~

Homebrew wählt Apple Silicon oder Intel automatisch aus. Öffnen Sie nach der Installation **Settings → General → About** und bestätigen Sie die installierte Version; Ein Paketmanager kann ein neueres Release als die Dokumentations-Baseline auflösen. [Tags Installationsanweisungen](https://github.com/aipoch/open-science/blob/v0.27.0/README.md).

</PlatformContent>

<PlatformContent platform="windows">

| Computer | Identifizieren Sie die Architektur | Paket und Installation |
| --- | --- | --- |
| Windows | Einstellungen → System → Über → Systemtyp | Wählen Sie das Matching `win-…-setup.exe`; Führen Sie den aktuellen Benutzer-Installer aus und folgen Sie seinen Standortaufforderungen |

1. Öffnen Sie das heruntergeladene Windows-Installationsprogramm und gehen Sie zur Seite Installationsort.
2. Behalten Sie den Standardspeicherort bei oder wählen Sie **Browse…**, um einen Ordner für die Anwendung auszuwählen, und wählen Sie dann **Install**.
3. Warten Sie auf die Abschlussseite. Lassen Sie die Startoption ausgewählt und wählen Sie **Finish**, um Open-Science zu öffnen.
4. Folgen Sie [Ersteinrichtung](onboarding.md), um die Umgebung zu überprüfen und den Datenstandort, den Agenten und das Modell zu konfigurieren.

</PlatformContent>

<PlatformContent platform="linux">

| Computer | Identifizieren Sie die Architektur | Paket und Installation |
| --- | --- | --- |
| Ubuntu / Debian | `uname -m`: `x86_64` bedeutet x64, `aarch64` bedeutet ARM64 | Wählen Sie das Matching `.deb`, öffnen Sie es mit dem Systempaket-Installer und starten Sie dann aus dem Anwendungsmenü |
| Andere unterstützte Linux-Distributionen | Überprüfung `uname -m` | Wählen Sie das Matching `.AppImage`Erlauben Sie die Ausführung in den Berechtigungen der Datei und öffnen Sie sie dann; Beheben Sie alle Abhängigkeitsfehler, die von der Verteilung gemeldet wurden |

</PlatformContent>

Der Installationsordner enthält die Anwendung; **Data location** im Einrichtungsassistenten enthält Forschungsdateien und Laufzeitumgebungen. Beide Speicherorte werden getrennt festgelegt. Fahren Sie nach der Installation mit der [Ersteinrichtung](onboarding.md) fort.

### Laufen aus der Quelle {/* #run-from-source */}

Sie benötigen Git, Node.js 22, npm und die Plattformbauvoraussetzungen für Electron. Installieren oder wählen Sie ein Agent-Framework in der Anwendung aus. Während der Installation generiert das Repository den Prisma Client, wendet App-Patches an und bereitet native Electron-Abhängigkeiten vor.

Wählen Sie für eine reproduzierbare Quellinstallation das vorgesehene Release-Tag aus [Changelog](../changelog/v0.31.1.md), bevor Sie Abhängigkeiten installieren. Ein Standardklon folgt dem Branch und nicht einem festen Release. Notieren Sie die ausgewählten Tag-, Source-Commit- und Runtime-Versionen, damit eine andere Person die Umgebung reproduzieren kann.

Ersetzen Sie `RELEASE_TAG` unten durch das genaue Tag, das auf dem ausgewählten Release angezeigt wird (einschließlich des führenden `v`). Um der laufenden Entwicklung zu folgen, lassen Sie stattdessen `--branch RELEASE_TAG --depth 1` weg; Dieser Checkout folgt dem Default Branch.

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

Vor dem Verpacken eines Produktions-Builds führen Sie Folgendes aus:

```bash
npm run build
```

`npm run build` überprüft TypeScript und erstellt dann den Electron-Renderer, das Preload und die Hauptziele. Wenn Sie nur den Web- oder Headless-Einstiegspunkt testen müssen, verwenden Sie die vorhandenen Headless-Argumente des Repositorys mit einem separaten Datenverzeichnis. Dadurch werden Testdaten aus dem Standardspeicher ferngehalten.

## Vollständige Ersteinrichtung {/* #complete-first-time-setup */}

### Externe Dienste und Laufzeiten {/* #external-services-and-runtimes */}

| Leistungsfähigkeit | Erforderlich? | Zweck |
| --- | --- | --- |
| OpenCode, Claude Agent, Codex oder CodeBuddy | Mindestens eine | Führt Gesprächsagentensitzungen durch |
| Zugang zu Modellen | Erforderlich für Agentenanfragen | Ein unterstütztes Abonnement oder API-Anbieter; Der Abonnementzugriff erfordert keinen separaten API-Schlüssel |
| Python oder R | Fakultativ | Läuft Notebook-Code aus; Verwenden einer erkannten Systemumgebung oder einer App-verwalteten Umgebung |
| Netzwerkzugriff | Empfohlen | Installiert Laufzeiten und verbindet Anbieter, GitHub, Remotedienste und MCP Connectors |
| SSH-Host | Fakultativ | Führt Remote-Jobs aus und ruft Ergebnisse über das Compute-Panel ab |

### Lokale Daten {/* #local-data */}

Der Setup-Assistent zeigt den verwalteten Datenspeicherort für große Forschungsdateien wie Artefakte, Notebook-Dateien und Umgebungen an. Anwendungseinstellungen und Konversationshistorie bleiben am Konfigurationsort. Das Verschieben des Forschungsdatenstandorts ist kein vollständiges Anwendungs-Backup. Halten Sie es vom Quell-Repository getrennt; Verwenden Sie [Speicher](storage.md), um es zu verschieben, anstatt interne Dateien manuell zu verschieben, während die App ausgeführt wird.

## Bestätigen Sie, dass die App bereit ist {/* #installation-is-complete-when */}

Die Anwendung wird geöffnet, die erforderlichen Umgebungsprüfungen werden bestanden, ein Agent wird installiert und der Modellzugriff wird überprüft. Python/R-Setup ist zusätzlich nur für Arbeiten erforderlich, die diese Sprachen ausführen. Das Öffnen einer CSV- oder PDF-Vorschau validiert keine Notebook-Laufzeit. Folgen Sie [Ersteinrichtung](./onboarding.md), dann [Anbieter und lokales Modell-Setup](./providers.md).

## Überprüfen Sie nach Anwendungsupdates {/* #choose-a-reproducible-version-and-update-deliberately */}

Lesen Sie in **Settings → General → About** die installierte Version und verwenden Sie **Check now**, um die Verfügbarkeit der Updates zu überprüfen. Überprüfen Sie die aufgeführte Version, bevor Sie sie installieren, und beenden Sie zuerst die aktive Arbeit. Ein Build einer Entwicklungsquelle kann Updates unterschiedlich von einer verpackten Installation melden. Bewahren Sie eine Kopie wichtiger exportierter Ergebnisse vor einem Update auf; Benennen Sie die internen Datenverzeichnisse der Anwendung nicht um.

<PlatformContent platform="macos">

Wenn **Installieren Sie Open-Science vor dem Aktualisieren** angezeigt wird, läuft die App von einem schreibgeschützten Speicherort aus. Wählen Sie **In „Programme“ installieren** oder verschieben Sie die App dort im Finder. Verwenden Sie nach der Installation **Neustart** oder beenden Sie diese Kopie und öffnen Sie die Kopie in Anwendungen erneut und suchen Sie dann erneut nach Updates. **Weiter verwenden** hält die aktuelle Kopie offen; Es macht diesen standort nicht aktualisierbar. Wenn die Installation fehlschlägt, folgen Sie dem angezeigten Fehler, bevor Sie erneut versuchen.

</PlatformContent>

<PlatformContent platform="windows">

Die Neuinstallation behält vorhandene Daten bei. Wenn Sie nach einem Datenproblem bewusst einen Neuanfang benötigen, siehe [Lokale Windows-Daten zurücksetzen](troubleshooting.md#windows-data-reset). Dieses separate Tool löscht Daten; Es ist nicht Teil eines gewöhnlichen Updates.

</PlatformContent>

## Fehlerbehebung Installation und Start {/* #first-checks-when-startup-fails */}

| Wo es scheitert | Erste Kontrollen |
| --- | --- |
| Desktop-Installationsprogramm oder App-Start | Überprüfen Sie die Paketquelle, die Betriebssystem- und CPU-Architektur und lesen Sie dann die Eingabeaufforderung des Betriebssystems. |
| Quelleninstallation | Bestätigung `node --version` und `npm --version`, und das `npm install` abgeschlossen. Wiederholen Sie eine unterbrochene Abhängigkeitsinstallation. |
| Ersteinrichtung | Lesen Sie den fehlgeschlagenen Umwelt-Check und lösen Sie die angegebene Anforderung, bevor Sie fortfahren. |
| Erster Agent Request | Bestätigen Sie einen Active/Ready Agent und führen Sie **Test connection** auf der Modellseite. |
| Provider oder lokale Browserverbindung | Überprüfen Sie den gemeldeten Port-, Proxy- oder Zertifikatsfehler; siehe [Fehlerbehebung](troubleshooting.md). |

## Produktname nach v0.31.0 {/* #product-name */}

Die aktuelle Schnittstelle und neue Pakete verwenden **Open-Science** konsequent. Das Upgrade bewahrt vorhandene Installationsnamen und -standorte, Forschungsdaten, Anmeldeinformationen und Einstellungen. Ein älterer Installationspfad, der `Open Science` enthält, ist an sich kein Upgrade-Fehler. Namen Sie die Datenordner nicht um oder verschieben Sie sie nicht so, dass sie dem neuen Anzeigenamen entsprechen.
