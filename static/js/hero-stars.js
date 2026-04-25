(function () {
  var mount = document.getElementById("hero-stars");
  if (!mount || typeof window.p5 === "undefined") return;

  var root = document.documentElement;
  var prefersReducedMotion = false;
  var hero = mount.closest ? mount.closest(".hero-home") : null;

  // Guard against “0×0 for a moment” layout timing issues:
  // make sure the mount is never fully collapsed in layout.
  try {
    mount.style.minWidth = "1px";
    mount.style.minHeight = "1px";
  } catch (e) {}

  try {
    prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  function clamp01(n) {
    return Math.max(0, Math.min(1, n));
  }

  function readTheme() {
    var cs = window.getComputedStyle(root);
    return {
      bg: (cs.getPropertyValue("--background") || "#0c0e12").trim(),
      fg: (cs.getPropertyValue("--foreground") || "#e8eaed").trim(),
      muted: (cs.getPropertyValue("--muted-foreground") || "#9ca3af").trim(),
      primary: (cs.getPropertyValue("--primary") || "#f59e0b").trim()
    };
  }

  var theme = readTheme();
  var ro = null;
  var lastBounds = null;

  function readBounds() {
    // Prefer the hero bounds (stable), fall back to mount bounds.
    var b = hero ? hero.getBoundingClientRect() : null;
    if (b && b.width > 10 && b.height > 10) return b;
    return mount.getBoundingClientRect();
  }

  var sketch = function (p) {
    var stars = [];
    var w = 0;
    var h = 0;

    var mouseXn = 0.5;
    var mouseYn = 0.4;
    var hasMouse = false;

    var targetFps = 30;
    var frameStride = 1;

    function computeFrameStride() {
      frameStride = Math.max(1, Math.round(60 / targetFps));
    }

    function resizeToBounds(bounds) {
      if (!bounds) return;
      var nw = Math.max(1, Math.round(bounds.width));
      var nh = Math.max(1, Math.round(bounds.height));
      if (nw === w && nh === h) return;

      w = nw;
      h = nh;
      p.resizeCanvas(w, h, true);
      seedStars();
    }
    p._resizeToBounds = resizeToBounds;

    function starCountForArea(area) {
      // Tuned to feel “spread out” without being noisy.
      return Math.round(clamp01(area / 500000) * 260 + 140);
    }

    function seedStars() {
      var area = w * h;
      var n = starCountForArea(area);
      stars = new Array(n);
      for (var i = 0; i < n; i++) {
        var depth = p.random(0.15, 1); // 0..1, higher = closer/brighter
        var base = p.random(1.2, 4.6);
        stars[i] = {
          x: p.random(0, w),
          y: p.random(0, h),
          z: depth,
          r: base * (0.45 + depth * 1.35),
          tw: p.random(0, 1000),
          vx: p.random(-0.25, 0.25),
          vy: p.random(-0.25, 0.25)
        };
      }
    }

    function updateMouseNorm(ev) {
      if (!lastBounds) return;
      var x = (ev.clientX - lastBounds.left) / Math.max(1, lastBounds.width);
      var y = (ev.clientY - lastBounds.top) / Math.max(1, lastBounds.height);
      mouseXn = clamp01(x);
      mouseYn = clamp01(y);
      hasMouse = true;
    }

    function wrap(star) {
      if (star.x < -10) star.x = w + 10;
      if (star.x > w + 10) star.x = -10;
      if (star.y < -10) star.y = h + 10;
      if (star.y > h + 10) star.y = -10;
    }

    function stepStar(star, t) {
      var drift = 0.38 + star.z * 0.95;

      // Soft flow field based on noise (avoids obvious “screensaver” loops).
      var nx = star.x * 0.0026;
      var ny = star.y * 0.0026;
      var a = p.noise(nx, ny, t * 0.00028) * p.TWO_PI * 3;
      var fx = Math.cos(a) * 0.22;
      var fy = Math.sin(a) * 0.22;

      // Mouse influence: noticeable, but still ambient (no “swarm to cursor” effect).
      var mx = hasMouse ? mouseXn * w : w * 0.5;
      var my = hasMouse ? mouseYn * h : h * 0.42;
      var dx = mx - star.x;
      var dy = my - star.y;
      var d2 = dx * dx + dy * dy;
      var influence = (1 / (1 + d2 / 52000)) * (0.6 + star.z * 1.9);

      var windX = (hasMouse ? (mouseXn - 0.5) : 0) * (0.85 + star.z * 1.35);
      var windY = (hasMouse ? (mouseYn - 0.5) : 0) * (0.75 + star.z * 1.15);

      star.vx = star.vx * 0.86 + (fx + windX + dx * 0.00018 * influence) * 0.52;
      star.vy = star.vy * 0.86 + (fy + windY + dy * 0.00018 * influence) * 0.52;

      star.x += (star.vx + 0.03) * drift;
      star.y += star.vy * drift;
      wrap(star);
    }

    function drawBackground() {
      p.background(theme.bg);
    }

    function drawStars(t) {
      p.noStroke();

      // Two-tone mix (muted + primary) to keep it “starry” but still branded.
      var muted = p.color(theme.muted);
      var prim = p.color(theme.primary);
      var fg = p.color(theme.fg);

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var tw = 0.25 + 0.85 * p.noise(s.x * 0.004, s.y * 0.004, s.tw + t * 0.0016);
        var alpha = (18 + s.z * 120) * tw;

        var c;
        if (s.z > 0.82) {
          c = p.lerpColor(prim, fg, 0.55);
        } else if (s.z > 0.55) {
          c = p.lerpColor(muted, fg, 0.35);
        } else {
          c = muted;
        }

        p.fill(p.red(c), p.green(c), p.blue(c), alpha);
        p.circle(s.x, s.y, s.r);

        // Rare tiny “spark” for depth, kept extremely subtle (no strobe).
        if (s.z > 0.9 && tw > 0.92) {
          p.fill(p.red(c), p.green(c), p.blue(c), alpha * 0.33);
          p.circle(s.x, s.y, s.r * 2.4);
        }
      }
    }

    p.setup = function () {
      p.createCanvas(1, 1);
      p.pixelDensity(1);
      p.frameRate(60);
      computeFrameStride();

      seedStars();

      // Initial bounds read (ResizeObserver will keep it updated).
      lastBounds = readBounds();
      resizeToBounds(lastBounds);

      // Some browsers (notably Safari) can report 0×0 briefly during first layout,
      // which would leave us stuck at a 1×1 canvas. Retry a few times until real bounds.
      (function ensureInitialSize() {
        var tries = 0;
        function tick() {
          if (tries++ > 60) return;
          lastBounds = readBounds();
          if (lastBounds && lastBounds.width > 10 && lastBounds.height > 10) {
            resizeToBounds(lastBounds);
            return;
          }
          // Mix rAF + timeout to survive throttling on first paint.
          window.requestAnimationFrame(function () {
            setTimeout(tick, 34);
          });
        }
        tick();
      })();

      // Passive mouse tracking — no pointer capture.
      window.addEventListener("mousemove", updateMouseNorm, { passive: true });

      if (prefersReducedMotion) {
        p.noLoop();
        drawBackground();
        drawStars(p.millis());
      }
    };

    p.draw = function () {
      if (prefersReducedMotion) return;
      if (frameStride > 1 && p.frameCount % frameStride !== 0) return;

      var t = p.millis();
      drawBackground();

      for (var i = 0; i < stars.length; i++) {
        stepStar(stars[i], t);
      }

      drawStars(t);
    };

    p.windowResized = function () {
      // Safety net; primary resizing is via ResizeObserver.
      lastBounds = readBounds();
      resizeToBounds(lastBounds);
    };
  };

  // Observe theme changes (html.theme-dark toggle).
  var themeObserver = null;
  try {
    themeObserver = new MutationObserver(function () {
      theme = readTheme();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
  } catch (e) {}

  // Observe hero bounds for precise resizing.
  try {
    ro = new ResizeObserver(function () {
      lastBounds = readBounds();
      if (instance && instance._resizeToBounds) instance._resizeToBounds(lastBounds);
    });
    ro.observe(mount);
    if (hero) ro.observe(hero);
  } catch (e) {}

  // Start p5 instance.
  var instance = new window.p5(sketch, mount);
})();

