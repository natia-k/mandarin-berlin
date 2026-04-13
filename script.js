document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const heroTitle = document.getElementById("heroTitle");
  const hoverTargets = document.querySelectorAll("a, .service-row");
  const reveals = document.querySelectorAll(".reveal");

  let mouseX = -120;
  let mouseY = -120;
  let currentX = -120;
  let currentY = -120;
  let rafId = null;

  const animateCursor = () => {
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    if (cursor) {
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }

    rafId = requestAnimationFrame(animateCursor);
  };

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
      cursor.classList.remove("is-hidden");
    }

    if (!rafId) {
      animateCursor();
    }

    if (heroTitle && window.innerWidth > 900) {
      const rect = heroTitle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / window.innerWidth;
      const dy = (e.clientY - centerY) / window.innerHeight;

      heroTitle.style.transform = `translate3d(${dx * 14}px, ${dy * 10}px, 0)`;
    }
  });

  window.addEventListener("mouseleave", () => {
    if (cursor) {
      cursor.classList.add("is-hidden");
    }
    if (heroTitle) {
      heroTitle.style.transform = "translate3d(0,0,0)";
    }
  });

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (cursor) {
        cursor.classList.add("is-active");
      }
    });

    el.addEventListener("mouseleave", () => {
      if (cursor) {
        cursor.classList.remove("is-active");
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  reveals.forEach((el) => observer.observe(el));
});
