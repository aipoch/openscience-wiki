---
title: "Redes, proxies y espejos de paquete"
last_update:
  date: '2026-11-19'
---

# Redes, proxies y espejos de paquete {/* #network-proxies-and-package-mirrors */}

Abrir **Settings → Network** cuando un modelo, solicitud de Notebook o descarga de paquetes no puede llegar a su destino. Esta página separa el estado de conexión, los dominios permitidos Notebook, un proxy de proceso y espejos de paquete. Un cheque de conexión verde no prueba que cada solicitud Notebook protegida tendrá éxito.

Comience con la operación de falla: una solicitud de proveedor, acceso a la red Notebook y un instalador de paquetes pueden utilizar diferentes rutas. Mantenga su nombre de host y el error exacto disponible al cambiar estos ajustes.

## Leer el estado de la red primero {/* #read-network-status-first */}

El estado combina información de enlace de red y una sonda de registro de paquetes. **READY · Los registros del paquete son accesibles** indica que la sonda tuvo éxito. **Chequeo**, estados inalcanzables o offline indican que se necesita otro cheque o reparación de conexión. Utilice **Check again** cuando esté disponible después de cambiar la conexión.

Si Network informa **Ready** pero una herramienta falla, expanda el error de esa herramienta. La sonda de estado verifica su propio destino; use el nombre de host y el mensaje de la solicitud fallida para diagnosticar la ruta afectada.

| Fallo | Inspección siguiente | Evite esta conclusión equivocada |
| --- | --- | --- |
| El acceso del proveedor falla | autenticación del proveedor y la verificación de conexión modelo | Los ajustes de dominio Notebook proporcionarán credenciales modelo |
| Se niega un nombre de host de investigación | **Manage access** y el nombre de host exacto en la solicitud | Añadiendo un amplio dominio no relacionado lo arreglará |
| Un paquete host ya está permitido pero CONNECT falla | Registro de instalación, resolución proxy y DNS | Otro clic de Permitir idéntico resolverá todas las fallas de la red |
| La verificación de certificados falla | El paquete CA configurado y los requisitos de confianza de la organización | Es necesario verificar el certificado de desactivación |
| El índice del paquete no devuelve la distribución después de errores de conexión | Mensajes de red anteriores y seleccionados Python/platform | El paquete no debe existir |

<span id="configure-notebook-domains" />

## Elija Redes relajadas o estrictas {/* #public-network-rules */}

Abre **Settings → Network → Manage access**. El modo se aplica a las conexiones de Notebook protegidas a través de proyectos. Lea **Current: Relaxed** o **Current: Strict** antes de editar reglas.

| Modo | Conexións permitidas | Cuando no se permite un destino |
| --- | --- | --- |
| **Relaxed** (por defecto) | Nombres de host HTTPS, incluyendo nombres de host para servicios privados o loopback; excepciones guardadas coinciden con su protocolo, host/IP y puerto | HTTP y conexiones IP directas requieren autorización |
| **Strict** | Sólo los destinos coinciden con la lista blanca manual por protocolo, nombre de host o IP, y puerto | Bloqueado sin una solicitud de autorización; añadir una regla necesaria manualmente |

Para cambiar los modos, seleccione **Strict** o **Relaxed**, lea la explicación, luego utilice **Switch to Strict mode** o **Switch to Relaxed mode**. Seleccionar una opción marcada **Not yet applied** no cambia el modo activo.

![Explicación de modo estricto y grupos de lista blanca](/img/open-science/v130/network-strict.webp)

### Añadir una regla de la lista blanca estricta {/* #strict-whitelist */}

1. En **Strict whitelist**, seleccione **Add rule**.
2. Establecer **Network protocol**, **Hostname, IP or pattern** y **Port** para el servicio real. Utilice un nombre de host o IP, no una ruta URL.
3. Elija un **Group**, o **New group…** y un **Group name**, luego elija **Confirm**.
4. Inspeccione la regla guardada y el modo activo. Retratar la pequeña solicitud prevista e inspeccionar la respuesta.

![Ejemplo del protocolo, el host y los campos portuarios para una regla estricta](/img/open-science/v130/network-rule.webp)

Un nombre de host exacto no incluye subdominios. `*.example.org` coincide con subdominios pero no con `example.org`. Protocolo y puerto son parte de la regla: una regla HTTPS para el puerto 443 no otorga HTTP u otro puerto. Strict coincide con el nombre de host solicitado; no comprueba si su resultado DNS es público, privado o loopback. Agregue una regla sólo para un destino que se propone el código para contactar.

**Built-in** y **Manual** identifican la procedencia de la regla. Los grupos incorporados son sembrados una vez, por lo que las ediciones posteriores se mantienen. Ni las aprobaciones recordadas ni el modo Full access bypass Strict. Las reglas de la red de ahorro restablecen las conexiones protegidas y pueden interrumpir las transferencias; aplicar cambios después de que terminen las transferencias activas.

## Guardar una excepción de movimiento relajado {/* #trusted-private-services */}

Bajo **Trusted unsafe networks**, elija **Add address**, especifique **Network protocol**, **Hostname** o IP, **Port** y el grupo apropiado. Confirme y compruebe el alcance guardado antes de reintentar. Estas excepciones evitan la autorización repetida para el destino concordante en modo Relaxed; no otorgan acceso en modo Strict. La lista blanca estricta es inactiva mientras se selecciona Relaxed.

La regla permite una conexión, no un acceso exitoso o una respuesta válida. Compruebe las credenciales del servicio y el resultado real por separado. Estos ajustes reemplazan los formularios de dominio público/servicio privado más antiguos; usan el modo actual y los campos de reglas cuando se sigue una captura de pantalla más antigua.

## Elija un modo proxy {/* #choose-a-proxy-mode */}

Seleccione **Configure proxy**. Utilice una dirección proxy proporcionada por su propia configuración de red; el puerto en una captura de pantalla es específico para esa computadora.

| Modo | Comportamiento | Entrada necesaria |
| --- | --- | --- |
| **System** | Las solicitudes de aplicación siguen el proxy del dispositivo; los procesos de agente heredan el entorno proxy desde la puesta en marcha de la aplicación | No campo de servidor explícito |
| **Manual** | Dar nuevas solicitudes de aplicaciones y procesos un proxy fijo | **Proxy server** URL |
| **Direct** | Conecte sin el proxy configurado/heredado para nuevos procesos | No hay campo servidor |

El modo manual acepta URLs HTTP, HTTPS, SOCKS, SOCKS4 y SOCKS5. No se admiten las credenciales incorporadas en la URL. **Bypass rules** es una lista opcional separada por coma de los anfitriones que deben conectarse directamente; localhost siempre está desaparecido.

1. Elige **Manual**.
2. Llene **Proxy server** con la dirección proxy de trabajo utilizada por su red.
3. Agregue reglas de bypass sólo si los destinos pertinentes deben conectarse directamente.
4. Seleccione **Save** y espere a **Proxy settings saved.**
5. Iniciar una nueva solicitud/proceso y probar la operación de falla original. Las sesiones de agentes existentes, los kernels e instaladores pueden mantener sus conexiones existentes.

Si el modo manual informa **Introduzca una URL del servidor proxy**, introduzca una dirección de proxy de trabajo o descarte el borrador con **Done**. Salvar una dirección válida no confirma en sí mismo que el proxy puede llevar la solicitud de fallo.

### Revise un DNS o fallo proxy {/* #observed-fake-ip-failure */}

Mantenga el error exacto de la solicitud de fallo. Un timeout, error de certificado o rechazo proxy todavía puede ocurrir después de una regla permite el destino. Revise el nombre de host, protocolo, puerto y ruta proxy contra el servicio que desee utilizar. No trate el error de dirección no pública de una versión anterior como la actual regla de juego del modo Strict: Controla el nombre/IP y el puerto solicitados, no su clase de dirección DNS.

Retratar una pequeña solicitud después de corregir la causa. Para el trabajo de paquetes, confirme tanto la instalación como la importación; un ajuste guardado o intérprete Listo por sí solo no prueba que una descarga se logró. Mantener las credenciales fuera de los registros compartidos y utilizar [Solución de problemas](troubleshooting.md) para fallos persistentes.


## Configurar espejos de paquete y fideicomiso de certificado {/* #configure-package-mirrors-and-certificate-trust */}

Seleccione **Configure** o **Edit** bajo el espejo del paquete.

| Campo | Entrada y efecto |
| --- | --- |
| **Conda channel mirror** | Raíz de espejo utilizada para descargas de canales Conda |
| **Python package index (pip)** | Una URL del índice de paquetes Python, que termina normalmente en `/simple` |
| **CA bundle path** | Camino a un paquete de confianza PEM completo, incluyendo las raíces públicas y corporativas requeridas; usos de certificados públicos |
| **View available mirrors** | Documentación de espejo externo abierta |
| **Save** | Almacene la configuración para operaciones de paquetes posteriores |
| **Cancel** | Rechazar el proyecto |

![Espejo del paquete y entradas de CA-bundle](/img/open-science/walkthrough-2026-09-08/56-package-mirror.webp)

Un espejo de paquete cambia la fuente del paquete. Confirme el formato de root/index requerido del espejo, ahorre y vuelva a introducir una pequeña operación de paquete en el tiempo de ejecución seleccionado. Los ajustes de proxy del modelo son separados.

Configured Conda, PyPI y CRAN espejo hostnames reciben acceso temporal para la operación de gestión de paquetes. Esto no los añade a la lista de dominio de Notebook permanente o otorga el mismo acceso al código de Notebook ordinario. Los redirigidos necesitan acceso a sus destinos reales. En modo Strict, agregue todos los protocolos/host/port requeridos a la lista blanca; una beca temporal de operaciones de paquetes no lo pasa.

Utilice una URL de espejo compatible HTTP(S) sin credenciales incrustadas, espacio blanco, localhost o una dirección IP cruda. Un ajuste de espejo aceptado no fija un servidor no disponible o un nombre de host que se resuelva a una dirección reservada. Si la instalación falla, inspeccione el destino y error real de la operación antes de reintentar. Los puntos finales remotos **model** tienen un [Requisitos HTTPS](providers.md#custom-gateway-every-visible-field).

## Información para guardar cuando una solicitud falla {/* #information-to-keep-when-a-request-fails */}

Grabar la versión, operación, tiempo de ejecución/ambiente, paquete o nombre de host, modo proxy y primer error útil. Preserve la salida original del instalador: la línea final “No distribución de coincidencias” puede ocultar fallos de conectividad anteriores. Excluir las fichas y las credenciales proxy de diagnóstico compartido.

Para un módulo Python perdido después de una conexión exitosa, continúe con [tiempo de ejecución y cheques de paquete](./runtimes.md). La instalación de host remoto está cubierta por separado en [Cálculo](remote-compute.md).

[Fuente de configuración de redes](https://github.com/aipoch/open-science/blob/v1.3.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Límite de red portátil](https://github.com/aipoch/open-science/blob/v1.3.0/src/main/notebook/network-sandbox-owner.ts).

## Búsqueda de error HTTP {/* #http-error-lookup */}

Para 400, 401, 403, 404, 429 o 5xx, use el [Mesa de solución de problemas HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Mantenga el servicio de respuesta y su mensaje detallado con el código de estado.

Después de cambiar la configuración de dominio proxy, mirror o Notebook, confirme los valores persistidos, luego vuelva a introducir la operación original en el mismo tiempo de ejecución. Compruebe tanto la descarga como la importación de paquetes; una configuración exitosa salvo solo no resuelve un error de instalación.

## Una célula R fue bloqueada antes de la ejecución {/* #r-network-warning */}

En v0.31.1, Notebook muestra una advertencia en línea cuando la protección de la red bloquea una carrera R. Siga su enlace de configuración e inspeccione el acceso solicitado. La advertencia significa que la célula no ejecutó; no es un resultado científico o una carrera completa. Después de resolver el requisito específico, ejecute la célula de nuevo e inspeccione su salida. El soporte Windows estándar R no permite la protección de la red.

## Acceso a la red cuando el modo de aprobación cambia {/* #network-mode-changes */}

**Full access** elimina las tarjetas de permiso manual aplicables del agente, pero no pasa por la lista blanca Strict Notebook. Chequee **Settings → Network → Manage access** cuando se niega una solicitud. En modo Relajado, el protocolo y el destino determinan si se necesita autorización o una excepción guardada. Todavía se aplican credenciales de proveedor y restricciones de servicio.

Cambiar las reglas de red puede cerrar las conexiones protegidas existentes. Retroceder bajo el modo resultante, luego inspeccionar la respuesta real. Vea [modos de aprobación](approval-modes.md) para permisos de conversación.
