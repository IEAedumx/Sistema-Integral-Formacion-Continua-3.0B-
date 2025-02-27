//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const RegistroCambiosSchema = sequelize.define('RegistroCambiosSchema',{
Curp: {type: DataTypes.STRING, allowNull: false},
fupfile: {type: DataTypes.STRING, allowNull: false},
IngresoOk: {type: DataTypes.STRING, allowNull: false},
Cuenta: {type: DataTypes.STRING, allowNull: false},
plazasRegistradas: {type: DataTypes.ARRAY},
});

module.exports = RegistroCambiosSchema;

