// Importa o módulo Express
const express = require ("express");

// Cria uma instância do Express
const app = express();

// Importa o módulo body-parser para lidar com dados de formulários
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Diz para o express usar o EJS como mecanismo de visualização
app.set("view engine", "ejs");
app.use(express.static("public"));

// Define uma rota para a raiz do site
app.get("/", (req,res) => {

    res.render("index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido titulo: " + titulo + " descrição: " + descricao);
});

// Define uma rota para a página de contato
app.listen(8080,() => {
    console.log("Servidor rodando na porta 8080");
});