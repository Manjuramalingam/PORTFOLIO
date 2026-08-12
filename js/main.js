// Portfolio interactions — menu, typing, spotlight, scroll reveal

var menuBtn = document.getElementById("menu-btn");
var navLinks = document.getElementById("nav-links");
var yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile menu
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  var links = navLinks.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      navLinks.classList.remove("open");
    });
  }
}

// Typing effect (rotating tech names)
var typedEl = document.getElementById("typed-text");
var words = ["React.js", "FastAPI", "Spring Boot", "Next.js", "Docker", "PostgreSQL"];
var wordIndex = 0;
var charIndex = 0;
var deleting = false;

function typeLoop() {
  if (!typedEl) return;

  var current = words[wordIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 90);
}

typeLoop();

// Spotlight cards — mouse follow glow (Magic UI / React Bits style)
var spotlightCards = document.querySelectorAll("[data-spotlight]");

for (var s = 0; s < spotlightCards.length; s++) {
  spotlightCards[s].addEventListener("mousemove", function (e) {
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    this.style.setProperty("--x", x + "px");
    this.style.setProperty("--y", y + "px");
  });
}

// Scroll reveal
var revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  var observer = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("show");
          observer.unobserve(entries[i].target);
        }
      }
    },
    { threshold: 0.12 }
  );

  for (var j = 0; j < revealItems.length; j++) {
    observer.observe(revealItems[j]);
  }
} else {
  for (var k = 0; k < revealItems.length; k++) {
    revealItems[k].classList.add("show");
  }
}
