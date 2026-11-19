---
title: "Formatos y límites de archivo"
last_update:
  date: '2026-11-19'
---

# Formatos y límites de archivo {/* #file-formats-and-limits */}

Mira los límites y el enrutamiento de archivos aquí. Subir un archivo, previsualizarlo, analizarlo en una herramienta y enviarlo a un modelo son capacidades separadas. Una carga aceptada no es una promesa de un espectador en línea o comprensión modelo.

<span id="input-and-preview" />

<span id="file-names-and-versions" />

<span id="large-and-binary-files" />

## Previsualización de la ruta {/* #preview-routing */}

| Índice | Extensiones reconocidas | Comportamiento y límite |
| --- | --- | --- |
| Imagen de mapa/vector | `avif`, `gif`, `jpeg`, `jpg`, `png`, `svg`, `webp` | vista previa de imagen; entrada de modelo todavía depende de soporte de imagen |
| TIFF | `tif`, `tiff` | Decodificador dedicado con límite de archivo, píxel y memoria |
| Tabla delimitada | `csv`, `tsv` | Primera fila es tratada como cabeceras; filas atadas / columnas |
| Secuencia | `fa`, `faa`, `fasta`, `ffn`, `fna`, `frn` | Inspección de FASTA; la visualización no valida un método de análisis |
| Estructura | `pdb` | Visualizador de estructura; no una evaluación de calidad de una predicción |
| Molécula/reacción | `mol`, `sdf`, `smi`, `smiles`, `rxn` | Previsualización molecular dedicada; no asuma `mol2` tiene la misma routa |
| PDF | `pdf` | Lector de documento dedicado con controles de página |
| Palabra | `docx` | Rendidor de oficinas; legado `doc` no se encamina a DOCX paresing |
| hoja de cálculo | `xls`, `xlsx` | Previsualización de la hoja de cálculo de la oficina; la ejecución del modelo es una operación separada |
| Presentación | `pptx` | Presentación vista previa y [edición de diapositivas](../guides/presentation-editing.md); legado `ppt` no se encamina a PPTX persing |
| Markdown | `md`, `markdown` | Documento remitido, con acciones de conversión de texto apoyadas |
| HTML | `htm`, `html` | Previsualización HTML aislada; no recibe privilegios de aplicación |
| JSON | `json` | Previsualización estructurada, incluyendo el plan reconocido JSON |
| Código | `bash`, `bib`, `bibtex`, `css`, `js`, `jsx`, `py`, `r`, `sh`, `tex`, `ts`, `tsx` | Fuente destacada; abrir un script no lo ejecuta |
| Texto del texto | `conf`, `config`, `ini`, `iqtree`, `log`, `nwk`, `state`, `toml`, `tree`, `treefile`, `txt`, `xml`, `yaml`, `yml` | Visualización de texto escrito |
| Otros archivos | Extensión no reconocida/contenido | Fallback/download donde esté disponible; `.ipynb` la exportación no implica un editor de archivos-preview dedicado |

El router también tiene un retroceso MIME estrecho para archivos extensivos adecuados. Los metadatos MIME de la Oficina de Misleading no hacen un formato legado compatible con un renderizador OOXML.

[Exact mesa de enrutamiento](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts), [registro del renderizador](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx).

<span id="image-model-limits" />

## Límites de tamaño y visualización {/* #size-and-display-limits */}

Las unidades siguientes son unidades binarias: 1 MiB = 1,048,576 bytes; 1 GiB = 1,073,741,824 bytes. La interfaz puede etiquetar estos valores MB o GB.

| Boundary | Limitación de la fuente | ¿Qué límite se aplica a |
| --- | ---: | --- |
| Subida de un proyecto | 10 GiB | Subir la admisión, no un presupuesto de vista previa o de contexto modelo |
| Un pedazo de carga | 8 MiB | Transferencia de tamaño grueso; no un límite de usuario por archivo |
| Adhesiones de compositores | 10 | Conteo de adjuntos por mensaje |
| Menciones del artefacto del compositor | 10 | Referencias de artefacto explícito por mensaje |
| Texto previsor predeterminado leído | 1 MiB | Lea el texto inicial de los límites |
| Máximo pedido previsual genérico leído | 10 MiB | Techo de lector genérico; lectores especializados tienen sus propios límites |
| Datos visibles CSV/TSV | filas 100 × columnas 24 | Datos mostrados después de la primera fila / cabeza; no el tamaño del conjunto de datos fuente |
| Archivo de Office vista | 40 MiB | Entrada previa de la oficina |
| Presentación del archivo TIFF | 40 MiB | Límite de archivo TIFF dedicado |
| Píxeles decodificados TIFF | 25,000,000 | Previsualización del presupuesto de píxel |
| TIFF decodificación de la asignación | 256 MiB | Previsualizar el presupuesto de memoria decodificador |
| Cuenta de la página TIFF | 512 | Preflight page cap; otras capas estructurales también se aplican |
| Extracción y adquisición automática PDF | 50 MiB | Automático PDF texto / camino de adquisición; no lo tratan como el límite general de la carga de proyecto |

Aplicar los límites listados a la operación relevante: límites de vista previa, límites de carga y presupuestos de paquetes son separados. Para un archivo de sobredimensión, utilice el archivo original con un lector externo compatible o dividir la entrada según el método.

Una tabla que dice que **Mostrando filas 100** puede contener más filas de origen. Utilice el análisis de archivos real en el Notebook para establecer su tamaño. En el caso GSE60450, la fuente tiene filas de genes 27,179 mientras que la muestra QC CSV tiene doce filas: los dos archivos resumen diferentes unidades.

[Niveles de carga](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts), [CSV bounds](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx), [límites de texto-lector](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts), [Límites de oficina](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts), [Límites del TIFF](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts), [Límite de extracción PDF](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts).

## Producción de importación y citación de literatura {/* #literature-import-and-citation-output */}

| Tema | Contrato | Distinción |
| --- | --- | --- |
| Importación de referencia-record | BibTeX, RIS, NBIB | Importaciones bibliográficas; no garantiza el texto completo adjunto |
| Contenido de importación | Hasta 32 MiB, con un límite de disco 1,000 | Dividir colecciones más grandes en lotes revisados |
| Importación al estilo de la citación | CSL, hasta 1 MiB | Una definición de estilo, no una colección de literatura |
| Exportación de registros bíblicos | BibTeX o RIS | No asuma que la importación de NBIB implica la exportación de NBIB |
| Citation formatear locale | `en-US`, `zh-CN` | Citación local es separado de la aplicación UI idioma |
| Nombre de la colección | 200 caracteres | Una etiqueta de colección |
| Descripción de la colección | 1,000 caracteres | Describe la colección; no sustituye al agente del proyecto Context |

Un resultado de metadatos DOI no es un PDF. Un PDF adjunto no es evidencia de que el agente leyera su texto completo. Compruebe tanto el apego como el registro real de ejecución/evidencia.

[Esquemas y límites de la literatura](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts), [importador/formato de exportación](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts).

## Versión y descarga de identidad {/* #version-and-download-identity */}

| Identifier | Uso | No sustituya |
| --- | --- | --- |
| Nombre para mostrar | Encontrar un archivo en la interfaz | Un solo nombre no identifica contenido inmutable |
| Identificación de archivos/artifactos | Identificar el objeto gestionado | Un camino descargado no es la identidad de ese objeto |
| ID de la versión / `vN` | Inspeccione la revisión exacta guardada y su procedencia | El último contenido puede diferir de la versión utilizada para un resultado |
| Suma de comprobación | Compare bytes entre fuente y copias guardadas | Los nombres coincidentes no establecen compruebas coincidentes |
| Descarga el destino | Localizar una copia externa | Editar esa copia no actualiza automáticamente la versión gestionada |

Para los pasos de operación, utilice [Notebook y pruebas](../guides/notebook.md) y [flujo de trabajo público-datos](../workflows/data-quality.md). Esta referencia centraliza los límites para que esas guías puedan centrarse en la tarea.

Para controles específicos de formato, consulte [Controles de vista](../guides/previews.md#diagram-source-and-format-specific-controls): conmutación de fuente de sirena/rendered, la condición de lectura PDF de una página, tablas atadas, selección de hojas de trabajo y manejo de página TIFF. Previsualizar el soporte no establece la entrada o exportación de modelos exitosos.
