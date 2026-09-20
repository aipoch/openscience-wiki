---
title: "Planung vor Ausführung"
last_update:
  date: '2026-09-20'
---

# Planung vor Ausführung {/* #planning-before-execution */}

Verwenden Sie **Plan first**, um Eingaben, Methoden, Ausgaben und Akzeptanzkriterien vor der Ausführung zu überprüfen. Plangenehmigung und Werkzeuggenehmigung sind getrennte Entscheidungen. Screenshot-Eingänge befinden sich in [Beispieldaten](../reference/example-data.md).

## Einreichen eines Planungsantrags {/* #submit-a-planning-request */}

<p className="example-label"><strong>Praxisbeispiel</strong> Überprüfung und Überarbeitung eines Rohzähl-QC-Plans</p>

1. Fügen Sie die Eingabedatei an und beschreiben Sie das Ziel, die Methoden, die Ergebnisse und die Grenzen im Composer.
2. Öffnen Sie **More send options → Plan first**. Eine Textanfrage ist erforderlich; Ein Attachment-Only-Entwurf ermöglicht diese Option nicht.
3. Warten Sie auf die Planung. Wenn eine **Plan control**-Berechtigungskarte angezeigt wird, prüfen Sie sie und lassen Sie den beabsichtigten Umfang zu oder verweigern Sie sie. Dies autorisiert Planerstellung / Entscheidungsaufzeichnung, nicht alle zukünftigen Ausführung.
4. Warten Sie auf **Plan ready for review**. Behandeln Sie keinen normalen Absatz mit der Aufschrift "Hier ist mein Plan" als Beweis dafür, dass eine strukturierte Genehmigungskarte existiert.

![Planen Sie zuerst im Sendemenü](/img/open-science/guides-walkthrough/21-plan-first-entry.webp)

![Separate Berechtigung zum Erstellen und Aufzeichnen eines Plans](/img/open-science/guides-walkthrough/22-plan-permission.webp)

Die Aufgabe spezifizierte unveränderte Rohzählungen, separate ID/Längen-Metadaten, pro Stichprobe QC, drei verwaltete Ausgänge und keine Differenzausdrucksansprüche. Eine genaue erste Anfrage macht den Plan leichter zu beurteilen.

## Prüfung vor der Genehmigung {/* #inspect-before-approving */}

Wählen Sie **Open**, um den strukturierten Plan neben der Konversation anzuzeigen. Prüfen Sie Phasen, Schrittreihenfolge, Ausführungsbesitzer, gewünschte Ausgaben und Machbarkeitshinweise. Verwenden Sie **Enter full screen**, um einen langen Plan zu lesen, und **Download Plan**, um ihn beizubehalten. Das Konfidenzlabel ist die Bewertung des Plans, kein Beweis dafür, dass der Code bereits ausgeführt wurde.

![Strukturierter Plan mit Phasen und gewünschten Outputs](/img/open-science/guides-walkthrough/23-plan-review.webp)

| Kontrolle/Zustand | Was zu tun ist |
| --- | --- |
| Öffnen | Lesen Sie den vollständigen Plan; Das Öffnen ist keine Genehmigung. |
| Freigeben | Autorisieren Sie den aktuellen Plan, um fortzufahren. Werkzeugspezifische Genehmigungen können weiterhin erscheinen. |
| Reagieren Sie auf den Plan | Beschreiben Sie eine verwertbare Korrektur von Inputs, Methoden, Outputs oder Akzeptanzkriterien. |
| Planfeedback senden | Senden Sie nonempty Feedback und warten Sie auf den überarbeiteten Plan. |
| Abweisung, wenn sie in der Genehmigungsvorschau angezeigt wird | Absage/Abweisung des ausstehenden Plans; Es unterscheidet sich vom bloßen Schließen einer Vorschau. |
| Ersetzte/neuere Planwarnung | Diese Momentaufnahme ist veraltet und kann den aktuellen Plan nicht genehmigen. Öffnen Sie die aktuelle Karte wieder. |

## Änderungen anfordern und den Ersatz überprüfen {/* #request-changes-and-review-the-replacement */}

Geben Sie in **Respond to Plan** genau an, was sich ändern muss. Fordern Sie beispielsweise eine Input-Integritätsprüfung an, öffnen Sie jede Ausgabe erneut und erstellen Sie eine Zuordnung zwischen verkürzten Plot-Etiketten und ursprünglichen Identifikatoren. Wählen Sie **Send Plan feedback** aus, warten Sie auf den Ersatz und überprüfen Sie dann, ob jede angeforderte Änderung vorhanden ist.

![Feedback vor der Einreichung](/img/open-science/guides-walkthrough/24-plan-feedback.webp)

Lesen Sie den Ersatz und verwenden Sie den **Approve**-Button. Die bereits geöffnete alte Vorschau kann mit einer Warnung sichtbar bleiben, dass sie ersetzt wurde; Die angezeigten Schritte sind nicht der letzte Fortschritt des aktiven Plans. Öffnen Sie den aktiven Plan erneut, anstatt einen alten Screenshot zu genehmigen.

## Befolgen Sie die Ausführung und überprüfen Sie die Ergebnisse {/* #follow-execution-and-verify-results */}

Verwenden Sie für Warteschlangen-Follow-ups [Bedienelemente für die Kompositionswarteschlange](composer.md#manage-a-running-tasks-queue). Das Bearbeiten der Warteschlange genehmigt keinen Plan.

Nach der Genehmigung beginnt die Sitzung mit der Ausführung des Plans. Im Ask-Modus können weiterhin separate Tool-Permission-Karten angezeigt werden. Untersuchen Sie Befehl, Ziel und Umfang. Wenn eine Operation fehlschlägt, ist der tatsächliche Eingabe-, Umgebungs- oder Zugriffsfehler zu identifizieren, bevor erneut versucht wird; Die Genehmigung des Plans erfüllt diese Anforderungen nicht.

Schrittstatus können nicht gestartet, in Arbeit, abgeschlossen, blockiert, übersprungen und nicht ausgeführt werden. Ein abgeschlossener Plan ist keine wissenschaftliche Validierung an sich. Öffnen Sie die aktuelle CSV, Figur und Bericht; ihre Inhalte mit den Akzeptanzkriterien zu vergleichen. In diesem Beispiel stimmten die 12-Sample-Zusammenfassungen mit einer unabhängigen Berechnung der ursprünglichen Matrix überein.

Weiter mit [Dateien und Versionen](./files.md), [Notebook-Beweis](./notebook.md) und [Berechtigungen](./approval-modes.md).

Quelle: [Plangenehmigungs- und Vorschaukontrollen](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/session-plan/SessionPlanSurfaces.tsx).

## Resümee nach Kontextrekonstruktion {/* #resume-plan */}

Von v0.31.0 aus kann der Agent den aktuellen Sitzungsplan, seine Überarbeitung und ausstehende Genehmigungen nach dem Wiederaufbau seines Kontexts wiederherstellen. Öffne den aktiven Plan erneut und überprüfe, welche Schritte tatsächlich abgeschlossen wurden, bevor du ihn auffordert, fortzufahren. Eine noch ausstehende Genehmigung steht noch aus. die Wiedereinziehung des Plans ihn nicht genehmigt oder ein Vorhaben bestätigt, dessen Ergebnis nicht erfasst wurde.
