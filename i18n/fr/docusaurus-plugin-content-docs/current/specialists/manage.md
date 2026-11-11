---
title: "Gérer et partager les spécialistes"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Gérer et partager les spécialistes {/* #manage-and-share-specialists */}

Utilisez un paquet pour déplacer un rôle configuré, et compléter sa configuration locale après l'importation. Les références Skills, Connector et les autorisations locales ont des règles de portabilité différentes.

Dans la gestion des lots, examiner le nombre sélectionné dans la zone d'action inférieure avant d'appliquer une opération. Lisez les commentaires d'achèvement ou d'échec là-bas, puis vérifiez les éléments résultants. Sélectionner une entrée seule ne l'active pas, ne l'installe pas ou ne la supprime pas.

## Contrôles des listes {/* #list-controls */}

| Contrôle | Opération et résultat escompté |
| --- | --- |
| Spécialistes de la recherche / catégorie filtre | les lignes installées pour les flèches; Effacer les filtres si un rôle sauvegardé apparaît manquant. |
| Éditer / Nom du rôle | Ouvre l'éditeur existant. Enregistrer les modifications et rouvrir pour vérifier. |
| Changer d'apparence | Modifie l'icône/la couleur sans modifier les instructions. |
| Gérer les balises | Attribue les labels organisationnels. |
| Basculer | Active/désactive le rôle sans le supprimer. |
| Actions → Dupliquer | Ouvre un brouillon de nouveau rôle avec des instructions et des reliures copiées et un nom Copier. Créer un spécialiste est toujours nécessaire. |
| Actions → Exporter ZIP | Ouvre la sélection d'exportation et enregistre un paquet portable. |
| Actions → Supprimer | Ouvre une confirmation de suppression permanente; inspecter séparément la suppression optionnelle de Skill. |

Avant de supprimer un rôle, inspecter l'option pour supprimer son Skills. Conserver Skills partagé si d'autres rôles les utilisent encore. Supprimer un duplicata ne nécessite pas la suppression du rôle original.

![Suppression du rôle jetable tout en conservant Skills partagé](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## Partager et importer un paquet {/* #share-and-import-a-package */}

### Exporter avec les fichiers requis Skill {/* #export-with-the-required-skill-files */}

<p className="example-label"><strong>Exemple</strong> Partager un rôle d'évaluateur avec son Skill</p>

1. Choisissez **Actions → Export ZIP** sur RNA-seq QC Reviewer.
2. Dans **Choose Skills to include**, sélectionnez explicitement `rnaseq-count-qc` si le destinataire a besoin de ses fichiers. Un Skill personnel/importé installé n'est pas nécessairement inclus par défaut.
3. Exportez et inspectez les archives avant de les partager.

![Sélection d'un Skill à inclure dans le paquet Specialist](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

Le <ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">paquet avec Skill</ExampleDownload> réel contient `manifest.json`, `specialist.json`, `skills/rnaseq-count-qc/SKILL.md` et son schéma de référence. Une exportation minimale peut contenir seulement les deux fichiers JSON. Les identifiants Connector sont des références; les titres de compétence, la confiance locale et le plein accès ne sont pas transférés comme autorisation prête à l'emploi.

### Importer, résoudre les conflits, terminer la configuration {/* #import-resolve-conflicts-finish-setup */}

1. Sélectionnez **Add specialist → Import ZIP → Choose ZIP**. Un paquet contient exactement un Specialist. **Download template** fournit le modèle de paquet d'applications.
2. Inspectez le nom, l'identifiant immuable, la version, le Skills groupé, les limites d'archive et les diagnostics.
3. Pour chaque conflit Skill, choisissez **Keep installed Skill** ou **Use package Skill**. Le deuxième choix remplace les fichiers pour chaque utilisateur actuel de ce Skill; lire **Affecté maintenant**.
4. Pour un ID Specialist existant, choisissez **Review overwrite**, inspectez les versions actuelles/incoming et exportez la version actuelle d'abord si nécessaire. **Overwrite and continue** est une confirmation séparée.
5. Le rôle importé est enregistré **désactivé / SETUP INCOMPLETE**. Inspectez les instructions et les liaisons de capacité dans l'éditeur, choisissez la portée d'accès prévue, puis **Save changes** pour terminer la configuration et l'activer.
6. Réouvrir le rôle installé et exécuter une petite tâche de portée.

![Résolution du vrai conflit RNA-seq Skill pendant l'importation](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**Version inchangée** peut encore accompagner un conflit Skill. Choisissez explicitement la source Skill prévue, puis rouvrez le rôle importé pour confirmer ses liaisons et sa portée d'accès.

| Contrôle de prévisualisation | Quoi inspecter? |
| --- | --- |
| Extension groupée Skill | Version, disposition, raison et liste de fichiers. |
| Limites d'archivage | 50 MB compressé, 200 MB non compressé, fichiers 2,000, 25 MB par fichier dans cette interface utilisateur. |
| Diagnostics | bloquer les erreurs, les avertissements et les informations; un avertissement peut exiger un choix explicite. |
| Copier le rapport / Télécharger JSON | Exporte des diagnostics pour le dépannage. Examiner le rapport avant de le partager. |
| Annuler | Quitte l'aperçu sans l'installer. |
| Suivant / Révision écrasement | Continue seulement lorsque les choix requis et la validation le permettent. |

**Importation à partir d'un navigateur :** sélectionner **Import ZIP → Choose ZIP**, puis inspecter le paquet, résoudre les conflits et terminer la configuration locale avant d'activer le rôle. Les pouvoirs et la configuration de confiance doivent être définis sur l'appareil de destination. Si le téléchargement échoue, conservez l'erreur et suivez [Dépannage](../guides/troubleshooting.md).

## Parcourez le marché {/* #browse-the-marketplace */}

Ouvrez **Marketplace**, recherchez un rôle et choisissez **View details**. Vérifiez l'éditeur, la source, la version, la licence, la taille de téléchargement et inclus Skills/Connectors. **Refresh Marketplace** met à jour le catalogue; **Manage Marketplace sources** contrôle les sources configurées. Tous les filtres/officiels/communautaires concernent l'origine du catalogue et non l'état de préparation à l'exécution.

![Le détail du paquet Auto Research Specialist](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

Sélectionnez **Install Specialist**, puis confirmez le rôle apparaît dans **Marketplace** et inspectez son état d'activation et ses liaisons. Le nombre de paquets de catalogues décrit ce paquet, pas toutes les capacités d'application. L'installation n'exécute pas de tâche de recherche ou ne prépare pas toutes les dépendances externes; terminer toute configuration requise avant utilisation.

![Auto Recherche installée et activée](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

## Vérifier avant le partage {/* #verify-before-sharing */}

Après avoir importé ou modifié le rôle, exécuter une petite tâche en utilisant ses capacités assignées et inspecter la sortie sauvegardée. Suivez [Étendre une analyse avec un Specialist installé](../workflows/extend-analysis.md) pour des exemples existants de méthodes, PCA et matrice. Vérifiez les entrées requises et les limites non résolues pour l'itinéraire sélectionné.

Référence de mise en œuvre: [SpécialistesPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
