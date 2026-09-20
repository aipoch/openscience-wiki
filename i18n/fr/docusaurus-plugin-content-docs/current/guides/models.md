---
title: "Modèles et politiques de travail"
last_update:
  date: '2026-09-20'
---

# Modèles et politiques de travail {/* #models-and-task-policies */}

Choisissez un modèle pour le travail qu'il doit effectuer, puis vérifiez quels paramètres sont hérités. Un modèle d'accès à **Provider**; un **Agent** exécute la conversation et les outils; un **Specialist** fournit un rôle réutilisable et des capacités sélectionnées. Changer l'un n'installe pas ou ne configure pas les autres.

Utilisez les politiques de tâches ci-dessous lorsque Main, Subagent, examinateur, Vision ou Session détails ont besoin de différents modèles. Vérifiez le fournisseur et le modèle dans la tâche résultante, en particulier lorsque plusieurs fournisseurs offrent le même nom de modèle.

## Sélectionnez le modèle principal {/* #select-the-main-model */}

1. Ouvrez **Settings → Model**. Dans un espace de travail, l'entrée **Select model** du Compositeur expose également les choix du modèle.
2. Ouvrez **Main model** et choisissez un modèle disponible sous son fournisseur configuré. Une entrée de catalogue n'est pas la preuve que le compte peut l'utiliser.
3. Sélectionnez **Reasoning effort**. Utilisez les choix réellement affichés pour ce modèle. Ce modèle inspecté offrait par défaut, bas, moyen, haut, XHigh et ultra; d'autres modèles ont différentes échelles.
4. Fermer et rouvrir Model pour vérifier la sélection enregistrée. Commencez une petite demande et inspectez son résultat avant une longue analyse.

![Modèle Main et fournisseur connecté](/img/open-science/guides-walkthrough/10-model-main.webp)

Les modifications s'appliquent aux demandes subséquentes. Ils ne modifient pas rétroactivement le modèle derrière une réponse existante. Lorsque les modèles changent, l'application tente de préserver la force relative du raisonnement; un moteur peut approximationner un effort non soutenu. Un effort plus important peut augmenter le temps et l'utilisation des jetons et n'est pas une garantie d'exactitude.

## Attribuer des modèles à des tâches spécifiques {/* #assign-models-to-specific-tasks */}

Sélectionnez une ligne de scénario pour l'étendre. Ouverture d'une autre rangée s'effondre la précédente. Lire le résumé effondré après avoir fait un changement : il distingue l'héritage, un modèle fixe et une sélection indisponible.

| Scénario | Choix du modèle | Ce qu'il faut vérifier |
| --- | --- | --- |
| **Subagent** | Même que le modèle principal, ou un modèle distinct compatible | Le contrôle d'effort correspondant est désactivé alors qu'il suit Main. La délégation doit également être autorisée. |
| **Reviewer** | Suivez le modèle principal ou un modèle d'examinateur configuré | Une politique modèle ne permet pas à elle seule l'examen automatique ou la création d'un dossier d'examen. |
| **Vision** | Un modèle compatible avec l'image configuré | Non configuré signifie qu'il n'y a pas de sélection de Vision dédiée. Le fait qu'un relais soit nécessaire dépend du support d'image du moteur actif. |
| **Session details** | Suivre Main ou choisir un modèle compatible; d'inspecter ses efforts et ses moyens | Cela génère un titre/description de session en utilisant un appel restreint. Il est séparé de la tâche scientifique et de ses artefacts. |

![Héritage du sous-agent et maîtrise de l'effort](/img/open-science/guides-walkthrough/11-model-scenarios.webp)

Le sélecteur de détails Session filtre les modèles d'abonnement Codex. Un modèle visible en Main ou Vision peut donc être absent ici. Avec un fournisseur local compatible et OpenCode sélectionné, le modèle local est devenu disponible comme un choix fixe. **Not supported** à côté de son effort de raisonnement signifie que le contrôle de l'effort n'est pas disponible; il est séparé de la question de savoir si le modèle peut recevoir une demande de texte.

Pour un scénario épinglé, sélectionnez le fournisseur/modèle, puis l'effort soutenu. Retournez à l'option hérédité lorsque vous voulez que les futures modifications de Main se propagent. Un résumé de **Unavailable** peut conserver le nom du modèle précédent même après que son fournisseur a été supprimé ou n'a plus été admissible; sélectionner un remplacement valide.

### Lire un graphique avec un modèle de vision séparé {/* #read-a-chart-with-a-separate-vision-model */}

Utilisez Vision lorsque le modèle Main de la conversation ne peut pas accepter les images. Un modèle Main qui accepte déjà les images peut les lire directement.

<p className="example-label"><strong>Exemple pratique</strong> Vérifiez les étiquettes dans un tableau de nombre d'échantillons</p>

1. Expand **Settings → Model → Vision** et choisissez un modèle compatible avec l'image disponible. Sélectionnez un effort de raisonnement supporté si le contrôle est activé.
2. Gardez le modèle de texte souhaité sélectionné dans la conversation. Changer de vision ne remplace pas Main.
3. Utilisez **+ → Attach files** pour joindre le graphique. Confirmer que son nom de fichier apparaît dans le Compositeur avant d'envoyer.
4. Demandez des informations visibles spécifiques, telles que le titre, les étiquettes d'axe, les unités et le nombre d'échantillons tracés. Demander une indication explicite lorsqu'une étiquette est illisible.
5. Comparez la réponse avec l'image originale. Utilisez le tableau source pour des comparaisons numériques exactes : dans cet exemple, deux étiquettes arrondies à **24,7M** ne prouvent pas que leurs nombres sous-jacents sont égaux.
6. Retournez Vision à **Not configured** lorsque vous ne voulez plus d'un modèle d'image séparé. Cela ne supprime pas le fournisseur de modèle.

![Sélection de vision séparée à côté du modèle texte Main](/img/open-science/sept11-completion/vision-configuration.webp)

![Vérification des étiquettes des cartes et des limites des valeurs arrondies](/img/open-science/sept11-completion/vision-result.webp)

Le relais d'image actuel exclut les fournisseurs d'abonnement Codex même s'ils peuvent apparaître dans le sélecteur Vision. Si un modèle Main seulement en texte rejette toujours une image après cette sélection, choisissez un autre fournisseur de Vision admissible ou un modèle Main compatible avec l'image. Ne traitez pas une valeur de sélecteur enregistrée comme une requête d'image réussie.

### Confirmer que les détails de la session ont été générés {/* #confirm-that-session-details-were-generated */}

Après avoir choisi **Same as main model** ou un modèle fixe compatible sous **Session details**, créez une conversation. Attendez que le premier retour rapide devienne un titre concis, puis inspectez la description enregistrée. Une copie tronquée de l'invite n'établit pas la génération réussie.

Vérifiez le titre et la description sauvegardés après la fin de la requête auxiliaire. Si le titre reste une prompte raccourcie, inspectez la compatibilité du modèle, la charge du serveur local et le statut final de l'appel. Un délai d'attente auxiliaire peut retenir ce recul. La génération de titres de session utilise sa propre politique modèle et n'exécute pas le calcul scientifique de la conversation.

## Contrôles des fournisseurs et contrôles des défaillances {/* #provider-controls-and-failure-checks */}

| Contrôle/état | Action suivante |
| --- | --- |
| **Add provider** | Suivre [configuration du fournisseur](./providers.md), y compris ses exigences en matière d'authentification et d'extrémité. |
| **Check Codex login** | Revérifier l'état de connexion de l'abonnement; Cela ne conduit pas à une tâche de recherche. |
| **Re-import Codex login** | Importez une connexion existante rafraîchie via le flux de l'application. |
| **Edit** | Révision de la configuration du fournisseur. Préserver la configuration de travail jusqu'à ce qu'un remplacement soit vérifié. |
| Désactivé **Delete** | Le fournisseur actuel ne peut pas être supprimé dans cet état; Choisissez d'abord une autre configuration valide. |
| Avertissement de compatibilité | Vérifiez le format actif Agent et fournisseur API avant de réessayer à plusieurs reprises. |
| Pas de choix de scénario | Configurer d'abord un fournisseur/modèle admissible; un sélecteur vide n'est pas une requête pour taper un nom de modèle arbitraire. |

Utilisez [Configuration de l'agent](./frameworks.md) pour le moteur d'exécution et [Utilisation](./usage.md) pour l'activité signalée. La priorité de configuration exacte est en [Référence](../reference/configuration.md).

Sources: [sélection du modèle](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ActiveModelSelect.tsx), [les politiques de scénario](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ScenarioModelList.tsx).

## Modèles de classement facultatifs {/* #classification-models */}

Ouvrez **Settings → Model → Classification models**. Un service de classification aide à sélectionner les connecteurs et Skills pertinents avant le début d'une demande. Il ne remplace pas Main ni n'ajoute un modèle de chat. Vous pouvez laisser **Automatic capability selection** à **Use default method**; Skills et les connecteurs fonctionnent toujours sans elle.

Dans v0.31.1, ce service est utilisé pour les conversations principales avec **Codex Chat Completions** ou **CodeBuddy**. Cela ne signifie pas que les sessions avec un abonnement Codex ou tous les autres frameworks l’utilisent. Seuls la requête actuelle et les noms et descriptions des capacités sont transmis au service de classification. Si le service est indisponible ou sa réponse incertaine, la méthode par défaut est utilisée.

![Sélection par défaut de la capacité et entrée optionnelle du service de classification](/img/open-science/v0311/classification-models.webp)

1. Choisissez **Add service**, puis **TypeSafe AI** ou **OpenRouter**.
2. Nommez le service et fournissez son certificat API. OpenRouter peut utiliser un compte compatible existant ou une nouvelle clé; garder les clés cachées dans les captures d'écran.
3. Sélectionnez **Save** et attendez la validation. La validation échouée laisse les paramètres précédents inchangés.
4. Sous **Automatic capability selection**, sélectionnez le service sauvegardé et un modèle offert dans son catalogue. Utilisez **Check model** pour vérifier la connexion.
5. Essayez une requête limitée dans une conversation principale prise en charge, puis inspectez les outils réels sélectionnés. Une vérification de modèle réussie ne permet pas à elle seule de vérifier un résultat de recherche.

Supprimer un service renvoie sa liaison à la méthode par défaut. Une clé de service stockée séparément est enlevée avec elle; supprimer un service qui partage un compte ne supprime pas ce compte ou sa clé.

Voir [configuration du fournisseur](providers.md) pour les modèles de conversation. Les ressources d'analyse PDF locales sont gérées sous **Local parsing models**, un onglet séparé.

![Formulaire de service de classification avec la clé API toujours vide](/img/open-science/v0311/classification-add-service.webp)

Ces captures montrent l’état par défaut et le formulaire d’ajout dans v0.31.1. Aucun service de classification n’a été configuré et aucun appel à un modèle de classification n’a été vérifié dans cette démonstration.
