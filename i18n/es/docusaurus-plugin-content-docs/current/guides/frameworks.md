---
title: "Instalación y conmutación de agentes"
last_update:
  date: '2026-09-24'
---

# Instalación y conmutación de agentes {/* #installing-and-switching-agents */}

Elija un framework Agent para ejecutar conversaciones y herramientas y configure un [proveedor de modelos](providers.md) compatible. Puede mantener varios frameworks instalados. El framework activo en **Settings → Agent** es un ajuste de toda la aplicación, compartido por todos los proyectos; se aplica a los siguientes turnos de conversación y flujos de trabajo.

## Lea la página del agente {/* #read-the-agent-page */}

Abre **Settings → Agent**. La página separa **Installed** de **Available**. Lea la versión, la ruta y el marcador **Active** en la tarjeta instalada antes de cambiar cualquier cosa.

![Detectado Codex gestionado por aplicaciones](/img/open-science/local-acceptance/agent-codex-active.webp)

| Control/establecimiento | Significado y acción |
| --- | --- |
| Tarjeta instalada | Seleccione una tarjeta inactiva elegible para solicitar un interruptor. Una instalación listada todavía necesita acceso modelo compatible. |
| Activo | El backend seleccionado para toda la aplicación. Su acción de desinstalación está deshabilitada. |
| Volver a detectar | Refresca el descubrimiento después de una instalación o cambio de ruta. Muestra temporalmente la detección; no instala el software perdido. |
| No instalado | No se detectó tiempo de funcionamiento utilizable para ese marco. |
| Menú de instalación | Elija una fuente ofrecida para ese marco, luego inspeccione el progreso de la instalación. |
| Instalar el registro / Retry | Lea el paso fallido y vuelva a entrar después de resolver esa causa. |
| Reparar | Aparece cuando la instalación gestionada necesita reparación; inspeccionar el tiempo de ejecución afectado antes de confirmar. |

La página inspeccionada ofrece Codex, Claude Agent, OpenCode y CodeBuddy. Las fuentes disponibles y los requisitos de autenticación difieren; no asuma cada marco ofrece el mismo método de instalación o de inicio de sesión.

## Instalar y verificar {/* #install-and-verify */}

1. Seleccione **Instala &#91;framework&#93;** y revise la fuente ofrecida. Una instalación gestionada se mantiene bajo almacenamiento controlado por la aplicación; una instalación manual debe ser descubierta por la aplicación.
2. Siga el progreso y lea el registro de instalación si un paso falla. Resolver el medio ambiente/requisitos de red antes de reintentar.
3. Utilice **Re-detect** después de una instalación manual. Confirme la versión y el camino esperados en lugar de depender de la presencia de un comando en otro terminal.
4. Seleccione la tarjeta lista. Revise el diálogo de conmutación, luego confirme el backend deseado.
5. Chequee **Settings → Model**, ejecute una pequeña solicitud, e inspeccione un resultado de respuesta/herramienta real.

Para OpenCode, **Install → App-managed download (recommended)** descarga un tiempo de ejecución autocontenido. La página mostró Resolver, descargar el progreso, y luego una tarjeta Installed con su versión y ruta. Seleccione esa tarjeta, confirme **¿Cambiar a OpenCode?** y elija un modelo compatible. El ejemplo de conexión local devolvió una respuesta completa; ver [configuración del proveedor local](./providers.md#connect-a-local-model-endpoint) para sus límites API y token.

Para Codex, el adaptador ACP y el tiempo de funcionamiento nativo deben pasar la detección como un par compatible. Instalar sólo un componente no es equivalente a un backend listo. La suscripción de proveedor está cubierta en [Configuración del proveedor](./providers.md).

En v0.33.0, **Claude Agent** requiere Claude CLI **2.1.118 o más tarde**. Si la detección reporta una versión sin soporte, actualice la instalación detectada a través de su método de instalación, luego use **Re-detect** y compruebe la preparación antes de iniciar una sesión. Actualizar un CLI diferente en su camino no repara la instalación mostrada en la tarjeta.

## Actualizar un tiempo de ejecución Codex gestionado por aplicaciones {/* #update-codex */}

Abrir **Settings → Agent** y leer las versiones **Codex CLI** y **ACP** de la tarjeta Codex por separado. Si se ofrece una actualización al par probado, termine o cierre las sesiones usando ese tiempo de ejecución, elija la acción de actualización y espere a que la detección se complete. Confirme las nuevas versiones y la preparación, luego envíe una pequeña solicitud en una sesión.

Una actualización administrada por aplicaciones sustituye el tiempo de ejecución de propiedad de la aplicación; un CLI externo debe ser actualizado a través de su método de instalación original, seguido por **Re-detect**. La aplicación se niega a reemplazar mientras que un proceso Codex de la aplicación está utilizando el objetivo. Esta operación no actualiza el Open-Science en sí o migra una tarea en vuelo.

## Interruptor sin confundir la historia retenida con el estado vivo {/* #switch-without-confusing-retained-history-with-live-state */}

Termine o detenga la operación actual antes de cambiar. El cambio se aplica a los siguientes turnos y flujos de trabajo de todos los proyectos. Las tareas en curso mantienen su entorno de ejecución hasta finalizar; las conversaciones inactivas se reconectan cuando vuelven a utilizarse. Conservar el historial no transfiere procesos en ejecución ni garantiza que se conserven las variables del intérprete. Revise los archivos, Notebook y los permisos antes de continuar el cálculo.

Después de cambiar, compruebe el modelo seleccionado para la conversación. Las suscripciones Codex admiten [Side Chat](./delegation.md); las operaciones o la recuperación pendientes de sesión pueden impedir temporalmente la apertura. Siga el mensaje mostrado por la entrada.

## Reparación y remoción {/* #repair-and-removal */}

Utilice el flujo de reparación de la aplicación para un tiempo de ejecución gestionado roto; no eliminar sus directorios durante un instalador de funcionamiento. Si se muestra una instalación externa, repara esa instalación y redetectala. Para eliminar un backend gestionado, active otro backend listo primero, abra **Uninstall**, y lea la lista de componentes de la confirmación. La eliminación no es un paso de limpieza necesario simplemente para cambiar los modelos.


### Desinstalar y reinstalar un tiempo de ejecución gestionado por la aplicación {/* #uninstall-and-reinstall-an-app-managed-runtime */}

1. Mantenga un backend diferente **Active**. En este ejemplo, Codex permaneció activo mientras que OpenCode fue eliminado.
2. En la tarjeta OpenCode inactiva, elija **Uninstall**. La confirmación se aplica a la copia descargada y gestionada por esta aplicación; una copia instalada por separado no se ve afectada.
3. Confirme **Uninstall**, luego elija **Re-detect**. OpenCode debe moverse a **Available** con **Not installed**.
4. Elige **Install OpenCode → App-managed download (recommended)**. Espere a la tarjeta **Installed**, luego seleccione y confirme **Switch**.
5. Chequee **Active**, la ruta de ejecución y la selección de modelos compatibles. Reinstalar el backend no configura un proveedor de modelo para él.

![Ámbito de desinstalación OpenCode gestionado por la aplicación](/img/open-science/priority-completion/01-opencode-uninstall.webp)

Antes de eliminar un backend, cambie a otro backend disponible; el backend activo no puede ser eliminado a través de este control. Después de reinstalar, re-detectar y activarlo, luego abrir un proyecto existente y ejecutar una pequeña solicitud para comprobar la conexión.

![OpenCode instalado de nuevo y seleccionado](/img/open-science/priority-completion/03-opencode-reinstalled.webp)

Si las acciones de instalación son deshabilitadas, compruebe otra instalación/switch en progreso y el error previo declarado. Si la detección tiene éxito pero las solicitudes fallan, inspeccione la autenticación del modelo y compatibilidad marco/API por separado.

Fuentes: [Panel de Agentes](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentPanel.tsx), [tarjeta marco](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentFrameworkCard.tsx).

Comportamiento de exploración y conmutación: [configuración de almacenamiento](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/settings/repository.ts), [conmutación de tiempo de ejecución](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/acp/runtime-coordinator.ts).
