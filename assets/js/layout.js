/* ==========================================================
   layout.js — fond animé, en-tête et pied de page communs
   (modifie le menu ici, il change partout)
   ========================================================== */
(function () {
  var page = document.body.dataset.page || "";
  var items = [
    ["accueil", "index.html", "Accueil"],
    ["apropos", "apropos.html", "À propos"],
    ["competences", "competences.html", "Compétences"],
    ["projets", "projets.html", "Projets"],
    ["parcours", "parcours.html", "Parcours"]
  ];
  var links = items.map(function (i) {
    return '<a href="' + i[1] + '"' + (i[0] === page ? ' aria-current="page"' : "") + ">" + i[2] + "</a>";
  }).join("");
  var cta = '<a class="nav-cta" href="contact.html"' + (page === "contact" ? ' aria-current="page"' : "") + ">Me contacter</a>";

  var bg = document.createElement("div");
  bg.className = "bg"; bg.setAttribute("aria-hidden", "true"); bg.innerHTML = "<i></i><i></i>";
  document.body.prepend(bg);

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "header";
    header.innerHTML =
      '<a class="brand" href="index.html" aria-label="Robert BAKO, accueil"><span class="brand-mark"><img src="assets/images/avatar.jpg" alt="" width="36" height="36"><b>RB</b></span><span>Robert <b>BAKO</b></span></a>' +
      '<div class="head-right">' +
      '<nav class="nav" id="nav" aria-label="Navigation principale">' + links + cta + "</nav>" +
      '<div class="theme-wrap">' +
      '<button class="icon-btn theme-toggle" id="themeToggle" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="themeMenu" aria-label="Choisir le thème"><svg class="i-auto" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg><svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>' +
      '<div class="theme-menu" id="themeMenu" role="menu" aria-label="Thème"><button type="button" role="menuitemradio" data-pref="auto" aria-checked="false"><svg  viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg><span>Automatique (appareil)</span><i class="tick" aria-hidden="true"></i></button><button type="button" role="menuitemradio" data-pref="light" aria-checked="false"><svg  viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><span>Clair</span><i class="tick" aria-hidden="true"></i></button><button type="button" role="menuitemradio" data-pref="dark" aria-checked="false"><svg  viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><span>Sombre</span><i class="tick" aria-hidden="true"></i></button></div>' +
      '</div>' +
      '<button class="icon-btn menu-toggle" id="menuToggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>' +
      "</div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = "<span>© " + new Date().getFullYear() + " Robert BAKO · Tous droits réservés</span>";
  }
})();
