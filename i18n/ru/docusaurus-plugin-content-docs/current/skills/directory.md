---
title: "Директория Skill"
last_update:
  date: '2026-09-24'
---

# Директория Skill {/* #skill-directory */}

Приложение предоставляет **23 в комплекте с Skills**. Этот каталог группирует их по работе, которую они поддерживают. Записи описывают отгруженный способ; Они не утверждают, что каждая внешняя модель, зависимость или услуга установлена.

Для методов, распространяемых через приложение, используйте [Руководство по установке маркетплейс](marketplace.md). Справочник ниже поможет вам выбрать метод исследования; Это не живой инвентарь рыночных версий.

## Проверить готовность перед выбором метода {/* #check-readiness-before-selecting-a-method */}

1. Откройте Skill в настройках и прочитайте его полные требования и уведомления третьих лиц.
2. Сравните тип ввода с вашими фактическими данными. Массовая таблица RNA-seq не является одноклеточным объектом AnnData; Молекулярный рисунок не является результатом стыковки.
3. Проверьте выбранное время выполнения и пакеты. Для удаленной работы выберите удобный вычислительный хост и проверьте его среду перед отправкой.
4. Запросите один ограниченный запуск, проверьте фактический вывод и сохраните ссылки на ввод/версию, прежде чем увеличивать масштаб.

Два дополнительных явных элемента, самосознание и создание навыков, являются внутренними рамками. Они не являются входами в каталоги, ориентированными на пользователя. Личные или импортные Skills, включая rnaseq-count-qc, отделены от 23.

Включены три приложения Environment Skills и Customize Stay; См. [Правила активации](overview.md#why-some-switches-cannot-be-turned-off). Используйте [Связанный манифест](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json) для идентификации отгруженных методов и [Дистанционные вычисления](../guides/remote-compute.md) для настройки хоста и доставки результатов.

## Просмотр по исследовательской задаче {/* #browse-by-research-task */}

### Белковая структура {/* #protein-structure */}

| Навык | Ввод | Зависимости и исполнение | Результат проверки |
| --- | --- | --- | --- |
| [Альфа-Фолд2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | Протеин FASTA; мономер или комплекс | ColabFold, вес модели, GPU; опциональная государственная услуга MSA | Прогнозируемые структуры и показатели доверия |
| [Болтц](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | Спецификация белка/ДНК/РНК/лиганда | Пакет Boltz, весы, GPU; Доступ к МСА по запросу | Сложная структура и уверенность; необязательный выход аффинности |
| [Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | Многофункциональный FASTA | Чай-лаборатория, вес, GPU | Всеатомный комплекс и уверенность |
| [ESMFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | Последовательности или сложные входы | Biohub эсм пакет, весы, CUDA; Отличие от справедливого | структурные прогнозы; ESMC-представления, если они запрашиваются |
| [OpenFold3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | Спецификация белка/нуклеиновой кислоты/лиганда | OpenFold3, вес/доступ, CUDA и сконфигурированные ядра | Сложные структуры и баллы |

### Белковый дизайн {/* #protein-design */}

| Навык | Ввод | Зависимости и исполнение | Результат проверки |
| --- | --- | --- | --- |
| [Диффдок](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | Цель PDB плюс лиганд SMILES/SDF | Репозиторий DiffDock, весы и GPU | ранжированные лигандовые позы; Позировать уверенность - это не аффинити |
| [БелокMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | Хвост PDB, сконструированные/фиксированные цепи и остатки | Репозиторий, контрольно-пропускные пункты, факел/нумпи; Маленькие рабочие места поддерживают CPU | Разработанные последовательности и баллы |
| [LigandMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | Хребет плюс лиганд/металл/нуклеиново-кислотный контекст | Репозиторий и Python-зависимости; Маленькие рабочие места поддерживают CPU | Последовательности и резьбовые структуры |
| [Растворимый MPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | Белковый костяк | Репозиторий и растворимые контрольные точки ProteinMPNN; CPU возможный | Последовательности под растворимой моделью a prior |

### Последовательность и клетки {/* #sequence-and-cells */}

| Навык | Ввод | Зависимости и исполнение | Результат проверки |
| --- | --- | --- | --- |
| [ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | Белковые последовательности | Справедливость и весы; Интерфейс использует GPU | Встраивание, лоджиты или контактные прогнозы |
| [Борзой](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | Окна ДНК с заявленным геномом/координатами | Борзой-пираха, весы и CUDA | Предсказанные геномные дорожки или справочные/альтернативные дельты |
| [Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | ДНК-последовательности или префиксы | Evo 2 весы, совместимый CUDA и достаточная память | Вероятности последовательности, встраивание или генерируемая ДНК |
| [ГГПТ](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | Одноклеточные AnnData с отображением генной лексики | пакет scGPT, контрольно-пропускной пункт и GPU | Встраивание ячеек или выходы аннотации |
| [инструменты для галочки](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | Одноклеточные подсчеты и метаданные пакета/метки | scvi-tools/scanpy/anndata; Комплексный учебный рабочий процесс ожидает GPU | Скрытое представление, перенос этикеток или сравнения на основе моделей |

### Доказательства и письменность {/* #evidence-and-writing */}

| Навык | Ввод | Зависимости и исполнение | Результат проверки |
| --- | --- | --- | --- |
| [Литературный обзор](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | Вопросы исследования, идентификаторы или документы | поиск источника; Открытый ключ для операций OpenAlex | Проверенный синтез доказательств и цитаты |
| [Указательное досье](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | Индикация, оформленная как популяция пациентов | Инструменты исследования и доступ к источникам | Возобновляемые направления исследований и досье |

### Среда {/* #environment */}

| Навык | Ввод | Зависимости и исполнение | Результат проверки |
| --- | --- | --- | --- |
| [Окружающая среда и пакеты](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | Отсутствующий пакет или версия вопроса | Выберите время выполнения Python/R и разрешенный источник пакета | Проверка пакетов, управляемая установка и проверка импорта |
| [Настройка вычислительной среды](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | Названа среда на хосте SSH/Slurm | Настроенная активация хоста и пользователя/администратора | Инструкции по установке и запись валидации |
| [Дистанционные вычисления (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | Рабочая нагрузка и подходящий вычислительный хост | SSH учетные данные, хост, планировщик, когда это применимо | Представленные работы, собранные результаты и опубликованные артефакты |

### автор {/* #authoring */}

| Навык | Ввод | Зависимости и исполнение | Результат проверки |
| --- | --- | --- | --- |
| [Настройка](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | Запрошенное изменение Skill или Specialist | Рабочий агент; нативные операции по кастомизации | Сохраненный пакет или роль с проверкой считывания |
| [Фигурный стиль](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | Актуальные данные и одна окончательная цифра | Функция Notebook и зависимость от графиков | Проверенный сюжет с разборчивыми этикетками и верными данными |
| [Фигурный композитор](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | Одно утверждение и неизменные ссылки на передачу данных | Main Агент, делегирование, планирование и обзор | Многопанельная фигура и итерации обзора |
| [Бумажный рассказчик](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | Рукопись/абстракт, подписи и упорядоченная колода фигур | Основанные версии артефактов и инструменты обзора | Бумажный бриф и упорядоченный аргумент фигуры |



Ссылка на осуществление: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json).
