---
title: ".science 研究パッケージ"
description: "そのファイルと証拠でセッションをエクスポートし、別のプロジェクトで研究記録をインポートし、検査します。"
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# .science 研究パッケージ {/* #science-research-packages */}

**.science**の研究パッケージは、会話ブランチ、ファイル、記録された証拠を手元にまとめます。 同僚はプロジェクトにインポートし、研究記録を検査することができます。 インポートされたセッションは読み取り専用です。 v0.31.0から、デスクトップアプリで**Fork**を使用して、書き込み可能なコピーを作成し、研究を継続します。

## 共有するものを選ぶ {/* #choose-what-to-share */}

| 受取人が必要とするもの | 用途別輸出 |
| --- | --- |
| 会話テキストを読み、編集する | [会話 PDF または Markdown](sessions.md). |
| 選択した元のファイルを使用する | [ファイルのダウンロードまたはアーティファクトZIP](files.md). |
| 会話ブランチ、ファイル、エビデンスを一緒に調べる | とりあえず `.science` 研究のパッケージ。 |

パッケージには、アップロードされた研究資料、会話テキスト、生成された結果を含むことができます。 コンテンツをシェアする前に確認します。 それは独立したコピーです:ローカルの作業を削除しても、既に他の人に送られたパッケージを削除しません。

Side Chatの会話、プライベート[読書ブックマーク](bookmarks.md)、およびそのノートはパッケージから除外されます。 受信者が保存したレポートやエクスポート前に会話に必要としている情報を入力します。

## 研究パッケージのエクスポート {/* #export-the-session */}

1. セッションで作業を終了または停止します。 メニューを開き、**Export → Export Session package**を選択します。
2. エクスポートスコープと省略されたコンテンツまたはサイズ制限を確認します。
3. エクスポートを確認し、`.science`ファイルを意図したフォルダに保存します。
4. 完了するまでの進捗をフォローし、**Show in folder** を使用してファイルを見つけます。

| エクスポートオプション | 選ぶ方法 |
| --- | --- |
| 必須内容のエクスポート | 重要な記録と文献メタデータを保存します。 omitオプションの文献PDFファイル。 |
| 完全エクスポート | 利用可能な文献PDFとプレビューに表示されている追加コンテンツを含める。 |
| 内容をカスタマイズ | 個々の文献PDF、オプションファイル、バージョンを選択します。 必要な証拠は含まれています。 |

文学メタデータは常に含まれています。 文献PDFが証拠が必要な場合は、**Essential export**は利用できません。 **Full export** または **Customize contents** を使用して、必要なファイルを保持します。 輸出業者は、不足している全文を取得していません。 確認する前に、リストされているPDFとサイズを確認してください。 **Full export**は、すべてのサイズやコンテンツの制限を解除しません。

<p className="example-label"><strong>実践例</strong> サンプルQCのセッションを渡す</p>

Open-Science v0.31.1 では、[GSE60450サンプルQCテーブル](../reference/example-data.md) をまとめたセッションをエクスポートし、同じ Mac で別のプロジェクトにインポートし、**Codex subscription** を使用してフォークから継続します。 `gse60450-qc-summary.csv` を含む完了したセッションから始めましょう。 インプットテーブルだけでは研究パッケージではありません。

**Essential export** を選択し、内容と推定サイズを確認し、**Export** を選択します。 このセッションのプレビューは、**805.6キブ**を推定しました。 保存したファイルをインポートする前に **Package operation completed** を待ちます。 セッションのサイズは異なります。

![実際のQCセッションのエクスポートオプションと推定サイズ](/img/open-science/v0311/package-export.webp)

## プロジェクトへのインポート {/* #import-and-inspect-a-package */}

1. 宛先プロジェクトメニューを開き、**Import Session package…** を選択し、そのプロジェクトに 1 つの `.science` ファイルをドロップします。 関連するファイルを直接開くと、目的地のプロジェクトを選択するように要求します。
2. パッケージのプレビュー、目的地、または省略されたコンテンツを確認し、インポートを確認します。
3. 完了を待ってから、**Open imported Session**を選択します。
4. 会話ブランチを調べて、ハンドオーバーに必要なファイルを開きます。 次のタスクに関連した入力と結果を見つけることができることを確認してください。

この例では、宛先プロジェクト**Public Genomics Examples**を選択します。 インポートプレビューは、**1 ブランチ、3 メッセージ、13 ファイル** をリストします。 また、アカウントの資格情報、許可付与、プロバイダの継続識別は除外されます。 **Import**を選択する前に、これらの詳細を確認してください。

![QCのパッケージのプレビューは先のプロジェクトに輸入する前に](/img/open-science/v0311/package-import-preview.webp)

インポートされたセッションとそのサマリーCSVを開きます。 **Imported research history** 通知は、このコピーは読み取り専用であり、コードを実行したり、直接会話を続行したりできないことを確認します。

![継承されたサマリーとフォークでQCレコードをインポートし、ボタンを続行](/img/open-science/v0311/package-import-readonly.webp)

## 受領した研究記録を使用する {/* #use-the-received-research-record */}

1. インポートされたセッションで**Fork to continue**、またはセッションメニューから**Fork**を選択します。 **Fork completed** を待って、新しいセッションを開きます。 コードは自動的に実行されません。
2. 継承された要約を調べ、利用可能なモデルを選択し、Pythonランタイムを確認します。 この例では、**Codex subscription / gpt-5.6-sol** を使用します。 インポートされた資格情報と権限は、受信インストールの許可を提供していません。
3. 下記のプロンプトを送信してください。 Pythonの承認が現れた場合、要求された計算を点検し、それを承認して下さい続行して下さい。

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. 新しいファイルの両方を開きます。 この実行が返された **12** サンプル、合計の未加工計算 **269027617**, と の 意味 **22418968.08333333333333333333**. . . . 平均は供給されたQCのテーブルを要約します; 正規表現や差分表現の結果ではありません。

![フォークが完了し、Codex を使用して作成された新しい計算ファイル](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">継承された要約</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">新規計算</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">計算ノート</ExampleDownload>

新しい 2 つのファイルは Fork に保存され、元のセッションとインポートしたセッションの要約ファイルは変更されません。一般的な操作は[既存セッションの Fork](sessions.md#fork-session)を参照してください。インポートした使用量はローカルの利用集計に含まれません。

受信確認記録は、送信者から提供されたチェックを記述します。 このコンピューターで検証を再実行したことを意味するものではありません。 ファイルバージョン、比較基準、および結果を読みます。 これらのチェックの仕組みについては、[再現性](reproducibility.md)を参照してください。

## 転送のキャンセルまたは再試行 {/* #cancel-or-retry-a-transfer */}

**Run in background**は転送が続行している間進捗ウィンドウを非表示にします。 **Cancel** を使用して停止します。 ウィンドウを非表示にすると、操作をキャンセルしません。

クリーンアップが不完全な場合は、再度試行する前に**Retry cleanup**を使用してください。 失敗後、**Try again**は同じファイルと宛先を紐解きます。 あなたの意図であるならば別のパッケージを別に選びなさい。 2番目のインポートを開始する前に、既存の操作をチェックし、インポートされたセッションとファイルを調べます。
