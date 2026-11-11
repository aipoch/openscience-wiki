---
title: "Crear e instruir un Specialist"
last_update:
  date: '2026-11-11'
---

# Crear e instruir un Specialist {/* #create-and-instruct-a-specialist */}

<p className="example-label"><strong>Ejemplo</strong> Crear un rol de revisión de QC RNA-seq</p>

Cree **RNA-seq QC Revisor** para comprobar un resultado de cuenta cruda de forma independiente. El ejemplo se centra en identificadores, integridad numérica e invariantes aritméticos, manteniendo la interpretación biológica fuera de este cheque atado.

## Hacer que la responsabilidad sea testable {/* #make-the-responsibility-testable */}

Declara la entrada y la salida esperada, no sólo “usted es un experto”. Un evaluador de QC debe informar exactamente qué tabla lee y qué cheques pasaron. Una revisión de metadatos no debe pretender haber recomputado los recuentos originales. Para el archivo handoff, utilice una versión inmutable actual devuelta por la aplicación; un nombre de archivo no es una identidad de versión.

El papel ahorrado fue creado, reabierto, exportado, duplicado y utilizado en una revisión real delegada en línea-CSV. Su aritmética independiente pasó los doce invariantes de la muestra. Véase [Delegado y verificado](./delegate.md) para la limitación de la evidencia y la limitación de archivo.

## Crear el papel {/* #create-the-role */}

1. Abre **Resource center → Specialists → Add specialist → Write from scratch**.
2. Introduzca **RNA-seq QC Revisor** como Nombre y **Comprobar la integridad de la cuenta cruda y las métricas de la muestra utilizando los insumos biomédicos públicos trazables.** como Descripción.
3. Elige un icono y color. El ejemplo utiliza **Cerebro / Púrpura**. La vista previa en vivo muestra la lista / apariencia del palillo.
4. Ampliar **Advanced settings** e inspeccionar el ID generado `rna-seq-qc-reviewer` antes de la creación.
5. Ingrese las instrucciones a continuación.
6. Apaga **Full access**, asigna los archivos RNA-seq Skill y Omics como se muestra en [Capacidades](./capabilities.md), y selecciona **Create specialist**.
7. Busca la fila guardada y reabrígela. Confirme el ID exacto, las instrucciones y dos acoplamientos de capacidad.

![Campos de identidad en el editor inglés Specialist](/img/open-science/capabilities-walkthrough/04-specialist-identity.webp)

```text
You review bulk RNA-seq raw-count quality. Use the rnaseq-count-qc Skill when validating a count matrix. For a precomputed QC table, inspect the full sample identifiers, numeric completeness, nonnegative values, and whether zero-count plus detected genes equals the stated gene count. Use available Notebook tools for arithmetic; do not install new packages for this bounded review. Cite source filenames and actual outputs. Separate verified findings from unresolved checks. Never infer differential expression, clinical significance, or quality cutoffs from library totals alone. For metadata queries, use only the assigned Omics Archives connector. Return a concise PASS/FAIL table and the limitations of the available input.
```

### Controles de editores {/* #editor-controls */}

| Campo | Significado y límite |
| --- | --- |
| Icon / Color | Apariencia solamente; cambiar estos no altera el modelo o el acceso. |
| Nombre | Necesario; hasta caracteres 80. |
| Descripción | Facultativo; hasta caracteres 1,000. Describe cuándo seleccionar el papel. |
| Ajustes avanzados → ID Specialist | Generado antes de la creación; no puede cambiar después. Utilice el ID guardado en una delegación explícita. |
| Instrucciones | Hasta caracteres 32,768. Asignado al impulso de base; no reemplaza las reglas de herramientas ni de acceso. |
| Acceso completo | Los propietarios de Main Agente Skills/Connectors; independiente del modo de aprobación. |
| Skills / Connectors | Explicit bindings when Full access is off. |
| Cancelar | Discuta el borrador. |
| Crear especialista | Salva un nuevo papel. |
| Nombre de la pantalla / Versión del paquete / Guardar cambios | Aparece cuando se edita un paquete existente/importado. La identidad almacenada permanece fija. |

Referencia de implementación: [SpecialistEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx).
