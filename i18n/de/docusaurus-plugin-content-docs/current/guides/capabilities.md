---
title: "Fähigkeiten und unterstützte Inputs"
last_update:
  date: '2026-09-14'
---

# Fähigkeiten und unterstützte Inputs {/* #capabilities-and-supported-inputs */}

Open-Science bringt die Gespräche, Quelldateien, Literaturaufzeichnungen und generierten Ergebnisse eines Forschungsprojekts in einen lokalen Arbeitsbereich. Ein konfiguriertes Modell lenkt die Arbeit; Notebook-Laufzeiten, Tools und verbundene Dienste führen die Operationen aus, die sie benötigen. Wählen Sie einen Ausgangspunkt aus dem Material, das Sie bereits haben.

## Beginnen Sie mit Ihrem Input {/* #start-with-your-input */}

| Sie haben | Erste Maßnahme | Ergebnis zu fragen nach | Überprüfen Sie, bevor Sie es verwenden |
| --- | --- | --- | --- |
| Eine Forschungsfrage und mehrere DOIs | Erstellen eines Projekts; Suchen Sie nach den Identifikatoren und überprüfen Sie Library Inbox Kandidaten | Eine quellengeprüfte Lesesammlung | Titel, Autorenlisten, Jahre und Identifikatoren gegen den Verlag |
| Ein Ordner mit Papieren oder exportierten Referenzen | Verwenden Sie die Import- und Sammelkontrollen der Literaturbibliothek | Eine organisierte Sammlung mit angehängten verfügbaren PDFs | Warnhinweise, Duplikate und Übereinstimmungen mit Anhängen |
| CSV oder TSV | Fügen Sie es an eine Sitzung an und fordern Sie eine Notebook-Analyse an | Datenaudit, Ergebnistabelle und Abbildung | Fehlende Werte, Einheiten, Nenner und die gespeicherten Dateien |
| Ein PDF oder Manuskript | Fügen Sie das Dokument an oder öffnen Sie es in Dateien | Eine passagenspezifische Erklärung oder ein Revisionsplan | Ob der Agent den vollständigen Text gelesen hat und ob die zitierten Seiten seine Behauptungen stützen |
| Eine Sequenz oder molekulare Struktur | Öffnen Sie eine unterstützte FASTA-, PDB- oder Moleküldatei | Eine Vorschau, ein Validierungsbericht oder eine Analyse unter Verwendung eines geeigneten Tools | Eingabekonventionen, Methodenanforderungen und Werkzeugverfügbarkeit |
| Ein Verfahren, das Sie wiederverwenden | Erstellen oder Importieren eines Skill | Wiederverwendbare Anweisungen und unterstützende Dateien | Aktivierter Status, erforderliche Abhängigkeiten und eine Testversion auf einer bekannten Eingabe |
| Eine definierte Forschungsrolle | Erstellen Sie ein Specialist und weisen Sie seine Fähigkeiten zu | Eine Rolle mit expliziten Anweisungen und Zugriff | Ausgewähltes Skills, Konnektoren und das Ergebnis der delegierten Arbeit |

Verwenden Sie für Zahlen und Tabellen in einem Papier [lokale PDF-Extraktion](previews.md#pdf-extraction). Finden Sie wiederverwendbare Methoden über den [Skill-Marktplatz](../skills/marketplace.md). Überprüfen Sie ein erfasstes Ergebnis mit [Reproduzierbarkeit](reproducibility.md) oder teilen Sie seine Konversation und Beweise über ein [.science Paket](research-packages.md).

Ein Viewer, der eine Datei öffnet, zeigt nicht an, dass das Modell sie gelesen hat. Das Anfügen einer Datei gibt der Sitzung eine Quelle, mit der sie arbeiten kann; Überprüfen Sie die aufgezeichneten Lesevorgänge, Toolaufrufe und Ausgabenachweise, um festzustellen, wie der Agent sie verwendet hat. Genaue Erweiterungen und Größenbegrenzungen sind in [Dateiformate und Limits](../reference/formats.md).

## Verstehen Sie die Workspace-Objekte {/* #understand-the-workspace-objects */}

| Objekt | Was du dort hältst | Beziehung zu anderen Objekten |
| --- | --- | --- |
| **Project** | Forschungszweck, langlebiger Agent Context, Sessions und Projektdateien | Verwenden Sie es, um eine Untersuchung zusammenzuhalten |
| **Session** | Anfragen, Antworten, Tool-Aktivitäten und Konversationszweige | Jede Session gehört zu einem Projekt |
| **Upload** | Eine verwaltete Kopie des Quellmaterials | Halten Sie es getrennt von abgeleiteten Ergebnissen |
| **Artefakt** | Ein generierter Bericht, eine Abbildung, eine Tabelle oder eine andere Datei | Versionen behalten Beweise, die mit ihrer Produktion verbunden sind |
| **Literaturverweis** | Bibliographische Metadaten, Identifikatoren und Anlagen | Organisieren Sie es in Sammlungen und verbinden Sie es mit Projekten |
| **Notebook** | Python oder R Ausführung und ihre Ausgänge | Überprüfen Sie die Berechnungen und Live-Variablen der Sitzung |
| **Skill** | Anweisungen und unterstützende Dateien für eine Methode | Aktivieren Sie es und wählen Sie es vom Komponisten aus, wenn dies angemessen ist |
| **Specialist** | Eine Rolle, Anweisungen und ausgewählte Fähigkeiten | Konfigurieren und Aufrufen für Arbeiten, die zu dieser Rolle passen |
| **Connector** | Zugang zu externen Tools oder Datendiensten | Verfügbarkeit hängt von Konfiguration, Anmeldeinformationen und Richtlinien ab |

Project **Description** hilft Ihnen, das Projekt zu identifizieren. Setzen Sie Anweisungen, die der Agent in **Agent Context** befolgen muss. Letzteres ist im Modellkontext enthalten; Es ist kein Ort, um Anmeldeinformationen zu speichern.

## Bereiten Sie nur die Abhängigkeiten vor, die Ihre Aufgabe benötigt {/* #prepare-only-the-dependencies-your-task-needs */}

Ein Gespräch benötigt ein Work Agent Framework und eine Modellverbindung. Eine Python-Berechnung benötigt auch eine aktivierte Python Notebook-Laufzeit. Ein Service-Lookup benötigt das entsprechende Connector, den Netzwerkzugang und alle erforderlichen Anmeldeinformationen. Eine GPU-Methode kann eine separate Maschine, Softwareumgebung und Modellgewichte erfordern, auch wenn ihre Skill bereits aufgeführt ist.

Konfigurieren Sie das Modell, die Laufzeit und die Datendienste separat. Überprüfen Sie nach dem Verbinden des Modells die für die Berechnung erforderlichen Pakete. Wenn ein Paket fehlt, installieren Sie es oder wählen Sie explizit eine Methode aus, die die verfügbare Umgebung verwendet.

Siehe [Provider-Einrichtung](providers.md), [Python und R Laufzeiten](runtimes.md) und [Netzwerk](network.md) für diese unabhängigen Setup-Pfade. Ein erfolgreicher Modellverbindungstest validiert nicht jeden nachgelagerten Dienst.

## Entscheiden Sie, ob ein Ergebnis bereit ist {/* #decide-whether-a-result-is-ready */}

Öffnen Sie die gespeicherte Ausgabe und vergleichen Sie sie mit der Anforderung. Überprüfen Sie für eine Tabelle die Zeilenanzahl, Einheiten und die Behandlung fehlender Daten. Überprüfen Sie für eine Bibliographie Identifikatoren und vollständige Autoren. Für codegenerierte Ergebnisse, prüfen Sie **Provenance** und Notebook. Überprüfen Sie Etiketten wie teilweise Umgebungserfassung oder nicht verfügbare Beweise, bevor Sie ein Ergebnis reproduzierbar nennen.

Die formalen Beispiele verwenden öffentliche Forschungsbeiträge:

- [PRISMA Lesesammlung](../workflows/core-reading-list.md): drei echte Papiere, überprüfte Bibliotheksaufzeichnungen und ein beigefügter Verlag PDF.
- [GSE60450 RNA-seq-Analyse](../workflows/data-quality.md): 27,179-Genreihen, 12-Proben, unabhängig geprüfte QC-Metriken, eine Rohzahl und erfasster Herstellercode.

[Remote Compute](remote-compute.md) umfasst RNA-seq QC bis Direct SSH, Sammeln von Ergebnissen, Wiederherstellung und Löschung. Es erklärt auch Slurm Buchhaltungsanforderungen und einen kleinen ProteinMPNN Sequenz-Design-Workflow auf einem A100 GPU in einer isolierten CUDA-Umgebung.

## Lokale Lagerung und externe Verarbeitung {/* #local-storage-and-external-processing */}

Die Anwendung speichert ihren Arbeitsbereich lokal. Wenn Sie eine Anfrage an ein gehostetes Modell senden, gehen relevante Anweisungen und Inhalte an diesen Anbieter. Konnektoren und Remote-Jobs können Daten an ihre konfigurierten Dienste senden. Verwenden Sie die tatsächlich ausgewählte Provider- und Tool-Aktivität, um zu identifizieren, wo eine Aufgabe ausgeführt wird; Lokale Speicherung allein bedeutet nicht Offline-Verarbeitung.

**Quellenüberprüfung:** [Produktdokumentation](https://github.com/aipoch/open-science/blob/v0.26.0/README.md), [Projektfelder](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/projects.ts) und [Preview Routing](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts). Die beiden verknüpften Fallstudien tragen ihre Betriebsaufzeichnungen und englischen Screenshots.
