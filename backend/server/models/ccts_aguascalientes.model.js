const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CctsAguascalientesSchema = new Schema({
    "cct": String,
    "cve_turno": String,
    "turno": String,
    "nom_ct": String,
    "tipo_educ": String,
    "nivel": String,
    "servicio": String,
    "nom_control": String,
    "sostenimiento": String,
    "cve_entidad":String,
    "nom_entidad": String,
    "cve_municipio": String,
    "nom_municipio": String,
    "cve_localidad": String,
    "nom_localidad": String,
    "domicilio": String,
    "num_ext": String,
    "entre_calle_1": String,
    "entre_calle_2": String,
    "calle_posterior": String,
    "colonia": String,
    "nom_colonia": String,
    "cp": String,
    "cve_lada": String,
    "telefono": String,
    "tel_ext": String,
    "latitud": Number,
    "longitud": Number
});

module.exports = mongoose.model('CCTAgs', CctsAguascalientesSchema, 'ccts_aguascalientes');
