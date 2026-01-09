module.exports.meuMiddlewares = (req, res, next) =>{
    console.log("Esse é o middleware padrão!");
    next();
};

module.exports.checkCsrfError = (err, req, res, next) =>{ //Criando middlewares para verificar error de csrf
    if(err && err.code === "EBADCSRFTOKEN"){
        return res.render("404.ejs");
    }
};

module.exports.csrfMiddeleware = (req, res, next) =>{ //Criando middlewares para criar token para os formulários
    res.locals.csrfToken = req.csrfToken();
    next();
};
