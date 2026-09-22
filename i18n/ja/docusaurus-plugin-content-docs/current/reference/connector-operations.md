---
title: "Connectorの操作の参照"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connectorの操作の参照 {/* #connector-operation-reference */}

正確な操作名、必要なフィールド、デフォルト、および例の呼び出しを調べます。 データソースを選択するには、[データベースカタログ](../tools/databases.md) で起動します。 あなたが呼ぶつもりのConnector家族を拡大して下さい; 可用性と資格情報は別に設定する必要があります。

## たとえば呼び出しが実行される場所 {/* #where-the-example-calls-run */}

`host`オブジェクトは、Open-Scienceのエージェント実行環境で供給されます。 以下の JavaScript は、 **エージェント側コールフラグメント**、スタンドアローンNode.jsプログラムではなく、パブリックタスクのメソッドではなく SDK クライアント。 関連するConnector命令をロードし、マッチング操作を使用するエージェントに依頼してください。 フレームワークは、この JavaScript フォームの代わりに Python ブリッジを公開する可能性があります。

まず、[設定 → コネクタ](../guides/connectors.md)でConnectorを有効にし、[必須資格情報](../tools/credentials.md)を設定し、該当する場合は、選択したSpecialistへのアクセスを許可します。 呼び出しは、会話の許可ポリシーに引き続き従います。 パブリックNode.js の統合は、[タスクSDK](api.md) で Connector の設定を管理できますが、そのクライアントをインポートすることで、この `host` を取得できません。

### 呼び出しをチェーンする前に結果を読む {/* #read-a-result-before-chaining-calls */}

<p className="example-label"><strong>例</strong> 返されたPubMed IDをメタデータルックアップに渡す</p>

たとえば、**PRISMA レポートのガイダンスを検索するために PubMed を使用してください。 マッチの合計数と5つのPMIDsを返します。** 操作 `search_articles` は、合計と識別子のページを返します。 PMIDs を `get_article_metadata` に返し、タイトル、作者、DOI のリンクを取得します。 空のページ、truncated結果、認証エラーは異なる処理が必要です。

| 返送情報 | 利用する |
| --- | --- |
| 合計マッチ数と返された行 | 完全な結果セットから小さなページを区別する |
| `truncated`, `records_truncated` または家族固有の完全性フラグ | クエリを狭くしたり、残りを取ったりするかどうかを決定 |
| `not_found`, `missing`, `not_processed` | 未解決の入力を識別し、適切な項目だけを再試行する |
| DOI、アクセス、ソースURLおよびリリース/ビルド | その後のクエリに必要なアイデンティティとソースを保持します。 |
| 完全なテキストの状態か免許証のノート | テキストが取得されたかどうかを決定し、再利用することができます |

返却フィールド名は動作により異なります。 以下に説明とダウンロード可能なスキーマは、各契約を指定します。 テーブルは普遍的な JSON 応答ではないです。 右手ファミリーリストを使用してジャンプし、その家族のパラメータを拡大します。 運用名を検索すると、グループを含むグループが開きます。

**空の結果から別々に失敗を読んで下さい。** でんぷん v0.30.2、CellGuideのマーカー/ソース/ティッシュは空の証拠としてそれらを扱うのではなく、表面のフェッチの失敗を要求します; absentオプションのデータファイルがまだ空にすることができます。 OLS関連クエリは、不完全なペジネーションと無効な応答を拒否します。 サービスエラーは、セルタイプがマーカーや腫瘍学用語が関係する用語がないという証拠ではありません。

## 操作の入力 {/* #operation-inputs */}

Connectorを一度に拡大します。 必須フィールドは、**必須** マークされています。 この参照とダウンロードは、Open-Science **v0.32.0**スキーマを使用します。 ネストされた`input.required`リストは権威ある; `required` のレガシートップレベルのリストは、不在である可能性があります。 コンサルティング <ExampleDownload path="/examples/capabilities/connector-catalog-v0.32.0.json">完全なダウンロード可能なレジストリ</ExampleDownload> ネスト JSON スキーマ、フルリターンの説明、エージェント・サイドのコール例。 ツールが`id`、`accessions`、`cids`、または別の名前空間固有のフィールドを期待したときに、一般的な`rs_id`を渡すしないでください。


## 化学化学品 {/* #family-1 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `pubchem_search_compounds` {/* #pubchem_search_compounds */}

化学識別子(名前、SMILES、InChIKey、またはCID)をPubChem CIDに解決し、トップヒットのコア計算されたプロパティでオプションで取得します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `namespace` | 文字列 | 任意; デフォルト: "name"; エヌム: &#91;"name", "smiles", "inchikey", "cid"&#93; |
| `max_cids` | 整数 | 任意; デフォルト: 25; 最小値: 1; 最高: 100 |
| `with_properties` | 真偽値 | 任意; デフォルト: true |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds` {/* #pubchem_get_compounds */}

パブChem CIDのバッチのための完全な計算されたプロパティレコード、オプションのキャップされた同義語リスト。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `cids` | 整数の配列 | **必須**; minItems: 1; maxItems: 50の |
| `include_synonyms` | 真偽値 | 任意; デフォルト: false |
| `max_synonyms` | 整数 | 任意; デフォルト: 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search` {/* #pubchem_similarity_search */}

2D 谷本類似性は、SMILES(同期 fastsimilarity_2d ルート、ジョブポーリングなし) の全ての PubChem を検索します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `smiles` | 文字列 | **必須** |
| `threshold` | 整数 | 任意; デフォルト: 90; 最小値: 1; 最高: 100 |
| `max_records` | 整数 | 任意; デフォルト: 50; 最小値: 1; 最高: 200 |
| `with_properties` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary` {/* #pubchem_get_bioassay_summary */}

1つのPubChem化合物のBioassay活性要約 - どのターゲットに対して、どのような結果と効力でそれをテストしました。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `cid` | 整数 | **必須** |
| `active_only` | 真偽値 | 任意; デフォルト: false |
| `max_rows` | 整数 | 任意; デフォルト: 100; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety` {/* #pubchem_get_safety */}

1つのPubChemの混合物(PUG-View 'GHSの分類'のためのGHSの安全分類 見出し)、レポートソース全体で集計。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `cid` | 整数 | **必須** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search` {/* #chebi_search */}

ChEBIエンティティティ(名前、同義語、式、InChIKeys)上の全文検索。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `term` | 文字列 | **必須** |
| `max_results` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 100 |
| `page` | 整数 | 任意; デフォルト: 1; 最小値: 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity` {/* #chebi_get_entity */}

完全なChEBIの実体記録:名前、構造、化学データ、役割および交差参照。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `chebi_id` | 文字列 | **必須** |
| `max_synonyms` | 整数 | 任意; デフォルト: 30 |
| `max_xrefs` | 整数 | 任意; デフォルト: 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology` {/* #chebi_get_ontology */}

ChEBIの組織のOntologyリレーション - それが何であるか(外出:役割/コンジュゲート酸を持っています...)とそれでポイント(着信:子供/妄想)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `chebi_id` | 文字列 | **必須** |
| `relation_type` | 文字列 | オプション |
| `max_relations` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions` {/* #rhea_search_reactions */}

式テキスト、参加者ChEBI ID、EC番号(自動検出式)によるRheaマスター反応を検索します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `limit` | 整数 | 任意; デフォルト: 50; 最小値: 1; 最高: 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction` {/* #rhea_get_reaction */}

1つのレア反応のためのフルレコード:式、ChEBI IDとstoichiometry、ECリンク、方向家族と文学の参加者。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `rhea_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target` {/* #bindingdb_ligands_by_target */}

すべてのBindingDBのリガンドの結合の類縁(Ki/Kd/IC50/EC50)はUniProtのアクセスによって1つの蛋白質のターゲットに、従います。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `uniprot` | 文字列 | **必須** |
| `affinity_cutoff_nm` | 数値 | 任意; デフォルト: 10000 |
| `max_rows` | 整数 | 任意; デフォルト: 100; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound` {/* #bindingdb_targets_by_compound */}

化合物の2DシミラーをクエリSMILESに測定された親和性を持つタンパク質ターゲット — "この分子(またはその近いアナログ)は?"を結合します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `smiles` | 文字列 | **必須** |
| `similarity` | 数値 | 任意; デフォルト: 0.85; 最小値: 0.5; 最高: 1 |
| `max_rows` | 整数 | 任意; デフォルト: 100; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## 文献グラフ {/* #family-2 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `openalex_search_works` {/* #openalex_search_works */}

年/型/OA/venue フィルターが付いている OpenAlex のスカラーリーの仕事(すべての規準、~250M の記録)を捜して下さい。 Args: クエリ (title+abstract+fulltext 上でのフリーテキスト) フィルタが設定されている場合は、year_from、year_to(包括的な年)、work_type(粒子/レビュー/プレビュー/ブックチャプター/データセット/ディスサーテーション)、open_access_only、会場(S-id、openalex.org URL、ISSN、または、venue_resolvedで表されたトップソースに解決された明白な名前; 解像度をスキップするために正確なIDを渡して下さい)、分類して下さい(関連デフォルト/cited_by_count/publication_date、max_records (デフォルト50の堅い天井500; 200のページ)、include_abstracts(変換されたインデックスから復元されますが、検証済みのライセンスのみ - cc-by/cc-by-sa/cc0/public-domain; 他は抽象=null + abstract_policy ノート + abstract_license を得ます; バルクを加えて下さい)。 &#123;query、フィルタ、ソート、api_total、n_records_returned、records_truncated、レコード&#125;を返します。 各レコードは、リーンワーク形状(openalex_id、doi、pmid、title、publication_year/date、タイプ、言語、is_retracted、作者&#91;...&#93;、source&#123;...&#125;、biblio、cited_by_count、fwci、referenced_works_count、open_access&#123;...&#125;、best_oa_pdf_url、primary_topic、キーワード)です。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | オプション |
| `year_from` | 整数 | オプション |
| `year_to` | 整数 | オプション |
| `work_type` | 文字列 | オプション |
| `open_access_only` | 真偽値 | オプション |
| `venue` | 文字列 | オプション |
| `sort` | 文字列 | 任意; デフォルト: "relevance"; エヌム: &#91;"relevance"、"cited_by_count"、"publication_date"&#93; |
| `max_records` | 整数 | 任意; デフォルト: 50 |
| `include_abstracts` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work` {/* #openalex_get_work */}

OpenAlex がフルで機能する — メタデータ, 抽象 (変換されたインデックスから再構築, openalex_search_works でライセンス-gated), OA の場所, referenced_works (W-ids の外出 — openalex_references と counts_by_year で水和します。 引数: work_id (W-id, openalex.org URL, bare DOI, or doi.org URL). DOI のルックアップは、派手なフィルターによって解決します; 複数の作品が最も引用されている DOI を 1 つ共有すると、doi_claimants + doi_resolution_note が含まれます。 未知のID/DOIsの未設立を上げる。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `work_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations` {/* #openalex_citations */}

リストは、CITE に指定された作品(着信引用)を OpenAlex's 引用グラフで表示します。 Args: work_id (W-id/URL/DOI — DOIs は 1 つの余分決断の要求を要します)、分類して下さい(cited_by_count のデフォルト/publication_date/関連)、max_records (デフォルト 50、天井 500)、include_abstracts。 &#123;work_id、api_total(真のシッティングワークカウント)、n_records_returned、records_truncated、レコード&#125; (リーン作業記録)

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `work_id` | 文字列 | **必須** |
| `sort` | 文字列 | 任意; デフォルト: "cited_by_count"; enum: &#91;"cited_by_count"、"publication_date"、"relevance"&#93; |
| `max_records` | 整数 | 任意; デフォルト: 50 |
| `include_abstracts` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references` {/* #openalex_references */}

与えられた作品のCITES(外部参照)をリストし、参照リストの注文でフルメタデータに水和します。 Args: work_id (W-id/URL/DOI)、max_records (デフォルト100、天井500; 50/request をバッチ処理 &#123;work_id、n_references、n_records_returned、records_truncated、references_not_hydrated(IDs OpenAlexは、無声に落ちることはありません)、reference_ids(すべての発信W-ids)、レコード&#125;のレコードを返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `work_id` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors` {/* #openalex_search_authors */}

OpenAlex の著者のプロフィールを名前で検索します。 Args: クエリ(マッチ表示名+代替品) 期待する同種 — 所属/トピック/ORCID をチェックします。, max_records (デフォルト 25, 天井 500). &#123;query、api_total、n_records_returned、records_truncated、レコード&#125;を返します。 各レコード&#123;author_id、名前、orcid、works_count、cited_by_count、h_index、i10_index、所属&#91;&#123;institution、年&#125;&#93;、last_known_institutions、top_topics&#125;。 author_id を openalex_get_author で使用して下さい。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author` {/* #openalex_get_author */}

1 つの OpenAlex の作者プロフィールとトップ引用された作品を取得します。 引数: author_id (A-id, openalex.org URL, ORCID;) CAVEAT: OpenAlex's ORCID ポインタは、スパースの重複に解決できます。openalex_search_authors、works_sample(デフォルト10、最大200)からA-IDを好む。 0 はリクエストをスキップします。 作者レコードとcounts_by_year、top_works_total(真の合計作品数)、top_works(引用によるリーン作業記録)を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `author_id` | 文字列 | **必須** |
| `works_sample` | 整数 | 任意; デフォルト: 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info` {/* #openalex_venue_info */}

OpenAlexのジャーナル/リポジトリ('sources') - OAステータス、DOAJリスト、APC、引用メトリック。 Args: 会場(S-id、openalex.org URL、またはISSN) 他のものは名前検索です), max_records (デフォルト10, 天井500; 名称検索のみ。 リターン: 厳密な-> 1つの源の記録+ counts_by_year; 名称検索 -> &#123;query、api_total、n_records_returned、records_truncated、レコード&#125;。 ソースレコード: &#123;source_id、display_name、タイプ、issn_l、issn、host_organization、country_code、homepage_url、is_oa、is_in_doaj、is_core、apc_usd、works_count、cited_by_count、h_index、two_year_mean_citedness、最初/last_publication_year、top_topics&#125;。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `venue` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search` {/* #arxiv_search */}

arXivのプリプリント(物理、数学、CS、統計、q-bio、...)を公式のAtom APIから検索します。 Args: クエリ (arXiv クエリ文字列) プレーン用語は、すべてのフィールドを検索します。フィールドはti:/au:/abs:と booleans AND/OR/ANDNOTの作業を接頭辞します。 カテゴリまたは日付範囲が設定されている場合は、カテゴリ(arXivコードおよび-ed、例えば) q-bio.GN, cs.LG, stat.ML), date_from / date_to(寛容な日付YY-MM-DD, inclusive), スタート (0ベースのピアジングオフセット; API はリクエスト間の~3s — ページを丁寧なものにします。 max_results (デフォルトでは 25、コールあたり最大 100 )、 sort_by (関連するデフォルト/submitDate/LastUpdatedDate)、sort_order (拡張デフォルト/昇順)。 &#123;search_query(送信された正確なクエリ)、api_total(arXiv's合計マッチカウント)、start_index、n_records_returned、records_truncated、sort_by、sort_order、レコード&#125;; 各レコード&#123;arxiv_id、バージョン、id_versioned、タイトル、抽象、作者、公開、更新、primary_category、カテゴリ、doi、journal_ref、コメント、abs_url、pdf_url&#125;。 doi/journal_ref は、ジャーナルの出版物の後にのみ表示されます。 誤ったクエリはエラーを発生させます(arXiv's HTTP-200エラーフィードは、データとして返されることはありません)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | オプション |
| `category` | 文字列 | オプション |
| `date_from` | 文字列 | オプション |
| `date_to` | 文字列 | オプション |
| `start` | 整数 | 任意; デフォルト: 0 |
| `max_results` | 整数 | 任意; デフォルト: 25 |
| `sort_by` | 文字列 | 任意; デフォルト: "relevance"; &#91;"relevance"、"submittedDate"、"lastUpdatedDate"&#93; |
| `sort_order` | 文字列 | 任意; デフォルト: "descending"; enum: &#91;"descending", "ascending"&#93; |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers` {/* #arxiv_get_papers */}

バッチフェッチ arXiv 紙メタデータ (を含む) 抄録) ID — 100 用紙までのリクエストを1ペースで受ける。 引数: arxiv_ids (100 ID まで) 一般的なフォーム — 2103.14030, バージョン2103.14030v2, 古いスタイル q-bio/0601001, arXiv:-prefixed, または abs/pdf URL; 未バージョンのIDは最新バージョンに解決します)。 &#123;n_requested、n_found、重複(未返還した紙に解決する入力)、not_found(未知および誤字ID)、arXivは未知の未知をスキップし、誤字されたものよりも全体のバッチを拒絶します。 このツールは、レコード&#125; — 要求された順序の記録、arxiv_search レコードと同じ形。 ドローイング紙はメタデータを返す(退会ノートのコメントをチェックする)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `arxiv_ids` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work` {/* #crossref_get_work */}

クロスレフDOIのパブリッシャー・デポジド・メタデータを取得します。 DOI, doi: プレフィックス, doi.org URL が受け付けられます。 APIキーは必要ありません。 DOIが他の登録機関に所属している場合、マッチングサービスを利用してください。 クロスリーフ404はDOIが無効であることを証明しません。 返されたDOI、タイトル、source_urlを確認してください。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `doi` | 文字列 | **必須**; 最長: 1; 最高長さ: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates` {/* #crossref_get_updates */}

預金された訂正、引き込みおよび他の更新の関係を読んで下さい。 updated_byは、この作業を更新する通知を指す。 update_to は、この DOI によって更新される動作をポイントします。 関係方向とソースラベルを保存します。 空の配列は信頼性を確立しないか、または引き込みが存在しないことを証明しません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `doi` | 文字列 | **必須**; 最長: 1; 最高長さ: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records` {/* #datacite_search_records */}

パブリック DataCite データセット/ソフトウェア DOI メタデータを検索します。 供給のクエリ、related_doiか両方; query は DataCite クエリの構文を使用します。 next_page を追ったときに同じフィルタと page_size を保ちましょう。 Page-number retrieval は最初の 10,000 レコードに限られます。必要に応じてクエリを絞ります。 related_identifiers、権利、URLのランディングをチェックします。 メタデータは、ダウンロード可能なデータや再使用権限を保証するものではありません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | 任意; 最長: 1; 最高長さ: 2000 |
| `related_doi` | 文字列 | 任意; 最長: 1; 最高長さ: 2048 |
| `resource_type` | 文字列 | 任意; デフォルト: "dataset"; enum: &#91;"dataset"、"software"&#93; |
| `page_size` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 100 |
| `page` | 整数 | 任意; デフォルト: 1; 最小値: 1; 最高: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record` {/* #datacite_get_record */}

タイトル、クリエイター、リソースタイプ、権利、関連する識別子、利用可能なバージョンを含む1つのパブリックDataCite DOIレコードを取得します。 DOI, doi: プレフィックス, doi.org URL を受信します。 リンクされたデータセットまたはソフトウェアパッケージを使用する前に、識別子と関係の方向を確認してください。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `doi` | 文字列 | **必須**; 最長: 1; 最高長さ: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## パブメッド {/* #family-3 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `search_articles` {/* #search_articles */}

パブメッド(ビオメジカル&) NCBI esearchによるライフサイエンス文献。 PMIDsの合計マッチ数とページを返します。 PubMedフィールドタグ(&#91;Title&#93;, &#91;Author&#93;, &#91;Journal&#93;, &#91;MeSH 条件&#93;, ...), Boolean 演算子, 日付のフィルタリングとソートをサポートしています。 PubMedは、物理/CS/数学/純粋な化学論文をインデックス化しません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `max_results` | 整数 | 任意; デフォルト: 20 |
| `retstart` | 整数 | 任意; デフォルト: 0 |
| `sort` | 文字列 | 任意; エヌム: &#91;"relevance"、"pub_date"、"author"、"journal_name"、"title"&#93; |
| `date_from` | 文字列 | オプション |
| `date_to` | 文字列 | オプション |
| `datetype` | 文字列 | 任意; デフォルト: "pdat"; エヌム: &#91;"pdat", "edat", "mdat"&#93; |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata` {/* #get_article_metadata */}

PMID(バルク、efetch経由):識別子(pmid/pmc/doi)、タイトル、抄録、ジャーナル、所属、出版日、MeSH用語、記事の種類、言語および引用の著者から詳細な記事メタデータを取得します。 すべての用途で、cite PubMedとリンクとして返された記事DOIs(identifiers.doi)を含む。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **必須** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles` {/* #find_related_articles */}

関連するPubMedコンテンツを1つ以上のソースのPMIDsをNCBI elinkで見つける。 `pubmed_pubmed`(デフォルト)は、タイトル/抽象/メッシュ(NOT引用)の単語級類似性によってランク付けされた類似記事を返します。 `pubmed_pmc`は全文PMCのリンクを返します。 `pubmed_gene`/`pubmed_protein`/`pubmed_nucleotide` はリンクされたシーケンス/遺伝子の記録を戻します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **必須** |
| `link_type` | 文字列 | 任意; デフォルト: "pubmed_pubmed"; エヌム: &#91;"pubmed_pubmed", "pubmed_pmc", "pubmed_nucleotide", "pubmed_protein", "pubmed_gene"&#93; |
| `max_results` | 整数 | オプション |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation` {/* #lookup_article_by_citation */}

NCBI ecitmatch 経由で PMIDs にバイブリグラフの引用を解決します。 各引用は、&#123;journal、年、ボリューム、first_page、著者、key&#125;の一部を供給します。 2-3+ フィールドを信頼できるマッチングに提供します。 参照リストがあるとき使用し、PMIDsを必要として下さい。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `citations` | オブジェクトの配列 | **必須** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids` {/* #convert_article_ids */}

PMID、PMCID、DOIをNCBI/PMC IDコンバーター経由で変換します。 コール当たりの均質な入力 ID (`id_type` をセットしてマッチします)。 PMID が PMCID を持っているかどうかをよく確認するために使われます。 get_full_text_article を呼び出す前に、PMC で完全なテキストを呼び出します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `ids` | ['string', 'array'] | **必須** |
| `id_type` | 文字列 | 任意; デフォルト: "pmid"; enum: &#91;"pmid", "pmcid", "doi"&#93; |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article` {/* #get_full_text_article */}

欧州PMCによるパブメッドセントラルからオープンアクセスフルテキストを取得("PMC12345") または " 12345"。 構造化されたセクションテキストとライセンスを返します。 完全なテキストが利用できなくなった場合、その理由は明示的に報告されます(fulltext_status)。 OA-subsetの記事のみ、完全なテキストを取得できます。 すべての用途で、cite PubMed と返された記事 DOIs をリンクとして含めます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pmc_ids` | ['string', 'array'] | **必須** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status` {/* #get_copyright_status */}

著作権・ライセンス状況を報告する PMID パブフィードの著作権情報、PMC ID コンバーターを組み合わせること()PMID - - - -> PMCID/DOI および PMC &lt;permissions> ブロック(ライセンスタイプ、ALIライセンスURL、著作権表示/年)。 コンテンツを再生成する前に、オープンアクセス再利用権をチェックするために使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **必須** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## ジャンル & オントロジー {/* #family-4 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `query_genes` {/* #query_genes */}

mygene.info (batched、1000 条件/要求まで) を介して gene 識別子/シンボルを解決します。 遺伝子のシンボルをマップして、遺伝子のID、エントルツID、名前、その他のmygene.infoフィールドをアンサンブルするために使用します。(例:入力条件の名前空間に`scopes`を設定) "entrezgene"、"ensembl.gene"、"symbol、alias")。 引数: 条件(クエリー条件、例えば) &#91;"TP53"、"BRCA1"&#93;; commasを含む用語はサポートされていません。 スコープ(コンマ区切りの識別子の名前空間で、条件にマッチする)。 フィールド(コンマ区切りのmygeneフィールドを返し、または"all"); 種(一般的な名前 "human"/"mouse" またはNCBIタクシー &#123;n_input、n_records、not_found、レコード&#125;を返します。 いくつかの遺伝子をマッチングする用語は、いくつかのレコードを収穫します(それぞれ、`query`を運ぶ)。 レコードは決定的に注文されます(入力順、その後_id)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `terms` | 文字列の配列 | **必須** |
| `scopes` | 文字列 | オプション |
| `fields` | 文字列 | 任意; デフォルト: "symbol、名前、taxid、entrezgene、ensembl.gene" |
| `species` | 文字列 | オプション |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies` {/* #list_ontologies */}

EBIオントロジールックアップサービス(OLS4)でオントロジーを一覧表示します。 とりあえず `ontology_ids` (例) &#91;"efo"、"cl"、"chebi"、"go"、"mondo"&#93;): それらの正当性のためのフェッチ構造メタデータレコード; `not_found` で未知の ID が報告されています。 なし:完全な OLS4 のカタログ(~250 の正当性、paginated 十分におよびカウント 検証される)。 &#123;records:&#91;&#123;ontology_id、タイトル、バージョン、ステータス、num_terms、...&#125;&#93;、not_found:&#91;...&#93;&#125; IDリスト、または&#123;records:&#91;...&#93;、total_elements、完全&#125; 完全なカタログのため。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `ontology_ids` | 文字列の配列 | オプション |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms` {/* #search_ontology_terms */}

1 つ以上の OLS4 のオントロジーを渡るラベル/匿名で ontology 用語を検索します。 一般的な用途:疾患名(ontology=&#91;"efo"&#93;)、細胞型細胞腫瘍学用語(&#91;"cl"&#93;)、化学用ChEBI用語(&#91;"chebi"&#93;)、名称別GO用語(&#91;"go"&#93;)、または一度にすべての腫瘍学を検索します。 Args: クエリ(用語集、同義語、または識別子) オントロジー(IDを制限する) どれもすべての腫瘍学を検索しませんか。 厳密な(全弦のマッチ); include_obsolete (デフォルトは偽); max_results(OLS関連) &#123;query、total_found、n_returned、tuncated、条件:&#91;&#123;curie、iri、ラベル、short_form、ontology、説明、タイプ、is_defining_ontology&#125;&#93;&#125;。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `ontologies` | 文字列の配列 | オプション |
| `exact` | 真偽値 | 任意; デフォルト: false |
| `include_obsolete` | 真偽値 | 任意; デフォルト: false |
| `max_results` | 整数 | 任意; デフォルト: 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term` {/* #get_ontology_term */}

1つのオントロジーの用語'sの詳細、または完全な関連する用語セットを取得します。 `relation=None`: 完全な用語記録(ラベル、同義語、説明、obsolete フラグ、直接親)。 関係:COMPLETE、関連する用語の完全ペジネーションセットなど。 関係="hierarchicalChildren" 直接子供向け(子供向け) part_of 等、"descendants"/"hierarchicalDescendants" 全サブツリー、"ancestors"/"hierarchicalAncestors"、"parents"、"children"のため。 API's の合計に対して、リトリバルがカウントアップされます。 アーグ: オントロジー(lowercaseなど) "efo"、"go"、"cl"、"chebi"); term_id (CURIE "EFO:0000305"/"GO:0006281" または完全な IRI; 関係(いずれかまたはリストの1つ)。 include_parents (関係が None の場合の直接親の ref を含む)。 戻り値:リレーション=なし&#123;curie、アイリ、ラベル、オントロジー、short_form、同義語、説明、is_obsolete、has_children、両親&#125;; それ以外の場合は、&#123;root、関係、total_elements、term_count、条件:&#91;...&#93;&#125;。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `ontology` | 文字列 | **必須** |
| `term_id` | 文字列 | **必須** |
| `relation` | 文字列 | 任意; enum: &#91; &#93;"両親", , "お子様", , "先輩たち", , "子孫子", , "hierarchicalParents(階層)", , "hierarchicalChildren(アーキラル・キルデントレン)", , "hierarchicalAncestors(階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階層階", , "hierarchicalDescendants(アーキシャル・デッセンド)". . . |
| `include_parents` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations` {/* #get_go_annotations */}

UniProt 遺伝子製品を QuickGO から取得します。 (完了、カウント検証済み)。 アーグ: uniprot_accession (例) "P04637"のプレフィックス任意); アスペクト(biological_process/molecular_function/cellular_componentの全ての側面の省略)。 証拠(なし/オール、プリセット"experimental_manual"=マニュアル的に割り当てられた実験的証拠、"automatic_iea"=電子/IEA、または"ECOのような明示的なECOコード:0000314"; IDA/IEAのような3文字GOの証拠コードは受け入れられません - QuickGOは静かにgoEvidenceを無視します、フィルターはECOコードを使用する必要があります); taxon_id (任意NCBIの納税者、例えば。 9606); include_term_names (GO 用語名/アスペクト/オブスポレートを 1 つのバッチオントロジールックアップで各レコードを水和させます)。 max_records (レコードのキャップ) フルセットは、まだ取得し、要約しました。 `truncated` はキャップをフラグします。 &#123;gene_product、total_annotations、n_records、完全な、truncated、distinct_go_ids (すべてのアノテーションを渡る)、レコード:&#91;&#123;go_id、go_aspect、修飾語、go_evidence、eco_id、参照、assigned_by、日付、...&#125;&#93;&#125;。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `uniprot_accession` | 文字列 | **必須** |
| `aspect` | 文字列 | 任意; エヌム: &#91;"biological_process", "molecular_function", "cellular_component"&#93; |
| `evidence` | 文字列 | オプション |
| `taxon_id` | 整数 | オプション |
| `include_term_names` | 真偽値 | 任意; デフォルト: false |
| `max_records` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `search_uniprot_entries` {/* #search_uniprot_entries */}

正確な遺伝子名(同義語を含む)、タンパク質名句および/または正確なorganism_id(NCBIの分類ID、下降者ではない)による活性UniProtKBタンパク質エントリを発見してください。 これらのフィルタの少なくとも1つが必要です。 供給されたフィルターは AND と結合されます。 オプションの reviewed=true は、スイス・プロット、偽は TrEMBL を選択します。 省略すると、両方とも表示されます。 生物がないか、またはデフォルトを見直しません。 テキストは、UniProt トークン化フレーズマッチング、任意のサブ文字列マッチングや未加工クエリ構文ではなく使用します。 引用符、バックスラッシュ、ワイルドカード、制御文字は拒否されます。 完全なタンパク質セットではなく、アクセス順序で1つの境界ページを返します。 次のページでは、next_cursor を同一のフィルタと page_size でカーソルとして渡します。 カーソルは不透明で、オフセットや耐久性のあるスナップショットではありません。 UniProt がストールカーソルを拒否した場合、再起動します。

少なくとも1つにリストされた調査フィルターを供給して下さい; ダウンロード可能なスキーマに、コンビネーションルールを完全適用します。

| 受け入れられた値 | 型 | 要件と制約 |
| --- | --- | --- |
| `gene` | 文字列 | 任意; 最長: `1`; 最高長さ: `200`; パターン: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `protein_name` | 文字列 | 任意; 最長: `1`; 最高長さ: `200`; パターン: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `organism_id` | 整数 | 任意; 最小値: `1`; 最高: `2147483647` |
| `reviewed` | 真偽値 | オプション |
| `page_size` | 整数 | 任意; デフォルト: `25`; 最小値: `1`; 最高: `500` |
| `cursor` | 文字列 | 任意; 最長: `1`; 最高長さ: `4096`; パターン: `"^[^\\s\\u0000-\\u001f\\u007f]+$"` |

```javascript
const result = await host.mcp("genes", "search_uniprot_entries", {"gene": "TP53", "organism_id": 9606, "reviewed": true, "page_size": 25})
```

### `get_uniprot_entries` {/* #get_uniprot_entries */}

Fetch UniProtKB は、プライマリまたはセカンダリアクセスの一覧 (最初にOR-queries を固定) レコードに記録します。 unresolvedエイリアスは、直接アクセスされたフォールバックを使用します。 3つのモード:`fields`が与えられた → トークンリーン タブリーガル のみのUniProtフィールド (例:) &#91;"accession","id","protein_name","gene_names","organism_name","長さ","シーケンス"&#93;); `format` は無視されます。 format="fasta" → パーアクセス FASTA シーケンス. format="txt" → パーアクセスフルUniProt フラットファイルテキスト (完全なアノテーション; `fields`を好みます非常に大きい場合もあります。 引数: アクセス(例:アクセス) &#91;"P04637"、"P38398"&#93;); フォーマット("fasta"/"txt")、`fields` が与えられたとき無視される; フィールド(オプションのUniProt REST フィールド名(表モード))。 戻り値: フィールドモード &#123;accessions、フィールド、n_records、レコード:&#91;&#123;&lt;column>:value&#125;&#93;&#125;; fasta/txt モード &#123;accessions、フォーマット、n_found、欠落、レコード:&#123;accession:text&#125;&#125; — `missing` は、アクセス UniProt がレコードを返さないリストをリストします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accessions` | 文字列の配列 | **必須** |
| `format` | 文字列 | 任意; enum: &#91;"fasta", "txt"&#93; |
| `fields` | 文字列の配列 | オプション |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `map_reactome_pathways` {/* #map_reactome_pathways */}

遺伝子のシンボルまたはUniProtアクセスをReactomeパスウェイ(AnalysisServiceトークンワークフロー)にマップします。 引数:識別子(id_type="symbol"、"uniprot"の場合のUniProtアクセス)。 重複なし。 id_type ("symbol"/"uniprot"); 種 (デフォルト "Homo sapiens"); リソース(分析サービス分子リソースビュー "TOTAL" デフォルト; "UNIPROT"の特長 タンパク質レベルのマッピングを制限します。 include_disease (サービスのデフォルトは本当); コンパクト(True → 識別子 低レベル パスウェイのみ &#123;stId,name,species&#125; + reactomeリリースバージョン; 偽 → 完全な決定的な結果: 実体/反応統計(p-値、FDR、見つかり/合計)とバッチサマリー(含む)のパー識別子の完全なパスウェイセット identifiers_not_found). 戻り値:&#123;tool、reactome_version、id_type、種、n_input、遺伝子:&#123;identifier:&#123;found、n_lowlevel_pathways、pathways&#125;&#125;&#125;; パスウェイの統計とbatch_summaryをフル追加します。 要求された種に渡る識別子をマッピングし、それらを人間に写し出さない。 `Homo sapiens` や `Mus musculus` など、サポートされている科学名を使用してください。 ダウンロード可能なスキーマは、サポートされているすべての名前をリストします。 空、未サポート、または不一致の種は誤りです。 `found` と `n_found` は、識別子の認識を示し、パスウェイのメンバーシップではありません。認識された識別子はゼロパスウェイを持つことができます。 コンパクトモードは、低レベルな経路のみが格納されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `identifiers` | 文字列の配列 | **必須** |
| `id_type` | 文字列 | **必須**; enum: &#91;"symbol"、"uniprot"&#93; |
| `species` | 文字列 | 任意; デフォルト: "Homo sapiens" |
| `resource` | 文字列 | 任意; デフォルト: "TOTAL" |
| `include_disease` | 真偽値 | 任意; デフォルト: true |
| `compact` | 真偽値 | 任意; デフォルト: true |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources` {/* #list_enrichment_sources */}

g:Profiler の濃縮源および 1 つの生物のための現在のデータ版をリストして下さい。 出典は、GO:BP、GO:MF、GO:CC、KEGG、Reactome、WikiPathwaysなどの名前空間が組み込まれています。 g:プロファイラーはサービス操作のための限られた照会のメタデータを保存します; この読み取り専用検索は、遺伝子リストを提出しません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `organism` | 文字列 | **必須**; 最長: `1`; 最高長さ: `64`; パターン: `"^[a-z][a-z0-9_]*$"` |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set` {/* #enrich_gene_set */}

実行 g:プロファイラー g:GOSt は、GO、Reactome、KEGG、WikiPathways、およびその他の生物がサポートされているソースにセットする遺伝子の充実を促進します。 明示的な生物、カスタム統計背景、アンダー表現テスト、およびg:Profilerの複数のテストの訂正を支えて下さい。 未マッピング、あいまい、および重複識別子は、無声に捨てられる代わりにメタデータで返されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `genes` | 文字列の配列 | **必須**; minItems: 1; maxItems: 5000の |
| `organism` | 文字列 | **必須**; 最長: `1`; 最高長さ: `64`; パターン: `"^[a-z][a-z0-9_]*$"` |
| `sources` | 文字列の配列 | 任意; maxItems: 100の |
| `background_genes` | 文字列の配列 | 任意; minItems: 1; maxItems: 20000の |
| `domain_scope` | 文字列 | 任意; エヌム: &#91;"annotated"、"known"、"custom"、"custom_annotated"&#93; |
| `correction_method` | 文字列 | 任意; デフォルト: "g_SCS"; エヌム: &#91;"g_SCS"、"bonferroni"、"fdr"&#93; |
| `user_threshold` | 数値 | 任意; 最高: 1; 排他的な最小限: 0 |
| `all_results` | 真偽値 | 任意; デフォルト: false |
| `ordered` | 真偽値 | 任意; デフォルト: false |
| `measure_underrepresentation` | 真偽値 | 任意; デフォルト: false |
| `no_iea` | 真偽値 | 任意; デフォルト: false |
| `no_evidences` | 真偽値 | 任意; デフォルト: false |
| `numeric_ns` | 文字列 | 任意; 最長: 1; 最高長さ: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## ゲノム {/* #family-5 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `blast_submit` {/* #blast_submit */}

核種またはタンパク質のシーケンスを、非同期類似性検索のためのNCBI BLASTサービスに提出してください。 A/C/G/T のみのタンパク質があいまいにしているので、molecule_type を明示的に設定します。 RIDとサーバーの推定値を返します。 blast_status を 1 分に 1 回以上、READY の後の blast_results に電話をかけて下さい。 NCBIに送られ、ローカルにキャッシュされていないシーケンス。 送信された応答がblast_submission_unknownを上げ、自動的に取得されてはならない。 少なくとも10秒ですべてのBLASTリクエストと、少なくとも60秒で同じRIDのすべてのリクエストをスペース化します。 再起動後にRIDを再開するようにしてください。 NCBIは一般的に36時間の結果を保持します。 これは削除保証ではありません。 キャンセル、アプリの終了およびアンインストールは、ローカルリクエストのみを停止します。 このAPIは、リモートキャンセル/削除操作を文書化していません。 ジョブレジストリまたは結果キャッシュは追加されません。 通常の会話/ノートブックの永続性は、入力と出力を保持する可能性があります。

| 受け入れられた値 | 型 | 要件と制約 |
| --- | --- | --- |
| `sequence` | 文字列 | **必須**; 最長: `1`; 最高長さ: `100000` |
| `molecule_type` | 文字列 | **必須**; エヌム: `["nucleotide", "protein"]` |
| `database` | 文字列 | 任意; エヌム: `["nt", "core_nt", "refseq_rna", "nr", "refseq_protein", "swissprot"]` |
| `evalue` | 数値 | 任意; 排他的な最小限: `0`; 最高: `1000` |
| `hitlist_size` | 整数 | 任意; 最小値: `1`; 最高: `100` |
| `megablast` | 真偽値 | オプション |

```javascript
const result = await host.mcp("genomes", "blast_submit", {"sequence": "ATGCGTACGTAGCTAG", "molecule_type": "nucleotide", "database": "nt"})
```

### `blast_status` {/* #blast_status */}

NCBI BLAST RIDを一度にチェックしてください。 これは、単一のsearchInfoリクエストであり、決して投票や待機しません。 NCBI ガイダンスを尊重して、チェック間で少なくとも 60 秒を待ちます。 WAITING、READY、FAILED、UNKNOWN(未知・期限切れのRID)を返します。 少なくとも10秒と同じRIDリクエストによるすべてのBLASTリクエストを、結果の検索結果を含む、少なくとも60秒。

| 受け入れられた値 | 型 | 要件と制約 |
| --- | --- | --- |
| `rid` | 文字列 | **必須**; 最長: `1`; 最高長さ: `128` |

```javascript
const result = await host.mcp("genomes", "blast_status", {"rid": "AYEFB4DT014"})
```

### `blast_results` {/* #blast_results */}

NCBI BLAST RID のバインドされた結果。 ジョブがまだ待機しているときに、refable=false を 1 つのリクエストで返します。 blast_status のレポート READY の後の json2、xml2、テキスト、または表形式の出力を選択します。 結果は2 MiBと返された動詞で捕捉されます。 表は、NCBIテキスト+ ALIGNMENT_VIEW=Tabularを意味します。これは、HTMLコメント、Preタグ、およびレポートヘッダーを含むことができます。 それは純粋なTSVかCSVではないです。 blast_statusを含むこのRIDの最後のリクエストの後、少なくとも60秒待ってください。 自動レトリーはありません。

| 受け入れられた値 | 型 | 要件と制約 |
| --- | --- | --- |
| `rid` | 文字列 | **必須**; 最長: `1`; 最高長さ: `128` |
| `format` | 文字列 | 任意; エヌム: `["json2", "xml2", "text", "tabular"]` |

```javascript
const result = await host.mcp("genomes", "blast_results", {"rid": "AYEFB4DT014", "format": "json2"})
```

### `ensembl_lookup` {/* #ensembl_lookup */}

遺伝子、トランスクリプト、またはタンパク質を安定的なID、またはシンボルによる遺伝子を調べます。 クエリは、ENS ID(バージョンアップ)、FlyBase/WormBase/yeast ID、BRAFなどのシンボルを受け入れます。 query_type: 自動 (デフォルト) は ID を最初に試し、入力がcanonical ENS/LRG ID でなければ、明示的な不在だけを象徴します; ID は ID の調査だけを使用します; シンボルは、バージョン正規化なしでシンボルルックアップのみを使用します。 種は、シンボルルックアップ(デフォルトhomo_sapiens)にのみ適用され、劣らない。 展開には、トランスクリプト、エクスン、翻訳(デフォルト false)が含まれます。 無効なリクエストとサービスの失敗はエラーを発生させます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `query_type` | 文字列 | 任意; デフォルト: "auto"; enum: &#91;"auto"、"id"、"symbol"&#93; |
| `species` | 文字列 | 任意; デフォルト: "homo_sapiens" |
| `expand` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs` {/* #ensembl_xrefs */}

アセンブリの安定した ID の外部の相互参照 — 遺伝子/トランスクリプト ID を HGNC、NCBI (EntrezGene)、UniProt、OMIM、RefSeq、Expression Atlas などの橋。 Args: stable_id (ENSG.../ENST...、受け入れられるバージョン); external_db (任意厳密な上流データベース名フィルター、例えば。 HGNC、EntrezGene、Uniprot_gn、MIM_GENE、RefSeq_mRNA; 全て省略します。 &#123;stable_id、external_db、n_xrefs、xrefs&#125;を返す — COMPLETE リスト (tuncated), ソート (dbname, primary_id); &#123;dbname、db_display_name、primary_id、display_id、説明、同義語、info_type&#125;。 不明なIDは n_xrefs:0 を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `stable_id` | 文字列 | **必須** |
| `external_db` | 文字列 | オプション |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant` {/* #ensembl_vep_variant */}

`variant_id` が指定されると ID 検索が優先され、`region`、`allele`、`allele_orientation` は無視されます。`allele` で ID 検索結果を絞り込むことはできません。領域検索は対象種の現在の参照ゲノム（ヒトでは GRCh38）を使います。座標は 1 始まりで両端を含み、挿入では `start = end + 1` とします。`allele_orientation` の既定値は `forward` で、領域に `:-1` が付いていてもアレルを参照ゲノムの正鎖として解釈します。`region` を指定した負鎖領域の配列アレルは、送信前に逆相補配列へ変換されます。負鎖領域の記号アレルには `forward` が必要です。領域検索は常に正鎖で送信され、`normalization` に変換前後の入力が残ります。座標のゲノム間変換や反転は行いません。遺伝子が負鎖にあっても、入力を負鎖にする必要はありません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `variant_id` | 文字列 | オプション |
| `region` | 文字列 | オプション |
| `allele` | 文字列 | オプション |
| `allele_orientation` | 文字列 | 任意; デフォルト: `forward`; エヌム: `forward`, `region` |
| `species` | 文字列 | 任意; デフォルト: "homo_sapiens" |
| `max_consequences` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology` {/* #ensembl_homology */}

アンサンブル・コンパラ(結行 — 配列/シーケンスなし)の遺伝子の整形またはパラログ。 引数: gene_symbol (`species` の安定した ID に最初に解決される; gene_symbol/gene_idの1つを正確に渡して下さい; gene_id (ENSG...); homology_type (orthologuesのデフォルト/パラログ/プロジェクト); target_species (1つの種に制限)。 target_taxon(NCBIタムオンサブツリー、例えば 9443 プライマー。 target_species、またはセマンティクスと併用可能。 種(ソース種、デフォルトhomo_sapiens); max_homologies (列の帽子のデフォルト200; n_total は完全なカウントを、homologies_truncated は帽子をフラグします)。 &#123;gene_id、gene_symbol、種、homology_type、target_species、target_taxon、n_total、homologies_truncated、homologies&#125;を返します。 &#123;タイプ、種、ID、protein_id、taxonomy_level、method_link_type&#125;でソートされた行。 Quirk: /homology/symbol のルートは、このツールは、常に安定した ID によってシンボル自体とクエリを解決します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | オプション |
| `gene_id` | 文字列 | オプション |
| `homology_type` | 文字列 | 任意; デフォルト: "orthologues"; enum: &#91;"orthologues", "paralogues", "projections"&#93; |
| `target_species` | 文字列 | オプション |
| `target_taxon` | 整数 | オプション |
| `species` | 文字列 | 任意; デフォルト: "homo_sapiens" |
| `max_homologies` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence` {/* #ensembl_sequence */}

安定した ID (gene/transcript/protein) またはゲノム地域によるエンサンブルからのフェッチシーケンス。 EITHER stable_id または地域を渡して下さい。 アーグ: stable_id (ENSG.../ENST.../ENSP...、バージョンアップ)。 地域(1ベースの包括的なクロム:start.end または chrom:start-end、GRCh38 for Human、max 10Mb); 種(地域ルート、デフォルトhomo_sapiens)。 安定した ID を無視します。 seq_type (ID ルート: ゲノム デフォルト/cdna/cds/protein; ゲノムを常に戻す地域には無視されます。 このツールは、複数のシーケンスに解決する遺伝子レベルのcdna/cds/proteinリクエストに対して、代わりにトランスクリプト/タンパク質の安定したIDを指定します。 max_bytes (ペイロードガードデフォルト400000 — より大きいシーケンスは`seq`を省略しました; length/sha256/metadata は、常に返されます。 max_bytes を大きいテキストにリコールします。 &#123;found、クエリ、seq_type、id、説明、分子、長さ、sha256、seq&#125;を返す — 分子によって暗示される単位の長さ(dna、蛋白質のための残余のための基盤); seq は、キャップ時に seq_omitted に置換されます。 見つかりました: 明示的に確認されていないように要求された安定した ID を報告するときにのみ、null フィールドで偽造します。 複数のシーケンス要求、非互換シーケンスタイプ、およびその他の上流失敗はエラーを発生させます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `stable_id` | 文字列 | オプション |
| `region` | 文字列 | オプション |
| `species` | 文字列 | 任意; デフォルト: "homo_sapiens" |
| `seq_type` | 文字列 | 任意; デフォルト: "genomic"; エヌム: &#91;"genomic"、"cdna"、"cds"、"protein"&#93; |
| `max_bytes` | 整数 | 任意; デフォルト: 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region` {/* #ensembl_overlap_region */}

リストアンサンブルは、遺伝子、トランスクリプト、規制機能(enhancers/promoters)、繰り返し、バリアント、カロヨタイプのバンドを重ねています。 アーグ:地域(1ベースの包括的なクロム:start-end GRCh38、例えば。 7:140719327-140925199; 上流は、> 5Mbをスパンで拒否します。 — 大きい分割します。 機能(遺伝子のデフォルト/トランスクリプト/exon/cds/regulatory/motif/repeat/variation/structural_variation/band/simple/misc); 種 (デフォルト homo_sapiens); max_features (列の帽子のデフォルト500; n_total は、完全な重複数、features_truncated はキャップをフラグします)。 &#123;region、種、機能、n_total、features_truncated、機能&#125;を返します。 (スタート、ID) でソートします。 列形状が異なります — 遺伝子 &#123;id、external_name、バイオタイプ、説明、開始、終了、ストランド、canonical_transcript、...&#125;; 規制&#123;id、説明、開始、終了、extended_start /エンド、...&#125;。 空の領域はn_total:0を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `region` | 文字列 | **必須** |
| `feature` | 文字列 | 任意; デフォルト: "gene"; enum: &#91; &#93;"ジェネレーション", , "トランスクリプト", , "エクセゾン", , "cdsの", , "規制当局", , "モティフ", , "リピート", , "バリエーション", , "structural_variation", , "バンド", , "シンプル", , "ログイン". . . |
| `species` | 文字列 | 任意; デフォルト: "homo_sapiens" |
| `max_features` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon` {/* #ncbi_resolve_taxon */}

NCBIの分類識別子に種または税名を分離します。 科学的/一般的な名前または数値の納税を受諾する。 すべての上流マッチを返すので、曖昧な名前は最初の結果に無声に割り当てられません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須**; 最長: 1; 最高長さ: 200 |
| `max_matches` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info` {/* #ncbi_get_assembly_info */}

税務、アセンブリ名、UCSCの同義語、ステータス、および組まれたRefSeq/GenBankのアクセシジョンを含むバージョン化されたGCF/GCAアクセスのための正確なNCBIゲノムアセンブリIDを返します。 再現性や種々の互換性の誤りを防ぐため、バージョンレスなアクセスを拒否します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `assembly_accession` | 文字列 | **必須**; パターン: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases` {/* #ncbi_get_sequence_aliases */}

リストシーケンス名と正確なUCSC/RefSeq/GenBank エイリアスが1つのバージョンのNCBIアセンブリの. オプションで1つのシーケンス名を解決します。 巨大な共有染色体ラベルは、アルトまたは非ローカライズされた足場を選ぶ代わりに、複数のマッチとして保持されます。 結果は、max_sequences(デフォルト200)によって制御される境界接頭辞です。 全アセンブリレポートが必要な場合は、より大きなキャップを使用してください。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `assembly_accession` | 文字列 | **必須**; パターン: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |
| `sequence` | 文字列 | 任意; 最長: 1; 最高長さ: 200 |
| `max_sequences` | 整数 | 任意; デフォルト: 200; 最小値: 1; 最高: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks` {/* #ucsc_list_tracks */}

UCSCゲノムブラウザアセンブリ(リーフトラックのみ — クエリ可能なもの)で利用可能なデータトラックを一覧表示し、オプションでフィルタリングします。 引数: genome (hg38 default/hg19/mm39/danRer11/... ~220アセンブリ; filter_text (例: 名前/短く/長いラベル上の大文字を区別する小文字) phyloP、TFBS、ClinVar; hg38 は ~24k の葉のトラックをリストするために省略します。, ほとんど常にフィルターをしたいです。; max_tracks (列の帽子のデフォルト200; n_total は、完全なマッチカウントを、tracks_truncated はキャップをフラグします)。 &#123;genome、filter_text、n_total、tracks_truncated、tracks&#125;を返す トラック名でソート。 各行 &#123;track、short_label、long_label、タイプ、グループ、parent&#125;。 `track` を ucsc_track_data で使用して下さい。 Quirk: genome による最初の呼び出しは、~17MB の完全リストをダウンロードし、プロセスのためにそれをキャッシュします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `genome` | 文字列 | 任意; デフォルト: "hg38" |
| `filter_text` | 文字列 | オプション |
| `max_tracks` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data` {/* #ucsc_track_data */}

ucsc_conservation / ucsc_tfbs_clusters(遺伝子追跡、ClinVar、GWASカタログ、CpG島、繰り返し、...)の背後にある一般的なエスケープハッチ - 地域内のUCSCゲノムブラウザトラックの生行をフェッチします。 引数: 追跡 (ucsc_list_tracks から名前を、例えば。 既知のGene、cpgIslandExt、cinvarMain; chrom (chr-prefixed、chr7/chrX — UCSC はプレフィックスが必要です)。 スタート(0ベースハーフオープン) 1ベースの起動は、ここで1を起動します。 終了(排他的)。 ゲノム (デフォルト hg38); max_rows (API maxItemsOutput、デフォルト1000; truncated は、API's 独自の maxItemsLimit フラグを反映しています。 &#123;genome、トラック、クロム、開始、終わり、track_type、items_returned、truncated、行&#125; —上流の形の列(BED-like &#123;chrom、chromStart、ChromeEnd、名前、スコア、...&#125;; wiggle &#123;start, end, value&#125;. 未知のトラックが上がります。 Quirk: いくつかの巨大なトラックでは、API キャップ自体とポイントを出力します。 dataDownloadUrl — 現時点で echoed。 座標は、`end > start`で非負の安全な整数でなければなりません。 無効な値は、他のローカスに丸めまたはクランプされない、拒否されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `track` | 文字列 | **必須** |
| `chrom` | 文字列 | **必須** |
| `start` | 整数 | **必須**; 最小値: 0; 最高: 9007199254740991 |
| `end` | 整数 | **必須**; 最小値: 0; 最高: 9007199254740991 |
| `genome` | 文字列 | 任意; デフォルト: "hg38" |
| `max_rows` | 整数 | 任意; デフォルト: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation` {/* #ucsc_conservation */}

UCSC phyloP / phastConsトラック(マルチスペクシーアライメント上のベース・ワイズ・アライメント)から地域のための進化的保存要約。 アーグ: クロム(chr-prefixed)。 開始(0ベースのハーフオープン)。 終了 (排他的; スパンは100000 bpでおおわれた — より大きい割れ目); ゲノム (デフォルト hg38); トラック(任意; デフォルトは、他のゲノムのhg19とphyloP100wayのphyloP100wayの全ての値です。 肯定的な = 保存, ネガティブ = 速い進化; 代替hg38 phastCons100way、phyloP30way、phastCons30way、phyloP447way、phyloP470way; hg19 phastCons100way; include_values(また、ベース&#123;start、end、value&#125;ごとのリターン) max_values、values_truncated でおおわれた行は帽子を旗付けます; デフォルト false = 要約のみ。 max_values (ベースキャップのデフォルト2000)。 &#123;genome、トラック、クロム、開始、端、span_bp、n_bases_covered、coverage_fraction、平均、分、max&#125; (+values, values_truncated をリクエストすると) 各行のベーススパンで重み付けされた状態、ウィンドウに切り込みます。 coverage_fractionを下げる未発見ベースは、ゼロスコアリングではありません。 非スコアは上昇を追跡します; アップストリームを回転させる行リストも上げます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `chrom` | 文字列 | **必須** |
| `start` | 整数 | **必須**; 最小値: 0; 最高: 9007199254740991 |
| `end` | 整数 | **必須**; 最小値: 0; 最高: 9007199254740991 |
| `genome` | 文字列 | 任意; デフォルト: "hg38" |
| `track` | 文字列 | オプション |
| `include_values` | 真偽値 | 任意; デフォルト: false |
| `max_values` | 整数 | 任意; デフォルト: 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters` {/* #ucsc_tfbs_clusters */}

ENCODEのトランスクリプション・ファクター・バインディング・サイト・クラスターは、地域(ChIP-seqピーク・クラスターは数百種類のセルタイプを越える)をオーバーラッピングします。 アーグ: クロム(chr-prefixed)。 開始(0ベースのハーフオープン)。 終了(排他的)。 genome (hg38 デフォルトのトラック encRegTfbsClustered ENCODE 3、または hg19 wgEncodeRegTfbsClusteredV3; 他のアセンブリは上がります; max_rows (APIのmaxItemsOutputのデフォルト1000; truncated は maxItemsLimit を反映しています。 &#123;genome、トラック、クロム、開始、端、items_returned、truncated、n_factors、要因、クラスター&#125;を戻して下さい — クラスターは (chromStart,name) &#123;name (TF 記号 e.g.) でソートします。 CTCF), クロム, クロムスタート, クロームエンド, スコア (0-1000), ソースカウント (実験をサポートする)&#125;; 要因は、明確なTFリストです。 スコア>=~600および高いsourceCount~の堅牢な結合。 座標は、`end > start`で非負の安全な整数でなければなりません。 無効な値は、他のローカスに丸めまたはクランプされない、拒否されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `chrom` | 文字列 | **必須** |
| `start` | 整数 | **必須**; 最小値: 0; 最高: 9007199254740991 |
| `end` | 整数 | **必須**; 最小値: 0; 最高: 9007199254740991 |
| `genome` | 文字列 | 任意; デフォルト: "hg38" |
| `max_rows` | 整数 | 任意; デフォルト: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes` {/* #ucsc_chrom_sizes */}

UCSCアセンブリの染色体/コンチグ名とサイズ - 座標および反復地域を検証します。 引数: genome (デフォルト hg38); filter_text (例: 名前のケース・インセンティブ・サブストリング) chr1; すべてのために省略 — hg38 は 711 のシーケンスを持っています。, 主に alt/random/unplaced; 第一次染色体ソート最初に; max_chroms (列の帽子のデフォルト100; n_total は、フルポストフィルタカウント、chroms_truncated はキャップをフラグします)。 &#123;genome、filter_text、chrom_count(API)、n_total、chroms_truncated、染色体:&#91;&#123;name、size_bp&#125;&#93;&#125; サイズ降下でソートします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `genome` | 文字列 | 任意; デフォルト: "hg38" |
| `filter_text` | 文字列 | オプション |
| `max_chroms` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

</ToolOperationGroup>

## バリアント {/* #family-6 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

**gnomAD 座標ルール:**は参照アセンブリが付いているデータセット ピンを記録します。 r2.1/ExAC および r3/r3 の GRCh38 のための短variant の遺伝子/region の照会の使用 GRCh37; 構造的variant 遺伝子のクエリは、`gnomad_sv_r2_1` (GRCh37) または `gnomad_sv_r4` (GRCh38) を使用します。 ピンの変更は入力座標を変換しません。 `gene_constraint`とgnomAD ClinVarミラーは、固定GRCh38遺伝子のルックアップを使用し、データセットの引数を受け入れません。 Mitochondrial のクエリは、固定の GRCh38 の親のルックアップも使用します。 遺伝子または両方の注文された領域の境界線のいずれかを供給します。, 決して両方のモード. 1 から 999,999,999 までの領域の境界は整数でなければなりません。 ワンミリオンベースの差分は、`region_variants`に適用されます。 別のミトコンドリアリミットではありません。 リリース固有の構造変数 ID を独自の SV データセットで保持します。

### `get_variant` {/* #get_variant */}

ID で 1 つの gnomAD の短い variant を探し、全体的な exome/genome の頻度を戻して下さい。 `variant_id`は、データセットのリファレンスビルド(r3/r4、r2.1/ExAC用GRCh37用GRCh38)の`chrom-pos-ref-alt`です。 `19-44908822-C-T` (APOE rs7412); `search_variants` を使って rsID を最初に解決します。 先祖固有のカウント/周波数が個々のバリアントに必要なときに `include_populations: true` を設定します。 周波数を解釈するときのデータセット、allele カウントおよび品質フィルターを保持します。 rarity 単独では病原性や ACMG の基準を設けていません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `variant_id` | 文字列 | **必須** |
| `dataset` | 文字列 | 任意; デフォルト: "gnomad_r4"; enum: &#91; &#93;"gnomad_r4", , "gnomad_r4_non_ukb", , "gnomad_r3", , "gnomad_r3_controls_and_biobanks", , "gnomad_r3_non_cancer", , "gnomad_r3_non_neuro", , "gnomad_r3_non_topmed", , "gnomad_r3_non_v2", , "gnomad_r2_1", , "gnomad_r2_1_controls", , "gnomad_r2_1_non_cancer", , "gnomad_r2_1_non_neuro", , "gnomad_r2_1_non_topmed", , "エクセアック". . . |
| `include_populations` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants` {/* #search_variants */}

クエリ文字列(`rs7412`、バリアントID、プレフィックスなどの rsID など)にマッチするバリアント ID を検索します。 `get_variant` 用の `chrom-pos-ref-alt` ID に rsID を解決するために使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `dataset` | 文字列 | 任意; デフォルト: "gnomad_r4"; enum: &#91; &#93;"gnomad_r4", , "gnomad_r4_non_ukb", , "gnomad_r3", , "gnomad_r3_controls_and_biobanks", , "gnomad_r3_non_cancer", , "gnomad_r3_non_neuro", , "gnomad_r3_non_topmed", , "gnomad_r3_non_v2", , "gnomad_r2_1", , "gnomad_r2_1_controls", , "gnomad_r2_1_non_cancer", , "gnomad_r2_1_non_neuro", , "gnomad_r2_1_non_topmed", , "エクセアック". . . |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants` {/* #gene_variants */}

遺伝子内のすべてのgnomAD の短い変種をリストします。 Gene 境界と variant 座標は、データセットリファレンスビルド (r2.1/ExAC, GRCh38 for r3/r4) を使用します。 完全なリストには、大量の遺伝子の列が数千個含まれていることができます。 `gene_symbol`(HGNCシンボルなど)の1つを正確に渡す `APOE` または `gene_id` (遺伝子 ID を組み立てるなど) `ENSG00000130203`).

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | オプション |
| `gene_id` | 文字列 | オプション |
| `dataset` | 文字列 | 任意; デフォルト: "gnomad_r4"; enum: &#91; &#93;"gnomad_r4", , "gnomad_r4_non_ukb", , "gnomad_r3", , "gnomad_r3_controls_and_biobanks", , "gnomad_r3_non_cancer", , "gnomad_r3_non_neuro", , "gnomad_r3_non_topmed", , "gnomad_r3_non_v2", , "gnomad_r2_1", , "gnomad_r2_1_controls", , "gnomad_r2_1_non_cancer", , "gnomad_r2_1_non_neuro", , "gnomad_r2_1_non_topmed", , "エクセアック". . . |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint` {/* #gene_constraint */}

gnomAD 遺伝子制約メトリック: pLI, 観察/期待 LoF-missense-synonymous OE 比率 + 90% CI 境界, およびクラスごとの z-scores. 遺伝子を判断するために使用'機能障害の損失に対するsの不耐性(pLI) >================================================================================================================================================================================================================================================================================================================================================================================================ 0.9 または oe_lof_upper (LOEUF) &lt; 0.6～LoF-intolerant(ロフ・イントレラント) `gene_symbol`の1つを正確に渡して下さい(例えば。 `TP53`または`gene_id`。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | オプション |
| `gene_id` | 文字列 | オプション |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants` {/* #region_variants */}

ゲノム領域(最大1 Mb — 大きい領域を連続したウィンドウに分割する)で、すべてのgnomAD短バリアントをリストします。 `chrom`は`1`-`22`、`X`、`Y`、任意`chr`プレフィックスおよび下箱`x`/`y`を受け入れます; `start`/`stop`は1ベースの包括的であり、`stop - start`は&lt;= 1,000,000でなければなりません。 データセットは、座標(r2.1/ExAC、r3/r4のGRCh38)の参照ビルドを決定します。 入力座標は、すでにビルドして、自動リフトオーバーなしで使用しなければなりません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `chrom` | 文字列 | **必須** |
| `start` | 整数 | **必須**; 最小値: 1; 最高: 999999999 |
| `stop` | 整数 | **必須**; 最小値: 1; 最高: 999999999 |
| `dataset` | 文字列 | 任意; デフォルト: "gnomad_r4"; enum: &#91; &#93;"gnomad_r4", , "gnomad_r4_non_ukb", , "gnomad_r3", , "gnomad_r3_controls_and_biobanks", , "gnomad_r3_non_cancer", , "gnomad_r3_non_neuro", , "gnomad_r3_non_topmed", , "gnomad_r3_non_v2", , "gnomad_r2_1", , "gnomad_r2_1_controls", , "gnomad_r2_1_non_cancer", , "gnomad_r2_1_non_neuro", , "gnomad_r2_1_non_topmed", , "エクセアック". . . |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant` {/* #liftover_variant */}

参照ビルド間のバリアント ID をマップ (GRCh37 &lt;->) GRCh38) gnomAD's リフトオーバーテーブルを使用して。 `variant_id` です。 `chrom-pos-ref-alt` お問い合わせ `source_build`. . . . ルートは方向性です。`source_build=GRCh37`で渡されたGRCh38 IDは、エラーではなくゼロ結果を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `variant_id` | 文字列 | **必須** |
| `source_build` | 文字列 | 任意; デフォルト: "GRCh37"; enum: &#91;"GRCh37"、"GRCh38"&#93; |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants` {/* #clinvar_variants */}

臨床的意義、レビューステータス、ゴールドスターで、gnomADによって映し出されるように遺伝子内のClinVar変種をリストします。 出力ピン gnomAD's ClinVar スナップショット 経由 `clinvar_release_date`. `gene_symbol`の1つを正確に渡して下さい(例えば。 `BRCA1`または`gene_id`。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | オプション |
| `gene_id` | 文字列 | オプション |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants` {/* #structural_variants */}

リストgnomAD構造の変形(削除、重複排除、インサート、反転、CNVs...)は遺伝子をオーバーラップします。 `gene_symbol`の1つを正確に渡して下さい(例えば。 `TP53`または`gene_id`。 `dataset` は SV ピン — `gnomad_sv_r4` (デフォルト、GRCh38) または `gnomad_sv_r2_1` (GRCh37) です。 SV IDはリリース固有のものです。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | オプション |
| `gene_id` | 文字列 | オプション |
| `dataset` | 文字列 | 任意; デフォルト: "gnomad_sv_r4"; enum: &#91;"gnomad_sv_r4"、"gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant` {/* #get_structural_variant */}

リリース固有のSV ID(例:)で1つのgnomAD構造の変形を調べます。 gnomad_sv_r4の`DEL_CHR17_599B1512`。 ID は、リリース間での実行を行わない — `dataset` (`gnomad_sv_r4` デフォルト、または `gnomad_sv_r2_1`) は、リリース ID がから来たと一致しなければなりません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `sv_id` | 文字列 | **必須** |
| `dataset` | 文字列 | 任意; デフォルト: "gnomad_sv_r4"; enum: &#91;"gnomad_sv_r4"、"gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants` {/* #mitochondrial_variants */}

リスト gnomAD mitochondrial vars with headerplasmy-aware カウント (`ac_het`, `ac_hom`, `max_heteroplasmy`) を mitochondrial gene または chrM 座標 ウィンドウで表示します。 mitochondrial コールセットは、GRCh38 gnomAD r3/r4 データセット ピンのみで利用できます。データセット `gnomad_r3` または `gnomad_r4` を使用します。 遺伝子を渡す(遺伝子)`gene_symbol` いいね `MT-TL1`, または `gene_id`) または地域()`region_start` + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + `region_stop`)、両方。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | オプション |
| `gene_id` | 文字列 | オプション |
| `region_start` | 整数 | 任意; 最小値: `1`; 最高: `999999999` |
| `region_stop` | 整数 | 任意; 最小値: `1`; 最高: `999999999` |
| `dataset` | 文字列 | 任意; デフォルト: `"gnomad_r4"`; エヌム: `["gnomad_r4", "gnomad_r3"]` |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

### `clinvar_search` {/* #clinvar_search */}

ClinVar を直接検索 (nbi をライブ, gnomAD's スナップショットではなく) そして、マッチングのバリエーションレコードを臨床的意義で返し, ステータスとゴールドスターをレビュー. NCBI Eユーティリティ使用ポリシーごとに連絡先メール([設定 → 認証 → 文献アクセス → 連絡メール](../tools/credentials.md))が必要です。 Args: クエリ (ClinVar Entrez クエリ — "TP53 R175H" のような無料のテキスト) またはHGVSの文字列が動作し、 AND/OR/NOT と構成された用語は、例えば BRCA1&#91;gene&#93;、病原体&#91;CLIN_SIG&#93;、"Lynch症候群"&#91;dis&#93;、single_nucleotide_variant&#91;バリエーションの種類&#93;; rsID も機能しますが、clinvar_variant_by_rsid はフルレコードを返します)、max_records (ページキャップ 1-200、デフォルト 50)。 TOTALの試合は、常に報告されます。 合計 > のとき max_records リストは、キャップ付きプレフィックス(ClinVar の関連/レジテンシーオーダー)であり、truncated は真です。 NCBI Eユーティリティは、負荷下でHTTP 500を間続的に返す - その表面が数秒後に再試行します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records` {/* #clinvar_get_records */}

VCV/RCVアクセスのバッチや、バリエーションIDのバールレコードの完全なClinVarレコードを取得します。 NCBI Eユーティリティ使用ポリシーごとに連絡先メール([設定 → 認証 → 文献アクセス → 連絡メール](../tools/credentials.md))が必要です。 引数: アクセス (50 の識別子まで), 混合されたフォームが受け入れられ — VCV000045122 (バージョン VCV000045122.3 ok; RCV000019428(各RCVは1つの追加研究費用)、またはBare ClinVarのバリエーションID(45122)をローカルに解決しました。 rsID は拒否されます。clinvar_variant_by_rsid を使用します。 RCV(1つの変形条件ペア)は、その親VCVのバリエーションレコードに解決します。 入力をサイレントに落としません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accessions` | ['string', 'array'] | **必須** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid` {/* #clinvar_variant_by_rsid */}

ClinVar のバリエーションレコードは、dbSNP の rsID を参照し、全分類 (rID は複数の VCV にマップできます。) は、 別のアレルあたり 1 つ、 などです。 rs121913529はKRAS G12D/G12V/G12Aをカバーします。 NCBI Eユーティリティ使用ポリシーごとに連絡先メール([設定 → 認証 → 文献アクセス → 連絡メール](../tools/credentials.md))が必要です。 Args: rsid (dbSNP 参照 SNP ID、例えば rs7412; ケース・インセンティブは rs&lt;digits>、max_records (キャップ1-200、デフォルト50) に一致しなければなりません。 合計は常に真のマッチカウントとトランクされたフラグをキャプチャしたリストに運びます。 合計 == 0 は ClinVar が rsID のレコードを持たないことを意味します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `rsid` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids` {/* #dbsnp_get_rsids */}

Oracle dbSNP RefSNP は rsID のバッチのレコード: GRCh38+GRCh37 の配置、alleles、遺伝子のコンテキスト、 per-study allele frequencies、および ClinVar の相互参照。 NCBI Eユーティリティ使用ポリシーごとに連絡先メール([設定 → 認証 → 文献アクセス → 連絡メール](../tools/credentials.md))が必要です。 1つのツールが&#123;error:'contact_email_required'、メッセージ&#125;を返すことなく。 Args: rsids (20 rs&lt;digits> までのケースインセンティブ) — それぞれ 1 つのペースの NCBI バリデーション サービスが 1 つ、 rID あたり ~1 s を大量に取得します。 &#123;n_requested、レコード、not_found(rs number dbSNP do't know)、not_processed(壁クロックの予算が実行したときにスキップされたrsID — 再要求するだけ)&#125;。 各レコード: &#123;rsid, ステータス, create_date, last_update_date, last_update_build_id, n_引用, citations_pmids (20で撮影) citations_truncatedは帽子を、variant_type、mane_select_ids、プレースメント、alleles&#125;の旗付けます。 ステータスは'live'、'merged'です。 (コードではなく、merged_intoを運ぶ — それらの rsID を再クエリする) または 'no_data' (未サポート) 配置はアセンブリごとの ref/alts の 1 ベースの染色体座標を与えます(GRCh38 第一に、is_primary 本当)。 各alt-alleleエントリ: &#123;アレル, 精製, spdi ()0- ベースのインターベース), hgvs, 周波数: &#91;&#123;研究, study_version, , allele_count, , total_count, af , af&#125;&#93; (ALFA, 1000Genomes, TOPMED, gnomAD...), clinvar: &#91;&#123;rcv_accession, , clinical_significances, , review_status, , last_evaluated_date, , disease_names&#125;&#93;, 遺伝子: &#91;&#123;シンボル, gene_id, 名前, オリエンテーション, 結果 (SO 用語), mane_select: &#91; &#93;&#123;transcript_hgvs, , protein_spdi&#125;. . .&#125;. . .&#125;. . . .

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `rsids` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region` {/* #dbsnp_search_by_region */}

ゲノムウィンドウにdbSNP rsID(esearch db=snp positional index — NCBI Variation Services が領域エンドポイントを持たない) をリストします。 NCBI Eユーティリティ使用ポリシーごとに連絡先メール([設定 → 認証 → 文献アクセス → 連絡メール](../tools/credentials.md))が必要です。 1つのツールが&#123;error:'contact_email_required'、メッセージ&#125;を返すことなく。 ラグ:クロム(1-22、X、Y、MT) 'chr'の特長 プレフィックス許容), スタート (1 ベースの包括的), 停止 (包括的; 1 Mbでキャップされたスパン — 大きい領域を連続したウィンドウに分割します。 密な領域は、kbごとに多くの数千のrsIDを保持しているため、ウィンドウを小さくしたり、max_rsidsを上げることができます)、アセンブリ(位置指数 — 'GRCh38' デフォルト -> &#91;CPOS&#93;、または'GRCh37' -> &#91;CPOS_GRCH37&#93;; 座標は、選択したアセンブリにする必要があります)、max_rsids(リストキャップ1-1000、デフォルト200)。 &#123;chrom、開始、停止、アセンブリ、用語(使用される正確なEntrezクエリ)、合計(API's独自のカウント)、n_returned、truncated、rsids&#125;を返します。 truncated は、> の合計で真正 n_returned — リストは、Entrez のデフォルト順( rs 番号の末尾)のプレフィックスで、サイレントなトランシエーションは決してありません。 完全な記録のためのdbsnp_get_rsidsに供給のrsIDs (&lt;= 20)を時)供給して下さい。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `chrom` | 文字列 | **必須** |
| `start` | 整数 | **必須** |
| `stop` | 整数 | **必須** |
| `assembly` | 文字列 | 任意; デフォルト: "GRCh38"; enum: &#91;"GRCh38"、"GRCh37"&#93; |
| `max_rsids` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## 臨床試験 {/* #family-7 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `search_trials` {/* #search_trials */}

臨床Trials.gov を検索する PRIMARY. 条件、介入、スポンサー、場所、ステータス(例)によるフィルタリング &#91;"RECRUITING"&#93;), フェーズ (&#91;"PHASE1".."PHASE4"&#93;), study_type. 条件/介入/スポンサー/ロケーションは、Essieクエリ構文(boolean AND/OR/NOT、"quoted phrases"、グループ化、自動同義語)を受け入れます。 page_tokenでページ; count_total を合計マッチカウントに設定します。 advanced_query は、Essie 式を filter.advanced にマージします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `condition` | 文字列 | オプション |
| `intervention` | 文字列 | オプション |
| `sponsor` | 文字列 | オプション |
| `location` | 文字列 | オプション |
| `status` | 文字列の配列 | オプション |
| `phase` | 文字列の配列 | オプション |
| `study_type` | 文字列 | 任意; enum: &#91;"INTERVENTIONAL"、"OBSERVATIONAL"、"EXPANDED_ACCESS"&#93; |
| `advanced_query` | 文字列 | オプション |
| `page_size` | 整数 | 任意; デフォルト: 10; 最小値: 1; 最高: 1000 |
| `page_token` | 文字列 | オプション |
| `count_total` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details` {/* #get_trial_details */}

NCT id による 1 つの試験のための包括的な詳細を取得する (形式 "NCT") + 8 数字; ベア番号はプレフィックス、ケースインセプト)です。 すべての場所、スポンサーおよび協力者、日付、登録、および結果リンクを返す、完全な適格性基準、研究設計、第一次/第2次/その他エンドポイントを返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `nct_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor` {/* #search_by_sponsor */}

企業や組織が主催するトライアル(部分名マッチなど) "Pfizer"の特長 "Pfizer Inc"にマッチします。 条件、段階および状態によって任意に狭くして下さい。 スポンサーによる試用回数の合計でcount_totalを設定します。 page_tokenでページを移動

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `sponsor_name` | 文字列 | **必須** |
| `condition` | 文字列 | オプション |
| `phase` | 文字列の配列 | オプション |
| `status` | 文字列の配列 | オプション |
| `page_size` | 整数 | 任意; デフォルト: 10; 最小値: 1; 最高: 1000 |
| `page_token` | 文字列 | オプション |
| `count_total` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators` {/* #search_investigators */}

条件、機関、場所、またはinvestigator_nameによって主要な調査者および研究の場所を見つけて下さい。 サイト施設の施設の施設フィルターを所在し、所定の場所を優先します。 investigator_name は、全般的な正式名称と ResponsiblePartyInvestigatorFullName を検索します。 NCT ID でサイト連絡先(名前、役割、所属、施設、都市)を返却します。 page_sizeは、試験の回数をスキャンする方法をキャップします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `condition` | 文字列 | オプション |
| `institution` | 文字列 | オプション |
| `location` | 文字列 | オプション |
| `investigator_name` | 文字列 | オプション |
| `status` | 文字列の配列 | オプション |
| `page_size` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints` {/* #analyze_endpoints */}

第一次/第2次/その他の結果測定(エンドポイント)を分析します。 nct_id (単一trialモード) か条件(試験を渡る集計モード)だけを提供して下さい; 両方が与えられれば、nct_idは優先します。 フェーズとstart_date_after(YYY-MM-DD)でアグレゲートモードを狭くし、page_sizeの試験までスキャンできます。 エンドポイントリストと分析された試験を横断する最も一般的な測定名を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `nct_id` | 文字列 | オプション |
| `condition` | 文字列 | オプション |
| `phase` | 文字列の配列 | オプション |
| `start_date_after` | 文字列 | オプション |
| `page_size` | 整数 | 任意; デフォルト: 50; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility` {/* #search_by_eligibility */}

忍耐強いtrial一致。 ステータスが設定されていない限り、再構築試験に従った。 min_age または max_age を 1 つの患者年齢(「65 年」、6 月」)に供給して下さい; 試験年齢の境界線がチェックされます。 両方が供給されると、試験は患者の年齢間隔全体を認めなければなりません。 試用年齢制限が欠かせません。 性別 男性/男性 は、すべてのcomer の試験が含まれています。; 全部または省略された性は性フィルターを適用しません。 eligibility_keywordsは、包含/除外基準テキストを検索します(例:. 「HbA1c > 8」「BRCA変異」「ECOG 0-1」 条件の少なくとも1つ、eligibility_keywords、min_age、max_ageまたは性は要求されます。 page_tokenでページを移動

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `condition` | 文字列 | オプション |
| `eligibility_keywords` | 文字列 | オプション |
| `min_age` | 文字列 | オプション |
| `max_age` | 文字列 | オプション |
| `sex` | 文字列 | 任意; enum: &#91;"ALL", "MALE", "FEMALE"&#93; |
| `status` | 文字列の配列 | オプション |
| `page_size` | 整数 | 任意; デフォルト: 10; 最小値: 1; 最高: 1000 |
| `page_token` | 文字列 | オプション |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## 臨床ゲノム {/* #family-8 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `clingen_gene_validity` {/* #clingen_gene_validity */}

ClinGenの遺伝子疾患の有効性の治癒(証拠が遺伝子の変動が疾患を引き起こしているのがいかに強いのか:非finitive/Strong/Moderate/Limited/Disputed/Refuted/No Known Disease Related)。 すべての3,600+のcurationsをリストするOmit遺伝子。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene` | 文字列 | オプション |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity` {/* #clingen_dosage_sensitivity */}

ClinGenの投与量の感度キュレーション:遺伝子のハプロインフルエンサーと防爆アサーション(およびオプションでISCAゲノム/CNV領域)。 遺伝子のシンボルまたは ISCA 地域 ID フィルターを正確に; フルテーブルの省略。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene` | 文字列 | オプション |
| `include_regions` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability` {/* #clingen_actionability */}

ClinGen の臨床作用性のcurations: 遺伝子に関連付けられている無秩序のために、早期の介入が前症のキャリアの実行可能であるかどうか(介入/アウトカムは重症、可能性、有効性、性質のof-介入成分のスコアおよび総スコアと対を結合します)。 Gene filterは、複数の遺伝子のトピックのどのメンバーにもマッチします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene` | 文字列 | オプション |
| `context` | 文字列 | 任意; デフォルト: "both"; enum: &#91;"adult"、"pediatric"、"both"&#93; |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications` {/* #clingen_variant_classifications */}

ClinGen証拠リポジトリ(ERepo)のエキスパートパネルの異様な病原性分類(ACMG基準に基づくVCEP解釈)。 遺伝子(HGNC記号)、カイド(ClinGen canonical allele id)、例えば、EXACTLY ONE の遺伝子(HGNC記号)を提供して下さい。 CA114360 または hgvs (例: CA114360) NM_000277.2:c.1222C>T。 完全な検索(matchLimit=none)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene` | 文字列 | オプション |
| `caid` | 文字列 | オプション |
| `hgvs` | 文字列 | オプション |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes` {/* #civic_search_genes */}

Entrez のシンボル (例: CIViC の遺伝子のレコードを検索します。 "BRAF"。 完全ペジネーション、カウント検証済み。 civic_gene_variants で返された CIViC 遺伝子 ID を使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `entrez_symbol` | 文字列 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants` {/* #civic_gene_variants */}

1つのCIViC遺伝子(CIViC遺伝子IDによる)のすべての変形、完全ペジネーション - 遺伝子の数百種類でも完了します。 バリアント ID でソートします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_id` | 整数 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant` {/* #civic_get_variant */}

CIViC の variant id (aliases, variant type, feature/gene linkage, gene variant の座標) による 1 つの CIViC の variant です。 absent の場合、find=false を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `variant_id` | 整数 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants` {/* #civic_search_variants */}

CIViC の variant を name の substring (例: ) で検索します。 "V600"は、CIViC遺伝子IDにオプションでスコープ付けられます。 完全ペジネーション バリアント ID でソートします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `name` | 文字列 | **必須** |
| `gene_id` | 整数 | オプション |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item` {/* #civic_get_evidence_item */}

idによる1つのCIViCの証拠項目:病気/療法のコンテキスト(証拠レベルA-E、タイプ、方向、意義、評価、病気、療法、ソース)の分子プロファイルの臨床的意義。 absent の場合、find=false を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `evidence_id` | 整数 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence` {/* #civic_search_evidence */}

フィルターの組み合わせでCIViCの証拠項目を検索します。 証拠IDの昇順によって分類される十分にpaginated、カウント 検証される。 Enum フィルターは CIViC GraphQL の enum 値動詞 (evidence_level "A".."E"; evidence_type プレダクティブ&#124;製品情報&#124;DIAGNOSTIC&#124;株式会社オーネ&#124;株式会社オーネ&#124;株式会社オーネ evidence_directionサポート&#124;DOES_NOT_SUPPORT ステータス ACCEPTED&#124;登録済み&#124;登録済み&#124;ALL 少なくとも 1 つのフィルターを提供 — フィルターは 10k+ の corpus 全体を歩きません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `disease_name` | 文字列 | オプション |
| `therapy_name` | 文字列 | オプション |
| `evidence_level` | 文字列 | オプション |
| `evidence_type` | 文字列 | オプション |
| `evidence_direction` | 文字列 | オプション |
| `significance` | 文字列 | オプション |
| `variant_origin` | 文字列 | オプション |
| `evidence_rating` | 整数 | オプション |
| `status` | 文字列 | オプション |
| `molecular_profile_name` | 文字列 | オプション |
| `molecular_profile_id` | 整数 | オプション |
| `variant_id` | 整数 | オプション |
| `disease_id` | 整数 | オプション |
| `therapy_id` | 整数 | オプション |
| `phenotype_id` | 整数 | オプション |
| `source_id` | 整数 | オプション |
| `assertion_id` | 整数 | オプション |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion` {/* #civic_get_assertion */}

エキスパートキュレーションされたサマリークレーム(AMP/ASCO/CAPティア、ACMG/ClinGenコード、FDAのコンパニオンテストフラグ)による1つのCIViCアサーション:疾患/治療のコンテキストにおける分子プロファイルの証拠を集計します。 absent の場合、find=false を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `assertion_id` | 整数 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions` {/* #civic_search_assertions */}

フィルターの任意の組み合わせでCIViCアサーションを検索します。 完全にpaginated、カウント検証、アセンシャルIDを昇順にソート。 assertion_type プレダクティブ&#124;製品情報&#124;DIAGNOSTIC&#124;株式会社オーネ assertion_directionサポート&#124;DOES_NOT_SUPPORT amp_level 例 TIER_I_LEVEL_A; は、 ステータス ACCEPTED&#124;登録済み&#124;登録済み&#124;ALL フィルターがフルコルパスを歩くことがありません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `disease_name` | 文字列 | オプション |
| `therapy_name` | 文字列 | オプション |
| `assertion_type` | 文字列 | オプション |
| `assertion_direction` | 文字列 | オプション |
| `significance` | 文字列 | オプション |
| `amp_level` | 文字列 | オプション |
| `status` | 文字列 | オプション |
| `molecular_profile_name` | 文字列 | オプション |
| `molecular_profile_id` | 整数 | オプション |
| `variant_id` | 整数 | オプション |
| `variant_name` | 文字列 | オプション |
| `disease_id` | 整数 | オプション |
| `therapy_id` | 整数 | オプション |
| `phenotype_id` | 整数 | オプション |
| `evidence_id` | 整数 | オプション |
| `summary` | 文字列 | オプション |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile` {/* #civic_get_molecular_profile */}

idによる1つのCIViC分子プロファイル(証拠/インサートが添付するvariantの組み合わせ)、incl。 パースされた名前、スコア、および構成の変形。 absent の場合、find=false を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mp_id` | 整数 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles` {/* #civic_search_molecular_profiles */}

CIViC 分子プロファイルを名前のサブストリング(例)で検索します。 "BRAF V600E"。 完全ペジネーション id でソートします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `name` | 文字列 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases` {/* #civic_search_diseases */}

CIViC 疾患の記録を名前のサブストリング(例)で検索します。 "melanoma"。 DOID + 表示名を返します。 完全にpaginated; id でソートします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `name` | 文字列 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies` {/* #civic_search_therapies */}

CIViC 療法のレコードを名前のサブストリング(例)で検索します。 "vemurafenib")。 NCIt ID +名を返します。 完全にpaginated; id でソートします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `name` | 文字列 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql` {/* #open_targets_graphql */}

オープンターゲットプラットフォームAPI(ターゲット、病気、薬、ターゲットダイザー協会スコア、エビデンス、トラクタビリティ、安全性、既知の薬)に対する任意のグラコールクエリを実行します。 回路図の検出のための導入の問い合わせ作業。 既知のDrugsは薬物に名前をつけられました。ClinicalCandidates上流。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `variables` | オブジェクト | オプション |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs` {/* #open_targets_disease_drugs */}

病気(オープンターゲットプラットフォーム)のための既知/インベスチゲーション薬 - 病気をラップします。drugAndClinicalCandidates。 efo_idは、疾患腫瘍学id(EFO/MONDO/etc.,等)です。 "MONDO_0004992")。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `efo_id` | 文字列 | **必須** |
| `size` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets` {/* #open_targets_disease_targets */}

疾患のトップ関連ターゲット, オープンターゲット全体の関連付けのスコアによってランク付け - 病気をラップします。.associatedターゲット. efo_idは、疾患腫瘍学id(EFO/MONDO/etc.)です。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `efo_id` | 文字列 | **必須** |
| `size` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug` {/* #open_targets_drug */}

ChEMBL id(Open Targets Platform) — 名前、タイプ、最大臨床段階、およびアクションのメカニズム(ターゲット+アクションタイプ)によるドラッグ詳細。 chembl_id 例 "CHEMBL1201583"。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `chembl_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## 構造 & インタラクション {/* #family-9 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `emdb_get_entries` {/* #emdb_get_entries */}

EMDB の cryo-EM 3D の地図の記入項目のための構造化されたメタデータ レコードをフェッチして下さい。 'EMD-1234'、'emd-1234'としてアクセスを受け入れて下さい または ' 1234'。 各レコードは、タイトル、構造決定法(単一粒子/ヘリカル/トーモグラフィ/サブモグラム平均化/電子結晶構造)、アナストローム(報告された解像度のないエントリのnullなど)での解像度を処理します。 生のtomograms)と解像度方法、堆積/リリースの日付、サンプルおよびマクロモール/スプラムカルの名前、適合したPDBモデルID(モデルが装着されていない場合の空のリスト)、第一次引用(ジャーナル、年、最初の著者、DOI、PMID)、地図寸法およびvoxelサイズ、およびステータス。 エントリは、is_obsolete=trueとsuperseded_byアクセスを報告します。 &#123;"emdb_id"、"error":"not_found"&#125; — 決して静かに落ちません。 メタデータのみ; 地図のボリュームはダウンロードされません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `emdb_ids` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries` {/* #emdb_search_entries */}

Solr スタイルのクエリで EMDB を検索します。 コンパクトな行の完全ページの検索。 クエリ例:'title:"apoferritin" 解像度:&#91;0から1.5&#93;'、'structure_determination_method:"singleParticle"'、'current_status:"REL" release_date:&#91;2024-01-01T00:00:00Z〜&#42;&#93;'. Args: クエリ (Solr クエリ文字列); max_rows (ルーキャップ、デフォルト1000)。 num_found_released (API's は、ファセットルートの公開エントリー数 — 地上の真実)、rows_retrieved、rows_by_status (REL 対 OBS — 検索ルートは、obsolete エントリも返しますが、リリースされるとカウントされません)、released_complete (リリースされたすべてのリリースされたマッチが取得された真の差分)。 false は、max_rows がスイープやカウントの不一致を打ち消したことを意味します。レコードは、EMD によるアクセスによってソートされた、emdb_id、タイトル、解像度、structure_determination_method、current_status、release_date、fitted_pdbs) をコンパクトにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `max_rows` | 整数 | 任意; デフォルト: 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section` {/* #emdb_get_entry_section */}

EMDB エントリの 1 つの詳細なメタデータ セクションを取得します。 セクション: 'publications' — 完全な順序の著者リスト、補助引用、外的な参照(PMID/DOI/ISSN/CSD)が付いている第一次引用; 'map'の特長 — ファイル、フォーマット、データタイプ、寸法、バクセル間隔、起源、軸線順、セル、バクセル統計、輪郭レベル、対称; 'sample'の特長 — per-macromoleculeレコード(タイプ、分子量、コピー、EC番号、ソース生物+ NCBIタクシー、シーケンスクロスリーフ)とパーサプラムロールレコード; 'imaging'の特長 — 顕微鏡、電圧、電子源、探知器、線量、イメージ投射モード、焦点距離、拡大、Cs、cryogen、格子/緩衝/vitrificationの条件(マイクロコピー セッションごとの1つの記録 — 記入項目は複数の運ぶことができます)。 引数: emdb_ids (アクセスリスト、EMD-1234/emd-1234/1234のいずれか)。 セクション(出版物/マップ/サンプル/イメージングの1つ)。 "error":"not_found"と未知のアクセスが報告されています。 ヘッドラインの記録だけを必要とするとき emdb_get_entries を最初に使用して下さい。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `emdb_ids` | 文字列の配列 | **必須** |
| `section` | 文字列 | **必須**; enum: &#91;"publications", "map", "sample", "imaging"&#93; |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation` {/* #emdb_get_validation */}

EMDB エントリの数値検証分析メトリックを取得します。 エントリーごとに(EMDB /analysisルートから):Qスコア、原子インクルージョン、推奨/予測/ローマップコンターレベル、モデル/マスクのボリューム、モデルマップ比、表面メトリック - 検証パイプラインがそれらを計算しました。 available_blocks は、バリデーションサービスが返されたブロックを全てリストします。 スパースのペイロード(モグラム、モデルフリー、または歴史的エントリ)は、明示的なnullを収受します。 検証分析レポートhas_validation_analysis=false無しでエントリーする — サイレントに落としません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `emdb_ids` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes` {/* #complexportal_get_complexes */}

CPXアクセスによる複雑なポータルレコードの取得 各レコード:複雑な AC, 推奨/系統名 + 同義語, 種とタクシー, 参加者リストと stoichiometry (分/最大コピー), 生物学的役割と対話型, 証拠 ECO コード, ゴアノテーション, およびクロスリファレンス — 手動の循環型マクロ分子複合体の記述. 記録は入力順序で戻ります; サイレントを落とすのではなく、`not_found`に未知のアクセスがリストされています。 バイナリインタラクション*証拠証拠*(実験中のバインド)では、代わりにintact_&#42;ツールを使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `complex_acs` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant` {/* #complexportal_search_by_participant */}

分子を含む複合体ポータルを検索します。 `accession` は参加者のアクセスです。UniProt (例:UniProt) 'P04637'、ChEBI、またはRNAcentral。 participants_only=true (デフォルト) では、検索はフィールド修飾 (pxref:&lt;accession>) なので、実際にキュレーションされた参加者として分子を含む複合体のみが返されます。 偽のバレアクセスは、あまりにも無料のテキスト(説明、名前)と一致していますが、過小報告は、言及をキャッチすることができます。 全ての結果ページが取得され、サービス報告された合計(total_reported == total_retrieved、または呼び出しが大声で失敗する)に対して行数が検証されます。 ヒットは、複雑なアクセスによってソートされたコンパクトなレコード(complex_ac、名前、種、相互作用)です。 complexportal_get_complexes でフルディテールをフェッチします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |
| `participants_only` | 真偽値 | 任意; デフォルト: true |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions` {/* #intact_fetch_interactions */}

クエリに一致するすべてのIntActバイナリの相互作用を取得する, MIスコアフィルタリング. `query`はUniProtアクセス(例:UniProt)です。 'P04637'、遺伝子のシンボル、無料のテキスト、または任意のIntAct Solrクエリ。 リトリバルは、サーバーが報告された合計(n_records == total_elements、またはFAILS LOUDLYの呼び出しに対して検証された完全なペジネーションスイープです。サイレントトランケーションは不可能です)。 min_mi_score/max_mi_scoreは、IntAct MIの自信スコア(0.45は一般的な中層階です)のサーバー側をフィルタリングします。 種名またはタクシーによるinteractor_speciesフィルタ(例: &#91;"Homo sapiens"&#93; または &#91;" 9606"&#93;) レコードはスリムで構造化されています: 対話型ペア (IntAct ACs, データベース識別子, 分子名, 種/タキシン), 相互作用型, 検出方法 (+MI ID), 実験的役割, ホスト型生物, MI スコア, パブMed id, 第一著者, ソースデータベース — DESCENDING MI スコアでソート. ほとんどの max_records_returned レコードの出力リスト (完全な検証されたスイープがより大きいとき records_truncated=true)。 n_records は、常に真の合計を報告します。 大きい照会(例えば。 CFTR〜10kの相互作用)は、min_mi_scoreまたは可能なときに種と狭く、しばらくかかります。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `min_mi_score` | 数値 | 任意; デフォルト: 0 |
| `max_mi_score` | 数値 | 任意; デフォルト: 1 |
| `interactor_species` | 文字列の配列 | オプション |
| `max_records_returned` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor` {/* #intact_get_interactor */}

分子を IntAct の対話者レコード(s) に解決します。 `query` は、UniProt のアクセシビリティ、遺伝子のシンボル、または IntAct のインタラクタ AC です。 'EBI-7090529'。 UniProt アクセプションは、カンタニカル タンパク質 + チェーン/イソフォーム のインタラクタに解決できる、明示的な n_matches ですべてのマッチング 対話者のレコードを返します。このツールはサイレントに 1 つを選ぶことはありません。 各レコード:interactor_ac、preferred_identifier、名前、種、タクシー、interactor_type、およびIntActによって見られるinteraction_count(intact_fetch_interactionsスイープをサイジングするのに便利です)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details` {/* #intact_get_interaction_details */}

ONE IntActインタラクションAC(例:1 IntActインタラクションAC)の詳細なキュレーション 'EBI-15635490'。 相互作用タイプ、ホストの生物、検出方法、出版物、相互参照、アノテーション、キネティック/アフィニティ変数および信任、プラス/participantレコード(識別子、種、生物的および実験的役割、参加者の検出方法)include_participants=falseがなければ戻ります。 intact_fetch_interactionsレコード(interaction_acフィールド)から交流ACを取得。 不明な AC は &#123; を戻します interaction_ac, エラー: 'not_found' &#125;.

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `interaction_ac` | 文字列 | **必須** |
| `include_participants` | 真偽値 | 任意; デフォルト: true |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network` {/* #intact_build_network */}

シードタンパク質の周りの深さ-1 IntAct相互作用ネットワークを構築します。 `seed_accessions`はUniProtアクセスです。 ステップ1:シードごとの完全な、カウント検証されたMI-スコアフィルタ付き相互作用スイープ。 ステップ2:すべてのシードエッジと種子のパートナーは、ノードセットを形成します。 ステップ3: パートナー・パートナー・パートナー・エッジは、パートナー自身に問い合わせることによってのみ発見可能です。そのため、max_interactors_expandedパートナーまでは、ノード・セット内のBOTHエンドポイントと接続された(最も接続された最初、識別子による関係)、およびエッジが保持されます。 拡張ブロックは、パートナーが展開されていないかを正確に報告します(expansion.complete=false は、パートナーパートナーのエッジが存在する可能性があることを意味します)。 出力:ノード、エッジ(MIスコア、検出方法、PubMed ID)、パーシードスイープステータス。 種子を数回保持し、min_mi_score >= 0.45 — すべての拡張は、完全なペジネーションスイープです。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `seed_accessions` | 文字列の配列 | **必須** |
| `min_mi_score` | 数値 | 任意; デフォルト: 0.45 |
| `max_interactors_expanded` | 整数 | 任意; デフォルト: 25 |
| `interactor_species` | 文字列の配列 | オプション |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures` {/* #pdb_search_structures */}

属性フィルタで RCSB PDB エントリを検索します。 ページ付き, キャップ + フラグが付けられました。. すべてのフィルタと組み合わせ; 少なくとも1つは必要です。 `text`は全文関連クエリ('p53 DNA結合ドメイン')です。 `organism`は、正確なソースオーガニズムのリネン名('Homo sapiens')です — 任意の行程でマッチするので、'Eukaryota' 作品もまた。 `taxonomy_id` NCBIタクシー(9606); `uniprot_accession`は、そのUniProt('P04637')にポリマーエンティティティがマップするエントリを見つけます -> すべてのp53構造); `experimental_method`は、PDBの語彙('X-RAY DIFFRACTION'、'ELECTRON MICROSCOPY'、'ソリューションNMR'、... — ケースインセンティブ、未知の値のエラーをフルリストで表示します。 `max_resolution_angstrom` は、その解像度以下にエントリを保持します。 `ligand_comp_id`は、化学コンプID('ZN'、'ATP'、'HEM')によるバインド非ポリマーコンポーネントを必要とします。 include_computed_models=true は、計算された構造モデル (例: ) を追加します。 デフォルト実験のみの結果へのAlphaFold)。 total_count(API's独自のマッチ合計 — 地上の真実)、n_retrieved、truncated(真のIFF total_count > n_retrieved ; max_rows, 1..1000, キャップ検索), レコード &#91;&#123;pdb_id, スコア&#125;&#93; 関連する順序で. 識別子のみ — pdb_get_structures へのメタデータに対するチェーン。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `text` | 文字列 | オプション |
| `organism` | 文字列 | オプション |
| `taxonomy_id` | 整数 | オプション |
| `uniprot_accession` | 文字列 | オプション |
| `experimental_method` | 文字列 | オプション |
| `max_resolution_angstrom` | 数値 | オプション |
| `ligand_comp_id` | 文字列 | オプション |
| `include_computed_models` | 真偽値 | 任意; デフォルト: false |
| `max_rows` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures` {/* #pdb_get_structures */}

PDBエントリのエントリーレベルの要約 (バッチ、最大 25 ids)。 4-character PDB の id を任意のケース (' 1tup') で受け入れます == ' 1TUP'; 重複は重複しています)。 各レコード:タイトル、実験的方法、Angstromの解像度(メソッドのnullなど) NMR)、決定方法論(実験対計算)、預金/リリース/修正日付とステータス、分子量(kDa)、アセンブリおよびエンティティティメントカウント(タンパク質/DNA/RNAポリマー+非ポリマー)、境界リグと化学コンプID、ポリマー/非ポリマー実体IDリスト(インプット) pdb_get_entities /////////////////////// pdb_get_ligands)、および第一次引用(タイトル、ジャーナル、年、作者、 PubMed id、 DOI)... &#123;"pdb_id"、"error":"not_found"&#125; — 決して静かに落ちません。 メタデータのみ; ファイルの調整はダウンロードされません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pdb_ids` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities` {/* #pdb_get_entities */}

1つのPDBの記入項目のためのポリマー実体の細部、incl。 UniProt マッピング。 とりあえず entity_ids=null エントリーのあらゆるポリマーエンティティティティが取得され、 25 truncated=true と n_polymer_entities を使ってエントリを報告's の実質の計算(ribosomes のような大きいアセンブリは運びます 50+ — 完全な ID リストを取得する pdb_get_structures' polymer_entity_ids と &#91;" 26", " 27"&#93; のような明示的なサブセットを持つページ。 explicit entity_ids でエントリの合計が取得されていないので、n_polymer_entities は null です。 25 エラーよりも大きい explicit entity_ids リスト。 各レコード:説明、ポリマータイプ(プロテイン/DNA/RNA)、シーケンス長さ、変異数、堆積されたコピー、チェーンID(エイシム+著者)、タムド、ユニプロットのパーエンティティシークシーケンスカバレッジ(SIFTS)、およびUniProt整列地域(エンティティシーク対参照シーク座標)のソース生物。 未知のエンティティティティ ID は not_found にリストされています。 未知のエントリ ID エラー。 include_sequences=true は、組織ごとに正式な 1 文字のシーケンスを追加します。 結合されたシーケンスが max_bytes (デフォルト 400000) を超えた場合、それらは省略され、 sequences_omitted はなぜ — メタデータは常に生き残ります。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pdb_id` | 文字列 | **必須** |
| `entity_ids` | 文字列の配列 | オプション |
| `include_sequences` | 真偽値 | 任意; デフォルト: false |
| `max_bytes` | 整数 | 任意; デフォルト: 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands` {/* #pdb_get_ligands */}

1つのPDBのエントリーのバウンドリガンド(非ポリマーコンポーネント)、化学。 エントリー's非ポリマーのエンティティティティティティティティティティを歩き、各化学成分を解決します。リガンド、エンティティティID、化学コンプリートID('ZN'、'ATP')、説明、堆積されたコピーカウント、著者チェーンID、およびchem_compブロック(名前、式、式重量、正式な充電、コンポーネントタイプ、InChIKey、ステレオSMILES)。 PDBのデータモデルでは、非ポリマーの実体ではなく、決して現れません。 リガンドなしのエントリは、リガンドを返す: &#91;&#93;. n_nonpolymer_entities は、エントリ's の真のカウントです。 max_ligands を上回るとき truncated=true (要求の予算を縛る 1..25 にclamped) — 黙って低下しません。 "error" でデータ API が利用できなくなったエンティティティ/コンポーネントは、"not_found" (部分的な結果は、中絶された呼び出しではありません)。 未知のエントリ ID エラー。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pdb_id` | 文字列 | **必須** |
| `max_ligands` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction` {/* #alphafold_get_prediction */}

1つのUniProtアクセス用のAlphaFold DB予測構造メタデータ。 has_model, n_models, per-modelレコードを返します。 単一のアクセスは、'P04637-9'、およびGoogle DeepMindモノマーパイプラインを超えるコミュニティプロバイダであるprovider_id / tool_usedなどのいくつかのモデル(canonical + isoformsのような)を運ぶことができます。 各モデル:エントリーID、UniProtアノテーション(ID、説明、遺伝子、生物、タクシー、レビューされたフラグ)、シーケンス座標と長さ、グローバルpLDDT()global_plddt, , 0- - - -100) と pLDDT の信任の bin ごとの残余の分(very_low &lt; 50、低い 50- - - -70, 自信 70- - - -90, , very_high > 90)、モデルバージョン情報と作成日、URLのダウンロード(cif/bcif/pdb座標、PAE JSON +画像, per-residue pLDDT, per-residue pLDDT, per-residue pLDDT, per-residue pLDDT, per-residue pLDDT, per-residue pLDDT, per-residue, pLDDT JSON, MSA, アルファマッセンス CSV 利用可能な場所) — URL のみ、ペイロードはダウンロードされません。 必要に応じてそれらを自分で取得します。 予測なしのアクセスは has_model=false を返します。(エラーではありません。) malformed 識別子は explicit `error` フィールドを返します。 include_sequence=true はモデルシーケンス(タンパク質1文字)を追加します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `uniprot_accession` | 文字列 | **必須** |
| `include_sequence` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage` {/* #alphafold_check_coverage */}

バッチアルファフォールドDBカバレッジチェック(最大40ユニークなUniProtアクセス)。 バッチキャップが適用される前に空白のエントリと重複が除去され、開示されます: n_requested == n_unique + n_blank_skipped + n_duplicate_skipped 常に合意します。 ユニークなアクセスごとに1つのコンパクトなレコード、入力順:has_model、n_models、プライマリ(一次リスト)モデル's model_entity_id、latest_version、global_plddt、sequence_length。 has_model=falseを予測しないアクセス malformed は、明示的な `error` フィールドを運ぶ — サイレントに落としません。 セットのタンパク質がalphafold_get_predictionでフルレコードを引っ張る前に、使用可能な予測構造を持っているかを試すことを使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `uniprot_accessions` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## チャムBL {/* #family-10 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `compound_search` {/* #compound_search */}

名前(デフォルト)、ChEMBL id、または分子構造によるChEMBL化学化合物を検索します。 名前: case-inpathy の同義語の substring の一致(好まれる名前のマッチに戻って滝)。 chembl_id: 直接レコードのルックアップ。 笑顔で: similarity_threshold が設定されているときの谷本類似性検索、その他のサブ構造検索(構造ウォークは、walk_truncated/upstream_total)をキャプチャして公開します。 臨床段階による任意max_phaseフィルター。 お名前、chembl_id、笑顔の1つを1つ以上渡す。 治療的表示で検索するときに代わりにdrug_searchを使用してください。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `name` | 文字列 | オプション |
| `chembl_id` | 文字列 | オプション |
| `smiles` | 文字列 | オプション |
| `similarity_threshold` | 整数 | 任意; 最小値: 70; 最高: 100 |
| `max_phase` | 整数 | 任意; enum: &#91;0, 1, 2, 3, 4&#93; |
| `limit` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search` {/* #drug_search */}

治療表示(EFO用語、部分的一致)による承認された薬および臨床候補を検索します。 drug_indication 行を異なる親分子に結合し、分子の記録と出金/ブラックボックスの警告に。 only_approved は、4 のフェーズに制限します。 オプションのポストフィルター molecule_chembl_id, drug_name (プレッサード名サブストリング), max_phase (>=) は、結合されたセットを狭くします。 名前/id/構造の一見のためのcompound_searchを使用して下さい。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `indication` | 文字列 | **必須** |
| `drug_name` | 文字列 | オプション |
| `molecule_chembl_id` | 文字列 | オプション |
| `max_phase` | 整数 | 任意; enum: &#91;0, 1, 2, 3, 4&#93; |
| `only_approved` | 真偽値 | 任意; デフォルト: false |
| `limit` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet` {/* #get_admet */}

ChEMBLは、薬物性/ADMET評価のための分子特性を1つの分子(ALogP、分子量、PSA、HBA/HBD、回転可能な結束、芳香リング、重原子、Rule-of-5違反、Rule-of-3パス、QED、分子式)取得しました。 これらは、実験的な測定ではなく、構造から計算されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `molecule_chembl_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity` {/* #get_bioactivity */}

化合物ターゲット相互作用のためのChEMBLの生体活性測定(IC50、KI、Kd、EC50、...)を取得します。 molecule_chembl_idおよび/またはtarget_chembl_id、activity_type(standard_type)、pChEMBLの床(min_pchembl)、standard_valueの範囲(min_value/max_value)、および単位(standard_units)によるフィルター。 activity_idで注文した1ページを、最も有効な要約で返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `molecule_chembl_id` | 文字列 | オプション |
| `target_chembl_id` | 文字列 | オプション |
| `activity_type` | 文字列 | 任意; エヌム: &#91;"IC50"、"EC50"、"Ki"、"Kd"、"AC50"、"GI50"、"ED50"、"Potency"&#93; |
| `min_pchembl` | 数値 | 任意; 最小値: 0; 最高: 14 |
| `min_value` | 数値 | オプション |
| `max_value` | 数値 | オプション |
| `unit` | 文字列 | 任意; エヌム: &#91;"nM", "uM", "mM", "pM", "M"&#93; |
| `limit` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism` {/* #get_mechanism */}

承認された薬剤および臨床候補のためのCHEMBLのメカニズムの行為の記録を取得します。 molecule_chembl_id、target_chembl_id、および/またはaction_typeによるフィルター。 分子のidが何も収まるとき、親分子に対するレトリートはソルトフォームのIDが解決します。 mec_idで注文した1ページをアクション型サマリーで返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `molecule_chembl_id` | 文字列 | オプション |
| `target_chembl_id` | 文字列 | オプション |
| `action_type` | 文字列 | 任意; enum: &#91; &#93;"インヒビター", , "アソニスト", , "アタゴニスト", , "ブロッカー", , "モデレーター", , "営業体制", , "アクティベーター", , "一貫した調節器", , "ネガティブ・アオステリック・モジュレーター", , "パートリーアゴニスト", , "インバース・アゴニスト". . . |
| `limit` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search` {/* #target_search */}

ChEMBLの生物学的目標(タンパク質、複合体、家族、生物)を検索します。 target_chembl_id、gene_symbol(正確なコンポーネント・シンニネーム・マッチ)、target_name(プレッサード・ネーム・サブストリング)、生物(サブストリング)、および/またはtarget_typeによるフィルタリング。 各結果は、UniProt のアクセス、gene_symbol、およびバインドされた相互参照リストでコンポーネントを運びます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `target_name` | 文字列 | オプション |
| `gene_symbol` | 文字列 | オプション |
| `target_chembl_id` | 文字列 | オプション |
| `organism` | 文字列 | オプション |
| `target_type` | 文字列 | 任意; enum: &#91; &#93;"シングルプロテイン", , "PROTEIN COMPLEX(プロテインコンプレックス)", , "プロテインファミリー", , "オルガニズム", , "TISSUE(ティシュー)", , "セルライン", , "NUCLEIC-ACID(ナクレックアシッド)", , "サブセルラー". . . |
| `limit` | 整数 | 任意; デフォルト: 20; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## バイオRxiv {/* #family-11 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `get_categories` {/* #get_categories */}

すべての27バイオRxivの対象カテゴリとそのAPI互換のスラグ(例えば、)をリストします。 "cancer生物学" -> "cancer_biology"). search_preprints の前に使用して、有効なカテゴリ値を発見します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints` {/* #search_preprints */}

日付と(オプション)カテゴリでbioRxiv/medRxivプリプリントを検索します。 date_from+date_to、recent_days(Last N days)、またはrecent_count(90-dayウィンドウ内で最新のN)を正確に使用してください。 60の最終日は、どれも同じです。 キーワード/テキスト検索はありません。 カーソルのペジネート。 DOI、タイトル、著者、日付、カテゴリ、バージョン、および200-char抽象プレビューを返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `server` | 文字列 | 任意; デフォルト: "biorxiv"; enum: &#91;"biorxiv"、"medrxiv"&#93; |
| `category` | 文字列 | 任意; enum: &#91; &#93;"動物行動と認知", , "生物化学", , "バイオエンジニアリング", , "バイオインフォマティクス", , "生物物理", , "がん生物学", , "細胞生物学", , "臨床試験", , "開発生物学", , "エコロジー", , "疫学", , "進化する生物学", , "遺伝学", , "ゲノム", , "免疫学", , "マイクロバイオロジー", , "分子生物学", , "神経科学", , "パロントロジー", , "病理学", , "薬理学・毒性学", , "生理学", , "植物生物学", , "科学的コミュニケーションと教育", , "合成生物学", , "システム生物学", , "動物園". . . |
| `date_from` | 文字列 | オプション |
| `date_to` | 文字列 | オプション |
| `recent_days` | 整数 | 任意; 最小値: 1 |
| `recent_count` | 整数 | 任意; 最小値: 1 |
| `limit` | 整数 | 任意; デフォルト: 10; 最小値: 1; 最高: 100 |
| `cursor` | 整数 | 任意; デフォルト: 0; 最小値: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint` {/* #get_preprint */}

DOI(Bre " 10.1101/...")による1つのプリプリントのための完全なメタデータを入手 または完全な[https://doi.org/](https://doi.org/) URL)。 最新のバージョンを使用する。 タイトル、著者、対応する著者+機関、フル抽象、カテゴリ、ライセンス、バージョン、JATS XML、資金調達、公開ジャーナルDOI(リンクされている場合)、PDFおよびWeb URL、およびバージョンカウント。 プレプリントは、ピアレビューされていません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `doi` | 文字列 | **必須** |
| `server` | 文字列 | 任意; デフォルト: "biorxiv"; enum: &#91;"biorxiv"、"medrxiv"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints` {/* #search_published_preprints */}

後日公開された論文をピアレビュージャーナル(preprint ->)で見つける ジャーナル・パーティクルリンク search_preprints(date_from+date_to / recent_days / recent_count)と同じ1-OF検索方法。 include_details=false は、コンパクトなサマリーを返します。 ジャーナルDOIプレフィックスによるパブリッシャーフィルタ(例:) "10.1038" 自然のために)バイオRxiv専用/パブリッシャーのルートを介して。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `server` | 文字列 | 任意; デフォルト: "biorxiv"; enum: &#91;"biorxiv"、"medrxiv"&#93; |
| `publisher` | 文字列 | オプション |
| `include_details` | 真偽値 | 任意; デフォルト: true |
| `date_from` | 文字列 | オプション |
| `date_to` | 文字列 | オプション |
| `recent_days` | 整数 | 任意; 最小値: 1 |
| `recent_count` | 整数 | 任意; 最小値: 1 |
| `limit` | 整数 | 任意; デフォルト: 10; 最小値: 1; 最高: 100 |
| `cursor` | 整数 | 任意; デフォルト: 0; 最小値: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder` {/* #search_by_funder */}

ROR id(9-char)で特定された資金提供者を認める事前プリントを探す。 " 021nxhr62"の特長 NIH のため; [https://ror.org/](https://ror.org/)のURLも受け付けています。 明示的な date_from + date_to が必要です。 資金提供者のメタデータは2025-04-10から始まります。 任意カテゴリ フィルター。 カーソルのペジネート。 search_preprintsと同じコンパクトな結果形状です。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `funder_ror_id` | 文字列 | **必須** |
| `date_from` | 文字列 | **必須** |
| `date_to` | 文字列 | **必須** |
| `server` | 文字列 | 任意; デフォルト: "biorxiv"; enum: &#91;"biorxiv"、"medrxiv"&#93; |
| `category` | 文字列 | 任意; enum: &#91; &#93;"動物行動と認知", , "生物化学", , "バイオエンジニアリング", , "バイオインフォマティクス", , "生物物理", , "がん生物学", , "細胞生物学", , "臨床試験", , "開発生物学", , "エコロジー", , "疫学", , "進化する生物学", , "遺伝学", , "ゲノム", , "免疫学", , "マイクロバイオロジー", , "分子生物学", , "神経科学", , "パロントロジー", , "病理学", , "薬理学・毒性学", , "生理学", , "植物生物学", , "科学的コミュニケーションと教育", , "合成生物学", , "システム生物学", , "動物園". . . |
| `limit` | 整数 | 任意; デフォルト: 10; 最小値: 1; 最高: 100 |
| `cursor` | 整数 | 任意; デフォルト: 0; 最小値: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics` {/* #get_content_statistics */}

すべての歴史上のバイオRxiv投稿統計 — 累積合計を実行して、期間ごとに新しい対修正された紙カウント。 間隔は"monthly"です (デフォルト) または "yearly".

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `interval` | 文字列 | 任意; デフォルト: "monthly"; enum: &#91;"monthly", "yearly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics` {/* #get_usage_statistics */}

すべての歴史上のbioRxiv使用/エンゲージメント統計 — 抽象的なビュー、全文ビュー、およびPDFは、累積的な合計を実行して、期間ごとにダウンロードします。 間隔は"monthly"です (デフォルト) または "yearly".

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `interval` | 文字列 | 任意; デフォルト: "monthly"; enum: &#91;"monthly", "yearly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## 薬物規制 {/* #family-12 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `search_drug_applications` {/* #search_drug_applications */}

正確なフレーズフィルタ(ブランド、ジェネリック、active_ingredient、スポンサー、marketing_status、dosage_form、ルート、pharm_class)の組み合わせで、Drugs@FDAアプリケーション(NDA/ANDA/BLA)を検索します。 ジェネリックとpharm_classは、調和したopenfdaブロックをクエリします(古いアプリケーションに従ったので、黙ってそこにスキップ)。 広範な検索は、真の合計とtuncated=trueで最初のmax_recordsを返します。 submission_date_from/to と狭く、~26,000 レコードを超えてページへ。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `brand` | 文字列 | オプション |
| `generic` | 文字列 | オプション |
| `active_ingredient` | 文字列 | オプション |
| `sponsor` | 文字列 | オプション |
| `marketing_status` | 文字列 | 任意; enum: &#91;"Prescription", "Overthe-counter", "Discontinued", "None (暫定承認)"&#93; |
| `dosage_form` | 文字列 | オプション |
| `route` | 文字列 | オプション |
| `pharm_class` | 文字列 | オプション |
| `pharm_class_type` | 文字列 | 任意; エヌム: &#91;"epc"、"moa"、"cs"、"pe"&#93; |
| `search_type` | 文字列 | 任意; デフォルト: "and"; enum: &#91;"and", "or"&#93; |
| `submission_date_from` | 文字列 | オプション |
| `submission_date_to` | 文字列 | オプション |
| `raw_search` | 文字列 | オプション |
| `max_records` | 整数 | 任意; デフォルト: 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application` {/* #get_drug_application */}

番号(例:)による1つの薬物@FDAの塗布をフェッチします。 "NDA020702"、"ANDA076543"、"BLA125514")。 スポンサー、プロダクト(ブランド、活動的な原料+強さ、適量形態、ルート、マーケティングの状態、TEコード)、完全な投稿の履歴および現時点で調和させたopenfdaの分野を戻して下さい。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `application_number` | 文字列 | **必須** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications` {/* #count_drug_applications */}

Aggregate Drugs@FDA バケットは、search_drug_applications と同じフィルタでオプションで絞り込みます。 count_fieldは、フレンドリーな名前(sponsor_name、application_number、dosage_form、ルート、marketing_status、te_code、pharm_class_epc/moa/cs/pe)、または生のopenFDAフィールドパス(分析されたフィールドのために自分自身を.exact)を受け入れます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `count_field` | 文字列 | **必須** |
| `brand` | 文字列 | オプション |
| `generic` | 文字列 | オプション |
| `active_ingredient` | 文字列 | オプション |
| `sponsor` | 文字列 | オプション |
| `marketing_status` | 文字列 | オプション |
| `dosage_form` | 文字列 | オプション |
| `route` | 文字列 | オプション |
| `pharm_class` | 文字列 | オプション |
| `pharm_class_type` | 文字列 | 任意; エヌム: &#91;"epc"、"moa"、"cs"、"pe"&#93; |
| `search_type` | 文字列 | 任意; デフォルト: "and"; enum: &#91;"and", "or"&#93; |
| `submission_date_from` | 文字列 | オプション |
| `submission_date_to` | 文字列 | オプション |
| `raw_search` | 文字列 | オプション |
| `max_buckets` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics` {/* #get_drug_statistics */}

コーパスレベルのDrugs@FDAの統計は1つの呼び出しで - トータルアプリケーション、マーケティング統計分割、トップの投与量の形態とルート(異なる数を持つ)、およびアプリケーションカウントによるトップスポンサー。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes` {/* #list_pharmacologic_classes */}

薬理学クラスをアプリケーションのカウントで列挙し、調和したopenfda.pharm_class_&lt;type>にカウント ブロック カウントは、そのブロックを運ぶアプリケーションだけを反映します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `class_type` | 文字列 | 任意; デフォルト: "epc"; エヌム: &#91;"epc"、"moa"、"cs"、"pe"&#93; |
| `max_buckets` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents` {/* #get_generic_equivalents */}

ブランド薬の一般的な同等性:ブランドを参照アプリケーション(s)に解決し、正確な有効成分名セット(s)を抽出し、アクティブ・オリエント・セット・マッチ(TEコードおよびマーケティングステータスを含む)を有効成分とする製品で、すべてのDrugs@FDAアプリケーションを返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `brand` | 文字列 | **必須** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels` {/* #search_drug_labels */}

対象となるセクション抽出物と成分/名前/経路によって FDA 医薬品製品ラベル (SPL) を取得します。 フィルター(active_ingredient、generic_name、brand_name、ルート、product_type)は、openfdaラベルブロックをヒットしました。 非分析された .exact のバリアントをクエリするために厳密に設定します。 デフォルト構造のレコードの代わりに、原材料のopenFDAラベルセクションを抽出するセクションを渡します。 raw_searchは、マップされたフィルタと相互に排他的です。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `active_ingredient` | 文字列 | オプション |
| `generic_name` | 文字列 | オプション |
| `brand_name` | 文字列 | オプション |
| `route` | 文字列 | オプション |
| `product_type` | 文字列 | 任意; enum: &#91;"HUMAN PRESCRIPTION DRUG", "HUMAN OTC DRUG"&#93; |
| `exact` | 真偽値 | 任意; デフォルト: false |
| `raw_search` | 文字列 | オプション |
| `sections` | 文字列の配列 | オプション |
| `max_records` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## ヒト遺伝学 {/* #family-13 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `gwas_associations_for_variant` {/* #gwas_associations_for_variant */}

GWASカタログ協会は、まず第一種(rsID)に対して報告しました。 引数: rs_id (dbSNP rsID など) rs7412 APOE か rs699 AGT; カタログ's現在の rsID — merged/retired ID は、エラーではなくゼロ行を返すことができます。 max_records (出力キャップのデフォルト500; トレイトハブのバリアントは、1000+の関連付けを運ぶことができます。 行は p-value の昇順でサーバーソートされるので、 キャプチャされた結果はトップ・シグナルの接頭辞です)。 &#123;rs_id、api_total、返された、truncated、関連付け&#125;を返します。 api_totalはカタログ's自身の合計です; truncated フラグは、キャプチャされたフェッチをフラグします。 各協会の行: &#123;association_id, p_value, pvalue_mantissa, , pvalue_exponent, , pvalue_description, , or_value, ベータ, ci_lower, , ci_upper、範囲、 risk_frequency, , snp_effect_alleles, , rs_ids、場所、 mapped_genes, , efo_traits:&#91;:&#93;&#91;:&#93;&#123;efo_id, , efo_trait&#125;. . bg_efo_traits, , reported_trait, , multi_snp_haplotype, , snp_interaction, , study_accession_id, , pubmed_id, , first_author&#125;. . . . or_valueとベータは、列ごとに相互に排他的です(バイナリ対量的)。 0.0のp_valueはp &lt;を意味します ~1e-308 (使用マンチッサ/exponent)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `rs_id` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene` {/* #gwas_associations_for_gene */}

遺伝子にMAPPEDであるGWASカタログ協会(catalog'sアンサンブルパイプラインマッピング)が最も重要である。 引数: gene_symbol (HGNC シンボル、正確なマッチなど) PCSK9、APOE; ケースに敏感な上流 — キャノンの上敷を渡す; 遺伝子の種別マップは遺伝子をフランクにするため、遺伝子の体外に列が置くことがあります。 max_records (標準的なデフォルト500をおおって下さい; p-value の昇順でサーバーをソートします。 &#123;gene_symbol、api_total、返された、truncated、関連付けを返す&#125; gwas_associations_for_variantと同じ列形状で。 存在しないシンボルは、エラーではなく、api_total=0を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait` {/* #gwas_associations_for_trait */}

GWASカタログは、EFO特性を1つに注釈付けし、最も重要である。 Args: efo_id (カタログ等で使用される腫瘍学的用語略形) MONDO_0005010、EFO_0004340、HP_0003124; カタログは、多くの歴史的なEFO IDをMONDO / HPに移行しました。 gwas_search_traitsで現在のIDを最初に解決します。 efo_id/efo_traitの1つを正確に渡して下さい; efo_trait (有効な特性のLABELの代わり); max_records (標準的なデフォルト500をおおって下さい; 行 p-value 昇順) &#123;efo_id_efo_trait、api_total、返送、truncated、関連付け&#125; gwas_associations_for_variantと同じ列形状で。 未知の id/label は、エラーではなく api_total=0 を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `efo_id` | 文字列 | オプション |
| `efo_trait` | 文字列 | オプション |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits` {/* #gwas_search_traits */}

ラベルのサブストリングによるGWASカタログEFOトレイトアノテーションを検索 — gwas_associations_for_trait / gwas_search_studiesが取る腫瘍学IDに病気/フェノタイプの名前を解決するためのエントリポイント。 Args: クエリ(トレイトラベルのケースインセンティブサブストリングなど) "コロナリー" 冠動脈障害MONDO_0005010等と一致して下さい; カタログは、EFO、MONDO、HP、OBA ids をミックスします。 — don't は EFO_ 接頭辞を仮定します。 max_records (標準の500を要して下さい)。 &#123;query、api_total、返された、truncated、efo_traits&#125;; 各行 &#123;efo_id、efo_trait、uri&#125; ラベルでソートします。 カタログ'sに対するカウント検証は、キャップされていないときの合計を所有しています。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies` {/* #gwas_search_studies */}

特性の注釈または出版物によってGWASのカタログの調査を捜して下さい。 アーグ:efo_id(腫瘍学ショートフォームなど) gwas_search_traitsで解決するMONDO_0005010; フィルターは結合し、–通常1つを渡します; efo_trait (正確な特性のラベルの代わり); pubmed_id (研究のPubMed ID'sの出版物、例えば。 38714703); max_records (標準の500を要して下さい)。 &#123;filters、api_total、返された、truncated、search&#125;を返す; 各研究の行 &#123;accession_id、disease_trait、efo_traits、bg_efo_traits、pubmed_id、initial_sample_size、replication_sample_size、discovery_ancestry、replication_ancestry、genotyping_technologies、プラットホーム、cohort、full_summary_stats_available、妨げられる、gxe、gxg&#125;。 キャップされていない場合、カタログの合計に対してカウント検証。 少なくとも1つのフィルターが必要です(ろ過されていないカタログは~90kの調査です)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `efo_id` | 文字列 | オプション |
| `efo_trait` | 文字列 | オプション |
| `pubmed_id` | 文字列 | オプション |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study` {/* #gwas_get_study */}

GCSTアクセスによる1つのGWASカタログの研究をフェッチします。 引数: accession_id (study accession, 例えば. GCST90841394; study_accession_id および研究検索結果としてすべての関連付け行にリストされている。 &#123;found、accession_id、search&#125;を返す gwas_search_studies(アクセスが不明な場合のnull)と同じ列形状のスタディです。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant` {/* #gwas_get_variant */}

rID による 1 つの GWAS カタログ バリアント レコード (位置、マップされた遺伝子、結果) — より軽やかにその関連付けを引っ張ります。 引数: rs_id (dbSNP rsID など) rs7412). &#123;found、rs_id、 variant&#125; を返します。 バリアントは&#123;rs_id、合併、functional_class、most_severe_consequence、アレル(例:)です。 "C/T (フォワード)"、mapped_genes、場所:&#91;&#123;染色体、位置、地域&#125;&#93;、last_update_date&#125; — GRCh38 — または rsID がカタログにないとき null を 配置します。 merged=1 は、 rsID が別のレコード上流にマージされたことを意味します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `rs_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets` {/* #eqtl_list_datasets */}

eQTLカタログデータセット(1つのデータセット=1つの研究x組織/セルタイプx定量化方法)をリストします。 アーグ: study_label (例:例:例) GTEx、Alasoo_2018、BLUEPRINT。 tissue_label(正確な組織/細胞型ラベル、例えば。 肝臓、マクロファージ、LCL — カタログの小文字。 quant_method (ge=gene式、exon、tx、txrev、microarray、リーフカッター、aptamer=プラズマタンパク質; 従来の遺伝子レベルの eQTLs では、ge を使用します。 max_records (標準的なデフォルト1000をおおって下さい; 完全無濾過カタログは ~760 データセット) &#123;filters、返された、truncated、datasets&#125;を返す dataset_idでソート。 &#123;dataset_id (QTD...)、study_id (QTS...)、study_label、sample_group、tissue_id、tissue_label、condition_label、quant_method、sample_size&#125;。 API は合計数を発行しません。 truncated=false はリストが完成していることを証明します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `study_label` | 文字列 | オプション |
| `tissue_label` | 文字列 | オプション |
| `quant_method` | 文字列 | オプション |
| `max_records` | 整数 | 任意; デフォルト: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations` {/* #eqtl_associations */}

遺伝子、変異体または領域でフィルタリングされた1つのeQTLカタログデータセットから分子QTLの関連付け行。 Args: dataset_id (eqtl_list_datasetsからのQTDアクセス)、例えば。 QTD000266; gene_id (非バージョン化 遺伝子 ID を組み立てるなど) ENSG00000130203 APOE; gene_id/rsid/variant/pos の少なくとも 1 つは要求されます; rsid (dbSNP rsID); バリアント(eQTLカタログバリアント文字列chr19_44908822_C_T、chrプレフィックスアンダースコアGRCh38); pos (ゲノムウィンドウ染色体:start-end GRCh38 no chr 接頭辞、例えば。 19:44900000-44920000); nlog10p_min (重要なフロア: -log10(p) の行のみ、>=これに適用され、上流); max_records (標準の1000 = 1ページ)。 &#123;dataset_id、フィルター、返された、truncated、関連付け&#125;を返します。 各行 &#123;molecular_trait_id, gene_id, 変種, rid, 染色体, 位置, 参照, alt, タイプ, β, s, pvalue, nlog10p, maf, ac, an, r2, median_tpm&#125;. 行は、cisウィンドウのみをカバーします。 検証されたデータセット (各遺伝子の±1 Mb)。 空の手段は、"not のテスト/未発表" を意味します。 総数が公開されていません: truncated=false は排気を証明します, truncated=true は、キャップがヒットしたことを意味します.

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `dataset_id` | 文字列 | **必須** |
| `gene_id` | 文字列 | オプション |
| `rsid` | 文字列 | オプション |
| `variant` | 文字列 | オプション |
| `pos` | 文字列 | オプション |
| `nlog10p_min` | 数値 | オプション |
| `max_records` | 整数 | 任意; デフォルト: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances` {/* #phewas_instances */}

パブリックPheWeb PheWASポータルをこのサーバーにリストすると、ゲノムビルドと機能レジストリがクエリできます。 &#123;instances:&#123;key:&#123;label、base_url、genome_build、機能、note&#125;&#125;&#125;を返します。 関数は、各インスタンスのエンドポイントを明示します: バリアント (phewas_variant), gene (phewas_finngen_gene), phenotypes (phewas_list_phenotypes), autocomplete (phewas_search_phenotypes). ビルド分割: FinnGen R12 バリアント ID は GRCh38 です。 BioBank Japan(pheweb.jp)はGRCh37/hg19で、クロスクエリ前のリフトオーバー座標です。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant` {/* #phewas_variant */}

PheWAS は、バイオバンク PheWeb ポータル内のすべての phenotype に対するその関連付けの統計を 1 つの variant にまとめました。最も重要なのは 1 つです。 Args: インスタンス (finngen FinnGen R12 GRCh38, bbj BioBank Japan GRCh37;) variant は、インスタンス 's ビルドに必須です。 バリアント(クロム-pos-ref-alt、 :/_区切り文字とchr接頭文字の許容値、例えば。 19-44908822-C-T APOE rs7412 GRCh38/finngen か 1-55505647-G-T PCSK9 rs11591147 GRCh37/bbj); max_phenos (標準的なデフォルト200をおおって下さい; FinnGen は ~2470 行を返します。 p-value をキャッピング前にソートします。 &#123;instance、genome_build、変種、variant_meta、合計、戻り値、truncated、phenotypes&#125;; variant_meta &#123;chrom、pos、 ref、alt、rsids、nearest_genes、gnomad(FinnGenのみ)&#125;。 各フェノタイプ行 &#123;phenocode、フェノスト、カテゴリ、pval、mlogp、ベータ、sebeta、af&#124;maf、maf_case、maf_control、n_cases、n_controls、n_samples&#125; (未公開フィールドnull) BBJ行にAF、FinnGen行にはマフトレット+モロプがあります。 未知のバリアントは、未知のエラーを発生させます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `instance` | 文字列 | **必須**; enum: &#91;"finngen"、"bbj"&#93; |
| `variant` | 文字列 | **必須** |
| `max_phenos` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene` {/* #phewas_finngen_gene */}

FinnGen R12から遺伝子レベルのPheWAS:すべての疾患エンドポイント、遺伝子領域における最も有意な多様体、最も重要です。 Args: gene_symbol (HGNCシンボルなど) PCSK9、APOE; 未知のシンボルは、未知のエラーを発生させます。 max_phenos (標準的なデフォルト200をおおって下さい; FinnGen は、 ~2470 エンドポイント、1 行それぞれ。 p-value をキャッピング前にソートします。 &#123;instance:"finngen"、genome_build:"GRCh38"、gene_symbol、合計、リターン、tuncated、phenotypes&#125;; 各行は、phewas_variant行形状とバリエーション:&#123;chrom、pos、 ref、alt、varid、rsids&#125; — この遺伝子's領域(region !=遺伝子体内)でそのエンドポイントの最上位の変異体。 PheWeb は遺伝子境界線をパッドします。 ほとんどの行は null の結果 (pval) です。~1) — パーエンドポイントBESTのバリアントはまだ報告されています。 重要なヒットのために自分自身をpvalすることによってフィルタリング.

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | **必須** |
| `max_phenos` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes` {/* #phewas_list_phenotypes */}

PheWeb インスタンスの phenotype (disease endpoint) の完全カタログ(case/control カウント)。 引数: インスタンス(現在のところ finngen のみがこのエンドポイントを公開します。 BBJは使用しません — phewas_search_phenotypes を使用してください。 max_records (キャップのデフォルト 3000 > FinnGen's ~2470 エンドポイントなので、デフォルトでは完全なカタログを返します。 &#123;instance、合計、返された、truncated、phenotypes&#125;を戻して下さい phenocode でソート 各行 &#123;phenocode(例:phenocode) "T2D"、フェノスト、カテゴリ、num_cases、num_controls、num_gw_significant(そのエンドポイントのゲノムワイド重要なロシのカウント)&#125;。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `instance` | 文字列 | 任意; デフォルト: "finngen"; enum: &#91;"finngen"&#93; |
| `max_records` | 整数 | 任意; デフォルト: 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes` {/* #phewas_search_phenotypes */}

名称でPheWebインスタンス'sのフェノタイプ(およびエンティティティ)を検索する — phenocodeに疾患名を解決するためのエントリポイント。 引数: クエリ (free-text phenotype query e.g.) "diabetes"、"asthma"; phenotypeの名前/コードにマッチして下さい; 遺伝子名と rsID にマッチするインスタンスもいくつかあります。 インスタンス (finngen のデフォルトまたは bbj — 両方ともオートコンプリートをexpose)。 max_records (標準的なデフォルト500をおおって下さい; オートコンプリート応答はショートリストであり、ほとんどキャッピングされていません。 &#123;instance、クエリ、合計、返された、tuncated、match&#125;を返します。 各マッチ&#123;display、フェノコード、url&#125;。 phewas_list_phenotypes 行またはインスタンスのウェブサイトで phenocode を使用します。 BBJ は括弧にコードを埋め込む文字列を表示します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `instance` | 文字列 | 任意; デフォルト: "finngen"; enum: &#91;"finngen"、"bbj"&#93; |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## エクスプレス {/* #family-14 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `gtex_tissue_sites` {/* #gtex_tissue_sites */}

ピン留めされたGTExリリース(gtex_v8の54)のメタデータを持つすべての組織サイトをリストします。サンプルカウント、eGene/sGeneカウント、カラーコード、およびUBERONのオントロジーID。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info` {/* #gtex_dataset_info */}

メタデータ:datasetId, GENCODE version, genome build, dbSNP build, サンプル/subject/tissue count とすべての GTEx のデータセットリリースをリストします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `dataset_id` | 文字列 | オプション |
| `organization_name` | 文字列 | オプション |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info` {/* #gtex_sample_info */}

tissue_site_detail_id、data_type(例)でフィルタリングされたピン留めされたGTExリリースのサンプルとドナーメタデータ RNASEQ、WGS、またはsubject_id。 ページの数と数の倍率; 非フィルタリングされたコールは数千のサンプルの10つにマッチします。そのため、max_samplesをフィルタリングまたはセットします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `tissue_site_detail_id` | 文字列 | オプション |
| `data_type` | 文字列 | オプション |
| `subject_id` | 文字列 | オプション |
| `max_samples` | 整数 | オプション |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes` {/* #gtex_resolve_genes */}

遺伝子のシンボルを解決したり、未バージョンのアンサンブルIDをバージョンアップさせた GENCODE ID をピン留めしたリリースで解決したりします。 GAPDH ->の特長 ENSG00000111640.14。 id を式/eQTL ツールに送ります。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `genes` | 文字列の配列 | **必須** | 7 / 0 / 0 |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression` {/* #gtex_median_expression */}

組織全体で1つ以上のVERSIONED GENCODE ids(全組織を省略)のメディア遺伝子発現(TPM)。 (遺伝子、組織) 行を上回るページ分割およびカウント検証。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gencode_ids` | 文字列の配列 | **必須** |
| `tissue_site_detail_ids` | 文字列の配列 | オプション |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary` {/* #gtex_expression_summary */}

メディアのTPMを降下した全組織全体で遺伝子の発現を損なう。 シンボルまたはアンサンブルIDを承認し、最初にバージョンアップされたGENCODE IDに自動解決します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene` | 文字列 | **必須** |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression` {/* #gtex_gene_expression */}

サンプルレベル(集約されない)式 TPM 配列 1 つの VERSIONED GENCODE id, 組織ごとに (全ての組織を省略). 各組織のフルサンプルTPM配列とn_samplesを返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gencode_id` | 文字列 | **必須** |
| `tissue_site_detail_ids` | 文字列の配列 | オプション |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes` {/* #gtex_top_expressed_genes */}

1つの組織でメディアTPMによるトップn遺伝子, API-sideのランキングを使用して. filter_mt_gene (デフォルトtrue) は、ランキングからミトコンドリア遺伝子をドロップします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `tissue_site_detail_id` | 文字列 | **必須** |
| `n` | 整数 | 任意; デフォルト: 100 |
| `filter_mt_gene` | 真偽値 | 任意; デフォルト: true |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes` {/* #gtex_eqtl_genes */}

すべての eGenes (≥1 の重要な cis-eQTL の遺伝子) 組織のために。 ページごとにページを移動し、カウントを検証(例) パンクレアス gtex_v8 = 9,660. max_genes は、何行が返されるかをキャップします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `tissue_site_detail_id` | 文字列 | **必須** |
| `max_genes` | 整数 | オプション |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls` {/* #gtex_single_tissue_eqtls */}

遺伝子および/または多様体(事前に入力)のための重要な単一組織のcis-eQTLの関連付け。 gencode_idおよび/またはvariant_idを提供して下さい; tissue_site_detail_idオプションで狭い。 ページ作成とカウント検証。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gencode_id` | 文字列 | オプション |
| `variant_id` | 文字列 | オプション |
| `tissue_site_detail_id` | 文字列 | オプション |
| `max_results` | 整数 | オプション |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls` {/* #gtex_multi_tissue_eqtls */}

汎用 cis-eQTL メタ解析 (メタソフト) を VERSIONED GENCODE id に統合しました。 variant_idは、オプションで1つのバリアントに絞り込みます。 per-tissue m-values, NES, p-values, SEs で per-variant 行を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gencode_id` | 文字列 | **必須** |
| `variant_id` | 文字列 | オプション |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl` {/* #gtex_calculate_eqtl */}

eQTL を 1 つの組織の任意の遺伝子-variant ペアのためのフライで計算します。, 非重要なペアを含みます。. p-value、NES、t-statistic、MAF、per-sample genotype/expression 配列を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gencode_id` | 文字列 | **必須** |
| `variant_id` | 文字列 | **必須** |
| `tissue_site_detail_id` | 文字列 | **必須** |
| `dataset_id` | 文字列 | 任意; デフォルト: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## 蛋白質のアノテーション {/* #family-15 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `get_domain_architecture` {/* #get_domain_architecture */}

1つ以上のUniProtタンパク質(すべてのマッチングエントリ、メンバーDBシグネチャ、フラグメント座標)のための完全なInterProドメインアーキテクチャは、APIカウントに対して検証しました。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accessions` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries` {/* #search_interpro_entries */}

キーワードは、InterProまたはメンバーデータベースエントリ(Pfam、SMART、PROSITE、PANTHER、CDD)で検索し、APIカウントから検証されたカーソルを完成させます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | オプション |
| `entry_type` | 文字列 | オプション |
| `source_db` | 文字列 | 任意; デフォルト: "interpro" |
| `go_term` | 文字列 | オプション |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry` {/* #get_interpro_entry */}

InterProエントリー(IPRxxxxxxxxx)またはPfamファミリー(PFxxxxx)の詳細レコード - アクセスプレフィックスで選択したルート。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans` {/* #search_pfam_clans */}

キーワード検索オーバー Pfam クラン (InterPro セット, アクセス CLxxxx).

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | オプション |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan` {/* #get_pfam_clan */}

Pfam は、完全なソートされたメンバーファミリーリストを含む詳細を明らかにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `clan_accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins` {/* #get_pfam_family_proteins */}

Pfamファミリーの会員タンパク質(完全カウントベリードウォークまたはカウントのみ)。 count_onlyは、非常に大きな家族のために使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pfam_accession` | 文字列 | **必須** |
| `reviewed_only` | 真偽値 | 任意; デフォルト: false |
| `tax_id` | 整数 | オプション |
| `count_only` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes` {/* #get_pfam_family_proteomes */}

Pfamファミリーのメンバーを含むプロテオム。 count_only デフォルトは true — 上流のプロテオムカーソルのペジネーションは、深い散歩に欠陥があります。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `pfam_accession` | 文字列 | **必須** |
| `count_only` | 真偽値 | 任意; デフォルト: true |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene` {/* #get_protein_atlas_gene */}

ヒトタンパク質アトラス/遺伝子記録(25.xリリース):組織/細胞/病理/血液/脳表現と抗体情報。 遺伝子IDや遺伝子のシンボルを組み入れます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene` | 文字列 | **必須** |
| `full` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas` {/* #search_protein_atlas */}

ヒトプロテインアトラス(search_download)を上回る列選択されたバルク検索。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `columns` | 文字列 | 任意; デフォルト: "g、gs、eg、gd、up、chrp、scl" |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids` {/* #map_string_ids */}

遺伝子のシンボル/エイリアスをストリングするタンパク質識別子(v12.0)にマップします。 すべての入力記号は、マップされていないか、またはマップされていない形式でリストされているかです。2つのパーティションは、入力を分割します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `symbols` | 文字列の配列 | **必須** |
| `species` | 整数 | 任意; デフォルト: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network` {/* #get_string_network */}

遺伝子リスト(v12.0)のためのタンパク質タンパク質相互作用ネットワークを自信のしきい値でストリングします。 地図のシンボルは最初に(報告されていない)、そしてノード、エッジ、要約、および実証を取得します。 単一のマッピングされた入力要求 10 の相互作用の隣接者、一致の力; 複数のマッピングされた入力は展開されません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `symbols` | 文字列の配列 | **必須** |
| `species` | 整数 | 任意; デフォルト: 9606 |
| `required_score` | 整数 | 任意; デフォルト: 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores` {/* #get_string_similarity_scores */}

スミスウォーターマンタンパク質類似性ビットコア遺伝子セット(ストリング/ホモロジー)の間で。 Sparse: STRING's のデータから absent をペアリングする (つまり、ゼロではなくレコードの類似性を意味しません)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `symbols` | 文字列の配列 | **必須** |
| `species` | 整数 | 任意; デフォルト: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits` {/* #get_string_best_similarity_hits */}

ターゲット種(STRING /homology_best)の入力タンパク質ごとにヒットした最高の均質学。 target_species=nullは、すべての種を越えた最高のヒットを求めています。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `symbols` | 文字列の配列 | **必須** |
| `species` | 整数 | 任意; デフォルト: 9606 |
| `target_species` | 整数 | オプション |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## がんモデル {/* #family-16 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `cbioportal_list_studies` {/* #cbioportal_list_studies */}

cBioPortal がん研究をリストし、任意にフリーテキストキーワード(名前/説明/カンサータイプ)および/または正確ながん型 ID でフィルタリングします。 学習 ID、名前、がんの種類、参照ゲノム、引用、およびデータ型サンプル数を返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `keyword` | 文字列 | オプション |
| `cancer_type_id` | 文字列 | オプション |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study` {/* #cbioportal_get_study */}

id による cBioPortal がん研究: メタデータ、データ型サンプル数、真のサンプル/patient カウント (研究コレクションから、表示領域ではなく)、その分子プロファイル。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `study_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene` {/* #cbioportal_mutations_in_gene */}

cBioPortal の 1 つの遺伝子(HUGO 記号)のすべての変異、再発の集約: 総変異、変異サンプル数、変異型およびタンパク質変化分布、および最も再発タンパク質変化。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | **必須** |
| `study_id` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency` {/* #cbioportal_mutation_frequency */}

複数のcBioPortal研究(1–12)に1つの遺伝子の突然変異頻度:選択した変異プロファイルとサンプルリストでその遺伝子のためにプロファイルされた標本によって分けられたユニークな変異サンプル、ターゲット遺伝子パネルの会計; 最も頻繁に最初にランク付けされる。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | **必須** |
| `study_ids` | 文字列の配列 | **必須**; minItems: 1; maxItems: 12の |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene` {/* #cbioportal_cna_in_gene */}

cBioPortal で 1 つの遺伝子のコピー番号変更を分離します。, イベントの種類によってフィルタリング (deep 削除 / デフォルトで増幅), フル per-sample 変化分布.

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `gene_symbol` | 文字列 | **必須** |
| `study_id` | 文字列 | **必須** |
| `event_type` | 文字列 | 任意; デフォルト: "HOMDEL_AND_AMP"; エヌム: &#91;"HOMDEL_AND_AMP", "HOMDEL", "AMP", "GAIN", "HETLOSS", "DIPLOID", "ALL"&#93; |
| `max_records` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes` {/* #cbioportal_clinical_attributes */}

cBioPortal スタディ(パテントとサンプルレベルのフィールド)で定義された臨床属性、生存エンドポイントを強調し、生存中のデータが存在するかどうか。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `study_id` | 文字列 | **必須** |
| `max_records` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## RNA(RNA) {/* #family-17 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `get_family` {/* #get_family */}

アクセス(RF00005)または家族ID(tRNA)用のRfamファミリーメタデータ - どちらも解決します。 "raw"のフルアップストリームJSONとフラット化されたレコード。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `family` | 文字列 | **必須** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment` {/* #get_seed_alignment */}

ストックホルムのRfamファミリーの種子配列(デフォルト、コンセンサス二次構造線付き)またはFASTAを一直線に並べる。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `family` | 文字列 | **必須** |
| `fmt` | 文字列 | 任意; デフォルト: "stockholm"; enum: &#91;"stockholm"、"fasta"&#93; |
| `max_bytes` | 整数 | 任意; デフォルト: 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model` {/* #get_covariance_model */}

Rfamファミリーの慣性コワランスモデル(CMファイル)は、cmsearch/cmscanと直接使用可能で、また、ヘッダフィールドを解析しました。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `family` | 文字列 | **必須** |
| `max_bytes` | 整数 | 任意; デフォルト: 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree` {/* #get_tree */}

Rfamファミリー(NHX/Newick text)の種子植物学的ツリー。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `family` | 文字列 | **必須** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions` {/* #get_sequence_regions */}

すべてのフルレギュレーションは、シーケンスデータベース(TSV)を渡るRfamファミリーのヒット。 get_familyを経由してnum_fullをチェックする - rfam.org 403s非常に大きな家族のためのこのルート(例えば、) RF00005。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `family` | 文字列 | **必須** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping` {/* #get_structure_mapping */}

RfamファミリーのPDB残余レベルの構造マッピング、決定的ソート。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `family` | 文字列 | **必須** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id` {/* #accession_to_id */}

Rfam のアクセスを家族 ID に変換 (例: Rfam) RF00005 -> "tRNA"。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession` {/* #id_to_accession */}

Rfam 家族 ID をそのアクセスに変換します。(例: Rfam 家族の ID) "tRNA"の特長 -> RF00005。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `family_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence` {/* #search_sequence */}

Rfam バッチの公式エンドポイントから RNA のシーケンスを検索します。 待機中に返されたジョブ ID を保持します。 未完成の応答はゼロヒットの結果ではありません。 完成した試合とソース情報を尊重します。 失敗した応答の後、それを繰り返し送信するのではなく、既存のジョブを診断または再開します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `sequence` | 文字列 | **必須** |
| `max_wait_s` | 数値 | 任意; デフォルト: 300 |
| `poll_interval_s` | 数値 | 任意; デフォルト: 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## Omics アーカイブ {/* #family-18 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `ena_query_runs` {/* #ena_query_runs */}

NCBI tax_id(子孫税を含む)、library_strategy、および/またはキーワードによる公開シーケンシングの実行を調査、実験またはサンプルタイトルで発見し、説明を実行します。 供給されたフィルターは AND と結合されます; 少なくとも1つは必要です。 分類は、シーケンスされた生物を記述します。, マイクロバイオムのサンプルのホストではありません. キーワードは、エンアクエリの構文ではなく、リテラルサブストリングです。 二重引用符、バックスラッシュ、ワイルドカード、制御文字は拒否されます。 パブリックメタゲノムレコードを含む。 truncated 時に完全なコホートではなく、境界メタデータのみを返します。 狭いセットを取得するための絞りフィルター。 繰り返された呼び出しはパジネーションではありません。 既知のINSDCアクセスでは、ena_search_runsを使用します。

少なくとも1つにリストされた調査フィルターを供給して下さい; ダウンロード可能なスキーマに、コンビネーションルールを完全適用します。

| 受け入れられた値 | 型 | 要件と制約 |
| --- | --- | --- |
| `tax_id` | 整数 | 任意; 最小値: `1`; 最高: `2147483647` |
| `library_strategy` | 文字列 | 任意; エヌム: `["AMPLICON", "ATAC-seq", "Bisulfite-Seq", "CLONE", "CLONEEND", "CTS", "ChIA-PET", "ChIP-Seq", "ChM-Seq", "DNase-Hypersensitivity", "EST", "FAIRE-seq", "FINISHING", "FL-cDNA", "GBS", "Hi-C", "MBD-Seq", "MNase-Seq", "MRE-Seq", "MeDIP-Seq", "NOMe-Seq", "OTHER", "POOLCLONE", "RAD-Seq", "RIP-Seq", "RNA-Seq", "Ribo-Seq", "SELEX", "Synthetic-Long-Read", "Targeted-Capture", "Tethered Chromatin Conformation Capture", "Tn-Seq", "VALIDATION", "WCS", "WGA", "WGS", "WXS", "miRNA-Seq", "ncRNA-Seq", "snRNA-seq", "ssRNA-seq"]` |
| `keyword` | 文字列 | 任意; 最長: `1`; 最高長さ: `200`; パターン: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `limit` | 整数 | 任意; デフォルト: `100`; 最小値: `1`; 最高: `1000` |

```javascript
const result = await host.mcp("omics-archives", "ena_query_runs", {"tax_id": 6239, "library_strategy": "RNA-Seq", "keyword": "transcriptome", "limit": 20})
```

### `ena_get_submitted_files` {/* #ena_get_submitted_files */}

ENAがそれらをexposesするときに提出されたBAM、CRAMまたはFASTQを含む1つのERR/SRR/DRRの操業のための元の提出されたファイルをリストして下さい。 FTPの場所、送信されたフォーマット、バイトサイズ、MD5チェックサムをメタデータとしてのみ返します。 ダウンロード、フォーマットの変換、参照のゲノムの検索、チェックサムの検証は行いません。 これらは、ena_get_run_filesで返されたアーカイブ生成されたFASTQではなく、アーカイブ生成されたSRAコンテナのリストではなく、提出されたファイルです。 CRAMは、解析のマッチングリファレンスが必要な場合があります。

| 受け入れられた値 | 型 | 要件と制約 |
| --- | --- | --- |
| `run_accession` | 文字列 | **必須**; 最長: `1`; 最高長さ: `64` |

```javascript
const result = await host.mcp("omics-archives", "ena_get_submitted_files", {"run_accession": "ERR10015065"})
```

### `ena_search_runs` {/* #ena_search_runs */}

1つのENA/INSDCの研究、実験、サンプルまたは実行アクセスに関連するパブリックシーケンシングの実行を検索します。 PRJ/ERP/SRP/DRP、ERX/SRX/DRX、SAM/ERS/SRS/DRS、ERR/SRR/DRR の識別子を受け入れて下さい; GEO GSE/GSM、ArrayExpress E-MTAB、MGnify MGYS 識別子は、最初にリンクされた INSDC アクセシジョンを必要とします。 キーワード検索ではなく、アクセス検索だけ。 データファイルを取得せずに、生物やライブラリメタデータを返します。 結果は、1000 で実行されます。 truncated 結果は完全なコホートではなく、ENA がオフセットや継続トークンを提供しないため、繰り返された呼び出しはパギー化されません。 完全なカバレッジが要求されるときより狭いサンプルか実験アクセスを使用して下さい。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須**; 最長: 1; 最高長さ: 64 |
| `limit` | 整数 | 任意; デフォルト: 100; 最小値: 1; 最高: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files` {/* #ena_get_run_files */}

1つのERR / SRR / DRRの実行のために、アーカイブ生成されたFASTQダウンロードURL、バイトサイズ、および上流MD5チェックサムを取得します。 ファイル在庫のみを返します。 ダウンロードやチェックサム検証は行いません。 不ペアリングまたは長読ファイルを含むレポート順序ですべてのファイルを保持します。 library_layout=PAIREDは2つのファイルではなく、正確に2つのファイルではありません。 file_index は、R1/R2 や mate の識別子のみで、位置情報です。 いくつかの実行(単一セル/ネイティブフォーマットの送信を含む)は、アーカイブ生成されたFASTQがありません。 BAM/CRAM/SRA ファイルは、このツールの外に送信されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `run_accession` | 文字列 | **必須**; 最長: 1; 最高長さ: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments` {/* #arrayexpress_search_experiments */}

ArrayExpress 機能ゲノム実験 (BioStudies) を、完全な、合計 Hits 検証済み検索検索; フィルタ(ケリー、生物、study_type、技術、リリース日付範囲、追加面)は AND と組み合わせます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | オプション |
| `organism` | 文字列 | オプション |
| `study_type` | 文字列 | オプション |
| `technology` | 文字列 | オプション |
| `released_after` | 文字列 | オプション |
| `released_before` | 文字列 | オプション |
| `extra_facets` | オブジェクト | オプション |
| `max_records` | 整数 | 任意; デフォルト: 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment` {/* #arrayexpress_get_experiment */}

フラットなアナリストレコードとしてのArrayExpress実験(BioStudies)を1つ取得 — 研究タイプ、有機体、アッセイ/サンプルカウント、デザイン/ファクター、作者、出版、プロトコル、配列デザイン、ファイルサマリー。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files` {/* #arrayexpress_get_experiment_files */}

ダウンロードURLでArrayExpressの実験(名前、サイズ、タイプ、フォーマット、説明)のすべてのファイル、および/infoのエンドポイントファイルカウントを比較用にまとめてリストします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples` {/* #arrayexpress_get_experiment_samples */}

ArrayExpress 実験 (MAGE-TAB ヘッダの動詞、 #2/#3 をリピートする) のための 1 サンプル SDRF アノテーション行をフェッチします。 SDRF のリターン無しの実験 &#123;"error":"no_sdrf"&#125;.

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |
| `max_rows_returned` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series` {/* #geo_search_series */}

NCBI GEO DataSet(db=gds)を検索し、シリーズレベルのレコード(トリムされたesummary docs)を返します。 `term` は完全な E ユーティリティの構文です。 gse&#91;ETYP&#93; を系列に制限する。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `term` | 文字列 | **必須** |
| `retmax` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series` {/* #geo_get_series */}

GEOシリーズ(GSEアクセス)用のメタデータ(GSEアクセス)が含まれている—シリーズのタイトル/概要/デザイン、プラットフォーム、特性とライブラリ情報を含むサンプル、および補足ファイルURL。 データテーブルはダウンロードされません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accessions` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies` {/* #metabolights_list_studies */}

API'sで公開されているMetaboLightsの学習アクセス(数値的にソート)をそれぞれリストします。 サーバサイドの学習検索はありません。代わりに、タイトル/記述子によって取得された候補をフィルタリングします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies` {/* #metabolights_get_studies */}

パースされたISAのペイロードからのMetaboLightsの調査(MTBLSxxx)のためのフェッチ構造化されたメタデータ — タイトル、状態、年、生物、試金、要因、記述子、サンプル計算、プロトコル; 任意/サンプル テーブル。 not_found で非公開/プライベートアクセスが出来ます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accessions` | 文字列の配列 | **必須** |
| `include_samples` | 真偽値 | 任意; デフォルト: false |
| `max_sample_rows_returned` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files` {/* #metabolights_get_study_files */}

パブリックMetaboLightsスタディ用の完全なファイルインベントリ — トップレベルのスタディフォルダ(ISA-Tab、MAF、フォルダエントリ)と、デフォルトでは、再帰的なFILESデータフォルダ。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |
| `include_data_files` | 真偽値 | 任意; デフォルト: true |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files` {/* #metabolights_search_data_files */}

MetaboLightsスタディ'sの生データフォルダ(FILESツリー)上のGlob検索。 `pattern` はファイル名の glob です。 '*.mzML'、'*.raw'; すべてのデータファイルを一覧表示するために省略します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |
| `pattern` | 文字列 | オプション |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies` {/* #mgnify_search_studies */}

無料のテキストまたはバイオメのリネンによるMGnifyのmetagenomicsの調査を見つけて下さい(正確に1つを証明して下さい)。 完全なリストは、APIに対する補完とカウント検証に始まります。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | オプション |
| `biome_lineage` | 文字列 | オプション |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies` {/* #mgnify_get_studies */}

MGnifyの研究(MGYSアクセス)のためのフェッチ構造レコード。 include_analysesでは、各研究では、その完全な分析リストとバイパイプライン/by-experimentブレークダウンも実施しています。 未知のアクセスが見つかりません。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accessions` | 文字列の配列 | **必須** |
| `include_analyses` | 真偽値 | 任意; デフォルト: false |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses` {/* #mgnify_get_study_analyses */}

MGnify の 1 つの研究(完全、カウント検証済みのペジネーション)のすべての分析を一覧表示 — MGYA によるパイプラインバージョン、実験タイプ、ステータス、および実行/アセンブリ/サンプルアクセスによる 1 つのレコード。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_get_project_files` {/* #pride_get_project_files */}

ファイルカテゴリ、バイトサイズ、上流チェックサム、ダウンロード場所(FTP、HTTPまたはAspera)を含む、PXDまたはPRDアクセス用のパブリックPRIDEプロジェクトファイルの1ページのリスト。 メタデータのみ:ファイルのダウンロードやチェックサムの検証は行いません。 ページはゼロベースです。 page_sizeは変更されず、next_pageをnullまで追従します。 注文は、スナップショットではなく、 PRIDE によって供給されます。 プロジェクトが存在するか、公開されているか、空のリストは確立しません。

| 受け入れられた値 | 型 | 要件と制約 |
| --- | --- | --- |
| `project_accession` | 文字列 | **必須**; 最高長さ: `32`; パターン: `"^(?:PXD\|PRD)[0-9]{6,}$"` |
| `page` | 整数 | 任意; デフォルト: `0`; 最小値: `0`; 最高: `1000000` |
| `page_size` | 整数 | 任意; デフォルト: `100`; 最小値: `1`; 最高: `100` |

```javascript
const result = await host.mcp("omics-archives", "pride_get_project_files", {"project_accession": "PXD000001", "page": 0, "page_size": 100})
```

### `pride_search_projects` {/* #pride_search_projects */}

PRIDEアーカイブプロテオミクスプロジェクト(完全、api_total検証済み検索)を検索します。 フィルター(キーワード、生物、器械、病気、extra_filters)は AND と結合します。 アクセス ASC でソートされた境界線は、安定した接頭辞です。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `keyword` | 文字列 | オプション |
| `organism` | 文字列 | オプション |
| `instrument` | 文字列 | オプション |
| `disease` | 文字列 | オプション |
| `extra_filters` | オブジェクト | オプション |
| `max_records_returned` | 整数 | 任意; デフォルト: 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects` {/* #pride_get_projects */}

アクセスによるPRIDEプロジェクトの完全なメタデータをフェッチします(例: PXD010154 — pride_search_projects と同じ正規化レコード形状なので、2 は直接比較可能です。 not_found に未知のアクセスが出る。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accessions` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins` {/* #pride_search_project_proteins */}

リスト タンパク質の証拠は、1つのPRIDEの親和性プロテオミクスプロジェクト(ページを排気に)のための行を列をリストします。 注意: アフィニティ・プロテオミクス・プロジェクトのみがここに提供されます。 古典的なMS(PXD)プロジェクトでは、代わりにpride_find_projects_for_proteinを使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `project_accession` | 文字列 | **必須** |
| `keyword` | 文字列 | オプション |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein` {/* #pride_find_projects_for_protein */}

タンパク質(MS-archive方向)を含む PRIDE プロジェクトを検索します。 `protein_accession`はUniProtアクセス(例:UniProt)です。 P04637). 返されたプロジェクトへのアクセスを pride_get_projects にフルメタデータで送ります。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `protein_accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## セルガイド {/* #family-19 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `get_cell_type_info` {/* #get_cell_type_info */}

CellGuide (CELLxGENE) セルオントロジー ID または名前による細胞型情報: 名前、同義語、オントロジーの説明、およびキュレーション/GPT 説明。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `cell_type` | 文字列 | **必須** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types` {/* #search_cell_types */}

名前と同義語を上回る無料のテキストでCellGuideセルタイプを検索します(CDNは検索エンドポイントを持たないため、celltype_metadata.jsonはクライアント側をフィルタリングします)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `limit` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes` {/* #get_marker_genes */}

細胞型(IDまたは名前)のセルギドマーカー遺伝子:計算式(データ生成、スコア)または正式(文字硬化)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `cell_type` | 文字列 | **必須** |
| `marker_type` | 文字列 | 任意; デフォルト: "computational"; enum: &#91;"computational"、"canonical"&#93; |
| `limit` | 整数 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data` {/* #get_source_data */}

セルガイドのソースデータセットと出版物は、セルタイプ(IDまたは名前):コレクション名/ URL、出版物、および各カバーの組織/ダイザース/組織に貢献します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `cell_type` | 文字列 | **必須** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues` {/* #get_cell_tissues */}

セルタイプ(IDまたは名前)が観察される解剖組織、セルガイドソースコレクション全体に集約(複製)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `cell_type` | 文字列 | **必須** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## レギュレーション {/* #family-20 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `encode_search_experiments` {/* #encode_search_experiments */}

ENCODE機能ゲノム実験(ChIP-seq、ATAC-seq、...)を検索します。 フィルター: assay_title (例えば。 "TF CHIP-seq"、ターゲット(タンパク質ラベル、例えば。 "CTCF"、生物(科学的名前)、状態(デフォルト"released")、date_released_before(ISO日付 — クローズドウィンドウ)、およびextra_filtersによる任意のポータルフィールドフィルタ。 完全な結果セットはページ作成され、カウント検証されます。 `accessions` は、ほとんどの max_rows 列の合計が返されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `assay_title` | 文字列 | オプション |
| `target` | 文字列 | オプション |
| `organism` | 文字列 | オプション |
| `status` | 文字列 | 任意; デフォルト: "released" |
| `date_released_before` | 文字列 | オプション |
| `extra_filters` | オブジェクト | オプション |
| `max_rows` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples` {/* #encode_search_biosamples */}

ENCODEバイオサンプル(セルライン、組織、プライマリセル)を検索します。 フィルター: term_name (腫瘍学の用語、例えば。 "K562"、分類("cell line"、"tissue"、...)、生物(科学的な名前)、状態(デフォルト"drelease")、date_created_before(ISO日付)、およびextra_filtersによる任意のポータルフィールドフィルタ。 完了、カウント検証済み: `accessions` は、ほとんどの max_rows 行の合計が返されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `term_name` | 文字列 | オプション |
| `classification` | 文字列 | オプション |
| `organism` | 文字列 | オプション |
| `status` | 文字列 | 任意; デフォルト: "released" |
| `date_created_before` | 文字列 | オプション |
| `extra_filters` | オブジェクト | オプション |
| `max_rows` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files` {/* #encode_list_files */}

フォーマット/アッセイ/バイオサンプルによってENCODEデータファイルをリストします。 フィルター: file_format ("fastq"、"bam"、"bigWig"、"bed"、...)、assay_term_name (腫瘍学の言葉等。 "ChIP-seq"の特長 — "TF CHIP-seq" のような表示 assay_title ではなく、何もマッチしません。 extra_filters=&#123;"assay_title":...&#125;)、biosample_term_name (例えば。 "K562"、ステータス(デフォルト"released")、date_created_before、およびextra_filtersによる任意のポータルフィールドフィルタ。 ファイルクエリは、フィルタリングされていない行の数百万にマッチします。常に複数のフィルタを組み合わせます。 完全 + カウント検証済み; max_rows 列の要約が返されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `file_format` | 文字列 | オプション |
| `assay_term_name` | 文字列 | オプション |
| `biosample_term_name` | 文字列 | オプション |
| `status` | 文字列 | 任意; デフォルト: "released" |
| `date_created_before` | 文字列 | オプション |
| `extra_filters` | オブジェクト | オプション |
| `max_rows` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment` {/* #encode_get_experiment */}

アクセシビリティによるENCODE実験を1つ取得(例:) "ENCSR000AKP")。 安定したフィールドレコードを返します: 試金、ターゲット、バイオサンプルのオントロジー + 概要、説明、ラボ、アワードプロジェクト、リリース/サブミッションの日付、アセンブリ、再計算、レプリケーションタイプ、dbxrefs、DOIとuuid。 揮発性ポータルフィールド(監査、分析、内部状態)は除外されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file` {/* #encode_get_file */}

アクセスで1つのENCODEファイルを取得する(例: "ENCFF002JUR".(株) 安定したフィールドレコードを返します:フォーマット、出力タイプ/カテゴリ、アッセイ、アセンブリ、親データセット、生物学的レプリカ、ファイルサイズ、md5sums、実行タイプ、読み取り長さ、ラボ、作成日、ダウンロード時間とuuid。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample` {/* #encode_get_biosample */}

アクセスで1つのENCODEバイオサンプルを入手してください(例:) "ENCBS013JZP")。 安定したフィールドレコードを返す:腫瘍学の用語+分類、生物、要約/説明、ソース、ドナー、治療、遺伝的変更、ライフステージ、年齢、性別、ラボ、作成日、状態およびuuid。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `accession` | 文字列 | **必須** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix` {/* #jaspar_get_matrix */}

VERSIONED のマトリックス ID によって 1 つの JASPAR TF の結合のプロフィールを得て下さい(例えば。 "MA0002.2")。 フルレコードを返す:ポジション周波数行列(pfm)、TF名/クラス/家族、種、データ型、文献参照(パブ/medline)、シーケンスロゴURL。 "MA0002"ではなく、バージョンアップされたid("MA0002.2")が必要です。 jaspar_matrix_versionsを使用して、バージョンを列挙します。 バージョンアップされたマトリックスは不変なので、結果は再現性があります。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `matrix_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions` {/* #jaspar_matrix_versions */}

JASPARベースマトリクスIDのすべてのバージョンをリストします(例: "MA0002"。 matrix_id、名前、コレクション、URL でリリースされたすべてのバージョンをカウント検証します。 jaspar_get_matrix以前のバージョンをピン留めしたり、リリース間でプロファイルが変更されたかを追跡したりします。 バージョンID("MA0002.2")は、そのベースに受け入れられ、縮小されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `base_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices` {/* #jaspar_list_matrices */}

JASPAR TF結合プロファイル(フルプロファイルカタログ)を検索/リストします。 フィルタ(オプション):コレクション("CORE"、"UNVALIDATED")、tax_group("vertebrates"、"plants"、...)、tax_id(NCBIタキオノミーID、等。 人間のための9606 — これは、種によってフィルタリングする方法です。 jaspar_list_species で ID を列挙する (例: TF 名称) "FOXA1"、検索(無料テキスト)、version="latest" (最新バージョンのみの制限) フルフィルタされたカタログは paginated であり、カウント 検証済みです。 ほとんどの max_rows 要約行が返されます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `collection` | 文字列 | オプション |
| `tax_group` | 文字列 | オプション |
| `tax_id` | 整数 | オプション |
| `name` | 文字列 | オプション |
| `search` | 文字列 | オプション |
| `version` | 文字列 | オプション |
| `max_rows` | 整数 | 任意; デフォルト: 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species` {/* #jaspar_list_species */}

JASPARプロファイル(NCBI tax_id +名前)ですべての種をリストします。 カウント検証済みのフルリスト。 利用する tax_id フィルターへの値 jaspar_list_matrices (例) 9606=ホモ・サピアン、10090=ムスカルス)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa` {/* #jaspar_list_taxa */}

すべてのJASPAR分類グループ(脊椎動物、植物、真菌、昆虫、...)をリストします。 カウント検証済みのフルリスト。 jaspar_list_matricesのtax_groupフィルタとしてグループ名を使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections` {/* #jaspar_list_collections */}

すべてのJASPARコレクション(CORE、UnVALIDATED、...)をリストします。 カウント検証済みのフルリスト。 jaspar_list_matrices(CORE=硬化、非冗長プロファイル)のコレクションフィルタとしてコレクション名を使用します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases` {/* #jaspar_list_releases */}

すべてのJASPARデータベースリリース(年、リリース番号、アクティブフラグ)をリストします。 カウント検証済みのフルリスト。 JASPAR版で結果を比較する前に、motifs for reroducibility を選択するか、リリース履歴をチェックするときにアクティブなリリースを録音します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs` {/* #unibind_search_tfbs */}

UniBind ChIP-seq のデータセットを高機密 TFBS 予測 (unibind.uio.no, 2021 リリース) で検索します。 9 種を越える ~10k のデータセットからの直接 TF-DNA 相互作用)。 各データセットは1つの(実験、細胞タイプ、TF)の3倍です。 フィルタ(オプション、および組み込まれた、表記がない限り、完全一致): tf_name (遺伝子の記号、例えば。 "CTCF"、cell_line(verbose UniBind title — `search` を好みます)、種(科学的な名前)、コレクション("Robust") = 最高のモデル/高い自信、または"Permissive"、jaspar_id(バージョンアップ、など) "MA0139.1"、検索(無料テキスト)。 `total`はAPI'sの厳密な計算です; ほとんどの max_rows 行が返されます(安定した接頭辞)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `tf_name` | 文字列 | オプション |
| `cell_line` | 文字列 | オプション |
| `species` | 文字列 | オプション |
| `collection` | 文字列 | 任意; enum: &#91;"Robust", "Permissive"&#93; |
| `jaspar_id` | 文字列 | オプション |
| `search` | 文字列 | オプション |
| `max_rows` | 整数 | 任意; デフォルト: 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset` {/* #unibind_get_dataset */}

UniBind データセット's を 1 つ取得します。 TFBS は 1 つのモデルごとに + ファイル URL をカウントします。 tf_idはデータセットのキー"&lt;identifier>.&lt;cell_line>.&lt;TF>"です 返されるように unibind_search_tfbs (例) "ENCSR000AUE.A549_lung_carcinoma.CTCF")。 TF名、ソース識別子(ENCODE/GEO/GTRD)、セルライン、生物学的条件、JASPAR行列ID、ChIP-seqピークカウント、およびTFBS予測モデル(DAMO/PWM/...)ごとの1行をtotal_tfbs、スコア/距離境界、調整されたCenriMo p値、および直接BED/FASTAダウンロードURLを使用して、これらのURL(MCPではなく)を使用して、リストを完了します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `tf_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region` {/* #unibind_tfbs_in_region */}

TFバインディングサイトはゲノム領域(UniBind 2021マップ)をオーバーラップし、UCSCハブApiをUniBind'sに登録したパブリックトラックハブ(UniBind's独自のREST APIは地域エンドポイントを持たない)を介して提供しました。 座標は0ベースのハーフオープンです。 genome: UCSCアセンブリ — 堅牢なハブ: hg38, mm10, ce11, dm6, danRer11, sacCer3, rn6, araTha1; 許認可は spo2 (hg19 なし — 最初にリフト) を追加します。 クロム: "chr"を使って プレフィックス。 開始/終了:間隔、開始 &lt;= 1,000,000 bp。 HONEST-CAP:ほとんどの20,000項目は、呼び出しごとにスキャンされます。 region_scan_complete=false は、この領域がスキャン(ウィンドウの矢印)よりも多くのサイトを持っていることを意味し、tf_name が設定されて、マッチは失われる可能性があります。 n_matching は、フィルタを渡すスキャンされたサイトをカウントします。 max_sites キャップを返し/truncated で記述します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `genome` | 文字列 | **必須** |
| `chrom` | 文字列 | **必須** |
| `start` | 整数 | **必須** |
| `end` | 整数 | **必須** |
| `tf_name` | 文字列 | オプション |
| `collection` | 文字列 | 任意; デフォルト: "Robust"; enum: &#91;"Robust", "Permissive"&#93; |
| `max_sites` | 整数 | 任意; デフォルト: 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## 研究リソース {/* #family-21 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `search_grants` {/* #search_grants */}

Search2 API(完全で有能な検索)によるSrants.govの資金調達機会を検索します。 少なくとも1つの基準が必要です(キーワード、opportunity_number、aln/CFDA、代理店、エリジビティ、funding_categories、またはfunding_instruments)。 opportunity_statuses デフォルトは &#91;"forecasted","posted"&#93; (現在の機会); "closed"/"archived"を加えて下さい 歴史ある人のために。 &#91;"HHS-NIH11"&#93; (NIH), &#91;"HHS-FDA"&#93;, &#91;"NSF"&#93; のようなコードを取ります. ヒットカウント+ファセットだけにcount_onlyを設定します。 max_records キャップはレコードを返しました(歩行はまだ完全なセットおよびフラグをtruncated)。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `keyword` | 文字列 | オプション |
| `opportunity_number` | 文字列 | オプション |
| `aln` | 文字列 | オプション |
| `agencies` | 文字列の配列 | オプション |
| `opportunity_statuses` | 文字列の配列 | オプション |
| `eligibilities` | 文字列の配列 | オプション |
| `funding_categories` | 文字列の配列 | オプション |
| `funding_instruments` | 文字列の配列 | オプション |
| `count_only` | 真偽値 | 任意; デフォルト: false |
| `max_records` | 整数 | 任意; デフォルト: 100 |
| `include_facets` | 真偽値 | 任意; デフォルト: true |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies` {/* #search_antibodies */}

全文検索抗体レジストリ(抗体レジストリ、~3.2Mレコード)。 抗体名/ターゲット/カタログテキスト("TP53")に対するトークンベースのマッチング "p53"の特長 異なるクエリです)。 ページを省略すると、すべてのページがmax_recordsまたは匿名の深さのキャップ(オフセット500を超えて参照)に転送され、anonymous_limit_hitとしてフラグが付けられ、サイレントに落ちません。 1 ベースのページを単一ページ検索(ページ&#42;page_size は &lt;= 500) に続けてください。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `query` | 文字列 | **必須** |
| `page` | 整数 | オプション |
| `page_size` | 整数 | 任意; デフォルト: 100 |
| `max_records` | 整数 | 任意; デフォルト: 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody` {/* #get_antibody */}

1つの抗体アクセス/ RRID の抗体のレジストリの詳細レコードをフェッチします。 " 3643095"、"AB_3643095"、または"RRID:AB_3643095"。 上流のルートはリスト評価されます(アクセスは、いくつかのキュレーションレコードにマップすることができます。例: マルチベンダーの重複)。 存在しない id は、エラーではなく record_count 0 を yield します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `antibody_id` | 文字列 | **必須** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog` {/* #find_antibodies_by_catalog */}

ベンダーのカタログ番号(正確なケースインセンティブ)で抗体を探す。 上流の列フィルター ルートがすべてのキーのための HTTP 500 を返すので、カタログ番号(またはそのリストされた代替)のクライアント側の厳密な一致と全文検索として実装しました。 オプションのベンダー名(例、ケース・インセンティブ)を渡すと、さらにマッチを絞り込みます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `catalog_number` | 文字列 | **必須** |
| `vendor` | 文字列 | オプション |
| `page_size` | 整数 | 任意; デフォルト: 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats` {/* #get_antibody_registry_stats */}

抗体レジストリの統計量:総抗体カウントと最終更新日。 上流 /api/datainfo のペイロードを返します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## バイオマート {/* #family-22 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `list_marts` {/* #list_marts */}

利用可能なリストEnsembl BioMart marts(データベース)。 BioMartはMART->としてデータを整理します データセット -> アトリビューツ/フィルター; mart の名前は list_datasets に与えます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| — | オブジェクト | フィールドなし 空のオブジェクトを渡します。 |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets` {/* #list_datasets */}

指定したマートで利用可能なデータセット(例: hsapiens_gene_ensembl ヒト遺伝子用。 データセット名は、属性/フィルタ/クエリツールをフィードします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mart` | 文字列 | **必須** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes` {/* #list_common_attributes */}

一般的に使用される属性をデータセット(高信号サブセット)にリストします。 list_all_attributes の前にこれを使用して、get_data の属性を選択します。 `mart` は、署名のパリティが無視されます。 `dataset` のクエリキーをオフにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mart` | 文字列 | **必須** |
| `dataset` | 文字列 | **必須** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes` {/* #list_all_attributes */}

データセット、マイナスの均質ログ、およびマイクロアレイプローブ(多量でまれに必要)で利用可能なすべての属性をリストします。 大きい場合もあります; list_common_attributesを最初に好みます。 `mart` は、署名のパリティが無視されます。 `dataset` のクエリキーをオフにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mart` | 文字列 | **必須** |
| `dataset` | 文字列 | **必須** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters` {/* #list_filters */}

データセットで利用可能なフィルターを一覧表示します。 フィルターは狭いです get_data クエリ(例: chromosome_name、生体型) および get_data にフィルター dict として渡されます。 `mart` は、署名のパリティが無視されます。 `dataset` のクエリキーをオフにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mart` | 文字列 | **必須** |
| `dataset` | 文字列 | **必須** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data` {/* #get_data */}

BioMart クエリを実行します。: 要求された属性をデータセットで取得し、オプションでフィルタによって絞り込みます。 これは、主要なデータ検索ツールです。 `mart` は、署名のパリティが無視されます。 `dataset` のクエリキーをオフにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mart` | 文字列 | **必須** |
| `dataset` | 文字列 | **必須** |
| `attributes` | 文字列の配列 | **必須** |
| `filters` | オブジェクト | オプション |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation` {/* #get_translation */}

1つの属性タイプから別の属性に1つの識別子を変換します(例: HGNC は、データセット内の Gene ID にシンボルを組み入れます。 `mart` は、署名のパリティが無視されます。 `dataset` のクエリキーをオフにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mart` | 文字列 | **必須** |
| `dataset` | 文字列 | **必須** |
| `from_attr` | 文字列 | **必須** |
| `to_attr` | 文字列 | **必須** |
| `target` | 文字列 | **必須** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate` {/* #batch_translate */}

複数の識別子を 1 つの属性タイプから 1 つのクエリーで別のものへ変換 — 繰り返した get_translation 呼び出しよりも効率的です。 `mart` は、署名のパリティが無視されます。 `dataset` のクエリキーをオフにします。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `mart` | 文字列 | **必須** |
| `dataset` | 文字列 | **必須** |
| `from_attr` | 文字列 | **必須** |
| `to_attr` | 文字列 | **必須** |
| `targets` | 文字列の配列 | **必須** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## トピックス {/* #family-23 */}

<ToolOperationGroup>
<summary>操作とパラメータを表示</summary>

### `zinc_search_by_id` {/* #zinc_search_by_id */}

ZINCの識別子によるZINC22/ZINC20でpurchasable化合物を調べる — "この化合物であり、誰がそれを売るのかを"に答える。 バッチ: 複数の単一 ID 呼び出しではなく 1 つの呼び出しで 100 の ID まで渡します。 アップストリームを非同期化(サブミット+ポイル); までお任せください timeout_s 秒数。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **必須** |
| `max_results` | 整数 | 任意; デフォルト: 50 |
| `timeout_s` | 数値 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles` {/* #zinc_search_by_smiles */}

構造によってZINC22'sのpurchasable化学スペースを検索 — "whatのpurchasableの混合物は、このSMILES"のように見えます。 これは、BOTHの完全一致とアナログディスカバリー(類似性)ツールです。 CartBlanche22は、`dist`パラメータが多様な方法で正確にスパンする1つの構造検索エンドポイントを公開しています。そのため、別の類似性検索ツールはありません。 ZINCクエリの最遅く — `dist` を緩み始めるのではなく徐々に上昇させます。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `smiles` | 文字列 | **必須** |
| `dist` | 整数 | 任意; デフォルト: 0 |
| `adist` | 整数 | オプション |
| `max_results` | 整数 | 任意; デフォルト: 50 |
| `timeout_s` | 数値 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier` {/* #zinc_search_by_supplier */}

ZINC化合物にベンダーのカタログ番号を解決 — "どのZINC物質がこのサプライヤーコードであり、 what's その構造"に答えます。 バッチ: コールごとの100の製造者コードまで。 Async upstream (submit + poll) を省略します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `supplier_codes` | ['string', 'array'] | **必須** |
| `max_results` | 整数 | 任意; デフォルト: 50 |
| `timeout_s` | 数値 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample` {/* #zinc_random_sample */}

スクリーニングデッキ、プロパティベースライン、またはデコイセットを作成するために、ZINC22から購入可能な化合物のランダムなサンプルを描画します。 このツール's `max_results`として`count`倍; 新鮮なサンプルをリコールする。 Async upstream (submit + poll) を省略します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `count` | 整数 | 任意; デフォルト: 50 |
| `subset` | 文字列 | オプション |
| `timeout_s` | 数値 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d` {/* #zinc_get_3d */}

ZINC化合物のドッキングレディ3D構造物を探します。 ZINC22は、Trancheによって組織されるファイルリポジトリ(Tranche)に、あらかじめ生成された3Dコンフォーマー(DOCK .db2.gz、.mol2.gz、.sdf.gz)を出荷します。このツールは、そのゴミ箱に各IDを解決し、ドッキングプレップ(DOCK6、AutoDock Vinaなど)からダウンロードするリポジトリの場所を返します。 コールあたりの最大 50 の ID (3D retrieval は per-compound の作業)。 Async upstream (submit + poll) を省略します。

| フィールド | 型 | 要件と制約 |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **必須** |
| `timeout_s` | 数値 | 任意; デフォルト: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## 応答レコードの例 {/* #example-response-records */}

<ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">応答レコードの例</ExampleDownload>は、正確な入力、キャプされた応答の抜粋および操作上の結果を含みます。 返されたレコード、空のマッチ、失敗したリクエストを区別します。 結果はメタデータ、スキーマ、または識別子である可能性があります。 ソースフィールドと完全性フラグを調べて、それらを研究で使用する前に確認します。
