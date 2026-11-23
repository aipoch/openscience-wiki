---
sidebar_position: 1
title: "Aperçu des paramètres"
last_update:
  date: '2026-11-23'
---

# Aperçu des paramètres {/* #settings-overview */}

Ouvrez **Settings** à partir du coin inférieur gauche de l'espace de travail. Ses **Panneaux 17** sont organisés en **System**, **Intelligence**, **Connections** et **Workspace**. Skills, Connecteurs et Spécialistes sont gérés dans le [Centre de ressources](../guides/navigation.md#resource-center) séparé. Choisissez un panneau de paramètres par but ou utilisez la recherche d'en-tête.

| Contrôle mondial | Comportement |
| --- | --- |
| `Back` / `Forward` | Déplacer entre un panneau de paramètres principaux et ses sous-vues de détails, d'ajouts ou d'importations |
| Breadcrumb retour bouton | Retour d'une vue d'ensemble à son panneau principal |
| `Maximize` / `Restore` | Basculer entre une grande boîte de dialogue et des paramètres en plein écran |
| `Close settings` | Retour à l'original du projet et de la session sans perdre les paramètres qui ont été sauvegardés avec succès |
| `Dismiss settings error` | Fermez la bannière d'erreur; l'opération échouée n'est pas réévaluée automatiquement |
| Bouton de navigation mobile | Ouvrez ou fermez le tiroir de navigation Paramètres |

## Trouver un paramètre {/* #find-a-setting */}

1. Ouvrez les paramètres et concentrez **Search settings** dans l'en-tête. **&#42;K** sur macOS ou **Ctrl+K** sur Windows/Linux concentre cette recherche pendant que Paramètres est actif.
2. Saisissez un nom de panneau ou une tâche, comme `Package mirror`, `Main model` ou `Diagnostics`.
3. Utilisez **En haut/en bas** pour choisir un résultat et **Entrez** pour ouvrir son panneau, ou cliquez sur le résultat. Le panneau de destination est brièvement mis en évidence; Localisez le réglage nommé là-bas.
4. Utilisez **Back** pour retourner. Effacer la requête pour rechercher un autre paramètre. La recherche d'un panneau filtre sa liste plutôt que de rechercher tous les paramètres.

Cette recherche couvre les paramètres représentatifs de chaque panel, pas de chaque domaine ou document de recherche. Si un terme ne correspond pas, utilisez le nom du panneau ou les groupes de navigation ci-dessous. Pour rechercher des conversations ou des fichiers, fermez Paramètres et utilisez [recherche mondiale](../guides/navigation.md).

## Les panneaux principaux 17 {/* #the-17-main-panels */}

| Groupe | Groupe | Ce qu'il gère |
| --- | --- | --- |
| Système | [Général](../guides/appearance.md#help-center) | Version de l'application, mises à jour, diagnostics, installation CLI, comportement de la fenêtre et aide |
|  | [Apparence](../guides/appearance.md) | Thème, langue, échelle d'interface de bureau et les choix app-icon pris en charge |
|  | [Notifications](../guides/appearance.md) | Alertes de tâches, contenu de la notification, état du système et notification des essais |
| Intelligence | [Modèle](../guides/models.md) | Modèles de fournisseurs et de scénarios, y compris [services d'image](../guides/image-generation.md) |
|  | [Agent](../guides/frameworks.md) | Installation, commutation et réparation du cadre de l'agent |
|  | [Mémoire](../guides/memory.md) | Notes de projet et notes globales d'acceptation |
| Connexions | [Réseau](../guides/network.md) | Proxy, miroirs de paquet et règles d'accès détendue/strict Notebook |
|  | [À distance](../guides/remote-access.md) | Accès au navigateur, appariement et dispositifs de confiance |
|  | [Lab](../guides/providers.md#lab-account) | Organisation de bureau signature, modèles assignés et utilisation |
|  | [Informations d'identification](../tools/credentials.md) | Clés, jetons, OAuth et récupération des titres de compétence |
|  | [Calculer](../guides/remote-compute.md) | SSH · Slurm · Kubernetes · Câblage des emplois face · Modal · Ray |
| Espace de travail | [Balises](../guides/tags.md) | Mots-clés et Favoris commande |
|  | [Autorisations](../guides/approval-modes.md) | Mode par défaut et subventions enregistrées |
|  | [Environnements d'exécution](../guides/runtimes.md) | Environnements et paquets Python/R |
|  | [Stockage](../guides/storage.md) | Emplacement des données, accès écrit et utilisation du disque |
|  | [Utilisation](../guides/usage.md) | Statistiques des activités de recherche et d'appel |
|  | [Archivé](../guides/storage.md) | Restaurer ou supprimer définitivement les travaux archivés |

**Feedback** reste une entrée séparée au bas de Paramètres.

:::info&#91;Comment les paramètres sont enregistrés&#93; Certains commutateurs sont enregistrés immédiatement. Les formulaires plus longs utilisent `Save`, `Add` ou `Import`. Ne fermez pas l'application alors que `Saving…`, `Testing…` ou `Installing…` est affiché. La migration, la désinstallation, la suppression et les actions à autorisation générale doivent être confirmées. :::

## Les onglets de paramètres du modèle {/* #model-tabs */}

Dans **Model**, utilisation **Conversation models** pour les fournisseurs et les modèles de tâches, **Classification models** pour la sélection des capacités optionnelles et les collections intelligentes, **Local capabilities** pour l'extraction de PDF, le ROC et la narration de recherche. Ce sont des onglets dans Model, pas des panneaux de paramètres supplémentaires. Voir [ressources locales](../guides/models.md#local-capabilities).

La recherche d'en-tête utilise **Ctrl+K**. Pour focaliser la recherche du panneau ou de la boîte de dialogue, utilisez **Ctrl+Alt+K** lorsque ce champ est disponible. Voir [raccourcis de recherche](../guides/shortcuts.md#local-settings-search).

## Ouvrir les ressources installées depuis les paramètres {/* #resource-shortcuts */}

Utilisez le raccourci **Skills**, **Spécialistes** ou **Connectors** dans Paramètres pour ouvrir cette catégorie installée dans le centre de ressources. Retournez à la reprise de votre position de paramètres précédente. Ce sont des raccourcis vers la gestion des ressources, pas trois panneaux de paramètres supplémentaires. La découverte du marché et la configuration des ressources installées restent des vues séparées.
