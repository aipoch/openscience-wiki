---
title: "記録されたセッションの再生と議論"
last_update:
  date: '2026-10-08'
---

# 記録されたセッションの再生と議論 {/* #replay-and-discuss-a-recorded-session */}

セッションリプレイでは、メッセージ、ツールの手順、およびセッションで保持されるファイルバージョンを提示します。 分析に従うためにそれを使用して下さい、証拠を見つけ、焦点を絞られた質問をして下さい。 プレイバックはコードを再実行したり、解析が再現可能であることを確立したりしません。 別のタスクに [再現性検証](reproducibility.md) を使用します。

## リプレイを開く {/* #open-replay */}

1. サイドバーのセッションのアクションメニューを開き、**View replay**を選択します。 `.science` セッションをインポートすると、**Imported research history** パネルは **View replay** も提供します。
2. セッションのタイトルとブランチをチェックします。 **Replay branch** が提供されているときは、検査するブランチを選択します。
3. **Enter full screen**は、より多くのスペースで使用できます。 **Exit full screen** はワークスペースに戻ります。 プレビューを閉じると、セッションを削除しません。

インポートされた研究は、読み取り専用のままです。 検査・相談ができます。 書き込み可能な継続が必要な場合は、**Fork to continue**を選択します。 [研究パッケージの輸入](research-packages.md#import-and-inspect-a-package) をフォローして再生します。

## 記録された手順に従ってください {/* #playback-controls */}

| コントロール | アクション |
| --- | --- |
| Play replay / Pause replay | 保存されたシーケンスのプレゼンテーションを開始または一時停止する |
| Previous step / Next step | 隣接した記録されたステップに移動 |
| Replay progress | 録音中の別のポイントを見る |
| Playback speed | プレゼンテーション速度の変更; これは計算を加速しません |
| Browse steps | ラベルでメッセージ、ツールステップ、ファイルバージョンイベントを選択します。 |
| Notebook / View files | その点で利用可能な記録されたNotebook素材またはファイルリストを調べる |
| Watch again | 再生が終了した後の再起動が完了 |

保持された入力と出力を読み取り、ツールカードを拡大します。 結果を使用する前にファイル名とバージョン番号を調べます。 同じ録音に戻るために、再生位置を保持します。 古いセッションでは、アーカイブされたレコードから再構築されたタイムラインを表示することができます。 プレゼンテーション期間は、元の計算のベンチマークではありません。

<p className="example-label"><strong>実践例</strong> TP53経路解析における証拠を開示</p>

この例では、Reactome **TP53によるトランスクリプション規制** を選択した [Pathway Commons解析](../workflows/inspect-pathway.md) が開きます。 そのエクスポートには、3,318 のインタラクションレコードと 387 ノードが含まれています。 これらは、すべての将来のクエリから期待するカウントではなく、保存された分析の結果です。

**Browse steps**では、エクスポートされたネットワーク、元の応答、研究ノートおよび小さいTP53–MDM2–CDKN1Aの相互作用テーブルを見つけて下さい。 たとえば、12 レコードの手順があります。 表のファイルバージョンのステップを選択し、ネットワークのスコープの前の説明をお読みください。

![実際の TP53 は、記録された手順、ファイルバージョン、再生制御で再生します。](/img/open-science/v0350/replay-step-list.webp)

## ステップについて尋ねる {/* #discuss-replay */}

1. 関連するステップで使用し、**Ask about this step**を選択します。 より広い議論のために、ヘッダで**Ask about this research**を使用してください。
2. **Ask in a conversation**では、書き込み可能な会話または**New conversation**を選択します。 アクションは、ドラフトにコンテキストを追加します。 質問を自分で送らない。
3. **Discuss**の添付ファイルとセッション/ステップラベルを確認してください。 質問を入力し、接続されたモデルを選択し、**Send**を選択します。 たとえば、**Codex subscription** を使用します。
4. ツールの承認が必要な場合は、必要な操作を可能にする前に提案されたアクセスを調べてください。 その後、保存された証拠とそのソースコンテキストとの応答を比較します。

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

回答は、`tp53_mdm2_cdkn1a_readable_interactions.tsv` を識別し、フラットなエクスポートが生物学的結論から含まれているかを区別します。 選択したソースセッション、ブランチ、ステップにポイントします。 通訳を取り入れる前に、そのソースを再び読みます。 リンクされたレコードは、すべてのモデルの要求を正しくしません。

![録画TP53分析の横にある完成したCodexの議論](/img/open-science/v0350/replay-answer.webp)

## 証拠が利用できなくなった場合 {/* #replay-evidence */}

元の実行環境が利用できなくなった場合でも、記録されたツールコールは表示できません。 保持されたコードおよび出力を読んで下さい; 環境警告を新しい実行結果として扱うことはありません。

ファイルが **プレビューは利用できません** または **The recorded evidence is unavailable** を報告する場合、元のセッションのファイルカードと選択したバージョンを確認してください。 そのビューも開くことができない場合は、別々に保持された元のファイルを使用して、またはその著者からの完全な研究パッケージを入手してください。 ファイル名と完了した再生タイムラインは、ファイルの内容が利用可能であることを証明しません。 実際に検査できる証拠だけを調べます。

[セッションをフォークする](sessions.md#fork-session)は、新しい計算のために、必要なファイル/環境を供給し、分析を実行します。 保存されたアーティファクトで新しい実行を比較するには、再生の**Completed**インジケータではなく、[再現性検証](reproducibility.md)を使用してください。
