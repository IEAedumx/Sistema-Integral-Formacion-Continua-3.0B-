//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const PresupuestoSchema = sequelize.define('PresupuestoSchema',{
sostenimiento: {type: DataTypes.ENUM('Estatal','Federal'), allowNull:false, defaultValue: 'Estatal'},
programa: {type: DataTypes.STRING, allowNull: false},
monto: {type: DataTypes.NUMBER, allowNull: false},
});

module.exports = PresupuestoSchema;

