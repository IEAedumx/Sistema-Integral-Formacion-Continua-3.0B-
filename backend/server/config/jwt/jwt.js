const expressJwt = require('express-jwt');
const config = require('./config.json');

module.exports = function() {
    const {
        secret
    } = config;
    console.log('Entra a JWT')
    return expressJwt({
        secret
    }).unless({
        path: [
            // public routes that don't require authentication
            'backassets',
			'/backassets/logos',
			'/backassets/logos/*',
            '/uploadLogo',
            '/sippe/:curp',
            '/usuarios/login',
            '/usuarios/registro',
            '/usuarios/restore',
            '/usuarios/iealogin',
            '/usuarios/*',
			'/cambiar'
        ]
    });
};