---
title: "Genehmigungen und Genehmigungen"
last_update:
  date: '2026-09-28'
---

# Genehmigungen und Genehmigungen {/* #permissions-and-approvals */}

Verwenden Sie **Agent controls**, um auszuwählen, wie die aktuelle Konversation die Genehmigung anfordert. Verwenden Sie **Settings → Permissions**, um den Standard für neue Gespräche festzulegen und den erinnerten Zugriff zu überprüfen. Dies sind separate Vorgänge: Das Ändern eines Standardwerts setzt bestehende Gespräche nicht zurück oder widerruft deren Zuschüsse.

<span id="permission-requests" />

<span id="plan-first" />

<span id="activity-rows" />

## Wählen Sie einen Gesprächsmodus {/* #choose-a-conversation-mode */}

| Modus | Verwenden Sie es, wenn | Was zu erwarten ist |
| --- | --- | --- |
| **Ask for approval** | Sie möchten angeforderte Operationen überprüfen | Genehmigungskarten für Aktionen, die keine gültige Zuwendung oder Ausnahme haben |
| **Auto-approve edits** | Sie erlauben Routineänderungen innerhalb des Arbeitsbereichs | Unterstützte Edits werden automatisch übergeben; Befehle, Netzwerk- und MCP-Operationen können weiterhin eine Genehmigung benötigen |
| **Full access** | Sie haben sich dafür entschieden, Agentenoperationen ohne Aufforderungen zuzulassen | Befehle, Dateiänderungen und Netzwerkanforderungen können ohne manuelle Berechtigungskarten ausgeführt werden; sonstige Zugangs- und Dienstanforderungen bleiben bestehen |

Öffnen Sie **Agent controls** neben dem Komponisten und lesen Sie den ausgewählten Modus. Überprüfen Sie eine Kompatibilitätsnachricht, die zeigt, wie das Framework sie implementiert. Die Vollzugriffskontrolle hat eine eigene Bestätigung. **Auto-review** ist ein anderes Steuerelement für die Überprüfung von Ergebnissen und bedeutet nicht die automatische Genehmigung von Bearbeitungen.

![Der eigentliche englische permission-mode selector](/img/open-science/walkthrough-2026-09-08/57-permission-modes.webp)

Überprüfen Sie den effektiven Modus, der für Ihren Agenten angezeigt wird; Das unterstützte Genehmigungsverhalten kann je nach Framework unterschiedlich sein. Nicht jeder Modus wurde in allen vier Frameworks ausgeübt.

<span id="a-safe-approval-order" />

## Lesen Sie eine Genehmigungskarte {/* #read-an-approval-card */}

Lesen Sie den Vorgang, die ausgewählte Umgebung und den vorgeschlagenen Code vor der Genehmigung. Bestätigen Sie für eine Datenprüfung, dass sie die beabsichtigte Eingabe liest und nur die angeforderten Ausgaben schreibt. Die Installation einer fehlenden Abhängigkeit ist eine separate Operation mit einem anderen Zweck und einer anderen Wirkung.

![Python Ausführungsgenehmigung aus dem öffentlichen GSE60450-Fall](/img/open-science/guides-walkthrough/25-python-permission.webp)

| Kontrolle oder Information | Was zu prüfen oder zu tun ist |
| --- | --- |
| Titel des Werkzeugs und Zusammenfassung | Identifizieren Sie den tatsächlichen Betrieb, das Ziel und die Quelle |
| Erweiterbarer Code oder Argumente | Prüfpfade, Laufzeit, Paketnamen oder Diensteingaben |
| **Authorization scope** Pfeil | Wählen Sie aus den Bereichen, die diese Anfrage unterstützt |
| **Allow once** | Veröffentlichen Sie nur diesen Aufruf |
| **Allow for this conversation** | Denken sie daran, passende anrufe für diese konversation, einschließlich über neustarts. |
| **Allow for this project** | Anwenden des passenden Zugriffs im gesamten Projekt und Bestätigung des breiteren Geltungsbereichs |
| **Allow globally** | Anwenden von Matching Access über Projekte hinweg und Bestätigung des breiteren Anwendungsbereichs |
| **Deny** | Absage an das vorgestellte Vorhaben; Überprüfen Sie die resultierende Antwort, bevor Sie eine Alternative wählen |
| Zusätzliche Anbieteroptionen, falls vorhanden | Lesen Sie ihr tatsächliches Etikett und ihre Wirkung; Verfügbare Optionen variieren je nach Anfrage |

Die primäre Schaltfläche Erlauben verwendet normalerweise den Konversationsumfang, wenn die Anforderung ihn unterstützt. Lesen Sie das Etikett, bevor Sie klicken. Überprüfen Sie für eine Befehlspräfix-Erteilung das angezeigte Präfix: Spätere Befehle, die mit diesem Präfix beginnen, können übereinstimmen. Eine Berechtigung für eine Laufzeit ist keine Berechtigung für einen nicht verwandten externen Dienst.

### Denken Sie daran, Web-Reading Genehmigung {/* #remember-web-reading-approval */}

Wählen Sie für eine unterstützte **Webseiten lesen**-Anfrage **Allow for this conversation**, um sich diese Funktion für spätere Weblesungen in derselben Konversation zu merken. Es kann andere Websites abdecken, nicht nur die erste URL. **Allow once** gilt nur für diesen Aufruf. Überprüfung oder Widerruf der Finanzhilfe unter **Gespeicherte Berechtigungen**; Es fügt keine Hosts zur Notebook-Netzwerk-Erlaubnisliste hinzu oder autorisiert Uploads.

### Denken Sie daran, Web-Such-Genehmigung {/* #remember-web-search */}

Ab v0.30.2 bieten unterstützte native **Search the web**-Anfragen von Claude Agent auch **Allow for this conversation** an. Passende spätere Suchanfragen derselben Unterhaltung können diese Berechtigung wiederverwenden. **Allow once** gilt nur für die aktuelle Anfrage. Unter **Remembered permissions** können Sie **Search the web** prüfen oder widerrufen. Suche und **Read web pages** sind getrennte Berechtigungen. Diese Option wird nicht von jedem Framework oder Connector unterstützt; prüfen Sie den angezeigten Geltungsbereich.

## Verwalten Sie erinnerten Zugriff {/* #manage-remembered-access */}

Öffnen Sie **Settings → Permissions → Remembered permissions**. Filtern nach **All**, **Global**, **Project** oder **Session**. Zeilen zeigen eine Fähigkeit, einen Umfang und eine beliebige Qualifikation oder eine breitere Abdeckung an. Ein Session-Link öffnet seine Besitzer-Konversation; ein Connector Policy-Hinweis zu der zugehörigen Konfiguration führt.

| Aktion | Ergebnis |
| --- | --- |
| **Widerruf** in einer Zeile | Entfernt diese erinnerte Zuwendung sofort; Überprüfen Sie die Undo-Mitteilung |
| Gruppe **Revoke all** | fordert die Streichung der Zuschüsse dieser Gruppe; Überprüfen Sie, ob der angezeigte Umfang vollständig ist, bevor Sie ihn verwenden |
| **Restore defaults** | Fügt fehlende Baseline Global Grants hinzu und lässt andere erinnerte Zugriff intakt |
| **Defaults restored** | Es fehlen keine Basisstipendien; Der Wiederherstellungs-Button ist deaktiviert |
| Anwendungsbereichfilter | Ändert die angezeigten Zeilen; es gewährt oder widerruft den Zugang nicht |

Wählen Sie **Widerruf**, um den beabsichtigten Zuschuss zu entfernen. Verwenden Sie **Undo** während angeboten, wenn dies ein Fehler war. **Restore defaults** fügt fehlende Baseline-Zuschüsse hinzu; Es stellt nicht jede Berechtigung wieder her, die Sie zuvor entfernt haben.

### Lesen Sie den effektiven Umfang eines gespeicherten Zuschusses {/* #read-a-saved-grants-effective-scope */}

Überprüfen Sie die Connector/Tool, **Global / Projekt / Session** Umfang und **Jeder Anruf / Spezifische Eingabe / Kommandogruppe**-Qualifikation, bevor Sie einen Zuschuss widerrufen. Kommandogruppeneinträge können ihre Genehmigungszusammenfassung und ihr Datum enthalten.

**Blocked in Connectors; this permission is currently inactive** bedeutet, dass der gespeicherte Zuschuss die Connector-Richtlinie nicht außer Kraft setzt. **Allowed by Connector policy even without this permission** bedeutet, dass der Widerruf dieses Zuschusses allein diese Policenzulage nicht entfernen wird. Öffnen Sie den benannten Connector, um seine Regel zu überprüfen. Verwenden Sie **Undo**, wenn der Widerruf unbeabsichtigt war, und überprüfen Sie dann den wiederhergestellten Zustand.

### Eine Gruppe im aktuellen Anwendungsbereich zu widerrufen {/* #revoke-a-group-in-the-current-scope */}

1. Filtern Sie nach dem vorgesehenen Umfang, z. B. **Session**.
2. Wählen Sie die **Revoke all**-Aktion dieser Gruppe aus.
3. Überprüfen Sie, ob die Gruppe freigegeben wurde und dass andere Bereiche ihre Zuschüsse behalten.
4. Lesen Sie bei der nächsten Übereinstimmungsoperation jede neue Genehmigungsanfrage, bevor Sie fortfahren.

Der Widerruf wirkt sich auf die zukünftige Genehmigung aus. Es werden keine abgeschlossenen Bearbeitungen oder Netzwerkanforderungen rückgängig gemacht, und ein breiterer Zuschuss kann den Vorgang dennoch autorisieren.

![Eine neue Ausführungsanfrage nach dem Widerruf der Sitzungsgruppe](/img/open-science/local-todo-batch/40-permission-request-renewed.webp)

Wenn das Inventar unvollständig ist, warten Sie, bis es die fehlgeschlagene Anforderung geladen oder erneut versucht hat, bevor Sie den Gruppenentzug verwenden. Überprüfen Sie den ausgewählten Umfang nach dem Widerruf erneut.

## Diagnose unerwarteten Verhaltens {/* #diagnose-unexpected-behavior */}

| Problem | Prüfung und Abhilfe |
| --- | --- |
| Im Ask-Modus erscheint keine Genehmigungskarte | Prüfen Sie gespeicherte Berechtigungen, die Tool-Richtlinie und anwendungseigene Ausnahmen. Ask erzwingt keine Bestätigung für jeden Lesevorgang, jedes gespeicherte Ergebnis oder jede Rückfrage. Die [Berechtigungsreferenz](../reference/permissions.md) beschreibt die Standardberechtigungen, einschließlich des Schreibens von Anpassungen. |
| Die gleiche Operation ist nach dem Widerruf weiterhin möglich | Prüfen Sie, ob eine weitergehende Projekt- oder globale Berechtigung oder eine erlaubende Richtlinie besteht. Das Entfernen einer Sitzungsberechtigung hebt eine globale Berechtigung nicht auf. |
| Eine genehmigte Operation schlägt fehl | Die Genehmigung erlaubt einen Versuch. Beheben Sie zuerst die gemeldete Ursache, etwa ein fehlendes Paket, eine unzugängliche Datei, ungültige Zugangsdaten oder ein abgelehntes Netzwerkziel. Versuchen Sie es danach erneut. Bei DNS- und Paketdownloadfehlern hilft [Netzwerk](network.md). |
| Einige Geltungsbereiche fehlen | Die Karte zeigt nur Geltungsbereiche, die von der aktuellen Anfrage und dem Projekt- oder Sitzungskontext unterstützt werden. Wählen Sie keinen größeren Geltungsbereich allein deshalb, weil eine engere Option fehlt. |

Quelle: [Gesparte Zuschüsse und Rückgängigmachung](https://github.com/aipoch/open-science/commit/469b593b).

## Bibliothek arbeitet im Auto-Modus {/* #library-auto */}

Mit **Auto-approve edits** kann ein definierter Satz integrierter Bibliotheksoperationen die Per-Call-Genehmigung des Agenten automatisch passieren. Dazu gehören das Suchen und Lesen von Referenzen, das Speichern in Inbox, das Erwerben von PDFs, das Formatieren von Referenzen und das Vorbereiten von Zitierdokumenten. Dies reduziert wiederholte Eingabeaufforderungen während der routinemäßigen Bibliotheksarbeit.

Die Regel gilt für anerkannte app-eigene Literatur-Tools, nicht für jeden MCP-Aufruf, Befehl oder Netzwerkbetrieb. Die eigenen datei-, netzwerk- und ressourcenregeln der tools gelten weiterhin, und diese entscheidung schafft keine dauerhafte bewilligung. Wählen Sie **Ask for approval**, wenn Sie Agent-Anfragen einzeln prüfen möchten. Überprüfen Sie Inbox-Kandidaten, bevor Sie sie akzeptieren.
