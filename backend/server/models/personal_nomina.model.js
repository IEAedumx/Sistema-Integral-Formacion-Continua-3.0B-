const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sostenimientosValidos = {
    values: ['FONE', 'NO FONE'],
    message: '{VALUE} no es un rol valido'
}

const PersonalNominaSchema = new Schema({
    curp: {
        type: String,
        maxlength: 18
    },
    rfc: {
        type: String,
        maxlength: 13
    },
    nombre: {
        type: String,
        required: 'El nombre es requerido',
    },
    primer_apell: {
        type: String,
    },
    segundo_apell: {
        type: String,
    },
    clave_presupuestal: {
        type: String,
    },
    categoria: {
        type: String,
    },
    motivo: {
        type: String,
    },
    ing_subsist: {
        type: Number,
    },
    ing_sep: {
        type: Number,
    },
    inicio_pago: {
        type: Number,
    },
    fin_pago: {
        type: Number,
    },
    sostenimiento: {
        type: String,
        enum: sostenimientosValidos,
        default: 'NO FONE'
    },
    cct: {
        type: String
    },
    nivelModalidad: {
        type: Number
    },
    modelo: {
        type: Number
    },
    horas: {
        type: Number
    },
    cat_puesto: {
        type: String
    }
});

module.exports = mongoose.model('PersonalNomina', PersonalNominaSchema, 'personal_nomina');