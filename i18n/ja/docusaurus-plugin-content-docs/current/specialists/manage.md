---
title: "スペシャリストの管理と共有"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# スペシャリストの管理と共有 {/* #manage-and-share-specialists */}

パッケージを使用して、設定されたロールを移動し、インポート後にローカル設定を完了します。 Skills、Connectorの参照およびローカル許可に異なった可搬性の規則があります。

バッチ管理では、操作を適用する前に、選択したカウントを下部のアクション領域で確認します。 完了または失敗のフィードバックを読んで、その結果の項目を確認してください。 エントリーのみを選択すると、有効化、インストール、削除は行いません。

## リストコントロール {/* #list-controls */}

| コントロール | 操作と期待される結果 |
| --- | --- |
| 専門家/カテゴリ フィルターを検索します | 矢印は、行をインストールしました。 保存されたロールが欠落した場合、フィルターをクリアします。 |
| 編集/ロール名 | 既存のエディタを開きます。 変更を保存し、再オープンして確認します。 |
| 変化の出現 | 指示を変更することなくアイコン/色を変更します。 |
| タグを管理 | 組織のラベルを割り当てます。 |
| トピックス | 削除せずにロールを有効/無効にします。 |
| アクション → 重複 | コピーされた指示/バインドとコピー名で新しいロールドラフトを開きます。 スペシャリストの作成は必須です。 |
| アクション → エクスポート ZIP | 輸出選択を開き、ポータブルパッケージを保存します。 |
| アクション → 削除 | 恒久的な削除確認を開きます。 任意Skillの削除を別に点検して下さい。 |

役割を削除する前に、そのSkillsを削除するためのオプションを調べます。 他のロールがまだ使用している場合は、共有Skillsを保持してください。 重複を削除するには、元のロールを削除する必要はありません。

![共有されたSkillsを保ちながら、使い捨てのロールを削除](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## パッケージの共有とインポート {/* #share-and-import-a-package */}

### 必要なSkillファイルでエクスポート {/* #export-with-the-required-skill-files */}

<p className="example-label"><strong>例</strong> Skillでレビューロールをシェアする</p>

1. RNA-seq QC の査読機の **Actions → Export ZIP** を選んで下さい。
2. **Choose Skills to include**では、受信者がファイルを必要とする場合は、明示的に`rnaseq-count-qc`を選択します。 インストールされた個人/インポートされたSkillは、デフォルトでは必ずしも含まれていません。
3. 共有する前にアーカイブをエクスポートし、検査します。

![Specialistパッケージに含まれているSkillを選択](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

実際の<ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">Skill のパッケージ</ExampleDownload>は`manifest.json`、`specialist.json`、`skills/rnaseq-count-qc/SKILL.md`および参照のスキーマを含んでいます。 最小限のエクスポートは、2つのJSONファイルだけを含むことができます。 Connector ID は参照です。 認証情報、ローカルの信頼、フルアクセスは既定の許可として転送されません。

### インポート、競合を解決、セットアップを終了 {/* #import-resolve-conflicts-finish-setup */}

1. **Add specialist → Import ZIP → Choose ZIP** を選択します。 1つのパッケージは1つのSpecialistを丁度含んでいます。 **Download template**はアプリケーションパッケージテンプレートを提供します。
2. 名前、公平なID、版、束ねられたSkills、アーカイブの限界および診断を点検して下さい。
3. 各Skillの競合については、**Keep installed Skill**または**Use package Skill**を選択します。 2番目の選択肢は、そのSkillのすべての現在のユーザーのためのファイルを置き換えます。 **今感染しました** を読みます。
4. 既存のSpecialist IDの場合、**Review overwrite**を選択し、必要に応じて現在のバージョンを調べて、現在のバージョンを最初にエクスポートします。 **Overwrite and continue** は別の確認です。
5. インポートされたロールは**無効 / セットアップ完了**を保存します。 エディタの指示と機能の結合を点検し、意図したアクセススコープを選択し、**Save changes**はセットアップを完了し、有効にします。
6. インストールしたロールを再オープンし、小さなスコープ付きタスクを実行します。

![インポート中に実際のRNA-seq Skillの競合を解決](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**バージョン変更なし** は Skill の競合を伴っても構いません。 意図したSkillソースを明示的に選択し、そのバインディングとアクセススコープを確認するためにインポートされたロールを再オープンします。

| プレビュー制御 | 検査について |
| --- | --- |
| バンドルSkill拡張 | バージョン、異議、理由、ファイルリスト。 |
| アーカイブの制限 | 50 MB圧縮、200 MB非圧縮、2,000ファイル、25 MB/このUIのファイル。 |
| 診断 | エラー、警告、情報のブロック; 警告は明示的な選択を必要とするかもしれません。 |
| コピーレポート/JSONをダウンロード | トラブルシューティングのための診断を輸出して下さい。 共有する前にレポートを確認します。 |
| キャンセル | インストールせずにプレビューを残します。 |
| 次 / レビュー上書き | 必要な選択と検証が許可される場合にのみ継続します。 |

**ブラウザからのインポート:** は **Import ZIP → Choose ZIP** を選択し、パッケージを検査し、競合を解決し、ロールを有効にする前にローカル設定を完了します。 クライデンシャルと信頼の設定は、宛先デバイス上に設定する必要があります。 アップロードが失敗した場合は、エラーを保持し、[トラブルシューティング](../guides/troubleshooting.md)に従ってください。

## マーケットプレイスをブラウズ {/* #browse-the-marketplace */}

**Marketplace** を開き、役割を検索し、**View details** を選択します。 出版社、ソース、バージョン、ライセンス、ダウンロードサイズをチェックし、Skills/コレクターが含まれています。 **Refresh Marketplace**はカタログを更新します; **Manage Marketplace sources** は構成されたソースを制御します。 すべての/公式/コミュニティフィルタは、ランタイムの信頼性ではなく、カタログの起源に関心を寄せます。

![実際のオートリサーチSpecialistパッケージの詳細](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

**Install Specialist** を選択し、**Marketplace** にロールが表示され、有効状態とバインディングを調べます。 カタログパッケージは、すべてのアプリケーション機能ではなく、そのパッケージを記述します。 インストールは、研究タスクを実行したり、外部の依存性を準備したりしません。 使用する前に必要なセットアップを完了して下さい。

![オートリサーチのインストールと有効化](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

## 共有する前に検証する {/* #verify-before-sharing */}

役割をインポートまたは変更した後、割り当てられた機能を使用して小さなタスクを実行し、保存された出力を検査します。 既存のメソッド、PCA、および行列例の[インストールしたSpecialistで解析を拡張する](../workflows/extend-analysis.md)に従ってください。 選択したルートに必要な入力と未解決の制限を確認してください。

実装参照: [スペシャリストパネル.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
