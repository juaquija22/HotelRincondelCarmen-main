/**
 * FUNCIONES UTILITARIAS DEL SISTEMA
 * 
 * Este archivo contiene funciones de utilidad general que son utilizadas
 * en diferentes partes del sistema del hotel.
 */

/**
 * Función para validar el formato de un email
 * @param {string} email - Email a validar
 * @returns {boolean} - true si el email es válido, false en caso contrario
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Función para formatear una cantidad como moneda colombiana
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada con símbolo de peso colombiano
 */
function formatCurrency(amount) {
    return 'COP $' + amount.toLocaleString('es-CO');
}

/**
 * Función para formatear una fecha en formato colombiano
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada en español
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Función para calcular el número de noches entre dos fechas
 * @param {string} checkIn - Fecha de check-in
 * @param {string} checkOut - Fecha de check-out
 * @returns {number} - Número de noches calculado
 */
function calculateNights(checkIn, checkOut) {
    var diff = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Función para obtener la fecha de mañana en formato ISO
 * @returns {string} - Fecha de mañana en formato YYYY-MM-DD
 */
function getTomorrow() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

/**
 * Función para mostrar notificaciones al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success', 'error', 'warning', 'info')
 */
function showNotification(message, type) {
    if (!type) type = 'success';
    
    // Crear elemento de notificación
    var notification = document.createElement('div');
    notification.className = 'alert alert-' + type;
    notification.style.cssText = 'position:fixed;top:100px;right:20px;z-index:3000;max-width:300px;animation:slideInRight 0.3s ease';
    
    // Seleccionar icono según el tipo de notificación
    var icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    // Configurar contenido de la notificación
    notification.innerHTML = '<i class="fas fa-' + icon + '"></i> ' + message;
    document.body.appendChild(notification);
    
    // Configurar auto-eliminación después de 3 segundos
    setTimeout(function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Función para establecer la fecha mínima en un campo de entrada de fecha
 * @param {HTMLInputElement} input - Campo de entrada de fecha
 * @param {number} days - Número de días a agregar a la fecha actual (por defecto 1)
 */
function setMinDate(input, days) {
    if (!input) return;
    if (!days) days = 1;
    
    var date = new Date();
    date.setDate(date.getDate() + days);
    input.min = date.toISOString().split('T')[0];
}

/**
 * Función para verificar si dos rangos de fechas se superponen
 * @param {string} start1 - Fecha de inicio del primer rango
 * @param {string} end1 - Fecha de fin del primer rango
 * @param {string} start2 - Fecha de inicio del segundo rango
 * @param {string} end2 - Fecha de fin del segundo rango
 * @returns {boolean} - true si las fechas se superponen, false en caso contrario
 */
function datesOverlap(start1, end1, start2, end2) {
    return new Date(start1) < new Date(end2) && new Date(end1) > new Date(start2);
}

