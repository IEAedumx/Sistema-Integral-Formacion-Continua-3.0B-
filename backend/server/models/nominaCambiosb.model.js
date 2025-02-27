//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const NominaCambiosSchema = sequelize.define('NominaCambiosSchema',{
Curp: {type: DataTypes.STRING, allowNull:false},
Sostenimiento: {type: DataTypes.STRING, allowNull: false},
CT: {type: DataTypes.ARRAY, allowNull: false},
Plaza: {type: DataTypes.STRING, allowNull: false},
NivelSueldo: {type: DataTypes.STRING, allowNull: false},
Estatus: {type: DataTypes.STRING, allowNull: false},
Motivo: {type: DataTypes.STRING, allowNull: false},
RFC: {type: DataTypes.STRING, allowNull: false},
Nombre: {type: DataTypes.STRING, allowNull: false},
ApellidoP: {type: DataTypes.STRING, allowNull: false},
ApellidoM: {type: DataTypes.STRING, allowNull: false},
Nombres: {type: DataTypes.STRING, allowNull: false},
Ing_Sep: {type: DataTypes.STRING, allowNull: false},
Qna_Ing_Gob: {type: DataTypes.STRING, allowNull: false},
Sexo: {type: DataTypes.STRING, allowNull: false},
NivelModalidad: {type: DataTypes.STRING, allowNull: false},
TipoDeNomina: {type: DataTypes.STRING, allowNull: false},
Urse: {type: DataTypes.STRING, allowNull: false},
Modelo: {type: DataTypes.STRING, allowNull: false},
Cat_Puesto: {type: DataTypes.STRING, allowNull: false},
Desc_puesto: {type: DataTypes.STRING, allowNull: false},
Horas: {type: DataTypes.NUMBER, allowNull: false},
qna_ini: {type: DataTypes.STRING, allowNull: false},
qna_fin: {type: DataTypes.STRING, allowNull: false},
qna_ing_subsis: {type: DataTypes.STRING, allowNull: false},
});

module.exports = NominaCambiosSchema;