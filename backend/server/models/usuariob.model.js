//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const UsuarioSchema = sequelize.define('UsuarioSchema',{
usuario: {type: DataTypes.STRING,primaryKey:true, allowNull: false},
hash: {type: DataTypes.STRING, allowNull: false},
perfil: {type: DataTypes.STRING, allowNull: false},
institucion_formadora: {type: DataTypes.STRING, allowNull: false},
nombre: {type: DataTypes.STRING, allowNull: false},
primer_apell: {type: DataTypes.STRING, allowNull: false},
segundo_apell: {type: DataTypes.STRING, allowNull: false},
preparacion: {type: DataTypes.STRING, allowNull: false},
telefono_fijo: {type: DataTypes.NUMBER, allowNull: false, defaultValue:0},
telefono_movil: {type: DataTypes.NUMBER, allowNull: false, defaultValue:0},
email: {type: DataTypes.STRING, allowNull: false},
estatus: {type: DataTypes.ENUM('ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'ELIMINADO'), allowNull: false},
});

module.exports = UsuarioSchema;