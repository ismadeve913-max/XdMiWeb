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

    // Lógica para arrastrar el panel
    let isDragging = false;
    let offset = 0;

    topPanel.addEventListener('mousedown', (e) => {
        if (e.target !== audioButton) {
            isDragging = true;
            topPanel.classList.add('dragging');
            offset = e.clientY - topPanel.offsetTop;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const newTop = e.clientY - offset;
        if (newTop >= 0 && newTop + topPanel.offsetHeight <= window.innerHeight) {
            topPanel.style.top = newTop + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        topPanel.classList.remove('dragging');
    });

    // Lógica para la animación de la imagen circular
    function toggleMovingClass() {
        const circularImage = document.querySelector('.circular-image');
        circularImage.classList.toggle('moving');
    }

    setTimeout(() => {
        setInterval(toggleMovingClass, 10000);
    }, 10000);

    // Lógica para el audio
    let audioPlayedOnce = false;

    // Al primer clic en cualquier parte de la página, reproduce el audio
    document.addEventListener('click', () => {
        if (!audioPlayedOnce) {
            audio.play();
            audioPlayedOnce = true;
        }
    });

    // Controla el audio al hacer clic en el botón
    audioButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioButton.textContent = "►";
        } else {
            audio.pause();
            audioButton.textContent = "❚❚";
        }
    });
});
