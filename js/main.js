/**
 * RUCO (ruco.ar / @rucoweb.ar) — Lógica Interactiva
 * Desarrollado en JavaScript nativo (sin dependencias pesadas)
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroVideo();
    initCarousel();
    initSimulator();
    initFAQ();
    initSmartStickyBar();
    initSmoothScroll();
});

/**
 * Autoplay silencioso del Reel en celulares
 */
function initHeroVideo() {
    const video = document.getElementById('heroReelVideo');
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.body.addEventListener('touchstart', () => {
                video.play();
            }, { once: true });
        });
    }
}

/**
 * Carrusel Interactivo de los 4 Pasos (Slides oficiales de carrousel1)
 */
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir al paso ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((d, i) => {
            d.classList.toggle('active', i === currentIndex);
        });

        prevBtn.style.opacity = currentIndex === 0 ? '0.35' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.35' : '1';
        nextBtn.style.pointerEvents = currentIndex === totalSlides - 1 ? 'none' : 'auto';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
    });
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1);
    });

    // Soporte táctil inteligente (Touch Swipe discriminando scroll vertical)
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = startX;
        currentY = startY;
        isSwiping = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isSwiping || !e.touches || e.touches.length === 0) return;
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;
        const diffX = startX - currentX;
        const diffY = startY - currentY;

        // Si el usuario se movió más en vertical que en horizontal, estaba haciendo scroll: NO saltar slides
        if (Math.abs(diffY) > Math.abs(diffX)) {
            return;
        }

        // Gesto horizontal intencional
        if (Math.abs(diffX) > 45) {
            if (diffX > 0) {
                if (currentIndex < totalSlides - 1) {
                    goToSlide(currentIndex + 1);
                }
            } else {
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                }
            }
        }
    }, { passive: true });

    // Estado inicial en la foto 1 fija
    goToSlide(0);
}

/**
 * Simulador Interactivo de Rubros
 */
function initSimulator() {
    const tabs = document.querySelectorAll('.sim-tab-btn');
    const titleEl = document.getElementById('simTitle');
    const descEl = document.getElementById('simDesc');
    const badgesWrap = document.getElementById('simBadges');
    const ctaBtn = document.getElementById('simCtaBtn');

    if (!tabs.length || !titleEl || !descEl || !badgesWrap || !ctaBtn) return;

    const dataByRubro = {
        taller: {
            title: "Taller Mecánico, Repuestos & Accesorios",
            desc: "Como en el caso de GMW Motos: cuando un cliente busca repuestos de urgencia en Google Maps, encuentra tu web al instante con catálogo por marcas, ubicación con pin y botón directo a tu WhatsApp.",
            badges: ["📍 Google Maps 4.9 Destacado", "⚡ Catálogo Rápido Multimarca", "📲 Contacto WhatsApp Inmediato", "🛡️ Filtro de Consultas Frecuentes"],
            waMsg: "Hola Ruco! Tengo un taller / venta de repuestos y vi el caso de GMW. Quiero pedir mi maqueta sin cargo."
        },
        gastro: {
            title: "Gastronomía, Hamburgueserías, Cervecerías & Cafés",
            desc: "Menú interactivo con fotos atractivas, categorización clara y carrito que envía el pedido listo y cotizado directamente al WhatsApp del local. 0% comisiones a apps de delivery.",
            badges: ["🍔 Menú Digital sin App", "🛒 Carrito con Envío a WhatsApp", "🕒 Horarios de Cocina Dinámicos", "💳 0% Comisiones"],
            waMsg: "Hola Ruco! Tengo un local gastronómico y quiero un menú digital con carrito a WhatsApp sin comisiones."
        },
        vivero: {
            title: "Viveros, Jardinería & Tiendas Deco",
            desc: "Galería estética y ordenada de especies de plantas, macetas e insumos, permitiendo que el cliente consulte stock y precios por WhatsApp con una sola captura o clic.",
            badges: ["🌿 Catálogo Botánico Visual", "📸 Galería de Especies", "🚚 Canal de Envíos a Domicilio", "⭐ SEO Local de Zona"],
            waMsg: "Hola Ruco! Tengo un vivero / tienda de plantas y quiero una web estética para mostrar mi catálogo y recibir pedidos."
        },
        almacen: {
            title: "Almacenes, Fiambrerías & Comercios de Barrio",
            desc: "Tu negocio de confianza ahora con presencia digital: código QR en el mostrador para los vecinos, pizarra de promociones del día y pedidos para retiro o delivery.",
            badges: ["🏷️ Pizarra de Ofertas Semanales", "📱 QR Listo para el Mostrador", "🛵 Pedidos Vecinales por Chat", "📍 Fácil de Encontrar en el Barrio"],
            waMsg: "Hola Ruco! Tengo un comercio barrial y quiero una web simple para pedidos directos de mis vecinos por WhatsApp."
        },
        servicios: {
            title: "Oficios, Profesionales & Servicios a Domicilio",
            desc: "Tu tarjeta de presentación digital premium: mostrá tus trabajos realizados, testimonios de clientes satisfechos y canalizá presupuestos serios sin perder tiempo.",
            badges: ["💼 Portafolio de Trabajos", "⭐ Testimonios & Calificaciones", "📝 Formulario Exprés a WhatsApp", "🚀 Carga Ultrarrápida en 4G"],
            waMsg: "Hola Ruco! Ofrezco servicios profesionales y quiero una web sobria para cerrar más presupuestos."
        }
    };

    const waPhone = "5491138206873";

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const rubro = tab.getAttribute('data-rubro');
            const info = dataByRubro[rubro];
            if (!info) return;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            titleEl.style.opacity = '0';
            descEl.style.opacity = '0';
            badgesWrap.style.opacity = '0';

            setTimeout(() => {
                titleEl.textContent = info.title;
                descEl.textContent = info.desc;
                
                badgesWrap.innerHTML = '';
                info.badges.forEach(b => {
                    const span = document.createElement('span');
                    span.className = 'sim-feature-badge';
                    span.textContent = b;
                    badgesWrap.appendChild(span);
                });

                const encodedMsg = encodeURIComponent(info.waMsg);
                ctaBtn.href = `https://wa.me/${waPhone}?text=${encodedMsg}`;

                titleEl.style.opacity = '1';
                descEl.style.opacity = '1';
                badgesWrap.style.opacity = '1';
            }, 180);
        });
    });

    [titleEl, descEl, badgesWrap].forEach(el => {
        el.style.transition = 'opacity 0.2s ease';
    });
}

/**
 * Acordeón de Preguntas Frecuentes
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('open');
            });
            item.classList.toggle('open', !isOpen);
        });
    });
}

/**
 * Barra Flotante Inteligente: Aparece SÓLO cuando el botón del Hero sale de la pantalla
 * Evita la duplicación de botones visibles al mismo tiempo.
 */
function initSmartStickyBar() {
    const stickyBar = document.querySelector('.mobile-sticky-bar');
    const heroBtn = document.querySelector('.btn-hero-primary');
    if (!stickyBar || !heroBtn) return;

    function checkVisibility() {
        const rect = heroBtn.getBoundingClientRect();
        // Si el botón del Hero está por debajo del top de la ventana (visible o accesible arriba), ocultamos la barra
        if (rect.bottom > 0) {
            stickyBar.classList.remove('visible');
        } else {
            // El botón del Hero ya fue scrolleado y quedó arriba fuera de vista
            stickyBar.classList.add('visible');
        }
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyBar.classList.remove('visible');
                } else {
                    const rect = heroBtn.getBoundingClientRect();
                    if (rect.bottom <= 0) {
                        stickyBar.classList.add('visible');
                    } else {
                        stickyBar.classList.remove('visible');
                    }
                }
            });
        }, { threshold: 0.05 });

        observer.observe(heroBtn);
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();
}

/**
 * Desplazamiento Suave
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
