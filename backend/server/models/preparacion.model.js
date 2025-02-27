const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreparacionSchema = Schema({
    preparacion: String,
    descripcion: String
})

module.exports = mongoose.model('Preparacion', PreparacionSchema, 'preparacion');