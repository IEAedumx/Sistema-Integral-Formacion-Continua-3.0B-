const express = require('express');
const bcrypt = require('bcrypt');
const config = require('../config/jwt/config.json');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/usuario.model');
const email = require('../apis/mailerCtrl')

const app = express();

app.post('/usuarios/login', function (req, res) {
    Usuarios.findOne({
            usuario: req.body.usuario
        })
        .populate('nomina')
        .populate('perfil')
        .populate('institucion_formadora')
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).send('Error al conectarse con el servidor.' + err.message);
            }
            console.log(req.body);
            if (usuario !== null && bcrypt.compareSync(req.body.pass, usuario.hash)) {
                const {
                    _id,
                    hash,
                    nomina,
                    nombre,
                    primer_apell,
                    segundo_apell,
                    ...usuarioSinHash
                } = usuario.toObject();
                const token = jwt.sign({
                    sub: usuarioSinHash
                }, config.secret);
                res
                    .status(200)
                    .json({
                        ok: true,
                        message: 'Acceso concedido.',
                        usuario: usuarioSinHash,
                        token
                    });
            } else {
                return res
                    .status(400)
                    .json('Acceso denegado, por favor verifique los datos de acceso.');
            }
        });
});

app.post('/usuarios/iealogin', function (req, res) {
    Usuarios.findOne({
            email: req.body.email,
            /*perfil: "5d098fc03e6c101328e82122"*/
        })
        .populate('nomina')
        .populate('perfil')
        .populate('institucion_formadora')
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).send('Error al conectarse con el servidor.' + err.message);
            }
            console.log(req.body);
            if (usuario !== null) {
                const {
                    _id,
                    hash,
                    nomina,
                    nombre,
                    primer_apell,
                    segundo_apell,
                    ...usuarioSinHash
                } = usuario.toObject();
                const token = jwt.sign({
                    sub: usuarioSinHash
                }, config.secret);
                res
                    .status(200)
                    .json({
                        ok: true,
                        message: 'Acceso concedido.',
                        usuario: usuarioSinHash,
                        token
                    });
            } else {
                return res
                    .status(400)
                    .send('Acceso denegado, por favor verifique los datos de acceso.');
            }
        });
});

app.put('/usuarios/restore', function (req, res) {
    Usuarios.findOne({
            usuario: req.body.usuario,
            email: req.body.email
        })
        .exec((err, usuario) => {
            if (err) return res.status(400).send('Error al consultar')
            if (!usuario) return res.status(400).send('No corresponde el Usuario(CURP) con el correo registrado, favor de verificar');
            let newPass = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (var i = 0; i < 6; i++) {
                newPass += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            usuario.hash = bcrypt.hashSync(newPass, 10);
            usuario.save((err, usuario) => {
                if (err) return res.status(400).send('No se pudo actualizar la conrtaseña: ' + err.message);
                correo = {
                    mensaje: `
					<p>Se han restablecido con éxito sus credenciales en el SIFC</p>
					<p>Podrá ingresar con:</p>
					<h2>Usuario: ${usuario.usuario}</h2>
					<h2>Contraseña: ${newPass}</h2>
					<br>
					<b>**Este correo ha sido generado automáticamente, por lo que no es necesario responder al mismo ya que no se atenderá la respuesta.</b>
					`,
                    asunto: 'Restablecer contraseña SIFC',
                    email: usuario.email
                }
                email.sendEmail(correo);
                res.status(200).json({
                    message: `Se modificó la contraseña con éxito, se ha enviado la información de acceso a ${usuario.email}.`,
                });
            })
        })
})

app.get('/usuarios', function (req, res) {
    let criterio = req.body || {}
    Usuarios.find(criterio).lean()
        .populate('perfil')
        .populate('institucion_formadora')
        .populate('nomina')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).send('No se pudieron consultar los usuarios');
            }
            res.json(usuarios);
        });
});
app.get('/usuarios/filtro/:criterio', function (req, res) {
    let regex = new RegExp(req.params.criterio, "i");
    let criterio = {
        $or: [{
            nombreComp: regex
        }, {
            nombre: regex
        }, {
            primer_apell: regex
        }, {
            segundo_apell: regex
        }, {
            usuario: regex
        }, {
            email: regex
        }]
    };
    Usuarios.find(criterio)
        .populate('institucion_formadora')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(200).send('No se pudieron consultar los usuarios ' + err.message);
            }
            res.json(usuarios);
        });
});
app.get('/usuarios/:criterio/:id', function (req, res) {
    Usuarios.find({
            [req.params.criterio]: req.params.id
        })
        .populate('perfil')
        .populate('nomina')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).send('No se pudieron consultar los usuarios');
            }
            res.json(usuarios);
        });
});
app.put('/usuarios/edit/:id/', function (req, res) {
    if (!req.body.cambiaPass) {
        delete req.body.hash;
    } else {
        req.body.hash = bcrypt.hashSync(req.body.hash, 10);
    }
    delete req.body.cambiaPass;
    Usuarios.updateOne({
        _id: req.params.id
    }, {
        $set: req.body
    }, function (err, update) {
        if (err) return res.status(200).send('No se pudo actualizar ' + err.message);
        return res.status(200).send('Registro actualizado con éxito');
    })

});
app.get('/usuarios/:id', function (req, res) {
    console.log(req.params);
    Usuarios.findById(req.params.id)
        .populate('perfil')
        .populate('institucion_formadora')
        .populate('nomina')
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).send('No se pudo consultar usuario');
            }
            return res.status(200).json(usuario);
        });

});
app.post('/usuarios/registro', function (req, res) {
    req.body.hash = bcrypt.hashSync(req.body.hash, 10);
    usuario = req.body;
    console.log('api registro', usuario);
    Usuarios.updateOne({
        usuario: usuario.usuario
    }, {
        $set: usuario
    }, {
        upsert: true
    }, (err, usuarioDB) => {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                return res.status(400).send('El usuario ya existe.')
            }
            return res.status(400).send(err.message);
        }
        console.log(usuarioDB)
        return res.status(200).json(usuarioDB);
    });
});

app.put('/usuarios/datos/:id', function (req, res) {
    Usuarios.findById(req.params.id)
        .exec((err, usuario) => {
            if (err) return res.status(400).send('No se localizó el usuario');
            usuario.email = req.body.email;
            usuario.telefono_fijo = req.body.telefono_fijo;
            usuario.telefono_movil = req.body.telefono_movil;

            usuario.save((err, usuario) => {
                if (err) return res.status(400).send('No se pudieron actualizar los datos: ' + err.message);
                res.status(200).json(usuario);
            })
        })
})
app.put('/usuarios/pass/:id/', function (req, res) {
    Usuarios.findById(req.params.id)
        .exec((err, usuario) => {
            if (err) return res.status(400).send('No se encontro el usuario: ' + err.message);
            console.log(req.body.pass, usuario.hash);
            if (usuario !== null && bcrypt.compareSync(req.body.pass, usuario.hash)) {
                if (req.body.pass2 !== null && req.body.pass2 !== '') {
                    usuario.hash = bcrypt.hashSync(req.body.pass2, 10);
                    usuario.save((err, usuario) => {
                        if (err) return res.status(400).send('No se pudo actualizar el pass: ' + err.message);
                        res.status(200).json({
                            message: 'Se modificó la contraseña con éxito'
                        });
                    })
                } else {
                    res.status(400).send('No ha definido una nueva contraseña!!');
                }
            } else {
                return res.status(400).send('La contraseña actual no corresponde con su usuario')
            }
        })
})


module.exports = app;