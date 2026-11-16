/* ==========================================================
   main.js — menu, thème, transitions de page, carrousel de projets,
   fiches détaillées, contact, vérification des fichiers (FR + EN)
   ========================================================== */
(function () {
  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* ---------- Langue, chemins et textes ---------- */
  var LANG = root.lang === "en" ? "en" : "fr";
  var B = root.dataset.base || "";                                   // "" ou "../" (pages dans en/)
  var U = function (p) { return /^([a-z][a-z0-9+.-]*:|\/)/i.test(p) ? p : B + p; };   // préfixe les chemins relatifs
  var L = function (x) {                                             // choisit le texte {fr, en}
    return (x && typeof x === "object" && !Array.isArray(x) && ("fr" in x || "en" in x)) ? (x[LANG] != null ? x[LANG] : x.fr) : x;
  };
  var S = {
    fr: {
      openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu",
      theme: function (l) { return "Thème : " + l + ". Changer"; }, auto: "Automatique (appareil)", light: "Clair", dark: "Sombre",
      shotOf: "Capture de ", logoOf: "Logo ", osText: "Un environnement numérique à construire.",
      slideOf: function (i, n) { return i + " sur " + n; }, details: "Voir les détails",
      prev: "Projet précédent", next: "Projet suivant", tabs: "Projets", close: "Fermer",
      shotsOf: "Captures d’écran de ", shotAlt: function (i, n) { return "Capture " + i + " de " + n; },
      prevShot: "Capture précédente", nextShot: "Capture suivante",
      emptyTitle: "Captures à venir", emptyText: function (n) { return "Les écrans de " + n + " seront ajoutés ici."; },
      features: "Fonctionnalités", stack: "Stack technique", techs: "Technologies", groups: { "Base de données": "Base de données" },
      cvA: "CV (français)", cvB: "CV (anglais)", soon: "Bientôt disponible", gb: " Go", mb: " Mo"
    },
    en: {
      openMenu: "Open menu", closeMenu: "Close menu",
      theme: function (l) { return "Theme: " + l + ". Change"; }, auto: "Automatic (device)", light: "Light", dark: "Dark",
      shotOf: "Screenshot of ", logoOf: "Logo ", osText: "A digital environment to build.",
      slideOf: function (i, n) { return i + " of " + n; }, details: "View details",
      prev: "Previous project", next: "Next project", tabs: "Projects", close: "Close",
      shotsOf: "Screenshots of ", shotAlt: function (i, n) { return "Screenshot " + i + " of " + n; },
      prevShot: "Previous screenshot", nextShot: "Next screenshot",
      emptyTitle: "Screenshots coming soon", emptyText: function (n) { return n + " screens will be added here."; },
      features: "Features", stack: "Tech stack", techs: "Technologies", groups: { "Base de données": "Databases" },
      cvA: "Resume (French)", cvB: "Resume (English)", soon: "Coming soon", gb: " GB", mb: " MB"
    }
  }[LANG];

  root.classList.remove("no-js");

  /* ---------- Indicateur de chargement des images ----------
     Ajoute la classe .is-loading (spinner + fondu) au conteneur tant que ses images ne sont pas arrivées.
     Une image déjà en cache n'affiche rien. Sécurité : le spinner disparaît au bout de 20 s. */
  function watchImages(container, imgs) {
    var pending = 0, done = false;
    var stop = function () { if (done) return; done = true; container.classList.remove("is-loading"); };
    imgs.forEach(function (img) {
      if (!img) return;
      if (img.complete) return;                     // déjà chargée (cache) ou déjà en erreur
      pending++;
      var fin = function () { if (--pending <= 0) stop(); };
      img.addEventListener("load", fin, { once: true });
      img.addEventListener("error", fin, { once: true });
    });
    if (pending > 0) { container.classList.add("is-loading"); setTimeout(stop, 20000); }
  }

  /* ---------- Compteurs animés ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var end = el.dataset.count === "projects" ? (SITE.projectsCount || PROJECTS.length) : +el.dataset.count, t0 = null;
    if (reduce) { el.textContent = end; return; }
    el.textContent = "0";
    var tick = function (t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0 - 500) / 1200, 1);
      if (p < 0) { requestAnimationFrame(tick); return; }
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", S.openMenu);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? S.closeMenu : S.openMenu);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Thème : automatique (appareil), clair ou sombre ---------- */
  var themeBtn = document.getElementById("themeToggle");
  var themeMenu = document.getElementById("themeMenu");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var LABELS = { auto: S.auto, light: S.light, dark: S.dark };

  function readPref() {
    try { var v = localStorage.getItem("theme"); if (v === "light" || v === "dark") return v; } catch (e) {}
    return "auto";
  }
  function applyTheme(pref) {
    var eff = pref === "auto" ? (darkQuery.matches ? "dark" : "light") : pref;
    root.dataset.pref = pref;
    root.dataset.theme = eff;
    if (themeMeta) themeMeta.content = eff === "dark" ? "#080d1c" : "#f5f8ff";
    if (themeBtn) themeBtn.setAttribute("aria-label", S.theme(LABELS[pref]));
    if (themeMenu) themeMenu.querySelectorAll("[data-pref]").forEach(function (b) { b.setAttribute("aria-checked", String(b.dataset.pref === pref)); });
  }
  function setPref(pref) {
    root.classList.add("theme-anim");
    try { if (pref === "auto") localStorage.removeItem("theme"); else localStorage.setItem("theme", pref); } catch (e) {}
    applyTheme(pref);
    setTimeout(function () { root.classList.remove("theme-anim"); }, 600);
  }
  applyTheme(readPref());

  /* L'appareil change de mode (jour/nuit…) : on suit, tant que le choix est « Automatique » */
  var onSystemChange = function () {
    if (readPref() === "auto") { root.classList.add("theme-anim"); applyTheme("auto"); setTimeout(function () { root.classList.remove("theme-anim"); }, 600); }
  };
  if (darkQuery.addEventListener) darkQuery.addEventListener("change", onSystemChange);
  else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);

  if (themeBtn && themeMenu) {
    var closeThemeMenu = function (focusBtn) {
      themeMenu.classList.remove("open");
      themeBtn.setAttribute("aria-expanded", "false");
      if (focusBtn) themeBtn.focus();
    };
    themeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = themeMenu.classList.toggle("open");
      themeBtn.setAttribute("aria-expanded", String(open));
      if (open) { var cur = themeMenu.querySelector('[aria-checked="true"]'); if (cur) cur.focus(); }
    });
    themeMenu.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pref]");
      if (!b) return;
      setPref(b.dataset.pref);
      closeThemeMenu(true);
    });
    themeMenu.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      var items = [].slice.call(themeMenu.querySelectorAll("[data-pref]"));
      var i = items.indexOf(document.activeElement);
      items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length].focus();
    });
    document.addEventListener("click", function (e) { if (!themeMenu.contains(e.target)) closeThemeMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && themeMenu.classList.contains("open")) closeThemeMenu(true); });
  }

  var isDesktop = function () { return window.matchMedia("(min-width: 761px)").matches; };

  /* ---------- Transition douce entre les pages ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault();
    closeMenu();
    document.body.classList.add("leaving");
    setTimeout(function () { location.href = a.href; }, 280);
  });
  window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });

  /* Avatar de l'en-tête : repli sur « RB » si l'image manque */
  document.querySelectorAll(".brand-mark img").forEach(function (img) {
    var fail = function () { img.parentElement.classList.add("no-avatar"); };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  });

  /* ---------- Photo de profil ---------- */
  document.querySelectorAll(".photo-frame img").forEach(function (img) {
    var fail = function () { img.closest(".photo-frame").classList.add("no-photo"); };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  });

  document.querySelectorAll(".photo-frame").forEach(function (f) { watchImages(f, [].slice.call(f.querySelectorAll("img"))); });

  /* Inclinaison 3D fluide (souris uniquement, via requestAnimationFrame) */
  var frame = document.querySelector(".photo-frame");
  if (frame && !reduce && window.matchMedia("(hover: hover)").matches) {
    var box = frame.parentElement, tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    var loop = function () {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      frame.style.transform = "rotateY(" + cx.toFixed(2) + "deg) rotateX(" + cy.toFixed(2) + "deg)";
      raf = (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) ? requestAnimationFrame(loop) : 0;
    };
    var kick = function () { if (!raf) raf = requestAnimationFrame(loop); };
    box.addEventListener("pointermove", function (e) {
      var r = box.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 12;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 12;
      kick();
    });
    box.addEventListener("pointerleave", function () { tx = ty = 0; kick(); });
  }

  /* Lien CV : le CV dans la langue de la page, téléchargé en PDF */
  document.querySelectorAll("[data-cv]").forEach(function (a) {
    var f = LANG === "en" ? (SITE.cvEn || SITE.cv) : SITE.cv;
    if (f) {
      a.href = U(f);
      a.setAttribute("download", f.split("/").pop());   // force le téléchargement du fichier
      a.setAttribute("type", "application/pdf");
    }
  });

  /* ---------- Logos des technologies ---------- */
  var TECH = {"Python":"python","FastAPI":"fastapi","Node.js":"nodejs","Java":"java","Spring":"spring","React":"react","React.js":"react","React Native":"react","Angular":"angular","JavaScript":"javascript","HTML / CSS":"html5","Figma":"figma","TensorFlow":"tensorflow","Pandas":"pandas","NumPy":"numpy","Docker":"docker","Linux / CLI":"linux","Nginx":"nginx","Git":"git","OBS Studio":"obsstudio","MongoDB":"mongodb","PostgreSQL":"postgresql","Android":"android","iOS":"apple"};
  var chip = function (name) {
    var f = TECH[name];
    return "<span>" + (f ? '<img src="' + U("assets/images/tech/" + f + ".svg") + '" alt="" width="16" height="16" loading="lazy">' : "") + name + "</span>";
  };

  var tagsOf = function (p) {
    if (!p.stack) return L(p.tags) || [];
    var out = [];
    Object.keys(p.stack).forEach(function (k) { p.stack[k].forEach(function (t) { if (out.indexOf(t) < 0) out.push(t); }); });
    return out;
  };

  /* ---------- Carrousel de projets ---------- */
  var slider = document.getElementById("slider");
  if (slider && PROJECTS.length) {
    var slideHTML = function (p, i) {
      var shot = '<div class="shot ' + p.theme + (p.logo ? " has-logo" : "") + '"><img class="shot-cap" src="' + U(p.image) + '" alt="' + S.shotOf + p.name + '" loading="lazy">' +
        (p.logo ? '<img class="shot-logo" src="' + U(p.logo) + '" alt="' + S.logoOf + p.name + '">' : "") +
        (p.logo ? "" : p.os
          ? '<div class="os-win"><div class="os-bar"><i></i><i></i><i></i></div><div class="os-body"><b>' + p.name + "</b><span>" + S.osText + "</span></div></div>"
          : '<span class="shot-word">' + p.word + "</span>") + "</div>";
      var actions = (p.links || []).map(function (l) {
        return l.download
          ? '<a class="dl" href="' + U(l.href) + '" download data-file="' + U(l.href) + '"><b>' + L(l.label) + "</b><small>" + (L(l.kind) || "") + "</small></a>"
          : '<a class="link-out' + (l.primary ? " primary" : "") + '" href="' + l.href + '" target="_blank" rel="noopener">' + L(l.label) + " ↗</a>";
      }).join("") + (p.hint ? '<span class="hint">' + L(p.hint) + "</span>" : "");
      return '<article class="card slide" id="' + p.id + '" role="tabpanel" aria-roledescription="slide" aria-label="' + S.slideOf(i + 1, PROJECTS.length) + '">' + shot +
        '<div class="p-body"><div class="p-meta"><span>' + L(p.category) + '</span><span class="status' + (p.live ? " live" : "") + '">' + L(p.status) + "</span></div>" +
        "<h3>" + p.name + "</h3><p>" + L(p.summary) + "</p>" +
        '<div class="chips">' + tagsOf(p).map(chip).join("") + "</div>" +
        '<div class="p-actions"><button type="button" class="link-out detail-btn" data-open="' + p.id + '">' + S.details + ' <span aria-hidden="true">→</span></button>' + actions + "</div></div></article>";
    };

    slider.innerHTML =
      '<div class="slides">' + PROJECTS.map(slideHTML).join("") + "</div>" +
      '<div class="slider-ctrl">' +
        '<div class="arrows"><button class="arrow" id="prev" aria-label="' + S.prev + '">←</button><button class="arrow" id="next" aria-label="' + S.next + '">→</button></div>' +
        '<span class="counter" id="counter" aria-live="polite"></span>' +
        '<div class="tabs" role="tablist" aria-label="' + S.tabs + '">' +
          PROJECTS.map(function (p, i) { return '<button class="tab" role="tab" data-i="' + i + '" aria-label="' + p.name + '">' + p.name + "</button>"; }).join("") +
        "</div></div>";

    slider.querySelectorAll(".shot-cap").forEach(function (img) {
      var fail = function () { img.closest(".shot").classList.add("no-img"); };
      if (img.complete && img.naturalWidth === 0) fail();
      img.addEventListener("error", fail);
    });

    slider.querySelectorAll(".shot").forEach(function (s) { watchImages(s, [].slice.call(s.querySelectorAll("img"))); });

    var slides = slider.querySelectorAll(".slide");
    var tabs = slider.querySelectorAll(".tab");
    var counter = document.getElementById("counter");
    var cur = 0, lock = false;

    var show = function (n) {
      n = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("active", i === n);
        s.classList.toggle("before", i < n);
        s.setAttribute("aria-hidden", (i === n || !isDesktop()) ? "false" : "true");
      });
      tabs.forEach(function (t, i) { t.setAttribute("aria-selected", String(i === n)); });
      counter.textContent = (n + 1) + " / " + slides.length;
      cur = n;
      history.replaceState(null, "", "#" + PROJECTS[n].id);
    };
    var go = function (d) { show(cur + d); };

    /* Départ : lien direct #id possible */
    var start = PROJECTS.findIndex(function (p) { return "#" + p.id === location.hash; });
    show(start > -1 ? start : 0);

    document.getElementById("prev").addEventListener("click", function () { go(-1); });
    document.getElementById("next").addEventListener("click", function () { go(1); });
    tabs.forEach(function (t) { t.addEventListener("click", function () { show(+t.dataset.i); }); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    });

    /* Glisser au doigt */
    var sx = 0, sy = 0;
    slider.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (isDesktop() && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    }, { passive: true });

    /* Molette : fait défiler les projets (la page, elle, ne défile pas) */
    window.addEventListener("wheel", function (e) {
      if (!isDesktop() || lock || Math.abs(e.deltaY) < 20) return;
      lock = true; setTimeout(function () { lock = false; }, 800);
      go(e.deltaY > 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------- Fiche détaillée d'un projet ---------- */
  if (slider && PROJECTS.length) {
    var dlg = document.createElement("dialog");
    dlg.className = "detail";
    dlg.setAttribute("aria-labelledby", "dTitle");
    document.body.appendChild(dlg);
    var lastFocus = null;

    var detailHTML = function (p, links) {
      var stack = p.stack
        ? Object.keys(p.stack).map(function (k) {
            return '<div class="stack-row"><h4>' + (S.groups[k] || k) + '</h4><div class="chips">' + p.stack[k].map(chip).join("") + "</div></div>";
          }).join("")
        : '<div class="stack-row"><h4>' + S.techs + '</h4><div class="chips">' + (L(p.tags) || []).map(chip).join("") + "</div></div>";
      var shots = (p.screens && p.screens.length)
        ? '<div class="d-track" tabindex="0" aria-label="' + S.shotsOf + p.name + '">' + p.screens.map(function (s, i) {
            return '<span class="d-fig"><img src="' + U("assets/images/projects/" + p.id + "/" + s) + '" alt="' + S.shotAlt(i + 1, p.name) + '" loading="lazy"></span>';
          }).join("") + '</div><div class="d-arrows"><button type="button" class="arrow" data-dir="-1" aria-label="' + S.prevShot + '">←</button><button type="button" class="arrow" data-dir="1" aria-label="' + S.nextShot + '">→</button></div>'
        : '<div class="d-empty"><strong>' + S.emptyTitle + "</strong><span>" + S.emptyText(p.name) + "</span></div>";
      var feats = L(p.features);
      var features = (feats && feats.length)
        ? "<h3>" + S.features + '</h3><ul class="d-features">' + feats.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>"
        : "";
      var tile = p.logo ? '<img src="' + U(p.logo) + '" alt="">' : "<b>" + p.name.slice(0, 2) + "</b>";
      return '<div class="d-card"><button type="button" class="d-close" aria-label="' + S.close + '">×</button>' +
        '<div class="d-head"><span class="d-tile">' + tile + '</span><div><span class="d-cat">' + L(p.category) + '</span><h2 id="dTitle">' + p.name + '</h2></div><span class="status' + (p.live ? " live" : "") + '">' + L(p.status) + "</span></div>" +
        '<div class="d-grid"><div class="d-shots">' + shots + '</div><div class="d-info"><p>' + (L(p.details) || L(p.summary)) + "</p>" + features + "<h3>" + S.stack + "</h3>" + stack +
        (links ? '<div class="p-actions">' + links + "</div>" : "") + "</div></div></div>";
    };

    var openDetail = function (id) {
      var i = PROJECTS.findIndex(function (p) { return p.id === id; });
      if (i < 0) return;
      var links = [].map.call(slider.querySelectorAll("#" + id + " .p-actions a"), function (a) { return a.outerHTML; }).join("");
      dlg.innerHTML = detailHTML(PROJECTS[i], links);
      dlg.querySelectorAll(".d-tile").forEach(function (t) { watchImages(t, [].slice.call(t.querySelectorAll("img"))); });
      lastFocus = document.activeElement;
      root.classList.add("modal-open");
      dlg.showModal();
      requestAnimationFrame(function () { dlg.classList.add("show"); });
      dlg.querySelector(".d-close").focus();
      var track = dlg.querySelector(".d-track");
      if (track) {
        track.querySelectorAll(".d-fig").forEach(function (fig) {
          var img = fig.querySelector("img");
          watchImages(fig, [img]);
          img.addEventListener("error", function () { fig.remove(); });
        });
        dlg.querySelectorAll(".d-arrows .arrow").forEach(function (b) {
          b.addEventListener("click", function () { track.scrollBy({ left: +b.dataset.dir * track.clientWidth * 0.8, behavior: "smooth" }); });
        });
      }
    };
    var closeDetail = function () {
      if (!dlg.open) return;
      dlg.classList.remove("show");
      setTimeout(function () {
        dlg.close();
        root.classList.remove("modal-open");
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }, reduce ? 0 : 380);
    };

    slider.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-open]");
      if (btn) { openDetail(btn.dataset.open); return; }
      var card = e.target.closest(".slide");
      if (card && !e.target.closest("a, button")) openDetail(card.id);
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest(".d-close")) closeDetail(); });
    dlg.addEventListener("cancel", function (e) { e.preventDefault(); closeDetail(); });
  }

  /* ---------- Contact ---------- */
  var box = document.getElementById("contactLinks");
  if (box) {
    var out = [];
    if (SITE.email) out.push('<a class="btn btn-primary" href="mailto:' + SITE.email + '">' + SITE.email + "</a>");
    if (SITE.whatsapp) out.push('<a class="btn btn-ghost" href="https://wa.me/' + SITE.whatsapp.replace(/\D/g, "") + '" target="_blank" rel="noopener">WhatsApp</a>');
    if (SITE.cv) out.push('<a class="btn btn-ghost" href="' + U(SITE.cv) + '" download="' + SITE.cv.split("/").pop() + '" type="application/pdf">' + S.cvA + "</a>");
    if (SITE.cvEn) out.push('<a class="btn btn-ghost" href="' + U(SITE.cvEn) + '" download="' + SITE.cvEn.split("/").pop() + '" type="application/pdf">' + S.cvB + "</a>");
    if (SITE.linkedin) out.push('<a class="btn btn-ghost" href="' + SITE.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>');
    if (SITE.github) out.push('<a class="btn btn-ghost" href="' + SITE.github + '" target="_blank" rel="noopener">GitHub</a>');
    box.innerHTML = out.join("");
  }

  /* ---------- Fichiers à télécharger : taille ou « Bientôt disponible » (en ligne) ---------- */
  var fmt = function (b) { return b > 1e9 ? (b / 1e9).toFixed(1) + S.gb : (b / 1e6).toFixed(1) + S.mb; };
  if (/^https?:$/.test(location.protocol)) {
    document.querySelectorAll("a[data-file]").forEach(function (a) {
      fetch(a.dataset.file, { method: "HEAD" }).then(function (r) {
        var type = r.headers.get("content-type") || "";
        if (!r.ok || type.indexOf("text/html") === 0) throw 0;
        var len = parseInt(r.headers.get("content-length"), 10), s = a.querySelector("small");
        if (len && s) s.textContent += " · " + fmt(len);
      }).catch(function () {
        a.classList.add("is-off"); a.removeAttribute("download"); a.setAttribute("aria-disabled", "true");
        var s = a.querySelector("small"); if (s) s.textContent = S.soon;
      });
    });
  }

  /* ---------- Mobile : apparition au défilement ---------- */
  var targets = document.querySelectorAll(".slide, .skill, .step, .pillars li, .about, .contact");
  targets.forEach(function (el) { el.classList.add("m-reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }
})();
