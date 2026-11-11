---
title: "Créer et partager un film de recherche"
last_update:
  date: '2026-11-11'
---

# Créer et partager un film de recherche

Transformez une conversation terminée en brève présentation pour une réunion de groupe ou une remise de projet. Open-Science construit le film à partir d'un disque gelé de la session et génère la narration en anglais localement. La création de films utilise toujours votre modèle configuré. Le résultat explique les travaux existants; il ne réexamine pas l'analyse et ne certifie pas ses conclusions.

## Préparer la session et la narration {/* #prepare-film */}

1. Utiliser **application de bureau** et ouvre la session et la branche que tu veux présenter. Finissez d'abord la réponse actuelle. Une session blanche ou une session en attente de réponse ne peut pas générer un film.
2. Vérifiez les entrées enregistrées, les résultats et les limitations. Retirer le matériel sensible de la source que vous avez l'intention de partager avant de commencer; examiner le film généré séparément avant de le distribuer.
3. Dans **Settings → Model**, confirmer un modèle principal compatible et des références de travail. Un abonnement Codex existant peut rester sélectionné avec l'exécution Codex.
4. Ouvrir **Local capabilities → Research narration → Install**. Attendez **Installed**. Ces ressources fournissent un langage anglais et sont réutilisées pour des films ultérieurs. Alternativement, la boîte de dialogue film offre **Install and generate** quand la narration est manquante.

Le moteur de parole fonctionne localement après l'installation, mais l'auteur de film basé sur le modèle utilise le fournisseur sélectionné. Gardez l'ordinateur en marche et suffisamment de stockage libre disponible pour les médias générés.

## Générer et regarder {/* #generate-film */}

1. Ouvrir **Session actions → Generate research film**. En replay, la même action est disponible sous **Autres actions**.
2. Lisez tout message de préparation. Résoudre un modèle manquant, un certificat ou une ressource de narration avant de réessayer. Si la narration est prête, la génération part de cette action.
3. Suivez les étapes de l'écriture et de la génération des médias. Vous pouvez fermer le dialogue pendant que la génération continue, puis rouvrir **View generation progress**. **Cancel** arrête le travail de film, pas la conversation source.
4. Quand **Research film ready** apparaît, vérifie le titre et la durée, puis choisit **Play research film**.
5. Regardez tout le film. Vérifiez les nombres, les unités, les explications, les visuels, la narration et les limites indiquées par rapport à la session source. Porter une attention particulière à la question de savoir si des exemples hypothétiques ou des résultats préliminaires sont encore décrits comme tels.

<p className="example-label"><strong>Exemple travaillé</strong> Expliquez un exemple d'enseignement à cinq chiffres</p>

Démarrer une conversation avec Codex et envoyer :

```text
In English, explain a small hypothetical teaching example: observations
are 2, 4, 6, 8, 10. Compute their mean and median, then explain in no more
than 200 words why this five-number example does not support a claim
about a real population. Do not use tools or create files.
Keep the numerical result explicit.
```

La réponse complète donne une moyenne et médiane de **6** et explique l'absence d'une population définie ou d'un plan d'échantillonnage. Vérifiez ces points avant de sélectionner **Generate research film**. C'est un exemple d'enseignement, pas une étude empirique.

![Recherche-production de films à partir d'une conversation d'enseignement terminée](/img/open-science/v120/film-progress.webp)

![Film de recherche prêt avec narration et lecture en anglais](/img/open-science/v120/film-ready.webp)

Dans v1.2.1, passer à une autre session n'arrête pas la génération de films. Gardez l'application en cours d'exécution et retournez à la session source **View generation progress** ou **View research film** pour inspecter le résultat. L'annulation explicite du travail de film arrête toujours la génération.

## Exporter un film examiné {/* #export-film */}

Ouvrez le lecteur généré dans l’aperçu. Choisissez **More actions → Download** pour enregistrer le lecteur HTML portable et le lire dans un navigateur. Pour créer un fichier vidéo, sélectionnez **Export MP4** dans l’aperçu. Si nécessaire, choisissez **Install and export**, puis une destination dans la boîte de dialogue d’enregistrement. Les ressources de narration et le composant d’exportation MP4 se téléchargent séparément.

Attendez que l'exportation finisse, puis rouvrez le fichier sauvegardé en dehors d'Open-Science. Vérifiez la lecture, le son, les légendes et la fin. L'annulation d'une boîte de dialogue de sauvegarde ne produit pas de fichier exporté. Conserver la session originale ou [`.science` programme de recherche](research-packages.md) lorsque les destinataires ont besoin d'inspecter les preuves sous-jacentes; un MP4 seul est une présentation.

![Lecteur de films de recherche et contrôle des exportations de MP4](/img/open-science/v120/film-player.webp)

## Régénérer ou récupérer {/* #film-recovery */}

- Si la génération vous demande de sélectionner un modèle ou de vérifier les identifiants, corrigez cette exigence dans **Settings → Model**, puis revenir à la session.
- Si le téléchargement de narration échoue, utilisez **Retry** et attendre **Installed** avant de générer à nouveau.
- Utilisation **View research film → Generate again** après avoir modifié la session ou lorsque le résultat nécessite une autre tentative. Confirmer la nouvelle génération; elle peut prendre plusieurs minutes et utiliser à nouveau la capacité du modèle.
- Utilisez la boîte de dialogue du film **More actions → Delete research film** Seulement quand vous voulez supprimer les fichiers de films locaux de cette branche. La confirmation explique que le contenu de la conversation et les copies enregistrées séparément sont conservés.

Voir [replay de session](session-replay.md) pour inspecter les étapes retenues et [reproductibilité](reproducibility.md) pour effectuer une vérification séparée.
