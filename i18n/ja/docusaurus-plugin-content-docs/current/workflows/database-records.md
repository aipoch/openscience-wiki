---
title: "科学データベースから構造化されたレコードを取得する"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 科学データベースから構造化されたレコードを取得する {/* #retrieve-structured-records-from-a-scientific-database */}

<p className="example-label"><strong>実践例</strong> PubChemの7つのストレートチェーンカルボキシル酸</p>

化合物名で始まり、検証済みの識別子と特性の表で仕上げます。 この例では、オクタノック酸、7人組の均質シリーズを2〜8本の炭素原子で取得します。 ソースレコードは、各値が取得されたか確認できるように、テーブルと一緒に使用可能です。

## 1. 化合物とプロパティを定義する {/* #1-define-the-compounds-and-properties */}

**Resource center → Connectors**では、**化学品**が使用可能であることを確認してください。 プロジェクトを開き、会話を開始し、コネクティッドモデルを選択します。 この実行は、Open-Science 0.30.1と化学/PubChem Connectorを使用しました。 入力スプレッドシートを必要としませんでした。

**中立、まっすぐな鎖、飽和モノカルボキシル酸** を指定します。 同じ名前は、分岐した異人体、塩、またはコンジュゲートベースを参照することができます。 式だけでは、これらの構造を全て区別できません。

```text
Use the Chemistry/PubChem Connector to retrieve acetic acid,
propanoic acid, butanoic acid, pentanoic acid, hexanoic acid,
heptanoic acid and octanoic acid. Resolve each name to a PubChem CID.
Retrieve molecular formula, molecular weight, the returned SMILES
and ConnectivitySMILES fields, InChIKey and the PubChem source URL.
Use neutral straight-chain acids, not branched isomers or salts.
Save pubchem-homologs.csv, pubchem-homologs-source.json and
pubchem-homologs-notes.md. Preserve exact lookup inputs and raw
responses. Check seven distinct CIDs, carbon counts 2–8, formulas
CnH2nO2, neutral charge and linear structures. Reopen the files.
Keep all outputs in English and do not delegate.
```

![実際の会話でコンパウンドスコープと要求されたファイル](/img/open-science/workflow-extensions/pubchem-input.webp)

## 2. 実際のデータベース呼び出しをチェックする {/* #2-check-the-actual-database-calls */}

送信後、ツールのアクティビティを拡張するか、**Notebook**を開く。 `pubchem_search_compounds`で7つの名前を解決し、その後、`pubchem_get_compounds`でレコードを取得しました。 返されたCIDと各名前の構造を列を受け入れる前にチェックします。 名前が複数の可哀想を返すと、その曖昧さが最初に解決します。

この例では、正確な酸名と最初の返されたCIDを使用し、その後、バッチプロパティを確認します。 これは、これらの非曖昧な名前に適しています。 最初のヒットを取ることは、一般的な識別ルールではありません。

![Notebookの実際のクエリアクティビティと保存ファイル読み込みバック](/img/open-science/workflow-extensions/pubchem-lookup.webp)

## 3. 保存テーブルを開く {/* #3-open-the-saved-table */}

応答が完了するまで待って、**Generated** の下にファイルが現れます。 **pubchem-homologs.csv**を開き、プレビューを拡大します。 **7行・8列** を生成しました。

| コンパウンド | パブシムCID | フォーム | 分子量、g/mol |
|---|---:|---|---:|
| 酢酸酸 | 176 | C2H4O2の特長 | 60.05 |
| プロパノ酸 | 1032 | C3H6O2の特長 | 74.08 |
| バタノニック酸 | 264 | C4H8O2の特長 | 88.11 |
| Pentanoicの酸 | 7991 | C5H10O2の特長 | 102.13 |
| ヘキサノ酸 | 8892 | C6H12O2 | 116.16 |
| ヘプタノ酸 | 8094 | C7H14O2の特長 | 130.18 |
| オクタノック酸 | 379 | C8H16O2の特長 | 144.21 |

![再オープンされた7複合CSV](/img/open-science/workflow-extensions/pubchem-table.webp)

**サインイン**でマッチする行は、表示順ではありません。 フォーミュラとリニアスマイルを一緒にチェックします。 例は、返されたフィールド名、`SMILES`、`ConnectivitySMILES` の両方を保持します。 これらの化合物に一致するように、その文字列が起こります。 別の識別子またはそれからの実験的なステレオ化学として名前を変更しないでください。

## 4. ソースレコードをエクスポートで保持する {/* #4-keep-the-source-records-with-the-export */}

**pubchem-homologs-source.json** を開き、すべての 8 つの操作、正確なルックアップ入力と生の応答を検査します。 手順とチェックのために**pubchem-homologs-notes.md**を開きます。 保存したCSVは、生の記録と比較していました。 7つのアイデンティティ、式および線形構造は合意しました。

![保存された手順、検証結果および解釈の制限](/img/open-science/workflow-extensions/pubchem-notes.webp)

プレビューの**Download**ボタンを使用してローカルコピーを保持します。 この完了した実行のために、<ExampleDownload path="/examples/workflow-extensions/pubchem-homologs.csv">CSV</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-source.json">ソースレコード</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-notes.md">ノートブック</ExampleDownload>をダウンロードしてください。 PubChemレコードは変更できます。 ソースのスナップショットを解析で保持します。

これらは、新しい実験的な測定ではなく、データベースの適合または標準化された特性です。 分子量は厳密な単離性固まりではないです、このテーブルは純度、毒性または生物学的活動を確立しません。 競合するソースレコードを比較するには、[科学的記録の交差検査](cross-check-records.md) を続けてください。
