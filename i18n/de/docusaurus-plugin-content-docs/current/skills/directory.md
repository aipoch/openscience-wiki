---
title: "Skill Verzeichnis"
last_update:
  date: '2026-09-24'
---

# Skill Verzeichnis {/* #skill-directory */}

Die Anwendung bietet **23 gebündelt Skills**. Dieses Verzeichnis gruppiert sie nach der Arbeit, die sie unterstützen. Angaben zur versandten Methode; Sie behaupten nicht, dass jedes externe Modell, jede Abhängigkeit oder jeder Dienst installiert ist.

Für Methoden, die über die App verteilt werden, verwenden Sie das [Marktplatz-Installationsleitfaden](marketplace.md). Das unten stehende Verzeichnis hilft Ihnen bei der Auswahl einer Forschungsmethode; Es ist kein Live-Inventar von Marktplatzversionen.

## Prüfung der Bereitschaft, bevor eine Methode ausgewählt wird {/* #check-readiness-before-selecting-a-method */}

1. Öffnen Sie den Skill in den Einstellungen und lesen Sie die vollständigen Anforderungen und Hinweise von Drittanbietern.
2. Vergleichen Sie den Eingabetyp mit Ihren tatsächlichen Daten. Eine Bulk-RNA-seq-Tabelle ist kein Einzelzellen-AnnData-Objekt; eine molekulare Zeichnung ist kein Andockergebnis.
3. Überprüfen Sie die ausgewählte Laufzeit und die Pakete. Wählen Sie für Remote-Arbeiten einen verwendbaren Compute-Host aus und inspizieren Sie dessen Umgebung, bevor Sie einreichen.
4. Fordern Sie einen begrenzten Durchlauf an, prüfen Sie die tatsächliche Ausgabe und behalten Sie die Eingabe- / Versionsreferenzen bei, bevor Sie hochskalieren.

Zwei zusätzliche manifeste Einträge, Selbst-Bewusstsein und Skill-Creator, sind interne Rahmenressourcen. Es handelt sich nicht um benutzerseitige Verzeichniseinträge. Persönliche oder importierte Skills, einschließlich rnaseq-count-qc, sind getrennt von der Anzahl von 23.

Die drei Environment-Anwendungen Skills und Customize bleiben aktiviert; siehe [Aktivierungsregeln](overview.md#why-some-switches-cannot-be-turned-off). Verwenden Sie [gebündeltes Manifest](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json), um versendete Methoden zu identifizieren, und [Remote Compute](../guides/remote-compute.md) für die Einrichtung des Hosts und die Auslieferung der Ergebnisse.

## Durchsuchen nach Forschungsaufgabe {/* #browse-by-research-task */}

### Proteinstruktur {/* #protein-structure */}

| Fähigkeit | Eingabe | Abhängigkeiten und Ausführung | Inspizierung der Produktion |
| --- | --- | --- | --- |
| [AlphaFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | Protein FASTA; Monomer oder Komplex | ColabFold, Modellgewichte, GPU; optionaler öffentlicher MSA-Dienst | Voraussichtliche Strukturen und Konfidenzwerte |
| [Bolz](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | Protein/DNA/RNA/Ligandkomplex-Spezifikation | Boltzpackung, Gewichte, GPU; MSA-Zugang, wenn beantragt | Komplexe Struktur und Vertrauen; Optionaler Affinitätsausgang |
| [Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | FASTA mit mehreren Unternehmen | Chai-Labor, Gewichte, GPU | All-Atom-Komplex und Vertrauen |
| [ESMFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | Sequenzen oder komplexe Eingaben | Biohub esm Paket, Gewichte, CUDA; Unterschied zu Fair-ESM | Strukturvorhersagen; ESMC-Vertretung, sofern beantragt |
| [OpenFold3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | Spezifikation Protein/Nukleinsäure/Liganden | OpenFold3, weights/access, CUDA und konfigurierte Kernel | Komplexe Strukturen und Partituren |

### Proteindesign {/* #protein-design */}

| Fähigkeit | Eingabe | Abhängigkeiten und Ausführung | Inspizierung der Produktion |
| --- | --- | --- | --- |
| [DiffDock](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | Ziel-PDB plus Ligand SMILES/SDF | DiffDock-Repository, Gewichte und GPU | Rangligandenposen; Pose-Vertrauen ist keine Affinität |
| [ProteinMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | Rückgrat-PDB, konstruiert/feste Ketten und Rückstände | Lager, Kontrollpunkte, Fackel/Zahl; Small Jobs unterstützen CPU | Entworfene Sequenzen und Scores |
| [LigandMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | Rückgrat plus Ligand/Metall/Nukleinsäurekontext | Repository und Python Abhängigkeiten; Small Jobs unterstützen CPU | Sequenzen und Gewindestrukturen |
| [LöslicheMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | Proteinrückgrat | ProteinMPNN-Repository und lösliche Kontrollpunkte; CPU möglich | Sequenzen unter dem löslichen Modell vor |

### Sequenz und Zellen {/* #sequence-and-cells */}

| Fähigkeit | Eingabe | Abhängigkeiten und Ausführung | Inspizierung der Produktion |
| --- | --- | --- | --- |
| [ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | Proteinsequenzen | fair-esm und Gewichte; gebündeltes Verfahren verwendet GPU | Einbettungen, Logits oder Kontaktvorhersagen |
| [Borzoi](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | DNA-Fenster mit angegebenen Genom/Koordinaten | Borzoi-Pytorch, Gewichte und CUDA | Voraussichtliche genomische Spuren oder Referenz-/Alternat-Deltas |
| [Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | DNA-Sequenzen oder Präfixe | Evo 2 Gewichte, kompatibles CUDA und ausreichend Speicher | Sequenzwahrscheinlichkeiten, Einbettungen oder erzeugte DNA |
| [scGPT](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | Einzelzell-AnnData mit Gen-Vokabular-Mapping | scGPT-Paket, Checkpoint und GPU | Zelleinbettungen oder Annotationsausgänge |
| [scvi-tools](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | Anzahl der Einzelzellen und Batch-/Label-Metadaten | scvi-tools/scanpy/anndata; Gebündelter Trainingsworkflow erwartet GPU | Latente Darstellung, Label-Transfer oder modellbasierte Vergleiche |

### Nachweise und Schriftstücke {/* #evidence-and-writing */}

| Fähigkeit | Eingabe | Abhängigkeiten und Ausführung | Inspizierung der Produktion |
| --- | --- | --- | --- |
| [Literaturrecherche](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | Forschungsfrage, Identifikatoren oder Papiere | Quellenabruf; OpenAlex-Schlüssel für OpenAlex-Operationen | Verifizierte Evidenzsynthese und Zitate |
| [Angabendossier](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | Eine Indikation als Patientenpopulation eingerahmt | Forschungswerkzeuge und Source Access | Resumable Research Waypoints und ein Dossier |

### Umgebung {/* #environment */}

| Fähigkeit | Eingabe | Abhängigkeiten und Ausführung | Inspizierung der Produktion |
| --- | --- | --- | --- |
| [Umwelt & Pakete](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | Fehlende Paket- oder Versionsfrage | Ausgewählte Python/R Laufzeit und erlaubte Paketquelle | Paketinspektion, verwaltete Installation und Importkontrolle |
| [Einrichtung einer Comput-Umgebung](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | Benannte Umgebung auf einem SSH/Slurm-Host | Konfigurierte Host- und Benutzer-/Admin-verwaltete Aktivierung | Einrichtungsanweisungen und Validierungsprotokoll |
| [Remote Compute (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | Ein Workload und ein berechtigter Compute Host | SSH-Zugangsdaten, Host, gegebenenfalls Scheduler | Eingereichte Arbeit, geerntete Ergebnisse und veröffentlichte Artefakte |

### Autorisierung {/* #authoring */}

| Fähigkeit | Eingabe | Abhängigkeiten und Ausführung | Inspizierung der Produktion |
| --- | --- | --- | --- |
| [Anpassen](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | Eine angeforderte Skill oder Specialist Änderung | Arbeitsbeauftragte; Native Customization Operationen | Gespeichertes Paket oder Rolle mit Read-Back-Verifizierung |
| [Figurenstil](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | Tatsächliche Daten und eine endgültige Zahl | Notebook Funktion und Plot Abhängigkeiten | Besichtigte Fläche mit lesbaren Etiketten und zuverlässigen Daten |
| [Bildkomponist](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | Ein Anspruch und unveränderliche Datenversionsreferenzen | Main Agent, Delegation, Plot und Review | Multi-Panel Figur und Review Iterationen |
| [Paper Narrative](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | Manuskript/Abstract, Bildunterschriften und geordnetes Figurendeck | Geerdete Artefaktversionen und Review-Tools | Paper Brief und ein geordnetes Zahlenargument |



Bezugsnummer der Durchführung: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json).
