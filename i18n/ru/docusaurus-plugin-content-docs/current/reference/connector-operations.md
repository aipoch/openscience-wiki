---
title: "Операционный справочник Connector"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Операционный справочник Connector {/* #connector-operation-reference */}

Посмотрите точные названия операций, требуемые поля, по умолчанию и вызовы примеров. Чтобы выбрать источник данных, начните с [каталог баз данных](../tools/databases.md). Расширьте семейство Connector, которое вы собираетесь вызвать. Доступность и учетные данные должны быть настроены отдельно.

## Где выполняется вызов примера {/* #where-the-example-calls-run */}

Объект `host` поставляется в среде выполнения агентов Open-Science. JavaScript ниже - это **Фрагмент вызова на стороне агента**, а не отдельная программа Node.js и не метод на общедоступном клиенте Task SDK. Попросите агента загрузить соответствующие инструкции Connector и использовать операцию сопоставления. Фреймворк может отображать мост Python вместо этой формы JavaScript.

Сначала включите Connector в [Настройки → Коннекторы](../guides/connectors.md), настройте любой [требуемые полномочия](../tools/credentials.md) и предоставьте доступ к выбранному Specialist, если применимо. Звонок по-прежнему следует политике разрешения разговора. Интеграция с публичным Node.js может управлять настройками Connector с помощью [Задание SDK](api.md), но не может получить этот `host`, импортируя этот клиент.

### Прочитайте результат перед цепочкой вызовов {/* #read-a-result-before-chaining-calls */}

<p className="example-label"><strong>Пример</strong> Pass вернул PubMed ID в поиск метаданных</p>

Например, задайте вопрос: **Используйте PubMed для поиска руководства по отчетности PRISMA; Верните общий счет матча и пять PMIDs.** Операция `search_articles` возвращает общее количество и страницу идентификаторов. Кормите тех, кто вернул PMIDs в `get_article_metadata`, чтобы получить заголовки, авторов и ссылки DOI. Пустая страница, усеченный результат и ошибка аутентификации требуют различной обработки.

| Вернутая информация | Используйте его для |
| --- | --- |
| Общее количество матчей и возвращенные ряды | Отличить небольшую страницу от полного набора результатов |
| `truncated`, `records_truncated` Флаги полноты для конкретной семьи | Решите, нужно ли перелистывать страницу, сузить запрос или восстановить остальные. |
| `not_found`, `missing`, `not_processed` | Определить неразрешенные входные данные и повторно использовать только соответствующие элементы |
| DOI, присоединение, URL-адрес источника и выпуск / сборка | Сохранить личность и источник, необходимые для последующих запросов. |
| Полнотекстовый статус или лицензионная записка | Решите, был ли текст извлечен и может ли быть использован повторно. |

Названия поля возврата различаются по операциям. Описание и загружаемые схемы ниже указывают каждый контракт; Таблица не является универсальным ответом JSON. Используйте правый список семьи, чтобы прыгать, а затем расширить параметры этой семьи. Поиск названия операции также открывает ее содержащую группу.

**Прочтите неудачи отдельно от пустых результатов.** В v0.30.2 маркер/источник/тканевой запрос CellGuide запрашивает поверхностные сбои вместо того, чтобы рассматривать их как пустые доказательства; Отсутствующий дополнительный файл данных может быть пустым. Запросы OLS отклоняют неполную пагинацию и недействительные ответы. Ошибка в обслуживании не является доказательством того, что тип клетки не имеет маркеров или термин онтологии не имеет связанных терминов.

## Эксплуатационные материалы {/* #operation-inputs */}

Расширяйте один Connector за раз. Требуемые поля помечены **обязательно**; Эта ссылка и загрузка используют схему Open-Science **v0.31.1**. Вложенный список `input.required` является авторитетным; Унаследованный список `required` может отсутствовать. Проконсультируйтесь с <ExampleDownload path="/examples/capabilities/connector-catalog-v0.31.1.json">Полный загружаемый реестр</ExampleDownload> для вложенных схем JSON, полных описаний возврата и примеров вызова на стороне агента. Не пропустите общий `id`, когда инструмент ожидает `accessions`, `cids`, `rs_id` или другое поле пространства имен.


## химия {/* #family-1 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `pubchem_search_compounds` {/* #pubchem_search_compounds */}

Решите химический идентификатор (название, SMILES, InChIKey или CID) в PubChem CID, необязательно с основными вычислительными свойствами для верхних попаданий.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `namespace` | строка | факультативный; по умолчанию: "name"; enum: &#91;"name", "smiles", "inchikey", "cid"&#93; |
| `max_cids` | целое число | факультативный; по умолчанию: 25; Минимум: 1; Максимум: 100 |
| `with_properties` | логическое значение | факультативный; Дефолт: правда |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds` {/* #pubchem_get_compounds */}

Полные записи компьютерной собственности для партии PubChem CIDs с дополнительными списками синонимов с каплями.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `cids` | массив целых чисел | **обязательно**; Мини-элементы: 1; maxItems: 50 |
| `include_synonyms` | логическое значение | факультативный; Дефолт: ложный |
| `max_synonyms` | целое число | факультативный; По умолчанию: 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search` {/* #pubchem_similarity_search */}

2D Tanimoto поиск сходства по всему PubChem для запроса SMILES (синхронный маршрут fastsimilarity_2d, без опроса о работе).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `smiles` | строка | **обязательно** |
| `threshold` | целое число | факультативный; по умолчанию: 90; Минимум: 1; Максимум: 100 |
| `max_records` | целое число | факультативный; по умолчанию: 50; Минимум: 1; Максимум: 200 |
| `with_properties` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary` {/* #pubchem_get_bioassay_summary */}

Резюме активности биоанализа для одного соединения PubChem - какие анализы проверили его, против каких целей, с каким результатом и потенцией.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `cid` | целое число | **обязательно** |
| `active_only` | логическое значение | факультативный; Дефолт: ложный |
| `max_rows` | целое число | факультативный; по умолчанию: 100; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety` {/* #pubchem_get_safety */}

Классификация безопасности GHS для одного соединения PubChem (PUG-View 'GHS Classification') заголовки), агрегированные по источникам отчетности.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `cid` | целое число | **обязательно** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search` {/* #chebi_search */}

Полнотекстовый поиск по объектам ChEBI (имена, синонимы, формулы, InChIKeys).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `term` | строка | **обязательно** |
| `max_results` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 100 |
| `page` | целое число | факультативный; по умолчанию: 1; Минимум: 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity` {/* #chebi_get_entity */}

Полная запись сущности ChEBI: имена, структура, химические данные, роли и перекрестные ссылки.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `chebi_id` | строка | **обязательно** |
| `max_synonyms` | целое число | факультативный; По умолчанию: 30 |
| `max_xrefs` | целое число | факультативный; По умолчанию: 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology` {/* #chebi_get_ontology */}

Онтологические отношения субъекта ЧЕБИ — что это такое (внешний: есть / имеет роль / сопряженная кислота ...) и какие моменты в нем (входящий: дети / производные).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `chebi_id` | строка | **обязательно** |
| `relation_type` | строка | необязательный |
| `max_relations` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions` {/* #rhea_search_reactions */}

Поиск реакции мастера Реи по тексту уравнения, участнику ChEBI id или номеру EC (автообнаруженный тип запроса).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `limit` | целое число | факультативный; по умолчанию: 50; Минимум: 1; Максимум: 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction` {/* #rhea_get_reaction */}

Полная запись для одной Реи реакции: уравнение, участники с ids ChEBI и стехиометрия, EC ссылки, направление семьи и литературы.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `rhea_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target` {/* #bindingdb_ligands_by_target */}

Измеренное сродство связывания (Ki/Kd/IC50/EC50) всех лигандов BindingDB против одной белковой мишени, путем присоединения UniProt.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `uniprot` | строка | **обязательно** |
| `affinity_cutoff_nm` | число | факультативный; По умолчанию: 10000 |
| `max_rows` | целое число | факультативный; по умолчанию: 100; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound` {/* #bindingdb_targets_by_compound */}

Белковые мишени с измеренным сродством к соединениям 2D-подобны запросу SMILES — " Что связывает эта молекула (или ее близкие аналоги)?".

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `smiles` | строка | **обязательно** |
| `similarity` | число | факультативный; по умолчанию: 0.85; Минимум: 0.5; Максимум: 1 |
| `max_rows` | целое число | факультативный; по умолчанию: 100; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## График литературы {/* #family-2 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `openalex_search_works` {/* #openalex_search_works */}

Поиск научных работ OpenAlex (все дисциплины, ~250M записей) с год/тип/ОА/проспект фильтров. Args: запрос (бесплатный текст по title+abstract+fulltext); необязательно, если установлен фильтр, year_from, year_to (включительные годы), work_type (статья / обзор / препринт / глава книги / набор данных / диссертация), open_access_only, место проведения (S-id, URL openalex.org, ISSN или простое имя, разрешенное для попадания в верхние источники - всплыло в venue_resolved; сдать точный ID для пропуска разрешения), сортировать (релевантность по умолчанию / cited_by_count / publication_date), max_records (по умолчанию 50, жесткий потолок 500); страницы 200), include_abstracts (реконструированы из перевернутого индекса, но ТОЛЬКО для верифицированных открытых лицензий — cc-by/cc-by-sa/cc0/public-domain; другие получают абстрактное = нуль + примечание abstract_policy + abstract_license; Добавляет объем. Возвращает &#123;-запрос, фильтры, сортировку, api_total, n_records_returned, records_truncated, records&#125;; Каждая запись представляет собой форму бережливой работы (openalex_id, doi, pmid, title, publication_year/date, type, language, is_retracted, authors&#91;...&#93;, source&#123;...&#125;, biblio, cited_by_count, fwci, referenced_works_count, open_access&#123;...&#125;, best_oa_pdf_url, primary_topic, ключевые слова).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | необязательный |
| `year_from` | целое число | необязательный |
| `year_to` | целое число | необязательный |
| `work_type` | строка | необязательный |
| `open_access_only` | логическое значение | необязательный |
| `venue` | строка | необязательный |
| `sort` | строка | факультативный; по умолчанию: "relevance"; enum: &#91;"relevance", "cited_by_count", "publication_date"&#93; |
| `max_records` | целое число | факультативный; По умолчанию: 50 |
| `include_abstracts` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work` {/* #openalex_get_work */}

Принесите один OpenAlex работает в полном объеме — метаданные, абстрактные (реконструированные из перевернутого индекса, лицензионные, как в openalex_search_works), местоположения OA, referenced_works (выход W-ids — гидрат с openalex_references) и counts_by_year. Args: work_id (W-id, openalex.org URL, голый DOI или doi.org URL). Поиски DOI разрешаются через фильтр истца; Когда несколько работ разделяют один DOI, выбирают наиболее цитируемый и включают doi_claimants + doi_resolution_note. Не найдено для неизвестных идентификаторов/DOI.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `work_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations` {/* #openalex_citations */}

Список работ, которые CITE заданной работы (входящие цитаты) через OpenAlex's график цитирования. Арги: work_id (W-id/URL/DOI — DOI стоит один дополнительный запрос разрешения), сорт (cited_by_count по умолчанию / publication_date / релевантность), max_records (по умолчанию 50, потолок 500), include_abstracts. Возвращает &#123;work_id, api_total (настоящее количество ссылок), n_records_returned, records_truncated, records&#125; (Бережливая трудовая книжка).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `work_id` | строка | **обязательно** |
| `sort` | строка | факультативный; по умолчанию: "cited_by_count"; enum: &#91;"cited_by_count", "publication_date", "relevance"&#93; |
| `max_records` | целое число | факультативный; По умолчанию: 50 |
| `include_abstracts` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references` {/* #openalex_references */}

Перечислить работы заданной работы СИТЕС (уходящие ссылки), гидратированные на полные метаданные в порядке справки-списка. Args: work_id (W-id/URL/DOI), max_records (по умолчанию 100, потолок 500); гидратация 50/request. Возвращает &#123;work_id, n_references, n_records_returned, records_truncated, references_not_hydrated (IDs OpenAlex не имеет рекорда — никогда молча не падал), reference_ids (ALL outgoing W-ids), records&#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `work_id` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors` {/* #openalex_search_authors */}

Найдите профили авторов OpenAlex по имени. Args: запрос (соответствует отображаемому имени + альтернативам); ждите омонимов — check affiliations/topics/ORCID), max_records (по умолчанию 25, потолок 500). Возвращает &#123;query, api_total, n_records_returned, records_truncated, records&#125;; Каждый из них записывает &#123;author_id, имя, orcid, works_count, cited_by_count, h_index, i10_index, аффилиации &#91;&#123;institution, years&#125;&#93;, last_known_institutions, top_topics&#125;. Используйте author_id с openalex_get_author.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author` {/* #openalex_get_author */}

Возьмите один профиль автора OpenAlex плюс их цитируемые работы. Args: author_id (A-id, openalex.org URL или ORCID); CAVEAT: ORCID-указатель OpenAlex's может разрешаться на разреженный дубликат — предпочтительнее A-id от openalex_search_authors, works_sample (по умолчанию 10, max 200); 0 пропускает дополнительный запрос. Возвращает авторскую запись плюс counts_by_year, top_works_total (истинное общее количество работ) и top_works (записи бережливой работы по цитируемости).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `author_id` | строка | **обязательно** |
| `works_sample` | целое число | факультативный; По умолчанию: 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info` {/* #openalex_venue_info */}

Ищите журналы / репозитории ('sources') в OpenAlex — статус OA, листинг DOAJ, APC, показатели цитирования. Args: Место проведения (точный S-id, URL openalex.org или ISSN для одной записи); все остальное - поиск по имени), max_records (по умолчанию 10, потолок 500; Только поиск по именам. Возврат: точно -> один источник записи + counts_by_year; Поиск по имени - > &#123;query, api_total, n_records_returned, records_truncated, records&#125;. Источник записи: &#123;source_id, display_name, тип, issn_l, issn, host_organization, country_code, homepage_url, is_oa, is_in_doaj, is_core, apc_usd, works_count, cited_by_count, h_index, two_year_mean_citedness, first/last_publication_year, top_topics&#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `venue` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search` {/* #arxiv_search */}

Поиск препринтов arXiv (физика, математика, CS, статистика, q-bio, ...) через официальный Atom API. Args: query (arXiv query string); простые термины для поиска по всем полям, приставки поля ti:/au:/abs: и booleans AND/OR/ANDNOT работают; необязательно, если установлена категория или диапазон дат), категория (arXiv код AND-ed in, например. q-bio.GN, cs.LG, stat.ML), date_from/date_to (дата подачи YYYY-MM-DD, включительно), старт (смещение подкачки на основе 0; API шагает ~3s между запросами — страница вежливо, max_results (по умолчанию 25, максимум 100 за вызов), sort_by (релевантность по умолчанию / поданная дата / последняя обновленная дата), sort_order (спускающийся по умолчанию / восходящий). Возвращает &#123;search_query (точный отправленный запрос), api_total (общее количество совпадений вarXiv'), start_index, n_records_returned, records_truncated, sort_by, sort_order, records&#125;; каждая запись &#123;arxiv_id, версия, id_versioned, заголовок, реферат, авторы, опубликованные, обновленные, primary_category, категории, doi, journal_ref, комментарий, abs_url, pdf_url&#125;. doi/journal_ref появляется только после публикации в журнале. Неправильные запросы вызывают ошибку (подача ошибок arXiv's HTTP-200 обнаруживается, никогда не возвращается в качестве данных).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | необязательный |
| `category` | строка | необязательный |
| `date_from` | строка | необязательный |
| `date_to` | строка | необязательный |
| `start` | целое число | факультативный; По умолчанию: 0 |
| `max_results` | целое число | факультативный; По умолчанию: 25 |
| `sort_by` | строка | факультативный; по умолчанию: "relevance"; &#91;"relevance", "submittedDate", "lastUpdatedDate"&#93; |
| `sort_order` | строка | факультативный; по умолчанию: "descending"; enum: &#91;"descending", "ascending"&#93; |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers` {/* #arxiv_get_papers */}

Бумажные метаданные arXiv (в т.ч. Абстракции) по ID — один шаг запроса до документов 100. Args: arxiv_ids (до идентификаторов 100 в любой общей форме — 2103.14030, версия 2103.14030v2, старомодный q-bio/0601001, arXiv:-prefixed, или URL-адреса abs/pdf); Неверсированные идентификаторы разрешаются в последней версии. Возвращает &#123;n_requested, n_found, дубликаты (вводы, которые разрешаются на уже возвращенную бумагу), not_found (неизвестные и искаженные идентификаторы — arXiv молча пропускает неизвестные и отклоняет целые партии по несоответствующим); Этот инструмент не имеет ни того, ни другого, — записывает &#125;. — записи в запрашиваемом порядке, такой же формы, как и записи arxiv_search. Отозванные документы по-прежнему возвращают метаданные (проверьте комментарий для заметок об отзыве).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `arxiv_ids` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work` {/* #crossref_get_work */}

Получите метаданные, депонированные издателем, для Crossref DOI. Принимается голый DOI, doi: префикс или URL doi.org. Ключ API не требуется. Если DOI принадлежит другому регистрационному агентству, воспользуйтесь услугой сопоставления. a Crossref 404 не доказывает, что DOI является недействительным. Проверить возврат DOI, title и source_url.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `doi` | строка | **обязательно**; Длина: 1; Длина: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates` {/* #crossref_get_updates */}

Прочитайте внесенные исправления, опровержение и другие отношения обновления. updated_by указывает на уведомления, обновляющие эту работу; update_to указывает на работы, обновленные этим DOI. Сохраняйте направление отношений и ярлыки источников. Пустые массивы не устанавливают надежность или не доказывают, что опровержения не существует.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `doi` | строка | **обязательно**; Длина: 1; Длина: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records` {/* #datacite_search_records */}

Поиск общедоступных метаданных DataCite/software DOI. Запрос на поставку, related_doi или и то, и другое; В запросе используется синтаксис запроса DataCite. Сохраняйте те же фильтры и page_size при следовании за next_page. Поиск по номеру страницы ограничен первыми записями 10,000: при необходимости сузьте запрос. Проверьте related_identifiers, права и URL-адреса посадки; Метаданные не гарантируют загружаемые данные или разрешение на повторное использование.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | факультативный; Длина: 1; Длина: 2000 |
| `related_doi` | строка | факультативный; Длина: 1; Длина: 2048 |
| `resource_type` | строка | факультативный; по умолчанию: "dataset"; enum: &#91;"dataset", "software"&#93; |
| `page_size` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 100 |
| `page` | целое число | факультативный; по умолчанию: 1; Минимум: 1; Максимум: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record` {/* #datacite_get_record */}

Восстановите одну общедоступную запись DataCite DOI, включая заголовки, создателей, тип ресурса, права, связанные идентификаторы и доступную версию. Принимает голый DOI, doi: префикс или doi.org URL. Проверьте идентификатор и направление связи перед использованием связанного набора данных или программного пакета.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `doi` | строка | **обязательно**; Длина: 1; Длина: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## PubMed {/* #family-3 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `search_articles` {/* #search_articles */}

Search PubMed (биомедийный &) Life-sciences literature via NCBI esearch) для статей, соответствующих запросу. Возвращает общее количество матчей плюс страницу PMIDs. Поддерживает полевые теги PubMed (&#91;Title&#93;, &#91;Author&#93;, &#91;Journal&#93;, &#91;MeSH Terms&#93;, ...), булевы операторы, фильтрацию даты и сортировку. PubMed не индексирует статьи по физике / CS / математике / чистой химии.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `max_results` | целое число | факультативный; По умолчанию: 20 |
| `retstart` | целое число | факультативный; По умолчанию: 0 |
| `sort` | строка | факультативный; enum: &#91;"relevance", "pub_date", "author", "journal_name", "title"&#93; |
| `date_from` | строка | необязательный |
| `date_to` | строка | необязательный |
| `datetype` | строка | факультативный; по умолчанию: "pdat"; enum: &#91;"pdat", "edat", "mdat"&#93; |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata` {/* #get_article_metadata */}

Получите подробные метаданные статьи из PubMed by PMID (насыпь, через efetch): идентификаторы (pmid/pmc/doi), заголовок, реферат, журнал, авторы с принадлежностью, дата публикации, термины MeSH, типы статей, язык и цитирование. При каждом использовании цитируйте PubMed и включите в качестве ссылок возвращенную статью DOIs (identifiers.doi).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **обязательно** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles` {/* #find_related_articles */}

Найдите соответствующий контент PubMed для одного или нескольких источников PMIDs через NCBI elink. `pubmed_pubmed` (по умолчанию) возвращает похожие статьи, ранжированные по взвешенному в словах подобию заголовков / абстракций / MeSH (не цитаты); `pubmed_pmc` возвращает полнотекстовые PMC-ссылки `pubmed_gene`/`pubmed_protein`/`pubmed_nucleotide` возвращают связанные записи последовательности/гена.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **обязательно** |
| `link_type` | строка | факультативный; по умолчанию: "pubmed_pubmed"; enum: &#91;"pubmed_pubmed", "pubmed_pmc", "pubmed_nucleotide", "pubmed_protein", "pubmed_gene"&#93; |
| `max_results` | целое число | необязательный |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation` {/* #lookup_article_by_citation */}

Разрешите библиографические ссылки на PMIDs через NCBI ecitmatch. Каждое цитирование содержит некоторые из &#123;journal, год, объем, first_page, автор, key&#125;; Обеспечить поля 2-3+ для надежного сопоставления. Используйте, когда у вас есть список ссылок и вам нужен PMIDs.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `citations` | массив объектов | **обязательно** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids` {/* #convert_article_ids */}

Преобразование между PMID, PMCID и DOI через преобразователь NCBI/PMC ID. Однородные идентификаторы ввода для вызова (набор `id_type` для соответствия). Обычно используется для проверки того, имеет ли PMID PMCID (т.е. Полный текст в PMC) перед вызовом get_full_text_article.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `ids` | ['string', 'array'] | **обязательно** |
| `id_type` | строка | факультативный; по умолчанию: "pmid"; enum: &#91;"pmid", "pmcid", "doi"&#93; |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article` {/* #get_full_text_article */}

Полный текст с открытым доступом от PubMed Central через Europe PMC by PMC id ("PMC12345") " 12345". возвращает структурированный текст раздела плюс лицензию; Когда полный текст недоступен, причина сообщается явно (fulltext_status). Полный текст доступен только в статьях OA-подмножества. При каждом использовании цитируйте PubMed и включите в качестве ссылок возвращенные статьи DOI.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pmc_ids` | ['string', 'array'] | **обязательно** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status` {/* #get_copyright_status */}

Отчет об авторском праве и статусе лицензии на PMID путем объединения PubMed CopyrightInformation, PMC ID Converter (PMID ->) PMCID/DOI и PMC &lt;permissions> блок (тип лицензии, URL-адрес лицензии ALI, заявление об авторских правах / год). Проверяйте права повторного использования открытого доступа перед воспроизведением контента.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **обязательно** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## Гены & онтологии {/* #family-4 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `query_genes` {/* #query_genes */}

Решите идентификаторы/символы генов через mygene.info (с пакетом, вплоть до терминов/запросов 1000). Используйте это для отображения символов генов в идентификаторах генов Ensembl, идентификаторах Entrez, именах и любом другом поле mygene.info - или наоборот (настройте `scopes` на пространство имен ваших вводимых терминов, например). "entrezgene", "ensembl.gene", "symbol,alias". Args: terms (условия запросов, например). &#91;"TP53","BRCA1"&#93;; термины, содержащие запятые, не поддерживаются; области (разделенные по запятой пространства имен идентификаторов для сопоставления терминов с); поля (отдельные поля мигена для возврата, или "all"); вид (общее название "human"/"mouse") или NCBI такси. Возвращает &#123;n_input, n_records, not_found, records&#125;. Термин, совпадающий с несколькими генами, дает несколько записей (каждый несет свой `query`). Записи детерминировано упорядочены (входной порядок, затем _id).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `terms` | массив строк | **обязательно** |
| `scopes` | строка | необязательный |
| `fields` | строка | факультативный; по умолчанию: "symbol,name,taxid,entrezgene,ensembl.gene" |
| `species` | строка | необязательный |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies` {/* #list_ontologies */}

Список онтологий в EBI Ontology Lookup Service (OLS4) С `ontology_ids` (например). &#91;"efo","cl","chebi","go","mondo"&#93;): получить структурированные записи метаданных только для этих онтологий; В `not_found` указаны неизвестные идентификаторы. Без: полный каталог OLS4 (онтологии ~250, с полным и подсчитанным началом). Возврат: &#123;records: &#91;&#123;ontology_id, название, версия, статус, num_terms, ...&#125;&#93;, not_found: &#91;...&#93;&#125; для списка ID или записей &#123;: &#91;...&#93;, total_elements, complete&#125; Для полного каталога.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `ontology_ids` | массив строк | необязательный |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms` {/* #search_ontology_terms */}

Поиск терминов онтологии по ярлыку / синониму в одной или нескольких онтологиях OLS4. Типичные применения: найти идентификатор EFO для названия болезни (онтологии = &#91;"efo"&#93;), термины онтологии клеток для типа клеток (&#91;"cl"&#93;), термины ChEBI для химического вещества (&#91;"chebi"&#93;), термины GO по имени (&#91;"go"&#93;) — или искать все онтологии сразу. Args: запрос (термин-лейбл, синоним или идентификатор); онтологии (нижние идентификаторы для ограничения); Не нужно искать каждую онтологию. точный (полный матч); include_obsolete (ложный по умолчанию); max_results (рейтинг по релевантности OLS). Возвращает &#123;query, total_found, n_returned, truncated, terms:&#91;&#123;curie, iri, label, short_form, онтология, описание, тип, is_defining_ontology&#125;&#93;&#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `ontologies` | массив строк | необязательный |
| `exact` | логическое значение | факультативный; Дефолт: ложный |
| `include_obsolete` | логическое значение | факультативный; Дефолт: ложный |
| `max_results` | целое число | факультативный; По умолчанию: 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term` {/* #get_ontology_term */}

Возьмите одну онтологическую деталь 's или ее полный набор связанных терминов. С `relation=None`: полная запись термина (маркировка, синонимы, описание, устаревший флаг, прямые родители). С отношением: полный набор связанных терминов, например. Отношение = "hierarchicalChildren" Для прямых детей в т.ч. part_of и т.д., "descendants"/"hierarchicalDescendants" для всего поддеревья, "ancestors"/"hierarchicalAncestors", "parents", "children". Retrieval подсчитывается по отношению к собственному общему количеству API'. Args: онтология (нижняя часть, например). "efo", "go", "cl", "chebi"; term_id (CURIE "EFO: 0000305"/"GO: 0006281") Полный IRI; (ни одного из перечисленных); include_parents (включает прямые родительские права, когда отношения отсутствуют). Возврат: отношение=None &#123;curie, iri, этикетка, онтология, short_form, синонимы, описание, is_obsolete, has_children, parents&#125;; в противном случае &#123;root, отношение, total_elements, term_count, термины: &#91;...&#93;&#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `ontology` | строка | **обязательно** |
| `term_id` | строка | **обязательно** |
| `relation` | строка | факультативный; enum: &#91;"parents", "children", "ancestors", "descendants", "hierarchicalParents", "hierarchicalChildren", "hierarchicalAncestors", "hierarchicalDescendants"&#93; |
| `include_parents` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations` {/* #get_go_annotations */}

Аннотации Retrieve GO для генного продукта UniProt от QuickGO (полный, проверенный подсчетом). Args: uniprot_accession (например. "P04637", префикс необязательный; аспект (не для всех аспектов, или один из biological_process/molecular_function/cellular_component); (Никакие/все, предварительно установленные экспериментальные доказательства "experimental_manual"=ручно назначенные, "automatic_iea"=электронные/IEA, или явный код ECO, такой как "ECO: 0000314"); Трехбуквенные коды доказательств GO, такие как IDA / IEA, НЕ принимаются — QuickGO молча игнорирует goEvidence, фильтр должен использовать коды ECO; taxon_id (факультативный таксон NCBI, например). 9606); include_term_names (гидратировать каждую запись с помощью GO-терминала / аспекта / устаревающего с помощью одного пакетного онтологического поиска); max_records (колпачок по записям); полный комплект, все еще извлеченный и обобщенный; `truncated` флаги шапки. Возвращает &#123;gene_product, total_annotations, n_records, полные, усеченные, distinct_go_ids (по всем аннотациям), записи: &#91;&#123;go_id, go_aspect, квалификатор, go_evidence, eco_id, ссылка, assigned_by, дата, ...&#125;&#93;&#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `uniprot_accession` | строка | **обязательно** |
| `aspect` | строка | факультативный; enum: &#91;"biological_process", "molecular_function", "cellular_component"&#93; |
| `evidence` | строка | необязательный |
| `taxon_id` | целое число | необязательный |
| `include_term_names` | логическое значение | факультативный; Дефолт: ложный |
| `max_records` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `get_uniprot_entries` {/* #get_uniprot_entries */}

Получить записи UniProtKB для списка первичных или вторичных присоединений (первым помечены OR-запросы); Неразрешенные псевдонимы используют прямой резервный вход. Три режима: `fields`, заданный → токен-чистый табличный поиск только тех полей UniProt (например). &#91;"присоединение", "id", "protein_name", "gene_names", "organism_name", "длина", "последовательность"&#93;); `format` игнорируется. Формат = «фаста» → последовательности FASTA за вход. формат = «txt» → полный текст UniProt с плоским файлом (полная аннотация); Они могут быть очень большими, предпочитая `fields`. Арги: присоединения (например. &#91;"P04637", "P38398"&#93;); формат («fasta»/«txt», игнорируется при задании `fields`); поля (необязательные имена полей UniProt REST для табличного режима). Возврат: режим полей &#123;access, поля, n_records, записи:&#91;&#123;&lt;column>:value&#125;&#93;&#125;; Fasta/txt-режим &#123;accesces, формат, n_found, missing, records: &#123;access:text&#125;&#125; — `missing` списков присоединений UniProt не вернул ни одной записи.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accessions` | массив строк | **обязательно** |
| `format` | строка | факультативный; enum: &#91;"fasta", "txt"&#93; |
| `fields` | массив строк | необязательный |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `map_reactome_pathways` {/* #map_reactome_pathways */}

Символы гена карты или присоединения UniProt к траекториям Reactome (токеновый рабочий процесс AnalysisService). Args: идентификаторы (символы генов, если id_type="symbol", присоединения UniProt, если "uniprot"); Никаких дубликатов; id_type ("symbol"/"uniprot"); вид (по умолчанию "Homo sapiens"); ресурс (АнализСервисМолекулярно-ресурсный вид "TOTAL") дефолт; "UNIPRO" ограничивает картирование уровня белка; include_disease (служебный по умолчанию True); компактные (True → per-identifier низкоуровневые дорожки только &#123;stId,name,species&#125;) + версия с реакционным высвобождением; Ложный → полный детерминированный результат: наборы полных путей для каждого идентификатора со статистикой сущности/реакции (p-значения, FDR, найденные/общие) и сводка пакетов в т.ч. identifiers_not_found). Возврат: компактные &#123;tool, reactome_version, id_type, виды, n_input, гены: &#123;identifier: &#123;found, n_lowlevel_pathways, Pathways&#125;&#125;&#125;; Полный список добавлений статистики проезда и batch_summary. Идентификаторы карт для путей в запрашиваемых видах, не проецируя их на человека. Использовать поддерживаемое научное название, такое как `Homo sapiens` или `Mus musculus`; Скачиваемая схема перечисляет все поддерживаемые имена. Пустые, неподдерживаемые или несоответствующие виды являются ошибками. `found` и `n_found` указывают на распознавание идентификаторов, а не на членство в пути: распознанный идентификатор может иметь нулевые пути. Компактный режим содержит только низкоуровневые пути.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `identifiers` | массив строк | **обязательно** |
| `id_type` | строка | **обязательно**; enum: &#91;"symbol", "uniprot"&#93; |
| `species` | строка | факультативный; По умолчанию: "Homo sapiens" |
| `resource` | строка | факультативный; По умолчанию: "TOTAL" |
| `include_disease` | логическое значение | факультативный; Дефолт: правда |
| `compact` | логическое значение | факультативный; Дефолт: правда |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources` {/* #list_enrichment_sources */}

Перечислите источники обогащения профилера и их текущие версии данных для одного организма. Источники зависят от организма и включают пространства имен, такие как GO:BP, GO:MF, GO:CC, KEGG, Reactome и WikiPathways, когда они доступны. g:Профильер хранит ограниченные метаданные запроса для работы службы; Этот поиск только для чтения не представляет список генов.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `organism` | строка | **обязательно**; Длина: 1; Максимальная длина: 64; модель: "^&#91;a-z&#93;&#91;a-z0-9_&#93;&#42;$" |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set` {/* #enrich_gene_set */}

Запустите g:Profiler g:GOSt обогащение для набора генов в GO, Reactome, KEGG, WikiPathways и других источниках, поддерживаемых организмом. Поддерживает явный организм, пользовательский статистический фон, тестирование на недостаточную представленность и коррекцию многократного тестирования g:Profiler. Неоформленные, двусмысленные и дублирующие идентификаторы возвращаются в метаданных, а не отбрасываются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `genes` | массив строк | **обязательно**; Мини-элементы: 1; maxItems: 5000 |
| `organism` | строка | **обязательно**; Длина: 1; Максимальная длина: 64; модель: "^&#91;a-z&#93;&#91;a-z0-9_&#93;&#42;$" |
| `sources` | массив строк | факультативный; maxItems: 100 |
| `background_genes` | массив строк | факультативный; Мини-элементы: 1; maxItems: 20000 |
| `domain_scope` | строка | факультативный; enum: &#91;"annotated", "known", "custom", "custom_annotated"&#93; |
| `correction_method` | строка | факультативный; по умолчанию: "g_SCS"; enum: &#91;"g_SCS", "bonferroni", "fdr"&#93; |
| `user_threshold` | число | факультативный; максимум: 1; Минимум: 0 |
| `all_results` | логическое значение | факультативный; Дефолт: ложный |
| `ordered` | логическое значение | факультативный; Дефолт: ложный |
| `measure_underrepresentation` | логическое значение | факультативный; Дефолт: ложный |
| `no_iea` | логическое значение | факультативный; Дефолт: ложный |
| `no_evidences` | логическое значение | факультативный; Дефолт: ложный |
| `numeric_ns` | строка | факультативный; Длина: 1; Длина: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## геномы {/* #family-5 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `ensembl_lookup` {/* #ensembl_lookup */}

Ищите гены, транскрипты или белки по стабильному идентификатору или гены по символу. Запрос принимает идентификаторы ENS (разрешенные версии), идентификаторы FlyBase / WormBase / дрожжей или символы, такие как BRAF. query_type: авто (по умолчанию) сначала пробует ID, затем символ только при явном отсутствии, если вход не является каноническим ENS/LRG ID; id использует только ID-поиск; Символ использует только поиск символов без нормализации версии. Вид относится только к поиску символов (по умолчанию homo_sapiens) и не выводится. Расширение включает в себя транскрипты, экзоны и переводы (по умолчанию ложные). Недействительные запросы и сбои в обслуживании вызывают ошибки.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `query_type` | строка | факультативный; по умолчанию: "auto"; enum: &#91;"auto", "id", "symbol"&#93; |
| `species` | строка | факультативный; По умолчанию: "homo_sapiens" |
| `expand` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs` {/* #ensembl_xrefs */}

Внешние перекрестные ссылки стабильного идентификатора Ensembl — мост от идентификаторов гена/транскрипта Ensembl к HGNC, NCBI (EntrezGene), UniProt, OMIM, RefSeq, Expression Atlas и другим. Args: stable_id (ENSG.../ENST..., версия принята); external_db (необязательно точный фильтр имени базы данных, например). HGNC, EntrezGene, Uniprot_gn, MIM_GENE, RefSeq_mRNA; Опущено для всех. Возвращает &#123;stable_id, external_db, n_xrefs, xrefs&#125; — список COMPLETE (никогда не усеченный), отсортированный по (dbname, primary_id); каждый ряд &#123;dbname, db_display_name, primary_id, display_id, описание, синонимы, info_type&#125;. Неизвестные идентификаторы возвращают n_xrefs:0.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `stable_id` | строка | **обязательно** |
| `external_db` | строка | необязательный |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant` {/* #ensembl_vep_variant */}

Если указан `variant_id`, поиск по ID имеет приоритет: `region`, `allele` и `allele_orientation` игнорируются. `allele` не фильтрует результаты поиска по ID. Запрос по области использует текущую референсную сборку вида (GRCh38 для человека). Координаты начинаются с 1 и включают обе границы; для вставки применяется `start = end + 1`. По умолчанию `allele_orientation` равен `forward`: аллель интерпретируется относительно прямой цепи референса даже при суффиксе `:-1`. При значении `region` последовательность аллеля в области обратной цепи преобразуется в обратный комплемент перед запросом. Символьные аллели в такой области требуют `forward`. Все запросы по области отправляются относительно прямой цепи; `normalization` сохраняет исходный и нормализованный ввод. Перенос координат между сборками и обращение координат не выполняются. Расположение гена на обратной цепи не требует ввода относительно обратной цепи.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `variant_id` | строка | необязательный |
| `region` | строка | необязательный |
| `allele` | строка | необязательный |
| `allele_orientation` | строка | факультативный; по умолчанию: `forward`; ЭНУМ: `forward`, `region` |
| `species` | строка | факультативный; По умолчанию: "homo_sapiens" |
| `max_consequences` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology` {/* #ensembl_homology */}

Ортологи или паралоги гена от Ensembl Compara (сжатые строки — никаких выравниваний/последовательности). Args: gene_symbol (разрешено сначала для стабильного идентификатора в `species`); Пройти точно один из gene_symbol/gene_id; gene_id (ENSG) homology_type (ортологи по умолчанию/паралоги/проекции); target_species (ограничение на один вид); target_taxon (NCBI taxon subtree, например). 9443 Приматы; Сочетание с target_species, или семантикой; видов (источник видов, по умолчанию homo_sapiens); max_homologies (по умолчанию 200); n_total несет полный счет, homologies_truncated флаги шапки. Возвращает &#123;gene_id, gene_symbol, виды, homology_type, target_species, target_taxon, n_total, homologies_truncated, гомологии &#125;; строки, отсортированные по (видам,id) &#123;type, видам, id, protein_id, taxonomy_level, method_link_type&#125;. Quirk: маршрут /homology/symbol stalls — этот инструмент всегда решает сами символы и запросы с помощью стабильного идентификатора.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | необязательный |
| `gene_id` | строка | необязательный |
| `homology_type` | строка | факультативный; по умолчанию: "orthologues"; enum: &#91;"orthologues", "paralogues", "projections"&#93; |
| `target_species` | строка | необязательный |
| `target_taxon` | целое число | необязательный |
| `species` | строка | факультативный; По умолчанию: "homo_sapiens" |
| `max_homologies` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence` {/* #ensembl_sequence */}

Приведем последовательность из Ensembl — по стабильному идентификатору (ген/транскрипт/белок) или по геномной области. Передайте EITHER stable_id или регион. Args: stable_id (ENSG.../ENST.../ENSP..., версия принята); регион (включающий хром на основе 1:start..end или chrom:start-end, GRCh38 для человека, максимум 10Mb); виды (для маршрута региона, по умолчанию homo_sapiens); - проигнорированы для стабильных идентификаторов; seq_type (маршрут ID: геномный дефолт/cdna/cds/белок); Игнорировались регионы, которые всегда возвращаются геномными. Этот инструмент возвращает одну последовательность: для запросов cdna/cds/белка на уровне генов, которые разрешаются для нескольких последовательностей, вместо этого укажите стабильный идентификатор транскрипта/белка; max_bytes (защита полезной нагрузки по умолчанию 400000 — более крупные последовательности `seq` опущены); длина/ша256/метадата всегда возвращается; Повторный вызов с большим max_bytes для полного текста. Возвращает &#123;found, запрос, seq_type, идентификатор, описание, молекулу, длину, sha256, seq&#125; длина в единице, подразумеваемой молекулой (основы для ДНК, остатки для белка); сек, заменяемый seq_omitted, когда он ограничен; найдено: ложно с нулевыми полями только тогда, когда Ensembl явно сообщает о запрашиваемом стабильном идентификаторе, как не найдено; Запросы множественных последовательностей, несовместимые типы последовательностей и другие ошибки восходящего потока вызывают ошибки.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `stable_id` | строка | необязательный |
| `region` | строка | необязательный |
| `species` | строка | факультативный; По умолчанию: "homo_sapiens" |
| `seq_type` | строка | факультативный; по умолчанию: "genomic"; enum: &#91;"genomic", "cdna", "cds", "protein"&#93; |
| `max_bytes` | целое число | факультативный; По умолчанию: 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region` {/* #ensembl_overlap_region */}

Функции List Ensembl перекрывают геномную область — гены, транскрипты, регуляторные особенности (энхансеры/промоторы), повторы, варианты, кариотипные полосы. Args: region (1-based inclusive chrom:start-end GRCh38, например). 7:140719327-140925199; upstream отбраковывает пролеты > 5Mb — делится больше; функция (ген по умолчанию/транскрипт/эксон/cds/регулятор/мотив/повтор/вариация/structural_variation/диапазон/простой/миск); разновидностей (по умолчанию homo_sapiens); max_features (по умолчанию 500); n_total несет полное количество перекрытий, features_truncated флаги шапки. Возвращает &#123; регион, вид, особенность, n_total, features_truncated, особенности &#125; (Пуск, начало, начало). Форма рядов варьируется — гены &#123;id, external_name, биотип, описание, начало, конец, нить, canonical_transcript, ...&#125;; регуляторный &#123;id, описание, начало, конец, extended_start/конец, ...&#125;. Пустые области возвращают n_total:0.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `region` | строка | **обязательно** |
| `feature` | строка | факультативный; по умолчанию: "gene"; enum: &#91;"gene", "transcript", "exon", "cds", "regulatory", "motif", "repeat", "variation", "structural_variation", "band", "simple", "misc"&#93; |
| `species` | строка | факультативный; По умолчанию: "homo_sapiens" |
| `max_features` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon` {/* #ncbi_resolve_taxon */}

Разрешить название вида или таксона для идентификаторов таксономии NCBI. Принимает научное/общее название или номер TaxID; возвращает каждый матч вверх по течению, поэтому двусмысленные имена не присваиваются молча первому результату.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно**; Длина: 1; Длина: 200 |
| `max_matches` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info` {/* #ncbi_get_assembly_info */}

Верните точную идентификацию сборки генома NCBI для версии присоединения GCF / GCA, включая таксон, имя сборки, синоним UCSC, статус и сопряженное присоединение RefSeq / GenBank. Присоединение без версий отклоняется для предотвращения ошибок воспроизводимости и совместимости видов.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `assembly_accession` | строка | **обязательно**; шаблон: "^GC&#91;AF&#93;_&#91;0-9&#93;&#123; 9&#125;\\.&#91;0-9&#93;+$" |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases` {/* #ncbi_get_sequence_aliases */}

Перечислите названия последовательностей и точные псевдонимы UCSC/RefSeq/GenBank для одной версии сборки NCBI. - необязательное решение одного имени последовательности; Неоднозначные общие хромосомные метки сохраняются в виде нескольких совпадений вместо выбора альтернативного или нелокализованного каркаса. Результаты представляют собой ограниченный префикс, управляемый max_sequences (по умолчанию 200); Используйте большую крышку, когда требуется полный отчет о сборке.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `assembly_accession` | строка | **обязательно**; шаблон: "^GC&#91;AF&#93;_&#91;0-9&#93;&#123; 9&#125;\\.&#91;0-9&#93;+$" |
| `sequence` | строка | факультативный; Длина: 1; Длина: 200 |
| `max_sequences` | целое число | факультативный; по умолчанию: 200; Минимум: 1; Максимум: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks` {/* #ucsc_list_tracks */}

Перечислите треки данных, доступные в сборке UCSC Genome Browser (только листовые треки — запрашиваемые), необязательно отфильтрованные. Арги: геном (hg38 default/hg19/mm39/danRer11/...) - сборки 220; filter_text (бесчувствительная к регистру подстрока над именем/короткой/длинной этикеткой, например). phyloP, TFBS, ClinVar; не перечислять все - hg38 имеет ~24k листовых дорожек, вам почти всегда нужен фильтр; max_tracks (по умолчанию 200); n_total несет полный счет матча, tracks_truncated флаги шапки. Возвращает &#123;genome, filter_text, n_total, tracks_truncated, треки &#125; сортировка по названию трассы; каждый ряд &#123;track, short_label, long_label, тип, группа, родитель &#125;. Используйте `track` с ucsc_track_data. Quirk: первый вызов на геном загружает полный список ~17MB и кэширует его для процесса.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `genome` | строка | факультативный; По умолчанию: "hg38" |
| `filter_text` | строка | необязательный |
| `max_tracks` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data` {/* #ucsc_track_data */}

Принесите сырые строки любого трека UCSC Genome Browser в регионе — общий аварийный люк за ucsc_conservation / ucsc_tfbs_clusters (генные треки, ClinVar, каталог GWAS, CpG Islands, повторы, ...). Args: track (название ucsc_list_tracks, например). известныйGene, cpgIslandExt, clinvarMain; хром (chr-prefixed, chr7/chrX — UCSC требует приставки); Старт (полуоткрытый на основе 0); Старт на основе Ensembl 1 - start-1 здесь; конечный (исключительный); геном (по умолчанию hg38); max_rows (API maxItemsOutput, 1000 по умолчанию); Усеченный флаг отражает собственный флаг maxItemsLimit API's. Возвращает &#123;genome, трек, хром, начало, конец, track_type, items_returned, усеченный, ряды &#125; — строки в форме вверх по течению (BED-подобные &#123;chrom, chromStart, chromEnd, имя, счет, ...&#125;); wiggle &#123;start, end, value&#125;). Неизвестные трассы поднимаются. Quirk: для некоторых огромных треков API сам выводит кэпы и указывает на dataDownloadUrl — эхом отражаясь, когда присутствует. Координаты должны быть неотрицательными целыми числами с `end > start`. Недействительные значения отвергаются, не округляются и не зажимаются в другой локус.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `track` | строка | **обязательно** |
| `chrom` | строка | **обязательно** |
| `start` | целое число | **обязательно**; Минимум: 0; Максимум: 9007199254740991 |
| `end` | целое число | **обязательно**; Минимум: 0; Максимум: 9007199254740991 |
| `genome` | строка | факультативный; По умолчанию: "hg38" |
| `max_rows` | целое число | факультативный; По умолчанию: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation` {/* #ucsc_conservation */}

Эволюционное резюме сохранения для региона из треков UCSC phyloP / phastCons (базовые оценки по многовидовым выравниваниям). Args: chrom (chr-prefixed); старт (полуоткрытый на основе 0); конечный (исключительный); пролет, ограниченный на 100000 bp — раздвоение больше; геном (по умолчанию hg38); трек (необязательно); по умолчанию для phyloP100wayAll для hg19 и phyloP100way для других геномов; положительный = сохраненный, отрицательный = быстро развивающийся; альтернативные варианты hg38 phastCons100way, phyloP30way, phastCons30way, phyloP447way, phyloP470way; hg19phastCons100way; include_values (также возврат на базу &#123;start,end,value&#125;) строки, ограниченные max_values, values_truncated флаги шапки; По умолчанию false = summary only; max_values (по умолчанию 2000). Возвращает &#123;genome, трек, хром, начало, конец, span_bp, n_bases_covered, coverage_fraction, среднее, мин, max&#125; (+ значения, values_truncated по запросу). Статистика, взвешенная по базовому пролету каждого ряда, прикреплена к окну; Необнаруженные базы ниже coverage_fraction, не нулевые. Непрофильные трассы поднимают; Также поднимается укороченный вверх по течению список строк.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `chrom` | строка | **обязательно** |
| `start` | целое число | **обязательно**; Минимум: 0; Максимум: 9007199254740991 |
| `end` | целое число | **обязательно**; Минимум: 0; Максимум: 9007199254740991 |
| `genome` | строка | факультативный; По умолчанию: "hg38" |
| `track` | строка | необязательный |
| `include_values` | логическое значение | факультативный; Дефолт: ложный |
| `max_values` | целое число | факультативный; По умолчанию: 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters` {/* #ucsc_tfbs_clusters */}

Кластеры сайтов связывания с транскрипционным фактором ENCODE, перекрывающие область (кластеры пиков ChIP-seq в сотнях типов клеток), которые TF связываются где. Args: chrom (chr-prefixed); старт (полуоткрытый на основе 0); конечный (исключительный); геном (hg38 по умолчанию трек encRegTfbsClustered ENCODE 3, или hg19 wgEncodeRegTfbsClusteredV3); другие сборки поднимают; max_rows (API maxItemsOutput по умолчанию 1000); Усеченный отражает maxItemsLimit. Возвращает &#123;genome, трек, хром, начало, конец, items_returned, усеченный, n_факторы, факторы, кластеры &#125; - кластеры, отсортированные по (chromStart,name) &#123;name (символ TF, например). CTCF), chrom, chromStart, chromEnd, score (0-1000), sourceCount (поддерживающие эксперименты)&#125;; Факторами является отдельный список TF. Score>=~600 и high sourceCount ~ прочная привязка. Координаты должны быть неотрицательными целыми числами с `end > start`. Недействительные значения отвергаются, не округляются и не зажимаются в другой локус.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `chrom` | строка | **обязательно** |
| `start` | целое число | **обязательно**; Минимум: 0; Максимум: 9007199254740991 |
| `end` | целое число | **обязательно**; Минимум: 0; Максимум: 9007199254740991 |
| `genome` | строка | факультативный; По умолчанию: "hg38" |
| `max_rows` | целое число | факультативный; По умолчанию: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes` {/* #ucsc_chrom_sizes */}

Хромосома/контиговые названия и размеры сборки UCSC — для проверки координат и итерации областей. Args: геном (по умолчанию hg38); filter_text (бесчувствительная к регистру подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная. chr1; hg38 имеет последовательности 711, в основном alt/random/unplaced; первичные хромосомы сортировать первыми; max_chroms (по умолчанию 100); n_total несет полный счет после фильтра, chroms_truncated флаги колпачок. Возвращает &#123;genome, filter_text, chrom_count (в масштабе всей сборки от API), n_total, chroms_truncated, хромосомы: &#91;&#123;name, size_bp&#125;&#93; &#125; Сортировка по размеру нисходящая.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `genome` | строка | факультативный; По умолчанию: "hg38" |
| `filter_text` | строка | необязательный |
| `max_chroms` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

</ToolOperationGroup>

## Варианты {/* #family-6 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

**Правила координации gnomAD:** записывает штифт набора данных с помощью эталонной сборки. Коротковариантные генные/региональные запросы используют GRCh37 для r2.1/ExAC и GRCh38 для r3/r4; Структурно-вариантные генные запросы используют `gnomad_sv_r2_1` (GRCh37) или `gnomad_sv_r4` (GRCh38); Изменение штифта не преобразует входные координаты. `gene_constraint` и зеркало GnomAD ClinVar используют фиксированный поиск гена GRCh38 и не принимают аргумент набора данных. Митохондриальные запросы также используют фиксированный родительский поиск GRCh38. Поставляет либо ген, либо обе упорядоченные границы области, никогда оба режима. Границы областей должны быть целыми числами от 1 до 999,999,999. Разница в один миллион базисных разниц распространяется на `region_variants`. Это не отдельный митохондриальный предел. Сохраняйте идентификаторы структурно-вариантных идентификаторов с их исходным набором данных SV.

### `get_variant` {/* #get_variant */}

Посмотрите на один короткий вариант gnomAD по ID и верните общие частоты экзома / генома. `variant_id` - это `chrom-pos-ref-alt` в справочной сборке набора данных (GRCh38 для r3/r4, GRCh37 для r2.1/ExAC), например. `19-44908822-C-T` (APOE rs7412); Сначала используйте `search_variants` для разрешения rsID. Установите `include_populations: true`, когда для индивидуального варианта требуются специфические для предков подсчеты / частоты. Сохранение набора данных, подсчета аллелей и фильтров качества при интерпретации частот; Редкость сама по себе не устанавливает патогенность или критерий ACMG.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `variant_id` | строка | **обязательно** |
| `dataset` | строка | факультативный; по умолчанию: "gnomad_r4"; Перечислим: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "эксцентричный"&#93; |
| `include_populations` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants` {/* #search_variants */}

Поиск gnomAD для идентификаторов вариантов, соответствующих строке запроса (rsID, такой как `rs7412`, идентификатор варианта или префикс). Используйте это для разрешения идентификаторов rsID для `chrom-pos-ref-alt` для `get_variant`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `dataset` | строка | факультативный; по умолчанию: "gnomad_r4"; Перечислим: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "эксцентричный"&#93; |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants` {/* #gene_variants */}

Перечислите все короткие варианты гномады в гене. Границы генов и координаты вариантов используют сборку эталонных наборов данных (GRCh37 для r2.1/ExAC, GRCh38 для r3/r4). Полный список может содержать тысячи строк для больших генов. Передайте точно один из `gene_symbol` (символ HGNC, например). `APOE`) или `gene_id` (Ensembl gene ID, например. `ENSG00000130203`).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | необязательный |
| `gene_id` | строка | необязательный |
| `dataset` | строка | факультативный; по умолчанию: "gnomad_r4"; Перечислим: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "эксцентричный"&#93; |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint` {/* #gene_constraint */}

метрики ограничения гена gnomAD: pLI, наблюдаемые/ожидаемые LoF-missense-синонимы с соотношениями oe + 90% CI и z-баллами класса. Использовать для оценки непереносимости гена ' к потере функции (pLI >= 0.9 или oe_lof_upper (LOEUF) &lt;) 0.6 - LoF-нетерпимость. Пройдите ровно один из `gene_symbol` (например). `TP53`) или `gene_id`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | необязательный |
| `gene_id` | строка | необязательный |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants` {/* #region_variants */}

Перечислите все короткие варианты гномады в геномной области (макс 1 Mb — разделение больших областей на последовательные окна). `chrom` принимает `1`-`22`, `X`, `Y`, дополнительный префикс `chr` и строчную версию `x`/`y`; `start`/`stop` - это 1 на основе включительно, а `stop - start` должен быть &lt; = 1,000,000. Набор данных определяет исходную сборку координат (GRCh37 для r2.1/ExAC, GRCh38 для r3/r4); Координаты ввода уже должны использовать эту сборку без автоматического подъема.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `chrom` | строка | **обязательно** |
| `start` | целое число | **обязательно**; Минимум: 1; Максимум: 999999999 |
| `stop` | целое число | **обязательно**; Минимум: 1; Максимум: 999999999 |
| `dataset` | строка | факультативный; по умолчанию: "gnomad_r4"; Перечислим: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "эксцентричный"&#93; |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant` {/* #liftover_variant */}

Карта варианта ID между сборками ссылок (GRCh37 &lt;->) GRCh38) с использованием подъемного стола gnomAD's. `variant_id` - это `chrom-pos-ref-alt` на `source_build`. Маршрут является направленным: идентификатор GRCh38, пройденный с `source_build=GRCh37`, возвращает нулевые результаты, а не ошибку.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `variant_id` | строка | **обязательно** |
| `source_build` | строка | факультативный; по умолчанию: "GRCh37"; enum: &#91;"GRCh37", "GRCh38"&#93; |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants` {/* #clinvar_variants */}

Перечислите варианты ClinVar в гене, отраженном гномадом, с клинической значимостью, статусом обзора и золотыми звездами. Выходные штифты gnomAD's ClinVar снимут с помощью `clinvar_release_date`. Пройдите ровно один из `gene_symbol` (например). `BRCA1`) или `gene_id`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | необязательный |
| `gene_id` | строка | необязательный |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants` {/* #structural_variants */}

Перечислите структурные варианты гномады (делеции, дупликации, вставки, инверсии, CNV...), перекрывающие ген. Пройдите ровно один из `gene_symbol` (например). `TP53`) или `gene_id`. `dataset` — SV-пин — `gnomad_sv_r4` (по умолчанию, GRCh38) или `gnomad_sv_r2_1` (GRCh37); Идентификаторы SV являются специфичными для релиза.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | необязательный |
| `gene_id` | строка | необязательный |
| `dataset` | строка | факультативный; по умолчанию: "gnomad_sv_r4"; enum: &#91;"gnomad_sv_r4", "gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant` {/* #get_structural_variant */}

Посмотрите на один структурный вариант гномады по его SV ID, специфичному для выпуска (например). `DEL_CHR17_599B1512` в gnomad_sv_r4. Идентификаторы не переносят релизы — `dataset` (по умолчанию `gnomad_sv_r4` или `gnomad_sv_r2_1`) должен соответствовать выпуску, из которого был получен идентификатор.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `sv_id` | строка | **обязательно** |
| `dataset` | строка | факультативный; по умолчанию: "gnomad_sv_r4"; enum: &#91;"gnomad_sv_r4", "gnomad_sv_r2_1"&#93; |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants` {/* #mitochondrial_variants */}

Перечислите варианты митохондрий gnomAD с гетероплазматически-осознанными числами (`ac_het`, `ac_hom`, `max_heteroplasmy`) для митохондриального гена или окна координат chrM. Передайте ген (`gene_symbol`, как `MT-TL1`, или `gene_id`) или область (`region_start` + `region_stop`), а не оба.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | необязательный |
| `gene_id` | строка | необязательный |
| `region_start` | целое число | факультативный; Минимум: 1; Максимум: 999999999 |
| `region_stop` | целое число | факультативный; Минимум: 1; Максимум: 999999999 |
| `dataset` | строка | факультативный; по умолчанию: "gnomad_r4"; Перечислим: &#91;"gnomad_r4", "gnomad_r4_non_ukb", "gnomad_r3", "gnomad_r3_controls_and_biobanks", "gnomad_r3_non_cancer", "gnomad_r3_non_neuro", "gnomad_r3_non_topmed", "gnomad_r3_non_v2", "gnomad_r2_1", "gnomad_r2_1_controls", "gnomad_r2_1_non_cancer", "gnomad_r2_1_non_neuro", "gnomad_r2_1_non_topmed", "эксцентричный"&#93; |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

### `clinvar_search` {/* #clinvar_search */}

Найдите ClinVar напрямую (живой NCBI, а не снимок gnomAD's) и верните соответствующие записи вариаций с клинической значимостью, статусом обзора и золотыми звездами. Требуется контактная электронная почта ([Настройки → Удостоверения → Доступ к литературе → Контактная электронная почта](../tools/credentials.md)) в соответствии с политикой использования электронных услуг NCBI. Args: запрос (запрос ClinVar Entrez — бесплатный текст, такой как "TP53 R175H") или строка HGVS работает, и полевые термины составляют AND/OR/NOT, например. BRCA1&#91;ген&#93;, патогенный&#91;CLIN_SIG&#93;, синдром "Lynch"&#91;dis&#93;, single_nucleotide_variant&#91;Тип вариации&#93;; rsID также работает, но clinvar_variant_by_rsid возвращает более полные записи), max_records (контакт страницы 1-200, 50). Об итогах матча всегда сообщается; когда > max_records - это префикс с заглавной буквой (ClinVar relevance/recency order) и усеченный. NCBI E-utilities периодически возвращает HTTP 500 под нагрузкой — повторите один раз через несколько секунд, если это произойдет.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records` {/* #clinvar_get_records */}

Принесите полные записи ClinVar для пакета присоединений VCV / RCV или идентификаторов с голыми вариациями. Требуется контактная электронная почта ([Настройки → Удостоверения → Доступ к литературе → Контактная электронная почта](../tools/credentials.md)) в соответствии с политикой использования электронных услуг NCBI. Args: присоединения (до идентификаторов 50, принятых смешанных форм — VCV000045122 (версия VCV000045122.3 ok); RCV000019428 (каждый RCV стоит одного дополнительного поиска) или просто идентификатор вариации ClinVar (45122). rsID отклоняются — используйте clinvar_variant_by_rsid. RCV (одна пара вариант-условие) разрешает свою родительскую запись вариации VCV. Никогда не опускайте вход молча.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accessions` | ['string', 'array'] | **обязательно** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid` {/* #clinvar_variant_by_rsid */}

Все записи вариаций ClinVar, которые ссылаются на dbSNP rsID, с полными классификациями (rsID может отображаться на несколько VCV — один на альтернативную аллель, например). rs121913529 охватывает KRAS G12D/G12V/G12A. Требуется контактная электронная почта ([Настройки → Удостоверения → Доступ к литературе → Контактная электронная почта](../tools/credentials.md)) в соответствии с политикой использования электронных услуг NCBI. Args: rsid (dbSNP reference SNP ID, например). rs7412; rs&lt;digits>, max_records (кап 1-200, по умолчанию 50). Total всегда несет в себе истинное количество матчей и усеченные флаги с ограниченным списком; 0 означает, что ClinVar не имеет записи для rsID.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `rsid` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids` {/* #dbsnp_get_rsids */}

Канонические записи dbSNP RefSNP для партии rsID: размещения GRCh38 + GRCh37, аллели, контекст генов, частоты аллелей для каждого исследования и перекрестные ссылки ClinVar. Требуется контактная электронная почта ([Настройки → Удостоверения → Доступ к литературе → Контактная электронная почта](../tools/credentials.md)) в соответствии с политикой использования электронных услуг NCBI; Без одного инструмента возвращается &#123;error: 'contact_email_required', message&#125;. Args: rsids (до 20 rs&lt;digits>, case-insensitive) — каждый запрос NCBI Variation Services обходится в один темп, поэтому большие партии берут ~1s за rsID. Возвращает &#123;n_requested, записи, not_found (rs numbers dbSNP doesn't know), not_processed (rsIDs пропущены, когда бюджет на настенные часы закончился — повторно запросите только эти) &#125;. Каждая запись: &#123;rsid, статус, create_date, last_update_date, last_update_build_id, n_citations, citations_pmids (зарегистрирована на 20); citations_truncated флаги шапка), variant_type, mane_select_ids, размещения, аллели &#125;. Статус: 'live', 'merged' (запись вместо этого несет merged_into — повторный запрос этих rsID) или 'no_data' (отозвано/неподдерживаемо). Расположения дают хромосомные координаты на основе 1 с ref/alts на сборку (GRCh38, is_primary истинно). Каждая запись alt-allele: &#123;allele, ref, spdi (интербаза на основе 0), hgvs, частоты: &#91;&#123;study, study_version, allele_count, total_count, af&#125;&#93; (ALFA, 1000Genomes, TOPMED, gnomAD...), clinvar: &#91;&#123;rcv_accession, clinical_significances, review_status, last_evaluated_date, disease_names&#125;&#93;, гены: &#91;&#123;symbol, gene_id, имя, ориентация, последствия (термины SO), mane_select: &#91;&#123;transcript_hgvs, protein_spdi&#125;&#93; &#125;&#93; &#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `rsids` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region` {/* #dbsnp_search_by_region */}

Перечислите dbSNP rsIDs в геномном окне (поисковый позиционный индекс db=snp — NCBI Variation Services не имеет конечной точки региона). Требуется контактная электронная почта ([Настройки → Удостоверения → Доступ к литературе → Контактная электронная почта](../tools/credentials.md)) в соответствии с политикой использования электронных услуг NCBI; Без одного инструмента возвращается &#123;error: 'contact_email_required', message&#125;. Арги: хром (1-22, X, Y или MT); 'chr' префикс допустимый, стартовый (1-based inclusive), стоп (включительно); пролет, ограниченный 1 Mb, — разделять большие области на последовательные окна; Плотные области содержат много тысяч rsID на кб, поэтому сохраняют окна маленькими или поднимают max_rsids, сборка (показатель позиционирования — 'GRCh38') По умолчанию - > &#91;CPOS&#93; или 'GRCh37' -> &#91;CPOS_GRCH37&#93;; Координаты должны быть на выбранной сборке), max_rsids (кап-кап 1-1000, по умолчанию 200). Возвращает &#123;chrom, запуск, остановку, сборку, термин (точный используемый запрос Entrez), общий (собственный счет API'), n_возврат, усечение, rsids&#125;. Усеченное верно, когда общее значение > n_returned — список затем является префиксом в порядке по умолчанию Entrez (снижается число rs), никогда не является молчаливым усечением. Кормите rsID (&lt; = 20 за раз) до dbsnp_get_rsids для полных записей.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `chrom` | строка | **обязательно** |
| `start` | целое число | **обязательно** |
| `stop` | целое число | **обязательно** |
| `assembly` | строка | факультативный; по умолчанию: "GRCh38"; enum: &#91;"GRCh38", "GRCh37"&#93; |
| `max_rsids` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## Клинические испытания {/* #family-7 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `search_trials` {/* #search_trials */}

Предварительный поиск по ClinicalTrials.gov. Фильтр по состоянию, вмешательству, спонсору, местоположению, статусу (например). &#91;"RECRUITING"&#93;), фаза (&#91;"PHASE1".."PHASE4"&#93;) и study_type. условие/вмешательство/спонсор/местоположение принимают синтаксис запроса Essie (булевый AND/OR/NOT, "quoted phrases", группирование, автоматические синонимы). Страница с page_token; count_total для общего количества матчей. advanced_query объединяет необработанное выражение Essie в filter.advanced.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `condition` | строка | необязательный |
| `intervention` | строка | необязательный |
| `sponsor` | строка | необязательный |
| `location` | строка | необязательный |
| `status` | массив строк | необязательный |
| `phase` | массив строк | необязательный |
| `study_type` | строка | факультативный; &#91;"INTERVENTIONAL", "OBSERVATIONAL", "EXPANDED_ACCESS"&#93; |
| `advanced_query` | строка | необязательный |
| `page_size` | целое число | факультативный; по умолчанию: 10; Минимум: 1; Максимум: 1000 |
| `page_token` | строка | необязательный |
| `count_total` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details` {/* #get_trial_details */}

Получите подробную информацию для одного испытания по идентификатору NCT (формат "NCT") + Цифры 8; голое число является префиксным, нечувствительным к случаю. Возвращает полные критерии приемлемости, дизайн исследования, первичные / вторичные / другие конечные точки, все местоположения, спонсоров и сотрудников, даты, регистрацию и ссылку на результаты.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `nct_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor` {/* #search_by_sponsor */}

Найти испытания, спонсируемые компанией или организацией (частичное совпадение имен, например). "Pfizer" Об этом сообщает "Pfizer Inc". Необязательно узкий по состоянию, фазе и статусу. Установите count_total для общего количества испытаний спонсором. Страница с page_token.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `sponsor_name` | строка | **обязательно** |
| `condition` | строка | необязательный |
| `phase` | массив строк | необязательный |
| `status` | массив строк | необязательный |
| `page_size` | целое число | факультативный; по умолчанию: 10; Минимум: 1; Максимум: 1000 |
| `page_token` | строка | необязательный |
| `count_total` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators` {/* #search_investigators */}

Найдите основных исследователей и исследовательские сайты по состоянию, учреждению, местоположению или investigator_name. учреждение фильтрует объект на объекте и имеет приоритет над местоположением; investigator_name выполняет поиск по адресу: GeneralOfficialName и ResponsiblePartyInvestigatorFullName. Возвращает контакты сайта (имена, роли, принадлежности, объекты, города) с их тестовыми идентификаторами NCT. page_size показывает, сколько испытаний сканируется.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `condition` | строка | необязательный |
| `institution` | строка | необязательный |
| `location` | строка | необязательный |
| `investigator_name` | строка | необязательный |
| `status` | массив строк | необязательный |
| `page_size` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints` {/* #analyze_endpoints */}

Анализ первичных/вторичных/других показателей результатов (конечных точек). Обеспечить ТОЛЬКО nct_id (режим с одним испытанием) ИЛИ условие (совокупный режим в испытаниях); Если обе версии даны, то nct_id имеет преимущество. Совокупный режим может быть сужен по фазе и start_date_after (YYYY-MM-DD) и сканирует до испытаний page_size. Возвращает списки конечных точек плюс наиболее распространенные имена измерений в анализируемых испытаниях.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `nct_id` | строка | необязательный |
| `condition` | строка | необязательный |
| `phase` | массив строк | необязательный |
| `start_date_after` | строка | необязательный |
| `page_size` | целое число | факультативный; по умолчанию: 50; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility` {/* #search_by_eligibility */}

Совпадение пациентов. Неправильно проводить судебные разбирательства, если статус не установлен. Поставка min_age или max_age для одного возраста пациента (65 Годы, 6 Месяцы) Проверяются обе возрастные границы. Если оба поставляются, исследование должно учитывать весь возрастной интервал пациента. Пропущенные возрастные ограничения не ограничены. секс-мужчина / женщина включает в себя все-прибывшие испытания; Все или опущенный секс не имеет полового фильтра. eligibility_keywords выполняет поиск по тексту критериев включения/исключения (например, по запросу «включение/исключение»). "HbA1c > 8", "BRCA мутация", "ECOG 0-1"). Требуется хотя бы одно из состояний, eligibility_keywords, min_age, max_age или пол. Страница с page_token.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `condition` | строка | необязательный |
| `eligibility_keywords` | строка | необязательный |
| `min_age` | строка | необязательный |
| `max_age` | строка | необязательный |
| `sex` | строка | факультативный; &#91;"ALL", "MALE", "FEMALE"&#93; |
| `status` | массив строк | необязательный |
| `page_size` | целое число | факультативный; по умолчанию: 10; Минимум: 1; Максимум: 1000 |
| `page_token` | строка | необязательный |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## Клиническая геномика {/* #family-8 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `clingen_gene_validity` {/* #clingen_gene_validity */}

Курации достоверности генной болезни ClinGen (насколько убедительны доказательства того, что вариация в гене вызывает заболевание: окончательная / сильная / сильная / умеренная / ограниченная / спорная / опровергнутая / неизвестная связь с болезнью). Перечислите все гены 3,600+.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene` | строка | необязательный |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity` {/* #clingen_dosage_sensitivity */}

Курации чувствительности дозировки ClinGen: утверждения о гаплоиновости и триплочувствительности для генов (и необязательно геномные / CNV области ISCA). Символ гена или ISCA регион id фильтрует точно; Опустить для полного стола.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene` | строка | необязательный |
| `include_regions` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability` {/* #clingen_actionability */}

Клинические экшн-курации ClinGen: для расстройств, связанных с геном, является ли раннее вмешательство в пресимптоматических носителях действенным (пары вмешательства / результата с тяжестью, вероятностью, эффективностью, оценкой компонентов характера вмешательства и общей оценкой). Фильтр генов соответствует любому члену многогенной тематики.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene` | строка | необязательный |
| `context` | строка | факультативный; по умолчанию: "both"; enum: &#91;"adult", "pediatric", "both"&#93; |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications` {/* #clingen_variant_classifications */}

ClinGen Evidence Repository (ERepo) - экспертно-панельная классификация патогенности (интерпретация VCEP по критериям ACMG). Предоставить ТАКЖЕ ОДИН из генов (символ HGNC), caid (ClinGen canonical allele id, например). CA114360), или hgvs (например. NM_000277.2:c.1222C>T. Полный поиск (matchLimit=none).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene` | строка | необязательный |
| `caid` | строка | необязательный |
| `hgvs` | строка | необязательный |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes` {/* #civic_search_genes */}

Найдите записи генов CIViC по точному символу Entrez (например, CIViC). "BRAF". Полностью начато, проверено. Используйте возвращенный идентификатор гена CIViC с civic_gene_variants.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `entrez_symbol` | строка | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants` {/* #civic_gene_variants */}

Все варианты одного гена CIViC (по CIViC gene id), полностью пагинированные — завершены даже для генов с сотнями вариантов. Сортирован по варианту id.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_id` | целое число | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant` {/* #civic_get_variant */}

Один вариант CIViC по его варианту CIViC id (поблизости, типы вариантов, связь признаков/генов, координаты для вариантов генов). Возврат найден = ложный, если отсутствует.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `variant_id` | целое число | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants` {/* #civic_search_variants */}

Поиск вариантов CIViC по подстрокам имен (например). "V600"), необязательно применённый к гену CIViC. Полностью расшифровано; Отсортирован по варианту id.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `name` | строка | **обязательно** |
| `gene_id` | целое число | необязательный |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item` {/* #civic_get_evidence_item */}

Один элемент доказательства CIViC по идентификатору: клиническая значимость молекулярного профиля в контексте заболевания / терапии (уровень доказательств A-E, тип, направление, значение, рейтинг, болезнь, терапия, источник). Возврат найден = ложный, если отсутствует.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `evidence_id` | целое число | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence` {/* #civic_search_evidence */}

Поиск элементов доказательств CIViC по любой комбинации фильтров; Полностью сложенный, подсчитанный, отсортированный по восходящему идентификатору доказательств. Фильтры Enum принимают значения CIViC GraphQL enum дословно (evidence_level "A".."E"); evidence_type PREDICTIVE &#124;PROGNOSTIC &#124;DIAGNOSTIC &#124;PREDISPOSING &#124;ONCOGENIC &#124;FUNCTIONAL; evidence_direction ПОСТАНОВКИ &#124;DOES_NOT_SUPPORT СОГЛАШЕННЫЙ СОГЛАШЕННЫЙ ВСЕМ. Обеспечить хотя бы один фильтр — никакие фильтры не проходят по всему корпусу 10k+.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `disease_name` | строка | необязательный |
| `therapy_name` | строка | необязательный |
| `evidence_level` | строка | необязательный |
| `evidence_type` | строка | необязательный |
| `evidence_direction` | строка | необязательный |
| `significance` | строка | необязательный |
| `variant_origin` | строка | необязательный |
| `evidence_rating` | целое число | необязательный |
| `status` | строка | необязательный |
| `molecular_profile_name` | строка | необязательный |
| `molecular_profile_id` | целое число | необязательный |
| `variant_id` | целое число | необязательный |
| `disease_id` | целое число | необязательный |
| `therapy_id` | целое число | необязательный |
| `phenotype_id` | целое число | необязательный |
| `source_id` | целое число | необязательный |
| `assertion_id` | целое число | необязательный |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion` {/* #civic_get_assertion */}

Одно из утверждений CIViC по id: обобщенное заявление, составленное экспертами (уровень AMP/ASCO/CAP, коды ACMG/ClinGen, флаги сопутствующих испытаний FDA), объединяющее доказательства молекулярного профиля в контексте заболевания/терапии. Возврат найден = ложный, если отсутствует.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `assertion_id` | целое число | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions` {/* #civic_search_assertions */}

Поиск утверждений CIViC по любой комбинации фильтров; Полностью сложенный, подсчитанный, отсортированный по восходящему утверждению id. assertion_type PREDICTIVE &#124;PROGNOSTIC &#124;DIAGNOSTIC &#124;PREDISPOSING &#124;ONCOGENIC; assertion_direction ПОСТАНОВКИ &#124;DOES_NOT_SUPPORT amp_level например. TIER_I_LEVEL_A СОГЛАШЕННЫЙ СОГЛАШЕННЫЙ ВСЕМ. Никакие фильтры не проходят по всему корпусу.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `disease_name` | строка | необязательный |
| `therapy_name` | строка | необязательный |
| `assertion_type` | строка | необязательный |
| `assertion_direction` | строка | необязательный |
| `significance` | строка | необязательный |
| `amp_level` | строка | необязательный |
| `status` | строка | необязательный |
| `molecular_profile_name` | строка | необязательный |
| `molecular_profile_id` | целое число | необязательный |
| `variant_id` | целое число | необязательный |
| `variant_name` | строка | необязательный |
| `disease_id` | целое число | необязательный |
| `therapy_id` | целое число | необязательный |
| `phenotype_id` | целое число | необязательный |
| `evidence_id` | целое число | необязательный |
| `summary` | строка | необязательный |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile` {/* #civic_get_molecular_profile */}

Один молекулярный профиль CIViC по идентификатору (вариантная комбинация, к которой прикрепляются доказательства / утверждения), в т.ч. Разобранные имена, счет и варианты компонентов. Возврат найден = ложный, если отсутствует.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mp_id` | целое число | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles` {/* #civic_search_molecular_profiles */}

Поиск молекулярных профилей CIViC по подстрокам имен (например, CIViC). "BRAF V600E". Полностью расшифровано; Сортировку по Ид.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `name` | строка | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases` {/* #civic_search_diseases */}

Поиск записей о болезни CIViC по названию подстроки (например). "melanoma". Возвращает DOID + отображаемые имена; полностью разбитый; Сортировку по Ид.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `name` | строка | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies` {/* #civic_search_therapies */}

Поиск записей о терапии CIViC по названию подстроки (например). "vemurafenib". Возвращает идентификаторы NCIt + имена; полностью разбитый; Сортировку по Ид.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `name` | строка | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql` {/* #open_targets_graphql */}

Запустите произвольный запрос GraphQL против Open Targets Platform API (цели, болезни, лекарства, оценки ассоциации с целевыми заболеваниями, доказательства, тягучесть, безопасность, известные лекарства). Запросы интроспекции работают для обнаружения схемы. Отметим, что известный препарат был переименован в DrugAndClinicalCandidates upstream.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `variables` | объект | необязательный |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs` {/* #open_targets_disease_drugs */}

Известные/исследовательские препараты от болезни (Open Targets Platform) — обертывает Disease.drugAndClinicalCandidates. efo_id является онтологическим идентификатором заболевания (EFO/MONDO/etc., например). "MONDO_0004992".

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `efo_id` | строка | **обязательно** |
| `size` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets` {/* #open_targets_disease_targets */}

Топ ассоциированных целей для болезни, ранжированных по Open Targets общий балл ассоциации — обертывает цели, связанные с болезнью. efo_id является онтологическим идентификатором заболевания (EFO / MONDO / и т. Д.).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `efo_id` | строка | **обязательно** |
| `size` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug` {/* #open_targets_drug */}

Данные о препарате по методу ChEMBL id (Open Targets Platform) — название, тип, максимальная клиническая стадия и механизмы действия (цель + тип действия). chembl_id например. "CHEMBL1201583".

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `chembl_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## Структуры & Взаимодействие {/* #family-9 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `emdb_get_entries` {/* #emdb_get_entries */}

Получите структурированные записи метаданных для записей крио-EM 3D-карт EMDB. Принимает присоединения как 'EMD-1234', 'emd-1234' ' 1234'. Каждая запись несет название, метод определения структуры (singleParticle / helical / tomography / subtomogramAveraging / electronCrystallography), разрешение в Angstrom (нуль для записей без заявленного разрешения, например). сырые томограммы) и метод разрешения, даты осаждения/выпуска, имена образцов и макромолекул/супрамолекулов, установленные идентификаторы моделей PDB (пустый список, когда модель не установлена), первичное цитирование (журнал, год, первый автор, DOI, PMID), размеры карты и размер вокселя и статус. Устаревшие записи сообщают о is_obsolete=true плюс superseded_by присоединения. Неизвестные дополнения возвращаются как &#123;"emdb_id", "error": "not_found"&#125; Никогда не падала молча. только метаданные; Объемы карт никогда не загружаются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `emdb_ids` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries` {/* #emdb_search_entries */}

Поиск EMDB с помощью запроса в стиле Solr; Полный поиск компактных рядов. Примеры запросов: 'title: "apoferritin" И разрешение: &#91;0 TO 1.5&#93;', 'structure_determination_method:"singleParticle"', 'current_status:"REL" И release_date: &#91;2024-01-01T00:00:00Z TO &#42;&#93;'. Args: query (Solr query string); max_rows (row cap, по умолчанию 1000). Возвращает num_found_released (собственное количество выпущенных записей API' по фасеточному маршруту — наземная правда), rows_retrieved, rows_by_status (REL против OBS — маршрут поиска также возвращает устаревшие записи, но они НЕ учитываются как выпущенные), released_complete (правда, каждый выпущенный матч был извлечен); Ложные средства max_rows усечены подметанием или подсчеты не согласны), а записи: компактные строки для входа (emdb_id, заголовок, разрешение, structure_determination_method, current_status, release_date, fitted_pdbs), отсортированные по присоединению EMD.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `max_rows` | целое число | факультативный; По умолчанию: 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section` {/* #emdb_get_entry_section */}

Получите один подробный раздел метаданных для записей EMDB. Разделы: ' Publications' первичное цитирование с полным упорядоченным списком авторов, вспомогательные цитирования, внешние ссылки (PMID/DOI/ISSN/CSD); 'map' — файл, формат, тип данных, размеры, интервалы вокселей, происхождение, порядок осей, ячейка, статистика вокселей, уровни контуров, симметрия; 'smple' — записи на макромолекулу (тип, молекулярная масса, копии, номер ЕС, исходный организм + NCBI рухнул, перекрестные ссылки последовательности) и записи на супрамолекулу; Изображение 'image' — микроскоп, напряжение, источник электронов, детектор, доза, режимы визуализации, диапазон дефокусировки, увеличение, Cs, криоген, условия сетки/буфера/витрификации (одна запись на сеанс микроскопии — записи могут нести несколько). Args: emdb_ids (список присоединения, любой из EMD-1234/emd-1234/1234); раздел (одна из публикаций/карта/образец/образец). Неизвестные присоединения сообщаются с "error": "not_found". Сначала используйте emdb_get_entries, когда вам нужна только запись заголовка.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `emdb_ids` | массив строк | **обязательно** |
| `section` | строка | **обязательно**; enum: &#91;"publications", "map", "sample", "imaging"&#93; |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation` {/* #emdb_get_validation */}

Получите числовые метрики валидации-анализа для записей EMDB. На вход (по маршруту EMDB/анализа): Q-оценка, включение атома, рекомендуемые/предсказуемые/контурные уровни, объемы модели/маски, соотношение модели и карты, поверхностные метрики — где трубопровод валидации вычислил их. available_blocks перечислил каждый возвращенный блок. Разреженные полезные нагрузки (томограммы, без моделей или исторические записи) дают явные нули. Записи без отчета об анализе валидации has_validation_analysis=false — никогда молча не опускались.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `emdb_ids` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes` {/* #complexportal_get_complexes */}

Фетч курировал записи Комплексного портала по присоединению CPX. Каждая запись: сложный переменный ток, рекомендуемые/систематические имена + синонимы, виды и такси, список участников со стехиометрией (мин/максимальные копии), биологическая роль и тип интерактора, доказательство кода ЭКО, аннотации GO и перекрестные ссылки — вручную курируемое описание стабильного макромолекулярного комплекса. Записи возвращаются в порядке ввода; Неизвестные присоединения перечислены в `not_found`, а не молча сбрасываются. Для двоичного взаимодействия *доказательства* (кто связывает кого в каком эксперименте) используют интактные инструменты.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `complex_acs` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant` {/* #complexportal_search_by_participant */}

Поисковый комплексный портал комплексов, содержащих молекулу. `accession` является участником присоединения — UniProt (например). 'P04637'), ChEBI, или РНК-центральный. При participants_only=true (по умолчанию) поиск квалифицируется полем (pxref: &lt;accession>), поэтому возвращаются только комплексы, которые фактически содержат молекулу в качестве курируемого участника; с ложным голым присоединением также сопоставляется как свободный текст (описания, имена), который чрезмерно сообщает, но может уловить упоминания. Все страницы результатов извлекаются, и количество строк проверяется по отношению к общему количеству сообщений об услугах (total_reported == total_retrieved, или вызов громко выходит из строя). Хиты представляют собой компактные записи (complex_ac, имя, вид, интерактивные элементы), отсортированные по сложным присоединениям; Полная информация о complexportal_get_complexes.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |
| `participants_only` | логическое значение | факультативный; Дефолт: правда |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions` {/* #intact_fetch_interactions */}

Восстановление всех бинарных взаимодействий IntAct, соответствующих запросу, фильтруется MI-оценкой. `query` - это присоединение UniProt (например. 'P04637'), символ гена, свободный текст или любой запрос IntAct Solr. Retrieval - это полная пагинированная развертка, проверенная по отношению к общему количеству сообщений сервера (n_records == total_elements, или вызов FAILS LOUDLY - молчаливое усечение невозможно). min_mi_score/max_mi_score фильтр на стороне сервера на IntAct MI (0.45 является общим уровнем средней уверенности); Фильтры interactor_species по названию вида или такси (например). &#91;"Homo sapiens"&#93; или &#91;" 9606"&#93;. Записи тонкие и структурированные: пара интерактивных элементов (IntAct ACs, идентификаторы баз данных, названия молекул, виды / таксиды), тип взаимодействия, метод обнаружения (+MI id), экспериментальные роли, организм-хозяин, оценка MI, PubMed id, первый автор, база данных источников — отсортированная по оценке DESCENDING MI. Списки результатов в большинстве записей max_records_returned (records_truncated = правда, когда полный верифицированный охват был больше); n_records всегда сообщает об истинной сумме. Большие запросы (например). Взаимодействия CFTR ~ 10k занимают некоторое время — по возможности, сужаются с min_mi_score или видами.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `min_mi_score` | число | факультативный; По умолчанию: 0 |
| `max_mi_score` | число | факультативный; По умолчанию: 1 |
| `interactor_species` | массив строк | необязательный |
| `max_records_returned` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor` {/* #intact_get_interactor */}

Решите молекулу в ее интерактивной записи (записях) IntAct. `query` - это UniProt присоединение, символ гена, или IntAct интерактивный AC (например). 'EBI-7090529'. Возвращает ВСЕ совпадающие записи взаимодействия с явным n_матчей — присоединение UniProt может разрешать канонические белковые и изоформные взаимодействия, и этот инструмент никогда молча не выбирает один. Каждая запись: interactor_ac, preferred_identifier, имя, вид, такси, interactor_type и interaction_count, замеченные IntAct (полезны для калибровки intact_fetch_interactions).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details` {/* #intact_get_interaction_details */}

Полная подробная информация для взаимодействия ONE IntAct (например, AC). 'EBI-15635490'. Возвращает тип взаимодействия, организм-хозяин, метод обнаружения, публикацию, перекрестные ссылки, аннотации, параметры кинетики / аффинности и уверенности, а также записи на участника (идентификатор, вид, биологическая и экспериментальная роль, методы обнаружения участников), если include_participants не является ложным. Получите интерактивные переменные тока из записей intact_fetch_interactions (поле interaction_ac). Неизвестные AC возвращают &#123; interaction_ac, ошибка: 'not_found' &#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `interaction_ac` | строка | **обязательно** |
| `include_participants` | логическое значение | факультативный; Дефолт: правда |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network` {/* #intact_build_network */}

Создайте сеть взаимодействия глубины-1 IntAct вокруг семенных белков. `seed_accessions` является частью UniProt. Шаг 1: полная, проверенная по счету MI-оценка-фильтрированная сетка взаимодействия на семя. Шаг 2: партнеры каждого семенного края плюс семена образуют набор узлов. Шаг 3: края партнера-партнера можно обнаружить только путем запроса самих партнеров, поэтому до партнеров max_interactors_expanded запрашиваются (наиболее связанные сначала, связи по идентификатору) и края с обоими конечными точками внутри набора узлов. Блок расширения сообщает, какие именно партнеры были / не были расширены (expansion.complete=false означает, что больше партнеров-партнеров может существовать). Выход: узлы, края (с баллом MI, методом обнаружения, PubMed id), статистика по семени. Держите семена небольшими, а min_mi_score > = 0.45 — каждое расширение представляет собой полный разветвленный разверток.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `seed_accessions` | массив строк | **обязательно** |
| `min_mi_score` | число | факультативный; По умолчанию: 0.45 |
| `max_interactors_expanded` | целое число | факультативный; По умолчанию: 25 |
| `interactor_species` | массив строк | необязательный |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures` {/* #pdb_search_structures */}

Поиск записей RCSB PDB по фильтрам атрибутов; стр. стр., стр. + стр. все фильтры и вместе; Требуется хотя бы один. `text` - полнотекстовый запрос релевантности ('p53 ДНК-связывающий домен '); `organism` - это точное название линии родословных организмов ('Homo sapiens'). — матчи на любом уровне родословной, поэтому 'Eukaryota' тоже работает; `taxonomy_id` - такси NCBI (9606); `uniprot_accession` находит записи, полимерные сущности которых отображаются на этом UniProt ('P04637') -> каждая структура p53; `experimental_method` - это словарь PDB ('X-RAY DIFFRACTION', 'ELECTRON MICROSCOPY', 'SOLUTION NMR', ...) — нечувствительная к случаю, неизвестная ошибка значений с полным списком; `max_resolution_angstrom` сохраняет записи в этом разрешении или ниже; `ligand_comp_id` требует связанного неполимерного компонента по chem-comp id ('ZN', 'ATP', 'HEM'). include_computed_models=true добавляет вычисленные модели структуры (например, AlphaFold) только для экспериментальных результатов по умолчанию. Возвращает total_count (собственная сумма совпадений API' — грунтовая правда), n_retrieved, truncated (настоящий iff total_count >) n_retrieved; max_rows, 1..1000, Caps Retrieval и записи &#91;&#123;pdb_id, score&#125;&#93; в порядке релевантности. Идентификаторы — цепь к pdb_get_structures для метаданных.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `text` | строка | необязательный |
| `organism` | строка | необязательный |
| `taxonomy_id` | целое число | необязательный |
| `uniprot_accession` | строка | необязательный |
| `experimental_method` | строка | необязательный |
| `max_resolution_angstrom` | число | необязательный |
| `ligand_comp_id` | строка | необязательный |
| `include_computed_models` | логическое значение | факультативный; Дефолт: ложный |
| `max_rows` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures` {/* #pdb_get_structures */}

Получите резюме начального уровня для записей PDB (пакет, max 25 ids). Принимает 4-символ PDB-ids в любом случае (' 1tup') == ' 1TUP'; дубликаты раздуваются. Каждая запись: название, экспериментальные методы, разрешение в Angstrom (нуль для методов без одного, например). ЯМР), методология определения (экспериментальная против вычислительной), даты и статус депонирования/выпуска/ревизии, молекулярная масса (кДа), количество сборки и количество сущностей (белок/ДНК/РНК полимер + неполимер), связанные лигандные хем-компонентные идентификаторы, списки сущностей полимера/неполимера (входные данные для pdb_get_entities/pdb_get_ligands) и первичное цитирование (титул, журнал, год, авторы, PubMed id, DOI). Неизвестные ids возвращаются как &#123;"pdb_id", "error": "not_found"&#125; Никогда не падала молча. только метаданные; Файлы координат никогда не загружаются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pdb_ids` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities` {/* #pdb_get_entities */}

Детали полимерной сущности для одной записи PDB, в т.ч. Картографирование UniProt. С entity_ids=null каждый полимерный объект входа извлекается, ограниченный 25 с усеченным = истинное и n_polymer_entities, сообщающим истинное количество входа ' (большие сборки, такие как рибосомы, несут 50 + - получите полный список идентификаторов от pdb_get_structures') polymer_entity_ids и страница с явными подмножествами, такими как " 26", " 27"; с явным подмножеством entity_ids сумма входа не вычитается, поэтому n_polymer_entities является нулевым; Явный список entity_ids больше, чем ошибки 25. Каждая запись: описание, тип полимера (белок / ДНК / РНК), длина последовательности, количество мутаций, депонированные копии, идентификаторы цепи (асим + автор), организмы-источники с рулевыми устройствами, присоединения UniProt с покрытием последовательности каждой сущности (SIFTS) и области, выровненные UniProt (координаты entity-seq против reference-seq). Неизвестные идентификаторы объектов перечислены в not_found; Неизвестные ошибки входа. include_sequences=true добавляет каноническую однобуквенную последовательность на единицу; Если комбинированные последовательности превышают max_bytes (по умолчанию 400000), они опускаются, и sequences_omitted объясняет, почему — метаданные всегда выживают.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pdb_id` | строка | **обязательно** |
| `entity_ids` | массив строк | необязательный |
| `include_sequences` | логическое значение | факультативный; Дефолт: ложный |
| `max_bytes` | целое число | факультативный; По умолчанию: 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands` {/* #pdb_get_ligands */}

Связанные лиганды (неполимерные компоненты) одного входа PDB с химией. Ходит по неполимерным объектам входа ' и разрешает каждый химический компонент: на лиганд — идентификатор объекта, хем-комп ('ZN', 'ATP'), описание, количество депонированных копий, идентификаторы цепочки авторов и блок chem_comp (имя, формула, вес формулы, формальный заряд, тип компонента, InChIKey, стерео SMILES). Воды не являются неполимерными объектами в модели данных PDB и никогда не появляются. Въезды без лигандов возвращают лиганды: &#91;&#93;. n_nonpolymer_entities - истинное число входа 's; truncated=true, когда он превышает max_ligands (зажимается до 1..25, что ограничивает бюджет запроса) — никогда молча не падает. Субъекты/компоненты данных, которые API больше не обслуживает, сообщаются в соответствии с "error": "not_found" (частичные результаты, а не прерванный звонок). Неизвестные ошибки входа.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pdb_id` | строка | **обязательно** |
| `max_ligands` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction` {/* #alphafold_get_prediction */}

AlphaFold DB предсказывает структуру метаданных для одного присоединения UniProt. Возвращает записи has_model, n_models и per-model. Одно присоединение может нести несколько моделей (канонические + изоформы, такие как 'P04637-9', и поставщики сообщества за пределами мономерного конвейера Google DeepMind — provider_id / tool_used идентифицируют их). Каждая модель: идентификатор входа, аннотация UniProt (id, description, gene, organism, taxid, review flags), координаты и длина последовательности, глобальный pLDDT (global_plddt, 0-100) плюс доля остатков на доверительный бин pLDDT (very_low &lt; 50, низкий 50-70, уверенный 70-90, very_high > 90), информация о версии модели и дата создания, а также URL-адреса загрузки (координаты PAE JSON + изображение, pLDDT JSON на остаточное состояние, MSA, AlphaMissense CSV, где это доступно) — только URL-адреса, полезная нагрузка никогда не загружается; Возьмите их сами, если это необходимо. Приступы без предсказания возвращают has_model=ложь (не ошибка); Неправильные идентификаторы возвращают явное поле `error`. include_sequence=true добавляет модельную последовательность (белок одной буквы).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `uniprot_accession` | строка | **обязательно** |
| `include_sequence` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage` {/* #alphafold_check_coverage */}

Проверка покрытия пакета AlphaFold DB (максимальное значение 40, уникальные присоединения UniProt). Записи и дубликаты снимаются до того, как применяется серийный колпачок, и раскрываются: n_requested == n_unique + n_blank_skipped + n_duplicate_skipped всегда примиряется. Одна компактная запись на уникальное присоединение, в порядке ввода: has_model, n_models и первичная (первая в списке) модель 's model_entity_id, latest_version, global_plddt и sequence_length. Приложения без отчета о прогнозе has_model = ложные; Неполноценные несут явное поле `error` — никогда не падают. Используйте для сортировки, какие белки набора имеют пригодные для использования прогнозируемые структуры, прежде чем тянуть полные записи с alphafold_get_prediction.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `uniprot_accessions` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## ЧЕМБЛ {/* #family-10 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `compound_search` {/* #compound_search */}

Поиск химических соединений ChEMBL по названию (по умолчанию), ChEMBL id или молекулярной структуре. По названию: случай-нечувствительный синоним подстрочный матч (возвращается к матчу с предпочтительным именем). chembl_id: прямой поиск записей. По улыбкам: поиск сходства Танимото, когда similarity_threshold установлен, иначе поиск подструктуры (прогулки по структуре ограничены и раскрывают walk_truncated / upstream_total). Факультативные фильтры max_phase по клинической стадии. Передайте хотя бы одно имя, chembl_id или улыбку. Вместо этого используйте drug_search при поиске по терапевтическим показаниям.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `name` | строка | необязательный |
| `chembl_id` | строка | необязательный |
| `smiles` | строка | необязательный |
| `similarity_threshold` | целое число | факультативный; Минимум: 70; Максимум: 100 |
| `max_phase` | целое число | факультативный; enum: &#91;0, 1, 2, 3, 4&#93; |
| `limit` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search` {/* #drug_search */}

Поиск одобренных препаратов и клинических кандидатов по терапевтическому показанию (термин EFO, частичное совпадение). Присоединяйтесь к строкам drug_indication к отдельным родительским молекулам, а затем к записям молекул и предупреждениям об изъятии / черном ящике. only_approved ограничивается фазой 4. Опциональные пост-фильтры molecule_chembl_id, drug_name (предпочтительная подстрочная строка) и max_phase (>=) сужают объединенный набор. Используйте compound_search для поиска имен/ид/структур.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `indication` | строка | **обязательно** |
| `drug_name` | строка | необязательный |
| `molecule_chembl_id` | строка | необязательный |
| `max_phase` | целое число | факультативный; enum: &#91;0, 1, 2, 3, 4&#93; |
| `only_approved` | логическое значение | факультативный; Дефолт: ложный |
| `limit` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet` {/* #get_admet */}

Retrieve ChEMBL вычислил молекулярные свойства для оценки лекарственного сходства / ADMET одной молекулы (ALogP, молекулярная масса, PSA, HBA / HBD, вращающиеся связи, ароматические кольца, тяжелые атомы, нарушения Правила-5, Перевал Правила-3, QED, молекулярная формула). Они вычисляются по структуре, а не по экспериментальным измерениям.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `molecule_chembl_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity` {/* #get_bioactivity */}

Измерения биоактивности Retrieve ChEMBL (IC50, Ki, Kd, EC50, ...) для взаимодействий соединения-мишени. Фильтр molecule_chembl_id и/или target_chembl_id, activity_type (standard_type), пол pChEMBL (min_pchembl), диапазон standard_value (min_value/max_value) и блок (standard_units). Возвращает одну страницу, заказанную activity_id, с наиболее мощным резюме.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `molecule_chembl_id` | строка | необязательный |
| `target_chembl_id` | строка | необязательный |
| `activity_type` | строка | факультативный; enum: &#91;"IC50", "EC50", "Ki", "Kd", "AC50", "GI50", "ED50", "Potency"&#93; |
| `min_pchembl` | число | факультативный; Минимум: 0; Максимум: 14 |
| `min_value` | число | необязательный |
| `max_value` | число | необязательный |
| `unit` | строка | факультативный; enum: &#91;"nM", "uM", "mM", "pM", "M"&#93; |
| `limit` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism` {/* #get_mechanism */}

Восстановление записей о механизме действия ChEMBL для одобренных лекарств и клинических кандидатов. Фильтр molecule_chembl_id, target_chembl_id и/или action_type. Когда молекула id ничего не дает, повторные попытки против родительской молекулы так солевой формы ids разрешаются. Возвращает одну страницу, заказанную mec_id, с резюме типа действия.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `molecule_chembl_id` | строка | необязательный |
| `target_chembl_id` | строка | необязательный |
| `action_type` | строка | факультативный; enum: &#91;"INHIBITOR", "AGONIST", "ANTAGONIST", "BLOCKER", "MODULATOR", "OPENER", "ACTIVATOR", "POSITIVE ALLOSTERIC MODULATOR", "NEGATIVE ALLOSTERIC MODULATOR", "PARTIAL AGONIST", "INVERSE AGONIST"&#93; |
| `limit` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search` {/* #target_search */}

Поиск биологических мишеней ChEMBL (белки, комплексы, семейства, организмы). Фильтр по target_chembl_id, gene_symbol (точный компонент-синоним соответствия), target_name (предпочтительно-название подстроки), организм (подстроки) и/или target_type. Каждый результат несет свои компоненты с присоединениями UniProt, gene_symbol и ограниченными перекрестными списками ссылок.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `target_name` | строка | необязательный |
| `gene_symbol` | строка | необязательный |
| `target_chembl_id` | строка | необязательный |
| `organism` | строка | необязательный |
| `target_type` | строка | факультативный; enum: &#91;"SINGLE PROTEIN", "PROTEIN COMPLEX", "PROTEIN FAMILY", "ORGANISM", "TISSUE", "CELL-LINE", "NUCLEIC-ACID", "SUBCELLULAR"&#93; |
| `limit` | целое число | факультативный; по умолчанию: 20; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## биологический {/* #family-11 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `get_categories` {/* #get_categories */}

Перечислите все категории субъектов 27 bioRxiv и их API-совместимые слизни (например). "cancer biology" -> "cancer_biology"). Используйте перед search_preprints, чтобы найти действительные значения категорий.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints` {/* #search_preprints */}

Поиск препринтов bioRxiv/medRxiv по дате и (необязательно) категории. Используйте только один метод поиска: date_from + date_to, recent_days (последние N дней) или recent_count (последние N в окне 90 дня); В последние дни 60. Нет ключевого слова / текстового поиска. Курсорные пагинаты. Возвращает DOI, название, авторов, дату, категорию, версию и абстрактный предварительный просмотр 200-char.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `server` | строка | факультативный; по умолчанию: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `category` | строка | факультативный; Перечислим: &#91;"Поведение и познание животных", "биохимия", "биоинженерия", "биоинформатика", "биофизика", "Раковая биология", "клеточная биология", "клинические испытания", "биология развития", "экология", "эпидемиология", "эволюционная биология", "генетика", "геномика", "иммунология", "микробиология", "молекулярная биология", "нейробиология", "палеонтология", "патология", "фармакология и токсикология", "физиология", "Биология растений", "научная коммуникация и образование", "Синтетическая биология", "системная биология", "зоология"&#93; |
| `date_from` | строка | необязательный |
| `date_to` | строка | необязательный |
| `recent_days` | целое число | факультативный; Минимум: 1 |
| `recent_count` | целое число | факультативный; Минимум: 1 |
| `limit` | целое число | факультативный; по умолчанию: 10; Минимум: 1; Максимум: 100 |
| `cursor` | целое число | факультативный; по умолчанию: 0; Минимум: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint` {/* #get_preprint */}

Получите полные метаданные для одного препринта DOI (" 10.1101/...") Полный URL [https://doi.org/](https://doi.org/). Использует последнюю версию. Возвращает название, авторов, соответствующего автора + учреждение, полный реферат, категорию, лицензию, версию, JATS XML, финансирование, опубликованный журнал DOI (если он связан), PDF и веб-адреса, а также количество версий. Препринты не рецензируются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `doi` | строка | **обязательно** |
| `server` | строка | факультативный; по умолчанию: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints` {/* #search_published_preprints */}

Найдите препринты, которые были позже опубликованы в рецензируемых журналах (препринт - >) Ссылки на журнальные статьи. Те же методы поиска ONE-OF, что и search_preprints (date_from + date_to / recent_days / recent_count). include_details=false возвращает компактное резюме. Фильтры издателя по префиксу DOI журнала (например). "10.1038" Для природы) по маршруту bioRxiv-only/publisher.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `server` | строка | факультативный; по умолчанию: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `publisher` | строка | необязательный |
| `include_details` | логическое значение | факультативный; Дефолт: правда |
| `date_from` | строка | необязательный |
| `date_to` | строка | необязательный |
| `recent_days` | целое число | факультативный; Минимум: 1 |
| `recent_count` | целое число | факультативный; Минимум: 1 |
| `limit` | целое число | факультативный; по умолчанию: 10; Минимум: 1; Максимум: 100 |
| `cursor` | целое число | факультативный; по умолчанию: 0; Минимум: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder` {/* #search_by_funder */}

Найдите препринты, подтверждающие спонсора, идентифицированного ROR id (9-char, например). " 021nxhr62" для NIH; Также принимается полный URL [https://ror.org/](https://ror.org/). Требуется явный date_from + date_to; Финансирование метаданных начинается с 2025-04-10. Факультативный фильтр категорий. Курсорные пагинаты. Такая же компактная форма результата, как и search_preprints.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `funder_ror_id` | строка | **обязательно** |
| `date_from` | строка | **обязательно** |
| `date_to` | строка | **обязательно** |
| `server` | строка | факультативный; по умолчанию: "biorxiv"; enum: &#91;"biorxiv", "medrxiv"&#93; |
| `category` | строка | факультативный; Перечислим: &#91;"Поведение и познание животных", "биохимия", "биоинженерия", "биоинформатика", "биофизика", "Раковая биология", "клеточная биология", "клинические испытания", "биология развития", "экология", "эпидемиология", "эволюционная биология", "генетика", "геномика", "иммунология", "микробиология", "молекулярная биология", "нейробиология", "палеонтология", "патология", "фармакология и токсикология", "физиология", "Биология растений", "научная коммуникация и образование", "Синтетическая биология", "системная биология", "зоология"&#93; |
| `limit` | целое число | факультативный; по умолчанию: 10; Минимум: 1; Максимум: 100 |
| `cursor` | целое число | факультативный; по умолчанию: 0; Минимум: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics` {/* #get_content_statistics */}

BioRxiv представляет статистические данные по всей истории — новые и пересмотренные подсчеты документов за период с текущими совокупными показателями. интервал "monthly" (по умолчанию) или "yearly".

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `interval` | строка | факультативный; по умолчанию: "monthly"; (перенаправлено с «"monthly", "yearly"») |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics` {/* #get_usage_statistics */}

Статистика использования / взаимодействия bioRxiv по всей истории — абстрактные представления, полнотекстовые представления и загрузки PDF за период с использованием кумулятивных итогов. интервал "monthly" (по умолчанию) или "yearly".

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `interval` | строка | факультативный; по умолчанию: "monthly"; (перенаправлено с «"monthly", "yearly"») |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## Регулирование наркотиков {/* #family-12 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `search_drug_applications` {/* #search_drug_applications */}

Поиск приложений Drugs@FDA (NDA/ANDA/BLA) по любой комбинации фильтров с точной фразой (бренд, дженерик, active_ingredient, спонсор, marketing_status, dosage_form, маршрут, pharm_class). дженерик и pharm_class запрашивают гармонизированный блок openfda (отсутствует на старых приложениях, поэтому молча пропускают там). Широкий поиск возвращает первый max_records с истинной суммой и усеченной = истинной. на страницу, выходящую за пределы записей ~26,000, сужается с submission_date_from/to.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `brand` | строка | необязательный |
| `generic` | строка | необязательный |
| `active_ingredient` | строка | необязательный |
| `sponsor` | строка | необязательный |
| `marketing_status` | строка | факультативный; enum: &#91;"Prescription", "Over-the-counter", "Discontinued", "None (Tentative Approval)"&#93; |
| `dosage_form` | строка | необязательный |
| `route` | строка | необязательный |
| `pharm_class` | строка | необязательный |
| `pharm_class_type` | строка | факультативный; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `search_type` | строка | факультативный; по умолчанию: " и "; enum: &#91;"and", "or"&#93; |
| `submission_date_from` | строка | необязательный |
| `submission_date_to` | строка | необязательный |
| `raw_search` | строка | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application` {/* #get_drug_application */}

Принесите одно заявление по номеру Drugs@FDA (например). "NDA020702", "ANDA076543", "BLA125514". Возвращает полную запись — спонсор, продукты (бренд, активные ингредиенты + сильные стороны, лекарственная форма, маршрут, маркетинговый статус, код TE), полную историю представлений и гармонизированные поля openfda при наличии.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `application_number` | строка | **обязательно** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications` {/* #count_drug_applications */}

Aggregate Drugs@FDA bucket рассчитывается по одному полю, необязательно суженному теми же фильтрами, что и search_drug_applications. count_field принимает дружественные имена (sponsor_name, application_number, dosage_form, маршрут, marketing_status, te_code, pharm_class_epc/moa/cs/pe) или необработанный путь поля openFDA (приложите .exact к анализируемым полям).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `count_field` | строка | **обязательно** |
| `brand` | строка | необязательный |
| `generic` | строка | необязательный |
| `active_ingredient` | строка | необязательный |
| `sponsor` | строка | необязательный |
| `marketing_status` | строка | необязательный |
| `dosage_form` | строка | необязательный |
| `route` | строка | необязательный |
| `pharm_class` | строка | необязательный |
| `pharm_class_type` | строка | факультативный; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `search_type` | строка | факультативный; по умолчанию: " и "; enum: &#91;"and", "or"&#93; |
| `submission_date_from` | строка | необязательный |
| `submission_date_to` | строка | необязательный |
| `raw_search` | строка | необязательный |
| `max_buckets` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics` {/* #get_drug_statistics */}

Статистика на уровне корпуса Drugs@FDA в одном звонке — общее количество заявок, распределение маркетингового статуса, лучшие лекарственные формы и маршруты (с различными подсчетами) и лучшие спонсоры по количеству заявок.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes` {/* #list_pharmacologic_classes */}

Перечислите фармакологические классы с их количеством применений, подсчитанным по гармонизированной openfda.pharm_class_&lt;type> Блок. Подсчеты отражают только приложения, несущие этот блок.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `class_type` | строка | факультативный; по умолчанию: "epc"; enum: &#91;"epc", "moa", "cs", "pe"&#93; |
| `max_buckets` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents` {/* #get_generic_equivalents */}

Найдите общие эквиваленты фирменного препарата: отведите бренд к его эталонному приложению (приложениям), выберите точный набор(ы) имен активных ингредиентов, а затем верните каждое приложение Drugs@FDA с продуктом, чей набор активных ингредиентов соответствует (включая коды TE и статус маркетинга).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `brand` | строка | **обязательно** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels` {/* #search_drug_labels */}

Извлеките этикетки лекарственных препаратов FDA (SPL) по ингредиенту / названию / маршруту с помощью целенаправленной экстракции. Фильтры (active_ingredient, generic_name, brand_name, маршрут, product_type) попадают в блок ярлыков openfda; Установите точный запрос на неанализированные варианты. Перейдите разделы, чтобы извлечь необработанные разделы с открытой меткой FDA вместо структурированной записи по умолчанию. raw_search является взаимоисключающим с картографическими фильтрами.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `active_ingredient` | строка | необязательный |
| `generic_name` | строка | необязательный |
| `brand_name` | строка | необязательный |
| `route` | строка | необязательный |
| `product_type` | строка | факультативный; &#91;"HUMAN PRESCRIPTION DRUG", "HUMAN OTC DRUG"&#93; |
| `exact` | логическое значение | факультативный; Дефолт: ложный |
| `raw_search` | строка | необязательный |
| `sections` | массив строк | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## Генетика человека {/* #family-13 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `gwas_associations_for_variant` {/* #gwas_associations_for_variant */}

Ассоциации каталогов GWAS сообщили об одном варианте (rsID), наиболее важном из них. Args: rs_id (dbSNP rsID, например). rs7412 APOE или rs699 AGT; должен быть текущий rsID каталога 's — слитые/пенсионные идентификаторы могут возвращать нулевые строки, а не ошибку; max_records (по умолчанию 500); Варианты trait-hub могут нести ассоциации 1000+; Ряды сортируются сервером по восходящему p-значению, поэтому конечным результатом является префикс верхнего сигнала. Возвращает &#123;rs_id, api_total, возвращает, усечен, ассоциации &#125;. api_total - собственный каталог 's; Усеченные флаги в кепке. Каждый ряд ассоциаций: &#123;association_id, p_value, pvalue_mantissa, pvalue_exponent, pvalue_description, or_value, бета, ci_lower, ci_upper, диапазон, risk_frequency, snp_effect_alleles, rs_ids, местоположения, mapped_genes, efo_traits: &#91;&#123;efo_id, efo_trait&#125;&#93;, bg_efo_traits, reported_trait, multi_snp_haplotype, snp_interaction, study_accession_id, pubmed_id, first_author&#125;. or_value и бета являются взаимоисключающими на строку (двоичный против количественного); p_значение 0.0 означает p &lt; ~1e-308 (использовать мантиссу/экспонент).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `rs_id` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene` {/* #gwas_associations_for_gene */}

GWAS Каталог ассоциаций, варианты которых МАППИДЕН к гену (catalog's Ensembl трубопроводное отображение, не автор-сообщается), наиболее значительным первым. Args: gene_symbol (символ HGNC, точное совпадение, например). PCSK9, APOE; чувствительный к регистру вверх по течению — пропуск канонического верхнего регистра; межгенные варианты отображают фланкирующие гены, поэтому ряды могут находиться вне тела гена; max_records (по умолчанию 500); Серверные строки, сортируемые по восходящему p-значению. Возврат &#123;gene_symbol, api_total, возврат, усечение, ассоциации &#125; с той же формой строки, что и gwas_associations_for_variant. Несуществующий символ возвращает api_total=0, а не ошибку.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait` {/* #gwas_associations_for_trait */}

Связи каталога GWAS аннотированы к одной черте EFO, наиболее значимой первой. Args: efo_id (онтологический термин «короткая форма», используемый в каталоге, например). MONDO_0005010, EFO_0004340, HP_0003124; каталог перенес множество исторических идентификаторов EFO в MONDO/HP — сначала удалите текущие идентификаторы с помощью gwas_search_traits; Пройти точно один из efo_id/efo_trait; efo_trait (точная альтернатива LABEL); max_records (по умолчанию 500); Повышается p-значение. Возврат &#123;efo_id &#124; efo_trait, api_total, возврат, усечение, ассоциации &#125; с той же формой строки, что и gwas_associations_for_variant. Неизвестный идентификатор / ярлык возвращает api_total = 0, а не ошибку.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `efo_id` | строка | необязательный |
| `efo_trait` | строка | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits` {/* #gwas_search_traits */}

Поиск GWAS Каталог признаков EFO аннотации по ярлыку подстрочкой — точка входа для разрешения болезни/фенотипа имя онтологии идентификаторы, которые gwas_associations_for_trait / gwas_search_studies взять. Арг: запрос (бесчувствительная к регистру подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная подстрочная под "coronar" Соответствует ишемической болезни сердца MONDO_0005010 и др.; Каталог смешивает идентификаторы EFO, MONDO, HP и OBA — don't предполагает префикс EFO_; max_records (по умолчанию 500). Возвращает &#123;query, api_total, возвращается, усечен, efo_traits&#125;; каждый ряд &#123;efo_id, efo_trait, uri&#125; Отсортирован по этикетке. Подсчет проверенных по каталогу 's собственных сумм, когда не ограничен.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies` {/* #gwas_search_studies */}

Поиск по GWAS Каталог исследований по признакам аннотации или публикации. Args: efo_id (онтологическая короткая форма, например). MONDO_0005010, разрешение через gwas_search_traits; фильтры объединяются и — обычно проходят один; efo_trait (точная альтернатива этикетке); pubmed_id (PubMed ID публикации Study's, например). 38714703); max_records (по умолчанию 500). Возвращает &#123;фильтры, api_total, возвращается, усечен, изучает &#125;; каждый ряд исследования &#123;accession_id, disease_trait, efo_traits, bg_efo_traits, pubmed_id, initial_sample_size, replication_sample_size, discovery_ancestry, replication_ancestry, genotyping_technologies, платформы, когорта, full_summary_stats_available, вмененный, gxe, gxg&#125;. Подсчет верифицирован против общего количества каталогов, когда он не ограничен. Требуется по крайней мере один фильтр (нефильтрованный каталог - 90k исследований).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `efo_id` | строка | необязательный |
| `efo_trait` | строка | необязательный |
| `pubmed_id` | строка | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study` {/* #gwas_get_study */}

Проведите одно исследование Каталога GWAS по его присоединению к GCST. Args: accession_id (присоединение к исследованию, например). GCST90841394; В каждой строке ассоциаций указаны study_accession_id и результаты поиска в исследовании. Возвращает &#123;found, accession_id, study&#125; где исследование имеет ту же форму строки, что и gwas_search_studies (нуль, когда присоединение неизвестно).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant` {/* #gwas_get_variant */}

Получите одну запись варианта GWAS (положение, отображенные гены, следствие) с помощью rsID — легче, чем вытягивание его ассоциаций. Args: rs_id (dbSNP rsID, например). rs7412). Возвращает &#123;found, rs_id, вариант &#125;; вариант - &#123;rs_id, слитый, functional_class, most_severe_consequence, аллели (например. "C/T (вперед)"), mapped_genes, местоположения: &#91;&#123;chromosome, позиция, регион&#125;, last_update_date&#125;&#93; — позиции GRCh38 — или нулевые, когда rsID отсутствует в каталоге. merged=1 означает, что rsID был объединен в другой рекорд выше по течению.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `rs_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets` {/* #eqtl_list_datasets */}

Перечислите наборы данных каталога eQTL (один набор данных = один метод количественного определения типа ткани / клетки x). Args: study_label (точное название исследования, например). GTEx, Alasoo_2018, BLUEPRINT; tissue_label (точная маркировка типа ткани/клетки, например). печень, макрофаг, LCL — строчная в каталоге; quant_method (ge = экспрессия генов, exon, tx, txrev, microarray, leafcutter, aptamer = белок плазмы); для обычных генно-уровня eQTL используют ge; max_records (по умолчанию 1000); Полный нефильтрованный каталог - наборы данных ~760. Возвращает &#123;фильтры, возвращается, усечен, наборы данных &#125; отсортирован по dataset_id; каждый &#123;dataset_id (QTD...), study_id (QTS...), study_label, sample_group, tissue_id, tissue_label, condition_label, quant_method, sample_size&#125;. API не публикует общее количество; truncated=false — доказательство того, что список завершен.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `study_label` | строка | необязательный |
| `tissue_label` | строка | необязательный |
| `quant_method` | строка | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations` {/* #eqtl_associations */}

Молекулярно-QTL ассоциативные ряды из одного набора данных каталога eQTL, фильтруемого геном, вариантом или областью. Args: dataset_id (присоединение к QTD от eqtl_list_datasets, например). QTD000266); gene_id (unversioned Ensembl gene ID, например). ENSG00000130203 APOE; требуется, по меньшей мере, один из gene_id/rsid/variant/pos; rsid (dbSNP rsID); вариант (eQTL Catalogue вариант струны chr19_44908822_C_T, chr-префиксированный подчеркивающий GRCh38); pos (геномная оконная хромосома:старт-энд GRCh38 без приставки chr, например). 19:44900000-44920000); nlog10p_min (значение этажа: только строки с -log10(p) >= это, нанесенные вверх по течению); max_records (по умолчанию 1000 = одна страница). Возвращает &#123;dataset_id, фильтры, возвращает, усечен, ассоциации &#125;; каждая строка &#123;molecular_trait_id, gene_id, вариант, rsid, хромосома, положение, ref, alt, тип, бета, se, pvalue, nlog10p, maf, ac, an, r2, median_tpm&#125;. Ряды покрывают ТОЛЬКО цис-окно тестируемого набора данных (±1 Мб каждого гена); Пустое означает " не протестированный / не представленный ". Общее количество не публикуется: усеченное = ложное доказывает истощение, усеченное = истинное означает, что колпачок был поражен.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `dataset_id` | строка | **обязательно** |
| `gene_id` | строка | необязательный |
| `rsid` | строка | необязательный |
| `variant` | строка | необязательный |
| `pos` | строка | необязательный |
| `nlog10p_min` | число | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances` {/* #phewas_instances */}

Перечислите общедоступные порталы PheWeb PheWAS, которые этот сервер может запросить, с регистром построения генома и возможностей. Возвращает &#123;instances:&#123;key:&#123;label, base_url, genome_build, возможности, отмечает &#125;&#125;&#125;. Возможности называют конечные точки, которые каждый экземпляр раскрывает: вариант (phewas_variant), ген (phewas_finngen_gene), фенотипы (phewas_list_phenotypes), автозаполнение (phewas_search_phenotypes). Обратите внимание на разделение сборки: идентификаторы вариантов FinnGen R12 являются GRCh38; BioBank Japan (pheweb.jp) — GRCh37/hg19 — координаты подъема перед перекрестным запросом.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant` {/* #phewas_variant */}

PheWAS для одного варианта: его статистика ассоциаций против каждого фенотипа на портале биобанка PheWeb. Args: example (finngen FinnGen R12 GRCh38, или bbj BioBank Japan GRCh37); Варианты кордов должны быть на сборке экземпляра 's; вариант (chrom-pos-ref-alt, :/_ сепараторы и префикс chr переносимые, например. 19-44908822-C-T APOE rs7412 GRCh38/finngen или 1-55505647-G-T PCSK9 rs11591147 GRCh37/bbj; max_phenos (по умолчанию 200); FinnGen возвращает строки ~2470; отсортирован по p-значению, восходящему до заглавия. Возвращает &#123;instance, genome_build, вариант, variant_meta, суммарно, возвращается, усечен, фенотипы &#125;; variant_meta &#123;chrom, pos, ref, alt, rsids, nearest_genes, gnomad (только FinnGen) &#125;. Каждый ряд фенотипа &#123;phenocode, феностринг, категория, pval, mlogp, beta, sebeta, af &#124;maf, maf_case, maf_control, n_cases, n_controls, n_amples&#125; (неопубликованные поля не имеют силы); BBJ-ряды имеют af, FinnGen-ряды имеют maf-триплеты + mlogp. Неизвестные варианты вызывают необнаруженную ошибку.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `instance` | строка | **обязательно**; enum: &#91;"finngen", "bbj"&#93; |
| `variant` | строка | **обязательно** |
| `max_phenos` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene` {/* #phewas_finngen_gene */}

PheWAS генного уровня от FinnGen R12: для каждой конечной точки заболевания наиболее значимым является наиболее ассоциированный вариант в генной области. Args: gene_symbol (символ HGNC, например). PCSK9, APOE; неизвестные символы вызывают необнаруженную ошибку; max_phenos (по умолчанию 200); Финнген имеет ~конечные точки 2470, по одному ряду; отсортирован по p-значению, восходящему до заглавия. Возвращает &#123;instance: "finngen", genome_build: "GRCh38", gene_symbol, всего, возвращен, усечен, фенотипы &#125;; Каждая строка представляет собой форму строки phewas_variant плюс вариант: &#123;chrom, pos, ref, alt, varid, rsids&#125; — верхний вариант для этой конечной точки в области гена ' (область! = тело гена); Границы генов PheWeb pads. Большинство строк - нулевые результаты (pval)~1) — по-прежнему сообщается о варианте BEST для конечных точек; Фильтруйте себя для значительных попаданий.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | **обязательно** |
| `max_phenos` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes` {/* #phewas_list_phenotypes */}

Полный каталог фенотипа (конечной точки заболевания) экземпляра PheWeb с количеством случаев / контрольных показателей. Args: example (в настоящее время только Finngen раскрывает эту конечную точку); BBJ не использует phewas_search_phenotypes; max_records по умолчанию 3000 > FinnGen's ~2470 конечные точки, поэтому по умолчанию возвращает полный каталог. Возвращает &#123;instance, Total, Returned, truncated, фенотипы &#125; отсортирован по фенокоду; каждый ряд &#123;phenocode (например, "T2D"), феностринг, категория, num_cases, num_controls, num_gw_significant (счет генома-всего-значимые локусы для этой конечной точки) &#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `instance` | строка | факультативный; по умолчанию: "finngen"; &#91;"finngen"&#93; |
| `max_records` | целое число | факультативный; По умолчанию: 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes` {/* #phewas_search_phenotypes */}

Ищите фенотипы PheWeb example's (и объекты) по имени — точка входа для разрешения названия болезни на фенокод. Args: query (free-text phenotype query, например). "diabetes", "asthma"; совпадения фенотипических имен/кодов; некоторые экземпляры также соответствуют именам генов и rsID; экземпляр (finngen default или bbj — оба обнажают автозаполнение); max_records (по умолчанию 500); Автозаполненные ответы — это короткие списки, редко ограниченные. Возвращает &#123;instance, запрос, тотал, возвращается, усечен, соответствует &#125;; каждый матч &#123;, фенокод, url&#125;. Используйте фенокод с строками phewas_list_phenotypes или веб-сайт экземпляра; BBJ строки отображения встраивают код в скобки.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `instance` | строка | факультативный; по умолчанию: "finngen"; enum: &#91;"finngen", "bbj"&#93; |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## Выражение {/* #family-14 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `gtex_tissue_sites` {/* #gtex_tissue_sites */}

Перечислите все сайты тканей с метаданными для выделения GTEx (54 в gtex_v8): количество образцов, количество eGene / sGene, цветовые коды и идентификаторы онтологии UBERON.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info` {/* #gtex_dataset_info */}

Перечислите все выпуски набора данных GTEx с метаданными: datasetId, версия GENCODE, сборка генома, сборка dbSNP и количество выборок / предметов / тканей.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `dataset_id` | строка | необязательный |
| `organization_name` | строка | необязательный |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info` {/* #gtex_sample_info */}

Образец и метаданные донора для прикрепленного выпуска GTEx, необязательно отфильтрованного tissue_site_detail_id, data_type (например. RNASEQ, WGS или subject_id. Проверено и проверено; Нефильтрованный вызов соответствует десяткам тысяч образцов, поэтому фильтруйте или установите max_samples.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `tissue_site_detail_id` | строка | необязательный |
| `data_type` | строка | необязательный |
| `subject_id` | строка | необязательный |
| `max_samples` | целое число | необязательный |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes` {/* #gtex_resolve_genes */}

Решите символы генов или неверсированные идентификаторы Ensembl на версии идентификаторов GENCODE для прикрепленного высвобождения, например. GAPDH - > ENSG00000111640.14. Кормите идентификаторы инструментами экспрессии / eQTL.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `genes` | массив строк | **обязательно** | 7 / 0 / 0 |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression` {/* #gtex_median_expression */}

Медианная экспрессия гена (TPM) для одного или нескольких идентификаторов веризонированного генкода в тканях (опустить ткани для всех). Страницы и подсчитанные по строкам (ген, ткань).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gencode_ids` | массив строк | **обязательно** |
| `tissue_site_detail_ids` | массив строк | необязательный |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary` {/* #gtex_expression_summary */}

Обобщить экспрессию гена во всех тканях, ранжированных по нисходящей медиане TPM. Принимает символ или Ensembl id и автоматически передает его в версию GENCODE id.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene` | строка | **обязательно** |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression` {/* #gtex_gene_expression */}

Образцовые (не агрегированные) экспрессионные TPM-массивы для одного идентификатора ERSIONED GENCODE на ткань (без тканей для всех). Возвращает полный массив TPM на образец и n_образцы для каждой ткани.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gencode_id` | строка | **обязательно** |
| `tissue_site_detail_ids` | массив строк | необязательный |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes` {/* #gtex_top_expressed_genes */}

Топ-н гены по медиане TPM в одной ткани, используя API-сторону рейтинга. filter_mt_gene (по умолчанию истинный) роняет митохондриальные гены из рейтинга.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `tissue_site_detail_id` | строка | **обязательно** |
| `n` | целое число | факультативный; По умолчанию: 100 |
| `filter_mt_gene` | логическое значение | факультативный; Дефолт: правда |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes` {/* #gtex_eqtl_genes */}

Все eGenes (гены с ≥1 значительным цис-eQTL) для ткани. Ходил по страницам и подсчитывал (например). Поджелудочная железа gtex_v8 = 9,660. max_genes показывает, сколько строк возвращается.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `tissue_site_detail_id` | строка | **обязательно** |
| `max_genes` | целое число | необязательный |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls` {/* #gtex_single_tissue_eqtls */}

Значимые однотканевые ассоциации цис-eQTL для гена и/или варианта (предвычисленные). Предоставлять gencode_id и/или variant_id; tissue_site_detail_id необязательно сужается. Проверено и проверено.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gencode_id` | строка | необязательный |
| `variant_id` | строка | необязательный |
| `tissue_site_detail_id` | строка | необязательный |
| `max_results` | целое число | необязательный |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls` {/* #gtex_multi_tissue_eqtls */}

Многотканевый цис-eQTL-метаанализ (METASOFT) для идентификатора ERSIONED GENCODE variant_id необязательно сужается до одного варианта. Возвращает на переменные строки с m-значениями для каждой ткани, NES, p-значениями и SE.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gencode_id` | строка | **обязательно** |
| `variant_id` | строка | необязательный |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl` {/* #gtex_calculate_eqtl */}

Вычислите eQTL на лету для любой пары ген-варианта в одной ткани, включая незначимые пары. Возвращает p-значение, NES, t-статистику, MAF и матрицы генотипа/экспрессии на выборку.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gencode_id` | строка | **обязательно** |
| `variant_id` | строка | **обязательно** |
| `tissue_site_detail_id` | строка | **обязательно** |
| `dataset_id` | строка | факультативный; По умолчанию: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## Белковая аннотация {/* #family-15 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `get_domain_architecture` {/* #get_domain_architecture */}

Полная архитектура домена InterPro для одного или нескольких белков UniPro (все совпадающие записи, сигнатуры члена-DB, координаты фрагментов) с проверкой пагинации по счету API.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accessions` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries` {/* #search_interpro_entries */}

Поиск по ключевым словам в InterPro или в базах данных участников (Pfam, SMART, PROSITE, PANTHER, CDD), полная прогулка курсора, проверенная по счету API.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | необязательный |
| `entry_type` | строка | необязательный |
| `source_db` | строка | факультативный; По умолчанию: "interpro" |
| `go_term` | строка | необязательный |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry` {/* #get_interpro_entry */}

Детальная запись для входа InterPro (IPRxxxxxx) или семейства Pfam (PFxxxxx) — маршрут, выбранный приставкой присоединения.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans` {/* #search_pfam_clans */}

Поиск ключевых слов по кланам Pfam (наборы InterPro, присоединения CLxxxx).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | необязательный |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan` {/* #get_pfam_clan */}

Подробности клана Pfam, включая полный список членов семьи.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `clan_accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins` {/* #get_pfam_family_proteins */}

Белки-члены семейства Pfam (полная проверяемая прогулка или только подсчет). Используйте count_only для больших семей.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pfam_accession` | строка | **обязательно** |
| `reviewed_only` | логическое значение | факультативный; Дефолт: ложный |
| `tax_id` | целое число | необязательный |
| `count_only` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes` {/* #get_pfam_family_proteomes */}

Протеомы, содержащие членов семьи Пфам. count_only по умолчанию верный — верхняя пагинация курсора протеома дефектна для глубоких прогулок.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `pfam_accession` | строка | **обязательно** |
| `count_only` | логическое значение | факультативный; Дефолт: правда |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene` {/* #get_protein_atlas_gene */}

Запись Атласа белка человека на ген (релиз 25.x): ткань / субклеточная / патология / экспрессия крови / мозга и информация об антителах. Принимает идентификатор гена Ensembl или символ гена.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene` | строка | **обязательно** |
| `full` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas` {/* #search_protein_atlas */}

Выбранный колонкой объемный поиск по Атласу белка человека (search_download).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `columns` | строка | факультативный; по умолчанию: "g,gs,eg,gd,up,chr,chrp,scl" |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids` {/* #map_string_ids */}

Сопоставление символов гена/помех с идентификаторами белка STRING (v12.0). Каждый входной символ либо отображается, либо указывается в некартированном виде — два раздела входа.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `symbols` | массив строк | **обязательно** |
| `species` | целое число | факультативный; По умолчанию: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network` {/* #get_string_network */}

СТРОИТЕЛЬНАЯ сеть взаимодействия белка и белка для списка генов (v12.0) при пороге доверия. Сначала отображаются символы (без карты сообщается), затем извлекаются узлы, края, резюме и происхождение. Один отображаемый вход запрашивает взаимодействие 10 с соседями, совпадающее с STRING; Несколько отображенных входов не расширяются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `symbols` | массив строк | **обязательно** |
| `species` | целое число | факультативный; По умолчанию: 9606 |
| `required_score` | целое число | факультативный; По умолчанию: 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores` {/* #get_string_similarity_scores */}

Сходство белка Смита-Уотермана между набором генов (STRING / гомология). Разрыв: пары, отсутствующие в данных STRING's, не перечислены (отсутствие означает отсутствие зарегистрированного сходства, а не ноль).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `symbols` | массив строк | **обязательно** |
| `species` | целое число | факультативный; По умолчанию: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits` {/* #get_string_best_similarity_hits */}

Лучшая гомология удара на входной белок у целевого вида (STRING / homology_best). target_species = нуль требует лучшего удара по всем видам.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `symbols` | массив строк | **обязательно** |
| `species` | целое число | факультативный; По умолчанию: 9606 |
| `target_species` | целое число | необязательный |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## Модели рака {/* #family-16 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `cbioportal_list_studies` {/* #cbioportal_list_studies */}

Перечислите исследования рака cBioPortal, необязательно отфильтрованные ключевым словом в свободном тексте (имя / описание / тип рака) и / или точный идентификатор типа рака; возвращает идентификатор исследования, имя, тип рака, справочный геном, цитирование и количество образцов на тип данных.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `keyword` | строка | необязательный |
| `cancer_type_id` | строка | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study` {/* #cbioportal_get_study */}

Получите исследование рака cBioPortal по идентификатору: метаданные, количество образцов на тип данных, количество истинных образцов / пациентов (из коллекций исследования, а не поля отображения) и его молекулярные профили.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `study_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene` {/* #cbioportal_mutations_in_gene */}

Все мутации одного гена (символ HUGO) в исследовании cBioPortal с рекуррентными агрегатами: общие мутации, количество мутированных образцов, распределение мутаций и изменений белка и наиболее повторяющиеся изменения белка.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | **обязательно** |
| `study_id` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency` {/* #cbioportal_mutation_frequency */}

Частота мутации одного гена в нескольких исследованиях cBioPortal (1-12): уникальные мутированные образцы, разделенные на профилированные образцы для этого гена в выбранном профиле мутации и списке образцов, учитывающие целевые панели генов; На первом месте наиболее частые.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | **обязательно** |
| `study_ids` | массив строк | **обязательно**; Мини-элементы: 1; maxItems: 12 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene` {/* #cbioportal_cna_in_gene */}

Дискретные изменения копий одного гена в исследовании cBioPortal, отфильтрованные по типу события (глубокое удаление / усиление по умолчанию), с полным распределением изменений на образец.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `gene_symbol` | строка | **обязательно** |
| `study_id` | строка | **обязательно** |
| `event_type` | строка | факультативный; по умолчанию: "HOMDEL_AND_AMP"; enum: &#91;"HOMDEL_AND_AMP", "HOMDEL", "AMP", "GAIN", "HETLOSS", "DIPLOID", "ALL"&#93; |
| `max_records` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes` {/* #cbioportal_clinical_attributes */}

Клинические атрибуты, определенные в исследовании cBioPortal (поля на уровне пациентов и выборки), подчеркивают конечные точки выживания и наличие данных о выживаемости в целом.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `study_id` | строка | **обязательно** |
| `max_records` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## РНК {/* #family-17 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `get_family` {/* #get_family */}

Метаданные семейства Rfam для присоединения (RF00005) или идентификатора семейства (tRNA) — оба разрешают. Сплюснутый рекорд плюс полный восходящий JSON в "raw".

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `family` | строка | **обязательно** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment` {/* #get_seed_alignment */}

Выравнивание семян семейства Rfam в Стокгольме (по умолчанию, с согласованной линией вторичной структуры) или выравнивание пробелов FASTA.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `family` | строка | **обязательно** |
| `fmt` | строка | факультативный; по умолчанию: "stockholm"; enum: &#91;"stockholm", "fasta"&#93; |
| `max_bytes` | целое число | факультативный; По умолчанию: 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model` {/* #get_covariance_model */}

Адская ковариационная модель (CM-файл) семейства Rfam, используемая непосредственно с cmsearch/cmscan, а также с парсированными полями заголовка.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `family` | строка | **обязательно** |
| `max_bytes` | целое число | факультативный; По умолчанию: 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree` {/* #get_tree */}

Семя филогенетического дерева семейства Rfam (NHX/Newick text).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `family` | строка | **обязательно** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions` {/* #get_sequence_regions */}

Все полнорегиональные хиты семейства Rfam в базах данных последовательностей (с парсами TSV). Сначала проверьте num_full через get_family — rfam.org 403s этот маршрут для очень больших семей (например, для тех, кто живет в больших семьях). RF00005).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `family` | строка | **обязательно** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping` {/* #get_structure_mapping */}

Картографирование структуры на уровне остатков PDB семейства Rfam, детерминированное.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `family` | строка | **обязательно** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id` {/* #accession_to_id */}

Преобразовать присоединение Rfam к своему семейному идентификатору (например, RF00005 -> "tRNA".

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession` {/* #id_to_accession */}

Преобразовать идентификатор семейства Rfam в его присоединение (например). "tRNA" -> RF00005).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `family_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence` {/* #search_sequence */}

Поиск последовательности РНК через официальную конечную точку серии Rfam. сохранить вернувшуюся работу в ожидании; Незавершенный ответ не является результатом нулевого удара. Проверяйте завершенные матчи и исходную информацию. После неудачного ответа, диагностировать или возобновить существующую работу, а не представлять ее повторно.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `sequence` | строка | **обязательно** |
| `max_wait_s` | число | факультативный; По умолчанию: 300 |
| `poll_interval_s` | число | факультативный; По умолчанию: 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## Архивы Omics {/* #family-18 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `ena_search_runs` {/* #ena_search_runs */}

Найдите публичные секвенирующие прогоны, связанные с одним исследованием ENA/INSDC, экспериментом, образцом или запуском присоединения. Принимает PRJ/ERP/SRP/DRP, ERX/SRX/DRX, SAM/ERS/SRS/DRS и идентификаторы ERR/SRR/DRR; GEO GSE/GSM, ArrayExpress E-MTAB и MGnify MGYS идентификаторы нуждаются в их связанном присоединении INSDC. Только поиск присоединения, а не поиск по ключевым словам. Возвращает метаданные организма и библиотеки без извлечения файлов данных. Результат ограничивается забегами 1000; Усеченный результат не является полной когортой, и повторные вызовы не являются пагинацией, потому что ENA не предоставляет токен офсета или продолжения. Используйте более узкую выборку или присоединение к эксперименту, когда требуется полный охват.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно**; Длина: 1; Длина: 64 |
| `limit` | целое число | факультативный; по умолчанию: 100; Минимум: 1; Максимум: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files` {/* #ena_get_run_files */}

Получите сгенерированные архивом URL-адреса загрузки FASTQ, размеры байтов и контрольные суммы MD5 для одного запуска ERR / SRR / DRR. возвращает только инвентарь файла; Нет скачивания или проверки контрольной суммы. Сохраняет каждый файл в порядке отчета, включая неспаренные или прочитанные файлы; library_layout=PAIRED не подразумевает ровно два файла. file_index является только позиционным и не является идентификатором R1/R2 или mate. Некоторые из них (в том числе одноклеточные/родные) не имеют архивного FASTQ. Представленные файлы BAM/CRAM/SRA находятся за пределами этого инструмента.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `run_accession` | строка | **обязательно**; Длина: 1; Длина: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments` {/* #arrayexpress_search_experiments */}

Эксперименты по функциональной геномике Search ArrayExpress (BioStudies) с полным, тотальным поиском, проверенным Hits; Фильтры (запрос, организм, study_type, технология, диапазон даты выпуска, дополнительные грани) сочетаются с И.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | необязательный |
| `organism` | строка | необязательный |
| `study_type` | строка | необязательный |
| `technology` | строка | необязательный |
| `released_after` | строка | необязательный |
| `released_before` | строка | необязательный |
| `extra_facets` | объект | необязательный |
| `max_records` | целое число | факультативный; По умолчанию: 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment` {/* #arrayexpress_get_experiment */}

Возьмите один эксперимент ArrayExpress (BioStudies) в качестве сплющенной аналитической записи - тип исследования, организмы, количество анализов / образцов, проекты / факторы, авторы, публикации, протоколы, проекты массивов и резюме файлов.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files` {/* #arrayexpress_get_experiment_files */}

Перечислите каждый файл эксперимента ArrayExpress (имя, размер, тип, формат, описание) с URL-адресами загрузки, а также количество файлов /info-конечной точки, переносимое вместе для сравнения.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples` {/* #arrayexpress_get_experiment_samples */}

Приведите строки аннотаций SDRF для эксперимента ArrayExpress (дословно заголовки MAGE-TAB повторяют суффикс #2/#3). Эксперименты без возврата SDRF &#123;"error":"no_sdrf"&#125;.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |
| `max_rows_returned` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series` {/* #geo_search_series */}

Поиск по NCBI GEO DataSets (db=gds) и возврат записей на уровне серий (обрезанные краткие документы). `term` - полный синтаксис E-utilities; Добавить &#91;ETYP&#93;, чтобы ограничить серию.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `term` | строка | **обязательно** |
| `retmax` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series` {/* #geo_get_series */}

Получите структурированные метаданные для серии GEO (присоединение к GSE) с включенными выборками — заголовком / резюме / дизайном серии, платформами, образцами с характеристиками и информацией о библиотеке и дополнительными URL-адресами файлов. Таблицы данных никогда не загружаются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accessions` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies` {/* #metabolights_list_studies */}

Перечислите каждое публичное присоединение к исследованию MetaboLights (численно отсортированное) с собственным количеством отчетов API'. Нет поиска на стороне сервера — вместо этого фильтруйте выбранных кандидатов по названию / дескриптору.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies` {/* #metabolights_get_studies */}

Получите структурированные метаданные для исследований MetaboLights (MTBLSxxx) из разобранной полезной нагрузки ISA — название, статус, годы, организмы, анализы, факторы, дескрипторы, количество образцов, протоколы; необязательная таблица для каждого образца. Неизвестные/частные присоединения идут в not_found.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accessions` | массив строк | **обязательно** |
| `include_samples` | логическое значение | факультативный; Дефолт: ложный |
| `max_sample_rows_returned` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files` {/* #metabolights_get_study_files */}

Полный инвентарь файлов для публичного исследования MetaboLights — папка исследования верхнего уровня (ISA-Tab, MAF, записи в папках) и, по умолчанию, рекурсивная папка данных FILES.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |
| `include_data_files` | логическое значение | факультативный; Дефолт: правда |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files` {/* #metabolights_search_data_files */}

Поиск по глобусу через папку с необработанными данными MetaboLights study's (дерево FILES). `pattern` - это имя файла glob (например, glob). '*.mzML', '*.raw'); Опустить его, чтобы перечислить каждый файл данных.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |
| `pattern` | строка | необязательный |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies` {/* #mgnify_search_studies */}

Найти MGnify метагеномики исследования по свободному тексту или линии биома (обеспечить точно один). Полный список начинается до завершения и подсчитывается по API.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | необязательный |
| `biome_lineage` | строка | необязательный |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies` {/* #mgnify_get_studies */}

Получите структурированные записи для исследований MGnify (присоединения MGYS). С include_analyses каждое исследование также несет в себе полный анализ с перечнем плюс поточные / поэкспериментальные разбивки. Неизвестные присоединения исчезают.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accessions` | массив строк | **обязательно** |
| `include_analyses` | логическое значение | факультативный; Дефолт: ложный |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses` {/* #mgnify_get_study_analyses */}

Перечислите ВСЕ анализы одного исследования MGnify (полная, проверенная по счету пагинация) - одна запись на анализ MGYA с версией конвейера, типом эксперимента, статусом и присоединениями для запуска / сборки / выборки.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_search_projects` {/* #pride_search_projects */}

Поиск проектов протеомики архива PRIDE (полный, api_total-верифицированный поиск); Фильтры (ключевое слово, организм, инструмент, болезнь, extra_filters) сочетаются с AND. Сортированная по присоединению ASC — ограниченная прогулка является стабильным префиксом.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `keyword` | строка | необязательный |
| `organism` | строка | необязательный |
| `instrument` | строка | необязательный |
| `disease` | строка | необязательный |
| `extra_filters` | объект | необязательный |
| `max_records_returned` | целое число | факультативный; По умолчанию: 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects` {/* #pride_get_projects */}

Получить полные метаданные для проектов PRIDE путем присоединения (например, PXD010154) — такая же нормализованная форма записи, как и pride_search_projects, поэтому они прямо сопоставимы. Неизвестные дополнения идут в not_found.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accessions` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins` {/* #pride_search_project_proteins */}

Перечислите строки доказательств белка для одного проекта аффинности-протеомики PRIDE (на странице до исчерпания). ПРИМЕЧАНИЕ: здесь обслуживаются только проекты аффинити-протеомики; В классических проектах MS (PXD) используется pride_find_projects_for_protein.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `project_accession` | строка | **обязательно** |
| `keyword` | строка | необязательный |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein` {/* #pride_find_projects_for_protein */}

Найдите проекты PRIDE, содержащие белок (MS-архивное направление). `protein_accession` - это присоединение UniProt (например. P04637). Кормите возвращенные дополнения к pride_get_projects для полных метаданных.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `protein_accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## Клеточный гид {/* #family-19 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `get_cell_type_info` {/* #get_cell_type_info */}

CellGuide (CELLxGENE) информация клеточного типа по идентификатору или имени клеточной онтологии: имя, синонимы, описание онтологии и описание куратора / GPT.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `cell_type` | строка | **обязательно** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types` {/* #search_cell_types */}

Поиск типов ячеек CellGuide по свободному тексту над именем и синонимами (у CDN нет конечной точки поиска, поэтому celltype_metadata.json фильтруется на стороне клиента).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `limit` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes` {/* #get_marker_genes */}

Гены маркеров CellGuide для типа клетки (идент или имя): вычислительные (данные, полученные, забитые) или канонические (литературно-курируемые).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `cell_type` | строка | **обязательно** |
| `marker_type` | строка | факультативный; по умолчанию: "computational"; enum: &#91;"computational", "canonical"&#93; |
| `limit` | целое число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data` {/* #get_source_data */}

Наборы исходных данных и публикации CellGuide, способствующие типу клетки (id или name): название коллекции / URL, публикация и ткани / заболевания / микроорганизмы, которые охватываются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `cell_type` | строка | **обязательно** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues` {/* #get_cell_tissues */}

Анатомические ткани, в которых наблюдается тип клетки (ид или название), агрегированные (дублированные) в коллекциях источников CellGuide.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `cell_type` | строка | **обязательно** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## Регламент {/* #family-20 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `encode_search_experiments` {/* #encode_search_experiments */}

Эксперименты по функциональной геномике ENCODE (ChIP-seq, ATAC-seq, ...). Фильтры: assay_title (например. "TF ChIP-seq"), целевая (метка белка, например. "CTCF", организм (научное название), статус (по умолчанию "released"), date_released_before (дата ISO — закрытое окно), плюс произвольные фильтры поля портала через extra_filters. Полный набор результатов оглашается и подсчитывается; `accessions` перечисляет каждый матч, в большинстве случаев возвращаются резюме строк max_rows.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `assay_title` | строка | необязательный |
| `target` | строка | необязательный |
| `organism` | строка | необязательный |
| `status` | строка | факультативный; По умолчанию: "released" |
| `date_released_before` | строка | необязательный |
| `extra_filters` | объект | необязательный |
| `max_rows` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples` {/* #encode_search_biosamples */}

Поиск биосэмплов ENCODE (линии клеток, ткани, первичные клетки). Фильтры: term_name (онтологический термин, например). "K562"), классификация ("cell line", "tissue", ...), организм (научное название), статус (по умолчанию "released"), date_created_before (дата ISO), плюс произвольные фильтры поля портала через extra_filters. Полный, проверенный счетчик: `accessions` - полный список матчей, возвращается максимум резюме строк max_rows.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `term_name` | строка | необязательный |
| `classification` | строка | необязательный |
| `organism` | строка | необязательный |
| `status` | строка | факультативный; По умолчанию: "released" |
| `date_created_before` | строка | необязательный |
| `extra_filters` | объект | необязательный |
| `max_rows` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files` {/* #encode_list_files */}

Перечислите файлы данных ENCODE по формату / анализу / биообразцу. Фильтры: file_format ("fastq", "bam", "bigWig", "bed", ...), assay_term_name (онтологический термин, например). "ChIP-seq" — не отображает assay_title, как "TF ChIP-seq", который ничем не соответствует; передавать названия через extra_filters=&#123;"assay_title": ...&#125;), biosample_term_name (например. "K562"), статус (по умолчанию "released"), date_created_before, плюс произвольные фильтры поля портала через extra_filters. Запросы файлов соответствуют миллионам строк, нефильтрованных, всегда сочетают несколько фильтров. Полный + подсчитанный; Вернется максимум резюме строк max_rows.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `file_format` | строка | необязательный |
| `assay_term_name` | строка | необязательный |
| `biosample_term_name` | строка | необязательный |
| `status` | строка | факультативный; По умолчанию: "released" |
| `date_created_before` | строка | необязательный |
| `extra_filters` | объект | необязательный |
| `max_rows` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment` {/* #encode_get_experiment */}

Получить один эксперимент ENCODE путем присоединения (например). "ENCSR000AKP". Возвращает запись стабильного поля: анализ, цель, онтология биообразца + резюме, описание, лаборатория, проект награды, даты выпуска / представления, сборки, подсчет реплик, тип репликации, dbxrefs, DOI и uuid. Нестабильные поля портала (аудиты, анализы, внутренний статус) исключаются.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file` {/* #encode_get_file */}

Получить один файл ENCODE путем присоединения (например, "ENCFF002JUR"). Возвращает запись стабильного поля: формат, тип вывода / категория, анализ, сборка, родительский набор данных, биологические реплики, размер файла, md5sums, тип запуска, длина чтения, лаборатория, дата создания, загрузка href и uuid.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample` {/* #encode_get_biosample */}

Получить один биообразец ENCODE путем присоединения (например). "ENCBS013JZP"). Возвращает стабильный полевой рекорд: онтологический термин + классификация, организм, резюме / описание, источник, донор, методы лечения, генетические модификации, этап жизни, возраст, пол, лаборатория, дата создания, статус и uuid.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `accession` | строка | **обязательно** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix` {/* #jaspar_get_matrix */}

Получить один профиль связывания JASPAR TF с помощью идентификатора матрицы VERSIONED (например). "MA0002.2"). Возвращает полную запись: матрица частот положения (pfm), название / класс / семья TF, вид, тип данных, ссылки на литературу (pubmed /medline), URL логотипа последовательности. Требуется версия id ("MA0002.2", а не "MA0002") — используйте jaspar_matrix_versions для перечисления версий. Версии матриц неизменны, поэтому результаты воспроизводимы.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `matrix_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions` {/* #jaspar_matrix_versions */}

Перечислите все версии базового идентификатора матрицы JASPAR (например). "MA0002". Возвращает каждую выпущенную версию с ее matrix_id, именем, коллекцией и URL-адресом. Используйте, чтобы точно определить версию до jaspar_get_matrix или отследить, как профиль изменился в разных версиях. Версия id ("MA0002.2") принимается и сводится к своей базе.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `base_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices` {/* #jaspar_list_matrices */}

Профили связывания JASPAR TF (полный каталог профилей). Фильтры (все опциональные): сбор ("CORE", "UNVALIDATED"), tax_group ("vertebrates", "plants", ...), tax_id (NCBI taxonomy id, например). 9606 для человека — это то, как вы фильтруете по видам; Перечислите идентификаторы с jaspar_list_species), имя (точное имя TF, например. "FOXA1"), поиск (бесплатный текст), версия = "latest" (ограничено только последними версиями). Полный фильтрованный каталог помечается и подсчитывается; Возвращается максимум сводных строк max_rows.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `collection` | строка | необязательный |
| `tax_group` | строка | необязательный |
| `tax_id` | целое число | необязательный |
| `name` | строка | необязательный |
| `search` | строка | необязательный |
| `version` | строка | необязательный |
| `max_rows` | целое число | факультативный; По умолчанию: 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species` {/* #jaspar_list_species */}

Перечислите все виды с профилями JASPAR (NCBI tax_id + название); Проверенный полный список. Используйте значения tax_id для фильтрации jaspar_list_matrices (например). 9606 = Homo sapiens, 10090 = Mus musculus.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa` {/* #jaspar_list_taxa */}

Перечислите все таксономические группы JASPAR (позвоночники, растения, грибы, насекомые, ...); Проверенный полный список. Используйте имена групп в качестве фильтра tax_group для jaspar_list_matrices.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections` {/* #jaspar_list_collections */}

Перечислите все коллекции JASPAR (CORE, UNVALIDATED, ...); Проверенный полный список. Используйте названия коллекций в качестве фильтра сбора jaspar_list_matrices (CORE = кураторские, неизбыточные профили).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases` {/* #jaspar_list_releases */}

Перечислите все выпуски баз данных JASPAR (год, номер выпуска, активный флаг); Проверенный полный список. Записывайте активный выпуск при выборе мотивов для воспроизводимости или проверяйте историю выпуска перед сравнением результатов по версиям JASPAR.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs` {/* #unibind_search_tfbs */}

Поиск наборов данных UniBind ChIP-seq с высоконадежными прогнозами TFBS (unibind.uio.no, выпуск 2021); Прямые взаимодействия TF-DNA из наборов данных ~10k по видам 9. Каждый набор данных составляет один (эксперимент, тип ячейки, TF) тройной. Фильтры (все необязательные, AND-комбинированные, точные, если не указано): tf_name (символ гена, например). "CTCF", cell_line (словесное название UniBind — предпочитают `search` для нечеткого сопоставления), виды (научное название), коллекция ("Robust") = лучшая модель/высокая степень достоверности, или "Permissive"), jaspar_id (версия, например. "MA0139.1"), поиск (бесплатный текст). `total` - это точное количество API'; вернётся максимум строк max_rows (стабильный префикс).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `tf_name` | строка | необязательный |
| `cell_line` | строка | необязательный |
| `species` | строка | необязательный |
| `collection` | строка | факультативный; enum: &#91;"Robust", "Permissive"&#93; |
| `jaspar_id` | строка | необязательный |
| `search` | строка | необязательный |
| `max_rows` | целое число | факультативный; По умолчанию: 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset` {/* #unibind_get_dataset */}

Получите одну деталь набора данных UniBind 's: количество файлов TFBS + URL-адреса файлов для каждой модели. tf_id - это ключ набора данных "&lt;identifier>.&lt;cell_line>.&lt;TF>" как возвращено unibind_search_tfbs (например, "ENCSR000AUE.A549_lung_carcinoma.CTCF"). Возвращает имя TF, идентификаторы источников (ENCODE/GEO/GTRD), линии ячеек, биологические условия, идентификаторы матриц JASPAR, количество пиков ChIP-seq и одну строку на модель прогнозирования TFBS (DAMO/PWM/...) с total_tfbs, пороги оценки/расстояния, скорректированное значение p-значения CentriMo и прямые URL-адреса загрузки BED/FASTA - используйте эти URL-адреса (не вызов MCP) для получения полного списка сайта.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `tf_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region` {/* #unibind_tfbs_in_region */}

Сайты связывания TF, перекрывающие геномную область (карты UniBind 2021), обслуживаемые через UCSC hubApi против зарегистрированных публичных трековых хабов UniBind' (собственные REST API UniBind' не имеют конечной точки региона). Координаты на основе 0 полуоткрыты. геном: сборка UCSC — прочный хаб: hg38, mm10, ce11, dm6, danRer11, sacCer3, rn6, araTha1; Разрешительно добавляется spo2 (без hg19 — подъемник первый). Хром с "chr" префикс. Старт/конец: интервал, конец-старт &lt;= 1,000,000 bp. HONEST-CAP: в большинстве случаев 20,000 сканируется на один звонок; region_scan_complete = ложный означает, что в регионе больше сайтов, чем было отсканировано (узкое окно), и с набором tf_name совпадения могут отсутствовать. n_matching рассчитывает сканируемые сайты, проходящие через фильтр; Обратно/укорочено опишите кепку max_sites.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `genome` | строка | **обязательно** |
| `chrom` | строка | **обязательно** |
| `start` | целое число | **обязательно** |
| `end` | целое число | **обязательно** |
| `tf_name` | строка | необязательный |
| `collection` | строка | факультативный; по умолчанию: "Robust"; enum: &#91;"Robust", "Permissive"&#93; |
| `max_sites` | целое число | факультативный; По умолчанию: 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## Исследовательские ресурсы {/* #family-21 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `search_grants` {/* #search_grants */}

Поиск возможностей финансирования Grants.gov с помощью поиска 2 API (полный, проверенный подсчетом поиск). Требуется, по крайней мере, один критерий (ключевое слово, opportunity_number, aln/CFDA, агентства, элигибилити, funding_categories или funding_instruments). opportunity_statuses по умолчанию &#91;"forecasted","posted"&#93; (текущие возможности); "closed"/"archived" Для исторических. Агентства принимают коды, такие как &#91;"HHS-NIH11"&#93; (NIH), &#91;"HHS-FDA"&#93;, &#91;"NSF"&#93;. Установите count_only только для количества ударов + граней; max_records caps возвращает записи (прогулка по-прежнему возвращает полный комплект и усеченные флаги).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `keyword` | строка | необязательный |
| `opportunity_number` | строка | необязательный |
| `aln` | строка | необязательный |
| `agencies` | массив строк | необязательный |
| `opportunity_statuses` | массив строк | необязательный |
| `eligibilities` | массив строк | необязательный |
| `funding_categories` | массив строк | необязательный |
| `funding_instruments` | массив строк | необязательный |
| `count_only` | логическое значение | факультативный; Дефолт: ложный |
| `max_records` | целое число | факультативный; По умолчанию: 100 |
| `include_facets` | логическое значение | факультативный; Дефолт: правда |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies` {/* #search_antibodies */}

Полнотекстовый поиск по реестру антител (antibodyregistry.org, ~3.2M records). Совпадение на основе маркеров с именем/целью/каталогом антитела ("TP53") "p53" Это разные запросы. С опущенной страницей все страницы переходят на max_records или анонимный кэп глубины (выводы за пределы смещения 500 нуждаются в аутентификации вверх по течению, помеченные как anonymous_limit_hit - никогда молча не падают). Перейдите страницу на основе 1 для одностраничного поиска (страница &#42; page_size должна оставаться &lt; = 500).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `query` | строка | **обязательно** |
| `page` | целое число | необязательный |
| `page_size` | целое число | факультативный; По умолчанию: 100 |
| `max_records` | целое число | факультативный; По умолчанию: 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody` {/* #get_antibody */}

Запись (записи) регистрации антител для одного присоединения к антителам / RRID. Принимает простое число (" 3643095"), "AB_3643095" или "RRID:AB_3643095". Маршрут вверх по течению оценивается по списку (присоединение может отображаться на нескольких курируемых записях, например). дубликаты мультивендоров. Несуществующий идентификатор дает record_count 0, а не ошибку.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `antibody_id` | строка | **обязательно** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog` {/* #find_antibodies_by_catalog */}

Найти антитела по номеру каталога поставщика (точный, казеинсенсивный). Внедряется в виде полнотекстового поиска плюс точное совпадение на стороне клиента по номеру каталога (или его перечисленным альтернативам), потому что маршрут колонки-фильтра вверх по течению возвращает HTTP 500 для каждого ключа. Передайте необязательное имя поставщика (точное, нечувствительное к делу), чтобы еще больше сузить спички.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `catalog_number` | строка | **обязательно** |
| `vendor` | строка | необязательный |
| `page_size` | целое число | факультативный; По умолчанию: 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats` {/* #get_antibody_registry_stats */}

Статистика реестра антител: общее количество антител и дата последнего обновления. Возвращает полезную нагрузку upstream /api/datainfo.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## БиоМарт {/* #family-22 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `list_marts` {/* #list_marts */}

Список доступных ботов Ensembl BioMart (базы данных). BioMart организует данные как MART-> Датасет -> АТТРИБУТЫ/ФИЛЬТЕРЫ; Мартовское имя подпитывает list_datasets.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| — | объект | Нет полей; Передай пустой предмет. |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets` {/* #list_datasets */}

Перечислите наборы данных, доступные в данном марте (например,). hsapiens_gene_ensembl для человеческих генов. Имя набора данных подает инструменты атрибут/фильтр/запрос.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mart` | строка | **обязательно** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes` {/* #list_common_attributes */}

Перечислите часто используемые атрибуты для набора данных (курируемое подмножество с высоким сигналом). Используйте это перед list_all_attributes, чтобы выбрать атрибуты для get_data. `mart` принимается для паритета подписей, но игнорируется. Ключи запросов от `dataset`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mart` | строка | **обязательно** |
| `dataset` | строка | **обязательно** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes` {/* #list_all_attributes */}

Перечислите все атрибуты, доступные для набора данных, за вычетом гомологов и микрочипов (которые громоздки и редко требуются). может быть большим; Сначала предпочтите list_common_attributes. `mart` принимается для паритета подписей, но игнорируется. Ключи запросов от `dataset`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mart` | строка | **обязательно** |
| `dataset` | строка | **обязательно** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters` {/* #list_filters */}

Перечислите доступные фильтры для набора данных. Фильтры сужают запрос get_data (например). chromosome_name, биотип) и передаются в get_data в качестве фильтров диктовки. `mart` принимается для паритета подписей, но игнорируется. Ключи запросов от `dataset`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mart` | строка | **обязательно** |
| `dataset` | строка | **обязательно** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data` {/* #get_data */}

Запустите запрос BioMart: извлеките запрошенные атрибуты для набора данных, необязательно суженного фильтрами. Это основной инструмент извлечения данных. `mart` принимается для паритета подписей, но игнорируется. Ключи запросов от `dataset`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mart` | строка | **обязательно** |
| `dataset` | строка | **обязательно** |
| `attributes` | массив строк | **обязательно** |
| `filters` | объект | необязательный |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation` {/* #get_translation */}

Перевести один идентификатор из одного типа атрибутов в другой (например, символ HGNC для идентификатора гена Ensembl в наборе данных. `mart` принимается для паритета подписей, но игнорируется. Ключи запросов от `dataset`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mart` | строка | **обязательно** |
| `dataset` | строка | **обязательно** |
| `from_attr` | строка | **обязательно** |
| `to_attr` | строка | **обязательно** |
| `target` | строка | **обязательно** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate` {/* #batch_translate */}

Переведите множество идентификаторов из одного типа атрибутов в другой в одном запросе — более эффективно, чем повторные вызовы get_translation. `mart` принимается для паритета подписей, но игнорируется. Ключи запросов от `dataset`.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `mart` | строка | **обязательно** |
| `dataset` | строка | **обязательно** |
| `from_attr` | строка | **обязательно** |
| `to_attr` | строка | **обязательно** |
| `targets` | массив строк | **обязательно** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## Цинк {/* #family-23 */}

<ToolOperationGroup>
<summary>Показать операции и параметры</summary>

### `zinc_search_by_id` {/* #zinc_search_by_id */}

Ищите покупные соединения в ZINC22/ZINC20 по идентификатору ZINC — ответ ", что это за соединение и кто продает его ". Передача до 100 ids в одном вызове, а не во многих одиночных. Async upstream (представление + опрос); Это может занять до timeout_s секунд.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **обязательно** |
| `max_results` | целое число | факультативный; По умолчанию: 50 |
| `timeout_s` | число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles` {/* #zinc_search_by_smiles */}

Поиск по структуре покупаемого химического пространства ZINC22' отвечает на ", какие покупаемые соединения выглядят как этот SMILES". Это как инструмент точного соответствия, так и инструмент аналогового обнаружения (аналогичности): CartBlanche22 показывает одну конечную точку поиска структуры, чей параметр `dist` охватывает точное через разнообразное, поэтому преднамеренно нет отдельного инструмента поиска сходства. Самый медленный ZINC-запрос — постепенно поднимайте `dist`, а не начинайте терять.

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `smiles` | строка | **обязательно** |
| `dist` | целое число | факультативный; По умолчанию: 0 |
| `adist` | целое число | необязательный |
| `max_results` | целое число | факультативный; По умолчанию: 50 |
| `timeout_s` | число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier` {/* #zinc_search_by_supplier */}

Решите номера каталогов поставщиков для соединений ZINC — ответьте ", какое вещество ZINC является этим кодом поставщика, и что 's его структура ". С пакетом: до кодов поставщиков 100 за звонок. Async upstream (представление + опрос).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `supplier_codes` | ['string', 'array'] | **обязательно** |
| `max_results` | целое число | факультативный; По умолчанию: 50 |
| `timeout_s` | число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample` {/* #zinc_random_sample */}

Нарисуйте случайную выборку покупных соединений из ZINC22 — для создания экранирующих колод, базовых линий свойств или наборов приманок. `count` удваивается как этот инструмент 's `max_results`; Повторный вызов рисует свежий образец. Async upstream (представление + опрос).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `count` | целое число | факультативный; По умолчанию: 50 |
| `subset` | строка | необязательный |
| `timeout_s` | число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d` {/* #zinc_get_3d */}

Найдите готовые к стыковке 3D-структуры для соединений ZINC. ZINC22 отправляет предварительно сгенерированные 3D-конформеры (DOCK .db2.gz, .mol2.gz, .sdf.gz) в свой файловый репозиторий, организованный траншем — этот инструмент разрешает каждый идентификатор в свой транш и возвращает места репозитория для загрузки для предварительной стыковки (DOCK6, AutoDock Vina и т. Д.). Max 50 ids per call (3D retrieval — это перкомпонентная работа). Async upstream (представление + опрос).

| Полное поле | Тип | Требования и ограничения |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **обязательно** |
| `timeout_s` | число | факультативный; По умолчанию: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## Примеры записей ответов {/* #example-response-records */}

<ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">Примеры записей ответов</ExampleDownload> включает в себя точные входы, выдержки с ограниченным ответом и результаты каждой операции. Отличить возвращенный рекорд, пустой матч и неудавшийся запрос. Результаты могут быть метаданными, схемами или идентификаторами; Проверьте исходные поля и флаги полноты, прежде чем использовать их в своих исследованиях.
