/**
 * FUNCIONES PRINCIPALES DEL SITIO WEB
 * 
 * Este archivo contiene las funciones principales para la navegación móvil,
 * efectos de scroll y otras funcionalidades generales del sitio web.
 */

/**
 * Función para inicializar la navegación móvil (menú hamburguesa)
 * Maneja la apertura y cierre del menú en dispositivos móviles
 */
function initMobileNav() {
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Configurar el evento de clic en el botón hamburguesa
        hamburger.onclick = function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };

        // Cerrar el menú cuando se hace clic en cualquier enlace (excepto los que abren modales)
        var links = document.querySelectorAll('.nav-link');
        for (var i = 0; i < links.length; i++) {
            links[i].onclick = function(e) {
                // Solo cerrar el menú si no es un enlace que abre un modal
                if (!this.id || (this.id !== 'loginBtn' && this.id !== 'adminBtn' && this.id !== 'logoutBtn')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            };
        }
    }
}

/**
 * Función para inicializar los efectos de scroll
 * Maneja el cambio de apariencia de la barra de navegación y animaciones de entrada
 */
function initScrollEffects() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Efecto de transparencia en la barra de navegación al hacer scroll
    window.onscroll = function() {
        if (window.scrollY > 100) {
            // Aplicar fondo semi-transparente con blur cuando se hace scroll
            navbar.style.background = 'rgba(28, 28, 28, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            // Restaurar fondo sólido cuando se está en la parte superior
            navbar.style.background = 'rgba(28, 28, 28)';
            navbar.style.backdropFilter = 'none';
        }
    };

    // Configurar observador de intersección para animaciones de entrada
    var observer = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('fade-in');
            }
        }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observar elementos que deben tener animación de entrada
    var elements = document.querySelectorAll('.room-card, .area-card, .service-item, .contact-card');
    for (var i = 0; i < elements.length; i++) {
        observer.observe(elements[i]);
    }
}

/**
 * Función para inicializar el cierre de modales con la tecla Escape
 * Permite cerrar cualquier modal abierto presionando la tecla Escape
 */
function initModalEscape() {
    document.onkeydown = function(e) {
        if (e.key === 'Escape') {
            var modal = document.querySelector('.modal[style*="block"]');
            if (modal) modal.style.display = 'none';
        }
    };
}

/**
 * Función para agregar estilos de animación CSS dinámicamente
 * Crea las animaciones necesarias para las notificaciones del sistema
 */
function addAnimationStyles() {
    // Evitar duplicar estilos si ya existen
    if (document.getElementById('notification-styles')) return;
    
    var style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = '@keyframes slideInRight {from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOutRight{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}';
    document.head.appendChild(style);
}

/**
 * Inicializar todas las funciones principales cuando el DOM esté completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initScrollEffects();
    initModalEscape();
    addAnimationStyles();
});
