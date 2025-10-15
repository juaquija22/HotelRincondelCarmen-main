/**
 * GESTIÓN DE DETALLES DE SUITES
 * 
 * Este archivo maneja el carrusel de imágenes de las páginas de detalle de cada suite,
 * incluyendo navegación entre imágenes, vista de pantalla completa y botones de reserva.
 */

// Variable global que almacena el índice actual de la imagen mostrada en el carrusel de suites
var suiteIndex = 1;

/**
 * Función para mostrar una diapositiva específica del carrusel de la suite
 * Actualiza tanto la imagen principal como las miniaturas
 * @param {number} num - Número de la diapositiva a mostrar (1-based)
 */
function showSuiteSlide(num) {
    var slides = document.querySelectorAll('.main-carousel .carousel-slide');
    var thumbs = document.querySelectorAll('.carousel-thumbnails .thumbnail');
    
    // Si no hay diapositivas, salir de la función
    if (slides.length === 0) return;
    
    // Desactivar todas las diapositivas e imágenes en miniatura
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove('active');
    }
    
    // Ajustar el índice para navegación circular
    if (num > slides.length) {
        // Si nos pasamos del final, volver al inicio
        suiteIndex = 1;
    } else if (num < 1) {
        // Si retrocedemos del inicio, ir al final
        suiteIndex = slides.length;
    } else {
        // Usar el número proporcionado
        suiteIndex = num;
    }
    
    // Activar la diapositiva y miniatura actuales (convertir de 1-based a 0-based)
    slides[suiteIndex - 1].classList.add('active');
    if (thumbs.length > 0) {
        thumbs[suiteIndex - 1].classList.add('active');
    }
}

/**
 * Función para cambiar la diapositiva en una dirección específica
 * @param {number} dir - Dirección del cambio (1 para siguiente, -1 para anterior)
 */
function changeSuiteSlide(dir) {
    suiteIndex = suiteIndex + dir;
    showSuiteSlide(suiteIndex);
}

/**
 * Función para ir directamente a una diapositiva específica
 * Se usa cuando el usuario hace clic en una miniatura
 * @param {number} num - Número de diapositiva a mostrar (1-based)
 */
function currentSuiteSlide(num) {
    suiteIndex = num;
    showSuiteSlide(suiteIndex);
}

/**
 * Función para inicializar el carrusel de la suite
 * Configura los event listeners en las miniaturas para navegación por clic
 */
function initSuiteCarousel() {
    var thumbs = document.querySelectorAll('.carousel-thumbnails .thumbnail');
    
    // Agregar event listener a cada miniatura
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].onclick = function() {
            // Obtener el índice de la miniatura clickeada
            var index = Array.prototype.indexOf.call(this.parentNode.children, this);
            // Mostrar la diapositiva correspondiente (convertir de 0-based a 1-based)
            currentSuiteSlide(index + 1);
        };
    }
}

/**
 * Función para inicializar el modo de pantalla completa
 * Permite al usuario ver las imágenes en una vista expandida
 */
function initFullscreen() {
    var btn = document.querySelector('.fullscreen-btn');
    if (btn) {
        btn.onclick = function() {
            // Obtener la diapositiva activa actualmente
            var active = document.querySelector('.carousel-slide.active');
            if (!active) return;
            
            // Obtener la imagen dentro de la diapositiva activa
            var img = active.querySelector('img');
            if (!img) return;
            
            // Crear overlay de pantalla completa
            var overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer';
            
            // Crear nueva imagen para mostrar en pantalla completa
            var newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain';
            
            // Agregar imagen al overlay y overlay al documento
            overlay.appendChild(newImg);
            document.body.appendChild(overlay);
            
            // Permitir cerrar la vista de pantalla completa haciendo clic en cualquier lugar
            overlay.onclick = function() {
                document.body.removeChild(overlay);
            };
        };
    }
}

/**
 * Función para inicializar el botón de verificar disponibilidad
 * Redirige a la página de reservas cuando el usuario hace clic
 */
function initBookingButton() {
    var btn = document.querySelector('.check-availability-btn');
    if (btn) {
        btn.onclick = function() {
            window.location.href = 'reservas.html';
        };
    }
}

// Exponer funciones globalmente para uso desde el HTML
window.changeSuiteSlide = changeSuiteSlide;
window.currentSuiteSlide = currentSuiteSlide;

/**
 * Inicializar todas las funcionalidades cuando el DOM esté completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    initSuiteCarousel();
    showSuiteSlide(1);
    initFullscreen();
    initBookingButton();
});
