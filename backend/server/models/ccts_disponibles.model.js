const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CCTAgs = require('./ccts_aguascalientes.model');

const CctsDisponiblesSchema = new Schema({
    "nivel": String,
    "puesto": String,
    "docente": String,
    "tipo_plaza": String,
    "cve_plaza": String,
    "categoria": String,
    "horas": Number,
    "sostenimiento": String,
    "cct": String,
    "asignatura": String,
    "turno": String,
    "motivo_nom": String,
    "estatus": String,
    "ing_19_20": String,
    "validacion": String,
    "observ_nivel": String,
    "curp_toma": String,
    "estatusCambio": String
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

CctsDisponiblesSchema.virtual('cct_info', {
    ref: 'CCTAgs',
    localField: 'cct',
    foreignField: 'cct',
    justOne: false
});


module.exports = mongoose.model('cctsDisponibles', CctsDisponiblesSchema, 'ccts_disponibles');