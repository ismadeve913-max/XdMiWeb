document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('admin-login-section');
    const panelSection = document.getElementById('admin-panel-section');
    const loginForm = document.getElementById('adminLoginForm');
    const message = document.getElementById('adminMessage');
    const logoutButton = document.getElementById('logoutAdminButton');

    let isAdmin = localStorage.getItem('isAdmin');

    function renderPage() {
        if (isAdmin === 'true') {
            loginSection.classList.add('hidden');
            panelSection.classList.remove('hidden');
            // Añadir la clase de animación cuando se muestra el panel
            document.querySelector('#admin-panel-section .slide-up-content').classList.add('slide-up-content');
        } else {
            loginSection.classList.remove('hidden');
            panelSection.classList.add('hidden');
            // Quitar la clase de animación si el usuario no está logueado
            const slideUpContent = document.querySelector('#admin-panel-section .slide-up-content');
            if (slideUpContent) {
                slideUpContent.classList.remove('slide-up-content');
            }
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = document.getElementById('adminTokenInput').value;
        
        message.textContent = 'Verificando...';
        message.style.color = '#3498db';

        try {
            const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            const data = await response.json();
            
            if (response.ok) {
                message.textContent = data.message;
                message.style.color = '#2ecc71';
                localStorage.setItem('isAdmin', 'true');
                isAdmin = 'true';
                renderPage();
            } else {
                message.textContent = data.error;
                message.style.color = '#e74c3c';
            }
        } catch (error) {
            message.textContent = 'Error de conexión con el servidor.';
            message.style.color = '#e74c3c';
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        isAdmin = null;
        renderPage();
        message.textContent = 'Sesión de administrador cerrada.';
    });

    renderPage();
});
