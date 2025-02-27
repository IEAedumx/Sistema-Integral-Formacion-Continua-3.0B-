const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Vista mongo DB
const ConsultaRegFCSchema = new Schema({
    "_id": String,
    "funciones": Array,
    "plazas": Array,
    "fecha_registro": String,
    "periodoFC": String,
    "telefono1": Number,
    "idUsuario": String,
    "CURP": String,
    "nombre": String,
    "primer_apell": String,
    "segundo_apell": String,
    "email": String,
    "telefono2": Number,
    "idOferta": String,
    "nombre_oferta": String,
    "idGrupo": String,
    "sede": String,
    "grupo": String,
    "cct": String
});

module.exports = mongoose.model('consulta_reg_fc', ConsultaRegFCSchema, 'consulta_reg_fc');