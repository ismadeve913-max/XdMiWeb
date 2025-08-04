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
    }, 5000);
    
    // Función para aplicar la animación serpenteante
    function applySerpentineAnimation() {
        const descriptionParagraphs = document.querySelectorAll('.hidden-panel p');
        descriptionParagraphs.forEach(p => {
            const text = p.textContent;
            p.innerHTML = '';
            const words = text.split(' ');
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-block';
                word.split('').forEach((letter, i) => {
                    const span = document.createElement('span');
                    span.className = 'serpentine-letter';
                    span.textContent = letter;
                    span.style.setProperty('--delay', `${i * 0.1}s`);
                    wordSpan.appendChild(span);
                });
                p.appendChild(wordSpan);
                p.appendChild(document.createTextNode(' '));
            });
        });
    }

    applySerpentineAnimation();

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
