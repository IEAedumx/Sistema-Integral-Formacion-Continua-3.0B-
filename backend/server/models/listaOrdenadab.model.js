//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const ListaOrdenadaSchema = sequelize.define('ListaOrdenadaSchema',{
prelacion: {type: DataTypes.STRING, allowNull:false},
puesto: {type: DataTypes.STRING, allowNull: false},
asignatura: {type: DataTypes.STRING, allowNull: false},
horas: {type: DataTypes.STRING, allowNull: false},
nivel: {type: DataTypes.STRING, allowNull:false},
idPart: {type: DataTypes.STRING, allowNull:false},
Cuenta: {type: DataTypes.STRING, allowNull:false},
Curp: {type: DataTypes.STRING, allowNull:false},
Nombre: {type: DataTypes.STRING, allowNull: false },
fupFile_url: {type: DataTypes.STRING, allowNull: false},
ing_sep_validado: {type: DataTypes.STRING, allowNull: false},
idPlaza: {type: DataTypes.BOOLEAN, allowNull: false},
Plaza: {type: DataTypes.STRING},
Cat_Puesto: {type: DataTypes.STRING},
Sostenimiento: {type: DataTypes.STRING, allowNull:false},
Desc_puesto: {type: DataTypes.STRING, allowNull:false},
CT: {type: DataTypes.STRING, allowNull:false},
ordenesFile_url: {type: DataTypes.STRING, allowNull:false},
Urse: {type: DataTypes.STRING, allowNull:false},
turno:{type: DataTypes.STRING, allowNull:false},
estatus:{type: DataTypes.STRING, allowNull:false},
nuevo_CT:{type: DataTypes.STRING, allowNull:false},
nuevo_turno: {type: DataTypes.STRING, allowNull:false},
nuevo_puesto: {type: DataTypes.STRING, allowNull:false},
nuevo_asignatura: {type: DataTypes.STRING, allowNull:false},
nuevo_horas: {type: DataTypes.STRING, allowNull:false},
obs_sis: {type: DataTypes.STRING, allowNull:false},
obs_evento: {type: DataTypes.STRING, allowNull:false},
fecha_cambio: {type: DataTypes.STRING, allowNull:false},
usuario_mod: {type: DataTypes.STRING, allowNull:false},
id_bitacora: {type: DataTypes.STRING, allowNull:false},
});


module.exports = ListaOrdenadaSchema;