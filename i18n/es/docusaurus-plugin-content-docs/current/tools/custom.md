---
title: "Conecte una herramienta MCP personalizada"
last_update:
  date: '2026-09-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


import ExampleDownload from '@site/src/components/ExampleDownload';

# Conecte una herramienta MCP personalizada {/* #connect-a-custom-mcp-tool */}

<p className="example-label"><strong>Ejemplo práctico</strong> Consultar una tabla de QC pública a través de un servidor MCP local</p>

Este ejemplo expone una tabla pública RNA-seq QC a través de un pequeño servidor MCP local. Lee un CSV fijo y ofrece dos operaciones; no consulta la red, instala paquetes o modifica el conjunto de datos.

<PlatformGuide />

## Descargar el ejemplo actual {/* #download-the-actual-example */}

- <ExampleDownload path="/examples/capabilities/qc-mcp-server.py">qc-mcp-servidor.py</ExampleDownload>
- <ExampleDownload path="/examples/gse60450/rnaseq-sample-qc.csv">rnaseq-sample-qc.csv</ExampleDownload>

Guarda ambos archivos localmente y nota sus caminos completos. El servidor utiliza la biblioteca estándar de Python. Lee el CSV seleccionado al inicio, así que reinicie/reconéctalo deliberadamente si reemplaza esa entrada.

## Añádalo en Open-Science {/* #add-it-in-open-science */}

1. Abre **Settings → Connectors → Add connector → Local command**.
2. Establecer **Display name** a `GSE60450 QC`.
3. Elija **python3 — script file** como **Command**, o **Other…** con el camino ejecutable Python real en Windows.
4. Abre **Advanced settings**. Establecer el nombre de conector/ID a `gse60450-qc` y describirlo como acceso sólo lectura a la tabla QC guardada.
5. En **Arguments**, ponga el camino absoluto del script en la primera línea y el camino absoluto del CSV en la segunda. Cada línea es un solo argumento. No agregue citas de concha alrededor de un camino simplemente porque contiene espacios.
6. Dejar el medio ambiente vacío por este ejemplo. Revise el script del servidor, compruebe **I trust this connector**, luego **Add**.
7. Busque `GSE60450` y confirme **Connected** y disponibilidad a Main Agent.

<PlatformContent platform="macos">

![Configuración MCP local real](/img/open-science/capabilities-walkthrough/08-mcp-local-config.webp)

</PlatformContent>

<PlatformContent platform="macos">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="linux">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="windows">

```text
C:\Research data\mcp test\qc-mcp-server.py
C:\Research data\mcp test\rnaseq-sample-qc.csv
```

</PlatformContent>

Estas dos líneas son una plantilla de ruta, no caminos literales para pegar sin cambios. Si `python3` no está disponible para la aplicación, elija Otros y el camino ejecutable real. El lanzador seleccionado debe existir en este ordenador.

<PlatformContent platform="windows">

En Windows, utilice **Other…** para entrar en el camino completo a un `python.exe` instalado; el preset `python3` no establece que el comando existe. Confirme el camino de intérprete en [Entornos de ejecución](../guides/runtimes.md). Mantenga el script y las rutas CSV en dos líneas **Arguments** separadas, incluso cuando sus nombres de carpeta contienen espacios. No combinar los argumentos y argumentos ejecutables en un comando de shell.

</PlatformContent>

## Entradas de herramientas y salidas verificadas {/* #tool-inputs-and-verified-outputs */}

| Herramienta | Entrada | Contenido esperado real |
| --- | --- | --- |
| get_dataset_summary | Objeto vacío | GSE60450, URL fuente, nombre de archivo de entrada, filas 12 y identificadores de muestra completa |
| get_sample_qc | `sample_id` cuerda. | Las cuatro métricas QC de la muestra seleccionada |

Pregúntele al agente:

> Utilice el gse60450-qc Connector conectado. Llame a get_dataset_summary, luego get_sample_qc para MCL1-DG_BC2CTUACXX_ACTTGA_L002_R1. Informe sólo respuestas reales y preservar el CSV.

En este ejemplo, la aplicación nativa devolvió **Los números totales de 23,227,641, los genes de cuenta cero 8,664, 18,515 detectó genes y mediana 237** para esa muestra. La llamada de registro de datos-summary devolvió las filas 12. Estos coinciden con la mesa original de QC guardada.

<PlatformContent platform="macos">

![El Connector personalizado conectado con éxito](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

</PlatformContent>

<PlatformContent platform="windows">

Abra la actividad Notebook para ambas llamadas de herramientas, luego vuelva a abrir el JSON guardado y compare sus IDs de muestra y métricas con el CSV. El Windows ejecuta a continuación utiliza el ID de conector `gse60450-qc-win`; use su propio ID configurado en la solicitud.

![Windows llamadas locales MCP con salida JSON y Notebook](/img/open-science/windows/mcp-tool-results.webp)

</PlatformContent>

## Inspeccione el comportamiento del servidor y del error {/* #inspect-the-server-and-error-behavior */}

El servidor implementa MCP inicializa, ping, descubrimiento de herramientas y llama a stdio. Sus dos esquemas de herramientas se definen en el script descargable. La salida estándar es el canal de protocolo; añadir impresiones de depuración ordinarias allí puede romper la conexión. Los diagnósticos locales pertenecen al error estándar.

**Cartografía de errores conocida:** un nombre de muestra inválido puede aparecer como **connector_unavailable** en la aplicación incluso cuando el servidor personalizado devuelve un error de dominio específico. Comprueba el registro del servidor y valida el identificador de la muestra antes de reconectarse. Reportar desajustes persistentes utilizando [Solución de problemas](../guides/troubleshooting.md).

La aplicación descubre las herramientas del servidor durante la conexión. Use los nombres de operación descubiertos cuando llame a través de `host.mcp`; protocolo `tools/list` no es una herramienta de negocio. Inspeccione el script descargable para el esquema de entrada.

## Exportar y pasar a otra computadora {/* #export-and-move-to-another-computer */}

Elija el **Actions → Export** de la fila, seleccione el formato deseado e inspeccione la vista previa de configuración. La verdadera exportación advirtió que ambos caminos de discusión eran locales. **Save configuration** exporta la configuración, no el intérprete Python, script o CSV. Copia esos archivos por separado, actualiza los caminos, confirma la confianza local y repite ambas llamadas exitosas.

<PlatformContent platform="windows">

Para **MCP client config**, inspeccione `mcpServers`: este ejemplo exporta un servidor con un `command` y dos `args`. Las pantallas JSON escaparon de las barras traseras en los caminos Windows. En otra computadora, actualice los tres caminos a los archivos reales y vuelva a introducir ambas llamadas. Una configuración exportada no establece que el ordenador de destino esté conectado.

</PlatformContent>

| Fallo | Check |
| --- | --- |
| Comando no puede empezar | Carril ejecutable, ruta de script y permisos de archivo |
| CSV no se puede leer | Segundo argumento y ubicación real de archivos |
| Conectado pero no disponible | asignación de agentes, catálogo actual y nombre exacto de herramienta |
| Mala entrada | Requerido `sample_id` y el identificador completo original, no la etiqueta de la trama compacta |
| error Connector después de una llamada fallida | Inspeccione los detalles del error del servidor/aplicación y vuelva a conectarse cuando sea apropiado |
| Funciona en un terminal pero no en la aplicación | Ejecutar/environmentar visible y protocolo-sólo stdout |

Para ampliar el ejemplo, definir un esquema de entrada pequeño, identificadores de origen de retorno y probar entradas normales, vacías e inválidas antes de exponer la herramienta. Mantenga estas operaciones lo suficientemente estrechas que un usuario pueda inspeccionar lo que la llamada leerá o cambiará.

Referencia de implementación: [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx), [service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/service.ts).

Para gestionar la misma configuración personalizada MCP de scripts, utilice [comandos Connector CLI](../reference/cli.md#manage-connectors-and-credentials) o [Métodos SDK](../reference/api.md#connector-management-methods). Una prueba de conexión exitosa descubre herramientas; verifique una llamada de negocios ligada separada antes de llamar a la integración operacional.
