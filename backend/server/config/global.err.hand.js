module.exports = function(err, req, res, next) {
    if (typeof(err) === 'string') {
        // errores de la aplicación
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // errores de autenticación
        return res.status(401).json({ message: 'Invalid token' });
    }

    // default error 500 de servidor
    return res.status(500).json({ message: err.message });
};