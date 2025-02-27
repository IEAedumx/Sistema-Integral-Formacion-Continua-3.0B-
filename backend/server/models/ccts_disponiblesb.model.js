//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database');

const ccts_disponibles = sequelize.define('Ccts_disponibles',{
    nivel: {type: DataTypes.STRING, allowNull:false},
    puesto: {type: DataTypes.STRING, allowNull: false},
    docente: {type: DataTypes.STRING, allowNull: false},
    tipo_plaza: {type: DataTypes.STRING, allowNull: false},
    cve_plaza: {type: DataTypes.STRING, allowNull:false },
    categoria: {type: DataTypes.STRING, allowNull:false},
    horas: {type: DataTypes.STRING, allowNull:false},
    sostenimiento: {type: DataTypes.STRING, allowNull:false},
    cct: {type: DataTypes.STRING, allowNull: false},
    asignatura: {type: DataTypes.STRING, allowNull: false},
    turno: {type: DataTypes.STRING, allowNull: false},
    motivo_nom: {type: DataTypes.STRING, allowNull: true},
    estatus: {type: DataTypes.STRING, allowNull: true},
    ing_19_20: {type: DataTypes.STRING, allowNull: true},
    validacion: {type: DataTypes.STRING, allowNull: true},
    observ_nivel: {type: DataTypes.STRING, allowNull: true},
    curp_toma: {type: DataTypes.STRING, allowNull: false},
    estatuscambio: {type: DataTypes.STRING, allowNull: true},
    });
    
    module.exports = ccts_disponibles;