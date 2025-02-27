const express = require('express');
const PersonalNomina = require('../models/personal_nomina.model');

const app = express();
/**
 * Método get /personalNomina
 */
app.get('/personalNomina', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    PersonalNomina.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, personal) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            PersonalNomina.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    personal,
                    conteo: conteo
                });
            });
        });
});
app.get('/personalNomina/:curp', function (req, res) {
    const curp = req.params.curp;

    PersonalNomina.findOne({
            curp: curp
        })
        .exec((err, persona) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                persona,
            });
        });
});
/**
 * Método post /personalNomina
 */
app.post('/personalNomina', function (req, res) {
    let body = req.body;

    personalNomina = new PersonalNomina(body);

    personalNomina.save((err, personalNominaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            personalNomina: personalNominaDB
        });
    });
});

app.post('/personalNomina', function (req, res) {
    personalNomina = new PersonalNomina(req.body);
    personalNomina.save((err, personalDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            personal: personalDB
        });
    });
});

module.exports = app;