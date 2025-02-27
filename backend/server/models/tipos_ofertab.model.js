//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const TipoOfertaSchema = sequelize.define('TipoOfertaSchema',{
nombre: {type: DataTypes.STRING, allowNull: false},
descripcion: {type: DataTypes.STRING, allowNull: false},
horas: {type: DataTypes.NUMBER, allowNull: false}
});

module.exports = TipoOfertaSchema;