# 🏨 Hotel el Rincón del Carmen

Sistema de gestión hotelera completo con reservas online y panel administrativo.

---

## 📋 Descripción del Proyecto

**Hotel el Rincón del Carmen** es una aplicación web completa diseñada para gestionar todas las operaciones de un hotel de lujo. El sistema permite a los clientes explorar las suites disponibles, realizar reservas online, y acceder a servicios exclusivos como Sacred Spa, Trinity Restaurant, Sky Bar, Saint Gym, Saint Yachting y VIP Transfers.

La plataforma está construida con tecnologías web modernas utilizando arquitectura MVC en el lado del cliente, con almacenamiento local para simular una base de datos. El diseño elegante con paleta dorada (#b89a7e) refleja la exclusividad y sofisticación del hotel.

---

## ✨ Características Destacadas

### Para Clientes

- **Sistema de Reservas Inteligente**
  - Búsqueda avanzada por fechas, número de huéspedes y tipo de suite
  - Cálculo automático de precios totales con impuestos incluidos
  - Validación de disponibilidad en tiempo real
  - **Sistema inteligente de disponibilidad**: Las reservas canceladas NO bloquean la disponibilidad
  - Validación de fechas: No permite reservas para el mismo día, solo días futuros
  - Badges especiales para suites premium (Desayuno, Transporte, Cancelación Gratuita)

- **7 Suites de Lujo**
  - Suite Icónica - 2 huéspedes, 1 cama - $4,786,092/noche
  - Suite Mítica - 2 huéspedes, 1 cama - $5,612,572/noche
  - Suite Épica - 2 huéspedes, 1 cama - $6,276,414/noche
  - Suite Majestic - 2 huéspedes, 1 cama - $7,002,894/noche
  - Suite Element - 4 huéspedes, 2 camas - $8,103,339/noche
  - La Suite Santa - 4 huéspedes, 2 camas - $8,861,911/noche
  - Villa One Saint - 2 huéspedes, 1 cama - $12,967,440/noche

- **6 Experiencias Exclusivas**
  - Sacred Spa: Tratamientos de relajación y bienestar
  - Trinity Restaurant: Alta cocina internacional
  - Sky Bar: Bar en la azotea con vistas panorámicas
  - Saint Gym: Gimnasio equipado con tecnología de punta
  - Saint Yachting: Tours en yate privado
  - VIP Transfers: Transporte de lujo aeropuerto-hotel

- **Sistema de Usuarios**
  - Registro completo con validación de datos
  - Login con autenticación segura
  - Gestión de reservas personales (visualización de reservas activas y canceladas)
  - Historial completo de reservas con estados visuales diferenciados
  - Los usuarios deben contactar al hotel para modificar o cancelar reservas
  - Mensaje informativo con datos de contacto del hotel

### Para Administradores

- **Dashboard Completo**
  - Estadísticas en tiempo real del hotel
  - KPIs de ocupación y reservas
  - Mensajes de contacto

- **Gestión Total**
  - CRUD completo de suites
  - Administración de reservas (aprobar, modificar, cancelar)
  - Visualización de usuarios registrados
  - Bandeja de entrada de consultas

### Diseño y UX

- Interfaz elegante con diseño minimalista y paleta dorada
- Diseño 100% responsive (móvil, tablet, desktop)
- Modales interactivos para login y registro
- Galerías de imágenes en detalles de suites
- Sistema de notificaciones y alertas
- Navegación intuitiva con hover effects
- **Fondo gris claro consistente**: Secciones de título con estilo uniforme (#f1f3f4)
- **Iconos SVG optimizados**: Mejor rendimiento y compatibilidad con Netlify

---

## 🎯 Objetivo

El objetivo principal de este proyecto es proporcionar una **plataforma integral de gestión hotelera** que:

1. **Automatice el proceso de reservas** eliminando la necesidad de llamadas telefónicas o emails
2. **Mejore la experiencia del cliente** con información detallada y búsqueda intuitiva
3. **Facilite la gestión administrativa** centralizando todas las operaciones en un solo lugar
4. **Incremente las conversiones** con un diseño atractivo y proceso de reserva simplificado
5. **Demuestre capacidades técnicas** utilizando tecnologías web modernas y mejores prácticas

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive con Grid y Flexbox
- **JavaScript ES6+**: Lógica de negocio y manipulación del DOM
- **Font Awesome 6.0.0**: Iconografía profesional (contacto y navegación)
- **SVG Inline**: Iconos de contraseña optimizados para Netlify
- **Google Fonts**: Tipografías (Playfair Display, Open Sans)

### Arquitectura y Patrones

- **MVC (Model-View-Controller)**: Separación de responsabilidades
- **Programación Orientada a Objetos**: Clases ES6 para módulos
- **LocalStorage API**: Persistencia de datos del lado del cliente
- **Event-Driven Architecture**: Sistema de eventos para comunicación
- **Responsive Web Design**: Mobile-first approach

### Características Técnicas

- No requiere backend: Funciona completamente en el cliente
- Sin dependencias externas: Vanilla JavaScript puro
- Progressive Enhancement: Mejora gradual de funcionalidades
- Optimizado para performance y carga rápida
- **Iconos SVG inline**: Optimizado para despliegue en Netlify
- **Sistema de contraseñas mejorado**: Toggle de visibilidad con SVG
- **Fondo gris claro**: Secciones de título con estilo consistente

---

## 🔐 Credenciales de Administrador

Para acceder al panel de administración del hotel, utiliza las siguientes credenciales:

### **Panel de Administración**
- **Email:** `admin@hotel.com`
- **Contraseña:** `admin2708`

### **Funcionalidades del Panel Admin**
- 📊 Dashboard con estadísticas del hotel
- 🏨 Gestión completa de suites (CRUD)
- 📋 Administración de reservas
- 👥 Lista de usuarios registrados
- 📧 Bandeja de mensajes de contacto
- 📈 KPIs de ocupación y rendimiento

---

## 📁 Estructura del Sistema

```
Hotel el Rincón del Carmen/
│
├── index.html                      # Landing page principal
│
├── html/                           # Páginas del sitio
│   ├── admin.html                  # Panel de administración
│   ├── contacto.html               # Formulario de contacto
│   ├── reservas.html               # Búsqueda y reservas
│   ├── suites.html                 # Catálogo de suites
│   │
│   ├── suite-detail.html           # Suite Icónica (detalles)
│   ├── suite-mitica.html           # Suite Mítica (detalles)
│   ├── suite-epica.html            # Suite Épica (detalles)
│   ├── suite-majestic.html         # Suite Majestic (detalles)
│   ├── suite-elementos.html        # Suite Element (detalles)
│   ├── suite-santa.html            # La Suite Santa (detalles)
│   ├── suite-villa-santo.html      # Villa One Saint (detalles)
│   │
│   ├── sacred-spa.html             # Experiencia: Spa
│   ├── trinity-restaurant.html     # Experiencia: Restaurante
│   ├── sky-bar.html                # Experiencia: Bar
│   ├── saint-gym.html              # Experiencia: Gimnasio
│   ├── saint-yachting.html         # Experiencia: Yachting
│   └── vip-transfers.html          # Experiencia: Transfers
│
├── css/                            # Estilos del proyecto
│   ├── main.css                    # Estilos globales y layout
│   ├── components.css              # Modales, alertas, botones
│   ├── admin.css                   # Estilos del panel administrativo
│   ├── reservas.css                # Página de reservas
│   ├── contacto.css                # Página de contacto
│   ├── mis-reservas.css            # Gestión de reservas del usuario
│   ├── habitaciones-disponibles.css # Grid de suites disponibles
│   ├── sacred-spa.css              # Estilos del spa
│   ├── trinity-restaurant.css      # Estilos del restaurante
│   ├── sky-bar.css                 # Estilos del bar
│   ├── saint-gym.css               # Estilos del gimnasio
│   ├── saint-yachting.css          # Estilos de yachting
│   └── vip-transfers.css           # Estilos de transfers
│
├── js/                             # Lógica JavaScript
│   ├── localStorage.js             # Gestión de datos (Model)
│   ├── auth.js                     # Autenticación y sesiones
│   ├── main.js                     # Funcionalidad global
│   ├── reservations.js             # Sistema de reservas
│   ├── rooms.js                    # Gestión de habitaciones
│   ├── suite-detail.js             # Detalles de suites
│   ├── suites.js                   # Catálogo de suites
│   ├── index.js                    # Lógica de la landing page
│   ├── admin.js                    # Panel de administración
│   ├── contacto.js                 # Formulario de contacto
│   └── utils.js                    # Funciones utilitarias
│
├── image/                          # Imágenes del hotel (13 archivos)
│   ├── habitacion 1 imagen grande.jpg
│   ├── habitacion 1.jpg
│   ├── habitacion 1.3.jpg
│   ├── habitacion 1.4.jpg
│   ├── habitacion 2 imagen grande.jpg
│   ├── habitacion 2.1.jpg
│   ├── habitacion 2.2.jpg
│   ├── habitacion 2.3.jpg
│   ├── habitacion 2.4.jpg
│   ├── habiatacion 2.5.jpg
│   ├── habiatcion 3 .3.jpg
│   ├── habitacion 3.4.jpg
│   └── suite mitica.jpg
│
└── README.md                       # Este archivo
```

---

## 📄 Qué Hace Cada Archivo

### HTML - Páginas

#### **index.html**
Landing page principal del hotel con hero section, sección "CONCEPT" (4 pilares del hotel), botón de reserva principal y footer con enlaces.

#### **html/reservas.html**
Motor de búsqueda y reservas. Contiene formulario de búsqueda por fechas y huéspedes, grid responsive de suites disponibles con badges de servicios premium, y filtrado en tiempo real.

#### **html/admin.html**
Panel de control administrativo con dashboard de KPIs, gestión de habitaciones (CRUD), gestión de reservas, lista de usuarios y mensajes de contacto.

#### **html/contacto.html**
Formulario de contacto con campos de nombre, email, teléfono y mensaje. Incluye validación en tiempo real y almacenamiento de mensajes.

#### **html/suite-[nombre].html** (7 archivos)
Páginas de detalle de cada suite (Icónica, Mítica, Épica, Majestic, Element, Santa, Villa Santo). Cada una incluye galería de imágenes, descripción completa, lista de amenidades, especificaciones (huéspedes, camas, tamaño), botón de reserva directo y modales de login/registro.

#### **html/[experiencia].html** (6 archivos)
Páginas de experiencias exclusivas (Sacred Spa, Trinity Restaurant, Sky Bar, Saint Gym, Saint Yachting, VIP Transfers). Incluyen descripción del servicio, horarios, precios, galería de imágenes y call-to-action de reserva.

#### **html/suites.html**
Catálogo completo de todas las suites disponibles con filtros, ordenamiento y navegación a páginas de detalle.

---

### CSS - Estilos

#### **css/main.css** (2,182 líneas)
Estilos globales del proyecto completo:
- Variables CSS (colores: #b89a7e dorado, fuentes, spacing)
- Reset y normalize
- Layout principal y sistema de navegación
- Hero sections y banner principal
- Estilos del footer consistente
- Sección "CONCEPT" con grid de 4 columnas
- Media queries para responsive design
- Animaciones y transiciones suaves

#### **css/components.css**
Componentes reutilizables en todo el sitio:
- Modales (login, registro) con animaciones
- Botones (.btn-primary, .btn-danger, .btn-outline)
- **Nuevo**: `.form-buttons` - Contenedor flexbox para botones de formulario con separación uniforme
- Botones de formulario con tamaño fijo (180px) y padding consistente (12px 20px)
- Sistema de alertas (.alert-error, .alert-success)
- Formularios con validación visual
- Cards de habitaciones con hover effects
- Sistema de badges premium

#### **css/admin.css** (525 líneas)
Estilos específicos del panel de administración:
- Tablas de datos con diseño profesional
- Botones de acción compactos (.btn-sm)
- Formularios de gestión de suites
- Dashboard con KPIs y estadísticas
- Responsive design para dispositivos móviles
- Estilos para modales de administración

#### **css/reservas.css**
Estilos específicos de la página de reservas:
- Formulario de búsqueda estilizado
- Grid responsive de habitaciones (4-3-2-1 columnas según viewport)
- Cards de suites con hover effects
- Badges premium (desayuno, transporte, cancelación)
- Lista de beneficios incluidos
- Estado vacío cuando no hay resultados

#### **css/contacto.css**
Estilos del formulario de contacto con layout optimizado, mensajes de error en color dorado y animaciones de validación.

#### **css/mis-reservas.css**
Gestión de reservas del usuario con lista de reservas, estados visuales (activa, cancelada), mensaje informativo de contacto y cards responsive.

#### **css/habitaciones-disponibles.css**
Grid especializado para mostrar suites disponibles con diseño compacto y elegante.

#### **css/[experiencia].css** (6 archivos)
Estilos únicos para cada experiencia (spa, restaurant, bar, gym, yachting, transfers):
- Imágenes hero específicas de cada servicio
- Secciones de información personalizadas
- Galerías de fotos
- Call-to-action con branding específico

---

### JavaScript - Lógica

#### **js/localStorage.js** (916 líneas)
**Núcleo del sistema de datos** - Gestiona toda la persistencia de información:

**Funciones principales:**
- `initializeData()`: Carga inicial de datos al abrir la aplicación
- `updateRoomsData()`: Actualiza precios y capacidades de las suites
- `getAvailableRooms()`: Filtra suites disponibles según fechas y huéspedes
- `addReservation()`: Crea nueva reserva en el sistema
- `getRoomById()`: Obtiene información de suite por ID
- `getUserById()`: Obtiene datos de usuario por ID
- `addContactMessage()`: Guarda mensaje del formulario de contacto

**Datos que gestiona:**
- 7 suites con precios, capacidades, imágenes y servicios
- Usuarios (clientes y administrador)
- Reservas (activas y canceladas)
- Mensajes de contacto
- Sesión actual del usuario

**Lógica de disponibilidad:**
Implementa filtrado inteligente por capacidad: si buscan 1-2 huéspedes muestra suites hasta 4 personas, si buscan 3+ muestra con capacidad flexible (huéspedes + 2).

**Sistema mejorado de cancelaciones:**
- Solo las reservas con estado `confirmed` o `pending` bloquean la disponibilidad
- Las reservas `cancelled` NO bloquean suites, haciéndolas disponibles inmediatamente
- Filtrado automático de reservas activas vs canceladas
- Logs detallados para debugging del sistema de disponibilidad

**Mejoras recientes implementadas:**
- **Actualización automática de contraseña de administrador**: Sistema que actualiza la contraseña del admin a `admin2708` automáticamente
- **Función de limpieza de localStorage**: `clearAllData()` para reinicializar datos
- **Iconos SVG inline**: Reemplazo de Font Awesome por SVG para iconos de contraseña (compatible con Netlify)

#### **js/auth.js** (867 líneas)
Sistema de autenticación y gestión de reservas personales:
- `showLoginModal()`: Muestra modal de inicio de sesión
- `showRegisterModal()`: Muestra modal de registro
- `handleLogin()`: Procesa credenciales y crea sesión
- `handleRegister()`: Valida datos y registra nuevo usuario
- `logout()`: Cierra sesión y limpia estado
- `isLoggedIn()`: Verifica si hay sesión activa
- `getCurrentUser()`: Obtiene datos del usuario actual
- `loadUserReservations()`: Carga todas las reservas del usuario (activas y canceladas)

**Validaciones implementadas:**
- Email único en el sistema
- Formato de email válido
- Contraseña mínimo 6 caracteres
- Identificación única por usuario
- Todos los campos requeridos

**Mejoras en UI de reservas:**
- Visualización diferenciada de reservas canceladas con overlay "CANCELADA"
- Mensaje informativo para contactar al hotel para modificaciones o cancelaciones
- Precio total directo sin desglose para mayor claridad

**Mejoras en sistema de autenticación:**
- **Iconos SVG para contraseñas**: Reemplazo de Font Awesome por SVG inline para mejor compatibilidad
- **Toggle de visibilidad mejorado**: Cambio dinámico entre icono de ojo abierto y tachado
- **Sistema de cambio de contraseña**: Modal dedicado para cambiar contraseñas de usuarios

#### **js/reservations.js** (582 líneas)
**Motor de reservas** - Gestiona todo el proceso de búsqueda y reserva:

**Funciones clave:**
- `searchAvailableRooms()`: Busca suites disponibles según criterios con logs detallados
- `displayAvailableRooms()`: Genera HTML dinámico de resultados
- `handleReservation()`: Procesa y guarda reserva
- `validateDates()`: Valida fechas de entrada y salida
- `calculateTotalPrice()`: Calcula precio total con noches e impuestos
- `showError() / showSuccess()`: Muestra notificaciones al usuario
- `getSuiteUrl()`: Mapea nombre de suite a URL de detalle
- `setupDateInputs()`: Configura campos de fecha con mínimo en mañana (no permite seleccionar hoy)

**Características:**
- Generación dinámica de HTML para cards de suites
- Badges premium condicionales (desayuno, transporte, cancelación)
- Validación de disponibilidad en tiempo real excluyendo reservas canceladas
- Cálculo automático de número de noches
- Mapeo correcto a páginas de detalle de cada suite
- Validación estricta: No permite reservas para el mismo día (solo desde mañana)
- Fechas mínimas automáticas: Check-in desde mañana, Check-out desde pasado mañana

#### **js/rooms.js** (527 líneas)
Gestión de habitaciones:
- `displayRooms()`: Muestra catálogo completo de suites
- `filterRooms()`: Filtra suites por criterios específicos
- `processReservation()`: Inicia proceso de reserva de una suite
- `showRoomDetails()`: Muestra modal con detalles completos de la suite
- `checkRoomAvailability()`: Verifica disponibilidad de una suite específica

#### **js/suite-detail.js** (99 líneas)
Lógica de páginas de detalle de suites:
- Carga información específica de cada suite
- Carrusel de imágenes interactivo
- Botón de reserva con redirección a reservas.html
- Integración con modales de login/registro
- Funciones de navegación entre slides

#### **js/admin.js** (607 líneas)
Panel de administración completo:
- `loadAdminStats()`: Carga estadísticas del hotel
- `loadRooms()`: Gestiona CRUD de suites
- `loadReservations()`: Administra todas las reservas
- `loadUsers()`: Lista usuarios registrados
- `loadContactMessages()`: Muestra mensajes de contacto
- `modifyReservationAdmin()`: Modifica reservas desde el panel admin
- Validaciones y notificaciones específicas para administradores

#### **js/contacto.js** (47 líneas)
Formulario de contacto:
- Validación en tiempo real de campos
- Envío y almacenamiento de mensajes
- Manejo de errores y mensajes de éxito
- Integración con storageManager

#### **js/utils.js** (68 líneas)
Funciones utilitarias compartidas:
- `isValidEmail()`: Validación de formato de email
- `formatCurrency()`: Formateo de moneda colombiana
- `formatDate()`: Formateo de fechas en español
- `calculateNights()`: Cálculo de noches entre fechas
- `getTomorrow()`: Obtiene fecha de mañana
- `showNotification()`: Sistema de notificaciones

#### **js/main.js** (67 líneas)
Funcionalidad global compartida en todas las páginas:
- `initMobileNav()`: Navegación móvil con hamburger menu
- `initScrollEffects()`: Efectos de scroll y animaciones
- `initModalEscape()`: Cierre de modales con tecla Escape
- `addAnimationStyles()`: Estilos de animación dinámicos

#### **js/index.js**
Lógica específica de la landing page:
- Carrusel automático de imágenes
- Animaciones de scroll
- Botones de call-to-action
- Efectos visuales de entrada

#### **js/suites.js**
Catálogo de suites:
- Grid de todas las suites disponibles
- Sistema de filtros y ordenamiento
- Navegación a páginas de detalle

---
## NETLIFY
https://magenta-praline-83c533.netlify.app/

## 👨‍💻 Autor
**Valentina Mancilla**

