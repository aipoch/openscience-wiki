---
title: "Объединить литературные поисковые партии"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Объединить литературные поисковые партии {/* #combine-literature-search-batches */}

<p className="example-label"><strong>Практический пример</strong> Твердотельные электролитные интерфейсы и интерфазы</p>

Два поиска часто возвращают перекрывающиеся документы. Сохраняйте происхождение каждого поиска, просматривайте кандидатов, а затем импортируйте обе партии в одну коллекцию с повторным использованием на основе идентификатора. Этот пример извлекает две подлинные партии OpenAlex, сохраняет по восемь записей от каждой и заканчивается **Уникальные ссылки 15** в Библиотеке. демонстрирует организацию метаданных; Полные тексты не были получены или оценены.

## 1. Запустите и запишите оба поиска {/* #1-run-and-record-both-searches */}

В **Resource center → Connectors** включите **График литературы** и настройте его учетные данные OpenAlex по запросу. Откройте проект, начните разговор и выберите подключенную модель. Записанный прогон использовал Open-Science **0.30.1**, **Подписка Codex / gpt-5.6-sol**. Источник PDF не требуется.

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

Проверяйте фактическую активность Connector по запросам, датам и обратным подсчетам. Записанные запросы возвращали **12 кандидаты** из общего количества матчей **94,620** и **15,355**. Шапка делает эти ограниченные примеры, а не исчерпывающие обзоры. Обе партии поставляются от OpenAlex. Две формулы запросов не делают их независимыми базами данных.

## 2. Проверить экспорт перед импортом {/* #2-inspect-the-exports-before-importing */}

Открыть **electrolyte-merged.csv** под **Generated**. Проверьте сохраненные названия, DOI и членство в источнике против двух экспортных RIS и аудита кандидата. Фактический союз имеет ряды 15; DOI **10.1007/s41918-024-00212-1** встречается в обеих партиях и имеет маркировку **A &#124; B**.

![Сохраненный союз обеих поисковых партий, сохраняющий членство в источнике](/img/open-science/workflow-extensions/batches-merged.webp)

Для сравнения, обрезайте белое пространство DOI, удалите дополнительный префикс URL DOI и сравните случай-нечувствительно. Сохранить оригинальные идентификаторы в исходной записи. Одного лишь сходного названия недостаточно для того, чтобы доказать, что две записи идентичны. Неразрешенные конфликты идентификаторов требуют пересмотра.

Скачать <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">партия А</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">партия B</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">Все решения 24 кандидаты</ExampleDownload> и <ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">Профсоюз 15-Row</ExampleDownload>. Это экспорт из зарегистрированного объема.

## 3. Импорт первой партии в названную коллекцию {/* #3-import-the-first-batch-into-a-named-collection */}

1. Откройте **Library → New collection** и создайте **Твердотельные электролитные интерфейсы**.
2. Выберите эту коллекцию на боковой панели перед выбором **Import references**.
3. Выберите `electrolyte-batch-a.ris`. Проверьте, что **Import to** называет предполагаемую коллекцию.
4. Выберите **When identifiers match → Reuse existing reference**. Проверьте **View details**, затем выберите **Import references**.

![Превью импорта первой партии: восемь новых ссылок в выбранной коллекции](/img/open-science/workflow-extensions/batches-import-a.webp)

В записанной библиотеке первый импорт завершился **8 Created, 0 Reused, 0 Skipped, 0 Failed**. Нажмите **Done** и проверьте коллекцию. Если ваша библиотека уже содержит соответствующие записи, то созданный/повторно используемый раздел может отличаться.

## 4. Импорт второй партии и повторное использование перекрытия {/* #4-import-the-second-batch-and-reuse-the-overlap */}

С той же коллекцией выбран импорт `electrolyte-batch-b.ris`. Предварительный просмотр должен идентифицировать существующие записи перед совершением импорта. В этом выпуске он показал **7 Новые ссылки, 1 Существующие, 0 Пропущены**.

![Вторая партия предварительного просмотра идентифицирует общий документ как существующий.](/img/open-science/workflow-extensions/batches-import-b.webp)

Храните **Reuse existing reference**, проверьте общий заголовок, затем импортируйте. Прочтите фактическое резюме завершения: **7 Created, 1 Reused, 0 Skipped, 0 Failed**. Повторное использование сохраняет существующие метаданные и добавляет соответствующую ссылку на пункт назначения; Он не создает вторую копию или не загружает PDF.

![Завершен второй импорт с семью созданными и одним повторно используемым](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. Проверьте полученную коллекцию {/* #5-check-the-resulting-collection */}

Нажмите **Done**. Коллекция содержит **15 ссылки**, согласующийся с союзом DOI. Держите два оригинальных экспорта и происхождение CSV, чтобы коллега мог реконструировать, откуда пришел каждый кандидат.

![Заключительный сборник с пятнадцати ссылками](/img/open-science/workflow-extensions/batches-collection.webp)

Матч по подсчету - это полезная проверка, а не замена для проверки перекрывающихся DOI и репрезентативных названий. Чтобы добавить более позднее окно публикации, сохраняя базовый уровень, продолжайте с [Обновление существующей коллекции литературы](update-literature.md).
