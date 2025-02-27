const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PerfilSchema = new Schema({
    perfil: {
        type: String,
        required: 'Nombre de perfil requerido',
        uppercase: true
    },
    descripcion: {
        type: String
    }
});

module.exports = mongoose.model('Perfil', PerfilSchema, 'perfiles');