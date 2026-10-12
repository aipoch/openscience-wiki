---
title: "Servicio sin cabeza y acceso al navegador"
last_update:
  date: '2026-10-12'
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

## Comandos de ciclo de vida {/* #lifecycle-commands */}

| Comando | Resultado | Opciones y límites |
| --- | --- | --- |
| `open-science start` | Iniciar el backend y abrir el navegador | Puerto predeterminado 44100 |
| `open-science start --no-open` | Comenzar sin abrir un navegador | Uso para una sesión de servicio local intencional |
| `open-science status --json` | Imprimir estado de servicio legible por máquina | Devuelve un servicio perdido `{"running":false}` y código de salida 1 |
| `open-science url` | Imprima la URL del navegador autenticado | Contiene autoridad local de acceso; no pegar en ejemplos publicados |
| `open-science stop` | Solicitud de apagado elegante autenticado | No señale ciegamente un PID de un archivo de estado de estancamiento |
| `open-science stop --json` | Informe el resultado de la clausura | Véase el cuadro de resultados que figura a continuación |

Entre estos comandos, **status and stop support `--json`; empezar y url no**. El cheque `start --json` local devuelto `invalid_cli_usage` con código de salida 2 antes de comenzar cualquier cosa. Para un lanzamiento con scripts, ejecute `start --no-open`, luego `status --json`.

### Efectos de cierre {/* #shutdown-outcomes */}

| JSON `result` | Significado |
| --- | --- |
| `already-stopped` | No hay registro de servicio en vivo encontrado |
| `daemon-stopped` | Authenticated Node backend salió; clientes adjuntos pierden su conexión de backend |
| `web-service-stopped` | Legacy Electron resultado del servicio web, no el nuevo backend independiente Node |

Una solicitud rechazada o el plazo de cierre perdido devuelve un fracaso. Lea el error e inspeccione el estado de destino real. No reporte un servicio como se detuvo simplemente porque el comando regresó.

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
| Cerrar una pestaña del navegador | Backend sigue corriendo |
| Deja el escritorio que comenzó el backend | Su backend de propiedad se detiene con él |
| Dejar un escritorio conectado a un backend CLI existente | Sólo ese cliente se separa; el backend CLI sigue funcionando |
| `open-science stop` | Parar el backend seleccionado, afectando a todos los clientes que se adjuntan a él |

Cerrar una ventana puede diferir de dejar la aplicación, especialmente cuando permanece en la bandeja. Terminar la investigación activa antes de detener un backend compartido, luego inspeccionar el estado actual con `status --json`.

## Comportamiento de actualización de la aplicación {/* #application-update-behavior */}

Actualizaciones nativas de escritorio y actualizaciones de paquetes independientes utilizan diferentes caminos. Un backend Node ordinario no puede reemplazar el instalador de escritorio; su `update --json` informa un requisito de actualización manual y el modo `package-manager`. Siga las instrucciones devueltas.

- **Aplicación de escritorio:** utiliza su actualización en la aplicación. Si se adjunta a un backend iniciado previamente por el CLI, termine el trabajo y detenga ese backend antes de actualizar el escritorio.
- **Archivo CLI independiente:** terminar el trabajo, detener el backend previsto, extraer la nueva versión en un nuevo directorio, conservar los datos de configuración y actualizar el lanzador o PATH. No sobreescribas el paquete de ejecución.
- **instalación npm:** actualiza el paquete correspondiente a través de npm y confirma la compatibilidad cliente/backend.

Reinicie, luego utilice `status --json` y `doctor --json` para confirmar la versión, directorio de configuración y preparación. Preserve el modo de plantación credencial existente; no eliminar credenciales o configuración para realizar una actualización.

Vea el [guía oficial de tiempo libre](https://github.com/aipoch/open-science/blob/v0.37.1/docs/standalone-runtime.md), [CLI](cli.md) y [Task SDK](api.md).
