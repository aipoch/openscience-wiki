---
title: "Steckverbinder und Anmeldeinformationen"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Steckverbinder und Anmeldeinformationen {/* #connectors-and-credentials */}

Ein Connector stellt die Tools eines Dienstes einem Agenten zur Verfügung. Ein Credential liefert Authentifizierung, wenn dieser Dienst dies erfordert. Die Installation eines Skill oder die Zuweisung eines Tags verbindet den Dienst nicht.

Überprüfen Sie im Batch-Management die ausgewählte Anzahl im unteren Aktionsbereich, bevor Sie eine Operation durchführen. Lesen Sie dort das Abschluss- oder Fehler-Feedback und überprüfen Sie dann die resultierenden Elemente. Die Auswahl eines Eintrags allein aktiviert, installiert oder löscht ihn nicht.

## Verwenden Sie ein integriertes Connector {/* #use-a-built-in-connector */}

### Finden Sie Werkzeuge für ein Genexpressionsprojekt {/* #find-tools-for-a-gene-expression-project */}

Öffnen Sie **Settings → Connectors**, suchen Sie **Omics-Archive** und öffnen Sie seine Details. Diese integrierte Familie umfasst GEO, ArrayExpress, MetaboLights, MGnify und PRIDE Tools. Erweitern Sie eine Werkzeugzeile, bevor Sie sie auswählen.

![GEO Metadaten Tool und seine explizite Download-Grenze](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series` gibt Metadaten, Samples, Plattformen und URLs für ergänzende Dateien der GEO-Serie zurück. Laden Sie die erforderliche Datentabelle aus der zurückgegebenen Quelle herunter und fügen Sie sie Ihrem Projekt bei, bevor Sie eine Berechnung anfordern.

Weisen Sie ein Tag wie **Transkriptomik** einem Connector zu und finden Sie es dann unter **Settings → Tags**. Tags organisieren Ressourcen, ohne den Zugriff oder die Tool-Genehmigung zu ändern.

| Zustand | Was sie festlegt | Nächste Prüfung |
| --- | --- | --- |
| Im Verzeichnis aufgeführt | Die App kennt eine Connector Definition | Lesen Sie die tatsächlichen Werkzeugbeschreibungen |
| Used by | Verfügbarkeit des Agenten | Bestätigen Sie den beabsichtigten Agenten und die Bindung der Fähigkeit |
| Ausgewählte Kennung | Eine benannte Bindung existiert | Test-Authentifizierung für den beabsichtigten Dienst |
| Instrumentenpolitik | Ob Anrufe erlaubt, angefordert oder blockiert sind | Inspect erinnerte Erlaubnis Vorrang |
| Erfolgreiches Toolergebnis | Dieser spezielle Anruf wurde abgeschlossen | Validierung der zurückgegebenen Identifikatoren/Daten und Quelle |

### Integrierte Connector-Steuerungen {/* #built-in-connector-controls */}


Verwenden Sie **Search connectors**, um PubMed unter **Directory** zu finden; Die Liste enthält auch **Featured** und **Custom** Gruppen. Die Filterung gilt pro Gruppe, so dass eine andere Gruppe **Keine Connectors passen zu Ihrer Suche** sagen kann, während ein übereinstimmendes Ergebnis unten sichtbar bleibt.

Verwenden Sie **Filter connectors by group**, **Filter Connectors by agent** und **Filter by Tag** zusammen mit der Suche. **Manage credentials** öffnet die gemeinsam genutzten Einstellungen für Kontakt-E-Mail/Credential. **Used by** zeigt Verfügbarkeit; **Manage Tags** organisiert ein Connector. Verwenden Sie die **Manage access**-Steuerung der Ressource, um den Zugriff für Main-Agenten und Spezialisten an einem Ort zu überprüfen und anzupassen.

#### Verwalten Sie den Zugriff für jeden Agenten {/* #resource-access */}

1. Suchen Sie ein Connector unter **Settings → Connectors** und wählen Sie das **Manage access**-Steuerelement aus.
2. Überprüfen Sie **Hauptagent** und die aufgeführten Spezialisten. Durchsuchen Sie die Rollenliste, wenn verfügbar. Ändern Sie nur die beabsichtigte Assoziation; Der Rollen-Editor bleibt eine weitere Möglichkeit, seine Fähigkeitsliste zu verwalten.
3. Öffnen Sie das Popup erneut und überprüfen Sie **Used by**. Eine Bindung kann einem deaktivierten Specialist zugewiesen bleiben; Die Zuweisung ermöglicht diese Rolle nicht.

![Connector-Zugang für Main-Agenten und einzelne Spezialisten](/img/open-science/v0330/resource-access.webp)

Für eine Rolle mit **Full access** erzeugt das Ausschließen dieser Connector eine Ausnahme pro Ressource. Eine Rolle mit ausgewähltem Zugriff verwendet ihre explizite Liste. Marketplace Rollenbindungen können hier nur gelesen werden. Anmeldeinformationen, Serverbereitschaft und Betriebsgenehmigung sind von diesen Assoziationen getrennt; Das Zuweisen eines Connector schließt diese Schritte nicht ab.

#### Mehrere Steckverbinder aktivieren oder deaktivieren {/* #enable-or-disable-several-connectors */}

Öffnen Sie **Settings → Connectors**, filtern Sie die Liste, wählen Sie **Select multiple** in der entsprechenden Gruppe aus und wählen Sie die vorgesehenen Konnektoren aus. Überprüfen Sie die ausgewählte Zählung, bevor Sie sie aktivieren oder deaktivieren, und überprüfen Sie dann jeden zurückgegebenen Zustand. Halten Sie nur die für Ihre Arbeit benötigten Dienste aktiviert. Änderungen der Massenverfügbarkeit enthalten keine Anmeldeinformationen, ändern die Genehmigungsrichtlinien für die einzelnen Werkzeuge oder gewähren einen Specialist-Zugang; Konfigurieren Sie diese separat.

#### PubMed: Verfügbarkeit, Tools und Genehmigungsrichtlinien {/* #pubmed-availability-tools-and-approval-policy */}

1. Durchsuchen Sie **PubMed** und öffnen Sie seine Details.
2. Erweitern Sie **search_articles**, um seine Beschreibung zu lesen. Es gibt eine Anzahl und eine Seite von PMIDs zurück und unterstützt PubMed-Abfrage-Tags, boolesche Operatoren, Daten und Sortierung.
3. Wählen Sie **Require approval**, **Block** oder **Always allow** für den Zugriff, den Sie zulassen möchten. Genehmigungsanzeigen benötigen **Ask when no Session, Project, or Global permission applies.**
4. Aktivieren Sie unter **Manage access** den **Main Agent** für PubMed und prüfen Sie anschließend **Used by**. Prüfen Sie im selben Fenster den Zugriff jedes gewünschten Specialist einzeln.

![PubMed Tool Beschreibung und Genehmigungskontrollen](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

Die Detaillisten `search_articles`, `get_article_metadata`, `find_related_articles`, `lookup_article_by_citation`, `convert_article_ids`, `get_full_text_article` und `get_copyright_status`. Wählen Sie **Always allow**, **Require approval** oder **Block** pro Werkzeug. Überprüfen Sie den separaten Connector-weiten **Skip approvals**-Switch, bevor Sie ihn aktivieren. Das Öffnen einer Beschreibung zeigt nur die Anweisungen des Tools an.

Das Verzeichnis platziert PubMed unter **Directory**, während das Detail ein **Featured**-Badge angezeigt. Verzeichnisplatzierung und Badges geben keinen Status der Kontoverbindung an.

<ToolOperationGroup>
<summary>Führen Sie einen kleinen GEO Metadaten Lookup aus</summary>

### Führen Sie einen kleinen GEO Metadaten Lookup aus {/* #run-a-small-geo-metadata-lookup */}

<p className="example-label"><strong>Praxisbeispiel</strong> GSE60450 Sample Metadaten in GEO nachschlagen</p>

1. Kehren Sie zur Forschungssitzung zurück und bestätigen Sie die Verfügbarkeit eines Arbeitsmodells und der Omics Archives.
2. Fragen Sie: `Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. Überprüfen Sie die angeforderte Connector/Methode und Argumente, bevor Sie sie zulassen. Das Tool erwartet ein `accessions`-Array; ein vermutetes Singularfeld ist falsch.
4. Überprüfen Sie das tatsächliche Ergebnis. Überprüfen Sie für diesen Beitritt die zurückgegebenen **GSE60450**, **Musculus musculus**, **12 Proben** und den Titel "Transkriptomanalyse von luminalen und basalen Zellsubpopulationen in der Laktation im Vergleich zur schwangeren Brustdrüse".
5. Bewahren Sie die zurückgegebenen GSM-Identifikatoren mit ihren Eigenschaften auf. Schließen Sie eine Zuordnung zu den MCL1-Spaltennamen der Matrix nicht allein aus der Ähnlichkeit.

![Tatsächliche GEO-Probemerkmale, die über den Connector zurückgegeben wurden](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

Der zurückgegebene Probenbereich war **GSM1480291–GSM1480302**, der luminale/basale Populationen und jungfräuliche, 18.5-Tage-Schwangerschaft und 2-Tage-Laktationsstadien abdeckte. Dies sind zurückgegebene Metadaten, nicht Etiketten, die aus den Zählsummen abgeleitet werden. Die vollständige zwölfreihige Antworttabelle wurde als <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>geo-sample-metadata.csv</a> heruntergeladen. Dies ist ein Gesprächstabellenexport, getrennt von den verwalteten QC-Artefakten.

Wenn die Connector-Anweisungsdatei nicht gelesen werden kann, behalten Sie den EPERM-Fehler bei und überprüfen Sie die aktivierte Connector und die aktuelle Sitzung. Bestätigen Sie Operationsfelder in [Connector-Parameter](../reference/connector-operations.md), bevor Sie erneut versuchen. Eine gültige Metadatenabfrage gibt strukturierte Datensätze zurück; es lädt die zugrunde liegende Quelltabelle nicht herunter oder führt keine Analyse durch.


</ToolOperationGroup>

## Connector hinzufügen: Shared Identity Fields {/* #add-connector-shared-identity-fields */}

**Add connector** bietet **Local command**, **Remote server** und **Import configuration**. Die ersten beiden öffnen einen Editor mit einem Typ-Selektor, und **Advanced settings** stellt zusätzliche Felder frei. Die Screenshots verwenden einen illustrativen Endpunkt; Verbinden Sie einen Server, den Sie tatsächlich verwenden möchten.

| Feld | Zweck |
| --- | --- |
| Konnektortyp | Wechsel zwischen einem lokalen Prozess und einem entfernten Endpunkt. |
| Anzeigename | Name im UI angegeben. |
| Erweiterter Connector Name | Angerufener Name verwendet von `host.mcp`Specialist-Bindungen und das erzeugte MCP Skill; nach Möglichkeit aus dem Anzeigenamen generiert. |
| Konnektor-ID | Optionale stabile ID, soweit möglich generiert. Vor der Schöpfung ist sie zu erkennen, danach ist sie unveränderlich. |
| Beschreibung | Fakultative Erläuterung der übermittelten Daten/Maßnahmen. |
| Ich vertraue diesem Konnektor | Erforderliche Vertrauensbestätigung vor dem Hinzufügen eines benutzerdefinierten Connector. Es validiert den Dienst nicht oder macht seinen Code sicher. |
| Cancel / Zurück zu Connectors | Hinterlasse das Formular. Sie rettet den Entwurf nicht. |
| Connector hinzufügen / Hinzufügen und Anmelden | Speichern Sie die gültige Konfiguration und starten Sie für OAuth die Anmeldung. Der Button bleibt deaktiviert, während erforderliche Felder, Bindungen oder Vertrauen fehlen. |

### Lokaler Befehl {/* #local-command */}

**Command** bietet `npx — Node package`, `uvx — Python (uv)`, `node — script file`, `python3 — script file`, `docker — container` und **Other…**. Andere stellt **Custom command** für einen absolut ausführbaren Pfad aus.

| Fortgeschrittener Input | Vorgang |
| --- | --- |
| Argumente | Ein Argument pro Zeile; Leerzeichen und Leerzeichen bleiben erhalten. Löschen Sie das Feld, um alle Argumente zu entfernen. Gehen Sie nicht davon aus, dass ein raumgetrennter Shell-Befehl in mehrere Argumente unterteilt ist. |
| Variablenname | Benennen Sie eine Umgebungsvariable und wählen / erstellen Sie dann deren Credential. |
| Variable hinzufügen / Variable entfernen | Hinzufügen oder Entfernen einer benannten Bindung. |
| Felder/Text | Geben Sie Namen als strukturierte Zeilen oder eine ein `KEY=` pro Linie; Geheimwerte leben in Credentials. |
| Befehlsvorschau | Inspizieren Sie den Launcher, der nach den Bindungen gezeigt wird. |

![Lokaler Befehlseditor und Credential-gebundene Umgebungsvariablen](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

Ein Launcher-Eintrag allein beweist nicht, dass seine ausführbare Datei oder sein Dienst betriebsbereit ist. Verwenden Sie den Aufruf unten, um den importierten lokalen Befehl zu überprüfen.

### Remote-Server {/* #remote-server */}

Geben Sie das echte **Server URL** ein, das vom Serverbetreiber bereitgestellt wird. `https://example.org/mcp` in diesen Screenshots ist eine illustrative Reserved-Domain-Adresse, kein funktionierender MCP-Endpunkt.

**Advanced → Transport** ist standardmäßig **Streamable HTTP**. **Authentication** bietet **None**, **OAuth (browser sign-in)** und **Static headers**.

#### Statische Header {/* #static-headers */}

Der aktuelle Editor bindet benannte Anmeldeinformationen; Es handelt sich nicht um einen einfachen Textbereich mit geheimem Wert.

1. Wählen Sie **Static headers**.
2. Geben Sie ein **Header name** ein, z. B. `Authorization`.
3. Wählen oder erstellen Sie das entsprechende **Credential**. Der Selektor wird deaktiviert, bis der Header einen Namen hat.
4. Verwenden Sie **Add header** für eine andere Zeile oder **Remove header**, um eine Zeile zu verwerfen.
5. **Felder/Text** ändert, wie Namen eingegeben werden. Textmodus erwartet einen Headernamen pro Zeile als `Name:`; Anmeldewerte werden separat verwaltet.

![Statischer Headername und Anmelder](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### OAuth bindend {/* #oauth-binding */}

Wählen Sie ein **OAuth credential**, das der Ressourcen-URL, dem Transport und der Registrierung entspricht. **New credential** öffnet den [Credential Editor](../tools/credentials.md#new-credential). In diesem leeren Profil meldete das Formular **No OAuth credential matches this Connector's resource URL, transport, and registration.** Die letzte Aktion ändert sich in **Add and sign in**.

![OAuth Credential Matching](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## Import-, Export- und Anschlusstests {/* #import-export-and-connection-tests */}

Wählen Sie **Add connector → Import configuration** und wählen Sie eine JSON-Datei bis 256 KB aus. Der Importeur akzeptiert eine Open-Science Connector-Konfiguration oder eine MCP-Clientdatei, die `mcpServers` enthält.

1. Wählen Sie für eine Multi-Server-Datei einen Eintrag in **MCP server** aus. Sie überprüfen und fügen jeweils einen Server hinzu. Überprüfen Sie den Namen, die ID, den Transport und die Befehlsargumente nach dem Wechsel der Einträge.
2. Lesen Sie die Diagnose. Absolute Pfade müssen möglicherweise auf einem anderen Computer geändert werden; Anmeldewerte sind vom Import ausgeschlossen.
3. Wählen Sie **Use configuration**, um den vorgefüllten Editor zu öffnen. Überprüfen Sie jedes Feld, binden Sie die erforderlichen lokalen Anmeldeinformationen und wählen Sie **I trust this connector** aus.
4. Wählen Sie **Add connector**, prüfen Sie den Verbindungszustand in der Liste und rufen Sie dann ein kleines Nur-Lese-Tool auf.

![Auswahl eines Servers und Überprüfung der erforderlichen Anmeldeinformationen](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

Wenn ein importierter Server auf eine Umgebungsvariable wie `QC_EXAMPLE_TOKEN` verweist, binden Sie diesen Namen an ein auf diesem Gerät gespeichertes Berechtigungsnachweis. **Add** bleibt solange nicht verfügbar, bis die erforderlichen Bindungen abgeschlossen sind. Überprüfen Sie nach dem Hinzufügen **Connected** und führen Sie das beabsichtigte Werkzeug aus; Eine gespeicherte Bindung allein validiert keine Fernauthentifizierung.

Rufen Sie `get_dataset_summary` an und übergeben Sie dann eine zurückgegebene vollständige Beispiel-ID an `get_sample_qc`. Vergleichen Sie die Antwort mit dem [QC Baseline](../reference/example-data.md). Dieser Server gibt gespeicherte Zusammenfassungswerte zurück; Sie berechnet die ursprüngliche Matrix nicht neu. Die Server-Implementierung ist in [Erstellen eines benutzerdefinierten Tools](../tools/custom.md) abgedeckt.

### Export und Reimport {/* #export-and-reimport */}

Wählen Sie **Actions → Export** der Zeile, wählen Sie **Open Science Connector** oder **MCP client config**, prüfen Sie die Vorschau und wählen Sie **Save configuration**.

![Ausfuhr mit Anmeldekennzeichen und Meldung lokaler Trassen](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

Die tatsächlich exportierte Datei behielt den Variablennamen in `required_secrets.environment` bei. Es enthielt keinen Nachweisnachweis, kein lokales Vertrauen oder Berechtigungen. Reimport erfordert wieder lokale Auswahl und Vertrauen.

Wenn die gleiche ID bereits vorhanden ist, meldet die Vorschau **Ein benutzerdefiniertes Connector mit ID ... ist bereits installiert** und **Use configuration** ist nicht verfügbar. Verwenden Sie **Edit**, um eine bestehende Verbindung zu ändern; Import ist keine Überschreiboperation.

![Eine vorhandene ID blockiert Duplicate Import](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

Überprüfen Sie beim Wiederherstellen einer exportierten Verbindung die vorab ausgefüllten Felder und binden Sie die erforderlichen benannten Anmeldeinformationen erneut. Komplettes Vertrauen und testen Sie einen begrenzten Anruf, bevor Sie ihn in der Forschung verwenden. Import überschreibt kein bestehendes Connector mit der gleichen ID.

## Berechtigungen: Dienste und wiederverwendbare Geheimnisse {/* #credentials-services-and-reusable-secrets */}

Erstellen und Verwalten von Geheimnissen in [Dienstanmeldeinformationen](../tools/credentials.md) und wählen Sie dann deren Namen in Umgebung, Header oder OAuth-Bindungen aus. Stellen Sie auf einem neuen Gerät diese Bindungen wieder her und vervollständigen Sie die Anmeldung dieses Dienstes, bevor Sie die Verbindung testen. Exporte enthalten Konfigurationsreferenzen, keine verwendbaren Geheimnisse oder lokales Vertrauen.

## HTTP Fehlersuche {/* #http-error-lookup */}

Verwenden Sie für 400, 401, 403, 404, 429 oder 5xx Antworten den [HTTP Fehlerbehebungstabelle](troubleshooting.md#http-errors-400-403-429-and-5xx). Behalten Sie den antwortenden Dienst und seine detaillierte Nachricht mit dem Statuscode.
