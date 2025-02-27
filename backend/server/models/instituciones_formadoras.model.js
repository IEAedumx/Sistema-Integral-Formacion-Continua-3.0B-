var mongoose = require('mongoose');
var Schema = mongoose.Schema;

tiposValidos = {
    values: ['PÚBLICA', 'PRIVADA'],
    message: '{VALUE} no es un tipo válido'
}

var InstitucionFormadoraSchema = new Schema({
    nombre: {
        type: String,
        required: 'Por favor introduzca el nombre',
        index: true,
    },
    firmante: {
        type: String,
        default: "No definido"
    },
    cargo_firmante: {
        type: String,
        default: "No definido"
    },
    firma_digital: {
        type: String,
        //required: 'Especifique el nombre del archivo de firma del responsable'
    },
    rfc: {
        type: String,
        //required: 'El RFC es requerido',
        uppercase: true
    },
    cct: {
        type: String,
        uppercase: true
    },
    tipo: {
        type: String,
        enum: tiposValidos,
        default: 'PÚBLICA'
    },
    domicilio: {
        type: String
    },
    email: {
        type: String,
        //required: 'El correo es requerido',
        lowercase: true
    },
    telefono1: {
        type: String,
        maxlength: 10,
        minlength: 10,
        //required: 'El teléfono es requerido'
    },
    telefono2: {
        type: String,
        maxlength: 10,
    },
    activo: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    },
    img_logo_const: {
        type: String
    },
    img_firma_const: {
        type: String
    }
}, {
    toJSON: {
        virtuals: true
    }
});

InstitucionFormadoraSchema.virtual('oferta', {
    ref: 'OfertaFormacion',
    localField: '_id',
    foreignField: 'institucion_formadora',
    justOne: false
})


module.exports = mongoose.model('InstitucionFormadora', InstitucionFormadoraSchema, 'instituciones_formadoras');