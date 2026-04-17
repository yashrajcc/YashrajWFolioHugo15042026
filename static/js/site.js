(function () {
  var root = document.documentElement;
  var body = document.body;

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
      btn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
      var icon = btn.querySelector(".theme-toggle__icon");
      if (icon) {
        icon.textContent = mode === "dark" ? "☀️" : "🌙";
      }
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

  document.getElementById("theme-toggle")?.addEventListener("click", function () {
    setTheme(root.classList.contains("theme-dark") ? "light" : "dark");
  });

  var a11yBtn = document.getElementById("a11y-toggle");
  if (a11yBtn) {
    var a11yEnable = a11yBtn.getAttribute("data-a11y-enable") || "Enable Accessible Mode";
    var a11yDisable = a11yBtn.getAttribute("data-a11y-disable") || "Disable Accessible Mode";
    a11yBtn.textContent = body.classList.contains("a11y-mode") ? a11yDisable : a11yEnable;
    a11yBtn.addEventListener("click", function () {
      var on = body.classList.toggle("a11y-mode");
      a11yBtn.setAttribute("aria-pressed", on ? "true" : "false");
      a11yBtn.textContent = on ? a11yDisable : a11yEnable;
    });
  }

  var shareBtn = document.getElementById("showcase-share");
  if (shareBtn) {
    var shareLabel = shareBtn.textContent;
    shareBtn.addEventListener("click", function () {
      var url = shareBtn.getAttribute("data-share-url") || window.location.href;
      var title = shareBtn.getAttribute("data-share-title") || document.title;
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          shareBtn.textContent = "Copied link";
          setTimeout(function () {
            shareBtn.textContent = shareLabel;
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
