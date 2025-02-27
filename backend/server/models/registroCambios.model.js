const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistroCambiosSchema = new Schema({
	Curp: String,
	fupFile: String,
	IngresoOk: String,
	Cuenta: String,
	plazasRegistradas: []
});

module.exports = mongoose.model('RegistroCambios', RegistroCambiosSchema, 'registro_cambios');