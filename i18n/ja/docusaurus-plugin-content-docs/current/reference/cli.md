---
title: "CLIと構造化された出力"
last_update:
  date: '2026-09-22'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLIと構造化された出力 {/* #cli-and-structured-output */}

`open-science` を使用して、アプリケーションの状態を調べ、タスクを実行し、コネクタと認証情報を管理し、ローカルサービスを実行します。 インストールされたランチャーで起動し、接続するローカルインスタンスを確認します。

<PlatformGuide />

## ターミナルからセットアップ {/* #terminal-setup */}

デスクトップアプリケーションを最初にインストールし、`open-science` コマンドを実行します。 CLI はアプリケーションのバックエンドを使用します。 それは別のnpmデーモンではありません。 Debian パッケージにはコマンドが含まれています。 ランチャーが欠落している場所, プラットフォームランチャーのセットアップに従うか、インストールされたCLIエントリを使用する, その後、`open-science cli install`.

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init` は、アプリケーションを起動せずに設定ディレクトリを作成します。 `--profile`は、サポート開発プロファイルの`--config-root`のエイリアスです。 パッケージ化されたスタートアップは、これらのオーバーライドを拒否します。 意図したプロファイルを一貫して使用してください。 `runtime list`は、実行可能パスを提示することなく、検出されたフレームワークの信頼性、バージョンおよび管理/外部ソースを示しています。

未設定のCodex設定の場合:

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

ログインフローに従ってください。 これは、管理されたCodexランタイムを準備または修理し、アプリケーションを介してサブスクリプションを登録します。 外部のCodexログインファイルをインポートしません。 実行中のブートストラップは現在、実行中のリストには他のフレームワークが含まれているにもかかわらず、Codexをターゲットにします。 不正なコンフィギュレーションをサイレントに置換するのではなく、既存のコンフィギュレーションが報告されます。

代わりにOpenAI APIキーを使用する場合は、`provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`を使用して、サポートされているモデルIDと、既に秘密管理環境によって供給されたキーを使用します。 OpenAlex では、`connector configure literature --openalex-key-env OPENALEX_API_KEY --json` を使用します。 `open-science` で両方のコマンドをプレフィックスします。 コマンド引数にキー自体を置かないでください。 巧妙なクレデンシャルチェックは、研究クエリが完了したか、そのクオータが残っていることを確立しません。

**準備完了**、個々の**チェック**を読んで、`doctor`から**次へ**アクションを提案しました。 `ready` が false である間、レポートは正常に終了できます。 バックエンドが不在の場合、医師はそれを報告し、3を終了します。 報告された前提条件を完成させ、再度確認し、意図したプロジェクトで[タスクを実行する](#run-input-and-control-flags)を検証します。

## エントリーポイント {/* #entry-points */}

| エントリーフォーム | 必須条件 | コマンド |
| --- | --- | --- |
| インストールされたアプリケーションランチャー | **Settings → General → Command line tool → Install command** | `open-science --help` |
| ソースチェックアウト | 組み込みアプリケーションとリポジトリの依存関係 | `node packages/open-science/cli.mjs --help` |
| npm クライアント | Node.js 22.5+ およびインストールされたアプリケーション; インストール前にパッケージの可用性を確認 | パッケージ識別子 `@aipoch/open-science` |

インストールされたランチャーは、アプリケーションのバンドルされたランタイムを使用します。 PATH からディレクトリが存在しない場合は、一般パネルの指示に従って、新しいターミナルを開きます。 表示ブランディングと一致させるために実行可能の名前を変更しないでください。

<PlatformContent platform="windows">

**Install command** の後、新しい PowerShell ウィンドウを開き、次のコマンドを実行します。

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

**Source** は、通常、ユーザプロファイルの下の `open-science.cmd` で表示されるランチャーにポイントします。 成功したヘルプ出力は、ランチャーが実行されていることを確認します。 ステータスが `{"running":false}` を返すと、 CLI は実行中のバックエンドが報告されていない。 これはデスクトップウィンドウが閉じられているという意味ではありません。 タスクの送信やファイルのダウンロードの前に、[サーバーモード](server.md)を使用して意図したインスタンスを確認してください。

</PlatformContent>

## 小さなコマンドラインタスクを完了 {/* #complete-a-small-command-line-task */}

<p className="example-label"><strong>例</strong> コマンドラインからメモを保存</p>

1. 上記のエントリを使用してコマンドをインストールします。 作業モデルでデスクトップアプリを稼働させます。
2. `open-science status --json` を実行し、`open-science project list --json` を実行します。 意図したインスタンスを確認し、返されたプロジェクト ID をコピーします。
3. `task.md` で保存: **簡単な接続チェックノートを含む project-note.md を保存します。 他のファイルを読み込むか、ネットワークを利用しないでください。**
4. [入力を実行し、フラグを制御する](#run-input-and-control-flags) でコマンドを実行します。 前回からIDを取得した後に、各プレースホルダを交換してください。
5. パーミッションの実行が停止する場合、デスクトップの会話で応答します。 `--wait` はタスクが続いたときにタイムアウトすることができます。 `run status RUN_ID --json`を再度送信する前に検査します。
6. 返されたMarkdownアーティファクトIDを選択し、それを新しいローカルファイル名にダウンロードし、開きます。 リクエストされたアーティファクトのない完了した実行には、そのセッションのフォローアップが必要です。 遺物が存在してもダウンロードが失敗した場合は、[アーティファクトのダウンロードの回復](./api.md#a-completed-task-whose-file-will-not-download) に従ってください。

プランファーストのタスクでは、`--return-on-attention` を利用し、返されたプランを調べて、下記のプランコマンドで対応します。 JSON の統合のために、実行、完了、失敗し、終了するタスクとしてすべての成功した HTTP 応答を処理するのではなくキャンセルを区別して下さい。

## コマンドファミリー {/* #command-families */}

| コマンド | 引数/フラグ | エフェクト |
| --- | --- | --- |
| `project list` | `--json` | 利用可能なプロジェクトを読む |
| `project create` | 名前、任意 `--description`, の 1 つ `--agent-context` / `--agent-context-file` | プロジェクトを作成する |
| `project update` | ID または正式な名前、メタデータ/コンテキストフィールド | 供給された分野だけを変更して下さい; `--clear-agent-context` 明示的にコンテキストをクリアする |
| `project session-defaults show` | プロジェクトIDまたは正式名称 | 新しいセッションのデフォルトを読む |
| `project session-defaults update` | プロジェクトプラスセッションオプション | 同時編集保護でデフォルトを更新する |
| `run` | `--project`、任意プロンプト入力 `--session`, `--wait` | 作業を開始または継続する |
| `run status` / `run cancel` | ID の実行 | 実行を点検または明示的に解除する |
| `session status` | セッションID | セッション状態を読む |
| `session config show` | セッションID | 持続的な/有効な構成および修正を読んで下さい |
| `session config update` | セッションID、 `--revision`、供給された選択 | セッションが更新を受け入れることができるとき、将来のターンを変更します |
| `settings agent-routing show/update` | フレームワークとレビュアー/サブエージェントのルーティングオプション | グローバルルーティングを読み取りまたはアトミックに更新する |
| `plan show/approve/reject/revise` | セッションID; 決定は、正確なアーティファクトバージョンとリビジョンを必要とします | アクティブプランへの読み込みまたは対応 |
| `artifacts list` | セッションID | 保存されたアーティファクトを読む |
| `artifacts download` | アーティファクトID、 `--output` | 外部コピーを保存 |

スクリプトでプロジェクト ID を使用します。 CLI は、ユニークなプロジェクト名を解決できます。 重複する名前はあいまいです。 SDK/HTTP ルーティングは、直接 ID が必要です。 プロジェクトのコンテキストは、16,000 文字まで受け付けており、リスト/作成/更新結果は、プライベートコンテクストボディではなく `hasAgentContext` を公開します。

`artifacts download` が HTTP 500 で失敗した場合、古いアプリケーションを更新し、同じ返されたアーティファクト ID を再試行します。 [ダウンロードの回復ステップ](api.md#a-completed-task-whose-file-will-not-download) は、ファイル転送が失敗したことから、完了したタスクを区別します。 既存の出力を得るために研究タスクを再実行しないでください。

## コネクターおよび資格情報の管理 {/* #manage-connectors-and-credentials */}

これらのコマンドは、実行中のバックエンドと保存された設定を使用します。 編集前に意図したインスタンスを確認します。 カスタムConnectorとクレデンシャル書き込みは、ローカル認証接続が必要です。 サーバーでは、SSH を含むサーバー上で CLI を実行します。

| コマンド | 入力/結果 |
| --- | --- |
| open-science コネクタリスト --json | 利用可能なコネクタの安全な設定ビュー |
| open-science コネクタは CONNECTOR_ID --json を表示します。 | 返された ID の構成/ステータス |
| open-science コネクタは CONNECTOR_ID を有効にします。 | 有効な設定を設定する |
| open-science コネクターは CONNECTOR_ID を無効にします | 有効な設定をクリアする |
| open-science コネクタは --json を追加 | JSON stdin から新しいカスタム MCP 定義を読みます |
| open-science コネクタ更新 CONNECTOR_ID --json | JSON stdin から構成の更新を読んで下さい |
| open-scienceコネクタはCONNECTOR_IDを削除します。 | カスタム MCP 定義を削除します。 |
| open-scienceコネクタテスト CONNECTOR_ID --json | 別の接続を介してツールを発見し、それを閉じます |
| open-science クレデンシャルリスト --json | 生の秘密なしでクレデンシャルメタデータを読みます |
| open-science クレデンシャル --json を追加 | JSON stdinから新しい資格情報を読む |
| open-scienceクレデンシャル更新 CREDENTIAL_ID --json | JSONのstdinからのdisplayNameおよび/または秘密を更新して下さい |

<p className="example-label"><strong>例</strong> ローカルConnector設定を提出する</p>

準備されたローカル設定ファイルを以下に提出してください。

~~~bash
open-science connector add --json < connector.json
~~~

| 構成フィールド | 必須条件 |
| --- | --- |
| 名前/ displayName | 新しいカスタムConnectorのために要求される; 名前/ID は更新の間に安定します |
| トランスポート | stdio、streamable_httpまたはsse; 更新の必要もあります。 |
| コマンド / args | ローカル実行可能かつオプションの引数 stdio |
| ログアウト | HTTP/SSEのエンドポイント |
| envCredentialIds/ヘッダCredentialIds | 埋め込まれた環境/ヘッダー名で、認証 ID を保存 |
| oauthCredentialId(オウス・クレデンシャル・アイド) | 既存の共有 OAuth 認証を結合 |
| Omitted 認証結合 | 保存した値を更新に保存します。 空の環境/ヘッダーの結合オブジェクトは、マップをクリアします |

カスタムのMCP定義のみを追加、編集または削除できます。 **Enabled**は、Specialistアクセスのコネクティビティやグローバルリボケーションの証明ではなく、選択の好みです。

**試験結果** は、Connector を有効にしたり、ビジネスツールを実行したりしません。 成功、オプションのツールカウント、メッセージを返します。 発見は10秒に分岐し、失敗はnonzeroを出ます。 束ねられたConnectorの生きている診断は支えません。 テストは既存の OAuth トークンをリフレッシュできますが、初回のブラウザーのサインインを実行しません。

クレデンシャルは、JSON stdin を通して秘密を受け入れます。 コマンド引数とシェルの履歴からそれらを保存します。 トークンの入力は displayName、kind: トークンとシークレットを使用します。 api_keyも対応しています。 返された createCredential.id を Connector に結合しました。 これらのエンドポイントなしで古いバックエンドは、Settings-file を直接編集するのではなく、エラーを返します。

## 入力を実行し、フラグを制御する {/* #run-input-and-control-flags */}

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

資本調達先を返却IDに置き換えます。 たとえば、インストールに存在しなければならない発明されたSkillまたはプロバイダの名前は名前を付けません。

| ログイン | 契約条件 |
| --- | --- |
| `--prompt` / `--prompt-file` | インラインテキストまたはUTF-8ファイル; stdinは省略されたときプロンプトを提供できます |
| `--session` | 指定したセッションを続けてください |
| `--cwd` | 外部の作業ディレクトリ; CLI は相対パスを解決し、サーバーはそれをcanonicalizesし、そして検証します |
| `--approval-profile` | `ask`, `auto`, `full`; デフォルト `ask` |
| `--provider` + `--model` / `--provider-default-model` | 設定されたプロバイダと明示的またはプロバイダ所有のデフォルトモデルを選択します。 |
| `--reasoning-effort` | CLIヘルプリスト `default`, `low`, `medium`, `high`, `xhigh`, `max`; UIモデルの選択肢は異なる |
| `--skill` | 再インストール可能なSkill ID; Skill を欠落させないインストールはしない |
| `--plan-first` | 実行前のプラン応答が必要です |
| `--auto-review` / `--no-auto-review` | セッション自動レビューを設定する |
| `--memory` / `--no-memory` | セッションメモリを設定します。 相互に排他的な |
| `--specialist` | UUIDまたは安定したプロファイル名で新しいセッションを結合しました。 プレゼンテーション表示名はルーティングIDではありません |
| `--delegation allow/deny` | 新しい委任された仕事の制御の入学; denyは既存の子供をキャンセルしません |
| `--compute-host` | 繰り返し構成されたホストID; 実行対象を選択し、SSH を構成しません |
| `--enable-compute-host` / `--clear-compute-hosts` | 新しいセッションアクセス/デフォルト制御; 既存のセッションアクセスの変更は、設定の更新を使用します |

外部の`cwd`は、発信者所有を維持します。 `--cwd` で `--session` を再利用すると、同じキャノンディレクトリが必要です。 実行は、セッションの再配置を要求しません。 ホストオプションを省略すると、既存の選択が保存されます。 意図した時に明示的なクリア操作を使用します。

## 待ち時間、注意、キャンセル {/* #waiting-attention-and-cancellation */}

| オプション/状態 | 結果 |
| --- | --- |
| なし `--wait` | 退去後退去。 保存する `id` そして、 `sessionId` 後で投票する |
| `--wait` | ターミナルの操業状態を待って下さい |
| `--wait --return-on-attention` | また、構造化計画の承認が必要な場合も返送します。 許可のプロンプトは同じ注意の状態ではないです |
| `--timeout-ms` | 期限を過ぎるとクライアントの待機を停止します。 サーバの実行は継続します |
| `--cancel-on-timeout` | タイムアウト後に明示的にキャンセル; コマンドはまだタイムアウトを報告します |
| `run cancel RUN_ID` | キャンセル/finalization を待って下さい; すでに最終成果物を保持する |

計画承認のために、まず`plan show`を読んで、`--artifact-version`と`--revision`の両方を供給します。 階段プランの決定は、新しいプランには適用されません。 セッション構成の更新は、`session config show` で返されたリビジョンを要求するのと同じくらいです。 階段更新は`session_revision_conflict`を戻します。 アクティブルートエージェント、サブエージェント、Notebook ワークは、`session_busy` で更新をブロックできます。

## 構造化された出力および出口コード {/* #structured-output-and-exit-codes */}

`--json`は1つの結果を出します。 `--jsonl` は `run --wait` で利用できます。イベントをストリームし、実行結果で終了します。 2つを結合しないでください。 要求される場合のstderr でエラーが構成されます。 プロセス終了コードだけでなく、`error.code` を解析します。

以下の無効なオプション応答をローカルで再現しました。

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| 終了コード | 意味する |
| ---: | --- |
| 0 | コマンドが成功しました。 該当する場合、返された実行/保持状態を調べます。 |
| 1 | 一般/実行障害、タイムアウト、競合、またはステータスレポートの実行サービスなし |
| 2 | 無効な CLI の使用 |
| 3 | ローカルデーモンは利用できません |
| 4 | リクエストされたプロジェクト/実行/セッション/アーティファクト/Specialistが見つかりませんでした |
| 5 | 活動的な仕事はアプリケーション更新を妨げました |
| 6 | 適用更新は手動設置ステップを要求します |

`run.progress` と `stream.resync-required` を含むことができます。 再接続後再再生が利用できなくなった場合、権限のある実行状態を再読み込みします。 イベントストリームは永続的な歴史であると仮定しません。 ライフサイクルコマンドは、[ヘッドレスサービス](./server.md) で説明されている別のフラグ制限を持っています。

[CLI実装](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/cli.mjs), [上流コマンドガイド](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/CLI.md).

技術的な参照: [CLI契約](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md)。

## 無人走行 {/* #unattended-runs */}

`--permission-prompts none` を `run` に追加して、無期限に待機する代わりに、未解決の人間の相互作用を低下させます。 選択した承認プロファイルと記憶された助成金はまだ適用されます。 ユーザの質問が拒否され、ヒューマンレビューが必要な計画は拒否されます。 これは、すべてのアクションを承認しません。

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

オプションは、この呼び出しにのみ適用され、セッションの設定として保存されません。 `--plan-first`と併用できません。 最終的なステータスとエラーを調べる: 人間の待ちを避けてタスクの完了を保証するものではありません。 ホスト機能`permission-prompts-none`のクライアントチェック。 古いホストが`unsupported_capability`を返す場合、マッチングクライアントとアプリを更新します。
