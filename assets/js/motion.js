/* ==========================================================================
   Calderaro Law Group — motion
   --------------------------------------------------------------------------
   Four effects, each attached to one specific thing. Deliberately not a
   library and deliberately not applied by blanket selector: the reason the
   site read as generated was that every element moved the same way.

   1. splitHeadline  — the h1 rises word by word from behind a mask.
   2. countUp        — the three hero figures count to their value once.
   3. scrollProgress — a 2px brass rule across the top of the viewport.
   4. parallax       — the hero portrait drifts slightly slower than scroll.

   Everything checks prefers-reduced-motion first and degrades to the final
   state rather than to nothing.
   ========================================================================== */
(function () {
  "use strict";

  var REDUCED = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Headline, word by word ---------------------------------------
     Wrapping each word in .word > i lets the <i> slide up inside an
     overflow:hidden box, so words appear to rise off the baseline instead
     of just fading in. */
  function splitHeadline() {
    var el = document.querySelector("h1[data-split]");
    if (!el || el.dataset.splitDone) return;

    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (w, i) {
      var span = document.createElement("span");
      span.className = "word";
      var inner = document.createElement("i");
      inner.textContent = w;
      span.appendChild(inner);
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.dataset.splitDone = "1";

    var parts = el.querySelectorAll(".word");
    if (REDUCED) {
      parts.forEach(function (p) { p.classList.add("is-in"); });
      return;
    }
    /* Only now do we opt into the hidden resting state. */
    document.documentElement.classList.add("motion-ready");

    /* 78ms apart. At 45ms the seven words landed in ~0.3s, which read as
       a flicker rather than a reveal. */
    parts.forEach(function (p, i) {
      /* Cap at 9 steps: a 17-word headline would otherwise finish
         1.3s after it started. */
      p.querySelector("i").style.transitionDelay = (Math.min(i, 9) * 78) + "ms";
    });

    function reveal() {
      parts.forEach(function (p) { p.classList.add("is-in"); });
    }
    requestAnimationFrame(function () { setTimeout(reveal, 80); });
    /* Safety net. rAF does not run in a hidden tab; setTimeout still does
       (throttled). Whichever lands first wins — adding the class twice is
       harmless. */
    setTimeout(reveal, 900);
  }

  /* ---- 2. Count-up ------------------------------------------------------ */
  function countUp(node) {
    var target = parseInt(node.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    if (REDUCED) { node.textContent = String(target); return; }

    /* The real number is already in the markup, so a visitor with broken or
       blocked JS sees 24 / 4 / 7 rather than three zeros. Only blank it at
       the instant the animation starts. */
    node.textContent = "0";

    var dur = 1900, t0 = null;
    function tick(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      /* easeOutExpo — fast start, long settle. Reads as deceleration
         rather than a linear ticker. */
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      node.textContent = String(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function armCounters() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(countUp);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---- 3. Scroll progress ---------------------------------------------- */
  function scrollProgress() {
    if (REDUCED) return;
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + Math.min(Math.max(p, 0), 1) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---- 4. Portrait parallax ---------------------------------------------
     Small on purpose: 0.04 of scroll distance, capped at 28px. Anything
     stronger detaches the portrait from the copy beside it. Skipped on
     narrow screens, where the portrait stacks and an offset just makes a
     gap. */
  function parallax() {
    if (REDUCED) return;
    var img = document.querySelector(".hero-portrait img");
    if (!img || window.innerWidth < 900) return;

    var ticking = false;
    function update() {
      var y = Math.min(window.scrollY * 0.04, 28);
      img.style.transform = "translate3d(0," + y + "px,0)";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }


  /* ---- 5. Casos swipe ---------------------------------------------------
     Progressive enhancement over a CSS scroll-snap track. The track already
     scrolls without any of this; the arrows and dots are affordances laid
     on top, and they only appear when the content genuinely overflows. */
  function swipe() {
    document.querySelectorAll(".case-swipe").forEach(function (track) {
      var shell = track.closest(".swipe-shell");
      if (!shell) return;
      var cards = Array.prototype.slice.call(track.children);
      if (cards.length < 2) return;

      var ui = document.createElement("div");
      ui.className = "swipe-ui";
      var dots = document.createElement("div");
      dots.className = "swipe-dots";
      dots.setAttribute("role", "tablist");
      dots.setAttribute("aria-label", "Casos de clientes");
      var arrows = document.createElement("div");
      arrows.className = "swipe-arrows";

      var prev = document.createElement("button");
      prev.type = "button"; prev.innerHTML = "&larr;";
      prev.setAttribute("aria-label", "Caso anterior");
      var next = document.createElement("button");
      next.type = "button"; next.innerHTML = "&rarr;";
      next.setAttribute("aria-label", "Caso siguiente");
      arrows.appendChild(prev); arrows.appendChild(next);

      cards.forEach(function (card, i) {
        var d = document.createElement("button");
        d.type = "button";
        d.setAttribute("aria-label", "Ir al caso " + (i + 1));
        d.addEventListener("click", function () {
          track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
        });
        dots.appendChild(d);
      });

      /* With one case on screen there is no row to count along, so state
         the position outright. */
      var count = document.createElement("span");
      count.className = "swipe-count";
      count.setAttribute("aria-hidden", "true");

      var dotWrap = document.createElement("div");
      dotWrap.style.display = "flex";
      dotWrap.style.alignItems = "center";
      dotWrap.appendChild(dots);
      dotWrap.appendChild(count);

      ui.appendChild(dotWrap); ui.appendChild(arrows);
      shell.appendChild(ui);

      function step(dir) {
        var w = cards[0].getBoundingClientRect().width + 24;
        track.scrollBy({ left: dir * w, behavior: "smooth" });
      }
      prev.addEventListener("click", function () { step(-1); });
      next.addEventListener("click", function () { step(1); });

      function sync() {
        /* 2px of slack: sub-pixel widths mean scrollWidth can exceed
           clientWidth by a hair even when nothing is actually clipped. */
        var overflows = track.scrollWidth > track.clientWidth + 2;
        shell.classList.toggle("has-overflow", overflows);
        if (!overflows) {
          /* No overflow means no scrolling, so nothing would ever be marked
             current and every card would sit dimmed at .35 forever. */
          cards.forEach(function (c, i) { c.classList.toggle("is-current", i === 0); });
          return;
        }

        var x = track.scrollLeft;
        var active = 0, best = Infinity;
        cards.forEach(function (c, i) {
          var d = Math.abs((c.offsetLeft - track.offsetLeft) - x);
          if (d < best) { best = d; active = i; }
        });
        Array.prototype.forEach.call(dots.children, function (d, i) {
          d.setAttribute("aria-current", i === active ? "true" : "false");
        });
        cards.forEach(function (c, i) {
          c.classList.toggle("is-current", i === active);
        });
        count.innerHTML = "<strong>" + String(active + 1).padStart(2, "0") +
                          "</strong> / " + String(cards.length).padStart(2, "0");
        prev.disabled = x <= 2;
        next.disabled = x + track.clientWidth >= track.scrollWidth - 2;
      }

      /* Opt the shell into the dimmed/current treatment only now that the
         wiring above is in place and sync() is about to mark one. */
      shell.classList.add("swipe-ready");

      var ticking = false;
      track.addEventListener("scroll", function () {
        if (!ticking) { ticking = true; requestAnimationFrame(function () { sync(); ticking = false; }); }
      }, { passive: true });
      window.addEventListener("resize", sync);
      sync();
      /* Fonts and images change card widths after first paint. */
      setTimeout(sync, 500);
    });
  }

  function init() {
    splitHeadline();
    armCounters();
    scrollProgress();
    parallax();
    swipe();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();

window.CLG_MOTION = true;
