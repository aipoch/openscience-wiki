---
title: "タンパク質シーケンスを見つけてBLAST検索を完了"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# タンパク質シーケンスを見つけてBLAST検索を完了 {/* #find-a-protein-sequence-and-complete-a-blast-search */}

<p className="example-label"><strong>実践例</strong> レビューされたヒトヘモグロビンアルファエントリを見つけて、そのシーケンスを取得します。</p>

ヒトHBA1遺伝子名で始まり、レビューされたUniProtタンパク質とその規範的なFASTAを取得し、BLAST検索を提出し、完了したレポートを調べます。 この例では、既知のタンパク質を使用してシーケンスルックアップと比較を教えます。

開始する前に、[科学データベース](../tools/databases.md#connect-database) に従って、必要なコネクタを有効にします。 接続されたモデルと利用可能な[Notebook ランタイム](../guides/runtimes.md)を使用します。

## 1. タンパク質を見つけ、FASTAを取得 {/* #sequence-search */}

**ジャンルとオノトロジー**は、アクセスを知る前にUniProtエントリを発見することができます。 遺伝子名、タンパク質名フレーズ、有機体で`search_uniprot_entries`を使う。 `organism_id` は指定されたタムンと一致します。, `reviewed: true` はスイス・プロットと `false` を選択しながら, 見解のない TrEMBL エントリ. `reviewed` を省略して、両方を含む。 クエリを続行するときにフィルターやページサイズを変更せずに`next_cursor`に従ってください。

**ジャンルとオノトロジー** を有効にすると、接続されたモデルと利用可能な Notebook のランタイムでセッションを開き、次のコマンドを送信できます。

```text
Use Genes & Ontologies through Session Notebook. Call search_uniprot_entries
with gene HBA1, organism_id 9606, reviewed true and page_size 5.
Save the query and complete response as hba1-uniprot.json. Check the
returned organism and protein identity, then retrieve the canonical FASTA
for the matching accession with get_uniprot_entries. Add that response to
the JSON and save hba1-query.fasta. Keep everything in English. Preserve
missing or empty results; do not invent sequences.
```

FASTA を使用する前に JSON を開きます。 このクエリは、**P69905 / HBA_HUMAN(フマン)**、**ホモ・サピネス**、**142アミノ酸**、遺伝子名**HBA1とHBA2**を返しました。 応答は、UniProt リリース **2026_03**、`total_results: 1`、`has_more: false` を識別しました。 FASTA ヘッダーは、アクセシビリティと生物を保持します。 シーケンスには、142残余が含まれています。 遺伝子名クエリは、複数の遺伝子に関連したタンパク質のエントリを返すことができるので、1対1のマッピングを妨げません。

![UniProt クエリフィルタと返されたレビューされたヒトタンパク質エントリ](/img/open-science/v0320/uniprot-discovery.webp)

<ExampleDownload path="/examples/v0320/hba1-uniprot.json">UniProt クエリと FASTA レスポンス</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-query.fasta">キャノンファスタ</ExampleDownload>

## 2. BLAST ジョブの送信とフォロー {/* #blast-jobs */}

類似性検索では、**ゲノム**を有効にして3つのBLAST操作を使用します。 NCBIサービスにシーケンスが送られます。 パブリックまたはその他の許可された入力を使用してください。

1. `blast_submit` をシーケンス、`molecule_type` と互換性のあるデータベースで一度呼びます。 返された`rid`およびポーリングの指導を保って下さい。 上記のタンパク質については、`molecule_type: protein`と`database: swissprot`は、タンパク質検索を選択します。
2. そのRIDの`blast_status`を呼び出します。 同じ RID のリクエストは、少なくとも **60 秒を離れて** であり、すべての BLAST リクエストは少なくとも **10 秒を離れて** である必要があります。 サービスを返却する遅延を遅らせる。 `WAITING` は、ジョブがまだキューイングまたは実行されていることを意味します。 RID を再度送信する代わりに保持します。
3. `READY` の後、`blast_results` の前に同じ間隔を尊重して下さい。 `json2`、`xml2`、`text`、`tabular`のフォーマットは利用できます。 レポートは2 MiBにバインドされます。 必要であれば、要求が少ない。 表の出力にはコメントが含まれており、CSVテーブルは自動に含まれません。
4. 実際のレポートでクエリの長さ、効果的なデータベース、マッチングアクセス、アライメントスパン、アイデンティティ、E値をチェックします。 配列の類似性だけは機能を確立しません。 既知のヘモグロビンシーケンスは、未知のタンパク質の発見を実証しない、制御を学ぶのに役立ちます。

提出が`blast_submission_unknown`を返す場合、その受諾は不確実です:自動的に再提出しないでください。 応答とRIDを保存します。 提出されたレシートや`WAITING`ステータスを完全にアライメントとして扱うことはありません。 正確な入力と返り条件は[BLAST リファレンス](../reference/connector-operations.md#blast_submit)になります。

## 3. 完了したレポートのオープンと解釈 {/* #blast-report */}

上記のセッションで同じタンパク質例を続けてください。 申請書を受領して、後日同じジョブを再開できるようにしてください。 送信:

```text
Continue with the public P69905 FASTA retrieved above. Use Genomes through
Session Notebook. If this session already has a BLAST RID, resume that RID;
otherwise call blast_submit once with molecule_type protein, database
swissprot and hitlist_size 5, then save the receipt. Space requests for the
same RID by at least 60 seconds and follow any longer server delay. Check
blast_status; if it is still WAITING, keep the RID for a later check rather
than submitting again. After READY, wait the required interval and retrieve
blast_results in json2 format. Save hba1-blast-raw.json, hba1-blast-hits.csv
and hba1-blast-results.md. Include the actual database, query length,
accessions, alignment coordinates, identity counts and E-values. Explain
the coverage and identity calculations. Keep everything in English and
preserve actual errors or empty results. Never invent alignments.
```

![RIDと最小ポーリング間隔でBLASTの提出受領](/img/open-science/v0320/blast-submitted.webp)

レポートの準備ができたら、**hba1-blast-results.md**を開き、**hba1-blast-raw.json**で表を比較します。 この例では、**BLASTP 2.17.0+の特長** を、**スワシプロット** でレポート、**142 アミノ酸** クエリ、**5ヒット** で確認しました。

| アクセス | 点心残余/アライメント長さ | クエリカバレッジ | E-値 |
|---|---:|---:|---:|
| P69905の特長 | 142/142 (100%) | 100% | 1.99033e-100の特長 |
| P01923の特長 | 140/141 (99.29%) | 99.30% | 1.06845e-98の特長 |
| Q9TS35の特長 | 140/142 (98.59%) | 100% | 2.38346e-98の特長 |
| P06635の特長 | 139/142 (97.89%) | 100% | 3.57742e-98の特長 |
| P01924の特長 | 138/141 (97.87%) | 99.30% | 3.00466e-97の特長 |

![BLASTレポートを5つの実際のヒット、クエリカバレッジ、アイデンティティ計算で完了](/img/open-science/v0320/blast-results.webp)

それぞれの最初のHSPでは、同一残数が整列長で分けられます。 クエリカバレッジは、142 によって分割された包括的なクエリ座標スパンです。 P01923 では、クエリスパンは 2-142 です: 適用範囲は 141/142 = 99.30% であり、アイデンティティは 140/141 = 99.29% です。 2つの比率は異なる質問に答えます。 関数の代入が正しいという確率はどちらも同じです。

<ExampleDownload path="/examples/v0320/hba1-blast-results.md">報告書を完成</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-hits.csv">5枚のヒットテーブル</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-raw.json">NCBI JSON2レポート</ExampleDownload>

ヒットしたP69905は入力シーケンス自体なので、100%のアイデンティティとカバレッジは、既知のシーケンスチェックを提供します。 他のヒットは、新しい機能的な発見ではなく、同様のシーケンスを示しています。 結果テーブルで生のレポートとクエリを保持します。 後ほどデータベースリリースはヒットリストを変更できます。
