---
title: "Skills"
last_update:
  date: '2026-09-24'
---

# Skills {/* #skills */}

Un Skill da al agente un método repetible: cuándo utilizarlo, qué entradas necesita, qué hacer y cómo comprobar sus salidas. Open-Science carga sus instrucciones cuando sea necesario. Instalar un Skill no instala el software científico descrito dentro de él.

Encontrar métodos adicionales a través del [Catálogo de Skills](marketplace.md), luego revisar sus insumos y dependencias antes de usar.

## Elija el tipo adecuado de capacidad {/* #choose-the-right-kind-of-capability */}

| Necesitas | Uso | Ejemplo |
| --- | --- | --- |
| Una operación que devuelve datos o ejecuta código | A [herramienta](../tools/overview.md) | Lea metadatos GEO; ejecutar Python |
| Un método que coordina esas operaciones | A Skill | Validar una matriz de cuenta de genes cruda |
| Un papel reutilizable con sus propias instrucciones y capacidades | A [Especialista](../specialists/overview.md) | Comprobar de forma independiente una tabla de muestreo-QC |

Comience con [directorio Skill](./directory.md) para encontrar un método, o [recetas](./recipes.md) para elegir de una situación de investigación.

## Encontrar e inspeccionar un Skill {/* #find-and-inspect-a-skill */}

1. Abre **Settings → Skills**.
2. Utilice **Search skills** para buscar su nombre o descripción. Ingrese `rnaseq-count-qc` después de [crear el ejemplo](./create.md).
3. Narrow **Filter skills by source**, **Filter Skills by agent**, o **Filter by Tag** si la lista permanece larga.
4. Abre el resultado. Lea la descripción, instrucciones, **Files**, licencia y **Availability**. Un nombre de pantalla puede diferir del ID del paquete.
5. Volver a la lista e inspeccionar **Used by**. Identifica qué agentes pueden utilizar el paquete; no lista las carreras completadas.

![Buscando el RNA-seq Skill salvado](/img/open-science/capabilities-walkthrough/02-skill-search.webp)

| Control | Qué cambios |
| --- | --- |
| Destacado / Importado / Encabezamiento personal | Amplia el grupo fuente. Barcos destacados con la aplicación; Importado proviene de un paquete o repositorio; El personal se crea localmente. |
| Interruptor de agente Main / remo para cambiar | Modifica la disponibilidad para Skills controlado por el usuario; aplicación requiere Skills permanecer habilitado. Los archivos siguen instalados. |
| Usada por | Muestra disponibilidad en todo el agente y especialistas de Main. Uso **Manage access** sobre el recurso para ajustar las asociaciones Main Agent y Specialist. |
| Gestionar etiquetas / eliminar un chip de etiqueta | Añade o elimina una etiqueta de organización; no cambia el permiso de ejecución. |
| Agregar habilidad | Ofrece creación asistida por agentes, autoría directa, subida local, importación GitHub o descubrimiento de vehículos instalados. |
| Conversación **+ → Save as skill** | Extracts a reusable method from a completed active branch; ver [pasos de creación y razones de estado discapacitado](./create.md). |
| Administrar | Abre la gestión a granel para paquetes personales e importados. |
| Importaciones de conversión → Paquetes Skill | Permite que el agente reconozca a ZIP/`.skill` paquetes y solicitar la aprobación de importación. Adjuntar un paquete por sí solo no lo instala. |

### ¿Por qué no se pueden apagar algunos interruptores? {/* #why-some-switches-cannot-be-turned-off */}

**Medio ambiente & Paquetes**, **Compute Environment Setup**, **Computación remota (SSH)** y **Customize** soportan características de la aplicación básica y permanecen habilitados. Sus interruptores están comprobados y deshabilitados. Hover o enfocar la explicación para leer **This built-in Skill supports core application features and is always enabled.**

Esta regla de activación no instala dependencias, ofrece credenciales o autorizaciones de operación de concesión. La asignación Specialist es un alcance separado: inspeccionar **Used by** y la lista de capacidades del rol.

El directorio todavía contiene 23 public packd Skills. El soporte interno Skills no son métodos adicionales para seleccionar. [Aplicación del conmutador necesario](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/settings/RequiredSkillToggle.tsx).

La captura muestra la explicación para **Customize**. Estos Skills requeridos permanecen habilitados incluso cuando usted deshabilita otros métodos opcionales.

![Personalizar las estancias habilitadas y explica por qué](/img/open-science/v0.27.0/08-always-enabled-skill.webp)

Para el popup per-agent y sus únicos enlaces de lectura, vea [acceso a los recursos](../guides/connectors.md#resource-access).

## Úsalo en una conversación {/* #use-it-in-a-conversation */}

<p className="example-label"><strong>Ejemplo</strong> Solicitar un cheque con rnaseq-count-qc</p>

Dar al agente la entrada, requerido Skill, entregable y limitaciones. Por ejemplo:

> Utilice el rnaseq-count-qc Skill en la matriz de cuenta en bruto GSE60450 adjunta. Mantenga EntrezGeneID y Longitud como metadatos. Validar dimensiones y recuentos de enteros no negativos, preservar los IDs de muestra originales, y guardar un informe de métodos separados con antes/después de entrada SHA-256. Utilice el Python Notebook.

Cuando se solicite la aprobación, inspeccione las instrucciones y el funcionamiento completos. Después de la ejecución, vuelva a abrir el informe y el registro Notebook y compare contra [Datos de ejemplo](../reference/example-data.md). Un cheque Specialist posterior es una operación separada; nombrar un Specialist no establece que se haya producido esa delegación.

### Instrucciones contra las funciones Notebook {/* #instructions-versus-notebook-functions */}

Nuestro paquete `rnaseq-count-qc` contiene instrucciones y un archivo de referencia. Hace **no** registrar las funciones de Notebook. El agente lee las instrucciones, luego escribe Python o R.

Algunos paquetes Skills también suministran funciones del núcleo. Sus propias instrucciones nombran las funciones y el `kernelSkillIds` requerido. No agregue todos los ID Skill instalados en ese campo: un paquete de instrucciones-sólo no es un ayudante del kernel. Un Skill cargado también no puede conceder permisos de sistema de archivos, red o herramienta.

Si un Skill falta de un picker, compruebe su filtro fuente, habilitado estado y asignación de agente. Si sus instrucciones se cargan pero el cálculo falla, continúe con [Instrumentos científicos](../tools/scientific.md); que es un problema de tiempo de ejecución o de entrada, no evidencia que el paquete no pudo instalar.

Referencia de implementación: [HabilidadesPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillsPanel.tsx), [SkillDetailView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillDetailView.tsx).
