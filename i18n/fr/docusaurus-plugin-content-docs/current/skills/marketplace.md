---
title: "Catalogue de Skills"
description: "Découvrez, installez, mettez à jour et gérez les méthodes de recherche du marché Skill."
last_update:
  date: '2026-11-11'
---

# Catalogue de Skills {/* #skill-marketplace */}

Ouvrir **Resource center → Skills → Marketplace** de la maison ou de la barre latérale du projet. Rechercher une méthode de recherche, inspecter les détails du paquet et l'installer le cas échéant. L'espace de travail Web prend également en charge l'installation du marché; des paquets sont installés sur l'hôte Open-Science connecté.

Utilisation **Installed** de revenir aux méthodes locales. Pour importer un dossier ZIP, installé ou un dépôt GitHub, suivez [Importation et gestion des compétences](manage.md). Voir [Utilisation des compétences](overview.md) pour sélectionner une méthode dans une conversation.

![Le centre de ressources avec les onglets Installé et Marketplace](/img/open-science/v121/resource-center.webp)

## Trouver une méthode appropriée

1. Ouvrir **Marketplace**, saisissez un nom ou un mot-clé dans **Search skills**, et utilisation **Filters** pour restreindre le catalogue. Réinitialiser les filtres ou effacer la requête pour l'élargir à nouveau.
2. Sélectionner **View details**. Lire le but, éditeur, auteur, version, licence et **Sources and verification**. Ouvrir **Assessment report** le cas échéant.
3. Comparer les entrées, les outils requis et les dépendances d'exécution avec votre projet avant de sélectionner **Install**. Attendez **Installed** ou une étiquette de version installée, puis vérifier la disponibilité.

Une signature de distribution identifie la source du paquet; une cote d'évaluation en amont ne prouve pas que la méthode est correcte pour votre question de recherche. Installer une compétence n'exécute pas son workflow ni n'installe aucune dépendance scientifique.

![Une compétence installée sur le marché Web avec sa version et les détails de sa source](/img/open-science/v121/marketplace-installed.webp)

## Installer et utiliser un Skill {/* #install-and-use-a-skill */}

1. Sélectionnez **Install** sur la carte choisie et attendez **Installed**.
2. Ouvrez le Skill installé et confirmez sa disponibilité pour Main ou le Specialist prévu.
3. Préparer une entrée qui répond aux exigences de Skill=S, puis l'utiliser sur une tâche délimitée.
4. Ouvrez les fichiers générés et vérifiez le résultat de votre demande. L'installation à elle seule n'établit pas qu'une recherche a réussi.

Pour sélectionner un Skill dans une conversation, voir [Utilisation de Skills](overview.md). Configurer une méthode Specialist=S par [Skills et connecteurs](../specialists/capabilities.md).

## Installer ou mettre à jour plusieurs Skills {/* #install-or-update-several-skills */}

1. Choisissez **More actions → Batch manage**, puis **Not installed** ou **Updates**.
2. Filtrer le catalogue et sélectionner les entrées prévues. **Sélectionner tous les résultats filtrés** sélectionne le résultat complet du filtre.
3. Ouvrez **Review selection** et vérifiez la liste avant de choisir **Install selected** ou **Update selected**.
4. Attendez que les opérations se terminent et inspectent chaque résultat. L'installation se déroule de façon séquentielle; stopping permet à l'élément actuel de terminer.
5. L'examen a échoué ou a arrêté les entrées et n'essaye que ce qui est nécessaire.

## Mettre à jour ou supprimer une méthode {/* #update-or-remove-a-method */}

Lorsqu'une mise à jour est disponible, ouvrez **Examiner la mise à jour de la compétence** avant de confirmer. Vérifiez les anciennes et les nouvelles versions, les spécialistes touchés, et les fichiers à ajouter, modifier ou supprimer. Le diff indique les numéros de ligne, les suppressions rouges et les ajouts verts. Pour les comparaisons binaires, surdimensionnées ou illisibles, utilisez les modifications de fichiers énumérées; un diff non disponible ne signifie pas que les fichiers sont inchangés.

Si la boîte de dialogue signale des modifications locales, la mise à jour les remplace. [Exporter une copie](manage.md) d'abord si vous devez les garder. Choisir **Mettre à jour la compétence existante** seulement après examen; cela préserve l'identité Skill et ses relations Specialist. Pour **Conflit local**, ouvrez **Voir la compétence installée** et suivez l'action d'examen lorsqu'elle est offerte. S'il reste bloqué, conservez le message au lieu de supprimer la méthode locale pour forcer l'installation.

Utilisez les actions de détail Skill=S installées pour modifier la disponibilité ou la désinstaller. Après une modification, confirmez que la méthode prévue est disponible pour Main ou Specialist qui l'utilisera; un paquet téléchargé et une méthode disponible sont des états séparés.

## Si l'installation ou l'utilisation échoue {/* #if-installation-or-use-fails */}

Pour une erreur de vérification de catalogue ou de paquet, conservez le message et réessayez à travers l'entrée normale du marché. Ne remplacez pas le paquet par un téléchargement non vérifié. La navigation sur le marché utilise le service de distribution officiel et ne nécessite pas de connexion GitHub.

Si l'installation se termine mais qu'une tâche ne peut pas être exécutée, inspectez la dépendance manquante ou l'outil nommé dans l'erreur. Suivez [configuration de l'exécution](../guides/runtimes.md) pour les dépendances logicielles ou [Configuration de Connector](../guides/connectors.md) pour les services requis, puis réessayez la tâche avec l'entrée prévue et vérifiez le résultat enregistré.

## Soumettre votre propre Skill sur le marché {/* #submit-a-skill */}

Les soumissions sur le marché utilisent un dépôt source GitHub et un examen de maintenance. **Upload skills** importe une méthode dans votre application locale; **Publish** dans l'éditeur personnel Skill enregistre un Skill local. Ni l'une ni l'autre ne l'énumère sur le marché public.

### Préparer le Skill {/* #prepare-the-skill */}

1. [Créer et tester le Skill](create.md), y compris les scripts, références et autres fichiers dont il a besoin.
2. Téléchargez ces fichiers dans un sous-répertoire de votre dépôt GitHub, comme `skills/your-skill-name/`, avec `SKILL.md` à l'intérieur. Conservez les avis de licence requis avec la source.
3. Commit le contenu complet et copie que commit est complet SHA. La soumission doit identifier une révision fixe, et non une succursale en mouvement.

`SKILL.md` a besoin de `name`, `description` et d'une déclaration de licence à `license` ou `metadata.license`. La déclaration et les avis inclus doivent décrire le contenu réel que vous soumettez.

### Préparer le dossier de présentation {/* #prepare-the-submission-file */}

Commencez par le [release.config.json template](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/example/release.config.json) officiel. Remplacez ses placeholders par vos informations Skill-S :

| Champ | Que fournir |
| --- | --- |
| `id` | Le nom en minuscules, hyphené utilisé dans `SKILL.md`. |
| `version` | Une version de paquet comme `1.0.0`. |
| `category` | L'une des `Academic Writing`, `Data Analysis`, `Evidence Insight`, `Protocol Design` ou `Other`. |
| `source.repository`, `source.commit`, `source.path` | Votre URL HTTPS GitHub, le répertoire complet de caractères 40 commit SHA et Skill. |
| `license_files` | Chemins de dépôt-relatifs aux fichiers de licence applicables à ce commit. |

Le modèle de commit all-zero est un détenteur de place et ne peut pas être publié. Vérifiez le [présentation](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/release.config.schema.json) actuel avant de soumettre.

### Demander l'inclusion et vérifier le résultat publié {/* #request-inclusion-and-check-the-published-result */}

Suivez le référentiel de marché -[les instructions de contribution;](https://github.com/aipoch/openscience-skill-marketplace/blob/main/CONTRIBUTING.md) pour préparer une requête de tirage. Si vous n'avez pas d'accès écrit, utilisez une fourchette. Fournir le dossier de présentation, l'emplacement de la source, le but et le résultat de votre test local; la charge utile reste dans votre dépôt source. Les responsables peuvent suivre la configuration examinée sous `authoring/submissions/<id>/release.config.json`; confirmer son placement au cours de l'examen.

Les responsables examinent et enregistrent les présentations admissibles avant leur publication. Un fichier soumis ou une requête de tirage fusionné ne rend pas le Skill disponible dans l'application elle-même. Le [guide de rédaction](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/README.md) décrit les étapes de l'examen et de la publication.

Après publication, retournez à **Marketplace → Refresh**, recherchez le Skill, vérifiez sa source et sa version, et installez-la. Lors de la mise à jour d'un Skill publié, soumettre une nouvelle version de paquet avec le nouveau commit source; ne supposez pas automatiquement les modifications apportées à la mise à jour du dépôt en amont des copies installées.
