---
title: "画像の生成と編集"
last_update:
  date: '2026-11-20'
---

# 画像の生成と編集 {/* #generate-and-edit-images */}

プロンプトからイラストを作成し、選択したイメージを絞り込み、以前のバージョンを保持します。 説明図やプレゼンテーションのアートワークに使用します。 生成された画像は実験的な証拠ではありません。科学的なラベル、構造、およびそれを共有する前に視覚的な主張を確認します。

## 画像サービスの設定 {/* #configure */}

1. **Settings → Model**を開き、**Image generation**を見つけます。 **Image services → Add image service** を開きます。
2. **Provider type**を選ぶ **Custom HTTP service** では、**Name**、**Base URL**、**API key** を入力し、**Model ID** と **インターフェイスプリセット** をサービスでサポートしています。 カスタムエンドポイントでは、**API format** をサービスイメージ API に合わせます。
3. サービスを保存し、**Image generation model**で選択します。 **Not configured**はイメージ生成が準備されていないことを意味します。
4. 1つの小さな画像リクエストから始めて、返された画像を検査します。 新しい画像設定は、次の順番から適用されます。

![エンドポイント、API 形式、クレデンシャル、モデルフィールドによる画像サービス設定](/img/open-science/v130/image-service.webp)

Main、Vision、Image generation は役割が異なります。Main は会話を進め、Vision は画像を読み取り、Image generation は画像を生成・編集します。Main で Codex サブスクリプションを使っていても、画像生成 API やその利用枠が自動で付くわけではありません。現在利用できる Main モデルを選んだまま、画像サービスを別に設定してください。

## 最初の画像を生成する {/* #generate */}

プロジェクトの会話では、画像の目的、コンテンツ、レイアウト、ラベルを記述します。 保存されたイメージを要求します。 画像生成ツールカードはリクエストとその進捗を表示します。プレビューで開く前に、完成した出力を待ちます。

<p className="example-label"><strong>例</strong> 概念的なワークフロー図を要求する</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

実際のラベル、順序および矢印の方向を点検して下さい。 失敗リクエストの場合、メインを関連しないプロバイダーに変更するのではなく、イメージサービス、モデル、エラーをチェックします。 生成や編集に使用するプロンプトやソース画像は、選択した画像サービスに送信されます。 キャンセルは、既に送信したデータをリトラクトできません。

## 編集、比較、再利用 {/* #edit */}

画像の編集アクションを開き、ソースバージョンを選択し、フォーカスした変更を記述します。 選択されたサービスがそれらを支えるときだけ利用できる地域および変数制御を使用して下さい。 編集を送信し、新しい出力を待ちます。 編集は新しいバージョンを作成するので、以前のバリアントが使用可能です。

ソースで候補を比較する: 要求された領域と変更されていないままにすべき部分を確認してください。 画像履歴を使用して、バージョンを再訪したり、編集を続けたりします。 意図した最終版をダウンロードし、それをプレゼンテーションに入れる前に、ファイルを再び開きます。 正確なキャプションは、イラストの内容を識別します。

数値チェックが必要な既存のプロットについては、[Notebook](notebook.md)と[プロヴァンス](reproducibility.md)を使用してください。 スライドテキストとフォーマットについては、[プレゼンテーション編集](presentation-editing.md)を参照してください。
## 保存する前に画像サービスをテストする {/* #test-service */}

v1.3.1では、必要なフィールドとモデルが満たされた後、画像サービスフォームが**Test generation**を提供します。 確認書: リクエストに対して1つのイメージを生成し、プロバイダが請求する場合があります。 渡されたテストは、その正確な設定に適用されます。 モデル、エンドポイント、またはクレデンシャルを変更するには、新しいテストが必要です。 テストを実行せずに設定を保存することもできます。

新規サービスの保存後、画像生成モデルが既に選択されていない場合にのみ、最初のモデルがデフォルトになります。 最初にリクエストをする前に選択するかどうかを調べます。 Mainは別途設定されます。

![保存する前に画像サービスをテストする](/img/open-science/v1.3.1/image-service-test.webp)
