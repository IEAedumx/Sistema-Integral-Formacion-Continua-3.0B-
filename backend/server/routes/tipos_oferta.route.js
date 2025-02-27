const express = require('express');
const TiposOferta = require('../models/tipos_oferta.model');

const app = express();

app.get('/tiposOferta', function(req, res) {
    TiposOferta.find({})
        .exec((err, tiposOferta) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                tiposOferta
            });
        });
});

app.post('/tiposOferta', function(req, res) {
    tipoOferta = new TiposOferta(req.body);
    tipoOferta.save((err, tipoOfertaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            tipoOferta: tipoOfertaDB
        });
    });
});

module.exports = app;