//Esse arquivo vai servir para trabalher com as rotas da aplicação.

const express = require("express");
const router = express.Router();
const {loginRequired} = require("./src/middlewares/middlewares");

//Importa os controller que a aplicação vai ter
const homeController = require("./src/controller/homeController");
const loginController = require("./src/controller/loginController");
const contatosController = require("./src/controller/contatosController");

//Rotas para o homeController
router.get("/", homeController.paginaPrincipal);
router.post("/", homeController.tratarFormulario);

//Rotas de login
router.get("/login/", loginController.paginaLogin);
router.post("/login/register", loginController.cadastrar);
router.post("/login/login", loginController.entrar);
router.get("/login/sair", loginController.sair);

//Rotas de contatos
router.get("/contatos", loginRequired, contatosController.paginaInicial);
router.post("/contatos/register", contatosController.criarContatos);
router.get("/contatos/:id", loginRequired, contatosController.editarContatos);
router.post("/contatos/edit/:id", loginRequired, contatosController.editar);
router.get("/contatos/delete/:id", loginRequired, contatosController.deletar);


module.exports = router;