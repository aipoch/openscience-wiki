---
title: "PythonとRのランタイム"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# PythonとRのランタイム {/* #python-and-r-runtimes */}

**Settings → Runtimes** を開き、ノートブックやエージェントに利用可能な Python および R 環境を選択します。 環境の **Ready** ステータスは、成功した検出/セットアップを示します。 **Enable**スイッチは、エージェントの可用性を個別に制御します。

アプリ管理環境または既存の通訳者を選択します。 使用前にパス、バージョン、準備状態、および有効スイッチを点検して下さい。 システム R およびアプリ管理 R は共存できます。

<span id="verification-still-required" />

<PlatformGuide />

## プロジェクトの環境を選択 {/* #before-choosing-an-environment-for-a-project */}

通訳者名、パス、バージョンを記録します。 最初のPython分析では、独立したアプリ管理環境を好むため、パッケージの変更は関連のない研究環境を変更しません。 インストールを要求する前に、必要なライブラリの **Packages** をインスペクトします。 成功したパッケージのリストは、読み取り専用チェックです。 外部通訳者を変更するには、エージェントの許可を付与しません。

実行失敗の後、未利用可能な通訳者、不足しているパッケージ、拒否されたリクエスト、コードエラーを区別します。 再インストールは、すべての失敗した分析のためにではなく、壊れた管理されたランタイムのために適切です。 結果を再現する必要がある場合は、入力バージョンとコードをランタイムの詳細とともに保持します。

## 主な制御を理解する {/* #understand-the-main-controls */}

| コントロール | 目的と境界 |
| --- | --- |
| **Recheck** | 発見された通訳者とそのステータスをリフレッシュします。 パネルは最後のチェックの時間を示します。 競合するセットアップ作業中に利用できません。 |
| **Network settings** | Notebookネットワーク保護のための構成を開けて下さい。 バナーは、セッションとパッケージのダウンロードが承認されたドメインに制限されているかどうかを説明します。 |
| **Let the Agent create environments** | エージェントが環境を作成したり、不足しているランタイムを設定したりするかどうかを制御します。 このオフを有効にすると、明示的なユーザー設定や修理制御は削除されません。 |
| **Add interpreter…** | 既存の通訳者のためのシステム実行可能なピッカーを開きます。 実際の実行可能を選択し、検出されたパスと既読状態を確認します。 |
| **Download and set up** | 不足しているときにアプリ管理環境を用意します。 |
| **Cancel** セットアップ中 | 実行中のセットアップのキャンセルをリクエストします。 別のものを始める前に解決する操作を待って下さい。 |
| **Retry setup** | 原因を解決した後、失敗したセットアップを繰り返します。 |
| **&#91;環境&#93; を有効にします。** | エージェントの選択のために環境を利用できるようにして下さい。 使用中の環境を無効にすると、衝撃確認が必要です。 |
| **Allow package install** | 外部のPythonまたはR環境の分離された同意。 R は、選択した個人ライブラリに限られます。 パッケージのリストは、インストールの同意を必要としません。 |
| **パッケージ &#91;count&#93;** | インストールされたパッケージの在庫を、その通訳者のために開きます。 |
| **Reinstall** | アプリケーション管理された環境を再構築する前に、確認を開きます。 |

## アプリ管理環境のインストール {/* #install-an-app-managed-environment */}

<PlatformContent platform="windows">

**Settings → Runtimes** で両方の言語カードを確認してください。 それぞれ独自の**Ready**ステータス、バージョン、**Enable**スイッチ、**Packages**ボタンがあります。 以下のカードは、PythonとRが有効になっています。 上記の警告は、Notebookネットワーク保護に関係しています。これは別に構成されています。 これらのスクリーンショットで個人パスが隠されています。 自分のコンピュータ上での完全なパスを調べます。

<Screenshot src="/img/open-science/windows/runtimes-ready.webp" alt="Python および R Ready を管理し、有効化した Windows のランタイム カード" width={1919} height={991} windowBounds={[480, 152, 960, 688]} href="/docs/img/open-science/windows/runtimes-ready.webp" linkLabel="完全なWindowsスクリーンショットを開く" />

</PlatformContent>

### アプリ管理Pythonをインストールする {/* #install-app-managed-python */}

<PlatformContent platform="macos">

![Python設定前のランタイム設定](/img/open-science/walkthrough-2026-09-08/34-runtimes-before-setup.webp)

</PlatformContent>
1. **Python → App-managed environment** を検索します。
2. **Download and set up** を選択します。
3. 進行中のメッセージを読み、待ちます。 セットアップが実行される間**Cancel**は利用できます。
4. 成功すると、**conda: デフォルト-python**、**App-managed**、**Ready** を確認します。
5. 通訳者パスと**conda を有効にする: default-python**スイッチをチェックします。

<PlatformContent platform="macos">

![アプリ管理Python環境の構築](/img/open-science/walkthrough-2026-09-08/36-runtime-setup-progress.webp)

</PlatformContent>
<PlatformContent platform="macos">

![Pythonセットアップ完了](/img/open-science/walkthrough-2026-09-08/37-python-runtime-ready.webp)

</PlatformContent>
**Ready**、選択されたインタープリアーパス、および有効な状態を確認します。 パッケージのカウントとバージョンは、インストールソースと異なる場合があります。 スクリーンショットの一時的なパスを恒久的な環境の場所として使用しないでください。

### アプリ管理Rをインストールする {/* #install-app-managed-r */}

1. **Settings → Runtimes** を開き、**R** にスクロールします。
2. **App-managed environment** では、**Download and set up** を選択します。 既存のシステムRは、この別々の環境をインストールしないようにします。
3. ダウンロードや環境作成をお待ちしています。 アプリケーションを開いたままにして、再試行する前にエラーを読んでください。
4. **conda: デフォルト-r**、**App-managed**、**Ready**、および有効なスイッチを確認します。
5. **Packages** を開きます。 **Filter packages**で`r-base`を入力し、インストールされたRバージョンとチャンネルを確認します。 全てのパッケージを見るためにフィルターをクリアします。

<PlatformContent platform="linux">

![App-managed R は Linux で準備が整え、有効になっています](/img/open-science/linux/r-managed-ready.webp)

</PlatformContent>

<PlatformContent platform="macos">

![アプリ管理R環境のダウンロード](/img/open-science/guides-walkthrough/70-r-managed-download.webp)

</PlatformContent>
<PlatformContent platform="macos">

![アプリ管理 R のインストールと有効化](/img/open-science/guides-walkthrough/71-r-managed-ready.webp)

</PlatformContent>
`r-base` のフィルタリングは、バージョンとチャネルでインストールされた R パッケージを返します。 パッケージの合計はあなたの環境を反映し、スクリーンショットと異なる場合があります。

<PlatformContent platform="macos">

![Rパッケージの在庫のrベースをチェックする](/img/open-science/guides-walkthrough/72-r-package-filter.webp)

</PlatformContent>
## 既存の通訳者を接続する {/* #connect-an-existing-interpreter */}

<PlatformContent platform="windows">

Windowsファイルピッカーを開くために、意図した言語で**Add interpreter…**を使用してください。 インストールした環境の実際の`python.exe`または`R.exe`を選択し、**Open**を選択します。 スペースを含むパスには、ファイルピッカーまたは**File name**フィールドを使用します。 Runtimes に戻り、検出されたパスとバージョンを確認し、**Recheck** を選択し、その環境を有効にします。 オープンピッカー単独では、通訳者が追加されていないわけではありません。

</PlatformContent>

### R をコンピュータに既にインストールしている {/* #use-r-already-installed-on-your-computer */}

**Recheck**を選択し、検出されたRパスとバージョンを調べます。 通訳者が不在の場合、**Add interpreter…** を使用して実行可能を選択します。 **Ready**と**Enable**は異なる意味を持っています: 検出は、通訳者が利用可能であることを確認します。 エージェントで選択可能にする

R Notebookでは、使用中の環境を確認するために`R.home()`を確認してください。 依存関係をインストールするには、[外部Rインストール手順](#external-r-packages) を使用して個人ライブラリを承認します。

<PlatformContent platform="macos">

`/opt/homebrew/bin/R`などの検出されたパスは、システムのインストールを識別します。

</PlatformContent>

### 外部のPythonを登録し、使用して下さい {/* #register-and-use-external-python */}

<PlatformContent platform="linux">

`/usr/bin/python3`などのシステム通訳者は、既に**Ready**として表示されている可能性があります。 エージェントが選択する前に使用する環境を有効にします。 下記のPythonインタープリターは無効になっており、アプリ管理のPython環境は設定されていません。 管理された環境を準備するには、**Download and set up** を使用します。

![Linux は、既存の Python 通訳者を Ready として検出し、有効化スイッチをオフにします。](/img/open-science/linux/python-detected-disabled.webp)

</PlatformContent>

1. 使用するPython環境を用意します。
2. **Add interpreter…** を選択し、Python 実行可能を選択し、**Ready**、パスとバージョンを確認してください。
3. **Recheck** を使用して、検出を検証し、特定の環境を有効にします。
4. エージェントがNotebookで明示的に選択するように依頼します。
5. `sys.executable`とPythonバージョンをプリントして、インストールされたライブラリに依存します。

<PlatformContent platform="macos">

macOSファイルピッカーでシンリンク通訳が選択できない場合は、意図した環境の実際の実行可能を選択します。 結合した後、`sys.executable` を確認します。 スクリーンショットの一時的な例のパスではなく、安定したインストールパスを使用します。

</PlatformContent>

#### パッケージの許可とインストール結果 {/* #package-permission-and-installation-outcome */}

外部のPython環境で新しいパッケージについては、まず**Allow package install**を確認してください。 許可を付与した後、インストールが完了し、継続する前に同じ環境でインポートを検証するのを待ちます。

インストールが `403 Forbidden` または `destination resolves to a non-public network address` を報告する場合、影響を受けたホスト名を調べて、再試行する前に [ネットワーク](network.md) に従ってください。 これらのエラーはネットワークアクセスを懸念し、パッケージが利用できなくなったことを証明しません。 ネットワーク保護を有効にします。

#### Notebookで利用する環境を無効化 {/* #disable-an-environment-used-by-a-notebook */}

**Enable** スイッチを選択し、確認する前にアクティブ/アイドルカーネルのカウントを読み込みます。 Disablingはカーネルを閉じることができます。 再エナブル後、セッションの利用可能なランタイムを再度選択します。 このパネルは、別の**通訳者の削除**アクションではなく、有効/無効な制御を提供します。

## 外部にパッケージをインストール R {/* #external-r-packages */}

既存の R 通訳者が機能するが、追加のパッケージが必要な場合は、これを使用してください。 アプリケーションは、システムやサイトライブラリではなく、既存の個人ライブラリへのインストールアクセスを許可します。

1. **Settings → Runtimes**では、意図した外部R環境を有効にし、そのパス/バージョンを確認します。
2. **Personal R package library** では、検出された場所を調べたり、適格なライブラリを選択したりします。 どれも検出されない場合は、**Advanced options → Choose library folder…** を使用して、既存の書き込み可能な個人ライブラリを R インタープリタに表示します。 このアクションはフォルダーを作成しません。
3. **Allow package install**を有効にします。 許可する前に選択したパスを読みます: このライブラリを使用して他のプロジェクトは、インストールされたパッケージの変更を見ることができます。
4. アプリのパッケージ管理操作で必要なパッケージをリクエストし、このR環境を命名します。 インストール結果とカーネル再起動の指示に従ってください。
5. `R.home()`、`.libPaths()`、`library(PACKAGE_NAME)`、`packageVersion("PACKAGE_NAME")`を実行し、パッケージプレースホルダーを交換します。 意図したライブラリが解析を継続する前に使用されていることを確認してください。

**Allow package install** をオフにして、将来のインストール同意を取り消すことができます。 既に書かれているパッケージをアンインストールしません。 別のライブラリを選択する前に、同意を取り消す。 対象となるフォルダーが存在しない場合、アプリの外部に個人的な R ライブラリを用意するか、アプリ管理環境を使用する。 失敗したチェックをバイパスするシステムライブラリを選択しないでください。

## キャプチャされたロックからパッケージを復元する {/* #conditional-restore */}

保存した結果、**Provenance → Environment** を開き、キャプチャされたロックを検査します。 **Download bundle** は提供されたとき使用して下さい。 バンドルの指示と前提条件を読んで、何かを修復します。

外部Rは利用できる`renv`取付けおよび支えられた`renv.lock`を要求します; 外的なPythonは固定されたハッシュが付いている既存の支えられた条件ロックを要求します。 通訳者パスとパッケージ名だけのリストは十分ではありません。 キャプチャされた通訳者、プラットフォーム、アーキテクチャ、パッケージマネージャーの要件は、復元環境に一致する必要があります。

バンドルを抽出し、所有する新しい書き込み可能な宛先を選択し、バンドルされた指示に従って、実際の通訳者と宛先パスで付属の`restore-packages.py`を実行します。 スクリプトは、パッケージを復元する前に前提条件とチェックサムをチェックし、効果的なバージョンとパスを確認します。 チェックが失敗した場合は、ロックを編集して成功を強制するのではなく、その条件を解決します。 Open-Scienceは、この外部の宛先を採用または削除しません。

これは、条件付きパッケージ修復、完全な環境クローンではありません。 結果を再オープンし、サポートされているキャプチャされたレシピが出力を比較するために使用できるときに [再現性](reproducibility.md) を使用します。

## インストールされたパッケージの点検 {/* #inspect-installed-packages */}

選択する **Packages** 意図した上で Python カード。 ダイアログでは、環境のパス、パッケージソース、ステータスを表示します。

**Filter packages**の`numpy`などのパッケージ名を入力し、そのバージョンとチャンネルを調べ、リストを復元するためにフィルターをクリアします。 **Close** を使って戻ります。

<PlatformContent platform="macos">

![インストールしたPythonパッケージのフィルタリング](/img/open-science/walkthrough-2026-09-08/38-python-packages-filter.webp)

</PlatformContent>
テーブルの列は**Name**、**Version**、**Build**、**Channel**です。 ビルドのダッシュはビルド値が示されていないことを意味します。 このダイアログはインベントリです。パッケージインストールやアンインストールボタンはありません。 このダイアログ内で「パッケージのインストール」フィールドを探さないでください。

<PlatformContent platform="windows">

Pythonカードで、**Packages**と`pip`のフィルタを選択します。 Rカードでは、`r-base`のフィルタリングを行います。 バージョンを比較する前に、ダイアログのタイトルに名前を付けた環境を確認してください。 これらのスクリーンショットは、インストールされたパッケージを表示します。 新規パッケージのインストールは表示されません。

<Screenshot src="/img/open-science/windows/python-packages.webp" alt="Windows Pythonのパッケージの在庫はピップにろ過しました" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/python-packages.webp" linkLabel="完全なWindowsスクリーンショットを開く" />

<Screenshot src="/img/open-science/windows/r-packages.webp" alt="Windows Rのパッケージの在庫はrベースにろ過しました" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/r-packages.webp" linkLabel="完全なWindowsスクリーンショットを開く" />

</PlatformContent>

## 実際の解析で環境を検証 {/* #verify-the-environment-with-a-real-analysis */}

選択した環境で小さな計算を実行し、その出力を再開し、[共有ベースライン](../reference/example-data.md)と比較します。 実行とエクスポートの[R Notebook](notebook.md#run-the-same-gene-count-check-in-r)に従ってください。

[データ品質ワークフロー](../workflows/data-quality.md) は既存の依存関係を使用して Python ルートを提供します。 成功した計算は、新しいパッケージがインストールできるか、カーネルが再起動されていることを実証しません。

<PlatformContent platform="macos">

![成功した本当のNotebook計算](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>
インポートが失敗した場合は、選択したランタイムとそのインストールパッケージを調べます。 ホスト名が予約されたアドレスに解決するので、ダウンロード拒否のために、[ネットワーク](network.md)に従ってください。 既存のパッケージでコードを実行すると、追加のパッケージがインストールできるわけではありません。

別の分析の前に、選択した環境で必要なパッケージを調べます。 必要に応じて、サポートされているパッケージ管理操作を使用して、実際の結果を読み、任意の再起動要件に従い、インポートを確認します。 許可の承認、進行カード、またはReadyの通訳者は輸入テストではありません。

不完全な環境または実行証拠で保存された結果のために、**Provenance**を開き、欠落した情報をチェックします。 再現性チェック用の新しいバージョンを作成するには、[環境準備](reproducibility.md#prepare-environment) に従ってください。 数値結果の一致は、欠如の実証を埋めません。

### アクティブ通訳者の確認 {/* #confirm-the-active-interpreter */}

Python または R を準備した後、対応する Notebook 言語で次のコマンドを実行して、実際のバージョンとパスを確認します。 設定は、いくつかの環境をリストすることができます。 現在のランの出力を使用して、使用中のものを特定します。

Python:

```python
import sys
print(sys.version)
print(sys.executable)
```

R:

```r
R.version.string
R.home()
```

次に、小さなプロジェクトテーブルを読んで、その行数を確認し、結果を保存します。 アプリを再オープンした後、解析を継続する前に再度チェックを実行します。 読みやすい履歴レポートは、前のメモリ変数がまだ存在するわけではありません。 Notebook の制御については、[Notebookと実行証拠](notebook.md) を参照してください。

<PlatformContent platform="windows">

<p className="example-label"><strong>実践例</strong> アクティブな Windows Python 通訳者をチェックする</p>

研究データを使用する前に、エージェントが**セッションNotebook**の上のPythonバージョン/パスコマンドを実行し、Markdownレポートで実際の出力を保存するために尋ねます。 インストールした`pip`バージョンも確認するには、`import importlib.metadata`と`print(importlib.metadata.version("pip"))`を追加してください。

Notebookの出力を開き、保存されたレポートと比較します。 詳しくはこちら Windows 10 例: Open-Science v0.28.0 レポート Python **3.12.13** そして、 `pip` **26.1.2**. . . . パッケージメタデータを読み込むと、パッケージのインストールやインポートは行いません。

<Screenshot src="/img/open-science/windows/python-runtime-output.webp" alt="Windows Python Notebook 実行されたコードおよび実際のバージョンの出力を示す" width={1920} height={1017} windowBounds={[1157, 0, 763, 472]} href="/docs/img/open-science/windows/python-runtime-output.webp" linkLabel="完全なWindowsスクリーンショットを開く" />

WindowsコンダRの起動やカーネル回復の失敗のために、再試行する前にv0.30.2以上を使用してください。 リリースは、環境の準備とRカーネルの回復後の実行可能なルックアップを修正しました。 更新後、環境を再確認し、Notebookで小さなR計算を実行します。 **Ready**単独では実行結果ではありません。 以下のスクリーンショットは、元の実行のバージョンと結果を保持します。

v0.31.0 から、Windows R は保護されたモードを最初にセットアップすることなく標準モードで実行できます。 旧リリースからバージョン固有のガイダンスとして**Rアクセスを許可する前に保護モードを有効にします。**を扱います。 ネットワーク保護とパッケージインストール権限は、別々の制御を維持します。 v0.31.1では、Notebookネットワーク保護によってブロックされた実行は、関連する設定へのリンクとインライン警告を表示します。 セルが実行されていない。 必要なアクセスを確認し、再実行して出力を確認します。

<span id="windows-runtime-qc" />

<p className="example-label"><strong>実践例</strong> サンプルQCテーブルでWindows PythonとR環境をチェック</p>

次の解析では、Windows 11 コンピューターと既存の Python/R 環境を使用します。 インストールをチェックするときに、パスと出力を自分の実行から使用してください。

<a href="/docs/examples/gse60450/rnaseq-sample-qc.csv" download>サンプルQC CSV</a>をダウンロードし、プロジェクトセッションに添付してください。 これは、サンプルごとの1列で12列の要約です。 下記のチェックは既存のメトリックを読み込みます。 元の gene-count の行列を再計算しません。 入力記述とメトリック定義は[データ例](../reference/example-data.md)です。

**Python で表を読みます。** エージェントは、Session Notebook で選択した Python 環境を使用するように依頼し、標準ライブラリのみで使用します。 `sys.version`、`sys.executable`、以下の4つのチェックと保存されたMarkdownレポートをリクエストします。 添付ファイルのパスを使用します。 変更されていない入力を左に読み込むようにするには、ファイルを再度読み直した後にSHA-256を計算します。

保存されたレポートと**Provenance → Code**ビューを開きます。 報告された通訳者と結果でキャプチャされたコードを比較します。 この例では、Python は **3.12.13** と `runtime\envs\.p\python.exe` で実行可能終了を報告します。 試合を再開前後に入力ハッシュを入力します。

以下は、**Inputs**とキャプチャされたコードを示しています。 画像をクリックすると、保存されたレポートで完全なスクリーンショットが開きます。

<Screenshot
  src="/img/open-science/windows/runtime-python-producer.webp"
  alt="Python結果のProvenanceコードビューの詳細、インプットとキャプチャされたプロデューサーコードを表示"
  width={2302}
  height={1158}
  windowBounds={[1385, 65, 917, 1030]}
  href="/docs/img/open-science/windows/runtime-python-producer.webp"
  linkLabel="保存されたレポートとキャプチャされたコードで、完全なWindows Pythonスクリーンショットを開きます。"
/>

**Rと同じテーブルを読みます。** エージェントは、セッションNotebookで選択したR環境を使用するように依頼し、ベースRのみを使用してください。 `R.version.string`、`R.home()`、同じ4つのチェックと別の保存レポートをリクエストします。 **Notebook run**カードを拡張し、そのコードを検査し、レポートを開き、結果を比較します。 この例では、R は **4.4.3** と `runtime/envs/.r/Lib/R` で終わるホームディレクトリを報告しています。

![Windows R Notebook コールおよび保存されたレポートは活動的な R 取付けおよびサンプルQC の結果を示します](/img/open-science/windows/runtime-r-execution.webp)

これらのスクリーンショットのインストールパスは、例のコンピュータに属しています。 自分のマシン上の異なるドライブ文字、フォルダ、インタープリターバージョンは正常です。

両方のレポートは、この入力の次の結果を与えます。

| チェックイン | この例の結果 |
| --- | ---: |
| データ行 | 12 |
| ディストリクト `original_column_name` バリュー | 12 |
| サムの `total_raw_counts` | 269,027,617 |
| 列の場所 `zero_count_genes + detected_genes_count_gt_0` 等しい 27,179 | 12 |

使用する環境への実行パスを一致させ、保存した結果をテーブルと比較します。 これらの実行は、Pythonの標準的なライブラリとベースRを使用します。 追加のパッケージを必要としたり、新しいパッケージをインストールできることを実証したりしないでください。

</PlatformContent>

## 維持し、修理環境 {/* #maintain-and-repair-environments */}

### セットアップと再試行のキャンセル {/* #cancel-setup-and-retry */}

**Download and set up** では **Cancel** を選択し、**実行時間の設定をキャンセル** を待ちます。 **Retry setup** を選択し、**Ready** を待ち、**Packages** を開き、環境を検査します。 最初の操作がまだ設定されていない間、2番目のセットアップは起動しません。

<PlatformContent platform="macos">

![キャンセルされたセットアップおよび利用できる再試行](/img/open-science/local-todo-batch/29-setup-cancelled.webp)

</PlatformContent>
<span id="review-a-reinstall-before-committing-it" />

### 管理された環境を再インストールする {/* #reinstall-a-managed-environment */}

1. 必要なレポートを保存し、追加したパッケージを記録します。
2. 目的の管理環境で**Reinstall**を選択します。
3. 衝撃の通知を読んで、そして**Reinstall runtime**を選んで下さい。
4. **Ready** を待って **Packages** を検査します。
5. 新しい Notebook セルを起動し、保存した入力と出力を再オープンします。

<PlatformContent platform="macos">

![Notebookセッション中に確認を再インストールする](/img/open-science/local-todo-batch/31-runtime-reinstall.webp)

</PlatformContent>
再インストールは環境を削除し、再作成します。 運動回復では、**キャンセル: このセルが実行中にランタイムが停止しました。**でアクティブセルがキャンセルされました。 古いNotebookの歴史は見えてきましたが、その名前空間はもはや存在しません。 以前の変数が存在しないことを確認した新鮮なセル。 変更されていないCSVはまだ12行と269,027,617カウントを返し、保存されたレポートは再開しました。

<PlatformContent platform="macos">

![カーネルが停止した後、Notebookの履歴を保持](/img/open-science/local-todo-batch/33-reinstalled-kernel-history.webp)

</PlatformContent>
保持されたファイルと保持されたカーネルのメモリは異なります。 必要なコードを再実行することで変数を再作成します。 追加パッケージを再インストールする必要があります。 ベース環境の回復は、すべての追加依存症の回復を確立しません。

### 開発ビルド:micromambaが見つかりませんでした {/* #development-build-micromamba-not-found */}

開発プロセスがmicromambaを見つけることができないので、ソースビルドの最初の試みは暫定前に失敗しました。

<PlatformContent platform="macos">

![ソースビルドにおける実際の欠損微生物のエラー](/img/open-science/walkthrough-2026-09-08/35-runtime-micromamba-error.webp)

</PlatformContent>
パッケージアプリケーションには、このバイナリが含まれています。 ソースビルドでは、そのプロセスの起動環境で実行可能な有効なマイクロマバで`OPEN_SCIENCE_MICROMAMBA_BIN`を指し、開発インスタンスを再起動します。 バイナリパスを互換性のあるインストールから使用し、再発する前に実行可能であることを確認します。

この環境変数は、Runtimes ページのフィールドではなく、開発セットアップの詳細です。 この検出エラーを回避するために、環境ディレクトリを削除しないでください。

<PlatformContent platform="windows">

## オプション WSL2 バッシュプレビュー {/* #wsl2-preview */}

Windows x64は**Settings → Runtimes**の任意**Local Shell · WSL2 Bash Preview**を使用できます。 タスクが Linux シェルを必要としない限り、PowerShell をキープします。 WSL2 は Open-Science を Windows で使用する必要はありません。

WSL2分布とその完全非root **Linux user**を選択し、**Save and check**を選択します。 プラットフォーム/ディストリビューションのセットアップ手順を最初にフォローしてください。 **Use WSL2 Bash** が利用可能になる前に、Readiness チェックとマッチングプレビューリソースがパスしなければなりません。 配布のみを選択すると、アクティベートしません。 小さなシェルコマンドを実行し、長いタスクを開始する前に結果を調べます。 PowerShellオプションを使用して、デフォルトのシェルに戻します。

可読性が失敗した場合は、報告された理由を保ち、解決中にPowerShellを続行してください。 WSL コンポーネントをインストールするには、Windows 管理者の承認が必要です。 このプレビューは、Python/R Notebook インタープリターを選択すると別々です。

</PlatformContent>
