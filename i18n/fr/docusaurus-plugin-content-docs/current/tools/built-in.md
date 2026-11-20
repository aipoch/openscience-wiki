---
title: "Outils de recherche intégrés"
last_update:
  date: '2026-11-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Outils de recherche intégrés {/* #built-in-research-tools */}

Les opérations intégrées relient la conversation aux fichiers de projet, à l'exécution de Notebook, aux enregistrements de littérature et aux résultats enregistrés. Ils sont exposés à travers le cadre de l'agent actif; l'interface peut regrouper plusieurs opérations sous une carte d'activité **Agent SDK** ou **Notebook**.

## Opérations par tâche de recherche {/* #operations-by-research-task */}

| Famille | Approvisionnement | Fonctionnement et résultat visible | Vérifiez avant de compter sur elle |
| --- | --- | --- | --- |
| Découverte et lecture de fichiers | Projet/session et contribution exacte | Liste les fichiers accessibles ou lit le contenu pris en charge | Nom complet, source et version actuelle; une ligne de catalogue n'est pas une inspection de contenu de fichier |
| Exécution Notebook | Code Python/R, temps d'exécution et références d'entrée valides | État de la cellule de code, de la sortie, du calendrier et de l'exécution | Langue/temps de fonctionnement réels, erreurs et vérifications complètes des données |
| Publication de l’artefact | Un chemin de sortie ou un contenu en ligne pris en charge | Carte de résultat en version dans la conversation/fichiers | Ouvrir la sortie, comparer les dimensions/contenu et conserver sa version |
| Recherche documentaire/importation | Demande, DOI/PMID ou fichiers de référence | Dossiers récupérés, candidats à la boîte de réception et entrées de la bibliothèque | Identification des sources, duplications, décision d'examen et accès au texte intégral |
| Opérations du plan | Étapes de la recherche et critères d'achèvement | Plan de séance avec les états d'étape | L'état correspond aux sorties effectivement produites |
| Mémoire | Un fait ou une instruction destiné à être réutilisé | Mémoire sauvegardée dans la zone configurée | Contenu et champ d'application, séparés du stockage de fichiers de projet |
| Chargement de Skill | Un identifiant de paquet disponible | Instructions relatives aux méthodes et ressources d ' appui | Le paquet prévu a été lu; chargement n'est pas un calcul |
| Délégation de Specialist | Rôle, tâche et entrées autorisées | Transcription de l'activité enfantine et des sous-agents | L'enfant a effectivement commencé, a effectué les vérifications demandées et a signalé des limitations |
| Article de synthèse | Configuration de réponse et d'examen admissibles | Vérifications, constatations et correction de l'examinateur | Quelles réponses/versions ont été examinées et quelles preuves étaient disponibles |

<span id="follow-one-calculation-from-request-to-file" />

## Suivre une opération jusqu'à son résultat {/* #follow-an-operation-through-to-its-result */}

1. Envoyer une demande avec l'entrée et la sortie souhaitée. Suivez [Premier projet](../guides/first-project.md) pour une petite tâche table-à-rapporter.
2. Élargir la carte d'activité et vérifier l'opération demandée, l'entrée et la portée de l'autorisation.
3. Après exécution, lisez le résultat de l'outil. Résoudre une erreur avant de s'en remettre à un résumé.
4. Ouvrez la carte de fichier générée et vérifiez son contenu. Pour un calcul, ouvrez Notebook pour inspecter le code de production et l'exécution.

Le [flux de travail de qualité des données](../workflows/data-quality.md) fournit un exemple scientifique complet. Les contrôles de l'environnement sont expliqués dans [Notebook](../guides/notebook.md) et [Environnements d'exécution](../guides/runtimes.md).

## Activité de l'outil de lecture {/* #read-tool-activity */}

| Élément d'assurance-chômage | Mode d’emploi |
| --- | --- |
| Groupe d'activité | Élargit les opérations regroupées dans cette course. |
| Outil / Agent SDK / Notebook exécuter | Ouvre les détails de l'opération lorsque disponible. Lire les entrées, la réponse et l'erreur plutôt que seulement l'étiquette du groupe. |
| Copier le code / la divulgation du code | Copie ou révèle le code soumis; il n'exécute pas une seconde fois. |
| Autoriser / Portée de l'autorisation / Refuser | Contrôle l'opération affichée et la portée choisie. Inspectez l'agent qui le demande. |
| Carte de fichier générée | Ouvre le résultat réel enregistré. |
| Ouvrir Notebook | Ouvre les enregistrements d'exécution de session et les variables. |
| puce de tâche enfant | Ouvre une véritable tâche déléguée; Inspecter son propre compte rendu. |

## Éviter toute confusion fréquente entre les entrées et les sorties {/* #avoid-common-inputoutput-confusion */}

Un fichier téléchargé, un fichier de travail Notebook et une version d'artefact sont liés mais distincts. Un fichier visible dans une liste ne peut pas encore être monté dans un noyau d'enfant. Utiliser la référence actuelle fournie par l'application; ne pas réparer une entrée non disponible en devinant un chemin ou en remplaçant un ID de version d'artefact par son nom de fichier.

Un fichier Connector créé peut n'avoir pas de bloc de producteur capturé Python. **Pas de bloc producteur**, **No review for this version**, environnement **partial** et preuves **limité** sont des états significatifs, pas des blancs à remplir avec la prose générée. Utilisez [Dépannage](../guides/troubleshooting.md) pour les erreurs exactes et les étapes de récupération.

Référence de mise en œuvre: [carnet.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook.ts), [artefacts.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/artifacts.ts), [Espace de travailMessageItem.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/WorkspaceMessageItem.tsx).

Pour les travaux à long terme soutenus, suivez [Tâches de base et réalisation des résultats](../guides/notebook.md#background-tasks-and-result-delivery). Inspecter les sorties réelles et enregistrées après la livraison. Environnement & Packages, Configuration de l'environnement de calcul et calcul à distance (SSH) restent activés, mais leurs exigences d'exécution, réseau et hôte s'appliquent toujours.

Pour les pages web publiques, utilisez [recherche sur le Web et lecture des sources](web-search.md) avec l'agent Open-Science intégré.
