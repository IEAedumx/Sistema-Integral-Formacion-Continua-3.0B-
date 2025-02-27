const express = require('express');
const Perfiles = require('../models/perfiles.model');

const app = express();

app.get('/perfiles', function(req, res) {
    console.log(req.user);
    Perfiles.find({})
        .exec((err, perfiles) => {
            if(err) {
                return res.status(400).send(err.message)
            };
            res.json(perfiles);
        });
});

app.post('/perfiles', function(req, res) {
    perfil = new Perfiles(req.body);
    perfil.save((err, perfilDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            perfil: perfilDB
        });
    });
});

module.exports = app;

