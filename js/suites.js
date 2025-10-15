/**
 * GESTIÓN DE SUITES DEL HOTEL
 * 
 * Este archivo contiene la información detallada de todas las suites del hotel
 * y las funciones para visualizar y reservar cada una de ellas.
 */

/**
 * Objeto que contiene la información detallada de todas las suites del hotel
 * Cada suite incluye nombre, imagen, descripción, precio y características
 */
var suiteDetails = {
    'iconica': {
        name: 'Suite Icónica con Terraza Privada y Vista a la Caldera',
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-35-600x400.jpg',
        description: 'Para los huéspedes que anhelan la icónica experiencia de Santorini, sin tener que comprometer el lujo y la comodidad.',
        price: '$450/noche',
        features: ['Cama King Size', 'Máximo 2 personas', 'WiFi Gratuito', 'Minibar', 'Jacuzzi Privado', 'Vista a la Caldera']
    },
    'mitica': {
        name: 'Suite Mítica con Terraza Privada y Vista de 180° a la Caldera',
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-40-600x500.jpg',
        description: 'Para los huéspedes que buscan una versión moderna de la experiencia clásica de Santorini, nuestras Mythic Suites cuentan con interiores modernos y espaciosos y vistas que pueden robarse cualquier espectáculo.',
        price: '$520/noche',
        features: ['Cama King Size', 'Máximo 2 personas', 'WiFi Gratuito', 'Minibar', 'Terraza Privada', 'Vista 180° a la Caldera']
    },
    'epica': {
        name: 'Suite Épica con Terraza Privada y Vista de 180° a la Caldera',
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/Homepage-2-600x500.jpg',
        description: 'Para los huéspedes que buscan un escape privado, nuestras Epic Suites actuarán como un refugio moderno y contemporáneo donde podrán recargar energías y reconectarse.',
        price: '$580/noche',
        features: ['Cama King Size', 'Máximo 2 personas', 'WiFi Gratuito', 'Minibar', 'Terraza Privada', 'Vista 180° a la Caldera']
    },
    'deluxe': {
        name: 'Suite Majestic con Terraza Privada y Vista de 180° a la Caldera',
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-24-600x500.jpg',
        description: 'Para los huéspedes que buscan un escape privado, nuestra Majestic Suite actuará como su refugio contemporáneo moderno donde podrán recargar energías y reconectarse.',
        price: '$650/noche',
        features: ['Cama King Size', 'Máximo 2 personas', 'WiFi Gratuito', 'Minibar', 'Terraza Privada', 'Vista 180° a la Caldera']
    },
    'premium': {
        name: 'Suite Element con Terraza Privada Estilo Cueva con Vista de 180° a la Caldera',
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-26-600x500.jpg',
        description: 'La Suite Element es nuestra suite más exclusiva, inspirada en las formaciones rocosas orgánicas que dan fama a Santorini. Originalmente una de las famosas cuevas de Oia, esta villa está diseñada para huéspedes que buscan un refugio de ensueño.',
        price: '$750/noche',
        features: ['Cama King Size', 'Máximo 2 personas', 'WiFi Gratuito', 'Minibar', 'Terraza Estilo Cueva', 'Vista 180° a la Caldera']
    },
    'master': {
        name: 'La Suite Santa con Terraza Privada y Vista de 180° a la Caldera',
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2019/12/HighRes-6-min-1-scaled-e1575923182587-600x500.jpg',
        description: 'Para los huéspedes que anhelan la icónica experiencia de Santorini, sin tener que comprometer el lujo y la comodidad.',
        price: '$820/noche',
        features: ['Cama King Size', 'Máximo 2 personas', 'WiFi Gratuito', 'Minibar', 'Terraza Privada', 'Vista 180° a la Caldera']
    },
    'royal': {
        name: 'Villa One Saint con Terraza Privada y Vistas a la Caldera',
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2022/06/The-One-Private-Villa-Exterior-Pool-scaled-600x500.jpg',
        description: 'La villa "ONE" de SAINT es nuestra villa más exclusiva y ofrece impresionantes vistas de la Caldera de Santorini desde dos de sus áreas de estar al aire libre.',
        price: '$1200/noche',
        features: ['Cama King Size', 'Máximo 4 personas', 'WiFi Gratuito', 'Minibar', 'Piscina Privada', 'Vista 360° a la Caldera', 'Servicio de Mayordomo']
    }
};

/**
 * Función para ver los detalles de una suite específica
 * Redirige al usuario a la página de detalles de la suite seleccionada
 * @param {string} suiteType - Tipo de suite (iconica, mitica, epica, deluxe, premium, master, royal)
 */
function viewSuite(suiteType) {
    var suite = suiteDetails[suiteType];
    if (suite) {
        // Mapeo de tipos de suite a sus respectivas páginas de detalle
        var suitePages = {
            'iconica': 'suite-detail.html',
            'mitica': 'suite-mitica.html',
            'epica': 'suite-epica.html',
            'deluxe': 'suite-majestic.html',
            'premium': 'suite-elementos.html',
            'master': 'suite-santa.html',
            'royal': 'suite-villa-santo.html'
        };
        
        // Obtener la página de destino para la suite seleccionada
        var targetPage = suitePages[suiteType];
        if (targetPage) {
            // Redirigir a la página específica de la suite
            window.location.href = targetPage;
        } else {
            // Redirigir a una página genérica si no se encuentra la específica
            window.location.href = 'suite-detail.html';
        }
    }
}

/**
 * Función para cerrar modales o overlays abiertos
 * Busca elementos con position: fixed y los elimina del DOM
 */
function closeModal() {
    var overlay = document.querySelector('div[style*="position: fixed"]');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}

/**
 * Función para iniciar el proceso de reserva de una suite
 * Muestra una alerta informativa al usuario (implementación básica)
 * @param {string} suiteName - Nombre de la suite a reservar
 */
function reserveSuite(suiteName) {
    alert('Redirigiendo a la página de reservas para: ' + suiteName);
}

// Exponer funciones globalmente para uso desde el HTML
window.viewSuite = viewSuite;
window.closeModal = closeModal;
window.reserveSuite = reserveSuite;
