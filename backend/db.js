const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rrenjet', 'homestead', 'secret', {
    host: '127.0.0.1', // Përdor '127.0.0.1' në vend të 'localhost'
    port: 8889,         // Përdor portin e saktë (8889 në këtë rast)
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Lidhja me MySQL u realizua me sukses!'))
    .catch((err) => console.error('Gabim në lidhje me databazën:', err));

module.exports = sequelize;


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'homestead',  // Përdoruesi për bazën e të dhënave
//     password: 'secret',  // Fjalëkalimi i përdoruesit
//     database: 'rrenjet', // Emri i bazës së të dhënave
//     port: 8889
//   });