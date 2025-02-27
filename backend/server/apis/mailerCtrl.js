const request = require('request');
// email sender function
exports.sendEmail = function (correo) {
    // Definimos la cabecera

    request.post('https://script.google.com/macros/s/AKfycbwR5IU-e_XAFTgx3_-kkKLO1xZsnbXRtW8TcZ1g4e5Rijmsg4Q/exec', {
        json: correo
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`);
        console.log('Se restableció la contraseña y se envió a: ' + correo.email);
    })
};