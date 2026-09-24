---
sidebar_position: 1
title: "Index de la page et du contrôle"
description: "Trouvez chaque bouton Open-Science documenté, entrée, commutateur et résultat par page."
last_update:
  date: '2026-09-24'
---

# Index de la page et du contrôle {/* #page-and-control-index */}

Cette page condense les points d'entrée de l'application dans une liste consultable page par page. Les contrôles dépendant de l'État n'apparaissent que lorsque leurs conditions sont remplies. Si un contrôle est désactivé, lisez son infobulle et les problèmes connus pertinents; Les causes possibles incluent l'état de session, les conditions préalables manquantes et un défaut de produit.


<span id="current-verification-coverage" />

## Trouvez les instructions détaillées {/* #find-the-detailed-instructions */}

Utilisez cet index pour localiser un contrôle. Suivez le tutoriel lié pour les prérequis, les étapes, les résultats attendus et les problèmes connus. Voir [Aperçu des paramètres](../settings/overview.md) pour les panneaux de paramètres, [raccourcis de tâche](controls.md) pour les actions communes et [Dépannage](../guides/troubleshooting.md) pour les erreurs.

## à bord {/* #onboarding */}

| Page, dans l'ordre de l'assistant | Contrôles | Résultat ou condition préalable |
| --- | --- | --- |
| Environnement | Vérifiez encore, Continuez, vérifiez les lignes | Revérifier les besoins de l'hôte; continuer après le passage |
| Emplacement des données | Parcourir..., Utiliser l'emplacement par défaut à la place, Retour, Continuer | Choisissez l'emplacement des données; un choix personnalisé nécessite de conserver la confirmation par défaut ou de redémarrer |
| Environnement d'exécution de l'agent | Carte-cadre, Installer, Redétecter, Arrière, Continuer | Installer ou sélectionner un temps d'exécution actif prêt |
| Fournisseur de modèles | Type de fournisseur, choix d'authentification, champs conditionnels, Test & continue | Valider les entrées requises et tester le fournisseur avant d'avancer |
| Environnement d'exécution Notebook | Contrôles d'interprète, configuration de l'environnement, Packages, Dos, Finition | Configuration optionnelle; terminer ou annuler une opération environnementale déjà en cours avant de quitter |

Voir [Configuration pour la première fois](../guides/onboarding.md) et [Configuration du fournisseur](../guides/providers.md) pour les détails.

## Accueil et projets {/* #home-and-projects */}

| Page | Contrôles | Résultat |
| --- | --- | --- |
| En-tête d'accueil | GitHub, Recherche, Bibliothèque, Thème, Messages, Paramètres du modèle | Ouvrez le dépôt, la recherche globale, la bibliothèque de littérature, le menu d'apparence, les notifications ou les paramètres du modèle |
| Corps intérieur | Nouveau projet, carte de projet, session récente | Créer ou ouvrir un projet ou une session |
| Menu thématique | Système, lumière, sombre | Définir l'apparence et le maintenir en synchro avec General |
| Rechercher | Entrée de recherche, catégorie, Filtres avancés, détail des résultats, Esc | [Trouver des messages, des fichiers et des références](../guides/navigation.md) avec le champ d'application prévu |
| Messages | Point de notification, lire l'action, Fermer | Ouvrir la source et gérer les éléments non lus |
| Créer un projet | Nom, Description, Contexte de l'agent, Annuler, Créer un projet | Créer un projet; Le nom est requis |
| Actions du projet | Éditer, archiver, supprimer et actions connexes dépendant de l'État | Modifier les métadonnées du projet, archiver le projet ou confirmer la suppression |

## Barre latérale et disposition de l'espace de travail {/* #workspace-sidebar-and-layout */}

| Contrôle | Résultat |
| --- | --- |
| Tous les projets | Retour à la maison |
| Nom du projet | Ouvrir le point d'entrée ou le menu du projet |
| Réduire la barre latérale | Réduire ou étendre la barre latérale gauche |
| Nouveau | Créer une session |
| Personnaliser | Démarrer une conversation de personnalisation Skill/Specialist |
| Fichiers | Afficher le panneau des fichiers du projet à droite |
| Bibliothèque | Références ouvertes liées à un projet dans la bibliothèque de littérature |
| Ligne de session | Sessions de commutation; rapports d'état Idle, Courant, Permission, ou un autre état |
| Actions de session | Pin/Unpin, Éditer..., Télécharger tous les artefacts, Afficher le carnet, Exporter la conversation..., Archive, Supprimer |
| Messages, paramètres, GitHub | Ouvrez les notifications, les paramètres ou le dépôt officiel |
| Redimensionner gauche/droite, Aperçu d'effondrement | Redimensionner un panneau ou effondrement Aperçu |

## Conversation et compositeur {/* #conversation-and-composer */}

| Zone | Commande ou entrée | Résultat |
| --- | --- | --- |
| Message | Copier, modifier | Copier le message ou créer une révision en le modifiant |
| Révision | Précédent, `n/N`, Suivant | Parcourir les révisions des messages |
| Résultat de l ' assistant | Utilisation, Elapsed, fichier généré | Inspecter l'utilisation et le temps, ou ouvrir une sortie |
| Activité | Titre collapsible, Détails, Copier, Signaler une erreur | Ouvrir l'outil, le code, le diff, la recherche ou les détails d'erreur |
| Entrée | Demandez n'importe quoi. `↑↓`, `/`, `@`, `#`, `⌘K/Ctrl+K` | Entrer du texte, parcourir l'historique, sélectionner un Skill, référencer un fichier/session, ou rechercher |
| `+` | Joindre les fichiers, Vos fichiers, Revue, Contexte | Étape d'un nouveau dossier ou d'un dossier existant, demande d'examen ou inspecte le contexte |
| puce de pièce jointe | Aperçu, suppression | Inspecter ou supprimer une référence avant d'envoyer |
| Contrôles des agents | Specialist, Délégation, Auto-révision, Mode permission | Modifier la politique pour les demandes ultérieures |
| Modèle | Modèle actif, effort de raisonnement | Modifier le modèle ou l'effort pour les demandes ultérieures |
| Queue/Envoyer | Queue edit/delete/reorder, Envoyer, Envoyer, Planifier d'abord, Clavardage latéral, Branche, Arrêt | Étape ou soumettre des suivis, choisir un mode, ou arrêter l'exécution en cours |
| Faire défiler pour terminer | Aller au dernier message |

## Permission, planification et questions structurées {/* #permission-plan-and-structured-questions */}

| Surface | Contrôles | Résultat |
| --- | --- | --- |
| Autorisation | Impact info, Permission info, document Skill extensible, Autoriser une fois, Refuser | Inspecter et approuver ou rejeter une demande unique |
| Confirmation de la portée | Annuler, Confirmer le projet/global | Sauver une subvention plus large; une deuxième confirmation est nécessaire pour les grandes lignes |
| Plan | Approuver/régler, Rétroaction, Annuler | Accepter un plan, demander des changements ou annuler |
| Élicitation | Entrée ou options structurées, Soumettre, Annuler | Répondre à une question d'agent |
| Autorisation de sous-agent | Identité/dénombrement en cours, Autoriser/Deny | Décider séparément d'une demande de sous-agent |

## Fichiers et aperçu {/* #files-and-preview */}

| Contrôle | Résultat |
| --- | --- |
| Filtre, recherche | Filtrer par Tous ou Artefacts et par nom de fichier |
| Grille/liste | Modifier la mise en page du fichier |
| Élargir/dépasser l'écran complet | Ouvrir l'écran complet de la bibliothèque de fichiers ou retourner à la vue partagée |
| Catégorie accordéon | Étendre les téléchargements ou les fichiers générés depuis une session |
| Carte de fichier/corps | Ouvrir un aperçu modal |
| Télécharger | Enregistrer le fichier original ou la version sélectionnée |
| Ouvrir dans une vue scindée | Ajouter un onglet Aperçu à droite |
| Aperçu onglet, Fermer onglet | Changer ou fermer les onglets Aperçu |
| Aperçu en plein écran | Agrandir le fichier actuel |
| Actions de fichiers → Provenance | les preuves d'artefacts ouvertes; les téléchargements ordinaires n'ont pas cette action |
| Actions de fichiers → Éditer/Compare | Publier une nouvelle version de texte ou la comparer avec son prédécesseur |
| Précédent/vN/Suivant | Modifier la version de l'artefact |
| Caricature, stick, sphere, surface et ligne de l'APB | Changer la représentation tridimensionnelle |
| Contrôles PDF/Office/Image | Naviguez/recherchez des pages, zoomez, sélectionnez des preuves PDF, affichez des vignettes ou téléchargez-les comme pris en charge |
| Aperçu du menu contextuel du contenu | Copier le chemin, télécharger, enregistrer en tant qu'artefact, Provenance ou revenir au contexte le cas échéant |

## Bibliothèque de littérature {/* #literature-library */}

| Zone | Contrôles | Résultat |
| --- | --- | --- |
| Barre latérale | Boîte de réception, Toutes les références, Duplicata, Corbeille, Projets, Collections, Paramètres de citation | Choisissez la portée du catalogue ou le gestionnaire de style citation |
| Ajouter | Ajouter une référence, Importer PDF, Importer des références | Créer des métadonnées ou prévisualiser l'importation de PDF/BibTeX/RIS/NBIB |
| Catalogue | Rechercher, Trier, Filtres, Personnaliser les colonnes, taille de page | Affiner et organiser les références |
| Barres de sélection | Collecte/projet destination, recherche en texte intégral, déménagement à la corbeille, exportation | Appliquer une action en vrac limitée à des références sélectionnées |
| Détail de référence | Édition/achèvement des métadonnées, identifiants, collections, projets, pièces jointes, citation, texte intégral | Vérifier ou mettre à jour une référence |
| Boîte de réception | Accepter, rejeter, sélectionner les lots, annuler | Examiner les candidats découverts par l'agent avant l'admission à la bibliothèque |
| Doublons | Sélection de groupes, Comparer, choix de champs, Fusionner | Examiner et fusionner les dossiers tout en préservant les associations |
| Tâches en arrière-plan | Pause, Résumé, Avis, Annuler | Contrôler les métadonnées en vrac/opérations en texte intégral |

## Notebook et Provenance {/* #notebook-and-provenance */}

| Page | Contrôles | Résultat |
| --- | --- | --- |
| Notebook | Filtre Agent, onglets Python/R/Bash, Variables | Filtre exécute ou inspecte l'espace de noms du noyau en direct |
| Cellule Notebook | Copier, Afficher/Cacher la sortie | Copier l'entrée ou agrandir la sortie |
| Pied de page Notebook | Télécharger `.ipynb`, proche | Télécharger quand les cellules peuvent être converties, ou fermer la boîte de dialogue |
| Provenance | Flèches de version, Fermer Provenance | Modifier la version ou revenir à Aperçu |
| onglets Provenance | Code, Journal d'exécution, Messages, Environnement, Revue | Modifier le type de preuve |
| Coder | Générer le script, télécharger, copier | Créer un script dérivé ou enregistrer le bloc producteur |

## Signets et discussions parallèles {/* #bookmarks-and-side-discussions */}

| Entrée | Contrôles et comportement |
| --- | --- |
| Librairie privée | Sélection → Pour moi → Signet; Compositeur Signets ouvre la liste. Modifier les notes, retourner à la source ou supprimer le signet. [Détails](../guides/bookmarks.md) |
| onglet Side Chat | Onglet indépendant et projet de suivi; le transfert d'annotation; annulation et confirmation de proximité destructive. [Détails](../guides/delegation.md) |

## Contrôles des paramètres globaux {/* #global-settings-controls */}

**Search settings** navigue sur les quatre groupes de panneaux. `Back`, `Forward`, chapelures, `Maximize/Restore`, `Close settings`, navigation mobile et erreur `Dismiss` s'appliquent dans tous les paramètres. Voir [Aperçu des paramètres](../settings/overview.md) pour les groupes et les raccourcis de recherche.

### Skills {/* #skills */}

Conversation Skill importations, filtre source, Recherche, Ajouter des compétences, effondrement de catégorie, détail Skill, activer l'interrupteur, Créer/Télécharger/Importer, Aperçu, Modifier, Exporter, Supprimer, Annuler et Enregistrer.

### Mémoire, étiquettes, lettres de créances et d'utilisation {/* #memory-tags-credentials-and-usage */}

Catégorie de mémoire/entrée Créer, éditer, supprimer et effacer; Mots-clés créer/éditer/supprimer, assigner, Favoris, filtres et réorganiser; Création/renouvellement/suppression de lettres de créances, santé, utilisation et fixation Connector; Période d'utilisation, métrique, carte thermique, graphique quotidien, Tours/Appels, et contrôles de regroupement.

### Connecteurs {/* #connectors */}

Filtre/Recherche, Ajouter/Importer, Activer, Détailler, Tester/Reconnecter, Modifier, Exporter et Supprimer. Le formulaire Ajouter contient Type, Nom d'affichage, ID, Description, Commande, Arguments, Variables d'environnement, URL, Transport, Authentification, OAuth, URL du serveur d'autorisation, URL de métadonnées client, En-têtes, Trust, Cancel et Add/Save.

### Spécialistes {/* #specialists */}

Catégorie filtre, Rechercher, Activer, Détailler, Actions, Créer et Importer. L'éditeur contient l'icône, la couleur, le nom, la description, les instructions, l'accès complet, le type de capacité, les recherches Skill/Connector, les capacités sélectionnées, Annuler et Enregistrer. Importer contient Sélectionnez ZIP, Aperçu, Diagnostics, Annuler et Importer.

### Calculer {/* #compute */}

Ajouter host, Host card/activable, Sonde/Retry, Detail/Edit/Supprimer, Ressources, Direct SSH/Slurm mode d'exécution, Document de détails, Scratch root Editer/Input/Save/Annuler, et Concurrent job limit Modifier/Input/Save/Annuler. Les approbations d'exécution offrent Deny, une fois, session, projet, et global.

### Réseau {/* #network */}

Vérifiez à nouveau; Système de proxy/Manuel/Direct; liste d'autorisation de domaine Notebook; Rétroviseur de paquet Configurer/Modifier; Coda canal, indice de pip et faisceau CA; Afficher les miroirs, Annuler et Enregistrer.

### Modèle {/* #model */}

Modèle actif, Raisonnement des radios et politiques du modèle de sous-agent/examinateur/vision/session-détails; Test/Édition/Supprimer/Ajouter. Le formulaire Fournisseur contient tous les champs de la page Modèle d'embarquement plus Annuler et Enregistrer.

### Agent {/* #agent */}

OpenCode/Claude/Codex/CodeBuddy framework card, Switch, Installer source, Installer/Annuler/Réessayer, Installer journal, Réparation, Se connecter/auth, Importer config/home, et Désinstaller confirmation.

### Autorisations {/* #permissions */}

Profil par défaut, filtre de champ d'application, lien de champ d'application de subvention, indice de connecteur, révocation et confirmation, et avertissement ou rafraîchissement de magasin incomplet.

### Environnements d'exécution {/* #runtimes */}

Python/R; environnement Activer, Ajouter un interprète, Télécharger/setup, Réparer, Autoriser l'installation du paquet, Packages, Filtre, Ajouter/Installer/Supprimer le paquet, Désactiver/désinstaller et confirmer.

### Stockage {/* #storage */}

Stockage de l'application Reveal/Repair; Emplacement des données Changement, Chemin, Parcourir, Vérifications, Migrer/Adopter/Annuler; progrès de la migration Annuler/Reessayer/Redémarrer/Discard; les catégories d'utilisation du disque extensible.

### Général {/* #general */}

Notifications de tâches, radios thématiques, radios d'icônes d'application, comportement de fermeture, jeton GitHub Open/Input/Save/Clear, et About/Check updates/install update.

### Télécommande {/* #remote-control */}

Démarrer/stop/réactualiser, copier/ouvrir l'URL et QR; Configuration/reprise/désconnecte Remote.It; Relèvement du navigateur fiable; Demande d'appariement Rejet/Autoriser une fois/toujours la confiance.

### Archivé {/* #archived */}

Gestion du projet, restauration du projet, suppression du projet; Restaurer/Supprimer la session; confirmation de suppression Annuler/confirmer.


## Examen de la littérature et accès aux ressources {/* #screening-and-access */}

| Zone | Contrôles | Guider |
| --- | --- | --- |
| Bibliothèque | Collection intelligente, Portée, Critères d'inclusion, Critères d'exclusion, Utiliser le texte complet disponible, Aperçu des règles en direct, Mettre à jour automatiquement | [Collections intelligentes](../guides/library.md#smart-collections) |
| Collection intelligente | Essais, opinions sur les décisions, détails de l'évaluation, Inclure, Exclure, Utiliser la décision modèle, exporter des références | [Écran et documents d ' examen](../workflows/screen-literature.md) |
| Modèles de classement | Collections intelligentes indépendantes et fixations automatiques de sélection des capacités; Tester le modèle | [Modèle contraignant](../guides/models.md#smart-collection-model) |
| Skills / Connecteurs | Gérer l'accès, Main Agent, les associations Specialist, les liaisons de rôle en lecture seule | [Accès aux ressources](../guides/connectors.md#resource-access) |
| Session | Exporter des diagnostics, des sources sélectionnées, Exporter, Afficher dans le dossier | [Exportation de diagnostics locaux](../guides/troubleshooting.md#session-diagnostics) |
