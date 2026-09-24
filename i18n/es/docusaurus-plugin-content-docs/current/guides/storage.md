---
title: "Almacenamiento y trabajos archivados"
last_update:
  date: '2026-09-24'
---

# Almacenamiento y trabajos archivados {/* #storage-and-archived-work */}

Utilice **Settings → Storage** para inspeccionar la ubicación de datos gestionados y el uso de disco. Utilice **Settings → Archived** para organizar proyectos y sesiones inactivos. El archivo no mueve la raíz de los datos o promete la recuperación del espacio-disquete.

## Leer y refrescar el uso del disco {/* #read-and-refresh-disk-usage */}

![Almacenamiento gestionado real después de los ejemplos de investigación](/img/open-science/local-acceptance/storage-installed-location.webp)

Lea **Data location** antes de respaldar o diagnosticar un archivo perdido. Esta es la raíz gestionada de la aplicación, separada de una carpeta de fuente externa otorgada a un proyecto. El uso de **Refresh** reescans; verifique el tiempo de última elección antes de comparar las mediciones.

| Categoría | Lo que cuenta para | Interpretación |
| --- | --- | --- |
| Artefactos | Gestión de los resultados de investigación y sus datos retenidos | Un pequeño informe más reciente todavía puede tener versiones anteriores |
| Cargas | Copias de entrada administradas | La eliminación de un archivo de fuente externa no elimina esta copia |
| Entorno de ejecución | - Gestionar intérpretes y dependencias; amplíe para detalles | Por lo general más grande que un pequeño ejemplo de dataset |
| Notebooks | Almacenamiento de la ejecución de la sesión | Exportar un Notebook necesario antes de eliminar su propio trabajo |
| Evidencia de ejecución | Pruebas de versión capturadas | Diferente del kernel en vivo actual |
| Espacios de trabajo de sesión | Archivos de trabajo para conversaciones | No todos los archivos de trabajo se han convertido en un artefacto publicado |
| Compute cache / Espacios de trabajo Subagent | Datos de trabajo grabados o delegados | Lea la categoría actual antes de asumir que es desechable |
| Espacio total / disponible | Espacio total gestionado actual y libre de dispositivos | Medidas, no requisitos de instalación |

El uso de disco cambia con sus archivos y tiempos de ejecución. Inspeccione cada categoría antes de utilizar sus controles de gestión; una categoría de uso no implica que su contenido pueda ser eliminado de forma segura en una acción.

<span id="review-relocation-before-submitting" />

## Mover la ubicación de los datos {/* #move-the-data-location */}

### Antes de moverse {/* #before-moving */}

Finalizar tareas activas y mantener las exportaciones de insumos importantes, productos y registros de ejecución. Grabar la ubicación actual y los paquetes requeridos. Moving data no mueve todos los ajustes de aplicación o historia de conversación, que permanecen en la ubicación de configuración.

### Elija y envíe el destino {/* #choose-and-submit-the-destination */}

1. Seleccione **Change location** y lea el aviso de migración.
2. Seleccione **Continue** para abrir el formulario de destino.
3. Introduzca **New location**, utilice **Browse…**, o elija **Regrese a la ubicación predeterminada**.
4. Compruebe la fuente, el destino, el espacio disponible y el aviso de reconstrucción.
5. **Change location** presenta un movimiento válido; **Cancel** deja la ubicación actual sin cambios.

![Forma de reubicación con requerimientos de reconstrucción de tiempo de ejecución](/img/open-science/local-acceptance/storage-destination-form.webp)

La aplicación mueve los datos de investigación existentes. Los entornos Python/R son **reconstruido después de reiniciar, no copiado**. El caché de paquete compartido de tiempo de ejecución se copia para apoyar las reconstrucciones fuera de línea, pero los paquetes de pip- o CRAN-sólo no están garantizados para ser restaurados. No se puede predecir fiablemente el espacio de reconstrucción adicional. Recordar los requisitos de entorno/paquete antes de un movimiento real y probar el tiempo de funcionamiento necesario después.

### Compruebe el destino después de reiniciar {/* #check-the-destination-after-restart */}

1. Abrir **Settings → Storage** y confirmar **Location** es el destino elegido.
2. Reabrir un proyecto existente, su informe guardado y revisiones anteriores del informe. Compruebe la Biblioteca, colecciones, enlaces de proyectos y archivos adjuntos PDF también.
3. Abrir Notebook, inspeccionar el tiempo de ejecución disponible y recorrer un pequeño cálculo sólo lectura con una entrada existente. Una copia exitosa por sí sola no verifica el tiempo de ejecución reconstruido.
4. Mantenga los datos originales y las exportaciones hasta que estos cheques pasen. Compare el contenido de archivo retenido o las compruebas, y confirme las referencias, colecciones, enlaces de proyectos, archivos adjuntos y ajustes de citación. Guardar y reabrir un nuevo resultado para comprobar que la nueva ubicación es deseable.

Para un intérprete externo R, confirme que el ejecutable seleccionado todavía existe y que el Notebook permanece vinculado a él. Cargue los paquetes que necesita su análisis, reelabore un pequeño cálculo, y vuelva a abrir el resultado guardado. Un intérprete externo y sus paquetes existentes están separados del entorno gestionado por la aplicación que puede necesitar reconstrucción.

### Volver a la ubicación predeterminada {/* #return-to-the-default-location */}

1. Finalizar tareas activas, luego seleccione **Change location → Continue → Or move it back to the default location**.
2. Compruebe la fuente, destino predeterminado, espacio libre y aviso de recuperación de tiempo de ejecución. Presente y espere a **Data copied**.
3. Seleccione **Restart now**. Después de reiniciar, verifique **Settings → Storage → Location**. Si la copia tuvo éxito pero el cambio no lo hizo, use [recuperación de la migración](#the-data-copied-but-switching-failed).
4. Reabrir el proyecto original y guardar archivos. Chequeo controlado Python/R en **Runtimes**, utilice **Descarga y configuración** cuando sea necesario, y ejecute un pequeño cálculo de sólo lectura contra una entrada existente.

Después de regresar, reabrir un proyecto existente, introducir y guardar informe. Confirme el tiempo de ejecución gestionado está listo, luego ejecute un pequeño cálculo y ahorre un nuevo resultado. Reabrir para comprobar que la ubicación de datos predeterminada está en uso.

![Resultado R guardado reabrido después de regresar a la ubicación predeterminada](/img/open-science/local-acceptance/r-default-chart.webp)

Si aparece **Una carpeta diferente llamada OpenScience ya existe aquí. Elige otra ubicación.**, la aplicación bloquea la sobreescritura. Cancelar y preservar ese directorio. Establecer su propiedad, contenido y respaldo antes de resolver el conflicto; no simplemente eliminar una carpeta de la misma nombre. La migración de retorno sólo después de los pases de validación de destino.

### Los datos copiados, pero el cambio falló {/* #the-data-copied-but-switching-failed */}

**Data copied** confirma la copia y los cheques; **Restart now** todavía tiene que cambiar la ubicación de datos activa. Si reporta **No podía preparar la aplicación para cambiar los datos de forma segura. Por favor, inténtalo de nuevo.**, el movimiento no está completo. No redirija manualmente los caminos internos.

1. Retenga el error y ambas ubicaciones. Compruebe que el proyecto original y los archivos todavía se abren.
2. Reabrir **Change location**. Cuando se detecta una copia sin terminar, elija **Resolve unfinished move**.
3. **Finish move** intenta completar la copia existente. **Discard copy** abandona esa copia sin terminar mientras conserva la ubicación original. Lea el alcance de confirmación primero.
4. Si **Conversation storage needs attention** aparece, resuelva el movimiento sin terminar, elija **Retry**, y reabrir el proyecto original e informe.

![Opciones de recuperación para el movimiento de almacenamiento sin terminar](/img/open-science/local-todo-batch/46-storage-recovery-choice.webp)

Si la reiniciación del interruptor final falla repetidamente, termine el trabajo activo, deje de funcionar y vuelva a abrir la aplicación, luego vuelva a iniciar el movimiento. Si el error persiste, mantenga la ubicación original y recoja los detalles del fallo antes de hacer otro cambio.


## Archivar una sesión y traerla de vuelta {/* #archive-a-session-and-bring-it-back */}

Elija la sesión que usted tiene la intención de archivar y terminar o detener su trabajo activo primero. Mantenga una sesión completa separada si necesita comparar el estado restaurado.

1. Abra el menú de la fila de sesión y elija **Archive**.
2. Confirme que deja la lista de sesiones activa.
3. Abre **Settings → Archived**.
4. Bajo **Sessions**, identifique su título, proyecto y tiempo de archivo.
5. Seleccione la fila **Restore**.
6. Volver al proyecto y confirmar el período de sesiones está disponible de nuevo.

Elija el **Restore de filas** para restaurar una sesión archivada. La Restauración de nivel de ventana sólo cambia el diseño de Ajustes. Para un proyecto archivado, abra **Projects → Manage** para inspeccionar sus sesiones antes de restaurar o borrarlo.

## Archivo y restauración de un proyecto {/* #archive-and-restore-a-project */}

1. En casa, abra las acciones de la tarjeta de proyecto y elija **Archive**.
2. Abrir **Settings → Archived → Projects**, luego la fila **Manage** del proyecto.
3. Lea el proyecto y la lista de sesiones. Las sesiones pueden mostrar **Oculto porque su proyecto está archivado** sin ser archivadas individualmente.
4. Elige **Restore project**.
5. Reabrir el proyecto, su conversación y un informe guardado.

![Gestión del proyecto GSE60450 archivado](/img/open-science/local-todo-batch/34-archived-project-manage.webp)

Reabrir un informe guardado y sus revisiones después de la restauración. Archiving organiza el proyecto; no reimprime el análisis ni elimina la historia de la versión del informe.

<span id="delete-a-disposable-project" />

## Eliminar permanentemente un proyecto {/* #permanently-delete-a-project */}

**Delete project** abre una confirmación de eliminación permanente. Lea su alcance antes de confirmar: los artefactos gestionados y las subidas están separados de los archivos externos de trabajo-carpeta, que no se eliminan. Compruebe qué tareas y núcleos se detendrán y qué espacios de trabajo gestionados de sesión permanecen en Almacenamiento. Archivar y borrar tienen diferentes resultados.

![Alcance de eliminación para un proyecto vacío creado por separado](/img/open-science/local-todo-batch/35-disposable-project-delete.webp)

Utilice un proyecto desechable vacío si está aprendiendo el flujo de eliminación. Inspeccione los registros afectados de la confirmación antes de borrar un proyecto que contenga investigación.

## Operaciones de eliminación distinguidas {/* #distinguish-removal-operations */}

| Operación | Recoverability and effect |
| --- | --- |
| Desanclar | Cambios en la colocación del período de sesiones únicamente |
| Archivo | - organización reversible; trabajo retenido aparece en Archivado |
| Restaurar | Devuelve el artículo archivado para usar; no reimprime la investigación |
| Retire una beca de carga de fuente | Modifica el acceso a una carpeta externa; no la eliminación de esa carpeta |
| Suprímase el proyecto/sesión | Eliminación permanente después de la confirmación de la solicitud; leer los registros o ficheros afectados antes de proceder |
| Literatura → Muévete a la basura | Un ciclo de vida de referencia-biblioteca separado; restaurar allí, no en Archivado |

Antes de la eliminación permanente, exporte los insumos, salidas y registros de ejecución que necesita retener. Comprueba si otro trabajo todavía los hace referencias, y cancela si la confirmación incluye contenido que desea conservar.

## Si el almacenamiento o la recuperación falla {/* #if-storage-or-recovery-fails */}

Para una descarga fallida, compruebe el destino elegido y el espacio libre. Para un archivo gestionado no disponible, confirme la ubicación y perfil de datos seleccionados antes de crear un proyecto de reemplazo. Para los paquetes perdidos después de la reubicación, compruebe el tiempo de ejecución reconstruido en lugar de asumir datos de investigación se perdió. Utilice [Solución de problemas](troubleshooting.md) para recoger la primera información útil de error y versión.

Fuentes: [Panel de almacenamiento](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StoragePanel.tsx), [formulario de migración](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StorageMigrationModal.tsx). [Controles de reubicación de la biblioteca](https://github.com/aipoch/open-science/commit/d00c722d).

## Recuperar datos después de una actualización {/* #historical-data-location */}

Una ubicación de datos guardados existente tiene precedencia. Para una instalación más antigua completa sin una ubicación explícita guardada, Open-Science conserva la ubicación histórica y ahorra esa opción. Si esa carpeta guardada no está disponible, vuelva a conectarla antes de reiniciar. Si múltiples ubicaciones históricas contienen datos de investigación, la aplicación le pide que seleccione o recupere la carpeta original en lugar de elegir silenciosamente uno. Mantenga ambas copias hasta que haya comprobado sus proyectos y archivos; no crear una nueva ubicación vacía para resolver una pérdida aparente de datos.
