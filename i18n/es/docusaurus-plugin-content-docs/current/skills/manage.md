---
title: "Gestionar y validar Skills"
last_update:
  date: '2026-10-22'
---

# Gestionar y validar Skills {/* #manage-and-validate-skills */}

Importar un método probado de archivos locales o GitHub, exportar copias y mantener instalado Skills. Exportar un método primero si usted necesita retener su versión actual.

En la gestión de lotes, revise el recuento seleccionado en el área de acción inferior antes de aplicar una operación. Lea la finalización o la retroalimentación del fallo allí, a continuación, verifique los elementos resultantes. La selección de una entrada por sí sola no permite, instala o elimina.

## Instalar desde el mercado {/* #marketplace */}

Para la navegación por catálogo, instalación y actualizaciones, siga el [Guía de mercado de Skill](marketplace.md). Este capítulo abarca las importaciones locales y GitHub, las exportaciones y el mantenimiento de Skills instalados.

## Exportar e importar un paquete local {/* #export-and-import-a-local-package */}

<p className="example-label"><strong>Ejemplo</strong> Exportar y reimportar un RNA-seq Skill</p>

1. Encontrar `rnaseq-count-qc` en **Settings → Skills** y elegir **Actions → Export**. Guarda el ZIP.
2. Seleccione **Add skill → Upload skills → Upload skill files** y elija ese ZIP.
3. En **Confirm import**, inspeccione el nombre de archivo fuente y el diagnóstico. Los candidatos no se controlan inicialmente.
4. Abre **Vista previa rnaseq-count-qc**. Lea SKILL.md y la lista de archivos. La exportación real preservada `references/sample-metric-schema.md`.
5. Cerrar vista previa, seleccione el candidato y elija **Importación seleccionada (1)**.
6. Busque la fila importada e inspeccione su nombre final y fuente.

![Inspección del paquete completo antes de importar](/img/open-science/capabilities-walkthrough/11-skill-package-preview.webp)

En este ejemplo, el Skill personal original ya existía. La vista previa muestra **Name exists**, e importación creó un **Importado `rnaseq-count-qc-2`**. El original y su unión Specialist permanecieron. No asuma todas las actualizaciones de importación del paquete existente; inspeccionar la fuente del candidato y actualizar/reemplazar el diagnóstico.

![La copia importada y el original Personal Skill](/img/open-science/capabilities-walkthrough/12-skill-imported-copy.webp)

| Control de importación | Propósito |
| --- | --- |
| Seleccione todo / Invert / lista de candidatos | Elija los paquetes que descubrieron para importar; un archivo puede contener varios Skills. |
| Vista previa / Cerrar vista previa | Lee instrucciones y archivos antes de la instalación. |
| Nombre existe / diagnóstico | Advierte los problemas de identidad o contenido. Revise el nombre resultante después de importar. |
| Elija otros archivos | Reemplaza la selección actual de candidatos. |
| Importar selección | Realiza las importaciones seleccionadas e informa de éxitos, paquetes o fallos inalterados. |

Una carga de marcado necesita YAML `name` y `description`; un paquete ZIP/`.skill` necesita SKILL.md. La carga local no busca archivos perdidos de URLs incrustados en instrucciones. Los formatos no compatibles, los metadatos desaparecidos, los límites de tamaño de archivo y las vías de archivo inseguros son fallas de validación, no razones para desactivar la validación.

## Importar un Skill local ya instalado {/* #import-an-already-installed-local-skill */}

<p className="example-label"><strong>Ejemplo</strong> Importar el paquete local de revisión de pares</p>

**Add skill → Import installed skills** escanea `~/.agents/skills` y `~/.codex/skills`. En este ejemplo, el escaneo local encontró candidatos 68, inicialmente todos seleccionados. Borrar **Select all installed skills**, luego elegir el método específico; use **Invert** sólo después de comprobar lo que se selecciona actualmente.

1. Abrir **Previsualización de la vista entre pares** e inspeccionar su carpeta de origen, instrucciones y archivos referenciados.
2. Elija **Close preview**, seleccione sólo `peer-review`, luego **Importación seleccionada (1)**.
3. Espera a **Capacidad 1 importada**. El candidato es entonces etiquetado **Imported** y no puede ser seleccionado para la misma importación de nuevo.
4. Volver a Skills, buscar `peer-review` e inspeccionar la fila Importada. La carpeta fuente permanece en su lugar; Open-Science utiliza una copia importada.
5. Utilice **Rescan** después de cambiar las carpetas instaladas. Revisar el origen, la selección y el estado antes de importar de nuevo.

![Previsualizar el paquete de revisión de pares instalado localmente](/img/open-science/local-todo-batch/12-installed-skill-preview.webp)

![Encontrar el paquete importado en la lista Skills](/img/open-science/local-todo-batch/13-installed-skill-imported.webp)

Después de importar, inspeccione la plantilla y los archivos de referencia en el detalle Skill. Antes de utilizar un método de otro asistente, compruebe que sus herramientas y características de tiempo de ejecución necesarias están disponibles en esta sesión.

## Importación y actualización de GitHub {/* #import-and-update-from-github */}

<p className="example-label"><strong>Ejemplo</strong> Importar y actualizar un ESM-2 Skill</p>

1. Elige **Add skill → Import from GitHub**. Introduzca una palabra clave, `owner/repo`, `owner/repo@ref` o GitHub URL, a continuación, seleccione **Find skills**. Utilice un ref fijo para una fuente de paquetes reproducible.
2. Lea el repositorio y el recuento de candidatos. Esta exploración inicialmente seleccionó a cada candidato; **Select all** claro antes de elegir sólo el método requerido. difiere de la pantalla de confirmación ZIP no comprobada.
3. Abra **Preview** y compruebe el compromiso resuelto, carpeta, instrucciones y archivos. Un escáner de repositorio puede descubrir carpetas internas, así como Skills de cara al usuario; su cuenta no es el conteo Skill de la aplicación.
4. Cerrar vista previa, seleccione el candidato indicado y elija **Importación seleccionada (1)**. Espera el resultado y revisa su nombre bajo **Imported skills**.
5. Vuelve a Skills y busca ese nombre. Inspeccione su fuente y disponibilidad antes de utilizarla.

![Revise un GitHub Skill y su fuente encendida antes de importar](/img/open-science/local-todo-batch/15-github-skill-preview.webp)

Importar `fair-esm2` del repositorio de productos creó **`fair-esm2-2`** porque el nombre incorporado ya existía. El paquete incorporado se mantuvo. Importar instrucciones no instala pesos modelo o establece que la inferencia funciona.

### Aplicar una revisión preliminar {/* #apply-an-upstream-revision */}

Escanee el mismo repositorio con el nuevo ref. El candidato existente puede mostrar **Update available**. Seleccione sólo ese candidato e importarlo; inspeccionar la fila importada existente y previsualizar después. En el cheque ESM-2, se actualizó la misma copia `fair-esm2-2` y el escaneo que ref mostró de nuevo **Imported**. El cuerpo de instrucción actualizado coincidió con la fuente del repositorio. El importador reescribe la primera y el nombre seguro de colisión, por lo que los bytes de archivo entero no deben coincidir con el original SKILL.md.

![Se puede solicitar una revisión preliminar para la copia importada](/img/open-science/local-todo-batch/16-github-update-available.webp)

### Recover from GitHub rate limiting {/* #recover-from-github-rate-limiting */}

Para **GitHub request was rate-limited**, abra **Manage GitHub credential**, introduzca una ficha usable y seleccione **Verify and save**. Después de **Token verificado y salvado**, vuelva a introducir el escaneo. **Cancel** sale sin guardar. Mantenga las fichas fuera de las capturas de pantalla e informes de emisión.

## Habilitar, deshabilitar y eliminar {/* #enable-disable-and-delete */}

Abrir **Manage**, filtrar por fuente/estadio, y buscar un método específico. Seleccione el resultado antes de aplicar una acción. **Seleccionado (n)** muestra la selección; **Clear selection** lo vacía. Revise el conjunto completo seleccionado cuando los filtros cambian.

![La copia importada discapacitada en la gestión a granel](/img/open-science/capabilities-walkthrough/13-skill-bulk-disabled.webp)

Después de cambiar la disponibilidad, vuelva a abrir el detalle Skill para confirmar su estado. Mantenga una exportación de un método que necesita antes de eliminarlo.

| Medida | Resultado previsto |
| --- | --- |
| Activar seleccionado | Hace que los paquetes elegibles seleccionados estén disponibles de nuevo. Revisa el estado de la fila. |
| Desactivación seleccionada | Retiene paquetes controlados por el usuario elegibles pero elimina la disponibilidad de Main Agent para solicitudes posteriores; Skills requerido por la aplicación no puede ser deshabilitado. |
| Eliminar la selección seleccionada | Abre una confirmación con los nombres y resultados exactos seleccionados. |
| Eliminar n Skills | Elimina los paquetes locales elegibles después de la confirmación. No hay flujo de trabajo de basura/restore Skill. |
| Cancelar | Deja los paquetes instalados. |

Destacados y Specialist- Los paquetes conectados pueden ser protegidos de la eliminación. Retire una unión obsoleta o desactive un paquete controlado por el usuario cuando sea apropiado. Se mantiene habilitada la Skills requerida por la aplicación; ver [reglas de activación](overview.md#why-some-switches-cannot-be-turned-off). Después de borrar, confirme que el paquete seleccionado está ausente de la lista filtrada.

## Actualización y diagnóstico {/* #update-and-diagnose */}

| Síntoma | Comprobación y próxima acción |
| --- | --- |
| Importado pero ausente de la lista | Filtros de fuente clara, agente y etiqueta; busque el nombre resultante, incluyendo sufijos. |
| Archivos desaparecidos después de la importación | Inspeccionar la lista de archivos de paquetes y la reexportación; un solo archivo Markdown no puede incluir un archivo de referencia separado automáticamente. |
| Conflicto de revisión durante la edición | Reabrir la última versión, comparar cambios y guardar deliberadamente. |
| Carga Skill pero una función no está disponible | Compruebe si el paquete realmente proporciona un ayudante del kernel; las instrucciones ordinarias no son funciones Notebook. |
| Paquete perdido / tiempo de ejecución | Uso [Instrumentos científicos](../tools/scientific.md) y el administrador de paquetes de tiempo de ejecución seleccionado. |
| GitHub/authentication error | Retener el estado HTTP real y la URL de origen sanitario; ver [Solución de problemas](../guides/troubleshooting.md). |

Referencia de implementación: [HabilidadUploadView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillUploadView.tsx), [SkillBulkManageView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillBulkManageView.tsx), [HabilidadImportView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillImportView.tsx).

## Importar y editar Habilidades de forma segura {/* #import-batches */}

Grandes selecciones instaladas-Skill se importan en lotes. Esperar el resultado final e inspeccionar la lista importada antes de repetir la importación. Una Habilidad externa con un prefijo de nombre reservado se asigna un nombre local seguro; utilice el nombre mostrado en el catálogo local. Al editar el cuerpo, guardarlo y verificar que el nombre y descripción editados por separado siguen siendo correctos. Las imágenes adjuntas al mensaje actual también pueden informar la selección de Habilidad; comprobar el alcance de la Habilidad seleccionada antes de dejar que actúe.
