---
title: "Capacités et intrants pris en charge"
last_update:
  date: '2026-09-14'
---

# Capacités et intrants pris en charge {/* #capabilities-and-supported-inputs */}

Open-Science apporte les conversations d'un projet de recherche, les fichiers sources, les documents documentaires et les résultats générés dans un espace de travail local. Un modèle configuré dirige le travail; Notebook des temps d'exécution, outils et services connectés effectuent les opérations qui en ont besoin. Choisissez un point de départ à partir du matériel que vous avez déjà.

## Commencez par votre entrée {/* #start-with-your-input */}

| Vous avez | Première action | Résultat à demander | Vérifier avant de l'utiliser |
| --- | --- | --- | --- |
| Une question de recherche et plusieurs DOI | Créer un projet; rechercher les identifiants et examiner les candidats de la boîte de réception de la bibliothèque | Une collection de lecture contrôlée par les sources | Titres, listes d'auteurs, années et identifiants contre l'éditeur |
| Un dossier de papiers ou de références exportées | Utiliser les contrôles d'importation et de collecte de la bibliothèque de littérature | Une collection organisée avec des PDF en annexe | Importer les avertissements, les duplicatas et les pièces jointes |
| A CSV ou TSV | Joindre-le à une session et demander une analyse Notebook | Vérification des données, tableau des résultats et chiffres | Valeurs manquantes, unités, dénominateurs et fichiers enregistrés |
| Un PDF ou un manuscrit | Joindre le document ou l'ouvrir dans les fichiers | Un plan d'explication ou de révision spécifique au passage | Indique si l'agent a lu le texte intégral et si les pages citées appuient ses revendications |
| Une séquence ou une structure moléculaire | Ouvrir un fichier FASTA, PDB ou molécule supporté | Un aperçu, un rapport de validation ou une analyse à l'aide d'un outil approprié | Conventions d'entrée, exigences en matière de méthodes et disponibilité des outils |
| Une procédure que vous réutilisez | Créer ou importer un Skill | Instructions réutilisables et fichiers support | Statut activé, dépendances requises et essai sur une entrée connue |
| Un rôle de recherche défini | Créer un Specialist et assigner ses capacités | Un rôle avec des instructions explicites et un accès | Skills sélectionné, connecteurs et le résultat du travail délégué |

Pour les figures et les tableaux dans un papier, utilisez [extraction locale PDF](previews.md#pdf-extraction). Trouvez des méthodes réutilisables via le [Catalogue de Skills](../skills/marketplace.md). Vérifiez un résultat capturé avec [Reproductibilité](reproducibility.md), ou partagez sa conversation et ses preuves via un [Paquet .science](research-packages.md).

Un visionneur qui ouvre un fichier ne montre pas que le modèle l'a lu. L'annexion d'un fichier donne à la session une source avec laquelle travailler; inspecter les lectures enregistrées, les appels d'outils et les preuves de sortie pour établir comment l'agent l'a utilisé. Les extensions exactes et les limites de taille sont en [Formats et limites des fichiers](../reference/formats.md).

## Comprendre les objets de l'espace de travail {/* #understand-the-workspace-objects */}

| Objet | Ce que vous gardez là | Relation avec d'autres objets |
| --- | --- | --- |
| **Project** | Objet de la recherche, agent durable Contexte, séances et dossiers de projet | Utilisez-le pour garder une enquête ensemble |
| **Session** | Demandes, réponses, activités d'outils et directions de la conversation | Chaque session appartient à un projet |
| **Upload** | Une copie gérée du matériel source | Gardez-le séparé des résultats dérivés |
| **Artéfact** | Un rapport, figure, tableau ou autre fichier généré | Les versions conservent les preuves associées à leur production |
| **Référence bibliographique** | métadonnées bibliographiques, identifiants et pièces jointes | Organisez-le en collections et associez-le à des projets |
| **Notebook** | Exécution Python ou R et ses sorties | Inspecter les calculs de la session et les variables en direct |
| **Skill** | Instructions et fichiers de support pour une méthode | Activez-le et sélectionnez-le à partir du compositeur le cas échéant. |
| **Specialist** | Un rôle, des instructions et des capacités choisies | Configurer et l'invoquer pour un travail qui correspond à ce rôle |
| **Connector** | Accès aux outils externes ou aux services de données | La disponibilité dépend de la configuration, des qualifications et de la politique |

Le projet **Description** vous aide à identifier le projet. Mettre les instructions que l'agent doit suivre dans **Agent Context**. Ce dernier est inclus dans le contexte du modèle; Ce n'est pas un endroit où stocker des références.

## Préparez seulement les dépendances dont votre tâche a besoin {/* #prepare-only-the-dependencies-your-task-needs */}

Une conversation a besoin d'un cadre d'agent de travail et d'une connexion modèle. Un calcul Python nécessite également un temps d'exécution Python Notebook activé. Une recherche de service nécessite le Connector approprié, l'accès au réseau et tout justificatif requis. Une méthode GPU peut nécessiter une machine séparée, un environnement logiciel et des poids de modèle, même si sa Skill est déjà répertoriée.

Configurez le modèle, l'exécution et les services de données séparément. Après avoir connecté le modèle, vérifiez les paquets requis pour le calcul. Si un paquet manque, installez-le ou choisissez explicitement une méthode qui utilise l'environnement disponible.

Voir [Configuration du fournisseur](providers.md), [Durées d'exécution Python et R](runtimes.md) et [Réseau](network.md) pour ces chemins de configuration indépendants. Un test réussi de connexion de modèle ne valide pas tous les services en aval.

## Décider si un résultat est prêt {/* #decide-whether-a-result-is-ready */}

Ouvrez la sortie sauvegardée et comparez-la à la requête. Pour un tableau, vérifiez le nombre de lignes, les unités et le traitement des données manquantes. Pour une bibliographie, vérifier les identifiants et remplir les auteurs. Pour les résultats générés par le code, inspectez **Provenance** et Notebook. Examiner les étiquettes comme la capture partielle de l'environnement ou les preuves non disponibles avant d'appeler un résultat reproductible.

Les exemples officiels utilisent des données de recherche publique :

- [Collection de lecture PRISMA](../workflows/core-reading-list.md): trois articles réels, a examiné les dossiers de la Bibliothèque et un éditeur joint PDF.
- [Analyse GSE60450 RNA-seq](../workflows/data-quality.md) : rangées de gènes 27,179, échantillons 12, mesures QC vérifiées indépendamment, un chiffre de nombre brut et le code producteur capturé.

[Calcul à distance](remote-compute.md) couvre RNA-seq QC par Direct SSH, recueillant les résultats, récupération et annulation. Il explique également les exigences de comptabilisation de Slurm et un petit flux de travail de conception de séquence de ProteinMPNN sur un A100 GPU dans un environnement CUDA isolé.

## Stockage local et traitement externe {/* #local-storage-and-external-processing */}

L'application stocke son espace de travail localement. Lorsque vous envoyez une demande à un modèle hébergé, les instructions et le contenu pertinents vont à ce fournisseur. Les connecteurs et les tâches distantes peuvent envoyer des données à leurs services configurés. Utiliser l'activité de fournisseur et d'outil sélectionnée pour identifier l'endroit où une tâche est exécutée; le stockage local à lui seul ne signifie pas un traitement hors ligne.

**Examen des sources :** [documentation du produit](https://github.com/aipoch/open-science/blob/v0.26.0/README.md), [Domaines de projet](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/projects.ts) et [prévisualiser le routage](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts). Les deux études de cas liées portent leurs enregistrements d'exploitation et des captures d'écran en anglais.
