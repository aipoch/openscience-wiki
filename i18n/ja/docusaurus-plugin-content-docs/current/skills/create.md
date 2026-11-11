---
title: "Skill とその対応ファイルを作成する"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Skill とその対応ファイルを作成する {/* #create-a-skill-and-its-supporting-files */}

[パブリック例入力](../reference/example-data.md) を使って再利用可能な方法に RNA-seq を繰り返します。 この方法は、生のカウントをチェックします。 差圧試験は行いません。

この例では、2つの独立したパッケージ名を使用します。

| 制作ルート | 保存されたSkill ID | 再使用 |
| --- | --- | --- |
| **Save as skill** 完全な会話から | `rnaseq-descriptive-qc` | 新しい会話で公開された Personal Skill を選択 |
| 下記のマニュアルパッケージ | `rnaseq-count-qc` | 手動で作成したSkillをその正確なIDで選択する |

公開、検索、再利用を通じて、いずれかのルートに従ってください。 実際に保存した名前を使用してください。 2つのIDはエイリアスではありません。 パッケージの名前を変更した場合は、次のリクエストで新しい保存された ID を使用します。

## 作成ルートを選択する {/* #choose-a-creation-route */}

| 開始ポイント | このエントリを使用する | 何が起こるか |
| --- | --- | --- |
| 完了した会話には、繰り返す価値のある手順が含まれています | 会話 **+ → Save as skill** | エージェントは、アクティブなブランチを蒸留し、カスタマイズ/Skillクリエイターを使用して再利用可能なパッケージを準備します。 |
| 対話的に新しいメソッドを記述したい | 設定 **Add skill → Chat with agent**, または **Customize** | エージェントと協力して、メソッドをドラフトし、出版物の前にそれを検査します。 |
| すでに指示とサポートファイルがあります | 設定 **Add skill → Write from scratch** | エディタを使用して直接パッケージを入力してください。 |
| パッケージやリポジトリが既にある | **スキルをアップロード / GitHubからインポート / インポートインストールスキル** | 既存のリソースを点検し、インポートします。 詳しくはこちら [Skills の管理](./manage.md). |

## スキルとして保存:完成した会話をメソッドに変える {/* #save-as-skill-turn-a-completed-conversation-into-a-method */}

繰り返し可能な手順が実際に機能した後にこれを使用してください。たとえば、生のRNA-seqカウント行列をチェックし、識別子を保存し、サンプルメトリックを計算し、出力を再開します。 **Save as skill**は、目標、ツール、手順、ユーザー修正を含む**アクティブな会話ブランチ**を使用します。 再使用可能な手順を抽出するためにエージェントを要求します。, トランスクリプトをコピーしません. ブランチが再利用するプロセスを解決しない場合は、エージェントはSkillを作成せずにそれを説明し、停止することができます。

1. 関連する会話を開き、保持する手順を含むブランチを選択します。
2. 現在の応答と任意のサブエージェントの作業を終了します。 優れた承認、中断されたターンまたはセッションエラーを解決します。 ブランチは、完了した Agent レスポンスで終わる必要があります。
3. 作曲家の**+ menu → Save as skill**を開きます。 特定の理由を読んで、無効な項目の上にカーソルを合わせます。
4. エージェントが動作している間、**Saving as skill…** にアイテムが変更されます。 これは、会話でモデルアシスト操作を開始します。 マニュアル名/説明エディタを開くか、ZIPを即座に保存しません。
5. 提案したSkillの名前を調べ、説明、手順をトリガーし、ファイルと検証結果をサポート。 示された場合の明確化か操作の承認に応答して下さい。 **Customize** は有効になっています。 アクティブな役割は、依然として適切な機能アクセスを持っている必要があります。
6. 出版を受け入れる前に草案を見直します。 学習固有のパス、一時的なID、資格情報、サポートされていない結論を削除します。 再使用可能な入力条件および点検を保って下さい。 既存の個人 Skill は、明示的な置換の決定なしに上書きされてはならない。
7. 出版後, 開く **Resource center → Skills**、報告された名前を捜し、点検して下さい **Files**、保存された SKILL.md および Main エージェントの可用性。 完全なパッケージを点検する必要がある場合それを輸出して下さい。
8. 保存したSkillで別の境界リクエストを実行します。 正常に保存されたパッケージは、2番目のデータセットまたは後々の呼び出しが渡されたという証拠ではありません。

### 研究方法の保存 {/* #save-the-research-method */}

<p className="example-label"><strong>実践例</strong> RNA-seqメソッドをSkillとして保存する</p>

GSE60450 QC を新しいセッションで完了した後、**+ → Save as skill** を選択し、既存のパッケージを予約する別の **rnaseq-記述-qc** パッケージを要求します。 ネイティブワークフローでは、**SKILL.md** を含むドラフトを作成しました。 バリデーションはエラーや警告を返しません。

![ネイティブSkillドラフトと検証結果](/img/open-science/v0.27.0/16-native-skill-draft-validated.webp)

個人的なSkillsに出版物を確認する前に、名前、トリガーの説明、入力、メトリック定義、および停止条件を確認してください。 それから使用して下さい **Resource center → Skills → Search skills**保存された指示を開け、点検して下さい **Availability** そして、 **Files**. . . . 実際の公開された<ExampleDownload path="/examples/capabilities/rnaseq-descriptive-qc/SKILL.md">SKILL.mdの特長</ExampleDownload>をダウンロードしてください。

![個人で見つけられたネイティブ出版物](/img/open-science/v0.27.0/17-native-skill-published.webp)

![再開の手順と可用性](/img/open-science/v0.27.0/18-native-skill-instructions.webp)

### ボタンが使えなくなった理由 {/* #why-the-button-is-unavailable */}

ツールチップは最初のブロック条件を識別します。 修正すると2番目の条件が表示されることがあります。 **現在のエージェントの活動が終了するまで待ちます。**は、セッションがエラー状態を含むアイドルでないときに表示できます。 一人で待つことは問題を解決するという信頼できる約束ではありません。 任意のエラーバナーと会話のやりとりを調べます。 中断された応答のために、アプリケーションが提供するアクションを使用してその応答を解決または再開し、メソッドを保存する前に完了を待ちます。

| 正確なツールチップ | 確認する |
| --- | --- |
| Skillとして保存する前に、会話を開きます。 | 必要な手順で既存の会話を開きます。 |
| カスタマイズ Skill アクティブに利用できません。 Specialist. . . . | 活動的な役割および機能アクセスを点検して下さい。 カスタマイズはグローバルに有効になっています。 このツールチップは、現在のSpecialistを懸念しています。 |
| 会話履歴を待って読み込みを完了します。 | 選択されたブランチの仕上げのローディングをして下さい。 |
| この会話をSkillとして保存する前に、サイドチャットを閉じます。 | まずは便利なアドバイスをご準備ください。 確認する [サイドチャットを閉じる](../guides/delegation.md) 保存された会話を止めて削除します。 それから Main に戻して下さい。 |
| すべてのサブエージェントが完了するまで待ちます。 | 優れた子供タスクとその承認を点検します。 |
| スキルが実行されているように保存します。 | 既存の作成の実行を読んで下さい; 別のスタートはしない。 |
| 先に現在のセッション操作を完了してください。 | 終わりの回復、終わりの文脈のreplay/reset、訂正のループまたは圧縮。 |
| 現在のエージェントの活動が終了するまで待ちます。 | アクティブな作業、保留中の相互作用、または非アイドル/エラーセッションを解決する。 実際のステータスを調べます。 |
| 会話ブランチ同期エラーを最初に解決します。 | 再試行する前に表示された同期エラーを解決します。 |
| 会話ブランチ履歴は利用できません。 | 目的のブランチを再開します。 履歴が読み込まれることができない場合、エラーを保存します。 |
| 完了したエージェントの応答を待ちます。 | ブランチは完了した応答で終了しなければなりません。 空のブランチや最終ユーザメッセージが不十分です。 |

回復と終了セッションの操作は、アクションをブロックすることができます。 新規作成リクエストを繰り返し起動する代わりに表示された理由を使用します。 サービス認証とは別々です。 作成が始まると、モデルリクエストが失敗した場合は、[トラブルシューティング](../guides/troubleshooting.md) で返されたモデル/サービスエラーに従います。

## スクラッチから書き込む:エディタで作成する {/* #write-from-scratch-create-in-the-editor */}

既にメソッドの指示とファイルをサポートする場合は、**Write from scratch** を使用します。 以下の手順では、`rnaseq-count-qc` を使用します。

### パッケージの準備 {/* #prepare-the-package */}

<p className="example-label"><strong>例</strong> rnaseq-count-qc パッケージを作成する</p>

実際の<ExampleDownload path="/examples/capabilities/rnaseq-count-qc/SKILL.md">SKILL.mdの特長</ExampleDownload>と<ExampleDownload path="/examples/capabilities/rnaseq-count-qc/references/sample-metric-schema.md">サンプルメトリック-schema.md</ExampleDownload>、または<ExampleDownload path="/examples/capabilities/rnaseq-count-qc.zip">輸出されたZIP</ExampleDownload>をダウンロードしてください。

```text
rnaseq-count-qc/
  SKILL.md
  references/
    sample-metric-schema.md
```

リファレンスは、サンプルメトリックとその解釈を定義します。 プロジェクト内のデータを保存します。 ポータブルパッケージにプライベートデータセットを埋め込むのではなく、再使用可能なルールにSkillを使用します。

<span id="create-and-publish" />

### フィールドを完了し、公開する {/* #complete-the-fields-and-publish */}

1. **Resource center → Skills → Add skill → Write from scratch** を開きます。
2. ダウンロードした SKILL.md を **Skill body** に貼り付けます。 YAML フロントマッターが**Name**と**Description**をポジュレートします。
3. お名前が `rnaseq-count-qc` であることを確認してください。 保存する前にレンダーされた/body コンテンツを読み込みます。 有効な名前だけは科学的な方法を検証しません。
4. **Advanced settings → Add reference files** を開き、`sample-metric-schema.md` を選択します。 エディタは、このリソースを`references/`の下に配置します。
5. 参照数とパッケージサイズを確認し、**Publish**を選択します。
6. 新しい個人行を検索し、それを再開します。 指示、可用性、ファイルを確認します。 パッケージをエクスポートして、両方のエントリを検査します。

![RNA-seq Skillボディおよび支持ファイル](/img/open-science/capabilities-walkthrough/01-skill-create.webp)

| フィールドまたはボタン | 入るか、または点検して下さい |
| --- | --- |
| 名前 | 認識可能なメソッド識別子。 空白の入力ショー **Name is required.** |
| 説明 | 方法が選択されるべきとき、それが属する分野だけでなく。 |
| 書き込み/アップロード | テキストを直接入力するか、本文のソースとしてファイルを選択します。 |
| スキル本文 | 完全な操作指示:入力、点検、出力および停止条件。 |
| 詳細設定 | 対応ファイル制御とパッケージ使用量を開きます。 |
| 参照ファイルを追加する | 再使用可能なスキーマ、例、スクリプトを追加します。 保存されたパッケージにボディで使用したパスを確実にします。 |
| 参照ファイル削除 | リソースのドラフトを解除します。 その後、体内の壊れた参照をチェックします。 |
| キャンセル / スキルを回復する | エディタを残す; ドラフトを破棄するためにキャンセルを使用してください。 |
| 公開/保存... | パーソナルパッケージを作成します。 完了を待ち、保存された行を確認します。 |

エディタは、**128のMB**パッケージの予算内で**16,383参照ファイル**まで可能です。 インポートはアーカイブの検証を渡す必要があります。 [Skills の管理](./manage.md) を参照してください。

## チェックできる指示を書く {/* #write-instructions-that-can-be-checked */}

たとえば、エージェントは、全遺伝子/サンプル識別子を保存し、`EntrezGeneID`と`Length`をカウントから分離し、誤字行や欠落値を拒否し、前後のハッシュ値を比較する必要があります。 4つのサンプルメトリックと別々の出力ファイルを指定します。 これらの要件は、不正確または不完全な結果が見えるようにします。

明確な停止条件を含んで下さい: ソースが読まれないか、または数が欠落しなければ、入力問題に報告して下さい。 再使用可能な方法は、サイレントにデータセットを変更したり、要求された分析を交換したりしないでください。

<span id="validate-the-saved-skill" />

## Skillの検証と再利用 {/* #verify-and-reuse-the-skill */}

`rnaseq-count-qc` のマニュアルのルートでは、[Skills](./overview.md) のプロンプトを使用します。 生成されたレポートとNotebookレコードを開き、入力、寸法、メトリック定義、および[データ例](../reference/example-data.md)に対する出力を確認します。

後で編集するには、パーソナルパッケージの**Actions → Edit**を開き、メソッドを変更し、保存し、新しいリクエストを発行します。 変更した出力を以前の結果と比較します。 パッケージの無効化または編集は、実行中の順番で既に読み込まれている指示を巻き戻しません。

エージェントアシストドラフトの場合は、**Add skill → Chat with agent** または **Customize** エントリーを使用してください。 提案した指示を調べて、公開されたパッケージを同じチェックで読み直します。 Skillを記述するチャット応答は保存されたパッケージ自体ではありません。

### 公開されたSkillを新しいセッションで再利用する {/* #reuse-the-published-skill-in-a-new-session */}

1. 新しいセッションを開始し、元の公開GSE60450カウントマトリクスを添付します。
2. **rnaseq-記述-qc** を名前で要求して下さい。 変更されていない入力、CSVと簡潔なレポートの4つのサンプルメトリックを尋ねます。
3. Notebook の実行を点検し、生成されたファイルの両方を開きます。 完了メッセージのみに依存するのではなく、元の入力に対して保存された結果を確認してください。

新しい CSV を再オープンし、[共有ベースライン](../reference/example-data.md) で全サンプル識別子によってそれらを報告し、比較して下さい。 入力ハッシュを確認します。 Skillを別の研究に適用するときは、これらのチェックをその研究の入力と実験的な設計に対して繰り返します。

![別の呼び出しと再オープンQC CSV](/img/open-science/v0.27.0/19-native-skill-reuse.webp)

実装参照: [スキルエディタ.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillEditor.tsx)、[host-skills-service.ts をホストする](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/skills/host-skills-service.ts)。

[ご利用条件](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/workspace/save-as-skill-availability.ts)、[会話の蒸留](https://github.com/aipoch/open-science/blob/v0.27.0/src/main/acp/interrupted-turn-continuation.ts)、[Skill クリエイター](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/skill-creator/SKILL.md)のスキル実装として保存します。
