document.addEventListener('DOMContentLoaded', () => {
    // Código para la pantalla de carga
    const loader = document.querySelector('.loader-container');
    const MINIMO_TIEMPO_CARGA = 3000; // 3 segundos
    
    let minLoadTimeReached = false;
    let pageLoaded = false;

    // Se establece la bandera cuando se cumple el tiempo mínimo
    setTimeout(() => {
        minLoadTimeReached = true;
        if (pageLoaded) {
            hideLoader();
        }
    }, MINIMO_TIEMPO_CARGA);

    // Se establece la bandera cuando la página ha terminado de cargar
    window.addEventListener('load', () => {
        pageLoaded = true;
        if (minLoadTimeReached) {
            hideLoader();
        }
    });

    function hideLoader() {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }
    
    // --- Comienza el resto de la lógica de tu página ---
    const topPanel = document.getElementById('topPanel');
    const audio = document.getElementById('backgroundAudio');
    const audioButton = document.getElementById('audioButton');

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
