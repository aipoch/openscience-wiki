---
title: "Proyectos y carpetas fuente"
last_update:
  date: '2026-11-11'
---

# Proyectos y carpetas fuente {/* #projects-and-source-folders */}

Un proyecto es el contenedor de trabajo para una pregunta de investigación: agrupa sesiones, archivos fuente y resultados generados. Su **Agent Context** proporciona instrucciones duraderas a cada sesión en ese proyecto. Comience un proyecto separado cuando la pregunta de investigación o los cambios de material de origen permitido.

<span id="example-prepare-a-systematic-review-reading-pack" />

Para introducir un registro de investigación existente en este proyecto, utilice [Importar paquete de sesión](research-packages.md). Los períodos de sesiones importados son sólo de lectura; crear una sesión normal para nuevos trabajos.

## Crear un proyecto {/* #create-a-project */}

<p className="example-label"><strong>Ejemplo práctico</strong> Prepare un paquete de lectura de revisión sistemática</p>

Nuestro proyecto es **PRISMA - Systematic review reading pack**. Utiliza documentos publicados de guía de presentación de informes, con el objetivo de mantener registros bibliográficos verificables y una orden de lectura. Esta es una tarea de construcción de colecciones, no una revisión sistemática completa.

1. Desde casa, seleccione **New project**. En un espacio de trabajo existente, el menú del nombre del proyecto proporciona la misma entrada.
2. Introduzca los campos de abajo. Mantenga las reglas bibliográficas y de evidencia en **Agent Context**, en lugar de sólo en Descripción.
3. Seleccione **Create project**. Confirme que la barra lateral izquierda muestra el nombre del proyecto y el panel principal abre **New conversation**.
4. Abra el menú de nombre de proyecto y **Project settings** para comprobar los valores guardados. Un ahorro de proyecto exitoso está separado de la preparación del modelo.

![Proyecto PRISMA con un propósito de investigación explícito y Agente Context](/img/open-science/local-acceptance/prisma-project-form.webp)

| Campo o botón | Ejemplo o acción | Qué cambios |
| --- | --- | --- |
| **Name** | `PRISMA - Systematic review reading pack` | Nombre de visualización requerido; hasta caracteres 200. La entrada vacía o solo en el espacio blanco no puede ser presentada. |
| **Description** | `Build a source-checked reading collection for researchers preparing a systematic review.` | Opcional, hasta caracteres 1,000. Aparece en la lista de proyectos; no se envía como instrucciones de agente. |
| **Agent Context** | Use las instrucciones a continuación. | Opcional, hasta caracteres 16,000. Incluido en sesiones de agentes nuevas y reanudadas y enviado al proveedor de modelos seleccionado. |
| **Create project** | Guardar el formulario válido. | Crea el proyecto y abre su espacio de trabajo. Un error guardado permanece visible en el formulario. |
| **Cancel**, **Close** | Desestimar el borrador. | No se crea ningún proyecto. El despido está discapacitado mientras la presentación está pendiente. |
| **Save** en la configuración del proyecto | Guardar un proyecto editado. | Actualiza el proyecto existente; no duplica sus sesiones. |

```text
Use public primary sources. Preserve DOI, title, authors and publication year.
Distinguish bibliographic metadata from claims verified in full text.
Never invent references. Report inaccessible sources explicitly.
Write outputs in English.
```

## Dar acceso a un proyecto a los archivos fuente {/* #give-a-project-access-to-source-files */}

Crear un proyecto no expone automáticamente las carpetas de su computadora. Abrir **Files** y elegir la entrada de la plataforma local cuando desea trabajar con un directorio existente. El buscador de carpetas selecciona una ubicación; el siguiente aviso de permiso determina el acceso permitido. Lea el camino seleccionado y el modo de acceso antes de confirmar.

Utilice el acceso sólo lectura al revisar el material fuente. Guarde una copia de proyecto gestionada si necesita la fuente retenida con el proyecto. Una vista previa del archivo local y una carga gestionada tienen diferentes ciclos de vida: mover un archivo externo puede romper la ruta original, mientras que una copia gestionada permanece en el almacenamiento de la aplicación.

Un cambio de acceso puede provocar una confirmación Notebook porque los núcleos activos pueden retener el acceso desde su configuración anterior. Terminar o detener el trabajo relevante antes de aceptar un reinicio del núcleo. Seleccionar una carpeta no es evidencia de que cada archivo en ella ha sido leído por el modelo.

## Cambiar o continuar un proyecto {/* #change-or-continue-a-project */}

Utilice el menú del nombre del proyecto para cambiar los proyectos. Iniciar una sesión con **New** cuando la próxima investigación necesita su propia transcripción, manteniendo al mismo tiempo el mismo contexto del proyecto. Use **Project settings** para revisar instrucciones duraderas; verifique la siguiente solicitud contra las reglas revisadas, ya que los resultados ya producidos no se actualizan automáticamente.

**Download artifacts…** es una operación de salida. Puede desactivarse cuando el proyecto no tiene artefactos generados; cargar un archivo fuente por sí solo no crea un resultado generado. Archivo de trabajo terminado cuando desea eliminarlo de la navegación activa mientras retiene la recuperación a través de **Settings → Archived**.

## Confirmar el resultado y recuperarse de problemas {/* #confirm-the-result-and-recover-from-problems */}

| Observación | Interpretación y siguiente paso |
| --- | --- |
| El nombre del proyecto aparece, pero el envío no está disponible | La creación del proyecto tuvo éxito. Check **Settings → Agent** y **Settings → Model** por separado. |
| Agente ignora las instrucciones escritas en Descripción | Mover instrucciones en **Agent Context** y enviar una nueva solicitud explícita. Descripción es metadatos organizativos. |
| La carpeta se abre pero se niega una escritura | El permiso solo permite la inspección, no la modificación. Guardar un artefacto derivado o revisar el alcance de escritura solicitado. |
| Guardar restos mortales | Eliminar los nombres en blanco y comprobar las longitudes del campo; Espera si hay otro ahorro pendiente. |
| Se selecciona un proyecto diferente | Verifique el título del proyecto antes de adjuntar un documento o enviar una solicitud. |

## Establecer una plantilla de optimización de preguntas {/* #optimization-template */}

Abrir el menú del proyecto → **Project settings → Advanced agent options → Optimization prompt**. Introduzca instrucciones para reescribir preguntas en este proyecto, a continuación, ahorre. Déjelo vacío para usar el predeterminado incorporado. El mismo campo está disponible bajo **New project → Advanced agent options**.

Este campo solo funciona cuando seleccionas **Optimize question**. Está separado **Agent Context**, que proporciona instrucciones a las sesiones de agente del proyecto, y desde **Description**, que es para su referencia.

<p className="example-label"><strong>Ejemplo</strong> Preserve the limits of a teaching question</p>

```text
Rewrite the question in clear English. Preserve the supplied numbers
and the hypothetical scope. Ask for a concise answer with limitations;
do not invent participants, measurements or citations.
```

![Previsión de optimización personalizada bajo las opciones de agente avanzado del proyecto](/img/open-science/v121/optimization-template.webp)

Volver al Compositor y [optimizar un proyecto](composer.md#optimize-question). Revise el texto reescrito antes de enviar; una plantilla es una instrucción de escritura, no una regla de validación científica.
