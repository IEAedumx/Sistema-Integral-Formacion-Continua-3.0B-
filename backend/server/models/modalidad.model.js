const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModalidadSchema = new Schema({
    nombre: String,
    descripcion: String,
});

module.exports = mongoose.model('Modalidad', ModalidadSchema, 'modalidades');