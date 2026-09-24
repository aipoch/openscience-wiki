---
title: "Installations- und Vermittlungsstellen"
last_update:
  date: '2026-09-24'
---

# Installations- und Vermittlungsstellen {/* #installing-and-switching-agents */}

Wählen Sie ein Agent-Framework für Gespräche und Werkzeuge und richten Sie anschließend einen kompatiblen [Modellanbieter](providers.md) ein. Mehrere Frameworks können installiert bleiben. Das aktive Framework unter **Settings → Agent** ist eine anwendungsweite Einstellung für alle Projekte und gilt für nachfolgende Gesprächsrunden und Workflows.

## Lesen Sie die Agentenseite {/* #read-the-agent-page */}

Öffnen Sie **Settings → Agent**. Die Seite trennt **Installed** von **Available**. Lesen Sie die Version, den Pfad und den **Active**-Marker auf der installierten Karte, bevor Sie etwas ändern.

![App-verwalteter Codex](/img/open-science/local-acceptance/agent-codex-active.webp)

| Kontrolle/Status | Sinn und Handlung |
| --- | --- |
| Eingebaute Karte | Wählen Sie eine berechtigte inaktive Karte aus, um einen Wechsel anzufordern. Eine aufgelistete Installation benötigt weiterhin einen kompatiblen Modellzugriff. |
| Aktiv | Das anwendungsweit ausgewählte Backend. Die Deinstallierungsaktion ist deaktiviert. |
| Erneut erkennen | Erfrischen Sie die Entdeckung nach einer Installation oder einem Pfadwechsel. Es zeigt vorübergehend Detecting; Es installiert keine fehlende Software. |
| Nicht installiert | Für dieses Framework wurde keine nutzbare Laufzeit erkannt. |
| Installationsmenü | Wählen Sie eine Quelle aus, die für dieses Framework angeboten wird, und überprüfen Sie dann den Installationsfortschritt. |
| Log installieren / Retry | Lesen Sie den fehlgeschlagenen Schritt und versuchen Sie es erneut, nachdem Sie diese Ursache behoben haben. |
| Reparieren | Erscheint, wenn die verwaltete Installation repariert werden muss; Überprüfen Sie die betroffene Laufzeit, bevor Sie bestätigen. |

Die inspizierte Seite bot Codex, Claude Agent, OpenCode und CodeBuddy an. Verfügbare Quellen und Authentifizierungsanforderungen unterscheiden sich; Gehen Sie nicht davon aus, dass jedes Framework das gleiche Installationsprogramm oder die gleiche Anmeldemethode bietet.

## Installieren und Überprüfen {/* #install-and-verify */}

1. Wählen Sie **Installieren Sie &#91;framework&#93;** und überprüfen Sie die angebotene Quelle. Eine verwaltete Installation bleibt unter app-kontrolliertem Speicher; eine manuelle Installation muss von der App auffindbar sein.
2. Folgen Sie dem Fortschritt und lesen Sie das Installationsprotokoll, wenn ein Schritt fehlschlägt. Lösen Sie die Umgebungs- / Netzwerkvoraussetzungen, bevor Sie erneut versuchen.
3. Verwenden Sie **Re-detect** nach einer manuellen Installation. Bestätigen Sie die erwartete Version und den Pfad, anstatt sich auf das Vorhandensein eines Befehls in einem anderen Terminal zu verlassen.
4. Wählen Sie die Ready Card aus. Überprüfen Sie den Switch-Dialog und bestätigen Sie dann das beabsichtigte Backend.
5. Überprüfen Sie **Settings → Model**, führen Sie eine kleine Anforderung aus und prüfen Sie ein tatsächliches Antwort- / Werkzeugergebnis.

Für OpenCode lädt **Install → App-managed download (recommended)** eine in sich geschlossene Laufzeit herunter. Die Seite zeigte Auflösen, Herunterladen des Fortschritts und dann eine installierte Karte mit ihrer Version und ihrem Pfad. Wählen Sie diese Karte aus, bestätigen Sie **Wechseln Sie zu OpenCode?** und wählen Sie ein kompatibles Modell. Das Beispiel für die lokale Verbindung hat eine abgeschlossene Antwort zurückgegeben; siehe [Lokale Provider-Einrichtung](./providers.md#connect-a-local-model-endpoint) für seine API und Token-Grenzen.

Für Codex müssen die native Laufzeit und der ACP-Adapter die Erkennung als kompatibles Paar bestehen. Die Installation nur einer Komponente entspricht nicht einem bereiten Backend. Der Anbieter-Abonnement-Login ist in [Provider-Einrichtung](./providers.md) abgedeckt.

In v0.33.0 benötigt **Claude Agent** Claude CLI **2.1.118 oder höher**. Wenn die Erkennung eine nicht unterstützte Version meldet, aktualisieren Sie die erkannte Installation mit der Installationsmethode, verwenden Sie dann **Re-detect** und überprüfen Sie die Bereitschaft, bevor Sie eine Sitzung starten. Durch die Aktualisierung eines anderen CLI auf Ihrem Weg wird die auf der Karte gezeigte Installation nicht repariert.

## Aktualisieren einer App-verwalteten Codex-Laufzeit {/* #update-codex */}

Öffnen Sie **Settings → Agent** und lesen Sie die **Codex CLI**- und **AKP**-Versionen der Codex-Karte separat. Wenn ein Update für das getestete Paar angeboten wird, beenden oder schließen Sie die Sitzungen mit dieser Laufzeit, wählen Sie die Aktualisierungsaktion und warten Sie auf den Abschluss der Erkennung. Bestätigen Sie die neuen Versionen und die Bereitschaft und senden Sie dann eine kleine Anfrage in einer Sitzung.

Ein App-verwaltetes Update ersetzt die App-eigene Laufzeit; ein externes CLI muss durch die ursprüngliche Installationsmethode aktualisiert werden, gefolgt von **Re-detect**. Die App verweigert den Ersatz, während ein von der App gestarteter Codex-Prozess das Ziel verwendet. Dieser Vorgang aktualisiert Open-Science nicht selbst oder migriert eine Aufgabe während des Fluges.

## Switch ohne Verwechslung von Retained History mit Live State {/* #switch-without-confusing-retained-history-with-live-state */}

Beenden oder stoppen Sie den aktuellen Vorgang vor dem Wechsel. Die Änderung gilt projektübergreifend für nachfolgende Gesprächsrunden und Workflows. Laufende Aufgaben behalten ihre bisherige Laufzeit bis zum Abschluss; inaktive Gespräche verbinden sich bei der nächsten Nutzung erneut. Der erhaltene Gesprächsverlauf überträgt keinen laufenden Werkzeugprozess und garantiert nicht den Erhalt von Interpretervariablen. Prüfen Sie Dateien, Notebook und Berechtigungen, bevor Sie weiterrechnen.

Überprüfen Sie nach dem Wechsel das für die Konversation ausgewählte Modell. Codex Abonnements unterstützen [Side Chat](./delegation.md); Ausstehende Sitzungsvorgänge oder Wiederherstellung können das Öffnen vorübergehend verhindern. Folgen Sie der Nachricht, die durch den Eintrag angezeigt wird.

## Reparatur und Beseitigung {/* #repair-and-removal */}

Verwenden Sie den Reparaturfluss der App für eine defekte verwaltete Laufzeit; Löschen Sie seine Verzeichnisse nicht während eines laufenden Installers. Wenn eine externe Installation angezeigt wird, reparieren Sie diese Installation und erkennen Sie sie erneut. Um ein verwaltetes Backend zu entfernen, aktivieren Sie zuerst ein anderes bereites Backend, öffnen Sie **Uninstall** und lesen Sie die Komponentenliste der Bestätigung. Das Entfernen ist kein Bereinigungsschritt, der nur zum Wechseln von Modellen erforderlich ist.


### Deinstallieren und Neuinstallieren einer App-verwalteten Laufzeit {/* #uninstall-and-reinstall-an-app-managed-runtime */}

1. Halten Sie ein anderes Backend **Active**. In diesem Beispiel blieb Codex aktiv, während OpenCode entfernt wurde.
2. Wählen Sie auf der inaktiven OpenCode-Karte **Uninstall**. Die Bestätigung gilt für die von dieser App heruntergeladene und verwaltete Kopie; eine separat installierte Kopie ist nicht betroffen.
3. Bestätigen Sie **Uninstall** und wählen Sie dann **Re-detect**. OpenCode sollte mit **Not installed** zu **Available** wechseln.
4. Wählen Sie **Install OpenCode → App-managed download (recommended)**. Warten Sie auf die **Installed**-Karte, wählen Sie sie aus und bestätigen Sie **Switch**.
5. Überprüfen Sie **Active**, den Laufzeitpfad und die kompatible Modellauswahl. Durch die Neuinstallation des Backends wird kein Modellanbieter dafür konfiguriert.

![Umfang der App-verwalteten OpenCode-Deinstallation](/img/open-science/priority-completion/01-opencode-uninstall.webp)

Wechseln Sie vor dem Entfernen eines Backends zu einem anderen verfügbaren Backend; das aktive Backend kann durch diese Steuerung nicht entfernt werden. Nach der Neuinstallation, Neuerkennung und Aktivierung öffnen Sie dann ein bestehendes Projekt und führen Sie eine kleine Anforderung aus, um die Verbindung zu überprüfen.

![OpenCode erneut installiert und ausgewählt](/img/open-science/priority-completion/03-opencode-reinstalled.webp)

Wenn Installationsaktionen deaktiviert sind, überprüfen Sie auf eine andere Installation/einen anderen laufenden Switch und den angegebenen Anforderungsfehler. Wenn die Erkennung erfolgreich ist, aber die Anforderungen fehlschlagen, prüfen Sie die Modellauthentifizierung und die Framework/API-Kompatibilität separat.

Quellen: [Bevollmächtigter](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentPanel.tsx), [Rahmenkarte](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentFrameworkCard.tsx).

Umfang und Schaltverhalten: [Einstellungen Speicher](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/settings/repository.ts), [Laufzeitumschaltung](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/acp/runtime-coordinator.ts).
