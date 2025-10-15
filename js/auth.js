/**
 * SISTEMA DE AUTENTICACIÓN DEL HOTEL
 * 
 * Este archivo maneja toda la lógica de autenticación de usuarios,
 * incluyendo login, registro, cambio de contraseña y gestión de sesiones.
 * Utiliza localStorage para persistir la información del usuario.
 */

// Variable global que almacena la información del usuario actualmente logueado
var currentUser = null;

/**
 * Función principal de inicialización del sistema de autenticación
 * Se ejecuta cuando se carga la página para restaurar la sesión del usuario
 */
function initAuth() {
    // Verificar si hay un usuario guardado en localStorage
    var savedUser = localStorage.getItem('current_user');
    if (savedUser) {
        // Restaurar la sesión del usuario
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Configurar todos los event listeners para los botones y formularios
    bindAuthEvents();
    
    // Limpiar iconos duplicados de contraseña que puedan haberse creado
    cleanupDuplicateIcons();
}

/**
 * Función para limpiar iconos duplicados de mostrar/ocultar contraseña
 * Evita que se creen múltiples iconos en el mismo campo de contraseña
 */
function cleanupDuplicateIcons() {
    // Buscar todos los contenedores de campos de contraseña
    var passwordWrappers = document.querySelectorAll('.password-input-wrapper');
    
    for (var i = 0; i < passwordWrappers.length; i++) {
        var wrapper = passwordWrappers[i];
        var icons = wrapper.querySelectorAll('.toggle-password');
        
        // Si hay más de un icono en el mismo wrapper, eliminar los duplicados
        if (icons.length > 1) {
            for (var j = 1; j < icons.length; j++) {
                icons[j].remove();
            }
        }
    }
}

/**
 * Función para configurar todos los event listeners de autenticación
 * Utiliza event delegation para manejar elementos dinámicos de manera eficiente
 */
function bindAuthEvents() {
    // Configurar event delegation en el body para mejor rendimiento
    document.body.addEventListener('click', function(e) {
        var target = e.target;
        
        // Manejar clic en botón de iniciar sesión
        if (target.id === 'loginBtn' || target.closest('#loginBtn')) {
            e.preventDefault();
            showLoginModal();
            return;
        }
        
        // Manejar clic en botón de cerrar sesión
        if (target.id === 'logoutBtn' || target.closest('#logoutBtn')) {
            e.preventDefault();
            logout();
            return;
        }
        
        // Manejar clic en botón de administrador
        if (target.id === 'adminBtn' || target.closest('#adminBtn')) {
            e.preventDefault();
            var currentPath = window.location.pathname;
            // Redirigir a admin.html dependiendo de la ruta actual
            if (currentPath.includes('html/')) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'html/admin.html';
            }
            return;
        }
        
        // Manejar clic en enlace "Regístrate aquí"
        if (target.id === 'showRegister' || target.closest('#showRegister')) {
            e.preventDefault();
            showRegisterModal();
            return;
        }
        
        // Manejar clic en enlace "Inicia sesión aquí"
        if (target.id === 'showLogin' || target.closest('#showLogin')) {
            e.preventDefault();
            showLoginModal();
            return;
        }
        
        // Manejar clic en enlace "¿Olvidaste tu contraseña?"
        if (target.id === 'showChangePassword' || target.closest('#showChangePassword')) {
            e.preventDefault();
            showChangePasswordModal();
            return;
        }
        
        // Manejar clic en enlace "Volver al inicio de sesión"
        if (target.id === 'backToLogin' || target.closest('#backToLogin')) {
            e.preventDefault();
            showLoginModal();
            return;
        }
    });

    // Configurar event listener para el formulario de login
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Configurar event listener para el formulario de registro
    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }

    // Configurar event listener para el formulario de cambio de contraseña
    var changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleChangePassword();
        });
    }

    // Configurar eventos adicionales de los modales
    bindModalEvents();
}

// Variable global para evitar duplicar event listeners de modales
var modalEventsBound = false;

/**
 * Función para configurar eventos específicos de los modales
 * Evita duplicar event listeners y maneja comportamientos comunes
 */
function bindModalEvents() {
    // Si ya se ejecutó, no hacer nada para evitar duplicados
    if (modalEventsBound) return;
    modalEventsBound = true;
    
    // Usar event delegation para manejar eventos de modales
    document.body.addEventListener('click', function(e) {
        var target = e.target;
        
        // Cerrar modal al hacer clic fuera del contenido
        if (target.classList.contains('modal')) {
            target.style.display = 'none';
        }
        
        // Cerrar modal con botón X (cruz)
        if (target.classList.contains('close')) {
            var modal = target.closest('.modal');
            if (modal) modal.style.display = 'none';
        }
        
        // Alternar visibilidad de contraseña (mostrar/ocultar)
        if (target.classList.contains('toggle-password')) {
            var targetId = target.getAttribute('data-target');
            var input = document.getElementById(targetId);
            if (input) {
                if (input.type === 'password') {
                    // Cambiar a texto visible
                    input.type = 'text';
                    // Cambiar el SVG a icono de ojo tachado
                    target.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
                } else {
                    // Cambiar a contraseña oculta
                    input.type = 'password';
                    // Cambiar el SVG a icono de ojo normal
                    target.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
                }
            }
        }
    });
}

/**
 * Función para mostrar el modal de inicio de sesión
 * Oculta otros modales y limpia iconos duplicados
 */
function showLoginModal() {
    var modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Ocultar otros modales para evitar superposición
        var registerModal = document.getElementById('registerModal');
        if (registerModal) registerModal.style.display = 'none';
        var changePasswordModal = document.getElementById('changePasswordModal');
        if (changePasswordModal) changePasswordModal.style.display = 'none';
        
        // Limpiar iconos duplicados de contraseña
        cleanupDuplicateIcons();
    }
}

/**
 * Función para mostrar el modal de registro de usuario
 * Oculta otros modales y limpia iconos duplicados
 */
function showRegisterModal() {
    var modal = document.getElementById('registerModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Ocultar otros modales para evitar superposición
        var loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.style.display = 'none';
        var changePasswordModal = document.getElementById('changePasswordModal');
        if (changePasswordModal) changePasswordModal.style.display = 'none';
        
        // Limpiar iconos duplicados de contraseña
        cleanupDuplicateIcons();
    }
}

/**
 * Función para mostrar el modal de cambio de contraseña
 * Oculta otros modales y limpia iconos duplicados
 */
function showChangePasswordModal() {
    var modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Ocultar otros modales para evitar superposición
        var loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.style.display = 'none';
        var registerModal = document.getElementById('registerModal');
        if (registerModal) registerModal.style.display = 'none';
        
        // Limpiar iconos duplicados de contraseña
        cleanupDuplicateIcons();
    }
}

/**
 * Función para manejar el proceso de inicio de sesión
 * Valida las credenciales del usuario y establece la sesión
 */
function handleLogin() {
    // Obtener los valores del formulario de login
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // Validar que todos los campos estén completos
    if (!email || !password) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }

    // Buscar el usuario por email en la base de datos local
    var user = storageManager.getUserByEmail(email);
    
    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || user.password !== password) {
        showNotification('Email o contraseña incorrectos', 'error');
        return;
    }

    // Establecer el usuario como usuario actual
    currentUser = user;
    
    // Guardar la sesión en localStorage para persistencia
    localStorage.setItem('current_user', JSON.stringify(user));
    
    // Cerrar el modal de login y limpiar el formulario
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginForm').reset();
    
    // Actualizar la interfaz de usuario para mostrar el estado logueado
    updateAuthUI();
    
    // Mostrar mensaje de bienvenida
    showNotification('¡Bienvenido ' + user.name + '!', 'success');
}

/**
 * Función para manejar el proceso de registro de nuevos usuarios
 * Valida los datos, verifica duplicados y crea la cuenta
 */
function handleRegister() {
    // Recopilar todos los datos del formulario de registro
    var formData = {
        identification: document.getElementById('regId').value,
        name: document.getElementById('regName').value,
        nationality: document.getElementById('regNationality').value,
        email: document.getElementById('regEmail').value,
        phone: document.getElementById('regPhone').value,
        password: document.getElementById('regPassword').value
    };

    // Validar que todos los campos cumplan con los requisitos
    if (!validateRegistration(formData)) {
        return;
    }

    // Verificar si ya existe un usuario con ese email
    var existingUser = storageManager.getUserByEmail(formData.email);
    if (existingUser) {
        showNotification('Este email ya está registrado', 'error');
        return;
    }

    // Verificar si ya existe un usuario con ese número de identificación
    var users = storageManager.getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].identification === formData.identification) {
            showNotification('Este número de identificación ya está registrado', 'error');
            return;
        }
    }

    // Crear el nuevo usuario en la base de datos
    storageManager.addUser(formData);
    
    // Cerrar el modal de registro
    document.getElementById('registerModal').style.display = 'none';
    
    // Mostrar mensaje de éxito
    showNotification('Registro exitoso. Ahora puedes iniciar sesión', 'success');
    
    // Redirigir al modal de login después de 1.5 segundos
    setTimeout(function() {
        showLoginModal();
    }, 1500);
}

/**
 * Función para manejar el proceso de cambio de contraseña
 * Valida las credenciales actuales y actualiza la contraseña
 */
function handleChangePassword() {
    // Obtener los valores del formulario de cambio de contraseña
    var email = document.getElementById('changeEmail').value;
    var currentPassword = document.getElementById('currentPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Validar que todos los campos estén completos
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }

    // Validar longitud mínima de la nueva contraseña
    if (newPassword.length < 6) {
        showNotification('La nueva contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    // Validar que las contraseñas nuevas coincidan
    if (newPassword !== confirmPassword) {
        showNotification('Las contraseñas nuevas no coinciden', 'error');
        return;
    }

    // Buscar el usuario por email
    var user = storageManager.getUserByEmail(email);
    
    // Verificar que el usuario existe
    if (!user) {
        showNotification('No se encontró un usuario con ese email', 'error');
        return;
    }

    // Verificar que la contraseña actual es correcta
    if (user.password !== currentPassword) {
        showNotification('La contraseña actual es incorrecta', 'error');
        return;
    }

    // Actualizar la contraseña del usuario en la base de datos
    var updatedUser = storageManager.updateUser(user.id, { password: newPassword });
    
    if (updatedUser) {
        // Cerrar el modal y limpiar el formulario
        document.getElementById('changePasswordModal').style.display = 'none';
        document.getElementById('changePasswordForm').reset();
        
        // Mostrar mensaje de éxito
        showNotification('Contraseña cambiada exitosamente', 'success');
        
        // Redirigir al modal de login después de 1.5 segundos
        setTimeout(function() {
            showLoginModal();
        }, 1500);
    } else {
        showNotification('Error al cambiar la contraseña', 'error');
    }
}

/**
 * Función para validar los datos del formulario de registro
 * Verifica que todos los campos cumplan con los requisitos mínimos
 * @param {Object} data - Objeto con los datos del formulario
 * @returns {boolean} - true si todos los datos son válidos, false en caso contrario
 */
function validateRegistration(data) {
    // Validar número de identificación (mínimo 6 caracteres)
    if (!data.identification || data.identification.length < 6) {
        showNotification('El número de identificación debe tener al menos 6 caracteres', 'error');
        return false;
    }

    // Validar nombre completo (mínimo 2 caracteres)
    if (!data.name || data.name.length < 2) {
        showNotification('El nombre debe tener al menos 2 caracteres', 'error');
        return false;
    }

    // Validar nacionalidad (mínimo 2 caracteres)
    if (!data.nationality || data.nationality.length < 2) {
        showNotification('La nacionalidad es requerida', 'error');
        return false;
    }

    // Validar formato de email
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Ingresa un email válido', 'error');
        return false;
    }

    // Validar número de teléfono (mínimo 10 caracteres)
    if (!data.phone || data.phone.length < 10) {
        showNotification('El teléfono debe tener al menos 10 caracteres', 'error');
        return false;
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (!data.password || data.password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return false;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
}

/**
 * Función para cerrar la sesión del usuario actual
 * Limpia los datos de sesión y redirige a la página principal
 */
function logout() {
    // Limpiar la variable del usuario actual
    currentUser = null;
    
    // Eliminar los datos de sesión del localStorage
    localStorage.removeItem('current_user');
    
    // Actualizar la interfaz de usuario para mostrar el estado no logueado
    updateAuthUI();
    
    // Mostrar mensaje de confirmación
    showNotification('Has cerrado sesión exitosamente', 'success');
    
    // Redirigir a la página principal después de 1 segundo
    setTimeout(function() {
        window.location.href = window.location.pathname.includes('html/') ? '../index.html' : 'index.html';
    }, 1000);
}

/**
 * Función para actualizar la interfaz de usuario según el estado de autenticación
 * Muestra/oculta elementos según si el usuario está logueado o no
 */
function updateAuthUI() {
    // Obtener referencias a los elementos de la interfaz
    var loginBtn = document.getElementById('loginBtn');
    var logoutBtnItem = document.getElementById('logoutBtnItem');
    var adminBtn = document.getElementById('adminBtn');
    var userGreeting = document.getElementById('userGreeting');
    var userName = document.getElementById('userName');

    if (currentUser) {
        // Usuario logueado: mostrar elementos de usuario autenticado
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtnItem) logoutBtnItem.style.display = 'block';
        
        // Mostrar botón de admin solo si el usuario es administrador
        if (adminBtn && currentUser.role === 'admin') adminBtn.style.display = 'block';
        
        // Mostrar saludo personalizado del usuario
        if (userGreeting && userName) {
            userGreeting.style.display = 'block';
            if (currentUser.role === 'admin') {
                userName.textContent = 'Admin';
            } else {
                userName.textContent = 'Hola, ' + currentUser.name;
            }
        }
        
        // Cargar las reservas del usuario
        loadUserReservations();
    } else {
        // Usuario no logueado: mostrar elementos de usuario no autenticado
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtnItem) logoutBtnItem.style.display = 'none';
        if (adminBtn) adminBtn.style.display = 'none';
        
        // Ocultar saludo del usuario
        if (userGreeting) {
            userGreeting.style.display = 'none';
        }
    }
}

/**
 * Función para verificar si el usuario está autenticado
 * @returns {boolean} - true si el usuario está logueado, false en caso contrario
 */
function isAuthenticated() {
    return currentUser !== null;
}

/**
 * Función para obtener la información del usuario actual
 * @returns {Object|null} - Objeto con la información del usuario o null si no está logueado
 */
function getCurrentUser() {
    return currentUser;
}

/**
 * Función para cargar y mostrar las reservas del usuario actual
 * Genera el HTML dinámicamente para mostrar las reservas en la interfaz
 */
function loadUserReservations() {
    // Si no hay usuario logueado, ocultar la sección de reservas
    if (!currentUser) {
        var myReservationsSection = document.getElementById('myReservations');
        if (myReservationsSection) {
            myReservationsSection.style.display = 'none';
        }
        return;
    }

    // Obtener todas las reservas del usuario actual
    var allReservations = storageManager.getReservationsByUser(currentUser.id);
    var reservationsList = document.getElementById('reservationsList');
    var myReservationsSection = document.getElementById('myReservations');
    
    // Si no existe el contenedor de reservas, salir
    if (!reservationsList) return;

    // Mostrar la sección de reservas
    if (myReservationsSection) {
        myReservationsSection.style.display = 'block';
    }

    // Si no hay reservas, mostrar estado vacío
    if (allReservations.length === 0) {
        var url = window.location.pathname.includes('html/') ? 'reservas.html' : 'html/reservas.html';
        reservationsList.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-times"></i><h3>No tienes reservas</h3><p>¡Haz tu primera reserva ahora!</p><a href="' + url + '" class="btn-suites">VER HABITACIONES</a></div>';
        return;
    }

    // Generar HTML para cada reserva
    var html = '';
    for (var i = 0; i < allReservations.length; i++) {
        var reservation = allReservations[i];
        
        // Obtener información de la habitación asociada a la reserva
        var room = storageManager.getRoomById(reservation.roomId);
        
        // Formatear fechas en formato colombiano
        var checkIn = new Date(reservation.checkIn).toLocaleDateString('es-CO');
        var checkOut = new Date(reservation.checkOut).toLocaleDateString('es-CO');
        
        // Calcular número total de noches
        var totalNights = Math.ceil((new Date(reservation.checkOut) - new Date(reservation.checkIn)) / (1000 * 60 * 60 * 24));
        
        // Usar el precio total guardado en la reserva o calcular si no existe
        var totalPrice = reservation.totalPrice || (totalNights * room.pricePerNight);
        
        // Obtener imagen de la habitación o usar placeholder
        var roomImage = room.images && room.images[0] ? room.images[0] : 'https://via.placeholder.com/400x300?text=Sin+Imagen';
        
        // Configurar clases CSS según el estado de la reserva
        var statusClass = reservation.status === 'cancelled' ? 'cancelled-reservation' : '';
        var statusIcon = reservation.status === 'pending' ? 'clock' : reservation.status === 'confirmed' ? 'check-circle' : reservation.status === 'cancelled' ? 'times-circle' : 'circle';
        var statusText = getStatusText(reservation.status);
        var cancelledOverlay = reservation.status === 'cancelled' ? '<div class="cancelled-overlay">CANCELADA</div>' : '';
        
        // Configurar textos plurales/singulares
        var nightsText = totalNights === 1 ? 'noche' : 'noches';
        var guestsText = reservation.guests === 1 ? 'huésped' : 'huéspedes';
        var priceClass = reservation.status === 'cancelled' ? 'cancelled-price' : '';
        
        // Construir el HTML de la tarjeta de reserva
        html += '<div class="reservation-card-vertical ' + statusClass + '">';
        
        // Sección de imagen con overlay de estado
        html += '<div class="reservation-image-top">';
        html += '<img src="' + roomImage + '" alt="' + room.name + '">';
        html += '<div class="status-overlay status-' + reservation.status + '"><i class="fas fa-' + statusIcon + '"></i> ' + statusText + '</div>';
        html += cancelledOverlay;
        html += '</div>';
        
        // Sección de contenido de la reserva
        html += '<div class="reservation-content-vertical">';
        html += '<h3 class="room-name-vertical">' + room.name + '</h3>';
        
        // Sección de fechas (check-in, noches, check-out)
        html += '<div class="dates-section">';
        html += '<div class="date-box"><i class="fas fa-sign-in-alt"></i><div><small>Check-in</small><strong>' + checkIn + '</strong></div></div>';
        html += '<div class="nights-indicator"><i class="fas fa-moon"></i> ' + totalNights + ' ' + nightsText + '</div>';
        html += '<div class="date-box"><i class="fas fa-sign-out-alt"></i><div><small>Check-out</small><strong>' + checkOut + '</strong></div></div>';
        html += '</div>';
        
        // Información de huéspedes
        html += '<div class="guests-info"><i class="fas fa-users"></i><span>' + reservation.guests + ' ' + guestsText + '</span></div>';
        
        // Precio total
        html += '<div class="price-box ' + priceClass + '"><div class="price-total">Total: COP $' + totalPrice.toLocaleString('es-CO') + '</div></div>';
        
        // Mensaje informativo sobre modificaciones y cancelaciones
        if (reservation.status !== 'cancelled') {
            html += '<div class="reservation-info-message">';
            html += '<i class="fas fa-info-circle"></i>';
            html += '<p>Para modificar o cancelar su reserva, por favor contacte con el hotel:</p>';
            html += '<p class="contact-details">';
            html += '<i class="fas fa-phone"></i> +57 3137713137 | ';
            html += '<i class="fas fa-envelope"></i> reservations@saintsuitesoia.com';
            html += '</p>';
            html += '</div>';
        }
        
        html += '</div></div>';
    }
    
    // Insertar todo el HTML generado en el contenedor de reservas
    reservationsList.innerHTML = html;
}

/**
 * Función para obtener el texto en español del estado de una reserva
 * @param {string} status - Estado de la reserva en inglés
 * @returns {string} - Estado traducido al español
 */
function getStatusText(status) {
    var statuses = {
        'pending': 'Pendiente',
        'confirmed': 'Confirmada',
        'cancelled': 'Cancelada',
        'completed': 'Completada'
    };
    return statuses[status] || status;
}

/**
 * Función para obtener el nombre en español del tipo de habitación
 * @param {string} type - Tipo de habitación en inglés
 * @returns {string} - Tipo traducido al español
 */
function getRoomTypeName(type) {
    var types = {
        'standard': 'Estándar',
        'deluxe': 'Deluxe',
        'suite': 'Suite',
        'presidential': 'Presidencial',
        'villa': 'Villa'
    };
    return types[type] || type;
}

/**
 * FUNCIONES DESHABILITADAS: Los usuarios ya no pueden modificar ni cancelar reservas directamente.
 * Deben contactar al hotel para realizar cualquier cambio.
 * Estas funciones se mantienen comentadas para futura referencia.
 */

/*
function modifyReservation(reservationId) {
    // Buscar la reserva por ID
    var reservations = storageManager.getAllReservations();
    var reservation = null;
    
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id === reservationId) {
            reservation = reservations[i];
            break;
        }
    }
    
    // Si no se encuentra la reserva, salir
    if (!reservation) return;
    
    // Obtener información de la habitación asociada
    var room = storageManager.getRoomById(reservation.roomId);
    
    // Crear el modal dinámicamente
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'editReservationModal';
    modal.style.display = 'block';
    
    // Generar opciones de número de huéspedes
    var guestOptions = '';
    for (var i = 1; i <= 4; i++) {
        var selected = reservation.guests === i ? 'selected' : '';
        var text = i === 1 ? 'huésped' : 'huéspedes';
        guestOptions += '<option value="' + i + '" ' + selected + '>' + i + ' ' + text + '</option>';
    }
    
    // Crear el contenido HTML del modal
    modal.innerHTML = '<div class="modal-content"><span class="close">&times;</span><h2>Modificar Reserva</h2><p><strong>Habitación:</strong> ' + room.name + '</p><form id="editReservationForm"><div class="form-group"><label for="editCheckIn">Fecha de entrada:</label><input type="date" id="editCheckIn" value="' + reservation.checkIn + '" required></div><div class="form-group"><label for="editCheckOut">Fecha de salida:</label><input type="date" id="editCheckOut" value="' + reservation.checkOut + '" required></div><div class="form-group"><label for="editGuests">Número de Huéspedes:</label><select id="editGuests" required>' + guestOptions + '</select></div><div class="form-buttons"><button type="submit" class="btn-primary">Guardar Cambios</button><button type="button" class="btn-outline" onclick="document.getElementById(\'editReservationModal\').remove()">Cancelar</button></div></form></div>';
    
    // Agregar el modal al DOM
    document.body.appendChild(modal);
    
    // Configurar eventos para cerrar el modal
    modal.querySelector('.close').onclick = function() {
        modal.remove();
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) modal.remove();
    };
    
    // Configurar fechas mínimas (mañana para check-in, pasado mañana para check-out)
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    var dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    var dayAfterTomorrowStr = dayAfterTomorrow.toISOString().split('T')[0];
    
    // Obtener referencias a los campos de fecha
    var editCheckIn = document.getElementById('editCheckIn');
    var editCheckOut = document.getElementById('editCheckOut');
    
    // Establecer fechas mínimas para los campos
    editCheckIn.min = tomorrowStr;
    editCheckOut.min = dayAfterTomorrowStr;
    
    // Configurar validación de fechas: check-out debe ser al menos un día después de check-in
    editCheckIn.onchange = function() {
        var checkInDate = new Date(editCheckIn.value);
        var nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        editCheckOut.min = nextDay.toISOString().split('T')[0];
        
        // Si la fecha de check-out actual es inválida, limpiarla
        if (editCheckOut.value && new Date(editCheckOut.value) <= checkInDate) {
            editCheckOut.value = '';
        }
    };
    
    // Configurar el envío del formulario de edición
    document.getElementById('editReservationForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Obtener los nuevos valores del formulario
        var newCheckIn = document.getElementById('editCheckIn').value;
        var newCheckOut = document.getElementById('editCheckOut').value;
        var newGuests = parseInt(document.getElementById('editGuests').value);
        
        // Validar que la fecha de salida sea posterior a la de entrada
        if (new Date(newCheckOut) <= new Date(newCheckIn)) {
            alert('La fecha de salida debe ser posterior a la fecha de entrada');
            return;
        }
        
        // Calcular el nuevo número de noches
        var newNights = Math.ceil((new Date(newCheckOut) - new Date(newCheckIn)) / (1000 * 60 * 60 * 24));
        
        // Preparar los datos actualizados
        var updatedData = {
            checkIn: newCheckIn,
            checkOut: newCheckOut,
            nights: newNights,
            guests: newGuests
        };
        
        // Actualizar la reserva en la base de datos
        storageManager.updateReservation(reservationId, updatedData);
        
        // Cerrar el modal y actualizar la interfaz
        modal.remove();
        loadUserReservations();
        showNotification('Reserva modificada exitosamente', 'success');
    };
}

function cancelReservation(reservationId) {
    // Obtener información de la reserva antes de cancelarla
    var reservations = storageManager.getData('reservations') || [];
    var reservation = null;
    var room = null;
    
    // Buscar la reserva y obtener información de la habitación
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id === reservationId) {
            reservation = reservations[i];
            room = storageManager.getRoomById(reservation.roomId);
            break;
        }
    }
    
    // Cambiar el estado de la reserva a 'cancelled'
    storageManager.updateReservationStatus(reservationId, 'cancelled');
    
    // Actualizar la lista de reservas en la interfaz
    loadUserReservations();
    
    // Mostrar mensaje específico sobre la disponibilidad de la habitación
    var roomName = room ? room.name : 'Habitación';
    showNotification('Reserva cancelada exitosamente. La ' + roomName + ' vuelve a estar disponible.', 'success');
    
    // Refrescar la búsqueda de habitaciones si hay fechas seleccionadas
    var checkInInput = document.getElementById('checkIn');
    var checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput && checkInInput.value && checkOutInput.value) {
        if (window.reservationManager && window.reservationManager.refreshSearch) {
            window.reservationManager.refreshSearch();
        }
    }
}
*/

/**
 * Objeto que expone las funciones principales del sistema de autenticación
 * Permite acceso global a las funciones desde otros archivos JavaScript
 */
var authManager = {
    isAuthenticated: isAuthenticated,
    getCurrentUser: getCurrentUser,
    showLoginModal: showLoginModal,
    loadUserReservations: loadUserReservations
    // modifyReservation y cancelReservation han sido deshabilitados
    // Los usuarios deben contactar al hotel para modificar o cancelar reservas
};

// Hacer el objeto authManager disponible globalmente
window.authManager = authManager;

/**
 * Inicializar el sistema de autenticación cuando el DOM esté completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});
