---
sidebar_position: 1
title: "Aperçu des paramètres"
last_update:
  date: '2026-09-20'
---

# Aperçu des paramètres {/* #settings-overview */}

Ouvrez **Settings** à partir du coin inférieur gauche de l'espace de travail. Ses panneaux 17 sont organisés en quatre groupes : **Intelligence**, **Connections**, **Workspace** et **System**. Choisissez un panneau par but, ou recherchez dans l'en-tête. Dans ces guides, **Settings → Model**, par exemple, se réfère au panneau Modèle à l'intérieur de l'Intelligence.

| Contrôle mondial | Comportement |
| --- | --- |
| `Back` / `Forward` | Déplacer entre un panneau de paramètres principaux et ses sous-vues de détails, d'ajouts ou d'importations |
| Breadcrumb retour bouton | Retour d'une vue d'ensemble à son panneau principal |
| `Maximize` / `Restore` | Basculer entre une grande boîte de dialogue et des paramètres en plein écran |
| `Close settings` | Retour à l'original du projet et de la session sans perdre les paramètres qui ont été enregistrés avec succès |
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
| Intelligence | [Modèle](../guides/models.md) | Modèles de fournisseurs et de scénarios |
|  | [Agent](../guides/frameworks.md) | Installation, commutation et réparation du cadre de l'agent |
|  | [Skills](../skills/overview.md) | Méthodes de recherche réutilisables et leur disponibilité |
|  | [Spécialistes](../specialists/overview.md) | Rôles et accès aux capacités de Specialist |
|  | [Mémoire](../guides/memory.md) | Notes globales et de projet |
| Connexions | [Connecteurs](../guides/connectors.md) | Services de données, connexions et importations personnalisées MCP |
|  | [Réseau](../guides/network.md) | Proxy, miroirs de paquets et accès au domaine Notebook |
|  | [À distance](../guides/remote-access.md) | Accès au navigateur, appariement et dispositifs de confiance |
|  | [Informations d'identification](../tools/credentials.md) | Clés, jetons, OAuth et récupération des titres de compétence |
| Espace de travail | [Balises](../guides/tags.md) | Mots-clés et Favoris commande |
|  | [Autorisations](../guides/approval-modes.md) | Mode par défaut et subventions enregistrées |
|  | [Environnements d'exécution](../guides/runtimes.md) | Environnements et paquets Python/R |
|  | [Stockage](../guides/storage.md) | Emplacement des données, accès écrit et utilisation du disque |
|  | [Calculer](../guides/remote-compute.md) | Ressources de calcul locales et SSH |
|  | [Utilisation](../guides/usage.md) | Statistiques des activités de recherche et d'appel |
|  | [Archivé](../guides/storage.md) | Restaurer ou supprimer définitivement les travaux archivés |
| Système | [Général](../guides/appearance.md) | Apparence, notifications, diagnostics et version |

**Feedback** reste une entrée séparée au bas de Paramètres.

:::info&#91;Comment les paramètres sont enregistrés&#93; Certains commutateurs sont enregistrés immédiatement. Les formulaires plus longs utilisent `Save`, `Add` ou `Import`. Ne fermez pas l'application alors que `Saving…`, `Testing…` ou `Installing…` est affiché. La migration, la désinstallation, la suppression et les actions à autorisation générale doivent être confirmées. :::

## Les onglets de paramètres du modèle {/* #model-tabs */}

Dans **Model**, utilisez **Conversation models** pour les fournisseurs et les modèles de tâches, **Classification models** pour la sélection optionnelle Skill/Connector et **Local parsing models** pour les ressources d'analyse locales. La classification est un onglet dans les paramètres du modèle, pas un panneau de paramètres de haut niveau supplémentaire. Voir [la configuration du classement](../guides/models.md#classification-models).
