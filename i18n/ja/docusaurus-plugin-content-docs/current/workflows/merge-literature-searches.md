---
title: "文献検索バッチを結合"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 文献検索バッチを結合 {/* #combine-literature-search-batches */}

<p className="example-label"><strong>実践例</strong> ソリッド ステート電気分解インターフェイスおよびinterphases</p>

2つの検索は、多くの場合、重複した紙を返す。 それぞれの検索の実績を保ち、候補をスクリーン化し、両方のバッチを識別子ベースの再利用で1つのコレクションにインポートします。 この例では、OpenAlex の 2 つのバッチを 2 つ取得し、各レコードから 8 つのレコードを保持し、ライブラリの **15 独自のリファレンス** で終わる。 メタデータ組織を実証する。 完全なテキストが取得されたり、承認されたりしません。

## 1. 両方の検索を実行し、記録する {/* #1-run-and-record-both-searches */}

**Resource center → Connectors** では、**文献グラフ** を有効にして、リクエストした場合には OpenAlex の認証を構成します。 プロジェクトを開き、会話を開始し、コネクティッドモデルを選択します。 記録された操業はOpen-Science **0.30.1**、**Codexサブスクリプション/gpt-5.6-sol**を使用しました。 ソースPDFは必要ありません。

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

実際のConnectorのアクティビティをクエリ、日付、および返されたカウントのチェックを行います。 録画した検索は、**94,620**と**15,355**の合計から**12 の候補者はそれぞれ**を返す。 キャップは、これらの境界例を、排気レビューではありません。 OpenAlex から両方のバッチが来ます。 2つのクエリの公式は独立したデータベースを作ることができません。

## 2. インポートする前にエクスポートを調べる {/* #2-inspect-the-exports-before-importing */}

**Generated** で **electrolyte-merged.csv** を開く 2つのRISのエクスポートと候補者の監査に対する保持されたタイトル、DOIsおよびソースメンバーシップを確認してください。 実際のユニオンは15行を持っています。 DOI **10.1007/s41918-024-00212-1**は、両方のバッチで発生し、**A&#124;B**をラベル付けされています。

![検索バッチの保存された組合, ソースメンバーシップを保持](/img/open-science/workflow-extensions/batches-merged.webp)

比較のために、DOI空白をトリムし、オプションのDOI URLプレフィックスを削除し、ケースを無感覚に比較します。 元の識別子をソースレコードに保存します。 同様のタイトルは、二つのレコードが同一であることが不十分な証拠です。 未解決の識別子の競合は、レビューが必要です。

<ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">バッチ A</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">バッチ B</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">すべての24候補決定</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">15-rowユニオン</ExampleDownload>をダウンロードしてください。 これらは、記録された実行からのエクスポートです。

## 3. 名前付きコレクションに最初のバッチをインポート {/* #3-import-the-first-batch-into-a-named-collection */}

1. **Library → New collection** を開き、**ソリッド ステートの電解物インターフェイス** を作成します。
2. **Import references**を選ぶ前にサイドバーのコレクションを選択します。
3. `electrolyte-batch-a.ris` を選択します。 **Import to** が意図したコレクションの名前を付けることを確認してください。
4. **When identifiers match → Reuse existing reference** を選択します。 **View details** を調べて、**Import references** を選択します。

![ファーストバッチインポートプレビュー:選択したコレクションの8つの新しい参照](/img/open-science/workflow-extensions/batches-import-a.webp)

記録されたライブラリでは、**8は、0の再利用、0のスキップ、0の失敗を作成しました** で最初にインポートが完了しました。 **Done**をクリックし、コレクションをチェックします。 既に一致するレコードが含まれている場合、その作成/再利用された分裂は異なる可能性があります。

## 4. 2番目のバッチをインポートし、重複を再利用 {/* #4-import-the-second-batch-and-reuse-the-overlap */}

同じコレクションを選択することで、`electrolyte-batch-b.ris` をインポートします。 プレビューは、インポートをコミットする前に、既存のレコードを識別する必要があります。 この実行では、**7 新しい参照、1 既存、0 スキップ** が示されました。

![第二バッチプレビューは、共有された紙を既存のものとして識別します](/img/open-science/workflow-extensions/batches-import-b.webp)

**Reuse existing reference**を保ち、共有タイトルを調べ、インポートします。 実際の完了要約を読んで下さい: **7は、1の再利用、0のスキップ、0の失敗を作成しました**. Reuse は既存のメタデータを保持し、一致する参照を宛先に追加します。 2番目のコピーを作成したり、PDFをダウンロードしたりしません。

![7 個の作成と 1 つの再使用で 2 番目のインポートを完了](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. 結果のコレクションをチェックする {/* #5-check-the-resulting-collection */}

**Done** をクリックします。 DOIユニオンのコレクションには**15 リファレンス**が含まれています。 2つの元の輸出と実績のあるCSVを保ち、各候補がどこから来たのかを同僚が再構築することができます。

![最終コレクションには15件の参考文献が掲載されています。](/img/open-science/workflow-extensions/batches-collection.webp)

カウントマッチは、DOIと代表的なタイトルをオーバーラップするための交換ではなく、有用なチェックです。 ベースラインを維持しながら後ほどの公開ウィンドウを追加するには、[既存の文献コレクションを更新する](update-literature.md) を続けてください。
