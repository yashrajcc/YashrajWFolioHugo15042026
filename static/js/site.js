(function () {
  var root = document.documentElement;
  var ANALYTICS_KEY = "analytics-consent";

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

  // Analytics (GoatCounter) — only load after visitor choice.
  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function loadGoatCounter(endpoint) {
    if (!endpoint) return;
    if (document.querySelector('script[src*="gc.zgo.at/count.js"]')) return;

    // Prevent an automatic onload count; we’ll trigger a single count after load.
    window.goatcounter = window.goatcounter || {};
    window.goatcounter.no_onload = true;

    var s = document.createElement("script");
    s.async = true;
    s.src = "//gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", endpoint);
    s.addEventListener("load", function () {
      try {
        if (window.goatcounter && typeof window.goatcounter.count === "function") {
          window.goatcounter.count({ path: location.pathname + location.search + location.hash });
        }
      } catch (e) {}
    });
    document.head.appendChild(s);
  }

  function initAnalyticsConsent() {
    var el = document.getElementById("analytics-consent");
    if (!el) return; // not rendered (e.g. non-production)

    var dialog = el.querySelector(".analytics-consent__dialog");
    var acceptBtn = el.querySelector('[data-analytics-consent="accept"]');
    var rejectBtn = el.querySelector('[data-analytics-consent="reject"]');
    var endpoint = el.getAttribute("data-goatcounter-endpoint");
    var settingsBtn = document.getElementById("analytics-settings");

    function hide() {
      el.hidden = true;
    }

    function show() {
      el.hidden = false;
      if (dialog && dialog.focus) dialog.focus();
      if (acceptBtn && acceptBtn.focus) acceptBtn.focus();
    }

    function choose(value) {
      safeSet(ANALYTICS_KEY, value);
      hide();
      if (value === "accept") loadGoatCounter(endpoint);
    }

    if (settingsBtn) {
      settingsBtn.addEventListener("click", function () {
        show();
      });
    }

    var choice = safeGet(ANALYTICS_KEY);
    if (choice === "accept") {
      loadGoatCounter(endpoint);
      hide();
      return;
    }
    if (choice === "reject") {
      hide();
      return;
    }

    if (acceptBtn) acceptBtn.addEventListener("click", function () { choose("accept"); });
    if (rejectBtn) rejectBtn.addEventListener("click", function () { choose("reject"); });

    // Keep focus inside the dialog (basic two-button trap).
    el.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        choose("reject");
        return;
      }
      if (e.key !== "Tab") return;
      if (!acceptBtn || !rejectBtn) return;

      var active = document.activeElement;
      if (e.shiftKey && active === acceptBtn) {
        e.preventDefault();
        rejectBtn.focus();
      } else if (!e.shiftKey && active === rejectBtn) {
        e.preventDefault();
        acceptBtn.focus();
      }
    });

    show();
  }

  initAnalyticsConsent();
})();
