---
title: "Comparution et notifications"
last_update:
  date: '2026-09-16'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import PreferenceScreenshot from '@site/src/components/PreferenceScreenshot';
import Screenshot from '@site/src/components/Screenshot';

# Comparution et notifications {/* #appearance-and-notifications */}

Choisissez un thème confortable, définissez votre langage d'interface et recevez des alertes de tâches pendant que vous travaillez dans une autre application. Ouvrez **Settings → General** pour ajuster ces préférences. Open-Science se souvient de vos choix d'apparence sur cet appareil.

<PlatformGuide />

## Changer le thème et le langage d'interface {/* #change-theme-and-interface-language */}

1. Dans **General → Appearance**, trouvez **Theme**.
2. Choisissez **System** pour suivre votre appareil, ou sélectionnez **Light** ou **Dark** pour garder une apparence fixe. Vous pouvez revenir à tout moment.
3. Sous **Language**, choisissez votre langue d'interface préférée, ou **System** pour utiliser la langue de l'appareil.

<PlatformContent platform="macos">

![Paramètres généraux d'apparence](/img/open-science/v0.27.0/07-general-appearance.webp)

</PlatformContent>

<PlatformContent platform="windows">

<Screenshot src="/img/open-science/windows/general-settings.webp" alt="Contrôles des thèmes et des langues dans Windows Paramètres généraux" width={1920} height={1017} windowBounds={[480, 165, 960, 690]} href="/docs/img/open-science/windows/general-settings.webp" linkLabel="Ouvrir la capture d&#39;écran complète des paramètres généraux de Windows" />

</PlatformContent>

| Choix | Ce qui change |
| --- | --- |
| Thème → Système | L'application suit le réglage lumière/obscurité de l'appareil. |
| Thème → Lumière / Dark | Le thème sélectionné reste fixe lorsque le thème du système change.  |
| Langue → Système | L'application lit le langage de l'appareil au démarrage. Après avoir modifié la langue du système, rouvrez l'application pour l'appliquer. |
| Une langue spécifique | L'application utilise ce langage d'interface. Les invites enregistrées, les fichiers sources et les réponses antérieures du modèle conservent leur texte original. |

Les préférences linguistiques et thématiques sont en **Settings → General → Appearance**. Le site Web de documentation a son propre sélecteur de langue; changer la langue de l'application laisse inchangé. Les dialogues de fichiers système suivent les paramètres de votre système d'exploitation.

Pour demander un rapport dans une autre langue, précisez-le dans votre conversation. Par exemple : Écrire le rapport en anglais et conserver les identificateurs de gènes originaux.

<PlatformContent platform="windows">

**Régler l'échelle d'affichage en Windows**

1. Ouvrez Windows **Settings → System → Display** et trouvez **Échelle et présentation**. Notez l'échelle actuelle pour que vous puissiez la restaurer.
2. Choisissez un texte confortable et la taille de l'application, par exemple **125%**.
3. Retourner à Open-Science et vérifier le Compositeur et prévisualiser. Une table plus large peut exiger sa barre de défilement horizontale; élargir l'aperçu ou maximiser la fenêtre au besoin.
4. Pour annuler la modification, retournez aux paramètres Affichage et sélectionnez l'échelle d'origine. Si Windows demande le redémarrage d'une application, enregistrez votre travail avant de le rouvrir.

Le même rapport reste lisible à grande échelle. Utilisez la barre de défilement horizontale pour voir les colonnes à l'extérieur de la fenêtre de la table actuelle; l'échelle d'affichage modifie la vue, et non les données enregistrées.

![Open-Science à l'échelle 125 pour cent avec une barre de défilement horizontale dans l'aperçu de la table](/img/open-science/windows/app-scale-125.webp)

</PlatformContent>

## Configurer les notifications de tâches {/* #set-up-task-notifications */}

Activer les alertes si vous voulez laisser une analyse en cours d'exécution et revenir quand elle a besoin d'attention.

1. Dans **General → Notifications**, allumez **Task notifications**.
2. Choisissez s'il faut activer **Show task content in system notifications**. Laissez tomber si les noms de tâches ou les détails de demande doivent rester en dehors des alertes système.
3. Lire **System notification status**, puis sélectionner **Send test notification** si disponible. Autoriser les notifications dans le système d'exploitation lorsqu'elles sont demandées.
4. Vérifiez l'état du test retourné et la surface de notification de votre système. Pour les alertes de tâches, passez à une autre application pendant que la tâche s'exécute.

<PlatformContent platform="macos">

<PreferenceScreenshot notifications />

</PlatformContent>

| Contrôle | Effet |
| --- | --- |
| Notifications de tâches | Active les alertes pour l'achèvement des tâches, l'échec ou une demande d'approbation pendant que vous utilisez une autre application. Éteignez-le pour arrêter ces alertes de tâches. |
| Afficher le contenu des tâches dans les notifications système | Inclut les noms de tâches et les détails de demande lorsqu'il est activé. Les erreurs du fournisseur restent cachées. Ce contrôle est désactivé lorsque les notifications de tâches sont désactivées. |
| État des notifications système | Indique si cet appareil prend en charge les notifications système. |
| Envoyer une notification de test | Envoie une demande de test. Le bouton affiche **Sending test…** pendant la demande et est désactivé lors de l'envoi ou lorsque les notifications système ne sont pas disponibles. |
| Une notification de tâche délivrée | Sélectionnez-le pour faire avancer Open-Science et ouvrir la tâche associée. |

Supprimé les tâches et les échecs que l'application récupère automatiquement garder le silence. **Messages** dans la maison ou l'espace de travail est une entrée dans l'application; L'autorisation de notification du système d'exploitation est gérée séparément.

### Retour à une tâche à partir d'une alerte système {/* #return-to-a-task-from-a-system-alert */}

<PlatformContent platform="macos">

Sélectionnez une alerte d'achèvement ou d'approbation pour revenir à sa conversation. Si vous avez manqué la bannière, trouvez Open-Science dans macOS Notification Center. Expandez une pile groupée d'abord, puis sélectionnez l'alerte spécifique. Une alerte d'approbation ouvre la tâche; lire et résoudre la requête à l'intérieur de l'application.

</PlatformContent>

<PlatformContent platform="windows">

1. Activez **Task notifications** et utilisez une notification de test pour vérifier l'autorisation du système.
2. Envoyer une tâche, puis passer à une autre application. Sélectionnez son alerte **Task completed** ou **Approval needed** à son arrivée.
3. Retour dans Open-Science, vérifiez la conversation et la requête originale. une alerte d'achèvement devrait aboutir à son résultat final; une alerte d'approbation ouvre la demande en attente, où vous devez encore choisir **Autoriser** ou **Deny**. Choisir la notification n'approuve pas l'exécution.

Si vous avez raté la bannière, trouvez l'alerte dans le centre de notification Windows. Si aucune alerte n'apparaît, cochez la bannière Windows et ne dérangez pas les paramètres. Si vous retournez chez vous, ouvrez la conversation originale via **Recent sessions**. Le texte de notification ne remplace pas l'inspection du résultat réel.

</PlatformContent>

<PlatformContent platform="macos">

![Alerte d'achèvement du système en anglais avec des détails de tâches cachés](/img/open-science/priority-completion/07-system-completion-notification.webp)

</PlatformContent>
Éteignez **Show task content in system notifications** pour utiliser des alertes génériques. Choisir une alerte de fin de mandat ou d'approbation pour rouvrir sa conversation; répondre aux approbations à l'intérieur de l'application.

### Si une notification n'apparaît pas {/* #if-a-notification-does-not-appear */}

Commencez par le résultat de l'essai, puis vérifiez la condition qui s'applique.

| Résultat ou symptôme | Que vérifier ensuite |
| --- | --- |
| **Test notification shown.** | L'application signale que le test est apparu. Vérifier la surface de notification du système d'exploitation; une alerte de test est séparée d'un véritable événement de tâche. |
| **Test notification sent, but display could not be confirmed.** | Vérifiez l'autorisation de notification du système et si le système d'exploitation supprime les bannières. La livraison n'a pas été confirmée. |
| **Test notification failed.** | Vérifiez l'autorisation de notification de l'application dans les paramètres du système, puis réessayez le test. Si elle échoue encore, collectez l'erreur par [Dépannage](troubleshooting.md). |
| **System notifications are unavailable on this device.** | La commande d'essai n'est pas disponible. Surveillez la tâche dans l'espace de travail. |
| Le test fonctionne, mais une tâche n'envoie aucune alerte | Confirmez que les notifications de tâches sont allumées, que vous utilisez une autre application, et que l'événement est terminé, échoué ou une demande d'approbation. Les annulations et les relevés automatiques n'alertent pas. |
| Pas d'alerte lors de l'enregistrement, du partage ou du miroir | Vérifiez si le système permet des alertes lors de l'enregistrement ou du partage, et vérifiez Focus ou Ne pas déranger. Activez cela uniquement lorsque vous comptez que les alertes seront visibles; ils peuvent apparaître dans l'enregistrement. |
| L'alerte arrive sans détails de la tâche | Vérifiez Afficher le contenu des tâches dans les notifications système. Ne l'oubliez pas si vous préférez cacher ces détails. |

<PlatformContent platform="windows">

### Retour du plateau après la fermeture de la fenêtre {/* #return-from-the-tray-after-closing-the-window */}

Avec **General → Close button behaviour → Ask every time**, fermer la fenêtre ouvre **Minimize or quit?** Choisissez **Minimize to tray** pour masquer la fenêtre, puis utilisez l'icône Open-Science dans le plateau Windows pour revenir. Sélectionnez **Ne demande pas à nouveau** uniquement si vous souhaitez conserver ce choix; changer plus tard dans Général. Minimiser ne quitte pas l'application.

</PlatformContent>

## Trouver les paramètres associés {/* #find-related-settings */}

| Tu veux... | Où aller |
| --- | --- |
| Vérifiez une mise à jour de l'application | **General → About → Check now**; suivre [Installation et mises à jour](installation.md#choose-a-reproducible-version-and-update-deliberately). |
| Lire les modifications de version ou obtenir de l'aide | **About → Release notes / Help Center** ouvre la page externe correspondante. Ce wiki a aussi un [Changer de journal](../changelog/v0.31.1.md). |
| Localiser ou ouvrir le journal de diagnostic | **General → Diagnostics → Reveal / Open**; voir [Dépannage](troubleshooting.md). Les journaux restent locaux jusqu'à ce que vous les partagez. |
| Installez l'entrée en ligne de commande | **General → Install command**; voir [Référence CLI](../reference/cli.md). L'utilisation du bureau ne nécessite pas cette commande. |
| Gérer l'emplacement des données ou les travaux archivés | [Stockage et travaux archivés](storage.md). |

<span id="verification-scope" />

## Paramètres de notification dans le système d'exploitation {/* #notification-settings-in-the-operating-system */}

La livraison des notifications dépend également des permissions du système d'exploitation, du mode Focus et des paramètres de partage d'écran. Utilisez les contrôles ci-dessus sur l'appareil où vous travaillez.


Source: [Paramètres généraux](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/GeneralPanel.tsx).
