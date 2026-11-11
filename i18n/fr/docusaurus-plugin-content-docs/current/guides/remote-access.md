---
title: "Accès au navigateur à distance"
last_update:
  date: '2026-11-11'
---

# Accès au navigateur à distance {/* #remote-browser-access */}

L'accès au navigateur à distance permet à un autre appareil de faire fonctionner l'espace de travail de cet ordinateur. Les projets, les agents, les fichiers et les runtimes de carnet continuent à fonctionner sur cet ordinateur. Il est séparé de [calcul à distance](./remote-compute.md), qui envoie des tâches à une cible d'exécution.

## Paire un téléphone ou une tablette {/* #mobile-pairing */}

Les **Connect mobile device** section dans le bureau **Settings → Remote** offres **WiFi** et **Internet**. Ceci est séparé de la Remote.Il modes décrits ci-dessous; la route QR ne nécessite pas de compte Remote.It.

Ouvrir le panneau d'appariement laisse l'accès à distance **Off** jusqu'à ce que vous choisissiez explicitement **WiFi** ou **Internet**. Une connexion déjà active conserve son état actuel. Choisissez un mode seulement lorsque vous avez l'intention de connecter un autre périphérique, et gardez l'hôte éveillé et en marche.

1. Choisir **WiFi** pour les appareils sur le même réseau local. Si plusieurs adresses hôtes apparaissent, sélectionnez l'adresse accessible depuis le téléphone. Un réseau invité isolé peut empêcher l'accès même lorsque les deux appareils affichent le même nom WiFi.
2. Pour accéder à l'extérieur du réseau local, choisissez **Internet**. Lisez l'avis de connexion Pinggy et attendez qu'un lien de travail et le code QR apparaissent. Trafic utilise le tunnel tiers; examinez le mot de passe affiché et les exigences de connexion.
3. Scannez le code QR actuel avec le téléphone ou la tablette. Pour le mode Internet, entrez le **Connection password** sur demande. Suivez les instructions d'appariement et vérifiez que l'espace de travail prévu s'ouvre.
4. Si le code expire ou que le tunnel se reconnecte, utilisez **Refresh QR code** et scanner le nouveau code. Free Pinggy tunnels changer d'adresse toutes les 60 minutes; un vieux lien enregistré peut arrêter de fonctionner.
5. Vérifier **Connected devices**. Utilisation **Revoke all** pour supprimer ces autorisations de dispositifs une fois terminés, et sélectionner **Off** dans les paramètres distants pour arrêter l'accès à distance. La révocation et l'arrêt de la connexion sont des actions distinctes.

Gardez les liens d'appariement, les codes QR et les mots de passe privés. Un code QR étant visible seulement signifie qu'une offre est disponible; il n'établit pas que l'autre appareil est connecté. Si une connexion échoue, vérifiez l'état d'exécution de l'hôte, l'adresse réseau sélectionnée et la permission du pare-feu avant de générer une autre offre.

## Prérequis et modes {/* #prerequisites-and-modes */}

Ouvrez **Settings → Remote** sur l'ordinateur d'accueil. Installez et connectez-vous à l'application de bureau Remote.It séparée avant d'activer les modes qui l'utilisent. Open-Science appelle son CLI installé; il ne crée pas de compte Remote.It ou ne regroupe pas ce service.

| Mode | C'est pour quoi ? |
| --- | --- |
| Désactivé | Pause l'accès à distance tout en conservant la configuration du fournisseur et les enregistrements de navigation de confiance pour la réutilisation. |
| Accès aux applications | Connectez-vous à travers l'application mobile signée et effectuez une vérification en deux étapes. |
| Accès au navigateur | Utilisez un lien de navigateur HTTPS persistant et effectuez une vérification en deux étapes. |

![Accès à distance inspecté en dehors de l'état](/img/open-science/walkthrough-2026-09-08/63-remote-off.webp)

![Remote control d’Open-Science avec le lien vers l’application Remote.It et les modes Off, App access et Browser access](/img/open-science/settings-remote-control.webp)

Les paramètres du mode d'accès peuvent être modifiés depuis la fenêtre du bureau de l'ordinateur d'accueil. Un navigateur connecté peut gérer l'appariement ou la confiance lorsqu'il est autorisé, mais il n'est pas un substitut à ce contrôle de mode de bureau seulement.

## Paire un navigateur lorsque l'environnement est disponible {/* #pair-a-browser-when-the-environment-is-available */}

1. Sélectionnez le mode d'accès prévu et attendez qu'il soit prêt/exécutable. Une erreur ou un changement d'état de mode d'accès n'est pas une connexion utilisable.
2. Dans l'accès au navigateur, utilisez **Copy**, **Open** ou le code QR pour le lien affiché. Dans l'accès App, utilisez les instructions de connexion mobile et le même compte Remote.It.
3. Sur l'appareil demandeur, comparez le code à six chiffres avec **Pairing requests** sur un appareil d'approbation autorisé. Vérifiez le navigateur, la plateforme, l'heure et l'adresse.
4. Choisissez **Reject**, **Allow for up to 12 hours** ou **Trust this browser for 180 days**. L'accès temporaire n'est pas une confiance permanente.
5. Vérifiez que l'espace de travail prévu s'ouvre et qu'une petite interaction en lecture seule réussit. Ne pas déduire la connectivité à partir de la copie d'un lien.

Gardez le lien d'accès privé. Partager une connexion uniquement avec l'appareil prévu, et confirmer la demande d'appariement avant de lui faire confiance.

## Réviser et arrêter {/* #revoke-and-stop */}

**Trusted browsers** liste les détails du périphérique et la dernière utilisation. **Révocation &#91;navigateur&#93;** invalide l'autorisation de ce navigateur pour l'accès/reconnexion protégé ultérieur. Le fait de tourner **Off** empêche l'accès, mais conserve des enregistrements de confiance; révoquer séparément un appareil perdu.

Si l'application signale que la désactivation n'a pas fini, utilisez **Retry turning off** et validez l'état enregistré. L'avertissement indique explicitement que l'accès peut revenir après le redémarrage si Off n'a pas été sauvegardé. Ne traitez pas un bouton radio sélectionné seul comme un succès.

### Changements de service acceptés, agent redémarrant encore {/* #service-changes-accepted-agent-still-restarting */}

Si le message indique **Remote.It a accepté les modifications du service, mais son agent de fond est toujours en train de redémarrer**, les nouveaux identifiants de service ont été enregistrés. Attendez quelques secondes, puis sélectionnez **Détecter** ou **Detect again**. N'ajoutez pas le dispositif à nouveau ou ne changez pas de mode à plusieurs reprises; réutiliser la configuration de service acceptée.

Continuer seulement après que la page fournit le lien de navigateur et les contrôles d'appariement. Si la détection continue d'échouer, confirmez que l'application de bureau Remote.It est connectée et que son agent fonctionne, conservez le message exact et utilisez [Dépannage](troubleshooting.md) pour le signaler. Un sous-panel **Ready** à côté d'une erreur de niveau page ne suffit pas pour établir l'accès de bout en bout.

## Diagnostic par étape {/* #diagnose-by-stage */}

| Étape | Vérifier |
| --- | --- |
| Fournisseur non détecté | Installation Remote.It, connexion et résultat de détection de la page. |
| Le changement de mode échoue | L'erreur actuelle et si l'application/fournisseur local reste en cours d'exécution. |
| Ouverture du lien, mais pas de l'espace de travail | Code d'appariement, expiration, confiance et appareil autorisé. |
| Le navigateur précédemment utilisé est rejeté | Révocation/expiration et si l'accès est désactivé. |
| L'espace de travail s'ouvre mais une tâche échoue | les autorisations de modèle, d'exécution et d'outil sur l'ordinateur d'accueil; l'accès à distance ne les configure pas. |

Pour les commandes locales sans tête / navigateur, voir [référence du service](../reference/server.md). C'est un chemin d'entrée séparé des modes Remote.It montré ici.

Source: [Panneau d'accès à distance](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/RemoteControlPanel.tsx).

Pour les déploiements sans tête Linux sans clé OS utilisable, lisez le [option de stockage des justificatifs](../reference/server.md#credential-storage-on-headless-linux). Il modifie le stockage local des secrets éligibles; il ne configure pas Remote.It, n'associe pas un navigateur ou n'accorde pas d'accès à distance.

## Jumelage et révocation dans v0.31.1 {/* #pairing-v0311 */}

Les demandes d'appariement en attente apparaissent devant **Trusted browsers**, avec le temps restant et les badges urgents. correspondre au code affiché sur l'appareil demandeur avant d'accorder l'accès; une demande expirée doit être reprise. Un navigateur de confiance peut se révoquer : s'attendre à ce que l'accès protégé se termine et se jumele à nouveau si l'accès est nécessaire plus tard. **Off**, l'accès temporaire et la révocation de la confiance restent des actions différentes.
