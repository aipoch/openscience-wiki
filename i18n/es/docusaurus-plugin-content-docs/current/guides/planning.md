---
title: "Planificación antes de la ejecución"
last_update:
  date: '2026-09-20'
---

# Planificación antes de la ejecución {/* #planning-before-execution */}

Utilice **Plan first** para revisar los insumos, método, productos y criterios de aceptación antes de la ejecución. La aprobación del plan y el permiso de la herramienta son decisiones separadas. Captura de Pantalla son en [Datos de ejemplo](../reference/example-data.md).

## Presentar una solicitud de planificación {/* #submit-a-planning-request */}

<p className="example-label"><strong>Ejemplo práctico</strong> Revisar y revisar un plan de QC de cuenta cruda</p>

1. Adjuntar el archivo de entrada y describir el objetivo, métodos, entregables y límites en el Compositor.
2. Abre **More send options → Plan first**. Se requiere una solicitud de texto; un solo borrador adjunto no permite esta opción.
3. Espera a planear. Si aparece una tarjeta de permiso **Plan control**, inspeccione y permita el alcance previsto o niéguela. Esto autoriza la creación de planes y la grabación de la decisión, no toda ejecución futura.
4. Espera a **Plan ready for review**. No trate un párrafo normal diciendo “aquí está mi plan” como prueba de que existe una tarjeta de aprobación estructurada.

![Planifique primero en el menú de envío](/img/open-science/guides-walkthrough/21-plan-first-entry.webp)

![Autorización separada para crear y registrar un plan](/img/open-science/guides-walkthrough/22-plan-permission.webp)

La tarea especifica los recuentos sin cambios, los metadatos ID/length separados, el QC por muestreo, tres salidas gestionadas y ninguna reclamación de diferencial-expresión. Una solicitud inicial precisa hace que el plan sea más fácil de juzgar.

## Inspección antes de aprobar {/* #inspect-before-approving */}

Seleccione **Open** para ver el plan estructurado junto a la conversación. Inspeccione fases, orden de paso, propietario de ejecución, salidas deseadas y notas de viabilidad. Utilice **Enter full screen** para leer un plan largo y **Download Plan** para retenerlo. La etiqueta de confianza es la evaluación del plan, no evidencia de que el código ya ha funcionado.

![Plan estructurado con fases y salidas deseadas](/img/open-science/guides-walkthrough/23-plan-review.webp)

| Control/estado | Qué hacer |
| --- | --- |
| Abrir | Lea el plan completo; apertura no es aprobación. |
| Aprobar | Autorizar el plan actual para proceder. Todavía pueden aparecer las aprobaciones específicas de la herramienta. |
| Responder al plan | Describir una corrección accionable a los criterios de entrada, método, salida o aceptación. |
| Enviar comentarios sobre el plan | Presentar retroalimentación no vacía y esperar el plan revisado. |
| Desestimación, cuando se muestra en la vista previa de aprobación | Rechazar/desestimar el plan pendiente; es diferente de simplemente cerrar una vista previa. |
| Reemplazado/nuevo plan de advertencia | Esta instantánea es firme y no puede aprobar el plan actual. Abre la tarjeta actual. |

## Solicitar cambios y revisar el reemplazo {/* #request-changes-and-review-the-replacement */}

En **Respond to Plan**, indica exactamente qué debe cambiar. Por ejemplo, solicite un control de la integridad de entrada, reabrir cada salida, y un mapeo entre etiquetas de trama acortadas y identificadores originales. Seleccione **Send Plan feedback**, espere el reemplazo, luego compruebe que cada cambio solicitado está presente.

![Feedback entered before submission](/img/open-science/guides-walkthrough/24-plan-feedback.webp)

Lea el reemplazo y use su botón **Approve**. El anticipo ya abierto puede permanecer visible con una advertencia de que fue reemplazado; sus pasos mostrados no son el último progreso del plan activo. Reabrir el plan activo en lugar de aprobar una vieja captura de pantalla.

## Seguir la ejecución y verificar los resultados {/* #follow-execution-and-verify-results */}

Para los seguimientos solicitados, utilice [Controles de cola de compositor](composer.md#manage-a-running-tasks-queue). Editar la cola no aprueba un plan.

Después de la aprobación, la sesión comienza a ejecutar el plan. En el modo Ask, las tarjetas separadas de permiso de herramientas todavía pueden aparecer. Inspeccione el comando, objetivo y alcance. Si una operación falla, identifique el error de entrada, medio ambiente o acceso real antes de reintentar; aprobar el plan no resuelve esos requisitos.

Los estados de paso pueden incluir no iniciarse, en progreso, completado, bloqueado, saltado y no correr. Un plan completado no es validación científica por sí mismo. Abrir el CSV real, figura e informe; comparar su contenido con los criterios de aceptación. En este ejemplo, los resúmenes de la muestra 12 coincidieron con un cálculo independiente de la matriz original.

Continuar con [Archivos y versiones](./files.md), [Pruebas Notebook](./notebook.md) y [Permisos](./approval-modes.md).

Fuente: [Controles de aprobación y previsualización del plan](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/session-plan/SessionPlanSurfaces.tsx).

## Reanude después de la reconstrucción contextual {/* #resume-plan */}

Desde v0.31.0, el agente puede recuperar el actual Plan de Sesión, su revisión y las aprobaciones pendientes después de reconstruir su contexto. Repita el plan activo y compruebe qué pasos efectivamente completados antes de pedirle que continúe. Todavía está pendiente de aprobación; recuperar el plan no lo aprueba o confirma una operación cuyo resultado no fue registrado.
