//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const PeriodicidadSchema = sequelize.define('PeriodicidadSchema',{
nombre: {type: DataTypes.STRING, allowNull:false},
descripcion: {type: DataTypes.STRING, allowNull: false},
});

module.exports = PeriodicidadSchema;

