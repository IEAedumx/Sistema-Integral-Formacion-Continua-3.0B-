//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const ModalidadSchema = sequelize.define('ModalidadSchema',{
nombre: {type: DataTypes.STRING, allowNull:false},
descripcion: {type: DataTypes.STRING, allowNull: false},
});

module.exports = ModalidadSchema;