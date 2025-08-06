document.addEventListener('DOMContentLoaded', () => {
    // Aquí puedes inicializar cualquier cosa que necesites para tu página
});

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-container');
    const topPanel = document.getElementById('topPanel');
    const audio = document.getElementById('backgroundAudio');
    const audioButton = document.getElementById('audioButton');

    // Duración de la pantalla de carga
    const MINIMO_TIEMPO_CARGA = 3000;
    const tiempoInicio = Date.now();
    const tiempoFin = Date.now();
    const tiempoTranscurrido = tiempoFin - tiempoInicio;
    const tiempoEspera = tiempoTranscurrido < MINIMO_TIEMPO_CARGA
        ? MINIMO_TIEMPO_CARGA - tiempoTranscurrido
        : 0;

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, tiempoEspera);

    // Lógica para arrastrar el panel (versión para ratón y táctil)
    let isDragging = false;
    let offset = 0;

    function handleStart(e) {
        if (e.target !== audioButton) {
            isDragging = true;
            topPanel.classList.add('dragging');
            
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            offset = clientY - topPanel.offsetTop;
        }
    }

    function handleMove(e) {
        if (!isDragging) return;

        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        e.preventDefault();
        const newTop = clientY - offset;
        
        if (newTop >= 0 && newTop + topPanel.offsetHeight <= window.innerHeight) {
            topPanel.style.top = newTop + 'px';
        }
    }

    function handleEnd() {
        isDragging = false;
        topPanel.classList.remove('dragging');
    }

    // Eventos para ratón
    topPanel.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // Eventos para dispositivos táctiles
    topPanel.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    // Lógica para el audio
    audioButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioButton.textContent = "❚❚";
        } else {
            audio.pause();
            audioButton.textContent = "►";
        }
    });
});
