/* ==========================================================================
   ECOLAP - SISTEMA GENERAL DE LOCAL STORAGE
   ========================================================================== */

const ECOLAP_KEYS = {
    USUARIOS: 'ecolap_usuarios',
    SESION_ACTUAL: 'ecolap_sesion',
    SOLICITUDES: 'ecolap_solicitudes',
    ACTIVIDADES: 'ecolap_actividades'
};

// --- MÉTODOS BASE (HELPERS GENÉRICOS) ---

// Guardar datos en LocalStorage (los convierte a cadena JSON)
function setStorage(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
        return true;
    } catch (error) {
        console.error(`Error al guardar en LocalStorage [${clave}]:`, error);
        return false;
    }
}

// Obtener datos de LocalStorage (los convierte de cadena JSON a Objeto/Array)
function getStorage(clave) {
    try {
        const item = localStorage.getItem(clave);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error al leer de LocalStorage [${clave}]:`, error);
        return null;
    }
}

// Eliminar un registro de LocalStorage
function removeStorage(clave) {
    localStorage.removeItem(clave);
}


/* ==========================================================================
   1. GESTIÓN DE USUARIOS Y SESIÓN
   ========================================================================== */

// Obtener todos los usuarios
function obtenerUsuarios() {
    return getStorage(ECOLAP_KEYS.USUARIOS) || [];
}

// Buscar un usuario por su correo electrónico
function buscarUsuarioPorEmail(email) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(u => u.email === email.toLowerCase());
}

// Autenticar usuario para el Login
function iniciarSesionLocal(email, password) {
    const usuarios = obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(
        u => u.email === email.toLowerCase() && u.password === password
    );

    if (usuarioEncontrado) {
        // Guardar la sesión activa sin la contraseña por seguridad
        const { password, ...datosSesion } = usuarioEncontrado;
        setStorage(ECOLAP_KEYS.SESION_ACTUAL, datosSesion);
        return { exito: true, usuario: datosSesion };
    }

    return { exito: false, mensaje: 'Correo o contraseña incorrectos.' };
}

// Obtener usuario autenticado actual
function obtenerSesionActual() {
    return getStorage(ECOLAP_KEYS.SESION_ACTUAL);
}

// Cerrar sesión
function cerrarSesionLocal() {
    removeStorage(ECOLAP_KEYS.SESION_ACTUAL);
    window.location.href = 'login.html';
}


/* ==========================================================================
   2. GESTIÓN DE PUNTOS Y RECOMPENSAS
   ========================================================================== */

// Sumar puntos a un usuario (ej. al jugar o reciclar)
function sumarPuntosUsuario(email, puntosGanados) {
    const usuarios = obtenerUsuarios();
    const indice = usuarios.findIndex(u => u.email === email.toLowerCase());

    if (indice !== -1) {
        usuarios[indice].puntos = (usuarios[indice].puntos || 0) + puntosGanados;
        setStorage(ECOLAP_KEYS.USUARIOS, usuarios);

        // Si es el usuario en sesión activa, actualizar también la sesión
        const sesion = obtenerSesionActual();
        if (sesion && sesion.email === email.toLowerCase()) {
            sesion.puntos = usuarios[indice].puntos;
            setStorage(ECOLAP_KEYS.SESION_ACTUAL, sesion);
        }
        return usuarios[indice].puntos;
    }
    return 0;
}


/* ==========================================================================
   3. GESTIÓN DE SOLICITUDES / REGISTROS DE RECICLAJE (MAPA / ADMIN)
   ========================================================================== */

// Registrar una nueva solicitud o reporte de recolección
function crearSolicitudRecoleccion(datosSolicitud) {
    const solicitudes = getStorage(ECOLAP_KEYS.SOLICITUDES) || [];
    
    const nuevaSolicitud = {
        id: 'SOL-' + Date.now(),
        fecha: new Date().toLocaleString(),
        estado: 'Pendiente', // Pendiente, En Camino, Completado
        ...datosSolicitud
    };

    solicitudes.push(nuevaSolicitud);
    setStorage(ECOLAP_KEYS.SOLICITUDES, solicitudes);
    return nuevaSolicitud;
}

// Obtener todas las solicitudes (para el panel de administración admin.html)
function obtenerTodasLasSolicitudes() {
    return getStorage(ECOLAP_KEYS.SOLICITUDES) || [];
}