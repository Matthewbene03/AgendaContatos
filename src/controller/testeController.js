module.exports.paginaPrincipal = (req, res) =>{
    console.log("/testes sem parâmetro");
    res.send("/testes sem parâmetro");
};

module.exports.paginaPrincipalId = (req, res) =>{
    console.log(req.params.idUser);
    res.send(req.params.idUser);
};