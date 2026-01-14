module.exports.meuMiddlewares = (req, res, next) =>{
    res.locals.errors = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    next();
};

module.exports.loginRequired = (req, res, next) =>{
    if(!req.session.user){
        req.flash("error", "Você precisa fazer login!!!");
        req.session.save(() => res.redirect("/"));
        return;
    }

    next();
};

module.exports.checkCsrfError = (err, req, res, next) =>{ //Criando middlewares para verificar error de csrf
    if(err){
        return res.render("404.ejs");
    }

    next();
};

module.exports.csrfMiddeleware = (req, res, next) =>{ //Criando middlewares para criar token para os formulários
    res.locals.csrfToken = req.csrfToken();
    next();
};
