//Modelo con Sequelize
const { DataTypes, Model } = require('sequelize');

//Importar la Conexión
const sequelize = require('../models/database')

//Subdocumentos sesión
class Sesion extends Model { }
Sesion.init({
    dia: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora_ini: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estatus: {
        type: DataTypes.ENUM('INSCRIPCION ABIERTA', 'CANCELADO', 'EN CURSO', 'CERRADO', 'ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'SIN CUPO', 'DISPONIBLE'),
        allowNull: false,
        defaultValue: 'ACTIVO'
    }
}, {
    sequelize,
    modelName: 'Sesion',
    schema: 'dbo',
});

//Subdocumentos Grupo
class Grupo extends Model { }
Grupo.init({
    grupo: {
        type: DataTypes.STRING,
        unique: true
    },
    cupo: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    sesiones: [Sesion],
    update: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
    fecha_ini: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
    fecha_fin: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
    sede: DataTypes.STRING,
    observacion: DataTypes.STRING,
    periodoFC: DataTypes.STRING,
    linea_formacion: DataTypes.STRING,
    estatus:{
        type: DataTypes.STRING,
        ENUM: estatus,
        defaultValue: 'ACTIVO',
    },
    facilitador:{
        //type: Schema.Types.ObjectID
        //ref: 'usuario'
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Grupo',
    schema: 'dbo'
});

class OfertaFormacionSchema extends Model{}
OfertaFormacionSchema.init({
    clave: DataTypes.STRING,
    linea_formacion: DataTypes.STRING,
    institucion_formadora:{
        //type: Schema.Types.ObjectId,
        //ref: 'InstitucionFormadora'
        type: DataTypes.STRING
    },
    nombre_curso: {
        type:DataTypes.STRING
    },
    descripcion: DataTypes.STRING,
    dirigido:{
        //type: Schema.Types.ObjectId
        //ref: 'NivelEducativo'
        type: DataTypes.STRING
    },
    cupo: DataTypes.NUMBER,
    tipo_oferta: {
        //type: Schema.Types.ObjectId,
        //ref: 'TipoOferta'
        type: DataTypes.STRING
    },
    modalidad: {
        //type: Schema.Types.ObjectId,
        //ref: 'Modalidad'
        type:DataTypes.STRING
    },
    presupuesto: {
        //type: Schema.Types.ObjectId,
        //ref: 'Presupuesto'
        type: DataTypes.STRING
    },
    plataforma: DataTypes.STRING,
    fecha_ini: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    grupos: [Grupo],
    costo_por_registro: DataTypes.NUMBER,
    estatus: {
        type: DataTypes.ENUM('INSCRIPCION ABIERTA', 'CANCELADO', 'EN CURSO', 'CERRADO', 'ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'SIN CUPO', 'DISPONIBLE'),
        defaultValue: 'ACTIVO'
    },
    periodoFC: {
        type: DataTypes.STRING
    }
});

/*
OfertaFormacionSchema.pre('save', function (next, done) {
    let cupoGrupos = 0;
    this.grupos.forEach(el => {
        cupoGrupos += parseInt(el.cupo);
    });
    console.log('presave oferta-form cupos', cupoGrupos);
    if (cupoGrupos > this.cupo) {
        next(new Error("El cupo de grupos excede el cupo del curso"));
    }
    next();
});
*/
module.exports = { sequelize, Sesion, Grupo, OfertaFormacionSchema };

