---
title: "プロジェクトとソースフォルダ"
last_update:
  date: '2026-11-11'
---

# プロジェクトとソースフォルダ {/* #projects-and-source-folders */}

プロジェクトは、研究会セッション、ソースファイル、生成された結果の作業コンテナです。 **Agent Context**は、そのプロジェクトのあらゆるセッションに耐久性のある指示を供給します。 研究の質問または許可された材料が変更されたとき別のプロジェクトを始めて下さい。

<span id="example-prepare-a-systematic-review-reading-pack" />

既存の研究記録をこのプロジェクトに持込むには、[セッションパッケージをインポート](research-packages.md) を使用します。 インポートされたセッションは読み取り専用です。 新しい作業のための通常のセッションを作成します。

## プロジェクトを作成する {/* #create-a-project */}

<p className="example-label"><strong>実践例</strong> 体系的なレビュー読書パックを用意する</p>

**PRISMA - Systematic review reading pack**のプロジェクトです。 公開されたレポーティング・ガイドライン紙を使用しており、検証可能なバイブリグラフレコードと読み取り注文を保持することを目的としています。 これは、完全な体系的なレビューではなく、収集構築タスクです。

1. ホームから、**New project**を選択します。 既存のワークスペースでは、プロジェクト名メニューは同じエントリを提供します。
2. 下記の項目を入力してください。 説明だけでなく、**Agent Context**の生物学的および証拠規則を保持します。
3. **Create project** を選択します。 左側のサイドバーがプロジェクト名を表示し、メインパネルが**New conversation**を開くことを確認します。
4. プロジェクト名メニューと **Project settings** を開き、保存した値を確認します。 成功するプロジェクト保存は、モデルの信頼性とは別々です。

![明示的な研究目的とエージェントのコンテキストを持つPRISMAプロジェクト](/img/open-science/local-acceptance/prisma-project-form.webp)

| フィールドまたはボタン | 事例・行動 | 変更点 |
| --- | --- | --- |
| **Name** | `PRISMA - Systematic review reading pack` | 必須表示名; 200 文字まで。 空白または空白のみの入力は送信できません。 |
| **Description** | `Build a source-checked reading collection for researchers preparing a systematic review.` | 任意、1,000 文字まで。 プロジェクトリストに表示される エージェントの指示として送信されません。 |
| **Agent Context** | 下記の手順をご使用ください。 | 任意、16,000 文字まで。 新規および再開されたエージェントセッションに含まれており、選択したモデルプロバイダに送信されます。 |
| **Create project** | 有効なフォームを保存します。 | プロジェクトを作成し、ワークスペースを開きます。 保存エラーはフォームに表示されているままです。 |
| **Cancel**, **Close** | ドラフトを却下します。 | プロジェクトが作成されていません。 提出が終了している間、却下が無効になります。 |
| **Save** プロジェクト設定 | 編集されたプロジェクトを保存します。 | 既存のプロジェクトを更新します。 セッションを複製しません。 |

```text
Use public primary sources. Preserve DOI, title, authors and publication year.
Distinguish bibliographic metadata from claims verified in full text.
Never invent references. Report inaccessible sources explicitly.
Write outputs in English.
```

## ソースファイルへのプロジェクトアクセス {/* #give-a-project-access-to-source-files */}

プロジェクトを作成すると、自動的にコンピュータのフォルダを露出しません。 **Files** を開き、既存のディレクトリで作業したい場合にローカルフォルダのエントリを選択します。 フォルダピッカーは場所を選択します。 その後の権限プロンプトは、許可されたアクセスを決定します。 確認する前に選択したパスとアクセスモードを読みます。

ソース素材を見直した場合は、読み取り専用のアクセスを使用します。 プロジェクトで保持されるソースが必要な場合は、管理されたプロジェクトコピーを保存します。 ローカルファイルプレビューと管理されたアップロードには、異なるライフサイクルがあります。外部ファイルを移動すると、元のパスを破ることができます。また、管理されたコピーはアプリケーションストレージに残ります。

アクセス変更は、アクティブなカーネルが以前の設定からアクセスを保持する可能性があるため、Notebook の確認を促すことができます。 カーネルの再起動を受け入れる前に、関連する作業を終了または停止します。 フォルダを選択すると、その中のすべてのファイルがモデルによって読み込まれているという証拠はありません。

## プロジェクトの変更または継続 {/* #change-or-continue-a-project */}

プロジェクト名メニューを使用してプロジェクトを切り替えます。 次の調査は、同じプロジェクトコンテキストを保持しながら、独自のトランスクリプトを必要とするときに、**New**でセッションを開始します。 **Project settings** を使用して耐久性のある指示を修正します。 既に生産された結果が自動的に更新されないため、変更された規則に対する次の要求を確認してください。

**Download artifacts…**は出力操作です。 プロジェクトが生成されたアーティファクトを持たないときに無効にすることができます。 ソースファイルだけをアップロードしても、生成された結果は生成されません。 **Settings → Archived**による回復を保ちながら、アクティブなナビゲーションから削除したいときに完成した作業をアーカイブします。

## 結果を確認し、問題から回復する {/* #confirm-the-result-and-recover-from-problems */}

| 展望室 | 通訳と次のステップ |
| --- | --- |
| プロジェクト名が表示されますが、送信不可 | プロジェクトの制作が成功しました。 チェックイン **Settings → Agent** そして、 **Settings → Model** 別途。 |
| エージェントは、説明で書かれた指示を無視します。 | 指示を移す **Agent Context** 新しく、明示的な要求を送って下さい。 説明は組織的メタデータです。 |
| フォルダが開きますが、書き込みは拒否されます | 読まれた許可は点検を、変更しません許可します。 派生したアーティファクトを保存したり、要求された書き込みスコープをレビューしたりします。 |
| 保存 残り 無効 | 空白の名前を削除し、フィールドの長さを確認します。 別の保存が保留中である場合、待ちます。 |
| 異なるプロジェクトを選択 | ドキュメントを添付したり、リクエストを送ったりする前に、プロジェクトタイトルを確認してください。 |

## 質問最適化テンプレートを設定する {/* #optimization-template */}

プロジェクト名メニューを開く → **Project settings → Advanced agent options → Optimization prompt**お問い合わせ このプロジェクトで質問を書き換える手順を入力し、保存します。 組み込みのデフォルトを使用するために空にします。 同じ分野は下にあります **New project → Advanced agent options**.

このフィールドは選択時にのみ実行されます **Optimize question**お問い合わせ とは別に **Agent Context**プロジェクトのエージェントセッションに指示を出す、 **Description**あなたの参照のためにあります。

<p className="example-label"><strong>事例紹介</strong> 教育質問の限界を保存</p>

```text
Rewrite the question in clear English. Preserve the supplied numbers
and the hypothetical scope. Ask for a concise answer with limitations;
do not invent participants, measurements or citations.
```

![プロジェクトの高度なエージェントオプションに基づくカスタム最適化プロンプト](/img/open-science/v121/optimization-template.webp)

コンポーザーに戻り、 [ドラフトを最適化](composer.md#optimize-question)お問い合わせ 送信前に書き込まれたテキストを確認します。テンプレートは、科学的な検証ルールではなく、文章の指示です。
