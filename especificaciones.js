const pantallaCarga = document.getElementById('cargando-especificaciones');
const contenidoPrincipal = document.getElementById('contenido-especificaciones');

setTimeout(() => {
    pantallaCarga.style.display = 'none';
    contenidoPrincipal.classList.remove('oculto');
}, 10000);


const buscador = document.getElementById('buscador');
const categorias = document.querySelectorAll('.categoria');

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


const botonesEspecificacion = document.querySelectorAll('.btn-especificacion');
const interfazInfo = document.getElementById('interfaz-info');
const cerrarBtn = document.getElementById('cerrar-interfaz');
const descripciones = document.querySelectorAll('#interfaz-info > .contenido-interfaz > div');


botonesEspecificacion.forEach(boton => {
    boton.addEventListener('click', () => {
        const targetId = boton.dataset.target;

        descripciones.forEach(desc => {
            desc.classList.add('descripcion-oculta');
        });

        const descripcionAMostrar = document.getElementById(targetId);
        descripcionAMostrar.classList.remove('descripcion-oculta');

        interfazInfo.classList.add('interfaz-mostrada');
        interfazInfo.classList.remove('interfaz-oculta');
    });
});

cerrarBtn.addEventListener('click', () => {
    interfazInfo.classList.remove('interfaz-mostrada');
    interfazInfo.classList.add('interfaz-oculta');
});
