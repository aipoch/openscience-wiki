---
title: "Bases de données scientifiques"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';


# Bases de données scientifiques {/* #scientific-databases */}

L'application regroupe **Connecteurs source de données 23**, plus un Molecule Connector séparé hors ligne. Le registre complet a **Opérations de l'outil 246** y compris les deux opérations de Molecule; le catalogue source de données ci-dessous couvre 244. Activez le Connector pertinent dans Paramètres, puis posez une question limitée avec le type d'identificateur correct.

<span id="actual-local-queries" />

## Catalogue source de données {/* #data-source-catalog */}

Choisissez par identifiant et question de recherche. La couverture par les sources diffère; consulter la référence de l'opération pour les champs exacts.

| Connecteur | Sources | Opérations | Utilisez-le pour  |
| --- | --- | --- | ---  |
| Chimie · `chemistry` | PubChem, Chebi, Rhea, RelidingDB | 12 | Chimie des petites molécules via PubChem, ChEBI, Rhea et BindingDB.  |
| Graphique Littérature · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | Papiers, auteurs, citations, mises à jour DOI et enregistrements dataset/software. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | Littérature biomédicale par l'intermédiaire de l'E-utilities NCBI, du PMC ID Converter et d'Europe PMC — recherche, métadonnées, articles connexes, recherche de citation, conversion d'ID, texte intégral et copyright.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 9 | L'identité des gènes/protéines et les termes ontologiques — mygene.info, UniProt, OLS4 ontologies, annotations GO, voies de réactome.  |
| Génomes · `genomes` | Ensembl, UCSC, BCNI | 14 | Annotation de génome, variantes, homologie, séquence et pistes de navigateur — Ensembl REST et le navigateur de génome UCSC.  |
| Variantes · `variants` | gnomAD, ClinVar, dbSNP | 15 | Variantes génétiques humaines — fréquences/contraintes des populations de gnomAD, enregistrements/recherche ClinVar (PNEI directe), dbSNP, variantes structurales et mitochondriales.  |
| Essais cliniques · `clinical-trials` | Essais cliniques.gov | 6 | Essais cliniques de ClinicalTrials.gov — recherche, détails, commanditaires, chercheurs, critères et admissibilité.  |
| Génomique clinique · `clinical-genomics` | ClinGen, CIViC, Objectifs ouverts | 20 | Bases de connaissances en génomique clinique : ClinGenations, preuves cliniques du CIVIC et plate-forme Open Targets.  |
| Structures et interactions · `structures` | PDB, AlphaFold, EMDB, Portail complexe, IntAct | 16 | Structures et interactions moléculaires — Structures PDB, prédictions AlphaFold, entrées EMDB cryo-EM, complexes de portails complexes, réseaux d'interactions IntAct.  |
| ChEMBL · `chembl` | CEMBL | 6 | Composés bioactifs, médicaments, cibles, bioactivité et mécanismes via le ChEMBL REST API.  |
| Produit intérieur brut `biorxiv` | Les résultats de l'analyse de la bioRxiv, medRxiv, ROR | 7 | préimpressions bioRxiv/medRxiv — recherche par date/catégorie, métadonnées par DOI, liens de publication de revues, listes de bailleurs de fonds et statistiques des plates-formes.  |
| Réglementation des médicaments · `drug-regulatory` | ouvertFDA | 7 | Drugs@FDA applications, étiquettes et statistiques de corpus via openFDA.  |
| Génétique humaine · `human-genetics` | Catalogue GWAS, Catalogue eQTL, PheWeb | 14 | Données probantes sur les associations génétiques humaines — Catalogue GWAS, catalogue eQTL et portails PheWeb PheWAS (FinnGen, BioBank Japan).  |
| Expression · `expression` | GTEx | 12 | Expression des tissus humains et eQTLs via le portail GTEx.  |
| Annotation protéique · `protein-annotation` | InterPro, Pfam, Atlas des protéines humaines, STRING | 13 | Architecture du domaine protéique, appartenance à la famille/clan, atlas d'expression et réseaux d'interaction via InterPro/Pfam, l'Atlas des protéines humaines et STRING.  |
| Modèles de cancer · `cancer-models` | cBioPortal | 6 | L'étude de génomique du cancer enregistre par l'intermédiaire de cBioPortal REST API.  |
| RNA · `rna` | Rfam | 9 | Données sur les familles d'ARN non codantes (métadonnées, alignements, modèles, structures) via Rfam.  |
| Archives Omics · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 19 | Archives de données Omics — expression (ArrayExpress, GEO), métabolomique (MetaboLights), métagénomique (MGnify) et protéomique (PRIDE).  |
| Guide des cellules · `cellguide` | CELLxGENE | 5 | Identité de type cellulaire, gènes marqueurs, ensembles de données source et tissus via CELLxGENE CellGuide.  |
| Règlement `regulation` | ENCODE, JASPAR, UniBind | 16 | Génomique fonctionnelle de régulation génétique — expériences ENCODE/biosamples/files, profils de liaison JASPAR TF et UniBind ChIP-seq TFBS.  |
| Ressources de recherche · `research-resources` | Grants.gov, Registre des anticorps | 5 | Recherche de financement-opportunité (Grants.gov) et recherche de catalogue d'anticorps (Registre des anticorps).  |
| BioMart · `biomart` | Ensembler BioMart | 8 | Ensembl BioMart requêtes d'attributs et traduction d'identificateurs.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 espace chimique purchasable (CartBlanche22) — recherche composée par ZINC id, recherche exacte/similaire de SMILES, résolution de code fournisseur, échantillonnage aléatoire, emplacements de structure 3D pour l'arrimage.  |

## Récupérer un document et vérifier son identité {/* #retrieve-a-record-and-verify-its-identity */}

1. Ouvrez **Settings → Connectors**, recherchez la source requise et confirmez la disponibilité de l'agent prévu.
2. Ouvrez ses détails. Lire **Tools**, entrées, exemple et exigences de tiers.
3. Fournir une requête/adhésion explicite et une limite de résultat. Conserver la question exacte lors de la création d'une collection de littérature ou d'un tableau de preuves.
4. Inspecter les identifiants retournés et les champs sources. Un résultat vide, un lot tronqué et une erreur sont des résultats différents.
5. Enregistrer les documents nécessaires dans le projet/bibliothèque délibérément. Une réponse à la recherche ne signifie pas automatiquement que tous les documents ont été ajoutés à la bibliothèque de littérature ou que des textes complets ont été téléchargés.

### Commencez par un identificateur connu {/* #start-with-one-known-identifier */}

<p className="example-label"><strong>Exemple pratique</strong> Résoudre l'identificateur du gène humain TP53</p>

Activez **Genes & Ontologies** et demandez : **Utilisez query_genes pour résoudre TP53 avec des scopes, symbols, species, symbols humains et champs,nom,entrezgene". Retourne la requête d'entrée et les enregistrements non appariés.** Dans cet exemple, l'enregistrement TP53 humain identifie Entrez Gene **7157** et le nom **protéine tumorale p53**. Vérifiez les `query` et `symbol` de l'enregistrement avant d'utiliser l'ID mappé. Un symbole peut renvoyer plusieurs allumettes, ainsi conserver tous les résultats jusqu'à ce que vous ayez confirmé l'organisme prévu et enregistrer. [Champs exacts](../reference/connector-operations.md#query_genes).

## Choisir une requête et inspecter le résultat {/* #choose-a-query-and-inspect-the-result */}

<p className="example-label"><strong>Exemple</strong> Enquêtes et réponses sur les bases de données Bounded</p>

Le tableau enregistre ces exemples de réponses; Les résultats de la requête en direct peuvent différer.

| Connector / outil | Entrée | Résultat observé |
| --- | --- | --- |
| Archives d'Omics / geo_get_series | `accessions: ["GSE60450"]` | des métadonnées de séries/échantillons avec des échantillons 12; La récupération des métadonnées n'a pas recalculé les chiffres téléchargés. |
| Genes / query_genes | TP53; la portée des symboles; humains | Entrez Gene ID 7157, symbole TP53, nom protéine tumorale p53. |
| PubMed / search_articles | GSE60450, maximum 2 | PMIDs 38059347 et 37306301. Ce sont des correspondances de requête, pas automatiquement la publication originale de l'ensemble de données. |
| Chimie / pubchem_search_compounds | Aspirine, CID maximal de 1 | CID 2244, formule C9H8O4 et poids moléculaire 180.16. |
| Littérature / openalex_search_works | `CRISPR base editing`; à partir de 2020; accès libre; 2 maximum | Deux notices de travail avec des identifiants OpenAlex, des champs sources et des drapeaux d'exhaustivité. |

### Connectez OpenAlex et suivez les liens de citation {/* #connect-openalex-and-follow-citation-links */}

1. Ouvrez **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**.
2. Saisissez votre clé API, sélectionnez **Validate**, puis **Save** après validation.
3. Rechercher un sujet avec une petite limite `max_records`. Vérifiez `n_records_returned` et `records_truncated` avant de décrire le résultat comme terminé.
4. Utilisez un ID de travail retourné avec `openalex_get_work`. Utilisez `openalex_citations` pour les papiers citant ce travail et `openalex_references` pour les œuvres qu'il cite. Ce sont des directions opposées.
5. Pour les recherches d'auteur, confirmez l'établissement et l'ORCID avant de récupérer un profil d'auteur. Utilisez un identifiant source ou ISSN pour désambiguer un nom de journal.

Voir le [Paramètres d'exploitation OpenAlex](../reference/connector-operations.md#openalex_search_works) pour les filtres et les champs retournés.

### Rechercher un DOI et ses dossiers de recherche connexes {/* #look-up-a-doi-and-its-related-research-records */}

Activez **Graphique de littérature**. Utilisez `crossref_get_work` pour les métadonnées de l'éditeur et `crossref_get_updates` pour les relations de correction/rétractation déposées. Utilisez `datacite_search_records` pour trouver les DOI dataset/software, puis `datacite_get_record` pour inspecter un enregistrement sélectionné. Ces quatre méthodes publiques ne nécessitent pas la clé OpenAlex. Vérifier l'identité DOI, la direction de la relation et les termes de réutilisation avant de télécharger ou de citer une ressource. Les champs exacts sont dans le [Référence de l'opération](../reference/connector-operations.md#family-2).

La recherche de séquence Rfam utilise maintenant le paramètre de lot officiel. Si une installation plus ancienne retourne l'erreur retraitée, mettez à jour l'application et réessayez l'opération prévue. Un travail en attente n'est pas une recherche complète sans succès.

## Gérer un enregistrement retourné, une correspondance vide ou une erreur {/* #handle-a-returned-record-empty-match-or-error */}

Inspectez l'état retourné avant d'utiliser un résultat. Utilisez le [Référence de l'opération](../reference/connector-operations.md) pour interpréter les champs et les drapeaux d'exhaustivité.

| Résultat observé | Que faire ensuite |
| --- | --- |
| `found: false`, zéro enregistrement, enquêteurs vides ou correspondances avec les fournisseurs | Vérifiez l'identificateur, l'organisme, le champ de requête et les filtres. Préserver le résultat vide; ne le présente pas comme un enregistrement récupéré. |
| `credential_required` pour OpenAlex | Ouvrez le formulaire d'attestation demandé et liez votre propre clé avant de réessayer. |
| `contact_email_required` pour les requêtes de variantes directes de la BCNI | Ouvert **Settings → Connectors → Manage credentials → Literature access**, entrez **Contact email** et sélectionner **Save**. Réessayez la requête ratée. Une clé NPCI API est optionnelle. Vérifiez les identifiants retournés, les numéros de correspondance et les drapeaux de troncation; un résultat vide est distinct d'une erreur de connexion. |
| HTTP `410` d ' eQTL | Conserver l'URL source, le fonctionnement et la réponse, et vérifier la disponibilité du service avant de modifier les entrées scientifiques. |
| Demande Connector timed out après `30000ms` | Réessayez une demande plus petite. Augmenter seulement le délai de sortie externe de Notebook ne modifie pas la date limite de Connector. |
| L'exécution de Notebook a été programmée après `60000ms` | L'exécution s'est terminée sans résultat. - Réessayer les opérations individuellement; ne pas déduire que chaque service en amont a échoué. |
| page de maintenance de BioMart HTML; PRIDE `Unexpected end of JSON input` | La réponse structurée attendue n'était pas disponible. Réessayez plus tard et gardez le type de réponse/erreur pour un problème. |
| La tâche ZINC n'a pas été achevée à temps | Préserver l'URL de la tâche/du résultat retourné et vérifier cette tâche; à plusieurs reprises, la création de nouveaux emplois ne récupère pas son résultat. |

Pour un rapport, joignez l'opération, entrée limitée, texte d'erreur et timestamp par [Dépannage](../guides/troubleshooting.md). Supprimer les identifiants et les données privées avant de partager.

## Résoudre les fichiers ENA et FASTQ {/* #ena-runs */}

1. Activez **Omics Archives** sous **Settings → Connectors**. Fournir une adhésion publique ENA/INSDC à `ena_search_runs`, comme une étude PRJ ou une RRS. Un identifiant GEO `GSE` doit d'abord être lié à son étude INSDC; Les mots clés ne sont pas acceptés.
2. Inspecter `run_accession`, organisme, stratégie/mise en page de la bibliothèque et `truncated`. Le maximum est de 1,000. Il n'y a pas de jeton de compensation ou de continuation; limiter l'adhésion si la réponse est tronquée.
3. Pass one renvoyé run à `ena_get_run_files`. Vérifiez `found`, `fastq_available` et chaque entrée dans `fastq_files`. L'inventaire fournit URL, taille de fichier compressé et en amont MD5; il ne télécharge pas les fichiers ou ne vérifie pas leur contenu.
4. Avant un téléchargement séparé, vérifiez le stockage et conservez le manifeste. Vérifier les octets téléchargés par rapport au total de contrôle indiqué. Une bibliothèque jumelée n'a pas besoin d'avoir exactement deux fichiers; ne pas déduire l'identité de son compagnon de lecture à partir de `file_index`.

<p className="example-label"><strong>Exemple pratique</strong> Construire un manifeste de fichiers pour SRR037073</p>

Cet exemple v0.31.1 utilise **Codex subscription** et **Omics Archives** Connector activés. Ouvrez une session avec un exécut temps Notebook disponible, puis envoyez :

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

Ouvrez les notes générées. La recherche réelle a renvoyé **Exécution de 1**, **Caenorhabditis elegans**, étude **PRJNA123835**, **RNA-Seq**, **SINGLE**, avec `truncated: false`. Confirmez l'organisme et la mise en page avant d'utiliser ses fichiers.

![Entrées de requête ENA, exécutez les drapeaux d'identité et d'exhaustivité dans les notes générées](/img/open-science/v0311/ena-notes.webp)

Ouvrez le CSV et comparez-le avec `ena-files.json`. Cette exécution a `found: true`, `fastq_available: true` et **Fichier 1**, taille **octets 25,154,397**. Le manifeste conserve son URL FTP et en amont MD5. Copier la valeur complète du fichier téléchargeable si une colonne de prévisualisation est coupée.

![Manifeste réel en un seul fichier ENA avec URL, taille et somme de contrôle en amont](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Demandes de renseignements</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">manifeste FASTQ</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">Exécuter la réponse</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">Réponse du fichier</ExampleDownload>

Les deux requêtes et la génération du manifeste ont abouti. **Aucun fichier FASTQ n’a été téléchargé ni vérifié par somme de contrôle** dans cet exemple. Le téléchargement constitue une étape distincte. [Paramètres exacts](../reference/connector-operations.md#ena_search_runs)

## Exécuter et inspecter l'enrichissement de gènes {/* #gene-set-enrichment */}

<p className="example-label"><strong>Exemple pratique</strong> Liste de gènes de dommages à l'ADN humain choisi intentionnellement</p>

Cet exemple de v0.31.1 utilise des symboles de gènes publics 11 pour démontrer g:Profiler. Ils ont été choisis pour leurs rôles biologiques connus, donc l'enrichissement est attendu. Ce ne sont pas des résultats d'expression différentielle du projet GSE60450 ou des preuves d'une découverte impartiale.

1. Dans **Settings → Connectors**, rendre **Genes & Ontologies** disponible à l'agent. Ouvrez une session avec un modèle connecté et un exécut temps Notebook disponible.
2. Préciser l'organisme, les identificateurs de gènes, les sources de données et le contexte statistique. Pour de vraies données expérimentales, justifier le contexte à l'aide de gènes qui auraient pu être sélectionnés par l'expérience. Ce tutoriel utilise explicitement tous les gènes annotés, et non un univers personnalisé de gènes mesurés.
3. Envoyez l'invite suivante. Gardez la requête source-version et l'appel d'enrichissement dans la même session et enregistrez leurs résultats réels.

```text
Use Genes & Ontologies through Session Notebook for an English g:Profiler
tutorial. The deliberately selected gene list is TP53, ATM, ATR, CHEK1,
CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
First call list_enrichment_sources with organism hsapiens.
Then call enrich_gene_set with these genes, organism hsapiens,
sources GO:BP and REAC, domain_scope annotated,
correction_method fdr, and user_threshold 0.05.
Save the full response as dna-damage-enrichment.json, all returned terms
as dna-damage-enrichment.csv, and query, source versions, mappings,
background and limitations as dna-damage-enrichment-notes.md.
Retain unmapped, ambiguous and duplicate identifiers. Treat mapped_genes
as the returned mapping object. Report errors instead of inventing results.
This is not differential-expression evidence or evidence of regulation direction.
```

4. Ouvrez les notes générées et vérifiez les nombres de requêtes et de mappages. Cette opération a permis de cartographier les identifiants **11/11**, avec des identifiants **0** non maquillés, ambigus ou dupliqués. Il a enregistré **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, classes GO **2026-01-23** et classes Reactome **2026-03-20**. Une version de service ultérieure peut renvoyer des termes différents.

![Enregistré la requête en anglais, le fond, les versions source et les vérifications d'identificateur](/img/open-science/v0311/enrichment-notes.webp)

5. Ouvrez le CSV et comparez-le avec le JSON complet. Cette exécution a retourné **Termes de 891** à FDR 0.05. L'aperçu ne montre que ses premières lignes 100; que la limite d'affichage n'est pas le nombre total de résultats. Conserver `source`, `native`, corrigé `p_value`, `intersection_size`, `query_size` et `effective_domain_size` lors de l'interprétation d'un terme.

![Tableau d'enrichissement réel avec probabilités corrigées et tailles de domaine](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Notes d'analyse</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">Toutes les lignes de résultats 891</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Réponse complète</ExampleDownload>

Dans la course enregistrée, les deux appels de service ont réussi; générer les notes a d'abord échoué parce que l'agent a traité `mapped_genes` comme un tableau. Il a corrigé cette manipulation et a sauvegardé les trois fichiers de la réponse existante. Les fichiers ci-dessus sont les extrants complétés. Leur présence n'atteste pas un replay automatique ou un environnement entièrement capturé.

`background_size: null` signifie qu'aucune liste d'arrière-plan personnalisée n'a été soumise; cela ne signifie pas un univers statistique de zéro gène. Utilisez la taille de domaine efficace par terme. L'enrichissement n'établit pas d'implication causale, d'expression différentielle ou de régulation ascendante ou descendante. Voir [paramètres de fonctionnement](../reference/connector-operations.md#enrich_gene_set).

## Confirmer l'identité du génome de référence {/* #reference-genome */}

<p className="example-label"><strong>Exemple pratique</strong> Identifier le chromosome humain GRCh38.p14 1</p>

1. Activer **Genomes** dans **Settings → Connectors**. Ouvrez une session avec un modèle connecté et l'exécution Notebook disponible. Cet exemple v0.31.1 a utilisé **Codex subscription**.
2. Interroger l'organisme, l'assemblage **version anglaise** et la séquence dans cet ordre. Envoyer :

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

3. Ouvrez les notes et comparez les identifiants retournés dans les trois fichiers JSON. Les trois appels ont réussi dans cet exemple.

![Trois appels NCBI réels et l'identité du taxon et de l'assemblage retournés](/img/open-science/v0311/ncbi-notes.webp)

| Vérifier | Résultat de cet exemple |
| --- | --- |
| Organisme | Homo sapiens, TaxID **9606**; une allumette, `ambiguous: false` |
| Montage demandé/en cours | **GCF_000001405.40**, **GRCh38.p14**, nom de l'UCSC **hg38** |
| Groupe GenBank couplé | **GCA_000001405.29**; le dossier retourné signale des différences avec RefSeq |
| Alias de chromosome 1 | **1**, **chr1**, RéfSeq **NC_000001.11**, Banque Générale **CM000663.2** |
| Séquence sélectionnée | **248956422 bp**, Assemblée primaire; une allumette, `matches_truncated: false` |

![Réponse originale du chromosome-1 avec alias en version et nombre de correspondances](/img/open-science/v0311/ncbi-aliases.webp)

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Demandes de renseignements</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Tableau d'identité</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Réponses fiscales</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Réponse de l'Assemblée</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Réponse en séquence</ExampleDownload>

Cette recherche a abouti pour **un seul chromosome sélectionné** ; elle n’exporte pas toutes les séquences de l’assemblage. Lors d’une nouvelle requête, conservez les correspondances ambiguës et les indicateurs de troncature. Le nom d’un assemblage ne remplace pas son numéro d’accès versionné. Le numéro actuel renvoyé ne justifie pas le remplacement silencieux d’une version historique. Les alias décrivent des noms au sein d’un assemblage ; ils ne convertissent pas les coordonnées entre assemblages. [Paramètres exacts](../reference/connector-operations.md#ncbi_get_assembly_info)

## Lire les populations de gnomAD et les réseaux STRING {/* #string-network */}

Pour `get_variant`, définissez `include_populations: true` uniquement lorsque les détails de la population sont nécessaires. Conserver l'ensemble de données et la compilation de référence. Les observations de l'exome et du génome restent distinctes. Une valeur non disponible est `null`, pas zéro; les strates de population ou de sexe ne doivent pas être résumées. Ce sont des fréquences observées, et non des fréquences allèles filtrantes. [Paramètres de gnomAD](../reference/connector-operations.md#get_variant)

À partir de v0.31.0, `get_string_network.nodes` inclut des voisins retournés et des entrées cartographiques isolées. Une seule saisie cartographiée demande aux voisins; plusieurs entrées cartographiées ne sont pas développées. Filtrez `is_query` pour récupérer les nœuds d'entrée, et utilisez `queries` pour tous les alias cartographiés. `n_nodes` compte le graphique; `n_mapped` compte les mappages d'entrée. Mettre à jour les scripts qui ont assimilé les deux avant de les réutiliser. [Paramètres de la STRING](../reference/connector-operations.md#get_string_network)

<span id="empty-partial-and-failed-responses" />

## Rechercher les paramètres d'exploitation {/* #find-operation-parameters */}

Utilisez le [Référence de fonctionnement Connector](../reference/connector-operations.md) pour les champs requis, les valeurs acceptées et les appels exacts. Choisissez une source ici d'abord; utiliser la référence lors de la préparation d'une opération spécifique.

Conservez la constitution du génome, l'organisme, les tissus, les unités et les versions d'adhésion avec les données retournées. Pour les significations et la récupération générales de HTTP, utilisez [Dépannage](../guides/troubleshooting.md). Les enregistrements de bases de données, les prévisions et les résumés générés sont différents types de données probantes; vérifier la source citée avant d'utiliser une demande de recherche.


Référence de mise en œuvre: [ConnecteursPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx).

Source du catalogue: [catalogue.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/catalog.ts), [registre.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/registry.ts).