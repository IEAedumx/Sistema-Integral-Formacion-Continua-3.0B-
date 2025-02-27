const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CCTAgs = require('./ccts_aguascalientes.model');

const ListaOrdenadaSchema = new Schema({
    "prelacion": String,
    "puesto": String,
    "asignatura": String,
    "horas": Number,
    "nivel": String,
    "idPart": String,
    "Cuenta": String,
    "Curp": String,
    "Nombre": String,
    "fupFile_url": String,
    "ing_sep_validado": String,
    "idPlaza": String,
    "Plaza": String,
    "Cat_Puesto": String,
    "Sostenimiento": String,
    "Desc_puesto": String,
    "CT": String,
    "ordenesFile_url": String,
    "Urse": String,
    "turno": String,
    "estatus": String,
    "nuevo_CT": String,
    "nuevo_turno": String,
    "nuevo_puesto": String,
    "nuevo_asignatura": String,
    "nuevo_horas": String,
    "obs_sis": String,
    "obs_evento": String,
    "fecha_cambio": String,
    "usuario_mod": String,
    "id_bitacora": String
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

ListaOrdenadaSchema.virtual('cct_info', {
    ref: 'CCTAgs',
    localField: 'cct',
    foreignField: 'cct',
    justOne: false
});


module.exports = mongoose.model('ListaOrdenada', ListaOrdenadaSchema, 'listas_ordenadas');