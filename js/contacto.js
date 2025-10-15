/**
 * GESTIÓN DEL FORMULARIO DE CONTACTO
 * 
 * Este archivo maneja la lógica del formulario de contacto del hotel,
 * incluyendo validación de datos, envío de mensajes y gestión de errores.
 */

/**
 * Inicialización del formulario de contacto cuando el DOM está listo
 * Configura todos los event listeners y validaciones necesarias
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al formulario de contacto
    var form = document.getElementById('contactForm');
    
    // Lista de campos del formulario que necesitan validación en tiempo real
    var fields = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
    
    // Si el formulario no existe en la página, salir
    if (!form) return;

    /**
     * Manejador del evento submit del formulario
     * Valida los datos y guarda el mensaje de contacto en localStorage
     */
    form.onsubmit = function(e) {
        // Prevenir el comportamiento por defecto del formulario
        e.preventDefault();
        
        // Recopilar todos los datos del formulario y eliminar espacios en blanco
        var data = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            subject: document.getElementById('contactSubject').value.trim(),
            message: document.getElementById('contactMessage').value.trim() || 'Sin mensaje adicional'
        };
        
        // Ocultar mensaje de error previo si existe
        document.getElementById('generalError').style.display = 'none';
        
        // Validar que los campos requeridos estén completos
        if (!data.name || !data.email || !data.subject) {
            // Mostrar mensaje de error si falta algún campo requerido
            document.getElementById('generalError').style.display = 'block';
            return;
        }
        
        // Guardar el mensaje de contacto en localStorage
        storageManager.addContactMessage(data);
        
        // Mostrar mensaje de éxito al usuario
        document.getElementById('successMessage').style.display = 'block';
        
        // Limpiar todos los campos del formulario
        form.reset();
        
        // Ocultar el mensaje de éxito después de 5 segundos
        setTimeout(function() {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    };
    
    /**
     * Configurar validación en tiempo real para todos los campos
     * Oculta mensajes de error y éxito cuando el usuario comienza a escribir
     */
    for (var i = 0; i < fields.length; i++) {
        var field = document.getElementById(fields[i]);
        if (field) {
            // Event listener para ocultar mensajes cuando el usuario escribe
            field.oninput = function() {
                document.getElementById('generalError').style.display = 'none';
                document.getElementById('successMessage').style.display = 'none';
            };
        }
    }
});

