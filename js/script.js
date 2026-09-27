/* ============================================================
   NOVA SHOP — script.js
   Features:
     1. Navbar scroll background transition
     2. Product category filtering (data-category attribute)
     3. "Add to Cart" counter with bounce animation
     4. Scroll-reveal via IntersectionObserver
     5. Newsletter form validation (email regex)
     6. Smooth scroll for anchor nav links
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. NAVBAR SCROLL TRANSITION ───────────────────────── */
  const nav = document.getElementById('mainNav');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load


  /* ── 2. PRODUCT CATEGORY FILTER ─────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Toggle active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selected = this.dataset.filter.toLowerCase();

      productItems.forEach(item => {
        const category = item.dataset.category.toLowerCase();

        if (selected === 'all' || category === selected) {
          // Show with a small fade-in
          item.classList.remove('hidden');
          // Re-trigger reveal if needed
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 20);
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* ── 3. ADD TO CART COUNTER ──────────────────────────────── */
  let cartCount = 0;
  const cartCountEl = document.getElementById('cartCount');

  function updateCart() {
    cartCount++;
    cartCountEl.textContent = cartCount;

    // Bounce animation: remove, force reflow, re-add
    cartCountEl.classList.remove('cart-bounce');
    void cartCountEl.offsetWidth; // reflow
    cartCountEl.classList.add('cart-bounce');
  }

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      updateCart();

      // Button feedback
      const original = this.textContent;
      this.textContent = '✓ Added!';
      this.style.background = '#00b894';
      this.disabled = true;

      setTimeout(() => {
        this.textContent = original;
        this.style.background = '';
        this.disabled = false;
      }, 1400);
    });
  });


  /* ── 4. SCROLL-REVEAL (IntersectionObserver) ─────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal so it doesn't re-hide
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 5. NEWSLETTER FORM VALIDATION ──────────────────────── */
  const newsletterForm  = document.getElementById('newsletterForm');
  const emailInput      = document.getElementById('newsletterEmail');
  const formMsg         = document.getElementById('formMsg');

  // Basic RFC-5322 simplified email regex
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const val = emailInput.value.trim();

      if (!val) {
        showFormMsg('Please enter your email address.', false);
        emailInput.classList.add('is-invalid');
        return;
      }

      if (!EMAIL_REGEX.test(val)) {
        showFormMsg('Please enter a valid email address.', false);
        emailInput.classList.add('is-invalid');
        return;
      }

      // Success
      emailInput.classList.remove('is-invalid');
      showFormMsg('🎉 You\'re subscribed! Check your inbox for a welcome gift.', true);
      emailInput.value = '';
    });

    emailInput.addEventListener('input', function () {
      if (emailInput.classList.contains('is-invalid')) {
        emailInput.classList.remove('is-invalid');
        formMsg.textContent = '';
      }
    });
  }

  function showFormMsg(msg, isSuccess) {
    formMsg.textContent = msg;
    formMsg.style.color = isSuccess ? '#00cec9' : '#fd79a8';
  }


  /* ── 6. SMOOTH SCROLL FOR INTERNAL LINKS ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      // Close mobile nav if open
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        toggler.click();
      }

      const offset = nav.offsetHeight + 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── 7. ANIMATED STAT COUNTERS ───────────────────────────── */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const step     = 16; // ~60fps
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }
    }, step);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

})();
