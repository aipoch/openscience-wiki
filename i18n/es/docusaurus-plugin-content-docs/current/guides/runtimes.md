---
title: "Horas de ejecución Python y R"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Horas de ejecución Python y R {/* #python-and-r-runtimes */}

Abra **Settings → Runtimes** para seleccionar los entornos Python y R disponibles para cuadernos y el Agente. El estado **Ready** de un entorno indica la detección/configuración exitosa; su interruptor **Enable** controla por separado la disponibilidad al agente.

Elija un entorno gestionado por aplicaciones o un intérprete existente. Inspeccione su camino, versión, Listo estado y Activar el interruptor antes de usar. El sistema R y R gestionados por aplicaciones pueden coexistir.

<span id="verification-still-required" />

<PlatformGuide />

## Elija un entorno para su proyecto {/* #before-choosing-an-environment-for-a-project */}

Grabar el nombre de intérprete, la ruta y la versión. Para un primer análisis de Python, prefiera el entorno aislado gestionado por aplicaciones, por lo que los cambios en paquetes no alteran un entorno de investigación no relacionado. Inspeccione **Packages** para las bibliotecas necesarias antes de solicitar la instalación. Un listado de paquetes exitoso es un cheque de sólo lectura; no otorga al agente permiso para modificar un intérprete externo.

Después de un fallo de ejecución, distinguir un intérprete no disponible, un paquete perdido, una solicitud denegada y un error de código. La reinstalación es adecuada para un tiempo de ejecución gestionado roto, no para cada análisis fallido. Si necesita reproducir un resultado, mantenga la versión de entrada y el código junto con los detalles de tiempo de ejecución.

## Comprender los controles principales {/* #understand-the-main-controls */}

| Control | Propósito y límite |
| --- | --- |
| **Recheck** | Refresh descubrió intérpretes y su estatus. El panel muestra la última vez. No está disponible durante el trabajo de configuración en conflicto. |
| **Network settings** | Configuración abierta para protección de red Notebook. El banner explica si las sesiones y descargas de paquetes están limitadas a dominios aprobados. |
| **Let the Agent create environments** | Controla si el Agente puede crear entornos y configurar tiempos de ejecución perdidos. Apagar esto no elimina los controles explícitos de configuración o reparación del usuario. |
| **Add interpreter…** | Abra el selector ejecutable del sistema para un intérprete existente. Seleccione el ejecutable real, luego confirme su ruta detectada y estado Listo. |
| **Download and set up** | Preparar un entorno gestionado por aplicaciones cuando no esté. |
| **Cancel** durante la configuración | Solicite la cancelación de la configuración de ejecución. Espera a que la operación se calme antes de comenzar otra. |
| **Retry setup** | Intentar una configuración infructuosa después de resolver su causa. |
| **Habilitar &#91;ambiente&#93;** | Ponga el entorno disponible para la selección de agentes. El desactivar un entorno en uso puede requerir una confirmación de impacto. |
| **Allow package install** | Consentimiento separado para un entorno Python o R externo habilitado. El consentimiento R se limita a una biblioteca personal seleccionada. La inclusión de paquetes no requiere el consentimiento de instalación. |
| **Paquetes &#91;cuenta&#93;** | Abra el inventario de embalaje instalado para ese intérprete. |
| **Reinstall** | Confirmación abierta antes de reconstruir un entorno gestionado por aplicaciones. |

## Instalar un entorno gestionado por aplicaciones {/* #install-an-app-managed-environment */}

<PlatformContent platform="windows">

Compruebe ambas tarjetas de idiomas en **Settings → Runtimes**. Cada uno tiene su propio estado **Ready**, versión, interruptor **Enable** y botón **Packages**. Las tarjetas de abajo muestran Python y R habilitados; la advertencia sobre ellos se refiere a la protección de la red Notebook, que se configura por separado. Los caminos personales están ocultos en estas imágenes; inspeccionar los caminos completos en su propio ordenador.

<Screenshot src="/img/open-science/windows/runtimes-ready.webp" alt="Windows tarjetas de tiempo de ejecución con Python y R gestionados y habilitados" width={1919} height={991} windowBounds={[480, 152, 960, 688]} href="/docs/img/open-science/windows/runtimes-ready.webp" linkLabel="Abra la pantalla Windows completa" />

</PlatformContent>

### Instalar Python gestionado por aplicaciones {/* #install-app-managed-python */}

<PlatformContent platform="macos">

![Ajustes de tiempo de ejecución antes de la configuración Python](/img/open-science/walkthrough-2026-09-08/34-runtimes-before-setup.webp)

</PlatformContent>
1. Encuentra a **Python → App-managed environment**.
2. Seleccione **Download and set up**.
3. Lea el mensaje de progreso y espere. **Cancel** se pone disponible mientras la configuración se ejecuta.
4. Sobre el éxito, confirme **conda: default-python**, **App-managed**, y **Ready**.
5. Compruebe la ruta del intérprete y el interruptor **Activar conda: default-python**.

<PlatformContent platform="macos">

![Creación del entorno Python gestionado por aplicaciones](/img/open-science/walkthrough-2026-09-08/36-runtime-setup-progress.webp)

</PlatformContent>
<PlatformContent platform="macos">

![Python setup complete](/img/open-science/walkthrough-2026-09-08/37-python-runtime-ready.webp)

</PlatformContent>
Confirme **Ready**, la ruta de intérprete seleccionada y el estado habilitado. Los recuentos y versiones de paquetes pueden variar con la fuente de instalación; no use la ruta temporal de la captura de pantalla como un entorno permanente.

### Instalar R gestionado por aplicaciones {/* #install-app-managed-r */}

1. Abrir **Settings → Runtimes** y desplazarse a **R**.
2. Bajo **App-managed environment**, seleccione **Download and set up**. Un sistema existente R no le impide instalar este entorno separado.
3. Espera a que la descarga y la creación del medio ambiente terminen. Mantenga la aplicación abierta y lea cualquier error antes de reintentar.
4. Confirme **conda: default-r**, **App-managed**, **Ready**, y un interruptor habilitado.
5. Abre **Packages**. Introduzca `r-base` en **Filter packages** para comprobar la versión y el canal R instalados; despejar el filtro para ver todos los paquetes.

<PlatformContent platform="linux">

![R gestionado por aplicaciones está listo y habilitado en Linux](/img/open-science/linux/r-managed-ready.webp)

</PlatformContent>

<PlatformContent platform="macos">

![Descarga del entorno R gestionado por aplicaciones](/img/open-science/guides-walkthrough/70-r-managed-download.webp)

</PlatformContent>
<PlatformContent platform="macos">

![R gestionado por aplicaciones instalado y habilitado](/img/open-science/guides-walkthrough/71-r-managed-ready.webp)

</PlatformContent>
Confirme que el filtrado `r-base` devuelve el paquete R instalado, con su versión y canal. Los totales del paquete reflejan su entorno y pueden diferir de la captura de pantalla.

<PlatformContent platform="macos">

![Comprobación de la base r en el inventario del paquete R](/img/open-science/guides-walkthrough/72-r-package-filter.webp)

</PlatformContent>
## Conectar un intérprete existente {/* #connect-an-existing-interpreter */}

<PlatformContent platform="windows">

Utilice **Add interpreter…** bajo el idioma indicado para abrir el buscador de archivos Windows. Seleccione el `python.exe` o `R.exe`, y luego elija **Open**. Para una ruta que contenga espacios, utilice el selector de archivos o su campo **File name**. Volver a Runtimes, comprobar la ruta y la versión detectadas, seleccionar **Recheck** y habilitar ese entorno. Sólo un receptor abierto no significa que se haya añadido un intérprete.

</PlatformContent>

### Utilice R ya instalado en su computadora {/* #use-r-already-installed-on-your-computer */}

Seleccione **Recheck** e inspeccione la ruta y versión detectada R. Si su intérprete está ausente, use **Add interpreter…** para seleccionar su ejecutable. **Ready** y **Enable** tienen diferentes significados: la detección confirma que el intérprete está disponible; habilitar hace que sea seleccionable por el Agente.

En un R Notebook, compruebe `R.home()` para confirmar el medio ambiente en uso. Para instalar dependencias, autorice una biblioteca personal usando el [pasos externos de instalación R](#external-r-packages).

<PlatformContent platform="macos">

Un camino detectado como `/opt/homebrew/bin/R` identifica una instalación del sistema.

</PlatformContent>

### Registro y uso externo Python {/* #register-and-use-external-python */}

<PlatformContent platform="linux">

Un intérprete de sistema como `/usr/bin/python3` puede aparecer como **Ready**. Permite el medio ambiente que se propone utilizar antes de pedirle al Agente que lo seleccione. Los intérpretes Python detectados a continuación son deshabilitados, y el entorno Python gestionado por aplicaciones no se ha establecido. Para preparar un entorno gestionado, utilice **Download and set up**.

![Linux detecta los intérpretes Python existentes como Listos, con sus interruptores de Activación apagado](/img/open-science/linux/python-detected-disabled.webp)

</PlatformContent>

1. Prepare el entorno Python que usted tiene la intención de utilizar.
2. Seleccione **Add interpreter…**, elija su ejecutable Python y verifique **Ready**, el camino y la versión.
3. Utilice **Recheck** para verificar la detección, y luego habilitar ese entorno específico.
4. Pídale al agente que lo seleccione explícitamente para el Notebook.
5. Imprimir `sys.executable` y la versión Python antes de confiar en sus bibliotecas instaladas.

<PlatformContent platform="macos">

Si un intérprete de enlace no puede ser seleccionado en el selector de archivo macOS, seleccione el ejecutable real del entorno deseado. Confirme `sys.executable` después de encuadernarlo. Utilice un camino de instalación estable en lugar de la ruta de ejemplo temporal de la captura de pantalla.

</PlatformContent>

#### Permiso del paquete y resultado de la instalación {/* #package-permission-and-installation-outcome */}

Para un nuevo paquete en un entorno Python externo, consulte **Allow package install** primero. Después de conceder permiso, espere a que la instalación termine y verifique la importación en el mismo entorno antes de continuar.

Si la instalación reporta `403 Forbidden` o `destination resolves to a non-public network address`, inspeccione el nombre de host afectado y siga [Red](network.md) antes de reintentar. Estos errores se refieren al acceso a la red y no prueban que el paquete no está disponible. Mantenga la protección de la red activada.

#### Desactivar un entorno utilizado por un Notebook {/* #disable-an-environment-used-by-a-notebook */}

Seleccione su interruptor **Enable** y lea el kernel activo/idle cuenta antes de confirmar. Desactivar puede cerrar el núcleo; después de volver a habilitar, seleccione un plazo disponible para la sesión de nuevo. Este panel proporciona controles de habilitación/desactivables en lugar de una acción **Quitar intérprete** separada.

## Instalar paquetes en R externo {/* #external-r-packages */}

Utilice esto cuando su intérprete R existente funciona pero necesita un paquete adicional. La aplicación otorga acceso a la instalación a una biblioteca personal existente, no a las bibliotecas del sistema o del sitio.

1. En **Settings → Runtimes**, active el entorno R externo previsto y confirme su trayectoria/versión.
2. Bajo **Personal R package library**, inspeccione la ubicación detectada o seleccione una biblioteca elegible. Si no se detecta ninguno, utilice **Advanced options → Choose library folder…** para seleccionar una biblioteca personal de escritura existente visible a ese intérprete R. Esta acción no crea una carpeta.
3. Activar **Allow package install**. Lea la ruta seleccionada antes de autorizar: otros proyectos que utilizan esta biblioteca pueden ver los cambios de paquete instalados.
4. Solicite el paquete requerido a través de la operación de gestión de paquetes de la aplicación, nombrando este entorno R. Siga el resultado de la instalación y cualquier instrucción de kernel-restart.
5. Ejecutar `R.home()`, `.libPaths()`, `library(PACKAGE_NAME)` y `packageVersion("PACKAGE_NAME")` en ese entorno, reemplazando el marcador de paquetes. Confirme que la biblioteca destinada se utiliza antes de continuar el análisis.

Apaga **Allow package install** para revocar el consentimiento de instalación futuro. No desinstala paquetes ya escritos. Revoque el consentimiento antes de elegir otra biblioteca. Si no existe una carpeta elegible, prepare una biblioteca personal R fuera de la aplicación o utilice un entorno gestionado por la aplicación; no elija la biblioteca del sistema para evitar un cheque fallido.

## Restaurar paquetes de cerraduras capturadas {/* #conditional-restore */}

Para un resultado guardado, abra **Provenance → Environment** e inspeccione el bloqueo capturado. Use **Download bundle** cuando se ofrezca. Lea las instrucciones y requisitos del paquete antes de restaurar cualquier cosa.

R externo requiere una instalación `renv` disponible y un `renv.lock` compatible; Python externo necesita una cerradura de requisitos compatibles con hahes pinificados. Un camino de intérprete y una lista de nombres de paquetes por sí solos no son suficientes. Los requisitos de intérprete, plataforma, arquitectura y gestión de paquetes capturados deben coincidir con el entorno de restauración.

Extraiga el paquete, elija un nuevo destino que usted posee, y ejecute su `restore-packages.py` incluido con los caminos de intérprete y destino reales, siguiendo las instrucciones enganchadas. El script revisa los requisitos y las sumas de verificación antes de restaurar los paquetes, y luego comprueba sus versiones y caminos efectivos. Si un cheque falla, resuelve esa condición en lugar de editar la cerradura para forzar el éxito. Open-Science no adopta o elimina este destino externo.

Esto es una restauración condicional de paquetes, no un clon de ambiente completo. Reabrir el resultado y utilizar [Reproducibilidad](reproducibility.md) cuando una receta capturada soportada está disponible para comparar los productos.

## Inspeccione los paquetes instalados {/* #inspect-installed-packages */}

Seleccione **Packages** en la tarjeta Python prevista. El diálogo muestra que el camino del medio ambiente, fuente de paquetes y estado.

Ingrese un nombre de paquete como `numpy` en **Filter packages**, inspeccione su versión y canal, y luego despeje el filtro para restaurar la lista. Usa **Close** para regresar.

<PlatformContent platform="macos">

![Filtrar los paquetes Python instalados](/img/open-science/walkthrough-2026-09-08/38-python-packages-filter.webp)

</PlatformContent>
Las columnas de la tabla son **Name**, **Version**, **Build**, y **Channel**. Un dash in Build significa que no se muestra valor de construcción. Este diálogo es un inventario: no tiene botones de instalación de paquetes o desinstalación. No busque un campo de “Install package” dentro de este diálogo.

<PlatformContent platform="windows">

En la tarjeta Python, seleccione **Packages** y filtro para `pip`. En la tarjeta R, filtro para `r-base`. Verifique el entorno nombrado en el título de diálogo antes de comparar las versiones. Estas capturas muestran paquetes instalados; no muestran una nueva instalación de paquetes.

<Screenshot src="/img/open-science/windows/python-packages.webp" alt="Windows Python paquete inventario filtrado a pip" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/python-packages.webp" linkLabel="Abra la pantalla Windows completa" />

<Screenshot src="/img/open-science/windows/r-packages.webp" alt="Windows R paquete inventario filtrado a r-base" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/r-packages.webp" linkLabel="Abra la pantalla Windows completa" />

</PlatformContent>

## Verificar el medio ambiente con un análisis real {/* #verify-the-environment-with-a-real-analysis */}

Ejecutar un pequeño cálculo en el entorno elegido, reabrir su salida y compararlo con el [Base de referencia compartida](../reference/example-data.md). Siga [R Notebook](notebook.md#run-the-same-gene-count-check-in-r) para la ejecución y exportación.

El [flujo de trabajo de calidad de los datos](../workflows/data-quality.md) proporciona una ruta Python utilizando dependencias existentes. Un cálculo exitoso no demuestra que se pueden instalar nuevos paquetes o reiniciar un kernel.

<PlatformContent platform="macos">

![Computación Notebook real exitosa](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>
Si una importación falla, inspeccione el tiempo seleccionado y sus paquetes instalados. Para una descarga rechazada porque un nombre de host se resuelve a una dirección reservada, siga [Red](network.md). El código de ejecución con los paquetes existentes no establece que se pueden instalar paquetes adicionales.

Antes de otro análisis, inspeccione sus paquetes requeridos en el entorno seleccionado. Utilice la operación de gestión de paquetes soportada si es necesario, lea el resultado real, siga cualquier requisito de reinicio, y verifique la importación. Una autorización de permiso, tarjeta de progreso o intérprete listo no es una prueba de importación.

Para un resultado guardado con incompleto medio ambiente o evidencia de ejecución, abra **Provenance** e inspeccione la información que falta. Para preparar una nueva versión para un control de reproducibilidad, siga [para la preparación del medio ambiente](reproducibility.md#prepare-environment). El emparejar un resultado numérico no llena la procedencia perdida.

### Confirme el intérprete activo {/* #confirm-the-active-interpreter */}

Después de preparar Python o R, ejecute los siguientes comandos en el idioma Notebook correspondiente para comprobar su versión y ruta reales. Los ajustes pueden enumerar varios entornos; utilizar la salida de la corriente para identificar la que se usa.

Python:

```python
import sys
print(sys.version)
print(sys.executable)
```

R:

```r
R.version.string
R.home()
```

A continuación, leer una pequeña tabla de proyectos, comprobar su recuento de filas y guardar el resultado. Después de reabrir la aplicación, ejecute el cheque nuevamente antes de continuar un análisis. Un informe histórico legible no significa que las variables anteriores en memoria todavía existan. Ver [Notebook y pruebas de ejecución](notebook.md) para los controles Notebook.

<PlatformContent platform="windows">

<p className="example-label"><strong>Ejemplo práctico</strong> Comprueba el intérprete Windows Python activo</p>

Para un cheque rápido antes de utilizar datos de investigación, pídale al Agente que ejecute los comandos Python version/path arriba en el **Sesión Notebook** y guarde su salida real en un informe de Markdown. Para comprobar la versión `pip` instalada también, agregue `import importlib.metadata` y `print(importlib.metadata.version("pip"))`.

Abra la salida del Notebook y compare con el informe guardado. Este ejemplo Windows 10 en Open-Science v0.28.0 informa Python **3.12.13** y `pip` **26.1.2**. Los metadatos del paquete de lectura no instalan ni importan ese paquete.

<Screenshot src="/img/open-science/windows/python-runtime-output.webp" alt="Windows Python Notebook mostrando el código ejecutado y su salida de la versión real" width={1920} height={1017} windowBounds={[1157, 0, 763, 472]} href="/docs/img/open-science/windows/python-runtime-output.webp" linkLabel="Abra la pantalla Windows completa" />

Para Windows conda R startup o fallos de recuperación del kernel, use v0.30.2 o más tarde antes de reintentar. La versión fija la vigilancia ejecutable después de la preparación del medio ambiente y la recuperación del kernel R. Después de actualizar, vuelva a revisar el medio ambiente y ejecute un pequeño cálculo R en Notebook; **Ready** solo no es un resultado de ejecución. Las capturas de pantalla a continuación conservan las versiones y los resultados de sus carreras originales.

Desde v0.31.0, Windows R puede funcionar en modo estándar sin establecer el primer modo protegido. Trate a **Activar el modo protegido antes de autorizar el acceso R.** de una versión más antigua como guía específica para la versión. Los permisos de protección de la red y de instalación de paquetes siguen siendo controles separados. En v0.31.1, una carrera bloqueada por la protección de la red Notebook muestra una advertencia en línea con un enlace al entorno pertinente; la celda no fue ejecutada. Revise el acceso requerido, luego vuelva a correr y compruebe la salida.

<span id="windows-runtime-qc" />

<p className="example-label"><strong>Ejemplo práctico</strong> Compruebe los entornos Windows Python y R con una tabla de muestra-QC</p>

El siguiente análisis utiliza otro ordenador Windows 11 y sus entornos Python/R existentes. Utilice los caminos y salidas desde su propio funcionamiento al comprobar su instalación.

Descargue el <a href="/docs/examples/gse60450/rnaseq-sample-qc.csv" download>muestra-QC CSV</a> y adjuntelo a una sesión de proyecto. Este es un resumen de doce hojas, con una fila por muestra. Los cheques a continuación leen sus métricas existentes; no recalculan la matriz original de la cuenta de genes. La descripción de la entrada y las definiciones métricas están en [Datos de ejemplo](../reference/example-data.md).

**Lea la tabla con Python.** Pregunte al agente para utilizar el entorno Python seleccionado en la sesión Notebook, con la biblioteca estándar solamente. Solicite `sys.version`, `sys.executable`, los cuatro cheques en la tabla de abajo y un informe de marcado guardado. Usa la ruta del archivo adjunto. Para comprobar que la lectura dejó la entrada sin cambios, calcula su SHA-256 antes de leer y de nuevo después de la reapertura del archivo.

Abra el informe guardado y su vista **Provenance → Code**. Compare el código capturado con el intérprete informado y los resultados. En este ejemplo, Python reporta la versión **3.12.13** y un final ejecutable en `runtime\envs\.p\python.exe`; la entrada tiene antes y después de la reapertura del partido.

El detalle a continuación muestra **Inputs** y el código capturado. Haga clic en la imagen para abrir la captura completa con el informe guardado junto a ella.

<Screenshot
  src="/img/open-science/windows/runtime-python-producer.webp"
  alt="Detalle de la vista del código Python del resultado Provenance, mostrando entradas y el código de productor capturado"
  width={2302}
  height={1158}
  windowBounds={[1385, 65, 917, 1030]}
  href="/docs/img/open-science/windows/runtime-python-producer.webp"
  linkLabel="Abra la captura de pantalla Windows Python completa con el informe guardado y el código capturado"
/>

**Lea la misma tabla con R.** Pregunte al agente para utilizar el entorno R seleccionado en la sesión Notebook, con base R solamente. Solicite `R.version.string`, `R.home()`, los mismos cuatro cheques y un informe guardado separado. Ampliar la tarjeta **Notebook run** para inspeccionar su código, luego abrir el informe y comparar los resultados. En este ejemplo, R reporta la versión **4.4.3** y un directorio de inicio que termina en `runtime/envs/.r/Lib/R`.

![Windows R Notebook llamada y reporte guardado que muestra la instalación R activa y resultados de muestra-QC](/img/open-science/windows/runtime-r-execution.webp)

Las rutas de instalación en estas capturas de pantalla pertenecen al ordenador de ejemplo. Las diferentes letras de disco, carpetas y versiones de intérprete en su propia máquina son normales.

Ambos informes dan los siguientes resultados para esta entrada:

| Check | Resultado en este ejemplo |
| --- | ---: |
| Renglones de datos | 12 |
| Distintos `original_column_name` valores | 12 |
| Sum of `total_raw_counts` | 269,027,617 |
| Remos donde `zero_count_genes + detected_genes_count_gt_0` iguales 27,179 | 12 |

Coincide con el camino de la carrera hacia el medio ambiente que se pretendía utilizar, y luego compare los resultados guardados con la tabla. Estas carreras utilizan la biblioteca estándar de Python y la base R; no requieren paquetes adicionales o demuestran que se pueden instalar nuevos paquetes.

</PlatformContent>

## Mantener y reparar entornos {/* #maintain-and-repair-environments */}

### Cancelar configuración y reingreso {/* #cancel-setup-and-retry */}

Durante **Download and set up**, elija **Cancel** y espere a **Configuración de tiempo de ejecución cancelada**. Elija **Retry setup**, espere a **Ready**, y abra **Packages** para inspeccionar el medio ambiente. No comience una segunda configuración mientras la primera operación todavía se está adaptando.

<PlatformContent platform="macos">

![Configuración cancelada y reingreso disponible](/img/open-science/local-todo-batch/29-setup-cancelled.webp)

</PlatformContent>
<span id="review-a-reinstall-before-committing-it" />

### Reinstalar un entorno gestionado {/* #reinstall-a-managed-environment */}

1. Guardar los informes necesarios y grabar cualquier paquete que hayas añadido.
2. Seleccione **Reinstall** en el entorno gestionado previsto.
3. Lea el aviso de impacto, luego elija **Reinstall runtime**.
4. Espere a **Ready** e inspeccione **Packages**.
5. Iniciar una nueva célula Notebook y reabrir sus entradas y salidas guardadas.

<PlatformContent platform="macos">

![Reinstalación de confirmación durante una sesión Notebook](/img/open-science/local-todo-batch/31-runtime-reinstall.webp)

</PlatformContent>
La reinstalación elimina y recrea el medio ambiente. En la recuperación ejercida, una célula activa fue cancelada con **Huir cancelado: el tiempo de ejecución se detuvo mientras esta célula estaba ejecutando.** La vieja historia de Notebook se mantuvo visible, pero su espacio de nombres ya no existía. Una célula fresca confirmó que una variable anterior estaba ausente; el CSV sin cambios todavía regresó las filas 12 y cuenta 269,027,617, y el informe guardado reabrido.

<PlatformContent platform="macos">

![Historia Notebook retenida después de que su núcleo fue detenido](/img/open-science/local-todo-batch/33-reinstalled-kernel-history.webp)

</PlatformContent>
Los archivos retenidos y la memoria del núcleo retenido son diferentes. Recrear variables reelaborando el código requerido. Los paquetes adicionales pueden necesitar reinstalación; la recuperación exitosa del entorno base no establece la recuperación de cada dependencia adicional.

### Construcción de desarrollo: micromamba no encontrada {/* #development-build-micromamba-not-found */}

El primer intento de la fuente no se pudo realizar antes de la provisión porque el proceso de desarrollo no podía localizar micromamba.

<PlatformContent platform="macos">

![Error real de la microromamba desaparecido en una construcción de fuente](/img/open-science/walkthrough-2026-09-08/35-runtime-micromamba-error.webp)

</PlatformContent>
La aplicación envasada incluye este binario. Para una construcción de fuentes, punto `OPEN_SCIENCE_MICROMAMBA_BIN` en un ejecutable de micromamba válido en el entorno de lanzamiento de ese proceso y reiniciar la instancia de desarrollo. Utilice el camino binario de una instalación compatible y confirme que es ejecutable antes de relanzar.

Esta variable de entorno es un detalle de configuración de desarrollo, no un campo en la página Runtimes. No borre un directorio de entorno para trabajar alrededor de este error de descubrimiento.

<PlatformContent platform="windows">

## Vista previa opcional WSL2 Bash {/* #wsl2-preview */}

Windows x64 puede utilizar el **Local Shell · WSL2 Bash Preview** opcional en **Settings → Runtimes**. Mantenga PowerShell a menos que su tarea necesite una cáscara Linux; WSL2 no es necesario para usar Open-Science en Windows.

Seleccione una distribución WSL2 y su **Linux user** no raíz exacta, luego elija **Save and check**. Siga las instrucciones de configuración de plataforma/distribución primero. Los cheques de lectura y los recursos de previsualización coincidentes deben pasar antes de que **Use WSL2 Bash** esté disponible; seleccionar una distribución por sí sola no la activa. Ejecute un pequeño comando de shell e inspeccione su resultado antes de comenzar una tarea más larga. Utilice la opción PowerShell para volver a la shell predeterminada.

Si la preparación fracasa, mantenga la razón reportada y continúe con PowerShell mientras la resolva. La instalación de componentes WSL puede requerir la aprobación del administrador Windows. Esta vista previa está separada de la elección de los intérpretes Python/R Notebook.

</PlatformContent>
