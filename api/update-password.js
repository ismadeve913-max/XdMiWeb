module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { id, oldPassword, newPassword } = req.body;

        // Lógica para actualizar la contraseña en tu base de datos.
        // 1. Buscar el usuario por su ID.
        // 2. Verificar que 'oldPassword' coincida con la contraseña actual (comparando hashes).
        // 3. Si coincide, hashear 'newPassword' y actualizar el campo 'password' en la base de datos.
        // 4. Devolver una respuesta de éxito o de error.

        // Ejemplo de respuesta de éxito (placeholder):
        if (id && oldPassword && newPassword) {
            console.log(`Usuario con ID ${id} actualizó su contraseña.`);
            res.status(200).json({ message: 'Contraseña actualizada con éxito.' });
        } else {
            res.status(400).json({ error: 'Faltan datos para la actualización.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
    }
};
