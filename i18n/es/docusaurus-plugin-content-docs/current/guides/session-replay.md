---
title: "Repetir y discutir una sesión grabada"
last_update:
  date: '2026-11-09'
---

# Repetir y discutir una sesión grabada {/* #replay-and-discuss-a-recorded-session */}

La repetición de sesión presenta los mensajes, pasos de herramienta y versiones de archivos retenidos en una sesión. Úsalo para seguir un análisis, localizar sus evidencias y hacer una pregunta enfocada. Playback no reimprime el código o establece que un análisis es reproducible; use [Verificación de la reproducibilidad](reproducibility.md) para esa tarea separada.

## Abrir una repetición {/* #open-replay */}

1. Abra el menú de acción de la sesión en la barra lateral y elija **View replay**. Para una sesión `.science` importada, el panel **Imported research history** también proporciona **View replay**.
2. Compruebe el título de sesión y sucursal. Cuando se ofrece **Replay branch**, seleccione la rama que tiene la intención de inspeccionar.
3. Utilice **Enter full screen** para más espacio. **Exit full screen** vuelve al espacio de trabajo; cerrar la vista previa no elimina la sesión.

La investigación importada sigue siendo de sólo lectura. Usted puede inspeccionar y discutirlo; Elija **Fork to continue** si necesita una continuación de trabajo. Siga a [importación de paquetes de investigación](research-packages.md#import-and-inspect-a-package) antes de abrir su repetición.

## Siga las medidas registradas {/* #playback-controls */}

| Control | Medida |
| --- | --- |
| Play replay / Pause replay | Inicio o pausa de la presentación de la secuencia guardada |
| Previous step / Next step | Mover a un paso registrado adyacente |
| Replay progress | Busque otro punto en la grabación |
| Playback speed | Cambio de velocidad de presentación; esto no acelera un cálculo |
| Browse steps | Seleccione un mensaje, paso de herramienta o evento de conversión de archivo por su etiqueta |
| Notebook / View files | Inspeccione la lista de materiales o archivos Notebook registrada disponible en ese punto |
| Watch again | Reiniciar después de la reproducción alcanza Completado |

Ampliar una tarjeta de herramientas para leer sus entradas y salidas retenidas. Inspeccione los nombres de archivo y los números de versión antes de usar un resultado. La posición de reproducción se mantiene para volver a la misma grabación. Las sesiones más antiguas pueden mostrar un cronograma reconstruido a partir de registros archivados; su duración de presentación no es un punto de referencia de la computación original.

<p className="example-label"><strong>Ejemplo práctico</strong> Discuta la evidencia en un análisis de la vía TP53</p>

Este ejemplo abre el [Análisis de Pathway Commons](../workflows/inspect-pathway.md) grabado, que seleccionó Reactome **Reglamento de transcripción por TP53**. Su exportación contiene registros de interacción 3,318 y nodos 387. Estos son resultados de este análisis salvado, no cuenta con esperar de cada consulta futura.

En **Browse steps**, localice la red exportada, las respuestas originales, la nota de investigación y la pequeña tabla de interacción TP53-MDM2-CDKN1A. El ejemplo tiene 12 pasos registrados. Seleccione el paso de la versión de archivo de la tabla, luego lea la explicación anterior del alcance de la red.

![La reproducción real TP53 con sus pasos grabados, versiones de archivos y controles de reproducción](/img/open-science/v0350/replay-step-list.webp)

## Pregunte por un paso {/* #discuss-replay */}

1. Pausa en el paso pertinente y seleccione **Ask about this step**. Para una pregunta más amplia, elija **Ask about this research**.
2. Revisar el proyecto de discusión y su **Discuss** Apego. En la sesión, rama y paso seleccionados se identifican las pruebas que se están discutiendo. Una carrera de Notebook seleccionada incluye su contexto registrado incluso cuando algunas células están fuera del puerto de visión actual.
3. Introduzca una pregunta enfocada, elija un modelo conectado y seleccione **Send**. Abrir una discusión o agregar contexto no envía la pregunta automáticamente.
4. Para la investigación importada, la discusión es una conversación infantil vinculada. Regrese al registro de padres para comprobar el paso original; la discusión no hace que la historia de sólo lectura sea obligatoria. Uso **Fork to continue** para una continuación en su lugar.
5. Inspeccione cualquier aprobación de la herramienta y compare la respuesta con las pruebas registradas. Una explicación modelo puede contener errores incluso cuando el enlace fuente es correcto.

Para el ejemplo TP53 arriba, pregunte:

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

La respuesta del ejemplo identifica `tp53_mdm2_cdkn1a_readable_interactions.tsv` y separa la exportación aplanada de una conclusión biológica. La captura de pantalla muestra que la discusión registrada; los controles actuales de discusión enlazada pueden diferir.

![The completed Codex discussion along with the recorded TP53 analysis](/img/open-science/v0350/replay-answer.webp)

Para hacer una presentación narrada de una sesión completa, siga [Películas de investigación](research-films.md). Repetir, una discusión y una película cada reutilización de evidencia registrada; ninguno de ellos reedita el análisis.

## Cuando la evidencia no está disponible {/* #replay-evidence */}

Una llamada de herramienta grabada puede permanecer visible incluso cuando su entorno de ejecución original no está disponible. Lea el código y la salida retenidos; no trate la advertencia del medio ambiente como un nuevo resultado de ejecución.

Si un archivo informa **Vista previa no disponible** o **The recorded evidence is unavailable**, compruebe la tarjeta de archivo original de la sesión y la versión seleccionada. Si esa opinión no puede abrirla, utilice un archivo original retenido por separado o obtenga un paquete completo de investigación de su autor. Un nombre de archivo y una línea de tiempo de reproducción completa no prueban que el contenido del archivo está disponible. Discuta sólo las pruebas que puede inspeccionar.

Para un nuevo cálculo, [de la reunión](sessions.md#fork-session), suministra los archivos/ambiente necesarios y ejecuta el análisis. Para comparar una nueva carrera con un artefacto guardado, utilice [Verificación de la reproducibilidad](reproducibility.md), no el indicador **Completed** de la repetición.
