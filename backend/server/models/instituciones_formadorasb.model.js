//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const InstitucionFormadoraSchema = sequelize.define('InstitucionFormadoraSchema',{
nombre: {type: DataTypes.STRING, allowNull:false},
firmante: {type: DataTypes.STRING, allowNull: false},
cargo_firmante: {type: DataTypes.STRING, allowNull: false},
firma_digital: {type: DataTypes.STRING, allowNull: false},
rfc: {type: DataTypes.STRING, allowNull:false, set (value) {this.setDataValue('rfc',value.toUpperCase())} },
cct: {type: DataTypes.STRING, allowNull:false, set (value) {this.setDataValue('cct',value.toUpperCase())} },
tipo: {type: DataTypes.ENUM('PÚBLICA', 'PRIVADA'), allowNull:false},
domicilio: {type: DataTypes.STRING, allowNull:false},
email: {type: DataTypes.STRING, allowNull: false, set (value){this.setDataValue('email', value.toLowerCase())} },
telefono1: {type: DataTypes.STRING, allowNull: true},
telefono2: {type: DataTypes.STRING, allowNull: true},
activo: {type: DataTypes.BOOLEAN, allowNull: false},
img: {type: DataTypes.STRING},
img_logo_const: {type: DataTypes.STRING},
img_firma_const: {type: DataTypes.STRING},
});


InstitucionFormadoraSchema.virtual('oferta', {
    

})

module.exports = InstitucionFormadoraSchema;
