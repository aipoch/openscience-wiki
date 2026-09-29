---
title: "Conjuntos de datos de revistas y atributos de referencia"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Conjuntos de datos de revistas y atributos de referencia {/* #journal-datasets-and-reference-attributes */}

Utilice **Library → Journals** para importar un directorio de revistas, métricas o clasificaciones y mostrarlas junto con referencias coincidentes. Un conjunto de datos mantiene su **Source** y **Metric year**. Open-Science no suministra una suscripción a una base de datos de clasificación comercial; importar datos que tenga derecho a utilizar y conservar su procedencia. Los atributos de la revista describen la revista, no la calidad o las conclusiones de un documento individual.

## Preparar un pequeño conjunto de datos {/* #prepare-dataset */}

<p className="example-label"><strong>Ejemplo práctico</strong> Añadir información de la editorial a los documentos existentes</p>

Descargar el <ExampleDownload path="/examples/journals/journal-publisher-directory.csv">3-journal CSV</ExampleDownload>. Contiene comunicaciones naturales, PLOS Medicine y The BMJ, con sus ISSNs electrónicos, editores y direcciones del sitio web. Las fuentes son [Nature Communications](https://www.nature.com/ncomms/), [PLOS Medicine](https://journals.plos.org/plosmedicine/) y [Información del suscriptor de BMJ](https://www.bmj.com/about-bmj/resources-subscribers). Esta es una instantánea de editor-directorio para **2026**, con atributos de texto en lugar de factores de impacto inventados o cuartiles.

Para una referencia coincidente, utilice el papel de Ju et al. **Comprensión de la actividad y selectividad de catalizadores de carbono con nitrógeno metálico para la reducción electroquímica de CO2**, DOI **10.1038/s41467-017-01035-z**. Si no está ya en su Biblioteca, [añadir su registro bibliográfico](library.md) y ver la revista y ISSN contra la fuente. Usted no necesita su texto completo para mostrar atributos de revistas.

CSV, TSV, XLSX y paquetes de revistas son compatibles, hasta **32 MB**. **Download template** proporciona un diseño inicial. Mantener las columnas de identidad separadas de los atributos; preservar los ISSN como texto, incluyendo los hifénes y cualquier X final.

## Importar y mapear las columnas {/* #import-columns */}

1. Abra **Library → Journals → Import attributes**, o haga clic en el área de carga. Si los conjuntos de datos ya existen, abra el selector **Journal dataset** y seleccione **New dataset**. Seleccione el CSV.
2. Compruebe **Header row** y **Preview**. Este archivo utiliza la fila **1** como nombres de columna. Utilice **Transpose** sólo cuando su fuente tiene revistas dispuestas a través de columnas.
3. Establecer **Source** a `Publisher websites` y **Metric year** a `2026`. Revisión de los valores sugeridos: un número similar al año en otro lugar del archivo puede ser confundido por un año. Para un conjunto de datos métricos real, utilice el año que describen sus valores, que puede diferir del año de publicación del archivo.
4. Mapa las cuatro columnas como abajo. Dar a cada atributo guardado un nombre distinto; **Skip** deja una columna fuera.
5. Seleccione **Review import**, compruebe cada fila, luego **Import attributes**. Este ejemplo muestra **3 listo; 0 necesita atención**, seguido por **Journal attributes imported**.

| Columna original | Importación | Tipo de valor |
| --- | --- | --- |
| Nombre de la revista | Nombre de la revista | Campo de identidad |
| ISSN | ISSN | Campo de identidad |
| Editorial | Atributo de revistas | Texto |
| Sitio web del Diario | Atributo de revistas | Texto |

![Mapping journal identity and publisher attributes with an explicit source and year](/img/open-science/v0340/journal-column-mapping.webp)

**Abbreviation** y **External journal ID** son opciones de identidad adicionales. Un ID externo necesita su espacio de nombres; Los identificadores de diferentes catálogos no son intercambiables. Los tipos de atributos incluyen **Texto**, **Número**, **Single choice** y **Multiple choices**. Número de uso para métricas numéricas, no para ISSNs o cuartiles categóricos.

Las filas pueden ser **Matched**, **New**, **Ambiguous match**, **Invalid** o **Duplicate**. Verificar identificadores conflictivos y repetidas filas antes de importar. Regresar a **Edit mapping** para fijar funciones de columna; problemas de exportación hileras o salta explícitamente filas que necesitan atención cuando se ofrece. Una fila marcada New crea una entrada de diario, no un nuevo papel en su bibliografía.

## Atributos de visualización en una referencia {/* #show-attributes */}

1. Confirme el conjunto de datos seleccionado es **Sitios web de editores 2026** y **Show in literature** está encendido.
2. Volver a **All references** y buscar `Understanding activity`.
3. Abre el periódico. Bajo **Journal attributes**, compruebe **Publisher → Springer Nature** y el sitio web de la revista. Seleccione el control de información de un atributo para inspeccionar su fuente/año.
4. Compare el **ISSN 2041-1723** de la referencia con la revista importada. El año de publicación del periódico **2017** permanece separado de la instantánea **2026** del conjunto de datos.

![Dataset de revistas importada con Mostrar en literatura habilitada](/img/open-science/v0340/journal-dataset.webp)

![Atributos editoriales sobre la referencia existente de comunicaciones de naturaleza](/img/open-science/v0340/journal-reference-attributes.webp)

**Show in literature** se aplica en toda la Biblioteca compartida, opiniones de proyectos, colecciones y detalles de referencia. Sólo **un año por fuente** se muestra a la vez; que permite otro año de la misma fuente reemplaza el año antes mostrado. Los atributos perdidos no están llenos de valores de un año diferente. En una tabla de referencia, utilice **Customize** para elegir las columnas de revista disponibles para mostrar.

## Resolver un partido de diario y mantener el conjunto de datos {/* #journal-matches */}

Utilice la entrada de Journals **More actions → Journal alignment** y **Biblioteca de cheques / biblioteca de cheques** para inspeccionar registros coincidentes, sin igual y ambiguos. Este cheque lee la Biblioteca; no reescribir metadatos de referencia en silencio. Confirme los nombres de las revistas y ISSN contra la publicación original antes de resolver un desajuste.

Cuando se ofrece, **Find journal candidates → Choose journal → Confirm journal association** vincula la referencia seleccionada a la revista destinada. Se aplica a esa referencia, no a cada documento con un título similar. La eliminación de la confirmación la devuelve a la coincidencia automática; cambiar la identidad de la revista de referencia puede invalidar la asociación.

Seleccione el conjunto de datos deseado antes de usar **Update dataset**. Revise su fuente, año y mapeo de nuevo, a continuación, verifique las referencias afectadas después de la importación. Mantenga los datos de otro año como un conjunto de datos separado en lugar de sobrescribir su significado. Utilice acciones de conjunto de datos para editar su nombre/fuente/año o exportar un paquete de revistas, que conserva datos y configuraciones de columna. Mantenga una copia del archivo fuente original y sus términos de acceso.
