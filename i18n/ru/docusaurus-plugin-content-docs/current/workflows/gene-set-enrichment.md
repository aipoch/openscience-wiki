---
title: "Функциональное обогащение для набора генов-кандидатов"
toc_max_heading_level: 2
last_update:
  date: '2026-09-28'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Функциональное обогащение для набора генов-кандидатов {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>Практический пример</strong> Преднамеренно выбранный список генов повреждения ДНК человека</p>

Превратите определенный список генов в таблицу обогащенных биологических процессов и путей, сохраняя отображения идентификаторов, статистические данные и исходные версии.

Перед запуском следуйте [Научные базы данных](../tools/databases.md#connect-database), чтобы включить необходимые разъемы. Используйте подключенную модель и доступный [Среда выполнения Notebook](../guides/runtimes.md).

В первом примере используется g:Profiler; [Enrichr и STRING сравнение](#enrichr-string) использует те же символы общедоступного гена 11 в v0.33.3. Они были выбраны для своих известных биологических ролей, поэтому ожидается обогащение. Они не являются результатом дифференциального выражения проекта GSE60450 или свидетельством беспристрастного открытия.

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

## 4. Сравните Enrichr с обогащением сети STRING {/* #enrichr-string */}

Enrichr спрашивает, какие наборы аннотаций преувеличены в представленных генах. Обогащение PPI STRING спрашивает, имеют ли белки больше сетевых взаимодействий, чем ожидалось. Это различные тесты; Это не независимая репликация биологического результата.

1. В **Settings → Connectors** включите **Гены и онтологии** и **факультативный; По умолчанию: "gtex_v8"** для агента.
2. Создайте проект **Генный набор повреждений ДНК** и откройте новую сессию. В данном примере используются Codex и Session Notebook.
3. Перечислите доступные библиотеки Enrichr, прежде чем выбрать одну. Для этого сравнения используйте фиксированную библиотеку **GO_Biological_Process_2025**, чтобы сохраненные результаты имели идентифицируемую версию аннотации. Новая библиотека может давать разные результаты.
4. Отправьте эту подсказку и откройте сгенерированные заметки после завершения прогона:

```text
Compare Enrichr functional enrichment with STRING PPI enrichment for
TP53, ATM, ATR, CHEK1, CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
Use the built-in Genes & Ontologies and Protein Annotation connectors
through Session Notebook. List the current human Enrichr libraries;
use GO_Biological_Process_2025 with max_results 500 if available.
Run STRING PPI enrichment with species 9606 and required_score 700.
Save raw_connector_responses.json, enrichment_comparison_results.csv
and analysis_notes.md in English. Retain the query, source versions,
identifier mappings, reported background, n_total_results, n_results
and truncated flag, plus raw and adjusted P values where provided.
These genes were deliberately selected for known DNA-damage roles.
Do not infer unbiased discovery, causal regulation or expression direction.
Distinguish annotation enrichment from excess network interactions.
If STRING returns a P value of 0, preserve it as returned without claiming
an exact zero probability or inventing a numerical precision threshold.
```

### Проверьте входы и полный ответ {/* #enrichr-inputs */}

Откройте **analysis_notes.md** и сравните его с **raw_connector_responses.json**. В сентябрьском выпуске 28 были перечислены библиотеки **228** и возвращены условия **305/305** для выбранной библиотеки с `truncated: false`. `max_results` по умолчанию 100; Реакция 100 может быть неполной. Проверяйте флаги ответов и запрашивайте больший лимит, вплоть до 500, когда это необходимо.

STRING отображал все гены **11** без неотснятых идентификаторов и записывал версию **12.0**, организм **9606** и порог оценки **700**. Enrichr сообщает о `mapping_status: not_reported_by_enrichr`; Не копируйте результат отображения STRING в запись Enrichr. Не было предоставлено никакого специального фона. Покрытие Enrichr библиотечным геном 14,674 является метаданными, а не точным статистическим фоновым размером.

![Фактические входные данные, версия библиотеки, полный подсчет результатов и проверка идентификатора](/img/open-science/v0333/enrichment-inputs.webp)

### Прочитайте два результата отдельно {/* #enrichr-comparison */}

Откройте раздел результатов заметок и используйте CSV или сырой JSON для полного списка. Первым термином Enrichr был **Клеточный ответ на ионизирующее излучение (GO: 0071479)**, с скорректированным P приблизительно **3.60 × 10⁻¹¹**. STRING вернул **44 Наблюдаемые края** среди **Узлы 11**, против **6 ожидаемые края**. Его зарегистрированное значение P было `0`; Это числовой выход службы, а не доказательство нулевой вероятности.

![Термины Enrichr и отдельный результат сетевого обогащения STRING](/img/open-science/v0333/enrichment-results.webp)

CSV имеет **305 Enrichr строки плюс 6 STRING сводные строки**. Последние представляют собой сетевую статистику, а не дополнительные обогащенные термины. Термины Enrichr GO пересекаются, а STRING объединяет несколько каналов доказательств; a Край STRING не обязательно означает прямое физическое связывание. Преднамеренно выбранный ввод в основном демонстрирует инструменты и их записи.

<ExampleDownload path="/examples/v0333/analysis_notes.md">Примечания к сопоставлению</ExampleDownload> · <ExampleDownload path="/examples/v0333/enrichment_comparison_results.csv">Полная таблица сравнения</ExampleDownload> · <ExampleDownload path="/examples/v0333/raw_connector_responses.json">Оригинальные отклики разъема</ExampleDownload>

Параметры: [Enrichr библиотеки](../reference/connector-operations.md#list_enrichr_libraries), [Обогащение Enrichr](../reference/connector-operations.md#enrich_gene_set_enrichr), [STRING PPI обогащение](../reference/connector-operations.md#get_string_ppi_enrichment). Чтобы сохранить сеанс и доказательства вместе, [Экспорт пакета .science](../guides/research-packages.md#export-the-session).
