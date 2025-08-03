module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { id, newUsername } = req.body;

        // Lógica para actualizar el nombre de usuario en tu base de datos.
        // 1. Buscar el usuario por su ID.
        // 2. Actualizar el campo 'username' con el nuevo valor.
        // 3. Devolver una respuesta de éxito.

        // Ejemplo de respuesta de éxito (placeholder):
        if (id && newUsername) {
            console.log(`Usuario con ID ${id} actualizó su nombre a: ${newUsername}`);
            res.status(200).json({ message: 'Nombre de usuario actualizado con éxito.', username: newUsername });
        } else {
            res.status(400).json({ error: 'Faltan datos para la actualización.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
    }
};
