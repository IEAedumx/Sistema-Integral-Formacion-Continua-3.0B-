const express = require('express');
const Sippe = require('../models/sippe.model');
const Nivel = require('../models/niveles_educativos.model')

app = express();

app.get('/sippe/:curp', function (req, res) {
    let funciones = [];
    Nivel.aggregate([{
                $match: {}
            },
            {
                $group: {
                    _id: 'funcionesAutorizadas',
                    funciones: {
                        $push: '$funcionSIPPE'
                    }
                }
            }
        ])
        .exec((err, funcionesSIFC) => {
            var funciones = [].concat(...funcionesSIFC[0].funciones);
            Sippe.aggregate([{
                    $match: {
                        CURP: req.params.curp
                    }
                },
                {
                    $group: {
                        _id: "$CURP",
                        nombre: {
                            $first: "$Nombres"
                        },
                        primer_apell: {
                            $first: "$PrimerApellido"
                        },
                        segundo_apell: {
                            $first: "$SegundoApellido"
                        },
                        rfc: {
                            $first: "$RFC"
                        },
                        funciones: {
                            $addToSet: "$CveFuncionSIPPE"
                        }
                    }
                },
                {
                    $project: {
                        nombre: 1,
                        primer_apell: 1,
                        segundo_apell: 1,
                        rfc: 1,
                        funciones: 1
                    }
                }
            ]).exec((err, sippe) => {
                if (err) return res.status(400).json('Error al consultar CURP' + err.message)
                if (sippe.length > 0) {
                    let valido = false;
                    funciones.forEach(el => {
                        console.log(valido);
                        console.log(sippe[0].funciones);
                        if (sippe[0].funciones.includes(el)) return valido = true;
                    });
                    res.status(200).json({
                        sippe,
                        valido
                    });
                } else {
                    res.status(400).send('No se encontró la CURP dentro de Educación Básica Pública, para cualquier duda o aclaración escriba a la dirección mesatecnica.fc@iea.edu.mx o bien presentarse en el IEA con la documentación pertinente (Talón de pago, FUP u órdenes de adscripción vigentes)');
                }
            })
        });
});

module.exports = app;