---
title: "Herramientas de investigación integradas"
last_update:
  date: '2026-11-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Herramientas de investigación integradas {/* #built-in-research-tools */}

Las operaciones integradas conectan la conversación con los archivos de proyecto, ejecución Notebook, registros de literatura y resultados guardados. Están expuestos a través del marco de agente activo; la interfaz puede agrupar varias operaciones bajo una tarjeta de actividad **Agent SDK** o **Notebook**.

## Operaciones por tarea de investigación {/* #operations-by-research-task */}

| Familia | Suministro | Funcionamiento y resultado visible | Comprueba antes de confiar en él |
| --- | --- | --- | --- |
| El descubrimiento y la lectura de archivos | Proyecto/sesión e insumos exactos | Listas de archivos accesibles o lecturas de contenido soportado | Nombre completo, fuente y versión actual; una fila de catálogo no es la inspección de contenido de archivo |
| Ejecución de Notebook | Python/R código, tiempo de ejecución y referencias de entrada válidas | Códula de código, salida, tiempo y estado de ejecución | Idioma/tiempo real, errores y cheques de datos completos |
| Publicación del artefacto | Una ruta de salida soportada o contenido en línea | Tarjeta de resultado versionada en la conversación / fichas | Abra la salida, compare las dimensiones/contenido y mantenga su versión |
| Búsqueda de literatura/importación | Archivos de consulta, DOI/PMID o referencia | Registros recuperados, candidatos de la bandeja de entrada y entradas de biblioteca | Identificadores, duplicados, decisión de revisión y acceso a texto completo |
| Operaciones de planificación | Etapas de investigación y criterios de conclusión | Plan de sesión con los estados escalones | El estado coincide con las salidas producidas |
| Memoria | Un hecho o una instrucción destinada a reutilizar | Memoria guardada en el alcance configurado | Contenido y alcance, separados del almacenamiento de archivos del proyecto |
| Carga Skill | Un ID de paquete disponible | Métodos de instrucciones y recursos de apoyo | Se leyó el paquete previsto; carga no es cálculo |
| Specialist delegation | Función, tarea y aportaciones permitidas | Actividad infantil y transcripción de Subagentes | El niño empezó, realizó los cheques solicitados y las limitaciones comunicadas |
| Revisión | Configuración de respuesta y revisión elegible | Controles, hallazgos y estado de corrección del revisor | ¿Qué respuesta/versión se revisó y qué pruebas estaban disponibles? |

<span id="follow-one-calculation-from-request-to-file" />

## Seguir una operación a través de su resultado {/* #follow-an-operation-through-to-its-result */}

1. Enviar una solicitud con la entrada y la salida deseada. Siga a [Primer proyecto](../guides/first-project.md) para una pequeña tarea de mesa a informe.
2. Ampliar la tarjeta de actividad y comprobar el alcance de operación, entrada y permiso solicitado.
3. Después de la ejecución, lea el resultado de la herramienta. Resolver un error antes de confiar en un resumen de él.
4. Abra la tarjeta de archivo generada y compruebe su contenido. Para un cálculo, abra Notebook para inspeccionar el código de producción y el tiempo de ejecución.

El [flujo de trabajo de calidad de los datos](../workflows/data-quality.md) proporciona un ejemplo científico completo. Los controles ambientales se explican en [Notebook](../guides/notebook.md) y [Entornos de ejecución](../guides/runtimes.md).

## Leer la actividad de herramienta {/* #read-tool-activity */}

| Elemento UI | Cómo usarlo |
| --- | --- |
| Grupo de actividad | Amplia las operaciones agrupadas en esa dirección. |
| Herramienta / Agente SDK / Notebook ejecutar | Abre los detalles de operación cuando esté disponible. Lea entradas, respuesta y error en lugar de solo la etiqueta del grupo. |
| Copie código / declaración de código | Copia o revela el código presentado; no se ejecuta una segunda carrera. |
| Permiso / alcance de autorización / Negación | Controla la operación mostrada y el alcance elegido. Inspeccione qué agente lo solicita. |
| Tarjeta de archivo generada | Abre el resultado guardado real. |
| Abrir Notebook | Abre registros de ejecución de sesión y variables. |
| chip de trabajo infantil | Abre una verdadera tarea delegada; inspeccionar su propia transcripción. |

## Evite la confusión de entrada y salida comunes {/* #avoid-common-inputoutput-confusion */}

Un archivo cargado, un archivo de trabajo Notebook y una versión de artefacto están relacionados pero distintos. Un archivo visible en una lista puede no ser montado todavía en un núcleo infantil. Utilice la referencia actual proporcionada por la aplicación; no reparar una entrada no disponible adivinando una ruta o reemplazando una versión de artefacto ID con su nombre de archivo.

Un archivo Connector creado puede no tener bloque de productor Python capturado. **No hay bloque de productor**, **No review for this version**, **partial** y **atado** evidencia son estados significativos, no blancos para llenar con prosa generada. Utilice [Solución de problemas](../guides/troubleshooting.md) para errores exactos y pasos de recuperación.

Referencia de implementación: [notebook.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook.ts), [artefactos.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/artifacts.ts), [WorkspaceMessageItem.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/WorkspaceMessageItem.tsx).

Para el trabajo de larga duración, siga [Tareas de antecedentes y ejecución de los resultados](../guides/notebook.md#background-tasks-and-result-delivery). Inspeccione las salidas de funcionamiento y guardadas después de la entrega. Entorno & Paquetes, Configuración de Medio Ambiente Compute y Compute Remoto (SSH) permanecen habilitados, pero sus requisitos de tiempo de funcionamiento, red y host todavía se aplican.

Para páginas web públicas, utilice [búsqueda web y lectura de fuentes](web-search.md) con el agente Open-Science incorporado.
