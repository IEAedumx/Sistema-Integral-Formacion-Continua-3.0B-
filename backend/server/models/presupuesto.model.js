const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sostenimientosValidos = {
    values: ['Estatal', 'Federal'],
    message: 'El sostenimiento {VALUE} no es válido para este campo.'
}

const PresupuestoSchema = new Schema({
    sostenimiento: {
        type: String,
        enum: sostenimientosValidos,
        default: 'Estatal'
    },
    programa: String,
    monto: Number
});

module.exports = mongoose.model(
    'Presupuesto',
    PresupuestoSchema,
    'presupuesto'
);