---
title: "コネクターおよび資格情報"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# コネクターおよび資格情報 {/* #connectors-and-credentials */}

Connector は、サービスのツールをエージェントに利用できるようにします。 そのサービスは、そのサービスが要求する際の認証をクレデンシャルサプライズします。 Skill をインストールするか、タグを割り当てると、サービスが接続されません。

バッチ管理では、操作を適用する前に、選択したカウントを下部のアクション領域で確認します。 完了または失敗のフィードバックを読んで、その結果の項目を確認してください。 エントリーのみを選択すると、有効化、インストール、削除は行いません。

## ビルトインConnectorを使う {/* #use-a-built-in-connector */}

### 遺伝子発現プロジェクトのためのツールを探す {/* #find-tools-for-a-gene-expression-project */}

**Settings → Connectors**を開き、**Omics アーカイブ**を検索し、詳細を開きます。 このビルトインファミリーには、GEO、ArrayExpress、MetaboLights、MGnify、PRIDEツールが含まれています。 選択する前にツールの行を拡大します。

![GEOメタデータツールとその明示的なダウンロード境界](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series` は、GEO シリーズのメタデータ、サンプル、プラットフォーム、および補足ファイル URL を返します。 返されたソースから必要なデータテーブルをダウンロードし、計算を要求する前にプロジェクトに添付してください。

**トランスクリプトオミクス** などのタグを Connector に割り当て、**Settings → Tags** で見つけます。 タグは、アクセスやツールの承認を変更することなくリソースを整理します。

| 状態 | それが確立するもの | 次の検証 |
| --- | --- | --- |
| ディレクトリにリスト | アプリは Connector 定義を知っています。 | 実際のツールの説明を読む |
| Used by | エージェントの可用性 | 目的の代理店および機能結合を確認して下さい |
| 選択された資格 | 名前付きバインディングが存在します | 意図したサービスに対するテスト認証 |
| ツールポリシー | コールが許可されているか、要求されるか、または妨げられるかどうか | 記憶された許可の優先順位を点検して下さい |
| 成功したツール結果 | 特定のコールが完了しました | 返された識別子/データおよびソースの検証 |

### 内蔵Connector制御 {/* #built-in-connector-controls */}


**Search connectors** を使用して、**Directory** の下で PubMed を検索します。 リストには、**Featured** と **Custom** のグループも含まれています。 マッチング結果が下に見える間、フィルタリングはグループごとに適用されますので、別のグループは**コネクターがあなたの検索に一致しません**を言うことができます。

**Filter connectors by group**、**Filter Connectors by agent**、**Filter by Tag**を一緒に検索して使用してください。 **Manage credentials** は、共有の連絡先メール/認証設定を開きます。 **Used by** は空室状況を表示します。 **Manage Tags**はConnectorを整理します。 リソースの**Manage access**制御を使用して、Mainエージェントとスペシャリストへのアクセスを1か所で確認し、調整します。

#### 各エージェントへのアクセスの管理 {/* #resource-access */}

1. **Settings → Connectors**でConnectorを見つけ、**Manage access**コントロールを選択します。
2. **メインエージェント**とリストされているスペシャリストのレビュー。 利用可能な場合、ロールリストを検索します。 目的の関連付けだけを変更します。 ロールエディタは、その機能リストを管理するための別の方法を残します。
3. ポップアップを開き、**Used by**を確認してください。 結合は無効なSpecialistに割り当てることができます; そのロールを有効にしないと割り当てる。

![Mainエージェントと個人スペシャリストのConnectorアクセス](/img/open-science/v0330/resource-access.webp)

このConnectorを除く**Full access**のロールは、リソースごとの例外を作成します。 選択したアクセスを持つロールは、明示的なリストを使用します。 マーケットプレースのロールバインディングは、ここでのみ読み込みます。 犯罪者、サーバーの信頼性および操作の承認は、これらの協会とは別です。 Connector の割り当ては、これらの手順を完了しません。

#### 複数のコネクタの有効または無効化 {/* #enable-or-disable-several-connectors */}

**Settings → Connectors** を開き、リストをフィルタリングし、関連するグループで **Select multiple** を選択し、意図したコネクタを選択します。 選択されたカウントを有効または無効にする前に確認し、各返された状態を確認します。 作業に必要なサービスのみを有効にしてください。 バルク可用性の変更は、資格情報を提供していません。, パーツールの承認ポリシーを変更したり、Specialistアクセスを許可します。; それぞれ設定します。

#### PubMed: 可用性、ツール、および承認ポリシー {/* #pubmed-availability-tools-and-approval-policy */}

1. **パブメッド**を検索し、詳細を開きます。
2. **search_articles** を拡張し、説明を読んでください。 PMIDsのカウントとページを返し、PubMedクエリタグ、Boolean演算子、日付、およびソートをサポートしています。
3. **Require approval**、**Block**、**Always allow** を選択して、許可するアクセス権を取得します。 承認の表示 **Ask when no Session, Project, or Global permission applies.** を要求して下さい
4. **Manage access** で PubMed の **Main Agent** を有効にし、**Used by** を確認します。同じポップアップで、利用させる各 Specialist の設定を個別に確認します。

![PubMed ツールの説明と承認制御](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

`search_articles`、`get_article_metadata`、`find_related_articles`、`lookup_article_by_citation`、`convert_article_ids`、`get_full_text_article`、`get_copyright_status`の詳しいリストです。 ツールごとに**Always allow**、**Require approval**、**Block**を選択してください。 Connector-ワイド**Skip approvals**スイッチを別々に見直し、有効化します。 説明を開くだけで、ツールの指示が表示されます。

**Directory** のディレクトリは、**Featured** のバッジを表示している。 ディレクトリ配置とバッジは、アカウントの接続状況を示すものではありません。

<ToolOperationGroup>
<summary>小さなGEOメタデータルックアップを実行</summary>

### 小さなGEOメタデータルックアップを実行 {/* #run-a-small-geo-metadata-lookup */}

<p className="example-label"><strong>実践例</strong> GEOでGSE60450サンプルメタデータを調べる</p>

1. 研究セッションに戻り、作業モデルとOmicsのアーカイブの可用性を確認します。
2. お問い合わせ: `Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. 要求されたConnector/methodと引数を調べて、許可します。 ツールは、`accessions` 配列を期待します。 推測された単数フィールドが間違っています。
4. 実際の結果を確認します。 このアクセスについては、返された**GSE60450**、**ムスカルス**、**12サンプル**、および「乳食対妊娠中の哺乳類の腹部および血管細胞サブポピーションのトランスクリプト分析」のタイトルを確認してください。
5. 返されたGSM識別子を特性に保ちます。 行列の MCL1 列名を単独で囲む必要はありません。

![Connectorで返された実際のGEOサンプル特性](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

返されたサンプル範囲は、Luminal/basalの人口と処女、18.5日妊娠および2日授乳段階をカバーした**GSM1480291-GSM1480302**でした。 これらは、カウント合計から推論されるラベルではなく、メタデータを返します。 <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>地理サンプルメタデータ.csv</a>として全12列応答テーブルをダウンロードしました。 これは、管理されたQCのアーティファクトから分離された会話テーブルのエクスポートです。

Connector 命令ファイルが見つからない場合は、EPERM エラーを保持し、有効な Connector と現在のセッションを確認します。 再試行の前に [Connectorパラメータ](../reference/connector-operations.md) の操作フィールドを確認します。 有効なメタデータクエリは構造化されたレコードを返します。 アンダーリーティングのソーステーブルをダウンロードしたり、解析を実行したりしません。


</ToolOperationGroup>

## コネクターを追加します。: 共有アイデンティティ フィールド {/* #add-connector-shared-identity-fields */}

**Add connector**は**Local command**、**Remote server**、**Import configuration**を提供しています。 エディタをタイプセレクターで開く最初の2つは、**Advanced settings**は追加のフィールドを公開します。 スクリーンショットは、イラストのエンドポイントを使用します。 実際に利用するサーバーを接続します。

| フィールド | 業務内容 |
| --- | --- |
| コネクタの種類 | ローカルプロセスとリモートエンドポイント間の切り替え。 |
| 表示名 | UIに表示されている名前。 |
| 上級 → Connector 名 | 使用する呼称名 `host.mcp`, Specialist 結合, 生成された MCP Skill; 可能な表示名から生成される。 |
| コネクタ ID | 可能であれば生成される任意安定したID。 作成前の編集可能、その後の不変。 |
| 説明 | 提供されるデータ/アクションのオプションの説明。 |
| このコネクタを信頼します | カスタムConnectorを加える前に必須の信頼の認識。 本サービスを検証したり、コードを安全にしたりすることはありません。 |
| 取消/コネクターに戻る | フォームから送信してください。 ドラフトを保存しません。 |
| コネクターを加えて下さい/加え、署名して下さい | 有効な設定を保存し、OAuth でサインインします。 必要なフィールド、バインディング、またはトラストが欠落している間、ボタンは無効です。 |

### ローカルコマンド {/* #local-command */}

**Command**は`npx — Node package`、`uvx — Python (uv)`、`node — script file`、`python3 — script file`、`docker — container`および**Other…**を提供します。 その他の**Custom command**は、絶対実行可能なパスを明示します。

| 高度な入力 | 操作 |
| --- | --- |
| 引数 | 行ごとの1つの引数; スペースとブランクの線が保存されます。 すべての引数を削除するためにフィールドをクリアします。 スペース区切りのシェルコマンドは複数の引数にパースされます。 |
| 変数名 | 環境変数の名前をつけて下さい、それから選択して下さい/クリデンシャルを創作して下さい。 |
| 変数の追加/変数の削除 | 名前付き結合を追加または削除します。 |
| フィールド/テキスト | 名前を構造化された行または 1 つとして入力して下さい `KEY=` ラインごとの; 秘密の値は、クレデンシャルに住んでいます。 |
| コマンドプレビュー | 結合の後で示される進水器を点検して下さい。 |

![ローカルコマンドエディタとクレデンシャル・バウンド環境変数](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

ランチャーエントリーだけでは、その実行可能またはサービスが運用されていることを証明しません。 インポートされたローカルコマンドをチェックするには、下の呼び出しを使用してください。

### リモートサーバー {/* #remote-server */}

サーバ事業者が供給する実際の**Server URL**を入力してください。 これらのスクリーンショットの`https://example.org/mcp`は、動作するMCPエンドポイントではなく、機能的な予約ドメインアドレスです。

**Advanced → Transport** デフォルトは **Streamable HTTP** です。 **Authentication**は**None**、**OAuth (browser sign-in)**、**Static headers**を提供しています。

#### 静的ヘッダー {/* #static-headers */}

現在のエディタは、認証情報にバインドします。 単なる秘密値のテキスト領域ではありません。

1. **Static headers** を選択します。
2. `Authorization`などの**Header name**を入力してください。
3. 対応する**Credential**を選択または作成します。 ヘッダーが名前を持っているまでセレクターは無効です。
4. **Add header** は、別の行または **Remove header** で行を破棄します。
5. **フィールド/テキスト** は、名前の入力を変更します。 テキスト モードは、`Name:` として 1 行につき 1 つのヘッダー名を期待します。 クレデンシャル値が別途管理されます。

![静的ヘッダー名とクレデンシャルセレクター](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### OAuthバインディング {/* #oauth-binding */}

リソースURL、トランスポート、登録に一致する**OAuth credential**を選択します。 **New credential** は [クレデンシャルエディタ](../tools/credentials.md#new-credential) を開きます。 この空のプロファイルでは、フォームは**No OAuth credential matches this Connector's resource URL, transport, and registration.**を報告しました。最終的なアクションは**Add and sign in**に変わります。

![OAuth 認証マッチング](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## インポート、エクスポート、接続テスト {/* #import-export-and-connection-tests */}

**Add connector → Import configuration** を選択し、JSON ファイルを 256 KB まで選択します。 輸入業者は受け入れます Open-Science Connector 設定または設定 MCP クライアントファイルを含む `mcpServers`. . . .

1. マルチサーバファイルの場合は、**MCP server** のエントリーを選択します。 1つのサーバーを一度に見直し、追加します。 エントリを切り替えた後、名前、ID、転送、コマンド引数をチェックします。
2. 診断を読んで下さい。 別のコンピュータで絶対パスを変更する必要があるかもしれません。 輸入からクレデンシャル値が除外されます。
3. **Use configuration** を選択して、プレフィルドエディタを開きます。 すべてのフィールドを見直し、必要なローカル資格情報を結合し、**I trust this connector**を選択します。
4. **Add connector**を選択し、リスト内の接続状態を調べ、小さな読み取り専用ツールを呼び出します。

![サーバーを選択し、必要な資格情報を確認する](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

インポートされたサーバが `QC_EXAMPLE_TOKEN` などの環境変数を参照する場合、このデバイスに保存されているクレデンシャルにその名前をバインドします。 **Add**は、必要なバインディングが完了するまでは利用できません。 追加後、**Connected** を確認し、意図したツールを実行します。 保存された結合は、リモート認証を検証しません。

`get_dataset_summary` を呼び出すと、返されたフルサンプル ID を `get_sample_qc` に渡します。 [QCのベースライン](../reference/example-data.md) との応答を比較します。 このサーバーは保存されたサマリー値を返します。 元の行列を返さない。 [カスタムツールを作成する](../tools/custom.md) でサーバの実装がカバーされます。

### 輸出入・輸出入 {/* #export-and-reimport */}

行の**Actions → Export**を選択し、**Open Science Connector**または**MCP client config**を選択し、プレビューを調べ、**Save configuration**を選択します。

![認証名を保持し、ローカルパスを報告するエクスポート](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

実際のエクスポートされたファイルは、`required_secrets.environment` の変数名を保持しました。 デモのクレデンシャル値、ローカルの信頼、または許可は含まれていません。 Reimport はローカルの資格選択を要求し、再度信頼します。

同一のIDが既に存在する場合、プレビューは**IDでカスタムConnector ...既にインストールされています**、**Use configuration**は利用できません。 既存の接続を変更するには、**Edit** を使用します。 インポートは上書き操作ではありません。

![既存のIDブロックの重複インポート](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

エクスポートされた接続を復元するときは、プレフィルドフィールドを調べて、再び必須の認証情報を結合します。 完全な信頼と研究でそれを使用する前に境界された呼出しをテストして下さい。 インポートは、同じIDで既存のConnectorを上書きしません。

## 犯罪者:サービスおよび再利用可能な秘密 {/* #credentials-services-and-reusable-secrets */}

[サービス資格情報](../tools/credentials.md) で秘密を作成し、管理し、環境、ヘッダ、OAuth のバインディングで名前を選択します。 新しいデバイスで、これらのバインディングを復元し、接続をテストする前にサービスのサインインを完了します。 エクスポートには、構成の参照、使用可能な秘密やローカルの信頼が含まれていません。

## HTTPエラールックアップ {/* #http-error-lookup */}

400、401、403、404、429、または5xx応答については、[HTTPトラブルシューティングテーブル](troubleshooting.md#http-errors-400-403-429-and-5xx)を使用してください。 応答サービスおよびステータスコードの詳細なメッセージを保持します。
