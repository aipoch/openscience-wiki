---
title: "Paquetes de investigación .science"
description: "Exportar una sesión con sus archivos y pruebas, luego importar e inspeccionar el registro de investigación en otro proyecto."
last_update:
  date: '2026-10-27'
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

## Verifique la versión del destinatario {/* #package-compatibility */}

Los paquetes exportados por **v0.33.0** incluyen metadatos **RO-Crate 1.1** en `ro-crate-metadata.json`. Describe la instantánea final exportada y los archivos inmutables seleccionados, incluyendo nombres de archivo, tipos de medios y sus relaciones. Re-exporta esas referencias para la nueva instantánea.

Utilice **v0.33.0 o un lector compatible más tarde** para abrir estas nuevas exportaciones: declaran la capacidad necesaria de `ro-crate`. Actualizar una aplicación receptora anterior antes de importar; renombrar o eliminar los metadatos no es una solución de compatibilidad. Los paquetes antiguos existentes siguen siendo legibles sin migración.

Este metadato viaja dentro del paquete `.science`. No reequilibra los cálculos, otorga credenciales o reemplaza el [verificación de la reproducibilidad en una versión del artefacto](reproducibility.md).

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

En la página **New conversation** vacía de un proyecto, elija **Importar investigación anterior** y seleccione un archivo `.science`, o arrastre el archivo en esa página. Adjuntar un archivo a una conversación existente no es el flujo de importación de paquetes de investigación. Revise el proyecto objetivo y el contenido en la vista previa de importación, confirme y espere a que se complete antes de abrir el registro de sólo lectura.

![Importar investigación previa en la página de conversación vacía](/img/open-science/v0341/package-entry.webp)

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

## Ajuste la velocidad de transferencia y siga el progreso de los antecedentes {/* #transfer-settings */}

Antes de exportar, elija **Customize contents → Transfer settings**. Durante una exportación o importación, expanda **Detalles de la transferencia**. Establecer **Límite de actividad del disco** a **Auto** para el ajuste automático o elegir un límite fijo. Los límites inferiores reducen la actividad del disco y tardan más. Las lecturas y escritos comparten este límite; no es una velocidad de carga de Internet.

Elija **Run in background** para continuar la operación con el diálogo oculto. Reabrir detalles de la entrada de progreso de fondo en la ventana para inspeccionar el archivo actual, progreso y actividad de disco. Esperar la terminación antes de comprobar el archivo exportado o abrir la sesión importada.

![Limite de actividad de disco en la configuración de transferencia de paquetes de investigación](/img/open-science/v0333/package-transfer.webp)

## Cuando la exportación marca contenido sensible {/* #sensitive-export */}

Si la exportación se detiene en el control de contenido sensible, amplíe **Evidencia de contenido sensible** e inspeccione los archivos marcados. Eliminar las credenciales o el material privado de la fuente, y luego comenzar una nueva exportación cuando no deben ser compartidos.

Si el material marcado es parte intencionalmente de una entrega autorizada, la exportación fallida ofrece **Comprendo el riesgo y quiero exportar de todos modos**, seguido por **Exportar de todos modos**. Esto incluye el contenido marcado **sin la redacción**; no es un filtro de privacidad. El reconocimiento pertenece a ese intento de exportación y debe ser seleccionado de nuevo después de un fracaso. Revise el paquete resultante antes de compartirlo. Para resolver problemas en su lugar, use [Exportar diagnósticos](troubleshooting.md#session-diagnostics).

## Cancelar o reiniciar una transferencia {/* #cancel-or-retry-a-transfer */}

**Run in background** esconde la ventana de progreso mientras la transferencia continúa. Use **Cancel** para detenerse; ocultar la ventana no cancela la operación.

Si la limpieza es incompleta, use **Retry cleanup** antes de intentarlo de nuevo. Después de un fallo, **Try again** vuelve a registrar el mismo archivo y destino. Elige otro paquete por separado si esa es tu intención. Compruebe la operación existente antes de comenzar una segunda importación, a continuación, inspeccione la sesión importada y los archivos cuando se complete.

## Replay a received research record {/* #replay-import */}

Después de que la importación termine, elija **View replay** para inspeccionar los pasos registrados o **Discuss** para preguntar sobre ellos en una conversación ridícula. La fuente importada sigue siendo de sólo lectura. Una referencia de discusión no recrea su tiempo de ejecución original; use **Fork to continue** para una copia de trabajo. Ver [Repetición de sesión](session-replay.md).

## Importar en un nuevo proyecto {/* #new-project-import-recovery */}

Si una versión anterior falla al adoptar un paquete en el catálogo de un nuevo proyecto, actualice a v0.37.0 o posterior, inspeccione si el destino ya existe, y utilice la acción de recuperación del diálogo de importación antes de iniciar otra importación. Compruebe la sesión y los archivos resultantes. La solución no hace que las sesiones importadas sean útiles: use **Fork** para continuar el análisis.

## Importar un paquete de un sitio web {/* #browser-import */}

Utilice una aplicación de escritorio instalada en la **mismo ordenador** como el navegador. El sitio web debe ofrecer la transferencia de paquetes Open-Science; un enlace de descarga ordinario por sí solo no lo proporciona.

1. En una página de paquete de confianza, seleccione su acción de importación/abierto de Open-Science. Permite que el navegador abra la aplicación de escritorio. Si se le pide acceso a redes locales, concédelo sólo al sitio que desea utilizar.
2. Mantenga la página abierta mientras la aplicación muestra **Receiving package…** y **Validating package…**. Un mensaje de recibo del sitio web sólo confirma la entrega a la aplicación.
3. En la aplicación, revise el paquete, seleccione el proyecto de destino y confirme la importación. Esperar la terminación, luego abrir la sesión importada.
4. Inspeccione sus archivos y pruebas. El registro de investigación sigue siendo sólo leído; uso **Fork to continue** para nuevas investigaciones. Editar su título no hace que la investigación importada sea obligatoria.

Si el handoff no está disponible o bloqueado, descargar el `.science` archivar y utilizar el control de importación existente. También puede dejarla en casa del proyecto. Una carpeta normal caer en el Compositor no importa un paquete. Si una importación reporta un fracaso parcial, compruebe el destino para una sesión existente antes de reintentar; no cree otro proyecto sólo para repetir la misma transferencia.

Para los autores del sitio web, [guía SDK navegador-import](https://github.com/aipoch/open-science/blob/v1.0.2/packages/open-science/BROWSER_IMPORT.md) requiere HTTPS (o un origen de desarrollo de loopback), un manual de escritorio del mismo ordenador y un paquete no vacío no superior a 2 GiB. La recepción local nunca reemplaza la confirmación final de importación del usuario.

## Utilice paquetes de la aplicación CLI o web local {/* #local-package-transfer */}

Desde v1.0.3, el CLI y la aplicación web local autenticada pueden utilizar paquetes de sesión. En la aplicación web local, utilice los controles de exportación de sesiones o importación en proyectos y proporcione una ruta en el ordenador que ejecute el servicio cuando se le solicite. Las sesiones web remotas no pueden usar transferencia de paquetes arbitrarios. El desvío de sitio web a escritorio arriba es un flujo separado.

Para el CLI, inicie el perfil local previsto primero y espere hasta que la sesión de origen esté ociosa. Sustitúyase los IDs y caminos a continuación por su cuenta:

```bash
open-science session export SESSION_ID --project PROJECT_ID --output ./session.science --json
open-science session import ./session.science --new-project "Restored research" --non-interactive --json
```

La exportación requiere un explícito `.science` ruta de salida. La importación requiere **--non-interactive**, que confirma la vista previa en su nombre: inspeccionar el origen del paquete y destino previsto primero. Elija **--project** para un proyecto existente o **--new-project** para uno nuevo, nunca ambos. Omitir ambos crea un proyecto usando el nombre del proyecto del paquete. El plazo de solicitud predeterminado es de una hora; ajustar **--timeout-ms** para una transferencia grande.

Compruebe el camino guardado o la sesión importada en el resultado. La investigación importada sigue siendo sólo lectura; uso **Fork** para continuar. En v1.0.4, la exportación también fija una espera que podría permanecer después de seleccionar la ubicación de guardado.
