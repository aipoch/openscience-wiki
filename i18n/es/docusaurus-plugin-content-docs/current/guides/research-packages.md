---
title: "Paquetes de investigación .science"
description: "Exportar una sesión con sus archivos y pruebas, luego importar e inspeccionar el registro de investigación en otro proyecto."
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

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

Este ejemplo en Open-Science v0.31.1 exporta una sesión que resume el [GSE60450 muestra tabla QC](../reference/example-data.md), lo importa en otro proyecto en el mismo Mac, y continúa desde un Fork usando **Codex subscription**. Iniciar con la sesión completa que contiene `gse60450-qc-summary.csv`; la tabla de entrada por sí sola no es el paquete de investigación.

Elija **Essential export**, compruebe el contenido y el tamaño estimado, luego **Export**. La vista previa estimada de esta sesión **805.6 KiB**. Espere a **Package operation completed** antes de importar el archivo guardado; el tamaño de su sesión difiere.

![Opciones de exportación y tamaño estimado del período de sesiones](/img/open-science/v0311/package-export.webp)

## Importar en un proyecto {/* #import-and-inspect-a-package */}

1. Abra el menú de destino y seleccione **Import Session package…**, o suelte un archivo `.science` en ese proyecto. Abrir un archivo asociado le pide directamente que elija el proyecto de destino.
2. Revise la vista previa del paquete, el destino y el contenido incluido o omitido, a continuación, confirme la importación.
3. Espera a completar y elegir **Open imported Session**.
4. Inspeccione las ramas de conversación y abra los archivos necesarios para la entrega. Comprueba que puedes encontrar las entradas y los resultados relevantes para tu próxima tarea.

Por este ejemplo, seleccione el proyecto de destino **Public Genomics Examples**. La lista de vista previa de importación **Sucursal 1, mensajes 3 y archivos 13**. También dice que se excluyen las credenciales de la cuenta, las subvenciones de permiso y las identidades de continuación del proveedor. Compruebe estos detalles antes de seleccionar **Import**.

![Previsualización del paquete QC antes de importar en el proyecto de destino](/img/open-science/v0311/package-import-preview.webp)

Abra la sesión importada y su resumen CSV. El aviso **Imported research history** confirma que esta copia es sólo de lectura y no puede ejecutar código o continuar una conversación directamente.

![Registro QC importado con su resumen heredado y Fork para continuar botón](/img/open-science/v0311/package-import-readonly.webp)

## Use el registro de investigación recibido {/* #use-the-received-research-record */}

1. Seleccione **Fork to continue** en la sesión importada, o **Fork** en su menú de sesión. Espera a **Fork completed** y abre la nueva sesión. El código no funciona automáticamente.
2. Inspeccione el resumen heredado, elija un modelo disponible y confirme que el tiempo de ejecución Python está listo. Este ejemplo usó **Codex subscription / gpt-5.6-sol**. Las credenciales y permisos importados no proporcionan autorización en la instalación receptora.
3. Envíe el siguiente aviso. Si aparece una aprobación Python, inspeccione el cálculo solicitado y apruebe que continúe.

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. Abre ambos nuevos archivos. Esta ejecución devolvió muestras **12**, un total de cuenta cruda de **269027617**, y una media de **22418968.08333333333333333333**. La media resume la tabla QC suministrada; no es una expresión normalizada o un resultado de la expresión diferencial.

![Fork completado y los nuevos archivos de cálculo creados con Codex](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">Resumen heredado</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">Nuevo cálculo</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">Notas de cálculo</ExampleDownload>

Los dos archivos nuevos se guardan en el Fork; los archivos de resumen de la sesión original y de la sesión importada permanecen sin cambios. Consulta [Crear un Fork de una sesión existente](sessions.md#fork-session). El uso importado queda excluido de los totales de actividad local.

Un registro de verificación recibido describe los cheques suministrados por el remitente. Esto no significa que este equipo haya vuelto a ejecutar las comprobaciones. Lea la versión del archivo, los criterios de comparación y el resultado; ver [Reproducibilidad](reproducibility.md) para cómo funcionan esos cheques.

## Cancelar o reiniciar una transferencia {/* #cancel-or-retry-a-transfer */}

**Run in background** esconde la ventana de progreso mientras la transferencia continúa. Use **Cancel** para detenerse; ocultar la ventana no cancela la operación.

Si la limpieza es incompleta, use **Retry cleanup** antes de intentarlo de nuevo. Después de un fallo, **Try again** vuelve a registrar el mismo archivo y destino. Elige otro paquete por separado si esa es tu intención. Compruebe la operación existente antes de comenzar una segunda importación, a continuación, inspeccione la sesión importada y los archivos cuando se complete.
