---
title: "Programar una tarea de investigación"
last_update:
  date: '2026-11-19'
---

# Programar una tarea de investigación {/* #schedule-a-research-task */}

Utilice un programa de trabajo que debe ejecutarse en un momento conocido: revisar documentos añadidos recientemente, resumir cambios de proyecto, o rehacer un script preparado. Cada carrera tiene un registro que puede abrir e inspeccionar. Mantenga Open-Science corriendo en el ordenador que posee el horario.

## Preparar una tarea que pueda funcionar sin respuesta {/* #prepare */}

Primero completa la acción prevista una vez en el proyecto. Compruebe las entradas, conexión modelo, tiempo de ejecución, ubicación de salida y permisos requeridos. Un horario no repara las credenciales perdidas o instala cada dependencia para usted. Las carreras no esperan una nueva confirmación humana; las interacciones sin resolver pueden detener el trabajo. Para una nueva conversación, seleccione un modelo de **Main** usable en **Settings → Model**, o establezca los defectos de nueva conversación del proyecto. Importar una suscripción por sí sola no selecciona un modelo. Las tareas basadas en modelos consumen la cuota del proveedor seleccionado.

## Crear el horario {/* #create */}

1. Abra el proyecto, vaya a **Schedule** y elija **New task**. **Start from an example** puede llenar un borrador para un resumen de experimentos diarios o una revisión semanal de literatura.
2. Introduzca un **Name** reconocible. Elija **Action → Send a message** o **Run a script**.
3. Para un mensaje, escriba la tarea bajo **Instructions**. Bajo **How to run**, elija **Continue an existing conversation** o **New conversation for each run**. Seleccione **Target conversation** cuando continúe.
4. Para un guión, elija una conversación existente y su **Language**: Python, R o Shell. Introduzca el **Script** completo. Evite depender de variables temporales de un kernel anterior; cargar las entradas requeridas explícitamente.
5. Establecer **Repeat** a **Once**, **Fixed interval**, **Daily** o **Weekly**. Compruebe el tiempo de inicio, el intervalo o los días de semana según corresponda, a continuación, confirme **Time zone** y **Next run**.
6. Revisión **Execution permissions**. Utilice sólo el acceso a las necesidades de la tarea. Una conversación existente puede seguir sus permisos de conversación; la configuración de permiso de un programa no proporciona credenciales o pasa por alto reglas de red estrictas.
7. Bajo **Advanced**, opcionalmente establece un tiempo final o un recuento máximo de ejecución. Para scripts, revise el tiempo de ejecución. Elija **Create** y compruebe la tarea guardada y la próxima carrera.

<p className="example-label"><strong>Ejemplo</strong> Preparar una literatura semanal digerir</p>

Use **Send a message**, elija el viernes y su propia hora local, y adapte esta instrucción a un proyecto que contiene papeles y notas:

```text
Review papers and reading notes added to this project in the last seven days.
For each paper, summarize its main finding and link to its source or project file.
Distinguish abstract-only records from papers whose full text is available.
If nothing was added, say so. Keep the digest in English.
```

Esta tarea revisa el material existente del proyecto. Para buscar documentos recién publicados, solicite explícitamente una búsqueda y configure el [conectores de literatura](../tools/databases.md) requerido primero.

## Ejecutar un resumen de enseñanza de una sola vez {/* #worked-example */}

<p className="example-label"><strong>Ejemplo práctico</strong> Cuadro un resumen de cinco números</p>

Use **Send a message**, nombre la tarea **Teaching summary — one run**, e ingrese:

```text
In English, state the mean and median of the hypothetical observations 2, 4, 6, 8, 10.
Explain in two sentences why these values alone do not support population inference.
Do not use tools or create files.
```

Elige **New conversation for each run**, **Repeat → Once** y un momento futuro. Use **Existing permissions only**: esta tarea no necesita herramientas. Seleccione **Create** y mantenga la aplicación en funcionamiento.

![Una tarea de mensaje de una sola vez con sus instrucciones, el objetivo de nueva conversación y la próxima carrera](/img/open-science/v130/schedule-create.webp)

A la hora programada, abra la tarea y revise **Results**. En este ejemplo, tanto la media como la mediana fueron **6**. La respuesta explicó por qué cinco valores hipotéticos no permiten sacar conclusiones sobre una población. **Open session** abre la conversación; la tarea de una sola ejecución pasa a **Completed**. Compruebe el resultado antes de reutilizarlo.

![Mensaje programado completo y su resultado de la enseñanza](/img/open-science/v130/schedule-result.webp)

## Inspeccione una carrera y cambie el horario {/* #run-history */}

Abra la historia de la tarea y seleccione una ocurrencia. Inspeccione su estado, conversación de destino y resultado. **Run completed** registra la terminación de esa carrera; inspeccionar la respuesta real o la salida de script antes de utilizarla como evidencia de investigación. **Failed**, **Interrupted** y **Skipped** requieren leer la razón asociada, sin asumir que se produjo un resultado.

Use **Pause** para suspender temporalmente las próximas ejecuciones y **Resume** para reanudarlas. Revise la siguiente ejecución después de cambiar el horario. **Close** finaliza la tarea. Si una tarea completada o cerrada es de solo lectura, cree una nueva. Consulte el historial antes de repetir el trabajo manualmente, especialmente tras volver a conectar o reiniciar la aplicación.

Para los registros de ejecución y recuperación de tiempo de ejecución, vea [Notebook](notebook.md). Para los límites de acceso, consulte [modos de aprobación](approval-modes.md) y [Reglas de red](network.md).
