---
title: "Найдите общедоступные данные омики и создайте инвентарь файлов"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Найдите общедоступные данные омики и создайте инвентарь файлов {/* #find-public-omics-data-and-build-a-file-inventory */}

Начните с известного присоединения или темы исследования, проверьте общедоступные метаданные и сохраните инвентарь файлов с местами источника и доступными контрольными суммами. Приведенные ниже примеры содержат кадастры; Загрузка и анализ данных — это отдельные задачи.

Перед запуском следуйте [Научные базы данных](../tools/databases.md#connect-database), чтобы включить необходимые разъемы. Используйте подключенную модель и доступный [Среда выполнения Notebook](../guides/runtimes.md).

## 1. Решите известный запуск и проверьте его файлы {/* #ena-runs */}

1. Включите **факультативный; По умолчанию: 5** под **Settings → Connectors**. Предоставить публичное присоединение ENA/INSDC к `ena_search_runs`, например, исследование PRJ или запуск SRR. Идентификатор GEO `GSE` должен быть сначала связан с исследованием INSDC. Ключевые слова не принимаются.
2. Проверяйте `run_accession`, организм, библиотечную стратегию/раскладку и `truncated`. Максимум — это 1,000. Не существует офсета или продолжения токена; сузить присоединение, если ответ усечен.
3. Пропуск один раз возвращался в `ena_get_run_files`. Проверьте `found`, `fastq_available` и каждую запись в `fastq_files`. инвентарь поставляет URL, размер сжатого файла и выше по потоку MD5; Он не загружает файлы и не проверяет их содержимое.
4. Перед отдельной загрузкой проверьте хранилище и сохраните манифест. Проверьте загруженные байты по указанной контрольной сумме. В парной библиотеке не обязательно должно быть ровно два файла. Не делайте вывод о личности считывающего партнера из `file_index`.

<p className="example-label"><strong>Практический пример</strong> Создайте файл манифеста для SRR037073</p>

В этом примере v0.31.1 используется **Codex subscription** и включенный **факультативный; По умолчанию: 5** Connector. Откройте сессию с доступным временем выполнения Notebook, затем отправьте:

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

Откройте созданные заметки. Фактический поиск возвращал **1 скачать**, **Caenorhabditis elegans**, исследование **PRJA123835**, **РНК-сек**, **петь**, с `truncated: false`. Подтвердите организм и макет перед использованием его файлов.

![ENA запрашивает входы, запускает флаги идентичности и полноты в генерируемых заметках](/img/open-science/v0311/ena-notes.webp)

Откройте CSV и сравните его с `ena-files.json`. В этой версии есть `found: true`, `fastq_available: true` и **Файл 1**, размером с **25,154,397 байты**. Манифест сохраняет свой FTP URL и MD5. Скопируйте полное значение из загружаемого файла, если колонка предварительного просмотра вырезана.

![Фактический однофайловый манифест ENA с URL, размером и контрольной суммой вверх по течению](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Запросить заметки</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ манифест</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">Запуск ответа</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">Файловый ответ</ExampleDownload>

Оба запроса и создание списка файлов завершены. **Файл FASTQ не был загружен или проверен контрольной суммой**. Скачивание выполняется отдельным шагом. [Точные параметры](../reference/connector-operations.md#ena_search_runs)

## 2. Discover работает по теме и проверяет файлы проекта {/* #omics-discovery */}

Используйте `ena_query_runs`, когда у вас есть тема исследования, но нет присоединения. Он сочетает в себе организм, библиотечную стратегию и фильтры ключевых слов с AND. Требуется хотя бы один фильтр. `tax_id` включает в себя таксоны потомков. Предел по умолчанию 100, а максимальный 1,000. Усеченный ответ не имеет продолжения курсора: сузьте запрос вместо того, чтобы рассматривать возвращенное количество как общее количество данных.

<p className="example-label"><strong>Практический пример</strong> Откройте для себя пять человеческих РНК-Seq и проверьте инвентарь файлов ENA и PRIDE.</p>

1. Включите **факультативный; По умолчанию: 5** в **Settings → Connectors**, затем откройте сеанс с подключенной моделью и доступным временем выполнения Notebook. В данном примере используется **Codex subscription**.
2. Используйте подсказку ниже, чтобы запросить только метаданные. Проекты ENA и PRIDE являются отдельными примерами. Они не соответствуют образцам из одного исследования.
3. Откройте `ena-discovery.json` и проверьте запрос, организм, запустите присоединения и `truncated` перед выбором файлов.

```text
Use Omics Archives through Session Notebook. Query ena_query_runs with
tax_id 9606, library_strategy "RNA-Seq", keyword "breast" and limit 5.
For the first returned run, call both ena_get_run_files and
ena_get_submitted_files. Separately call pride_get_project_files for
PXD000001, page 0, page_size 5; fetch its next_page once if present.
Save the exact requests and responses as ena-discovery.json,
ena-file-inventory.json and pride-file-pages.json. Save a combined
omics-file-inventory.csv and omics-discovery-notes.md. Keep generated
FASTQ, original submitted files and PRIDE records distinct. Preserve
every supplied location, size and checksum; do not infer missing values
or checksum algorithms. State query limits and pagination. Do not download
data files. Keep everything in English and report actual empty results.
```

![Условия запроса и наблюдаемые результаты инвентаризации ENA и PRIDE](/img/open-science/v0320/omics-discovery-notes.webp)

4. Сравните оба кадастра для выбранного запуска ENA. В этом примере запрос возвращает **5 работает** с `truncated: true`. Первый запуск, **SRR077868**, имеет **Архив 1 FASTQ**, размер **462,508,712 байты** и выше по течению MD5. Оригинальный инвентарь имеет `found: true`, но `submitted_available: false` и **0 файлы**. Таким образом, существующий цикл не должен содержать оба кадастра.
5. Проверяйте страницы PRIDE. **PXD000001** возвращает **Записи 5 на странице 0** и **4 на странице 1**, с `api_total: 9` и финальным `next_page: null`. Комбинированный CSV имеет **19 строки**, потому что каждый из девяти файлов PRIDE поставляет два местоположения, наряду с одним рядом ENA FASTQ. Подсчитывайте доступ к файлам отдельно от местоположений загрузки.

![Записи ЕНА и ПРИДЕ в сгенерированной таблице запасов](/img/open-science/v0320/omics-file-inventory.webp)

<ExampleDownload path="/examples/v0320/omics-discovery-notes.md">Запросить заметки</ExampleDownload> · <ExampleDownload path="/examples/v0320/omics-file-inventory.csv">Комбинированный инвентарь</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-discovery.json">Открытие NA</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-file-inventory.json">Кадастры файлов ЕНА</ExampleDownload> · <ExampleDownload path="/examples/v0320/pride-file-pages.json">Дорогие страницы</ExampleDownload>

Выходом является инвентаризация файлов, а не загруженные данные секвенирования или протеомики. Архив FASTQ и оригинальные материалы, такие как BAM/CRAM, являются различными продуктами. Сохраняйте оригинальный путь FTP ENA буквально, включая любого персонажа `#`. Для PRIDE используйте `next_page` и возвращенные метаданные. `api_total` может отсутствовать в других проектах, а текст контрольной суммы не всегда идентифицирует его алгоритм. Перед отдельной загрузкой выберите необходимый формат, проверьте хранилище и проверьте байты, когда доступна контрольная сумма вверх по течению. См. [Справочная информация об операции](../reference/connector-operations.md#ena_query_runs) для точных входов.
