---
title: "Создать и инструктировать Specialist"
last_update:
  date: '2026-11-11'
---

# Создать и инструктировать Specialist {/* #create-and-instruct-a-specialist */}

<p className="example-label"><strong>Пример</strong> Создание роли рецензента RNA-seq QC</p>

Создайте **RNA-seq QC Рецензия** для независимой проверки исходного счета. Пример фокусируется на идентификаторах, численной полноте и арифметических инвариантах, сохраняя биологическую интерпретацию за пределами этой ограниченной проверки.

## Сделайте ответственность проверяемой {/* #make-the-responsibility-testable */}

Укажите входные данные и ожидаемые результаты, а не только «вы являетесь экспертом». Рецензент QC должен точно сообщить, какую таблицу он прочитал и какие проверки прошли. Обзор только метаданных не должен утверждать, что он пересчитал исходные данные. Для передачи файлов используйте текущую неизменяемую версию, возвращенную приложением; Имя файла не является идентификатором версии.

Сохраненная роль была создана, вновь открыта, экспортирована, дублирована и использована в реальном делегированном обзоре inline-CSV. Его независимая арифметика прошла все двенадцать выборочных инвариантов. См. [Делегировать и проверять](./delegate.md) для границы доказательств и ограничения передачи файлов.

## Создать роль {/* #create-the-role */}

1. Открыть **Resource center → Specialists → Add specialist → Write from scratch**.
2. Введите **RNA-seq QC Рецензия** как имя и **Проверяйте целостность исходного счета и метрики выборки с использованием отслеживаемых общедоступных биомедицинских входов.** как описание.
3. Выберите иконку и цвет. В примере используется **Мозг / Purple**. Превью в прямом эфире показывает внешний вид списка / пикера.
4. Расширьте **Advanced settings** и проверьте сгенерированный ID `rna-seq-qc-reviewer` перед созданием.
5. Введите инструкции ниже.
6. Выключите **Full access**, назначьте RNA-seq Skill и Omics Archives, как показано в [Возможности](./capabilities.md), затем выберите **Create specialist**.
7. Найдите сохраненный ряд и откройте его заново. Подтвердите точный идентификатор, инструкции и два обязательных элемента.

![Поля идентификации в английском редакторе Specialist](/img/open-science/capabilities-walkthrough/04-specialist-identity.webp)

```text
You review bulk RNA-seq raw-count quality. Use the rnaseq-count-qc Skill when validating a count matrix. For a precomputed QC table, inspect the full sample identifiers, numeric completeness, nonnegative values, and whether zero-count plus detected genes equals the stated gene count. Use available Notebook tools for arithmetic; do not install new packages for this bounded review. Cite source filenames and actual outputs. Separate verified findings from unresolved checks. Never infer differential expression, clinical significance, or quality cutoffs from library totals alone. For metadata queries, use only the assigned Omics Archives connector. Return a concise PASS/FAIL table and the limitations of the available input.
```

### Редакторский контроль {/* #editor-controls */}

| Полное поле | Значение и предел |
| --- | --- |
| Икона / Цвет | только внешний вид; Изменение не изменяет модель или доступ. |
| Имя | Требуется; До персонажей 80. |
| Описание | факультативный; До персонажей 1,000. Описывает, когда выбрать роль. |
| Продвинутые настройки Specialist ID | Создан до сотворения мира. После этого не может измениться. Используйте сохраненный идентификатор в явной делегации. |
| Инструкции | До персонажей 32,768. Прилагается к базе срочным; Не заменяет инструмент или правила доступа. |
| Полный доступ | Наследует Main Агента Skills/Коннекторы; независимо от режима одобрения. |
| Skills / Коннекторы | Явные привязки, когда полный доступ отключен. |
| Отмена | Отбросьте проект. |
| Создать специалиста | Сохранить новую роль. |
| Имя дисплея / Версия пакета / Сохранить изменения | Появляется при редактировании существующего/импортированного пакета. Сохраненная личность остается фиксированной. |

Ссылка на осуществление: [Разработчик: Editor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx).
