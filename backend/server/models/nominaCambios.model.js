const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NominaCambiosSchema = new Schema({
    "Curp": String,
    "Sostenimiento": String,
    "CT": String,
    "Plaza": String,
    "NivelSueldo": String,
    "Estatus": String,
    "Motivo": String,
    "RFC": String,
    "Nombre": String,
    "ApellidoP": String,
    "ApellidoM": String,
    "Nombres": String,
    "Ing_Sep": String,
    "Qna_Ing_Gob": String,
    "Sexo": String,
    "NivelModalidad": String,
    "TipoDeNomina": String,
    "Urse": String,
    "Modelo": String,
    "Cat_Puesto": String,
    "Desc_puesto": String,
    "Horas": Number,
    "qna_ini": String,
    "qna_fin": String,
    "qna_ing_subsis": String
});

module.exports = mongoose.model('NominaCambios', NominaCambiosSchema, 'nomina_cambios');