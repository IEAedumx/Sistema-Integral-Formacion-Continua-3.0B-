const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('SIFC_Desarrollo', 'juanmac', '#ju4nm4C', {
    host: '10.20.1.168\DESARROLLOP', //Cambia según configuración
    dialect: 'mssql',
    port: 1433, //Puerto por defecto SQL Server
    logging: false, //Opcional: desactiva logs de SQL
    dialectOptions: {
        options: {
            encrypt: false, //Cambia a 'true' si usa Azure SQL
            trustServerCertificate: true, //Requerido en algunas configuraciones locales
        }
    }
});


sequelize.authenticate()
    .then(() => console.log('Conexión Establecida con SQL Server'))
    .catch(err => console.error('Error al conectar con SQL Server:', err));

module.exports = sequelize;
