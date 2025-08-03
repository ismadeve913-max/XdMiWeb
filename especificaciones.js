// Obtenemos los elementos de la pantalla de carga y el contenido
const pantallaCarga = document.getElementById('cargando-especificaciones');
const contenidoPrincipal = document.getElementById('contenido-especificaciones');

// Ocultamos la pantalla de carga después de 10 segundos
setTimeout(() => {
    pantallaCarga.style.display = 'none';
    contenidoPrincipal.classList.remove('oculto');
}, 10000);


// Obtenemos los elementos de la búsqueda y la interfaz de Kick
const buscador = document.getElementById('buscador');
const categorias = document.querySelectorAll('.categoria');

const botonKick = document.getElementById('boton-kick');
const interfazKick = document.getElementById('interfaz-kick');
const cerrarBtn = document.getElementById('cerrar-interfaz');

botonKick.addEventListener('click', () => {
    interfazKick.classList.add('interfaz-mostrada');
    interfazKick.classList.remove('interfaz-oculta');
});

cerrarBtn.addEventListener('click', () => {
    interfazKick.classList.remove('interfaz-mostrada');
    interfazKick.classList.add('interfaz-oculta');
});

buscador.addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();

    categorias.forEach(categoria => {
        const textoCategoria = categoria.textContent.toLowerCase();

        if (textoCategoria.includes(busqueda)) {
            categoria.style.display = 'block';
        } else {
            categoria.style.display = 'none';
        }
    });
});
