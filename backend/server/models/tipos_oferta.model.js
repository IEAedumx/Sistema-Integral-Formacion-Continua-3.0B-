const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipoOfertaSchema = new Schema({
    nombre: String,
    descripcion: String,
    horas: Number
});

module.exports = mongoose.model('TipoOferta', TipoOfertaSchema, 'tipos_oferta');