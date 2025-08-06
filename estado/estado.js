document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const loaderContainer = document.querySelector('.loader-container');
    const panel = document.querySelector('.info-panel');
    const loadingTextLetters = document.querySelectorAll('.loading-text .letter');
    const rotatingImage = document.getElementById('rotating-image');
    const copyButtons = document.querySelectorAll('.copy-button'); // Nuevo selector para los botones de copiado

    loadingTextLetters.forEach((letter, index) => {
        letter.style.setProperty('--i', index);
    });

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn("Reproducción automática de audio bloqueada.");
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    }

    const mostrarPanel = () => {
        panel.classList.add('active');
    };
    
    let currentRotation = 0;
    setInterval(() => {
        currentRotation += 360;
        rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
    }, 30000);

    async function getIpAndLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            document.getElementById('ip-address').textContent = data.ip;
            document.getElementById('localidad').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
            
            const now = new Date();
            const options = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: false 
            };
            document.getElementById('hora-local').textContent = now.toLocaleTimeString('es-ES', options);
        } catch (error) {
            console.error('Error al obtener la IP:', error);
            document.getElementById('ip-address').textContent = 'Error';
            document.getElementById('localidad').textContent = 'Error';
            document.getElementById('hora-local').textContent = 'Error';
        }
    }
    
    function getPageLoadSpeed() {
        const perfData = window.performance.timing; 
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        const loadSpeedElement = document.getElementById('load-speed');
        
        if (loadTime > 0) {
            loadSpeedElement.textContent = `${(loadTime / 1000).toFixed(2)} segundos`;
        } else {
            loadSpeedElement.textContent = 'No disponible';
        }
    }
    
    // Nueva función para manejar el copiado
    const handleCopyClick = (e) => {
        const targetId = e.target.dataset.target;
        const textToCopy = document.getElementById(targetId).textContent;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Texto copiado: "${textToCopy}"`);
        }).catch(err => {
            console.error('Error al copiar el texto:', err);
        });
    };

    // Asignar el evento de clic a cada botón de copiado
    copyButtons.forEach(button => {
        button.addEventListener('click', handleCopyClick);
    });

    setTimeout(() => {
        loaderContainer.style.opacity = '0';
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            mostrarPanel();
        }, 500);
    }, 5000);

    getIpAndLocation();
    getPageLoadSpeed();
});
