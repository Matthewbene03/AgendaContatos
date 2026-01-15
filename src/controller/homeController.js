const Contato = require("../models/contatosModels");

module.exports.paginaPrincipal = async function (req, res) {
    const contatos = await Contato.buscarTodosContatos();
    res.render("index.ejs", {contatos});
};

module.exports.tratarFormulario = (req, res) =>{
    console.log(req.body);
    res.send("Recebi o formulário com o conteúdo: " + req.body.nome);
};