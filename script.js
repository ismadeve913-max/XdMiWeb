document.addEventListener('DOMContentLoaded', () => {
    const pantallaCarga = document.getElementById('cargando');
    const contenidoPrincipal = document.getElementById('contenido');
    const musicaFondo = document.getElementById('musicaFondo');
    
    // Pantalla de carga
    setTimeout(() => {
        pantallaCarga.style.display = 'none';
        contenidoPrincipal.style.display = 'flex';
    }, 10000);

    // Música de fondo al primer clic del usuario
    let musicaIniciada = false;
    document.body.addEventListener('click', () => {
        if (!musicaIniciada) {
            musicaFondo.play().catch(error => {
                console.error("No se pudo reproducir la música automáticamente:", error);
            });
            musicaIniciada = true;
        }
    });

    // Funcionalidad de los botones desplegables
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const enlacesWhatsapp = document.getElementById('enlaces-whatsapp');

    btnWhatsapp.addEventListener('click', () => {
        if (enlacesWhatsapp.style.display === 'none') {
            enlacesWhatsapp.style.display = 'flex';
        } else {
            enlacesWhatsapp.style.display = 'none';
        }
    });
    
    const btnPaginas = document.getElementById('btn-paginas');
    const enlacesPaginas = document.getElementById('enlaces-paginas');

    btnPaginas.addEventListener('click', () => {
        if (enlacesPaginas.style.display === 'none') {
            enlacesPaginas.style.display = 'flex';
        } else {
            enlacesPaginas.style.display = 'none';
        }
    });
});
