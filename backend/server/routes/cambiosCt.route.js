const express = require('express');
const NominaCambios = require('../models/nominaCambios.model');
const RegistroCambios = require('../models/registroCambios.model');
const RegistroCambiosPermuta = require('../models/registroPermutas.model')

app = express();

app.get('/cambiosCt', function (req, res) {
	res.status(200).send('La conexi�n fue exitosa');
});

app.get('/cambiosCt/nomina', function (req, res) {
	NominaCambios.find({})
		.exec((err, nomina) => {
			if (err) return res.json(err);
			res.status(200).json(nomina);
		});
});

app.get('/cambiosCt/nomina/:curp', function (req, res) {
	NominaCambios.find({
			Curp: req.params.curp
		})
		.exec((err, nomina) => {
			if (err) return res.json(err);
			res.status(200).json(nomina);
		});
});

app.post('/cambiosCt/registroCambio/', function (req, res) {
	new RegistroCambios(req.body.registro)
		.save((err, registro) => {
			if (err) return res.json(err);
			res.status(200).json(registro);
		});
});

app.get('/cambiosCt/registroCambio/:cuenta', function (req, res) {
	RegistroCambios.find({
			Cuenta: req.params.cuenta
		})
		.exec((err, registro) => {
			if (err) return res.json(err);
			res.status(200).json(registro);
		});
});

app.put('/cambiosCt/validaPlaza/:_idPlaza/', function (req, res) {
	console.log(req.body);
	RegistroCambios.findOne({
			'plazasRegistradas': {
				$elemMatch: {
					_id: req.params._idPlaza
				}
			},

		})
		.exec((err, registro) => {
			if (err) return res.json(err);
			res.status(200).json(registro);
		});
});

app.post('/permutasCt/registroPermuta/', function (req, res) {
	new RegistroCambiosPermuta(req.body.registro)
		.save((err, registro) => {
			if (err) return res.json(err);
			res.status(200).json(registro);
		});
});

app.get('/permutasCt/registroPermuta/:cuenta', function (req, res) {
	RegistroCambiosPermuta.find({
			Cuenta: req.params.cuenta
		})
		.exec((err, registro) => {
			if (err) return res.json(err);
			res.status(200).json(registro);
		});
});

module.exports = app;