---
title: "Solución de problemas y preguntas comunes"
last_update:
  date: '2026-09-24'
---

# Solución de problemas y preguntas comunes {/* #troubleshooting-and-common-questions */}

Encontrar el texto de error a continuación, siga los cheques para la operación afectada, y luego vuelva a entrar en esa operación. Si el problema persiste, [reportar un error o preguntar a la comunidad](#report-a-bug-or-ask-the-community) con el error y los pasos que lo desencadenaron.

<span id="provider-test-fails" />

<span id="pythonr-or-package-installation-fails" />

<span id="file-does-not-open-in-preview" />

<span id="remote-control-is-unreachable" />

## Diagnóstico por el punto del fracaso {/* #diagnose-by-the-point-of-failure */}

| Síntoma | Comprueba primero | Medidas y condiciones de éxito |
| --- | --- | --- |
| La aplicación abre un espacio de trabajo vacío | Ubicación, perfil y archivo de datos | Regresar a la raíz o proyecto previsto; no crea inmediatamente un reemplazo |
| No hay modelo utilizable | Acceso del proveedor, agente activo, compatibilidad del modelo | [Configuración del proveedor](providers.md): una pequeña respuesta real tiene éxito |
| Login aparece conectado pero la tarea falla | Error ampliado del proveedor y modelo seleccionado | Remarque la autenticación/denominación y el identificador modelo; La presencia de la UI no es prueba de acceso |
| La tarea parece haberse detenido | Plan de espera, aprobación o tarjeta de interacción | Responder a la solicitud visible; leer su alcance antes de permitir |
| Corrección deseada no se ejecuta | No se salvó / Enviar / estado de entrega diferida | [Compositor](composer.md): verificar que se convirtió en un mensaje de usuario |
| Módulo no encontrado | Intérprete y inventario de paquetes | [Entornos de ejecución](runtimes.md): validar la importación en el entorno seleccionado |
| Paquete aprobado instalar todavía fallas | Primero error de red/proxy/certificate | [Red](network.md): retratar la operación real después de fijar su causa |
| Notebook no puede leer un archivo | Carril gestionada, accesorio, asignación de carpetas y referencia de versión | Utilizar la entrada permitida prevista; no ampliar el acceso a los sistemas de archivos no relacionados |
| El servicio de archivo ahorrado rechaza un camino de trabajo | Ya sea registrado para publicación gestionada | Guardar a través de la operación de artefactos apoyados; reabrir el archivo resultante |
| El cuadro difiere de un número previsto | Fuente hash, delimitador, columnas de metadatos y denominador de cálculo | Recalculado de la misma entrada antes de cambiar el valor esperado |
| El archivo visible pero la vista previa falla | Formato/tamaño de archivo, versión y error de renderizado | [Avances](previews.md): descarga para distinguir la renderización de ausencia de archivo |
| La referencia parece faltar | Vista de la biblioteca, filtros, bandeja de entrada o papelera | Filtros claros, estado de inspección y restauración en el ciclo de vida correcto |
| Fuente de texto completo encontrada pero el apego falla | Resultado de descarga real y validación PDF | Utilice otra fuente legítima PDF local, luego abra el apego |
| Desactivado Side Chat | Mensaje de compatibilidad del agente/providente | [Delegación](delegation.md): verifique la restricción de compatibilidad mostrada por su marco seleccionado |
| El trabajo a distancia no se puede ejecutar | Real host, autenticación, agendador y requisitos de tiempo de ejecución | [Computación remota](remote-compute.md) |

<span id="storage-migration-reports-an-error" />

## Errores HTTP: 400, 403, 429 y 5x {/* #http-errors-400-403-429-and-5xx */}

Un estado HTTP describe una respuesta de un proveedor de modelos, servicio Connector, servicio de navegador local o proxy. **Identificar el servicio de respuesta antes de cambiar la configuración.** Copiar el estado junto con su cuerpo de error: `403` por sí solo no le dice si un permiso API, política proxy o restricción de recursos causó el rechazo.

<span id="permission-request-keeps-waiting" />

### Solicitud, autenticación y acceso {/* #request-authentication-and-access */}

| Estado | Significado | Qué hacer en Open-Science |
| --- | --- | --- |
| **400 Bad Request** | El servicio rechaza la solicitud. | Lea el campo o parámetro llamado. Compruebe el punto final del proveedor, identificador modelo y las características de solicitud soportadas. Para una llamada de herramienta, compruebe su esquema de entrada. Pruebe una pequeña solicitud de solo texto si los archivos adjuntos o una función opcional activaron el error. |
| **401 No autorizado** | Falta la autenticación válida. | Revise qué cuenta o credencial utiliza el servicio fallido. Reconecte la cuenta de suscripción/OAuth pertinente, o corrija la tecla API en [Ajustes del proveedor](providers.md) o [Credenciales de Conectores](connectors.md). |
| **403 Forbidden** | El servicio rechaza el acceso. | Consultar el derecho del modelo/recurso, permisos de organización/proyecto y las restricciones de acceso establecidas por el servicio. Si el error dice **HTTP CONNECT 403**, inspeccionar el [política proxy o de red](network.md), en lugar de asumir que la clave modelo está equivocada. |
| **404 No encontrado** | El punto final o el recurso no está disponible en esa dirección. | Compruebe la URL de la base, la ruta API y el ID de modelo/recurso. Una URL del sitio web del navegador no es necesariamente un punto final API. Un servicio también puede utilizar 404 para ocultar un recurso inaccesible. |
| **Método 405 No permitido** | El punto final no admite este método de solicitud. | Compruebe el protocolo API seleccionado y el transporte Connector contra la documentación del servicio. Informe un desajuste de integración reproducible en lugar de adivinar un método diferente. |
| **407 Proxy Authentication Necesario** | El proxy requiere autenticación. | Comprueba la configuración proxy con tu administrador de red. Modelo API credenciales no autentican el proxy. |
| **Contenido 413 Demasiado grande** | El cuerpo de solicitud supera un límite. | Reduzca el tamaño de acceso/batch o utilice una entrada más pequeña soportada. Confirme qué servicio impone el límite. |
| **Contenido no procesable 422** | El contenido de la solicitud no puede ser procesado como se suministra. | Lea el mensaje de validación de nivel de campo. Tipos correctos, campos requeridos o valores no soportados en la solicitud de herramienta/providente. |

**400 y 403 necesitan diferentes cheques:** para un 400 que nombra un parámetro no soportado, corregir esa función de solicitud. Para un 403 que nombre un modelo restringido, consulte el acceso a ese modelo. Si no aparece una causa precisa, mantenga la respuesta y solicite el ID de apoyo; no inferir la causa del número por sí solo.

### Quotas y fallas de servicio temporales {/* #quotas-and-temporary-service-failures */}

| Estado | Significado | Siguiente acción |
| --- | --- | --- |
| **402 Se requiere pago** | Gestión del pago/acceso específico del proveedor; HTTP se reserva este estado sin un significado de facturación universal. | Lea el cuerpo de error y la página de cuenta del proveedor. No asuma que se requiere un top-up solo del número. |
| **429 demasiadas peticiones** | Tasa de limitación; algunos API modelo también lo utilizan para la cuota agotada. | Para un límite de tarifas, reducir las solicitudes simultáneas y esperar **Retry-After** o el reajuste documentado. Para un error de cuota, compruebe el subsidio/billing de ese servicio. Un límite de suscripción y el saldo de crédito API son separados. |
| **Error de servidor interno 500** | El servidor de respuesta falló. | Compruebe su estado de servicio. Retira una pequeña solicitud después de una pausa si es seguro; reporte repetidos fallos con el ID de solicitud. |
| **502 Bad Gateway** | Una puerta de entrada recibió una respuesta inválida. | Identifique la puerta de entrada/providente y compruebe su estado y configurado en el río arriba. Un fallo persistente de la vía personalizada puede requerir a su administrador. |
| **Servicio 503 No disponible** | El servicio no está disponible temporalmente. | Seguir Retry-After si se suministra y esperar a la recuperación. Para un endpoint local, compruebe que el servidor de modelo previsto está funcionando y listo. |
| **504 Gateway Timeout** | Una puerta de entrada fue esperando arriba. | Compruebe si la operación ya comenzó o terminó antes de volver a iniciar. Para un análisis, la presentación de empleos o la escritura de artefactos, inspeccione el resultado existente primero para evitar la duplicación. |

Algunas solicitudes de Connector incorporadas han enlazado retries automáticos para 429, 500, 502, 503 y 504. Esto no se aplica a cada modelo/framework o hace las presentaciones manuales repetidas seguras. Siga la respuesta del servicio específico.

### Sin respuesta HTTP, o aún fallando {/* #no-http-response-or-still-failing */}

`ECONNREFUSED`, `ENOTFOUND`, `ETIMEDOUT` y errores de certificado son fallos de conexión/TLS, no códigos de estado HTTP. El tiempo de solicitud no es automáticamente HTTP 408 o 504. Empieza con [Red](network.md).

Después de cambiar un ajuste, prueba el mismo proveedor/Connector con una pequeña solicitud, luego vuelva a iniciar la operación afectada. Si aún falla, usa el [Instrucciones de respuesta](#report-a-bug-or-ask-the-community). Incluya el nombre del servicio, host/path endpoint sin secretos, estado, cuerpo de error, solicitud de identificación si está presente, y zona horaria/hora. Nunca pegar un encabezado de Autorización o URL de token-bearing en un informe público.

## Coincide con el mensaje de error {/* #match-the-error-message */}

Copia el código exacto y el mensaje acompañante de la herramienta fallida, diálogo o registro. Los nombres de excepción **Códigos**, Python y los mensajes del sistema operativo son diferentes tipos de identificadores; Open-Science no asigna un código numérico universal a cada fallo. Un mensaje puede tener varias causas. Para trabajos remotos, utilice el [SSH y tabla de error de cálculo](remote-compute.md#resolve-ssh-and-job-errors).

| Código o mensaje | Significado y siguiente acción | Confirmación de recuperación |
| --- | --- | --- |
| `ModuleNotFoundError: No module named '…'` | El intérprete Python seleccionado no puede importar ese módulo. Inspección [Entornos de ejecución](runtimes.md), instalar el paquete requerido en ese entorno a través de su ruta de gestión de paquetes compatible, y seguir cualquier instrucción de reiniciar. | Importar el módulo en el mismo entorno Notebook, y luego reelaborar la célula fallida. |
| `ENOENT` / `No such file or directory` | No se puede encontrar el camino solicitado. Compruebe el nombre de archivo y la ubicación de la fuente; adjunte el archivo existente de nuevo si su referencia es firme. | Previsualizar o leer la entrada prevista de la misma tarea. |
| `EACCES` / `EPERM` / `Permission denied` | La operación carece de acceso al sistema de archivos. Inspeccione tanto el permiso del sistema operativo como el subsidio de carpeta del proyecto; uso [Proyectos](projects.md) para otorgar sólo el directorio las necesidades de la tarea. Para SSH `Permission denied (publickey)`En su lugar, compruebe la autenticación. | Repita la lectura/escritura original dentro del ámbito de permiso previsto. |
| `ENOTDIR` / `Not a directory` | Una operación de directorio recibió un archivo o una ruta padre inválida. Seleccione la carpeta que contiene. | La lista de directorios se abre. |
| `EISDIR` / `Is a directory` | Una operación de archivo recibió un directorio. Seleccione el archivo deseado. | El archivo abre o descarga. |
| Solicitud de paquete rechazada para un destino no público | Inspeccione el host rechazado y resolvió IP. Una configuración proxy o DNS puede proporcionar una dirección de los bloques de políticas de red. Véase [Red](network.md); fijar la resolución de la dirección en lugar de ampliar el acceso ciegamente. | La solicitud original del paquete y la posterior importación tienen éxito. |

<span id="agent-does-not-start-or-the-session-stops-progressing" />

### Errores de inicio de bases de datos {/* #database-startup-errors */}

Estos códigos aparecen cuando la aplicación no puede terminar con seguridad la apertura de sus datos. Mantenga la carpeta de datos existente. Lea el detalle del error antes de reintentar; Eliminar la base de datos no es un paso de reparación.

| Código de error | Significado | Siguiente acción |
| --- | --- | --- |
| `database_runtime_unavailable` | El motor de base de datos no se carga. | Reinstalar el paquete de aplicación oficial apropiado, reteniendo la carpeta de datos separada. |
| `database_open_failed` | La base de datos no podía abrirse. Otro ejemplo de aplicación, espacio de disco insuficiente o una ubicación solo de lectura puede causar esto. | Quit other instances, check free space and folder permissions, then retry. |
| `database_newer_than_app` | Una versión de aplicación más nueva escribió este formato de datos. | Instale una versión de nuevo compatible y vuelva a abrir la misma carpeta de datos. No intentes rebajar su esquema. |
| `database_history_invalid` | La historia de la migración no coincide con la historia esperada de la aplicación. | Preserve la carpeta y reporte el código. Si tiene una copia de seguridad conocida, busque un procedimiento de recuperación antes de reemplazar los datos. |
| `database_migration_failed` | Una actualización de la base de datos no terminó. | Comprobar el espacio libre, otras instancias y permisos; use Retry cuando esté disponible. Incluya el ID de migración si falla de nuevo. |
| `database_validation_failed` | Los datos almacenados no cumplen la estructura necesaria. | Actualizar la app y relanzar. Si persiste, reporte el código en lugar de editar filas de bases de datos. |
| `database_startup_unavailable` | El servicio de puesta en marcha de la base de datos no respondió ni terminó la comprobación. | Retry; si persiste, renuncie y reabran la aplicación, a continuación, reporte. |

La recuperación significa que la pantalla de inicio se aclara y los proyectos esperados se abren. Si hay una acción **Still stuck? Create an issue for help** disponible, utilice el flujo de revisión descrito [infra](#report-a-bug-or-ask-the-community). Estos significados siguen el [orientación inicial](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/database-startup-gate.tsx).

Si la pantalla de inicio solo ofrece **Quit**, salga de la aplicación, resuelva la causa reportada y la ponga de nuevo. Utilice **Retry** sólo cuando la página lo proporciona. Después de la recuperación, vuelva a abrir sus proyectos y archivos esperados.

![Orientación de inicio cuando la base de datos no puede abrirse](/img/open-science/local-acceptance/startup-database-error.webp)

### Mensajes de recuperación {/* #recovery-messages */}

| Síntoma | Siguiente acción |
| --- | --- |
| Los puestos de trabajo siguen siendo puestos de trabajo después de la recuperación de almacenamiento | Lea el aviso de conversación afectada, preserve los archivos identificados, recupere una copia válida y seleccione **Recheck saved conversations**. Inspeccione el mismo trabajo antes de enviar otro. |
| PDF subida cancelada pero la referencia sigue siendo | Abrir la referencia guardada y comprobar su estado de apego; usar el lote **Retry unfinished** camino donde se ofrece. |
| Coleccion ahorra rechazado después de que otro cliente lo editó | Reabrir la última colección y reconciliar los cambios antes de guardar de nuevo. |
| Informes de actualización de Windows denegados acceso | Lea la ruta exacta del archivo y el error Windows. Siga la instrucción del aviso para utilizar el instalador oficial como administrador. |
| Actualización Windows informa un archivo en uso | Cerrar el proceso identificado como el uso de ese archivo de instalación, luego elegir **Retry**, **Cancel** Para detener la actualización. |

Los errores Windows son códigos de sistemas operativos, distintos de los códigos de estado HTTP. Si la recuperación falla, incluye la versión instalada, el mensaje exacto y la identidad de archivo / trabajo sanitario cuando usted [reportar el problema](#report-a-bug-or-ask-the-community).

## Reiniciar los datos locales Windows {/* #windows-data-reset */}

Utilice la utilidad de reseteo independiente sólo cuando usted tiene la intención de descarte los datos de la instalación local y empezar de nuevo. **Elimina permanentemente los datos enumerados y las credenciales guardadas; no las repara ni las respalda.** Copia los archivos de investigación necesarios y copias de seguridad fuera de todos los directorios listados primero. La reinstalación de la aplicación por sí sola conserva estos datos.

1. Desde el [guía oficial de reasentamiento](https://github.com/aipoch/open-science/blob/v0.33.0/scripts/windows-reset/README.md), descargar tanto `reset-open-science.cmd` como `reset-open-science.ps1` utilizando **Descargar archivo crudo**. Manténlos juntos fuera de los directorios de datos de la aplicación.
2. Quit Open-Science, incluyendo su proceso de bandeja, y terminar y cerrar su agente, Notebook, sin cabeza y procesos WSL. Utilice su cuenta Windows normal; El modo administrador no es necesario.
3. En Command Prompt se abrió en la carpeta de descarga, ejecute `reset-open-science.cmd -Preview`. Revise todos los datos propuestos, configuración, perfil y ruta de tiempo de ejecución. La vista previa no elimina los datos.
4. Sólo después de revisar y respaldar esas ubicaciones, haga doble clic en `reset-open-science.cmd`. Le pide que escriba `RESET OPEN SCIENCE` exactamente antes de la eliminación; cualquier otra respuesta cancela.
5. Lea el resultado final antes de reabrir la aplicación. Después de un reinicio completado, elija la ubicación de datos y configure proveedores y administre los tiempos de ejecución de nuevo.

Si un proceso está funcionando o no puede ser inspeccionado, o un camino es inseguro, resuelva la condición reportada primero. No desvíes una negativa. Si la configuración es corrupta o la ubicación personalizada de los datos está implicada, utilice el procedimiento `-DataRoot` explícito de la guía oficial. Un error de eliminación puede dejar un reajuste parcial, por lo que lee el error en lugar de asumir que nada cambió. La utilidad no revoca las cuentas externas del proveedor ni elimina los entornos Python/R instalados por separado.

<span id="collect-evidence-for-a-report" />

## Recoger diagnósticos útiles {/* #collect-useful-diagnostics */}

1. Grabar la versión de la aplicación, OS, activo Agente/modelo, proyecto/sesión y el tiempo de fracaso.
2. Copiar el primer error de herramienta relevante y la operación que lo causó. Incluir el comportamiento esperado versus observado.
3. Para problemas de entrada, incluya un enlace de fuente pública, nombre de archivo, tamaño y suma de comprobación; una mínima entrada reproducible es más útil que una captura de pantalla no relacionada.
4. Abra **Settings → General → Diagnostics** y use **Abrir / Reveal** para el registro de tiempo de ejecución cuando sea necesario.
5. Inspeccione los registros antes de compartir; omitir fichas de cuenta, contenido de fuente privada y caminos no relacionados. Abrir un registro no lo envía automáticamente.
6. Declara si la misma operación tiene éxito después del cambio. Un botón habilitado no es la condición de éxito.

Los significados del mensaje técnico se recogen en [Referencia de diagnóstico](../reference/diagnostics.md).

### Diagnósticos de exportación para un período de sesiones {/* #session-diagnostics */}

1. Abra la sesión afectada y elija **Export diagnostics…** en su encabezado, o **Export → Export diagnostics…** en el menú de sesión.
2. Revise las fuentes disponibles. **session.json** y **Session database records** se refieren a la sesión seleccionada. **main.log** y los registros de aplicaciones históricas también pueden contener metadatos de otras sesiones; seleccione sólo cuando sea relevante.
3. Elija **Export**, seleccione un destino local, y espere a **Diagnostics exported.** Use **Show in folder** para localizar el archivo.
4. Inspeccione su registro manifiesto y exportador antes de compartir. Una fuente desaparecida o dañada puede ser resumida o o omitida; la existencia del archivo por sí sola no prueba que todas las fuentes fueron capturadas.

![Seleccionar las fuentes de diagnóstico específicas de sesión antes de una exportación local](/img/open-science/v0330/session-diagnostics.webp)

La exportación de metadatos ordinarios excluye los campos de contenido privado. Si una exportación .science activa el control de contenido sensible, la lista de fuentes también puede contener evidencia de escáner redacted y los archivos marcados original. **Los archivos sensibles originales se descontrolan por defecto; seleccionar uno incluye sus bytes originales en el archivo.** Seleccione sólo las fuentes necesarias e inspeccione el archivo y capturas de pantalla antes de compartir. Exportar se mantiene local y no hace ninguna solicitud de subida o modelo. Esto es evidencia diagnóstica, no una copia de seguridad de investigación; use un [Paquete .science](research-packages.md) para una entrega de investigación.

## Informar un error o preguntar a la comunidad {/* #report-a-bug-or-ask-the-community */}

| Necesitas | Canal |
| --- | --- |
| Ayuda a elegir ajustes o entender un error | [Join AIPOCH Official on Discord](https://discord.gg/zxQAYjReRv). Describir la operación, versión y error para que otros puedan ayudar. |
| Un fallo de aplicación reproducible rastreado a la resolución | Buscar [cuestiones existentes](https://github.com/aipoch/open-science/issues), entonces abrir un [Informe de error](https://github.com/aipoch/open-science/issues/new?template=bug_report.yml). |
| Una nueva capacidad o una mejora | Abrir un [Solicitud de características](https://github.com/aipoch/open-science/issues/new?template=feature_request.yml) y explicar la tarea de investigación que apoyaría. |

### Presentar un asunto útil de GitHub {/* #submit-a-useful-github-issue */}

1. Busque los problemas existentes utilizando el código de error o una frase distintiva. Si el mismo problema existe, agregue los detalles de reproducción pertinentes allí.
2. Inicia sesión en GitHub y abre **Informe de error**. Use un título como `[Bug]: database_open_failed when reopening a project` con su error real.
3. Llenar en **¿Qué pasó?**, **Pasos para reproducir**, **Sistema operativo** y **App version**. Agregue **Provider / model** cuando sea relevante, más el marco activo del Agente.
4. Bajo **Registros o capturas de pantalla relevantes**, incluye el primer error y una pequeña cantidad de contexto circundante. Agregue una muestra pública o mínima cuando el problema depende de los datos de entrada.
5. Revise el informe y luego lo presente. Mantenga la URL del problema y publique el resultado de cualquier comprobación sugerida en el mismo problema. Si GitHub no ofrece la creación de ediciones para su cuenta, use Discord para ayudar a encontrar la ruta de presentación apropiada.

Utilice esta lista de verificación cuando prepare una cuestión o una pregunta de discordia:

```text
Open-Science version and installation method:
Operating system and architecture:
Agent framework / provider / model (if relevant):
Page and action:
Steps to reproduce:
Expected result:
Actual result:
Exact error code and full message:
Time of failure and time zone:
Public/minimal input (if needed):
Checks already tried and their results:
Relevant log excerpt or screenshot:
```

Para un fallo remoto, también incluye el modo de ejecución, el ID de trabajo de la aplicación, ID de trabajo del programador cuando está presente, código de salida y el stdout/stderr pertinente. Use un alias neutral para un anfitrión privado. No adjuntar contraseñas, fichas, claves privadas SSH, datos de pacientes o una carpeta de investigación privada completa; sustituir los detalles sensibles en un ejemplo mínimo.

<span id="report-directly-from-a-startup-error" />

### Prepare un informe de un error {/* #prepare-a-report-from-an-error */}

Seleccione **Report this error** junto a un error de conversación. Una pantalla de inicio también puede ofrecer **Still stuck? Create an issue for help**.

1. Lea **Error details** y retire los caminos privados, identificadores o entrada sensible antes de compartir.
2. Chequee **Also included** para la versión de aplicación, sistema operativo, marco de agente, proveedor/modelo y versiones de tiempo de ejecución.
3. Utilice **Copy details** para copiar el texto editado y la información del medio ambiente. **Reveal log file** localiza el registro local de tiempo de ejecución; no se adjunta automáticamente y necesita una revisión separada antes de compartir.
4. Compruebe el reconocimiento público para permitir el **Open GitHub issue**. La edición del texto de error requiere revisar y reconocer el contenido revisado de nuevo.
5. Abra la forma GitHub, inspeccione los campos prellenados, agregue pasos de reproducción útiles, luego envíe cuando esté listo. Abrir el informe previsualización por sí solo no presenta un problema.

![Datos de error editables y confirmación del intercambio público](/img/open-science/sept11-completion/report-preview.webp)

## Cuestiones comunes {/* #common-questions */}

**¿Necesito una cuenta modelo para cada operación?** No. Navegación local, organización y muchos ajustes pueden funcionar sin un modelo. Las respuestas de los agentes, la planificación del análisis y los exámenes generados por modelos necesitan un acceso modelo compatible.

**¿El almacenamiento local significa que todo el procesamiento permanece en el dispositivo?** No. Se pueden enviar avisos, archivos o contenido recuperado al modelo/servicio configurado cuando se utiliza. Los archivos locales y la ubicación de la ejecución del modelo son preguntas separadas.

**¿Puedo trabajar fuera de línea?** Los archivos locales existentes y las vistas locales disponibles pueden seguir siendo utilizables. Modelos anfitriones, bases de datos en línea y descargas de paquetes faltantes necesitan sus respectivas conexiones. Un terminal remoto/local también necesita su propio servicio de funcionamiento.

**¿Usar una factura o un saldo de suscripción?** No. Informa de telemetría disponible. El uso perdido no es cero; el servicio de facturación/limites permanecen separados.

**¿Reparación de un archivo reequilibra el trabajo?** No. Restaura la navegación para el trabajo retenido. Un kernel en vivo o una operación fallida puede requerir reincorporación/recorte explícito.

**¿Una prueba de SSH exitosa significa que mi análisis puede funcionar?** No. Compruebe el modo de ejecución seleccionado, permisos de cronograma, tiempo de ejecución y solicitud de recursos, a continuación, ejecutar un pequeño trabajo e inspeccionar su salida. Ver [Computación remota](remote-compute.md).

Fuentes: [Semántica HTTP](https://www.rfc-editor.org/rfc/rfc9110.html#section-15), [429 y Retry-After](https://www.rfc-editor.org/rfc/rfc6585.html#section-4), [Errores de tasa-limitación de OpenAI versus cupos](https://developers.openai.com/api/docs/guides/error-codes), [Política de reingreso de Connector](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/request-policy.ts).

Fuentes: [aviso de recuperación de la cola](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/components/SessionCatalogRecoveryAlert.tsx), [Manejo de lotes PDF](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [reunión de conflictos](https://github.com/aipoch/open-science/commit/dbb9560a), [Windows installer](https://github.com/aipoch/open-science/blob/v0.27.0/build/installer.nsh).

Fuente: [reportes de errores](https://github.com/aipoch/open-science/blob/v0.26.0/.github/ISSUE_TEMPLATE/bug_report.yml), [diálogo de informe de inicio](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/startup-issue-dialog.tsx).
