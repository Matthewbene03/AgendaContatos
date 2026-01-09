module.exports.paginaPrincipal = (req, res) =>{
    console.log(req.query);
    console.log("IdUser: " + req.query.idUser +" e senhaUser: "+ req.query.senhaUser);
    res.send("IdUser: " + req.query.idUser +" e senhaUser: "+ req.query.senhaUser);
};