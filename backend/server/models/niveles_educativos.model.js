const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NivelEducativoSchema = new Schema({
    nombre: {
        type: String,
        required: 'El nombre es requerido'
    },
    descripcion: {
        type: String
    },
    funcionSIPPE: {
        type: Array,
        default: [0]
    },
    categorias: {
        type: String,
        default:"*"
    }
});

module.exports = mongoose.model('NivelEducativo', NivelEducativoSchema, 'niveles_educativos')