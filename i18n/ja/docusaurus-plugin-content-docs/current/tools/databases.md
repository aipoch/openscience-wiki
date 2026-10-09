---
title: "科学データベース"
toc_max_heading_level: 2
last_update:
  date: '2026-10-09'
---

# 科学データベース {/* #scientific-databases */}

このページでは、データソースを選択し、それが返すことができるものを理解し、Open-Scienceで利用可能なツールを作るために使用します。 スクリーンショットと出力ファイルを含むステップバイステップのリサーチ例については、[研究ワークフロー](#database-workflows)を参照してください。

<span id="data-source-catalog" />

## サポートされているデータベース {/* #supported-databases */}

Open-Science v0.36.0は**347 操作で 34 のデータソース コネクタ**を含んでいます。 別のオフラインのMolecule Connectorは2つの操作を追加します。, フルレジストリを349に持って来る. Connector の下の名前は **Settings → Connectors** に一致します; それぞれの家族が複数のデータベースを公開することができます。 ソースのリストは、ウェブサイトのすべての機能を意味しません。

| コネクタ | 出典 | 操作 | 利用する  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | パブケム、チェビ、レア、ビンディングDBによる小分子化学。  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 論文、著者、引用、DOIの更新とデータセット/ソフトウェアレコード。 |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | NCBI Eユーティリティ、PMC IDコンバーター、ヨーロッパPMCによる生物医学文献 — 検索、メタデータ、関連記事、引用ルックアップ、ID変換、完全なテキストと著作権。  |
| 遺伝子・オントロジー・ `genes` | MyGene、UniProt、OLS、QuickGO、Reactome、g:Profiler、Enrichr | 15 | 遺伝子/タンパク質識別子、UniProtシーケンス検出、GOおよびReactomeアノテーション、およびg:ProfilerおよびEnrichr遺伝子セットの濃縮。 |
| ゲノム・ `genomes` | 組み立て、UCSC、NCBI、BLAST、Clustalオメガ | 22 | ゲノムのアノテーション、均質学および順序; NCBIタムン/アセンブリ/シーケンスアイデンティティ; BLAST検索とClustal Omegaの複数のシーケンスアライメント。 人口固有のLDおよびプロキシの変形。 |
| バリアント・ `variants` | gnomAD、ClinVar、dbSNP、MaveDB | 21 | 人口の頻度、臨床記録および試金固有の機能スコア、マッピングおよび実験。 |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | 臨床トライアル.gov — 検索、詳細、スポンサー、投資家、エンドポイント、および適格性。  |
| 臨床ゲノム・ `clinical-genomics` | ClinGen、CIViC、オープンターゲット、ClinPGx | 30 | 臨床ゲノムの知識ベース:ClinGenの治験、CIViCの臨床証拠およびオープン ターゲット プラットフォーム、およびClinPGxの薬学の記録。 |
| 構造と相互作用 · `structures` | PDB、AlphaFold、EMDB、複雑なポータル、IntAct | 17 | 構造と分子相互作用 — PDB 構造, アルファフォールド予測, EMDB クリオ-EM エントリ, 複雑なポータルの複合体, IntAct 相互作用ネットワーク.  |
| ChEMBL · `chembl` | ChEMBL | 6 | CEMBL REST API による生体活性化合物、薬物、標的、生体活性およびメカニズム。  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | BioRxiv/medRxiv のプリプリント — 日付/カテゴリ、DOI によるメタデータ、ジャーナル公開リンク、ファンダリスト、およびプラットフォームの統計による検索。  |
| 薬物規制・ `drug-regulatory` | オープンFDA | 10 | Drugs@FDA、ラベル、FAERSの副作用報告および薬剤のrecalls。 |
| ヒト遺伝学・ `human-genetics` | GWASカタログ、eQTLカタログ、PheWeb | 15 | GWASカタログ、eQTLカタログ、PheWeb PheWASポータル(FinnGen、BioBank Japan)  |
| エクスプレス・ `expression` | GTEx、Bgeeの特長 | 16 | 人間のGTExのティッシュの表現およびeQTL; Bgee のクロススペックのベースライン式。 |
| タンパク質アノテーション・ `protein-annotation` | InterPro、Pfam、ヒトプロテインアトラス、ストリング | 14 | タンパク質ドメインアーキテクチャ、家族/クランのメンバーシップ、InterPro/Pfam、ヒューマンプロテインアトラス、STRINGによる表現アトラスと相互作用ネットワーク、ネットワークの相互作用の豊かさを含みます。 |
| がんモデル・ `cancer-models` | cBioPortal(バイオポータル) | 10 | 研究、変異、コピー番号、サンプル、患者、臨床属性および分子プロファイル式。 |
| RNA · `rna` | Rfam | 9 | Rfam による RNA の家族データ(メタデータ、アライメント、モデル、構造)を非コーディング。  |
| Omics アーカイブズ・ `omics-archives` | ArrayExpress、GEO、MetaboLights、Metabolomics Workbench、MGnify、PRIDE、ENA | 28 | Omics はメタデータとファイルインベントリを学習/実行します。 メタボロミクスのサンプル、要因、分析および化合物レコード。 |
| CellGuide · `cellguide` | CELLxGENE | 5 | セルックスジーン・セルギドによる細胞型アイデンティティ、マーカー遺伝子、ソースデータセット、組織。  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 遺伝子調整機能ゲノム — ENCODE実験/biosamples/files、JASPAR TF結合プロファイル、UniBind ChIP-seq TFBS。  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | 資金調達機会検索(Grants.gov)と抗体カタログ検索(抗体レジストリ)。  |
| BioMart · `biomart` | Ensembl BioMart | 8 | BioMart 属性のクエリと識別子の翻訳を統合します。  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 浄化可能な化学空間(CartBlanche22) — ZINC id、SMILES の完全/類似検索、サプライヤーコードの解像度、ランダムサンプリング、ドックのための 3D 構造の場所による化合物のルックアップ。  |
| GDC · `gdc` | NCI GDC | 5 | がんプロジェクト、例、ファイルメタデータ、オープン/コントロールラベル、およびマニフェストを転送する。 ダウンロードやアクセスの付与はありません。 |
| Zenodo · `zenodo` | Zenodo | 2 | 公開データセット、ソフトウェアおよび出版物の発見、バージョン固有のメタデータおよびファイル在庫; アップロードやダウンロードはありません。 |
| ムマー・ `hmmer` | EMBL-EBI HMMER3(エンブレ・エビ・ムマー3) | 3 | プログラム固有のタンパク質/プロファイル/アライメント検索、ジョブの状態と結果。 |
| インタープロスキャン・ `interproscan` | EMBL-EBI インタープロスキャン | 3 | タンパク質シーケンスを提出し、アノテーションジョブの状態を確認し、TSVレポートを取得します。 |
| Pathway Commons · `pathway-commons` | Pathway Commons / Reactome | 4 | パスウェイ検索、トップパスウェイ、グラフクエリ、BioPAXサブモデルエクスポート。 |
| Alliance Genome Resources · `alliance` | ゲノムリソースのアライアンス | 8 | 人間とモデル組織遺伝子、オルトログ、病気モデル、フェノタイプ、アレルと表現。 |
| CELLxGENE Discover · `cellxgene-discover` | CELLxGENE Discover | 9 | 単一セルコレクションとデータセット、公開バージョン、ファイル形式、サイズ、ダウンロードURL。 |
| Cellosaurus · `cellosaurus` | Cellosaurus | 2 | セル・ラインの名前と同義語を見つけ、アクセスアイデンティティと品質アノテーションを検査します。 |
| Monarch Initiative · `monarch` | Monarch Initiative | 2 | 生物と遺伝子対フェノタイプと遺伝子の関連と、証拠を支持する。 |
| IEDB · `iedb` | 免疫エピトープデータベース | 8 | エピトープ、抗原、Tセル、B細胞、MHCアッセイ、TCR/BCRの証拠、およびソース出版物。 |
| PDC · `pdc` | NCI プロテオミック・データ・コモンズ | 4 | がんプロテオミクス研究版、検体協会および量的ファイルメタデータ; ダウンロードなし。 |

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

バッチ識別子の変換のために、**ジャンルとオノトロジー**は`submit_uniprot_id_mapping`、`get_uniprot_id_mapping_status`および`get_uniprot_id_mapping_results`を追加します。 ジョブ ID を保存し、少なくとも 3 秒離れた場所をポーリングし、各結果ページを取得します。 ワンツーマンのマッピングとエクスプリシット`failed_ids`を保存します。 1ページから欠落しても、一致しないわけではありません。 本サービスは、100,000 の識別子に最大を受け入れ、最大 7 日間経過した後に結果が期限切れになります。 [正確なマッピングフィールド](../reference/connector-operations.md#submit_uniprot_id_mapping) を参照してください。

**ゼノドー** は、認証なしで公開レコードメタデータを公開します。 バージョン固有のレコードIDとアクセス/ライセンスフィールドをファイル在庫で保持します。 **GDCの特長** は公開メタデータを公開します。 マニフェストは、認可をダウンロードせず、管理されたファイルはGDC権限が必要です。 [GDC の操作](../reference/connector-operations.md#family-24) · [Zenodo オペレーション](../reference/connector-operations.md#family-25).

データベースの応答は、研究のステップをサポートすることができます。 自動的にデータをダウンロードし、すべての論文を文献ライブラリに追加するか、完全な分析を実行しません。 保存したいレコードやファイルを指定します。

## 単一セル、モデルオーナリズムおよび変形欠陥データ {/* #single-cell-model-organisms */}

**Settings → Connectors** のエントリを検索し、**メインエージェント** の可用性を有効にします。その後、生物、研究の質問と記録を記述して、会話を維持します。 これらの新しい操作は、カスタムMCPサーバー、APIキーまたはNCBIの連絡先メールなしで公開データを読み取ります。 同じConnectorの他のサービスに異なった条件があります。

| エントリーフォーム | できること | 結果の使い方 |
| --- | --- | --- |
| CELLxGENE Discover | 生物、組織、病気、アッセイまたは細胞のタイプによって単一セルのデータセットを見つけて下さい; バージョンとファイルの在庫を調べる | オントロジーフィルタは、正確なラベルまたはIDを使用しており、 AND と組み合わせています。 dataset_version_idを固定出版物に保持する。 dataset_idは、現在のバージョンに解決します。 ファイルのダウンロードやCensus式をクエリせずに、利用可能なダウンロードURLを返します。 セルタイプの記述およびマーカーのための別のCellGuideを使用して下さい。 |
| Alliance Genome Resources | 人間、マウス、ラット、フライ、ワーム、ゼブラフィッシュ、イースト、カエル遺伝子、オルソログ、疾患モデル、フェノタイプ、および式を問い合わせる | 返された遺伝子IDの後に生物を検索し、確認します。 証拠と整形外科の連鎖を保持する。 人体疾患の結論ではなく、モデル・オーガニズムの現象です。 |
| バリアント → MaveDB | バリアント効果のスコアセット、アッセイメソッド、CSVスコアページ、既存のVRSマッピングを見つける | URN、ライセンス、アッセイメソッド、スコアキャリブレーションをキープします。 機能的なスコアは臨床病原性分類ではないです。 CSVは、開始/制限のペジネーションと返されたテキストをファイルに保存する必要があります。 マッピングの検索は、リフトオーバーを実行しません。 |
| Omics アーカイブ → Metabolomics Workbench | 調査研究; STアクセスによるサンプル、要因、分析、代謝検査 化合物構造とクロス環境を調べる | セクションで要約、要因、分析、または代謝を選択します。 サポートされている識別子に PubChem を介して化合物名を解決します。 これらの操作は生の測定のマトリックスをダウンロードしません。 |

CELLxGENE フィルタリングとパジネーションは、各リクエストに対して取得された上流カタログの上にローカルで実行されます。 カタログはリクエスト間で変更する場合があります。 バージョン ID を使用して、出版物を保持します。 報告されていないファイルサイズは -1 で、ゼロバイトではありません。 MaveDB と Workbench の結果の欠落した値とアッセイの定義を保存します。

[CELLxGENE Discover](../reference/connector-operations.md#family-30)、[パートナー](../reference/connector-operations.md#family-29)、[MaveDB](../reference/connector-operations.md#mavedb_search_score_sets)、[Metabolomics Workbench](../reference/connector-operations.md#workbench_search_studies)の入力を正確に参照してください。

## 細胞ライン、フェノタイプおよび免疫の証拠 {/* #cell-lines-phenotypes-immunity */}

**Cellosaurus**、**Monarch Initiative**、**IEDB** を **Settings → Connectors** で有効化し、**メインエージェント** に使用可能にします。 これらの操作は、カスタムサーバーまたはAPIキーなしで公開レコードを問い合わせます。

| エントリーフォーム | 要求の何 | 保存するべきこと |
| --- | --- | --- |
| Cellosaurus | セル・ライン名/匿名名を検索し、返されたCVCLアクセスまたはRRIDを取得 | 標本、アイデンティティ、同義語および汚染/誤認の注釈。 検索は、生のSolrのクエリではなく、リテラルフレーズを取ります。 品質のアノテーションを欠くと、セルラインを認証しません。 |
| Monarch Initiative | モノドー:0007254 や HGNC:11998 | 組織、フェノタイプ、ソースおよび証拠。 アリアーゼは自動的に変換されません。 識別子を最初に解決します。 直接一致の懸念識別子マッチング、実験的な確認はありません。 |
| IEDB | エピトップスまたは抗原、または特定のT細胞、B細胞またはMHCアッセイ | 少なくとも1つの生物的/証拠フィルターが要求されます; パジネーションだけでは不十分です。 antigen_iri か uniprot_accession を両方使用して下さい。 アッセイ方法、結果、単位および出版物を保存します。 MHCの溶出観察は、親和性測定ではありません。 |

集計されたエピトープ/抗原レコードは、異なる実験から観察を組み合わせることができます。 フィルターが同じ実験で満足する必要がある場合は、対応するアッセイ操作をクエリします。 ゼロマッチは、負の生物学的発見を確立しません。 [Cellosaurusパラメータ](../reference/connector-operations.md#family-31) · [Monarch パラメータ](../reference/connector-operations.md#family-32) · [IEDBパラメータ](../reference/connector-operations.md#family-33).

## GEOのマトリックスとシーケンスマッチ構造を見つける {/* #geo-matrices-pdb-sequences */}

**Omics Archives → geo_get_matrix_files** は、公式の GEO シリーズ マトリックスと NCBI 生成カウント/FPKM/TPM/annotation ファイルを発見します。 ファイルの場所を返します。 バイトをダウンロードしません。 **geo_get_series** はメタデータルックアップのままです。

行列を取得すると、**geo_preflight_matrix** は既に読み込まれているチェックを行い、8 MiB までのテキストを解凍します。 ネットワークやファイルシステムアクセスがない場合。 GSM の識別子とプラットフォームのメタデータを保存しておくと、カラムの位置ではなく ID でサンプルをマッピングできます。 **完了: 偽** をプレビューに設定します。 ファイル全体に **完了: true** を渡します。 プレビューは、ファイル全体の寸法を確立できません。 圧縮されたアーカイブ、スパース行列、HDF5ファイルをテキストチェッカーに送りません。 [行列の発見](../reference/connector-operations.md#geo_get_matrix_files)と[テキスト preflight](../reference/connector-operations.md#geo_preflight_matrix)を参照してください。

**Structures & Interactions → pdb_search_sequence**は、生のシーケンスまたは1 FASTAレコードとして、25–10,000残余の1つのタンパク質シーケンスを受け入れます。 アイデンティティとクエリー カバーのしきい値は、0 から 1 への亜辞です。 返されたクエリカバレッジは、クエリへのアライメントを記述します。 実験的な構造のカバレッジではありません。 上流の合計はろ過するローカル カバーを指示し、分岐させたスキャンは後で一致を省略できます。 操作は、座標をダウンロードせずに構造レコードを見つけます。 [正確な入力とスキャンの制限](../reference/connector-operations.md#pdb_search_sequence) を参照してください。

## データベースの接続と起動 {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. 組み込みのConnectorを有効にします {/* #1-enable-the-built-in-connector */}

1. **Settings → Connectors** を開き、**Omics アーカイブ** などの上記の家族を検索します。
2. 細部を開け、拡大して下さい **Tools**. . . . 選択した操作の入力、結果の制限、およびサードパーティの要件をお読みください。
3. **メインエージェント** の可用性を有効にし、**Used by** をチェックします。 Main エージェントと Specialist の関連付けを調整するリソースで **Manage access** を使用します。 可用性とパーツールの承認ポリシーは、別々の制御です。

![Omics アーカイブツールは、GEOの入力とメタデータのみスコープを示す詳細](/img/open-science/guides-walkthrough/36-omics-tools.webp)

これらのコネクターはで造られます; 専用のサーバーを追加する必要はありません。 自分で操作する外部サービスについては、[カスタムConnectorセットアップ](../guides/connectors.md)を参照してください。 リストされているか、または有効なConnectorは、認証やクエリが成功する証拠ではありません。

<span id="connect-openalex-and-follow-citation-links" />

### 2. 操作がそれらを必要とするとき、資格情報を追加 {/* #2-add-credentials-when-the-operation-requires-them */}

| サービスまたは条件 | 設定する場所 |
| --- | --- |
| OpenAlex | 任意キー。 1 つを構成するには、開く **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**、それを検証し、保存します。 |
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

### パスウェイネットワークを調べる {/* #inspect-a-pathway-network */}

[パスウェイとインタラクションネットワークを調べる](../workflows/inspect-pathway.md):Pathway Commonsを介して人間のReactome経路を見つけ、返されたURIを保存し、インタラクションをエクスポートし、パスウェイアクティビティの証拠から選択したネットワークを識別します。

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

カタログソース: [カタログ.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/catalog.ts)、[レジストリ.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/registry.ts)。

## シーケンス検索とアライメント {/* #sequence-tools */}

**ムマー**はプログラム固有のタンパク質シーケンス、プロファイルHMMおよびアライメント検索を提供します。 プログラムとデータベースを一緒に選択し、ジョブIDを保持し、**ソリューション**の後にのみ結果を取得します。 [HMMER オペレーション](../reference/connector-operations.md#family-26).

**インタープロスキャン**は、v0.35.1からタンパク質シーケンス送信、ジョブステータス、TSVアノテーション検索をサポートしています。 [InterProScan 投稿](#interproscan-submit) に従ってセットアップと手順を実行します。

**Genomes → Clustal Omega** は、タンパク質、DNA、RNA FASTA のレコードを3つ以上一意に名付けます。 サービスで要求される連絡先メールを構成し、一度送信し、ジョブIDを保持し、ステータスを確認し、返されたアライメントを保存します。 [複数のシーケンス・アライメント・ワークフロー](../workflows/multiple-sequence-alignment.md).

## Enrichr、STRING、ClinPGx {/* #enrichment-pharmacogenomics */}

- **Genes & Ontologies → Enrichr**: 現在のライブラリを一覧表示し、関数、転写因子、パーチャブレーション、薬物、病気、組織、または細胞タイプのための遺伝子組換えの強化をクエリします。 生物や質問に適切なライブラリを選択し、名前、背景、および調整されたP値を保持します。
- **Protein Annotation → STRING**: タンパク質ネットワークが、その背景から期待されるよりも相互作用が多かったかどうかをテストします。 これは、パスウェイの過剰表現から異なる質問を要求します。 パスウェイテストではなく、ネットワークP値がパスウェイテストではありません。 [遺伝子組込み強化ワークフロー](../workflows/gene-set-enrichment.md#enrichr-string) をフォローしてください。
- **Clinical Genomics → ClinPGx**: 薬物、遺伝子、または異種注釈、ガイドライン、規制ラベル、および人口の頻度を取得します。 識別子を最初に解決し、操作で必要なフィールドを供給し、元のソースと証拠レベルを保持します。 これにより、研究記録が取得されます。 個別治療プランを自動的に生成しません。

**Settings → Connectors**の活性剤に関連したConnectorを有効にします。 これらの組み込みエントリは、カスタムMCPサーバを必要としません。 正確なフィールドと条件の要件については、[操作の参照](../reference/connector-operations.md) を参照してください。

## パスウェイ、式、臨床データ {/* #pathway-expression-clinical */}

**Settings → Connectors** で対応する家族を有効にし、エージェントに生物、ソース、識別子、および意図したスコープを指示します。 これらの付加は作り付けのコネクターを使用します; MCP サーバは必須ではありません。

| エントリーフォーム | できること | 接続と解釈 |
| --- | --- | --- |
| Pathway Commons | パスウェイを検索し、トップのパスウェイをリストし、遺伝子間のクエリパスやサブモデルをエクスポートします | 公共サービス; 返された URI、生物およびソースを保持します。 グラフのクエリは、濃縮テストとは異なる。 フォロー [パスウェイインタラクションワークフロー](../workflows/inspect-pathway.md). |
| 式典 → Bgee | クロススペクシーの提示/従順な呼び出し、正規化スコア、バインドSPARQLのクエリとダウンロードリンク | 種を最初に発見し、NCBIの分類IDを保持します。 SPARQLは遺伝子、種、組織を必要とします。 健康なワイルドタイプのベースライン呼び出しは、差異的な表現ではありません。 ダウンロードリンクはダウンロードされていないファイルです。 |
| がんモデル → cBioPortal | リストサンプル/患者とクエリ臨床属性またはmRNA/タンパク質表現 | 研究を選択し、そのプロファイルを発見し、測定/正規化を選択します。 臨床サンプル/患者レベルに合ったIDを供給します。 分子データは、明示的な遺伝子とsample_idsまたはsample_list_idの1つを必要とします。 行を欠くことはゼロではありません。 |
| 薬規制 → openFDA | 検索/アカウント FAERS レポートと検索薬のリコール | 傷の日付およびプロダクトおよび保存のtruncation情報。 レポートのカウントは、発生または原因の証拠ではありません。 複数の評価されたバケツは重複するかもしれません; 独自のレポートの合計ではなく、その合計はユニークです。 |
| Omics アーカイブ → MGnify | MGYA解析アクセスによる結果ファイルを一覧表示 | 報告されたときタイプ、カテゴリ、上流 URL およびサイズを返します。 ファイルバイトはダウンロードされません。 行方不明のサイズや URL が null にとどまります。 |

必要なフィールド、条件、例については、[Connectorの操作の参照](../reference/connector-operations.md) を参照してください。

## GWASサマリー統計ファイルを探す {/* #gwas-summary-statistics */}

**Settings → Connectors**でMainで**ヒト遺伝学**を有効にします。 研究の**GCSTアクセス**で概要統計の発見を依頼し、返された元の/調和したファイルURL、メタデータ、および参照のゲノムを保持します。 パブリックルックアップはAPIキーを必要としません。

`gwas_get_summary_statistics` は、学習ファイルをリストし、利用可能な YAML メタデータを読み込みます。 大規模な関連付け表をダウンロードしません。 そのGWAS-SSFカラム定義は、検査されたファイルヘッダではなく、標準を記述します。 意図したファイルを個別にダウンロードし、実際の列、ゲノムビルド、効果アレルと単位を分析する前に確認します。 著名な協会のヒットは、完全な要約統計のための代替ではありません。 [変数および出力](../reference/connector-operations.md#gwas_get_summary_statistics).

## InterProScanにタンパク質シーケンスを提出する {/* #interproscan-submit */}

1. **Settings → Connectors**でMainで**インタープロスキャン**を有効にします。 **Settings → Credentials → Literature access**では、EMBL-EBIジョブに使用される有効な連絡先メールを保存します。 APIキーは必須ではありません。
2. タンパク質のシーケンスまたは一意に名前を付けたタンパク質FASTAレコードとリクエストの投稿を一度供給します。 EMBL-EBI へメールが送られてきます。 1,000 レコード、10,000 レジス/シーケンスと 4 MiB のエンコードされたリクエストボディまでのリクエストを受け付けます。
3. 返された**job_id**を保持します。 **ready: false**と**SUBMITTED**は、アノテーションの結果ではなく、レシートです。 **ステータス** を 10 秒以上離れた状態にチェックします。 ポーリングは自動ではありません。
4. **FINISHED** の後、**結果発表** を要求し、リモート結果が切れる前に完全な TSV を保存します。 2 MiB の検索制限に対する応答は、未読の報告を返すのではなく、失敗します。
5. タンパク質識別子、ソースアプリケーション、1ベースの包括的な座標をチェックします。 異なるメンバーアプリケーションからのスコアは変更できません。 タンパク質が機能に欠けていることを証明しません。

タイムアウト後の重複投稿を避ける: 既知のジョブ ID を最初に復元します。 ローカルリクエストのキャンセルは、送信されたリモートジョブをキャンセルしません。 [投稿、ステータス、結果のパラメータ](../reference/connector-operations.md#family-27) を参照してください。

## TCR と BCR の証拠を IEDB で見つける {/* #iedb-receptors */}

Mainで**IEDB**を有効にし、少なくとも1つの生物学的または証拠フィルタで**search_tcrs**または**search_bcrs**を要求します。 パジネーションだけでは不十分です。 **エピトープ** のシーケンスに `sequence` を使用します。 `chain1_cdr3`および`chain2_cdr3`フィルター受容器CDR3の順序。 これらの公開検索では、API キーは必要ありません。

受容体グループ ID、チェーン、報告されたアッセイ ID およびソース出版物を保って下さい。 ホストと結果フィルタは、集約されたグループに適用され、異なる実験で満足することができます。 同じアッセイでその条件が起こることを確立するために、報告されたアッセイIDを対応するアッセイ操作に従い、そこに必要なフィルタを適用します。 パジネーションは、すべての埋め込まれた輸出の完全性ではなく、受容体グループをカバーします。 これらのレコードは、受容体結合の予測ではなく、証拠検索です。 [IEDBパラメータ](../reference/connector-operations.md#family-33).

## PDCでがんプロテオミクスを発見 {/* #pdc */}

**Settings → Connectors**で**PDC**を有効にします。 パブリックメタデータ API は API キーを必要としません。 研究やバージョンを見つけるために、アッセイと標本のカウント、マップケース - サンプル - アリコ協会、および**タンパク質アセンブリ**レポートなどの定量ファイルのリストを参照してください。 処理/アウトカムデータやファイルのダウンロードは返しません。

`PDC000127`などの学習アクセスから、学習識別子やバージョン名を検索できます。 PDC キーワードマッチングは、臨床疾患フィルタではありません。 調査を受け取り、返された `study_id` UUID を使用して、その後の呼び出しをピン留めします。 `pdc_study_id`は最新バージョンを選択します。 これらのセレクターの1つを正確に提供します。

標本のリストのために、**アップストリーム**のpaginationは場合を数えます; サンプルとアリコを拡張することで、ケースの限界よりも多くの行を生成できます。 デフォルトの**ローカル**モードページは協会を受け、1,000-associationのアップストリームキャップを持っています。 そのキャップが到達したときに最終ローカルページは完全性を証明しません。 PDC ID を保ち、外部の GDC 参照を別々に示します。 ファイルリストには、名前、バイトサイズ、MD5値、ストレージパスが含まれます。 リストされたパスは、認証されたダウンロードURLではありません。

[PDCの操作とペジネーション](../reference/connector-operations.md#family-34) を参照してください。 ソースを組み合わせる前に、学習バージョン、試金、標本のアイデンティティ、各ソースのアクセスと引用の要件を確認してください。

## 人口固有のLDをチェックする {/* #ensembl-ld */}

**Settings → Connectors**で**ゲノム**を有効にします。 そのEnsembl LDツールは、キーなしで公開APIを使用します。 2つの variant ID をのための供給して下さい `ensembl_ld_pairwise`、またはのための1つ `ensembl_ld_proxies`、のような完全な人口の名前と共に、 `1000GENOMES:phase_3:KHV`. . . . ツールは、人口や推論を発見しません。 研究に適した参照人口を選択します。

平等な結果報告 r2 と D ′. プロキシのクエリは r2 ≥ 0.8 と **500 kb合計ウィンドウ** にデフォルトで、両側で約 250 kb です。 `max_records`は、上流作業ではなく、ソート後に返されたリストをキャップします。 その結果、人口と反省のメタデータを保存します。 このエンドポイントは、参照アセンブリやEnsemblリリースを報告しません。 空の結果は、LD をゼロにしない、返されたデータの修飾を意味しません。 高いLDは、因果性および機能的な等価性を確立しません。 [ペアウェイトフィールド](../reference/connector-operations.md#ensembl_ld_pairwise)と[プロキシフィールド](../reference/connector-operations.md#ensembl_ld_proxies)を参照してください。
