---
title: "Controles y referencia de teclado"
last_update:
  date: '2026-09-24'
---

# Controles y referencia de teclado {/* #controls-and-keyboard-reference */}

Utilice este índice para encontrar la explicación canónica de un control. Mantiene los límites de campo y los atajos juntos sin repetir los pasos completos de la tarea. Las etiquetas se refieren a la interfaz de Inglés.

## Controles por tarea {/* #controls-by-task */}

| Necesitas | Entrada o control | Comportamiento detallado |
| --- | --- | --- |
| Crear o describir un proyecto | **New project**, menú del proyecto → **Project settings** | [Campos de proyectos](../guides/projects.md) |
| Mantenga una nota de lectura privada | Selección → **For me → Bookmark**, Compositor **Bookmarks** | [Marcas de lectura](../guides/bookmarks.md) |
| Configurar una conexión modelo | **Settings → Model** | [Configuración del proveedor](../guides/providers.md) |
| Adjuntar una fuente, enviar o colar una solicitud | Compositor **+**, chip adjunto, **Send**, controles de cola | [Conversaciones y solicitudes en cola](../guides/composer.md) |
| Inspeccione un tiempo de ejecución o paquetes instalados | **Settings → Runtimes**Controles de intérpretes y paquetes | [Horas de ejecución Python y R](../guides/runtimes.md) |
| Inspeccione cálculos y variables | **View notebook**, **Variables**, artefacto **Provenance** | [Notebook y pruebas de ejecución](../guides/notebook.md) |
| Acceso a subvenciones o revocaciones | Tarjeta de aprobación, **Settings → Permissions** | [Permisos y aprobaciones](../guides/approval-modes.md) |
| Diagnosticar una conexión de paquete | **Settings → Network** | [Dominios, proxy y espejos](../guides/network.md) |
| Configurar computación remota | **Settings → Compute → Add SSH host** | [Configuración SSH y Slurm](../guides/remote-compute.md) |
| Verificar un producto de investigación | Tarjeta de archivo generada, vista previa, **Provenance** | [Análisis de datos públicos](../workflows/data-quality.md) |
| Mira los límites | Campo de formato o configuración | [Límites de archivo](formats.md), [Configuración](configuration.md), [Formatos de paquete](packages.md) |

El [índice de control completo](control-index.md) lista controles por página de aplicación; esta página agrupa tareas comunes y atajos de teclado. Ambos enlaces a los mismos tutoriales detallados.

## Referencia del teclado {/* #keyboard-reference */}

| Medida | macOS | Windows/Linux | Condiciones y alcance |
| --- | --- | --- | --- |
| Búsqueda de aplicaciones | `⌘K` | `Ctrl+K` | Búsqueda en el hogar/espacio de trabajo; en Ajustes, enfocar su búsqueda de encabezado |
| Configuración | `⌘,` | `Ctrl+,` | Abre Ajustes cuando la superposición actual permite el atajo |
| Nueva conversación | `⌘N` | `Ctrl+N` | Workspace; requiere una conversación existente con mensajes; ignorado mientras un diálogo de bloqueo está abierto |
| Toggle sidebar | `⌘B` | `Ctrl+B` | Workspace; toggles el cajón de pantalla estrecha o la barra lateral de escritorio |
| Enviar texto del compositor | `Enter` | `Enter` | Cuando el envío está disponible; un piquete de mención abierta es dueño de Enter; La composición de IME no se presenta |
| Nueva línea | `Shift+Enter` | `Shift+Enter` | Texto del compositor |
| Anterior/Proyecto inmediato | `↑` / `↓` | `↑` / `↓` | Iniciar la navegación con el cuidado al principio y sin selección; una mención abierta picker tiene precedencia |
| Undo borrador | `⌘Z` | `Ctrl+Z` | Proyecto de historia del compositor |
| Proyecto de reforma | `⌘Shift+Z` | `Ctrl+Shift+Z` | Proyecto de historia del compositor |
| Cerrar la superficie activa | `⌘W` | `Ctrl+W` | Aplicación de escritorio: previsualización transitoria primero cuando sea aplicable, luego pestaña de vista previa/pane, luego ventana; acceso del navegador puede utilizar atajos del navegador |
| Retírense. | `Esc` | `Esc` | Donde se apoye; guardar o bloquear la confirmación puede cambiar el comportamiento de despido |

No presione repetidamente el acceso directo esperando que sólo esconda un archivo. Después de que las previsualizaciones hayan cerrado, la siguiente invocación puede cerrar la ventana de aplicación. El cierre de la ventana y el cierre del proceso son comportamientos independientes dependientes de la plataforma.

Cerrar una pestaña Side Chat requiere confirmación y detiene/deletes esa discusión lateral; el cierre de archivo-previsual no elimina el archivo. Ver [Side Chat](../guides/delegation.md).

## Activadores de referencia de compositores {/* #composer-reference-triggers */}

| Trigger | Selección | Compruebe antes de enviar |
| --- | --- | --- |
| `/` | Enabled Skill | Confirme el método previsto y las dependencias de apoyo |
| `@` | Referencia/scopio de archivo/artifacto o literatura disponibles | Confirme la fuente y la versión seleccionadas donde se muestra |
| `#` | Reunión de referencia | Confirme la conversación prevista |

Seleccionar una sugerencia inserta una referencia estructurada. Merely typing a familiar filename or Skill name is not evidence that the corresponding reference was attached. Inspeccione el chip insertado y la solicitud.

## Ámbito de búsqueda {/* #search-scope */}

App global search covers projects, sessions, message text, uploaded/generated files, Library records and collections, and indexed contents of supported uploads. Los archivos generados se registran por nombre; contenido no indexado no es buscado. Seleccione una categoría para reducir los resultados, luego inspeccione el contexto de un resultado antes de abrirlo. Esto no significa que cada PDF, imagen u otro archivo binario tenga un índice de texto completo de búsqueda. Ver [Navegación y búsqueda](../guides/navigation.md) para el flujo de trabajo completo.

La búsqueda del wiki es separada: indexa los títulos de documentación, títulos y pasajes corporales en el idioma actual. Un término como “Inbox” puede coincidir con un párrafo aquí incluso si está ausente del título de sesión de una aplicación.

Referencia técnica: [vinculantes para la aplicación](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [composer teclado](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [comportamiento cercano](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [búsqueda mundial](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx).

Ajustes panel/búsqueda de diálogo utiliza **XXXK** en macOS y **Ctrl+Alt+K** en Windows/Linux. **XXXK / Ctrl+K** sigue centrando la búsqueda de encabezados Ajustes. Ver [alcance atajo](../guides/shortcuts.md#local-settings-search).
