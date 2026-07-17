/* ============================================================
   MAM PROJECT UKUNDA — JavaScript
   Sections:
   1. Navbar — mobile hamburger toggle
   2. Navbar — hide/show on scroll
   3. Hero — smooth scroll for anchor links
   4. Scroll Reveal — intersection observer
   5. Impact Counters — animated count-up
   6. Programs & Help Cards — tilt on hover (desktop)
   7. Modal — Educación inclusiva en Kenia
   8. Init
   ============================================================ */


/* ─────────────────────────────────────────
   1. NAVBAR — MOBILE HAMBURGER TOGGLE
───────────────────────────────────────── */
function initHamburger() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);

    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });

  // Cerrar menú al hacer clic en cualquier enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      const bars = hamburger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    });
  });
}


/* ─────────────────────────────────────────
   2. NAVBAR — HIDE / SHOW ON SCROLL
───────────────────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;
  nav.style.transition = 'transform 0.35s ease, box-shadow 0.3s ease';

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > lastScrollY && current > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    nav.style.boxShadow = current > 10
      ? '0 4px 24px rgba(0,0,0,0.12)'
      : '0 2px 20px rgba(0,0,0,0.08)';

    lastScrollY = current;
  }, { passive: true });
}


/* ─────────────────────────────────────────
   3. HERO — SMOOTH SCROLL FOR ANCHOR LINKS
───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector('nav')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ─────────────────────────────────────────
   4. SCROLL REVEAL — INTERSECTION OBSERVER
   Añade class="reveal" a los elementos que
   quieras animar al entrar en el viewport.
───────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────
   5. IMPACT COUNTERS — ANIMATED COUNT-UP
   Elementos con data-count="N" dentro de
   .impact-item .num se animan al hacer scroll.
───────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  const isNumeric = !isNaN(parseFloat(target)) && isFinite(target);
  if (!isNumeric) return; // saltar "∞", "360°", etc.

  const end       = parseFloat(target);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = Math.round(end * eased);

    el.textContent = value + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const section = document.querySelector('.impact');
  if (!section) return;

  const nums = section.querySelectorAll('.num[data-count]');
  if (!nums.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          nums.forEach(el => animateCounter(el, el.dataset.count));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
}


/* ─────────────────────────────────────────
   6. PROGRAM & HELP CARDS — SUBTLE TILT
   Solo en dispositivos con puntero fino (desktop).
───────────────────────────────────────── */
function initCardTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.prog-card, .help-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect    = card.getBoundingClientRect();
     
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ─────────────────────────────────────────
   7. MODAL — Educación inclusiva en Kenia
   Abre / cierra el modal de "Saber más" de
   la card de Niñas y niños con diversidad funcional.
───────────────────────────────────────── */
function abrirModal() {
  const modal = document.getElementById('modal-educacion');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // bloquear scroll del fondo
  // Mover foco al título para accesibilidad
  const titulo = document.getElementById('modal-titulo');
  if (titulo) titulo.focus();
}

function cerrarModal() {
  const modal = document.getElementById('modal-educacion');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = ''; // restaurar scroll
}

function initModal() {
  const modal = document.getElementById('modal-educacion');
  if (!modal) return;

  // Cerrar al hacer clic en el fondo (fuera del contenido)
  modal.addEventListener('click', function(e) {
    if (e.target === this) cerrarModal();
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      cerrarModal();
    }
  });
}


/* ─────────────────────────────────────────
   8. INIT — lanzar todo al cargar el DOM
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavScroll();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initCardTilt();
  initModal();
});

/* ─────────────────────────────────────────
   9. MODAL — Personas puente
───────────────────────────────────────── */
function abrirModalPuente() {
  const modal = document.getElementById('modal-puente');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  const titulo = document.getElementById('modal-puente-titulo');
  if (titulo) titulo.focus();
}

function cerrarModalPuente() {
  const modal = document.getElementById('modal-puente');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function switchTab(tabName) {
  // Panels
  document.querySelectorAll('.puente-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('tab-' + tabName);
  if (panel) panel.classList.add('active');

  // Tabs
  document.querySelectorAll('.puente-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const activeTab = document.querySelector('.puente-tab[data-tab="' + tabName + '"]');
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }
}

function initModalPuente() {
  const modal = document.getElementById('modal-puente');
  if (!modal) return;

  modal.addEventListener('click', function(e) {
    if (e.target === this) cerrarModalPuente();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      cerrarModalPuente();
    }
  });
}

// Re-init on DOMContentLoaded (appended after original script)
document.addEventListener('DOMContentLoaded', initModalPuente);


/* ─────────────────────────────────────────
   10. MODAL — Construcción del colegio
───────────────────────────────────────── */
function abrirModalColegio() {
  const modal = document.getElementById('modal-colegio');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  const titulo = document.getElementById('modal-colegio-titulo');
  if (titulo) titulo.focus();
}

function cerrarModalColegio() {
  const modal = document.getElementById('modal-colegio');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-colegio');
  if (!modal) return;
  modal.addEventListener('click', function(e) {
    if (e.target === this) cerrarModalColegio();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') cerrarModalColegio();
  });
});

/* ─────────────────────────────────────────
   11. MODAL — Política de privacidad
───────────────────────────────────────── */
function abrirModalPrivacidad() {
  const modal = document.getElementById('modal-privacidad');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  const titulo = document.getElementById('modal-privacidad-titulo');
  if (titulo) titulo.focus();
}

function cerrarModalPrivacidad() {
  const modal = document.getElementById('modal-privacidad');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────
   12. MODAL — Política de cookies
───────────────────────────────────────── */
function abrirModalCookies() {
  const modal = document.getElementById('modal-cookies');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  const titulo = document.getElementById('modal-cookies-titulo');
  if (titulo) titulo.focus();
}

function cerrarModalCookies() {
  const modal = document.getElementById('modal-cookies');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  ['modal-privacidad', 'modal-cookies'].forEach(id => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    ['modal-privacidad', 'modal-cookies'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
});
/* ─────────────────────────────────────────
   13. UKUNDA TABS
───────────────────────────────────────── */
function switchUkundaTab(tabName) {
  document.querySelectorAll('.ukunda-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('ukunda-tab-' + tabName);
  if (panel) panel.classList.add('active');

  document.querySelectorAll('.ukunda-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const activeTab = document.querySelector('.ukunda-tab[data-tab="' + tabName + '"]');
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }
}

/* ─────────────────────────────────────────
   14. MODAL — Madres
───────────────────────────────────────── */
function abrirModalMadres() {
  const modal = document.getElementById('modal-madres');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  const titulo = document.getElementById('modal-madres-titulo');
  if (titulo) titulo.focus();
}

function cerrarModalMadres() {
  const modal = document.getElementById('modal-madres');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function switchMadresTab(tabName) {
  document.querySelectorAll('#modal-madres .puente-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('madres-tab-' + tabName);
  if (panel) panel.classList.add('active');

  document.querySelectorAll('#modal-madres .puente-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const activeTab = document.querySelector('#modal-madres .puente-tab[data-tab="' + tabName + '"]');
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-madres');
  if (!modal) return;
  modal.addEventListener('click', function(e) {
    if (e.target === this) cerrarModalMadres();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') cerrarModalMadres();
  });
});

/* ─────────────────────────────────────────
   15. MODAL — Transparencia
───────────────────────────────────────── */
function abrirModalTransparencia() {
  const modal = document.getElementById('modal-transparencia');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  // Show content after brief delay (simulating load)
  const loading = document.getElementById('transparencia-loading');
  const content = document.getElementById('transparencia-content');
  if (loading && content) {
    loading.style.display = 'flex';
    content.style.display = 'none';
    setTimeout(() => {
      loading.style.display = 'none';
      content.style.display = 'block';
    }, 600);
  }

  const titulo = document.getElementById('modal-transparencia-titulo');
  if (titulo) titulo.focus();
}

function cerrarModalTransparencia() {
  const modal = document.getElementById('modal-transparencia');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-transparencia');
  if (!modal) return;
  modal.addEventListener('click', function(e) {
    if (e.target === this) cerrarModalTransparencia();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') cerrarModalTransparencia();
  });
});

/* ─────────────────────────────────────────
   16. MODAL — Ukunda · Kenia
───────────────────────────────────────── */
function abrirModalUkunda() {
  const modal = document.getElementById('modal-ukunda');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  const titulo = document.getElementById('modal-ukunda-titulo');
  if (titulo) titulo.focus();
}

function cerrarModalUkunda() {
  const modal = document.getElementById('modal-ukunda');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function switchUkundaTab(tabName) {
  document.querySelectorAll('#modal-ukunda .puente-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('ukunda-tab-' + tabName);
  if (panel) panel.classList.add('active');

  document.querySelectorAll('#modal-ukunda .puente-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const activeTab = document.querySelector('#modal-ukunda .puente-tab[data-tab="' + tabName + '"]');
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-ukunda');
  if (!modal) return;
  modal.addEventListener('click', function(e) {
    if (e.target === this) cerrarModalUkunda();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') cerrarModalUkunda();
  });
});

/* ─────────────────────────────────────────
   17. COOKIE CONSENT BANNER
───────────────────────────────────────── */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // If already decided, hide banner
  const consent = localStorage.getItem('mam_cookie_consent');
  if (consent) {
    banner.style.display = 'none';
    return;
  }

  // Show with slight delay for better UX
  setTimeout(() => {
    banner.classList.add('cookie-banner--visible');
  }, 800);
}

function aceptarCookies() {
  localStorage.setItem('mam_cookie_consent', 'accepted');
  hideCookieBanner();
}

function rechazarCookies() {
  localStorage.setItem('mam_cookie_consent', 'rejected');
  hideCookieBanner();
}

function hideCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.classList.add('cookie-banner--hiding');
  setTimeout(() => {
    banner.style.display = 'none';
  }, 400);
}

document.addEventListener('DOMContentLoaded', initCookieBanner);