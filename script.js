/* ===================================
   SOWMITHRA J — PORTFOLIO SCRIPT
=================================== */

// ===================================
// PAGE LOADER
// ===================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    document.body.classList.add('loaded');
    document.querySelectorAll('.hero .reveal-up, .hero .hero-identity').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 1900);
});

// ===================================
// CUSTOM CURSOR
// ===================================
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

const hoverTargets = 'a, button, .project-card, .cert-card, .contact-card, .tag, .badge-tech, .social-chip, .proj-link, .tl-card, .edu-card';
document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverTargets)) cursorRing && cursorRing.classList.add('hovering');
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverTargets)) cursorRing && cursorRing.classList.remove('hovering');
});

// ===================================
// PARTICLE CANVAS
// ===================================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT = 60;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x       = Math.random() * W;
      this.y       = initial ? Math.random() * H : H + 10;
      this.size    = Math.random() * 1.2 + 0.3;
      this.speedY  = -(Math.random() * 0.35 + 0.08);
      this.speedX  = (Math.random() - 0.5) * 0.15;
      this.opacity = Math.random() * 0.35 + 0.08;
      this.hue     = Math.random() > 0.6 ? 200 : 260;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 50%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(2, 132, 199, ${0.05 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

// ===================================
// NAVBAR — SCROLL EFFECT & ACTIVE LINK
// ===================================
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
  });
});

// ===================================
// MOBILE DRAWER
// ===================================
const menuToggle   = document.getElementById('menuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerClose  = document.getElementById('drawerClose');

menuToggle  && menuToggle.addEventListener('click',  () => mobileDrawer.classList.add('open'));
drawerClose && drawerClose.addEventListener('click', () => mobileDrawer.classList.remove('open'));
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
});
document.addEventListener('click', e => {
  if (mobileDrawer && mobileDrawer.classList.contains('open')) {
    if (!mobileDrawer.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
      mobileDrawer.classList.remove('open');
    }
  }
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===================================
// TYPING ANIMATION — 3 ROLES ONLY
// ===================================
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Software Developer',
    'Cloud Enthusiast',
    'DevOps Enthusiast',
  ];

  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 50 : 105);
  }
  type();
})();

// ===================================
// SCROLL REVEAL
// ===================================
(function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => {
    if (!el.closest('.hero')) observer.observe(el);
  });
})();

// ===================================
// ANIMATED STAT COUNTERS
// ===================================
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimal || 0);
      const duration = 1600;
      const start    = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = eased * target;
        el.textContent = decimals ? value.toFixed(decimals) : Math.ceil(value);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = decimals ? target.toFixed(decimals) : target;
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();

// ===================================
// MAGNETIC BUTTONS
// ===================================
document.querySelectorAll('.btn, .social-chip, .proj-link').forEach(el => {
  el.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.25;
    const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.25;
    this.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', function () {
    this.style.transform = '';
    this.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
  });
});

// ===================================
// TILT CARDS
// ===================================
document.querySelectorAll('.project-card, .tl-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 7;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -7;
    this.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    this.style.transition = 'transform 0.1s linear';
  });
  card.addEventListener('mouseleave', function () {
    this.style.transform = '';
    this.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
  });
});

// ===================================
// NAV INDICATOR BAR
// ===================================
(function initNavIndicator() {
  const indicator = document.createElement('span');
  indicator.style.cssText = `
    position:absolute; bottom:0; left:0; height:2px;
    background:linear-gradient(90deg,var(--cyan),var(--violet));
    border-radius:99px;
    transition:left 0.3s ease,width 0.3s ease;
    pointer-events:none; width:0;
  `;
  const navEl = document.querySelector('.nav-links');
  if (navEl) {
    navEl.style.position = 'relative';
    navEl.appendChild(indicator);
    function moveIndicator(link) {
      const navRect  = navEl.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      indicator.style.left  = (linkRect.left - navRect.left) + 'px';
      indicator.style.width = linkRect.width + 'px';
    }
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => moveIndicator(link));
    });
    navEl.addEventListener('mouseleave', () => {
      const active = navEl.querySelector('.active-link');
      if (active) moveIndicator(active);
      else indicator.style.width = '0';
    });
  }
})();

// ===================================
// GLITCH STYLE
// ===================================
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
@keyframes glitch {
  0%   { text-shadow: 2px 0 var(--cyan), -2px 0 var(--violet); }
  25%  { text-shadow: -2px 0 var(--cyan), 2px 0 var(--violet); clip-path: inset(0 0 60% 0); }
  50%  { text-shadow: 2px 2px var(--violet); clip-path: inset(40% 0 0 0); }
  75%  { text-shadow: -1px 0 var(--cyan); clip-path: none; }
  100% { text-shadow: none; }
}`;
document.head.appendChild(glitchStyle);
document.querySelectorAll('.section-label').forEach(label => {
  label.addEventListener('mouseenter', function () {
    this.style.animation = 'none';
    this.offsetHeight;
    this.style.animation = 'glitch 0.3s steps(2) forwards';
  });
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log(
  '%c Sowmithra J %c Portfolio %c',
  'background:#0284c7;color:#fff;font-weight:800;padding:4px 8px;border-radius:4px 0 0 4px;font-size:14px;',
  'background:#7c3aed;color:#fff;font-weight:600;padding:4px 8px;border-radius:0 4px 4px 0;font-size:14px;',
  '',
  '\n\n🚀 Loaded Successfully\n📧 jaganathansowmithra@gmail.com\n🔗 github.com/sowmithra05'
);