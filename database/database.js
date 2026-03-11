const Sequelize = require("sequelize");
const connection = new Sequelize('projeto','root','eeUkan@1406',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

module.exports = connection;