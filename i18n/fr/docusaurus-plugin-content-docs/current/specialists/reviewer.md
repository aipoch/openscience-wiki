---
title: "examinateur et auto-examen"
last_update:
  date: '2026-09-17'
---

# examinateur et auto-examen {/* #reviewer-and-auto-review */}

L'examinateur intégré vérifie une réponse dûment remplie par rapport à la demande et aux éléments de preuve dont il dispose. Il est séparé d'un Specialist personnalisé dont le nom contient -Reviewer,-- et séparé de l'approbation de permission.

Pour une comparaison des sorties basée sur l'exécution, utilisez [Reproductibilité](../guides/reproducibility.md). Une évaluation par l'examinateur et une production reproduite sont des documents distincts.

## Examen des séances par rapport à l'examen des artefacts {/* #session-review-versus-artifact-review */}

Un examen de conversation et l'onglet **Review** du panneau de provenance d'un artefact sont des enregistrements différents. Inspectez la version exacte de l'artefact que vous avez l'intention de partager. S'il est dit **No review for this version**, conservez cette étiquette même si une autre réponse a été revue. De même, la capture de l'environnement **partial** et les preuves de **limité** demeurent partielles et limitées après qu'un modèle exprime sa confiance.

Pour les erreurs d'entrée, joignez une entrée courante accessible ou résolvez sa version réelle par l'intermédiaire de l'application. L'existence d'un fichier local ne garantit pas que chaque noyau enfant/réviseur puisse le lire. Voir [Notebook](../guides/notebook.md), [Délégation](./delegate.md) et [Dépannage](../guides/troubleshooting.md).

Inspecter la version d'artefact sélectionnée lors de la réouverture d'une revue historique. Après avoir annulé un examen ou une correction, lisez l'état final et conservez les conclusions avant de décider s'il faut recommencer. L'annulation ne crée pas un examen réussi.

## Choisissez un résultat que vous pouvez vérifier {/* #choose-a-result-you-can-check */}

Pour un premier examen, remplissez le [Contrôle de table en ligne](delegate.md#verified-example-twelve-sample-invariants) : fournissez le tableau complet de l'échantillon-QC et demandez un résultat arithmétique par échantillon. Cela fournit un critère précis : douze identificateurs d'échantillons uniques, douze rangées et un nombre zéro plus des gènes détectés égal au total du gène pour chaque rangée.

Avant d'examiner, ouvrez le résultat de l'enfant et sa sortie Notebook vous-même. Ensuite, demandez l'examen de cette réponse. Comparer les vérifications de l'examen avec ces critères; si une ligne ou un résultat exécuté est manquant, résolvez cette constatation avant d'utiliser le résultat. Les résultats de l'examen dépendent de la réponse et des données disponibles; cet exercice ne promet pas un badge de recherche zéro.

## Demander un réexamen {/* #request-a-review */}

1. Terminez une conversation avec un modèle de travail.
2. Ouvrez le compositeur **+ menu → Request review**. Le menu se modifie en **Reviewing…** pendant que l'examen tourne.
3. Ouvrez la carte **Reviewer** résultante. Lisez le nombre de constatations et de vérifications, puis élargissez l'explication de chaque vérification.
4. Sélectionnez **Go to transcript** pour ouvrir **Session Reviewer**. Vérifiez le modèle, l'horodatage, les énoncés PASS/FAIL, les références de preuves et **Reviewer log**.
5. Si des corrections sont demandées, inspectez le suivi de Main Agent et toute demande de permission pour enfant. L'examen n'accorde pas automatiquement ces opérations.
6. Utilisez **Re-run review** après avoir abordé le problème identifié. Préserver les constatations non résolues si une entrée ou une opération requise n'est toujours pas disponible.

<p className="example-label"><strong>Exemple pratique</strong> Lire un examen avec des conclusions non résolues</p>

<details>
<summary>Voir les vérifications et les constatations non résolues</summary>

En utilisant l'authentification de l'abonnement Codex avec gpt-5.6-sol, l'examen manuel a renvoyé **quatre vérifications et une constatation** :

| Vérifier | Résultat effectif |
| --- | --- |
| Le Specialist a exécuté l'examen en ligne CSV | PASSÉ; l'examen a cité les résultats de la remise de l'enfant et de l'arithmétique. |
| Les résultats et les échecs personnalisés MCP ont été signalés avec précision | PASSÉ; métriques valides et l'erreur de connecteur correspond à la sortie d'exécution. |
| L'appel à la molécule a produit l'artefact/descripteurs indiqués | PASSÉ; la version de l'artefact retournée et les valeurs ont été identifiées. |
| Le modèle a inspecté l'aperçu des molécules sauvegardées comme demandé | FEUILLE; sa recherche de catalogue n'a pas lu le contenu de la structure. |

L'exemple se termine par **fixer la limite atteinte / Problèmes trouvés** car le modèle n'a pas pu accéder à l'entrée gérée nécessaire à la vérification de la structure. Ouvrir la recherche pour identifier les données manquantes et la fournir avant de demander un autre examen. L'ouverture manuelle de la structure dans le visionneur ne met pas à jour le dossier d'inspection du modèle.

</details>

## Contrôles d'examen automatique {/* #auto-review-controls */}

Ouvrez **Agent controls → Auto-review** pour configurer l'examen après les réponses futures. Il s'agit d'une préférence pour la conversation; il est distinct de **Ask for approval** et **Delegation**. La ligne d'examen intégrée dans Paramètres n'a pas de commandes ordinaires d'édition/delete/enable et est exclue du sélecteur Specialist normal.

| État ou contrôle de l'assurance-chômage | Signification |
| --- | --- |
| Demande d'examen non disponible | Vérifiez une réponse/réexamen active, une réponse complétée admissible manquante ou une configuration de modèle non disponible. |
| Révision… | L ' examen est toujours en cours; Ne le traitez pas comme complet. |
| examinateur · n constatations · n contrôles | Ouvre les chèques et leurs preuves. Un résultat de recherche zéro est toujours limité par ce qui a été vérifié. |
| Corrections demandées | Main Agent peut exécuter un cycle de correction de suivi. Inspecter les nouvelles opérations et leurs résultats. |
| Problèmes trouvés / fixer la limite atteinte | L'examen n'a pas permis de résoudre toutes les conclusions. Lisez la dernière explication avant de commencer une nouvelle tentative. |
| Aller à la transcription | Ouvre la page dédiée de l'examinateur de session. |
| Élargir / Réduire le journal des évaluateurs | Révèle ou cache son journal de fonctionnement; un journal tronqué n'est pas une preuve complète. |
| Relancer l'examen | Demande un nouvel examen; Ce n'est pas un bouton -accepter toutes les découvertes. |

<span id="what-the-local-review-checked" />

### Exécuter Auto-review avec un modèle séparé {/* #run-auto-review-with-a-separate-model */}

1. Sous **Settings → Model → Reviewer**, choisissez un modèle fixe disponible. La configuration exercée a utilisé `gpt-5.6-sol` pour Main et `gpt-5.6-luna` pour examinateur.
2. Ouvrez **Agent controls → Auto-review** dans la conversation cible, validez **On**, puis envoyez la prochaine requête.
3. Après la réponse, étendez la carte **Reviewer** créée automatiquement. Vérifiez son modèle, son critère, ses preuves et son résultat.
4. Lorsque **Corrections requested** apparaît, inspecter la correction de Main et l'examen subséquent avant de décider si la conclusion est résolue.

À partir de v0.30.2, Auto-review conserve son réglage quand une conversation commence, et les tours de correction liés conservent les commentaires d'examen nécessaires pour le cycle de correction. Activez-le avant d'envoyer, puis vérifiez la carte d'examinateur et la sortie révisée de Main. La préservation du contexte ne signifie pas qu'une constatation a été corrigée; lire l'examen subséquent et les conclusions restantes.

### Qu'est-ce que "resolved" {/* #what-resolved-establishes */}

Une vérification peut être résolue parce qu'une tentative a été faite et que l'échec de l'autorisation a été signalé avec exactitude. Cela ne permet pas d'établir que le fichier était lisible ou que ses calculs ont été passés. Lisez le critère, le résultat de l'outil et les résultats restants ensemble. Si l'accès reste bloqué, suivez le [problème connu de la main-fichier](delegate.md) avant de commencer un autre examen.


Référence de mise en œuvre: [SessionReviewerPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/SessionReviewerPanel.tsx), [CompositeurAgentContrôlesMenu.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerAgentControlsMenu.tsx).
