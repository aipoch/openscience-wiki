---
title: "Instalación y actualizaciones"
last_update:
  date: '2026-10-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Instalación y actualizaciones {/* #installation-and-updates */}

La mayoría de los usuarios deben instalar el paquete de escritorio de GitHub Releases. Los colaboradores, o cualquier persona que pruebe el código más nuevo, pueden ejecutar la aplicación de la fuente. El cliente de escritorio Electron se conecta a un backend Node compartido, que también sirve la interfaz autenticada del navegador local.

<PlatformGuide />

**Disponibilidad v1.0.0:** [Esta liberación](https://github.com/aipoch/open-science/releases/tag/v1.0.0) contiene paquetes de escritorio sólo, sin archivos CLI independientes o Linux CLI `.deb`/`.rpm` paquetes. Descargue de esa página y verifique contra su `SHA256SUMS.txt`. Las descargas del sitio web y los canales de actualización automática se promueven por separado, por lo que un cheque no puede ofrecer 1.0. Las instalaciones de escritorio todavía proporcionan **Settings → General → Command line tool → Install command**.

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

Homebrew selecciona Apple Silicon o Intel automáticamente. Después de la instalación, abra **Settings → General → About** y confirme la versión instalada; un gestor de paquetes puede resolver una versión más reciente que la base de documentación. [Instrucciones de instalación etiquetadas](https://github.com/aipoch/open-science/blob/v0.27.0/README.md).

</PlatformContent>

<PlatformContent platform="windows">

Los instaladores oficiales de Windows se firman con código desde v0.33.2; v0.33.3 extiende la firma a los ejecutables agrupados. Descargue desde el [página oficial de descarga](https://aipoch.com/open-science/download) o [GitHub Releases](https://github.com/aipoch/open-science/releases), y siga las notas oficiales de verificación para comprobar la fuente del paquete.


| Computadora | Identificar la arquitectura | Paquete e instalación |
| --- | --- | --- |
| Windows | Ajustes → Sistema → Acerca → Tipo de sistema | Elija la coincidencia `win-…-setup.exe`; ejecutar el instalador de usuario actual y seguir sus indicaciones de ubicación |

1. Abra el instalador Windows descargado y proceda a la página de instalación-ubicación.
2. Mantenga la ubicación predeterminada o seleccione **Browse…** para elegir una carpeta para la aplicación, a continuación, seleccione **Install**.
3. Espera la página de finalización. Deja la opción de lanzamiento seleccionada y elige **Finish** para abrir Open-Science.
4. Siga [Configuración de primera vez](onboarding.md) para comprobar el entorno y configurar la ubicación de datos, agente y modelo.

</PlatformContent>

<PlatformContent platform="linux">

| Computadora | Identificar la arquitectura | Paquete e instalación |
| --- | --- | --- |
| Ubuntu / Debian | `uname -m`: `x86_64` significa x64, `aarch64` significa ARM64 | Elija la coincidencia `.deb`, abrirlo con el instalador de paquetes del sistema, luego lanzar desde el menú de aplicación |
| Otras distribuciones Linux apoyadas | Check `uname -m` | Elija la coincidencia `.AppImage`, permitir la ejecución en los permisos del archivo, y luego abrirlo; resolver cualquier error de dependencia reportado por la distribución |

v1.0.0 proporciona paquetes Linux **x64 y ARM64** . Para ARM64, seleccione `aipoch-open-science-1.0.0-linux-arm64.AppImage` o `aipoch-open-science_1.0.0_arm64.deb`. Los contrapartes x64 son `aipoch-open-science-1.0.0-linux-x86_64.AppImage` y `aipoch-open-science_1.0.0_amd64.deb`. Descarga de los activos oficiales de la versión seleccionada y coincide con el resultado de `uname -m`.

</PlatformContent>

La carpeta de instalación contiene la aplicación; **Data location**, en el asistente de configuración, contiene los archivos de investigación y los entornos de ejecución. Estas ubicaciones se configuran por separado. Después de instalar, continúe con la [configuración inicial](onboarding.md).

### Use el CLI independiente {/* #standalone-cli */}

**Los pasos de empaquetado independiente a continuación se aplican a las versiones que en realidad las enviaron, como por ejemplo [v0.37.2](https://github.com/aipoch/open-science/releases/tag/v0.37.2), no a los activos de v1.0.0.** Usa esa versión anterior sólo deliberadamente. Mantenga las versiones de escritorio/backend coincidan y no señale un backend más antiguo en los datos escritos por una aplicación más reciente. Para la entrada de línea de comandos 1.0, instale el lanzador suministrado por su aplicación de escritorio y siga [CLI setup](../reference/cli.md#terminal-setup).

#### Homebrew CLI {/* #homebrew-cli */}

Una instalación de Homebrew CLI existente se gestiona a través de `brew install aipoch/tap/open-science`, separadamente de la carcasa de escritorio. Revise la versión realmente ofrecida por Homebrew; publicación de 1.0 en GitHub no establece que la fórmula ha avanzado. La instalación no inicia un servicio de sistema. Si los lanzadores entran en conflicto, inspeccione `type -a open-science` y use `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"` para esa instalación.

#### Paquetes Linux CLI {/* #linux-cli-packages */}

Esta tabla conserva el método de instalación **v0.37.2** Linux CLI; v1.0.0 no publica estos paquetes CLI. `open-science-cli` está separado del paquete de escritorio `aipoch-open-science`. Si necesita esa versión anterior, obtenga el activo y `CLI-PACKAGE-SHA256SUMS.txt` de [v0.37.2 Assets](https://github.com/aipoch/open-science/releases/tag/v0.37.2), a continuación, verifique antes de instalar.

| Distribución / arquitectura | Activo v0.37.2 CLI |
| --- | --- |
| Debian / Ubuntu, x64 | `open-science-cli_0.37.2_amd64.deb` |
| Debian / Ubuntu, ARM64 | `open-science-cli_0.37.2_arm64.deb` |
| Fedora, x64 | `open-science-cli-0.37.2-1.x86_64.rpm` |
| Fedora, ARM64 | `open-science-cli-0.37.2-1.aarch64.rpm` |

Instala el archivo descargado con el administrador de paquetes adecuado. Estos ejemplos utilizan x64; utilice el nombre de archivo ARM64 cuando corresponda.

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_0.37.2_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-0.37.2-1.x86_64.rpm
```

Corre `open-science-cli start --no-open`, luego `open-science-cli status --json`. Una vez que se ejecuta, utilice `open-science-cli url` para abrir la interfaz web local autenticada; mantener esa URL privada. Continúe con [CLI setup](../reference/cli.md#terminal-setup) para la configuración del modelo y los cheques `doctor`, reemplazando `open-science` con `open-science-cli` en esos comandos.

Los paquetes de Node, el backend y la interfaz de usuario web. No instala Python/R ni crea un servicio de sistema iniciado automáticamente. Los requisitos de la tienda y de la caja de arena de OS todavía se aplican; ver [credenciales de Linux sin cabeza](../reference/server.md). Utilice `open-science-cli` explícitamente cuando un lanzador de escritorio también está instalado.

Antes de actualizar o eliminar el paquete, terminar el trabajo y detener **cada perfil iniciado por ese paquete**. Instalar el siguiente paquete descargado a través de apt/dnf; no hay un repositorio AIPOCH apt/dnf configurado por esta instalación. La eliminación de paquetes preserva datos de investigación y credenciales. El [guía oficial del paquete](https://github.com/aipoch/open-science/blob/v0.37.2/docs/standalone-runtime.md#linux-cli-distribution-packages) describe conflictos de comandos y requisitos de plataforma.

### Huir de la fuente {/* #run-from-source */}

Necesita Git, Node.js 24, npm, y la plataforma construye requisitos para Electron. Instala o selecciona un marco de agente en la aplicación. Durante la instalación, el repositorio genera el Cliente Prisma, aplica parches de aplicaciones y prepara dependencias nativas de Electron.

Para una instalación de fuente reproducible, elija la etiqueta de lanzamiento prevista de [Cambio](../changelog/v1.0.0.md) antes de instalar dependencias. Un clon predeterminado sigue la rama en lugar de una liberación fija. Grabar las versiones seleccionadas de etiqueta, fuente commit y tiempo de ejecución para que otra persona pueda reproducir el ambiente.

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

Utilice el paquete de la etiqueta seleccionada.json y [guía de tiempo libre](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md) para sus objetivos de construcción y dependencias. `npm run dev:web` desarrolla el punto de entrada Node/Web; `npm run dev` también prepara al cliente de escritorio. Utilice un directorio de configuración aislado para mantener los datos de prueba separados.

## Configuración completa por primera vez {/* #complete-first-time-setup */}

### Servicios externos y plazos de ejecución {/* #external-services-and-runtimes */}

| Capacidad | ¿Obligatorio? | Propósito |
| --- | --- | --- |
| OpenCode, Claude Agent, Codex, o CodeBuddy | Al menos uno | Dirige sesiones de agente de conversación |
| Acceso modelo | Necesario para solicitudes de agentes | Una suscripción compatible o proveedor de API; acceso a la suscripción no requiere una tecla API separada |
| Python o R | Facultativo | Ejecuta el código de cuadernos; utilizar un entorno de sistema detectado o un entorno gestionado por aplicaciones |
| Acceso a la red | Recomendado | Instala tiempo de ejecución y conecta proveedores, GitHub, servicios remotos y conectores MCP |
| SSH host | Facultativo | Ejecuta trabajos remotos y recupera resultados a través del panel Compute |

### Datos locales {/* #local-data */}

El asistente de configuración muestra la ubicación de datos gestionados para archivos de investigación grandes como artefactos, archivos Notebook y entornos. Los ajustes de aplicación y el historial de conversaciones permanecen en la ubicación de configuración. Moving the research data location is not a complete application backup. Mantenerlo separado del repositorio de origen; use [Almacenamiento](storage.md) para reubicarlo en lugar de mover archivos internos manualmente mientras la aplicación se ejecuta.

## Confirme que la aplicación está lista {/* #installation-is-complete-when */}

La aplicación se abre, el paso de verificación de entorno requerido, un agente se instala, y el acceso modelo se verifica. La configuración Python/R solo se requiere para trabajos que ejecuten esos idiomas. Abrir una vista previa CSV o PDF no valida un tiempo de ejecución Notebook. Siga [Configuración de primera vez](./onboarding.md), luego [Proveedor y configuración del modelo local](./providers.md).

## Comprobar actualizaciones de la aplicación {/* #choose-a-reproducible-version-and-update-deliberately */}

En **Settings → General → About**, lee la versión instalada y utilice **Check now** para comprobar la disponibilidad de actualización. Inspeccione la versión listada antes de instalarla, y termine el trabajo activo primero. Una fuente de desarrollo puede reportar actualizaciones de forma diferente de una instalación envasada. Mantenga una copia de los resultados exportados importantes antes de una actualización; no renombrar los directorios de datos internos de la aplicación.

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

1.0 retiene las rutas de actualización e importación históricas existentes; el número de versión no requiere un reseteo de perfil. El [Política de compatibilidad 1.x](https://github.com/aipoch/open-science/blob/v1.0.0/docs/compatibility.md) cubre las interfaces documentadas de CLI/SDK y de automatización de tareas, las importaciones de paquetes `.science` válidos y las actualizaciones de perfiles soportadas. No garantiza respuestas modelo idénticas, disponibilidad de terceros o reproducción determinista de toda una sesión de investigación, o transferencia de formularios de credenciales protegidas por el sistema operativo. Seguridad fija el objetivo de la última liberación estable.
