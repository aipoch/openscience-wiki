---
title: "Explorar herramientas"
last_update:
  date: '2026-11-20'
---

# Explorar herramientas {/* #explore-tools */}

Elija una herramienta por el resultado que necesita: recuperar un registro, inspeccionar un archivo, ejecutar un cálculo o conectar un servicio externo. La aplicación combina estas capacidades, pero tienen diferentes requisitos de configuración y evidencia.

## Elija una familia de herramientas {/* #choose-a-tool-family */}

| Necesidad | Empieza aquí. | ¿Qué debe estar listo? | Qué inspeccionar después |
| --- | --- | --- | --- |
| Leer archivos, planificar el trabajo, calcular o publicar resultados | [Herramientas de investigación integradas](./built-in.md) | Autorizaciones de entrada y operación accesibles para proyectos | Respuesta de la herramienta, archivo de salida y registro de ejecución |
| Encontrar páginas web públicas y leer texto fuente | [Búsqueda web](./web-search.md) | Agente Open-Science incorporado, modelo Main y red | URLs de origen, texto recuperado y cualquier truncación |
| Encontrar qué software científico utiliza un método | [Catálogo de herramientas científicas](./catalog.md) | Compruebe los paquetes/pesos por separado de la instalación Skill | Real ejecutable/importación y versión |
| Ejecute Python, R o una carga de trabajo científica | [Instrumentos científicos](./scientific.md) | Tiempo de ejecución seleccionado, paquetes o Compute Host | Código, errores, cheques de salida y procedencia |
| Registros biomédicos/científicos | [Bases de datos científicas](./databases.md) | Habilitado Connector, red y cualquier credenciales requeridas | IDs de origen, campos devueltos y truncación |
| Inspeccione los datos de CSV, TSV o hoja de cálculo | [Cuadros y conjuntos de datos](./tables.md) | Archivo compatible y entrada actual | Visibles hileras/columnas, delimitador y dimensiones de datos completos |
| Leer documentos, secuencias, estructuras y otras salidas | [Científicos](./viewers.md) | Formato compatible | Contenido reducido y cualquier limitación de previsualización |
| Conectar un servidor MCP | [Conectores y MCP](./mcp.md) | Configuración y confianza del servidor | Estado conectado y una respuesta real de la herramienta |
| Configurar una identidad de servicio/key | [C. credenciales de servicio](./credentials.md) | Servicio correcto y cuenta usable | Resultado de validación o una consulta en vivo |
| Exponga sus propios datos locales a través de una herramienta | [Herramienta MCP personalizada](./custom.md) | Un servidor de trabajo con un esquema de entrada | Descubrir, llamar con éxito y comportamiento de fracaso real |

## Disponibilidad tiene varios significados {/* #availability-has-several-meanings */}

**Listed** significa que la aplicación conoce un recurso. **Enabled** significa que el agente seleccionado puede utilizarlo. **Connected** confirma una sesión de Connector, pero no prueba que una consulta en particular es válida. **Ejecutado** significa que una herramienta realmente devolvió un resultado o error. **Verificado** significa que el resultado fue inspeccionado contra la tarea.

Los ejemplos locales incluyen los contados GSE60450 RNA-seq reales, un servidor QC personalizado sólo lectura, un artefacto de molécula de aspirina y entradas de secuencia/estructura públicas. Utilizan capturas de pantalla de aplicaciones en inglés en ambas ediciones de idiomas. La ejecución remota GPU/SSH y las credenciales no disponibles en este dispositivo se distinguen explícitamente de las operaciones locales terminadas.

![Personalizado QC Connector conectado en la aplicación](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

## Dar al agente una solicitud atada {/* #give-the-agent-a-bounded-request */}

Especifique la fuente, operación y salida esperada. Para una consulta de bases de datos, incluya el espacio de nombres identificadores y un pequeño límite de resultados. Para una computación, nombre la entrada, idioma seleccionado y cheques. Pida el error real si la herramienta no puede funcionar; una respuesta reconstruida de la memoria modelo no es una llamada de herramienta exitosa.

Un [Habilidad](../skills/overview.md) suministra el método; a [Especialista](../specialists/overview.md) proporciona un papel reutilizable. Tampoco instala automáticamente software, proporciona credenciales o hace que un archivo inaccesible esté disponible.

Referencia de implementación: [ConectoresPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx), [soporte de vista previa.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts).
