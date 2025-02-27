//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database');

const CctsAguascalientesSchema = sequelize.define('CctsAguascalientesSchema',{
    cct: {type: DataTypes.STRING, primaryKey:true},
    cve_turno: {type: DataTypes.STRING, allowNull: false},
    turno: {type: DataTypes.STRING, allowNull: false},
    nom_ct: {type: DataTypes.STRING, allowNull: false},
    tipo_educ: {type: DataTypes.STRING, allowNull:false },
    nivel: {type: DataTypes.STRING, allowNull:false},
    servicio: {type: DataTypes.STRING, allowNull:false},
    nom_control: {type: DataTypes.STRING, allowNull:false},
    sostenimiento: {type: DataTypes.STRING, allowNull: true},
    cve_entidad: {type: DataTypes.STRING, allowNull: false},
    nom_entidad: {type: DataTypes.STRING, allowNull: false},
    cve_localidad: {type: DataTypes.STRING, allowNull: false},
    nom_localidad: {type: DataTypes.STRING, allowNull: false},
    domicilio: {type: DataTypes.STRING, allowNull: false},
    num_ext: {type: DataTypes.STRING, allowNull: true},
    entre_calle_1: {type: DataTypes.STRING, allowNull:true},
    entrel_calle_2: {type: DataTypes.STRING, allowNull: true},
    calle_posterior: {type: DataTypes.STRING, allowNull: true},
    colonia: {type: DataTypes.STRING, allowNull: true},
    nom_colonia: {type: DataTypes.STRING, allowNull: true},
    cp: {type: DataTypes.STRING, allowNull:false}, 
    cve_lada: {type: DataTypes.STRING, allowNull:false},
    telefono: {type: DataTypes.STRING, allowNull:false},
    tel_ext: {type: DataTypes.STRING, allowNull:true},
    latitud: {type: DataTypes.NUMBER, allowNull:true},
    longitud: {type: DataTypes.NUMBER, allowNull:true},
    });
    
    module.exports = CctsAguascalientesSchema;