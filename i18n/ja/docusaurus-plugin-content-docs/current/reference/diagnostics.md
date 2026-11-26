---
title: "建築および診断"
last_update:
  date: '2026-11-25'
---

# 建築および診断 {/* #architecture-and-diagnostics */}

操作を所有するコンポーネントによって失敗を割り当てます。 成功したモデル応答、成功した計算、および検証された保存されたアーティファクトは異なる観察です。 失敗したステージの証拠を収集します。

## 建築・所有権 {/* #architecture-and-ownership */}

```mermaid
flowchart LR
  UI[Desktop or browser interface] --> MAIN[Shared Node backend]
  MAIN --> STORE[Settings, database and managed files]
  MAIN --> AGENT[Agent framework and model provider]
  MAIN --> NB[Notebook runtime]
  MAIN --> SERVICES[Connectors and Compute Hosts]
  AGENT --> EVENTS[Messages and tool events]
  NB --> EVENTS
  SERVICES --> EVENTS
  EVENTS --> UI
  MAIN --> ART[Artifact versions and provenance]
  ART --> UI
```

| コンポーネント | オーナーズ | 検査する証拠 |
| --- | --- | --- |
| レンダリングとプレビュー | 表示状態、制御、レンダリングされたファイルの内容 | ページ、選択したプロジェクト/セッション、ファイル名、プレビューエラー |
| Node バックエンド | 持続的な操作、アプリケーションサービス、アクセス境界 | 操作の間違いおよび関連の診断 |
| エージェントフレームワーク/provider | モデル接続、タスク実行プロトコル、応答ストリーム | フレームワーク/provider/modelの接続テスト、失敗する用具または回転 |
| Notebook | 通訳、コード実行、出力、ライブ変数 | Runtime ID/version、フェイリングセル、stdout/stderr、実行レコード |
| コネクタ | 外部サービスリクエスト | Connector/tool名、サニタイズされた入力、サービスからのステータス/エラー |
| リモート・コンピューティングのホスト | SSHアクセスと直接/スケジュールされたジョブ | ホスト/モード、プローブ結果、ジョブID、リモートログ |
| アーティファクトリポジトリ | 管理されたバージョン、チェックサム、およびキャプチャされた証拠 | ファイル/バージョンID、コンテンツステータス、コード/環境/レビュータブ |

デスクトップパスは、プリロードAPI境界線を渡します。 ブラウザアクセスは、アプリケーションの保護されたローカルサービス輸送を使用します。 [ヘッドレスサービスおよびブラウザアクセス](server.md) を参照してください。 ブラウザは2番目の独立した研究データベースではありません。

## 証拠からコンテンツを区別する {/* #distinguish-content-from-evidence */}

| 状態またはメッセージ | 通訳・通訳 | 次の検証 |
| --- | --- | --- |
| 利用可能なアーティファクトコンテンツ | 選択したバージョンのバイトは読みやすく、該当する整合性チェックを渡す | 科学的結果が正しいかどうかを調べる |
| コンテンツが利用できなくなった: 欠落 | 予想される内容が見つかりません | バージョン ID を保存し、ストレージの可用性を調べる |
| コンテンツ利用不可:チェックサム不一致 | コンテンツは記録された整合性値と一致しません | 診断の保持; 正式にバイトを交換し、同じバージョンを呼び出しません |
| 部分環境の捕獲 | 環境記録が不完全である | キャプチャの警告を読んで、通訳/パッケージの詳細を独立して保持します |
| 曲げられた実行ログ | 公平な実行証拠のみが保持されました。 | 警告ギャップと利用可能なライブNotebookを調べる |
| このバージョンのレビューはありません | 審査結果が添付されていない | バージョンをレビューとして報告しないでください。 |

これらの状態は共存することができます。 コンテンツの完全性、実行証拠、レビュー状況を別々に点検します。

## エラーの検索 {/* #error-lookup */}

| 失敗の表面 | キャニカルルックアップ |
| --- | --- |
| モデル/API、ConnectorまたはプロキシHTTP応答 | [HTTPステータスコード](../guides/troubleshooting.md#http-errors-400-403-429-and-5xx) |
| アプリはデータベースを開くことができません | [データベースの起動コード](../guides/troubleshooting.md#database-startup-errors) |
| Notebook のインポート、ファイルパス、権限 | [エラーメッセージ](../guides/troubleshooting.md#match-the-error-message) |
| SSHトランスポート、リモートパス、ジョブステータス | [リモートエラー](../guides/remote-compute.md#resolve-ssh-and-job-errors) |
| 課題の投稿とコミュニティの助け | [バグを報告するか、コミュニティに尋ねる](../guides/troubleshooting.md#report-a-bug-or-ask-the-community) |

エラーのソースを識別子で保持します。 OS errno、Python 例外、リモートジョブエラーコード、プロバイダの HTTP ステータスは変更できません。 添付したメッセージをコピーし、利用可能なときにネストされた原因をコピーします。 1つの識別子は、いくつかの失敗パスをカバーすることができます。

## 有用な診断記録を維持して下さい {/* #preserve-a-useful-diagnostic-record */}

アプリのバージョン、オペレーティングシステム、影響を受けたプロジェクト/セッション、動作、期待される結果、正確なエラー、およびその直前に何が起こったのかを記録します。 計算が関与したときに実行時間と入力チェックサムを含める。 既存のアーティファクトバージョンやリモートジョブ ID を含む。

利用可能な**Details**、**診断の細部**、またはログビューを使用して、エラーの原因を保持します。 可能な限り公開または最小限の入力で再生成します。 アカウントトークン、ヘッダ、プライベートパス、およびリサーチコンテンツの共有の内容を調べます。

主工程のロガーは構造化されたJSONラインを書きます。 そのデフォルトは、5 MiB でファイルを回転させ、合計で3つのファイルを保存します。 特別な致命的な書き込み動作は、1レコードによって普通の境界を超えることができます。 したがって、ログは保持ウィンドウを持っており、永久的な監査証跡はありません。 診断分野はtuncatedである場合もあります。 失敗の直後に関連レコードを保存し、イベントが起こらないという証拠から欠如を区別します。

ソース: [ロガーと保持](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/logger.ts)、[診断の赤化](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/diagnostic-redaction.ts)、[境界Notebookの失敗の細部](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/failure-diagnostic.ts)、[成果物コンテンツのステータス](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/artifacts/provenance-content-status.ts)。

最初に失敗した操作を、コミットされた変更の後で不安定な更新/cleanup から区別し、結果を配達からの背景の仕事の完了を区別して下さい。 突然変異を繰り返す前に保存された状態を点検して下さい。 [回復テーブル](../guides/troubleshooting.md#recovery-messages) は、ブロックされたキューの復元、保持された PDF リファレンス、スタイルコレクションの編集、Windows インストーラー メッセージをカバーしています。 [バックグラウンドタスク](../guides/notebook.md#background-tasks-and-result-delivery) は実行状態を説明しています。 リモート監視エラーは、最終ジョブ結果とは異なるままです。


## セッション診断アーカイブ {/* #session-diagnostic-archive */}

**Export diagnostics…**は選択したセッションメタデータ、データベースレコード、利用可能なアプリケーションログメタデータを、マニフェストとエクスポートログでローカルアーカイブに収集します。 ソースを欠落させることは、全体の輸出を停止しません。 大きいか、または損なわれた源は要約を作り出すことができます。 現在のアプリケーションログと履歴ログは、選択したセッションの外でアクティビティをカバーできるため、選択したソースとキャプチャ結果を確認します。

通常のメタデータソースは、プライベートコンテンツフィールドを除外します。 機密コンテンツのパッケージエクスポートの失敗の後、ダイアログは、赤字のスキャナーの証拠と元のフラグのファイルを提供することもできます。 元のファイルはデフォルトでチェックされていない。 それらを明示的に選択すると、元のバイトが含まれています。 エクスポートはアップロードやモデルリクエストを行わない。 共有する前に、結果のアーカイブを調べます。 研究パッケージのバックアップまたは最小限の再生を交換しません。 [記述された輸出プロシージャ](../guides/troubleshooting.md#session-diagnostics) を参照してください。

## デスクトップとバックエンドは別のプロセスです {/* #node-backend */}

v0.37.0から、電子は、通常のNodeバックエンドが共有サービスを所有している間に、ネイティブデスクトップシェルを所有しています。 デスクトップ、Web UI、CLI、SDK は同じバックエンドに接続できます。 クライアントが接続できないとき、設定ディレクトリ、バージョン、実際のポートを `status --json` で識別します。 見えるデスクトップウィンドウだけでは、バックエンドが健康であることを証明しません。 [バックエンドの所有権](server.md#backend-ownership)をフォローして、停止します。
## エージェントのトレースの設定 {/* #agent-tracing */}

組み込みの Agent がモデルリクエストと MCP ツールを横断するかどうかを調べる必要があるときにこれを使用します。 OpenTelemetry Collector や Langfuse などの OTLP/HTTP JSON 受信機を供給します。 Open-Scienceは、アプリ運用の収集サービスを提供していません。 エンドポイントは、完全なインジェクションURLでなければなりません。 Langfuse は `/api/public/otel/v1/traces` を使用しますが、一般的なコレクタは `/v1/traces` を使用します。

バックエンドを操作する人は、起動設定でエンドポイント、認証、およびキャプチャスイッチを設定します。 インストールされたアプリでは、アクティブな設定ディレクトリの `.env` がサポートされています(通常は `~/.open-science/.env`)。 起動設定を変更した後、アクティブな作業を終了し、そのバックエンドを再起動します。 プロジェクトの設定を保存して分離します。

<p className="example-label"><strong>例</strong> コンテンツキャプチャが無効なローカル受信機</p>

```dotenv
OPEN_SCIENCE_AGENT_OTLP_TRACES_ENDPOINT=http://127.0.0.1:4318/v1/traces
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_CONTENT=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_API_REQUEST=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_ARGUMENTS=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_RESULTS=0
OPEN_SCIENCE_AGENT_OTLP_DIAGNOSTICS=1
```

この例では、バックエンドのループバックアドレスで既にリスニングしている受信機を想定しています。 インストールしない。 別のホストでは、実際のインジェクションURLと必須認証を使用します。 [オフィシャルレシーバー構成](https://github.com/aipoch/open-science/blob/v1.3.4/docs/development-quick-reference.md#open-science-agent-traces) と [環境事例](https://github.com/aipoch/open-science/blob/v1.3.4/.env.example) を参照してください。 プロンプトと共有スクリーンショットから受信機の秘密を保持します。

### キャプチャの詳細を選択 {/* #choose-capture-detail */}

プロジェクトのトレースは**既定では無効**です。ただし、以下の内容収集設定は、省略するとそれぞれ **`1`（有効）** になります。メタデータのみを記録するには、4 項目すべてを明示的に `0` にしてください。これらは起動設定であり、プロジェクトのダイアログにある追加スイッチではありません。

| 後にサフィックスを設定する `OPEN_SCIENCE_AGENT_OTLP_` | 設定時に含まれているコンテンツ `1` |
| --- | --- |
| `CAPTURE_CONTENT` | プロンプトと最終回答の抜粋 |
| `CAPTURE_API_REQUEST` | モデル JSON、指示、歴史、ツールデータおよび添付ファイルを含む潜在的に |
| `CAPTURE_TOOL_ARGUMENTS` | MCPツール入力プレビュー |
| `CAPTURE_TOOL_RESULTS` | MCPツール出力プレビュー |

メタデータのみのトレースは、操作を記述します。 個人調査データでプロジェクトを有効にする前に、受信機とそのアクセスルールを確認します。

### 配達を有効にし、チェック {/* #enable-and-check-delivery */}

[プロジェクト設定](../guides/projects.md#agent-tracing) を開き、**Agent tracing** を有効にして保存します。 **Open-Science Agent** の組み込みは小さい要求のために使用します。 受信機でサービス`open-science-agent`を探して、実際に生成したタスクの相関的なターン、要求、ツールスパンを調べます。

`.env` の設定で診断機能が有効になっているため、アップロード状態の隣接する `.env.otel-status.json` を検査します。 トレースが到着しない場合は、アクティブなプロファイル、プロジェクトスイッチ、ランタイム、フルエンドポイント、受信機の可用性と資格情報を確認してください。 配信は非同期です: 完了したエージェントの回答は、アップロードを成功させません。 切断を回すと、将来のキャプチャを停止します。 受信機で既にレコードを削除していません。
