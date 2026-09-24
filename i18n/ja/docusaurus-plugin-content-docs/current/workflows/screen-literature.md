---
title: "スマートコレクションで論文を選別する"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# スマートコレクションで論文を選別する {/* #screen-papers-with-a-smart-collection */}

<p className="example-label"><strong>実践例</strong> CO2電極用単原子触媒に関する主な研究</p>

候補者リストを包含と除外基準を使用してレビューされた読書セットに変えます。 この例では、8つの論文を取り、タイトルと抽象に関するスマートコレクションを実行し、決定書を確認し、5つの主要な研究をエクスポートします。 集団会議の選定は、徹底的な体系的な見直しや全文の品質評価ではなく、対象としています。

## 1. 候補者の探しと受け入れ {/* #screening-inputs */}

プロジェクト**単一原子の触媒分解のスクリーニング**を作成し、作業モデルで会話を開きます。 この実行は、**Codex subscription** を使用します。 必要に応じて、関連する文献コネクタを有効にし、[資格情報](../guides/connectors.md)を構成します。 送信:

```text
I am preparing a group meeting on single-atom catalysts for
electrochemical CO2 reduction. Find eight relevant papers published
from 2017 through 2022, including both primary studies and review
articles so I can screen them. Propose the references to the Library
Inbox, with verified titles, DOIs, abstracts and source links. Save a
short candidate list identifying each paper's study type.
Keep the output in English.
```

**Library → Inbox** を開き、各タイトル、DOI およびソースを確認し、これらの 8 つのレコードを選択し、**Accept** を選択します。 このプロジェクトにリンクされていることを確認してください。 他の保留中のInboxレコードは、独自のレビューが必要です。 受信トレイをクリアするだけではありません。

保存された<ExampleDownload path="/examples/v0330/co2_single_atom_candidate_list.md">候補者リスト</ExampleDownload>は、オンラインファーストとジャーナル発行年の違いを含む5つの主要な研究と3つのレビュー/アカウントを記録します。 正確なリピートのために、そのリストに8つのDOIsをプロジェクトに追加します。 新しいトピック検索では、異なる候補を返すことができます。

## 2. スクリーニングモデルを埋め込む {/* #screening-model */}

**Settings → Model → Classification models** を開きます。 **Smart collections** では、設定された分類サービスとそのモデルを選択します。 サービスカードで**Check model**を使用し、**テスト成功**を確認します。 この例では、**TypeSafe AI/Jev最新** を使用します。 Main は Codex を継承しています。

![スマートコレクションのための別々のモデル結合](/img/open-science/v0330/classification-smart.webp)

スマートコレクションにはデフォルトモデルはありません。 **Automatic capability selection**の結合は異なった特徴であり、この1のために取り替えません。 すべてのスマートコレクションは、スクリーニング結合を共有します。 [分類のセットアップ](../guides/models.md#smart-collection-model) を参照してください。

## 3. スコープとルールを定義する {/* #screening-rules */}

ライブラリでは、**New collection**を選択し、**CO2削減 - 第一次研究**を入力し、**Smart collection**をオンにします。 セットセット **Scope** にほんご **Project** 名 名 **単一原子の触媒分解のスクリーニング**そのため、8つのプロジェクト参照のみが評価されます。

| 受け入れられた値 | この例で使用されるテキスト |
| --- | --- |
| Description | Select primary experimental papers for a group meeting on single-atom catalysts for electrochemical CO2 reduction. |
| Inclusion criteria | Published from 2017 through 2022 inclusive. Reports original experimental research on atomically dispersed metal catalysts used for electrochemical CO2 reduction. |
| Exclusion criteria | Exclude reviews, Accounts, perspectives and purely computational studies. Exclude studies limited to thermal CO2 conversion or reactions other than CO2 electroreduction. |

すべてのインクルージョン基準は満たさず、除外基準が適用される場合があります。 **Use available full text**と**Update automatically**は、このタイトルと抽象パスをオフにしてから、**Create collection**を選択します。 スクリーンショットは、保存されたルールが **Collection rule → Edit rule** で再オープンした状態を示しています。

![保存された基準, 境界されたプロジェクトスコープと証拠オプション](/img/open-science/v0330/smart-collection-rules.webp)

**Live rule preview**はドラフトを調整することができますが、その結果は保存されません。 **Use available full text**は、利用可能なPDFテキストを分類サービスに送信します。 長い PDF は関連する通路を使用し、PDF がタイトルと抽象化に落ちる。 完全なテキスト評価としてそれを扱う前に決定のために示されている実際の証拠を点検して下さい。

## 4. 小さなスクリーニングパスを実行する {/* #screening-trial */}

**Collection actions → Trial run (up to 20 references)** を開き、スコープを確認し、**Start trial run** を選択します。 試験は決定を保存し、**Screening process**を開きます。 処理されたカウント、保留中の候補、着信結果に従う。 **AI の一致**は、このランのモデルの決定を説明しています。 マニュアル決定はまだコレクションのメンバーシップを決定します。

実行パスを中断するには、**Pause**(ラベル付き**Pause analysis**)を選択し、**一時停止中**を待ち、**Resume analysis**を使用します。 ルール、候補紙、保存された進捗変更後、実行が再開できないことがあります。 新しいパスを開始する前に現在のルールを確認してください。 **結果に戻る**は、含まれた、必要性のレビュー、除外され、評価されないために戻ります。 **Run details**はパスに関する情報を示しています。

![同じ8つの候補のための完了したスクリーニングプロセス](/img/open-science/v0331/smart-completed.webp)

| 表示 | 使い方 |
| --- | --- |
| 収録済み | マッチした紙を読んで、適格性を確認します。 |
| 確認が必要 | 実際のソースに対する不確実性または古い評価を解決します。 |
| 除外済み | 除外理由がお客様の基準に一致していることをご確認ください。 |
| 未評価 | 再試行する前に、証拠や報告された評価エラーをチェックしてください。 除外の決定ではありません。 |

行の**Evaluation details**をクリックすると、その決定、マッチスコア、証拠、モデルの履歴が確認できます。 スコアは規則の一致を記述します; 学習品質や効果の大きさの対策は行いません。

![タイトルと抽象的な証拠とモデルのスコアによる実際の不確実な決定](/img/open-science/v0330/screening-review.webp)

## 5. 読書セットを見直し、確認 {/* #screening-review */}

紙のタイトルを開き、その抽象を読んで、必要に応じてDOI /ソースリンクに従ってください。 出版物の日付、調査のタイプ、触媒および規則との反作用を比較して下さい。 チェック後だけ**Include**または**Exclude**を選択してください。

例では、最初のパスは2つのレビューを除外し、**Needs review**で5つのプライマリスタディを残し、不十分な読み取り可能な証拠で1つのレコードを評価することができません。 それから手動で5つの第一次研究が含まれている; 残りのレビューは、その研究タイプをチェックした後に手動で除外されました。 これは5つの自動包含の決定ではなく、レビューステップです。

![主な研究は、その抽象的および基準を見直した後に手動で含まれている](/img/open-science/v0330/screening-manual-decision.webp)

| レコードレビュー | 最終的な決定 | バシス |
| --- | --- | --- |
| ジュ、2017・ [10.1038/s41467-017-01035-z](https://doi.org/10.1038/s41467-017-01035-z) | 追加 | 金属-窒素-炭素CO2電解触媒の実験的比較。 |
| 張って下さい、 2019 ・・・・ [10.1002/anie.201906079の特長](https://doi.org/10.1002/anie.201906079) | 追加 | FeN5サイトの試験および電気化学試験 |
| ケイ, 2021 ・・・・ [10.1038/s41467-020-20769-x](https://doi.org/10.1038/s41467-020-20769-x) | 追加 | CO2-to-methane変換のための実験的なCuサイト触媒研究。 |
| 李、2022 · [10.1021/acs.nanolett.1c04382の特長](https://doi.org/10.1021/acs.nanolett.1c04382) | 追加 | フェシングル原子触媒の実験リンチューニング。 |
| 張って下さい、 2021 ・・・・ [10.1002/anie.202014718の特長](https://doi.org/10.1002/anie.202014718) | 追加 | 実験的な準備とサポートされている Ag サイトの CO2 テスト。 |
| ふりがな 2019 ・・・・ [10.1021/acs.accounts.8b00478](https://doi.org/10.1021/acs.accounts.8b00478) | 除外 | 口座; 第一次研究規則の外。 |
| 李、2020 · [10.1002/adma.202001848の特長](https://doi.org/10.1002/adma.202001848) | 除外 | レビュー; 背景の読み込みとして別々に保持します。 |
| 王, 2022 · [10.1002/smm2.1101の特長](https://doi.org/10.1002/smm2.1101) | 除外 | レビュー, 手動でソースをチェックした後に分類. |

収集の更新時に手動の決定は残っています。 **Use model decision**は個々の手動上書きを削除します。 コレクションメニューの**Reset manual decisions**はより広い範囲を持っています。 使用前にスコープを見直します。

## 6. 選択した紙をエクスポートし、使用 {/* #screening-export */}

**含まれている5**、**3を除外**、およびゼロ残りの**Needs review**か**Not evaluated**の記入項目を確かめて下さい。 この例では、**Manually included** と記述します。 モデルの初回パスのスコアは異なる場合があります。

![5つの手動で含まれているペーパーおよび最終的な5/3の割れ目](/img/open-science/v0330/screening-included.webp)

**Collection actions → Export included references → BibTeX** または **RIS** を選択し、ファイルを保存し、5 つの DOI レコードを含むことを確認します。 <ExampleDownload path="/examples/v0330/screened-primary-studies.bib">例えば、BibTeX</ExampleDownload>は、再配布のために削除された抽象でエクスポートされた引用を保存します。 これは、スクリーニング決定ログやPDFバンドルではなく、伝記です。 <ExampleDownload path="/examples/v0330/screening-decisions.csv">決定書表のレビュー</ExampleDownload>は、選択を渡すとそのままにしてください。

選択したセットを [グループミーティング読書パック](journal-club.md) に使用してください。 詳細な結果や触媒性能を比較する前に、完全なテキストを入手し、検査します。 **Update automatically**は、選択したスコープ内の新規または変更されたレコードを評価し、サービスコストを請求することができます。 外部データベースを新しい論文に検索しません。
