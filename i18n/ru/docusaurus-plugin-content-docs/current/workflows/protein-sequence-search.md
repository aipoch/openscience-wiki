---
title: "Найдите последовательность белка и заполните поиск BLAST"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Найдите последовательность белка и заполните поиск BLAST {/* #find-a-protein-sequence-and-complete-a-blast-search */}

<p className="example-label"><strong>Практический пример</strong> Найти пересмотренный вход гемоглобина альфа человека и восстановить его последовательность</p>

Начните с названия гена HBA1 человека, получите проверенный белок UniProt и его каноническую FASTA, затем отправьте поиск BLAST и проверьте завершенный отчет. Этот пример учит поиску и сравнению последовательностей с использованием известного белка.

Перед запуском следуйте [Научные базы данных](../tools/databases.md#connect-database), чтобы включить необходимые разъемы. Используйте подключенную модель и доступный [Среда выполнения Notebook](../guides/runtimes.md).

## 1. Найти белок и получить его FASTA {/* #sequence-search */}

**Гены и онтологии** может обнаружить записи UniProt, прежде чем вы узнаете о присоединении. Используйте `search_uniprot_entries` с именем гена, белковой фразой или организмом. `organism_id` соответствует указанному таксону, в то время как `reviewed: true` выбирает Swiss-Prot, а `false` выбирает непроверенные записи TrEMBL. Omit `reviewed` включает оба варианта. Следуйте `next_cursor` без изменения фильтров или размера страницы при продолжении запроса.

Включите **Гены и онтологии**, откройте сеанс с подключенной моделью и доступным временем выполнения Notebook, затем отправьте:

```text
Use Genes & Ontologies through Session Notebook. Call search_uniprot_entries
with gene HBA1, organism_id 9606, reviewed true and page_size 5.
Save the query and complete response as hba1-uniprot.json. Check the
returned organism and protein identity, then retrieve the canonical FASTA
for the matching accession with get_uniprot_entries. Add that response to
the JSON and save hba1-query.fasta. Keep everything in English. Preserve
missing or empty results; do not invent sequences.
```

Откройте JSON перед использованием FASTA. Этот запрос возвращал **P69905/HBA_HUMAN**, **Homo sapiens**, **Аминокислоты 142** с генными именами **HBA1 и HBA2**. В ответе UniProt были идентифицированы релизы **2026_03**, `total_results: 1` и `has_more: false`. Заголовок FASTA сохраняет присоединение и организм; Последовательность содержит остатки 142. Запрос на имя гена может возвращать запись белка, связанную с более чем одним геном, поэтому не делайте вывод о сопоставлении один к одному.

![Фильтры запросов UniProt и возвращенный пересмотренный вход белка человека](/img/open-science/v0320/uniprot-discovery.webp)

<ExampleDownload path="/examples/v0320/hba1-uniprot.json">UniProt запрос и ответ FASTA</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-query.fasta">Каноническая фаста</ExampleDownload>

## 2. Отправляйте и следуйте за последней работой {/* #blast-jobs */}

Для поиска сходства включите **геномы** и используйте три операции BLAST. Последовательность отправляется в общедоступную службу NCBI; использовать публичный или иным образом авторизованный вход.

1. Позвоните `blast_submit` один раз с последовательностью, ее `molecule_type` и совместимой базой данных. Держите возвращенный `rid` и руководство по опросам. Для белка выше `molecule_type: protein` и `database: swissprot` выберите поиск белка.
2. Звоните `blast_status` для этой поездки. Запросы на один и тот же RID должны быть как минимум **60 секунды раздельно**, а все запросы BLAST - как минимум **10 секунды раздельно**. Последуйте за любой более длительной задержкой, возвращенной службой. `WAITING` означает, что работа по-прежнему стоит в очереди или работает. Сохранить свой RID вместо того, чтобы снова подать заявку.
3. После `READY` соблюдайте тот же интервал перед `blast_results`. Доступны форматы `json2`, `xml2`, `text` и `tabular`. Отчеты ограничены 2 MiB; Запросите меньше ударов, если это необходимо. Таблица вывода может включать комментарии и не является автоматически таблицей CSV.
4. Проверяйте длину запроса, эффективную базу данных, соответствие присоединений, диапазон выравнивания, идентичность и E-значение в фактическом отчете. Одно только сходство последовательностей не устанавливает функции. Известная последовательность гемоглобина полезна для изучения контроля, а не для обнаружения неизвестного белка.

Если отправка возвращает `blast_submission_unknown`, ее принятие неопределенно: не отправляйте автоматически. Сохраняйте ответ и любую МПОГ. Никогда не рассматривайте квитанцию о предоставлении или статус `WAITING` как завершенное согласование. Точные входы и условия возврата находятся в [БЛАСТНАЯ ссылка](../reference/connector-operations.md#blast_submit).

## 3. Откройте и интерпретируйте завершенный отчет {/* #blast-report */}

Продолжить тот же пример белка в сессии выше. Сохраните квитанцию о представлении, чтобы более поздний запрос мог возобновить ту же работу. Отправить:

```text
Continue with the public P69905 FASTA retrieved above. Use Genomes through
Session Notebook. If this session already has a BLAST RID, resume that RID;
otherwise call blast_submit once with molecule_type protein, database
swissprot and hitlist_size 5, then save the receipt. Space requests for the
same RID by at least 60 seconds and follow any longer server delay. Check
blast_status; if it is still WAITING, keep the RID for a later check rather
than submitting again. After READY, wait the required interval and retrieve
blast_results in json2 format. Save hba1-blast-raw.json, hba1-blast-hits.csv
and hba1-blast-results.md. Include the actual database, query length,
accessions, alignment coordinates, identity counts and E-values. Explain
the coverage and identity calculations. Keep everything in English and
preserve actual errors or empty results. Never invent alignments.
```

![Квитанция BLAST с МПОГ и минимальный интервал опроса](/img/open-science/v0320/blast-submitted.webp)

После того, как отчет будет готов, откройте **hba1-blast-results.md** и сравните его таблицу с **hba1-blast-raw.json**. В этом примере используется **BLASTP 2.17.0+**, с **швейцарская труба**, подтвержденным в отчете, запросом **142-аминокислота** и **5 хиты**:

| присоединение | Идентичные остатки/длина выравнивания | Охват запросов | E-значение |
|---|---:|---:|---:|
| P69905 | 142/142 (100%) | 100% | 1.99033e-100 |
| P01923 | 140/141 (99.29%) | 99.30% | 1.06845e-98 |
| Q9TS35 | 140/142 (98.59%) | 100% | 2.38346e-98 |
| P06635 | 139/142 (97.89%) | 100% | 3.57742e-98 |
| P01924 | 138/141 (97.87%) | 99.30% | 3.00466e-97 |

![Завершенный отчет BLAST с пятью фактическими хитами, покрытием запросов и расчетами идентичности](/img/open-science/v0320/blast-results.webp)

Для каждого первого HSP идентичность представляет собой количество идентичных остатков, деленное на длину выравнивания. Покрытие запроса - это инклюзивный диапазон координат запроса, разделенный на 142. Для P01923 диапазон запросов 2-142: покрытие 141/142 = 99.30%, а идентичность 140/141 = 99.29%. Эти два процента отвечают на разные вопросы; Также не существует вероятности того, что назначение функции является правильным.

<ExampleDownload path="/examples/v0320/hba1-blast-results.md">Завершенный доклад</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-hits.csv">Пятифутовый столик</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-raw.json">Отчет NCBI JSON2</ExampleDownload>

Самой популярной P69905 является входная последовательность, поэтому ее идентификация и покрытие 100% обеспечивают проверку известной последовательности. Другие хиты демонстрируют похожие последовательности, а не новое функциональное открытие. Сохранить необработанный отчет и запрос с таблицей результатов; Более поздний выпуск базы данных может изменить список хитов.

Чтобы сравнить три или более известных последовательностей, продолжайте с [многократное выравнивание последовательности и сохранение позиций](multiple-sequence-alignment.md).

## Проверьте домен белка с HMMER {/* #hmmer-domain */}

<p className="example-label"><strong>Практический пример</strong> Сканирование P69905 против Pfam</p>

После извлечения канонической белковой последовательности P69905 включить **ГММЕР** для Main в **Settings → Connectors**. В том же разговоре спросите:

```text
Use the HMMER Connector to scan the same human P69905 sequence against
Pfam with hmmscan. Keep the job ID, retrieve the completed domain
annotations, and save the raw result and a concise English interpretation
with coordinates and significance values. Preserve an unavailable
result as unavailable.
```

1. Проверьте идентификатор работы, а затем следуйте **статус** для той же работы.
2. Запрос **результаты** после завершения и сохранение необработанного ответа. Проверьте `ready` и статус результата, прежде чем интерпретировать его хиты.
3. Осмотрите семейное присоединение каждого хита, координаты запросов, E-значения и флаги включения. Сообщенный фрагмент не обязательно является значительным доменом.

![Завершенный отчет HMMER для P69905 с координатами домена и значениями значимости](/img/open-science/v0331/hmmer-result.webp)

Этот запуск возвращал **Глобин · PF00042.28**, с включенным доменом на остатках запросов **27–137** (на основе 1, включительно), **115.572 биты** и независимым доменом E-значения **2.2781 × 10⁻³³**. Короткий фрагмент в **10–20** не был включен и не был значительным; Это не является доказательством наличия второго домена. Эти координаты относятся к представленной канонической последовательности, а не к схеме нумерации зрелых белков. E-значения зависят от пространства поиска и не измеряют вероятность того, что биологическая интерпретация верна.

<ExampleDownload path="/examples/v0331/p69905_pfam_hmmscan_raw.json">Реакция HMMER</ExampleDownload> · <ExampleDownload path="/examples/v0331/p69905_pfam_hmmscan_interpretation.md">Интерпретация домена</ExampleDownload>

Входные данные HMMER зависят от выбранной программы. В примере используется белковая последовательность с **hmmscan**; [Справочная информация об операции](../reference/connector-operations.md#family-26) для других программ. **InterProScan** отдельно извлекает статус и результаты TSV существующей работы. Он не подчиняется ни одному.
