---
title: "インストールとアップデート"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# インストールとアップデート {/* #installation-and-updates */}

ほとんどのユーザーは、GitHubリリースからデスクトップパッケージをインストールする必要があります。 貢献者、または最新のコードをテストする人、またはソースからアプリを実行できます。 Electronデスクトップクライアントは、認証されたローカルブラウザインターフェイスを提供する共有Nodeバックエンドに接続します。

<PlatformGuide />

**現在のパッケージ:** [v1.0.4 Assets](https://github.com/aipoch/open-science/releases/tag/v1.0.4) デスクトップインストーラー、スタンドアローンCLIアーカイブ、Linux CLI `.deb`/`.rpm` パッケージ。 意図したインストールタイプとアーキテクチャを選択し、同じリリースからチェックサムを確認します。 デスクトップランチャーは、デスクトップランチャーがご利用いただけます。 **Settings → General → Command line tool → Install command**.

## インストール方法の選択 {/* #choose-an-installation-method */}

### デスクトップインストーラをダウンロード {/* #install-the-desktop-app */}

1. [Open-Scienceリリース](https://github.com/aipoch/open-science/releases) を開きます。
2. お使いのオペレーティングシステムとCPUアーキテクチャに合ったパッケージをダウンロードしてください。
3. インストーラーとインストールが完了したライセンスを読んで、アプリを起動します。 5ステップのセットアップウィザードが最初の実行で開きます。
4. オペレーティングシステムが署名されていないアプリをブロックする場合、公式のAIPOCH GitHubリポジトリから再度ダウンロードし、ソースをチェックした後にプラットフォームのセキュリティプロンプトに従ってください。

**アセット** からリリースに添付されているので、自動的に生成されたソースコード ZIP ではなく、 選択します。 可用性は、リリースの公開資産に依存します。

<PlatformContent platform="macos">

| コンピュータ | アーキテクチャを特定する | パッケージおよび取付け |
| --- | --- | --- |
| macOS, アップルシリコン | このMacはApple Mシリーズのチップを示しています | 詳しくはこちら `mac-arm64.dmg`; アプリケーションにアプリをドラッグして、そこに起動します。 |
| macOS、インテル | このMacはIntelプロセッサーを示しています | 詳しくはこちら `mac-x64.dmg`; アプリケーションにインストールします。 アプリは macOS 12 以降が必要です。 |

**Homebrewをインストール**

Homebrewでインストールすることもできます。

~~~bash
brew install --cask open-science
~~~

Homebrew は、Apple Silicon または Intel を自動的に選択します。 インストール後、**Settings → General → About**を開き、インストールされたバージョンを確認します。 パッケージマネージャは、ドキュメントベースラインよりも新しいリリースを解決できます。 [タグ付きインストールの指示](https://github.com/aipoch/open-science/blob/v0.27.0/README.md).

</PlatformContent>

<PlatformContent platform="windows">

公式Windowsインストーラは、v0.33.2からコード署名されます。 v0.33.3 はバンドルされた実行可能に署名を拡張します。 [公式ダウンロードページ](https://aipoch.com/open-science/download) または [GitHub リリース](https://github.com/aipoch/open-science/releases) からダウンロードし、公式検証ノートに従ってパッケージソースを確認します。


| コンピュータ | アーキテクチャを特定する | パッケージおよび取付け |
| --- | --- | --- |
| Windows | 設定 → システム → 概要 → システムタイプ | マッチングを選ぶ `win-…-setup.exe`; 現在のユーザーインストーラを実行し、その場所のプロンプトに従ってください |

1. ダウンロードしたWindowsインストーラを開き、インストール場所ページに移動します。
2. デフォルト位置を保持するか、**Browse…** を選択してアプリケーション用のフォルダーを選択し、**Install** を選択します。
3. 完了ページをお待ちください。 選択された起動オプションを残して、**Finish** を選択して Open-Science を開きます。
4. [初回設定](onboarding.md) に従って環境を確認し、データの場所、エージェント、モデルを設定します。

</PlatformContent>

<PlatformContent platform="linux">

| コンピュータ | アーキテクチャを特定する | パッケージおよび取付け |
| --- | --- | --- |
| Ubuntu / デビアン | `uname -m`: `x86_64` x64 を意味します。 `aarch64` ARM64の意味 | マッチングを選ぶ `.deb`、システム パッケージのインストーラーでそれを開けて下さい、それからアプリケーション メニューから進水して下さい |
| その他のサポート Linux 配布 | チェックイン `uname -m` | マッチングを選ぶ `.AppImage`, ファイルの権限で実行を許可します。, その後、それを開きます。; 配布によって報告された依存エラーを解決する |

v1.0.4 は Linux を提供します。 **x64とARM64** パッケージ。 ARM64 の場合、選択して下さい `aipoch-open-science-1.0.4-linux-arm64.AppImage` または `aipoch-open-science_1.0.4_arm64.deb`お問い合わせ x64 のカウンターパーツは `aipoch-open-science-1.0.4-linux-x86_64.AppImage` および `aipoch-open-science_1.0.4_amd64.deb`お問い合わせ 選択したリリースの公式アセットからダウンロードし、結果と一致 `uname -m`.

</PlatformContent>

インストール先にはアプリケーションを保存します。セットアップウィザードの **Data location** には研究ファイルと実行環境を保存するため、それぞれ別に設定します。インストール後は[初回設定](onboarding.md)に進んでください。

### スタンドアローンCLIを使う {/* #standalone-cli */}

ターミナル/ブラウザのインストールでは、一致するスタンドアローンCLIアーカイブをダウンロードしてください。 [v1.0.4](https://github.com/aipoch/open-science/releases/tag/v1.0.4)お問い合わせ ノード、バックエンド、Web UI をバンドルします。 完全なディレクトリを抽出し、次に続く [CLI設定](../reference/cli.md#terminal-setup)お問い合わせ CLI を保ち、同じインストールからバックエンドを一緒に保持します。

#### ホーム醸造 CLI {/* #homebrew-cli */}

Homebrew CLIをインストールまたは管理する `brew install aipoch/tap/open-science`デスクトップの樽とは別に。 Homebrewが提供するバージョンを確認してください。この式はGitHubリリースの後ろに遅れる可能性があります。 インストールはシステムサービスを開始しません。 ランチャーが衝突した場合、検査 `type -a open-science` そして使用して下さい `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"` そのインストールのため。

#### Linux CLIパッケージ {/* #linux-cli-packages */}

Linux端末/ブラウザ利用の場合、選択 **open-science-cli**、別にから **aipoch-open-science** デスクトップのパッケージ。 マッチングパッケージをダウンロードし、 `CLI-PACKAGE-SHA256SUMS.txt` と [v1.0.4 Assets](https://github.com/aipoch/open-science/releases/tag/v1.0.4)インストール前に確認します。

| 流通・建築 | v1.0.4 CLIアセット |
| --- | --- |
| Debian / Ubuntu、x64 | `open-science-cli_1.0.4_amd64.deb` |
| Debian / Ubuntu、ARM64 | `open-science-cli_1.0.4_arm64.deb` |
| フェドラ、x64 | `open-science-cli-1.0.4-1.x86_64.rpm` |
| フェドラ、ARM64 | `open-science-cli-1.0.4-1.aarch64.rpm` |

適切なパッケージマネージャでダウンロードしたファイルをインストールします。 これらの例は x64 を使用します。 ARM64 ファイル名を適切に使用してください。

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_1.0.4_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-1.0.4-1.x86_64.rpm
```

`open-science-cli start --no-open` を実行し、`open-science-cli status --json` を実行します。 実行したら、認証されたローカルWebインターフェイスを開くには、`open-science-cli url`を使用します。 URL をプライベートに保ちます。 [CLI セットアップ](../reference/cli.md#terminal-setup) では、モデル構成と `doctor` チェックを続けて、`open-science` を `open-science-cli` に置き換えます。

パッケージは、Node、バックエンド、Web UI をバンドルします。 Python/Rをインストールしたり、自動起動したシステムサービスを作成したりしません。 OSのクレデンシャルストアとサンドボックスの前提条件はまだ適用されます。 [ヘッドレス Linux 資格情報](../reference/server.md) を参照してください。 デスクトップランチャーがインストールされている場合は、`open-science-cli` を明示的に使用してください。

パッケージをアップグレードまたは削除する前に、作業を終了し、停止します。 **パッケージから始まるすべてのプロファイル**お問い合わせ apt/dnf でダウンロードしたパッケージをインストールします。このインストールで構成されている AIPOCH apt/dnf リポジトリはありません。 パッケージ除去は、研究データと資格情報を保存します。 ふりがな [公式パッケージガイド](https://github.com/aipoch/open-science/blob/v1.0.4/docs/standalone-runtime.md#linux-cli-distribution-packages) コマンドの競合とプラットフォームの要件について説明します。

### ソースから実行 {/* #run-from-source */}

Git、Node.js 24、npm、およびElectron用のプラットフォームビルド前提条件が必要です。 アプリケーションにエージェントフレームワークをインストールまたは選択します。 インストール中に、リポジトリはPrisma Clientを生成し、アプリパッチを適用し、電子ネイティブ依存関係を準備します。

再現可能なソースのインストールには、意図したリリースタグから選択します [変更履歴](../changelog/v1.0.4.md) 依存関係をインストールする前に. デフォルトクローンは、固定リリースではなくブランチに続く。 選択したタグ、ソースコミット、ランタイムバージョンを記録するので、別の人が環境を再現することができます。

交換する `RELEASE_TAG` 選択したリリースに示す正確なタグ(そのリードを含む) `v`)... `--branch RELEASE_TAG --depth 1`を省略する代わりに、継続的な開発に従うため。 そのチェックアウトは、デフォルトのブランチに従います。

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

生産ビルドをパッケージ化する前に、以下を実行します。

```bash
npm run build
```

選択したタグのpackage.jsonを使用し、 [スタンドアローンランタイムガイド](https://github.com/aipoch/open-science/blob/v1.0.4/docs/standalone-runtime.md) ビルドターゲットと依存関係のため。 `npm run dev:web` Node/Web エントリ ポイントを開発します。 `npm run dev` また、デスクトップクライアントを用意します。 独立した構成ディレクトリを使用して、テストデータを分離します。

## 初回設定完了 {/* #complete-first-time-setup */}

### 外部サービスおよびランタイム {/* #external-services-and-runtimes */}

| 機能特性 | 必要ですか? | 業務内容 |
| --- | --- | --- |
| OpenCode、Claude Agent、Codex、またはCodeBuddy | 少なくとも 1 つ | 会話エージェントセッションの実行 |
| モデルアクセス | 代理店の要求のために要求して下さい | サポートされているサブスクリプションまたは API プロバイダー; サブスクリプションアクセスには、別々のAPIキーを必要としません |
| PythonまたはR | オプション | ノートブックコードを実行します。 検出されたシステム環境またはアプリ管理環境を使用する |
| ネットワークアクセス | おすすめ商品 | 実行時間をインストールし、プロバイダ、GitHub、リモートサービス、およびMCPコネクタを接続します |
| SSHホスト | オプション | リモートジョブを実行し、コンピュートパネルで結果を取り出します |

### ローカルデータ {/* #local-data */}

セットアップウィザードは、アーティファクト、Notebookファイル、環境などの大規模な研究ファイルの管理されたデータ場所を示しています。 アプリケーション設定と会話履歴は、設定場所にあるままです。 研究データの場所の移動は、完全なアプリケーションバックアップではありません。 ソースリポジトリから分離してください。 [ストレージ](storage.md) を使用して、アプリが実行している間、手動で内部ファイルを移動するのではなく、再配置します。

## アプリが準備されていることを確認します。 {/* #installation-is-complete-when */}

アプリケーションが開き、必要な環境チェックパス、エージェントがインストールされ、モデルアクセスが検証されます。 Python/Rのセットアップは、それらの言語を実行する作業だけに必要です。 CSV または PDF プレビューを開くと、Notebook の実行時間を検証しません。 [初回設定](./onboarding.md) 以降、[プロバイダーとローカルモデルのセットアップ](./providers.md) を実行します。

## アプリケーションの更新をチェックする {/* #choose-a-reproducible-version-and-update-deliberately */}

**Settings → General → About** では、インストールされたバージョンを読み込み、**Check now** を使用して、アップデートの可用性を確認します。 インストールする前に、リストされているバージョンを調べて、最初にアクティブな作業を終了します。 開発ソースビルドは、パッケージされたインストールとは異なる更新を報告することができます。 更新前に重要なエクスポート結果のコピーを保持します。 アプリケーションの内部データディレクトリの名前を変更しません。

1.0から`open-science update`が削除されます。 デスクトップコントロールや公式インストーラーを通じてアプリを更新し、インストーラー/パッケージマネージャでCLIインストールを更新します。 **Check now**が公開されたリリースをまだ提供していない場合は、公式リリースページを確認してください。 設定を削除したり、アプリをリセットしたりすると、更新チャネルをプロモーションしません。

<PlatformContent platform="macos">

**更新する前に Open-Science をインストールしてください** が現れた場合は、読み取り専用の場所からアプリが実行されます。 **「アプリケーション」にインストール** を選択するか、Finder でアプリを移動します。 インストール後、**再起動** またはこのコピーを終了し、アプリケーションで 1 つを再オープンし、更新を再度確認します。 **このまま使用**は現在のコピーを開いた保ちます; 更新可能場所を作らない。 インストールが失敗した場合は、再試行する前に表示されたエラーに従います。

</PlatformContent>

<PlatformContent platform="windows">

既存のデータを再インストールします。 データ問題の後に新しいスタートを意図的にする必要がある場合は、[ローカルWindowsデータをリセットする](troubleshooting.md#windows-data-reset)を参照してください。 この別々のツールはデータを削除します。 通常のアップデートではない場合もございます。

</PlatformContent>

## インストールと起動のトラブルシューティング {/* #first-checks-when-startup-fails */}

| 失敗する場所 | ファーストチェック |
| --- | --- |
| デスクトップインストーラーまたはアプリ起動 | パッケージのソース、OS および CPU アーキテクチャをチェックし、オペレーティングシステムのプロンプトを読み込みます。 |
| 源の取付け | 確認する `node --version` そして、 `npm --version`とそれ `npm install` 完了しました。 中断された依存関係の取付けを再試して下さい。 |
| 初回設定 | 失敗した環境の点検を読んで、続行する前に条件を解決して下さい。 |
| 第一次代理店要求 | アクティブな/Ready Agent を確認し、実行する **Test connection** モデルページで。 |
| プロバイダーまたはローカルブラウザ接続 | 報告されたポート、プロキシ、または証明書のエラーを調べます。 詳しくはこちら [トラブルシューティング](troubleshooting.md). |

## v0.31.0の後のプロダクト命名 {/* #product-name */}

現在のインターフェイスと新しいパッケージは、**Open-Science**を一貫して使用しています。 アップグレードは、既存のインストール名と場所、研究データ、資格情報、設定を保存します。 `Open Science`を含む古いインストールパスは、アップグレードの失敗ではなく、 新しい表示名と一致させるためにデータ フォルダーの名前を変更したり、移動したりしないでください。

## 1.0へのアップグレードと互換性の理解 {/* #version-compatibility */}

1. アクティブな研究を終了し、構成ディレクトリと任意の別々の構成されたデータの場所をバックアップします。 1つの`.science`エクスポートは、プロファイル全体のバックアップではありません。
2. インストールを使用してデスクトップ/バックエンドのインスタンスを閉じて、公式インストーラーでアップグレードします。 オリジナルのプロファイル、データ、OS認証ストアを保管します。
3. バージョン、プロジェクト、セッション、ファイル、モデル、ランタイムを継続的に再オープンし、確認します。 バイナリダウングレードはデータをロールバックしません。 古いバイナリは、新しい保存されたデータを読み取らない場合があります。

1.0 は、既存の履歴アップグレードとインポートパスを保持します。バージョン番号はプロファイルリセットを必要としません。 ふりがな [1.x 互換性ポリシー](https://github.com/aipoch/open-science/blob/v1.0.4/docs/compatibility.md) 文書化された CLI/SDK およびタスクのオートメーション インターフェイス、有効なの先の輸入をカバーして下さい `.science` パッケージ、およびサポートされたプロフィールのアップグレード。 同じモデルの回答、サードパーティの可用性、または全研究セッションの決定的な再生、またはOS保護された資格情報のクロスプラットフォーム転送を保証するものではありません。 セキュリティは、最新の安定したリリースをターゲットに固定します。

## npm で CLI をインストールする {/* #npm-cli */}

Node.js を使う **22.13 以降** を公開 CLI・バックエンドパッケージに使います。ターミナルでインストールし、実行されるバージョンを確認します：

```bash
npm install --global @aipoch/open-science@1.0.4
open-science version --json
open-science help
```

それからフォローして下さい [ターミナルでのセットアップ](../reference/cli.md#terminal-setup) に従ってプロファイルを初期化し、バックエンドを起動してモデルを設定します。インストールだけではログインや Python/R の導入は完了しません。同じコマンド名のデスクトップ・Homebrew ランチャーがある場合は、シェルが選ぶ実行ファイルを確認してください。更新前にそのインストールの全バックエンドを停止し、プロファイルを保持して元のパッケージマネージャーから更新します。

## ダウンロードからインストール完了まで確認する {/* #update-progress */}

設定画面 **Settings → General → About**、選ぶ **Check now** 提供されるリリースを見直します。 更新ダイアログは、ダウンロードの進捗、リリースノート、インストールの準備を一緒に保ちます。 ダウンロード完了はインストール完了ではありません:再起動後にインストールされたバージョンを確認してください。

このチャネルで自動インストールできないと表示された場合は、ダウンロードしたパッケージを保持し、実行中の作業を終えてから公式インストーラーを使います。v1.0.4 でも自動置換の制限は残ります。Windows の進捗表示改善は、この制限の解除ではありません。Notebook の終了処理中にアプリを強制終了しないでください。
