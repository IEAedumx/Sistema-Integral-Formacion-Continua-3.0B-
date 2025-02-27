const express = require('express');
const Preparacion = require('../models/preparacion.model');

const app = express();

app.get('/preparacion', function (req, res) {
    Preparacion.find().exec(
        (err, preparacion) => {
            if (err) {
                return res.status(400).send(err.error);
            }
            return res.status(200).json(preparacion);

        }
    )
});

app.post('/preparacion', function (req, res) {
    preparacion = new Preparacion(req.body);
    preparacion.save(
        (err, prep) => {
            if (err) {
                return res.status(400).send(err.error)
            }
            return res.status(200).json(prep);
        }
    )
})

module.exports = app;