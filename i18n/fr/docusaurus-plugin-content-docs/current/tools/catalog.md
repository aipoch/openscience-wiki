---
title: "Catalogue des outils scientifiques"
last_update:
  date: '2026-11-11'
---

# Catalogue des outils scientifiques {/* #scientific-tool-catalog */}

Utilisez ce catalogue pour trouver les exigences de point d'entrée et d'exécution Open-Science pour une méthode scientifique. C'est un index de documentation, pas une page d'application qui installe chaque programme listé.

## Familles de logiciels et où elles fonctionnent {/* #software-families-and-where-they-run */}

| Famille de logiciels | Entrée Open-Science | Configuration pour vérifier | Première vérification utile |
| --- | --- | --- | --- |
| Bibliothèque et tracé standard Python | Séance Notebook | interpréteur Python sélectionné; les dépendances de tracé | Lire le vrai QC CSV et produire une petite parcelle |
| R / base R | Séance Notebook; Paramètres → Durées d'exécution → R | Interprète activé géré par l'application ou détecté | Imprimer la version R et reproduire les résumés d'échantillons |
| Cadres de prévision des structures | Skill fourni, habituellement Calculer | Compatible GPU, paquets, poids, format d'entrée et accès MSA externe si utilisé | Une petite séquence/complexe valide et sa confiance de sortie |
| Programmes de conception de séquences MPNN | ProtéinesMPNN / LigandMPNN / SolubleMPNN Skills | Dépôt/points de contrôle et dépendances Python; les petits emplois CPU sont soutenus par ces instructions | Une colonne vertébrale avec des positions fixes/design explicites |
| Cadres à cellules uniques | scGPT / scvi-tools Skills | AnnData, étiquettes de cellules/genre, paquets et calcul approprié | Valider les dimensions d'entrée et les couches requises avant la formation |
| Traitement de la structure moléculaire | Molécule Connector / visionneur de molécules | Route OpenChemLib intégrée hors ligne | Enregistrer et rouvrir aspirine.mol |
| Types de fichiers | Aperçu du fichier | Extension supportée et limites de taille de prévisualisation | Ouvrir le fichier téléchargé |
| Logiciel à distance par lots | Calculer l'hôte et le calcul à distance Skills | Accès à l'hôte, planificateur et environnement nommé | Sonde d'hôte suivie d'un travail limité |

Voir [Répertoire Skill](../skills/directory.md) pour la table de méthode complète de 24-Skill. Cette page explique l'état de préparation du logiciel; il ne fait pas double emploi avec la procédure de chaque Skill.

## Inspecter l'environnement sélectionné {/* #inspect-the-selected-environment */}

Utilisez **Settings → Runtimes** pour inspecter les interprètes Python/R. Sélectionnez l'exécution effectivement liée à la session, puis inspectez les paquets là-bas. Un exécutable installé ailleurs sur l'ordinateur n'est pas automatiquement l'interpréteur actif Notebook.

Utilisez [Environnements d'exécution](../guides/runtimes.md) pour préparer un interprète et [Notebook](../guides/notebook.md) pour vérifier un calcul. Si des paquets supplémentaires sont nécessaires, vérifiez l'installation et l'importation dans cet environnement. Pour un échec de téléchargement, suivez [Réseau](../guides/network.md) en utilisant le nom d'hôte et l'erreur concernés.

## Avant de suivre la commande d'installation d'un modèle {/* #before-following-a-models-install-command */}

Lisez les exigences exactes du Skill installé et la route de configuration prise en charge de l'environnement sélectionné. Vérifier les collisions de nom de paquet : **Fair-esm** et l'implémentation de Biohub **l'emploi** sont distinctes même s'ils partagent l'espace de noms `esm`. Le code et les poids d'un modèle téléchargé peuvent également avoir différentes versions et conditions d'accès.

Pour un Notebook local, utilisez le flux de gestion des paquets pris en charge dans [Outils scientifiques](./scientific.md). Pour un hôte distant, utilisez [Calcul à distance](../guides/remote-compute.md). Un rendu affichant un PDB prouve qu'il peut voir une structure; il ne prouve pas qu'AlphaFold ou un autre programme de prédiction est installé.

Référence de mise en œuvre: [manifeste.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json), [COUVERTURE](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md), [portable-runtime.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts).

Utilisez [Tâches en arrière-plan](../guides/notebook.md#background-tasks-and-result-delivery) pour suivre les travaux de longue durée supportés et inspecter les résultats obtenus. Les paquets scientifiques doivent encore être disponibles dans l'exécution sélectionnée.
