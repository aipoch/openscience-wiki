---
title: "Crear un Skill y sus archivos de soporte"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Crear un Skill y sus archivos de soporte {/* #create-a-skill-and-its-supporting-files */}

Convierta un cheque RNA-seq repetido en un método reutilizable usando el [public example input](../reference/example-data.md). Este método comprueba los recuentos brutos; no realiza pruebas diferenciales-expresión.

Los ejemplos utilizan dos nombres de paquetes independientes:

| Ruta de creación | ID Skill guardado | Reutilizarlo con |
| --- | --- | --- |
| **Save as skill** de una conversación completa | `rnaseq-descriptive-qc` | Seleccione que publicó Personal Skill en una nueva conversación |
| Paquete manual a continuación | `rnaseq-count-qc` | Seleccione el Skill creado manualmente con ese ID exacto |

Siga la ruta a través de la publicación, búsqueda y reutilización. Use el nombre que usted realmente salvó; los dos IDs no son alias. Si renombra un paquete, utilice su nueva identidad guardada en la siguiente solicitud.

## Elija una ruta de creación {/* #choose-a-creation-route */}

| Punto de partida | Use esta entrada | ¿Qué pasa? |
| --- | --- | --- |
| Una conversación completa contiene un procedimiento que vale la pena repetir | Conversación **+ → Save as skill** | El agente destila la rama activa y utiliza Customize / Skill Creator para preparar un paquete reutilizable. |
| Quieres describir un nuevo método conversando | Configuración **Add skill → Chat with agent**, **Customize** | Trabajar con el agente para redactar el método e inspeccionarlo antes de la publicación. |
| Ya tiene instrucciones y archivos de soporte | Configuración **Add skill → Write from scratch** | Introduzca el paquete directamente utilizando el editor a continuación. |
| Ya tienes un paquete o repositorio. | **Actualizar habilidades / Importación de GitHub / Importar habilidades instaladas** | - Inspección e importación de los recursos existentes; ver [Gestionar Skills](./manage.md). |

## Guardar como habilidad: convertir una conversación completa en un método {/* #save-as-skill-turn-a-completed-conversation-into-a-method */}

Use esto después de que un procedimiento repetible haya funcionado —por ejemplo, comprobar una matriz de cuenta RNA-seq cruda, preservar sus identificadores, calcular las métricas de muestra y reabrir las salidas. **Save as skill** utiliza el **rama de conversación activa**, incluyendo su objetivo, herramientas, pasos y correcciones del usuario. Pide al agente que extraiga el procedimiento reutilizable, no copie la transcripción. Si la rama no tiene un procedimiento resuelto que valga la pena reutilizar, el agente puede explicarlo y parar sin crear un Skill.

1. Abra la conversación relevante y seleccione la rama que contiene el procedimiento que desea mantener.
2. Terminar la respuesta actual y cualquier trabajo subagente. Resolver aprobaciones pendientes, giros interrumpidos o errores de sesión. La rama debe terminar con una respuesta completa del Agente.
3. Abre el **+ menu → Save as skill** del compositor. Sobre un artículo con discapacidad para leer su razón específica.
4. El artículo cambia a **Saving as skill…** mientras el agente trabaja. Esto comienza una operación asistida por modelos en la conversación; no abre el editor manual de Nombre/Descripción o guarda instantáneamente un ZIP.
5. Inspeccione el nombre de Skill propuesto, descifrando la descripción, pasos, archivos de soporte y resultado de validación. Responder a las aprobaciones de aclaración o operación si se muestra. **Customize** se mantiene habilitado; el papel activo debe tener todavía el acceso adecuado a la capacidad.
6. Revise el proyecto antes de aceptar la publicación. Eliminar las trayectorias específicas del estudio, los ID temporales, las credenciales y las conclusiones no apoyadas; retener los requisitos de entrada reutilizables y los cheques. Un Skill personal existente no debe ser sobrescrito sin una decisión explícita de sustitución.
7. Después de la publicación, abra **Resource center → Skills**, busque el nombre reportado e inspeccione **Files**, la disponibilidad de SKILL.md y Main Agent. Exportarlo si necesita comprobar el paquete completo.
8. Ejecute una solicitud separada con el Skill salvado. Un paquete guardado con éxito no es prueba de que un segundo conjunto de datos o una invocación posterior ha pasado.

### Guardar el método de investigación {/* #save-the-research-method */}

<p className="example-label"><strong>Ejemplo práctico</strong> Guardar un método RNA-seq como Skill</p>

Después de completar GSE60450 QC en una nueva sesión, seleccione **+ → Save as skill** y solicite un paquete **rnaseq-descriptive-qc** separado, preservando los paquetes existentes. El flujo de trabajo nativo creó un borrador que contenía un **SKILL.md**. La validación no devolvió errores ni advertencias.

![Native Skill resultado de borrador y validación](/img/open-science/v0.27.0/16-native-skill-draft-validated.webp)

Verifique el nombre, descifrando la descripción, las entradas, las definiciones métricas y las condiciones de parada antes de confirmar la publicación a Personal Skills. Luego utilice **Resource center → Skills → Search skills**, abra las instrucciones guardadas, e inspeccione **Availability** y **Files**. Descargar el <ExampleDownload path="/examples/capabilities/rnaseq-descriptive-qc/SKILL.md">SKILL.md</ExampleDownload> publicado.

![Publicación nativa encontrada en Personal](/img/open-science/v0.27.0/17-native-skill-published.webp)

![Instrucciones y disponibilidad reabiertos](/img/open-science/v0.27.0/18-native-skill-instructions.webp)

### ¿Por qué el botón no está disponible {/* #why-the-button-is-unavailable */}

La punta de la herramienta identifica la primera condición de bloqueo. Arreglarlo puede revelar una segunda condición. **Espera a que termine la actividad de agente actual.** puede aparecer cuando la sesión no es ociosa, incluyendo un estado de error; no es una promesa confiable que esperar solo resolverá el problema. Inspeccione cualquier banner de error y la interacción pendiente en la conversación. Para una respuesta interrumpida, resuelva o reanude esa respuesta usando la acción ofrecida de la aplicación, luego espere la terminación antes de guardar el método.

| Exact tooltip | Qué hacer para comprobar |
| --- | --- |
| Abra una conversación antes de guardarla como un Skill. | Abra una conversación existente con el procedimiento que necesita. |
| El personaliza Skill no está disponible para el Specialist. | Inspeccione el papel activo y su acceso a la capacidad. Personalizar las estancias habilitadas a nivel mundial; esta herramienta se refiere al Specialist actual. |
| Espera a que la historia de la conversación termine de cargar. | Deje que la rama seleccionada termine la carga. |
| Cerrar chat lateral antes de guardar esta conversación como un Skill. | Preserve consejos útiles primero. Confirmación [Cerrar chat lateral](../guides/delegation.md) lo detiene y elimina su conversación guardada; luego regresa a Main. |
| Espere a que finalicen todos los subagentes. | Inspeccionar las tareas pendientes de los niños y sus aprobaciones. |
| Guardar como la habilidad está funcionando. | Lea el funcionamiento de la creación existente; no empieces con otra. |
| Resuelva primero la operación de sesión actual. | Terminar la recuperación, replay/reset contextual pendiente, bucle de corrección o compactación. |
| Espera a que termine la actividad de agente actual. | Resolver la labor activa, una interacción pendiente o una sesión de no identificación/error; inspeccionar el estado real. |
| Resolver primero el error de sincronización de la rama de conversación. | Resolver el error de sincronización mostrado antes de reintentar. |
| La historia de las ramas de conversación no está disponible. | - Reabrir la rama prevista; preservar el error si su historia no puede cargar. |
| Espera una respuesta completa del agente. | La rama debe terminar con una respuesta completa; una rama vacía o un mensaje final del usuario es insuficiente. |

La recuperación y las operaciones pendientes del período de sesiones aún pueden bloquear la acción; use la razón mostrada en lugar de comenzar una nueva solicitud de creación repetidamente. Están separadas de la autenticación del servicio: si la ejecución de la creación comienza pero la solicitud del modelo falla, siga el error devuelto del modelo/servicio en [Solución de problemas](../guides/troubleshooting.md).

## Escribe desde cero: crea en el editor {/* #write-from-scratch-create-in-the-editor */}

Utilice **Write from scratch** cuando ya tenga instrucciones de método y archivos de soporte. Los pasos a continuación usan `rnaseq-count-qc`.

### Prepare el paquete {/* #prepare-the-package */}

<p className="example-label"><strong>Ejemplo</strong> Crear el paquete rnaseq-count-qc</p>

Descargue el <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/SKILL.md">SKILL.md</ExampleDownload> y <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/references/sample-metric-schema.md">sample-metric-schema.md</ExampleDownload>, o el <ExampleDownload path="/examples/capabilities/rnaseq-count-qc.zip">ZIP exportado</ExampleDownload>.

```text
rnaseq-count-qc/
  SKILL.md
  references/
    sample-metric-schema.md
```

La referencia define las métricas de la muestra y su interpretación. Mantener datos de estudio en el proyecto; use el Skill para reglas reutilizables en lugar de incrustar un conjunto de datos privado en un paquete portátil.

<span id="create-and-publish" />

### Completar los campos y publicar {/* #complete-the-fields-and-publish */}

1. Abre **Resource center → Skills → Add skill → Write from scratch**.
2. Pruebe el SKILL.md completo en **Skill body**. Su caseta YAML pobla **Name** y **Description**.
3. Confirme el nombre es `rnaseq-count-qc`. Lea el contenido del cuerpo/retorno antes de guardar; un nombre válido por sí solo no valida el método científico.
4. Abra **Advanced settings → Add reference files** y seleccione `sample-metric-schema.md`. El editor coloca este recurso bajo `references/`.
5. Verifique el recuento de referencia y el tamaño del paquete, luego seleccione **Publish**.
6. Busca la nueva fila Personal y reabrígela. Confirme las instrucciones, disponibilidad y archivos; exportar el paquete para inspeccionar ambas entradas.

![RNA-seq Skill cuerpo y archivo de soporte](/img/open-science/capabilities-walkthrough/01-skill-create.webp)

| Campo o botón | Qué introducir o comprobar |
| --- | --- |
| Nombre | Un identificador de método reconocible. Muestras de entrada en blanco **Name is required.** |
| Descripción | Diga cuando el método debe ser seleccionado, no sólo a qué campo pertenece. |
| Escribe / Sube | Introduzca el texto directamente o seleccione un archivo como fuente del cuerpo. |
| Contenido de la habilidad | Instrucciones de funcionamiento completas: entradas, cheques, salidas y condiciones de parada. |
| Configuración avanzada | Abre controles de archivo de soporte y el uso de paquetes. |
| Agregar archivos de referencia | Añade esquemas reutilizables, ejemplos o scripts; asegurar que los caminos utilizados en el cuerpo coincidan con el paquete guardado. |
| Eliminación del archivo de referencia | Elimina ese proyecto de recurso; comprobar las referencias rotas en el cuerpo después. |
| Cancelar / Volver a las habilidades | Deja al editor; Cancelar para descartar un borrador. |
| Publish / Ahorro... | Crea el paquete Personal; espera a la finalización y verificar la fila salvada. |

El editor permite hasta **Archivo de referencia 16,383** dentro del presupuesto de paquete **128 MB**. Las importaciones también deben pasar la validación de archivos; ver [Gestionar Skills](./manage.md).

## Escriba instrucciones que pueden ser revisadas {/* #write-instructions-that-can-be-checked */}

El ejemplo requiere que el agente mantenga identificadores de genes/sample completos, separe `EntrezGeneID` y `Length` de los conteos, rechace filas malformadas y valores perdidos, y compare antes/después de los hashes. Especifica cuatro métricas de muestra y archivos de salida separados. Estos requisitos hacen visible un resultado incorrecto o incompleto.

Incluya una condición de parada clara: si la fuente no puede leerse o falta un recuento, reporte ese problema de entrada. Un método reutilizable no debe cambiar silenciosamente el conjunto de datos o sustituir el análisis solicitado.

<span id="validate-the-saved-skill" />

## Verificar y reutilizar el Skill {/* #verify-and-reuse-the-skill */}

Para la ruta manual `rnaseq-count-qc`, utilice el prompt en [Skills](./overview.md). Abra el informe generado y el registro Notebook, luego compruebe la entrada, las dimensiones, las definiciones métricas y la salida contra [Datos de ejemplo](../reference/example-data.md).

Para una edición posterior, abra el **Actions → Edit** del paquete Personal, cambie el método, ahorre, a continuación, emita una nueva solicitud. Compare el resultado revisado con el resultado anterior. Desactivar o editar un paquete no rebobinar las instrucciones ya leídas en un turno de ejecución.

Para un borrador asistido por un agente, utilice **Add skill → Chat with agent** o la entrada **Customize**. Inspeccione sus instrucciones propuestas y lea el paquete publicado con los mismos cheques; una respuesta de chat que describe un Skill no es el paquete guardado en sí.

### Reutilizar el Skill publicado en una nueva sesión {/* #reuse-the-published-skill-in-a-new-session */}

1. Comience una nueva sesión y adjunte la matriz de cuenta pública original GSE60450.
2. Solicite a **rnaseq-descriptive-qc** por nombre. Pida sus cuatro métricas por muestreo, una entrada sin cambios, un CSV y un informe conciso.
3. Inspeccione la ejecución Notebook y abra ambos archivos generados. Revise los resultados guardados contra la entrada original en lugar de confiar sólo en el mensaje de terminación.

Reabrir el nuevo CSV e informar y compararlos con el identificador de muestra completo con el [Base de referencia compartida](../reference/example-data.md). Comprueba el hash de entrada. Al aplicar el Skill a otro estudio, repita estos cheques contra el propio diseño de entrada y experimental de ese estudio.

![Una invocación separada y el nuevo QC CSV](/img/open-science/v0.27.0/19-native-skill-reuse.webp)

Referencia de implementación: [SkillEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillEditor.tsx), [host-skills-service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/skills/host-skills-service.ts).

Guardar como aplicación de habilidades: [disponibilidad](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/workspace/save-as-skill-availability.ts), [Destilación de la conversación](https://github.com/aipoch/open-science/blob/v0.27.0/src/main/acp/interrupted-turn-continuation.ts), [Skill Creator](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/skill-creator/SKILL.md).
