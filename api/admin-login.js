module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { token } = req.body;

        // Lógica para verificar el token de administrador.
        // Es altamente recomendable no usar un token fijo en el código de producción.
        // Deberías usar variables de entorno para tokens secretos.

        const adminToken = process.env.ADMIN_TOKEN || 'tu-token-secreto';

        if (token === adminToken) {
            res.status(200).json({ message: 'Acceso de administrador concedido.' });
        } else {
            res.status(401).json({ error: 'Token de acceso inválido.' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
    }
};
