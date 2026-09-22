---
title: "Bases de données scientifiques"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

# Bases de données scientifiques {/* #scientific-databases */}

Utilisez cette page pour choisir une source de données, comprendre ce qu'elle peut retourner et rendre ses outils disponibles en Open-Science. Pour des exemples de recherche étape par étape avec des captures d'écran et des fichiers de sortie, voir [Parcours de recherche](#database-workflows).

<span id="data-source-catalog" />

## Bases de données prises en charge {/* #supported-databases */}

Open-Science v0.32.0 comprend **Connecteurs source de données 23 avec opérations 251**. Le Molecule Connector séparé hors ligne ajoute deux opérations, apportant le registre complet à 253. Noms Connector ci-dessous correspondent à **Settings → Connectors**; Chaque famille peut exposer plusieurs bases de données. L'inscription d'une source ne signifie pas que toutes les fonctionnalités de son site Web sont disponibles.

| Connecteur | Sources | Opérations | Utilisez-le pour  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Chimie des petites molécules via PubChem, ChEBI, Rhea et BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papiers, auteurs, citations, mises à jour DOI et enregistrements dataset/software. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Littérature biomédicale par l'intermédiaire de l'E-utilities NCBI, du PMC ID Converter et d'Europe PMC — recherche, métadonnées, articles connexes, recherche de citation, conversion d'ID, texte intégral et copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 10 | Identificateurs de gènes/protéines, découverte de séquences UniProt, annotations GO et Reactome, et enrichissement de g:Profiler. |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST | 17 | annotation du génome, homologie et séquence; l'identification des taxons/ensembles/séquences de la BCNI; Présentation et rapports de BLAST. |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | Variantes génétiques humaines — fréquences/contraintes des populations de gnomAD, enregistrements/recherche ClinVar (PNEI directe), dbSNP, variantes structurales et mitochondriales.  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | Essais cliniques de ClinicalTrials.gov — recherche, détails, commanditaires, chercheurs, critères et admissibilité.  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | Bases de connaissances en génomique clinique : ClinGenations, preuves cliniques du CIVIC et plate-forme Open Targets.  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | Structures et interactions moléculaires — Structures PDB, prédictions AlphaFold, entrées EMDB cryo-EM, complexes de portails complexes, réseaux d'interactions IntAct.  |
| ChEMBL · `chembl` | ChEMBL | 6 | Composés bioactifs, médicaments, cibles, bioactivité et mécanismes via le ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | préimpressions bioRxiv/medRxiv — recherche par date/catégorie, métadonnées par DOI, liens de publication de revues, listes de bailleurs de fonds et statistiques des plates-formes.  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | Drugs@FDA applications, étiquettes et statistiques de corpus via openFDA.  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | Données probantes sur les associations génétiques humaines — Catalogue GWAS, catalogue eQTL et portails PheWeb PheWAS (FinnGen, BioBank Japan).  |
| Expression · `expression` | GTEx | 12 | Expression des tissus humains et eQTLs via le portail GTEx.  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | Architecture du domaine protéique, appartenance à la famille/clan, atlas d'expression et réseaux d'interaction via InterPro/Pfam, l'Atlas des protéines humaines et STRING.  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | L'étude de génomique du cancer enregistre par l'intermédiaire de cBioPortal REST API.  |
| RNA · `rna` | Rfam | 9 | Données sur les familles d'ARN non codantes (métadonnées, alignements, modèles, structures) via Rfam.  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | Expression, métabolomique, métagénomique et archives protéomiques; les stocks de découverte et de présentation FASTQ/ENA; Listes de fichiers PRIDE. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Identité de type cellulaire, gènes marqueurs, ensembles de données source et tissus via CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Génomique fonctionnelle de régulation génétique — expériences ENCODE/biosamples/files, profils de liaison JASPAR TF et UniBind ChIP-seq TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Recherche de financement-opportunité (Grants.gov) et recherche de catalogue d'anticorps (Registre des anticorps).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart requêtes d'attributs et traduction d'identificateurs.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 espace chimique purchasable (CartBlanche22) — recherche composée par ZINC id, recherche exacte/similaire de SMILES, résolution de code fournisseur, échantillonnage aléatoire, emplacements de structure 3D pour l'arrimage.  |

Les outils Molecule hors ligne sont couverts par [Vérificateurs scientifiques](viewers.md). Pour les opérations exactes exposées par chaque source de données, utilisez le [Référence de fonctionnement Connector](../reference/connector-operations.md).

<span id="choose-a-query-and-inspect-the-result" />

## Ce que vous pouvez faire {/* #database-capabilities */}

| Tâche de recherche | Commencez par | Sortie typique |
| --- | --- | --- |
| Trouver des papiers, des citations de traces et vérifier les relations DOI | Graphique de littérature, PubMed, bioRxiv | Documents documentaires, identifiants, liens de citation et disponibilité du texte intégral |
| Trouver des gènes ou des protéines et comparer des séquences | Genes & Ontologies, Génomes | Cartographie des identificateurs, enregistrements des protéines, rapports FASTA et BLAST |
| Découvrez les données omicales publiques et consultez les fichiers disponibles | Omics Archives | Étude/réalisation des métadonnées et des inventaires de fichiers avec l'emplacement des sources, la taille et les montants de contrôle disponibles |
| Interpréter une liste de gènes ou inspecter un réseau d'interaction | Genes & Ontologies, Annotation des protéines | Tableaux d'enrichissement, annotations d'ontologie et enregistrements réseau |
| Vérifier les variantes, l'expression et les preuves réglementaires | Variantes, génomique clinique, génétique humaine, expression, réglementation | Registres des sources avec organisme, tissu, base de référence et champs de données pertinents |
| Récupérer des dossiers composés, de structure ou d'étude clinique | Chimie, ChEMBL, Structures et Interactions, Essais cliniques | Identificateurs/propriétés chimiques, dossiers de structure et métadonnées d'essai |

Une réponse à une base de données peut appuyer une étape de recherche; il ne télécharge pas automatiquement les données, n'ajoute pas chaque papier à la bibliothèque de littérature ou n'effectue pas une analyse complète. Spécifiez quels enregistrements et fichiers vous souhaitez enregistrer.

## Connectez et commencez à utiliser une base de données {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. Activer le Connector intégré {/* #1-enable-the-built-in-connector */}

1. Ouvrez **Settings → Connectors** et recherchez la famille ci-dessus, comme **Omics Archives**.
2. Ouvrez ses détails et développez **Tools**. Lisez les entrées de l'opération choisie, les limites de résultats et les exigences des tiers.
3. Activer la disponibilité pour **Agent principal** et vérifier **Used by**. L'accès Specialist est configuré sur le Specialist individuel. Les politiques de disponibilité et d'approbation par outil sont des contrôles distincts.

![Omics Archives détails de l'outil montrant les entrées GEO et la portée des métadonnées seulement](/img/open-science/guides-walkthrough/36-omics-tools.webp)

Ces connecteurs sont construits dans; vous n'avez pas besoin d'ajouter un serveur personnalisé pour eux. Pour un service externe vous-même, consultez [configuration personnalisée de Connector](../guides/connectors.md). Un Connector listé ou activé n'est pas la preuve qu'une authentification ou une requête a réussi.

<span id="connect-openalex-and-follow-citation-links" />

### 2. Ajouter des identifiants lorsque l'opération les nécessite {/* #2-add-credentials-when-the-operation-requires-them */}

| Service ou état | Où le configurer |
| --- | --- |
| OpenAlex | **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**. Saisissez votre clé API, sélectionnez **Validate**, puis **Save** après validation. |
| Demandes directes de renseignements sur les variantes de l'ICNE nécessitant des coordonnées | **Settings → Connectors → Manage credentials → Literature access**. Remplir **Contact email** et sélectionner **Save**. Une clé NPCI API est facultative. |
| Une autre opération avec une exigence de justificatifs | Suivez les exigences de cet outil et [guide de vérification des pouvoirs](../guides/connectors.md). Reliez le titre de service au service prévu. |

Entrez les clés dans la forme de l'attestation, pas dans une demande de recherche ou un fichier de sortie partagé. Configurer les exigences pour l'opération sélectionnée; l'exigence relative au contact-email ci-dessus ne signifie pas que chaque outil de l'ICNE a la même exigence.

<span id="look-up-a-doi-and-its-related-research-records" />

Littérature Graph offre également `crossref_get_work`, `crossref_get_updates`, `datacite_search_records` et `datacite_get_record`. Ces quatre méthodes publiques ne nécessitent pas la clé OpenAlex. Pour les directions de citation d'OpenAlex, `openalex_citations` trouve des œuvres citant une oeuvre, tandis que `openalex_references` trouve les œuvres qu'il cite. [Littérature Paramètres du graphique](../reference/connector-operations.md#family-2).

<span id="start-with-one-known-identifier" />
<span id="actual-local-queries" />

### 3. Confirmer l'accès avec une petite requête {/* #3-confirm-access-with-a-small-query */}

Activez **Genes & Ontologies**, ouvrez une conversation avec un modèle connecté, et envoyez :

<p className="example-label"><strong>Exemple</strong> Vérifiez un identifiant de gène humain connu</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

Inspecter le résultat de l'outil. Pour les TP53 humains, vérifiez `query`, `symbol`, Entrez Gene **7157** et le nom **protéine tumorale p53**. Conservez plusieurs allumettes jusqu'à ce que vous ayez confirmé l'organisme et enregistré. Une requête réussie confirme cette opération particulière; il n'établit pas l'accès à toutes les sources. [Champs exacts](../reference/connector-operations.md#query_genes).

## Suivre un flux de travail de recherche {/* #database-workflows */}

Chaque article ci-dessous comprend les entrées, les étapes, les captures d'écran réelles d'interface anglaise et les sorties d'exemple téléchargeables.

<span id="ena-runs" />
<span id="omics-discovery" />

### Trouver des données omiques publiques {/* #find-public-omics-data */}

[Trouver des données omiques publiques et construire un inventaire de fichiers](../workflows/public-omics-data.md) : commencez par une exécution connue ou un sujet, inspectez les enregistrements ENA et PRIDE, et enregistrez les emplacements des sources et les comptes de contrôle. Le téléchargement des données reste une étape séparée.

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### Comparer une séquence protéique {/* #compare-a-protein-sequence */}

[Trouvez une séquence protéique et effectuez une recherche BLAST](../workflows/protein-sequence-search.md): récupérer UniProt FASTA, conserver l'ID de travail BLAST, puis inspecter les alignements, l'identité et la couverture de requête terminées.

<span id="gene-set-enrichment" />

### Analyser un ensemble de gènes candidats {/* #analyze-a-candidate-gene-set */}

[Exécuter l'enrichissement fonctionnel d'un ensemble de gènes candidats](../workflows/gene-set-enrichment.md) : choisissez l'organisme, les identifiants et l'arrière-plan, lancez g:Profiler, et interpréter les probabilités corrigées avec les versions source.

<span id="reference-genome" />

### Confirmer un génome de référence {/* #confirm-a-reference-genome */}

[Vérifier les espèces, le génome de référence et les identifiants chromosomiques](../workflows/reference-genome-check.md) : résoudre le taxon, l'assemblage en version et les alias chromosomiques avant de joindre les enregistrements.

Pour d'autres tâches, suivez [dossiers PubChem structurés](../workflows/database-records.md), [des données scientifiques croisées](../workflows/cross-check-records.md) ou [découverte de la littérature pour une réunion de groupe](../workflows/journal-club.md).

<span id="handle-a-returned-record-empty-match-or-error" />
<span id="empty-partial-and-failed-responses" />

## Utiliser correctement les données retournées {/* #database-limits */}

- Conserver la requête, la source, l'organisme, les tissus, les unités et les versions d'adhésion. Les dossiers de base de données, les prévisions et les résumés générés sont différents types de preuves.
- Vérifiez les nombres retournés, les drapeaux de pagination et de troncation avant de traiter une réponse comme complète. Zero correspond, une réponse partielle et une erreur de requête nécessitent différentes actions de suivi.
- Un inventaire de fichiers fournit des emplacements et des métadonnées. Le téléchargement d'octets, la vérification des bilans et l'analyse des données sont des opérations distinctes.
- Si une demande a besoin de justificatifs, remplissez le formulaire pertinent avant de réessayer. Pour les limites tarifaires, suivez le délai du service; pour les temps d'attente, réduire la taille de la demande. Voir [Dépannage](../guides/troubleshooting.md).

### Fréquences des populations et réseaux d'interaction {/* #string-network */}

Pour `get_variant`, définissez `include_populations: true` uniquement lorsque les détails de la population sont nécessaires. Conserver l'ensemble de données et la compilation de référence. Les observations de l'exome et du génome restent distinctes. Une valeur non disponible est `null`, pas zéro; les strates de population ou de sexe ne doivent pas être résumées. Ce sont des fréquences observées, et non des fréquences allèles filtrantes. [Paramètres de gnomAD](../reference/connector-operations.md#get_variant)

À partir de v0.31.0, `get_string_network.nodes` inclut des voisins retournés et des entrées cartographiques isolées. Une seule saisie cartographiée demande aux voisins; plusieurs entrées cartographiées ne sont pas développées. Filtrez `is_query` pour récupérer les nœuds d'entrée, et utilisez `queries` pour tous les alias cartographiés. `n_nodes` compte le graphique; `n_mapped` compte les mappages d'entrée. Mettre à jour les scripts qui ont assimilé les deux avant de les réutiliser. [Paramètres de la STRING](../reference/connector-operations.md#get_string_network)

<span id="find-operation-parameters" />

## Rechercher les paramètres d'exploitation {/* #operation-parameters */}

Les listes [Référence de fonctionnement Connector](../reference/connector-operations.md) contiennent les entrées requises, les valeurs autorisées et les appels exacts. Utilisez cette page pour choisir une source et la connecter; utiliser la référence pour les champs d'un outil particulier.

Source du catalogue: [catalogue.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/catalog.ts), [registre.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/registry.ts).
