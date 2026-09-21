---
title: "特定のジャーナルと日付内で検索"
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 特定のジャーナルと日付内で検索 {/* #search-within-specified-journals-and-dates */}

<p className="example-label"><strong>実践例</strong> 2つのジャーナルでマインドフルネスの介入試験, 2019–2025</p>

焦点を絞った検索は、明示的な制限と、画面の記録を必要とします。 この例では、**JAMA Psychiatry(ジャマ・シーチュアトリー)** および **行動研究と治療** でマインドフルネス関連の出版物を取得するために PubMed を使用して、他の出版物から候補のランダム化試験レポートを分離します。 完全なスクリーニングテーブルと検索ノート、治療の推奨事項や体系的なレビューはありません。

## 1. 質問と資格規則を設定する {/* #1-set-the-question-and-eligibility-rule */}

プロジェクトを開き、コネクティッドモデルを選択します。 **パブメッド** Connector が **Settings → Connectors** で利用可能であることを確認してください。 要求された場合、連絡先情報を設定します。 ダウンロードした紙は、この例を起動する必要はありません。

データベースレコードが追加された日付ではなく、公開日**2019-01-01 から 2025-12-31**を使用してください。 特定のマインドフルネスの介入アームと報告された参加者の結果を含むプライマリランダム化されたレポート。 混合された介入、未クリアな出版物の状態または競合する日付の別の**不確実性**カテゴリを保って下さい。 メカニスティックな結果だけでは、二次解析を報告しません。

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![Open-Scienceの実際の集中調査の要求](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. クエリとカバレッジをチェックする {/* #2-check-the-query-and-coverage */}

実行は、この概念とジャーナルクエリを提出しました。, 出版物日付フィルタは別々に供給しました:

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

**Notebook** を開き、PubMed アクティビティを展開します。 ジャーナルフィールド、日付、および返されたカウントの両方を確認します。 9月には、16、2026、検索は**62レコード**を返す。 62 は、`has_more = false` で取得しました。 カウントは、PubMed の更新として変更される場合があります。 結果が破棄されると、すべての検索がスクリーンされたことを主張する前に残りのページを取得します。

広範なコンセプトクエリは、非トリルを保持します。 トライアル資格は、別のスクリーニング決定です。 出版型インデックス化だけでは不完全であり、過去のランダム化試験を言及する紙は、必ずしも新しいものを報告するものではありません。

## 3. スクリーニングテーブルの見直しと修正 {/* #3-review-and-correct-the-screening-table */}

応答が完了したら、**Generated** で **mindfulness-search-audit.csv** を開きます。 除外されたレコードや不確実なレコードを含む、すべての取得されたPMIDを保持する必要があります。 タイトル、ジャーナル、DOI、リンクされたパブのレコードに対する日付をチェックし、抽象的な決定を比較します。

![保存された候補テーブル、不確実性および除外されたレコードを含む](/img/open-science/workflow-extensions/focused-search-table.webp)

各除外理由を抽象化に対してチェックします。 PMID **38837133**はより広い心理療法の第一次ランダム化試験です; 例は、そのマインドフルネスの適格性**不確実性**をマークします。 PMID **34009273**はメタ分析であり、除外されます。 決定が修正する必要がある場合は、レコードと特定の問題の名前を、エージェントにCSVを更新し、保存したファイルを再オープンしてください。

![Notebookの実際のスクリーニングリビジョンと保存ファイルチェック](/img/open-science/workflow-extensions/focused-search-notebook.webp)

見直しされた例表には、**20は含まれて、37はおよび5不確実な記録を除外しました** が含まれているので、すべての **62** がヒットします。 これらは、20の異なる試験が完全に承認されているという宣言ではなく、抽象的なレベルのスクリーニング決定です。 複数の出版物は同じ基礎試験に気づくことができます。

## 4. 不確実性を目に見える保って下さい {/* #4-keep-uncertainty-visible */}

PMID **41418645**は2019–2025 PubMedの出版物日付フィルターによって、メタデータは**2026-01**の印刷物の日付を報告する間、戻りました。 最終日付決定を行う前に、矛盾し、出版履歴を検証してください。 検索ウィンドウに収まるように、年を静かに交換しないでください。

**mindfulness-search-notes.md** を開き、そのカウント、適格性ルール、および制限が CSV にマッチすることを確認します。 元のメタデータスナップショットをこれらのファイルと一緒に保存しておくと、各決定はソースにトレースできます。

![20/37/5スクリーニングカウントで修正された検索ノート](/img/open-science/workflow-extensions/focused-search-notes.webp)

<ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">候補者テーブルのレビュー</ExampleDownload>と<ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">検索ノート</ExampleDownload>をダウンロードします。 完全な抽象化は、ここに再配布されていません。 ソースリンクに従ってそれらを検査します。

正式な証拠レビューのために、不確実なレコードを解決し、完全なテキストを入手し、仲間のレポートを試行にリンクし、適切な独立したスクリーニングを手配します。 [読書リストのワークフロー](core-reading-list.md) を使用して、ソースセットとアクセスが確立された後にコレクション、または [証拠抽出](literature-review.md) を作成できます。
