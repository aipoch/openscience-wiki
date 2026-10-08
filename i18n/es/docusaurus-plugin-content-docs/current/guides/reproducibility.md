---
title: "Reproducibilidad"
description: "Realizar los pasos de investigación capturados, comparar un resultado ahorrado y conservar el registro de verificación."
last_update:
  date: '2026-10-08'
---

# Reproducibilidad {/* #reproducibility */}

Utilice **Reproducibility** para rehacer el procedimiento registrado para un resultado guardado y comparar la nueva salida con esa versión de archivo. El cheque conecta entradas, registros de ejecución, información ambiental y comparaciones de salida para que pueda inspeccionar cómo se produjo un resultado.

## Cuándo usarlo {/* #when-to-use-it */}

- Antes de compartir un resultado, compruebe si su procedimiento capturado produce una salida que coincide.
- Al revisar un resultado, inspeccione las diferencias entre el archivo guardado y una nueva carrera.
- Al entregar el trabajo a un colega, conserve un registro de verificación junto con los archivos y versiones pertinentes.

Elija la acción que responda a su pregunta:

| Medida | Propósito |
| --- | --- |
| Reproducibilidad | Realizar un procedimiento capturado y comparar sus salidas con versiones guardadas. |
| [Revisión](../specialists/reviewer.md) | Evaluar las pruebas seleccionadas e informar de las conclusiones del examen. |
| [Generar script](notebook.md) | Reconstruct code for use outside the original Notebook. |

## Antes de empezar {/* #before-starting */}

Abra el resultado guardado y seleccione la versión que desea comprobar. Vaya a **File actions → Provenance → Reproducibility** e inspeccione los archivos de entrada capturados, las carreras Notebook y las cerraduras de entorno.

Resolver cualquier **Areas needing attention** primero. Un cheque depende de las pruebas registradas para esa versión. Si una ejecución anterior falló o falta evidencia requerida, ejecute con éxito el código requerido y genere una nueva versión de resultado; un registro perdido de una versión antigua no se llena retroactivamente.

Iniciar un cheque requiere la interfaz de escritorio. Se requieren registros de ejecución compatibles: esta característica no vuelve a reproducir una conversación completa o verifica todo tipo de archivo.

### Preparar el medio ambiente {/* #prepare-environment */}

Para un primer cheque, utilice un entorno Python o R gestionado por aplicaciones. Open-Science captura las cerraduras de dependencia soportadas cuando el código se ejecuta. Una lista de paquetes o la salida `pip freeze` por sí sola no es suficiente para restaurar fuentes de paquetes exactas.

1. Abre **Settings → Runtimes**. En el idioma requerido, prepare el **App-managed environment** y confirme **Ready** y **Enable**. Ver [configuración de tiempo de ejecución](runtimes.md).
2. Pida al agente que seleccione ese entorno para la sesión e inspeccione las dependencias del código original. Instalar paquetes perdidos a través del flujo de gestión de paquetes soportado, reiniciar el núcleo si se solicita, y luego verificar sus importaciones en el mismo Notebook. Comprueba el [intérprete activo](runtimes.md#confirm-the-active-interpreter) antes de continuar.
3. Reembolsa el código de preparación y productor necesario utilizando las entradas originales, a continuación, guardar una nueva versión de resultado. Mantener el resultado original para la comparación; cambiar la configuración por sí solo no actualiza su evidencia capturada.
4. Abra el **Provenance → Environment** de la nueva versión, inspeccione su cerradura y cualquier diagnóstico faltante de paquete, luego vuelva a **Reproducibility**. Continúe cuando **Check reproducibility** esté disponible y las entradas y carreras necesarias están presentes.

Si el entorno existente todavía carece de cerraduras exactas, active **Settings → Runtimes → Let the Agent create environments** y pida un entorno independiente gestionado por aplicaciones con las dependencias de análisis originales. Haga que el agente lo seleccione y verifique las importaciones requeridas, a continuación, repita los pasos 3-4. Mantener el entorno existente; no cambie el método de análisis sólo para hacer el cheque disponible.

Si la nueva versión todavía muestra **Unavailable**, retén **View details**, los nombres/versiones de los paquetes y el tiempo de ejecución seleccionado. Resolver cualquier [error de conexión de fuente de paquete](network.md) reportado antes de repetir. Si la cerradura todavía no puede ser capturada, detenga y use [Solución de problemas](troubleshooting.md); dejar el resultado no verificado.

<p className="example-label"><strong>Ejemplo práctico</strong> Inspeccione un resumen de la muestra QC</p>

La captura de pantalla muestra un resumen generado en Notebook desde el [GSE60450 muestra tabla QC](../reference/example-data.md). Abra la pestaña **Provenance → Reproducibility** del archivo para inspeccionar sus entradas capturadas y ejecutar. Aquí, **Not verified yet** y **Unavailable** indican que falta una cerradura de entorno exacta. Utilice **View details**, luego siga el [adopción de medidas para la preparación del medio ambiente](#prepare-environment) para crear una nueva versión. Esta pantalla no muestra una reproducción satisfactoria de los resultados.

![El resumen QC guardado y su panel de Reproducibilidad, mostrando evidencia capturada y un cheque no disponible](/img/open-science/feature-guides-2026-09/reproducibility-evidence.webp)

## Ejecute un cheque {/* #run-a-check */}

1. En **Reproducibility**, confirma la versión de resultado seleccionada y sus entradas.
2. Elija **Check reproducibility**, o **Check again** para otro intento.
3. Si elige un punto de partida guardado con **Check from here**, inspeccione **Files to restore** y **Runs to execute**, entonces elija **Start check**. La preparación anterior puede ser aún necesaria cuando un paso depende del estado Notebook anterior.
4. Siga el progreso y el registro. El cheque restaura las entradas registradas y el entorno en forma aislada. Use **Cancel** si necesita parar.
5. Cuando el cheque termine, abra los detalles de comparación de cada salida antes de decidir si el resultado coincide.

El menú de sesión también ofrece **Check session artifacts** para comprobar múltiples versiones de resultados capturados. Inspeccionar las versiones elegibles y sus resultados individuales; a) La adopción de medidas a nivel de período de sesiones no establece que se haya comprobado cada resultado.

## Lea el resultado de la comparación {/* #read-the-comparison-result */}

| Resultado | Qué hacer después |
| --- | --- |
| Resultado reproducido | Inspeccionar los criterios de comparación registrados y retenerlos con la conclusión. |
| El resultado es diferente | Inspeccione los diferentes archivos y los detalles de comparación antes de decidir si la diferencia afecta su trabajo. |
| Aún sin verificar | No hay verificación completa establece una coincidencia para esta versión. Revise la evidencia disponible y comience un cheque cuando esté listo. |
| Se detuvo el cheque / se canceló | Lea el registro, resuelva la causa reportada si es necesario, luego vuelva a entrar. La cancelación no es un resultado de comparación. |

Que una ejecución haya terminado no demuestra por sí solo que los resultados coincidan. La igualdad Byte, las comparaciones de imagen/tabla fijas y los criterios científicos responden a diferentes preguntas. Que los resultados coincidan según los criterios registrados no valida el método científico.

## Guardar y compartir el registro de verificación {/* #save-and-share-the-verification-record */}

1. Elige **Export verification record** y guarda el registro.
2. Reabrir el archivo descargado y comprobar qué archivo fuente, versión y resultado de comparación describe.
3. Retenga los archivos y versiones pertinentes de origen con ese registro. Antes de limpiar las salidas reproducidas, inspeccionar los controles de retención y guardar los archivos que necesita.

Para entregar las ramas de conversación, archivos y pruebas juntos, utilice un [Paquete de investigación .science](research-packages.md). Un registro suministrado por el remitente no significa que el ordenador receptor haya reeditado el cheque.

## Cuando un cheque no puede terminar {/* #when-a-check-cannot-finish */}

Inspeccione **Areas needing attention** y el primer mensaje de registro relevante. La pérdida de insumos, pruebas incompletas o operaciones no apoyadas pueden impedir la verificación. Los archivos RDS/H5AD grandes no se cargan para la comparación de contenidos; la ausencia de una comparación no establece una coincidencia.

v0.30.2 fija la reproducción de los insumos creados anteriormente en el mismo turno y soporta las importaciones estándar de la biblioteca Python, además de los puntos de entrada de la tubería de verificación Windows. Si una versión anterior se detuvo en uno de estos pasos, actualizar y reiniciar el mismo resultado capturado, entonces inspeccione el nuevo registro y comparación. Estas correcciones no suministran una cerradura de entorno perdido o hacen que cada carrera histórica sea rejugable.

Si la preparación depende de un estado Notebook anterior, inspeccione el [prueba de ejecución](notebook.md) y vuelva a ejecutar la preparación necesaria antes de generar un nuevo resultado. Mantenga controles parados o incompletos distintos de las comparaciones completadas.

Si ya tiene un paquete de bloqueo compatible y necesita restaurar paquetes fuera de la aplicación, siga el [tiempo de restauración condiciones](runtimes.md#conditional-restore). Ese procedimiento no crea una cerradura perdida o reemplaza la preparación anterior. Restablecer las dependencias por sí solas no establece que los productos se reproducen.

## Inspecciona la historia antes de rehacer {/* #replay-vs-verification */}

Utilice [Repetición de sesión](session-replay.md) para inspeccionar el orden grabado de mensajes, la actividad de la herramienta y las versiones de archivos. Replay muestra evidencia guardada con tiempo de presentación reconstruido; no reimprime código, consulta bases de datos de nuevo o establece que un resultado se reproduce. Utilice **Reproducibility** arriba cuando necesite una nueva comparación de ejecución y salida.
