---
title: "Anotaciones PDF y notas de documentos"
description: "Marcar pasajes, recoger notas de documentos, encontrarlas de nuevo y exportar una copia de lectura."
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Anotaciones PDF y notas de documentos {/* #pdf-annotations-and-document-notes */}

Use notas PDF para grabar preguntas al lado de un pasaje, marque una figura para una reunión de grupo, o recoja comentarios sobre un documento completo. Las anotaciones pertenecen al **versión de archivo** gestionado, por lo que la reapertura de esa versión trae sus notas de vuelta. No envían un mensaje al agente o cambian los bytes PDF originales.

## Elija la herramienta de lectura correcta {/* #choose-the-right-reading-tool */}

| Herramienta | Lo que mantiene | ¿Dónde encontrarlo? |
| --- | --- | --- |
| PDF **Notes & Annotations** | Destacados, marcas de área, notas de página y notas de documentos para una versión PDF gestionada | Vista de las notas del PDF o barra lateral; notas y textos citados son también buscables bajo **Library** |
| **For me** bookmark | Un lugar de lectura privado y una nota opcional perteneciente a una sesión | Esa sesión **Bookmarks** lista; ver [Marcadores de lectura personales](bookmarks.md) |
| **To Agent** anotación | Material preparado para una pregunta o instrucción | El proyecto de mensaje previsto; revisarlo antes de enviarlo |

## Marcar un pasaje y mantener una pregunta {/* #annotate-passage */}

<p className="example-label"><strong>Ejemplo práctico</strong> Preparar notas de lectura para una reunión del grupo de catalisis de un solo átomo</p>

Este ejemplo utiliza Lang et al., [catalizador de un solo átomo térmicamente estable para defectos](https://doi.org/10.1038/s41467-018-08136-3), un papel de acceso abierto utilizado en el [flujo de trabajo de medición de grupos](../workflows/journal-club.md). Obtenga su PDF del editor e importarlo en [Biblioteca](library.md). Abra el accesorio PDF de su renglón de referencia. El ejemplo pregunta cómo el documento apoya su mecanismo de estabilización; destacar un resumen no es una verificación independiente de ese mecanismo.

1. En **Original PDF**, localice el pasaje y compruebe el número de página. Use zoom si el texto es demasiado pequeño.
2. Seleccione **Annotate selected text**, luego arrastre a través del texto. **Mark style** elige el estilo de marcación de texto. En este ejemplo, se destaca la primera parte del resumen de la página uno.
3. Abra **Annotation note**, escriba una pregunta o un recordatorio de lectura, y elija **Save**. La nota de ejemplo pide al lector que compare la estabilización de defectos con la interacción de soporte metálico covalente propuesta y que compruebe los experimentos de apoyo.
4. Elija **Show notes sidebar** para guardar la nota guardada junto al PDF. Añada una etiqueta existente con **Add tag**; este ejemplo utiliza **Favorites**.
5. Volver a **Select** cuando termine de marcar texto. Utilice **Undo annotation change** y **Redo annotation change** para ediciones recientes de anotación, en lugar de cambiar la fuente PDF.

![Una nota de lectura y relieve guardada junto al PDF original](/img/open-science/v0320/pdf-highlight-sidebar.webp)

Para una figura o página escaneada, utilice **Select area to annotate** y marque la región prevista. Una marca de región identifica una zona; no extrae su texto ni verifica la figura. Si el texto no puede ser seleccionado, una marca de área puede conservar la ubicación que necesita para volver a visitar.

## Recopilar notas de página y documentos {/* #document-notebook */}

1. Abra **Notes & Annotations**, o elija **Open full notes view** desde la barra lateral.
2. Use **Add note → Add document note** para una pregunta sobre todo el papel. Utilice **Add page note** para una página específica, y revise su campo de página antes de guardar.
3. Introduzca la nota y elija **Save**. Aquí, la nota de documento pregunta qué medidas microscopía, espectroscopía y catalíticas distinguen los átomos aislados de las nanopartículas después de la calefacción.
4. Utilice **Search & filter** para encontrar notas por su texto, tipo o etiquetas. En la barra lateral, **All notes** y **Current page** cambian las anotaciones.
5. Seleccione **Show annotation source** en una nota de paso o región para volver a su ubicación guardada. **Edit annotation note** cambia el comentario; **Delete annotation** elimina esa anotación, no el PDF.

![La nota de documento y etiquetado destaca en la vista completa de Notas y Anotaciones](/img/open-science/v0320/pdf-notebook.webp)

## Encontrar una nota desde otra vista {/* #find-notes */}

Abrir búsqueda global con **Cmd/Ctrl+K**, introduzca una frase de su nota y seleccione **Library**. Este ejemplo busca `covalent metal-support`. Seleccione el resultado para leer **Notes** por separado de **Quoted text**, y luego elija **Show annotation source** para abrir el PDF en su pasaje marcado.

![Búsqueda global separa la nota de lectura guardada del texto citado PDF](/img/open-science/v0320/pdf-search-details.webp)

Compruebe el nombre de archivo, la versión de archivo y la página al revisar una nota. Una nota PDF no es automáticamente un nuevo mensaje o instrucción para Main. Use **To Agent** e inspeccione el borrador cuando quiera preguntarle al agente sobre el material.

## Notas de exportación o una copia de lectura {/* #export-notes */}

| Salida | Pasos | Qué hacer para comprobar |
| --- | --- | --- |
| Notas de Markdown o CSV | En **Notes & Annotations**, seleccione **Markdown** o **CSV**, luego **Export notes** | Abra el archivo guardado y compruebe la cotización, comentario, página y etiquetas. Con un filtro de subconjunto, **Export filtered notes** exporta ese subconjunto. Filtros claros cuando usted necesita cada nota. |
| PDF con anotaciones | Abra el menú de descarga de PDF y elija **Download PDF with annotations** | Guardar un archivo separado y reabrirlo en un lector PDF. Revise el contenido de la nota y el contenido de la nota, no sólo que existe un archivo. |
| PDF original | Elige **Download original PDF** | Esto ahorra los bytes fuente sin añadir las marcas del cuaderno de documentos. |

![Separar las acciones de descarga originales-PDF y anotado-PDF](/img/open-science/v0320/pdf-export-options.webp)

El ejemplo guarda dos notas: una destaca con un comentario y una nota de documento. Ambos aparecen en el <ExampleDownload path="/examples/v0320/lang2019-notes.md">Exportación de marcación</ExampleDownload> y <ExampleDownload path="/examples/v0320/lang2019-notes.csv">CSV export</ExampleDownload>. El PDF anotado conserva las diez páginas del papel y añade el punto culminante y la nota; la descarga original permanece separada. Los extractos de papel son de Lang et al. bajo el [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/) del periódico; los comentarios están leyendo preguntas para este ejemplo.

## Donde se comparten las notas {/* #where-notes-are-shared */}

Un **Acoplamiento de la biblioteca** comparte su cuaderno de notas a través de referencias, proyectos y sesiones que utilizan la misma versión de archivo gestionado. **Carga de proyectos y artefactos** comparte su cuaderno entre sesiones dentro del proyecto de propiedad. Una versión de archivo más nueva es un objetivo de anotación diferente: verifique la versión antes de asumir que una marca pertenece a un documento revisado.

Estas notas se almacenan localmente y no sincronizan a través de máquinas. Para una entrega, exporte las notas o un PDF anotado y compruebe lo que recibirá el receptor. Esto no cambia los marcadores de sesión privada o hace que cada nota de lectura sea parte de un [Paquete de investigación .science](research-packages.md).
