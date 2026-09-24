---
title: "Cátedras de servicio"
last_update:
  date: '2026-09-24'
---

# Cátedras de servicio {/* #service-credentials */}

Configure credenciales en **Settings → Credentials** para el servicio que realmente hace la solicitud. Una suscripción Codex de trabajo proporciona acceso modelo; no suministra OpenAlex, GitHub o una cuenta MCP personalizada.

## Inscripciones de servicios incorporadas {/* #built-in-service-entries */}

| Servicio | Campos y fines | Cómo comprobar |
| --- | --- | --- |
| GitHub | Token de acceso personal para el descubrimiento/importaciones de Skill | Use Connect/Manage y los controles de token; entonces prueba la operación de repositorio prevista. |
| Acceso a literatura | Correo electrónico de contacto y llave opcional NCBI API | Guardar información de contacto; La clave NCBI es opcional para las solicitudes apoyadas. |
| OpenAlex | Opcional API llave para operaciones OpenAlex en literatura | Validar la llave entrada, guardarla y hacer una consulta atada. |
| Unpaywall | Correo electrónico de contacto para búsquedas de ubicación de texto completo | Utiliza el correo electrónico de contacto de la literatura configurada; no inventó la dirección. |

**Connect** abre un servicio inconfigurado; **Manage** abre una existente. **Desktop only** significa que la operación credencial necesita el contexto de escritorio. Un indicador de clave almacenada no es el propio valor secreto.

## Configurar una tecla OpenAlex opcional {/* #openalexs-actual-missing-key-flow */}

Desde v0.33.1, las consultas OpenAlex ya no requieren una clave API. Comience con una pequeña consulta; los límites de tarifas del servicio, las políticas de autenticación y acceso siguen vigentes. Permitir una solicitud sin clave no promete uso ilimitado o una respuesta exitosa.

Para utilizar su propia clave, abra **Settings → Credentials → OpenAlex** (también disponible desde Literatura Graph a **Manage credentials**), introduzca **API key**, elija **Validate**, luego **Save** después de la validación exitosa. La llave se utiliza sólo para `api.openalex.org`. **Remove key** elimina una clave existente; el campo de reemplazo no revela el secreto almacenado.

Resolver errores de almacenamiento de sistema de credenciales antes de guardar. Para las respuestas 429, inspeccione la cuota del servicio y la orientación de reingreso en lugar de asumir una clave es obligatorio.

## Credenciales para conectores personalizados {/* #credentials-for-custom-connectors */}

Cree la credencial aquí, luego seleccione su nombre en el [Configuración del conector](../guides/connectors.md). Inspeccione a los consumidores antes de cambiar o eliminar una credencial compartida.

### Nueva credencial {/* #new-credential */}

| Campo o botón | Operación |
| --- | --- |
| Nombre | Dale al credencial una etiqueta local reconocible. |
| Tipo | Elija **API key**, **Access token**, **OAuth**. |
| Valor | Introduzca un secreto en el campo enmascarado para una llave/token. Los campos requeridos por vacío mantienen a salvo discapacitados. |
| OAuth → URL de recursos | Suministrar el punto final exacto de los recursos. El emparejado Connector depende de la URL de recursos, el transporte y el registro. |
| Avanzado → Transporte | Elija el transporte requerido por el servicio OAuth; Streamable HTTP era el predeterminado inspeccionado. |
| Ámbitos | Introduzca espacios separados por espacios o comas. |
| Usar un cliente pre-registrado | Mostrar **Authorization server URL**, **Client ID**, **URL de llamada**, y **Client secret**. |
| URL de llamada / Copia | El predeterminado inspeccionado era `http://127.0.0.1/oauth/callback`; copiarlo para el registro de servicio o ampliar la opción de cambio personalizado. |
| Discovery | Cuando sea aplicable, descubra metadatos del servidor; Esto no es un exitoso signo por sí mismo. |
| Cancelar / Guardar | Descarte el borrador o almacene una configuración creíble válida. |

![Campos avanzados de registro OAuth](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

En un Connector personalizado, une la credencial a un encabezado, variable de entorno o selector OAuth. El nombre es la referencia; no colocar valores secretos en descripciones o instrucciones del proyecto. Las configuraciones portables exportadas reemplazan secretos con titulares de puestos. Una credencial salvada todavía necesita una prueba de servicio/Connector real para establecer que funciona.

## Verificar y resolver problemas {/* #verify-and-troubleshoot */}

Después de guardar, repita una pequeña operación e inspeccione su respuesta. Use `credential_required` para un secreto configurado desaparecido, 401 para una falta de autenticación de investigar, y 403 para el acceso/policía denegado para investigar; a 403 no se fija universalmente reemplazando la llave. 429 se refiere a los límites de tarifa/uso. Lea el cuerpo real del servicio y vea [Solución de problemas](../guides/troubleshooting.md).

La eliminación de una credencial puede afectar a cada Connector ligado a ella. Las exportaciones Connector y Specialist excluyen deliberadamente los secretos y la verdad listos para usar; configurarlos de nuevo en el dispositivo receptor. Nunca pegar un secreto en un informe Skill, rápido, captura de pantalla o edición.

Una llave OpenAlex es opcional. Los conectores OAuth todavía requieren completar el registro del servicio llamado. Resolver el error de autenticación mostrado antes de reintentar la misma pequeña consulta.

Referencia de implementación: [CredencialesPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx).

[Gestión de credencial CLI/SDK](../reference/cli.md#manage-connectors-and-credentials) puede crear/actualizar credenciales compartidas a través del acceso local autenticado. Las instalaciones sin cabeza Linux pueden elegir explícitamente [almacenamiento de archivos no cifrado](../reference/server.md#credential-storage-on-headless-linux); Las credenciales de escritorio conservan su comportamiento normal de almacenamiento de OS. Esta opción no soluciona el almacenamiento de contraseñas Compute o inicia el inicio de sesión OAuth.

## Abra la página oficial de teclas API {/* #official-api-key-page */}

Las formas de OpenAlex y NCBI se vinculan a sus páginas clave oficiales. Pasos completos de cuenta con el servicio, volver al formulario, luego validar y guardar la clave deseada. Abrir un enlace no guarda una llave o ejecutar una consulta; si se requiere una llave depende del servicio y la operación.