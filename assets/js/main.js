// ===========================
// INITIALIZE LUCIDE ICONS
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

// ===========================
// SMOOTH SCROLL NAVIGATION
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset; // window.scrollY est plus moderne que pageYOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===========================
// INTERSECTION OBSERVER (Animations)
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document
  .querySelectorAll("section, .timeline-item, .skill-pillar")
  .forEach((el) => {
    observer.observe(el);
  });

// ===========================
// HEADER SCROLL EFFECT
// ===========================
const header = document.querySelector(".sticky-header");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  },
  { passive: true },
); // passive: true améliore les perfs du scroll

// ===========================
// ACTIVE STATE NAVIGATION
// ===========================
// Optimisation : Utilisation d'un debounce simplifié pour ne pas recalculer à chaque pixel
let scrollTimeout;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-links a");

      let current = "";
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        // Ajustement du seuil de détection
        if (scrollPosition >= sectionTop - 250) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });

      scrollTimeout = null;
    }, 100); // Exécution toutes les 100ms max
  },
  { passive: true },
);

// ===========================
// ACCORDION FUNCTIONALITY
// ===========================
function toggleTimeline(id) {
  const item = document.getElementById(id);
  if (item) {
    item.classList.toggle("expanded");
  }
}

// ===========================
// CONSOLE SIGNATURE
// ===========================
console.log(
  "%c👋 Bienvenue sur mon CV ! ",
  "color: #60A5FA; font-size: 20px; font-weight: bold; padding: 10px;",
);
console.log(
  "%cCéline DEMONGEOT - Ingénieur Test & Validation",
  "color: #191970; font-size: 14px; font-weight: bold;",
);
