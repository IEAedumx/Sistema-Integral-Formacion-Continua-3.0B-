const express = require('express');
const fs = require('fs');
const path = require('path');
const { base } = require('../models/sippe.model');

app = express();

app.get('/encode64/logo/:fileName', function (req, res) {
    const fileName = req.params.fileName;
    const ext = path.extname(fileName).replace('.','');
    
    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        var base64 = Buffer(bitmap).toString('base64');
        base64 = `data:image/${ext};base64,${base64}`
        return res.status(200).json({cadena:base64, ext});
    }
    base64_encode(path.join(__dirname, `../../public/logos/${fileName}`));

});

module.exports = app;