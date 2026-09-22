---
title: "Функциональное обогащение для набора генов-кандидатов"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Функциональное обогащение для набора генов-кандидатов {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>Практический пример</strong> Преднамеренно выбранный список генов повреждения ДНК человека</p>

Превратите определенный список генов в таблицу обогащенных биологических процессов и путей, сохраняя отображения идентификаторов, статистические данные и исходные версии.

Перед запуском следуйте [Научные базы данных](../tools/databases.md#connect-database), чтобы включить необходимые разъемы. Используйте подключенную модель и доступный [Среда выполнения Notebook](../guides/runtimes.md).

В этом примере v0.31.1 используются публичные символы гена 11 для демонстрации g:Profiler. Они были выбраны для своих известных биологических ролей, поэтому ожидается обогащение. Они не являются результатом дифференциального выражения проекта GSE60450 или свидетельством беспристрастного открытия.

## 1. Определите список генов и параметры анализа {/* #gene-set-enrichment */}

1. В **Settings → Connectors**, сделать **Гены и онтологии** доступным для агента. Откройте сеанс с подключенной моделью и доступным временем выполнения Notebook.
2. Укажите организм, генные идентификаторы, источники данных и статистический фон. Для реальных экспериментальных данных обосновывайте фон с помощью генов, которые могли быть отобраны экспериментом. В этом учебнике явно используются все аннотированные гены, а не обычная измеренная вселенная генов.
3. Отправьте следующее сообщение. Сохраняйте запрос в исходной версии и вызов на обогащение в течение одного сеанса и сохраняйте их фактические результаты.

```text
Use Genes & Ontologies through Session Notebook for an English g:Profiler
tutorial. The deliberately selected gene list is TP53, ATM, ATR, CHEK1,
CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
First call list_enrichment_sources with organism hsapiens.
Then call enrich_gene_set with these genes, organism hsapiens,
sources GO:BP and REAC, domain_scope annotated,
correction_method fdr, and user_threshold 0.05.
Save the full response as dna-damage-enrichment.json, all returned terms
as dna-damage-enrichment.csv, and query, source versions, mappings,
background and limitations as dna-damage-enrichment-notes.md.
Retain unmapped, ambiguous and duplicate identifiers. Treat mapped_genes
as the returned mapping object. Report errors instead of inventing results.
This is not differential-expression evidence or evidence of regulation direction.
```

## 2. Проверьте идентификаторы и исходные версии {/* #identifier-check */}

Откройте сгенерированные заметки и проверьте количество запросов и карт. Этот запуск отображал идентификаторы **11/11**, с **0** некартированными, двусмысленными или дублирующими идентификаторами. Он записывал **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO классы **2026-01-23** и Reactome классы **2026-03-20**. Более поздняя версия сервиса может возвращать разные условия.

![Сохранение английского запроса, фона, исходных версий и проверки идентификатора](/img/open-science/v0311/enrichment-notes.webp)

## 3. Проверить таблицу обогащения {/* #enrichment-results */}

Откройте CSV и сравните его с полным JSON. Этот забег вернул **891 термины** в FDR 0.05. В предварительном просмотре показаны только первые строки 100; Этот предел отображения не является общим количеством результатов. Сохраните `source`, `native`, исправленные `p_value`, `intersection_size`, `query_size` и `effective_domain_size` при интерпретации термина.

![Таблица фактического обогащения с исправленными вероятностями и размерами доменов](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">Аналитические заметки</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">Все строки результатов 891</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">Полный ответ</ExampleDownload>

`background_size: null` означает, что не было представлено ни одного пользовательского справочного списка; Это не означает статистическую вселенную нулевых генов. Используйте временный эффективный размер домена. Обогащение не устанавливает причинно-следственную связь, дифференциальное выражение или регулирование вверх/вниз. Смотрите [Параметры работы](../reference/connector-operations.md#enrich_gene_set).
