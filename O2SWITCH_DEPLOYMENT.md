# Déploiement o2switch (Astro SSG + Webhook)

Voici les instructions pour déployer cette nouvelle architecture "Static Site Generation" sur votre serveur o2switch.

## Étape 1 : Mettre en place le script de compilation (Bash)

1. Connectez-vous à votre terminal SSH o2switch.
2. Déplacez le script de compilation (`build_astro.sh`) à la racine de votre compte (pour éviter qu'il soit écrasé ou supprimé par erreur) et rendez-le exécutable :

```bash
cp /home/fongkhan/repositories/alexis-vuadelle-portfolio-frontend/build_astro.sh /home/fongkhan/build_astro.sh
chmod +x /home/fongkhan/build_astro.sh
```

## Étape 2 : Configurer le nom de domaine sur cPanel

Puisque nous n'utilisons plus Node.js pour le frontend (Astro génère désormais des fichiers HTML purs), vous devez désactiver l'ancienne application et pointer le domaine directement vers le dossier `public_html`.

1. Allez dans votre cPanel.
2. Dans la section **Logiciel**, cliquez sur **Setup Node.js App**.
3. Si vous avez une application configurée pour votre domaine frontend (`alexis-vuadelle.com`), **supprimez-la** ou désactivez-la.
4. Allez dans la section **Domaines**.
5. Vérifiez que la **Racine du document (Document Root)** pour `alexis-vuadelle.com` pointe bien vers `/home/fongkhan/alexis-vuadelle/`.

## Étape 3 : Le Premier Build

Lancez le script manuellement une première fois pour générer les fichiers HTML et les placer dans votre dossier public :

```bash
/home/fongkhan/build_astro.sh
```

## Étape 4 : Testez le Webhook depuis le CMS

1. Allez sur votre panel d'administration Payload CMS (`admin.alexis-vuadelle.com`).
2. Modifiez un projet ou une donnée globale (ex: `Home Page`) et cliquez sur **Save**.
3. Le CMS va appeler en arrière-plan le fichier `webhook-payload.php` situé sur votre site.
4. Ce fichier PHP va lancer `build_astro.sh` automatiquement.

> 💡 **En cas de problème :** Vous pouvez consulter le journal d'activité du Webhook en tapant cette commande dans votre terminal SSH :
> `cat /home/fongkhan/build_astro_webhook.log`
