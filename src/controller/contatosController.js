const Contatos = require("../models/contatosModels");

module.exports.paginaInicial = (req, res) => {
    res.render("contatos.ejs", { contato: {} });
};

module.exports.criarContatos = async function (req, res) {
    try {
        const bodyRequisicao = req.body;
        const contatos = new Contatos(bodyRequisicao);
        await contatos.registrar();

        const caminho = "/contatos";

        if (contatos.msgErrors.length > 0) {
            req.flash("error", contatos.msgErrors);
            req.session.save(() => {
                return res.redirect(caminho);
            });
            return;
        }

        req.flash("success", "Cadastro realizado com sucesso!");
        req.session.save(() => {
            return res.redirect(caminho + `/${contatos.contatos._id}`);
        });

    } catch (e) {
        console.log(e);
        res.render("404.ejs");
    }
};

module.exports.editarContatos = async function (req, res) {
    if (!req.params.id) return res.render("404.ejs")
    const user = await Contatos.buscarPorID(req.params.id);

    if (!user) {
        return res.render("404.ejs")
    }
    res.render("contatos.ejs", { contato: user });
};

module.exports.editar = async function (req, res) {
    if (!req.params.id) return res.render("404.ejs");

    try {
        const contatos = new Contatos(req.body);
        await contatos.editar(req.params.id);

        const caminho = "/contatos";

        if (contatos.msgErrors.length > 0) {
            req.flash("error", contatos.msgErrors);
            req.session.save(() => {
                return res.redirect(caminho);
            });
            return;
        }

        req.flash("success", "Contato editado com sucesso!");
        req.session.save(() => {
            return res.redirect(caminho + `/${contatos.contatos._id}`);
        });
    } catch (e) {
        console.log(e);
        res.render("404.ejs");
    }

};

module.exports.deletar = async function (req, res) {
    if (!req.params.id) return res.render("404.ejs");

    try {
        const idContato = req.params.id;
        const contatoDeletado = await Contatos.deletar(idContato);

        const caminho = "/";

        if (!contatoDeletado) {
            req.flash("error", "Não foi possivel deletar esse contato!");
            req.session.save(() => {
                return res.redirect(caminho);
            });
            return;
        }

        req.session.save(() => {
            return res.redirect(caminho);
        });
    } catch (e) {
        console.log(e);
        res.render("404.ejs");
    }
};