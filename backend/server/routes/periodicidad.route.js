const express = require('express');
const Periodicidades = require('../models/periodicidad.model');

const app = express();

app.get('/periodicidades', function(req, res) {
    Periodicidades.find({})
        .exec((err, periodicidades) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                periodicidades
            });
        });
});

app.post('/periodicidades', function(req, res) {
    periodicidad = new Periodicidades(req.body);
    periodicidad.save((err, periodicidadDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            periodicidad: periodicidadDB
        });
    });
});

module.exports = app;