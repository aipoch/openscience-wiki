---
title: "Extrait d'un tableau des preuves documentaires"
last_update:
  date: '2026-09-17'
---

# Extrait d'un tableau des preuves documentaires {/* #extract-a-literature-evidence-table */}

<p className="example-label"><strong>Exemple pratique</strong> Dix essais sur les masques et les infections respiratoires</p>

Ce flux de travail commence par un ensemble défini de dix documents et se termine par un tableau d'éléments de preuve liés à la source et une note d'incertitude. Il démontre l'extraction pour une revue de la littérature sur la santé publique. L'ensemble fourni est une sélection d'enseignants, pas une recherche complète ou un examen systématique complété.

## Préparer un ensemble de sources délimité {/* #prepare-a-bounded-source-set */}

Téléchargez le <a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>Liste des sources de dix documents</a>. Il comprend DOI, PMCID et des liens texte intégral originaux pour les essais communautaires, domestiques et de soins de santé. Obtenir et lire les sources selon les modalités d'accès indiquées.

Pour la même entrée de texte utilisée dans cet exemple, téléchargez le <a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>script de préparation de la source</a> et exécutez-le avec Python 3 dans un dossier de travail local :

```bash
python3 prepare-mask-sources.py
```

Le script télécharge ces dix enregistrements XML d'Europe PMC, conserve l'identité source, les titres de section et les tableaux, et crée **mask-trials-fulltext.md**. Il signale un échec au lieu d'omettre silencieusement une étude. Les textes originaux ne sont pas redistribués avec le Wiki. Si un téléchargement échoue, obtenir ce papier par le biais de son lien source avant de traiter l'ensemble comme complet.

Dans un projet Open-Science, sélectionnez un modèle de travail et joignez le fichier Markdown résultant avec **+ → Attach files**. Vérifiez que la liste des sources contient dix études distinctes. La version texte aide à l'extraction; retour à l'article original pour la mise en page, les figures ou la structure ambiguë du tableau.

Cliquez sur la pièce jointe pour ouvrir son aperçu. Chaque étude commence par un titre, DOI et un lien source original, suivi par un texte et des tableaux de section. Correspondez à ces dix identités à la liste des sources; ne comptent pas les titres répétés comme des études supplémentaires.

![Le paquet texte intégral joint conserve l'identité de la source et les sections d'article](/img/open-science/research-workflows/mask-trials-input.webp)

Avant d'utiliser un papier comme preuve, vérifiez les corrections ou les rétractations à sa source. À partir v0.30.2, les `literature-review` Skill's `verify_dois` helper vérifie les relations de mise à jour de Crossref dans les deux sens. `retracted: true` peut identifier un papier rétracté ou un avis de rétractation; Inspectez la relation liée. `false` signifie qu'aucun marqueur vérifié n'a été trouvé, et non une preuve que le papier n'a jamais été rétracté.

## Demander une rangée par essai {/* #ask-for-one-row-per-trial */}

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

Autoriser les demandes de lecture de source prévues. Vérifiez que l'agent atteint les dix sections d'étude, plutôt que d'utiliser seulement le premier résumé ou en supposant que les papiers intitulés de la même façon sont des duplicatas.

## Examiner les éléments de preuve extraits {/* #review-the-extracted-evidence */}

Ouvrez le CSV après la réponse complète. Comparez ses dix valeurs DOI avec la liste des sources, puis vérifiez la population d'estimation et d'analyse rapportée par rapport à la section ou au tableau des résultats de chaque article.

![Le tableau des preuves à dix procès dans Open-Science](/img/open-science/research-workflows/mask-trials-evidence.webp)

Accordez une attention particulière à ces distinctions :

- **Unité de randomisation:** un village, un ménage, une tente ou un service hospitalier n'est pas un participant randomisé.
- La séroprévalence symptomatique **Résultat :**, l'infection confirmée en laboratoire et la maladie grippale sont des paramètres différents.
- **Analyse:** un résultat de sous-groupe basé sur l'adhésion ou d'intervention précoce doit rester séparé de la comparaison randomisée principale.
- **Incertitude :** conservez les intervalles de confiance et les résultats non concluants. Une estimation statistiquement non significative ne prouve pas l’absence d’effet.

Utilisez les <a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>exemple de tableau de preuve</a> et <a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>Note de synthèse</a> pour inspecter le format. Il s ' agit de documents de base à examiner; l'interprétation scientifique dépend toujours des sources originales, de la qualité de l'étude et de la question à laquelle vous avez l'intention de répondre.

Ouvrez **mask-trials-reading-notes.md** ainsi que le CSV. Cette table finale est **Lignes 10 · Colonnes 12**. Élargir un aperçu ou télécharger le fichier pour lire les cellules longues; les cellules tronquées ne manquent pas de texte source. Les notes conservent les dix identités de l'étude et expliquent pourquoi leurs résultats et leurs populations ne devraient pas être regroupés automatiquement.

![Les notes de lecture enregistrées et la sortie de dix lignes terminées](/img/open-science/research-workflows/mask-trials-notes.webp)

Lorsqu'une ligne est incorrecte ou incomplète, nommez l'étude et la section/table source exacte, demandez une révision des fichiers **les deux**, puis rouvrez-les. Par exemple, gardez le flux randomisé de ménage de Cowling 2008.S séparé de son sous-ensemble analysé. Mettre à jour une réponse en prose ne met pas à jour la table enregistrée.

## Poursuivre l'examen {/* #continue-toward-a-review */}

Sauvegardez le tableau examiné avec ses sources et ses décisions d'extraction. Un examen officiel nécessite également une recherche documentée, des critères d'admissibilité, un examen préalable, une extraction en double et une évaluation appropriée du biais. Voir [le flux de travail de la liste de lecture](core-reading-list.md) pour la vérification de la source et [contrôle de la réclamation](pdf-evidence.md) lorsqu'une conclusion nécessite une inspection plus approfondie.
