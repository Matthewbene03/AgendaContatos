const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({ //Modela como vai ser a classe no banco de dados com o mongoose
    titulo: {type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model("Home", HomeSchema); //Cria o seu modelo com base no "schema" criado

class Home{

}

module.exports = Home;