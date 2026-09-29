---
title: "パスウェイとインタラクションネットワークを調べる"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# パスウェイとインタラクションネットワークを調べる {/* #inspect-a-pathway-and-its-interaction-network */}

<p className="example-label"><strong>実践例</strong> Pathway CommonsによるReactomeでのヒトp53信号</p>

**TP53の特長**、**MDM2の特長**、**CDKN1Aの特長**がネットワークに表示されるかを調べるために、キュレーションされた経路を使用します。 結果は、保存されたソースレコード、インタラクションテーブル、および研究ノートです。 これは、キュレーションされたコネクティビティを取得します。 サンプルでパスウェイのアクティビティをテストしたり、テストしたりしません。 統計的な遺伝子リストの質問については、[遺伝子組込みの充実](gene-set-enrichment.md)を使用してください。

## 1. プロジェクトの準備 {/* #prepare */}

1. **Pathway Commons 研究**という名前のプロジェクトを作成し、会話を開始します。
2. **Settings → Connectors** では、**Pathway Commons** をアクティブなエージェントに利用できるようにします。 公共サービスを利用しています。 この例では、プライベートな研究ファイルは必要ありません。
3. 設定したMainモデルを選択します。 この例では、**Codex subscription** を使用します。 Codexが**Update required**、[runtime を更新する](../guides/frameworks.md#update-codex)がマークされている場合は、タスクを送信する前にマークされます。

## 2. 返されたアイデンティティを検索し、保持する {/* #search */}

送信:

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

**Notebook** は、会話の横に開き、クエリと返されたレコードを検査します。 `Pathway`、生物`9606`、データソース`reactome`をタイプして、検索した`p53 signaling`。 また、`p53`で`top_pathways`を使用しました。 検索は、**1,309合計ヒット** を報告しました。 最初のページは結果セット全体ではありません。

![Notebookの英語研究と実際のPathway Commonsクエリを要求する](/img/open-science/v0340/pathway-query.webp)

選択したレコードは、**TP53によるトランスクリプション規制**で、正確なURI `http://bioregistry.io/reactome:R-HSA-3700989`とソース`pc14:reactome`でした。 ラベルから再構築するのではなく、クエリで返されたURIをキープします。 結果とカウントは、ソースの更新として変更される場合があります。

## 3. 選択したパスウェイをエクスポートする {/* #export */}

選択した URI を **サブパスウェイが含まれています** でエクスポートするように要求します。 この実行では、エージェントはSIF、TXT、JSON-LD応答を保存しました。 SIFは、フラットなインタラクションレコードを供給します。 TXT はノードレコードを追加します。 JSON-LDはより豊富なモデル構造を保持します。 フォーマットまたはサブパスウェイスコープを選択すると、[操作の参照](../reference/connector-operations.md#pathway_commons_export) を参照してください。

要約を読む前に、保持された応答を調べます。 SIFエクスポートには**3,318の相互作用の記録**が含まれており、そのTXTエクスポートには**387 ノード**が含まれています。 これらのカウントは、この選択した経路とエクスポートスコープを、すべての人間のp53相互作用ではなく記述します。

## 4. 結果のオープンと検査 {/* #inspect */}

1. 回答または生成されたファイルカードで**tp53_mdm2_cdkn1a_readable_interactions.tsvの特長**を選択します。 列が狭い場合は、フルスクリーンプレビューを開きます。
2. `source`、`interaction`、`target`を生の反応からチェックします。 9列読み表は、完全なネットワークではなく、選択です。
3. **tp53_pathway_research_note.md** を開きます。 パスウェイの URI、ソース、日付、制限を保持していることを確認してください。
4. 必要なファイルをダウンロードしてください。 プレゼンテーションで使用される任意の抜粋と一緒に完全なネットワークと元の応答を保存します。

![アプリ内で選択したインタラクションレコードが非公開](/img/open-science/v0340/pathway-interactions.webp)

返されたレコードは、`TP53 controls-expression-of MDM2`、`MDM2 controls-state-change-of TP53`、`MDM2 in-complex-with TP53`が含まれます。 CDKN1Aは6つのレコードに現れますが、このSIFエクスポートは直接TP53-to-CDKN1Aエッジはありません。 選択された平坦な経路の不在なエッジは、生物学的関係が不在であることを証拠ではありません。

![パスウェイのアイデンティティと解釈の制限で英語のメモを保存](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` は、アクティベーションと阻害を区別しません。 `in-complex-with`は直接バイナリ結合を確立しません。 ネットワークだけでは、組織の特異性、変異効果、相互作用の強さ、サンプルレベルの活動、または因果性を確立することはできません。 元の経路反応とプライマリ実験を使用して、それらの質問を調べます。

## 保存された例ファイル {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">元のConnector応答、圧縮されたZIP</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">完全な輸出された相互作用のテーブル</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">Nine-row読書テーブル</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">英語研究ノート</ExampleDownload>

選択された経路ではなく、遺伝子セット間の遺伝子近接やパスを探索するには、**pathway_commons_graph** を使用して、その方向、パスモードを選択し、意図的に制限します。 この URI ベースのエクスポートとは異なるクエリです。 [科学データベース](../tools/databases.md#pathway-expression-clinical)では、ソースとセットアップが記述されています。
