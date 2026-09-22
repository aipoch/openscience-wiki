---
title: "タスクSDKとローカルAPI"
last_update:
  date: '2026-09-22'
---

# タスクSDKとローカルAPI {/* #task-sdk-and-local-api */}

`@aipoch/open-science` Node.js クライアントは、認証されたローカルアプリケーションサービスに接続して、タスク、セッション、コネクター、共有資格情報を管理することができます。 パブリック SDK メソッドは、電子プリロード呼び出しとエージェントの内部 `host` API とは別々です。

<span id="connect-and-select-real-ids" />

## タスクを接続し、実行し、出力をダウンロード {/* #connect-run-a-task-and-download-its-output */}

<p className="example-label"><strong>例</strong> 接続チェックノートを保存してダウンロードする</p>

Node.js 22.5 以降を使用してください。 インストールしたデスクトップアプリケーションを同じマシンで開き、モデルのセットアップを終了し、実行し続ける。 SDKはローカルサービスの発見およびローカル保存されたトークンを使用します。 別のデーモンのために、まず[ヘッドレスサービス](server.md)に従ってください。

空の作業フォルダに、クライアントをインストールします。

```bash
npm init -y
npm install @aipoch/open-science
```

`connection-check.mjs` として以下を保存します。 `node connection-check.mjs` を実行して、プロジェクト ID をリストし、`node connection-check.mjs PROJECT_ID` を 1 つの ID で返します。 最初の呼び出しは、プロジェクトをリストした後に意図的に停止します。 2 番目は小さなタスクを作成します。

```js
import {connectToOpenScience} from '@aipoch/open-science';
import {writeFile} from 'node:fs/promises';

const client = await connectToOpenScience();
const projects = await client.listProjects();
const projectId = process.argv[2];
if (!projects.some((project) => project.id === projectId)) {
  console.table(projects.map(({id, name}) => ({id, name})));
  console.log('Run again with a project ID from this list. Create a project in the app if the list is empty.');
  process.exit(projectId ? 1 : 0);
}
const run = await client.startRun({
  project: projectId,
  prompt: 'Save a short Markdown file named project-note.md explaining that this is a connection check. Do not read project inputs or use the network.',
  permissionProfile: 'ask',
});
console.log('Run:', run.id, 'Session:', run.sessionId);
const result = await client.waitForRun(run.id, {timeoutMs: 120000});
console.log(result.status, result.output ?? result.error ?? '');
if (result.status !== 'completed') {
  throw new Error('Inspect the run in the application before continuing.');
}
const artifacts = await client.listArtifacts(run.sessionId);
console.table(artifacts.map(({id, name, path}) => ({id, name, path})));
const artifact = artifacts.find((item) =>
  item.name === 'project-note.md' || item.path.endsWith('/project-note.md'));
if (!artifact) throw new Error('No matching saved artifact; inspect the response.');
const response = await client.downloadArtifact(artifact.id);
await writeFile('project-note.download.md', new Uint8Array(await response.arrayBuffer()));
console.log('Saved project-note.download.md; open and check its contents.');
```

デスクトップセッションを開いたままにします。 **Ask for approval**がタスクを一時停止する場合、そこに応答します。 クライアントのポーリングを停止する待ち時間アウト。 実行をキャンセルしません。 `getRun` で印刷された実行 ID を点検し、リクエストを解決した後待ち続けるか、停止しようとすると `cancelRun` を呼び出す。 ダウンロードは、一致する保存されたアーティファクトが存在する場合にのみ成功します。 ダウンロードしたマークダウンを開き、チェックを完了します。

このプログラムは、パブリックAPI契約を実証します。 モデルが要求されたファイルを常に保存することを想定していません。 npmパッケージがインストールできない場合は、ローカルパッケージとして一致するソースチェックアウトで出荷されたSDKフォルダを使用します。 インストール前にパッケージメタデータを確認します。

### ファイルがダウンロードされない完了したタスク {/* #a-completed-task-whose-file-will-not-download */}

このエラーの原因は、完成したタスクレコードのアーティファクトバージョンのアイデンティティをロードします。[ダウンロード更新](../changelog/v0.29.0.md)で修正されました。 古いアプリでは、保存したファイルを再試行する前に更新します。 その他のHTTP 500は、まだ診断を必要としています。

タスクの完了とアーティファクトのダウンロードは別々のチェックです。 `downloadArtifact` が HTTP **500**/`internal_error` を返す場合は、`getRun` と `listArtifacts` を呼び出して、タスクの状態を確認し、返されたアーティファクト ID を保持します。 ダウンロードを再試行するために、同じ研究タスクを再び起動しないでください。

アプリケーションでアーティファクトを開き、そのコンテンツが利用可能かどうかを確認します。 作業プレビューは、SDKのダウンロードが成功したことを確立していません。 実行 ID、アーティファクト ID と [診断レポート](../guides/troubleshooting.md) のエラーをダウンロードします。 認証トークンを省略します。 CLI の `artifacts download` コマンドに同じ失敗が影響します。

## 読みやすさを調べ、Codexを準備する {/* #runtime-api */}

| SDKメソッド | HTTPリソース | 業務内容 |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | 是正と次の行動を尊重します。 |
| `listRuntimes()` | `GET /api/v1/runtimes` | リストフレームワーク、ステータス、オプションバージョン、管理/外部ソース。 |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | 初期設定状態を調べます。 |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | サポートされているブートストラップフローで管理されたCodexランタイムを準備または修復します。 |
| `installCli()` | `POST /api/v1/cli/install` | ローカルPATHのランチャーをインストールします。 |

セットアップのミューテーションは認証されたローカルサービスを必要とします。 返された`ok`とエラーコードを確認してください。 再試行の前にコンフリクトを解決する必要があります。 クライアントのタイムアウトは、承認されたインストールがキャンセルされたことを確立しません。 別のインストールを開始する前に、読みやすさをリセットします。 サブスクリプションのログインまたは名前付き環境変数認証入力のために、[ターミナル セットアップの流れ](cli.md#terminal-setup)を使用してください。

## メソッドとHTTPリソース {/* #methods-and-http-resources */}

| SDKメソッド | HTTPリソース | 業務内容 |
| --- | --- | --- |
| `listProjects`, `createProject` | GET/POST(GET/POST) `/api/v1/projects` | プロジェクトを読む/作成 |
| `updateProject` | パッチ `/api/v1/projects/:id` | プロジェクトメタデータ/コンテキストの更新 |
| `getProjectSessionDefaults`, `updateProjectSessionDefaults` | GET/パッチ `/api/v1/projects/:id/session-defaults` | 新しく作成したセッションのデフォルト |
| `listSessions` | おすすめ `/api/v1/sessions?project=ID` | セッション要約を読む |
| `getSession` | おすすめ `/api/v1/sessions/:id` | 1つのセッションを読む |
| `getSessionConfiguration`, `updateSessionConfiguration` | GET/パッチ `/api/v1/sessions/:id/config` | 読み取り/更新セッションの設定 |
| `getAgentRouting`, `updateAgentRouting` | GET/パッチ `/api/v1/settings/agent-routing` | グローバルフレームワーク/リビューア/サブエージェントルーティング |
| `getSessionPlan` | おすすめ `/api/v1/sessions/:id/plan` | アクティブプランの状態を読む |
| `respondSessionPlan` | 投稿ナビゲーション `/api/v1/sessions/:id/plan/respond` | 正確な決定/バージョン/修正に対応 |
| `startRun` | 投稿ナビゲーション `/api/v1/runs` | 実行を認める |
| `getRun`, `cancelRun` | おすすめ `/api/v1/runs/:id`, ポスト `/api/v1/runs/:id/cancel` | インスペクト/キャセルの実行 |
| `listArtifacts` | おすすめ `/api/v1/sessions/:id/artifacts` | 管理された出力記述子を読む |
| `downloadArtifact` | アーティファクトのダウンロード応答 | 保存した出力をストリームする。 返された応答ボディを消費して下さい |
| `waitForRun` | SDK が実行状態を上回る | キャンセル/オフラインのオプションを待ってください |
| `events` | SDKイベントイテレータ | 順序付けされた活動および再接続/再同期信号を観察して下さい |

[メソッド定義と正確なルート](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs) はリクエストシグネチャの権威あるルックアップです。 表は、任意の電子/内部エンドポイントを呼び出すための権限ではありません。

### Connector管理方法 {/* #connector-management-methods */}

| SDKメソッド | HTTPリソース |
| --- | --- |
| ListConnectors() の一覧 | GET /api/v1/コレクター |
| getConnector(id) ディレクティブ | GET /api/v1/connectors/:id |
| setConnectorEnabled(id, enabled) ディレクティブ | PUT /api/v1/コレクター/:id/enabled |
| addConnector(リクエスト) | POST /api/v1/コレクター |
| updateConnector(id, リクエスト) | PATCH /api/v1/コレクター/:id |
| removeConnector(id) ディレクティブ | DELETE /api/v1/コレクター/:id |
| testConnector(id) ディレクティブ | POST /api/v1/コレクター/:id/test |
| listCredentials() ディレクティブ | GET /api/v1/認証 |
| createCredential(リクエスト) | POST /api/v1/認証 |
| updateCredential(idリクエスト) | PATCH /api/v1/credentials/:id |

メソッドは、最終的な引数としてリクエストオプションを受け付けます。 返された安定した ID を使用します。 カスタムMCP定義のみが作成/編集/削除をサポート 更新は、輸送を必要とし、省略された認証結合を保存します。 変異を構築する前に、正確なタイプ要求をお読みください。

<p className="example-label"><strong>例</strong> 設定された Connector をテストして下さい</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector`は、分離された接続を開き、ツールを発見し、それを閉じます。 研究ツールを呼び起こさないため、Connector または初回 OAuth サインインを有効にします。 カスタム MCP/credential の変更はローカル認証を必要とします。 クレデンシャルメタデータが生の秘密を省略します。

## 実行と構成 ID {/* #run-and-configuration-identity */}

<p className="example-label"><strong>例</strong> 計画承認のために一時停止するタスクを開始します</p>

```js
const run = await client.startRun({
  project: projectId, // a returned ID
  prompt: 'Inspect the available project inputs and propose an analysis plan.',
  permissionProfile: 'ask',
  turnIntent: 'plan-first',
});
const state = await client.waitForRun(run.id, {
  timeoutMs: 120000,
  returnOnAttention: true,
});
console.log(state);
```

`attention.kind === 'plan-approval'` で静止したオブジェクトを返すことができます。 応答する前に、アクティブなプランとバージョン/リビジョンをお読みください。 視覚的に確認するには、アプリケーションでプリントされたセッションを開き、その計画を承認または修正し、その後、`waitForRun(run.id)`を再開します。 API のみの決定のために、`getSessionPlan` および `respondSessionPlan` をその正確なバージョン/リビジョンで使用してください。 [プランコマンド](cli.md) を参照してください。 通常の許可プロンプトは、同じ構造の注意状態になりません。

| 入力/状態 | ルール |
| --- | --- |
| `cwd` | SDK/HTTPで供給した場合、絶対的である必要があります。 サーバは、既存の読み込み可能/書き込み可能なディレクトリをキャノン化し、チェックします。 |
| 既存 `sessionId` + `cwd` | そのセッションの記録されたディレクトリに解決しなければならない |
| 入退場 `cwd` | アプリケーション管理されたワークスペースを使用する |
| 外部ワークスペース | コールアー所有を維持し、アプリケーションによって削除されていない |
| セッション構成書 | 使用方法 `expectedRevision`; スタイルの書き込みを拒否する |
| プロジェクト デフォルト 書き込み | 使用方法 `expectedUpdatedAt` プラスプラス `patch`; 同時編集を拒否 |
| 新しいセッション優先 | Explicit 実行リクエスト → プロジェクトデフォルト → アプリケーション設定 → プロバイダーのデフォルト |
| 変更されたプロジェクトのデフォルト | 新しいセッションに影響する。 既存のセッションを再書き込みしない |

編集前に設定を読んでください。 provider/model/effort の変更はコンパウンド構成であり、参照されたリソースは、選択したフレームワークに利用可能である必要があります。 意図的にそれらをクリアしない限り、省略された設定を保存します。

## 締め切りと再試用ID {/* #deadlines-and-retry-identity */}

クライアントの期限は 30 秒にデフォルトを要求し、応答ボディを消費している間活動的な残ります。 接続/クライアントの設定で `requestTimeoutMs` を設定したり、サポートされているメソッドの最後のオプション引数で `{signal, timeoutMs}` を設定したりします。 `downloadArtifact`は、返された体が流れながら期限を保持します。

`waitForRun`は、要求をポーリングし、遅れを遅らせるために適用される独自の全体的なタイムアウトと信号を持っています。 タイムアウトがサーバーの実行をキャンセルしません。 取り消しが意図され、アーティファクトを解決する前の最終化を待つとき、`cancelRun(run.id)`を明示的に呼び出します。

再試行安全なプロジェクトの作成と入学を実行するために、最終的なオプションの引数で`idempotencyKey`をパスし、同じボディで同じキーを再使用してください。 リプレイは、デーモンが稼働している間、最大24時間保持され、プロセスローカルに拘束されます。 変更されたボディは`idempotency_conflict`を戻します; 排出された再生レジストリは、`idempotency_unavailable`を返すことができます。 デーモンリスタートは耐久性のあるクロスリスタートリプレイ保証ではありません。

## イベントストリーム境界 {/* #event-stream-boundaries */}

初期のランイベントが必要な場合は、作業を開始する前に、`events.ready`を購読して待ってください。 イテレータはシーケンスと実行/セッション/プロジェクト識別子を運ぶ。 `run.progress` には、プロバイダのニュートラルフェーズと10秒のライブネスアップデートが含まれているため、最初に表示されたプロバイダの出力が出力されます。 セッションの準備は、登録を解除する前に、そのストリームが外部に行われます。

| シグナル伝達 | 通訳・通訳 | フィードバック |
| --- | --- | --- |
| `events.ready` 拒絶反応 | 接続が失敗し、使用可能なライブネスの前に | 原因を解決した後の再接続 |
| デフォルト 30-秒アイドルタイムアウト | イベント/コントロールハートビートが到着しない | 接続をチェックする。 これはモデルの実行タイムアウトではありません |
| `event_stream_invalid_message` | 成形イベントフレーム | ストリームとリestablish状態の消費を停止する |
| `event_stream_overflow` | 消費者のバックログは1,024イベントを上回る | バックプレッシャーを扱い、権威ある状態を元通りにして下さい |
| `stream.resync-required` | 再生サフィックスが期限切れまたはストリームが変更される | HTTPによるフェッチ電流の実行/セッション |

接続ハートビートは、コントロールフレームであり、通常の研究イベントとして収穫されていません。 再再生のリコネクトはバインドされ、現在のプロセスに属します。 独自のインテグレーションで必要となるアーティファクトIDと最終実行状態を主張します。

[SDK ソース](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs), [SDKコントラクトノート](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md). 発見/ライフサイクルのシェルオートメーションと[ヘッドレスサービス](./server.md)の[CLI](./cli.md)をご覧ください。

ソース: [シグネチャー](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts)、[ルート](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs)。 構成および診断境界のための[CLI管理分野](cli.md#manage-connectors-and-credentials)を見て下さい。

## 無人タスク {/* #unattended-runs */}

`startRun`入力で`permissionPrompts: 'none'`を設定し、CLI `--permission-prompts none`に対応。 適切な`permissionProfile`を保ちましょう。このオプションは、未解決の人間の相互作用を低下させ、権限を拡張しません。 `planFirst: true` と組み合わせてはいけない。

ホストは機能`permission-prompts-none`を宣言しなければなりません; それ以外の場合は、クライアントは実行を作成する前に、`unsupported_capability`を報告します。 本方針は、現行の取消にのみ適用されます。 実行中のステータスとエラーを通常の通りに処理します。 [無人 CLI 実行](cli.md#unattended-runs) を参照してください。
