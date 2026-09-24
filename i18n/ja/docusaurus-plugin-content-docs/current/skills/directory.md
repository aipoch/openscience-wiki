---
title: "Skillディレクトリ"
last_update:
  date: '2026-09-24'
---

# Skillディレクトリ {/* #skill-directory */}

アプリケーションは **23はSkillsを束ねました** を提供します。 このディレクトリは、彼らがサポートする作業によってそれらをグループ化します。 配送方法の説明 外部モデル、依存性、またはサービスがインストールされていることを主張しません。

アプリを通じて配布される方法については、[マーケットプレースインストールガイド](marketplace.md) を使用します。 以下のディレクトリは、研究方法を選ぶのに役立ちます。 マーケットプレースバージョンのライブ在庫ではありません。

## 方法を選択する前に、読みやすさをチェックする {/* #check-readiness-before-selecting-a-method */}

1. 設定でSkillを開き、完全な要件とサードパーティの通知をお読みください。
2. 実際のデータで入力タイプを比較します。 バルクRNA-seqテーブルは単一セルAnnDataオブジェクトではありません。 分子図はドッキング結果ではありません。
3. 選択したランタイムとパッケージを調べます。 リモートワークでは、使用可能な Compute Host を選択し、送信する前に環境を検査します。
4. 1つの境界線の実行を要求し、実際の出力を点検し、スケーリングする前に入出力/バージョンの参照を保って下さい。

2つの追加のマニフェストエントリ、自己認識とスキルクレエーターは、内部フレームワークリソースです。 user-facing ディレクトリエントリではありません。 rnaseq-count-qc を含む個人または輸入 Skills は、23 のカウントとは別です。

3つの環境アプリケーションSkillsとカスタマイズ可能な滞在; [活性化ルール](overview.md#why-some-switches-cannot-be-turned-off) を参照してください。 [バンドルマニフェスト](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json) を使用して、ホストのセットアップと結果の配信のために、出荷されたメソッドと [遠隔計算](../guides/remote-compute.md) を識別します。

## 研究タスクでブラウズする {/* #browse-by-research-task */}

### タンパク質構造 {/* #protein-structure */}

| スキル | 入力 | 依存関係と実行 | 点検への出力 |
| --- | --- | --- | --- |
| [アルファフォールド2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | 蛋白質FASTA; モノマーまたは複合体 | ColabFold、モデル重量、GPU; 任意公衆MSAサービス | 予測された構造と自信スコア |
| [ボルツ](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | Protein/DNA/RNA/ligandの複雑な指定 | ボルツのパッケージ、重量、GPU; 要求されるMSAのアクセス | 複雑な構造と自信; 任意類縁の出力 |
| [チャイ1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | マルチエンティティティファスタ | chai-lab, 体重, GPU | オールアトムの複雑さと自信 |
| [ESMフォールド2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | シーケンスまたは複雑な入力 | バイオハブのesmのパッケージ、重量、CUDA; フェア・エスムとは | 構造予測; 要求されるESMCの表現 |
| [オープンフォールド3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | タンパク質/核酸/リガンド仕様 | OpenFold3、重量/アクセス、CUDA、および構成されたカーネル | 複雑な構造とスコア |

### 蛋白質の設計 {/* #protein-design */}

| スキル | 入力 | 依存関係と実行 | 点検への出力 |
| --- | --- | --- | --- |
| [ディフドック](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | ターゲット PDB とリガンド SMILES/SDF | DiffDockリポジトリ、重量、GPU | ランク付きリガンドポーズ; 偽りの自信は肯定的ではありません |
| [プロテインMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | バックボーン PDB、設計/修正されたチェーンおよび残余 | リポジトリ、チェックポイント、トーチ/数字; 小さなジョブがCPUをサポート | 設計されているシーケンスとスコア |
| [リガンドMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | バックボーンとリガンド/金属/核酸コンテキスト | リポジトリとPythonの依存関係; 小さなジョブがCPUをサポート | シーケンスとネジ構造 |
| [SolubleMPNNの特長](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | 蛋白質のバックボーン | ProteinMPNN リポジトリと溶性チェックポイント; CPU 対応 | 溶性モデル前のシーケンス |

### シーケンスと細胞 {/* #sequence-and-cells */}

| スキル | 入力 | 依存関係と実行 | 点検への出力 |
| --- | --- | --- | --- |
| [ESM-2の特長](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | タンパク質シーケンス | 公正なエスムと重量; バンドルされたプロシージャはGPUを使用します | 埋め込み、ログイン、または連絡先の予測 |
| [ボルソイ](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | ゲノム/座標を記述したDNAの窓 | borzoi-pytorch、重量およびCUDA | 予測されたゲノムトラックまたは参照/代替デルタ |
| [エボ2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | DNAシーケンスまたはプレフィックス | Evo 2 の重量、多用性がある CUDA および十分な記憶 | 配列の尤度、埋め込むか、または生成されたDNA |
| [スキャプラー](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | 遺伝子の語彙マッピングによる単一セルAnnData | scGPTパッケージ、チェックポイント、GPU | セル埋め込みまたはアノテーション出力 |
| [スキャビツール](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | 単一セルカウントとバッチ/ラベルメタデータ | scvi-tools/scanpy/anndata; 束ねられた訓練のワークフローはGPUを期待します | ラテント表現、ラベル転送、モデルベースの比較 |

### 証拠と文章 {/* #evidence-and-writing */}

| スキル | 入力 | 依存関係と実行 | 点検への出力 |
| --- | --- | --- | --- |
| [文献レビュー](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | 研究の質問、識別子または論文 | 源の検索; OpenAlex 操作用の OpenAlex キー | 検証された証拠の統合と引用 |
| [徴候のDossier](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | 患者集団としての適応 | リサーチツールとソースアクセス | 再開可能な研究のウェイポイントとドシエ |

### 環境 {/* #environment */}

| スキル | 入力 | 依存関係と実行 | 点検への出力 |
| --- | --- | --- | --- |
| [環境・パッケージ](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | パッケージやバージョンの問題の欠如 | Python/R のランタイムおよび許可されたパッケージのソースの選択 | パッケージの点検、管理された取付けおよび輸入の点検 |
| [コンピューティング環境設定](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | SSH/Slurm ホスト上の名前付き環境 | ホストおよびユーザー/admin管理された活発化を構成しました | セットアップ手順と検証レコード |
| [リモートコンピューティング(SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | ワークロードと資格のある Compute Host | SSH認証、ホスト、スケジューラ適用時 | 提出された仕事、収穫された結果および公表されたアーティファクト |

### 投稿ナビゲーション {/* #authoring */}

| スキル | 入力 | 依存関係と実行 | 点検への出力 |
| --- | --- | --- | --- |
| [カスタマイズ](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | 要求されるSkillかSpecialistの変更 | 働く代理店; ネイティブのカスタマイズ操作 | 保存されたパッケージまたは読み戻り検証によるロール |
| [図スタイル](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | 実際のデータと1つの最終図 | Notebook機能と依存関係のプロット | 著名なラベルと忠実なデータでプロットを検査 |
| [図コンポーザー](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | 1つのクレームと不変なデータバージョンリファレンス | Main 代理店、委任、プロットおよび検討 | マルチパネル図とレビュー反復 |
| [ペーパー ナレーション](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | 原稿/抄録、キャプション、図鑑デッキ | グラウンドアーティファクトバージョンとレビューツール | ペーパーブリーフと注文された図引数 |



実装参照: [マニフェスト.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json).
