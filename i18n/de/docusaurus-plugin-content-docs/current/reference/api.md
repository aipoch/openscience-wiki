---
title: "Task SDK und lokales API"
last_update:
  date: '2026-09-22'
---

# Task SDK und lokales API {/* #task-sdk-and-local-api */}

Der `@aipoch/open-science` Node.js-Client verbindet sich mit einem authentifizierten lokalen Anwendungsdienst, um Aufgaben, Sitzungen, Konnektoren und freigegebene Anmeldeinformationen zu verwalten. Öffentliche SDK-Methoden sind getrennt von Electron Preload-Aufrufen und den internen `host`-APIs des Agenten.

<span id="connect-and-select-real-ids" />

## Verbinden, Ausführen einer Aufgabe und Herunterladen der Ausgabe {/* #connect-run-a-task-and-download-its-output */}

<p className="example-label"><strong>Beispiel</strong> Speichern und Herunterladen einer Verbindungs-Check-Notiz</p>

Verwenden Sie Node.js 22.5 oder höher. Öffnen Sie die installierte Desktop-Anwendung auf demselben Computer, beenden Sie die Modelleinrichtung und halten Sie sie am Laufen. Der SDK verwendet die lokale Service-Discovery und sein lokal gespeichertes Token. Für einen separaten Daemon folgen Sie zuerst [Kopfloser Dienst](server.md).

Installieren Sie in einem leeren Arbeitsordner den Client:

```bash
npm init -y
npm install @aipoch/open-science
```

Speichern Sie Folgendes als `connection-check.mjs`. Führen Sie `node connection-check.mjs` aus, um Projekt-IDs aufzulisten, dann `node connection-check.mjs PROJECT_ID` mit einer zurückgegebenen ID. Die erste Invokation wird nach der Auflistung von Projekten absichtlich gestoppt; Die zweite schafft eine kleine Aufgabe.

```js
import {connectToOpenScience} from '@aipoch/open-science';
import {writeFile} from 'node:fs/promises';

const client = await connectToOpenScience();
const projects = await client.listProjects();
const projectId = process.argv[2];
if (!projects.some((project) => project.id === projectId)) {
  console.table(projects.map(({id, name}) => ({id, name})));
  console.log('Run again with a project ID from this list. Create a project in the app if the list is empty.');
  process.exit(projectId ? 1 : 0);
}
const run = await client.startRun({
  project: projectId,
  prompt: 'Save a short Markdown file named project-note.md explaining that this is a connection check. Do not read project inputs or use the network.',
  permissionProfile: 'ask',
});
console.log('Run:', run.id, 'Session:', run.sessionId);
const result = await client.waitForRun(run.id, {timeoutMs: 120000});
console.log(result.status, result.output ?? result.error ?? '');
if (result.status !== 'completed') {
  throw new Error('Inspect the run in the application before continuing.');
}
const artifacts = await client.listArtifacts(run.sessionId);
console.table(artifacts.map(({id, name, path}) => ({id, name, path})));
const artifact = artifacts.find((item) =>
  item.name === 'project-note.md' || item.path.endsWith('/project-note.md'));
if (!artifact) throw new Error('No matching saved artifact; inspect the response.');
const response = await client.downloadArtifact(artifact.id);
await writeFile('project-note.download.md', new Uint8Array(await response.arrayBuffer()));
console.log('Saved project-note.download.md; open and check its contents.');
```

Halten Sie die Desktop-Sitzung offen. Reagieren Sie dort, wenn **Ask for approval** die Aufgabe pausiert. Ein Warte-Timeout stoppt die Kundenabfrage; Es storniert den Lauf nicht. Überprüfen Sie die gedruckte Lauf-ID mit `getRun`, warten Sie weiter, nachdem Sie die Anforderung gelöst haben, oder rufen Sie `cancelRun` an, wenn Sie beabsichtigen, sie zu stoppen. Der Download ist nur dann erfolgreich, wenn ein übereinstimmendes gespeichertes Artefakt vorhanden ist; Öffnen Sie den heruntergeladenen Markdown, um den Check abzuschließen.

Dieses Programm zeigt den öffentlichen API-Vertrag. Es wird nicht davon ausgegangen, dass ein Modell immer die angeforderte Datei speichert. Wenn das npm-Paket nicht installiert werden kann, verwenden Sie den SDK-Ordner, der mit der passenden Quellauscheckung ausgeliefert wird, als lokales Paket; die Paket-Metadaten vor der Installation zu bestätigen.

### Eine abgeschlossene Aufgabe, deren Datei nicht heruntergeladen wird {/* #a-completed-task-whose-file-will-not-download */}

Eine Ursache für diesen Fehler - verlorene Artefaktversionsidentität in abgeschlossenen Task-Datensätzen - wurde im [Download Update](../changelog/v0.29.0.md) behoben. Aktualisieren Sie in einer älteren App, bevor Sie dieselbe gespeicherte Datei erneut versuchen. Andere HTTP 500 Ursachen erfordern noch Diagnose.

Aufgabenabschluss und Artefakt-Download sind separate Prüfungen. Wenn `downloadArtifact` HTTP **500** / `internal_error` zurückgibt, rufen Sie `getRun` und `listArtifacts` auf, um den Vorgangszustand zu bestätigen und die genaue zurückgegebene Artefakt-ID beizubehalten. Starten Sie nicht die gleiche Forschungsaufgabe erneut, nur um einen Download zu wiederholen.

Öffnen Sie das Artefakt in der Anwendung und prüfen Sie, ob sein Inhalt verfügbar ist. Eine Arbeitsvorschau stellt nicht fest, dass der SDK-Download erfolgreich war. Fügen Sie die Run-ID, Artefakt-ID und Download-Fehler in ein [Diagnosebericht](../guides/troubleshooting.md) ein; Authentifizierungstoken weglassen. Derselbe Fehler kann den `artifacts download`-Befehl des CLI beeinflussen.

## Prüfung der Bereitschaft und Vorbereitung von Codex {/* #runtime-api */}

| SDK-Methode | HTTP Ressource | Zweck |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | Überprüfen Sie die Bereitschaft und die nächsten Aktionen. |
| `listRuntimes()` | `GET /api/v1/runtimes` | Listen-Framework, Status, optionale Version und verwaltete / externe Quelle. |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | Prüfen Sie den First-Run-Setup-Zustand. |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | Bereiten oder reparieren Sie die verwaltete Codex-Laufzeit über den unterstützten Bootstrap-Flow vor. |
| `installCli()` | `POST /api/v1/cli/install` | Installieren Sie den lokalen PATH Launcher. |

Setup-Mutationen erfordern den authentifizierten lokalen Dienst. Überprüfen Sie den zurückgegebenen `ok` und Fehlercode; Konfigurationskonflikte müssen vor dem erneuten Versuch gelöst werden. Ein Client-Timeout stellt nicht fest, dass eine akzeptierte Installation abgebrochen wurde. Überprüfen Sie die Bereitschaft erneut, bevor Sie eine weitere Installation starten. Für Abonnement-Login oder benannte Umgebungsvariable Credential-Eingabe verwenden Sie die [Terminalaufbaustrom](cli.md#terminal-setup).

## Methoden und HTTP Ressourcen {/* #methods-and-http-resources */}

| SDK-Methode | HTTP Ressource | Zweck |
| --- | --- | --- |
| `listProjects`, `createProject` | GET/POST `/api/v1/projects` | Lesen / Erstellen von Projekten |
| `updateProject` | PATCH `/api/v1/projects/:id` | Aktualisieren Sie die Metadaten des Projekts/Kontext |
| `getProjectSessionDefaults`, `updateProjectSessionDefaults` | GET/PARK `/api/v1/projects/:id/session-defaults` | Standardwerte für neu erstellte Sitzungen |
| `listSessions` | ZUG `/api/v1/sessions?project=ID` | Sitzungszusammenfassungen lesen |
| `getSession` | ZUG `/api/v1/sessions/:id` | Lesen Sie eine Sitzung |
| `getSessionConfiguration`, `updateSessionConfiguration` | GET/PARK `/api/v1/sessions/:id/config` | Sitzungskonfiguration lesen/aktualisieren |
| `getAgentRouting`, `updateAgentRouting` | GET/PARK `/api/v1/settings/agent-routing` | Globales Framework/Reviewer/Subagent Routing |
| `getSessionPlan` | ZUG `/api/v1/sessions/:id/plan` | Lesen Sie den aktiven Planstaat |
| `respondSessionPlan` | POST `/api/v1/sessions/:id/plan/respond` | Reagieren Sie mit der genauen Entscheidung/Version/Revision |
| `startRun` | POST `/api/v1/runs` | Zugeben eines Laufs |
| `getRun`, `cancelRun` | ZUG `/api/v1/runs/:id`, POST `/api/v1/runs/:id/cancel` | Prüfung/Abbruch der Ausführung |
| `listArtifacts` | ZUG `/api/v1/sessions/:id/artifacts` | Read Managed Output Deskriptoren |
| `downloadArtifact` | Artefakt Download-Antwort | Streamen eines gespeicherten Outputs; den zurückgegebenen Response-Body |
| `waitForRun` | SDK Polling Over Run Status | Warten Sie mit Stornierungs- / Deadline-Optionen |
| `events` | SDK Ereignis-Iterator | Beobachten Sie die geordnete Aktivität und Reconnect/Resync-Signale |

[Methodendefinitionen und genaue Routen](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs) ist die autoritative Suche nach Anforderungssignaturen. Die Tabelle ist nicht berechtigt, beliebige Elektronen/interne Endpunkte aufzurufen.

### Connector Managementmethoden {/* #connector-management-methods */}

| SDK-Methode | HTTP Ressource |
| --- | --- |
| listConnectors() | GET /api/v1/Verbinder |
| getConnector(id) | GET /api/v1/Verbinder/:id |
| setConnectorEnabled(id, aktiviert) | PUT /api/v1/Connectors/:id/enabled |
| addConnector(Anfrage) | POST/api/v1/Verbinder |
| updateConnector(id, Request) | PATCH /api/v1/Connectors/:id |
| removeConnector(id) | DELETE /api/v1/Verbinder/:id |
| testConnector(id) | POST /api/v1/Verbinder/:id/test |
| listCredentials() | GET /api/v1/Credentials |
| createCredential(Anfrage) | POST /api/v1/credentials |
| updateCredential(id, Request) | PATCH /api/v1/credentials/:id |

Methoden akzeptieren Anforderungsoptionen als letztes Argument. Verwenden Sie zurückgegebene stabile IDs. Nur benutzerdefinierte MCP-Definitionen unterstützen Create/Editing/Remove; Aktualisierungen erfordern den Transport und bewahren weggelassene Anmeldeinformationen auf. Lesen Sie die genauen Anforderungstypen, bevor Sie eine Mutation konstruieren.

<p className="example-label"><strong>Beispiel</strong> Testen Sie ein konfiguriertes Connector</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector` öffnet eine isolierte Verbindung, entdeckt Werkzeuge und schließt sie. Es ruft kein Recherche-Tool auf, aktiviert das Connector oder initiiert die erstmalige OAuth-Anmeldung. Benutzerdefinierte MCP/Credential-Änderungen erfordern eine lokale Authentifizierung; Anmeldedaten-Metadaten lassen rohe Geheimnisse aus.

## Ausführungs- und Konfigurationsidentität {/* #run-and-configuration-identity */}

<p className="example-label"><strong>Beispiel</strong> Starten Sie eine Aufgabe, die für die Genehmigung des Plans anhält</p>

```js
const run = await client.startRun({
  project: projectId, // a returned ID
  prompt: 'Inspect the available project inputs and propose an analysis plan.',
  permissionProfile: 'ask',
  turnIntent: 'plan-first',
});
const state = await client.waitForRun(run.id, {
  timeoutMs: 120000,
  returnOnAttention: true,
});
console.log(state);
```

Ein Warteplan kann ein noch laufendes Objekt mit `attention.kind === 'plan-approval'` zurückgeben. Lesen Sie den aktiven Plan und seine Version / Überarbeitung, bevor Sie antworten. Um visuell zu überprüfen, öffnen Sie die gedruckte Sitzung in der Anwendung, genehmigen oder überarbeiten Sie den Plan dort und setzen Sie dann `waitForRun(run.id)` fort. Verwenden Sie für API-only-Entscheidungen `getSessionPlan` und `respondSessionPlan` mit genau dieser Version/Revision; siehe [Planbefehle](cli.md). Eine gewöhnliche Erlaubnisaufforderung wird nicht zum gleichen strukturierten Aufmerksamkeitszustand.

| Input/Zustand | Regel |
| --- | --- |
| `cwd` | Wenn durch SDK/HTTP geliefert, muss absolut sein; Server canonicalisiert und prüft ein vorhandenes lesbares / beschreibbares Verzeichnis |
| Vorhanden `sessionId` + `cwd` | Muss in das aufgezeichnete Verzeichnis dieser Sitzung auflösen |
| Ausgelassen `cwd` | Verwenden eines anwendungsverwalteten Workspace |
| Externer Arbeitsbereich | Bleibt im Besitz des Anrufers und wird nicht von der Anwendung gelöscht |
| Sitzungskonfiguration schreiben | Verwendungen `expectedRevision`; Zurückweisen von abgestandenen Schriften |
| Projekt-Standard-Schreiben | Verwendungen `expectedUpdatedAt` plus `patch`; Ablehnen von Concurrent Edits |
| Vorrang vor der Neusitzung | Explizite Run Request → Projekt-Standards → Anwendungseinstellungen → Provider-Standard |
| Geänderte Projektausfälle | Beeinflussen Sie neue Sitzungen; keine bestehenden Sessions neu schreiben |

Lesen Sie die Konfiguration, bevor Sie sie bearbeiten. Eine Anbieter- / Modell- / Aufwandsänderung ist eine zusammengesetzte Konfiguration, und referenzierte Ressourcen müssen für das ausgewählte Framework verfügbar sein. Bewahren Sie ausgelassene Einstellungen auf, es sei denn, Sie löschen sie absichtlich.

## Fristen und Wiederholidentität {/* #deadlines-and-retry-identity */}

Der Client fordert die Deadline standardmäßig auf 30 Sekunden an und bleibt aktiv, während er den Response Body verbraucht. Setzen Sie `requestTimeoutMs` bei der Verbindungs-/Client-Einrichtung oder `{signal, timeoutMs}` im finalen Optionsargument einer unterstützten Methode. `downloadArtifact` behält seine Frist, während der zurückgegebene Körper fließt.

`waitForRun` verfügt über ein eigenes Timeout und Signal, das auf Abfrageanfragen und Verzögerungen angewendet wird. Ein Warte-Timeout storniert den Server-Lauf nicht. Rufen Sie `cancelRun(run.id)` explizit an, wenn eine Stornierung beabsichtigt ist, und warten Sie auf die Fertigstellung, bevor Sie Artefakte als erledigt behandeln.

Für die retry-sichere Projekterstellung und -eingabe geben Sie ein `idempotencyKey` im finalen Optionsargument ab und verwenden Sie denselben Schlüssel mit demselben Textkörper. Die Wiedergabe ist begrenzt und prozesslokal und wird bis zu 24 Stunden lang beibehalten, während der Daemon läuft. Geänderte Körper geben `idempotency_conflict` zurück; Eine erschöpfte Wiedergaberegistrierung kann `idempotency_unavailable` zurückgeben. Ein Daemon-Neustart ist keine dauerhafte Cross-Restart-Wiederholungsgarantie.

## Grenzwerte für Ereignisströme {/* #event-stream-boundaries */}

Abonnieren und warten Sie auf `events.ready`, bevor Sie mit der Arbeit beginnen, wenn Sie die frühesten ausgeführten Ereignisse benötigen. Der Iterator trägt Sequenz- und Run/Session/Projekt-Identifikatoren. `run.progress` beinhaltet anbieterneutrale Phasen und 10-Sekunden-Liveness-Updates vor der ersten sichtbaren Anbieterausgabe; Die sitzungsvorbereitung vor der registrierung befindet sich außerhalb dieses streams.

| Signal | Auslegung | Antwort |
| --- | --- | --- |
| `events.ready` Ablehnung | Verbindung fehlgeschlagen, bevor nutzbare Lebendigkeit | Reconnect nach Behebung der Ursache |
| Standard-30-Sekunden-Leerlaufzeit | Kein Ereignis / Kontroll-Herzschlag angekommen | Prüfanschluss; Dies ist kein Model Execution Timeout |
| `event_stream_invalid_message` | Fehlgeformter Ereignisrahmen | Hör auf, diesen Strom zu konsumieren und den Zustand wiederherzustellen |
| `event_stream_overflow` | Consumer-Backlog übertrifft 1,024-Events | Handhabung von Rückstau und erneutes Lesen des autoritativen Zustands |
| `stream.resync-required` | Replay-Suffix abgelaufen oder Stream geändert | Abrufstrom Laufen/Sessieren durch HTTP |

Verbindungsherzschläge sind Kontrollrahmen und werden nicht als gewöhnliche Forschungsereignisse geliefert. Reconnect Replay ist begrenzt und gehört zum aktuellen Prozess. Beharren Sie auf den Artefakt-IDs und dem endgültigen Laufzustand, die durch Ihre eigene Integration benötigt werden.

[SDK Quelle](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs), [SDK-Kontraktnotizen](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md). Siehe [CLI](./cli.md) für Shell Automation und [Kopfloser Dienst](./server.md) für Discovery/Lifecycle.

Quellen: [Unterschriften](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts), [Strecken](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs). Siehe [CLI Managementfelder](cli.md#manage-connectors-and-credentials) für Konfigurations- und Diagnosegrenzen.

## Unbeaufsichtigte Aufgaben {/* #unattended-runs */}

Setzen Sie `permissionPrompts: 'none'` im `startRun`-Eingang entsprechend CLI `--permission-prompts none`. Halten Sie ein geeignetes `permissionProfile`: Diese Option lehnt ungelöste menschliche Interaktionen ab und erweitert keine Berechtigungen. Kombinieren Sie es nicht mit `planFirst: true`.

Der Host muss die Fähigkeit `permission-prompts-none` deklarieren; Andernfalls meldet der Client `unsupported_capability`, bevor er den Lauf erstellt. Diese Richtlinie gilt nur für die aktuelle Invokation. Behandeln Sie den tatsächlichen Status und Fehler des Laufs wie gewohnt. Siehe [unbeaufsichtigte CLI-Läufe](cli.md#unattended-runs).
