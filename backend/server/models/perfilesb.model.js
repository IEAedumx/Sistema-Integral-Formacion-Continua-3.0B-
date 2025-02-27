//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const PerfilSchema = sequelize.define('PerfilSchema',{
perfil: {type: DataTypes.STRING, allowNull:false},
descripcion: {type: DataTypes.STRING, allowNull: false},
});

module.exports = PerfilSchema;

