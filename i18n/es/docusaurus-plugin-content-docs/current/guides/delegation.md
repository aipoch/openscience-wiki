---
title: "Delegación y Side Chat"
last_update:
  date: '2026-09-22'
---

# Delegación y Side Chat {/* #delegation-and-side-chat */}

Utilice Side Chat para discutir una pregunta junto con su tarea actual, o delegación para dar a otro agente una tarea separada. Para continuar una conversación completa en una dirección diferente, utilice un [rama de sesión](sessions.md).

## Side Chat {/* #side-chat-availability */}

### Cuándo usarlo {/* #when-to-use-it */}

Abrir Side Chat para explicar un término en un resultado de análisis, comparar dos enfoques, o discutir cómo hablar un informe. Después de la discusión, envía el consejo que eliges a la conversación principal, Main.

### Cómo usarlo {/* #how-to-use-it */}

1. En una sesión existente, abra **More send options → Side chat** junto al botón de envío. Puede abrirlo con un Compositor vacío: un nuevo borrador Side Chat aparece inmediatamente. Escribe la pregunta allí, revisa el modelo y el esfuerzo de razonamiento, y luego envíala.
2. Lea la respuesta en su pestaña de vista previa independiente **Side chat**. Utilice **Side chat follow up** para hacer más preguntas. Puede mantener varias discusiones paralelas en el mismo período de sesiones y cambiar entre sus pestañas mientras sigue utilizando Main.
3. Para compartir consejos con Main, pida explícitamente a Side Chat que lo relate. Por ejemplo: “Enviar este consejo a Main: Explicar el manejo de valor perdido en una parte separada del informe.” Chequee por el mensaje etiquetado **Side chat** en Main. Si Main está ocioso, envíe su siguiente solicitud para continuar el trabajo.
4. Use **Cancel Side chat response** para detener la respuesta actual. Cambie de pestaña o contraiga el panel de vista previa para volver a Main. Antes de reiniciar la aplicación, envíe a Main o guarde en un informe lo que quiera conservar después del reinicio.

Un borrador que contiene texto o anotaciones sobrevive a cambiar opiniones. Un borrador vacío intacto es descartado cuando lo dejas; abrir un borrador por sí solo no envía una solicitud modelo.

### Mover una anotación al borrador adecuado {/* #move-an-annotation-to-the-right-draft */}

Para un pasaje o región seleccionado, utilice la acción **Move to Side chat…** de la anotación y elija una discusión lateral existente o una nueva. También puede arrastrar anotaciones entre Main y un borrador Side Chat. Compruebe el destino y el contenido transferido antes de enviar: mover una anotación prepara un borrador; no presenta una solicitud.

Los marcadores privados **For me** son una herramienta de lectura diferente; ver [Marcas de lectura](bookmarks.md).

### Aspectos que conviene saber {/* #things-to-know */}

- **Configuración del modelo:** Un nuevo Side Chat hereda el modelo y el esfuerzo de razonamiento de la conversación principal actual. Puedes cambiarlos en Side Chat; la selección se aplica a su próximo envío. Se admiten suscripciones Codex. Compruebe el selector antes de enviar.
- **Envío y acciones:** Las respuestas ordinarias no se envían automáticamente a Main. Side Chat no puede conceder permisos de Main; confirmar la entrega antes de pedir a Main que tome acción.
- **Cerrar una pestaña:** Lea **Close Side chat?** antes de confirmar. Al cerrar, se detiene ese Side Chat y se elimina su conversación. Seleccione **Cancel** para conservarla. Si solo quiere volver a Main, cambie de pestaña o contraiga el panel de vista previa. Si la limpieza falla, la pestaña vuelve a aparecer con un error.
- **Reiniciar la aplicación:** Las conversaciones de Side Chat y los consejos aún no entregados a Main solo se conservan durante la ejecución actual. Al recargar la interfaz o cambiar de proyecto se puede recuperar ese estado en memoria; reiniciar por completo la aplicación lo borra. Antes de salir, envíe los consejos útiles a Main o guárdelos en un informe. Los mensajes ya guardados en Main permanecen en su historial.
- **Disponibilidad:** En v0.30.2, Main corriendo o esperando la aprobación no bloquea por sí mismo Side Chat. Envía al menos un mensaje en Main primero. Solo las sesiones importadas y las sesiones de padres no disponibles no pueden abrir Side Chat. Side Chat no acepta archivos adjuntos. Siga la explicación del botón real; Los problemas de conexión están cubiertos en [Solución de problemas](troubleshooting.md).

## Delegación de tareas {/* #task-delegation */}

### Cuándo usarlo {/* #when-to-use-it-1 */}

El trabajo delegado que se puede manejar de forma independiente, como comprobar fuentes de literatura, inspeccionar un archivo de datos o revisar los resultados de análisis, luego dejar que el agente principal combine los hallazgos. Para los asistentes reutilizables con funciones definidas, véase [Specialist delegation](../specialists/delegate.md).

### Cómo usarlo {/* #how-to-use-it-1 */}

1. Compruebe **Delegation** en el **Agent controls** del Compositor.
2. En **Settings → Model → Subagent**, elija la herencia del modelo principal o configure un modelo separado y un esfuerzo de razonamiento compatible.
3. Describir la tarea de delegar, sus archivos de entrada, los criterios de salida y aceptación esperados en su solicitud.
4. Siga el estado del subtarea en las entradas de actividad y responda a cualquier solicitud de permiso.
5. Abra los archivos devueltos o enlaces de origen para comprobar el resultado. Para inspeccionar los registros de ejecución, seleccione el propietario correspondiente en el filtro Notebook de **Agent**.

### Aspectos que conviene saber {/* #things-to-know-1 */}

- Las capacidades disponibles dependen del marco de agente y la configuración. Después de habilitar a la Delegación, compruebe las entradas de actividad para confirmar que un subtask comenzó en realidad.
- Los subagentes no pueden compartir todas las variables de Main o Python. Proporcione los archivos e instrucciones necesarios para la tarea.
- Aprobar el plan de Main no aprueba automáticamente cada acción subagente. Compruebe la acción y el alcance específicos cuando se solicite el permiso.
- Cuando **Release** esté disponible, utilícelo para terminar o liberar el recurso de subtask. La evidencia de Main se mantiene.
