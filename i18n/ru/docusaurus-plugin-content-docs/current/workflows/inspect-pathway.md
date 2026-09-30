---
title: "Проверить путь и его сеть взаимодействия"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Проверить путь и его сеть взаимодействия {/* #inspect-a-pathway-and-its-interaction-network */}

<p className="example-label"><strong>Практический пример</strong> Человек p53 сигнализирует в Reactome через Pathway Commons</p>

Используйте кураторный путь, чтобы проверить, как **TP53**, **МДМ2** и **CDKN1A** появляются в сети. Результатом является сохраненная запись источника, таблица взаимодействия и исследовательская записка. Это восстанавливает курируемую связь; Он не проверяет обогащение или не измеряет активность пути в образце. Для статистического генного списка используйте [генное обогащение](gene-set-enrichment.md).

## 1. Подготовить проект {/* #prepare */}

1. Создайте проект под названием **Исследование Pathway Commons** и начните разговор.
2. В **Settings → Connectors** сделать **Pathway Commons** доступным для активного агента. использует государственную услугу; Этот пример не нуждается в частных файлах исследований.
3. Выберите настроенную модель Main. В данном примере используется **Codex subscription**. Если Codex помечается как **Update required**, то перед отправкой задачи [Обновление Runtime](../guides/frameworks.md#update-codex).

## 2. Поиск и сохранение возвращенной личности {/* #search */}

Отправить:

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

Откройте **Notebook** рядом с разговором и проверьте запрос и возвращенные записи. В этом забеге был проведен поиск `p53 signaling`, с типом `Pathway`, организмом `9606` и источником данных `reactome`. Он также использовал `top_pathways` с `p53`. Об этом сообщает **1,309 - общие хиты**. Его первая страница — это не весь набор результатов.

![Запрос на изучение английского языка и фактический запрос Pathway Commons в Notebook](/img/open-science/v0340/pathway-query.webp)

Выбранная запись была **Транскрипционное регулирование TP53**, с точным URI `http://bioregistry.io/reactome:R-HSA-3700989` и источником `pc14:reactome`. Держите URI возвращенным запросом, а не реконструируйте его с этикетки. Результаты поиска и подсчеты могут меняться по мере обновления источника.

## 3. Экспорт выбранного пути {/* #export */}

Попросите экспортировать выбранный URI с помощью **Подземные дороги включены**. В этом забеге агент сохранял ответы SIF, TXT и JSON-LD. SIF поставляет сплющенные записи взаимодействия; TXT добавляет записи узлов; JSON-LD сохраняет более богатую модельную структуру. См. [Справочная информация об операции](../reference/connector-operations.md#pathway_commons_export) при выборе формата или области метро.

Проверить сохраненный ответ перед чтением резюме. Экспорт SIF содержал **Записи взаимодействия 3,318**, а экспорт TXT содержал **Узлы 387**. Эти подсчеты описывают выбранный путь и объем экспорта, а не каждое взаимодействие человека с р53.

## 4. Откройте и проверьте результаты {/* #inspect */}

1. Выберите **tp53_mdm2_cdkn1a_readable_interactions.tsv** в ответе или сгенерированных файлах. Откройте его полноэкранный предварительный просмотр, если столбцы узкие.
2. Проверьте `source`, `interaction` и `target` на необработанный ответ. Девятирядный стол для чтения - это выбор, а не полная сеть.
3. Открыть **tp53_pathway_research_note.md**. Подтвердите, что он сохраняет путь URI, источник, дату и ограничения.
4. Загрузите файлы, которые вам нужны. Сохраняйте полную сеть и оригинальные ответы вместе с любыми отрывками, используемыми в презентации.

![Девять выбранных записей взаимодействия, открытых в приложении](/img/open-science/v0340/pathway-interactions.webp)

Возвращенные записи включают `TP53 controls-expression-of MDM2`, `MDM2 controls-state-change-of TP53` и `MDM2 in-complex-with TP53`. CDKN1A появляется в шести записях, но этот экспорт SIF не имеет прямого преимущества TP53-CDKN1A. Отсутствие края в выбранном, сплющенном пути не является доказательством отсутствия биологической связи.

![Сохраненная английская нота с ограничениями идентичности и интерпретации](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` сам по себе не указывает активацию против ингибирования; `in-complex-with` не устанавливает прямого бинарного связывания. Сеть сама по себе не может установить специфичность ткани, эффекты мутации, силу взаимодействия, активность на уровне образца или причинность. Используйте оригинальные реакции и первичные эксперименты, чтобы исследовать эти вопросы.

## Сохраненные примеры файлов {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">Оригинальные ответы Connector, сжатый ZIP</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">Полная таблица экспортного взаимодействия</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">Девятирядный стол для чтения</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">Английское исследование Note</ExampleDownload>

Чтобы исследовать соседство генов или пути между наборами генов вместо точно выбранного пути, используйте **pathway_commons_graph** и сознательно выберите его направление, режим пути и пределы. Это отличается от этого экспорта на основе URI. Источники и настройки описаны в [Научные базы данных](../tools/databases.md#pathway-expression-clinical).
