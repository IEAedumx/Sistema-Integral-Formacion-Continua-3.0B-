const express = require('express');
const crypto = require('crypto');
const path = require('path');
const InstitucionesFormadoras = require('../models/instituciones_formadoras.model');
const {
    send
} = require('process');

const app = express();

app.get('/institucionesFormadoras', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 400;
    limite = Number(limite);

    InstitucionesFormadoras.find({})
        .sort('nombre')
        .populate('oferta')
        // .populate({
        // 	path: 'oferta',
        // 	populate: {
        // 		path: 'dirigido'
        // 	}
        // })
        .exec((err, instituciones) => {
            if (err) {
                return res.status(400).send('No se pudieeron consultar las instancias');
            }
            InstitucionesFormadoras.countDocuments({}, (err, conteo) => {
                res.json(instituciones);
            });
        });
});

app.post('/institucionesFormadoras', function(req, res) {
    let instancia = JSON.parse(req.body.instancia);
    institucionFormadora = new InstitucionesFormadoras(instancia);
    let imgData = 'sin_imagen_inst.jpg';
    if (req.files) {
        const logo = req.files.logo
        crypto.pseudoRandomBytes(16, function(err, raw) {
            imgData = raw.toString('hex') + path.extname(logo.name);
            console.log(imgData);
            logo.mv(path.join(__dirname, `../../public/logos/${imgData}`),
                err => {
                    if (err) console.log(err)
                    console.log('api registro instancia', 'El logo se cargo con éxito');
                    institucionFormadora.img = imgData;
                    institucionFormadora.save((err, insitucionDB) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }
                        res.status(200).json({
                            ok: true,
                            institucion: insitucionDB
                        });
                    });
                }
            );
        });
    }
});

app.put('/institucionesFormadoras/:id', async function(req, res) {
    let instancia = JSON.parse(req.body.instancia);
    console.log(instancia);
    delete instancia._id;
    if (req.files) {
        const logo = req.files.logo
        instancia.img = instancia.img.split('.')[0] + path.extname(logo.name);
        logo.mv(path.join(__dirname, `../../public/logos/${instancia.img}`),
            err => {
                if (err) console.log(err)
                console.log('api registro instancia', 'El logo se cargo con éxito');
            }
        );
    }
    resUpdate = await InstitucionesFormadoras.updateOne({
                _id: req.params.id
            },
            instancia, {
                runValidators: true
            }
        )
        .then(data => {
            return res.status(200).json({
                ok: true,
                actualizados: data.ok,
                institucion: req.body
            });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                message: err.error.message
            });
        });
});

module.exports = app;