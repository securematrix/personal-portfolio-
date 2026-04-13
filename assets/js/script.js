/* ============================================= */
/*  ANOOP ASHOKAN — PREMIUM PORTFOLIO JS          */
/*  Motion Design • Interactions • Particles      */
/* ============================================= */

(function () {
  'use strict';

  // ===========================
  // 1. LOADER
  // ===========================
  const loader = document.getElementById('loader');
  const loaderName = document.getElementById('loaderName');
  const loaderParticles = document.getElementById('loaderParticles');

  // Animate loader name letters
  const nameText = 'ANOOP ASHOKAN';
  nameText.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${i * 0.07}s`;
    loaderName.appendChild(span);
  });

  // Create loader particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'loader-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (2 + Math.random() * 3) + 's';
    loaderParticles.appendChild(particle);
  }

  // Hide loader after animation
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
      document.body.style.overflow = '';
      initHeroAnimations();
    }, 2200);
  });

  // Prevent scroll during loading
  document.body.style.overflow = 'hidden';

  // ===========================
  // 2. CUSTOM CURSOR
  // ===========================
  // (Cursor logic moved to assets/js/cursor.js for modularity and performance)


  // ===========================
  // 3. NAVIGATION
  // ===========================
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const menuBtn = document.getElementById('menuBtn');
  const navLinkItems = document.querySelectorAll('[data-nav]');

  // Scroll effect on nav
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Active nav highlight based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Smooth scrolling for nav links
  navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Also handle other anchor links (CTAs, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================
  // 4. HERO ANIMATIONS
  // ===========================
  function initHeroAnimations() {
    const elements = [
      { el: document.getElementById('heroGreeting'), delay: 0 },
      { el: document.getElementById('heroName'), delay: 200 },
      { el: document.getElementById('heroTitle'), delay: 400 },
      { el: document.getElementById('heroDesc'), delay: 600 },
      { el: document.getElementById('heroCta'), delay: 800 },
      { el: document.getElementById('hero3dCard'), delay: 400 },
    ];

    elements.forEach(({ el, delay }) => {
      if (el) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
      }
    });
  }

  // ===========================
  // 5. HERO 3D TILT CARD
  // ===========================
  const hero3dCard = document.getElementById('hero3dCard');
  const cardShine = document.getElementById('cardShine');

  if (hero3dCard && window.innerWidth > 768) {
    const cardContainer = hero3dCard.closest('.hero-image-wrapper');
    
    cardContainer.addEventListener('mousemove', (e) => {
      const rect = cardContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -12;
      const rotateY = (x - centerX) / centerX * 12;

      hero3dCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Update shine position
      if (cardShine) {
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        cardShine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15), transparent 60%)`;
      }
    });

    cardContainer.addEventListener('mouseleave', () => {
      hero3dCard.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      if (cardShine) {
        cardShine.style.background = '';
      }
    });
  }

  // ===========================
  // 6. HERO PARTICLE SYSTEM
  // ===========================
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      heroCanvas.width = window.innerWidth;
      heroCanvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        if (this.life <= 0 || this.x < 0 || this.x > heroCanvas.width || this.y < 0 || this.y > heroCanvas.height) {
          this.reset();
        }
      }

      draw() {
        const lifeRatio = this.life / this.maxLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(133, 79, 108, ${this.opacity * lifeRatio})`;
        ctx.fill();
      }
    }

    function initParticles() {
      resizeCanvas();
      const count = Math.min(80, Math.floor(heroCanvas.width * heroCanvas.height / 15000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(82, 43, 91, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      animationId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    // Pause particles when not visible (performance)
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationId) animateParticles();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    }, { threshold: 0.1 });

    heroObserver.observe(document.getElementById('hero'));
  }

  // ===========================
  // 7. SCROLL REVEAL ANIMATIONS
  // ===========================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't unobserve so animation can replay if desired
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===========================
  // 8. 3D TILT ON CARDS
  // ===========================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  if (window.innerWidth > 768) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ===========================
  // 9. ANIMATED COUNTERS
  // ===========================
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const countersSection = document.querySelector('.counters-grid');
  if (countersSection) counterObserver.observe(countersSection);

  // ===========================
  // 10. SKILL BAR ANIMATION
  // ===========================
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        skillBarObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillBarObserver.observe(bar));



  // ===========================
  // 12. PARALLAX SCROLLING
  // ===========================
  const floatingElements = document.querySelectorAll('.floating-element');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Background name parallax
    const heroBgText = document.querySelector('.hero-bg-text');
    if (heroBgText && scrolled < window.innerHeight) {
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    }

    floatingElements.forEach((el, i) => {
      const speed = 0.02 + (i * 0.01);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===========================
  // 13. MAGNETIC BUTTON EFFECT
  // ===========================
  if (window.innerWidth > 768) {
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .social-icon-link');

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ===========================
  // 14. TEXT TYPING EFFECT FOR HERO TITLE
  // ===========================
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    const titles = [
      'Software Architect & Security Expert',
      'Secure Software Engineer',
      'Penetration Tester & Full-Stack Developer',
      'Cybersecurity Specialist'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeTitle() {
      const current = titles[titleIndex];

      if (isDeleting) {
        heroTitle.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        heroTitle.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      // Add blinking cursor
      heroTitle.style.borderRight = '2px solid var(--highlight)';

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before next
      }

      setTimeout(typeTitle, typeSpeed);
    }

    // Start typing after hero animations
    setTimeout(typeTitle, 3000);
  }

  // ===========================
  // 15. FORM VALIDATION ENHANCEMENT
  // ===========================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  }

  // ===========================
  // 16. STAGGER REVEAL FOR SKILLS
  // ===========================
  const skillCards = document.querySelectorAll('.skill-category-card');
  skillCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.15}s`;
  });

})();
