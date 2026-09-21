---
title: "Acceso remoto al navegador"
last_update:
  date: '2026-09-20'
---

# Acceso remoto al navegador {/* #remote-browser-access */}

El acceso remoto del navegador permite que otro dispositivo opere el espacio de trabajo de este ordenador. Proyectos, agentes, archivos y tiempos de ejecución Notebook siguen funcionando en este equipo. Está separado de [Computación SSH/Slurm](./remote-compute.md), que envía computación a un anfitrión.

:::caución&#91;Estado de adhesión&#93; Remote.It puede aceptar cambios de servicio antes de que su agente de antecedentes los informe como listos. El emparejamiento completo del navegador y el acceso al espacio de trabajo todavía necesitan tener éxito en sus dispositivos. La captura de pantalla Off-state a continuación ilustra los controles, no una sesión remota conectada. :::

## Prerrequisitos y modos {/* #prerequisites-and-modes */}

Abre **Settings → Remote** en el ordenador de casa. Instala y accede a la aplicación de escritorio Remote.It separada antes de habilitar los modos que lo utilizan. Open-Science llama a su CLI instalado; no crea una cuenta Remote.It o un paquete de ese servicio.

| Modo | Para lo que es |
| --- | --- |
| Desactivado | Pausa acceso remoto al tiempo que conserva la configuración del proveedor y registros de navegador de confianza para su reutilización. |
| Acceso a la aplicación | Conéctese a través de la aplicación móvil firmada y complete la verificación de dos pasos. |
| Acceso al navegador | Utilice un enlace persistente del navegador HTTPS y la verificación completa de dos pasos. |

![Acceso remoto inspeccionado en el estado Off](/img/open-science/walkthrough-2026-09-08/63-remote-off.webp)

Los ajustes de movimiento de acceso se pueden cambiar desde la ventana de escritorio en el ordenador de inicio. Un navegador conectado puede gestionar el emparejamiento/trust cuando está autorizado, pero no es un sustituto de ese control de modo solo de escritorio.

## Pare un navegador cuando el ambiente esté disponible {/* #pair-a-browser-when-the-environment-is-available */}

1. Seleccione el modo de acceso previsto y espere a su estado de funcionamiento listo. Un error o estado de modo de acceso cambiante no es una conexión utilizable.
2. En el acceso del navegador, utilice **Copy**, **Open** o el código QR para el enlace mostrado. En el acceso a la aplicación, utilice las instrucciones de conexión móvil y la misma cuenta Remote.It.
3. En el dispositivo solicitante, compare el código de seis dígitos con **Pairing requests** en un dispositivo de aprobación autorizado. Compruebe el navegador, la plataforma, el tiempo y la dirección.
4. Elija **Reject**, **Allow for up to 12 hours**, o **Trust this browser for 180 days**. El acceso temporal no es una confianza permanente.
5. Verifique que el espacio de trabajo previsto se abre y una pequeña interacción sólo lectura tiene éxito. No infiere la conectividad de copiar un enlace.

Mantenga el enlace de acceso privado. Comparta una conexión sólo con el dispositivo previsto, y confirme la solicitud de emparejamiento antes de confiar en él.

## Revoque y pare {/* #revoke-and-stop */}

**Trusted browsers** lista los detalles del dispositivo y el último uso. **Revoke &#91;browser&#93;** invalida la autorización de ese navegador para el acceso/reconexión protegido posterior. La vuelta de **Off** detiene el acceso pero mantiene registros de confianza; revocar un dispositivo perdido por separado.

Si la aplicación informa que turn Off no terminó, use **Retry turning off** y confirme el estado salvado. La advertencia dice explícitamente que el acceso puede regresar después de reiniciar si Off no fue salvado. No trate un botón de radio seleccionado solo como éxito.

### Cambios de servicio aceptados, agente todavía reiniciando {/* #service-changes-accepted-agent-still-restarting */}

Si el mensaje dice **Remote.It aceptó los cambios de servicio, pero su agente de antecedentes sigue reiniciando**, se han guardado los nuevos IDs de servicio. Espera unos segundos, luego selecciona **Detectar** o **Detect again**. No agregue el dispositivo de nuevo o cambie los modos repetidamente; reutilizar la configuración de servicio aceptada.

Continuar sólo después de que la página proporciona el enlace del navegador y los controles de emparejamiento. Si la detección sigue fallando, confirma que la aplicación de escritorio Remote.It está firmada y su agente está funcionando, conserva el mensaje exacto y utiliza [Solución de problemas](troubleshooting.md) para informarlo. Un subpanel **Ready** junto con un error de nivel de página no es suficiente para establecer acceso final a extremo.

## Diagnóstico por etapa {/* #diagnose-by-stage */}

| Etapa | Check |
| --- | --- |
| Proveedor no detectado | Instalación Remote.It, inicio de sesión y resultado de detección de la página. |
| El cambio de modo falla | El error actual y si la aplicación/providente local sigue funcionando. |
| Enlace abre pero el espacio de trabajo no | Código de emparejamiento, caducidad, confianza y dispositivo autorizado. |
| Previamente el navegador de trabajo es rechazado | Revocación/expedición y si el acceso está fuera de servicio. |
| El espacio de trabajo se abre pero una tarea falla | Modelo, tiempo de ejecución y permisos de herramientas en el ordenador de casa; acceso remoto no configura estos. |

Para los comandos locales sin cabeza/browser, vea [referencia al servicio](../reference/server.md). Es un camino de entrada separado de los modos Remote.It mostrados aquí.

Fuente: [Panel de acceso remoto](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/RemoteControlPanel.tsx).

Para los despliegues sin cabeza Linux sin un llavero de sistema operativo utilizable, lea el [opción de almacenamiento credencial](../reference/server.md#credential-storage-on-headless-linux). Cambia el almacenamiento local de secretos elegibles; no configura Remote.It, empareja un navegador o otorga acceso remoto.

## Pareja y revocación en v0.31.1 {/* #pairing-v0311 */}

Las solicitudes de emparejamiento pendientes aparecen antes de **Trusted browsers**, con tiempo restante y placas urgentes. Coincide con el código mostrado en el dispositivo solicitante antes de conceder acceso; una solicitud caducada debe comenzar de nuevo. Un navegador de confianza puede revocarse: esperar su acceso protegido a fin y par de nuevo si el acceso es necesario más adelante. **Off**, el acceso temporal y la confianza de revocación siguen siendo diferentes acciones.
