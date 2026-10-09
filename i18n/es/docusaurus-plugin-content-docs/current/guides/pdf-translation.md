---
title: "Traducir un PDF completo"
last_update:
  date: '2026-10-09'
---

# Traducir un PDF completo {/* #translate-a-full-pdf */}

Lea un papel en otro idioma mientras retiene el original para la comparación. **Full-text translation** prepara el texto del documento, guarda los párrafos traducidos a medida que avanza el trabajo, y mantiene traducciones guardadas con el PDF. No reemplaza el PDF original ni verifica los hallazgos del papel.

## Preparar el papel y el modelo {/* #prepare-translation */}

1. Obtenga el PDF completo y ábrelo desde [Biblioteca](library.md), Reading, Inbox, un accesorio cargado o un archivo guardado. Una referencia con metadatos o un resumen no es un PDF de texto completo.
2. Agrandar la vista previa si es necesario, luego elegir **Full-text translation** en la barra de herramientas PDF.
3. Elige **Prepare full text**. Espera a **Full text prepared** antes de comenzar una traducción. Inspeccione las páginas originales si falta texto o se escanea el PDF; la preparación no garantiza que se extraiga cada etiqueta de figura o tabla.
4. Elija **Target language**, luego **Translation method** y **Model**. Utilice un modelo ofrecido como está disponible por el selector.

| Método | Qué configurar |
| --- | --- |
| **Agent** | Un modelo de agente disponible, o **Main model** cuando se apoya. En v0.36.0, los modelos de suscripción Codex no pueden ejecutar esta operación de traducción PDF. Seleccione un modelo de traducción compatible sin reemplazar el modelo Main de la conversación. |
| **Direct API** | Un modelo API configurado. El registro de suscripción no se puede utilizar como una credencial directa API. Véase [Configuración del proveedor](providers.md). |
| **Local model**, cuando se ofrece | Instale el modelo a través de los controles mostrados y espere hasta que esté listo. La traducción local lleva un párrafo a la vez. |

Para el agente y el API directo, el texto de documento y el glosario se envían al modelo seleccionado. Compruebe el servicio elegido antes de traducir material restringido. La captura de pantalla muestra los controles de preparación y modelo; la suscripción Codex seleccionada hace que **Translate document** no esté disponible.

![Texto completo preparado, con lenguaje de traducción, método y controles modelo](/img/open-science/v0360/translation-settings.webp)

El papel es Lang et al., [catalizador de un solo átomo térmicamente estable para defectos](https://doi.org/10.1038/s41467-018-08136-3), licenciado bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Traducir y reanudar {/* #translate-resume */}

1. Abrir **Translation glossary** cuando un término técnico necesita una redacción consistente. Añadir un **Source term** y su **Preferred translation** con **Add term**. Revise estos términos antes de comenzar.
2. Deje **Advanced → Concurrent translations** en el predeterminado para una primera ejecución. Más solicitudes simultáneas pueden encontrar límites de proveedores.
3. Elige **Translate document**. Vea el recuento del párrafo traducido; un recuento parcial no es un documento completado.
4. Para interrumpir, elija **Cancel**. Se mantienen los párrafos completos. Utilice **Continue translation** para reanudar el trabajo guardado, o **Retry** cuando un error ofrece esa acción. Lea el error de un párrafo antes de usar **Skip and continue**, que deja una brecha a revisar.
5. Reabrir el mismo PDF gestionado y elegir su edición en **Saved translations**. Compruebe **Saved translation parameters** para confirmar el idioma y el modelo. Para cambiarlos, elija **New translation**, en lugar de mezclar diferentes configuraciones en una retry.

Copias verificadas del mismo PDF comparten ediciones guardadas a través de Literatura, Lectura, Inbox y Workspace. Combinar un nombre de archivo o DOI por sí solo no establece contenido idéntico. Este intercambio local no sincroniza las traducciones a otro ordenador.

## Comparación y exportación {/* #compare-export */}

Utilice **Original**, **Translation** y **Compare** para inspeccionar la fuente y las páginas traducidas cuando esté disponible. Verifique términos técnicos, negaciones, cantidades, unidades y referencias de figuras contra el original. Revise **Translation issues** y cualquier pasaje que retenga el texto original; un recuento de párrafo traducido no garantiza que cada pasaje se ajuste a la página renderizada.

Elija **Export translated PDF**, guardar una copia separada, luego volver a abrirla en un lector PDF. Verifique el recuento de la página y varias páginas de texto y números. El contenido no traducido permanece en su idioma original; algunos pasajes conservan el texto original en el PDF mientras sus traducciones permanecen legibles en la barra lateral. Mantenga el original disponible para citas e interpretación científica.

| Si lo ves | Paso siguiente |
| --- | --- |
| **Prepare el texto completo antes de traducir.** | Preparación completa e inspeccione si se encuentran los párrafos elegibles. |
| **Este modelo de suscripción no admite la traducción de PDF. Seleccione otro modelo.** | Elija un modelo de traducción compatible; cambiar el idioma de destino no fijar la compatibilidad del modelo. |
| Límite de la tasa de proveedor o falta de disponibilidad temporal | Espera, luego vuelve a entrar con la misma configuración guardada. Evite comenzar ediciones duplicadas para la misma interrupción. |
| No se puede salvar el progreso | Reabrir el PDF para cargar el último resultado guardado antes de continuar. |

Utilice [Anotaciones PDF y notas de documentos](pdf-notes.md) para grabar preguntas de lectura. Traducción y anotación son herramientas separadas.
