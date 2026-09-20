---
title: "Signets de lecture personnels"
description: "Sauvegardez les passages et les régions PDF par vous-même, ajoutez des notes et retournez à leur source dans une session."
last_update:
  date: '2026-09-20'
---

# Signets de lecture personnels {/* #private-reading-bookmarks */}

Utilisez des signets pour garder un passage que vous voulez revisiter, une table que vous devez vérifier, ou une note pour la lecture ultérieure. **For me** enregistre un enregistrement de lecture privé dans la session en cours. **To Agent** prépare une annotation pour une demande; Enregistrer un signet n'envoie pas de message ou ne l'ajoute pas au contexte de l'agent.

## Enregistrer un passage ou une région PDF {/* #save-a-passage-or-pdf-region */}

1. Ouvrez une session sauvegardée existante. Sélectionnez un texte dans une conversation ou un aperçu de texte pris en charge. Dans un PDF, sélectionnez du texte ou utilisez son contrôle de sélection de région pour marquer la zone dont vous avez besoin.
2. Ouvrez le contrôle d'annotation de la sélection et choisissez **For me**.
3. Ajouter un **Note (optional)**, tel que -Cochez le dénominateur avant de comparer ces pourcentages.- Sélectionner **Bookmark**.
4. Ouvrez **Bookmarks** dans le Compositeur et validez l'entrée enregistrée. Sélectionnez-le pour vérifier qu'il retourne dans le passage prévu ou dans la région PDF.

Les signets deviennent disponibles après que la conversation a été enregistrée. Si le contrôle n'est pas disponible, retournez à une session existante avant d'essayer à nouveau. Tous les visionneurs intégrés ou ouverts à l'extérieur ne prennent pas en charge la sélection de texte pour les signets.

## Retourner, modifier ou supprimer {/* #return-edit-or-remove */}

Ouvrez la liste **Bookmarks** de la session et sélectionnez une entrée, ou utilisez **Show bookmark source**. Pour un fichier géré, le signet rouvre la version de fichier enregistrée qu'il renvoie. Vérifiez la page, le passage et la version lors de la comparaison avec un résultat plus récent.

Choisissez **Edit bookmark note** dans la liste ou le marqueur persistant à côté du passage, modifiez la note et sélectionnez **Save**. **Cancel** laisse la note sauvegardée inchangée. **Delete bookmark** supprime le signet de lecture; il ne supprime pas le message source ou le fichier.

Si la source n'est pas disponible ou si son emplacement exact ne peut pas être trouvé, utilisez le message affiché pour distinguer ces cas. Localiser la source manuellement avant de remplacer le signet; ne présumez pas que le texte visible le plus proche est la sélection originale.

## Ce qui reste privé et ce qui est partagé {/* #what-stays-private-and-what-is-shared */}

- Les signets et les notes persistent lorsque vous rouvrez la session après le redémarrage de l'application.
- Ils appartiennent à cette session. Ils ne transfèrent pas vers une autre branche ou synchronisent entre les machines, et la suppression de la session supprime ses signets.
- [Paquets de recherche .science](research-packages.md) exclut ces signets privés. Mettre l'information dont un collègue a besoin dans un rapport sauvegardé ou dans la conversation avant de préparer un transfert.
- Pour poser des questions à l'agent sur un passage, utilisez **To Agent** et examinez l'annotation dans le brouillon prévu avant d'envoyer. Le déplacement des annotations entre Main et une discussion parallèle est couvert dans [Side Chat](delegation.md).

## Signets dans une fourchette {/* #bookmarks-in-fork */}

Depuis v0.31.0, [Fourche](sessions.md#fork-session) copie des signets et des notes privés dans la nouvelle session avec de nouvelles identités. Les modifications ultérieures dans la copie ne modifient pas les signets sources. Ceci est différent de la commutation de branches ou de l'exportation d'un fichier `.science` : les signets privés ne rejoignent toujours pas les exportations de paquets ou ne se synchronisent pas entre les machines.
