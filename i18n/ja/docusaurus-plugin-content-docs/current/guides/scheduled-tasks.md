---
title: "研究タスクのスケジュール"
last_update:
  date: '2026-11-19'
---

# 研究タスクのスケジュール {/* #schedule-a-research-task */}

決まった時刻に行う作業をスケジュールできます。新しく追加した論文の確認、プロジェクトの変更点の要約、準備済みスクリプトの再実行などに使います。各実行の記録を開いて確認できます。スケジュールを作成したコンピューターで Open-Science を起動したままにしてください。

## 無人実行できるタスクを準備する {/* #prepare */}

まず、プロジェクト内で目的の操作を一度手動で完了してください。入力、モデル接続、実行環境、出力先、必要な権限を確認します。スケジュールは不足した認証情報や依存関係を自動で補いません。実行中は新たな人の確認を待たないため、対話が必要な操作で処理が止まることがあります。新しい会話で実行する場合は、**Settings → Model**で使用可能な**Main**モデルを選ぶか、プロジェクトの新規会話の既定値を設定します。サブスクリプションのインポートだけではモデルは選択されません。モデルを使うタスクは、選択したプロバイダーの利用枠を消費します。

## スケジュールを作成する {/* #create */}

1. プロジェクトを開き、**Schedule**に移動し、**New task**を選択します。 **Start from an example**は日々の実験要約や週単位の文献レビューのために原稿を記入することができます。
2. 認識可能な**Name**を入力してください。 **Action → Send a message**または**Run a script**を選択します。
3. **Instructions**でタスクを書いてください。 **How to run**では、**Continue an existing conversation**または**New conversation for each run**を選択します。 続行時に**Target conversation**を選択します。
4. スクリプトでは、既存の会話と**Language**: Python、R、Shellを選択します。 完全な**Script**を入力してください。 以前のカーネルから一時的な変数に依存しない。 必須入力を明示的にロードします。
5. **Repeat**を**Once**、**Fixed interval**、**Daily**または**Weekly**に設定します。 開始時間、間隔または平日を必要に応じて確認し、**Time zone**と**Next run**を確認します。
6. レビュー **Execution permissions**. タスクのニーズへのアクセスのみを使用します。 既存の会話は、その会話権限に従うことができます。スケジュールの許可設定は、資格情報や厳格なネットワークルールを迂回しません。
7. **Advanced**では、オプションでエンドタイムまたは最大実行回数を設定します。 スクリプトの場合、実行タイムアウトを確認します。 **Create**を選択し、保存されたタスクと次の実行を確認します。

<p className="example-label"><strong>例</strong> 毎週の文献要約を準備する</p>

**Send a message**を使用して、金曜日と独自のローカル時間を選択し、この指示を紙やノートを含むプロジェクトに適応させます。

```text
Review papers and reading notes added to this project in the last seven days.
For each paper, summarize its main finding and link to its source or project file.
Distinguish abstract-only records from papers whose full text is available.
If nothing was added, say so. Keep the digest in English.
```

このタスクは、プロジェクトの既存のマテリアルをレビューします。 新しく公開された論文を検索するには、明示的に検索を要求し、必要な[文献コネクター](../tools/databases.md)を最初に設定します。

## ワンタイム・ティーチング・サマリーを実行 {/* #worked-example */}

<p className="example-label"><strong>実践例</strong> 5つの値の要約を予約する</p>

**Send a message** を使用して、タスク **Teaching summary — one run** の名前をつけ、入力します。

```text
In English, state the mean and median of the hypothetical observations 2, 4, 6, 8, 10.
Explain in two sentences why these values alone do not support population inference.
Do not use tools or create files.
```

**New conversation for each run**、**Repeat → Once**、将来の時間を選択します。 **Existing permissions only**: このタスクはツールを必要としません。 **Create**を選択し、アプリの実行を続けます。

![指示、新しい会話のターゲットと次の実行によるワンタイムメッセージタスク](/img/open-science/v130/schedule-create.webp)

指定時刻になったらタスクを開き、**Results**を確認します。この例では平均値と中央値がいずれも**6**となり、5つの仮想的な値だけでは母集団について結論を出せないことが説明されました。**Open session**で会話を開けます。1回限りのタスクは**Completed**になります。再利用する前に結果の内容を確認してください。

![スケジュールされたメッセージと教育結果の完成](/img/open-science/v130/schedule-result.webp)

## 実行を調べてスケジュールを変更 {/* #run-history */}

タスクの実行履歴を開き、発生を選択します。 ステータス、目的地の会話、結果をチェックします。 **Run completed**は、その実行の完了を記録します。研究証拠として使用する前に、実際の回答やスクリプトの出力を調べます。 **Failed**、**Interrupted**、**Skipped**は、結果が生成されたと仮定しない、関連した理由を読んでいる必要があります。

**Pause**で今後の実行を一時停止し、準備ができたら**Resume**で再開します。時刻を変更したら、次回の実行予定を確認してください。**Close**はタスクを終了します。完了または終了したタスクが読み取り専用の場合は、新しいタスクを作成します。特にアプリの再接続や再起動後は、手動で作業を繰り返す前に実行履歴を確認してください。

実行レコードとランタイムの回復については、[Notebook](notebook.md)を参照してください。 アクセス境界については、[承認モード](approval-modes.md)と[ネットワークルール](network.md)を参照してください。
