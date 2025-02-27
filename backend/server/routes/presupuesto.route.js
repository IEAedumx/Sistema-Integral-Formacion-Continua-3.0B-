const express = require('express');
const Presupuestos = require('../models/presupuesto.model');
const Oferta = require ('../models/oferta_formacion.model');

const app = express();

app.get('/presupuestos', function(req, res) {
    Presupuestos.find({})
        .exec((err, presupuestos) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                presupuestos
            });
        });
});

app.post('/presupuestos', function(req, res) {
    presupuesto = new Presupuestos(req.body);
    presupuesto.save((err, presupuestoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            presupuesto: presupuestoDB
        });
    });
});
app.get('/presupuestos/calcular', function(req, res) {
    Presupuestos.find().exec((err, presupuestos) => {
        if (err) return res.status(404).send('No se pudo consultar el presupuesto para el cálculo: ' + err.message);
        Oferta.find().exec((err, oferta) => {
            if(err) return res.status(404).send('No se pudo consultar la oferta para el cálculo: ' + err.message);
            let proyectado = 0;
            oferta.forEach((el) => {
                proyectado += (el.cupo * el.costo_por_registro)
            })
            res.status(200).json({proyectado});
        })  
    })
})

module.exports = app;