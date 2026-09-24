---
title: "Connector operation reference"
toc_max_heading_level: 2
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connector operation reference

Look up exact operation names, required fields, defaults and example calls. To choose a data source, start with the [database catalog](../tools/databases.md). Expand the Connector family you intend to call; availability and credentials must be configured separately.

## Where the example calls run

The `host` object is supplied by Open-Science's agent execution environment. The JavaScript below is an **agent-side call fragment**, not a standalone Node.js program and not a method on the public Task SDK client. Ask the agent to load the relevant Connector instructions and use the matching operation. A framework may expose a Python bridge instead of this JavaScript form.

First enable the Connector in [Settings → Connectors](../guides/connectors.md), configure any [required credentials](../tools/credentials.md), and grant access to the selected Specialist if applicable. The call still follows the conversation's permission policy. Public Node.js integrations can manage Connector settings with the [Task SDK](api.md), but cannot obtain this `host` by importing that client.

### Read a result before chaining calls

<p className="example-label"><strong>Example</strong> Pass returned PubMed IDs to a metadata lookup</p>

For example, ask: **Use PubMed to search for PRISMA reporting guidance; return the total match count and five PMIDs.** The operation `search_articles` returns a total and a page of identifiers. Feed those returned PMIDs to `get_article_metadata` to obtain titles, authors and DOI links. An empty page, a truncated result and an authentication error need different handling.

| Returned information | Use it for |
| --- | --- |
| Total match count and returned rows | Distinguish a small page from the complete result set |
| `truncated`, `records_truncated` or family-specific completeness flags | Decide whether to page, narrow the query or retrieve the rest |
| `not_found`, `missing`, `not_processed` | Identify unresolved inputs and retry only appropriate items |
| DOI, accession, source URL and release/build | Retain the identity and source needed for subsequent queries |
| Full-text status or license note | Decide whether text was retrieved and can be reused |

Return field names differ by operation. The descriptions and downloadable schemas below specify each contract; the table is not a universal JSON response. Use the right-hand family list to jump, then expand that family's parameters. Searching for an operation name also opens its containing group.

**Read failures separately from empty results.** In v0.30.2, CellGuide marker/source/tissue requests surface fetch failures instead of treating them as empty evidence; an absent optional data file can still be empty. OLS relation queries reject incomplete pagination and invalid responses. A service error is not evidence that a cell type has no markers or an ontology term has no related terms.

## Operation inputs

Expand one Connector at a time. Required fields are marked **required**; this reference and download use the Open-Science **v0.33.1** schema. A nested `input.required` list is authoritative; a legacy top-level `required` list may be absent. Consult the <ExampleDownload path="/examples/capabilities/connector-catalog-v0.33.1.json">complete downloadable registry</ExampleDownload> for nested JSON schemas, full return descriptions and agent-side call examples. Do not pass a generic `id` when a tool expects `accessions`, `cids`, `rs_id` or another namespace-specific field.


## Chemistry {/* #family-1 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `pubchem_search_compounds`

Resolve a chemical identifier (name, SMILES, InChIKey, or CID) to PubChem CIDs, optionally with core computed properties for the top hits.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `namespace` | string | optional; default: &quot;name&quot;; enum: [&quot;name&quot;, &quot;smiles&quot;, &quot;inchikey&quot;, &quot;cid&quot;] |
| `max_cids` | integer | optional; default: 25; minimum: 1; maximum: 100 |
| `with_properties` | boolean | optional; default: true |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds`

Full computed-property records for a batch of PubChem CIDs, with optional capped synonym lists.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `cids` | array of integer | **required**; minItems: 1; maxItems: 50 |
| `include_synonyms` | boolean | optional; default: false |
| `max_synonyms` | integer | optional; default: 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search`

2D Tanimoto similarity search over all of PubChem for a query SMILES (synchronous fastsimilarity_2d route, no job polling).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `smiles` | string | **required** |
| `threshold` | integer | optional; default: 90; minimum: 1; maximum: 100 |
| `max_records` | integer | optional; default: 50; minimum: 1; maximum: 200 |
| `with_properties` | boolean | optional; default: false |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary`

Bioassay activity summary for one PubChem compound — which assays tested it, against which targets, with what outcome and potency.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `cid` | integer | **required** |
| `active_only` | boolean | optional; default: false |
| `max_rows` | integer | optional; default: 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety`

GHS safety classification for one PubChem compound (PUG-View &#x27;GHS Classification&#x27; heading), aggregated across reporting sources.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `cid` | integer | **required** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search`

Full-text search over ChEBI entities (names, synonyms, formulae, InChIKeys).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `term` | string | **required** |
| `max_results` | integer | optional; default: 20; minimum: 1; maximum: 100 |
| `page` | integer | optional; default: 1; minimum: 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity`

Full ChEBI entity record: names, structure, chemical data, roles and cross-references.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `chebi_id` | string | **required** |
| `max_synonyms` | integer | optional; default: 30 |
| `max_xrefs` | integer | optional; default: 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology`

Ontology relations of a ChEBI entity — what it IS (outgoing: is a / has role / conjugate acid...) and what points AT it (incoming: children/derivatives).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `chebi_id` | string | **required** |
| `relation_type` | string | optional |
| `max_relations` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions`

Search Rhea master reactions by equation text, participant ChEBI id, or EC number (query type auto-detected).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `limit` | integer | optional; default: 50; minimum: 1; maximum: 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction`

Full record for one Rhea reaction: equation, participants with ChEBI ids and stoichiometry, EC links, direction family and literature.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `rhea_id` | string | **required** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target`

Measured binding affinities (Ki/Kd/IC50/EC50) of all BindingDB ligands against one protein target, by UniProt accession.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `uniprot` | string | **required** |
| `affinity_cutoff_nm` | number | optional; default: 10000 |
| `max_rows` | integer | optional; default: 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound`

Protein targets with measured affinities for compounds 2D-similar to a query SMILES — &quot;what does this molecule (or its close analogs) bind?&quot;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `smiles` | string | **required** |
| `similarity` | number | optional; default: 0.85; minimum: 0.5; maximum: 1 |
| `max_rows` | integer | optional; default: 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## Literature Graph {/* #family-2 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `openalex_search_works`

Search OpenAlex scholarly works (all disciplines, ~250M records) with year/type/OA/venue filters. Args: query (free-text over title+abstract+fulltext; optional if a filter is set), year_from, year_to (inclusive years), work_type (article/review/preprint/book-chapter/dataset/dissertation), open_access_only, venue (S-id, openalex.org URL, ISSN, or a plain name resolved to the top sources hit — surfaced in venue_resolved; pass an exact ID to skip resolution), sort (relevance default / cited_by_count / publication_date), max_records (default 50, hard ceiling 500; pages of 200), include_abstracts (reconstructed from the inverted index, but ONLY for verified-open licenses — cc-by/cc-by-sa/cc0/public-domain; others get abstract=null + abstract_policy note + abstract_license; adds bulk). Returns &#123;query, filters, sort, api_total, n_records_returned, records_truncated, records&#125;; each record is the lean work shape (openalex_id, doi, pmid, title, publication_year/date, type, language, is_retracted, authors[...], source&#123;...&#125;, biblio, cited_by_count, fwci, referenced_works_count, open_access&#123;...&#125;, best_oa_pdf_url, primary_topic, keywords).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | optional |
| `year_from` | integer | optional |
| `year_to` | integer | optional |
| `work_type` | string | optional |
| `open_access_only` | boolean | optional |
| `venue` | string | optional |
| `sort` | string | optional; default: &quot;relevance&quot;; enum: [&quot;relevance&quot;, &quot;cited_by_count&quot;, &quot;publication_date&quot;] |
| `max_records` | integer | optional; default: 50 |
| `include_abstracts` | boolean | optional; default: false |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work`

Fetch one OpenAlex work in full — metadata, abstract (reconstructed from the inverted index, license-gated as in openalex_search_works), OA locations, referenced_works (outgoing W-ids — hydrate with openalex_references) and counts_by_year. Args: work_id (W-id, openalex.org URL, bare DOI, or doi.org URL). DOI lookups resolve via the claimant filter; when several works share one DOI the most-cited is selected and doi_claimants + doi_resolution_note are included. Raises not-found for unknown IDs/DOIs.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `work_id` | string | **required** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations`

List works that CITE a given work (incoming citations) via OpenAlex&#x27;s citation graph. Args: work_id (W-id/URL/DOI — DOIs cost one extra resolution request), sort (cited_by_count default / publication_date / relevance), max_records (default 50, ceiling 500), include_abstracts. Returns &#123;work_id, api_total (the true citing-work count), n_records_returned, records_truncated, records&#125; (lean work records).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `work_id` | string | **required** |
| `sort` | string | optional; default: &quot;cited_by_count&quot;; enum: [&quot;cited_by_count&quot;, &quot;publication_date&quot;, &quot;relevance&quot;] |
| `max_records` | integer | optional; default: 50 |
| `include_abstracts` | boolean | optional; default: false |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references`

List the works a given work CITES (outgoing references), hydrated to full metadata in reference-list order. Args: work_id (W-id/URL/DOI), max_records (default 100, ceiling 500; hydration batched 50/request). Returns &#123;work_id, n_references, n_records_returned, records_truncated, references_not_hydrated (IDs OpenAlex has no record for — never silently dropped), reference_ids (ALL outgoing W-ids), records&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `work_id` | string | **required** |
| `max_records` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors`

Search OpenAlex author profiles by name. Args: query (matches display name + alternatives; expect homonyms — check affiliations/topics/ORCID), max_records (default 25, ceiling 500). Returns &#123;query, api_total, n_records_returned, records_truncated, records&#125;; each record &#123;author_id, name, orcid, works_count, cited_by_count, h_index, i10_index, affiliations[&#123;institution, years&#125;], last_known_institutions, top_topics&#125;. Use author_id with openalex_get_author.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `max_records` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author`

Fetch one OpenAlex author profile plus their top-cited works. Args: author_id (A-id, openalex.org URL, or ORCID; CAVEAT: OpenAlex&#x27;s ORCID pointer can resolve to a sparse duplicate — prefer the A-id from openalex_search_authors), works_sample (default 10, max 200; 0 skips the extra request). Returns the author record plus counts_by_year, top_works_total (true total works count) and top_works (lean work records by citations).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `author_id` | string | **required** |
| `works_sample` | integer | optional; default: 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info`

Look up journals/repositories (&#x27;sources&#x27;) in OpenAlex — OA status, DOAJ listing, APC, citation metrics. Args: venue (exact S-id, openalex.org URL, or ISSN for a single record; anything else is a name search), max_records (default 10, ceiling 500; name-search only). Returns: exact -&gt; one source record + counts_by_year; name search -&gt; &#123;query, api_total, n_records_returned, records_truncated, records&#125;. Source record: &#123;source_id, display_name, type, issn_l, issn, host_organization, country_code, homepage_url, is_oa, is_in_doaj, is_core, apc_usd, works_count, cited_by_count, h_index, two_year_mean_citedness, first/last_publication_year, top_topics&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `venue` | string | **required** |
| `max_records` | integer | optional; default: 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search`

Search arXiv preprints (physics, math, CS, stats, q-bio, ...) via the official Atom API. Args: query (arXiv query string; plain terms search all fields, field prefixes ti:/au:/abs: and booleans AND/OR/ANDNOT work; optional if category or a date range is set), category (arXiv code AND-ed in, e.g. q-bio.GN, cs.LG, stat.ML), date_from / date_to (submission date YYYY-MM-DD, inclusive), start (0-based paging offset; the API paces ~3s between requests — page politely), max_results (default 25, max 100 per call), sort_by (relevance default / submittedDate / lastUpdatedDate), sort_order (descending default / ascending). Returns &#123;search_query (the exact query sent), api_total (arXiv&#x27;s total match count), start_index, n_records_returned, records_truncated, sort_by, sort_order, records&#125;; each record &#123;arxiv_id, version, id_versioned, title, abstract, authors, published, updated, primary_category, categories, doi, journal_ref, comment, abs_url, pdf_url&#125;. doi/journal_ref appear only after journal publication. Malformed queries raise an error (arXiv&#x27;s HTTP-200 error feed is detected, never returned as data).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | optional |
| `category` | string | optional |
| `date_from` | string | optional |
| `date_to` | string | optional |
| `start` | integer | optional; default: 0 |
| `max_results` | integer | optional; default: 25 |
| `sort_by` | string | optional; default: &quot;relevance&quot;; enum: [&quot;relevance&quot;, &quot;submittedDate&quot;, &quot;lastUpdatedDate&quot;] |
| `sort_order` | string | optional; default: &quot;descending&quot;; enum: [&quot;descending&quot;, &quot;ascending&quot;] |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers`

Batch-fetch arXiv paper metadata (incl. abstracts) by ID — one paced request for up to 100 papers. Args: arxiv_ids (up to 100 IDs in any common form — 2103.14030, versioned 2103.14030v2, old-style q-bio/0601001, arXiv:-prefixed, or abs/pdf URLs; unversioned IDs resolve to the latest version). Returns &#123;n_requested, n_found, duplicates (inputs that resolved to an already-returned paper), not_found (unknown AND malformed IDs — arXiv silently skips unknowns and rejects whole batches over malformed ones; this tool does neither), records&#125; — records in requested order, same shape as arxiv_search records. Withdrawn papers still return metadata (check comment for withdrawal notes).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `arxiv_ids` | array of string | **required** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work`

Retrieve publisher-deposited metadata for a Crossref DOI. A bare DOI, doi: prefix or doi.org URL is accepted. No API key is required. If the DOI belongs to another registration agency, use the matching service; a Crossref 404 does not prove the DOI is invalid. Check the returned DOI, title and source_url.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `doi` | string | **required**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates`

Read deposited correction, retraction and other update relationships. updated_by points to notices updating this work; update_to points to works updated by this DOI. Preserve relationship direction and source labels. Empty arrays do not establish reliability or prove that no retraction exists.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `doi` | string | **required**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records`

Search public DataCite dataset/software DOI metadata. Supply query, related_doi or both; query uses DataCite query syntax. Keep the same filters and page_size when following next_page. Page-number retrieval is limited to the first 10,000 records: narrow the query if necessary. Check related_identifiers, rights and landing URLs; metadata does not guarantee downloadable data or reuse permission.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | optional; minLength: 1; maxLength: 2000 |
| `related_doi` | string | optional; minLength: 1; maxLength: 2048 |
| `resource_type` | string | optional; default: &quot;dataset&quot;; enum: [&quot;dataset&quot;, &quot;software&quot;] |
| `page_size` | integer | optional; default: 20; minimum: 1; maximum: 100 |
| `page` | integer | optional; default: 1; minimum: 1; maximum: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record`

Retrieve one public DataCite DOI record, including titles, creators, resource type, rights, related identifiers and available version. Accepts a bare DOI, doi: prefix or doi.org URL. Check the identifier and relationship direction before using a linked dataset or software package.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `doi` | string | **required**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## PubMed {/* #family-3 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `search_articles`

Search PubMed (biomedical &amp; life-sciences literature via NCBI esearch) for articles matching a query. Returns the total match count plus a page of PMIDs. Supports PubMed field tags ([Title], [Author], [Journal], [MeSH Terms], ...), Boolean operators, date filtering and sort. PubMed does not index physics / CS / math / pure-chemistry papers.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `max_results` | integer | optional; default: 20 |
| `retstart` | integer | optional; default: 0 |
| `sort` | string | optional; enum: [&quot;relevance&quot;, &quot;pub_date&quot;, &quot;author&quot;, &quot;journal_name&quot;, &quot;title&quot;] |
| `date_from` | string | optional |
| `date_to` | string | optional |
| `datetype` | string | optional; default: &quot;pdat&quot;; enum: [&quot;pdat&quot;, &quot;edat&quot;, &quot;mdat&quot;] |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata`

Retrieve detailed article metadata from PubMed by PMID (bulk, via efetch): identifiers (pmid/pmc/doi), title, abstract, journal, authors with affiliations, publication date, MeSH terms, article types, language and citation. On every use, cite PubMed and include the returned article DOIs (identifiers.doi) as links.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **required** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles`

Find related PubMed content for one or more source PMIDs via NCBI elink. `pubmed_pubmed` (default) returns similar articles ranked by word-weighted similarity of titles/abstracts/MeSH (NOT citations); `pubmed_pmc` returns full-text PMC links; `pubmed_gene`/`pubmed_protein`/`pubmed_nucleotide` return linked sequence/gene records.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **required** |
| `link_type` | string | optional; default: &quot;pubmed_pubmed&quot;; enum: [&quot;pubmed_pubmed&quot;, &quot;pubmed_pmc&quot;, &quot;pubmed_nucleotide&quot;, &quot;pubmed_protein&quot;, &quot;pubmed_gene&quot;] |
| `max_results` | integer | optional |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation`

Resolve bibliographic citations to PMIDs via NCBI ecitmatch. Each citation supplies some of &#123;journal, year, volume, first_page, author, key&#125;; provide 2-3+ fields for reliable matching. Use when you have a reference list and need PMIDs.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `citations` | array of object | **required** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids`

Convert between PMID, PMCID and DOI via the NCBI/PMC ID Converter. Homogeneous input ids per call (set `id_type` to match). Commonly used to check whether a PMID has a PMCID (i.e. full text in PMC) before calling get_full_text_article.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `ids` | ['string', 'array'] | **required** |
| `id_type` | string | optional; default: &quot;pmid&quot;; enum: [&quot;pmid&quot;, &quot;pmcid&quot;, &quot;doi&quot;] |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article`

Retrieve open-access full text from PubMed Central via Europe PMC by PMC id (&quot;PMC12345&quot; or &quot;12345&quot;). Returns structured section text plus the license; when full text is unavailable the reason is reported explicitly (fulltext_status). Only OA-subset articles have retrievable full text. On every use, cite PubMed and include the returned article DOIs as links.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pmc_ids` | ['string', 'array'] | **required** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status`

Report copyright and license status per PMID by combining PubMed CopyrightInformation, the PMC ID Converter (PMID -&gt; PMCID/DOI), and the PMC &lt;permissions&gt; block (license type, ALI license URL, copyright statement/year). Use to check open-access reuse rights before reproducing content.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **required** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## Genes &amp; Ontologies {/* #family-4 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `query_genes`

Resolve gene identifiers/symbols via mygene.info (batched, up to 1000 terms/request). Use this to map gene symbols to Ensembl gene IDs, Entrez IDs, names, and any other mygene.info field — or the reverse (set `scopes` to the namespace of your input terms, e.g. &quot;entrezgene&quot;, &quot;ensembl.gene&quot;, &quot;symbol,alias&quot;). Args: terms (query terms, e.g. [&quot;TP53&quot;,&quot;BRCA1&quot;]; terms containing commas are not supported); scopes (comma-separated identifier namespaces to match terms against); fields (comma-separated mygene fields to return, or &quot;all&quot;); species (common name &quot;human&quot;/&quot;mouse&quot; or NCBI taxid). Returns &#123;n_input, n_records, not_found, records&#125;. A term matching several genes yields several records (each carries its `query`). Records are deterministically ordered (input order, then _id).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `terms` | array of string | **required** |
| `scopes` | string | optional |
| `fields` | string | optional; default: &quot;symbol,name,taxid,entrezgene,ensembl.gene&quot; |
| `species` | string | optional |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies`

List ontologies in the EBI Ontology Lookup Service (OLS4). With `ontology_ids` (e.g. [&quot;efo&quot;,&quot;cl&quot;,&quot;chebi&quot;,&quot;go&quot;,&quot;mondo&quot;]): fetch structured metadata records for just those ontologies; unknown IDs are reported in `not_found`. Without: the complete OLS4 catalogue (~250 ontologies, paginated fully and count-verified). Returns: &#123;records:[&#123;ontology_id, title, version, status, num_terms, ...&#125;], not_found:[...]&#125; for an ID list, or &#123;records:[...], total_elements, complete&#125; for the full catalogue.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `ontology_ids` | array of string | optional |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms`

Search ontology terms by label/synonym across one or more OLS4 ontologies. Typical uses: find an EFO ID for a disease name (ontologies=[&quot;efo&quot;]), Cell Ontology terms for a cell type ([&quot;cl&quot;]), ChEBI terms for a chemical ([&quot;chebi&quot;]), GO terms by name ([&quot;go&quot;]) — or search all ontologies at once. Args: query (term label, synonym, or identifier); ontologies (lowercase IDs to restrict to; None searches every ontology); exact (whole-string match); include_obsolete (default False); max_results (ranked by OLS relevance). Returns &#123;query, total_found, n_returned, truncated, terms:[&#123;curie, iri, label, short_form, ontology, description, type, is_defining_ontology&#125;]&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `ontologies` | array of string | optional |
| `exact` | boolean | optional; default: false |
| `include_obsolete` | boolean | optional; default: false |
| `max_results` | integer | optional; default: 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term`

Fetch one ontology term&#x27;s details, or its complete related-term set. With `relation=None`: full term record (label, synonyms, description, obsolete flag, direct parents). With a relation: the COMPLETE, fully paginated set of related terms — e.g. relation=&quot;hierarchicalChildren&quot; for direct children incl. part_of etc., &quot;descendants&quot;/&quot;hierarchicalDescendants&quot; for the whole subtree, &quot;ancestors&quot;/&quot;hierarchicalAncestors&quot;, &quot;parents&quot;, &quot;children&quot;. Retrieval is count-verified against the API&#x27;s own total. Args: ontology (lowercase, e.g. &quot;efo&quot;,&quot;go&quot;,&quot;cl&quot;,&quot;chebi&quot;); term_id (CURIE &quot;EFO:0000305&quot;/&quot;GO:0006281&quot; or full IRI); relation (None or one of the listed); include_parents (include direct parent refs when relation is None). Returns: relation=None &#123;curie, iri, label, ontology, short_form, synonyms, description, is_obsolete, has_children, parents&#125;; otherwise &#123;root, relation, total_elements, term_count, terms:[...]&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `ontology` | string | **required** |
| `term_id` | string | **required** |
| `relation` | string | optional; enum: [&quot;parents&quot;, &quot;children&quot;, &quot;ancestors&quot;, &quot;descendants&quot;, &quot;hierarchicalParents&quot;, &quot;hierarchicalChildren&quot;, &quot;hierarchicalAncestors&quot;, &quot;hierarchicalDescendants&quot;] |
| `include_parents` | boolean | optional; default: false |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations`

Retrieve GO annotations for a UniProt gene product from QuickGO (complete, count-verified). Args: uniprot_accession (e.g. &quot;P04637&quot;, prefix optional); aspect (omit for all aspects, or one of biological_process/molecular_function/cellular_component); evidence (None/all, a preset &quot;experimental_manual&quot;=manually-assigned experimental evidence, &quot;automatic_iea&quot;=electronic/IEA, or an explicit ECO code like &quot;ECO:0000314&quot;; three-letter GO evidence codes like IDA/IEA are NOT accepted — QuickGO silently ignores goEvidence, filter must use ECO codes); taxon_id (optional NCBI taxon, e.g. 9606); include_term_names (hydrate each record with GO term name/aspect/obsolete via one batched ontology lookup); max_records (cap on records; full set still retrieved and summarized; `truncated` flags the cap). Returns &#123;gene_product, total_annotations, n_records, complete, truncated, distinct_go_ids (across ALL annotations), records:[&#123;go_id, go_aspect, qualifier, go_evidence, eco_id, reference, assigned_by, date, ...&#125;]&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `uniprot_accession` | string | **required** |
| `aspect` | string | optional; enum: [&quot;biological_process&quot;, &quot;molecular_function&quot;, &quot;cellular_component&quot;] |
| `evidence` | string | optional |
| `taxon_id` | integer | optional |
| `include_term_names` | boolean | optional; default: false |
| `max_records` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `search_uniprot_entries`

Discover active UniProtKB protein entries by exact gene name (including synonyms), protein-name phrase and/or exact organism_id (NCBI taxonomy ID, not descendants). At least one of these filters is required; supplied filters are combined with AND. Optional reviewed=true selects Swiss-Prot, false selects TrEMBL; omitting it includes both. No organism or reviewed default. Text uses UniProt tokenized phrase matching, not arbitrary substring matching or raw query syntax; quotes, backslashes, wildcards and control characters are rejected. Returns one bounded page in accession order, not a complete protein set. For the next page, pass next_cursor as cursor with identical filters and page_size. Cursors are opaque, not offsets or durable snapshots; restart if UniProt rejects a stale cursor.

Supply at least one listed search filter; consult the downloadable schema for complete combination rules.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene` | string | optional; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `protein_name` | string | optional; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `organism_id` | integer | optional; minimum: `1`; maximum: `2147483647` |
| `reviewed` | boolean | optional |
| `page_size` | integer | optional; default: `25`; minimum: `1`; maximum: `500` |
| `cursor` | string | optional; minLength: `1`; maxLength: `4096`; pattern: `"^[^\\s\\u0000-\\u001f\\u007f]+$"` |

```javascript
const result = await host.mcp("genes", "search_uniprot_entries", {"gene": "TP53", "organism_id": 9606, "reviewed": true, "page_size": 25})
```

### `get_uniprot_entries`

Fetch UniProtKB records for a list of primary or secondary accessions (batched OR-queries first; unresolved aliases use a direct per-accession fallback). Three modes: `fields` given → token-lean tabular retrieval of just those UniProt fields (e.g. ["accession","id","protein_name","gene_names","organism_name","length","sequence"]); `format` is ignored. format="fasta" → per-accession FASTA sequences. format="txt" → per-accession full UniProt flat-file text (complete annotation; can be very large — prefer `fields`). Args: accessions (e.g. ["P04637","P38398"]); format ("fasta"/"txt", ignored when `fields` given); fields (optional UniProt REST field names for tabular mode). Returns: fields mode &#123;accessions, fields, n_records, records:[&#123;&lt;column&gt;:value&#125;]&#125;; fasta/txt mode &#123;accessions, format, n_found, missing, records:&#123;accession:text&#125;&#125; — `missing` lists accessions UniProt returned no record for.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accessions` | array of string | **required** |
| `format` | string | optional; enum: [&quot;fasta&quot;, &quot;txt&quot;] |
| `fields` | array of string | optional |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `submit_uniprot_id_mapping`

Submit up to 100,000 identifiers for UniProt batch ID mapping. from_db/to_db are exact UniProt API database names (e.g. Gene_Name, GeneID, Ensembl, RefSeq_Protein, UniProtKB_AC-ID -> UniProtKB; UniProtKB_AC-ID -> Ensembl or GeneID). Valid pairs are defined by https://rest.uniprot.org/configure/idmapping/fields; unsupported pairs fail upstream. taxon_id is optional only for Gene_Name; specify it to disambiguate species. IDs must be individual strings without whitespace or separators; case and versions are preserved, exact duplicates submitted once. Pass accessions from search_uniprot_entries as ids with from_db=UniProtKB_AC-ID. Sends one POST, never automatically retries or polls. Save job_id, then use get_uniprot_id_mapping_status and get_uniprot_id_mapping_results. UniProt expires results after up to 7 days; cancellation or app shutdown stops local requests, not the remote job. No local job cache or remote cancellation/deletion API is provided. If submission loses its response, a job may exist; do not blindly resubmit.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `from_db` | string | **required**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z][A-Za-z0-9_-]*$&quot; |
| `to_db` | string | **required**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z][A-Za-z0-9_-]*$&quot; |
| `ids` | array of string | **required**; minItems: 1; maxItems: 100000 |
| `taxon_id` | integer | optional; minimum: 1; maximum: 2147483647 |

```javascript
const result = await host.mcp("genes", "submit_uniprot_id_mapping", {"from_db":"Gene_Name","to_db":"UniProtKB","ids":["TP53","BRCA1"],"taxon_id":9606})
```

### `get_uniprot_id_mapping_status`

Check an existing UniProt ID mapping job once. NEW/RUNNING means poll this tool later (at least 3 seconds apart); FINISHED means fetch all pages with get_uniprot_id_mapping_results. Upstream ERROR is normalized to FAILED, a terminal job failure, not unmatched IDs. HTTP 400/500 job failures are read without automatic retries; other HTTP failures (including unknown/expired jobs) propagate. Does not submit a new job or automatically poll.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z0-9_-]+$&quot; |

```javascript
const result = await host.mcp("genes", "get_uniprot_id_mapping_status", {"job_id":"ecuuh9h0Md"})
```

### `get_uniprot_id_mapping_results`

Fetch one page of compact UniProt ID mapping pairs for a finished job. Repeat with next_cursor and identical job_id/page_size until has_more=false; cursors are opaque, not offsets or durable snapshots. Every from/to row is retained, including one-to-many mappings. Merge pairs by from across ALL pages before interpreting multiplicity; a source can span pages. Collect the union of failed_ids reported across pages; never infer unmatched IDs from absence on a page. UniProtKB target IDs can be passed to get_uniprot_entries for annotations or sequences.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z0-9_-]+$&quot; |
| `page_size` | integer | optional; default: 100; minimum: 1; maximum: 500 |
| `cursor` | string | optional; minLength: 1; maxLength: 4096; pattern: &quot;^[^\\s\\u0000-\\u001f\\u007f]+$&quot; |

```javascript
const result = await host.mcp("genes", "get_uniprot_id_mapping_results", {"job_id":"ecuuh9h0Md","page_size":100})
```

### `map_reactome_pathways`

Map gene symbols or UniProt accessions to Reactome pathways (AnalysisService token workflow). Args: identifiers (gene symbols if id_type=&quot;symbol&quot;, UniProt accessions if &quot;uniprot&quot;; no duplicates); id_type (&quot;symbol&quot;/&quot;uniprot&quot;); species (default &quot;Homo sapiens&quot;); resource (AnalysisService molecule-resource view &quot;TOTAL&quot; default; &quot;UNIPROT&quot; restricts to protein-level mappings); include_disease (service default True); compact (True → per-identifier low-level pathways only &#123;stId,name,species&#125; + reactome release version; False → full deterministic result: per-identifier complete pathway sets with entity/reaction statistics (p-values, FDR, found/total) and batch summary incl. identifiers_not_found). Returns: compact &#123;tool, reactome_version, id_type, species, n_input, genes:&#123;identifier:&#123;found, n_lowlevel_pathways, pathways&#125;&#125;&#125;; full adds per-pathway statistics and batch_summary. Maps identifiers to pathways in the requested species, without projecting them to human. Use a supported scientific name, such as `Homo sapiens` or `Mus musculus`; the downloadable schema lists all supported names. Empty, unsupported or mismatched species are errors. `found` and `n_found` indicate identifier recognition, not pathway membership: a recognized identifier can have zero pathways. Compact mode contains only low-level pathways.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `identifiers` | array of string | **required** |
| `id_type` | string | **required**; enum: [&quot;symbol&quot;, &quot;uniprot&quot;] |
| `species` | string | optional; default: &quot;Homo sapiens&quot; |
| `resource` | string | optional; default: &quot;TOTAL&quot; |
| `include_disease` | boolean | optional; default: true |
| `compact` | boolean | optional; default: true |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources`

List the g:Profiler enrichment sources and their current data versions for one organism. Sources are organism-dependent and include namespaces such as GO:BP, GO:MF, GO:CC, KEGG, Reactome, and WikiPathways when available. g:Profiler stores limited query metadata for service operation; this read-only lookup does not submit a gene list.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `organism` | string | **required**; minLength: `1`; maxLength: `64`; pattern: `"^[a-z][a-z0-9_]*$"` |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set`

Run g:Profiler g:GOSt enrichment for a gene set across GO, Reactome, KEGG, WikiPathways, and other organism-supported sources. Supports an explicit organism, custom statistical background, under-representation testing, and g:Profiler multiple-testing correction. Unmapped, ambiguous, and duplicate identifiers are returned in metadata instead of being silently discarded.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `genes` | array of string | **required**; minItems: 1; maxItems: 5000 |
| `organism` | string | **required**; minLength: `1`; maxLength: `64`; pattern: `"^[a-z][a-z0-9_]*$"` |
| `sources` | array of string | optional; maxItems: 100 |
| `background_genes` | array of string | optional; minItems: 1; maxItems: 20000 |
| `domain_scope` | string | optional; enum: [&quot;annotated&quot;, &quot;known&quot;, &quot;custom&quot;, &quot;custom_annotated&quot;] |
| `correction_method` | string | optional; default: &quot;g_SCS&quot;; enum: [&quot;g_SCS&quot;, &quot;bonferroni&quot;, &quot;fdr&quot;] |
| `user_threshold` | number | optional; maximum: 1; exclusiveMinimum: 0 |
| `all_results` | boolean | optional; default: false |
| `ordered` | boolean | optional; default: false |
| `measure_underrepresentation` | boolean | optional; default: false |
| `no_iea` | boolean | optional; default: false |
| `no_evidences` | boolean | optional; default: false |
| `numeric_ns` | string | optional; minLength: 1; maxLength: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## Genomes {/* #family-5 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `blast_submit`

Submit one nucleotide or protein sequence to the public NCBI BLAST service for asynchronous similarity search. Set molecule_type explicitly because a protein made only of A/C/G/T is otherwise ambiguous. Returns a RID and the server estimate; call blast_status no more often than once per minute, then blast_results after READY. The sequence is sent to NCBI and is not cached locally; a lost submit response raises blast_submission_unknown and must not be retried automatically. Space all BLAST requests by at least 10 seconds and all requests for the same RID by at least 60 seconds. Keep the RID to resume after restart. NCBI generally retains results for 36 hours; this is not a deletion guarantee. Cancellation, app exit and uninstall stop local requests only; this API has no documented remote cancel/delete operation. No job registry or result cache is added; normal conversation/notebook persistence may retain inputs and outputs.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `sequence` | string | **required**; minLength: `1`; maxLength: `100000` |
| `molecule_type` | string | **required**; enum: `["nucleotide", "protein"]` |
| `database` | string | optional; enum: `["nt", "core_nt", "refseq_rna", "nr", "refseq_protein", "swissprot"]` |
| `evalue` | number | optional; exclusiveMinimum: `0`; maximum: `1000` |
| `hitlist_size` | integer | optional; minimum: `1`; maximum: `100` |
| `megablast` | boolean | optional |

```javascript
const result = await host.mcp("genomes", "blast_submit", {"sequence": "ATGCGTACGTAGCTAG", "molecule_type": "nucleotide", "database": "nt"})
```

### `blast_status`

Check one NCBI BLAST RID once. This is a single SearchInfo request and never polls or waits; respect NCBI guidance to wait at least 60 seconds between checks. Returns WAITING, READY, FAILED, or UNKNOWN (unknown or expired RID). Space all BLAST requests by at least 10 seconds and same-RID requests, including results retrieval, by at least 60 seconds.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `rid` | string | **required**; minLength: `1`; maxLength: `128` |

```javascript
const result = await host.mcp("genomes", "blast_status", {"rid": "AYEFB4DT014"})
```

### `blast_results`

Fetch bounded results for an NCBI BLAST RID. It makes one request and returns ready=false when the job is still waiting; choose json2, xml2, text, or tabular output after blast_status reports READY. Results are capped at 2 MiB and returned verbatim. tabular means NCBI Text + ALIGNMENT_VIEW=Tabular, which may include HTML comments, PRE tags and report headers; it is not pure TSV or CSV. Wait at least 60 seconds after the last request for this RID, including blast_status. No automatic retries.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `rid` | string | **required**; minLength: `1`; maxLength: `128` |
| `format` | string | optional; enum: `["json2", "xml2", "text", "tabular"]` |

```javascript
const result = await host.mcp("genomes", "blast_results", {"rid": "AYEFB4DT014", "format": "json2"})
```

### `ensembl_lookup`

Look up genes, transcripts, or proteins by stable ID, or genes by symbol. query accepts ENS IDs (versioned allowed), FlyBase/WormBase/yeast IDs, or symbols such as BRAF. query_type: auto (default) tries ID first, then symbol only on explicit absence unless the input is a canonical ENS/LRG ID; id uses only ID lookup; symbol uses only symbol lookup without version normalization. species applies only to symbol lookup (default homo_sapiens) and is not inferred. expand includes transcripts, exons and translations (default false). Invalid requests and service failures raise errors.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `query_type` | string | optional; default: &quot;auto&quot;; enum: [&quot;auto&quot;, &quot;id&quot;, &quot;symbol&quot;] |
| `species` | string | optional; default: &quot;homo_sapiens&quot; |
| `expand` | boolean | optional; default: false |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs`

External cross-references of an Ensembl stable ID — the bridge from Ensembl gene/transcript IDs to HGNC, NCBI (EntrezGene), UniProt, OMIM, RefSeq, Expression Atlas and others. Args: stable_id (ENSG.../ENST..., versioned accepted); external_db (optional exact upstream database-name filter, e.g. HGNC, EntrezGene, Uniprot_gn, MIM_GENE, RefSeq_mRNA; omit for all). Returns &#123;stable_id, external_db, n_xrefs, xrefs&#125; — the COMPLETE list (never truncated), sorted by (dbname, primary_id); each row &#123;dbname, db_display_name, primary_id, display_id, description, synonyms, info_type&#125;. Unknown IDs return n_xrefs:0.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `stable_id` | string | **required** |
| `external_db` | string | optional |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant`

A supplied `variant_id` takes precedence and ignores `region`, `allele` and `allele_orientation`; `allele` does not filter ID results. Region queries use the current species assembly (GRCh38 for human). Coordinates are 1-based inclusive; an insertion uses `start = end + 1`. `allele_orientation` defaults to `forward`: the allele is on the reference forward strand, even with a `:-1` suffix. With `region`, a negative-strand sequence allele is reverse-complemented before the request. Symbolic alleles on a negative region require `forward`. Every region request is sent on the forward strand; `normalization` records the original and normalized inputs. Coordinates are not lifted or reversed. A negative-strand gene does not require negative-strand input.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `variant_id` | string | optional |
| `region` | string | optional |
| `allele` | string | optional |
| `allele_orientation` | string | optional; default: `forward`; enum: `forward`, `region` |
| `species` | string | optional; default: &quot;homo_sapiens&quot; |
| `max_consequences` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology`

Orthologues or paralogues of a gene from Ensembl Compara (condensed rows — no alignments/sequences). Args: gene_symbol (resolved to a stable ID in `species` first; pass exactly one of gene_symbol/gene_id); gene_id (ENSG...); homology_type (orthologues default/paralogues/projections); target_species (restrict to one species); target_taxon (NCBI taxon subtree, e.g. 9443 Primates; combinable with target_species, OR semantics); species (source species, default homo_sapiens); max_homologies (row cap default 200; n_total carries the complete count, homologies_truncated flags the cap). Returns &#123;gene_id, gene_symbol, species, homology_type, target_species, target_taxon, n_total, homologies_truncated, homologies&#125;; rows sorted by (species,id) &#123;type, species, id, protein_id, taxonomy_level, method_link_type&#125;. Quirk: the /homology/symbol route stalls — this tool always resolves symbols itself and queries by stable ID.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | optional |
| `gene_id` | string | optional |
| `homology_type` | string | optional; default: &quot;orthologues&quot;; enum: [&quot;orthologues&quot;, &quot;paralogues&quot;, &quot;projections&quot;] |
| `target_species` | string | optional |
| `target_taxon` | integer | optional |
| `species` | string | optional; default: &quot;homo_sapiens&quot; |
| `max_homologies` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence`

Fetch sequence from Ensembl — by stable ID (gene/transcript/protein) or by genomic region. Pass EITHER stable_id OR region. Args: stable_id (ENSG.../ENST.../ENSP..., versioned accepted); region (1-based inclusive chrom:start..end or chrom:start-end, GRCh38 for human, max 10Mb); species (for region route, default homo_sapiens; ignored for stable IDs); seq_type (ID route: genomic default/cdna/cds/protein; ignored for regions which always return genomic). This tool returns one sequence: for gene-level cdna/cds/protein requests that resolve to multiple sequences, specify a transcript/protein stable ID instead; max_bytes (payload guard default 400000 — larger sequences have `seq` omitted; length/sha256/metadata always returned; re-call with larger max_bytes for full text). Returns &#123;found, query, seq_type, id, description, molecule, length, sha256, seq&#125; — length in the unit implied by molecule (bases for dna, residues for protein); seq replaced by seq_omitted when capped; found:false with null fields only when Ensembl explicitly reports the requested stable ID as not found; multiple-sequence requests, incompatible sequence types, and other upstream failures raise errors.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `stable_id` | string | optional |
| `region` | string | optional |
| `species` | string | optional; default: &quot;homo_sapiens&quot; |
| `seq_type` | string | optional; default: &quot;genomic&quot;; enum: [&quot;genomic&quot;, &quot;cdna&quot;, &quot;cds&quot;, &quot;protein&quot;] |
| `max_bytes` | integer | optional; default: 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region`

List Ensembl features overlapping a genomic region — genes, transcripts, regulatory features (enhancers/promoters), repeats, variants, karyotype bands. Args: region (1-based inclusive chrom:start-end GRCh38, e.g. 7:140719327-140925199; upstream rejects spans &gt;5Mb — split larger); feature (gene default/transcript/exon/cds/regulatory/motif/repeat/variation/structural_variation/band/simple/misc); species (default homo_sapiens); max_features (row cap default 500; n_total carries the complete overlap count, features_truncated flags the cap). Returns &#123;region, species, feature, n_total, features_truncated, features&#125; sorted by (start,id). Row shape varies — genes &#123;id, external_name, biotype, description, start, end, strand, canonical_transcript, ...&#125;; regulatory &#123;id, description, start, end, extended_start/end, ...&#125;. Empty regions return n_total:0.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `region` | string | **required** |
| `feature` | string | optional; default: &quot;gene&quot;; enum: [&quot;gene&quot;, &quot;transcript&quot;, &quot;exon&quot;, &quot;cds&quot;, &quot;regulatory&quot;, &quot;motif&quot;, &quot;repeat&quot;, &quot;variation&quot;, &quot;structural_variation&quot;, &quot;band&quot;, &quot;simple&quot;, &quot;misc&quot;] |
| `species` | string | optional; default: &quot;homo_sapiens&quot; |
| `max_features` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon`

Resolve a species or taxon name to NCBI Taxonomy identifiers. Accepts a scientific/common name or numeric TaxID; returns every upstream match so ambiguous names are not silently assigned to the first result.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required**; minLength: 1; maxLength: 200 |
| `max_matches` | integer | optional; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info`

Return the exact NCBI genome assembly identity for a versioned GCF/GCA accession, including taxon, assembly name, UCSC synonym, status, and paired RefSeq/GenBank accession. Versionless accessions are rejected to prevent reproducibility and species-compatibility errors.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `assembly_accession` | string | **required**; pattern: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases`

List sequence names and exact UCSC/RefSeq/GenBank aliases for one versioned NCBI assembly. Optionally resolve one sequence name; ambiguous shared chromosome labels are retained as multiple matches instead of choosing an alt or unlocalized scaffold. Results are a bounded prefix controlled by max_sequences (default 200); use a larger cap when the full assembly report is needed.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `assembly_accession` | string | **required**; pattern: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |
| `sequence` | string | optional; minLength: 1; maxLength: 200 |
| `max_sequences` | integer | optional; default: 200; minimum: 1; maximum: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks`

List data tracks available in a UCSC Genome Browser assembly (leaf tracks only — the queryable ones), optionally filtered. Args: genome (hg38 default/hg19/mm39/danRer11/... ~220 assemblies); filter_text (case-insensitive substring over name/short/long label, e.g. phyloP, TFBS, ClinVar; omit to list everything — hg38 has ~24k leaf tracks, you almost always want a filter); max_tracks (row cap default 200; n_total carries the full match count, tracks_truncated flags the cap). Returns &#123;genome, filter_text, n_total, tracks_truncated, tracks&#125; sorted by track name; each row &#123;track, short_label, long_label, type, group, parent&#125;. Use `track` with ucsc_track_data. Quirk: first call per genome downloads the full ~17MB listing and caches it for the process.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `genome` | string | optional; default: &quot;hg38&quot; |
| `filter_text` | string | optional |
| `max_tracks` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data`

Fetch raw rows of any UCSC Genome Browser track in a region — the generic escape hatch behind ucsc_conservation / ucsc_tfbs_clusters (gene tracks, ClinVar, GWAS catalog, CpG islands, repeats, ...). Args: track (name from ucsc_list_tracks, e.g. knownGene, cpgIslandExt, clinvarMain); chrom (chr-prefixed, chr7/chrX — UCSC requires the prefix); start (0-based half-open; an Ensembl 1-based start is start-1 here); end (exclusive); genome (default hg38); max_rows (API maxItemsOutput, default 1000; truncated reflects the API&#x27;s own maxItemsLimit flag). Returns &#123;genome, track, chrom, start, end, track_type, items_returned, truncated, rows&#125; — rows in upstream shape (BED-like &#123;chrom, chromStart, chromEnd, name, score, ...&#125;; wiggle &#123;start, end, value&#125;). Unknown tracks raise. Quirk: for some huge tracks the API caps output itself and points at dataDownloadUrl — echoed when present. Coordinates must be non-negative safe integers, with `end > start`. Invalid values are rejected, not rounded or clamped to another locus.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `track` | string | **required** |
| `chrom` | string | **required** |
| `start` | integer | **required**; minimum: 0; maximum: 9007199254740991 |
| `end` | integer | **required**; minimum: 0; maximum: 9007199254740991 |
| `genome` | string | optional; default: &quot;hg38&quot; |
| `max_rows` | integer | optional; default: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation`

Evolutionary conservation summary for a region from UCSC phyloP / phastCons tracks (base-wise scores over multi-species alignments). Args: chrom (chr-prefixed); start (0-based half-open); end (exclusive; span capped at 100000 bp — split larger); genome (default hg38); track (optional; defaults: hg19 phyloP100wayAll, hg38 phyloP100way, mm10 phyloP60wayAll, mm39 phyloP35way; other genomes retain the phyloP100way fallback, which may not exist — specify a score track from ucsc_list_tracks when needed; positive=conserved, negative=fast-evolving; alternatives hg38 phastCons100way, phyloP30way, phastCons30way, phyloP447way, phyloP470way; hg19 phastCons100way); include_values (also return per-base &#123;start,end,value&#125; rows capped at max_values, values_truncated flags the cap; default false = summary only); max_values (per-base cap default 2000). Returns &#123;genome, track, chrom, start, end, span_bp, n_bases_covered, coverage_fraction, mean, min, max&#125; (+values, values_truncated when requested). Stats weighted by each row's base span, clipped to window; uncovered bases lower coverage_fraction, not zero-scored. Non-score tracks raise; an upstream-truncated row list also raises.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `chrom` | string | **required** |
| `start` | integer | **required**; minimum: 0; maximum: 9007199254740991 |
| `end` | integer | **required**; minimum: 0; maximum: 9007199254740991 |
| `genome` | string | optional; default: &quot;hg38&quot; |
| `track` | string | optional |
| `include_values` | boolean | optional; default: false |
| `max_values` | integer | optional; default: 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters`

ENCODE transcription-factor binding site clusters overlapping a region (ChIP-seq peak clusters across hundreds of cell types) — which TFs bind where. Args: chrom (chr-prefixed); start (0-based half-open); end (exclusive); genome (hg38 default track encRegTfbsClustered ENCODE 3, or hg19 wgEncodeRegTfbsClusteredV3; other assemblies raise); max_rows (API maxItemsOutput default 1000; truncated reflects maxItemsLimit). Returns &#123;genome, track, chrom, start, end, items_returned, truncated, n_factors, factors, clusters&#125; — clusters sorted by (chromStart,name) &#123;name (TF symbol e.g. CTCF), chrom, chromStart, chromEnd, score (0-1000), sourceCount (supporting experiments)&#125;; factors is the distinct TF list. Score&gt;=~600 and high sourceCount ~ robust binding. Coordinates must be non-negative safe integers, with `end > start`. Invalid values are rejected, not rounded or clamped to another locus.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `chrom` | string | **required** |
| `start` | integer | **required**; minimum: 0; maximum: 9007199254740991 |
| `end` | integer | **required**; minimum: 0; maximum: 9007199254740991 |
| `genome` | string | optional; default: &quot;hg38&quot; |
| `max_rows` | integer | optional; default: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes`

Chromosome/contig names and sizes of a UCSC assembly — for validating coordinates and iterating regions. Args: genome (default hg38); filter_text (case-insensitive substring on the name, e.g. chr1; omit for all — hg38 has 711 sequences, mostly alt/random/unplaced; primary chromosomes sort first); max_chroms (row cap default 100; n_total carries the full post-filter count, chroms_truncated flags the cap). Returns &#123;genome, filter_text, chrom_count (assembly-wide from the API), n_total, chroms_truncated, chromosomes:[&#123;name, size_bp&#125;]&#125; sorted by size descending.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `genome` | string | optional; default: &quot;hg38&quot; |
| `filter_text` | string | optional |
| `max_chroms` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

### `clustalo_submit`

Submit three or more protein, DNA or RNA sequences to EMBL-EBI Job Dispatcher Clustal Omega for asynchronous multiple sequence alignment. Input must be uniquely named FASTA records; the service accepts at most 4000 sequences or 4 MiB. Returns a job_id; keep it and call clustalo_status before clustalo_results. The connector requests clustal_num by default, a Clustal alignment with position numbers, suitable for inspecting conserved sites and downstream evolutionary analysis. EMBL-EBI requests a valid contact email. Set a contact email in Settings → Privacy → Share contact email with research data services. A lost submit response may represent an accepted remote job; do not resubmit automatically. EMBL-EBI stores results for a limited provider-controlled period (documented as up to one week); this is not an app-owned deletion guarantee. Keep the job_id to resume after restart. This connector adds no job registry, result cache or automatic resubmission, and cancellation/app exit only stop local requests. The sequence is sent to EMBL-EBI, and the host may retain tool inputs and returned alignment content in conversation or Notebook persistence. Respect EMBL-EBI fair-use guidance: submit no more than 30 jobs in a batch and wait for processing/results before submitting more; this connector does not enforce cross-call throttling. See https://www.ebi.ac.uk/jdispatcher/docs/webservices/ for the official API contract.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `sequence` | string | **required**; minLength: 1; maxLength: 4194304 |
| `stype` | string | **required**; enum: [&quot;protein&quot;, &quot;dna&quot;, &quot;rna&quot;] |
| `outfmt` | string | optional; enum: [&quot;clustal_num&quot;] |
| `title` | string | optional; minLength: 1; maxLength: 200 |
| `dealign` | boolean | optional |
| `order` | string | optional; enum: [&quot;aligned&quot;, &quot;input&quot;] |

```javascript
const result = await host.mcp("genomes", "clustalo_submit", {"sequence": ">human\nMKT\n>mouse\nMRT\n>rat\nMRT\n", "stype": "protein"})
```

### `clustalo_status`

Check one EMBL-EBI Clustal Omega job once. This is a single status request and never polls or waits; call it again after at least 10 seconds until FINISHED, ERROR, FAILURE or NOT_FOUND. Keep the job_id when resuming after a restart.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; minLength: 1; maxLength: 128 |

```javascript
const result = await host.mcp("genomes", "clustalo_status", {"job_id":"clustalo-I20240923-000000-0000-0000000-p1m"})
```

### `clustalo_results`

Fetch one bounded Clustal Omega clustal_num alignment file for a FINISHED job. Pass the same outfmt returned by clustalo_submit; this tool makes one result request and returns the alignment content plus a filename suggestion. If the provider still reports QUEUED or RUNNING, it returns ready:false with a retry hint; provider failures are errors and retain the job_id for diagnosis. Results are capped at 8 MiB and are returned verbatim so the caller can save the content as an alignment file for conserved-site inspection or downstream phylogenetic analysis. No automatic retries. EMBL-EBI stores results for a limited provider-controlled period (documented as up to one week); this is not an app-owned deletion guarantee. Keep the job_id to resume after restart. This connector adds no job registry, result cache or automatic resubmission, and cancellation/app exit only stop local requests. The sequence is sent to EMBL-EBI, and the host may retain tool inputs and returned alignment content in conversation or Notebook persistence. Respect EMBL-EBI fair-use guidance: submit no more than 30 jobs in a batch and wait for processing/results before submitting more; this connector does not enforce cross-call throttling.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; minLength: 1; maxLength: 128 |
| `outfmt` | string | **required**; enum: [&quot;clustal_num&quot;] |

```javascript
const result = await host.mcp("genomes", "clustalo_results", {"job_id":"clustalo-I20240923-000000-0000-0000000-p1m", "outfmt":"clustal_num"})
```

</ToolOperationGroup>

## Variants {/* #family-6 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

**gnomAD coordinate rules:** record the dataset pin with the reference assembly. Short-variant gene/region queries use GRCh37 for r2.1/ExAC and GRCh38 for r3/r4; structural-variant gene queries use `gnomad_sv_r2_1` (GRCh37) or `gnomad_sv_r4` (GRCh38); changing the pin does not convert input coordinates. `gene_constraint` and the gnomAD ClinVar mirror use a fixed GRCh38 gene lookup and do not accept a dataset argument. Mitochondrial queries also use a fixed GRCh38 parent lookup; supply either a gene or both ordered region bounds, never both modes. Region bounds must be integers from 1 to 999,999,999. The one-million-base difference limit applies to `region_variants`; it is not a separate mitochondrial limit. Keep release-specific structural-variant IDs with their original SV dataset.

### `get_variant`

Look up one gnomAD short variant by ID and return overall exome/genome frequencies. `variant_id` is `chrom-pos-ref-alt` on the dataset's reference build (GRCh38 for r3/r4, GRCh37 for r2.1/ExAC), e.g. `19-44908822-C-T` (APOE rs7412); use `search_variants` to resolve an rsID first. Set `include_populations: true` when ancestry-specific counts/frequencies are needed for an individual variant. Retain the dataset, allele counts and quality filters when interpreting frequencies; rarity alone does not establish pathogenicity or an ACMG criterion.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `variant_id` | string | **required** |
| `dataset` | string | optional; default: &quot;gnomad_r4&quot;; enum: [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |
| `include_populations` | boolean | optional; default: false |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants`

Search gnomAD for variant IDs matching a query string (an rsID like `rs7412`, a variant ID, or a prefix). Use this to resolve rsIDs to `chrom-pos-ref-alt` IDs for `get_variant`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `dataset` | string | optional; default: &quot;gnomad_r4&quot;; enum: [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants`

List ALL gnomAD short variants in a gene. Gene bounds and variant coordinates use the dataset reference build (GRCh37 for r2.1/ExAC, GRCh38 for r3/r4). The complete listing can contain thousands of rows for large genes. Pass exactly one of `gene_symbol` (HGNC symbol, e.g. `APOE`) or `gene_id` (Ensembl gene ID, e.g. `ENSG00000130203`).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | optional |
| `gene_id` | string | optional |
| `dataset` | string | optional; default: &quot;gnomad_r4&quot;; enum: [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint`

gnomAD gene constraint metrics: pLI, observed/expected LoF-missense-synonymous counts with oe ratios + 90% CI bounds, and per-class z-scores. Use to judge a gene&#x27;s intolerance to loss-of-function (pLI &gt;= 0.9 or oe_lof_upper (LOEUF) &lt; 0.6 ~ LoF-intolerant). Pass exactly one of `gene_symbol` (e.g. `TP53`) or `gene_id`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | optional |
| `gene_id` | string | optional |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants`

List ALL gnomAD short variants in a genomic region (max 1 Mb — split larger regions into consecutive windows). `chrom` accepts `1`-`22`, `X`, `Y`, an optional `chr` prefix and lowercase `x`/`y`; `start`/`stop` are 1-based inclusive and `stop - start` must be &lt;= 1,000,000. The dataset determines the reference build of the coordinates (GRCh37 for r2.1/ExAC, GRCh38 for r3/r4); input coordinates must already use that build, with no automatic liftover.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `chrom` | string | **required** |
| `start` | integer | **required**; minimum: 1; maximum: 999999999 |
| `stop` | integer | **required**; minimum: 1; maximum: 999999999 |
| `dataset` | string | optional; default: &quot;gnomad_r4&quot;; enum: [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant`

Map a variant ID between reference builds (GRCh37 &lt;-&gt; GRCh38) using gnomAD&#x27;s liftover table. `variant_id` is `chrom-pos-ref-alt` on `source_build`. The route is directional: a GRCh38 ID passed with `source_build=GRCh37` returns zero results, not an error.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `variant_id` | string | **required** |
| `source_build` | string | optional; default: &quot;GRCh37&quot;; enum: [&quot;GRCh37&quot;, &quot;GRCh38&quot;] |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants`

List ClinVar variants in a gene as mirrored by gnomAD, with clinical significance, review status and gold stars. The output pins gnomAD&#x27;s ClinVar snapshot via `clinvar_release_date`. Pass exactly one of `gene_symbol` (e.g. `BRCA1`) or `gene_id`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | optional |
| `gene_id` | string | optional |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants`

List gnomAD structural variants (deletions, duplications, insertions, inversions, CNVs...) overlapping a gene. Pass exactly one of `gene_symbol` (e.g. `TP53`) or `gene_id`. `dataset` is an SV pin — `gnomad_sv_r4` (default, GRCh38) or `gnomad_sv_r2_1` (GRCh37); SV IDs are release-specific.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | optional |
| `gene_id` | string | optional |
| `dataset` | string | optional; default: &quot;gnomad_sv_r4&quot;; enum: [&quot;gnomad_sv_r4&quot;, &quot;gnomad_sv_r2_1&quot;] |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant`

Look up one gnomAD structural variant by its release-specific SV ID (e.g. `DEL_CHR17_599B1512` in gnomad_sv_r4). IDs do NOT carry across releases — `dataset` (`gnomad_sv_r4` default, or `gnomad_sv_r2_1`) must match the release the ID came from.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `sv_id` | string | **required** |
| `dataset` | string | optional; default: &quot;gnomad_sv_r4&quot;; enum: [&quot;gnomad_sv_r4&quot;, &quot;gnomad_sv_r2_1&quot;] |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants`

List gnomAD mitochondrial variants with heteroplasmy-aware counts (`ac_het`, `ac_hom`, `max_heteroplasmy`) for a mitochondrial gene OR a chrM coordinate window. The mitochondrial callset is available only through the GRCh38 gnomAD r3/r4 dataset pins: use dataset `gnomad_r3` or `gnomad_r4`. Pass a gene (`gene_symbol` like `MT-TL1`, or `gene_id`) OR a region (`region_start` + `region_stop`), not both.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | optional |
| `gene_id` | string | optional |
| `region_start` | integer | optional; minimum: `1`; maximum: `999999999` |
| `region_stop` | integer | optional; minimum: `1`; maximum: `999999999` |
| `dataset` | string | optional; default: `"gnomad_r4"`; enum: `["gnomad_r4", "gnomad_r3"]` |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

### `clinvar_search`

Search ClinVar directly (live NCBI, not gnomAD&#x27;s snapshot) and return matching variation records with clinical significance, review status and gold stars. Requires a contact email ([Settings → Credentials → Literature access → Contact email](../tools/credentials.md)) per NCBI E-utilities usage policy. Args: query (a ClinVar Entrez query — free text like &quot;TP53 R175H&quot; or an HGVS string works, and fielded terms compose with AND/OR/NOT, e.g. BRCA1[gene], pathogenic[CLIN_SIG], &quot;Lynch syndrome&quot;[dis], single_nucleotide_variant[Type of variation]; an rsID also works but clinvar_variant_by_rsid returns fuller records), max_records (page cap 1-200, default 50). The match TOTAL is always reported; when total &gt; max_records the list is a capped prefix (ClinVar relevance/recency order) and truncated is true. NCBI E-utilities intermittently return HTTP 500 under load — retry once a few seconds later if that surfaces.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `max_records` | integer | optional; default: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records`

Fetch full ClinVar records for a batch of VCV/RCV accessions or bare variation IDs. Requires a contact email ([Settings → Credentials → Literature access → Contact email](../tools/credentials.md)) per NCBI E-utilities usage policy. Args: accessions (up to 50 identifiers, mixed forms accepted — VCV000045122 (versioned VCV000045122.3 ok; resolved locally, free), RCV000019428 (each RCV costs one extra esearch), or a bare ClinVar variation ID (45122). rsIDs are rejected — use clinvar_variant_by_rsid. An RCV (one variant-condition pair) resolves to its parent VCV variation record). Never silently drops an input.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accessions` | ['string', 'array'] | **required** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid`

All ClinVar variation records that reference a dbSNP rsID, with full classifications (an rsID can map to several VCVs — one per alternate allele, e.g. rs121913529 covers KRAS G12D/G12V/G12A). Requires a contact email ([Settings → Credentials → Literature access → Contact email](../tools/credentials.md)) per NCBI E-utilities usage policy. Args: rsid (dbSNP reference SNP ID, e.g. rs7412; case-insensitive, must match rs&lt;digits&gt;), max_records (cap 1-200, default 50). total always carries the true match count and truncated flags a capped listing; total == 0 means ClinVar has no record for the rsID.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `rsid` | string | **required** |
| `max_records` | integer | optional; default: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids`

Canonical dbSNP RefSNP records for a batch of rsIDs: GRCh38+GRCh37 placements, alleles, gene context, per-study allele frequencies, and ClinVar cross-references. Requires a contact email ([Settings → Credentials → Literature access → Contact email](../tools/credentials.md)) per NCBI E-utilities usage policy; without one the tool returns &#123;error: &#x27;contact_email_required&#x27;, message&#125;. Args: rsids (up to 20 rs&lt;digits&gt;, case-insensitive) — each costs one paced NCBI Variation Services request, so large batches take ~1 s per rsID. Returns &#123;n_requested, records, not_found (rs numbers dbSNP doesn&#x27;t know), not_processed (rsIDs skipped when the wall-clock budget ran out — re-request just those)&#125;. Each record: &#123;rsid, status, create_date, last_update_date, last_update_build_id, n_citations, citations_pmids (capped at 20; citations_truncated flags the cap), variant_type, mane_select_ids, placements, alleles&#125;. status is &#x27;live&#x27;, &#x27;merged&#x27; (record instead carries merged_into — re-query those rsIDs) or &#x27;no_data&#x27; (withdrawn/unsupported). placements give 1-based chromosome coordinates with ref/alts per assembly (GRCh38 first, is_primary true). Each alt-allele entry: &#123;allele, ref, spdi (0-based interbase), hgvs, frequencies: [&#123;study, study_version, allele_count, total_count, af&#125;] (ALFA, 1000Genomes, TOPMED, gnomAD...), clinvar: [&#123;rcv_accession, clinical_significances, review_status, last_evaluated_date, disease_names&#125;], genes: [&#123;symbol, gene_id, name, orientation, consequences (SO terms), mane_select: [&#123;transcript_hgvs, protein_spdi&#125;]&#125;]&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `rsids` | array of string | **required** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region`

List dbSNP rsIDs in a genomic window (esearch db=snp positional index — NCBI Variation Services has no region endpoint). Requires a contact email ([Settings → Credentials → Literature access → Contact email](../tools/credentials.md)) per NCBI E-utilities usage policy; without one the tool returns &#123;error: &#x27;contact_email_required&#x27;, message&#125;. Args: chrom (1-22, X, Y or MT; &#x27;chr&#x27; prefix tolerated), start (1-based inclusive), stop (inclusive; span capped at 1 Mb — split larger regions into consecutive windows; dense regions hold many thousands of rsIDs per kb, so keep windows small or raise max_rsids), assembly (which positional index — &#x27;GRCh38&#x27; default -&gt; [CPOS], or &#x27;GRCh37&#x27; -&gt; [CPOS_GRCH37]; coordinates must be on the chosen assembly), max_rsids (listing cap 1-1000, default 200). Returns &#123;chrom, start, stop, assembly, term (the exact Entrez query used), total (the API&#x27;s own count), n_returned, truncated, rsids&#125;. truncated is true when total &gt; n_returned — the list is then a prefix in Entrez default order (descending rs number), never a silent truncation. Feed rsIDs (&lt;= 20 at a time) to dbsnp_get_rsids for full records.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `chrom` | string | **required** |
| `start` | integer | **required** |
| `stop` | integer | **required** |
| `assembly` | string | optional; default: &quot;GRCh38&quot;; enum: [&quot;GRCh38&quot;, &quot;GRCh37&quot;] |
| `max_rsids` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## Clinical Trials {/* #family-7 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `search_trials`

PRIMARY search over ClinicalTrials.gov. Filter by condition, intervention, sponsor, location, status (e.g. [&quot;RECRUITING&quot;]), phase ([&quot;PHASE1&quot;..&quot;PHASE4&quot;]) and study_type. condition/intervention/sponsor/location accept Essie query syntax (boolean AND/OR/NOT, &quot;quoted phrases&quot;, grouping, automatic synonyms). Page with page_token; set count_total for the total match count. advanced_query merges a raw Essie expression into filter.advanced.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `condition` | string | optional |
| `intervention` | string | optional |
| `sponsor` | string | optional |
| `location` | string | optional |
| `status` | array of string | optional |
| `phase` | array of string | optional |
| `study_type` | string | optional; enum: [&quot;INTERVENTIONAL&quot;, &quot;OBSERVATIONAL&quot;, &quot;EXPANDED_ACCESS&quot;] |
| `advanced_query` | string | optional |
| `page_size` | integer | optional; default: 10; minimum: 1; maximum: 1000 |
| `page_token` | string | optional |
| `count_total` | boolean | optional; default: false |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details`

Get comprehensive details for one trial by NCT id (format &quot;NCT&quot; + 8 digits; a bare number is prefixed, case-insensitive). Returns full eligibility criteria, study design, primary/secondary/other endpoints, all locations, sponsor and collaborators, dates, enrollment, and a results link.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `nct_id` | string | **required** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor`

Find trials sponsored by a company or organization (partial name match, e.g. &quot;Pfizer&quot; matches &quot;Pfizer Inc&quot;). Optionally narrow by condition, phase and status. Set count_total for the total number of trials by the sponsor. Page with page_token.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `sponsor_name` | string | **required** |
| `condition` | string | optional |
| `phase` | array of string | optional |
| `status` | array of string | optional |
| `page_size` | integer | optional; default: 10; minimum: 1; maximum: 1000 |
| `page_token` | string | optional |
| `count_total` | boolean | optional; default: false |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators`

Find principal investigators and research sites by condition, institution, location or investigator_name. institution filters on the site facility and takes precedence over location; investigator_name searches OverallOfficialName and ResponsiblePartyInvestigatorFullName. Returns site contacts (names, roles, affiliations, facilities, cities) with their trial NCT ids. page_size caps how many trials are scanned.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `condition` | string | optional |
| `institution` | string | optional |
| `location` | string | optional |
| `investigator_name` | string | optional |
| `status` | array of string | optional |
| `page_size` | integer | optional; default: 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints`

Analyze primary/secondary/other outcome measures (endpoints). Provide ONLY nct_id (single-trial mode) OR condition (aggregate mode across trials); if both are given, nct_id takes precedence. Aggregate mode may be narrowed by phase and start_date_after (YYYY-MM-DD) and scans up to page_size trials. Returns the endpoint lists plus the most common measure names across the analyzed trials.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `nct_id` | string | optional |
| `condition` | string | optional |
| `phase` | array of string | optional |
| `start_date_after` | string | optional |
| `page_size` | integer | optional; default: 50; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility`

Patient-trial matching. DEFAULTS to RECRUITING trials unless status is set. Supply either min_age or max_age for one patient age ("65 Years", "6 Months"); both trial age bounds are checked. If both are supplied, the trial must admit the entire patient age interval. Missing trial age bounds are unrestricted. sex MALE/FEMALE includes all-comer trials; ALL or omitted sex applies no sex filter. eligibility_keywords searches the inclusion/exclusion criteria text (e.g. "HbA1c > 8", "BRCA mutation", "ECOG 0-1"). At least one of condition, eligibility_keywords, min_age, max_age or sex is required. Page with page_token.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `condition` | string | optional |
| `eligibility_keywords` | string | optional |
| `min_age` | string | optional |
| `max_age` | string | optional |
| `sex` | string | optional; enum: [&quot;ALL&quot;, &quot;MALE&quot;, &quot;FEMALE&quot;] |
| `status` | array of string | optional |
| `page_size` | integer | optional; default: 10; minimum: 1; maximum: 1000 |
| `page_token` | string | optional |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## Clinical Genomics {/* #family-8 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `clingen_gene_validity`

ClinGen gene-disease validity curations (how strong the evidence is that variation in a gene causes a disease: Definitive/Strong/Moderate/Limited/Disputed/Refuted/No Known Disease Relationship). Omit gene to list all 3,600+ curations.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene` | string | optional |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity`

ClinGen dosage sensitivity curations: haploinsufficiency and triplosensitivity assertions for genes (and optionally ISCA genomic/CNV regions). A gene symbol or an ISCA region id filters exactly; omit for the full table.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene` | string | optional |
| `include_regions` | boolean | optional; default: false |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability`

ClinGen clinical actionability curations: for disorders associated with a gene, whether early intervention in pre-symptomatic carriers is actionable (intervention/outcome pairs with severity, likelihood, effectiveness, nature-of-intervention component scores and the total score). Gene filter matches any member of multi-gene topics.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene` | string | optional |
| `context` | string | optional; default: &quot;both&quot;; enum: [&quot;adult&quot;, &quot;pediatric&quot;, &quot;both&quot;] |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications`

ClinGen Evidence Repository (ERepo) expert-panel variant pathogenicity classifications (VCEP interpretations under ACMG criteria). Provide EXACTLY ONE of gene (HGNC symbol), caid (ClinGen canonical allele id, e.g. CA114360), or hgvs (e.g. NM_000277.2:c.1222C&gt;T). Complete retrieval (matchLimit=none).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene` | string | optional |
| `caid` | string | optional |
| `hgvs` | string | optional |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes`

Find CIViC gene records by exact Entrez symbol (e.g. &quot;BRAF&quot;). Fully paginated, count-verified. Use the returned CIViC gene id with civic_gene_variants.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `entrez_symbol` | string | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants`

All variants of one CIViC gene (by CIViC gene id), fully paginated — complete even for genes with hundreds of variants. Sorted by variant id.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_id` | integer | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant`

One CIViC variant by its CIViC variant id (aliases, variant types, feature/gene linkage, coordinates for gene variants). Returns found=false if absent.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `variant_id` | integer | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants`

Search CIViC variants by name substring (e.g. &quot;V600&quot;), optionally scoped to a CIViC gene id. Fully paginated; sorted by variant id.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `name` | string | **required** |
| `gene_id` | integer | optional |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item`

One CIViC evidence item by id: clinical significance of a molecular profile in a disease/therapy context (evidence level A-E, type, direction, significance, rating, disease, therapies, source). Returns found=false if absent.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `evidence_id` | integer | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence`

Search CIViC evidence items by any combination of filters; fully paginated, count-verified, sorted by ascending evidence id. Enum filters take CIViC GraphQL enum values verbatim (evidence_level &quot;A&quot;..&quot;E&quot;; evidence_type PREDICTIVE|PROGNOSTIC|DIAGNOSTIC|PREDISPOSING|ONCOGENIC|FUNCTIONAL; evidence_direction SUPPORTS|DOES_NOT_SUPPORT; status ACCEPTED|SUBMITTED|REJECTED|ALL). Provide at least one filter — no filters walks the entire 10k+ corpus.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `disease_name` | string | optional |
| `therapy_name` | string | optional |
| `evidence_level` | string | optional |
| `evidence_type` | string | optional |
| `evidence_direction` | string | optional |
| `significance` | string | optional |
| `variant_origin` | string | optional |
| `evidence_rating` | integer | optional |
| `status` | string | optional |
| `molecular_profile_name` | string | optional |
| `molecular_profile_id` | integer | optional |
| `variant_id` | integer | optional |
| `disease_id` | integer | optional |
| `therapy_id` | integer | optional |
| `phenotype_id` | integer | optional |
| `source_id` | integer | optional |
| `assertion_id` | integer | optional |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion`

One CIViC assertion by id: an expert-curated summary claim (AMP/ASCO/CAP tier, ACMG/ClinGen codes, FDA companion-test flags) aggregating evidence for a molecular profile in a disease/therapy context. Returns found=false if absent.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `assertion_id` | integer | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions`

Search CIViC assertions by any combination of filters; fully paginated, count-verified, sorted by ascending assertion id. assertion_type PREDICTIVE|PROGNOSTIC|DIAGNOSTIC|PREDISPOSING|ONCOGENIC; assertion_direction SUPPORTS|DOES_NOT_SUPPORT; amp_level e.g. TIER_I_LEVEL_A; status ACCEPTED|SUBMITTED|REJECTED|ALL. No filters walks the full corpus.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `disease_name` | string | optional |
| `therapy_name` | string | optional |
| `assertion_type` | string | optional |
| `assertion_direction` | string | optional |
| `significance` | string | optional |
| `amp_level` | string | optional |
| `status` | string | optional |
| `molecular_profile_name` | string | optional |
| `molecular_profile_id` | integer | optional |
| `variant_id` | integer | optional |
| `variant_name` | string | optional |
| `disease_id` | integer | optional |
| `therapy_id` | integer | optional |
| `phenotype_id` | integer | optional |
| `evidence_id` | integer | optional |
| `summary` | string | optional |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile`

One CIViC molecular profile by id (variant combination that evidence/assertions attach to), incl. parsed name, score, and component variants. Returns found=false if absent.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mp_id` | integer | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles`

Search CIViC molecular profiles by name substring (e.g. &quot;BRAF V600E&quot;). Fully paginated; sorted by id.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `name` | string | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases`

Search CIViC disease records by name substring (e.g. &quot;melanoma&quot;). Returns DOIDs + display names; fully paginated; sorted by id.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `name` | string | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies`

Search CIViC therapy records by name substring (e.g. &quot;vemurafenib&quot;). Returns NCIt ids + names; fully paginated; sorted by id.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `name` | string | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql`

Run an arbitrary GraphQL query against the Open Targets Platform API (targets, diseases, drugs, target-disease association scores, evidence, tractability, safety, known drugs). Introspection queries work for schema discovery. Note knownDrugs was renamed to drugAndClinicalCandidates upstream.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `variables` | object | optional |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs`

Known/investigational drugs for a disease (Open Targets Platform) — wraps Disease.drugAndClinicalCandidates. efo_id is a disease ontology id (EFO/MONDO/etc., e.g. &quot;MONDO_0004992&quot;).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `efo_id` | string | **required** |
| `size` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets`

Top associated targets for a disease, ranked by Open Targets overall association score — wraps Disease.associatedTargets. efo_id is a disease ontology id (EFO/MONDO/etc.).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `efo_id` | string | **required** |
| `size` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug`

Drug details by ChEMBL id (Open Targets Platform) — name, type, maximum clinical stage, and mechanisms of action (target + action type). chembl_id e.g. &quot;CHEMBL1201583&quot;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `chembl_id` | string | **required** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## Structures &amp; Interactions {/* #family-9 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `emdb_get_entries`

Fetch structured metadata records for EMDB cryo-EM 3D map entries. Accepts accessions as &#x27;EMD-1234&#x27;, &#x27;emd-1234&#x27; or &#x27;1234&#x27;. Each record carries title, structure determination method (singleParticle / helical / tomography / subtomogramAveraging / electronCrystallography), resolution in Angstrom (null for entries with no reported resolution, e.g. raw tomograms) and the resolution method, deposition/release dates, sample and macromolecule/supramolecule names, fitted PDB model IDs (empty list when no model is fitted), primary citation (journal, year, first author, DOI, PMID), map dimensions and voxel size, and status. Obsolete entries report is_obsolete=true plus superseded_by accessions. Unknown accessions come back as &#123;&quot;emdb_id&quot;, &quot;error&quot;: &quot;not_found&quot;&#125; — never silently dropped. Metadata only; map volumes are never downloaded.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `emdb_ids` | array of string | **required** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries`

Search EMDB with a Solr-style query; complete paged retrieval of compact rows. Query examples: &#x27;title:&quot;apoferritin&quot; AND resolution:[0 TO 1.5]&#x27;, &#x27;structure_determination_method:&quot;singleParticle&quot;&#x27;, &#x27;current_status:&quot;REL&quot; AND release_date:[2024-01-01T00:00:00Z TO *]&#x27;. Args: query (Solr query string); max_rows (row cap, default 1000). Returns num_found_released (the API&#x27;s own released-entry count from the facet route — ground truth), rows_retrieved, rows_by_status (REL vs OBS — the search route returns obsolete entries too but they are NOT counted as released), released_complete (true iff every released match was retrieved; false means max_rows truncated the sweep or the counts disagree), and records: compact per-entry rows (emdb_id, title, resolution, structure_determination_method, current_status, release_date, fitted_pdbs) sorted by EMD accession.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `max_rows` | integer | optional; default: 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section`

Fetch one detailed metadata section for EMDB entries. Sections: &#x27;publications&#x27; — primary citation with complete ordered author list, auxiliary citations, external references (PMID/DOI/ISSN/CSD); &#x27;map&#x27; — file, format, data type, dimensions, voxel spacing, origin, axis order, cell, voxel statistics, contour levels, symmetry; &#x27;sample&#x27; — per-macromolecule records (type, molecular weight, copies, EC number, source organism + NCBI taxid, sequence cross-refs) and per-supramolecule records; &#x27;imaging&#x27; — microscope, voltage, electron source, detector, dose, imaging modes, defocus range, magnification, Cs, cryogen, grid/buffer/vitrification conditions (one record per microscopy session — entries can carry several). Args: emdb_ids (accession list, any of EMD-1234/emd-1234/1234); section (one of publications/map/sample/imaging). Unknown accessions are reported with &quot;error&quot;: &quot;not_found&quot;. Use emdb_get_entries first when you only need the headline record.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `emdb_ids` | array of string | **required** |
| `section` | string | **required**; enum: [&quot;publications&quot;, &quot;map&quot;, &quot;sample&quot;, &quot;imaging&quot;] |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation`

Fetch numeric validation-analysis metrics for EMDB entries. Per entry (from the EMDB /analysis route): Q-score, atom inclusion, recommended/predicted/rawmap contour levels, model/mask volumes, model-map ratio, surface metrics — where the validation pipeline has computed them. available_blocks lists every block the validation service returned; sparse payloads (tomograms, model-free or historical entries) yield explicit nulls. Entries with no validation analysis report has_validation_analysis=false — never silently dropped.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `emdb_ids` | array of string | **required** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes`

Fetch curated Complex Portal records by CPX accession. Each record: complex AC, recommended/systematic names + synonyms, species and taxid, participant list with stoichiometry (min/max copies), biological role and interactor type, evidence ECO code, GO annotations, and cross-references — the manually curated description of a stable macromolecular complex. Records come back in input order; unknown accessions are listed in `not_found` rather than silently dropped. For binary interaction *evidence* (who binds whom in which experiment) use the intact_* tools instead.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `complex_acs` | array of string | **required** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant`

Search Complex Portal for complexes containing a molecule. `accession` is a participant accession — UniProt (e.g. &#x27;P04637&#x27;), ChEBI, or RNAcentral. With participants_only=true (default) the search is field-qualified (pxref:&lt;accession&gt;) so only complexes that actually contain the molecule as a curated participant are returned; with false the bare accession is matched as free text too (descriptions, names), which over-reports but can catch mentions. All result pages are retrieved and the row count is verified against the service-reported total (total_reported == total_retrieved, or the call fails loudly). Hits are compact records (complex_ac, name, species, interactors) sorted by complex accession; fetch full detail with complexportal_get_complexes.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |
| `participants_only` | boolean | optional; default: true |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions`

Retrieve ALL IntAct binary interactions matching a query, MI-score filtered. `query` is a UniProt accession (e.g. &#x27;P04637&#x27;), gene symbol, free text, or any IntAct Solr query. Retrieval is a complete paginated sweep verified against the server-reported total (n_records == total_elements, or the call FAILS LOUDLY — silent truncation is impossible). min_mi_score/max_mi_score filter server-side on the IntAct MI confidence score (0.45 is a common medium-confidence floor); interactor_species filters by species name or taxid (e.g. [&quot;Homo sapiens&quot;] or [&quot;9606&quot;]). Records are slim and structured: interactor pair (IntAct ACs, database identifiers, molecule names, species/taxids), interaction type, detection method (+MI id), experimental roles, host organism, MI score, PubMed id, first author, source database — sorted by DESCENDING MI score. Output lists at most max_records_returned records (records_truncated=true when the full verified sweep was larger; n_records always reports the true total). Large queries (e.g. CFTR ~10k interactions) take a while — narrow with min_mi_score or species when possible.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `min_mi_score` | number | optional; default: 0 |
| `max_mi_score` | number | optional; default: 1 |
| `interactor_species` | array of string | optional |
| `max_records_returned` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor`

Resolve a molecule to its IntAct interactor record(s). `query` is a UniProt accession, gene symbol, or IntAct interactor AC (e.g. &#x27;EBI-7090529&#x27;). Returns ALL matching interactor records with an explicit n_matches — a UniProt accession can resolve to the canonical protein plus chain/isoform interactors, and this tool never silently picks one. Each record: interactor_ac, preferred_identifier, name, species, taxid, interactor_type, and the interaction_count seen by IntAct (useful for sizing an intact_fetch_interactions sweep).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details`

Full curated detail for ONE IntAct interaction AC (e.g. &#x27;EBI-15635490&#x27;). Returns interaction type, host organism, detection method, publication, cross-references, annotations, kinetic/affinity parameters and confidences, plus per-participant records (identifier, species, biological and experimental role, participant detection methods) unless include_participants=false. Get interaction ACs from intact_fetch_interactions records (the interaction_ac field). Unknown ACs return &#123; interaction_ac, error: &#x27;not_found&#x27; &#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `interaction_ac` | string | **required** |
| `include_participants` | boolean | optional; default: true |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network`

Build a depth-1 IntAct interaction network around seed proteins. `seed_accessions` are UniProt accessions. Step 1: a complete, count-verified MI-score-filtered interaction sweep per seed. Step 2: the partners of every seed edge plus the seeds form the node set. Step 3: partner-partner edges are only discoverable by querying the partners themselves, so up to max_interactors_expanded partners are queried (most-connected first, ties by identifier) and edges with BOTH endpoints inside the node set are kept. The expansion block reports exactly which partners were / were not expanded (expansion.complete=false means more partner-partner edges may exist). Output: nodes, edges (with MI score, detection method, PubMed id), per-seed sweep stats. Keep seeds few and min_mi_score &gt;= 0.45 — every expansion is a full paginated sweep.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `seed_accessions` | array of string | **required** |
| `min_mi_score` | number | optional; default: 0.45 |
| `max_interactors_expanded` | integer | optional; default: 25 |
| `interactor_species` | array of string | optional |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures`

Search RCSB PDB entries by attribute filters; paged, capped + flagged. All filters AND together; at least one is required. `text` is a full-text relevance query (&#x27;p53 DNA binding domain&#x27;); `organism` is an exact source-organism lineage name (&#x27;Homo sapiens&#x27; — matches at any lineage level, so &#x27;Eukaryota&#x27; works too); `taxonomy_id` an NCBI taxid (9606); `uniprot_accession` finds entries whose polymer entities map to that UniProt (&#x27;P04637&#x27; -&gt; every p53 structure); `experimental_method` is the PDB vocabulary (&#x27;X-RAY DIFFRACTION&#x27;, &#x27;ELECTRON MICROSCOPY&#x27;, &#x27;SOLUTION NMR&#x27;, ... — case-insensitive, unknown values error with the full list); `max_resolution_angstrom` keeps entries at or below that resolution; `ligand_comp_id` requires a bound nonpolymer component by chem-comp id (&#x27;ZN&#x27;, &#x27;ATP&#x27;, &#x27;HEM&#x27;). include_computed_models=true adds computed structure models (e.g. AlphaFold) to the default experimental-only results. Returns total_count (the API&#x27;s own match total — ground truth), n_retrieved, truncated (true iff total_count &gt; n_retrieved; max_rows, 1..1000, caps retrieval), and records [&#123;pdb_id, score&#125;] in relevance order. Identifiers only — chain to pdb_get_structures for metadata.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `text` | string | optional |
| `organism` | string | optional |
| `taxonomy_id` | integer | optional |
| `uniprot_accession` | string | optional |
| `experimental_method` | string | optional |
| `max_resolution_angstrom` | number | optional |
| `ligand_comp_id` | string | optional |
| `include_computed_models` | boolean | optional; default: false |
| `max_rows` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures`

Fetch entry-level summaries for PDB entries (batch, max 25 ids). Accepts 4-character PDB ids in any case (&#x27;1tup&#x27; == &#x27;1TUP&#x27;; duplicates are de-duplicated). Each record: title, experimental methods, resolution in Angstrom (null for methods without one, e.g. NMR), determination methodology (experimental vs computational), deposit/release/revision dates and status, molecular weight (kDa), assembly and entity counts (protein/DNA/RNA polymer + nonpolymer), bound ligand chem-comp ids, polymer/nonpolymer entity id lists (inputs for pdb_get_entities / pdb_get_ligands), and the primary citation (title, journal, year, authors, PubMed id, DOI). Unknown ids come back as &#123;&quot;pdb_id&quot;, &quot;error&quot;: &quot;not_found&quot;&#125; — never silently dropped. Metadata only; coordinate files are never downloaded.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pdb_ids` | array of string | **required** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities`

Polymer entity details for one PDB entry, incl. UniProt mappings. With entity_ids=null every polymer entity of the entry is fetched, capped at 25 with truncated=true and n_polymer_entities reporting the entry&#x27;s true count (large assemblies like ribosomes carry 50+ — get the full id list from pdb_get_structures&#x27; polymer_entity_ids and page with explicit subsets like [&quot;26&quot;, &quot;27&quot;]); with an explicit entity_ids subset the entry total is not fetched, so n_polymer_entities is null; an explicit entity_ids list larger than 25 errors. Each record: description, polymer type (Protein / DNA / RNA), sequence length, mutation count, deposited copies, chain ids (asym + author), source organisms with taxids, UniProt accessions with per-entity sequence coverage (SIFTS), and UniProt-aligned regions (entity-seq vs reference-seq coordinates). Unknown entity ids are listed in not_found; an unknown entry id errors. include_sequences=true adds the canonical one-letter sequence per entity; if the combined sequences exceed max_bytes (default 400000) they are omitted and sequences_omitted explains why — metadata always survives.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pdb_id` | string | **required** |
| `entity_ids` | array of string | optional |
| `include_sequences` | boolean | optional; default: false |
| `max_bytes` | integer | optional; default: 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands`

Bound ligands (nonpolymer components) of one PDB entry, with chemistry. Walks the entry&#x27;s nonpolymer entities and resolves each chemical component: per ligand — entity id, chem-comp id (&#x27;ZN&#x27;, &#x27;ATP&#x27;), description, deposited copy count, author chain ids, and a chem_comp block (name, formula, formula weight, formal charge, component type, InChIKey, stereo SMILES). Waters are not nonpolymer entities in the PDB data model and never appear. Entries with no ligands return ligands: []. n_nonpolymer_entities is the entry&#x27;s true count; truncated=true when it exceeds max_ligands (clamped to 1..25, which bounds the request budget) — never silently dropped. Entities/components the data API no longer serves are reported inline with &quot;error&quot;: &quot;not_found&quot; (partial results, not an aborted call). An unknown entry id errors.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pdb_id` | string | **required** |
| `max_ligands` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction`

AlphaFold DB predicted-structure metadata for one UniProt accession. Returns has_model, n_models and per-model records. A single accession can carry several models (canonical + isoforms like &#x27;P04637-9&#x27;, and community providers beyond the Google DeepMind monomer pipeline — provider_id / tool_used identify them). Each model: entry id, UniProt annotation (id, description, gene, organism, taxid, reviewed flags), sequence coordinates and length, global pLDDT (global_plddt, 0-100) plus the fraction of residues per pLDDT confidence bin (very_low &lt;50, low 50-70, confident 70-90, very_high &gt;90), model version info and creation date, and download URLs (cif/bcif/pdb coordinates, PAE JSON + image, per-residue pLDDT JSON, MSA, AlphaMissense CSV where available) — URLs only, payloads are never downloaded; fetch them yourself if needed. Accessions without a prediction return has_model=false (not an error); malformed identifiers return an explicit `error` field. include_sequence=true adds the model sequence (protein one-letter).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `uniprot_accession` | string | **required** |
| `include_sequence` | boolean | optional; default: false |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage`

Batch AlphaFold DB coverage check (max 40 unique UniProt accessions). Blank entries and duplicates are stripped before the batch cap applies, and disclosed: n_requested == n_unique + n_blank_skipped + n_duplicate_skipped always reconciles. One compact record per unique accession, in input order: has_model, n_models, and the primary (first-listed) model&#x27;s model_entity_id, latest_version, global_plddt and sequence_length. Accessions with no prediction report has_model=false; malformed ones carry an explicit `error` field — never silently dropped. Use to triage which proteins of a set have usable predicted structures before pulling full records with alphafold_get_prediction.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `uniprot_accessions` | array of string | **required** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## ChEMBL {/* #family-10 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `compound_search`

Search ChEMBL chemical compounds by name (default), ChEMBL id, or molecular structure. By name: case-insensitive synonym substring match (falls back to a preferred-name match). By chembl_id: direct record lookup. By smiles: Tanimoto similarity search when similarity_threshold is set, else a substructure search (structure walks are capped and disclose walk_truncated/upstream_total). Optional max_phase filters by clinical stage. Pass at least one of name, chembl_id, or smiles. Use drug_search instead when searching by therapeutic indication.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `name` | string | optional |
| `chembl_id` | string | optional |
| `smiles` | string | optional |
| `similarity_threshold` | integer | optional; minimum: 70; maximum: 100 |
| `max_phase` | integer | optional; enum: [0, 1, 2, 3, 4] |
| `limit` | integer | optional; default: 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search`

Search approved drugs and clinical candidates by therapeutic indication (EFO term, partial match). Joins drug_indication rows to distinct parent molecules, then to molecule records and withdrawal/black-box warnings. only_approved restricts to phase 4. Optional post-filters molecule_chembl_id, drug_name (preferred-name substring), and max_phase (&gt;=) narrow the joined set. Use compound_search for name/id/structure lookups.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `indication` | string | **required** |
| `drug_name` | string | optional |
| `molecule_chembl_id` | string | optional |
| `max_phase` | integer | optional; enum: [0, 1, 2, 3, 4] |
| `only_approved` | boolean | optional; default: false |
| `limit` | integer | optional; default: 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet`

Retrieve ChEMBL calculated molecular properties for drug-likeness / ADMET assessment of one molecule (ALogP, molecular weight, PSA, HBA/HBD, rotatable bonds, aromatic rings, heavy atoms, Rule-of-5 violations, Rule-of-3 pass, QED, molecular formula). These are computed from structure, not experimental measurements.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `molecule_chembl_id` | string | **required** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity`

Retrieve ChEMBL bioactivity measurements (IC50, Ki, Kd, EC50, ...) for compound-target interactions. Filter by molecule_chembl_id and/or target_chembl_id, activity_type (standard_type), a pChEMBL floor (min_pchembl), a standard_value range (min_value/max_value), and unit (standard_units). Returns one page ordered by activity_id with a most-potent summary.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `molecule_chembl_id` | string | optional |
| `target_chembl_id` | string | optional |
| `activity_type` | string | optional; enum: [&quot;IC50&quot;, &quot;EC50&quot;, &quot;Ki&quot;, &quot;Kd&quot;, &quot;AC50&quot;, &quot;GI50&quot;, &quot;ED50&quot;, &quot;Potency&quot;] |
| `min_pchembl` | number | optional; minimum: 0; maximum: 14 |
| `min_value` | number | optional |
| `max_value` | number | optional |
| `unit` | string | optional; enum: [&quot;nM&quot;, &quot;uM&quot;, &quot;mM&quot;, &quot;pM&quot;, &quot;M&quot;] |
| `limit` | integer | optional; default: 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism`

Retrieve ChEMBL mechanism-of-action records for approved drugs and clinical candidates. Filter by molecule_chembl_id, target_chembl_id, and/or action_type. When a molecule id yields nothing, retries against the parent molecule so salt-form ids resolve. Returns one page ordered by mec_id with an action-type summary.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `molecule_chembl_id` | string | optional |
| `target_chembl_id` | string | optional |
| `action_type` | string | optional; enum: [&quot;INHIBITOR&quot;, &quot;AGONIST&quot;, &quot;ANTAGONIST&quot;, &quot;BLOCKER&quot;, &quot;MODULATOR&quot;, &quot;OPENER&quot;, &quot;ACTIVATOR&quot;, &quot;POSITIVE ALLOSTERIC MODULATOR&quot;, &quot;NEGATIVE ALLOSTERIC MODULATOR&quot;, &quot;PARTIAL AGONIST&quot;, &quot;INVERSE AGONIST&quot;] |
| `limit` | integer | optional; default: 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search`

Search ChEMBL biological targets (proteins, complexes, families, organisms). Filter by target_chembl_id, gene_symbol (exact component-synonym match), target_name (preferred-name substring), organism (substring), and/or target_type. Each result carries its components with UniProt accessions, a gene_symbol, and bounded cross-reference lists.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `target_name` | string | optional |
| `gene_symbol` | string | optional |
| `target_chembl_id` | string | optional |
| `organism` | string | optional |
| `target_type` | string | optional; enum: [&quot;SINGLE PROTEIN&quot;, &quot;PROTEIN COMPLEX&quot;, &quot;PROTEIN FAMILY&quot;, &quot;ORGANISM&quot;, &quot;TISSUE&quot;, &quot;CELL-LINE&quot;, &quot;NUCLEIC-ACID&quot;, &quot;SUBCELLULAR&quot;] |
| `limit` | integer | optional; default: 20; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## bioRxiv {/* #family-11 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `get_categories`

List all 27 bioRxiv subject categories and their API-compatible slugs (e.g. &quot;cancer biology&quot; -&gt; &quot;cancer_biology&quot;). Use before search_preprints to discover valid category values.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints`

Search bioRxiv/medRxiv preprints by date and (optionally) category. Use exactly ONE search method: date_from+date_to, recent_days (last N days), or recent_count (N most recent within a 90-day window); with none, the last 60 days. There is NO keyword/text search. cursor paginates. Returns DOI, title, authors, date, category, version, and a 200-char abstract preview.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `server` | string | optional; default: &quot;biorxiv&quot;; enum: [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |
| `category` | string | optional; enum: [&quot;animal behavior and cognition&quot;, &quot;biochemistry&quot;, &quot;bioengineering&quot;, &quot;bioinformatics&quot;, &quot;biophysics&quot;, &quot;cancer biology&quot;, &quot;cell biology&quot;, &quot;clinical trials&quot;, &quot;developmental biology&quot;, &quot;ecology&quot;, &quot;epidemiology&quot;, &quot;evolutionary biology&quot;, &quot;genetics&quot;, &quot;genomics&quot;, &quot;immunology&quot;, &quot;microbiology&quot;, &quot;molecular biology&quot;, &quot;neuroscience&quot;, &quot;paleontology&quot;, &quot;pathology&quot;, &quot;pharmacology and toxicology&quot;, &quot;physiology&quot;, &quot;plant biology&quot;, &quot;scientific communication and education&quot;, &quot;synthetic biology&quot;, &quot;systems biology&quot;, &quot;zoology&quot;] |
| `date_from` | string | optional |
| `date_to` | string | optional |
| `recent_days` | integer | optional; minimum: 1 |
| `recent_count` | integer | optional; minimum: 1 |
| `limit` | integer | optional; default: 10; minimum: 1; maximum: 100 |
| `cursor` | integer | optional; default: 0; minimum: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint`

Get complete metadata for one preprint by DOI (bare &quot;10.1101/...&quot; or a full https://doi.org/ URL). Uses the latest version. Returns title, authors, corresponding author + institution, full abstract, category, license, version, JATS XML, funding, published journal DOI (if linked), PDF and web URLs, and version count. Preprints are NOT peer-reviewed.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `doi` | string | **required** |
| `server` | string | optional; default: &quot;biorxiv&quot;; enum: [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints`

Find preprints that were later published in peer-reviewed journals (preprint -&gt; journal-article links). Same ONE-OF search methods as search_preprints (date_from+date_to / recent_days / recent_count). include_details=false returns a compact summary. publisher filters by journal DOI prefix (e.g. &quot;10.1038&quot; for Nature) via the bioRxiv-only /publisher route.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `server` | string | optional; default: &quot;biorxiv&quot;; enum: [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |
| `publisher` | string | optional |
| `include_details` | boolean | optional; default: true |
| `date_from` | string | optional |
| `date_to` | string | optional |
| `recent_days` | integer | optional; minimum: 1 |
| `recent_count` | integer | optional; minimum: 1 |
| `limit` | integer | optional; default: 10; minimum: 1; maximum: 100 |
| `cursor` | integer | optional; default: 0; minimum: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder`

Find preprints acknowledging a funder, identified by ROR id (9-char, e.g. &quot;021nxhr62&quot; for NIH; a full https://ror.org/ URL is also accepted). Requires an explicit date_from + date_to; funder metadata begins 2025-04-10. Optional category filter. cursor paginates. Same compact result shape as search_preprints.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `funder_ror_id` | string | **required** |
| `date_from` | string | **required** |
| `date_to` | string | **required** |
| `server` | string | optional; default: &quot;biorxiv&quot;; enum: [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |
| `category` | string | optional; enum: [&quot;animal behavior and cognition&quot;, &quot;biochemistry&quot;, &quot;bioengineering&quot;, &quot;bioinformatics&quot;, &quot;biophysics&quot;, &quot;cancer biology&quot;, &quot;cell biology&quot;, &quot;clinical trials&quot;, &quot;developmental biology&quot;, &quot;ecology&quot;, &quot;epidemiology&quot;, &quot;evolutionary biology&quot;, &quot;genetics&quot;, &quot;genomics&quot;, &quot;immunology&quot;, &quot;microbiology&quot;, &quot;molecular biology&quot;, &quot;neuroscience&quot;, &quot;paleontology&quot;, &quot;pathology&quot;, &quot;pharmacology and toxicology&quot;, &quot;physiology&quot;, &quot;plant biology&quot;, &quot;scientific communication and education&quot;, &quot;synthetic biology&quot;, &quot;systems biology&quot;, &quot;zoology&quot;] |
| `limit` | integer | optional; default: 10; minimum: 1; maximum: 100 |
| `cursor` | integer | optional; default: 0; minimum: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics`

bioRxiv submission statistics over all history — new vs revised paper counts per period, with running cumulative totals. interval is &quot;monthly&quot; (default) or &quot;yearly&quot;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `interval` | string | optional; default: &quot;monthly&quot;; enum: [&quot;monthly&quot;, &quot;yearly&quot;] |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics`

bioRxiv usage/engagement statistics over all history — abstract views, full-text views, and PDF downloads per period, with running cumulative totals. interval is &quot;monthly&quot; (default) or &quot;yearly&quot;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `interval` | string | optional; default: &quot;monthly&quot;; enum: [&quot;monthly&quot;, &quot;yearly&quot;] |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## Drug Regulatory {/* #family-12 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `search_drug_applications`

Search Drugs@FDA applications (NDA/ANDA/BLA) by any combination of exact-phrase filters (brand, generic, active_ingredient, sponsor, marketing_status, dosage_form, route, pharm_class). generic and pharm_class query the harmonized openfda block (absent on older applications, so silently skipped there). A broad search returns the first max_records with the true total and truncated=true; to page beyond ~26,000 records, narrow with submission_date_from/to.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `brand` | string | optional |
| `generic` | string | optional |
| `active_ingredient` | string | optional |
| `sponsor` | string | optional |
| `marketing_status` | string | optional; enum: [&quot;Prescription&quot;, &quot;Over-the-counter&quot;, &quot;Discontinued&quot;, &quot;None (Tentative Approval)&quot;] |
| `dosage_form` | string | optional |
| `route` | string | optional |
| `pharm_class` | string | optional |
| `pharm_class_type` | string | optional; enum: [&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;] |
| `search_type` | string | optional; default: &quot;and&quot;; enum: [&quot;and&quot;, &quot;or&quot;] |
| `submission_date_from` | string | optional |
| `submission_date_to` | string | optional |
| `raw_search` | string | optional |
| `max_records` | integer | optional; default: 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application`

Fetch one Drugs@FDA application by its number (e.g. &quot;NDA020702&quot;, &quot;ANDA076543&quot;, &quot;BLA125514&quot;). Returns the full record — sponsor, products (brand, active ingredients + strengths, dosage form, route, marketing status, TE code), complete submissions history, and harmonized openfda fields when present.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `application_number` | string | **required** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications`

Aggregate Drugs@FDA bucket counts over one field, optionally narrowed by the same filters as search_drug_applications. count_field accepts friendly names (sponsor_name, application_number, dosage_form, route, marketing_status, te_code, pharm_class_epc/moa/cs/pe) or a raw openFDA field path (append .exact yourself for analyzed fields).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `count_field` | string | **required** |
| `brand` | string | optional |
| `generic` | string | optional |
| `active_ingredient` | string | optional |
| `sponsor` | string | optional |
| `marketing_status` | string | optional |
| `dosage_form` | string | optional |
| `route` | string | optional |
| `pharm_class` | string | optional |
| `pharm_class_type` | string | optional; enum: [&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;] |
| `search_type` | string | optional; default: &quot;and&quot;; enum: [&quot;and&quot;, &quot;or&quot;] |
| `submission_date_from` | string | optional |
| `submission_date_to` | string | optional |
| `raw_search` | string | optional |
| `max_buckets` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics`

Corpus-level Drugs@FDA statistics in one call — total applications, marketing-status split, top dosage forms and routes (with distinct counts), and top sponsors by application count.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes`

Enumerate pharmacologic classes with their application counts, counted over the harmonized openfda.pharm_class_&lt;type&gt; block. Counts reflect only applications carrying that block.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `class_type` | string | optional; default: &quot;epc&quot;; enum: [&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;] |
| `max_buckets` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents`

Find generic equivalents of a brand drug: resolve the brand to its reference application(s), extract the exact active-ingredient name set(s), then return every Drugs@FDA application with a product whose active-ingredient set matches (including TE codes and marketing status).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `brand` | string | **required** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels`

Retrieve FDA drug product labels (SPL) by ingredient/name/route with targeted section extraction. Filters (active_ingredient, generic_name, brand_name, route, product_type) hit the openfda label block; set exact to query the non-analyzed .exact variants. Pass sections to extract raw openFDA label sections instead of the default structured record. raw_search is mutually exclusive with the mapped filters.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `active_ingredient` | string | optional |
| `generic_name` | string | optional |
| `brand_name` | string | optional |
| `route` | string | optional |
| `product_type` | string | optional; enum: [&quot;HUMAN PRESCRIPTION DRUG&quot;, &quot;HUMAN OTC DRUG&quot;] |
| `exact` | boolean | optional; default: false |
| `raw_search` | string | optional |
| `sections` | array of string | optional |
| `max_records` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## Human Genetics {/* #family-13 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `gwas_associations_for_variant`

GWAS Catalog associations reported for one variant (rsID), most significant first. Args: rs_id (dbSNP rsID e.g. rs7412 APOE or rs699 AGT; must be the catalog&#x27;s current rsID — merged/retired IDs may return zero rows rather than an error); max_records (output cap default 500; trait-hub variants can carry 1000+ associations; rows are server-sorted by p-value ascending, so a capped result is the top-signal prefix). Returns &#123;rs_id, api_total, returned, truncated, associations&#125;. api_total is the catalog&#x27;s own total; truncated flags a capped fetch. Each association row: &#123;association_id, p_value, pvalue_mantissa, pvalue_exponent, pvalue_description, or_value, beta, ci_lower, ci_upper, range, risk_frequency, snp_effect_alleles, rs_ids, locations, mapped_genes, efo_traits:[&#123;efo_id, efo_trait&#125;], bg_efo_traits, reported_trait, multi_snp_haplotype, snp_interaction, study_accession_id, pubmed_id, first_author&#125;. or_value and beta are mutually exclusive per row (binary vs quantitative); p_value of 0.0 means p &lt; ~1e-308 (use mantissa/exponent).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `rs_id` | string | **required** |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene`

GWAS Catalog associations whose variants are MAPPED to a gene (catalog&#x27;s Ensembl pipeline mapping, not author-reported), most significant first. Args: gene_symbol (HGNC symbol, exact match, e.g. PCSK9, APOE; case-sensitive upstream — pass canonical uppercase; intergenic variants map to flanking genes, so rows may sit outside the gene body); max_records (cap default 500; rows server-sorted by p-value ascending). Returns &#123;gene_symbol, api_total, returned, truncated, associations&#125; with the same row shape as gwas_associations_for_variant. A nonexistent symbol returns api_total=0, not an error.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | **required** |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait`

GWAS Catalog associations annotated to one EFO trait, most significant first. Args: efo_id (ontology term short form as used by the catalog, e.g. MONDO_0005010, EFO_0004340, HP_0003124; the catalog migrated many historical EFO ids to MONDO/HP — resolve current ids with gwas_search_traits first; pass exactly one of efo_id/efo_trait); efo_trait (exact trait LABEL alternative); max_records (cap default 500; rows p-value ascending). Returns &#123;efo_id|efo_trait, api_total, returned, truncated, associations&#125; with the same row shape as gwas_associations_for_variant. An unknown id/label returns api_total=0, not an error.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `efo_id` | string | optional |
| `efo_trait` | string | optional |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits`

Search GWAS Catalog EFO trait annotations by label substring — the entry point for resolving a disease/phenotype name to the ontology ids that gwas_associations_for_trait / gwas_search_studies take. Args: query (case-insensitive substring of the trait label, e.g. &quot;coronary&quot; matches coronary artery disorder MONDO_0005010 etc.; the catalog mixes EFO, MONDO, HP and OBA ids — don&#x27;t assume an EFO_ prefix); max_records (cap default 500). Returns &#123;query, api_total, returned, truncated, efo_traits&#125;; each row &#123;efo_id, efo_trait, uri&#125; sorted by label. Count-verified against the catalog&#x27;s own total when not capped.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies`

Search GWAS Catalog studies by trait annotation or publication. Args: efo_id (ontology short form, e.g. MONDO_0005010, resolve via gwas_search_traits; filters combine AND — usually pass one); efo_trait (exact trait label alternative); pubmed_id (PubMed ID of the study&#x27;s publication, e.g. 38714703); max_records (cap default 500). Returns &#123;filters, api_total, returned, truncated, studies&#125;; each study row &#123;accession_id, disease_trait, efo_traits, bg_efo_traits, pubmed_id, initial_sample_size, replication_sample_size, discovery_ancestry, replication_ancestry, genotyping_technologies, platforms, cohort, full_summary_stats_available, imputed, gxe, gxg&#125;. Count-verified against the catalog total when not capped. At least one filter is required (the unfiltered catalog is ~90k studies).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `efo_id` | string | optional |
| `efo_trait` | string | optional |
| `pubmed_id` | string | optional |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study`

Fetch one GWAS Catalog study by its GCST accession. Args: accession_id (study accession, e.g. GCST90841394; listed in every association row as study_accession_id and in study search results). Returns &#123;found, accession_id, study&#125; where study is the same row shape as gwas_search_studies (null when the accession is unknown).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession_id` | string | **required** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant`

Fetch one GWAS Catalog variant record (position, mapped genes, consequence) by rsID — lighter than pulling its associations. Args: rs_id (dbSNP rsID e.g. rs7412). Returns &#123;found, rs_id, variant&#125;; variant is &#123;rs_id, merged, functional_class, most_severe_consequence, alleles (e.g. &quot;C/T (forward)&quot;), mapped_genes, locations:[&#123;chromosome, position, region&#125;], last_update_date&#125; — positions GRCh38 — or null when the rsID is not in the catalog. merged=1 means the rsID was merged into another record upstream.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `rs_id` | string | **required** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets`

List eQTL Catalogue datasets (one dataset = one study x tissue/cell type x quantification method). Args: study_label (exact study name, e.g. GTEx, Alasoo_2018, BLUEPRINT); tissue_label (exact tissue/cell-type label, e.g. liver, macrophage, LCL — lowercase in the catalogue); quant_method (ge=gene expression, exon, tx, txrev, microarray, leafcutter, aptamer=plasma protein; for conventional gene-level eQTLs use ge); max_records (cap default 1000; the full unfiltered catalogue is ~760 datasets). Returns &#123;filters, returned, truncated, datasets&#125; sorted by dataset_id; each &#123;dataset_id (QTD...), study_id (QTS...), study_label, sample_group, tissue_id, tissue_label, condition_label, quant_method, sample_size&#125;. The API publishes no total count; truncated=false proves the listing is complete.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `study_label` | string | optional |
| `tissue_label` | string | optional |
| `quant_method` | string | optional |
| `max_records` | integer | optional; default: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations`

Molecular-QTL association rows from one eQTL Catalogue dataset, filtered by gene, variant or region. Args: dataset_id (QTD accession from eqtl_list_datasets, e.g. QTD000266); gene_id (unversioned Ensembl gene ID e.g. ENSG00000130203 APOE; at least one of gene_id/rsid/variant/pos is required); rsid (dbSNP rsID); variant (eQTL Catalogue variant string chr19_44908822_C_T, chr-prefixed underscore GRCh38); pos (genomic window chromosome:start-end GRCh38 no chr prefix, e.g. 19:44900000-44920000); nlog10p_min (significance floor: only rows with -log10(p) &gt;= this, applied upstream); max_records (cap default 1000 = one page). Returns &#123;dataset_id, filters, returned, truncated, associations&#125;; each row &#123;molecular_trait_id, gene_id, variant, rsid, chromosome, position, ref, alt, type, beta, se, pvalue, nlog10p, maf, ac, an, r2, median_tpm&#125;. Rows cover ONLY the cis window the dataset tested (±1 Mb of each gene); empty means &quot;not tested / not present&quot;. No total count is published: truncated=false proves exhaustion, truncated=true means the cap was hit.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `dataset_id` | string | **required** |
| `gene_id` | string | optional |
| `rsid` | string | optional |
| `variant` | string | optional |
| `pos` | string | optional |
| `nlog10p_min` | number | optional |
| `max_records` | integer | optional; default: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances`

List the public PheWeb PheWAS portals this server can query, with genome build and capability registry. Returns &#123;instances:&#123;key:&#123;label, base_url, genome_build, capabilities, notes&#125;&#125;&#125;. capabilities name the endpoints each instance exposes: variant (phewas_variant), gene (phewas_finngen_gene), phenotypes (phewas_list_phenotypes), autocomplete (phewas_search_phenotypes). NOTE the build split: FinnGen R12 variant IDs are GRCh38; BioBank Japan (pheweb.jp) is GRCh37/hg19 — liftover coordinates before cross-querying.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant`

PheWAS for one variant: its association statistics against every phenotype in a biobank PheWeb portal, most significant first. Args: instance (finngen FinnGen R12 GRCh38, or bbj BioBank Japan GRCh37; variant coords MUST be on the instance&#x27;s build); variant (chrom-pos-ref-alt, :/_ separators and chr prefix tolerated, e.g. 19-44908822-C-T APOE rs7412 GRCh38/finngen or 1-55505647-G-T PCSK9 rs11591147 GRCh37/bbj); max_phenos (cap default 200; FinnGen returns ~2470 rows; sorted by p-value ascending before capping). Returns &#123;instance, genome_build, variant, variant_meta, total, returned, truncated, phenotypes&#125;; variant_meta &#123;chrom, pos, ref, alt, rsids, nearest_genes, gnomad (FinnGen only)&#125;. Each phenotype row &#123;phenocode, phenostring, category, pval, mlogp, beta, sebeta, af|maf, maf_case, maf_control, n_cases, n_controls, n_samples&#125; (unpublished fields null; BBJ rows have af, FinnGen rows have maf triplets + mlogp). Unknown variants raise a not-found error.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `instance` | string | **required**; enum: [&quot;finngen&quot;, &quot;bbj&quot;] |
| `variant` | string | **required** |
| `max_phenos` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene`

Gene-level PheWAS from FinnGen R12: for every disease endpoint, the best-associated variant in the gene region, most significant first. Args: gene_symbol (HGNC symbol e.g. PCSK9, APOE; unknown symbols raise a not-found error); max_phenos (cap default 200; FinnGen has ~2470 endpoints, one row each; sorted by p-value ascending before capping). Returns &#123;instance:&quot;finngen&quot;, genome_build:&quot;GRCh38&quot;, gene_symbol, total, returned, truncated, phenotypes&#125;; each row is the phewas_variant row shape plus variant:&#123;chrom, pos, ref, alt, varid, rsids&#125; — the top variant for that endpoint in this gene&#x27;s region (region != gene body; PheWeb pads gene boundaries). Most rows are null results (pval~1) — the per-endpoint BEST variant is still reported; filter by pval yourself for significant hits.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | **required** |
| `max_phenos` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes`

Complete phenotype (disease endpoint) catalogue of a PheWeb instance, with case/control counts. Args: instance (currently only finngen exposes this endpoint; BBJ does not — use phewas_search_phenotypes there); max_records (cap default 3000 &gt; FinnGen&#x27;s ~2470 endpoints, so the default returns the complete catalogue). Returns &#123;instance, total, returned, truncated, phenotypes&#125; sorted by phenocode; each row &#123;phenocode (e.g. &quot;T2D&quot;), phenostring, category, num_cases, num_controls, num_gw_significant (count of genome-wide-significant loci for that endpoint)&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `instance` | string | optional; default: &quot;finngen&quot;; enum: [&quot;finngen&quot;] |
| `max_records` | integer | optional; default: 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes`

Search a PheWeb instance&#x27;s phenotypes (and entities) by name — the entry point for resolving a disease name to a phenocode. Args: query (free-text phenotype query e.g. &quot;diabetes&quot;, &quot;asthma&quot;; matches phenotype names/codes; some instances also match gene names and rsIDs); instance (finngen default or bbj — both expose autocomplete); max_records (cap default 500; autocomplete responses are short lists, rarely capped). Returns &#123;instance, query, total, returned, truncated, matches&#125;; each match &#123;display, phenocode, url&#125;. Use the phenocode with phewas_list_phenotypes rows or the instance website; BBJ display strings embed the code in parentheses.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `instance` | string | optional; default: &quot;finngen&quot;; enum: [&quot;finngen&quot;, &quot;bbj&quot;] |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## Expression {/* #family-14 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `gtex_tissue_sites`

List all tissue sites with metadata for a pinned GTEx release (54 in gtex_v8): sample counts, eGene/sGene counts, colour codes, and UBERON ontology ids.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info`

List all GTEx dataset releases with metadata: datasetId, GENCODE version, genome build, dbSNP build, and sample/subject/tissue counts.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `dataset_id` | string | optional |
| `organization_name` | string | optional |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info`

Sample and donor metadata for a pinned GTEx release, optionally filtered by tissue_site_detail_id, data_type (e.g. RNASEQ, WGS), or subject_id. Paged and count-verified; an unfiltered call matches tens of thousands of samples, so filter or set max_samples.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `tissue_site_detail_id` | string | optional |
| `data_type` | string | optional |
| `subject_id` | string | optional |
| `max_samples` | integer | optional |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes`

Resolve gene symbols or unversioned Ensembl ids to versioned GENCODE ids for a pinned release, e.g. GAPDH -&gt; ENSG00000111640.14. Feed the ids to the expression / eQTL tools.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `genes` | array of string | **required** | 7 / 0 / 0 |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression`

Median gene expression (TPM) for one or more VERSIONED GENCODE ids across tissues (omit tissues for all). Paged and count-verified over (gene, tissue) rows.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gencode_ids` | array of string | **required** |
| `tissue_site_detail_ids` | array of string | optional |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary`

Summarize a gene’s expression across ALL tissues ranked by descending median TPM. Accepts a symbol or Ensembl id and auto-resolves it to a versioned GENCODE id first.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene` | string | **required** |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression`

Sample-level (not aggregated) expression TPM arrays for one VERSIONED GENCODE id, per tissue (omit tissues for all). Returns the full per-sample TPM array and n_samples for each tissue.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gencode_id` | string | **required** |
| `tissue_site_detail_ids` | array of string | optional |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes`

Top-n genes by median TPM in one tissue, using the API-side ranking. filter_mt_gene (default true) drops mitochondrial genes from the ranking.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `tissue_site_detail_id` | string | **required** |
| `n` | integer | optional; default: 100 |
| `filter_mt_gene` | boolean | optional; default: true |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes`

All eGenes (genes with ≥1 significant cis-eQTL) for a tissue. Walked page-by-page and count-verified (e.g. Pancreas gtex_v8 = 9,660). max_genes caps how many rows are returned.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `tissue_site_detail_id` | string | **required** |
| `max_genes` | integer | optional |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls`

Significant single-tissue cis-eQTL associations for a gene and/or a variant (precomputed). Provide gencode_id and/or variant_id; tissue_site_detail_id optionally narrows. Paged and count-verified.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gencode_id` | string | optional |
| `variant_id` | string | optional |
| `tissue_site_detail_id` | string | optional |
| `max_results` | integer | optional |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls`

Multi-tissue cis-eQTL meta-analysis (METASOFT) for a VERSIONED GENCODE id. variant_id optionally narrows to one variant. Returns per-variant rows with per-tissue m-values, NES, p-values, and SEs.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gencode_id` | string | **required** |
| `variant_id` | string | optional |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl`

Calculate an eQTL on the fly for any gene-variant pair in one tissue, including non-significant pairs. Returns p-value, NES, t-statistic, MAF, and the per-sample genotype/expression arrays.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gencode_id` | string | **required** |
| `variant_id` | string | **required** |
| `tissue_site_detail_id` | string | **required** |
| `dataset_id` | string | optional; default: &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## Protein Annotation {/* #family-15 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `get_domain_architecture`

Complete InterPro domain architecture for one or more UniProt proteins (all matching entries, member-DB signatures, fragment coordinates), with pagination verified against the API count.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accessions` | array of string | **required** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries`

Keyword search over InterPro or member-database entries (Pfam, SMART, PROSITE, PANTHER, CDD), complete cursor walk verified against the API count.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | optional |
| `entry_type` | string | optional |
| `source_db` | string | optional; default: &quot;interpro&quot; |
| `go_term` | string | optional |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry`

Detail record for an InterPro entry (IPRxxxxxx) or Pfam family (PFxxxxx) — route chosen by accession prefix.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans`

Keyword search over Pfam clans (InterPro sets, accessions CLxxxx).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | optional |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan`

Pfam clan detail including the complete sorted member-family list.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `clan_accession` | string | **required** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins`

Member proteins of a Pfam family (complete count-verified walk or count only). Use count_only for very large families.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pfam_accession` | string | **required** |
| `reviewed_only` | boolean | optional; default: false |
| `tax_id` | integer | optional |
| `count_only` | boolean | optional; default: false |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes`

Proteomes containing members of a Pfam family. count_only defaults true — the upstream proteome cursor pagination is defective for deep walks.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `pfam_accession` | string | **required** |
| `count_only` | boolean | optional; default: true |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene`

Human Protein Atlas per-gene record (release 25.x): tissue/subcellular/pathology/blood/brain expression and antibody info. Accepts an Ensembl gene ID or a gene symbol.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene` | string | **required** |
| `full` | boolean | optional; default: false |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas`

Column-selected bulk search over the Human Protein Atlas (search_download).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `columns` | string | optional; default: &quot;g,gs,eg,gd,up,chr,chrp,scl&quot; |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids`

Map gene symbols/aliases to STRING protein identifiers (v12.0). Every input symbol is either mapped or listed in unmapped — the two partition the input.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `symbols` | array of string | **required** |
| `species` | integer | optional; default: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network`

STRING protein-protein interaction network for a gene list (v12.0) at a confidence threshold. Maps symbols first (unmapped reported), then retrieves nodes, edges, summary and provenance. A single mapped input requests 10 interaction neighbors, matching STRING; multiple mapped inputs are not expanded.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `symbols` | array of string | **required** |
| `species` | integer | optional; default: 9606 |
| `required_score` | integer | optional; default: 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores`

Smith-Waterman protein similarity bitscores among a gene set (STRING /homology). Sparse: pairs absent from STRING&#x27;s data are not listed (absence means no recorded similarity, not zero).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `symbols` | array of string | **required** |
| `species` | integer | optional; default: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits`

Best homology hit per input protein in a target species (STRING /homology_best). target_species=null asks for the best hit across all species.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `symbols` | array of string | **required** |
| `species` | integer | optional; default: 9606 |
| `target_species` | integer | optional |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## Cancer Models {/* #family-16 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `cbioportal_list_studies`

List cBioPortal cancer studies, optionally filtered by a free-text keyword (name/description/cancer type) and/or an exact cancer-type id; returns study id, name, cancer type, reference genome, citation, and per-data-type sample counts.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `keyword` | string | optional |
| `cancer_type_id` | string | optional |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study`

Get a cBioPortal cancer study by id: metadata, per-data-type sample counts, true sample/patient counts (from the study collections, not the display field), and its molecular profiles.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `study_id` | string | **required** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene`

All mutations of one gene (HUGO symbol) in a cBioPortal study, with recurrence aggregates: total mutations, mutated-sample count, mutation-type and protein-change distributions, and the most recurrent protein changes.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | **required** |
| `study_id` | string | **required** |
| `max_records` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency`

Mutation frequency of one gene across several cBioPortal studies (1–12): unique mutated samples divided by samples profiled for that gene in the selected mutation profile and sample list, accounting for targeted gene panels; ranked most-frequent first.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | **required** |
| `study_ids` | array of string | **required**; minItems: 1; maxItems: 12 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene`

Discrete copy-number alterations of one gene in a cBioPortal study, filtered by event type (deep deletion / amplification by default), with the full per-sample alteration distribution.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `gene_symbol` | string | **required** |
| `study_id` | string | **required** |
| `event_type` | string | optional; default: &quot;HOMDEL_AND_AMP&quot;; enum: [&quot;HOMDEL_AND_AMP&quot;, &quot;HOMDEL&quot;, &quot;AMP&quot;, &quot;GAIN&quot;, &quot;HETLOSS&quot;, &quot;DIPLOID&quot;, &quot;ALL&quot;] |
| `max_records` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes`

Clinical attributes defined in a cBioPortal study (patient- and sample-level fields), highlighting survival endpoints and whether overall-survival data is present.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `study_id` | string | **required** |
| `max_records` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## RNA {/* #family-17 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `get_family`

Rfam family metadata for an accession (RF00005) or family id (tRNA) — both resolve. Flattened record plus the full upstream JSON in &quot;raw&quot;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `family` | string | **required** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment`

Seed alignment of an Rfam family in Stockholm (default, with consensus secondary-structure line) or aligned gapped FASTA.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `family` | string | **required** |
| `fmt` | string | optional; default: &quot;stockholm&quot;; enum: [&quot;stockholm&quot;, &quot;fasta&quot;] |
| `max_bytes` | integer | optional; default: 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model`

Infernal covariance model (CM file) of an Rfam family, usable directly with cmsearch/cmscan, plus parsed header fields.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `family` | string | **required** |
| `max_bytes` | integer | optional; default: 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree`

Seed phylogenetic tree of an Rfam family (NHX/Newick text).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `family` | string | **required** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions`

All full-region hits of an Rfam family across sequence databases (parsed TSV). Check num_full via get_family first — rfam.org 403s this route for very large families (e.g. RF00005).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `family` | string | **required** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping`

PDB residue-level structure mappings of an Rfam family, deterministically sorted.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `family` | string | **required** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id`

Convert an Rfam accession to its family id (e.g. RF00005 -&gt; &quot;tRNA&quot;).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession`

Convert an Rfam family id to its accession (e.g. &quot;tRNA&quot; -&gt; RF00005).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `family_id` | string | **required** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence`

Search an RNA sequence through the official Rfam batch endpoint. Keep the returned job identity while waiting; an unfinished response is not a zero-hit result. Inspect the completed matches and source information. After a failed response, diagnose or resume the existing job rather than submitting it repeatedly.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `sequence` | string | **required** |
| `max_wait_s` | number | optional; default: 300 |
| `poll_interval_s` | number | optional; default: 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## Omics Archives {/* #family-18 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `ena_query_runs`

Discover public sequencing runs by NCBI tax_id (including descendant taxa), library_strategy and/or a keyword in study, experiment or sample titles and run descriptions. Supplied filters are combined with AND; at least one is required. Taxonomy describes the sequenced organism, not the host of a microbiome sample. Keyword is a literal substring, not ENA query syntax; double quotes, backslashes, wildcards and control characters are rejected. Includes public metagenome records. Returns bounded metadata only, not a complete cohort when truncated. Narrow filters to retrieve a smaller set; repeated calls are not pagination. For known INSDC accessions use ena_search_runs.

Supply at least one listed search filter; consult the downloadable schema for complete combination rules.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `tax_id` | integer | optional; minimum: `1`; maximum: `2147483647` |
| `library_strategy` | string | optional; enum: `["AMPLICON", "ATAC-seq", "Bisulfite-Seq", "CLONE", "CLONEEND", "CTS", "ChIA-PET", "ChIP-Seq", "ChM-Seq", "DNase-Hypersensitivity", "EST", "FAIRE-seq", "FINISHING", "FL-cDNA", "GBS", "Hi-C", "MBD-Seq", "MNase-Seq", "MRE-Seq", "MeDIP-Seq", "NOMe-Seq", "OTHER", "POOLCLONE", "RAD-Seq", "RIP-Seq", "RNA-Seq", "Ribo-Seq", "SELEX", "Synthetic-Long-Read", "Targeted-Capture", "Tethered Chromatin Conformation Capture", "Tn-Seq", "VALIDATION", "WCS", "WGA", "WGS", "WXS", "miRNA-Seq", "ncRNA-Seq", "snRNA-seq", "ssRNA-seq"]` |
| `keyword` | string | optional; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `limit` | integer | optional; default: `100`; minimum: `1`; maximum: `1000` |

```javascript
const result = await host.mcp("omics-archives", "ena_query_runs", {"tax_id": 6239, "library_strategy": "RNA-Seq", "keyword": "transcriptome", "limit": 20})
```

### `ena_get_submitted_files`

List original submitted files for one ERR/SRR/DRR run, including submitted BAM, CRAM or FASTQ when ENA exposes them. Returns FTP locations, submitted formats, byte sizes and MD5 checksums as metadata only. Does not download, convert formats, retrieve reference genomes or verify checksums. These are submitted files, not the archive-generated FASTQ returned by ena_get_run_files and not a list of archive-generated SRA containers. A CRAM may require its matching reference for analysis.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `run_accession` | string | **required**; minLength: `1`; maxLength: `64` |

```javascript
const result = await host.mcp("omics-archives", "ena_get_submitted_files", {"run_accession": "ERR10015065"})
```

### `ena_search_runs`

Find public sequencing runs associated with one ENA/INSDC study, experiment, sample or run accession. Accepts PRJ/ERP/SRP/DRP, ERX/SRX/DRX, SAM/ERS/SRS/DRS and ERR/SRR/DRR identifiers; GEO GSE/GSM, ArrayExpress E-MTAB and MGnify MGYS identifiers need their linked INSDC accession first. Accession lookup only, not keyword search. Returns organism and library metadata without fetching data files. The result is capped at 1000 runs; a truncated result is not a complete cohort, and repeated calls are not pagination because ENA provides no offset or continuation token. Use a narrower sample or experiment accession when complete coverage is required.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required**; minLength: 1; maxLength: 64 |
| `limit` | integer | optional; default: 100; minimum: 1; maximum: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files`

Get archive-generated FASTQ download URLs, byte sizes and upstream MD5 checksums for one ERR/SRR/DRR run. Returns a file inventory only; no download or checksum verification. Retains every file in report order, including unpaired or long-read files; library_layout=PAIRED does not imply exactly two files. file_index is positional only and is not an R1/R2 or mate identifier. Some runs (including some single-cell/native-format submissions) have no archive-generated FASTQ. Submitted BAM/CRAM/SRA files are outside this tool.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `run_accession` | string | **required**; minLength: 1; maxLength: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments`

Search ArrayExpress functional-genomics experiments (BioStudies) with complete, totalHits-verified retrieval; filters (query, organism, study_type, technology, release-date range, extra facets) combine with AND.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | optional |
| `organism` | string | optional |
| `study_type` | string | optional |
| `technology` | string | optional |
| `released_after` | string | optional |
| `released_before` | string | optional |
| `extra_facets` | object | optional |
| `max_records` | integer | optional; default: 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment`

Fetch one ArrayExpress experiment (BioStudies) as a flattened analyst record — study type, organisms, assay/sample counts, designs/factors, authors, publications, protocols, array designs, and file summary.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files`

List every file of an ArrayExpress experiment (name, size, type, format, description) with download URLs, plus the /info endpoint file count carried alongside for comparison.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples`

Fetch per-sample SDRF annotation rows for an ArrayExpress experiment (MAGE-TAB headers verbatim, repeats suffixed #2/#3). Experiments with no SDRF return &#123;&quot;error&quot;:&quot;no_sdrf&quot;&#125;.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |
| `max_rows_returned` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series`

Search NCBI GEO DataSets (db=gds) and return series-level records (trimmed esummary docs). `term` is full E-utilities syntax; add gse[ETYP] to restrict to series.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `term` | string | **required** |
| `retmax` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series`

Fetch structured metadata for GEO series (GSE accessions) with samples included — series title/summary/design, platforms, samples with characteristics and library info, and supplementary-file URLs. Data tables are never downloaded.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accessions` | array of string | **required** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies`

List every public MetaboLights study accession (numerically sorted) with the API&#x27;s own reported count. There is no server-side study search — filter fetched candidates by title/descriptor instead.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies`

Fetch structured metadata for MetaboLights studies (MTBLSxxx) from the parsed ISA payload — title, status, years, organisms, assays, factors, descriptors, sample count, protocols; optional per-sample table. Unknown/private accessions go in not_found.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accessions` | array of string | **required** |
| `include_samples` | boolean | optional; default: false |
| `max_sample_rows_returned` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files`

Complete file inventory for a public MetaboLights study — the top-level study folder (ISA-Tab, MAF, folder entries) and, by default, the recursive FILES data folder.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |
| `include_data_files` | boolean | optional; default: true |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files`

Glob search over a MetaboLights study&#x27;s raw-data folder (FILES tree). `pattern` is a filename glob (e.g. &#x27;*.mzML&#x27;, &#x27;*.raw&#x27;); omit it to list every data file.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |
| `pattern` | string | optional |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies`

Find MGnify metagenomics studies by free text OR biome lineage (provide exactly one). Full listing is paginated to completion and count-verified against the API.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | optional |
| `biome_lineage` | string | optional |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies`

Fetch structured records for MGnify studies (MGYS accessions). With include_analyses, each study also carries its complete analyses listing plus by-pipeline/by-experiment breakdowns. Unknown accessions go in missing.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accessions` | array of string | **required** |
| `include_analyses` | boolean | optional; default: false |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses`

List ALL analyses of one MGnify study (complete, count-verified pagination) — one record per MGYA analysis with pipeline version, experiment type, status, and run/assembly/sample accessions.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_get_project_files`

List one page of public PRIDE project files for a PXD or PRD accession, including file category, byte size, upstream checksum and download locations (FTP, HTTP or Aspera). Metadata only: does not download files or verify checksums. Pages are zero-based; keep page_size unchanged and follow next_page until null. Ordering is supplied by PRIDE, not a snapshot. An empty list does not establish whether a project exists or is public.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `project_accession` | string | **required**; maxLength: `32`; pattern: `"^(?:PXD\|PRD)[0-9]{6,}$"` |
| `page` | integer | optional; default: `0`; minimum: `0`; maximum: `1000000` |
| `page_size` | integer | optional; default: `100`; minimum: `1`; maximum: `100` |

```javascript
const result = await host.mcp("omics-archives", "pride_get_project_files", {"project_accession": "PXD000001", "page": 0, "page_size": 100})
```

### `pride_search_projects`

Search PRIDE Archive proteomics projects (complete, api_total-verified retrieval); filters (keyword, organism, instrument, disease, extra_filters) combine with AND. Sorted by accession ASC — a bounded walk is a stable prefix.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `keyword` | string | optional |
| `organism` | string | optional |
| `instrument` | string | optional |
| `disease` | string | optional |
| `extra_filters` | object | optional |
| `max_records_returned` | integer | optional; default: 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects`

Fetch full metadata for PRIDE projects by accession (e.g. PXD010154) — the same normalized record shape as pride_search_projects, so the two are directly comparable. Unknown accessions go in not_found.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accessions` | array of string | **required** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins`

List protein evidence rows for one PRIDE affinity-proteomics project (paged to exhaustion). NOTE: only affinity-proteomics projects are served here; for classic MS (PXD) projects use pride_find_projects_for_protein instead.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `project_accession` | string | **required** |
| `keyword` | string | optional |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein`

Find PRIDE projects containing a protein (MS-archive direction). `protein_accession` is a UniProt accession (e.g. P04637). Feed the returned project accessions to pride_get_projects for full metadata.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `protein_accession` | string | **required** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## CellGuide {/* #family-19 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `get_cell_type_info`

CellGuide (CELLxGENE) cell-type info by Cell Ontology id or name: name, synonyms, ontology description, and curated/GPT description.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `cell_type` | string | **required** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types`

Search CellGuide cell types by free text over name and synonyms (the CDN has no search endpoint, so celltype_metadata.json is filtered client-side).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `limit` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes`

CellGuide marker genes for a cell type (id or name): computational (data-derived, scored) or canonical (literature-curated).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `cell_type` | string | **required** |
| `marker_type` | string | optional; default: &quot;computational&quot;; enum: [&quot;computational&quot;, &quot;canonical&quot;] |
| `limit` | integer | optional; default: 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data`

CellGuide source datasets and publications contributing to a cell type (id or name): collection name/url, publication, and the tissues/diseases/organisms each covers.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `cell_type` | string | **required** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues`

Anatomical tissues where a cell type (id or name) is observed, aggregated (deduplicated) across CellGuide source collections.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `cell_type` | string | **required** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## Regulation {/* #family-20 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `encode_search_experiments`

Search ENCODE functional-genomics experiments (ChIP-seq, ATAC-seq, ...). Filters: assay_title (e.g. &quot;TF ChIP-seq&quot;), target (protein label, e.g. &quot;CTCF&quot;), organism (scientific name), status (default &quot;released&quot;), date_released_before (ISO date — a closed window), plus arbitrary portal field filters via extra_filters. The full result set is paged and count-verified; `accessions` lists every match, at most max_rows row summaries are returned.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `assay_title` | string | optional |
| `target` | string | optional |
| `organism` | string | optional |
| `status` | string | optional; default: &quot;released&quot; |
| `date_released_before` | string | optional |
| `extra_filters` | object | optional |
| `max_rows` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples`

Search ENCODE biosamples (cell lines, tissues, primary cells). Filters: term_name (ontology term, e.g. &quot;K562&quot;), classification (&quot;cell line&quot;, &quot;tissue&quot;, ...), organism (scientific name), status (default &quot;released&quot;), date_created_before (ISO date), plus arbitrary portal field filters via extra_filters. Complete, count-verified: `accessions` is the full match list, at most max_rows row summaries are returned.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `term_name` | string | optional |
| `classification` | string | optional |
| `organism` | string | optional |
| `status` | string | optional; default: &quot;released&quot; |
| `date_created_before` | string | optional |
| `extra_filters` | object | optional |
| `max_rows` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files`

List ENCODE data files by format / assay / biosample. Filters: file_format (&quot;fastq&quot;, &quot;bam&quot;, &quot;bigWig&quot;, &quot;bed&quot;, ...), assay_term_name (the ontology term e.g. &quot;ChIP-seq&quot; — NOT the display assay_title like &quot;TF ChIP-seq&quot;, which matches nothing; pass titles via extra_filters=&#123;&quot;assay_title&quot;: ...&#125;), biosample_term_name (e.g. &quot;K562&quot;), status (default &quot;released&quot;), date_created_before, plus arbitrary portal field filters via extra_filters. File queries match millions of rows unfiltered — always combine several filters. Complete + count-verified; at most max_rows row summaries returned.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `file_format` | string | optional |
| `assay_term_name` | string | optional |
| `biosample_term_name` | string | optional |
| `status` | string | optional; default: &quot;released&quot; |
| `date_created_before` | string | optional |
| `extra_filters` | object | optional |
| `max_rows` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment`

Get one ENCODE experiment by accession (e.g. &quot;ENCSR000AKP&quot;). Returns a stable-field record: assay, target, biosample ontology + summary, description, lab, award project, release/submission dates, assemblies, replicate counts, replication type, dbxrefs, DOI and uuid. Volatile portal fields (audits, analyses, internal status) are excluded.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file`

Get one ENCODE file by accession (e.g. &quot;ENCFF002JUR&quot;). Returns a stable-field record: format, output type/category, assay, assembly, parent dataset, biological replicates, file size, md5sums, run type, read length, lab, creation date, download href and uuid.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample`

Get one ENCODE biosample by accession (e.g. &quot;ENCBS013JZP&quot;). Returns a stable-field record: ontology term + classification, organism, summary/description, source, donor, treatments, genetic modifications, life stage, age, sex, lab, creation date, status and uuid.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `accession` | string | **required** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix`

Get one JASPAR TF binding profile by VERSIONED matrix id (e.g. &quot;MA0002.2&quot;). Returns the full record: position frequency matrix (pfm), TF name/class/family, species, data type, literature references (pubmed/medline), sequence logo URL. Requires a versioned id (&quot;MA0002.2&quot;, not &quot;MA0002&quot;) — use jaspar_matrix_versions to enumerate versions. Versioned matrices are immutable, so results are reproducible.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `matrix_id` | string | **required** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions`

List all versions of a JASPAR base matrix id (e.g. &quot;MA0002&quot;). Returns every released version with its matrix_id, name, collection and URL — count-verified. Use to pin an exact version before jaspar_get_matrix, or to track how a profile changed across releases. A versioned id (&quot;MA0002.2&quot;) is accepted and reduced to its base.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `base_id` | string | **required** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices`

Search/list JASPAR TF binding profiles (the full profile catalog). Filters (all optional): collection (&quot;CORE&quot;, &quot;UNVALIDATED&quot;), tax_group (&quot;vertebrates&quot;, &quot;plants&quot;, ...), tax_id (NCBI taxonomy id, e.g. 9606 for human — this is how you filter by species; enumerate ids with jaspar_list_species), name (exact TF name, e.g. &quot;FOXA1&quot;), search (free text), version=&quot;latest&quot; (restrict to latest versions only). The full filtered catalog is paginated and count-verified; at most max_rows summary rows are returned.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `collection` | string | optional |
| `tax_group` | string | optional |
| `tax_id` | integer | optional |
| `name` | string | optional |
| `search` | string | optional |
| `version` | string | optional |
| `max_rows` | integer | optional; default: 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species`

List all species with JASPAR profiles (NCBI tax_id + name); count-verified full listing. Use the tax_id values to filter jaspar_list_matrices (e.g. 9606 = Homo sapiens, 10090 = Mus musculus).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa`

List all JASPAR taxonomic groups (vertebrates, plants, fungi, insects, ...); count-verified full listing. Use the group names as the tax_group filter of jaspar_list_matrices.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections`

List all JASPAR collections (CORE, UNVALIDATED, ...); count-verified full listing. Use the collection names as the collection filter of jaspar_list_matrices (CORE = curated, non-redundant profiles).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases`

List all JASPAR database releases (year, release number, active flag); count-verified full listing. Record the active release when selecting motifs for reproducibility, or check release history before comparing results across JASPAR versions.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs`

Search UniBind ChIP-seq datasets with high-confidence TFBS predictions (unibind.uio.no, 2021 release; direct TF-DNA interactions from ~10k datasets across 9 species). Each dataset is one (experiment, cell type, TF) triple. Filters (all optional, AND-combined, exact-match unless noted): tf_name (gene symbol, e.g. &quot;CTCF&quot;), cell_line (verbose UniBind title — prefer `search` for fuzzy matching), species (scientific name), collection (&quot;Robust&quot; = best-model / high confidence, or &quot;Permissive&quot;), jaspar_id (versioned, e.g. &quot;MA0139.1&quot;), search (free text). `total` is the API&#x27;s exact count; at most max_rows rows are returned (a stable prefix).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `tf_name` | string | optional |
| `cell_line` | string | optional |
| `species` | string | optional |
| `collection` | string | optional; enum: [&quot;Robust&quot;, &quot;Permissive&quot;] |
| `jaspar_id` | string | optional |
| `search` | string | optional |
| `max_rows` | integer | optional; default: 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset`

Get one UniBind dataset&#x27;s detail: per-model TFBS counts + file URLs. tf_id is the dataset key &quot;&lt;identifier&gt;.&lt;cell_line&gt;.&lt;TF&gt;&quot; as returned by unibind_search_tfbs (e.g. &quot;ENCSR000AUE.A549_lung_carcinoma.CTCF&quot;). Returns the TF name, source identifiers (ENCODE/GEO/GTRD), cell lines, biological conditions, JASPAR matrix ids, ChIP-seq peak count, and one row per TFBS prediction model (DAMO/PWM/...) with total_tfbs, score/distance thresholds, adjusted CentriMo p-value, and direct BED/FASTA download URLs — use those URLs (not an MCP call) to retrieve the complete site list.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `tf_id` | string | **required** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region`

TF binding sites overlapping a genomic region (UniBind 2021 maps), served via the UCSC hubApi against UniBind&#x27;s registered public track hubs (UniBind&#x27;s own REST API has no region endpoint). Coordinates are 0-based half-open. genome: UCSC assembly — Robust hub: hg38, mm10, ce11, dm6, danRer11, sacCer3, rn6, araTha1; Permissive adds spo2 (no hg19 — lift first). chrom: with &quot;chr&quot; prefix. start/end: interval, end-start &lt;= 1,000,000 bp. HONEST-CAP: at most 20,000 items are scanned per call; region_scan_complete=false means the region has more sites than were scanned (narrow the window) and, with tf_name set, matches may be missing. n_matching counts scanned sites passing the filter; returned/truncated describe the max_sites cap.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `genome` | string | **required** |
| `chrom` | string | **required** |
| `start` | integer | **required** |
| `end` | integer | **required** |
| `tf_name` | string | optional |
| `collection` | string | optional; default: &quot;Robust&quot;; enum: [&quot;Robust&quot;, &quot;Permissive&quot;] |
| `max_sites` | integer | optional; default: 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## Research Resources {/* #family-21 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `search_grants`

Search Grants.gov funding opportunities via the search2 API (complete, count-verified retrieval). At least one criterion is required (keyword, opportunity_number, aln/CFDA, agencies, eligibilities, funding_categories, or funding_instruments). opportunity_statuses defaults to [&quot;forecasted&quot;,&quot;posted&quot;] (current opportunities); add &quot;closed&quot;/&quot;archived&quot; for historical ones. agencies takes codes like [&quot;HHS-NIH11&quot;] (NIH), [&quot;HHS-FDA&quot;], [&quot;NSF&quot;]. Set count_only for just the hit count + facets; max_records caps returned records (the walk still retrieves the complete set and flags truncated).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `keyword` | string | optional |
| `opportunity_number` | string | optional |
| `aln` | string | optional |
| `agencies` | array of string | optional |
| `opportunity_statuses` | array of string | optional |
| `eligibilities` | array of string | optional |
| `funding_categories` | array of string | optional |
| `funding_instruments` | array of string | optional |
| `count_only` | boolean | optional; default: false |
| `max_records` | integer | optional; default: 100 |
| `include_facets` | boolean | optional; default: true |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies`

Full-text search the Antibody Registry (antibodyregistry.org, ~3.2M records). Token-based matching against antibody name/target/catalog text (&quot;TP53&quot; and &quot;p53&quot; are different queries). With page omitted, all pages are walked up to max_records or the anonymous depth cap (rows beyond offset 500 need authentication upstream, flagged as anonymous_limit_hit — never silently dropped). Pass a 1-based page for single-page retrieval (page*page_size must stay &lt;= 500).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required** |
| `page` | integer | optional |
| `page_size` | integer | optional; default: 100 |
| `max_records` | integer | optional; default: 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody`

Fetch Antibody Registry detail record(s) for one antibody accession / RRID. Accepts a plain number (&quot;3643095&quot;), &quot;AB_3643095&quot;, or &quot;RRID:AB_3643095&quot;. The upstream route is list-valued (an accession can map to several curated records, e.g. multi-vendor duplicates). A nonexistent id yields record_count 0, not an error.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `antibody_id` | string | **required** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog`

Find antibodies by vendor catalog number (exact, case-insensitive). Implemented as a full-text search plus client-side exact matching on the catalog number (or its listed alternatives), because the upstream column-filter route returns HTTP 500 for every key. Pass an optional vendor name (exact, case-insensitive) to further narrow the matches.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `catalog_number` | string | **required** |
| `vendor` | string | optional |
| `page_size` | integer | optional; default: 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats`

Antibody Registry statistics: total antibody count and last-update date. Returns the upstream /api/datainfo payload.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## BioMart {/* #family-22 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `list_marts`

List available Ensembl BioMart marts (databases). BioMart organizes data as MART -&gt; DATASET -&gt; ATTRIBUTES/FILTERS; a mart name feeds list_datasets.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| — | object | No fields; pass an empty object. |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets`

List the datasets available in a given mart (e.g. hsapiens_gene_ensembl for human genes). A dataset name feeds the attribute/filter/query tools.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mart` | string | **required** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes`

List the commonly used attributes for a dataset (a curated high-signal subset). Use this before list_all_attributes to pick attributes for get_data. `mart` is accepted for signature parity but ignored; the query keys off `dataset`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mart` | string | **required** |
| `dataset` | string | **required** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes`

List all attributes available for a dataset, minus homologs and microarray probes (which are bulky and rarely needed). Can be large; prefer list_common_attributes first. `mart` is accepted for signature parity but ignored; the query keys off `dataset`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mart` | string | **required** |
| `dataset` | string | **required** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters`

List the filters available for a dataset. Filters narrow a get_data query (e.g. chromosome_name, biotype) and are passed to get_data as a filters dict. `mart` is accepted for signature parity but ignored; the query keys off `dataset`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mart` | string | **required** |
| `dataset` | string | **required** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data`

Run a BioMart query: retrieve the requested attributes for a dataset, optionally narrowed by filters. This is the main data-retrieval tool. `mart` is accepted for signature parity but ignored; the query keys off `dataset`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mart` | string | **required** |
| `dataset` | string | **required** |
| `attributes` | array of string | **required** |
| `filters` | object | optional |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation`

Translate a single identifier from one attribute type to another (e.g. an HGNC symbol to an Ensembl gene ID) within a dataset. `mart` is accepted for signature parity but ignored; the query keys off `dataset`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mart` | string | **required** |
| `dataset` | string | **required** |
| `from_attr` | string | **required** |
| `to_attr` | string | **required** |
| `target` | string | **required** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate`

Translate many identifiers from one attribute type to another in a single query — more efficient than repeated get_translation calls. `mart` is accepted for signature parity but ignored; the query keys off `dataset`.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `mart` | string | **required** |
| `dataset` | string | **required** |
| `from_attr` | string | **required** |
| `to_attr` | string | **required** |
| `targets` | array of string | **required** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## ZINC {/* #family-23 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `zinc_search_by_id`

Look up purchasable compounds in ZINC22/ZINC20 by ZINC identifier — answers &quot;what is this compound and who sells it&quot;. Batched: pass up to 100 ids in one call rather than many single-id calls. Async upstream (submit + poll); can take up to timeout_s seconds.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **required** |
| `max_results` | integer | optional; default: 50 |
| `timeout_s` | number | optional; default: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles`

Search ZINC22&#x27;s purchasable chemical space by structure — answers &quot;what purchasable compounds look like this SMILES&quot;. This is BOTH the exact-match and the analog-discovery (similarity) tool: CartBlanche22 exposes one structure-search endpoint whose `dist` parameter spans exact through diverse, so there is deliberately no separate similarity-search tool. The slowest ZINC query — raise `dist` gradually rather than starting loose.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `smiles` | string | **required** |
| `dist` | integer | optional; default: 0 |
| `adist` | integer | optional |
| `max_results` | integer | optional; default: 50 |
| `timeout_s` | number | optional; default: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier`

Resolve vendor catalog numbers to ZINC compounds — answers &quot;which ZINC substance is this supplier code, and what&#x27;s its structure&quot;. Batched: up to 100 supplier codes per call. Async upstream (submit + poll).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `supplier_codes` | ['string', 'array'] | **required** |
| `max_results` | integer | optional; default: 50 |
| `timeout_s` | number | optional; default: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample`

Draw a random sample of purchasable compounds from ZINC22 — for building screening decks, property baselines, or decoy sets. `count` doubles as this tool&#x27;s `max_results`; re-calling draws a fresh sample. Async upstream (submit + poll).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `count` | integer | optional; default: 50 |
| `subset` | string | optional |
| `timeout_s` | number | optional; default: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d`

Locate docking-ready 3D structures for ZINC compounds. ZINC22 ships pre-generated 3D conformers (DOCK .db2.gz, .mol2.gz, .sdf.gz) in its file repository, organized by tranche — this tool resolves each id to its tranche and returns the repository locations to download from for docking prep (DOCK6, AutoDock Vina, etc.). Max 50 ids per call (3D retrieval is per-compound work). Async upstream (submit + poll).

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **required** |
| `timeout_s` | number | optional; default: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## Example response records

The <ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">example response records</ExampleDownload> include exact inputs, capped response excerpts and per-operation outcomes. Distinguish a returned record, an empty match and a failed request. Results may be metadata, schemas or identifiers; check the source fields and completeness flags before using them in your research.

## GDC {/* #family-24 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `gdc_list_projects`

List GDC cancer projects and their case/file summaries. Filters are explicit and bounded; this is metadata discovery, not a data download operation.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `project_ids` | string / array | optional |
| `disease_type` | string | optional; minLength: 1; maxLength: 200 |
| `primary_site` | string | optional; minLength: 1; maxLength: 200 |
| `page` | integer | optional; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | optional; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_list_projects", {"project_ids": "TCGA-BRCA", "page_size": 5})
```

### `gdc_list_cases`

List GDC cases (sample donors) with project and disease metadata. Results identify cases and do not expose or download controlled data.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `project_ids` | string / array | optional |
| `submitter_ids` | string / array | optional |
| `case_ids` | string / array | optional |
| `page` | integer | optional; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | optional; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_list_cases", {"project_ids": ["TCGA-BRCA"], "page_size": 5})
```

### `gdc_search_files`

Search the GDC file inventory and explicitly label each file as open or controlled access. Metadata discovery does not grant download access; controlled files require appropriate GDC authorization.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `project_ids` | string / array | optional |
| `access` | string | optional; default: &quot;all&quot;; enum: [&quot;all&quot;, &quot;open&quot;, &quot;controlled&quot;] |
| `data_category` | string | optional; minLength: 1; maxLength: 200 |
| `data_type` | string | optional; minLength: 1; maxLength: 200 |
| `data_format` | string | optional; minLength: 1; maxLength: 50 |
| `file_name` | string | optional; minLength: 1; maxLength: 500 |
| `page` | integer | optional; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | optional; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_search_files", {"project_ids": ["TCGA-BRCA"], "access": "open", "page_size": 10})
```

### `gdc_get_file`

Retrieve metadata for one GDC file UUID, including its open/controlled access classification. This performs no file download and does not claim that a listed file is downloadable for the current user.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `file_id` | string | **required**; pattern: &quot;^[0-9a-fA-F]&#123;8&#125;-[0-9a-fA-F]&#123;4&#125;-[1-5][0-9a-fA-F]&#123;3&#125;-[89abAB][0-9a-fA-F]&#123;3&#125;-[0-9a-fA-F]&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("gdc", "gdc_get_file", {"file_id": "cb92f61d-041c-4424-a3e9-891b7545f351"})
```

### `gdc_get_manifest`

Create a GDC Data Transfer Tool manifest for up to 100 file UUIDs. The returned manifest is an inventory only; it does not download files or bypass controlled-access authorization.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `file_ids` | array of string | **required**; minItems: 1; maxItems: 100; uniqueItems: true |

```javascript
const result = await host.mcp("gdc", "gdc_get_manifest", {"file_ids": ["cb92f61d-041c-4424-a3e9-891b7545f351"]})
```

</ToolOperationGroup>

## Zenodo {/* #family-25 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `search_records`

Search public Zenodo records (datasets, software and publications) using Zenodo query-string syntax, e.g. title:"climate" or doi:"10.5281/zenodo.8435696". Fetches one page, up to 25 records, without authentication. By default only the latest version is listed; all_versions includes older versions. For the next page, keep query, page_size, sort and all_versions unchanged. The search window is limited to 10,000 results: (page - 1) * page_size must be less than 10,000; the final page may be partial. If pagination_limited is true, narrow the query. Public metadata does not imply open file access.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `query` | string | **required**; minLength: 1; maxLength: 1000; pattern: &quot;\\S&quot; |
| `page` | integer | optional; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | optional; default: 10; minimum: 1; maximum: 25 |
| `sort` | string | optional; default: &quot;bestmatch&quot;; enum: [&quot;bestmatch&quot;, &quot;mostrecent&quot;] |
| `all_versions` | boolean | optional; default: false |

```javascript
const result = await host.mcp("zenodo", "search_records", {"query": "title:climate", "page_size": 5})
```

### `get_record`

Retrieve public Zenodo metadata and the file inventory exposed by the record endpoint. Pass a decimal record ID, not a DOI or URL. A concept ID may resolve to its latest version; requested_record_id, record_id and concept_record_id remain distinct. Use the returned version-specific record_id for reproducible lookup. description_html is upstream HTML, not sanitized. File links and checksums are metadata only: no download, checksum verification or access probe is performed. Restricted or embargoed records can have public metadata without accessible files; an empty file list does not establish that the deposit has no files.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `record_id` | string | **required**; maxLength: 20; pattern: &quot;^[1-9][0-9]*$&quot; |

```javascript
const result = await host.mcp("zenodo", "get_record", {"record_id": "8435696"})
```

</ToolOperationGroup>

## HMMER {/* #family-26 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `search` {/* #hmmer-search */}

Submit one asynchronous EMBL-EBI HMMER3 search. program selects phmmer (protein sequence against a sequence database), hmmscan (protein sequence against Pfam profiles), hmmsearch (profile HMM/alignment against a sequence database), or jackhmmer (iterative remote-homolog search). input is the FASTA sequence, profile HMM, or alignment text accepted by that program. database is the provider database name. Optional thresholds use HMMER parameter names (incE/incdomE, E/domE, incT/incdomT, T/domT); iterations controls jackhmmer rounds. Submission is not completion: retain the returned job_id and poll with status. The service may accept a job even if the response is lost; never automatically resubmit an uncertain submission.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `program` | string | **required**; enum: [&quot;phmmer&quot;, &quot;hmmscan&quot;, &quot;hmmsearch&quot;, &quot;jackhmmer&quot;] |
| `database` | string | **required**; enum: [&quot;refprot&quot;, &quot;uniprot&quot;, &quot;swissprot&quot;, &quot;pdb&quot;, &quot;rp15&quot;, &quot;rp35&quot;, &quot;rp55&quot;, &quot;rp75&quot;, &quot;pfam&quot;] |
| `input` | string | **required**; minLength: 1; maxLength: 200000 |
| `incE` | number | optional; exclusiveMinimum: 0; maximum: 10 |
| `incdomE` | number | optional; exclusiveMinimum: 0; maximum: 10 |
| `incT` | number | optional; exclusiveMinimum: 0 |
| `incdomT` | number | optional; exclusiveMinimum: 0 |
| `E` | number | optional; exclusiveMinimum: 0; maximum: 10 |
| `domE` | number | optional; exclusiveMinimum: 0; maximum: 10 |
| `T` | number | optional; exclusiveMinimum: 0 |
| `domT` | number | optional; exclusiveMinimum: 0 |
| `popen` | number | optional; minimum: 0 |
| `pextend` | number | optional; minimum: 0 |
| `mx` | string | optional; enum: [&quot;BLOSUM45&quot;, &quot;BLOSUM62&quot;, &quot;BLOSUM90&quot;, &quot;PAM30&quot;, &quot;PAM70&quot;] |
| `iterations` | integer | optional; minimum: 1; maximum: 9 |

```javascript
const result = await host.mcp("hmmer", "search", {"program":"hmmscan","database":"pfam","input":">query\nMKTIIALSYIFCLVFADYKDDDDK"})
```

### `status` {/* #hmmer-status */}

Check one HMMER job once, without polling or resubmitting. SUCCESS means results are available; PENDING/RUNNING means wait before checking again; ERROR/FAILURE/NOT_FOUND are terminal outcomes and never mean zero hits. Keep the exact job_id.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; maxLength: 36; pattern: &quot;^[A-Fa-f0-9]&#123;8&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("hmmer", "status", {"job_id":"8ebb1d5f-4457-4da8-808c-f811105c3654"})
```

### `results` {/* #hmmer-results */}

Retrieve one HMMER job result once. Checks the provider status first and returns no result payload while the job is pending or failed. On SUCCESS, retrieves all result pages, including domain annotations; jackhmmer iteration records are returned in the provider array shape. Preserve the result in a Notebook artifact because provider retention is finite; an empty match list is a completed zero-hit result, distinct from a pending or failed job.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; maxLength: 36; pattern: &quot;^[A-Fa-f0-9]&#123;8&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("hmmer", "results", {"job_id":"8ebb1d5f-4457-4da8-808c-f811105c3654"})
```

</ToolOperationGroup>

## InterProScan {/* #family-27 */}

<ToolOperationGroup>
<summary>Show operations and parameters</summary>

### `status` {/* #interproscan-status */}

Check one InterProScan job once, without retrying or polling. Wait at least 10 seconds between checks. FINISHED means results can be retrieved; ERROR/FAILURE are job failures, NOT_FOUND means unknown or expired, never a zero-hit result. Keep the exact job_id; this tool never resubmits.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; maxLength: 200; pattern: &quot;^[A-Za-z0-9][A-Za-z0-9_-]&#123;0,199&#125;$&quot; |

```javascript
const result = await host.mcp("interproscan", "status", {"job_id":"iprscan5-R20260922-123456-0123-12345678-p1m"})
```

### `results` {/* #interproscan-results */}

Retrieve the complete InterProScan TSV report for a job, capped at 2 MiB (oversized reports fail, never truncate). Checks status once first, then fetches TSV only for FINISHED. No retries, polling, or resubmission. Preserve the report in a Notebook artifact promptly because provider results expire. TSV contains one row per signature match; coordinates are 1-based inclusive and scores are application-specific. Optional columns hold InterPro, GO and pathway annotations. An empty TSV after FINISHED means no reported matches, not evidence that the protein lacks function.

| Field | Type | Requirement and constraints |
| --- | --- | --- |
| `job_id` | string | **required**; maxLength: 200; pattern: &quot;^[A-Za-z0-9][A-Za-z0-9_-]&#123;0,199&#125;$&quot; |

```javascript
const result = await host.mcp("interproscan", "results", {"job_id":"iprscan5-R20260922-123456-0123-12345678-p1m"})
```

</ToolOperationGroup>
