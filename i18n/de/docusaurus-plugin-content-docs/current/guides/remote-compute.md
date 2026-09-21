---
title: "SSH-Hosts und Slurm Setup"
last_update:
  date: '2026-09-10'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# SSH-Hosts und Slurm Setup {/* #ssh-hosts-and-slurm-setup */}

:::info&#91;Bevor Sie einen Job einreichen&#93; Konfigurieren Sie einen SSH-Host und wählen Sie Direct SSH oder Slurm, bevor Sie einen Remote-Job einreichen. Ein gespeichertes Hostprofil führt nicht zu einer erfolgreichen Authentifizierung oder Ausführung. :::

Verwenden Sie **Settings → Compute**, um einen Server oder Cluster zu registrieren. Die Registrierung des Gastgebers, die Bereitstellung für ein Gespräch und der Abschluss eines Auftrags sind separate Meilensteine. Behalten Sie die Login-Node-Regeln und Scheduler-Anforderungen der Website mit den Host-Notizen.

## Wählen Sie, wo Jobs ausgeführt werden {/* #choose-where-jobs-execute */}

| Ausführungsmodus | Ausführung des Auftrags | Befehlsaufforderungen | Angemessenes Umfeld |
| --- | --- | --- | --- |
| **Direct SSH** | Direkt über den SSH Login Host | Auf dem SSH Login Host | Eine Maschine, bei der direkte Arbeitslasten zulässig sind |
| **Slurm** | Übermittelt und verwaltet über Slurm | Immer noch auf dem SSH Login Host | Ein Cluster, das planmäßige Zuweisungen erfordert |

Die Auswahl von Slurm verschiebt nicht jeden Befehl auf einen Rechenknoten. Interpretieren Sie keine Login-Host-CPU-, RAM- oder GPU-Informationen als Ressourcen, die einem zukünftigen Slurm-Job zugewiesen sind. Überprüfen Sie die tatsächliche Zuweisung des Jobs, bevor Sie seine Ergebnisse interpretieren.

## Fügen Sie die Verbindung hinzu {/* #add-the-connection */}

Wählen Sie **Add SSH host**. Wählen Sie einen vorhandenen Alias oder geben Sie die Host-Kennung ein. Das Formular ist standardmäßig auf SSH-Konfigurations-Authentifizierung und Direct SSH-Ausführung.

| Feld oder Steuerung | Input und Wirkung |
| --- | --- |
| **From ~/.ssh/config** | Wählen Sie einen entdeckten Alias aus; deaktiviert, wenn keine Aliase verfügbar sind |
| **Or type a host alias** | Erforderlicher Host/Alias, 1–255-Zeichen nach dem Trimmen; keine NUL oder Leitungsunterbrechungen |
| Fakultative Host Notes | Scheduler-Regeln, Partition/Konto, Module, Paketinstallationsrichtlinie und Standort der Umgebung; Maximale 32,768-Zeichen |
| **Execution mode** | Direct SSH oder Slurm; Gespart pro Host |
| **SSH configuration** | Lösen Sie Verbindungseinstellungen mit `ssh -G`; vorhandene SSH-Konfiguration, Schlüssel oder ssh-agent verwenden |
| **Advanced settings → User** | Optionales Override; blank erhält SSH-Auflösung |
| **Port** | Optional für die SSH-Konfiguration; falls vorhanden, ganze Zahl 1–65535 |
| **Identity file** | Optionales Key-File-Override; blank verwendet Konfigurations-/Agentenverhalten |
| **Username and password** | Benötigt Benutzer, Port und Passwort; verwendet keine Schlüssel oder ssh-agent |
| **Cancel** | Ausscheiden ohne Registrierung des Formulars |
| **Add** | Einreichen einer gültigen Verbindung; Die Passwort-Authentifizierung muss den Verbindungstest bestehen, bevor der Host hinzugefügt wird |

![Englische SSH-Konfiguration überschreibt](/img/open-science/walkthrough-2026-09-08/53-ssh-advanced.webp)

![Passwort-Authentifizierung und Slurm in realer Form ausgewählt](/img/open-science/walkthrough-2026-09-08/52-ssh-password-slurm.webp)

Der Passwortmodus hängt von der Passwort-Authentifizierungs- und Speicherfähigkeit der Anwendung ab. Wenn es nicht verfügbar ist, überprüfen Sie den Grund, der im Formular angezeigt wird. Geben Sie Anmeldeinformationen in diesem Feld ein, nicht in Host-Notizen oder einer Agent-Anfrage.

Für einen SSH-Konfigurations-Host erstellt die App den Datensatz, öffnet die Detailansicht und startet eine Hintergrundsonde. Eine hinzugefügte Zeile beweist daher keine Authentifizierung oder Rechenbereitschaft. Lesen Sie das Sondenergebnis, bevor Sie einer Aufgabe erlauben, es zu verwenden.

### Verbinden Sie einen passwortgeschützten Forschungsserver {/* #connect-a-password-protected-research-server */}

1. Öffnen Sie **Settings → Compute → Add SSH host**. Geben Sie Ihre Serveradresse oder Ihren Alias ein.
2. Wählen Sie **Username and password**, geben Sie **User**, **Port** und **Password** ein und wählen Sie dann **Add**. Verwenden Sie den von Ihrem Administrator bereitgestellten Port; Der Beispielserver verwendet Port 22.
3. Wenn die App **The SSH host key is unknown. Verify it in a terminal before connecting.** meldet, legen Sie zuerst das Host-Vertrauen fest. Verbinden Sie sich mit dem gleichen Host und Port mit Ihrem System-SSH-Client, vergleichen Sie den angezeigten Fingerabdruck mit dem Fingerabdruck des Administrators und akzeptieren Sie ihn nur, wenn er übereinstimmt. Kehren Sie zur App zurück und versuchen Sie **Add** erneut. Deaktivieren Sie nicht die Host-Key-Überprüfung, um die Nachricht zu deaktivieren.
4. Warten Sie auf **Last probe succeeded**. Überprüfen Sie in **Configuration** **Credential configured**, die Authentifizierungsmethode und die letzte Verifizierungszeit. Das gespeicherte Passwort ist mit **Configured · cannot be viewed** gekennzeichnet.
5. Um eine bestehende Verbindung zu überprüfen oder zu ändern, öffnen Sie **Configuration → Edit** und verwenden Sie **Test and save**. Lesen Sie den Hinweis, bevor Sie die Authentifizierung ändern: Sitzungsaktivierung und Berechtigungsermächtigungen werden gelöscht, wenn die neue Konfiguration festgelegt wird. Aktivieren Sie den Host für die beabsichtigte Sitzung danach wieder.

Das englische Beispiel zeigt eine erfolgreiche passwort-authentifizierte Sonde: 256 CPUs, 504 GB RAM, ein NVIDIA A100 80GB PCIe und ein erkannter Slurm Scheduler. Der konfigurierte Modus bleibt **Direct SSH**, bis Sie ihn explizit ändern. Dies sind die Login-Host-Ressourcen dieses Servers, keine Mindestanforderungen oder eine geplante Zuweisung. Host- und Account-Identifikatoren werden im Screenshot verdeckt.

![Erfolgreiche Passwort-Authentifizierung und Host Resource Probe](/img/open-science/remote-compute/03-host-probe.webp)

## Überprüfen und pflegen Sie Host-Details {/* #inspect-and-maintain-host-details */}

| Abschnitt oder Knopf | Was zu überprüfen ist |
| --- | --- |
| **Probe** / **Retry probe** | Erfrischung der Verbindung/Ressourcenerkennung; Unterschied Nicht geprüft, Sondieren, Letzte Sonde erfolgreich und Sonde fehlgeschlagen |
| **Resources** / **Login host resources** | erfasste CPU-, Speicher-, GPU- und Schedulerinformationen; Fahrplanerzuweisungen haben getrennte Kapazität |
| **Configuration → Edit** | Überprüfen Sie die Authentifizierungseinstellungen und den aktuellen Anmeldestatus |
| **Test and save** | Testen der Kandidaten-Authentifizierungskonfiguration vor dem Speichern; Eine geänderte Konfiguration löscht Session Enablement und Permission Grants. Eine unveränderte Konfiguration meldet, dass die Einstellungen bereits aktuell sind |
| **Execution mode → Edit → Save** | Ändern des konfigurierten Modus; Vergleichen Sie es mit Detected Scheduler |
| **Details → Edit** | Host-spezifische Anweisungen aktualisieren; Save Commits, Cancel discards |
| **Mehr anzeigen / Weniger anzeigen** | Lange Noten erweitern oder zusammenbrechen |
| **Scratch root → Edit** | Speichern Sie den Fernarbeitspfad als gepinnten Wert |
| **Restore auto-detection** | Entfernen Sie den angepinnten Kratzer override so Zukunft Sondierung kann es liefern |
| **Concurrent job limit → Edit** | Legen Sie eine ganze Zahl von 1 auf 500 fest; Der angezeigte Standard ist 10 |
| Wirtsentfernung | Überprüfen Sie den Entfernungsdialog der Anwendung und die Einschränkungen des aktiven Auftrags, bevor Sie bestätigen |

Die Kratzwurzel ist ein Pfad auf dem Remote-Host. Es ist nicht das Artefaktverzeichnis Ihres Laptops. Bestätigen sie, dass das konto dort schreiben kann und dass die bereinigungsrichtlinie der website ihnen genug zeit gibt, ergebnisse zu sammeln. Ein Concurrent-Job-Limit ersetzt nicht die eigenen Quoten oder Ressourcenlimits des Schedulers.

<span id="give-verification-jobs-their-own-scratch-directory" />

### Wählen Sie ein Job Scratch Directory {/* #choose-a-job-scratch-directory */}

Öffnen Sie **Scratch root → Edit**, geben Sie einen beschreibbaren absoluten Pfad ein, der für Ihren Server genehmigt wurde, dann **Save**. **PINNED** bedeutet, dass ein späterer **Probe** Ihre Wahl behält. Bestätigen Sie den Schreibzugriff, indem Sie das Arbeitsverzeichnis und die Ausgabe des ersten Auftrags überprüfen.

Öffnen Sie für einen ersten Durchlauf **Concurrent job limit → Edit**, geben Sie **1** ein und wählen Sie **Save** aus. Dies begrenzt app-verwaltete jobs auf diesem host auf einen nach dem anderen. Es reserviert keine CPU, erzwingt keine Speicherbegrenzung oder verhindert, dass andere Benutzer Arbeit ausführen. Das Absenken des Limits stoppt einen bestehenden Job nicht. Verwenden Sie **Restore auto-detection** nur, wenn Sie möchten, dass nachfolgende Sonden den Kratzpfad erneut liefern.

### Halten Sie Host-Anweisungen getrennt von erkannten Ressourcen {/* #keep-host-instructions-separate-from-detected-resources */}

Die gespeicherten Host-Anweisungen sind unabhängig von **Resources**. Eine erfolgreiche Sonde erstellt keine Setup-Anweisungen, und leere Anweisungen bedeuten nicht, dass das Sondieren fehlgeschlagen ist. Behalten Sie die Zeitplanrichtlinie, die Umgebungsaktivierung und die reproduzierbaren Setup-Schritte in **Details**; Lesen Sie die CPU/RAM/GPU-Erkennung in Ressourcen.

Wenn ein Agent Anweisungen aktualisiert, muss er zuerst das gespeicherte Dokument lesen und genau diesen aktuellen Inhalt ersetzen. Wenn eine andere Bearbeitung es geändert hat, lesen und vergleichen Sie es erneut, bevor Sie es erneut versuchen. Verwenden Sie keine Sondenzusammenfassung, da das Dokument ersetzt wird. [Vertrag über die Ausbildung als Gastgeber](https://github.com/aipoch/open-science/commit/04adfd61).

## Bereitstellen eines Hosts für eine Aufgabe {/* #make-a-host-available-to-a-task */}

Überprüfen Sie im **Agent controls** des Gesprächs die Verfügbarkeit und Auswahl des Compute Hosts. Ein ausgewählter Host muss ebenfalls aktiviert sein. Benennen Sie den beabsichtigten Host und den Ausführungsmodus in einer Aufgabe, die ansonsten lokal ausgeführt werden könnte. Halten Sie die erste Remote-Anfrage klein genug, um den Empfang, die Protokolle und die Ausgabe zu überprüfen, bevor Sie einen wissenschaftlichen Workload einreichen.

Für Slurm erhalten Sie vom Clusterbesitzer die korrekte Konto-/Partitions-, Ressourcenanforderungs-, Wandzeit-, Modul-/Umgebungs- und Scratch-Richtlinie. Die Verfügbarkeit von `sbatch`, `squeue`, `sacct` und `scancel` unterstützt den Fahrplanbetrieb; Ihre Anwesenheit allein begründet nicht die Einreichungserlaubnis.

## Überprüfen Sie einen Host vor einem Research Workload {/* #check-a-host-before-a-research-workload */}

| Phase | Überprüfen Sie, bevor Sie fortfahren |
| --- | --- |
| Anschluss | Eine erfolgreiche Sonde und authentifizierte Verbindung. |
| Direktbeschäftigung | Ein kleiner genehmigter Job, sein Exit-Status, lesbares Protokoll und abgerufene Ausgabe. |
| Slurm-Job | Eine Scheduler-Empfangs-/Job-ID, die tatsächliche Zuweisung, der Endzustand und die abgerufene Ausgabe. |
| Wiederherstellung nach Wiedereinschaltung | Die App versöhnt den gleichen Remote-Job; kein Duplikat vorgelegt hat. |
| Annullierung | Der Scheduler/Prozess bestätigt, dass er gestoppt wurde; Inspizieren Sie die zurückbehaltenen Outputs vor der Bereinigung. |
| GPU Workload | Die erforderliche Umgebung, Gewichte, Gedächtnis und wissenschaftliche Output-Checks, zusätzlich zum SSH-Zugang. |

**Quellenüberprüfung:** [Add-Host-Formular](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAddForm.tsx), [Authentifizierungsfelder](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAuthenticationSection.tsx), [Angaben zum Gastgeber](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeHostDetail.tsx), [Verbindungsvalidierung](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute-host-connection-profile.ts) und [Session-Host-Auswahl](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/session-configuration.ts).

<ToolOperationGroup>
<summary>Führen Sie eine Remote-RNA-seq-Qualitätsprüfung durch</summary>

## Führen Sie eine Remote-RNA-seq-Qualitätsprüfung durch {/* #run-a-remote-rna-seq-quality-check */}

<p className="example-label"><strong>Praxisbeispiel</strong> Führen Sie RNA-seq-Qualitätsprüfungen durch Direct SSH durch</p>

Verwenden Sie das gleiche öffentliche [GSE60450 Zählermatrix](../workflows/data-quality.md#source-and-input-contract), wenn Sie eine Analyse von Ihrem Laptop auf einen Server verschieben. Der Vergleich eines bekannten Ergebnisses hilft dabei, ein Rechenkonfigurationsproblem von einer Änderung der wissenschaftlichen Methode zu unterscheiden.

1. Erstellen Sie ein Gespräch im Forschungsprojekt und fügen Sie die ursprüngliche Zählmatrix hinzu.
2. Öffnen Sie **Agent controls → Compute**. Aktivieren Sie den Host und fügen Sie ihn **Laufende Ziele** hinzu. Verfügbarkeit und Auswahl sind getrennte Kontrollen; Durch die bloße Registrierung eines Hosts in Settings wird dieser nicht für diese Konversation ausgewählt.
3. Fordern Sie einen **Direct SSH**-Job an, benennen Sie den Input und die erforderlichen Outputs und geben Sie die Limits an. Verwenden Sie für dieses Beispiel einen CPU-Thread, eine 1 GiB-Speicherdecke und eine 120-Sekunden-Laufzeit. Der Standard Python des Servers ist ausreichend; Es ist keine Paketinstallation erforderlich.
4. Wenn **Allow remote job submission?** erscheint, prüfen Sie **Host**, **Intent**, **Inputs**, **Execution mode**, **Timeout** und **Remote workdir**. Erweitern Sie **Show full command**, um das gesamte Skript zu überprüfen. **Once** genehmigt diese Einreichung; breitere Anwendungsbereiche gelten für nachfolgende Vorhaben. Wählen Sie einen Scope bewusst.
5. Halten Sie die zurückgegebene **Job ID**. Öffnen Sie den Job-Chip oder **Background tasks**, um diesen Job zu überprüfen. Sie können das Gespräch verlassen, während es läuft; Vermeiden sie es, eine weitere kopie einzureichen, nur weil die antwort beendet wurde.
6. Nach Abschluss öffnen Sie **Remote job details**. Überprüfen Sie **Status**, **Runtime**, **Job ID** und **Remote workdir**. Verwenden Sie **Refresh** für die aktuelle Ansicht und **stdout** oder **stderr**, um jedes Protokoll zu inspizieren. Der Remote-Workdir-Button öffnet das Remote-Verzeichnis des Jobs.
7. Warten Sie auf die Ergebnissammlung und die Folgeantwort, öffnen Sie dann das veröffentlichte CSV und melden Sie. Erfolgreiche Berechnung, Dateisammlung und Artefaktveröffentlichung sind getrennte Phasen. Ein abgeschlossener Job stellt nicht von selbst fest, dass beide erwarteten Dateien veröffentlicht wurden.

Beispielanfrage:

> Führen Sie deskriptive QC auf der angehängten GSE60450-Zählmatrix mit dem ausgewählten Direct SSH-Host aus. Bewahren Sie den Input. Für jede Probe sind die Gesamtzählung, die Nullzählungsgene, die nachgewiesenen Gene und der Median der positiven Zahl zu berechnen. Speichern Sie einen CSV und einen kurzen Methodenbericht mit Abmessungen und vor/nach SHA-256. Verwenden Sie einen CPU-Thread, keine Paketinstallation und ein 120-Sekunden-Laufzeitlimit. Geben Sie die Job-ID nach der Einreichung zurück; Sammeln und Veröffentlichen der Outputs, wenn sie beendet sind. Normalisieren Sie die Zählungen nicht oder ziehen Sie keine biologischen Schlussfolgerungen.

Nach **Erfolg** und Exit-Code **0** bestätigen Sie, dass die App beide Ausgänge sammelt und dass die gespeicherte Tabelle und der Bericht wieder geöffnet werden. Vergleichen Sie vollständige Sample-Identifier und Metriken mit dem [Gemeinsame Baseline](../reference/example-data.md) und überprüfen Sie den Eingabe-Hash vor und nach der Fernberechnung. Dieses Direct SSH-Beispiel hat diese Prüfungen bestanden.

![Abgeschlossener Direct SSH-Job mit ID und Arbeitsverzeichnis](/img/open-science/remote-compute/05-direct-job-completed.webp)

![Wiedereröffnete Remote-RNA-seq-QC-Tabelle mit allen zwölf Samples](/img/open-science/remote-compute/06-remote-qc-table.webp)

Laden Sie das Beispiel <a href="/docs/examples/gse60450/remote-rnaseq-qc.csv" download>QC-Tisch</a> und <a href="/docs/examples/gse60450/remote-rnaseq-qc-report.md" download>Methodenbericht</a> herunter. Diese Rohzählprüfungen ersetzen nicht die Normalisierung, die Überprüfung des experimentellen Designs oder die Differentialexpressionsanalyse. Der Median mit positiver Zählung schließt Nullen aus.

### Zurück zu einem Job nach dem Neustart der App {/* #return-to-a-job-after-restarting-the-app */}

Öffnen Sie das gleiche Projekt und die gleiche Konversation und verwenden Sie dann **Compute** oder den **Background tasks**-Eintrag des Jobs. Vergleichen Sie den **Job ID** mit der ursprünglichen Quittung, bevor Sie Maßnahmen ergreifen. Ein wiederhergestellter Job ist die vorhandene Remote-Workload; Das Starten einer neuen Konversation oder das erneute Senden der Aufforderung ist kein Wiederherstellungsschritt.

Der unten gezeigte separate Vorbereitungs-Checkpoint lief, als die lokale App neu gestartet wurde. Die App stellte die gleiche Job-ID wieder her und sammelte später ihr Abschlussprotokoll. Das Warten endete normal; Dieser Screenshot zeigt die Wiederherstellung, nicht die Stornierung oder eine wissenschaftliche Berechnung.

![Derselbe Vorbereitungsjob wurde nach einem Neustart der Anwendung wiederhergestellt](/img/open-science/remote-compute/07-job-recovered-after-restart.webp)

### Abbrechen eines Remote-Jobs {/* #cancel-one-remote-job */}

Öffnen Sie **Background tasks**, wählen Sie den beabsichtigten Job aus und vergleichen Sie den **Job ID** mit der Quittung. **Back** kehrt zur Jobliste der Sitzung zurück. Wählen Sie **Cancel** in der Detailansicht dieses Jobs aus, warten Sie, bis die Schaltfläche **Cancelling** anzeigt, und verwenden Sie **Refresh**, um **Cancelled** zu bestätigen. Das Schließen des Detaildialogs oder das Beenden einer Konversationsantwort storniert die Remote-Workload nicht.

Durch diese Kontrolle wurde der nachfolgende Präparationskontrollpunkt abgebrochen. Der Remote-Prozess wurde danach unabhängig bestätigt. Das vorhandene Protokoll blieb lesbar. Dies bedeutet nicht, dass eine abgebrochene Analyse zu einem vollständigen Ergebnis geführt hat; Inspizieren Sie gespeicherte Dateien, bevor Sie sie verwenden.

![Stornierung für den ausgewählten Vorbereitungsauftrag bestätigt](/img/open-science/remote-compute/09-job-cancelled.webp)


</ToolOperationGroup>

## Senden Sie über Slurm und überprüfen Sie die Zuweisung {/* #submit-through-slurm-and-check-the-allocation */}

1. Öffnen Sie den Host in **Settings → Compute**, wählen Sie **Execution mode → Edit → Slurm → Save** und öffnen Sie die Einstellung erneut, um es zu bestätigen. **Detected scheduler** allein wählt den Modus nicht aus.
2. Aktivieren und wählen Sie den Host in der beabsichtigten Konversation aus. Bestätigen Sie die Partition / das Konto und die lesbare Schedulerbuchhaltung der Website, bevor Sie eine lange Analyse durchführen.
3. Fordern Sie Ressourcen mit einer `#SBATCH --option=value`-Direktive pro Zeile an. Dieses verwendete Beispiel:

```bash
#SBATCH --partition=local
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --time=00:03:00
```

Verwenden Sie die Partition Ihrer Website, anstatt `local` bedingungslos zu kopieren. Das **120 Sekunden Workload Timeout** des Jobs ist vom Drei-Minuten-Zuweisungslimit des Schedulers getrennt; Sie bestimmen nicht, wie schnell ein in die Warteschlange gestellter Job beginnt. Die Anwendung verwaltet den Jobnamen, das Arbeitsverzeichnis und stdout/stderr Pfade.

4. Behalten Sie sowohl die App **Job ID** als auch **scheduler_job_id**. Die Scheduler-ID kann nach dem ersten Einreichungseingang eintreffen; Bitten Sie den Agenten, den Status des gespeicherten Jobs zu lesen. Nicht erneut einreichen, nur weil diese erste Quittung fehlt die Scheduler-ID.
5. Vergleichen Sie die angeforderten Ressourcen mit der tatsächlichen Zuweisung. Im Beispiel wurde eine CPU pro Task und 1 GiB angefordert; Slurm zeichnete eine Aufgabe und zwei zugewiesene logische CPUs auf. Verwenden Sie den Zuweisungsdatensatz des Schedulers, wenn Sie die Ressourcennutzung erklären.
6. Warten Sie auf einen bestätigten Terminalzustand und sammeln Sie Dateien, bevor Sie das Ergebnis veröffentlichen. Eine serverseitige Ausgabedatei stellt nicht fest, dass die Anwendung sie geerntet hat.

![Slurm explizit im Ausführungsmodus des Hosts ausgewählt](/img/open-science/remote-compute/10-slurm-execution-mode.webp)

### Wenn der Server fertig ist, aber die App wartet {/* #when-the-server-completes-but-the-app-keeps-waiting */}

Wenn der App-Snapshot `last_poll_error` meldet, behalten Sie die vorhandene Job-ID bei und fragen Sie nach dem genauen Fehler. Der beobachtete Buchhaltungsfehler war:

```text
slurm_poll_failed: Slurm accounting storage is disabled
```

Wenn der Scheduler **ABGESCHLOSSEN / ExitCode 0:0** anzeigt, die App jedoch weiterhin **Vorgelegt**, **result_final falsch** oder keine gesammelten Dateien anzeigt, behalten Sie beide Job-IDs bei und prüfen Sie den Abfragefehler. Behandeln Sie die Fertigstellung des Schedulers und die Sammlung der Anwendungsergebnisse als separate Phasen.

![Die Anwendung wartet noch auf den Terminalstatus für eine abgeschlossene Slurm-Workload](/img/open-science/remote-compute/11-slurm-accounting-unavailable.webp)

Bitten Sie den Cluster-Administrator, eine funktionierende `sacct`-Buchhaltung für das Konto und den Auftrag bereitzustellen. Ein Job, der aus `squeue` verschwindet, bestätigt den Erfolg nicht. Bewahren Sie das vorhandene Arbeitsverzeichnis und beide Job-IDs auf, aktualisieren Sie den gleichen Job, nachdem die Buchhaltung wiederhergestellt wurde, und überprüfen Sie den endgültigen Zustand und die gesammelten Dateien.

<ToolOperationGroup>
<summary>Führen Sie ein kleines Proteinsequenzdesign auf GPU aus</summary>

## Führen Sie ein kleines Proteinsequenzdesign auf GPU aus {/* #run-a-small-protein-sequence-design-on-gpu */}

<p className="example-label"><strong>Praxisbeispiel</strong> Entwerfen einer Ubiquitin-Sequenz mit ProteinMPNN auf GPU</p>

Verwenden Sie das öffentliche [1UBQ Ubiquitin-Struktur](https://www.rcsb.org/structure/1UBQ), um einen Ketten-A-Kandidaten mit ProteinMPNN zu generieren. Dies überprüft die Remote-GPU-Ausführung und -Ausgabeinspektion. Es sagt weder eine neue Struktur voraus, noch etabliert es die Ubiquitin-Funktion.

1. Wählen Sie den verbundenen Host in **Compute** aus. Überprüfen Sie den freien GPU-Speicher und die aktuelle Belastung und bestätigen Sie, dass die direkte Ausführung einer kleinen Aufgabe zulässig ist. Verwenden Sie in einem vom Scheduler verwalteten Cluster eine autorisierte Partition und ein autorisiertes Konto.
2. Bitten Sie den Agenten, eine isolierte Umgebung vorzubereiten und das Python-, PyTorch/CUDA- und Abhängigkeitsinventar zu behalten. Das Beispiel verwendete Python 3.10, PyTorch 2.5.1+cu124 und NumPy 1.26.4. Das ursprüngliche Python des Hosts hatte CPU-only PyTorch; Ein GPU allein war nicht ausreichend.
3. Pin die [Offizieller ProteinMPNN Checkout](https://github.com/dauparas/ProteinMPNN/tree/8907e6671bfbfc92303b5f79c4b5e6ce47cdef57) und seine enthalten `v_48_020` Gewichte. Zeichnen Sie SHA-256 für die heruntergeladene 1UBQ-Struktur und Gewichte auf.
4. Geben Sie die Kette **A**, den **eine**-Kandidaten, die Chargengröße **1**, die Temperatur **0.1**, den Seed **42** und ein **180-Sekunde**-Ausführungslimit an. Überprüfen Sie den von der App angezeigten Fernbefehl, bevor Sie diesen Vorgang genehmigen.
5. Erfordert Stdout/Stderr, den Exit-Status und das Parametergerät des Modells. `CUDA available=True` allein beweist nicht die verwendete Inferenz GPU. Dieser Lauf aufgezeichnet `parameter_device=cuda:0` und `parameter_is_cuda=True`.
6. Überprüfen Sie die generierte FASTA. Überprüfen Sie unabhängig Länge, Aminosäure-Alphabet, Übereinstimmungen mit der nativen Kette und endliche Werte, dann überprüfen Sie die Eingabe Hash erneut.

| Überprüfung | Ergebnis in diesem Beispiel |
| --- | --- |
| Vorrichtung | NVIDIA A100 80GB PCIe; Modellparameter tatsächlich auf CUDA |
| Input-/Outputlänge | Native Kette A und Kandidat sowohl 76-Reste |
| Alphabet und Partituren | Standard 20-Aminosäurealphabet; Finite Score / Global Score von 0.8568 |
| Native Matches | 42/76; unabhängig berechnete Wiederherstellung 0.5526316 |
| Ausführung | Modell und unabhängige Validierung verlassen 0; Modellberichtete Erzeugungszeit 0.1949 Sekunden schließt Setup und die komplette Aufgabe aus |
| Integrität der Eingaben | Identische Struktur SHA-256 vor und nach |

<a href="/docs/examples/ubiquitin/gpu-proteinmpnn-verification.json" download>Laden Sie den GPU-Verifizierungsprotokoll herunter</a>. Die 80 GB-Kapazität des Geräts ist keine Mindestanforderung für diese kleine Aufgabe; Peak Memory wurde nicht gemessen. Remote-Logs und Dateien bieten nicht automatisch eine vollständige lokale Notebook-Herkunft.

Dieses Beispiel läuft durch Direct SSH. Für einen Slurm GPU-Job bestätigen Sie zuerst die Partitions- und Kontoberechtigungen. Wenn die Übermittlung **Invalidaccount** zurückgibt, bitten Sie den Clusteradministrator, diese Einstellungen zu überprüfen; Verwenden Sie die erforderliche Warteschlange für von Schedulern verwaltete Arbeiten.


</ToolOperationGroup>

## Beheben von SSH und Jobfehlern {/* #resolve-ssh-and-job-errors */}

Lesen Sie sowohl den Code als auch seine Nachricht. Ein Verbindungsfehler, eine Ablehnung des Schedulers und ein fehlgeschlagenes Programm erfordern unterschiedliche Korrekturen. Die folgenden Identifikatoren beschreiben Verbindungs- und Berechnungsauftragszustände; Die Schnittstelle kann anstelle des Rohcodes eine beschreibende Nachricht anzeigen.

### Verbindung und Remote-Dateien {/* #connection-and-remote-files */}

| Nachricht oder Kennung | Bedeutung | Nächster Aktions- und Erfolgscheck |
| --- | --- | --- |
| `The SSH host key is unknown. Verify it in a terminal before connecting.` | Der System-SSH-Client hat keinen vertrauenswürdigen Schlüssel für diesen Host und Port. | Überprüfen Sie den Fingerabdruck mit dem Administrator, stellen Sie das Vertrauen des Hosts in den System-SSH-Client her und versuchen Sie es erneut **Add** oder **Test and save**. Deaktivieren Sie die Host-Key-Prüfung nicht. |
| `Permission denied (publickey)` | SSH-Schlüssel-Authentifizierung fehlgeschlagen; Der Remote-Datei-Klassifikator behandelt dies als `connection`. | Überprüfen Sie Benutzer, Identitätsdatei, Host-Alias und ssh-agent. Bestätigen Sie, dass der Administrator diesen Schlüssel autorisiert. Verwendung **Test and save**, dann **Retry probe**. |
| `Connection refused` / `No route to host` / Verbindung `timeout` | Der SSH-Transport kann die Verbindung nicht erreichen oder herstellen. | Überprüfen Sie die Verfügbarkeit von Host, Port, Netzwerk/VPN und Server. Reproduzieren Sie die Verbindung, nachdem Sie die Ursache behoben haben. |
| `ENOENT` / `not_found` | Der angeforderte Remote-Pfad existiert nicht. | Überprüfen Sie den Pfad auf dem Remote-Host, nicht auf Ihrem Laptop; Öffnen Sie das richtige Verzeichnis oder die richtige Datei. |
| `EACCES` / `EPERM` / `permission` | Das verbundene Konto kann diese Dateisystemoperation nicht durchführen. | Bitten Sie den Host-Administrator, den Zugriff zu bestätigen oder ein autorisiertes Scratch-Verzeichnis auszuwählen. Wiederhole die gleiche Operation. |
| `outside_roots` | Die Validierung von Ferndateipfaden hat einen nicht absoluten Pfad oder Steuerzeichen abgelehnt. | Geben Sie einen absoluten Fernpfad ohne Zeilenumbrüche / Steuerzeichen an. Überprüfen Sie den vollständigen Fehler, wenn eine andere Schicht den Pfad abgelehnt hat. |

### Stellenaufzeichnungen {/* #job-records */}

| Fehlercode | Bedeutung | Nächste Maßnahme |
| --- | --- | --- |
| `approval_denied` | Der angeforderte Vorgang erhielt keine Genehmigung. | Überprüfen Sie den beabsichtigten Befehl und Umfang. Senden Sie nur dann eine neue Anfrage, wenn Sie diese Arbeit autorisieren möchten. |
| `host_unreachable` | Die App konnte den Host-Betrieb nicht erreichen oder bestätigen. | Stellen Sie die Verbindung wieder her und untersuchen Sie den Host. Wenn die Übermittlung möglicherweise stattgefunden hat, suchen Sie nach einem vorhandenen Remote-Job, bevor Sie es erneut versuchen. |
| `invalid_resources` | Ressourcenargumente oder Slurm-Direktiven haben die Validierung nicht bestanden. | Lesen Sie das benannte Feld/die benannte Richtlinie. Befolgen Sie das akzeptierte Ressourcenformat, Cluster-Limits und alle app-verwalteten Richtlinienbeschränkungen. Versuchen Sie es erneut, nachdem Sie dieses Feld korrigiert haben. |
| `dispatch_failed` | Launch- oder Scheduler-Einreichung fehlgeschlagen. | Lesen Sie Stderr und alle `sbatch` Nachricht. Überprüfen Sie die Partition / das Konto, die Umgebung und den Befehl. Überprüfen Sie für einen Scheduler-Beleg, bevor Sie erneut einreichen. |
| `job_failed` | Der Job endete erfolglos. | Lesen Sie den Exit-Code und stdout/stderr, beheben Sie das Programm oder die Umgebung und führen Sie dann einen kleinen Test durch. |
| `timeout` | Eine Verbindung, ein Befehl oder ein Job hat ein Limit überschritten; Dieser Code kann auch ungültig begleiten `timeout_seconds`. | Verwenden Sie die begleitende Nachricht, um ungültige Eingaben von verstrichener Zeit zu unterscheiden. Überprüfen Sie den bestehenden Jobstatus, bevor Sie das Limit ändern oder erneut ausführen. |
| `process_vanished` | Tracking oder Recovery konnte den erwarteten Prozess nicht mehr finden. | Überprüfen Sie das Remote-Arbeitsverzeichnis, die Protokolle und den Zeitplanverlauf. Stellen Sie fest, ob die Arbeit gestoppt oder abgeschlossen wurde, bevor Sie einen Ersatzauftrag erstellen. |

**`last_poll_error` ist ein Überwachungsfehler**, nicht von selbst der endgültige Status des Jobs. Ebenso bedeutet `harvest_error`, dass die Ergebnissammlung Aufmerksamkeit erfordert; Möglicherweise ist die Berechnung bereits abgeschlossen. Bewahren Sie die Job-ID auf, stellen Sie die Konnektivität wieder her und prüfen Sie den bestehenden Job, bevor Sie eine weitere Kopie starten.

Eine erfolgreiche Wiederherstellung sollte den Endzustand des beabsichtigten Jobs, einen interpretierbaren Exit-Status und eine zugängliche Ausgabe anzeigen. Überprüfen Sie für Slurm die Job-ID des Schedulers sowie die Job-ID der App. Wenn der Fehler weiterhin besteht, folgen Sie [Melden Sie einen Bug oder fragen Sie die Community](troubleshooting.md#report-a-bug-or-ask-the-community); Integrieren Sie den Ausführungsmodus, beide IDs, wenn verfügbar, den vollständigen Fehler und einen entsorgten Protokollauszug.

Geben Sie für die SSH-Schlüssel-/Konfig-Authentifizierung einen nutzbaren Schlüssel oder Host-Alias an und überprüfen Sie die Verbindung, bevor Sie sie übermitteln. Slurm Ergebnissammlung erfordert Arbeitsbuchhaltung für das ausgewählte Konto; Folgen Sie den obigen Überprüfungen, wenn die App den Job nicht erledigen kann.

Quellen: [Jobcodes und Datensatzfelder berechnen](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute.ts), [SSH/Dateifehlerklassifizierung](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/remote-fs.ts), [Validierung der Slurm-Einreichung](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/compute/slurm-driver.ts).
