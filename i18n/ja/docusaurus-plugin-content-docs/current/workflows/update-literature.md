---
title: "既存の文献コレクションを更新する"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 既存の文献コレクションを更新する {/* #update-an-existing-literature-collection */}

<p className="example-label"><strong>実践例</strong> 2つの出版物の窓を渡る淡水マイクロプラスチック輸送</p>

更新は、元の検索ルールを保持し、追加されたものを正確に表示する必要があります。 この歴史は、まず**2020–2022**コレクションをビルドし、同じクエリとフィルタで**2023–2025**を検索します。 **7 から 14 への参照**から実際のライブラリが成長します。 これは、マニュアル、境界検索です。 スケジュールされた監視や、徹底的なレビューはありません。

## 1. ベースラインを定義して保存する {/* #1-define-and-save-the-baseline */}

接続されたモデルでプロジェクトを開きます。 **Resource center → Connectors**で**文献グラフ**を有効にし、必要に応じてOpenAlexを設定してください。 送信:

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

この実行は、**3,643の12は一致します** を返し、**7** を保持し、**5** を除外しました。 **freshwater-search-plan.md** を開き、継続する前に条件と日付を確認してください。 保存されたプランは更新前に状態を記述します。

![保存されたベースライン検索仕様と保持されたレコード](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

証拠レベルを見直し: 一部の候補者は、タイトル/メタデータのみを供給しましたが、他の人にはライセンス許可された抽象が含まれていました。 広範囲の輸送経路レビューは、コンテキストとして含まれています。 それらのインクルージョンは、淡水固有の実験結果が証明されていません。

## 2. コレクションの作成とポップアップ {/* #2-create-and-populate-the-collection */}

<ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">ベースラインRIS</ExampleDownload>をダウンロード **Library → New collection** では、**淡水マイクロプラスチック輸送** を作成し、それを選択し、**Import references** を選択します。 RIS を選択し、インポートする前に目的地とマッチングの動作を確認します。

![名前付きコレクションのベースラインインポートプレビュー](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

**7は、0の再利用、0のスキップ、0の失敗を作成しました**で録画したインポートが完了しました。 **Done** をクリックし、コレクションに 7 つの参照があることを確認します。 別のライブラリの既存のマッチは、作成/再利用されたスプリットを変更できます。

![7つの基準ベースラインコレクション](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. 同じ会話で次の日付ウィンドウを検索します {/* #3-search-the-next-date-window-in-the-same-conversation */}

プロジェクトの会話に戻る。 ベースラインファイルを変更しないようにし、明示的な比較を要求します。

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

**7追加、0ベースラインオーバーラップと5エクスクルージョン**で**7,600の12は一致します**を返しました。 どちらの検索も12候補にトランクされます。 データベースのランキングとカバレッジは変更できます。 カウントは、9月16、2026を実行します。

![追加と除外による更新監査を保存](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

実際のDOIセットは、合計を割くのではなくチェックします。 ベースラインと一緒に日付<ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">更新監査</ExampleDownload>と<ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">更新ノート</ExampleDownload>を保存します。

## 4. 既存のコレクションへのインポート追加 {/* #4-import-additions-into-the-existing-collection */}

<ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">RISの追加</ExampleDownload>をダウンロード ライブラリで**淡水マイクロプラスチック輸送**を選択し、**Import references**を選択します。 **Reuse existing reference** を保ちながら、既に現行のアイテムを安全に再利用することができます。

![更新インポートプレビュー 7つの追加を示す](/img/open-science/workflow-extensions/freshwater-import-update.webp)

**7は、0の再利用、0のスキップ、0の失敗を作成しました**で完成した実際のアップデートインポート。 このコレクションには**14 リファレンス**が含まれています。 これは、2つの保持されたセットの正規化DOIユニオンに同意します。

![更新されたコレクションには、14の参考文献があります。](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

ベースライン自体は書き換えられませんでした。 日付範囲と検索レコードを保存して、後で読者は、更新から元の証拠ベースを区別することができます。 提案や科学的な主張をサポートするために、関連する完全なテキストを次から取得および読み込みます。 メタデータだけでは、鑑定書ではない。 クエリのバッチをオーバーラップするには、[検索バッチを組み合わせる](merge-literature-searches.md)を参照してください。

ダウンロード可能な監査コピーは、フル抽象とそのライセンスフィールドを省略します。 識別子、決定、および理由は保存されます。 リンクされたソースで抽象を調べます。
