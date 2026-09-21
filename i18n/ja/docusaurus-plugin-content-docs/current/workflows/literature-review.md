---
title: "文献証拠表を抽出する"
last_update:
  date: '2026-09-17'
---

# 文献証拠表を抽出する {/* #extract-a-literature-evidence-table */}

<p className="example-label"><strong>実践例</strong> マスクと呼吸器感染症に関する10件の試験</p>

このワークフローは、10枚の紙の定義されたセットで始まり、ソースリンクされた証拠表と不確実なノートで終了します。 公衆衛生文献審査の抽出を実証します。 付属のセットは、包括的な検索や完全な体系的なレビューではなく、教育選択です。

## 境界ソースセットを用意する {/* #prepare-a-bounded-source-set */}

<a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>十枚のソースリスト</a>をダウンロードします。 DOI、PMCID、コミュニティ、家庭、ヘルスケアの試験のためのオリジナルのフルテキストリンクが含まれています。 記載されたアクセス条件の下でソースを入手し、読みます。

この例で使用している同じテキスト入力では、<a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>ソース準備スクリプト</a>をダウンロードして、ローカルの作業フォルダにあるPython 3で実行します。

```bash
python3 prepare-mask-sources.py
```

スクリプトは、これらの10のヨーロッパPMC XMLレコードをダウンロードし、ソースのアイデンティティ、セクションの見出しとテーブルを保持し、**mask-trials-fulltext.md**を作成します。 サイレントなオミッティングではなく、失敗を報告します。 元の全文はWikiで再配布されていません。 ダウンロードが失敗した場合は、その用紙をソースリンクから取得し、セットをそのまま処理します。

Open-Scienceプロジェクトでは、作業モデルを選択し、結果のMarkdownファイルを **+ → Attach files** で添付します。 ソースリストには10つの異なる研究が含まれていることを確認してください。 テキストバージョンは抽出を助けます。 レイアウト、図形、またはあいまいなテーブル構造の元の記事に戻ります。

添付ファイルをクリックしてプレビューを開きます。 各研究は、タイトル、DOI、元のソースリンクから始まり、セクションテキストとテーブルで続きます。 ソースリストで10のアイデンティティを一致させます。 追加の研究として繰り返されたセクション見出しをカウントしません。

![実際の添付のフルテキストパックは、ソースのアイデンティティと記事セクションを保持します](/img/open-science/research-workflows/mask-trials-input.webp)

論文を証拠として使用する前に、そのソースで修正または引き込みを確認してください。 v0.30.2 から、`literature-review` Skill の `verify_dois` ヘルパーは、両方の方向で Crossref の更新関係をチェックします。 `retracted: true`は引き込み紙か引き込みの通知を識別できます; リンクされた関係を点検して下さい。 `false` は、紙が引き起こさなかった証拠ではなく、チェックマーカーが発見されていないことを意味します。

## トライアル1列につき1列を申し込む {/* #ask-for-one-row-per-trial */}

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

意図したソース読み取りリクエストを許可します。 エージェントは最初の抽象的なものだけを使っているか、同様にタイトルの紙が重複しているかを想定するのではなく、すべての10の学習セクションに到達することを確認してください。

## 抽出された証拠のレビュー {/* #review-the-extracted-evidence */}

応答が完了した後、CSVを開きます。 ソースリストで10のDOI値を比較し、各論文の結果セクションまたはテーブルに対して報告された推定値と分析人口を確認します。

![Open-Scienceの10兆証拠表](/img/open-science/research-workflows/mask-trials-evidence.webp)

これらの差別に注意を払う:

- **ランダム化の単位**: 村、世帯、テント、病院の区は、個別にランダム化された参加者ではありません。
- **アウトカム**:対症のseroprevalence、実験室-confirmedの伝染およびインフルエンザのような病気は異なったエンドポイントです。
- **分析**: は、アダスタンスベースまたは初期の介入サブグループの結果は、メインのランダム化比較とは別々に残さなければなりません。
- **不確実性**: 信頼区間と結論が確定しない結果を残してください。統計的に有意でない推定値を、効果がないことの証明に置き換えないでください。

<a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>証拠表の例</a> と <a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>合成ノート</a> を使用して、フォーマットを検査します。 これらは、レビューのための材料を始めています。 科学的解釈は、元のソース、研究品質、あなたが答えるつもりの質問に依然依存します。

**mask-trials-reading-notes.md** と CSV を開きます。 最後のテーブルは**10行・12列**です。 プレビューを拡大するか、長いセルを読むためにファイルをダウンロードします。 truncatedセルは、ソーステキストが欠落していない。 ノートは10件の研究のアイデンティティを保持し、その結果と人口が自動的にプールされない理由を説明しています。

![保存された読書ノートおよび完了された10列の出力](/img/open-science/research-workflows/mask-trials-notes.webp)

行が間違っているか、不完全な場合は、研究と正確なソースセクション/テーブルを名前付け、**両方とも**ファイルへのリビジョンを要求し、それらを再オープンします。 例えば、Cowling 2008の分析されたサブセットとは別々にランダム化した世帯の流れを保ちましょう。 プロス回答の更新は、保存されたテーブルを更新しない。

## 引き続きレビューへ {/* #continue-toward-a-review */}

レビューされたテーブルをソースと抽出の決定で保存します。 正式なレビューには、文書化された検索、適格性基準、スクリーニング、重複抽出、および適切なバイアス評価が必要です。 結論がより近い点検を必要とするとき源の検証および[クレームチェック](pdf-evidence.md)のための[コア読書リストワークフロー](core-reading-list.md)を見て下さい。
