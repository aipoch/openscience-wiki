---
title: "Проверить виды, ссылочный геном и хромосомные идентификаторы"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Проверить виды, ссылочный геном и хромосомные идентификаторы {/* #check-species-reference-genome-and-chromosome-identifiers */}

<p className="example-label"><strong>Практический пример</strong> Идентифицировать хромосому человека GRCh38.p14 1</p>

Подтвердить организм, версионные сборочные и хромосомные псевдонимы перед объединением записей из разных баз данных. Вывод представляет собой таблицу идентификации для одной хромосомы с исходными ответами.

Перед запуском следуйте [Научные базы данных](../tools/databases.md#connect-database), чтобы включить необходимые разъемы. Используйте подключенную модель и доступный [Среда выполнения Notebook](../guides/runtimes.md).

## 1. Запросить организм, сборку и хромосому {/* #reference-genome */}

1. Включить **геномы** в **Settings → Connectors**. Откройте сеанс с подключенной моделью и доступным временем выполнения Notebook. В этом примере v0.31.1 используется **Codex subscription**.
2. Запросите организм, сборку и последовательность **переизданный** в этом порядке. Отправить:

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

## 2. Сравнение возвращенных идентификаторов {/* #compare-identifiers */}

Откройте заметки и сравните возвращенные идентификаторы в трех файлах JSON. Все три вызова увенчались успехом в этом примере.

![Три реальных звонка NCBI и возвращенный таксон и идентификатор сборки](/img/open-science/v0311/ncbi-notes.webp)

| Проверить | Результат этого примера |
| --- | --- |
| Организм | Homo sapiens, TaxID **9606**; один матч, `ambiguous: false` |
| Запрашиваемая/текущая сборка | **GCF_000001405.40**, **GRCh38.p14**Название UCSC **hg38** |
| Парное собрание GenBank | **GCA_000001405.29**; Возвращенные записи сообщают об отличиях от RefSeq |
| Хромосома 1 псевдонимы | **1**, **хр1**Рефсек **NC_000001.11**GenBank **CM000663.2** |
| Выбранная последовательность | **248956422 bp**первичной ассамблеи; один матч, `matches_truncated: false` |

![Оригинальный ответ хромосомы-1 с версионными псевдонимами и количеством совпадений](/img/open-science/v0311/ncbi-aliases.webp)

## 3. Сохранить таблицу идентификационных данных и исходные записи {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Запросить заметки</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Таблица идентификационных данных</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Ответ таксона</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Ответ Ассамблеи</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Последовательность ответов</ExampleDownload>

Завершён поиск для **выбранная хромосома**, а не экспорт всех последовательностей сборки. При изменении запроса сохраняйте неоднозначные совпадения и признаки усечения. Название сборки не заменяет идентификатор с номером версии. Возвращённый актуальный идентификатор не даёт оснований незаметно заменять запрошенную историческую версию. Псевдонимы описывают названия внутри сборки; они не преобразуют координаты между сборками. [Точные входные данные](../reference/connector-operations.md#ncbi_get_assembly_info)
