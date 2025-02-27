const express = require('express');
const OfertaFormacion = require('../models/oferta_formacion.model');
const mongoose = require('mongoose');
const registroModel = require('../models/registro.model');

const app = express();

app.get('/ofertasFormacion', function (req, res) {
    OfertaFormacion.find({
            estatus: {
                $nin: ['ELIMINADA']
            }
        })
        .populate('institucion_formadora')
        .populate('dirigido')
        .populate('tipo_oferta')
        .populate('modalidad')
        .populate('presupuesto')
        .populate('periodicidad')
        .exec((err, ofertasFormacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                ofertasFormacion
            });
        });
});

app.get('/ofertasFormacionDisponible', function (req, res) {
    OfertaFormacion.find({
            estatus: {
                $in: ['INSCRIPCION ABIERTA']
            }
        })
        .populate('institucion_formadora')
        .populate('dirigido')
        .populate('tipo_oferta')
        .populate('modalidad')
        .populate('presupuesto')
        .populate('periodicidad')
        .exec((err, ofertasFormacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                ofertasFormacion
            });
        });
});

app.get('/ofertasFormacion/reportes', function (req, res) {
    OfertaFormacion.find({})
        .populate('institucion_formadora')
        .populate('dirigido')
        .populate('tipo_oferta')
        .populate('modalidad')
        .populate('presupuesto')
        .populate('periodicidad')
        .exec((err, ofertasFormacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                ofertasFormacion
            });
        });
});

app.get('/ofertasFormacion/:id', function (req, res) {
    OfertaFormacion.findById(req.params.id)
        .populate('institucion_formadora')
        .populate('dirigido')
        .populate('tipo_oferta')
        .populate('modalidad')
        .populate('presupuesto')
        .populate('periodicidad')
        .exec((err, ofertasFormacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                ofertasFormacion
            });
        });
});
app.post('/ofertasFormacion', function (req, res) {
    console.log(req.body);
    ofertaFormacion = new OfertaFormacion(req.body);
    ofertaFormacion.save((err, ofertaFormacionDB) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err: err.message
            });
        };
        res.status(200).json(
            ofertaFormacionDB
        );
        // ofertaFormacionDB.populate('dirigido', (err, ofp) => {
        //     res.status(200).json({
        //         ok: true,
        //         ofertaFormacion: ofp
        //     })
        // });
    });
});
app.put('/ofertasFormacion/:id', function (req, res) {
    console.log(req.body)
    OfertaFormacion.updateOne({
        _id: req.params.id
    }, {
        $set: req.body
    }, function (err, op) {
        if (err) return res.status(400).send('No se pudo actualiar la Oferta seleccionada: ' + err.message);
        OfertaFormacion.findById({
            _id: req.params.id
        }, function (err, oferta) {
            return res.status(200).json(oferta);
        })
    });

})

app.post('/ofertasFormacion/:idOferta/grupo', function (req, res) {
    console.log(req.body);
    OfertaFormacion.findById(req.params.idOferta).exec(function (err, oferta) {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }
        oferta.grupos.push(req.body);
        oferta.save(function (err, oferta) {
            console.log(err);
            if (err) {
                console.log(err);
                return res.status(400).send(err.message);
            }
            return res.status(200).json({
                oferta,
                grupo: []
            });
        });
    });
});

app.put('/ofertasFormacion/:idOferta/grupo/:idGrupo', function (req, res) {
    OfertaFormacion.findOne({
        _id: req.params.idOferta
    }).exec(function (err, oferta) {
        if (err) {
            return res.status(400).send('No se localizó el grupo en la BD');
        }
        grupo = oferta.grupos.id(req.params.idGrupo);
        for (let key in req.body) {
            grupo[key] = req.body[key];
        };
        oferta.save((err, oferta) => {
            if (err) return res.status(400).send('No se pudo actualizar el grupo: ' + err.message);
            return res.status(200).json({
                oferta,
                grupo: oferta.grupos.id(req.params.idGrupo)
            });
        });
    });
});

app.post('/ofertasFormacion/:idOferta/grupo/:idGrupo/sesiones', function (req, res) {
    OfertaFormacion.findOne({
            _id: req.params.idOferta
        })
        .exec(function (err, oferta) {
            if (err) return res.status(400).send('No se encontró la oferta: ' + err.message);
            grupo = oferta.grupos.id(req.params.idGrupo);
            grupo.sesiones.push(req.body);
            oferta.save((err, oferta) => {
                if (err) return res.status(400).send('No se pudo registrar la sesion: ' + err.message);
                return res.status(200).json({
                    oferta,
                    sesion: []
                });
            });
        })
})

app.put('/ofertasFormacion/:idOferta/grupo/:idGrupo/sesiones/:idSesion', function (req, res) {
    OfertaFormacion.findOne({
        _id: req.params.idOferta
    }).exec(function (err, oferta) {
        if (err) {
            return res.status(400).send('No se la oferta en la BD');
        }
        grupo = oferta.grupos.id(req.params.idGrupo);
        sesion = grupo.sesiones.id(req.params.idSesion);
        for (let key in req.body) {
            sesion[key] = req.body[key];
        };
        oferta.save((err, oferta) => {
            if (err) return res.status(400).send('No se pudo actualizar la sesion: ' + err.message);
            return res.status(200).json({
                oferta,
                grupo: oferta.grupos.id(req.params.idGrupo),
                sesion: oferta.grupos.id(req.params.idGrupo).sesiones.id(req.params.idSesion)
            });
        });
    });
})

app.get('/ofertasFormacion/facilitador/grupo/:idFacilitador', function (req, res) {
    OfertaFormacion.aggregate([{
            $match: {
                'grupos.facilitador': mongoose.Types.ObjectId(req.params.idFacilitador)
            }
        }, {
            $project: {
                grupos: 1
            }
        }, {
            $unwind: '$grupos'
        }, {
            $match: {
                'grupos.facilitador': mongoose.Types.ObjectId(req.params.idFacilitador)
            }
        }, {
            $lookup: {
                from: 'oferta_formacion',
                localField: '_id',
                foreignField: '_id',
                as: 'ofertaFormacion'
            }
        }, {
            $project: {
                'ofertaFormacion.dirigido': 0,
                'ofertaFormacion.costo_por_registro': 0,
                'ofertaFormacion.grupos': 0,
                'ofertaFormacion.presupuesto': 0
            }
        }, {
            $lookup: {
                from: 'instituciones_formadoras',
                localField: 'ofertaFormacion.institucion_formadora',
                foreignField: '_id',
                as: 'institucion_formadora'
            }
        }, {
            $lookup: {
                from: 'tipos_oferta',
                localField: 'ofertaFormacion.tipo_oferta',
                foreignField: '_id',
                as: 'tipo_oferta'
            }
        }, {
            $lookup: {
                from: 'modalidades',
                localField: 'ofertaFormacion.modalidad',
                foreignField: '_id',
                as: 'modalidad'
            }
        }])
        .exec(function (err, grupos) {
            if (err) return res.status(400).send('No se pudo consultar la oferta por facilitador: ' + err.message);
            res.status(200).json(grupos);
        })
});

app.get('/getgrupos', function (req, res) {
    console.log('consulta grupos');
    OfertaFormacion.aggregate([{
            $project: {
                grupos: 1,
                idOferta: 1,
                nombre_curso: 1
            }
        }, {
            $unwind: {
                path: "$nombre_curso"
            }
        }, {
            $unwind: {
                path: "$grupos",
                includeArrayIndex: 'grupo',
                preserveNullAndEmptyArrays: false
            }
        }, {
            $addFields: {

                "nombre": "$grupos.grupo",
                "cupo": "$grupos.cupo",
                "estatus": "$grupos.estatus",
                "fecha_ini": "$grupos.fecha_ini",
                "fecha_fin": "$grupos.fecha_fin",
                "periodoFC": "$grupos.periodoFC",
                "idGrupo": "$grupos._id",

            }
        }, {
            $lookup: {
                from: "registros",
                localField: 'idGrupo',
                foreignField: 'grupo',
                as: 'registrados'
            }
        }, {
            $project: {
                nombre_curso: 1,
                idOferta: 1,
                idGrupo: 1,
                nombre: 1,
                estatus: 1,
                fecha_ini: 1,
                fecha_fin: 1,
                periodoFC: 1,
                cupo: 1,
                contRegistrados: {$size: "$registrados"}
            }
        }, ])
        .exec(function (err, grupos) {
            return res.status(200).json(grupos);
        })
});

module.exports = app;