---
title: "Planen einer Forschungsaufgabe"
last_update:
  date: '2026-11-19'
---

# Planen einer Forschungsaufgabe {/* #schedule-a-research-task */}

Verwenden Sie einen Zeitplan für Arbeiten, die zu einem bekannten Zeitpunkt ausgeführt werden sollten: Überprüfen Sie kürzlich hinzugefügte Arbeiten, fassen Sie Projektänderungen zusammen oder führen Sie ein vorbereitetes Skript erneut aus. Jeder Lauf hat eine Aufzeichnung, die Sie öffnen und inspizieren können. Lassen Sie Open-Science auf dem Computer laufen, dem der Zeitplan gehört.

## Bereiten Sie eine Aufgabe vor, die unbeaufsichtigt laufen kann {/* #prepare */}

Führen Sie die beabsichtigte Aktion zunächst einmal im Projekt aus. Überprüfen Sie die Eingaben, die Modellverbindung, die Laufzeit, den Ausgabeort und die erforderlichen Berechtigungen. Ein Zeitplan repariert keine fehlenden Anmeldeinformationen oder installiert jede Abhängigkeit für Sie. Runs warten nicht auf eine neue menschliche Bestätigung; ungelöste Interaktionen können die Arbeit stoppen. Wählen Sie für eine neue Konversation ein verwendbares **Main**-Modell in **Settings → Model** aus oder legen Sie die Standardwerte für neue Gespräche des Projekts fest. Das Importieren eines Abonnements allein wählt kein Modell aus. Modellbasierte Aufgaben verbrauchen die Quote des ausgewählten Anbieters.

## Erstellen Sie den Zeitplan {/* #create */}

1. Öffnen Sie das Projekt, gehen Sie zu **Schedule** und wählen Sie **New task**. **Start from an example** kann einen Entwurf für eine tägliche Experimentzusammenfassung oder eine wöchentliche Literaturrecherche ausfüllen.
2. Geben Sie eine erkennbare **Name** ein. Wählen Sie **Action → Send a message** oder **Run a script**.
3. Für eine Nachricht schreiben Sie die Aufgabe unter **Instructions**. Wählen Sie unter **How to run** **Continue an existing conversation** oder **New conversation for each run**. Wählen Sie **Target conversation**, wenn Sie eines fortsetzen.
4. Wählen Sie für ein Skript eine bestehende Konversation und deren **Language** aus: Python, R oder Shell. Geben Sie das komplette **Script** ein. Vermeiden Sie es, sich auf temporäre Variablen aus einem früheren Kernel zu verlassen; laden Sie die erforderlichen Eingaben explizit.
5. **Repeat** auf **Once**, **Fixed interval**, **Daily** oder **Weekly** setzen. Überprüfen Sie die Startzeit, das Intervall oder gegebenenfalls die Wochentage und bestätigen Sie dann **Time zone** und **Next run**.
6. Review **Execution permissions**. Verwenden Sie nur den Zugriff, den die Aufgabe benötigt. Eine vorhandene konversation kann ihren konversationsberechtigungen folgen; die berechtigungseinstellung eines zeitplans liefert keine anmeldeinformationen oder umgeht strenge netzwerkregeln.
7. Unter **Advanced** optional eine Endzeit oder maximale Laufzahl festlegen. Überprüfen Sie bei Skripten das Ausführungs-Timeout. Wählen Sie **Create** und überprüfen Sie die gespeicherte Aufgabe und den nächsten Durchlauf.

<p className="example-label"><strong>Beispiel</strong> Bereiten Sie eine wöchentliche Literatur Digest</p>

Verwenden Sie **Send a message**, wählen Sie Freitag und Ihre eigene Ortszeit und passen Sie diese Anleitung an ein Projekt an, das Papiere und Notizen enthält:

```text
Review papers and reading notes added to this project in the last seven days.
For each paper, summarize its main finding and link to its source or project file.
Distinguish abstract-only records from papers whose full text is available.
If nothing was added, say so. Keep the digest in English.
```

Diese Aufgabe überprüft das vorhandene Material des Projekts. Um nach neu veröffentlichten Artikeln zu suchen, fordern Sie explizit eine Suche an und konfigurieren Sie zuerst das erforderliche [Literaturverbinder](../tools/databases.md).

## Führen Sie eine einmalige Lehrzusammenfassung aus {/* #worked-example */}

<p className="example-label"><strong>Praxisbeispiel</strong> Planen Sie eine fünfstellige Zusammenfassung</p>

Verwenden Sie **Send a message**, benennen Sie die Aufgabe **Teaching summary — one run** und geben Sie Folgendes ein:

```text
In English, state the mean and median of the hypothetical observations 2, 4, 6, 8, 10.
Explain in two sentences why these values alone do not support population inference.
Do not use tools or create files.
```

Wählen Sie **New conversation for each run**, **Repeat → Once** und eine zukünftige Zeit. Verwenden Sie **Existing permissions only**: Diese Aufgabe benötigt keine Werkzeuge. Wählen Sie **Create** und halten Sie die App am Laufen.

![Eine einmalige Nachrichtenaufgabe mit ihren Anweisungen, New-Conversation-Ziel und Next Run](/img/open-science/v130/schedule-create.webp)

Öffnen Sie zur geplanten Zeit die Aufgabe und prüfen Sie **Results**. In diesem Beispiel betrugen Mittelwert und Median jeweils **6**. Die Antwort erläuterte, warum fünf hypothetische Werte keine Schlussfolgerung über eine Grundgesamtheit erlauben. **Open session** öffnet die Unterhaltung; die einmalige Aufgabe wechselt zu **Completed**. Prüfen Sie das Ergebnis, bevor Sie es weiterverwenden.

![Abgeschlossene geplante Nachricht und ihr Unterrichtsergebnis](/img/open-science/v130/schedule-result.webp)

## Überprüfen Sie einen Lauf und ändern Sie den Zeitplan {/* #run-history */}

Öffnen Sie den Ablaufverlauf der Aufgabe und wählen Sie ein Ereignis aus. Überprüfen Sie den Status, das Zielgespräch und das Ergebnis. **Run completed** zeichnet den Abschluss dieses Laufs auf; prüfen Sie die tatsächliche Antwort- oder Skriptausgabe, bevor Sie sie als Forschungsnachweis verwenden. **Failed**, **Interrupted** und **Skipped** erfordern das Lesen des zugehörigen Grundes, nicht vorausgesetzt, dass ein Ergebnis erzielt wurde.

Mit **Pause** setzen Sie künftige Ausführungen vorübergehend aus; mit **Resume** setzen Sie sie fort. Prüfen Sie nach einer Zeitänderung den nächsten Ausführungstermin. **Close** beendet die Aufgabe. Ist eine abgeschlossene oder geschlossene Aufgabe schreibgeschützt, erstellen Sie eine neue. Prüfen Sie den Verlauf, bevor Sie eine Arbeit manuell wiederholen, insbesondere nach einer erneuten Verbindung oder einem Neustart der App.

Ausführungsaufzeichnungen und Laufzeitwiederherstellung finden Sie unter [Notizbuch](notebook.md). Für Zugriffsgrenzen siehe [Genehmigungsarten](approval-modes.md) und [Netzregeln](network.md).
