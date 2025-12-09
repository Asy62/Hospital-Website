/* ========= MOBILE MENU ========= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

/* ========= HERO SLIDER (fade) ========= */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const heroSection = document.getElementById("home");
const headerEl = document.querySelector(".main-header");

// Make sure slides are visible in the document flow (we use opacity for animation)
slides.forEach((s) => {
  s.style.display = "block";
});

// Function to set hero height so slider fills viewport below the sticky header
function adjustHeroHeight() {
  if (!heroSection) return;
  // If header exists, subtract its height; otherwise use full viewport.
  const headerHeight = headerEl ? headerEl.offsetHeight : 0;
  // Set min-height so it doesn't collapse on very short viewports
  const computedHeight = Math.max(window.innerHeight - headerHeight, 360);
  heroSection.style.height = computedHeight + "px";
}

// Show slide by toggling .active class (CSS handles fade via opacity)
function showSlide(index) {
  if (slides.length === 0) return;
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

// Advance to next slide
function nextSlide() {
  if (slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Initialize
window.addEventListener("load", () => {
  adjustHeroHeight();
  // ensure first slide visible
  showSlide(currentSlide);
  // auto slide every 5s
  setInterval(nextSlide, 5000);
});

window.addEventListener("resize", adjustHeroHeight);

/* ========= DYNAMIC YEAR ========= */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ========= APPOINTMENT FORM (EmailJS) ========= */
// Replace with your EmailJS keys (these are from your original)
const serviceID = "service_sngglql";
const templateID = "template_6f4j5c9";
const publicKey = "0V5c39PDEk-vJfx7Y";

const form = document.getElementById("appointmentForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      first_name: form.firstName.value,
      last_name: form.lastName.value,
      gender: form.gender.value,
      phone: form.phone.value,
      email: form.email.value,
      district: form.district.value,
      address: form.address.value,
      appointment_date: form.date.value,
    };

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        alert("✅ Appointment request sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("❌ Failed to send request:", error);
        alert("Something went wrong. Please try again later.");
      });
  });
}

/* ========= SMOOTH SCROLLING ========= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // If href is just '#' or empty, do nothing special
    const target = this.getAttribute("href");
    if (!target || target === "#") return;
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth"
      });
    }
    // close mobile menu if open
    if (navLinks && navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
    }
  });
});

/* ========= SCROLL REVEAL ANIMATIONS ========= */
const sections = document.querySelectorAll(".section, .about-card, .doctor-card, .service-card, .gallery-grid img");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  sections.forEach(section => {
    const position = section.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
