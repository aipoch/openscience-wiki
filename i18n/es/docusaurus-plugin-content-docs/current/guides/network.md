---
title: "Redes, proxies y espejos de paquete"
last_update:
  date: '2026-09-20'
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
| Se niega un nombre de host de investigación | **Configure domains** y el nombre de host exacto en la solicitud | Añadiendo un amplio dominio no relacionado lo arreglará |
| Un paquete host ya está permitido pero CONNECT falla | Registro de instalación, resolución proxy y DNS | Otro clic de Permitir idéntico resolverá todas las fallas de la red |
| La verificación de certificados falla | El paquete CA configurado y los requisitos de confianza de la organización | Es necesario verificar el certificado de desactivación |
| El índice del paquete no devuelve la distribución después de errores de conexión | Mensajes de red anteriores y seleccionados Python/platform | El paquete no debe existir |

## Configurar los dominios Notebook {/* #configure-notebook-domains */}

1. Seleccione **Configure domains**.
2. Lea si la protección de la red Notebook está activa en este dispositivo.
3. Ampliar los grupos de servicios científicos para inspeccionar sus nombres de anfitriones. Control de conmutadores de grupo incluye destinos. El grupo de registro de paquetes/código de fuente está habilitado y bloqueado en esta construcción.
4. Para una fuente adicional, introduzca su nombre de host exacto en **Domain hostname**, a continuación, seleccione **Add**.
5. Revise el nuevo borrador de fila. Usa **Retire &#91;nombre del anfitrión&#93;** para deshacerlo.
6. Seleccione **Save changes** para persistir la lista prevista.

![La validación del nombre exacto rechaza un comodín](/img/open-science/walkthrough-2026-09-08/54-network-domain-validation.webp)

Introduzca un nombre de host como `data.example.org`, sin esquema, ruta, puerto, comodín o dirección IP. Para **Enter a hostname only, without a scheme, path, port, or wildcard.**, retire esas partes y guarde el nombre de host.

Un dominio permitido por nombre todavía puede fallar otro control de conexión. Por ejemplo, `pypi.org` puede ser permitido pero rechazado como un destino no público si se resuelve a `198.18.*`. Esto es distinto de un dominio no aprobado.

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

### Cuando un dominio se resuelve a una dirección no pública {/* #observed-fake-ip-failure */}

Si la instalación informa `destination resolves to a non-public network address`, inspeccione el registro detallado del instalador incluso cuando el error corto sólo dice `conda install failed` o `pip install failed`.

```text
deny network-outbound pypi.org:443
(destination resolves to a non-public network address)
```

1. Revise el nombre de host afectado y su dirección resuelta. Direcciones como `198.18.*` no son destinos públicos.
2. Destinguir una decisión de la lista de dominio del cheque de destino. `alreadyAllowed` no establece que la dirección resuelta es aceptable.
3. Compruebe la resolución DNS pública y la ruta proxy prevista con el propietario de la red, a continuación, retratar la pequeña petición original. Mantenga la protección de dominio habilitada.
4. Verificar la instalación e importar por separado. Un proxy guardado, intérprete listo o el uso exitoso de los paquetes existentes es insuficiente.

Si el mismo error persiste, mantenga el nombre de host, dirección resuelta y modo proxy con el registro del instalador y siga [Solución de problemas](troubleshooting.md). Un ahorro de configuración exitoso no es una descarga exitosa.


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

Los nombres de host Conda, PyPI y CRAN de espejo reciben acceso temporal para la operación de gestión de paquetes. Esto no los añade a la lista de dominio Notebook permanente o otorga el código Notebook ordinario el mismo acceso. Las redirecciones a otros anfitriones siguen el flujo de aprobación de la red.

Utilice una URL de espejo compatible HTTP(S) sin credenciales incrustadas, espacio blanco, localhost o una dirección IP cruda. Un ajuste de espejo aceptado no fija un servidor no disponible o un nombre de host que se resuelva a una dirección reservada. Si la instalación falla, inspeccione el destino y error real de la operación antes de reintentar. Los puntos finales remotos **model** tienen un [Requisitos HTTPS](providers.md#custom-gateway-every-visible-field).

## Información para guardar cuando una solicitud falla {/* #information-to-keep-when-a-request-fails */}

Grabar la versión, operación, tiempo de ejecución/ambiente, paquete o nombre de host, modo proxy y primer error útil. Preserve la salida original del instalador: la línea final “No distribución de coincidencias” puede ocultar fallos de conectividad anteriores. Excluir las fichas y las credenciales proxy de diagnóstico compartido.

Para un módulo Python perdido después de una conexión exitosa, continúe con [tiempo de ejecución y cheques de paquete](./runtimes.md). La instalación de host remoto está cubierta por separado en [Cálculo](remote-compute.md).

[Fuente de configuración de la red](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Límite de red Notebook](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/network-sandbox-owner.ts).

## Búsqueda de error HTTP {/* #http-error-lookup */}

Para 400, 401, 403, 404, 429 o 5xx, use el [Mesa de solución de problemas HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Mantenga el servicio de respuesta y su mensaje detallado con el código de estado.

Después de cambiar la configuración de dominio proxy, mirror o Notebook, confirme los valores persistidos, luego vuelva a introducir la operación original en el mismo tiempo de ejecución. Compruebe tanto la descarga como la importación de paquetes; una configuración exitosa salvo solo no resuelve un error de instalación.

## Una célula R fue bloqueada antes de la ejecución {/* #r-network-warning */}

En v0.31.1, Notebook muestra una advertencia en línea cuando la protección de la red bloquea una carrera R. Siga su enlace de configuración e inspeccione el acceso solicitado. La advertencia significa que la célula no ejecutó; no es un resultado científico o una carrera completa. Después de resolver el requisito específico, ejecute la célula de nuevo e inspeccione su salida. El soporte Windows estándar R no permite la protección de la red.
