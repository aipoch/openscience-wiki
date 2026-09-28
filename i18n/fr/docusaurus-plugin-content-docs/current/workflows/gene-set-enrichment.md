---
title: "Exécuter l'enrichissement fonctionnel d'un ensemble de gènes candidats"
toc_max_heading_level: 2
last_update:
  date: '2026-09-28'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Exécuter l'enrichissement fonctionnel d'un ensemble de gènes candidats {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>Exemple pratique</strong> Liste de gènes de dommages à l'ADN humain choisi intentionnellement</p>

Transformer une liste de gènes définie en une table de processus et de voies biologiques enrichis, en conservant des cartes d'identification, des données statistiques de base et des versions sources.

Avant de commencer, suivez [Bases de données scientifiques](../tools/databases.md#connect-database) pour activer les connecteurs requis. Utilisez un modèle connecté et un [Environnement d'exécution Notebook](../guides/runtimes.md) disponible.

Le premier exemple utilise g:Profiler; le [Comparaison entre Enrichr et STRING](#enrichr-string) utilise les mêmes symboles de gènes publics 11 dans v0.33.3. Ils ont été choisis pour leurs rôles biologiques connus, donc l'enrichissement est attendu. Ce ne sont pas des résultats d'expression différentielle du projet GSE60450 ou des preuves d'une découverte impartiale.

## 1. Définir la liste des gènes et les paramètres d'analyse {/* #gene-set-enrichment */}

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

## 2. Vérifier les identifiants et les versions sources {/* #identifier-check */}

Ouvrez les notes générées et vérifiez les nombres de requêtes et de mappages. Cette opération a permis de cartographier les identifiants **11/11**, avec des identifiants **0** non maquillés, ambigus ou dupliqués. Il a enregistré **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, classes GO **2026-01-23** et classes Reactome **2026-03-20**. Une version de service ultérieure peut renvoyer des termes différents.

![Enregistré la requête en anglais, le fond, les versions source et les vérifications d'identificateur](/img/open-science/v0311/enrichment-notes.webp)

## 3. Inspecter le tableau d'enrichissement {/* #enrichment-results */}

Ouvrez le CSV et comparez-le avec le JSON complet. Cette exécution a retourné **Termes de 891** à FDR 0.05. L'aperçu ne montre que ses premières lignes 100; que la limite d'affichage n'est pas le nombre total de résultats. Conserver `source`, `native`, corrigé `p_value`, `intersection_size`, `query_size` et `effective_domain_size` lors de l'interprétation d'un terme.

![Tableau d'enrichissement réel avec probabilités corrigées et tailles de domaine](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Notes d'analyse</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">Toutes les lignes de résultats 891</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Réponse complète</ExampleDownload>

`background_size: null` signifie qu'aucune liste d'arrière-plan personnalisée n'a été soumise; cela ne signifie pas un univers statistique de zéro gène. Utilisez la taille de domaine efficace par terme. L'enrichissement n'établit pas d'implication causale, d'expression différentielle ou de régulation ascendante ou descendante. Voir [paramètres de fonctionnement](../reference/connector-operations.md#enrich_gene_set).

## 4. Comparer Enrichr avec l'enrichissement réseau STRING {/* #enrichr-string */}

Enrichr demande quels ensembles d'annotation sont surreprésentés dans les gènes soumis. L'enrichissement en STRING PPI demande si les protéines ont plus d'interactions réseau que prévu. Ce sont des tests différents; l'accord n'est pas une reproduction indépendante d'un résultat biologique.

1. Dans **Settings → Connectors**, activez **Genes & Ontologies** et **Annotation des protéines** pour l'agent.
2. Créez un projet appelé **Ensemble de gènes de dommages à l'ADN** et ouvrez une nouvelle session. Cet exemple utilise Codex et Session Notebook.
3. Listez les bibliothèques Enrichr disponibles avant de choisir une bibliothèque. Pour cette comparaison, utilisez la bibliothèque **GO_Biological_Process_2025** fixe afin que les résultats enregistrés aient une version d'annotation identifiable. Une bibliothèque plus récente peut produire différents résultats.
4. Envoyer cette invite et ouvrir les notes générées après la fin de l'exécution:

```text
Compare Enrichr functional enrichment with STRING PPI enrichment for
TP53, ATM, ATR, CHEK1, CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
Use the built-in Genes & Ontologies and Protein Annotation connectors
through Session Notebook. List the current human Enrichr libraries;
use GO_Biological_Process_2025 with max_results 500 if available.
Run STRING PPI enrichment with species 9606 and required_score 700.
Save raw_connector_responses.json, enrichment_comparison_results.csv
and analysis_notes.md in English. Retain the query, source versions,
identifier mappings, reported background, n_total_results, n_results
and truncated flag, plus raw and adjusted P values where provided.
These genes were deliberately selected for known DNA-damage roles.
Do not infer unbiased discovery, causal regulation or expression direction.
Distinguish annotation enrichment from excess network interactions.
If STRING returns a P value of 0, preserve it as returned without claiming
an exact zero probability or inventing a numerical precision threshold.
```

### Vérifiez les entrées et la réponse complète {/* #enrichr-inputs */}

Ouvrez **analysis_notes.md** et comparez-le avec **raw_connector_responses.json**. Le 28 de septembre exécute la liste des bibliothèques **228** et renvoie les termes **305/305** pour la bibliothèque sélectionnée, avec `truncated: false`. Le `max_results` par défaut est 100; une réponse 100-row peut être incomplète. Vérifiez les drapeaux de réponse et demandez une limite plus grande, jusqu'à 500, si nécessaire.

STRING a cartographié tous les gènes **11**, sans identifiants non maquillés, et a enregistré la version **12.0**, organisme **9606** et seuil de score **700**. Enrichr déclare `mapping_status: not_reported_by_enrichr`; ne copiez pas le résultat de la cartographie de STRING dans l'enregistrement Enrichr. Aucun arrière-plan personnalisé n'a été fourni. La couverture du gène de la bibliothèque Enrichr de 14,674 est une métadonnée, et non une taille de fond statistique exacte.

![Entrées réelles, version de bibliothèque, comptage complet des résultats et vérifications des identifiants](/img/open-science/v0333/enrichment-inputs.webp)

### Lire les deux résultats séparément {/* #enrichr-comparison */}

Ouvrez la section des résultats des notes et utilisez le CSV ou le JSON brut pour la liste complète. Le premier terme Enrichr était **Réponse cellulaire aux rayonnements ionisants (GO:0071479)**, avec un P ajusté approximativement **3.60 × 10⁻¹¹**. STRING a renvoyé **44 bords observés** chez **Nœuds 11**, versus **6 bords attendus**. Sa valeur P déclarée était `0`; c'est la sortie numérique du service, pas la preuve de la probabilité zéro.

![Termes Enrichr et résultat d'enrichissement réseau STRING séparé](/img/open-science/v0333/enrichment-results.webp)

Le CSV a **305 Lignes Enrichr plus lignes de synthèse 6 STRING**. Ces derniers sont des statistiques de réseau, et non des termes enrichis supplémentaires. Les termes de Enrichr GO se chevauchent, et STRING combine plusieurs canaux d'information; un bord STRING ne signifie pas nécessairement une liaison physique directe. L'entrée choisie intentionnellement démontre principalement les outils et leurs dossiers.

<ExampleDownload path="/examples/v0333/analysis_notes.md">Notes de comparaison</ExampleDownload> · <ExampleDownload path="/examples/v0333/enrichment_comparison_results.csv">Tableau de comparaison complet</ExampleDownload> · <ExampleDownload path="/examples/v0333/raw_connector_responses.json">Réponses originales des connecteurs</ExampleDownload>

Références de paramètres: [Bibliothèques Enrichr](../reference/connector-operations.md#list_enrichr_libraries), [enrichissement Enrichr](../reference/connector-operations.md#enrich_gene_set_enrichr), [STRING enrichissement PPI](../reference/connector-operations.md#get_string_ppi_enrichment). Pour conserver la session et les preuves ensemble, [exporter un colis .science](../guides/research-packages.md#export-the-session).
