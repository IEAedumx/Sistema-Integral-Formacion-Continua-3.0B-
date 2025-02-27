const mongoose = require('mongoose');
const SIPPE = require('./sippe.model');
const Schema = mongoose.Schema;

estatusValidos = {
    values: ['ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'ELIMINADO'],
    message: '{VALUE} no es un tipo válido'
};

const UsuarioSchema = new Schema({
    usuario: {
        type: String,
        index: true,
        unique: [true, 'Ya existe un registro con este usuario']
    },
    hash: String,
    perfil: {
        type: mongoose.Types.ObjectId,
        ref: 'Perfil'
    },
    institucion_formadora: {
        type: mongoose.Types.ObjectId,
        ref: 'InstitucionFormadora',
        required: false
    },
    nombre: {
        type: String,
        uppercase: true
    },
    primer_apell: {
        type: String,
        uppercase: true,
		default: ''
    },
    segundo_apell: {
        type: String,
        uppercase: true,
		default: ''
    },
    preparacion: {
        type: String,
    },
    telefono_fijo: {
        type: Number,
        default: 0
    },
    telefono_movil:{
        type: Number,
        default: 0
    },
    email: {
        type: String,
        lowercase: true
    },
    estatus: {
        type: String,
        enum: estatusValidos,
        default: 'ACTIVO'
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

UsuarioSchema.virtual('nombreComp').get(function() {
    return `${this.nombre} ${this.primer_apell} ${this.segundo_apell}`;
});
//Variable virtual "nomina"
/*UsuarioSchema.virtual('nomina', {
    ref: 'SIPPE',
    localField: 'usuario',
    foreignField: 'CURP',
    justOne: false
});*/

/*UsuarioSchema.pre('save', function (next, done) {
    this.populate('perfil')
        .execPopulate()
        .then(() => {
            if (this.perfil.perfil === 'DOCENTE') {
                SIPPE.find({
                    CURP: this.usuario
                }).exec((err, res) => {
                    if (err) next(new Error('No se localizó la CURP como personal del servicio educativo'))
                    this.primer_apell = res[0].PrimerApellido;
                    this.segundo_apell = res[0].SegundoApellido;
                    this.nombre = res[0].Nombres;
                    next();
                })
            } else {
                next();
            }
        });
});*/

module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuarios');