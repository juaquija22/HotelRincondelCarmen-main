/**
 * FUNCIONES ESPECÍFICAS DE LA PÁGINA PRINCIPAL (INDEX)
 * 
 * Este archivo gestiona las funcionalidades exclusivas de la página de inicio,
 * incluyendo el carrusel de imágenes hero, widget de reservas y navegación a suites.
 */

// Variable global que almacena el índice actual de la diapositiva del carrusel principal
var heroIndex = 0;

/**
 * Función para mostrar una diapositiva específica del carrusel principal
 * Incluye animaciones de transición suaves para el contenido y las imágenes
 * @param {number} index - Índice de la diapositiva a mostrar (0-based)
 */
function showSlide(index) {
    var slides = document.querySelectorAll('.carousel-slide');
    var dots = document.querySelectorAll('.dot');
    var content = document.querySelector('.hero-content');
    
    // Si no hay diapositivas, salir de la función
    if (slides.length === 0) return;
    
    // Animación de salida del texto: reducir opacidad y escala
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translate(-50%, -50%) scale(0.9)';
    }
    
    // Activar la nueva imagen y su indicador (dot)
    slides[index].classList.add('active');
    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    dots[index].classList.add('active');
    
    // Después de la transición, ocultar otras imágenes y mostrar el contenido
    setTimeout(function() {
        // Desactivar todas las diapositivas excepto la actual
        for (var i = 0; i < slides.length; i++) {
            if (i !== index) {
                slides[i].classList.remove('active');
            }
        }
        
        // Animación de entrada del texto: restaurar opacidad y escala
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }, 500);
}

/**
 * Función para cambiar a la siguiente o anterior diapositiva
 * Maneja la navegación circular del carrusel (vuelve al inicio/fin)
 * @param {number} dir - Dirección del cambio (1 para siguiente, -1 para anterior)
 */
function changeSlide(dir) {
    var slides = document.querySelectorAll('.carousel-slide');
    heroIndex = heroIndex + dir;
    
    // Navegación circular: si llegamos al final, volver al inicio
    if (heroIndex >= slides.length) {
        heroIndex = 0;
    } else if (heroIndex < 0) {
        // Si estamos al inicio y vamos hacia atrás, ir al final
        heroIndex = slides.length - 1;
    }
    
    showSlide(heroIndex);
}

/**
 * Función para ir directamente a una diapositiva específica
 * Se usa con los indicadores (dots) del carrusel
 * @param {number} num - Número de diapositiva (1-based, se convierte a 0-based internamente)
 */
function currentSlide(num) {
    heroIndex = num - 1;
    showSlide(heroIndex);
}

/**
 * Función para inicializar el carrusel principal de la página de inicio
 * Configura el carrusel y muestra la primera diapositiva
 */
function initHeroCarousel() {
    var slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        showSlide(0);
    }
}

/**
 * Función para inicializar el botón "Ver Todas las Suites"
 * Configura la redirección a la página de todas las suites
 */
function initViewAllSuitesButton() {
    var btn = document.getElementById('viewAllSuitesBtn');
    if (btn) {
        btn.onclick = function() {
            window.location.href = 'html/suites.html';
        };
    }
}

/**
 * Función para inicializar el widget de reserva rápida
 * Maneja el selector de número de huéspedes y el botón de verificar disponibilidad
 */
function initBookingWidget() {
    var count = document.querySelector('.guest-count');
    var up = document.querySelector('.guest-controls .fa-chevron-up');
    var down = document.querySelector('.guest-controls .fa-chevron-down');
    var btn = document.querySelector('.check-availability-btn');
    var guests = 1;

    // Configurar botones de incrementar/decrementar huéspedes
    if (up && down && count) {
        // Botón para incrementar el número de huéspedes
        up.onclick = function() {
            if (guests < 10) {
                guests++;
                count.textContent = guests;
            }
        };

        // Botón para decrementar el número de huéspedes
        down.onclick = function() {
            if (guests > 1) {
                guests--;
                count.textContent = guests;
            }
        };
    }

    // Configurar botón "Verificar Disponibilidad"
    if (btn) {
        btn.onclick = function() {
            window.location.href = 'html/reservas.html';
        };
    }
}

// Exponer funciones globalmente para uso desde el HTML
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;

/**
 * Inicializar todas las funcionalidades cuando el DOM esté completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    initHeroCarousel();
    initViewAllSuitesButton();
    initBookingWidget();
});

