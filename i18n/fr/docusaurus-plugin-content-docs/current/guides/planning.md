---
title: "Planification avant exécution"
last_update:
  date: '2026-09-20'
---

# Planification avant exécution {/* #planning-before-execution */}

Utilisez **Plan first** pour examiner les entrées, la méthode, les sorties et les critères d'acceptation avant exécution. L'approbation du plan et l'autorisation des outils sont des décisions distinctes. Les entrées de capture d'écran sont en [Exemple de données](../reference/example-data.md).

## Soumettre une demande de planification {/* #submit-a-planning-request */}

<p className="example-label"><strong>Exemple pratique</strong> Révision et révision d'un plan de CQ de compte brut</p>

1. Joindre le fichier d'entrée et décrire le but, les méthodes, les livrables et les limites dans le Compositeur.
2. Ouvrez **More send options → Plan first**. Une demande de texte est requise; un brouillon de pièce jointe ne permet pas cette option.
3. Attendez de planifier. Si une carte de permission **Plan control** apparaît, inspectez-la et autorisez la portée prévue ou refusez-la. Cela autorise l'enregistrement de la création ou de la décision du plan, et non l'exécution à venir.
4. Attendez **Plan ready for review**. Ne traitez pas un paragraphe normal disant que voici mon plan comme la preuve qu'une carte d'approbation structurée existe.

![Planifier d'abord dans le menu d'envoi](/img/open-science/guides-walkthrough/21-plan-first-entry.webp)

![Autorisation séparée de créer et d'enregistrer un plan](/img/open-science/guides-walkthrough/22-plan-permission.webp)

La tâche a spécifié des nombres bruts inchangés, des métadonnées distinctes ID/longueur, un QC par échantillon, trois sorties gérées et aucune revendication d'expression différentielle. Une demande initiale précise rend le plan plus facile à juger.

## Vérifier avant d'approuver {/* #inspect-before-approving */}

Sélectionnez **Open** pour afficher le plan structuré à côté de la conversation. Inspecter les phases, l'ordre des étapes, le propriétaire de l'exécution, les extrants souhaités et les notes de faisabilité. Utilisez **Enter full screen** pour lire un plan long et **Download Plan** pour le conserver. L'étiquette de confiance est l'évaluation du plan, et non la preuve que le code a déjà été exécuté.

![Plan structuré avec phases et extrants souhaités](/img/open-science/guides-walkthrough/23-plan-review.webp)

| Contrôle/état | Que faire |
| --- | --- |
| Ouvert | Lire le plan complet; ouverture n'est pas l'approbation. |
| Approuver | Autoriser le plan actuel à procéder. Les approbations spécifiques à l'outil peuvent encore apparaître. |
| Répondre au plan | Décrivez une correction actionnable aux critères d'entrée, de méthode, de sortie ou d'acceptation. |
| Envoyer des commentaires sur le plan | Soumettre les commentaires non vides et attendre le plan révisé. |
| Rejeter, lorsqu'il est indiqué sur l'aperçu de l'approbation | Rejeter ou rejeter ce plan en attente; il est distinct de la simple fermeture d'un aperçu. |
| Avertissement remplacé/nouveau-plan | Cet instantané est inexistant et ne peut approuver le plan actuel. Réouvrir la carte actuelle. |

## Demander des changements et examiner le remplacement {/* #request-changes-and-review-the-replacement */}

Dans **Respond to Plan**, indiquez exactement ce qui doit changer. Par exemple, demandez une vérification de l'intégrité des entrées, réouvrez chaque sortie et une cartographie entre les étiquettes raccourcies et les identifiants d'origine. Sélectionnez **Send Plan feedback**, attendez le remplacement, puis vérifiez que chaque modification demandée est présente.

![Commentaires reçus avant la soumission](/img/open-science/guides-walkthrough/24-plan-feedback.webp)

Lire le remplacement et utiliser son bouton **Approve**. L'ancien aperçu déjà ouvert peut rester visible avec un avertissement qu'il a été remplacé; ses étapes affichées ne sont pas les derniers progrès du plan actif. Réouvrir le plan actif plutôt que d'approuver une vieille capture d'écran.

## Suivre l'exécution et vérifier les résultats {/* #follow-execution-and-verify-results */}

Pour les suivis en file d'attente, utilisez [Contrôles de file d'attente des compositeurs](composer.md#manage-a-running-tasks-queue). Modifier la file d'attente n'approuve pas un plan.

Après approbation, la séance commence à exécuter le plan. En mode Ask, des cartes de permission d'outil distinctes peuvent encore apparaître. Inspectez la commande, la cible et la portée. Si une opération échoue, identifiez l'erreur réelle d'entrée, d'environnement ou d'accès avant de réessayer; l'approbation du plan ne résout pas ces exigences.

Les statuts de l'étape peuvent inclure non commencé, en cours, complété, bloqué, sauté et ne pas courir. Un plan achevé n'est pas une validation scientifique en soi. Ouvrir le CSV réel, chiffre et rapport; comparer leur contenu avec les critères d'acceptation. Dans cet exemple, les résumés de l'échantillon 12 correspondaient à un calcul indépendant à partir de la matrice originale.

Continuer avec [Fichiers et versions](./files.md), [Preuves de Notebook](./notebook.md) et [Autorisations](./approval-modes.md).

Source: [contrôle de l'approbation et de l'aperçu du plan](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/session-plan/SessionPlanSurfaces.tsx).

## Reprendre après la reconstruction du contexte {/* #resume-plan */}

À partir de v0.31.0, l'agent peut récupérer le plan de session actuel, sa révision et les approbations en attente après la reconstruction de son contexte. Rouvrir le plan actif et vérifier quelles étapes ont effectivement été accomplies avant de lui demander de continuer. Une approbation en attente est toujours en cours; le recouvrement du plan ne l'approuve pas ou ne confirme pas une opération dont le résultat n'a pas été enregistré.
