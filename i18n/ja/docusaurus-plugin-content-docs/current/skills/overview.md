---
title: "Skills"
last_update:
  date: '2026-09-24'
---

# Skills {/* #skills */}

Skill は、エージェントに反復可能なメソッドを与えます。それを使うと、必要なもの、何をするか、そしてその出力を確認する方法が入力されます。 Open-Scienceは、必要に応じて指示をロードします。 Skillをインストールすると、その中に記述された科学的なソフトウェアをインストールしません。

[Skill マーケットプレイス](marketplace.md) で追加のメソッドを見つけ、使用前に入力と依存関係を確認します。

## 正しい種類の機能を選ぶ {/* #choose-the-right-kind-of-capability */}

| お問い合わせ | 利用条件 | 例 |
| --- | --- | --- |
| データを返したり、コードを実行したりする操作 | とりあえず [ツール](../tools/overview.md) | GEOメタデータを読む。 Python を実行 |
| それらの操作を調整するメソッド | Skillの特長 | 生の遺伝子カウント行列を検証する |
| 独自の指示と機能を備えた再利用可能な役割 | とりあえず [スペシャリスト](../specialists/overview.md) | サンプルQCのテーブルを独立して点検して下さい |

[Skillディレクトリ](./directory.md)でメソッドや[レシピ](./recipes.md)を調べて研究の状況から選択します。

## Skillの検索と検査 {/* #find-and-inspect-a-skill */}

1. **Settings → Skills** を開きます。
2. **Search skills** を使用して、その名前または説明を検索します。 [例を作成する](./create.md)以降に`rnaseq-count-qc`を入力してください。
3. リストが長く残っている場合、**Filter skills by source**、**Filter Skills by agent**、または**Filter by Tag**の矢印。
4. 結果を開きます。 説明、指示、**Files**、ライセンス、**Availability** をお読みください。 パッケージIDとは表示名が異なります。
5. リストに戻り、**Used by**を調べます。 どのエージェントがパッケージを使用できるかを識別します。 完了した実行はリストされません。

![保存したRNA-seq Skillを検索する](/img/open-science/capabilities-walkthrough/02-skill-search.webp)

| コントロール | 変更点 |
| --- | --- |
| 特集/インポート/パーソナルヘッディング | ソースグループを拡大します。 アプリで紹介された船舶 パッケージやリポジトリからインポートされます。 ローカルに個人が作成されます。 |
| Main 代理店スイッチ/行のトグル | ユーザ制御Skillsの可用性を変更します。 アプリケーション必須 Skills が有効になっています。 ファイルがインストールされます。 |
| 使用者 | Main エージェントとスペシャリストの可用性を表示します。 利用条件 **Manage access** Main エージェントと Specialist の関連付けを調整するリソース。 |
| タグの管理/タグチップの削除 | 組織ラベルの追加または削除。 実行権限を変更しません。 |
| スキルを追加 | エージェント・アシストの作成、直接作成、ローカル・アップロード、GitHub のインポート、またはインストール・フォルダ・ディスカバリーを提供します。 |
| 会話 **+ → Save as skill** | 完了したアクティブなブランチから再使用可能なメソッドを抽出します。 詳しくはこちら [作成手順と無効な状態の理由](./create.md). |
| 管理 | 個人および輸入のパッケージのためのバルク管理を開けて下さい。 |
| 会話のインポート → Skill パッケージ | エージェントは、ZIP/ZIP/`.skill` パッケージおよび輸入の要求の承認。 パッケージだけではインストールしません。 |

### いくつかのスイッチがオフにできない理由 {/* #why-some-switches-cannot-be-turned-off */}

**環境・パッケージ**、**コンピューティング環境設定**、**リモートコンピューティング(SSH)**、**Customize**サポートコアアプリケーション機能、および有効期間。 スイッチがチェックされ、無効になっています。 Hover または読み込むための説明に焦点を当てる **This built-in Skill supports core application features and is always enabled.**

このアクティベーションルールは、依存関係をインストールせず、資格情報や権限付与の権限を付与しません。 Specialist の割り当ては別の規模です: **Used by** を点検し、役割の機能のリスト。

ディレクトリには、23 パブリックバンドル Skills が含まれています。 Skillsをサポートしている内部は、選択する余計な方法ではありません。 [必要なスイッチの実装](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/settings/RequiredSkillToggle.tsx).

スクリーンショットは、説明を説明します **Customize**. . . . これらは、他のオプションメソッドを無効にしても、Skills が有効になっている必要があります。

![滞在の有効化をカスタマイズし、理由を説明する](/img/open-science/v0.27.0/08-always-enabled-skill.webp)

パーエージェントのポップアップと読み取り専用バインディングについては、[リソースアクセス](../guides/connectors.md#resource-access)を参照してください。

## 会話で使う {/* #use-it-in-a-conversation */}

<p className="example-label"><strong>例</strong> rnaseq-count-qc でチェックをリクエストする</p>

エージェントに入力、必要なSkill、配信可能、制約を与えます。 例えば:

> 添付されたGSE60450の未加工計算のマトリックスの rnaseq-count-qc Skill を使用して下さい。 EntrezGeneID と長さをメタデータとして保持します。 寸法と非負の整数を検証し、元のサンプル ID を保存し、前後の入力 SHA-256 で別のメソッドレポートを保存します。 既存の Python Notebook を使用します。

承認が要求される場合、完全な指示および操作を点検して下さい。 実行後、レポートとNotebookレコードを再オープンし、[データ例](../reference/example-data.md)と比較してください。 Specialist のチェックは別の操作です。 Specialist を命名すると、その委任が発生したことを確立しません。

### 指示対 Notebook 機能 {/* #instructions-versus-notebook-functions */}

`rnaseq-count-qc`パッケージには、指示と1つの参照ファイルが含まれています。 **コメントはありません** は、呼び出し可能な Notebook 関数を登録します。 エージェントは、指示を読み取り、その後、通常のPythonまたはRを書きます。

また、Skills をバンドルしたところ、カーネル関数も供給しています。 自分の指示は、機能と必要な`kernelSkillIds`の名前です。 インストールしたすべてのSkill IDをそのフィールドに追加しないでください: 命令のみのパッケージはカーネルヘルパーではありません。 読み込まれたSkillは、ファイルシステム、ネットワーク、ツールの許可を付与できません。

Skillがピッカーから欠落している場合、そのソースフィルタ、有効状態、およびエージェントの割り当てを確認してください。 指示が読み込まれるが、計算が失敗すると、[科学ツール](../tools/scientific.md) を続けてください。 それが実行時や入力問題です。パッケージがインストールに失敗したという証拠ではありません。

実装参照: [スキルパネル.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillsPanel.tsx)、[スキルディーテールビュー.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillDetailView.tsx)。
