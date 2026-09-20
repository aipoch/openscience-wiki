---
title: "Python und R Laufzeiten"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Python und R Laufzeiten {/* #python-and-r-runtimes */}

Öffnen Sie **Settings → Runtimes**, um die Python- und R-Umgebungen auszuwählen, die für Notebooks und den Agenten verfügbar sind. Der **Ready**-Status einer Umgebung zeigt eine erfolgreiche Erkennung/Einrichtung an; Der **Enable**-Switch steuert die Verfügbarkeit für den Agenten separat.

Wählen Sie eine App-verwaltete Umgebung oder einen vorhandenen Interpreter. Überprüfen Sie den Pfad, die Version, den Ready-Zustand und den Schalter vor der Verwendung. System R und App-verwalteter R können nebeneinander existieren.

<span id="verification-still-required" />

<PlatformGuide />

## Wählen Sie eine Umgebung für Ihr Projekt {/* #before-choosing-an-environment-for-a-project */}

Geben Sie den Interpreternamen, den Pfad und die Version auf. Für eine erste Python-Analyse sollten Sie die isolierte App-verwaltete Umgebung bevorzugen, damit Paketänderungen eine nicht verwandte Forschungsumgebung nicht verändern. Überprüfen Sie **Packages** auf erforderliche Bibliotheken, bevor Sie die Installation anfordern. Eine erfolgreiche Paketauflistung ist eine Read-Only-Prüfung; es erteilt dem Agenten nicht die Erlaubnis, einen externen Dolmetscher zu modifizieren.

Unterscheiden Sie nach einem Ausführungsfehler einen nicht verfügbaren Interpreter, ein fehlendes Paket, eine abgelehnte Anforderung und einen Codefehler. Die Neuinstallation ist für eine defekte verwaltete Laufzeit geeignet, nicht für jede fehlgeschlagene Analyse. Wenn Sie ein Ergebnis reproduzieren müssen, behalten Sie die Eingabeversion und den Code zusammen mit den Laufzeitdetails bei.

## Verstehen der Hauptkontrollen {/* #understand-the-main-controls */}

| Kontrolle | Zweck und Grenze |
| --- | --- |
| **Recheck** | Refresh entdeckte Dolmetscher und ihren Status. Das Panel zeigt die Last-Check-Zeit. Nicht verfügbar bei widersprüchlichen Setup-Arbeiten. |
| **Network settings** | Offene Konfiguration für Notebook-Netzwerkschutz. Das Banner erklärt, ob Sitzungen und Paket-Downloads auf genehmigte Domains beschränkt sind. |
| **Let the Agent create environments** | Kontrollieren Sie, ob der Agent Umgebungen erstellen und fehlende Laufzeiten einrichten kann. Wenn Sie dies deaktivieren, werden keine expliziten Benutzereinstellungen oder Reparaturkontrollen entfernt. |
| **Add interpreter…** | Öffnen Sie den systemausführbaren Picker für einen vorhandenen Interpreter. Wählen Sie die tatsächliche ausführbare Datei aus und bestätigen Sie dann den erkannten Pfad und den Ready-Status. |
| **Download and set up** | Bereiten Sie eine App-verwaltete Umgebung vor, wenn sie fehlt. |
| **Cancel** während des Aufbaus | Fordern Sie die Stornierung des laufenden Setups an. Warten Sie, bis sich die Operation erledigt hat, bevor Sie eine andere beginnen. |
| **Retry setup** | Versuchen Sie erneut ein erfolgloses Setup, nachdem Sie die Ursache behoben haben. |
| **Aktivieren &#91;Umwelt&#93;** | Stellen Sie die Umgebung für die Agentenauswahl zur Verfügung. Das Deaktivieren einer In-Use-Umgebung kann eine Aufprallbestätigung erfordern. |
| **Allow package install** | Separate Zustimmung für eine aktivierte externe Python- oder R-Umgebung. Die R-Zustimmung ist auf eine ausgewählte persönliche Bibliothek beschränkt. Listing-Pakete erfordern keine Installationsgenehmigung. |
| **Pakete &#91;count&#93;** | Öffnen Sie das Installationspaket-Inventar für diesen Interpreter. |
| **Reinstall** | Öffnen Sie die Bestätigung, bevor Sie eine App-verwaltete Umgebung neu erstellen. |

## Installieren einer App-verwalteten Umgebung {/* #install-an-app-managed-environment */}

<PlatformContent platform="windows">

Überprüfen Sie beide Sprachkarten in **Settings → Runtimes**. Jeder hat seinen eigenen **Ready**-Status, Version, **Enable**-Schalter und **Packages**-Taste. Die folgenden Karten zeigen Python und R aktiviert; die oben genannte Warnung betrifft den Notebook-Netzwerkschutz, der separat konfiguriert ist. Persönliche Wege sind in diesen Screenshots verborgen; Überprüfen Sie die vollständigen Pfade auf Ihrem eigenen Computer.

<Screenshot src="/img/open-science/windows/runtimes-ready.webp" alt="Windows-Laufzeitkarten mit verwaltetem Python und R Ready und aktiviert" width={1919} height={991} windowBounds={[480, 152, 960, 688]} href="/docs/img/open-science/windows/runtimes-ready.webp" linkLabel="Öffnen Sie den kompletten Windows Screenshot" />

</PlatformContent>

### App-verwalteter Python installieren {/* #install-app-managed-python */}

<PlatformContent platform="macos">

![Laufzeiteinstellungen vor dem Python Setup](/img/open-science/walkthrough-2026-09-08/34-runtimes-before-setup.webp)

</PlatformContent>
1. Finde **Python → App-managed environment**.
2. Wählen Sie **Download and set up**.
3. Lesen Sie die Fortschrittsnachricht und warten Sie. **Cancel** wird verfügbar, während das Setup ausgeführt wird.
4. Beim Erfolg bestätigen Sie **conda: Standard-Python**, **App-managed** und **Ready**.
5. Überprüfen Sie den Interpreterpfad und den **Conda aktivieren: Default-Python**-Switch.

<PlatformContent platform="macos">

![Erstellen der App-verwalteten Python-Umgebung](/img/open-science/walkthrough-2026-09-08/36-runtime-setup-progress.webp)

</PlatformContent>
<PlatformContent platform="macos">

![Python Setup abgeschlossen](/img/open-science/walkthrough-2026-09-08/37-python-runtime-ready.webp)

</PlatformContent>
Bestätigen Sie **Ready**, den ausgewählten Interpreterpfad und den aktivierten Zustand. Paketanzahl und -versionen können je nach Installationsquelle variieren; Verwenden Sie den temporären Pfad des Screenshots nicht als permanenten Umgebungsstandort.

### App-verwalteter R installieren {/* #install-app-managed-r */}

1. Öffnen Sie **Settings → Runtimes** und scrollen Sie zu **R**.
2. Wählen Sie unter **App-managed environment** **Download and set up** aus. Ein vorhandenes System R hindert Sie nicht daran, diese separate Umgebung zu installieren.
3. Warten Sie, bis der Download und die Erstellung der Umgebung abgeschlossen sind. Halten Sie die Anwendung offen und lesen Sie jeden Fehler, bevor Sie es erneut versuchen.
4. Bestätigen Sie **conda: Standard-r**, **App-managed**, **Ready** und einen aktivierten Switch.
5. Öffnen Sie **Packages**. Geben Sie `r-base` in **Filter packages** ein, um die installierte R-Version und den installierten Kanal zu überprüfen; Löschen Sie den Filter, um alle Pakete zu sehen.

<PlatformContent platform="linux">

![App-verwalteter R ist bereit und auf Linux aktiviert](/img/open-science/linux/r-managed-ready.webp)

</PlatformContent>

<PlatformContent platform="macos">

![Download der App-verwalteten R-Umgebung](/img/open-science/guides-walkthrough/70-r-managed-download.webp)

</PlatformContent>
<PlatformContent platform="macos">

![App-Managed R installiert und aktiviert](/img/open-science/guides-walkthrough/71-r-managed-ready.webp)

</PlatformContent>
Bestätigen Sie, dass das Filtern von `r-base` das installierte R-Paket mit seiner Version und seinem Kanal zurückgibt. Die Gesamtsumme des Pakets spiegelt Ihre Umgebung wider und kann vom Screenshot abweichen.

<PlatformContent platform="macos">

![Überprüfung der r-base im R-Paketinventar](/img/open-science/guides-walkthrough/72-r-package-filter.webp)

</PlatformContent>
## Verbinden Sie einen vorhandenen Interpreter {/* #connect-an-existing-interpreter */}

<PlatformContent platform="windows">

Verwenden Sie **Add interpreter…** unter der beabsichtigten Sprache, um den Windows-Datei-Picker zu öffnen. Wählen Sie die aktuelle `python.exe` oder `R.exe` der installierten Umgebung und wählen Sie dann **Open**. Verwenden Sie für einen Pfad, der Leerzeichen enthält, den Datei-Picker oder sein **File name**-Feld. Überprüfen Sie in Laufzeiten den erkannten Pfad und die erkannte Version, wählen Sie **Recheck** aus und aktivieren Sie diese Umgebung. Ein Open Picker allein bedeutet nicht, dass ein Dolmetscher hinzugefügt wurde.

</PlatformContent>

### Verwenden Sie R bereits auf Ihrem Computer installiert {/* #use-r-already-installed-on-your-computer */}

Wählen Sie **Recheck** und prüfen Sie den erkannten R-Pfad und die Version. Wenn Ihr Interpreter abwesend ist, verwenden Sie **Add interpreter…**, um die ausführbare Datei auszuwählen. **Ready** und **Enable** haben unterschiedliche Bedeutungen: Die Erkennung bestätigt, dass der Interpreter verfügbar ist; enableing macht es vom Agenten auswählbar.

In einem R Notebook überprüfen Sie `R.home()`, um die verwendete Umgebung zu bestätigen. Um Abhängigkeiten zu installieren, autorisieren Sie eine persönliche Bibliothek mit dem [Externe R Installationsschritte](#external-r-packages).

<PlatformContent platform="macos">

Ein erkannter Pfad wie `/opt/homebrew/bin/R` identifiziert eine Systeminstallation.

</PlatformContent>

### Registrieren und Verwenden von externem Python {/* #register-and-use-external-python */}

<PlatformContent platform="linux">

Ein Systeminterpreter wie `/usr/bin/python3` kann bereits als **Ready** erscheinen. Aktivieren Sie die Umgebung, die Sie verwenden möchten, bevor Sie den Agenten auffordern, sie auszuwählen. Die unten aufgeführten erkannten Python-Interpreter sind deaktiviert und die von der App verwaltete Python-Umgebung wurde nicht eingerichtet. Um eine verwaltete Umgebung vorzubereiten, verwenden Sie **Download and set up**.

![Linux erkennt vorhandene Python-Interpreter als Ready, wobei ihre Enable-Schalter ausgeschaltet sind](/img/open-science/linux/python-detected-disabled.webp)

</PlatformContent>

1. Bereiten Sie die Python-Umgebung vor, die Sie verwenden möchten.
2. Wählen Sie **Add interpreter…**, wählen Sie die ausführbare Python-Datei aus und überprüfen Sie **Ready**, den Pfad und die Version.
3. Verwenden Sie **Recheck**, um die Erkennung zu überprüfen, und aktivieren Sie dann diese bestimmte Umgebung.
4. Bitten Sie den Agenten, es explizit für den Notebook auszuwählen.
5. Drucken Sie `sys.executable` und die Python-Version, bevor Sie sich auf die installierten Bibliotheken verlassen.

<PlatformContent platform="macos">

Wenn ein Symlink-Interpreter im macOS-Datei-Picker nicht ausgewählt werden kann, wählen Sie die tatsächliche ausführbare Datei der beabsichtigten Umgebung aus. Bestätige `sys.executable` nach der Bindung. Verwenden Sie einen stabilen Installationspfad anstelle des temporären Beispielpfads des Screenshots.

</PlatformContent>

#### Paketberechtigung und Installationsergebnis {/* #package-permission-and-installation-outcome */}

Für ein neues Paket in einer externen Python-Umgebung, überprüfen Sie zuerst **Allow package install**. Warten Sie nach Erteilung der Genehmigung auf den Abschluss der Installation und überprüfen Sie den Import in derselben Umgebung, bevor Sie fortfahren.

Wenn die Installation `403 Forbidden` oder `destination resolves to a non-public network address` meldet, prüfen Sie den betroffenen Hostnamen und folgen Sie [Netzwerk](network.md), bevor Sie erneut versuchen. Diese Fehler betreffen den Netzzugang und beweisen nicht, dass das Paket nicht verfügbar ist. Halten Sie den Netzwerkschutz aktiviert.

#### Deaktivieren einer Umgebung, die von einem Notebook verwendet wird {/* #disable-an-environment-used-by-a-notebook */}

Wählen Sie den **Enable**-Switch aus und lesen Sie die Anzahl der aktiven / leeren Kernel, bevor Sie bestätigen. Das Deaktivieren kann den Kernel schließen; Wählen Sie nach dem erneuten Aktivieren erneut eine verfügbare Laufzeit für die Sitzung aus. Dieses Panel bietet Aktivierungs- / Deaktivierungssteuerungen anstelle einer separaten **Dolmetscher entfernen**-Aktion.

## Installieren Sie Pakete in externen R {/* #external-r-packages */}

Verwenden Sie dies, wenn Ihr vorhandener R-Interpreter funktioniert, aber ein zusätzliches Paket benötigt. Die App gewährt Installationszugriff auf eine vorhandene persönliche Bibliothek, nicht auf System- oder Site-Bibliotheken.

1. Aktivieren Sie in **Settings → Runtimes** die beabsichtigte externe R-Umgebung und bestätigen Sie deren Pfad/Version.
2. Überprüfen Sie unter **Personal R package library** den erkannten Standort oder wählen Sie eine berechtigte Bibliothek aus. Wenn keine erkannt wird, verwenden Sie **Advanced options → Choose library folder…**, um eine vorhandene beschreibbare persönliche Bibliothek auszuwählen, die für diesen R-Interpreter sichtbar ist. Diese Aktion erstellt keinen Ordner.
3. **Allow package install** aktivieren. Lesen Sie den ausgewählten Pfad vor der Autorisierung: Bei anderen Projekten, die diese Bibliothek verwenden, werden möglicherweise die installierten Paketänderungen angezeigt.
4. Fordern Sie das gewünschte Paket über den Paketverwaltungsvorgang der App an und benennen Sie diese R-Umgebung. Befolgen Sie das Installationsergebnis und alle Anweisungen zum Neustart des Kernels.
5. Führen Sie `R.home()`, `.libPaths()`, `library(PACKAGE_NAME)` und `packageVersion("PACKAGE_NAME")` in dieser Umgebung aus und ersetzen Sie den Paketplatzhalter. Bestätigen Sie, dass die beabsichtigte Bibliothek verwendet wird, bevor Sie die Analyse fortsetzen.

Deaktivieren Sie **Allow package install**, um die zukünftige Installationsgenehmigung zu widerrufen. Es deinstalliert keine bereits geschriebenen Pakete. Widerrufen Sie die Zustimmung, bevor Sie eine andere Bibliothek auswählen. Wenn kein berechtigter Ordner vorhanden ist, erstellen Sie eine persönliche R-Bibliothek außerhalb der App oder verwenden Sie eine von der App verwaltete Umgebung; Wählen Sie die Systembibliothek nicht aus, um eine fehlgeschlagene Überprüfung zu umgehen.

## Pakete aus erfassten Schlössern wiederherstellen {/* #conditional-restore */}

Um ein gespeichertes Ergebnis zu erhalten, öffnen Sie **Provenance → Environment** und inspizieren Sie die erfasste Sperre. Verwenden Sie **Download bundle**, wenn angeboten. Lesen Sie die Anweisungen und Voraussetzungen des Pakets, bevor Sie etwas wiederherstellen.

Externes R erfordert eine verfügbare `renv`-Installation und ein unterstütztes `renv.lock`; Externes Python benötigt eine bestehende unterstützte Anforderungssperre mit Pinned Hashes. Ein Dolmetscherpfad und eine Liste von Paketnamen allein reichen nicht aus. Die erfassten Interpreter-, Plattform-, Architektur- und Paketmanager-Anforderungen müssen der Wiederherstellungsumgebung entsprechen.

Extrahieren Sie das Paket, wählen Sie ein neues beschreibbares Ziel, das Sie besitzen, und führen Sie das enthaltene `restore-packages.py` mit dem tatsächlichen Interpreter und Zielpfaden aus, indem Sie die gebündelten Anweisungen befolgen. Das Skript prüft Voraussetzungen und Prüfsummen, bevor es Pakete wiederherstellt, und überprüft dann deren effektive Versionen und Pfade. Wenn eine Überprüfung fehlschlägt, lösen Sie diese Bedingung, anstatt die Sperre zu bearbeiten, um den Erfolg zu erzwingen. Open-Science übernimmt oder löscht dieses externe Ziel nicht.

Dies ist eine bedingte Paketwiederherstellung, kein Klon mit vollständiger Umgebung. Öffnen Sie das Ergebnis erneut und verwenden Sie [Reproduzierbarkeit](reproducibility.md), wenn ein unterstütztes erfasstes Rezept zum Vergleichen von Ausgaben verfügbar ist.

## Prüfen Sie installierte Pakete {/* #inspect-installed-packages */}

Wählen Sie **Packages** auf der beabsichtigten Python-Karte. Der Dialog zeigt den Pfad, die Paketquelle und den Status dieser Umgebung an.

Geben Sie einen Paketnamen wie `numpy` in **Filter packages** ein, überprüfen Sie die Version und den Kanal und löschen Sie dann den Filter, um die Liste wiederherzustellen. Verwenden Sie **Close**, um zurückzukehren.

<PlatformContent platform="macos">

![Filtern der installierten Python-Pakete](/img/open-science/walkthrough-2026-09-08/38-python-packages-filter.webp)

</PlatformContent>
Die Tabellenspalten sind **Name**, **Version**, **Build** und **Channel**. Ein Dash in Build bedeutet, dass kein Build-Wert angezeigt wird. Dieser Dialog ist ein Inventar: Es gibt keine Schaltflächen zum Installieren oder Deinstallieren von Paketen. Suchen Sie nicht nach einem „Paket installieren-Feld in diesem Dialog.

<PlatformContent platform="windows">

Wählen Sie auf der Python-Karte **Packages** aus und filtern Sie nach `pip`. Filtern Sie auf der R-Karte nach `r-base`. Überprüfen Sie die im Dialogtitel benannte Umgebung, bevor Sie Versionen vergleichen. Diese Screenshots zeigen installierte Pakete; Sie zeigen keine neue Paketinstallation an.

<Screenshot src="/img/open-science/windows/python-packages.webp" alt="Windows Python Paketbestand gefiltert auf Pip" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/python-packages.webp" linkLabel="Öffnen Sie den kompletten Windows Screenshot" />

<Screenshot src="/img/open-science/windows/r-packages.webp" alt="Windows R Paketinventar gefiltert auf r-base" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/r-packages.webp" linkLabel="Öffnen Sie den kompletten Windows Screenshot" />

</PlatformContent>

## Überprüfen Sie die Umwelt mit einer echten Analyse {/* #verify-the-environment-with-a-real-analysis */}

Führen Sie eine kleine Berechnung in der ausgewählten Umgebung aus, öffnen Sie die Ausgabe erneut und vergleichen Sie sie mit dem [Gemeinsame Baseline](../reference/example-data.md). Folgen Sie [R Notebook](notebook.md#run-the-same-gene-count-check-in-r) für Ausführung und Export.

Der [Workflow in Datenqualität](../workflows/data-quality.md) bietet eine Python-Route unter Verwendung vorhandener Abhängigkeiten. Eine erfolgreiche Berechnung zeigt nicht, dass neue Pakete installiert oder ein Kernel neu gestartet werden können.

<PlatformContent platform="macos">

![Erfolgreiche reale Notebook-Berechnung](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>
Wenn ein Import fehlschlägt, überprüfen Sie die ausgewählte Laufzeit und die installierten Pakete. Für einen Download, der abgelehnt wurde, weil ein Hostname zu einer reservierten Adresse aufgelöst wird, folgen Sie [Netzwerk](network.md). Durch das Ausführen von Code mit vorhandenen Paketen wird nicht festgelegt, dass zusätzliche Pakete installiert werden können.

Überprüfen Sie vor einer anderen Analyse die erforderlichen Pakete in der ausgewählten Umgebung. Verwenden Sie bei Bedarf den unterstützten Paketverwaltungsvorgang, lesen Sie das tatsächliche Ergebnis, befolgen Sie alle Neustartanforderungen und überprüfen Sie den Import. Eine Berechtigungsgenehmigung, eine Fortschrittskarte oder ein Ready-Interpreter ist kein Importtest.

Um ein gespeichertes Ergebnis mit unvollständigen Umgebungs- oder Ausführungsnachweisen zu erhalten, öffnen Sie **Provenance** und prüfen Sie die fehlenden Informationen. Um eine neue Version für eine Reproduzierbarkeitsprüfung vorzubereiten, folgen Sie [Vorbereitung der Umgebung](reproducibility.md#prepare-environment). Die Übereinstimmung mit einem numerischen Ergebnis füllt die fehlende Herkunft nicht aus.

### Bestätigen Sie den aktiven Dolmetscher {/* #confirm-the-active-interpreter */}

Nachdem Sie Python oder R vorbereitet haben, führen Sie die folgenden Befehle in der entsprechenden Notebook-Sprache aus, um die tatsächliche Version und den Pfad zu überprüfen. Einstellungen können mehrere Umgebungen auflisten; Verwenden Sie die Ausgabe des aktuellen Laufs, um den verwendeten zu identifizieren.

Python:

```python
import sys
print(sys.version)
print(sys.executable)
```

R:

```r
R.version.string
R.home()
```

Lesen Sie als nächstes eine kleine Projekttabelle, überprüfen Sie die Anzahl der Zeilen und speichern Sie das Ergebnis. Nach dem erneuten Öffnen der App führen Sie den Check erneut aus, bevor Sie eine Analyse fortsetzen. Ein lesbarer historischer Bericht bedeutet nicht, dass die vorherigen In-Memory-Variablen noch existieren. Siehe [Notebook und Ausführungsnachweise](notebook.md) für Notebook-Steuerelemente.

<PlatformContent platform="windows">

<p className="example-label"><strong>Praxisbeispiel</strong> Überprüfen Sie den aktiven Windows Python Interpreter</p>

Für eine schnelle Überprüfung, bevor Sie Forschungsdaten verwenden, bitten Sie den Agenten, die oben genannten Python-Versions- / Pfadbefehle im **Sitzung Notebook** auszuführen und ihre tatsächliche Ausgabe in einem Markdown-Bericht zu speichern. Um auch die installierte `pip`-Version zu überprüfen, fügen Sie `import importlib.metadata` und `print(importlib.metadata.version("pip"))` hinzu.

Öffnen Sie die Ausgabe des Notebook und vergleichen Sie sie mit dem gespeicherten Bericht. Dieses Windows 10 Beispiel in Open-Science v0.28.0 berichtet Python **3.12.13** und `pip` **26.1.2**. Das Lesen von Paket-Metadaten installiert oder importiert dieses Paket nicht.

<Screenshot src="/img/open-science/windows/python-runtime-output.webp" alt="Windows Python Notebook mit ausgeführtem Code und seiner tatsächlichen Versionsausgabe" width={1920} height={1017} windowBounds={[1157, 0, 763, 472]} href="/docs/img/open-science/windows/python-runtime-output.webp" linkLabel="Öffnen Sie den kompletten Windows Screenshot" />

Für Windows Conda R Start- oder Kernel-Wiederherstellungsfehler verwenden Sie v0.30.2 oder höher, bevor Sie erneut versuchen. Das Release behebt die ausführbare Suche nach der Umgebungsvorbereitung und der R-Kernelwiederherstellung. Nach dem Aktualisieren überprüfen Sie die Umgebung erneut und führen Sie eine kleine R-Berechnung in Notebook aus; **Ready** allein ist kein Ausführungsergebnis. Die folgenden Screenshots behalten die Versionen und Ergebnisse ihrer ursprünglichen Läufe bei.

Von v0.31.0 aus kann Windows R im Standardmodus ausgeführt werden, ohne dass zuvor der geschützte Modus eingerichtet wurde. Behandeln Sie **Aktivieren Sie den geschützten Modus, bevor Sie den R-Zugriff autorisieren.** von einem älteren Release als versionspezifische Anleitung. Netzwerkschutz- und Paketinstallationsberechtigungen bleiben getrennte Kontrollen. In v0.31.1 zeigt ein von Notebook Netzwerkschutz blockierter Lauf eine Inline-Warnung mit einem Link zur entsprechenden Einstellung an; Die Zelle wurde nicht hingerichtet. Überprüfen Sie den erforderlichen Zugriff, wiederholen Sie dann und überprüfen Sie die Ausgabe.

<span id="windows-runtime-qc" />

<p className="example-label"><strong>Praxisbeispiel</strong> Überprüfen Sie die Windows Python und R Umgebungen mit einer Sample-QC Tabelle</p>

Die folgende Analyse verwendet einen anderen Windows 11-Computer und seine vorhandenen Python/R-Umgebungen. Verwenden Sie die Pfade und Ausgaben aus Ihrem eigenen Lauf, wenn Sie Ihre Installation überprüfen.

Laden Sie das <a href="/docs/examples/gse60450/rnaseq-sample-qc.csv" download>Probe-QC CSV</a> herunter und fügen Sie es einer Projektsitzung bei. Dies ist eine zwölfreihige Zusammenfassung mit einer Zeile pro Probe. Bei den nachstehenden Überprüfungen wurden die vorhandenen Metriken angegeben; Sie berechnen die ursprüngliche Genzählmatrix nicht neu. Die Eingabebeschreibung und metrischen Definitionen sind in [Beispieldaten](../reference/example-data.md).

**Lesen Sie die Tabelle mit Python.** Bitten Sie den Agenten, die ausgewählte Python-Umgebung in der Session Notebook nur mit der Standardbibliothek zu verwenden. Fordern Sie `sys.version`, `sys.executable`, die vier Prüfungen in der Tabelle unten und einen gespeicherten Markdown-Bericht an. Verwenden Sie den Pfad der angehängten Datei. Um zu überprüfen, ob das Lesen die Eingabe unverändert gelassen hat, berechnen Sie vor dem Lesen und erneut nach dem erneuten Öffnen der Datei den SHA-256.

Öffnen Sie den gespeicherten Bericht und seine **Provenance → Code**-Ansicht. Vergleichen Sie den erfassten Code mit dem gemeldeten Interpreter und den Ergebnissen. In diesem Beispiel meldet Python die Version **3.12.13** und eine ausführbare Endung in `runtime\envs\.p\python.exe`; die Eingabe-Hashes vor und nach dem Wiedereröffnungsspiel.

Das Detail unten zeigt **Inputs** und den erfassten Code. Klicken Sie auf das Bild, um den vollständigen Screenshot mit dem gespeicherten Bericht zu öffnen.

<Screenshot
  src="/img/open-science/windows/runtime-python-producer.webp"
  alt="Detail der Provenance-Code-Ansicht des Python-Ergebnisses mit Eingaben und dem erfassten Erzeugercode"
  width={2302}
  height={1158}
  windowBounds={[1385, 65, 917, 1030]}
  href="/docs/img/open-science/windows/runtime-python-producer.webp"
  linkLabel="Öffnen Sie den kompletten Windows Python Screenshot mit dem gespeicherten Bericht und dem erfassten Code"
/>

**Lesen Sie die gleiche Tabelle mit R.** Bitten Sie den Agenten, die ausgewählte R-Umgebung in der Sitzung Notebook zu verwenden, nur mit der Basis R. Fordern Sie `R.version.string`, `R.home()` an, die gleichen vier Prüfungen und einen separaten gespeicherten Bericht. Erweitern Sie die **Notebook run**-Karte, um den Code zu überprüfen, öffnen Sie dann den Bericht und vergleichen Sie die Ergebnisse. In diesem Beispiel meldet R die Version **4.4.3** und ein Heimverzeichnis, das in `runtime/envs/.r/Lib/R` endet.

![Windows R Notebook Aufruf und gespeicherter Bericht, der die aktive R-Installation und die Sample-QC-Ergebnisse zeigt](/img/open-science/windows/runtime-r-execution.webp)

Die Installationspfade in diesen Screenshots gehören zum Beispielcomputer. Verschiedene Laufwerksbuchstaben, Ordner und Interpreterversionen auf dem eigenen Computer sind normal.

Beide Berichte liefern folgende Ergebnisse für diesen Input:

| Überprüfung | Ergebnis in diesem Beispiel |
| --- | ---: |
| Datenzeilen | 12 |
| Unterschiedlich `original_column_name` Werte | 12 |
| Summe von `total_raw_counts` | 269,027,617 |
| Zeilen, in denen `zero_count_genes + detected_genes_count_gt_0` ist gleich 27,179 | 12 |

Passen Sie den Weg des Laufs mit der Umgebung an, die Sie verwenden möchten, und vergleichen Sie dann die gespeicherten Ergebnisse mit der Tabelle. Diese Runs verwenden Python's Standardbibliothek und Basis R; sie erfordern keine zusätzlichen Pakete oder weisen nach, dass neue Pakete installiert werden können.

</PlatformContent>

## Wartung und Reparatur von Umgebungen {/* #maintain-and-repair-environments */}

### Setup und Retry abbrechen {/* #cancel-setup-and-retry */}

Während **Download and set up**, wählen **Cancel** und warten auf **Runtime Setup abgesagt**. Wählen Sie **Retry setup**, warten Sie auf **Ready** und öffnen Sie **Packages**, um die Umgebung zu inspizieren. Starten Sie kein zweites Setup, während sich der erste Vorgang noch erledigt.

<PlatformContent platform="macos">

![Abgesagtes Setup und verfügbarer Retry](/img/open-science/local-todo-batch/29-setup-cancelled.webp)

</PlatformContent>
<span id="review-a-reinstall-before-committing-it" />

### Installieren einer verwalteten Umgebung {/* #reinstall-a-managed-environment */}

1. Speichern Sie benötigte Berichte und notieren Sie alle Pakete, die Sie hinzugefügt haben.
2. Wählen Sie **Reinstall** in der vorgesehenen verwalteten Umgebung aus.
3. Lesen Sie den Aufprallhinweis und wählen Sie dann **Reinstall runtime**.
4. Warten Sie auf **Ready** und prüfen Sie **Packages**.
5. Starten Sie eine neue Notebook-Zelle und öffnen Sie Ihre gespeicherten Ein- und Ausgänge erneut.

<PlatformContent platform="macos">

![Bestätigung während einer Notebook-Sitzung neu installieren](/img/open-science/local-todo-batch/31-runtime-reinstall.webp)

</PlatformContent>
Die Neuinstallation löscht und erstellt die Umgebung neu. Bei der ausgeübten Wiederherstellung wurde eine aktive Zelle mit **Run canceld: Die Laufzeit wurde gestoppt, während diese Zelle ausgeführt wurde.** abgebrochen Die alte Notebook-Historie blieb sichtbar, aber ihr Namespace existierte nicht mehr. Eine neue Zelle bestätigte, dass eine frühere Variable fehlte; Der unveränderte CSV gab immer noch 12-Zeilen zurück und 269,027,617 zählt, und der gespeicherte Bericht wurde wieder geöffnet.

<PlatformContent platform="macos">

![Notebook-Historie beibehalten, nachdem der Kernel gestoppt wurde](/img/open-science/local-todo-batch/33-reinstalled-kernel-history.webp)

</PlatformContent>
Behaltene Dateien und beibehaltener Kernelspeicher sind unterschiedlich. Erstellen Sie Variablen, indem Sie den erforderlichen Code erneut ausführen. Zusätzliche Pakete müssen möglicherweise neu installiert werden; Eine erfolgreiche Wiederherstellung der Basisumgebung stellt nicht die Wiederherstellung jeder zusätzlichen Abhängigkeit dar.

### Development Build: Micromamba nicht gefunden {/* #development-build-micromamba-not-found */}

Der erste Versuch im Quell-Build scheiterte vor der Bereitstellung, weil der Entwicklungsprozess Micromamba nicht lokalisieren konnte.

<PlatformContent platform="macos">

![Tatsächlicher fehlender Micromamba-Fehler in einem Source Build](/img/open-science/walkthrough-2026-09-08/35-runtime-micromamba-error.webp)

</PlatformContent>
Die verpackte Anwendung enthält diese Binärdatei. Punkt `OPEN_SCIENCE_MICROMAMBA_BIN` für einen Quellaufbau auf eine gültige Mikromamba-Ausführbarkeit in der Startumgebung dieses Prozesses und Neustart der Entwicklungsinstanz. Verwenden Sie den binären Pfad von einer kompatiblen Installation und bestätigen Sie, dass er vor dem Neustart ausführbar ist.

Diese Umgebungsvariable ist ein Entwicklungs-Setup-Detail, kein Feld auf der Laufzeitseite. Löschen Sie kein Umgebungsverzeichnis, um diesen Entdeckungsfehler zu umgehen.

<PlatformContent platform="windows">

## Optionale WSL2 Bash Vorschau {/* #wsl2-preview */}

Windows x64 kann das optionale **Local Shell · WSL2 Bash Preview** in **Settings → Runtimes** verwenden. Halten Sie PowerShell, es sei denn, Ihre Aufgabe benötigt eine Linux-Shell; WSL2 ist nicht verpflichtet, Open-Science auf Windows zu verwenden.

Wählen Sie eine WSL2-Distribution und deren genaue Nicht-Root-**Linux user**, dann wählen Sie **Save and check**. Befolgen Sie zuerst alle Setup-Anweisungen für die Plattform/Verteilung. Readiness Checks und Matching Preview Ressourcen müssen durchlaufen werden, bevor **Use WSL2 Bash** verfügbar wird; Das Auswählen einer Verteilung allein aktiviert sie nicht. Führen Sie einen kleinen Shell-Befehl aus und prüfen Sie dessen Ergebnis, bevor Sie eine längere Aufgabe starten. Verwenden Sie die PowerShell-Option, um zur Standard-Shell zurückzukehren.

Wenn die Bereitschaft fehlschlägt, behalten Sie den gemeldeten Grund bei und fahren Sie mit PowerShell fort, während Sie ihn beheben. Die Installation von WSL-Komponenten erfordert möglicherweise die Windows-Administratorgenehmigung. Diese Vorschau ist getrennt von der Auswahl von Python/R Notebook-Interpretern.

</PlatformContent>
