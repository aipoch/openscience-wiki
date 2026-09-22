---
title: "Biblioteca de literatura y citas"
last_update:
  date: '2026-09-22'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Biblioteca de literatura y citas {/* #literature-library-and-citations */}

Para encontrar nuevos artículos en línea, indique en una conversación el tema, el intervalo de años y los criterios de selección; después revise los candidatos en **Library → Inbox**. Consulte el [flujo de búsqueda temática del club de lectura](../workflows/journal-club.md). **Search references** filtra los registros que ya están en Library; no realiza una búsqueda bibliográfica en línea.

La Biblioteca es una bibliografía local compartida. Los proyectos y las colecciones se vinculan con sus registros; añadir el mismo papel a otra colección no requiere otra copia. Esta guía utiliza los tres documentos PRISMA reales de la [Core-reading workflow](../workflows/core-reading-list.md). Ese flujo de trabajo posee la meta de investigación y la lista de verificación de aceptación; esta página explica los controles de la Biblioteca y graba el ciclo de vida.

Para reutilizar una figura o tabla de un PDF adjunto, siga [Extracción PDF](previews.md#pdf-extraction). La importación de metadatos y la recuperación automática de texto completo no extraen figuras ni tablas.

## Elija la vista correcta {/* #choose-the-correct-view */}

Abra **Library** desde el hogar o el espacio de trabajo. **Back to Home** vuelve a la navegación de proyecto. El **Settings** de la Biblioteca abre estilos de citación, no ajustes de modelo globales.

| Ver | Contains | Úsalo para |
| --- | --- | --- |
| Bandeja de entrada | Los candidatos descubiertos por agentes esperando su revisión | Comprobar identidades y fuentes antes de la aceptación |
| Todas las referencias | Registros activos aceptados | Buscar, editar y organizar su bibliografía |
| Duplicados | Grupos de identificación/metadatos sospechosos | Compare antes de fusionarse |
| Papelera | Registros de referencia eliminados | Restaurar o eliminar deliberadamente permanentemente |
| Proyecto | Referencias vinculadas a ese proyecto | Mantener la bibliografía relevante para una pregunta de investigación |
| Colección | Un grupo temático, incluyendo colecciones anidadas | Reutilizar un conjunto de lectura en proyectos |

![Tres documentos aceptados en la colección PRISMA real](/img/open-science/guides-walkthrough/51-library-collection.webp)

## Agregar o importar un registro {/* #add-or-import-a-record */}

Seleccione **Add** y elija la fuente. Seleccionar un PDF abre su editor de metadatos; seleccionando varios abre **Import PDFs**.

| Entrada | Entrada | Compruebe antes de guardar |
| --- | --- | --- |
| Añadir referencia | Bibliografía manualmente introducida | Título requerido, tipo de referencia e identificadores |
| Importar PDF | Uno o varios PDF locales | - Metadatos extraídos en cada documento; selección multi-file utiliza el flujo de lotes debajo |
| Importar referencias | BibTeX, RIS o NBIB | Entradas válidas/inválidas, destino y coincidencias de identificador |

<ToolOperationGroup>
<summary>Importar los PDF seleccionados de una carpeta</summary>

### Importar los PDF seleccionados de una carpeta {/* #import-a-folders-selected-pdfs */}

1. Seleccione los PDF para el conjunto de lectura. Esperar la extracción de metadatos; un DOI detectado se puede utilizar para completar los campos bibliográficos. Revise el resultado contra el papel.
2. Compruebe el destino mostrado al lado de **Import to**; viene de la vista de la Biblioteca donde comenzó la importación. Bajo **When identifiers match**, elija una política de la tabla de abajo.
3. Utilice cada casilla de verificación o **Select all** para elegir este lote. **Show more** revela archivos adicionales listados.
4. Seleccione **Import selected**. Lea el progreso general y el estado de cada archivo; un archivo fallido no es una importación completa.
5. Para detenerse, seleccione **Stop** y espere a que **Stopping…** se resuelva. Quedan por hacer referencias ya comprometidas; una operación en vuelo puede terminar.
6. Después de parar, seleccione los archivos restantes Listos y utilice **Import selected**. Si el diálogo ofrece **Retry unfinished** después de un fallo, utilícelo para la selección sin terminar. Inspeccione cualquier referencia retenida antes de comenzar una nueva importación, especialmente si su carga PDF fue interrumpida.
7. Utilice **Done** o **Close** cuando el diálogo lo ofrece, luego abra el destino y verifique sus registros y archivos PDF. **Cancel** abandona la preparación antes de la importación.

| Política de identificación-objetivo | Resultado |
| --- | --- |
| Reutilizar la referencia existente | Reutilizar el registro coincidente en lugar de crear otra entrada de bibliografía |
| Conservar como referencia independiente | Mantenga un registro distinto para la comparación posterior y la revisión duplicada |
| Completar los campos vacíos | Rellene los campos perdidos y mantenga los valores existentes/conflictos |

El lote puede mostrar **Pending**, **Reading…**, **Ready**, **Importing…**, **Completed**, **Failed** o **Skipped**. La selección, la preparación de metadatos y la finalización de las importaciones son estados separados. Si la aplicación reporta **PDF upload cancelled. The reference was kept.**, compruebe los archivos adjuntos del registro retenido; cancelar la subida no eliminar la entrada de bibliografía.

![Dos PDFs PRISMA reales listos para importar](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

Con **Reuse existing reference**, un PDF cuyo título extraído o DOI no coincide todavía puede crear un registro separado. Después de importar, abra cada papel y confirme su título y DOI. Desigualdad correcta antes de [duplicados de fusión](#resolve-duplicates-and-recover-references). **Completed** confirma la importación, no la identificación exacta.

![Resultados completos de lote y per-file](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Pare un lote sin perder el trabajo terminado</summary>

### Pare un lote sin perder el trabajo terminado {/* #stop-a-batch-without-losing-completed-work */}

Una solicitud **Stop** permite que el artículo actual termine. Inspeccione cada fila: los elementos **Completed** se conservan y no pueden ser seleccionados de nuevo; seleccione las filas **Ready** restantes y utilice **Import selected** para continuar. Si los fallos exponen **Retry unfinished**, corrige la causa reportada antes de volver a iniciar y comprobar que los registros completados no fueron duplicados.

![La importación PDF suspendida conserva su fila completa](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

**The reference was kept. Retry to finish adding its PDF.** significa que la entrada de bibliografía fue salvada pero su apego es inacabado. Compruebe que el PDF original todavía está disponible en la ubicación seleccionada y se abre normalmente, a continuación, seleccione **Retry unfinished**. Después de reiniciar, vuelva a la colección de destinos y abra el PDF para comprobar su contenido. Si el resultado no puede ser confirmado, inspeccione su biblioteca antes de comenzar otra importación.


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Traiga una bibliografía de otro gestor de referencia</summary>

### Traiga una bibliografía de otro gestor de referencia {/* #bring-a-bibliography-from-another-reference-manager */}

<p className="example-label"><strong>Ejemplo práctico</strong> Importar archivos PRISMA con tres políticas coincidentes</p>

Abra la colección de destinos primero, luego elija **Import references** y un archivo `.bib`, `.ris` o `.nbib`. La vista previa reporta el formato detectado, destino, cuenta nueva/existiendo/desactivado y registros coincidentes. Ampliar **View details** para inspeccionar títulos y autores antes de importar. Las importaciones bibliográficas no descargan PDFs.

| Elección | Resultado comprobado con la declaración PRISMA |
| --- | --- |
| Conservar como referencia independiente | BibTeX creó un registro; Duplicados entonces contenían un grupo que coincidía-DOI |
| Reutilizar la referencia existente | RIS reutiliza un registro, con cero creado, saltado o fallado |
| Completar los campos vacíos | El [PubMed NBIB record](https://pubmed.ncbi.nlm.nih.gov/19621072/) añadido PMID `19621072` and PMCID `PMC2707599`; el título existente y cinco creadores seguían siendo |

Haga clic en **Import references**, espere a **Import complete**, inspeccionar Creado/Reutilizado/Skipped/Failed, luego seleccione **Done**. Reabrir el registro: un recuento de importación por sí solo no establece metadatos correctos. Filling campos vacíos puede añadir identificadores y un nombre de revista abreviado sin reemplazar el título completo de la revista.

![Importación BibTeX con una política explícita duplicada](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![Importación NBIB llena los campos bibliográficos desaparecidos](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## Repaso de la caja de pruebas {/* #review-inbox-evidence */}

<p className="example-label"><strong>Ejemplo práctico</strong> Revisar tres candidatos PRISMA</p>

Abra el título de candidato o **View details**. Inspeccione su proveedor, enlace fuente y DOI/otros identificadores, luego compare año, orden de autor y publicación con el editor. **Accept** lo promueve en la Biblioteca; **Dismiss** lo elimina de la cola de revisión. Compruebe la selección de filas antes de las acciones de lote.

![Tres candidatos PRISMA genuinos en espera de revisión](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

En este ejemplo, los tres candidatos fueron aceptados individualmente, y Inbox quedó claro. Un emparejamiento de proveedor es un registro inicial, no una validación bibliográfica completa. El año de publicación de la declaración 2020 es **2021**. Los dos documentos 2009 tienen distintos DOIs y listas de autores.

## Inspeccionar y corregir metadatos {/* #inspect-and-correct-metadata */}

Abre una referencia, luego **More actions → Edit metadata**. Revise los valores actuales antes de usar **Complete metadata**, que realiza una búsqueda en lugar de una edición puramente local.

![Reabierto de la organización-autor](/img/open-science/v0.27.0/04-organization-author.webp)

| Campo/control | Entrada y efecto |
| --- | --- |
| Tipo de referencia | Seleccione el tipo bibliográfico: artículo, revisión, preimpresión, libro, dataset y otros tipos compatibles |
| Título | Necesario; preservar el título publicado |
| Año / Publicación | Año de publicación y revista/container; un año incrustado en el título puede diferir |
| Configuración avanzada | Volumen, Edición, Páginas, Editor, Lugar y Edición |
| Agregar creador / Eliminar creador | Añadir o eliminar una fila creador en el borrador |
| Función del colaborador | Elija Autor, Editor o Traductor para que coincida con la fuente |
| Tipo de nombre → Persona | Entrar Nombre y apellido |
| Tipo de nombre → Organización | Ingrese el nombre completo de la organización; no lo dividir en nombres de personas inventados |
| Añadir identificador | Tipo y valor: DOI, PMID, PMCID, ARXIV, ISBN, ISSN u otros |
| Preferido para DOI / ISSN, etc. | Elija el identificador preferido dentro de ese tipo; la elección no es una bandera global en todo tipo |
| Eliminar identificador | Quitar el borrador de la fila de identificador |
| URL / Resumen | Dirección y resumen bibliográfico |
| Guardar | Editoriales válidas Persist |
| Cancelar / Cerrar | Rechazar el proyecto |

<p className="example-label"><strong>Ejemplo práctico</strong> Preserve The PRISMA Group as an organization author</p>

Para añadir **El Grupo PRISMA**, seleccione **Add creator → Creator role: Author → Name type: Organization**, introduzca el nombre completo y **Save**. Repita el registro y compruebe que la organización sigue a sus cuatro autores personales. Compare la cita generada con el [lista de autores del editor](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097).

![APA reference preserves the organization author](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2 corrige la persiana de nombre de autor PubMed, incluyendo apellidos, iniciales y sufijos. Al importar o completar los metadatos, inspeccionar los campos creadores y generar cita contra la fuente vinculada. No asuma que instalar la actualización reescriba metadatos ya almacenados en su Biblioteca.

## Organizar los registros aceptados {/* #organize-the-accepted-records */}

Crear una colección con **New collection**, rellenar **Name** y **Description** opcional, luego **Create collection**. La descripción es el texto organizativo, no el agente Context. Cancelar/Cerrar descarta el borrador. Seleccione registros en todas las referencias y utilice **Add to collection** o **Add to project**. La selección se despeja después de la operación; reelegir si agrega otro destino.

En una vista detallada, las casillas de verificación de proyecto y colección muestran los enlaces. **Manage Tags** añade etiquetas de organización. La calificación de una a cinco estrellas de la mesa es su anotación, no una puntuación automática de calidad de evidencia. **Clear selection** deja los registros sin cambios.

| Control de la mesa | Ámbito |
| --- | --- |
| Buscar referencias | Campos bibliográficos incluyendo título, creadores, publicación, identificadores, abstracto y notas |
| Ordenar referencias | Elija el orden mostrado |
| Filtros | Limitación por el tipo disponible, año, etiqueta y condiciones de texto completo |
| Personalizar | Elija/reorden columnas mostradas |
| Referencias por página | filas 25, 50 o 100 |
| Lista de comprobación de filas / Seleccione todo | Establecer los objetivos para las acciones a granel disponibles |
| Exportar | Exportar registros bibliográficos seleccionados; no empaqueta automáticamente todos los PDF |

El recuento total de la biblioteca es independiente del resultado actual de búsqueda/filtro. Lea la vista mostrada y la selección cuenta antes de una acción por lotes; un resultado filtrado más pequeño no significa que se eliminaron los registros.

Despejado búsqueda y filtros antes de concluir un registro ha desaparecido. Los enlaces de proyecto/colección no crean versiones independientes de metadatos para cada destino.

## Añadir y leer texto completo {/* #add-and-read-full-text */}

**Find full-text PDF** comprueba los proveedores públicos aplicables: Europa PMC/PMC, OpenAlex, Unpaywall y arXiv. Los identificadores disponibles y los contactos configurados/credenciales determinan la aplicabilidad. Inspeccione la fuente, la etiqueta de la versión y la URL antes de **Add attachment**.

<p className="example-label"><strong>Ejemplo práctico</strong> Adjuntar el editor PDF al registro PRISMA 2020</p>

Si **Add attachment** falla después de que se encuentra una fuente, descargue el PDF disponible públicamente desde el fabricante y use **Add PDF** en el mismo registro. Abra el PDF adjunto y compare su título y DOI con el registro de la editorial. En este ejemplo, **Avance prisma-2020-statement.pdf** muestra el papel PRISMA 2020 que coincide: **806.1 KB y 15 páginas**.

![Publicador exitoso PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

Un resultado fuente no es un apego salvado. Un PDF adjunto no es prueba de lectura de agente. **Read with agent** proporciona contexto para una solicitud posterior. Una referencia de Composer `@` puede seleccionar un registro exacto, una biblioteca de proyecto o una colección: una colección otorga margen de recuperación, no la inclusión automática del texto completo de cada papel. Los controles de lectura PDF están en [Avances](previews.md).

Si no se encuentra ninguna copia pública, retenga los metadatos comprobados y utilice un PDF local legítimamente disponible cuando sea apropiado. Las tareas de búsqueda/descarga de antecedentes pueden exponer los controles de pausa después de la corriente, reanudar, revisar y cancelar; cancelación no implica que los artículos anteriores completados sean deshechos.

<ToolOperationGroup>
<summary>Recuperar texto completo en lotes y reanudar más tarde</summary>

### Recuperar texto completo en lotes y reanudar más tarde {/* #retrieve-full-text-in-batches-and-resume-later */}

1. Seleccione los registros previstos en la Biblioteca y abra el **More actions → Find full-text PDF** de la selección.
2. Después de iniciar la búsqueda, elija **Pause** cuando sea necesario. El artículo actual termina antes de que la tarea se detenga.
3. Compruebe **Comprobado** y **Pending**, a continuación, seleccione **Continue search**. Después de cerrar el panel, vuelva a la misma tarea a través de **Background tasks → Open**.
4. Revise cada fuente de candidatos y advertencia antes de seleccionar los elementos y haga clic en **Add selected**.
5. La descarga también admite pausa y **Continue download**. Inspeccione los estados finales **Añadido / Failed / Skipped** y reabrir cualquier accesorio añadido con éxito.
6. Para descartar una tarea no deseada, utilice **Remove task** en **Background tasks**. Después de la eliminación, confirme que la tarea se ha ido y que sus referencias y apegos aún están abiertos. La eliminación de la tarea no los elimina.

![La búsqueda se detuvo después del tema actual, conservando los registros pendientes](/img/open-science/priority-completion/14-literature-batch-paused.webp)

Una búsqueda pausada conserva sus registros comprobados y pendientes. Después de continuar o reabrir la tarea, inspeccione los recuentos finales y el resultado de cada tema. El descubrimiento de Candidato y el apego PDF exitoso son resultados separados.

![Reapertura de la búsqueda completa de cinco discos de las tareas de fondo](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Existe una fuente pero el PDF no puede ser añadido</summary>

### Existe una fuente pero el PDF no puede ser añadido {/* #a-source-exists-but-the-pdf-cannot-be-added */}

Para **PDF could not be added**, verifique los requisitos de registro de origen, validez de enlace, límite de tamaño mostrado y configuración proxy/DNS actual. Evite crear referencias duplicadas como mecanismo de reingreso.

Si una fuente PDF se resuelve a una dirección reservada como `198.18.x.x`, el descargador lo rechaza. Seguir a [Red](network.md) para restaurar la resolución pública verificable, luego volver a entrar; no deshabilitar el cheque de la dirección. Si ya tiene un PDF descargado legítimamente, utilice **Add PDF** y verifique su título, DOI y cuenta de página.


</ToolOperationGroup>

## Formato y copia de citas {/* #format-and-copy-citations */}

Abre **More actions → Citation**. Seleccione **Citation style**, inspeccione el formulario de referencia y en texto, luego elija **Copy reference**, **Copy in-text citation**, **Copy BibTeX** o **Copy RIS** según sea necesario. Compruebe los nombres, año, puntuación y DOI contra la fuente antes de reutilizar. La representación correspondiente no repara un registro incompleto.

**Manage citation styles…** abre la gestión del estilo. El conjunto incluido incluye APA, MLA, Chicago fecha de autor, Vancouver, IEEE, Nature, AMA y Harvard. **Preview** muestra una muestra de estilo, **Browse styles** abre el catálogo de estilo externo, y **Import CSL** importa un archivo de estilo local. La importación de PLOS CSL y su aplicación se verifican a continuación. Copia y exportación son operaciones separadas; comprueba ambos al mover una bibliografía.

<ToolOperationGroup>
<summary>Compruebe una cita real después de importar un estilo de revista</summary>

### Compruebe una cita real después de importar un estilo de revista {/* #check-a-real-citation-after-importing-a-journal-style */}

<p className="example-label"><strong>Ejemplo práctico</strong> Aplicar el estilo de citación PLOS a un registro PRISMA</p>

En **Library → Settings → Import CSL**, elija el archivo `plos.csl` independiente del [Repositorio de estilos CSL](https://github.com/citation-style-language/styles/blob/master/plos.csl). En este ejemplo, **Imported styles** aumentó de cero a uno y mostró **Public Library of Science**. Regrese al panel PRISMA real de registro **Citation** y seleccione ese estilo bajo **Citation style**. Compruebe la referencia numerada y la cita en texto de `[1]`. La vista previa de la gestión de estilo utiliza un artículo de muestra; inspeccionar su registro real antes de copiar una citación.

![Estilo de PLOS importado aplicado al registro PRISMA real](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Copiar una cita o exportar registros reutilizables</summary>

### Copiar una cita o exportar registros reutilizables {/* #copy-a-citation-or-export-reusable-records */}

<p className="example-label"><strong>Ejemplo práctico</strong> Copia y ida y vuelta de los registros de citas PRISMA</p>

Los cuatro botones de copia de Citación escriben diferentes representaciones al portapapeles. Pruebe en su editor previsto e inspeccione el resultado antes de salir del panel.

| Button | Resultado comprobado para PRISMA 2009 |
| --- | --- |
| Copiar referencia | APA refirieron a los cuatro autores personales, The PRISMA Group, year and DOI |
| Copiar cita en el texto | `(Moher et al., 2009)` |
| Copiar BibTeX | An `@article` entrada con el autor de la organización encerrado en |
| Copiar RIS | A `TY  - JOUR` con autor, título, año y DOI campos |

![Controles de copia de citación para el registro PRISMA real](/img/open-science/local-todo-batch/01-citation-copy.webp)

Para un archivo, cierre Citación, seleccione las filas de mesa requeridas y seleccione **Export → BibTeX** o **RIS**. Elija la ubicación en el sistema guardar diálogo y esperar a **Saved**. Estos archivos contienen registros bibliográficos, no un paquete de archivos PDF. Reimportar el archivo guardado en una colección de pruebas con **Reuse existing reference** y comprobar su cuenta de coincidencia. Ambos archivos PRISMA exportados fueron reimportados y reutilizados el DOI existente sin crear otro registro.

BibTeX almacena año y mes aquí, por lo que su viaje de ida y vuelta regresó `2009-7`; RIS retenía `2009-07-21`. Compruebe la precisión de la fecha cuando se fusiona. Los campos de autor de Plain RIS no pueden preservar un tipo de organización independiente en otro administrador; inspeccionar al editor creador importado cuando esa distinción importa.


</ToolOperationGroup>

## Resolver duplicados y recuperar referencias {/* #resolve-duplicates-and-recover-references */}

<p className="example-label"><strong>Ejemplo práctico</strong> Combinar y restaurar un registro PRISMA con sus archivos adjuntos</p>

<ToolOperationGroup>
<summary>Mantenga un registro y sus archivos adjuntos</summary>

### Mantenga un registro y sus archivos adjuntos {/* #keep-one-record-and-its-attachments */}

1. Abre **Duplicates → Review duplicates**. La vista escanea registros activos de la Biblioteca, no sólo la colección actual.
2. Bajo **Keep reference**, elija el registro con la identidad verificada. Compare DOI, creadores, conteos de apegos y fecha agregada. **Show all fields** revela campos ocultos por la visión centrada en el conflicto.
3. Para cada campo conflictivo, seleccione su fuente. En la comparación PRISMA BibTeX, elija la fecha completa de publicación `2009-07-21` sobre `2009-7`. Los campos vacíos se pueden rellenar del otro registro.
4. Lea **After merging** y su adjunto, colección y cuenta de proyecto. Sólo entonces seleccione **Merge references**; **Cancel** deja los registros separados.
5. Reabrir el sobreviviente y verificar los metadatos, enlaces y contenidos PDF. El registro de fusión aparece en Trash como **Merged duplicate**.

![Compara las fechas de publicación sobreviviente y conflictiva](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

Un PDF con un nombre de archivo extraído en lugar de su título puede no entrar en un grupo duplicado. Corregir su título y DOI utilizando el registro de la editorial, y luego revisar el grupo de coincidencias. Después de fusionarse, confirme que las asociaciones retenidas PDF abren y colectan/proyectos todavía están presentes.

![El registro fusionado conserva sus PDF y sus vínculos organizativos](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Restaurar una referencia eliminada accidentalmente</summary>

### Restaurar una referencia eliminada accidentalmente {/* #restore-an-accidentally-removed-reference */}

Usa el **More actions → Move to Trash** de la fila. Desaparece de la Biblioteca activa, las vistas de proyecto y colección. En **Trash**, busque por título o identificador, abra su menú de fila y elija **Restore**. Restaurar antes de editar, previsualizar o exportar: estos controles están deshabilitados en Trash. Repita el proyecto original y las colecciones para verificar los enlaces restaurados. En este ejemplo, restaurar el registro PRISMA retenía su PDF y los tres enlaces.

![Restaurar una referencia de su menú de la fila de Trash](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Eliminar permanentemente un duplicado no deseado</summary>

### Eliminar permanentemente un duplicado no deseado {/* #permanently-remove-an-unwanted-duplicate */}

En Trash, elija **More actions → Delete permanently** y lea la confirmación. **Cancel** conserva la fila. La confirmación elimina las referencias y metadatos seleccionados; los archivos adjuntos no compartidos se limpian después. Los productos históricos se conservan y los índices de búsqueda caducan por separado, por lo que esto no es una era segura. Exportar todo lo necesario antes de eliminarlo.

Después de la eliminación, compruebe que el registro seleccionado ha dejado Trash y que la referencia retenida todavía se abre con sus apegos. Eliminando un enlace de colección, moviendo un registro a Trash y eliminando permanentemente tiene diferentes ámbitos.

![Lea el alcance preciso de la eliminación permanente](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## Cambios de acoplamiento y ediciones concurrentes {/* #attachment-changes-and-concurrent-edits */}

Antes de eliminar un archivo adjunto, lea su confirmación de eliminación y verifique el archivo/versión que está siendo objeto de ataque. Utilice el historial de versiones disponibles para inspeccionar versiones anteriores de archivos adjuntos. La eliminación de un PDF, moviendo su referencia a la basura y eliminando permanentemente una referencia tienen diferentes ámbitos; Las pruebas de conversación retenidas pueden restringir la limpieza.

Si otro cliente cambia una colección mientras que su editor está abierto, un ahorro de establo puede ser rechazado. Reabrir la última colección, comparar sus valores guardados con su cambio deseado y reingresar contra ese estado. Un error de actualización o limpieza después de guardar no significa automáticamente el ahorro fallado: inspeccionar el registro actual antes de repetir la acción.


Fuentes: [importación por lotes](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [metadatos editor](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx), [historial de apego/deleción](https://github.com/aipoch/open-science/commit/f4a82d4a), [ediciones concurrentes](https://github.com/aipoch/open-science/commit/dbb9560a).

## Mantenga notas de lectura PDF {/* #keep-pdf-reading-notes */}

Abra el accesorio PDF de referencia y utilice **Notes & Annotations** para anotaciones, preguntas de página y notas de documentos. La misma versión de archivo de biblioteca comparte estas notas en proyectos y sesiones. Busque una nota bajo **Library** en la búsqueda global, y luego elija **Show annotation source** para volver al PDF. Vea [Anotaciones PDF y notas de documentos](pdf-notes.md) para pasos y exportaciones.
