---
title: "Installation und Aktualisierungen"
last_update:
  date: '2026-10-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Installation und Aktualisierungen {/* #installation-and-updates */}

Die meisten Benutzer sollten das Desktop-Paket von GitHub Releases installieren. Mitwirkende oder alle, die den neuesten code testen, können die app von der quelle aus ausführen. Der Electron-Desktop-Client verbindet sich mit einem gemeinsamen Node-Backend, das auch die authentifizierte lokale Browseroberfläche bedient.

<PlatformGuide />

**v1.0.0 Verfügbarkeit:** [Diese Freigabe](https://github.com/aipoch/open-science/releases/tag/v1.0.0) enthält nur Desktop-Pakete, ohne eigenständige CLI-Archive oder Linux CLI `.deb` / `.rpm` Pakete. Download von dieser Seite und überprüfen Sie gegen seine `SHA256SUMS.txt`. Website-Downloads und automatische Update-Kanäle werden separat beworben, so dass ein Scheck möglicherweise noch nicht 1.0 bietet. Desktop-Installationen bieten weiterhin **Settings → General → Command line tool → Install command**.

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

Offizielle Windows-Installateure sind von v0.33.2 signiert; v0.33.3 erweitert die Signatur auf gebündelte ausführbare Dateien. Laden Sie von [Offizielle Download-Seite](https://aipoch.com/open-science/download) oder [GitHub Releases](https://github.com/aipoch/open-science/releases) herunter und folgen Sie den offiziellen Verifizierungshinweisen, um die Paketquelle zu überprüfen.


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

v1.0.0 bietet Linux **x64 und ARM64** Pakete. Wählen Sie für ARM64 `aipoch-open-science-1.0.0-linux-arm64.AppImage` oder `aipoch-open-science_1.0.0_arm64.deb`. Die x64 Gegenstücke sind `aipoch-open-science-1.0.0-linux-x86_64.AppImage` und `aipoch-open-science_1.0.0_amd64.deb`. Laden Sie von den offiziellen Assets des ausgewählten Releases herunter und passen Sie das Ergebnis von `uname -m` an.

</PlatformContent>

Der Installationsordner enthält die Anwendung; **Data location** im Einrichtungsassistenten enthält Forschungsdateien und Laufzeitumgebungen. Beide Speicherorte werden getrennt festgelegt. Fahren Sie nach der Installation mit der [Ersteinrichtung](onboarding.md) fort.

### Verwenden Sie das Standalone CLI {/* #standalone-cli */}

**Die untenstehenden Schritte für eigenständige Pakete gelten für Releases, die sie tatsächlich ausgeliefert haben, wie z.B. [v0.37.2](https://github.com/aipoch/open-science/releases/tag/v0.37.2)nicht auf v1.0.0 Assets.** Verwenden Sie dieses ältere Release nur absichtlich. Halten Sie Desktop- / Backend-Versionen übereinstimmend und zeigen Sie kein älteres Backend auf Daten, die von einer neueren App geschrieben wurden. Installieren Sie für den 1.0-Befehlszeileneintrag den Launcher, der von seiner Desktop-App geliefert wird, und folgen Sie [CLI Setup](../reference/cli.md#terminal-setup).

#### HomeBrew CLI {/* #homebrew-cli */}

Eine bestehende Homebrew CLI-Installation wird über `brew install aipoch/tap/open-science` getrennt vom Desktop-Cask verwaltet. Überprüfen Sie die von Homebrew tatsächlich angebotene Version; Die Veröffentlichung von 1.0 auf GitHub stellt nicht fest, dass die Formel fortgeschritten ist. Die Installation startet keinen Systemdienst. Wenn Launcher Konflikte haben, inspizieren Sie `type -a open-science` und verwenden Sie `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"` für diese Installation.

#### Linux CLI Pakete {/* #linux-cli-packages */}

Diese Tabelle behält die Installationsmethode **v0.37.2** Linux CLI bei; v1.0.0 veröffentlicht diese CLI-Pakete nicht. `open-science-cli` ist vom `aipoch-open-science`-Desktoppaket getrennt. Wenn Sie diese ältere Version benötigen, erhalten Sie das Asset und `CLI-PACKAGE-SHA256SUMS.txt` von [v0.37.2 Vermögenswerte](https://github.com/aipoch/open-science/releases/tag/v0.37.2) und überprüfen Sie dies vor der Installation.

| Distribution / Architektur | v0.37.2 CLI Vermögensanlage |
| --- | --- |
| Debian / Ubuntu, x64 | `open-science-cli_0.37.2_amd64.deb` |
| Debian / Ubuntu, ARM64 | `open-science-cli_0.37.2_arm64.deb` |
| Fedora, x64 | `open-science-cli-0.37.2-1.x86_64.rpm` |
| Fedora, ARM64 | `open-science-cli-0.37.2-1.aarch64.rpm` |

Installieren Sie die heruntergeladene Datei mit dem entsprechenden Paketmanager. Diese Beispiele verwenden x64; Verwenden Sie gegebenenfalls den ARM64-Dateinamen.

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_0.37.2_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-0.37.2-1.x86_64.rpm
```

Führen Sie `open-science-cli start --no-open`, dann `open-science-cli status --json`. Verwenden Sie nach der Ausführung `open-science-cli url`, um die authentifizierte lokale Weboberfläche zu öffnen; Halten Sie diese URL privat. Fahren Sie mit [CLI Setup](../reference/cli.md#terminal-setup) für die Modellkonfiguration und `doctor`-Prüfungen fort und ersetzen Sie `open-science` durch `open-science-cli` in diesen Befehlen.

Das Paket bündelt Node, das Backend und die Web-Benutzeroberfläche. Es installiert weder Python/R noch erstellt es einen automatisch gestarteten Systemdienst. Die OS-Anmeldedatenspeicher- und Sandbox-Voraussetzungen gelten weiterhin; siehe [Headless Linux-Zugangsdaten](../reference/server.md). Verwenden Sie `open-science-cli` explizit, wenn auch ein Desktop-Launcher installiert ist.

Bevor Sie das Paket aktualisieren oder entfernen, beenden Sie die Arbeit und stoppen Sie **jedes Profil, das von diesem Paket gestartet wurde**. Installieren Sie das nächste heruntergeladene Paket über apt/dnf; Es gibt kein AIPOCH apt/dnf-Repository, das von dieser Installation konfiguriert wurde. Paketentfernung bewahrt Forschungsdaten und Anmeldeinformationen. Der [Offizielle Paketanleitung](https://github.com/aipoch/open-science/blob/v0.37.2/docs/standalone-runtime.md#linux-cli-distribution-packages) beschreibt Befehlskonflikte und Plattformanforderungen.

### Laufen aus der Quelle {/* #run-from-source */}

Sie benötigen Git, Node.js 24, npm und die Plattformbauvoraussetzungen für Electron. Installieren oder wählen Sie ein Agent-Framework in der Anwendung aus. Während der Installation generiert das Repository den Prisma Client, wendet App-Patches an und bereitet native Electron-Abhängigkeiten vor.

Wählen Sie für eine reproduzierbare Quellinstallation das vorgesehene Release-Tag aus [Changelog](../changelog/v1.0.0.md), bevor Sie Abhängigkeiten installieren. Ein Standardklon folgt dem Branch und nicht einem festen Release. Notieren Sie die ausgewählten Tag-, Source-Commit- und Runtime-Versionen, damit eine andere Person die Umgebung reproduzieren kann.

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

Verwenden Sie die package.json und [Standalone Runtime Guide](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md) des ausgewählten Tags für seine Build-Ziele und Abhängigkeiten. `npm run dev:web` entwickelt den Node/Web-Einstiegspunkt; `npm run dev` bereitet auch den Desktop-Client vor. Verwenden Sie ein isoliertes Konfigurationsverzeichnis, um Testdaten getrennt zu halten.

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

Aus 1.0 wird `open-science update` entfernt. Aktualisieren Sie die App über ihre Desktop-Steuerelemente oder das offizielle Installationsprogramm und aktualisieren Sie eine CLI-Installation über den Installer / Paketmanager, der sie besitzt. Wenn **Check now** noch kein veröffentlichtes Release anbietet, überprüfen Sie die offizielle Release-Seite; Das Löschen der Konfiguration oder das Zurücksetzen der App fördert keinen Update-Kanal.

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

## Upgrade auf 1.0 und Kompatibilität verstehen {/* #version-compatibility */}

1. Beenden Sie die aktive Recherche und sichern Sie das Konfigurationsverzeichnis sowie einen separat konfigurierten Datenspeicherort. Ein `.science` Export ist kein Backup des gesamten Profils.
2. Schließen Sie Desktop-/Backend-Instanzen mit der Installation und aktualisieren Sie dann über das offizielle Installationsprogramm. Bewahren Sie das ursprüngliche Profil, die Daten und den OS-Anmeldedatenspeicher auf.
3. Öffnen und überprüfen Sie die Version, Projekte, Sitzungen, Dateien, Modell und Laufzeiten, bevor Sie fortfahren. Ein binäres Downgrade führt nicht zum Zurücksetzen von Daten; Ältere Binärdateien lesen möglicherweise keine neueren gespeicherten Daten.

1.0 behält bestehende historische Upgrade- und Importpfade bei; Die Versionsnummer erfordert kein Zurücksetzen des Profils. Der [1.x Kompatibilitätsrichtlinie](https://github.com/aipoch/open-science/blob/v1.0.0/docs/compatibility.md) umfasst dokumentierte CLI/SDK und Task-Automatisierungsschnittstellen, Vorwärtsimporte von gültigen `.science`-Paketen und unterstützte Profil-Upgrades. Es garantiert keine identischen Modellantworten, Verfügbarkeit von Drittanbietern oder deterministische Reproduktion einer ganzen Forschungssitzung oder plattformübergreifende Übertragung von OS-geschützten Anmeldeinformationen. Sicherheitskorrekturen zielen auf die neueste stabile Version ab.
