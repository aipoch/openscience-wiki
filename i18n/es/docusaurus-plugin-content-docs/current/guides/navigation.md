---
title: "Navegación y búsqueda"
last_update:
  date: '2026-09-29'
---

# Navegación y búsqueda {/* #navigation-and-search */}

Use Home para elegir la investigación, la lista de sesiones para elegir su conversación, y prevea inspeccionar sus fuentes y resultados. Este capítulo sigue el verdadero proyecto **GSE60450 - RNA-seq count quality**.

## Comienzo de Inicio {/* #start-from-home */}

Utilice **Settings → General → Appearance** para cambiar el idioma o tema de la aplicación. Los paneles de grupos [centro de configuración](../settings/overview.md) por propósito y proporciona su propia búsqueda.

![Inicio con los proyectos de expresión genética y literatura](/img/open-science/v0.27.0/01-home.webp)

| Entrada | Medida | Check after opening |
| --- | --- | --- |
| Tarjeta de proyecto | Abrir el espacio de trabajo de ese proyecto | Nombre del proyecto por encima de la lista de sesiones |
| Período de sesiones reciente | Reanudar esa conversación directamente | Título de sesión y proyecto de propiedad; títulos similares pueden pertenecer a diferentes proyectos |
| Nuevo proyecto | Nombre, descripción y agente Context | Véase [Proyectos](projects.md) para el alcance de campo y acceso de carpetas |
| Buscar | Búsqueda global abierta | Buscar proyectos, mensajes, archivos y literatura; La búsqueda de Wiki es separada |
| Biblioteca | Referencias compartidas abiertas | Los puntos de vista del proyecto y la colección son enlaces a la misma biblioteca |
| Configuración del modelo | Configurar el acceso modelo | Una cuenta conectada y una exitosa carrera de investigación son estados separados |
| Ajustes → General → Apariencia | Cambio de idioma / Tema | lenguaje de interfaz no traduce contenido de tarea |
| Mensajes | Inspeccione los mensajes de aplicación | Lea el evento real; un contador no leído no es un conteo de falta de tarea |

En un espacio de trabajo, **All projects** vuelve a casa. El menú del nombre del proyecto contiene acciones de proyecto; el menú al lado de una sesión afecta a esa sesión. **New** bajo Sesiones comienza otra conversación en el proyecto actual. No crea otro proyecto ni copia sus carpetas de origen.

## Mantenga la conversación y la evidencia visible {/* #keep-the-conversation-and-evidence-visible */}

El espacio de trabajo tiene una barra lateral de sesión, una conversación y un área de vista previa opcional. **Files** abre la biblioteca de archivos; **Library** abre referencias; **Open notebook** abre la ejecución registrada. Seleccione una pestaña de vista previa para cambiar el archivo visible. Abrir otro resultado puede añadir una pestaña mientras que las pestañas previamente abiertas permanecen disponibles.

Arrastre el separador **Resize left panel** o **Resize right panel** para asignar espacio. Collapse la barra lateral o el panel de vista previa al leer contenido amplio; reabrirlo usando el control de borde correspondiente. Estos son cambios de diseño. No cancelan una tarea de ejecución, eliminan un archivo o eliminan su historial de versiones. La navegación de archivos de pantalla completa y las previsiones de pantalla completa son controles separados; cerrar la superficie correcta para volver al diseño anterior.

## Elija el alcance de la búsqueda correcta {/* #choose-the-right-search-scope */}

| Buscar superficie | Búsquedas | Ejemplo útil |
| --- | --- | --- |
| App global search | Proyectos, sesiones, texto del mensaje, nombres de archivos subidos/generados y registros/colección de la Biblioteca; contenidos indexados de cargas soportadas | Una frase de una respuesta, un nombre de archivo o un título de papel |
| Archivos → Buscar archivos de proyecto | Nombres dentro del filtro de proyecto/fuente elegido | `rnaseq` después de seleccionar Todos los artefactos |
| Biblioteca → Referencias de búsqueda | Campos bibliográficos, incluyendo título, creadores e identificadores | A PRISMA DOI |
| Búsqueda de documentos PDF | Texto buscado en el PDF abierto | Una frase en las páginas de un papel |
| Búsqueda de esta documentación | Títulos de Wiki, títulos y texto corporal | `Inbox`, `SHA-256` o `remote access` |

La búsqueda global encuentra texto de mensaje, nombres de ficheros subidos y contenidos de carga indexados. Los archivos generados se registran por nombre; contenido no indexado no es buscado. No implica indexación de texto completo de cada PDF, imagen u otro formato binario. Utilice la propia búsqueda del documento al mirar dentro de un PDF.

## Encontrar un mensaje, un archivo o un papel {/* #find-a-result-by-name */}

1. Presione **∙K** en macOS o **Ctrl+K** en Windows/Linux, o seleccione **Search**.
2. Introduzca una frase reconocible, título o nombre de archivo. **All** grupos resultados por categoría; elegir una categoría para estrechar la lista.
3. Abrir **Advanced filters** junto a las categorías. Utilice **Search scope**, **Result order**, **Time range** y el filtro específico del remitente, formato de archivo o tipo de biblioteca. Un filtro sólo se aplica al tipo de resultado pertinente.
4. Seleccione un resultado para abrir su panel de detalle. Compruebe el proyecto/sesión de propiedad, la versión de texto o archivo que coincida antes de navegar.
5. Abra el mensaje o archivo que coincida con el panel de detalles. Para un archivo, utilice su acción de mensajería fuente cuando necesite la conversación que la produjo o adjunta. Los resultados de la biblioteca abren la referencia o colección correspondiente.
6. Cargar más dentro de una categoría de resultado cuando sea necesario. Cierre el panel de detalles para continuar la búsqueda, o pulse **Esc** para dejar la búsqueda.

El panel de detalles actualiza cuando selecciona otro resultado. Una lista inicial corta no es el recuento completo del partido; use el control de carga del grupo o siga desplazando dentro de una categoría seleccionada. Sin ninguna consulta, sesiones recientes, archivos y literatura le ayudan a regresar a trabajos recientes.

El número junto a **Advanced filters** muestra las condiciones activas. Collapsing the filter column keep those conditions applied while you inspect results. La búsqueda de reapertura devuelve la categoría a **All** y colapsa la columna; verifique el conteo y los controles del filtro antes de asumir que usted está buscando todo.

## Cuando un resultado parece faltar {/* #when-a-result-seems-missing */}

Categoría clara y otros filtros, compruebe el proyecto de propiedad y busque una frase distintiva o el nombre de archivo guardado. Use Archivado cuando busque trabajo archivado. Un camino impreso en una respuesta fallida de la herramienta no es un artefacto salvado. El contenido recién cambiado o reordenado puede requerir refrescar la búsqueda. Si un archivo se abre pero no se puede previsualizar, siga [Archivos](files.md) y [Solución de problemas](troubleshooting.md).

## Cambiar las sesiones de la bandeja {/* #tray-navigation */}

Abra el menú del icono **Open-Science** en la barra de menú macOS, bandeja Windows o un escritorio Linux con soporte de bandeja. Utilice **Running sessions** para encontrar trabajo activo, **Pinned sessions** para conversaciones confinadas, o **Recent items** para contenido reciente. Las listas más largas continúan bajo **Más artículos**. Después de elegir una entrada, compruebe el proyecto y el título de conversación que abre.

Use **Pin** junto a un título de conversación para mantenerlo útil. **Mostrar / Ocultar** cambia la visibilidad de la ventana; **Quit** sale de la aplicación. Cambiar las conversaciones no detiene una tarea. La disponibilidad de iconos Linux depende del soporte de bandeja del escritorio. Vea [comparecencia y notificaciones](appearance.md) para el comportamiento de ventana y alertas.
