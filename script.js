/* ============================================================
   PC PARAMEDIC
   Main website JavaScript
   ============================================================ */

"use strict";


/* ============================================================
   FOOTER YEAR
   ============================================================ */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ============================================================
   NAVIGATION
   Add a subtle shadow when the user scrolls.
   ============================================================ */

const nav = document.querySelector(".nav");

function updateNavigation() {
  if (!nav) return;

  if (window.scrollY > 20) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }
}

window.addEventListener("scroll", updateNavigation, {
  passive: true
});

updateNavigation();


/* ============================================================
   SCROLL REVEAL
   Sections/cards smoothly appear as they enter the viewport.
   ============================================================ */

const revealElements = document.querySelectorAll(
  ".service-card, .price-card, .process-card, .review-card, .social-card, .contact-card, .stack-card"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  revealElements.forEach((element, index) => {

    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index % 4, 3) * 70}ms`
    );

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });

}


/* ============================================================
   SMOOTH INTERNAL LINKS
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* ============================================================
   SERVICE CARD KEYBOARD ACCESSIBILITY
   ============================================================ */

document.querySelectorAll(".service-card").forEach((card) => {

  card.addEventListener("mouseenter", () => {
    card.classList.add("card-active");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("card-active");
  });

});


/* ============================================================
   PHONE CTA TRACKING
   This doesn't send data anywhere.
   It simply logs when a phone CTA is clicked.
   ============================================================ */

document.querySelectorAll('a[href^="tel:"]').forEach((phoneLink) => {

  phoneLink.addEventListener("click", () => {

    console.log("PC Paramedic phone CTA selected.");

  });

});


/* ============================================================
   EMAIL CTA TRACKING
   ============================================================ */

document.querySelectorAll('a[href^="mailto:"]').forEach((emailLink) => {

  emailLink.addEventListener("click", () => {

    console.log("PC Paramedic email CTA selected.");

  });

});


/* ============================================================
   TERMINAL STATUS
   Rotates through simple system-status messages.
   This is visual only and does not claim to monitor a real system.
   ============================================================ */

const terminalStatus = document.querySelector(".terminal-result strong");

const terminalMessages = [
  "OPERATIONAL",
  "READY",
  "STABLE",
  "ONLINE"
];

let terminalIndex = 0;

function rotateTerminalStatus() {

  if (!terminalStatus) {
    return;
  }

  terminalIndex =
    (terminalIndex + 1) % terminalMessages.length;

  terminalStatus.style.opacity = "0";

  setTimeout(() => {

    terminalStatus.textContent =
      terminalMessages[terminalIndex];

    terminalStatus.style.opacity = "1";

  }, 180);

}

setInterval(rotateTerminalStatus, 3500);


/* ============================================================
   REDUCED MOTION
   Respect users who request reduced animation.
   ============================================================ */

const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {

  document.documentElement.classList.add(
    "reduced-motion"
  );

}
