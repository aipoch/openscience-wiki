---
title: "Abrir y previsualizar archivos"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Abrir y previsualizar archivos {/* #opening-and-previewing-files */}

Abra un resultado guardado para inspeccionar su versión seleccionada. Esta página cubre los controles de visualización compartidos y los formatos de documentos ordinarios. Utilice [Cuadros](../tools/tables.md) para la interpretación de datos y [Visores científicos](../tools/viewers.md) para controles de secuencia y estructura.

## Abre, agranda y regresa {/* #open-enlarge-and-return */}

Una tarjeta de archivo generada abre su vista previa. **Abierto ... en visión dividida al lado de la sesión** mantiene la conversación visible. Seleccione otra pestaña para cambiar archivos, **Abrir vista previa de pantalla completa de ...** para ampliar uno, y **Cerrar vista previa de ...** para cerrar esa superficie. **Collapse preview panel** esconde el panel sin borrar sus archivos abiertos. Una vista previa de pantalla completa y una biblioteca de archivos de pantalla completa son diferentes vistas.

| Control de cabecera | Significado |
| --- | --- |
| Nombre de archivo y versión | Confirme el resultado seleccionado antes de descargarlo o citarlo |
| Descargar | Guardar una copia de ese resultado |
| Acciones de archivos → Provenance | Inspeccionar evidencia adjunta a una versión del artefacto gestionado |
| Ver en contexto | Volver a la sesión que produjo el artefacto |
| Anterior / Siguiente versión del archivo | Navigate immutable guarda revisiones cuando esté disponible |
| Editar / comparar | Disponible sólo para el contenido gestionado con soporte; ver [Archivos](files.md) |
| Cerrar | desestimar la opinión; esto no es Borrar |

El comportamiento de cierre de arriba se aplica a las previsiones de archivo. Un [Side Chat pestaña](delegation.md) tiene una confirmación separada: el cierre detiene esa discusión lateral y elimina su conversación. Un reinicio completo de la aplicación también aclara los chats secundarios restantes. Los mensajes ya enviados a Main permanecen salvados.

Para guardar una ubicación de lectura para usted, seleccione texto o una región PDF y seleccione **For me**; ver [Marcas de lectura](bookmarks.md).

## Leer archivos por formato {/* #read-files-by-format */}

### Lea una tabla de resultados {/* #read-a-result-table */}

<p className="example-label"><strong>Ejemplo práctico</strong> Lea la tabla RNA-seq QC, figura e informe</p>

Abre `rnaseq-sample-qc.csv`. En este ejemplo, muestra **filas 12 · columnas 6** y utiliza la primera fila como encabezados. El desplazamiento horizontal expone nombres de columna de larga fuente y las métricas a su derecha. Los números de fila de la mesa son posiciones de visualización, no identificaciones de genes o muestras.

![La mesa QC de doce muestras](/img/open-science/guides-walkthrough/42-rnaseq-table.webp)

Compruebe que las etiquetas de la columna y los identificadores completos son legibles. Las definiciones de campo y los controles contra la base de referencia compartida están en [Cuadros y conjuntos de datos](../tools/tables.md).

La fuente `.txt` es una matriz separada de pestañas; un visor de texto puede mostrarlo como texto en lugar de la cuadrícula CSV. No renombrar la extensión de un archivo y asumir su delimitador o significado científico cambiado. Las previsiones muy grandes pueden ser atadas; leer cualquier límite de fila/column mostrado antes de tratar el subconjunto visible como el conjunto de datos completo. Los límites de formato están en [Referencia](../reference/formats.md).

### Inspeccione la figura {/* #inspect-the-figure */}

Abre `rnaseq-library-sizes.png`. Use **Zoom in**, **Zoom out** y **Reset zoom**; abrir pantalla completa cuando las etiquetas de eje son demasiado pequeñas. El zoom cambia sólo la vista. No remueva la matriz de origen ni actualiza un resultado estadístico.

![El número total real de la cuenta en bruto figura en la vista previa de pantalla completa](/img/open-science/guides-walkthrough/54-rnaseq-figure.webp)

Lea el eje de cuenta cruda, las doce etiquetas de muestra y su asignación en el CSV/report. Las diferentes alturas de barras por sí solas no establecen expresión diferencial. El ejemplo es un control de preanálisis descriptivo, sin pruebas de normalización o hipótesis.

### Lea métodos y probabilidad juntos {/* #read-methods-and-provenance-together */}

Markdown renders headings, lists, code and links. Lea la suma de comprobación y el método del informe antes de aceptar el resultado trazado. Un enlace autorizado abre su destino a través de la acción de previsión de fuentes o de navegador externo aplicable; inspeccionar el nombre completo antes de tratarlo como evidencia. Una vista previa de fuente fallida o bloqueada no es la confirmación de que su contenido fue leído.

Utilice **Provenance** para inspeccionar el código seleccionado del artefacto, el registro de ejecución, los mensajes, el medio ambiente y la revisión. Lea cualquier etiqueta **partial**, **atado** o **No review for this version** usando [Notebook y pruebas de ejecución](notebook.md).

### Leer archivos de Office y cifras de varias páginas {/* #read-office-files-and-multi-page-figures */}

<p className="example-label"><strong>Ejemplo práctico</strong> Inspect Office and TIFF reading copies of the QC results</p>

El <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-reading.docx">Informe de Word</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-sample-qc.xlsx">Libro de trabajo de Excel</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-overview.pptx">diapositivas de PowerPoint</ExampleDownload> y <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-figures.tiff">TIFF de dos páginas</ExampleDownload> presentan los mismos resultados de GSE60450 QC guardados. Estas son copias de lectura, no nuevos análisis.

| Formato | Pasos y qué revisar |
| --- | --- |
| DOCX | Adjuntar y abrir el informe. Desplazarse a través de ambas páginas; verifique la primera fila de muestra y los métodos/texto de interpretación. La vista previa de pantalla completa da líneas largas más espacio. No hay cinta de edición de Word. |
| XLSX | Abra el libro de trabajo, luego elija **Resumen** o **Muestras** en el fondo. Desplazarse horizontalmente para la última columna. Las muestras contienen hileras de datos 12 más su cabecera, espaciamiento y notas de origen; el espectador informa que 17 usó filas, no muestras biológicas 17. Los valores son una vista previa del libro de trabajo guardado, no evidencia de un cálculo fresco. |
| PPTX | Abra los toboganes y deslice verticalmente desde el sumario de QC a Métodos e interpretación. Ambos toboganes en el ejemplo local. Esta superficie de lectura no es un editor de presentación o controlador de diapositivas. |
| TIFF | Abrir la figura y utilizar **Página siguiente / Página anterior**. Las dos páginas muestran tamaños de bibliotecas crudas y medianas de genes detectados. **Zoom / Zoom out / Reset zoom** modificar la opinión; cheque **Página 1 de 2** o **Página 2 de 2** antes de interpretar la figura. |
| JSON | Abrir <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.json">el resumen</ExampleDownload> para inspeccionar el texto fuente, identificadores y valores. Se muestra como código en lugar de un árbol de objeto expandible. |
| HTML | Abrir <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.html">la tabla de lectura</ExampleDownload>. **Source** muestra el HTML; **Render** restaura el documento formateado. Ninguno de los modos vuelve a funcionar el QC. |

![Selección de muestras en la vista previa del libro de trabajo real](/img/open-science/local-todo-batch/47-workbook-samples.webp)

![La segunda página del TIFF real](/img/open-science/local-todo-batch/50-tiff-second-page.webp)

Si **Preview unavailable → Open this Office file in your default app to view it.** aparece, use **Open** para un archivo local, o **Download** para una carga gestionada, a continuación, abra en una aplicación compatible. Este inconveniente mantiene el archivo original disponible cuando la vista previa incorporada no puede mostrarlo.

### Otros espectadores apoyados {/* #other-supported-viewers */}

Las siguientes listas de tablas previsualizan modos y controles para los tipos de archivos soportados.

| Familia | Qué inspeccionar | Controles y límites |
| --- | --- | --- |
| PDF | Número de página, texto legible, fuente PDF | Thumbnails, esquema, búsqueda de documentos, navegación por página, zoom y regiones seleccionables; Las páginas escaneadas pueden carecer de texto |
| Código / texto llano | Completo bloque y idioma relevantes | Números de línea, visualización de sintaxis, copia/descarga; el contenido sobresize puede ser limitado |
| JSON / HTML | Estructura o documento renderizado | Rendering no es el permiso para ejecutar código con privilegios de aplicación |
| Imágenes / TIFF | Resolución y imagen seleccionada | Ampliar imagen/pan; TIFF tiene una ruta de renderización dedicada |
| Archivos de oficina | Si el renderizador gestionado tiene éxito | Descargar / abrir externamente si DOCX/XLSX/PPTX vista previa no está disponible; vista previa no es la edición completa de Office |
| Secuencias biológicas | Identidad y alcance de la secuencia | Vista orientada hacia la secuencia para los insumos de FASTA soportados |
| Estructuras moleculares | Modelo pareado y representación elegida | Rotar, ampliar, pan y apoyar las representaciones Cartoon/Stick/Sphere/Surface/Line; datos estructurales perdidos pueden desactivar una representación |
| Archivo desconocido o no soportado | Nombre, tamaño y mensaje de retroceso | Descarga para un visor externo adecuado; no inferir contenido válido de la extensión |

Para el contexto PDF, vincule únicamente los documentos pertinentes a la tarea actual y desvincularlos cuando la próxima tarea no debe utilizarlos. La aplicación soporta hasta tres PDFs enlazados por sesión. Un registro de literatura sin un PDF adjunto proporciona metadatos, no prueba de que se leyó el texto completo; ver [Biblioteca](library.md).

### Controles de fuente y formato específicos {/* #diagram-source-and-format-specific-controls */}

Para un diagrama de sirena renderizado en una conversación, seleccione **View source** en su barra de acción para leer el texto del diagrama subyacente; **View diagram** vuelve a la renderización. La toggle se pone disponible después de renderizar y está deshabilitada mientras que un error reemplaza el diagrama. Cambia la vista, no el análisis o el archivo fuente.

<p className="example-label"><strong>Ejemplo</strong> Interruptor entre un diagrama de sirena y su fuente</p>

En una nueva conversación, pregunte: **Show a Mermaid flowchart with three steps: Attach a file → Inspect the preview → Save a report. Do not include file links.** Una vez renderizado, arrastre sobre el diagrama, seleccione **View source**, y confirme los tres nodos. Seleccione **View diagram** para regresar; use **Ver pantalla completa** si las etiquetas son demasiado pequeñas.

El diagrama muestra los pasos solicitados. Para inspeccionar un archivo guardado, abra su tarjeta de archivo real; un nodo de diagrama por sí solo no es una referencia de artefacto.

| Formato | Qué hacer para comprobar |
| --- | --- |
| PDF de una sola página | No hay entrada de lectura multipágina; utilizar los controles de vista previa ordinario de PDF |
| CSV | Inspeccione el rango mostrado; una vista previa fija no debe ser tratado como la entrada completa / exportación |
| Manual de trabajo de la Oficina | Revise la hoja de trabajo visible seleccionada y el error del renderizador; utilizar el archivo original para la edición sin soporte |
| TIFF | Compruebe la página seleccionada y el resultado de renderización antes de interpretar los valores de píxel/sample |
| JSON | Consulte el texto de la fuente preservada cuando formatee asuntos |
| Cuadros de marcado | Enfóquese las acciones de la tabla para utilizar los controles de copia/descarga/lleno de pantalla con el teclado |

Referencias de implementación: [Controles de sirenas](https://github.com/aipoch/open-science/commit/5f6e7995), [Condición PDF](https://github.com/aipoch/open-science/commit/2722da2a), [CSV](https://github.com/aipoch/open-science/commit/9275c2c0), [Oficina](https://github.com/aipoch/open-science/commit/0291871f), [TIFF](https://github.com/aipoch/open-science/commit/52152ed4).

## Extraer las figuras y tablas PDF {/* #pdf-extraction */}

Use esto cuando necesite una figura o una tabla reutilizable de una literatura PDF. Agregar e inspeccionar el PDF en [Biblioteca](library.md) primero; metadatos bibliográficos por sí solos no es una entrada de extracción.

1. Abra la vista previa PDF y seleccione **Figures and tables** al lado de **Original PDF**.
2. En primer lugar, elija **Download and continue** para instalar los recursos de modelo necesarios. Esperar a la instalación y cheques de integridad. Cuando los recursos estén listos, use **Analyze PDF**.
3. Siga el progreso de la página. Después de la finalización, seleccione un candidato y utilice **Show in PDF** para compararlo con la página de origen, la capción y el texto circundante.
4. Para una figura, abra su vista previa de imagen y use **Copy image** o **Download image**. Para una tabla, seleccione **Table**, seleccione **TSV**, **HTML** o **Markdown**, luego utilice la acción de copia/descarga. Elige **Image** cuando necesite inspeccionar el cultivo de origen.
5. Abra el archivo exportado. Verifique la alineación de filas/columnas, encabezados fusionados, unidades, notas de pie y contenido de página cruzada antes de utilizarlo en un análisis o informe.

La extracción se ejecuta localmente después de que los recursos modelo se descargan. La reapertura del mismo PDF puede reutilizar los resultados de caché; **Analyze again** reimprime la extracción cuando es necesario. Cancele el control de progreso si necesita parar. Si el análisis es incompleto, inspeccione el aviso de página fallida en lugar de tratar a los candidatos visibles como el documento completo.

**Unplaced table text** y **Table notes** conservan contenido que necesita revisión. Si las células estructuradas no están disponibles, utilice el cultivo fuente y el PDF original; no inferir las células perdidas. Las páginas escaneadas y rotadas no son compatibles con este flujo de trabajo de extracción. Un PDF puede permanecer legible incluso cuando la extracción no está disponible.

### Pregúntele al agente sobre una figura o tabla extraída {/* #pdf-agent-evidence */}

1. Abra el PDF previsto, utilice **Read with agent** para vincularlo a la sesión actual, y complete el análisis **Figures and tables** para las páginas pertinentes. Antes de enviar su pregunta, confirme que el PDF permanece en el contexto de lectura del Compositor. Un registro de la Biblioteca por sí mismo no es un PDF vinculado, y vincularse solo no funciona este análisis.
2. Pregunte sobre una figura específica, tabla o algoritmo. Incluya su etiqueta o página y la pregunta que necesita respuesta.
3. Inspeccione la actividad de la herramienta: **list_pdf_elements** encuentra los elementos extraídos disponibles; **read_pdf_element** lee las pruebas seleccionadas. Pida la página de origen y cualquier contenido perdido o incierto en la respuesta.
4. Compare la respuesta con la figura o tabla original, incluyendo encabezados, unidades y notas. Si la extracción está ausente o incompleta, analice las páginas desaparecidas y vuelva a entrar; a caption alone cannot establish a trend or an exact table value.

<p className="example-label"><strong>Ejemplo</strong> Solicitar pruebas de tabla de un documento enlazado</p>

> Lea la tabla 1 de los elementos extraídos de PDF vinculados. Informar la página física PDF, encabezados de columna y valores relevantes para mi pregunta. Preserve unidades y notas de pie de página, e identificar cualquier célula desaparecida o extracción incompleta.

Estos instrumentos leyeron los resultados de extracción existentes; no inician el análisis de PDF. La salida de la tabla puede llegar a varios lotes, y la evidencia figura/algoritmo puede ser entregada como imagen. Compruebe que el modelo seleccionado admite la entrada de imagen requerida; una imagen entregada por sí sola no prueba que fue interpretada correctamente.

## Cargar medios remotos deliberadamente {/* #remote-media */}

Imágenes, audio y vídeo ligados a una respuesta modelo esperan que usted active la carga. Lea los nombres de destino mostrados por el control antes de proceder. La aprobación se aplica a ese elemento mostrado y sus URLs, no a cada respuesta futura o a todo el dominio. Cerrar la vista previa no deshacer una solicitud ya enviada.

Los diagramas de sirenas que contienen imágenes remotas pueden ser bloqueados antes de cargar; solicitar un diagrama ordinario sin imágenes incrustadas cuando sea necesario. Para las imágenes enviadas a un modelo, Open-Science elimina los metadatos auxiliares de la copia de entrada modelo mientras preserva el archivo original. Esto no elimina el contenido sensible visiblemente presente en la imagen.

## Verificar el archivo descargado {/* #verify-the-downloaded-file */}

Abra la vista previa prevista, seleccione **Download**, confirme el nombre de archivo y la ubicación en el sistema guardar diálogo, a continuación, guardar. Abra la copia descargada y compruebe su contenido. Descargar guarda el archivo original; cambiar la página TIFF o la hoja Excel no restringe la descarga a esa página o hoja.

## Cuando una vista previa falla {/* #when-a-preview-fails */}

Confirme el archivo guardado con éxito, luego compruebe la versión exacta y el formato. Pruebe Descargar para distinguir una limitación del espectador de un archivo no disponible. Para un archivo local cambiado fuera de la aplicación, utilice Reload donde se ofrece. No sobreescribir la entrada para reparar un problema de renderización. Informar el nombre de archivo, tipo, tamaño, versión de la aplicación y el error mostrado; excluir contenido de archivo privado a menos que sean necesarios para el diagnóstico.

## Anotar un PDF {/* #annotate-a-pdf */}

Abrir **Notes & Annotations** para gestionar los puntos de interés, las marcas de área, las notas de página y las notas de documentos. **Show notes sidebar** guarda notas al lado de la página original. El menú de descarga separa **Download original PDF** de **Download PDF with annotations**. Siga [Anotaciones PDF y notas de documentos](pdf-notes.md) para una completa lectura, búsqueda y exportación.

Para **Figuras y tablas**, la primera instalación del modelo local puede probar espejos de descarga aprobados cuando la fuente principal es inalcanzable. Espere a que se descarguen e integren los cheques antes de elegir **Analyze PDF**. Los espejos no eliminan la necesidad de instalar estos recursos; un resultado caché puede reabrir sin un análisis fresco.
