---
title: "Skillsの管理と検証"
last_update:
  date: '2026-10-27'
---

# Skillsの管理と検証 {/* #manage-and-validate-skills */}

ローカルファイルやGitHubからテストされたメソッドをインポートし、コピーをエクスポートし、インストールしたSkillsを維持します。 現在のバージョンを保持する必要がある場合は、最初にメソッドをエクスポートします。

バッチ管理では、操作を適用する前に、選択したカウントを下部のアクション領域で確認します。 完了または失敗のフィードバックを読んで、その結果の項目を確認してください。 エントリーのみを選択すると、有効化、インストール、削除は行いません。

## マーケットプレイスからインストール {/* #marketplace */}

カタログの閲覧、インストール、アップデートについては、[Skillマーケットプレースガイド](marketplace.md)に従ってください。 この章では、Skills をインストールしたローカルおよび GitHub のインポート、エクスポート、メンテナンスについて説明します。

## ローカルパッケージのエクスポートとインポート {/* #export-and-import-a-local-package */}

<p className="example-label"><strong>例</strong> RNA-seq Skillのエクスポートとインポート</p>

1. **Settings → Skills**で`rnaseq-count-qc`を見つけ、**Actions → Export**を選択します。 ZIPを保存します。
2. **Add skill → Upload skills → Upload skill files**を選択し、ZIPを選択します。
3. **Confirm import**では、ソースファイル名と診断を検査します。 初期チェックは行いません。
4. **プレビュー rnaseq-count-qc** を開きます。 SKILL.mdとファイルリストを読みます。 実際の輸出は`references/sample-metric-schema.md`を維持しました。
5. プレビューを閉じ、候補を選択し、**インポート選択 (1)**を選択します。
6. インポートされた行を検索し、最終的な名前とソースを調べます。

![インポートする前にパッケージ全体を調べる](/img/open-science/capabilities-walkthrough/11-skill-package-preview.webp)

この例では、元の個人的なSkillは既に存在しました。 プレビューは **Name exists** を表示し、別の **インポート済み `rnaseq-count-qc-2`** を作成しました。 元のSpecialistの結合は残ります。 既存のパッケージのインポート更新を想定しないでください。 候補者のソースおよび更新/取り替えの診断を点検して下さい。

![インポートされたコピーと元の個人 Skill](/img/open-science/capabilities-walkthrough/12-skill-imported-copy.webp)

| インポート制御 | 業務内容 |
| --- | --- |
| すべてを選択 / 変換 / 候補チェックボックス | インポートするパッケージを発見したパッケージを選択します。 1つのアーカイブは、いくつかのSkillsを含むことができます。 |
| プレビュー/プレビューを閉じる | インストール前に指示とファイルを読み込みます。 |
| 名前が存在します/診断 | アイデンティティやコンテンツの問題について警告します。 インポート後の結果名を確認してください。 |
| 別のファイルを選択 | 現在の候補選択を置換します。 |
| 選択項目をインポート | 選択したインポートを実行し、成功、変更されていないパッケージや失敗を報告します。 |

マークダウンのアップロードはYAML `name`および`description`を必要とします; ZIP/`.skill` バンドルは SKILL.md が必要です。 ローカルアップロードは、指示に埋め込まれたURLから欠落したファイルを取得しません。 サポートされていないフォーマット、不足しているメタデータ、アーカイブサイズの制限と安全なアーカイブパスは、検証の失敗ではなく、検証を無効にします。

## 既にインストールされているローカルSkillを輸入して下さい {/* #import-an-already-installed-local-skill */}

<p className="example-label"><strong>例</strong> ローカルピアレビューパッケージをインポートする</p>

**Add skill → Import installed skills**は`~/.agents/skills`と`~/.codex/skills`をスキャンします。 この例では、ローカルスキャンが68候補を見つけたので、当初はすべての選択済みです。 **Select all installed skills**をクリアし、特定の方法を選択します。 現在選択されているものをチェックした後にのみ、**Invert**を使用します。

1. **プレビューピアレビュー** を開き、ソースフォルダ、指示、参照されたファイルをチェックします。
2. **Close preview**を選択し、`peer-review`のみを選択し、**インポート選択 (1)**を選択します。
3. **インポートされた1スキル**を待ちます。 候補者は**Imported**をラベル付けし、同じ輸入のために再度選ぶことができません。
4. Skillsに戻り、`peer-review`を検索し、インポートされた行を調べます。 ソースフォルダは、所定の位置に留まります。 Open-Scienceは輸入コピーを使用します。
5. インストールされたフォルダを変更した後に**Rescan**を使用してください。 再度インポートする前に、オリジン、セレクション、ステータスをリセットします。

![ローカルインストールされたピアレビューパッケージをプレビュー](/img/open-science/local-todo-batch/12-installed-skill-preview.webp)

![Skillsリストにインポートされたパッケージを見つける](/img/open-science/local-todo-batch/13-installed-skill-imported.webp)

インポート後、Skill の詳細でテンプレートと参照ファイルを調べます。 別のアシスタントからメソッドを使用する前に、その必要なツールとランタイム機能がこのセッションで利用可能であることを確認します。

## GitHubからインポートとアップデート {/* #import-and-update-from-github */}

<p className="example-label"><strong>例</strong> ESM-2 Skillのインポートとアップデート</p>

1. **Add skill → Import from GitHub** を選択します。 キーワード、`owner/repo`、`owner/repo@ref`、GitHub URL を入力し、**Find skills** を選択します。 再現可能なパッケージソースに固定された ref を使用します。
2. リポジトリと候補のカウントを読んでください。 このスキャンは、初期にすべての候補を選択しました。 必要な方法だけを選ぶ前に明確な**Select all**。 チェックされていないZIP確認画面とは異なります。
3. **Preview**を開き、解決されたコミット、フォルダ、指示、ファイルをチェックします。 リポジトリのスキャンは、内部フォルダだけでなく、ユーザーインターフェイスのSkillsを発見することができます。 このカウントは、アプリのSkillカウントをバンドルしていません。
4. プレビューを閉じ、意図した候補を選択し、**インポート選択 (1)**を選択します。 結果が待ってから、**Imported skills**でその名前を確認してください。
5. Skillsに戻り、その名前を検索します。 使用する前にソースと可用性を調べます。

![インポート前に GitHub Skill とピン留めされたソースを確認します。](/img/open-science/local-todo-batch/15-github-skill-preview.webp)

製品リポジトリから `fair-esm2` をインポートすると、ビルドイン名が既に存在していたため、**`fair-esm2-2`** が作成されました。 組み込みのパッケージは残ります。 インポート手順は、モデル重量をインストールしたり、その推論作品を確立しません。

### アップストリームのリビジョンを適用 {/* #apply-an-upstream-revision */}

意図した新しい ref で同じリポジトリをスキャンします。 既存の候補は **Update available** を表示できます。 その候補だけを選択し、それをインポートします。 既存のインポートされた行とプレビューを後で検査します。 ESM-2 チェックでは、同じ `fair-esm2-2` コピーが更新され、再び参照するスキャンが **Imported** を示しました。 更新された命令ボディはリポジトリの源に一致しました。 輸入業者は、フロントマッターとコリジョンセーフの名前を書き換えるので、全ファイルバイトは元のSKILL.mdと一致しない必要があります。

![インポートされたコピーに上流のリビジョンが使用可能です](/img/open-science/local-todo-batch/16-github-update-available.webp)

### GitHubのレート制限から回復する {/* #recover-from-github-rate-limiting */}

**GitHub はリクエスト率を制限しました** の場合、**Manage GitHub credential** を開き、使用可能なトークンを入力して **Verify and save** を選択します。 **トークン検証と保存**の後、スキャンを再試行します。 **Cancel**は保存せずに葉を残します。 スクリーンショットからトークンを保管し、レポートを発行します。

## 有効化、無効化、削除 {/* #enable-disable-and-delete */}

**Manage** を開き、ソース/スタタスでフィルタリングし、特定のメソッドを検索します。 アクションを適用する前に結果を選択します。 **選択済み (n)**は選択を示します; **Clear selection** はそれを空にします。 フィルター変更時に選択したセットをすべて見直します。

![インポートされたコピーは一括管理で無効になっています](/img/open-science/capabilities-walkthrough/13-skill-bulk-disabled.webp)

空室状況変更後、 Skill の詳細を再オープンし、その状態を確認します。 削除する前に必要な方法のエクスポートを保持します。

| アクション | 期待される結果 |
| --- | --- |
| 選択を有効にする | 選択された資格のあるパッケージを再度作って下さい。 行のステータスを確認します。 |
| 選択可能な無効 | 対象となるユーザー管理のパッケージを保持しますが、後でリクエストの Main エージェントの可用性を削除します。 アプリケーション必須 Skills は無効化できません。 |
| 選択した削除 | 選択された名前と削除性の結果で確認を開きます。 |
| 削除 n Skills | 確認後、対象となるローカルパッケージを削除します。 Skillのゴミ箱/復元ワークフローはありません。 |
| キャンセル | パッケージをインストールしたままにします。 |

Specialist-linkedパッケージは削除から保護できます。 obsolete の結合を取除き、または適切なときにユーザー制御のパッケージを無効にします。 アプリケーション必須 Skills は有効です。 [活性化ルール](overview.md#why-some-switches-cannot-be-turned-off) を参照してください。 削除後、選択したパッケージがフィルタリングリストから不在であることを確認します。

## アップデートと診断 {/* #update-and-diagnose */}

| シンプトム | チェックと次のアクション |
| --- | --- |
| インポートされたが、リストから不在 | ソース、エージェント、タグフィルタをクリアします。 サフィックスを含む結果名を検索します。 |
| インポート後に不足しているファイル | パッケージファイルリストと再エクスポートを調べる。 単一のMarkdownファイルには、別々の参照ファイルを自動的に含めることはできません。 |
| 編集時の紛争の修正 | 最新バージョンを再オープンし、変更を比較し、意図的に保存します。 |
| Skill は読み込みますが、関数は利用できません。 | パッケージが実際にカーネルヘルパーを提供しているかどうかを確認してください。 通常の指示はNotebook機能ではありません。 |
| パッケージ/ランタイムの欠損 | 利用条件 [科学ツール](../tools/scientific.md) 選択したランタイムのパッケージマネージャ。 |
| GitHub/authenticationエラー | 実際の HTTP ステータスとサニタイズされたソース URL を保持します。 詳しくはこちら [トラブルシューティング](../guides/troubleshooting.md). |

実装参照: [スキルアップロードビュー.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillUploadView.tsx)、[スキルBulkManageView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillBulkManageView.tsx)、[スキルImportView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillImportView.tsx)。

## Skill を安全にインポート・編集する {/* #import-batches */}

大量のインストール済み Skill はバッチ単位で取り込みます。最終結果と取り込み一覧を確認するまで繰り返さないでください。予約済み接頭辞を持つ外部 Skill には安全なローカル名が付きます。ローカルカタログの名前を使用してください。本文を保存したら、別途編集した名前と説明も保持されているか確認します。現在のメッセージの添付画像も Skill 選択に使われるため、実行前に選ばれた Skill の対象範囲を確認してください。

## GitHub リポジトリを保存する {/* #saved-repositories */}

**Import from GitHub → Find skills** でスキャン後、**Save repository** を選びます。次回は **Saved repositories** から再スキャンし、対象 Skill をプレビューして取り込みます。指定した ref は保持されますが、既定ブランチは変わる場合があります。保存だけでは Skill のインストールや自動更新は行われません。ブックマークを削除しても導入済み Skill は残ります。
