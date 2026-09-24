---
title: "CLI et sortie structurée"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLI et sortie structurée {/* #cli-and-structured-output */}

Utilisez `open-science` pour inspecter l'état de l'application, exécuter les tâches, gérer les connecteurs et les identifiants, et exploiter le service local. Commencez avec le lanceur installé et confirmez à quelle instance locale il se connecte.

<PlatformGuide />

## Mise en place depuis un terminal {/* #terminal-setup */}

Installez l'application de bureau d'abord et rendre sa commande `open-science` disponible. Le CLI utilise le moteur de l'application; Ce n'est pas un démon de npm séparé. Les paquets Debian incluent la commande. Lorsque le lanceur est manquant, suivez la configuration du lanceur de plate-forme ou utilisez l'entrée CLI installée, puis `open-science cli install`.

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init` crée le répertoire de configuration sans démarrer l'application. `--profile` est un alias pour `--config-root` pour les profils de développement supportés; La start-up emballée rejette ces overpasses. Utiliser un profil prévu de façon uniforme. `runtime list` montre la disponibilité, la version et la source externe du framework détectés sans exposer les chemins exécutables.

Pour une configuration Codex non configurée :

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

Suivez le flux de connexion. Cela prépare ou répare le temps d'exécution de Codex géré et enregistre l'abonnement par l'intermédiaire de l'application; il n'importe pas les fichiers de connexion externes Codex. Le premier bootstrap cible actuellement Codex, même si la liste d'exécution inclut d'autres cadres. La configuration conflictuelle existante est signalée plutôt que remplacée silencieusement.

Si vous utilisez plutôt une clé OpenAI API, utilisez `provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`, avec un ID de modèle supporté et la clé déjà fournie par votre environnement de gestion secrète. Pour OpenAlex, utilisez `connector configure literature --openalex-key-env OPENALEX_API_KEY --json`. Préfixez les deux commandes avec `open-science`. Ne jamais mettre la clé elle-même dans les arguments de commande. Une vérification des titres de compétence réussie n'établit pas qu'une demande de recherche a été remplie ou qu'il reste un quota.

Lire **Prêt**, l'action individuelle **Contrôles** et suggère des actions **suivant** de `doctor`. Un rapport peut sortir avec succès alors que `ready` est faux; Si le moteur est absent, le docteur le signale et quitte 3. Complétez la condition préalable rapportée, vérifiez à nouveau, puis [exécuter une tâche](#run-input-and-control-flags) dans le projet prévu.

## Points d'entrée {/* #entry-points */}

| Entrée | Besoins | Commande |
| --- | --- | --- |
| Lanceur d'application installé | **Settings → General → Command line tool → Install command** | `open-science --help` |
| Paiement à la source | Dépendances de l'application et du dépôt construits | `node packages/open-science/cli.mjs --help` |
| npm client | Node.js 22.5+ et une application installée; confirmer la disponibilité du paquet avant l'installation | identificateur de l'emballage `@aipoch/open-science` |

Le lanceur installé utilise l'exécution groupée de l'application. Si son répertoire est absent de PATH, suivez les instructions affichées par le panneau Général et ouvrez un nouveau terminal. Ne pas renommer l'exécutable pour correspondre à la marque d'affichage.

<PlatformContent platform="windows">

Après **Install command**, ouvrez une nouvelle fenêtre PowerShell et lancez :

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

Vérifiez que **Source** pointe vers le lanceur affiché en général, généralement un `open-science.cmd` sous votre profil utilisateur. La sortie d'aide réussie confirme les lancements. Si l'état renvoie `{"running":false}`, le CLI n'a pas signalé de moteur courant; Cela ne signifie pas que la fenêtre du bureau est fermée. Vérifiez l'instance prévue en utilisant [Mode serveur](server.md) avant de soumettre des tâches ou de télécharger des fichiers.

</PlatformContent>

## Terminer une petite tâche en ligne de commande {/* #complete-a-small-command-line-task */}

<p className="example-label"><strong>Exemple</strong> Enregistrer une note depuis la ligne de commande</p>

1. Installez la commande en utilisant l'entrée ci-dessus. Gardez l'application de bureau en marche avec un modèle de travail.
2. Lancez `open-science status --json`, puis `open-science project list --json`. Vérifiez l'instance prévue et copiez un ID de projet retourné.
3. Enregistrer `task.md` avec: **Enregistrer project-note.md contenant une brève note de connexion-vérification. Ne lisez pas d'autres fichiers ou n'utilisez pas le réseau.**
4. Exécutez les commandes sous [Lancer les drapeaux d'entrée et de contrôle](#run-input-and-control-flags). Remplacer chaque détenteur de place seulement après avoir obtenu son ID du résultat précédent.
5. Si l'exécution s'arrête pour obtenir la permission, répondez dans sa conversation de bureau. `--wait` peut se terminer pendant que la tâche se poursuit; inspecter `run status RUN_ID --json` avant de soumettre à nouveau.
6. Sélectionnez l'identifiant d'artefact Markdown retourné, téléchargez-le dans un nouveau nom de fichier local, et ouvrez-le. Une course terminée sans l'artefact demandé nécessite un suivi au cours de cette session. Si l'artefact existe mais que le téléchargement échoue, suivez [récupération de téléchargement d'artefact](./api.md#a-completed-task-whose-file-will-not-download).

Pour les premières tâches du plan, utilisez `--return-on-attention`, inspectez le plan retourné et répondez par l'application ou les commandes du plan ci-dessous. Pour les intégrations JSON, distinguer l'exécution, l'achèvement, l'échec et l'annulation au lieu de traiter chaque réponse HTTP réussie comme une tâche terminée.

## Familles de commandement {/* #command-families */}

| Commande | Arguments / drapeaux | Effet |
| --- | --- | --- |
| `project list` | `--json` | Lire les projets disponibles |
| `project create` | Nom, facultatif `--description`, l'un des `--agent-context` / `--agent-context-file` | Créer un projet |
| `project update` | ID ou nom exact, champs métadonnées/contextes fournis | Modifier uniquement les champs fournis; `--clear-agent-context` clarifie explicitement le contexte |
| `project session-defaults show` | ID du projet ou nom exact | Lecture par défaut pour les nouvelles sessions |
| `project session-defaults update` | Possibilités de projet et de session | Mise à jour par défaut avec protection de l'édition concurrente |
| `run` | `--project`, entrée rapide, optionnelle `--session`, `--wait` | Début ou poursuite du travail |
| `run status` / `run cancel` | Exécuter l'ID | Inspecter ou annuler explicitement une course |
| `session status` | ID de la session | Lire l'état de la session |
| `session config show` | ID de la session | Lecture persistante/efficace configuration et révision |
| `session config update` | Numéro d'identification de session `--revision`, options fournies | Changer les virages futurs lorsque la session peut accepter la mise à jour |
| `settings agent-routing show/update` | Options de routage du cadre et de l'examinateur/sous-agent | Lire ou mettre à jour atomiquement le routage mondial |
| `plan show/approve/reject/revise` | ID de la session; décision nécessite la version exacte artefact et la révision | Lire ou répondre au plan actif |
| `artifacts list` | ID de la session | Lire les artefacts enregistrés |
| `artifacts download` | Identification des artéfacts, `--output` | Enregistrer une copie externe |

Utilisez les identifiants de projet dans les scripts. Le CLI peut résoudre un nom de projet exact unique; Les noms en double sont ambigus. Le routage SDK/HTTP nécessite des identifiants directement. Le contexte du projet accepte jusqu'à 16,000 caractères, et les résultats list/create/update exposent `hasAgentContext` plutôt que l'organisme de contexte privé.

Si `artifacts download` échoue avec HTTP 500, mettez à jour une application plus ancienne et réessayez le même ID d'artefact retourné. Le [Télécharger les étapes de récupération](api.md#a-completed-task-whose-file-will-not-download) distingue une tâche terminée d'un transfert de fichier échoué; n'effectuez pas de nouveau la tâche de recherche uniquement pour obtenir ses résultats existants.

## Gérer les connecteurs et les identifiants {/* #manage-connectors-and-credentials */}

Ces commandes utilisent le moteur de fonctionnement et les paramètres sauvegardés. Confirmez l'instance prévue avant d'éditer. Les écritures personnalisées Connector et les lettres de créance nécessitent une connexion locale authentifiée; pour un serveur, exécutez le CLI sur ce serveur, y compris via SSH.

| Commande | Entrée / résultat |
| --- | --- |
| liste de connecteurs open-science --json | Paramètres sécurisés vues des connecteurs disponibles |
| connecteur open-science afficher CONNECTOR_ID --json | Configuration/état pour un ID retourné |
| connecteur de science ouverte activer CONNECTOR_ID | Définit sa préférence activée |
| connecteur open-science désactiver CONNECTOR_ID | Effacer sa préférence activée |
| connecteur open-science ajouter --json | Lire une nouvelle définition personnalisée de MCP à partir de JSON stdin |
| mise à jour du connecteur open-science CONNECTOR_ID --json | Lire la mise à jour de configuration de JSON stdin |
| connecteur open-science supprimer CONNECTOR_ID | Supprimer une définition personnalisée de MCP |
| test du connecteur à science ouverte CONNECTOR_ID --json | Découvrez les outils à travers une connexion séparée, puis fermez-le |
| liste des titres de compétence en sciences ouvertes --json | Lire les métadonnées de justificatifs sans secrets bruts |
| certificat scientifique ouvert ajouter --json | Lire un nouveau titre de compétence de JSON stdin |
| mise à jour des titres de compétence en science ouverte CREDENTIAL_ID --json | Mettre à jour l'affichageNom et/ou secret de JSON stdin |

<p className="example-label"><strong>Exemple</strong> Soumettre une configuration locale Connector</p>

Soumettez votre fichier de configuration local préparé avec :

~~~bash
open-science connector add --json < connector.json
~~~

| Champ de configuration | Besoins |
| --- | --- |
| nom / affichage nom | Requis pour un nouveau Connector personnalisé; nom/ID rester stable lors des mises à jour |
| Politique des transports | stdio, streamable_http ou sse; également nécessaires pour la mise à jour |
| commande / args | Arguments exécutables locaux et optionnels pour stdio |
| url | Point d'arrivée pour HTTP/SSE |
| envCredentialIds / headerCredentialIds | Noms d'environnement/en-tête de bind pour enregistrer les identifiants de justificatifs |
| oauthCredentialId | Reliure un titre OAuth partagé existant |
| Reliures des titres de compétence délivrés | Préserver les valeurs sauvegardées à la mise à jour; un objet de liaison environnement/en-tête vide efface cette carte |

Seules les définitions personnalisées de MCP peuvent être ajoutées, modifiées ou supprimées. **Enabled** est une préférence de sélection, et non une preuve de connectivité ou une révocation globale de l'accès Specialist.

**essai** n'active pas le Connector ni n'exécute ses outils d'affaires. Il renvoie le succès, outil optionnel et un message; la découverte est limitée à dix secondes et la panne sort non zéro. Les diagnostics en direct de Connector groupés ne sont pas pris en charge. Tester peut rafraîchir les jetons OAuth existants, mais n'effectue pas la première connexion du navigateur.

Crédential écrit accepter les secrets par l'intermédiaire de JSON stdin. Gardez-les hors de la commande arguments et l'historique de shell. Une entrée de jeton utilise displayName, type: jeton et secret; api_key est également pris en charge. Reliure le fichier createdCredential.id retourné au Connector. Les anciens backends sans ces paramètres retournent une erreur plutôt que de revenir aux modifications de fichiers de paramètres directs.

## Lancer les drapeaux d'entrée et de contrôle {/* #run-input-and-control-flags */}

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

Remplacer les détenteurs de place capitalisés par des ID retournés. L'exemple ne nomme pas un Skill inventé ou un fournisseur qui doit exister sur votre installation.

| Drapeau | Contrat |
| --- | --- |
| `--prompt` / `--prompt-file` | Texte en ligne ou fichier UTF-8; stdin peut fournir une prompte en cas d'omission |
| `--session` | Poursuivre la session spécifiée |
| `--cwd` | répertoire de travail externe; CLI résout un chemin relatif, le serveur canonique et le valide |
| `--approval-profile` | `ask`, `auto`, `full`; par défaut `ask` |
| `--provider` + `--model` / `--provider-default-model` | Sélectionnez un fournisseur configuré et un modèle par défaut explicite ou appartenant au fournisseur |
| `--reasoning-effort` | Listes d'aide CLI `default`, `low`, `medium`, `high`, `xhigh`, `max`; Les choix du modèle d'assurance-chômage peuvent différer |
| `--skill` | ID Skill installé répétable; n'installe pas de Skill manquant |
| `--plan-first` | Exiger une réponse du plan avant l'exécution |
| `--auto-review` / `--no-auto-review` | Définir la session examen automatique |
| `--memory` / `--no-memory` | Définir la mémoire de session; mutuellement exclusifs |
| `--specialist` | Reliure une nouvelle session par UUID ou nom de profil stable; présentation le nom de l'affichage n'est pas un identifiant de routage |
| `--delegation allow/deny` | Contrôler l'admission de nouveaux travaux délégués; nier n'annule pas les enfants existants |
| `--compute-host` | IDs d'hôte configurés répétables; sélectionne les cibles d'exécution, ne configure pas SSH |
| `--enable-compute-host` / `--clear-compute-hosts` | Contrôles d'accès/de défaut de nouvelle session; les modifications d'accès de session existantes utilisent la mise à jour de configuration |

Un `cwd` externe reste propriété de l'appelant. La réutilisation de `--session` avec `--cwd` nécessite le même répertoire canonique; la demande de run ne déplace pas la session. L'abandon d'une option hôte préserve la sélection existante; utiliser l'opération de compensation explicite lorsque cela est prévu.

## En attente, attention et annulation {/* #waiting-attention-and-cancellation */}

| Option/état | Résultat |
| --- | --- |
| Sans `--wait` | Retour après l'admission à la course; conservation `id` et `sessionId` à voter plus tard |
| `--wait` | Attendez l'état d'exécution du terminal |
| `--wait --return-on-attention` | Retourner également lorsque l'approbation du plan structuré est nécessaire; les invites de permission ne sont pas la même condition d'attention |
| `--timeout-ms` | Arrêter l'attente du client après la date limite; l'exécution du serveur continue |
| `--cancel-on-timeout` | annuler explicitement après un délai; la commande signale toujours le délai |
| `run cancel RUN_ID` | Attendre l'annulation/la finalisation; préserver les artefacts déjà finalisés |

Pour l'approbation du plan, d'abord lire `plan show`, puis fournir `--artifact-version` et `--revision`. Une décision concernant un plan en suspens ne doit pas s'appliquer à un plan plus récent. Les mises à jour de configuration de session nécessitent également la révision retournée par `session config show`; Les mises à jour stale retournent `session_revision_conflict`. Le travail actif root-agent, subagent ou Notebook peut bloquer une mise à jour avec `session_busy`.

## Codes de sortie et de sortie structurés {/* #structured-output-and-exit-codes */}

`--json` émet un résultat. `--jsonl` est disponible avec les événements de flux `run --wait`, et se termine par un résultat d'exécution. Ne combinez pas les deux. Les erreurs sont structurées sur stderr sur demande; analysez le `error.code`, pas seulement le code de sortie du processus.

La réponse ci-après a été reproduite localement :

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| Code de sortie | Signification |
| ---: | --- |
| 0 | Le commandement a réussi; inspecter l'état d'exécution/d'attention retourné, le cas échéant |
| 1 | Défaillance générale ou d'exécution, délai d'exécution, conflit ou état ne signalant aucun service d'exécution |
| 2 | Utilisation non valide de CLI |
| 3 | démon local non disponible |
| 4 | Projet/exécution/session/artefact/Specialist non trouvé |
| 5 | Le travail actif a bloqué une mise à jour d'application |
| 6 | La mise à jour de l'application nécessite une étape d'installation manuelle |

JSONL peut inclure `run.progress` et `stream.resync-required`. Si le replay n'est pas disponible après la reconnection, relisez l'état d'exécution faisant autorité; ne présumez pas que le flux d'événements est une histoire permanente. Les commandes du cycle de vie ont des restrictions de drapeau distinctes décrites dans [Service sans tête](./server.md).

[Mise en œuvre de CLI](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/cli.mjs), [guide de commande en amont](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/CLI.md).

Référence technique: [Contrat CLI](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## Courses sans surveillance {/* #unattended-runs */}

Ajouter `--permission-prompts none` à `run` pour diminuer les interactions humaines non résolues au lieu d'attendre indéfiniment. Le profil d'approbation sélectionné et les subventions mémorisées continuent de s'appliquer; Les demandes de permission restantes sont refusées, les questions des utilisateurs sont refusées et les plans exigeant un examen humain sont rejetés. Cela n'approuve pas toutes les actions.

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

L'option ne s'applique qu'à cette invocation et n'est pas sauvegardée comme préférence de session. Il ne peut pas être combiné avec `--plan-first`. Inspectez le statut final et l'erreur : éviter une attente humaine ne garantit pas l'achèvement de la tâche. Le client vérifie la capacité de l'hôte `permission-prompts-none`; Mettre à jour le client et l'application correspondants si un hôte plus ancien retourne `unsupported_capability`.
