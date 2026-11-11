---
title: "Spezialisten und verfügbare Rollen"
last_update:
  date: '2026-11-11'
---

# Spezialisten und verfügbare Rollen {/* #specialists-and-available-roles */}

Ein Specialist ist eine gespeicherte Forschungsrolle: Identität, Anweisungen und erlaubte Skills/Connectors. Verwenden Sie eine, wenn eine wiederkehrende Verantwortung einen konsistenten Umfang oder eine separate Teilaufgabe erfordert. Der Name einer Rolle allein schafft keine Expertise oder Verifizierung.

## Verstehen Sie die verfügbaren Rollen {/* #understand-the-available-roles */}

| Rolle oder Quelle | Wie es verwendet wird | Was Sie konfigurieren können |
| --- | --- | --- |
| Hauptagent | Behandelt das Gespräch und kann delegierte Arbeiten koordinieren | Sitzungsmodell, Agentensteuerungen und verfügbare Fähigkeiten |
| Custom Specialist | Lokal für eine definierte Forschungsaufgabe erstellt | Identität, Anweisungen, explizite Skills/Connectors oder Vollzugriff |
| Importiert / Marktplatz Specialist | Installiert aus einem Paket, dann auf diesem Gerät konfiguriert | Lokale Einrichtung und erlaubte Fähigkeiten; inspect Publisher und Paketversion |
| Eingebauter Reviewer | Führt den Review-Workflow der App durch | Trigger-Überprüfung durch das Gespräch; Es ist kein normaler editierbarer / delegierbarer Specialist |

Öffnen Sie **Marketplace**, um veröffentlichte Rollen zu finden. Der Online-Katalog kann sich unabhängig von Ihrer installierten App ändern. Überprüfen Sie den Publisher jeder Rolle, die Anweisungen und Abhängigkeiten vor dem Import.

## Finde eine Rolle {/* #find-a-role */}

Öffnen Sie **Resource center → Specialists**. **Installed** zählt die lokal registrierten Rollen, einschließlich Reviewer. Verwenden Sie **Search specialists** und **Filters → Filter specialists by category**, dann öffnen Sie eine Zeile, um es zu inspizieren. **Marketplace** öffnet einen anderen Katalog; ein gelisteter Markteintrag wird erst dann installiert, wenn Sie den Paket-/Setup-Flow abgeschlossen haben.

![Der RNA-seq QC Reviewer wurde lokal installiert](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

## Marktplatzrollen beobachtet {/* #marketplace-roles-observed */}

| Rolle | Vorgesehener Forschungsumfang |
| --- | --- |
| Autoforschung Specialist | Biomedizinische Nachweise, Analysen, Validierung und Schreiben |
| Cryo-EM-Strukturvalidierung Specialist | Validierungsplanung für Halbkarten, Geometrie und Kartenmodelle |
| Pharmakometrie PK/PD Design Specialist | PK/PD-Forschungsdesign und Unsicherheitsprüfungen |
| Multimodale Neuroimaging Connectomics Architekt | MRI/fMRI/Diffusions-Workflows und Netzwerkanalyse-Kontrollen |
| Synthetische Routen- und Reaktionsoptimierung Specialist | Reaktionsplanung und -optimierung |
| Prüfung und Validierung von Aerodynamik CFD Specialist | Numerische Konvergenz und Versuchsvergleichsplanung |
| Atmosphärische Chemie Transportmodellierung Specialist | Studien zu Emissionen, Transport und Quellenzuweisung |
| Hochdurchsatz DFT Screening Specialist | Konvergenz- und Thermodynamikprüfungen |
| Astronomische Photometrie und Zeitbereichsanalyse Specialist | Kalibrierungs-, Photometrie- und Variabilitätsanalysen |
| Precision Agriculture Phänotypisierung und Rezeptdesign Specialist | UAV-Phänotypisierung und räumliche Validierung Workflows |

Dies sind beobachtete Katalogbeschreibungen, keine Beweise für zehn abgeschlossene wissenschaftliche Workflows. Der Reviewer des Produkts unterscheidet sich auch von dem in diesen Kapiteln verwendeten benutzerdefinierten **RNA-seq QC Reviewer**.

## Wählen Sie eine Route {/* #choose-a-route */}

- [Erstellen und Unterweisen](./identity.md): Definieren Sie eine lokale Forschungsrolle.
- [Zuweisung von Fähigkeiten](./capabilities.md): Bestimmen Sie, was es verwenden kann.
- [Delegieren und Prüfen](./delegate.md): Inspizieren Sie einen tatsächlichen Kinderlauf und seine Beweise.
- [Reviewer und Auto-Review](./reviewer.md): Verwenden Sie den eingebauten Überprüfungsprozess der App.
- [Verwalten und Teilen](./manage.md): Paketieren, Importieren, Lösen von Konflikten und Beenden der lokalen Einrichtung.

Bezugsnummer der Durchführung: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json), [SpezialistenPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
