---
title: "スペシャリストと利用可能な役割"
last_update:
  date: '2026-11-11'
---

# スペシャリストと利用可能な役割 {/* #specialists-and-available-roles */}

Specialistは、アイデンティティ、指示、および許可されたSkills /コレクターの保存された研究の役割です。 再発の責任が一貫したスコープまたは別々のサブタスクを必要とするときの1つを使用してください。 ロールの名前だけでは、専門知識や検証を確立しません。

## 利用可能な役割を理解する {/* #understand-the-available-roles */}

| 役割またはソース | 使い方 | 構成できるもの |
| --- | --- | --- |
| メインエージェント | 会話を扱い、委任された仕事を調整できます | セッションモデル、エージェント制御、利用可能な機能 |
| カスタムSpecialist | 定義された研究タスクのためにローカルに作成される | アイデンティティ、指示、明示的な Skills/コネクタまたはフルアクセス |
| インポート/マーケットプレイス Specialist | パッケージからインストールし、このデバイスで設定 | ローカル設定と許可された機能; パブリッシャーとパッケージのバージョンを調べる |
| ビルトインレビュアー | アプリのレビューワークフローを実行する | 会話を通してトリガーレビュー; それは通常の編集可能/delegatable Specialistではないです |

**Marketplace** を開き、公開されたロールを見つけます。 オンラインカタログは、インストールされたアプリの独立して変更することができます。 インポートする前に、各ロールのパブリッシャー、指示、依存関係を調べます。

## 役割を見つける {/* #find-a-role */}

**Resource center → Specialists** を開きます。 **Installed** は、査読者を含むローカル登録ロールをカウントします。 **Search specialists**と**Filters → Filter specialists by category**を使用して、行を開き、それを検査します。 **Marketplace**は別のカタログを開けます; パッケージ/セットアップフローを完了するまで、リストされた市場エントリーはインストールされません。

![RNA-seq QCの査読装置はローカルに取付けました](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

## マーケットプレースの役割が観察される {/* #marketplace-roles-observed */}

| プロフィール | 集中研究スコープ |
| --- | --- |
| オートリサーチ Specialist | 生物医学の証拠、分析、検証および執筆 |
| Cryo-EM 構造検証 Specialist | ハーフマップ、ジオメトリ、マップモデル検証計画 |
| Pharmacometrics PK/PDの設計Specialist | PK/PDの研究設計および不確実性は点検します |
| Multimodal Neuroimaging Connectomics Architect のマルチモーダル・ネロマイゼーション | MRI/fMRI/diffusionワークフローとネットワーク解析制御 |
| 合成ルート・反応最適化 Specialist | 反応計画と最適化の証拠 |
| エアロダイナミクスCFD検証と検証 Specialist | 数値コンバージェンスと実験コンパリソン計画 |
| 大気化学輸送モデルSpecialist | 排出、輸送および源流産学 |
| Specialistをスクリーニングする高スループットDFT | コンバージェンスと熱力学的一貫性チェック |
| アストロノミックフォトメトリーとタイムドメイン解析 Specialist | 校正、フォトメトリーおよび分散性分析 |
| 精密農業のフェノタイピングおよび規定の設計Specialist | UAVのフェノタイピングおよび空間検証ワークフロー |

これらは、10の完全な科学的ワークフローの証拠ではなく、カタログの説明を観察されます。 製品のレビュアーは、これらの章で使用されるカスタム**RNA-seq QCの査読器**と異なっています。

## ルートを選択 {/* #choose-a-route */}

- [作成と指示](./identity.md): ローカルリサーチロールを定義します。
- [能力を割り当てる](./capabilities.md):それが使用できるものを決定します。
- [委任および確認](./delegate.md):実際の子供が走るとその証拠を調べます。
- [レビュアーとオートレビュー](./reviewer.md):アプリの組み込みレビュープロセスを使用します。
- [管理と共有](./manage.md):パッケージ、インポート、競合を解決し、ローカルセットアップを終了します。

実装参照: [マニフェスト.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json)、[スペシャリストパネル.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx)。
