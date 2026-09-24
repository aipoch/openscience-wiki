---
title: "Attribuer Skills et connecteurs"
last_update:
  date: '2026-09-24'
---

# Attribuer Skills et connecteurs {/* #assign-skills-and-connectors */}

La liste des capacités d'un Specialist détermine les Skills et les connecteurs qu'il peut atteindre. Un Connector activé à l'échelle mondiale n'est pas automatiquement disponible pour chaque Specialist restreint.

## Configurer l'accès explicite {/* #configure-explicit-access */}

<p className="example-label"><strong>Exemple</strong> Attribuer les capacités à RNA-seq QC Reviewer</p>

1. Ouvrez **Settings → Specialists**, puis modifiez **RNA-seq QC examinateur**.
2. Éteignez **Full access**.
3. Dans **Skills**, sélectionnez **Ajouter une compétence**, recherchez `rnaseq-count-qc` et ajoutez le paquet personnel enregistré. Confirmez **Skills 1**.
4. Dans **Connectors**, sélectionnez **Ajouter un connecteur** et choisissez **Archives Omics**. Confirmez **Connecteurs 1**.
5. Ouvrez le détail d'une capacité pour vérifier que vous avez sélectionné la ressource prévue. Sauvegarder et rouvrir le rôle pour confirmer la persistance.

![Le Specialist avec une sélection explicite des capacités](/img/open-science/capabilities-walkthrough/05-specialist-capabilities.webp)

| Contrôle | Effet |
| --- | --- |
| Accès complet On | Utilise la portée de la capacité héritée avec toute exclusion explicite par ressource. Vérifiez la liste résolue après avoir changé **Manage access**. |
| Accès complet Off | Utilise les listes explicites; une liaison manquante ne peut pas être fournie simplement en nommant un outil dans l'invite. |
| Ajouter une compétence / Ajouter un connecteur | Ouvre un sélecteur pour ce type de capacité. |
| Détails sur les capacités | Inspecte la ressource; il ne gère pas son flux de travail scientifique. |
| Supprimer | Supprime cette liaison sans désinstaller la ressource. |
| Enregistrer les modifications | Persiste la portée sélectionnée. |

Application requise Skills rester activé dans le monde entier. Cela ne remplace pas la liste des capacités Specialist ni n'allume l'accès complet. Si Customize n'est pas disponible à ce rôle, inspectez sa ressource contraignante et résolue. Voir [activation Skill](../skills/overview.md#why-some-switches-cannot-be-turned-off).

## Régler l'accès à partir d'une ressource {/* #resource-access */}

Sous **Settings → Skills** ou **Connectors**, ouvrez une ressource **Manage access** popup pour inspecter les associations Main Agent et Specialist. Il met à jour le rôle sélectionné dans la liaison, pas le rôle dans l'état activé. Les rôles d'accès complet peuvent être exclus par ressource; Les rôles restreints utilisent des sélections explicites. Les fixations du marché peuvent être lues uniquement dans cette fenêtre. Voir le [des contrôles d'accès illustrés](../guides/connectors.md#resource-access).

Après avoir modifié une obligation, confirmer que le rôle est activé, que ses justificatifs de service sont prêts et que son fonctionnement prévu est permis. **Used by** montre les affectations plutôt que les exécutions terminées.

## Quatre vérifications distinctes de l'état de préparation {/* #four-separate-readiness-checks */}

| Calque | Ce qu'il faut vérifier | Exemple de défaillance |
| --- | --- | --- |
| Rôle | Installé, activé, configuration terminée | Un rôle importé reste désactivé jusqu'à ce que la configuration soit sauvegardée. |
| Capacité | La ressource prévue est assignée et résolue par l'exécution | Un nom d'affichage/nom abrégé ne résout pas la ressource de catalogue assignée. |
| Service/temps de fonctionnement | Serveur connecté, identifiants requis, noyau/dépendances disponibles | Certificat de service manquant requis ou forfait. |
| Fonctionnement | Version d'entrée actuelle et mesure approuvée | Une remise de fichier non disponible échoue avant l'exécution de l'enfant. |

Le rôle local a conservé ses liens Skill et Omics Archives après la création et l'importation de paquets. Le premier enfant délégué n'a pas résolu le Skill par le nom abrégé qu'il a essayé, mais a effectué les vérifications de table fournies explicitement dans Python. Cela vérifie la délégation et l'arithmétique, pas une charge d'enfant Skill réussie. Lorsque cela se produit, demandez à l'agent d'inspecter son catalogue disponible et d'utiliser l'identifiant exact de la ressource assignée; ne pas élargir le plein accès pour masquer un problème de nommage.

## L'accès à la capacité n'est pas le mode permission {/* #capability-access-is-not-permission-mode */}

L'accès complet ne signifie pas que toutes les actions doivent être autorisées sans demander.= [Mode d ' homologation](../guides/approval-modes.md), les limites du système de fichiers/réseau et les règles d'exécution s'appliquent toujours. Un enfant peut faire sa propre demande d'autorisation dans la conversation parentale; Inspecter le rôle et l'opération de la demande avant de répondre.

Lors de l'exportation d'un rôle, les ID Connector sont des références, pas des connexions ou des secrets portables. Les fichiers Skill sélectionnés peuvent être inclus explicitement. Sur un autre périphérique, confirmez chaque liaison, configurez les identifiants et lancez une petite vérification avant de compter sur le rôle. Voir [Gérer et partager](./manage.md).

Référence de mise en œuvre: [SpécialisteEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx), [SpécialistesPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
