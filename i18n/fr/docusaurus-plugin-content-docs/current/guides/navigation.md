---
title: "Navigation et recherche"
last_update:
  date: '2026-09-29'
---

# Navigation et recherche {/* #navigation-and-search */}

Utilisez Home pour choisir l'enquête, la liste de sessions pour choisir sa conversation, et prévisualise pour inspecter ses sources et ses résultats. Ce chapitre suit le vrai projet **GSE60450 - RNA-seq count quality**.

## Départ de la maison {/* #start-from-home */}

Utilisez **Settings → General → Appearance** pour modifier le langage ou le thème de l'application. Le [paramètres centre](../settings/overview.md) regroupe les panneaux par but et fournit sa propre recherche.

![Accueil avec les projets d'expression génétique et de littérature](/img/open-science/v0.27.0/01-home.webp)

| Entrée | Décision | Vérifier après ouverture |
| --- | --- | --- |
| Carte de projet | Ouvrir l'espace de travail de ce projet | Nom du projet au-dessus de la liste des sessions |
| Dernière session | Reprendre cette conversation directement | Titre de la session et projet de propriété; des titres similaires peuvent appartenir à différents projets |
| Nouveau projet | Entrez le nom, la description et le contexte de l'agent | Voir [Projets](projects.md) pour l'accès aux champs et aux dossiers |
| Rechercher | Recherche mondiale ouverte | Trouver des projets, des messages, des fichiers et de la littérature; La recherche Wiki est séparée |
| Bibliothèque | Ouvrir les références partagées | Les vues de projet et de collection sont des liens vers la même bibliothèque |
| Paramètres du modèle | Configurer l'accès au modèle | Un compte connecté et une recherche réussie sont des états séparés |
| Paramètres → Généralités → Apparence | Changer la langue / le thème | langage d'interface ne traduit pas le contenu de la tâche |
| Messages | Inspecter les messages d'application | Lire l'événement réel; un compteur non lu n'est pas un compte d'échec de tâche |

Dans un espace de travail, **All projects** retourne à la maison. Le menu nom de projet contient des actions de projet; le menu à côté d'une session affecte cette session. **New** sous Sessions commence une autre conversation dans le projet actuel. Il ne crée pas un autre projet ou ne copie pas ses dossiers sources.

## Gardez la conversation et les preuves visibles {/* #keep-the-conversation-and-evidence-visible */}

L'espace de travail dispose d'une barre latérale de session, d'une conversation et d'une zone d'aperçu optionnelle. **Files** ouvre la bibliothèque de fichiers; **Library** ouvre des références; **Open notebook** ouvre l'exécution enregistrée. Sélectionnez un onglet de prévisualisation pour modifier le fichier visible. Ouvrir un autre résultat peut ajouter un onglet alors que les onglets précédemment ouverts restent disponibles.

Faites glisser le diviseur **Resize left panel** ou **Resize right panel** pour allouer l'espace. Réduire la barre latérale ou le panneau de prévisualisation en lisant un large contenu; rouvrir en utilisant le contrôle de bord correspondant. Ce sont des changements de disposition. Ils n'annulent pas une tâche en cours d'exécution, suppriment un fichier ou suppriment son historique de version. La navigation en plein écran et les prévisualisations en plein écran sont des contrôles séparés; fermer la bonne surface pour revenir à la disposition précédente.

## Choisissez la bonne portée de recherche {/* #choose-the-right-search-scope */}

| Surface de recherche | Recherches | Exemple utile |
| --- | --- | --- |
| App recherche globale | Projets, sessions, texte de message, noms de fichiers téléchargés/générés et dossiers/collections de la bibliothèque; contenu indexé des téléchargements pris en charge | Une phrase d'une réponse, d'un nom de fichier ou d'un titre papier |
| Fichiers → Recherche de fichiers de projets | Noms dans le filtre projet/source de fichier choisi | `rnaseq` après avoir sélectionné tous les artefacts |
| Bibliothèque → Recherche de références | Champs bibliographiques, y compris le titre, les créateurs et les identifiants | A PRISMA DOI |
| Recherche de documents PDF | Texte consultable dans le PDF ouvert | Une phrase sur une page papier |
| Recherche dans cette documentation | Titres, titres et corps du Wiki | `Inbox`, `SHA-256` ou `remote access` |

La recherche globale trouve le texte du message, les noms de fichiers téléchargés et le contenu de téléchargement indexé. Les fichiers générés sont recherchés par nom; Le contenu non indexé n'est pas recherché. Cela n'implique pas l'indexation en texte intégral de chaque format PDF, image ou autre format binaire. Utilisez la propre recherche du document en regardant à l'intérieur d'un PDF.

## Trouver un message, un fichier ou un papier {/* #find-a-result-by-name */}

1. Appuyez sur **&#42;K** sur macOS ou **Ctrl+K** sur Windows/Linux, ou sélectionnez **Search**.
2. Saisissez une phrase, un titre ou un nom de fichier reconnaissables. les résultats des groupes **All** par catégorie; choisir une catégorie pour réduire la liste.
3. Ouvrez **Advanced filters** à côté des catégories. Utilisez **Search scope**, **Result order**, **Time range** et le filtre de type expéditeur, format de fichier ou bibliothèque spécifique aux résultats. Un filtre ne s'applique qu'au type de résultat pertinent.
4. Sélectionnez un résultat pour ouvrir son volet de détail. Vérifiez le projet/session de propriété, le texte ou la version de fichier correspondant avant de naviguer.
5. Ouvrez le message ou le fichier correspondant depuis le volet de détail. Pour un fichier, utilisez son action source-message lorsque vous avez besoin de la conversation qui l'a produite ou jointe. Les résultats de la bibliothèque ouvrent la référence ou la collection correspondante.
6. Charger plus dans une catégorie de résultats au besoin. Fermez le volet de détail pour continuer la recherche, ou appuyez sur **Essence** pour quitter la recherche.

Le volet de détail est mis à jour lorsque vous sélectionnez un autre résultat. Une liste initiale courte n'est pas le nombre complet de correspondances; utiliser le groupe de chargement-plus de contrôle ou continuer à défiler dans une catégorie sélectionnée. En l'absence de questions, les sessions récentes, les fichiers et la littérature vous aident à revenir au travail récent.

Le nombre à côté de **Advanced filters** montre des conditions actives. Collapsing la colonne filtre conserve ces conditions appliquées pendant que vous inspectez les résultats. La réouverture de la recherche renvoie la catégorie à **All** et effondre la colonne; Vérifiez le nombre de filtres et les contrôles avant de supposer que vous recherchez tout.

## Quand un résultat semble manquant {/* #when-a-result-seems-missing */}

Effacer la catégorie et les autres filtres, vérifier le projet propriétaire et rechercher une phrase distinctive ou le nom de fichier enregistré. Utiliser Archivé lorsque vous recherchez des travaux archivés. Un chemin imprimé dans une réponse d'outil échouée n'est pas un artefact sauvegardé. Les contenus nouvellement modifiés ou réordonnés peuvent nécessiter un rafraîchissement de la recherche. Si un fichier s'ouvre mais ne peut pas être prévisualisé, suivez [Fichiers](files.md) et [Dépannage](troubleshooting.md).

## Couper les sessions à partir du plateau {/* #tray-navigation */}

Ouvrez le menu de l'icône **Open-Science** dans la barre de menu macOS, le plateau Windows ou un bureau Linux avec support de plateau. Utilisez **Running sessions** pour trouver du travail actif, **Pinned sessions** pour les conversations épinglées, ou **Recent items** pour le contenu récent. Les listes plus longues continuent sous **Autres éléments**. Après avoir choisi une entrée, vérifiez le titre du projet et de la conversation qui s'ouvre.

Utilisez **Pin** à côté d'un titre de conversation pour le garder à portée de main. **Afficher / masquer** modifie la visibilité de la fenêtre; **Quit** sort de l'application. Changer de conversation n'arrête pas une tâche. La disponibilité de l'icône Linux dépend du support du plateau du bureau. Voir [apparence et notifications](appearance.md) pour le comportement et les alertes de fermeture de fenêtre.
