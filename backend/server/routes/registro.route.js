const express = require('express');
const mongoose = require('mongoose');
const Registro = require('../models/registro.model');
const OfertaFormacion = require('../models/oferta_formacion.model');
const Usuario = require('../models/usuario.model');
const ConsultaRegFC = require('../models/consulta_reg_fc.model');
const Sippe = require('../models/sippe.model');

const app = express();

app.get('/registros', function (req, res) {
    Registro.find({})
        .populate('oferta_formacion')
        .populate('usuario')
        .exec((err, registros) => {
            if (err) {
                return res.status(400).json(err.message);
            };
            res.json(registros);
        });
});
app.get('/registros/eficiencia/:criterio/:dato', function (req, res) {
    let criterio = {};
    if (req.params.criterio !== 'todo') {
        criterio[req.params.criterio] = mongoose.Types.ObjectId(req.params.dato)
    }
    Registro.aggregate([{
            $match: criterio
        },
        {
            $group: {
                "_id": "$resultado",
                "cuenta": {
                    $sum: 1
                }
            }
        },
    ], function (err, eficiencia) {
        if (err) return res.status(200).send("Error " + err.message);
        return res.status(200).json(eficiencia);
    })

});
app.get('/registros/vista/:criterio', function (req, res) {
    regex = RegExp(req.params.criterio, 'i');
    ConsultaRegFC.find({
        $or: [{
                nombre_completo: regex
            },
            {
                CURP: regex
            },
            {
                email: regex
            },
            {
                _id: regex
            },
            {
                idUsuario: regex
            },
            {
                idOferta: regex
            },
            {
                idGrupo: regex
            },
            {
                periodoFC: regex
            },
            {
                sede: regex
            },
            {
                grupo: regex
            }
        ]
    }, function (err, registros) {
        return res.json(registros)
    });
})

app.get('/registros/oferta/:idOferta', function (req, res) {
    let query = {};
    if (req.params.idOferta === 'completa') {
        query = {
            $ne: null
        };
    } else {
        query = mongoose.Types.ObjectId(req.params.idOferta);

    }
    Registro.aggregate([{
            $match: {
                oferta_formacion: query
            }
        },
        {
            $lookup: {
                from: "oferta_formacion",
                localField: "oferta_formacion",
                foreignField: "_id",
                as: "oferta_formacion_data"
            }
        },
        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario_data"
            }
        },
        {
            $unwind: "$oferta_formacion_data"
        },
        {
            $unwind: "$usuario_data"
        },
        {
            $lookup: {
                from: "instituciones_formadoras",
                localField: "oferta_formacion_data.institucion_formadora",
                foreignField: "_id",
                as: "institucion_formadora_data"
            }
        },
        {
            $lookup: {
                from: "tipos_oferta",
                localField: "oferta_formacion_data.tipo_oferta",
                foreignField: "_id",
                as: "tipo_oferta_data"
            }
        },
        {
            $lookup: {
                from: "modalidades",
                localField: "oferta_formacion_data.modalidad",
                foreignField: "_id",
                as: "modalidad_oferta_data"
            }
        },
        {
            $unwind: "$institucion_formadora_data"
        },
        {
            $unwind: "$tipo_oferta_data"
        },
        {
            $unwind: "$modalidad_oferta_data"
        },
        {
            $addFields: {
                grupo_data: {
                    $filter: {
                        input: "$oferta_formacion_data.grupos",
                        as: "grupo_data",
                        cond: {
                            $eq: ["$$grupo_data._id", "$grupo"]
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "sippe",
                localField: "usuario_data.usuario",
                foreignField: "CURP",
                as: "sippe"
            }
        },
        {
            $project: {
                _id: 0,
                "idRegistro": "$_id",
                "curp": "$usuario_data.usuario",
                "nombre": "$usuario_data.nombre",
                "primer_apellido": "$usuario_data.primer_apell",
                "segundo_apellido": "$usuario_data.segundo_apell",
                "nombre_completo": {
                    $concat: ["$usuario_data.nombre", " ", "$usuario_data.primer_apell", " ", "$usuario_data.segundo_apell"]
                },
                "genero": {
                    $substr: ["$usuario_data.usuario", 10, 1]
                },
                "telefono1": "$usuario_data.telefono_fijo",
                "telefono2": "$usuario_data.telefono_movil",
                "email": "$usuario_data.email",
                "sippe": {
                    $filter: {
                        input: "$sippe",
                        as: "elem",
                        cond: {
                            $in: ["$$elem.CveFuncionSIPPE", [63, 64, 60, 35, 28, 67, 70, 39, 37, 20, 250, 35, 67, 30, 27, 16, 17, 25, 240, 241, 84, 85, 49, 90, -1, -2, 48, 71, 47, 91, 3001]]
                        }
                    }
                },
                "idOferta": "$oferta_formacion_data._id",
                "oferta": {
                    $arrayElemAt: ["$oferta_formacion_data.nombre_curso", 0]
                },
                "periodoFC": "$oferta_formacion_data.periodoFC",
                "institucion_formadora": "$institucion_formadora_data.nombre",
                "tipo_oferta": "$tipo_oferta_data.nombre",
                "modalidad_oferta": "$modalidad_oferta_data.nombre",
                "horas": "$tipo_oferta_data.horas",
                "linea_formacion": "$oferta_formacion_data.linea_formacion",
                "fecha_inicio": "$oferta_formacion_data.fecha_ini",
                "fecha_fin": "$oferta_formacion_data.fecha_fin",
                "idGrupo": {
                    $arrayElemAt: ["$grupo_data._id", 0]
                },
                "modalidad": {
                    $arrayElemAt: ["$grupo_data.grupo", 0]
                },
                "sede": {
                    $arrayElemAt: ["$grupo_data.sede", 0]
                },
                "resultado": "$resultado"
            }
        }, {
            $project: {
                idRegistro: 1,
                curp: 1,
                nombre: 1,
                primer_apellido: 1,
                segundo_apellido: 1,
                nombre_completo: 1,
                genero: 1,
                telefono1: 1,
                telefono2: 1,
                email: 1,
                idOferta: 1,
                oferta: 1,
                periodoFC: 1,
                institucion_formadora: 1,
                tipo_oferta: 1,
                modalidad_oferta: 1,
                horas: 1,
                linea_formacion: 1,
                fecha_inicio: 1,
                fecha_fin: 1,
                idGrupo: 1,
                modalidad: 1,
                sede: 1,
                "rfc": {
                    $arrayElemAt: ["$sippe.RFC", 0]
                },
                "categoria": {
                    $arrayElemAt: ["$sippe.CategoriadePago", 0]
                },
                "funcion": {
                    $arrayElemAt: ["$sippe.DescripcionFuncionSIPPE", 0]
                },
                "cct": {
                    $arrayElemAt: ["$sippe.ClaveCTAdcripcion", 0]
                },
                resultado: 1
            }
        }
    ]).exec((err, registros) => {
        if (err) {
            return res.status(400).json(err.message);
        };

        res.json(registros);
    });
});
//****************** Emite lista de participantes por grupo  ************* */
app.get('/registros/grupoLista/:idGrupo', function (req, res) {
    let query = {};
    if (req.params.idGrupo === 'completa') {
        query = {
            $ne: null
        };
    } else {
        query = mongoose.Types.ObjectId(req.params.idGrupo);
    }
    Registro.aggregate([{
            $match: {
                grupo: query
            }
        },
        {
            $lookup: {
                from: "oferta_formacion",
                localField: "oferta_formacion",
                foreignField: "_id",
                as: "oferta_formacion_data"
            }
        },
        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario_data"
            }
        },
        {
            $unwind: "$oferta_formacion_data"
        },
        {
            $unwind: "$usuario_data"
        },
        {
            $lookup: {
                from: "instituciones_formadoras",
                localField: "oferta_formacion_data.institucion_formadora",
                foreignField: "_id",
                as: "institucion_formadora_data"
            }
        },
        {
            $lookup: {
                from: "tipos_oferta",
                localField: "oferta_formacion_data.tipo_oferta",
                foreignField: "_id",
                as: "tipo_oferta_data"
            }
        },
        {
            $lookup: {
                from: "modalidades",
                localField: "oferta_formacion_data.modalidad",
                foreignField: "_id",
                as: "modalidad_oferta_data"
            }
        },
        {
            $unwind: "$institucion_formadora_data"
        },
        {
            $unwind: "$tipo_oferta_data"
        },
        {
            $unwind: "$modalidad_oferta_data"
        },
        {
            $addFields: {
                grupo_data: {
                    $filter: {
                        input: "$oferta_formacion_data.grupos",
                        as: "grupo_data",
                        cond: {
                            $eq: ["$$grupo_data._id", "$grupo"]
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "sippe",
                localField: "usuario_data.usuario",
                foreignField: "CURP",
                as: "sippe"
            }
        },
        {
            $project: {
                _id: 0,
                "idRegistro": "$_id",
                "curp": "$usuario_data.usuario",
                "nombre": "$usuario_data.nombre",
                "primer_apellido": "$usuario_data.primer_apell",
                "segundo_apellido": "$usuario_data.segundo_apell",
                "nombre_completo": {
                    $concat: ["$usuario_data.nombre", " ", "$usuario_data.primer_apell", " ", "$usuario_data.segundo_apell"]
                },
                "genero": {
                    $substr: ["$usuario_data.usuario", 10, 1]
                },
                "telefono1": "$usuario_data.telefono_fijo",
                "telefono2": "$usuario_data.telefono_movil",
                "email": "$usuario_data.email",
                /*"sippe": {
                    $filter: {
                        input: "$sippe",
                        as: "elem",
                        cond: {
                            $in: ["$$elem.CveFuncionSIPPE", [63, 64, 60, 35, 28, 67, 70, 39, 37, 20, 250, 35, 67, 30, 27, 16, 17, 25, 240, 241, 84, 85, 49, 90, -1, -2, 48, 71, 47, 91, 3001]]
                        }
                    }
                },*/
                "idOferta": "$oferta_formacion_data._id",
                "img": "$institucion_formadora_data.img",
                "oferta": {
                    $arrayElemAt: ["$oferta_formacion_data.nombre_curso", 0]
                },
                "periodoFC": "$oferta_formacion_data.periodoFC",
                "institucion_formadora": "$institucion_formadora_data.nombre",
                "tipo_oferta": "$tipo_oferta_data.nombre",
                "modalidad_oferta": "$modalidad_oferta_data.nombre",
                "horas": "$tipo_oferta_data.horas",
                "linea_formacion": "$oferta_formacion_data.linea_formacion",
                "fecha_inicio": {
                    $arrayElemAt: ["$grupo_data.fecha_ini", 0]
                },
                "fecha_fin": {
                    $arrayElemAt: ["$grupo_data.fecha_fin", 0]
                },
                "idGrupo": {
                    $arrayElemAt: ["$grupo_data._id", 0]
                },
                "grupo": {
                    $arrayElemAt: ["$grupo_data.grupo", 0]
                },
                "modalidad": {
                    $arrayElemAt: ["$grupo_data.grupo", 0]
                },
                "sede": {
                    $arrayElemAt: ["$grupo_data.sede", 0]
                },
                "resultado": "$resultado",
                sippe1: {
                    $arrayElemAt: ['$sippe', 0]
                },
            }
        }, {
            $project: {
                idRegistro: 1,
                curp: 1,
                nombre: 1,
                primer_apellido: 1,
                segundo_apellido: 1,
                nombre_completo: 1,
                genero: 1,
                telefono1: 1,
                telefono2: 1,
                email: 1,
                idOferta: 1,
                oferta: {
                    $toUpper: '$oferta'
                },
                periodoFC: 1,
                institucion_formadora: 1,
                img: 1,
                tipo_oferta: {
                    $toUpper: '$tipo_oferta'
                },
                modalidad_oferta: {
                    $toUpper: '$modalidad_oferta'
                },
                horas: 1,
                linea_formacion: 1,
                fecha_inicio: {
                    $dateToString: {
                        date: '$fecha_inicio',
                        format: '%d/%m/%Y',
                        onNull: 'SD'
                    }
                },
                fecha_fin: {
                    $dateToString: {
                        date: '$fecha_fin',
                        format: '%d/%m/%Y',
                        onNull: 'SD'
                    }
                },
                idGrupo: 1,
                grupo: 1,
                modalidad: 1,
                sede: {
                    $toUpper: '$sede'
                },
                "rfc": "$sippe1.RFC",
                "categoria": "$sippe1.CategoriadePago",
                "funcion": {
                    $toUpper: "$sippe1.DescripcionFuncionSIPPE"
                },
                "cct": "$sippe1.ClaveCTAdcripcion",
                resultado: 1,
            }
        }, {
            $sort: {
                nombre_completo: 1,
            }
        }
    ]).exec((err, registros) => {
        if (err) {
            return res.status(400).json(err.message);
        };

        res.json(registros);
    });
});
// Consulta los registros a cursos por usuario
app.get('/registros/usuario/:idUsuario', function (req, res) {
    Registro.find({
            usuario: req.params.idUsuario
        })
        .populate('oferta_formacion')
        .populate()
        .exec((err, registros) => {
            Registro.populate(registros, {
                path: "oferta_formacion.institucion_formadora"
            }, (err, registros) => {
                if (err) return res.status(400).send(err.message)
                res.status(200).json(registros);
            })
        })
});
app.get('/registros/estadistica', function (req, res) {
    Registro.aggregate([{
        $group: {
            _id: '$oferta_formacion',
            registros: {
                $sum: 1
            }
        }
    }, {
        $lookup: {
            from: 'oferta_formacion',
            localField: '_id',
            foreignField: '_id',
            as: 'oferta_formacion'
        }
    }, {
        $unwind: '$oferta_formacion'
    }, {
        $lookup: {
            from: 'instituciones_formadoras',
            localField: 'oferta_formacion.institucion_formadora',
            foreignField: '_id',
            as: 'instancia_formadora'
        }
    }, {
        $unwind: '$instancia_formadora'
    }, {
        $lookup: {
            from: 'presupuesto',
            localField: 'oferta_formacion.presupuesto',
            foreignField: '_id',
            as: 'presupuesto'
        }
    }, {
        $unwind: '$presupuesto'
    }, {
        $sort: {
            'oferta_formacion.linea_formacion': 1
        }
    }]).exec((err, rep) => {
        if (err) return res.status(400).send('No se pudo realizar el reporte de registro: ' + err.message);
        let totales = {
            proyectado: {
                total: 0
            },
            registrado: {
                total: 0
            },
            registros: 0
        }
        rep.forEach((element, idx) => {
            if (!totales.proyectado[rep[idx].presupuesto.sostenimiento] && !totales.registrado[rep[idx].presupuesto.sostenimiento]) {
                totales.proyectado[rep[idx].presupuesto.sostenimiento] = 0;
                totales.registrado[rep[idx].presupuesto.sostenimiento] = 0;
            }
            rep[idx].proyectado = element.oferta_formacion.cupo * element.oferta_formacion.costo_por_registro;
            rep[idx].registrado = element.registros * element.oferta_formacion.costo_por_registro;
            rep[idx].porcentaje = (element.registros / element.oferta_formacion.cupo);
            totales.proyectado[rep[idx].presupuesto.sostenimiento] += rep[idx].proyectado;
            totales.registrado[rep[idx].presupuesto.sostenimiento] += rep[idx].registrado;
            totales.proyectado.total += rep[idx].proyectado;
            totales.registrado.total += rep[idx].registrado;
            totales.registros += element.registros;
        });
        res.status(200).json({
            rep,
            totales
        });
    });
});
// Consulta por id de registro
app.get('/registros/:idRegistro', function (req, res) {
    Registro.findOne({
            _id: req.params.idRegistro
        })
        .populate('oferta_formacion')
        .exec((err, registros) => {
            Registro.populate(registros, [{
                path: "usuario"
            }, {
                path: "oferta_formacion.institucion_formadora"
            }, {
                path: "oferta_formacion.grupos.facilitador"
            }], (err, registros) => {
                if (err) return res.status(400).send(err.message)
                res.status(200).json(registros);
            })
        })
});

// Registro a un grupo/sede/turno/modalidad
app.put('/registros/grupo/', function (req, res) {
    const idGrupo = req.body.idGrupo;
    const idRegistro = req.body.idRegistro
    console.log(idGrupo);
    Registro.aggregate([{
            $match: {
                grupo: mongoose.Types.ObjectId(idGrupo)
            }
        },
        {
            $group: {
                _id: "grupo",
                registros: {
                    $sum: 1
                }
            }
        }
    ]).exec((err, registros) => {
        if (err) return res.status(400).send('ERROR: Por el momento no podemos calcular el cupo');
        OfertaFormacion.find({
                "grupos._id": mongoose.Types.ObjectId(idGrupo)
            }, {
                "grupos.$.cupo": 1
            })
            .exec((err, grupo) => {
                console.log('El cupo del grupo', grupo[0].grupos[0].cupo[0], 'Los registros', registros)
                if (registros.length && grupo[0].grupos[0].cupo[0] <= registros[0].registros) {
                    OfertaFormacion.update({
                        "grupos._id": mongoose.Types.ObjectId(idGrupo)
                    }, {
                        $set: {
                            "grupos.$.estatus": 'SIN CUPO'
                        }
                    }).exec();
                    res.status(400).send('Lo sentimos, el grupo se ha quedado sin cupo.')
                } else {
                    Registro.updateOne({
                            _id: idRegistro
                        }, {
                            $set: {
                                grupo: idGrupo
                            }
                        })
                        .exec((err, data) => {
                            if (err) return res.status(400).send('ERROR: No se pudo registrar al grupo');
                            res.status(200).json("Registro exitosó");
                        })

                }
            });
    })
});
// Consulta regitros a grupo
app.get('/registros/grupo/:idOferta/:idGrupo', function (req, res) {
    const idGrupo = req.params.idGrupo;
    const idOferta = req.params.idOferta;
    let query = {};
    if (idGrupo !== 'null') {
        query = {
            oferta_formacion: mongoose.Types.ObjectId(idOferta),
            grupo: mongoose.Types.ObjectId(idGrupo)
        }
    } else {
        query = {
            oferta_formacion: mongoose.Types.ObjectId(idOferta),
            grupo: {
                $eq: null
            }
        }
    }
    Registro.aggregate([{
            $match: query,
        },
        {
            $group: {
                _id: idGrupo,
                registros: {
                    $sum: 1
                }
            }
        }
    ]).exec((err, registrosEst) => {
        if (err) return res.status(400).send('ERROR: Por el momento no podemos calcular el cupo');
        Registro.find(query)
            .populate('usuario')
            .exec((err, registros) => {
                if (err) return res.status(400).send('ERROR: No se pudieron consultar los registros:' + err.message);
                return res.status(200).json({
                    registros,
                    registrosEst
                });
            })
    })
});

// Registra el grupo al usuario y oferta
app.put('/registros/transfer/grupo/', function (req, res) {
    let idGrupo = req.body.idGrupo;
    if (idGrupo === 'null') idGrupo = null;
    const idRegistro = req.body.idRegistro;
    Registro.updateOne({
            _id: idRegistro
        }, {
            $set: {
                grupo: idGrupo
            }
        })
        .exec((err, data) => {

            if (err) return res.status(400).send('ERROR: No se pudo registrar al grupo');
            res.status(200).json(true);

        })

});
// Registra asistencia
app.put('/registros/asistencia/:idRegistro', function (req, res) {
    const idRegistro = req.params.idRegistro;
    const asistencia = req.body.asistencia;
    console.log(req.body);
    Registro.updateOne({
            _id: idRegistro
        }, {
            $set: {
                asistencia: req.body
            }
        })
        .exec((err, data) => {
            if (err) return res.status(400).send('ERROR: No se pudo registrar la asistencia');
            res.status(200).json(true);
        })
});
app.put('/registros/resultado/:idRegistro', function (req, res) {
    const idRegistro = req.params.idRegistro;
    const resultado = req.body.resultado;
    console.log(req.body);
    Registro.updateOne({
            _id: idRegistro
        }, {
            $set: {
                resultado: resultado
            }
        })
        .exec((err, data) => {
            if (err) return res.status(200).send('ERROR: No se pudo registrar el resultado');
            res.status(200).send('Ok, registro correcto');
        })
});
// Alta de registro en curso con control de cupo y categoria
app.post('/registros', function (req, res) {
    OfertaFormacion.findOne({ // ********************* Inicia validación de cupo
            _id: req.body.oferta_formacion
        })
        .populate("dirigido")
        .exec((err, oferta) => {
            //************************  Validación de categoría **********************************/
            if (err) return res.status(400).send('No existe la oferta');
            const curp = req.body.curp;
            let categorias = "";
            var dirigido = "Dirigido a: ";
            var libre = false;
            for (var i = 0; i <= (oferta.dirigido.length - 1); i++) {
                dirigido += (oferta.dirigido[i].nombre + "| ");
                if (oferta.dirigido[i].categorias.indexOf("*") !== -1) {
                    libre = true;
                }
                if (i == (oferta.dirigido.length - 1)) {
                    categorias += oferta.dirigido[i].categorias;
                } else {
                    categorias += (oferta.dirigido[i].categorias + "|");
                }
            };
            categorias = RegExp(categorias, 'i');
            Sippe.find({
                CURP: curp,
                CategoriadePago: categorias
            }, function (err, sippe) {
                if (sippe.length > 0 || libre) {
                    Registro.aggregate([{
                            $match: {
                                oferta_formacion: mongoose.Types.ObjectId(req.body.oferta_formacion)
                            }
                        },
                        {
                            $group: {
                                _id: '$oferta_formacion',
                                total: {
                                    $sum: 1
                                }
                            }
                        }
                    ]).exec((err, cuentaRegs) => {
                        var grupo = oferta.grupos.id(req.body.grupo);
                        Registro.count({
                            oferta_formacion: req.body.oferta_formacion,
                            grupo: req.body.grupo
                        }, function (err, regGrupo) {
                            if (err) return res.status(200).send('Ocurrio un error al contar registros en grupo');
                            if (regGrupo >= grupo.cupo[0]) {
                                grupo.estatus = "SIN CUPO";
                                if (cuentaRegs[0].total >= oferta.cupo) {
                                    oferta.estatus = 'SIN CUPO';
                                }
                                oferta.save();
                                return res.status(200).send('Lo sentimos. El grupo ha alcanzado el cupo límite')
                            } else {
                                if ((oferta.cupo <= 0) || (cuentaRegs[0] && (cuentaRegs[0].total >= oferta.cupo))) {
                                    oferta.estatus = 'SIN CUPO';
                                    oferta.save();
                                    return res.status(200).send('Lo sentimos. Esta oferta ha alcanzado el cupo límite.');
                                } else {
                                    Registro.find({ //  ******************************************* Inicia validación de duplicidad
                                            oferta_formacion: req.body.oferta_formacion,
                                            usuario: req.body.usuario
                                        })
                                        .exec((err, regDup) => {
                                            if (err) return res.status(200).send(err.message);
                                            if (regDup[0]) {
                                                return res.status(200).send('Ya te encuentras registrado(a) en esta oferta');
                                            } else {
                                                Registro.find({
                                                        usuario: req.body.usuario,
                                                    })
                                                    .populate('oferta_formacion')
                                                    .exec((err, countRegLinea) => {
                                                        var countPeriodo = 0;
                                                        //*************** VALIDA NUMERO DE REGISTROS EN MISMA LINEA */
                                                        /*countRegLinea.forEach(el => {
                                                            if (el.oferta_formacion.periodoFC === '2020-2021 ORD') {
                                                                countPeriodo++;
                                                            }
                                                        })*/
                                                        console.log(countPeriodo);
                                                        if (countPeriodo >= 10) return res.status(200).send('Registro rechazado, sólo puedes tomar hasta 1 curso del mismo periodo');
                                                        var registro = new Registro(req.body);
                                                        registro.save((err, registroDB) => { // ************************************** Fin de validaciones, si pasa se guarda el registro
                                                            if (err) {
                                                                return res.status(200).send('No se pudo guardar el registro');
                                                            };
                                                            Registro.populate(registroDB, {
                                                                    path: 'oferta_formacion',
                                                                },
                                                                (err, registroDB) => {
                                                                    if (err) return res.status(200).send(err.message);
                                                                    res.status(200).send('Se ha registrado con éxito!!');

                                                                });
                                                        });
                                                    })

                                            }

                                        })
                                }
                            }
                        });

                    })
                } else {
                    return res.status(200).send("Error: Oferta no dirigida a su función o no se encuentra vigente/activo en el servicio; o existe un error en la CURP. Para cualquier aclaración comunicarse con el área correspondiente. " + dirigido);
                }
            })

        })
});
// Eliminación de un registro a curso de un usuario
app.delete('/registros/delete/:id', function (req, res) {
    console.log(req.params.id);
    Registro.deleteOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        })
        .exec((err, result) => {
            if (err) return res.status(200).send('Error - No pudo eliminar el registro: ' + err.message);
            if (result.ok) {
                if (result.deletedCount) {
                    return res.status(200).send('OK - Registro eliminado con éxito!!');
                } else {
                    return res.status(200).send('Error - No se eliminó el registro ID no encontrado');
                }
            }
        })
});

app.get('/registros/cuenta/:criterio/:id', function (req, res) {
    console.log(req.params.criterio);
    console.log(req.params.id);
    switch (req.params.criterio) {
        case 'grupo':
            Registro.countDocuments({
                grupo: req.params.id
            }).exec((err, cuenta) => {
                if (err) console.log(err);
                return res.status(200).send(cuenta.toString());
            });
            break;
        case 'instancia':
            break;
        case 'usuario':
            break;
        default:
            return res.status(200).send('0');
    }
});
app.post('/registros/admin/registro', function (req, res) {
    console.log(req.body);
    req.body.usuario = req.body.curp
    Usuario.findOne({
        usuario: req.body.curp
    }, function (err, usuario) {
        if (err) res.status(200).send("Error al validar existencia de usuario");
        if (usuario == null) {
            var usuario = new Usuario(req.body);
            console.log(usuario);
            usuario.save(function (err, usr) {
                var registro = new Registro(req.body)
                registro.usuario = usr._id;
                registro.save(function (err, status) {
                    if (err) return res.status(200).send("Error en alta y registro");
                    return res.status(200).send("OK Alta como usuario y registro a oferta");
                });
            })
        } else {
            var registro = new Registro(req.body)
            registro.usuario = usuario._id;
            Registro.findOne({
                usuario: registro.usuario,
                oferta_formacion: req.body.oferta_formacion
            }, function (err, reg) {
                if (err) return res.status(200).send("Error al validar regsitro");
                if (reg !== null) return res.status(200).send("Error usuario ya registrado a la oferta");
                registro.save(function (err, status) {
                    if (err) return res.status(200).send("Error en regsitro");
                    return res.status(200).send("OK Registro a oferta exitoso");
                });
            })

        }
    });
});

module.exports = app;