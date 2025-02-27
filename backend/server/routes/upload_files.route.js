const multer = require('multer');
const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();

// Almacenamiento multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/logos');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});
let upload = multer({
    storage: storage
});

app.post('/uploadLogo', upload.single('file'), function (req, res, next) {
    const file = req.file;
    console.log(file);
    if (!file) {
        const error = new Error('Por favor cargue el archivo');
        error.httpStatusCode = 400;
        return next({
            ok: false,
            message: error.message
        });
    }
    res.status(200).json({
        ok: true,
        message: 'Archivo cargado con éxito'
    });
});

module.exports = app;