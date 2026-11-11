---
title: "Recuperar registros estructurados de una base de datos científica"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Recuperar registros estructurados de una base de datos científica {/* #retrieve-structured-records-from-a-scientific-database */}

<p className="example-label"><strong>Ejemplo práctico</strong> Siete ácidos carboxílicos de cadena recta en PubChem</p>

Comience con nombres compuestos y termine con una tabla de identificadores y propiedades verificadas. Este ejemplo recupera ácido acético a través del ácido octanoico, una serie homologosa de siete miembros con dos a ocho átomos de carbono. Los registros fuente permanecen disponibles junto a la tabla para que pueda comprobar cómo se obtuvo cada valor.

## 1. Define los compuestos y propiedades {/* #1-define-the-compounds-and-properties */}

En **Resource center → Connectors**, asegúrese de que **Química** esté disponible. Abrir un proyecto, iniciar una conversación y seleccionar un modelo conectado. Esta ejecución utilizó Open-Science 0.30.1 y la Química/PubChem Connector; no requirió una hoja de cálculo de entrada.

Especifique **ácidos monocarboxílicos neutros, de cadena recta**. Un nombre similar puede referirse a un isómero ramificado, una sal o una base conjugada. Una fórmula por sí sola no puede distinguir todas esas estructuras.

```text
Use the Chemistry/PubChem Connector to retrieve acetic acid,
propanoic acid, butanoic acid, pentanoic acid, hexanoic acid,
heptanoic acid and octanoic acid. Resolve each name to a PubChem CID.
Retrieve molecular formula, molecular weight, the returned SMILES
and ConnectivitySMILES fields, InChIKey and the PubChem source URL.
Use neutral straight-chain acids, not branched isomers or salts.
Save pubchem-homologs.csv, pubchem-homologs-source.json and
pubchem-homologs-notes.md. Preserve exact lookup inputs and raw
responses. Check seven distinct CIDs, carbon counts 2–8, formulas
CnH2nO2, neutral charge and linear structures. Reopen the files.
Keep all outputs in English and do not delegate.
```

![El alcance compuesto y los archivos solicitados en la conversación real](/img/open-science/workflow-extensions/pubchem-input.webp)

## 2. Compruebe las llamadas de base de datos reales {/* #2-check-the-actual-database-calls */}

Después de enviar, ampliar la actividad de la herramienta o abrir **Notebook**. La carrera resolvió siete nombres con `pubchem_search_compounds`, luego recuperó sus registros con `pubchem_get_compounds`. Inspeccione el CID devuelto y la estructura para cada nombre antes de aceptar la fila. Si un nombre devuelve varias identidades plausibles, resuelva primero esa ambigüedad.

El ejemplo usó nombres exactos de ácido y el primer CID devuelto, luego comprobó las propiedades del lote. Esto es adecuado para estos nombres inequívocos; tomar el primer golpe no es una regla general de identificación.

![La actividad de consulta real y lectura de archivo guardado en Notebook](/img/open-science/workflow-extensions/pubchem-lookup.webp)

## 3. Abra la mesa salvada {/* #3-open-the-saved-table */}

Espere hasta que la respuesta termine y los archivos aparecen bajo **Generated**. Abrir **pubchem-homologs.csv** y ampliar su vista previa. Esta carrera produjo **Renglas 7 · columnas 8**.

| Compuesto | PubChem CID | Fórmula | Peso molecular, g/mol |
|---|---:|---|---:|
| Ácido acético | 176 | C2H4O2 | 60.05 |
| Ácido propanoico | 1032 | C3H6O2 | 74.08 |
| Ácido butanoico | 264 | C4H8O2 | 88.11 |
| Ácido pentanoico | 7991 | C5H10O2 | 102.13 |
| Ácido hexanoico | 8892 | C6H12O2 | 116.16 |
| Ácido heptanoico | 8094 | C7H14O2 | 130.18 |
| Ácido octonoico | 379 | C8H16O2 | 144.21 |

![El nuevo CSV de siete componentes](/img/open-science/workflow-extensions/pubchem-table.webp)

Coinciden filas por **CID**, no su orden de visualización. Revise la fórmula y las SMILES lineales juntos. El ejemplo conserva los nombres de campo devueltos, `SMILES` y `ConnectivitySMILES`; sus cuerdas coinciden con estos compuestos. No renombrar uno como un identificador diferente o inferir estereoquímica experimental de él.

## 4. Mantener los registros de fuentes con la exportación {/* #4-keep-the-source-records-with-the-export */}

Abrir **pubchem-homologs-source.json** para inspeccionar las ocho operaciones, los insumos de búsqueda exacta y las respuestas crudas. Abra **pubchem-homologs-notes.md** para el procedimiento y los cheques. El CSV salvado se comparó con los registros brutos; las siete identidades, fórmulas y estructuras lineales acordadas.

![El procedimiento ahorrado, los resultados de validación y los límites de interpretación](/img/open-science/workflow-extensions/pubchem-notes.webp)

Utilice el botón **Download** de la vista previa para mantener una copia local. Para esta ejecución completa, descargue el <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs.csv">CSV</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-source.json">Registros de fuentes</ExampleDownload> y <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-notes.md">Notas</ExampleDownload>. Los registros PubChem pueden cambiar; retener la instantánea de la fuente con su análisis.

Estas son propiedades de base de datos o estandarizadas, no nuevas mediciones experimentales. El peso molecular no es una masa monoisotópica exacta, y esta tabla no establece pureza, toxicidad o actividad biológica. Para comparar los registros de fuentes conflictivas, continúe con [historial científico de verificación cruzada](cross-check-records.md).
