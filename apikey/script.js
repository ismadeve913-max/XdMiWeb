document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const loaderContainer = document.querySelector('.loader-container');
    const rotatingImage = document.getElementById('rotating-image');
    
    // Selectores para la nueva funcionalidad
    const apiPanel = document.getElementById('api-panel');
    const apiButtons = document.querySelectorAll('.api-button');
    const apiKeyDisplayPanel = document.getElementById('api-key-display-panel');
    const keyTitle = document.getElementById('key-title');
    const apiKeyTextElement = document.getElementById('api-key-text');
    const copyApiKeyButton = document.getElementById('copy-api-key');
    const closeDisplayPanelButton = document.getElementById('close-display-panel');
    const audioButton = document.getElementById('audio-button');


    // Lógica para la pantalla de carga
    const MINIMO_TIEMPO_CARGA = 5000;
    let minLoadTimeReached = false;

    setTimeout(() => {
        minLoadTimeReached = true;
        hideLoader();
    }, MINIMO_TIEMPO_CARGA);

    window.addEventListener('load', () => {
        hideLoader();
    });

    const hideLoader = () => {
        loaderContainer.style.opacity = '0';
        setTimeout(() => {
            loaderContainer.style.display = 'none';
        }, 1000);
    };

    // Lógica para el audio
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn("Reproducción automática de audio bloqueada.");
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    }

    audioButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioButton.textContent = "❚❚";
        } else {
            audio.pause();
            audioButton.textContent = "►";
        }
    });
    
    // Lógica para la rotación de la imagen
    let currentRotation = 0;
    setInterval(() => {
        currentRotation += 360;
        rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
    }, 30000);

    // Lógica del nuevo panel de API keys
    apiButtons.forEach(button => {
        button.addEventListener('click', () => {
            const keyName = button.textContent;
            const keyValue = button.dataset.key;
            
            keyTitle.textContent = `${keyName} API Key`;
            apiKeyTextElement.textContent = keyValue;
            
            apiKeyDisplayPanel.classList.add('active');
        });
    });

    closeDisplayPanelButton.addEventListener('click', () => {
        apiKeyDisplayPanel.classList.remove('active');
    });

    copyApiKeyButton.addEventListener('click', () => {
        const textToCopy = apiKeyTextElement.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Clave copiada al portapapeles.");
        }).catch(err => {
            console.error('Error al copiar el texto:', err);
        });
    });
});
