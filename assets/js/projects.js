/* ==========================================================
   projects.js — données des projets (source unique)
   Pour ajouter un projet : copie un bloc ci-dessous.
   - image : capture facultative dans assets/images/projects/
   - stack : technologies par couche (Mobile / Web / Backend / Base de données)
   - details : texte détaillé affiché dans la fiche
   - features : liste des fonctionnalités affichée dans la fiche
   - details : texte détaillé affiché dans la fiche
   - features : liste des fonctionnalités affichée dans la fiche
   - screens : captures dans assets/images/projects/<id>/ , ex. ["1.jpg", "2.jpg"]
   - links : { label, href, download:true } pour un fichier, sinon lien externe
   ========================================================== */
window.PROJECTS = [
  {
    id: "gofolyx", name: "GoFolyX", category: "Réseau social · Fondateur", status: "En ligne", live: true,
    stack: { "Mobile": ["React Native"], "Web": ["React.js"], "Backend": ["Python", "FastAPI"], "Base de données": ["MongoDB", "PostgreSQL"], "Streaming": ["OBS Studio"] }, screens: [],
    size: "featured", theme: "s-gofolyx", word: "GoFolyX<i>.</i>", logo: "assets/images/projects/logo-gofolyx.png", image: "assets/images/projects/gofolyx.jpg",
    summary: "Réseau social avec lives, reels et communautés, où les membres d'une même communauté peuvent aussi lancer des cagnottes.",
    details: "GoFolyX est un réseau social que j'ai fondé. On y publie des vidéos et des reels, on suit des lives, des événements et des concerts, et on vit en communauté. Les membres d'une même communauté peuvent également créer et alimenter des cagnottes. Une intégration avec OBS permet de gérer le stream et de redistribuer le live en temps réel. L'application est disponible sur Google Play et sur le web.",
    features: ["Lives et streaming",
      "Redistribution du live en temps réel (intégration OBS)","Reels et vidéos","Communautés","Cagnottes de la communauté","Événements et concerts"],
    tags: ["React", "React Native", "FastAPI", "Streaming"],
    links: [
      { label: "Visiter gofolyx.com", href: "https://gofolyx.com", primary: true },
      { label: "Google Play", href: "https://play.google.com/store/apps/developer?id=GoFolyX" }
    ]
  },
  {
    id: "bf1tv", name: "BF1 TV", category: "Application mobile · Média", status: "iOS & Android", live: true,
    screens: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    theme: "s-bf1", word: "BF1<i>.</i>", logo: "assets/images/projects/logo-bf1tv.png", image: "assets/images/projects/bf1tv.jpg",
    summary: "Application mobile de la chaîne BF1 TV, que j'ai développée. Disponible sur l'App Store et Google Play.",
    tags: ["Mobile", "iOS", "Android", "Streaming"],
    links: [] // ajoute ici : { label: "App Store", href: "https://apps.apple.com/..." }, { label: "Google Play", href: "https://play.google.com/..." }
  },
  {
    id: "ediscussion", name: "eDiscussion", category: "Application mobile", status: "Android",
    stack: { "Mobile": ["React Native"], "Backend": ["Python", "FastAPI"], "Base de données": ["PostgreSQL"] }, screens: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
    theme: "s-ediscussion", word: "ED<i>.</i>", logo: "assets/images/projects/logo-ediscussion.png", image: "assets/images/projects/ediscussion.jpg",
    summary: "Application de messagerie : discussions, appels, stories, groupes et chaînes, avec chiffrement de bout en bout.",
    details: "eDiscussion est une application de messagerie mobile. Elle réunit les discussions, les appels, les stories (moments), les groupes et les chaînes, avec un chiffrement de bout en bout des messages et la gestion des appareils liés au compte.",
    features: ["Messagerie instantanée","Appels vocaux et vidéo","Stories (moments)","Groupes et chaînes","Chiffrement de bout en bout","Appareils liés"],
    tags: ["Mobile", "Messagerie"],
    links: [{ label: "Télécharger l'APK", href: "downloads/apk/ediscussion.apk", download: true, kind: "APK Android" }]
  },
  {
    id: "edvia", name: "EDVIA", category: "Logiciel de gestion", status: "Android",
    stack: { "Web": ["React.js"], "Backend": ["Node.js"], "Base de données": ["MongoDB"] }, screens: [],
    theme: "s-edvia", word: "EDVIA", logo: "assets/images/projects/logo-edvia.png", image: "assets/images/projects/edvia.jpg",
    summary: "Application de gestion d'école : établissements, élèves et enseignants au même endroit.",
    details: "EDVIA est une application de gestion d'école. Elle centralise les informations de l'établissement, des élèves et des enseignants pour simplifier l'organisation au quotidien.",
    features: ["Gestion de l'établissement","Gestion des élèves","Gestion des enseignants"],
    tags: ["EdTech", "Gestion scolaire"],
    links: [{ label: "Télécharger l'APK", href: "downloads/apk/edvia.apk", download: true, kind: "APK Android" }]
  },
  {
    id: "sira", name: "Burkina Sira", category: "Application touristique", status: "Tourisme",
    screens: [],
    theme: "s-sira", word: "SIRA<i>.</i>", logo: "assets/images/projects/logo-sira.png", image: "assets/images/projects/sira.jpg",
    summary: "Application qui valorise la découverte des destinations et des richesses du Burkina Faso.",
    tags: ["Tourisme", "Mobile"],
    links: []
  },
  {
    id: "nunilib", name: "NuniLib OS", category: "Système d'exploitation", status: "Open source", live: true,
    screens: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"],
    size: "wide", theme: "s-nunilib", word: "", os: true, logo: "assets/images/projects/logo-nunilib.png", image: "assets/images/projects/nunilib.jpg",
    summary: "Système d'exploitation open source, orienté accessibilité et construit sur un écosystème de dépendances open source.",
    details: "NuniLib OS est un système d'exploitation open source, « Libre · Simple · Pour tous ». La version actuelle (2026.11) est un prototype : un bureau avec dock et widgets, un centre de contrôle, un installateur intégré, des bureaux virtuels et les applications de base (navigateur, gestionnaire de fichiers, terminal, lecteur multimédia, éditeur de texte).",
    features: ["Bureau moderne avec dock et widgets","Centre de contrôle NuniLib","Installateur intégré","Bureaux virtuels","Gestionnaire de fichiers et terminal","Pare-feu, sauvegarde et mises à jour","Réglages d'accessibilité","Interface en français"],
    tags: ["OS", "Open Source", "Ingénierie logicielle"],
    hint: "Vérifiez la somme SHA-256 avant installation.",
    links: [{ label: "Télécharger l'image ISO", href: "downloads/iso/nunilib-os.iso", download: true, kind: "Image ISO" }]
  }
];
