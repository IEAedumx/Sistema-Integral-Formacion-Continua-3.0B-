const express = require('express');
const mongoose = require('mongoose');
const Registro = require('../models/registro.model');
const OfertaFormacion = require('../models/oferta_formacion.model');
const SIPPE = require('../models/sippe.model');
const path = require('path');

const app = express();

app.get('/valida/:idRegistro', function (req, res) {
    console.log(req.params);
    Registro.findOne({
            _id: req.params.idRegistro
        })
        .populate('oferta_formacion')
        .exec((err, registros) => {
            Registro.populate(registros, [{
                path: "usuario"
            }, {
                path: "oferta_formacion.institucion_formadora",
            }, {
                path: "oferta_formacion.grupos.facilitador"
            }, {
                path: "oferta_formacion.modalidad"
            }, {
                path: "oferta_formacion.tipo_oferta"
            }
            ], (err, registro) => {
                if (err) return res.status(400).send(err.message)
                res.render('index', {registro: registro});
            })
    })
});

module.exports = app;