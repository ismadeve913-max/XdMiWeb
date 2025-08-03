document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const mensajeEstado = document.getElementById('mensaje-estado');
    const bienvenidaContainer = document.getElementById('bienvenida-container');
    const registroContainer = document.getElementById('registro-container');

    let userInfo = {};

    function obtenerInfoUsuario() {
        return fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                if (data.ip) {
                    userInfo.ip_address = data.ip;
                    userInfo.city = data.city;
                    userInfo.timezone = data.timezone;
                } else {
                    throw new Error('No se pudo obtener la información de la IP.');
                }
            })
            .catch(error => {
                console.error('Error al obtener la información:', error);
                userInfo.ip_address = null;
                userInfo.city = null;
                userInfo.timezone = null;
            });
    }

    function mostrarBienvenida(username, timezone) {
        const opciones = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const horaLocal = new Date().toLocaleTimeString('es-ES', opciones);

        document.getElementById('bienvenida-usuario').textContent = `@${username}`;
        document.getElementById('hora-local').textContent = horaLocal;
        
        registroContainer.style.display = 'none';
        bienvenidaContainer.style.display = 'block';
    }

    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        mensajeEstado.textContent = 'Registrando...';
        mensajeEstado.style.color = '#3498db';

        await obtenerInfoUsuario();

        try {
            const response = await fetch('/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username, 
                    email, 
                    password,
                    ip_address: userInfo.ip_address,
                    city: userInfo.city
                }),
            });

            const data = await response.json();

            if (response.ok) {
                mensajeEstado.textContent = data.message;
                mensajeEstado.style.color = '#2ecc71';
                
                mostrarBienvenida(data.user.username, userInfo.timezone);
            } else {
                mensajeEstado.textContent = data.error;
                mensajeEstado.style.color = '#e74c3c';
            }
        } catch (error) {
            mensajeEstado.textContent = 'Error de conexión con el servidor.';
            mensajeEstado.style.color = '#e74c3c';
            console.error('Error:', error);
        }
    });
});
