/* Small behaviours for the page. Nothing here stores or sends any data. */
(function () {
  "use strict";

  /* ---------- Popup: "What does a music supervisor do?" ---------- */
  var dialog = document.getElementById("role-dialog");
  var openers = document.querySelectorAll("[data-open-role]");
  var closers = document.querySelectorAll("[data-close-role]");

  if (dialog) {
    var native = typeof dialog.showModal === "function";
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      if (native) { dialog.showModal(); } else { dialog.setAttribute("open", ""); }
    }
    function close() {
      if (native) { dialog.close(); } else { dialog.removeAttribute("open"); }
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    Array.prototype.forEach.call(openers, function (el) { el.addEventListener("click", open); });
    Array.prototype.forEach.call(closers, function (el) { el.addEventListener("click", close); });

    /* Clicking the dimmed area outside the box closes it. */
    dialog.addEventListener("click", function (e) { if (e.target === dialog) close(); });
    if (!native) {
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && dialog.hasAttribute("open")) close();
      });
    }
  }

  /* ---------- Keep the "open in a new tab" link in step with the form ---------- */
  var frame = document.getElementById("interest-form");
  var link = document.getElementById("form-link");
  if (frame && link && frame.getAttribute("src")) {
    try {
      var url = new URL(frame.getAttribute("src"), window.location.href);
      if (/(^|\.)airtable\.com$/i.test(url.hostname)) url.pathname = url.pathname.replace(/^\/embed/i, "");
      link.href = url.href;
    } catch (e) { /* leave the link as written in index.html */ }
  }
})();
