---
title: "Compruebe la calidad de la muestra en una matriz de cuenta de genes"
last_update:
  date: '2026-09-16'
---

# Compruebe la calidad de la muestra en una matriz de cuenta de genes {/* #check-sample-quality-in-a-gene-count-matrix */}

<p className="example-label"><strong>Ejemplo práctico</strong> Compruebe la calidad de la muestra en GSE60450</p>

Antes de realizar un análisis diferencial-expresión, compruebe que la matriz contable es estructuralmente usable y que las etiquetas de muestra siguen siendo rastreables. Este paseo utiliza el público real **GEO GSE60450** mamaria del ratón RNA-seq Matriz. Produce una tabla QC de 12 muestras, una trama de tamaño libre y un informe de métodos en Open-Science.

**Decisión de investigación:** es el archivo internamente lo suficientemente consistente para proceder a la anotación de muestra y un análisis estadístico diseñado por separado? Los cheques de abajo dirección integridad del archivo y conteos descriptivos. No establecen comparabilidad biológica, normalización, corrección de lotes o expresión diferencial.

Las dimensiones y los resultados numéricos a continuación pertenecen a esta entrada de ejemplo. Con su propia matriz, defina sus columnas de muestra y vuelva a computar los cheques.

## Contrato de fuentes e insumos {/* #source-and-input-contract */}

Descargar la matriz original de [Datos de ejemplo y resultados esperados](../reference/example-data.md). Revise su chequesum, muestre columnas y campos de metadatos antes de subirlo. Utilice esa página para los valores de referencia a lo largo de este flujo de trabajo.

## 1. Define el trabajo antes de ejecutarlo {/* #1-define-the-work-before-running-it */}

Crear un proyecto y adjuntar la matriz original de la página de ejemplo. Habilitar Python con `csv`, `statistics` y `hashlib` (librería estándar) e instalar `matplotlib` a través de [Entornos de ejecución](../guides/runtimes.md) si está ausente. Utilice un modelo conectado que puede ejecutar código Notebook.

Enviar esta solicitud, o adaptar los nombres de salida al tiempo que preserva las definiciones de columna:

```text
Inspect the attached public GEO GSE60450 gene-count matrix in the Session
Notebook using Python csv/statistics/hashlib and matplotlib. Do not install
packages during the analysis. Preserve the input. Exclude EntrezGeneID and
Length from the 12 sample-count columns. Validate unique IDs, row widths,
nonnegative integer counts and missing entries. Save rnaseq-sample-qc.csv
with exactly six columns: compact_sample, original_column_name, total_raw_counts,
zero_count_genes, detected_genes_count_gt_0, median_count_among_detected_genes. Retain the complete original sample
identifier in original_column_name; compact_sample is only a compact display label.
For each sample compute the raw-count sum, count of zeros, count > 0,
and median of positive counts. Save rnaseq-library-sizes.png with all sample
labels and a raw-count axis, plus rnaseq-qc-report.md describing the source,
input SHA-256 before and after, method, label mapping and limitations.
Save all three outputs in English; I will reopen them to check the results.
Do not perform differential-expression testing or delegate.
```

Antes de enviar, haga clic en el accesorio para comprobar su encabezado: dos columnas de metadatos seguidas por doce columnas de muestra. El texto previsualiza cargas sólo parte de un archivo grande; el Notebook debe leer toda la matriz. Esta ejecución envió el cálculo directamente. Si quieres estar de acuerdo en un plan primero, usa el flujo [Planificación](../guides/planning.md) separado.

![La matriz adjunta real y sus definiciones de columna](/img/open-science/research-workflows/rnaseq-qc-input.webp)

## 2. Mantener los metadatos fuera de los cálculos de muestras {/* #2-keep-metadata-out-of-sample-calculations */}

El cálculo conserva IDs de Entrez, verifica los anchos de fila y cheques consistentes cuenta como enteros no negativos. `Length` es metadatos de genes, no una decimotercera muestra. Un recuento cero es una entrada medida, no un valor perdido; no reemplazar los blancos con cero o eliminar los genes de cuenta cero en silencio.

Para cada muestra, computar los recuentos totales brutos, número de genes de cuenta cero, número con cuenta mayor que cero, y la mediana cuenta **entre los genes detectados solamente**. Registre ese denominador. Use las columnas de entrada exactas; etiquetas compactas como `MCL1-DG` son etiquetas de visualización con una asignación explícita, no grupos biológicos recién inferidos.

<span id="3-inspect-the-actual-execution" />

## 3. Inspeccionar la ejecución y manejar un fracaso {/* #3-inspect-the-execution-and-handle-a-failure */}

Lea la solicitud de permiso Python, incluyendo el archivo de entrada y los nombres de salida, y luego permita la operación con alcance. Abrir **Notebook** en la conversación e inspeccionar la célula completa y su salida. Verifique las dimensiones, las etiquetas originales, los arrays métricos y antes/después del hash; el mensaje de finalización del modelo es insuficiente.

Si el ID de la versión de entrada no puede ser resuelto, pídale al agente que lea la entrada y reingrese adjunta de esta conversación. Confirme el nombre de archivo y la suma de verificación antes de continuar.

![Salida Notebook exitosa con dimensiones, hashes y métricas de muestra calculadas](/img/open-science/research-workflows/rnaseq-qc-rerun-notebook.webp)

El ejemplo contiene **filas de genes 27,179 y columnas de muestra 12**, sin filas malformadas, identificaciones duplicadas, entradas faltantes o cuentas inválidas. Abra los tres archivos de salida bajo **Generated** para inspeccionar los resultados guardados.

## 4. Aceptar la tabla de la muestra {/* #4-accept-the-sample-table */}

Abra `rnaseq-sample-qc.csv` y compruebe **filas 12 · columnas 6**. Retiene cada nombre de columna original completo. En el cuadro que figura a continuación se enumeran las cuatro métricas; el CSV descargable incluye la columna de asignación.

Compare todas las métricas de muestra con el [Cuadro de referencia](../reference/example-data.md#sample-qc-baseline), hileras coincidentes por el identificador de muestra completo.

![La tabla QC de la muestra de doce hojas guardada](/img/open-science/research-workflows/rnaseq-qc-rerun-table.webp)

Para esta entrada, los genes detectados de cero cuenta más en cada fila deben igualar **27,179**. Compare las métricas de la muestra **48** con la base de referencia independiente. El acuerdo comprueba estos cálculos para la entrada suministrada; Las hipótesis de abajo todavía necesitan su propia evaluación.

## 5. Lea la trama sin sobreinterpretarla {/* #5-read-the-plot-without-overinterpreting-it */}

Abra `rnaseq-library-sizes.png` y agrandarla. Revise las doce etiquetas de muestra, el eje de cuenta cruda y la nota de que los valores no se normalizan. Los recuentos totales van desde **20,015,386** a **24,723,827** en esta matriz.

![La trama de tamaño librería salvada](/img/open-science/research-workflows/rnaseq-qc-rerun-plot.webp)

Un total de biblioteca más grande no significa por sí mismo que un gen se expresa de manera diferencial. Antes del análisis aguas abajo, combina características de muestra y identificadores GSM a las columnas de matriz utilizando metadatos GEO, luego especifica el diseño, contrastes, normalización y reglas de filtrado. Vea [Conectores](../guides/connectors.md) para recuperar metadatos.

## 6. Retener los métodos y las pruebas {/* #6-retain-the-methods-and-evidence */}

Mantenga un informe que contenga el checksum de entrada, dimensiones, comprobaciones de validez, cartografía exacta de etiquetas, versiones de tiempo de ejecución/libración y límites de interpretación. Agregue una sección de control independiente sólo después de comparar los valores. Ahorrar una revisión del informe no recomputa el cuadro o la figura.

Compare todas las métricas de muestra **48** con la base de referencia y compruebe que la entrada SHA-256 sigue siendo `128d2411f3169de0cac9963c30152bb5c9a3083ac80fd25651b97cf4b7304691`. El informe de ejemplo registra Python 3.12.14 y matplotlib 3.11.1; graba las versiones utilizadas en tu propio funcionamiento.

Descargar el ejemplo <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-sample-qc.csv" download>Cuadro QC</a>, <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-library-sizes.png" download>parcela</a> y <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-qc-report.md" download>informe</a>. Retenga su entrada original y sesión Notebook junto a las salidas. Utilice [Comprobaciones de reproducción](../guides/reproducibility.md) para preparar el medio ambiente y reequilibrar el cálculo.
