---
title: "formatos Skill, Specialist, y MCP"
last_update:
  date: '2026-09-08'
---

# formatos Skill, Specialist, y MCP {/* #skill-specialist-and-mcp-formats */}

Skills, Especialistas y plantillas Connector tienen diferentes límites de paquetes. Esta referencia enumera sus campos y presupuestos de importación. Inspeccione la vista previa del archivo antes de importar, luego revise el resultado de la instalación.

## Documento y recursos Skill {/* #skill-document-and-resources */}

Una raíz Skill contiene `SKILL.md`; referencias y scripts viven debajo de la misma raíz del paquete. Su bloque de metadatos es YAML seguido de instrucciones de Markdown.

<p className="example-label"><strong>Ejemplo</strong> Un documento mínimo SKILL.md</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

El parser separa `name` y `description` de otros metadatos, normaliza los finales de línea y mantiene los valores de metadatos escalar como cadenas. Verifique el resultado de validación de importación/editor antes de publicar el paquete.

| Elemento de paquete | Uso | Boundary |
| --- | --- | --- |
| `name` | Identidad de invocación estable | Mantenerlo consistente con referencias al paquete |
| `description` | Cuando el agente debe seleccionar el Skill | No ejecuta nada por sí mismo |
| Cuerpo de marcado | Instrucciones cargadas de invocación | Una instrucción apoyada no es prueba de que su dependencia externa existe |
| Recursos relativos | Scripts, plantillas, referencias y datos | Mantener caminos referenciados dentro de la estructura del paquete |
| `.source.json`, `.specialist-package.json` en la raíz | Metadatos de propiedad de la aplicación | Excluido del presupuesto de paquetes autorizado por el usuario; no inventar o reutilizar estos archivos |

### Presupuestos de importación Skill {/* #skill-import-budgets */}

| Límite | Valor |
| --- | ---: |
| Archivos en un Skill | 16,384 |
| Archivo descomprimido individual | 50 MiB |
| Total descomprimido Skill | 128 MiB |
| Aggregate crudo SKILL.md contenido en una respuesta previa | 4 MiB |
| Anidación de directorio | Niveles de 8 |
| Solicitudes de GitHub por importación | 512 |
| Archivo Skill anidado | 64 MiB |
| Paquete de carga externa | 256 MiB |
| Skills por paquete | 256 |
| Entradas del paquete exterior | 32,768 |

Los presupuestos se aplican a diferentes niveles. Un paquete debajo de su límite exterior todavía puede contener un Skill que excede un límite interno. Revise el diagnóstico de cada candidato; no interpretan la importación parcial como cada candidato que tiene éxito. El archivo de referencia personal-editor cuenta reserva una entrada de paquete para SKILL.md.

[Skill parser](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts), [límites de importación compartidos](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts).

## Paquete Specialist {/* #specialist-package */}

Un paquete Specialist portátil contiene `manifest.json` y `specialist.json`. Los recursos Bundled Skill utilizan `skills/<skill-name>/<file>`, con `SKILL.md` en cada raíz Skill. Su nombre de frontmatter debe coincidir con el nombre del directorio.

| Archivo / campo | Contrato |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | Identidad del paquete; ID de contribución utilizan letras minúsculas/digits/hiphens y evitan reservadas `os-` / `mcp-` prefijos |
| `version` | Versión semántica |
| `exported_with_app_version` | Versión de aplicación de exportación |
| `specialist.json → name` | Stable Specialist nombre de perfil |
| `display_name` | Nombre de presentación opcional |
| `description` | Descripción del papel |
| `system_prompt` | Instrucciones Specialist; snake_case en el límite del paquete |
| `skill_ids` | Array of nonempty Skill names without duplicates |
| `connector_ids` | Array of nonempty Connector names without duplicates |

Los campos desconocidos o prohibidos son rechazados. Las cargas de pago en memoria utilizan camelCase (`systemPrompt`, `skillIds`, `connectorIds`), que no debe confundirse con la ortografía de campo JSON portátil. Los nombres de Connector portátiles pueden resolverse a los IDs locales de la máquina en la importación; las referencias del paquete no llevan credenciales de la máquina.

| Límite de archivo Specialist | Valor |
| --- | ---: |
| Tamaño comprimido | 50 MiB |
| Tamaño no comprimido | 200 MiB |
| Conteo de archivos | 2,000 |
| Archivo individual | 25 MiB |
| Coeficiente de compresión | 1,000 |
| Profundidad del camino | 32 |

La vista previa de importación reporta diagnóstico, ya sea instalado y cada disposición Skill: instalar, reutilizar, conflicto o reemplazar. Una sobreescritura requiere confirmación explícita. Se debe prever de nuevo un candidato firme o vencido; no vuelvas a reproducir ciegamente su token. Los conflictos Skill requieren una opción explícita instalada o entrante.

Export utiliza una revisión esperada y seleccionada incluida Skills. La eliminación también utiliza una vista previa/revisión y protege el Skills integrado, habilitado, compartido o referenciado. La eliminación de un Specialist no es equivalente a eliminar cada Skill que puede acceder.

[Tipos de paquete y presupuestos de archivo](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts), [validación del paquete](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts).

## Connector plantilla y exportación de cliente MCP {/* #connector-template-and-mcp-client-export */}

Una plantilla Open-Science Connector no es el mismo documento JSON como configuración MCP del cliente `mcpServers`.

| Campo de plantilla | Contrato |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | Nombre personalizado estable, hasta caracteres 64, letras minúsculas/digits/hyphens; único y no un nombre reservado incorporado |
| `display_name` | etiqueta legible por el hombre |
| `description` | Explicación |
| `transport` | `stdio`, `streamable_http`, `sse` |
| `command`, `args` | Local stdio executable and argument list |
| `url` | Punto final remoto HTTP/SSE |
| `required_secrets.environment` | Nombres de secretos ambientales para el tóxico; no sus valores |
| `required_secrets.headers` | Nombres de los secretos de cabecera HTTP; no sus valores |
| `required_secrets.oauth_client_secret` | Si un secreto del cliente OAuth debe ser suministrado localmente |
| `oauth` | Apoyo al registro/emisor/scopios/cliente/metadatos redireccionados |

Se aplica una validación específica del transporte: los transportes remotos no incluyen secretos ambientales necesarios; OAuth y secretos de cabecera requeridos no pueden ser combinados. Un cliente OAuth pre-registrado requiere su servidor de autorización; el registro de metadatos del cliente y la identificación explícita del cliente son modos separados. Los metadatos redireccionados/client-secretos requieren el correspondiente ID del cliente.

Las exportaciones portátiles rechazan las credenciales incrustadas en las URL y los argumentos de mando. MCP cliente export utiliza `mcpServers`, `command`/`args`/`env` para stdio o `type`/`url`/`headers` para el transporte remoto, con los propietarios secretos. El registro de OAuth y las fichas están excluidos de ese formato cliente, y la exportación reporta la limitación.

Importar configuración no instala el servidor externo, iniciar sesión en su servicio o establecer la ejecución de herramientas exitosa. Confirme el estado de conexión e inspeccione las herramientas anunciadas después de proporcionar credenciales a través de la aplicación.

[Parser de plantilla y ambos formatos de exportación](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts), [Identidad Connector personalizada](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts).
