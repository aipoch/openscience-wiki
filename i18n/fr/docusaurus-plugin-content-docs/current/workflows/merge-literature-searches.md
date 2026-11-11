---
title: "Combiner des lots de recherche de littérature"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Combiner des lots de recherche de littérature {/* #combine-literature-search-batches */}

<p className="example-label"><strong>Exemple pratique</strong> Interfaces et interphases d'électrolyte à l'état solide</p>

Deux recherches renvoient souvent des documents qui se chevauchent. Conserver la provenance de chaque recherche, sélectionner les candidats, puis importer les deux lots dans une seule collection avec réutilisation basée sur l'identificateur. Cet exemple récupère deux véritables lots OpenAlex, conserve huit enregistrements de chacun et se termine avec **15 références uniques** dans la bibliothèque. Il montre l ' organisation des métadonnées; aucun texte complet n'a été récupéré ou évalué.

## 1. Exécuter et enregistrer les deux recherches {/* #1-run-and-record-both-searches */}

Dans **Resource center → Connectors**, activez **Graphique de littérature** et configurez son justificatif OpenAlex si demandé. Ouvrez un projet, commencez une conversation et sélectionnez un modèle connecté. L'exécution enregistrée a utilisé Open-Science **0.30.1**, **Abonnement Codex / gpt-5.6-sol**. Aucune source PDF n'est nécessaire.

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

Inspectez l'activité réelle de Connector pour les requêtes, les dates et les nombres retournés. Les recherches enregistrées ont retourné **Candidats de 12 chacun**, à partir des totaux de **94,620** et **15,355**. Le plafond fait ces exemples limités, pas des examens exhaustifs. Les deux lots proviennent d'OpenAlex; deux formulations de requêtes ne font pas d'elles des bases de données indépendantes.

## 2. Inspecter les exportations avant l'importation {/* #2-inspect-the-exports-before-importing */}

Ouvrir **electrolyte-merged.csv** sous **Generated**. Vérifier les titres conservés, les DOI et l'adhésion à la source en fonction des deux exportations de SIF et de l'audit du candidat. L'union réelle a des lignes 15; DOI **10.1007/s41918-024-00212-1** se trouve dans les deux lots et est étiqueté **A-B**.

![L'union sauvegardée des deux lots de recherche, en conservant l'adhésion source](/img/open-science/workflow-extensions/batches-merged.webp)

Pour la comparaison, triez l'espace blanc DOI, supprimez un préfixe d'URL en option DOI et comparez la casse de manière insensible. Préserver les identifiants originaux dans l'enregistrement source. Des titres semblables ne sont pas suffisants pour prouver que deux documents sont identiques; Les conflits d'identificateurs non résolus doivent être examinés.

Télécharger <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">lot A</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">lot B</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">toutes les décisions des candidats 24</ExampleDownload> et <ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">l'union 15-row</ExampleDownload>. Ce sont les exportations de la série enregistrée.

## 3. Importer le premier lot dans une collection nommée {/* #3-import-the-first-batch-into-a-named-collection */}

1. Ouvrez **Library → New collection** et créez **Interfaces électrolytiques à l'état solide**.
2. Sélectionnez cette collection dans la barre latérale avant de choisir **Import references**.
3. Choisissez `electrolyte-batch-a.ris`. Vérifiez que **Import to** nomme la collection prévue.
4. Laisser **When identifiers match → Reuse existing reference** sélectionné. Inspectez **View details**, puis choisissez **Import references**.

![Aperçu de l'importation de premier lot : huit nouvelles références dans la collection sélectionnée](/img/open-science/workflow-extensions/batches-import-a.webp)

Dans la bibliothèque enregistrée, la première importation a été effectuée avec **8 Created, 0 réutilisé, 0 Skipped, 0 échoué**. Cliquez sur **Done** et vérifiez la collection. Si votre bibliothèque contient déjà des enregistrements correspondants, sa division créée/réutilisée peut différer.

## 4. Importer le deuxième lot et réutiliser le chevauchement {/* #4-import-the-second-batch-and-reuse-the-overlap */}

Avec la même collection sélectionnée, importez `electrolyte-batch-b.ris`. L'aperçu doit identifier les enregistrements existants avant de lancer l'importation. Dans cette course, il a montré **7 Nouvelles références, 1 existant, 0 dépassé**.

![L'aperçu du deuxième lot identifie le document partagé comme existant](/img/open-science/workflow-extensions/batches-import-b.webp)

Conserver **Reuse existing reference**, inspecter le titre partagé, puis importer. Lire le résumé de l'achèvement réel : **7 Created, 1 réutilisé, 0 Skipped, 0 échoué**. Réutiliser les métadonnées existantes et ajouter la référence correspondante à la destination; il ne crée pas une seconde copie ou ne télécharge pas un PDF.

![Deuxième importation terminée avec sept créations et une réutilisée](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. Vérifier la collecte résultante {/* #5-check-the-resulting-collection */}

Cliquez sur **Done**. La collection contient **Références 15**, en accord avec l'union DOI. Conservez les deux exportations originales et la provenance CSV afin qu'un collègue puisse reconstruire d'où viennent chaque candidat.

![La collection finale avec quinze références](/img/open-science/workflow-extensions/batches-collection.webp)

Une correspondance de comptage est une vérification utile, et non un remplacement pour inspecter le DOI et les titres représentatifs qui se chevauchent. Pour ajouter une fenêtre de publication ultérieure tout en préservant le niveau de référence, continuez avec [mettre à jour une collection de littérature existante](update-literature.md).
