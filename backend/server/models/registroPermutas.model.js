const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistroPermutasSchema = new Schema({
	Curp: String,
	CurpPermuta: String,
	NombrePermuta: String,
	fupFile: String,
	IngresoOk: String,
    Cuenta: String,
	plazasRegistradas: []
});

module.exports = mongoose.model('RegistroPermutas', RegistroPermutasSchema, 'registro_permutas');