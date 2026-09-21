---
title: "Períodos de sesiones y ramas"
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Períodos de sesiones y ramas {/* #sessions-and-branches */}

A project groups related sources and work. Una sesión es una conversación dentro de ella. Utilice una nueva sesión para una pregunta separada, y una rama cuando la nueva pregunta debe conservar un historial de conversación seleccionado. Tampoco es un reemplazo para comprobar qué archivos y la ejecución registran la nueva conversación en realidad puede acceder.

## Crear, nombrar y volver a una sesión {/* #create-name-and-return-to-a-session */}

Abra el proyecto, seleccione **New** bajo Sesiones, escriba una solicitud y envíela. Verifique el nombre del proyecto primero: una nueva sesión pertenece a ese proyecto. Seleccione una fila de sesión para volver a ella; leer su estado antes de asumir que la tarea ha terminado.

<p className="example-label"><strong>Ejemplo</strong> Name an RNA-seq quality-check session</p>

Para la ejecución GSE60450 completada, usamos **Edit…** para guardar esta información:

| Campo | Valor de ejemplo | Constraint |
| --- | --- | --- |
| Título | `RNA-seq count matrix - validation and sample QC` | hasta caracteres 80; el editor muestra el conteo |
| Descripción | `Validate the public GSE60450 matrix and retain descriptive QC outputs with source integrity checks.` | Hasta caracteres 1,000 |
| Guardar | Persiste los cambios | Revisa el título de la barra lateral después de cerrar |
| Cancelar / Cerrar | Salir sin aplicar el borrador | Esto no cancela la investigación |

![Título de sesión y editor de descripción](/img/open-science/guides-walkthrough/40-session-edit.webp)

Elija **Pin** del menú de filas para mantener la sesión en el grupo Pinned. **Unpin** lo devuelve a la lista ordinaria. Pinning organiza el acceso; no mantiene un núcleo vivo o protege una sesión de la eliminación.

Durante una sesión para comprobar su número, así como su título y proyecto. El número ayuda a distinguir conversaciones similares; confirmar la fila seleccionada antes de editar o borrarla.

## Guardar un marcador de lectura {/* #save-a-reading-bookmark */}

Utilice [marcadores privados de lectura](bookmarks.md) para guardar un pasaje o región PDF con una nota, y luego volver a él desde **Bookmarks** en esta sesión. Salvar un marcador no envía el pasaje al agente.

## Lea el menú de sesión correctamente {/* #read-the-session-menu-correctly */}

![Medidas que pertenecen al período de sesiones de RNA-seq](/img/open-science/guides-walkthrough/41-session-actions.webp)

| Medida | Resultado | Check |
| --- | --- | --- |
| Editar… | Cambiar el título/descripción | Correcta fila y etiqueta guardada |
| Descargar todos los artefactos | Abrir una selección de artefactos / flujo de descarga | Esta sesión guarda archivos y solicita selección |
| Ver Notebook | Abrir la vista de ejecución de la sesión | Propietario, idioma y carreras reales |
| Exportar conversación… | Exportar la conversación a través del formato ofrecido/opciones | La exportación de la transcripción es distinta de un paquete de artefacto/Notebook |
| Archivo | Ocultar la sesión de navegación activa | Queda recuperable en Ajustes → Archivado |
| Eliminar | Abra una confirmación de eliminación permanente | Lea exactamente qué datos se afectan; Cancela las conservas |



## Branch after a completed result {/* #branch-after-a-completed-result */}

<p className="example-label"><strong>Ejemplo práctico</strong> Subdivisión una sesión completa de CQ para la anotación de muestras</p>

Supongamos que desea discutir la anotación de la muestra aguas abajo mientras mantiene intacta la conversación QC de la cuenta cruda.

1. Abra la respuesta completa en el período de sesiones original.
2. Seleccione **Branch in new session** debajo de esa respuesta.
3. Confirme una nueva fila de sesión aparece. Inicialmente puede compartir el título original.
4. Renombrarlo a `GSE60450 - follow-up interpretation` con **Edit…**.
5. Inspeccione la transcripción heredada antes de presentar la siguiente solicitud. Referencia de los artefactos originales del proyecto explícitamente cuando sea necesario.

![Una rama de nombre independiente al lado del original de pinned](/img/open-science/guides-walkthrough/57-session-branch.webp)

Una rama conserva la historia de la conversación seleccionada, pero no recrea el núcleo vivo original. Para una actividad copiada etiquetada **code shown** o un enlace histórico bloqueado, abra el artefacto original del panel Archivos del proyecto e inspeccione su sesión de producción.

La disponibilidad de sucursales depende del estado del mensaje y del marco. [Side Chat](delegation.md#side-chat-availability) está separado. Una nueva discusión lateral hereda el modelo actual de esta conversación y el esfuerzo de razonamiento; puede seleccionar un modelo diferente para su próximo envío.

## Revise un mensaje anterior {/* #revise-an-earlier-message */}

**Edit message** en una solicitud de usuario anterior crea una revisión de mensaje, en lugar de borrar toda la historia. Lea el texto revisado y los adjuntos antes de presentarlo. Use **Anterior/Siguiente revisión del mensaje** donde esté disponible para inspeccionar alternativas. El contexto visible posterior depende del camino seleccionado; una respuesta vieja no debe ser tratada como la respuesta a una solicitud recién editada.

<p className="example-label"><strong>Ejemplo práctico</strong> Revise una solicitud de definiciones métricas de QC</p>

Para este ejemplo de QC, elija **Edit message** en la pregunta completada, reemplace la solicitud de un consentimiento con cuatro definiciones, y elija **Send**. Los controles de revisión no están disponibles mientras se está ejecutando la nueva respuesta. Una vez que termine, **Previous message revision** vuelve a `1/2` con la pregunta y respuesta originales; **Next message revision** vuelve a la respuesta revisada. Otra corrección a los nombres exactos de campo CSV produjo `3/3`. En esta sesión de suscripción de Codex, los dos informes guardados antes de que el mensaje revisado permaneciera disponible y sus bytes descargados no se cambiaron.

La misma vía de revisión también se ejecutó con OpenCode y un modelo local: la solicitud revisada produjo la nueva frase, Anterior restableció la respuesta original, y Next restauró la respuesta revisada. Este solo ejemplo de conexión no establece que el estado de la herramienta o los efectos secundarios externos se invierten.

![Controles para cambiar las revisiones del mensaje histórico](/img/open-science/local-todo-batch/18-message-revision.webp)

**Cancel** deja sin enviar la edición. **Send** solicita una nueva respuesta; compruébalo antes de continuar. Use un seguimiento para corregir la siguiente acción o una rama para una investigación por separado.

## Paquetes de investigación {/* #research-packages */}

Para entregar las ramas de conversación, archivos y pruebas juntos, utilice un [Paquete de investigación .science](research-packages.md). La guía cubre las opciones de exportación, importación e inspección, sesiones de sólo lectura y recuperación de transferencia.

## Exportar conversaciones y archivos de investigación {/* #export-conversations-and-research-files */}

Elija **Export → Export conversation…** en el menú de la fila de sesión para compartir una discusión de investigación. Primero usa **Edit…** para dar a la sesión un título conciso: la exportación PDF utiliza ese título, y un título automático largo puede consumir gran parte de la primera página.

| Control | Medidas y resultados |
| --- | --- |
| Formato → PDF / Markdown | PDF para lectura e impresión; Markdown para la edición posterior |
| Conversación completa | Exportar la actual rama de conversación |
| Seleccionado | Mostrar las casillas de verificación de giro, inicialmente vacías; el contador sigue su selección |
| Seleccionar todo | Seleccione cada turno de lista |
| Exportar PDF / Exportar Markdown | Abra el diálogo de ahorro del sistema; no disponible cuando no se seleccionan turnos |
| Cancelar | Cerrar sin crear una exportación |

<p className="example-label"><strong>Ejemplo práctico</strong> Exportar sólo las definiciones finales GSE60450 QC turn</p>

![Seleccionando las definiciones finales de QC recurre para la exportación PDF](/img/open-science/local-todo-batch/20-selected-conversation-export.webp)

En **GSE60450 — Methods and claim audit**, la selección de la vuelta final produjo un PDF de una página con sólo esa petición y sus cuatro definiciones métricas. La discusión anterior estaba ausente. El PDF de conversación completa también fue reabierto y comprobado. La exportación de marcación de vuelta seleccionada anterior comenzó con su seguimiento seleccionado. Un giro puede contener varios mensajes auxiliares, por lo que seleccionar un turno no necesita exportar exactamente dos mensajes.

La exportación de conversación no sustituye la descarga del archivo de investigación. Los enlaces de resultados pueden referirse a los registros de aplicaciones internos que un destinatario no puede abrir. Descargue el CSV, figuras o informes por separado cuando estos archivos son parte de la entrega.

### Descargar artefactos de sesión {/* #download-session-artifacts */}

Elija **Download all artifacts**, seleccione los archivos, elija **Descargar artefactos N**, y elija una carpeta de destino. Esta entrada guarda archivos separados. Los dos métodos descargados y los archivos de Markdown de claim-audit fueron reabiertos y coincidieron con sus artefactos guardados byte for byte.

![Selección de los dos informes guardados en la sesión](/img/open-science/local-todo-batch/21-session-artifact-selection.webp)

### Descargar un paquete de archivo de proyecto {/* #download-a-project-file-bundle */}

Abra el menú de nombre de proyecto en la parte superior izquierda → **Download artifacts…**. Los archivos se agrupan bajo **Generated** y **Uploads**. Todos se seleccionan inicialmente; use **Uncheck all**, elija los archivos para entregar, y guarde el ZIP.

![Selección de informes, la tabla QC y la entrada de cuenta original del proyecto](/img/open-science/local-todo-batch/22-project-artifact-selection.webp)

Elija **Cancel** en el sistema ahorre diálogo para abandonar que ahorra; su selección de archivos sigue disponible. Una vez que la escritura comienza, la aplicación desactiva la cancelación y el cierre. Esperar el resultado; cancelar el diálogo de destino es diferente de detener una escritura en progreso.

Si sólo algunos archivos descargados, restaurar el acceso a los archivos fuente no disponibles, entonces seleccione la entrega completa y descargar de nuevo. Salvar al mismo nombre ZIP reemplaza el archivo anterior. Seleccionar sólo archivos fallidos crea un nuevo paquete que contiene sólo esos archivos; no los anexa al ZIP anterior.

Abra el ZIP descargado y compare los conteos de archivos, nombres y contenidos bajo `generated/` y `uploads/` con su selección antes de compartir. Este paquete no es una copia de seguridad del proyecto completo, historia de conversaciones, núcleo Notebook o tiempo de ejecución.

## Archivo y restauración de una rama terminada {/* #archive-and-restore-a-finished-branch */}

Elija **Archive** en la rama prevista, luego abra **Settings → Archived → Sessions**. Compruebe el tiempo de proyecto y archivo antes de seleccionar **Restore**. Confirme que la rama vuelve a la navegación activa y su contenido guardado abierto; la conversación original es separada.

Para un proyecto archivado, utilice su entrada **Manage** e inspeccione las sesiones del proyecto. Ver [Almacenamiento y trabajos archivados](storage.md) para la diferencia entre archivo, restauración, eliminación y reubicación de almacenamiento. La desaparición de una sesión de la lista activa no es evidencia de que el espacio de disco fue reclamado.

Fuentes: [editor de sesión](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/EditSessionDialog.tsx), [ejecución del espacio de trabajo](https://github.com/aipoch/open-science/tree/v0.26.0/src/renderer/src/pages/workspace).

## Preparar un período de sesiones en curso {/* #fork-session */}

Utilice **Fork** cuando necesite una copia de trabajo independiente de una sesión local o importada. **Branch in new session** comienza a partir de un mensaje seleccionado; Fork copia el historial completo de investigación guardado de la sesión, incluyendo sus ramas, registros Notebook, versiones de archivos, literatura, anotaciones y marcadores privados. La sesión de origen permanece inalterada. Copiar un registro no lo reimprime o establece que su entorno está listo en este ordenador.

1. En la aplicación de escritorio, termine o pare la tarea actual. Espere a que cualquier transferencia de paquetes termine.
2. Abra las acciones de la fila de sesión y elija **Fork**. La aplicación muestra los progresos en la transferencia; **Run in background** esconde esa ventana sin cancelarla.
3. Espera a **Fork completed** y abre la nueva sesión. Abra su título para inspeccionar **Source session** y el nuevo número de sesión.
4. Abra un archivo heredado y compruebe su contenido. Inspeccione el modelo seleccionado y el tiempo de ejecución antes de continuar; viejos caminos o permisos de la máquina pueden necesitar atención.
5. Envíe la siguiente tarea en la copia y compruebe su nueva salida. Mantenga el original como el registro de referencia.

![Presione en el menú de acciones de sesión](/img/open-science/v0311/fork-menu.webp)

![Nueva información de sesión que muestra su fuente y archivo QC heredado](/img/open-science/v0311/fork-info.webp)

Fork está disponible en la aplicación de escritorio. Las sesiones importadas permanecen solos hasta que trabajes en su tenedor. Los ajustes del proyecto y la memoria no son un proyecto copiado separado. Los registros antiguos de revisión o verificación describen sus versiones registradas; inspeccionar cualquier estado anticuado antes de tratarlos como cheques actuales.

### Continuar un cálculo de QC en la copia {/* #continue-a-qc-calculation-in-the-copy */}

<p className="example-label"><strong>Ejemplo práctico</strong> Presione una sesión local en v0.31.1</p>

En el proyecto GSE60450, marque la sesión QC existente y abra el `gse60450-qc-summary.csv`. Compruebe las muestras **12** y las cuentas totales de **269,027,617** en bruto. En la copia, pida al agente que lea ese archivo con Python, verifique ambos valores, calcule los promedios por muestra y guarde un `fork-qc-check.csv`. El resultado es **22,418,968.083333…**. La fuente y los archivos heredados tienen contenidos idénticos; el nuevo cálculo es un archivo separado. Esto significa que demuestra la continuación, no la normalización de la expresión.

![Cálculo Python y un nuevo resultado ahorrado en la sesión prefabricada](/img/open-science/v0311/fork-result.webp)

<ExampleDownload path="/examples/v0311/fork-qc-check.csv">Descarga el resultado calculado</ExampleDownload>. Para continuar con un paquete `.science` recibido, siga [Paquetes de investigación](research-packages.md).

## Lea la tarjeta de información de sesión {/* #session-information */}

Seleccione el título de sesión para ver su número, descripción, fuente, tiempos de creación/actualización, recuento de mensajes para el recuento actual de rama y artefacto. Utilice **Pin** para mantener la sesión fácil de encontrar, o **Editar sesión** para cambiar su título y descripción. Un separador **Continúe con el chat** se vincula de nuevo a la fuente registrada.
