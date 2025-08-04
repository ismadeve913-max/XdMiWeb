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

// Datos de todos los comandos
const commandData = {
    'kick': {
        usage: '.kick @usuario',
        description: 'Expulsa a un usuario del grupo.'
    },
    'mute': {
        usage: '.mute @usuario',
        description: 'Silencia a un usuario en el grupo para que no pueda enviar mensajes.'
    },
    'unmute': {
        usage: '.unmute @usuario',
        description: 'Quita el silencio a un usuario en el grupo.'
    },
    'ban': {
        usage: '.ban @usuario',
        description: 'Expulsa y prohíbe permanentemente a un usuario del grupo.'
    },
    'unban': {
        usage: '.unban @usuario',
        description: 'Desbanear a un usuario de un grupo.'
    },
    'promote': {
        usage: '.promote @usuario',
        description: 'Promueve a un usuario a administrador del grupo.'
    },
    'demote': {
        usage: '.demote @usuario',
        description: 'Degrada a un usuario de administrador a miembro normal.'
    },
    'tagall': {
        usage: '.tagall (mensaje)',
        description: 'Menciona a todos los miembros del grupo con un mensaje opcional.'
    },
    'antilink': {
        usage: '.antilink (on/off)',
        description: 'Activa o desactiva la función para eliminar enlaces no deseados.'
    },
    'antibadword': {
        usage: '.antibadword (on/off)',
        description: 'Activa o desactiva la función para censurar malas palabras.'
    },
    'welcome': {
        usage: '.welcome (on/off)',
        description: 'Activa o desactiva los mensajes de bienvenida automáticos.'
    },
    'goodbye': {
        usage: '.goodbye (on/off)',
        description: 'Activa o desactiva los mensajes de despedida automáticos.'
    },
    'delete': {
        usage: '.delete o .del (responde a un mensaje)',
        description: 'Elimina un mensaje del bot al que se le responde.'
    },
    'resetlink': {
        usage: '.resetlink o .revoke',
        description: 'Reinicia el enlace de invitación del grupo.'
    },
    'staff': {
        usage: '.staff o .admins',
        description: 'Muestra una lista de todos los administradores del grupo.'
    },
    'groupinfo': {
        usage: '.groupinfo o .infogp',
        description: 'Muestra información detallada sobre el grupo actual.'
    },
    'warnings': {
        usage: '.warnings @usuario',
        description: 'Muestra la cantidad de advertencias de un usuario.'
    },
    'warn': {
        usage: '.warn @usuario',
        description: 'Añade una advertencia a un usuario.'
    },
    'mode': {
        usage: '.mode (public/private)',
        description: 'Cambia el modo de uso del bot a público o privado.'
    },
    'autostatus': {
        usage: '.autostatus (on/off)',
        description: 'Activa o desactiva la función de ver estados automáticamente.'
    },
    'antidelete': {
        usage: '.antidelete (on/off)',
        description: 'Activa o desactiva la función para evitar la eliminación de mensajes.'
    },
    'clearsession': {
        usage: '.clearsession',
        description: 'Borra la sesión del bot para un reinicio limpio.'
    },
    'cleartmp': {
        usage: '.cleartmp',
        description: 'Borra los archivos temporales del bot.'
    },
    'setpp': {
        usage: '.setpp (responde a una imagen)',
        description: 'Cambia la foto de perfil del bot.'
    },
    'autoreact': {
        usage: '.autoreact o .areact (on/off)',
        description: 'Activa o desactiva la reacción automática del bot a los mensajes.'
    },
    'jid': {
        usage: '.jid',
        description: 'Muestra el ID de chat del grupo o del usuario.'
    },
    'help': {
        usage: '.help o .menu',
        description: 'Muestra el menú de ayuda con todos los comandos disponibles.'
    },
    'owner': {
        usage: '.owner',
        description: 'Muestra la información de contacto del dueño del bot.'
    },
    'ping': {
        usage: '.ping',
        description: 'Muestra la latencia del bot (ping).'
    },
    'uptime': {
        usage: '.uptime',
        description: 'Muestra el tiempo que el bot lleva en funcionamiento.'
    },
    'git': {
        usage: '.git o .github',
        description: 'Muestra el enlace del repositorio de GitHub del bot.'
    },
    'take': {
        usage: '.take (responde a un sticker)',
        description: 'Cambia la información de un sticker (autor y nombre).'
    },
    'simage': {
        usage: '.simage (responde a un sticker)',
        description: 'Convierte un sticker en una imagen.'
    },
    'getpp': {
        usage: '.getpp (@usuario)',
        description: 'Muestra la foto de perfil de un usuario.'
    },
    'ttt': {
        usage: '.ttt o .tictactoe (@usuario)',
        description: 'Inicia un juego de tres en raya contra un usuario.'
    },
    'surrender': {
        usage: '.surrender',
        description: 'Ríndete en el juego de tres en raya.'
    },
    'hangman': {
        usage: '.hangman',
        description: 'Inicia un juego de ahorcado.'
    },
    'guess': {
        usage: '.guess (letra/palabra)',
        description: 'Adivina una letra o palabra en el juego del ahorcado.'
    },
    'trivia': {
        usage: '.trivia',
        description: 'Inicia un juego de trivia con una pregunta aleatoria.'
    },
    'answer': {
        usage: '.answer (respuesta)',
        description: 'Responde a una pregunta de trivia.'
    },
    '8ball': {
        usage: '.8ball (pregunta)',
        description: 'Hazle una pregunta mágica a la bola 8 y obtén una respuesta aleatoria.'
    },
    'sticker': {
        usage: '.sticker o .s (responde a una imagen/video)',
        description: 'Crea un sticker a partir de una imagen o un video.'
    },
    'attp': {
        usage: '.attp (texto)',
        description: 'Crea un sticker animado de texto.'
    },
    'blur': {
        usage: '.blur (responde a una imagen)',
        description: 'Aplica un efecto de desenfoque a una imagen.'
    },
    'emojimix': {
        usage: '.emojimix (emoji1) (emoji2)',
        description: 'Combina dos emojis para crear uno nuevo.'
    },
    'stickertelegram': {
        usage: '.stickertelegram o .tg (URL del sticker)',
        description: 'Crea un sticker a partir de un paquete de stickers de Telegram.'
    },
    'viewonce': {
        usage: '.viewonce o .vv (responde a una imagen/video)',
        description: 'Convierte una imagen o video normal en un mensaje de "ver una vez".'
    },
    'instagram': {
        usage: '.instagram o .insta (URL)',
        description: 'Descarga videos e imágenes de Instagram.'
    },
    'facebook': {
        usage: '.facebook o .fb (URL)',
        description: 'Descarga videos de Facebook.'
    },
    'tiktok': {
        usage: '.tiktok o .tt (URL)',
        description: 'Descarga videos de TikTok sin marca de agua.'
    },
    'song': {
        usage: '.song o .music (nombre de la canción)',
        description: 'Descarga una canción como archivo de audio (MP3).'
    },
    'play': {
        usage: '.play o .mp3 (nombre de la canción)',
        description: 'Descarga una canción como archivo de audio (MP3).'
    },
    'video': {
        usage: '.video o .mp4 (nombre del video)',
        description: 'Descarga un video de YouTube.'
    },
    'imagine': {
        usage: '.imagine (descripción de la imagen)',
        description: 'Genera una imagen a partir de una descripción con IA.'
    },
    'meme': {
        usage: '.meme',
        description: 'Envía un meme aleatorio.'
    },
    'joke': {
        usage: '.joke',
        description: 'Envía un chiste aleatorio.'
    },
    'quote': {
        usage: '.quote',
        description: 'Envía una frase célebre aleatoria.'
    },
    'fact': {
        usage: '.fact',
        description: 'Envía un dato curioso aleatorio.'
    },
    'compliment': {
        usage: '.compliment',
        description: 'Envía un cumplido aleatorio.'
    },
    'insult': {
        usage: '.insult',
        description: 'Envía un insulto aleatorio.'
    },
    'lyrics': {
        usage: '.lyrics (nombre de la canción)',
        description: 'Busca la letra de una canción.'
    },
    'dare': {
        usage: '.dare',
        description: 'Envía un reto aleatorio.'
    },
    'truth': {
        usage: '.truth',
        description: 'Envía una pregunta de "verdad" aleatoria.'
    },
    'flirt': {
        usage: '.flirt',
        description: 'Envía una frase para coquetear aleatoria.'
    },
    'ship': {
        usage: '.ship (@usuario)',
        description: 'Calcula la compatibilidad entre dos personas.'
    },
    'stupid': {
        usage: '.stupid o .iss',
        description: 'Genera una frase "estúpida" aleatoria.'
    },
    'simp': {
        usage: '.simp',
        description: 'Muestra una imagen de un "simp" aleatorio.'
    },
    'character': {
        usage: '.character',
        description: 'Muestra un personaje aleatorio.'
    },
    'wasted': {
        usage: '.wasted (responde a una imagen)',
        description: 'Aplica un filtro de "wasted" a una imagen.'
    },
    'goodnight': {
        usage: '.goodnight',
        description: 'Envía un mensaje de buenas noches aleatorio.'
    },
    'roseday': {
        usage: '.roseday',
        description: 'Envía un mensaje para el día de las rosas.'
    },
    'shayari': {
        usage: '.shayari',
        description: 'Envía un poema o "shayari" aleatorio.'
    },
    'metallic': {
        usage: '.metallic (texto)',
        description: 'Crea una imagen de texto con efecto metálico.'
    },
    'ice': {
        usage: '.ice (texto)',
        description: 'Crea una imagen de texto con efecto de hielo.'
    },
    'snow': {
        usage: '.snow (texto)',
        description: 'Crea una imagen de texto con efecto de nieve.'
    },
    'impressive': {
        usage: '.impressive (texto)',
        description: 'Crea una imagen de texto con un efecto impresionante.'
    },
    'matrix': {
        usage: '.matrix (texto)',
        description: 'Crea una imagen de texto con efecto de código de Matrix.'
    },
    'light': {
        usage: '.light (texto)',
        description: 'Crea una imagen de texto con efecto de luz.'
    },
    'neon': {
        usage: '.neon (texto)',
        description: 'Crea una imagen de texto con efecto de neón.'
    },
    'devil': {
        usage: '.devil (texto)',
        description: 'Crea una imagen de texto con efecto de diablo.'
    },
    'purple': {
        usage: '.purple (texto)',
        description: 'Crea una imagen de texto con un efecto morado.'
    },
    'thunder': {
        usage: '.thunder (texto)',
        description: 'Crea una imagen de texto con efecto de trueno.'
    },
    'leaves': {
        usage: '.leaves (texto)',
        description: 'Crea una imagen de texto con un efecto de hojas.'
    },
    '1917': {
        usage: '.1917 (texto)',
        description: 'Crea una imagen de texto con el estilo de la película "1917".'
    },
    'arena': {
        usage: '.arena (texto)',
        description: 'Crea una imagen de texto con un efecto de arena.'
    },
    'hacker': {
        usage: '.hacker (texto)',
        description: 'Crea una imagen de texto con un estilo de hacker.'
    },
    'sand': {
        usage: '.sand (texto)',
        description: 'Crea una imagen de texto con efecto de arena.'
    },
    'blackpink': {
        usage: '.blackpink (texto)',
        description: 'Crea una imagen de texto con el estilo de Blackpink.'
    },
    'glitch': {
        usage: '.glitch (texto)',
        description: 'Crea una imagen de texto con efecto de "glitch".'
    },
    'fire': {
        usage: '.fire (texto)',
        description: 'Crea una imagen de texto con un efecto de fuego.'
    },
    'translate': {
        usage: '.translate (idioma) (texto)',
        description: 'Traduce un texto a un idioma específico.'
    },
    'ss': {
        usage: '.ss o .ssweb (URL)',
        description: 'Toma una captura de pantalla de un sitio web.'
    },
    'weather': {
        usage: '.weather (ciudad)',
        description: 'Muestra el clima actual de una ciudad.'
    },
    'news': {
        usage: '.news',
        description: 'Muestra las noticias más recientes.'
    },
    'tts': {
        usage: '.tts (idioma) (texto)',
        description: 'Convierte texto a voz.'
    },
    'topmembers': {
        usage: '.topmembers',
        description: 'Muestra una lista de los miembros más activos del grupo.'
    },
    'gpt': {
        usage: '.gpt o .gemini (pregunta)',
        description: 'Responde a tus preguntas utilizando inteligencia artificial.'
    },
};

// Lógica de búsqueda y filtro
function filterCommands() {
    const input = document.getElementById('command-search');
    const filter = input.value.toLowerCase();
    const buttons = document.getElementById('commands-list').getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const text = button.textContent || button.innerText;
        const category = button.getAttribute('data-category') || '';
        
        // También busca en la descripción y uso del comando
        const commandInfo = commandData[button.getAttribute('onclick').match(/'(.*?)'/)[1]];
        const usage = commandInfo ? commandInfo.usage.toLowerCase() : '';
        const description = commandInfo ? commandInfo.description.toLowerCase() : '';

        if (text.toLowerCase().includes(filter) || category.toLowerCase().includes(filter) || usage.includes(filter) || description.includes(filter)) {
            button.style.display = "";
        } else {
            button.style.display = "none";
        }
    }
}

// Lógica para mostrar y ocultar los paneles
function showCommandPanel(commandId) {
    const panelContainer = document.getElementById('command-interface-panel');
    const panelContent = document.getElementById('command-panel-content');
    
    // Obtener los datos del comando del objeto
    const data = commandData[commandId];

    if (data) {
        // Limpiar el contenido anterior del panel
        panelContent.innerHTML = '';
        
        // Crear y añadir el encabezado de uso del comando
        const usageHeading = document.createElement('h2');
        usageHeading.textContent = `Uso Del Comando ${data.usage}`;
        
        // Crear y añadir la descripción
        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.textContent = data.description;
        
        panelContent.appendChild(usageHeading);
        panelContent.appendChild(descriptionParagraph);
        
        // Mostrar el contenedor del panel
        panelContainer.classList.add('active', 'glowing-border');
    }
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
