---
title: "複数のシーケンスを揃え、保存されたポジションを検査する"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 複数のシーケンスを揃え、保存されたポジションを検査する {/* #align-multiple-sequences-and-inspect-conserved-positions */}

<p className="example-label"><strong>実践例</strong> ヒト、マウス、およびホバインヘモグロビンアルファチェーンを比較する</p>

UniProt シーケンスのレビューを3つ取得し、Clustal Omegaサービスと連携し、どのカラムが同じアミノ酸を3つすべて含んでいるかを確認します。 たとえば、142-カラムの整列を116で完全に保存した列で生成しました。 これらは、機能的なアノテーションや生理学的なツリーではなく、設定されたこの小さな3つの小惑星の結果です。

## 1. セッションとソースの準備 {/* #alignment-inputs */}

[科学データベース](../tools/databases.md#connect-database) で接続設定を記述します。

1. **ヘモグロビンシーケンスアライメント** を作成し、接続されたモデルで新しい会話を開きます。 この例では、**Codex subscription** を使用します。
2. **Settings → Connectors** では、**ジャンルとオノトロジー** と **ゲノム** を Main で利用できるようにします。 残忍なオメガはゲノムに属しています。 それは別のConnectorではないです。
3. **Settings → Privacy → Share contact email with research data services**のClustal Omegaによって要求される有効な研究サービス接触の電子メールを構成して下さい。 実際の連絡先は、発明されたアドレスではなく使用してください。 EMBL-EBI にシーケンス入力を送信します。
4. 以下にプロンプトを送信してください。 公序良俗に反する、またはその他の許可されたシーケンスを使用する。

```text
Which positions are conserved among human, mouse and bovine hemoglobin
alpha chains? Retrieve the reviewed canonical sequences from UniProt,
record their accessions and organisms, and align the three FASTA records
with Clustal Omega through the Genomes Connector in Session Notebook.
Follow the submitted job through completion, then save the input FASTA,
raw alignment, submission receipt and a short English report with
conserved-column counts and a few clearly mapped examples. Explain why
sequence conservation alone does not prove function.
```

アライメントの前に返されたレコードをチェックしてください。

| 組織図 | アクセスレビュー | 税理士法人 | キャニカル長さ |
| --- | --- | --- | --- |
| ヒト・ホモ・サピアンス | P69905の特長 | 9606 | 142のaa |
| マウス・マスカルス | P01942 | 10090 | 142のaa |
| ボブイン・ボスタルス | P01966の特長 | 9913 | 142のaa |

FASTA名は`human_P69905`、`mouse_P01942`、`bovine_P01966`です。 すべての名前はユニークでなければなりません。 人間P69905はHBA1およびHBA2に関連付けられます; タンパク質のエントリは必ずしもユニークな遺伝子ではありません。 各シーケンスでアクセスと生物を保ちます。

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_human_mouse_bovine.fasta">3つの入力シーケンス</ExampleDownload>

## 2. 一度送信してジョブをフォローする {/* #alignment-job */}

エージェントコール **Genomes → clustalo_submit** FASTAと組み合わせた、 `stype: protein` そして、 `outfmt: clustal_num`. . . . サービスは、少なくとも3つのレコードを必要とし、ほとんどの4,000レコードまたは4 MiBで受け入れます。 返された`job_id`、要求されたフォーマットおよび提出のレシートを保って下さい。

1. Notebook 投稿応答を調べます。 ジョブ ID と **よくあるご質問** は受け付けていません。
2. 同じ ID の `clustalo_status` を問い合わせ、チェックの 10 秒以上待って、サービスガイドの長い後。 キューが遅いため、別のコピーを提出しないでください。
3. **フィンランド語** の後、同じ ID とフォーマットで `clustalo_results` を呼び出します。 返されたコンテンツを`.aln`ファイルとして保存します。 提案されたファイル名を受信してもファイルを保存することはありません。
4. セッションが停止した場合、ジョブ ID を保持し、後で同じジョブを続行します。 未確認の投稿対応は、受理されたジョブに対応できます。 自動再燃を避けて下さい。 **ERROR(エロール)**、**FAILURE(ファキュア)**および**お知らせ _ NOT_FOUND**は調査、空の直線の解釈を必要としません。

![実際のジョブ ID、キュートチェック、セッション Notebook で完了したステータス](/img/open-science/v0331/clustal-submission.webp)

この例のレシートは、最初に**よくあるご質問**を記録します。 Notebook 結果は **フィンランド語** を報告し、Clustal O(1.2.4) のアライメントを返しました。 結果は、プロバイダー制御の保持期間を持ち、最大週に文書化されます。 報告書を速やかに保存します。 結果のサイズの限界は8 MiBです。 [オペレーションフィールド](../reference/connector-operations.md#clustalo_submit) を参照してください。

<ExampleDownload path="/examples/v0331/clustalo_submission_receipt.json">原本提出領収書</ExampleDownload> · <ExampleDownload path="/examples/v0331/hemoglobin_alpha_clustalo.aln">未加工直線</ExampleDownload>

## 3. 配列をチェックし、保存された列をカウントする {/* #alignment-results */}

生成された **hemoglobin_alpha_conservation_report.md** を開きます。 入力FASTAと生のアライメントでアクセスとシーケンスの長さを比較します。 各整列されたシーケンスからギャップを削除し、残りの残余がその入力に正確に一致していることを確認します。 このキャッチは、誤ったシーケンス置換やトランションをキャッチします。

![ソースのアイデンティティ、アライメントのカウントと制限の英語レポート](/img/open-science/v0331/clustal-report.webp)

この実行のために:

| 使い方 | 結果 |
| --- | --- |
| 入力および整列されたシーケンス | 3つ、各142残余 |
| アライメントカラム | 142 |
| Gap-containing カラム | 0 |
| 3つのすべてのシーケンスにおけるイデンシャル残余 | 116 列 |
| 変数列 | 26 |
| 十分に保存されたfraction | 116 / 142 = 81.7% |

Clustal出力では、`*`は完全に保存された列をマークします。 `:`と`.`は、同じ残余ではなく、同様のプロパティを持つグループを記述します。 上記の分数の同一でない列のみをカウントします。 D7、G16、H59、H88、R142 などを含む。 ここでアライメントはギャップフリーなので、列はキャノンシーケンス残渣番号を等しくします。 ギャップで、各シーケンスを別々にマップし、残余番号または成熟タンパク質番号のアライメント列を混同しません。

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_conservation_report.md">結果報告</ExampleDownload>

## 4. 証拠内での解釈を保持する {/* #alignment-interpretation */}

これらの3つの関連哺乳類の保全は、制約に関する仮説をサポートしていますが、残留物の機能が証明されていません。 折り畳み、安定性、共有の先祖、選択したサンプルはすべて問題にできます。 より広いタムンのサンプリング、構造的なコンテキストおよび実験的な証拠は次のステップを分けます。 複数のシーケンスアライメントはBLAST検索や植物ツリーではありません。

入力FASTA、未加工直線、レシートおよびレポートを一緒に保って下さい。 1つの未知のシーケンスから始めるには、[タンパク質の発見とBLAST](protein-sequence-search.md)を使用します。 プログラム固有のプロファイル検索については、[HMMERとInterProScanの機能](../tools/databases.md#sequence-tools)を参照してください。

[Clustal Omega · EMBL-EBI FAQ](https://www.ebi.ac.uk/jdispatcher/docs/faqs/clustal/).
