---
title: "Conversations et demandes en attente"
last_update:
  date: '2026-10-08'
---

# Conversations et demandes en attente {/* #conversations-and-queued-requests */}

Le Compositeur envoie des instructions et des références d'entrée à la session en cours et vous permet de préparer des suivis pendant l'exécution. **Queue · Non enregistré** signifie qu'une requête en attente n'est pas encore une instruction de transcription enregistrée.

## Préparer une demande avec un résultat vérifiable {/* #prepare-a-request-with-a-checkable-outcome */}

Sélectionnez **New** dans le projet prévu et entrez une requête dans **Ask anything**. Nommez l'entrée, la sortie souhaitée et toutes les contraintes de méthode. Pour un exemple de démarrage complet, suivez [Votre premier projet](first-project.md).

| Entrée | Décision | Vérifier avant d'envoyer |
| --- | --- | --- |
| + → Joindre les fichiers | Choisissez un fichier local et attendez le téléchargement | présence prévue de puces; aucun transfert n'est toujours actif |
| puce de pièce jointe | Aperçu de l'entrée par étape | Nom et contenu correspondent aux données prévues |
| Supprimer la pièce jointe | Supprimer son projet de référence | Ne supprime pas le fichier local original |
| + → Vos fichiers | Sélectionnez un fichier de projet existant | Correct artefact/version, pas seulement un nom similaire |
| `@` | Sélectionnez un fichier/un article ou une référence bibliographique disponible | Choisissez une suggestion réelle pour lier la référence |
| `/` | Sélectionnez un Skill disponible | La méthode est pertinente et les conditions préalables sont disponibles |
| `#` | Renvoie une transcription de session pour ce tour | Ne promet pas d'inclure tous les fichiers/groupes de cette session |
| + → Enregistrer en tant que compétence | [Transformer une branche terminée en Skill réutilisable](../skills/create.md) | Finir l'activité courante; Inspecter l'infobulle s'il n'est pas disponible et vérifier le paquet enregistré |
| + → Contexte | Inspecter l'utilisation actuelle du contexte | De nouvelles sessions non envoyées peuvent avoir une entrée désactivée |
| + → Revue | Demander un examen lorsqu'il y a un travail admissible | Un résultat et un chemin d'examen compatible sont requis |

Les longues colles en texte clair au-dessus des caractères 10,000 ou des lignes 300 deviennent des pièces jointes gérées. **Show in text field** restaure ce texte à l'éditeur lorsqu'il est offert. Au début d'un Compositeur vide, Up/Down navigue l'historique de l'invite; inspecter les pièces jointes restaurées avant de les remettre.

## Sélectionnez comment le travail commence {/* #select-how-work-begins */}

Le sélecteur de modèle choisit parmi les modèles configurés. Ses options de raisonnement dépendent du modèle/cadre. Les modifications s'appliquent aux demandes subséquentes, pas à un tour déjà lancé. **Agent controls** expose le mode d'autorisation, le choix d'auto-révision, le choix de Specialist et la délégation; Chacun d'eux a un effet distinct.

| Contrôle de l'envoi | Utilisation | Résultat/boundaire |
| --- | --- | --- |
| Envoyer un message | Séance intermédiaire, demande prête | Enregistre un message utilisateur et démarre l'exécution |
| Plus d'options d'envoi → Planifier d'abord | Examiner les étapes avant l'exécution | Répondre au plan avant le début des travaux approuvés |
| Discussion parallèle | Discutez dans un onglet indépendant avec des outils restreints | De nouveaux projets héritent du modèle de conversation et de l'effort de raisonnement; Vérifiez la sélection Side Chat avant d'envoyer. Voir [Side Chat](delegation.md) |
| Branche | Poursuite indépendante, le cas échéant | Vérifier l'historique/fichiers hérités; voir [Sessions](sessions.md) |
| Ajouter un message à la file d'attente | Préparer un suivi en cours d'exécution | En attente de la demande reste Non sauvegardé jusqu'à la livraison |
| Annuler l'exécution | Arrêter l'exécution en cours | Attendre l'annulation; les résultats déjà enregistrés ne sont pas automatiquement annulés |

## Envoyer des commentaires précis {/* #send-precise-feedback */}

<p className="example-label"><strong>Exemple</strong> Demander des contrôles d'entrée et de sortie dans un plan</p>

Si le plan omet une vérification de l'intégrité de la source ou de la sortie, demandez-le avant d'approuver. Adaptez les exigences de sortie ci-dessous à votre tâche :

```text
Add an explicit before/after SHA-256 check and reopen all three saved
outputs. Use compact sample labels in the plot, and include their exact
original column-name mapping in the CSV/report.
```

Cette demande a été soumise par **Respond to Plan → Send Plan feedback**, puis approuvée par le plan révisé. Ce n'était pas une démonstration de la livraison en file d'attente. Voir [Planification](planning.md) pour les commandes et les captures d'écran réelles.

Pour une tâche en cours d'exécution, utilisez la file d'attente lorsque vous devez modifier l'instruction suivante. Indiquer les changements et les besoins. Une mise à jour de message n'autorise pas elle-même l'installation d'un nouveau paquet demandé ou un accès plus large aux fichiers.

## Gérer la file d'attente d'une tâche courante {/* #manage-a-running-tasks-queue */}

1. Entrez le suivi dans Demandez n'importe quoi pendant que l'exécution est active.
2. Sélectionnez **Add message to queue**, puis élargissez son compte pour lire le texte en attente.
3. Utilisez **Edit queued message** pour le ramener dans le Compositeur. Préserver/supprimer un avant-projet existant si l'application le demande.
4. **Remove queued message** supprime l'article en attente, pas une instruction déjà livrée.
5. Faites glisser la poignée de réordre. Pour réorganiser le clavier, focalisez-le, appuyez sur **Espace** pour récupérer l'élément, **En haut/en bas** pour le déplacer, puis **Espace** pour le déposer.
6. **Send now** demande la livraison par le biais du chemin de suivi supporté par le cadre.
7. Confirmez que le texte apparaît comme un message utilisateur et que l'agent reconnaît le changement.

Lire **Sending…**, **Stopping…** ou **Message en attente envoyé après la fin de l'exécution en cours**. Certains États-cadres reportent l'exécution. **Non enregistré** signifie que le texte n'est pas encore un message de transcription durable; préserver le texte en attente avant de fermer/recharger. Un avertissement de branche signifie que la file d'attente appartient à un autre chemin de message. Résoudre une erreur d'envoi sur l'élément existant avant d'ajouter des duplicatas.

### Modifier et réorganiser les suivis pendant la rédaction d'un rapport {/* #edit-and-reorder-follow-ups-while-a-report-is-being-written */}

Pour réviser plusieurs messages en file d'attente, modifier la requête prévue, ajuster sa commande, puis supprimer toute demande dont vous n'avez plus besoin :

1. Sélectionnez **Edit queued message** à côté de l'élément prévu. Il se déplace dans le Compositeur et quitte temporairement la file d'attente.
2. Révisez le texte et sélectionnez **Add message to queue**. Vérifier à nouveau sa position; une requête éditée peut revenir à la fin.
3. Pour déplacer la requête plus tôt, focalisez sa poignée **Recommander le message en attente**, appuyez sur **Espace**, utilisez les touches fléchées, puis appuyez à nouveau sur **Espace**.
4. Utilisez **Remove queued message** à côté d'un rappel ou d'une instruction dont vous n'avez plus besoin.
5. Après la livraison, vérifiez la transcription enregistrée pour le texte final et la commande. Les demandes retirées ne doivent pas apparaître comme instructions livrées.

![Les deux autres demandes après édition et réorganisation](/img/open-science/local-todo-batch/14-queue-reordered.webp)

Vérifiez que les réponses livrées suivent le contenu et l'ordre édités. Les éléments marqués **Non enregistré** n'ont pas entré la transcription enregistrée; copier le texte non envoyé important avant de fermer ou de redémarrer.

**Exit queued editing** termine le mode d'édition de la file d'attente et laisse le texte dans le Compositeur. L'édition supprime l'élément original de la file d'attente, de sorte que la sortie ne le remet pas en arrière. Pour le conserver, vérifiez le brouillon et ajoutez-le à nouveau à la file d'attente; pour le jeter, effacer le projet.

### Préserver les pièces jointes lors de l'édition {/* #preserve-attachments-when-editing */}

Lorsqu'une requête en file d'attente comprend un fichier, confirmez que sa puce est toujours présente à chaque fois que vous rouvrez l'éditeur. Changez les instructions, puis sélectionnez **Add message to queue**. Après la livraison, comparez le fichier affiché dans le message utilisateur sauvegardé avec l'entrée prévue. Demandez une somme de contrôle lorsque l'identité exacte du fichier est importante.

![La demande de pièce jointe éditée livrée avec son dossier et son somme de contrôle](/img/open-science/sept11-completion/queue-result.webp)

### Une pièce jointe en attente devient indisponible {/* #a-queued-attachment-becomes-unavailable */}

Si un message en file d'attente édité s'arrête avec **Le fichier géré ou sa session est supprimé.**, inspecter ses puces de pièce jointe et le fichier original dans les fichiers. Préserver le texte de la requête, réattacher le fichier actuel dans un nouveau message ordinaire, et réessayer. Éviter d'envoyer à plusieurs reprises la même référence de fixation. Gardez l'erreur et l'identité du fichier pour un rapport de diagnostic si la nouvelle pièce jointe échoue également.

## Lire l'activité et terminer {/* #read-activity-and-completion */}

Étendre une carte d'outils pour inspecter ses arguments, son code et sa sortie. Après l'achèvement, ouvrez chaque résultat demandé. Si une étape a échoué, utilisez sa première erreur pour choisir l'action de récupération dans [Dépannage](troubleshooting.md).

**Show more** élargit une longue demande d'utilisateur. **Copy message** et code Copier les contrôles copient leur contenu respectif. **Scroll to end** revient au dernier événement; le chemin de roulement de bureau saute parmi les invites dans une longue conversation. Modifier un message utilisateur antérieur crée une révision; Utilisez [Sessions](sessions.md) pour comprendre le chemin sélectionné.

| Problème | Prochaine vérification |
| --- | --- |
| Envoyer désactivé | Texte vide, téléchargement incomplet ou état de session non disponible |
| Queue édit refusé | L'ébauche du compositeur existant doit être conservée/effacée |
| L'analyse initiale se poursuit | Confirmer la mise à jour par rapport à l'état différé |
| Tâche en attente après approbation du plan | Une autorisation d'outil séparée peut encore être en attente |
| Modèle dit Terminé mais un outil a échoué | Inspecter la première défaillance et les objets sauvés réels avant d'accepter |

## Copier, télécharger ou agrandir un tableau de réponses {/* #copy-download-or-enlarge-an-answer-table */}

Déplacez ou concentrez la table de réponse pour révéler **Copier le tableau** (Markdown, CSV ou TSV), **Télécharger le tableau** (CSV ou Markdown) et **Affichage en plein écran**. Choisissez le format requis, confirmez la destination et rouvrez le fichier pour vérifier les lignes et les en-têtes. Ces actions exportent une réponse existante; ils ne réexécutent pas un Connector ou ne créent pas une version d'artefact gérée.

![La table de métadonnées retournée dans sa vue en plein écran](/img/open-science/guides-walkthrough/60-response-table.webp)

Pour les travaux à long terme, utilisez [Tâches en arrière-plan](notebook.md#background-tasks-and-result-delivery) pour ouvrir ou annuler la course spécifique. Un suivi en attente est une instruction en attente; un travail de base est déjà admis. La fermeture de la liste des tâches n'arrête pas l'exécution.

Sources: [contrôle de la file d'attente](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx), [contrôleur de livraison](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/workspace-message-queue-controller.ts).

## Déposez les fichiers dans une conversation {/* #conversation-drop */}

Vous pouvez faire glisser des fichiers locaux sur la zone de conversation, pas seulement le Compositeur. Attendez que les puces de pièce jointe et tout téléchargement finissent, inspectez les noms de fichiers, puis envoyez la demande. La dépose de fichiers n'envoie pas le message. Pour importer un paquet de recherche `.science`, utilisez **Importer une recherche précédente** sur la page de conversation vide; Voir [Dossiers de recherche](research-packages.md).
