document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejar la pantalla de carga
    const cargando = document.getElementById('cargando');
    const contenido = document.getElementById('contenido');
    
    // Oculta la pantalla de carga y muestra el contenido después de 3 segundos
    setTimeout(() => {
        cargando.style.display = 'none';
        contenido.style.display = 'flex';
    }, 3000);

    // 2. Manejar el despliegue de botones
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const enlacesWhatsapp = document.getElementById('enlaces-whatsapp');

    const btnPaginas = document.getElementById('btn-paginas');
    const enlacesPaginas = document.getElementById('enlaces-paginas');

    btnWhatsapp.addEventListener('click', () => {
        // Alternar la visibilidad de los botones de WhatsApp
        if (enlacesWhatsapp.style.display === 'none') {
            enlacesWhatsapp.style.display = 'flex';
        } else {
            enlacesWhatsapp.style.display = 'none';
        }
    });

    btnPaginas.addEventListener('click', () => {
        // Alternar la visibilidad de los botones de páginas
        if (enlacesPaginas.style.display === 'none') {
            enlacesPaginas.style.display = 'flex';
        } else {
            enlacesPaginas.style.display = 'none';
        }
    });
});
