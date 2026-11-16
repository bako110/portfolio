/* ==========================================================
   projects.js — données des projets (source unique, FR + EN)
   Chaque texte est un objet { fr: "…", en: "…" }.
   Pour ajouter un projet : copie un bloc ci-dessous.
   - image    : capture facultative dans assets/images/projects/
   - stack    : technologies par couche (Mobile / Web / Backend / Base de données)
   - details  : texte détaillé affiché dans la fiche
   - features : liste des fonctionnalités affichée dans la fiche
   - screens  : captures dans assets/images/projects/<id>/ , ex. ["1.jpg", "2.jpg"]
   - links    : { label, href, download:true } pour un fichier, sinon lien externe
   ========================================================== */
window.PROJECTS = [
  {
    id: "gofolyx", name: "GoFolyX", live: true,
    category: { fr: "Réseau social · Fondateur", en: "Social network · Founder" },
    status: { fr: "En ligne", en: "Online" },
    stack: { "Mobile": ["React Native"], "Web": ["React.js"], "Backend": ["Python", "FastAPI"], "Base de données": ["MongoDB", "PostgreSQL"], "Streaming": ["OBS Studio"] },
    screens: [],
    theme: "s-gofolyx", word: "GoFolyX<i>.</i>", logo: "assets/images/projects/logo-gofolyx.png", image: "assets/images/projects/gofolyx.jpg",
    summary: {
      fr: "Réseau social avec lives, reels et communautés, où les membres d'une même communauté peuvent aussi lancer des cagnottes.",
      en: "Social network with live streams, reels and communities, where members of the same community can also launch fundraising pots."
    },
    details: {
      fr: "GoFolyX est un réseau social que j'ai fondé. On y publie des vidéos et des reels, on suit des lives, des événements et des concerts, et on vit en communauté. Les membres d'une même communauté peuvent également créer et alimenter des cagnottes. Une intégration avec OBS permet de gérer le stream et de redistribuer le live en temps réel. L'application est disponible sur Google Play et sur le web.",
      en: "GoFolyX is a social network I founded. People publish videos and reels, follow live streams, events and concerts, and live in community. Members of the same community can also create and contribute to fundraising pots. An integration with OBS lets me manage the stream and redistribute the live in real time. The app is available on Google Play and on the web."
    },
    features: {
      fr: ["Lives et streaming", "Redistribution du live en temps réel (intégration OBS)", "Reels et vidéos", "Communautés", "Cagnottes de la communauté", "Événements et concerts"],
      en: ["Live streaming", "Real-time live redistribution (OBS integration)", "Reels and videos", "Communities", "Community fundraising pots", "Events and concerts"]
    },
    tags: { fr: ["React", "React Native", "FastAPI", "Streaming"], en: ["React", "React Native", "FastAPI", "Streaming"] },
    links: [
      { label: { fr: "Visiter gofolyx.com", en: "Visit gofolyx.com" }, href: "https://gofolyx.com", primary: true },
      { label: { fr: "Google Play", en: "Google Play" }, href: "https://play.google.com/store/apps/developer?id=GoFolyX" }
    ]
  },
  {
    id: "bf1tv", name: "BF1 TV", live: true,
    category: { fr: "Application mobile · Média", en: "Mobile app · Media" },
    status: { fr: "iOS & Android", en: "iOS & Android" },
    screens: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    theme: "s-bf1", word: "BF1<i>.</i>", logo: "assets/images/projects/logo-bf1tv.png", image: "assets/images/projects/bf1tv.jpg",
    summary: {
      fr: "Application mobile de la chaîne BF1 TV, que j'ai développée. Disponible sur l'App Store et Google Play.",
      en: "Mobile app of the TV channel BF1 TV, which I developed. Available on the App Store and Google Play."
    },
    tags: { fr: ["Mobile", "iOS", "Android", "Streaming"], en: ["Mobile", "iOS", "Android", "Streaming"] },
    links: [] // ajoute ici : { label: { fr: "App Store", en: "App Store" }, href: "https://apps.apple.com/..." }
  },
  {
    id: "ediscussion", name: "eDiscussion",
    category: { fr: "Application mobile", en: "Mobile app" },
    status: { fr: "Android", en: "Android" },
    stack: { "Mobile": ["React Native"], "Backend": ["Python", "FastAPI"], "Base de données": ["PostgreSQL"] },
    screens: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
    theme: "s-ediscussion", word: "ED<i>.</i>", logo: "assets/images/projects/logo-ediscussion.png", image: "assets/images/projects/ediscussion.jpg",
    summary: {
      fr: "Application de messagerie : discussions, appels, stories, groupes et chaînes, avec chiffrement de bout en bout.",
      en: "Messaging app: chats, calls, stories, groups and channels, with end-to-end encryption."
    },
    details: {
      fr: "eDiscussion est une application de messagerie mobile. Elle réunit les discussions, les appels, les stories (moments), les groupes et les chaînes, avec un chiffrement de bout en bout des messages et la gestion des appareils liés au compte.",
      en: "eDiscussion is a mobile messaging app. It brings together chats, calls, stories (moments), groups and channels, with end-to-end message encryption and management of the devices linked to the account."
    },
    features: {
      fr: ["Messagerie instantanée", "Appels vocaux et vidéo", "Stories (moments)", "Groupes et chaînes", "Chiffrement de bout en bout", "Appareils liés"],
      en: ["Instant messaging", "Voice and video calls", "Stories (moments)", "Groups and channels", "End-to-end encryption", "Linked devices"]
    },
    tags: { fr: ["Mobile", "Messagerie"], en: ["Mobile", "Messaging"] },
    links: [{ label: { fr: "Télécharger l'APK", en: "Download the APK" }, href: "downloads/apk/ediscussion.apk", download: true, kind: { fr: "APK Android", en: "Android APK" } }]
  },
  {
    id: "edvia", name: "EDVIA",
    category: { fr: "Logiciel de gestion", en: "Management software" },
    status: { fr: "Android", en: "Android" },
    stack: { "Web": ["React.js"], "Backend": ["Node.js"], "Base de données": ["MongoDB"] },
    screens: [],
    theme: "s-edvia", word: "EDVIA", logo: "assets/images/projects/logo-edvia.png", image: "assets/images/projects/edvia.jpg",
    summary: {
      fr: "Application de gestion d'école : établissements, élèves et enseignants au même endroit.",
      en: "School management app: institutions, students and teachers in one place."
    },
    details: {
      fr: "EDVIA est une application de gestion d'école. Elle centralise les informations de l'établissement, des élèves et des enseignants pour simplifier l'organisation au quotidien.",
      en: "EDVIA is a school management application. It centralizes information about the institution, students and teachers to simplify day-to-day organization."
    },
    features: {
      fr: ["Gestion de l'établissement", "Gestion des élèves", "Gestion des enseignants"],
      en: ["Institution management", "Student management", "Teacher management"]
    },
    tags: { fr: ["EdTech", "Gestion scolaire"], en: ["EdTech", "School management"] },
    links: [{ label: { fr: "Télécharger l'APK", en: "Download the APK" }, href: "downloads/apk/edvia.apk", download: true, kind: { fr: "APK Android", en: "Android APK" } }]
  },
  {
    id: "sira", name: "Burkina Sira",
    category: { fr: "Application touristique", en: "Tourism app" },
    status: { fr: "Tourisme", en: "Tourism" },
    screens: [],
    theme: "s-sira", word: "SIRA<i>.</i>", logo: "assets/images/projects/logo-sira.png", image: "assets/images/projects/sira.jpg",
    summary: {
      fr: "Application qui valorise la découverte des destinations et des richesses du Burkina Faso.",
      en: "An app that promotes the discovery of the destinations and riches of Burkina Faso."
    },
    tags: { fr: ["Tourisme", "Mobile"], en: ["Tourism", "Mobile"] },
    links: []
  },
  {
    id: "nunilib", name: "NuniLib OS", live: true,
    category: { fr: "Système d'exploitation", en: "Operating system" },
    status: { fr: "Open source", en: "Open source" },
    screens: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    size: "wide", theme: "s-nunilib", word: "", os: true, logo: "assets/images/projects/logo-nunilib.png", image: "assets/images/projects/nunilib.jpg",
    summary: {
      fr: "Système d'exploitation open source, orienté accessibilité et construit sur un écosystème de dépendances open source.",
      en: "Open-source operating system focused on accessibility and built on an ecosystem of open-source dependencies."
    },
    details: {
      fr: "NuniLib OS est un système d'exploitation open source, « Libre · Simple · Pour tous ». La version actuelle (2026.11) est un prototype : un bureau avec dock et widgets, un centre de contrôle, un installateur intégré, des bureaux virtuels et les applications de base (navigateur, gestionnaire de fichiers, terminal, lecteur multimédia, éditeur de texte).",
      en: "NuniLib OS is an open-source operating system whose motto is “Libre · Simple · Pour tous” (Free · Simple · For everyone). The current version (2026.11) is a prototype: a desktop with dock and widgets, a control center, a built-in installer, virtual desktops and the basic applications (browser, file manager, terminal, media player, text editor)."
    },
    features: {
      fr: ["Bureau moderne avec dock et widgets", "Centre de contrôle NuniLib", "Installateur intégré", "Bureaux virtuels", "Gestionnaire de fichiers et terminal", "Pare-feu, sauvegarde et mises à jour", "Réglages d'accessibilité", "Interface en français"],
      en: ["Modern desktop with dock and widgets", "NuniLib control center", "Built-in installer", "Virtual desktops", "File manager and terminal", "Firewall, backup and updates", "Accessibility settings", "French-language interface"]
    },
    tags: { fr: ["OS", "Open Source", "Ingénierie logicielle"], en: ["OS", "Open Source", "Software engineering"] },
    hint: { fr: "Vérifiez la somme SHA-256 avant installation.", en: "Verify the SHA-256 checksum before installing." },
    links: [{ label: { fr: "Télécharger l'image ISO", en: "Download the ISO image" }, href: "downloads/iso/nunilib-os.iso", download: true, kind: { fr: "Image ISO", en: "ISO image" } }]
  }
];
