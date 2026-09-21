---
title: "Référence de fonctionnement Connector"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Référence de fonctionnement Connector {/* #connector-operation-reference */}

Recherchez les noms exacts de l'opération, les champs requis, les par défaut et les exemples d'appels. Pour choisir une source de données, commencez par le [catalogue de bases de données](../tools/databases.md). Expandez la famille Connector que vous avez l'intention d'appeler; La disponibilité et les références doivent être configurées séparément.

## Où les appels par exemple s'exécutent {/* #where-the-example-calls-run */}

L'objet `host` est fourni par l'environnement d'exécution de l'agent Open-Science. Le JavaScript ci-dessous est un **fragment d'appel côté agent**, pas un programme standalone Node.js et pas une méthode sur le client public Tâche SDK. Demandez à l'agent de charger les instructions pertinentes de Connector et d'utiliser l'opération correspondante. Un framework peut exposer un pont Python au lieu de ce formulaire JavaScript.

Activez d'abord le Connector dans [Paramètres → Connecteurs](../guides/connectors.md), configurez n'importe quel [les pouvoirs requis](../tools/credentials.md) et accordez l'accès au Specialist sélectionné, le cas échéant. L'appel suit toujours la politique de permission de la conversation. Les intégrations publiques Node.js peuvent gérer les paramètres Connector avec le [Tâche SDK](api.md), mais ne peuvent pas obtenir ce `host` en important ce client.

### Lire un résultat avant d'enchaîner les appels {/* #read-a-result-before-chaining-calls */}

<p className="example-label"><strong>Exemple</strong> Pass renvoyé PubMed IDs à une recherche de métadonnées</p>

Par exemple, demandez : **Utiliser PubMed pour rechercher les directives de rapport PRISMA; retourner le nombre total de correspondances et cinq PMIDs.** L'opération `search_articles` renvoie un total et une page d'identifiants. Nourrir ceux qui ont renvoyé PMIDs à `get_article_metadata` pour obtenir des titres, des auteurs et des liens DOI. Une page vide, un résultat tronqué et une erreur d'authentification nécessitent une manipulation différente.

| Renseignements retournés | Utilisez-le pour |
| --- | --- |
| Nombre total de correspondances et lignes retournées | Distinguer une petite page à partir du jeu de résultats complet |
| `truncated`, `records_truncated` ou des drapeaux d'exhaustivité propres à la famille | Décidez de pager, de restreindre la requête ou de récupérer le reste |
| `not_found`, `missing`, `not_processed` | Identifier les intrants non résolus et ne réessayer que les éléments appropriés |
| DOI, adhésion, URL source et publication/construction | Conserver l'identité et la source nécessaires pour les requêtes ultérieures |
| État du texte intégral ou note de licence | Décider si le texte a été récupéré et peut être réutilisé |

Les noms de champs de retour diffèrent selon l'opération. Les descriptions et les schémas téléchargeables ci-dessous précisent chaque contrat; la table n'est pas une réponse universelle JSON. Utilisez la liste de la famille de droite pour sauter, puis élargir les paramètres de cette famille. La recherche d'un nom d'opération ouvre également son groupe contenant.

**Lire les échecs séparément des résultats vides.** Dans v0.30.2, CellGuide marqueur/source/matières demande des défaillances de la surface au lieu de les traiter comme des preuves vides; un fichier de données optionnel absent peut toujours être vide. Les requêtes relatives aux relations avec l'OLS rejettent la pagination incomplète et les réponses non valides. Une erreur de service n'est pas une preuve qu'un type de cellule n'a pas de marqueurs ou qu'un terme d'ontologie n'a pas de termes connexes.

## Entrées d'exploitation {/* #operation-inputs */}

Expandez un Connector à la fois. Les champs obligatoires sont marqués **requis**; cette référence et téléchargement utilisent le schéma Open-Science **v0.31.1**. Une liste de `input.required` imbriquée fait autorité; une liste de haut niveau de `required` peut être absente. Consultez le <ExampleDownload path="/examples/capabilities/connector-catalog-v0.31.1.json">Registre téléchargeable complet</ExampleDownload> pour les schémas JSON imbriqués, les descriptions complètes des retours et les exemples d'appels côté agent. Ne passez pas un `id` générique lorsqu'un outil s'attend à `accessions`, `cids`, `rs_id` ou à un autre champ spécifique à l'espace de noms.


## Chimie {/* #family-1 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `pubchem_search_compounds` {/* #pubchem_search_compounds */}

Résoudre un identificateur chimique (nom, SMILES, InChICey ou CID) aux CID de PubChem, en option avec les propriétés calculées du noyau pour les hits supérieurs.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `namespace` | chaîne de caractères | facultatif; par défaut: "name"; enum: &#91;"name", "smiles", "inchikey", "cid"&#93; |
| `max_cids` | entier | facultatif; par défaut : 25; minimum: 1; maximum: 100 |
| `with_properties` | booléen | facultatif; par défaut : true |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds` {/* #pubchem_get_compounds */}

Complet des enregistrements de propriété pour un lot de CID PubChem, avec des listes de synonymes plafonnés en option.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `cids` | tableau d’entiers | **requis**; minItems: 1; maxItems: 50 |
| `include_synonyms` | booléen | facultatif; par défaut : false |
| `max_synonyms` | entier | facultatif; par défaut : 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search` {/* #pubchem_similarity_search */}

Recherche de similarité 2D Tanimoto sur l'ensemble de PubChem pour une requête SMILES (chemin fastsimilarity_2d synchrone, pas de sondage d'emploi).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `smiles` | chaîne de caractères | **requis** |
| `threshold` | entier | facultatif; par défaut : 90; minimum: 1; maximum: 100 |
| `max_records` | entier | facultatif; par défaut : 50; minimum: 1; maximum: 200 |
| `with_properties` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary` {/* #pubchem_get_bioassay_summary */}

Résumé de l'activité d'essai biologique d'un composé de PubChem, qui l'a testé, par rapport à quelles cibles, avec quel résultat et quelle puissance.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `cid` | entier | **requis** |
| `active_only` | booléen | facultatif; par défaut : false |
| `max_rows` | entier | facultatif; par défaut : 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety` {/* #pubchem_get_safety */}

Classification de sécurité SGH pour un composé PubChem (PUG-View 'GHS Classification' , agrégées entre les sources de déclaration.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `cid` | entier | **requis** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search` {/* #chebi_search */}

Recherche en texte intégral sur les entités de ChEBI (noms, synonymes, formules, InChIKeys).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `term` | chaîne de caractères | **requis** |
| `max_results` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 100 |
| `page` | entier | facultatif; par défaut : 1; minimum: 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity` {/* #chebi_get_entity */}

Registre complet de l'entité ChEBI : noms, structure, données chimiques, rôles et références croisées.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `chebi_id` | chaîne de caractères | **requis** |
| `max_synonyms` | entier | facultatif; par défaut : 30 |
| `max_xrefs` | entier | facultatif; par défaut : 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology` {/* #chebi_get_ontology */}

Les relations d'ontologie d'une entité ChEBI — ce qu'elle est (en cours: est un / a un rôle / conjugué acide...) et quels points AT elle (en venant: enfants / dérivés).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `chebi_id` | chaîne de caractères | **requis** |
| `relation_type` | chaîne de caractères | facultatif |
| `max_relations` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions` {/* #rhea_search_reactions */}

Rechercher Rhea maitre réactions par texte d'équation, participant ChEBI id, ou numéro EC (query type auto-détected).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `limit` | entier | facultatif; par défaut : 50; minimum: 1; maximum: 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction` {/* #rhea_get_reaction */}

Record complet pour une réaction Rhea: équation, participants avec les ids ChEBI et stœchiométrie, liens EC, direction famille et littérature.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `rhea_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target` {/* #bindingdb_ligands_by_target */}

affinités de liaison mesurées (Ki/Kd/IC50/EC50) de tous les ligands BD contraignants par rapport à une cible protéique, par adhésion UniProt.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `uniprot` | chaîne de caractères | **requis** |
| `affinity_cutoff_nm` | nombre | facultatif; par défaut : 10000 |
| `max_rows` | entier | facultatif; par défaut : 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound` {/* #bindingdb_targets_by_compound */}

Des cibles protéiques avec des affinités mesurées pour des composés 2D-similaires à une requête SMILES — "Qu'est-ce que cette molécule (ou ses analogues proches) se lie ?".

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `smiles` | chaîne de caractères | **requis** |
| `similarity` | nombre | facultatif; par défaut : 0.85; minimum: 0.5; maximum: 1 |
| `max_rows` | entier | facultatif; par défaut : 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## Graphique de littérature {/* #family-2 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `openalex_search_works` {/* #openalex_search_works */}

Rechercher des oeuvres savantes OpenAlex (toutes disciplines, ~250M notices) avec des filtres année/type/AO/venu. Args: requête (texte libre sur title+abstract+fulltext); optionnel si un filtre est défini), year_from, year_to (années incluses), work_type (article/review/preprint/book-chapter/dataset/dissertation), open_access_only, lieu (S-id, openalex.org URL, ISSN, ou un nom clair résolu à la première source touchée — surface dans venue_resolved; passer un ID exact pour sauter la résolution), trier (pertinence par défaut / cited_by_count / publication_date), max_records (par défaut 50, plafond dur 500; pages de 200), include_abstracts (reconstruite à partir de l'index inversé, mais SEULEMENT pour les licences ouvertes vérifiées — cc-by/cc-by-sa/cc0/domaine public; d'autres obtiennent abstract=null + abstract_policy note + abstract_license; additionne en vrac). Retourne &#123;query, filtres, trier, api_total, n_records_returned, records_truncated, records&#125;; chaque enregistrement est la forme de travail maigre (openalex_id, doi, pmid, title, publication_year/date, type, language, is_retracted, auteurs&#91;...&#93;, source&#123;...&#125;, biblio, cited_by_count, fwci, referenced_works_count, open_access&#123;...&#125;, best_oa_pdf_url, primary_topic, mots-clés).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | facultatif |
| `year_from` | entier | facultatif |
| `year_to` | entier | facultatif |
| `work_type` | chaîne de caractères | facultatif |
| `open_access_only` | booléen | facultatif |
| `venue` | chaîne de caractères | facultatif |
| `sort` | chaîne de caractères | facultatif; par défaut: "relevante"; enum: &#91;"repertinence", "cited_by_count", "publication_date"&#93; |
| `max_records` | entier | facultatif; par défaut : 50 |
| `include_abstracts` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work` {/* #openalex_get_work */}

Obtenez un travail OpenAlex en entier — métadonnées, résumé (reconstruits à partir de l'index inversé, sous licence comme dans openalex_search_works), emplacements OA, referenced_works (W-ids sortants — hydratez avec openalex_references) et counts_by_year. Args : work_id (W-id, openalex.org URL, nus DOI ou URL doi.org). Les recherches DOI se résolvent via le filtre demandeur; lorsque plusieurs œuvres partagent un DOI le plus cité est sélectionné et doi_claimants + doi_resolution_note inclus. Il n'est pas trouvé pour les ID/DOI inconnus.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `work_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations` {/* #openalex_citations */}

Liste des œuvres qui CITE une oeuvre donnée (citations entrantes) via OpenAlex's citation graph. Args: work_id (W-id/URL/DOI — DOI coûte une demande de résolution supplémentaire), tri (cited_by_count par défaut / publication_date / pertinence), max_records (50, plafond 500), include_abstracts. Retourne &#123;work_id, api_total (le vrai nombre de citations), n_records_returned, records_truncated, records&#125; (les relevés de travail)

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `work_id` | chaîne de caractères | **requis** |
| `sort` | chaîne de caractères | facultatif; par défaut: "cited_by_count"; enum: &#91;"cited_by_count", "publication_date", "pertinence"&#93; |
| `max_records` | entier | facultatif; par défaut : 50 |
| `include_abstracts` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references` {/* #openalex_references */}

Énumérez les travaux d'une œuvre donnée CITES (références sortantes), hydratée à métadonnées complètes dans l'ordre des listes de références. Args: work_id (W-id/URL/DOI), max_records (par défaut 100, plafond 500; hydratation par lot de 50/requête). Retourne &#123;work_id, n_references, n_records_returned, records_truncated, references_not_hydrated (IDs OpenAlex n'a pas d'enregistrement pour — jamais supprimé silencieusement), reference_ids (ALL exiting W-ids), records&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `work_id` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors` {/* #openalex_search_authors */}

Rechercher les profils d'auteurs OpenAlex par nom. Args : requête (affiche le nom de l'appareil + les alternatives ; s'attendre à des homonymes — vérifier les affiliations/topiques/ORCID), max_records (par défaut 25, plafond 500). Retourne &#123;query, api_total, n_records_returned, records_truncated, records&#125;; chaque enregistrement &#123;author_id, nom, orcide, works_count, cited_by_count, h_index, i10_index, affiliations&#91;&#123;institution, années&#125;&#93;, last_known_institutions, top_topics&#125;. Utilisez author_id avec openalex_get_author.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author` {/* #openalex_get_author */}

Obtenez un profil d'auteur d'OpenAlex plus leurs œuvres les plus citées. Args : author_id (A-id, openalex.org URL ou ORCID; CAVEAT: Le pointeur ORCID OpenAlex's peut être résolu en un duplicata clairsemé — préférant l'id A de openalex_search_authors), works_sample (par défaut 10, max 200; 0 saute la requête supplémentaire). Retourne l'enregistrement de l'auteur plus counts_by_year, top_works_total (nombre total d'oeuvres réelles) et top_works (enregistrements de travaux leans par citations).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `author_id` | chaîne de caractères | **requis** |
| `works_sample` | entier | facultatif; par défaut : 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info` {/* #openalex_venue_info */}

Rechercher des revues/répertoires ('sources') dans OpenAlex — statut OA, liste DOAJ, APC, paramètres de citation. Args: lieu (exact S-id, openalex.org URL, ou ISSN pour un seul enregistrement; autre chose est une recherche de nom), max_records (par défaut 10, plafond 500; recherche de nom seulement). Retours : exact -> un enregistrement source + counts_by_year; Recherche de nom -> &#123;query, api_total, n_records_returned, records_truncated, records&#125;. Enregistrement source: &#123;source_id, display_name, type, issn_l, issn, host_organization, country_code, homepage_url, is_oa, is_in_doaj, is_core, apc_usd, works_count, cited_by_count, h_index, two_year_mean_citedness, premier/last_publication_year, top_topics&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `venue` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search` {/* #arxiv_search */}

Rechercher les préimpressions arXiv (physique, mathématiques, CS, statistiques, q-bio, ...) via l'Atom officiel API. Args: requête (chaîne de requêtes arXiv); les termes simples recherchent tous les champs, préfixes de champ ti:/au:/abs: and booleans AND/OU/ANDNOT work; facultatif si la catégorie ou une plage de dates est définie), catégorie (code ArXiv ET-ed in, p.ex. q-bio.GN, cs.LG, stat.ML), date_from / date_to (date de soumission AAAA-MM-JJ, inclusivement), début (compensation de la recherche par téléappel en 0; les rythmes API ~3s entre les requêtes — page poliment), max_results (par défaut 25, max 100 par appel), sort_by (pertinence par défaut / soumisDate / lastMise à jourDate), sort_order (décroissant par défaut / ascendant). Retourne &#123;search_query (la requête exacte envoyée), api_total (nombre total de correspondances d'arXiv', start_index, n_records_returned, records_truncated, sort_by, sort_order, records&#125;; chaque enregistrement &#123;arxiv_id, version, id_versioned, titre, résumé, auteurs, publié, mis à jour, primary_category, catégories, doi, journal_ref, commentaire, abs_url, pdf_url&#125;. doi/journal_ref n'apparaissent qu'après la publication de la revue. Les requêtes déformées soulèvent une erreur (le flux d'erreur d'arXiv's HTTP-200 est détecté, jamais retourné comme données).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | facultatif |
| `category` | chaîne de caractères | facultatif |
| `date_from` | chaîne de caractères | facultatif |
| `date_to` | chaîne de caractères | facultatif |
| `start` | entier | facultatif; par défaut : 0 |
| `max_results` | entier | facultatif; par défaut : 25 |
| `sort_by` | chaîne de caractères | facultatif; par défaut: "relevante"; enum: &#91;"repertinence", "soumisDate", "dernièremise à jourDate"&#93; |
| `sort_order` | chaîne de caractères | facultatif; par défaut: "descending"; enum: &#91;"descending", "ascending"&#93; |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers` {/* #arxiv_get_papers */}

Métadonnées papier arXiv (incl. abstracts) par ID — une demande rapide pour des papiers jusqu'à 100. Args: arxiv_ids (jusqu'à 100 IDs sous n'importe quelle forme commune — 2103.14030, version 2103.14030v2, ancien style q-bio/0601001, arXiv:-préfixé, ou URL abs/pdf; les ID non-versions se résolvent à la dernière version). Retourne &#123;n_requested, n_found, duplicatas (intrants qui ont résolu sur un papier déjà retourné), not_found (identifiants malformés ET inconnus — arXiv saute silencieusement les inconnus et rejette les lots entiers sur les malformés; cet outil ne fait aucun), records&#125; — les enregistrements dans l'ordre demandé, de la même forme que les enregistrements arxiv_search. Les documents retirés retournent toujours les métadonnées (cochez les commentaires pour les notes de retrait).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `arxiv_ids` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work` {/* #crossref_get_work */}

Récupérer les métadonnées déposées par l'éditeur pour un Crossref DOI. Une URL nue DOI, doi: prefix ou doi.org est acceptée. Aucune clé API n'est requise. Si le DOI appartient à une autre agence d'enregistrement, utilisez le service correspondant; a Crossref 404 ne prouve pas que le DOI est invalide. Vérifiez le retour de DOI, titre et source_url.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `doi` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates` {/* #crossref_get_updates */}

Lire la correction déposée, la rétractation et d'autres relations de mise à jour. updated_by indique les avis de mise à jour de ce travail; update_to pointe pour fonctionner mis à jour par ce DOI. Préserver la direction de la relation et les étiquettes des sources. Les tableaux vides n'établissent pas la fiabilité ni ne prouvent qu'il n'y a pas de rétractation.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `doi` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records` {/* #datacite_search_records */}

Recherche publique DataCite dataset/software DOI métadonnées. Demande d'approvisionnement, related_doi ou les deux; requête utilise la syntaxe de requête DataCite. Conserver les mêmes filtres et page_size lorsque vous suivez next_page. L'extraction du nombre de pages est limitée aux premiers enregistrements 10,000 : rétrécissez la requête si nécessaire. Vérifiez related_identifiers, droits et URL d'atterrissage; Les métadonnées ne garantissent pas le téléchargement de données ni la permission de réutilisation.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | facultatif; Longueur min: 1; Longueur max: 2000 |
| `related_doi` | chaîne de caractères | facultatif; Longueur min: 1; Longueur max: 2048 |
| `resource_type` | chaîne de caractères | facultatif; par défaut: "dataset"; enum: &#91;"dataset", "software"&#93; |
| `page_size` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 100 |
| `page` | entier | facultatif; par défaut : 1; minimum: 1; maximum: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record` {/* #datacite_get_record */}

Récupérer un enregistrement public DataCite DOI, y compris les titres, les créateurs, le type de ressource, les droits, les identifiants connexes et la version disponible. Accepte une URL nue de DOI, doi: prefix ou doi.org. Vérifiez l'identifiant et la direction de la relation avant d'utiliser un ensemble de données ou un logiciel lié.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `doi` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## PubMed {/* #family-3 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `search_articles` {/* #search_articles */}

Recherche PubMed (biomédical & littérature sur les sciences de la vie par l'intermédiaire de la recherche en ligne de l'ICNE) pour les articles correspondant à une requête. Renvoie le nombre total de correspondances plus une page de PMIDs. Supporte les balises de champ PubMed (&#91;Titre&#93;, &#91;Auteur&#93;, &#91;Journal&#93;, &#91;Modalités MeSH&#93;, ...), les opérateurs booléens, le filtrage de date et le tri. PubMed n'indexe pas la physique / CS / maths / papiers de chimie pure.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `max_results` | entier | facultatif; par défaut : 20 |
| `retstart` | entier | facultatif; par défaut : 0 |
| `sort` | chaîne de caractères | facultatif; enum: &#91;"repertinence", "pub_date", "author", "journal_name", "title"&#93; |
| `date_from` | chaîne de caractères | facultatif |
| `date_to` | chaîne de caractères | facultatif |
| `datetype` | chaîne de caractères | facultatif; par défaut: "pdat"; enum: &#91;"pdat", "edat", "mdat"&#93; |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata` {/* #get_article_metadata */}

Récupérer des métadonnées détaillées d'articles de PubMed par PMID (bulk, via efetch): identifiants (pmid/pmc/doi), titre, résumé, journal, auteurs avec affiliations, date de publication, termes MeSH, types d'articles, langue et citation. Pour chaque utilisation, citer PubMed et inclure l'article retourné DOI (identificateurs.doi) comme liens.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **requis** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles` {/* #find_related_articles */}

Trouvez le contenu PubMed associé pour une ou plusieurs sources PMIDs via NCBI elink. `pubmed_pubmed` (par défaut) renvoie des articles similaires classés par similitude de titres/abstractions/MeSH (citations de NOT); `pubmed_pmc` retourne les liens PMC en texte intégral; `pubmed_gene`/`pubmed_protein`/`pubmed_nucleotide` renvoie les enregistrements de séquence/genre liés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **requis** |
| `link_type` | chaîne de caractères | facultatif; par défaut: "pubmed_pubmed"; enum: &#91;"pubmed_pubmed", "pubmed_pmc", "pubmed_nucleotide", "pubmed_protein", "pubmed_gene"&#93; |
| `max_results` | entier | facultatif |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation` {/* #lookup_article_by_citation */}

Résoudre les citations bibliographiques de PMIDs par l'intermédiaire de l'ecitmatch de la BCNI. Chaque citation fournit une partie de &#123;journal, année, volume, first_page, auteur, key&#125;; fournir des champs 2-3+ pour une correspondance fiable. Utilisez lorsque vous avez une liste de références et avez besoin de PMIDs.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `citations` | tableau d’objets | **requis** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids` {/* #convert_article_ids */}

Convertir entre PMID, PMCID et DOI via le convertisseur d'ID NCI/PMC. ids d'entrée homogènes par appel (set `id_type` à correspondre). Généralement utilisé pour vérifier si un PMID a un PMCID (c.-à-d. texte complet dans PMC) avant d'appeler get_full_text_article.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `ids` | ['string', 'array'] | **requis** |
| `id_type` | chaîne de caractères | facultatif; par défaut: "pmid"; enum: &#91;"pmid", "pmcid", "doi"&#93; |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article` {/* #get_full_text_article */}

Récupérer le texte complet en libre accès depuis PubMed Central via Europe PMC par PMC id ("PMC12345" ou " 12345"). Retourne le texte structuré de la section plus la licence; lorsque le texte complet n'est pas disponible, la raison est indiquée explicitement (fulltext_status). Seuls les articles sous-subset OA ont récupéré le texte intégral. Sur chaque utilisation, citer PubMed et inclure l'article retourné DOI comme liens.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pmc_ids` | ['string', 'array'] | **requis** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status` {/* #get_copyright_status */}

Signaler le droit d'auteur et le statut de licence par PMID en combinant PubMed CopyrightInformation, le convertisseur d'ID PMC (PMID -> PMCID/DOI) et les autorisations de PMC &lt;> block (type de licence, URL de licence ALI, déclaration de copyright/année). Utiliser pour vérifier les droits de réutilisation en libre accès avant de reproduire du contenu.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **requis** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## Genes & Ontologies {/* #family-4 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `query_genes` {/* #query_genes */}

Résoudre les identificateurs/symboles de gènes via mygene.info (chiffré, jusqu'à 1000 termes/demande). Utilisez ceci pour cartographier les symboles de gènes pour les ID de gènes d'Ensembl, les ID d'Entrez, les noms et tout autre champ mygene.info — ou l'inverse (cochez `scopes` dans l'espace de noms de vos termes d'entrée, par exemple. "entrezgene", "ensembl.gene", "symbol,alias"). Args : termes (termes de requête, p.ex. &#91;"TP53","BRCA1"&#93;; les termes contenant des virgules ne sont pas pris en charge); scopes (espaces de noms d'identificateurs séparés par des virgules pour correspondre aux termes); les champs (champs de mygene séparés par des commes à retourner, ou "all"); espèce (nom usuel "human"/"souris" ou NCBI a fait l'objet d'un taxi). Retourne &#123;n_input, n_records, not_found, records&#125;. Un terme correspondant à plusieurs gènes donne plusieurs enregistrements (chaque gène porte son `query`). Les enregistrements sont commandés de façon déterministe (ordre d'entrée, puis _id).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `terms` | tableau de chaînes | **requis** |
| `scopes` | chaîne de caractères | facultatif |
| `fields` | chaîne de caractères | facultatif; par défaut: "symbol,name,taxid,entrezgene,ensembl.gene" |
| `species` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies` {/* #list_ontologies */}

Liste des ontologies du Service de recherche en ontologie de l'EBI (OLS4). Avec `ontology_ids` (par exemple &#91;"efo","cl","chebi","go","mondo"&#93;): récupérer des enregistrements de métadonnées structurées pour ces ontologies seulement; des ID inconnus sont signalés dans `not_found`. Sans : le catalogue complet OLS4 (~250 ontologies, paginées entièrement et vérifiées en nombre). Retourne : &#123;enregistrements :&#91;&#123;ontology_id, titre, version, état, num_terms, ...&#125;&#93;, not_found:&#91;...&#93;&#125; pour une liste d'ID, ou des enregistrements &#123;:&#91;...&#93;, total_elements, complet&#125; pour le catalogue complet.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `ontology_ids` | tableau de chaînes | facultatif |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms` {/* #search_ontology_terms */}

Rechercher les termes de l'ontologie par étiquette/synonyme dans une ou plusieurs ontologies OLS4. Utilisations typiques : trouver un ID EFO pour un nom de maladie (ontologies=&#91;"efo"&#93;), des termes Cell Ontology pour un type de cellule (&#91;"cl"&#93;), des termes ChEBI pour un produit chimique (&#91;"chebi"&#93;), des termes GO par nom (&#91;"go"&#93;) ou rechercher toutes les ontologies en même temps. Args : requête (étiquette de terme, synonyme ou identifiant); les études de cas (identifications en minuscules à limiter; Aucun ne fouille toutes les ontologies); exact (coup de corde entière); include_obsolete (faux par défaut); max_results (classé selon la pertinence de l'OLS). Retourne &#123;query, total_found, n_returned, tronqué, termes:&#91;&#123;curie, iri, label, short_form, ontology, description, type, is_defining_ontology&#125;&#93;&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `ontologies` | tableau de chaînes | facultatif |
| `exact` | booléen | facultatif; par défaut : false |
| `include_obsolete` | booléen | facultatif; par défaut : false |
| `max_results` | entier | facultatif; par défaut : 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term` {/* #get_ontology_term */}

Obtenez un terme d'ontologie's détails, ou son ensemble complet de termes connexes. Avec `relation=None` : enregistrement à terme complet (étiquette, synonymes, description, drapeau obsolète, parents directs). Avec une relation: l'ensemble COMPLETE, entièrement paginé de termes connexes — par exemple: relation="hiérarchiqueEnfants" pour les enfants directs, y compris: part_of etc., "descendants"/"hiérarchiquesDescendants" pour l'ensemble du sous-arbre, "ancestors"/"hiérarchiqueAncestors", "parents", "children". La récupération est vérifiée en nombre par rapport au total des API'. Arguments: ontologie (case inférieure, p.ex. "efo","go","cl","chebi"); term_id (CURIE "EFO:0000305"/"GO:0006281" ou IRI complet); relation (aucun ou l'un des éléments énumérés); include_parents (comprend les réfs parents directs lorsque la relation n'est pas nulle). Retourne: relation=Aucune &#123;curie, iri, étiquette, ontology, short_form, synonymes, description, is_obsolete, has_children, parents&#125;; Sinon &#123;root, relation, total_elements, term_count, termes:&#91;...&#93;&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `ontology` | chaîne de caractères | **requis** |
| `term_id` | chaîne de caractères | **requis** |
| `relation` | chaîne de caractères | facultatif; Enum: &#91;"parents", "children", "ancesters", "descendants", "hiérarchiqueParents", "hiérarchiqueEnfants", "hiérarchiqueAncestors", "hiérarchiqueDescendants"&#93; |
| `include_parents` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations` {/* #get_go_annotations */}

Récupérer les annotations GO d'un produit génique UniProt de QuickGO (complet, vérifié en nombre). Args: uniprot_accession (par exemple "P04637", préfixe facultatif); l'aspect (comit pour tous les aspects, ou l'un des aspects de biological_process/molecular_function/cellular_component); des preuves (aucune/toute, un préréglage "experimental_manual"=des preuves expérimentales attribuées manuellement, "automatic_iea"=électronique/IEA, ou un code ECO explicite comme "ECO:0000314"; les codes de preuve GO à trois lettres comme IDA/IEA ne sont pas acceptés — QuickGO ignore silencieusement goEvidence, le filtre doit utiliser les codes ECO); taxon_id (fiscal optionnel BCNI, par exemple 9606); include_term_names (hydratez chaque enregistrement avec le nom/l'aspect/l'obsolète du terme GO par une recherche d'ontologie en série); max_records (cap sur les enregistrements); l'ensemble complet est toujours récupéré et résumé; `truncated` affiche le capuchon). Retourne &#123;gene_product, total_annotations, n_records, complet, tronqué, distinct_go_ids (à travers TOUTES les annotations), records:&#91;&#123;go_id, go_aspect, qualificatif, go_evidence, eco_id, référence, assigned_by, date, ...&#125;&#93;&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `uniprot_accession` | chaîne de caractères | **requis** |
| `aspect` | chaîne de caractères | facultatif; enum: &#91;"biological_process", "molecular_function", "cellular_component"&#93; |
| `evidence` | chaîne de caractères | facultatif |
| `taxon_id` | entier | facultatif |
| `include_term_names` | booléen | facultatif; par défaut : false |
| `max_records` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `get_uniprot_entries` {/* #get_uniprot_entries */}

Renseignez UniProtKB pour obtenir une liste d'adhésions primaires ou secondaires (demandes d'entrées en bourse d'abord; Les alias non résolus utilisent un recul direct par adhésion). Trois modes : `fields` donné → récupération tabulaire token-lean de ces champs UniProt (par exemple : &#91;"adhésion", "id", "protein_name", "gene_names", "organism_name", "longueur", "séquence"&#93;; `format` est ignoré. format « fasta » → séquences FASTA par adhésion. format="txt" → texte complet du fichier plat UniProt par adhésion (annotation complète; peuvent être très grandes — préfèrent `fields`). Arguments: adhésions (par exemple &#91;"P04637", "P38398"&#93;); format ("fasta"/"txt", ignoré lorsque `fields` est donné); champs (noms de champs UniProt REST en option pour le mode tabulaire). Retourne : fields mode &#123; accessions, fields, n_records, records:&#91;&#123;&lt;column>:value&#125;&#93;&#125;; fasta/txt mode &#123;adhésions, format, n_found, manquant, enregistrements:&#123;adhésion:text&#125;&#125; — `missing` listes accessions UniProt n'a retourné aucun document pour.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accessions` | tableau de chaînes | **requis** |
| `format` | chaîne de caractères | facultatif; enum: &#91;"fasta", "txt"&#93; |
| `fields` | tableau de chaînes | facultatif |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `map_reactome_pathways` {/* #map_reactome_pathways */}

Les symboles de gènes Map ou les adhésions UniProt aux voies de réactome (processus d'analyse du service). Args: identifiants (symboles de gènes si id_type="symbol", adhésions UniProt si "uniprot"; pas de duplicata); id_type ("symbol"/"uniprot"); espèces (par défaut "Homo sapiens"); ressource (AnalyseService molécule-ressources vue "TOTAL" par défaut; "UNIPROT" restreint les cartes des niveaux de protéines; include_disease (par défaut de service Vrai); compact (Vrai → parcours de bas niveau par identifiant seulement &#123;stId,nom,espèces&#125; + version de sortie de réactome; Faux → résultat déterministe complet : ensemble de voies complètes par identifiant avec des statistiques d'entité/réaction (valeurs p, FDR, trouvé/total) et résumé de lots incl. identifiers_not_found). Retourne: compact &#123;tool, reactome_version, id_type, species, n_input, genes:&#123;identificateur:&#123;found, n_lowlevel_pathways, pathways&#125;&#125;&#125;; complète ajoute les statistiques par voie et batch_summary. Cartes identifiant les voies dans l'espèce demandée, sans les projeter à l'humain. Utiliser un nom scientifique pris en charge, comme `Homo sapiens` ou `Mus musculus`; le schéma téléchargeable liste tous les noms supportés. Les espèces vides, non soutenues ou mal appariées sont des erreurs. `found` et `n_found` indiquent la reconnaissance des identifiants, et non l'adhésion à la voie : un identifiant reconnu peut avoir zéro chemin. Le mode compact ne contient que des voies de bas niveau.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `identifiers` | tableau de chaînes | **requis** |
| `id_type` | chaîne de caractères | **requis**; enum: &#91;"symbol", "uniprot"&#93; |
| `species` | chaîne de caractères | facultatif; par défaut: "Homo sapiens" |
| `resource` | chaîne de caractères | facultatif; par défaut : "TOTAL" |
| `include_disease` | booléen | facultatif; par défaut : true |
| `compact` | booléen | facultatif; par défaut : true |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources` {/* #list_enrichment_sources */}

Énumérez les sources d'enrichissement g:Profiler et leurs versions de données actuelles pour un organisme. Les sources sont dépendantes de l'organisme et comprennent des espaces de noms tels que GO:BP, GO:MF, GO:CC, KEGG, Reactome et WikiPathways lorsque disponibles. g:Profiler stocke des métadonnées de requête limitées pour le fonctionnement du service; cette recherche en lecture seule ne soumet pas de liste de gènes.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `organism` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 64; modèle: "^&#91;a-z&#93;&#91;a-z0-9_&#93;&#42;$" |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set` {/* #enrich_gene_set */}

Exécuter g:Profiler g:GOSt enrichissement pour un ensemble de gènes à travers GO, Reactome, KEGG, WikiPathways, et d'autres sources soutenues par l'organisme. Supporte un organisme explicite, un contexte statistique personnalisé, des tests sous-représentatifs, et g:Profiler correction multi-tests. Les identifiants non maquillés, ambigus et dupliqués sont retournés dans les métadonnées au lieu d'être rejetés silencieusement.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `genes` | tableau de chaînes | **requis**; minItems: 1; maxItems: 5000 |
| `organism` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 64; modèle: "^&#91;a-z&#93;&#91;a-z0-9_&#93;&#42;$" |
| `sources` | tableau de chaînes | facultatif; maxItems: 100 |
| `background_genes` | tableau de chaînes | facultatif; minItems: 1; maxItems: 20000 |
| `domain_scope` | chaîne de caractères | facultatif; enum: &#91;" annoté", "connu", "custom", "custom_annotated"&#93; |
| `correction_method` | chaîne de caractères | facultatif; par défaut: "g_SCS"; enum: &#91;"g_SCS", "bonferroni", "fdr"&#93; |
| `user_threshold` | nombre | facultatif; maximum: 1; Exclusivité Minimum: 0 |
| `all_results` | booléen | facultatif; par défaut : false |
| `ordered` | booléen | facultatif; par défaut : false |
| `measure_underrepresentation` | booléen | facultatif; par défaut : false |
| `no_iea` | booléen | facultatif; par défaut : false |
| `no_evidences` | booléen | facultatif; par défaut : false |
| `numeric_ns` | chaîne de caractères | facultatif; Longueur min: 1; Longueur max: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## Génomes {/* #family-5 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `ensembl_lookup` {/* #ensembl_lookup */}

Regardez les gènes, les transcriptions ou les protéines par ID stable, ou les gènes par symbole. requête accepte les ID ENS (version autorisée), FlyBase/WormBase/yeast IDs, ou des symboles tels que BRAF. query_type: auto (default) essaie l'ID d'abord, puis le symbole seulement en absence explicite à moins que l'entrée soit un ID canonique ENS/LRG; id n'utilise que la recherche d'ID; symbole utilise uniquement la recherche de symbole sans normalisation de version. s'applique uniquement à la recherche de symboles (homo_sapiens par défaut) et n'est pas déduit. expansion comprend les transcriptions, exons et traductions (par défaut false). Les demandes non valides et les pannes de service soulèvent des erreurs.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `query_type` | chaîne de caractères | facultatif; par défaut: "auto"; enum: &#91;"auto", "id", "symbol"&#93; |
| `species` | chaîne de caractères | facultatif; par défaut : "homo_sapiens" |
| `expand` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs` {/* #ensembl_xrefs */}

Références croisées externes d'un ID stable d'Ensembl — le pont entre les ID gènes/transcripts d'Ensembl et HGNC, BCNI (EntrezGene), UniProt, OMIM, RefSeq, Expression Atlas et autres. Args: stable_id (ENSG.../ENST..., version acceptée); external_db (fichier en amont de la base de données, par exemple) HGNC, EntrezGene, Uniprot_gn, MIM_GENE, RefSeq_mRNA; omit pour tous). Retourne &#123;stable_id, external_db, n_xrefs, xrefs&#125; — la liste COMPLETE (jamais tronquée), triée par (dbname, primary_id); chaque ligne &#123;dbname, db_display_name, primary_id, display_id, description, synonymes, info_type&#125;. Les ID inconnus retournent n_xrefs:0.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `stable_id` | chaîne de caractères | **requis** |
| `external_db` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant` {/* #ensembl_vep_variant */}

Si `variant_id` est fourni, la recherche par ID a priorité et ignore `region`, `allele` et `allele_orientation`. `allele` ne filtre pas ses résultats. La recherche par région utilise l’assemblage de référence actuel de l’espèce (GRCh38 pour l’humain). Les coordonnées commencent à 1 et incluent les deux bornes ; une insertion utilise `start = end + 1`. Par défaut, `allele_orientation` vaut `forward` : l’allèle est interprété sur le brin positif de référence, même avec le suffixe `:-1`. Avec `region`, un allèle de séquence sur le brin négatif est converti en son complément inverse avant la requête. Les allèles symboliques d’une région négative exigent `forward`. Toutes les requêtes par région sont envoyées sur le brin positif ; `normalization` conserve les entrées avant et après normalisation. Les coordonnées ne sont ni converties vers un autre assemblage ni inversées. Un gène situé sur le brin négatif n’exige pas une entrée sur ce brin.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `variant_id` | chaîne de caractères | facultatif |
| `region` | chaîne de caractères | facultatif |
| `allele` | chaîne de caractères | facultatif |
| `allele_orientation` | chaîne de caractères | facultatif; par défaut  : `forward`; Numéro: `forward`, `region` |
| `species` | chaîne de caractères | facultatif; par défaut : "homo_sapiens" |
| `max_consequences` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology` {/* #ensembl_homology */}

Orthologues ou paralogues d'un gène d'Ensembl Compara (lignes condensées — pas d'alignements/séquences). Args : gene_symbol (résolvé à un ID stable dans `species` en premier ; passer exactement un de gene_symbol/gene_id); gene_id (ENSG...); homology_type (orthologues par défaut/paralogues/projections); target_species (limité à une espèce); target_taxon (sous-arbre du taxon de la NCBI, p.ex. Primates de 9443; combinable avec target_species, OU sémantique); espèces (espèces sources, homo_sapiens par défaut); max_homologies (par défaut du plafond de ligne 200; n_total porte le nombre complet, homologies_truncated affiche le capuchon). Retourne &#123;gene_id, gene_symbol, species, homology_type, target_species, target_taxon, n_total, homologies_truncated, homologies&#125;; lignes triées par (espèces, id) type &#123;, espèce, id, protein_id, taxonomy_level, method_link_type&#125;. Quirk: la route /homologie/symbole s'arrête — cet outil résout toujours les symboles lui-même et les requêtes par ID stable.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | facultatif |
| `gene_id` | chaîne de caractères | facultatif |
| `homology_type` | chaîne de caractères | facultatif; par défaut: "orthologues"; enum: &#91;"orthologues", "paralogues", "projections"&#93; |
| `target_species` | chaîne de caractères | facultatif |
| `target_taxon` | entier | facultatif |
| `species` | chaîne de caractères | facultatif; par défaut : "homo_sapiens" |
| `max_homologies` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence` {/* #ensembl_sequence */}

Retirez la séquence d'Ensembl — par ID stable (genre/transcript/protéine) ou par région génomique. Passez la région EITHER stable_id OU. Args: stable_id (ENSG.../ENST.../ENSP..., version acceptée); région (1-basé chrom:start..end ou chrom:start-end, GRCh38 pour l'humain, max 10Mb); espèces (pour l'itinéraire régional, homo_sapiens par défaut; ignorés pour les identifiants stables); seq_type (route de l'ID: par défaut génomique/cdna/cds/protéine); Les régions qui retournent toujours dans la génomique sont ignorées). Cet outil renvoie une séquence : pour les requêtes de cdna/cds/protéines au niveau du gène qui se résolvent à plusieurs séquences, spécifiez plutôt un ID transcript/protéine stable; max_bytes (par défaut, 400000 de la fonction de garde de charge — les séquences plus grandes ont omis `seq`; longueur/sha256/métadonnées toujours retournées; re-appeler avec max_bytes plus grand pour le texte intégral). Retourne &#123;found, requête, seq_type, id, description, molécule, longueur, sha256, seq&#125; — longueur de l'unité implicite par molécule (bases pour l'ADN, résidus pour les protéines); après remplacé par seq_omitted lorsqu'il est plafonné; found:false avec des champs nuls seulement lorsque Ensembl signale explicitement l'ID stable demandé comme non trouvé; Les requêtes à séquences multiples, les types de séquences incompatibles et d'autres défaillances en amont soulèvent des erreurs.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `stable_id` | chaîne de caractères | facultatif |
| `region` | chaîne de caractères | facultatif |
| `species` | chaîne de caractères | facultatif; par défaut : "homo_sapiens" |
| `seq_type` | chaîne de caractères | facultatif; par défaut: "genomic"; enum: &#91;"genomic", "cdna", "cds", "protéine"&#93; |
| `max_bytes` | entier | facultatif; par défaut : 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region` {/* #ensembl_overlap_region */}

Liste Les caractéristiques d'Ensembl chevauchent une région génomique — gènes, transcriptions, caractéristiques réglementaires (enhancers/promoteurs), répétitions, variantes, bandes de caryotypes. Args: région (1-basé chrom inclusive:start-end GRCh38, p.ex. 7:140719327-140925199; les rejets en amont s'étendent sur la bande > 5Mb — fractionnement plus large); caractéristique (genre par défaut/transcript/exon/cds/regulatory/motif/repeat/variation/structural_variation/band/simple/misc); espèces (par défaut homo_sapiens); max_features (par défaut du plafond de ligne 500; n_total porte le nombre complet de chevauchements, features_truncated affiche le capuchon). Retourner &#123;region, especes, feature, n_total, features_truncated, features&#125; trié par (départ,id). La forme de la ligne varie — gènes &#123;id, external_name, biotype, description, début, fin, brin, canonical_transcript, ...&#125;; règlement &#123;id, description, début, fin, extended_start/end, ...&#125;. Les régions vides retournent n_total:0.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `region` | chaîne de caractères | **requis** |
| `feature` | chaîne de caractères | facultatif; par défaut: "gene"; enum: &#91;"gene", "transcript", "exon", "cds", "regulatory", "motif", "repeat", "variation", "structural_variation", "band", "simple", "misc"&#93; |
| `species` | chaîne de caractères | facultatif; par défaut : "homo_sapiens" |
| `max_features` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon` {/* #ncbi_resolve_taxon */}

Résoudre un nom d'espèce ou de taxon aux identificateurs de taxonomie de la BCNI. Accepte un nom scientifique/commun ou un ID fiscal numérique; retourne chaque match en amont de sorte que les noms ambigus ne sont pas assignés silencieusement au premier résultat.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 200 |
| `max_matches` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info` {/* #ncbi_get_assembly_info */}

Retourner l'identité exacte de l'assemblage du génome de l'ICNE pour une adhésion versionnée au FAG/ACG, y compris le taxon, le nom de l'assemblage, le synonyme UCSC, le statut et l'adhésion à RefSeq/GenBank. Les accessions sans version sont rejetées pour éviter les erreurs de reproductibilité et de compatibilité entre espèces.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `assembly_accession` | chaîne de caractères | **requis**; modèle: "^GC&#91;AF&#93;_&#91;0-9&#93;&#123; 9&#125;\\&#91;0-9&#93;+$" |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases` {/* #ncbi_get_sequence_aliases */}

Lister les noms de séquences et les alias exacts UCSC/RefSeq/GenBank pour une seule version de l'ensemble NCI. Résoudre en option un nom de séquence; Les étiquettes ambiguës partagées des chromosomes sont conservées comme des allumettes multiples au lieu de choisir un échafaudage alte ou non localisé. Les résultats sont un préfixe limité contrôlé par max_sequences (par défaut 200); utiliser un plafond plus grand lorsque le rapport d'assemblage complet est nécessaire.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `assembly_accession` | chaîne de caractères | **requis**; modèle: "^GC&#91;AF&#93;_&#91;0-9&#93;&#123; 9&#125;\\&#91;0-9&#93;+$" |
| `sequence` | chaîne de caractères | facultatif; Longueur min: 1; Longueur max: 200 |
| `max_sequences` | entier | facultatif; par défaut : 200; minimum: 1; maximum: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks` {/* #ucsc_list_tracks */}

List data tracks disponibles dans un UCSC Genome Browser (leaf tracks seulement — les requêtes), en option filtré. Arguments: génome (hg38 par défaut/hg19/mm39/danRer11/... - les assemblages 220; filter_text (sous-chaîne insensible au cas par rapport au nom/à l'étiquette courte/longue, p.ex. phyloP, TFBS, ClinVar; omit pour lister tout — hg38 a ~24k feuilles de pistes, vous voulez presque toujours un filtre); max_tracks (par défaut du plafond de ligne 200; n_total porte le nombre complet de correspondances, tracks_truncated affiche le capuchon). Retourne &#123;genome, filter_text, n_total, tracks_truncated, tracks&#125; triées par nom de piste; chaque ligne &#123;track, short_label, long_label, type, groupe, parent&#125;. Utilisez `track` avec ucsc_track_data. Quirk: premier appel par génome télécharge la liste complète ~17MB et la cache pour le processus.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `genome` | chaîne de caractères | facultatif; par défaut : "hg38" |
| `filter_text` | chaîne de caractères | facultatif |
| `max_tracks` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data` {/* #ucsc_track_data */}

Récupère les lignes brutes de n'importe quelle piste du Navigateur Génome UCSC dans une région — l'écoutille d'échappement générique derrière ucsc_conservation / ucsc_tfbs_clusters (pistes de gènes, ClinVar, catalogue GWAS, îles CpG, répétitions, ...). Args: piste (nom de ucsc_list_tracks, p.ex. gene, cpgIslandExt, clinvarMain); chrom (chr-préfixed, chr7/chrX — UCSC exige le préfixe); démarrage (à moitié ouvert en 0); un démarrage basé sur Ensembl 1 est start-1 ici); fin (exclusive); génome (par défaut hg38); max_rows (API maxItemsOutput, par défaut 1000; tronqué reflète le API's propriétaire maxItemsLimit flag). Retourne &#123;genome, track, chrom, start, end, track_type, items_returned, tronqué, rows&#125; — lignes en amont (&#123;chrom, chromStart, chromEnd, nom, score, ...&#125; de type BED; wiggle &#123;start, fin, value&#125;). Des traces inconnues s'élèvent. Quirk : pour certaines pistes énormes, les caps API sortent lui-même et pointent à dataDownloadUrl — fait écho lorsque présent. Les coordonnées doivent être des entiers non négatifs sûrs, avec `end > start`. Les valeurs non valides sont rejetées, et non arrondies ou serrées à un autre lieu.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `track` | chaîne de caractères | **requis** |
| `chrom` | chaîne de caractères | **requis** |
| `start` | entier | **requis**; minimum: 0; maximum: 9007199254740991 |
| `end` | entier | **requis**; minimum: 0; maximum: 9007199254740991 |
| `genome` | chaîne de caractères | facultatif; par défaut : "hg38" |
| `max_rows` | entier | facultatif; par défaut : 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation` {/* #ucsc_conservation */}

Sommaire de conservation évolutionnaire pour une région à partir des pistes phyloP / phastCons de l'UCSC (scores de base sur des alignements multi-espèces). Arguments: chrom (préfixés en chr); démarrage (à moitié ouvert en 0); fin (exclusive; calibrée à 100000 bp — fractionnement plus large); génome (par défaut hg38); piste (facultative); par défaut à phyloP100wayAll pour hg19 et phyloP100way pour d'autres génomes; positif=conservé, négatif=évolution rapide; les solutions de rechange hg38 phastCons100way, phyloP30way, phastCons30way, phyloP447way, phyloP470way; hg19 PhastCons100way); include_values (également renvoyer par base &#123;start,end,value&#125; les lignes captées à max_values, values_truncated datent du capuchon; false par défaut = résumé seulement); max_values (par défaut de la limite de base 2000). Retourner &#123;genome, track, chrom, start, end, span_bp, n_bases_covered, coverage_fraction, moyenne, min, max&#125; (+valeurs, values_truncated sur demande). Statistiques pondérées par la portée de base de chaque ligne, attachées à la fenêtre; bases découvertes inférieures à coverage_fraction, pas à zéro. Les pistes non-score augmentent; une liste de lignes en amont-tronquées soulève également.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `chrom` | chaîne de caractères | **requis** |
| `start` | entier | **requis**; minimum: 0; maximum: 9007199254740991 |
| `end` | entier | **requis**; minimum: 0; maximum: 9007199254740991 |
| `genome` | chaîne de caractères | facultatif; par défaut : "hg38" |
| `track` | chaîne de caractères | facultatif |
| `include_values` | booléen | facultatif; par défaut : false |
| `max_values` | entier | facultatif; par défaut : 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters` {/* #ucsc_tfbs_clusters */}

Les grappes de sites de liaison des facteurs de transcription ENCODE chevauchent une région (les grappes de pointe de type ChIP-seq sur des centaines de types cellulaires) — où les FT se lient. Arguments: chrom (préfixés en chr); démarrage (à moitié ouvert en 0); fin (exclusive); génome (hg38 piste par défaut encRegTfbsClustered ENCODE 3, ou hg19 wgEncodeRegTfbsClusteredV3; d'autres assemblées se lèvent); max_rows (API maxItemsOutput par défaut 1000; tronqué reflète maxItemsLimit). Retourne &#123;genome, track, chrom, start, end, items_returned, tronqué, n_factors, facteurs, clusters&#125; — groupes triés par (chromStart, nom) &#123;nom (symbole FT par exemple CTCF), chrom, chromStart, chromEnd, score (0-1000), sourceCount (support d'expériences)&#125;; les facteurs sont la liste distincte des FT. Score>=~600 et haute sourceCount ~ fixation robuste. Les coordonnées doivent être des entiers non négatifs sûrs, avec `end > start`. Les valeurs non valides sont rejetées, et non arrondies ou serrées à un autre lieu.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `chrom` | chaîne de caractères | **requis** |
| `start` | entier | **requis**; minimum: 0; maximum: 9007199254740991 |
| `end` | entier | **requis**; minimum: 0; maximum: 9007199254740991 |
| `genome` | chaîne de caractères | facultatif; par défaut : "hg38" |
| `max_rows` | entier | facultatif; par défaut : 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes` {/* #ucsc_chrom_sizes */}

Noms et dimensions des chromosomes et des contigs d'un assemblage UCSC — pour valider les coordonnées et les régions itératrices. Arguments: génome (par défaut hg38); filter_text (sous-chaîne insensible à la casse sur le nom, p.ex. chr1; omit pour tous — hg38 a des séquences 711, principalement alt/random/non-placed; les chromosomes primaires trient d'abord); max_chroms (par défaut du plafond de ligne 100; n_total porte le nombre complet de post-filtre, chroms_truncated affiche le capuchon). Retourne &#123;genome, filter_text, chrom_count (ensemble large à partir de API), n_total, chroms_truncated, chromosomes:&#91;&#123;name, size_bp&#125;&#93;&#125; triées par taille descendante.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `genome` | chaîne de caractères | facultatif; par défaut : "hg38" |
| `filter_text` | chaîne de caractères | facultatif |
| `max_chroms` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

</ToolOperationGroup>

## Variantes {/* #family-6 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

**règles de coordonnées gnomAD:** enregistre la broche du jeu de données avec l'ensemble de référence. Les requêtes de gènes/régions à courte variable utilisent GRCh37 pour r2.1/ExAC et GRCh38 pour r3/r4; les requêtes de gènes structuraux-variants utilisent `gnomad_sv_r2_1` (GRCh37) ou `gnomad_sv_r4` (GRCh38); changer la broche ne convertit pas les coordonnées d'entrée. `gene_constraint` et le miroir gnomAD ClinVar utilisent une recherche de gène GRCh38 fixe et n'acceptent pas d'argument d'ensemble de données. Les requêtes mitochondriales utilisent également une recherche de parent GRCh38 fixe; fournir soit un gène, soit les limites des régions ordonnées, jamais les deux modes. Les limites régionales doivent être des entiers de 1 à 999,999,999. La limite de la différence de base d'un million s'applique à `region_variants`; Ce n'est pas une limite mitochondriale séparée. Conservez les identifiants structuraux-variants spécifiques à la libération avec leur ensemble de données SV original.

### `get_variant` {/* #get_variant */}

Recherchez une variante courte de gnomAD par ID et retournez les fréquences globales d'exome/genome. `variant_id` est `chrom-pos-ref-alt` sur la compilation de référence de l'ensemble de données (GRCh38 pour r3/r4, GRCh37 pour r2.1/ExAC), par exemple. `19-44908822-C-T` (APOE rs7412); Utilisez `search_variants` pour résoudre un rsID en premier. Définissez `include_populations: true` lorsque des nombres/fréquencies spécifiques à l'ascendance sont nécessaires pour une variante individuelle. Conserver l'ensemble de données, le nombre d'allèles et les filtres de qualité lors de l'interprétation des fréquences; La rareté seule n'établit ni pathogénicité ni critère ACMG.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `variant_id` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | facultatif; par défaut: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "exac"&#93; |
| `include_populations` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants` {/* #search_variants */}

Recherche de gnomAD pour les ID de variante correspondant à une chaîne de requête (un rsID comme `rs7412`, un ID de variante, ou un préfixe). Utilisez ceci pour résoudre les IDs rs vers `chrom-pos-ref-alt` IDs pour `get_variant`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | facultatif; par défaut: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "exac"&#93; |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants` {/* #gene_variants */}

Liste ALL gnomAD variants courts dans un gène. Les limites des gènes et les coordonnées des variantes utilisent la compilation de référence de l'ensemble de données (GRCh37 pour r2.1/ExAC, GRCh38 pour r3/r4). La liste complète peut contenir des milliers de lignes pour les grands gènes. Passer exactement un de `gene_symbol` (symbole HGNC, p.ex. `APOE`) ou `gene_id` (ID génétique de l'assemblage, p.ex. `ENSG00000130203`).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | facultatif |
| `gene_id` | chaîne de caractères | facultatif |
| `dataset` | chaîne de caractères | facultatif; par défaut: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "exac"&#93; |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint` {/* #gene_constraint */}

métrique de la contrainte du gène gnomAD : pLI, nombres observés/prévus de LoF-missense-synonymes avec rapports oe + limites d'IC 90%, et par classe z-scores. Utilisation pour juger une intolérance de gène's à la perte de fonction (pLI >= 0.9 ou oe_lof_upper (LOEUF) &lt; 0.6 ~ LoF-intolérant). Passez exactement un de `gene_symbol` (par exemple `TP53`) ou `gene_id`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | facultatif |
| `gene_id` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants` {/* #region_variants */}

Liste ALL gnomAD variants courts dans une région génomique (max 1 Mb — diviser les régions plus grandes en fenêtres consécutives). `chrom` accepte `1`-`22`, `X`, `Y`, un préfixe en option `chr` et un minuscule `x`/`y`; `start`/`stop` sont basés sur 1 inclusivement et `stop - start` doit être &lt;= 1,000,000. L'ensemble de données détermine la construction de référence des coordonnées (GRCh37 pour r2.1/ExAC, GRCh38 pour r3/r4); les coordonnées d'entrée doivent déjà utiliser ce build, sans ascenseur automatique.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `chrom` | chaîne de caractères | **requis** |
| `start` | entier | **requis**; minimum: 1; maximum: 999999999 |
| `stop` | entier | **requis**; minimum: 1; maximum: 999999999 |
| `dataset` | chaîne de caractères | facultatif; par défaut: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "exac"&#93; |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant` {/* #liftover_variant */}

Carter une variante ID entre les constructions de référence (GRCh37 &lt;-> GRCh38) utilisant la table de levage gnomAD's. `variant_id` est `chrom-pos-ref-alt` sur `source_build`. L'itinéraire est directionnel : un ID GRCh38 passé avec `source_build=GRCh37` renvoie zéro résultat, pas une erreur.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `variant_id` | chaîne de caractères | **requis** |
| `source_build` | chaîne de caractères | facultatif; par défaut: "GRCh37"; enum: &#91;"GRCh37", "GRCh38"&#93; |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants` {/* #clinvar_variants */}

List ClinVar variants dans un gène comme miroir par le gnomAD, avec la signification clinique, le statut d'examen et les étoiles d'or. Les pins de sortie gnomAD's ClinVar snapshot via `clinvar_release_date`. Passez exactement un de `gene_symbol` (par exemple `BRCA1`) ou `gene_id`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | facultatif |
| `gene_id` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants` {/* #structural_variants */}

Lister les variantes structurales du gnomAD (suppressions, duplications, insertions, inversions, CNV...) qui chevauchent un gène. Passez exactement un de `gene_symbol` (par exemple `TP53`) ou `gene_id`. `dataset` est une broche SV — `gnomad_sv_r4` (par défaut GRCh38) ou `gnomad_sv_r2_1` (GRCh37); Les identifiants SV sont spécifiques aux versions.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | facultatif |
| `gene_id` | chaîne de caractères | facultatif |
| `dataset` | chaîne de caractères | facultatif; par défaut: "gnomad_sv_r4"; enum: &#91;"gnomad_sv_r4", "gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant` {/* #get_structural_variant */}

Recherchez une variante structurelle de gnomAD par son identifiant SV spécifique à la libération (p. ex. `DEL_CHR17_599B1512` dans gnomad_sv_r4). Les ID ne portent PAS les versions — `dataset` (`gnomad_sv_r4` par défaut, ou `gnomad_sv_r2_1`) doit correspondre à la version de l'ID.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `sv_id` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | facultatif; par défaut: "gnomad_sv_r4"; enum: &#91;"gnomad_sv_r4", "gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants` {/* #mitochondrial_variants */}

Énumérer les variantes mitochondriales de gnomAD avec des comptes hétéroplasmiques (`ac_het`, `ac_hom`, `max_heteroplasmy`) pour un gène mitochondrial OU pour une fenêtre de coordonnées chrM. Passez un gène (`gene_symbol` comme `MT-TL1`, ou `gene_id`) OU une région (`region_start` + `region_stop`), pas les deux.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | facultatif |
| `gene_id` | chaîne de caractères | facultatif |
| `region_start` | entier | facultatif; minimum: 1; maximum: 999999999 |
| `region_stop` | entier | facultatif; minimum: 1; maximum: 999999999 |
| `dataset` | chaîne de caractères | facultatif; par défaut: "gnomad_r4"; enum: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "exac"&#93; |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

### `clinvar_search` {/* #clinvar_search */}

Rechercher directement ClinVar (en direct NCI, pas snapshot de gnomAD's) et retourner les enregistrements de variation correspondant avec la signification clinique, le statut de l'examen et les étoiles d'or. Nécessite un courriel de contact ([Paramètres → Pouvoirs → Accès à la littérature → Contact email](../tools/credentials.md)) par politique d'utilisation des services électroniques de la BCNI. Args: requête (une requête ClinVar Entrez — texte libre comme "TP53 R175H" ou une chaîne HGVS fonctionne, et les termes fielded composent avec AND/OR/NOT, p.ex. BRCA1&#91;gene&#93;, pathogène&#91;CLIN_SIG&#93;, syndrome de "Lynch"&#91;dis&#93;, single_nucleotide_variant&#91;Type de variation&#93;; un rsID fonctionne également mais clinvar_variant_by_rsid renvoie des enregistrements plus complets), max_records (chapeau de page 1-200, par défaut 50). La correspondance TOTAL est toujours signalée; lorsque > total max_records la liste est un préfixe plafonné (ClinVar pertinence / ordre de précision) et tronqué est vrai. Les utilities E de la NCBI retournent par intermittence HTTP 500 sous charge — réessayez une fois quelques secondes plus tard si cette surface est en place.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records` {/* #clinvar_get_records */}

Récupérer des enregistrements ClinVar complets pour un lot d'adhésions VCV/RCV ou des ID de variation nue. Nécessite un courriel de contact ([Paramètres → Pouvoirs → Accès à la littérature → Contact email](../tools/credentials.md)) par politique d'utilisation des services électroniques de la BCNI. Args: adhésions (jusqu'à 50 identificateurs, formulaires mixtes acceptés — VCV000045122 (version VCV000045122.3 ok; résolu localement, gratuitement), RCV000019428 (chaque RCV coûte une recherche supplémentaire), ou un ID nu de variation ClinVar (45122). Les ID rs sont rejetés — utiliser clinvar_variant_by_rsid. Un VRC (une paire de variables-conditions) résout son enregistrement de variation VCV parent. N'abandonne jamais silencieusement une entrée.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accessions` | ['string', 'array'] | **requis** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid` {/* #clinvar_variant_by_rsid */}

Tous les enregistrements de variation ClinVar qui font référence à un rsID dbSNP, avec des classifications complètes (un rsID peut cartographier plusieurs VCV — un par allèle alternatif, par exemple. rs121913529 couvre KRAS G12D/G12V/G12A). Nécessite un courriel de contact ([Paramètres → Pouvoirs → Accès à la littérature → Contact email](../tools/credentials.md)) par politique d'utilisation des services électroniques de la BCNI. Args: rsid (dbSNP référence SNP ID, p.ex. rs7412; cas insensible, doit correspondre à rs&lt;digits>), max_records (cap 1-200, par défaut 50). le total porte toujours le nombre de matchs réels et les drapeaux tronqués une liste plafonnée; total == 0 signifie que ClinVar n'a pas d'enregistrement pour le rsID.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `rsid` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids` {/* #dbsnp_get_rsids */}

Canonique dbSNP RefSNP enregistre un lot de rsID : placements GRCh38+GRCh37, allèles, contexte génétique, fréquences des allèles par étude et références croisées ClinVar. Nécessite un courriel de contact ([Paramètres → Pouvoirs → Accès à la littérature → Contact email](../tools/credentials.md)) par politique d'utilisation des services électroniques de la BCNI; sans un, l'outil retourne &#123;error: 'contact_email_required', message&#125;. Args: rsids (jusqu'à 20 rs&lt;digets>, insensible à la casse) — chaque demande de services de variation NCI à un rythme donné, si gros lots prennent ~1 s par rsID. Retourne &#123;n_requested, records, not_found (numéros ders dbSNP does't know), not_processed (desrsID ont sauté lorsque le budget de l'horloge murale s'est épuisé — re-request just them)&#125;. Chaque enregistrement: &#123;rsid, status, create_date, last_update_date, last_update_build_id, n_citations, citations_pmids (entaché à 20; citations_truncated affiche le capuchon), variant_type, mane_select_ids, emplacements, allèles&#125;. statut est 'live', 'merged' (l'enregistrement porte à la place merged_into — re-demander ces rsIDs) ou 'no_data' (retiré/non pris en charge). Les emplacements donnent des coordonnées chromosomiques basées sur 1 avec des réf/alts par assemblage (GRCh38 d'abord, is_primary true). Chaque entrée alt-allèle: &#123;allele, ref, spdi (0-based interbase), hgvs, fréquences: &#91;&#123;study, study_version, allele_count, total_count, af&#125;&#93; (ALFA, 1000Genomes, TOPMED, gnomAD...), clinvar: &#91;&#123;rcv_accession, clinical_significances, review_status, last_evaluated_date, disease_names&#125;&#93;, gènes: &#91;&#123;symbol, gene_id, nom, orientation, conséquences (termes SO), mane_select: &#91;&#123;transcript_hgvs, protein_spdi&#125;&#93;&#125;&#93;&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `rsids` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region` {/* #dbsnp_search_by_region */}

List dbSNP rsIDs in a genomic window (esearch db=snp positional index — NCBI Variation Services n'a pas de paramètre régional). Nécessite un courriel de contact ([Paramètres → Pouvoirs → Accès à la littérature → Contact email](../tools/credentials.md)) par politique d'utilisation des services électroniques de la BCNI; sans un, l'outil retourne &#123;error: 'contact_email_required', message&#125;. Args: chrom (1-22, X, Y ou MT; 'chr' préfixe toléré), démarrage (1 inclus), arrêt (inclus; calibrée à 1 Mb — diviser les grandes régions en fenêtres consécutives; les régions denses détiennent plusieurs milliers de rsID par kb, ainsi garder les fenêtres petites ou élever max_rsids), assemblage (qui index positionnel — 'GRCh38' par défaut -> &#91;CPOS&#93;, ou 'GRCh37' -> &#91;CPOS_GRCH37&#93;; les coordonnées doivent être sur l'ensemble choisi), max_rsids (liste du capuchon 1-1000, 200 par défaut). Retourne &#123;chrom, start, stop, Assemblage, terme (la requête exacte d'Entrez utilisée), total (le compte propre de API'), n_returned, tronqué, rsids&#125;. tronqué est vrai lorsque > total n_returned — la liste est alors un préfixe dans l'ordre par défaut d'Entrez (décroissant le numéro rs), jamais une troncation silencieuse. Nourrissez des rsIDs (&lt;= 20 à la fois) à dbsnp_get_rsids pour les enregistrements complets.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `chrom` | chaîne de caractères | **requis** |
| `start` | entier | **requis** |
| `stop` | entier | **requis** |
| `assembly` | chaîne de caractères | facultatif; par défaut: "GRCh38"; enum: &#91;"GRCh38", "GRCh37"&#93; |
| `max_rsids` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## Essais cliniques {/* #family-7 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `search_trials` {/* #search_trials */}

Recherche PRIMAIRE sur ClinicalTrials.gov. Filtrer par condition, intervention, promoteur, emplacement, statut (p. ex. &#91;"RECRUITING"&#93;), phase (&#91;"PHASE1".."PHASE4"&#93;) et study_type. condition/intervention/parrain/localisation accepter la syntaxe de requête Essie (boolean AND/OR/NOT, "quoted phrases", groupement, synonymes automatiques). Page avec page_token; définissez count_total pour le nombre total de correspondances. advanced_query fusionne une expression brute d'Essie dans filter.advanced.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `condition` | chaîne de caractères | facultatif |
| `intervention` | chaîne de caractères | facultatif |
| `sponsor` | chaîne de caractères | facultatif |
| `location` | chaîne de caractères | facultatif |
| `status` | tableau de chaînes | facultatif |
| `phase` | tableau de chaînes | facultatif |
| `study_type` | chaîne de caractères | facultatif; Enum: &#91;"INTERVENTIONAL", "OBSERVATIONAL", "EXPANDED_ACCESS"&#93; |
| `advanced_query` | chaîne de caractères | facultatif |
| `page_size` | entier | facultatif; par défaut : 10; minimum: 1; maximum: 1000 |
| `page_token` | chaîne de caractères | facultatif |
| `count_total` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details` {/* #get_trial_details */}

Obtenez des détails complets pour un essai par NCT id (format "NCT" + chiffres 8; un nombre nu est préfixé, insensible à la casse). Retourne les critères d'admissibilité complets, la conception de l'étude, les critères primaires, secondaires et autres, tous les emplacements, le promoteur et les collaborateurs, les dates, l'inscription et un lien de résultats.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `nct_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor` {/* #search_by_sponsor */}

Trouver des essais parrainés par une entreprise ou une organisation (comparaison de nom partiel, p. ex. "Pfizer" correspond à "Pfizer Inc"). Facultativement étroit par état, phase et statut. Définissez count_total pour le nombre total d'essais par le promoteur. Page avec page_token.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `sponsor_name` | chaîne de caractères | **requis** |
| `condition` | chaîne de caractères | facultatif |
| `phase` | tableau de chaînes | facultatif |
| `status` | tableau de chaînes | facultatif |
| `page_size` | entier | facultatif; par défaut : 10; minimum: 1; maximum: 1000 |
| `page_token` | chaîne de caractères | facultatif |
| `count_total` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators` {/* #search_investigators */}

Trouver les chercheurs principaux et les sites de recherche par état, institution, emplacement ou investigator_name. les filtres de l'établissement sur le site et ont priorité sur l'emplacement; investigator_name recherche GlobalOfficialName et ResponsablePartyInvestigatorFullName. Retourne les contacts du site (noms, rôles, affiliations, installations, villes) avec leurs ids NCT d'essai. page_size capte le nombre d'essais scannés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `condition` | chaîne de caractères | facultatif |
| `institution` | chaîne de caractères | facultatif |
| `location` | chaîne de caractères | facultatif |
| `investigator_name` | chaîne de caractères | facultatif |
| `status` | tableau de chaînes | facultatif |
| `page_size` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints` {/* #analyze_endpoints */}

Analyser les mesures des résultats primaires/secondaires/autres (points de fin). Fournir UNIQUEMENT nct_id (mode à essai unique) OU condition (mode global pour tous les essais); si les deux sont donnés, nct_id a priorité. Le mode agrégé peut être réduit par phase et start_date_after (AAA-MM-JJ) et scanne jusqu'à des essais page_size. Renvoie les listes de paramètres ainsi que les noms de mesures les plus courants dans les essais analysés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `nct_id` | chaîne de caractères | facultatif |
| `condition` | chaîne de caractères | facultatif |
| `phase` | tableau de chaînes | facultatif |
| `start_date_after` | chaîne de caractères | facultatif |
| `page_size` | entier | facultatif; par défaut : 50; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility` {/* #search_by_eligibility */}

Appariement patient-procès. DÉFAUTS DE RECRUTIR les essais à moins que le statut ne soit établi. Fournir soit min_age ou max_age pour un âge de patient ("65 Years", "6 Months"); Les limites d'âge des essais sont vérifiées. Si les deux sont fournis, l'essai doit admettre tout l'intervalle d'âge du patient. Les limites de l'âge du procès sont illimitées. sexe MALE/FEMALE comprend les essais tout-venu; Le sexe total ou omis n'applique aucun filtre sexuel. eligibility_keywords recherche le texte des critères d'inclusion/d'exclusion (par exemple "HbA1c > 8", " mutation BRCA", "ECOG 0-1"). Au moins une condition, eligibility_keywords, min_age, max_age ou sexe est requise. Page avec page_token.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `condition` | chaîne de caractères | facultatif |
| `eligibility_keywords` | chaîne de caractères | facultatif |
| `min_age` | chaîne de caractères | facultatif |
| `max_age` | chaîne de caractères | facultatif |
| `sex` | chaîne de caractères | facultatif; Enum: &#91;"ALL", "MALE", "FEMALE"&#93; |
| `status` | tableau de chaînes | facultatif |
| `page_size` | entier | facultatif; par défaut : 10; minimum: 1; maximum: 1000 |
| `page_token` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## Génomique clinique {/* #family-8 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `clingen_gene_validity` {/* #clingen_gene_validity */}

ClinGen curations de validité de la maladie génique (comment la preuve est forte que la variation d'un gène provoque une maladie: Définitif/Strong/Moderate/Limited/Disputed/Refuted/No Connown Disease Relation). Omit le gène pour lister toutes les curations 3,600+.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity` {/* #clingen_dosage_sensitivity */}

ClinGen dosage curations: haplo-insuffisance et triplosensitivité assertions pour les gènes (et éventuellement les régions génomiques ISCA/CNV). Un symbole génétique ou un identifiant de région ISCA filtre exactement; omit pour la table complète.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene` | chaîne de caractères | facultatif |
| `include_regions` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability` {/* #clingen_actionability */}

ClinGen clinGen actionability curations: pour les troubles associés à un gène, si l'intervention précoce chez les porteurs pré-symptomatiques est actionnable (couples intervention/résultat avec gravité, probabilité, efficacité, scores de la composante nature d'intervention et score total). Le filtre Gene correspond à n'importe quel membre des sujets multi-genre.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene` | chaîne de caractères | facultatif |
| `context` | chaîne de caractères | facultatif; par défaut: "botth"; enum: &#91;"adulte", "pédiatric", "both"&#93; |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications` {/* #clingen_variant_classifications */}

ClinGen Repository Evidence Repository (ERepo) classifications de la pathogénicité des variantes du panel d'experts (interprétations du VCEP selon les critères ACMG). Fournir EXACTEMENT UN gène (symbole HGNC), caid (allèle canonique ClinGen id, p.ex. CA114360), ou hgvs (par exemple NM_000277.2:c.1222C>T). Extraction complète (matchLimit=none).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene` | chaîne de caractères | facultatif |
| `caid` | chaîne de caractères | facultatif |
| `hgvs` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes` {/* #civic_search_genes */}

Trouvez les enregistrements de gènes CIViC par le symbole exact d'Entrez (p. ex. "BRAF") . Entièrement paginé, vérifié au compte. Utilisez l'identifiant du gène CIViC retourné avec civic_gene_variants.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `entrez_symbol` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants` {/* #civic_gene_variants */}

Toutes les variantes d'un gène CIViC (par le gène id de CIViC), entièrement paginées, sont complètes même pour les gènes contenant des centaines de variantes. Trié par variante id.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_id` | entier | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant` {/* #civic_get_variant */}

Une variante de CIViC par son id de variante de CIViC (aliases, types de variantes, liaison entre caractéristiques et gènes, coordonnées pour les variantes de gènes). Retourne found=false si absent.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `variant_id` | entier | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants` {/* #civic_search_variants */}

Recherche de variantes de CIViC par sous-chaîne de noms (par exemple : "V600"), éventuellement inclu dans un id de gène CIViC. Entièrement paginés; trié par variante id.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `name` | chaîne de caractères | **requis** |
| `gene_id` | entier | facultatif |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item` {/* #civic_get_evidence_item */}

Un élément de preuve du CIVIC par id : la signification clinique d'un profil moléculaire dans un contexte de maladie/thérapie (niveau de preuve A-E, type, direction, signification, cote, maladie, thérapies, source). Retourne found=false si absent.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `evidence_id` | entier | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence` {/* #civic_search_evidence */}

Rechercher les éléments de preuve de la CIViC par toute combinaison de filtres; entièrement paginé, vérifié en nombre, trié par des preuves ascendantes id. Les filtres enum prennent les valeurs enum de CIVic GraphQL (evidence_level "A".."E"; evidence_type PRÉDICTIF ,PROGNOSTIC ,DIAGNOSTIC ,PRÉDISPOSING ,ONCOGENIC ,FUNCTIONNEL ; evidence_direction SUPPORTS DOES_NOT_SUPPORT; statut ACCEPTÉ , SUBMITÉ , REJETÉ ,ALL). Fournir au moins un filtre — aucun filtre ne marche sur l'ensemble du corpus de 10k+.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `disease_name` | chaîne de caractères | facultatif |
| `therapy_name` | chaîne de caractères | facultatif |
| `evidence_level` | chaîne de caractères | facultatif |
| `evidence_type` | chaîne de caractères | facultatif |
| `evidence_direction` | chaîne de caractères | facultatif |
| `significance` | chaîne de caractères | facultatif |
| `variant_origin` | chaîne de caractères | facultatif |
| `evidence_rating` | entier | facultatif |
| `status` | chaîne de caractères | facultatif |
| `molecular_profile_name` | chaîne de caractères | facultatif |
| `molecular_profile_id` | entier | facultatif |
| `variant_id` | entier | facultatif |
| `disease_id` | entier | facultatif |
| `therapy_id` | entier | facultatif |
| `phenotype_id` | entier | facultatif |
| `source_id` | entier | facultatif |
| `assertion_id` | entier | facultatif |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion` {/* #civic_get_assertion */}

Une affirmation du CIVIC par id : une allégation sommaire curée par des experts (niveau de l'AMP/ASCO/CAP, codes ACMG/ClinGen, drapeaux d'essai de la FDA) qui regroupe les preuves d'un profil moléculaire dans un contexte de maladie/thérapie. Retourne found=false si absent.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `assertion_id` | entier | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions` {/* #civic_search_assertions */}

Rechercher les assertions de CIViC par toute combinaison de filtres; entièrement paginé, vérifié en nombre, trié par id d'affirmation ascendante. assertion_type PRÉDICTIF ,PROGNOSTIC ,DIAGNOSTIC ,PRÉDISPOSING ,ONCOGENIC ; assertion_direction SUPPORTS DOES_NOT_SUPPORT; amp_level p.ex. TRE_I_LEVEL_A; statut ACCEPTÉS SUBMETTÉS RÉJETÉS À TOUS. Aucun filtre ne marche sur tout le corpus.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `disease_name` | chaîne de caractères | facultatif |
| `therapy_name` | chaîne de caractères | facultatif |
| `assertion_type` | chaîne de caractères | facultatif |
| `assertion_direction` | chaîne de caractères | facultatif |
| `significance` | chaîne de caractères | facultatif |
| `amp_level` | chaîne de caractères | facultatif |
| `status` | chaîne de caractères | facultatif |
| `molecular_profile_name` | chaîne de caractères | facultatif |
| `molecular_profile_id` | entier | facultatif |
| `variant_id` | entier | facultatif |
| `variant_name` | chaîne de caractères | facultatif |
| `disease_id` | entier | facultatif |
| `therapy_id` | entier | facultatif |
| `phenotype_id` | entier | facultatif |
| `evidence_id` | entier | facultatif |
| `summary` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile` {/* #civic_get_molecular_profile */}

Un profil moléculaire du CIViC par id (combinaison variable à laquelle s'attachent les preuves/affirmations), y compris : les variantes de nom, de score et de composant parsés. Retourne found=false si absent.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mp_id` | entier | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles` {/* #civic_search_molecular_profiles */}

Recherche de profils moléculaires CIViC par sous-chaîne de noms (p. ex. "BRAF V600E"). Entièrement paginés; trié par id.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `name` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases` {/* #civic_search_diseases */}

Recherche dans les dossiers de maladies de la CIViC par sous-chaîne de noms (p. ex. "melanoma"). Retourne DOIDs + noms d'affichage; entièrement paginés; trié par id.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `name` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies` {/* #civic_search_therapies */}

Recherche dans les dossiers de thérapie par CIViC par sous-chaîne nominative (p. ex. "vemurafenib"). Retourne les ids NCIt + noms; entièrement paginés; trié par id.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `name` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql` {/* #open_targets_graphql */}

Exécutez une requête arbitraire de GraphQL contre la plateforme Open Targets API (cibles, maladies, médicaments, scores d'association cible-maladie, preuves, tractabilité, sécurité, médicaments connus). Les requêtes d'introspection fonctionnent pour la découverte du schéma. Note connueDrugs a été rebaptisé drogueAndClinicalCandidats en amont.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `variables` | objet | facultatif |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs` {/* #open_targets_disease_drugs */}

Médicaments connus/d'investigation pour une maladie (plate-forme ouverte de cibles) — enveloppe Maladie.drogueEtClinicalCandidats. efo_id est un id de l'ontologie de la maladie (EFO/MONDO/etc., p.ex. "MONDO_0004992").

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `efo_id` | chaîne de caractères | **requis** |
| `size` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets` {/* #open_targets_disease_targets */}

Les cibles associées les plus élevées pour une maladie, classées par Open Targets score d'association global — wraps Disease.associatedTargets. efo_id est un id d'ontologie de la maladie (EFO/MONDO/etc.).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `efo_id` | chaîne de caractères | **requis** |
| `size` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug` {/* #open_targets_drug */}

Détails du médicament par ChEMBL id (Open Targets Platform) – nom, type, stade clinique maximal et mécanismes d'action (cible + type d'action). chembl_id p.ex. "CHEMBL1201583".

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `chembl_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## Structures & Interactions {/* #family-9 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `emdb_get_entries` {/* #emdb_get_entries */}

Récupérer des enregistrements de métadonnées structurées pour les entrées de cartes 3D de cryo-EM EMDB. Accepte les adhésions comme 'EMD-1234', 'emd-1234' ou ' 1234'. Chaque enregistrement porte le titre, la méthode de détermination de la structure (singleParticle / hélical / tomographie / sous-tomogrammeA moyenne / électroniqueCrystallographie), la résolution dans Angstrom (null pour les entrées sans résolution rapportée, p.ex. tomogrammes bruts) et la méthode de résolution, les dates de dépôt/délivrance, les noms d'échantillons et de macromolécules/supramolécules, les ID de modèles PDB (liste vide lorsqu'aucun modèle n'est monté), la citation principale (journal, année, premier auteur, DOI, PMID), les dimensions de la carte et la taille du voxel, et l'état. Les entrées obsolètes rapportent les adhésions is_obsolete=true plus superseded_by. Les accessions inconnues reviennent sous le nom de &#123;"emdb_id", "error": "not_found"&#125; — ne jamais tomber silencieusement. Métadonnées seulement; les volumes de cartes ne sont jamais téléchargés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `emdb_ids` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries` {/* #emdb_search_entries */}

Rechercher EMDB avec une requête de type Solr; récupération complète en page des lignes compactes. Exemples de requêtes: 'title:"apoferritin" AND resolution:&#91;0 to 1.5&#93;', 'structure_determination_method:"singleParticle"', 'current_status:"REL" ET release_date:&#91;2024-01-01T00:00:00Z À &#42;&#93;'. Args : requête (chaîne de requêtes Solr); max_rows (cap de ligne, par défaut 1000). Retourne num_found_released (le nombre d'entrées des API' propres de la voie facet — ground truth), rows_retrieved, rows_by_status (REL vs OBS — la route de recherche retourne aussi les entrées obsolètes mais elles ne sont PAS comptées comme publiées), released_complete (véritable iff chaque match libéré a été récupéré; false signifie max_rows tronqué le balayage ou les nombres en désaccord), et enregistre : lignes compactes par entrée (emdb_id, titre, résolution, structure_determination_method, current_status, release_date, fitted_pdbs) triées par adhésion EMD.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `max_rows` | entier | facultatif; par défaut : 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section` {/* #emdb_get_entry_section */}

Saisissez une section de métadonnées détaillée pour les entrées de la BDEM. Sections: 'publications' — citation principale avec liste d'auteurs ordonnée complète, citations auxiliaires, références externes (PMID/DOI/ISSN/CSD); 'map' — fichier, format, type de données, dimensions, espacement voxel, origine, ordre d'axe, cellule, statistiques voxel, niveaux de contour, symétrie; 'sample' — les enregistrements par macromolécule (type, poids moléculaire, copies, numéro CE, organisme source + NCBI en circulation, séquences croisées) et les enregistrements par supramoléculecule; 'imagerie' — microscope, tension, source d'électrons, détecteur, dose, modes d'imagerie, champ de déconcentration, grossissement, Cs, cryogène, conditions grille/buffer/vitrification (un enregistrement par session de microscopie — les entrées peuvent porter plusieurs). Args: emdb_ids (liste d'adhésion, n'importe lequel des EMD-1234/emd-1234/1234); (une des publications/carte/échantillon/imagerie). Des accessions inconnues sont signalées avec "error": "not_found". Utilisez emdb_get_entries d'abord lorsque vous avez seulement besoin de l'enregistrement principal.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `emdb_ids` | tableau de chaînes | **requis** |
| `section` | chaîne de caractères | **requis**; enum: &#91;"publications", "map", "sample", "imaging"&#93; |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation` {/* #emdb_get_validation */}

Renseignez-vous sur les paramètres de validation numérique et d'analyse pour les entrées EMDB. Par entrée (à partir de la route d'analyse/EMDB): Q-score, inclusion d'atomes, niveaux de contour recommandés/prédictés/rawmap, volumes modélisés/masques, rapport modél-map, mesures de surface — où le pipeline de validation les a calculés. available_blocks liste chaque bloc du service de validation retourné; Les charges utiles limitées (tomogrammes, entrées sans modèle ou historiques) donnent des valeurs nulles explicites. Entrées sans rapport d'analyse de validation has_validation_analysis=false — jamais laissé tomber silencieusement.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `emdb_ids` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes` {/* #complexportal_get_complexes */}

Renseignez-vous sur les dossiers du Portail complexe par adhésion au CPX. Chaque enregistrement: complexe AC, noms recommandés/systématiques + synonymes, espèces et taxides, liste des participants avec stœchiométrie (copies min/max), rôle biologique et type d'interactivité, preuve du code ECO, annotations GO, et références croisées — la description curée manuellement d'un complexe macromoléculaire stable. Les dossiers reviennent dans l'ordre des entrées; Les accessions inconnues sont listées dans `not_found` plutôt que silencieusement abandonnées. Pour l'interaction binaire *preuve* (qui lie qui dans quelle expérience) utilise plutôt les outils intacts_&#42;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `complex_acs` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant` {/* #complexportal_search_by_participant */}

Portail complexe de recherche pour les complexes contenant une molécule. `accession` est une adhésion de participant — UniProt (par exemple: 'P04637'), ChEBI ou RNAcentral. Avec participants_only=true (par défaut), la recherche est qualifiée de champ (pxref:&lt; accession>) de sorte que seuls les complexes qui contiennent réellement la molécule comme participant curé sont retournés; avec faux, l'adhésion nue est également jumelée comme texte libre (descriptions, noms), qui sur-rapporte mais peut attraper des mentions. Toutes les pages de résultats sont récupérées et le nombre de lignes est vérifié par rapport au total déclaré par le service (total_reported == total_retrieved, ou l'appel échoue fort). Les hits sont des enregistrements compacts (complex_ac, nom, espèce, interagissants) triés par adhésion complexe; récupérer tous les détails avec complexportal_get_complexes.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |
| `participants_only` | booléen | facultatif; par défaut : true |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions` {/* #intact_fetch_interactions */}

Récupérer TOUTES les interactions binaires IntAct correspondant à une requête, MI-score filtré. `query` est une adhésion UniProt (par exemple 'P04637'), symbole de gène, texte libre, ou toute requête IntAct Solr. Retrieval est un balayage paginé complet vérifié par rapport au total déclaré par le serveur (n_records == total_elements, ou l'appel FAILS LOUDLY — la troncation silencieuse est impossible). min_mi_score/max_mi_score côté serveur du score de confiance IntAct MI (0.45 est un plancher de confiance moyenne commun); Filtres interactor_species par nom d'espèce ou par taxi (p. ex. &#91;"Homo sapiens"&#93; ou &#91;" 9606"&#93;). Les enregistrements sont minces et structurés: paire d'interacteurs (AC IntAct, identifiants de base de données, noms de molécules, espèces/taxides), type d'interaction, méthode de détection (+MI id), rôles expérimentaux, organisme hôte, score MI, PubMed id, premier auteur, base de données source — trié par score DESCENDING MI. Listes de sortie au plus des enregistrements max_records_returned (records_truncated=true lorsque le balayage vérifié était plus grand; n_records rapporte toujours le vrai total). Grandes requêtes (par exemple: Les interactions CFTR ~10k) prennent un certain temps — étroite avec min_mi_score ou des espèces lorsque c'est possible.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `min_mi_score` | nombre | facultatif; par défaut : 0 |
| `max_mi_score` | nombre | facultatif; par défaut : 1 |
| `interactor_species` | tableau de chaînes | facultatif |
| `max_records_returned` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor` {/* #intact_get_interactor */}

Résoudre une molécule à ses enregistrements interactifs IntAct. `query` est une adhésion UniProt, un symbole de gène ou un interactif IntAct AC (p. ex. 'EBI-7090529') . Retourne TOUS les enregistrements d'interactions correspondants avec un n_matches explicite — une adhésion UniProt peut se résoudre à la protéine canonique plus les interactions chaîne/isoforme, et cet outil n'en choisit jamais silencieusement. Chaque enregistrement : interactor_ac, preferred_identifier, nom, espèce, taxid, interactor_type, et le interaction_count vu par IntAct (utile pour tailler un balayage intact_fetch_interactions).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details` {/* #intact_get_interaction_details */}

Détails complets pour l'interaction ONE IntAct AC (p. ex. 'EBI-15635490') . Retourne le type d'interaction, l'organisme hôte, la méthode de détection, la publication, les références croisées, les annotations, les paramètres cinétiques/affinités et les confidences, ainsi que les enregistrements par participant (identificateur, espèce, rôle biologique et expérimental, méthodes de détection des participants) à moins que include_participants=false. Obtenez des AC d'interaction à partir des enregistrements intact_fetch_interactions (le champ interaction_ac). ACs inconnus retournent &#123; interaction_ac, erreur: 'not_found' &#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `interaction_ac` | chaîne de caractères | **requis** |
| `include_participants` | booléen | facultatif; par défaut : true |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network` {/* #intact_build_network */}

Construire un réseau d'interaction de profondeur-1 IntAct autour des protéines de graines. `seed_accessions` sont des adhésions UniProt. Étape 1 : balayage d'interaction MI-score-filtré complet et vérifié par comptage par graine. Étape 2: les partenaires de chaque bord de graine et les graines forment le jeu de nœuds. Étape 3: les bords partenaires ne sont découvrables qu'en interrogeant les partenaires eux-mêmes, de sorte que jusqu'à max_interactors_expanded partenaires sont interrogés (la plupart connectées d'abord, les liens par identifiant) et les bords avec les deux paramètres à l'intérieur du nœud sont conservés. Le bloc d'expansion indique exactement quels partenaires n'ont pas été ou n'ont pas été élargis (l'expansion.complete=false signifie qu'il peut y avoir plus de bords partenaires-partenaires). Sortie: noeuds, bords (avec score MI, méthode de détection, PubMed id), statistiques de balayage par grain. Garder quelques graines et min_mi_score >= 0.45 – chaque expansion est un balayage paginé complet.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `seed_accessions` | tableau de chaînes | **requis** |
| `min_mi_score` | nombre | facultatif; par défaut : 0.45 |
| `max_interactors_expanded` | entier | facultatif; par défaut : 25 |
| `interactor_species` | tableau de chaînes | facultatif |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures` {/* #pdb_search_structures */}

Rechercher les entrées de l'APB RCSB par filtres d'attributs; paged, plafonné + signalé. Tous les filtres ET ensemble; au moins un est nécessaire. `text` est une requête de pertinence texte complet ('p53 domaine de liaison ADN'); `organism` est un nom de lignée source-organisme exact ('Homo sapiens' — correspond à n'importe quel niveau de lignée, donc 'Eukaryota' fonctionne aussi); `taxonomy_id` une BCNI a fait l'objet d'un taxi (9606); `uniprot_accession` trouve des entrées dont les entités polymère s'inscrivent dans cette UniProt ('P04637' -> chaque structure p53; `experimental_method` est le vocabulaire PDB ('X-RAY DIFFRACTION', 'ELECTRON MICROSCOPY', 'SOLUTION NMR', ... — erreur de valeurs inconnues et insensibles à la situation avec la liste complète; `max_resolution_angstrom` conserve les entrées à la résolution ou en dessous; `ligand_comp_id` nécessite un composant non polymère lié par la chim-comp id ('ZN', 'ATP', 'HEM'). include_computed_models=true ajoute des modèles de structure calculés (p. ex. AlphaFold) aux résultats expérimentaux par défaut seulement. Retourne total_count (le total de correspondance des API's — ground truth), n_retrieved, tronqué (true iff total_count > _retraité; max_rows, 1..1000, récupération de caps), et enregistrements &#91;&#123;pdb_id, score&#125;&#93; dans l'ordre de pertinence. Identificateurs uniquement — chaîne à pdb_get_structures pour les métadonnées.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `text` | chaîne de caractères | facultatif |
| `organism` | chaîne de caractères | facultatif |
| `taxonomy_id` | entier | facultatif |
| `uniprot_accession` | chaîne de caractères | facultatif |
| `experimental_method` | chaîne de caractères | facultatif |
| `max_resolution_angstrom` | nombre | facultatif |
| `ligand_comp_id` | chaîne de caractères | facultatif |
| `include_computed_models` | booléen | facultatif; par défaut : false |
| `max_rows` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures` {/* #pdb_get_structures */}

Récupère les résumés d'entrée de niveau pour les entrées PDB (batch, max 25 ids). Accepte en tout cas les id PDB de caractère 4 (' 1tup' == ' 1TUP'; les duplicata sont doublonnés). Chaque enregistrement: titre, méthodes expérimentales, résolution en Angstrom (null pour les méthodes sans un, par exemple. RMN), méthode de détermination (expérimentale vs calculale), dates et statut de dépôt/libération/révision, poids moléculaire (kDa), nombre d'entités et de assemblage (protéines/ADN/polymère ARN + nonpolymère), ligand lié ids chim-comp, listes d'entités polymère/non polymère (inputs for pdb_get_entities / pdb_get_ligands), et citation principale (titre, journal, année, auteurs, PubMed id, DOI). Les ids inconnus reviennent sous la forme de &#123;"pdb_id", "error": "not_found"&#125; — ne jamais tomber silencieusement. Métadonnées seulement; les fichiers de coordination ne sont jamais téléchargés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pdb_ids` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities` {/* #pdb_get_entities */}

Détails de l'entité polymère pour une entrée PDB, y compris Les cartes UniProt. Avec entity_ids=null chaque entité polymère de l'entrée est récupérée, captée à 25 avec tronqué=true et n_polymère_entities signalant le nombre vrai d'entry's (de grands assemblages comme les ribosomes portent 50+ — obtenez la liste complète d'id de pdb_get_structures' polymer_entity_ids et page avec des sous-ensembles explicites comme &#91;" 26", " 27"&#93;); avec un sous-ensemble entity_ids explicite, le total d'entrée n'est pas récupéré, donc n_polymère_entities est nul; une liste explicite de entity_ids plus grande que les erreurs 25. Chaque enregistrement : description, type de polymère (protéine / ADN / ARN), longueur de séquence, nombre de mutations, copies déposées, ids en chaîne (asym + auteur), organismes sources avec taxides, accessions UniProt avec couverture de séquence par entité (SIFTS) et régions alignées UniProt (coordonnées d'entity-seq vs référence-seq). Les identifiants d'entités inconnues sont listés dans not_found; une erreur d'identification d'entrée inconnue. include_sequences=true ajoute la séquence canonique d'une lettre par entité; Si les séquences combinées dépassent max_bytes (par défaut 400000), elles sont omises et sequences_omitted explique pourquoi — les métadonnées survivent toujours.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pdb_id` | chaîne de caractères | **requis** |
| `entity_ids` | tableau de chaînes | facultatif |
| `include_sequences` | booléen | facultatif; par défaut : false |
| `max_bytes` | entier | facultatif; par défaut : 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands` {/* #pdb_get_ligands */}

Ligands coniques (composants non polymères) d'une seule entrée PDB, avec chimie. Déplace les entités non-polymères 's d'entrée et résout chaque composant chimique: par ligand — entity id, chem-comp id ('ZN', 'ATP'), description, nombre de copies déposées, ids de chaîne d'auteur, et un bloc chem_comp (nom, formule, poids de la formule, charge formelle, type de composant, InChICey, SMILES stéréo). Les eaux ne sont pas des entités non polymères dans le modèle de données de l'APB et n'apparaissent jamais. Entrées sans ligands retour ligands: &#91;&#93;. n_nonpolymère_entities est le nombre vrai d'entry's; tronqué=true lorsqu'il dépasse max_ligands (clamé à 1..25, qui limite le budget de la demande) — jamais silencieusement abandonné. Entités/composantes les données API ne sont plus utilisées sont déclarées en ligne avec "error": "not_found" (résultats partiels, pas un appel avorté). Erreurs d'identification d'entrée inconnues.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pdb_id` | chaîne de caractères | **requis** |
| `max_ligands` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction` {/* #alphafold_get_prediction */}

AlphaFold DB a prédit des métadonnées de structure pour une adhésion UniProt. Retourne les enregistrements has_model, n_models et par modèle. Une seule adhésion peut porter plusieurs modèles (canoniques + isoformes comme 'P04637-9', et les fournisseurs communautaires au-delà du pipeline monomère Google DeepMind — provider_id / tool_used les identifient). Chaque modèle : entry id, UniProt annotation (id, description, gène, organisme, taxid, revised flags), sequence coordinates and length, global pLDDT (global_plddt, 0-100) plus la fraction de résidus par bac de confiance pLDDT (very_low &lt; 50, low 50-70, confiance 70-90, very_high > 90), model version info et date de création, et télécharger les URLs (coordonnées Cif/bcif/pdb, PAE JSON + image, per-residue pLDDT JSON, MSA, AlphaMissense CSV si disponible) — URLs seulement, payloads ne sont jamais téléchargés; Allez les chercher vous-même si nécessaire. Adhésions sans retour de prédiction has_model=false (pas une erreur); les identifiants mal formés retournent un champ `error` explicite. include_sequence=true ajoute la séquence du modèle (protéine une lettre).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `uniprot_accession` | chaîne de caractères | **requis** |
| `include_sequence` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage` {/* #alphafold_check_coverage */}

Contrôle de couverture AlphaFold DB par lots (max. 40 adhésions UniProt uniques). Les entrées vierges et les duplicata sont dépouillées avant l'application du plafond du lot, et divulguées : n_requested == n_unique + n_blank_skipped + n_duplicate_skipped se réconcilie toujours. Un enregistrement compact par adhésion unique, en ordre d'entrée : has_model, n_models, et le modèle primaire (première liste) 's model_entity_id, latest_version, global_plddt et sequence_length. Adhésions sans rapport de prédiction has_model=false; Les malformés portent un champ `error` explicite — jamais laissé tomber silencieusement. Utilisez pour trier les protéines d'un ensemble qui ont des structures prédites utilisables avant de tirer des enregistrements complets avec alphafold_get_prediction.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `uniprot_accessions` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## CEMBL {/* #family-10 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `compound_search` {/* #compound_search */}

Rechercher les composés chimiques ChEMBL par nom (par défaut), ChEMBL id ou structure moléculaire. Par nom : sous-chaîne de synonymes insensibles à la casse (revient à une correspondance de nom préféré). Par chembl_id : recherche directe d'enregistrement. Par les sourires : Recherche de similarité Tanimoto lorsque similarity_threshold est défini, sinon une recherche de sous-structure (les marches de structure sont plafonnées et révèlent walk_truncated/upstream_total). Filtres max_phase optionnels par stade clinique. Passez au moins un nom, chembl_id, ou des sourires. Utilisez plutôt drug_search lors de la recherche par indication thérapeutique.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `name` | chaîne de caractères | facultatif |
| `chembl_id` | chaîne de caractères | facultatif |
| `smiles` | chaîne de caractères | facultatif |
| `similarity_threshold` | entier | facultatif; minimum: 70; maximum: 100 |
| `max_phase` | entier | facultatif; enum: &#91;0, 1, 2, 3, 4&#93; |
| `limit` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search` {/* #drug_search */}

Rechercher les médicaments approuvés et les candidats cliniques par indication thérapeutique (terme de l'OEN, correspondance partielle). Joindre les lignes drug_indication à des molécules mères distinctes, puis aux enregistrements de molécules et aux avertissements de retrait/boîte noire. only_approved se limite à la phase 4. Les post-filtres optionnels molecule_chembl_id, drug_name (sous-chaîne de nom préféré) et max_phase (>=) rétrécissent l'ensemble joint. Utilisez compound_search pour les recherches de nom/id/structure.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `indication` | chaîne de caractères | **requis** |
| `drug_name` | chaîne de caractères | facultatif |
| `molecule_chembl_id` | chaîne de caractères | facultatif |
| `max_phase` | entier | facultatif; enum: &#91;0, 1, 2, 3, 4&#93; |
| `only_approved` | booléen | facultatif; par défaut : false |
| `limit` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet` {/* #get_admet */}

Récupérer les propriétés moléculaires calculées par ChEMBL pour l'évaluation de la ressemblance médicamenteuse / ADMET d'une molécule (ALogP, poids moléculaire, PSA, HBA/HBD, liaisons rotatives, cycles aromatiques, atomes lourds, violations de la règle de 5, passage de la règle de 3, QED, formule moléculaire). Ils sont calculés à partir de la structure, et non de mesures expérimentales.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `molecule_chembl_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity` {/* #get_bioactivity */}

Récupérer les mesures de bioactivité du ChEMBL (IC50, Ki, Kd, EC50, ...) pour les interactions entre les cibles composées. Filtre par molecule_chembl_id et/ou target_chembl_id, activity_type (standard_type), un plancher pChEMBL (min_pchembl), une gamme standard_value (min_value/max_value) et une unité (standard_units). Retourne une page commandée par activity_id avec un résumé le plus puissant.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `molecule_chembl_id` | chaîne de caractères | facultatif |
| `target_chembl_id` | chaîne de caractères | facultatif |
| `activity_type` | chaîne de caractères | facultatif; enum: &#91;"IC50", "EC50", "Ki", "Kd", "AC50", "GI50", "ED50", "Potency"&#93; |
| `min_pchembl` | nombre | facultatif; minimum: 0; maximum: 14 |
| `min_value` | nombre | facultatif |
| `max_value` | nombre | facultatif |
| `unit` | chaîne de caractères | facultatif; enum: &#91;"nM", "uM", "mM", "pM", "M"&#93; |
| `limit` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism` {/* #get_mechanism */}

Récupérer les registres du mécanisme d'action de la LLEMCH pour les médicaments approuvés et les candidats cliniques. Filtrer par molecule_chembl_id, target_chembl_id et/ou action_type. Lorsqu'un id de molécule ne produit rien, se rétracte contre la molécule mère de sorte que les ids de forme saline se résolvent. Retourne une page commandée par mec_id avec un résumé de type action.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `molecule_chembl_id` | chaîne de caractères | facultatif |
| `target_chembl_id` | chaîne de caractères | facultatif |
| `action_type` | chaîne de caractères | facultatif; énième: &#91;"INTHIBITEUR", "AGONISTE", "ANTAGONISME", "BLOCKER", "MODULATEUR", "OUVERTURE", "ACTIVATEUR", "MODULATEUR ALLOSTERIQUE POSITIF", "MODULATEUR ALLOSTÉRIC NÉGATIF", "AGONISTE PARTICULIER", "AGONISTE INVERSE"C'est pas vrai. |
| `limit` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search` {/* #target_search */}

Rechercher les cibles biologiques de ChEMBL (protéines, complexes, familles, organismes). Filtrer par target_chembl_id, gene_symbol (composante exacte-synonyme), target_name (sous-chaîne de noms), organisme (sous-chaîne) et/ou target_type. Chaque résultat porte ses composants avec des adhésions UniProt, un gene_symbol et des listes de références croisées délimitées.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `target_name` | chaîne de caractères | facultatif |
| `gene_symbol` | chaîne de caractères | facultatif |
| `target_chembl_id` | chaîne de caractères | facultatif |
| `organism` | chaîne de caractères | facultatif |
| `target_type` | chaîne de caractères | facultatif; Enum: &#91;"SINGLE PROTEIN", "PROTEIN COMPLEX", "PROTEIN FAMILY", "ORGANISM", "TISSUE", "CELL-LINE", "NUCLEIC-ACID", "SUBCELLULAR"&#93; |
| `limit` | entier | facultatif; par défaut : 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## bioRxiv {/* #family-11 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `get_categories` {/* #get_categories */}

Énumérez toutes les catégories de sujets bioRxiv 27 et leurs limaces compatibles API (p. ex. "biologie du cancer" -> "cancer_biology"). Utilisez avant search_preprints pour découvrir les valeurs de catégorie valides.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints` {/* #search_preprints */}

Recherche bioRxiv/medRxiv préimpressions par date et (facultativement) catégorie. Utilisez exactement une méthode de recherche : date_from+date_to, recent_days (derniers jours N) ou recent_count (N le plus récent dans une fenêtre 90-jour); avec aucun, les derniers 60 jours. Il n'y a pas de recherche de mots-clés/texte. Le curseur pagine. Retourne DOI, le titre, les auteurs, la date, la catégorie, la version et un aperçu abstrait 200-char.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `server` | chaîne de caractères | facultatif; par défaut: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `category` | chaîne de caractères | facultatif; énième: &#91;"comportement animal et cognition", "biochimie", "bioingénierie", "bioinformatique", "biophysique", "biologie du cancer", "biologie cellulaire", "essais cliniques", "biologie du développement", "écologie", "épidémiologie", "biologie évolutive", "génétique", "génomique", "immunologie", "microbiologie", "biologie moléculaire", "neurosciences", "paléontologie", "pathologie", "pharmacologie et toxicologie", "physiologie", "biologie végétale", "communication scientifique et éducation", "biologie synthétique", "biologie des systèmes", "zoologie"C'est pas vrai. |
| `date_from` | chaîne de caractères | facultatif |
| `date_to` | chaîne de caractères | facultatif |
| `recent_days` | entier | facultatif; minimum: 1 |
| `recent_count` | entier | facultatif; minimum: 1 |
| `limit` | entier | facultatif; par défaut : 10; minimum: 1; maximum: 100 |
| `cursor` | entier | facultatif; par défaut : 0; minimum: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint` {/* #get_preprint */}

Obtenez des métadonnées complètes pour une préimpression par DOI (bare " 10.1101/..." ou une URL complète de [https://doi.org/](https://doi.org/)). Utilise la dernière version. Retourne le titre, les auteurs, l'auteur + institution correspondant, l'abstrait complet, la catégorie, la licence, la version, JATS XML, le financement, la revue publiée DOI (si liée), PDF et les URL Web, et le nombre de versions. Les préimpressions ne sont PAS examinées par les pairs.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `doi` | chaîne de caractères | **requis** |
| `server` | chaîne de caractères | facultatif; par défaut: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints` {/* #search_published_preprints */}

Trouvez les préimpressions publiées par la suite dans des revues évaluées par des pairs (préimpression -> des liens d'articles de journaux). Mêmes méthodes de recherche que search_preprints (date_from+date_to / recent_days / recent_count). include_details=false retourne un résumé compact. filtres de l'éditeur par préfixe de la revue DOI (par exemple "10.1038" pour la Nature) via la route bioRxiv-only /publister.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `server` | chaîne de caractères | facultatif; par défaut: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `publisher` | chaîne de caractères | facultatif |
| `include_details` | booléen | facultatif; par défaut : true |
| `date_from` | chaîne de caractères | facultatif |
| `date_to` | chaîne de caractères | facultatif |
| `recent_days` | entier | facultatif; minimum: 1 |
| `recent_count` | entier | facultatif; minimum: 1 |
| `limit` | entier | facultatif; par défaut : 10; minimum: 1; maximum: 100 |
| `cursor` | entier | facultatif; par défaut : 0; minimum: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder` {/* #search_by_funder */}

Trouver des préimpressions reconnaissant un bailleur de fonds, identifiés par ROR id (9-char, p.ex. " 021nxhr62" pour les NIH; une URL [https://ror.org/](https://ror.org/) complète est également acceptée). Nécessite un date_from + date_to explicite; Les métadonnées de financement commencent 2025-04-10. Filtre de catégorie optionnel. Le curseur pagine. Même forme de résultat compacte que search_preprints.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `funder_ror_id` | chaîne de caractères | **requis** |
| `date_from` | chaîne de caractères | **requis** |
| `date_to` | chaîne de caractères | **requis** |
| `server` | chaîne de caractères | facultatif; par défaut: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `category` | chaîne de caractères | facultatif; énième: &#91;"comportement animal et cognition", "biochimie", "bioingénierie", "bioinformatique", "biophysique", "biologie du cancer", "biologie cellulaire", "essais cliniques", "biologie du développement", "écologie", "épidémiologie", "biologie évolutive", "génétique", "génomique", "immunologie", "microbiologie", "biologie moléculaire", "neurosciences", "paléontologie", "pathologie", "pharmacologie et toxicologie", "physiologie", "biologie végétale", "communication scientifique et éducation", "biologie synthétique", "biologie des systèmes", "zoologie"C'est pas vrai. |
| `limit` | entier | facultatif; par défaut : 10; minimum: 1; maximum: 100 |
| `cursor` | entier | facultatif; par défaut : 0; minimum: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics` {/* #get_content_statistics */}

les statistiques sur les présentations de bioRxiv pour toutes les années — nouveaux chiffres par rapport aux chiffres révisés par période, avec des totaux cumulatifs en cours. intervalle est "mensuelle" (par défaut) ou "anly".

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `interval` | chaîne de caractères | facultatif; par défaut: "mensuel"; enum: &#91;"mensuel", "anly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics` {/* #get_usage_statistics */}

Statistiques d'utilisation/engagement bioRxiv sur toute l'histoire — vues abstraites, vues en texte intégral et téléchargements PDF par période, avec des totaux cumulatifs en cours d'exécution. intervalle est "mensuelle" (par défaut) ou "anly".

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `interval` | chaîne de caractères | facultatif; par défaut: "mensuel"; enum: &#91;"mensuel", "anly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## Réglementation des médicaments {/* #family-12 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `search_drug_applications` {/* #search_drug_applications */}

Recherche de médicaments@applications FDA (NDA/ANDA/BLA) par toute combinaison de filtres à phrases exactes (marque, générique, active_ingredient, sponsor, marketing_status, dosage_form, route, pharm_class). générique et pharm_class requête le bloc openfda harmonisé (absent sur les anciennes applications, si silencieusement sauté là). Une recherche générale renvoie le premier max_records avec le vrai total et tronqué=true; à la page au-delà des enregistrements ~26,000, étroite avec submission_date_from/to.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `brand` | chaîne de caractères | facultatif |
| `generic` | chaîne de caractères | facultatif |
| `active_ingredient` | chaîne de caractères | facultatif |
| `sponsor` | chaîne de caractères | facultatif |
| `marketing_status` | chaîne de caractères | facultatif; enum: &#91;"Prescription", "Over-the-counter", "Discontinuer", "Aucune (approbation provisoire)"&#93; |
| `dosage_form` | chaîne de caractères | facultatif |
| `route` | chaîne de caractères | facultatif |
| `pharm_class` | chaîne de caractères | facultatif |
| `pharm_class_type` | chaîne de caractères | facultatif; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `search_type` | chaîne de caractères | facultatif; par défaut: " et "; enum: &#91;"et", "ou"&#93; |
| `submission_date_from` | chaîne de caractères | facultatif |
| `submission_date_to` | chaîne de caractères | facultatif |
| `raw_search` | chaîne de caractères | facultatif |
| `max_records` | entier | facultatif; par défaut : 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application` {/* #get_drug_application */}

Remplir une demande de drogue@ADF par son numéro (p. ex. "NDA020702", "ANDA076543", "BLA125514"). Retourne le dossier complet — sponsor, produits (marque, ingrédients actifs + dosages, forme posologique, itinéraire, statut de commercialisation, code TE), l'historique complet des présentations et les champs ouverts harmonisés lorsque présents.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `application_number` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications` {/* #count_drug_applications */}

Aggregate Drugs@FDA compte sur un seul champ, éventuellement restreint par les mêmes filtres que search_drug_applications. count_field accepte les noms amicaux (sponsor_name, application_number, dosage_form, route, marketing_status, te_code, pharm_class_epc/moa/cs/pe) ou un chemin de champ brut openFDA (Append .exact vous-même pour les champs analysés).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `count_field` | chaîne de caractères | **requis** |
| `brand` | chaîne de caractères | facultatif |
| `generic` | chaîne de caractères | facultatif |
| `active_ingredient` | chaîne de caractères | facultatif |
| `sponsor` | chaîne de caractères | facultatif |
| `marketing_status` | chaîne de caractères | facultatif |
| `dosage_form` | chaîne de caractères | facultatif |
| `route` | chaîne de caractères | facultatif |
| `pharm_class` | chaîne de caractères | facultatif |
| `pharm_class_type` | chaîne de caractères | facultatif; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `search_type` | chaîne de caractères | facultatif; par défaut: " et "; enum: &#91;"et", "ou"&#93; |
| `submission_date_from` | chaîne de caractères | facultatif |
| `submission_date_to` | chaîne de caractères | facultatif |
| `raw_search` | chaîne de caractères | facultatif |
| `max_buckets` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics` {/* #get_drug_statistics */}

Statistiques sur les médicaments de niveau Corpus@FDA en un seul appel — demandes totales, répartition du statut marketing, formes et voies posologiques supérieures (avec nombres distincts) et principaux commanditaires par nombre de demandes.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes` {/* #list_pharmacologic_classes */}

Énumérer les classes pharmacologiques avec leurs nombres d'applications, comptées sur l'openfda harmonisée.pharm_class_&lt;type> Bloc. Les chiffres ne reflètent que les applications portant ce bloc.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `class_type` | chaîne de caractères | facultatif; par défaut: "epc"; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `max_buckets` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents` {/* #get_generic_equivalents */}

Trouver des équivalents génériques d'un médicament de marque : résoudre la marque à sa ou ses applications de référence, extraire le ou les ensembles de noms actifs-ingrédients exacts, puis retourner chaque application Drugs@FDA avec un produit dont l'ensemble actif-ingrédient correspond (y compris les codes TE et le statut de commercialisation).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `brand` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels` {/* #search_drug_labels */}

Récupérer les étiquettes de produits pharmaceutiques (LSP) de la FDA par ingrédient, nom ou voie d'extraction ciblée. Les filtres (active_ingredient, generic_name, brand_name, route, product_type) ont touché le bloc d'étiquettes openfda; set exact pour interroger les variantes .exact non analysées. Passer des sections pour extraire les sections d'étiquettes ouvertes brutes FDA au lieu de l'enregistrement structuré par défaut. raw_search est mutuellement exclusif avec les filtres mappés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `active_ingredient` | chaîne de caractères | facultatif |
| `generic_name` | chaîne de caractères | facultatif |
| `brand_name` | chaîne de caractères | facultatif |
| `route` | chaîne de caractères | facultatif |
| `product_type` | chaîne de caractères | facultatif; enum: &#91;"HUMAN PRESCRIPTION DRUG", "HUMAN OTC DRUG"&#93; |
| `exact` | booléen | facultatif; par défaut : false |
| `raw_search` | chaîne de caractères | facultatif |
| `sections` | tableau de chaînes | facultatif |
| `max_records` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## Génétique humaine {/* #family-13 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `gwas_associations_for_variant` {/* #gwas_associations_for_variant */}

Les associations de catalogues GWAS ont fait état d'une variante (rID), la plus importante d'abord. Args: rs_id (dbSNP rsID par exemple rs7412 APOE ou rs699 AGT; doit être le catalog's courant rsID — les ID fusionnés/retirés peuvent renvoyer des lignes zéro plutôt qu'une erreur); max_records (par défaut du bouchon de sortie 500; les variantes trait-hub peuvent contenir des associations 1000+; les lignes sont triées par le serveur par l'ascension de la valeur p, de sorte qu'un résultat plafonné est le préfixe de signe supérieur). Retourne &#123;rs_id, api_total, retourné, tronqué, associations&#125;. api_total est le total du catalogue's; Drapeaux tronqués, une prise captée. Chaque ligne d'association: &#123;association_id, p_value, pvalue_mantissa, pvalue_exponent, pvalue_description, or_value, beta, ci_lower, ci_upper, range, risk_frequency, snp_effect_alleles, rs_ids, emplacements, mapped_genes, efo_traits:&#91;&#123;efo_id, efo_trait&#125;&#93;, bg_efo_traits, reported_trait, multi_snp_haplotype, snp_interaction, study_accession_id, pubmed_id, first_author&#125;. or_value et bêta sont mutuellement exclusifs par rangée (binaire vs quantitative); p_valeur de 0.0 signifie p &lt; ~1e-308 (utiliser mantissa/exposant).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `rs_id` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene` {/* #gwas_associations_for_gene */}

Les associations de catalogues GWAS dont les variantes sont MAPPED à un gène (catalog's Ensembl pipeline mapping, pas l'auteur-déclaré), les plus significatives d'abord. Args : gene_symbol (symbole HGNC, correspondance exacte, par exemple PCSK9, APOE; en amont sensible à la casse—passe le haut-cas canonique; les variantes intergéniques cartent les gènes flanquants, de sorte que les rangées peuvent s'asseoir en dehors du corps génique); max_records (cap par défaut 500; lignes serveur triées par valeur de p ascendante). Retourne &#123;gene_symbol, api_total, retourné, tronqué, associations&#125; avec la même forme de rangée que gwas_associations_for_variant. Un symbole inexistant renvoie api_total=0, pas une erreur.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait` {/* #gwas_associations_for_trait */}

Les associations de catalogues GWAS ont annoté un trait EFO, le plus important d'abord. Args : efo_id (formulaire court à terme en ontologie tel qu'utilisé par le catalogue, p.ex. MONDO_0005010, EFO_0004340, HP_0003124; le catalogue a migré plusieurs ids EFO historiques vers MONDO/HP — résoudre les ids actuels avec gwas_search_traits en premier; passer exactement un de efo_id/efo_trait); efo_trait (autre solution de rechange pour le LABEL de caractères exacts); max_records (cap par défaut 500; les lignes p-valeur ascendante). Retours &#123;efo_id-efo_trait, api_total, retournés, tronqués, associations&#125; avec la même forme de rangée que gwas_associations_for_variant. Un id/label inconnu renvoie api_total=0, pas une erreur.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `efo_id` | chaîne de caractères | facultatif |
| `efo_trait` | chaîne de caractères | facultatif |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits` {/* #gwas_search_traits */}

Rechercher le catalogue GWAS EFO caractères annotations par sous-chaîne d'étiquettes — le point d'entrée pour résoudre un nom de maladie/phénotype aux ids d'ontologie que gwas_associations_for_trait / gwas_search_studies prennent. Args: requête (sous-chaîne insensible à la casse de l'étiquette de caractère, par exemple "coronaire" correspond au trouble coronarien de l'artère MONDO_0005010 etc.; le catalogue mélange les ids EFO, MONDO, HP et OBA — don't suppose un préfixe EFO_; max_records (cap par défaut 500). Retourne &#123;query, api_total, retourné, tronqué, efo_traits&#125;; chaque ligne &#123;efo_id, efo_trait, uri&#125; triées par étiquette. Count-vérifié par rapport au catalog's propre total quand il n'est pas plafonné.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies` {/* #gwas_search_studies */}

Recherche GWAS Catalogue études par caractère annotation ou publication. Args: efo_id (ontologie forme courte, p.ex. MONDO_0005010, résoudre via gwas_search_traits; les filtres combinent ET — généralement passent un); efo_trait (alternative à l'étiquette de caractère exacte); pubmed_id (PubMed ID de la publication de l'étude', p.ex. 38714703); max_records (cap par défaut 500). Retourne &#123;filters, api_total, retourné, tronqué, études&#125;; chaque ligne de l'étude &#123;accession_id, disease_trait, efo_traits, bg_efo_traits, pubmed_id, initial_sample_size, replication_sample_size, discovery_ancestry, replication_ancestry, genotyping_technologies, plates-formes, cohorte, full_summary_stats_available, imputé, gxe, gxg&#125;. Compte-vérifié par rapport au total du catalogue lorsqu'il n'est pas plafonné. Au moins un filtre est requis (le catalogue non filtré est ~90k études).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `efo_id` | chaîne de caractères | facultatif |
| `efo_trait` | chaîne de caractères | facultatif |
| `pubmed_id` | chaîne de caractères | facultatif |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study` {/* #gwas_get_study */}

Obtenez une étude du catalogue GWAS par son adhésion GCST. Args: accession_id (adhésion à l'étude, p.ex. GCST90841394; liste dans chaque ligne d'association comme study_accession_id et dans les résultats de recherche d'étude). Retourne &#123;found, accession_id, study&#125; où l'étude est de la même forme de rangée que gwas_search_studies (null quand l'adhésion est inconnue).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant` {/* #gwas_get_variant */}

Obtenez un enregistrement de variante du catalogue GWAS (position, gènes cartographiés, conséquence) par rsID – plus léger que de tirer ses associations. Args: rs_id (dbSNP rsID par exemple La Commission a décidé de ne pas modifier le règlement (CEE) n° 1408/71 du Conseil. Retourne &#123;found, rs_id, variante&#125;; variante est &#123;rs_id, fusionné, functional_class, most_severe_consequence, allèles (par exemple "C/T (avant)"), mapped_genes, emplacements:&#91;&#123;chromosome, position, région&#125;&#93;, last_update_date&#125; — position GRCh38 — ou nul lorsque le rsID n'est pas dans le catalogue. fusion = 1 signifie que le rsID a été fusionné dans un autre enregistrement en amont.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `rs_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets` {/* #eqtl_list_datasets */}

Lister les ensembles de données du catalogue eQTL (un ensemble de données = une étude x type de tissu/cellule x méthode de quantification). Args : study_label (nom exact de l'étude, p.ex. GTEx, Alasoo_2018, BLUEPRINT); tissue_label (étiquette exacte de type tissulaire/cellule, p.ex. foie, macrophage, LCL — minuscule dans le catalogue); quant_method (expression du gène, exon, tx, txrev, microarray, coupe-feuilles, aptamer=protéine plasma; pour les eQTL classiques au niveau des gènes, utiliser ge; max_records (cap par défaut 1000; le catalogue complet non filtré est ~760 datasets). Retourne les filtres &#123;, retourné, tronqué, ensembles de données&#125; triés par dataset_id; chaque &#123;dataset_id (QTD...), study_id (QTS...), study_label, sample_group, tissue_id, tissue_label, condition_label, quant_method, sample_size&#125;. Le API ne publie pas de nombre total; tronqué=false prouve que la liste est complète.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `study_label` | chaîne de caractères | facultatif |
| `tissue_label` | chaîne de caractères | facultatif |
| `quant_method` | chaîne de caractères | facultatif |
| `max_records` | entier | facultatif; par défaut : 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations` {/* #eqtl_associations */}

Les lignes d'association moléculaire-QTL d'un ensemble de données du catalogue eQTL, filtrées par un gène, une variante ou une région. Args: dataset_id (adhésion QTD de eqtl_list_datasets, par exemple - QTD000266; gene_id (identifiant de gène d'Ensembl non-versionné, p.ex. ENSG00000130203 APOE; au moins un de gene_id/rsid/variant/pos est requis); rsid (dbSNP rsID); variante (eQTL Catalogue chaîne de la variante chr19_44908822_C_T, soulignement préfixé GRCh38); pos (chromosome de fenêtre génomique:start-end GRCh38 pas de préfixe chr, p.ex. 19:44900000-44920000); nlog10p_min (significance du plancher : seulement les lignes avec -log10(p) >= ceci, appliqué en amont); max_records (cap par défaut 1000 = une page). Retourne &#123;dataset_id, filtres, retournés, tronqués, associations&#125;; chaque ligne &#123;molecular_trait_id, gene_id, variante, rsid, chromosome, position, ref, alt, type, bêta, se, pvalue, nlog10p, maf, ac, an, r2, median_tpm&#125;. Les lignes couvrent uniquement la fenêtre cis de l'ensemble de données testé (±1 Mb de chaque gène); vide signifie "non testé / non présent". Aucun nombre total n'est publié: tronqué=false prouve l'épuisement, tronqué=true signifie que le bouchon a été touché.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `dataset_id` | chaîne de caractères | **requis** |
| `gene_id` | chaîne de caractères | facultatif |
| `rsid` | chaîne de caractères | facultatif |
| `variant` | chaîne de caractères | facultatif |
| `pos` | chaîne de caractères | facultatif |
| `nlog10p_min` | nombre | facultatif |
| `max_records` | entier | facultatif; par défaut : 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances` {/* #phewas_instances */}

Énumérez les portails publics PheWeb PheWAS que ce serveur peut interroger, avec un registre de création de génomes et de capacités. Retourne les rubriques &#123;:&#123;key:&#123;label, base_url, genome_build, capacités, notes&#125;&#125;&#125;. les capacités nomment les paramètres de chaque instance expose: variante (phewas_variant), gène (phewas_finngen_gene), phénotypes (phewas_list_phenotypes), autocomplet (phewas_search_phenotypes). NOTER la division de construction: les ID de variante du FinnGen R12 sont GRCh38; BioBank Japan (pheweb.jp) est GRCh37/hg19 — coordonnées de levage avant la saisie croisée.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant` {/* #phewas_variant */}

PheWAS pour une variante: ses statistiques d'association par rapport à chaque phénotype dans un portail PheWeb de biobanque, le plus significatif d'abord. Args: exemple (fingen FinnGen R12 GRCh38, ou bbj BioBank Japan GRCh37; les coords de variante DOIVENT être sur la compilation instance's); Variante (chrom-pos-ref-alt, séparateurs :/_ et préfixe chr toléré, par exemple 19-44908822-C-T APOE rs7412 GRCh38/finngen ou 1-55505647-G-T PCSK9 rs11591147 GRCh37/bbj); max_phenos (cap par défaut 200; FinnGen retourne ~2470 lignes; triées par la valeur p ascendante avant le plafonnement). Retourne &#123;instance, genome_build, variante, variant_meta, total, retourné, tronqué, phénotypes&#125;; variant_meta &#123;chrom, pos, ref, alt, rsids, nearest_genes, gnomad (FinnGen seulement)&#125;. Chaque ligne de phénotype &#123;phénocode, phénostring, catégorie, pval, mlogp, beta, sebeta, af=maf, maf_case, maf_control, n_cases, n_controls, n_samples&#125; (champs non publiés null; Les lignes BBJ ont af, les lignes FinnGen ont maf triplets + mlogp). Les variantes inconnues soulèvent une erreur non trouvée.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `instance` | chaîne de caractères | **requis**; enum: &#91;"finngen", "bbj"&#93; |
| `variant` | chaîne de caractères | **requis** |
| `max_phenos` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene` {/* #phewas_finngen_gene */}

PheWAS de niveau génétique du FinnGen R12: pour chaque paramètre de la maladie, la variante la plus associée dans la région génique, la plus significative en premier. Arguments: gene_symbol (symbole HGNC par exemple PCSK9, APOE; des symboles inconnus soulèvent une erreur non trouvée); max_phenos (cap par défaut 200; FinnGen a ~les paramètres 2470, une ligne chacun; triées par la valeur p ascendante avant le plafonnement). Retourne &#123;instance:"finngen", genome_build:"GRCh38", gene_symbol, total, retourné, tronqué, phénotypes&#125;; chaque ligne est la forme de ligne phewas_variant plus la variante:&#123;chrom, pos, ref, alt, varad, rsids&#125; — la variante supérieure de ce paramètre dans cette région du gène 's (région != organisme génique; Les limites du gène PheWeb pads). La plupart des lignes sont des résultats nuls (pval~1) — la variante BEST par point de référence est toujours signalée; filtrez par pval vous-même pour les coups significatifs.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | **requis** |
| `max_phenos` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes` {/* #phewas_list_phenotypes */}

Catalogue complet du phénotype (critère de la maladie) d'une instance PheWeb, avec nombre de cas/témoins. Args: instance (actuellement seul Finngen expose ce paramètre); BBJ n'utilise pas phewas_search_phenotypes là-bas); max_records (cap par défaut 3000 > FinnGen's ~2470 endpoints, de sorte que la valeur par défaut retourne le catalogue complet). Retourne &#123;installation, total, retourné, tronqué, phénotypes&#125; trié par phénocode; chaque ligne &#123;phénocode (par exemple: "T2D"), phénostring, catégorie, num_cases, num_controls, num_gw_significant (compte des loci significatifs à l'échelle du génome pour ce paramètre)&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `instance` | chaîne de caractères | facultatif; par défaut: "finngen"; enum: &#91;"finngen"&#93; |
| `max_records` | entier | facultatif; par défaut : 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes` {/* #phewas_search_phenotypes */}

Recherche par nom d'une instance PheWeb's phénotypes (et entités) – le point d'entrée pour résoudre un nom de maladie à un phénocode. Args : requête (recherche de phénotype en texte libre, par exemple) "diabetes", "asthma"; correspond aux noms/codes de phénotype; certains cas correspondent également aux noms de gènes et aux ID rs); instance (par défaut de finngen ou bbj — les deux exposent autocomplet); max_records (cap par défaut 500; Les réponses autocomplètes sont des listes courtes, rarement plafonnées). Retourne &#123;installation, requête, total, retourné, tronqué, matches&#125;; chaque match &#123;affichage, phénocode, url&#125;. Utiliser le phénocode avec les lignes phewas_list_phenotypes ou le site web de l'instance; Les chaînes d'affichage BBJ intègrent le code entre parenthèses.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `instance` | chaîne de caractères | facultatif; par défaut: "finngen"; enum: &#91;"finngen", "bbj"&#93; |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## Expression {/* #family-14 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `gtex_tissue_sites` {/* #gtex_tissue_sites */}

Lister tous les sites de tissus avec des métadonnées pour une version GTEx sur support (54 dans gtex_v8) : nombres d'échantillons, nombres eGene/sGene, codes de couleurs et ids d'ontologie UBERON.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info` {/* #gtex_dataset_info */}

Lister toutes les sorties de données GTEx avec métadonnées : datasetId, version GENCODE, compilation de génomes, compilation de dbSNP et dénombrement d'échantillons/subject/tissues.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `dataset_id` | chaîne de caractères | facultatif |
| `organization_name` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info` {/* #gtex_sample_info */}

Des métadonnées d'échantillon et de donneur pour une version GTEx pincée, filtrée en option par tissue_site_detail_id, data_type (par exemple : RNASEQ, WGS), ou subject_id. Paged et vérifié par comptage; Un appel non filtré correspond à des dizaines de milliers d'échantillons, donc filtrez ou définissez max_samples.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `tissue_site_detail_id` | chaîne de caractères | facultatif |
| `data_type` | chaîne de caractères | facultatif |
| `subject_id` | chaîne de caractères | facultatif |
| `max_samples` | entier | facultatif |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes` {/* #gtex_resolve_genes */}

Résoudre les symboles du gène ou les ids d'Ensembl non-versionnés aux ids de GENCODE en version pour une libération par épingle, p.ex. GAPDH -> ENSG00000111640.14. Fournissez les ids à l'expression / outils eQTL.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `genes` | tableau de chaînes | **requis** | 7 / 0 / 0 |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression` {/* #gtex_median_expression */}

Expression génique médiane (MTP) pour un ou plusieurs ids de GENCODE VERSIONNEL à travers les tissus (tissus d'omit pour tous). Paged et compte-vérifié sur les rangées (genre, tissu).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gencode_ids` | tableau de chaînes | **requis** |
| `tissue_site_detail_ids` | tableau de chaînes | facultatif |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary` {/* #gtex_expression_summary */}

Résumé de l'expression d'un gène dans TOUS les tissus classés par MPT médiane descendante. Accepte un symbole ou Ensembl id et le restitue automatiquement à un GENCODE id versionné d'abord.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene` | chaîne de caractères | **requis** |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression` {/* #gtex_gene_expression */}

Echantillon-niveau (non agrégé) expression TPM tableaux pour un VERSIOND GENCODE id, par tissu ( tissus d'omit pour tous). Renvoie le tableau TPM complet par échantillon et n_samples pour chaque tissu.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gencode_id` | chaîne de caractères | **requis** |
| `tissue_site_detail_ids` | tableau de chaînes | facultatif |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes` {/* #gtex_top_expressed_genes */}

Les gènes top-n par TPM médian dans un tissu, en utilisant le classement côté API. filter_mt_gene (par défaut true) fait tomber les gènes mitochondriaux du classement.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `tissue_site_detail_id` | chaîne de caractères | **requis** |
| `n` | entier | facultatif; par défaut : 100 |
| `filter_mt_gene` | booléen | facultatif; par défaut : true |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes` {/* #gtex_eqtl_genes */}

Tous les eGenes (gens avec ≥1 cis-eQTL significatif) pour un tissu. Page par page et compte vérifié à pied (p. ex. Pancreas gtex_v8 = 9,660). max_genes caps combien de lignes sont retournées.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `tissue_site_detail_id` | chaîne de caractères | **requis** |
| `max_genes` | entier | facultatif |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls` {/* #gtex_single_tissue_eqtls */}

Associations significatives cis-eQTL à un seul tissu pour un gène et/ou une variante (précalculée). Fournir gencode_id et/ou variant_id; tissue_site_detail_id rétrécit en option. Paged et compte-vérifié.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gencode_id` | chaîne de caractères | facultatif |
| `variant_id` | chaîne de caractères | facultatif |
| `tissue_site_detail_id` | chaîne de caractères | facultatif |
| `max_results` | entier | facultatif |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls` {/* #gtex_multi_tissue_eqtls */}

Méta-analyse multitâches cis-eQTL (METASOFT) pour une id GENCODE VERSIONNÉ. variant_id se rétrécit en option à une variante. Retourne les lignes par variable avec les valeurs m, NES, p-values et SE par tissu.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gencode_id` | chaîne de caractères | **requis** |
| `variant_id` | chaîne de caractères | facultatif |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl` {/* #gtex_calculate_eqtl */}

Calculer un eQTL à la mouche pour toute paire de variables génétiques dans un seul tissu, y compris les paires non significatives. Retourne les tableaux p-value, NES, t-statistic, MAF et par exemple génotype/expression.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gencode_id` | chaîne de caractères | **requis** |
| `variant_id` | chaîne de caractères | **requis** |
| `tissue_site_detail_id` | chaîne de caractères | **requis** |
| `dataset_id` | chaîne de caractères | facultatif; par défaut : "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## Annotation des protéines {/* #family-15 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `get_domain_architecture` {/* #get_domain_architecture */}

Architecture complète du domaine InterPro pour une ou plusieurs protéines UniProt (toutes les entrées correspondantes, signatures membres-DB, coordonnées fragmentaires), avec pagination vérifiée par rapport au nombre API.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accessions` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries` {/* #search_interpro_entries */}

Recherche de mots clés sur les entrées InterPro ou de la base de données des membres (Pfam, SMART, PROSITE, PANTHER, CDD), marche complète du curseur vérifié par le nombre API.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | facultatif |
| `entry_type` | chaîne de caractères | facultatif |
| `source_db` | chaîne de caractères | facultatif; par défaut : "interpro" |
| `go_term` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry` {/* #get_interpro_entry */}

Compte rendu détaillé d'une entrée InterPro (IPRxxxxx) ou famille Pfam (PFxxxxx) – itinéraire choisi par préfixe d'adhésion.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans` {/* #search_pfam_clans */}

Recherche de mots clés sur les clans Pfam (ensembles InterPro, accessions CLxxxx).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan` {/* #get_pfam_clan */}

Détails du clan Pfam, y compris la liste complète des membres et familles triés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `clan_accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins` {/* #get_pfam_family_proteins */}

Protéines membres d'une famille de Pfam (protéines complètes vérifiées en fonction du nombre ou du nombre seulement). Utilisez count_only pour de très grandes familles.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pfam_accession` | chaîne de caractères | **requis** |
| `reviewed_only` | booléen | facultatif; par défaut : false |
| `tax_id` | entier | facultatif |
| `count_only` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes` {/* #get_pfam_family_proteomes */}

Protéomes contenant des membres d'une famille Pfam. count_only par défaut true — la pagination du curseur de protéome en amont est défectueuse pour les promenades profondes.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `pfam_accession` | chaîne de caractères | **requis** |
| `count_only` | booléen | facultatif; par défaut : true |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene` {/* #get_protein_atlas_gene */}

Atlas des protéines humaines par gène (libérer 25.x): tissu/subcellulaire/pathologie/expression du sang/cerveau et information sur les anticorps. Accepte un ID de gène Ensembl ou un symbole de gène.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene` | chaîne de caractères | **requis** |
| `full` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas` {/* #search_protein_atlas */}

Recherche en vrac sélectionnée en colonne sur l'Atlas des protéines humaines (search_download).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `columns` | chaîne de caractères | facultatif; par défaut: "g,gs,eg,gd,up,chr,chrp,scl" |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids` {/* #map_string_ids */}

Carte des symboles/aliases des gènes pour les identificateurs de protéines STRING (v12.0). Chaque symbole d'entrée est soit cartographié, soit répertorié dans non macpé — les deux partitions l'entrée.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `symbols` | tableau de chaînes | **requis** |
| `species` | entier | facultatif; par défaut : 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network` {/* #get_string_network */}

Réseau d'interaction protéine-protéine STRING pour une liste de gènes (v12.0) à un seuil de confiance. Les symboles des cartes d'abord (non maquillé rapporté), puis récupère les nœuds, les bords, le résumé et la provenance. Une seule requête d'entrée cartographiée 10 est une interaction de voisins, correspondant à STRING; plusieurs entrées cartographiées ne sont pas développées.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `symbols` | tableau de chaînes | **requis** |
| `species` | entier | facultatif; par défaut : 9606 |
| `required_score` | entier | facultatif; par défaut : 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores` {/* #get_string_similarity_scores */}

La similarité entre les protéines de Smith-Waterman se situe dans un ensemble de gènes (STRING/homology). Sparse: les paires absentes des données STRING's ne sont pas listées (absence signifie pas de similarité enregistrée, pas zéro).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `symbols` | tableau de chaînes | **requis** |
| `species` | entier | facultatif; par défaut : 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits` {/* #get_string_best_similarity_hits */}

Meilleure homologie par protéine d'entrée chez une espèce cible (STRING /homology_best). target_species=null demande le meilleur résultat pour toutes les espèces.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `symbols` | tableau de chaînes | **requis** |
| `species` | entier | facultatif; par défaut : 9606 |
| `target_species` | entier | facultatif |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## Modèles de cancer {/* #family-16 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `cbioportal_list_studies` {/* #cbioportal_list_studies */}

Lister les études sur le cancer de cBioPortal, éventuellement filtrées par un mot-clé en texte libre (nom/description/type de cancer) et/ou un id exact de type cancer; renvoie l'identifiant de l'étude, le nom, le type de cancer, le génome de référence, la citation et le nombre d'échantillons par type de données.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `keyword` | chaîne de caractères | facultatif |
| `cancer_type_id` | chaîne de caractères | facultatif |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study` {/* #cbioportal_get_study */}

Obtenez une étude cBioPortal sur le cancer par id : métadonnées, nombres d'échantillons par type de données, nombres d'échantillons/patients réels (d'après les collections de l'étude, pas le champ d'affichage) et ses profils moléculaires.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `study_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene` {/* #cbioportal_mutations_in_gene */}

Toutes les mutations d'un gène (symbole HUGO) dans une étude cBioPortal, avec des agrégats de récurrence: mutations totales, nombre d'échantillons mutés, distributions de type mutation et de changement de protéines, et les changements protéiques les plus récurrents.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | **requis** |
| `study_id` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency` {/* #cbioportal_mutation_frequency */}

Fréquence de mutation d'un gène dans plusieurs études cBioPortal (1–12) : échantillons mutés uniques divisés par des échantillons profilés pour ce gène dans le profil de mutation et la liste d'échantillons sélectionnés, en tenant compte des panels de gènes ciblés; classé le plus souvent en premier.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | **requis** |
| `study_ids` | tableau de chaînes | **requis**; minItems: 1; maxItems: 12 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene` {/* #cbioportal_cna_in_gene */}

Des modifications discrètes du nombre de copies d'un gène dans une étude cBioPortal, filtrées par type d'événement (effacement profond / amplification par défaut), avec la distribution complète des modifications par échantillon.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `gene_symbol` | chaîne de caractères | **requis** |
| `study_id` | chaîne de caractères | **requis** |
| `event_type` | chaîne de caractères | facultatif; par défaut: "HOMDEL_AND_AMP"; enum: &#91;"HOMDEL_AND_AMP", "HOMDEL", "AMP", "GAIN", "HETLOSS", "DIPLOID", "ALL"&#93; |
| `max_records` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes` {/* #cbioportal_clinical_attributes */}

Attributs cliniques définis dans une étude cBioPortal (champs de patients et d'échantillons), mettant en évidence les paramètres de survie et indiquant si les données globales de survie sont présentes.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `study_id` | chaîne de caractères | **requis** |
| `max_records` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## ARN {/* #family-17 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `get_family` {/* #get_family */}

Métadonnées de la famille Rfam pour une adhésion (RF00005) ou id de la famille (tRNA) — les deux résoudre. Enregistrement aplati plus le JSON en amont complet dans "raw".

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `family` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment` {/* #get_seed_alignment */}

Alignement des semences d'une famille de Rfam à Stockholm (par défaut, avec une ligne de structure secondaire consensuelle) ou FASTA aligné.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `family` | chaîne de caractères | **requis** |
| `fmt` | chaîne de caractères | facultatif; par défaut: "stockholm"; enum: &#91;"stockholm", "fasta"&#93; |
| `max_bytes` | entier | facultatif; par défaut : 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model` {/* #get_covariance_model */}

Modèle de covariance infernale (fichier CM) d'une famille Rfam, utilisable directement avec cmsearch/cmscan, plus champs d'en-tête parsed.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `family` | chaîne de caractères | **requis** |
| `max_bytes` | entier | facultatif; par défaut : 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree` {/* #get_tree */}

Arbre phylogénétique des graines d'une famille Rfam (texte NHX/Newick).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `family` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions` {/* #get_sequence_regions */}

Tous les hits complets d'une famille Rfam à travers les bases de données séquentielles (parsed TSV). Vérifiez d'abord num_full via get_family — rfam.org 403s cette route pour de très grandes familles (par exemple: RF00005).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `family` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping` {/* #get_structure_mapping */}

Cartographie des structures au niveau des résidus de la PDB d'une famille de Rfam, triée de façon déterministe.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `family` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id` {/* #accession_to_id */}

Conversion d'une adhésion Rfam à son identité familiale (p. ex. Règlement (CE) no 798/2008 du Parlement européen et du Conseil du 21 décembre 2008 relatif à l'application de l'article 107, paragraphe 2, du traité sur le fonctionnement de l'Union européenne (JO L 347 du 31.12.2008, p. 1).> "tRNA").

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession` {/* #id_to_accession */}

Convertissez un id de famille Rfam à son adhésion (par exemple "tRNA" -> RF00005).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `family_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence` {/* #search_sequence */}

Effectuez une recherche dans une séquence d'ARN par l'intermédiaire du paramètre officiel du lot Rfam. conserver l'identité de travail retournée en attendant; une réponse inachevée n'est pas un résultat nul. Inspecter les allumettes et les sources d'information. Après une réponse ratée, diagnostiquez ou recommencez le travail existant plutôt que de le soumettre à plusieurs reprises.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `sequence` | chaîne de caractères | **requis** |
| `max_wait_s` | nombre | facultatif; par défaut : 300 |
| `poll_interval_s` | nombre | facultatif; par défaut : 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## Archives Omics {/* #family-18 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `ena_search_runs` {/* #ena_search_runs */}

Trouver des séances publiques de séquençage associées à une étude ENA/INSDC, à une expérience, à un échantillon ou à un essai d'adhésion. Accepte les identificateurs PRJ/ERP/SRP/DRP, ERX/SRX/DRX, SAM/ERS/SRS/DRS et ERR/SRR/DRR; Les identifiants GEO GSE/GSM, ArrayExpress E-MTAB et MGnify MGYS ont besoin d'abord de leur adhésion INSDC liée. La recherche d'adhésion seulement, pas la recherche de mots clés. Retourne les métadonnées de l'organisme et de la bibliothèque sans récupérer les fichiers de données. Le résultat est plafonné à des exécutions 1000; un résultat tronqué n'est pas une cohorte complète, et les appels répétés ne sont pas paginants parce que l'ENA ne fournit aucun jeton de compensation ou de continuation. Utilisez un échantillon plus étroit ou une adhésion à l'expérience lorsque la couverture complète est requise.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 64 |
| `limit` | entier | facultatif; par défaut : 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files` {/* #ena_get_run_files */}

Obtenez les URL de téléchargement FASTQ générées par les archives, les tailles d'octets et les montants de contrôle MD5 en amont pour une exécution ERR/SRR/DRR. Renvoie un stock de fichiers seulement; aucun téléchargement ou vérification de bilan. Conserve chaque fichier en ordre de rapport, y compris les fichiers non appariés ou à lecture longue; library_layout=PAIRED n'implique pas exactement deux fichiers. file_index n'est qu'une position et n'est pas un identificateur R1/R2 ou un identificateur de partenaire. Certaines opérations (y compris certaines soumissions à un seul cellule/format natif) n'ont pas de FASTQ généré par les archives. Les fichiers BAM/CRAM/SRA soumis sont en dehors de cet outil.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `run_accession` | chaîne de caractères | **requis**; Longueur min: 1; Longueur max: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments` {/* #arrayexpress_search_experiments */}

Recherche ArrayExpérimentations fonctionnelles-génomiques (BioStudies) avec récupération complète et totale de Hits; les filtres (pression, organisme, study_type, technologie, gamme de dates de libération, facettes supplémentaires) se combinent avec ET.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | facultatif |
| `organism` | chaîne de caractères | facultatif |
| `study_type` | chaîne de caractères | facultatif |
| `technology` | chaîne de caractères | facultatif |
| `released_after` | chaîne de caractères | facultatif |
| `released_before` | chaîne de caractères | facultatif |
| `extra_facets` | objet | facultatif |
| `max_records` | entier | facultatif; par défaut : 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment` {/* #arrayexpress_get_experiment */}

Obtenez une expérience ArrayExpress (BioStudies) comme un dossier d'analyste aplati — type d'étude, organismes, nombre d'essais/échantillons, conceptions/facteurs, auteurs, publications, protocoles, conceptions de tableaux et résumé de fichiers.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files` {/* #arrayexpress_get_experiment_files */}

Lister tous les fichiers d'une expérience ArrayExpress (nom, taille, type, format, description) avec les URL de téléchargement, ainsi que le nombre de fichiers /info pour fins de comparaison.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples` {/* #arrayexpress_get_experiment_samples */}

Récupérer les lignes d'annotation SDRF par échantillon pour une expérience ArrayExpress (en-têtes MAGE-TAB stepful, répétitions suffixées #2/#3). Expériences sans retour SDRF &#123;"error":"no_sdrf"&#125;.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |
| `max_rows_returned` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series` {/* #geo_search_series */}

Rechercher les ensembles de données GEO de la BCN (db=gds) et les enregistrements de la série de retour (documents sommaires trimés). `term` est la syntaxe complète des utilitaires E; ajouter gse&#91;ETYP&#93; pour limiter les séries.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `term` | chaîne de caractères | **requis** |
| `retmax` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series` {/* #geo_get_series */}

Chercher des métadonnées structurées pour les séries GEO (adhésions GSE) avec des échantillons inclus — titre/résumé/design de la série, plates-formes, échantillons avec des caractéristiques et des informations de bibliothèque, et URL de fichier supplémentaire. Les tables de données ne sont jamais téléchargées.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accessions` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies` {/* #metabolights_list_studies */}

Énumérez toutes les accessions publiques à l'étude MetaboLights (numériquement triées) avec le compte de API's. Il n'y a pas de recherche d'étude côté serveur — filtre récupéré les candidats par titre/descripteur à la place.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies` {/* #metabolights_get_studies */}

Remplir des métadonnées structurées pour les études de MetaboLights (MTBLSxxx) à partir de la charge utile de l'ISA analysée — titre, état, années, organismes, analyses, facteurs, descripteurs, nombre d'échantillons, protocoles; tableau par échantillon en option. Les adhésions inconnues/privées vont en not_found.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accessions` | tableau de chaînes | **requis** |
| `include_samples` | booléen | facultatif; par défaut : false |
| `max_sample_rows_returned` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files` {/* #metabolights_get_study_files */}

Compléter l'inventaire des fichiers pour une étude publique de MetaboLights — le dossier d'étude de haut niveau (ISA-Tab, MAF, entrées de dossiers) et, par défaut, le dossier de données FILS récursifs.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |
| `include_data_files` | booléen | facultatif; par défaut : true |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files` {/* #metabolights_search_data_files */}

Recherche Glob sur une étude MetaboLights's dossier de données brutes (arborescence FILS). `pattern` est un nom de fichier glob (par exemple: '*.mzML', '*.raw'); omettez-le pour lister chaque fichier de données.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |
| `pattern` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies` {/* #mgnify_search_studies */}

Trouvez les études de métagénomique MGnify par texte libre OU ligne biome (fournir exactement une). La liste complète est paginée jusqu'à la fin et le nombre est vérifié par rapport au API.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | facultatif |
| `biome_lineage` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies` {/* #mgnify_get_studies */}

Récupérer des dossiers structurés pour les études de MGnify (adhésions de MGYS). Avec include_analyses, chaque étude porte également sa liste complète d'analyses plus les ventilations par pipeline/par experiment. Les adhésions inconnues sont portées disparues.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accessions` | tableau de chaînes | **requis** |
| `include_analyses` | booléen | facultatif; par défaut : false |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses` {/* #mgnify_get_study_analyses */}

Lister TOUTES les analyses d'une étude MGnify (pagination complète, vérifiée par comptage) — un enregistrement par analyse MGYA avec version de pipeline, type d'expérience, état, et run/assemblement/sample accessions.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_search_projects` {/* #pride_search_projects */}

Rechercher les projets de protéomique des archives PRIDE (récupération complète et vérifiée par api_total); les filtres (mot clé, organisme, instrument, maladie, extra_filters) se combinent avec ET. Trié par adhésion ASC — une promenade délimitée est un préfixe stable.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `keyword` | chaîne de caractères | facultatif |
| `organism` | chaîne de caractères | facultatif |
| `instrument` | chaîne de caractères | facultatif |
| `disease` | chaîne de caractères | facultatif |
| `extra_filters` | objet | facultatif |
| `max_records_returned` | entier | facultatif; par défaut : 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects` {/* #pride_get_projects */}

Récupérer des métadonnées complètes pour les projets PRIDE par adhésion (par exemple : PXD010154) — la même forme d'enregistrement normalisée que pride_search_projects, de sorte que les deux sont directement comparables. Les accessions inconnues vont dans not_found.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accessions` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins` {/* #pride_search_project_proteins */}

Énumérer les lignes de preuve de protéines pour un projet PRIDE affinitaire-protéomique (paged to épuisement). NOTE: seuls les projets d'affinité-protéomique sont servis ici; Pour les projets MS (PXD) classiques, utilisez plutôt pride_find_projects_for_protein.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `project_accession` | chaîne de caractères | **requis** |
| `keyword` | chaîne de caractères | facultatif |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein` {/* #pride_find_projects_for_protein */}

Trouver des projets PRIDE contenant une protéine (direction MS-archive). `protein_accession` est une adhésion UniProt (par exemple P04637). Nourrir les accessions de projet retournées à pride_get_projects pour les métadonnées complètes.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `protein_accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## Guide des cellules {/* #family-19 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `get_cell_type_info` {/* #get_cell_type_info */}

CellGuide (CELLxGENE) information de type cellulaire par id ou nom de Cell Ontology : nom, synonymes, description de l'ontologie, et description curated/GPT.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `cell_type` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types` {/* #search_cell_types */}

Rechercher les types de cellules CellGuide par texte libre sur le nom et les synonymes (le CDN n'a pas de point d'arrêt de recherche, donc celltype_metadata.json est filtré côté client).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `limit` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes` {/* #get_marker_genes */}

gènes marqueurs CellGuide pour un type de cellule (id ou nom) : calcul (dérivé de données, marqué) ou canonique (littérature-curée).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `cell_type` | chaîne de caractères | **requis** |
| `marker_type` | chaîne de caractères | facultatif; par défaut: "compputational"; enum: &#91;"compputational", "canonical"&#93; |
| `limit` | entier | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data` {/* #get_source_data */}

Ensembles de données et publications de source CellGuide contribuant à un type de cellule (id ou nom) : nom/url de la collection, publication, et les tissus/maladies/organismes couverts.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `cell_type` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues` {/* #get_cell_tissues */}

Tissus anatomiques où un type de cellule (id ou nom) est observé, agrégé (dédoublement) dans les collections sources de CellGuide.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `cell_type` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## Règlement {/* #family-20 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `encode_search_experiments` {/* #encode_search_experiments */}

Rechercher les expériences de génomique fonctionnelle ENCODE (ChIP-seq, ATAC-seq, ...). Filtres: assay_title (par exemple "TF ChIP-seq"), cible (étiquette protéique, p.ex. "CTCF"), organisme (nom scientifique), statut (par défaut "released"), date_released_before (date ISO — une fenêtre fermée), plus filtres de champ portail arbitraires via extra_filters. Le jeu de résultats complet est paged et count-vérified; `accessions` liste chaque match, au plus les résumés de lignes max_rows sont retournés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `assay_title` | chaîne de caractères | facultatif |
| `target` | chaîne de caractères | facultatif |
| `organism` | chaîne de caractères | facultatif |
| `status` | chaîne de caractères | facultatif; par défaut: "released" |
| `date_released_before` | chaîne de caractères | facultatif |
| `extra_filters` | objet | facultatif |
| `max_rows` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples` {/* #encode_search_biosamples */}

Rechercher les bioéchantillons ENCODE (lignes cellulaires, tissus, cellules primaires). Filtres: term_name (terme d'ontologie, p.ex. "K562"), classement ("cell line", "tissue", ...), organisme (nom scientifique), statut (par défaut "released"), date_created_before (date ISO), plus filtres de champ portail arbitraires via extra_filters. Complète, count-vérified: `accessions` est la liste complète des correspondances, au plus les résumés de lignes max_rows sont retournés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `term_name` | chaîne de caractères | facultatif |
| `classification` | chaîne de caractères | facultatif |
| `organism` | chaîne de caractères | facultatif |
| `status` | chaîne de caractères | facultatif; par défaut: "released" |
| `date_created_before` | chaîne de caractères | facultatif |
| `extra_filters` | objet | facultatif |
| `max_rows` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files` {/* #encode_list_files */}

Lister les fichiers de données ENCODE par format / test / bioéchantillon. Filtres: file_format ("fastq", "bam", "bigWig", "bed", ...), assay_term_name (terme d'ontologie par exemple "ChIP-seq" — PAS l'affichage assay_title comme "TF ChIP-seq", qui ne correspond à rien; passer les titres via extra_filters=&#123;"assay_title": ...&#125;), biosample_term_name (par exemple "K562"), statut (par défaut "released"), date_created_before, plus filtres de champ portail arbitraires via extra_filters. Les requêtes de fichiers correspondent à des millions de lignes non filtrées — combinent toujours plusieurs filtres. Complète + vérification du nombre; au plus les résumés de lignes max_rows retournés.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `file_format` | chaîne de caractères | facultatif |
| `assay_term_name` | chaîne de caractères | facultatif |
| `biosample_term_name` | chaîne de caractères | facultatif |
| `status` | chaîne de caractères | facultatif; par défaut: "released" |
| `date_created_before` | chaîne de caractères | facultatif |
| `extra_filters` | objet | facultatif |
| `max_rows` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment` {/* #encode_get_experiment */}

Obtenir une expérience ENCODE par adhésion (par exemple "ENCSR000AKP"). Retourne un enregistrement de champ stable : test, cible, bioéchantillon ontology + résumé, description, laboratoire, projet de bourse, dates de libération/soumission, assemblages, nombres de répliques, type de réplication, dbxrefs, DOI et uuid. Les champs portails volatils (audits, analyses, statut interne) sont exclus.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file` {/* #encode_get_file */}

Obtenez un fichier ENCODE par adhésion (p. ex. "ENCFF002JUR"). Retourne un enregistrement de champ stable: format, type/catégorie de sortie, essai, assemblage, jeu de données parent, reproductions biologiques, taille de fichier, md5sums, type d'exécution, longueur de lecture, laboratoire, date de création, téléchargement href et uuid.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample` {/* #encode_get_biosample */}

Obtenez un bioéchantillon ENCODE par adhésion (par exemple: "ENCBS013JZP"). Retourne un enregistrement de champ stable : terme en ontologie + classification, organisme, résumé/description, source, donneur, traitements, modifications génétiques, stade de vie, âge, sexe, laboratoire, date de création, statut et uuid.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `accession` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix` {/* #jaspar_get_matrix */}

Obtenez un profil de liaison JASPAR TF par id de matrice VERSIONED (par exemple : "MA0002.2"). Retourne l'enregistrement complet : matrice de fréquence de position (pfm), nom/classe/famille TF, espèce, type de données, références bibliographiques (pubmed/medline), URL du logo de la séquence. Nécessite un id en version ("MA0002.2", pas "MA0002") — utiliser jaspar_matrix_versions pour énumérer les versions. Les matrices en version sont immuables, donc les résultats sont reproductibles.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `matrix_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions` {/* #jaspar_matrix_versions */}

Lister toutes les versions d'un id de matrice de base JASPAR (par exemple "MA0002"). Renvoie chaque version publiée avec son matrix_id, son nom, sa collection et son URL — count-vérified. Utilisez pour épingler une version exacte avant jaspar_get_matrix, ou pour suivre comment un profil a changé dans les versions. Un id versionné ("MA0002.2") est accepté et réduit à sa base.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `base_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices` {/* #jaspar_list_matrices */}

Rechercher/lister les profils de reliure JASPAR TF (le catalogue complet du profil). Filtres (tous optionnels): collecte ("CORE", "NON VALIDÉ"), tax_group ("vertébrés", "végétaux", ...), tax_id (NCBI taxonomy id, p.ex. 9606 pour les humains — c'est ainsi que vous filtrez par espèces; énumérer les ids avec jaspar_list_species), nom (nom TF exact, p.ex. "FOXA1"), recherche (texte libre), version="latest" (se limiter aux versions les plus récentes seulement). Le catalogue complet filtré est paginé et vérifié au compte; au plus les lignes de résumé max_rows sont retournées.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `collection` | chaîne de caractères | facultatif |
| `tax_group` | chaîne de caractères | facultatif |
| `tax_id` | entier | facultatif |
| `name` | chaîne de caractères | facultatif |
| `search` | chaîne de caractères | facultatif |
| `version` | chaîne de caractères | facultatif |
| `max_rows` | entier | facultatif; par défaut : 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species` {/* #jaspar_list_species */}

Énumérer toutes les espèces avec des profils JASPAR (NCBI tax_id + nom); La liste complète est vérifiée. Utilisez les valeurs tax_id pour filtrer jaspar_list_matrices (p. ex. 9606 = Homo sapiens, 10090 = Mus musculus).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa` {/* #jaspar_list_taxa */}

Lister tous les groupes taxonomiques JASPAR (vertébrés, plantes, champignons, insectes, ...); La liste complète est vérifiée. Utilisez les noms de groupe comme filtre tax_group de jaspar_list_matrices.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections` {/* #jaspar_list_collections */}

Lister toutes les collections JASPAR (CORE, UNVALIDATED, ...); La liste complète est vérifiée. Utilisez les noms de collection comme filtre de collecte de jaspar_list_matrices (CORE = profils curés, non redondants).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases` {/* #jaspar_list_releases */}

Lister toutes les versions de la base de données JASPAR (année, numéro de sortie, drapeau actif); La liste complète est vérifiée. Enregistrez la version active lors de la sélection des motifs pour la reproductibilité, ou vérifiez l'historique de la version avant de comparer les résultats des versions JASPAR.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs` {/* #unibind_search_tfbs */}

Rechercher les ensembles de données UniBind ChIP-seq avec des prévisions TFBS de haute confiance (unibind.uio.no, sortie 2021; des interactions directes avec l'ADN-TF à partir d'ensembles de données ~10k pour les espèces 9). Chaque ensemble de données est triple (expérience, type de cellule, TF). Filtres (tous optionnels, combinés avec ET, à moins d'indication contraire): tf_name (symbole du gène, p.ex. "CTCF"), cell_line (titre UniBind verbeux — préférence `search` pour l'appariement flou), espèce (nom scientifique), collection ("Robust" = meilleur modèle / haute confiance, ou "Permissive"), jaspar_id (version, p.ex. "MA0139.1"), recherche (texte libre). `total` est le nombre exact de API's; au plus les lignes max_rows sont retournées (un préfixe stable).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `tf_name` | chaîne de caractères | facultatif |
| `cell_line` | chaîne de caractères | facultatif |
| `species` | chaîne de caractères | facultatif |
| `collection` | chaîne de caractères | facultatif; enum: &#91;"Robust", "Permissive"&#93; |
| `jaspar_id` | chaîne de caractères | facultatif |
| `search` | chaîne de caractères | facultatif |
| `max_rows` | entier | facultatif; par défaut : 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset` {/* #unibind_get_dataset */}

Obtenez un ensemble de données UniBind's detail: par modèle TFBS compte + URLs de fichiers. tf_id est la clé de l'ensemble de données "&lt;identificateur>.&lt;cell_line>.&lt;TF>" tel que retourné par unibind_search_tfbs (par exemple "ENCSR000AUE.A549_lung_carcinome.CTCF") . Retourne le nom du TF, les identifiants source (ENCODE/GEO/GTRD), les lignes cellulaires, les conditions biologiques, les ids de matrice JASPAR, le nombre de pics ChIP-seq et une ligne par modèle de prédiction TFBS (DAMO/PWM/...) avec total_tfbs, les seuils de score/distance, la valeur de CentriMo ajustée et les URL de téléchargement BED/FASTA directes — utilisez ces URLs (pas un appel MCP) pour récupérer la liste complète du site.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `tf_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region` {/* #unibind_tfbs_in_region */}

Les sites de liaison TF chevauchant une région génomique (cartes UniBind 2021), desservis par le hubApi de l'UCSC contre les hubs de voie publique enregistrés par UniBind's (les propres REST API de l'UniBind's n'ont pas de point final de la région). Les coordonnées sont basées sur 0 à moitié ouvertes. génome: assemblage UCSC — moyeu robuste: hg38, mm10, ce11, dm6, danRer11, sacCer3, rn6, araTha1; Ajouts permissifs spo2 (pas de hg19 — levez d'abord). chrom: avec "chr" Préfixe. start/end: intervalle, fin-start &lt;= 1,000,000 bp. HONEST-CAP: au plus les éléments 20,000 sont scannés par appel; region_scan_complete=false signifie que la région a plus de sites qu'on n'a scanné (flèche la fenêtre) et, avec tf_name set, les correspondances peuvent être manquantes. n_matching compte les sites scannés passant le filtre; retourné/tronqué décrire le bouchon max_sites.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `genome` | chaîne de caractères | **requis** |
| `chrom` | chaîne de caractères | **requis** |
| `start` | entier | **requis** |
| `end` | entier | **requis** |
| `tf_name` | chaîne de caractères | facultatif |
| `collection` | chaîne de caractères | facultatif; par défaut: "Robust"; enum: &#91;"Robust", "Permissive"&#93; |
| `max_sites` | entier | facultatif; par défaut : 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## Ressources de recherche {/* #family-21 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `search_grants` {/* #search_grants */}

Possibilités de financement de Search Grants.gov via la recherche2 API (extraction complète et vérifiée au compte). Au moins un critère est requis (mot clé, opportunity_number, aln/CFDA, agences, éligibilités, funding_categories ou funding_instruments). opportunity_statuses par défaut pour &#91;"prévu","posted"&#93; (procédures actuelles); ajouter "fermé"/"archivé" pour les historiques. les agences prennent des codes comme &#91;"HHS-NIH11"&#93; (NIH), &#91;"HHS-FDA"&#93;, &#91;"NSF"&#93;. Définissez count_only pour juste le nombre de succès + facettes; Les bouchons max_records ont retourné les enregistrements (la marche récupère toujours l'ensemble complet et les drapeaux tronqués).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `keyword` | chaîne de caractères | facultatif |
| `opportunity_number` | chaîne de caractères | facultatif |
| `aln` | chaîne de caractères | facultatif |
| `agencies` | tableau de chaînes | facultatif |
| `opportunity_statuses` | tableau de chaînes | facultatif |
| `eligibilities` | tableau de chaînes | facultatif |
| `funding_categories` | tableau de chaînes | facultatif |
| `funding_instruments` | tableau de chaînes | facultatif |
| `count_only` | booléen | facultatif; par défaut : false |
| `max_records` | entier | facultatif; par défaut : 100 |
| `include_facets` | booléen | facultatif; par défaut : true |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies` {/* #search_antibodies */}

Recherche en texte intégral dans le Registre des anticorps (antibodyregistry.org, ~3.2M records). Correspondance basée sur les jetons avec le nom d'anticorps/cible/texte catalogique ("TP53" et "p53" sont des requêtes différentes). Avec la page omise, toutes les pages sont montées jusqu'à max_records ou le plafond de profondeur anonyme (les lignes au-delà de 500 offset ont besoin d'authentification en amont, marqués comme anonymous_limit_hit — jamais laissé tomber silencieusement). Passez une page 1 pour la recherche d'une seule page (page&#42;page_size doit rester &lt;= 500).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `query` | chaîne de caractères | **requis** |
| `page` | entier | facultatif |
| `page_size` | entier | facultatif; par défaut : 100 |
| `max_records` | entier | facultatif; par défaut : 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody` {/* #get_antibody */}

Renseignez-vous sur les dossiers détaillés du Registre des anticorps pour une adhésion d'anticorps/RID. Accepte un nombre simple (" 3643095"), "AB_3643095" ou "RRID:AB_3643095". La route en amont est évaluée par une liste (une adhésion peut se faire à plusieurs enregistrements curés, p. ex. des duplicata multi-vendor). Un id inexistant donne record_count 0, pas une erreur.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `antibody_id` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog` {/* #find_antibodies_by_catalog */}

Trouvez les anticorps par numéro de catalogue du fournisseur (exacte, insensible à la casse). Implémenté comme une recherche en texte intégral plus une correspondance exacte côté client sur le numéro de catalogue (ou ses alternatives énumérées), parce que la route en amont colonne-filtre renvoie HTTP 500 pour chaque clé. Passez un nom de vendeur optionnel (exacte, insensible à la casse) pour réduire davantage les correspondances.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `catalog_number` | chaîne de caractères | **requis** |
| `vendor` | chaîne de caractères | facultatif |
| `page_size` | entier | facultatif; par défaut : 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats` {/* #get_antibody_registry_stats */}

Statistiques du registre des anticorps: nombre total d'anticorps et date de dernière mise à jour. Renvoie la charge utile en amont /api/datainfo.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## BioMart {/* #family-22 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `list_marts` {/* #list_marts */}

Liste disponible Ensembl BioMart mart (bases de données). BioMart organise les données comme MART -> DONNEES -> ATTRIBUTES/FILEURS; un nom de mart alimente list_datasets.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| — | objet | Pas de champs; passer un objet vide. |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets` {/* #list_datasets */}

Énumérer les ensembles de données disponibles dans une mart donnée (p. ex. hsapiens_gene_ensembl pour les gènes humains). Un nom d'ensemble de données alimente les outils attribut/filtre/query.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mart` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes` {/* #list_common_attributes */}

Énumérez les attributs couramment utilisés pour un ensemble de données (sous-ensemble de signaux élevés curés). Utilisez ceci avant list_all_attributes pour choisir les attributs pour get_data. `mart` est accepté pour la parité de signature mais ignoré; les touches de requête hors `dataset`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mart` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes` {/* #list_all_attributes */}

Énumérez tous les attributs disponibles pour un ensemble de données, moins les homologues et les sondes de microarray (qui sont volumineux et rarement nécessaires). Peut être grand; préférence list_common_attributes d'abord. `mart` est accepté pour la parité de signature mais ignoré; les touches de requête hors `dataset`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mart` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters` {/* #list_filters */}

Énumérez les filtres disponibles pour un ensemble de données. Filtres rétrécissent une requête get_data (par exemple: chromosome_name, biotype) et sont passés à get_data comme un dict filtres. `mart` est accepté pour la parité de signature mais ignoré; les touches de requête hors `dataset`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mart` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data` {/* #get_data */}

Exécuter une requête BioMart : récupérer les attributs demandés pour un ensemble de données, éventuellement restreint par des filtres. C'est le principal outil de récupération de données. `mart` est accepté pour la parité de signature mais ignoré; les touches de requête hors `dataset`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mart` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | **requis** |
| `attributes` | tableau de chaînes | **requis** |
| `filters` | objet | facultatif |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation` {/* #get_translation */}

Traduire un seul identifiant d'un type d'attribut à un autre (p. ex. un symbole HGNC d'un ID génétique d'Ensembl) dans un ensemble de données. `mart` est accepté pour la parité de signature mais ignoré; les touches de requête hors `dataset`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mart` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | **requis** |
| `from_attr` | chaîne de caractères | **requis** |
| `to_attr` | chaîne de caractères | **requis** |
| `target` | chaîne de caractères | **requis** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate` {/* #batch_translate */}

Traduire de nombreux identifiants d'un type d'attribut à un autre en une seule requête, plus efficace que les appels get_translation répétés. `mart` est accepté pour la parité de signature mais ignoré; les touches de requête hors `dataset`.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `mart` | chaîne de caractères | **requis** |
| `dataset` | chaîne de caractères | **requis** |
| `from_attr` | chaîne de caractères | **requis** |
| `to_attr` | chaîne de caractères | **requis** |
| `targets` | tableau de chaînes | **requis** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## ZINC {/* #family-23 */}

<ToolOperationGroup>
<summary>Afficher les opérations et les paramètres</summary>

### `zinc_search_by_id` {/* #zinc_search_by_id */}

Rechercher les composés purchasables dans ZINC22/ZINC20 par l'identificateur ZINC — répond " quel est ce composé et qui le vend". Batched: passez à 100 ids dans un seul appel plutôt que de nombreux appels à un seul id. Async en amont (soumettre + sondage); peut prendre jusqu'à timeout_s secondes.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **requis** |
| `max_results` | entier | facultatif; par défaut : 50 |
| `timeout_s` | nombre | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles` {/* #zinc_search_by_smiles */}

Recherche ZINC22's espace chimique purchasable par structure — répond "ce que les composés purchasables ressemblent à ce SMILES". Il s'agit des deux outils exacts et analogiques (similarity) : CartBlanche22 expose un paramètre structure-recherche dont le paramètre `dist` s'étend exactement à travers divers, donc il n'y a délibérément pas d'outil de recherche distinct. La requête ZINC la plus lente — élèvez progressivement `dist` plutôt que de commencer à se détendre.

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `smiles` | chaîne de caractères | **requis** |
| `dist` | entier | facultatif; par défaut : 0 |
| `adist` | entier | facultatif |
| `max_results` | entier | facultatif; par défaut : 50 |
| `timeout_s` | nombre | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier` {/* #zinc_search_by_supplier */}

Résoudre les numéros de catalogue des fournisseurs aux composés ZINC — répond " quelle substance ZINC est ce code fournisseur, et ce que ' est sa structure". Emballé: jusqu'à 100 code fournisseur par appel. Async en amont (soumettre + sondage).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `supplier_codes` | ['string', 'array'] | **requis** |
| `max_results` | entier | facultatif; par défaut : 50 |
| `timeout_s` | nombre | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample` {/* #zinc_random_sample */}

Tirez un échantillon aléatoire de composés purchasables de ZINC22 — pour les ponts de contrôle de bâtiments, les bases de propriétés ou les ensembles de leurres. `count` double comme cet outil's `max_results`; Le rappel d'un échantillon frais. Async en amont (soumettre + sondage).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `count` | entier | facultatif; par défaut : 50 |
| `subset` | chaîne de caractères | facultatif |
| `timeout_s` | nombre | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d` {/* #zinc_get_3d */}

Localiser les structures 3D prêtes à l'amarrage pour les composés ZINC. ZINC22 expédie des conformers 3D pré-générés (DOCK .db2.gz, .mol2.gz, .sdf.gz) dans son dépôt de fichiers, organisés par tranche — cet outil résout chaque id à sa tranche et retourne les emplacements de dépôt à télécharger à partir de pour le prép d'arrimage (DOCK6, AutoDock Vina, etc.). Max 50 ids par appel (3D récupération est un travail par composé). Async en amont (soumettre + sondage).

| Champ | Type | Besoins et contraintes |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **requis** |
| `timeout_s` | nombre | facultatif; par défaut : 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## Exemple d'enregistrement des réponses {/* #example-response-records */}

Le <ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">exemples d'enregistrements de réponses</ExampleDownload> comprend des entrées exactes, des extraits de réponse plafonnés et des résultats par opération. Distinguer un enregistrement retourné, une correspondance vide et une requête ratée. Les résultats peuvent être des métadonnées, des schémas ou des identifiants; Vérifiez les champs sources et les drapeaux d'exhaustivité avant de les utiliser dans votre recherche.
