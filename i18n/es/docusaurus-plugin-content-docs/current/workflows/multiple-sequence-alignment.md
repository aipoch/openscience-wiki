---
title: "Alinear múltiples secuencias e inspeccionar posiciones conservadas"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Alinear múltiples secuencias e inspeccionar posiciones conservadas {/* #align-multiple-sequences-and-inspect-conserved-positions */}

<p className="example-label"><strong>Ejemplo práctico</strong> Compara las cadenas humanas, del ratón y del bovino hemoglobina alpha</p>

Recuperar tres secuencias UniProt revisadas, alinearlas con el servicio remoto Clustal Omega y comprobar qué columnas contienen el mismo aminoácido en los tres. El ejemplo produjo una alineación de columna 142 con las columnas totalmente conservadas 116. Estos son resultados para este pequeño conjunto de tres especies, no una anotación funcional o árbol filogenético.

## 1. Preparar el período de sesiones y las fuentes {/* #alignment-inputs */}

La configuración de conexión se describe en [Bases de datos científicos](../tools/databases.md#connect-database).

1. Crear **Alineación de la secuencia de hemoglobina** y abrir una nueva conversación con un modelo conectado. Este ejemplo usó **Codex subscription**.
2. En **Settings → Connectors**, haga **Genes & Ontologies** y **Genomes** disponibles para Main. Clustal Omega pertenece a Genomes; no es un Connector separado.
3. Configure el correo electrónico de contacto válido de investigación-servicio solicitado por Clustal Omega en **Settings → Privacy → Share contact email with research data services**. Utilice su contacto real, no una dirección inventada. Las entradas de secuencia se envían a EMBL-EBI.
4. Envíe el mensaje a continuación. Use secuencias públicas o autorizadas de otro modo.

```text
Which positions are conserved among human, mouse and bovine hemoglobin
alpha chains? Retrieve the reviewed canonical sequences from UniProt,
record their accessions and organisms, and align the three FASTA records
with Clustal Omega through the Genomes Connector in Session Notebook.
Follow the submitted job through completion, then save the input FASTA,
raw alignment, submission receipt and a short English report with
conserved-column counts and a few clearly mapped examples. Explain why
sequence conservation alone does not prove function.
```

Compruebe los registros devueltos antes de la alineación:

| Organismo | Adhesión revisada | Taxon | Longitud canónica |
| --- | --- | --- | --- |
| Humanos · Homo sapiens | P69905 | 9606 | 142 aa |
| Mus musculus | P01942 | 10090 | 142 aa |
| Bovine · Bos taurus | P01966 | 9913 | 142 aa |

Los nombres de FASTA son `human_P69905`, `mouse_P01942` y `bovine_P01966`. Todos los nombres deben ser únicos. Human P69905 se asocia con HBA1 y HBA2; una entrada de proteína no es necesariamente un gen único. Mantenga la adhesión y el organismo con cada secuencia.

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_human_mouse_bovine.fasta">Las tres secuencias de entrada</ExampleDownload>

## 2. Presentar una vez y seguir el trabajo {/* #alignment-job */}

El agente llama a **Genomes → clustalo_submit** con el FASTA combinado, `stype: protein` y `outfmt: clustal_num`. El servicio requiere al menos tres registros y acepta en la mayoría de los registros 4,000 o 4 MiB. Mantenga el `job_id` devuelto, el formato solicitado y el recibo de la presentación.

1. Inspeccione la respuesta de la presentación Notebook. Un ID de trabajo y **QUEUED** significa aceptado, no completado.
2. Query `clustalo_status` para esa misma ID, esperando al menos diez segundos entre cheques y seguir cualquier orientación de servicio más larga. No envíe otra copia porque la cola es lenta.
3. Después de **FINISHED**, llame a `clustalo_results` con el mismo ID y formato. Guardar el contenido devuelto como un archivo `.aln`; recibir un nombre de archivo sugerido no guarda en sí mismo un archivo.
4. Si la sesión se detiene, mantenga el ID de trabajo y continúe el mismo trabajo más tarde. Una respuesta incierta a la presentación puede seguir correspondiendo a un trabajo aceptado; Evite la reposición automática. **ERROR**, **FAILURE** y **NO FOUND** requieren investigación, no una interpretación de alineación vacía.

![El ID de trabajo real, cheques efectuados y estado completado en la sesión Notebook](/img/open-science/v0331/clustal-submission.webp)

Este ejemplo de recibo registra inicialmente **QUEUED**. El resultado posterior de Notebook informó **FINISHED** y devolvió una alineación Clustal O(1.2.4). Los resultados tienen un período de retención controlado por el proveedor, documentado hasta una semana; guarda el informe rápidamente. El límite de tamaño del resultado es 8 MiB. Vea el [campos de operaciones](../reference/connector-operations.md#clustalo_submit).

<ExampleDownload path="/examples/v0331/clustalo_submission_receipt.json">Recibimiento de la comunicación original</ExampleDownload> · <ExampleDownload path="/examples/v0331/hemoglobin_alpha_clustalo.aln">Alineación en bruto</ExampleDownload>

## 3. Compruebe la alineación y conteo columnas conservadas {/* #alignment-results */}

Abra el **hemoglobin_alpha_conservation_report.md** generado. Compare sus adhesiones y longitudes de secuencia con la entrada FASTA y la alineación cruda. Eliminar las brechas de cada secuencia alineada y confirmar que los residuos restantes coinciden exactamente con su entrada; esto atrapa la sustitución accidental de secuencias o la truncación.

![El informe inglés con identidades de origen, conteos de alineación y limitaciones](/img/open-science/v0331/clustal-report.webp)

Para esta carrera:

| Chequee | Resultado |
| --- | --- |
| Entrada y secuencias alineadas | Tres, cada residuos 142 |
| Columnas de alineación | 142 |
| Columnas que contienen gap | 0 |
| Residuo Índico en las tres secuencias | Columnas 116 |
| Columnas variables | 26 |
| Fracción totalmente conservada | 116 / 142 = 81.7% |

En la salida de cristal, `*` marca una columna totalmente conservada; `:` y `.` describen grupos con propiedades similares, no residuos idénticos. Contar sólo columnas idénticas no-gap para la fracción anterior. Ejemplos son D7, G16, H59, H88 y R142. Aquí la alineación es libre de brechas, por lo que las columnas igualan los números de residuos de secuencia canónica. Con las lagunas, mapee cada secuencia por separado y no confunda columnas de alineación con números de residuos o numeración de proteína madura.

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_conservation_report.md">Informe de resultados</ExampleDownload>

## 4. Mantenga la interpretación dentro de las pruebas {/* #alignment-interpretation */}

La conservación en estos tres mamíferos relacionados apoya una hipótesis sobre la limitación, pero no prueba la función de un residuo. Doblar, estabilidad, ascendencia compartida y la muestra elegida puede importar. El muestreo de taxones más amplios, el contexto estructural y la evidencia experimental son los siguientes pasos separados. Una alineación de secuencia múltiple no es una búsqueda BLAST o un árbol filogenético.

Mantenga la entrada FASTA, alineación cruda, recepción e informe juntos. Para empezar con una secuencia desconocida, utilice [descubrimiento de proteínas y BLAST](protein-sequence-search.md). Para búsquedas de perfil específicas del programa, consulte [Capacidades HMMER e InterProScan](../tools/databases.md#sequence-tools).

[Clustal Omega · EMBL-EBI FAQ](https://www.ebi.ac.uk/jdispatcher/docs/faqs/clustal/).
