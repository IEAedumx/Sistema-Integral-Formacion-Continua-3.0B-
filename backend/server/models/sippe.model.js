const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SippeSchema = new Schema({
    CURP: String,
    RFC: String,
    PrimerApellido: String,
    SegundoApellido: String,
    Nombres: String,
    ClaveCT: String,
    CveFuncionSIPPE: Number,
    CveSubFuncionSiPPE: Number
})

module.exports = mongoose.model('SIPPE', SippeSchema, 'sippe');