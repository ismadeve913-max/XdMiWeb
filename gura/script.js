document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const loaderContainer = document.querySelector('.loader-container');
    const rotatingImage = document.getElementById('rotating-image');
    const gurabotButtons = document.querySelectorAll('.gurabot-button');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

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

    // Lógica para la rotación de la imagen
    let currentRotation = 0;
    setInterval(() => {
        currentRotation += 360;
        rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
    }, 30000);

    // Lógica de los botones de Gurabot
    gurabotButtons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;
            navigator.clipboard.writeText(command).then(() => {
                alert(`Comando '${command}' copiado al portapapeles.`);
            }).catch(err => {
                console.error('Error al copiar el texto:', err);
                alert(`Error al copiar el comando '${command}'.`);
            });
        });
    });

    // Lógica del buscador
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            alert(`Buscando el comando: "${query}"`);
        } else {
            alert('Por favor, introduce un comando para buscar.');
        }
    });

    // Permitir la búsqueda al presionar Enter en el campo de texto
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});
