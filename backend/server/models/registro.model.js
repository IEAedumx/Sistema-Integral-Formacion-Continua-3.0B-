const mongoose = require('mongoose');
const Schema = mongoose.Schema;

resultadosValidos = {
    values: ['CONCLUIDO', 'NO CONCLUIDO', 'PENDIENTE'],
    message: '{VALUE} no es un tipo válido'
}
estatusValidos = {
    values: ['CONCLUIDO', 'NO CONCLUIDO', 'EN CURSO'],
    message: '{VALUE} no es un tipo válido'
}


const RegistroSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    oferta_formacion: {
        type: Schema.Types.ObjectId,
        ref: 'OfertaFormacion'
    },
    grupo: {
        type: Schema.Types.ObjectId,
        ref: 'OfertaFormacion.grupos'
    },
    asistencia: [],
    resultado: {
        type: String,
        enum: resultadosValidos,
        default: 'PENDIENTE'
    },
    estatus: {
        type: String,
        enum: estatusValidos,
        default: 'NO CONCLUIDO'
    },
    porcentaje_avance: {
        type: Number,
        default: 0
    },
    fecha_registro: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Registro', RegistroSchema, 'registros');