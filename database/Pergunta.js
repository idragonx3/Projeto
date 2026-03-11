// Importa as dependências necessárias
const Sequelize = require("sequelize");
// Importa a conexão com o banco de dados
const connection = require("./database");

// Define o modelo Pergunta com os campos titulo e descricao
const Pergunta = connection.define('pergunta',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Sincroniza o modelo Pergunta com o banco de dados, criando a tabela se ela não existir
Pergunta.sync({force:false}).then(() => {
    console.log("Tabela Pergunta criada com sucesso!");
}).catch((error) => {
    console.log("Erro ao criar tabela Pergunta: " + error);
});

module.exports = Pergunta;