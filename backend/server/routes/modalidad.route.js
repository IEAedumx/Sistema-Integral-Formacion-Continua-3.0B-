const express = require('express');
const Modalidades = require('../models/modalidad.model');

const app = express();

app.get('/modalidades', function(req, res) {
    Modalidades.find({})
        .exec((err, modalidades) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                modalidades
            });
        });
});

app.post('/modalidades', function(req, res) {
    modalidad = new Modalidades(req.body);
    modalidad.save((err, modalidadDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            modalidad: modalidadDB
        });
    });
});

module.exports = app;