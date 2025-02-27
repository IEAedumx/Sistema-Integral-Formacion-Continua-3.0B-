const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BitacoraCambiosSchema = new Schema({
    "nivel_mov": String,
    "puesto_mov": String,
    "asignatura_mov": String,
    "curp_mov": String,
    "id_disponible": String,
    "cct_disponible": String,
    "puesto_disponible": String,
    "asignatura_disponible": String,
    "horas_disponible": String,
    "turno_disponible": String,
    "obs_disponible": String,
    "plaza_disponible": String,
    "id_lista": String,
    "cct_lista": String,
    "puesto_lista": String,
    "asignatura_lista": String,
    "horas_lista": String,
    "obs_lista": String,
    "plaza_lista": String,
    "usuario_mov": String,
    "fecha_mov": String,
})

module.exports = mongoose.model('BitacoraCambios', BitacoraCambiosSchema, 'bitacora_cambios');