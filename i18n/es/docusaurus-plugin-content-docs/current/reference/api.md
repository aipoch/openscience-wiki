---
title: "Tarea SDK y API local"
last_update:
  date: '2026-09-22'
---

# Tarea SDK y API local {/* #task-sdk-and-local-api */}

El cliente `@aipoch/open-science` Node.js se conecta a un servicio de aplicación local autenticado para gestionar tareas, sesiones, conectores y credenciales compartidas. Los métodos de SDK públicos están separados de las llamadas precarga de Electron y las API internas de `host` del agente.

<span id="connect-and-select-real-ids" />

## Conectar, ejecutar una tarea y descargar su salida {/* #connect-run-a-task-and-download-its-output */}

<p className="example-label"><strong>Ejemplo</strong> Guardar y descargar una nota de conexión</p>

Use Node.js 22.5 o más tarde. Abra la aplicación de escritorio instalada en la misma máquina, termine la configuración del modelo y manténgalo en funcionamiento. El SDK utiliza el descubrimiento del servicio local y su token almacenado localmente. Para un daemon separado, primero siga [Servicio sin cabeza](server.md).

En una carpeta de trabajo vacía, instalar el cliente:

```bash
npm init -y
npm install @aipoch/open-science
```

Guardar lo siguiente como `connection-check.mjs`. Ejecute `node connection-check.mjs` para listar los IDs del proyecto, luego `node connection-check.mjs PROJECT_ID` con un ID devuelto. La primera invocación se detiene deliberadamente después de la inclusión de proyectos; el segundo crea una pequeña tarea.

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

Mantenga la sesión de escritorio abierta. Responde allí si **Ask for approval** detiene la tarea. Un tiempo de espera detiene la encuesta del cliente; no cancela la carrera. Inspeccione el ID de ejecución impreso con `getRun`, siga esperando después de resolver la solicitud, o llame a `cancelRun` cuando tenga la intención de detenerlo. La descarga sólo tiene éxito cuando existe un artefacto guardado en combinación; abrir el Markdown descargado para terminar el cheque.

Este programa demuestra el contrato público API. No supone que un modelo guarde siempre el archivo solicitado. Si el paquete npm no puede instalarse, utilice la carpeta SDK enviada con el checkout de fuente correspondiente como el paquete local; confirmar sus metadatos de paquete antes de la instalación.

### Una tarea completa cuyo archivo no descargará {/* #a-completed-task-whose-file-will-not-download */}

Una causa de este error — la identidad de la versión perdida en los registros de tareas completados— fue fijada en el [descarga actualización](../changelog/v0.29.0.md). En una aplicación más antigua, actualice antes de reiniciar el mismo archivo guardado. Otras causas HTTP 500 aún requieren diagnóstico.

La terminación de tareas y la descarga de artefactos son cheques separados. Si `downloadArtifact` devuelve HTTP **500** / `internal_error`, llame a `getRun` y `listArtifacts` para confirmar el estado de tarea y retener el ID de artefacto devuelto exacto. No empiece la misma tarea de investigación de nuevo sólo para reiniciar una descarga.

Abra el artefacto en la aplicación y compruebe si su contenido está disponible. Una vista previa de trabajo no establece que la descarga SDK tuvo éxito. Incluya el ID de ejecución, el ID de artefacto y el error de descarga en un [Informe de diagnóstico](../guides/troubleshooting.md); Omitir fichas de autenticación. El mismo fallo puede afectar al comando CLI de `artifacts download`.

## Inspeccionar la preparación y preparar Codex {/* #runtime-api */}

| Método SDK | Recursos HTTP | Propósito |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | Inspeccione la preparación y las próximas acciones. |
| `listRuntimes()` | `GET /api/v1/runtimes` | Marco de lista, estado, versión opcional y fuente administrada/externa. |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | Inspeccione el estado de configuración de primera ejecución. |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | Preparar o reparar el tiempo de ejecución Codex gestionado a través del flujo de arranque soportado. |
| `installCli()` | `POST /api/v1/cli/install` | Instala el lanzador local de PATH. |

Las mutaciones de configuración requieren el servicio local autenticado. Compruebe el `ok` devuelto y el código de error; los conflictos de configuración deben resolverse antes de reintentar. Un tiempo de espera del cliente no establece que una instalación aceptada fue cancelada. Reprueba la preparación antes de comenzar otra instalación. Para la entrada de suscripción o entrada credencial variable llamada-ambiente, utilice el [flujo de configuración terminal](cli.md#terminal-setup).

## Métodos y recursos HTTP {/* #methods-and-http-resources */}

| Método SDK | Recursos HTTP | Propósito |
| --- | --- | --- |
| `listProjects`, `createProject` | GET/POST `/api/v1/projects` | Leer/crear proyectos |
| `updateProject` | PATCH `/api/v1/projects/:id` | Actualización de los metadatos/contexto del proyecto |
| `getProjectSessionDefaults`, `updateProjectSessionDefaults` | GET/PATCH `/api/v1/projects/:id/session-defaults` | Defaults for newly created sessions |
| `listSessions` | ¡Vamos! `/api/v1/sessions?project=ID` | Leer resúmenes de sesión |
| `getSession` | ¡Vamos! `/api/v1/sessions/:id` | Leer una sesión |
| `getSessionConfiguration`, `updateSessionConfiguration` | GET/PATCH `/api/v1/sessions/:id/config` | Configuración de sesión de lectura/actualización |
| `getAgentRouting`, `updateAgentRouting` | GET/PATCH `/api/v1/settings/agent-routing` | Marco global/Revisor/Responsabilidad |
| `getSessionPlan` | ¡Vamos! `/api/v1/sessions/:id/plan` | Lea el estado del plan activo |
| `respondSessionPlan` | POST `/api/v1/sessions/:id/plan/respond` | Responder a la decisión/versión/revisión exacta |
| `startRun` | POST `/api/v1/runs` | Admitir una carrera |
| `getRun`, `cancelRun` | ¡Vamos! `/api/v1/runs/:id`, POST `/api/v1/runs/:id/cancel` | Ejecución de inspeccionar/cancelar |
| `listArtifacts` | ¡Vamos! `/api/v1/sessions/:id/artifacts` | Descriptores de salida gestionados |
| `downloadArtifact` | Respuesta de descarga de artefactos | Aumentar una salida ahorrada; consumir el cuerpo de respuesta devuelto |
| `waitForRun` | Encuestas SDK sobre el estado de ejecución | Espera con opciones de cancelación/deadline |
| `events` | Iterador del evento SDK | Observe la actividad ordenada y vuelva a conectar/resync señales |

[Definiciones de métodos y rutas exactas](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs) son la búsqueda autorizada para las firmas de solicitud. La tabla no es el permiso para llamar a puntos finales arbitrarios Electron/internal.

### Métodos de gestión de Connector {/* #connector-management-methods */}

| Método SDK | Recursos HTTP |
| --- | --- |
| listConnectors() | Obtener /api/v1/connectors |
| getConnector(id) | Obtener /api/v1/connectors/:id |
| setConnectorEnabled(id, habilitado) | PUT /api/v1/connectors/:id/enabled |
| addConnector(request) | POST /api/v1/connectors |
| ActualizaciónConnector(id, request) | PATCH /api/v1/connectors/:id |
| removeConnector(id) | DELETE /api/v1/connectors/:id |
| testConnector(id) | POST /api/v1/connectors/:id/test |
| listCredentials() | Obtener /api/v1/credentials |
| createCredential(request) | POST /api/v1/credentials |
| updateCredential(id, request) | PATCH /api/v1/credentials/:id |

Métodos aceptan opciones de solicitud como el argumento final. Use IDs estables devueltas. Sólo las definiciones personalizadas de MCP admiten crear/edit/remove; las actualizaciones requieren el transporte y la preservación de las uniones credenciales omitidas. Lea los tipos de petición exacta antes de construir una mutación.

<p className="example-label"><strong>Ejemplo</strong> Prueba un Connector configurado</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector` abre una conexión aislada, descubre herramientas y la cierra. No invoca una herramienta de investigación, permite el Connector o inicia el inicio de sesión OAuth. Los cambios aduaneros MCP/credenciales requieren autenticación local; metadatos credenciales omite secretos crudos.

## Identidad de ejecución y configuración {/* #run-and-configuration-identity */}

<p className="example-label"><strong>Ejemplo</strong> Iniciar una tarea que pausa para la aprobación del plan</p>

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

Un plan de espera puede devolver un objeto que sigue funcionando con `attention.kind === 'plan-approval'`. Lea el plan activo y su versión/revisión antes de responder. Para revisar visualmente, abra la sesión impresa en la aplicación, apruebe o revise el plan allí, luego vuelva a `waitForRun(run.id)`. Para las decisiones sólo API, utilice `getSessionPlan` y `respondSessionPlan` con esa versión/revisión exacta; ver [plan comandos](cli.md). Un aviso de permiso ordinario no se convierte en el mismo estado de atención estructurado.

| Entrada/estado | Artículo |
| --- | --- |
| `cwd` | Si se suministra a través de SDK/HTTP, debe ser absoluto; servidor canonicaliza y comprueba un directorio legible/escrito |
| Existente `sessionId` + `cwd` | Debe resolver el directorio registrado de esa sesión |
| Omitido `cwd` | Use un espacio de trabajo gestionado por aplicaciones |
| Espacio de trabajo externo | Permanece propiedad de los calladores y no se elimina por la aplicación |
| Configuración de sesión | Usos `expectedRevision`; rechazan los escritos finales |
| Project-default write | Usos `expectedUpdatedAt` más `patch`; rechazar ediciones concurrentes |
| Precedencia de la nueva sesión | Explicit run request → predeterminados del proyecto → configuración de la aplicación → predeterminado del proveedor |
| Modificación de los defectos del proyecto | Afectar nuevos períodos de sesiones; no reescribir las sesiones existentes |

Lea la configuración antes de editarla. Un cambio de proveedor/modelo/effort es una configuración compuesta, y los recursos referenciados deben estar disponibles en el marco seleccionado. Preserve omitió los ajustes a menos que los limpie deliberadamente.

## Deadlines and retry identity {/* #deadlines-and-retry-identity */}

El cliente solicita el plazo predeterminado a los segundos 30 y sigue activo mientras consume el cuerpo de respuesta. Establecer `requestTimeoutMs` en conexión/configuración de cliente, o `{signal, timeoutMs}` en el argumento de opciones finales de un método compatible. `downloadArtifact` retiene su fecha límite mientras que las corrientes de cuerpo devueltas.

`waitForRun` tiene su propio tiempo y señal general, aplicado a las solicitudes de votación y demoras. Un tiempo de espera no cancela el servidor. Llame a `cancelRun(run.id)` explícitamente cuando la cancelación está destinada y espere la finalización antes de tratar los artefactos como resuelto.

Para la creación de proyectos de retry-safe y la admisión de ejecución, pasar un `idempotencyKey` en el argumento de opciones finales y reutilizar la misma clave con el mismo cuerpo. La repetición está atada y local de proceso, retenida hasta 24 horas mientras el daemon se mantiene en funcionamiento. Los cuerpos cambiados devuelven `idempotency_conflict`; un registro de repetición agotado puede devolver `idempotency_unavailable`. Un reinicio de daemon no es una garantía de repetición duradera de reinicios cruzados.

## Fronteras de la secuencia de eventos {/* #event-stream-boundaries */}

Suscríbete y espera a `events.ready` antes de comenzar el trabajo si necesitas los primeros eventos de ejecución. El iterador lleva identificadores de secuencia y ejecución/sesión/proyecto. `run.progress` incluye fases neutros de proveedores y actualizaciones de vida de 10 segundos antes de la primera salida del proveedor visible; preparación de sesión antes de ejecutar el registro está fuera de esa corriente.

| Signal | Interpretación | Respuesta |
| --- | --- | --- |
| `events.ready` rechazo | La conexión fracasó antes de una vida útil | Reconectar después de resolver la causa |
| Default 30-second idle timeout | No llegó el latido del corazón de suceso/control | Controlar la conexión; este no es un tiempo de ejecución modelo |
| `event_stream_invalid_message` | Marco de evento malformado | Deja de consumir esa corriente y restablecer el estado |
| `event_stream_overflow` | El atraso de los consumidores supera los eventos 1,024 | Represión de la mano y releer estado autoritario |
| `stream.resync-required` | Sufijo de repetición expirado o el flujo cambiado | Corriente/Sesión a través de HTTP |

Los latidos cardíacos de conexión son marcos de control y no se rinden como eventos de investigación ordinarios. Reconectar la repetición está ligada y pertenece al proceso actual. Persiste las identificaciones de artefactos y el estado de ejecución final necesario por tu propia integración.

[Fuente SDK](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs), [Notas contractuales SDK](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md). Vea [CLI](./cli.md) para la automatización de conchas y [Servicio sin cabeza](./server.md) para el descubrimiento/ciclo de vida.

Fuentes: [firmas](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts), [rutas](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs). Vea [Campos de gestión CLI](cli.md#manage-connectors-and-credentials) para configuración y límites de diagnóstico.

## Tareas no previstas {/* #unattended-runs */}

Establecer `permissionPrompts: 'none'` en la entrada `startRun`, correspondiente a CLI `--permission-prompts none`. Mantener un `permissionProfile` adecuado: esta opción disminuye las interacciones humanas sin resolver y no amplía los permisos. No lo combine con `planFirst: true`.

El anfitrión debe declarar la capacidad `permission-prompts-none`; de lo contrario el cliente informa `unsupported_capability` antes de crear la carrera. Esta política se aplica únicamente a la invocación actual. Maneja el estado y el error de la carrera como siempre. Ver [CLI no tripulado](cli.md#unattended-runs).
