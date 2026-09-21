---
title: "Apariencia y notificaciones"
last_update:
  date: '2026-09-16'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import PreferenceScreenshot from '@site/src/components/PreferenceScreenshot';
import Screenshot from '@site/src/components/Screenshot';

# Apariencia y notificaciones {/* #appearance-and-notifications */}

Elige un tema cómodo, establece tu lenguaje de interfaz y recibe alertas de tarea mientras trabajas en otra aplicación. Abra **Settings → General** para ajustar estas preferencias. Open-Science recuerda tus opciones de apariencia en este dispositivo.

<PlatformGuide />

## Cambiar el tema y el lenguaje de interfaz {/* #change-theme-and-interface-language */}

1. En **General → Appearance**, encuentra **Theme**.
2. Elija **System** para seguir su dispositivo, o seleccione **Light** o **Dark** para mantener una apariencia fija. Puedes cambiar de nuevo en cualquier momento.
3. Bajo **Language**, elija su idioma de interfaz preferido, o **System** para usar el lenguaje del dispositivo.

<PlatformContent platform="macos">

![Ajustes de apariencia general](/img/open-science/v0.27.0/07-general-appearance.webp)

</PlatformContent>

<PlatformContent platform="windows">

<Screenshot src="/img/open-science/windows/general-settings.webp" alt="Controles de tema y lenguaje en Windows Ajustes generales" width={1920} height={1017} windowBounds={[480, 165, 960, 690]} href="/docs/img/open-science/windows/general-settings.webp" linkLabel="Abra la pantalla completa de configuración Windows General" />

</PlatformContent>

| Elección | Qué cambios |
| --- | --- |
| Tema → Sistema | La aplicación sigue el ajuste de luz / oscuro del dispositivo. |
| Tema → Luz / Oscuro | El tema seleccionado se mantiene fijo cuando el tema del sistema cambia.  |
| Idioma → Sistema | La aplicación lee el lenguaje del dispositivo al inicio. Después de cambiar el lenguaje del sistema, vuelva a abrir la aplicación para aplicarla. |
| Un idioma específico | La aplicación utiliza ese lenguaje de interfaz. Los avisos guardados, los archivos fuente y las respuestas modelo anteriores mantienen su texto original. |

Las preferencias lingüísticas y temáticas están en **Settings → General → Appearance**. El sitio web de la documentación tiene su propio selector de idiomas; cambiarlo deja sin cambios el lenguaje de la aplicación. Los diálogos de archivos del sistema siguen la configuración del sistema operativo.

Para solicitar un informe en un idioma diferente, especifique que en su conversación. Por ejemplo: “Escribe el informe en inglés y conserva los identificadores de genes originales”.

<PlatformContent platform="windows">

**Escalada de visualización ajustada en Windows**

1. Abrir Windows **Settings → System → Display** y encontrar **Escala y diseño**. Tenga en cuenta la escala actual para que pueda restaurarla.
2. Elija un texto cómodo y tamaño de la aplicación, por ejemplo **125%**.
3. Regrese a Open-Science y compruebe el Compositor y la vista previa. Una tabla más amplia puede requerir su barra de desplazamiento horizontal; ampliar la vista previa o maximizar la ventana cuando sea necesario.
4. Para deshacer el cambio, vuelva a la configuración de visualización y seleccione la escala original. Si Windows solicita un reinicio de la aplicación, ahorre su trabajo antes de reabrirlo.

El mismo informe sigue siendo legible a gran escala. Utilice la barra de desplazamiento horizontal para ver columnas fuera del puerto de visualización de la tabla actual; la escala de visualización cambia la vista, no los datos guardados.

![Open-Science en 125 por ciento escalar con una barra de desplazamiento horizontal en la tabla vista previa](/img/open-science/windows/app-scale-125.webp)

</PlatformContent>

## Establecer notificaciones de tareas {/* #set-up-task-notifications */}

Permite alertas si desea dejar un análisis de funcionamiento y regresar cuando necesita atención.

1. En **General → Notifications**, enciende **Task notifications**.
2. Elija si puede habilitar **Show task content in system notifications**. Dejalo apagado si los nombres de tareas o los detalles de la solicitud deben mantenerse fuera de las alertas del sistema.
3. Lea **System notification status**, entonces seleccione **Send test notification** si está disponible. Permitir notificaciones en el sistema operativo cuando se solicite.
4. Compruebe el estado de prueba devuelto y la superficie de notificación de su sistema. Para las alertas de tareas, cambie a otra aplicación mientras la tarea se ejecuta.

<PlatformContent platform="macos">

<PreferenceScreenshot notifications />

</PlatformContent>

| Control | Efecto |
| --- | --- |
| Notificaciones de tareas | Permite alertas para la terminación de tareas, el fracaso o una solicitud de aprobación mientras está usando otra aplicación. Apágalo para detener estas alertas de tarea. |
| Mostrar el contenido de las tareas en las notificaciones del sistema | Incluye nombres de tareas y detalles de solicitud cuando esté habilitado. Los errores del proveedor permanecen ocultos. Este control está desactivado cuando se cancelan las notificaciones de la tarea. |
| Estado de las notificaciones del sistema | Indica si este dispositivo admite notificaciones del sistema. |
| Enviar notificación de prueba | Envía una solicitud de prueba. El botón muestra **Sending test…** durante la solicitud y está deshabilitado mientras se envían o cuando las notificaciones del sistema no están disponibles. |
| A delivered task notification | Seleccione para traer a Open-Science adelante y abrir la tarea asociada. |

Cancelado tareas y fallos que la aplicación se reinicia automáticamente en silencio. **Messages** en el hogar o el espacio de trabajo es una entrada en la aplicación; El permiso de notificación de la OS se gestiona por separado.

### Regresar a una tarea desde una alerta del sistema {/* #return-to-a-task-from-a-system-alert */}

<PlatformContent platform="macos">

Seleccione una alerta de terminación o aprobación para volver a su conversación. Si te perdiste el banner, encuentra Open-Science en macOS Notification Center. Ampliar una pila agrupada primero, y luego seleccionar la alerta específica. Una alerta de aprobación abre la tarea; leer y resolver la solicitud dentro de la aplicación.

</PlatformContent>

<PlatformContent platform="windows">

1. Habilitar **Task notifications** y utilizar una notificación de prueba para comprobar el permiso del sistema.
2. Envíe una tarea y luego cambie a otra aplicación. Seleccione su alerta **Task completed** o **Approval needed** cuando llegue.
3. En Open-Science, compruebe la conversación y la solicitud original. Una alerta de conclusión debe dar lugar a su resultado final; una alerta de aprobación abre la solicitud pendiente, donde todavía necesita elegir **Permiso** o **Deny**. La selección de la notificación no aprueba la ejecución.

Si te perdiste el banner, encuentra la alerta en el Centro de Notificación Windows. Si no aparece ninguna alerta, compruebe el banner Windows y No altere la configuración. Si vuelves a casa, abre la conversación original a través de **Recent sessions**. El texto de notificación no sustituye la inspección del resultado real.

</PlatformContent>

<PlatformContent platform="macos">

![Alerta de terminación del sistema inglés con detalles de tarea ocultos](/img/open-science/priority-completion/07-system-completion-notification.webp)

</PlatformContent>
Apaga **Show task content in system notifications** para usar alertas genéricas. Seleccione una alerta de terminación o aprobación para reabrir su conversación; responder a las aprobaciones dentro de la aplicación.

### Si una notificación no aparece {/* #if-a-notification-does-not-appear */}

Comience con el resultado de la prueba, a continuación, verifique la condición que se aplica.

| Resultado o síntoma | ¿Qué hay que comprobar después? |
| --- | --- |
| **Test notification shown.** | La aplicación informa que la prueba apareció. Revise la superficie de notificación del sistema operativo; una alerta de prueba está separada de un evento de tarea real. |
| **Test notification sent, but display could not be confirmed.** | Compruebe el permiso de notificación del sistema y si el sistema operativo suprime banners. La entrega no ha sido confirmada. |
| **Test notification failed.** | Compruebe el permiso de notificación de la aplicación en la configuración del sistema, y luego vuelva a probar. Si todavía falla, recoja el error a través de [Solución de problemas](troubleshooting.md). |
| **System notifications are unavailable on this device.** | El control de prueba no está disponible. Supervisa la tarea en el espacio de trabajo. |
| Trabajos de prueba, pero una tarea no envía alerta | Confirme las notificaciones de la tarea está encendida, está utilizando otra aplicación, y el evento es la terminación, el fracaso o una solicitud de aprobación. Las cancelaciones y los registros automáticos no alertan. |
| No hay alerta mientras graba, comparte o refleja. | Compruebe si el sistema permite alertas durante la grabación o el intercambio, y comprobar Focus o No molestar. Permitir esto sólo cuando usted tenga la intención de alertas para ser visible; pueden aparecer en la grabación. |
| Alerta llega sin detalles de tarea | Verificar Mostrar contenido de tarea en notificaciones del sistema. Mantenlo fuera si prefieres ocultar esos detalles. |

<PlatformContent platform="windows">

### Regrese de la bandeja después de cerrar la ventana {/* #return-from-the-tray-after-closing-the-window */}

Con **General → Close button behaviour → Ask every time**, cerrar la ventana abre **Minimize or quit?** Elija **Minimize to tray** para ocultar la ventana, a continuación, utilice el icono Open-Science en la bandeja Windows para regresar. Seleccione **No preguntes otra vez.** sólo si desea retener esa opción; cambiarlo más tarde en General. La minimización no deja de aplicar.

</PlatformContent>

## Encontrar configuración relacionada {/* #find-related-settings */}

| Quieres... | ¿Dónde ir? |
| --- | --- |
| Compruebe la actualización de la aplicación | **General → About → Check now**; seguir [Instalación y actualizaciones](installation.md#choose-a-reproducible-version-and-update-deliberately). |
| Leer cambios de versión o obtener ayuda | **About → Release notes / Help Center** abre la página externa correspondiente. Este wiki también tiene un [Cambio](../changelog/v0.31.1.md). |
| Localizar o abrir el registro de diagnóstico | **General → Diagnostics → Reveal / Open**; ver [Solución de problemas](troubleshooting.md). Los registros permanecen locales hasta que los compartan. |
| Instalar la entrada de línea de comandos | **General → Install command**; ver [Referencia CLI](../reference/cli.md). El uso de escritorio no requiere este comando. |
| Gestionar la ubicación de datos o el trabajo archivado | [Almacenamiento y trabajos archivados](storage.md). |

<span id="verification-scope" />

## Ajustes de notificación en el sistema operativo {/* #notification-settings-in-the-operating-system */}

La entrega de notificaciones también depende de los permisos del sistema operativo, el modo Focus y la configuración de participación en la pantalla. Utilice los cheques arriba en el dispositivo donde trabaja.


Fuente: [Ajustes generales](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/GeneralPanel.tsx).
