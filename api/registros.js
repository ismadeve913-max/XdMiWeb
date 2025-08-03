module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password, ip_address, city } = req.body;

        // Aquí iría tu lógica de base de datos para registrar un nuevo usuario.
        // 1. Validar los datos de entrada (username, email, password).
        // 2. Hash de la contraseña antes de guardarla.
        // 3. Insertar el nuevo usuario en tu base de datos (por ejemplo, MongoDB, PostgreSQL, etc.).
        // 4. Devolver una respuesta de éxito o de error.

        // Ejemplo de respuesta de éxito (placeholder):
        if (username && email && password) {
            console.log(`Nuevo usuario registrado: ${username} desde ${city} (${ip_address})`);
            const newUser = {
                id: 1, // Simula un ID de base de datos
                username,
                email
            };
            res.status(200).json({ message: 'Usuario registrado con éxito', user: newUser });
        } else {
            res.status(400).json({ error: 'Faltan datos de registro.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
    }
};
