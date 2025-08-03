document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const updateUsernameForm = document.getElementById('updateUsernameForm');
    const updateUsernameMessage = document.getElementById('updateUsernameMessage');
    const updateEmailForm = document.getElementById('updateEmailForm');
    const updateEmailMessage = document.getElementById('updateEmailMessage');
    const updatePasswordForm = document.getElementById('updatePasswordForm');
    const updatePasswordMessage = document.getElementById('updatePasswordMessage');
    const logoutButton = document.getElementById('logoutButton');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    function renderPage() {
        if (currentUser) {
            authSection.classList.add('hidden');
            profileSection.classList.remove('hidden');
            document.getElementById('profile-username').textContent = currentUser.username;
            document.getElementById('profile-email').textContent = currentUser.email;
        } else {
            authSection.classList.remove('hidden');
            profileSection.classList.add('hidden');
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        loginMessage.textContent = 'Iniciando sesión...';
        loginMessage.style.color = '#3498db';
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                loginMessage.textContent = 'Sesión iniciada con éxito.';
                loginMessage.style.color = '#2ecc71';
                currentUser = data.user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                renderPage();
            } else {
                loginMessage.textContent = data.error;
                loginMessage.style.color = '#e74c3c';
            }
        } catch (error) {
            loginMessage.textContent = 'Error de conexión con el servidor.';
            loginMessage.style.color = '#e74c3c';
        }
    });

    updateUsernameForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsernameInput').value;

        updateUsernameMessage.textContent = 'Actualizando...';
        updateUsernameMessage.style.color = '#3498db';
        
        try {
            const response = await fetch('/api/update-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentUser.id, newUsername })
            });
            
            const data = await response.json();

            if (response.ok) {
                updateUsernameMessage.textContent = data.message;
                updateUsernameMessage.style.color = '#2ecc71';
                currentUser.username = data.username;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                renderPage();
            } else {
                updateUsernameMessage.textContent = data.error;
                updateUsernameMessage.style.color = '#e74c3c';
            }
        } catch (error) {
            updateUsernameMessage.textContent = 'Error de conexión con el servidor.';
            updateUsernameMessage.style.color = '#e74c3c';
        }
    });

    updateEmailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newEmail = document.getElementById('newEmailInput').value;
        
        updateEmailMessage.textContent = 'Actualizando...';
        updateEmailMessage.style.color = '#3498db';

        try {
            const response = await fetch('/api/update-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentUser.id, newEmail })
            });
            
            const data = await response.json();

            if (response.ok) {
                updateEmailMessage.textContent = data.message;
                updateEmailMessage.style.color = '#2ecc71';
                currentUser.email = data.email;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                renderPage();
            } else {
                updateEmailMessage.textContent = data.error;
                updateEmailMessage.style.color = '#e74c3c';
            }
        } catch (error) {
            updateEmailMessage.textContent = 'Error de conexión con el servidor.';
            updateEmailMessage.style.color = '#e74c3c';
        }
    });

    updatePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById('oldPasswordInput').value;
        const newPassword = document.getElementById('newPasswordInput').value;
        
        updatePasswordMessage.textContent = 'Actualizando...';
        updatePasswordMessage.style.color = '#3498db';

        try {
            const response = await fetch('/api/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentUser.id, oldPassword, newPassword })
            });
            
            const data = await response.json();

            if (response.ok) {
                updatePasswordMessage.textContent = data.message;
                updatePasswordMessage.style.color = '#2ecc71';
                updatePasswordForm.reset();
            } else {
                updatePasswordMessage.textContent = data.error;
                updatePasswordMessage.style.color = '#e74c3c';
            }
        } catch (error) {
            updatePasswordMessage.textContent = 'Error de conexión con el servidor.';
            updatePasswordMessage.style.color = '#e74c3c';
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        currentUser = null;
        renderPage();
        loginMessage.textContent = 'Sesión cerrada.';
    });

    renderPage();
});
