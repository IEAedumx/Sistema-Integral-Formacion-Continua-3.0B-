const express = require('express');
const spawn = require('child_process').spawn

const app = express();

app.get('/dbdump/:id', function (req, res) {
    var args = ['--db', 'SERFC_DB', '--host', 'localhost:27017', '--gzip', '--out', './dbdump'];
    if (req.params.id === 'laptop') {
        mongodump = spawn('C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongodump', args);
    } else if (req.params.id === 'desktop') {
        mongodump = spawn('C:\\Program Files\\MongoDB\\Server\\4.0\\bin\\mongodump', args);
    }
    mongodump.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    mongodump.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    mongodump.on('exit', function (code) {
        console.log('mongodump exited with code: ' + code);
    });
    res.status(200).send('Orden de respaldo ejecutada')
});

app.get('/dbrestore/:id', function (req, res) {
    var args = ['--host', 'localhost:27017', '--gzip', '--dir', './dbdump']
    if (req.params.id === 'laptop') {
        mongorestore = spawn('C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongorestore', args);
    } else if (req.params.id === 'desktop') {
        mongorestore = spawn('C:\\Program Files\\MongoDB\\Server\\4.0\\bin\\mongorestore', args);
    }
    mongorestore.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    mongorestore.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    mongorestore.on('exit', function (code) {
        console.log('mongorestore exited with code: ' + code);
    });
    res.status(200).send('Orden de restauración ejecutada')
})

module.exports = app;