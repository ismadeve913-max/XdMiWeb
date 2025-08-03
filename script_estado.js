// Oculta la pantalla de carga y muestra el contenido después de un tiempo
window.onload = function() {
    setTimeout(function() {
        const cargando = document.getElementById('cargando');
        const contenido = document.getElementById('contenido');
        if (cargando && contenido) {
            cargando.style.display = 'none';
            contenido.style.display = 'block';
        }
    }, 2000); // 2000 milisegundos = 2 segundos
};

// Simulación de datos para la funcionalidad de estado
function simularDatosEstado() {
    // Genera un tiempo de actividad simulado (ej. 3 días, 4 horas, 22 minutos)
    const totalSegundos = 267720;
    const dias = Math.floor(totalSegundos / (3600 * 24));
    const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);

    // Muestra el tiempo de actividad
    document.getElementById('uptime').textContent = `${dias}d ${horas}h ${minutos}m`;

    // Simula la velocidad de la página (latencia)
    const velocidad = Math.floor(Math.random() * 100) + 50; // entre 50ms y 150ms
    document.getElementById('velocidad').textContent = `${velocidad}ms`;

    // Simula el estado de la página (ej. "En línea")
    document.getElementById('estado-pagina').textContent = "En línea";
    document.getElementById('estado-pagina').classList.remove('color-rojo');
    document.getElementById('estado-pagina').classList.add('color-verde');
}

// Función para obtener la dirección IP, ubicación y hora del usuario
function obtenerInfoUsuario() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            if (data.ip) {
                document.getElementById('user-ip').textContent = data.ip;
                document.getElementById('user-location').textContent = `${data.city}, ${data.country_name}`;

                // Obtiene la hora actual en la zona horaria del usuario
                const opciones = {
                    timeZone: data.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false // Formato de 24 horas
                };
                const horaLocal = new Date().toLocaleTimeString('es-ES', opciones);
                document.getElementById('user-time').textContent = horaLocal;

            } else {
                throw new Error('No se pudo obtener la información de la IP.');
            }
        })
        .catch(error => {
            console.error('Error al obtener la información:', error);
            document.getElementById('user-ip').textContent = "Error";
            document.getElementById('user-location').textContent = "Error";
            document.getElementById('user-time').textContent = "Error";
        });
}

// Llama a las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    simularDatosEstado();
    obtenerInfoUsuario();
});
