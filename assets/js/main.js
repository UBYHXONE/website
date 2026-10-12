/* UBYH site interactions */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Animated metric counters ----
     Delta-based and visibility-safe: if the browser tab is hidden (user switches
     tabs) the elapsed time is not accumulated, so the number never jumps when the
     user returns. Each counter runs exactly once. */
  function animateCount(el) {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";

    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;

    function render(v) { el.textContent = prefix + v.toFixed(decimals) + suffix; }

    if (reduceMotion) { render(target); return; }

    var DURATION = 1400;   // ms of actual visible time
    var elapsed = 0;
    var last = null;

    function frame(ts) {
      if (document.hidden) { last = null; requestAnimationFrame(frame); return; }
      if (last === null) last = ts;
      var dt = ts - last;
      last = ts;
      if (dt < 0) dt = 0;
      if (dt > 50) dt = 50;            // clamp large gaps (prevents visual jumps)
      elapsed += dt;
      var p = Math.min(elapsed / DURATION, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      render(target * eased);
      if (p < 1) requestAnimationFrame(frame);
      else render(target);
    }
    requestAnimationFrame(frame);
  }

  /* ---- IntersectionObserver: reveal + count ---- */
  var revealEls = document.querySelectorAll(".reveal");
  var counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var t = entry.target;
        if (t.classList.contains("reveal")) t.classList.add("is-visible");
        if (t.hasAttribute("data-count")) animateCount(t);
        io.unobserve(t);
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    counters.forEach(animateCount);
  }

  /* ---- Contact form ----
     No backend / email is live yet. On submit we show an inline confirmation and
     point visitors to the founders' direct lines. When an inbox exists, create a
     free form at https://formspree.io and set action="https://formspree.io/f/XXXX"
     on the <form> (and method="POST"); this fallback then no longer runs. */
  var form = document.querySelector("[data-contact-form]");
  var success = document.querySelector("[data-form-success]");
  if (form && !form.getAttribute("action")) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (success) {
        var name = (new FormData(form).get("name") || "").toString().trim();
        var nameSlot = success.querySelector("[data-success-name]");
        if (nameSlot) nameSlot.textContent = name ? name.split(" ")[0] : "there";
        form.hidden = true;
        success.hidden = false;
        success.setAttribute("tabindex", "-1");
        success.focus({ preventScroll: false });
        success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
