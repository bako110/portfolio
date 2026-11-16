# Portfolio — Robert BAKO

Site statique (HTML / CSS / JS), sans build ni dépendance. Ouvre `index.html` pour prévisualiser.

## Structure

```
portfolio_robert_bako/
├── index.html          Accueil
├── apropos.html        À propos
├── competences.html    Compétences
├── projets.html        Tous les projets (+ téléchargements)
├── parcours.html       Parcours
├── contact.html        Contact
├── 404.html            Page d'erreur
├── assets/
│   ├── css/            base.css · layout.css · components.css
│   ├── js/
│   │   ├── config.js   ← tes coordonnées (e-mail, WhatsApp, LinkedIn, GitHub)
│   │   ├── projects.js ← la liste des projets (ajouter / modifier ici)
│   │   ├── layout.js   menu et pied de page communs
│   │   └── main.js     comportements du site
│   └── images/
│       ├── robert-bako.jpg      ← TA PHOTO (portrait, ratio 4:5, ~1000×1250 px)
│       └── projects/            captures facultatives : gofolyx.jpg, ediscussion.jpg,
│                                edvia.jpg, sira.jpg, nunilib.jpg
├── downloads/
│   ├── apk/            ediscussion.apk · edvia.apk
│   ├── iso/            nunilib-os.iso
│   └── cv/             CV_Robert_BAKO_FR.pdf · CV_Robert_BAKO_EN.pdf (PDF uniquement)
└── docs/               notes de déploiement
```

## À faire pour finaliser

1. ✅ Photo (`assets/images/robert-bako.jpg`) et logos GoFolyX / eDiscussion / Burkina Sira déjà en place. Pour changer la photo, remplace le fichier (même nom).
2. Déposer le CV dans `downloads/cv/`, les APK dans `downloads/apk/`, l'ISO dans `downloads/iso/`.
   Tant qu'un fichier est absent, son bouton affiche « Bientôt disponible » (une fois en ligne).
3. Ajouter LinkedIn / GitHub dans `assets/js/config.js` si souhaité.
4. Ajouter des captures dans `assets/images/projects/` (elles remplacent automatiquement le visuel dégradé).

Le lien Google Play de GoFolyX pointe vers la page développeur : remplace-le par le lien direct de l'application dans `assets/js/projects.js` quand tu l'as.

Ne publie jamais de clés de signature, mots de passe ou fichiers `.env`.
