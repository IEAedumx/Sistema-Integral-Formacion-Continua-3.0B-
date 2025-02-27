//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const SippeSchema = sequelize.define('SippeSchema',{
CURP: {type: DataTypes.STRING, allowNull: false},
RFC: {type: DataTypes.STRING, allowNull: false},
PrimerApellido: {type: DataTypes.STRING, allowNull: false},
SegundoApellido: {type: DataTypes.STRING, allowNull: false},
Nombres: {type: DataTypes.STRING, allowNull: false},
ClaveCT: {type: DataTypes.STRING, allowNull: false},
CveFuncionSIPPE: {type: DataTypes.NUMBER, allowNull: false},
CveSubFuncionSiPPE: {type: DataTypes.NUMBER, allowNull: false},
});

module.exports = SippeSchema;
