module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { id, newEmail } = req.body;

        // Lógica para actualizar el email en tu base de datos.
        // 1. Buscar el usuario por su ID.
        // 2. Actualizar el campo 'email' con el nuevo valor.
        // 3. Devolver una respuesta de éxito.

        // Ejemplo de respuesta de éxito (placeholder):
        if (id && newEmail) {
            console.log(`Usuario con ID ${id} actualizó su email a: ${newEmail}`);
            res.status(200).json({ message: 'Email actualizado con éxito.', email: newEmail });
        } else {
            res.status(400).json({ error: 'Faltan datos para la actualización.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
    }
};
