(function () {
  "use strict";

  function setupReadmore(root = document) {
    const items = root.querySelectorAll("[data-readmore]");
    if (!items.length) return;

    items.forEach((item) => {
      const lines = Number(item.getAttribute("data-readmore")) || 2;
      const content = item.querySelector(".readmore-content");
      const btn = item.querySelector(".readmore-btn");

      if (!content || !btn) return;

      // Apply collapsed clamp
      content.style.display = "-webkit-box";
      content.style.webkitBoxOrient = "vertical";
      content.style.webkitLineClamp = String(lines);
      content.style.overflow = "hidden";

      // Ensure button state
      btn.setAttribute("aria-expanded", "false");

      function setExpanded(isExpanded) {
        if (isExpanded) {
          content.style.webkitLineClamp = "unset";
          content.style.display = "block";
          content.style.overflow = "visible";
          btn.textContent = "Read less";
          btn.setAttribute("aria-expanded", "true");

          // Scroll slightly so it feels like it opens downwards
          // (works better on small screens)
          const rect = item.getBoundingClientRect();
          if (rect.top < 0) {
            window.scrollBy({ top: rect.top - 16, behavior: "smooth" });
          }
        } else {
          content.style.display = "-webkit-box";
          content.style.webkitBoxOrient = "vertical";
          content.style.webkitLineClamp = String(lines);
          content.style.overflow = "hidden";
          btn.textContent = "Read more";
          btn.setAttribute("aria-expanded", "false");
        }
      }

      btn.addEventListener("click", (e) => {
        // Prevent any parent click handlers (mobile) from firing.
        e.stopPropagation();

        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        setExpanded(!isExpanded);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setupReadmore());
  } else {
    setupReadmore();
  }
})();

