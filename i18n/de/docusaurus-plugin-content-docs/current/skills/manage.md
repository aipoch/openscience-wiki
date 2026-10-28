---
title: "Verwalten und Validieren von Skills"
last_update:
  date: '2026-10-27'
---

# Verwalten und Validieren von Skills {/* #manage-and-validate-skills */}

Importieren Sie eine getestete Methode aus lokalen Dateien oder GitHub, exportieren Sie Kopien und pflegen Sie das installierte Skills. Exportieren Sie zuerst eine Methode, wenn Sie die aktuelle Version beibehalten müssen.

Überprüfen Sie im Batch-Management die ausgewählte Anzahl im unteren Aktionsbereich, bevor Sie eine Operation durchführen. Lesen Sie dort das Abschluss- oder Fehler-Feedback und überprüfen Sie dann die resultierenden Elemente. Die Auswahl eines Eintrags allein aktiviert, installiert oder löscht ihn nicht.

## Installieren vom Marktplatz {/* #marketplace */}

Für das Durchsuchen von Katalogen, die Installation und Updates folgen Sie dem [Skill Marketplace Guide](marketplace.md). Dieses Kapitel behandelt lokale und GitHub-Importe, Exporte und Wartung von installiertem Skills.

## Exportieren und Importieren eines lokalen Pakets {/* #export-and-import-a-local-package */}

<p className="example-label"><strong>Beispiel</strong> Exportieren und Reimportieren eines RNA-seq Skill</p>

1. Finden Sie `rnaseq-count-qc` in **Settings → Skills** und wählen Sie **Actions → Export**. Speichern Sie den ZIP.
2. Wählen Sie **Add skill → Upload skills → Upload skill files** und wählen Sie dieses ZIP.
3. In **Confirm import** überprüfen Sie den Quelldateinamen und die Diagnose. Die Kandidaten werden zunächst ungeprüft.
4. Öffnen Sie **Vorschau rnaseq-count-qc**. Lesen Sie SKILL.md und die Dateiliste. Der eigentliche Export bewahrte `references/sample-metric-schema.md`.
5. Schließen Sie die Vorschau, wählen Sie den Kandidaten und wählen Sie **Import selected (1)**.
6. Durchsuchen Sie die importierte Zeile und prüfen Sie den endgültigen Namen und die Quelle.

![Prüfung des vollständigen Pakets vor dem Import](/img/open-science/capabilities-walkthrough/11-skill-package-preview.webp)

In diesem Beispiel existierte das ursprüngliche Personal Skill bereits. In der Vorschau wurde **Name exists** angezeigt und ein separates **Importiert `rnaseq-count-qc-2`** importiert. Das Original und seine Specialist-Bindung blieben erhalten. Gehen Sie nicht davon aus, dass jeder Import das bestehende Paket aktualisiert; Inspizieren Sie die Quelle des Kandidaten und aktualisieren / ersetzen Sie die Diagnose.

![Die importierte Kopie und das Original Personal Skill](/img/open-science/capabilities-walkthrough/12-skill-imported-copy.webp)

| Einfuhrkontrolle | Zweck |
| --- | --- |
| Wählen Sie alle / Invertieren / Kandidaten Checkbox | Wählen Sie aus, welche entdeckten Pakete importiert werden sollen; Ein Archiv kann mehrere Skills enthalten. |
| Preview / Close Preview | Lesen Sie Anweisungen und Dateien vor der Installation. |
| Name existiert / Diagnose | Warnung vor Identitäts- oder Inhaltsproblemen. Überprüfen Sie den resultierenden Namen nach dem Import. |
| Andere Dateien auswählen | Ersetzt die aktuelle Kandidatenauswahl. |
| Auswahl importieren | Führt die ausgewählten Importe aus und meldet Erfolge, unveränderte Pakete oder Misserfolge. |

Ein Markdown-Upload benötigt YAML `name` und `description`; Ein ZIP/`.skill`-Bundle benötigt SKILL.md. Lokaler Upload holt keine fehlenden Dateien von URLs, die in Anweisungen eingebettet sind. Nicht unterstützte Formate, fehlende Metadaten, Limits für die Archivgröße und unsichere Archivpfade sind Validierungsfehler und keine Gründe, die Validierung zu deaktivieren.

## Importieren eines bereits installierten lokalen Skill {/* #import-an-already-installed-local-skill */}

<p className="example-label"><strong>Beispiel</strong> Importieren Sie das lokale Peer-Review-Paket</p>

**Add skill → Import installed skills** scannt `~/.agents/skills` und `~/.codex/skills`. In diesem Beispiel fand der lokale Scan 68-Kandidaten, die ursprünglich alle ausgewählt wurden. Clear **Select all installed skills**, dann wählen Sie die spezifische Methode; **Invert** nur nach Überprüfung, was gerade ausgewählt ist.

1. Öffnen Sie **Preview Peer-Review** und überprüfen Sie den Quellordner, die Anweisungen und die referenzierten Dateien.
2. Wählen Sie **Close preview**, wählen Sie nur `peer-review`, dann **Import selected (1)**.
3. Warten Sie auf **Importierte 1 Fertigkeit**. Der Kandidat wird dann mit **Imported** gekennzeichnet und kann nicht erneut für den gleichen Import ausgewählt werden.
4. Kehren Sie zu Skills zurück, suchen Sie nach `peer-review` und prüfen Sie die importierte Zeile. Der Quellordner bleibt an Ort und Stelle; Open-Science verwendet eine importierte Kopie.
5. Verwenden Sie **Rescan** nach dem Ändern der installierten Ordner. Überprüfen Sie den Ursprung, die Auswahl und den Status erneut, bevor Sie erneut importieren.

![Vorschau des lokal installierten Peer-Review-Pakets](/img/open-science/local-todo-batch/12-installed-skill-preview.webp)

![Finden Sie das importierte Paket in der Skills-Liste](/img/open-science/local-todo-batch/13-installed-skill-imported.webp)

Überprüfen Sie nach dem Import die Vorlagen- und Referenzdateien im Skill-Detail. Bevor Sie eine Methode von einem anderen Assistenten verwenden, überprüfen Sie, ob die erforderlichen Tools und Laufzeitfunktionen in dieser Sitzung verfügbar sind.

## Importieren und Update von GitHub {/* #import-and-update-from-github */}

<p className="example-label"><strong>Beispiel</strong> Importieren und Aktualisieren eines ESM-2 Skill</p>

1. Wählen Sie **Add skill → Import from GitHub**. Geben Sie ein Schlüsselwort ein, `owner/repo`, `owner/repo@ref` oder GitHub URL, und wählen Sie dann **Find skills**. Verwenden Sie eine feste Ref für eine reproduzierbare Paketquelle.
2. Lesen Sie das Repository und die Kandidatenzählung. Dieser Scan wählte zunächst jeden Kandidaten aus; **Select all** löschen, bevor Sie nur die erforderliche Methode auswählen. Es unterscheidet sich vom ungeprüften ZIP-Bestätigungsbildschirm.
3. Öffnen Sie **Preview** und überprüfen Sie den aufgelösten Commit, Ordner, Anweisungen und Dateien. Ein Repository-Scan kann interne Ordner sowie benutzerseitige Skills entdecken; seine Zählung ist nicht die gebündelte Skill-Zählung der App.
4. Schließen Sie die Vorschau, wählen Sie den beabsichtigten Kandidaten aus und wählen Sie **Import selected (1)**. Warten Sie auf das Ergebnis und überprüfen Sie den Namen unter **Imported skills**.
5. Kehren Sie zu Skills zurück und suchen Sie nach diesem Namen. Überprüfen Sie seine Quelle und Verfügbarkeit, bevor Sie es verwenden.

![Überprüfen Sie einen GitHub Skill und seine angepinnte Quelle vor dem Import](/img/open-science/local-todo-batch/15-github-skill-preview.webp)

Importieren von `fair-esm2` aus dem Produkt-Repository erstellt **`fair-esm2-2`** weil der eingebaute Name bereits existierte. Das eingebaute Paket blieb. Das Importieren von Anweisungen installiert keine Modellgewichte oder stellt fest, dass Inferenz funktioniert.

### Anwendung einer vorgelagerten Überarbeitung {/* #apply-an-upstream-revision */}

Scannen Sie das gleiche Repository mit der beabsichtigten neueren Ref. Der vorhandene Kandidat kann **Update available** anzeigen. Wählen Sie nur diesen Kandidaten aus und importieren Sie ihn; Inspizieren Sie die bereits importierte Zeile und Vorschau danach. In der ESM-2 Prüfung wurde die gleiche `fair-esm2-2` Kopie aktualisiert, und Scannen, dass ref zeigte wieder **Imported**. Die aktualisierte Instruktionsstelle stimmte mit der Repository-Quelle überein. Der Importeur schreibt Frontmatter und den kollisionssicheren Namen um, so dass Whole-file-Bytes nicht mit dem ursprünglichen SKILL.md übereinstimmen müssen.

![Eine vorgelagerte Revision ist für die importierte Kopie verfügbar](/img/open-science/local-todo-batch/16-github-update-available.webp)

### Wiederherstellen von GitHub Rate Limiting {/* #recover-from-github-rate-limiting */}

Für **GitHub-Anfrage war ratenbegrenzt** öffnen Sie **Manage GitHub credential**, geben Sie ein verwendbares Token ein und wählen Sie **Verify and save**. Nach **Token verifiziert und gespeichert**, wiederholen Sie den Scan. **Cancel** verlässt ohne zu sparen. Halten Sie Token aus Screenshots und Ausgabeberichten fern.

## Aktivieren, Deaktivieren und Löschen {/* #enable-disable-and-delete */}

Öffnen Sie **Manage**, filtern Sie nach Quelle/Status und suchen Sie nach einer bestimmten Methode. Wählen Sie das Ergebnis aus, bevor Sie eine Aktion anwenden. **Ausgewählt (n)** zeigt die Auswahl; **Clear selection** entleert es. Überprüfen Sie den vollständig ausgewählten Satz, wenn sich die Filter ändern.

![Die importierte Kopie wird im Massenmanagement deaktiviert](/img/open-science/capabilities-walkthrough/13-skill-bulk-disabled.webp)

Nachdem Sie die Verfügbarkeit geändert haben, öffnen Sie das Skill-Detail erneut, um seinen Status zu bestätigen. Behalten Sie einen Export einer Methode, die Sie benötigen, bevor Sie sie löschen.

| Aktion | Erwartetes Ergebnis |
| --- | --- |
| Ausgewählt aktivieren | Macht ausgewählte förderfähige Pakete wieder verfügbar. Überprüfen Sie den Zeilenstatus. |
| Disable selected | Bewahrt berechtigte benutzergesteuerte Pakete auf, entfernt jedoch die Verfügbarkeit des Main-Agenten für spätere Anfragen; Anwendungserforderliches Skills kann nicht deaktiviert werden. |
| Ausgewählt löschen | Öffnet eine Bestätigung mit den genau ausgewählten Namen und Löschergebnissen. |
| Löschen n Skills | Entfernt die förderfähigen lokalen Pakete nach der Bestätigung. Es gibt keinen Skill-Trash/Restore-Workflow. |
| Abbrechen | Lassen Sie die Pakete installiert. |

Featured- und Specialist-verknüpfte Pakete können vor Löschung geschützt werden. Entfernen Sie eine veraltete Bindung oder deaktivieren Sie gegebenenfalls ein benutzergesteuertes Paket. Anwendungserforderlicher Skills bleibt aktiviert; siehe [Aktivierungsregeln](overview.md#why-some-switches-cannot-be-turned-off). Nach dem Löschen bestätigen Sie, dass das ausgewählte Paket in der gefilterten Liste fehlt.

## Aktualisierung und Diagnose {/* #update-and-diagnose */}

| Symptom | Check und nächste Aktion |
| --- | --- |
| Importiert, aber nicht in der Liste | Clear Source, Agent und Tag Filter; Suchen Sie den resultierenden Namen, einschließlich Suffixe. |
| Nach dem Import fehlende Dateien | Prüfung der Paketdateiliste und Wiederausfuhr; Eine einzelne Markdown-Datei kann nicht automatisch eine separate Referenzdatei enthalten. |
| Revisionskonflikt während der Bearbeitung | Öffne die neueste Version neu, vergleiche Änderungen und speichere bewusst. |
| Skill lädt, aber eine Funktion ist nicht verfügbar | Überprüfen Sie, ob das Paket tatsächlich einen Kernel-Helfer bereitstellt; Gewöhnliche Anweisungen sind keine Notebook Funktionen. |
| Fehlendes Paket / Laufzeit | Verwendung [Wissenschaftliche Instrumente](../tools/scientific.md) und der ausgewählte Paketmanager der Laufzeit. |
| GitHub/Authentifizierungsfehler | Bewahren Sie den aktuellen HTTP-Status und die entsorgte Quell-URL auf; siehe [Fehlerbehebung](../guides/troubleshooting.md). |

Bezugsnummer der Durchführung: [SkillUploadView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillUploadView.tsx), [SkillBulkManageView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillBulkManageView.tsx), [SkillImportView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillImportView.tsx).

## Sicher Importieren und Bearbeiten von Skills {/* #import-batches */}

Große Installed-Skill-Auswahlen werden in Batches importiert. Warten Sie auf das endgültige Ergebnis und prüfen Sie die importierte Liste, bevor Sie den Import wiederholen. Einem externen Fertigkeit mit einem reservierten Namenspräfix wird ein sicherer lokaler Name zugewiesen; verwenden Sie den Namen, der im lokalen Katalog angezeigt wird. Speichern Sie den Körper beim Bearbeiten und überprüfen Sie, ob der separat bearbeitete Name und die Beschreibung korrekt bleiben. Bilder, die der aktuellen Nachricht beigefügt sind, können auch die Auswahl der Fertigkeit informieren; Überprüfen Sie den Umfang der ausgewählten Fertigkeit, bevor Sie sie handeln lassen.

## Speichern Sie ein GitHub-Repository für später {/* #saved-repositories */}

Nach **Import from GitHub → Find skills** Scannt ein Repository, wählen **Save repository**. Nächstes Mal, wählen Sie es unter **Saved repositories** um erneut zu scannen, dann Vorschau und Import der beabsichtigten Fähigkeiten. Ein gespeicherter Ref wird beibehalten; ein Standardzweig kann sich ändern. Das Speichern installiert oder aktualisiert keine Fähigkeiten automatisch, und das Entfernen des Lesezeichens führt zu installierten Fähigkeiten.
