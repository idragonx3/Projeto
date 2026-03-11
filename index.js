// Importa o módulo Express
const express = require ("express");
// Cria uma instância do Express
const app = express();
// Importa o módulo body-parser para lidar com dados de formulários
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Importa a conexão com o banco de dados
const connection = require("./database/database");
connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch((error) => {
    console.log("Erro ao conectar com o banco de dados: " + error);
});
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const req = require("express/lib/request");

// Diz para o express usar o EJS como mecanismo de visualização
app.set("view engine", "ejs");
app.use(express.static("public"));

// Define uma rota para a raiz do site
app.get("/", (req,res) => {
    Pergunta.findAll({ raw: true, order: [['id', 'DESC']]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        console.log("Pergunta criada com sucesso!");
        res.redirect("/");
    }).catch((error) => {
        console.log("Erro ao criar pergunta: " + error);
        res.redirect("/perguntar");

    });
});

app.post("/responder", (req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.get("/pergunta/:id", (req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id}
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                })
            });
        }else{ // Pergunta não encontrada
            res.redirect("/");
        }
    });
});

// Define uma rota para a página de contato
app.listen(8080,() => {
    console.log("Servidor rodando na porta 8080");
});