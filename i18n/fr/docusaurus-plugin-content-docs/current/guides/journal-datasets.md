---
title: "Ensembles de données et attributs de référence"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Ensembles de données et attributs de référence {/* #journal-datasets-and-reference-attributes */}

Utilisez **Library → Journals** pour importer un répertoire de journaux, des métriques ou des classifications et les afficher à côté des références correspondantes. Un jeu de données conserve ses **Source** et **Metric year**. Open-Science ne fournit pas d'abonnement à une base de données de classement commercial; Importez les données que vous avez le droit d'utiliser et de conserver sa provenance. Les attributs de la revue décrivent la revue, et non la qualité ou les constatations d'un article.

## Préparer un petit ensemble de données {/* #prepare-dataset */}

<p className="example-label"><strong>Exemple pratique</strong> Ajouter les informations de l'éditeur aux documents existants</p>

Téléchargez le <ExampleDownload path="/examples/journals/journal-publisher-directory.csv">trois-journal CSV</ExampleDownload>. Il contient Nature Communications, PLOS Medicine et The BMJ, avec leurs ISSN électroniques, éditeurs et adresses de site Web. Les sources sont [Communications pour la nature](https://www.nature.com/ncomms/), [PLOS Médecine](https://journals.plos.org/plosmedicine/) et [Les renseignements sur l'abonné de la BMJ](https://www.bmj.com/about-bmj/resources-subscribers). Il s'agit d'un instantané éditeur-répertoire pour **2026**, avec des attributs textuels plutôt que des facteurs d'impact ou des quartiles inventés.

Pour une référence correspondante, utilisez le papier de Ju et al. **Comprendre l'activité et la sélectivité des catalyseurs de carbone dopés par l'azote métallique pour la réduction électrochimique du CO2**, DOI **10.1038(S41467-)017- Oui.01035-z**. S'il n'est pas déjà dans votre bibliothèque, [ajouter son enregistrement bibliographique](library.md) et vérifiez le journal et ISSN par rapport à la source. Vous n'avez pas besoin de son texte complet pour afficher les attributs de la revue.

Les paquets CSV, TSV, XLSX et journal sont pris en charge, jusqu'à **32 MB**. **Download template** fournit une mise en page de départ. Conserver les colonnes d'identité séparées des attributs; préserver les ISSN en tant que texte, y compris les tirets et tout X final.

## Importer et mapper les colonnes {/* #import-columns */}

1. Ouvrez **Library → Journals → Import attributes** ou cliquez sur la zone de téléchargement. Si des ensembles de données existent déjà, ouvrez le sélecteur **Journal dataset** et choisissez **New dataset**. Sélectionnez le CSV.
2. Vérifiez **Header row** et **Preview**. Ce fichier utilise la ligne **1** comme noms de colonnes. Utilisez **Transpose** seulement lorsque votre source a des revues disposées entre des colonnes.
3. Définissez **Source** à `Publisher websites` et **Metric year** à `2026`. Examen des valeurs suggérées : un nombre semblable à celui d'un an peut être confondu pendant un an. Pour un ensemble de données métriques réel, utilisez l'année que ses valeurs décrivent, qui peut différer de l'année de publication du fichier.
4. Cartez les quatre colonnes comme ci-dessous. Donner à chaque attribut enregistré un nom distinct; **Skip** laisse une colonne.
5. Sélectionnez **Review import**, cochez chaque ligne, puis **Import attributes**. Cet exemple montre **3 prêt; 0 a besoin d'attention**, suivi de **Journal attributes imported**.

| Colonne originale | Importer comme | Type de valeur |
| --- | --- | --- |
| Nom du journal | Nom du journal | Champ d'identité |
| ISSN | ISSN | Champ d'identité |
| Éditeur | attribut journal | Texte |
| Site Web du Journal | attribut journal | Texte |

![Cartographie de l'identité de la revue et des attributs de l'éditeur avec une source et une année explicites](/img/open-science/v0340/journal-column-mapping.webp)

**Abbreviation** et **External journal ID** sont des options d'identité supplémentaires. Un ID externe a besoin de son espace de noms; les identifiants de différents catalogues ne sont pas interchangeables. Les types d'attributs comprennent **Texte**, **Numéro**, **Single choice** et **Multiple choices**. Utiliser le numéro pour les mesures numériques, non pour les ISSN ou les quartiles catégoriques.

Les lignes peuvent être **Matched**, **New**, **Ambiguous match**, **Invalid** ou **Duplicate**. Vérifier les identifiants contradictoires et les lignes répétées avant l'importation. Retourner à **Edit mapping** pour fixer les rôles des colonnes; Exporter les lignes de problèmes ou sauter explicitement les lignes nécessitant une attention lorsqu'elles sont offertes. Une ligne marquée New crée une entrée de journal, pas un nouveau papier dans votre bibliographie.

## Affiche les attributs sur une référence {/* #show-attributes */}

1. Confirmez que l'ensemble de données sélectionné est **Sites web d'éditeurs 2026** et **Show in literature** est activé.
2. Retourner à **All references** et rechercher `Understanding activity`.
3. Ouvre le journal. Sous **Journal attributes**, vérifiez **Publisher → Springer Nature** et le site de la revue. Sélectionnez le contrôle d'information d'un attribut pour inspecter sa source/année.
4. Comparez le **ISSN 2041-1723** de la référence avec le journal importé. L'année de publication de l'article **2017** reste distincte de l'instantané **2026** de l'ensemble de données.

![Ensemble de données de la revue importée avec Show en littérature activé](/img/open-science/v0340/journal-dataset.webp)

![Attributs de l'éditeur sur la référence existante de Nature Communications](/img/open-science/v0340/journal-reference-attributes.webp)

**Show in literature** s'applique à l'ensemble de la bibliothèque partagée, des vues du projet, des collections et des détails de référence. Seul **un an par source** est affiché à la fois; permettre une autre année à partir de la même source remplace l'année précédente affichée. Les attributs manquants ne sont pas remplis de valeurs d'une année différente. Dans un tableau de référence, utilisez **Customize** pour choisir les colonnes de journal disponibles à afficher.

## Résoudre une correspondance de journal et maintenir l'ensemble de données {/* #journal-matches */}

Utilisez l'entrée des Journaux **More actions → Journal alignment** et **Vérifier la bibliothèque / Revérifier la bibliothèque** pour inspecter les dossiers appariés, non appariés et ambigus. Cette vérification lit la Bibliothèque; il ne réécrit pas silencieusement les métadonnées de référence. Confirmer les noms des revues et des ISSN par rapport à la publication originale avant de résoudre une inadéquation.

Lorsqu'elle est offerte, **Find journal candidates → Choose journal → Confirm journal association** lie la référence sélectionnée à la revue prévue. Elle s'applique à cette référence, et non à tous les documents portant un titre similaire. La suppression de la confirmation la renvoie à l'appariement automatique; modifier l'identité de la revue de référence peut invalider l'association.

Sélectionnez l'ensemble de données prévu avant d'utiliser **Update dataset**. Revoir la source, l'année et la cartographie, puis vérifier les références touchées après importation. Conservez les données d'une autre année comme un ensemble de données distinct plutôt que d'écraser son sens. Utilisez des actions de jeu de données pour modifier son nom/source/année ou exporter un bundle de journal, qui conserve les données et les paramètres de colonne. Conservez une copie du fichier source original et de ses conditions d'accès.
