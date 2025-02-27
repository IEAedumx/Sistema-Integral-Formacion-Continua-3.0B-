//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const bitacora_cambios = sequelize.define('bitacora_cambios',{
nivel_mov: {type: DataTypes.STRING, primaryKey:true},
puesto_mov: {type: DataTypes.STRING, allowNull: false},
asignatura_mov: {type: DataTypes.STRING, allowNull: false},
curp_mov: {type: DataTypes.STRING, allowNull: false},
id_disponible: {type: DataTypes.STRING, allowNull:false },
cct_disponible: {type: DataTypes.STRING, allowNull:false},
puesto_disponible: {type: DataTypes.STRING, allowNull:true},
asignatura_disponible: {type: DataTypes.STRING, allowNull:true},
horas_disponible: {type: DataTypes.STRING, allowNull: true},
turno_disponible: {type: DataTypes.STRING, allowNull: true},
obs_disponible: {type: DataTypes.STRING, allowNull: true},
plaza_disponible: {type: DataTypes.STRING, allowNull: true},
id_lista: {type: DataTypes.STRING, allowNull: false},
cct_lista: {type: DataTypes.STRING, allowNull: false},
puesto_lista: {type: DataTypes.STRING, allowNull: true},
asignatura_lista: {type: DataTypes.STRING, allowNull:true},
horas_lista: {type: DataTypes.STRING, allowNull: true},
obs_lista: {type: DataTypes.STRING, allowNull: true},
plaza_lista: {type: DataTypes.STRING, allowNull: true},
usuario_mov: {type: DataTypes.STRING, allowNull: true},
fecha_mov: {type: DataTypes.STRING, allowNull:true} 
});

module.exports = bitacora_cambios;