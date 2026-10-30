/**
 * RUCO (ruco.ar) — LÓGICA & EXPERIENCIA INTERACTIVA
 * Estilo Blanco Cremita & Soft Editorial
 * Clientes Reales (gmwmotos.com, almacenph.com, Vivero),
 * Drawer móvil, FAQ y Auditoría Exprés a WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. NAVEGACIÓN, HEADER SCROLL & DRAWER MÓVIL
  // ==========================================================================
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    highlightActiveNav();
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  function openDrawer() {
    mobileDrawer?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    menuToggle?.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle?.setAttribute('aria-expanded', 'false');
  }

  menuToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  mobileOverlay?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ==========================================================================
  // 2. SECCIÓN: ALGUNOS DE NUESTROS CLIENTES (INTERACTIVO CON ENLACES REALES)
  // ==========================================================================
  const clientTabs = document.querySelectorAll('.client-tab-btn');
  const clientPhoneImg = document.getElementById('clientPhoneImg');
  const clientPhoneTitle = document.getElementById('clientPhoneTitle');
  const clientPhoneCat = document.getElementById('clientPhoneCat');
  const clientPhoneUrl = document.getElementById('clientPhoneUrl');
  const clientPhoneSpeed = document.getElementById('clientPhoneSpeed');
  const clientPhoneDesc = document.getElementById('clientPhoneDesc');
  const clientPhoneLiveBtn = document.getElementById('clientPhoneLiveBtn');

  const clientsData = {
    gmwmotos: {
      name: 'MOTOS GMW',
      cat: 'Taller Mecánico, Repuestos & Accesorios Oficiales',
      url: 'gmwmotos.com',
      liveUrl: 'https://gmwmotos.com',
      btnLabel: 'Visitar gmwmotos.com',
      img: 'assets/projects/gmw-hero.jpg',
      speed: '0.4s · 99/100',
      desc: 'Taller mecánico de motos con turnos exprés por WhatsApp, catálogo de repuestos y sincronización total en Google Maps.'
    },
    almacenph: {
      name: 'Almacén Barrial PH',
      cat: 'Comestibles, Fiambrería & Proveeduría',
      url: 'almacenph.com',
      liveUrl: 'https://almacenph.com',
      btnLabel: 'Visitar almacenph.com',
      img: 'assets/projects/almacen-fachada.jpg',
      speed: '0.4s · 100/100',
      desc: 'Comercio barrial con horarios de atención actualizados, ofertas destacadas y recepción de pedidos directos para retirar.'
    },
    vivero: {
      name: 'Vivero Vía Verde',
      cat: 'Plantas de Interior, Exterior & Paisajismo',
      url: 'viveroviaverde.com.ar',
      liveUrl: 'https://wa.me/5491125739968?text=Hola%20Ruco!%20Quiero%20ver%20la%20maqueta%20del%20Vivero%20V%C3%ADa%20Verde',
      btnLabel: 'Ver Maqueta del Vivero',
      img: 'assets/projects/vivero-hero.jpg',
      speed: '0.5s · 99/100',
      desc: 'Catálogo botánico visual con fotos en alta definición y botón para encargar envíos a domicilio en la zona.'
    }
  };

  clientTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const clientKey = tab.getAttribute('data-client');
      if (!clientKey || !clientsData[clientKey]) return;

      clientTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const data = clientsData[clientKey];

      const phoneScreen = document.querySelector('.phone-screen-light');
      if (phoneScreen) {
        phoneScreen.style.opacity = '0.35';
        phoneScreen.style.transition = 'opacity 0.2s ease';
      }

      setTimeout(() => {
        if (clientPhoneUrl) clientPhoneUrl.textContent = data.url;
        if (clientPhoneTitle) clientPhoneTitle.textContent = data.name;
        if (clientPhoneCat) clientPhoneCat.textContent = data.cat;
        if (clientPhoneImg) clientPhoneImg.src = data.img;
        if (clientPhoneSpeed) clientPhoneSpeed.textContent = data.speed;
        if (clientPhoneDesc) clientPhoneDesc.textContent = data.desc;
        if (clientPhoneLiveBtn) {
          clientPhoneLiveBtn.href = data.liveUrl;
          const labelSpan = clientPhoneLiveBtn.querySelector('span');
          if (labelSpan) labelSpan.textContent = data.btnLabel;
        }

        if (phoneScreen) {
          phoneScreen.style.opacity = '1';
        }
      }, 150);
    });
  });

  // ==========================================================================
  // 3. GENERADOR DE AUDITORÍA EXPRÉS A WHATSAPP
  // ==========================================================================
  const auditForm = document.getElementById('auditForm');
  const auditBizName = document.getElementById('auditBizName');
  const auditRubro = document.getElementById('auditRubro');
  const auditStatus = document.getElementById('auditStatus');

  auditForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = auditBizName?.value.trim() || 'Mi Negocio';
    const rubro = auditRubro?.value.trim() || 'General';
    const status = auditStatus?.value || 'Solo Instagram';

    const message = `Hola Ruco! Quiero solicitar la auditoría visual gratuita para mi negocio:
- Nombre: ${name}
- Rubro: ${rubro}
- Situación actual: ${status}

¿Podemos coordinar para ver una propuesta preliminar?`;

    const waUrl = `https://wa.me/5491125739968?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // ==========================================================================
  // 4. FAQ INTERACTIVO (ACCORDION SUAVE)
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item-soft');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. ANIMACIONES REVEAL CON INTERSECTION OBSERVER
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
});
