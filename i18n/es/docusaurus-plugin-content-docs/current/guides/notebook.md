---
title: "Notebook y pruebas de ejecución"
last_update:
  date: '2026-10-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';


# Notebook y pruebas de ejecución {/* #notebook-and-execution-evidence */}

Utilice Notebook para inspeccionar el código ejecutado, ejecutar un comando en el kernel actual y seguir el trabajo de fondo. Para un archivo guardado, abra **Provenance** para inspeccionar la ejecución y la evidencia asociada con esa versión del archivo.

Antes de ejecutar Python o R, [habilitar un tiempo de ejecución compatible](runtimes.md). Para un ejemplo completo de análisis de datos, utilice el [flujo de trabajo público-datos](../workflows/data-quality.md).

<span id="open-the-session-notebook" />
<span id="open-the-producing-sessions-notebook" />
<span id="produce-an-artifact" />

<PlatformGuide />

## Abrir una sesión Notebook {/* #open-a-session-notebook */}

1. Abrir el proyecto y la conversación que contiene el cálculo que desea inspeccionar. Si usted está empezando de nuevo, pida al agente que ejecute un pequeño cálculo en el **Sesión Notebook** primero.
2. Seleccione **Open notebook**, o utilice el menú de conversación **View notebook**.
3. Seleccione la pestaña **Notebook** cuando una vista previa del archivo está activa.
4. Utilice **Agent** para elegir el propietario de la ejecución, luego **Python / R / Bash** para elegir el idioma.
5. Abra una carrera numerada y lea su estado de salida y finalización. Una actividad copiada etiquetada **code shown** contiene el código mostrado; inspeccionar la sesión original de producción para su historial de ejecución.

<PlatformContent platform="macos">

![Ejecución y salida Python en Notebook](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>

| Control | Medida | Resultado |
| --- | --- | --- |
| Agente | Seleccione Main o un agente infantil | Muestra los registros del propietario; agentes pueden tener núcleos separados |
| Idioma | Seleccione un idioma disponible | Cambia los registros y la consola; instalar idiomas desaparecidos en Runtimes |
| Corrida numerada | Seleccione una ejecución registrada | Abre su código, salida y estado |
| Copiar al portapapeles | Copiar código seleccionado | Mantiene caminos y dependencias externas como escritos |
| Ocultar salida / Mostrar salida | Colapso o ampliación de la salida | Cambia la vista sin reimprimir el código |
| ejecutar código en este kernel... | Introduzca y envíe código | Ejecuta en el kernel en vivo seleccionado |
| Cerrar / colapsar vista previa | Volver a la conversación | Mantiene historia de ejecución registrada |

Comprueba **Datos de entrada / Entradas** cuando esté presente. Coincide con el archivo y la versión mostrada a su solicitud. Si una referencia no está disponible, reabrir o adjuntar la entrada prevista a través de la aplicación antes de reintentar.

## Código de revisión antes de que funcione {/* #execution-review */}

Desde v0.36.0, el código Notebook presentado por el agente se revisa antes del envío. Las lecturas y análisis ordinarios apoyados proceden sin un aviso de riesgo adicional. Las operaciones que pueden hacer cambios irreversibles, o que no pueden ser analizadas por completo, requieren una decisión única. El código escrito directamente en la consola manual no está cubierto por este paso de aprobación del Agente; inspeccionarlo usted mismo antes de someterlo.

1. Cuando aparezca **Review risky code**, compruebe el medio ambiente y la operación que se solicita. El cálculo está esperando su decisión.
2. Seleccione **Line** junto a un hallazgo para inspeccionar su ubicación en el código completo. Compruebe los caminos, los archivos y comandos afectados, incluyendo cualquier operación que el análisis no podría resolver.
3. Si la acción es innecesaria o su objetivo es incorrecto, declive y pida al agente una revisión más segura. Aprobar una sola vez cuando se proponga la operación mostrada; la solicitud no otorga permiso permanente para el futuro código de riesgo.
4. Después de decidir, inspeccione la decisión registrada y el estado de ejecución Notebook. La aprobación por sí sola no es prueba de la terminación. Una solicitud rechazada no ejecuta ese código.

<p className="example-label"><strong>Ejemplo práctico</strong> Inspeccione una solicitud de proceso Python externa</p>

El cálculo ilustrado sólo agrega números, pero comienza otro intérprete a través de `subprocess.run`. Esa ejecución anidada no puede ser revisada por completo, por lo que la solicitud se detiene para su revisión. El aviso no significa que el código sea malicioso. Este ejemplo escoge **Deny**; la carrera se registra como interrumpida sin ejecutar el proceso del niño.

![Tarjeta de revisión Notebook con el medio ambiente, línea de fuente, Permitir una vez y Deny](/img/open-science/v0360/notebook-risk-review.webp)

Esta pantalla verifica el riesgo de ejecución; no valida el método o resultado estadístico. **Auto-review** y [Revisor](../specialists/reviewer.md) evalúan los trabajos completados por separado. v0.36.0 también mejora la captura de dependencia Python/R; use [Provenance y verificación de repetición](reproducibility.md) para comprobar las entradas y salidas reales de un resultado.

## Trabajar en el kernel en vivo {/* #work-in-the-live-kernel */}

### Ejecute un cheque en el kernel en vivo {/* #run-a-check-yourself-in-the-live-kernel */}

Seleccione **Python**, haga clic en **ejecutar código en este kernel...**, e ingrese el siguiente comando auto-contenido. No requiere conjunto de datos, paquete de terceros o variables de una conversación anterior:

```python
import sys
print("Python:", sys.version.split()[0])
print("Executable:", sys.executable)
```

Presione **Entra** para ejecutar; use **Shift+Enter** para una nueva línea. Descargue un menú de autocompleto abierto con **Escape** antes de enviar. Confirme una entrada **python · you** numerada y la información del intérprete en su salida. El ejecutable debe pertenecer al tiempo de ejecución que seleccionó.

Para R, seleccione **R** y envíe:

```r
cat(R.version.string, "\n")
cat("R home:", R.home(), "\n")
```

Inspeccione la entrada R registrada y su salida. Python y R tienen variables separadas. Un `NameError` o `object not found` generalmente significa que el objeto no se ha creado en ese núcleo; inspeccionar su código antes de reutilizar un comando de otra sesión.

Para un cheque trabajado del intérprete y los resultados guardados, abra [Horas de ejecución Python y R](runtimes.md) y seleccione **Windows** en la parte superior de la página.

<span id="variables-dependency-state-and-network-boundaries" />

### Inspeccionar variables en vivo {/* #inspect-live-variables */}

1. Seleccione **Inspect variables** después de una carrera que crea variables.
2. Lea **Name**, **Type**, **Size / Shape** y **Preview**.
3. Introduzca un nombre de su propio código en **Filter variables**. Para el ejemplo de captura de pantalla, `sha` filtra las variables de hash enumeradas; elegir un nombre que existe en su propio núcleo.
4. Utilice **Refresh variables** para leer el espacio de nombres actual, y **Show private variables** si el nombre que necesita está oculto.
5. Seleccione **Close** para volver al Notebook.

<PlatformContent platform="macos">

![Filtrar la lista variable por nombre](/img/open-science/guides-walkthrough/47-notebook-variable-filter.webp)

</PlatformContent>

Una vista previa puede abreviar un valor; imprimir el campo necesario en la consola para inspeccionarlo completamente. **Variable tracking is limited** significa que el gráfico de dependencia es incompleto. Para un resultado rastreado, **stale** indica que se ha cambiado la dependencia; **unknown** significa que la relación no puede ser establecida. Reaccione el código afectado antes de usar un resultado obsoleto.

### Continuar después de un cambio de núcleo {/* #continue-after-a-kernel-change */}

Cambiar o reconstruir un tiempo de ejecución puede detener su núcleo. Los archivos guardados y los registros de ejecución permanecen separados de las variables en memoria. Después del cambio, ejecute el control de intérpretes arriba, recrea las variables requeridas reelaborando su código de producción y reabrir los archivos guardados que necesite.

Utilice [Entornos de ejecución](runtimes.md#maintain-and-repair-environments) para la cancelación de configuración y reinstalación. Una reconstrucción de tiempo de funcionamiento, un reinicio normal del núcleo y la recuperación de un trabajo de fondo son diferentes operaciones; comprobar el estado de la operación relevante en lugar de asumir que restaurar el estado idéntico.

## Ejecute el mismo cheque de cuenta de genes en R {/* #run-the-same-gene-count-check-in-r */}

<p className="example-label"><strong>Ejemplo práctico</strong> Chequee los recuentos de genes GSE60450 en R</p>

1. [Instalar y activar R](runtimes.md#install-app-managed-r).
2. Adjuntar el [matriz original](../reference/example-data.md). Si se compara un resultado Python, adjuntar ese CSV a la misma conversación también.
3. Solicitar ejecución **Session Notebook → R** y los requisitos de entrada/salida en el [flujo de trabajo de calidad de los datos](../workflows/data-quality.md). Especifique la preservación de identificadores completos y un archivo de salida separado.
4. Si aparece **Change notebook runtime?**, confirme **Idioma: R** y el intérprete indicado. Compruebe el entorno en la solicitud posterior **Run R code?**.
5. Abra **Notebook → R**, lea el registro de ejecución, luego abra la figura e informe CSV.

<PlatformContent platform="macos">

![R muestra-QC de salida abierta en la aplicación](/img/open-science/guides-walkthrough/76-r-qc-table.webp)

</PlatformContent>

Compare métricas por el identificador de muestra completo usando el [Base de referencia compartida](../reference/example-data.md#sample-qc-baseline). Mantenga la fuente y registro original que métricas incluyen o excluyen los ceros. El QC de cuenta cruda prepara los datos para un análisis estadístico diseñado por separado.

### Mantener el resultado R y sus pruebas juntas {/* #keep-the-r-result-and-its-evidence-together */}

Abra el CSV de **Provenance → Execution Log → Download notebook**. Mantenga la exportación junto con su entrada y resultados. Una exportación para una versión de archivo puede omitir comandos de consola manual posteriores.

<PlatformContent platform="macos">

![Ambiente capturado para un resultado R](/img/open-science/guides-walkthrough/77-r-environment-evidence.webp)

</PlatformContent>

El inventario de paquetes Runtimes describe el entorno instalado; Provenance describe la evidencia ambiental capturada para un archivo particular. Lea los avisos de inventario de **partial** o caché en lugar de comparar los recuentos de paquetes como si fueran la misma lista.

## Tareas de antecedentes y ejecución de los resultados {/* #background-tasks-and-result-delivery */}

Pida la ejecución de antecedentes cuando una tarea de Python apoyada, R, REPL persistente o de cáscara debe continuar mientras trabaja en otro lugar. Incluya la entrada, salidas y condición de parada en la solicitud.

1. Después de la admisión, abra la entrada **Background tasks** de la conversación. Se agrupan las carreras locales y los trabajos remotos de Compute; una conversación sin tareas puede no mostrarlo.
2. Lea la identidad de tarea, el medio ambiente, el estado y el tiempo transcurrido.
3. Seleccione **Open** para inspeccionar el correspondiente trabajo de Notebook o Compute.
4. Para detener una tarea, seleccione su control **Cancel** y espere a que el estado se resuelva. Revise los archivos ya guardados antes de usarlos o desecharlos.
5. Después de la finalización, inspeccione el mensaje de resultado entregado y abra las salidas guardadas.
6. Después de la interrupción o de una aplicación reiniciar, inspeccione la tarea existente y cualquier mensaje de recuperación antes de enviar otra copia.

<PlatformContent platform="macos">

![Estado de la tarea de fondo y su control abierto](/img/open-science/v0.27.0/13-background-task-completed.webp)

</PlatformContent>

| Estado | Qué hacer para comprobar |
| --- | --- |
| Queued / Running | Medio ambiente y progreso seleccionados; trabajos de concha puede esperar a una ranura de ejecución |
| Cancelación / Cancelación | Ya sea que la cancelación todavía se procesa o se ha resuelto |
| Completado | Resultado de salida y archivos de salida guardados |
| Failed / Timed out / Interrupted | Primer error, salida retenida y acción de recuperación ofrecida |
| Resultado no disponible | Registro de trabajo y detalles de recuperación existentes |

Cerrar la lista de tareas deja la tarea en marcha. La terminación de un cálculo y la entrega de su mensaje de resultado son etapas separadas. Los trabajos remotos también necesitan las condiciones de host y agenda en [Computación remota](remote-compute.md).

<span id="open-provenance" />
<span id="execution-log" />
<span id="messages" />
<span id="environment" />
<span id="review" />

## Inspección de una versión guardada {/* #inspect-one-saved-versions-evidence */}

Abra un archivo guardado y seleccione **File actions → Provenance**, o **Open Provenance** en su vista previa ampliada. Confirme la versión seleccionada primero.

<PlatformContent platform="macos">

![Código productor capturado para un resultado guardado](/img/open-science/provenance-code.webp)

</PlatformContent>

| Tab o control | Úsalo para inspeccionar |
| --- | --- |
| Código | Captured product code, input references, copy/download and Generate script |
| Registro de ejecución | Registros de ejecución congelados para la versión seleccionada |
| Mensajes | Solicitudes y decisiones incluidas en el resultado |
| Entorno | Intérprete, información de paquetes y estado de captura; ver [Condiciones de restauración](runtimes.md#conditional-restore). |
| Reproducibilidad | Entradas capturadas, cheques de repetición, comparaciones de salida y registros de verificación. |
| Revisión | Valoración asociada con esta versión exacta del archivo |
| Anterior / Siguiente Versión de artefacto | Pruebas para otra versión guardada; indisponible cuando no existe |
| Cerrar procedencia | Volver a la vista previa |

| Label | Significado y siguiente acción |
| --- | --- |
| atado | Las pruebas retenidas abarcan un alcance limitado. Mantenga ese alcance con código y resultados exportados. |
| parcial | Falta o no se confirma información ambiental. El registro requiere dependencias antes de la reutilización externa. |
| No hay ninguna revisión para esta versión | Esta versión de archivo no tiene revisión asociada. Uso [Revisor](../specialists/reviewer.md) para entender la conversación y la revisión del artefacto. |
| Entorno en caché | El inventario fue reutilizado. Comprueba el intérprete/paquete real cuando el entorno cambia de materia. |

La edición de un informe crea otra versión de archivo; no reequilibra la computación que produjo un CSV separado. Ver [Archivos y versiones](files.md).

Para inspeccionar una reseña, seleccione **Review** para la versión requerida, amplíe sus cheques y utilice **Go to transcript** para inspeccionar la actividad citada. **No issues found** se aplica a esos cheques y esa versión; no llena la ejecución perdida o evidencia del medio ambiente. Si se interrumpió una revisión, abra su entrada **Review error** y elija **Re-run review**. Después de la finalización, vuelva a la pestaña **Review** del archivo y confirme el nuevo resultado. El intento fallido anterior puede permanecer visible en la conversación.

## Reproducibilidad {/* #reproducibility */}

Para rehacer un resultado capturado, compare los productos y guardar el registro de verificación, siga el [Guía de reproducción](reproducibility.md). Este capítulo abarca la ejecución de Notebook, la inspección de procedencia y la exportación de código.

## Código de exportación y reutilización {/* #export-and-reuse-code */}

Elija la exportación que coincida con su objetivo:

| Objetivo | Entrada | Índice |
| --- | --- | --- |
| Lea el código de productor registrado | **Code → Captured producer block → Download** | Fuente capturada con sus trayectorias y dependencias originales |
| Mantener las células Notebook registradas | **Execution Log → Download notebook** | Una exportación Notebook para el resultado/versión seleccionado |
| Preparar un script portátil | **Code → Generate script** | Una reconstrucción generada por modelos para inspeccionar y probar |

<PlatformContent platform="windows">

### Descargar código Python capturado en Windows {/* #download-captured-python-code-on-windows */}

1. Abra la versión prevista del informe guardado, luego **Provenance → Code**.
2. Bajo **Captured producer block**, elija **Download**. Compruebe el nombre de archivo `.py` y el destino en el cuadro de diálogo Guardar, a continuación, seleccione **Save**.
3. Abra el archivo guardado y compare con el código mostrado. En PowerShell, ejecutelo con el mismo intérprete de Python; use el operador de llamadas `&` antes de una ruta ejecutable citada.
4. Compare la salida con el Notebook y guarde el informe. Mantenga cualquier archivo de entrada requerido junto con el código.

<Screenshot src="/img/open-science/windows/captured-code-download.webp" alt="Windows capturó código de productor y su control de descarga" width={1920} height={1017} windowBounds={[1157, 0, 763, 416]} href="/docs/img/open-science/windows/captured-code-download.webp" linkLabel="Abra la pantalla Windows completa" />

Esto descarga el código registrado. **Generate script** es una operación de reconstrucción separada. Si la generación falla, mantenga su error completo; descargar el código capturado no significa que la reconstrucción haya tenido éxito.

</PlatformContent>

### Generar un script independiente {/* #generate-a-standalone-script */}

1. Abra el **Provenance → Code** de la versión prevista. Compruebe **Inputs** y **Execution Log**.
2. Seleccione un modelo predeterminado compatible en **Settings → Model → Main model**. Esta característica auxiliar utiliza esa política, que puede diferir de la selección de modelos de la conversación.
3. Seleccione **Generate script** y espere a que **Generating…** termine.
4. Lea la etiqueta **Reconstrucción generada por la LLM**. Compruebe las rutas de entrada, dependencias y lugares de salida antes de seleccionar **Download script**.
5. En el diálogo Guardar sistema, seleccione un directorio separado, compruebe el nombre de archivo `.py` y confirme **Save**. Abra el archivo guardado para confirmar que contiene el código mostrado.
6. Proporcione las entradas usando los nombres exactos esperados por el script, prepare sus dependencias, luego ejecute fuera de la aplicación. Compare los campos de salida y el checksum de entrada con el resultado guardado. Una descarga completa por sí sola no verifica el cálculo.

<PlatformContent platform="macos">

![Previsualización y control de descarga del script](/img/open-science/priority-completion/19-generated-script.webp)

</PlatformContent>

<p className="example-label"><strong>Ejemplo práctico</strong> Realizar el cheque RNA-seq exportado fuera de la aplicación</p>

Para un ejemplo ejecutable descargado, guarde el <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.py" download>script</a>, <a href="/docs/examples/gse60450/portable-script/remote-rnaseq-qc-f1e10edbdf01-f1e10edbdf01.csv" download>entrada CSV</a> y <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.json" download>esperada JSON</a> en una carpeta. En esa carpeta, ejecute `python3 GSE60450-portable-check.py`. El script utiliza la biblioteca estándar de Python. Renombrar el JSON descargado a `expected.json` antes de ejecutar: el script escribe `GSE60450-portable-check.json`. Compare ese archivo generado con `expected.json` antes de adaptar el script a nuevos datos.

### Descargar código cuando la generación de script no está disponible {/* #download-code-when-script-generation-is-unavailable */}

Si la aplicación devuelve **La reconstrucción del código de artefactos no está disponible con la autenticación de suscripción Codex.**, utilice un proveedor compatible para esta operación auxiliar o descargue el código de productor capturado. Este error se refiere a la reconstrucción del script, no la ejecución ordinaria Codex Notebook.

Para **RECONSTRUCTION_UNAVAILABLE**, inspeccione los insumos perdidos o las pruebas de ejecución. Un código de descarga capturado preserva el código disponible; no puede recuperar pasos que nunca fueron capturados.

### Exportar y reutilizar el Notebook registrado {/* #export-and-reuse-the-recorded-notebook */}

Seleccione **Provenance → Execution Log → Download notebook**, elija una ubicación y ahorre. Abra la exportación y compruebe su lenguaje, células y salidas.

Antes de una repetición externa, prepare los archivos de entrada, dependencias registradas y un directorio de salida de forma computarizada. Sustitúyase caminos gestionados por la aplicación sólo en una copia de trabajo, manteniendo intacta la exportación original. La exportación no agrupa las credenciales ni el entorno de aplicación completo. Las exportaciones de ejemplo están disponibles en [Datos de ejemplo](../reference/example-data.md).

<PlatformContent platform="windows">

Si una exportación Windows Notebook no tiene extensión, primero abra una copia como texto y confirme que contiene Notebook JSON con `nbformat`, `cells` y el código/output esperado. Preserve el original, luego da a la copia de trabajo una extensión `.ipynb`. Renaming cambia cómo otros programas abren el archivo; no convierte su contenido ni reedifica sus células.

</PlatformContent>

## Interpretar errores y advertencias {/* #interpret-errors-and-warnings */}

| Síntoma | Siguiente acción |
| --- | --- |
| Perdido variable | Reaccionar el código que lo define en el idioma seleccionado / canal |
| Paquete perdido | Inspeccione los paquetes de tiempo de ejecución y siga [Entornos de ejecución](runtimes.md) |
| Versión de entrada no disponible | Abrir o adjuntar la entrada actual prevista; resolver su identidad a través de la aplicación |
| PermissionError / acceso negado | Inspeccionar el alcance del archivo solicitado y el permiso; report persistent access failures using [Solución de problemas](troubleshooting.md) |
| Error de red/instalador | Seguir [Red](network.md) usando el nombre de host afectado y el error completo |
| Advertencia con una carrera completa | Lea lo que afecta la advertencia, entonces inspeccione la salida guardada antes de decidir si se repetir |

Al informar de un problema, mantenga la primera línea de falla, tiempo de ejecución seleccionado, identidad de archivo y estado de tarea. Enlace salvó la salida a su ejecución de producción real.
