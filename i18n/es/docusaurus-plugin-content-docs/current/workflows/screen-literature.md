---
title: "Seleccionar artículos con una colección inteligente"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Seleccionar artículos con una colección inteligente {/* #screen-papers-with-a-smart-collection */}

<p className="example-label"><strong>Ejemplo práctico</strong> Seleccione estudios primarios sobre catalizadores de un solo átomo para la electroreducción de CO2</p>

Convierta una lista de candidatos en un conjunto de lectura revisado utilizando criterios de inclusión y exclusión. Este ejemplo recupera ocho papeles, ejecuta una colección inteligente en sus títulos y resúmenes, revisa las decisiones y exporta cinco estudios primarios. Se trata de una selección selectiva de clasificación de grupos, no de una revisión sistemática exhaustiva o de una evaluación de calidad de texto completo.

## 1. Encontrar y aceptar a los candidatos {/* #screening-inputs */}

Cree el proyecto **Pantalla de catalisis de átomos únicos** y abra una conversación con un modelo de trabajo. Esta carrera usó **Codex subscription**. Habilitar los conectores de literatura relevantes y configurar su [credenciales](../guides/connectors.md) si es necesario. Enviar:

```text
I am preparing a group meeting on single-atom catalysts for
electrochemical CO2 reduction. Find eight relevant papers published
from 2017 through 2022, including both primary studies and review
articles so I can screen them. Propose the references to the Library
Inbox, with verified titles, DOIs, abstracts and source links. Save a
short candidate list identifying each paper's study type.
Keep the output in English.
```

Abrir **Library → Inbox**, comprobar cada título, DOI y fuente, seleccione estos ocho registros y seleccione **Accept**. Confirme que están vinculados a este proyecto. Otros registros pendientes de Inbox necesitan su propia revisión; no los aceptes sólo para limpiar la bandeja de entrada.

El <ExampleDownload path="/examples/v0330/co2_single_atom_candidate_list.md">lista de candidatos</ExampleDownload> ahorrado registra cinco estudios primarios y tres reseñas/cuentas, incluyendo diferencias entre los años primero y diario. Para una repetición exacta, añadir los ocho DOIs en esa lista al proyecto. Una nueva búsqueda de temas puede devolver diferentes candidatos.

## 2. Ajustar el modelo de detección {/* #screening-model */}

Abre **Settings → Model → Classification models**. Bajo **Smart collections**, seleccione un servicio de clasificación configurado y su modelo. Utilice **Check model** en la tarjeta de servicio y confirme **Check passed**. Este ejemplo utiliza **TypeSafe AI / Jev Latest**; Main continúa con Codex.

![Un modelo separado para colecciones inteligentes](/img/open-science/v0330/classification-smart.webp)

Las colecciones inteligentes no tienen un modelo predeterminado. La unión **Automatic capability selection** es una característica diferente y no puede sustituir a esta. Todas las colecciones inteligentes comparten la unión de selección. Ver [Clasificación](../guides/models.md#smart-collection-model).

## 3. Definir el alcance y las normas {/* #screening-rules */}

En la Biblioteca, elija **New collection**, entre **CO2 Reduction - Primary Studies**, y gire **Smart collection** en. Establecer **Scope** al **Project** llamado **Pantalla de catalisis de átomos únicos**, por lo que sólo se evalúan las ocho referencias del proyecto.

| Campo | Texto utilizado en este ejemplo |
| --- | --- |
| Description | Select primary experimental papers for a group meeting on single-atom catalysts for electrochemical CO2 reduction. |
| Inclusion criteria | Published from 2017 through 2022 inclusive. Reports original experimental research on atomically dispersed metal catalysts used for electrochemical CO2 reduction. |
| Exclusion criteria | Exclude reviews, Accounts, perspectives and purely computational studies. Exclude studies limited to thermal CO2 conversion or reactions other than CO2 electroreduction. |

Todos los criterios de inclusión deben cumplirse y no se puede aplicar ningún criterio de exclusión. Mantenga **Use available full text** y **Update automatically** fuera para este pase de título y extracto, luego elija **Create collection**. La captura de pantalla muestra las reglas salvadas reabridas a través de **Collection rule → Edit rule**.

![Criterios ahorrados, alcance consolidado de los proyectos y opciones de pruebas](/img/open-science/v0330/smart-collection-rules.webp)

**Live rule preview** puede ayudar a ajustar un borrador, pero sus resultados no se guardan. **Use available full text** envía texto PDF disponible al servicio de clasificación; largos PDFs usan pasajes relevantes y PDFs no disponibles se remontan al título y abstracto. Revise la evidencia real mostrada para una decisión antes de tratarla como una evaluación de texto completo.

## 4. Ejecutar un pequeño pase de detección {/* #screening-trial */}

Abrir **Collection actions → Trial run (up to 20 references)**, revisar el alcance y elegir **Start trial run**. El juicio ahorra decisiones y abre **Screening process**. Siga el recuento procesado, los candidatos pendientes y los resultados de llegada. **Coincidencias de IA** describe las decisiones modelo de esta carrera; Las decisiones manuales todavía determinan la composición de la colección.

Para interrumpir un pase de funcionamiento, elija **Pause** (**Pause analysis**) etiquetado, espere a **En pausa**, luego utilice **Resume analysis**. Una carrera ya no puede ser resumible después de sus reglas, documentos de candidato o cambios de progreso guardados; comprueba la regla actual antes de comenzar un nuevo pase. **Volver a los resultados** vuelve a Incluido, Revisión de necesidades, Excluido y No evaluado. **Run details** muestra información sobre el pase.

![El proceso de revisión completado para los mismos ocho candidatos](/img/open-science/v0331/smart-completed.webp)

| Ver | Cómo usarlo |
| --- | --- |
| Incluidos | Lea los documentos emparejados y confirme elegibilidad. |
| Requiere revisión | Resolver la incertidumbre o una evaluación obsoleta contra la fuente real. |
| Excluidos | Comprueba que la razón de exclusión está de acuerdo con tus criterios. |
| Sin evaluar | Comprueba la falta de pruebas o un error de evaluación reportado antes de reintentar. No es una decisión de exclusión. |

Haga clic en el **Evaluation details** de una fila para inspeccionar su decisión, emparejar las puntuaciones, evidencia e historia del modelo. Los resultados describen la regla que coincide; no son medidas de calidad de estudio o tamaño de efecto.

![Una decisión incierta real con pruebas de título y extracto y puntuaciones modelo](/img/open-science/v0330/screening-review.webp)

## 5. Revisar y confirmar el conjunto de lectura {/* #screening-review */}

Abra el título de papel, lea su resumen y siga su enlace DOI/source según sea necesario. Compare la fecha de publicación, el tipo de estudio, el catalizador y la reacción con las reglas. Elija **Include** o **Exclude** sólo después de ese cheque.

En el ejemplo, el primer pase excluyó dos exámenes, dejó cinco estudios primarios en **Needs review**, y no pudo evaluar un registro con pruebas insuficientes legibles. Los cinco estudios primarios se incluyeron manualmente; el examen restante fue excluido manualmente después de comprobar su tipo de estudio. Este es el paso de revisión, no cinco decisiones de inclusión automática.

![Un estudio primario fue incluido manualmente después de revisar su resumen y criterios](/img/open-science/v0330/screening-manual-decision.webp)

| Registro revisado | Decisión final | Basis |
| --- | --- | --- |
| Ju, 2017 · [10.1038/s41467-017-01035-z](https://doi.org/10.1038/s41467-017-01035-z) | Incluir | Comparación experimental de electrocatalizadores de CO2 de metal–nitrógeno–carbono. |
| Zhang, 2019 · [10.1002/anie.201906079](https://doi.org/10.1002/anie.201906079) | Incluir | Preparación y pruebas electroquímicas de los sitios FeN5. |
| Cai, 2021 · [10.1038/s41467-020-20769-x](https://doi.org/10.1038/s41467-020-20769-x) | Incluir | Estudio experimental de catalizadores cu-sitio para la conversión de CO2 a metano. |
| Li, 2022 · [10.1021/acs.nanolett.1c04382](https://doi.org/10.1021/acs.nanolett.1c04382) | Incluir | Tuning de fósforo experimental de catalizadores Fe de un solo átomo. |
| Zhang, 2021 · [10.1002/anie.202014718](https://doi.org/10.1002/anie.202014718) | Incluir | Preparación experimental y pruebas de CO2 de sitios Ag soportados. |
| Su, 2019 · [10.1021/acs.accounts.8b00478](https://doi.org/10.1021/acs.accounts.8b00478) | Excluir | Cuenta; fuera de la regla de estudio primario. |
| Li, 2020 · [10.1002/adma.202001848](https://doi.org/10.1002/adma.202001848) | Excluir | Examen; Mantener por separado como lectura de fondo. |
| Wang, 2022 · [10.1002/smm2.1101](https://doi.org/10.1002/smm2.1101) | Excluir | Revisión, clasificado manualmente después de comprobar la fuente. |

Las decisiones manuales permanecen cuando se actualiza la colección. **Use model decision** elimina una anulación manual individual; **Reset manual decisions** en el menú de colección tiene un alcance más amplio. Revise ese alcance antes de utilizarlo.

## 6. Exportar y utilizar los papeles seleccionados {/* #screening-export */}

Confirme las entradas **Incluye 5**, **Excluido 3**, y cero restantes **Needs review** o **Not evaluated**. Las filas de inclusión deben decir **Manually included** para este ejemplo. Las puntuaciones de primer paso de tu modelo pueden diferir.

![Cinco documentos incluidos manualmente y la división 5/3 final](/img/open-science/v0330/screening-included.webp)

Elija **Collection actions → Export included references → BibTeX** o **RIS**, guarde el archivo, y compruebe que contiene cinco registros DOI. El <ExampleDownload path="/examples/v0330/screened-primary-studies.bib">ejemplo BibTeX</ExampleDownload> conserva las citas exportadas con resúmenes eliminados para la redistribución. Es una bibliografía, no un registro de detección-decisión o un paquete PDF. Mantenga el <ExampleDownload path="/examples/v0330/screening-decisions.csv">mesa de decisión revisada</ExampleDownload> junto a él al entregar la selección.

Utilice el conjunto seleccionado para un [paquete de lectura de mezclas de grupo](journal-club.md). Obtenga e inspeccione los textos completos antes de extraer resultados detallados o comparar el rendimiento del catalizador. **Update automatically** puede evaluar los registros nuevos o modificados en el alcance elegido y puede incurrir en costos de servicio; no busca bases de datos externas para nuevos papeles.
