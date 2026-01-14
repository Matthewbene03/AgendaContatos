const Login = require("../models/loginModels");

module.exports.paginaLogin = (req, res) =>{
    res.render("login.ejs");
};

module.exports.cadastrar = async function (req, res) {
    try {
        const bodyRequisicao = req.body;
        const login = new Login(bodyRequisicao);
        await login.registrar();

        const voltar = req.headers.referer || "/login";

        if (login.msgErrors.length > 0) {
            req.flash("error", login.msgErrors);
            req.session.save(() => {
                return res.redirect(voltar);
            });
            return;
        }

        req.flash("success", "Cadastro realizado com sucesso!");
        req.session.save(() => {
            return res.redirect(voltar);
        });

    } catch (e) {
        console.log(e);
        res.render("404.ejs");
    }
};



module.exports.entrar = (req, res) =>{
    const bodyRequisicao = JSON.stringify(req.body);
    //res.send(bodyRequisicao);
    console.log(bodyRequisicao);
    //const login = new Login(bodyRequisicao);

    //login.registrar();
};