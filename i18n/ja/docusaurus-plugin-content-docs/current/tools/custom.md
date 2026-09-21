---
title: "カスタムMCPツールを接続する"
last_update:
  date: '2026-09-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


import ExampleDownload from '@site/src/components/ExampleDownload';

# カスタムMCPツールを接続する {/* #connect-a-custom-mcp-tool */}

<p className="example-label"><strong>実践例</strong> ローカルMCPサーバで公開QCテーブルを問い合わせる</p>

この例では、既存のRNA-seq QCテーブルを小さなローカルMCPサーバーで公開しています。 固定CSVを読み、2つの操作を提供します。 ネットワークを照会したり、パッケージをインストールしたり、データセットを変更したりしません。

<PlatformGuide />

## 実際の例をダウンロード {/* #download-the-actual-example */}

- <ExampleDownload path="/examples/capabilities/qc-mcp-server.py">qc-mcp-server.py の使い方</ExampleDownload>
- <ExampleDownload path="/examples/gse60450/rnaseq-sample-qc.csv">rnaseq-sample-qc.csv は、</ExampleDownload>

両方のファイルをローカルに保存し、完全なパスに注意します。 サーバは、Pythonの標準ライブラリを使用します。 起動時に選択した CSV を読み込みますので、その入力を置き換える場合は、再起動/再接続を解除します。

## Open-Scienceにそれを加えて下さい {/* #add-it-in-open-science */}

1. **Settings → Connectors → Add connector → Local command** を開きます。
2. **Display name** を `GSE60450 QC` にセットします。
3. 選択する **python3 — script file** として **Command**, または **Other…** 実際のところ Python 実行可能なパス Windows. . . .
4. **Advanced settings** を開きます。 コネクタ名/IDを`gse60450-qc`に設定し、保存したQCテーブルへの読み取り専用アクセスとして記述します。
5. **Arguments**では、スクリプトの絶対パスを最初の行とCSVの絶対パスを2番目の行に置きます。 各行は単一の引数です。 スペースが含まれているため、パスの周りにシェルの引用符を追加しないでください。
6. この例では環境を空にします。 サーバスクリプトを見直し、**I trust this connector** をチェックし、**Add** を確認します。
7. `GSE60450` を検索し、**Connected** と Main エージェントの可用性を確認します。

<PlatformContent platform="macos">

![実際のローカル MCP 設定](/img/open-science/capabilities-walkthrough/08-mcp-local-config.webp)

</PlatformContent>

<PlatformContent platform="macos">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="linux">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="windows">

```text
C:\Research data\mcp test\qc-mcp-server.py
C:\Research data\mcp test\rnaseq-sample-qc.csv
```

</PlatformContent>

これら2つの行は、変更されていない貼り付けのリテラルパスではなく、パステンプレートです。 `python3`がアプリに利用できなくなった場合は、その他と実際の実行可能なパスを選択します。 選択したランチャーは、このコンピュータに存在しなければなりません。

<PlatformContent platform="windows">

Windowsでは、**Other…**を使用して、インストールされた`python.exe`へのフルパスを入力します。 `python3` プリセットは、コマンドが存在することを確立しません。 [ランタイム](../guides/runtimes.md)の通訳者パスを確認します。 フォルダ名にスペースが含まれている場合でも、スクリプトとCSVパスを2つの別々の**Arguments**行に保ちます。 実行可能と引数を 1 つのシェルコマンドに結合しないでください。

</PlatformContent>

## ツールの入力と検証済みの出力 {/* #tool-inputs-and-verified-outputs */}

| ツール | 入力 | 想定される内容 |
| --- | --- | --- |
| get_dataset_summary | 空のオブジェクト | GSE60450、ソースURL、入力ファイル名、12行、フルサンプル識別子 |
| get_sample_qc | `sample_id` キーワード | 選択したサンプルの4つの数値QCメトリック |

代理店に尋ねて下さい:

> 接続された gse60450-qc Connector を使用します。 コールセンター get_dataset_summary, それから get_sample_qc MCL1-DG_BC2CTUACXXX_ACTTGA_L002_R1用です。 実際の応答のみを報告し、CSVを維持します。

この例では、そのサンプルのネイティブアプリケーションが**23,227,641合計カウント、8,664ゼロカウント遺伝子、18,515検出遺伝子とメディアン237**を返す。 dataset-summary 呼び出しは 12 行を返します。 これらは元の保存されたQCのテーブルに一致します。

<PlatformContent platform="macos">

![正常に接続されたカスタムConnector](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

</PlatformContent>

<PlatformContent platform="windows">

Notebook アクティビティをツールコールの両方で開き、保存した JSON を再オープンし、CSV でサンプル ID とメトリックを比較します。 Windows はコネクター ID `gse60450-qc-win` を使用します; 独自の設定した ID をリクエストに使用してください。

![Windows ローカル MCP は保存された JSON および Notebook 出力と呼びます](/img/open-science/windows/mcp-tool-results.webp)

</PlatformContent>

## サーバとエラーの動作を調べる {/* #inspect-the-server-and-error-behavior */}

サーバは、MCP を初期化、ping、ツールの検出、stdio 上で呼び出します。 その2つのツールスキーマは、ダウンロード可能なスクリプトで定義されます。 標準的な出力はプロトコル・チャネルです; 通常のデバッグプリントを追加すると、接続を解除できます。 ローカル診断は標準的な間違いで属します。

**既知のエラーマッピング:** は、カスタムサーバがドメイン固有のエラーを返す場合でも、アプリケーション内の **connector_unavailable** として無効なサンプル名を表すことができます。 再接続する前に、サーバーログを確認し、サンプル識別子を検証します。 [トラブルシューティング](../guides/troubleshooting.md)で持続的な不一致を報告する。

アプリケーションは接続中にサーバーツールを発見します。 `host.mcp` を呼び出したときに発見された操作名を使用してください。 プロトコル`tools/list`はビジネスツールではありません。 入力スキーマ用のダウンロード可能なスクリプトを調べます。

## 別のコンピュータへのエクスポートと移動 {/* #export-and-move-to-another-computer */}

行の **Actions → Export** を選択し、目的の形式を選択し、設定のプレビューを調べます。 実際のエクスポートは、両方の引数パスがローカルであったことを警告しました。 **Save configuration** は、Python 通訳者、スクリプト、CSV ではなく、設定をエクスポートします。 これらのファイルを別々にコピーし、パスを更新し、ローカルの信頼を確認し、両方の成功した呼び出しを繰り返します。

<PlatformContent platform="windows">

**MCP client config** では、`mcpServers` を調べます。この例では、`command` と 2 つの `args` で 1 つのサーバーをエクスポートします。 JSON は Windows パスでエスケープされたバックスラッシュを表示します。 別のコンピュータで、すべての3つのパスを実際のファイルに更新し、両方の呼び出しを再試行します。 エクスポートされたコンフィギュレーションは、コピー先のコンピューターが接続されていることを確立しません。

</PlatformContent>

| 失敗 | チェックイン |
| --- | --- |
| コマンドは起動できません | 実行可能なパス、スクリプトパス、ファイル権限 |
| CSVは読みません | 第2引数と実際のファイル位置 |
| 接続されているが、ツールが利用できなくなった | 代理店の割り当て、現在のカタログおよび厳密な用具の名前 |
| 悪い入力 | 必須 `sample_id` および元の完全な識別子、密集したプロットのラベル無し |
| 失敗した呼び出し後のConnectorエラー | サーバ/アプリケーションエラーの詳細を調べ、適切なタイミングで再接続します。 |
| 端末で動作しますが、アプリではなく | App-visible 実行可能/環境およびプロトコルのみ stdout |

例を拡張するには、小さな入力スキーマを定義し、ソース識別子を返し、ツールを公開する前に、通常、空の入力と無効な入力をテストします。 これらの操作は、ユーザーがコールが読み込まれるか、または変更するかを調べることができるほど十分に狭くなります。

実装参照: [コネクタAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx)、[サービス.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/service.ts)。

スクリプトから同じカスタム MCP 設定を管理するには、[Connector CLIコマンド](../reference/cli.md#manage-connectors-and-credentials) または [SDK メソッド](../reference/api.md#connector-management-methods) を使用します。 成功した接続テストは、ツールを発見します。 統合運用を呼び出す前に、別々の境界型ビジネスコールを検証します。
