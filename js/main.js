/**
 * RUCO (ruco.ar / @rucoweb.ar) — Lógica Interactiva
 * Desarrollado con JavaScript nativo sin dependencias
 */

document.addEventListener('DOMContentLoaded', () => {
    initSimulator();
    initFAQ();
    initSmoothScroll();
});

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
            waMsg: "Hola Ruco! Tengo un negocio del rubro Taller y Repuestos de Motos/Autos. Vi el caso de GMW en el Reel y quiero pedir una maqueta sin cargo."
        },
        gastro: {
            title: "Gastronomía, Hamburgueserías, Cervecerías & Cafés",
            desc: "Menú interactivo con fotos atractivas, categorización clara y carrito que envía el pedido listo y cotizado directamente al WhatsApp del local. 0% comisiones a apps de delivery.",
            badges: ["🍔 Menú Digital sin App", "🛒 Carrito con Envío a WhatsApp", "🕒 Horarios de Cocina Dinámicos", "💳 0% Comisiones"],
            waMsg: "Hola Ruco! Tengo un local gastronómico y me interesa tener un menú web propio con carrito para WhatsApp sin pagar comisiones."
        },
        vivero: {
            title: "Viveros, Jardinería & Tiendas Deco",
            desc: "Galería estética y ordenada de especies de plantas, macetas e insumos, permitiendo que el cliente consulte stock y precios por WhatsApp con una sola captura o clic.",
            badges: ["🌿 Catálogo Botánico Visual", "📸 Galería de Especies", "🚚 Canal de Envíos a Domicilio", "⭐ SEO Local de Zona"],
            waMsg: "Hola Ruco! Tengo un vivero / tienda de plantas y quiero una web estética y visual para mostrar catálogo y recibir consultas directas."
        },
        almacen: {
            title: "Almacenes, Fiambrerías & Comercios de Barrio",
            desc: "Tu negocio de confianza ahora con presencia digital: código QR en el mostrador para los vecinos, pizarra de promociones del día y pedidos para retiro o delivery.",
            badges: ["🏷️ Pizarra de Ofertas Semanales", "📱 QR Listo para el Mostrador", "🛵 Pedidos Vecinales por Chat", "📍 Fácil de Encontrar en el Barrio"],
            waMsg: "Hola Ruco! Tengo un almacén / comercio barrial y quiero una web simple y rápida para que los vecinos me hagan pedidos directo al WhatsApp."
        },
        servicios: {
            title: "Oficios, Profesionales & Servicios a Domicilio",
            desc: "Tu tarjeta de presentación digital premium: mostrá tus trabajos realizados, testimonios de clientes satisfechos y canalizá presupuestos serios sin perder tiempo.",
            badges: ["💼 Portafolio de Trabajos", "⭐ Testimonios & Calificaciones", "📝 Formulario Exprés a WhatsApp", "🚀 Carga Ultrarrápida en 4G"],
            waMsg: "Hola Ruco! Ofrezco servicios profesionales y quiero una web sobria y profesional que me ayude a cerrar más presupuestos."
        }
    };

    const waPhone = "5491126731952";

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const rubro = tab.getAttribute('data-rubro');
            const info = dataByRubro[rubro];
            if (!info) return;

            // Actualizar botones activos
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Actualizar contenido con fade sutil
            titleEl.style.opacity = '0';
            descEl.style.opacity = '0';
            badgesWrap.style.opacity = '0';

            setTimeout(() => {
                titleEl.textContent = info.title;
                descEl.textContent = info.desc;
                
                // Limpiar y cargar nuevos badges
                badgesWrap.innerHTML = '';
                info.badges.forEach(b => {
                    const span = document.createElement('span');
                    span.className = 'sim-feature-badge';
                    span.textContent = b;
                    badgesWrap.appendChild(span);
                });

                // Actualizar botón de WhatsApp
                const encodedMsg = encodeURIComponent(info.waMsg);
                ctaBtn.href = `https://wa.me/${waPhone}?text=${encodedMsg}`;
                ctaBtn.innerHTML = `<span>Pedir Maqueta de este Rubro</span> <span>→</span>`;

                titleEl.style.opacity = '1';
                descEl.style.opacity = '1';
                badgesWrap.style.opacity = '1';
            }, 180);
        });
    });

    // Iniciar transiciones suaves
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
            
            // Cerrar otros
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('open');
            });

            // Toggle actual
            item.classList.toggle('open', !isOpen);
        });
    });
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
