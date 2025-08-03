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
        const h2 = categoria.querySelector('h2').textContent.toLowerCase();
        const lis = categoria.querySelectorAll('li');
        let hayResultadosEnCategoria = false;

        lis.forEach(li => {
            const textoBoton = li.querySelector('.btn-especificacion').textContent.toLowerCase();
            const mostrar = h2.includes(busqueda) || textoBoton.includes(busqueda);
            li.style.display = mostrar ? 'block' : 'none';
            if (mostrar) {
                hayResultadosEnCategoria = true;
            }
        });

        categoria.style.display = hayResultadosEnCategoria ? 'block' : 'none';
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
