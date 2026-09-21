---
title: "Extienda un análisis con un Specialist instalado"
last_update:
  date: '2026-09-17'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Extienda un análisis con un Specialist instalado {/* #extend-an-analysis-with-an-installed-specialist */}

<p className="example-label"><strong>Ejemplo práctico</strong> Extender una parcela de concentración de teofilina con métricas de exposición observadas</p>

Utilice **Productos farmacéuticos PK/PD Design Specialist** para comprobar datos de tiempo de concentración, dibujar los perfiles, luego calcular métricas de exposición. Los entregables son una tabla de doce subjetos, un diagrama de concentración, un script R ejecutable y un informe de métodos. Este ejemplo describe los datos de investigación pública; no recomienda tratamiento o dosificación.

La entrada es el R público de [Conjunto de datos de Theoph](https://www.stat.ethz.ch/R-manual/R-devel/library/datasets/html/Theoph.html): Observaciones 132 de doce temas. El tiempo es en horas, concentración en mg/L, peso en kg y dosis en mg/kg. Los cálculos utilizan la base R, sin paquetes adicionales o credenciales de base.

## 1. Instalar y seleccionar el Specialist {/* #1-install-and-select-the-specialist */}

1. Abre **Settings → Specialists → Browse Marketplace**. Encuentre **Productos farmacéuticos PK/PD Design Specialist**, inspeccione sus capacidades, e instale. Este ejemplo utiliza el paquete **1.0.0** en Open-Science **0.30.1**.
2. En **Settings → Runtimes**, confirme que R es **Ready** y está habilitado. La ejecución registrada usó R **4.4.3**.
3. Abra una nueva conversación en su proyecto de investigación. Elige un modelo disponible, luego **Agent controls → Specialist → pharmacometrics-pkpd-designer**. La carrera registrada usó **Suscripción Codex / gpt-5.6-sol**.
4. Al comienzo de **cada mensaje de análisis**, escriba `/pkpd`, luego seleccione **pkpd-modeling** de las sugerencias. Confirme que se convierte en un chip Skill antes de pegar el impulso.

**Nota de la versión:** Las capturas de pantalla usan v0.30.1, donde el Skill se selecciona explícitamente para cada mensaje de análisis. Desde v0.30.2, Skills atado se preparan para giros Specialist y tareas delegadas. Seleccione el Specialist primero; si su Skill no está disponible, seleccione `/pkpd-modeling` explícitamente antes de enviar la solicitud.

![Instalación de Farmacometría Specialist y sus capacidades](/img/open-science/theoph-specialist/installed.webp)

![Seleccionar el Skill de modelado pkpd genuino para el mensaje actual](/img/open-science/theoph-specialist/skill-selection.webp)

## 2. Compruebe los datos y dibujar las curvas de concentración {/* #2-check-the-data-and-draw-the-concentration-curves */}

Con el Skill seleccionado, envía:

```text
Use the public R dataset datasets::Theoph in the enabled R Notebook.
Use base R only. Check rows, subjects, observations per subject,
missing values, duplicate subject-time records and the documented units.
Keep all observed time-zero concentrations unchanged.
Save theoph-input.csv, theoph-concentration-time.png and theoph-data-check.md.
Plot all 12 subjects with labelled axes and a legend.
Execute the code, reopen the saved files and report the actual checks.
Stop after this descriptive baseline. Do not calculate NCA metrics yet.
Do not install packages or delegate. Keep everything in English.
```

Inspeccione el código cuando aparezca **Run R code?**, y luego apruebe el cálculo. Abra **Notebook** para ver la salida de ejecución. La entrada registrada tiene **Renglones 132, súbditos 12 y observaciones 11 por tema**, sin valores perdidos o registros de tiempo sujeto duplicados.

Abra el CSV generado y la trama. Los sujetos 1, 7 y 10 tienen concentraciones no cero en el momento cero; estos se mantienen. El factor sujeto del conjunto de datos se ordena por máxima concentración, por lo que su orden mostrado no necesita ser numérico.

La vista previa del CSV muestra las primeras 100 filas; el archivo guardado contiene las 132 observaciones.

![La tabla de entrada guardada en Open-Science](/img/open-science/theoph-specialist/input.webp)

![La base de referencia ejecutada y doce curvas de tiempo de concentración](/img/open-science/theoph-specialist/baseline.webp)

Archivo de referencia: <ExampleDownload path="/examples/theoph/theoph-input.csv">entrada CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-concentration-time.png">compostura de concentración</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-data-check.md">Verificación de datos</ExampleDownload>.

## 3. Agregue las métricas de exposición {/* #3-add-the-exposure-metrics */}

Descargue el <ExampleDownload path="/examples/theoph/nca-conventions.md">NCA methods reference</ExampleDownload> y agréguelo a través de **+ → Attach files** para que Notebook pueda leerlo. Utilice esta referencia para el ejemplo: especifica Cmax/Tmax observado y todo lineal trapezoidal AUC, sin estimar una pendiente terminal.

Seleccione `/pkpd-modeling` de nuevo en la misma conversación, luego enviar:

```text
Read the attached reviewed nca-conventions.md methods reference.
Extend the baseline using the same theoph-input.csv and base R Notebook.
For each subject calculate observed Cmax (mg/L), earliest observed Tmax (h),
linear-trapezoidal AUC from time zero to the last observation (mg*h/L),
and the actual last-observation time (h).
Retain all observed time-zero values. Preserve the input hash.
Save theoph-nca-summary.csv, theoph-nca.R and theoph-nca-report.md.
The standalone script must read the CSV. Execute it, reread all 12 rows,
and compare its results with a separate Notebook calculation.
Explain the method, units, differing observation windows and limitations.
Register the three saved outputs as project files.
Do not estimate AUC to infinity, half-life, clearance or dosing advice.
Do not install packages, change permissions or delegate. Use English.
```

Inspeccione y apruebe el archivo leído y el cálculo R. Si falta un archivo de soporte, agréguelo antes de continuar. Si Notebook reporta un error, abra la célula fallida y corrija la entrada o dependencia nombrada antes de reintentar.

## 4. Abrir y comprobar los resultados {/* #4-open-and-check-the-results */}

Abra **theoph-nca-summary.csv** de los archivos generados. Debe haber una fila para cada uno de los doce sujetos. Compruebe las unidades y el tiempo de última observación, así como los valores métricos.

![Metrices de exposición a nivel de sujeto ahorradas](/img/open-science/theoph-specialist/results.webp)

| Asunto | Cmax (mg/L) | Tmax (h) | AUC0-last (mg·h/L) | Última observación h) |
| --- | --- | --- | --- | --- |
| 1 | 10.5 | 1.12 | 148.92305 | 24.37 |
| 2 | 8.33 | 1.92 | 91.52680 | 24.30 |

Abrir **theoph-nca-report.md** y **theoph-nca.R** juntos. El informe debe coincidir con el script ejecutado: ordenar las observaciones de cada sujeto a tiempo, tomar el máximo observado y su tiempo más temprano, luego resumir `(C1 + C2) × (t2 - t1) / 2` sobre las observaciones adyacentes. Las dos primeras filas arriba proporcionan una comparación rápida; comprobar las doce filas antes de aceptar una repetición.

Estas son métricas observadas. Los últimos tiempos de muestreo difieren entre sujetos, y la regla trapezoidal lineal es una aproximación explícita. Los resultados no establecen la exposición al infinito, un modelo farmacocinético o la incertidumbre de medición.

Descargar el <ExampleDownload path="/examples/theoph/theoph-nca-summary.csv">sumario CSV</ExampleDownload> grabado, <ExampleDownload path="/examples/theoph/theoph-nca.R">R script</ExampleDownload> y <ExampleDownload path="/examples/theoph/theoph-nca-report.md">Informe sobre los métodos</ExampleDownload>. Mantenga la entrada y script juntos cuando vuelva a correr fuera de la aplicación.

<span id="choose-a-finish-you-can-inspect" />
<span id="choose-inputs-for-an-installed-role" />
<span id="turn-an-existing-result-into-a-checked-methods-draft" />
<span id="inspect-qc-variation-with-the-packaged-pca-skill" />
<span id="transform-a-count-matrix-for-exploratory-plots" />
<span id="build-a-bounded-evidence-table-and-reanalysis-plan" />
<span id="handle-a-partially-completed-analysis" />
<span id="metadata-retrieval-blocked-by-the-local-network" />
<span id="keep-metadata-retrieval-separate-from-completed-analysis" />
