---
title: "Modifier une présentation PowerPoint"
last_update:
  date: '2026-11-19'
---

# Modifier une présentation PowerPoint {/* #edit-a-powerpoint-presentation */}

Utilisez l'application de bureau pour ouvrir un `.pptx` dans l'aperçu du projet pour réviser le texte de diapositives et son formatage sans quitter Open-Science. Gardez l'original et examinez le résultat enregistré avant de le partager. Les fichiers `.ppt` hérités ne sont pas acheminés vers l'éditeur PPTX.

## Ouvrir et sélectionner le contenu de la diapositive {/* #open */}

1. Joindre un `.pptx` à la conversation et envoyer le message, ou ouvrir une présentation existante à partir des fichiers du projet. L'accès au navigateur offre un téléchargement lorsque l'aperçu Office du bureau n'est pas disponible.
2. Sélectionnez une diapositive dans l'aperçu. Lire le titre et le contenu existants avant d'éditer.
3. Cliquez sur l'action du crayon **Edit**. Double-cliquez sur l'élément texte que vous souhaitez modifier. Le texte qui fait partie d'une image aplatie n'est pas une zone de texte modifiable.

## Modifier le texte et enregistrer une version {/* #edit */}

Changez le texte et utilisez les commandes de police, bold, italic, soulignez, link et color. Choisissez **Apply**, inspectez l'ensemble de la diapositive pour détecter le débordement, couper le texte et changer de ligne, puis choisissez **Save** (l'action **Save changes**). Enregistrer crée une nouvelle version de fichier. L'éditeur préserve la structure OOXML de la présentation ; cela ne garantit pas que chaque effet PowerPoint avancé rendra identique.

<p className="example-label"><strong>Exemple pratique</strong> Clarifier le titre de la présentation du QC</p>

Ouvrez le [Présentation GSE60450 QC](/examples/gse60450/office/GSE60450-qc-overview.pptx). Changez son titre de première diapositive de `GSE60450 sample QC` à `GSE60450: descriptive sample QC`, puis appliquez et sauvez. Cette modification modifie le titre et non l'analyse sous-jacente.

![Modifier le texte du titre avec un aperçu en direct et appliquer le contrôle](/img/open-science/v130/pptx-edit.webp)

![Version 2 avec le titre révisé et l'original conservé dans l'historique de la version](/img/open-science/v130/pptx-history.webp)

Utilisez **Undo** ou **Redo** pour une modification locale non intentionnelle. La surface d'édition expose également les commandes de glissière et de forme telles que **Add text box**, **Add slide**, **Duplicate slide**, **Move slide earlier**, **Move slide later** et **Edit speaker notes**. Cochez la diapositive sélectionnée avant une modification structurelle.

Si l'Agent propose un changement de présentation, ouvrez **Review edits**, vérifiez la comparaison, puis choisissez **Accept** ou **Reject**. Une ébauche de **AI suggested edits** n'est pas une version acceptée. Si la source a changé pendant ce temps, recharger et examiner par rapport à la source actuelle avant d'appliquer la proposition.

## Comparer et exporter {/* #export */}

Ouvrez l'historique des versions pour inspecter les modifications enregistrées et comparer les versions prévues. Téléchargez la présentation que vous voulez partager, puis ouvrez-la dans votre logiciel de présentation. Vérifiez l'ordre des diapositives, les notes de haut-parleur, les polices, le placement des figures et les étiquettes de données. Gardez la [programme de recherche](research-packages.md) sous-jacente lorsque vos collègues ont besoin des preuves derrière les diapositives.

Pour les autres formats, voir [prévisualiser les fichiers](previews.md). Pour créer une image illustrative pour une diapositive, voir [génération d'images](image-generation.md).
