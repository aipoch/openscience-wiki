---
title: "科学データベース"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

# 科学データベース {/* #scientific-databases */}

このページでは、データソースを選択し、それが返すことができるものを理解し、Open-Scienceで利用可能なツールを作るために使用します。 スクリーンショットと出力ファイルを含むステップバイステップのリサーチ例については、[研究ワークフロー](#database-workflows)を参照してください。

<span id="data-source-catalog" />

## サポートされているデータベース {/* #supported-databases */}

Open-Science v0.32.0は**251 操作で 23 のデータソース コネクタ**を含んでいます。 別のオフラインのMolecule Connectorは2つの操作を追加します。, フルレジストリを253に持って来る. Connector の下の名前は **Settings → Connectors** に一致します; それぞれの家族が複数のデータベースを公開することができます。 ソースのリストは、ウェブサイトのすべての機能を意味しません。

| コネクタ | 出典 | 操作 | 利用する  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | パブケム、チェビ、レア、ビンディングDBによる小分子化学。  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 論文、著者、引用、DOIの更新とデータセット/ソフトウェアレコード。 |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | NCBI Eユーティリティ、PMC IDコンバーター、ヨーロッパPMCによる生物医学文献 — 検索、メタデータ、関連記事、引用ルックアップ、ID変換、完全なテキストと著作権。  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 10 | 遺伝子/タンパク質識別子、UniProtシーケンス検出、GOとReactomeアノテーション、およびg:Profiler遺伝子セット濃縮。 |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST | 17 | ゲノムのアノテーション、均質学および順序; NCBIタムン/アセンブリ/シーケンスアイデンティティ; BLAST 提出と報告。 |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | ヒト遺伝的変形 — gnomAD 人口の頻度/対照的、ClinVar レコード/研究(NCBI 間接)、dbSNP、構造的およびミトコンドリア変異体。  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | 臨床トライアル.gov — 検索、詳細、スポンサー、投資家、エンドポイント、および適格性。  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | 臨床ゲノムの知識ベース:ClinGenの治癒、CIViC臨床証拠、およびオープンターゲットプラットフォーム。  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | 構造と分子相互作用 — PDB 構造, アルファフォールド予測, EMDB クリオ-EM エントリ, 複雑なポータルの複合体, IntAct 相互作用ネットワーク.  |
| ChEMBL · `chembl` | ChEMBL | 6 | CEMBL REST API による生体活性化合物、薬物、標的、生体活性およびメカニズム。  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | BioRxiv/medRxiv のプリプリント — 日付/カテゴリ、DOI によるメタデータ、ジャーナル公開リンク、ファンダリスト、およびプラットフォームの統計による検索。  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | openFDA による FDA アプリケーション、ラベル、およびコルパスの統計。  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | GWASカタログ、eQTLカタログ、PheWeb PheWASポータル(FinnGen、BioBank Japan)  |
| Expression · `expression` | GTEx | 12 | GTExポータル経由での人体組織表現とeQTLs。  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | タンパク質ドメインアーキテクチャ、家族/クランのメンバーシップ、InterPro/Pfam、ヒトプロテインアトラスおよびストリングによる表現アトラスおよび相互作用ネットワーク。  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | cBioPortal REST API によるがんゲノミクス研究記録。  |
| RNA · `rna` | Rfam | 9 | Rfam による RNA の家族データ(メタデータ、アライメント、モデル、構造)を非コーディング。  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | 表現、メタボロミクス、メデックス、プロテオミクスのアーカイブ; ENA は発見および FASTQ/submission の在庫を実行します; PRIDEファイルリスト。 |
| CellGuide · `cellguide` | CELLxGENE | 5 | セルックスジーン・セルギドによる細胞型アイデンティティ、マーカー遺伝子、ソースデータセット、組織。  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 遺伝子調整機能ゲノム — ENCODE実験/biosamples/files、JASPAR TF結合プロファイル、UniBind ChIP-seq TFBS。  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | 資金調達機会検索(Grants.gov)と抗体カタログ検索(抗体レジストリ)。  |
| BioMart · `biomart` | Ensembl BioMart | 8 | BioMart 属性のクエリと識別子の翻訳を統合します。  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 浄化可能な化学空間(CartBlanche22) — ZINC id、SMILES の完全/類似検索、サプライヤーコードの解像度、ランダムサンプリング、ドックのための 3D 構造の場所による化合物のルックアップ。  |

[科学ビューア](viewers.md)でオフラインのモレキュラーツールがカバーされています。 それぞれのデータソースで露出した正確な操作については、[Connectorの操作の参照](../reference/connector-operations.md) を使用します。

<span id="choose-a-query-and-inspect-the-result" />

## できること {/* #database-capabilities */}

| 研究課題 | はじめに | 典型的な出力 |
| --- | --- | --- |
| 論文を検索し、引用を追跡し、DOIの関係をチェックする | 文献グラフ、パブフィード、バイオRxiv | 文献レコード、識別子、引用リンク、フルテキストの可用性 |
| 遺伝子やタンパク質を見つけ、シーケンスを比較する | 遺伝子と腫瘍学、ゲノム | 識別子マッピング、タンパク質記録、FASTAおよびBLASTレポート |
| 公共オミクスデータを発見し、利用可能なファイルを調べる | Omics アーカイブ | ソースの場所、サイズ、利用可能なチェックサムとメタデータとファイルインベントリを学習/実行 |
| 遺伝子リストを解釈したり、インタラクションネットワークを検査したりする | 遺伝子とオノテーション、タンパク質のアノテーション | 豊富なテーブル、オントロジーの注釈とネットワークレコード |
| バリアント、式、規制証拠をチェックする | バリアント、臨床ゲノム、ヒト遺伝学、発現、規制 | 生物、組織、参照ビルドおよび関連する証拠フィールドのソースレコード |
| 化合物、構造、臨床研究記録の取得 | 化学、ChemBL、構造及び相互作用、臨床試験 | 化学識別子/プロパティ、構造レコードおよび試験メタデータ |

データベースの応答は、研究のステップをサポートすることができます。 自動的にデータをダウンロードし、すべての論文を文献ライブラリに追加するか、完全な分析を実行しません。 保存したいレコードやファイルを指定します。

## データベースの接続と起動 {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. 組み込みのConnectorを有効にします {/* #1-enable-the-built-in-connector */}

1. **Settings → Connectors** を開き、**Omics アーカイブ** などの上記の家族を検索します。
2. 細部を開け、拡大して下さい **Tools**. . . . 選択した操作の入力、結果の制限、およびサードパーティの要件をお読みください。
3. **メインエージェント** の可用性を有効にし、**Used by** をチェックします。 Specialistアクセスは、個々のSpecialistで設定されています。 可用性とパーツールの承認ポリシーは、別々の制御です。

![Omics アーカイブツールは、GEOの入力とメタデータのみスコープを示す詳細](/img/open-science/guides-walkthrough/36-omics-tools.webp)

これらのコネクターはで造られます; 専用のサーバーを追加する必要はありません。 自分で操作する外部サービスについては、[カスタムConnectorセットアップ](../guides/connectors.md)を参照してください。 リストされているか、または有効なConnectorは、認証やクエリが成功する証拠ではありません。

<span id="connect-openalex-and-follow-citation-links" />

### 2. 操作がそれらを必要とするとき、資格情報を追加 {/* #2-add-credentials-when-the-operation-requires-them */}

| サービスまたは条件 | 設定する場所 |
| --- | --- |
| OpenAlex | **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**に進んでください。 APIキーを入力してください。 **Validate**, それから **Save** 検証が成功した後。 |
| コンタクト情報が必要なNCBIのバリアントのクエリを直接送信する | **Settings → Connectors → Manage credentials → Literature access**に進んでください。 お問い合わせ **Contact email** 選択する **Save**に進んでください。 NCBI API キーは任意です。 |
| 資格要件の別の操作 | ツールの要件と要件に従う [認証ガイド](../guides/connectors.md)に進んでください。 意図したサービスに資格を埋めます。 |

研究プロンプトや共有出力ファイルではなく、クレデンシャルフォームにキーを入力します。 選択された操作のための条件を構成して下さい; 上記の連絡先メール要件は、すべてのNCBIツールが同じ要件を持っているという意味ではありません。

<span id="look-up-a-doi-and-its-related-research-records" />

文字グラフは、`crossref_get_work`、`crossref_get_updates`、`datacite_search_records`、`datacite_get_record`も提供しています。 これらの4つのパブリックメソッドは、OpenAlexキーを必要としません。 OpenAlex の引用の方向では、`openalex_citations` は、`openalex_references` が引用する作品を見つけます。 [文献グラフパラメータ](../reference/connector-operations.md#family-2).

<span id="start-with-one-known-identifier" />
<span id="actual-local-queries" />

### 3. 小さなクエリでアクセスを確認する {/* #3-confirm-access-with-a-small-query */}

**ジャンルとオノトロジー**を有効にし、接続されたモデルで会話を開き、次のようにします。

<p className="example-label"><strong>例</strong> 既知のヒト遺伝子識別子をチェックする</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

実際のツールの結果を調べます。 ヒトTP53の場合、`query`、`symbol`、Entrez Gene **7157**、**腫瘍タンパク質p53**の名称を確認してください。 生物や記録を確認するまで、複数のマッチを保持します。 成功したクエリは、この特定の操作を確認します。 すべてのソースへのアクセスを確立しません。 [正確なフィールド](../reference/connector-operations.md#query_genes).

## 研究ワークフローのフォロー {/* #database-workflows */}

各記事には、入力、手順、実際の英語インターフェイススクリーンショット、ダウンロード可能な例の出力が含まれます。

<span id="ena-runs" />
<span id="omics-discovery" />

### 公共オミクスデータを見つける {/* #find-public-omics-data */}

[パブリックオミクスデータを見つけてファイル在庫をビルドする](../workflows/public-omics-data.md):既知の実行またはトピックから始めて、ENAとPRIDEのレコードを調べ、ソースの場所とチェックサムを保存します。 データのダウンロードは、別のステップのままです。

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### タンパク質シーケンスを比較する {/* #compare-a-protein-sequence */}

[タンパク質シーケンスを見つけてBLAST検索を完了](../workflows/protein-sequence-search.md):UniProt FASTAを取得、BLASTジョブIDを保持し、完了したアライメント、アイデンティティ、クエリカバレッジを検査します。

<span id="gene-set-enrichment" />

### 候補遺伝子セットを分析する {/* #analyze-a-candidate-gene-set */}

[候補遺伝子セットのための機能強化を実行](../workflows/gene-set-enrichment.md): 生物、識別子、背景を選択し、g:Profilerを実行し、修正された確率をソースバージョンと解釈します。

<span id="reference-genome" />

### 参照のゲノムを確かめて下さい {/* #confirm-a-reference-genome */}

[種、参照のゲノムおよび染色体識別子をチェックして下さい](../workflows/reference-genome-check.md): レコードに参加する前に、タムン、バージョンアップされたアセンブリ、染色体エイリアスを解決します。

他のタスクについては、[構造化された PubChem レコード](../workflows/database-records.md)、[科学的記録の交差チェック](../workflows/cross-check-records.md)、[グループ会議の文献発見](../workflows/journal-club.md)に従う。

<span id="handle-a-returned-record-empty-match-or-error" />
<span id="empty-partial-and-failed-responses" />

## 返されたデータを正しく使用 {/* #database-limits */}

- クエリ、ソース、生物、組織、単位およびアクセス版を保持します。 データベースのレコード、予測、および生成された要約は、さまざまな種類の証拠です。
- 応答を完全に処理する前に、返されたカウント、ペジネーション、およびトランジションフラグを確認してください。 ゼロマッチ、部分的な応答とリクエストエラーは、異なるフォローアップアクションを必要とします。
- ファイルのインベントリは、場所とメタデータを提供します。 バイトをダウンロードし、チェックサムを確認し、データを分析することは、別の操作です。
- 要求の資格情報が必要な場合は、再試行の前に関連するフォームを完了してください。 レート制限については、サービスの遅延に従う。 タイムアウトのため、要求のサイズを減らして下さい。 [パッケージのミラーおよび証明書の信頼の構成](../guides/troubleshooting.md) を参照してください。

### 人口の頻度とインタラクションネットワーク {/* #string-network */}

`get_variant` では、人口の詳細は必要なときにのみ `include_populations: true` を設定します。 データセットとリファレンスビルドを保持します。 ゲノム観測とゲノム観測は別々に残っています。 未利用可能な値は、`null`、ゼロではありません。 集団や性的な strata を重ねるには、要約しないでください。 これらは、alleleの周波数をフィルタリングしていない周波数を観察されます。 [gnomAD パラメータ](../reference/connector-operations.md#get_variant)

v0.31.0から、`get_string_network.nodes`には、返された隣人や分離した地図入力が含まれます。 シングルマップされた入力要求の隣人; 複数のマッピングされた入力は展開されません。 入力ノードを回復するために`is_query`をフィルタリングし、すべてのマップされたエイリアスに`queries`を使用します。 `n_nodes` はグラフをカウントします。 `n_mapped` は入力マッピングをカウントします。 再利用する前に2つを装備したスクリプトを更新します。 [ストリングパラメータ](../reference/connector-operations.md#get_string_network)

<span id="find-operation-parameters" />

## 操作パラメータの検索 {/* #operation-parameters */}

[Connectorの操作の参照](../reference/connector-operations.md) は、入力、許可された値、および正確な呼び出しを要求するリストです。 このページを使用してソースを選択し、それを接続します。 特定のツールのフィールドの参照を使用してください。

カタログソース: [カタログ.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/catalog.ts)、[レジストリ.ts](https://github.com/aipoch/open-science/blob/v0.32.0/src/main/connectors/registry.ts)。
