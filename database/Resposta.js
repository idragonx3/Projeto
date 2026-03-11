// Importa as dependências necessárias
const Sequelize = require("sequelize");
// Importa a conexão com o banco de dados
const connection = require("./database");

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});
module.exports = Resposta;