const express = require('express');
const CCTsAgs = require('../models/ccts_aguascalientes.model');
const CCTsDisp = require('../models/ccts_disponibles.model');
const ListaOrdenada = require('../models/listaOrdenada.model');
const BitacoraCambios = require('../models/bitacora_cambios.model');
const async = require('async');
// const app = require('./valida.route');

app = express();

app.get('/cctsAgs/:cct', function (req, res) {
	CCTsAgs.find({
			cct: new RegExp(req.params.cct)
		})
		.exec((err, ccts) => {
			if (err) return res.json(err);
			res.status(200).json(ccts);
		})
});

app.get('/cctsDisp/:cct', function (req, res) {
	CCTsDisp.aggregate([{
				$match: {
					cct: new RegExp(req.params.cct)
				}
			},
			{
				$lookup: {
					from: 'ccts_aguascalientes',
					localField: 'cct',
					foreignField: 'cct',
					as: 'cct_info'
				}
			},
			{
				$project: {
					cct: 1,
					puesto: 1,
					asignatura: 1,
					horas: 1,
					cct_info: {
						"$arrayElemAt": ["$cct_info", 0]
					}
				}
			},
			{
				$project: {
					cct: 1,
					puesto: 1,
					asignatura: 1,
					horas: 1,
					longitud: '$cct_info.longitud',
					latitud: '$cct_info.latitud',
					nom_ct: '$cct_info.nom_ct',
					domicilio: {
						$concat: ['$cct_info.domicilio', ', Col: ', '$cct_info.nom_colonia', ', Mun: ', '$cct_info.nom_municipio']
					},
				}
			}
		])
		.exec((err, ccts) => {
			if (err) return res.json(err);
			res.status(200).json(ccts);
		})
});

app.get('/cctsDispCriterio/:nivel/:puesto/:asignatura/:estatusCambio', function (req, res) {
	CCTsDisp.aggregate([{
				$match: {
					nivel: new RegExp(req.params.nivel),
					puesto: new RegExp(req.params.puesto),
					asignatura: new RegExp(req.params.asignatura),
					estatusCambio: new RegExp(req.params.estatusCambio)
				}
			},
			{
				$lookup: {
					from: 'ccts_aguascalientes',
					localField: 'cct',
					foreignField: 'cct',
					as: 'cct_info'
				}
			},
			{
				$project: {
					_id: 1,
					cct: 1,
					puesto: 1,
					asignatura: 1,
					horas: 1,
					turno: 1,
					cct_info: {
						"$arrayElemAt": ["$cct_info", 0]
					}
				}
			},
			{
				$project: {
					_id: 1,
					cct: 1,
					puesto: 1,
					asignatura: 1,
					horas: 1,
					turno: 1,
					longitud: '$cct_info.longitud',
					latitud: '$cct_info.latitud',
					nom_ct: '$cct_info.nom_ct',
					domicilio: {
						$concat: ['$cct_info.domicilio', ', Col: ', '$cct_info.nom_colonia', ', Mun: ', '$cct_info.nom_municipio']
					},
				}
			}
		])
		.exec((err, ccts) => {
			if (err) return res.json(err);
			res.status(200).json(ccts);
		})
});

app.get('/listaOrdenadaCriterio/:nivel/:puesto/:asignatura/:estatusCambio', function (req, res) {
	ListaOrdenada.aggregate([{
				$match: {
					nivel: new RegExp(req.params.nivel),
					puesto: new RegExp(req.params.puesto),
					asignatura: new RegExp(req.params.asignatura),
					estatus: new RegExp(req.params.estatusCambio),
				}
			},
			{
				$lookup: {
					from: 'ccts_aguascalientes',
					localField: 'cct',
					foreignField: 'cct',
					as: 'cct_info'
				}
			},
		])
		.exec((err, ccts) => {
			if (err) return res.json(err);
			res.status(200).json(ccts);
		})
});

//*********************************Logica de cambio de centro de trabajo

app.put('/evento/aplicaCambio/', function (req, res) {
	const reg_disponible = req.body.reg_disponible
	const reg_lista = req.body.reg_lista
	const criterios = req.body.criterios
	const usuario_mov = req.body.usuario
	const fecha_mov = new Date();

	const nuevo_mov = new BitacoraCambios({
		"nivel_mov": criterios.nivel,
		"puesto_mov": criterios.puesto,
		"asignatura_mov": criterios.asignatura,
		"curp_mov": reg_lista.Curp,
		"id_disponible": reg_disponible._id,
		"cct_disponible": reg_disponible.cct,
		"puesto_disponible": reg_disponible.puesto,
		"asignatura_disponible": reg_disponible.asignatura,
		"horas_disponible": reg_disponible.horas,
		"turno": reg_disponible.turno,
		"obs_disponible": reg_disponible.observacion,
		"plaza_disponible": reg_disponible.plaza,
		"id_lista": reg_lista._id,
		"cct_lista": reg_lista.ct,
		"puesto_lista": reg_lista.puesto,
		"asignatura_lista": reg_lista.asignatura,
		"horas_lista": reg_lista.horas,
		"turno_lista": reg_lista.turno,
		"obs_lista": reg_lista.observacion,
		"usuario_mov": usuario_mov,
		"fecha_mov": fecha_mov.toString(),
	});

	nuevo_mov.save(function (err, bitacora) {
		if (err) return res.status(400).json(err);
		const id_bitacora = bitacora._id;

		ListaOrdenada.findOneAndUpdate({
			_id: reg_lista._id
		}, {
			"nuevo_CT": reg_disponible.ct,
			"nuevo_turno": String,
			"nuevo_puesto": String,
			"nuevo_asignatura": String,
			"Plaza": String,
			"horas": String,
			"obs_sis": String,
			"obs_evento": String,
			"fecha_cambio": String,
			"usuario_mod": String,
			"id_bitacora": String
		});
	})
});

//*******************************************Consulta CT Participante */
app.get('/consultaCTPart/:curp', function (req, res) {
	CCTsDisp.find({
			curp_toma: req.params.curp
		})
		.exec(function (err, ccts) {
			if (err) return res.estatus(400).json(err);
			res.status(200).json(ccts);
		})
});

app.get('/consultaOfertas/:cct/:asignatura', function (req, res) {
	CCTsDisp.find({
			cct: req.params.cct,
			asignatura: req.params.asignatura,
			estatusCambio: "Ofertado"
		})
		.exec(function (err, ofertas) {
			if (err) return res.estatus(400).json(err);
			res.status(200).json(ofertas);
		})
});

app.put('/cambiar/', function (req, res) {
	var oferta = req.body.oferta;
	var participante = req.body.participante;
	CCTsDisp.findById(req.body.participante[0]._id, function (err, obj) {
		console.log(obj);
	});

	for (var i in oferta) {
		oferta[i].estatusCambio = "CON CAMBIO";
		oferta[i].curp_toma = participante[0].curp_toma;
	}
	for (var i in participante) {
		participante[i].estatusCambio = "Ofertado";
		participante[i].curp_toma = "";
	}
	var registros = oferta.concat(participante);
	console.log(registros);
	async.eachSeries(registros, function updateObject(obj, done) {
		console.log(obj._id);
		CCTsDisp.findByIdAndUpdate(obj._id, {
			curp_toma: obj.curp_toma,
			estatusCambio: obj.estatusCambio
		}, done);
	}, function allDone(err) {
		console.log(err);
		if (err) return res.status(400).send(err);
		res.status(200).json({
			ok: true,
			message: "Todas las actualizaciones correctas"
		})
	});
});

module.exports = app;