const pantallaCarga = document.getElementById('cargando');
const contenidoPrincipal = document.getElementById('contenido');
const musicaFondo = document.getElementById('musicaFondo');

setTimeout(() => {
    pantallaCarga.style.display = 'none';
    contenidoPrincipal.classList.remove('oculto');
}, 10000);

// Nuevo código para reproducir música al primer clic
let musicaIniciada = false;
contenidoPrincipal.addEventListener('click', () => {
    if (!musicaIniciada) {
        musicaFondo.play();
        musicaIniciada = true;
    }
});


// Simulación de datos del bot (reemplaza esto con tus datos reales)
const datosBot = {
    nombre: 'Bot de WhatsApp',
    estado: 'En línea',
    grupoId: '1234567890',
    mensajesEnviados: 1250,
    comandosUtilizados: 876,
    miembrosGrupo: 52
};

document.getElementById('user-name').textContent = datosBot.nombre;
document.getElementById('status-text').textContent = datosBot.estado;
document.getElementById('group-id').textContent = `ID del Grupo: ${datosBot.grupoId}`;
document.getElementById('mensajes-enviados').textContent = datosBot.mensajesEnviados;
document.getElementById('comandos-utilizados').textContent = datosBot.comandosUtilizados;
document.getElementById('miembros-grupo').textContent = datosBot.miembrosGrupo;

const estadoDot = document.querySelector('.status-dot');
if (datosBot.estado === 'En línea') {
    estadoDot.style.backgroundColor = 'var(--color-secundario)';
} else {
    estadoDot.style.backgroundColor = 'var(--color-terciario)';
}
