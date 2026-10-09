---
title: "Notebookと実行証拠"
last_update:
  date: '2026-10-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';


# Notebookと実行証拠 {/* #notebook-and-execution-evidence */}

Notebook を使用して実行されたコードを検査し、現在のカーネルでコマンドを実行し、バックグラウンドワークを実行します。 保存されたファイルの場合、**Provenance** を開き、そのファイルバージョンに関連する実行と証拠を調べます。

PythonまたはR、[互換性のあるランタイムを有効にします。](runtimes.md)を実行する前に。 完全なデータ解析例では、[パブリックデータワークフロー](../workflows/data-quality.md) を使用します。

<span id="open-the-session-notebook" />
<span id="open-the-producing-sessions-notebook" />
<span id="produce-an-artifact" />

<PlatformGuide />

## セッションNotebookを開く {/* #open-a-session-notebook */}

1. 検査したい計算を含むプロジェクトと会話を開きます。 新規に開始する場合は、まず**セッションNotebook**で小さい計算を実行するエージェントに問い合わせてください。
2. **Open notebook** を選択するか、会話メニュー **View notebook** を使用します。
3. ファイルのプレビューが有効になっているときに **Notebook** タブを選択します。
4. **Agent** を使用して、実行所有者を選択し、**Python / R / バッシュ** で言語を選択します。
5. 数値化された実行を開き、出力と完了状態を読みます。 **code shown** にラベル付けされたコピーされたアクティビティには、表示されたコードが含まれています。 実行記録のオリジナル制作セッションを検査します。

<PlatformContent platform="macos">

![Python実行とNotebookで出力](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>

| コントロール | アクション | 結果 |
| --- | --- | --- |
| エージェント | Main または子のエージェントを選択します。 | 所有者の記録を表示。 エージェントは別のカーネルを持つことができます |
| 言語 | 利用可能な言語を選択 | レコードとコンソールの変更 Runtimes に不足している言語をインストール |
| 数値実行 | 記録された実行を選択 | コード、出力、ステータスを開く |
| クリップボードにコピー | 選択したコードをコピーする | 外部のパスと依存関係を書面で保持する |
| 出力を隠して下さい/出力を表示して下さい | 崩壊または出力の拡大 | コードを再実行せずにビューを変更 |
| このカーネルでコードを実行する... | コードの入力と送信 | 選択したライブカーネルで実行する |
| クローズ/崩壊プレビュー | 会話に戻る | 記録された実行履歴を保持する |

**入力データ/入力** を現時点で確認します。 表示されたファイルとバージョンをリクエストにマッチさせます。 参照が利用できなくなった場合、再試行する前に、アプリケーションを通じて意図した入力を再オープンまたは添付してください。

## 実行前にコードを確認する {/* #execution-review */}

v0.36.0から、ディスパッチ前にエージェントがNotebookコードをチェックアウトします。 通常の読み込みと分析をサポートし、追加のリスクプロンプトなしで進みます。 不可逆な変化を生むことができる操作、または完全に分析できない操作、一回限りの決定が必要です。 マニュアルコンソールに直接入力されたコードは、このエージェントの承認ステップではカバーされていません。 提出する前に自分で検査してください。

1. **Review risky code**が表示された場合は、環境と操作が要求されていることを確認してください。 あなたの決定を待っています。
2. **Line**は、完全なコード内の場所を調べるのではなく、選択します。 解析が解決できない操作を含むパス、影響を受けたファイル、コマンドをチェックします。
3. アクションが不要な場合や、そのターゲットが間違っている場合は、それを拒否し、より安全なリビジョンのためにエージェントに依頼してください。 表示された操作をしようとすると、一度だけ承認します。 将来のリスクコードの永続許可を要求しません。
4. 決定後、記録された決定とNotebook実行状態を調べます。 承認だけでは完了の証拠ではありません。 リクエストが拒否された場合には、そのコードは実行されません。

<p className="example-label"><strong>実践例</strong> 外部のPythonプロセス要求を点検して下さい</p>

計算は数値のみ追加されますが、`subprocess.run` を介して別のインタープリタを開始します。 ネストされた実行は完全にチェックできませんので、リクエストはレビューを一時停止します。 通知は、コードが悪意あるという意味ではありません。 この例では、**Deny** を選択します。 その後、実行は、子プロセスを実行せずに中断として記録されます。

![環境、ソース ラインが付いている Notebook の見直しカードは、一度および Deny を許可します](/img/open-science/v0360/notebook-risk-review.webp)

この画面では、実行リスクが確認されます。 統計方法や結果が検証されていない。 **Auto-review** と [レビュアー](../specialists/reviewer.md) は、別途完了した作業を評価します。 v0.36.0 は Python/R の依存の捕獲を改善します; 結果の実際の入力と出力を確認するには、[Provenanceと再実行検証](reproducibility.md) を使用します。

## ライブカーネルでの作業 {/* #work-in-the-live-kernel */}

### ライブカーネルでチェックを実行 {/* #run-a-check-yourself-in-the-live-kernel */}

**Python** を選択し、**このカーネルでコードを実行する...** をクリックし、次の自動保持コマンドを入力します。 以前の会話からデータセット、サードパーティパッケージ、または変数を必要としません。

```python
import sys
print("Python:", sys.version.split()[0])
print("Executable:", sys.executable)
```

**エントリー** を押して実行します。 **Shift+Enterキー** を新しい行に使用します。 **エスケープ** で公開されたオートコンプリートメニューを提出する前に解凍します。 数値化された **python・あなた** エントリーと、その出力のインタープリター情報を確認します。 実行可能は、選択したランタイムに所属する必要があります。

R の場合、**R** を選択し、送信してください。

```r
cat(R.version.string, "\n")
cat("R home:", R.home(), "\n")
```

録画したRエントリーとその出力を調べます。 PythonとRは別々の変数を持っています。 `NameError` または `object not found` は通常、名前付きオブジェクトがそのカーネルで作成されていないことを意味します。 別のセッションからコマンドを再利用する前に、コードを調べます。

通訳者のチェックや保存結果については、[PythonとRのランタイム](runtimes.md) を開き、ページの上部にある **Windows** を選択します。

<span id="variables-dependency-state-and-network-boundaries" />

### ライブ変数を調べる {/* #inspect-live-variables */}

1. 変数を作成する実行後に **Inspect variables** を選択します。
2. **Name**、**Type**、**Size / Shape**および**Preview**を読んで下さい。
3. **Filter variables** で自分のコードから名前を入力してください。 スクリーンショットの例では、`sha` はリストされたハッシュ変数をフィルタリングします。 自分のカーネルに存在する名前を選択します。
4. **Refresh variables** を使用して、現在の名前空間を読み込み、必要な名前が隠されている場合は **Show private variables** を使用します。
5. **Close** を選択して Notebook に戻ります。

<PlatformContent platform="macos">

![変数リストを名前でフィルタリングする](/img/open-science/guides-walkthrough/47-notebook-variable-filter.webp)

</PlatformContent>

プレビューは値を省略できます。 必要なフィールドをコンソールで印刷して、それを完全に検査します。 **Variable tracking is limited** は依存グラフが不完全であることを意味します。 追跡された結果のために、**ステープル** は依存性が変更されたことを示します; **unknown**は関係が確立できないことを意味します。 影響を受けたコードを再実行して、古い結果を使用する。

### カーネル変更後続行 {/* #continue-after-a-kernel-change */}

ランタイムの変更または再構築は、カーネルを停止することができます。 保存されたファイルと実行レコードは、メモリ内の変数とは異なるままです。 変更後、インタプリタチェックを上に移動し、必要な変数を再作成し、必要な保存したファイルを再実行します。

[ランタイム](runtimes.md#maintain-and-repair-environments) を使用して、セットアップのキャンセルと再インストールを行います。 ランタイム再構築、通常のカーネルの再起動とバックグラウンドジョブの回復は異なる操作です。 同じ状態を復元するのではなく、関連する操作のステータスを確認してください。

## Rで同じ遺伝子カウントチェックを実行 {/* #run-the-same-gene-count-check-in-r */}

<p className="example-label"><strong>実践例</strong> RでGSE60450遺伝子カウントをチェック</p>

1. [Rのインストールと有効化](runtimes.md#install-app-managed-r).
2. [元のマトリックス](../reference/example-data.md) を添付します。 Python の結果を比較する場合、CSV を同じ会話に添付してください。
3. **Session Notebook → R** の実行と、[データ品質ワークフロー](../workflows/data-quality.md) の入力/出力要件を要求します。 完全な識別子と別々の出力ファイルの保存を指定します。
4. **Change notebook runtime?**が現れた場合は、**言語: R**と意図した通訳者を確認してください。 その後の**Run R code?**リクエストで環境をチェックしてください。
5. **Notebook → R** を開き、実行レコードを読み、保存した CSV の図とレポートを開きます。

<PlatformContent platform="macos">

![R サンプルQCは適用で開けました](/img/open-science/guides-walkthrough/76-r-qc-table.webp)

</PlatformContent>

[共有ベースライン](../reference/example-data.md#sample-qc-baseline) を使用して全サンプル識別子でメトリックを比較します。 メトリックがゼロカウントを含んだり、除外したりする元のソースとレコードを保持します。 Raw-count QCは、別々に設計された統計分析のためにデータを準備します。

### R 結果とその証拠を一緒に保持する {/* #keep-the-r-result-and-its-evidence-together */}

CSV の **Provenance → Execution Log → Download notebook** を保存しました。 入力と結果とともにエクスポートを維持します。 1つのファイルバージョンのエクスポートは、後でマニュアルコンソールコマンドを省略できます。

<PlatformContent platform="macos">

![R 結果のキャプチャ環境](/img/open-science/guides-walkthrough/77-r-environment-evidence.webp)

</PlatformContent>

Runtimesのパッケージの目録は取付けられた環境を記述します; Provenance は、特定のファイルのために捕獲された環境の証拠を記述します。 **partial** またはキャッシュインベントリ通知を読んで、同じリストのようにパッケージのカウントを比較するのではなく、読みます。

## 背景タスクと結果配信 {/* #background-tasks-and-result-delivery */}

Python、R、永続的なREPL、またはシェルのタスクが他の場所で動作しているときに、バックグラウンドの実行を依頼してください。 要求の入力、出力および停止条件を含んで下さい。

1. 入学後、会話の**Background tasks**エントリーを開きます。 ローカルランとリモートコンピューティングジョブをグループ化します。 タスクのない会話は表示されません。
2. タスクのアイデンティティ、環境、ステータス、経過時間を読みます。
3. **Open** を選択して、対応する Notebook の実行または Compute ジョブを検査します。
4. タスクを停止するには、**Cancel** コントロールを選択し、ステータスが解決するのを待ちます。 保存したファイルを使用したり、捨てたりする前に、保存したファイルをチェックしてください。
5. 完了後、送信された結果メッセージを確認し、保存した出力を開きます。
6. 中断またはアプリの再起動後、別のコピーを提出する前に、既存のタスクと任意の回復メッセージを調べます。

<PlatformContent platform="macos">

![背景タスクの状態とオープンコントロール](/img/open-science/v0.27.0/13-background-task-completed.webp)

</PlatformContent>

| 状態 | 確認する |
| --- | --- |
| キューイング/ランニング | 環境・環境の選定 シェルジョブは実行スロットを待ちます |
| キャンセル・キャンセル | キャンセルがまだ処理されるか、または解決するかどうか |
| 完了 | 終了結果と保存された出力ファイル |
| 失敗 / タイムアウト / 中断 | 最初のエラー、保存された出力と提供された回復アクション |
| 結果を読み取れません | 既存の仕事の記録および回復細部 |

タスクリストを閉じると、タスクが実行されます。 結果メッセージの計算と配信完了は別段です。 リモートジョブは、[遠隔計算](remote-compute.md) のホストとスケジューラ条件も必要です。

<span id="open-provenance" />
<span id="execution-log" />
<span id="messages" />
<span id="environment" />
<span id="review" />

## 保存したバージョンの証拠を調べる {/* #inspect-one-saved-versions-evidence */}

保存したファイルを開き、拡大されたプレビューで **File actions → Provenance** または **Provenanceを開く** を選択します。 選択したファイルバージョンを最初に確認します。

<PlatformContent platform="macos">

![保存された結果のために収集されたプロデューサーコード](/img/open-science/provenance-code.webp)

</PlatformContent>

| タブまたは制御 | 検査に使用する |
| --- | --- |
| コード | キャプチャされたプロデューサーコード、入力参照、コピー/ダウンロード、およびスクリプトの生成 |
| 実行ログ | 選択したバージョンの実行レコードが凍結する |
| メッセージ | 結果に関連する要求と決定をキャプチャ |
| 環境 | 通訳者、パッケージ情報、キャプチャ状況; 詳しくはこちら [修復条件](runtimes.md#conditional-restore). |
| 再現性 | キャプチャされた入力、再実行チェック、出力比較、検証レコード。 |
| 総説 | この正確なファイルバージョンに関連するレビュー |
| 前 / 次のアーティファクトバージョン | 別の保存バージョンの証拠; 何も存在していないとき、利用不可 |
| 来歴を閉じる | プレビューに戻る |

| ラベル: | 意味と次のアクション |
| --- | --- |
| バウンディング | 保持された証拠は限られた規模をカバーします。 エクスポートされたコードと結果でスコープを保持します。 |
| 部分的な | 一部の環境情報は欠落または未確認です。 外部の再利用前に必要な依存関係を記録します。 |
| このバージョンのレビューはありません | このファイルバージョンでは、関連するレビューはありません。 利用条件 [レビュアー](../specialists/reviewer.md) 会話とアーティファクトレビューを理解します。 |
| キャッシュされた環境 | 在庫を再利用しました。 環境が変化する際の実際の通訳/パッケージを確認してください。 |

レポートを編集すると、別のファイルバージョンが作成されます。 別のCSVを生成した計算は再実行しません。 [ファイルとバージョン](files.md) を参照してください。

レビューを調べるには、必要なバージョンで**Review**を選択し、そのチェックを拡大し、引用されたアクティビティを調べるために**Go to transcript**を使用します。 **No issues found**は、それらのチェックとそのバージョンに適用されます。 行方不明の実行や環境の証拠を埋めません。 審査が中断された場合、**Review error** エントリーを開き、**Re-run review** を選択します。 完了後、ファイルの**Review**タブに戻り、新しい結果を確認します。 以前の失敗した試みは、会話で表示され続けることができます。

## 再現性 {/* #reproducibility */}

キャプチャした結果を再実行するには、出力を比較し、検証レコードを保存し、[再現性ガイド](reproducibility.md)に従ってください。 この章では、Notebookの実行、実証済みの検査とコードのエクスポートについて説明します。

## コードのエクスポートと再利用 {/* #export-and-reuse-code */}

目標に合ったエクスポートを選択します。

| ゴール | エントリーフォーム | コンテンツ |
| --- | --- | --- |
| 記録されたプロデューサーコードを読み込む | **Code → Captured producer block → Download** | 元のパスと依存関係を持つキャプチャされたソース |
| 記録されたNotebookの細胞を保って下さい | **Execution Log → Download notebook** | 選択した結果/バージョンのNotebookエクスポート |
| ポータブルスクリプトを用意する | **Code → Generate script** | 検査・試験のモデル生成再構築 |

<PlatformContent platform="windows">

### WindowsでキャプチャされたPythonコードをダウンロード {/* #download-captured-python-code-on-windows */}

1. 保存されたレポートの意図したバージョンを開き、**Provenance → Code**.
2. **Captured producer block** では、**Download** を選択します。 保存ダイアログの`.py`ファイル名と宛先を確認し、**Save**を選択します。
3. 保存したファイルを開き、表示されたコードと比較します。 PowerShell では、同じ Python インタープリターで実行します。 引用された実行可能なパスの前に `&` 呼び出し演算子を使用します。
4. Notebookと保存されたレポートで出力を比較します。 コードと一緒に必要な入力ファイルを保存してください。

<Screenshot src="/img/open-science/windows/captured-code-download.webp" alt="Windowsは、プロデューサーのコードとダウンロード制御をキャプチャ" width={1920} height={1017} windowBounds={[1157, 0, 763, 416]} href="/docs/img/open-science/windows/captured-code-download.webp" linkLabel="完全なWindowsスクリーンショットを開く" />

記録されたコードをダウンロードします。 **Generate script**は別々の再建操作です。 生成が失敗した場合は、完全なエラーを保ちましょう。 キャプチャされたコードをダウンロードしても、再構築が成功するわけではありません。

</PlatformContent>

### スタンドアローンスクリプトを生成する {/* #generate-a-standalone-script */}

1. 意図したバージョンの**Provenance → Code**を開きます。 **Inputs** と **Execution Log** をチェックします。
2. **Settings → Model → Main model** で互換性のあるデフォルトモデルを選択します。 この補助機能は、会話のモデル選択と異なることができるポリシーを使用します。
3. **Generate script** を選択し、**Generating…** を終了するのを待ちます。
4. **LLM-generated再建** ラベルを読んで下さい。 **Download script**を選択する前に、入力パス、依存関係、出力場所をチェックします。
5. システム保存ダイアログで、別のディレクトリを選択し、`.py`ファイル名を確認し、**Save**を確認します。 保存したファイルを開き、表示されたコードが含まれていることを確認します。
6. スクリプトによって期待される正確なファイル名を使用して入力を供給し、その依存関係を準備し、アプリの外で実行します。 出力フィールドと入力チェックサムを保存した結果と比較します。 完了したダウンロードのみが計算を検証しません。

<PlatformContent platform="macos">

![生成されたスクリプトのプレビューとダウンロード制御](/img/open-science/priority-completion/19-generated-script.webp)

</PlatformContent>

<p className="example-label"><strong>実践例</strong> エクスポートされたRNA-seqチェックをアプリ外で実行する</p>

実行可能なダウンロード例では、<a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.py" download>スクリプト</a>、<a href="/docs/examples/gse60450/portable-script/remote-rnaseq-qc-f1e10edbdf01-f1e10edbdf01.csv" download>入力 CSV</a>、<a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.json" download>想定されるJSON</a>を1つのフォルダに保存します。 そのフォルダで、`python3 GSE60450-portable-check.py`を実行します。 スクリプトは、Python の標準ライブラリを使用します。 ダウンロードした JSON を `expected.json` に名前を変更して実行する前に: スクリプトは `GSE60450-portable-check.json` を書きます。 スクリプトを新しいデータに適応させる前に、生成されたファイルと`expected.json`を比較します。

### スクリプト生成が利用できなくなったときにコードをダウンロード {/* #download-code-when-script-generation-is-unavailable */}

アプリケーションが **Codexサブスクリプション認証でアーティファクトコード再構築が利用できなくなります。** を返す場合は、この補助操作のための互換性のあるプロバイダを使用して、またはキャプチャされたプロデューサーコードをダウンロードします。 このエラーは、通常のCodex Notebook実行ではなく、スクリプトの再構築を懸念します。

**再構成_UNAVAILABLE** では、欠落した入力や実行中の証拠を検査します。 キャプチャされたコードのダウンロードは、利用可能なコードを保存します。 決して捕獲されていないステップを回復することはできません。

### 録画したNotebookのエクスポートと再利用 {/* #export-and-reuse-the-recorded-notebook */}

**Provenance → Execution Log → Download notebook**を選択し、場所を選択し、保存します。 エクスポートを開き、その言語、セル、出力を確認します。

外部再実行の前に、入力ファイル、記録された依存関係、書き込み可能な出力ディレクトリを用意します。 アプリケーション管理されたパスを作業コピーにのみ置換し、元のエクスポートをそのまま保持します。 エクスポートは、資格情報または完全なアプリケーション環境を束ねることはありません。 [データ例](../reference/example-data.md) からエクスポート例が利用可能です。

<PlatformContent platform="windows">

Windows Notebookエクスポートが拡張子がない場合、まずコピーをテキストとして開き、`nbformat`、`cells`とNotebook JSONと予想されるコード/出力を含むことを確認します。 元の保存をしてから、作業コピーを`.ipynb`拡張子にします。 他のプログラムがファイルを開くかを変更する; コンテンツの変換や細胞の再生は行いません。

</PlatformContent>

## エラーと警告を解釈する {/* #interpret-errors-and-warnings */}

| シンプトム | 次のアクション |
| --- | --- |
| 変数の欠損 | 選択した言語/カーネルで定義するコードを再実行する |
| パッケージの欠損 | ランタイムのパッケージを点検し、フォローする。 [ランタイム](runtimes.md) |
| 入力バージョンは利用できません | 意図した現在の入力を開いたり、または付けて下さい; アプリケーションを通じてアイデンティティを解決する |
| PermissionError/アクセス拒否 | 要求されたファイルと許可スコープの特定 永続アクセス障害の報告 [トラブルシューティング](troubleshooting.md) |
| ネットワーク/インストーラエラー | フォローする [ネットワーク](network.md) 影響を受けるホスト名とフルエラーを使用する |
| 完走式で警告 | 警告がどのような影響かを読んで、再実行するかどうかを決定する前に保存された出力を点検して下さい |

問題を報告するときは、最初の失敗行、選択したランタイム、ファイルアイデンティティ、タスクの状態を保持します。 保存した出力を実際の生成にリンクします。
