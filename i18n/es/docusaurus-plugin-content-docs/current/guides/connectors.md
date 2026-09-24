---
title: "Conectores y credenciales"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Conectores y credenciales {/* #connectors-and-credentials */}

Un Connector pone a disposición de un agente las herramientas de un servicio. Un Credential suministra autenticación cuando ese servicio lo requiere. Instalar un Skill o asignar una etiqueta no conecta el servicio.

En la gestión de lotes, revise el recuento seleccionado en el área de acción inferior antes de aplicar una operación. Lea la finalización o la retroalimentación del fallo allí, a continuación, verifique los elementos resultantes. La selección de una entrada por sí sola no permite, instala o elimina.

## Utilice un Connector incorporado {/* #use-a-built-in-connector */}

### Buscar herramientas para un proyecto de expresión génica {/* #find-tools-for-a-gene-expression-project */}

Abrir **Settings → Connectors**, buscar **Archivos de Omics**, y abrir su detalle. Esta familia incorporada incluye herramientas GEO, ArrayExpress, MetaboLights, MGnify y PRIDE. Ampliar una fila de herramientas antes de elegirla.

![Herramienta de metadatos GEO y su límite de descarga explícita](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series` devuelve metadatos de la serie GEO, muestras, plataformas y URLs de archivo complementario. Descargue la tabla de datos requerida de la fuente devuelta y adjuntela a su proyecto antes de solicitar un cálculo.

Asignar una etiqueta como **Transcripciónomics** a un Connector, y luego encontrarla bajo **Settings → Tags**. Etiquetas organizan recursos sin cambiar el acceso o la aprobación de herramientas.

| Estado | Lo que establece | Siguiente verificación |
| --- | --- | --- |
| Listado en Directorio | La aplicación conoce una definición Connector | Lea sus descripciones de herramientas reales |
| Used by | Disponibilidad de agentes | Confirme el agente y la unión de la capacidad previstos |
| Credencial seleccionado | Existe una unión de nombre | Prueba de autenticación contra el servicio previsto |
| Política de herramientas | Si las llamadas se permiten, se solicita o bloquea | Inspección de permiso recordado precedencia |
| Resultado exitoso de la herramienta | Esa llamada en particular terminada | Validar sus identificadores/datos devueltos y fuente |

### Controles Connector incorporados {/* #built-in-connector-controls */}


Use **Search connectors** para encontrar PubMed bajo **Directory**; la lista también contiene grupos **Featured** y **Custom**. Filtrar se aplica por grupo, por lo que otro grupo puede decir **No hay conectores que coincidan con su búsqueda** mientras que un resultado coincidente sigue siendo visible a continuación.

Utilice **Filter connectors by group**, **Filter Connectors by agent**, y **Filter by Tag** junto con la búsqueda. **Manage credentials** abre la configuración de contacto/credencial compartida. **Used by** muestra disponibilidad; **Manage Tags** organiza un Connector. Utilice el control **Manage access** del recurso para revisar y ajustar el acceso para los agentes y especialistas Main en un solo lugar.

#### Gestionar el acceso de cada agente {/* #resource-access */}

1. Busque un Connector bajo **Settings → Connectors** y elija su control **Manage access**.
2. Revise **Agente principal** y los Especialistas listados. Busque la lista de funciones cuando esté disponible. Cambiar sólo la asociación prevista; el editor de funciones sigue siendo otra manera de gestionar su lista de capacidades.
3. Repita el popup y compruebe **Used by**. Se puede asignar un enlace a un Specialist discapacitado; asignarlo no permite ese papel.

![Acceso Connector para Agente Main y Especialistas individuales](/img/open-science/v0330/resource-access.webp)

Para un papel con **Full access**, excluyendo este Connector crea una excepción por fuente. Un papel con acceso seleccionado utiliza su lista explícita. Los enlaces de papel de mercado pueden ser leídos solo aquí. Las credenciales, la preparación del servidor y la aprobación de la operación son separadas de estas asociaciones; asignar un Connector no completa esos pasos.

#### Activar o deshabilitar varios conectores {/* #enable-or-disable-several-connectors */}

Abrir **Settings → Connectors**, filtrar la lista, elegir **Select multiple** en el grupo correspondiente y seleccionar los conectores previstos. Revise el recuento seleccionado antes de habilitarlos o desactivarlos, a continuación, verifique cada estado devuelto. Mantenga sólo los servicios necesarios para su trabajo habilitado. Los cambios de disponibilidad a granel no suministran credenciales, cambian las políticas de aprobación por taburete o conceden un acceso a Specialist; Configure los por separado.

#### PubMed: disponibilidad, herramientas y política de aprobación {/* #pubmed-availability-tools-and-approval-policy */}

1. Busque **PubMed** y abra su detalle.
2. Ampliar **search_articles** para leer su descripción. Devuelve un conteo y página de PMIDs y soporta las etiquetas de consulta PubMed, operadores booleanos, fechas y clasificación.
3. Elija **Require approval**, **Block** o **Always allow** para el acceso que desee permitir. Exhibición de la aprobación **Ask when no Session, Project, or Global permission applies.**
4. En **Manage access**, active **Main Agent** para PubMed y compruebe **Used by**. Revise por separado cada Specialist que deba tener acceso en la misma ventana.

![Controles de descripción y aprobación de herramientas PubMed](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

Los detalles enumeran `search_articles`, `get_article_metadata`, `find_related_articles`, `lookup_article_by_citation`, `convert_article_ids`, `get_full_text_article` y `get_copyright_status`. Elija **Always allow**, **Require approval** o **Block** por herramienta. Revise el interruptor Connector de toda **Skip approvals** separado antes de habilitarlo. Abrir una descripción solo muestra las instrucciones de la herramienta.

El directorio colocó PubMed bajo **Directory**, mientras que su detalle muestra una placa **Featured**. La ubicación del directorio y las insignias no indican el estado de conexión de la cuenta.

<ToolOperationGroup>
<summary>Ejecutar una pequeña búsqueda de metadatos GEO</summary>

### Ejecutar una pequeña búsqueda de metadatos GEO {/* #run-a-small-geo-metadata-lookup */}

<p className="example-label"><strong>Ejemplo práctico</strong> Busque metadatos de muestras GSE60450 en GEO</p>

1. Volver a la sesión de investigación y confirmar un modelo de trabajo y disponibilidad de Archivos Omics.
2. Pregunta: `Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. Inspeccione el Connector/método solicitado y los argumentos antes de permitirlo. La herramienta espera un array `accessions`; un campo singular adivinado es incorrecto.
4. Revise el resultado real. Para esta adhesión, compruebe el **GSE60450** devuelto, **Mus musculus**, **Muestras 12**, y el título “Análisis de transcriptomo de las subpoblaciones de células luminales y basales en la glándula mamaria lactante versus embarazada”.
5. Mantenga los identificadores GSM devueltos con sus características. No inferir un mapeo a los nombres de columnas MCL1 de la matriz sólo de parecido.

![Características reales de la muestra GEO retornadas a través de Connector](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

El rango de muestra devuelto fue **GSM1480291–GSM1480302**, cubriendo las poblaciones luminal/basal y virgen, el embarazo 18.5-día y las etapas de lactancia 2. Estos son metadatos devueltos, no etiquetas inferidas de los totales del recuento. La tabla completa de respuesta de doce brazos fue descargada como <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>geo-sample-metadata.csv</a>. Esta es una exportación de mesa de conversación, separada de los artefactos QC gestionados.

Si el archivo de instrucción Connector no se puede leer, mantenga su error EPERM y compruebe el Connector habilitado y la sesión actual. Confirme los campos de operación en [Parámetros Connector](../reference/connector-operations.md) antes de reintentar. Una consulta válida de metadatos devuelve registros estructurados; no descarga la tabla fuente subyacente o realiza un análisis.


</ToolOperationGroup>

## Agregue el conector: campos de identidad compartidos {/* #add-connector-shared-identity-fields */}

**Add connector** ofrece **Local command**, **Remote server**, y **Import configuration**. Los dos primeros abren un editor con un selector de tipo, y **Advanced settings** expone campos adicionales. Las capturas de pantalla utilizan un punto final ilustrativo; conectar un servidor que realmente desea utilizar.

| Campo | Propósito |
| --- | --- |
| Tipo de conector | Cambiar entre un proceso local y un punto final remoto. |
| Nombre para mostrar | Nombre mostrado en la UI. |
| Avanzado → Connector nombre | Nombre de llamada utilizado por `host.mcp`, Specialist bindings, y el MCP Skill generado; generada a partir del nombre de la pantalla cuando sea posible. |
| ID del conector | Identificación estable opcional, generada cuando sea posible. Editable antes de la creación, inmutable después. |
| Descripción | Explicación opcional de los datos/acciones facilitados. |
| Confío en este conector | Requiere el reconocimiento de confianza antes de añadir un Connector personalizado. No valida el servicio o hace que su código sea seguro. |
| Cancelar / Volver a los conectores | Deja el formulario. No guarda el borrador. |
| Añadir conector / Añadir y firmar en | Guardar la configuración válida y, para OAuth, iniciar sesión. El botón sigue desactivado mientras faltan campos, acoplamientos o confianza necesarios. |

### Comando local {/* #local-command */}

**Command** ofrece `npx — Node package`, `uvx — Python (uv)`, `node — script file`, `python3 — script file`, `docker — container`, y **Other…**. Otros exponen **Custom command** para un camino ejecutable absoluto.

| Entrada avanzada | Operación |
| --- | --- |
| Argumentos | Un argumento por línea; espacios y líneas en blanco se conservan. Borrar el campo para eliminar todos los argumentos. No asuma que un comando de shell separado del espacio es analizado en múltiples argumentos. |
| Nombre de variable | Nombra una variable de entorno, luego selecciona/crea su Credential. |
| Agregar variable / Quitar variable | Agregue o retire un enlace llamado. |
| Campos / Texto | Introduzca nombres como filas estructuradas o uno `KEY=` por línea; los valores secretos viven en Credenciales. |
| Previsualización del comando | Inspeccione el lanzador mostrado después de los enlaces. |

![Editor local de comandos y variables de entorno con límites credencial](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

Una entrada de lanzadores por sí sola no prueba que su ejecutable o servicio está operativo. Utilice la invocación a continuación para comprobar el comando local importado.

### Servidor remoto {/* #remote-server */}

Introduzca el **Server URL** real suministrado por el operador del servidor. `https://example.org/mcp` en estas capturas de pantalla es una dirección de dominio reservado ilustrativa, no un punto final MCP en funcionamiento.

**Advanced → Transport** predeterminado a **Streamable HTTP**. **Authentication** ofrece **None**, **OAuth (browser sign-in)**, y **Static headers**.

#### Encabezados estáticos {/* #static-headers */}

El editor actual se une a las credenciales nombradas; no es un área de texto de valor secreto.

1. Elige **Static headers**.
2. Introduzca un **Header name**, como `Authorization`.
3. Seleccione o cree el **Credential** correspondiente. El selector está deshabilitado hasta que el encabezado tenga un nombre.
4. Utilice **Add header** para otra fila o **Remove header** para descartar una fila.
5. **Campos / Texto** cambia cómo se introducen los nombres. El modo de texto espera un nombre de encabezado por línea como `Name:`; Los valores credenciales se gestionan por separado.

![Nombre del encabezado estático y selector credencial](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### OAuth binding {/* #oauth-binding */}

Elija un **OAuth credential** que coincida con la URL del recurso, el transporte y el registro. **New credential** abre el [credencial editor](../tools/credentials.md#new-credential). En este perfil vacío, el formulario reportó **No OAuth credential matches this Connector's resource URL, transport, and registration.** La acción final cambia a **Add and sign in**.

![OAuth credential matching](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## Pruebas de importación, exportación y conexión {/* #import-export-and-connection-tests */}

Elija **Add connector → Import configuration** y seleccione un archivo JSON hasta 256 KB. El importador acepta una configuración Open-Science Connector o un archivo cliente MCP que contiene `mcpServers`.

1. Para un archivo multi-servidor, elija una entrada en **MCP server**. Revisa y agrega un servidor a la vez. Revise su nombre, ID, transporte y argumentos de comando después de cambiar entradas.
2. Lee los diagnósticos. Los caminos absolutos pueden necesitar cambiar en otro ordenador; Los valores credenciales están excluidos de la importación.
3. Elija **Use configuration** para abrir el editor prellenado. Revise todos los campos, ata las credenciales locales requeridas y seleccione **I trust this connector**.
4. Elija **Add connector**, inspeccionar el estado de conexión en la lista, y luego invocar una pequeña herramienta de sólo lectura.

![Seleccionar un servidor y revisar las credenciales requeridas](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

Cuando un servidor importado hace referencia a una variable de entorno como `QC_EXAMPLE_TOKEN`, une ese nombre a una credencial almacenada en este dispositivo. **Add** permanece indisponible hasta que se completen los enlaces necesarios. Después de añadir, compruebe **Connected** y ejecute la herramienta prevista; una unión guardada por sí sola no valida la autenticación remota.

Llame a `get_dataset_summary`, luego pasar una devolvió el ID de muestra completa a `get_sample_qc`. Compare la respuesta con el [Base de referencia de QC](../reference/example-data.md). Este servidor devuelve valores sumarios guardados; no recomputa la matriz original. La implementación del servidor está cubierta en [Crear una herramienta personalizada](../tools/custom.md).

### Exportación y reimportación {/* #export-and-reimport */}

Elija el **Actions → Export** de la fila, seleccione **Open Science Connector** o **MCP client config**, inspeccione la vista previa, y elija **Save configuration**.

![Exportar nombres credenciales y reportar caminos locales](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

El archivo exportado real retuvo el nombre variable en `required_secrets.environment`. No contenía ningún valor credencial de demostración, confianza local o permisos. Reimport requiere una selección y confianza de nuevo.

Cuando la misma identificación ya existe, la vista previa informa **Un Connector personalizado con ID ... ya está instalado**, y **Use configuration** no está disponible. Utilice **Edit** para cambiar una conexión existente; la importación no es una operación de sobreescritura.

![Un ID existente bloquea la importación duplicada](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

Al restaurar una conexión exportada, inspeccione los campos prellenados y adhiera las credenciales requeridas. Completa confianza y prueba una llamada atada antes de utilizarla en investigación. La importación no sobreescribirá un Connector existente con el mismo ID.

## Credenciales: servicios y secretos reutilizables {/* #credentials-services-and-reusable-secrets */}

Cree y administre secretos en [Cátedras de servicio](../tools/credentials.md), luego seleccione sus nombres en entorno, encabezado o encuadernaciones OAuth. En un nuevo dispositivo, restaurar estos enlaces y completar el registro de ese servicio antes de probar la conexión. Las exportaciones contienen referencias de configuración, secretos no utilizables o confianza local.

## Búsqueda de error HTTP {/* #http-error-lookup */}

Para 400, 401, 403, 404, 429 o 5xx, use el [Mesa de solución de problemas HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Mantenga el servicio de respuesta y su mensaje detallado con el código de estado.
