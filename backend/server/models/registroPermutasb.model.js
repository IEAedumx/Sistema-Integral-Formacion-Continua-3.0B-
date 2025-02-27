//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const RegistroPermutasSchema = sequelize.define('RegistroPermutasSchema',{
Curp: {type: DataTypes.STRING, allowNull: false},
CurpPermuta: {type: DataTypes.STRING, allowNull: false},
NombrePermuta: {type: DataTypes.STRING, allowNull: false},
fupFile: {type: DataTypes.STRING, allowNull: false},
IngresoOk: {type: DataTypes.STRING},
Cuenta: {type: DataTypes.STRING, allowNull: false},
plazasRegistradas: {type: DataTypes.ARRAY},
});

module.exports = RegistroPermutasSchema;

