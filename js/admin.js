/**
 * PANEL DE ADMINISTRACIÓN DEL HOTEL
 * 
 * Este archivo gestiona todas las funcionalidades del panel de administración,
 * incluyendo la gestión de habitaciones, reservas y configuración del sistema.
 * Solo los usuarios con rol 'admin' pueden acceder a estas funcionalidades.
 */

/**
 * Inicialización del panel de administración
 * Verifica permisos del usuario y carga los datos iniciales
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el usuario actual desde localStorage
    var currentUser = JSON.parse(localStorage.getItem('current_user'));
    
    // Verificar que el usuario esté autenticado y tenga rol de administrador
    if (!currentUser || currentUser.role !== 'admin') {
        alert('No tienes permisos para acceder a esta página');
        window.location.href = '../index.html';
        return;
    }

    // Cargar la lista de habitaciones al iniciar
    loadRooms();

    // Configurar el formulario de agregar habitación
    var roomForm = document.getElementById('roomForm');
    if (roomForm) {
        roomForm.onsubmit = handleRoomSubmit;
    }
});

/**
 * Función para cambiar entre las diferentes pestañas del panel de administración
 * @param {string} tabName - Nombre de la pestaña a mostrar (rooms, reservations, etc.)
 */
function showTab(tabName) {
    // Ocultar todos los contenidos de las pestañas
    var tabs = document.querySelectorAll('.tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Desactivar todas las pestañas de navegación
    var adminTabs = document.querySelectorAll('.admin-tab');
    for (var i = 0; i < adminTabs.length; i++) {
        adminTabs[i].classList.remove('active');
    }
    
    // Activar la pestaña seleccionada
    var tabContent = document.getElementById(tabName + '-tab');
    if (tabContent) tabContent.classList.add('active');
    if (event && event.target) event.target.classList.add('active');
    
    // Cargar datos específicos según la pestaña seleccionada
    if (tabName === 'rooms') {
        loadRooms();
    } else if (tabName === 'reservations') {
        loadReservations();
    } else if (tabName === 'complaints') {
        loadComplaints();
    }
}

/**
 * Manejador del envío del formulario para agregar una nueva habitación
 * Valida los datos y crea la habitación en el sistema
 * @param {Event} e - Evento de submit del formulario
 */
function handleRoomSubmit(e) {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();
    
    // Recopilar todos los datos del formulario
    var roomData = {
        name: document.getElementById('roomName').value,
        type: document.getElementById('roomType').value,
        price: parseInt(document.getElementById('roomPrice').value),
        capacity: parseInt(document.getElementById('roomCapacity').value),
        beds: parseInt(document.getElementById('roomBeds').value),
        available: document.getElementById('roomAvailable').value === 'true',
        description: document.getElementById('roomDescription').value,
        services: getSelectedServices()
    };
    
    // Obtener habitaciones existentes
    var rooms = storageManager.getData('rooms') || [];
    
    // Crear objeto de la nueva habitación con formato estandarizado
    var newRoom = {
        id: storageManager.generateId(rooms),
        name: roomData.name,
        type: roomData.type,
        pricePerNight: roomData.price,
        capacity: roomData.capacity,
        maxGuests: roomData.capacity,
        beds: roomData.beds,
        available: roomData.available,
        description: roomData.description,
        services: roomData.services,
        images: [] // Inicializar array de imágenes vacío
    };
    
    // Agregar la nueva habitación al array
    rooms.push(newRoom);
    
    // Guardar los datos actualizados en localStorage
    storageManager.setData('rooms', rooms);
    
    // Limpiar el formulario
    e.target.reset();
    
    // Recargar la lista de habitaciones en la interfaz
    loadRooms();
    
    // Mostrar mensaje de éxito
    showNotification('Habitación agregada exitosamente', 'success');
}

/**
 * Función para obtener los servicios seleccionados en los checkboxes
 * @returns {Array} - Array con los valores de los servicios seleccionados
 */
function getSelectedServices() {
    var services = [];
    var checkboxes = document.querySelectorAll('.services-checkboxes input[type="checkbox"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        services.push(checkboxes[i].value);
    }
    return services;
}

/**
 * Función para cargar y mostrar todas las habitaciones en la tabla
 * Genera el HTML dinámicamente y lo inserta en el DOM
 */
function loadRooms() {
    var rooms = storageManager.getData('rooms') || [];
    var tbody = document.getElementById('roomsTableBody');
    
    // Si no existe el elemento tbody, salir
    if (!tbody) return;
    
    var html = '';
    
    // Generar una fila de tabla para cada habitación
    for (var i = 0; i < rooms.length; i++) {
        var room = rooms[i];
        var price = room.pricePerNight || room.price;
        var available = room.available ? 'Sí' : 'No';
        
        html += '<tr>';
        html += '<td>' + room.id + '</td>';
        html += '<td>' + room.name + '</td>';
        html += '<td>' + room.type + '</td>';
        html += '<td>' + formatCurrency(price) + '</td>';
        html += '<td>' + room.capacity + '</td>';
        html += '<td>' + room.beds + '</td>';
        html += '<td>' + available + '</td>';
        html += '<td class="actions-cell"><div class="action-buttons">';
        html += '<button class="btn-secondary btn-sm" onclick="editRoom(' + room.id + ')"><i class="fas fa-edit"></i> Editar</button>';
        html += '<button class="btn-danger btn-sm" onclick="deleteRoom(' + room.id + ')"><i class="fas fa-trash"></i> Eliminar</button>';
        html += '</div></td>';
        html += '</tr>';
    }
    
    // Insertar el HTML generado en la tabla
    tbody.innerHTML = html;
}

/**
 * Función para eliminar una habitación del sistema
 * Solicita confirmación antes de proceder con la eliminación
 * @param {number} roomId - ID de la habitación a eliminar
 */
function deleteRoom(roomId) {
    // Solicitar confirmación al usuario
    if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
        var rooms = storageManager.getData('rooms') || [];
        var updatedRooms = [];
        
        // Filtrar todas las habitaciones excepto la que se va a eliminar
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].id !== roomId) {
                updatedRooms.push(rooms[i]);
            }
        }
        
        // Guardar la lista actualizada
        storageManager.setData('rooms', updatedRooms);
        
        // Recargar la lista de habitaciones
        loadRooms();
        
        // Mostrar mensaje de éxito
        showNotification('Habitación eliminada exitosamente', 'success');
    }
}

/**
 * Función para editar una habitación existente
 * Crea un modal dinámico con el formulario de edición precargado con los datos actuales
 * @param {number} roomId - ID de la habitación a editar
 */
function editRoom(roomId) {
    var rooms = storageManager.getData('rooms') || [];
    var room = null;
    
    // Buscar la habitación por ID
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
            room = rooms[i];
            break;
        }
    }
    
    // Si no se encuentra la habitación, mostrar error
    if (!room) {
        showNotification('Habitación no encontrada', 'error');
        return;
    }
    
    // Crear modal de edición dinámicamente
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'editRoomModal';
    modal.style.display = 'block';
    
    // Generar checkboxes de servicios con los valores actuales
    var servicesHtml = '';
    var availableServices = ['wifi', 'minibar', 'jacuzzi', 'tv', 'ac', 'balcony', 'room-service', 'safe', 'pool', 'terrace'];
    var roomServices = room.services || [];
    
    // Crear un checkbox para cada servicio disponible
    for (var i = 0; i < availableServices.length; i++) {
        var service = availableServices[i];
        var checked = roomServices.includes(service) ? 'checked' : '';
        var label = service.charAt(0).toUpperCase() + service.slice(1);
        
        // Traducir etiquetas de servicios al español
        if (service === 'wifi') label = 'WiFi Gratuito';
        if (service === 'tv') label = 'TV';
        if (service === 'ac') label = 'Aire Acondicionado';
        if (service === 'balcony') label = 'Balcón';
        if (service === 'room-service') label = 'Room Service';
        if (service === 'safe') label = 'Caja Fuerte';
        if (service === 'pool') label = 'Piscina Privada';
        if (service === 'terrace') label = 'Terraza Privada';
        
        servicesHtml += `
            <div class="checkbox-group">
                <input type="checkbox" id="edit-service-${service}" value="${service}" ${checked}>
                <label for="edit-service-${service}">${label}</label>
            </div>
        `;
    }
    
    // Crear el contenido HTML del modal con el formulario de edición
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close">&times;</span>
            <h2>Editar Habitación: ${room.name}</h2>
            
            <form id="editRoomForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="editRoomName">Nombre de la Habitación:</label>
                        <input type="text" id="editRoomName" value="${room.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="editRoomType">Tipo:</label>
                        <select id="editRoomType" required>
                            <option value="suite" ${room.type === 'suite' ? 'selected' : ''}>Suite</option>
                            <option value="habitacion" ${room.type === 'habitacion' ? 'selected' : ''}>Habitación</option>
                            <option value="villa" ${room.type === 'villa' ? 'selected' : ''}>Villa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editRoomPrice">Precio por Noche:</label>
                        <input type="number" id="editRoomPrice" value="${room.pricePerNight || room.price}" min="0" required>
                    </div>
                    <div class="form-group">
                        <label for="editRoomCapacity">Capacidad Máxima:</label>
                        <input type="number" id="editRoomCapacity" value="${room.capacity}" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="editRoomBeds">Número de Camas:</label>
                        <input type="number" id="editRoomBeds" value="${room.beds}" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="editRoomAvailable">Disponible:</label>
                        <select id="editRoomAvailable" required>
                            <option value="true" ${room.available ? 'selected' : ''}>Sí</option>
                            <option value="false" ${!room.available ? 'selected' : ''}>No</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="editRoomDescription">Descripción:</label>
                    <textarea id="editRoomDescription" required>${room.description || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label>Servicios Incluidos:</label>
                    <div class="services-checkboxes">
                        ${servicesHtml}
                    </div>
                </div>
                
                <div class="form-buttons">
                    <button type="submit" class="btn-primary">Guardar Cambios</button>
                    <button type="button" class="btn-outline" onclick="closeEditRoomModal()">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    // Agregar el modal al DOM
    document.body.appendChild(modal);
    
    // Configurar evento para cerrar el modal con el botón X
    var closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    // Configurar evento para cerrar el modal al hacer clic fuera del contenido
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
    
    /**
     * Manejador del envío del formulario de edición de habitación
     * Actualiza los datos de la habitación en el sistema
     */
    document.getElementById('editRoomForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Recopilar los datos actualizados del formulario
        var updatedRoom = {
            id: roomId,
            name: document.getElementById('editRoomName').value,
            type: document.getElementById('editRoomType').value,
            pricePerNight: parseInt(document.getElementById('editRoomPrice').value),
            capacity: parseInt(document.getElementById('editRoomCapacity').value),
            maxGuests: parseInt(document.getElementById('editRoomCapacity').value),
            beds: parseInt(document.getElementById('editRoomBeds').value),
            available: document.getElementById('editRoomAvailable').value === 'true',
            description: document.getElementById('editRoomDescription').value,
            services: getSelectedEditServices(),
            images: room.images || [],
            image: room.image || (room.images && room.images[0]) || ''
        };
        
        // Actualizar la habitación en el array
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].id === roomId) {
                rooms[i] = updatedRoom;
                break;
            }
        }
        
        // Guardar los datos actualizados
        storageManager.setData('rooms', rooms);
        
        // Mostrar mensaje de éxito y cerrar modal
        showNotification('Habitación actualizada exitosamente', 'success');
        modal.remove();
        
        // Recargar la lista de habitaciones
        loadRooms();
    };
}

/**
 * Función para obtener los servicios seleccionados en el formulario de edición
 * @returns {Array} - Array con los valores de los servicios seleccionados
 */
function getSelectedEditServices() {
    var services = [];
    var checkboxes = document.querySelectorAll('#editRoomModal .services-checkboxes input[type="checkbox"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        services.push(checkboxes[i].value);
    }
    return services;
}

/**
 * Función para cerrar el modal de edición de habitación
 */
function closeEditRoomModal() {
    var modal = document.getElementById('editRoomModal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Función para cargar y mostrar todas las reservas en la tabla
 * Genera el HTML dinámicamente con información completa de usuarios y habitaciones
 */
function loadReservations() {
    var reservations = storageManager.getData('reservations') || [];
    var users = storageManager.getData('users') || [];
    var rooms = storageManager.getData('rooms') || [];
    var tbody = document.getElementById('reservationsTableBody');
    
    // Si no existe el elemento tbody, salir
    if (!tbody) return;
    
    var html = '';
    
    // Generar una fila de tabla para cada reserva
    for (var i = 0; i < reservations.length; i++) {
        var reservation = reservations[i];
        var user = null;
        var room = null;
        
        // Buscar el usuario asociado a la reserva
        for (var j = 0; j < users.length; j++) {
            if (users[j].id === reservation.userId) {
                user = users[j];
                break;
            }
        }
        
        // Buscar la habitación asociada a la reserva
        for (var j = 0; j < rooms.length; j++) {
            if (rooms[j].id === reservation.roomId) {
                room = rooms[j];
                break;
            }
        }
        
        // Obtener nombres o mensajes por defecto si no se encuentran
        var userName = user ? user.name : 'Usuario no encontrado';
        var roomName = room ? room.name : 'Habitación no encontrada';
        
        // Generar HTML de la fila de reserva
        html += '<tr>';
        html += '<td>' + reservation.id + '</td>';
        html += '<td>' + userName + '</td>';
        html += '<td>' + roomName + '</td>';
        html += '<td>' + formatDate(reservation.checkIn) + '</td>';
        html += '<td>' + formatDate(reservation.checkOut) + '</td>';
        html += '<td>' + reservation.guests + '</td>';
        html += '<td><span class="status-badge status-' + reservation.status + '">' + reservation.status + '</span></td>';
        html += '<td class="actions-cell"><div class="action-buttons">';
        html += '<button class="btn-secondary btn-sm" onclick="modifyReservationAdmin(' + reservation.id + ')"><i class="fas fa-edit"></i> Modificar</button>';
        html += '<button class="btn-danger btn-sm" onclick="deleteReservationAdmin(' + reservation.id + ')"><i class="fas fa-trash"></i> Eliminar</button>';
        html += '</div></td>';
        html += '</tr>';
    }
    
    // Insertar el HTML generado en la tabla
    tbody.innerHTML = html;
}

/**
 * Cargar y mostrar quejas y reclamos
 */
function loadComplaints() {
    var complaints = storageManager.getAllComplaints() || [];
    var users = storageManager.getData('users') || [];
    var tbody = document.getElementById('complaintsTableBody');
    if (!tbody) return;

    var html = '';
    for (var i = 0; i < complaints.length; i++) {
        var c = complaints[i];
        var user = null;
        for (var j = 0; j < users.length; j++) {
            if (users[j].id === c.userId) { user = users[j]; break; }
        }
        var userName = user ? user.name : 'Usuario';
        html += '<tr>';
        html += '<td>' + c.id + '</td>';
        html += '<td>' + formatDate(c.createdAt) + '</td>';
        html += '<td>' + c.type + '</td>';
        html += '<td>' + c.subject + '</td>';
        html += '<td>' + userName + '</td>';
        html += '<td><span class="status-badge status-' + c.status + '">' + c.status + '</span></td>';
        html += '<td class="actions-cell"><div class="action-buttons">';
        html += '<button class="btn-secondary btn-sm" onclick="respondComplaintAdmin(' + c.id + ')"><i class="fas fa-reply"></i> Responder</button>';
        html += '</div></td>';
        html += '</tr>';
    }

    tbody.innerHTML = html;
}

/**
 * Responder a una queja o reclamo (una sola vez) y cambiar estado
 */
function respondComplaintAdmin(complaintId) {
    var complaints = storageManager.getAllComplaints() || [];
    var complaint = null;
    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].id === complaintId) { complaint = complaints[i]; break; }
    }
    if (!complaint) { showNotification('Queja no encontrada', 'error'); return; }
    if (complaint.response && complaint.response.length > 0) { showNotification('Esta queja ya tiene respuesta', 'warning'); return; }

    // Crear modal simple
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'respondComplaintModal';
    modal.style.display = 'block';
    modal.innerHTML = '\n        <div class="modal-content large">\n            <span class="close">&times;</span>\n            <h2>Responder Queja/Reclamo #' + complaint.id + '</h2>\n            <p><strong>Tipo:</strong> ' + complaint.type + ' &nbsp; | &nbsp; <strong>Título:</strong> ' + complaint.subject + '</p>\n            <p style="background:#f7f7f7;padding:8px;border-radius:6px;"><strong>Descripción del huésped:</strong><br>' + complaint.description + '</p>\n            <form id="respondComplaintForm">\n                <div class="form-group">\n                    <label for="responseText">Respuesta del Administrador</label>\n                    <textarea id="responseText" required></textarea>\n                </div>\n                <div class="form-group">\n                    <label for="responseStatus">Estado</label>\n                    <select id="responseStatus" required>\n                        <option value="resolved">Resuelto</option>\n                        <option value="rejected">Rechazado</option>\n                    </select>\n                </div>\n                <div class="form-buttons">\n                    <button type="submit" class="btn-primary">Enviar Respuesta</button>\n                    <button type="button" class="btn-outline" onclick="closeRespondComplaintModal()">Cancelar</button>\n                </div>\n            </form>\n        </div>\n    ';
    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = function(){ modal.remove(); };
    modal.onclick = function(e){ if (e.target === modal) modal.remove(); };

    document.getElementById('respondComplaintForm').onsubmit = function(e){
        e.preventDefault();
        var text = document.getElementById('responseText').value.trim();
        var status = document.getElementById('responseStatus').value;
        if (!text) { showNotification('La respuesta es requerida', 'error'); return; }
        var updated = storageManager.respondComplaint(complaintId, text, status);
        if (updated) {
            showNotification('Respuesta registrada y estado actualizado', 'success');
            modal.remove();
            loadComplaints();
        } else {
            showNotification('No fue posible registrar la respuesta (ya existe)', 'warning');
        }
    };
}

function closeRespondComplaintModal() {
    var modal = document.getElementById('respondComplaintModal');
    if (modal) modal.remove();
}

/**
 * Función para actualizar el estado de una reserva
 * Solicita confirmación antes de proceder con el cambio
 * @param {number} reservationId - ID de la reserva a actualizar
 * @param {string} newStatus - Nuevo estado de la reserva (confirmed, cancelled, etc.)
 */
function updateReservationStatus(reservationId, newStatus) {
    var action = newStatus === 'confirmed' ? 'confirmar' : 'cancelar';
    
    // Solicitar confirmación al usuario
    if (confirm('¿Estás seguro de que quieres ' + action + ' esta reserva?')) {
        storageManager.updateReservationStatus(reservationId, newStatus);
        
        // Recargar la lista de reservas
        loadReservations();
        
        // Mostrar mensaje de éxito
        showNotification('Reserva ' + action + 'da exitosamente', 'success');
    }
}

/**
 * Función para modificar una reserva existente
 * Crea un modal dinámico con el formulario de edición precargado con los datos actuales
 * @param {number} reservationId - ID de la reserva a modificar
 */
function modifyReservationAdmin(reservationId) {
    // Obtener la reserva actual
    var reservations = storageManager.getData('reservations') || [];
    var reservation = null;
    var room = null;
    var user = null;
    
    // Buscar la reserva por ID
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id === reservationId) {
            reservation = reservations[i];
            break;
        }
    }
    
    // Si no se encuentra la reserva, mostrar error
    if (!reservation) {
        showNotification('Reserva no encontrada', 'error');
        return;
    }
    
    // Obtener información de la habitación y usuario
    var rooms = storageManager.getData('rooms') || [];
    var users = storageManager.getData('users') || [];
    
    // Buscar la habitación asociada
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === reservation.roomId) {
            room = rooms[i];
            break;
        }
    }
    
    // Buscar el usuario asociado
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === reservation.userId) {
            user = users[i];
            break;
        }
    }
    
    var roomName = room ? room.name : 'Habitación no encontrada';
    var userName = user ? user.name : 'Usuario no encontrado';
    
    // Crear modal de modificación dinámicamente
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modifyReservationModal';
    modal.style.display = 'block';
    
    // Generar opciones de habitaciones
    var roomOptions = '';
    for (var i = 0; i < rooms.length; i++) {
        var selected = rooms[i].id === reservation.roomId ? 'selected' : '';
        roomOptions += '<option value="' + rooms[i].id + '" ' + selected + '>' + rooms[i].name + ' - COP $' + rooms[i].pricePerNight.toLocaleString('es-CO') + '/noche</option>';
    }
    
    // Generar opciones de huéspedes
    var guestOptions = '';
    for (var i = 1; i <= 6; i++) {
        var selected = reservation.guests === i ? 'selected' : '';
        var text = i === 1 ? 'huésped' : 'huéspedes';
        guestOptions += '<option value="' + i + '" ' + selected + '>' + i + ' ' + text + '</option>';
    }
    
    // Crear el contenido HTML del modal con el formulario de modificación
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close">&times;</span>
            <h2>Modificar Reserva #${reservation.id}</h2>
            <div class="reservation-info">
                <p><strong>Cliente:</strong> ${userName}</p>
                <p><strong>Reserva actual:</strong> ${roomName}</p>
                <p><strong>Estado:</strong> ${reservation.status}</p>
            </div>
            
            <form id="modifyReservationForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="modifyRoomId">Habitación:</label>
                        <select id="modifyRoomId" required>
                            ${roomOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="modifyCheckIn">Fecha de entrada:</label>
                        <input type="date" id="modifyCheckIn" value="${reservation.checkIn}" required>
                    </div>
                    <div class="form-group">
                        <label for="modifyCheckOut">Fecha de salida:</label>
                        <input type="date" id="modifyCheckOut" value="${reservation.checkOut}" required>
                    </div>
                    <div class="form-group">
                        <label for="modifyGuests">Número de Huéspedes:</label>
                        <select id="modifyGuests" required>
                            ${guestOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="modifyStatus">Estado de la Reserva:</label>
                        <select id="modifyStatus" required>
                            <option value="pending" ${reservation.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                            <option value="confirmed" ${reservation.status === 'confirmed' ? 'selected' : ''}>Confirmada</option>
                            <option value="cancelled" ${reservation.status === 'cancelled' ? 'selected' : ''}>Cancelada</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="modifyNotes">Notas adicionales:</label>
                    <textarea id="modifyNotes" rows="3">${reservation.notes || ''}</textarea>
                </div>
                
                <div class="form-buttons">
                    <button type="submit" class="btn-primary">Guardar Cambios</button>
                    <button type="button" class="btn-outline" onclick="closeModifyModal()">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    // Agregar el modal al DOM
    document.body.appendChild(modal);
    
    // Configurar evento para cerrar el modal con el botón X
    var closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    // Configurar evento para cerrar el modal al hacer clic fuera del contenido
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
    
    // Configurar fechas mínimas para los campos de fecha
    var checkInInput = document.getElementById('modifyCheckIn');
    var checkOutInput = document.getElementById('modifyCheckOut');
    
    // Fecha mínima para check-in es hoy
    var today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    
    // Fecha mínima para check-out es mañana
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOutInput.min = tomorrow.toISOString().split('T')[0];
    
    // Validar fechas cuando cambia el check-in
    checkInInput.onchange = function() {
        var checkInDate = new Date(checkInInput.value);
        var nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        // Si la fecha de check-out actual es inválida, limpiarla
        if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
            checkOutInput.value = '';
        }
    };
    
    /**
     * Manejador del envío del formulario de modificación de reserva
     * Valida los datos y actualiza la reserva en el sistema
     */
    document.getElementById('modifyReservationForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Recopilar los nuevos datos del formulario
        var newRoomId = parseInt(document.getElementById('modifyRoomId').value);
        var newCheckIn = document.getElementById('modifyCheckIn').value;
        var newCheckOut = document.getElementById('modifyCheckOut').value;
        var newGuests = parseInt(document.getElementById('modifyGuests').value);
        var newStatus = document.getElementById('modifyStatus').value;
        var newNotes = document.getElementById('modifyNotes').value;
        
        // Validar que la fecha de salida sea posterior a la de entrada
        if (new Date(newCheckOut) <= new Date(newCheckIn)) {
            showNotification('La fecha de salida debe ser posterior a la fecha de entrada', 'error');
            return;
        }
        
        // Validar que la fecha de entrada no sea en el pasado
        if (new Date(newCheckIn) < new Date().setHours(0, 0, 0, 0)) {
            showNotification('La fecha de entrada no puede ser anterior a hoy', 'error');
            return;
        }
        
        // Verificar que la nueva habitación tenga capacidad suficiente
        var selectedRoom = null;
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].id === newRoomId) {
                selectedRoom = rooms[i];
                break;
            }
        }
        
        if (selectedRoom && selectedRoom.capacity < newGuests) {
            showNotification('La habitación seleccionada no tiene capacidad para ' + newGuests + ' huéspedes', 'error');
            return;
        }
        
        // Verificar disponibilidad de la nueva habitación en las nuevas fechas
        if (newRoomId !== reservation.roomId || newCheckIn !== reservation.checkIn || newCheckOut !== reservation.checkOut) {
            // Verificar solapamiento manualmente excluyendo la reserva actual
            var allReservations = storageManager.getData('reservations') || [];
            var conflictingReservations = allReservations.filter(function(res) {
                return res.id !== reservationId && // Excluir la reserva actual
                       res.roomId === newRoomId &&
                       (res.status === 'confirmed' || res.status === 'pending') &&
                       storageManager.datesOverlap(newCheckIn, newCheckOut, res.checkIn, res.checkOut);
            });
            
            if (conflictingReservations.length > 0) {
                var conflictRes = conflictingReservations[0];
                var conflictCheckIn = new Date(conflictRes.checkIn).toLocaleDateString();
                var conflictCheckOut = new Date(conflictRes.checkOut).toLocaleDateString();
                showNotification('La habitación ya está reservada del ' + conflictCheckIn + ' al ' + conflictCheckOut, 'error');
                return;
            }
        }
        
        // Calcular nuevas noches y precio
        var newNights = Math.ceil((new Date(newCheckOut) - new Date(newCheckIn)) / (1000 * 60 * 60 * 24));
        var newTotalPrice = newNights * selectedRoom.pricePerNight;
        
        // Crear objeto con los datos actualizados
        var updatedData = {
            roomId: newRoomId,
            checkIn: newCheckIn,
            checkOut: newCheckOut,
            guests: newGuests,
            nights: newNights,
            totalPrice: newTotalPrice,
            status: newStatus,
            notes: newNotes,
            updatedAt: new Date().toISOString()
        };
        
        // Actualizar la reserva en el sistema
        var success = storageManager.updateReservation(reservationId, updatedData);
        
        if (success) {
            var message = 'Reserva modificada exitosamente';
            
            // Si se canceló la reserva, informar sobre la disponibilidad
            if (newStatus === 'cancelled' && reservation.status !== 'cancelled') {
                message += '. La ' + selectedRoom.name + ' vuelve a estar disponible.';
            }
            
            showNotification(message, 'success');
            modal.remove();
            loadReservations();
        } else {
            showNotification('Error al modificar la reserva', 'error');
        }
    };
}

/**
 * Función para cerrar el modal de modificación de reserva
 */
function closeModifyModal() {
    var modal = document.getElementById('modifyReservationModal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Función para eliminar permanentemente una reserva del sistema
 * Esta acción no solicita confirmación y elimina la reserva inmediatamente
 * @param {number} reservationId - ID de la reserva a eliminar
 */
function deleteReservationAdmin(reservationId) {
    // Obtener información de la reserva antes de eliminarla
    var reservations = storageManager.getData('reservations') || [];
    var rooms = storageManager.getData('rooms') || [];
    var users = storageManager.getData('users') || [];
    
    var reservation = null;
    var room = null;
    var user = null;
    
    // Buscar la reserva por ID
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id === reservationId) {
            reservation = reservations[i];
            break;
        }
    }
    
    // Si no se encuentra la reserva, mostrar error
    if (!reservation) {
        showNotification('Reserva no encontrada', 'error');
        return;
    }
    
    // Obtener información de la habitación
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === reservation.roomId) {
            room = rooms[i];
            break;
        }
    }
    
    // Obtener información del usuario
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === reservation.userId) {
            user = users[i];
            break;
        }
    }
    
    var roomName = room ? room.name : 'Habitación no encontrada';
    var userName = user ? user.name : 'Usuario no encontrado';
    
    // Eliminar la reserva del array
    var updatedReservations = reservations.filter(function(res) {
        return res.id !== reservationId;
    });
    
    // Guardar la lista actualizada
    storageManager.setData('reservations', updatedReservations);
    
    // Mostrar mensaje de éxito
    showNotification('Reserva eliminada permanentemente', 'success');
    
    // Recargar la lista de reservas
    loadReservations();
}
