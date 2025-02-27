//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const PreparacionSchema = sequelize.define('PreparacionSchema',{
preparacion: {type: DataTypes.STRING, allowNull:false},
descripcion: {type: DataTypes.STRING, allowNull: false},
});

module.exports = PreparacionSchema;

