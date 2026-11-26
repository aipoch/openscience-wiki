---
title: "Instalación y actualizaciones"
last_update:
  date: '2026-11-25'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Instalación y actualizaciones {/* #installation-and-updates */}

La mayoría de los usuarios deben instalar el paquete de escritorio de GitHub Releases. Los colaboradores, o cualquier persona que pruebe el código más nuevo, pueden ejecutar la aplicación de la fuente. El cliente de escritorio Electron se conecta a un backend Node compartido, que también sirve la interfaz autenticada del navegador local.

<PlatformGuide />

**Paquetes actuales:** [v1.3.4 Assets](https://github.com/aipoch/open-science/releases/tag/v1.3.4) incluye instaladores de escritorio, archivos CLI independientes y paquetes Linux CLI `.deb`/`.rpm`. Elija el tipo de instalación y la arquitectura previstos, a continuación, verifique la suma de comprobación de la misma versión. El lanzador de escritorio sigue disponible a través de **Settings → General → Command line tool → Install command**.

## Elija un método de instalación {/* #choose-an-installation-method */}

### Descargar un instalador de escritorio {/* #install-the-desktop-app */}

1. Abre [Open-Science Releases](https://github.com/aipoch/open-science/releases).
2. Descargue el paquete que coincida con su sistema operativo y la arquitectura de CPU.
3. Lea la licencia mostrada por el instalador y la instalación completa, a continuación, inicie la aplicación. Un mago de montaje de cinco pasos se abre en la primera carrera.
4. Si el sistema operativo bloquea una aplicación no firmada, descarguela de nuevo del repositorio oficial AIPOCH GitHub y siga el aviso de seguridad de la plataforma sólo después de comprobar la fuente.

Elija desde el **Activos** conectado a la liberación, no el código fuente generado automáticamente ZIP. La disponibilidad depende de los activos publicados de esa publicación.

<PlatformContent platform="macos">

| Computadora | Identificar la arquitectura | Paquete e instalación |
| --- | --- | --- |
| macOS, Apple Silicon | Acerca de este Mac muestra un chip de la serie M de Apple | Elija `mac-arm64.dmg`; abrirla, arrastrar la aplicación a Aplicaciones, luego lanzarla allí |
| macOS, Intel | Acerca de este Mac muestra un procesador Intel | Elija `mac-x64.dmg`; instalar en Aplicaciones. La aplicación requiere macOS 12 o posterior |

**Instalar con Homebrew**

También puede instalar con Homebrew:

~~~bash
brew install --cask open-science
~~~

Homebrew selecciona Apple Silicon o Intel automáticamente. Después de la instalación, abra **Settings → General** y confirme la versión instalada; un gestor de paquetes puede resolver una versión más reciente que la base de documentación. [Instrucciones de instalación etiquetadas](https://github.com/aipoch/open-science/blob/v0.27.0/README.md).

</PlatformContent>

<PlatformContent platform="windows">

Los instaladores oficiales de Windows se firman con código desde v0.33.2; v0.33.3 extiende la firma a los ejecutables agrupados. Descargue desde el [página oficial de descarga](https://aipoch.com/open-science/download) o [GitHub Releases](https://github.com/aipoch/open-science/releases), y siga las notas oficiales de verificación para comprobar la fuente del paquete.


| Computadora | Identificar la arquitectura | Paquete e instalación |
| --- | --- | --- |
| Windows | Ajustes → Sistema → Acerca → Tipo de sistema | Elija la coincidencia `win-…-setup.exe`; ejecutar el instalador de usuario actual y seguir sus indicaciones de ubicación |

1. Abra el instalador Windows descargado y proceda a la página de instalación-ubicación.
2. Mantenga la ubicación predeterminada o seleccione **Browse…** para elegir una carpeta para la aplicación, a continuación, seleccione **Install**.
3. Espera la página de terminación. Deja la opción de lanzamiento seleccionada y elige **Finish** para abrir Open-Science.
4. Siga [configuración inicial](onboarding.md) para comprobar el entorno y configurar la ubicación de datos, agente y modelo.

</PlatformContent>

<PlatformContent platform="linux">

| Computadora | Identificar la arquitectura | Paquete e instalación |
| --- | --- | --- |
| Ubuntu / Debian | `uname -m`: `x86_64` significa x64, `aarch64` significa ARM64 | Elija la coincidencia `.deb`, abrirlo con el instalador de paquetes del sistema, luego lanzar desde el menú de aplicación |
| Otras distribuciones Linux apoyadas | Check `uname -m` | Elija la coincidencia `.AppImage`, permitir la ejecución en los permisos del archivo, y luego abrirlo; resolver cualquier error de dependencia reportado por la distribución |

v1.3.4 proporciona paquetes Linux **x64 y ARM64** . Para ARM64, seleccione `aipoch-open-science-1.3.4-linux-arm64.AppImage` o `aipoch-open-science_1.3.4_arm64.deb`. Los contrapartes x64 son `aipoch-open-science-1.3.4-linux-x86_64.AppImage` y `aipoch-open-science_1.3.4_amd64.deb`. Descarga de los activos oficiales de la versión seleccionada y coincide con el resultado de `uname -m`.

</PlatformContent>

La carpeta de instalación contiene la aplicación; **Data location**, en el asistente de configuración, contiene los archivos de investigación y los entornos de ejecución. Estas ubicaciones se configuran por separado. Después de instalar, continúe con la [configuración inicial](onboarding.md).

### Use el CLI independiente {/* #standalone-cli */}

Para una instalación terminal/browser, descargar un standalone que coincida CLI archivo desde [v1.3.4](https://github.com/aipoch/open-science/releases/tag/v1.3.4). It packs Node, the backend and Web UI. Extraiga el directorio completo, luego siga [CLI setup](../reference/cli.md#terminal-setup). Mantenga el CLI y backend de la misma instalación juntos.

#### Homebrew CLI {/* #homebrew-cli */}

Instala o administra el Homebrew CLI con `brew install aipoch/tap/open-science`, separadamente de la carcasa de escritorio. Revise la versión realmente ofrecida por Homebrew; la fórmula puede retrasarse detrás de una liberación de GitHub. La instalación no inicia un servicio de sistema. Si los lanzadores entran en conflicto, inspeccione `type -a open-science` y use `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"` para esa instalación.

#### Paquetes Linux CLI {/* #linux-cli-packages */}

Para el uso de terminal/browser Linux, elija **open-science-cli**, por separado del paquete de escritorio **aipoch-open-science**. Descargue el paquete de coincidencia y `CLI-PACKAGE-SHA256SUMS.txt` de [v1.3.4 Assets](https://github.com/aipoch/open-science/releases/tag/v1.3.4), a continuación, verifique antes de instalar.

| Distribución / arquitectura | Activo v1.3.4 CLI |
| --- | --- |
| Debian / Ubuntu, x64 | `open-science-cli_1.3.4_amd64.deb` |
| Debian / Ubuntu, ARM64 | `open-science-cli_1.3.4_arm64.deb` |
| Fedora, x64 | `open-science-cli-1.3.4-1.x86_64.rpm` |
| Fedora, ARM64 | `open-science-cli-1.3.4-1.aarch64.rpm` |

Instala el archivo descargado con el administrador de paquetes adecuado. Estos ejemplos utilizan x64; utilice el nombre de archivo ARM64 cuando corresponda.

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_1.3.4_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-1.3.4-1.x86_64.rpm
```

Corre `open-science-cli start --no-open`, luego `open-science-cli status --json`. Una vez que se ejecuta, utilice `open-science-cli url` para abrir la interfaz web local autenticada; mantener esa URL privada. Continúe con [CLI setup](../reference/cli.md#terminal-setup) para la configuración del modelo y los cheques `doctor`, reemplazando `open-science` con `open-science-cli` en esos comandos.

Los paquetes Node, el backend y Web UI. No instala Python/R ni crea un servicio de sistema iniciado automáticamente. Los requisitos de la tienda y de la caja de arena de OS todavía se aplican; ver [credenciales de Linux sin cabeza](../reference/server.md). Utilice `open-science-cli` explícitamente cuando un lanzador de escritorio también está instalado.

Antes de actualizar o eliminar el paquete, terminar el trabajo y detener **cada perfil iniciado por ese paquete**. Instalar el siguiente paquete descargado a través de apt/dnf; no hay un repositorio AIPOCH apt/dnf configurado por esta instalación. La eliminación de paquetes preserva datos de investigación y credenciales. El [guía oficial del paquete](https://github.com/aipoch/open-science/blob/v1.3.4/docs/standalone-runtime.md#linux-cli-distribution-packages) describe conflictos de comandos y requisitos de plataforma.

### Huir de la fuente {/* #run-from-source */}

Necesitas Git, Node.js 24, npm, y la plataforma construye requisitos para Electron. Instala o selecciona un marco de agente en la aplicación. Durante la instalación, el repositorio genera el Cliente Prisma, aplica parches de aplicaciones y prepara dependencias nativas de Electron.

Para una instalación de fuente reproducible, elija la etiqueta de lanzamiento prevista de [Cambio](../changelog/v1.3.4.md) antes de instalar dependencias. Un clon predeterminado sigue la rama en lugar de una liberación fija. Grabar las versiones seleccionadas de etiqueta, fuente commit y tiempo de ejecución para que otra persona pueda reproducir el ambiente.

Reemplazar `RELEASE_TAG` abajo con la etiqueta exacta mostrada en la versión seleccionada (incluyendo su `v`) líder. Para seguir el desarrollo en curso, omitir `--branch RELEASE_TAG --depth 1`; que el checkout seguirá la rama predeterminada.

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

Antes de empaquetar una producción, ejecute:

```bash
npm run build
```

Utilice el paquete de la etiqueta seleccionada.json y [guía de tiempo libre](https://github.com/aipoch/open-science/blob/v1.3.4/docs/standalone-runtime.md) para sus objetivos de construcción y dependencias. `npm run dev:web` desarrolla el punto de entrada Node/Web; `npm run dev` también prepara al cliente de escritorio. Utilice un directorio de configuración aislado para mantener los datos de prueba separados.

## Configuración completa por primera vez {/* #complete-first-time-setup */}

### Preparar el primer inicio {/* #external-services-and-runtimes */}

| Capacidad | ¿Obligatorio? | Propósito |
| --- | --- | --- |
| Open-Science Agent integrado | Incluido; predeterminado en una nueva configuración | Ejecuta conversaciones sin instalar un framework Agent por separado |
| Codex / Claude Agent / OpenCode / CodeBuddy / Pi | Opcional | Instale o detecte el entorno de ejecución solo si elige un framework externo |
| Acceso modelo | Necesario para solicitudes de agentes | Una suscripción compatible o proveedor de API; acceso a la suscripción no requiere una tecla API separada |
| Python o R | Facultativo | Ejecuta el código de cuadernos; utilizar un entorno de sistema detectado o un entorno gestionado por aplicaciones |
| Acceso a la red | Recomendado | Instala tiempo de ejecución y conecta proveedores, GitHub, servicios remotos y conectores MCP |
| SSH host | Facultativo | Ejecuta trabajos remotos y recupera resultados a través del panel Compute |

### Datos locales {/* #local-data */}

El asistente de configuración muestra la ubicación de datos gestionados para archivos de investigación grandes como artefactos, archivos Notebook y entornos. Los ajustes de aplicación y el historial de conversaciones permanecen en la ubicación de configuración. Moving the research data location is not a complete application backup. Mantenerlo separado del repositorio de origen; use [Almacenamiento](storage.md) para reubicarlo en lugar de mover archivos internos manualmente mientras la aplicación se ejecuta.

## Confirme que la aplicación está lista {/* #installation-is-complete-when */}

La aplicación se abre, las comprobaciones de entorno requeridas se completan, el Agent elegido está listo y activo, y la conexión al modelo está verificada. Open-Science Agent está incluido en la aplicación; solo un framework externo elegido requiere instalación o detección por separado. La configuración Python/R solo se requiere para trabajos que ejecuten esos idiomas. Abrir una vista previa CSV o PDF no valida un tiempo de ejecución Notebook. Siga [Configuración de primera vez](./onboarding.md), luego [Proveedor y configuración del modelo local](./providers.md).

## Comprobar actualizaciones de la aplicación {/* #choose-a-reproducible-version-and-update-deliberately */}

En **Settings → General**, lee la versión instalada y utilice **Check now** para comprobar la disponibilidad de actualización. Inspeccione la versión listada antes de instalarla, y termine el trabajo activo primero. Una fuente de desarrollo puede reportar actualizaciones de forma diferente de una instalación envasada. Mantenga una copia de los resultados exportados importantes antes de una actualización; no renombrar los directorios de datos internos de la aplicación.

Desde 1.0, `open-science update` es eliminado. Actualice la aplicación a través de sus controles de escritorio o instalador oficial, y actualice una instalación CLI a través del administrador de instalador/paquete que la posee. Si **Check now** aún no ofrece una versión publicada, compruebe la página oficial de lanzamiento; Eliminar la configuración o restablecer la aplicación no promoverá un canal de actualización.

<PlatformContent platform="macos">

Si aparece **Instale Open-Science antes de actualizar**, la aplicación se ejecuta desde una ubicación de sólo lectura. Elija **Instalar en Aplicaciones**, o mueva la aplicación allí en Finder. Después de la instalación, utilice **Reiniciar** o deje de copiar y vuelva a abrir el que está en Aplicaciones, a continuación, consulte las actualizaciones de nuevo. **Seguir usando** mantiene abierta la copia actual; no hace que esa ubicación sea actualizable. Si la instalación falla, siga el error mostrado antes de reintentar.

</PlatformContent>

<PlatformContent platform="windows">

La reinstalación conserva los datos existentes. Si usted necesita deliberadamente un nuevo comienzo después de un problema de datos, vea [Reiniciar los datos locales Windows](troubleshooting.md#windows-data-reset). Esta herramienta separada elimina los datos; no es parte de una actualización ordinaria.

</PlatformContent>

## Instalación de solución de problemas y puesta en marcha {/* #first-checks-when-startup-fails */}

| Donde falla | Primeros cheques |
| --- | --- |
| Instalación de escritorio o lanzamiento de aplicaciones | Compruebe la fuente del paquete, OS y la arquitectura de CPU, a continuación, lea el indicador del sistema operativo. |
| Instalación de fuentes | Confirmación `node --version` y `npm --version`, y eso `npm install` completado. Ingrese una instalación de dependencia interrumpida. |
| configuración inicial | Lea la comprobación del entorno fallida y resuelva su requisito declarado antes de continuar. |
| Primera solicitud de agente | Confirme un agente activo/acústico y corra **Test connection** en la página Modelo. |
| Proveedor o conexión del navegador local | Inspeccione el error de puerto, proxy o certificado reportado; ver [Solución de problemas](troubleshooting.md). |

## Nombre del producto después de v0.31.0 {/* #product-name */}

La interfaz actual y los nuevos paquetes utilizan **Open-Science** de forma consistente. Actualizar preserva los nombres de instalación y ubicaciones existentes, datos de investigación, credenciales y ajustes. Un camino de instalación más antiguo que contiene `Open Science` no es por sí mismo un fallo de actualización; no renombrar o mover sus carpetas de datos para que coincida con el nuevo nombre de la pantalla.

## Actualizar a 1.0 y entender la compatibilidad {/* #version-compatibility */}

1. Terminar la investigación activa y respaldar el directorio de configuración más cualquier ubicación de datos configurada por separado. Una exportación `.science` no es una copia de seguridad de todo el perfil.
2. Cerrar instancias de escritorio/backend utilizando la instalación, luego actualizar a través del instalador oficial. Preserve el perfil original, los datos y la tienda de credencial OS.
3. Reabrir y comprobar la versión, proyectos, sesiones, archivos, modelo y tiempos de ejecución antes de continuar. Una bajada binaria no retrocede los datos; Los binarios antiguos no pueden leer datos guardados más nuevos.

1.0 conserva las rutas históricas de actualización e importación existentes; el número de versión no requiere un reajuste de perfil. El [1.x política de compatibilidad](https://github.com/aipoch/open-science/blob/v1.3.0/docs/compatibility.md) cubre las interfaces documentadas de CLI/SDK y de automatización de tareas, las importaciones de paquetes válidos de `.science` y las actualizaciones de perfiles compatibles. No garantiza respuestas modelo idénticas, disponibilidad de terceros o reproducción determinista de toda una sesión de investigación, o transferencia multiplataforma de credenciales protegidas por el sistema operativo. Seguridad fija el objetivo de la última liberación estable.

## Instalar el CLI con npm {/* #npm-cli */}

Use Node.js **22.13 o más tarde** para el paquete CLI/backend publicado. En un terminal, instalar e inspeccionar la versión invocada:

```bash
npm install --global --include=optional @aipoch/open-science@1.3.4
open-science version --json
open-science help
```

Luego siga [terminal setup](../reference/cli.md#terminal-setup) para inicializar un perfil, inicie su backend y configure un modelo. La instalación por sí sola no lo inicia ni instala Python/R. Si un lanzador de escritorio o de Homebrew ya utiliza el mismo nombre de comando, inspeccione lo ejecutable que su shell selecciona antes de continuar. Detener todos los backend que posean una instalación antes de actualizar esa instalación; conservar su perfil y actualizar a través de su gestor original de paquetes.

## Siga una actualización hasta la instalación {/* #update-progress */}

En **Settings → General**, lee la versión instalada y elija **Check now**. Revise la versión ofrecida y el estado de descarga y preparación del diálogo de actualización. La terminación de la descarga no es la terminación de la instalación; verifique la versión instalada después de relanzamiento.

En las instalaciones estables compatibles, **Automatically download updates** controla la preparación en segundo plano y está activado de forma predeterminada. Puede desactivarlo y seguir comprobando y descargando manualmente. La descarga automática exige confirmar que la conexión no tiene restricciones ni cobro por volumen de datos, y que hay suficiente espacio libre. Si no se puede clasificar la red, falta espacio o no se puede escribir en la ubicación, use el método manual.

| Plataforma | Comportamiento automático eligible | Cuándo utilizar la instalación manual |
| --- | --- | --- |
| macOS | Una actualización preparada elegible puede instalarse cuando deje la aplicación | Solo volúmenes de lectura, Translocación de aplicaciones, instalaciones inequívocas o canales no compatibles |
| Windows | Preparar una actualización para el próximo lanzamiento una vez que el espacio de trabajo esté listo y el escritorio está ocioso en el fondo | La preparación está bloqueada, el canal no está soportado o el instalador se ofrece en su lugar |
| Aplicación LinuxImage | Preparar la actualización del próximo lanzamiento en el fondo; mantener el camino de AppImage existente | El caché de actualización es inequívoco, el espacio es insuficiente o el formato del paquete no es compatible |

Terminar el trabajo activo y permitir la limpieza Notebook para completar antes de dejar o reiniciar. Utilice **Restart to update** o **Open installer** según el diálogo, a continuación, verifique la versión y los proyectos originales. Linux DEB y las instalaciones independientes CLI siguen su propio [canal de instalación](#manual-update); un espacio de trabajo web no es un equipo de escritorio.

Si la preparación falla o la instalación automática no está disponible, use **Installation instructions** y el paquete oficial. No obligue a la aplicación cerrada durante la limpieza.

## Instalar una actualización manualmente {/* #manual-update */}

En el diálogo de actualización, abierto **Installation instructions**. Uso **Download from website** si no tienes un paquete. Para un instalador descargado confirmado, elija **Show in Finder**, **Show in File Explorer** o **Show in file manager**, dependiendo de la plataforma. Mantenga la carpeta abierta mientras deja la aplicación.

Guardar el trabajo y esperar la instalación o limpieza activa para terminar antes de comenzar otro instalador. En macOS, abre el DMG o descomprime el paquete y reemplaza Open-Science in Applications. En Windows, ejecute el instalador usando la carpeta de instalación existente. En Linux, instale el DEB correspondiente o reemplace la AppImage y conserve el permiso ejecutable. Siga las instrucciones para su formato de paquete real.

Si el instalador está desaparecido o ha cambiado, descargarlo de nuevo; revelar un paquete no lo ejecuta. Reabrir Open-Science y comprobar **Settings → General**, luego confirme sus proyectos y datos originales. Al actualizar archivos independientes CLI, primero [verificar que todos los servicios afectados han dejado de](../reference/server.md#application-update-behavior).

## Compruebe los datos de investigación después de una actualización de Windows {/* #windows-update-data */}

El instalador de Windows v1.0.6 preserva los datos de investigación almacenados junto a la aplicación y fija la instalación en las rutas de carpeta profundas. Terminar el trabajo activo, mantener una copia de seguridad de proyectos importantes, luego utilizar el instalador oficial para la actualización. Después de la reapertura, comprobar **Settings → Storage**, abrir un proyecto existente y confirmar que sus archivos están disponibles antes de reanudar una tarea.

La solución de conservación no es una copia de seguridad o permiso para mover datos gestionados a mano. Usar el [Controles de almacenamiento](storage.md) al cambiar su ubicación.

## Manejas bloqueadores de preparación de actualización {/* #update-preparation */}

Terminar el trabajo activo antes de instalar una actualización. Si la preparación nombra un proceso de bloqueo, cierre el programa pertinente normalmente y vuelva a entrar. Evite obligar a los procesos no relacionados a dejar de fumar. v1.0.8 corrige varios cheques de ocupación macOS y Windows; el bloqueador restante del diálogo todavía necesita atención.

Si la instalación automática no está disponible, utilice el enlace de ayuda manual de instalación en **Settings → General**, descargue el paquete oficial de coincidencia y compruebe su chequesum. Después del relanzamiento, confirme la versión instalada y los proyectos originales. Si la recuperación falla, recoger el registro de diagnóstico de General; retiene el error subyacente para la solución de problemas.

### macOS descargas diferenciales {/* #differential-updates */}

Desde v1.2.0, una actualización compatible macOS puede descargar sólo bloques cambiados de la imagen de la aplicación. Si ese camino no está disponible o no puede ser validado, el actualizador se vuelve al paquete completo. Por lo tanto, una descarga más grande no es por sí misma un fracaso. Deja que la descarga termine, completa preparación de actualización y confirma la versión instalada después de relanzamiento. La instalación automática sigue el [plataforma y condiciones de canal](#update-progress).

## Actualización desde v1.3.0 cuando la instalación está bloqueada {/* #update-from-130 */}

Si v1.3.0 dice que otro proceso está utilizando la instalación incluso después de que el trabajo activo haya terminado, su actualizador puede haber confundido un proceso de fondo de propiedad de la aplicación para un bloqueador externo. Descargue el paquete oficial v1.3.1 para su plataforma, deje completamente Open-Science y detenga su servicio de fondo, luego siga el [Pasos de instalación manual](#manual-update). Para un perfil gestionado por CLI, compruebe [estado de servicio y parar](../reference/server.md#lifecycle-commands) antes de reemplazar los archivos.

Repita la aplicación, confirme v1.3.1 en **Settings → General**, y compruebe sus proyectos originales y su ubicación de datos. Se conservan perfiles y datos de investigación. Esta solución se aplica a las actualizaciones iniciadas desde v1.3.1; un paquete recién descargado no puede cambiar el actualizador que todavía se ejecuta en v1.3.0.
## Actualizaciones Windows de v1.3.4 {/* #windows-134 */}

v1.3.4 reconoce al agente incorporado y al ayudante de imagen como procesos de propiedad de la aplicación durante la preparación de la actualización. Si un actualizador anterior sigue reportando uno de estos como bloqueador después de terminar el trabajo, utilice el [instalador manual oficial](#manual-update) en lugar de forzar los procesos para dejar de funcionar. Confirme la versión y los proyectos originales después de la relanzamiento; el nuevo paquete no puede reparar un actualizador que todavía se ejecuta en una versión anterior.

Actualizaciones Stable Windows restauran las deltas de instalación compactas en v1.3.4. v1.3.3 usó un instalador completo. Una descarga de paquete completo puede ser un inconveniente y no indica por sí mismo el fracaso.
