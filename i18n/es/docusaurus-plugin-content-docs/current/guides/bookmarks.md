---
title: "Marcadores de lectura personales"
description: "Guardar pasajes y regiones PDF para ti mismo, añadir notas y volver a su fuente dentro de una sesión."
last_update:
  date: '2026-09-20'
---

# Marcadores de lectura personales {/* #private-reading-bookmarks */}

Use marcadores para guardar un pasaje que desee volver a visitar, una tabla que necesita para comprobar, o una nota para la lectura posterior. **For me** guarda un registro de lectura privado en la sesión actual. **To Agent** prepara una anotación para una solicitud; guardar un marcador no envía un mensaje o añadirlo al contexto de agente.

## Guardar un pasaje o región PDF {/* #save-a-passage-or-pdf-region */}

1. Abra una sesión salvada existente. Seleccione texto en una conversación o una vista previa de texto compatible. En un PDF, seleccione texto o utilice su control de selección regional para marcar el área que necesita.
2. Abra el control de anotación de la selección y elija **For me**.
3. Agregue un **Note (optional)**, como “Comprobar el denominador antes de comparar estos porcentajes”. Seleccione **Bookmark**.
4. Abra **Bookmarks** en el Compositor y confirme la entrada guardada. Seleccione para comprobar que regresa al pasaje previsto o a la región PDF.

Los marcadores están disponibles después de que la conversación haya sido salvada. Si el control no está disponible, vuelva a una sesión existente antes de intentarlo de nuevo. No todos los espectadores incrustados o abiertos externamente soportan la selección de texto para marcadores.

## Regresar, editar o eliminar {/* #return-edit-or-remove */}

Abra la lista **Bookmarks** de la sesión y seleccione una entrada, o utilice **Show bookmark source**. Para un archivo gestionado, el marcador vuelve a abrir la versión de archivo guardada que hace referencia. Compruebe la página, el pasaje y la versión al compararlo con un resultado más nuevo.

Elija **Edit bookmark note** de la lista o el marcador persistente junto al pasaje, edite la nota y seleccione **Save**. **Cancel** deja la nota guardada sin cambios. **Delete bookmark** elimina el marcador de lectura; no elimina el mensaje fuente o el archivo.

Si la fuente no está disponible o su ubicación exacta no se puede encontrar, utilice el mensaje mostrado para distinguir esos casos. Localice la fuente manualmente antes de reemplazar el marcador; no asuma el texto visible más cercano es la selección original.

## Lo que se mantiene privado y lo que se comparte {/* #what-stays-private-and-what-is-shared */}

- Los marcadores y las notas persisten cuando reabrimos la sesión después de reiniciar la aplicación.
- Pertenecen a ese período de sesiones. No se transfieren a otra rama ni sincronizan a través de máquinas, y eliminan la sesión elimina sus marcadores.
- [Paquetes de investigación .science](research-packages.md) excluye estos marcadores privados. Ponga información que un colega necesita en un informe guardado o en la conversación antes de preparar una entrega.
- Para preguntarle al agente sobre un pasaje, use **To Agent** y revise la anotación en el borrador previsto antes de enviar. Las anotaciones de movimiento entre Main y una discusión lateral están cubiertas en [Side Chat](delegation.md).

## Marcas en un tenedor {/* #bookmarks-in-fork */}

Desde v0.31.0, [Fork](sessions.md#fork-session) copia marcadores privados y notas en la nueva sesión con identidades frescas. Más adelante las ediciones en la copia no editan los marcadores de origen. Esto es diferente de cambiar ramas o exportar un archivo `.science`: los marcadores privados todavía no se unen a las exportaciones de paquetes o sincronizan a través de máquinas.
