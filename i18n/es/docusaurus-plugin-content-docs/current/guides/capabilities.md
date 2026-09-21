---
title: "Capacidades y insumos compatibles"
last_update:
  date: '2026-09-14'
---

# Capacidades y insumos compatibles {/* #capabilities-and-supported-inputs */}

Open-Science trae conversaciones de un proyecto de investigación, archivos fuente, registros de literatura y resultados generados en un espacio de trabajo local. Un modelo configurado dirige el trabajo; Los tiempos de ejecución, herramientas y servicios conectados de Notebook realizan las operaciones que las necesitan. Elige un punto de partida del material que ya tienes.

## Comience con su entrada {/* #start-with-your-input */}

| Tienes razón. | Primera acción | Resultado para pedir | Compruebe antes de utilizarlo |
| --- | --- | --- | --- |
| Una pregunta de investigación y varios DOIs | Crear un proyecto; buscar los identificadores y revisar los candidatos de la Biblioteca Inbox | Una colección de lectura comprobada por fuentes | Títulos, listas de autores, años e identificadores contra el editor |
| Una carpeta de documentos o referencias exportadas | Utilice los controles de importación y recogida de la biblioteca de literatura | Una colección organizada con PDFs disponibles adjuntos | Advertencias de importación, duplicados y coincidencias de fijación |
| Un CSV o TSV | Adjuntarla a una sesión y solicitar un análisis Notebook | Una auditoría de datos, un cuadro de resultados y una figura | Valores perdidos, unidades, denominadores y archivos guardados |
| PDF o manuscrito | Adjuntar el documento o abrirlo en Archivos | Un plan de explicación o revisión específico del pasaje | Si el agente leyó el texto completo y si las páginas citadas apoyan sus reclamaciones |
| Una secuencia o estructura molecular | Abra un archivo de FASTA, PDB o molécula compatible | Una vista previa, informe de validación o análisis usando una herramienta adecuada | Convenios de entrada, requisitos de método y disponibilidad de instrumentos |
| Un procedimiento que reutiliza | Crear o importar un Skill | Instrucciones reutilizables y archivos de soporte | Estado habilitado, dependencias requeridas y un juicio sobre una aportación conocida |
| Una función de investigación definida | Crear un Specialist y asignar sus capacidades | Un papel con instrucciones explícitas y acceso | Skills, Connectors y el resultado del trabajo delegado |

Para figuras y tablas en un papel, utilice [extracción local PDF](previews.md#pdf-extraction). Encontrar métodos reutilizables a través del [Catálogo de Skills](../skills/marketplace.md). Revise un resultado capturado con [Reproducibilidad](reproducibility.md), o comparta su conversación y evidencia a través de un [Paquete .science](research-packages.md).

Un espectador que abre un archivo no muestra que el modelo lo ha leído. Adjuntar un archivo da a la sesión una fuente con la que trabajar; inspeccionar las lecturas registradas, las llamadas de herramientas y las pruebas de salida para establecer cómo el agente lo usó. Las extensiones de salida y los límites de tamaño están en [Formatos y límites de archivo](../reference/formats.md).

## Comprender los objetos del espacio de trabajo {/* #understand-the-workspace-objects */}

| Objeto | Lo que guardas ahí | Relación con otros objetos |
| --- | --- | --- |
| **Project** | propósito de investigación, durable Agente Context, sesiones y archivos de proyecto | Úsalo para mantener una investigación juntos |
| **Session** | Solicitudes, respuestas, actividad de herramientas y ramas de conversación | Cada sesión pertenece a un proyecto |
| **Upload** | Una copia gestionada del material de origen | Mantenerlo separado de los resultados derivados |
| **Artifact** | Un informe generado, figura, tabla u otro archivo | Las versiones conservan evidencias asociadas con su producción |
| **Referencia de literatura** | Metadatos bibliográficos, identificadores y apegos | Organizarlo en colecciones y asociarlo con proyectos |
| **Notebook** | Ejecución Python o R y sus salidas | Inspeccione los cálculos de la sesión y las variables en vivo |
| **Skill** | Instrucciones y archivos de soporte para un método | Habilitarlo y seleccionarlo desde el compositor cuando sea apropiado |
| **Specialist** | Función, instrucciones y capacidades seleccionadas | Configure e invoque para el trabajo que se ajuste a ese papel |
| **Connector** | Acceso a herramientas externas o servicios de datos | La disponibilidad depende de la configuración, las credenciales y la política |

El proyecto **Description** le ayuda a identificar el proyecto. Ponga instrucciones que el agente debe seguir en **Agent Context**. Este último se incluye en el contexto modelo; no es un lugar para almacenar las credenciales.

## Prepare sólo las dependencias que su tarea necesita {/* #prepare-only-the-dependencies-your-task-needs */}

Una conversación necesita un marco de agente de trabajo y una conexión modelo. Un cálculo Python también necesita un tiempo de ejecución Python Notebook. Una búsqueda de servicio necesita el Connector relevante, acceso a la red y cualquier credencial requerido. Un método GPU puede requerir una máquina separada, entorno de software y pesos modelo incluso cuando su Skill ya está lista.

Configure el modelo, horario de ejecución y los servicios de datos por separado. Después de conectar el modelo, revise los paquetes necesarios para el cálculo. Si falta un paquete, instálelo o elija explícitamente un método que utilice el entorno disponible.

Vea [Configuración del proveedor](providers.md), [Horas de ejecución Python y R](runtimes.md) y [Red](network.md) para estos caminos de configuración independientes. Una prueba de conexión modelo exitosa no valida todos los servicios de aguas abajo.

## Decidir si un resultado está listo {/* #decide-whether-a-result-is-ready */}

Abra la salida guardada y compare con la solicitud. Para una mesa, compruebe el recuento de filas, unidades y tratamiento de datos perdidos. Para una bibliografía, verifique identificadores y autores completos. Para los resultados generados por código, inspeccione **Provenance** y el Notebook. Etiqueta de revisión como captura parcial del medio ambiente o evidencia no disponible antes de llamar un resultado reproducible.

Los ejemplos formales utilizan insumos de investigación pública:

- [Colección de lectura PRISMA](../workflows/core-reading-list.md): tres documentos reales, revisó los registros de la Biblioteca y un editor adjunto PDF.
- [Análisis GSE60450 RNA-seq](../workflows/data-quality.md): filas de genes 27,179, muestras 12, métricas de QC verificadas independientemente, una figura de cuenta cruda y código de productor capturado.

[Computación remota](remote-compute.md) cubre RNA-seq QC a través de Direct SSH, recolectando resultados, recuperación y cancelación. También explica los requisitos de contabilidad Slurm y un pequeño flujo de trabajo de diseño de secuencia ProteinMPNN en un A100 GPU en un entorno CUDA aislado.

## Almacenamiento local y procesamiento externo {/* #local-storage-and-external-processing */}

La aplicación almacena su espacio de trabajo localmente. Cuando envía una solicitud a un modelo hospedado, las instrucciones y el contenido pertinentes van a ese proveedor. Los conectores y empleos remotos pueden enviar datos a sus servicios configurados. Utilice el proveedor y la actividad de herramienta seleccionados para identificar dónde se ejecuta una tarea; almacenamiento local por sí solo no significa procesamiento fuera de línea.

**Revisión de la fuente:** [documentación del producto](https://github.com/aipoch/open-science/blob/v0.26.0/README.md), [campos de proyectos](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/projects.ts) y [vista previa enrutamiento](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts). Los dos estudios de casos relacionados llevan sus registros de operaciones y capturas de pantalla en inglés.
