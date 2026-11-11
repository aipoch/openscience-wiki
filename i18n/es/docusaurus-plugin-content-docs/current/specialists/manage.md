---
title: "Administrar y compartir Especialistas"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Administrar y compartir Especialistas {/* #manage-and-share-specialists */}

Utilice un paquete para mover un papel configurado, y completar su configuración local después de importar. Skills, referencias Connector y permisos locales tienen diferentes reglas de portabilidad.

En la gestión de lotes, revise el recuento seleccionado en el área de acción inferior antes de aplicar una operación. Lea la finalización o la retroalimentación del fallo allí, a continuación, verifique los elementos resultantes. La selección de una entrada por sí sola no permite, instala o elimina.

## Controles de listas {/* #list-controls */}

| Control | Funcionamiento y resultado esperado |
| --- | --- |
| Buscar especialistas / categoría filtro | Renglones instalados; filtros claros si un papel salvado parece faltar. |
| Editar / nombre de la función | Abre el editor existente. Guardar cambios y reabrir para verificar. |
| Cambio de apariencia | Cambia el icono/color sin cambiar las instrucciones. |
| Administrar etiquetas | Asigna etiquetas de organización. |
| Toggle | Permite/deshabilitar el papel sin eliminarlo. |
| Acciones → Duplicar | Abre un nuevo borrador con instrucciones copiadas/bindings y un nombre de copiado. Crear especialista sigue siendo necesario. |
| Acciones → Exportar ZIP | Abre la selección de exportación y guarda un paquete portátil. |
| Acciones → Eliminar | Abre una confirmación de la eliminación permanente; inspeccionar la eliminación opcional Skill por separado. |

Antes de eliminar un papel, inspeccione la opción de eliminar su Skills. Mantenga el Skills compartido si otros roles todavía los utilizan. Eliminar un duplicado no requiere eliminar el papel original.

![Eliminar el papel desechable manteniendo el Skills compartido](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## Compartir e importar un paquete {/* #share-and-import-a-package */}

### Exportar con los archivos Skill requeridos {/* #export-with-the-required-skill-files */}

<p className="example-label"><strong>Ejemplo</strong> Compartir un papel de revisor con su Skill</p>

1. Elija **Actions → Export ZIP** en RNA-seq QC Reseñador.
2. En **Choose Skills to include**, seleccione explícitamente `rnaseq-count-qc` si el destinatario necesita sus archivos. Un Skill personal/importado instalado no está necesariamente incluido por defecto.
3. Exportar e inspeccionar el archivo antes de compartir.

![Selección de un Skill para incluir en el paquete Specialist](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

El <ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">paquete con Skill</ExampleDownload> real contiene `manifest.json`, `specialist.json`, `skills/rnaseq-count-qc/SKILL.md` y su esquema de referencia. Una exportación mínima puede contener sólo los dos archivos JSON. Los ID de Connector son referencias; Las credenciales, la confianza local y el acceso completo no se transfieren como autorización para uso.

### Importar, resolver conflictos, terminar la configuración {/* #import-resolve-conflicts-finish-setup */}

1. Seleccione **Add specialist → Import ZIP → Choose ZIP**. Un paquete contiene exactamente un Specialist. **Download template** proporciona la plantilla de paquete de aplicación.
2. Inspeccione el nombre, ID inmutable, versión, Skills, límites de archivo y diagnóstico.
3. Para cada conflicto Skill, elija **Keep installed Skill** o **Use package Skill**. La segunda opción reemplaza los archivos por cada usuario actual de ese Skill; lee **Afectado ahora**.
4. Para un ID Specialist existente, elija **Review overwrite**, inspeccionar las versiones actuales/incoming y exportar la versión actual primero si es necesario. **Overwrite and continue** es una confirmación separada.
5. El papel importado se guarda **discapacitados / SETUP INCOMPLETE**. Inspeccione las instrucciones y los enlaces de capacidades en el editor, elija el alcance de acceso previsto, luego **Save changes** para completar la configuración y habilitarlo.
6. Reabrir el papel instalado y ejecutar una tarea pequeña y de alcance.

![Resolver el conflicto RNA-seq Skill real durante la importación](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**Versión sin cambios** todavía puede acompañar un conflicto Skill. Elija la fuente Skill prevista explícitamente, y luego vuelva a abrir el papel importado para confirmar sus vinculantes y alcance de acceso.

| Control de vista previa | Qué inspeccionar |
| --- | --- |
| Ampliación de Skill | Versión, disposición, razón y lista de archivos. |
| Límites de archivado | 50 MB comprimido, 200 MB sin comprimir, archivos 2,000, 25 MB por archivo en esta interfaz de usuario. |
| Diagnóstico | Bloquear errores, advertencias e información; a warning may require an explicit choice. |
| Copiar informe / Descargar JSON | Exporta diagnóstico para solución de problemas. Revise el informe antes de compartirlo. |
| Cancelar | Deja la vista previa sin instalar. |
| Siguiente / Revisión sobre la escritura | Continúa sólo cuando las opciones requeridas y la validación lo permiten. |

**Importación de un navegador:** selecciona **Import ZIP → Choose ZIP**, luego inspecciona el paquete, resuelve conflictos y completa configuración local antes de habilitar el papel. Las credenciales y la configuración de confianza deben configurarse en el dispositivo de destino. Si la carga falla, retén el error y sigue [Solución de problemas](../guides/troubleshooting.md).

## Examine el mercado {/* #browse-the-marketplace */}

Abrir **Marketplace**, buscar un papel y elegir **View details**. Comprobar editor, fuente, versión, licencia, tamaño de descarga e incluido Skills/Connectors. **Refresh Marketplace** actualiza el catálogo; **Manage Marketplace sources** controla las fuentes configuradas. Todos/Oficial/Comunidad filtros se refieren al origen del catálogo, no disponibilidad de tiempo de ejecución.

![El detalle del paquete de Auto Research Specialist real](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

Seleccione **Install Specialist**, luego confirme que el papel aparece en **Marketplace** e inspeccione su estado habilitante y sus vinculantes. Los recuentos de paquetes de catálogo describen ese paquete, no todas las capacidades de aplicación. La instalación no ejecuta una tarea de investigación o prepara cada dependencia externa; terminar cualquier configuración necesaria antes de usar.

![Auto Research instalado y habilitado](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

## Verificar antes de compartir {/* #verify-before-sharing */}

Después de importar o cambiar el papel, ejecute una pequeña tarea utilizando sus capacidades asignadas e inspeccione la salida ahorrada. Siga [Extienda un análisis con un Specialist instalado](../workflows/extend-analysis.md) para los métodos existentes, PCA y los ejemplos de matriz. Compruebe los insumos necesarios y las limitaciones no resueltas para la ruta seleccionada.

Referencia de implementación: [EspecialistasPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
