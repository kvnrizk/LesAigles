// Les Aigles — Main JS
// Scroll animations, nav behavior, smooth scroll, hero slideshow

// Hero photo slideshow — rotates every 3 seconds
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 3000);

// Nav background on scroll + active link tracking
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('.section, .hero');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Nav background
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Active section tracking
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// History carousel — duplicate cards for infinite scroll
const historyTrack = document.querySelector('.history-track');
if (historyTrack) {
  historyTrack.innerHTML += historyTrack.innerHTML;
}

// Count-up animation for stat numbers
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(target * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observer for count-up — triggers once when stat cards enter view
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.se-stat-number[data-target]').forEach(el => {
  countObserver.observe(el);
});

// Observe all animated elements
document.querySelectorAll('.fade-in, .fade-in-stagger').forEach(el => {
  observer.observe(el);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});
