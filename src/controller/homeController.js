module.exports.paginaPrincipal = (req, res) =>{
    res.render("index.ejs");
};

module.exports.tratarFormulario = (req, res) =>{
    console.log(req.body);
    res.send("Recebi o formulário com o conteúdo: " + req.body.nome);
};