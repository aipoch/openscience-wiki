---
title: "Обновить существующую коллекцию литературы"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Обновить существующую коллекцию литературы {/* #update-an-existing-literature-collection */}

<p className="example-label"><strong>Практический пример</strong> Пресноводный микропластиковый транспорт через два окна публикации</p>

Обновление должно сохранять исходное правило поиска и показывать, что именно было добавлено. Эта историческая реигра сначала создает коллекцию **2020–2022**, а затем ищет **2023–2025** с тем же запросом и фильтрами. Реальная библиотека растет от **Отсылки 7 к 14**. Это ручной, ограниченный поиск; Это не плановый мониторинг или исчерпывающий обзор.

## 1. Определить и сохранить исходный уровень {/* #1-define-and-save-the-baseline */}

Откройте проект с подключенной моделью. Включите **График литературы** в **Resource center → Connectors** и настройте OpenAlex, если это необходимо. Отправить:

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

Этот забег вернул **12 матчей 3,643**, сохранил **7** и исключил **5**. Откройте **freshwater-search-plan.md**, чтобы проверить критерии и даты, прежде чем продолжить. Сохраненный план описывает состояние перед обновлением.

![Сохранена базовая спецификация поиска и сохранены записи](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

Проанализируйте уровень доказательств: некоторые кандидаты предоставили только название / метаданные, в то время как другие включили разрешенную лицензию. Обзоры широких транспортных путей включены в качестве контекста; Их включение не доказывает экспериментального результата, характерного для пресной воды.

## 2. Создать и заселить коллекцию {/* #2-create-and-populate-the-collection */}

Скачать <ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">Базовый RIS</ExampleDownload>. В **Library → New collection** создайте **Пресноводный микропластиковый транспорт**, выберите его, затем выберите **Import references**. Выберите RIS и проверьте пункт назначения и соответствующее поведение перед импортом.

![Базовый предварительный просмотр импорта для названной коллекции](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

Зарегистрированный импорт завершается **7 Created, 0 Reused, 0 Skipped, 0 Failed**. Нажмите **Done** и подтвердите, что в коллекции семь ссылок. Существующие спички в другой библиотеке могут изменить созданный/повторно используемый сплит.

![Семь справочных базовых коллекций](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. Поиск в окне следующей даты в том же разговоре {/* #3-search-the-next-date-window-in-the-same-conversation */}

Вернемся к обсуждению проекта. Сохраняйте исходные файлы неизменными и запрашивайте явное сравнение:

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

Это обновление вернуло **12 матчей 7,600** с **Добавления 7, перекрытия базовой линии 0 и исключения 5**. Оба поиска усечены до кандидатов 12. Рейтинг и охват базы данных могут меняться; В таблице приведены данные о сентябрьском запуске 16, 2026.

![Сохраненный аудит обновлений с дополнениями и исключениями](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

Проверяйте фактические наборы DOI, а не вычитайте итоговые значения. Сохраните датированные <ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">обновление аудита</ExampleDownload> и <ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">Обновление заметок</ExampleDownload> вместе с исходным уровнем.

## 4. Импортные дополнения в существующую коллекцию {/* #4-import-additions-into-the-existing-collection */}

Скачать <ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">Добавления RIS</ExampleDownload>. Выберите **Пресноводный микропластиковый транспорт** в библиотеке и выберите **Import references** Храните **Reuse existing reference**, чтобы уже существующий элемент можно было безопасно использовать повторно.

![Предварительный просмотр импорта обновления, показывающий семь дополнений](/img/open-science/workflow-extensions/freshwater-import-update.webp)

Фактический импорт обновлений был завершен с помощью **7 Created, 0 Reused, 0 Skipped, 0 Failed**. В настоящее время коллекция содержит **14 ссылки**. Это согласуется с нормализованным объединением DOI двух сохранившихся наборов.

![Обновленная коллекция с четырнадцатью ссылками](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

Сама базовая линия не была переписана. Сохраняйте диапазон дат и записи поиска, чтобы читатели могли отличить оригинальную доказательную базу от обновления. Чтобы поддержать предложение или научное утверждение, достаньте и прочитайте соответствующие полные тексты далее. Включение метаданных само по себе не является оценкой доказательств. Для перекрывающихся пакетов запросов см. [Объединить поисковые партии](merge-literature-searches.md).

Загружаемая аудиторская копия не содержит полных тезисов и их лицензионных полей; Идентификаторы, решения и причины сохраняются. Проверяйте аннотации в связанных источниках.
