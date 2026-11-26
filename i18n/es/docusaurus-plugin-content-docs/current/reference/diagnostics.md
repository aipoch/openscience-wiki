---
title: "Arquitectura y diagnósticos"
last_update:
  date: '2026-11-25'
---

# Arquitectura y diagnósticos {/* #architecture-and-diagnostics */}

Localice un fallo por el componente que posee la operación. Una respuesta modelo exitosa, un cálculo exitoso y un artefacto salvado verificado son diferentes observaciones; recoger las pruebas para la etapa que falló.

## Arquitectura y propiedad {/* #architecture-and-ownership */}

```mermaid
flowchart LR
  UI[Desktop or browser interface] --> MAIN[Shared Node backend]
  MAIN --> STORE[Settings, database and managed files]
  MAIN --> AGENT[Agent framework and model provider]
  MAIN --> NB[Notebook runtime]
  MAIN --> SERVICES[Connectors and Compute Hosts]
  AGENT --> EVENTS[Messages and tool events]
  NB --> EVENTS
  SERVICES --> EVENTS
  EVENTS --> UI
  MAIN --> ART[Artifact versions and provenance]
  ART --> UI
```

| Componente | Owns | Pruebas para inspeccionar |
| --- | --- | --- |
| Renderer y vista previa | Mostrar estado, controles, contenido de archivo renderizado | Page, seleccionado proyecto/sesión, nombre de archivo, error de vista previa |
| Node backend | Operaciones persistentes, servicios de aplicaciones y límites de acceso | Error de operación y diagnósticos asociados |
| Marco de agente/providente | Conexión modelo, protocolo de ejecución de tareas y flujo de respuesta | Marco/providente/modelo, prueba de conexión, herramienta de falla o giro |
| Notebook | Intérprete, ejecución de códigos, salidas y variables en vivo | ID/versión de tiempo de ejecución, celda de falla, stdout/stderr y registro de ejecución |
| Conector | Solicitud de servicio externo | Connector/nombre de herramientas, insumos sanitarios, estado/error del servicio |
| Host de carga remota | Acceso a la SSH y empleos directos y programados | Host/mode, resultado de sonda, ID de trabajo y registros remotos |
| Repositorio de artefactos | Administrar versiones, cheques y pruebas capturadas | ID de archivo/versión, estado de contenido, fichas de código/medio/revisión |

El camino de escritorio cruza el límite API precarga. El acceso del navegador utiliza el transporte de servicio local protegido de la aplicación; ver [Servicio sin cabeza y acceso al navegador](server.md). El navegador no es una segunda base de datos de investigación independiente.

## Distinguir el contenido de las pruebas {/* #distinguish-content-from-evidence */}

| Estado o mensaje | Interpretación | Siguiente verificación |
| --- | --- | --- |
| Contenido del artefacto disponible | Los bytes de la versión seleccionada son legibles y pasan el cheque de integridad aplicable | Inspeccione si el resultado científico es correcto |
| Contenido no disponible: falta | El contenido esperado no se puede encontrar | Preserve la identidad de la versión e investigue disponibilidad de almacenamiento |
| Contenido no disponible: checksum desajusttch | El contenido no coincide con su valor de integridad registrado | Retener el diagnóstico; no sustituya silenciosamente los bytes y lo llame la misma versión |
| Captura parcial del medio ambiente | El registro ambiental es incompleto | Lea advertencias de captura y retenga detalles de intérprete/paquete de forma independiente |
| Registro de ejecución herido | Sólo se mantuvieron pruebas de ejecución inmutables vinculadas | Inspeccione advertencias de brecha y el Notebook en vivo donde esté disponible |
| No hay ninguna revisión para esta versión | No se adjunta el resultado del examen | No reporte la versión revisada |

Estos estados pueden coexistir. Inspeccione la integridad del contenido, evidencia de ejecución y estado de revisión por separado.

## Búsqueda de errores {/* #error-lookup */}

| Superficie de falla | Lookup canonical |
| --- | --- |
| Modelo/API, Connector o HTTP proxy | [Códigos de estado HTTP](../guides/troubleshooting.md#http-errors-400-403-429-and-5xx) |
| La aplicación no puede abrir su base de datos | [Códigos de inicio de bases de datos](../guides/troubleshooting.md#database-startup-errors) |
| Importaciones Notebook, caminos de archivo y permisos | [Mensajes de error](../guides/troubleshooting.md#match-the-error-message) |
| Transporte SSH, caminos remotos y estado de trabajo | [Errores remotos](../guides/remote-compute.md#resolve-ssh-and-job-errors) |
| Publicar la comunicación y la ayuda comunitaria | [Informar un error o preguntar a la comunidad](../guides/troubleshooting.md#report-a-bug-or-ask-the-community) |

Mantenga la fuente del error con su identificador. Un errno del sistema operativo, una excepción Python, un código de error de trabajo remoto y el estado HTTP del proveedor no son intercambiables. Copiar el mensaje acompañante y la causa anida cuando esté disponible; un identificador puede cubrir varios caminos de falla.

## Preserve un registro de diagnóstico útil {/* #preserve-a-useful-diagnostic-record */}

Grabar la versión de la aplicación, sistema operativo, proyecto/sesión afectado, operación, resultado esperado, error exacto y lo que sucedió inmediatamente antes. Incluya el tiempo de ejecución y el checksum de entrada cuando se trata de un cálculo; incluir la versión del artefacto o la identificación de trabajo remota cuando existe.

Utilice una vista de registro **Details**, **Detalles de diagnóstico** o para retener la causa del error, en lugar de sólo su encabezado corto. Reproduce con entrada pública o mínima cuando sea posible. Inspeccione todo lo que comparta para fichas de cuenta, encabezados, caminos privados y contenido de investigación.

El logger de proceso principal escribe líneas JSON estructuradas. Sus archivos rotatorios por defecto en 5 MiB y mantener tres archivos en total; un comportamiento especial de escritura mortal puede exceder el límite ordinario por un registro. Por lo tanto, los registros tienen una ventana de retención y no son una pista de auditoría permanente. Un campo de diagnóstico también puede ser truncado. Preserve un registro relevante poco después del fracaso y distinguir la ausencia de la prueba de que un evento nunca ocurrió.

Fuente: [logger y retención](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/logger.ts), [Reproducción diagnóstica](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/diagnostic-redaction.ts), [limitado Notebook detalle de falla](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/failure-diagnostic.ts) y [estado del contenido del artefacto](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/artifacts/provenance-content-status.ts).

En primer lugar, distinguir una operación fallida del refresco/limpia fallido después de un cambio cometido, y distinguir la terminación del trabajo de fondo de la entrega de resultados. Inspeccione el estado salvado antes de reintentar una mutación. El [Cuadro de recuperación](../guides/troubleshooting.md#recovery-messages) de cara al usuario cubre la restauración de colas bloqueadas, referencias retenidas PDF, ediciones de colección de estalas y mensajes de instalador Windows. [Tareas en segundo plano](../guides/notebook.md#background-tasks-and-result-delivery) explica el estado de ejecución; Los errores de control remoto siguen separados de los resultados finales del trabajo.


## Archivo de diagnóstico de sesión {/* #session-diagnostic-archive */}

**Export diagnostics…** recoge metadatos de sesión elegidos, registros de bases de datos y metadatos de registro de aplicaciones disponibles en un archivo local con un registro de manifiesto y exportación. Las fuentes desaparecidas no detienen toda la exportación; fuentes grandes o dañadas pueden producir resúmenes. Los registros de aplicaciones actuales e históricos pueden cubrir la actividad fuera de la sesión seleccionada, así que revise las fuentes seleccionadas y capture los resultados.

Las fuentes ordinarias de metadatos excluyen los campos de contenido privado. Después de un fallo sensible-contenido paquete-exportación, el diálogo también puede ofrecer evidencia de escáner redacted y archivos originales marcados. Los archivos originales no se verifican por defecto; La selección explícita incluye sus bytes originales. Exportar no hace ninguna carga o solicitud de modelo. Inspeccione el archivo resultante antes de compartir. No reemplaza una copia de seguridad de paquete de investigación o una reproducción mínima. Ver [el procedimiento de exportación ilustrado](../guides/troubleshooting.md#session-diagnostics).

## El escritorio y el backend son procesos separados {/* #node-backend */}

Desde v0.37.0, Electron posee la cáscara de escritorio nativa mientras que un backend Node común posee servicios compartidos. El escritorio, Web UI, CLI y SDK pueden conectarse a ese mismo backend. Identificar el directorio de configuración, versión y puerto real con `status --json` cuando un cliente no puede conectarse. Una ventana de escritorio visible por sí sola no prueba que el backend es saludable. Siga a [propiedad de backend](server.md#backend-ownership) antes de detenerlo.
## Configurar el rastreo del agente {/* #agent-tracing */}

Usa esto cuando necesites inspeccionar un agente incorporado girar las solicitudes de modelos y las herramientas MCP. Suministrar un receptor OTLP/HTTP JSON como un coleccionista de OpenTelemetry o Langfuse. Open-Science no proporciona un servicio de recogida operado por la aplicación. El punto final debe ser la URL de la ingestión completa; un coleccionista genérico utiliza `/v1/traces`, mientras que Langfuse utiliza `/api/public/otel/v1/traces`.

La persona que opera el backend configura los interruptores de endpoint, autenticación y captura en su configuración de lanzamiento. Para una aplicación instalada, el `.env` del directorio activo es compatible (generalmente `~/.open-science/.env`). Terminar el trabajo activo y reiniciar ese backend después de cambiar su configuración de lanzamiento. Esto es separado de guardar un ajuste de proyecto.

<p className="example-label"><strong>Ejemplo</strong> Un receptor local con captura de contenido deshabilitado</p>

```dotenv
OPEN_SCIENCE_AGENT_OTLP_TRACES_ENDPOINT=http://127.0.0.1:4318/v1/traces
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_CONTENT=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_API_REQUEST=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_ARGUMENTS=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_RESULTS=0
OPEN_SCIENCE_AGENT_OTLP_DIAGNOSTICS=1
```

Este ejemplo asume un receptor que ya escucha en la dirección de vuelta del backend. No instala uno. Para otro host, utilice su URL de ingestión real y la autenticación necesaria; ver el [configuración oficial del receptor](https://github.com/aipoch/open-science/blob/v1.3.4/docs/development-quick-reference.md#open-science-agent-traces) y [ejemplos de medio ambiente](https://github.com/aipoch/open-science/blob/v1.3.4/.env.example). Mantenga secretos de receptor fuera de los avisos y capturas de pantalla compartida.

### Elija el detalle de captura {/* #choose-capture-detail */}

El trazado del proyecto está **desactivado por defecto**. Sin embargo, cada uno de los cuatro ajustes de captura siguientes vale **`1` (activado)** cuando se omite. Establezca los cuatro explícitamente en `0` para capturar solo metadatos. Son ajustes de inicio, no interruptores adicionales en el diálogo del proyecto.

| Ajuste sufijo después `OPEN_SCIENCE_AGENT_OTLP_` | Contenido incluido cuando se establece `1` |
| --- | --- |
| `CAPTURE_CONTENT` | Extractos de la instrucción y de la respuesta final |
| `CAPTURE_API_REQUEST` | Solicitud de modelo JSON, incluyendo potencialmente instrucciones, historia, datos de herramientas y archivos adjuntos |
| `CAPTURE_TOOL_ARGUMENTS` | MCP herramienta de entrada previsualizaciones |
| `CAPTURE_TOOL_RESULTS` | MCP herramienta de salida previsualizaciones |

Los rastros sólo de metadatos todavía describen las operaciones. Revise el receptor y sus reglas de acceso antes de permitir un proyecto con datos de investigación privados.

### Activar y comprobar la entrega {/* #enable-and-check-delivery */}

Abrir [Configuración del proyecto](../guides/projects.md#agent-tracing), activar **Agent tracing** y guardar. Utilice el **Open-Science Agent** incorporado para una pequeña solicitud. Busque el servicio `open-science-agent` en el receptor e inspeccione el giro, solicitud y los lados de herramientas correlativos que la tarea realmente produjo.

Con diagnóstico habilitado para la configuración `.env`, inspeccionar el `.env.otel-status.json` adyacente para el estado de carga. Si no llegan rastros, compruebe el perfil activo, el interruptor de proyecto, el tiempo de ejecución, el punto final completo, la disponibilidad del receptor y las credenciales. La entrega es asincrónica: una respuesta completa del Agente no prueba la carga exitosa. Desactivar el rastreo deja de capturar el futuro; no elimina los registros ya en el receptor.
