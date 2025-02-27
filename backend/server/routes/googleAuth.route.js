const express = require('express');

const app = express();

app.get('/loginIEA', function (req, res) {
    res.render('googleAuth', {
        titulo: "Página de login"
    });

});

module.exports = app;