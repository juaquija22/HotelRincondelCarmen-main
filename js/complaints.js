/**
 * MÓDULO DE QUEJAS Y RECLAMOS (Huésped)
 */

document.addEventListener('DOMContentLoaded', function() {
    initComplaints();
});

function initComplaints() {
    // Verificar sesión
    var user = JSON.parse(localStorage.getItem('current_user'));
    if (!user) {
        showNotification('Debes iniciar sesión para gestionar tus quejas o reclamos', 'warning');
        if (window.authManager && window.authManager.showLoginModal) {
            setTimeout(function(){ window.authManager.showLoginModal(); }, 500);
        }
    }

    bindComplaintForm();
    loadUserComplaints();
    loadUserReservationsForSelect();
}

function bindComplaintForm() {
    var form = document.getElementById('complaintForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleCreateComplaint();
    });
}

function loadUserReservationsForSelect() {
    var user = JSON.parse(localStorage.getItem('current_user'));
    var select = document.getElementById('complaintReservation');
    if (!select) return;

    select.innerHTML = '';

    if (!user) {
        var opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'Inicia sesión para ver tus reservas';
        select.appendChild(opt);
        select.disabled = true;
        return;
    }

    var reservations = storageManager.getReservationsByUser(user.id);
    if (reservations.length === 0) {
        var opt2 = document.createElement('option');
        opt2.value = '';
        opt2.textContent = 'No tienes reservas';
        select.appendChild(opt2);
        select.disabled = true;
        return;
    }

    select.disabled = false;
    for (var i = 0; i < reservations.length; i++) {
        var r = reservations[i];
        var room = storageManager.getRoomById(r.roomId);
        var label = (room ? room.name : 'Habitación #' + r.roomId) + ' (' + new Date(r.checkIn).toLocaleDateString('es-CO') + ' - ' + new Date(r.checkOut).toLocaleDateString('es-CO') + ')';
        var optR = document.createElement('option');
        optR.value = r.id;
        optR.textContent = label;
        select.appendChild(optR);
    }
}

function handleCreateComplaint() {
    var user = JSON.parse(localStorage.getItem('current_user'));
    if (!user) {
        showNotification('Debes iniciar sesión', 'error');
        return;
    }

    var reservationId = parseInt(document.getElementById('complaintReservation').value);
    var subject = document.getElementById('complaintSubject').value.trim();
    var type = document.getElementById('complaintType').value;
    var description = document.getElementById('complaintDescription').value.trim();

    if (!reservationId || !subject || !type || !description) {
        showNotification('Completa todos los campos', 'error');
        return;
    }

    if (description.length < 10) {
        showNotification('La descripción debe tener al menos 10 caracteres', 'error');
        return;
    }

    try {
        storageManager.addComplaint({
            userId: user.id,
            reservationId: reservationId,
            subject: subject,
            type: type,
            description: description
        });
        showNotification('Tu queja/reclamo fue radicado en estado pendiente', 'success');
        document.getElementById('complaintForm').reset();
        loadUserComplaints();
    } catch (e) {
        console.error(e);
        showNotification('No se pudo radicar la queja/reclamo', 'error');
    }
}

function loadUserComplaints() {
    var list = document.getElementById('complaintsList');
    if (!list) return;
    var user = JSON.parse(localStorage.getItem('current_user'));

    if (!user) {
        list.innerHTML = '<div class="empty-state"><i class="fas fa-user-lock"></i><h3>Inicia sesión</h3><p>Debes iniciar sesión para ver tus quejas o reclamos.</p></div>';
        return;
    }

    var complaints = storageManager.getComplaintsByUser(user.id);
    if (complaints.length === 0) {
        list.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><h3>No tienes quejas ni reclamos</h3><p>Cuando registres uno, aparecerá aquí.</p></div>';
        return;
    }

    var html = '';
    for (var i = 0; i < complaints.length; i++) {
        var c = complaints[i];
        var reservation = (storageManager.getData('reservations') || []).find(function(r){ return r.id === c.reservationId; });
        var room = reservation ? storageManager.getRoomById(reservation.roomId) : null;
        var statusClass = c.status === 'pending' ? 'status-pending' : (c.status === 'resolved' ? 'status-resolved' : 'status-rejected');
        var canDelete = c.status !== 'resolved';
        var responseBlock = c.response && c.response.length > 0 ? ('<div class="info"><strong>Respuesta del administrador:</strong><br>' + c.response + '</div>') : '<div class="info"><em>Sin respuesta aún</em></div>';

        html += '<div class="complaint-card">';
        html += '<div class="complaint-header">';
        html += '<div><strong>' + c.type + ':</strong> ' + c.subject + '</div>';
        html += '<span class="status-badge ' + statusClass + '">' + (c.status === 'pending' ? 'Pendiente' : (c.status === 'resolved' ? 'Resuelto' : 'Rechazado')) + '</span>';
        html += '</div>';
        html += '<div class="complaint-meta">';
        html += '<i class="fas fa-calendar"></i> ' + new Date(c.createdAt).toLocaleDateString('es-CO');
        if (room) html += ' · <i class="fas fa-bed"></i> ' + room.name;
        html += '</div>';
        html += '<p style="margin-top:8px;">' + c.description + '</p>';
        html += responseBlock;
        html += '<div class="complaint-actions">';
        if (canDelete) {
            html += '<button class="btn-danger" onclick="deleteComplaintUser(' + c.id + ')"><i class="fas fa-trash"></i> Eliminar</button>';
        }
        html += '</div>';
        html += '</div>';
    }

    list.innerHTML = html;
}

function deleteComplaintUser(id) {
    var complaints = storageManager.getAllComplaints();
    var c = null;
    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].id === id) { c = complaints[i]; break; }
    }
    if (!c) return;
    if (c.status === 'resolved') {
        showNotification('No puedes eliminar quejas/reclamos resueltos', 'warning');
        return;
    }
    storageManager.deleteComplaint(id);
    showNotification('Queja/Reclamo eliminado', 'success');
    loadUserComplaints();
}

