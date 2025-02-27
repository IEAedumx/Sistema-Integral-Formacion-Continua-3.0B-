var mongoose = require('mongoose');
var db_conn_atatp = mongoose.createConnection('mongodb://localhost:27017/AT_ATP_REP', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const SIPPE = require('../sippe.model')

var UsuarioSchema = new mongoose.Schema({
    curp: String,
    nombre: String,
    primer_apell: String,
    segundo_apell: String,
    perfil: String,
}, {
    toJSON: {
        virtuals: true,
    }
})

UsuarioSchema.virtual('nombre_completo').get(function () {
    return `${this.nombre} ${this.primer_apell} ${this.segundo_apell}`
})

module.exports = db_conn_atatp.model('Usuarios', UsuarioSchema, 'usuarios');
