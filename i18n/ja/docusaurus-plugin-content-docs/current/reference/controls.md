---
title: "制御およびキーボードの参照"
last_update:
  date: '2026-09-24'
---

# 制御およびキーボードの参照 {/* #controls-and-keyboard-reference */}

このインデックスを使用して、制御の正式な説明を見つけます。 フィールドの限界を保ち、全タスクのウォークスルーを繰り返すことなく一緒にショートカットを短くします。 ラベルは英語のインタフェースを参照します。

## タスクによる制御 {/* #controls-by-task */}

| 必要事項 | 記入項目か制御 | 詳細な行動 |
| --- | --- | --- |
| プロジェクトの作成または記述 | **New project**, プロジェクトメニュー → **Project settings** | [プロジェクトフィールド](../guides/projects.md) |
| 読書メモをプライベートに保つ | セレクション → **For me → Bookmark**、コンポーザー **Bookmarks** | [読書ブックマーク](../guides/bookmarks.md) |
| モデル接続の設定 | **Settings → Model** | [プロバイダーのセットアップ](../guides/providers.md) |
| ソースを添付し、リクエストを送信またはキューに入れる | コンポーザー **+**、付属品の破片、 **Send**、列制御 | [会話と送信待ちのリクエスト](../guides/composer.md) |
| 実行時間またはインストールされたパッケージを調べる | **Settings → Runtimes**、通訳者およびパッケージは制御します | [PythonとRのランタイム](../guides/runtimes.md) |
| 計算と変数を調べる | **View notebook**, **Variables**、アーティファクト **Provenance** | [Notebookと実行証拠](../guides/notebook.md) |
| 助成金または退会アクセス | 承認カード, **Settings → Permissions** | [許可と承認](../guides/approval-modes.md) |
| パッケージ接続を診断する | **Settings → Network** | [ドメイン、プロキシ、ミラー](../guides/network.md) |
| リモートコンピュートの設定 | **Settings → Compute → Add SSH host** | [SSHとSlurmのセットアップ](../guides/remote-compute.md) |
| 研究出力を確認します。 | 生成されたファイル カード, プレビュー, **Provenance** | [パブリックデータ解析](../workflows/data-quality.md) |
| 限界を見上げる | 形式または構成フィールド | [ファイル制限](formats.md), [設定](configuration.md), [パッケージのフォーマット](packages.md) |

[完全な制御索引](control-index.md)は、アプリケーションページで制御をリストします。 このページでは、一般的なタスクとキーボードショートカットをグループ化しています。 同じ詳細なチュートリアルへのリンク。

## キーボードの参照 {/* #keyboard-reference */}

| アクション | macOS | Windows/Linux | 条件と範囲 |
| --- | --- | --- | --- |
| アプリケーション検索 | `⌘K` | `Ctrl+K` | ホーム/ワークスペース検索; 設定で、ヘッダ検索をフォーカス |
| 設定 | `⌘,` | `Ctrl+,` | 現在のオーバーレイがショートカットを可能にするときに設定を開きます |
| 新しい会話 | `⌘N` | `Ctrl+N` | ワークスペース; メッセージで既存の会話を要求します。 ブロックダイアログが開いている間無視される |
| サイドバーをトグル | `⌘B` | `Ctrl+B` | ワークスペース; 狭い画面の引き出しやデスクトップのサイドバーを切り替える |
| 作曲テキストの送信 | `Enter` | `Enter` | 送信可能時。 オープンな言及ピッカーは、入力を所有しています。 IME の構成は提出しません |
| 新しいライン | `Shift+Enter` | `Shift+Enter` | コンポーザーテキスト |
| 前の/次のプロンプトの草案 | `↑` / `↓` | `↑` / `↓` | 最初と選択なしの注意で閲覧履歴を開始。 オープンな言及のピッカーは優先します |
| Undo ドラフト | `⌘Z` | `Ctrl+Z` | コンポーザードの履歴 |
| Redo ドラフト | `⌘Shift+Z` | `Ctrl+Shift+Z` | コンポーザードの履歴 |
| 活動的な表面を閉めて下さい | `⌘W` | `Ctrl+W` | デスクトップアプリ: 必要に応じて最初に一時的なプレビュー、タブ/ウィンドウをプレビューします。 ブラウザアクセスはブラウザのショートカットを使うことができます。 |
| Dismiss オーバーレイ | `Esc` | `Esc` | サポートされる場所; 保存またはブロックの確認は、不法な動作を変更できます |

ファイルを非表示にするだけを期待する閉じたショートカットを繰り返してはいけません。 プレビューが閉じた後、次の呼び出しはアプリケーションウィンドウを閉じることができます。 ウィンドウの閉鎖とプロセスのシャットダウンは、プラットフォームに依存する動作を分離します。

Side Chatタブを閉じるには、確認と停止/削除のサイドディスカッションが必要です。 file-preview クロージャはファイルを削除します。 [Side Chat](../guides/delegation.md) を参照してください。

## Composer リファレンストリガー {/* #composer-reference-triggers */}

| トリガ | セレクション | 送信前にチェック |
| --- | --- | --- |
| `/` | Skillを有効にしました | 意図した方法を確認し、依存関係をサポート |
| `@` | 利用可能なファイル/アーティファクトまたは文献参照/スコープ | 選択したソースとバージョンを確認します。 |
| `#` | セッション参照 | 意図した会話を確認する |

提案のインサートを選択すると、構造化された参照をインサートします。 身近なファイル名または Skill の名前を入力することは、対応する参照が添付されたという証拠ではありません。 インサートされたチップの要求を点検して下さい。

## 検索範囲 {/* #search-scope */}

アプリのグローバル検索は、プロジェクト、セッション、メッセージテキスト、アップロード/生成されたファイル、ライブラリレコードおよびコレクション、およびサポートされているアップロードのインデックス化されたコンテンツをカバーしています。 生成されたファイルは名前で検索されます。 未インデックスのコンテンツは検索されません。 結果を絞り込むカテゴリを選択し、それを開く前に結果のコンテキストを調べます。 これは、すべてのPDF、画像または他のバイナリファイルには、検索可能なフルテキストインデックスを持っているという意味ではありません。 完全なワークフローについては、[ナビゲーションと検索](../guides/navigation.md) を参照してください。

wiki の検索は別です: ドキュメントのタイトルをインデックス化します。, 見出しと現在の言語のボディ パス. 「Inbox」などの用語は、アプリケーションのセッションタイトルから欠損しても、ここに段落と一致させることができます。

技術的な参照: [アプリケーション結合](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [作曲家のキーボードの取り扱い](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [行動を閉じる](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [グローバル検索](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx)。

設定パネル/ダイアログ検索機能 **&lt;unk> &lt;unk> &lt;unk> &lt;unk> &lt;unk> &lt;unk> &lt;unk> &lt;unk>** お問い合わせ macOS そして、 **Ctrl+Alt+K の使い方** お問い合わせ Windows///////////////////////Linux. . . . **⌘K / Ctrl+K** は、設定ヘッダーの検索に引き続き焦点を合わせています。 [ショートカットスコープ](../guides/shortcuts.md#local-settings-search) を参照してください。
