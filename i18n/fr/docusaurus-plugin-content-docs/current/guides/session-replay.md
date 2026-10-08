---
title: "Rejouer et discuter d'une session enregistrée"
last_update:
  date: '2026-10-08'
---

# Rejouer et discuter d'une session enregistrée {/* #replay-and-discuss-a-recorded-session */}

Le replay de session présente les messages, les étapes de l'outil et les versions de fichiers conservées dans une session. Utilisez-le pour suivre une analyse, localiser ses preuves et poser une question ciblée. Playback ne réexécute pas de code ou n'établit pas qu'une analyse est reproductible; Utilisez [vérification de la reproductibilité](reproducibility.md) pour cette tâche séparée.

## Ouvrir un replay {/* #open-replay */}

1. Ouvrez le menu d'action de la session dans la barre latérale et choisissez **View replay**. Pour une session `.science` importée, le panneau **Imported research history** fournit également **View replay**.
2. Vérifiez le titre et la branche de la session. Lorsque **Replay branch** est offert, sélectionnez la branche que vous comptez inspecter.
3. Utilisez **Enter full screen** pour plus d'espace. **Exit full screen** retourne dans l'espace de travail; fermer l'aperçu ne supprime pas la session.

La recherche importée reste en lecture seule. Vous pouvez l'inspecter et en discuter; choisissez **Fork to continue** si vous avez besoin d'une suite en écriture. Suivez [Importation de produits de recherche-emballage](research-packages.md#import-and-inspect-a-package) avant d'ouvrir son replay.

## Suivez les étapes enregistrées {/* #playback-controls */}

| Contrôle | Décision |
| --- | --- |
| Play replay / Pause replay | Démarrer ou arrêter la présentation de la séquence enregistrée |
| Previous step / Next step | Déplacement vers une étape adjacente enregistrée |
| Replay progress | Chercher un autre point dans l'enregistrement |
| Playback speed | Changer la vitesse de présentation; cela n'accélère pas un calcul |
| Browse steps | Sélectionnez un message, une étape d'outil ou un événement de version de fichier par son étiquette |
| Notebook / View files | Inspecter le matériel Notebook enregistré ou la liste de fichiers disponible à ce moment |
| Watch again | Redémarrer après que la lecture ait été terminée |

Étendre une carte d'outils pour lire les entrées et sorties retenues. Inspectez les noms de fichiers et les numéros de version avant d'utiliser un résultat. La position de replay est conservée pour revenir au même enregistrement. Des sessions plus anciennes peuvent montrer une chronologie reconstruite à partir de documents archivés; sa durée de présentation n'est pas une référence du calcul initial.

<p className="example-label"><strong>Exemple pratique</strong> Discuter des preuves dans une analyse de cheminement TP53</p>

Cet exemple ouvre le [Analyse Pathway Commons](../workflows/inspect-pathway.md) enregistré, qui a sélectionné Reactome **Règlement Transcription par TP53**. Son exportation contient des enregistrements d'interactions 3,318 et des nœuds 387. Ce sont les résultats de cette analyse sauvegardée, pas compte à attendre de chaque future requête.

Dans **Browse steps**, localisez le réseau exporté, les réponses originales, la note de recherche et la petite table d'interaction TP53–MDM2–CDKN1A. L'exemple a des étapes enregistrées par 12. Sélectionnez l'étape de la version de fichier de la table, puis lisez l'explication précédente de la portée du réseau.

![Le vrai TP53 rejoue avec ses étapes enregistrées, ses versions de fichiers et ses commandes de lecture](/img/open-science/v0350/replay-step-list.webp)

## Demandez un pas {/* #discuss-replay */}

1. Pause à l'étape pertinente et sélectionnez **Ask about this step**. Pour une discussion plus large, utilisez **Ask about this research** dans l'en-tête.
2. Dans **Ask in a conversation**, choisissez une conversation en écriture ou **New conversation**. Cette mesure ajoute un contexte à un projet; il n'envoie pas une question en soi.
3. Vérifiez la pièce jointe **Discuss** et son étiquette session/étape. Entrez votre question, choisissez un modèle connecté et sélectionnez **Send**. L'exemple utilise **Codex subscription**.
4. Si une approbation d'outil est demandée, inspecter l'accès proposé avant de permettre l'opération nécessaire. Ensuite, comparez la réponse avec la preuve sauvegardée et son contexte source.

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

La réponse identifie `tp53_mdm2_cdkn1a_readable_interactions.tsv` et distingue ce que l'exportation aplatie contient d'une conclusion biologique. Il indique la session source, la branche et l'étape sélectionnée. Lire à nouveau cette source avant d'adopter l'interprétation; un enregistrement lié ne rend pas chaque revendication modèle correcte.

![La discussion Codex terminée à côté de l'analyse TP53 enregistrée](/img/open-science/v0350/replay-answer.webp)

## Lorsque les preuves ne sont pas disponibles {/* #replay-evidence */}

Un appel d'outil enregistré peut rester visible même lorsque son environnement d'exécution original n'est pas disponible. Lire le code et la sortie retenus; ne traitez pas l'avertissement d'environnement comme un nouveau résultat d'exécution.

Si un fichier rapporte **Aperçu indisponible** ou **The recorded evidence is unavailable**, vérifiez la carte de fichier de la session originale et la version sélectionnée. Si cette vue ne peut pas aussi l'ouvrir, utilisez un fichier original conservé séparément ou obtenez un dossier de recherche complet de son auteur. Un nom de fichier et une timeline de lecture terminée ne prouvent pas que le contenu du fichier est disponible. Ne discutez que des preuves que vous pouvez réellement inspecter.

Pour un nouveau calcul, [Créer une branche de la session (Fork)](sessions.md#fork-session), fournissez les fichiers/environnement requis et exécutez l'analyse. Pour comparer une nouvelle exécution avec un artefact sauvegardé, utilisez [vérification de la reproductibilité](reproducibility.md), et non l'indicateur **Completed** du replay.
