---
title: "文学ライブラリと引用"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 文学ライブラリと引用 {/* #literature-library-and-citations */}

オンラインで新しい論文を探すには、会話でテーマ、対象年、選定条件を伝え、**Library → Inbox** で候補を確認します。[ジャーナルクラブのテーマ検索ワークフロー](../workflows/journal-club.md)を参照してください。**Search references** は Library 内の既存の文献を絞り込む機能で、オンラインの文献検索は行いません。

図書館は、地元の書誌です。 プロジェクトとコレクションは、そのレコードにリンクします。 別のコレクションに同じ用紙を追加しても別のコピーを必要としません。 [コア読み取りワークフロー](../workflows/core-reading-list.md)の3つの本物PRISMA紙を使用しています。 そのワークフローは、研究目標と受諾チェックリストを所有しています。 このページでは、図書館の制御と記録のライフサイクルについて説明します。

添付のPDFから図やテーブルを再利用するには、[PDF抽出物](previews.md#pdf-extraction)に従ってください。 メタデータのインポートと自動全文検索は、数字やテーブルを抽出しません。

## 正しいビューを選ぶ {/* #choose-the-correct-view */}

**Library**をホームまたはワークスペースから開く。 **Back to Home**はプロジェクトナビゲーションに戻ります。 ライブラリの**Settings**は、グローバルモデルの設定ではなく、引用スタイルを開きます。

| 表示 | コンテンツ | 利用する |
| --- | --- | --- |
| 受信トレイ | エージェントがあなたのレビューを待っていた候補者を発見しました | 受入前にアイデンティティとソースをチェックする |
| すべての文献 | 有効な記録を受諾して下さい | あなたの伝記を検索し、編集し、整理する |
| 重複文献 | 識別子/メタデータマッチグループ | 合併前の比較 |
| ゴミ箱 | 参照レコードの削除 | 永続的に削除する、または意図的に削除する |
| プロジェクト | そのプロジェクトにリンクされている参照 | 研究の質問に関連した伝記を保って下さい |
| コレクション | ネストコレクションを含むテーマグループ | プロジェクトを横断した読み取りセットを再利用 |

![実際のPRISMAコレクションの3つの受け入れられた紙](/img/open-science/guides-walkthrough/51-library-collection.webp)

## レコードの追加またはインポート {/* #add-or-import-a-record */}

**Add**を選択し、ソースを選択します。 PDF を選択すると、メタデータエディタが開きます。 **Import PDFs** を複数選択。

| エントリーフォーム | 入力 | 保存前にチェック |
| --- | --- | --- |
| 文献を追加 | 手動で入力された伝記 | 必須タイトル、参照タイプ、識別子 |
| PDF を読み込む | ローカル PDF を 1 つまたは複数のローカル PDF | 各紙に対してメタデータを抽出する。 複数ファイル選択では、以下のバッチフローを使用します。 |
| 参考文献を読み込む | BibTeX、RISまたはNBIB | 有効な/無効なエントリ、宛先、識別子のマッチ |

<ToolOperationGroup>
<summary>フォルダの選択したPDFをインポートする</summary>

### フォルダの選択したPDFをインポートする {/* #import-a-folders-selected-pdfs */}

1. 読書セットのPDFを選択します。 メタデータの抽出を待ちます。 検出された DOI は、バイブリグラフィフィールドを完了するために使用できます。 紙に対する結果をチェックします。
2. **Import to**の横に表示されている目的地をチェックしてください。 インポートを開始したライブラリビューから来ています。 **When identifiers match**では、以下の表からポリシーを選択します。
3. 各チェックボックスまたは**Select all**を使用して、このバッチを選択します。 **Show more** は、リストされたファイルを追加表示します。
4. **Import selected** を選択します。 全体的な進捗状況と各ファイルのステータスを読んでください。 失敗したファイルは、完全なインポートではありません。
5. 停止するには、**Stop** を選択し、**Stopping…** が解決するのを待ちます。 既にコミットされた参照は残っています; 機内での動作が終了する場合があります。
6. 停止後、残りのReadyファイルを選択し、**Import selected**を使用します。 失敗後に**Retry unfinished**をダイアログにすると、未完成のセレクションに使用します。 PDFのアップロードが中断されたら、特に新しいインポートを始める前に保持された参照を点検して下さい。
7. ダイアログが提供したときに **Done** または **Close** を使用して、宛先を開き、そのレコードと PDF を確認します。 インポート前の**Cancel**の放棄準備。

| 識別子マッチポリシー | 結果 |
| --- | --- |
| 既存の文献を再利用 | 別の伝記エントリを作成する代わりに、一致するレコードを再利用する |
| 別の文献として保存 | 後で比較し、レビューを複製するための異なるレコードを保持する |
| 空欄を補完 | 既存の/conflicting 値を保持している間欠落したフィールドを埋めます |

バッチは**Pending**、**Reading…**、**Ready**、**Importing…**、**Completed**、**Failed**または**Skipped**を示すことができます。 選択、メタデータの読みやインポート完了は別々の状態です。 アプリケーションが **PDF upload cancelled. The reference was kept.** を報告する場合、保存されたレコードの添付ファイルを確認してください。 アップロードをキャンセルすると、伝記エントリを削除しませんでした。

![インポートのための2つの実際のPRISMA PDF](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

**Reuse existing reference**では、タイトルやDOIを抽出したPDFは、まだ別のレコードを作成することはできません。 インポート後、各用紙を開き、タイトルとDOIを確認します。 [重複をマージする](#resolve-duplicates-and-recover-references)以前の正しい不一致。 **Completed**は輸入を、正確な同一証明確認しません確認します。

![完全なバッチとファイルごとの結果](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>完成した仕事を失うことなく、バッチを停止する</summary>

### 完成した仕事を失うことなく、バッチを停止する {/* #stop-a-batch-without-losing-completed-work */}

**Stop** リクエストは、現在の項目を終了することを可能にします。 すべての行を調べる: **Completed** アイテムは保持され、再び選択できません。 残りの**Ready**行を選択し、**Import selected**を使用して続行します。 失敗が**Retry unfinished**を暴露した場合, 再試行する前に、報告された原因を修正し、完了したレコードが複製されていないことを確認します.

![PDFのインポートを停止すると、完了した行が保持されます。](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

**The reference was kept. Retry to finish adding its PDF.**は、伝記エントリが保存されたことを意味しますが、その添付ファイルは未完成です。 元の PDF が選択された場所にまだ利用でき、通常開くことを確認し、**Retry unfinished** を選択します。 再試行後、目的地のコレクションに戻り、PDFを開き、コンテンツを確認します。 結果が確認できない場合は、別のインポートを開始する前にライブラリを調べてください。


</ToolOperationGroup>

<ToolOperationGroup>
<summary>別の参照マネージャからバイブリグラフィーを持参</summary>

### 別の参照マネージャからバイブリグラフィーを持参 {/* #bring-a-bibliography-from-another-reference-manager */}

<p className="example-label"><strong>実践例</strong> 3つのマッチングポリシーでPRISMAレコードをインポート</p>

先物コレクションを最初に開くと、**Import references**と`.bib`、`.ris`、`.nbib`ファイルを選択します。 プレビューは、検出されたフォーマット、宛先、新規/既存の/スキャッピングされたカウントとマッチングレコードを報告します。 **View details** を拡張して、インポート前にタイトルや作者を調べます。 Bibliographic のインポートは PDF をダウンロードしません。

| おすすめ商品 | PRISMA ステートメントでチェックされた結果 |
| --- | --- |
| 別の文献として保存 | BibTeX が 1 つのレコードを作成しました。 重複し、一致するDOIグループが1つ含まれている |
| 既存の文献を再利用 | RISは1レコードを再利用し、ゼロ作成、スキップ、または失敗しました。 |
| 空欄を補完 | ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ザ・ [パブメッドNBIBレコード](https://pubmed.ncbi.nlm.nih.gov/19621072/) 追加 PMID `19621072` PMCID および PMCID `PMC2707599`; 既存のタイトルと5人のクリエイターが残っている |

**Import references** をクリックし、**Import complete** を待ち、作成/再利用/スキャッピング/失敗を調べて、**Done** を選択します。 レコードの再開: インポートのカウントだけは正しいメタデータを確立しません。 空のフィールドを充填すると、全ジャーナルのタイトルを交換することなく、識別子と省略されたジャーナル名を追加できます。

![BibTeX は、明示的な重複ポリシーでインポートします](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![NBIBの輸入は欠けているbibliographic分野を満たします](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## Inboxの証拠のレビュー {/* #review-inbox-evidence */}

<p className="example-label"><strong>実践例</strong> 3つのPRISMA候補のレビュー</p>

候補者のタイトルまたは**View details**を開きます。 プロバイダー、ソースリンク、DOI/その他識別子を調べ、発行者と年、著者の注文と出版物を比較します。 **Accept**はライブラリにそれを促進します。 **Dismiss** は、レビューキューから削除します。 バッチアクション前の行選択をチェックします。

![3つの本物PRISMAの候補者はレビューを待っています](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

この例では、個別に3つの候補が受け入れられ、受信トレイはクリアになりました。 プロバイダーのマッチは、バイブリグラフィカルなバリデーションを完了しない、スタートレコードです。 2020文の出版物年は**2021**です。 2つの2009紙は、異なるDOIと著者リストを持っています。

## メタデータの検査と修正 {/* #inspect-and-correct-metadata */}

参照を開き、**More actions → Edit metadata** を開きます。 **Complete metadata** を使用する前に現在の値を確認します。これは、純粋にローカル編集ではなく、ルックアップを実行します。

![保存された組織権限フィールドを再オープン](/img/open-science/v0.27.0/04-organization-author.webp)

| フィールド/コントロール | 入力および効果 |
| --- | --- |
| 文献タイプ | 文献の種類を選択します。:記事、レビュー、プリプリント、書籍、データセットおよび他のサポートされている種類 |
| タイトル | 必須; 公開されたタイトルを保持する |
| 年/出版物 | 出版年およびジャーナル/容器; タイトルに埋め込まれた年は異なる場合があります |
| 詳細設定 | ボリューム、問題、ページ、パブリッシャー、場所、エディション |
| クリエイターの追加 / クリエイターの削除 | 作成者の行を草案に追加または削除する |
| 著作者の役割 | 著者、編集者、または翻訳者を選択して、ソースにマッチします。 |
| 名 名 名 名 名 名 名 | お名前と家族名を入力してください |
| 名 名 名 名 名 名 名 名 名 | 組織名を入力してください。 発明された人名に分割しない |
| 識別子を追加 | タイプおよび価値: DOI、PMID、PMCID、ARXIV、ISBN、ISSNまたはその他 |
| DOI/ISSN、等のために優先される。 | そのタイプ内で優先する識別子を選択します。 選択は、すべてのタイプのグローバルフラグではありません。 |
| 識別子を削除 | ドラフト識別子行を削除します。 |
| URL / アブストラクト | ソースアドレスとバイブリグラフィス要約 |
| 保存 | Persist の有効な編集 |
| キャンセル/閉じる | 草案を破棄 |

<p className="example-label"><strong>実践例</strong> PRISMAグループを組織の作者として保存する</p>

**PRISMAグループ**を追加するには、**Add creator → Creator role: Author → Name type: Organization**を選択し、フルネームと**Save**を入力します。 記録を再開し、組織が4人の個人的な作者に従うことを確認して下さい。 生成された引用を [出版社の著者リスト](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097) と比較します。

![APA 参照は組織の作者を維持します](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2 は、PubMed の作者の名前の解析を修正しました。例えば、姓、イニシャル、サフィックスなどです。 メタデータをインポートまたはコンパイルする際に、クリエイターのフィールドを調べ、リンクされたソースに対する生成された引用を調べます。 既に保存したメタデータをライブラリに書き換える更新をインストールすることを想定しないでください。

## スマートコレクション {/* #smart-collections */}

**New collection** で **Smart collection** をオンにすると、ライブラリのレコードを明示的なルールからスクリーン化します。 **Scope**(すべての参照、プロジェクト、またはコレクション)を選択し、必要な**Inclusion criteria**とオプションの**Exclusion criteria**を追加し、証拠と更新オプションを選択します。 通常のコレクションの説明とは異なり、スマートコレクションの説明はモデル評価のためのコンテキストを提供します。

**Settings → Model → Classification models → Smart collections** を最初に構成します。 この機能はデフォルトモデルがありません。 **Included**、**Needs review**、**Excluded**、**Not evaluated**は、マッチした、不確実性、拒否された、および評価されたレコードを区別します。 **Evaluation details** を開き、**Include** または **Exclude** を選択する前に実際のソースを確認します。 マニュアル決定は、モデルの決定を復元するまでの更新を生き残ります。

**Trial run (up to 20 references)**は結果を保存します。 **Live rule preview**は、保存せずにドラフトを評価します。 **Update automatically** は、選択したスコープのレコードの新規または変更に適用されます。 オプトインで分類コストを削減できます。 図書館の外に新しい紙が見つかりません。 検索から [説明されたスクリーニングワークフロー](../workflows/screen-literature.md) をフォローして、レビューされたエクスポート.

ランニング中、オープン **Screening process** 進捗状況を調べ、利用する **マウス/リズメ分析** 休止・継続 ルールの変更、紙や保存後の進捗状況は、以前の実行を非推奨にすることができます。 **結果に戻る**は決定リストに戻ります。 **Project**と**コレクション**スコープマーカーは、ソースタイプとソースへのリンクを区別します。 複数のユーザー共有権限ではありません。

## 採択された記録を整理する {/* #organize-the-accepted-records */}

**New collection**と**Smart collection**オフで普通のコレクションを作成し、**Name**とオプションの**Description**を埋め、その後**Create collection**. 説明は、エージェントのコンテキストではなく、組織的なテキストです。 退会/解散は、ドラフトを破棄します。 すべての参照でレコードを選択し、**Add to collection** または **Add to project** を使用します。 選択は操作の後で取り除きます; 別の宛先を追加した場合、再選択します。

詳細ビューでは、プロジェクトとコレクションのチェックボックスがリンクを表示します。 **Manage Tags** は組織タグを追加します。 テーブルのワンツーファイブスターの評価は、自動証拠品質スコアではなく、あなたのアノテーションです。 **Clear selection**は変更されていないレコードを残します。

| テーブル制御 | スコープ |
| --- | --- |
| 文献を検索 | タイトル、クリエイター、出版物、識別子、抄録およびメモを含む文献分野 |
| 文献を並べ替え | 表示される注文を選択します。 |
| フィルター | 利用可能なタイプ、年、タグ、全文条件で絞り込む |
| カスタマイズ | 表示された列を選択/注文する |
| 1ページあたりの文献数 | 25、50または100行 |
| 列チェックボックス / 全て選択 | 利用可能なバルクアクションのターゲットを設定する |
| エクスポート | 選択されたバイブリグラフの記録を輸出して下さい; すべてのPDFを自動的にパッケージしません |

ライブラリの総数は、現在の検索/フィルタ結果に依存しています。 バッチアクションの前に表示されたビューと選択数を読みます。 小さなフィルタリング結果はレコードが削除されたという意味ではありません。

レコードを隠す前に、検索とフィルタをクリアすると消えました。 プロジェクト/コレクションのリンクは、各目的地の独立したメタデータバージョンを作成していません。

## 完全なテキストの追加と読み込み {/* #add-and-read-full-text */}

**Find full-text PDF**は、該当する公共プロバイダをチェックします:欧州PMC / PMC、OpenAlex、UnpaywallおよびarXiv。 利用可能な識別子と構成された連絡先/認証は、アプリケーパビリティを決定します。 ソース、バージョンラベル、URL を **Add attachment** の前にチェックします。

<p className="example-label"><strong>実践例</strong> 出版社PDFをPRISMA 2020レコードに添付</p>

**Add attachment**がソースが見つかったら、公開されているPDFをパブリッシャーからダウンロードし、同じレコードで**Add PDF**を使用します。 付属のPDFを開き、そのタイトルとDOIをパブリッシャーレコードと比較します。 この例では、**プレビューprisma-2020-statement.pdf** は、PRISMA 2020 紙: **806.1 KBと15ページ** のマッチングを示しています。

![著名な出版社 PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

ソース結果は保存された添付ファイルではありません。 付属のPDFはエージェントの読み込みの証明ではありません。 **Read with agent** は、その後のリクエストに対してコンテキストを供給します。 Composer `@` リファレンスは、すべての論文のフルテキストの自動含入ではなく、コレクションの助成金検索範囲を、正確なレコード、プロジェクトライブラリ、またはコレクションを選ぶことができます。 PDF読書制御は[プレビュー](previews.md)にあります。

パブリックコピーが見つからない場合は、チェックされたメタデータを保持し、適宜利用可能なローカルPDFを適切に使用してください。 背景の検索/ダウンロードタスクは、一時停止後現在の、再開、レビュー、およびキャンセル制御を公開することができます。 キャンセルは、以前のアイテムが元に戻っていることを意味するものではありません。

<ToolOperationGroup>
<summary>バッチで全文を取得し、後から再開</summary>

### バッチで全文を取得し、後から再開 {/* #retrieve-full-text-in-batches-and-resume-later */}

1. ライブラリの意図したレコードを選択し、選択の**More actions → Find full-text PDF**を開きます。
2. 検索開始後、必要に応じて**Pause**を選択してください。 タスクが一時停止する前に、現在の項目が終了します。
3. **チェック** と **Pending** を確認し、**Continue search** を選択します。 パネルを閉じた後、**Background tasks → Open**を介して同じタスクに戻ります。
4. アイテムを選択し、**Add selected**をクリックする前に、各候補のソースと警告を確認します。
5. ダウンロードは一時停止と**Continue download**にも対応しています。 最終的な**追加 / 失敗 / スキップ**の状態を点検し、首尾よく加えられた付属品を再開して下さい。
6. 不要なレビュー準備タスクを破棄するには、**Background tasks**で**Remove task**を使用します。 削除後、タスクがなくなり、その参照と添付ファイルがまだ開いていることを確認します。 タスクを削除しても削除しません。

![保留記録を保持する現在の項目の後に一時停止を検索する](/img/open-science/priority-completion/14-literature-batch-paused.webp)

悪用された検索は、そのチェックとペンディングレコードを保持します。 タスクを継続または再開した後、最終カウントと各アイテムの結果を調べます。 PDF 添付ファイルの表示と成功は別々の結果です。

![背景タスクから完了した5レコード検索を再開](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>ソースが存在しますが、PDF は追加できません。</summary>

### ソースが存在しますが、PDF は追加できません。 {/* #a-source-exists-but-the-pdf-cannot-be-added */}

**PDF could not be added**では、ソースのサインイン要件、リンクの有効性、表示サイズ制限、および現在のプロキシ/DNS構成を確認します。 再試行メカニズムとして重複する参照を作成することを避けて下さい。

PDF ソースが `198.18.x.x` などの予約アドレスに解決した場合、ダウンローダーは拒否します。 [ネットワーク](network.md)をフォローして、検証可能なパブリックリゾリューションを復元し、再試行します。 アドレスチェックを無効にしない。 PDF を既にダウンロードしている場合は、**Add PDF** を使用して、タイトル、DOI およびページ数を確認します。


</ToolOperationGroup>

## 書式とコピー引用 {/* #format-and-copy-citations */}

**More actions → Citation** を開きます。 **Citation style**を選択し、参照とテキストの形式を調べ、必要に応じて**Copy reference**、**Copy in-text citation**、**Copy BibTeX**または**Copy RIS**を選択します。 再使用する前に、名前、年、句読点およびDOIをソースにチェックします。 対応する表現は不完全なレコードを修復しません。

**Manage citation styles…**はスタイル管理を開きます。 バンドルセットには、APA、MLA、シカゴの作者、バンクーバー、IEEE、ネイチャー、AMA、Harvardが含まれます。 **Preview**はスタイルサンプル、**Browse styles**は外部スタイルカタログを開き、**Import CSL**はローカルスタイルファイルをインポートします。 PLOS CSL のインポートとそのアプリケーションは、以下に検証されます。 コピーとエクスポートは、別の操作です。 伝記を移動するときに両方をチェックしてください。

<ToolOperationGroup>
<summary>ジャーナルスタイルをインポートした後、実際の引用を確認してください</summary>

### ジャーナルスタイルをインポートした後、実際の引用を確認してください {/* #check-a-real-citation-after-importing-a-journal-style */}

<p className="example-label"><strong>実践例</strong> PLOSの引用スタイルをPRISMAレコードに適用します</p>

**Library → Settings → Import CSL**では、[CSLスタイルリポジトリ](https://github.com/citation-style-language/styles/blob/master/plos.csl)から独立した`plos.csl`ファイルを選択します。 この例では、**Imported styles** はゼロから1つに増加し、**公立科学図書館** を示しました。 PRISMA レコードの **Citation** パネルに戻り、**Citation style** でそのスタイルを選択します。 番号付き参照と`[1]`のテキスト引用をチェックします。 スタイル管理プレビューでは、サンプル記事を使用します。 引用をコピーする前に、実際の記録を調べてください。

![実際のPRISMAレコードに適用されるPLOSスタイルをインポート](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>引用符をコピーするか、再使用可能なレコードをエクスポートする</summary>

### 引用符をコピーするか、再使用可能なレコードをエクスポートする {/* #copy-a-citation-or-export-reusable-records */}

<p className="example-label"><strong>実践例</strong> コピー&ラウンドトリップPRISMA引用レコード</p>

4つのシテーションのコピー ボタンはクリップボードに異なった表現を書きます。 意図したエディタに貼り付け、パネルを離れる前に結果を検査します。

| ボタン | 結果はPRISMA 2009のために点検しました |
| --- | --- |
| 参考文献をコピー | APAは、4人の個人作者、PRISMAのグループ、年およびDOIを保持しました |
| 本文中の引用をコピー | `(Moher et al., 2009)` |
| BibTeXをコピー | サインイン `@article` 括弧で囲まれた組織の作者へのエントリ |
| RISをコピー | とりあえず `TY  - JOUR` 著者、タイトル、年、DOI フィールドでレコード |

![実際のPRISMAレコードのシテーションコピーコントロール](/img/open-science/local-todo-batch/01-citation-copy.webp)

ファイルのシテーションを閉じ、必要なテーブル行を選択し、**Export → BibTeX**または**RIS**を選択します。 システム保存ダイアログの場所を選択し、**Saved**を待ちます。 これらのファイルは、PDFアタッチメントバンドルではなく、バイブリグラフレコードが含まれています。 保存したファイルを**Reuse existing reference**でテストコレクションにインポートし、マッチ数を確認します。 PRISMAファイルがエクスポートされ、別のレコードを作成せずに既存のDOIを再使用しました。

BibTeX は、ここの年と月を格納するので、その往復は `2009-7` を返す; RIS は `2009-07-21` を保持しました。 メルジング時に日付精度をチェックします。 Plain RIS の作者フィールドは、別の管理者に別の組織名タイプを保持しない場合があります。 その区別が重要であるとき輸入された作成者の編集者を点検して下さい。


</ToolOperationGroup>

## 重複を解決し、参照を回復する {/* #resolve-duplicates-and-recover-references */}

<p className="example-label"><strong>実践例</strong> 添付ファイルでPRISMAレコードをマージして復元</p>

<ToolOperationGroup>
<summary>1つのレコードとその添付ファイルを保持する</summary>

### 1つのレコードとその添付ファイルを保持する {/* #keep-one-record-and-its-attachments */}

1. **Duplicates → Review duplicates** を開きます。 ビューは、現在のコレクションだけでなく、アクティブなライブラリレコードをスキャンします。
2. **Keep reference** では、検証済みの ID でレコードを選択します。 DOI、作成者、添付ファイル数、日付を比較します。 **Show all fields**は、対立したビューで隠されているフィールドを明らかにします。
3. 各競合フィールドで、ソースを選択します。 PRISMA BibTeX比較では、`2009-7`上の完全な`2009-07-21`公開日を選択します。 他のレコードから空のフィールドを埋めることができます。
4. **After merging** とその添付ファイル、コレクション、プロジェクト数を読みます。 それから**Merge references**を選んで下さい; **Cancel**はレコードを別々に残します。
5. 生存者を再オープンし、メタデータ、リンク、PDF コンテンツを検証します。 **Merged duplicate** としてゴミ箱にマージアウトレコードが現れます。

![生存者と競合する出版物の日付を比較する](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

そのタイトルの代わりに抽出されたファイル名を持つPDFは、重複したグループを入力することはできません。 発行者レコードを使用してタイトルとDOIを修正し、マッチンググループを確認します。 合併後、保持されたPDFが開き、コレクション/プロジェクト協会がまだ存在していることを確認します。

![合併されたレコードは、PDFおよび組織リンクを保持します](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>誤って削除された参照を復元する</summary>

### 誤って削除された参照を復元する {/* #restore-an-accidentally-removed-reference */}

行の **More actions → Move to Trash** を使用します。 アクティブなライブラリ、プロジェクト、およびコレクションビューから消えます。 **Trash**では、タイトルまたは識別子で検索し、行メニューを開き、**Restore**を選択します。 編集、プレビュー、またはエクスポート前の復元: これらの制御はゴミ箱で無効になっています。 元のプロジェクトとコレクションを再オープンし、復元されたリンクを確認します。 この例では、PRISMAレコードの復元はPDFと3つのリンクをすべて保持しました。

![ゴミ箱のメニューから参照を復元する](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>永久に不要な重複を削除</summary>

### 永久に不要な重複を削除 {/* #permanently-remove-an-unwanted-duplicate */}

ゴミ箱では、**More actions → Delete permanently**を選択し、確認をお読みください。 **Cancel**は行を保存します。 確認は、選択した参照とメタデータを削除します。 未共有の添付ファイルが後からクリーンアップされます。 過去の出力は保存され、検索インデックスは別々に期限が切れるので、これは安全な消去ではありません。 削除する前に必要なものをエクスポートします。

削除後、選択したレコードがゴミ箱を残し、保持された参照が添付ファイルでまだ開いていることを確認してください。 収集リンクを削除し、記録をゴミ箱に移動し、永久に削除すると、異なるスコープがあります。

![精密な永久削除の規模を読んで下さい](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## 添付ファイルの変更と同時編集 {/* #attachment-changes-and-concurrent-edits */}

添付ファイルを取り外す前に、削除確認を読んで、対象となるファイル/バージョンを確認します。 利用可能なバージョン履歴を使用して、以前の添付ファイルバージョンを調べます。 PDFを取除き、その参照をゴミ箱に移動し、参照を永久に削除することは異なるスコープを持っています。 保留中の会話証拠は、クリーンアップを制限することができます。

エディタが開いている間、別のクライアントがコレクションを変更した場合、ストール保存は拒否できます。 最新のコレクションを再オープンし、意図した変更とその状態に対する再試行で保存された値を比較します。 保存後のリフレッシュまたはクリーンアップエラーは、自動的に保存が失敗するという意味ではありません。アクションを繰り返す前に、現在のレコードを調べます。


ソース: [バッチ輸入](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx)、[メタデータエディタ](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx)、[添付ファイル履歴/削除](https://github.com/aipoch/open-science/commit/f4a82d4a)、[同時編集](https://github.com/aipoch/open-science/commit/dbb9560a)。

## PDF読書ノートを保って下さい {/* #keep-pdf-reading-notes */}

リファレンスのPDF添付ファイルを開き、注釈、ページ質問、ドキュメントノートに**Notes & Annotations**を使用します。 同じライブラリファイルバージョンでは、プロジェクトとセッション間でこれらのメモを共有しています。 **Library** をグローバル検索で見つけ、**Show annotation source** を選択して PDF に戻します。 手順とエクスポートについては、[PDFの注釈と文書のメモ](pdf-notes.md) を参照してください。
