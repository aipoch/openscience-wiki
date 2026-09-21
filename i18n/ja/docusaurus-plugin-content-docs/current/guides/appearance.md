---
title: "外観と通知"
last_update:
  date: '2026-09-16'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import PreferenceScreenshot from '@site/src/components/PreferenceScreenshot';
import Screenshot from '@site/src/components/Screenshot';

# 外観と通知 {/* #appearance-and-notifications */}

使いやすいテーマを選択し、インターフェイス言語を設定し、別のアプリで作業中にタスクアラートを受信します。 **Settings → General** を開き、これらの設定を調整します。 Open-Scienceはこの装置であなたの出現の選択を思い出させます。

<PlatformGuide />

## テーマとインターフェイス言語の変更 {/* #change-theme-and-interface-language */}

1. **General → Appearance**では、**Theme**を見つけます。
2. **System** を選択してデバイスをフォローするか、**Light** または **Dark** を選択して、固定された外観を維持します。 いつでも戻すことができます。
3. **Language** では、お好みのインターフェイス言語、または **System** を選択して、デバイス言語を使用します。

<PlatformContent platform="macos">

![一般的な外観設定](/img/open-science/v0.27.0/07-general-appearance.webp)

</PlatformContent>

<PlatformContent platform="windows">

<Screenshot src="/img/open-science/windows/general-settings.webp" alt="Windowsのテーマと言語制御全般の設定" width={1920} height={1017} windowBounds={[480, 165, 960, 690]} href="/docs/img/open-science/windows/general-settings.webp" linkLabel="完全なWindowsの一般的な設定のスクリーンショットを開く" />

</PlatformContent>

| おすすめ商品 | 変更点 |
| --- | --- |
| テーマ → システム | アプリは、デバイスの光/ダーク設定に従います。 |
| テーマ→ライト/ダーク | 選択したテーマは、システムテーマの変更時に固定されます。  |
| 言語→システム | アプリは起動時にデバイス言語を読み取ります。 システム言語を変更した後、アプリを再オープンして適用します。 |
| 特定の言語 | アプリは、そのインターフェイス言語を使用します。 保存されたプロンプト、ソースファイル、以前のモデルの回答は、元のテキストを保持します。 |

**Settings → General → Appearance**では言語とテーマの好みが異なります。 ドキュメンテーションのウェブサイトには独自の言語セレクターがあります。 変更すると、アプリの言語は変更されません。 システムファイルダイアログは、オペレーティングシステムの設定に従います。

異なる言語でのレポートリクエストには、会話で指定します。 例えば「英語でのレポートを記述し、元の遺伝子識別子を保存します。」

<PlatformContent platform="windows">

**Windowsで表示スケーリングを調整する**

1. Windows **Settings → System → Display** を開き、**スケールとレイアウト** を検索します。 復元できるように、現在のスケールに注意して下さい。
2. **125%**などの快適なテキストとアプリサイズを選択します。
3. Open-Scienceに戻り、コンポーザーとプレビューを確認します。 より広いテーブルは、水平スクロールバーが必要な場合があります。 必要に応じてプレビューを拡張したり、ウィンドウを最大化したりできます。
4. 変更を解除するには、表示設定に戻り、元のスケールを選択します。 Windows がアプリの再起動を要求する場合、再オープンする前に作業を保存します。

同じレポートは、より大きなスケールで読みやすくなります。 水平スクロールバーを使用して、現在のテーブルビューポートの外側の列を見ることができます。 表示スケールは、保存されたデータではなく、ビューを変更します。

![125でのOpen-Scienceは、テーブルプレビューの水平スクロールバーでスケーリングする割合](/img/open-science/windows/app-scale-125.webp)

</PlatformContent>

## タスク通知を設定する {/* #set-up-task-notifications */}

実行中の解析を離れ、注意が必要なときに戻りたい場合は、アラートを有効にします。

1. **General → Notifications**では、**Task notifications**をオンにします。
2. **Show task content in system notifications**を有効にするかどうかを選択します。 タスク名または詳細がシステムアラートから離れる場合は、オフにします。
3. **System notification status** を読んで、利用可能な場合は **Send test notification** を選択します。 プロンプトが表示された場合、オペレーティングシステムで通知を許可します。
4. 返されたテストステータスとシステムの通知面を確認します。 タスクアラートの場合、タスクが実行中に別のアプリに切り替えます。

<PlatformContent platform="macos">

<PreferenceScreenshot notifications />

</PlatformContent>

| コントロール | エフェクト |
| --- | --- |
| タスクの通知 | 別のアプリを使用している間、タスクの完了、失敗、または承認リクエストのアラートを有効にします。 これらのタスクアラートを停止するためにオフにします。 |
| システム通知にタスク内容を表示 | タスク名とリクエストの詳細は有効化時に含まれています。 プロバイダーのエラーは隠されています。 タスク通知がオフの場合、この制御は無効です。 |
| システム通知の状態 | このデバイスがシステム通知をサポートするかどうかを示します。 |
| テスト通知を送信 | テストリクエストを送信します。 ボタン表示 **Sending test…** 送信中、またはシステム通知が利用できなくなったときに、またはリクエストが無効になります。 |
| 納品されたタスク通知 | Open-Scienceを先に持ち、関連するタスクを開きます。 |

アプリが自動的にサイレントにとどまるタスクと失敗をキャンセルしました。 ホームまたはワークスペースの**Messages**はアプリ内エントリです。 OSの通知権限は別途管理されます。

### システムアラートからタスクに戻る {/* #return-to-a-task-from-a-system-alert */}

<PlatformContent platform="macos">

完了または承認アラートを選択して、会話に戻ります。 バナーが見つからない場合は、macOS 通知センターで Open-Science を検索してください。 グループ化されたスタックを最初に拡大し、特定のアラートを選択します。 承認アラートはタスクを開きます。 アプリ内のリクエストを読み込み、解決します。

</PlatformContent>

<PlatformContent platform="windows">

1. **Task notifications**を有効にして、システム権限をチェックするためにテスト通知を使用します。
2. タスクを送信し、別のアプリに切り替えます。 到着時に**Task completed**または**Approval needed**アラートを選択します。
3. Open-Scienceに戻り、会話と元のリクエストを確認します。 完了アラートは、最終的な結果につながる必要があります。 承認アラートは、引き続き**許可する**または**Deny**を選択する必要がある場合、保留中のリクエストを開きます。 通知を選択すると、実行を承認しません。

バナーが見つからない場合は、Windows 通知センターでアラートを見つけます。 アラートが表示されない場合は、Windowsバナーをチェックし、設定を妨害しないでください。 帰宅すると、**Recent sessions**で元の会話を開きます。 通知テキストは実際の結果の点検を取り替えません。

</PlatformContent>

<PlatformContent platform="macos">

![タスクの詳細を隠した英語システム完了アラート](/img/open-science/priority-completion/07-system-completion-notification.webp)

</PlatformContent>
**Show task content in system notifications**をオフにして、一般的なアラートを使用します。 完了または承認アラートを選択して、会話を再開します。 アプリ内の承認に対応。

### 通知が表示されない場合 {/* #if-a-notification-does-not-appear */}

試験結果から始めて、適用条件を確認してください。

| 結果または症状 | 次をチェックする |
| --- | --- |
| **Test notification shown.** | テストが現れたアプリレポート。 OS の通知表面を確認してください。 テストアラートは、実際のタスクイベントとは別々です。 |
| **Test notification sent, but display could not be confirmed.** | システム通知の権限とOSがバナーを抑制するかどうかを確認します。 配達が確認されていません。 |
| **Test notification failed.** | システム設定でアプリの通知権限を確認し、テストを再試行します。 それでも失敗した場合は、エラーを呼び出します。 [トラブルシューティング](troubleshooting.md). |
| **System notifications are unavailable on this device.** | テスト制御は利用できません。 ワークスペースでタスクを監視します。 |
| 作業をテストしますが、タスクはアラートを送信しません | タスク通知の確認は、別のアプリを使用しており、イベントの完了、失敗、または承認リクエストです。 キャンセルや自動レトリーは警告しません。 |
| 録音、共有、またはミラーリング中にアラートなし | システムが録音または共有中にアラートを許すかどうかを確認し、フォーカスをチェックするか、混乱しないでください。 アラートが表示される場合にのみ有効にします。 録画中に表示されることがあります。 |
| アラートはタスクの詳細なしで到着します | システム通知でタスクコンテンツを表示する。 これらの詳細を非表示にしたい場合は、オフにしてください。 |

<PlatformContent platform="windows">

### ウィンドウを閉じた後にトレイから戻ります {/* #return-from-the-tray-after-closing-the-window */}

**General → Close button behaviour → Ask every time** では、ウィンドウを閉じると **Minimize or quit?** ウィンドウを非表示に **Minimize to tray** を選択し、 Windows トレイの Open-Science アイコンを使用して戻ります。 その選択を保持したい場合は、**もう一度尋ねないでください**だけを選択します。 変更後、一般。 最小化はアプリを終了しません。

</PlatformContent>

## 関連する設定を探す {/* #find-related-settings */}

| あなたは... | どこへ行くか |
| --- | --- |
| アプリの更新をチェックする | **General → About → Check now**; フォロー [インストールとアップデート](installation.md#choose-a-reproducible-version-and-update-deliberately). |
| バージョンの変更を読むか、ヘルプを入手する | **About → Release notes / Help Center** 対応する外部ページを開きます。 このwikiには、 [変更履歴](../changelog/v0.31.1.md). |
| 診断ログの検索または開く | **General → Diagnostics → Reveal / Open**; 詳しくはこちら [トラブルシューティング](troubleshooting.md). ログは共有するまでローカルに滞在します。 |
| コマンドラインエントリをインストールします。 | **General → Install command**; 詳しくはこちら [CLI リファレンス](../reference/cli.md). デスクトップの使用は、このコマンドを必要としません。 |
| データの場所を管理するか、またはアーカイブされた仕事 | [貯蔵およびアーカイブされた仕事](storage.md). |

<span id="verification-scope" />

## オペレーティングシステムの通知設定 {/* #notification-settings-in-the-operating-system */}

通知配信は、オペレーティングシステムの許可、フォーカスモード、画面共有設定にも依存します。 動作するデバイス上のチェックを使用してください。


ソース: [一般的な設定](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/GeneralPanel.tsx).
