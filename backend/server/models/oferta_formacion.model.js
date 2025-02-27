const mongoose = require('mongoose');
const RegistrosModel = require('./registro.model');
const Schema = mongoose.Schema;

estatusValidos = {
    values: ['INSCRIPCION ABIERTA', 'CANCELADO', 'EN CURSO', 'CERRADO', 'ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'SIN CUPO', 'DISPONIBLE'],
    message: '{VALUE} no es un tipo válido'
}

// Subdocumentos sesion
const Sesion = new Schema({
    dia: Date,
    hora_ini: String,
    hora_fin: String,
    estatus: {
        type: String,
        enum: estatusValidos,
        default: 'ACTIVO'
    }
})

// Subdocumentos grupo
const Grupo = new Schema({
    grupo: {
        type: String,
        index: true,
        unique: [true, 'Ya existe un grupo con este identificador'],
        required: [true, 'El identificador de grupo es requerido']
    },
    cupo: {
        type: [Number, 'Solo se permiten valores numericos en cupo'],
        required: [true, 'Es necesario definir el cupo']
    },
    sesiones: [Sesion],
    update: {
        type: Date,
        default: Date.now
    },
    fecha_ini: {
        type: Date,
        default: Date.now
    },
    fecha_fin: {
        type: Date,
        default: Date.now
    },
    sede: String,
    observacion: String,
    periodoFC: String,
    linea_formacion: String,
    estatus: {
        type: String,
        enum: estatusValidos,
        default: 'ACTIVO'
    },
    facilitador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});


const OfertaFormacionSchema = new Schema({
    clave: String,
    linea_formacion: String,
    institucion_formadora: {
        type: Schema.Types.ObjectId,
        ref: 'InstitucionFormadora'
    },
    nombre_curso: {
        type: [String, 'El nombre es requerido']
    },
    descripcion: String,
    dirigido: [{
        type: Schema.Types.ObjectId,
        ref: 'NivelEducativo'
    }],
    cupo: Number,
    tipo_oferta: {
        type: Schema.Types.ObjectId,
        ref: 'TipoOferta'
    },
    modalidad: {
        type: Schema.Types.ObjectId,
        ref: 'Modalidad'
    },
    presupuesto: {
        type: Schema.Types.ObjectId,
        ref: 'Presupuesto'
    },
    plataforma: String,
    fecha_ini: Date,
    fecha_fin: Date,
    grupos: [Grupo],
    costo_por_registro: Number,
    estatus: {
        type: String,
        enum: estatusValidos,
        default: 'ACTIVO'
    },
    periodoFC: {
        type: String,
        required: true
    }
});

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

module.exports = mongoose.model('OfertaFormacion', OfertaFormacionSchema, 'oferta_formacion');