---
title: "Получение структурированных записей из научной базы данных"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Получение структурированных записей из научной базы данных {/* #retrieve-structured-records-from-a-scientific-database */}

<p className="example-label"><strong>Практический пример</strong> Семь прямоцепочечных карбоновых кислот в PubChem</p>

Начните с сложных имен и закончите таблицей проверенных идентификаторов и свойств. Этот пример извлекает уксусную кислоту через октановую кислоту, семичленную гомологическую серию с двумя-восемью атомами углерода. Записи источника остаются доступными вместе с таблицей, чтобы вы могли проверить, как было получено каждое значение.

## 1. Определить соединения и свойства {/* #1-define-the-compounds-and-properties */}

В **Resource center → Connectors** убедитесь, что **химия** доступен. Откройте проект, начните разговор и выберите подключенную модель. В этом забеге использовались Open-Science 0.30.1 и Chemistry/PubChem Connector; Не требовалось вводить электронную таблицу.

Укажите **нейтральные, прямоцепочечные, насыщенные монокарбоновые кислоты**. Аналогичное название может относиться к разветвленному изомеру, соли или сопряженному основанию. Одна только формула не может различить все эти структуры.

```text
Use the Chemistry/PubChem Connector to retrieve acetic acid,
propanoic acid, butanoic acid, pentanoic acid, hexanoic acid,
heptanoic acid and octanoic acid. Resolve each name to a PubChem CID.
Retrieve molecular formula, molecular weight, the returned SMILES
and ConnectivitySMILES fields, InChIKey and the PubChem source URL.
Use neutral straight-chain acids, not branched isomers or salts.
Save pubchem-homologs.csv, pubchem-homologs-source.json and
pubchem-homologs-notes.md. Preserve exact lookup inputs and raw
responses. Check seven distinct CIDs, carbon counts 2–8, formulas
CnH2nO2, neutral charge and linear structures. Reopen the files.
Keep all outputs in English and do not delegate.
```

![Соединение объема и запрошенные файлы в фактическом разговоре](/img/open-science/workflow-extensions/pubchem-input.webp)

## 2. Проверьте реальные звонки в базу данных {/* #2-check-the-actual-database-calls */}

После отправки расширьте активность инструмента или откройте **Notebook**. Запуск разрешил семь имен с `pubchem_search_compounds`, а затем извлек их записи с `pubchem_get_compounds`. Осмотрите возвращенный CID и структуру для каждого имени, прежде чем принимать строку. Если имя возвращает несколько правдоподобных идентичностей, сначала устраните эту двусмысленность.

В примере использовались точные названия кислот и первый возвращенный CID, затем проверялись свойства партии. Это подходит для этих однозначных имен; Принятие первого удара не является общим правилом идентификации.

![Фактическая активность запроса и восстановление сохраненного файла в Notebook](/img/open-science/workflow-extensions/pubchem-lookup.webp)

## 3. Откройте сохраненный стол {/* #3-open-the-saved-table */}

Подождите, пока ответ завершится, и файлы появятся под **Generated**. Откройте **pubchem-homologs.csv** и увеличьте его предварительный просмотр. В результате был выпущен **7 строки · 8 столбцы**.

| соединение | PubChem CID | Формула | Молекулярный вес, г/моль |
|---|---:|---|---:|
| уксусная кислота | 176 | C2H4O2 | 60.05 |
| Пропановая кислота | 1032 | C3H6O2 | 74.08 |
| Бутановая кислота | 264 | C4H8O2 | 88.11 |
| Пентановая кислота | 7991 | C5H10O2 | 102.13 |
| Гексановая кислота | 8892 | C6H12O2 | 116.16 |
| Гептановая кислота | 8094 | C7H14O2 | 130.18 |
| Октановая кислота | 379 | C8H16O2 | 144.21 |

![Семикомпонентный CSV](/img/open-science/workflow-extensions/pubchem-table.webp)

Совместите строки **МУС**, а не их порядок отображения. Проверьте формулу и линейные улыбки вместе. В примере сохранены как возвращенные имена полей, `SMILES`, так и `ConnectivitySMILES`; Их струны совпадают с этими соединениями. Не переименовывайте один в другой идентификатор или не выводите из него экспериментальную стереохимию.

## 4. Храните исходные записи с экспортом {/* #4-keep-the-source-records-with-the-export */}

Откройте **pubchem-homologs-source.json**, чтобы проверить все восемь операций, точные данные поиска и необработанные ответы. Откройте **pubchem-homologs-notes.md** для процедуры и проверки. Сохраненный CSV сравнивали с необработанными записями; Семь тождеств, формул и линейных структур согласованы.

![Сохраненная процедура, результаты валидации и пределы интерпретации](/img/open-science/workflow-extensions/pubchem-notes.webp)

Используйте кнопку предварительного просмотра **Download**, чтобы сохранить локальную копию. Для этого загрузите <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs.csv">CSV</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-source.json">источник записи</ExampleDownload> и <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-notes.md">примечания</ExampleDownload>. Записи PubChem могут меняться; Сохраните исходный снимок с помощью вашего анализа.

Это вычисленные в базе данных или стандартизированные свойства, а не новые экспериментальные измерения. Молекулярная масса не является точной моноизотопной массой, и в этой таблице не устанавливается чистота, токсичность или биологическая активность. Чтобы сравнить противоречивые записи источников, продолжайте с [Перекрёстная проверка научных записей](cross-check-records.md).
