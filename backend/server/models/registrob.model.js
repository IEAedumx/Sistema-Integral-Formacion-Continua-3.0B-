//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const RegistroSchema = sequelize.define('RegistroSchema',{
usuario: {type: DataTypes.Object, allowNull: false},
oferta_formacion: {type: DataTypes.STRING, allowNull: false},
grupo: {type: DataTypes.STRING, allowNull: false},
asistencia: {type: DataTypes.ARRAY},
resultado: {type: DataTypes.STRING, allowNull: false},
estatus: {type: DataTypes.ENUM(''), allowNull: false},
porcentaje_avance: {type: DataTypes.NUMBER, allowNull: false, defaultValue:0},
fecha_registro: {type: DataTypes.DATE, allowNull: false},
});

module.exports = RegistroSchema

