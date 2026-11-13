# Déploiement du portfolio et des fichiers sur ton serveur

## 1. Arborescence à publier

Place le contenu du portfolio dans le répertoire web de ton domaine, par exemple :

```text
/var/www/robertbako/
├── index.html
├── css/
├── js/
└── downloads/
    ├── apk/
    │   ├── ediscussion.apk
    │   └── edvia.apk
    └── iso/
        └── nunilib-os.iso
```

Les boutons du portfolio utilisent ces chemins relatifs :
- `/downloads/apk/ediscussion.apk`
- `/downloads/apk/edvia.apk`
- `/downloads/iso/nunilib-os.iso`

Remplace les fichiers `DEPOSER_...txt` par tes vrais fichiers.

## 2. Exemple de configuration Nginx

Adapte le nom de domaine et le chemin du certificat à ton serveur :

```nginx
server {
    listen 80;
    server_name portfolio.ton-domaine.com;
    root /var/www/robertbako;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /downloads/apk/ {
        alias /var/www/robertbako/downloads/apk/;
        add_header X-Content-Type-Options nosniff always;
        add_header Content-Disposition "attachment" always;
        types { application/vnd.android.package-archive apk; }
    }

    location /downloads/iso/ {
        alias /var/www/robertbako/downloads/iso/;
        add_header X-Content-Type-Options nosniff always;
        add_header Content-Disposition "attachment" always;
        types { application/octet-stream iso; }
    }

    # Limite indicative : ajuste selon la taille réelle de l'ISO.
    client_max_body_size 8G;
}
```

Après validation de la configuration :

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Configure HTTPS avec ton outil de certificats habituel avant de diffuser les liens.

## 3. Vérifications avant publication

- APK : publie uniquement des APK de production signés, testés et provenant de tes propres projets.
- Android : affiche la version, la date de publication et les prérequis Android.
- ISO : affiche la version, la taille du fichier, les prérequis matériels et les instructions d'installation.
- Intégrité : calcule le SHA-256 après dépôt, puis publie cette valeur à côté du lien.

Pour calculer le SHA-256 sur Linux :

```bash
sha256sum /var/www/robertbako/downloads/apk/ediscussion.apk
sha256sum /var/www/robertbako/downloads/apk/edvia.apk
sha256sum /var/www/robertbako/downloads/iso/nunilib-os.iso
```

## 4. Points importants

- Ne publie pas de clés de signature Android, mots de passe, fichiers `.env`, bases de données ou données personnelles.
- Si l'ISO est volumineuse, vérifie l'espace disque, la bande passante et les limites de transfert de ton hébergeur.
- Protège le serveur contre le remplacement non autorisé des fichiers.
- Mets à jour les liens et les informations de version à chaque nouvelle publication.

## 5. Informations à personnaliser

- Nom de domaine : remplace `portfolio.ton-domaine.com`.
- E-mail : remplace `contact@exemple.com` dans `js/script.js`.
- Liens web : ajoute les URL exactes de GoFolyX et Burkina Sira dans les fiches de projets.
- APK et ISO : ajoute les fichiers réels dans `downloads/`.
