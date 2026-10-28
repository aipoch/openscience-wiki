---
title: "ファイル、アーティファクト、バージョン"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# ファイル、アーティファクト、バージョン {/* #files-artifacts-and-versions */}

元のファイルを保存し、アップロードされたコピーと生成されたアーティファクトを区別します。 このページでは、所有権、ファイルおよび保存されたリビジョンをカバーしています。 [プレビュー](previews.md) を参照して、エクスポートバンドルのコントロールと [セッション](sessions.md) を表示できます。

<PlatformGuide />

## 入力を添付するか、フォルダを参照する {/* #attach-an-input-or-reference-a-folder */}

**Composer → + → Attach files** を使用して、`GSE60450_Lactation-GenewiseCounts.txt` を選択し、添付チップを待ち、送信する前にそれをプレビューします。 表示名は認識可能です。 管理された入力パスには、チェックサムサフィックスを含めることができます。 チップの削除は、ディスク上の元のファイルではなく、ドラフトにその包含を解除します。 **Your files** は、再度アップロードするのではなく、既存のプロジェクトファイルを選択します。

複数の入力がディスクに残っている場合、フォルダ参照が便利です。 **Files → Filter project files → This computer → Add folder…**では、特定のサブフォルダに移動し、**Read-only**または**Read & write**を選択します。 **Grant this folder** の前のカーネル停止の確認を見直します。 Notebookファイルアクセスの変更は、アクティブなカーネルを停止するので、その権限は再作成できます。 提案された助成金が不適用されないままキャンセルします。 [プロジェクト](projects.md) では、フォルダの選択と権限が詳細です。

| ローカルファイル制御 | アクションと結果の状態 |
| --- | --- |
| ディレクトリパス | 許可されたディレクトリを入力し、それをナビゲートします |
| 親ディレクトリに移動 | ブラウザのアクセスルール内の1つのディレクトリを移動 |
| 移動 | 保存場所を選択してください |
| ディレクトリを更新する | ディレクトリリストのリロード |
| このフォルダーを固定 | 位置のショートカットを追加/削除します。 削除してもフォルダを削除しない |
| ファイル行 | プレビュー内のファイルを開きます |
| ファイルをリロードする | 変更後の外部ファイルを再読み込み |
| より多くのアクション → コピーパス | 外部ファイルパスをコピーする |
| より多くのアクション → 人工物として保存 | 管理されたプロジェクトコピーを保存します。 保存される待ち時間 |
| ダウンロード | プラットフォームの保存フローで外部のコピーを保存 |

読み取り専用の助成金は、プロジェクトワークスペース内の出力を許可しながら、外部ディレクトリを保護します。 上記のローカルファイルコントロールを使用して、ソースを更新し、管理されたコピーを保存します。

<PlatformContent platform="windows">

既存のフォルダーについては、**Files** を開き、**Artifacts** ドロップダウンを選択し、**This computer → Add folder…** を選択します。 アプリの**Grant folder access**ダイアログで、特定のサブフォルダと**Read-only**を選択し、**Grant this folder**を選択します。 ユーザプロファイルのルートは利用できません。 代わりに研究サブフォルダを選択します。 Notebook-kernelの影響の確認を読んで下さい。 ファイルに戻り、選択したフォルダとそのファイルを確認します。

<Screenshot src="/img/open-science/windows/granted-folder-files.webp" alt="公開スクリプトとCSVを提示するWindowsフォルダを付与" width={1920} height={1017} windowBounds={[1157, 0, 763, 237]} href="/docs/img/open-science/windows/granted-folder-files.webp" linkLabel="完全なWindowsスクリーンショットを開く" />

Windows **Attach files** ダイアログでは、中国語の文字やスペースを含むパスからファイルを選択し、**File name** フィールドにフルパスを入力し、開きます。 アプリに戻り、添付ファイル名を確認し、テーブルの寸法と内容をプレビューします。 選択を放棄するには、**Cancel**を選択し、新しい添付ファイルが下書きに追加されていないことを確認してください。

</PlatformContent>

## 入力と生成された結果を見つける {/* #find-inputs-and-generated-results */}

1. **Files** を開き、**Filter project files → All artifacts** を選択します。
2. **Your uploads**をセッションでグループ化した**Generated files**と別々に読みます。
3. ビジュアルカードの名称やサイズ、または**Grid view**の**List view**を選択します。
4. `rnaseq`などの**Search project files**にファイル名のフラグメントを入力します。 マッチング名とセッションの所有を確認します。
5. そのフィルタで除外されたファイルを表示する検索をクリアします。
6. **Expand files**はより大きい図書館を開けます; **Exit full screen files**はワークスペースに戻ります。

<PlatformContent platform="macos">

![実際の RNA-seq 結果をファイルライブラリでフィルタリング](/img/open-science/guides-walkthrough/56-files-search.webp)

</PlatformContent>
カウントは現在のフィルターを記述します。 マッチなしの検索はファイルを削除します。 **No more**は、グループがロードを終わらせていることを意味します。 見出しでグループを崩壊させます。 ファイルボディのプレビューアクションをモーダル、**セッションの横にある分割ビューで...** で使用して、横に会話を保持します。 その表面で選択したファイル/バージョン上の機能をダウンロードします。

### ローカルフォルダに戻り、読み取りコピーを保存します {/* #return-to-a-local-folder-and-save-a-reading-copy */}

1. **Files → Filter project files → This computer** を開き、**Directory path** で許可されたソースディレクトリを入力します。
2. **Pin this folder** を選択します。 別の場所に移動し、**Go to → Pinned**を戻します。 **Remove bookmark**、またはピン留めされた行の**Unpin**は、ショートカットのみを削除します。
3. **Refresh directory** を選択して、新たに追加したファイル名が表示されます。 既に開いているファイルについては、**Reload file** を使用して、その内容を再度読みます。
4. ローカルプレビューでは、**More actions → Save as artifact** を選択し、**Saved** を待ちます。
5. **All artifacts → Your uploads**に戻り、保存したコピーを再開します。 管理されたバージョン管理とヘッダ内のローカルソースパスはありません。

管理されたコピーを再開し、ローカルソースとコンテンツを比較します。 保存したコピーを自動的に更新しません。 管理されたコンテンツを編集するときに、以下のバージョン conflict の手順を使用します。

## レポートの編集とバージョンの比較 {/* #edit-a-report-and-compare-versions */}

<p className="example-label"><strong>実践例</strong> 読書メモを追加し、レポートのリビジョンを比較する</p>

サポートされている管理されたテキストまたはMarkdownファイルを開きます。 以下の例では、既存のレポートに読み取りメモを追加します。 元の入力を変更したり、分析を再実行することなく、新しいリビジョンを作成します。

1. 管理されたMarkdownファイルを開き、**編集 rnaseq-qc-report.md**を選択します。
2. ソースフィールドを編集します。 既存の方法および証明されたテキストを保って下さい。
3. **Save changes** を選択します。 **v1の** から **v2の** へヘッダーが進みます。
4. **ソースバージョンで比較...** を選択します。 差分ビューにテキストが追加されました。
5. **比較を停止する** を使用して、レンダリングされたレポートに戻ります。
6. **Previous file version** を選択して v1 を調べて、**Next file version** を v2 に戻します。

<PlatformContent platform="macos">

![オリジナルのバージョンと比較してv2をレポートする](/img/open-science/guides-walkthrough/55-report-version-diff.webp)

</PlatformContent>
| 制御/状態の編集 | 何をすべきか |
| --- | --- |
| 無効な変更を保存 | 有効な変更をして下さい; 変更されていないテキストは保存することができません |
| キャンセル | 現在の編集草案を破棄 |
| バージョン 矢印 無効 | その方向に古い/新しいバージョンが存在しません |
| 障害者の比較 | サポートされているソースバージョンの比較は使用できません。 |
| 紛争の保存 | 現在のバージョンをリロードし、変更を調整します。 別の作家を上書きするあなたの草案は仮定しません |
| absent の編集 | このファイルタイプまたはソースは、そのビューアで編集できません。 バイナリファイルやCSVテーブルがスプレッドシートエディタになるには期待しないでください。 |

管理されたテキスト/コードとMarkdownファイルが編集を公開することができます。 CSV は、読み取り専用テーブルのままにしました。 画像やその他のバイナリフォーマットは、この機能を使用してテキスト編集を取得しません。 マニュアル編集はファイルリビジョンを作成します。 Notebook を再実行したり、モデルレビューを作成したりしません。 バージョンの生産履歴を引用する前に、[Notebook 証拠](notebook.md)を参照してください。

### いずれかの編集を失うことなく、保存の競合を解決する {/* #resolve-a-save-conflict-without-losing-either-edit */}

別のライターがエディタが開いたままにレポートを保存している場合は、**Save changes**は**このファイルには新しいバージョンがあります。 最新バージョンを表示**を返すことができます。 ドラフトは、新しいバージョンに置き換えられていません。

1. ビューを変更する前に、保存されていないテキストを保存します。
2. **View latest version** を選択します。 **Discard unsaved changes?**が現れた場合、必要な変更が残っているまでキャンセルします。
3. 最新の保存レポートを開き、他の作家の追加を調べます。
4. **Edit**を選択し、その最新のテキストを変更して保存します。
5. 結果を再開し、バージョンの矢印を使用して以前のリビジョンを検査します。

<PlatformContent platform="macos">

![別のバージョンが存在するためブロックされた保存](/img/open-science/local-todo-batch/37-file-save-conflict.webp)

</PlatformContent>
保存後、最新のリビジョンには、他のライターの変更と保持ドラフトの両方が含まれていることを確認してください。 以前のファイルリビジョンは、バージョンコントロールを介して使用可能に残ります。 これらは、会話メッセージのリビジョンとは別です。

キャプチャした結果を再実行し、出力を比較するには、[再現性](reproducibility.md) を使用します。 会話ブランチ、ファイル、証拠のポータブルコピーには、[.scienceの研究のパッケージ](research-packages.md) を使用します。

## 研究記録を失わない輸出 {/* #export-without-losing-the-research-record */}

ファイルの **Download** を使用して 1 つの結果を保存します。 セッション**Download all artifacts**は、選択したファイルをフォルダに保存します。 **Download artifacts…** は、`generated` と `uploads` パスを分離して ZIP を作成します。 選択制御をexpose両方。 確認する前にスコープ、ファイル名、宛先を読みます。 会話**Export**は、研究ファイルのダウンロードとは異なる、トランスクリプト操作です。 [セッション](sessions.md) は、練習された選択と再オープンされたダウンロードの参照. ダウンロードしたコピーは、完全なライブアプリケーションの状態、認証情報、または外部入力を運ぶことはありません。

元のカウント行列、CSV、図とメソッドは再利用のために一緒に報告します。 [データワークフロー](../workflows/data-quality.md)は、テストされたファイルと正確な受け入れ値を提供します。 ダウンロードが失敗した場合は、目的地の許可とディスク空き容量を確認し、再試行します。 部分的な外部ファイルが保存された管理されたバージョンを変更しません。

### ダウンロードしたレポートを開く {/* #open-a-downloaded-report */}

レポートバージョンを選択し、**Download**を選択します。 テキストエディタで保存した`.md`ファイルを開き、見出し、段落、データを確認します。 フォーマットされたレポートのアプリプレビューに戻ります。

<PlatformContent platform="windows">

ダウンロードした `.md` ファイルをメモ帳で開きます。 Notepad は Markdown ソースを表示します。 `##` や backticks などのメーカは文字を書式化しています。 見出し、段落、テーブルの内容を確認できます。 アプリのプレビューに戻ると、フォーマットされたレポートが読み込まれます。

</PlatformContent>

### コピーやエクスポートで選択したファイルを保存する {/* #preserve-the-selected-file-through-copies-and-exports */}

管理された参照でメッセージをコピーするときは、意図した会話に貼り付け、送信する前に、各結果の添付ファイル/参照を調べます。 読みやすいファイル名は十分ではありません。参照を開き、現在の所有者とバージョンを確認します。

選択したアーティファクトやバンドルをエクスポートする前に、完全な選択を確認し、結果が待って、ダウンロードしたファイルを再開します。 編集、更新、またはエクスポートが失敗した場合は、実際の保存結果を確認しながら、ドラフトとソースバージョンを保存します。 更新が失敗した場合は、前回の保存が失敗したことが確立されません。

実装参照: [コピーされた参照](https://github.com/aipoch/open-science/commit/f0c0e081)、[完全な輸出選択](https://github.com/aipoch/open-science/commit/f0468f35)、[プレビュー編集](https://github.com/aipoch/open-science/commit/8763f9aa)。 添付ファイルが**管理されたファイルまたはセッションが削除される**を報告した場合、アプリを介して意図した現在の入力を再添付し、その所有権を検査します。 [トラブルシューティング](troubleshooting.md) を参照してください。

ソース: [プロジェクトファイルライブラリ](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ProjectFilesView.tsx)、[ローカルファイルアクション](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/LocalFileHeaderActions.tsx)。

## 許可済みローカルファイルを成果物として保存する {/* #import-local-artifact */}

**This computer** の許可済みフォルダーからファイルを開き、プレビューの **… → Save as artifact** を選びます。完了後、会話の成果物を開いて内容を確認してください。Open-Science は変更不能な管理コピーを保持します。元ファイルを後で編集しても、このコピーは変わりません。プレビューするだけでは取り込まれません。
