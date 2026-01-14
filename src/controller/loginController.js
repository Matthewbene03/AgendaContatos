const Login = require("../models/loginModels");

module.exports.paginaLogin = (req, res) =>{
    if(req.session.user) {
        return res.render("pagUser.ejs") ;
    }
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

module.exports.entrar = async function (req, res) {
    try {
        const bodyRequisicao = req.body;
        const login = new Login(bodyRequisicao);
        await login.entrar();
        
        const voltar = req.headers.referer || "/login";
        
        if (login.msgErrors.length > 0) {
            req.flash("error", login.msgErrors);
            req.session.save(() => {
                return res.redirect(voltar);
            });
            return;
        }

        req.flash("success", "Você entrou no sistema!");
        req.session.user = login.user; //Salva o usuário na session
        req.session.save(() => {
            return res.redirect(voltar);
        });

    } catch (e) {
        console.log(e);
        res.render("404.ejs");
    }
};

module.exports.sair = async function (req, res) {
    req.session.destroy();
    res.redirect("/");
}