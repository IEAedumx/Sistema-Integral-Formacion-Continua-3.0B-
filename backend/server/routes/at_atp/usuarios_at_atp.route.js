const express = require('express');
const UsuariosATATP = require('../../models/at_atp/usuarios_at_atp.model');

app = express();

app.get('/atatp/usuarios', function (req, res){
    UsuariosATATP.find({})
    .exec((err, usuarios) => {
        if (err) return res.status(200).send('Error en consulta: ' + err);
        return res.status(200).json(usuarios);
    })
});

module.exports = app;