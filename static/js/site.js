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

  document.getElementById("theme-toggle")?.addEventListener("click", function () {
    setTheme(root.classList.contains("theme-dark") ? "light" : "dark");
  });

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

  var workTabs = document.querySelector(".home-work-filter");
  var workBandsRoot = document.getElementById("work-bands");
  if (workTabs && workBandsRoot) {
    var tabs = workTabs.querySelectorAll("[data-work-filter]");
    var bands = workBandsRoot.querySelectorAll("[data-work-band]");
    function tabList() {
      return Array.prototype.slice.call(tabs);
    }
    function setActiveTab(tab) {
      var mode = tab.getAttribute("data-work-filter") || "all";
      workBandsRoot.setAttribute("data-work-active", mode);
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
      });
      bands.forEach(function (band) {
        var key = band.getAttribute("data-work-band");
        var visible = mode === "all" || mode === key;
        if (visible) {
          band.removeAttribute("hidden");
        } else {
          band.setAttribute("hidden", "");
        }
      });
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveTab(tab);
      });
    });
    var initial = workTabs.querySelector('[aria-selected="true"]') || tabs[0];
    if (initial) {
      setActiveTab(initial);
    }
    workTabs.addEventListener("keydown", function (e) {
      var list = tabList();
      var i = list.indexOf(document.activeElement);
      if (i < 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var dir = e.key === "ArrowRight" ? 1 : -1;
        var next = (i + dir + list.length) % list.length;
        list[next].focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        list[0].focus();
      } else if (e.key === "End") {
        e.preventDefault();
        list[list.length - 1].focus();
      }
    });
  }
})();
