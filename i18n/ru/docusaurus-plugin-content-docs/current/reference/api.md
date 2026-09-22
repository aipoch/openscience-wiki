---
title: "Задание SDK и местный API"
last_update:
  date: '2026-09-22'
---

# Задание SDK и местный API {/* #task-sdk-and-local-api */}

Клиент `@aipoch/open-science` Node.js подключается к аутентифицированному локальному сервису приложений для управления задачами, сессиями, коннекторами и общими учетными данными. Публичные методы SDK отделены от вызовов предварительной загрузки Electron и внутренних API агента `host`.

<span id="connect-and-select-real-ids" />

## Подключите, запустите задачу и загрузите ее выход {/* #connect-run-a-task-and-download-its-output */}

<p className="example-label"><strong>Пример</strong> Сохранить и загрузить заметку проверки соединения</p>

Используйте Node.js 22.5 или более поздней версии. Откройте установленное настольное приложение на той же машине, закончите настройку модели и продолжайте ее работу. SDK использует локальное обнаружение сервисов и локально хранящийся токен. Для отдельного демона сначала следуйте [Безголовый сервис](server.md).

В пустой рабочей папке установите клиент:

```bash
npm init -y
npm install @aipoch/open-science
```

Сохраните следующее как `connection-check.mjs`. Запустите `node connection-check.mjs`, чтобы перечислить идентификаторы проекта, а затем `node connection-check.mjs PROJECT_ID` с одним возвращенным идентификатором. Первое обращение намеренно прекращается после листинга проектов; Вторая задача создает небольшую задачу.

```js
import {connectToOpenScience} from '@aipoch/open-science';
import {writeFile} from 'node:fs/promises';

const client = await connectToOpenScience();
const projects = await client.listProjects();
const projectId = process.argv[2];
if (!projects.some((project) => project.id === projectId)) {
  console.table(projects.map(({id, name}) => ({id, name})));
  console.log('Run again with a project ID from this list. Create a project in the app if the list is empty.');
  process.exit(projectId ? 1 : 0);
}
const run = await client.startRun({
  project: projectId,
  prompt: 'Save a short Markdown file named project-note.md explaining that this is a connection check. Do not read project inputs or use the network.',
  permissionProfile: 'ask',
});
console.log('Run:', run.id, 'Session:', run.sessionId);
const result = await client.waitForRun(run.id, {timeoutMs: 120000});
console.log(result.status, result.output ?? result.error ?? '');
if (result.status !== 'completed') {
  throw new Error('Inspect the run in the application before continuing.');
}
const artifacts = await client.listArtifacts(run.sessionId);
console.table(artifacts.map(({id, name, path}) => ({id, name, path})));
const artifact = artifacts.find((item) =>
  item.name === 'project-note.md' || item.path.endsWith('/project-note.md'));
if (!artifact) throw new Error('No matching saved artifact; inspect the response.');
const response = await client.downloadArtifact(artifact.id);
await writeFile('project-note.download.md', new Uint8Array(await response.arrayBuffer()));
console.log('Saved project-note.download.md; open and check its contents.');
```

Держите сеанс рабочего стола открытым. Ответьте, если **Ask for approval** приостановит задачу. Тайм-аут останавливает опрос клиентов; Это не отменяет бега. Проверяйте идентификатор запуска с помощью `getRun`, продолжайте ждать после решения запроса или позвоните `cancelRun`, когда вы намереваетесь его остановить. Загрузка удаётся только при наличии соответствующего сохраненного артефакта; Откройте загруженный Markdown, чтобы закончить проверку.

Эта программа демонстрирует публичный контракт API. Это не означает, что модель всегда сохраняет запрашиваемый файл. Если пакет npm не может быть установлен, используйте папку SDK, отправленную с соответствующим исходным кодом, в качестве локального пакета. Подтвердите метаданные пакета перед установкой.

### Завершенная задача, чей файл не будет скачиваться {/* #a-completed-task-whose-file-will-not-download */}

Причина этой ошибки — потерянная идентификация версии артефакта в заполненных записях задач — была зафиксирована в [Скачать обновление](../changelog/v0.29.0.md). В более старом приложении обновляйте, прежде чем повторно использовать тот же сохраненный файл. Другие причины HTTP 500 все еще требуют диагностики.

Завершение задачи и загрузка артефакта - это отдельные проверки. Если `downloadArtifact` возвращает HTTP **500** / `internal_error`, позвоните `getRun` и `listArtifacts`, чтобы подтвердить состояние задачи и сохранить точный идентификатор возвращенного артефакта. Не начинайте ту же исследовательскую задачу снова, просто чтобы повторить загрузку.

Откройте артефакт в приложении и проверьте, доступен ли его контент. Рабочий предварительный просмотр не устанавливает, что загрузка SDK удалась. Включите идентификатор запуска, идентификатор артефакта и ошибку загрузки в [Диагностический отчет](../guides/troubleshooting.md); Опустить токены аутентификации. Тот же сбой может повлиять на команду CLI `artifacts download`.

## Проверить готовность и подготовить Codex {/* #runtime-api */}

| Метод SDK | Ресурс HTTP | Цель |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | Проверить готовность и дальнейшие действия. |
| `listRuntimes()` | `GET /api/v1/runtimes` | Перечислите структуру, статус, необязательную версию и управляемый / внешний источник. |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | Проверить состояние первой установки. |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | Подготовьте или отремонтируйте управляемый Codex через поддерживаемый поток загрузки. |
| `installCli()` | `POST /api/v1/cli/install` | Установите локальную пусковую установку PATH. |

Мутации установки требуют аутентифицированного локального сервиса. Проверьте возвращенный `ok` и код ошибки. Конфликты конфигурации должны быть решены до повторного использования. Тайм-аут клиента не устанавливает, что принятая установка была отменена. Проверить готовность перед началом другой установки. Для входа в систему подписки или ввода учетных данных с переменным именем окружающей среды используйте [Поток терминальной установки](cli.md#terminal-setup).

## Методы и ресурсы HTTP {/* #methods-and-http-resources */}

| Метод SDK | Ресурс HTTP | Цель |
| --- | --- | --- |
| `listProjects`, `createProject` | ГЕТ/ПОСТ `/api/v1/projects` | Читать/Создавать проекты |
| `updateProject` | ПАТЧ `/api/v1/projects/:id` | Обновление метаданных/контекста проекта |
| `getProjectSessionDefaults`, `updateProjectSessionDefaults` | ПРИВЕТ/ПАТЧ `/api/v1/projects/:id/session-defaults` | Дефолты для вновь созданных сессий |
| `listSessions` | Вставай. `/api/v1/sessions?project=ID` | Читать резюме сессии |
| `getSession` | Вставай. `/api/v1/sessions/:id` | Прочитайте один сеанс |
| `getSessionConfiguration`, `updateSessionConfiguration` | ПРИВЕТ/ПАТЧ `/api/v1/sessions/:id/config` | Конфигурация сессии для чтения/обновления |
| `getAgentRouting`, `updateAgentRouting` | ПРИВЕТ/ПАТЧ `/api/v1/settings/agent-routing` | Глобальный фреймворк/Рецензент/Маршрутизация субагентов |
| `getSessionPlan` | Вставай. `/api/v1/sessions/:id/plan` | Читать активный план государства |
| `respondSessionPlan` | ПОСТ `/api/v1/sessions/:id/plan/respond` | Ответьте точным решением/версией/пересмотром |
| `startRun` | ПОСТ `/api/v1/runs` | Признайся в пробежке |
| `getRun`, `cancelRun` | Вставай. `/api/v1/runs/:id`Пост. `/api/v1/runs/:id/cancel` | Проверка/отмена исполнения |
| `listArtifacts` | Вставай. `/api/v1/sessions/:id/artifacts` | Читаем управляемые выходные дескрипторы |
| `downloadArtifact` | Реакция на загрузку Artifact | Поток сохраненного вывода; Потребляйте возвращенный орган реагирования |
| `waitForRun` | Опрос SDK о статусе бега | Подождите с вариантами отмены / дедлайна |
| `events` | Итератор событий SDK | Наблюдайте за упорядоченной активностью и повторно подключайте / синхронизируйте сигналы |

[Определения методов и точные маршруты](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs) является авторитетным поиском подписей запросов. Таблица не позволяет вызывать произвольные электронные/внутренние конечные точки.

### Методы управления Connector {/* #connector-management-methods */}

| Метод SDK | Ресурс HTTP |
| --- | --- |
| ListConnectors() | GET/api/v1/коннекторы |
| GetConnector(id) | GET/api/v1/коннекторы:id |
| setConnectorEnabled(id, enabled) | PUT/api/v1/connectors/:id/enabled |
| AddConnector (запрос) | POST/api/v1/коннекторы |
| ОбновлениеConnector(id, request) | PATCH/api/v1/коннекторы/:id |
| Удалить коннектор(id) | DELETE/api/v1/коннекторы/:id |
| TestConnector(id) | POST/api/v1/коннекторы/:id/test |
| ListCredentials() | GET /api/v1/credentials |
| CreateCredential (запрос) | POST/api/v1/credentials |
| UpdateCredential (id, request) | PATCH /api/v1/credentials/:id |

Методы принимают варианты запроса в качестве окончательного аргумента. Используйте возвращенные стабильные идентификаторы. Только пользовательские определения MCP поддерживают создание/редактирование/удаление; Обновления требуют транспортировки и сохранения опущенных учетных данных. Читайте точные типы запросов, прежде чем создавать мутацию.

<p className="example-label"><strong>Пример</strong> Тестирование сконфигурированного Connector</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector` открывает изолированное соединение, находит инструменты и закрывает его. Он не использует исследовательский инструмент, не включает Connector и не инициирует первый вход в OAuth. Пользовательские изменения MCP/credentic требуют локальной аутентификации; Метаданные учетных данных опускают сырые секреты.

## Идентификация выполнения и конфигурации {/* #run-and-configuration-identity */}

<p className="example-label"><strong>Пример</strong> Начните задачу, которая приостанавливается для утверждения плана</p>

```js
const run = await client.startRun({
  project: projectId, // a returned ID
  prompt: 'Inspect the available project inputs and propose an analysis plan.',
  permissionProfile: 'ask',
  turnIntent: 'plan-first',
});
const state = await client.waitForRun(run.id, {
  timeoutMs: 120000,
  returnOnAttention: true,
});
console.log(state);
```

План ожидания может вернуть все еще работающий объект с помощью `attention.kind === 'plan-approval'`. Прочтите активный план и его версию/пересмотр, прежде чем отвечать. Чтобы визуально рассмотреть, откройте печатную сессию в заявке, утвердите или пересмотрите план там, затем возобновите `waitForRun(run.id)`. Для принятия решений только для API используйте `getSessionPlan` и `respondSessionPlan` с точной версией / редакцией; См. [Планировать команды](cli.md). Обычный запрос на разрешение не становится таким же структурированным состоянием внимания.

| Ввод/состояние | Правило |
| --- | --- |
| `cwd` | Если он поставляется через SDK/HTTP, он должен быть абсолютным. Сервер канонизирует и проверяет существующий читаемый/записываемый каталог |
| Уже существует `sessionId` + `cwd` | Должен решиться на запись директории этой сессии |
| опущенный `cwd` | Используйте рабочее пространство, управляемое приложением |
| Внешнее рабочее пространство | Остается в собственности абонента и не удаляется приложением |
| Конфигурация сеанса писать | использование `expectedRevision`; Отвергнуть устаревшие записи |
| Проектный дефолт написать | использование `expectedUpdatedAt` плюс `patch`; Отклонить параллельные правки |
| Преимущество новой сессии | Явный запрос запуска → Дефолты проекта → Настройки приложений → По умолчанию провайдера |
| Измененные дефолты проектов | Повлияют на новые сессии; Не переписывать существующие сессии |

Прочитайте конфигурацию перед ее редактированием. Изменение поставщика/модели/усилия представляет собой сложную конфигурацию, и для выбранной структуры должны быть доступны ресурсы, на которые делается ссылка. Сохраняйте опущенные настройки, если они не были намеренно очищены.

## Сроки и повторная идентификация {/* #deadlines-and-retry-identity */}

Клиент запрашивает крайний срок по умолчанию до 30 секунд и остается активным при потреблении тела ответа. Установите `requestTimeoutMs` при настройке соединения/клиента или `{signal, timeoutMs}` в окончательном аргументе поддерживаемого метода. `downloadArtifact` сохраняет свой крайний срок, пока возвращается тело.

`waitForRun` имеет свой собственный общий тайм-аут и сигнал, применяемый к запросам и задержкам голосования. Время ожидания не отменяет работу сервера. Позвоните `cancelRun(run.id)` явно, когда отмена предназначена, и дождитесь окончательной доработки, прежде чем рассматривать артефакты как урегулированные.

Для создания безопасного проекта и запуска приема, пройдите `idempotencyKey` в аргументе окончательных вариантов и повторно используйте тот же ключ с тем же корпусом. Повторение ограничено и локально, сохраняется до 24 часов, пока демон продолжает работать. Измененные тела возвращают `idempotency_conflict`; Исчерпанный реестр воспроизведения может вернуть `idempotency_unavailable`. Перезапуск демона не является надежной гарантией перезапуска.

## Границы потока событий {/* #event-stream-boundaries */}

Подписывайтесь и ждите `events.ready` перед началом работы, если вам нужны самые ранние события запуска. Итератор несет последовательность и идентификаторы запуска/сессии/проекта. `run.progress` включает нейтральные фазы провайдера и десятисекундные обновления до первого видимого выхода провайдера. Подготовка сеанса перед запуском регистрации находится за пределами этого потока.

| сигнальный сигнал | Толкование | Ответ |
| --- | --- | --- |
| `events.ready` отказ | Связь не удалась до пригодной для использования жизни | Воссоединиться после устранения причины |
| По умолчанию 30-секундный тайм-аут | Ни одно событие / контрольное сердцебиение не прибыло | Проверить соединение; Это не модель исполнения тайм-аута. |
| `event_stream_invalid_message` | Неправильная структура событий | Перестаньте потреблять этот поток и восстановите государство. |
| `event_stream_overflow` | Потребительский отставание превышает события 1,024 | Управляйте обратным давлением и перечитывайте авторитетное состояние |
| `stream.resync-required` | Срок действия суффикса повтора истек или поток изменился | Скачать текущую версию Run/Session через HTTP |

Связь сердцебиения являются контрольные рамки и не приводятся в качестве обычных исследовательских событий. Повторное подключение ограничено и относится к текущему процессу. Сохраняйте идентификаторы артефактов и состояние конечного запуска, необходимое для вашей собственной интеграции.

[Источник SDK](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs), [Контракты SDK](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md). [CLI](./cli.md) для автоматизации оболочки и [Безголовый сервис](./server.md) для обнаружения / жизненного цикла.

Источники: [подписи](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts), [маршруты](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs). См. [Поля управления CLI](cli.md#manage-connectors-and-credentials) для конфигурационных и диагностических границ.

## Незапланированные задания {/* #unattended-runs */}

Установите `permissionPrompts: 'none'` на вход `startRun`, соответствующий CLI `--permission-prompts none`. Сохраните соответствующий `permissionProfile`: этот вариант уменьшает неразрешенные взаимодействия человека и не расширяет разрешения. Не комбинируйте его с `planFirst: true`.

Хозяин должен заявить о возможности `permission-prompts-none`; В противном случае клиент сообщает `unsupported_capability` перед запуском. Эта политика применяется только к текущему призыву. Обработайте фактический статус и ошибку пробега, как обычно. Смотрите [Без присмотра CLI работает](cli.md#unattended-runs).
