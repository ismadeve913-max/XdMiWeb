module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Aquí iría tu lógica de base de datos para el inicio de sesión.
        // 1. Buscar al usuario por el nombre de usuario en tu base de datos.
        // 2. Comparar la contraseña ingresada con el hash guardado en la base de datos.
        // 3. Si las credenciales son correctas, devolver una respuesta de éxito con los datos del usuario.
        // 4. Devolver una respuesta de error si las credenciales son incorrectas.

        // Ejemplo de respuesta de éxito (placeholder):
        if (username === 'admin' && password === 'password123') {
            const user = {
                id: 1,
                username: 'admin',
                email: 'admin@example.com'
            };
            res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
    }
};
