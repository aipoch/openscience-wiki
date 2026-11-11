---
title: "Katalog der wissenschaftlichen Werkzeuge"
last_update:
  date: '2026-11-11'
---

# Katalog der wissenschaftlichen Werkzeuge {/* #scientific-tool-catalog */}

Verwenden Sie diesen Katalog, um den Open-Science-Einstiegspunkt und die Laufzeitanforderungen für eine wissenschaftliche Methode zu finden. Es ist ein Dokumentationsindex, keine Anwendungsseite, die jedes aufgelistete Programm installiert.

## Software-Familien und wo sie laufen {/* #software-families-and-where-they-run */}

| Softwarefamilie | Open-Science-Eintrag | Einrichtung zur Überprüfung | Nützliche erste Prüfung |
| --- | --- | --- | --- |
| Python Standardbibliothek und Plot | Sitzung Notebook | Ausgewählter Python-Interpreter; Plotting von Abhängigkeiten | Lesen Sie den echten QC CSV und produzieren Sie einen kleinen Plot |
| R / Basis R | Sitzung Notebook; Einstellungen → Laufzeiten → R | App-verwalteter oder erkannter Interpreter | Drucken Sie die R-Version und reproduzieren Sie Beispielzusammenfassungen |
| Strukturvorhersagerahmen | Relevante gebündelte Skill, in der Regel Compute | Kompatibles GPU, Pakete, Gewichte, Eingabeformat und externer MSA-Zugriff, falls verwendet | Eine kleine gültige Sequenz / Komplex und seine Ausgabe Vertrauen |
| MPNN Sequenz-Design-Programme | ProteinMPNN/LigandMPNN/LöslicheMPNN Skills | Repository/Checkpoints und Python Abhängigkeiten; kleine CPU-Jobs werden durch diese Anweisungen unterstützt | Ein Rückgrat mit expliziten Fix-/Designpositionen |
| Einzelzell-Rahmensysteme | scGPT / scvi-tools Skills | AnnData, Zell-/Gen-Etiketten, Pakete und geeignete Compute | Validierung von Eingabeabmessungen und erforderlichen Schichten vor dem Training |
| Molecular structure rendering | Molekül Connector/Molekül-Viewer | Integrierte Offline-OpenChemLib-Route | Speichern und wieder öffnen aspirin.mol |
| Datei-Rendering | Dateivorschau | Unterstützte Erweiterungs- und Preview-Größenlimits | Öffnen Sie die tatsächlich heruntergeladene Datei |
| Remote Batch Software | Compute Host und Remote-Compute Skills | Host-Zugriff, Zeitplaner und benannte Umgebung | Host Probe gefolgt von einem begrenzten Job |

Siehe [Skill Verzeichnis](../skills/directory.md) für die vollständige 24-Skill-Methodentabelle. Diese Seite erklärt die Software-Bereitschaft; Es dupliziert nicht jedes Skill-Verfahren.

## Überprüfen Sie die ausgewählte Umgebung {/* #inspect-the-selected-environment */}

Verwenden Sie **Settings → Runtimes**, um verfügbare Python/R-Interpreter zu überprüfen. Wählen Sie die Laufzeit, die tatsächlich an die Sitzung gebunden ist, und prüfen Sie dort die Pakete. Eine ausführbare Datei, die an anderer Stelle auf dem Computer installiert ist, ist nicht automatisch der aktive Notebook-Interpreter.

Verwenden Sie [Laufzeiten](../guides/runtimes.md), um einen Interpreter vorzubereiten, und [Notebook](../guides/notebook.md), um eine Berechnung zu verifizieren. Wenn zusätzliche Pakete benötigt werden, überprüfen Sie die Installation und den Import in dieser Umgebung. Wenn ein Download fehlschlägt, folgen Sie [Netzwerk](../guides/network.md) mit dem betroffenen Hostnamen und Fehler.

## Bevor Sie dem Installationsbefehl eines Modells folgen {/* #before-following-a-models-install-command */}

Lesen Sie die genauen Anforderungen des installierten Skill und die unterstützte Einrichtungsroute der ausgewählten Umgebung. Paket-Namen-Kollisionen überprüfen: **Fair-ESM** und die Biohub **sms**-Implementierung sind unterschiedlich, obwohl sie sich den `esm`-Namespace teilen. Der Code und die Gewichte eines heruntergeladenen Modells können auch unterschiedliche Versionen und Zugriffsbedingungen haben.

Für ein lokales Notebook verwenden Sie den unterstützten Paketverwaltungsfluss in [Wissenschaftliche Instrumente](./scientific.md). Für einen Remote-Host verwenden Sie [Remote Compute](../guides/remote-compute.md). Ein Renderer, der eine PDB anzeigt, beweist, dass er eine Struktur anzeigen kann; Es beweist nicht, dass AlphaFold oder ein anderes Vorhersageprogramm installiert ist.

Bezugsnummer der Durchführung: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json), [SKILL.md](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md), [notebook-runtime.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts).

Verwenden Sie [Hintergrundaufgaben](../guides/notebook.md#background-tasks-and-result-delivery), um unterstützte Langzeitarbeiten zu verfolgen und die gelieferten Ergebnisse zu überprüfen. Wissenschaftliche Pakete müssen noch in der ausgewählten Laufzeit verfügbar sein.
