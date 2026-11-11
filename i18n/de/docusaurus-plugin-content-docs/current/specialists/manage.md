---
title: "Verwalten und Teilen von Spezialisten"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Verwalten und Teilen von Spezialisten {/* #manage-and-share-specialists */}

Verwenden Sie ein Paket, um eine konfigurierte Rolle zu verschieben, und vervollständigen Sie die lokale Einrichtung nach dem Importieren. Skills, Connector-Referenzen und lokale Berechtigungen haben unterschiedliche Portabilitätsregeln.

Überprüfen Sie im Batch-Management die ausgewählte Anzahl im unteren Aktionsbereich, bevor Sie eine Operation durchführen. Lesen Sie dort das Abschluss- oder Fehler-Feedback und überprüfen Sie dann die resultierenden Elemente. Die Auswahl eines Eintrags allein aktiviert, installiert oder löscht ihn nicht.

## Listenkontrollen {/* #list-controls */}

| Kontrolle | Betrieb und erwartetes Ergebnis |
| --- | --- |
| Suchspezialisten / Kategoriefilter | Eingeschränkte Reihen; Filter löschen, wenn eine gespeicherte Rolle fehlt. |
| Edit / Rollenname | Öffnet den vorhandenen Editor. Speichern Sie Änderungen und öffnen Sie sie erneut, um sie zu überprüfen. |
| Ändertes Aussehen | Ändert Icon / Farbe, ohne die Anweisungen zu ändern. |
| Tags verwalten | Ordnet organisatorische Labels zu. |
| Umschalter | Ermöglicht / deaktiviert die Rolle, ohne sie zu löschen. |
| Aktionen → Duplizieren | Öffnet einen Neurollenentwurf mit kopierten Anweisungen/Bindungen und einem Kopiernamen. Erstellen Spezialist ist noch erforderlich. |
| Aktionen → Export ZIP | Öffnet die Exportauswahl und speichert ein tragbares Paket. |
| Aktionen → Löschen | Öffnet eine Bestätigung zur dauerhaften Löschung; prüfen Sie die optionale Skill-Löschung separat. |

Bevor Sie eine Rolle löschen, prüfen Sie die Option, um ihre Skills zu löschen. Behalten Sie geteilte Skills, wenn andere Rollen sie noch verwenden. Das Löschen eines Duplikats erfordert nicht das Löschen der ursprünglichen Rolle.

![Löschen der Einweg-Rolle bei gleichzeitiger Beibehaltung des freigegebenen Skills](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## Teilen und Importieren eines Pakets {/* #share-and-import-a-package */}

### Exportieren Sie mit den erforderlichen Skill-Dateien {/* #export-with-the-required-skill-files */}

<p className="example-label"><strong>Beispiel</strong> Teilen Sie eine Reviewer-Rolle mit seinem Skill</p>

1. Wählen Sie **Actions → Export ZIP** auf RNA-seq QC Reviewer.
2. Wählen Sie in **Choose Skills to include** explizit `rnaseq-count-qc`, wenn der Empfänger seine Dateien benötigt. Ein installiertes persönliches / importiertes Skill ist standardmäßig nicht unbedingt enthalten.
3. Exportieren und inspizieren Sie das Archiv vor dem Teilen.

![Auswählen eines Skill zum Einschließen in das Specialist-Paket](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

Der aktuelle <ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">Paket mit Skill</ExampleDownload> enthält `manifest.json`, `specialist.json`, `skills/rnaseq-count-qc/SKILL.md` und sein Referenzschema. Ein minimaler Export kann nur die beiden JSON-Dateien enthalten. Connector IDs sind Referenzen; Anmeldeinformationen, lokales Vertrauen und Vollzugriff werden nicht als gebrauchsfertige Autorisierung übertragen.

### Importieren, Konflikte lösen, Setup beenden {/* #import-resolve-conflicts-finish-setup */}

1. Wählen Sie **Add specialist → Import ZIP → Choose ZIP**. Ein Paket enthält genau ein Specialist. **Download template** stellt die Anwendungspaketvorlage zur Verfügung.
2. Überprüfen Sie den Namen, die unveränderliche ID, die Version, das gebündelte Skills, die Archivgrenzen und die Diagnose.
3. Wählen Sie für jeden Skill-Konflikt **Keep installed Skill** oder **Use package Skill**. Die zweite Option ersetzt Dateien für jeden aktuellen Benutzer dieses Skill; Lesen Sie **Betroffen jetzt**.
4. Wählen Sie für eine vorhandene Specialist-ID **Review overwrite**, prüfen Sie aktuelle / eingehende Versionen und exportieren Sie die aktuelle Version bei Bedarf zuerst. **Overwrite and continue** ist eine separate Bestätigung.
5. Die importierte Rolle wird **Behinderte / SETUP INCOMPLETE** gespeichert. Überprüfen Sie Anweisungen und Fähigkeitsbindungen im Editor, wählen Sie den beabsichtigten Zugriffsbereich, dann **Save changes**, um die Einrichtung abzuschließen und zu aktivieren.
6. Öffnen Sie die installierte Rolle erneut und führen Sie eine kleine, umfangreiche Aufgabe aus.

![Lösung des echten RNA-seq Skill-Konflikts während des Imports](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**Version unverändert** kann immer noch einen Skill-Konflikt begleiten. Wählen Sie die beabsichtigte Skill-Quelle explizit aus und öffnen Sie dann die importierte Rolle erneut, um die Bindungen und den Zugriffsumfang zu bestätigen.

| Vorschaukontrolle | Was zu inspizieren |
| --- | --- |
| Gebündelte Skill Erweiterung | Version, Anordnung, Begründung und Dateiliste. |
| Archivgrenzen | 50 MB komprimiert, 200 MB unkomprimiert, 2,000-Dateien, 25 MB pro Datei in dieser Benutzeroberfläche. |
| Diagnose | Blockierung von Fehlern, Warnungen und Informationen; Eine Warnung kann eine ausdrückliche Wahl erfordern. |
| Bericht kopieren / Download JSON | Exportieren von Diagnosen zur Fehlersuche. Überprüfen Sie den Bericht, bevor Sie ihn teilen. |
| Abbrechen | Verlässt die Vorschau ohne Installation. |
| Next / Review Overwrite | Wird nur dann fortgesetzt, wenn die erforderlichen Auswahlmöglichkeiten und Validierungen dies zulassen. |

**Import aus einem Browser:** wählt **Import ZIP → Choose ZIP** aus, überprüft dann das Paket, löst Konflikte und schließt die lokale Einrichtung ab, bevor die Rolle aktiviert wird. Anmeldeinformationen und Vertrauenskonfiguration müssen auf dem Zielgerät eingerichtet werden. Wenn der Upload fehlschlägt, behalten Sie den Fehler bei und folgen Sie [Fehlerbehebung](../guides/troubleshooting.md).

## Durchsuchen Sie den Marktplatz {/* #browse-the-marketplace */}

Öffnen Sie **Marketplace**, suchen Sie eine Rolle und wählen Sie **View details**. Überprüfen Sie Publisher, Quelle, Version, Lizenz, Download-Größe und enthalten Skills/Connectors. **Refresh Marketplace** aktualisiert den Katalog; **Manage Marketplace sources** steuert die konfigurierten Quellen. Alle/Offiziellen/Community-Filter betreffen die Katalogherkunft, nicht die Laufzeitbereitschaft.

![Das eigentliche Auto Research Specialist Paket Detail](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

Wählen Sie **Install Specialist** aus, bestätigen Sie dann, dass die Rolle in **Marketplace** erscheint, und überprüfen Sie den Freigabezustand und die Bindungen. Die Anzahl der Katalogpakete beschreibt dieses Paket, nicht alle Anwendungsmöglichkeiten. Die Installation führt keine Forschungsaufgabe aus oder bereitet jede externe Abhängigkeit vor; Beenden Sie die erforderliche Einrichtung vor der Verwendung.

![Auto Research installiert und aktiviert](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

## Überprüfen Sie vor dem Teilen {/* #verify-before-sharing */}

Führen Sie nach dem Importieren oder Ändern der Rolle eine kleine Aufgabe mit den zugewiesenen Funktionen aus und überprüfen Sie die gespeicherte Ausgabe. Folgen Sie [Erweitern einer Analyse mit einem installierten Specialist](../workflows/extend-analysis.md) für bestehende Methoden, PCA und Matrixbeispiele. Überprüfen Sie die erforderlichen Eingaben und ungelösten Einschränkungen für die ausgewählte Route.

Bezugsnummer der Durchführung: [SpezialistenPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
