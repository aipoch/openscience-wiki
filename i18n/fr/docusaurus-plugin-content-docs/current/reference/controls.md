---
title: "Commandes et référence du clavier"
last_update:
  date: '2026-09-24'
---

# Commandes et référence du clavier {/* #controls-and-keyboard-reference */}

Utilisez cet index pour trouver l'explication canonique d'un contrôle. Il maintient les limites de champ et les raccourcis ensemble sans répéter la totalité de la tâche passant. Les étiquettes se réfèrent à l'interface anglaise.

## Contrôles par tâche {/* #controls-by-task */}

| Tu dois le faire. | Entrée ou contrôle | Comportement détaillé |
| --- | --- | --- |
| Créer ou décrire un projet | **New project**, menu du projet → **Project settings** | [Champs du projet](../guides/projects.md) |
| Gardez une note de lecture privée | Sélection → **For me → Bookmark**Compositeur **Bookmarks** | [Lecture des signets](../guides/bookmarks.md) |
| Configurer une connexion de modèle | **Settings → Model** | [Configuration du fournisseur](../guides/providers.md) |
| Joindre une source, envoyer ou file d'attente une demande | Compositeur **+**, puce de fixation, **Send**, contrôles de file d'attente | [Conversations et demandes en attente](../guides/composer.md) |
| Inspecter un paquet d'exécution ou installé | **Settings → Runtimes**, l'interprète et les commandes de paquets | [Durées d'exécution Python et R](../guides/runtimes.md) |
| Vérifier les calculs et les variables | **View notebook**, **Variables**, artefact **Provenance** | [Notebook et preuves d'exécution](../guides/notebook.md) |
| Accorder ou révoquer l'accès | Carte d'agrément, **Settings → Permissions** | [Autorisations et agréments](../guides/approval-modes.md) |
| Diagnostiquer une connexion de paquet | **Settings → Network** | [Domaines, proxy et miroirs](../guides/network.md) |
| Configurer le calcul à distance | **Settings → Compute → Add SSH host** | [Configuration de SSH et Slurm](../guides/remote-compute.md) |
| Vérifier un résultat de recherche | Carte de fichier générée, prévisualisation, **Provenance** | [Analyse des données publiques](../workflows/data-quality.md) |
| Rechercher les limites | Format ou champ de configuration | [Limites de fichiers](formats.md), [Configuration](configuration.md), [Formats de paquets](packages.md) |

Le [indice de contrôle complet](control-index.md) liste les contrôles par page d'application; cette page regroupe des tâches communes et des raccourcis clavier. Les deux liens vers les mêmes tutoriels détaillés.

## Référence du clavier {/* #keyboard-reference */}

| Décision | macOS | Windows/Linux | Conditions et champ d'application |
| --- | --- | --- | --- |
| Recherche d'application | `⌘K` | `Ctrl+K` | la recherche d'espace de travail/maison; dans Paramètres, concentrez sa recherche en-tête |
| Paramètres | `⌘,` | `Ctrl+,` | Ouvre les paramètres lorsque la superposition courante permet le raccourci |
| Nouvelle conversation | `⌘N` | `Ctrl+N` | Espace de travail; exige une conversation existante avec les messages; ignoré pendant qu'une boîte de dialogue de blocage est ouverte |
| Basculer la barre latérale | `⌘B` | `Ctrl+B` | Espace de travail; Assemble le tiroir à écran étroit ou la barre latérale de bureau |
| Envoyer le texte du compositeur | `Enter` | `Enter` | Lorsque l'envoi est disponible; une mention ouverte est propriétaire d'Enter; La composition de l'IME ne présente pas |
| Nouvelle ligne | `Shift+Enter` | `Shift+Enter` | Texte du compositeur |
| Avant-projet/suivant | `↑` / `↓` | `↑` / `↓` | Commencer la navigation historique avec le caractere au début et pas de sélection; un sélectionneur de mention ouverte a priorité |
| Annuler le projet | `⌘Z` | `Ctrl+Z` | Historique du projet de compositeur |
| Rétablir le projet | `⌘Shift+Z` | `Ctrl+Shift+Z` | Historique du projet de compositeur |
| Fermer la surface active | `⌘W` | `Ctrl+W` | Application Bureau : prévisualisation transitoire d'abord, le cas échéant, puis onglet/panneau de prévisualisation, puis fenêtre; accès au navigateur peut utiliser des raccourcis du navigateur |
| Rejet de la superposition | `Esc` | `Esc` | Lorsqu'ils sont soutenus; Enregistrer ou une confirmation de blocage peut changer le comportement de licenciement |

N'appuyez pas à plusieurs reprises sur le raccourci fermé en s'attendant à ce qu'il cache seulement un fichier. Après la fermeture des prévisualisations, la prochaine invocation peut fermer la fenêtre de l'application. La fermeture de la fenêtre et l'arrêt du processus sont des comportements indépendants de la plate-forme.

La fermeture d'un onglet Side Chat nécessite une confirmation et stoppe/supprime cette discussion latérale; la fermeture de la prévisualisation du fichier ne supprime pas le fichier. Voir [Side Chat](../guides/delegation.md).

## Déclencheurs de référence pour compositeurs {/* #composer-reference-triggers */}

| Déclencheur | Sélection | Vérifier avant d'envoyer |
| --- | --- | --- |
| `/` | Activé Skill | Confirmer la méthode prévue et les dépendances de soutien |
| `@` | Dossier/artéfacts disponibles ou référence/scope bibliographique | Confirmer la source et la version sélectionnées lorsqu'elles apparaissent |
| `#` | Référence de la session | Confirmer la conversation prévue |

Choisir une suggestion insère une référence structurée. Le simple fait de taper un nom de fichier familier ou un nom Skill n'est pas une preuve que la référence correspondante a été jointe. Inspectez la puce insérée et demandez.

## Périmètre de recherche {/* #search-scope */}

La recherche globale de l'application couvre les projets, les sessions, le texte des messages, les fichiers téléchargés/générés, les dossiers et les collections de la bibliothèque et le contenu indexé des téléchargements pris en charge. Les fichiers générés sont recherchés par nom; Le contenu non indexé n'est pas recherché. Sélectionnez une catégorie pour réduire les résultats, puis inspectez le contexte d'un résultat avant de l'ouvrir. Cela ne signifie pas que chaque fichier PDF, image ou autre fichier binaire possède un index plein texte consultable. Voir [Navigation et recherche](../guides/navigation.md) pour le workflow complet.

La recherche du wiki est séparée : elle indexe les titres de documentation, les titres et les passages du corps dans la langue courante. Un terme tel que "Inbox" peut correspondre à un paragraphe ici même s'il est absent du titre de session d'une application.

Référence technique: [les liens entre les demandes et les demandes](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [manipulation du clavier du compositeur](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [comportement proche](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [recherche mondiale](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx).

Le panneau de paramètres/la recherche de dialogue utilise **K** sur macOS et **Ctrl+Alt+K** sur Windows/Linux. **Ctrl+K** continue de focaliser la recherche d'en-tête de paramètres. Voir [portée du raccourci](../guides/shortcuts.md#local-settings-search).
