---
title: "Paquetes de investigación .science"
description: "Exportar una sesión con sus archivos y pruebas, luego importar e inspeccionar el registro de investigación en otro proyecto."
last_update:
  date: '2026-09-20'
---

# Paquetes de investigación .science {/* #science-research-packages */}

Un paquete de investigación de **.science** trae las ramas de conversación, archivos y evidencia registrada juntos para un traspaso. Un colega puede importarlo en un proyecto e inspeccionar el historial de investigación. Las sesiones importadas son de sólo lectura. Desde v0.31.0, utilice **Fork** en la aplicación de escritorio para crear una copia computarizada y continuar la investigación.

## Elija qué compartir {/* #choose-what-to-share */}

| Lo que el destinatario necesita | Exportación a uso |
| --- | --- |
| Leer o editar el texto de la conversación | [Conversación PDF o Markdown](sessions.md). |
| Usar archivos originales seleccionados | [Descargas de archivos o un artefacto ZIP](files.md). |
| Inspeccione las ramas de conversación, archivos y evidencia juntos | A `.science` paquete de investigación. |

Un paquete puede contener materiales de investigación subidos, texto de conversación y resultados generados. Revise su contenido antes de compartir. Es una copia independiente: eliminar el trabajo local no elimina los paquetes ya enviados a otros.

Las conversaciones Side Chat, [marcadores de lectura](bookmarks.md) privado y sus notas están excluidas del paquete. Ponga información que el destinatario necesita en un informe guardado o en la conversación antes de exportar.

## Exportar un paquete de investigación {/* #export-the-session */}

1. Terminar o dejar de trabajar en la sesión. Abra su menú y elija **Export → Export Session package**.
2. Revise el alcance de la exportación y cualquier contenido omitido o límites de tamaño.
3. Confirme la exportación y guarde el archivo `.science` a la carpeta deseada.
4. Siga el progreso hasta que se complete, luego utilice **Show in folder** para localizar el archivo.

| Opción de exportación | Cómo elegir |
| --- | --- |
| Exportación esencial | Mantener los metadatos de registro y literatura esenciales; omitir la literatura opcional PDFs. |
| Exportación completa | Incluya la literatura disponible PDFs y el contenido adicional mostrado en la vista previa. |
| Personalizar contenido | Seleccione PDFs de literatura individual, archivos opcionales y versiones; Quedan incluidas las pruebas necesarias. |

Los metadatos de literatura siempre están incluidos. Si una literatura PDF es necesaria evidencia, **Essential export** no está disponible; use **Full export** o **Customize contents** y retenga el archivo requerido. El exportador no recupera textos completos perdidos. Verifique los PDFs y el tamaño de la lista antes de confirmar; **Full export** no elimina cada tamaño o límite de contenido.

<p className="example-label"><strong>Ejemplo práctico</strong> Entregar una muestra de sesión QC</p>

Las siguientes pantallas utilizan una sesión que resume el [GSE60450 muestra tabla QC](../reference/example-data.md). En la vista previa de exportación, compare **Essential export** y **Full export**, inspeccionar el tamaño estimado, luego elegir **Export**. El contenido y el tamaño dependen de su sesión.

![Previsualización de exportación de paquetes de investigación con exportación esencial, exportación completa y contenido personalizado](/img/open-science/feature-guides-2026-09/research-package-export.webp)

## Importar en un proyecto {/* #import-and-inspect-a-package */}

1. Abra el menú de destino y seleccione **Import Session package…**, o suelte un archivo `.science` en ese proyecto. Abrir un archivo asociado le pide directamente que elija el proyecto de destino.
2. Revise la vista previa del paquete, el destino y el contenido incluido o omitido, a continuación, confirme la importación.
3. Espera a completar y elegir **Open imported Session**.
4. Inspeccione las ramas de conversación y abra los archivos necesarios para la entrega. Comprueba que puedes encontrar las entradas y los resultados relevantes para tu próxima tarea.

## Use el registro de investigación recibido {/* #use-the-received-research-record */}

La sesión importada en sí misma se mantiene sólo lectura. En el escritorio, abra su menú de sesión y elija **Fork**. Espere a **Fork completed**, abra la nueva sesión, e inspeccione sus archivos heredados antes de enviar un seguimiento. La fuente no ha cambiado; el código no se ejecuta automáticamente. Vea [Preparar un período de sesiones en curso](sessions.md#fork-session) para los pasos y cheques. El uso importado está excluido de los totales de actividad local.

Un registro de verificación recibido describe los cheques suministrados por el remitente. Esto no significa que este equipo haya vuelto a ejecutar las comprobaciones. Lea la versión del archivo, los criterios de comparación y el resultado; ver [Reproducibilidad](reproducibility.md) para cómo funcionan esos cheques.

## Cancelar o reiniciar una transferencia {/* #cancel-or-retry-a-transfer */}

**Run in background** esconde la ventana de progreso mientras la transferencia continúa. Use **Cancel** para detenerse; ocultar la ventana no cancela la operación.

Si la limpieza es incompleta, use **Retry cleanup** antes de intentarlo de nuevo. Después de un fallo, **Try again** vuelve a registrar el mismo archivo y destino. Elige otro paquete por separado si esa es tu intención. Compruebe la operación existente antes de comenzar una segunda importación, a continuación, inspeccione la sesión importada y los archivos cuando se complete.
