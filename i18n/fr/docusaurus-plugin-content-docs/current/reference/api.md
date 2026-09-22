---
title: "Tâche SDK et locale API"
last_update:
  date: '2026-09-22'
---

# Tâche SDK et locale API {/* #task-sdk-and-local-api */}

Le client `@aipoch/open-science` Node.js se connecte à un service d'application local authentifié pour gérer les tâches, les sessions, les connecteurs et les identifiants partagés. Les méthodes publiques SDK sont séparées des appels de précharge Electron et des API internes `host` de l'agent.

<span id="connect-and-select-real-ids" />

## Connectez-vous, exécutez une tâche et téléchargez sa sortie {/* #connect-run-a-task-and-download-its-output */}

<p className="example-label"><strong>Exemple</strong> Enregistrer et télécharger une note de vérification de connexion</p>

Utilisez Node.js 22.5 ou une version ultérieure. Ouvrez l'application de bureau installée sur la même machine, terminez la configuration du modèle et continuez à fonctionner. Le SDK utilise la découverte du service local et son jeton stocké localement. Pour un démon séparé, suivez d'abord [Service sans tête](server.md).

Dans un dossier de travail vide, installez le client :

```bash
npm init -y
npm install @aipoch/open-science
```

Enregistrer ce qui suit sous `connection-check.mjs`. Exécutez `node connection-check.mjs` pour lister les ID de projet, puis `node connection-check.mjs PROJECT_ID` avec un ID retourné. La première invocation s'arrête délibérément après l'inscription des projets; la seconde crée une petite tâche.

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

Gardez la session de bureau ouverte. Répondez-y si **Ask for approval** arrête la tâche. Un délai d'attente arrête le sondage auprès des clients; il n'annule pas la course. Inspectez l'ID imprimé avec `getRun`, continuez à attendre après avoir résolu la requête, ou appelez `cancelRun` lorsque vous avez l'intention de l'arrêter. Le téléchargement ne réussit que lorsqu'il existe un artefact enregistré correspondant; ouvrir le Markdown téléchargé pour terminer la vérification.

Ce programme démontre le contrat public API. Il ne suppose pas qu'un modèle enregistrera toujours le fichier demandé. Si le paquet npm ne peut pas être installé, utilisez le dossier SDK expédié avec la commande source correspondante comme paquet local; confirmer ses métadonnées de paquet avant l'installation.

### Une tâche terminée dont le fichier ne sera pas téléchargé {/* #a-completed-task-whose-file-will-not-download */}

Une cause de cette erreur – l'identité de version d'artefact perdue dans les dossiers de tâches terminés – a été corrigée dans le [télécharger la mise à jour](../changelog/v0.29.0.md). Sur une ancienne application, mettre à jour avant de réessayer le même fichier enregistré. D'autres causes HTTP 500 nécessitent toujours un diagnostic.

L'achèvement des tâches et le téléchargement des artefacts sont des vérifications distinctes. Si `downloadArtifact` retourne HTTP **500** / `internal_error`, appelez `getRun` et `listArtifacts` pour confirmer l'état de la tâche et conserver l'identifiant exact de l'artefact retourné. Ne recommencez pas la même tâche de recherche juste pour reessayer un téléchargement.

Ouvrez l'artefact dans l'application et vérifiez si son contenu est disponible. Un aperçu de travail n'établit pas que le téléchargement SDK a réussi. Inclure l'identifiant d'exécution, l'identifiant d'artefact et l'erreur de téléchargement dans un [rapport de diagnostic](../guides/troubleshooting.md); omettre les jetons d'authentification. La même défaillance peut affecter la commande `artifacts download` de CLI.

## Inspecter la préparation et préparer Codex {/* #runtime-api */}

| Méthode SDK | Ressources de HTTP | Objet |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | Inspecter l'état de préparation et les prochaines actions. |
| `listRuntimes()` | `GET /api/v1/runtimes` | Lister le cadre, l'état, la version optionnelle et la source gérée/externe. |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | Inspectez l'état de configuration de la première sortie. |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | Préparer ou réparer le temps d'exécution de Codex géré par le flux de bootstrap pris en charge. |
| `installCli()` | `POST /api/v1/cli/install` | Installez le lanceur local PATH. |

Les mutations d'installation nécessitent le service local authentifié. Vérifiez le code d'erreur et `ok` retourné; les conflits de configuration doivent être résolus avant de réessayer. Un délai imparti par le client n'établit pas qu'une installation acceptée a été annulée. Revérifier l'état de préparation avant de démarrer une autre installation. Pour l'accès à l'abonnement ou l'entrée nominative-environnement-variable, utilisez le [débit de configuration du terminal](cli.md#terminal-setup).

## Méthodes et ressources HTTP {/* #methods-and-http-resources */}

| Méthode SDK | Ressources de HTTP | Objet |
| --- | --- | --- |
| `listProjects`, `createProject` | GET/POST `/api/v1/projects` | Lire/créer des projets |
| `updateProject` | PATCH `/api/v1/projects/:id` | Mettre à jour les métadonnées/contextes du projet |
| `getProjectSessionDefaults`, `updateProjectSessionDefaults` | GET/PATCH `/api/v1/projects/:id/session-defaults` | Par défaut pour les sessions nouvellement créées |
| `listSessions` | Allez. `/api/v1/sessions?project=ID` | Lire les résumés des séances |
| `getSession` | Allez. `/api/v1/sessions/:id` | Lire une session |
| `getSessionConfiguration`, `updateSessionConfiguration` | GET/PATCH `/api/v1/sessions/:id/config` | Configuration de la session de lecture/mise à jour |
| `getAgentRouting`, `updateAgentRouting` | GET/PATCH `/api/v1/settings/agent-routing` | Cadre mondial/examinateur/parrainage des sous-agents |
| `getSessionPlan` | Allez. `/api/v1/sessions/:id/plan` | Lire l'état du plan actif |
| `respondSessionPlan` | POSTE `/api/v1/sessions/:id/plan/respond` | Répondre à la décision/version/révision exacte |
| `startRun` | POSTE `/api/v1/runs` | Admettre une course |
| `getRun`, `cancelRun` | Allez. `/api/v1/runs/:id`, POSTE `/api/v1/runs/:id/cancel` | Inspecter/annuler l'exécution |
| `listArtifacts` | Allez. `/api/v1/sessions/:id/artifacts` | Lire les descripteurs de sortie gérés |
| `downloadArtifact` | Réponse au téléchargement d'Artifact | Streamer une sortie sauvegardée; consommer le corps de réponse retourné |
| `waitForRun` | SDK vote sur l'état d'exécution | Attendez avec les options d'annulation/deadline |
| `events` | itérateur d'événement SDK | Observer l'activité ordonnée et reconnecter/resync signaux |

[Définitions de la méthode et itinéraires exacts](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs) est la recherche autorisée pour les signatures de demande. Le tableau n'est pas autorisé à appeler des paramètres électroniques/internes arbitraires.

### Méthodes de gestion Connector {/* #connector-management-methods */}

| Méthode SDK | Ressources de HTTP |
| --- | --- |
| listConnecteurs() | GET /api/v1/connecteurs |
| getConnector(id) | GET /api/v1/connecteurs/:id |
| setConnectorEnabled(id, activé) | PUT /api/v1/connecteurs/:id/faciled |
| addConnector(demande) | POST /api/v1/connecteurs |
| updateConnector(id, requête) | PATCH /api/v1/connecteurs/:id |
| supprimerConnecteur(id) | DELETE /api/v1/connecteurs/:id |
| testConnecteur(id) | POST /api/v1/connecteurs/:id/test |
| listeCrédits() | GET /api/v1/crédentielles |
| createCredential(request) | POST/api/v1/crédentiels |
| updateCredential(id, requête) | PATCH /api/v1/crédentiels/:id |

Les méthodes acceptent les options de requête comme argument final. Utiliser les identifiants stables retournés. Seules les définitions personnalisées de MCP prennent en charge la création/modifier/supprimer; les mises à jour nécessitent le transport et préservent les liaisons de justificatifs omises. Lire les types exacts de requête avant de construire une mutation.

<p className="example-label"><strong>Exemple</strong> Tester un Connector configuré</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector` ouvre une connexion isolée, découvre les outils et la ferme. Il n'invoque pas d'outil de recherche, active le Connector ou lance la première connexion OAuth. Les modifications personnalisées de MCP/crédentielles nécessitent une authentification locale; Les métadonnées de niveau omettent les secrets bruts.

## Identité de l'exécution et de la configuration {/* #run-and-configuration-identity */}

<p className="example-label"><strong>Exemple</strong> Commencez une tâche qui s'arrête pour l'approbation du plan</p>

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

Un plan d'attente peut renvoyer un objet toujours en cours d'exécution avec `attention.kind === 'plan-approval'`. Lisez le plan actif et sa version/révision avant de répondre. Pour examiner visuellement, ouvrir la séance imprimée dans la demande, approuver ou réviser le plan, puis reprendre `waitForRun(run.id)`. Pour les décisions API uniquement, utilisez `getSessionPlan` et `respondSessionPlan` avec cette version/révision exacte; Voir [commandes de plan](cli.md). Une invitation de permission ordinaire ne devient pas le même état d'attention structuré.

| Entrée/état | Règle |
| --- | --- |
| `cwd` | Si elle est fournie par SDK/HTTP, elle doit être absolue; le serveur canonicalise et vérifie un répertoire lisible/écrit existant |
| Existante `sessionId` + `cwd` | Doit être résolu dans le répertoire enregistré de cette session |
| Omis `cwd` | Utiliser un espace de travail géré par l'application |
| Espace de travail externe | Reste propriétaire de l'appelant et n'est pas supprimé par l'application |
| Configuration de la session écrire | Utilisations `expectedRevision`; rejeter l'impasse écrit |
| Écrire un projet par défaut | Utilisations `expectedUpdatedAt` Plus `patch`; rejeter les modifications simultanées |
| Préséance de la nouvelle session | Demande explicite d'exécution → par défaut du projet → paramètres de l'application → par défaut du fournisseur |
| Par défaut du projet modifié | Influencer les nouvelles sessions; ne pas réécrire les sessions existantes |

Lisez la configuration avant de l'éditer. Un changement de fournisseur, de modèle ou d'effort est une configuration composée, et les ressources référencées doivent être disponibles pour le cadre sélectionné. Préserver les paramètres omis à moins de les effacer délibérément.

## Délais et réessayer l'identité {/* #deadlines-and-retry-identity */}

Le client demande la date limite par défaut à 30 secondes et reste actif tout en consommant le corps de réponse. Définissez `requestTimeoutMs` à la configuration connection/client, ou `{signal, timeoutMs}` dans l'argument des options finales d'une méthode prise en charge. `downloadArtifact` conserve sa date limite pendant que le corps renvoyé flux.

`waitForRun` a son propre délai global et son propre signal, appliqué aux demandes de vote et aux retards. Un délai d'attente n'annule pas le fonctionnement du serveur. Appelez `cancelRun(run.id)` explicitement lorsque l'annulation est prévue et attendez la finalisation avant de traiter les artefacts comme réglé.

Pour créer un projet sans danger et exécuter l'admission, passez un `idempotencyKey` dans l'argument des options finales et réutiliser la même clé avec le même corps. Replay est limité et process-local, conservé jusqu'à 24 heures pendant que le démon reste en cours d'exécution. Les corps modifiés retournent `idempotency_conflict`; un registre replay épuisé peut renvoyer `idempotency_unavailable`. Un redémarrage d'un démon n'est pas une garantie durable de redémarrage croisé.

## Limites des flux d'événements {/* #event-stream-boundaries */}

Inscrivez-vous et attendez `events.ready` avant de commencer à travailler si vous avez besoin des premiers événements. L'itérateur porte des identificateurs de séquence et d'exécution/session/projet. `run.progress` comprend des phases neutres pour le fournisseur et des mises à jour de dix secondes avant la première sortie visible pour le fournisseur; la préparation de la session avant l'enregistrement est en dehors de ce flux.

| Signal | Interprétation | Réponse |
| --- | --- | --- |
| `events.ready` rejet | La connexion a échoué avant la vie utilisable | Reconnecter après avoir résolu la cause |
| Temps mort par défaut de 30-seconde | Aucun événement/contrôle du rythme cardiaque n'est arrivé | Vérifier la connexion; ce n'est pas un délai d'exécution modèle |
| `event_stream_invalid_message` | Cadre d'événement déformé | Arrêtez de consommer ce flux et rétablissez l'état |
| `event_stream_overflow` | L'arriéré des consommateurs dépasse les événements 1,024 | Poignez la contre-pression et relisez l'état faisant autorité |
| `stream.resync-required` | Rejouer le suffixe expiré ou le flux modifié | Saisissez le courant Exécuter/Session via HTTP |

Les battements cardiaques de connexion sont des cadres de contrôle et ne sont pas produits comme des événements de recherche ordinaires. Reconnecter le replay est limité et appartient au processus actuel. Persistez les ID d'artefact et l'état final requis par votre propre intégration.

[Source SDK](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs), [Billets de contrat SDK](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md). Voir [CLI](./cli.md) pour l'automatisation de shell et [Service sans tête](./server.md) pour la découverte/cycle de vie.

Sources: [Signatures](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts), [itinéraires](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs). Voir [Champs de gestion CLI](cli.md#manage-connectors-and-credentials) pour les limites de configuration et de diagnostic.

## Tâches non surveillées {/* #unattended-runs */}

Définir `permissionPrompts: 'none'` dans l'entrée `startRun`, correspondant à CLI `--permission-prompts none`. Gardez un `permissionProfile` approprié : cette option décline les interactions humaines non résolues et n'étend pas les permissions. Ne le combinez pas avec `planFirst: true`.

L'hôte doit déclarer la capacité `permission-prompts-none`; Sinon, le client signale `unsupported_capability` avant de créer l'exécution. Cette politique ne s'applique qu'à l'invocation actuelle. Gérez l'état réel et l'erreur de l'exécution comme d'habitude. Voir [des essais CLI sans surveillance](cli.md#unattended-runs).
