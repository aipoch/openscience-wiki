---
title: "Archivos, artefactos y versiones"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Archivos, artefactos y versiones {/* #files-artifacts-and-versions */}

Mantenga el archivo original, copia subida y el artefacto generado distinto. Esta página cubre la propiedad, encontrar archivos y guardar revisiones. Ver [Avances](previews.md) para ver los controles y [Sesiones](sessions.md) para los paquetes de exportación.

<PlatformGuide />

## Adjuntar una entrada o hacer referencia a una carpeta {/* #attach-an-input-or-reference-a-folder */}

Utilice **Composer → + → Attach files**, seleccione `GSE60450_Lactation-GenewiseCounts.txt`, espere el chip de acceso, y previsualice antes de enviar. El nombre de la pantalla sigue siendo reconocible; la ruta de entrada gestionada puede incluir un sufijo de suma de comprobación. La eliminación de un chip cancela su inclusión en el borrador, no el archivo original en el disco. **Your files** selecciona un archivo de proyecto existente en lugar de subirlo de nuevo.

Una referencia de carpeta es útil cuando varias entradas deben permanecer en el disco. En **Files → Filter project files → This computer → Add folder…**, navegar a un subcarpeta específico y elegir **Read-only** o **Read & write**. Revise la confirmación del kernel antes de **Grant this folder**. Cambiar el acceso a archivos Notebook detiene los núcleos activos para que sus permisos puedan ser recreados. Cancelar deja la donación propuesta sin ser aplicada. La selección de carpetas y los permisos se detallan en [Proyectos](projects.md).

| Control local de archivos | Acción y estado resultante |
| --- | --- |
| Ruta del directorio | Entra en un directorio permitido, luego navega a él |
| Ir al directorio superior | Mover un directorio dentro de las reglas de acceso del navegador |
| Ir a | Elija una ubicación guardada |
| Actualizar directorio | Recargar el listado del directorio |
| Fijar esta carpeta | Añada/remove un acceso directo a la ubicación; eliminarlo no elimina la carpeta |
| Fichero | Abra el archivo en una vista previa |
| Recargar archivo | Releer el archivo externo después de que cambie |
| Más acciones → Copiar el camino | Copiar la ruta del archivo externo |
| Más acciones → Guardar como artefacto | Guardar una copia de proyecto gestionada; espera a Saved |
| Descargar | Guardar una copia externa a través del flujo de ahorro de la plataforma |

Una beca de sólo lectura protege el directorio externo mientras que permite salidas dentro del espacio de trabajo del proyecto. Utilice los controles de archivo local arriba para refrescar fuentes y guardar copias gestionadas.

<PlatformContent platform="windows">

Para una carpeta existente, abra **Files**, seleccione el desplegable **Artifacts** y luego **This computer → Add folder…**. En el cuadro de diálogo **Grant folder access** de la aplicación, elija un subcarpeta específico y **Read-only**, luego **Grant this folder**. La raíz del perfil del usuario puede estar indisponible; seleccione el subcarpeta de investigación en su lugar. Lea cualquier confirmación de impacto de Notebook-kernel. Al regresar a los archivos, verifique la carpeta seleccionada y sus archivos.

<Screenshot src="/img/open-science/windows/granted-folder-files.webp" alt="Una carpeta Windows otorgada que muestra el script público y CSV" width={1920} height={1017} windowBounds={[1157, 0, 763, 237]} href="/docs/img/open-science/windows/granted-folder-files.webp" linkLabel="Abra la pantalla Windows completa" />

En el cuadro de diálogo Windows **Attach files**, seleccione un archivo de una ruta que contenga caracteres o espacios chinos, o introduzca su ruta completa en el campo **File name** y ábrelo. En la aplicación, compruebe el nombre de acceso y previsualice las dimensiones y contenidos de la tabla. Para abandonar una selección, elija **Cancel** y compruebe que no se agregó ningún nuevo adjunto al proyecto.

</PlatformContent>

## Encontrar insumos y resultados generados {/* #find-inputs-and-generated-results */}

1. Abra **Files** y seleccione **Filter project files → All artifacts**.
2. Lea **Your uploads** por separado de **Generated files** agrupado por sesión.
3. Seleccione **List view** para nombres y tamaños, o **Grid view** para tarjetas visuales.
4. Introduzca un fragmento de nombre de archivo en **Search project files**, como `rnaseq`. Compruebe los nombres de coincidencia y las sesiones de propiedad.
5. Limpiar la búsqueda para mostrar los archivos excluidos por ese filtro.
6. **Expand files** abre la biblioteca más grande; **Exit full screen files** vuelve al espacio de trabajo.

<PlatformContent platform="macos">

![Resultados RNA-seq reales filtrados en la biblioteca de archivos](/img/open-science/guides-walkthrough/56-files-search.webp)

</PlatformContent>
El conteo describe el filtro actual. Una búsqueda sin fósforos no elimina archivos. **No more** significa que el grupo ha terminado de cargar. Collapse a group by its heading. Utilice la acción de vista previa de un cuerpo de archivo para un modal, o **Abierto ... en visión dividida al lado de la sesión** para retener la conversación al lado de él. Descargar actos en el archivo/versión seleccionado por esa superficie.

### Volver a una carpeta local y guardar una copia de lectura {/* #return-to-a-local-folder-and-save-a-reading-copy */}

1. Abrir **Files → Filter project files → This computer** e introducir el directorio de origen permitido en **Directory path**.
2. Seleccione **Pin this folder**. Navegue en otro lugar, luego **Go to → Pinned** para regresar. **Remove bookmark**, o el **Unpin** de la hilera fija, elimina el atajo solamente.
3. Elija **Refresh directory** para ver los nombres de archivo recién añadidos. Para un archivo ya abierto cambiado fuera de la aplicación, utilice **Reload file** para releer su contenido.
4. En la vista previa local, elija **More actions → Save as artifact** y espere a **Saved**.
5. Volver a **All artifacts → Your uploads** y volver a abrir la copia guardada. Ha gestionado controles de versiones y no hay ruta de origen local en el encabezado.

Reabrir la copia gestionada y comparar su contenido con la fuente local. Los cambios de fuente posteriores no actualizan automáticamente la copia guardada. Utilice los pasos de la versión-conflicto a continuación cuando edite el contenido gestionado.

## Editar un informe y comparar versiones {/* #edit-a-report-and-compare-versions */}

<p className="example-label"><strong>Ejemplo práctico</strong> Añada una nota de lectura y compare las revisiones del informe</p>

Abra un texto gestionado o archivo Markdown compatible. El ejemplo que figura a continuación añade una nota de lectura a un informe existente; ahorro crea una nueva revisión sin cambiar la entrada original o rehacer su análisis.

1. Abra el archivo Markdown gestionado y seleccione **Editar rnaseq-qc-report.md**.
2. Editar el campo fuente. Mantenga el método existente y el texto de procedencia.
3. Seleccione **Save changes**. El encabezado avanza desde **v1** a **v2**.
4. Seleccione **Compare ... con su versión de origen**. El texto añadido aparece en la vista de la diferencia.
5. Utilice **Deja de comparar.** para volver al informe presentado.
6. Seleccione **Previous file version** para inspeccionar v1, luego **Next file version** para volver a v2.

<PlatformContent platform="macos">

![Informe v2 comparado con su versión original](/img/open-science/guides-walkthrough/55-report-version-diff.webp)

</PlatformContent>
| Control de edición/estado | Qué hacer |
| --- | --- |
| Guardar cambios discapacitados | Hacer un cambio válido; texto sin cambios no tiene nada que salvar |
| Cancelar | Descarte el proyecto de edición actual |
| flechas de la versión desactivadas | No existe ninguna versión más antigua/más reciente en esa dirección |
| Comparar minusválidos | No se dispone de una comparación de la conversión de fuentes compatibles |
| Salvar el conflicto | Recargar la versión actual y reconciliar su cambio; no asuma su borrador sobrevuelo otro escritor |
| Editar ausente | Este tipo de archivo o fuente no es editable en ese visor; no espere archivos binarios o la tabla CSV para convertirse en editores de hojas de cálculo |

Los archivos de texto/código gestionados compatibles y Markdown pueden exponer la edición. El CSV demostrado seguía siendo una tabla de sólo lectura; imágenes y otros formatos binarios no adquieren la edición de texto a través de esta función. Una edición manual crea una revisión de archivos; no vuelve a ejecutar el Notebook ni crea una revisión de modelo. Consulte [Pruebas Notebook](notebook.md) antes de citar el historial de producción de una versión.

### Resolver un conflicto sin perder ni editar {/* #resolve-a-save-conflict-without-losing-either-edit */}

Si otro escritor guarda el informe mientras su editor permanece abierto, **Save changes** puede devolver **Este archivo tiene una versión más reciente. Ver la última versión**. Su borrador no ha reemplazado esa nueva versión.

1. Preserve su texto sin guardar antes de cambiar de opinión.
2. Seleccione **View latest version**. Si aparece **Discard unsaved changes?**, cancele hasta que haya retenido los cambios que necesita.
3. Abra el último informe guardado e inspeccione las adiciones del otro escritor.
4. Seleccione **Edit**, vuelva a aplicar sus cambios a ese último texto y ahorre.
5. Reabrir el resultado y utilizar las flechas de la versión para inspeccionar revisiones anteriores.

<PlatformContent platform="macos">

![Guardar bloqueado porque existe otra versión](/img/open-science/local-todo-batch/37-file-save-conflict.webp)

</PlatformContent>
Después de guardar, confirme que la última revisión contiene tanto el cambio del otro escritor como su borrador retenido. Las revisiones de archivos anteriores siguen disponibles a través de los controles de la versión; estas son separadas de las revisiones de mensajes de conversación.

Para rehacer un resultado capturado y comparar su salida, utilice [Reproducibilidad](reproducibility.md). Para una copia portátil de las ramas de conversación, archivos y evidencia, use un [Paquete de investigación .science](research-packages.md).

## Exportar sin perder el historial de investigación {/* #export-without-losing-the-research-record */}

Utilice el **Download** del archivo para guardar un resultado. La sesión **Download all artifacts** guarda los archivos elegidos a una carpeta; proyecto **Download artifacts…** crea un ZIP con caminos `generated` y `uploads` separados. Ambos exponen los controles de selección. Lea su alcance, nombres de archivo y destino antes de confirmar. Conversation **Export** es una operación de transcripción, distinta de la descarga de archivos de investigación. Vea [Sesiones](sessions.md) para las selecciones ejercidas y las descargas reabiertas. Una copia descargada no lleva el estado completo de aplicación en vivo, credenciales o entradas externas.

Mantenga la matriz de cuenta original, el CSV, figura y métodos reportan juntos para reutilizar. El [flujo de trabajo de datos](../workflows/data-quality.md) proporciona los archivos probados y los valores de aceptación exactos. Si una descarga falla, el permiso de destino de verificación y el espacio libre de disco, entonces vuelva a entrar; un archivo externo parcial no cambia la versión gestionada guardada.

### Abrir un informe descargado {/* #open-a-downloaded-report */}

Seleccione la versión del informe y seleccione **Download**. Abra el archivo `.md` guardado en un editor de texto y compruebe sus encabezados, párrafos y datos. Volver a la vista previa de la aplicación para el informe formateado.

<PlatformContent platform="windows">

Abra el archivo `.md` descargado en Notepad. Notepad muestra la fuente de marcado: marcadores de encabezado como `##` y backticks son caracteres formateadores. Revise los encabezados, párrafos y contenidos de la tabla. Volver a la vista previa de la aplicación para leer el informe formateado.

</PlatformContent>

### Preserve el archivo seleccionado a través de copias y exportaciones {/* #preserve-the-selected-file-through-copies-and-exports */}

Al copiar un mensaje con referencias administradas, pegarlo en la conversación prevista e inspeccionar cada accesorio/referencia resultante antes de enviar. Un nombre de archivo legible no es suficiente: abra la referencia y confirme su actual propietario y versión.

Antes de exportar artefactos seleccionados o un paquete, confirme la selección completa, espere el resultado y vuelva a abrir los archivos descargados. Si una edición, actualización o exportación falla, preservar el borrador y la versión fuente al comprobar el resultado real guardado. Un refresco fallido no establece que un ahorro anterior falló.

Referencias de implementación: [copiado de referencias](https://github.com/aipoch/open-science/commit/f0c0e081), [completas selecciones de exportación](https://github.com/aipoch/open-science/commit/f0468f35) y [ediciones de previsualización](https://github.com/aipoch/open-science/commit/8763f9aa). Si un adjunto informa de **El archivo gestionado o su sesión se elimina**, reagrupe el aporte actual previsto a través de la aplicación e inspeccione su propiedad; ver [Solución de problemas](troubleshooting.md).

Fuentes: [biblioteca de archivos de proyecto](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ProjectFilesView.tsx), [acciones de archivos locales](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/LocalFileHeaderActions.tsx).

## Mantenga un archivo local autorizado como artefacto {/* #import-local-artifact */}

Abra un archivo de una carpeta autorizada bajo **This computer**. En su vista previa, uso **… → Save as artifact** y espera la finalización. Abra el artefacto de conversación resultante y compruebe su contenido. Open-Science mantiene una copia gestionada inmutable; más tarde las ediciones al archivo local original no actualizan esa copia. Simplemente previsualizar un archivo de carpeta no importa.
