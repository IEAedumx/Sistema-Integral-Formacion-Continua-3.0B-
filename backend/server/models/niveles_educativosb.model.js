//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const NivelEducativoSchema = sequelize.define('NivelEducativoSchema',{
nombre: {type: DataTypes.STRING, allowNull:false},
descripcion: {type: DataTypes.STRING, allowNull: false},
funcionSIPPE: {type: DataTypes.ARRAY, allowNull: false, defaultValue: [0]},
categorias: {type: DataTypes.STRING, allowNull: false, defaultValue: '*'},
});

module.exports = NivelEducativoSchema;