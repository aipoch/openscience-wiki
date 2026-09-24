---
title: "Atajos de teclado"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import Screenshot from '@site/src/components/Screenshot';

# Atajos de teclado {/* #keyboard-shortcuts */}

Las acciones de teclado dependen del enfoque. Una clave que edita texto en el Composer puede navegar por una lista de resultados o cerrar una vista previa cuando se enfoca un control diferente. Lea el atajo visible y la superficie seleccionada antes de utilizarlo durante una tarea de ejecución.

<PlatformGuide />

## Búsqueda y navegación {/* #search-and-navigate */}

| Medida | macOS | Windows/Linux | Enfoque y resultado |
| --- | --- | --- | --- |
| Búsqueda de aplicaciones abiertas | ∙K | Ctrl+K | Buscar proyectos, sesiones, mensajes, archivos y literatura; ver [alcance de la búsqueda](navigation.md) |
| Búsqueda dentro de Ajustes | ∙K | Ctrl+K | Mientras que Configuración está abierta, concentre su búsqueda de encabezado; ver [Sinopsis de la configuración](../settings/overview.md) |
| Mover a través de los resultados de búsqueda | Arriba / Down | Arriba / Down | Paleta de comandos: mueva el punto culminante |
| Primer / último resultado | Inicio / Fin | Inicio / Fin | Navegación de resultados de búsqueda cuando se maneja por la paleta |
| Resultado seleccionado abierto | Entra | Entra | Inspeccione los detalles del resultado, a continuación, abra el mensaje de coincidencia, archivo o registro |
| Búsqueda cercana/menu | Esc | Esc | Desestimar la superposición activa; formularios no salvos pueden tener su propia confirmación |
| Mover el foco | Tab / Shift+Tab | Tab / Shift+Tab | Avance/retrocedente mediante controles habilitados |

Abrir búsqueda de aplicaciones con el acceso directo para su plataforma e introducir una frase, título o nombre de archivo. Seleccione un resultado, compruebe su contexto en el panel de detalles, y luego abra el contenido de coincidencia. Utilice la entrada de mensajería fuente para encontrar el contexto de un archivo. Véase [Navegación](navigation.md) para filtros y alcance de búsqueda; la búsqueda separada de Wiki incluye el texto del cuerpo de documentación.

## Comparación y referencia de los insumos {/* #compose-and-reference-inputs */}

| Entrada | Dónde utilizarlo | Verificación antes de continuar |
| --- | --- | --- |
| `@` | Compositor | Elija una sugerencia de archivo/artifact/referencia real; texto plano por sí solo no se une a un archivo |
| `/` | Compositor | Seleccione un Skill disponible; su apariencia no establece todos los prerrequisitos del tiempo de ejecución |
| `#` | Compositor | Seleccione la referencia de la transcripción de la sesión prevista |
| Arriba / Down | Compositor vacío al principio | Inspecciona la historia y los apegos restaurados antes de reenviar |
| solubleZ / Ctrl+Z | Editor de texto centrado | Deshacer el borrador de edición manejado por ese editor |
| solubleShift+Z / Ctrl+Shift+Z | Compositor focalizado | Rehacer un borrador de edición donde se apoyó |
| Visualizado Enviar atajo | Compositor | Presenta la solicitud; utilizar el botón Enviar si no está seguro sobre un borrador multilineal |

<PlatformContent platform="windows">

En la aplicación de escritorio Windows, haga clic en el borrador de Composer antes de usar **Ctrl+Z** para deshacer o **Ctrl+Shift+Z** para rehacer. Revise el texto resultante antes de continuar o enviar. Al utilizar **Tab / Shift+Tab**, busque el esquema de control enfocado, como el botón de acceso a continuación. Confirme el enfoque de nuevo después de abrir un panel o cambiar el estado del control; no confía en un número fijo de pulsaciones.

<Screenshot
  src="/img/open-science/windows/keyboard-attachment-focus.webp"
  alt="El botón adjunto tiene un esquema de enfoque de teclado visible en el Compositor Windows"
  width={1916}
  height={1014}
  windowBounds={[215, 850, 920, 150]}
  href="/docs/img/open-science/windows/keyboard-attachment-focus.webp"
  linkLabel="Abra la pantalla Windows completa que muestra el enfoque adjunto-buttón"
/>

El detalle muestra el esquema de enfoque y el alcance de la herramienta del botón adjunto. Seleccione la imagen para abrir la imagen completa.

</PlatformContent>

No utilice un atajo genérico de undo como sustituto para restaurar un artefacto borrado o invertir el código ejecutado. Un archivo Undo de aviso, cuando se ofrece, es una acción separada del deshacer de texto-editor. Utilice [Archivado](storage.md) para restaurar el trabajo retenido después de que el aviso se haya ido.

## Trabajar con vistas y colas {/* #work-with-previews-and-queues */}

Enfóquese una pestaña de vista previa antes de usar **Izquierda/derecha** para mover entre pestañas o **Home/End** para elegir la primera pestaña/última. **Delete/Backspace** en una pestaña de vista previa enfocada cierra esa pestaña; no elimina el archivo fuente. Dentro de un informe editable, esas teclas editan el texto. Utilice el control cercano visible cuando el enfoque es incierto.

Una pestaña **Side Chat** enfocada tiene una confirmación destructiva: confirmar paradas que chat y elimina su conversación guardada. Utilice **Cancel** o desplome el área de vista previa para mantenerlo. Ver [Side Chat](delegation.md).

En una solicitud queued, concentre su mango de reorden, presione **Espacio** para recogerlo, utilice **Up/Down** para moverlo, y presione **Espacio** de nuevo para soltarlo. Lea el pedido resultante antes de enviar. Esto no es lo mismo que moverse entre los resultados de búsqueda o navegar Historial del Composer. Se describen en [Conversaciones](composer.md) la edición de colas/removal y la entrega retardada.

### Redimensionar sin perder archivos abiertos {/* #resize-without-losing-open-files */}

Arrastre el separador junto a la vista previa para cambiar su ancho. **Collapse preview panel** lo oculta; **Expand preview panel** restaura las pestañas abiertas. Las pestañas abiertas permanecen disponibles después del colapso/expandación. Utilice una pestaña enfocada para las teclas de navegación; escribir dentro de un editor de archivos tiene diferentes efectos.

## Si un atajo parece no responde {/* #if-a-shortcut-seems-unresponsive */}

Revise qué campo o diálogo tiene foco, cierre los sobreimpuestos no relacionados, y pruebe el botón visible. En macOS, algunas teclas Home/End requieren la combinación Fn del teclado. Los atajos OS/browser pueden interceptar las teclas antes de que la aplicación las vea. Por lo tanto, la ventana de escritorio y el punto de entrada del navegador no necesitan manejar cada clave de forma idéntica.

Fuentes: [teclado de búsqueda global](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx), [pestañas de vista previa](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/PreviewPanel.tsx), [queue](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx).

## Buscar dentro del panel de configuración actual {/* #local-settings-search */}

En Ajustes, **. . .** (macOS) o **Ctrl+K** (Windows/Linux) centra la búsqueda de encabezados a través de la configuración. **XXXK** o **Ctrl+Alt+K** centra el campo de búsqueda elegible en el panel o diálogo actual. El atajo local necesita un campo de búsqueda local disponible; no abre la búsqueda a nivel de aplicación o búsqueda de texto PDF.
