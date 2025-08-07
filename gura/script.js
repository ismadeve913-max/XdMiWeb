document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const loaderContainer = document.querySelector('.loader-container');
    const rotatingImage = document.getElementById('rotating-image');
    const gurabotButtons = document.querySelectorAll('.gurabot-button');
    const searchInput = document.getElementById('search-input');
    const musicToggleButton = document.getElementById('music-toggle-button');

    // Selectores de los botones de categoría
    const categoryButtons = document.querySelectorAll('.command-category-title');

    // Selectores del nuevo panel de información
    const commandInfoPanel = document.getElementById('command-info-panel');
    const closeCommandPanelButton = document.getElementById('close-command-panel');
    const commandTitleElement = document.getElementById('command-title');
    const commandDescriptionElement = document.getElementById('command-description');
    const copyCommandButton = document.getElementById('copy-command-button');

    // Objeto con descripciones de comandos (¡puedes personalizarlas!)
    const commandDescriptions = {
        '.bots': 'Muestra una lista de todos los bots disponibles.',
        '.qr': 'Genera un código QR para un texto o enlace.',
        '.code': 'Muestra el código de la API del bot.',
        '.setbanner': 'Cambia el banner principal del bot con una nueva imagen.',
        '.setname': 'Personaliza el nombre de tu socket para el bot.',
        '.undefined': 'Comando de ejemplo sin descripción específica.',
        '.mega': 'Descarga archivos desde enlaces de Mega.',
        '.apk': 'Descarga un archivo .apk desde una URL.',
        '.apkmod': 'Descarga un archivo .apk modificado desde una URL.',
        '.thread': 'Descarga un hilo de Twitter completo.',
        '.tiktoksearch <texto>': 'Busca videos de TikTok usando un texto.',
        '.mediafire': 'Descarga archivos desde enlaces de Mediafire.',
        '.p54': 'Comando especial para una función no especificada.',
        '.tiktokvid': 'Descarga un video de TikTok desde una URL.',
        '.tiktok <enlace>': 'Descarga un video de TikTok específico desde su enlace.',
        '.ytmp4doc': 'Descarga un video de YouTube como archivo MP4.',
        '.ig <url>': 'Descarga contenido de Instagram desde una URL.',
        '.lid': 'Muestra el ID de la cuenta actual.',
        '.tts <texto>': 'Convierte un texto en un mensaje de audio (Text-to-Speech).',
        '.errores': 'Muestra la lista de errores recientes del bot.',
        '.wm': 'Comando para gestionar marcas de agua.',
        '.deepseek': 'Accede a la inteligencia artificial de DeepSeek.',
        '.ver': 'Muestra la versión actual del bot.',
        '.ss <página web>': 'Toma una captura de pantalla de una página web.',
        '.tourl': 'Convierte un archivo en un enlace para compartir.',
        '.autoadmin': 'Concede permisos de administrador automáticamente.',
        '.dsowner': 'Muestra información sobre el dueño del bot.',
        '.join <chat.whatsapp.com> <dias>': 'Invita al bot a un grupo de WhatsApp por un tiempo determinado.',
        '.restart': 'Reinicia el bot de forma segura.',
        '.sendmeme': 'Envía un meme aleatorio.',
        '.update': 'Actualiza el bot a la última versión.',
        '.infobot': 'Muestra información general sobre el bot.',
        '.stats': 'Muestra las estadísticas de uso del bot.',
        '.sugerir < cosas pa la botsita >': 'Envía una sugerencia al desarrollador del bot.',
        '.horario': 'Muestra el horario de disponibilidad del bot.',
        '.on welcome': 'Activa el mensaje de bienvenida en un grupo.',
        '.off welcome': 'Desactiva el mensaje de bienvenida en un grupo.',
        '.on antilink': 'Activa la protección anti-enlaces en un grupo.',
        '.off antilink': 'Desactiva la protección anti-enlaces en un grupo.',
        '.del': 'Elimina un mensaje (responde al mensaje a eliminar).',
        '.delete': 'Sinónimo de .del.',
        '.demote @tag': 'Quita el rol de administrador a un usuario.',
        '.promote 593xxx': 'Concede el rol de administrador a un usuario por su número.',
        '.promote @usuario': 'Concede el rol de administrador a un usuario por su @tag.',
        '.promote responder chat': 'Concede el rol de administrador a un usuario al responder a su mensaje.',
        '.on reaccion': 'Activa la reacción automática del bot a mensajes.',
        '.off reaccion': 'Desactiva la reacción automática del bot a mensajes.',
        '.kick': 'Expulsa a un usuario de un grupo.',
        '.top <texto>': 'Comando para clasificar algo (ej: .top memes).',
        '.invocar <mensaje opcional>': 'Invoca a todos los miembros del grupo.',
        '.pinterest <texto>': 'Busca imágenes en Pinterest.',
        '.tiktoksearch': 'Busca videos en TikTok.',
        '.yts': 'Busca videos en YouTube.',
        '.qc': 'Crea un sticker a partir de un mensaje.',
        '.sticker': 'Crea un sticker a partir de una imagen o video.',
        '.stickersearch <texto>': 'Busca stickers usando un texto.',
        '.dalle <texto>': 'Genera una imagen con IA usando el motor DALL-E.'
    };

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

    // Lógica para el botón de música
    let isPlaying = false;
    musicToggleButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicToggleButton.style.color = 'white';
        } else {
            audio.play();
            isPlaying = true;
            musicToggleButton.style.color = '#99c8ff';
        }
    });

    // Lógica para la rotación de la imagen
    let currentRotation = 0;
    setInterval(() => {
        currentRotation += 360;
        rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
    }, 30000);

    // Lógica de los botones de categoría (desplegable)
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetContainer = document.getElementById(targetId);
            
            if (targetContainer) {
                targetContainer.classList.toggle('collapsed');
                targetContainer.classList.toggle('expanded');
            }
        });
    });

    // Lógica del buscador en tiempo real
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        
        gurabotButtons.forEach(button => {
            const command = button.dataset.command.toLowerCase().substring(1); // Quitar el prefijo "."
            if (command.includes(query)) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        // Lógica para ocultar/mostrar títulos de categoría y colapsar/expandir contenedores
        categoryButtons.forEach(categoryButton => {
            const buttonContainer = document.getElementById(categoryButton.dataset.target);
            let hasVisibleButtons = false;
            
            if (buttonContainer) {
                const buttons = buttonContainer.querySelectorAll('.gurabot-button');
                buttons.forEach(button => {
                    if (button.style.display === 'block' || button.style.display === '') {
                        hasVisibleButtons = true;
                    }
                });
                
                if (hasVisibleButtons) {
                    categoryButton.style.display = 'block';
                    if (query) { // Si hay una búsqueda activa, expande la categoría
                        buttonContainer.classList.remove('collapsed');
                        buttonContainer.classList.add('expanded');
                    } else { // Si no hay búsqueda, mantiene el estado actual (contraído/expandido)
                        // No hace nada para preservar el estado.
                    }
                } else {
                    categoryButton.style.display = 'none';
                }
            }
        });

        // Si el buscador está vacío, colapsa todas las categorías
        if (!query) {
            document.querySelectorAll('.gurabot-buttons-container.expanded').forEach(container => {
                container.classList.remove('expanded');
                container.classList.add('collapsed');
            });
            document.querySelectorAll('.command-category-title').forEach(categoryButton => {
                categoryButton.style.display = 'block';
            });
        }
    });

    // Lógica de los botones de Gurabot
    gurabotButtons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;
            const description = commandDescriptions[command] || 'Descripción no disponible.';
            
            commandTitleElement.textContent = `Uso del Comando "${command}"`;
            commandDescriptionElement.textContent = description;
            
            commandInfoPanel.classList.add('active');
        });
    });

    // Lógica del botón de cerrar el panel
    closeCommandPanelButton.addEventListener('click', () => {
        commandInfoPanel.classList.remove('active');
    });

    // Lógica del botón de copiar dentro del nuevo panel
    copyCommandButton.addEventListener('click', () => {
        const command = commandTitleElement.textContent.replace('Uso del Comando "', '').slice(0, -1);
        navigator.clipboard.writeText(command).then(() => {
            alert(`Comando '${command}' copiado al portapapeles.`);
        }).catch(err => {
            console.error('Error al copiar el texto:', err);
            alert(`Error al copiar el comando '${command}'.`);
        });
    });
});
