---
title: "Durchsuchen Sie das Internet und lesen Sie Quellen"
last_update:
  date: '2026-11-20'
---

# Durchsuchen Sie das Internet und lesen Sie Quellen {/* #search-the-web-and-read-sources */}

Verwenden Sie das eingebaute **Open-Science Agent**, um öffentliche Webseiten zu finden und deren Text in einer Konversation zu lesen. Dies ist nützlich, um Berichtsrichtlinien, Softwaredokumentation und Forschungsankündigungen zu finden. Für bibliographische Aufzeichnungen und Volltextpapiere verwenden Sie auch [wissenschaftliche Datenbanken](databases.md) und [Bibliothek](../guides/library.md).

## Beginnen Sie mit einer Frage {/* #start */}

1. Wählen Sie in **Settings → Agent** **Open-Science Agent** aus. Verbinden eines unterstützten Main-Modells in **Settings → Model**; ein Codex-Abonnement kann das Modell liefern.
2. Öffnen Sie ein Projektgespräch. Geben Sie an, was Sie finden möchten, welche Quellen priorisiert werden sollen und welche Datumsbeschränkungen gelten. Bitten Sie den Agenten, die entsprechende Seite zu lesen, bevor Sie antworten.
3. Wenn eine Genehmigung angezeigt wird, prüfen Sie die Suchanfrage, den Zeitbereich, das Ergebnislimit und die Domänenfilter. Genehmigung nur des beabsichtigten Antrags. Eine Genehmigung zum Seitenlesen betrifft die Ziel-URL.
4. Erweitern Sie die Tool-Aktivität und prüfen Sie die zurückgegebenen Quellen. Folgen Sie den Zitaten der Antwort zurück zu den Beweisen, bevor Sie ihre Behauptungen verwenden.

Beispielanfrage:

```text
Find the official PRISMA 2020 checklist page on the public web.
Read the relevant official page and explain what the checklist is for.
Give the source URL and distinguish the webpage text you read from any
linked PDF you did not open. Keep the answer in English.
```

Die integrierte Suche sendet Abfragen an **Exa**, ohne dass ein Exa-Konto erforderlich ist. Das Lesen einer Seite kontaktiert ihre Website. Ihr Berechtigungsmodus gilt weiterhin, und das Abbrechen kann eine bereits gesendete Anforderung nicht zurückziehen. Fügen Sie keine vertraulichen Forschungsdaten in eine öffentliche Suchanfrage ein.

## Lesen Sie die Beweise, nicht nur das Snippet {/* #read-sources */}

Ein Suchergebnis ist ein Auszug. Bitten Sie den Agent, die gewählte Seite zu lesen und die Belegstellen seiner Antwort zu zitieren. Unterstützt werden öffentliches HTML, Markdown und Klartext. Das Werkzeug meldet sich nicht an, verwendet keine Browser-Cookies und führt kein JavaScript der Website aus. Nutzen Sie für Artikel und Anhänge die PDF- und Library-Abläufe; eine HTML-Übersichtsseite ist nicht der Volltext des Artikels.

Wenn der zurückgegebene Text abgeschnitten ist, bitten Sie den Agenten, den Auszug der gespeicherten Seite weiter zu lesen, bevor Sie Schlussfolgerungen ziehen. Eine gespeicherte Quelle spiegelt wider, was zu diesem Zeitpunkt abgerufen wurde. Fragen Sie nach einem frischen Abruf, wenn der aktuelle Wortlaut wichtig ist. Einbehaltene Quellen können Sitzungszweige und förderfähige Exporte von Forschungspaketen verfolgen; Dies archiviert nicht die gesamte Website.

## Wenn eine Quelle nicht gelesen werden kann {/* #recover */}

- Für ein ratenlimit warten sie auf das angegebene intervall, bevor sie es erneut versuchen. Senden Sie nicht wiederholt die gleiche fehlgeschlagene Abfrage.
- Wenn ein erforderlicher Filter nicht unterstützt wird, behalten Sie diese Anforderung bei und wählen Sie eine andere Quelle oder Suchroute; Erweitern Sie die Suche nicht stillschweigend.
- Für eine Anmeldewand, eine blockierte Seite oder einen nicht unterstützten Dateityp öffnen Sie die offizielle Quelle selbst und geben Sie gegebenenfalls eine zugängliche zulässige Datei an. Beschreiben Sie eine ungelesene Seite nicht als verifizierte Beweise.

Für das Finden und Screening von Forschungsarbeiten fahren Sie mit [Konzentrierte Literatursuche](../workflows/focused-literature-search.md) fort.
