const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeriodicidadSchema = new Schema({
    nombre: String,
    descripcion: String
});

module.exports = mongoose.model('Periodicidad', PeriodicidadSchema, 'periodicidades');