---
title: "初回設定"
last_update:
  date: '2026-11-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 初回設定 {/* #first-time-setup */}

最初の実行ウィザードには、環境、データの場所、エージェントのランタイム、モデルプロバイダー、およびNotebookランタイムの5ページがあります。 `Back` とページの一番下に移動のプライマリアクション。 現在のページが要件を満たしているまで、プライマリアクションは利用できなくなります。

<PlatformGuide />

初期設定後、[エージェント設定](frameworks.md#update-codex) で古いアプリ管理 Codex のランタイムを更新できます。 モデルプロバイダを選ぶとは別々です。

## 1. 環境 {/* #1-environment */}

**Prepare environment** で起動します。 アプリは、エージェントのインストールやモデルの接続を依頼する前にホストをチェックします。 各行にはステータスと説明が含まれています。 注意が必要な要件を識別するための説明を使用します。

| チェックまたはコントロール | それが意味するもの | 何をすべきか |
| --- | --- | --- |
| システムの互換性 | オペレーティングシステムとアーキテクチャをチェックする | 検出されたプラットフォームがコンピュータと一致することを確認してください |
| アプリのストレージ権限 | アプリのコンフィギュレーションフォルダへのアクセスを確認する | 失敗した場合は、表示されたパスへのアクセスを解決し、再度確認します。 |
| 安全な認証情報のストレージ | オペレーティングシステムのクレデンシャルボルトが利用可能かどうかを確認します。 | 資格情報を入力する前に、ボルトの問題を解決する |
| インストール用ネットワーク | サポートされているパッケージソースをチェックし、到達可能なソースをレポートします。 | 選択したソースとレイテンシーを読んでください。 結果はネットワークに依存します |
| `Check again` | 環境チェックを繰り返します | 条件を修理した後使用して下さい; ラベルが表示される `Checking…` チェック中にボタンが無効になっています。 |
| `Continue` | データロケーションを開く | 必要なホストがパスを点検した後利用できる; チェックが実行中は無効です |

**Environment**のステップを開き、4列をすべて読み、**Check again**を選択し、**All required environment checks passed.**を待ってから**Continue**を選択します。 この環境チェックでは、API キーまたは有料モデルコールを必要としません。 モデル認証を後で設定します。

十分な空き容量で安定したデータ場所を選択します。 オペレーティングシステムは、アプリケーションが英語を使用している場合でも、独自の言語でネイティブフォルダのダイアログを表示することができます。

各チェックの説明をステータスとともにお読みください。 エージェントが既にインストールされている場合は、インストールネットワークチェックはダウンロードを必要としません。 外部サービスへのアクセスは確認できません。

<PlatformContent platform="macos">

![macOS 初回設定時環境チェック完了](/img/open-science/macos/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="windows">

![Windows 初回設定時の環境チェック](/img/open-science/windows/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="linux">

![Linuxの初回設定時に渡る4つの環境チェック](/img/open-science/linux/setup-environment.webp)

</PlatformContent>

## 2. データの場所 {/* #2-data-location */}

<PlatformContent platform="macos">

![フォルダを選択する前にデータの場所](/img/open-science/walkthrough-2026-09-08/02-data-location.webp)

</PlatformContent>
実行時間をインストールする前に、大きなファイルの場所を選択します。 成果物、ノートブック、環境はデータの場所を使用します。 設定と履歴は、設定場所にあるままです。 表示されたパスは、テキストフィールドではなく、読み取り専用の要約です。

| コントロール | アクションと結果 |
| --- | --- |
| `Location` / データロケーションパス | 有効なデフォルトか提案されたデータ フォルダーを表示 |
| `Browse…` | システムディレクトリピッカーを開きます。 親フォルダーを選択します。 返却後の最終アプリ管理パスを調べる |
| システムピッカー `Cancel` | 現在の選択を取り替えないでピッカーを閉める |
| `Use default location instead` | カスタム選択後に出現する。 その選択と関連するエラーをクリア |
| `Back` | 環境に戻る |
| `Continue` デフォルト位置で | エージェントのランタイムに進む |
| `Continue` カスタムの場所を選択した後 | リリース `Restart to set up your data?`; 新しいフォルダをサイレントにアクティブにしません |
| `Retry` | デフォルト位置情報が読み込まれていない場合、表示されます。 再び読み込むトリス |

<PlatformContent platform="macos">

![選択されたカスタム親と最終アプリ管理パスが表示されます。](/img/open-science/local-acceptance/data-location-selected.webp)

</PlatformContent>
**Browse…** を選択し、十分なスペースでディスクに空の親フォルダを選択し、ウィザードによって示されている完全な管理されたパスを調べます。 **Continue** を選択し、再起動確認をお読みください。 一時的なフォルダーではなく、安定した研究データ位置を使用してください。

<PlatformContent platform="macos">

![選択したデータの場所の確認を再起動する](/img/open-science/local-acceptance/data-location-confirm.webp)

</PlatformContent>
| 確認制御 | 結果 |
| --- | --- |
| クローズ (閉じる)`×`) | データの場所に戻り、提案されたパスを保持します |
| `Keep default` | 提案した場所をクリアし、デフォルトで事前に設定します。 |
| `Restart` | 選択したデータの場所をアクティブ化し、アプリを再実行します。 ウィザードはエージェントのランタイムで再開します |

アプリは、受信前にフォルダを検査します。 既存の認識されたデータフォルダは、所定の位置に採用することができます。 ページでは何も動かされないことを説明しています。 不要な選択はエラーを表示します。 アクティベーションや再起動が失敗した場合、ページはエラーを表示し、再試行またはデフォルトの場所を提供することができます。 app-managed フォルダーを手動で移動または名前を変更しないでください。

### 既存のデータフォルダを採用 {/* #adopt-an-existing-data-folder */}

1. **Browse…** を選択し、認識されたアプリ管理データフォルダーを含む親を選択します。
2. **This folder already contains Open Science data — it will be used as-is (nothing is moved).** 完全な目的地を確認し、**Continue → Restart**を選択します。
3. 再起動後、ウィザードは**Agent runtime**で再開します。 選択したデータの場所は保持されます。 残りのセットアップ手順を続けてください。

採用後、代表的なファイルを再オープンし、想定したデータを確認します。 採用は大きいファイル記憶を変えます; 別のインストールの設定、会話データベース、または資格情報をインポートしません。 **Keep default**は提案された場所を取り除き、前の有効な位置と続行します。

### 保存場所が保存できないときに回復する {/* #recover-when-the-location-cannot-be-saved */}

ページが**ストレージの設定を完了できません: EACCES: 許可拒否**を報告したら、エラーのパスを調べます。 設定ディレクトリも書き込み可能である必要があります。 書き込み可能なデータ転送先を選択すると、解決しない場合があります。 影響を受けたアプリ所有の構成場所へのアクセスを復元し、操作を再試行するか、**Use default location instead → Continue**を選択します。

<PlatformContent platform="macos">

![実際の構成ライトの失敗および回復制御](/img/open-science/local-todo-batch/56-onboarding-config-write-error.webp)

</PlatformContent>
位置が変更される前に再起動が失敗した場合、設定の書き込みアクセスを復元し、ウィザードを再オープンします。 移動を再試行する前に、アクティブなパスと既存のファイルを確認してください。 [ストレージ](storage.md) を参照してください。

## 3. エージェントランタイム {/* #3-agent-runtime */}

セッションを実行する Agent ランタイムを選択します。 組み込みに新しいv1.2.0セットアップデフォルト **Open-Science Agent**そのため、その選択のために別のエージェントのインストールは必要ありません。 互換性のある API プロバイダーが必要です。 ご利用の場合 **Codex subscription**、選択し、準備して下さい **コードx** 代わりに、Cordxの手順は、そのオプションを示しています。 意図したランタイムが準備完了したら続けてください。

<PlatformContent platform="macos">

![Codexインストールソースメニュー](/img/open-science/walkthrough-2026-09-08/05-agent-install-menu.webp)

</PlatformContent>
1. **Codexのインストール** を開きます。
2. メニューで推奨するアプリ管理インストールソースを選択します。 代替は、グローバルnpmインストールを使用します。
3. 取付けが終了するのを待って下さい。 インストーラが実行中に別のインストールを開始しないでください。
4. Codex がバージョンと **Active** を表示していることを確認します。
5. **Continue** を選択してモデルプロバイダを開きます。

<PlatformContent platform="macos">

![Codexがインストールされ、アクティブなランタイムとして選択](/img/open-science/walkthrough-2026-09-08/06-agent-codex-ready.webp)

</PlatformContent>
バージョンラベルは、選択したモデルではなく、インストールされたエージェントまたはアダプターを識別します。 スクリーンショットの正確なバージョンを期待するのではなく、インストールされた値を調べます。

<PlatformContent platform="windows">

互換性のあるエージェントが既にインストールされている場合は、そのカードを選択し、継続する前に**Active**を確認してください。 下のWindowsスクリーンは既存のCodexの取付けを使用します; 再インストールは、ウィザードを通過するだけでは不要です。

![Windows セットアップウィザードでアクティブに選択した既存の Codex エージェント](/img/open-science/windows/setup-agent-active.webp)

</PlatformContent>

| 制御または状態 | ビーキャビター |
| --- | --- |
| フレームワークカード | インストールステータス、バージョン、ランタイムパス、フレームワークがアクティブかどうかを表示します。 |
| **Install…** | フレームワークのサポートされているインストールソースを開きます。 |
| インストール進行状況 | レポートのセットアップ活動; 実行中にインストール制御と再検出が利用できなくなります。 |
| **Re-detect** | インストールされたランタイム情報を更新します。 ラベルが表示される **Detecting…** チェック完了まで。 設定 → エージェントから再検出することもできます。 |
| **Uninstall** | アクティブランタイムでは利用できません。 削除する前に別のインストールフレームワークに切り替えます。 |
| **Back** | セットアップ操作をブロックしないと、データ位置に戻ります。 |
| **Continue** | アクティブランタイムが準備できたら、 |

フレームワーク固有のインストール、スイッチ、修理、削除については、[エージェントフレームワーク](frameworks.md)を参照してください。

## 4. モデルプロバイダー {/* #4-model-provider */}

フォームは、**Provider type**、選択したエージェント、認証方法により変更されます。 Codex サブスクリプションでは、**Import existing Codex sign-in** は既存のローカルサインを Open-Science にコピーします。 そのアカウントを接続したい場合は、接続チェックを待ちます。

<PlatformContent platform="macos">

![認証前の英語Codexサブスクリプションフォーム](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

</PlatformContent>
API プロバイダーでは、そのタイプを選択し、そのプロバイダーが必要とするエンドポイントとモデルの詳細を入力し、**Test & continue** を使用します。 ウィザードは、テストを送信する前に必要なフィールドを検証します。 成功したテストはウィザードを進行させます。 検証または接続エラーは、修正のために表示されません。

<PlatformContent platform="macos">

![必要なフィールドエラーを示すカスタムゲートウェイ](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

</PlatformContent>
認証選択、高度なフィールド、接続エラーから回復するための[プロバイダーのセットアップ](providers.md)を参照してください。

専用のクレデンシャルフィールドにAPIキーを保持します。 スクリーンショット、プロジェクトの指示、または会話メッセージに含めないでください。

## 5. Notebook ランタイム {/* #5-notebook-runtime */}

このオプションの最終ページは、完全な**Settings → Runtimes**インターフェイスを再使用します。 デフォルトでは、ノートブックはapp-managed Pythonを使用します。 検出された通訳者を選択するか、後で別の環境を準備できます。

| ウィザード制御または状態 | ビーキャビター |
| --- | --- |
| **Back** | モデルプロバイダーに戻ります。 ランタイムのプロビジョニング時、または設定を終了時に無効に。 |
| **Finish** | オンボーディング完了を保存します。 Notebook セットアップはオプションなので、準備が整ったカスタム通訳は必要ありません。 |
| すでに進行中のセットアップ | 退去前にセットアップを終了または中止するのを待ってください。 **Back** そして、 **Finish** 部分的な環境を残すことを避けるために無効にされます。 |
| 完了エラー | 失敗を表示し、別の試みを許可します。 |

**Finish**の後、ホームが開き、その後、[ファーストプロジェクト](first-project.md)を使用して小さな結果を保存します。 アプリケーションを再オープンし、プロジェクトが残っていることを確認します。 セットアップが再出現する場合、別のプロファイルを作成する前に、データの場所と設定書き込みエラーを調べます。

<PlatformContent platform="windows">

Windows **Notebook runtime**のページでは、**Local Shell · WSL2 Bash Preview** を表示することもできます。 フィードバック **Optional — nothing here is required to finish setup.** 選ぶことができます **Finish** しばらくお待ちください Python///////////////////////R セットアップは延期され、 WSL2 利用できません。 コード実行を要求する前に、必要なランタイムを用意します。 wizard のコンパイルは、これらのオプションの環境をインストールしません。

![Windowsは利用できる終わりを用いるNotebookおよびWSL2設定を任意にしました](/img/open-science/windows/setup-optional-runtimes.webp)

</PlatformContent>

## 最終セットアップチェックリスト {/* #final-setup-checklist */}

| チェックイン | 期待される証拠 | 失敗した場合 |
| --- | --- | --- |
| 環境 | 必須のチェックが渡されます。 | 表示された条件を解決した後再点検して下さい。 |
| データの場所 | 最終的な管理された道は意図された位置です。 | 位置ページに戻る。 ピックア単独で最後のパスを差し込みません。 |
| エージェント | インストールされたバージョンとアクティブ状態。 | インストールログとredetectを調べます。 |
| プロバイダー | 検証された接続と選択されたメインモデル。 | サインインまたはプロバイダ固有のフィールドを再確認します。 |
| Notebook | コードの実行が必要な場合は、準備が整いました。 | 設定する **Settings → Runtimes** 解析依頼の前に。 |
| 最初のタスク | エージェントの応答と検査可能な保存出力。 | モデル接続とは別に権限とツールのエラーを調べます。 |





## セットアップを後で変更する {/* #change-the-setup-later */}

ウィザードを再実行する必要はありません。 モデル、エージェント、ランタイム、およびストレージマップを同じ選択に表示します。 データルートが破損しているか、アプリケーション設定ディレクトリが書き込み不可能な場合は、&#91;設定&#93;→&#91;ストレージ&#93;は修復アクションを表示します。

## ソース参照 {/* #source-reference */}

[オンボーディングWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [環境ステップ.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [ロケーションStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
