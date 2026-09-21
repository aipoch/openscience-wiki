---
title: "Instalación y actualizaciones"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Instalación y actualizaciones {/* #installation-and-updates */}

La mayoría de los usuarios deben instalar el paquete de escritorio de GitHub Releases. Los colaboradores, o cualquier persona que pruebe el código más nuevo, pueden ejecutar la aplicación de la fuente. Open-Science es una aplicación Electron; su renderizador también soporta el acceso del navegador local protegido por token.

<PlatformGuide />

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

</PlatformContent>

La carpeta de instalación contiene la aplicación; **Data location**, en el asistente de configuración, contiene los archivos de investigación y los entornos de ejecución. Estas ubicaciones se configuran por separado. Después de instalar, continúe con la [configuración inicial](onboarding.md).

### Huir de la fuente {/* #run-from-source */}

Necesitas Git, Node.js 22, npm, y la plataforma construye requisitos para Electron. Instala o selecciona un marco de agente en la aplicación. Durante la instalación, el repositorio genera el Cliente Prisma, aplica parches de aplicaciones y prepara dependencias nativas de Electron.

Para una instalación de origen reproducible, elija la etiqueta de lanzamiento prevista de [Cambio](../changelog/v0.31.1.md) antes de instalar dependencias. Un clon predeterminado sigue la rama en lugar de una liberación fija. Grabar las versiones seleccionadas de etiqueta, fuente commit y tiempo de ejecución para que otra persona pueda reproducir el ambiente.

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

`npm run build` comprueba TipoScript, luego construye el renderizador de electrones, precarga y objetivos principales. Si sólo necesita probar el punto de entrada web o sin cabeza, utilice los argumentos de sin cabeza existentes del repositorio con un directorio de datos separado. Eso mantiene los datos de prueba fuera de la tienda predeterminada.

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
