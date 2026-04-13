document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const heroTitle = document.getElementById("heroTitle");
  const heroGhost = document.getElementById("heroGhost");
  const hoverTargets = document.querySelectorAll("a, .service-row, .ghost-button");
  const reveals = document.querySelectorAll(".reveal");
  const langButtons = document.querySelectorAll(".lang-btn");

  const translations = {
    de: {
      navServices: "Leistungen",
      navProfile: "Profil",
      navContact: "Kontakt",
      ghostWord: "Berlin",
      eyebrow: "Mandarin Facility Services GmbH",
      heroTitleSolid: "Facility",
      heroTitleOutline: "Services",
      heroText:
        "Professionelle Bewirtschaftung, technische Betreuung und operative Gebäudeservices für Wohn- und Gewerbeimmobilien in Berlin — strukturiert, diskret und auf dauerhaft funktionierende Abläufe ausgerichtet.",
      heroSide: "Verwaltung · Reinigung · Sicherheit · Technik",
      sectionServicesLabel: "Leistungen",
      servicesIntro:
        "Ganzheitliches Facility Management als präzise koordinierte Disziplin — nicht als Summe von Einzelleistungen.",
      service1Title: "Objektmanagement",
      service1Desc:
        "Professionelle Bewirtschaftung und administrative Betreuung Ihrer Liegenschaft — transparent, strukturiert und vorausschauend.",
      service2Title: "Reinigung & Hygiene",
      service2Desc:
        "Von der täglichen Unterhaltsreinigung bis zur Sonderreinigung — professionelle Hygiene als Standard, nicht als Option.",
      service3Title: "Sicherheit & Empfang",
      service3Desc:
        "Diskreter Objektschutz, qualifizierter Empfangsservice und kontrollierte Zugänge für verlässliche Abläufe vor Ort.",
      service4Title: "Technische Betreuung",
      service4Desc:
        "Vorausschauende Wartung, Haustechnik und begleitende Servicearbeiten — damit nichts dem Zufall überlassen wird.",
      service5Title: "Außenanlagenpflege",
      service5Desc:
        "Ganzjährige Pflege von Außenbereichen und Grünanlagen für einen geordneten, funktionalen und gepflegten Objektauftritt.",
      service6Title: "Winterdienst",
      service6Desc:
        "Zuverlässige saisonale Einsatzleistungen zur Sicherung von Zugängen, Verkehrsflächen und umliegenden Außenbereichen.",
      sectionProfileLabel: "Profil",
      aboutText1:
        "Mandarin Facility Services GmbH steht für professionelles, ganzheitliches Immobilienmanagement in Berlin — mit einem klaren Fokus auf Verlässlichkeit, Präzision und diskrete Ausführung.",
      aboutText2:
        "Wir verstehen Facility Management nicht als reinen Kostenfaktor, sondern als strukturelles Instrument zur Werterhaltung und langfristigen Stabilisierung von Immobilien.",
      aboutSide: "Berlin · Objektbetreuung<br />Gebäudebetrieb · Präzision<br />Diskret · Verlässlich",
      sectionContactLabel: "Kontakt",
      legalCourt: "Amtsgericht Charlottenburg (Berlin)",
      footerCity: "Berlin",
      footerButton: "E-Mail senden",
      footerNote: "Weitere Kontaktdaten auf Anfrage"
    },
    en: {
      navServices: "Services",
      navProfile: "Profile",
      navContact: "Contact",
      ghostWord: "Berlin",
      eyebrow: "Mandarin Facility Services GmbH",
      heroTitleSolid: "Facility",
      heroTitleOutline: "Services",
      heroText:
        "Professional property operations, technical support, and building services for residential and commercial real estate in Berlin — structured, discreet, and focused on long-term performance.",
      heroSide: "Management · Cleaning · Security · Technical",
      sectionServicesLabel: "Services",
      servicesIntro:
        "Integrated facility management as a precisely coordinated discipline — not a loose collection of individual services.",
      service1Title: "Property Management",
      service1Desc:
        "Professional property operations and administrative support — transparent, structured, and forward-looking.",
      service2Title: "Cleaning & Hygiene",
      service2Desc:
        "From routine maintenance cleaning to special services — professional hygiene as a standard, not an option.",
      service3Title: "Security & Reception",
      service3Desc:
        "Discreet site protection, qualified reception services, and controlled access for reliable on-site operations.",
      service4Title: "Technical Support",
      service4Desc:
        "Preventive maintenance, technical supervision, and supporting service work — so nothing is left to chance.",
      service5Title: "Outdoor Maintenance",
      service5Desc:
        "Year-round care of outdoor areas and green spaces for an orderly, functional, and well-maintained property presence.",
      service6Title: "Winter Service",
      service6Desc:
        "Reliable seasonal operations to secure access points, traffic routes, and surrounding exterior areas.",
      sectionProfileLabel: "Profile",
      aboutText1:
        "Mandarin Facility Services GmbH stands for professional, integrated property management in Berlin — with a clear focus on reliability, precision, and discreet execution.",
      aboutText2:
        "We do not see facility management as a pure cost factor, but as a structural instrument for preserving value and supporting the long-term stability of real estate.",
      aboutSide: "Berlin · Property Care<br />Building Operations · Precision<br />Discreet · Reliable",
      sectionContactLabel: "Contact",
      legalCourt: "Charlottenburg District Court (Berlin)",
      footerCity: "Berlin",
      footerButton: "Send Email",
      footerNote: "Further contact details available on request"
    }
  };

  function setLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (!translations[lang][key]) return;

      if (key === "aboutSide") {
        el.innerHTML = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    localStorage.setItem("mandarin_lang", lang);
  }

  const savedLang = localStorage.getItem("mandarin_lang") || "de";
  setLanguage(savedLang);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

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
