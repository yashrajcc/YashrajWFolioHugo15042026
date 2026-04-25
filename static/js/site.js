(function () {
  var root = document.documentElement;

  function getTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function setTheme(mode) {
    if (mode === "dark") {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }
    try {
      localStorage.setItem("theme", mode);
    } catch (e) {}
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var dark = mode === "dark";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", dark ? "Using dark theme — click for light" : "Using light theme — click for dark");
    }
  }

  var stored = getTheme();
  if (stored === "dark" || stored === "light") {
    setTheme(stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.classList.contains("theme-dark") ? "light" : "dark");
    });
  }

  // Mobile nav toggle (hamburger)
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (header && navToggle && nav) {
    function setOpen(open) {
      header.classList.toggle("is-nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    navToggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-nav-open"));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (!header.classList.contains("is-nav-open")) return;
      var t = e.target;
      if (t && header.contains(t)) return;
      setOpen(false);
    });

    nav.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.tagName === "A") setOpen(false);
    });
  }

  var shareBtn = document.getElementById("showcase-share");
  if (shareBtn) {
    var defaultAria = shareBtn.getAttribute("aria-label") || "Share this page";
    var defaultTitle = shareBtn.getAttribute("title") || "Share";
    shareBtn.addEventListener("click", function () {
      var url = shareBtn.getAttribute("data-share-url") || window.location.href;
      var title = shareBtn.getAttribute("data-share-title") || document.title;
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          shareBtn.setAttribute("aria-label", "Link copied");
          shareBtn.setAttribute("title", "Link copied");
          setTimeout(function () {
            shareBtn.setAttribute("aria-label", defaultAria);
            shareBtn.setAttribute("title", defaultTitle);
          }, 2000);
        }).catch(function () {
          window.prompt("Copy URL:", url);
        });
      } else {
        window.prompt("Copy URL:", url);
      }
    });
  }
})();
