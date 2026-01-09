require("dotenv").config();

const express = require("express"); //Importa o express para ser usado
const app = express(); //Inicializa o express

const mongoose = require("mongoose");
mongoose.connect(process.env.LinkDeConexao) //Faz a conexão com o BD.
.then(() => {
    app.emit("pronto") //O "app" vai emitir um sinal quando essa função executar. Como mongoose.connect retorna uma promise, app.emit só vai emitir um sinal quando a promise terminar, ou seja, quando a conexão com o BD terminar. 
})
.catch(e => console.log(e));

const session = require("express-session"); //Importa as sessions
const MongoStore = require("connect-mongo").default; //Importa o connect-mongo
const flash = require("connect-flash"); //Importa o connect-flash
const sessionOptions = session({ //Cria o middleware de sessão do Express usando express-session.
    secret: "Mensagem secreta", // Chave usada para assinar o cookie da sessão.
    store: MongoStore.create({mongoUrl: process.env.LinkDeConexao}), // Define onde as sessões serão armazenadas.
    resave: false, // Evita salvar a sessão no banco se nada mudou.
    saveUninitialized: false, // Não cria sessão vazia para usuários que não usaram sessão ainda.
    cookie: { // Configurações do cookie da sessão.
        maxAge: 1000 * 60 * 5, //Cinco minutos -> Tempo de vida do cookie (em ms).
        httpOnly: true // Impede acesso ao cookie via JavaScript do navegador.
    }
});

const helmet = require("helmet"); //Importa o helmet para ser usado
const csrf = require("csurf"); //Importa o csurf para ser usado

app.use(sessionOptions);
app.use(flash()); //Ativa o flash
app.use(helmet());  //Ativa o helmet

const router = require("./router.js");
const path = require("path");
const {meuMiddlewares, checkCsrfError, csrfMiddeleware} = require("./src/middlewares/middlewares.js");

app.use(express.urlencoded({extended:true})); //serve para ler dados enviados pelo formulário (POST)
app.use(express.json()); // Ler e interpretar requisições com corpo em JSON.
app.use(express.static(path.resolve(__dirname, "public"))); //serve para ler dados estáticos

app.use(csrf());

//app.use(meuMiddlewares); //Serve para usar o arquivo de middlewres. 
app.use(checkCsrfError); //Serve para usar o arquivo de middlewres. 
app.use(csrfMiddeleware); //Serve para usar o arquivo de middlewres. 
app.use(router); //Serve para usar o arquivo de rotas. 

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("views engine", "ejs");

app.on("pronto", ()=>{ //Executa quando o app emitir o sinal "pronto".
    app.listen(3000, () => {
        console.log("Acessar http://localhost:3000");
        console.log("Servidor executando na porta 3000");
    }) //Faz o servidor escutar essa porta do computador. O meu sistema trabalha nessa porta.
});
