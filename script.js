document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const heroTitle = document.getElementById("heroTitle");
  const heroGhost = document.getElementById("heroGhost");
  const hoverTargets = document.querySelectorAll("a, .service-row, .ghost-button");
  const reveals = document.querySelectorAll(".reveal");

  let mouseX = -120;
  let mouseY = -120;
  let currentX = -120;
  let currentY = -120;
  let cursorRaf = null;

  const animateCursor = () => {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    if (cursor) {
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }

    cursorRaf = requestAnimationFrame(animateCursor);
  };

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
      cursor.classList.remove("is-hidden");
    }

    if (!cursorRaf) {
      animateCursor();
    }

    if (heroTitle && window.innerWidth > 900) {
      const rect = heroTitle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / window.innerWidth;
      const dy = (e.clientY - centerY) / window.innerHeight;

      heroTitle.style.transform = `translate3d(${dx * 10}px, ${dy * 7}px, 0)`;
    }
  });

  window.addEventListener("mouseleave", () => {
    if (cursor) cursor.classList.add("is-hidden");
    if (heroTitle) heroTitle.style.transform = "translate3d(0,0,0)";
  });

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (cursor) cursor.classList.add("is-active");
    });

    el.addEventListener("mouseleave", () => {
      if (cursor) cursor.classList.remove("is-active");
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  const updateParallax = () => {
    if (heroGhost) {
      const y = window.scrollY * 0.18;
      heroGhost.style.transform = `translate3d(0, ${y}px, 0)`;
    }
  };

  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });
});
