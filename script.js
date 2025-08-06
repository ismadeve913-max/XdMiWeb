document.addEventListener('DOMContentLoaded', () => {
    // Código para la pantalla de carga
    const loader = document.querySelector('.loader-container');
    const MINIMO_TIEMPO_CARGA = 3000;
    
    let minLoadTimeReached = false;
    let pageLoaded = false;

    setTimeout(() => {
        minLoadTimeReached = true;
        if (pageLoaded) {
            hideLoader();
        }
    }, MINIMO_TIEMPO_CARGA);

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
    
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    const childButtonContainers = document.querySelectorAll('.child-buttons');

    // Lógica para arrastrar el panel (versión para ratón y táctil)
    let isDragging = false;
    let offset = 0;

    function handleStart(e) {
        if (e.target.closest('.dropdown-container') || e.target === audioButton) {
            return;
        }
        isDragging = true;
        topPanel.classList.add('dragging');
        
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        offset = clientY - topPanel.offsetTop;
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

    // Lógica para los botones desplegables
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetElement = document.getElementById(targetId);

            childButtonContainers.forEach(container => {
                if (container.id !== targetId) {
                    container.classList.remove('open');
                }
            });

            dropdownButtons.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('active');
                }
            });
            
            targetElement.classList.toggle('open');
            button.classList.toggle('active');
        });
    });
});
