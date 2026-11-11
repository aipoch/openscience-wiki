---
title: "Projets et dossiers sources"
last_update:
  date: '2026-11-11'
---

# Projets et dossiers sources {/* #projects-and-source-folders */}

Un projet est le conteneur de travail pour une question de recherche : il regroupe des sessions, des fichiers sources et des résultats générés. Son **Agent Context** fournit des instructions durables à chaque session de ce projet. Commencer un projet distinct lorsque la question de recherche ou la source autorisée change.

<span id="example-prepare-a-systematic-review-reading-pack" />

Pour apporter un dossier de recherche existant dans ce projet, utilisez [Importer un paquet de session](research-packages.md). Les sessions importées sont en lecture seule; créer une session normale pour de nouveaux travaux.

## Créer un projet {/* #create-a-project */}

<p className="example-label"><strong>Exemple pratique</strong> Préparer un dossier de lecture à révision systématique</p>

Notre projet exemple est **PRISMA - Systematic review reading pack**. Il utilise des documents de référence publiés dans le but de conserver des documents bibliographiques vérifiables et un ordre de lecture. Il s'agit d'une tâche de collecte et non d'un examen systématique achevé.

1. À partir de la maison, sélectionnez **New project**. Dans un espace de travail existant, le menu nom de projet fournit la même entrée.
2. Entrez les champs ci-dessous. Conserver les règles bibliographiques et de preuve dans **Agent Context**, plutôt que dans la description seulement.
3. Sélectionnez **Create project**. Confirmez que la barre latérale gauche affiche le nom du projet et que le panneau principal ouvre **New conversation**.
4. Ouvrez le menu nom du projet et **Project settings** pour vérifier les valeurs enregistrées. Un projet réussi d'économie est séparé de l'état de préparation modèle.

![Projet PRISMA avec un objectif de recherche explicite et un contexte d'agent](/img/open-science/local-acceptance/prisma-project-form.webp)

| Champ ou bouton | Exemple ou action | Ce qui change |
| --- | --- | --- |
| **Name** | `PRISMA - Systematic review reading pack` | Nom d'affichage requis; jusqu'à des caractères 200. Les entrées vides ou dans l'espace blanc seulement ne peuvent pas être soumises. |
| **Description** | `Build a source-checked reading collection for researchers preparing a systematic review.` | Facultatif, jusqu'à 1,000 caractères. Apparaît dans la liste des projets; il n'est pas envoyé à titre d'instructions d'agent. |
| **Agent Context** | Utilisez les instructions ci-dessous. | Facultatif, jusqu'à 16,000 caractères. Inclus dans les sessions de nouveaux agents et les sessions de reprise et envoyé au fournisseur de modèles sélectionné. |
| **Create project** | Enregistrez le formulaire valide. | Crée le projet et ouvre son espace de travail. Une erreur de sauvegarde reste visible dans le formulaire. |
| **Cancel**, **Close** | Rompez le projet. | Aucun projet n'est créé. Le congédiement est désactivé pendant que la soumission est en cours. |
| **Save** dans les paramètres du projet | Enregistrer un projet édité. | Mettre à jour le projet existant; il ne fait pas double emploi avec ses sessions. |

```text
Use public primary sources. Preserve DOI, title, authors and publication year.
Distinguish bibliographic metadata from claims verified in full text.
Never invent references. Report inaccessible sources explicitly.
Write outputs in English.
```

## Donner un accès à un projet aux fichiers sources {/* #give-a-project-access-to-source-files */}

Créer un projet n'expose pas automatiquement les dossiers de votre ordinateur. Ouvrez **Files** et choisissez l'entrée du dossier local lorsque vous souhaitez travailler avec un répertoire existant. Le sélectionneur de dossiers sélectionne un emplacement; l'invite de permission subséquente détermine l'accès autorisé. Lire le chemin sélectionné et le mode d'accès avant de confirmer.

Utilisez l'accès en lecture seule lors de l'examen du matériel source. Enregistrez une copie de projet gérée si vous avez besoin de la source conservée avec le projet. Un prévisualisation de fichier local et un téléchargement géré ont différents cycles de vie : déplacer un fichier externe peut briser le chemin d'origine, tandis qu'une copie gérée reste dans le stockage d'applications.

Un changement d'accès peut déclencher une confirmation Notebook car les noyaux actifs peuvent conserver l'accès depuis leur configuration antérieure. Terminer ou arrêter le travail pertinent avant d'accepter un redémarrage du noyau. Choisir un dossier n'est pas une preuve que chaque fichier dans ce dossier a été lu par le modèle.

## Modifier ou poursuivre un projet {/* #change-or-continue-a-project */}

Utilisez le menu nom de projet pour changer de projet. Commencez une session avec **New** lorsque la prochaine enquête a besoin de sa propre transcription, tout en conservant le même contexte de projet. Utiliser **Project settings** pour réviser les instructions durables; vérifier la demande suivante par rapport aux règles révisées, car les résultats déjà produits ne sont pas mis à jour automatiquement.

**Download artifacts…** est une opération de sortie. Il peut être désactivé lorsque le projet n'a pas d'artefacts générés; Le téléchargement d'un fichier source seul ne crée pas de résultat généré. Archive terminé le travail lorsque vous voulez le supprimer de la navigation active tout en conservant la récupération par **Settings → Archived**.

## Confirmer le résultat et récupérer des problèmes {/* #confirm-the-result-and-recover-from-problems */}

| Observation | Interprétation et prochaine étape |
| --- | --- |
| Le nom du projet apparaît, mais l'envoi n'est pas disponible | La création de projets a réussi. Vérifier **Settings → Agent** et **Settings → Model** séparément. |
| Agent ignore les instructions écrites dans Description | Déplacer les instructions dans **Agent Context** et envoyer une nouvelle demande explicite. La description est des métadonnées organisationnelles. |
| Le dossier s'ouvre mais un écrit est refusé | L'autorisation en lecture seule permet l'inspection, et non la modification. Enregistrer un artefact dérivé ou examiner la portée d'écriture demandée. |
| Enregistrer reste désactivé | Supprimer les noms en blanc et vérifier la longueur des champs; Attendez si une autre sauvegarde est en cours. |
| Un projet différent est sélectionné | Vérifiez le titre du projet avant de joindre un document ou d'envoyer une demande. |

## Définir un modèle d'optimisation des questions {/* #optimization-template */}

Ouvrir le menu nom du projet → **Project settings → Advanced agent options → Optimization prompt**. Saisissez les instructions pour réécrire les questions dans ce projet, puis enregistrez. Laissez vide pour utiliser la valeur par défaut intégrée. Le même champ est disponible sous **New project → Advanced agent options**.

Ce champ ne s'exécute que lorsque vous sélectionnez **Optimize question**. Il est séparé de **Agent Context**, qui fournit des instructions aux séances d'agent du projet, **Description**, qui est pour votre référence.

<p className="example-label"><strong>Exemple</strong> Préserver les limites d'une question d'enseignement</p>

```text
Rewrite the question in clear English. Preserve the supplied numbers
and the hypothetical scope. Ask for a concise answer with limitations;
do not invent participants, measurements or citations.
```

![Demande d'optimisation personnalisée sous les options d'agent avancé du projet](/img/open-science/v121/optimization-template.webp)

Retour au Compositeur et [optimiser un projet](composer.md#optimize-question). Examiner le texte réécrit avant d'envoyer; un modèle est une instruction écrite, et non une règle de validation scientifique.
