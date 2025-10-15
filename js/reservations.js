/**
 * Gestión de reservas para el Hotel el Rincón del Carmen
 * Maneja la lógica de reservas y disponibilidad
 */

class ReservationManager {
    constructor() {
        this.init();
    }

    /**
     * Inicializa el gestor de reservas
     */
    init() {
        this.bindEvents();
        this.setupDateInputs();
    }

    /**
     * Vincula eventos relacionados con reservas
     */
    bindEvents() {
        // Eventos de búsqueda
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            console.log('Botón de búsqueda encontrado, agregando evento...');
            searchBtn.addEventListener('click', () => {
                console.log('Botón de búsqueda clickeado');
                this.searchAvailableRooms();
            });
        } else {
            console.error('Botón de búsqueda no encontrado');
        }

        // Eventos de formulario de contacto
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm();
            });
        }

        // Eventos de reserva (usando delegación de eventos)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('reserve-room')) {
                const roomId = parseInt(e.target.getAttribute('data-room-id'));
                this.handleReservation(roomId);
            }
            
            if (e.target.classList.contains('view-room-details')) {
                const roomId = parseInt(e.target.getAttribute('data-room-id'));
                this.showRoomDetails(roomId);
            }
            
            // Cerrar modal de detalles
            if (e.target.classList.contains('close') || e.target.id === 'roomDetailsModal') {
                const modal = document.getElementById('roomDetailsModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            }
        });
    }

    /**
     * Configura los inputs de fecha
     */
    setupDateInputs() {
        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');

        if (checkInInput) {
            // Establecer fecha mínima como hoy
            const today = new Date().toISOString().split('T')[0];
            checkInInput.min = today;

            // Actualizar fecha mínima de salida cuando cambie la fecha de entrada
            checkInInput.addEventListener('change', () => {
                if (checkOutInput) {
                    const checkInDate = new Date(checkInInput.value);
                    const nextDay = new Date(checkInDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    checkOutInput.min = nextDay.toISOString().split('T')[0];
                    
                    // Si la fecha de salida es anterior a la nueva fecha mínima, limpiarla
                    if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
                        checkOutInput.value = '';
                    }
                }
            });
        }

        if (checkOutInput) {
            // Establecer fecha mínima como mañana
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            checkOutInput.min = tomorrow.toISOString().split('T')[0];
        }
    }

    /**
     * Busca habitaciones disponibles
     */
    searchAvailableRooms() {
        console.log('Iniciando búsqueda...');
        
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const guests = parseInt(document.getElementById('guests').value) || 2;

        console.log('Datos:', { checkIn, checkOut, guests });

        // Validaciones
        if (!checkIn) {
            this.showError('Por favor selecciona la fecha de entrada');
            return;
        }

        if (!checkOut) {
            this.showError('Por favor selecciona la fecha de salida');
            return;
        }

        if (new Date(checkIn) < new Date().setHours(0, 0, 0, 0)) {
            this.showError('La fecha de entrada no puede ser anterior a hoy');
            return;
        }

        if (new Date(checkOut) <= new Date(checkIn)) {
            this.showError('La fecha de salida debe ser posterior a la fecha de entrada');
            return;
        }

        // Calcular noches automáticamente
        const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        console.log('Noches calculadas automáticamente:', nights);

        // Verificar que storageManager existe
        if (typeof storageManager === 'undefined') {
            console.error('storageManager no está definido');
            this.showError('Error: Sistema de almacenamiento no disponible');
            return;
        }

        // Buscar habitaciones disponibles
        const availableRooms = storageManager.getAvailableRooms(checkIn, checkOut, guests);
        console.log('Habitaciones encontradas:', availableRooms);
        
        this.displayAvailableRooms(availableRooms, checkIn, checkOut, guests, nights);
    }

    /**
     * Muestra las habitaciones disponibles
     */
    displayAvailableRooms(rooms, checkIn, checkOut, guests, nights) {
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
            const totalNights = nights || Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
            
            availableRoomsContainer.innerHTML = rooms.map(room => {
                const priceCalculation = storageManager.calculateTotalPrice(room, checkIn, checkOut, guests);
                const totalPrice = priceCalculation.totalPrice;
                const services = this.getServiceIcons(room.services);
                const suiteUrl = this.getSuiteUrl(room.name);
                
                // Generar badges para suites premium
                let badges = '';
                if (room.freeBreakfast) badges += '<span class="room-badge breakfast"><i class="fas fa-coffee"></i> Desayuno</span>';
                if (room.transferIncluded) badges += '<span class="room-badge transfer"><i class="fas fa-car"></i> Transporte Incluido</span>';
                if (room.freeCancellation) badges += '<span class="room-badge cancellation"><i class="fas fa-check-circle"></i> Cancelación Gratuita</span>';
                
                // Generar lista de beneficios si existen
                let benefitsList = '';
                if (room.benefits && room.benefits.length > 0) {
                    benefitsList = `
                        <div class="room-benefits">
                            <h4>Incluye:</h4>
                            <ul>
                                ${room.benefits.slice(0, 4).map(benefit => `<li><i class="fas fa-check"></i> ${benefit}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                return `
                    <div class="room-card ${room.flexibleRate ? 'premium-suite' : ''}">
                        <div class="room-image">
                            <img src="${room.images[0]}" alt="${room.name}">
                            ${room.flexibleRate ? '<div class="flexible-badge">Tarifa Flexible</div>' : ''}
                        </div>
                        
                        <div class="room-info">
                            ${badges ? `<div class="room-badges">${badges}</div>` : ''}
                            
                            <h3 class="room-name">${room.name}</h3>
                            
                            <div class="room-price-section">
                                <span class="price-night">COP $${room.pricePerNight.toLocaleString('es-CO')}/noche</span>
                                <span class="price-total">Total ${totalNights} ${totalNights === 1 ? 'noche' : 'noches'}: COP $${totalPrice.toLocaleString('es-CO')}</span>
                                <span class="price-note">incluye todos los impuestos</span>
                            </div>
                            
                            <div class="room-specs">
                                <div class="spec">
                                    <i class="fas fa-users"></i>
                                    <span>${room.capacity} huéspedes</span>
                                </div>
                                <div class="spec">
                                    <i class="fas fa-bed"></i>
                                    <span>${room.beds} ${room.beds === 1 ? 'cama' : 'camas'}</span>
                                </div>
                                <div class="spec">
                                    <i class="fas fa-crown"></i>
                                    <span>${this.getRoomTypeName(room.type)}</span>
                                </div>
                            </div>
                            
                            ${benefitsList}
                            
                            <div class="room-buttons">
                                <button class="btn-details" onclick="window.location.href='${suiteUrl}'">VER DETALLES</button>
                                <button class="btn-reserve reserve-room" data-room-id="${room.id}">RESERVAR AHORA</button>
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
     * Maneja el formulario de contacto
     */
    handleContactForm() {
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };

        // Validaciones
        if (!this.validateContactForm(formData)) {
            return;
        }

        try {
            storageManager.addContactMessage(formData);
            this.showSuccess('Mensaje enviado exitosamente. Te contactaremos pronto.');
            document.getElementById('contactForm').reset();
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            this.showError('Error al enviar el mensaje. Por favor intenta nuevamente.');
        }
    }

    /**
     * Valida el formulario de contacto
     */
    validateContactForm(data) {
        const errors = [];

        if (!data.name || data.name.length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Ingresa un email válido');
        }

        if (!data.subject) {
            errors.push('Por favor selecciona un asunto');
        }

        if (!data.message || data.message.length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }

        if (errors.length > 0) {
            this.showError(errors.join('<br>'));
            return false;
        }

        return true;
    }

    /**
     * Valida formato de email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
     * Obtiene el nombre del tipo de habitación
     */
    getRoomTypeName(type) {
        const types = {
            'standard': 'Estándar',
            'deluxe': 'Deluxe',
            'suite': 'Suite',
            'villa': 'Villa',
            'presidential': 'Presidencial'
        };
        return types[type] || type;
    }

    getSuiteUrl(roomName) {
        const suiteUrls = {
            'Suite Icónica': 'suite-detail.html',
            'Suite Mítica': 'suite-mitica.html',
            'Suite Épica': 'suite-epica.html',
            'Suite Majestic': 'suite-majestic.html',
            'Suite Elementos': 'suite-elementos.html',
            'The Saint Suite': 'suite-santa.html',
            'The One Suite': 'suite-villa-santo.html'
        };
        return suiteUrls[roomName] || 'suites.html';
    }

    /**
     * Formatea las amenidades para mostrar
     */
    formatAmenities(amenities) {
        if (!amenities || amenities.length === 0) return '';
        
        return `
            <ul class="amenities-list">
                ${amenities.map(amenity => `<li>• ${amenity}</li>`).join('')}
            </ul>
        `;
    }

    /**
     * Maneja el proceso de reserva
     */
    handleReservation(roomId) {
        // Verificar si el usuario está logueado
        const currentUser = JSON.parse(localStorage.getItem('current_user'));
        if (!currentUser) {
            this.showError('Debes iniciar sesión para hacer una reserva');
            if (window.authManager && window.authManager.showLoginModal) {
                setTimeout(() => window.authManager.showLoginModal(), 500);
            }
            return;
        }

        // Verificar si el usuario es admin (los admins no pueden hacer reservas)
        if (currentUser.role === 'admin') {
            this.showError('Los administradores no pueden hacer reservas. Usa el Panel de Administración para gestionar reservas.');
            return;
        }

        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const guests = parseInt(document.getElementById('guests').value) || 2;

        if (!checkIn || !checkOut) {
            this.showError('Por favor selecciona las fechas de entrada y salida');
            return;
        }

        // Verificar disponibilidad antes de crear la reserva
        const availabilityCheck = this.checkRoomAvailability(roomId, checkIn, checkOut, guests);
        if (!availabilityCheck.available) {
            this.showError(availabilityCheck.reason);
            return;
        }

        // Calcular noches automáticamente
        const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

        // Calcular precio total usando la nueva función
        const room = storageManager.getRoomById(roomId);
        const priceCalculation = storageManager.calculateTotalPrice(room, checkIn, checkOut, guests);

        // Crear la reserva
        const reservationData = {
            userId: currentUser.id,
            roomId: roomId,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests,
            nights: priceCalculation.nights,
            status: 'pending',
            totalPrice: priceCalculation.totalPrice,
            basePrice: priceCalculation.basePrice,
            additionalGuests: priceCalculation.additionalGuests,
            surchargePerGuest: priceCalculation.surchargePerGuest,
            priceBreakdown: priceCalculation.breakdown
        };

        try {
            const newReservation = storageManager.addReservation(reservationData);
            this.showSuccess('¡Reserva creada exitosamente!');
            
            setTimeout(() => {
                document.getElementById('checkIn').value = '';
                document.getElementById('checkOut').value = '';
                document.getElementById('guests').value = '2';
                document.getElementById('resultsSection').style.display = 'none';
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error al crear reserva:', error);
            this.showError('Error al crear la reserva: ' + error.message);
        }
    }

    /**
     * Muestra los detalles de una habitación
     */
    showRoomDetails(roomId) {
        const rooms = storageManager.getData('rooms') || [];
        const room = rooms.find(r => r.id === roomId);
        
        if (!room) {
            this.showError('Habitación no encontrada');
            return;
        }

        const modal = document.getElementById('roomDetailsModal');
        const content = document.getElementById('roomDetailsContent');
        
        if (!modal || !content) return;

        const services = this.getServiceIcons(room.services);
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const guests = parseInt(document.getElementById('guests').value) || 2;
        
        let totalNights = 1;
        let totalPrice = room.pricePerNight;
        let priceCalculation = null;
        
        if (checkIn && checkOut) {
            priceCalculation = storageManager.calculateTotalPrice(room, checkIn, checkOut, guests);
            totalNights = priceCalculation.nights;
            totalPrice = priceCalculation.totalPrice;
        }

        content.innerHTML = `
            <div class="room-details-header">
                <h2>${room.name}</h2>
                <div class="room-price">COP $${room.pricePerNight.toLocaleString('es-CO')}/noche</div>
            </div>
            
            <div class="room-details-images">
                <img src="${room.images[0]}" alt="${room.name}" class="room-main-image">
            </div>
            
            <div class="room-details-info">
                <div class="room-specs">
                    <h3>Especificaciones</h3>
                    <ul>
                        <li><strong>Capacidad:</strong> ${room.capacity} huéspedes</li>
                        <li><strong>Camas:</strong> ${room.beds} ${room.beds === 1 ? 'cama' : 'camas'}</li>
                        <li><strong>Tipo:</strong> ${this.getRoomTypeName(room.type)}</li>
                    </ul>
                </div>
                
                <div class="room-services-detail">
                    <h3>Servicios Incluidos</h3>
                    <div class="services-list">
                        ${services}
                    </div>
                </div>
                
                <div class="room-description-detail">
                    <h3>Descripción</h3>
                    <p>${room.description}</p>
                </div>
                
                ${checkIn ? `
                <div class="reservation-summary">
                    <h3>Resumen de Reserva</h3>
                    <ul>
                        <li><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString('es-CO')}</li>
                        <li><strong>Check-out:</strong> ${checkOut ? new Date(checkOut).toLocaleDateString('es-CO') : 'Por calcular'}</li>
                        <li><strong>Noches:</strong> ${totalNights}</li>
                        <li><strong>Huéspedes:</strong> ${guests}</li>
                        <li><strong>Total:</strong> COP $${totalPrice.toLocaleString('es-CO')}</li>
                        ${priceCalculation && priceCalculation.additionalGuests > 0 ? `
                        <li><strong>Desglose:</strong></li>
                        <li>• Precio base: ${totalNights} noches × COP $${room.pricePerNight.toLocaleString('es-CO')} = COP $${(room.pricePerNight * totalNights).toLocaleString('es-CO')}</li>
                        <li>• Recargo por ${priceCalculation.additionalGuests} ${priceCalculation.additionalGuests === 1 ? 'persona adicional' : 'personas adicionales'}: COP $${(priceCalculation.surchargePerGuest * priceCalculation.additionalGuests * totalNights).toLocaleString('es-CO')}</li>
                        ` : ''}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;

        modal.style.display = 'block';
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

// Crear instancia global del gestor de reservas
window.reservationManager = new ReservationManager();

