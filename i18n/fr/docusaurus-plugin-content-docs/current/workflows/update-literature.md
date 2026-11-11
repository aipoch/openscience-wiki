---
title: "Mettre à jour une collection de littérature existante"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Mettre à jour une collection de littérature existante {/* #update-an-existing-literature-collection */}

<p className="example-label"><strong>Exemple pratique</strong> Transport en microplastique d'eau douce sur deux fenêtres de publication</p>

Une mise à jour devrait conserver la règle de recherche originale et montrer exactement ce qui a été ajouté. Ce replay historique construit d'abord une collection **2020–2022**, puis recherche **2023–2025** avec les mêmes requêtes et filtres. La bibliothèque actuelle se développe à partir de **Références 7 à 14**. Il s'agit d'une recherche manuelle, limitée; il n'est pas prévu de surveillance ou d'examen exhaustif.

## 1. Définir et enregistrer la base de référence {/* #1-define-and-save-the-baseline */}

Ouvrez un projet avec un modèle connecté. Activez **Graphique de littérature** dans **Resource center → Connectors** et configurez OpenAlex si nécessaire. Envoyer :

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

Cette exécution a retourné **12 des allumettes 3,643**, conservé **7** et exclu **5**. Ouvrez **freshwater-search-plan.md** pour vérifier les critères et les dates avant de continuer. Le plan sauvegardé décrit l'état avant la mise à jour.

![Spécification de la recherche de base sauvegardée et enregistrements conservés](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

Examiner le niveau de preuve : certains candidats n'ont fourni que des titres/métadonnées, tandis que d'autres ont inclus un résumé autorisé par licence. Les grandes revues des voies de transport sont incluses dans le contexte; leur inclusion ne constitue pas un résultat expérimental spécifique à l'eau douce.

## 2. Créer et peupler la collection {/* #2-create-and-populate-the-collection */}

Télécharger <ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">le SIF de référence</ExampleDownload>. Dans **Library → New collection**, créez **Transport en eau douce Microplastique**, sélectionnez-le, puis choisissez **Import references**. Sélectionnez le RIS et vérifiez la destination et le comportement correspondant avant d'importer.

![Aperçu des importations de base pour la collection nommée](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

L'importation enregistrée est complétée par **7 Created, 0 réutilisé, 0 Skipped, 0 échoué**. Cliquez sur **Done** et confirmez que la collection a sept références. Les correspondances existantes dans une autre bibliothèque peuvent changer la division créée/réutilisée.

![La collecte de référence de sept références](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. Recherchez la fenêtre suivante dans la même conversation {/* #3-search-the-next-date-window-in-the-same-conversation */}

Retournez à la conversation du projet. Gardez les fichiers de base inchangés et demandez une comparaison explicite:

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

Cette mise à jour a retourné **12 des allumettes 7,600**, avec **Ajouts de 7, chevauchements de référence de 0 et exclusions de 5**. Les deux recherches sont tronquées aux candidats 12. Le classement et la couverture des bases de données peuvent changer; les nombres décrivent la course de septembre 16, 2026.

![Vérification de mise à jour sauvegardée avec ajouts et exclusions](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

Vérifiez les ensembles DOI réels plutôt que de soustraire les totaux. Enregistrez les <ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">de l ' audit actualisé</ExampleDownload> et <ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">Mise à jour des notes</ExampleDownload> datées à côté de la ligne de base.

## 4. Importation d'additions dans la collection existante {/* #4-import-additions-into-the-existing-collection */}

Télécharger <ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">les ajouts RIS</ExampleDownload>. Sélectionnez **Transport en eau douce Microplastique** dans la bibliothèque et choisissez **Import references**. Gardez **Reuse existing reference** afin qu'un élément déjà présent puisse être réutilisé en toute sécurité.

![L'aperçu d'importation de mise à jour montrant sept ajouts](/img/open-science/workflow-extensions/freshwater-import-update.webp)

L'importation de mise à jour réelle est terminée avec **7 Created, 0 réutilisé, 0 Skipped, 0 échoué**. La collection contient désormais **Références 14**. Ceci est en accord avec l'union DOI normalisée des deux ensembles retenus.

![La collection mise à jour avec quatorze références](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

La ligne de base elle-même n'a pas été réécrite. Préservez sa plage de dates et son dossier de recherche afin que les lecteurs plus tard puissent distinguer la base de preuves originale de la mise à jour. Pour appuyer une proposition ou une revendication scientifique, récupérer et lire les textes complets pertinents ci-après; L'inclusion des métadonnées à elle seule n'est pas une évaluation des preuves. Pour les lots de requêtes qui se chevauchent, voir [combiner des lots de recherche](merge-literature-searches.md).

La copie d'audit téléchargeable omet les résumés complets et leurs champs de licence; les identificateurs, les décisions et les motifs sont conservés. Inspecter les résumés aux sources liées.
