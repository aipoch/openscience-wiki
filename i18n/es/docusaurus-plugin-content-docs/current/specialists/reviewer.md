---
title: "Revisor y revisión automática"
last_update:
  date: '2026-09-17'
---

# Revisor y revisión automática {/* #reviewer-and-auto-review */}

El Revisor incorporado comprueba una respuesta completa contra la solicitud y las pruebas disponibles. Está separado de un Specialist personalizado cuyo nombre contiene “Revisor”, y separado de la aprobación del permiso.

Para la comparación de salida basada en la ejecución, utilice [Reproducibilidad](../guides/reproducibility.md). Una evaluación del examinador y una salida reproducida son registros separados.

## Examen de la sesión versus revisión de artefactos {/* #session-review-versus-artifact-review */}

Una revisión de la conversación y la pestaña **Review** del panel de prueba de un artefacto son diferentes registros. Inspeccione la versión exacta del artefacto que tiene la intención de compartir. Si dice **No review for this version**, conserva esa etiqueta incluso si se revisó otra respuesta. Asimismo, la captura del entorno **partial** y la evidencia **atado** siguen siendo parciales y sujetados después de que un modelo expresa confianza.

Para los errores de entrada, adjunta una entrada actual accesible o resuelve su versión real a través de la aplicación. La existencia de un archivo local no garantiza que cada núcleo niño/revisor pueda leerlo. Ver [Notebook](../guides/notebook.md), [Delegación](./delegate.md) y [Solución de problemas](../guides/troubleshooting.md).

Inspeccione la versión seleccionada del artefacto al reabrir una revisión histórica. Después de cancelar una revisión o corrección, lea el estado final y retenía las conclusiones antes de decidir si volver a correr. La cancelación no crea una revisión exitosa.

## Elija un resultado que pueda comprobar {/* #choose-a-result-you-can-check */}

Para una primera revisión, complete el [Verificación de la mesa en línea](delegate.md#verified-example-twelve-sample-invariants): proporcione la tabla completa de muestra-QC y solicite un resultado aritmético por muestra. Esto proporciona un criterio preciso: doce identificadores de muestra únicos, doce filas, y genes detectados de cero cuenta más igual al gen total para cada fila.

Antes de revisar, abra el resultado del niño y su salida Notebook usted mismo. A continuación, solicite revisión de esa respuesta. Compare los cheques de la revisión con esos criterios; si falta un resultado de fila o ejecutado, resuelve ese hallazgo antes de usar el resultado. Los resultados del examen dependen de la respuesta y de las pruebas disponibles; este ejercicio no promete una insignia de cero.

## Solicitar un examen {/* #request-a-review */}

1. Completa una conversación con un modelo de trabajo.
2. Abre el compositor **+ menu → Request review**. El menú cambia a **Reviewing…** mientras se ejecuta la revisión.
3. Abra la tarjeta **Reviewer** resultante. Lea el número de hallazgos y cheques, luego amplíe la explicación de cada cheque.
4. Seleccione **Go to transcript** para abrir **Session Reviewer**. Verifique el modelo, las declaraciones de los tiempos, las declaraciones PASS/FAIL, las referencias de evidencia y **Reviewer log**.
5. Si se solicitan correcciones, inspeccione el seguimiento de Main Agent y cualquier solicitud de permiso para niños. La revisión no otorga esas operaciones automáticamente.
6. Use **Re-run review** después de abordar el problema identificado. Preserve resultados no resueltos si una entrada o operación requerida aún no está disponible.

<p className="example-label"><strong>Ejemplo práctico</strong> Leer una revisión con resultados sin resolver</p>

<details>
<summary>Vea los cheques y los hallazgos no resueltos</summary>

Utilizando la autenticación de suscripción Codex con gpt-5.6-sol, la revisión manual devolvió **cuatro cheques y un hallazgo**:

| Check | Resultado real |
| --- | --- |
| El Specialist ejecutó la revisión en línea CSV | PASS; en el examen se citaron los resultados de la entrega de niños y la aritmética. |
| Los resultados y fracasos de MCP personalizados fueron reportados con precisión | PASS; métricas válidas y el error del conector coinciden con la salida de ejecución. |
| La llamada de molécula produjo el artefacto declarado/descriptores | PASS; la versión y los valores devueltos del artefacto fueron identificados. |
| El modelo inspeccionó la vista previa de la molécula guardada como se solicitó | FAIL; su búsqueda de catálogo no leyó el contenido de la estructura. |

El ejemplo termina con **límite de fijación alcanzado / Problemas encontrados** porque el modelo no pudo acceder a la entrada gestionada necesaria para el control de la estructura. Abra el hallazgo para identificar la entrada desaparecida y proporcionarla antes de solicitar otra revisión. La apertura manual de la estructura en el espectador no actualiza el registro de inspección del modelo.

</details>

## Controles de revisión automática {/* #auto-review-controls */}

Abrir **Agent controls → Auto-review** para configurar la revisión después de futuras respuestas. Esta es una preferencia de conversación; es diferente de **Ask for approval** y **Delegation**. La fila de Revisores incorporados en Ajustes no tiene controles ordinarios de edición/delete/enable y está excluida del selector Specialist normal.

| UI estado o control | Significado |
| --- | --- |
| Solicitud de revisión no disponible | Compruebe una respuesta/revisión activa, una respuesta cumplida que falta elegible, o una configuración de modelo no disponible. |
| Revisando… | La revisión sigue en curso; no lo trate como completo. |
| Revisor · n hallazgos · n cheques | Abre los cheques y sus pruebas. Un resultado de cero-finding sigue obligado por lo que se comprobó. |
| Correcciones solicitadas | Main Agent puede ejecutar un ciclo de corrección de seguimiento. Inspeccione nuevas operaciones y sus resultados. |
| Problemas encontrados / límite de fijación alcanzado | El examen no resolvió todos los hallazgos. Lea la última explicación antes de comenzar un nuevo intento. |
| Ir a la transcripción | Abre la página dedicada Session Reviewer. |
| Expandir / Collapse Registro de revisión | Revela o oculta su registro de operaciones; un registro truncado no es evidencia completa. |
| Volver a ejecutar la revisión | Pide otro examen; no es un botón “aceptar todos los hallazgos”. |

<span id="what-the-local-review-checked" />

### Ejecutar Auto-revisión con un modelo separado {/* #run-auto-review-with-a-separate-model */}

1. Bajo **Settings → Model → Reviewer**, elija un modelo fijo disponible. La configuración ejercida utilizó `gpt-5.6-sol` para Main y `gpt-5.6-luna` para el Revisor.
2. Abra **Agent controls → Auto-review** en la conversación de destino, confirme **On**, luego envíe la siguiente solicitud.
3. Después de la respuesta, expanda la tarjeta **Reviewer** creada automáticamente. Revise su modelo, criterio, evidencia y resultado.
4. Cuando aparezca **Corrections requested**, inspeccione la corrección de Main y la posterior revisión antes de decidir si se resuelve el hallazgo.

Desde v0.30.2, Auto-review conserva su configuración cuando comienza una conversación, y las curvas de corrección conectadas conservan la retroalimentación necesaria para el ciclo de corrección. Encienda antes de enviar, luego compruebe la tarjeta de revisión real y la salida revisada de Main. La preservación del contexto no significa que se haya corregido un hallazgo; leer el examen posterior y las conclusiones restantes.

### Lo que “resolvió” establece {/* #what-resolved-establishes */}

Un cheque puede resolverse porque se realizó un intento solicitado y se informó con precisión de su fallo de permiso. Eso no establece que el archivo fue legible o sus cálculos pasaron. Lea el criterio, el resultado de la herramienta y los resultados restantes juntos. Si el acceso permanece bloqueado, siga el [archivo-handoff tema conocido](delegate.md) antes de iniciar otra revisión.


Referencia de implementación: [SessionReviewerPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/SessionReviewerPanel.tsx), [ComposerAgentControlesMenu.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerAgentControlsMenu.tsx).
