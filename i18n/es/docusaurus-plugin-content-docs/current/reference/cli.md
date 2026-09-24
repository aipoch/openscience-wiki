---
title: "CLI y salida estructurada"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLI y salida estructurada {/* #cli-and-structured-output */}

Utilice `open-science` para inspeccionar el estado de aplicación, ejecutar tareas, gestionar conectores y credenciales, y operar el servicio local. Comience con el lanzador instalado y confirme a qué instancia local se conecta.

<PlatformGuide />

## Configuración desde una terminal {/* #terminal-setup */}

Instala la aplicación de escritorio primero y haz que su comando `open-science` esté disponible. El CLI utiliza el backend de la aplicación; no es un daemon de npm separado. Los paquetes de Debian incluyen el comando. Cuando el lanzador esté desaparecido, siga la configuración del lanzador de la plataforma o utilice la entrada CLI instalada, luego `open-science cli install`.

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init` crea el directorio de configuración sin iniciar la aplicación. `--profile` es un alias para `--config-root` para perfiles de desarrollo apoyados; La startup empaquetada rechaza estas anulaciones. Utilice un perfil diseñado de forma consistente. `runtime list` muestra la preparación del marco detectado, versión y fuente administrada/external sin exponer caminos ejecutables.

Para una configuración Codex no configurada:

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

Siga el flujo de entrada. Esto prepara o repara el tiempo de ejecución gestionado Codex y registra la suscripción a través de la aplicación; no importa archivos de inicio de sesión externos Codex. El bootstrap de primer nivel apunta actualmente a Codex, aunque el listado de tiempo de ejecución incluye otros marcos. Se informa de la configuración conflictiva existente en lugar de sustituirla silenciosamente.

Si utiliza una llave de OpenAI API, utilice `provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`, con un ID de modelo compatible y la clave ya suministrada a través de su entorno de gestión secreta. Para OpenAlex, utilice `connector configure literature --openalex-key-env OPENALEX_API_KEY --json`. Prefijo ambos comandos con `open-science`. Nunca ponga la clave en los argumentos de mando. Un cheque crédencial exitoso no establece que una consulta de investigación completó o que la cuota sigue siendo.

Lea **Listo**, el **cheques** individual y sugirió acciones **siguiente** de `doctor`. Un informe puede salir con éxito mientras `ready` es falso; Si el backend está ausente, el Doctor lo reporta y sale de 3. Complete el requisito reportado, compruebe de nuevo, luego [ejecutar una tarea](#run-input-and-control-flags) en el proyecto previsto.

## Puntos de entrada {/* #entry-points */}

| Entrada | Requisitos | Comando |
| --- | --- | --- |
| El lanzador de aplicaciones instalado | **Settings → General → Command line tool → Install command** | `open-science --help` |
| Comprobación de fuentes | Dependencias de aplicación y repositorio construidas | `node packages/open-science/cli.mjs --help` |
| Npm cliente | Node.js 22.5+ y una aplicación instalada; confirmar la disponibilidad de paquetes antes de la instalación | Identificador del paquete `@aipoch/open-science` |

El lanzador instalado utiliza el tiempo de ejecución de la aplicación. Si su directorio está ausente de PATH, siga la instrucción mostrada del panel General y abra un nuevo terminal. No renombrar el ejecutable para que coincida con la marca de visualización.

<PlatformContent platform="windows">

Después de **Install command**, abra una nueva ventana PowerShell y ejecute:

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

Compruebe que **Source** apunta al lanzador mostrado en General, por lo general un `open-science.cmd` bajo su perfil de usuario. La salida de ayuda exitosa confirma las carreras del lanzador. Si el estado devuelve `{"running":false}`, el CLI no ha reportado un backend en ejecución; esto no significa que la ventana de escritorio está cerrada. Comprueba la instancia indicada usando [Modo de servidor](server.md) antes de enviar tareas o descargar archivos.

</PlatformContent>

## Completa una pequeña tarea de línea de comandos {/* #complete-a-small-command-line-task */}

<p className="example-label"><strong>Ejemplo</strong> Guardar una nota de la línea de comandos</p>

1. Instala el comando usando la entrada anterior. Mantenga la aplicación de escritorio funcionando con un modelo de trabajo.
2. Corre `open-science status --json`, luego `open-science project list --json`. Revise la instancia prevista y copie un ID de proyecto devuelto.
3. Guardar `task.md` con: **Guardar proyecto-note.md que contenga una breve nota de conexión. No lea otros archivos ni use la red.**
4. Ejecute los comandos bajo [Ejecutar banderas de entrada y control](#run-input-and-control-flags). Reemplazar cada marcador de posición sólo después de obtener su identificación del resultado anterior.
5. Si la ejecución se detiene para obtener permiso, responda en su conversación de escritorio. `--wait` puede pasar tiempo mientras la tarea continúa; inspeccionar `run status RUN_ID --json` antes de enviar de nuevo.
6. Seleccione el ID de artefactos Markdown devueltos, descarguelo a un nuevo nombre de archivo local, y abralo. Una ejecución completa sin el artefacto solicitado requiere un seguimiento en esa sesión. Si el artefacto existe pero la descarga falla, siga [recuperación de la descarga del artefacto](./api.md#a-completed-task-whose-file-will-not-download).

Para tareas de planificación, utilice `--return-on-attention`, inspeccione el plan devuelto y responda a través de la aplicación o los comandos del plan a continuación. Para las integraciones de JSON, distinguir correr, completar, fallar y cancelar en lugar de tratar cada respuesta HTTP exitosa como una tarea terminada.

## Familias de mando {/* #command-families */}

| Comando | Argumentos / banderas | Efecto |
| --- | --- | --- |
| `project list` | `--json` | Leer los proyectos disponibles |
| `project create` | Nombre, opcional `--description`, uno de los `--agent-context` / `--agent-context-file` | Crear un proyecto |
| `project update` | ID o nombre exacto, metadatos suministrados/campos contextos | Modificar únicamente los campos suministrados; `--clear-agent-context` explícitamente aclara el contexto |
| `project session-defaults show` | ID del proyecto o nombre exacto | Lea predeterminados para nuevas sesiones |
| `project session-defaults update` | Opciones de proyecto más período de sesiones | Actualizar los defectos con la protección concurrent-edit |
| `run` | `--project`, entrada rápida, opcional `--session`, `--wait` | Iniciar o continuar el trabajo |
| `run status` / `run cancel` | Identificación de ejecución | Inspeccionar o cancelar explícitamente una carrera |
| `session status` | ID de sesión | Leer el estado de sesión |
| `session config show` | ID de sesión | Lee la configuración y la revisión persistentes/eficaces |
| `session config update` | ID de sesión, `--revision`, opciones suministradas | Cambiar el futuro cuando la sesión puede aceptar la actualización |
| `settings agent-routing show/update` | Marco y opciones de revisión/rutamiento subagente | Lea o actualice atómicamente el enrutamiento global |
| `plan show/approve/reject/revise` | ID de sesión; decisión requiere la versión exacta del artefacto y la revisión | Lea o responda al plan activo |
| `artifacts list` | ID de sesión | Leer artefactos salvados |
| `artifacts download` | ID de artefactos, `--output` | Guardar una copia externa |

Use IDs de proyecto en scripts. El CLI puede resolver un nombre de proyecto exacto único; los nombres duplicados son ambiguos. El enrutamiento SDK/HTTP requiere IDs directamente. El contexto del proyecto acepta hasta caracteres 16,000, y los resultados de lista/crear/actualizar exponen `hasAgentContext` en lugar del cuerpo de contexto privado.

Si `artifacts download` falla con HTTP 500, actualice una aplicación anterior y vuelva a introducir el mismo ID de artefacto devuelto. El [Pasos de recuperación](api.md#a-completed-task-whose-file-will-not-download) distingue una tarea completa de una transferencia de archivos fallida; no vuelva a ejecutar la tarea de investigación sólo para obtener su salida existente.

## Gestionar conectores y credenciales {/* #manage-connectors-and-credentials */}

Estos comandos utilizan el backend de ejecución y Ajustes guardados. Confirme el caso indicado antes de editarlo. Los escritos personalizados Connector y credencial requieren una conexión autenticada local; para un servidor, ejecute el CLI en ese servidor, incluso a través de SSH.

| Comando | Entrada / resultado |
| --- | --- |
| lista de conectores de ciencia abierta --json | Vistas seguras de los conectores disponibles |
| open-science connector show CONNECTOR_ID -json | Configuración/establecimiento para un ID devuelto |
| conector de ciencia abierta permite CONNECTOR_ID | Establecer su preferencia habilitada |
| conector de ciencia abierta deshabilitado CONNECTOR_ID | Limpiar su preferencia habilitada |
| conector de ciencia abierta añadir --json | Lea una nueva definición personalizada de MCP de JSON stdin |
| actualización del conector de ciencia abierta CONNECTOR_ID -json | Lea la actualización de configuración de JSON stdin |
| conector de ciencia abierta eliminar CONNECTOR_ID | Eliminar una definición personalizada MCP |
| prueba de conexión de ciencia abierta CONNECTOR_ID -json | Descubre herramientas a través de una conexión separada, luego cierrala |
| open-science credential list --json | Lea metadatos credenciales sin secretos crudos |
| open-science credential add --json | Lea una nueva credencial de JSON stdin |
| open-science credential update CREDENTIAL_ID --json | Actualizar pantallaName y/o secreto de JSON stdin |

<p className="example-label"><strong>Ejemplo</strong> Presentar una configuración local Connector</p>

Presenta tu archivo de configuración local preparado con:

~~~bash
open-science connector add --json < connector.json
~~~

| Campo de configuración | Requisitos |
| --- | --- |
| nombre / displayName | Se requiere para un nuevo Connector personalizado; nombre/ID permanecen estables durante las actualizaciones |
| transporte | stdio, streamable_http o sse; también es necesario para actualizar |
| comando / args | Discusiones locales ejecutables y opcionales para stdio |
| url | Punto final para HTTP/SSE |
| envCredentialIds / headerCredentialIds | Medio ambiente/cabeza nombres para guardar identificaciones credenciales |
| oauthCredentialId | Ajustar una credencial OAuth compartida existente |
| Omitted credential bindings | Preserve salvó valores en la actualización; un ambiente vacío/objeto de unión de encabezado aclara que mapa |

Sólo las definiciones personalizadas de MCP pueden ser agregadas, editadas o eliminadas. **Enabled** es una preferencia de selección, no prueba de conectividad o revocación global del acceso Specialist.

**prueba** no habilita el Connector ni ejecuta sus herramientas de negocio. Devuelve el éxito, la herramienta opcionalCount y un mensaje; El descubrimiento está atado a diez segundos y el fracaso sale sin cero. Los diagnósticos en vivo de Connector Bundled no son compatibles. Pruebas pueden refrescar las fichas OAuth existentes pero no realiza el inicio del navegador.

Credencial escribe aceptar secretos a través de JSON stdin. Mantenerlos fuera de los argumentos de mando y la historia de los proyectiles. Una entrada token utiliza displayName, amable: token y secreto; api_key también es compatible. Encuad al devuelto creadoCredential.id al Connector. Los backends más antiguos sin estos endpoints devuelven un error en lugar de volver a las ediciones directas del archivo Settings.

## Ejecutar banderas de entrada y control {/* #run-input-and-control-flags */}

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

Sustitúyase a los titulares de puestos capitalizados con IDs devueltos. El ejemplo no nombre un Skill inventado o proveedor que debe existir en su instalación.

| Bandera | Contrato |
| --- | --- |
| `--prompt` / `--prompt-file` | Texto en línea o archivo UTF-8; stdin puede proporcionar un aviso cuando se omite |
| `--session` | Continuar el período de sesiones especificado |
| `--cwd` | Directorio de trabajo externo; CLI resuelve un camino relativo, el servidor canonicaliza y lo valida |
| `--approval-profile` | `ask`, `auto`, `full`; por defecto `ask` |
| `--provider` + `--model` / `--provider-default-model` | Seleccione un proveedor configurado y un modelo predeterminado explícito o de propiedad del proveedor |
| `--reasoning-effort` | Listas de ayuda CLI `default`, `low`, `medium`, `high`, `xhigh`, `max`; Las opciones de modelo UI pueden diferir |
| `--skill` | ID Skill instalado repetible; no instala un Skill perdido |
| `--plan-first` | Requiere una respuesta del plan antes de la ejecución |
| `--auto-review` / `--no-auto-review` | Revisión automática de la sesión |
| `--memory` / `--no-memory` | Establecer la memoria del período de sesiones; mutuamente excluyentes |
| `--specialist` | Ajustar una nueva sesión por UUID o nombre de perfil estable; nombre de presentación no es un ID de enrutamiento |
| `--delegation allow/deny` | Control de la admisión de nuevos trabajos delegados; negar no cancela a los niños existentes |
| `--compute-host` | IDs de host configurados repetibles; selecciona objetivos de ejecución, no configura SSH |
| `--enable-compute-host` / `--clear-compute-hosts` | Controles de acceso o incumplimiento de la nueva sesión; los cambios de acceso existentes utilizan la actualización de configuración |

Un `cwd` externo sigue siendo de propiedad de un llamante. Reutilizar `--session` con `--cwd` requiere el mismo directorio canónico; la solicitud de ejecución no reubica la sesión. Omitir una opción host preserva la selección existente; utilizar la operación de aclaración explícita cuando se desee.

## Espera, atención y cancelación {/* #waiting-attention-and-cancellation */}

| Opción/estado | Resultado |
| --- | --- |
| Sin `--wait` | Regresar después de la admisión en ejecución; retenimiento `id` y `sessionId` a la encuesta más tarde |
| `--wait` | Espera a un estado de ejecución terminal |
| `--wait --return-on-attention` | Retorno también cuando se requiere la aprobación del plan estructurado; los avisos de permiso no son la misma condición de atención |
| `--timeout-ms` | Dejar de esperar al cliente después de la fecha límite; el servidor continúa |
| `--cancel-on-timeout` | Cancelación explícita después de un tiempo; el comando sigue informando el tiempo fuera |
| `run cancel RUN_ID` | Esperar la cancelación/finalización; preservar ya terminados los artefactos |

Para la aprobación del plan, primero lea `plan show`, luego provea `--artifact-version` y `--revision`. Una decisión del plan básico no debe aplicarse a un plan más nuevo. Las actualizaciones de la configuración de sesión requieren igualmente la revisión devuelta por `session config show`; las actualizaciones de establos devuelven `session_revision_conflict`. El trabajo activo root-agent, subagent o Notebook puede bloquear una actualización con `session_busy`.

## Códigos de salida y salida estructurados {/* #structured-output-and-exit-codes */}

`--json` emite un resultado. `--jsonl` está disponible con `run --wait`, streams eventos y fines con un resultado de ejecución. No combinar los dos. Los errores se estructuran en el stderr cuando se solicita; parse el `error.code`, no sólo el código de salida del proceso.

Se reprodujo localmente la siguiente respuesta inválida:

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| Código de salida | Significado |
| ---: | --- |
| 0 | El mando tuvo éxito; inspeccionar el estado de ejecución/atención devuelto cuando sea aplicable |
| 1 | Fallo general/corriente, tiempo de salida, conflicto o estado que no reporte ningún servicio de funcionamiento |
| 2 | Uso inválido CLI |
| 3 | Daemon local no disponible |
| 4 | No se ha encontrado el proyecto/run/session/artifact/Specialist solicitado |
| 5 | Trabajo activo bloqueó una actualización de la aplicación |
| 6 | Actualización de aplicaciones requiere un paso de instalación manual |

JSONL puede incluir `run.progress` y `stream.resync-required`. Si la repetición no está disponible después de la reconexión, vuelva a leer el estado de funcionamiento autorizado; no asuma que el flujo del evento es una historia permanente. Los comandos de ciclo de vida tienen restricciones de bandera separadas descritas en [Servicio sin cabeza](./server.md).

[Ejecución de la CLI](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/cli.mjs), [Guía de comandos](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/CLI.md).

Referencia técnica: [Contrato CLI](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## Carreras no solicitadas {/* #unattended-runs */}

Añadir `--permission-prompts none` a `run` para rechazar interacciones humanas sin resolver en lugar de esperar indefinidamente. El perfil de aprobación seleccionado y las becas recordadas siguen siendo aplicables; Se niegan las solicitudes de permiso restantes, se declinan las preguntas de los usuarios y se rechazan los planes que requieren revisión humana. Esto no aprueba todas las acciones.

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

La opción sólo se aplica a esta invocación y no se guarda como una preferencia de sesión. No se puede combinar con `--plan-first`. Inspeccione el estado final y el error: evitar una espera humana no garantiza la terminación de la tarea. El cliente comprueba la capacidad de acogida `permission-prompts-none`; actualizar el cliente y la aplicación que coincida si un host antiguo devuelve `unsupported_capability`.
