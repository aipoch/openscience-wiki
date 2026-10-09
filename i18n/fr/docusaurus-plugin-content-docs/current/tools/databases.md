---
title: "Bases de données scientifiques"
toc_max_heading_level: 2
last_update:
  date: '2026-10-09'
---

# Bases de données scientifiques {/* #scientific-databases */}

Utilisez cette page pour choisir une source de données, comprendre ce qu'elle peut retourner et rendre ses outils disponibles en Open-Science. Pour des exemples de recherche étape par étape avec des captures d'écran et des fichiers de sortie, voir [Parcours de recherche](#database-workflows).

<span id="data-source-catalog" />

## Bases de données prises en charge {/* #supported-databases */}

Open-Science v0.36.0 comprend **Connecteurs source de données 34 avec opérations 347**. Le Molecule Connector séparé hors ligne ajoute deux opérations, apportant le registre complet à 349. Noms Connector ci-dessous correspondent à **Settings → Connectors**; Chaque famille peut exposer plusieurs bases de données. L'inscription d'une source ne signifie pas que toutes les fonctionnalités de son site Web sont disponibles.

| Connecteur | Sources | Opérations | Utilisez-le pour  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | Chimie des petites molécules via PubChem, ChEBI, Rhea et BindingDB.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papiers, auteurs, citations, mises à jour DOI et enregistrements dataset/software. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Littérature biomédicale par l'intermédiaire de l'E-utilities NCBI, du PMC ID Converter et d'Europe PMC — recherche, métadonnées, articles connexes, recherche de citation, conversion d'ID, texte intégral et copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler, Enrichr | 15 | Identificateurs de gènes/protéines, découverte de séquences UniProt, annotations GO et Réactome, et g:Profiler et enrichissement de la série de gènes Enrichr. |
| Génomes · `genomes` | Ensembl, UCSC, NCI, BLAST, Omega clustal | 22 | annotation du génome, homologie et séquence; l'identification des taxons/ensembles/séquences de la BCNI; Recherche BLAST et alignement de plusieurs séquences de Clustal Omega; Variantes LD et proxy propres à la population. |
| Variantes · `variants` | gnomAD, ClinVar, dbSNP, MaveDB | 21 | Fréquences des populations, dossiers cliniques et scores fonctionnels, cartes et expériences propres à chaque essai. |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | Essais cliniques de ClinicalTrials.gov — recherche, détails, commanditaires, chercheurs, critères et admissibilité.  |
| Génomique clinique · `clinical-genomics` | ClinGen, CIViC, cibles ouvertes, ClinPGx | 30 | Bases de connaissances en génomique clinique : ClinGenations, preuves cliniques du CIVIC et plateforme Open Targets, plus dossiers pharmacogénomiques ClinPGx. |
| Structures et interactions · `structures` | PDB, AlphaFold, EMDB, Portail complexe, IntAct | 17 | Structures et interactions moléculaires — Structures PDB, prédictions AlphaFold, entrées EMDB cryo-EM, complexes de portails complexes, réseaux d'interactions IntAct.  |
| ChEMBL · `chembl` | ChEMBL | 6 | Composés bioactifs, médicaments, cibles, bioactivité et mécanismes via le ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | préimpressions bioRxiv/medRxiv — recherche par date/catégorie, métadonnées par DOI, liens de publication de revues, listes de bailleurs de fonds et statistiques des plates-formes.  |
| Réglementation des médicaments · `drug-regulatory` | ouvertFDA | 10 | Médicaments@FDA, étiquettes, rapports d'événements indésirables FAERS et rappels de médicaments. |
| Génétique humaine · `human-genetics` | Catalogue GWAS, Catalogue eQTL, PheWeb | 15 | Données probantes sur les associations génétiques humaines — Catalogue GWAS, catalogue eQTL et portails PheWeb PheWAS (FinnGen, BioBank Japan).  |
| Expression · `expression` | GTEx, Bgee | 16 | expression des tissus humains GTEx et eQTL; Expression de base de Bgee pour les espèces croisées. |
| Annotation protéique · `protein-annotation` | InterPro, Pfam, Atlas des protéines humaines, STRING | 14 | Architecture du domaine protéique, appartenance à la famille/clan, atlas d'expression et réseaux d'interactions via InterPro/Pfam, l'Atlas des protéines humaines et STRING, y compris l'enrichissement des interactions réseau. |
| Modèles de cancer · `cancer-models` | cBioPortal | 10 | Études, mutations, nombre de copies, échantillons, patients, attributs cliniques et expression du profil moléculaire. |
| RNA · `rna` | Rfam | 9 | Données sur les familles d'ARN non codantes (métadonnées, alignements, modèles, structures) via Rfam.  |
| Archives Omics · `omics-archives` | ArrayExpress, GEO, MetaboLights, Metabolomics Workbench, MGnify, PRIDE, ENA | 28 | Étude et gestion des métadonnées et des répertoires de fichiers Omics; des échantillons, des facteurs, des analyses et des enregistrements composés. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Identité de type cellulaire, gènes marqueurs, ensembles de données source et tissus via CELLxGENE CellGuide.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | Génomique fonctionnelle de régulation génétique — expériences ENCODE/biosamples/files, profils de liaison JASPAR TF et UniBind ChIP-seq TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Recherche de financement-opportunité (Grants.gov) et recherche de catalogue d'anticorps (Registre des anticorps).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart requêtes d'attributs et traduction d'identificateurs.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 espace chimique purchasable (CartBlanche22) — recherche composée par ZINC id, recherche exacte/similaire de SMILES, résolution de code fournisseur, échantillonnage aléatoire, emplacements de structure 3D pour l'arrimage.  |
| GDC · `gdc` | NCI GDC | 5 | Projets, cas, métadonnées de fichiers, étiquettes ouvertes/contrôlées et manifestes de transfert pour le cancer; pas de subvention pour télécharger ou accéder. |
| Zenodo · `zenodo` | Zenodo | 2 | Ensemble de données, logiciels et découvertes de publications publics, métadonnées et inventaires de fichiers spécifiques à une version; pas de téléchargement. |
| HMMER · `hmmer` | EMBL-EBI HMMER3 | 3 | Recherche de protéines, de profils et d'alignements spécifiques au programme, état d'avancement et résultats. |
| InterProScan · `interproscan` | EMBL-EBI InterProScan | 3 | Soumettre des séquences de protéines, vérifier l'état d'emploi annotation et récupérer les rapports TSV. |
| Pathway Commons · `pathway-commons` | Pathway Commons / Reactome | 4 | Recherche de trajectoires, voies supérieures, requêtes de graphiques et exportations de sous-modèles BioPAX. |
| Alliance Genome Resources · `alliance` | Alliance des ressources génomiques | 8 | Les gènes humains et modèles-organismes, orthologues, modèles de maladies, phénotypes, allèles et expression. |
| CELLxGENE Discover · `cellxgene-discover` | CELLxGENE Discover | 9 | Collections et ensembles de données monocellulaires, versions publiées, formats de fichiers, tailles et URLs de téléchargement. |
| Cellosaurus · `cellosaurus` | Cellosaurus | 2 | Trouvez les noms de lignes cellulaires et les synonymes, puis inspectez l'identité d'adhésion et les annotations de qualité. |
| Monarch Initiative · `monarch` | Monarch Initiative | 2 | Les associations entre la maladie et le gène et le phénotype avec l'organisme et les preuves à l'appui. |
| IEDB · `iedb` | Base de données Imune Epitope | 8 | Epitopes, antigènes, tests sur cellules T, cellules B et MHC, preuves TCR/BCR et publications sources. |
| PDC · `pdc` | NCI Proteomic Data Commons | 4 | Les versions d'études sur le cancer-protéomique, les associations de spécimens et les métadonnées de fichiers quantitatifs; Aucun téléchargement. |

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

Pour la conversion de l'identificateur de lot, **Genes & Ontologies** ajoute `submit_uniprot_id_mapping`, `get_uniprot_id_mapping_status` et `get_uniprot_id_mapping_results`. Enregistrez l'ID de travail, sondagez au moins trois secondes d'intervalle, puis récupérer chaque page de résultat. Préserver des cartes à un à plusieurs et des `failed_ids` explicites; manquer d'une page ne signifie pas être inégalé. Le service accepte jusqu'à 100,000 identifiants et expire les résultats après sept jours. Voir [champs de cartographie exacts](../reference/connector-operations.md#submit_uniprot_id_mapping).

**Zenodo** expose les métadonnées des enregistrements publics sans authentification. Conservez l'identifiant d'enregistrement propre à la version et les champs d'accès/licence avec l'inventaire des fichiers. **GDC** expose les métadonnées publiques; un manifeste n'est pas une autorisation de téléchargement, et les fichiers contrôlés nécessitent une autorisation GDC. [Opérations de développement durable](../reference/connector-operations.md#family-24) · [Opérations Zenodo](../reference/connector-operations.md#family-25).

Une réponse à une base de données peut appuyer une étape de recherche; il ne télécharge pas automatiquement les données, n'ajoute pas chaque papier à la bibliothèque de littérature ou n'effectue pas une analyse complète. Spécifiez quels enregistrements et fichiers vous souhaitez enregistrer.

## Données monocellulaires, modélistes-organismes et variables-effets {/* #single-cell-model-organisms */}

Rechercher les entrées ci-dessous dans **Settings → Connectors**, activer la disponibilité pour **Agent principal**, puis décrire l'organisme, la question de recherche et les dossiers à conserver dans votre conversation. Ces nouvelles opérations lisent les données publiques sans serveur MCP personnalisé, clé API ou courriel de contact NBCI. D'autres services dans le même Connector peuvent avoir des exigences différentes.

| Entrée | Ce qu'il peut faire | Comment utiliser les résultats |
| --- | --- | --- |
| CELLxGENE Discover | Trouver des ensembles de données unicellulaires par organisme, tissu, maladie, test ou type de cellule; Inspecter les versions et les inventaires des fichiers | Les filtres en ontologie utilisent des étiquettes ou des ID exacts et sont combinés avec ET. Conserver dataset_version_id pour une publication fixe; dataset_id se résout dans la version actuelle. Retourne les URLs de téléchargement disponibles, sans télécharger de fichiers ou demander des matrices d'expression de recensement. Utilisez le CellGuide séparé pour les descriptions de type cellulaire et les marqueurs. |
| Alliance Genome Resources | Interroger les gènes humains, souris, rats, mouches, vers, zèbres, levures et grenouilles, orthologues, modèles de maladies, phénotypes et expression | Rechercher et confirmer l'organisme avant de suivre les ID de gènes retournés. Préserver les preuves et la rigueur orthologique; un phénotype modèle-organisme n'est pas une conclusion de maladie humaine. |
| Variantes → MaveDB | Trouver des ensembles de scores à effet variable, des méthodes d'essai, des pages de score CSV et des cartes existantes VRS | Gardez la URN, licence, méthodes d'essai et calibrage des scores. Les scores fonctionnels ne sont pas des classifications cliniques de pathogénicité. CSV utilise la pagination start/limit et le texte renvoyé doit encore être enregistré dans un fichier. La cartographie n'effectue pas de soulèvement. |
| Archives Omics → Metabolomics Workbench | Études de recherche; inspecter les échantillons, les facteurs, les analyses et les métabolites par accession à la ST; rechercher les structures composées et les références croisées | Choisir un résumé, des facteurs, une analyse ou des métabolites avec la section. Résoudre les noms des composés par l'intermédiaire de PubChem en premiers identifiants pris en charge. Ces opérations ne téléchargent pas de matrices de mesure brutes. |

Le filtrage et la pagination CELLxGENE fonctionnent localement sur le catalogue en amont récupéré pour chaque requête; le catalogue peut changer entre les requêtes. Utilisez les ID de version pour conserver une publication. Une taille de fichier non déclarée est -1, pas zéro octets. Préserver les valeurs manquantes et les définitions des essais dans les résultats MaveDB et Workbench.

Voir les entrées exactes pour [CELLxGENE Discover](../reference/connector-operations.md#family-30), [Alliance](../reference/connector-operations.md#family-29), [MaveDB](../reference/connector-operations.md#mavedb_search_score_sets) et [Metabolomics Workbench](../reference/connector-operations.md#workbench_search_studies).

## Lignes cellulaires, phénotypes et preuves immunitaires {/* #cell-lines-phenotypes-immunity */}

Activer **Cellosaurus**, **Monarch Initiative** ou **IEDB** dans **Settings → Connectors** et le rendre disponible sur **Agent principal**. Ces opérations interrogent les enregistrements publics sans serveur personnalisé ou clé API.

| Entrée | Que demander | Que préserver |
| --- | --- | --- |
| Cellosaurus | Recherche d'un nom/synonyme de ligne cellulaire, puis récupérer l'adhésion CVCL retournée ou RRID | Espèces, identités, synonymes et annotations de contamination/d'identification erronée. La recherche prend une phrase littérale, pas une requête brute Solr. Les annotations de qualité manquantes ne certifient pas la lignée cellulaire. |
| Monarch Initiative | Associations de phénotypes de maladies ou de gènes utilisant des CURIES canoniques, telles que MONDO:0007254 ou HGNC:11998 | Organisme, phénotype, source et preuve. Les alias ne sont pas automatiquement convertis; résoudre les identifiants d'abord. Une correspondance directe concerne une correspondance d'identificateur, et non une confirmation expérimentale. |
| IEDB | Epitopes ou antigènes, ou un dosage spécifique de cellules T, B ou MHC | Au moins un filtre biologique/de preuve est requis; La pagination seule est insuffisante. Utilisez soit antigen_iri ou uniprot_accession, pas les deux. Préserver la méthode d'essai, le résultat, les unités et la publication; une observation d'élution du MHC n'est pas une mesure d'affinité. |

Un enregistrement d'épitope/antigène agrégé peut combiner des observations issues de différentes expériences. Lorsque les filtres doivent être satisfaits par la même expérience, interrogez l'opération d'essai correspondante. Les allumettes zéro n'établissent pas de résultat biologique négatif. [Paramètres Cellosaurus](../reference/connector-operations.md#family-31) · [Paramètres du monarque](../reference/connector-operations.md#family-32) · [Paramètres IEDB](../reference/connector-operations.md#family-33).

## Trouver des matrices GEO et des structures assorties de séquences {/* #geo-matrices-pdb-sequences */}

**Omics Archives → geo_get_matrix_files** découvre les fichiers officiels de la série GEO Matrix et les fichiers de count/FPKM/TPM/annotation générés par NCI. Il retourne les emplacements des fichiers; il ne télécharge pas leurs octets. **geo_get_series** reste une recherche de métadonnées.

Après avoir obtenu une matrice, **geo_preflight_matrix** vérifie le texte déjà lu et décompressé jusqu'à 8 MiB. Il n'a pas d'accès au réseau ou au système de fichiers. Conservez les identifiants GSM et les métadonnées de la plate-forme afin que les échantillons puissent être mapés par ID plutôt que par colonne. Définir **Complète : faux** pour un aperçu; ne passez que **Complètement : true** pour l'ensemble du fichier. Un aperçu ne peut pas établir les dimensions du fichier entier. Ne pas alimenter une archive compressée, une matrice clairsemée ou un fichier HDF5 dans le vérificateur de texte. Voir [découverte de matrices](../reference/connector-operations.md#geo_get_matrix_files) et [texte avant vol](../reference/connector-operations.md#geo_preflight_matrix).

**Structures & Interactions → pdb_search_sequence** accepte une séquence protéique de résidus de 25–10,000, comme séquence brute ou un enregistrement FASTA. Les seuils d'identité et de couverture des requêtes sont des fractions de 0 à 1. La couverture de requête retournée décrit l'alignement à la requête; Ce n'est pas une couverture de structure expérimentale. Le total en amont précède le filtrage de la couverture locale, et un balayage limité peut omettre des correspondances ultérieures. L'opération trouve des enregistrements de structure sans télécharger les coordonnées. Voir [des entrées exactes et des limites de balayage](../reference/connector-operations.md#pdb_search_sequence).

## Connectez et commencez à utiliser une base de données {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. Activer le Connector intégré {/* #1-enable-the-built-in-connector */}

1. Ouvrez **Settings → Connectors** et recherchez la famille ci-dessus, comme **Omics Archives**.
2. Ouvrez ses détails et développez **Tools**. Lisez les entrées de l'opération choisie, les limites de résultats et les exigences des tiers.
3. Activer la disponibilité pour **Agent principal** et vérifier **Used by**. Utilisez **Manage access** sur la ressource pour ajuster les associations Main Agent et Specialist. Les politiques de disponibilité et d'approbation par outil sont des contrôles distincts.

![Omics Archives détails de l'outil montrant les entrées GEO et la portée des métadonnées seulement](/img/open-science/guides-walkthrough/36-omics-tools.webp)

Ces connecteurs sont construits dans; vous n'avez pas besoin d'ajouter un serveur personnalisé pour eux. Pour un service externe vous-même, consultez [configuration personnalisée de Connector](../guides/connectors.md). Un Connector listé ou activé n'est pas la preuve qu'une authentification ou une requête a réussi.

<span id="connect-openalex-and-follow-citation-links" />

### 2. Ajouter des identifiants lorsque l'opération les nécessite {/* #2-add-credentials-when-the-operation-requires-them */}

| Service ou état | Où le configurer |
| --- | --- |
| OpenAlex | Clé optionnelle. Pour en configurer un, ouvrez **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**, validez-le, puis enregistrez. |
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

### Inspecter un réseau de voies {/* #inspect-a-pathway-network */}

[Inspecter une voie et son réseau d'interaction](../workflows/inspect-pathway.md): trouver une voie Reactome humaine via Pathway Commons, préserver son URI retourné, exporter les interactions et distinguer un réseau sélectionné de la preuve de l'activité de voie.

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

Source du catalogue: [catalogue.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/catalog.ts), [registre.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/registry.ts).

## Recherches de séquences et alignement {/* #sequence-tools */}

**HMMER** fournit des recherches de séquence protéique, de profil HMM et d'alignement spécifiques au programme. Choisissez le programme et la base de données ensemble, conservez l'ID de travail, et récupérer les résultats seulement après **SUCCÈS**. [Opérations HMMER](../reference/connector-operations.md#family-26).

**InterProScan** supporte la soumission de séquences protéiques, l'état de travail et la recherche d'annotation TSV de v0.35.1. Suivez [Présentation de InterProScan](#interproscan-submit) pour la configuration et les étapes.

Le **Genomes → Clustal Omega** aligne au moins trois enregistrements uniques de protéines, d'ADN ou d'ARN FASTA. Configurez l'e-mail de contact demandé par le service, soumettez une fois, conservez l'ID de travail, puis vérifiez l'état et enregistrez l'alignement retourné. [Déroulement de l'alignement de plusieurs séquences](../workflows/multiple-sequence-alignment.md).

## Enrichr, STRING et ClinPGx {/* #enrichment-pharmacogenomics */}

- **Genes & Ontologies → Enrichr**: lister les bibliothèques actuelles, puis interroger l'enrichissement de gènes pour les fonctions, les facteurs de transcription, les perturbations, les médicaments, les maladies, les tissus ou les types de cellules. Sélectionnez une bibliothèque appropriée à l'organisme et questionnez, et conservez son nom, son arrière-plan et les valeurs P ajustées.
- **Protein Annotation → STRING**: vérifier si un réseau protéique a plus d'interactions que prévu à partir de son arrière-plan. Cela pose une question différente de la surreprésentation des voies; sa valeur réseau P n'est pas un test de parcours. Suivez le [flux de travail d'enrichissement de groupes génétiques](../workflows/gene-set-enrichment.md#enrichr-string).
- **Clinical Genomics → ClinPGx** : récupérer les annotations de médicaments, de gènes ou de variantes, les lignes directrices, les étiquettes réglementaires et les fréquences des populations. Résoudre d'abord les identificateurs, fournir les champs requis par l'opération et conserver les sources originales et les niveaux de preuves. Cette méthode permet de récupérer les dossiers de recherche; il ne produit pas automatiquement un plan de traitement individuel.

Activez le Connector correspondant à l'agent actif dans **Settings → Connectors**. Ces entrées intégrées ne nécessitent pas de serveur MCP personnalisé. Consultez le [Référence de l'opération](../reference/connector-operations.md) pour connaître les champs exacts et les exigences conditionnelles.

## Voies, expression et données cliniques {/* #pathway-expression-clinical */}

Activer la famille correspondante dans **Settings → Connectors**, puis indiquer à l'agent l'organisme, la source, les identifiants et la portée prévue. Ces ajouts utilisent des connecteurs intégrés; aucun serveur MCP personnalisé n'est requis.

| Entrée | Ce qu'il peut faire | Connexion et interprétation |
| --- | --- | --- |
| Pathway Commons | Les chemins de recherche, les chemins de recherche, les chemins de requêtes entre gènes ou l'exportation d'un sous-modèle | Fonction publique; conserver l'URI retourné, l'organisme et la source. Les requêtes graphiques diffèrent des tests d'enrichissement. Suivez la [flux de travail d'interaction de parcours](../workflows/inspect-pathway.md). |
| Expression → Bgee | Inter-espèces présentes/absentes, scores normalisés, requêtes SPARQL limitées et liens de téléchargement | Découvrez d'abord les espèces et conservez l'ID de taxonomie de la BCNI. SPARQL nécessite des gènes, des espèces et des tissus. Les appels de base sains de type sauvage ne sont pas une expression différentielle; les liens de téléchargement ne sont pas téléchargés. |
| Modèles de cancer → cBioPortal | Lister les échantillons/patients et demander les attributs cliniques ou l'expression de l'ARNm/protéine | Sélectionnez une étude, découvrez ses profils et choisissez la mesure/normalisation. les cartes d'identité de l'offre correspondant à l'échantillon clinique/au niveau du patient; les données moléculaires ont besoin de gènes explicites et exactement un de sample_ids ou sample_list_id. Les rangées manquantes ne sont pas des zéros. |
| Réglementation pharmaceutique → openFDA | Recherche/compte des rapports FAERS et rappels de médicaments de recherche | Dates et produits en vrac et conservation de l'information sur la troncation. Les dénombrements ne sont pas des données d'incidence ou de cause. Les seaux à plusieurs valeurs peuvent se chevaucher; leur somme n'est pas un total de rapports unique. |
| Archives Omics → MGnify | Lister les fichiers de résultats par l'adhésion à l'analyse MGYA | Retourne le type, la catégorie, l'URL en amont et la taille lorsque signalé. Aucun octet de fichier n'est téléchargé; Les tailles manquantes ou les URL restent nulles. |

Consultez le [Référence de fonctionnement Connector](../reference/connector-operations.md) pour connaître les champs, les conditions et les exemples requis.

## Trouver des fichiers de statistiques sommaires GWAS {/* #gwas-summary-statistics */}

Activer **Génétique humaine** pour Main dans **Settings → Connectors**. Demandez la découverte de statistiques sommaires avec le **Adhésion à GCST** de l'étude, et conservez les URLs de fichiers originales/harmonisées retournées, les métadonnées et le génome de référence déclaré. La recherche publique ne nécessite pas de clé API.

`gwas_get_summary_statistics` liste les fichiers d'étude et lit les métadonnées disponibles YAML; il ne télécharge pas les grandes tables d'association. Ses définitions de colonnes GWAS-SSF décrivent la norme, et non un en-tête de fichier inspecté. Téléchargez le fichier prévu séparément et vérifiez ses colonnes réelles, la construction du génome, l'effet allèle et les unités avant l'analyse. Les résultats significatifs des associations ne remplacent pas les statistiques sommaires complètes. [Paramètres et sortie](../reference/connector-operations.md#gwas_get_summary_statistics).

## Soumettre une séquence protéique à InterProScan {/* #interproscan-submit */}

1. Activer **InterProScan** pour Main dans **Settings → Connectors**. Dans **Settings → Credentials → Literature access**, enregistrez l'e-mail de contact valide utilisé pour les emplois EMBL-EBI; aucune clé API n'est requise.
2. Fournir une séquence protéique ou une protéine unique nommée FASTA enregistre et demande de soumission une fois. La séquence et le courriel de contact sont envoyés à EMBL-EBI. Une demande accepte jusqu'à 1,000 enregistrements, 10,000 résidus par séquence et un corps de requête encodé 4 MiB.
3. Conserver le **job_id** retourné. **SUBMITTED** avec **ready: false** est un reçu, pas un résultat d'annotation. Vérifier que **État** est séparé d'au moins dix secondes; le scrutin n'est pas automatique.
4. Après **FINISHED**, demandez **résultats** et enregistrez le TSV complet avant l'expiration du résultat distant. Une réponse sur la limite de récupération de 2 MiB échoue plutôt que de renvoyer silencieusement un rapport tronqué.
5. Vérifiez les identificateurs de protéines, les applications sources et les coordonnées inclusives basées sur 1. Les notes provenant de différentes applications membres ne sont pas interchangeables; aucun résultat ne prouve qu'une protéine manque de fonction.

Évitez la soumission de duplicata après un délai : récupérez d'abord un ID d'emploi connu. L'annulation d'une demande locale n'annule pas un emploi à distance soumis. Voir [paramètres de soumission, d'état et de résultats](../reference/connector-operations.md#family-27).

## Trouver des preuves TCR et BCR dans IEDB {/* #iedb-receptors */}

Activez **IEDB** pour Main et demandez **search_tcrs** ou **search_bcrs** avec au moins un filtre biologique ou de preuve. La pagination seule est insuffisante. Utiliser `sequence` pour la séquence **épitope**; Les séquences `chain1_cdr3` et `chain2_cdr3` du récepteur de filtre CDR3. Ces recherches publiques n'ont pas besoin de clé API.

Conservez l'ID du groupe récepteur, les chaînes, les ID d'essai déclarés et les publications sources. Les filtres d'hôte et de résultat s'appliquent aux groupes agrégés et peuvent être satisfaits par différentes expériences. Pour établir que les conditions se produisent dans le même essai, suivez les ID de l'essai rapportés dans l'opération d'essai correspondante et appliquez les filtres requis là-bas. La pagination couvre les groupes récepteurs, pas l'intégralité de chaque exportation intégrée. Ces dossiers sont des données probantes, et non une prédiction de la liaison des récepteurs. [Paramètres IEDB](../reference/connector-operations.md#family-33).

## Découvrez la protéomique du cancer avec PDC {/* #pdc */}

Activer **PDC** dans **Settings → Connectors**. Ses métadonnées publiques API n'ont pas besoin de clé API. Utilisez-le pour trouver des études et des versions, inspecter les dosages et les dénombrements des spécimens, cartographier les associations cas–échantillon–aliquotes et lister les fichiers quantitatifs tels que les rapports **Assemblage des protéines**. Il ne renvoie pas les données de traitement/de résultat ou de téléchargement des fichiers.

Commencez par une adhésion à l'étude comme `PDC000127`, ou des identifiants d'étude de recherche et des noms de version. La correspondance des mots clés PDC n'est pas un filtre clinique. Récupérer l'étude, puis utiliser son retour `study_id` UUID pour épingler les appels suivants; `pdc_study_id` sélectionne la dernière version. Fournir exactement un de ces sélecteurs.

Pour les listes de spécimens, les cas de dénombrements de pagination **en amont**; l'expansion des échantillons et des aliquotes peut produire plus de lignes que la limite de cas. Les pages par défaut du mode **locaux** ont reçu des associations et ont un plafond en amont de l'association 1,000. Une page locale finale ne s'avère pas complète lorsque ce plafond est atteint. Gardez séparément les ID PDC et les références externes GDC. Les listes de fichiers comprennent les noms, les tailles d'octets, les valeurs MD5 et les chemins de stockage; un chemin listé n'est pas une URL de téléchargement autorisée.

Voir [Opérations et pagination PDC](../reference/connector-operations.md#family-34). Avant de combiner les sources, vérifiez la version de l'étude, l'analyse, l'identité du spécimen et les exigences d'accès et de citation de chaque source.

## Vérifier LD spécifique à la population {/* #ensembl-ld */}

Activer **Genomes** dans **Settings → Connectors**. Ses outils Ensembl LD utilisent le public API sans clé. Fournir deux ID de variante pour `ensembl_ld_pairwise`, ou un pour `ensembl_ld_proxies`, ainsi que le nom complet de la population, comme `1000GENOMES:phase_3:KHV`. Les outils ne découvrent ni la population ni l'ascendance; choisir une population de référence appropriée à l'étude.

Rapport de résultats par paire r2 et D′. Les requêtes proxy par défaut à r2 ≥ 0.8 et un **500 kb fenêtre totale**, environ 250 kb de chaque côté. `max_records` capte la liste retournée après le tri, et non le travail en amont. Garder les métadonnées de la population et les récupérer avec le résultat; ce paramètre ne signale pas l'ensemble de référence ou la libération de Ensembl. Les résultats vides signifient qu'aucune donnée admissible n'a été retournée, et non pas LD. Le niveau élevé de LD n'établit ni causalité ni équivalence fonctionnelle. Voir [champs appariés](../reference/connector-operations.md#ensembl_ld_pairwise) et [champs proxy](../reference/connector-operations.md#ensembl_ld_proxies).
