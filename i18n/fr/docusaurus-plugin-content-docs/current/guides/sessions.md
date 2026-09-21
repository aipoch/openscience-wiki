---
title: "Sessions et sections"
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Sessions et sections {/* #sessions-and-branches */}

Un projet regroupe des sources et des travaux connexes. Une session est une conversation à l'intérieur. Utilisez une nouvelle séance pour une question distincte, et une section où la nouvelle question devrait conserver un historique de conversation sélectionné. Il n'y a pas non plus de remplacement pour vérifier les fichiers et les enregistrements d'exécution auxquels la nouvelle conversation peut effectivement accéder.

## Créer, nommer et retourner à une session {/* #create-name-and-return-to-a-session */}

Ouvrez le projet, sélectionnez **New** sous Sessions, entrez une requête et envoyez-la. Vérifiez d'abord le nom du projet : une nouvelle session appartient à ce projet. Sélectionnez une ligne de session pour y revenir; lire son statut avant d'assumer que la tâche est terminée.

<p className="example-label"><strong>Exemple</strong> Nommez une session de contrôle de qualité RNA-seq</p>

Pour l'exécution GSE60450 terminée, nous avons utilisé **Edit…** pour enregistrer cette information:

| Champ | Exemple de valeur | Contrainte |
| --- | --- | --- |
| Titre | `RNA-seq count matrix - validation and sample QC` | Jusqu'à 80 caractères; l'éditeur affiche le nombre |
| Descriptif | `Validate the public GSE60450 matrix and retain descriptive QC outputs with source integrity checks.` | Jusqu'à 1,000 caractères |
| Enregistrer | Persistez les changements | Vérifiez le titre de la barre latérale après la fermeture |
| Annuler / Fermer | Laisser sans appliquer le projet | Cela n'annule pas la recherche |

![Titre de la session et éditeur de description](/img/open-science/guides-walkthrough/40-session-edit.webp)

Choisissez **Pin** dans le menu ligne pour garder la session dans le groupe Pinned. **Unpin** le renvoie à la liste ordinaire. Pinning organise l'accès; il ne maintient pas un noyau en vie ou ne protège pas une session contre la suppression.

Survolez une session pour vérifier son numéro ainsi que son titre et son projet. Ce nombre permet de distinguer les conversations nommées de la même manière; confirmer la ligne sélectionnée avant de l'éditer ou de la supprimer.

## Enregistrer un signet de lecture {/* #save-a-reading-bookmark */}

Utilisez [signets de lecture privés](bookmarks.md) pour enregistrer un passage ou une région PDF avec une note, puis retournez-lui de **Bookmarks** dans cette session. Enregistrer un signet n'envoie pas le passage à l'agent.

## Lire correctement le menu de session {/* #read-the-session-menu-correctly */}

![Actions appartenant à la session RNA-seq](/img/open-science/guides-walkthrough/41-session-actions.webp)

| Décision | Résultat | Vérifier |
| --- | --- | --- |
| Modifier… | Modifier le titre/description | Corriger la ligne et enregistrer l'étiquette |
| Téléchargez tous les artefacts | Ouvrir un flux de sélection/téléchargement d'artefacts | Les fichiers enregistrés de cette session et la sélection demandée |
| Voir Notebook | Ouvrir la vue d'exécution de la session | Propriétaire, langue et tirages réels |
| Exporter la conversation… | Exporter la conversation dans le format ou les options proposés | L'exportation de transcription est distincte d'un paquet artefact/Notebook |
| Archiver | Cacher la session de la navigation active | Il reste récupérable dans Paramètres → Archivé |
| Supprimer | Ouvrir une confirmation de suppression permanente | Lisez exactement quelles données sont affectées; Annuler le préserver |



## Branche après un résultat terminé {/* #branch-after-a-completed-result */}

<p className="example-label"><strong>Exemple pratique</strong> Branche une séance de CQ terminée pour l'annotation de l'échantillon</p>

Supposons que vous vouliez discuter de l'annotation de l'échantillon en aval tout en maintenant intacte la conversation du CQ du compte brut terminé.

1. Ouvrir la réponse complète dans la session originale.
2. Sélectionnez **Branch in new session** sous cette réponse.
3. Confirmez qu'une nouvelle ligne de session apparaît. Il peut d'abord partager le titre original.
4. Renommer en `GSE60450 - follow-up interpretation` avec **Edit…**.
5. Inspectez la transcription héritée avant de soumettre la demande suivante. Référencez les artefacts originaux du projet explicitement au besoin.

![Une branche nommée indépendamment à côté de l'original épinglé](/img/open-science/guides-walkthrough/57-session-branch.webp)

Une branche conserve l'historique de conversation sélectionné, mais elle ne recrée pas le noyau en direct original. Pour une activité copiée portant le nom de **code shown** ou un lien historique bloqué, ouvrez l'artefact original du panneau Fichiers du projet et inspectez sa session de production.

La disponibilité des succursales dépend du message et de l'état du cadre. [Side Chat](delegation.md#side-chat-availability) est séparé. Une nouvelle discussion parallèle hérite du modèle actuel et de l'effort de raisonnement de cette conversation; vous pouvez sélectionner un modèle différent pour son prochain envoi.

## Réviser un message antérieur {/* #revise-an-earlier-message */}

**Edit message** sur une requête utilisateur précédente crée une révision de message, plutôt que d'effacer l'historique entier. Lire le texte révisé et les pièces jointes avant de soumettre. Utilisez **Révision du message précédente/suivante** si disponible pour inspecter les solutions de rechange. Le contexte visible ultérieur dépend du chemin sélectionné; une ancienne réponse ne devrait pas être considérée comme la réponse à une demande nouvellement révisée.

<p className="example-label"><strong>Exemple pratique</strong> Réviser une demande de définitions métriques du CQ</p>

Pour cet exemple de QC, choisissez **Edit message** sur la question remplie, remplacez la requête à une phrase par quatre définitions et choisissez **Send**. Les contrôles de révision ne sont pas disponibles pendant que la nouvelle réponse est en cours d'exécution. Une fois terminé, **Previous message revision** retourne à `1/2` avec la question et la réponse d'origine; **Next message revision** retourne à la réponse révisée. Une correction supplémentaire aux noms exacts de champs CSV a produit `3/3`. Lors de cette session d'abonnement Codex, les deux rapports enregistrés avant le message révisé sont restés disponibles et leurs octets téléchargés sont inchangés.

Le même chemin de révision a également été exercé avec OpenCode et un modèle local: la requête révisée a produit la nouvelle phrase, Précédent a restauré la réponse originale, et Suivant a restauré la réponse révisée. Cet exemple de connexion seulement n'établit pas que l'état de l'outil ou les effets secondaires externes sont inversés.

![Contrôles de commutation des révisions des messages historiques](/img/open-science/local-todo-batch/18-message-revision.webp)

**Cancel** quitte sans soumettre l'édition. **Send** demande une nouvelle réponse; Vérifiez avant de continuer. Utilisez un suivi pour corriger la prochaine action ou une succursale pour une enquête nommée séparément.

## Dossiers de recherche {/* #research-packages */}

Pour transmettre ensemble les branches, les fichiers et les preuves de conversation, utilisez un [Paquet de recherche .science](research-packages.md). Le guide porte sur les options d'exportation, l'importation et l'inspection, les séances en lecture seule et la récupération du transfert.

## Exporter les conversations et les dossiers de recherche {/* #export-conversations-and-research-files */}

Choisissez **Export → Export conversation…** dans le menu de la ligne de session pour partager une discussion de recherche. Utilisez d'abord **Edit…** pour donner à la session un titre concis : l'exportation PDF utilise ce titre, et un long titre automatique peut consommer une grande partie de la première page.

| Contrôle | Action et résultats |
| --- | --- |
| Format → PDF / Marquage | PDF pour la lecture et l'impression; Markdown pour la révision ultérieure |
| Conversation entière | Exporter la branche de conversation actuelle |
| Sélectionné | Afficher les cases à cocher, initialement vides; le compteur suit votre sélection |
| Tout sélectionner | Sélectionnez chaque tour listé |
| Export PDF / Marquage à l'exportation | Ouvrir la boîte de dialogue de sauvegarde du système; non disponible quand aucun tour n'est sélectionné |
| Annuler | Fermer sans créer d'exportation |

<p className="example-label"><strong>Exemple pratique</strong> Exporter seulement les définitions finales de GSE60450 QC tourner</p>

![Sélection du virage final des définitions de QC pour l'exportation de PDF](/img/open-science/local-todo-batch/20-selected-conversation-export.webp)

Dans **GSE60450 — Methods and claim audit**, la sélection du tour final a produit un PDF d'une page contenant seulement cette requête et ses quatre définitions métriques. Les discussions précédentes étaient absentes. La conversation entière PDF a également été rouverte et vérifiée. L'exportation précédente de Markdown a commencé par son suivi sélectionné. Un tour peut contenir plusieurs messages d'assistant, de sorte que la sélection d'un tour n'a pas besoin d'exporter exactement deux messages.

L'exportation de conversation ne remplace pas le téléchargement de fichiers de recherche. Les liens de résultat peuvent se référer aux dossiers internes d'application qu'un destinataire ne peut pas ouvrir. Télécharger le CSV, chiffres ou rapports séparément lorsque ces fichiers font partie du transfert.

### Télécharger les artefacts de session {/* #download-session-artifacts */}

Choisissez **Download all artifacts**, sélectionnez les fichiers, choisissez **Télécharger les artefacts N** et choisissez un dossier de destination. Cette entrée enregistre des fichiers séparés. Les deux méthodes téléchargées et les fichiers de Markdown d'audit de réclamation ont été rouverts et correspondent à leur octet d'artefacts sauvegardés pour octet.

![Sélection des deux rapports enregistrés dans la session](/img/open-science/local-todo-batch/21-session-artifact-selection.webp)

### Télécharger un paquet de fichiers de projet {/* #download-a-project-file-bundle */}

Ouvrez le menu nom du projet en haut à gauche → **Download artifacts…**. Les fichiers sont regroupés sous **Generated** et **Uploads**. Tous sont initialement sélectionnés; Utilisez **Uncheck all**, choisissez les fichiers à remettre et enregistrez le ZIP.

![Sélection des rapports, du tableau QC et de l'entrée originale du compte du projet](/img/open-science/local-todo-batch/22-project-artifact-selection.webp)

Choisissez **Cancel** dans la boîte de dialogue de sauvegarde du système pour abandonner cette sauvegarde; votre sélection de fichiers reste disponible. Une fois l'écriture commencée, l'application désactive l'annulation et la fermeture. Attendez le résultat; annuler la boîte de dialogue de destination est différent d'arrêter une écriture en cours.

Si seulement certains fichiers sont téléchargés, restaurer l'accès aux fichiers sources non disponibles, puis sélectionner le transfert complet prévu et télécharger à nouveau. Enregistrer dans le même nom ZIP remplace l'archive précédente. Choisir uniquement les fichiers échoués crée un nouveau paquet contenant uniquement ces fichiers; il ne les ajoute pas à la ZIP précédente.

Ouvrez le ZIP téléchargé et comparez le nombre de fichiers, noms et contenus sous `generated/` et `uploads/` avec votre sélection avant de partager. Ce paquet n'est pas une sauvegarde du projet complet, de l'historique de conversation, du noyau Notebook ou de l'exécution.

## Archiver et restaurer une branche finie {/* #archive-and-restore-a-finished-branch */}

Choisissez **Archive** sur la branche prévue, puis ouvrez **Settings → Archived → Sessions**. Vérifiez l'heure du projet et de l'archive avant de sélectionner **Restore**. Confirmer que la branche retourne à la navigation active et que son contenu sauvegardé s'ouvre; la conversation originale est séparée.

Pour un projet archivé, utilisez son entrée **Manage** et inspectez les sessions du projet. Voir [Stockage et travaux archivés](storage.md) pour la différence entre l'archive, la restauration, la suppression et la relocalisation de stockage. La disparition d'une session de la liste active ne prouve pas que l'espace disque a été récupéré.

Sources: [éditeur de session](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/EditSessionDialog.tsx), [Mise en œuvre de l'espace de travail](https://github.com/aipoch/open-science/tree/v0.26.0/src/renderer/src/pages/workspace).

## Fourche une session existante {/* #fork-session */}

Utilisez **Fork** lorsque vous avez besoin d'une copie de travail indépendante d'une session locale ou importée. **Branch in new session** démarre à partir d'un message sélectionné; Fork copie l'historique de recherche sauvegardé de la session, y compris ses succursales, les enregistrements Notebook, les versions de fichiers, la littérature, les annotations et les signets privés. La session source reste inchangée. La copie d'un enregistrement ne le réexécute pas ou n'établit pas que son environnement est prêt sur cet ordinateur.

1. Dans l'application de bureau, terminer ou arrêter la tâche actuelle. Attendez que tout transfert de colis soit terminé.
2. Ouvrez les actions de la ligne de session et choisissez **Fork**. L'application montre les progrès de transfert; **Run in background** cache cette fenêtre sans l'annuler.
3. Attendez **Fork completed** et ouvrez la nouvelle session. Ouvrez son titre pour inspecter **Source session** et le nouveau numéro de session.
4. Ouvrez un fichier hérité et vérifiez son contenu. Inspecter le modèle sélectionné et le temps d'exécution avant de continuer; Les anciennes voies ou permissions de la machine peuvent nécessiter une attention particulière.
5. Envoyez la tâche suivante dans la copie et vérifiez sa nouvelle sortie. Gardez l'original comme document de référence.

![Fourche dans le menu Actions de session](/img/open-science/v0311/fork-menu.webp)

![Nouvelle information de session montrant sa source et son fichier QC hérité](/img/open-science/v0311/fork-info.webp)

La fourche est disponible dans l'application de bureau. Les sessions importées restent en lecture seule jusqu'à ce que vous travailliez dans leur fourche. Les paramètres et la mémoire du projet ne sont pas un projet séparé copié. les anciens dossiers d'examen ou de vérification décrivent leurs versions enregistrées; Inspecter tout statut obsolète avant de les traiter comme des vérifications actuelles.

### Continuer un calcul de QC dans la copie {/* #continue-a-qc-calculation-in-the-copy */}

<p className="example-label"><strong>Exemple pratique</strong> Fourche une session locale en v0.31.1</p>

Dans le projet GSE60450, fourchez la session QC existante et ouvrez la `gse60450-qc-summary.csv` héritée. Vérifiez les échantillons de **12** et les nombres bruts totaux de **269,027,617**. Dans la copie, demandez à l'agent de lire ce fichier avec Python, de vérifier les deux valeurs, de calculer les nombres moyens par échantillon et d'enregistrer un `fork-qc-check.csv` séparé. Le résultat est **22,418,968.083333…**. La source et les fichiers hérités ont le même contenu; le nouveau calcul est un fichier séparé. Cette moyenne démontre la poursuite, et non la normalisation de l'expression.

![Calcul Python et un nouveau résultat enregistré dans la session fourchue](/img/open-science/v0311/fork-result.webp)

<ExampleDownload path="/examples/v0311/fork-qc-check.csv">Télécharger le résultat calculé</ExampleDownload>. Pour continuer à partir d'un paquet `.science` reçu, suivez [Dossiers de recherche](research-packages.md).

## Lire la carte d'information de la session {/* #session-information */}

Sélectionnez le titre de la session pour voir son nombre, sa description, sa source, les heures de création/mise à jour, le nombre de messages pour la branche actuelle et le nombre d'objets. Utilisez **Pin** pour garder la session facile à trouver, ou **Modifier la session** pour changer son titre et sa description. Un diviseur **Suite du chat** se lie de nouveau au tour de la source enregistrée.
