---
title: "Specialistの作成と指示"
last_update:
  date: '2026-11-11'
---

# Specialistの作成と指示 {/* #create-and-instruct-a-specialist */}

<p className="example-label"><strong>例</strong> RNA-seq QC レビュアーの役割を作成する</p>

**RNA-seq QCの査読器** を作成して、生計結果が独立して確認します。 この例では、識別子、数値の完全性および算数の不変性に焦点を合わせ、この境界チェックの外で生物学的解釈を維持します。

## 責任を証明できるようにして下さい {/* #make-the-responsibility-testable */}

入力と期待される出力は、「エキスパートです」だけでなく、QCレビュー担当者は、どのテーブルが読み込まれているか、どのチェックが渡されたかを正確に報告する必要があります。 メタデータのみのレビューは、元のカウントを返済させると主張してはならない。 ファイルの handoff の場合、アプリで返された現在の immutable バージョンを使用します。 filename はバージョン ID ではありません。

保存されたロールは、実際の委任されたインラインCSVレビューで、再オープン、エクスポート、複製および使用されました。 その独立した算術はすべての12サンプルのinvariantsを渡しました。 証拠境界とファイルハンドオフの制限については、[委任および確認](./delegate.md)を参照してください。

## ロールを作成する {/* #create-the-role */}

1. **Resource center → Specialists → Add specialist → Write from scratch** を開きます。
2. 説明として名前と**追跡可能な公共の生物医学の入力を使用して未加工計算の完全性およびサンプルのメートルを点検して下さい。**として**RNA-seq QCの査読器**を入力してください。
3. アイコンと色を選択します。 たとえば、**脳/紫色** を使用します。 ライブプレビューはリスト/ピッカーの外観を示しています。
4. **Advanced settings** を拡張し、生成された ID `rna-seq-qc-reviewer` を生成する前に検査します。
5. 下記の手順をご入力ください。
6. **Full access**をオフにし、RNA-seq SkillとOmicsのアーカイブを[機能](./capabilities.md)に表示し、**Create specialist**を選択します。
7. 保存した行を検索し、再度開きます。 正確なID、指示、および2つの機能結合を確認します。

![英語のSpecialistエディタのアイデンティティフィールド](/img/open-science/capabilities-walkthrough/04-specialist-identity.webp)

```text
You review bulk RNA-seq raw-count quality. Use the rnaseq-count-qc Skill when validating a count matrix. For a precomputed QC table, inspect the full sample identifiers, numeric completeness, nonnegative values, and whether zero-count plus detected genes equals the stated gene count. Use available Notebook tools for arithmetic; do not install new packages for this bounded review. Cite source filenames and actual outputs. Separate verified findings from unresolved checks. Never infer differential expression, clinical significance, or quality cutoffs from library totals alone. For metadata queries, use only the assigned Omics Archives connector. Return a concise PASS/FAIL table and the limitations of the available input.
```

### エディタコントロール {/* #editor-controls */}

| フィールド | 意味と限界 |
| --- | --- |
| アイコン/色 | 出現だけ; これらを変更しても、モデルやアクセスは変更されません。 |
| 名前 | 必須; 80 文字まで。 |
| 説明 | オプション; 1,000 文字まで。 役割を選択するときに記述します。 |
| 高度な設定 → Specialist ID | 作成前の生成; その後は変更できません。 保存した ID を明示的な委任で使用してください。 |
| 指示 | 32,768 文字まで。 ベースプロンプトに追加。 ツールやアクセスルールを交換しません。 |
| フルアクセス | Main エージェントの Skills/コレクターを継承します。 承認モードの独立。 |
| Skills/コネクター | フルアクセスがオフの場合、明示的なバインディング。 |
| キャンセル | ドラフトを破棄します。 |
| スペシャリストを作成する | 新しいロールを保存します。 |
| 表示名 / パッケージバージョン / 変更を保存 | 既存の/インポートされたパッケージを編集するときに現れる。 保存された身元は固定されます。 |

実装参照: [スペシャリストEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx).
