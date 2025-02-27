//Modelo con Sequelize
const { DataTypes } = require ('sequelize');

//Importar la Conexión
const sequelize = require ('../models/database')

const PersonalNominaSchema = sequelize.define('PersonalNominaSchema',{
curp: {type: DataTypes.STRING, allowNull:false},
rfc: {type: DataTypes.STRING, allowNull: false},
nombre: {type: DataTypes.STRING, allowNull: false},
primer_apell: {type: DataTypes.STRING, allowNull: false},
segundo_apell: {type: DataTypes.STRING, allowNull: false},
clave_presupuestal: {type: DataTypes.STRING, allowNull: false},
categoria: {type: DataTypes.STRING, allowNull: false},
motivo: {type: DataTypes.STRING, allowNull: false},
ing_subsist: {type: DataTypes.NUMBER, allowNull: false},
ing_sep: {type: DataTypes.NUMBER, allowNull: false},
inicio_pago: {type: DataTypes.NUMBER, allowNull: false},
fin_pago: {type: DataTypes.NUMBER, allowNull: false},
sostenimiento: {type: DataTypes.ENUM('FONE', 'NO FONE') , allowNull: false},
cct: {type: DataTypes.STRING, allowNull: false},
nivelModalidad: {type: DataTypes.NUMBER, allowNull: false},
modelo: {type: DataTypes.NUMBER, allowNull: false},
horas: {type: DataTypes.NUMBER, allowNull: false},
cat_puesto: {type: DataTypes.STRING, allowNull: false},

});

module.exports = PersonalNominaSchema

