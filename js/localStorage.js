/**
 * SISTEMA DE ALMACENAMIENTO LOCAL DEL HOTEL
 * 
 * Este archivo maneja toda la gestión de datos del hotel utilizando localStorage.
 * Incluye datos de habitaciones, usuarios, reservas, mensajes de contacto y servicios.
 * Proporciona funciones para CRUD (Create, Read, Update, Delete) de todos los datos.
 */

// Datos predefinidos de las habitaciones del hotel
var roomsData = [
    {
        id: 1,
        name: 'Suite Icónica',
        type: 'suite',
        number: '101',
        pricePerNight: 4786092,
        maxGuests: 2,
        capacity: 2,
        beds: 1,
        description: 'Tarifa totalmente flexible. Bebida de bienvenida a la llegada y champagne con frutas en la habitación. Incluye desayuno a la carta, WiFi gratuito, IVA e impuestos locales',
        available: true,
        services: ['wifi', 'tv', 'ac', 'balcony', 'minibar'],
        benefits: [
            'Bebida de bienvenida a la llegada',
            'Botella de champagne y plato de frutas en la habitación',
            'Desayuno a la carta incluido',
            'WiFi gratuito',
            'Cancelación gratuita'
        ],
        flexibleRate: true,
        freeBreakfast: true,
        freeCancellation: true,
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-35-600x400.jpg',
        images: ['https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-35-600x400.jpg']
    },
    {
        id: 2,
        name: 'Suite Mítica',
        type: 'suite',
        number: '102',
        pricePerNight: 5612572,
        maxGuests: 2,
        capacity: 2,
        beds: 1,
        description: 'Tarifa totalmente flexible. Bebida de bienvenida a la llegada y champagne con frutas en la habitación. Incluye desayuno a la carta, WiFi gratuito, IVA e impuestos locales',
        available: true,
        services: ['wifi', 'tv', 'ac', 'balcony', 'minibar'],
        benefits: [
            'Bebida de bienvenida a la llegada',
            'Botella de champagne y plato de frutas en la habitación',
            'Desayuno a la carta incluido',
            'WiFi gratuito',
            'Cancelación gratuita'
        ],
        flexibleRate: true,
        freeBreakfast: true,
        freeCancellation: true,
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-40-600x500.jpg',
        images: ['https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-40-600x500.jpg']
    },
    {
        id: 3,
        name: 'Suite Épica',
        type: 'suite',
        number: '103',
        pricePerNight: 6276414,
        maxGuests: 2,
        capacity: 2,
        beds: 1,
        description: 'Tarifa totalmente flexible. Bebida de bienvenida a la llegada y champagne con frutas en la habitación. Incluye desayuno a la carta, WiFi gratuito, IVA e impuestos locales',
        available: true,
        services: ['wifi', 'tv', 'ac', 'balcony', 'minibar', 'jacuzzi'],
        benefits: [
            'Bebida de bienvenida a la llegada',
            'Botella de champagne y plato de frutas en la habitación',
            'Desayuno a la carta incluido',
            'WiFi gratuito',
            'Cancelación gratuita'
        ],
        flexibleRate: true,
        freeBreakfast: true,
        freeCancellation: true,
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/Homepage-2-600x500.jpg',
        images: ['https://www.saintsuitesoia.com/wp-content/uploads/2020/02/Homepage-2-600x500.jpg']
    },
    {
        id: 4,
        name: 'Suite Majestic',
        type: 'suite',
        number: '104',
        pricePerNight: 7002894,
        maxGuests: 2,
        capacity: 2,
        beds: 1,
        description: 'Tarifa totalmente flexible con servicios de lujo incluidos. Servicio de transporte de lujo ida y vuelta, desayuno flotante una vez por estadía, bebida de bienvenida y champagne con frutas a la llegada. Incluye desayuno a la carta, WiFi gratuito, IVA e impuestos locales',
        available: true,
        services: ['wifi', 'tv', 'ac', 'balcony', 'minibar', 'jacuzzi', 'roomservice'],
        benefits: [
            'Servicio de transporte de lujo ida y vuelta',
            'Desayuno flotante una vez por estadía',
            'Bebida de bienvenida a la llegada',
            'Botella de champagne y plato de frutas en la habitación',
            'Desayuno a la carta incluido',
            'WiFi gratuito',
            'Cancelación gratuita'
        ],
        flexibleRate: true,
        freeBreakfast: true,
        freeCancellation: true,
        transferIncluded: true,
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-24-600x500.jpg',
        images: ['https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-24-600x500.jpg']
    },
    {
        id: 5,
        name: 'Suite Element',
        type: 'suite',
        number: '105',
        pricePerNight: 8103339,
        maxGuests: 4,
        capacity: 4,
        beds: 2,
        description: 'Tarifa totalmente flexible con servicios de lujo incluidos. Servicio de transporte de lujo incluido, desayuno flotante una vez por estadía, bebida de bienvenida y champagne con frutas a la llegada. Incluye desayuno a la carta, WiFi gratuito, IVA e impuestos locales',
        available: true,
        services: ['wifi', 'tv', 'ac', 'balcony', 'minibar', 'jacuzzi', 'roomservice'],
        benefits: [
            'Servicio de transporte de lujo ida y vuelta',
            'Desayuno flotante una vez por estadía',
            'Bebida de bienvenida a la llegada',
            'Botella de champagne y plato de frutas en la habitación',
            'Desayuno a la carta incluido',
            'WiFi gratuito',
            'Cancelación gratuita'
        ],
        flexibleRate: true,
        freeBreakfast: true,
        freeCancellation: true,
        transferIncluded: true,
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-26-600x500.jpg',
        images: ['https://www.saintsuitesoia.com/wp-content/uploads/2020/02/HighRes-26-600x500.jpg']
    },
    {
        id: 6,
        name: 'La Suite Santa',
        type: 'suite',
        number: '106',
        pricePerNight: 8861911,
        maxGuests: 4,
        capacity: 4,
        beds: 2,
        description: 'Tarifa totalmente flexible con servicios de lujo incluidos. Servicio de transporte de lujo incluido, desayuno flotante una vez por estadía, bebida de bienvenida y champagne con frutas a la llegada. Incluye desayuno a la carta, WiFi gratuito, IVA e impuestos locales',
        available: true,
        services: ['wifi', 'tv', 'ac', 'balcony', 'minibar', 'jacuzzi', 'roomservice'],
        benefits: [
            'Servicio de transporte de lujo ida y vuelta',
            'Desayuno flotante una vez por estadía',
            'Bebida de bienvenida a la llegada',
            'Botella de champagne y plato de frutas en la habitación',
            'Desayuno a la carta incluido',
            'WiFi gratuito',
            'Cancelación gratuita'
        ],
        flexibleRate: true,
        freeBreakfast: true,
        freeCancellation: true,
        transferIncluded: true,
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2019/12/HighRes-6-min-1-scaled-e1575923182587-600x500.jpg',
        images: ['https://www.saintsuitesoia.com/wp-content/uploads/2019/12/HighRes-6-min-1-scaled-e1575923182587-600x500.jpg']
    },
    {
        id: 7,
        name: 'Villa One Saint',
        type: 'villa',
        number: '201',
        pricePerNight: 12967440,
        maxGuests: 2,
        capacity: 2,
        beds: 1,
        description: 'Tarifa totalmente flexible con servicios de lujo incluidos. Servicio de transporte de lujo ida y vuelta, desayuno flotante una vez por estadía, bebida de bienvenida y champagne con frutas a la llegada. Villa exclusiva con piscina privada y vistas panorámicas. Incluye desayuno a la carta, WiFi gratuito, IVA e impuestos locales',
        available: true,
        services: ['wifi', 'tv', 'ac', 'balcony', 'minibar', 'jacuzzi', 'roomservice', 'safe'],
        benefits: [
            'Servicio de transporte de lujo ida y vuelta',
            'Desayuno flotante una vez por estadía',
            'Bebida de bienvenida a la llegada',
            'Botella de champagne y plato de frutas en la habitación',
            'Piscina privada exclusiva',
            'Vistas panorámicas a la Caldera',
            'Desayuno a la carta incluido',
            'WiFi gratuito',
            'Cancelación gratuita'
        ],
        flexibleRate: true,
        freeBreakfast: true,
        freeCancellation: true,
        transferIncluded: true,
        image: 'https://www.saintsuitesoia.com/wp-content/uploads/2022/06/The-One-Private-Villa-Exterior-Pool-scaled-600x500.jpg',
        images: ['https://www.saintsuitesoia.com/wp-content/uploads/2022/06/The-One-Private-Villa-Exterior-Pool-scaled-600x500.jpg']
    }
];

/**
 * Función para guardar datos en localStorage
 * @param {string} key - Clave para identificar los datos
 * @param {any} data - Datos a guardar (se convierten a JSON)
 * @returns {boolean} - true si se guardó exitosamente, false en caso contrario
 */
function setData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error guardando en localStorage:', error);
        return false;
    }
}

/**
 * Función para obtener datos de localStorage
 * @param {string} key - Clave de los datos a obtener
 * @returns {any|null} - Datos parseados o null si no existen
 */
function getData(key) {
    try {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error leyendo de localStorage:', error);
        return null;
    }
}

/**
 * Función para generar un ID único para nuevos elementos
 * @param {Array} array - Array de elementos existentes
 * @returns {number} - Nuevo ID único
 */
function generateId(array) {
    if (array.length === 0) return 1;
    var max = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].id && array[i].id > max) {
            max = array[i].id;
        }
    }
    return max + 1;
}

/**
 * Función para inicializar todos los datos del sistema
 * Crea las estructuras de datos básicas si no existen
 * Actualiza habitaciones predefinidas preservando cambios del administrador
 */
function initializeData() {
    // Inicializar habitaciones: solo si no existen o es la primera vez
    var existingRooms = getData('rooms');
    if (!existingRooms || existingRooms.length === 0) {
        // Establecer las habitaciones predefinidas si no hay habitaciones
        setData('rooms', roomsData);
    } else {
        // Si ya existen habitaciones, verificar que las predefinidas tengan todas las propiedades
        var needsUpdate = false;
        var updatedRooms = [];
        
        // Procesar habitaciones existentes que no están en roomsData
        for (var i = 0; i < existingRooms.length; i++) {
            var existingRoom = existingRooms[i];
            var isPredefined = false;
            
            // Verificar si es una habitación predefinida
            for (var j = 0; j < roomsData.length; j++) {
                if (roomsData[j].id === existingRoom.id && roomsData[j].name === existingRoom.name) {
                    isPredefined = true;
                    // Actualizar con datos más recientes pero preservar cambios del admin
                    var updatedRoom = Object.assign({}, roomsData[j], {
                        // Preservar campos que el admin puede haber modificado
                        available: existingRoom.available,
                        services: existingRoom.services || roomsData[j].services,
                        description: existingRoom.description || roomsData[j].description
                    });
                    updatedRooms.push(updatedRoom);
                    break;
                }
            }
            
            // Si no es predefinida, es una habitación agregada por el admin
            if (!isPredefined) {
                updatedRooms.push(existingRoom);
            }
        }
        
        // Agregar habitaciones predefinidas que no existen en las habitaciones actuales
        for (var k = 0; k < roomsData.length; k++) {
            var predefinedRoom = roomsData[k];
            var exists = false;
            
            for (var l = 0; l < updatedRooms.length; l++) {
                if (updatedRooms[l].id === predefinedRoom.id) {
                    exists = true;
                    break;
                }
            }
            
            if (!exists) {
                updatedRooms.push(predefinedRoom);
            }
        }
        
        setData('rooms', updatedRooms);
    }
    
    // Inicializar usuarios: crear usuario administrador por defecto o actualizar contraseña
    var users = getData('users');
    if (!users) {
        // Crear usuarios por primera vez
        setData('users', [
            {
                id: 1,
                identification: '12345678',
                name: 'Administrador del Hotel',
                nationality: 'Colombiana',
                email: 'admin@hotel.com',
                phone: '+57 300 123 4567',
                password: 'admin2708',
                role: 'admin',
                createdAt: new Date().toISOString()
            }
        ]);
    } else {
        // Actualizar contraseña del administrador si ya existe
        var adminUser = users.find(user => user.email === 'admin@hotel.com');
        if (adminUser) {
            adminUser.password = 'admin2708';
            setData('users', users);
        }
    }

    // Inicializar reservas: crear array vacío si no existe
    if (!getData('reservations')) {
        setData('reservations', []);
    }

    // Inicializar mensajes de contacto: crear array vacío si no existe
    if (!getData('contactMessages')) {
        setData('contactMessages', []);
    }

    // Inicializar quejas y reclamos: crear array vacío si no existe
    if (!getData('complaints')) {
        setData('complaints', []);
    }

    // Inicializar servicios del hotel: crear servicios predefinidos
    if (!getData('services')) {
        setData('services', [
            { id: 1, name: 'Trinity Restaurant', type: 'restaurant', description: 'Restaurante gourmet con cocina mediterránea', price: 0, available: true },
            { id: 2, name: 'Sky Bar', type: 'bar', description: 'Bar en la azotea con vista panorámica', price: 0, available: true },
            { id: 3, name: 'The Sacred Spa', type: 'spa', description: 'Spa de lujo con tratamientos relajantes', price: 150, available: true },
            { id: 4, name: 'Saint Gym', type: 'gym', description: 'Gimnasio equipado con tecnología de vanguardia', price: 0, available: true }
        ]);
    }
}

/**
 * Función para agregar un nuevo usuario al sistema
 * @param {Object} userData - Datos del usuario a crear
 * @returns {Object} - Usuario creado con ID generado
 */
function addUser(userData) {
    var users = getData('users') || [];
    var newUser = {
        id: generateId(users),
        identification: userData.identification,
        name: userData.name,
        nationality: userData.nationality,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        role: userData.role || 'user',
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    setData('users', users);
    return newUser;
}

/**
 * Función para obtener todos los usuarios del sistema
 * @returns {Array} - Array de todos los usuarios
 */
function getUsers() {
    return getData('users') || [];
}

/**
 * Función para buscar un usuario por su email
 * @param {string} email - Email del usuario a buscar
 * @returns {Object|null} - Usuario encontrado o null si no existe
 */
function getUserByEmail(email) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return users[i];
        }
    }
    return null;
}

/**
 * Función para actualizar los datos de un usuario existente
 * @param {number} id - ID del usuario a actualizar
 * @param {Object} userData - Nuevos datos del usuario
 * @returns {Object|null} - Usuario actualizado o null si no se encuentra
 */
function updateUser(id, userData) {
    var users = getData('users') || [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users[i] = {
                id: users[i].id,
                identification: userData.identification !== undefined ? userData.identification : users[i].identification,
                name: userData.name !== undefined ? userData.name : users[i].name,
                nationality: userData.nationality !== undefined ? userData.nationality : users[i].nationality,
                email: userData.email !== undefined ? userData.email : users[i].email,
                phone: userData.phone !== undefined ? userData.phone : users[i].phone,
                password: userData.password !== undefined ? userData.password : users[i].password,
                role: userData.role !== undefined ? userData.role : users[i].role,
                createdAt: users[i].createdAt
            };
            setData('users', users);
            return users[i];
        }
    }
    return null;
}

/**
 * Función para agregar una nueva reserva al sistema
 * @param {Object} reservationData - Datos de la reserva a crear
 * @returns {Object} - Reserva creada con ID generado
 */
function addReservation(reservationData) {
    var reservations = getData('reservations') || [];
    var newReservation = {
        id: generateId(reservations),
        roomId: reservationData.roomId,
        userId: reservationData.userId,
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut,
        guests: reservationData.guests,
        notes: reservationData.notes || '',
        totalPrice: reservationData.totalPrice,
        status: reservationData.status || 'pending',
        createdAt: new Date().toISOString()
    };
    reservations.push(newReservation);
    setData('reservations', reservations);
    return newReservation;
}

/**
 * Función para obtener todas las reservas del sistema
 * @returns {Array} - Array de todas las reservas
 */
function getAllReservations() {
    return getData('reservations') || [];
}

/**
 * Función para obtener las reservas de un usuario específico
 * @param {number} userId - ID del usuario
 * @returns {Array} - Array de reservas del usuario
 */
function getReservationsByUser(userId) {
    var reservations = getData('reservations') || [];
    var result = [];
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].userId === userId) {
            result.push(reservations[i]);
        }
    }
    return result;
}

/**
 * Función para eliminar una reserva del sistema
 * @param {number} id - ID de la reserva a eliminar
 * @returns {boolean} - true si se eliminó exitosamente
 */
function deleteReservation(id) {
    var reservations = getData('reservations') || [];
    var filtered = [];
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id !== id) {
            filtered.push(reservations[i]);
        }
    }
    setData('reservations', filtered);
    return true;
}

/**
 * Función para actualizar los datos de una reserva existente
 * @param {number} id - ID de la reserva a actualizar
 * @param {Object} updatedData - Nuevos datos de la reserva
 * @returns {Object|null} - Reserva actualizada o null si no se encuentra
 */
function updateReservation(id, updatedData) {
    var reservations = getData('reservations') || [];
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id === id) {
            for (var key in updatedData) {
                reservations[i][key] = updatedData[key];
            }
            reservations[i].updatedAt = new Date().toISOString();
            setData('reservations', reservations);
            return reservations[i];
        }
    }
    return null;
}

/**
 * Función para actualizar el estado de una reserva
 * @param {number} id - ID de la reserva a actualizar
 * @param {string} status - Nuevo estado de la reserva
 * @returns {Object|null} - Reserva actualizada o null si no se encuentra
 */
function updateReservationStatus(id, status) {
    var reservations = getData('reservations') || [];
    var previousStatus = null;
    var reservation = null;
    
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].id === id) {
            previousStatus = reservations[i].status;
            reservations[i].status = status;
            reservations[i].updatedAt = new Date().toISOString();
            reservation = reservations[i];
            break;
        }
    }
    
    if (reservation) {
        setData('reservations', reservations);
        
        // Si la reserva fue cancelada, la habitación automáticamente vuelve a estar disponible
        if (status === 'cancelled' && (previousStatus === 'confirmed' || previousStatus === 'pending')) {
            // La habitación ya está disponible automáticamente porque getAvailableRooms excluye reservas canceladas
            console.log('Reserva cancelada: Habitación ' + reservation.roomId + ' vuelve a estar disponible');
        }
        
        return reservation;
    }
    return null;
}

/**
 * Función para agregar un nuevo mensaje de contacto
 * @param {Object} messageData - Datos del mensaje de contacto
 * @returns {Object} - Mensaje creado con ID generado
 */
function addContactMessage(messageData) {
    var messages = getData('contactMessages') || [];
    var newMessage = {
        id: generateId(messages),
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        message: messageData.message,
        read: false,
        createdAt: new Date().toISOString()
    };
    messages.push(newMessage);
    setData('contactMessages', messages);
    return newMessage;
}

/**
 * Función para marcar un mensaje de contacto como leído
 * @param {number} id - ID del mensaje a marcar como leído
 * @returns {Object|null} - Mensaje actualizado o null si no se encuentra
 */
function markMessageAsRead(id) {
    var messages = getData('contactMessages') || [];
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].id === id) {
            messages[i].read = true;
            messages[i].readAt = new Date().toISOString();
            setData('contactMessages', messages);
            return messages[i];
        }
    }
    return null;
}

/**
 * Función para obtener todas las habitaciones del hotel
 * @returns {Array} - Array de todas las habitaciones
 */
function getRooms() {
    return getData('rooms') || roomsData;
}

/**
 * Función para buscar una habitación por su ID
 * @param {number} roomId - ID de la habitación a buscar
 * @returns {Object|null} - Habitación encontrada o null si no existe
 */
function getRoomById(roomId) {
    var rooms = getRooms();
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
            return rooms[i];
        }
    }
    return null;
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

/**
 * Función para obtener habitaciones disponibles en un rango de fechas específico
 * @param {string} checkIn - Fecha de check-in
 * @param {string} checkOut - Fecha de check-out
 * @param {number} guests - Número de huéspedes
 * @returns {Array} - Array de habitaciones disponibles
 */
function getAvailableRooms(checkIn, checkOut, guests) {
    // Establecer valor por defecto para huéspedes
    if (!guests) guests = 1;
    
    // Obtener todas las habitaciones y reservas
    var rooms = getData('rooms') || roomsData;
    var reservations = getData('reservations') || [];
    
    // Filtrar solo reservas activas (confirmadas o pendientes)
    var activeReservations = [];
    for (var i = 0; i < reservations.length; i++) {
        if (reservations[i].status === 'confirmed' || reservations[i].status === 'pending') {
            activeReservations.push(reservations[i]);
        }
    }
    
    // Buscar habitaciones disponibles
    var availableRooms = [];
    for (var i = 0; i < rooms.length; i++) {
        var room = rooms[i];
        
        // Verificar que la habitación tenga capacidad suficiente
        if (room.capacity < guests) {
            continue;
        }
        
        // Lógica para mostrar habitaciones apropiadas según el número de huéspedes
        // Para 2 huéspedes: mostrar todas las habitaciones disponibles
        // Para 3 y 4 huéspedes: mostrar solo las habitaciones con capacidad 4
        var maxReasonableCapacity = guests <= 2 ? 4 : (guests <= 4 ? 4 : guests);
        if (room.capacity > maxReasonableCapacity) {
            continue;
        }
        
        // Verificar si hay conflictos de fechas con reservas existentes
        var hasConflict = false;
        for (var j = 0; j < activeReservations.length; j++) {
            if (activeReservations[j].roomId === room.id && 
                datesOverlap(checkIn, checkOut, activeReservations[j].checkIn, activeReservations[j].checkOut)) {
                hasConflict = true;
                break;
            }
        }
        
        // Si no hay conflictos, la habitación está disponible
        if (!hasConflict) {
            availableRooms.push(room);
        }
    }
    
    return availableRooms;
}

/**
 * Función para probar si localStorage está disponible y funciona
 * @returns {boolean} - true si localStorage funciona, false en caso contrario
 */
function testLocalStorage() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Función para limpiar todas las reservas del sistema
 * @returns {boolean} - true si se limpiaron exitosamente
 */
function clearReservations() {
    setData('reservations', []);
    return true;
}

/**
 * Función para limpiar todos los datos del sistema
 * Elimina todos los datos y reinicializa con datos por defecto
 */
function clearAllData() {
    localStorage.removeItem('users');
    localStorage.removeItem('rooms');
    localStorage.removeItem('reservations');
    localStorage.removeItem('contactMessages');
    localStorage.removeItem('services');
    localStorage.removeItem('current_user');
    initializeData();
}

/**
 * Función para limpiar solo los datos de usuarios
 * Elimina usuarios y sesión actual, reinicializa con datos por defecto
 */
function clearUserData() {
    localStorage.removeItem('users');
    localStorage.removeItem('current_user');
    initializeData();
}

/**
 * Función para exportar todos los datos del sistema
 * @returns {Object} - Objeto con todos los datos del sistema
 */
function exportData() {
    return {
        users: getData('users'),
        rooms: getData('rooms'),
        reservations: getData('reservations'),
        contactMessages: getData('contactMessages'),
        services: getData('services'),
        complaints: getData('complaints')
    };
}

/**
 * Función para calcular el precio total de una reserva
 * Incluye recargos por huéspedes adicionales y desglose detallado
 * @param {Object} room - Objeto de la habitación
 * @param {string} checkIn - Fecha de check-in
 * @param {string} checkOut - Fecha de check-out
 * @param {number} guests - Número de huéspedes
 * @returns {Object} - Objeto con desglose detallado del precio
 */
function calculateTotalPrice(room, checkIn, checkOut, guests) {
    try {
        // Calcular número de noches
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        // Precio base por noche
        let basePrice = room.pricePerNight;
        
        // Aplicar recargos por persona adicional (si aplica)
        let totalPrice = basePrice * nights;
        
        // Política de precios por persona:
        // - Hasta 2 personas: precio base
        // - 3-4 personas: +20% por persona adicional
        // - 5+ personas: +30% por persona adicional
        
        if (guests > 2) {
            const additionalGuests = guests - 2;
            let surchargePerGuest = 0;
            
            if (guests <= 4) {
                // 3-4 personas: +20% por persona adicional
                surchargePerGuest = basePrice * 0.20;
            } else {
                // 5+ personas: +30% por persona adicional
                surchargePerGuest = basePrice * 0.30;
            }
            
            totalPrice += (surchargePerGuest * additionalGuests * nights);
        }
        
        // Redondear al múltiplo de 1000 más cercano
        totalPrice = Math.round(totalPrice / 1000) * 1000;
        
        return {
            basePrice: basePrice,
            nights: nights,
            guests: guests,
            additionalGuests: Math.max(0, guests - 2),
            surchargePerGuest: guests > 2 ? (guests <= 4 ? basePrice * 0.20 : basePrice * 0.30) : 0,
            totalPrice: totalPrice,
            breakdown: generatePriceBreakdown(room, nights, guests, totalPrice)
        };
        
    } catch (error) {
        console.error('Error calculando precio total:', error);
        // Fallback al cálculo simple en caso de error
        const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        return {
            basePrice: room.pricePerNight,
            nights: nights,
            guests: guests,
            additionalGuests: 0,
            surchargePerGuest: 0,
            totalPrice: room.pricePerNight * nights,
            breakdown: `Precio base: ${nights} noches × COP $${room.pricePerNight.toLocaleString('es-CO')} = COP $${(room.pricePerNight * nights).toLocaleString('es-CO')}`
        };
    }
}

/**
 * Función para generar un desglose detallado del precio de una reserva
 * @param {Object} room - Objeto de la habitación
 * @param {number} nights - Número de noches
 * @param {number} guests - Número de huéspedes
 * @param {number} totalPrice - Precio total calculado
 * @returns {string} - Desglose detallado del precio en formato texto
 */
function generatePriceBreakdown(room, nights, guests, totalPrice) {
    let breakdown = [];
    
    // Agregar precio base
    breakdown.push(`Precio base (${nights} noches × COP $${room.pricePerNight.toLocaleString('es-CO')}) = COP $${(room.pricePerNight * nights).toLocaleString('es-CO')}`);
    
    // Agregar recargos por huéspedes adicionales si aplican
    if (guests > 2) {
        const additionalGuests = guests - 2;
        const surchargeRate = guests <= 4 ? '20%' : '30%';
        const surchargePerGuest = guests <= 4 ? room.pricePerNight * 0.20 : room.pricePerNight * 0.30;
        const totalSurcharge = surchargePerGuest * additionalGuests * nights;
        
        breakdown.push(`Recargo por ${additionalGuests} ${additionalGuests === 1 ? 'persona adicional' : 'personas adicionales'} (${surchargeRate}) = COP $${totalSurcharge.toLocaleString('es-CO')}`);
    }
    
    // Agregar total final
    breakdown.push(`Total: COP $${totalPrice.toLocaleString('es-CO')}`);
    
    return breakdown.join('\n');
}

/**
 * Objeto principal que expone todas las funciones del sistema de almacenamiento
 * Proporciona una interfaz unificada para gestionar todos los datos del hotel
 */
var storageManager = {
    // Funciones básicas de almacenamiento
    setData: setData,
    getData: getData,
    generateId: generateId,
    
    // Funciones de gestión de usuarios
    addUser: addUser,
    getUsers: getUsers,
    getUserByEmail: getUserByEmail,
    updateUser: updateUser,
    
    // Funciones de gestión de reservas
    addReservation: addReservation,
    getAllReservations: getAllReservations,
    getReservationsByUser: getReservationsByUser,
    deleteReservation: deleteReservation,
    updateReservation: updateReservation,
    updateReservationStatus: updateReservationStatus,
    
    // Funciones de gestión de mensajes de contacto
    addContactMessage: addContactMessage,
    markMessageAsRead: markMessageAsRead,
    
    // Funciones de gestión de habitaciones
    getRooms: getRooms,
    getRoomById: getRoomById,
    getAvailableRooms: getAvailableRooms,
    datesOverlap: datesOverlap,
    
    // Funciones de utilidad y mantenimiento
    testLocalStorage: testLocalStorage,
    clearReservations: clearReservations,
    clearAllData: clearAllData,
    clearUserData: clearUserData,
    exportData: exportData,
    
    // Funciones de cálculo de precios
    calculateTotalPrice: calculateTotalPrice,
    generatePriceBreakdown: generatePriceBreakdown,
    
    // Función para actualizar datos de habitaciones
    updateRoomsData: function() { setData('rooms', roomsData); },
    
    // Función para limpiar completamente el localStorage y reinicializar
    clearAllData: function() {
        localStorage.clear();
        initializeData();
        console.log('LocalStorage limpiado y datos reinicializados');
    },

    // Gestión de quejas y reclamos
    addComplaint: addComplaint,
    getAllComplaints: getAllComplaints,
    getComplaintsByUser: getComplaintsByUser,
    deleteComplaint: deleteComplaint,
    updateComplaintStatus: updateComplaintStatusComplaint,
    respondComplaint: respondComplaint
};

// Hacer el objeto storageManager disponible globalmente
window.storageManager = storageManager;

/**
 * Inicializar datos del sistema cuando se carga el archivo
 * Solo se ejecuta en el navegador (no en Node.js)
 */
if (typeof window !== 'undefined') {
    initializeData();
}

/**
 * ============================
 *  MÓDULO: QUEJAS Y RECLAMOS
 * ============================
 */

/**
 * Agrega una nueva queja/reclamo
 * @param {Object} complaintData - { userId, reservationId, subject, type, description }
 * @returns {Object} - Queja creada
 */
function addComplaint(complaintData) {
    var complaints = getData('complaints') || [];
    var newComplaint = {
        id: generateId(complaints),
        userId: complaintData.userId,
        reservationId: complaintData.reservationId,
        subject: complaintData.subject,
        type: complaintData.type, // 'Queja' | 'Reclamo'
        description: complaintData.description,
        status: 'pending', // 'pending' | 'resolved' | 'rejected'
        response: '',
        createdAt: new Date().toISOString(),
        respondedAt: null
    };
    complaints.push(newComplaint);
    setData('complaints', complaints);
    return newComplaint;
}

/**
 * Obtiene todas las quejas
 * @returns {Array}
 */
function getAllComplaints() {
    return getData('complaints') || [];
}

/**
 * Obtiene quejas por usuario
 * @param {number} userId
 * @returns {Array}
 */
function getComplaintsByUser(userId) {
    var complaints = getData('complaints') || [];
    var result = [];
    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].userId === userId) {
            result.push(complaints[i]);
        }
    }
    return result;
}

/**
 * Elimina una queja por ID
 * Nota: La UI debe restringir a solo estados 'pending' del propio usuario
 * @param {number} id
 * @returns {boolean}
 */
function deleteComplaint(id) {
    var complaints = getData('complaints') || [];
    var filtered = [];
    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].id !== id) {
            filtered.push(complaints[i]);
        }
    }
    setData('complaints', filtered);
    return true;
}

/**
 * Actualiza el estado de una queja
 * @param {number} id
 * @param {string} status - 'resolved' | 'rejected' | 'pending'
 * @returns {Object|null}
 */
function updateComplaintStatusComplaint(id, status) {
    var complaints = getData('complaints') || [];
    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].id === id) {
            complaints[i].status = status;
            complaints[i].updatedAt = new Date().toISOString();
            setData('complaints', complaints);
            return complaints[i];
        }
    }
    return null;
}

/**
 * Registra una respuesta única y cambia estado
 * Solo permite una respuesta por queja
 * @param {number} id
 * @param {string} responseText
 * @param {string} status - 'resolved' | 'rejected'
 * @returns {Object|null}
 */
function respondComplaint(id, responseText, status) {
    var complaints = getData('complaints') || [];
    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].id === id) {
            // Si ya tiene respuesta, no permitir otra
            if (complaints[i].response && complaints[i].response.length > 0) {
                return null;
            }
            complaints[i].response = responseText || '';
            complaints[i].status = status || 'resolved';
            complaints[i].respondedAt = new Date().toISOString();
            complaints[i].updatedAt = complaints[i].respondedAt;
            setData('complaints', complaints);
            return complaints[i];
        }
    }
    return null;
}
