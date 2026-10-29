---
title: "Servicio sin cabeza y acceso al navegador"
last_update:
  date: '2026-10-29'
---

# Servicio sin cabeza y acceso al navegador {/* #headless-service-and-browser-access */}

El servicio local proporciona un backend sin cabeza y una interfaz del navegador localhost. Es diferente de un host SSH Compute y de la parpadeación del navegador Remote.It. Elija la configuración de autenticación y almacenamiento credencial para el anfitrión antes de conectar un cliente.

## Selección y descubrimiento de objetivos {/* #target-selection-and-discovery */}

Desde v0.37.0, los servicios compartidos se ejecutan en un proceso Node ordinario y el escritorio se conecta como cliente nativo. La startup CLI ya no necesita un host electrónico oculto.

| Selector | Ámbito |
| --- | --- |
| `--port PORT` | Puerto local host, entero 1-65535; un puerto explícito ocupado causa un error |
| `--config-root PATH` / `--profile PATH` | directorio de configuración CLI portátil; mantener el mismo camino absoluto a través de |
| `OPEN_SCIENCE_CONFIG_ROOT` | Explicar directorio de configuración a través del medio ambiente; las opciones de comando tienen precedencia |
| El descubrimiento automático | Encontrar el estado de servicio local y confirmar su perfil, puerto y versión |

Los backends de escritorio seleccionan un puerto libre cuando no se especifica; CLI por defecto de inicio a 44100. Use `status --json` en lugar de inferir el puerto desde una ventana abierta. Se puede reutilizar un servicio existente compatible para la misma configuración; terminar el trabajo activo y seguir las instrucciones de actualización cuando las versiones no coincidan. La opción `--app-path` heredada no convierte un ejecutable Electron en un nuevo backend Node.

El archivo del estado es `web-service.json`. La falta de autenticación no es el permiso para borrar ese registro o matar a su PID. Inspeccione primero el servicio y el diagnóstico real para evitar afectar otro proceso.

## Inicializar y comprobar la preparación {/* #readiness */}

Utilice `open-science init` para preparar el directorio de configuración predeterminado sin iniciar la aplicación. Para una configuración aislada, pase el mismo camino absoluto `--profile` para init, start y comandos posteriores. Los paquetes Debian instalan el CLI junto a la aplicación. Ver [terminal setup](cli.md#terminal-setup) para la preparación y inicio de sesión de Codex.

Después de un `start --no-open` intencional, ejecute `open-science doctor --json`. Inspeccione el `ready` general, los cheques individuales y las siguientes acciones sugeridas; el código de salida del proceso por sí solo no es un veredicto de preparación. Mantenga el servicio en su interfaz local autenticada existente. Iniciar este servicio sin cabeza no configura Remote.It ni publica un endpoint público.

## Controles de ciclo de vida {/* #lifecycle-commands */}

Desde v1.0.5, una conexión de App o un inicio explícito de CLI mantiene vivo el servicio. Use el mismo perfil absoluto para todos los comandos.

| Comando | Resultado |
| --- | --- |
| `open-science start` | Iniciar o reutilizar el servicio, mantenerlo funcionando explícitamente, y abrir el navegador |
| `open-science start --no-open --json` | Activar la misma ejecución persistente sin abrir el navegador; devuelve `started` o `already-running`, información de servicio y `lifetime` |
| `open-science status --json` | Inspeccione el servicio seleccionado; un servicio perdido devuelve `{"running":false}` y código de salida 1 |
| `open-science url` | Imprimir su URL del navegador autenticado; mantener este privado |
| `open-science stop --json` | Desactivar la ejecución persistente; detener solo si no queda ninguna App conectada |
| `open-science stop --force --json` | Solicitar una parada de servicio completo, incluyendo aplicaciones conectadas; puede interrumpir tareas activas |

Repetidas `start` repetidos no acumulan solicitudes de ejecución persistente. **start**, **status** y **stop** apoyo `--json`; **url** no. La salida de lanzamiento de JSON no expone la URL del navegador autenticado. Los servicios más antiguos pueden reportar una vida desconocida; utilizar versiones iguales antes de confiar en el nuevo contrato.

### Resultados de cierre

| JSON `result` | Significado |
| --- | --- |
| `already-stopped` | No hay registro de servicio en vivo encontrado |
| `keep-alive-revoked` | Ejecución persistente desactivada; las Apps conectadas mantienen el servicio |
| `stopped` | The requested service generation exited and released ownership |
| `shutdown-requested` | Un servicio legado aceptó la solicitud pero la salida no está confirmada; el comando devuelve un código de salida no cero |

Leer `result` y `lifetime`; un código de salida exitoso por sí solo no significa que el servicio se detuvo. El mayor `daemon-stopped` y `web-service-stopped` los nombres de los resultados ya no son emitidos. `--force` requiere el protocolo de vida moderno y falla explícitamente contra un servicio antiguo. Inspeccione errores y estado actual en lugar de borrar archivos estatales o matar un PID registrado.

## Autenticación y acceso al navegador {/* #authentication-and-browser-access */}

El SDK descubre el servicio local y lee su ficha de autenticación local, enviándolo en los encabezados de solicitud. La producción ordinaria de tareas humana/JSON/JSONL no imprime ese token. `url` es la excepción intencional que produce una entrada de navegador autenticado.

Un servicio localhost no es accesible automáticamente desde otro ordenador. El acceso remoto del navegador utiliza su propio modo de acceso configurado, emparejamiento y ciclo de vida de navegador de confianza. SSH Compute envía puestos de trabajo a los anfitriones de ejecución remota configurados.

Utilice [Acceso remoto al navegador](../guides/remote-access.md) para pares Remote.It y [Computación remota](../guides/remote-compute.md) para trabajos SSH. Tampoco se configura el flujo cambiando la URL de la documentación del servicio local.

### Almacenamiento credencial en Linux sin cabeza {/* #credential-storage-on-headless-linux */}

El defecto es almacenamiento protegido por el sistema operativo. En un backend sin cabeza Linux sin un llavero utilizable, elija una alternativa explícita:

<p className="example-label"><strong>Ejemplo</strong> Iniciar un servicio sin cabeza Linux con almacenamiento credencial de archivo</p>

~~~bash
open-science start --credential-store=file --no-open
~~~

| Elección | Comportamiento |
| --- | --- |
| Opción omitida / --credential-store=os | Requiere la tienda protegida por el sistema operativo |
| --credential-store=file | Permitir secretos no cifrados gestionados por Ajustes en los sin cabeza Linux sólo |
| lanzamiento de escritorio, macOS o Windows | El modo de archivo no es compatible |
| Retrocede ya. | Se rechaza la selección de modo explícito; no cambia el modo de ese proceso |
| Siguiente startup | Especifique el modo de nuevo; no es una preferencia guardada |

El modo de archivo utiliza la configuración.json y credenciales.json bajo la raíz de configuración, con escrituras atómicas y modo POSIX 0600. El archivo:v1: el valor es de base64 codificado, **no encriptado**. Cualquier persona que pueda leerlo puede recuperar el secreto; excluir estos archivos de repositorios, imágenes e informes de soporte.

La elección se aplica a las claves de proveedores gestionadas por Configuración nuevas o actualizadas, fichas de suscripción administradas por aplicaciones, llaves de GitHub/literatura y secretos compartidos de MCP/OAuth. Computar contraseñas/protegidos Los datos de Compute mantienen su requisito de almacenamiento operativo separado; Tiendas de identificación de agentes externos-framework siguen sus propias reglas. No hay caja de arena desactivada por esta opción.

Los valores encriptados existentes no se migran automáticamente y todavía requieren su bóveda original del sistema operativo. Si no está disponible, vuelva a entrar en la credencial a través de la forma soportada normal. Los archivos ref requieren un modo de archivo explícito para leer y son incompatibles con versiones anteriores. Para devolver una credencial al almacenamiento de OS, reinicie en modo OS y reemplace explícitamente mientras la bóveda está disponible.

Utilice almacenamiento persistente cuando la configuración debe sobrevivir el reemplazo de contenedores. La desconexión mantiene la configuración; reemplazar un sistema de archivos de contenedores desechable puede eliminarlo. Vea el [contrato de almacenamiento de credenciales](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## Propietario y cierre de backend {/* #backend-ownership */}

| Medida | Efecto en el backend |
| --- | --- |
| Dejar la última aplicación conectada sin un comienzo CLI explícito | Paradas de servicio |
| Corre CLI `start`, luego dejar todas las aplicaciones | El servicio continúa por la ejecución persistente explícita |
| Cerrar una pestaña de navegador o cliente SDK | No desactiva la ejecución persistente |
| Ejecutar una tarea CLI común, Web o SDK | No mantiene el servicio con vida después de que todas las aplicaciones abandonen |
| Corre `open-science stop` con una App conectada | Desactivar la ejecución persistente; continuar para la App conectada |
| Corre `open-science stop --force` | Solicitud de cierre en todo el servicio, trabajo potencialmente interrumpido |

Si el navegador o el trabajo automatizado debe continuar después de dejar el escritorio, inicie explícitamente el mismo perfil primero. Cerrar una ventana a la bandeja no es renunciar. Terminar la investigación activa antes de una parada de servicio completo, luego comprobar `status --json`.

Un escritorio desconectado ofrece **Reconnect** y **Quit app**. Reconnect no vuelve a presentar trabajo. Seguir [recuperación](../guides/troubleshooting.md#connection-recovery), e inspeccionar operaciones cuyas respuestas se perdieron antes de reintentar.

### Reconectar después de un apagado de escritorio interrumpido {/* #desktop-service-recovery */}

Abra el escritorio de la misma versión y vuelva a conectarse al perfil original. Las conexiones de aplicación y cualquier retención explícita de CLI determinan si ese servicio permanece vivo; una pestaña del navegador por sí sola no reemplaza ninguno.

Si deja de prepararse fracasa, la ventana permanece abierta. Preserve trabajo sin salvar e inspeccionar la tarea original después de la recuperación. Si la puesta en marcha reporta un servicio antiguo que lo bloquea, compruebe el perfil, la versión y los clientes activos antes de elegir su acción explícita parada. Cancelar deja el servicio funcionando. Una parada fallida puede ser recortada o recortada sin borrar archivos de bloqueo.

## Comportamiento de actualización de aplicaciones {/* #application-update-behavior */}

El actualizador de aplicaciones CLI permanece eliminado; no utilizar `open-science update --json`. Uso [Controles de actualización de escritorio o el canal de instalación original](../guides/installation.md#manual-update).

Antes de sustituir los archivos CLI, termine el trabajo de todos los perfiles afectados. Cierre las Apps conectadas y desactive la ejecución persistente de cada perfil con `stop --json`. Confirmación `stopped` o `already-stopped`; `keep-alive-revoked` significa que una aplicación todavía mantiene el servicio funcionando. Uso `stop --force` sólo cuando usted tiene la intención de detener el trabajo de todos los clientes. No sobreescribir los archivos del programa de ejecución.

Una actualización de escritorio puede pedir parar un servicio CLI adjunto y cambiar a la gestión de escritorio. Revise el perfil y las tareas afectadas antes de consentir; cancelarlo deja correr. Esto no actualiza los archivos originales del programa independiente CLI. Siga los avisos de ocupación y recuperación sin borrar cerraduras o configuración.

Después de actualizar, confirme la versión y los datos originales, luego inspeccione `status --json` y `doctor --json`. Preserve el modo credencial-store. [1.x compatibilidad](../guides/installation.md#version-compatibility) no promete versiones mixtas de escritorio / backend. Ver el [guía oficial de horario de ejecución](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md), [CLI](cli.md) y [Task SDK](api.md).

## Computar en el espacio de trabajo web {/* #web-compute */}

El espacio de trabajo web independiente expone **Compute** cuando su backend proporciona el Notebook y Compute APIs requeridos. Abra el espacio de trabajo conectado, compruebe que el panel está disponible, luego utilice los pasos de configuración SSH/Slurm existentes. Un panel disponible no suministra credenciales remotas o confirma que un trabajo puede funcionar.

## Paquetes y clientes de herramientas externas {/* #local-research-tools */}

Authenticated local Web sesiones puede [subir y descargar paquetes de investigación](../guides/research-packages.md#local-package-transfer); las sesiones web remotas no obtienen esta capacidad de transferencia. Para conectar un cliente de herramienta externo en la misma máquina, configure el [adaptador stdio MCP](cli.md#external-mcp). Utiliza un servicio local ya gestionado y los permisos de ese perfil; no crea una URL remota de MCP.
