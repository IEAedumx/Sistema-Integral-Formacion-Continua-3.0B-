const express = require('express');
const NivelesEducativos = require('../models/niveles_educativos.model');

const app = express();

app.get('/nivelesEducativos', function(req, res) {
    NivelesEducativos.find({})
        .exec((err, nivelesEducativos) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                nivelesEducativos
            });
        });
});

app.post('/nivelesEducativos', function(req, res) {
    nivelEucativo = new NivelesEducativos(req.body);
    nivelEucativo.save((err, nivelEucativoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            nivelEucativo: nivelEucativoDB
        });
    });
});

module.exports = app;