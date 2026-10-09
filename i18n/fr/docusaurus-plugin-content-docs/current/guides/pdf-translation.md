---
title: "Traduire un PDF complet"
last_update:
  date: '2026-10-09'
---

# Traduire un PDF complet {/* #translate-a-full-pdf */}

Lisez un article dans une autre langue tout en conservant l'original pour comparaison. **Full-text translation** prépare le texte du document, enregistre les paragraphes traduits au fur et à mesure que le travail progresse, et conserve les traductions sauvegardées avec le PDF géré. Il ne remplace pas le PDF original ni ne vérifie les conclusions du papier.

## Préparer le papier et le modèle {/* #prepare-translation */}

1. Obtenez le PDF complet et ouvrez-le à partir de [Bibliothèque](library.md), Lecture, Boîte de réception, une pièce jointe téléchargée ou un fichier sauvegardé. Une référence avec seulement des métadonnées ou un résumé n'est pas un texte complet PDF.
2. agrandir l'aperçu si nécessaire, puis choisir **Full-text translation** dans la barre d'outils PDF.
3. Choisissez **Prepare full text**. Attendez **Full text prepared** avant de commencer une traduction. Inspectez les pages originales si le texte est manquant ou si le PDF est scanné; la préparation ne garantit pas que chaque étiquette ou table de figure a été extraite.
4. Choisissez **Target language**, puis **Translation method** et **Model**. Utilisez un modèle offert comme disponible par le récupérateur.

| Méthode | Que configurer |
| --- | --- |
| **Agent** | un modèle d'agent disponible, ou **Main model** lorsqu'ils sont soutenus. Dans v0.36.0, les modèles d'abonnement Codex ne peuvent pas exécuter cette opération de traduction PDF. Sélectionnez un modèle de traduction compatible sans remplacer le modèle Main de la conversation. |
| **Direct API** | Un modèle API configuré et disponible. L'inscription à l'abonnement ne peut pas être utilisée comme titre de compétence direct API. Voir [configuration du fournisseur](providers.md). |
| **Local model**, lorsqu'il est offert | Installez le modèle à travers les commandes affichées et attendez qu'il soit prêt. La traduction locale exécute un paragraphe à la fois. |

Pour Agent et Direct API, le texte du document et le glossaire sont envoyés au modèle sélectionné. Vérifiez le service choisi avant de traduire du matériel restreint. La capture d'écran montre les commandes de préparation et de modèle; l'abonnement Codex sélectionné rend **Translate document** indisponible.

![Texte complet préparé, avec contrôle de la langue de traduction, des méthodes et des modèles](/img/open-science/v0360/translation-settings.webp)

Le papier photographié est Lang et al., [Catalyseur monoatome thermiquement stable non stabilisé par défaut](https://doi.org/10.1038/s41467-018-08136-3), sous licence [CC PAR 4.0](https://creativecommons.org/licenses/by/4.0/).

## Traduire et reprendre {/* #translate-resume */}

1. Ouvrez **Translation glossary** lorsqu'un terme technique a besoin d'un libellé cohérent. Ajouter un **Source term** et son **Preferred translation** avec **Add term**. Réviser ces termes avant de commencer.
2. Laissez **Advanced → Concurrent translations** à la première sortie par défaut. Plus de demandes simultanées peuvent rencontrer des limites pour les fournisseurs.
3. Choisissez **Translate document**. Surveillez le nombre de paragraphes traduits; un décompte partiel n'est pas un document rempli.
4. Pour interrompre, choisissez **Cancel**. Les paragraphes complétés sont conservés. Utilisez **Continue translation** pour reprendre le travail enregistré, ou **Retry** quand une erreur offre cette action. Lisez l'erreur d'un paragraphe avant d'utiliser **Skip and continue**, ce qui laisse un vide à examiner.
5. Réouvrez le même PDF géré et choisissez son édition en **Saved translations**. Vérifiez **Saved translation parameters** pour confirmer la langue et le modèle. Pour les changer, choisissez **New translation**, plutôt que de mélanger différents paramètres dans une réessayer.

Copies vérifiées de la même PDF partager les éditions sauvegardées dans Littérature, Lecture, Boîte de réception et Espace de travail. La correspondance d'un nom de fichier ou de DOI à lui seul n'établit pas un contenu identique. Ce partage local ne synchronise pas les traductions vers un autre ordinateur.

## Comparer et exporter {/* #compare-export */}

Utilisez **Original**, **Translation** et **Compare** pour inspecter la source et les pages traduites lorsque disponibles. Vérifiez les termes techniques, les négations, les quantités, les unités et les références de chiffres par rapport à l'original. Examiner **Translation issues** et tous les passages qui conservent le texte original; un compte de paragraphe traduit ne garantit pas que chaque passage corresponde à la page rendue.

Choisissez **Export translated PDF**, enregistrez une copie séparée, puis rouvrez-la dans un lecteur PDF. Vérifiez le nombre de pages et plusieurs pages de texte et de figure. Le contenu non traduit reste dans sa langue originale; certains passages conservent le texte original dans le PDF tandis que leurs traductions restent lisibles dans la barre latérale. Gardez l'original disponible pour les citations et l'interprétation scientifique.

| Si vous voyez | Étape suivante |
| --- | --- |
| **Préparez le texte intégral avant de traduire.** | Compléter la préparation et vérifier si les paragraphes admissibles ont été trouvés. |
| **Ce modèle par abonnement ne prend pas en charge la traduction de PDF. Sélectionnez un autre modèle.** | Choisir un modèle de traduction pris en charge; modifier le langage cible ne résoudra pas la compatibilité du modèle. |
| Limite de taux du fournisseur ou indisponibilité temporaire | Attendez, puis réessayez avec les mêmes paramètres enregistrés. Évitez de commencer les éditions dupliquées pour la même interruption. |
| Les progrès ne peuvent pas être sauvés | Réouvrez le PDF pour charger le dernier résultat enregistré avant de continuer. |

Utilisez [Annotations et notes de document PDF](pdf-notes.md) pour enregistrer les questions de lecture. La traduction et l'annotation sont des outils distincts.
