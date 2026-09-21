---
title: "サービス資格情報"
last_update:
  date: '2026-09-20'
---

# サービス資格情報 {/* #service-credentials */}

**Settings → Credentials** の認証情報を実際にリクエストするサービスです。 Codex のサブスクリプションはモデルアクセスを供給します。 OpenAlex、GitHub、カスタムMCPアカウントは提供していません。

## 組み込みサービスエントリ {/* #built-in-service-entries */}

| サービス | フィールドと目的 | 確認方法 |
| --- | --- | --- |
| GitHub | Skill 発見/インポートのための個人アクセストークン | Connect/Manage とトークンのコントロールを使用します。 意図したリポジトリの操作をテストします。 |
| 文献アクセス | 電子メールおよび任意NCBI APIのキーに連絡して下さい | 連絡先情報を保存します。 NCBIキーは、サポートリクエストのオプションです。 |
| OpenAlex | 文学におけるOpenAlex操作のためのAPIキー | 入力したキーを有効化し、保存し、バインドされたクエリを作成します。 |
| Unpaywall | 完全なテキスト位置検索のための電子メールに連絡する | 構成された文献の電子メールを使用して下さい; 発明されたアドレス無し。 |

**Connect** は、未設定のサービスを開きます。 **Manage** は既存のものを開きます。 **Desktop only**は、クレデンシャル操作がデスクトップのコンテキストを必要とすることを意味します。 保存キーインジケータは秘密値そのものではありません。

## 不足しているOpenAlexキーを追加 {/* #openalexs-actual-missing-key-flow */}

1. OpenAlex の検索をリクエストし、キーが設定されていないまま検索します。
2. **API key** フィールドで **Add your OpenAlex API key** を表示します。
3. **Save key** は入力されたキーを貯え、成功すると待ち受けるコールを再開します。 **Not now** は、クレデンシャルを未設定のままにします。
4. 最終的なツールのステータスをお読みください。 **Not now** を選択すると、**credential_required** を返すことができます。 再試行の前にキーを構成します。

![OpenAlex は、英語アプリでクレデンシャルリクエストをリクエストします。](/img/open-science/capabilities-walkthrough/25-openalex-credential-request.webp)

プロンプトは、キーがこのコンピュータ上で暗号化され、`api.openalex.org`にのみ送信される状態を述べます。 設定では、OpenAlex フォームは、**Validate**、**Save**、**Remove key** を 1 つ存在し、**Cancel** も提供しています。 置換フィールドは、保存されたキーを明らかにしません。 セキュアなストレージエラーは、システムキーチェーンの状態を解凍して、秘密を保存する必要があります。

## カスタムコネクタの認証 {/* #credentials-for-custom-connectors */}

ここでクレデンシャルを作成し、[コネクタ構成](../guides/connectors.md)にその名前を選択します。 共有資格を変更または削除する前に、消費者を尊重します。

### 新しい資格情報 {/* #new-credential */}

| フィールドまたはボタン | 操作 |
| --- | --- |
| 名前 | 認証可能なローカルラベルを提示します。 |
| 型 | 詳しくはこちら **API key**, **Access token**, または **OAuth**. |
| 値 | キー/トークンのマスクされたフィールドに秘密を入力します。 必須項目を空にしておくと、無効なフィールドを保存します。 |
| OAuth → リソース URL | 正確なリソースエンドポイントを供給します。 Connectorマッチングは、リソースURL、輸送、登録によって異なります。 |
| 高度な → 輸送 | OAuth サービスで必要なトランスポートを選択します。 ストリーム可能な HTTP は、検査されたデフォルトでした。 |
| スコープ | スペースまたはコンマで区切られたスコープを入力します。 |
| 事前登録済みのクライアントを使用する | 表示 **Authorization server URL**, **Client ID**, **コールバックURL**, と **Client secret**. |
| コールバックURL/コピー | 点検されたデフォルトはありました `http://127.0.0.1/oauth/callback`; サービスの登録のためにそれをコピーするか、またはカスタムコールバックオプションを展開します。 |
| ディスカバリー | 該当する場合、サーバーメタデータを発見します。 これは、それ自体によって成功したサインではありません。 |
| キャンセル/保存 | 草案を破棄するか、有効なクレデンシャル設定を保存します。 |

![OAuth 高度な登録フィールド](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

カスタム Connector では、クレデンシャルをヘッダ、環境変数、または OAuth セレクターにバインドします。 名前は参照です; 説明やプロジェクトの指示に秘密の値を置かないでください。 輸出されたポータブル構成は、プレースホルダーとシークレットを交換します。 保存されたクレデンシャルはまだ実際のサービス/Connectorテストが必要です。

## 確認とトラブルシューティング {/* #verify-and-troubleshoot */}

保存後、1つの小さな操作を繰り返し、応答を検査します。 `credential_required` は、未設定の秘密、401 を使用して、検証の失敗、および 403 は、拒否されたアクセス/政治を調査します。 403 はキーを交換することで完全に固定されません。 429の心配率/使用法の限界。 サービスの実体を読んで、[トラブルシューティング](../guides/troubleshooting.md)を参照してください。

クレデンシャルを取り戻すと、Connector の全ての境界線に影響します。 Connector と Specialist は、意図的に使用済みの秘密/トラストを除外します。 受信デバイスで再び設定します。 Skill、プロンプト、スクリーンショット、または問題報告に秘密を貼り付けないでください。

OpenAlex クエリは、有効な OpenAlex キーが必要です。 OAuth コネクタは、名前付きサービスのサインインを補完する必要があります。 同一の小さなクエリを再試行する前に、表示された認証エラーを解決します。

実装参照: [クレデンシャルパネル.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx)、[コネクタAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx)。

[CLI/SDK 認証管理](../reference/cli.md#manage-connectors-and-credentials)は認証されたローカルアクセスで共有された認証情報を作成/更新できます。 Linuxヘッドレスインストールは、明示的に[暗号化されていないファイルストレージ](../reference/server.md#credential-storage-on-headless-linux)を選ぶことができます。 デスクトップの認証は、通常のOSストレージの動作を保持します。 このオプションは、 Compute パスワード ストレージを解決したり、初回の OAuth ログインを開始したりしません。

## 公式APIキーページを開く {/* #official-api-key-page */}

v0.31.0、OpenAlex、NCBIのクレデンシャルプロンプトから、公式のAPIキーページへのリンクが含まれています。 フォームドラフトを保ち、Connectorコールを待ちます。 サービスのアカウントの手順を完了し、クレデンシャルフォームに戻り、クエリを再試行する前に意図したキーを検証して保存します。 キーページを開くだけで、キーを保存したり、待機クエリを完成したりすることはできません。
