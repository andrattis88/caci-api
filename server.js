const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin : "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));

const db = require("./app/models");
const Perfil = db.perfil;

db.sequelize.sync({force : true}).then(() => {
    console.log("Removendo e resincronizando o banco de dados");
    initial();
}); 

//db.sequelize.sync({force : false});


app.get("/", (req, res) => {
    res.json({message: "Seja bem vindo à CACI-API"});
});

// routes
require("./app/routes/autorizacao.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});

function initial() {
    Perfil.create({
        id: 1,
        nome: "usuario"
    });

    Perfil.create({
        id: 2,
        nome: "admin"
    });

    Perfil.create({
        id: 3,
        nome: "moderador"
    });
} 


