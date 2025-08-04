document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    const body = document.body;

    // Animación del texto de carga
    const loadingTextElement = document.getElementById('loading-text-animation');
    loadingTextElement.innerHTML = loadingTextElement.textContent.split('').map((letter, i) => {
        return `<span class="moving-letter" style="--i: ${i + 1}">${letter}</span>`;
    }).join('');

    // Temporizador para la pantalla de carga
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        body.classList.remove('fondo-estatico');
        body.style.filter = 'none';

        // Intentar iniciar la música una vez que la página ha cargado
        playMusic();
    }, 5000);

    // Animación de rotación de la imagen cada 30 segundos
    const rotatingImage = document.getElementById('rotating-image');

    setInterval(() => {
        rotatingImage.classList.add('spin-active');
        setTimeout(() => {
            rotatingImage.classList.remove('spin-active');
        }, 5000);
    }, 30000);
});

// Lógica de búsqueda y filtro
function filterCommands() {
    const input = document.getElementById('command-search');
    const filter = input.value.toLowerCase();
    const buttons = document.getElementById('commands-list').getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const text = button.textContent || button.innerText;
        const category = button.getAttribute('data-category') || '';
        
        if (text.toLowerCase().includes(filter) || category.toLowerCase().includes(filter)) {
            button.style.display = "";
        } else {
            button.style.display = "none";
        }
    }
}

// Lógica para mostrar y ocultar los paneles
function showCommandPanel(panelId) {
    const panelContainer = document.getElementById('command-interface-panel');
    const panels = panelContainer.querySelectorAll('.hidden-panel');

    panels.forEach(panel => panel.style.display = 'none');
    
    const selectedPanel = document.getElementById(panelId + '-panel');
    if (selectedPanel) {
        selectedPanel.style.display = 'block';
    }

    panelContainer.classList.add('active', 'glowing-border');
}

function hideCommandPanel() {
    const panelContainer = document.getElementById('command-interface-panel');
    panelContainer.classList.remove('active', 'glowing-border');
}

// Lógica para la reproducción de música
let currentAudioIndex = 0;
// Lista de los tres archivos de audio a reproducir (URLs de ejemplo)
const audioFiles = [
    'https://freesound.org/data/previews/256/256083_4719230-hq.mp3',
    'https://freesound.org/data/previews/148/148017_2654316-hq.mp3',
    'https://freesound.org/data/previews/329/329972_5056637-hq.mp3'
];
const audioPlayer = new Audio();

function playNextAudio() {
    // Incrementa el índice y usa el operador módulo (%) para volver al principio de la lista
    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
    audioPlayer.src = audioFiles[currentAudioIndex];
    audioPlayer.play().catch(error => {
        console.log("La reproducción automática de audio fue bloqueada. El usuario debe interactuar con la página.");
    });
}

function playMusic() {
    audioPlayer.src = audioFiles[currentAudioIndex];
    // Cuando un audio termina, se llama a la función para reproducir el siguiente
    audioPlayer.addEventListener('ended', playNextAudio);
    audioPlayer.play().catch(error => {
        console.log("La reproducción automática de audio fue bloqueada. El usuario debe interactuar con la página.");
    });
}
