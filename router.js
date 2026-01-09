//Esse arquivo vai servir para trabalher com as rotas da aplicação.

const express = require("express");
const router = express.Router();

//Importa os controller que a aplicação vai ter
const homeController = require("./src/controller/homeController");
const testeController = require("./src/controller/testeController");
const teste2Controller = require("./src/controller/teste2Controller");

//Rotas para o homeController
router.get("/", homeController.paginaPrincipal);
router.post("/", homeController.tratarFormulario);

//Rotas para o testeController

router.get("/testes", testeController.paginaPrincipal);
router.get("/testes/:idUser", testeController.paginaPrincipalId);

//Rotas para o teste2Controller

router.get("/testes2", teste2Controller.paginaPrincipal);

module.exports = router;