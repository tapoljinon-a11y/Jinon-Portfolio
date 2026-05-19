// Personal Portfolio Website - Main JavaScript
// BS Computer Engineering - GEMST 03

/**
 * Highlights the active navigation link based on the current page
 * Adds 'active' class and aria-current attribute to the matching link
 */
function highlightActiveNavLink() {
  // Get current page filename from URL
  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Check if this link matches the current page
    if (linkHref === currentFile || (currentFile === '' && linkHref === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}


/**
 * Initializes the hamburger menu toggle functionality
 * Controls mobile navigation drawer open/close state
 */
function initHamburgerMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Guard: check if elements exist
  if (!toggleBtn || !navLinks) {
    return;
  }
  
  // Toggle menu on button click
  toggleBtn.addEventListener('click', function() {
    const isOpen = navLinks.classList.contains('open');
    
    if (isOpen) {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      navLinks.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });
  
  // Close menu when a navigation link is clicked (mobile UX)
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}


/**
 * Initializes scroll-triggered fade-in animations
 * Uses Intersection Observer API with graceful degradation
 */
function initScrollAnimations() {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: make all fade-in elements immediately visible
    document.querySelectorAll('.fade-in').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }
  
  // Configure Intersection Observer options
  const options = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Create observer
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Add visible class when element enters viewport
        entry.target.classList.add('visible');
        // Stop observing this element (animate once only)
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Observe all elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });
}


/**
 * Sets the current year in the footer
 * Updates the #footer-year span with the current year
 */
function setFooterYear() {
  const yearSpan = document.getElementById('footer-year');
  
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}


/**
 * Main initialization function
 * Runs when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  highlightActiveNavLink();
  initHamburgerMenu();
  initScrollAnimations();
  setFooterYear();
});


/**
 * Enhanced Interactive Features
 */

// Particle Background Generator
function createParticles() {
  // Skip particles on mobile for better performance
  if (window.innerWidth <= 768) {
    return;
  }
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 10 + 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Statistics Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
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
    
    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
}

// Skill Bar Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => observer.observe(bar));
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Loading Animation
function initLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = '<div class="spinner"></div>';
  document.body.prepend(loader);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 500);
  });
}

// Typing Animation for Hero Text
function initTypingAnimation() {
  const heroTitles = document.querySelectorAll('.hero-title');
  heroTitles.forEach(title => {
    if (!title.classList.contains('typing-text')) {
      title.classList.add('typing-text');
    }
  });
}

// Parallax Effect for Hero Sections
function initParallax() {
  // Skip parallax on mobile
  if (window.innerWidth <= 768) {
    return;
  }
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.page-hero');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Enhanced Card Interactions
function enhanceCards() {
  const cards = document.querySelectorAll('.media-card, .achievement-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
}

// Smooth Reveal on Scroll
function initSmoothReveal() {
  const revealElements = document.querySelectorAll('.content-section, .achievement-card, .media-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
  });
}

// Add Glow Effect to Headings
function addGlowEffect() {
  const headings = document.querySelectorAll('.hero-title, .section-title');
  headings.forEach(heading => {
    heading.classList.add('glow-text');
  });
}

// Ripple Effect on Click
function addRippleEffect() {
  document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
}

// Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Smooth Page Transition
function initPageTransition() {
  document.body.classList.add('page-transition');
}

// Enhanced Skill Badge Interactions
function enhanceSkillBadges() {
  const badges = document.querySelectorAll('.skill-badge');
  
  badges.forEach((badge, index) => {
    badge.style.animationDelay = (index * 0.1) + 's';
    badge.classList.add('stagger-fade-in');
    
    badge.addEventListener('click', function() {
      this.style.transform = 'scale(1.2) rotate(360deg)';
      setTimeout(() => {
        this.style.transform = '';
      }, 500);
    });
  });
}

// Floating Animation for Icons
function addFloatingAnimation() {
  const icons = document.querySelectorAll('.achievement-icon, .contact-icon');
  icons.forEach((icon, index) => {
    if (index % 2 === 0) {
      icon.classList.add('float-animation');
    }
  });
}

// Enhanced Navigation with Active State
function enhanceNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Lazy Load Images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Dynamic Greeting Based on Time
function addDynamicGreeting() {
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (!heroSubtitle) return;
  
  const hour = new Date().getHours();
  let greeting = '';
  
  if (hour < 12) {
    greeting = '🌅 Good Morning!';
  } else if (hour < 18) {
    greeting = '☀️ Good Afternoon!';
  } else {
    greeting = '🌙 Good Evening!';
  }
  
  // Only add greeting on home page
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    const greetingElement = document.createElement('p');
    greetingElement.textContent = greeting;
    greetingElement.style.fontSize = 'var(--font-size-lg)';
    greetingElement.style.marginTop = 'var(--spacing-md)';
    greetingElement.classList.add('fade-in', 'visible');
    heroSubtitle.parentNode.appendChild(greetingElement);
  }
}

// Keyboard Navigation Enhancement
function enhanceKeyboardNav() {
  document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
      if (!e.target.matches('input, textarea')) {
        window.location.href = 'index.html';
      }
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
      if (!e.target.matches('input, textarea')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });
}

// Add Tooltip Functionality
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function(e) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.dataset.tooltip;
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        pointer-events: none;
        z-index: 10000;
        white-space: nowrap;
      `;
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.pageYOffset + 'px';
      
      this._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });
}

// Performance Monitoring
function logPerformance() {
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
      }, 0);
    });
  }
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
  // Original functionality
  highlightActiveNavLink();
  initHamburgerMenu();
  initScrollAnimations();
  setFooterYear();
  
  // Enhanced features from previous update
  initLoader();
  createParticles();
  initBackToTop();
  initTypingAnimation();
  initParallax();
  enhanceCards();
  animateCounters();
  animateSkillBars();
  initSmoothReveal();
  addGlowEffect();
  
  // New professional enhancements
  addRippleEffect();
  initScrollProgress();
  initPageTransition();
  enhanceSkillBadges();
  addFloatingAnimation();
  enhanceNavigation();
  initLazyLoading();
  addDynamicGreeting();
  enhanceKeyboardNav();
  initTooltips();
  logPerformance();
  
  console.log('🚀 Portfolio enhanced with professional interactive features!');
  console.log('💡 Keyboard shortcuts: Press "H" for Home, "T" to scroll to top');
});
