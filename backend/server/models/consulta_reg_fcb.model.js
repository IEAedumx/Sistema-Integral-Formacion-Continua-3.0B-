//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const ConsultaRegFCSchema = sequelize.define('ConsultaRegFCSchema',{
_id: {type: DataTypes.STRING, primaryKey:true},
funciones: {type: DataTypes.STRING, allowNull: false},
plazas: {type: DataTypes.STRING, allowNull: false},
fecha_registro: {type: DataTypes.STRING, allowNull: false},
periodoFC: {type: DataTypes.STRING, allowNull:false },
telefono1: {type: DataTypes.STRING, allowNull:true},
id_usuario: {type: DataTypes.STRING, allowNull:false},
CURP: {type: DataTypes.STRING, allowNull:false},
nombre: {type: DataTypes.STRING, allowNull: false},
primer_apell: {type: DataTypes.STRING, allowNull: false},
segundo_apell: {type: DataTypes.STRING, allowNull: true},
email: {type: DataTypes.STRING, allowNull: false},
telefono2: {type: DataTypes.STRING, allowNull: true},
idOferta: {type: DataTypes.STRING, allowNull: false},
nombre_oferta: {type: DataTypes.STRING, allowNull: false},
idGrupo: {type: DataTypes.STRING, allowNull:false},
sede: {type: DataTypes.STRING, allowNull: true},
grupo: {type: DataTypes.STRING, allowNull: false},
cct: {type: DataTypes.STRING, allowNull: true},
});

module.exports = ConsultaRegFCSchema;