---
title: "Skills und Konnektoren zuweisen"
last_update:
  date: '2026-09-24'
---

# Skills und Konnektoren zuweisen {/* #assign-skills-and-connectors */}

Die Fähigkeitsliste eines Specialist bestimmt, welche Skills und Konnektoren es erreichen kann. Ein global aktiviertes Connector ist nicht automatisch für jedes eingeschränkte Specialist verfügbar.

## Konfigurieren Sie expliziten Zugriff {/* #configure-explicit-access */}

<p className="example-label"><strong>Beispiel</strong> Zuweisen von Funktionen an RNA-seq QC Reviewer</p>

1. Öffnen Sie **Settings → Specialists** und bearbeiten Sie dann **RNA-seq QC Reviewer**.
2. Schalten Sie **Full access** aus.
3. Wählen Sie in **Skills** **Hinzufügen einer Fertigkeit**, suchen Sie `rnaseq-count-qc` und fügen Sie das gespeicherte Personal-Paket hinzu. **Skills 1** bestätigen.
4. Wählen Sie in **Connectors** **Fügen Sie einen Connector hinzu** und **Omics-Archive** aus. **Steckverbinder 1** bestätigen.
5. Öffnen Sie die Details einer Fähigkeit, um zu überprüfen, ob Sie die beabsichtigte Ressource ausgewählt haben. Speichern und öffnen Sie die Rolle, um die Beharrlichkeit zu bestätigen.

![Der Specialist mit einer expliziten Fähigkeitsauswahl](/img/open-science/capabilities-walkthrough/05-specialist-capabilities.webp)

| Kontrolle | Wirkung |
| --- | --- |
| Vollzugriff auf On | Verwendet den geerbten Fähigkeitsumfang mit expliziten Ausschlüssen pro Ressource. Überprüfen Sie die aufgelöste Liste nach dem Ändern **Manage access**. |
| Voller Zugriff Off | Verwendet die expliziten Listen; Eine fehlende Bindung kann nicht allein durch Nennen eines Werkzeuges in der Eingabeaufforderung geliefert werden. |
| Hinzufügen einer Fertigkeit / Hinzufügen eines Connectors | Öffnet einen Selektor für diesen Fähigkeitstyp. |
| Angaben zur Leistungsfähigkeit | prüft die Ressource; Sie führt ihren wissenschaftlichen Workflow nicht durch. |
| Entfernen | Entfernt diese Bindung, ohne die Ressource zu deinstallieren. |
| Änderungen speichern | Beharrt auf dem ausgewählten Umfang. |

Anwendungserforderliches Skills bleibt global aktiviert. Dies ersetzt nicht die Specialist-Fähigkeitsliste oder schaltet den vollen Zugriff ein. Wenn Customize für diese Rolle nicht verfügbar ist, überprüfen Sie die verbindliche und aufgelöste Ressource. Siehe [Skill Aktivierung](../skills/overview.md#why-some-switches-cannot-be-turned-off).

## Passen Sie den Zugriff aus einer Ressource {/* #resource-access */}

Unter **Settings → Skills** oder **Connectors** öffnen Sie das **Manage access**-Popup einer Ressource, um Main Agent und Specialist-Zuordnungen gemeinsam zu inspizieren. Es aktualisiert die Bindung der ausgewählten Rolle, nicht den aktivierten Status der Rolle. Full-Access-Rollen können Ausschlüsse pro Ressource haben; Eingeschränkte Rollen verwenden explizite Selektionen. Marketplace-Bindungen können nur in diesem Popup gelesen werden. Siehe [illustrierte Zugangskontrollen](../guides/connectors.md#resource-access).

Nachdem Sie eine Bindung geändert haben, bestätigen Sie, dass die Rolle aktiviert ist, die Dienstanmeldeinformationen bereit sind und der beabsichtigte Betrieb zulässig ist. **Used by** zeigt Zuweisungen statt abgeschlossener Läufe.

## Vier separate Bereitschaftskontrollen {/* #four-separate-readiness-checks */}

| Schicht | Was zu überprüfen ist | Beispielfehler |
| --- | --- | --- |
| Rolle | Installiert, aktiviert, Setup abgeschlossen | Eine importierte Rolle bleibt deaktiviert, bis das Setup gespeichert ist. |
| Leistungsfähigkeit | Die beabsichtigte Ressource wird durch die Laufzeit zugewiesen und aufgelöst | Ein Anzeigename/Kurzname wird nicht in der zugewiesenen Katalogressource aufgelöst. |
| Service/Runtime | Verbundener Server, erforderliche Anmeldeinformationen, verfügbarer Kernel/Abhängigkeiten | Fehlende erforderliche Service-Anmeldeinformationen oder Paket. |
| Vorgang | Aktuelle Eingabeversion und genehmigte Maßnahme | Eine nicht verfügbare Dateiübergabe schlägt vor der Ausführung eines Kindes fehl. |

Die lokale Rolle behielt ihre Skill- und Omics-Archive-Bindungen nach Erstellung und Paketimport bei. Das erste delegierte Kind löste das Skill nicht mit dem von ihm versuchten Kurznamen auf, sondern absolvierte die explizit gelieferten Tabellenprüfungen in Python. Das bestätigt Delegation und Arithmetik, nicht eine erfolgreiche Kind Skill Last. Wenn dies geschieht, bitten Sie den Agenten, seinen verfügbaren Katalog zu inspizieren und die genau zugewiesene Ressourcen-ID zu verwenden; Erweitern Sie nicht den vollständigen Zugriff, nur um ein Namensproblem zu verbergen.

## Capability Access ist kein Berechtigungsmodus {/* #capability-access-is-not-permission-mode */}

Voller Zugriff bedeutet nicht „jede Aktion erlauben, ohne zu fragen. [Genehmigungsart](../guides/approval-modes.md), Dateisystem-/Netzwerkgrenzen und Laufzeitregeln gelten weiterhin. Ein kind kann seine eigene erlaubnisanfrage im elterngespräch auftauchen;. Überprüfen Sie die anfordernde Rolle und den Vorgang, bevor Sie antworten.

Beim Exportieren einer Rolle sind Connector-IDs Referenzen, keine tragbaren Verbindungen oder Geheimnisse. Ausgewählte Skill-Dateien können explizit enthalten sein. Bestätigen Sie auf einem anderen Gerät jede Bindung, konfigurieren Sie die Anmeldeinformationen und führen Sie eine kleine Überprüfung durch, bevor Sie sich auf die Rolle verlassen. Siehe [Verwalten und Teilen](./manage.md).

Bezugsnummer der Durchführung: [SpezialistEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx), [SpezialistenPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
