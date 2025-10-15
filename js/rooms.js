/**
 * Gestión de habitaciones para el Hotel el Rincón del Carmen
 * Maneja la visualización y gestión de habitaciones
 */

class RoomManager {
    constructor() {
        this.init();
    }

    /**
     * Inicializa el gestor de habitaciones
     */
    init() {
        // this.loadRoomsCarousel(); // Desactivado - ahora las habitaciones están en HTML estático
        this.bindEvents();
    }

    /**
     * Vincula eventos relacionados con habitaciones
     */
    bindEvents() {
        // Eventos de búsqueda
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchAvailableRooms();
            });
        }

        // Eventos de detalles de habitación
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-room-details')) {
                e.preventDefault();
                const roomId = e.target.dataset.roomId;
                this.showRoomDetails(roomId);
            }
        });

        // Eventos de reserva
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('reserve-room')) {
                e.preventDefault();
                const roomId = e.target.dataset.roomId;
                this.showReservationModal(roomId);
            }
        });
    }

    /* Métodos loadRoomsCarousel y createRoomCard eliminados - no se utilizan */

    /**
     * Busca habitaciones disponibles
     */
    searchAvailableRooms() {
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const guests = parseInt(document.getElementById('guests').value);

        // Validaciones
        if (!checkIn || !checkOut) {
            this.showError('Por favor selecciona las fechas de entrada y salida');
            return;
        }

        if (new Date(checkIn) >= new Date(checkOut)) {
            this.showError('La fecha de salida debe ser posterior a la fecha de entrada');
            return;
        }

        if (new Date(checkIn) < new Date().setHours(0, 0, 0, 0)) {
            this.showError('La fecha de entrada no puede ser anterior a hoy');
            return;
        }

        // Buscar habitaciones disponibles
        const availableRooms = storageManager.getAvailableRooms(checkIn, checkOut, guests);
        this.displayAvailableRooms(availableRooms, checkIn, checkOut, guests);
    }

    /**
     * Muestra las habitaciones disponibles
     */
    displayAvailableRooms(rooms, checkIn, checkOut, guests) {
        const resultsSection = document.getElementById('resultsSection');
        const availableRoomsContainer = document.getElementById('availableRooms');

        if (!resultsSection || !availableRoomsContainer) return;

        if (rooms.length === 0) {
            availableRoomsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bed"></i>
                    <h3>No hay habitaciones disponibles</h3>
                    <p>No encontramos habitaciones disponibles para las fechas y número de huéspedes seleccionados.</p>
                    <p>Intenta con otras fechas o un número menor de huéspedes.</p>
                </div>
            `;
        } else {
            const totalNights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
            
            availableRoomsContainer.innerHTML = rooms.map(room => {
                const priceCalculation = storageManager.calculateTotalPrice(room, checkIn, checkOut, guests);
                const totalPrice = priceCalculation.totalPrice;
                const services = this.getServiceIcons(room.services);
                
                return `
                    <div class="room-card card-hover">
                        <img src="${room.image}" alt="Habitación ${room.number}" class="room-image">
                        <div class="room-content">
                            <h3 class="room-title">Habitación ${room.number}</h3>
                            <div class="room-price">COP $${room.pricePerNight.toLocaleString('es-CO')}/noche</div>
                            <div class="room-total-price">
                                <strong>Total ${totalNights} ${totalNights === 1 ? 'noche' : 'noches'}: COP $${totalPrice.toLocaleString('es-CO')}</strong>
                            </div>
                            <ul class="room-features">
                                <li>Máximo ${room.maxGuests} huéspedes</li>
                                <li>${room.beds} ${room.beds === 1 ? 'cama' : 'camas'}</li>
                                <li>${this.getRoomTypeName(room.type)}</li>
                            </ul>
                            <div class="room-services">
                                ${services}
                            </div>
                            <p class="room-description">${room.description}</p>
                            <div class="room-actions">
                                <button class="btn-outline view-room-details" data-room-id="${room.id}">
                                    Ver Detalles
                                </button>
                                <button class="btn-primary reserve-room" data-room-id="${room.id}">
                                    Reservar Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Muestra los detalles de una habitación
     */
    showRoomDetails(roomId) {
        const room = storageManager.getRoomById(roomId);
        if (!room) return;

        const modal = document.getElementById('roomDetailsModal');
        const content = document.getElementById('roomDetailsContent');
        
        if (!modal || !content) return;

        const services = this.getServiceList(room.services);
        
        content.innerHTML = `
            <div class="room-details-header">
                <img src="${room.image}" alt="Habitación ${room.number}" class="room-details-image">
                <div class="room-details-info">
                    <h3>Habitación ${room.number}</h3>
                    <div class="room-details-price">COP $${room.pricePerNight.toLocaleString('es-CO')}/noche</div>
                    <ul class="room-details-features">
                        <li><strong>Tipo:</strong> ${this.getRoomTypeName(room.type)}</li>
                        <li><strong>Máximo de huéspedes:</strong> ${room.maxGuests}</li>
                        <li><strong>Camas:</strong> ${room.beds} ${room.beds === 1 ? 'cama' : 'camas'}</li>
                    </ul>
                    <div class="room-details-description">
                        <strong>Descripción:</strong><br>
                        ${room.description}
                    </div>
                    <div class="room-details-services">
                        <strong>Servicios incluidos:</strong>
                        <ul class="room-details-features">
                            ${services.map(service => `<li>${service}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="room-details-actions">
                <button class="btn-outline" onclick="this.closest('.modal').style.display='none'">
                    Cerrar
                </button>
                <button class="btn-primary reserve-room" data-room-id="${room.id}">
                    Reservar Esta Habitación
                </button>
            </div>
        `;

        modal.style.display = 'block';
    }

    /**
     * Muestra el modal de reserva
     */
    showReservationModal(roomId) {
        if (!authManager.isAuthenticated()) {
            authManager.showLoginModal();
            return;
        }

        const room = storageManager.getRoomById(roomId);
        if (!room) return;

        const checkIn = document.getElementById('checkIn')?.value;
        const checkOut = document.getElementById('checkOut')?.value;
        const guests = parseInt(document.getElementById('guests')?.value || '1');

        if (!checkIn || !checkOut) {
            this.showError('Por favor selecciona las fechas de entrada y salida primero');
            return;
        }

        const modal = document.getElementById('reservationModal');
        const summary = document.getElementById('reservationSummary');
        
        if (!modal || !summary) return;

        const priceCalculation = storageManager.calculateTotalPrice(room, checkIn, checkOut, guests);
        const totalNights = priceCalculation.nights;
        const totalPrice = priceCalculation.totalPrice;

        summary.innerHTML = `
            <h3>Resumen de Reserva</h3>
            <div class="reservation-summary-item">
                <span>Habitación:</span>
                <span>${room.number} - ${this.getRoomTypeName(room.type)}</span>
            </div>
            <div class="reservation-summary-item">
                <span>Check-in:</span>
                <span>${new Date(checkIn).toLocaleDateString('es-CO')}</span>
            </div>
            <div class="reservation-summary-item">
                <span>Check-out:</span>
                <span>${new Date(checkOut).toLocaleDateString('es-CO')}</span>
            </div>
            <div class="reservation-summary-item">
                <span>Noches:</span>
                <span>${totalNights}</span>
            </div>
            <div class="reservation-summary-item">
                <span>Huéspedes:</span>
                <span>${guests}</span>
            </div>
            <div class="reservation-summary-item">
                <span>Precio por noche:</span>
                <span>COP $${room.pricePerNight.toLocaleString('es-CO')}</span>
            </div>
            <div class="reservation-summary-item">
                <span>Total:</span>
                <span>COP $${totalPrice.toLocaleString('es-CO')}</span>
            </div>
            ${priceCalculation.additionalGuests > 0 ? `
            <div class="reservation-summary-item price-breakdown">
                <span>Desglose:</span>
                <div class="breakdown-details">
                    <div>Precio base: ${totalNights} noches × COP $${room.pricePerNight.toLocaleString('es-CO')} = COP $${(room.pricePerNight * totalNights).toLocaleString('es-CO')}</div>
                    <div>Recargo por ${priceCalculation.additionalGuests} ${priceCalculation.additionalGuests === 1 ? 'persona adicional' : 'personas adicionales'}: COP $${(priceCalculation.surchargePerGuest * priceCalculation.additionalGuests * totalNights).toLocaleString('es-CO')}</div>
                </div>
            </div>
            ` : ''}
        `;

        modal.style.display = 'block';

        // Configurar el formulario de reserva
        const form = document.getElementById('reservationForm');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                this.processReservation(roomId, checkIn, checkOut, guests);
            };
        }
    }

    /**
     * Procesa la reserva
     */
    processReservation(roomId, checkIn, checkOut, guests) {
        try {
            const user = authManager.getCurrentUser();
            
            // Verificar si el usuario es admin (los admins no pueden hacer reservas)
            if (user && user.role === 'admin') {
                this.showError('Los administradores no pueden hacer reservas. Usa el Panel de Administración para gestionar reservas.');
                return;
            }
            
            // Verificar disponibilidad con validación mejorada
            const isAvailable = this.checkRoomAvailability(roomId, checkIn, checkOut, guests);
            if (!isAvailable.available) {
                this.showError(isAvailable.reason || 'Lo sentimos, esta habitación ya no está disponible para las fechas seleccionadas');
                return;
            }

            const notes = document.getElementById('reservationNotes').value;

            // Calcular precio total usando la nueva función
            const room = storageManager.getRoomById(roomId);
            const priceCalculation = storageManager.calculateTotalPrice(room, checkIn, checkOut, guests);

            const reservationData = {
                roomId: roomId,
                userId: user.id,
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests,
                notes: notes,
                totalPrice: priceCalculation.totalPrice,
                nights: priceCalculation.nights,
                basePrice: priceCalculation.basePrice,
                additionalGuests: priceCalculation.additionalGuests,
                surchargePerGuest: priceCalculation.surchargePerGuest,
                priceBreakdown: priceCalculation.breakdown
            };

            const reservation = storageManager.addReservation(reservationData);
            
            this.closeModal(document.getElementById('reservationModal'));
            this.showSuccess('¡Reserva confirmada exitosamente!');
            
            // Actualizar la interfaz
            if (authManager.loadUserReservations) {
                authManager.loadUserReservations();
            }

        } catch (error) {
            console.error('Error al procesar reserva:', error);
            this.showError('Error al procesar la reserva. Por favor intenta nuevamente.');
        }
    }

    /**
     * Cierra un modal
     */
    closeModal(modal) {
        modal.style.display = 'none';
    }

    /**
     * Obtiene los iconos de servicios
     */
    getServiceIcons(services) {
        const serviceIcons = {
            'wifi': '<i class="fas fa-wifi" title="WiFi Gratuito"></i>',
            'tv': '<i class="fas fa-tv" title="TV por Cable"></i>',
            'ac': '<i class="fas fa-snowflake" title="Aire Acondicionado"></i>',
            'minibar': '<i class="fas fa-wine-bottle" title="Minibar"></i>',
            'jacuzzi': '<i class="fas fa-hot-tub" title="Jacuzzi"></i>',
            'balcony': '<i class="fas fa-door-open" title="Balcón"></i>',
            'roomservice': '<i class="fas fa-concierge-bell" title="Room Service"></i>',
            'safe': '<i class="fas fa-lock" title="Caja Fuerte"></i>'
        };

        return services.map(service => serviceIcons[service] || '').join(' ');
    }

    /**
     * Obtiene la lista de servicios
     */
    getServiceList(services) {
        const serviceNames = {
            'wifi': 'WiFi Gratuito',
            'tv': 'TV por Cable',
            'ac': 'Aire Acondicionado',
            'minibar': 'Minibar',
            'jacuzzi': 'Jacuzzi',
            'balcony': 'Balcón',
            'roomservice': 'Room Service',
            'safe': 'Caja Fuerte'
        };

        return services.map(service => serviceNames[service] || service);
    }

    /**
     * Obtiene el nombre del tipo de habitación
     */
    getRoomTypeName(type) {
        const types = {
            'standard': 'Estándar',
            'deluxe': 'Deluxe',
            'suite': 'Suite',
            'presidential': 'Presidencial'
        };
        return types[type] || type;
    }

    /**
     * Muestra un mensaje de error
     */
    showError(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-error';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 3000;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle"></i> ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    /**
     * Muestra un mensaje de éxito
     */
    showSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 3000;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i> ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    /**
     * Verifica la disponibilidad de una habitación específica con validación mejorada
     */
    checkRoomAvailability(roomId, checkIn, checkOut, guests) {
        try {
            // Validar fechas
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Verificar que las fechas sean válidas
            if (checkInDate >= checkOutDate) {
                return {
                    available: false,
                    reason: 'La fecha de salida debe ser posterior a la fecha de entrada'
                };
            }

            // Verificar que la fecha de entrada no sea en el pasado
            if (checkInDate < today) {
                return {
                    available: false,
                    reason: 'La fecha de entrada no puede ser en el pasado'
                };
            }

            // Obtener la habitación
            const room = storageManager.getRoomById(roomId);
            if (!room) {
                return {
                    available: false,
                    reason: 'Habitación no encontrada'
                };
            }

            // Verificar capacidad
            if (room.capacity < guests) {
                return {
                    available: false,
                    reason: `Esta habitación tiene capacidad para máximo ${room.capacity} ${room.capacity === 1 ? 'persona' : 'personas'}`
                };
            }

            // Verificar disponibilidad contra reservas existentes
            const reservations = storageManager.getData('reservations') || [];
            const activeReservations = reservations.filter(res => 
                res.roomId === roomId && 
                (res.status === 'confirmed' || res.status === 'pending')
            );

            // Verificar solapamiento de fechas
            for (let reservation of activeReservations) {
                const resCheckIn = new Date(reservation.checkIn);
                const resCheckOut = new Date(reservation.checkOut);
                
                // Verificar solapamiento
                if (checkInDate < resCheckOut && checkOutDate > resCheckIn) {
                    return {
                        available: false,
                        reason: `Esta habitación ya está reservada del ${resCheckIn.toLocaleDateString()} al ${resCheckOut.toLocaleDateString()}`
                    };
                }
            }

            return {
                available: true,
                reason: 'Habitación disponible'
            };

        } catch (error) {
            console.error('Error verificando disponibilidad:', error);
            return {
                available: false,
                reason: 'Error al verificar disponibilidad. Intenta nuevamente.'
            };
        }
    }
}

// Crear instancia global del gestor de habitaciones
window.roomManager = new RoomManager();
