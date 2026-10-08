---
title: "Conversaciones y solicitudes en cola"
last_update:
  date: '2026-10-08'
---

# Conversaciones y solicitudes en cola {/* #conversations-and-queued-requests */}

El Compositor envía instrucciones y referencias de entrada a la sesión actual y le permite preparar seguimiento durante la ejecución. **Queue · No guardada** significa que una solicitud solicitada aún no se ha convertido en una instrucción de transcripción guardada.

## Empieza por una idea de investigación {/* #research-starters */}

La página de conversación vacía ofrece **Analyze data**, **Compare papers**, **Find literature**, **Create charts** y otros inicios de investigación junto al Composer. Utilice las flechas para ver más opciones.

1. Abrir **New** en el proyecto previsto.
2. Elige un starter como **Explain a paper**. Llena al Compositor con una solicitud editable; elegir no envía un mensaje.
3. Adjunte el papel o los datos reales, espere la carga y reemplace la solicitud general con su pregunta y la salida esperada.
4. Compruebe el modelo, los adjuntos y la solicitud, luego enviar. Abra las fuentes y archivos devueltos antes de aceptar el resultado.

![Inicio de investigación y la entrada compacta de importación de paquetes de investigación en una nueva conversación](/img/open-science/v0351/new-conversation.webp)

**Import previous research** es la entrada separada para un paquete `.science`. Elegir un starter de investigación no importa un paquete ni proporciona datos de ejemplo.

## Prepare una solicitud con un resultado verificable {/* #prepare-a-request-with-a-checkable-outcome */}

Seleccione **New** en el proyecto previsto e ingrese una solicitud en **Ask anything**. Nombra la entrada, la salida deseada y cualquier limitación de método. Para un ejemplo de inicio completo, siga [Su primer proyecto](first-project.md).

| Entrada | Medida | Compruebe antes de enviar |
| --- | --- | --- |
| + → Adjuntar archivos | Elija un archivo local y espere a subir | chip intended presente; no se mantiene ninguna transferencia activa |
| Acoplamiento | Vista previa de la entrada escenificada | El nombre y el contenido coinciden con los datos previstos |
| Eliminar adjunto | Eliminar su proyecto de referencia | No elimina el archivo local original |
| + → Tus archivos | Seleccione un archivo de proyecto existente | Artefacto/versión correcto, no sólo un nombre similar |
| `@` | Seleccione una referencia de archivo/artifacto o literatura disponible | Elija una sugerencia real para atar la referencia |
| `/` | Seleccione un Skill disponible | El método es pertinente y se dispone de requisitos previos |
| `#` | Referencia una transcripción de sesión para este turno | No promete incluir todos los archivos/paneles de esa sesión |
| + → Guardar como habilidad | [Convierta una rama completa en un Skill reutilizable](../skills/create.md) | Finalizar la actividad actual; inspeccionar la punta de la herramienta si no está disponible y verificar el paquete guardado |
| + → Contexto | Inspeccionar el uso actual del contexto | Nuevas sesiones insensatas pueden tener una entrada discapacitada |
| + → Repaso | Solicitud de revisión cuando existe el trabajo elegible | Se requiere un resultado y una ruta de revisión compatible |

Los pasados de texto largo por encima de los caracteres 10,000 o las líneas 300 se convierten en apegos gestionados. **Show in text field** restaura ese texto al editor cuando se ofrece. Al comienzo de un Composer vacío, Up/Down navega por la historia rápida; inspeccionar los archivos adjuntos restaurados antes de reenviar.

## Seleccione cómo comienza el trabajo {/* #select-how-work-begins */}

El selector de modelo elige entre los modelos configurados. Sus opciones de razonamiento dependen del modelo/framework. Los cambios se aplican a las solicitudes posteriores, no a un giro ya en marcha. **Agent controls** expone el modo de permiso, Auto-review, opción Specialist y Delegación; cada uno tiene un efecto separado.

| Enviar control | Uso | Resultado/frontario |
| --- | --- | --- |
| Enviar mensaje | Idle session, ready request | Guarda un mensaje de usuario y comienza la ejecución |
| Más opciones de envío → Plan primero | Medidas de revisión antes de la ejecución | Responder al plan antes de que se aprueben los trabajos |
| Chat lateral | Discos en una pestaña independiente con herramientas restringidas | Los nuevos borradores heredan el modelo de conversación y el esfuerzo de razonamiento; verifique la selección de Side Chat antes de enviar. Véase [Side Chat](delegation.md) |
| Subdivisión | Prosecución independiente cuando se disponga de | Comprobación de la historia o los ficheros heredados; ver [Sesiones](sessions.md) |
| Agregar mensaje a la cola | Preparar un seguimiento mientras se ejecuta | La solicitud pendiente no se guarda hasta que se entrega |
| Cancelar ejecución | Detener la ejecución actual | Esperar la cancelación; los resultados ya guardados no se deshacen automáticamente |

## Enviar comentarios precisos {/* #send-precise-feedback */}

<p className="example-label"><strong>Ejemplo</strong> Solicitar entradas y comprobaciones de salida en un plan</p>

Si el plan omite una comprobación de la integridad de la fuente o de la salida, solicitelo antes de aprobarlo. Adapte los requisitos de salida a continuación a su tarea:

```text
Add an explicit before/after SHA-256 check and reopen all three saved
outputs. Use compact sample labels in the plot, and include their exact
original column-name mapping in the CSV/report.
```

Esto se presentó a través de **Respond to Plan → Send Plan feedback**, seguido de la aprobación del plan revisado. No fue una demostración de la entrega de colas. Vea [Planificación](planning.md) para los controles y capturas de pantalla reales.

Para una tarea en ejecución, utilice la cola cuando necesite cambiar la siguiente instrucción. Declarar qué cambios y qué sigue siendo necesario. Una actualización de mensajes no autoriza en sí mismo una instalación de paquete recientemente solicitada o un acceso de archivo más amplio.

## Administrar la cola de una tarea en ejecución {/* #manage-a-running-tasks-queue */}

1. Ingrese el seguimiento en Pregunte cualquier cosa mientras la carrera está activa.
2. Seleccione **Add message to queue**, luego amplíe su cuenta para leer el texto pendiente.
3. Utilice **Edit queued message** para traerlo de vuelta al Compositor. Preserve/clear un borrador existente primero si la aplicación pregunta.
4. **Remove queued message** elimina el elemento pendiente, no una instrucción ya entregada.
5. Arrastre la manija del reorden. Para la reordenación del teclado, concéntrelo, presione **Espacio** para recoger el elemento, **Up/Down** para moverlo, luego **Espacio** para soltarlo.
6. **Send now** solicita la entrega a través de la ruta de seguimiento apoyada por el marco.
7. Confirme el texto aparece como un mensaje de usuario y el agente reconoce el cambio.

Lea **Sending…**, **Stopping…** o **Mensaje solicitado se enviará después de los acabados de ejecución actuales**. Algunos estados marco retrasan la entrega. **No se salva** significa que el texto aún no es un mensaje de transcripción duradero; preservar el texto pendiente importante antes de cerrar/recargar. Una advertencia de rama significa que la cola pertenece a otro camino de mensaje. Resolver un error de envío sobre el elemento existente antes de añadir duplicados.

### Editar y reordenar las medidas de seguimiento mientras se está redactando un informe {/* #edit-and-reorder-follow-ups-while-a-report-is-being-written */}

Para revisar varios mensajes solicitados, editar la solicitud prevista, ajustar su orden, luego eliminar cualquier solicitud que ya no necesite:

1. Seleccione **Edit queued message** al lado del elemento indicado. Se mueve hacia el Compositor y deja temporalmente la cola.
2. Revise el texto y seleccione **Add message to queue**. Revise su posición de nuevo; una solicitud editada puede volver al final.
3. Para mover la solicitud anterior, concentre su mango **Mensaje reordenado**, presione **Espacio**, utilice las teclas de flecha, luego presione **Espacio** de nuevo.
4. Use **Remove queued message** junto a un recordatorio o instrucción que ya no necesita.
5. Después de la entrega, compruebe la transcripción guardada para el texto final y el orden. Las solicitudes eliminadas no deben aparecer como instrucciones entregadas.

![Las dos solicitudes restantes después de la edición y reordenación](/img/open-science/local-todo-batch/14-queue-reordered.webp)

Compruebe que las respuestas entregadas siguen el contenido y el orden editados. Los artículos etiquetados **No se salva** no han entrado en la transcripción guardada; copiar el texto no deseado importante antes de cerrar o reiniciar.

**Exit queued editing** termina el modo de edición de cola y deja el texto en el Compositor. Editar elimina el elemento original de la cola, por lo que salir no lo pone de nuevo. Reteniéndolo, compruebe el borrador y añádalo a la cola de nuevo; para descartarlo, despejar el borrador.

### Preserve archivos adjuntos al editar {/* #preserve-attachments-when-editing */}

Cuando una solicitud queued incluye un archivo, confirme su chip adjunto está todavía presente cada vez que reabrir el editor. Cambia las instrucciones y selecciona **Add message to queue**. Después de la entrega, compare el archivo mostrado en el mensaje de usuario guardado con la entrada prevista. Pida una suma de verificación de archivos cuando importe la identidad exacta de archivo.

![La solicitud de apego editada entregada con su archivo y suma de comprobación](/img/open-science/sept11-completion/queue-result.webp)

### Un apego queued se vuelve indisponible {/* #a-queued-attachment-becomes-unavailable */}

Si un mensaje editado queued se detiene con **El archivo gestionado o su sesión se elimina.**, inspeccione sus chips de apego y el archivo original en Archivos. Preserve el texto de solicitud, reajuste el archivo actual en un nuevo mensaje ordinario, y reingrese. Evite enviar repetidamente la misma referencia de apego a las mismas etapas. Mantenga el error y la identidad de archivo para un informe de diagnóstico si el nuevo adjunto también falla.

## Leer la actividad y la terminación {/* #read-activity-and-completion */}

Ampliar una tarjeta de herramientas para inspeccionar sus argumentos, código y salida. Después de la finalización, abra cada resultado solicitado. Si un paso falló, utilice su primer error para elegir la acción de recuperación en [Solución de problemas](troubleshooting.md).

**Show more** amplía una larga solicitud de usuario. **Copy message** y código Copiar los controles copian su contenido respectivo. **Scroll to end** vuelve al último evento; el tren de los marcadores de escritorio salta entre los impulsos en una larga conversación. La edición de un mensaje de usuario anterior crea una revisión; use [Sesiones](sessions.md) para entender el camino seleccionado.

| Problema | Siguiente verificación |
| --- | --- |
| Enviar deshabilitado | Texto vacío, subida incompleta o estado de sesión no disponible |
| Queue edit refused | El borrador del Compositor existente debe ser preservado/limpio |
| Continuación del análisis original | Confirmación de entrega de actualización versus estado diferido |
| La tarea espera después de la aprobación del plan | Un permiso de herramienta separado puede estar pendiente |
| Modelo dice Hecho pero una herramienta falló | Inspeccione el primer fracaso y los artefactos salvados reales antes de la aceptación |

## Copiar, descargar o ampliar una tabla de respuesta {/* #copy-download-or-enlarge-an-answer-table */}

Agitar o enfocar la tabla de respuesta para revelar **Copiar la mesa** (Markdown, CSV o TSV), **Descargar mesa** (CSV o Markdown), y **Ver pantalla completa**. Elija el formato necesario, confirme el destino y vuelva a abrir el archivo para comprobar filas y encabezados. Estas acciones exportan una respuesta existente; no reimprimen un Connector ni crean una versión de artefacto gestionado.

![La tabla de metadatos devuelta en su vista de pantalla completa](/img/open-science/guides-walkthrough/60-response-table.webp)

Para trabajos de larga duración, utilice [Tareas en segundo plano](notebook.md#background-tasks-and-result-delivery) para abrir o cancelar la ejecución específica. Un seguimiento frustrado es una instrucción pendiente; una tarea de antecedentes ya se admite trabajo. Cerrar la lista de tareas no detiene la ejecución.

Fuentes: [Controles de las colas](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx), [Controlador de entrega](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/workspace-message-queue-controller.ts).

## Suelta archivos en una conversación {/* #conversation-drop */}

Puede arrastrar archivos locales en el área de conversación, no sólo el Compositor. Espere a que los chips adjuntos y cualquier subida a terminar, inspeccione los nombres de archivo, luego envíe la solicitud. Los archivos de desplegables no envían el mensaje. Para importar un paquete de investigación `.science`, utilice **Import previous research** en la página de conversación vacía; ver [Paquetes de investigación](research-packages.md).
