/* ==========================================================
   layout.js — fond animé, en-tête et pied de page communs (FR + EN)
   (modifie le menu ici, il change partout)
   ========================================================== */
(function () {
  var root = document.documentElement;
  var LANG = root.lang === "en" ? "en" : "fr";
  var B = root.dataset.base || "";          // "" (français) ou "../" (pages dans en/)
  var page = document.body.dataset.page || "";

  var T = {
    fr: {
      nav: [["accueil", "index.html", "Accueil"], ["apropos", "apropos.html", "À propos"], ["competences", "competences.html", "Compétences"], ["projets", "projets.html", "Projets"], ["parcours", "parcours.html", "Parcours"]],
      cta: "Me contacter", home: "Robert BAKO, accueil", navLabel: "Navigation principale",
      theme: "Choisir le thème", themeMenu: "Thème", auto: "Automatique (appareil)", light: "Clair", dark: "Sombre",
      menu: "Ouvrir le menu", rights: "Tous droits réservés", switchCode: "EN", switchLabel: "Switch to English", switchLang: "en"
    },
    en: {
      nav: [["accueil", "index.html", "Home"], ["apropos", "apropos.html", "About"], ["competences", "competences.html", "Skills"], ["projets", "projets.html", "Projects"], ["parcours", "parcours.html", "Journey"]],
      cta: "Contact me", home: "Robert BAKO, home", navLabel: "Main navigation",
      theme: "Choose theme", themeMenu: "Theme", auto: "Automatic (device)", light: "Light", dark: "Dark",
      menu: "Open menu", rights: "All rights reserved", switchCode: "FR", switchLabel: "Passer en français", switchLang: "fr"
    }
  }[LANG];

  var links = T.nav.map(function (i) {
    return '<a href="' + i[1] + '"' + (i[0] === page ? ' aria-current="page"' : "") + ">" + i[2] + "</a>";
  }).join("");
  var cta = '<a class="nav-cta" href="contact.html"' + (page === "contact" ? ' aria-current="page"' : "") + ">" + T.cta + "</a>";

  /* Lien vers la même page dans l'autre langue */
  var file = page === "" ? "index.html" : (location.pathname.split("/").pop() || "index.html");
  var switchHref = (LANG === "fr" ? "en/" : "../") + file;
  var globe = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';
  var langSwitch = '<a class="lang-switch" id="langSwitch" href="' + switchHref + '" hreflang="' + T.switchLang + '" lang="' + T.switchLang + '" data-lang="' + T.switchLang + '" aria-label="' + T.switchLabel + '">' + globe + "<span>" + T.switchCode + "</span></a>";

  var bg = document.createElement("div");
  bg.className = "bg"; bg.setAttribute("aria-hidden", "true"); bg.innerHTML = "<i></i><i></i>";
  document.body.prepend(bg);

  var iAuto = '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>';
  var iSun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var iMoon = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var item = function (pref, label, icon) {
    return '<button type="button" role="menuitemradio" data-pref="' + pref + '" aria-checked="false"><svg viewBox="0 0 24 24" aria-hidden="true">' + icon + "</svg><span>" + label + '</span><i class="tick" aria-hidden="true"></i></button>';
  };

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "header";
    header.innerHTML =
      '<a class="brand" href="index.html" aria-label="' + T.home + '"><span class="brand-mark"><img src="' + B + 'assets/images/avatar.jpg" alt="" width="36" height="36"><b>RB</b></span><span>Robert <b>BAKO</b></span></a>' +
      '<div class="head-right">' +
      '<nav class="nav" id="nav" aria-label="' + T.navLabel + '">' + links + cta + "</nav>" +
      langSwitch +
      '<div class="theme-wrap">' +
      '<button class="icon-btn theme-toggle" id="themeToggle" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="themeMenu" aria-label="' + T.theme + '"><svg class="i-auto" viewBox="0 0 24 24" aria-hidden="true">' + iAuto + '</svg><svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true">' + iSun + '</svg><svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true">' + iMoon + "</svg></button>" +
      '<div class="theme-menu" id="themeMenu" role="menu" aria-label="' + T.themeMenu + '">' + item("auto", T.auto, iAuto) + item("light", T.light, iSun) + item("dark", T.dark, iMoon) + "</div>" +
      "</div>" +
      '<button class="icon-btn menu-toggle" id="menuToggle" type="button" aria-label="' + T.menu + '" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>' +
      "</div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = "<span>© " + new Date().getFullYear() + " Robert BAKO · " + T.rights + "</span>";
  }

  /* Mémorise le choix de langue quand on clique sur le sélecteur */
  var sw = document.getElementById("langSwitch");
  if (sw) sw.addEventListener("click", function () { try { localStorage.setItem("lang", sw.dataset.lang); } catch (e) {} });
})();
